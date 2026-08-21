"use client";

import { m } from "@/components/motion/Motion";

/**
 * Page transition.
 *
 * `template.tsx` rather than `layout.tsx`: a template remounts on every
 * navigation, which is exactly what makes the enter animation replay. A
 * layout would mount once and the transition would only ever run on first
 * load.
 *
 * Enter-only, no exit animation — an exit would hold the old page on screen
 * and make every navigation feel slower than it is. The lime wipe reads as
 * speed without delaying the new content, which starts fading in immediately.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <m.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top", willChange: "transform" }}
        className="pointer-events-none fixed inset-0 z-[90] bg-lime"
      />
      <m.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </>
  );
}
