"use client";

import { m } from "@/components/motion/Motion";
import { cn } from "@/lib/cn";

/**
 * Stylised product UI, built in the site's own design language rather than
 * screenshotted. It stays sharp at any size, weighs nothing, and — unlike a
 * real screenshot of the app — puts no actual athletes' names or ratings on a
 * public marketing page.
 */
const PLAYERS = [
  { initials: "MK", pos: "ST", age: "U19", rating: 8.4 },
  { initials: "LP", pos: "CM", age: "U17", rating: 7.9 },
  { initials: "DJ", pos: "CB", age: "U17", rating: 8.1 },
  { initials: "NS", pos: "RW", age: "U15", rating: 7.6 },
  { initials: "AV", pos: "GK", age: "U19", rating: 8.7 },
  { initials: "FM", pos: "LB", age: "U17", rating: 7.3 },
];

export function DashboardMockup({ className }: { className?: string }) {
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

      <div className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3">
        {["All sports", "U17", "Top rated", "Not re-scouted"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold",
              i === 0 ? "bg-lime text-ink-950" : "bg-white/[0.06] text-mist"
            )}
          >
            {f}
          </span>
        ))}
      </div>

      <m.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
        className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-3"
      >
        {PLAYERS.map((p) => (
          <m.li
            key={p.initials}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
            className="rounded-xl border border-white/8 bg-white/[0.03] p-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime/15 text-[11px] font-extrabold text-lime">
              {p.initials}
            </span>
            <div className="mt-2.5 h-1.5 w-3/4 rounded-full bg-white/12" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/8" />
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-mist">
                {p.pos} · {p.age}
              </span>
              <span className="text-[11px] font-extrabold text-lime">
                {p.rating.toFixed(1)}
              </span>
            </div>
          </m.li>
        ))}
      </m.ul>
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
