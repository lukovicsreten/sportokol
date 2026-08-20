
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/DeckIcon";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const BUYERS = [
  {
    icon: "agent",
    title: "Single agent",
    body: "The individual scout or agent - a personal, structured record of every player they track.",
  },
  {
    icon: "briefcase",
    title: "Agency",
    body: "Youth-focused agencies - a shared talent book across the whole roster and scouting team.",
  },
  {
    icon: "shield",
    title: "Club",
    body: "Academies and clubs - recruitment, evaluation and player development in one system.",
  },
];

export function BusinessModelBuyers() {
  return (
    <Section id="business-model">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Business Model</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Built for every buyer in the talent chain
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            A SaaS subscription that scales by seat and scope. From a single
            agent to a national federation.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BUYERS.map((b, i) => (
          <Card key={b.title} delay={i * 0.08}>
            <IconTile name={b.icon} dark={false} />
            <h3 className="text-base font-semibold text-ink">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              {b.body}
            </p>
          </Card>
        ))}

        <Card dark delay={0.24} className="relative">
          <span className="absolute right-6 top-6">
            <Badge variant="solid">Enterprise</Badge>
          </span>
          <IconTile name="institution" />
          <h3 className="text-base font-semibold text-white">Federation</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-light">
            The whale: a nationwide talent database and the country&rsquo;s
            core talent infrastructure.
          </p>
        </Card>
      </div>
    </Section>
  );
}
