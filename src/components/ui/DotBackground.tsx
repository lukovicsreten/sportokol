import { cn } from "@/lib/utils";

/**
 * The deck's constellation backdrop, behind dark sections.
 *
 * Painted as a CSS background rather than <Image fill>: it is purely
 * decorative, it repeats across eight sections, and `object-cover` on a
 * fixed-ratio photo made Lighthouse flag every instance for a distorted
 * aspect ratio. As CSS it is one cached 11KB request and no DOM images.
 */
export function DotBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url(/art/dot-field.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/30 to-navy-950" />
    </div>
  );
}
