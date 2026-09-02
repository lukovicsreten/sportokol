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
 * On the send. subdomain, not the root, because that is the domain verified
 * in Resend — and it is verified there deliberately. SPF allows exactly one
 * TXT record per name, and the root already carries Zoho's
 * (`v=spf1 include:zohomail.eu ~all`) for the mailboxes. Putting Resend on a
 * subdomain gives it its own SPF instead of merging two senders into one
 * fragile record, and keeps form-sending reputation off the domain the team
 * reads their mail on.
 *
 * The cosmetics do not matter here: this mail only ever goes to CONTACT_EMAIL,
 * so the sender address is seen by the team, never by an enquirer.
 *
 * No mailbox is needed behind forms@ — sending as an address is unrelated to
 * whether it can receive.
 */
export const MAIL_FROM = "Sportokol <forms@send.sportokol.com>";
