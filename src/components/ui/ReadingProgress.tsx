/**
 * Reading-progress bar across the top of the viewport.
 *
 * Pure CSS: an `animation-timeline: scroll()` drives the scaleX, so there is
 * no scroll listener and no work on the main thread per scroll tick. Browsers
 * without scroll timelines simply never show it, which is fine — it is a
 * progress hint, not content.
 */
export function ReadingProgress() {
  return (
    <div
      aria-hidden="true"
      className="reading-progress pointer-events-none fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-lime"
    />
  );
}
