import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";

const ALLOCATIONS = [
  {
    label: "Product & engineering",
    pct: 35,
    amount: "$105K",
    body: "Kill the manual implementation work; make onboarding self-serve; harden the AI layer.",
    color: "#C6F135",
  },
  {
    label: "Spain & US go-to-market",
    pct: 30,
    amount: "$90K",
    body: "Land the LaLiga-adjacent beachhead and open the US market: sales, travel, partnerships.",
    color: "#5AC8FA",
  },
  {
    label: "Key hires",
    pct: 20,
    amount: "$60K",
    body: "1–2 people: a commercial/BD lead and a product/engineering hire.",
    color: "#4ADE80",
  },
  {
    label: "Data infra & compliance",
    pct: 10,
    amount: "$30K",
    body: "The consent-first data moat. The real infrastructure and legal groundwork.",
    color: "#FB923C",
  },
  {
    label: "Buffer & operations",
    pct: 5,
    amount: "$15K",
    body: "Contingency and day-to-day runway.",
    color: "#AAB4C8",
  },
];

/**
 * The bars grow with a CSS scroll-driven animation, same mechanism as
 * `.reveal`. An earlier version gave each bar its own Framer `whileInView`
 * nested inside the section reveal and they stayed stuck at zero width.
 */
function AllocationList() {
  return (
    <ul className="space-y-6">
      {ALLOCATIONS.map((a, i) => (
        <li key={a.label}>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: a.color }}
              />
              {a.label}
            </span>
            <span className="shrink-0 text-sm font-semibold text-ink">
              {a.pct}% ({a.amount})
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
            <div
              className="grow-bar h-full rounded-full"
              style={
                {
                  "--bar-width": `${a.pct}%`,
                  "--reveal-delay": `${i * 3}%`,
                  backgroundColor: a.color,
                } as React.CSSProperties
              }
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-graphite">{a.body}</p>
        </li>
      ))}
    </ul>
  );
}

function StackedBar() {
  return (
    <div className="flex h-10 w-full overflow-hidden rounded-full bg-white/5">
      {ALLOCATIONS.map((a, i) => (
        <div
          key={a.label}
          className="grow-bar h-full"
          style={
            {
              "--bar-width": `${a.pct}%`,
              "--reveal-delay": `${i * 3}%`,
              backgroundColor: a.color,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function UseOfFunds() {
  return (
    <Section id="use-of-funds" aria-label="Use of funds">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Use Of Funds</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Every dollar aimed at recurring revenue abroad
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            $300K allocated against the milestones that make the seed round
            easy: product, international go-to-market, and the team to run
            it.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <AllocationList />

        <div className="rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            $300K allocation
          </p>
          <div className="mt-6">
            <StackedBar />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {ALLOCATIONS.map((a) => (
              <span
                key={a.label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-light"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: a.color }}
                />
                {a.pct}%
              </span>
            ))}
          </div>
          <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-slate-light">
            Split roughly product / market / people — with over 6 in every 10
            dollars pointed straight at growth.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-light">
            <span className="font-semibold text-white">Outcome:</span> a
            majority-recurring, multi-market business ready to raise seed
            from strength.
          </p>
        </div>
      </div>
    </Section>
  );
}
