import { Hero, GlowEye } from "@/components/ui/Hero";
import { SportPills } from "@/components/ui/SportPills";
import { CTAButton } from "@/components/ui/CTAButton";
import {
  SectionLight,
  EyebrowLabel,
  Reveal,
  RevealGrid,
  RevealItem,
} from "@/components/ui/primitives";
import { Card, CountUp } from "@/components/ui/cards";
import { TractionBar, ClosingCta } from "@/components/sections/shared";
import { Faq } from "@/components/sections/Faq";
import { HowItWorks } from "@/components/sections/HowItWorks";

const PROBLEMS = [
  {
    title: "Invisible Talent: Why Video-Based Scouting Fails",
    body: "Youth & grassroots are barely filmed, so video-based incumbents (Wyscout, Hudl) have nothing to work with.",
    fix: "Captures pitch-side observation and no video needed.",
  },
  {
    title: "Birthday Bias: How Relative Age Effect Skews Selection",
    body: "The relative-age effect skews selection ~90/10 toward early-born kids at age 6; late developers are lost for good.",
    fix: "Tracks development over time to catch the late bloomers.",
  },
  {
    title: "Subjective Evaluation: The Need for a Shared Framework",
    body: "Scouts (un)consciously rate older, bigger kids higher, with no shared framework to compare players fairly.",
    fix: "One shared framework for every player comparable.",
  },
  {
    title: "Lost Knowledge: When Scouts Leave, Data Walks Out",
    body: "Scouting still lives in notebooks, spreadsheets and PDFs, when a scout leaves, years of context leave too.",
    fix: "One owned database, a memory that compounds.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Sports management systems"
        headline="Never lose a future **professional** again."
        subhead="A scout-first platform that turns pitch-side observation into a living, national database of talent."
        aside={<GlowEye />}
      >
        <SportPills />
        <p className="mt-5 text-sm text-mist">
          Live modules today · sport-agnostic platform, built to extend
        </p>
        {/* Two routes rather than one: a club wants a demo, everyone else
            wants to understand the product first. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CTAButton href="/contact" pulse>
            Book a demo
          </CTAButton>
          <CTAButton href="/product" variant="secondary">
            See the product
          </CTAButton>
        </div>
      </Hero>

      <SectionLight aria-label="The problem">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <EyebrowLabel dark={false}>The problem</EyebrowLabel>
          </div>
          <h2 className="balance mt-6 font-display text-4xl font-extrabold tracking-[-0.02em] text-ink-950 sm:text-5xl">
            The Problem: Youth Sports Loses 96% of Its Talent
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            Youth football runs the most expensive talent funnel in sport
            almost blindly — on video that doesn&rsquo;t exist, judgement that
            isn&rsquo;t shared, and records that leave when people do.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Numbers roughly 50% larger than the label beneath them, and the
              two stats separated by real space rather than a hairline — the
              size gap is what makes the hierarchy read at a glance. */}
          <Reveal className="rounded-2xl bg-ink-950 p-8 text-white sm:p-10">
            <p className="font-display text-[5.5rem] font-extrabold leading-[0.95] tracking-tight text-lime sm:text-[6.5rem]">
              <CountUp value={4} suffix="%" />
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-lime">
              reach the top tier
            </p>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-mist">
              of academy prospects make it — the other 96% are filtered out,
              most never systematically tracked along the way.
            </p>

            <div className="mt-12 border-t border-white/10 pt-10">
              <p className="font-display text-[4rem] font-extrabold leading-[0.95] tracking-tight text-lime sm:text-[4.75rem]">
                <CountUp value={55} suffix="%" />
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-lime">
                clinical distress
              </p>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-mist">
                of released academy players show clinical distress within 3
                weeks.
              </p>
            </div>
          </Reveal>

          <RevealGrid className="grid gap-5 sm:grid-cols-2">
            {PROBLEMS.map((p, i) => (
              <RevealItem key={p.title} index={i}>
                <Card dark={false} className="h-full">
                  <h3 className="font-display text-base font-extrabold leading-snug text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate">
                    {p.body}
                  </p>
                  <p className="mt-4 border-t border-ink-950/5 pt-3.5 text-sm font-semibold leading-relaxed text-ink-950">
                    <span className="text-lime-deep">→ </span>
                    {p.fix}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGrid>
        </div>

        <Reveal className="mt-12 rounded-2xl bg-ink-950 px-6 py-12 text-center sm:px-10">
          <p className="font-display text-5xl font-extrabold tracking-tight text-lime sm:text-6xl">
            <CountUp value={1000000} suffix="+" />
          </p>
          <p className="balance mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-mist">
            registered players in Spain alone — and most are never
            systematically scouted, compared, or tracked over time.
          </p>
        </Reveal>
      </SectionLight>

      <HowItWorks />
      <TractionBar />
      <Faq />
      <ClosingCta />
    </>
  );
}
