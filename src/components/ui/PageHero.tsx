import { cn } from "@/lib/utils";
import { DotBackground } from "./DotBackground";
import { DeckIcon } from "./DeckIcon";

/**
 * Compact hero for the inner routes. Deliberately smaller than the home hero
 * and CSS-only, so it paints immediately and never becomes the slow LCP
 * element on a page whose real content sits below it.
 */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  badges,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  /** Call-to-action row rendered under the lead. */
  children?: React.ReactNode;
  /** Sport pills, when the page needs to signal multi-sport support. */
  badges?: { icon: string; label: string }[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-navy-950 to-navy-900 text-white",
        className
      )}
    >
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 sm:px-8 sm:pt-36 md:pb-20">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime">
          <span aria-hidden="true" className="h-px w-6 bg-lime" />
          {kicker}
        </p>
        <h1 className="balance max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
            {lead}
          </p>
        )}

        {badges && (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {badges.map((b) => (
              <span
                key={b.label}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 text-sm font-medium text-lime"
              >
                <DeckIcon name={b.icon} className="h-4 w-4" />
                {b.label}
              </span>
            ))}
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-white/25 px-4 text-sm font-medium text-slate-light">
              Sport-agnostic — more in development
            </span>
          </div>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
