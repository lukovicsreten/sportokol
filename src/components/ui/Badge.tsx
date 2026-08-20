import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "dashed";
  tone?: "lime" | "navy" | "white";
};

export function Badge({
  children,
  className,
  variant = "outline",
  tone = "lime",
}: BadgeProps) {
  const toneStyles = {
    lime: "border-lime/30 text-lime bg-lime/10",
    navy: "border-white/15 text-white bg-white/5",
    white: "border-black/10 text-ink bg-black/[0.03]",
  } as const;

  const variantStyles = {
    solid: "bg-lime text-navy-950 border-transparent font-semibold",
    outline: cn("border", toneStyles[tone]),
    dashed: cn("border border-dashed", toneStyles[tone]),
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
