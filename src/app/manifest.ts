import type { MetadataRoute } from "next";
import { siteName, siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Scouting platform for youth sport`,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    theme_color: "#0A1628",
    background_color: "#0A1628",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
