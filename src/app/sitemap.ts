import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * The site is a single page, so the sitemap has one real URL. Anchor
 * fragments are deliberately left out — Google treats `/#platform` as the
 * same document as `/` and listing them adds noise, not coverage.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
