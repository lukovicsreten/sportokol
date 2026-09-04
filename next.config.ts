import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        /**
         * Icons and team photos live in public/, so Next cannot fingerprint
         * their filenames and serves them with `max-age=0, must-revalidate` —
         * every visit re-checks them. A day of caching is safe for files that
         * change roughly never, and `stale-while-revalidate` means a change
         * still reaches people on their next visit rather than after the TTL.
         *
         * Not `immutable`: without a content hash in the name, that would
         * strand an old icon in caches for a year after a redesign.
         */
        source: "/:file(favicon\.ico|favicon\.svg|apple-touch-icon\.png|icon-192\.png|icon-512\.png|icon-maskable-512\.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/team/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
