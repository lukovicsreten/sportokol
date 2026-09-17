"use client";

import { useEffect, useState } from "react";
import { m } from "@/components/motion/Motion";
import { useMotionPrefs } from "@/lib/useMotionPrefs";

/**
 * Hold the loader at least this long so it never flashes on a fast connection.
 *
 * Measured from navigation start, not from mount, and the overlay leaves as
 * soon as that budget is spent — it does not wait for window.load. That wait
 * was the single most expensive thing on the site: load fires only once every
 * script and font has arrived, which on a throttled phone is around 3.6s, and
 * nothing can paint as LCP while the overlay is up. The page is server
 * rendered and its CSS is already applied by first paint, so there is nothing
 * to wait for.
 *
 * On a slow device hydration alone outlasts this budget, so the loader clears
 * the moment the page is interactive. On a fast one it holds the full 700ms,
 * which is where the branded entrance still has room.
 */
const MIN_VISIBLE_MS = 700;
const MIN_VISIBLE_REDUCED_MS = 400;

/** Must match the duration in `.loader-overlay` in globals.css. */
const FADE_MS = 450;

/**
 * Full-screen loader with the blinking eye.
 *
 * Lives in the layout, not the template, so it mounts once. A template
 * remounts on every client navigation, which would replay the loader on every
 * link click.
 *
 * **CSS owns the fade; this component only unmounts the node.** The overlay is
 * server-rendered, so with JavaScript in charge of the fade it could not leave
 * before hydration — and on a throttled phone it sat over the page until the
 * bundle had booted. Worse, once it did hydrate, Framer reset opacity to 1 and
 * re-ran its own exit, so the eye visibly came back after having faded. The
 * fade now lives entirely in `.loader-overlay` in globals.css, and React waits
 * out that animation before removing the element.
 *
 * Without JavaScript the overlay still clears: the animation is pure CSS and
 * ends in `pointer-events: none`, so the node left behind is inert.
 */
export function PageLoader() {
  const { reduced } = useMotionPrefs();
  const [loading, setLoading] = useState(true);

  // Mark the document as loading immediately, and lock scrolling while the
  // overlay is up. Cleanup runs even if the effect is torn down early.
  useEffect(() => {
    const root = document.documentElement;
    if (!loading) {
      delete root.dataset.loading;
      document.body.style.overflow = "";
      root.dataset.loaded = "true";
      return;
    }
    root.dataset.loading = "true";
    document.body.style.overflow = "hidden";
  }, [loading]);

  useEffect(() => {
    // The CSS animation starts at parse and runs MIN + FADE. Unmounting is
    // only cleanup, so it waits out the whole of it rather than racing it —
    // removing the node early would cut the fade short.
    const total = (reduced ? MIN_VISIBLE_REDUCED_MS : MIN_VISIBLE_MS) + FADE_MS;
    const remaining = Math.max(0, total - performance.now());
    const timer = setTimeout(() => setLoading(false), remaining);
    return () => clearTimeout(timer);
  }, [reduced]);

  const pulse = reduced
    ? {}
    : {
        scale: [0.9, 1.1, 0.9],
        transition: {
          duration: 1.05,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const glow = reduced
    ? {}
    : {
        opacity: [0.4, 1, 0.4],
        transition: {
          duration: 1.05,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  if (!loading) return null;

  return (
    <div
      className="loader-overlay fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading Sportokol</span>

      <div aria-hidden="true" className="relative">
        {/* Halo, pulsing in step with the pupil. */}
        <m.span
          animate={glow}
          className="absolute inset-0 -z-[1] rounded-full bg-lime/25 blur-[60px]"
        />

        <svg viewBox="0 0 220 150" className="w-52 sm:w-64">
          <path
            d="M12 75C40 28 72 10 110 10C148 10 180 28 208 75C180 122 148 140 110 140C72 140 40 122 12 75Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* transform-box keeps the scale centred on the pupil itself
                  rather than on the SVG's origin. */}
          <m.circle
            cx="110"
            cy="75"
            r="30"
            fill="#C6F135"
            animate={pulse}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              willChange: "transform",
            }}
          />
          <circle cx="110" cy="75" r="12" fill="#0A1628" />
          <m.path
            d="M150 55C168 38 186 20 202 6"
            stroke="#C6F135"
            strokeWidth="8"
            strokeLinecap="round"
            animate={glow}
          />
        </svg>
      </div>
    </div>
  );
}
