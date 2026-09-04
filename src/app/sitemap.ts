import type { MetadataRoute } from "next";
import { siteUrl, ROUTES } from "@/lib/seo";
import { publishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const live = publishedPosts();

  const pages = ROUTES
    // The blog index is noindex while nothing is published (see blog/page.tsx),
    // and a sitemap entry for a noindex page asks Google to crawl something it
    // is then told to ignore. It joins the sitemap with the first post.
    .filter(({ path }) => path !== "/blog" || live.length > 0)
    .map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    }));

  // Only live posts. Drafts carry noindex, so listing them here would ask
  // Google to crawl pages it is then told to ignore.
  const posts = live.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.published!),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
