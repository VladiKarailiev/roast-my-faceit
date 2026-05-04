"use client";

import type { NormalizedStats, Slide as SlideT } from "@/types/report";
import {
  BarMeter,
  Counter,
  Crosshair,
  GhostBackdrop,
  LevelBars,
  PlayerChip,
  RingProgress,
  SplitBar,
  TierBadge,
  WLPills,
} from "./slide-parts";

interface Props {
  slide: SlideT;
  index: number;
  total: number;
  raw: NormalizedStats;
  player: {
    nickname: string;
    avatar: string | null;
    country: string;
    region: string;
    skillLevel: number;
    elo: number;
  };
}

const fmtN = (n: number) => new Intl.NumberFormat("en-US").format(n);

const prettyMap = (label: string) =>
  label.startsWith("de_")
    ? label.slice(3).charAt(0).toUpperCase() + label.slice(4)
    : label;

const levelMood = (lvl: number) =>
  lvl >= 9 ? "Top of the food chain" :
  lvl >= 7 ? "Genuinely respectable" :
  lvl >= 5 ? "Statistically average" :
  lvl >= 3 ? "Climbing slowly" :
  "Fresh meat";

const kdMood = (kd: number) =>
  kd >= 1.6 ? "Suspicious" :
  kd >= 1.3 ? "Elite" :
  kd >= 1.1 ? "Decent" :
  kd >= 0.9 ? "Average" :
  kd >= 0.7 ? "Rough" : "Abysmal";

const wrMood = (wr: number) =>
  wr >= 60 ? "Smurfing" :
  wr >= 53 ? "Winning" :
  wr >= 48 ? "Coinflip" :
  wr >= 35 ? "Losing" : "Doomed";

const hsMood = (hs: number) =>
  hs >= 60 ? "Aim god" :
  hs >= 50 ? "Sharp" :
  hs >= 40 ? "Average" :
  hs >= 30 ? "Body shots" : "Spray and pray";

