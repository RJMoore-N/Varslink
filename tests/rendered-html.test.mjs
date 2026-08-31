import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships VarsLink search and social metadata without starter markers", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /VarsLink \| Athlete Opportunity Network/);
  assert.match(layout, /athlete sponsorships/);
  assert.match(layout, /openGraph/);
  assert.match(layout, /twitter/);
  assert.doesNotMatch(layout, /codex-preview/);
  assert.doesNotMatch(layout, /Starter Project/);
});
