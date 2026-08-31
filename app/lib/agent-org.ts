import { getStore } from "@netlify/blobs";
import OpenAI from "openai";
import { randomUUID } from "node:crypto";

type AgentContext = {
  budget: number;
  athleteCount: number;
  usageMonths: number;
  minorIncluded: boolean;
  market: string;
  goal: string;
  dealType: string;
};

type SpecialistReport = {
  agent: string;
  assessment: string;
  confidence: number;
  riskFlags: string[];
  recommendedActions: string[];
  requiresHumanApproval: boolean;
};

type AgentRun = {
  runId: string;
  createdAt: string;
  mode: "model" | "rules" | "fallback";
  model: string | null;
  matchScore: number;
  riskBand: "standard" | "moderate" | "high";
  summary: string;
  agents: string[];
  specialistReports: SpecialistReport[];
  nextActions: string[];
  humanApprovals: string[];
  persisted: boolean;
};

const specialists = [
  { name: "Scout", mission: "Evaluate the athlete cohort, verification gaps, geography, sport, audience quality, and recruiting signals." },
  { name: "Matchmaker", mission: "Evaluate brand-to-athlete fit across audience, location, values, format, timing, and budget." },
  { name: "Deal Architect", mission: "Design scope, deliverables, price logic, usage rights, exclusivity, timeline, and measurable outcomes." },
  { name: "Compliance Sentinel", mission: "Identify guardian, school, state, disclosure, inducement, contract, and human-counsel review gates." },
  { name: "Content Producer", mission: "Plan concepts, short-form creative, approvals, production dependencies, and distribution sequencing." },
  { name: "Settlement Ops", mission: "Plan identity checks, signatures, deliverable acceptance, payments, tax records, and closeout evidence." },
  { name: "Growth Publisher", mission: "Identify ethical acquisition, search, marketplace, and conversion opportunities without inventing claims." },
] as const;

const specialistSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    assessment: { type: "string" },
    confidence: { type: "integer", minimum: 0, maximum: 100 },
    riskFlags: { type: "array", items: { type: "string" } },
    recommendedActions: { type: "array", items: { type: "string" } },
    requiresHumanApproval: { type: "boolean" },
  },
  required: ["assessment", "confidence", "riskFlags", "recommendedActions", "requiresHumanApproval"],
} as const;

const supervisorSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    matchScore: { type: "integer", minimum: 0, maximum: 100 },
    riskBand: { type: "string", enum: ["standard", "moderate", "high"] },
    summary: { type: "string" },
    nextActions: { type: "array", items: { type: "string" } },
    humanApprovals: { type: "array", items: { type: "string" } },
  },
  required: ["matchScore", "riskBand", "summary", "nextActions", "humanApprovals"],
} as const;

function clean(value: unknown, fallback: string, limit: number) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, limit) : fallback;
}

function numeric(value: unknown, fallback: number) {
  const result = Number(value);
  return Number.isFinite(result) ? result : fallback;
}

export function normalizeAgentContext(body: Record<string, unknown>): AgentContext {
  return {
    budget: Math.max(0, numeric(body.budget, 0)),
    athleteCount: Math.max(1, Math.round(numeric(body.athleteCount, 1))),
    usageMonths: Math.max(0, numeric(body.usageMonths, 0)),
    minorIncluded: Boolean(body.minorIncluded),
    market: clean(body.market, "unspecified", 80),
    goal: clean(body.goal, "Evaluate and route a potential VarsLink opportunity", 800),
    dealType: clean(body.dealType, "unspecified", 120),
  };
}

