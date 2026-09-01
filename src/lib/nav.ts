/** Single source for the primary navigation and the footer's repeat of it. */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Team", href: "/team" },
  { label: "Get in touch", href: "/contact" },
] as const;

// Re-exported so the existing `@/lib/nav` import sites keep working, while the
// values themselves live in one place. See contact.ts.
export { CONTACT_EMAIL, COMPANY_SITE } from "@/lib/contact";
