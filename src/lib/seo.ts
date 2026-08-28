/**
 * One source for everything that needs the site's public address: canonicals,
 * Open Graph, sitemap, robots and JSON-LD.
 *
 * A canonical must point at the domain the page is actually served from —
 * aiming it elsewhere tells Google the content belongs to another site and
 * can keep it out of the index. So the default is the live deployment, and a
 * real domain arrives through NEXT_PUBLIC_SITE_URL (Vercel → Settings →
 * Environment Variables) once one exists.
 */
const FALLBACK_URL = "https://sportokol-beta.vercel.app";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/$/, "");

export const siteName = "Sportokol";

/** 58 characters — inside what Google renders before truncating. */
export const siteTitle = "Sportokol — Scouting platform for youth sport";

/** 154 characters. */
export const siteDescription =
  "Sportokol turns pitch-side scouting into a national database of talent for football, basketball and tennis. Built for clubs, academies and federations.";

export const siteKeywords = [
  "scouting platform",
  "youth talent tracking",
  "football academy software",
  "sports talent database",
  "player scouting software",
  "talent identification",
];

export const contactEmail = "info@smsolutions.ai";
export const companySite = "https://smsolutions.ai";

/** Indexable routes. Order matches the nav. */
export const ROUTES = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/product", priority: 0.9 },
  { path: "/team", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
] as const;
