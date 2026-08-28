"use client";

import { Fragment } from "react";
import { m, fadeUp, stagger, EASE } from "@/components/motion/Motion";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------
 * Section shells
 * ---------------------------------------------------------------------- */

type SectionProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

/** Dark surface: grain overlay, generous vertical rhythm. */
export function SectionDark({
  id,
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      {...rest}
      className={cn(
        "grain relative overflow-hidden bg-ink-950 py-28 text-white md:py-36",
        className
      )}
    >
      <div
        className={cn(
          "relative z-[2] mx-auto w-full max-w-7xl px-6 sm:px-8",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Light surface for contrast between dark stretches. */
export function SectionLight({
  id,
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      {...rest}
      className={cn(
        "relative overflow-hidden bg-paper py-28 text-ink-950 md:py-36",
        className
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-7xl px-6 sm:px-8",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Type
 * ---------------------------------------------------------------------- */

export function EyebrowLabel({
  children,
  dark = true,
  className,
}: {
  children: React.ReactNode;
  /** Bright lime only clears contrast on dark; light surfaces get the deep tone. */
  dark?: boolean;
  className?: string;
}) {
  return (
    <m.p
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em]",
        dark ? "text-lime" : "text-lime-deep",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-7", dark ? "bg-lime" : "bg-lime-deep")}
      />
      {children}
    </m.p>
  );
}

/**
 * Headline that reveals word by word, each word sliding up out of a blur.
 *
 * Wrap a run of text in ** to paint it lime. The marker is parsed across the
 * whole string before splitting on spaces, so multi-word spans work — parsing
 * per word left the asterisks visible on screen.
 */
function parseAccents(text: string): { text: string; accent: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("**") && chunk.endsWith("**")
        ? { text: chunk.slice(2, -2), accent: true }
        : { text: chunk, accent: false }
    );
}

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
  /** `mount` for above-the-fold headlines, `scroll` for everything below. */
  trigger = "mount",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
  trigger?: "mount" | "scroll";
}) {
  const words = parseAccents(text).flatMap((seg) =>
    seg.text
      .split(" ")
      .filter((w) => w.length > 0)
      .map((w) => ({ word: w, accent: seg.accent }))
  );
  const MTag = Tag === "h1" ? m.h1 : m.h2;

  const activation =
    trigger === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <MTag
      initial="hidden"
      {...activation}
      variants={stagger(delay, 0.06)}
      className={cn("balance", className)}
    >
      {words.map(({ word, accent }, i) => (
        // The separator is a real space text node between the wrappers, not a
        // margin and not a space inside them. A margin looked right but left
        // the heading reading "Neverloseafuture" in textContent — which is
        // what Google and screen readers actually consume. A space *inside*
        // an inline-block is collapsed away, hence putting it between them.
        <Fragment key={`${word}-${i}`}>
        <span
          className="inline-block"
        >
          <m.span
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.65, ease: EASE },
              },
            }}
            className={cn("inline-block", accent && "text-lime")}
          >
            {word}
          </m.span>
        </span>
        {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MTag>
  );
}

/* -------------------------------------------------------------------------
 * Scroll reveal
 * ---------------------------------------------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/**
 * Body copy that follows its heading in rather than arriving with it — the
 * delay is what makes the pair read as a hierarchy instead of a block.
 */
export function LeadParagraph({
  children,
  className,
  delay = 0.18,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </m.p>
  );
}

/** Heading that arrives from one side, so stacked headings feel layered. */
export function SlideIn({
  children,
  from = "left",
  className,
  delay = 0,
  distance = 100,
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  className?: string;
  delay?: number;
  distance?: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, x: from === "left" ? -distance : distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/* -------------------------------------------------------------------------
 * Grids
 * ---------------------------------------------------------------------- */

export function RevealGrid({
  children,
  className,
  delayChildren = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger(delayChildren, 0.1)}
      className={className}
    >
      {children}
    </m.div>
  );
}

/**
 * Grid child.
 *
 * Pass the item's index and odd/even entries arrive from opposite directions
 * with a slight counter-rotation, so a row of four does not land as one flat
 * wall. `alternate={false}` keeps the plain fade-up where that suits better.
 */
export function RevealItem({
  children,
  className,
  index = 0,
  alternate = true,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  alternate?: boolean;
}) {
  const odd = index % 2 === 1;
  const variants = alternate
    ? {
        hidden: {
          opacity: 0,
          y: odd ? 46 : -18,
          rotate: odd ? 4 : -4,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      }
    : fadeUp;

  return (
    <m.div variants={variants} className={className}>
      {children}
    </m.div>
  );
}
