"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { m } from "@/components/motion/Motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";
import { STREAMS } from "@/lib/content";

/* -------------------------------------------------------------------------
 * Data asset: four streams converging on one athlete profile
 * ---------------------------------------------------------------------- */

const HUB_X = 400;
const HUB_Y = 150;
const START_X = 42;
const ROW_Y = [34, 112, 190, 268];

/**
 * The four streams draw themselves toward the hub when the diagram scrolls in.
 * `pathLength` is animated rather than a hand-computed stroke-dasharray —
 * Framer normalises it to 0..1 so the curves stay in sync regardless of their
 * real lengths.
 */
export function DataStreamsDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 300"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Four data streams — scouts, coaches, medical staff and athletes — converging into one athlete profile."
    >
      <m.g
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
      >
        {STREAMS.map((s, i) => {
          const y = ROW_Y[i];
          const d = `M ${START_X} ${y} C ${START_X + 150} ${y}, ${HUB_X - 190} ${HUB_Y}, ${HUB_X - 62} ${HUB_Y}`;
          return (
            <m.g
              key={s.title}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <m.path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: {
                    pathLength: 1,
                    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              />
              <circle cx={START_X} cy={y} r="7" fill={s.color} />
              <text
                x={START_X + 16}
                y={y - 11}
                fontSize="12"
                fontWeight="700"
                fill="#FFFFFF"
              >
                {s.title}
              </text>
            </m.g>
          );
        })}
      </m.g>

      <m.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${HUB_X}px ${HUB_Y}px` }}
      >
        <circle cx={HUB_X} cy={HUB_Y} r="58" fill="#0D1420" stroke="#C6F135" strokeWidth="2" />
        <text x={HUB_X} y={HUB_Y - 4} textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFFFFF">
          ATHLETE
        </text>
        <text x={HUB_X} y={HUB_Y + 14} textAnchor="middle" fontSize="13" fontWeight="800" fill="#C6F135">
          PROFILE
        </text>
      </m.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
 * Roadmap timeline
 * ---------------------------------------------------------------------- */

export type Phase = {
  phase: string;
  title: string;
  body: string;
  done?: boolean;
};

/**
 * Roadmap.
 *
 * The rail fills as the section scrolls rather than playing once on entry, so
 * progress through the phases tracks the reader's own position. Each node
 * lights up as the fill reaches it, and the completed phase pops its
 * checkmark in.
 */
export function AnimatedTimeline({ phases }: { phases: Phase[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [reached, setReached] = useState(reduced ? phases.length : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * phases.length);
    setReached((prev) => (prev === next ? prev : next));
  });

  return (
    <ol ref={ref} className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      {/* Desktop rail. On mobile the cards stack and a rail would run through
          empty space, so it is hidden rather than redrawn. */}
      <div className="pointer-events-none absolute inset-x-0 top-6 hidden md:block">
        <div className="h-px w-full bg-white/12" />
        <m.div
          style={
            reduced
              ? { scaleX: 1 }
              : { scaleX: fill, willChange: "transform" }
          }
          className="-mt-px h-px w-full origin-left bg-lime"
        />
      </div>

      {phases.map((p, i) => {
        const lit = reduced || i < reached;
        return (
          <m.li
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span
              className={cn(
                "relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border text-sm font-extrabold transition-colors duration-500",
                p.done
                  ? "border-lime bg-lime text-ink-950"
                  : lit
                    ? "border-lime bg-ink-950 text-lime"
                    : "border-white/20 bg-ink-950 text-white/40"
              )}
            >
              {p.done ? (
                <m.svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ scale: 0, rotate: -25 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.35 }}
                  aria-hidden="true"
                >
                  <path d="M4 12.5 L9.5 18 L20 6.5" />
                </m.svg>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-lime">
              {p.phase}
            </p>
            <h3 className="mt-2 font-display text-lg font-extrabold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
          </m.li>
        );
      })}
    </ol>
  );
}
