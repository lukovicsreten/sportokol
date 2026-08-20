
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";
import { NationalTalentMap } from "@/components/illustrations";

const ITEMS = [
  {
    icon: "map",
    title: "Federation-grade database",
    body: "National talent infrastructure incumbents structurally don't sell.",
  },
  {
    icon: "users",
    title: "Every talent, tracked over time",
    body: "A continuous record of each prospect - not a one-off video clip.",
  },
  {
    icon: "database",
    title: "Data no one else owns",
    body: "Proprietary observational data that compounds with every report.",
  },
];

export function Wedge() {
  return (
    <Section id="wedge" dark dots aria-label="The wedge: national talent infrastructure">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker dark>The Wedge</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-lime sm:text-4xl md:text-5xl">
            National talent infrastructure
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
            A living, national map of every prospect in the country.
            Federations and academies stop losing future professionals to
            poor record-keeping, staff turnover and migration - because the
            knowledge now lives in one place they own.
          </p>
        </Reveal>
      </div>

      {/* REPLACE: a real map/product visual of the national database here
          when one exists; this is an illustration standing in for it. */}
      <Reveal className="mt-12">
        <NationalTalentMap className="mx-auto h-auto w-full max-w-md" />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {ITEMS.map((it, i) => (
          <Card key={it.title} dark delay={i * 0.1}>
            <IconTile name={it.icon} />
            <h3 className="text-base font-semibold text-white">
              {it.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-light">
              {it.body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
