"use client";

import { useState } from "react";
import { Activity, ArrowUpRight, Bot, CheckCircle2, Play, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { operatingAgents } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

const pipeline = [
  ["Harbor Street × creator crew", "Match set", "$3,500", "92%"],
  ["Northline recovery series", "Compliance", "$5,000", "88%"],
  ["Volt speed lab pop-up", "Contract", "$2,400", "86%"],
  ["Common Thread campus launch", "Creative", "$8,500", "81%"],
];

type AgentSweepResult = {
  runId: string;
  mode: "model" | "rules" | "fallback";
  model: string | null;
  matchScore: number;
  riskBand: "standard" | "moderate" | "high";
  summary: string;
  nextActions: string[];
  humanApprovals: string[];
  persisted: boolean;
};

export function CommandCenter() {
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState("2 minutes ago");
  const [latestResult, setLatestResult] = useState<AgentSweepResult | null>(null);

  async function runSweep() {
    setRunning(true);
    try {
      const response = await fetch("/api/agents/evaluate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ budget: 5000, athleteCount: 6, minorIncluded: true, usageMonths: 3, market: "DMV" }) });
      if (!response.ok) throw new Error("Agent sweep failed");
      const result = await response.json() as AgentSweepResult;
      setLatestResult(result);
      setLastRun("just now");
      const mode = result.mode === "model" ? `${result.model} specialist organization` : `${result.mode} safety workflow`;
      toast.success(`Agent sweep complete: ${result.matchScore}% fit, ${result.riskBand} risk, ${mode}`);
    } catch {
      toast.error("The sweep could not complete. No deal records were changed.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="command-content">
      <div className="command-top">
        <div><span className="eyebrow"><Activity /> Operating surface</span><h1>Agent Command Center</h1><p>One human-visible record across discovery, match scoring, deal structure, compliance, content, settlement, and growth.</p></div>
        <Button className="signal-button" onClick={runSweep} disabled={running}>{running ? <RefreshCw className="animate-spin" /> : <Play />} {running ? "Running sweep…" : "Run agent sweep"}</Button>
      </div>
      <div className="command-kpis">
        <article className="command-kpi"><small>Verified athlete records</small><b>312</b><span>+18 this week</span></article>
        <article className="command-kpi"><small>Open opportunity value</small><b>$46.8K</b><span>11 briefs</span></article>
        <article className="command-kpi"><small>Compliance clear rate</small><b>94%</b><span>7 reviews due</span></article>
        <article className="command-kpi"><small>Agent health</small><b>7 / 7</b><span>Last sweep {lastRun}</span></article>
      </div>
      {latestResult ? (
        <section className="command-panel">
          <div className="command-panel-head">
            <h2>Latest orchestration decision</h2>
            <span className="eyebrow"><Bot /> {latestResult.mode === "model" ? latestResult.model : `${latestResult.mode} mode`}</span>
          </div>
          <p>{latestResult.summary}</p>
          <div className="agent-handoff-list">
            {latestResult.nextActions.slice(0, 5).map((action) => <div key={action}><CheckCircle2 /><span>{action}</span></div>)}
            {latestResult.humanApprovals.map((approval) => <div key={approval}><ShieldCheck /><span>Human approval: {approval}</span></div>)}
          </div>
          <small>Run {latestResult.runId.slice(0, 8)} · {latestResult.persisted ? "record saved" : "record not persisted"}</small>
        </section>
      ) : null}
      <div className="command-grid">
        <section className="command-panel">
          <div className="command-panel-head"><h2>Illustrative deal pipeline</h2><span className="eyebrow"><Sparkles /> Sample operating data</span></div>
          <div className="deal-pipeline">
            {pipeline.map(([name, stage, value, fit]) => <article className="pipeline-row" key={name}><b>{name}</b><span className="status-pill">{stage}</span><span>{value}</span><span>{fit} fit</span></article>)}
          </div>
        </section>
        <aside className="command-panel">
          <div className="command-panel-head"><h2>Operating agents</h2><Bot /></div>
          <div className="agent-control-list">
            {operatingAgents.map((agent) => <div className="agent-control" key={agent.name}><i /><span><b>{agent.name}</b><small>{agent.role}</small></span><span>READY</span></div>)}
          </div>
        </aside>
      </div>
      <div className="command-grid">
        <section className="command-panel">
          <div className="command-panel-head"><h2>Required human decisions</h2><ArrowUpRight /></div>
          <div className="deal-pipeline">
            <article className="pipeline-row"><b>Approve 90-day paid social usage</b><span>Common Thread</span><span>Due today</span><span className="status-pill">Rights</span></article>
            <article className="pipeline-row"><b>Guardian authority review</b><span>2 athletes</span><span>Due today</span><span className="status-pill">Trust</span></article>
            <article className="pipeline-row"><b>Counsel review threshold</b><span>$25K brief</span><span>Tomorrow</span><span className="status-pill">Legal</span></article>
          </div>
        </section>
        <aside className="command-panel">
          <div className="command-panel-head"><h2>System guardrails</h2><ShieldCheck /></div>
          <div className="agent-handoff-list">
            <div><CheckCircle2 /><span>Agent outputs are recommendations, not signatures.</span></div>
            <div><CheckCircle2 /><span>Verified facts remain separate from model scores.</span></div>
            <div><CheckCircle2 /><span>Minor contact is blocked until guardian authority clears.</span></div>
            <div><CheckCircle2 /><span>Human approval controls exceptions and high-risk terms.</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
