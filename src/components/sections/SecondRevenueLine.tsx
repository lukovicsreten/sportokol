
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { DeckIcon, IconTile } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const WHO_NEEDS_IT = [
  { icon: "chip", title: "Sportstech developers" },
  { icon: "test-tube", title: "Pharma & clinical research" },
  { icon: "heart-pulse", title: "Medtech & sports science" },
  { icon: "building", title: "Federations & institutions" },
];

export function SecondRevenueLine() {
  return (
    <Section id="second-revenue-line" dark dots>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Second Revenue Line</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            The data itself becomes <span className="text-lime">a business</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
            Independent of club, agency and federation subscriptions and it
            scales with the size of the database. Two ways to turn the asset
            into revenue:
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card dark>
          <h3 className="text-lg font-semibold text-white">
            License the dataset
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-light">
            Consented, longitudinal athlete data licensed to developers and
            researchers building the next generation of sportstech and
            medtech products.
          </p>
        </Card>
        <Card dark delay={0.08}>
          <h3 className="text-lg font-semibold text-white">
            Reach the persona directly
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-light">
            Paid studies and recurring questionnaires distributed to a
            consented panel of athletes and staff — a direct research channel
            no one else has access to.
          </p>
        </Card>
      </div>

      <Reveal className="mt-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-lime">
          Who needs it
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {WHO_NEEDS_IT.map((w) => (
            <div
              key={w.title}
              className="flex flex-col items-center rounded-2xl border border-lime-dim bg-navy-800 px-4 py-6 text-center"
            >
              <IconTile name={w.icon} className="mb-3" />
              <p className="text-sm font-medium text-white">{w.title}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <div className="flex items-start gap-4 rounded-2xl border border-lime-dim bg-navy-800 px-6 py-6 sm:px-8">
          <DeckIcon name="lock" className="mt-1 h-5 w-5 shrink-0 text-lime" />
          <p className="text-sm leading-relaxed text-slate-light">
            <span className="font-semibold text-white">
              Consent-first by design.
            </span>{" "}
            Explicit, revocable, per-purpose consent. Nothing is licensed or
            surveyed without it, and minors&rsquo; data is governed
            separately.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
