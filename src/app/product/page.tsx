import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/ui/PageHero";
import { DeckIcon } from "@/components/ui/DeckIcon";
import { Problem } from "@/components/sections/Problem";
import { Platform } from "@/components/sections/Platform";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Capture, structure and act on scouting data in one place. Pitch-side reports without video, one comparable database, and an AI layer that turns it into player assessments.",
  alternates: { canonical: "/product" },
};

const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((m) => m.HowItWorks)
);
const AILayer = dynamic(() =>
  import("@/components/sections/AILayer").then((m) => m.AILayer)
);
const AskDatabase = dynamic(() =>
  import("@/components/sections/AskDatabase").then((m) => m.AskDatabase)
);
const Wedge = dynamic(() =>
  import("@/components/sections/Wedge").then((m) => m.Wedge)
);
const DataAsset = dynamic(() =>
  import("@/components/sections/DataAsset").then((m) => m.DataAsset)
);
const WhyCompounds = dynamic(() =>
  import("@/components/sections/WhyCompounds").then((m) => m.WhyCompounds)
);
const Roadmap = dynamic(() =>
  import("@/components/sections/Roadmap").then((m) => m.Roadmap)
);

const SPORTS = [
  { icon: "football", label: "Football" },
  { icon: "basketball", label: "Basketball" },
  { icon: "tennis", label: "Tennis" },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        kicker="Product"
        title="Capture, structure and act on scouting data — in one place"
        lead="Scouts record what they see pitch-side: technical, physical and mental ratings plus written notes. Every observation lands in a structured, comparable database, and an AI layer turns it into clear assessments and instant answers."
        badges={SPORTS}
      />

      <Problem />
      <Platform />
      <HowItWorks />
      <AILayer />
      <AskDatabase />
      <Wedge />
      <DataAsset />
      <WhyCompounds />
      <Roadmap />

      <section
        aria-label="Book a demo"
        className="bg-navy-950 px-6 py-20 text-white sm:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="balance text-3xl font-bold tracking-tight sm:text-4xl">
            See it on your team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-light">
            We will walk through the scouting flow with your own age groups and
            positions, not a canned demo squad.
          </p>
          <Link
            href="/contact?type=demo"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-6 text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
          >
            Book a demo
            <DeckIcon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
