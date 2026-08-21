import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "@/components/motion/Motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageLoader } from "@/components/ui/PageLoader";

// Only the weights the design uses; `swap` renders fallback text immediately
// rather than blocking paint on the webfont.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sportokol — Never lose a future professional again",
    template: "%s | Sportokol",
  },
  description:
    "A scout-first platform that turns pitch-side observation into a living, national database of talent. Built for clubs, academies, agencies and federations.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:font-bold focus:text-ink-950"
        >
          Skip to content
        </a>
        <MotionRoot>
          <PageLoader />
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionRoot>
      </body>
    </html>
  );
}
