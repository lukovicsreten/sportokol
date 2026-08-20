import { Flywheel } from "@/components/ui/Flywheel";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

const SOFTWARE_TIERS = [
  { name: "Single agent", price: "€", body: "Personal record for a single scout or agent" },
  { name: "Agency", price: "€€", body: "Shared talent book across the roster" },
  { name: "Club", price: "€€€", body: "Recruitment, evaluation & development" },
  { name: "Federation", price: "Enterprise", body: "Nationwide talent infrastructure" },
];

export function RevenueEngines() {
  return (
    <Section id="revenue-engines" aria-label="Revenue engines">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          Two revenue lines, one compounding dataset
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite mx-auto">
          Recurring software sold across the entire talent chain today and a
          second, higher-margin data business that grows as the database
          does.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)] sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite">
              Engine 1: Recurring Software
            </p>
            <Badge tone="lime-ink" variant="outline">
              Live today
            </Badge>
          </div>
          <ul className="mt-6 space-y-4">
            {SOFTWARE_TIERS.map((t) => (
              <li
                key={t.name}
                className="flex items-center justify-between border-b border-black/5 pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-graphite">{t.body}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-ink">
                  {t.price}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-graphite">
            Scales with number of accounts &middot; federations are the
            enterprise whale
          </p>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              Engine 2: Data Revenue
            </p>
            <Badge tone="lime" variant="outline">
              Second line
            </Badge>
          </div>
          <ul className="mt-6 space-y-4">
            <li>
              <p className="text-sm font-semibold text-white">
                License the dataset
              </p>
              <p className="mt-1 text-sm text-slate-light">
                Consented, longitudinal athlete data licensed to developers
                and researchers.
              </p>
            </li>
            <li className="border-t border-white/10 pt-4">
              <p className="text-sm font-semibold text-white">
                Reach the panel
              </p>
              <p className="mt-1 text-sm text-slate-light">
                Paid studies and recurring questionnaires to a consented
                panel of athletes &amp; staff.
              </p>
            </li>
          </ul>
          <p className="mt-6 text-xs text-slate-light">
            Buyers: Sportstech &middot; Pharma &middot; Medtech &middot;
            Federations
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-xs text-slate-light">
            Scales with database size, not headcount, independent of
            subscriptions.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl bg-navy-950 px-6 py-8 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            The flywheel: why both lines grow together
          </p>
          <div className="mt-6">
            <Flywheel />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
