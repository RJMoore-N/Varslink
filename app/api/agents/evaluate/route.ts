import { normalizeAgentContext, runAgentOrganization } from "@/lib/agent-org";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const result = await runAgentOrganization(normalizeAgentContext(body));
  return Response.json(result);
}
