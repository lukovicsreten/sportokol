import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { SportPills } from "@/components/ui/SportPills";
import {
  SectionDark,
  SectionLight,
  EyebrowLabel,
  Reveal,
  RevealGrid,
  RevealItem,
} from "@/components/ui/primitives";
import { Card, IconBadge } from "@/components/ui/cards";
import { TiltCard } from "@/components/ui/TiltCard";
import { Constellation } from "@/components/ui/Constellation";
import {
  DashboardMockup,
  AiAssessmentMockup,
} from "@/components/ui/DashboardMockup";
import { TypingChatBubbles } from "@/components/ui/TypingChatBubble";
import { DataStreamsDiagram } from "@/components/ui/diagrams";
import { STREAMS } from "@/lib/content";
import { Callout } from "@/components/sections/shared";
import { HowItWorks } from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  // 41 characters. The layout appends " | Sportokol", and Google truncates the
  // rendered title around 60 — the previous wording came to 63 and lost its
  // last words in the result. Dropping the word "Product" costs nothing and
  // puts the search phrase first.
  title: "Scouting software for clubs and academies",
  /** 147 characters, inside the ~160 Google renders. */
  description:
    "Capture, structure and act on scouting data in one place: pitch-side reports without video, one comparable database, and an AI layer that reads it.",
  alternates: { canonical: "/product" },
};

const AI_SOURCES = [
  {
    title: "Professional scouts",
    body: "Working scouts define what is observed and how it is weighted.",
  },
  {
    title: "Coaches",
    body: "Academy and first-team coaching methodology encoded into the framework.",
  },
  {
    title: "Ex-professional players",
    body: "Career-earned judgement about what actually translates to the top level.",
  },
  {
    title: "Active professionals",
    body: "Current players keep the standard calibrated to the modern game.",
  },
];

const QUERIES = [
  "Which U17 midfielders rate highest across all scouts?",
  "Show me left-footed defenders we haven't re-scouted in 6 months.",
  "Compare our top two strikers on physical data.",
];

export default function ProductPage() {
  return (
    <>
      <Hero
        eyebrow="The platform"
        headline="Capture, structure and act on **scouting data** — in one place"
        subhead="Scouts record what they see pitch-side — technical, physical and mental ratings plus written notes. Every observation lands in a structured, comparable database, and an AI layer turns it into clear assessments and instant answers."
        full={false}
        aside={
          <figure>
            <DashboardMockup />
            <figcaption className="mt-4 text-center text-sm text-mist">
              Live scouting dashboard — talent pipeline and top prospects at a
              glance
            </figcaption>
          </figure>
        }
      >
        <SportPills more={false} />
        <p className="mt-5 text-sm text-mist">
          Sport-agnostic architecture, more sports in active development.
        </p>
      </Hero>

      <HowItWorks />

      <SectionDark id="ai-layer" aria-label="The AI layer">
        <Constellation strength={70} />
        <div className="relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal>
              <EyebrowLabel>The AI layer</EyebrowLabel>
              <h2 className="balance mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
                Trained by the people who actually judge talent
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
                Our models are built on the methodology of working sports
                professionals. That is what makes the output precise enough for
                a club to act on.
              </p>
            </Reveal>

            <RevealGrid className="mt-10 grid gap-5 sm:grid-cols-2">
              {AI_SOURCES.map((s, i) => (
                <RevealItem key={s.title} index={i}>
                  <TiltCard strength={7}>
                  <Card className="h-full">
                    <IconBadge size="sm">
                      <span className="text-xs font-extrabold">★</span>
                    </IconBadge>
                    <h3 className="mt-4 font-display text-base font-extrabold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {s.body}
                    </p>
                  </Card>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGrid>
          </div>

          <figure>
            <AiAssessmentMockup />
            <figcaption className="mt-4 text-center text-sm text-mist">
              Auto-generated player assessment
            </figcaption>
          </figure>
        </div>

        <Reveal className="mt-14 rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-6 backdrop-blur-md sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            What it produces
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Overall assessment · Strengths &amp; gaps · Development trajectory ·
            Clear recommendation
          </p>
        </Reveal>
      </SectionDark>

      <SectionLight aria-label="Ask your database">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="order-2 rounded-2xl bg-ink-950 p-6 sm:p-8 lg:order-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              AI assistant
            </p>
            <TypingChatBubbles queries={QUERIES} className="mt-6" />
            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-mist">
              Natural-language assistant
            </p>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <h2 className="balance font-display text-4xl font-extrabold tracking-[-0.02em] text-ink-950 sm:text-5xl">
              Ask your whole database a question
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              No query language. No analyst. Anyone on staff can interrogate
              the entire talent pool in plain language and get an answer in
              seconds.
            </p>
          </Reveal>
        </div>
      </SectionLight>

      <SectionDark aria-label="The data asset">
        <Constellation strength={80} />
        <Reveal className="relative">
          <EyebrowLabel>The data asset</EyebrowLabel>
          <h2 className="balance mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
            Years of an athlete&rsquo;s life, <span className="text-lime">in structured data</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
            Four independent streams land on one athlete profile and keep
            building with months becoming years. The result is a longitudinal
            dataset on human development and performance that exists nowhere
            else.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              What we capture
            </p>
            <ul className="mt-6 space-y-5">
              {STREAMS.map((s) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    className="mt-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <div>
                    <p className="font-display text-base font-extrabold">
                      {s.title}
                    </p>
                    <p className="text-sm text-mist">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <div>
            <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              One profile, built over time
            </p>
            <DataStreamsDiagram className="mx-auto max-w-xl" />
            <p className="mt-5 text-center text-sm leading-relaxed text-mist">
              Every report, note, check-up and self-assessment attaches to the
              same athlete starting from the first trial to professional
              contract, across scouts, coaches and seasons.
            </p>
          </div>
        </div>

        <Callout
          className="mt-16"
          lead="Continuously enriched from open data and partnerships."
        >
          Proprietary observational data is automatically fused with
          open-source and public APIs and pending integrations with world
          leading sports and health tech products. Proprietary + public,
          combined into one record no competitor holds.
        </Callout>
      </SectionDark>
    </>
  );
}
