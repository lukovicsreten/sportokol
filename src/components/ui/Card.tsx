import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  /** Stagger, in seconds, matching the previous Framer API. */
  delay?: number;
  hover?: boolean;
};

/**
 * Reveal and hover-lift are both CSS now (see Reveal for why), so this is a
 * server component and ships no JavaScript.
 */
export function Card({
  children,
  className,
  dark = false,
  delay = 0,
  hover = true,
}: CardProps) {
  return (
    <div
      style={delay ? ({ "--reveal-delay": `${delay * 40}%` } as React.CSSProperties) : undefined}
      className={cn(
        "reveal rounded-2xl border p-6 transition-[colors,transform] duration-300 sm:p-7",
        hover && "hover:-translate-y-1",
        dark
          ? "border-lime-dim bg-navy-800 hover:border-lime/40"
          : "border-black/5 bg-white shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)] hover:border-lime/50",
        className
      )}
    >
      {children}
    </div>
  );
}
