"use client";

import { m } from "@/components/motion/Motion";
import { cn } from "@/lib/cn";

function Ball({ kind }: { kind: "football" | "basketball" | "tennis" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...common} />
      {kind === "football" && (
        <>
          <path d="M12 7.5l3.2 2.3-1.2 3.8h-4l-1.2-3.8z" {...common} />
          <path d="M12 3v4.5M20.3 9.6l-4.3.2M17.6 19.3l-2.6-3.7M6.4 19.3l2.6-3.7M3.7 9.6l4.3.2" {...common} />
        </>
      )}
      {kind === "basketball" && (
        <>
          <path d="M3 12h18M12 3v18" {...common} />
          <path d="M5.6 5.6c3.6 3.6 3.6 9.2 0 12.8M18.4 5.6c-3.6 3.6-3.6 9.2 0 12.8" {...common} />
        </>
      )}
      {kind === "tennis" && (
        <path d="M4.5 4.5c4 3 4 12 0 15M19.5 4.5c-4 3-4 12 0 15" {...common} />
      )}
    </svg>
  );
}

const SPORTS = [
  { key: "football", label: "Football" },
  { key: "basketball", label: "Basketball" },
  { key: "tennis", label: "Tennis" },
] as const;

export function SportPills({
  more = true,
  className,
}: {
  more?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {SPORTS.map((s) => (
        <m.span
          key={s.key}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 text-sm font-semibold text-lime"
        >
          <Ball kind={s.key} />
          {s.label}
        </m.span>
      ))}
      {more && (
        <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-white/25 px-4 text-sm font-medium text-mist">
          More sports to come
        </span>
      )}
    </div>
  );
}
