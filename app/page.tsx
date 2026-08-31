import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Radar,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Marketplace } from "@/components/marketplace";
import { Button } from "@/components/ui/button";
import { operatingAgents } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Find Athletes, NIL Deals & Brand Partnerships",
  description: "Discover verified athletes, launch compliant NIL campaigns, find sports sponsorship opportunities, and build recruiting visibility in one athlete opportunity network.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VarsLink",
  url: "https://www.varslink.com/",
  description: "An athlete opportunity network for discovery, recruiting visibility, brand partnerships, compliant NIL deals, and campaign operations.",
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot" /> The athlete opportunity network</div>
            <h1>Where athletic <em>momentum</em> becomes opportunity.</h1>
            <p>
              Discover rising athletes. Find NIL deals. Build recruiting visibility. Launch brand partnerships—from first match to signed, compliant campaign.
            </p>
            <div className="hero-actions">
              <Button asChild className="signal-button hero-button">
                <Link href="#marketplace">Explore the marketplace <ArrowDown /></Link>
              </Button>
              <Button asChild variant="outline" className="hero-secondary">
                <Link href="/brands">Launch a brand campaign <ArrowRight /></Link>
              </Button>
            </div>
            <div className="hero-trust">
              <span><BadgeCheck /> Source-linked profiles</span>
              <span><ShieldCheck /> Guardian-first</span>
              <span><Bot /> Agent-operated</span>
            </div>
          </div>

          <div className="hero-media" aria-label="Athletes creating sports content and connecting with opportunities">
            <img
              src="/varslink-hero.png"
              alt="A diverse group of fictional athletes creating sports content in a modern stadium environment"
            />
            <div className="hero-media-overlay" />
            <div className="floating-proof proof-one">
              <span><TrendingUp /></span>
              <div><small>Momentum signal</small><b>+52% this month</b></div>
            </div>
            <div className="floating-proof proof-two">
              <span><CircleDollarSign /></span>
              <div><small>Matched deal</small><b>92% brand fit</b></div>
            </div>
          </div>
        </div>
        <div className="signal-rail" aria-label="VarsLink capabilities">
          <span>ATHLETE DISCOVERY</span><i>●</i><span>NIL DEALS</span><i>●</i><span>RECRUITING VISIBILITY</span><i>●</i><span>LOCAL BUSINESS MATCHES</span><i>●</i><span>COMPLIANCE</span>
        </div>
      </section>

      <div id="marketplace"><Marketplace /></div>

      <section className="network-section">
        <div className="section-heading">
          <span className="eyebrow"><Radar /> One network, three growth loops</span>
          <h2>Built for athletes and the people ready to bet on them.</h2>
          <p>VarsLink brings creator discovery, recruiting proof, and commercial deal-making into one clean motion.</p>
        </div>
        <div className="audience-grid">
          <article>
            <span className="audience-icon"><Users /></span>
            <p className="card-index">01 / Athletes & families</p>
            <h3>Build a profile that opens more than one door.</h3>
            <p>Combine verified athletic proof, recruiting visibility, audience momentum, content strengths, and deal preferences.</p>
            <Link href="/claim">Claim your profile <ArrowRight /></Link>
          </article>
          <article>
            <span className="audience-icon"><Building2 /></span>
            <p className="card-index">02 / Brands & local businesses</p>
            <h3>Shop for fit—not follower count.</h3>
            <p>Set a goal and budget, then receive match-ranked athletes, recommended deliverables, pricing, and compliance gates.</p>
            <Link href="/brands">Build a campaign <ArrowRight /></Link>
          </article>
          <article>
            <span className="audience-icon"><ShieldCheck /></span>
            <p className="card-index">03 / Schools & compliance</p>
            <h3>See every deal before it becomes a problem.</h3>
            <p>Guardian approvals, disclosures, usage rights, state checks, deliverables, and payment status stay on one record.</p>
            <Link href="/compliance">Explore Compliance OS <ArrowRight /></Link>
          </article>
        </div>
      </section>

      <section className="agent-section">
        <div className="agent-section-copy">
          <span className="eyebrow"><Sparkles /> Agent-operated organization</span>
          <h2>Seven specialist agents. One accountable deal record.</h2>
          <p>
            VarsLink does more than introduce both sides. Each operating agent owns a bounded job, hands structured work to the next, and keeps a human-visible audit trail.
          </p>
          <Button asChild variant="outline" className="hero-secondary light-outline">
            <Link href="/dashboard">Open command center <ArrowRight /></Link>
          </Button>
        </div>
        <div className="agent-stack">
          {operatingAgents.map((agent, index) => (
            <article key={agent.name} className={`agent-row agent-${agent.tone}`}>
              <span className="agent-number">0{index + 1}</span>
              <div><h3>{agent.name}</h3><p>{agent.role}</p></div>
              <span className="agent-metric"><CheckCircle2 /> {agent.metric}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="eyebrow">The next deal starts with the right fit</span>
        <h2>From “we should work with athletes” to a campaign ready to run.</h2>
        <div>
          <Button asChild className="signal-button hero-button"><Link href="/brands">Start a campaign <ArrowRight /></Link></Button>
          <Link href="/athletes">Browse every athlete</Link>
        </div>
      </section>
    </main>
  );
}
