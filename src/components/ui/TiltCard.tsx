"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";

/**
 * Card that tilts toward the pointer, so a flat grid gains a little depth.
 *
 * Rotation comes off motion values driven straight from the mouse position —
 * no React state, so moving the pointer never re-renders the subtree. The
 * tilt is disabled wholesale on touch and under reduced motion, where the
 * card renders as an ordinary static one.
 */
export function TiltCard({
  children,
  className,
  strength = 8,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's corners. */
  strength?: number;
}) {
  const { rich } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 24, mass: 0.4 };
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-strength, strength]),
    spring
  );
  const rotateX = useSpring(
    useTransform(py, [0, 1], [strength, -strength]),
    spring
  );

  const onMove = (e: React.MouseEvent) => {
    if (!rich) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (!rich) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: 1000 }} className={cn("h-full", className)}>
      <m.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="h-full"
      >
        {children}
      </m.div>
    </div>
  );
}
