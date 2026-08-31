"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { dealTypes } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

async function saveIntake(payload: Record<string, FormDataEntryValue | null | undefined>) {
  const response = await fetch("/api/intakes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Request could not be saved");
  return response.json();
}

export function BrandBriefForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    try {
      await saveIntake({
        kind: "brand",
        name: data.get("name"),
        email: data.get("email"),
        organization: data.get("organization"),
        budget: data.get("budget"),
        goal: data.get("goal"),
        market: data.get("market"),
        dealType: data.get("dealType"),
      });
      setDone(true);
      toast.success("Campaign brief sent to the agent team");
    } catch {
      toast.error("We couldn't save the brief. Review the fields and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="claim-form" onSubmit={submit}>
      {done ? (
        <div className="claim-success">
          <span><Check /></span>
          <h2>Your campaign desk is open.</h2>
          <p>Scout and Matchmaker now have your market, goal, format, and budget. Deal Architect will turn the strongest match set into a structured brief.</p>
          <Button asChild className="signal-button"><Link href="/dashboard">Track agent handoffs <ArrowRight /></Link></Button>
        </div>
      ) : (
        <>
          <label>Your name<input name="name" required autoComplete="name" placeholder="Alex Morgan" /></label>
          <label>Work email<input name="email" type="email" required autoComplete="email" placeholder="alex@company.com" /></label>
          <label>Brand or organization<input name="organization" required autoComplete="organization" placeholder="Your business" /></label>
          <label>Target market<input name="market" required placeholder="Frederick, MD or national" /></label>
          <label>
            Campaign type
            <select name="dealType" required defaultValue="">
              <option value="" disabled>Select a deal type</option>
              {dealTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label>
            Working budget
            <select name="budget" required defaultValue="">
              <option value="" disabled>Select a range</option>
              <option>$500–$2,500</option><option>$2,500–$10,000</option><option>$10,000–$50,000</option><option>$50,000+</option>
            </select>
          </label>
          <label className="full">Campaign goal<textarea name="goal" required rows={5} placeholder="What should the athlete partnership make happen?" /></label>
          <div className="form-assurance full"><ShieldCheck /> VarsLink will not expose private athlete contact details. Matching, guardian approval, and compliance gates come first.</div>
          <Button type="submit" className="signal-button full" disabled={pending}>{pending ? "Starting the workflow…" : "Launch agent matching"} <Sparkles /></Button>
        </>
      )}
    </form>
  );
}

export function ClaimProfileForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    try {
      await saveIntake({
        kind: "claim",
        name: data.get("name"),
        email: data.get("email"),
        organization: data.get("athleteName"),
        goal: data.get("note"),
        role: data.get("role"),
        market: data.get("state"),
        sourceUrl: data.get("sourceUrl"),
        budget: data.get("minor"),
      });
      setDone(true);
      toast.success("Profile claim received");
    } catch {
      toast.error("We couldn't save the claim. Review the fields and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="claim-form" onSubmit={submit}>
      {done ? (
        <div className="claim-success">
          <span><Check /></span>
          <h2>Your claim is in the verification queue.</h2>
          <p>Identity Operations will verify authority, source records, and guardian status before any profile or contact setting changes.</p>
          <Button asChild className="signal-button"><Link href="/athletes">Return to athlete marketplace <ArrowRight /></Link></Button>
        </div>
      ) : (
        <>
          <label>Your full name<input name="name" required autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Athlete name<input name="athleteName" required /></label>
          <label>
            Your role
            <select name="role" required defaultValue=""><option value="" disabled>Select your role</option><option>Athlete</option><option>Parent or legal guardian</option><option>Authorized representative</option><option>School or compliance staff</option></select>
          </label>
          <label>State<input name="state" required maxLength={2} placeholder="MD" /></label>
          <label>
            Is the athlete under 18?
            <select name="minor" required defaultValue=""><option value="" disabled>Select one</option><option>Yes — guardian approval required</option><option>No — athlete is 18+</option></select>
          </label>
          <label className="full">Public source URL<input name="sourceUrl" type="url" required placeholder="School roster, recruiting page, stats, or coverage" /></label>
          <label className="full">What should be claimed or corrected?<textarea name="note" rows={5} required /></label>
          <div className="form-assurance full"><ShieldCheck /> Submitting a claim does not publish private data. Identity and authority are verified before changes.</div>
          <Button type="submit" className="signal-button full" disabled={pending}>{pending ? "Sending to verification…" : "Submit secure profile claim"} <ArrowRight /></Button>
        </>
      )}
    </form>
  );
}
