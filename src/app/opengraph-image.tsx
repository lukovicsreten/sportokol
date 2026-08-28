import { ImageResponse } from "next/og";
import { siteDescription } from "@/lib/seo";

export const alt =
  "Sportokol — a scouting platform that turns pitch-side observation into a national database of talent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, generated at build time.
 *
 * The mark is drawn as inline SVG rather than loaded from /public: Satori
 * cannot fetch relative URLs, and inlining avoids having to base64 a file
 * into the bundle for one image.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A1628 0%, #0F2647 100%)",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Lattice, echoing the site's backdrop. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 44,
            padding: 30,
            opacity: 0.3,
          }}
        >
          {Array.from({ length: 168 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                background: i % 9 === 0 ? "#C6F135" : "#35507F",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="74" height="50" viewBox="0 0 220 150">
            <path
              d="M12 75C40 28 72 10 110 10C148 10 180 28 208 75C180 122 148 140 110 140C72 140 40 122 12 75Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinejoin="round"
            />
            <circle cx="110" cy="75" r="30" fill="#C6F135" />
            <circle cx="110" cy="75" r="12" fill="#0A1628" />
            <path
              d="M150 55C168 38 186 20 202 6"
              stroke="#C6F135"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -1,
            }}
          >
            sportokol
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#C6F135",
              marginBottom: 22,
            }}
          >
            SPORTS MANAGEMENT SYSTEMS
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 70,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.08,
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Never lose a future&nbsp;</span>
            <span style={{ color: "#C6F135" }}>professional</span>
            <span style={{ color: "#FFFFFF" }}>&nbsp;again.</span>
          </div>
          <span
            style={{
              fontSize: 25,
              color: "#AAB8CC",
              marginTop: 24,
              maxWidth: 940,
              lineHeight: 1.4,
            }}
          >
            {siteDescription}
          </span>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 21, color: "#AAB8CC" }}>
          <span>Football</span>
          <span>·</span>
          <span>Basketball</span>
          <span>·</span>
          <span>Tennis</span>
        </div>
      </div>
    ),
    size
  );
}
