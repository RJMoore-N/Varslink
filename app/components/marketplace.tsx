"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  ChevronRight,
  CircleDollarSign,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";
import { toast } from "sonner";
import { athletes, opportunities, type Athlete, type Opportunity } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type DealSelection = { athlete?: Athlete; opportunity?: Opportunity };

export function Marketplace() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("All sports");
  const [following, setFollowing] = useState<string[]>([]);
  const [selection, setSelection] = useState<DealSelection | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const visibleAthletes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return athletes.filter((athlete) => {
      const sportMatch = sport === "All sports" || athlete.sport === sport;
      const textMatch = !normalized || [athlete.name, athlete.sport, athlete.school, athlete.city, athlete.state, ...athlete.tags]
        .join(" ").toLowerCase().includes(normalized);
      return sportMatch && textMatch;
    });
  }, [query, sport]);

  function beginDeal(next: DealSelection) {
    setSubmitted(false);
    setSelection(next);
  }

  function toggleFollow(id: string, name: string) {
    const isFollowing = following.includes(id);
    setFollowing((current) => isFollowing ? current.filter((item) => item !== id) : [...current, id]);
    toast.success(isFollowing ? `${name} removed from your watchlist` : `${name} added to your watchlist`);
  }

  async function submitIntake(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    try {
      const response = await fetch("/api/intakes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "deal",
          name: form.get("name"),
          email: form.get("email"),
          organization: form.get("organization"),
          budget: form.get("budget"),
          goal: form.get("goal"),
          athleteId: selection?.athlete?.id,
          opportunityId: selection?.opportunity?.id,
        }),
      });
      if (!response.ok) throw new Error("Could not save deal request");
      setSubmitted(true);
      toast.success("Your deal desk is ready");
    } catch {
      toast.error("We couldn't save that yet. Check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="marketplace-shell" aria-labelledby="marketplace-title">
        <div className="marketplace-toolbar">
          <div>
            <span className="eyebrow"><span className="live-dot" /> Live marketplace</span>
            <h2 id="marketplace-title">Find the fit. Build the deal.</h2>
          </div>
          <div className="search-wrap">
            <Search aria-hidden="true" />
            <label className="sr-only" htmlFor="market-search">Search athletes and opportunities</label>
            <input
              id="market-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sport, city, audience or niche"
            />
          </div>
        </div>

        <Tabs defaultValue="athletes" className="market-tabs">
          <TabsList variant="line" aria-label="Marketplace views">
            <TabsTrigger value="athletes"><Sparkles /> For you</TabsTrigger>
            <TabsTrigger value="opportunities"><BriefcaseBusiness /> Open deals</TabsTrigger>
          </TabsList>

          <TabsContent value="athletes">
            <div className="filter-row" aria-label="Filter athletes by sport">
              {["All sports", "Basketball", "Football", "Soccer", "Track & field", "Volleyball", "Baseball"].map((label) => (
                <button
                  type="button"
                  key={label}
                  className={sport === label ? "filter-pill active" : "filter-pill"}
                  onClick={() => setSport(label)}
                  aria-pressed={sport === label}
                >
                  {label}
                </button>
              ))}
            </div>

            {visibleAthletes.length ? (
              <div className="athlete-feed">
                {visibleAthletes.map((athlete, index) => (
                  <article className={`athlete-card athlete-tone-${index % 4}`} key={athlete.id}>
                    <div className="athlete-visual">
                      <span className="athlete-initials">{athlete.initials}</span>
                      <div className="visual-topline">
                        <span>Illustrative · {athlete.sport}</span>
                        <span>{athlete.classYear}</span>
                      </div>
                      <div className="visual-caption">
                        <span className="momentum"><TrendingUp /> {athlete.momentum} momentum</span>
                        <button
                          type="button"
                          className={following.includes(athlete.id) ? "round-action active" : "round-action"}
                          onClick={() => toggleFollow(athlete.id, athlete.name)}
                          aria-label={`${following.includes(athlete.id) ? "Remove" : "Add"} ${athlete.name} ${following.includes(athlete.id) ? "from" : "to"} watchlist`}
                        >
                          {following.includes(athlete.id) ? <Heart fill="currentColor" /> : <Heart />}
                        </button>
                      </div>
                    </div>
                    <div className="athlete-copy">
                      <div className="athlete-name-line">
                        <div>
                          <h3>{athlete.name} {athlete.verified && <BadgeCheck aria-label="Verified profile" />}</h3>
                          <p>{athlete.position} · {athlete.school}</p>
                        </div>
                        <span className="location"><MapPin /> {athlete.city}, {athlete.state}</span>
                      </div>
                      <p className="athlete-bio">{athlete.bio}</p>
                      <div className="tag-row">
                        {athlete.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <div className="athlete-stats">
                        <div><b>{athlete.audience}</b><span>Audience</span></div>
                        <div><b>{athlete.engagement}</b><span>Engagement</span></div>
                        <div><b>{athlete.dealRange}</b><span>Typical deal</span></div>
                      </div>
                      <div className="card-actions">
                        <Button asChild variant="outline" className="soft-button">
                          <Link href={`/athletes/${athlete.id}`}>View profile <ChevronRight /></Link>
                        </Button>
                        <Button className="signal-button" onClick={() => beginDeal({ athlete })}>
                          Build a deal <ArrowRight />
                        </Button>
                      </div>
                      <div className="trust-line">
                        <ShieldCheck /> {athlete.guardianReady ? "Guardian workflow ready" : "Guardian verification required before contact"}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search />
                <h3>No exact matches yet</h3>
                <p>Clear a filter or search another sport, market, or creator niche.</p>
                <Button variant="outline" onClick={() => { setQuery(""); setSport("All sports"); }}>Reset search</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="opportunities">
            <div className="opportunity-grid">
              {opportunities.map((opportunity) => (
                <article className="opportunity-card" key={opportunity.id} id={opportunity.id}>
                  <div className="opportunity-topline">
                    <span>{opportunity.category}</span>
                    <span><Users /> {opportunity.slots} slots</span>
                  </div>
                  <p className="opportunity-brand">{opportunity.brand}</p>
                  <h3>{opportunity.title}</h3>
                  <p>{opportunity.summary}</p>
                  <div className="tag-row">
                    {opportunity.fit.map((fit) => <span key={fit}>{fit}</span>)}
                  </div>
                  <div className="opportunity-facts">
                    <span><Banknote /> {opportunity.budget}</span>
                    <span><MapPin /> {opportunity.location}</span>
                    <span><CalendarClock /> {opportunity.deadline}</span>
                  </div>
                  <div className="card-actions">
                    <Button asChild variant="outline" className="soft-button">
                      <Link href={`/opportunities#${opportunity.id}`}>Campaign details</Link>
                    </Button>
                    <Button className="signal-button" onClick={() => beginDeal({ opportunity })}>
                      Match me <WandSparkles />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Sheet open={Boolean(selection)} onOpenChange={(open) => !open && setSelection(null)}>
        <SheetContent className="deal-sheet">
          <SheetHeader>
            <span className="eyebrow"><ShoppingBag /> VarsLink deal desk</span>
            <SheetTitle>{submitted ? "Your agent team is on it." : "Turn this match into a real campaign."}</SheetTitle>
            <SheetDescription>
              {submitted
                ? "Scout, Matchmaker, Deal Architect, and Compliance Sentinel now have the brief."
                : "Give us the goal and budget. The agent team will return a fit-ranked, compliance-ready starting plan."}
            </SheetDescription>
          </SheetHeader>

          {submitted ? (
            <div className="deal-success">
              <span><Check /></span>
              <h3>Deal request received</h3>
              <p>Your next step is a structured match brief—not an unfiltered inbox.</p>
              <div className="agent-handoff-list">
                <div><BadgeCheck /><span><b>Scout</b> verifies the profile and current role.</span></div>
                <div><Sparkles /><span><b>Matchmaker</b> scores audience, values, location, and format.</span></div>
                <div><CircleDollarSign /><span><b>Deal Architect</b> builds scope, price, rights, and timeline.</span></div>
                <div><ShieldCheck /><span><b>Compliance</b> checks guardian, disclosure, school, and state gates.</span></div>
              </div>
              <Button asChild className="signal-button w-full"><Link href="/dashboard">Track it in Command Center</Link></Button>
            </div>
          ) : (
            <form className="deal-form" onSubmit={submitIntake}>
              {(selection?.athlete || selection?.opportunity) && (
                <div className="selected-item">
                  <Bookmark />
                  <span>
                    <small>Starting with</small>
                    <b>{selection.athlete?.name ?? selection.opportunity?.title}</b>
                  </span>
                </div>
              )}
              <label>
                Your name
                <input name="name" required autoComplete="name" placeholder="Alex Morgan" />
              </label>
              <label>
                Work email
                <input name="email" type="email" required autoComplete="email" placeholder="alex@company.com" />
              </label>
              <label>
                Brand or organization
                <input name="organization" required autoComplete="organization" placeholder="Your business" />
              </label>
              <label>
                Working budget
                <select name="budget" required defaultValue="">
                  <option value="" disabled>Select a range</option>
                  <option>$500–$2,500</option>
                  <option>$2,500–$10,000</option>
                  <option>$10,000–$50,000</option>
                  <option>$50,000+</option>
                </select>
              </label>
              <label>
                What should this campaign accomplish?
                <textarea name="goal" required rows={4} placeholder="Launch a new location, create reusable content, drive student traffic…" />
              </label>
              <div className="form-assurance"><ShieldCheck /> No athlete contact happens before identity and guardian gates clear.</div>
              <Button type="submit" className="signal-button w-full" disabled={submitting}>
                {submitting ? "Building your deal desk…" : "Start the agent workflow"} <ArrowRight />
              </Button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
