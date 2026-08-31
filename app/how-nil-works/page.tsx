import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CircleDollarSign, FileSignature, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How NIL Deals Work for Athletes & Businesses",
  description: "Learn how NIL deals work: athlete discovery, brand matching, pricing, deliverables, contracts, disclosures, guardian approval, compliance, payment, and taxes.",
  alternates: { canonical: "/how-nil-works" },
};

export default function NilGuidePage() {
  const faq = [
    ["What does NIL mean?", "NIL means name, image, and likeness—the personal attributes an athlete may license or use in compensated commercial activity, subject to applicable rules and law."],
    ["What can an athlete be paid to do?", "Common formats include sponsored social posts, brand-created UGC, appearances, camps and coaching, autograph sessions, affiliate programs, ambassador work, merchandise, and licensing."],
    ["How are NIL deals priced?", "Pricing can reflect audience quality, geography, sport, content skill, time, production, travel, usage rights, exclusivity, duration, risk, and the number of deliverables—not just followers."],
    ["Can high-school athletes sign NIL deals?", "Eligibility and restrictions depend on location, governing body, school rules, the athlete’s age, and the deal. Guardian approval and current local guidance are essential."],
    ["What should a business put in the agreement?", "Define deliverables, dates, payment, approvals, revision limits, disclosures, usage rights, exclusivity, cancellation, conduct terms, intellectual property, and what proves completion."],
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <main className="page-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="page-hero compact">
        <span className="eyebrow"><BookOpen /> NIL deal guide</span>
        <h1>How athlete NIL deals work—from first match to final payment.</h1>
        <p>A practical guide for athletes, families, and businesses that want to understand deal types, pricing, contracts, disclosures, compliance, and what happens after content goes live.</p>
        <div className="page-actions"><Button asChild className="signal-button hero-button"><Link href="/opportunities">Find NIL opportunities <ArrowRight /></Link></Button><Button asChild variant="outline" className="hero-secondary"><Link href="/brands">Build a brand campaign</Link></Button></div>
      </section>
      <article className="content-wrap narrow seo-copy">
        <span className="eyebrow"><Sparkles /> The short version</span>
        <h2>NIL is a real commercial agreement.</h2>
        <p>An athlete provides agreed value—content, attendance, coaching, licensing, promotion, or another legitimate service—and receives compensation under written terms. A strong workflow makes the value, rights, approvals, disclosures, and payment visible before the work begins.</p>
        <h2>The seven steps of a modern NIL deal</h2>
        <div className="process-list">
          <article className="process-step"><h3>Define the business outcome</h3><p>Start with the result the business needs, not a preferred athlete name or a raw follower threshold.</p></article>
          <article className="process-step"><h3>Find and verify the athlete</h3><p>Confirm identity, athletic record, audience fit, content ability, location, preferences, and guardian authority where required.</p></article>
          <article className="process-step"><h3>Build the scope and price</h3><p>Specify deliverables, schedule, production, travel, channels, usage rights, exclusivity, revisions, and compensation.</p></article>
          <article className="process-step"><h3>Run compliance review</h3><p>Check current institution, governing-body, state, guardian, category, disclosure, and reporting requirements.</p></article>
          <article className="process-step"><h3>Sign and create</h3><p>Both sides approve the agreement. Content Producer tracks concepts, shot lists, drafts, revisions, and publication.</p></article>
          <article className="process-step"><h3>Verify completion and pay</h3><p>Attach completion evidence, approve the deliverable, release payment, and retain the appropriate tax and reporting records.</p></article>
          <article className="process-step"><h3>Measure and repeat</h3><p>Compare actual outcomes to the brief, preserve the cohort and learnings, and reuse what worked in the next market.</p></article>
        </div>
        <h2>NIL deal FAQ</h2>
        {faq.map(([question, answer]) => <section key={question}><h3>{question}</h3><p>{answer}</p></section>)}
        <h2>Start with the right workflow</h2>
        <p>Businesses can <Link href="/brands">launch an athlete campaign</Link>, athletes and guardians can <Link href="/claim">claim a source-linked profile</Link>, and anyone can browse <Link href="/opportunities">illustrative NIL opportunity formats</Link>. VarsLink keeps verified facts, commercial estimates, and compliance decisions visibly separate.</p>
        <p style={{ fontSize: 12 }}>This guide is educational and is not legal or tax advice. Use current official rules and qualified professional guidance for a specific deal.</p>
      </article>
    </main>
  );
}
