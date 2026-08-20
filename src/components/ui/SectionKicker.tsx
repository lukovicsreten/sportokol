import { cn } from "@/lib/utils";

export function SectionKicker({
  children,
  className,
  dark,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
        "text-lime",
        className
      )}
    >
      <span className={cn("h-px w-6", dark ? "bg-lime/60" : "bg-lime")} />
      {children}
    </div>
  );
}