export default function Slide({
  slide,
  index,
  total,
  raw,
  player,
}: Props) {
  return (
    <section
      key={slide.id + index}
      data-theme={slide.theme}
      className="slide-enter relative flex min-h-[100dvh] flex-col overflow-hidden px-6 pt-20 pb-32"
    >
      {/* Ambient layers (z-0) */}
      {renderGhost(slide.id, raw)}
      <div className="scanlines" aria-hidden />

      {/* Persistent header (z-10) */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/65">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
          {slide.eyebrow}
        </div>
        <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/65 backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Player chip on every slide except the intro (where we feature it big) */}
      {slide.id !== "intro" && (
        <div className="relative z-10 mt-3">
          <PlayerChip
            nickname={player.nickname}
            avatar={player.avatar}
            region={player.region}
            level={player.skillLevel}
          />
        </div>
      )}

      {/* Hero — different per slide */}
      <div className="relative z-10 mt-auto flex flex-col gap-6">
        {renderHero(slide, raw, player)}
        <p className="fluid-body max-w-prose text-balance text-white/95">
          {slide.body}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Ghost backdrop content per slide. Big faded glyph that fills the
   empty space behind the hero.
   ───────────────────────────────────────────────────────────────── */
function renderGhost(id: SlideT["id"], raw: NormalizedStats): React.ReactNode {
  switch (id) {
    case "intro":
      return <GhostBackdrop>FACEIT</GhostBackdrop>;
    case "level":
      return <GhostBackdrop>{raw.skillLevel || "—"}</GhostBackdrop>;
    case "matches":
      return <GhostBackdrop>{fmtN(raw.matches)}</GhostBackdrop>;
    case "kd":
      return <GhostBackdrop>{raw.kd.toFixed(2)}</GhostBackdrop>;
    case "winrate":
      return <GhostBackdrop>{Math.round(raw.winRate)}%</GhostBackdrop>;
    case "hs":
      return <GhostBackdrop>{Math.round(raw.hs)}%</GhostBackdrop>;
    case "streak": {
      const big = Math.max(
        raw.currentWinStreak,
        raw.longestWinStreak,
        raw.recentLossStreak,
      );
      const tag = raw.recentLossStreak >= 2 ? "L" : "W";
      return <GhostBackdrop>{`${big}${tag}`}</GhostBackdrop>;
    }
    case "map":
      return (
        <GhostBackdrop>
          {raw.favoriteMap ? prettyMap(raw.favoriteMap.name) : "—"}
        </GhostBackdrop>
      );
    case "verdict":
      return <GhostBackdrop>{raw.nickname}</GhostBackdrop>;
    default:
      return null;
  }
}

/* ─────────────────────────────────────────────────────────────────
   Hero per slide — the visualization + headline numbers.
   ───────────────────────────────────────────────────────────────── */
function renderHero(
  slide: SlideT,
  raw: NormalizedStats,
  player: Props["player"],
): React.ReactNode {
  switch (slide.id) {
    case "intro":
      return <IntroHero raw={raw} player={player} />;
    case "level":
      return <LevelHero raw={raw} />;
    case "matches":
      return <MatchesHero raw={raw} />;
    case "kd":
      return <KDHero raw={raw} />;
    case "winrate":
      return <WinRateHero raw={raw} />;
    case "hs":
      return <HSHero raw={raw} />;
    case "streak":
      return <StreakHero raw={raw} />;
    case "map":
      return <MapHero raw={raw} />;
    case "verdict":
      return <VerdictHero raw={raw} player={player} />;
    default:
      return null;
  }
}

/* ── Per-slide heroes ───────────────────────────────────────────── */

function IntroHero({
  raw,
  player,
}: {
  raw: NormalizedStats;
  player: Props["player"];
}) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div
        className="grid h-28 w-28 place-items-center overflow-hidden rounded-full border-2 border-white/30 bg-black/40 shadow-[0_0_50px_rgba(255,85,0,0.45)]"
        style={{ animation: "pop 600ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        {player.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={player.avatar}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-2xl font-black uppercase text-white/80">
            {player.nickname.slice(0, 2)}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
          Roast edition · 2026
        </p>
        <h1 className="fluid-display max-w-full break-words text-balance">
          {player.nickname}
        </h1>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
          {player.region} · Level {player.skillLevel}
          {raw.elo > 0 && ` · ${fmtN(raw.elo)} ELO`}
        </p>
      </div>
    </div>
  );
}

function LevelHero({ raw }: { raw: NormalizedStats }) {
  return (
    <div className="flex flex-col gap-5">
      <LevelBars level={raw.skillLevel} />
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
            Skill level
          </span>
          <span className="fluid-display leading-none">
            <Counter to={raw.skillLevel} />
          </span>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
            Elo
          </span>
          <span className="text-3xl font-black tabular-nums">
            {raw.elo > 0 ? <Counter to={raw.elo} /> : "—"}
          </span>
        </div>
      </div>
      <TierBadge>{levelMood(raw.skillLevel)}</TierBadge>
    </div>
  );
}

function MatchesHero({ raw }: { raw: NormalizedStats }) {
  const hours = Math.max(1, Math.round((raw.matches * 35) / 60));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3">
        <span className="fluid-display leading-none">
          <Counter to={raw.matches} duration={1100} />
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/65">
          matches
        </span>
      </div>
      <SplitBar wins={raw.wins} losses={raw.losses} />
      <div className="flex flex-wrap items-center gap-2">
        <TierBadge>≈ {fmtN(hours)} hrs in-game</TierBadge>
      </div>
    </div>
  );
}

function KDHero({ raw }: { raw: NormalizedStats }) {
  // Map K/D into a 0–100 scale across 0.5 → 2.0 for the visual bar.
  const pos = Math.max(0, Math.min(100, ((raw.kd - 0.5) / 1.5) * 100));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-3">
        <span className="fluid-display leading-none">
          <Counter to={raw.kd} decimals={2} duration={1000} />
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/65">
          K/D
        </span>
      </div>

      {/* Number-line meter from 0.5 to 2.0 with a 1.0 average tick */}
      <div className="flex flex-col gap-2">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="bar-fill h-full bg-[var(--color-faceit)]"
            style={{ width: `${pos}%` }}
          />
          {/* 1.00 average mark */}
          <div
            className="pointer-events-none absolute top-0 h-full w-px bg-white/45"
            style={{ left: `${((1.0 - 0.5) / 1.5) * 100}%` }}
            aria-hidden
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/45">
          <span>0.5</span>
          <span>avg 1.0</span>
          <span>2.0</span>
        </div>
      </div>
      <TierBadge>{kdMood(raw.kd)}</TierBadge>
    </div>
  );
}

