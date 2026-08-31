import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, BookOpenCheck, Eye, Film, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Athlete Recruiting Profiles & College Visibility",
  description: "Build a source-linked athlete recruiting profile with verified results, film links, contact controls, profile analytics, and NIL readiness.",
  alternates: { canonical: "/recruiting" },
};

export default function RecruitingPage() {
  return (
    <main className="page-main">
      <section className="page-hero compact">
        <span className="eyebrow"><Sparkles /> Athlete recruiting visibility</span>
        <h1>A recruiting profile should prove the player—and reveal the momentum.</h1>
        <p>VarsLink gives families one source-linked record for athletic proof, film, achievements, contact permissions, profile activity, creator strengths, and opportunity readiness.</p>
        <div className="page-actions"><Button asChild className="signal-button hero-button"><Link href="/claim">Build or claim a profile <ArrowRight /></Link></Button><Button asChild variant="outline" className="hero-secondary"><Link href="/athletes">Explore profile format</Link></Button></div>
      </section>
      <section className="content-wrap">
        <div className="content-head"><div><span className="eyebrow">The recruiting loop</span><h2>Public proof. Family control. Useful signals.</h2></div><p>Recruiting and NIL are adjacent outcomes, but verified facts, modeled signals, and commercial estimates stay clearly separated.</p></div>
        <div className="brand-feature-grid">
          <article className="brand-feature"><span><BookOpenCheck /></span><h3>Source-linked athletic record</h3><p>Rosters, results, rankings, stats, honors, and coverage link back to the public page where the fact appeared.</p></article>
          <article className="brand-feature"><span><Film /></span><h3>Film and skill proof</h3><p>Organize highlight video, verified measurables, position context, schedule, and the athlete’s own development story.</p></article>
          <article className="brand-feature"><span><Eye /></span><h3>Visibility analytics</h3><p>Track profile views, source clicks, saved profiles, repeat interest, geography, and attention growth without exposing identities.</p></article>
          <article className="brand-feature"><span><ShieldCheck /></span><h3>Guardian-controlled contact</h3><p>Families choose who may contact the athlete, what information is visible, and whether NIL interest is accepted.</p></article>
          <article className="brand-feature"><span><BarChart3 /></span><h3>Momentum, not hype</h3><p>Separate real performance and visibility changes from rankings. Show why the signal moved and when it refreshed.</p></article>
          <article className="brand-feature"><span><BadgeCheck /></span><h3>One claim, multiple doors</h3><p>The same verified identity can support recruiting discovery, camps, coaching, community work, and brand partnerships.</p></article>
        </div>
      </section>
    </main>
  );
}
