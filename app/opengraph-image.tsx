import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Roast My FACEIT — Wrapped-style CS2 stat roast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(120% 80% at 50% 0%, #ff5500 0%, #1a0a05 55%, #07070b 100%)",
          color: "white",
          padding: "72px 80px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#ffffff",
            }}
          />
          Unofficial · Comedy · For Laughs
        </div>

        {/* big wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
            fontWeight: 900,
            fontSize: 200,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "white" }}>ROAST</span>
          <span style={{ color: "white" }}>MY</span>
          <span style={{ color: "#ff5500" }}>FACEIT</span>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(255,255,255,0.85)",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <span style={{ maxWidth: 720, lineHeight: 1.25 }}>
            Type a nickname. Get a Wrapped-style roast of your CS2 stats.
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            cs2 · level · elo · k/d
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
