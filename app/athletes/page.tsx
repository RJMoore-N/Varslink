import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { athletes } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Athlete Marketplace & Recruiting Profiles",
  description: "Explore athlete profiles by sport, market, audience, content niche, recruiting class, and NIL deal fit. Source-linked and guardian-first.",
  alternates: { canonical: "/athletes" },
};

export default function AthletesPage() {
  return (
    <main className="page-main">
      <section className="page-hero compact">
        <span className="eyebrow"><Search /> National athlete discovery</span>
        <h1>Find athletes built for the moment—and the message.</h1>
        <p>Search beyond follower count. VarsLink organizes athletic proof, audience fit, content strengths, geography, recruiting visibility, and deal readiness.</p>
        <div className="page-actions">
          <Button asChild className="signal-button hero-button"><Link href="/brands">Get matched by an agent <ArrowRight /></Link></Button>
          <Button asChild variant="outline" className="hero-secondary"><Link href="/claim">Claim an athlete profile</Link></Button>
        </div>
      </section>

      <section className="content-wrap">
        <div className="content-head">
          <div><span className="eyebrow">Marketplace preview</span><h2>Athletes gaining signal</h2></div>
          <p>Illustrative profiles demonstrate the live record structure. Published athlete records require a public source, identity claim, and contact permissions.</p>
        </div>
        <div className="directory-grid">
          {athletes.map((athlete) => (
            <article className="directory-card" key={athlete.id}>
              <div className="directory-avatar" aria-hidden="true">{athlete.initials}</div>
              <div className="athlete-name-line">
                <div>
                  <h2>{athlete.name} <BadgeCheck aria-label="Verified profile structure" /></h2>
                  <p>{athlete.sport} · {athlete.position}</p>
                </div>
              </div>
              <p><MapPin /> {athlete.city}, {athlete.state} · {athlete.school}</p>
              <div className="tag-row">{athlete.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="metric-grid">
                <div className="metric-tile"><b>{athlete.audience}</b><span>Audience</span></div>
                <div className="metric-tile"><b>{athlete.engagement}</b><span>Engagement</span></div>
                <div className="metric-tile"><b>{athlete.momentum}</b><span>Momentum</span></div>
              </div>
              <div className="trust-line"><ShieldCheck /> Guardian and identity gates precede contact</div>
              <div className="card-actions">
                <Button asChild className="signal-button"><Link href={`/athletes/${athlete.id}`}>Open profile <TrendingUp /></Link></Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
