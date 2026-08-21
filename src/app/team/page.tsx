import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/ui/Hero";
import { SectionDark, RevealGrid, RevealItem } from "@/components/ui/primitives";
import { Card } from "@/components/ui/cards";
import { Constellation } from "@/components/ui/Constellation";
import { Callout, ClosingCta } from "@/components/sections/shared";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Sports operations meets founding expertise — the two founders behind Sportokol.",
};

const FOUNDERS = [
  {
    name: "Aleksandar Isaković",
    role: "CEO · Partnerships",
    photo: "/team/aleksandar-isakovic.jpg",
    line: "Operating at the intersection of sports operations, business development and execution.",
    points: [
      "Operations Director at FK TSC - scaling operations inside a club competing in Europe.",
      "Co-founder of ST Rent; founder of SMS, delivering software and business development.",
      "Track record across sports operations, sales strategy and startup advisory.",
    ],
    tag: "Leads partnerships & club go-to-market",
  },
  {
    name: "Vladislav Pavlov",
    role: "CFO / CSO · Strategy & Markets",
    photo: "/team/vladislav-pavlov.jpg",
    line: "Bridges South-East European startups with the customers, capital and operators to scale internationally.",
    points: [
      "Founder of Furtherance Network, connecting SEE startups to Central-European & US markets.",
      "5+ years in B2B sales & business development across Germany, the US and Serbia.",
      "Deep VC-ecosystem network; mentor within the regional startup accelerator scene.",
    ],
    tag: "Owns financial strategy & market entry",
  },
];

export default function TeamPage() {
  return (
    <>
      <Hero
        eyebrow="The founders"
        headline="Sports operations meets **founding expertise**"
        subhead="A founder who has run operations inside a European-level football club, paired with one who builds the bridge between South-East European startups and international capital."
      />

      <SectionDark aria-label="Founders">
        <Constellation strength={60} />
        <RevealGrid className="relative grid gap-6 lg:grid-cols-2">
          {FOUNDERS.map((f, i) => (
            <RevealItem key={f.name} index={i}>
              <Card className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center gap-5">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    width={400}
                    height={400}
                    sizes="96px"
                    className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-1 ring-lime/40"
                  />
                  <div>
                    <h2 className="font-display text-2xl font-extrabold leading-tight">
                      {f.name}
                    </h2>
                    <p className="mt-1 text-sm font-bold text-lime">{f.role}</p>
                  </div>
                </div>

                <p className="mt-6 text-[15px] italic leading-relaxed text-mist">
                  {f.line}
                </p>

                <ul className="mt-6 flex-1 space-y-3.5">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-mist"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <span className="inline-flex rounded-full border border-lime/40 bg-lime/10 px-4 py-2 text-xs font-bold text-lime">
                    {f.tag}
                  </span>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGrid>

        <Callout className="mt-14" lead="Two sides of the same problem:">
          the domain access to win clubs and federations, and the network
          firepower to turn it into a company.
        </Callout>
      </SectionDark>

      <ClosingCta />
    </>
  );
}

