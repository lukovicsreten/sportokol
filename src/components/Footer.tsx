import { LogoWordmark } from "./Logo";

const LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Platform", href: "#platform" },
  { label: "Traction", href: "#traction" },
  { label: "Market", href: "#market" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <LogoWordmark />
          <p className="max-w-xs text-sm text-slate-light">
            A scout-first platform turning pitch-side observation into a
            living, national database of talent.
          </p>
        </div>

        {/* -my-2 keeps the visual rhythm while the padding gives each link a
            finger-sized hit area on touch screens. */}
        <div className="-my-2 flex flex-wrap gap-x-4 text-sm text-slate-light">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              // Explicit colour: an <a> with no colour falls back to the UA's
              // link blue, which the dark colour-scheme renders at 2.4:1 here.
              className="inline-flex min-h-11 items-center px-2 text-slate-light hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-light sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; 2026 Sportokol. All rights reserved.</p>
          <p>Backed by SMART START &middot; Innovation Fund</p>
        </div>
      </div>
    </footer>
  );
}
