import type { Metadata } from "next";
import { BadgeCheck, CircleDollarSign, FileCheck2, Goal, Radar, ShieldCheck, Sparkles, Users } from "lucide-react";
import { BrandBriefForm } from "@/components/intake-forms";

export const metadata: Metadata = {
  title: "NIL Marketing for Brands & Local Businesses",
  description: "Launch an athlete partnership with fit-ranked creators, transparent pricing, clear deliverables, usage rights, guardian approval, and compliance checks.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <main className="page-main">
      <section className="page-hero compact">
        <span className="eyebrow"><Sparkles /> For brands and local businesses</span>
        <h1>The fastest path from a business goal to the right athlete deal.</h1>
        <p>You do not need an agency-sized team to work with athletes. Give VarsLink the goal, market, format, and budget; the operating agents build the match set and deal structure.</p>
      </section>
      <section className="content-wrap">
        <div className="content-head"><div><span className="eyebrow"><Radar /> TikTok discovery, delivery-grade operations</span><h2>Shop the fit. Track the full order.</h2></div><p>Move through athletes as naturally as a social feed, then manage scope, approvals, deliverables, and settlement like a modern transaction platform.</p></div>
        <div className="brand-feature-grid">
          <article className="brand-feature"><span><Goal /></span><h3>Brief in plain language</h3><p>Start with the outcome: visits, awareness, content, event attendance, recruiting, or community trust.</p></article>
          <article className="brand-feature"><span><Users /></span><h3>Fit-ranked athlete set</h3><p>Matchmaker scores geography, sport, audience quality, brand affinity, format readiness, and cost.</p></article>
          <article className="brand-feature"><span><FileCheck2 /></span><h3>Deal architecture included</h3><p>Deliverables, deadlines, approvals, revision limits, usage rights, exclusivity, and cancellation terms start clear.</p></article>
          <article className="brand-feature"><span><ShieldCheck /></span><h3>Compliance before contact</h3><p>Identity, guardian, school, state, disclosure, and prohibited-category gates are visible before signature.</p></article>
          <article className="brand-feature"><span><CircleDollarSign /></span><h3>Track work through payment</h3><p>The deal room holds signatures, content approvals, proof of completion, invoice status, and tax closeout.</p></article>
          <article className="brand-feature"><span><BadgeCheck /></span><h3>Repeat what worked</h3><p>Campaign reporting turns one successful activation into a reusable cohort, brief, and market playbook.</p></article>
        </div>
      </section>
      <section className="content-wrap" id="brief">
        <div className="content-head"><div><span className="eyebrow">Start the agent workflow</span><h2>Build my athlete campaign</h2></div><p>This creates an operating intake—not a public post. VarsLink verifies the business before a deal reaches an athlete.</p></div>
        <BrandBriefForm />
      </section>
    </main>
  );
}
