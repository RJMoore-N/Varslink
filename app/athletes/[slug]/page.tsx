import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, BookOpenCheck, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { athletes, athleteById } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

type AthletePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return athletes.map((athlete) => ({ slug: athlete.id }));
}

export async function generateMetadata({ params }: AthletePageProps): Promise<Metadata> {
  const { slug } = await params;
  const athlete = athleteById(slug);
  if (!athlete) return { title: "Athlete not found" };
  return {
    title: `${athlete.name} — ${athlete.sport} Athlete Profile`,
    description: `${athlete.name} is a ${athlete.position} in ${athlete.city}, ${athlete.state}. Explore athletic, audience, recruiting, and NIL deal-fit signals on VarsLink.`,
    alternates: { canonical: `/athletes/${athlete.id}` },
  };
}

export default async function AthletePage({ params }: AthletePageProps) {
  const { slug } = await params;
  const athlete = athleteById(slug);
  if (!athlete) notFound();

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${athlete.name} athlete profile`,
    description: athlete.bio,
    mainEntity: {
      "@type": "Person",
      name: athlete.name,
      affiliation: athlete.school,
      homeLocation: `${athlete.city}, ${athlete.state}`,
      description: `Illustrative VarsLink ${athlete.sport} marketplace profile.`,
    },
  };

  return (
    <main className="page-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
      <section className="page-hero compact">
        <Link href="/athletes" className="eyebrow"><ArrowLeft /> Athlete marketplace</Link>
        <h1>{athlete.name}</h1>
        <p>{athlete.position} · {athlete.sport} · {athlete.school} · {athlete.city}, {athlete.state}</p>
        <div className="page-actions">
          <Button asChild className="signal-button hero-button"><Link href="/brands">Build a deal around {athlete.name.split(" ")[0]} <ArrowRight /></Link></Button>
          <Button asChild variant="outline" className="hero-secondary"><Link href="/claim">Claim or correct profile</Link></Button>
        </div>
      </section>

      <section className="content-wrap detail-grid">
        <article className="detail-panel">
          <span className="eyebrow"><BadgeCheck /> Illustrative marketplace record</span>
          <h2>Athletic signal meets creator fit.</h2>
          <p>{athlete.bio}</p>
          <div className="metric-grid">
            <div className="metric-tile"><b>{athlete.audience}</b><span>Audience</span></div>
            <div className="metric-tile"><b>{athlete.engagement}</b><span>Engagement</span></div>
            <div className="metric-tile"><b>{athlete.momentum}</b><span>30-day momentum</span></div>
          </div>
          <h3>Natural partnership lanes</h3>
          <div className="tag-row">{athlete.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h3>Commercial starting range</h3>
          <p><b>{athlete.dealRange}</b> for an illustrative one-activation brief. Final pricing depends on usage rights, exclusivity, production, travel, duration, and deliverables.</p>
        </article>

        <aside className="detail-panel">
          <span className="eyebrow"><ShieldCheck /> VarsLink trust record</span>
          <h2>Contact is earned, not scraped.</h2>
          <ul className="check-list">
            <li><BadgeCheck /><span><b>Identity gate.</b> The athlete or authorized guardian must claim the record.</span></li>
            <li><BookOpenCheck /><span><b>Source ledger.</b> Athletic facts require a public source link and refresh date.</span></li>
            <li><ShieldCheck /><span><b>Guardian gate.</b> Minors cannot enter direct brand contact before guardian approval.</span></li>
            <li><TrendingUp /><span><b>Signal separation.</b> Verified facts stay separate from VarsLink fit and momentum estimates.</span></li>
          </ul>
          <Button asChild className="signal-button w-full"><Link href="/how-nil-works">Understand the full deal workflow <ArrowRight /></Link></Button>
        </aside>
      </section>
    </main>
  );
}
