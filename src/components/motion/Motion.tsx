"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

/**
 * Single Framer Motion entry point for the whole site.
 *
 * `LazyMotion` + `domAnimation` loads the DOM animation feature set only
 * (~18KB) instead of the full bundle (~50KB+), and `m` is the stripped
 * component that relies on it. Import `m` from here rather than pulling
 * `motion` from framer-motion directly, or the saving is lost the moment one
 * file does.
 */
export { m, AnimatePresence } from "framer-motion";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/** Shared easing so every animation on the site shares one personality. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Parent for staggered grids — children inherit via `variants`. */
export const stagger = (delayChildren = 0, staggerChildren = 0.1) => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export { m as motion };
