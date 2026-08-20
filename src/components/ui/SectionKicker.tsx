import { cn } from "@/lib/utils";

/**
 * The small uppercase label above each section heading.
 *
 * The bright brand lime only clears WCAG AA on the dark surfaces; on the
 * light ones it lands at 1.3:1, so those get the darkened same-hue token.
 */
export function SectionKicker({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
        dark ? "text-lime" : "text-lime-ink",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-6", dark ? "bg-lime/60" : "bg-lime-ink")}
      />
      {children}
    </p>
  );
}
