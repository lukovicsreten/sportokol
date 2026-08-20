import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const STREAMS = [
  {
    icon: "binoculars",
    title: "Scouts",
    body: "Technical, physical & mental ratings",
    color: "#C6F135",
  },
  {
    icon: "whistle",
    title: "Coaches",
    body: "Training load & development notes",
    color: "#5AC8FA",
  },
  {
    icon: "stethoscope",
    title: "Medical staff",
    body: "Physicals, injury & medical history",
    color: "#4ADE80",
  },
  {
    icon: "runner",
    title: "Athletes themselves",
    body: "Self-reported wellness & feedback",
    color: "#FB923C",
  },
];

export function DataAsset() {
  return (
    <Section id="data-asset" dark>
      <SectionKicker className="mx-auto flex w-fit md:mx-0">
        The Data Asset
      </SectionKicker>
      <Reveal>
        <h2 className="balance max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[44px]">
          Years of an athlete&rsquo;s life,{" "}
          <span className="text-lime">in structured data</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
          Four independent streams land on one athlete profile and keep
          building with months becoming years. The result is a longitudinal
          dataset on human development and performance that exists nowhere
          else.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">
        <Reveal>
          <div className="rounded-2xl border border-lime-dim bg-navy-800 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              What we capture
            </p>
            <ul className="mt-5 space-y-5">
              {STREAMS.map((s) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    className="w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <div className="flex items-start gap-3">
                    {/* Icon picks up its stream's colour via currentColor. */}
                    <span style={{ color: s.color }}>
                      <DeckIcon name={s.icon} className="mt-0.5 h-5 w-5 shrink-0" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {s.title}
                      </p>
                      <p className="text-sm text-slate-light">{s.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            One profile, built over time
          </p>
          <Image
            src="/art/athlete-profile.png"
            alt="Four coloured data streams — scouts, coaches, medical staff and athletes — converging into a single athlete profile"
            width={560}
            height={340}
            sizes="(max-width: 768px) 100vw, 45vw"
            className="mx-auto h-auto w-full max-w-md"
          />
          <p className="mt-4 text-center text-sm leading-relaxed text-slate-light">
            Every report, note, check-up and self-assessment attaches to the
            same athlete starting from the first trial to professional
            contract, across scouts, coaches and seasons.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <div className="rounded-2xl border border-lime-dim bg-navy-800 px-6 py-8 text-center sm:px-10">
          <div className="mb-3 flex items-center justify-center gap-2">
            <DeckIcon name="refresh" className="h-4 w-4 text-lime" />
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-lime">
              Continuously enriched from open data and partnerships
            </p>
          </div>
          <p className="balance mx-auto max-w-2xl text-base leading-relaxed text-slate-light">
            <span className="font-semibold text-white">
              Proprietary + public,
            </span>{" "}
            combined into one record no competitor holds.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
