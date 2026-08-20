import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrapper.
 *
 * Uses a CSS scroll-driven animation instead of a Framer `motion.div`: 42 of
 * these plus 15 Cards were hydrating as client components, which dominated
 * main-thread script evaluation on mobile. As plain markup this costs no JS
 * at all.
 *
 * Progressive enhancement: browsers without `animation-timeline` simply show
 * the content, so nothing can ever be left invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in seconds, matching the previous Framer API. */
  delay?: number;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay * 40}%` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
