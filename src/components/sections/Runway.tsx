import { DeckIcon } from "@/components/ui/DeckIcon";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    range: "0–6 mo",
    title: "Build & convert",
    body: "Remove manual white-label work; move existing clients onto recurring plans",
  },
  {
    range: "6–14 mo",
    title: "Spain + US entry",
    body: "First paying academies abroad; commercial hire; burn ramps as we scale",
  },
  {
    range: "14–24 mo",
    title: "Seed-ready",
    body: "Majority-recurring ARR and a live second engine. Raise seed from strength.",
  },
];

const MILESTONES = [
  "$400–600K ARR, majority recurring",
  "Enterprise level paying accounts in Spain & the US",
  "Second and third engine live (multi-sport and data)",
];

export function Runway() {
  return (
    <Section id="runway">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>The Runway</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            $300K buys 24 months to a seed-ready company
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            We start ultra-lean and spend deliberately, hiring and market
            entry ramp the burn on purpose, while revenue climbs underneath
            it.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {STEPS.map((s, i) => (
          <div key={s.title} className="relative">
            <Card delay={i * 0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-lime">
                {s.range}
              </p>
              <h3 className="mt-1 text-base font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {s.body}
              </p>
            </Card>
            {i < STEPS.length - 1 && (
              <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center sm:flex">
                <DeckIcon name="arrow-right" className="h-6 w-6 text-lime" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
            The Math
          </p>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <span className="text-sm text-graphite">Today&rsquo;s burn</span>
              <span className="text-sm font-semibold text-ink">$4.5K/mo</span>
            </div>
            <div className="flex items-center justify-between border-b border-black/5 pb-4">
              <span className="text-sm text-graphite">Planned avg. burn</span>
              <span className="text-sm font-semibold text-ink">~$12.5K/mo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-graphite">Runway on $300K</span>
              <span className="text-sm font-semibold text-ink">24 months</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Seed-ready milestones
          </p>
          <ul className="mt-5 space-y-3">
            {MILESTONES.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <DeckIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                <span className="text-sm leading-relaxed text-slate-light">
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
