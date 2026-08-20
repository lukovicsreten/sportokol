import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/ui/PageHero";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { CTA } from "@/lib/cta";
import { Traction } from "@/components/sections/Traction";

export const metadata: Metadata = {
  title: "Investors — Pre-Seed Round",
  description:
    "Sportokol is raising a $300K pre-seed to turn proven local demand into recurring revenue across Spain and the US. Traction, market, business model and use of funds.",
  alternates: { canonical: "/investors" },
};

const SuccessStories = dynamic(() =>
  import("@/components/sections/SuccessStories").then((m) => m.SuccessStories)
);
const Market = dynamic(() =>
  import("@/components/sections/Market").then((m) => m.Market)
);
const BusinessModelBuyers = dynamic(() =>
  import("@/components/sections/BusinessModelBuyers").then(
    (m) => m.BusinessModelBuyers
  )
);
const RevenueEngines = dynamic(() =>
  import("@/components/sections/RevenueEngines").then((m) => m.RevenueEngines)
);
const SecondRevenueLine = dynamic(() =>
  import("@/components/sections/SecondRevenueLine").then(
    (m) => m.SecondRevenueLine
  )
);
const TheAsk = dynamic(() =>
  import("@/components/sections/TheAsk").then((m) => m.TheAsk)
);
const Runway = dynamic(() =>
  import("@/components/sections/Runway").then((m) => m.Runway)
);
const UseOfFunds = dynamic(() =>
  import("@/components/sections/UseOfFunds").then((m) => m.UseOfFunds)
);
const Founders = dynamic(() =>
  import("@/components/sections/Founders").then((m) => m.Founders)
);

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        kicker="Investors"
        title="Raising to turn proven local demand into international ARR"
        lead="A pre-seed round to convert a validated, revenue-generating product into recurring revenue across Spain and the US."
      >
        <a
          href={CTA.deck.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
        >
          {CTA.deck.label}
          <DeckIcon name="arrow-right" className="h-3.5 w-3.5" />
        </a>
      </PageHero>

      {/* Standard practice on any investor-facing page, pre-seed included. */}
      <div className="border-y border-white/10 bg-navy-900 px-6 py-3 text-center sm:px-8">
        <p className="mx-auto max-w-3xl text-xs leading-relaxed text-slate-light">
          This page is for informational purposes and does not constitute an
          offer to sell securities.
        </p>
      </div>

      <Traction />
      <SuccessStories />
      <Market />
      <BusinessModelBuyers />
      <RevenueEngines />
      <SecondRevenueLine />
      <TheAsk />
      <Runway />
      <UseOfFunds />
      <Founders />

      <section
        aria-label="Talk to the founders"
        className="bg-navy-950 px-6 py-20 text-white sm:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="balance text-3xl font-bold tracking-tight sm:text-4xl">
            Talk to the founders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-light">
            Both founders take these calls directly. Ask about the round, the
            data moat, or anything in the deck.
          </p>
          <Link
            href="/contact?type=investor"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
          >
            Start the conversation
            <DeckIcon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
