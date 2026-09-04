"use client";

import { useRef, useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { EyebrowLabel, TextReveal, LeadParagraph } from "@/components/ui/primitives";
import { IconBadge } from "@/components/ui/cards";
import { Callout } from "@/components/sections/shared";
import { FloatingMotes } from "@/components/ui/Backdrop";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";
import {
  CaptureIcon,
  StructureIcon,
  IntelligenceIcon,
} from "@/components/ui/StepIcons";

// `n` is no longer rendered — each heading now opens with "Step 1" and so on.
// It stays as a stable React key, which is better than keying off a display
// string that copy edits will change.
const STEPS = [
  {
    n: "01",
    Icon: CaptureIcon,
    title: "Step 1: Capture Pitch-Side Observations",
    body: "Scouts record what they see at training or matches, mobile, pitch-side, no film crew, any sport.",
    listLabel: "What the scout enters",
    items: ["Technical", "Physical", "Mental", "Free-text notes"],
  },
  {
    n: "02",
    Icon: StructureIcon,
    title: "Step 2: Structure Data into a Searchable Database",
    body: "Every report lands in one live database, comparable and trackable across scouts, months and seasons.",
    listLabel: "Becomes a filterable player index",
    items: ["Sport", "Age", "Position"],
    note: "Real-time · auto-enriched by open public APIs",
  },
  {
    n: "03",
    Icon: IntelligenceIcon,
    title: "Step 3: Get AI-Powered Player Intelligence",
    body: "AI turns raw reports into decisions, trained on the methodology of pro scouts, coaches and players.",
    listLabel: "What the AI produces",
    items: [
      "Player assessment — scores, strengths, gaps, trajectory, rec.",
      "Ask-anything queries across the whole pool",
    ],
  },
];

function StepPanel({
  step,
  active,
}: {
  step: (typeof STEPS)[number];
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-7 transition-all duration-500 sm:p-8",
        active
          ? "border-lime/50 bg-white/[0.06] opacity-100 shadow-[0_24px_70px_-30px_rgba(198,241,53,0.45)]"
          : "border-white/10 bg-white/[0.02] opacity-45"
      )}
    >
      {/* Icon leads, number sits beside it as a small ordinal — the glyph
          says what the step is, the number says where it sits in the flow. */}
      <div className="flex items-center gap-4">
        <IconBadge
          tone={active ? "solid" : "outline"}
          className="transition-colors duration-500"
        >
          <step.Icon className="h-6 w-6" />
        </IconBadge>
        <h3 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">
          {step.title}
        </h3>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-mist">{step.body}</p>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-lime">
        {step.listLabel}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {step.items.map((t) => (
          <li
            key={t}
            className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-mist"
          >
            {t}
          </li>
        ))}
      </ul>
      {step.note && <p className="mt-3 text-xs text-mist">{step.note}</p>}
    </div>
  );
}

function Header() {
  return (
    <>
      <EyebrowLabel>How it works</EyebrowLabel>
      <TextReveal
        as="h2"
        trigger="scroll"
        text="How the **AI Scouting Platform** Works in 3 Steps"
        className="mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl"
      />
      <LeadParagraph className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
        Three steps, one system built so a scout barely changes their routine,
        and every observation compounds into something a club can act on.
      </LeadParagraph>
    </>
  );
}

const MOAT = (
  <Callout lead="The moat is the data.">
    Proprietary observational data no video-based incumbent can reach — also
    enriched by public feeds, trained by professionals, and compounding with
    every single report.
  </Callout>
);

/**
 * Pinned variant.
 *
 * Split into its own component on purpose: `useScroll` binds to whatever the
 * ref holds on the render it first runs. When this lived in the parent
 * alongside the plain-list branch, the ref was still null on the first render
 * (the parent starts un-pinned so server and client agree), the hook never
 * attached to the track, and the step index stayed on 01 forever. Mounting
 * this only once the pinned markup exists means the ref is populated from its
 * very first render.
 */
function PinnedSteps() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
    setIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="grain relative bg-ink-950 text-white"
    >
      <div ref={trackRef} className="relative h-[280vh]">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
          <FloatingMotes />
          <div className="relative z-[2] mx-auto grid w-full max-w-7xl gap-14 px-6 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Header />
              <div className="mt-9 flex gap-2" aria-hidden="true">
                {STEPS.map((s, i) => (
                  <span
                    key={s.n}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-500",
                      i <= index ? "bg-lime" : "bg-white/12"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <StepPanel key={s.n} step={s} active={i === index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-6 pb-28 sm:px-8 md:pb-36">
        {MOAT}
      </div>
    </section>
  );
}

/**
 * Plain stacked variant for touch and reduced motion. A pinned section on a
 * phone fights the user's own scrolling, so it is not used there at all.
 */
function StackedSteps() {
  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="grain relative overflow-hidden bg-ink-950 py-28 text-white md:py-36"
    >
      <FloatingMotes />
      <div className="relative z-[2] mx-auto max-w-7xl px-6 sm:px-8">
        <Header />
        <div className="mt-12 space-y-5">
          {STEPS.map((s, i) => (
            <m.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepPanel step={s} active />
            </m.div>
          ))}
        </div>
        <div className="mt-14">{MOAT}</div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { rich } = useMotionPrefs();
  return rich ? <PinnedSteps /> : <StackedSteps />;
}
