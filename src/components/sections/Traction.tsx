
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/DeckIcon";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  {
    icon: "trophy",
    title: "Pilot completed - FK TSC Bačka Topola",
    body: "A full pilot delivered with a Serbian SuperLiga club that reached the UEFA Conference League knockout phase.",
  },
  {
    icon: "users",
    title: "In use by academies & agencies",
    body: "Running today with multiple youth academies in both US and EU markets and player agencies, repeatable demand beyond the pilot.",
  },
  {
    icon: "award",
    title: "Winner — SMART START",
    body: "Selected by the national accelerator programme of the Innovation Fund: non-dilutive validation from a credible institution.",
  },
  {
    icon: "handshake",
    title: "LALIGA Academy engagement",
    body: "Active engagement with one of world football's leading youth development networks - our entry into Spain.",
  },
];

export function Traction() {
  return (
    <Section id="traction">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Traction &amp; Validation</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Validated where it counts
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            The platform has been run with a club competing in Europe, is in
            daily use with academies and agencies, and has been vetted by a
            national innovation programme.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ITEMS.map((it, i) => (
          <Card key={it.title} delay={i * 0.08}>
            <IconTile name={it.icon} dark={false} />
            <h3 className="text-base font-semibold leading-snug text-ink">
              {it.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">
              {it.body}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
