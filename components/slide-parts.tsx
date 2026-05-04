"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────────
   Counter — tweens 0 → `to` with cubic ease-out. Mounts at 0 so the
   number "fills in" when the slide enters.
   ────────────────────────────────────────────────────────────────── */
export function Counter({
  to,
  duration = 900,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof performance === "undefined") {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  const formatted = decimals
    ? n.toFixed(decimals)
    : new Intl.NumberFormat("en-US").format(Math.round(n));
  return (
    <span className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
   GhostBackdrop — huge faded text behind the slide content. Sits at
   z-0 so the foreground (z-10+) reads on top.
   ────────────────────────────────────────────────────────────────── */
export function GhostBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="ghost-backdrop" aria-hidden>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   TierBadge — uppercase pill with orange dot. Used as a quick label.
   ────────────────────────────────────────────────────────────────── */
export function TierBadge({ children }: { children: React.ReactNode }) {
  return <span className="tier-badge">{children}</span>;
}

/* ──────────────────────────────────────────────────────────────────
   PlayerChip — avatar + nickname + region. Persists across slides
   so the report always feels "for this player".
   ────────────────────────────────────────────────────────────────── */
export function PlayerChip({
  nickname,
  avatar,
  region,
  level,
}: {
  nickname: string;
  avatar: string | null;
  region: string;
  level: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 py-1 pl-1 pr-3 text-xs backdrop-blur">
      <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white/10 text-[10px] font-bold uppercase text-white/70">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          nickname.slice(0, 2)
        )}
      </span>
      <span className="font-semibold text-white/90">{nickname}</span>
      <span className="text-white/40">·</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/55">
        {region} · L{level}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BarMeter — labelled horizontal bar. value is 0–100.
   ────────────────────────────────────────────────────────────────── */
export function BarMeter({
  value,
  label,
  rightLabel,
  tone = "white",
}: {
  value: number;
  label?: string;
  rightLabel?: string;
  tone?: "white" | "win" | "tilt" | "faceit";
}) {
  const v = Math.max(0, Math.min(100, value));
  const fillColor =
    tone === "win"
      ? "bg-emerald-400"
      : tone === "tilt"
        ? "bg-rose-400"
        : tone === "faceit"
          ? "bg-[var(--color-faceit)]"
          : "bg-white";
  return (
    <div className="flex flex-col gap-1">
      {(label || rightLabel) && (
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          <span>{label}</span>
          <span>{rightLabel}</span>
        </div>
      )}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/12">
        <div
          className={`bar-fill h-full ${fillColor}`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   RingProgress — SVG donut chart. value 0–100, renders an animated
   arc and the % in the center.
   ────────────────────────────────────────────────────────────────── */
export function RingProgress({
  value,
  size = 180,
  thickness = 14,
  tone = "white",
  label,
}: {
  value: number;
  size?: number;
  thickness?: number;
  tone?: "white" | "win" | "tilt" | "faceit";
  label?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  const stroke =
    tone === "win"
      ? "#34d399"
      : tone === "tilt"
        ? "#fb7185"
        : tone === "faceit"
          ? "#ff5500"
          : "#ffffff";

  const ringStyle: React.CSSProperties & Record<string, string | number> = {
    "--ring-full": c,
    "--ring-end": offset,
    strokeDasharray: c,
    strokeDashoffset: offset,
    animation: "ring-fill 1100ms cubic-bezier(0.16, 1, 0.3, 1) both",
    animationDelay: "200ms",
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={ringStyle}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black tabular-nums leading-none">
          <Counter to={v} suffix="%" />
        </span>
        {label && (
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LevelBars — 10 vertical segments, current level highlighted in
   FACEIT orange, lower levels in dim white. Bars get taller as
   level increases (skill ramp).
   ────────────────────────────────────────────────────────────────── */
export function LevelBars({ level }: { level: number }) {
  return (
    <div className="flex h-20 w-full items-end gap-1">
      {Array.from({ length: 10 }, (_, i) => {
        const idx = i + 1;
        const filled = idx <= level;
        const heightPct = 22 + i * 8; // 22 → 94
        return (
          <div
            key={idx}
            className={`flex-1 rounded-sm transition-all ${
              filled ? "bg-[var(--color-faceit)]" : "bg-white/12"
            }`}
            style={{
              height: `${heightPct}%`,
              animation: "bar-fill 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
              animationDelay: `${100 + i * 40}ms`,
              transformOrigin: "bottom",
              boxShadow: filled
                ? "0 0 14px rgba(255,85,0,0.55)"
                : undefined,
            }}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   WLPills — recent results as colored squares. results[0] is newest.
   "1" = win (green), "0" = loss (red). Renders up to `max`.
   ────────────────────────────────────────────────────────────────── */
export function WLPills({
  results,
  max = 10,
}: {
  results: string[];
  max?: number;
}) {
  if (!results.length) return null;
  // FACEIT order is newest-first; show oldest on the left so reading L→R
  // matches the natural timeline.
  const items = [...results.slice(0, max)].reverse();
  return (
    <div className="flex w-full items-center justify-between gap-1">
      {items.map((r, i) => {
        const win = r === "1";
        return (
          <span
            key={i}
            className={`grid h-9 flex-1 place-items-center rounded-md text-xs font-black tracking-widest ${
              win
                ? "bg-emerald-400/90 text-emerald-950"
                : "bg-rose-400/90 text-rose-950"
            }`}
            style={{
              animation: "pop 380ms cubic-bezier(0.16, 1, 0.3, 1) both",
              animationDelay: `${120 + i * 60}ms`,
            }}
            aria-label={win ? "win" : "loss"}
          >
            {win ? "W" : "L"}
          </span>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SplitBar — wins vs losses share-of-total. Animates from center.
   ────────────────────────────────────────────────────────────────── */
export function SplitBar({
  wins,
  losses,
}: {
  wins: number;
  losses: number;
}) {
  const total = Math.max(1, wins + losses);
  const winPct = (wins / total) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="bar-fill h-full bg-emerald-400/90"
          style={{ width: `${winPct}%` }}
        />
        <div
          className="bar-fill h-full bg-rose-400/80"
          style={{
            width: `${100 - winPct}%`,
            animationDelay: "320ms",
          }}
        />
      </div>
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/65">
        <span className="text-emerald-300">
          {new Intl.NumberFormat("en-US").format(wins)} W
        </span>
        <span className="text-rose-300">
          {new Intl.NumberFormat("en-US").format(losses)} L
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Crosshair — tiny aim-icon for the headshot slide.
   ────────────────────────────────────────────────────────────────── */
export function Crosshair({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className="text-white/85"
    >
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <path
        d="M32 4v14M32 46v14M4 32h14M46 32h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
