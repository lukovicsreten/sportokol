"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Primary call to action with a magnetic spotlight: a soft light tracks the
 * cursor inside the button and the button leans very slightly toward it.
 * Both are transform and background-position only — nothing triggers layout.
 *
 * The anchor is the animated element itself rather than a transparent overlay,
 * so its text is its accessible name.
 *
 * Pointer tracking is skipped on coarse pointers: there is no cursor to
 * follow, and the listeners would only cost battery.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    setSpot({ x: (px / r.width) * 100, y: (py / r.height) * 100 });
    setLean({ x: (px / r.width - 0.5) * 8, y: (py / r.height - 0.5) * 6 });
  };

  const reset = () => {
    setSpot({ x: 50, y: 50 });
    setLean({ x: 0, y: 0 });
  };

  const skin =
    variant === "primary"
      ? "bg-lime text-ink-950 hover:shadow-[0_12px_44px_-10px_rgba(198,241,53,0.7)]"
      : "border border-white/25 text-white hover:border-lime hover:text-lime";

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.5), transparent 60%)`,
          }}
        />
      )}
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const shared = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: {
      transform: `translate3d(${lean.x}px, ${lean.y}px, 0)`,
      willChange: "transform",
    },
    className: cn(
      "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 text-sm font-bold tracking-wide",
      "transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:scale-[1.04] active:scale-[0.98]",
      "motion-reduce:transform-none motion-reduce:transition-none",
      skin,
      className
    ),
  };

  if (external) {
    return (
      <a {...shared} href={href} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link {...shared} href={href}>
      {inner}
    </Link>
  );
}
