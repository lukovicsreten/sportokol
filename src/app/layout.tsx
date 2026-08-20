import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sportokol.com";
const title = "Sportokol — Never lose a future professional again.";
const description =
  "A scout-first platform that turns pitch-side observation into a living, national database of talent. Sports management systems for clubs, academies, agencies and federations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "sports scouting software",
    "talent identification platform",
    "youth football scouting",
    "sports management system",
    "player database",
    "sportokol",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Sportokol",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/brand/mark.png",
    apple: "/brand/mark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-950">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
