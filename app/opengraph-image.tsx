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
          padding: "64px 80px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
          color: "white",
          // Dark base + a single soft orange glow tucked into the top-right
          // corner so the orange "FACEIT" wordmark below sits on a clean
          // dark background and pops.
          background: "#07070b",
          backgroundImage:
            "radial-gradient(900px 620px at 105% -10%, rgba(255,85,0,0.55) 0%, rgba(255,85,0,0.12) 38%, transparent 65%)",
        }}
      >
        {/* ── Top row: logo + eyebrow ───────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          {/* Triangle mark */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            style={{ display: "block" }}
          >
            <path d="M16 50 L32 14 L48 50 Z" fill="#ff5500" />
            <circle cx="32" cy="42" r="3" fill="#07070b" />
          </svg>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Unofficial · Comedy
          </span>
        </div>

        {/* ── Wordmark — pushed to the bottom via mt:auto ───────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            fontWeight: 900,
            fontSize: 168,
            lineHeight: 0.94,
            letterSpacing: "-0.045em",
          }}
        >
          <span style={{ color: "white" }}>Roast My</span>
          <span style={{ color: "#ff5500" }}>FACEIT.</span>
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            height: 2,
            background: "rgba(255,255,255,0.1)",
            marginTop: 32,
            marginBottom: 22,
          }}
        />

        {/* ── Tagline + meta ────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 800,
            }}
          >
            Type a nickname. Get a Wrapped-style roast of your CS2 stats.
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              whiteSpace: "nowrap",
            }}
          >
            12 slides · 50 games
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
