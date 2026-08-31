import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, CalendarClock, MapPin, Sparkles, Users } from "lucide-react";
import { opportunities } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "NIL Deals & Athlete Sponsorship Opportunities",
  description: "Find open NIL deals, athlete sponsorships, UGC campaigns, appearances, ambassador programs, camps, and local business partnerships.",
  alternates: { canonical: "/opportunities" },
};

export default function OpportunitiesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Illustrative NIL deal opportunities",
    itemListElement: opportunities.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `https://www.varslink.com/opportunities#${item.id}` })),
  };
  return (
    <main className="page-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero compact">
        <span className="eyebrow"><Sparkles /> Athlete sponsorship marketplace</span>
        <h1>Open NIL deals—organized around fit, not noise.</h1>
        <p>Browse illustrative campaign formats, then let Matchmaker score the best athlete cohort for location, audience, values, sport, deliverables, and budget.</p>
        <div className="page-actions"><Button asChild className="signal-button hero-button"><Link href="/brands">Post a brand opportunity <ArrowRight /></Link></Button><Button asChild variant="outline" className="hero-secondary"><Link href="/claim">Join as an athlete</Link></Button></div>
      </section>
      <section className="content-wrap">
        <div className="content-head"><div><span className="eyebrow">Marketplace preview</span><h2>Deals ready for a match set</h2></div><p>These sample campaigns show the transaction model. Live campaigns publish only after brand identity, funding, and compliance gates.</p></div>
        <div className="opportunity-list">
          {opportunities.map((opportunity) => (
            <article className="opportunity-card" key={opportunity.id} id={opportunity.id}>
              <div className="opportunity-topline"><span>{opportunity.category}</span><span><Users /> {opportunity.slots} athlete slots</span></div>
              <p className="opportunity-brand">{opportunity.brand}</p>
              <h3>{opportunity.title}</h3>
              <p>{opportunity.summary}</p>
              <div className="tag-row">{opportunity.fit.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="opportunity-facts"><span><Banknote /> {opportunity.budget}</span><span><MapPin /> {opportunity.location}</span><span><CalendarClock /> {opportunity.deadline}</span><span>{opportunity.format}</span></div>
              <div className="card-actions"><Button asChild className="signal-button"><Link href="/brands">Build a similar campaign <ArrowRight /></Link></Button><Button asChild variant="outline" className="soft-button"><Link href="/athletes">Preview athlete matches</Link></Button></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
