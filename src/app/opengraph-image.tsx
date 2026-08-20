import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Sportokol — a scout-first platform that turns pitch-side observation into a living, national database of talent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, generated at build time. Satori (behind ImageResponse)
 * cannot fetch relative URLs, so the logo is inlined from disk as a data URI.
 */
export default async function Image() {
  const mark = await readFile(join(process.cwd(), "public/brand/mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0B1220 0%, #0F1B2E 100%)",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Dot field, echoing the hero backdrop. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 38,
            padding: 24,
            opacity: 0.28,
          }}
        >
          {Array.from({ length: 208 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                background: i % 11 === 0 ? "#C6F135" : "#33456b",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={76} height={76} alt="" />
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
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
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#C6F135",
              marginBottom: 22,
            }}
          >
            SPORTS MANAGEMENT SYSTEMS
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1 }}>
            <span style={{ color: "#FFFFFF" }}>Never lose a future&nbsp;</span>
            <span style={{ color: "#C6F135" }}>professional</span>
            <span style={{ color: "#FFFFFF" }}>&nbsp;again.</span>
          </div>
          <span
            style={{
              fontSize: 27,
              color: "#AAB4C8",
              marginTop: 26,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            A scout-first platform that turns pitch-side observation into a
            living, national database of talent.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 21,
            color: "#AAB4C8",
          }}
        >
          <span>⚽ Football</span>
          <span>·</span>
          <span>🏀 Basketball</span>
          <span>·</span>
          <span>🎾 Tennis</span>
        </div>
      </div>
    ),
    size
  );
}
