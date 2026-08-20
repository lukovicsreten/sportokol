import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The deck's own constellation backdrop, used behind dark sections. It is a
 * decorative tile, so it stays out of the accessibility tree and never blocks
 * paint.
 */
export function DotBackground({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <Image
        src="/art/dot-field.jpg"
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/30 to-navy-950" />
    </div>
  );
}
