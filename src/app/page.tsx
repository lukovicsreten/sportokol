import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";

// Below-the-fold sections are code-split with next/dynamic so the initial
// bundle stays lean; SSR stays on for SEO.
const Problem = dynamic(() =>
  import("@/components/sections/Problem").then((m) => m.Problem)
);
const Platform = dynamic(() =>
  import("@/components/sections/Platform").then((m) => m.Platform)
);
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
const Traction = dynamic(() =>
  import("@/components/sections/Traction").then((m) => m.Traction)
);
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
const Roadmap = dynamic(() =>
  import("@/components/sections/Roadmap").then((m) => m.Roadmap)
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
const FinalCTA = dynamic(() =>
  import("@/components/sections/FinalCTA").then((m) => m.FinalCTA)
);
const Faq = dynamic(() =>
  import("@/components/sections/Faq").then((m) => m.Faq)
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <Platform />
        <HowItWorks />
        <AILayer />
        <AskDatabase />
        <Wedge />
        <DataAsset />
        <WhyCompounds />
        <Traction />
        <SuccessStories />
        <Market />
        <BusinessModelBuyers />
        <RevenueEngines />
        <SecondRevenueLine />
        <Roadmap />
        <TheAsk />
        <Runway />
        <UseOfFunds />
        <Founders />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
