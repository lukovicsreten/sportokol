"use client";

import Image from "next/image";
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
  backdrop,
  full = true,
  className,
}: {
  eyebrow: string;
  /** Wrap a word in ** to paint it lime. */
  headline: string;
  subhead?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  /**
   * Artwork behind the hero, replacing the generated backdrop rather than
   * layering over it — running a photograph underneath a canvas lattice and a
   * particle field pays for two backgrounds and shows one.
   *
   * Pass it only where the file is known to exist; the page checks with
   * hasMedia() so a missing drop-in leaves the generated backdrop in place.
   */
  backdrop?: { src: string } | null;
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
      {backdrop ? (
        <>
          {/* Decorative: the headline carries the meaning, so alt stays empty
              rather than describing scenery a screen reader does not need.
              `priority` because on Home this is the LCP candidate. */}
          <Image
            src={backdrop.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/*
            Two scrims, not one. The horizontal pass sits heaviest under the
            left column where the text is and thins to the right so the artwork
            stays visible; the vertical pass lands the section into the one
            below it.
            
            0.65 on the left, not the 0.9-odd a white background would need.
            Measured against this artwork the brightest pixel anywhere behind
            the headline is rgb(175,224,133) — one lime bib in the blurred
            group — and 0.65 puts white on it at 7.3:1, well past the 4.5:1 AA
            floor. Scrimming for a hypothetical white image instead buried a
            photograph that is already almost the site's own navy.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.72)_0%,rgba(10,22,40,0.65)_42%,rgba(10,22,40,0.28)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,22,40,0.45)_0%,rgba(10,22,40,0)_28%,rgba(10,22,40,0)_68%,rgba(10,22,40,1)_100%)]"
          />
        </>
      ) : (
        <>
          <GradientMesh />
          <Constellation strength={110} />
          <FloatingMotes />
        </>
      )}

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
            // Roughly a 10% step up at every breakpoint, so the headline keeps
            // its dominance from phone to wide desktop rather than only on one.
            className="mt-6 font-display text-[3.05rem] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-[4.15rem] lg:text-[5rem] xl:text-[5.8rem]"
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
