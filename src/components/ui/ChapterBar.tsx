import { cn } from "@/lib/utils";
import { DeckIcon } from "./DeckIcon";
import { CHAPTERS, type SectionKind } from "@/lib/chapters";

/**
 * Icon per content type, so a reader skimming at speed can tell a product
 * feature from a piece of evidence from a financial breakdown without
 * reading the heading.
 */
export const KIND_ICON: Record<SectionKind, string> = {
  problem: "eye-off",
  product: "brain",
  evidence: "award",
  pitch: "chart-up",
};

export const KIND_LABEL: Record<SectionKind, string> = {
  problem: "The problem",
  product: "Product",
  evidence: "Evidence",
  pitch: "Business",
};

/**
 * The numbered chapter marker that opens each group of sections. Gives a very
 * long page a sense of progress through a narrative rather than an endless
 * scroll.
 */
export function ChapterBar({
  number,
  title,
  kind,
  dark = false,
}: {
  number: string;
  title: string;
  kind: SectionKind;
  dark?: boolean;
}) {
  const total = CHAPTERS.length;
  return (
    <div
      className={cn(
        "mb-12 flex items-center gap-4 border-b pb-4",
        dark ? "border-white/10" : "border-black/10"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          dark ? "bg-lime text-navy-950" : "bg-navy-950 text-lime"
        )}
      >
        {number}
      </span>
      <div className="flex min-w-0 flex-1 items-baseline gap-2">
        <span
          className={cn(
            "truncate text-sm font-semibold uppercase tracking-[0.18em]",
            dark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "hidden text-xs sm:inline",
            dark ? "text-slate-light" : "text-graphite"
          )}
        >
          &middot; {KIND_LABEL[kind]}
        </span>
      </div>
      <span
        className={cn(
          "shrink-0 text-xs tabular-nums",
          dark ? "text-slate-light" : "text-graphite"
        )}
      >
        {number} / {String(total).padStart(2, "0")}
      </span>
      <DeckIcon
        name={KIND_ICON[kind]}
        className={cn("h-4 w-4 shrink-0", dark ? "text-lime" : "text-lime-ink")}
      />
    </div>
  );
}
