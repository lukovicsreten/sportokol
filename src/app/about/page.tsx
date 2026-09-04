import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import {
  SectionDark,
  SectionLight,
  EyebrowLabel,
  Reveal,
  RevealGrid,
  RevealItem,
} from "@/components/ui/primitives";
import { Card, IconBadge } from "@/components/ui/cards";
import { Constellation } from "@/components/ui/Constellation";
import { AnimatedTimeline, type Phase } from "@/components/ui/diagrams";
import { Callout } from "@/components/sections/shared";
import { TRACTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us — national talent infrastructure",
  description:
    "How Sportokol builds national talent infrastructure — a living record of every prospect, validated with FK TSC and the LALIGA Academy network.",
  alternates: { canonical: "/about" },
};

const DIFFERENTIATORS = [
  {
    title: "Federation-grade database",
    body: "National talent infrastructure incumbents structurally don't sell.",
  },
  {
    title: "Every talent, tracked over time",
    body: "A continuous record of each prospect — not a one-off video clip.",
  },
  {
    title: "Data no one else owns",
    body: "Proprietary observational data that compounds with every report.",
  },
];

/**
 * `href` links the organisation's own site, so a reader can check who they are
 * rather than taking the name on trust. It identifies the organisation — it is
 * not a citation for the engagement itself, and nothing here should imply the
 * linked site says anything about Sportokol.
 */
const STORIES: {
  name: string;
  badge: string;
  href?: string;
  points: string[];
}[] = [
  {
    name: "FK TSC Bačka Topola",
    badge: "Pilot completed",
    href: "https://www.fktsc.com/en/pocetna/",
    points: [
      "Serbian SuperLiga club that reached the UEFA Conference League knockout phase in 2023/24, matched only by Crvena zvezda and Partizan.",
      "A club built on youth: TSC develops from its own academy base and has produced players now at major European clubs.",
      "Delivered end-to-end framework tuned to the club's methodology, scouts onboarded, live database built pitch-side.",
    ],
  },
  {
    name: "LALIGA Academy",
    badge: "Active engagement",
    href: "https://www.laliga.com/en-GB/news/laliga-academy-madrid-gets-underway-with-twice-as-many-players-and-now-with-its-first-womens-youth-team",
    points: [
      // Figures are LALIGA's own, published on the page linked above. Naming
      // them beats "dozens of countries": a reader can check the number, and a
      // checkable number is worth more than a vague one.
      "One of world football's leading youth development networks — 650+ projects across 50+ countries, all run on the LALIGA methodology.",
      "Our route into Spain — a market of 21,000+ clubs and more than a million registered players.",
      "Benchmarks the platform against elite international academy standards, not only domestic ones.",
    ],
  },
];

const PHASES: Phase[] = [
  {
    phase: "Phase 1 · Completed",
    title: "Official data integrations",
    body: "Fuse scout data with public and federation match feeds for a complete player picture.",
    done: true,
  },
  {
    phase: "Phase 2",
    title: "Digital twins",
    body: "Build a data model of each player from performance, physical and medical inputs.",
  },
  {
    phase: "Phase 3",
    title: "Injury prediction",
    body: "Use the twin to flag risk and inform load and development decisions.",
  },
  {
    phase: "Phase 4",
    title: "Talent data platform",
    body: "License aggregated, consented data to sportstech and medtech partners.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="The wedge"
        headline="National talent **infrastructure**"
        subhead="A living, national map of every prospect in the country. Federations and academies stop losing future professionals to poor record-keeping, staff turnover and migration — because the knowledge now lives in one place they own."
      />

      <SectionDark aria-label="Why we are different">
        <Constellation strength={60} />
        <RevealGrid className="relative grid gap-6 md:grid-cols-3">
          {DIFFERENTIATORS.map((d, i) => (
            <RevealItem key={d.title} index={i}>
              <Card className="h-full">
                <IconBadge>
                  <span className="text-lg font-extrabold">◆</span>
                </IconBadge>
                <h2 className="mt-5 font-display text-xl font-extrabold">
                  {d.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">
                  {d.body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGrid>
      </SectionDark>

      <SectionLight id="traction" aria-label="Traction and validation">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <EyebrowLabel dark={false}>Traction &amp; validation</EyebrowLabel>
          </div>
          <h2 className="balance mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] text-ink-950 sm:text-5xl">
            Validated where it counts
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            The platform has been run with a club competing in Europe, is in
            daily use with academies and agencies, and has been vetted by a
            national innovation programme.
          </p>
        </Reveal>

        <RevealGrid className="mt-16 grid gap-6 sm:grid-cols-2">
          {TRACTION.map((t, i) => (
            <RevealItem key={t.title} index={i}>
              <Card dark={false} className="h-full">
                <h3 className="font-display text-lg font-extrabold leading-snug text-ink-950">
                  {t.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">
                  {t.body}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGrid>

        <RevealGrid className="mt-8 grid gap-6 lg:grid-cols-2">
          {STORIES.map((s, i) => (
            <RevealItem key={s.name} index={i}>
              <Card dark={false} className="h-full">
                <span className="inline-flex rounded-full bg-lime px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-ink-950">
                  {s.badge}
                </span>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-ink-950">
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-lime-deep/40 decoration-2 underline-offset-4 transition-colors hover:text-lime-deep"
                    >
                      {s.name}
                      <span className="sr-only"> (opens their own site)</span>
                    </a>
                  ) : (
                    s.name
                  )}
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-slate"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>
          ))}
        </RevealGrid>
      </SectionLight>

      <SectionDark aria-label="Vision and roadmap">
        <Constellation strength={70} />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <EyebrowLabel>Vision &amp; roadmap</EyebrowLabel>
          </div>
          <h2 className="balance mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
            Where this goes
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <AnimatedTimeline phases={PHASES} />
        </div>

        <Callout className="mt-16" lead="Privacy- & consent-first by design.">
          Special-category and minors&rsquo; data is handled as a barrier to
          entry, not an afterthought — turning compliance into a moat.
        </Callout>
      </SectionDark>
    </>
  );
}
