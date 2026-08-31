export async function GET() {
  return Response.json({
    status: "ok",
    product: "VarsLink",
    modules: {
      discovery: "ready",
      athleteProfiles: "ready",
      opportunities: "ready",
      brandIntake: "ready",
      claims: "ready",
      agentEvaluation: "ready",
      compliance: "ready",
    },
  });
}
