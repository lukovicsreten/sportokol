import { LogoWordmark } from "./Logo";
import { DeckIcon } from "./ui/DeckIcon";
import { CTA, DECK_NAV_LABEL } from "@/lib/cta";
import { contactEmail, companySite } from "@/lib/site";

const COLUMNS: {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "How it works", href: "#how-it-works" },
      { label: "AI layer", href: "#ai-layer" },
      { label: "Ask your database", href: "#ask" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Team", href: "#team" },
      { label: "Traction", href: "#traction" },
      { label: "Success stories", href: "#success-stories" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Investors",
    links: [
      { label: "The ask", href: "#ask-round" },
      { label: "Runway", href: "#runway" },
      { label: "Use of funds", href: "#use-of-funds" },
      { label: DECK_NAV_LABEL, href: CTA.deck.href },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.3fr_2fr]">
        <div className="flex flex-col gap-4">
          <LogoWordmark />
          <p className="max-w-xs text-lg font-medium leading-snug text-white">
            An eye on all the talent in the{" "}
            <span className="text-lime">country.</span>
          </p>
          <div className="mt-1 flex flex-col gap-1">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex min-h-11 w-fit items-center gap-2 text-sm text-slate-light hover:text-white"
            >
              <DeckIcon name="chat" className="h-4 w-4 shrink-0 text-lime" />
              {contactEmail}
            </a>
            <a
              href={companySite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 text-sm text-slate-light hover:text-white"
            >
              <DeckIcon name="globe-alt" className="h-4 w-4 shrink-0 text-lime" />
              smsolutions.ai
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">
                {col.heading}
              </h2>
              <ul className="mt-3 flex flex-col">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex min-h-11 w-full items-center text-sm text-slate-light hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-light sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; 2026 Sportokol / SM Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5">
            <a
              href="/privacy"
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              Privacy Policy
            </a>
            <span>Backed by SMART START &middot; Innovation Fund</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
