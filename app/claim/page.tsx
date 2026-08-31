import type { Metadata } from "next";
import { BadgeCheck, BookOpenCheck, LockKeyhole, ShieldCheck, UserRoundCheck } from "lucide-react";
import { ClaimProfileForm } from "@/components/intake-forms";

export const metadata: Metadata = {
  title: "Claim or Correct an Athlete Profile",
  description: "Athletes and guardians can securely claim, correct, control, or request removal of a VarsLink athlete profile.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/claim" },
};

export default function ClaimPage() {
  return (
    <main className="page-main">
      <section className="page-hero compact">
        <span className="eyebrow"><UserRoundCheck /> Athlete and family control</span>
        <h1>Claim the record. Control the opportunity.</h1>
        <p>Verify authority, correct public facts, set contact permissions, add athlete-owned context, and choose whether the profile accepts recruiting or brand interest.</p>
      </section>
      <section className="content-wrap claim-grid">
        <aside className="claim-aside">
          <h2>What happens next</h2>
          <p>Identity Operations processes every claim as a gated workflow. No private contact information is published from this form.</p>
          <ul>
            <li><BadgeCheck /><span>Match the claimant to the athlete or authorized guardian.</span></li>
            <li><BookOpenCheck /><span>Verify facts against the submitted public source.</span></li>
            <li><ShieldCheck /><span>Record guardian authority and approval scope for minors.</span></li>
            <li><LockKeyhole /><span>Apply visibility, contact, correction, or removal choices.</span></li>
          </ul>
        </aside>
        <ClaimProfileForm />
      </section>
    </main>
  );
}
