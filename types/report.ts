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
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  kd: number;
  hs: number;
  longestWinStreak: number;
  currentWinStreak: number;
  recentLossStreak: number;
  recentWinStreak: number;
  favoriteMap: MapStat | null;
  worstMap: MapStat | null;
  bestMap: MapStat | null;
}

export type SlideId =
  | "intro"
  | "level"
  | "matches"
  | "kd"
  | "winrate"
  | "hs"
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
  };
  raw: NormalizedStats;
  slides: Slide[];
  shareLine: string;
}
