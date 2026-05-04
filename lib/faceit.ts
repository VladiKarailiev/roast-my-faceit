/**
 * Minimal FACEIT Data API v4 client.
 *
 * Docs: https://docs.faceit.com/getting-started/Authentication/api-keys
 * Base: https://open.faceit.com/data/v4
 *
 * V1 makes only 2 requests per report generation:
 *   1) GET /players?nickname=...&game=cs2
 *   2) GET /players/{player_id}/stats/cs2
 *
 * The API key is read from process.env.FACEIT_API_KEY and must NEVER be
 * exposed to the client. Do not import this module from client components.
 */

const BASE = "https://open.faceit.com/data/v4";

// Cache responses on Vercel's data cache for 5 minutes — protects FACEIT
// rate limits if the same player gets shared and re-loaded.
const REVALIDATE_SECONDS = 300;

export class FaceitError extends Error {
  status: number;
  code: "not_found" | "auth" | "rate_limit" | "upstream" | "config";
  constructor(
    code: FaceitError["code"],
    message: string,
    status = 500,
  ) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function getKey(): string {
  const key = process.env.FACEIT_API_KEY;
  if (!key) {
    throw new FaceitError(
      "config",
      "FACEIT_API_KEY is not set. Add it to your environment variables.",
      500,
    );
  }
  return key;
}

async function faceitFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getKey()}`,
      Accept: "application/json",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (res.status === 404) {
    throw new FaceitError("not_found", "Player not found on FACEIT.", 404);
  }
  if (res.status === 401 || res.status === 403) {
    throw new FaceitError(
      "auth",
      "FACEIT rejected our credentials. Check FACEIT_API_KEY.",
      502,
    );
  }
  if (res.status === 429) {
    throw new FaceitError(
      "rate_limit",
      "We're being rate-limited by FACEIT. Try again in a minute.",
      429,
    );
  }
  if (!res.ok) {
    throw new FaceitError(
      "upstream",
      `FACEIT returned ${res.status}.`,
      502,
    );
  }
  return (await res.json()) as T;
}

// ---- Loose response shapes (we keep them permissive, normalize.ts is strict) ----

export interface FaceitPlayer {
  player_id: string;
  nickname: string;
  avatar?: string;
  country?: string;
  games?: {
    cs2?: {
      region?: string;
      skill_level?: number;
      faceit_elo?: number;
      game_player_id?: string;
      game_player_name?: string;
    };
  };
}

export interface FaceitLifetimeStats {
  player_id: string;
  game_id: string;
  lifetime?: Record<string, unknown>;
  segments?: Array<{
    label?: string;
    img_small?: string;
    img_regular?: string;
    type?: string;
    mode?: string;
    game_mode?: string;
    stats?: Record<string, unknown>;
  }>;
}

export interface FaceitMatchStats {
  items?: Array<{
    stats?: Record<string, unknown>;
    /** Match start in seconds since epoch (some payloads put it under stats too). */
    started_at?: number;
  }>;
}

// ---- Public API ----

export async function getPlayerByNickname(
  nickname: string,
): Promise<FaceitPlayer> {
  const q = encodeURIComponent(nickname);
  return faceitFetch<FaceitPlayer>(`/players?nickname=${q}&game=cs2`);
}

export async function getCs2LifetimeStats(
  playerId: string,
): Promise<FaceitLifetimeStats> {
  return faceitFetch<FaceitLifetimeStats>(`/players/${playerId}/stats/cs2`);
}

/**
 * Per-match stat rows for the last `limit` CS2 games. Used to extract a
 * recent peak ELO — FACEIT puts an "Elo" string on each row in the
 * current API. If the field is missing for older accounts we just
 * return `null` and the caller falls back to current ELO.
 */
export async function getCs2RecentMatchStats(
  playerId: string,
  limit = 50,
): Promise<FaceitMatchStats> {
  return faceitFetch<FaceitMatchStats>(
    `/players/${playerId}/games/cs2/stats?limit=${limit}`,
  );
}

export { isValidNickname } from "./validate";
