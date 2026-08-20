import { cn } from "@/lib/utils";
import { DeckIcon } from "./DeckIcon";

/**
 * Progressive disclosure for detail that would otherwise be another
 * paragraph of mandatory scrolling.
 *
 * Native <details>, so it works without JavaScript, is keyboard-operable for
 * free, and Chrome expands it for find-in-page — the content stays reachable
 * and indexable rather than being hidden behind a script.
 */
export function Disclosure({
  summary,
  children,
  dark = false,
  className,
}: {
  summary: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <details
      className={cn(
        "group mt-4 border-t pt-4",
        dark ? "border-white/10" : "border-black/5",
        className
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-2 text-sm font-semibold marker:hidden",
          dark ? "text-white hover:text-lime" : "text-ink hover:text-lime-ink"
        )}
      >
        <DeckIcon
          name="plus"
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-45",
            dark ? "text-lime" : "text-lime-ink"
          )}
        />
        {summary}
      </summary>
      <div
        className={cn(
          "mt-3 text-sm leading-relaxed",
          dark ? "text-slate-light" : "text-graphite"
        )}
      >
        {children}
      </div>
    </details>
  );
}
