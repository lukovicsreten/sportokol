import path from "node:path";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  // Run `ANALYZE=true npm run build` to open the treemap.
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores unrelated lockfiles higher up
  // the filesystem (e.g. C:\Users\Sreten\package-lock.json).
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Modern formats first; Next falls back to the original for old browsers.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  // Ship only the icon/animation modules actually imported.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);
