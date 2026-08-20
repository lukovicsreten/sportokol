"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { DeckIcon, IconTile } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const PROBLEMS = [
  {
    icon: "camera-off",
    title: "The best talent is invisible to the tools that exist",
    body: "Youth & grassroots are barely filmed, so video-based incumbents (Wyscout, Hudl) have nothing to work with.",
    fix: "Captures pitch-side observation and no video needed.",
  },
  {
    icon: "scale",
    title: "Talent is selected by birthday, not ability",
    body: "The relative-age effect skews selection ~90/10 toward early-born kids at age 6; late developers are lost for good.",
    fix: "Tracks development over time to catch the late bloomers.",
  },
  {
    icon: "eye-off",
    title: "Evaluation is subjective and never pooled",
    body: "Scouts (un)consciously rate older, bigger kids higher, with no shared framework to compare players fairly.",
    fix: "One shared framework for every player comparable.",
  },
  {
    icon: "note",
    title: "Knowledge walks out the door",
    body: "Scouting still lives in notebooks, spreadsheets and PDFs, when a scout leaves, years of context leave too.",
    fix: "One owned database a memory that compounds.",
  },
];

export function Problem() {
  return (
    <Section id="problem" aria-label="The problem">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>The Problem</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            An industry that loses talent it can&rsquo;t see, measure or
            remember
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            Youth football runs the most expensive talent funnel in sport
            almost blindly, on video that doesn&rsquo;t exist, judgement that
            isn&rsquo;t shared, and records that leave when people do.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-5">
        <Card dark className="md:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              The Talent Funnel
            </p>

            <div className="reveal mx-auto mt-6 w-full max-w-[280px]">
              <p className="mb-1 text-center text-xs font-semibold text-slate-light">
                1,000,000+ players
              </p>
              <Image
                src="/art/talent-funnel.png"
                alt="Talent funnel narrowing from a million registered players down to a handful of professionals"
                width={560}
                height={440}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="text-5xl font-bold tracking-tight text-lime">
              <AnimatedCounter value={4} suffix="%" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-light">
              of academy prospects make it — the other 96% are filtered out,
              most never systematically tracked along the way.
            </p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-light">
              <span className="font-semibold text-white">55%</span> of
              released academy players show clinical distress within 3 weeks.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3">
          {PROBLEMS.map((p, i) => (
            <Card key={p.title} delay={i * 0.08}>
              <IconTile name={p.icon} dark={false} />
              <h3 className="text-base font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-graphite">
                {p.body}
              </p>
              <p className="mt-3 flex gap-2 border-t border-black/5 pt-3 text-sm font-medium leading-relaxed text-ink">
                <DeckIcon
                  name="arrow-right"
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-lime-ink"
                />
                {p.fix}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-graphite">
        Sources: Univ. of Essex (2024) &middot; Teesside / Blakelock &middot;
        age-effective research
      </p>

      <Reveal className="mt-10">
        <div className="rounded-2xl bg-navy-950 px-6 py-8 text-center sm:px-10">
          <p className="balance text-lg font-medium leading-relaxed text-white sm:text-xl">
            <span className="text-lime">
              <AnimatedCounter value={1000000} suffix="+" />
            </span>{" "}
            registered players in Spain alone and most are never
            systematically scouted, compared, or tracked over time.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
