"use client";

import { Section } from "@/components/ui/Section";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { StatCard } from "@/components/ui/StatCard";
import { Reveal } from "@/components/ui/Reveal";

const ROWS = [
  {
    segment: "Spain - clubs, academies, agencies",
    accounts: "2,500",
    acv: "€3,000",
    sam: "~€7.5M",
  },
  {
    segment: "Balkans - Serbia + W. Balkans",
    accounts: "900",
    acv: "€1,500",
    sam: "~€1.35M",
  },
  {
    segment: "Federations (both regions)",
    accounts: "10",
    acv: "€30–100k",
    sam: "~€0.3–1M",
  },
];

export function Market() {
  return (
    <Section id="market">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex flex-col items-center">
          <SectionKicker>Market Opportunity</SectionKicker>
          <h2 className="balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Football is only the first layer
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-graphite">
            The numbers below are football alone - our beachhead. Every
            additional sport runs on the same platform and sells to the same
            buyers in the same countries, so the account base compounds per
            market instead of starting over.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-12 overflow-hidden rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_24px_48px_-24px_rgba(15,27,46,0.16)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-navy-950 text-white">
                <th className="px-5 py-4 text-sm font-semibold sm:px-6">
                  Segment - football only
                </th>
                <th className="px-5 py-4 text-sm font-semibold sm:px-6">
                  Accounts
                </th>
                <th className="px-5 py-4 text-sm font-semibold sm:px-6">
                  Blended ACV
                </th>
                <th className="px-5 py-4 text-sm font-semibold sm:px-6">
                  Annual SAM
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ROWS.map((r) => (
                <tr key={r.segment} className="border-b border-black/5 last:border-b-0">
                  <td className="px-5 py-4 text-sm text-ink sm:px-6">
                    {r.segment}
                  </td>
                  <td className="px-5 py-4 text-sm text-graphite sm:px-6">
                    {r.accounts}
                  </td>
                  <td className="px-5 py-4 text-sm text-graphite sm:px-6">
                    {r.acv}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-ink sm:px-6">
                    {r.sam}
                  </td>
                </tr>
              ))}
              <tr className="bg-lime/10">
                <td className="px-5 py-4 text-sm font-bold text-ink sm:px-6">
                  Football SAM - both regions
                </td>
                <td className="px-5 py-4 sm:px-6" />
                <td className="px-5 py-4 sm:px-6" />
                <td className="px-5 py-4 text-sm font-bold text-ink sm:px-6">
                  €9–18M ARR
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>

      <p className="mt-4 text-center text-xs text-graphite/70">
        Assumption: Reaching 10% of markets. Order-of-magnitude estimate;
        swings most on final pricing and academy/agency conversion.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <StatCard
          dark={false}
          value={21148}
          label="football clubs in Spain"
        />
        <StatCard
          dark={false}
          value={3087}
          label="clubs and sport societies in Serbia"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,27,46,0.04),0_12px_32px_-16px_rgba(15,27,46,0.12)] sm:p-8">
          <p className="text-sm font-semibold text-graphite">Football today</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            €9-18M ARR
          </p>
          <div className="mt-6 border-t border-black/5 pt-6">
            <p className="text-sm font-semibold text-ink">
              Basketball &middot; Tennis &middot; more
            </p>
            <p className="mt-1 text-sm text-graphite">
              Same platform, same buyers, same countries
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
          <p className="text-3xl font-bold tracking-tight text-lime sm:text-4xl">
            €20-50M
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-light">
            combined multi-sport SAM across Spain + the Balkans, as each
            market layers sport on sport
          </p>
          <p className="mt-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-slate-light">
            + Data &amp; medtech line (digital twins, injury prediction,
            licensed data) sits on top of this as optionality - not counted
            above!
          </p>
        </div>
      </div>
    </Section>
  );
}
