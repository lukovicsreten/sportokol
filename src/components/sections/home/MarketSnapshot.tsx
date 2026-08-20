import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";
import { SamStack } from "@/components/ui/SamStack";
import { DeckIcon } from "@/components/ui/DeckIcon";

/**
 * Home-page condensation of Market Opportunity: the two headline figures and
 * the stacking bar. The segment table and assumptions live on /investors.
 */
export function MarketSnapshot() {
  return (
    <Section id="market" aria-label="Market snapshot">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Market</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Football is only the first layer
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            Every additional sport runs on the same platform and sells to the
            same buyers in the same countries.
          </p>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)] sm:p-8">
        <SamStack />
      </Reveal>

      <Reveal className="mt-8 text-center">
        <Link
          href="/investors#market"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lime-ink hover:underline"
        >
          See the full market breakdown
          <DeckIcon name="arrow-right" className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
