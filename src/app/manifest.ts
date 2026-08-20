import type { MetadataRoute } from "next";
import { siteName, siteDescription } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Sports Management Systems`,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    theme_color: "#0B1220",
    background_color: "#0B1220",
    icons: [
      {
        src: "/brand/mark.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
