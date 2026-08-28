"use client";

import { m } from "@/components/motion/Motion";
import {
  SectionDark,
  Reveal,
  RevealGrid,
  RevealItem,
} from "@/components/ui/primitives";
import { Card } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/CTAButton";
import { Constellation } from "@/components/ui/Constellation";
import { FloatingMotes, ScrollGlow } from "@/components/ui/Backdrop";
import { TiltCard } from "@/components/ui/TiltCard";
import { useMotionPrefs } from "@/lib/useMotionPrefs";
import { cn } from "@/lib/cn";
import { TRACTION } from "@/lib/content";
import {
  CheckIcon,
  StarIcon,
  HandshakeIcon,
  UsersIcon,
} from "@/components/ui/StepIcons";

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

const BADGE_ICON = {
  completed: CheckIcon,
  winner: StarIcon,
  partnership: HandshakeIcon,
  inuse: UsersIcon,
} as const;

/**
 * Proof strip.
 *
 * Styled as awards rather than a list: a lit pill carrying the kind of
 * recognition, its own glyph, and a shine that crosses on a long loop. The
 * point is that these read as credentials at a glance, before anyone reads
 * the words.
 */
export function TractionBar() {
  return (
    <SectionDark aria-label="Traction">
      <Constellation strength={60} />
      <FloatingMotes />
      <RevealGrid className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRACTION.map((t, i) => {
          const Icon = BADGE_ICON[t.kind];
          return (
            <RevealItem key={t.title} index={i}>
              <TiltCard strength={6}>
                <Card className="relative h-full overflow-hidden">
                  <Shine delay={i * 1.6} />
                  <div className="relative flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lime/50 bg-lime/15 text-lime">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-lime">
                      {t.label}
                    </span>
                  </div>
                  <p className="relative mt-4 font-display text-base font-extrabold leading-snug">
                    {t.title}
                  </p>
                </Card>
              </TiltCard>
            </RevealItem>
          );
        })}
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
          {/* Deliberately the largest button on the site: this is the last
              thing between a visitor and leaving. */}
          <div className="mt-10 flex justify-center">
            <CTAButton
              href="/contact"
              pulse
              className="min-h-16 px-12 text-base sm:min-h-[4.25rem] sm:px-14 sm:text-lg"
            >
              Get in touch
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
