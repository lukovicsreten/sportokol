/**
 * Four data streams converging on one athlete profile.
 *
 * Replaces the flat PNG from the deck so the lines can draw themselves in on
 * scroll and each stream keeps the colour it has in the legend beside it.
 * The stroke-dash draw runs on the scroll timeline — no JavaScript.
 */
export type Stream = { title: string; color: string };

const STREAMS: Stream[] = [
  { title: "Scouts", color: "#C6F135" },
  { title: "Coaches", color: "#5AC8FA" },
  { title: "Medical staff", color: "#4ADE80" },
  { title: "Athletes", color: "#FB923C" },
];

const CX = 400;
const CY = 150;
const START_X = 40;
const Y = [34, 112, 190, 268];

export function AthleteProfileDiagram() {
  return (
    <svg
      viewBox="0 0 520 300"
      className="mx-auto h-auto w-full max-w-lg"
      role="img"
      aria-label="Four coloured streams — scouts, coaches, medical staff and athletes — curving into a single athlete profile."
    >
      {STREAMS.map((s, i) => {
        const y = Y[i];
        // Cubic that leaves the node horizontally and arrives at the hub
        // horizontally, so all four meet cleanly rather than spiking in.
        const d = `M ${START_X} ${y} C ${START_X + 150} ${y}, ${CX - 190} ${CY}, ${CX - 62} ${CY}`;
        return (
          <g key={s.title}>
            <path
              className="stream-line"
              style={
                {
                  stroke: s.color,
                  "--reveal-delay": `${i * 5}%`,
                } as React.CSSProperties
              }
              d={d}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={START_X} cy={y} r="7" fill={s.color} />
            <text
              x={START_X + 16}
              y={y - 10}
              fontSize="12"
              fontWeight="600"
              fill="#FFFFFF"
            >
              {s.title}
            </text>
          </g>
        );
      })}

      <circle cx={CX} cy={CY} r="58" fill="#0F1B2E" stroke="#C6F135" strokeWidth="2" />
      <text
        x={CX}
        y={CY - 4}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
      >
        ATHLETE
      </text>
      <text
        x={CX}
        y={CY + 13}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#C6F135"
      >
        PROFILE
      </text>
    </svg>
  );
}
