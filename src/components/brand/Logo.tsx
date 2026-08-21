import { cn } from "@/lib/cn";

/**
 * The mark: an eye whose pupil is a lime dot, with a lime tick sweeping out of
 * the upper lash — scouting plus verification, in one glyph. Drawn as SVG so
 * it stays crisp at any size and can be recoloured by context.
 */
export function EyeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M3 16C9 6 15.5 2.5 22 2.5C28.5 2.5 35 6 41 16C35 26 28.5 29.5 22 29.5C15.5 29.5 9 26 3 16Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="16" r="6" fill="#C6F135" />
      <path
        d="M31 12.5C36 8.5 41.5 4 45 1"
        stroke="#C6F135"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className={cn("h-6 w-9 text-white", markClassName)}>
        <EyeMark />
      </span>
      <span className="font-display text-lg font-extrabold lowercase tracking-tight">
        sportokol
      </span>
    </span>
  );
}
