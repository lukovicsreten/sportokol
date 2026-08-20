import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const FOUNDERS = [
  {
    photo: "/team/aleksandar-isakovic.jpg",
    name: "Aleksandar Isaković",
    role: "CEO · Partnerships",
    tagline:
      "Operating at the intersection of sports operations, business development and execution.",
    bullets: [
      "Operations Director at FK TSC - scaling operations inside a club competing in Europe",
      "Co-founder of ST Rent; founder of SMS, delivering software and business development",
      "Track record across sports operations, sales strategy and startup advisory",
    ],
    badge: "Leads partnerships & club go-to-market",
  },
  {
    photo: "/team/vladislav-pavlov.jpg",
    name: "Vladislav Pavlov",
    role: "CFO / CSO · Strategy & Markets",
    tagline:
      "Bridges South-East European startups with the customers, capital and operators to scale internationally.",
    bullets: [
      "Founder of Furtherance Network, connecting SEE startups to Central-European & US markets",
      "5+ years in B2B sales & business development across Germany, the US and Serbia",
      "Deep VC-ecosystem network; mentor within the regional startup accelerator scene",
    ],
    badge: "Owns financial strategy & market entry",
  },
];

export function Founders() {
  return (
    <Section id="team" dark dots aria-label="The founders">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker dark>The Founders</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Sports operations meets{" "}
            <span className="text-lime">founding expertise</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-light">
            A founder who has run operations inside a European-level football
            club, paired with one who builds the bridge between South-East
            European startups and international capital.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {FOUNDERS.map((f, i) => (
          <Card key={f.name} dark delay={i * 0.1} className="p-7 sm:p-8">
            <div className="flex items-center gap-4">
              <Image
                src={f.photo}
                alt={f.name}
                width={400}
                height={400}
                sizes="80px"
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-lime/40"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{f.name}</h3>
                <p className="text-sm font-medium text-lime">{f.role}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-light">
              {f.tagline}
            </p>

            <ul className="mt-5 space-y-3">
              {f.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-slate-light">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <Badge tone="lime" variant="outline">
                {f.badge}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl border border-lime-dim bg-navy-800 px-6 py-8 text-center sm:px-10">
          <p className="balance text-lg leading-relaxed text-white sm:text-xl">
            <span className="font-bold text-lime">
              Two sides of the same problem:
            </span>{" "}
            the domain access to win clubs and federations, and the network
            firepower to turn it into a company.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
