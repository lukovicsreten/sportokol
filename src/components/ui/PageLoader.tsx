"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "@/components/motion/Motion";
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

/**
 * Full-screen loader with the blinking eye.
 *
 * Lives in the layout, not the template, so it mounts once. A template
 * remounts on every client navigation, which would replay the loader each
 * time a link is clicked.
 *
 * The overlay is server-rendered, so there is no flash of content before
 * hydration. Two safeguards keep that from becoming a trap if JavaScript
 * fails or is blocked:
 *   1. `loader-failsafe` in globals.css hides the overlay after 8s with a
 *      pure CSS animation, so the site can never be permanently covered.
 *   2. Content is only hidden while `data-loading` is on the root, and that
 *      attribute is set by this component — without JS it is never set, so
 *      the page renders normally.
 *
 * It leaves the DOM entirely once the exit finishes, rather than staying
 * invisible over the page and swallowing clicks.
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
    const minimum = reduced ? MIN_VISIBLE_REDUCED_MS : MIN_VISIBLE_MS;

    // performance.now() is already milliseconds since navigation start, so it
    // measures how long the visitor has been looking at the loader — not how
    // long since this effect ran. Counting from mount instead restarted the
    // clock after hydration and charged that time twice.
    const remaining = Math.max(0, minimum - performance.now());
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

  return (
    <AnimatePresence>
      {loading && (
        <m.div
          key="page-loader"
          className="loader-overlay fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading Sportokol</span>

          <m.div
            aria-hidden="true"
            className="relative"
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
