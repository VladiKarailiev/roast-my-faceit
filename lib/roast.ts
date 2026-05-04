import type {
  NormalizedStats,
  Report,
  Slide,
  SlideTheme,
} from "@/types/report";
import { tier } from "./tiers";
import { FALLBACK_LINE, TEMPLATES, fill } from "./templates";

/** Pick one item from an array. Falls back to a safe line if empty. */
function pick(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return FALLBACK_LINE;
  return arr[Math.floor(Math.random() * arr.length)];
}

function fmtNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function fmtKD(n: number): string {
  return n.toFixed(2);
}

function fmtPct(n: number): string {
  return `${Math.round(n)}%`;
}

/** Rough hours estimate at ~35 minutes per match. Honest enough for comedy. */
function approxHours(matches: number): number {
  return Math.max(1, Math.round((matches * 35) / 60));
}

function prettyMapName(label: string): string {
  if (!label.startsWith("de_")) return label;
  const base = label.slice(3);
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/** Mix in a map-specific zinger ~50% of the time when we have one. */
function mapLineFor(mapName: string): string {
  const specific = TEMPLATES.mapByName[mapName];
  if (specific && specific.length && Math.random() < 0.5) {
    return pick(specific);
  }
  return pick(TEMPLATES.map);
}

function themeForKD(t: ReturnType<typeof tier.kd>): SlideTheme {
  switch (t) {
    case "abysmal":
    case "rough":
      return "tilt";
    case "average":
      return "neutral";
    case "decent":
      return "cool";
    case "elite":
      return "elite";
    case "godlike":
      return "danger";
  }
}

function themeForWinRate(t: ReturnType<typeof tier.winRate>): SlideTheme {
  switch (t) {
    case "doomed":
    case "losing":
      return "tilt";
    case "even":
      return "neutral";
    case "winning":
      return "win";
    case "smurfing":
      return "elite";
  }
}

function themeForHS(t: ReturnType<typeof tier.hs>): SlideTheme {
  switch (t) {
    case "spray":
    case "low":
      return "tilt";
    case "mid":
      return "neutral";
    case "high":
      return "cool";
    case "aimgod":
      return "danger";
  }
}

function themeForStreak(t: ReturnType<typeof tier.streak>): SlideTheme {
  switch (t) {
    case "tilted":
    case "cold":
      return "tilt";
    case "warm":
      return "neutral";
    case "heater":
      return "win";
    case "biblical":
      return "elite";
  }
}

function shareLine(s: NormalizedStats): string {
  return `${s.nickname} • Lvl ${s.skillLevel} • ${fmtKD(s.kd)} K/D • ${fmtPct(s.winRate)} WR — got roasted on Roast My FACEIT`;
}

export function buildReport(s: NormalizedStats): Report {
  const slides: Slide[] = [];
  const baseVars = {
    nickname: s.nickname,
    country: s.country || "—",
    region: s.region,
    level: s.skillLevel,
    elo: s.elo,
  };

  // 1) INTRO
  slides.push({
    id: "intro",
    eyebrow: "Roast My FACEIT",
    title: s.nickname,
    bigStat: undefined,
    subStat: s.region ? `${s.region} • Level ${s.skillLevel}` : `Level ${s.skillLevel}`,
    body: fill(pick(TEMPLATES.intro), baseVars),
    theme: "intro",
  });

  // 2) LEVEL
  const levelLines = TEMPLATES.level[s.skillLevel] ?? TEMPLATES.level[0];
  slides.push({
    id: "level",
    eyebrow: "Skill Level",
    title: `Level ${s.skillLevel}`,
    bigStat: s.elo > 0 ? `${fmtNumber(s.elo)} ELO` : "Unranked",
    subStat: s.region,
    body: fill(pick(levelLines), baseVars),
    theme: s.skillLevel >= 9 ? "elite" : s.skillLevel >= 6 ? "cool" : s.skillLevel >= 3 ? "neutral" : "tilt",
  });

  // 2b) RECENT ELO RANGE (only if FACEIT actually returned per-match ELO)
  // Renamed from "peak" to be honest: this is the high/low across the
  // sampled window, NOT an all-time peak. We hide the slide entirely if
  // we can't see real movement (high === low === current means the API
  // didn't give us useful data and "peak X" would just lie).
  if (
    s.peakEloSampleSize >= 3 &&
    s.peakElo > 0 &&
    s.lowElo > 0 &&
    (s.peakElo > s.elo || s.lowElo < s.elo)
  ) {
    const delta = s.peakElo - s.elo;
    const peakTier = tier.peak(delta, s.peakElo);
    slides.push({
      id: "peak",
      eyebrow: `Last ${s.peakEloSampleSize} games`,
      title: "ELO swing",
      bigStat: `${fmtNumber(s.lowElo)} – ${fmtNumber(s.peakElo)}`,
      subStat: `now · ${fmtNumber(s.elo)}`,
      body: fill(pick(TEMPLATES.peak[peakTier]), {
        ...baseVars,
        // peakElo is the canonical variable used by templates.ts; high/low/swing
        // are kept as aliases in case anyone wants to write range-style lines.
        peakElo: fmtNumber(s.peakElo),
        high: fmtNumber(s.peakElo),
        low: fmtNumber(s.lowElo),
        currentElo: fmtNumber(s.elo),
        delta: fmtNumber(delta),
        sampleSize: s.peakEloSampleSize,
        swing: fmtNumber(s.peakElo - s.lowElo),
      }),
      theme:
        peakTier === "atPeak"
          ? "elite"
          : peakTier === "near"
            ? "cool"
            : peakTier === "ascending"
              ? "neutral"
              : "tilt",
    });
  }

  // ── If no CS2 matches, short-circuit to a ghost ending. ─────────────
  if (s.matches === 0) {
    slides.push({
      id: "matches",
      eyebrow: "Matches",
      title: "0 games",
      bigStat: "0",
      subStat: "ghost mode",
      body: pick(TEMPLATES.ghost),
      theme: "neutral",
    });
    slides.push({
      id: "verdict",
      eyebrow: "Verdict",
      title: "Untested",
      bigStat: undefined,
      subStat: undefined,
      body: fill(pick(TEMPLATES.verdict), { ...baseVars, kd: "0.00", winRate: "0" }),
      theme: "verdict",
    });
    return finalize(s, slides);
  }

  // 3) MATCHES
  const matchesTier = tier.matches(s.matches);
  slides.push({
    id: "matches",
    eyebrow: "Matches Played",
    title: "You sat down at the computer",
    bigStat: fmtNumber(s.matches),
    subStat: `${fmtNumber(s.wins)} W • ${fmtNumber(s.losses)} L`,
    body: fill(pick(TEMPLATES.matches[matchesTier]), {
      ...baseVars,
      matches: fmtNumber(s.matches),
      wins: fmtNumber(s.wins),
      losses: fmtNumber(s.losses),
      hours: fmtNumber(approxHours(s.matches)),
    }),
    theme: matchesTier === "nolife" ? "danger" : matchesTier === "grinder" ? "hot" : "neutral",
  });

  // 3b) TOTAL CAREER KILLS (only if FACEIT returned the lifetime field)
  if (s.totalKills > 0) {
    const killsTier = tier.kills(s.totalKills);
    const perMatch = s.matches > 0
      ? (s.totalKills / s.matches).toFixed(1)
      : "—";
    slides.push({
      id: "kills",
      eyebrow: "Lifetime Kills",
      title: "Receipts on receipts",
      bigStat: fmtNumber(s.totalKills),
      subStat: `${fmtNumber(s.totalDeaths)} deaths • ${perMatch}/match`,
      body: fill(pick(TEMPLATES.kills[killsTier]), {
        ...baseVars,
        totalKills: fmtNumber(s.totalKills),
        totalDeaths: fmtNumber(s.totalDeaths),
        perMatch,
        mostKills: s.mostKillsInMatch || "—",
      }),
      theme:
        killsTier === "psycho"
          ? "danger"
          : killsTier === "veteran"
            ? "hot"
            : killsTier === "casual"
              ? "neutral"
              : "cool",
    });
  }

  // 4) K/D
  const kdTier = tier.kd(s.kd);
  slides.push({
    id: "kd",
    eyebrow: "Average K/D",
    title: "The receipts",
    bigStat: fmtKD(s.kd),
    subStat: kdTier.toUpperCase(),
    body: fill(pick(TEMPLATES.kd[kdTier]), { ...baseVars, kd: fmtKD(s.kd) }),
    theme: themeForKD(kdTier),
  });

  // 5) WIN RATE
  const wrTier = tier.winRate(s.winRate);
  slides.push({
    id: "winrate",
    eyebrow: "Win Rate",
    title: "How often you actually win",
    bigStat: fmtPct(s.winRate),
    subStat: `${fmtNumber(s.wins)} of ${fmtNumber(s.matches)}`,
    body: fill(pick(TEMPLATES.winrate[wrTier]), {
      ...baseVars,
      winRate: Math.round(s.winRate),
      wins: fmtNumber(s.wins),
      losses: fmtNumber(s.losses),
      matches: fmtNumber(s.matches),
    }),
    theme: themeForWinRate(wrTier),
  });

  // 6) HEADSHOTS
  const hsTier = tier.hs(s.hs);
  slides.push({
    id: "hs",
    eyebrow: "Headshot %",
    title: "Aim, allegedly",
    bigStat: fmtPct(s.hs),
    subStat: hsTier.toUpperCase(),
    body: fill(pick(TEMPLATES.hs[hsTier]), { ...baseVars, hs: Math.round(s.hs) }),
    theme: themeForHS(hsTier),
  });

  // 6b) MULTIKILLS (over recent window)
  if (s.multikillSampleSize > 0) {
    const totalMK = s.tripleKills + s.quadKills + s.pentaKills;
    if (totalMK > 0) {
      const mkTier = tier.multikill(s.tripleKills, s.quadKills, s.pentaKills);
      slides.push({
        id: "multikill",
        eyebrow: `Multikills · last ${s.multikillSampleSize}`,
        title: "Highlight reel",
        bigStat: undefined,
        subStat: `${s.tripleKills}× 3K · ${s.quadKills}× 4K · ${s.pentaKills}× ACE`,
        body: fill(pick(TEMPLATES.multikill[mkTier]), {
          ...baseVars,
          triples: s.tripleKills,
          quads: s.quadKills,
          pentas: s.pentaKills,
          sampleSize: s.multikillSampleSize,
        }),
        theme:
          mkTier === "godmode"
            ? "elite"
            : mkTier === "menace"
              ? "danger"
              : mkTier === "spicy"
                ? "hot"
                : "neutral",
      });
    }
  }

  // 7) STREAK
  const streakTier = tier.streak(s.currentWinStreak, s.recentLossStreak);
  const streakBig =
    streakTier === "tilted" || streakTier === "cold"
      ? `${s.recentLossStreak}L`
      : streakTier === "warm"
        ? `${s.longestWinStreak}W max`
        : `${s.currentWinStreak}W`;
  slides.push({
    id: "streak",
    eyebrow: "Form",
    title:
      streakTier === "tilted" || streakTier === "cold"
        ? "Currently tilting"
        : streakTier === "warm"
          ? "Career-best streak"
          : "On fire",
    bigStat: streakBig,
    subStat: `Longest ever: ${s.longestWinStreak}W`,
    body: fill(pick(TEMPLATES.streak[streakTier]), {
      ...baseVars,
      currentWinStreak: s.currentWinStreak,
      longestWinStreak: s.longestWinStreak,
      recentLossStreak: s.recentLossStreak,
    }),
    theme: themeForStreak(streakTier),
  });

  // 8) MAP
  if (s.favoriteMap && s.favoriteMap.matches > 0) {
    const m = s.favoriteMap;
    slides.push({
      id: "map",
      eyebrow: "Most Played Map",
      title: prettyMapName(m.name),
      bigStat: prettyMapName(m.name),
      subStat: `${fmtNumber(m.matches)} games • ${fmtPct(m.winRate)} WR`,
      body: fill(mapLineFor(m.name), {
        ...baseVars,
        mapName: prettyMapName(m.name),
        mapMatches: fmtNumber(m.matches),
        mapWinRate: Math.round(m.winRate),
      }),
      theme: m.winRate >= 55 ? "win" : m.winRate < 45 ? "tilt" : "cool",
    });
  }

  // 9) VERDICT
  slides.push({
    id: "verdict",
    eyebrow: "Final Verdict",
    title: "Case closed",
    bigStat: undefined,
    subStat: `Lvl ${s.skillLevel} • ${fmtKD(s.kd)} K/D • ${fmtPct(s.winRate)} WR`,
    body: fill(pick(TEMPLATES.verdict), {
      ...baseVars,
      kd: fmtKD(s.kd),
      winRate: Math.round(s.winRate),
    }),
    theme: "verdict",
  });

  return finalize(s, slides);
}

function finalize(s: NormalizedStats, slides: Slide[]): Report {
  return {
    generatedAt: new Date().toISOString(),
    player: {
      nickname: s.nickname,
      avatar: s.avatar,
      country: s.country,
      region: s.region,
      skillLevel: s.skillLevel,
      elo: s.elo,
      peakElo: s.peakElo,
      lowElo: s.lowElo,
      peakEloSampleSize: s.peakEloSampleSize,
    },
    raw: s,
    slides,
    shareLine: shareLine(s),
  };
}
