/**
 * The talent funnel, rebuilt as SVG.
 *
 * The deck ships this as a flat PNG, which cannot animate and cannot scale
 * its type. Redrawn here so the layers narrow on scroll and the 4% who make
 * it is a mark that visibly survives the filter, not a number in a caption.
 *
 * Layers animate on the scroll timeline, same mechanism as `.reveal`, so this
 * costs no JavaScript.
 */
const LAYERS = [
  { top: 0, h: 42, wTop: 260, wBot: 208, fill: "#2C3E63", label: "1,000,000+ registered" },
  { top: 42, h: 42, wTop: 208, wBot: 156, fill: "#35507F", label: "Academy intake" },
  { top: 84, h: 42, wTop: 156, wBot: 104, fill: "#4C8FD1", label: "Scholarship age" },
  { top: 126, h: 42, wTop: 104, wBot: 52, fill: "#C6F135", label: "Turn professional" },
];

const CX = 150;

export function TalentFunnel() {
  return (
    <svg
      viewBox="0 0 300 250"
      className="mx-auto h-auto w-full max-w-[280px]"
      role="img"
      aria-label="A funnel narrowing from over a million registered players down to the 4% who turn professional."
    >
      <text
        x={CX}
        y="12"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#AAB4C8"
      >
        1,000,000+ players
      </text>

      <g transform="translate(0, 22)">
        {LAYERS.map((l, i) => {
          const halfTop = l.wTop / 2;
          const halfBot = l.wBot / 2;
          return (
            <polygon
              key={l.label}
              className="funnel-layer"
              style={{ "--reveal-delay": `${i * 5}%` } as React.CSSProperties}
              points={[
                `${CX - halfTop},${l.top}`,
                `${CX + halfTop},${l.top}`,
                `${CX + halfBot},${l.top + l.h}`,
                `${CX - halfBot},${l.top + l.h}`,
              ].join(" ")}
              fill={l.fill}
            >
              <title>{l.label}</title>
            </polygon>
          );
        })}
      </g>

      {/* The survivor: one mark that makes it through the narrow end. */}
      <circle
        className="funnel-survivor"
        cx={CX}
        cy="210"
        r="9"
        fill="#C6F135"
      />
      <text
        x={CX}
        y="238"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#C6F135"
      >
        a handful of pros
      </text>
    </svg>
  );
}
