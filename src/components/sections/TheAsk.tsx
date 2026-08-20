import { DeckIcon } from "@/components/ui/DeckIcon";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal } from "@/components/ui/Reveal";

const WHY_NOW = [
  {
    icon: "chart-up",
    title: "$150K earned in <12 months",
    body: "Selling locally, self-funded ~30% already recurring",
  },
  {
    icon: "bolt",
    title: "Low month burn",
    body: "Two people, product largely built, exceptionally capital-efficient",
  },
  {
    icon: "globe",
    title: "Spain + US in motion",
    body: "Active engagement in both markets, on top of the Balkan base",
  },
];

export function TheAsk() {
  return (
    <Section id="ask-round" dark dots>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>The Ask</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Raising to turn proven local demand into international ARR
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
            A pre-seed round to convert a validated, revenue-generating
            product into recurring revenue across Spain and the US.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard value={300} prefix="$" suffix="K" label="Raising now (Pre-seed round)" delay={0} />
        <StatCard value={15} suffix="%" label="Equity offered ($2.0M post-money)" delay={0.08} />
        <StatCard value={24} suffix=" mo" label="Runway it buys (to a seed-ready company)" delay={0.16} />
      </div>

      <Reveal className="mt-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-lime">
          Why now
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WHY_NOW.map((w) => (
            <div key={w.title} className="text-center sm:text-left">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-lime/15 text-lime sm:mx-0">
                <DeckIcon name={w.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-light">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <p className="text-center text-sm leading-relaxed text-slate-light">
          <span className="font-semibold text-white">Structure:</span> priced
          round at $2.0M post-money - open to a post-money SAFE. SMART START
          (Innovation Fund) already secured as non-dilutive backing.
        </p>
      </Reveal>
    </Section>
  );
}
