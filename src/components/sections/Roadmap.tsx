import { DeckIcon } from "@/components/ui/DeckIcon";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const PHASES = [
  {
    icon: "plug",
    label: "Phase 1 · Completed",
    title: "Official data integrations",
    body: "Fuse scout data with public and federation match feeds for a complete player picture.",
    done: true,
  },
  {
    icon: "dna",
    label: "Phase 2",
    title: "Digital twins",
    body: "Build a data model of each player from performance, physical and medical inputs.",
  },
  {
    icon: "heart-pulse",
    label: "Phase 3",
    title: "Injury prediction",
    body: "Use the twin to flag risk and inform load and development decisions.",
  },
  {
    icon: "server",
    label: "Phase 4",
    title: "Talent data platform",
    body: "License aggregated, consented data to sportstech and medtech partners.",
  },
];

export function Roadmap() {
  return (
    <Section id="roadmap" dark dots>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Vision &amp; Roadmap</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Where this goes
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {PHASES.map((p, i) => (
          <div key={p.title} className="relative">
            <Card
              dark
              delay={i * 0.1}
              className={p.done ? "border-lime shadow-[0_0_0_1px_rgba(198,241,53,0.4),0_0_32px_-8px_rgba(198,241,53,0.35)]" : undefined}
            >
              <div className="flex items-center justify-between">
                <div
                  className={
                    "flex h-11 w-11 items-center justify-center rounded-full " +
                    (p.done ? "bg-lime text-navy-950" : "bg-lime/15 text-lime")
                  }
                >
                  <DeckIcon name={p.icon} className="h-5 w-5" />
                </div>
                {p.done && (
                  <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                    Done
                  </span>
                )}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-lime">
                {p.label}
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-light">
                {p.body}
              </p>
            </Card>

            {i < PHASES.length - 1 && (
              <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center lg:flex">
                <DeckIcon name="arrow-right" className="h-6 w-6 text-lime" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="flex items-start gap-4 rounded-2xl border border-lime-dim bg-navy-800 px-6 py-6 sm:px-8">
          <DeckIcon name="lock" className="mt-1 h-5 w-5 shrink-0 text-lime" />
          <p className="text-sm leading-relaxed text-slate-light">
            <span className="font-semibold text-white">
              Privacy- &amp; consent-first by design.
            </span>{" "}
            Special-category and minors&rsquo; data is handled as a barrier
            to entry, not an afterthought - turning compliance into a moat.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
