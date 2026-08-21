"use client";

import { m } from "@/components/motion/Motion";
import { Constellation } from "@/components/ui/Constellation";
import { GradientMesh, FloatingMotes } from "@/components/ui/Backdrop";
import { EyebrowLabel, TextReveal } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Full-bleed hero shell shared by every page.
 *
 * `full` gives the 92vh treatment used on Home, About and Team; the shorter
 * variant suits pages whose real content starts immediately below.
 */
export function Hero({
  eyebrow,
  headline,
  subhead,
  children,
  aside,
  full = true,
  className,
}: {
  eyebrow: string;
  /** Wrap a word in ** to paint it lime. */
  headline: string;
  subhead?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  full?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grain relative flex items-center overflow-hidden bg-ink-950",
        full ? "min-h-[92svh] pt-28" : "pt-32 pb-8",
        className
      )}
    >
      <GradientMesh />
      <Constellation strength={110} />
      <FloatingMotes />

      <div
        className={cn(
          "relative z-[2] mx-auto grid w-full max-w-7xl gap-14 px-6 py-16 sm:px-8",
          aside ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""
        )}
      >
        <div>
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <EyebrowLabel>{eyebrow}</EyebrowLabel>
          </m.div>

          <TextReveal
            text={headline}
            delay={0.15}
            className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          />

          {subhead && (
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-mist"
            >
              {subhead}
            </m.p>
          )}

          {children && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-9"
            >
              {children}
            </m.div>
          )}
        </div>

        {aside && (
          <m.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {aside}
          </m.div>
        )}
      </div>
    </section>
  );
}

/** Big glowing eye for the home hero. */
export function GlowEye({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-md", className)}>
      <div
        aria-hidden="true"
        className="animate-eye-glow absolute inset-[12%] rounded-full bg-lime/25 blur-[70px]"
      />
      <div className="animate-drift relative flex h-full w-full items-center justify-center">
        <svg
          viewBox="0 0 220 150"
          className="w-full"
          role="img"
          aria-label="Sportokol — an eye with a lime pupil and a checkmark"
        >
          <path
            d="M12 75C40 28 72 10 110 10C148 10 180 28 208 75C180 122 148 140 110 140C72 140 40 122 12 75Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="110" cy="75" r="30" fill="#C6F135" />
          <circle cx="110" cy="75" r="12" fill="#0A1628" />
          <path
            d="M150 55C168 38 186 20 202 6"
            stroke="#C6F135"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
