/**
 * Brand illustrations.
 *
 * One shared visual language across all of them: 2px strokes, 24px grid,
 * rounded caps, navy fills with lime as the single accent, no gradients and
 * no detail below ~4px. They are line drawings, not icons — icons come from
 * the deck (see DeckIcon).
 *
 * Every illustration is a placeholder for real photography. Where one stands
 * in for a photo the site should eventually have, the call site carries a
 * REPLACE comment.
 */

const STROKE = 2;

type Props = { className?: string };

const shared = {
  fill: "none",
  strokeWidth: STROKE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A scout at the touchline recording on a tablet. */
export function ScoutAtPitch({ className }: Props) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      role="img"
      aria-label="A scout standing at the touchline, entering ratings on a tablet."
    >
      {/* pitch */}
      <g stroke="#35507F" {...shared}>
        <path d="M8 138 H232" />
        <path d="M40 118 H200" />
        <ellipse cx="120" cy="118" rx="34" ry="9" />
        <path d="M64 138 V118" />
        <path d="M176 138 V118" />
      </g>

      {/* scout */}
      <g stroke="#FFFFFF" {...shared}>
        <circle cx="76" cy="58" r="13" />
        <path d="M76 71 V108" />
        <path d="M76 108 L64 142" />
        <path d="M76 108 L90 142" />
        <path d="M76 82 L104 94" />
      </g>

      {/* tablet, held out in front */}
      <g>
        <rect
          x="100"
          y="76"
          width="40"
          height="30"
          rx="4"
          fill="#0F1B2E"
          stroke="#C6F135"
          strokeWidth={STROKE}
        />
        <path d="M106 86 H126" stroke="#C6F135" {...shared} />
        <path d="M106 94 H134" stroke="#5AC8FA" {...shared} />
        <path d="M106 100 H118" stroke="#4ADE80" {...shared} />
      </g>

      {/* players on the far side, kept as simple marks */}
      <g stroke="#4C8FD1" {...shared} opacity="0.75">
        <circle cx="168" cy="96" r="6" />
        <path d="M168 102 V116" />
        <path d="M168 116 L162 126" />
        <path d="M168 116 L174 126" />
        <circle cx="200" cy="102" r="6" />
        <path d="M200 108 V120" />
        <path d="M200 120 L195 128" />
        <path d="M200 120 L205 128" />
      </g>

      <circle cx="146" cy="132" r="5" fill="#C6F135" />
    </svg>
  );
}

/** A national map with a mesh of tracked prospects across it. */
export function NationalTalentMap({ className }: Props) {
  const nodes = [
    [52, 44], [96, 30], [140, 52], [186, 38],
    [40, 96], [88, 84], [134, 104], [190, 92],
    [66, 140], [116, 150], [166, 136],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
    [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [8, 9], [9, 10],
  ];
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      role="img"
      aria-label="A country-wide mesh of scouted prospects, every node connected into one network."
    >
      <path
        d="M28 60 L60 22 L128 16 L182 30 L214 66 L200 128 L150 164 L84 162 L40 128 Z"
        fill="#0F1B2E"
        stroke="#35507F"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <g stroke="#4C8FD1" strokeWidth="1" opacity="0.6">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 5 : 3.5}
          fill={i % 4 === 0 ? "#C6F135" : "#5AC8FA"}
        />
      ))}
    </svg>
  );
}

/** An abstract read-out of an AI assessment: bars resolving into a verdict. */
export function AiAssessment({ className }: Props) {
  const bars = [
    { w: 92, c: "#C6F135" },
    { w: 74, c: "#5AC8FA" },
    { w: 58, c: "#4ADE80" },
    { w: 84, c: "#FB923C" },
  ];
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      role="img"
      aria-label="Scattered observations resolving into a scored assessment."
    >
      {/* scattered raw observations on the left */}
      <g fill="#35507F">
        {[[18, 34], [30, 58], [16, 80], [34, 104], [22, 128], [40, 148]].map(
          ([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" />
          )
        )}
      </g>

      {/* funnel of attention */}
      <path
        d="M50 30 L96 76 L96 104 L50 150"
        fill="none"
        stroke="#C6F135"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* resolved output */}
      <rect
        x="108"
        y="34"
        width="118"
        height="112"
        rx="8"
        fill="#0F1B2E"
        stroke="#C6F135"
        strokeWidth={STROKE}
      />
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x="120"
            y={52 + i * 22}
            width="94"
            height="7"
            rx="3.5"
            fill="#22314F"
          />
          <rect
            x="120"
            y={52 + i * 22}
            width={(94 * b.w) / 100}
            height="7"
            rx="3.5"
            fill={b.c}
          />
        </g>
      ))}
      <circle cx="205" cy="46" r="6" fill="#C6F135" />
    </svg>
  );
}
