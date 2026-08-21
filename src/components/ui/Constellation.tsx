"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Lattice of connected nodes behind dark sections, drifting slower than the
 * page as it scrolls. Reads as a talent network rather than as decoration.
 *
 * Points sit on a jittered grid and only join their near neighbours. An
 * earlier version scattered them and linked distant indices, which drew long
 * diagonals straight across the headline — busy, and it fought the copy.
 *
 * The layout is deterministic, not Math.random(): a random field differs
 * between the server and client renders and hydrates with a mismatch.
 */
const COLS = 8;
const ROWS = 6;

// Small repeating offsets keep the grid from looking mechanical without
// needing randomness.
const JITTER_X = [0, 2.4, -1.8, 3.0, -2.2, 1.4, -2.8, 0.9];
const JITTER_Y = [0, -2.2, 1.8, -1.1, 2.6, -1.6];

const NODES = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return {
    x: (col + 0.5) * (100 / COLS) + JITTER_X[(col + row) % JITTER_X.length],
    y: (row + 0.5) * (100 / ROWS) + JITTER_Y[(row + col) % JITTER_Y.length],
    lime: (col + row * 3) % 11 === 0,
    r: (col + row) % 5 === 0 ? 2.2 : 1.2,
  };
});

// Join right and down only, so every line is a short grid edge.
const LINKS: [number, number][] = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const i = row * COLS + col;
    if (col < COLS - 1) LINKS.push([i, i + 1]);
    if (row < ROWS - 1) LINKS.push([i, i + COLS]);
  }
}

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
        <defs>
          {/* Thins the lattice out over the left column, where the headline
              and copy sit, and lets it read at full strength on the right. */}
          <linearGradient id="lattice-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.14" />
            <stop offset="45%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="lattice-mask">
            <rect width="100" height="100" fill="url(#lattice-fade)" />
          </mask>
        </defs>

        <g mask="url(#lattice-mask)">
          <g stroke="#35507F" strokeWidth="0.14" opacity="0.9">
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
              r={n.r * 0.2}
              fill={n.lime ? "#C6F135" : "#4A6699"}
              opacity={n.lime ? 1 : 0.8}
            />
          ))}
        </g>
      </m.svg>

      {/* Fade the field out toward the bottom so sections meet cleanly. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
    </div>
  );
}
