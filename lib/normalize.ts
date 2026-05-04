import type { FaceitLifetimeStats, FaceitPlayer } from "./faceit";
import type { MapStat, NormalizedStats, SkillLevel } from "@/types/report";

/**
 * Tolerant normalizer.
 *
 * The FACEIT API returns lifetime stats as STRINGS keyed by human labels
 * (e.g. "Average K/D Ratio", "Win Rate %"). Labels also drift between
 * games and have changed over the years for CSGO → CS2. We try a list of
 * likely keys and coerce, falling back to 0 if nothing matches. Never
 * throw — if data is missing, the report should still render.
 */

const num = (v: unknown, fallback = 0): number => {
  if (v === null || v === undefined || v === "") return fallback;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const pickKey = (
  obj: Record<string, unknown> | undefined,
  keys: string[],
): unknown => {
  if (!obj) return undefined;
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return undefined;
};

const clampSkillLevel = (n: number): SkillLevel => {
  if (n < 0) return 0;
  if (n > 10) return 10;
  return Math.round(n) as SkillLevel;
};

function mapStatFromSegment(seg: {
  label?: string;
  stats?: Record<string, unknown>;
}): MapStat {
  const s = seg.stats ?? {};
  return {
    name: seg.label ?? "—",
    matches: num(pickKey(s, ["Matches", "matches"])),
    winRate: num(pickKey(s, ["Win Rate %", "Win Rate", "winRate"])),
    kd: num(pickKey(s, ["Average K/D Ratio", "K/D Ratio"])),
  };
}

/** Turn ["1","0","1","0","0"] into a consecutive count from the most recent. */
function streakFrom(results: unknown, target: "1" | "0"): number {
  if (!Array.isArray(results)) return 0;
  let count = 0;
  // FACEIT returns "Recent Results" newest-first.
  for (const r of results) {
    if (String(r) === target) count++;
    else break;
  }
  return count;
}

export function normalize(
  player: FaceitPlayer,
  stats: FaceitLifetimeStats,
): NormalizedStats {
  const lifetime = (stats.lifetime ?? {}) as Record<string, unknown>;
  const segments = stats.segments ?? [];

  const matches = num(pickKey(lifetime, ["Matches", "matches"]));
  const wins = num(pickKey(lifetime, ["Wins", "wins"]));
  const winRate = num(
    pickKey(lifetime, ["Win Rate %", "Win Rate", "winRate"]),
  );
  const kd = num(
    pickKey(lifetime, [
      "Average K/D Ratio",
      "K/D Ratio",
      "Average K/D",
      "kd",
    ]),
  );
  const hs = num(
    pickKey(lifetime, [
      "Average Headshots %",
      "Total Headshots %",
      "Headshots %",
    ]),
  );
  const longestWinStreak = num(pickKey(lifetime, ["Longest Win Streak"]));
  const currentWinStreak = num(pickKey(lifetime, ["Current Win Streak"]));
  const recent = lifetime["Recent Results"];
  const recentLossStreak = streakFrom(recent, "0");
  const recentWinStreak = streakFrom(recent, "1");
  const recentResults: string[] = Array.isArray(recent)
    ? recent.map((r) => (String(r) === "1" ? "1" : "0"))
    : [];

  // Map segments → 5v5 maps only (skip wingman/competitive variants).
  const mapSegments = segments.filter(
    (s) => (s.type ?? "").toLowerCase() === "map",
  );
  const maps = mapSegments
    .map(mapStatFromSegment)
    .filter((m) => m.matches > 0);

  let favoriteMap: MapStat | null = null;
  let bestMap: MapStat | null = null;
  let worstMap: MapStat | null = null;

  if (maps.length) {
    favoriteMap = [...maps].sort((a, b) => b.matches - a.matches)[0];
    // Only consider "best/worst" for maps with at least 5 plays so we don't
    // crown a 100% winrate on 1 match.
    const eligible = maps.filter((m) => m.matches >= 5);
    if (eligible.length) {
      bestMap = [...eligible].sort((a, b) => b.winRate - a.winRate)[0];
      worstMap = [...eligible].sort((a, b) => a.winRate - b.winRate)[0];
    }
  }

  const cs2 = player.games?.cs2;

  return {
    nickname: player.nickname,
    avatar: player.avatar?.length ? player.avatar : null,
    country: (player.country ?? "").toUpperCase(),
    region: cs2?.region ?? "—",
    skillLevel: clampSkillLevel(num(cs2?.skill_level)),
    elo: num(cs2?.faceit_elo),
    matches,
    wins,
    losses: Math.max(0, matches - wins),
    winRate,
    kd,
    hs,
    longestWinStreak,
    currentWinStreak,
    recentLossStreak,
    recentWinStreak,
    recentResults,
    favoriteMap,
    worstMap,
    bestMap,
  };
}
