/**
 * Single source of truth for anything that needs the site's public address:
 * canonical URLs, Open Graph, sitemap, robots and JSON-LD.
 *
 * Canonical URLs must point at the domain the page is actually served from —
 * pointing them at a different site tells Google this content belongs
 * elsewhere and can keep it out of the index entirely. So the default is the
 * live deployment, and a real domain is supplied via NEXT_PUBLIC_SITE_URL
 * (set it in Vercel → Settings → Environment Variables) once one exists.
 */
const FALLBACK_URL = "https://sportokol-beta.vercel.app";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/$/, "");

export const siteName = "Sportokol";

export const siteTitle =
  "Sportokol — Never Lose a Future Professional Again";

/** 158 characters — inside the ~160 Google renders before truncating. */
export const siteDescription =
  "Sportokol turns pitch-side scouting into a living national database of talent. Rate, track and compare youth players across clubs, academies and federations.";

export const siteKeywords = [
  "sports scouting software",
  "youth talent management",
  "football scouting platform",
  "academy player tracking",
  "sports data platform",
  "talent identification",
  "scouting database",
];

export const contactEmail = "info@smsolutions.ai";
export const companySite = "https://smsolutions.ai";
