import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.varslink.com"),
  title: {
    default: "VarsLink | Athlete Opportunity Network",
    template: "%s | VarsLink",
  },
  description: "Find athletes, NIL deals, sports sponsorships, recruiting profiles, and compliant brand partnerships on VarsLink.",
  keywords: [
    "NIL deals",
    "athlete sponsorships",
    "businesses working with athletes",
    "athlete recruiting profiles",
    "sports brand deals",
    "NIL marketplace",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "VarsLink — Where athletic momentum becomes opportunity",
    description: "Discover athletes, find NIL deals, build recruiting visibility, and launch compliant brand partnerships.",
    url: "https://www.varslink.com/",
    siteName: "VarsLink",
    type: "website",
    images: [{ url: "/varslink-hero.png", width: 1586, height: 992, alt: "VarsLink athlete opportunity network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VarsLink — Athlete Opportunity Network",
    description: "Athlete discovery, NIL deals, recruiting visibility, and brand partnerships in one network.",
    images: ["/varslink-hero.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#071414",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
