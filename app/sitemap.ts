import type { MetadataRoute } from "next";
import { athletes } from "@/app/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.varslink.com";
  const now = new Date();
  const routes = [
    ["", 1, "daily"],
    ["/athletes", 0.9, "daily"],
    ["/opportunities", 0.9, "daily"],
    ["/brands", 0.85, "weekly"],
    ["/recruiting", 0.85, "weekly"],
    ["/how-nil-works", 0.85, "weekly"],
    ["/compliance", 0.75, "weekly"],
    ["/claim", 0.65, "monthly"],
  ] as const;
  return [
    ...routes.map(([path, priority, changeFrequency]) => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority })),
    ...athletes.map((athlete) => ({ url: `${base}/athletes/${athlete.id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
