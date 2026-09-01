/**
 * Where enquiries go.
 *
 * In its own module because two unrelated consumers need it and they must not
 * drift: the visible UI (contact form, footer, contact page) and the
 * Organization JSON-LD. This used to be two separate literals — one in nav.ts,
 * one in seo.ts — which is precisely the arrangement that lets an address
 * change land in one and get missed in the other.
 */
export const CONTACT_EMAIL = "info@sportokol.com";

/** Parent company. Sportokol is a product of Sports Management Systems. */
export const COMPANY_SITE = "https://smsolutions.ai";