function rulesRun(context: AgentContext, mode: AgentRun["mode"]): AgentRun {
  let matchScore = 68;
  if (context.budget >= context.athleteCount * 500) matchScore += 9;
  if (context.market !== "unspecified") matchScore += 7;
  if (context.usageMonths > 0 && context.usageMonths <= 6) matchScore += 5;
  matchScore = Math.min(96, matchScore);

  const riskPoints = (context.minorIncluded ? 2 : 0) + (context.usageMonths > 12 ? 2 : context.usageMonths > 3 ? 1 : 0) + (context.budget >= 25000 ? 2 : 0);
  const riskBand = riskPoints >= 4 ? "high" : riskPoints >= 2 ? "moderate" : "standard";
  const humanApprovals = [
    ...(context.minorIncluded ? ["Confirm guardian authority before athlete contact"] : []),
    ...(riskBand === "high" ? ["Route commercial and usage terms for human counsel review"] : []),
  ];

  return {
    runId: randomUUID(),
    createdAt: new Date().toISOString(),
    mode,
    model: null,
    matchScore,
    riskBand,
    summary: mode === "rules" ? "Deterministic operating sweep completed. Add OPENAI_API_KEY to activate specialist-model orchestration." : "Model orchestration was unavailable, so VarsLink completed the safe deterministic workflow.",
    agents: specialists.map((agent) => agent.name),
    specialistReports: specialists.map((agent) => ({
      agent: agent.name,
      assessment: agent.mission,
      confidence: matchScore,
      riskFlags: humanApprovals,
      recommendedActions: ["Verify the underlying record", "Prepare the next workflow artifact"],
      requiresHumanApproval: humanApprovals.length > 0,
    })),
    nextActions: [
      "Verify athlete and business identities",
      "Rank the market-fit cohort",
      "Draft scope, price, usage rights, and timeline",
      ...humanApprovals,
    ],
    humanApprovals,
    persisted: false,
  };
}

async function runSpecialist(client: OpenAI, model: string, context: AgentContext, specialist: (typeof specialists)[number]): Promise<SpecialistReport> {
  const response = await client.responses.create({
    model,
    instructions: `You are VarsLink's ${specialist.name}. ${specialist.mission} Use only the supplied facts. Mark unknowns instead of inventing data. Your output is an operating recommendation, never a signature, legal conclusion, or authorization to contact a minor.`,
    input: JSON.stringify(context),
    text: {
      format: {
        type: "json_schema",
        name: `varslink_${specialist.name.toLowerCase().replaceAll(" ", "_")}`,
        strict: true,
        schema: specialistSchema,
      },
    },
  });

  const report = JSON.parse(response.output_text) as Omit<SpecialistReport, "agent">;
  return { agent: specialist.name, ...report };
}

async function persistRun(context: AgentContext, run: AgentRun) {
  try {
    const store = getStore({ name: "varslink-agent-runs", consistency: "strong" });
    await store.set(`runs/${run.createdAt.slice(0, 10)}/${run.runId}.json`, JSON.stringify({ context, ...run }), {
      metadata: { mode: run.mode, riskBand: run.riskBand },
    });
    return true;
  } catch {
    return false;
  }
}

export async function runAgentOrganization(context: AgentContext): Promise<AgentRun> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    const run = rulesRun(context, "rules");
    run.persisted = await persistRun(context, run);
    return run;
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-5.5";
  try {
    const client = new OpenAI({ apiKey });
    const specialistReports = await Promise.all(specialists.map((specialist) => runSpecialist(client, model, context, specialist)));
    const supervisor = await client.responses.create({
      model,
      instructions: "You are VarsLink's Operations Chief. Synthesize the specialist reports into one conservative operating decision. Do not invent facts. Preserve all legal, guardian, payment, identity, and high-value human approval gates. Output recommendations only; never claim that a deal is signed or compliant.",
      input: JSON.stringify({ context, specialistReports }),
      text: {
        format: {
          type: "json_schema",
          name: "varslink_operations_decision",
          strict: true,
          schema: supervisorSchema,
        },
      },
    });
    const decision = JSON.parse(supervisor.output_text) as Pick<AgentRun, "matchScore" | "riskBand" | "summary" | "nextActions" | "humanApprovals">;
    const run: AgentRun = {
      runId: randomUUID(),
      createdAt: new Date().toISOString(),
      mode: "model",
      model,
      agents: specialists.map((agent) => agent.name),
      specialistReports,
      persisted: false,
      ...decision,
    };
    run.persisted = await persistRun(context, run);
    return run;
  } catch {
    const run = rulesRun(context, "fallback");
    run.persisted = await persistRun(context, run);
    return run;
  }
}
