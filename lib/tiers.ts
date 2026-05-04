/**
 * Tier classification — given a stat value, return a tier label.
 * The roast templates use these labels to pick which line to show.
 *
 * If you change a threshold here, update the matching list in templates.ts.
 */

export type MatchesTier = "rookie" | "casual" | "grinder" | "nolife";
export type KDTier = "abysmal" | "rough" | "average" | "decent" | "elite" | "godlike";
export type WinRateTier = "doomed" | "losing" | "even" | "winning" | "smurfing";
export type HSTier = "spray" | "low" | "mid" | "high" | "aimgod";
export type StreakTier = "tilted" | "cold" | "warm" | "heater" | "biblical";
export type KillsTier = "minor" | "casual" | "veteran" | "psycho";
export type MultikillTier = "tame" | "spicy" | "menace" | "godmode";
export type PeakTier = "atPeak" | "near" | "ascending" | "fallen";

export const tier = {
  matches(n: number): MatchesTier {
    if (n < 50) return "rookie";
    if (n < 500) return "casual";
    if (n < 2000) return "grinder";
    return "nolife";
  },
  kd(n: number): KDTier {
    if (n < 0.7) return "abysmal";
    if (n < 0.9) return "rough";
    if (n < 1.1) return "average";
    if (n < 1.3) return "decent";
    if (n < 1.6) return "elite";
    return "godlike";
  },
  winRate(n: number): WinRateTier {
    if (n < 35) return "doomed";
    if (n < 48) return "losing";
    if (n < 53) return "even";
    if (n < 60) return "winning";
    return "smurfing";
  },
  hs(n: number): HSTier {
    if (n < 30) return "spray";
    if (n < 40) return "low";
    if (n < 50) return "mid";
    if (n < 60) return "high";
    return "aimgod";
  },
  streak(currentWin: number, recentLoss: number): StreakTier {
    if (recentLoss >= 5) return "tilted";
    if (recentLoss >= 2) return "cold";
    if (currentWin <= 1) return "warm";
    if (currentWin < 5) return "heater";
    return "biblical";
  },
  kills(totalKills: number): KillsTier {
    if (totalKills < 1000) return "minor";
    if (totalKills < 10000) return "casual";
    if (totalKills < 50000) return "veteran";
    return "psycho";
  },
  /** Combined "highlight reel score" weighting aces > quads > triples. */
  multikill(triples: number, quads: number, pentas: number): MultikillTier {
    const score = triples + quads * 3 + pentas * 10;
    if (score < 5) return "tame";
    if (score < 25) return "spicy";
    if (score < 75) return "menace";
    return "godmode";
  },
  /**
   * Where the player sits relative to their recent peak.
   * `delta` = peakElo - currentElo (always >= 0).
   */
  peak(delta: number, peakElo: number): PeakTier {
    if (peakElo === 0) return "atPeak";
    if (delta === 0) return "atPeak";
    if (delta < 25) return "near";
    if (delta < 100) return "ascending";
    return "fallen";
  },
};
