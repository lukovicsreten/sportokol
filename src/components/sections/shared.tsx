"use client";

import { m } from "@/components/motion/Motion";
import {
  SectionDark,
  Reveal,
  RevealGrid,
  RevealItem,
} from "@/components/ui/primitives";
import { Card, IconBadge } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/CTAButton";
import { Constellation } from "@/components/ui/Constellation";
import { FloatingMotes, ScrollGlow } from "@/components/ui/Backdrop";
import { TiltCard } from "@/components/ui/TiltCard";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";
import { TRACTION } from "@/lib/content";

/* -------------------------------------------------------------------------
 * Callout banner — the recurring lime-bordered emphasis block
 * ---------------------------------------------------------------------- */

export function Callout({
  lead,
  children,
  className,
}: {
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "rounded-2xl border border-lime/40 bg-lime/[0.06] px-6 py-8 text-center shadow-[0_0_60px_-25px_rgba(198,241,53,0.6)] sm:px-10",
        className
      )}
    >
      <p className="balance mx-auto max-w-4xl text-lg leading-relaxed sm:text-xl">
        {lead && <span className="font-extrabold text-lime">{lead} </span>}
        {children}
      </p>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------
 * Traction — badges on Home, full cards on About
 * ---------------------------------------------------------------------- */

export function TractionBar() {
  return (
    <SectionDark aria-label="Traction">
      <Constellation strength={60} />
      <FloatingMotes />
      <RevealGrid className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRACTION.map((t, i) => (
          <RevealItem key={t.title} index={i}>
            <TiltCard strength={6}>
              {/* A shine sweeps across on a long, staggered loop so these read
                  as the noteworthy items without nagging for attention. */}
              <Card className="relative h-full overflow-hidden">
                <Shine delay={i * 1.6} />
                <IconBadge size="sm">
                  <span className="text-xs font-extrabold">✓</span>
                </IconBadge>
                <p className="relative mt-4 font-display text-base font-extrabold leading-snug">
                  {t.title}
                </p>
              </Card>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGrid>
    </SectionDark>
  );
}

/** Diagonal highlight that periodically crosses a card. */
function Shine({ delay = 0 }: { delay?: number }) {
  const { reduced } = useMotionPrefs();
  if (reduced) return null;
  return (
    <m.span
      aria-hidden="true"
      initial={{ x: "-150%" }}
      animate={{ x: "150%" }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: 7,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-lime/12 to-transparent"
    />
  );
}

/* -------------------------------------------------------------------------
 * Closing CTA — Home and Team
 * ---------------------------------------------------------------------- */

export function ClosingCta() {
  return (
    <section className="grain relative overflow-hidden bg-ink-950 py-32 text-center md:py-40">
      <Constellation strength={70} />
      <ScrollGlow />
      <FloatingMotes />
      <div className="relative z-[2] mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <h2 className="balance font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-6xl">
            An eye on all the talent in the{" "}
            <span className="text-lime">country.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist">
            Talk to us — as a club, academy, agency or federation ready to stop
            losing talent, or as an investor backing the infrastructure layer
            of sports.
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButton href="/contact">Get in touch</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
