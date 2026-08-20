import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Below-the-fold sections are code-split; SSR stays on for SEO.
const Problem = dynamic(() =>
  import("@/components/sections/Problem").then((m) => m.Problem)
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((m) => m.HowItWorks)
);
const TractionStrip = dynamic(() =>
  import("@/components/sections/home/TractionStrip").then((m) => m.TractionStrip)
);
const MarketSnapshot = dynamic(() =>
  import("@/components/sections/home/MarketSnapshot").then(
    (m) => m.MarketSnapshot
  )
);
const HomeCta = dynamic(() =>
  import("@/components/sections/home/HomeCta").then((m) => m.HomeCta)
);

/**
 * Home is a hub: enough to understand the product and believe it works, then
 * a route onward. The long-form content lives on /product and /investors.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem variant="compact" />
      <HowItWorks />
      <TractionStrip />
      <MarketSnapshot />
      <HomeCta />
    </>
  );
}
