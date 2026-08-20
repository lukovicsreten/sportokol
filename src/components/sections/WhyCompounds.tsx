import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const SERIES = [
  { name: "Scouts", color: "#C6F135" },
  { name: "Coaches", color: "#5AC8FA" },
  { name: "Medical", color: "#4ADE80" },
  { name: "Public APIs", color: "#FB923C" },
];

export function WhyCompounds() {
  return (
    <Section id="why-compounds" dark>
      <SectionKicker className="mx-auto flex w-fit md:mx-0">
        Why The Data Compounds
      </SectionKicker>
      <Reveal>
        <h2 className="balance max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[44px]">
          A complete history de-risks sport&rsquo;s{" "}
          <span className="text-lime">most expensive decisions</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
          The academy player who turns pro doesn&rsquo;t just gain value on
          the pitch, he arrives with years of verified data behind him. When a
          buying club is weighing an eight-figure fee plus salary, that
          history is the difference between a gamble and an informed
          decision.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card dark>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            One player, academy to pro. The record thickens every season.
          </p>
          <Image
            src="/art/data-on-file.png"
            alt="Stacked area chart: data on file per player grows from U13 through U15, U17 and U19 to professional level"
            width={1180}
            height={300}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="mt-6 h-auto w-full"
          />
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {SERIES.map((s) => (
              <span
                key={s.name}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-light"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.name}
              </span>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card dark className="flex flex-col justify-center">
            <DeckIcon name="search-value" className="h-6 w-6 text-lime" />
            <h3 className="mt-3 text-base font-semibold text-white">
              Decision-grade intelligence, instantly
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-light">
              A buying club gets the full development history — not a
              highlight reel — in the time it takes to ask a question.
            </p>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard value={8.6} prefix="$" suffix="B" decimals={1} label="spent on international transfers in 2024 (FIFA)" />
            <StatCard value={20} prefix="≥$" suffix="M" label="per deal drives ~40% of all transfer spend" />
            <StatCard value={732} prefix="€" suffix="M" label="injury cost to Europe's top-5 leagues in one season" />
          </div>
        </div>
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl bg-navy-800 border border-lime-dim px-6 py-8 text-center sm:px-10">
          <p className="balance text-lg leading-relaxed text-white sm:text-xl">
            <span className="font-bold text-lime">
              Against fees and wages this size, better information is
              priceless.
            </span>{" "}
            A player with a full Sportokol history is easier to value, easier
            to trust and the data itself becomes an asset that travels with
            him.
          </p>
        </div>
      </Reveal>

      <p className="mt-6 text-center text-xs text-slate-light/70">
        Sources: FIFA Global Transfer Report 2024; Howden European Football
        Injury Index 2023/24
      </p>
    </Section>
  );
}
