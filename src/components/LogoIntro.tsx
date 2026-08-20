import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Animated Sportokol mark: the eye draws itself, the pupil pops in, the
 * checkmark swipes across, and — in the `full` variant — the wordmark and
 * tagline fade up after it.
 *
 * PLAY-ONCE BEHAVIOUR
 * The source preview looped every 5s. That is fine for a preview and wrong on
 * a page someone sits on, so each phase here is a separate CSS animation with
 * a delay and `animation-fill-mode: forwards`. It runs once when the element
 * mounts and then holds its finished state. Nothing re-triggers on scroll,
 * because there is no viewport observer involved at all.
 *
 * The only thing that keeps running afterwards is a 6s breathing pulse on the
 * pupil (3% scale), so the mark is not completely dead. It is suppressed
 * entirely under `prefers-reduced-motion`, along with the intro.
 *
 * This is a server component and ships no JavaScript. It deliberately does not
 * use Framer Motion: the library was removed in the performance pass (it was
 * costing ~270ms of blocking time), and re-adding it for one decorative
 * animation would undo that.
 *
 * Timing lives in globals.css under the `logoIntro-*` classes.
 */
export function LogoIntro({
  variant = "icon-only",
  className,
}: {
  /** `icon-only` for the hero, where the nav already carries the wordmark. */
  variant?: "icon-only" | "full";
  className?: string;
}) {
  const full = variant === "full";

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        viewBox="0 0 240 180"
        className="h-auto w-full drop-shadow-[0_0_20px_rgba(198,241,53,0.12)]"
        role="img"
        aria-label="Sportokol — an eye with a checkmark"
      >
        {/* Eye outline: left corner, upper arch, right corner, lower arch. */}
        <path
          className="logoIntro-eye"
          d="M 60 90 Q 90 60 120 60 Q 150 60 180 90 Q 150 120 120 120 Q 90 120 60 90 Z"
        />
        <circle className="logoIntro-pupil" cx="120" cy="90" r="20" />
        <path className="logoIntro-check" d="M 100 80 L 115 95 L 145 65" />
      </svg>

      {full && (
        <>
          {/* The real wordmark artwork rather than styled text, so it cannot
              drift from the one in the nav bar. */}
          <Image
            src="/brand/wordmark.png"
            alt="Sportokol"
            width={640}
            height={188}
            className="logoIntro-wordmark mt-2 h-9 w-auto object-contain sm:h-11"
          />
          <p className="logoIntro-tagline mt-3 text-sm tracking-wide text-lime sm:text-base">
            An eye on all the talent.
          </p>
        </>
      )}
    </div>
  );
}
