import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const PAGES: [string, number][] = [
  ["", 1],
  ["/manufacturers", 0.9],
  ["/buyers", 0.9],
  ["/services", 0.8],
  ["/industries", 0.9],
  ["/industries/stainless-steel", 0.9],
  ["/industries/copper", 0.9],
  ["/pilot", 0.8],
  ["/sample-report", 0.7],
  ["/how-it-works", 0.7],
  ["/about", 0.7],
  ["/contact", 0.8],
  ["/privacy", 0.2],
  ["/terms", 0.2],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return PAGES.map(([path, priority]) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
