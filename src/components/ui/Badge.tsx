import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "dashed";
  tone?: "lime" | "lime-ink" | "navy" | "white";
};

export function Badge({
  children,
  className,
  variant = "outline",
  tone = "lime",
}: BadgeProps) {
  const toneStyles = {
    // Only for dark surfaces — 14:1 on navy, 1.3:1 on white.
    lime: "border-lime/30 text-lime bg-lime/10",
    // Same hue, darkened for light surfaces (5.4:1 on white).
    "lime-ink": "border-lime-ink/30 text-lime-ink bg-lime-ink/10",
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
