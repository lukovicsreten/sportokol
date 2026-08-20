import { cn } from "@/lib/utils";

/**
 * Renders one of the pitch deck's own icons. The PNGs in /public/icons are
 * alpha masks (a few KB each), so the colour comes from `currentColor` via
 * CSS masking rather than being baked into the image.
 */
export function DeckIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const url = `url(/icons/${name}.png)`;
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export function IconTile({
  name,
  dark = true,
  className,
}: {
  name: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
        dark ? "bg-lime/15 text-lime" : "bg-navy-950 text-lime",
        className
      )}
    >
      <DeckIcon name={name} className="h-5 w-5" />
    </div>
  );
}
