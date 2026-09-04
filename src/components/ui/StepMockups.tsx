"use client";

import { m } from "@/components/motion/Motion";
import { cn } from "@/lib/cn";

/**
 * The three step mockups for "How it works".
 *
 * Drawn in the site's own design language rather than screenshotted, for the
 * same reason as the dashboard mock: a real screenshot of a scouting tool puts
 * identifiable children's names and ratings on a public marketing page.
 *
 * Each is deliberately a standalone component with the same contract —
 * `{ className }`, no props, no data — so swapping one for a real screenshot
 * later is a one-line change inside that component and nothing else moves.
 * Everything is DOM and CSS: no image requests, sharp at any density, and
 * nothing to lazy-load.
 */

const FRAME =
  "overflow-hidden rounded-xl border border-white/10 bg-ink-950/60 backdrop-blur-sm";

/** Small header strip, so the three read as parts of one product. */
function Chrome({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      <span className="h-1.5 w-1.5 rounded-full bg-lime/60" />
      <span className="ml-2 text-[10px] font-semibold text-mist">{label}</span>
      {right && (
        <span className="ml-auto rounded-full bg-white/[0.07] px-2 py-0.5 text-[9px] font-bold text-mist">
          {right}
        </span>
      )}
    </div>
  );
}

/** Filled/empty pips — a rating without inventing a real player's score. */
function Pips({ filled, total = 10 }: { filled: number; total?: number }) {
  return (
    <span className="flex gap-[3px]" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i < filled ? "bg-lime" : "bg-white/12"
          )}
        />
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * 1 — Capture
 * ---------------------------------------------------------------------- */

const RATINGS = [
  { label: "Technical", filled: 8 },
  { label: "Physical", filled: 6 },
  { label: "Mental", filled: 9 },
];

export function CaptureMockup({ className }: { className?: string }) {
  return (
    <div className={cn(FRAME, className)} aria-hidden="true">
      <Chrome label="New report" right="U17" />
      <div className="space-y-3 p-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime/15 text-[10px] font-extrabold text-lime">
            LP
          </span>
          <span className="h-1.5 w-24 rounded-full bg-white/14" />
          <span className="ml-auto h-1.5 w-10 rounded-full bg-white/8" />
        </div>

        {RATINGS.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold text-mist">{r.label}</span>
            <Pips filled={r.filled} />
          </div>
        ))}

        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
          <span className="block h-1.5 w-full rounded-full bg-white/10" />
          <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-white/8" />
        </div>

        <span className="block rounded-full bg-lime py-1.5 text-center text-[10px] font-extrabold text-ink-950">
          Save report
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2 — Structure
 * ---------------------------------------------------------------------- */

const ROWS = [
  { initials: "MK", meta: "ST · U19", rating: "8.4" },
  { initials: "LP", meta: "CM · U17", rating: "7.9" },
  { initials: "DJ", meta: "CB · U17", rating: "8.1" },
  { initials: "NS", meta: "RW · U15", rating: "7.6" },
];

export function StructureMockup({ className }: { className?: string }) {
  return (
    <div className={cn(FRAME, className)} aria-hidden="true">
      <Chrome label="Player index" right="248 players" />
      <div className="flex gap-1.5 border-b border-white/8 px-3 py-2">
        {["Sport", "Age", "Position"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-2 py-0.5 text-[9px] font-bold",
              i === 0 ? "bg-lime text-ink-950" : "bg-white/[0.07] text-mist"
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <ul className="divide-y divide-white/6">
        {ROWS.map((r) => (
          <li key={r.initials} className="flex items-center gap-2.5 px-3 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime/12 text-[9px] font-extrabold text-lime">
              {r.initials}
            </span>
            <span className="h-1.5 w-16 rounded-full bg-white/12" />
            <span className="ml-auto text-[9px] font-semibold text-mist">
              {r.meta}
            </span>
            <span className="w-6 text-right text-[10px] font-extrabold text-lime">
              {r.rating}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 3 — Intelligence
 * ---------------------------------------------------------------------- */

const BARS = [
  { label: "Overall", w: "88%", c: "#C6F135" },
  { label: "Strengths", w: "74%", c: "#5AC8FA" },
  { label: "Gaps", w: "52%", c: "#FB923C" },
  { label: "Trajectory", w: "81%", c: "#4ADE80" },
];

export function IntelligenceMockup({ className }: { className?: string }) {
  return (
    <div className={cn(FRAME, className)} aria-hidden="true">
      <Chrome label="AI assessment" right="Auto" />
      <div className="space-y-2.5 p-3">
        {BARS.map((b) => (
          <div key={b.label}>
            <span className="mb-1 block text-[9px] font-bold uppercase tracking-wider text-mist">
              {b.label}
            </span>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
              <m.span
                initial={{ width: 0 }}
                whileInView={{ width: b.w }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block h-full rounded-full"
                style={{ background: b.c }}
              />
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-lime/25 bg-lime/[0.07] p-2">
          <span className="block h-1.5 w-full rounded-full bg-lime/25" />
          <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-lime/15" />
        </div>
      </div>
    </div>
  );
}
