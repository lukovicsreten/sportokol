"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";

const STORIES = [
  {
    badge: "Pilot Completed",
    name: "FK TSC Bačka Topola",
    cover: "/art/pitch-green.png",
    crest: "/partners/fk-tsc.png",
    crestAlt: "FK TSC Bačka Topola club crest",
    points: [
      "Serbian SuperLiga club reached UEFA Conference League knockout 2023/24 (matched only by Crvena zvezda and Partizan)",
      "Club built on youth, produces players at major European clubs",
      "Delivered end-to-end framework tuned to club's methodology, scouts onboarded, live database built pitch-side",
    ],
  },
  {
    badge: "Active Engagement",
    name: "LALIGA Academy",
    cover: "/art/pitch-navy.png",
    crest: "/partners/laliga.png",
    crestAlt: "LALIGA logo",
    points: [
      "One of world football's leading youth development networks, dozens of countries",
      "Route into Spain — market of 21,000+ clubs and 1M+ registered players",
      "Benchmarks platform against elite international academy standards",
    ],
  },
];

export function SuccessStories() {
  return (
    <Section id="success-stories" aria-label="Success stories">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Success Stories</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Proven with clubs that actually develop talent
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {STORIES.map((s, i) => (
          <article
            key={s.name}
            style={{ "--reveal-delay": `${i * 4}%` } as React.CSSProperties}
            className="reveal overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_2px_rgba(15,27,46,0.04),0_24px_48px_-24px_rgba(15,27,46,0.16)]"
          >
            <div className="relative h-40">
              <Image
                src={s.cover}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 rounded-full bg-lime px-3 py-1.5 text-xs font-semibold text-navy-950">
                {s.badge}
              </span>
              <div className="absolute -bottom-8 right-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-black/5 bg-white p-2.5 shadow-lg">
                <Image
                  src={s.crest}
                  alt={s.crestAlt}
                  width={256}
                  height={256}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="p-6 pt-10 sm:p-8 sm:pt-12">
              <h3 className="text-xl font-bold text-ink">{s.name}</h3>
              <ul className="mt-4 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-graphite">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
