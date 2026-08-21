"use client";

import { useEffect, useState } from "react";

/**
 * One place that decides how much motion this visitor gets.
 *
 * `reduced`  — the OS "reduce motion" setting. Everything intense is dropped.
 * `rich`     — fine pointer on a wide screen. Gates the effects that only make
 *              sense with a cursor, or that are too expensive for a phone:
 *              custom cursor, 3D tilt, magnetic buttons, parallax.
 *
 * Both start false so the server render and the first client render agree;
 * the richer treatment is switched on after mount.
 */
export function useMotionPrefs() {
  const [prefs, setPrefs] = useState({ reduced: false, rich: false });

  useEffect(() => {
    const reduceQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const richQ = window.matchMedia("(pointer: fine) and (min-width: 1024px)");

    const sync = () =>
      setPrefs({
        reduced: reduceQ.matches,
        rich: richQ.matches && !reduceQ.matches,
      });

    sync();
    reduceQ.addEventListener("change", sync);
    richQ.addEventListener("change", sync);
    return () => {
      reduceQ.removeEventListener("change", sync);
      richQ.removeEventListener("change", sync);
    };
  }, []);

  return prefs;
}
