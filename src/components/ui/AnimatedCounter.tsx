"use client";

import { useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  /** Numeric value to count up to. */
  value: number;
  /** Text placed before the number, e.g. "$" or "≥$" */
  prefix?: string;
  /** Text placed after the number, e.g. "%" , "M+" , "K" */
  suffix?: string;
  /** How many decimal places to keep. */
  decimals?: number;
  duration?: number;
  className?: string;
};

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  // Uses the same viewport detection as the scroll-reveal cards, so a counter
  // can never be left showing 0 while its card has already faded in.
  const start = () => {
    if (started.current) return;
    started.current = true;
    animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: setDisplay,
      // Guarantee the exact target even if the tween is cut short.
      onComplete: () => setDisplay(value),
    });
  };

  const text = `${prefix}${format(value, decimals)}${suffix}`;

  return (
    <motion.span
      onViewportEnter={start}
      viewport={{ once: true, margin: "-40px" }}
      className={cn("tabular-nums", className)}
    >
      {/* The true value always sits in the DOM for search engines and screen
          readers; only the visual digits count up. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {prefix}
        {format(display, decimals)}
        {suffix}
      </span>
    </motion.span>
  );
}
