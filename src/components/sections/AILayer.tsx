import { Section } from "@/components/ui/Section";
import { ProductShot } from "@/components/ui/ProductShot";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const SOURCES = [
  {
    icon: "binoculars",
    title: "Professional scouts",
    body: "Working scouts define what is observed and how it is weighted.",
  },
  {
    icon: "whistle",
    title: "Coaches",
    body: "Academy and first-team coaching methodology encoded into the framework.",
  },
  {
    icon: "medal",
    title: "Ex-professional players",
    body: "Career-earned judgement about what actually translates to the top level.",
  },
  {
    icon: "runner",
    title: "Active professionals",
    body: "Current players keep the standard calibrated to the modern game.",
  },
];


export function AILayer() {
  return (
    <Section id="ai-layer" dark dots aria-label="The AI layer">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-12">
        <Reveal>
          <SectionKicker dark>The AI Layer</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[44px]">
            Trained by the people who actually judge talent
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-light">
            Our models are built on the methodology of working sports
            professionals. That is what makes the output precise enough for a
            club to act on.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SOURCES.map((s, i) => (
              <Card key={s.title} dark delay={i * 0.08} className="p-5">
                <IconTile name={s.icon} />
                <h3 className="text-sm font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-light">
                  {s.body}
                </p>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ProductShot
            dark
            src="/product/ai-analysis.jpg"
            alt="Sportokol AI Analysis panel showing an auto-generated player assessment with statistics, key strengths, areas for improvement, development trajectory and a recommendation"
            caption="Auto-generated player assessment"
          />

          <div className="mt-8 rounded-2xl border border-lime-dim bg-navy-800 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              What it produces
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-light">
              Overall assessment &middot; Strengths &amp; gaps &middot;
              Development trajectory &middot; Clear recommendation
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
