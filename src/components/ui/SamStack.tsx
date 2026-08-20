/**
 * Football SAM stacking up into the multi-sport total.
 *
 * The two numbers used to sit in separate boxes, which hid the actual point:
 * the second is the first plus the sports layered on top of it. Shown as one
 * bar that grows in two segments so the stacking is visible.
 *
 * Widths are proportional to the midpoints of the ranges the deck quotes
 * (13.5M of 35M), not invented precision.
 */
const FOOTBALL_PCT = 39;
const MULTISPORT_PCT = 61;

export function SamStack() {
  return (
    <div>
      <div
        className="flex h-14 w-full overflow-hidden rounded-xl bg-black/5"
        role="img"
        aria-label="Football alone is €9–18M ARR; adding basketball, tennis and further sports takes the combined SAM to €20–50M."
      >
        <div
          className="grow-bar flex items-center justify-center"
          style={
            {
              "--bar-width": `${FOOTBALL_PCT}%`,
              backgroundColor: "#C6F135",
            } as React.CSSProperties
          }
        >
          <span className="px-2 text-xs font-bold text-navy-950 sm:text-sm">
            Football
          </span>
        </div>
        <div
          className="grow-bar flex items-center justify-center"
          style={
            {
              "--bar-width": `${MULTISPORT_PCT}%`,
              "--reveal-delay": "8%",
              backgroundColor: "#5AC8FA",
            } as React.CSSProperties
          }
        >
          <span className="px-2 text-xs font-bold text-navy-950 sm:text-sm">
            + Basketball &middot; Tennis &middot; more
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-ink">
          €9–18M{" "}
          <span className="font-normal text-graphite">football today</span>
        </span>
        <span className="text-sm font-semibold text-ink">
          €20–50M{" "}
          <span className="font-normal text-graphite">combined SAM</span>
        </span>
      </div>
    </div>
  );
}
