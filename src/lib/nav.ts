/** Single source for the primary navigation and the footer's repeat of it. */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Team", href: "/team" },
  { label: "Get in touch", href: "/contact" },
] as const;

/**
 * The footer carries one extra link.
 *
 * The blog sits here rather than in the header on purpose: with nothing
 * published it would send visitors from the main navigation to an empty page.
 * The footer keeps it reachable and crawlable in the meantime. Move it into
 * NAV_LINKS once the first article is live.
 */
export const FOOTER_LINKS = [...NAV_LINKS, { label: "Blog", href: "/blog" }] as const;

// Re-exported so the existing `@/lib/nav` import sites keep working, while the
// values themselves live in one place. See contact.ts.
export { CONTACT_EMAIL, COMPANY_SITE } from "@/lib/contact";
