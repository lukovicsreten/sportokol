"use client";

import { useEffect, useRef, useState } from "react";
import { m, useMotionValue } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

/**
 * Lime ring that follows the pointer and swells over anything clickable.
 *
 * Position is written straight to motion values with no spring, so the ring
 * sits exactly on the pointer. An earlier version smoothed it with a spring,
 * which looked like the cursor was lagging behind the mouse — for a ring
 * drawn *around* the real cursor, any easing reads as a defect rather than as
 * polish. Only the scale is animated.
 *
 * The hover test is the expensive part (`closest` walks up the tree), so it
 * runs once per frame instead of once per mousemove event, and only touches
 * React state when the answer actually changes.
 *
 * Desktop, fine-pointer, motion-allowed only. The native cursor stays
 * visible, so nothing is lost if this never mounts.
 */
export function CustomCursor() {
  const { rich } = useMotionPrefs();
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Mirrors of the React state, so the move handler can compare without
  // re-subscribing the listener every time either one flips.
  const hotRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (!rich) return;

    let pending: Element | null = null;
    let queued = false;

    const evaluateHover = () => {
      queued = false;
      const next = Boolean(
        pending?.closest?.("a, button, label, input, textarea, summary")
      );
      if (next !== hotRef.current) {
        hotRef.current = next;
        setHot(next);
      }
    };

    const move = (e: MouseEvent) => {
      // Position first and unconditionally: this is the part that must not lag.
      x.set(e.clientX);
      y.set(e.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      pending = e.target as Element | null;
      if (!queued) {
        queued = true;
        requestAnimationFrame(evaluateHover);
      }
    };

    const hide = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
    };
  }, [rich, x, y]);

  if (!rich) return null;

  return (
    <m.div
      aria-hidden="true"
      style={{ x, y, willChange: "transform" }}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
    >
      <m.span
        animate={{
          scale: hot ? 2.1 : 1,
          opacity: visible ? (hot ? 0.45 : 0.9) : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
        className="block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lime bg-lime/20"
      />
    </m.div>
  );
}
