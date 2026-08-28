"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, animate } from "framer-motion";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
 * Icon badge — dark disc, lime outline, lime glyph
 * ---------------------------------------------------------------------- */

export function IconBadge({
  children,
  className,
  size = "md",
  tone = "outline",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  /**
   * Colour set, chosen explicitly rather than by layering another `bg-*` and
   * `text-*` on top through className. Which of two competing utilities wins
   * depends on their order in the stylesheet, not in the class string — an
   * earlier version relied on that and produced a lime icon on a lime badge,
   * i.e. an empty circle.
   */
  tone?: "outline" | "solid";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border",
        tone === "solid"
          ? "border-lime bg-lime text-ink-950"
          : "border-lime/40 bg-ink-950 text-lime",
        size === "md" ? "h-12 w-12" : "h-9 w-9",
        className
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * Cards
 * ---------------------------------------------------------------------- */

/**
 * Card surface. On dark it is glass — a translucent fill over the grain with a
 * backdrop blur; on light it is solid white. Both lift and take a lime border
 * on hover.
 */
export function Card({
  children,
  className,
  dark = true,
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl p-6 transition-all duration-300 sm:p-7",
        dark
          ? "border border-white/10 bg-white/[0.035] backdrop-blur-md"
          : "border border-ink-950/5 bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_18px_50px_-24px_rgba(10,22,40,0.18)]",
        interactive &&
          (dark
            ? "hover:-translate-y-1.5 hover:border-lime/50 hover:shadow-[0_18px_50px_-18px_rgba(198,241,53,0.35)]"
            : "hover:-translate-y-1.5 hover:border-lime-deep/40 hover:shadow-[0_24px_60px_-24px_rgba(10,22,40,0.28)]"),
        "motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Count-up stat
 * ---------------------------------------------------------------------- */

function useCountUp(value: number, decimals: number, duration = 1.8) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
      // Guarantee the exact target even if the tween is cut short.
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const text = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, text };
}

/**
 * A number that counts up when it scrolls into view.
 *
 * The true value is always present for screen readers and crawlers; only the
 * visual digits animate, so a page scraped mid-animation never reports "0".
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const { ref, text } = useCountUp(value, decimals);
  const full = `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {prefix}
        {text}
        {suffix}
      </span>
    </span>
  );
}

export function StatCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  className?: string;
}) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md",
        className
      )}
    >
      <p className="font-display text-4xl font-extrabold tracking-tight text-lime sm:text-5xl">
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      <p className="mt-3 text-sm leading-relaxed text-mist">{label}</p>
    </m.div>
  );
}
