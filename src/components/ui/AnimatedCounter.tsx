"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
};

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts up when scrolled into view.
 *
 * Hand-rolled on IntersectionObserver + rAF rather than Framer: these ten
 * counters were the last thing keeping the animation library in the client
 * bundle, and it cost far more script evaluation than it saved code.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1600,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    // Respect the OS setting: jump straight to the final value. Deferred to a
    // frame so this is not a synchronous setState inside the effect body.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          // easeOutCubic
          setDisplay(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  const text = `${prefix}${format(value, decimals)}${suffix}`;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {/* The true value is always in the DOM for crawlers and screen readers;
          only the visual digits count up. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {prefix}
        {format(display, decimals)}
        {suffix}
      </span>
    </span>
  );
}
