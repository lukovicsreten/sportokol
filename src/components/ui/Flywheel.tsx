/**
 * The flywheel, drawn as an actual loop.
 *
 * It was a left-to-right arrow sequence, which reads as a pipeline with an
 * end. The whole claim is that it feeds back on itself, so the diagram is a
 * circle with the arrowheads pointing around it.
 */
const NODES = [
  { label: "More", label2: "subscribers", angle: -90 },
  { label: "A richer", label2: "dataset", angle: 30 },
  { label: "A bigger", label2: "data business", angle: 150 },
];

const R = 112;
const CX = 190;
const CY = 160;

function pointAt(angleDeg: number, radius = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

/** Arc between two node angles, trimmed at both ends so it never runs under a node. */
function arcPath(from: number, to: number) {
  const pad = 26;
  const start = pointAt(from + pad);
  const end = pointAt(to - pad);
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${R} ${R} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

export function Flywheel() {
  return (
    <svg
      viewBox="0 0 380 320"
      className="mx-auto h-auto w-full max-w-sm"
      role="img"
      aria-label="A loop: more subscribers leads to a richer dataset, which leads to a bigger data business, which brings more subscribers."
    >
      <defs>
        <marker
          id="fw-arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#C6F135" />
        </marker>
      </defs>

      {[
        [NODES[0].angle, NODES[1].angle],
        [NODES[1].angle, NODES[2].angle],
        [NODES[2].angle, NODES[0].angle + 360],
      ].map(([from, to], i) => (
        <path
          key={i}
          d={arcPath(from, to)}
          fill="none"
          stroke="#C6F135"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#fw-arrow)"
        />
      ))}

      {NODES.map((n, i) => {
        const p = pointAt(n.angle);
        return (
          <g key={n.label2}>
            <circle cx={p.x} cy={p.y} r="46" fill="#141F35" stroke="#C6F135" strokeWidth="1.5" />
            <text
              x={p.x}
              y={p.y - 3}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#FFFFFF"
            >
              {n.label}
            </text>
            <text
              x={p.x}
              y={p.y + 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#C6F135"
            >
              {n.label2}
            </text>
            <circle cx={p.x} cy={p.y} r="46" fill="none" stroke="#0B1220" strokeWidth="0" />
            <text x={p.x} y={p.y - 30} textAnchor="middle" fontSize="9" fill="#AAB4C8">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      <text x={CX} y={CY - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#AAB4C8">
        EACH NEW SPORT
      </text>
      <text x={CX} y={CY + 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#AAB4C8">
        MULTIPLIES BOTH
      </text>
    </svg>
  );
}
