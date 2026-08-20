import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Reveal } from "@/components/ui/Reveal";
import { DeckIcon } from "@/components/ui/DeckIcon";

/**
 * Home-page condensation of Traction and Success Stories: the claim and the
 * badge, nothing more. The full cards live on /investors.
 */
const ITEMS = [
  { icon: "trophy", badge: "Pilot completed", title: "FK TSC Bačka Topola" },
  { icon: "handshake", badge: "Active engagement", title: "LALIGA Academy" },
  { icon: "award", badge: "Winner", title: "SMART START · Innovation Fund" },
  { icon: "users", badge: "In daily use", title: "Academies & agencies, US + EU" },
];

export function TractionStrip() {
  return (
    <Section id="traction" aria-label="Traction">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Validated where it counts</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Run with a club competing in Europe
          </h2>
        </Reveal>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it, i) => (
          <li
            key={it.title}
            style={{ "--reveal-delay": `${i * 3}%` } as React.CSSProperties}
            className="reveal rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)]"
          >
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-lime">
              <DeckIcon name={it.icon} className="h-4 w-4" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-ink">
              {it.badge}
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-ink">
              {it.title}
            </p>
          </li>
        ))}
      </ul>

      <Reveal className="mt-8 text-center">
        <Link
          href="/investors#traction"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lime-ink hover:underline"
        >
          See the full traction and success stories
          <DeckIcon name="arrow-right" className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
