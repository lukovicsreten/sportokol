"use client";


import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { DeckIcon, IconTile } from "@/components/ui/DeckIcon";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: "clipboard-check",
    step: "1",
    title: "Capture",
    body: "Scouts record what they see at training or matches mobile, pitch-side, no film crew, any sport.",
    tags: ["Technical", "Physical", "Mental", "Free-text notes"],
  },
  {
    icon: "database",
    step: "2",
    title: "Structure",
    body: "Every report lands in one live database comparable and trackable across scouts, months and seasons.",
    tags: ["Sport", "Age", "Position"],
    note: "Real-time · auto-enriched by open public APIs",
  },
  {
    icon: "brain",
    step: "3",
    title: "Intelligence",
    body: "AI turns raw reports into decisions, trained on the methodology of pro scouts, coaches and players.",
    bullets: [
      "Player assessment - scores, strengths, gaps, trajectory, rec.",
      "Ask-anything queries across the whole pool",
    ],
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-label="How it works">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>How It Works</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            From a pitch-side note to a decision, in one flow
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            Three steps, one system built so a scout barely changes their
            routine, and every observation compounds into something a club
            can act on.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {STEPS.map((s, i) => (
          <div key={s.title} className="relative">
            <Card delay={i * 0.1} className="h-full">
              <div className="flex items-start justify-between">
                <IconTile name={s.icon} dark={false} />
                <span className="text-3xl font-bold text-black/[0.08]">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {s.body}
              </p>

              {s.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <Badge key={t} tone="white" variant="outline" className="px-3 py-1 text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              {s.note && (
                <p className="mt-3 text-xs font-medium text-graphite">
                  {s.note}
                </p>
              )}
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-sm leading-relaxed text-graphite"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            {i < STEPS.length - 1 && (
              <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center md:flex">
                <DeckIcon name="arrow-right" className="h-6 w-6 text-lime-ink" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl bg-navy-950 px-6 py-8 text-center sm:px-10">
          <p className="balance text-lg leading-relaxed text-white sm:text-xl">
            <span className="font-bold text-lime">The moat is the data.</span>{" "}
            Proprietary observational data no video-based incumbent can reach
            also enriched by public feeds, trained by professionals, and
            compounding with every single report.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
