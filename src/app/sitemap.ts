import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * /privacy is deliberately absent: it is noindex placeholder content, and a
 * sitemap entry would ask Google to crawl what the page itself refuses.
 */
const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/product", priority: 0.9 },
  { path: "/investors", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
