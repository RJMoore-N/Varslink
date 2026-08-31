import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FileCheck2, Landmark, Scale, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "NIL Compliance, Guardian Approval & Deal Tracking",
  description: "Run NIL deals through identity, guardian, school, state, disclosure, contract, deliverable, payment, and reporting checks in one auditable workflow.",
  alternates: { canonical: "/compliance" },
};

export default function CompliancePage() {
  return (
    <main className="page-main">
      <section className="page-hero compact">
        <span className="eyebrow"><ShieldCheck /> Compliance OS</span>
        <h1>Every deal should show who cleared what—and when.</h1>
        <p>VarsLink treats compliance as an operating workflow across identity, guardian authority, institution rules, state requirements, disclosures, contracts, deliverables, payment, and record retention.</p>
        <div className="page-actions"><Button asChild className="signal-button hero-button"><Link href="/brands">Start a governed deal <ArrowRight /></Link></Button><Button asChild variant="outline" className="hero-secondary"><a href="https://www.collegesportscommission.org/nil/" target="_blank" rel="noreferrer">College Sports Commission guidance</a></Button></div>
      </section>
      <section className="content-wrap">
        <div className="process-list">
          <article className="process-step"><h3>Identity and authority</h3><p>Verify the athlete, business, authorized representative, and—when applicable—the legal guardian before private contact or signature.</p></article>
          <article className="process-step"><h3>Deal classification</h3><p>Record who is paying, what the athlete must do, fair-market rationale, locations, dates, usage rights, exclusivity, and whether school IP is involved.</p></article>
          <article className="process-step"><h3>Rule routing</h3><p>Route the record through current institution, conference, state, governing-body, and category-specific checks. Rules can change, so the rule source and review date stay attached.</p></article>
          <article className="process-step"><h3>Contract and disclosure</h3><p>Confirm readable terms, cancellation, content approval, revisions, usage length, required ad disclosures, and independent counsel routing for high-risk or high-value agreements.</p></article>
          <article className="process-step"><h3>Execution and settlement</h3><p>Track delivered work, approvals, completion evidence, payment, tax documents, reporting, retention, and any post-campaign usage expiration.</p></article>
        </div>
        <div className="brand-feature-grid" style={{ marginTop: 40 }}>
          <article className="brand-feature"><span><UserRoundCheck /></span><h3>Guardian-first controls</h3><p>Minors are not treated like ordinary creator accounts. Guardian status and approval scope are explicit gates.</p></article>
          <article className="brand-feature"><span><Landmark /></span><h3>Institution-aware routing</h3><p>School and governing-body requirements attach to the specific athlete and deal instead of living in a disconnected spreadsheet.</p></article>
          <article className="brand-feature"><span><Scale /></span><h3>Risk bands and human review</h3><p>The agent can flag issues, but legal judgment, high-value review, disputes, and exceptions remain human decisions.</p></article>
          <article className="brand-feature"><span><FileCheck2 /></span><h3>One audit trail</h3><p>Approvals, versions, signatures, disclosures, evidence, payment, and rule sources stay on the same deal record.</p></article>
        </div>
        <p style={{ marginTop: 28, color: "#677572", fontSize: 12 }}><BadgeCheck /> VarsLink provides workflow support, not legal or tax advice. Requirements vary and may change; qualified counsel and current official guidance control.</p>
      </section>
    </main>
  );
}
