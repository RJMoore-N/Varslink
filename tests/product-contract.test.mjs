import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

const root = process.cwd();
const requiredPages = [
  "app/page.tsx",
  "app/athletes/page.tsx",
  "app/athletes/[slug]/page.tsx",
  "app/opportunities/page.tsx",
  "app/brands/page.tsx",
  "app/recruiting/page.tsx",
  "app/compliance/page.tsx",
  "app/how-nil-works/page.tsx",
  "app/claim/page.tsx",
  "app/dashboard/page.tsx",
];

function sourceFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.(tsx|ts)$/.test(entry) ? [path] : [];
  });
}

const sources = sourceFiles(join(root, "app")).filter((path) => !path.includes(`${join("components", "ui")}/`));
const combined = sources.map((path) => `\n/* ${relative(root, path)} */\n${readFileSync(path, "utf8")}`).join("\n");

test("all required customer and operating routes exist", () => {
  for (const page of requiredPages) assert.doesNotThrow(() => readFileSync(join(root, page), "utf8"), `${page} is missing`);
});

test("every literal internal navigation target resolves to a product route", () => {
  const allowed = new Set(["/", "/athletes", "/opportunities", "/brands", "/recruiting", "/compliance", "/how-nil-works", "/claim", "/dashboard"]);
  const hrefs = [...combined.matchAll(/href=["'`]([^"'`$]+)["'`]/g)].map((match) => match[1]);
  const broken = hrefs.filter((href) => {
    if (!href.startsWith("/") || href.startsWith("//")) return false;
    const path = href.split(/[?#]/)[0];
    return !allowed.has(path) && !path.startsWith("/athletes/");
  });
  assert.deepEqual([...new Set(broken)], []);
});

test("interactive controls avoid dead placeholder targets", () => {
  assert.equal(combined.includes('href="#"'), false);
  assert.equal(combined.includes("Starter Project"), false);
  const nativeButtons = [...combined.matchAll(/<button\b([^>]*)>/g)].map((match) => match[1]);
  const untyped = nativeButtons.filter((attributes) => !/\btype=/.test(attributes));
  assert.deepEqual(untyped, []);
});

test("public forms have durable API handlers and system health", () => {
  const intakeHandler = readFileSync(join(root, "app/api/intakes/route.ts"), "utf8");
  assert.match(intakeHandler, /@netlify\/blobs/);
  assert.match(intakeHandler, /varslink-intakes/);
  const agentOrg = readFileSync(join(root, "app/lib/agent-org.ts"), "utf8");
  assert.match(agentOrg, /client\.responses\.create/);
  assert.match(agentOrg, /Promise\.all/);
  assert.match(agentOrg, /varslink-agent-runs/);
  for (const role of ["Scout", "Matchmaker", "Deal Architect", "Compliance Sentinel", "Content Producer", "Settlement Ops", "Growth Publisher"]) {
    assert.match(agentOrg, new RegExp(role));
  }
  assert.doesNotThrow(() => readFileSync(join(root, "app/api/health/route.ts"), "utf8"));
  assert.match(readFileSync(join(root, "netlify.toml"), "utf8"), /publish\s*=\s*"\.next"/);
});

test("search metadata and crawl controls are present", () => {
  assert.doesNotThrow(() => readFileSync(join(root, "app/sitemap.ts"), "utf8"));
  assert.doesNotThrow(() => readFileSync(join(root, "app/robots.ts"), "utf8"));
  assert.match(readFileSync(join(root, "app/layout.tsx"), "utf8"), /NIL deals/);
});
