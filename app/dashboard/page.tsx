import type { Metadata } from "next";
import { CommandCenter } from "@/components/command-center";

export const metadata: Metadata = {
  title: "Agent Command Center",
  description: "VarsLink operating surface for athlete discovery, match scoring, deal workflows, compliance, content, settlement, and growth.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <main className="command-shell"><CommandCenter /></main>;
}
