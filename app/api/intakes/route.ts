import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const allowedKinds = new Set(["deal", "brand", "claim", "recruiting"]);

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const kind = clean(body.kind, 30);
    const name = clean(body.name, 120);
    const email = clean(body.email, 180).toLowerCase();
    const organization = clean(body.organization, 160);

    if (!allowedKinds.has(kind)) return Response.json({ error: "Unsupported intake type" }, { status: 400 });
    if (!name || !email || !email.includes("@")) return Response.json({ error: "A valid name and email are required" }, { status: 400 });
    if (kind !== "claim" && !organization) return Response.json({ error: "Organization is required" }, { status: 400 });

    const status = kind === "claim" ? "identity_review" : "received";
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const record = {
      id,
      createdAt,
      kind,
      name,
      email,
      organization,
      athleteId: clean(body.athleteId, 100),
      opportunityId: clean(body.opportunityId, 100),
      budget: clean(body.budget, 100),
      market: clean(body.market, 120),
      goal: clean(body.goal, 2000),
      details: {
        role: clean(body.role, 100),
        sourceUrl: clean(body.sourceUrl, 600),
        dealType: clean(body.dealType, 120),
      },
      status,
    };

    const store = getStore({ name: "varslink-intakes", consistency: "strong" });
    await store.set(`intakes/${kind}/${createdAt.slice(0, 10)}/${id}.json`, JSON.stringify(record), {
      metadata: { kind, status },
    });

    return Response.json(
      { received: true, reference: `VL-${id.slice(0, 8).toUpperCase()}`, status },
      { status: 201 },
    );
  } catch {
    return Response.json({ error: "The request could not be saved" }, { status: 500 });
  }
}
