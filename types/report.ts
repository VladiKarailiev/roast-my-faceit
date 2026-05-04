export type SkillLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface MapStat {
  name: string;
  matches: number;
  winRate: number;
  kd: number;
}

export interface NormalizedStats {
  nickname: string;
  avatar: string | null;
  country: string;
  region: string;
  skillLevel: SkillLevel;
  elo: number;
  /** Highest ELO observed in the recent N-match window. 0 if unknown. */
  peakElo: number;
  /** Lowest ELO observed in the same window. 0 if unknown. */
  lowElo: number;
  /** How many recent matches we sampled for peakElo (for honest labelling). */
  peakEloSampleSize: number;
  /** True when totalDeaths was derived from K/D rather than reported by FACEIT. */
  totalDeathsDerived: boolean;
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  kd: number;
  hs: number;
  /** Lifetime totals from FACEIT. 0 if FACEIT didn't return the field. */
  totalKills: number;
  totalDeaths: number;
  totalHeadshots: number;
  /** Multikills counted across the recent match-stats window. 0 if no data. */
  tripleKills: number;
  quadKills: number;
  pentaKills: number;
  /** How many recent matches we sampled multikills from. */
  multikillSampleSize: number;
  /** Best single-match kill count from the recent window. */
  mostKillsInMatch: number;
  longestWinStreak: number;
  currentWinStreak: number;
  recentLossStreak: number;
  recentWinStreak: number;
  /** "1" = win, "0" = loss. Newest first. May be empty. */
  recentResults: string[];
  favoriteMap: MapStat | null;
  worstMap: MapStat | null;
  bestMap: MapStat | null;
}

export type SlideId =
  | "intro"
  | "level"
  | "peak"
  | "matches"
  | "kills"
  | "kd"
  | "winrate"
  | "hs"
  | "multikill"
  | "streak"
  | "map"
  | "verdict";

export interface Slide {
  id: SlideId;
  eyebrow: string;
  title: string;
  bigStat?: string;
  subStat?: string;
  body: string;
  theme: SlideTheme;
}

export type SlideTheme =
  | "intro"
  | "cool"
  | "hot"
  | "danger"
  | "win"
  | "neutral"
  | "elite"
  | "tilt"
  | "verdict";

export interface Report {
  generatedAt: string;
  player: {
    nickname: string;
    avatar: string | null;
    country: string;
    region: string;
    skillLevel: SkillLevel;
    elo: number;
    peakElo: number;
    lowElo: number;
    peakEloSampleSize: number;
  };
  raw: NormalizedStats;
  slides: Slide[];
  shareLine: string;
}
