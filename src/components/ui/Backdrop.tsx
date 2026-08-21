"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";

/**
 * Slow gradient mesh for hero backgrounds.
 *
 * Two large blurred blobs drifting on long, offset loops. Only `transform`
 * and `opacity` animate — animating the gradient itself would repaint the
 * whole area every frame.
 */
export function GradientMesh({ className }: { className?: string }) {
  const { reduced } = useMotionPrefs();

  const blob = (
    extra: string,
    anim: { x: number; y: number; scale: number },
    delay: number
  ) => (
    <m.span
      aria-hidden="true"
      className={cn("absolute rounded-full blur-[110px]", extra)}
      animate={reduced ? undefined : anim}
      transition={{
        duration: 22,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {blob(
        "left-[-10%] top-[-15%] h-[55vh] w-[55vh] bg-[#16345c]/60",
        { x: 90, y: 50, scale: 1.12 },
        0
      )}
      {blob(
        "right-[-12%] top-[10%] h-[45vh] w-[45vh] bg-lime/[0.07]",
        { x: -70, y: 70, scale: 1.18 },
        3
      )}
      {blob(
        "bottom-[-20%] left-[30%] h-[50vh] w-[50vh] bg-[#0f2647]/70",
        { x: 60, y: -60, scale: 1.1 },
        6
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Floating particles
 * ---------------------------------------------------------------------- */

// Fixed layout, not Math.random(): a random field differs between the server
// and client renders and hydrates with a mismatch.
const MOTES = [
  { x: 12, y: 22, d: 15, s: 3 },
  { x: 78, y: 14, d: 19, s: 2 },
  { x: 34, y: 68, d: 13, s: 2.5 },
  { x: 62, y: 78, d: 21, s: 3 },
  { x: 88, y: 52, d: 17, s: 2 },
  { x: 22, y: 46, d: 23, s: 2.5 },
  { x: 52, y: 30, d: 16, s: 2 },
  { x: 8, y: 82, d: 18, s: 2.5 },
];

/** A handful of lime motes drifting over the dark sections. */
export function FloatingMotes({ className }: { className?: string }) {
  const { reduced } = useMotionPrefs();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {MOTES.map((mote, i) => (
        <m.span
          key={i}
          className="absolute rounded-full bg-lime/50"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.s,
            height: mote.s,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -26, 6, 0],
            x: [0, 12, -8, 0],
            opacity: [0.25, 0.8, 0.4, 0.25],
          }}
          transition={{
            duration: mote.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Scroll-linked glow
 * ---------------------------------------------------------------------- */

/**
 * Lime glow that brightens and rises as its section passes through the
 * viewport, used behind the stat and CTA blocks.
 */
export function ScrollGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.55, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.15, 0.75]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <m.span
        style={
          reduced
            ? { opacity: 0.25 }
            : { opacity, y, scale, willChange: "transform, opacity" }
        }
        className="absolute left-1/2 top-1/2 block h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/25 blur-[130px]"
      />
    </div>
  );
}
