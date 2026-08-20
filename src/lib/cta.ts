import { contactEmail } from "./site";

/**
 * The site has no backend, so every call to action opens a pre-addressed
 * email. The subject encodes which path the visitor took, which is the point
 * of splitting the CTA by audience: an inbox that can tell a club demo
 * request apart from an investor one.
 */
function mailto(subject: string, body: string) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export const CTA = {
  demo: {
    label: "Book a demo",
    audience: "I'm a club, academy or agency",
    blurb:
      "See the scouting flow end to end, with your own age groups and positions.",
    href: mailto(
      "Demo request — Club / Academy / Agency",
      `Hi Sportokol team,

We would like to see the platform.

Organisation:
Role:
Sport:
Country:
Rough squad or roster size:

Thanks,`
    ),
  },
  deck: {
    label: "Request the deck",
    audience: "I'm an investor",
    blurb:
      "Get the full deck and a call with the founders about the pre-seed round.",
    href: mailto(
      "Investor deck request",
      `Hi Sportokol team,

Please send the deck.

Name:
Fund / angel:
Typical cheque size:
What caught your interest:

Thanks,`
    ),
  },
  scout: {
    label: "Join early access",
    audience: "I'm a scout",
    blurb:
      "Keep your own structured record of every player you track, from your phone.",
    href: mailto(
      "Early access — Scout",
      `Hi Sportokol team,

I scout and would like early access.

Name:
Sport:
Club or independent:
Country:

Thanks,`
    ),
  },
} as const;

/** Shorter label for the deck CTA where space is tight (the nav bar). */
export const DECK_NAV_LABEL = "Investor deck";
