import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { FAQ_ITEMS } from "@/lib/faq";

export function Faq() {
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-col items-center text-center">
          <SectionKicker>Questions</SectionKicker>
          <h2
            id="faq-heading"
            className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            Frequently asked
          </h2>
        </Reveal>

        {/* Native <details> keeps this keyboard-accessible and open-by-search
            (Chrome expands a collapsed answer when the user hits Ctrl+F). */}
        <div className="mt-12 divide-y divide-black/5 border-y border-black/5">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-ink marker:hidden">
                {item.question}
                <DeckIcon
                  name="plus"
                  className="mt-1 h-4 w-4 shrink-0 text-lime-ink transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-graphite">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
