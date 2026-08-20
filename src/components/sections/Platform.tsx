import { Section } from "@/components/ui/Section";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const SPORTS = [
  { icon: "football", label: "Football" },
  { icon: "basketball", label: "Basketball" },
  { icon: "tennis", label: "Tennis" },
];

export function Platform() {
  return (
    <Section id="platform">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-12">
        <Reveal>
          <SectionKicker>The Platform</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[44px]">
            Capture, structure and act on scouting data - in one place
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-graphite">
            Scouts record what they see pitch-side - technical, physical and
            mental ratings plus written notes. Every observation lands in a
            structured, comparable database, and an AI layer turns it into
            clear assessments and instant answers.
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
              Live modules today
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {SPORTS.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm"
                >
                  <DeckIcon name={s.icon} className="h-4 w-4 text-lime" />
                  {s.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-graphite">
              Sport-agnostic architecture, more sports in active development.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ProductShot
            src="/product/players.jpg"
            alt="Sportokol Players screen: a searchable grid of scouted player profiles filtered by sport and age group"
            caption="Live scouting dashboard — talent pipeline and top prospects at a glance"
          />
        </Reveal>
      </div>
    </Section>
  );
}
