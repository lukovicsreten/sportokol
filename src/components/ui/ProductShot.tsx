import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A desktop product screenshot.
 *
 * Squeezing a 1146px-wide app UI into a 375px phone renders its text at ~3px,
 * so on small screens the image keeps a readable intrinsic width and the user
 * pans it sideways instead. From `sm` up it simply fits the column.
 */
export function ProductShot({
  src,
  alt,
  caption,
  dark = false,
}: {
  src: string;
  alt: string;
  caption: string;
  dark?: boolean;
}) {
  return (
    <figure>
      <div
        className={cn(
          "-mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0",
          "[scrollbar-width:thin]"
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={1146}
          height={802}
          sizes="(max-width: 640px) 720px, (max-width: 768px) 100vw, 50vw"
          className={cn(
            "h-auto w-[720px] max-w-none rounded-2xl sm:w-full",
            dark
              ? "border border-lime-dim shadow-2xl"
              : "border border-black/5 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_24px_48px_-24px_rgba(15,27,46,0.24)]"
          )}
        />
      </div>
      <figcaption
        className={cn(
          "mt-4 text-center text-sm",
          dark ? "text-slate-light" : "text-graphite"
        )}
      >
        {caption}
        <span className="mt-1 block text-xs sm:hidden">
          Swipe the image to explore
        </span>
      </figcaption>
    </figure>
  );
}
