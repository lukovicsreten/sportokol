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

/**
 * Envelope sender for form mail.
 *
 * Must be on a domain verified in Resend. Sending from an address is
 * unrelated to whether that address can receive — no mailbox is needed
 * behind forms@, it only has to be a domain we are authorised to send as.
 */
export const MAIL_FROM = "Sportokol <forms@sportokol.com>";
