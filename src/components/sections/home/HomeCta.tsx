import Link from "next/link";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { DotBackground } from "@/components/ui/DotBackground";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Home's closing section routes to the three deeper pages rather than
 * dead-ending in a mailto. Each card names its audience, so a club and an
 * investor are not asked to self-sort out of one generic button.
 */
const PATHS = [
  {
    icon: "shield",
    audience: "For clubs, academies & agencies",
    blurb:
      "See how scouts capture, compare and track players without filming a single match.",
    label: "Explore the product",
    href: "/product",
    primary: true,
  },
  {
    icon: "chart-up",
    audience: "For investors",
    blurb:
      "Traction, market, business model and the pre-seed round in one place.",
    label: "See the investor case",
    href: "/investors",
    primary: false,
  },
  {
    icon: "chat",
    audience: "Have a question?",
    blurb: "Book a demo, request the deck, or just ask us something.",
    label: "Get in touch",
    href: "/contact",
    primary: false,
  },
];

export function HomeCta() {
  return (
    <section
      id="contact"
      aria-label="Where to next"
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 text-white"
    >
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            An eye on all the talent in the{" "}
            <span className="text-lime">country.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-light">
            Pick the path that fits.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PATHS.map((p, i) => (
            <li
              key={p.href}
              style={{ "--reveal-delay": `${i * 4}%` } as React.CSSProperties}
              className="reveal"
            >
              <Link
                href={p.href}
                className={
                  "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 " +
                  (p.primary
                    ? "border-lime/50 bg-lime/10 hover:border-lime"
                    : "border-lime-dim bg-navy-800 hover:border-lime/40")
                }
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <DeckIcon name={p.icon} className="h-5 w-5" />
                </span>
                <span className="text-base font-semibold text-white">
                  {p.audience}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-light">
                  {p.blurb}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime">
                  {p.label}
                  <DeckIcon
                    name="arrow-right"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
