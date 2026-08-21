"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Dot-and-line constellation behind dark sections, drifting slower than the
 * page as it scrolls.
 *
 * Deterministic layout rather than Math.random(): a random field would differ
 * between the server and client renders and hydrate with a mismatch.
 */
const NODES = Array.from({ length: 34 }, (_, i) => {
  const gx = (i * 37) % 100;
  const gy = (i * 61) % 100;
  return {
    x: gx + ((i % 5) - 2) * 1.4,
    y: gy + ((i % 3) - 1) * 2.1,
    r: i % 7 === 0 ? 2.4 : 1.3,
    lime: i % 7 === 0,
  };
});

const LINKS: [number, number][] = [
  [0, 5], [5, 11], [11, 16], [2, 8], [8, 14], [14, 21],
  [3, 9], [9, 18], [18, 25], [6, 13], [13, 20], [20, 28],
  [7, 15], [15, 23], [23, 30], [10, 17], [17, 26], [26, 33],
];

export function Constellation({
  className,
  /** How far the field drifts against the scroll, in px. */
  strength = 90,
}: {
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : strength]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <m.svg
        style={{ y, willChange: "transform" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-[125%] w-full"
      >
        <g stroke="#2A3F63" strokeWidth="0.12" opacity="0.85">
          {LINKS.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
            />
          ))}
        </g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r * 0.16}
            fill={n.lime ? "#C6F135" : "#3E5580"}
            opacity={n.lime ? 0.9 : 0.65}
          />
        ))}
      </m.svg>
      {/* Fade the field out toward the bottom so sections meet cleanly. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
    </div>
  );
}
