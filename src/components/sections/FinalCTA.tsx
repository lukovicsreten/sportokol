import { DeckIcon } from "@/components/ui/DeckIcon";
import { DotBackground } from "@/components/ui/DotBackground";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/lib/cta";
import { companySite, contactEmail } from "@/lib/site";

/**
 * Three named routes instead of one generic "talk to us". A club and an
 * investor want different conversations, and each button opens a mail draft
 * whose subject says which one it is.
 */
const PATHS = [
  { ...CTA.demo, icon: "shield", primary: true },
  { ...CTA.deck, icon: "chart-up", primary: false },
  { ...CTA.scout, icon: "binoculars", primary: false },
];

export function FinalCTA() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 text-white"
    >
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            An eye on all the talent in the{" "}
            <span className="text-lime">country.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-light">
            Pick the conversation that fits. Every route goes straight to the
            founders.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PATHS.map((p, i) => (
            <li
              key={p.label}
              style={{ "--reveal-delay": `${i * 4}%` } as React.CSSProperties}
              className="reveal"
            >
              <a
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
              </a>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href={companySite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-medium text-white hover:text-lime"
            >
              <DeckIcon name="globe-alt" className="h-4 w-4 shrink-0 text-lime" />
              smsolutions.ai
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex min-h-11 items-center gap-2 font-medium text-white hover:text-lime"
            >
              <DeckIcon name="chat" className="h-4 w-4 shrink-0 text-lime" />
              {contactEmail}
            </a>
          </div>
          <p className="text-slate-light">
            Backed by SMART START &middot; Innovation Fund
          </p>
        </Reveal>
      </div>
    </section>
  );
}
