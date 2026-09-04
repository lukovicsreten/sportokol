"use client";

import { useState } from "react";
import { m, AnimatePresence } from "@/components/motion/Motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";

/**
 * Stylised product UI, built in the site's own design language rather than
 * screenshotted. It stays sharp at any size, weighs nothing, and — unlike a
 * real screenshot of the app — puts no actual athletes' names or ratings on a
 * public marketing page.
 *
 * The filter row is real. It demonstrates the filterable player index the copy
 * claims further down the page instead of only asserting it. Everything else
 * stays inert on purpose: a mock "+ Add player" that opened nothing would be
 * worse than one that never invited the click, so it is a span with no hover
 * and no pointer cursor, while the filters look and behave like controls.
 */
type Player = {
  initials: string;
  pos: string;
  age: string;
  rating: number;
  /** Seen again since the first report. Drives the "Not re-scouted" filter. */
  reScouted: boolean;
};

const PLAYERS: Player[] = [
  { initials: "MK", pos: "ST", age: "U19", rating: 8.4, reScouted: true },
  { initials: "LP", pos: "CM", age: "U17", rating: 7.9, reScouted: false },
  { initials: "DJ", pos: "CB", age: "U17", rating: 8.1, reScouted: true },
  { initials: "NS", pos: "RW", age: "U15", rating: 7.6, reScouted: false },
  { initials: "AV", pos: "GK", age: "U19", rating: 8.7, reScouted: true },
  { initials: "FM", pos: "LB", age: "U17", rating: 7.3, reScouted: false },
];

/** Each filter deliberately matches at least one player — an empty mock reads
 *  as a broken one rather than as a demonstration. */
const FILTERS: { label: string; match: (p: Player) => boolean }[] = [
  { label: "All sports", match: () => true },
  { label: "U17", match: (p) => p.age === "U17" },
  { label: "Top rated", match: (p) => p.rating >= 8 },
  { label: "Not re-scouted", match: (p) => !p.reScouted },
];

export function DashboardMockup({ className }: { className?: string }) {
  const [active, setActive] = useState<string>(FILTERS[0].label);
  const { reduced } = useMotionPrefs();

  const shown = PLAYERS.filter(
    (FILTERS.find((f) => f.label === active) ?? FILTERS[0]).match
  );

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "animate-drift overflow-hidden rounded-2xl border border-white/12 bg-ink-900/80 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
        <span className="ml-3 text-xs font-semibold text-mist">Players</span>
        <span className="ml-auto rounded-full bg-lime px-2.5 py-1 text-[10px] font-extrabold text-ink-950">
          + Add player
        </span>
      </div>

      <div
        role="group"
        aria-label="Filter the example players"
        className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3"
      >
        {FILTERS.map((f) => {
          const on = f.label === active;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.label)}
              className={cn(
                // The pill keeps the scaled-down look of the mock while the
                // pseudo-element grows the touch target past 44px without
                // moving a visible pixel. Vertical only — widening it sideways
                // would overlap the neighbouring pill's target.
                "relative cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                "after:absolute after:-inset-y-3 after:inset-x-0 after:content-['']",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
                on
                  ? "bg-lime text-ink-950"
                  : "bg-white/[0.06] text-mist hover:bg-white/[0.12] hover:text-white"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/*
        The panel takes its height from what is shown, so filtering shrinks it.
        Reserving the full six-card height was tried first and looked worse —
        half the panel sat empty. Shrinking is what a filtered list does, and
        it costs no CLS: the change follows a click, and layout shifts within
        500ms of an interaction are excluded from the metric.
      */}
      <ul className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3">
        <AnimatePresence initial={false} mode="sync">
          {shown.map((p, i) => (
            <m.li
              key={p.initials}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.35, delay: reduced ? 0 : i * 0.05 },
              }}
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }
              }
              className="h-fit rounded-xl border border-white/8 bg-white/[0.03] p-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/15 text-[11px] font-extrabold text-lime">
                {p.initials}
              </span>
              <div className="mt-2.5 h-1.5 w-3/4 rounded-full bg-white/12" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/8" />
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-mist">
                  {p.pos} &middot; {p.age}
                </span>
                <span className="text-[11px] font-extrabold text-lime">
                  {p.rating.toFixed(1)}
                </span>
              </div>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* The cards carry no readable text of their own — initials and bars —
          so the effect of pressing a filter is announced here instead. */}
      <p aria-live="polite" className="sr-only">
        Showing {shown.length} of {PLAYERS.length} example players, filtered by{" "}
        {active}.
      </p>
    </m.div>
  );
}

/** Companion mock for the AI layer: an auto-generated assessment read-out. */
export function AiAssessmentMockup({ className }: { className?: string }) {
  const rows = [
    { label: "Overall assessment", w: "92%", c: "#C6F135" },
    { label: "Key strengths", w: "78%", c: "#5AC8FA" },
    { label: "Areas for improvement", w: "61%", c: "#FB923C" },
    { label: "Development trajectory", w: "85%", c: "#4ADE80" },
  ];
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl border border-white/12 bg-ink-900/80 p-6 backdrop-blur-md",
        className
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-extrabold">AI analysis</span>
        <span className="rounded-full bg-lime/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-lime">
          Auto-generated
        </span>
      </div>
      <m.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } }}
        className="space-y-5"
      >
        {rows.map((r) => (
          <m.li
            key={r.label}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-mist">
              {r.label}
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
              <m.div
                variants={{
                  hidden: { width: 0 },
                  visible: {
                    width: r.w,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="h-full rounded-full"
                style={{ backgroundColor: r.c }}
              />
            </div>
          </m.li>
        ))}
      </m.ul>
      <p className="mt-6 border-t border-white/10 pt-4 text-xs text-mist">
        Recommendation · scores, strengths, gaps and trajectory in one place
      </p>
    </m.div>
  );
}