function WinRateHero({ raw }: { raw: NormalizedStats }) {
  const tone = raw.winRate >= 53 ? "win" : raw.winRate < 48 ? "tilt" : "white";
  return (
    <div className="flex flex-col items-center gap-5">
      <RingProgress value={Math.round(raw.winRate)} tone={tone} label="win rate" />
      <div className="w-full text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/70">
          {fmtN(raw.wins)} W · {fmtN(raw.losses)} L · {fmtN(raw.matches)} total
        </p>
      </div>
      <TierBadge>{wrMood(raw.winRate)}</TierBadge>
    </div>
  );
}

function HSHero({ raw }: { raw: NormalizedStats }) {
  const tone = raw.hs >= 50 ? "faceit" : raw.hs >= 40 ? "white" : "tilt";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <Crosshair size={56} />
        <div className="flex items-baseline gap-2">
          <span className="fluid-display leading-none">
            <Counter to={Math.round(raw.hs)} suffix="%" />
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/65">
            headshots
          </span>
        </div>
      </div>
      <BarMeter value={raw.hs} tone={tone} label="ZERO" rightLabel="100%" />
      <TierBadge>{hsMood(raw.hs)}</TierBadge>
    </div>
  );
}

function StreakHero({ raw }: { raw: NormalizedStats }) {
  const tilted = raw.recentLossStreak >= 2;
  const headline = tilted
    ? `${raw.recentLossStreak}L`
    : `${Math.max(raw.currentWinStreak, raw.longestWinStreak)}W`;
  const subline = tilted ? "current losing streak" : "best run on record";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-col">
          <span
            className={`fluid-display leading-none ${tilted ? "text-rose-300" : "text-emerald-300"}`}
          >
            {headline}
          </span>
          <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
            {subline}
          </span>
        </div>
        <div className="flex flex-col items-end text-right text-xs uppercase tracking-widest text-white/60">
          <span>longest win</span>
          <span className="text-2xl font-black tabular-nums text-white">
            {raw.longestWinStreak}
          </span>
        </div>
      </div>
      {raw.recentResults.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            Last {Math.min(raw.recentResults.length, 10)} matches (left = oldest)
          </span>
          <WLPills results={raw.recentResults} max={10} />
        </div>
      )}
      <TierBadge>{tilted ? "Cold streak" : "On form"}</TierBadge>
    </div>
  );
}

function MapHero({ raw }: { raw: NormalizedStats }) {
  if (!raw.favoriteMap) {
    return (
      <div className="flex flex-col gap-3">
        <span className="fluid-display leading-none">No map data</span>
        <TierBadge>Mystery player</TierBadge>
      </div>
    );
  }
  const m = raw.favoriteMap;
  const tone = m.winRate >= 55 ? "win" : m.winRate < 45 ? "tilt" : "white";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
          Most-played map
        </span>
        <span className="fluid-display leading-none">{prettyMap(m.name)}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            Matches
          </p>
          <p className="text-2xl font-black tabular-nums">
            <Counter to={m.matches} />
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            Win rate
          </p>
          <p className="text-2xl font-black tabular-nums">
            <Counter to={Math.round(m.winRate)} suffix="%" />
          </p>
        </div>
      </div>
      <BarMeter
        value={m.winRate}
        tone={tone}
        label="0%"
        rightLabel="100%"
      />
      <TierBadge>
        {m.winRate >= 55
          ? "Comfort pick"
          : m.winRate < 45
            ? "Toxic relationship"
            : "Stockholm syndrome"}
      </TierBadge>
    </div>
  );
}

function VerdictHero({
  raw,
  player,
}: {
  raw: NormalizedStats;
  player: Props["player"];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="verdict-stamp">Verdict</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
          Case closed
        </span>
      </div>
      <h2 className="fluid-display leading-none">{player.nickname}</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatCell label="Level" value={`${player.skillLevel}`} />
        <StatCell label="Elo" value={raw.elo > 0 ? fmtN(raw.elo) : "—"} />
        <StatCell label="K/D" value={raw.kd.toFixed(2)} />
        <StatCell label="WR" value={`${Math.round(raw.winRate)}%`} />
      </div>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="text-xl font-black tabular-nums">{value}</p>
    </div>
  );
}
