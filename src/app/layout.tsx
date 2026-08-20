import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import {
  siteUrl,
  siteName,
  siteTitle,
  siteDescription,
  siteKeywords,
} from "@/lib/site";

// Only the weights the design actually uses are requested, and `swap` renders
// fallback text immediately instead of blocking on the webfont.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/brand/mark.png", sizes: "256x256", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/brand/icon-192.png", sizes: "192x192" }],
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-950"
        >
          Skip to content
        </a>
        <ReadingProgress />
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
