"use client";

import { useEffect, useState } from "react";

/**
 * Reports which of the given section ids is currently the most prominent in
 * the viewport.
 *
 * Uses a single IntersectionObserver rather than a scroll listener that
 * measures with getBoundingClientRect on every tick — with ~22 sections that
 * would be the most expensive thing on the page during a scroll.
 */
export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    // Track ratios in a map so the "winner" is whichever section currently
    // occupies the most of the viewport, not merely the last one crossed.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActiveId(best);
      },
      {
        // Ignore the sliver behind the sticky nav, and score sections by how
        // much of the viewport they fill.
        rootMargin: "-72px 0px -40% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
