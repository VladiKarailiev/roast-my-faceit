/**
 *  ┌──────────────────────────────────────────────────────────────────┐
 *  │ ROAST TEMPLATES — edit freely.                                   │
 *  │                                                                  │
 *  │ Each entry is an array of strings. The report generator picks    │
 *  │ ONE at random per slide. If an array is empty, that slide will   │
 *  │ fall back to a generic line — so don't ship empty arrays.        │
 *  │                                                                  │
 *  │ Template variables: wrap names in double curlies: {{nickname}}.  │
 *  │ Available vars per category are listed above each block.         │
 *  │                                                                  │
 *  │ Tone guide: punchy, playful, self-aware. No slurs, no targeting  │
 *  │ identity, no real-world threats. We roast the STATS not the      │
 *  │ person. Comedy first.                                            │
 *  └──────────────────────────────────────────────────────────────────┘
 */

import type {
  KDTier,
  HSTier,
  MatchesTier,
  StreakTier,
  WinRateTier,
} from "./tiers";

type ByTier<T extends string> = Record<T, string[]>;

// ── INTRO ────────────────────────────────────────────────────────────
// Vars: nickname, country, region, level, elo
const intro: string[] = [
  "Pull up a chair, {{nickname}}. We've been waiting.",
  "Loading {{nickname}}'s receipts. Try to stay calm.",
  "FACEIT has spoken. {{nickname}}, brace for impact.",
  "We searched the database. We found pain.",
  "{{nickname}} from {{region}}. Population: regrets.",
  "We pulled your stats so you wouldn't have to.",
];

// ── SKILL LEVEL ──────────────────────────────────────────────────────
// Vars: level, elo, region
const level: Record<number, string[]> = {
  0: [
    "Skill level: zero. You haven't played enough for FACEIT to judge you. We will.",
    "Unranked. The cleanest slate you'll ever have.",
  ],
  1: [
    "Level 1. Bravely lonely at the bottom.",
    "Level 1 is FACEIT's way of saying \"have you considered chess?\"",
    "Level 1. Your placements were a hate crime.",
  ],
  2: [
    "Level 2. The participation trophy of CS2.",
    "Level 2. You exist. That's the news.",
    "Level 2 is a personality trait at this point.",
  ],
  3: [
    "Level 3. Not bad. Not good. Not memorable.",
    "Level 3 is where dreams go to take a nap.",
    "Level 3. You've watched more demos than you've played matches and it shows.",
  ],
  4: [
    "Level 4. Solidly average. Reliably so.",
    "Level 4. The DMV of skill levels.",
    "Level 4. You're the reason \"GG\" sounds sarcastic.",
  ],
  5: [
    "Level 5. The exact middle. We mean that mathematically.",
    "Level 5. Statistically, half the lobby is laughing at you.",
    "Level 5. Stuck. Beautiful. Resigned.",
  ],
  6: [
    "Level 6. Above average! Your mom would be proud if she knew what FACEIT was.",
    "Level 6. The \"actually pretty decent\" tier.",
    "Level 6. One bad week from level 5 forever.",
  ],
  7: [
    "Level 7. Respectable. Insufferable in voice chat.",
    "Level 7. You think you're carrying. The replay disagrees.",
    "Level 7. Where the \"I could've gone pro\" crowd lives.",
  ],
  8: [
    "Level 8. Genuinely good. Genuinely toxic.",
    "Level 8. You queue at 2am to dodge level 9s. We see you.",
    "Level 8 with {{elo}} ELO. Stuck pretending you're not.",
  ],
  9: [
    "Level 9. The rarefied air of \"almost.\"",
    "Level 9. Two bad games from level 8 again, forever.",
    "Level 9. Your aim is real. Your communication isn't.",
  ],
  10: [
    "Level 10 with {{elo}} ELO. You're either a god, boosted, or both. We'll let HR decide.",
    "Level 10. Touch grass. Or don't. We can't stop you.",
    "Level 10. Anti-cheat says hi.",
  ],
};

// ── MATCHES PLAYED ───────────────────────────────────────────────────
// Vars: matches, wins, losses, hours
const matches: ByTier<MatchesTier> = {
  rookie: [
    "{{matches}} matches. You haven't even started losing yet.",
    "{{matches}} matches in. Still in the honeymoon phase. Enjoy it.",
    "Only {{matches}} matches? The rest of us have suffered. Catch up.",
  ],
  casual: [
    "{{matches}} matches. Casual. Healthy. Embarrassing for a sweat-only platform.",
    "{{matches}} matches. About one nervous breakdown per 100. Totally normal.",
    "{{matches}} matches and {{losses}} of them ended in chat fights. Approximate.",
  ],
  grinder: [
    "{{matches}} matches. That's roughly {{hours}} hours of \"one more game.\"",
    "{{matches}} matches. Your dentist sees you less than your queue.",
    "{{matches}} matches. The Stanford Prison Experiment ran shorter.",
  ],
  nolife: [
    "{{matches}} matches. We're calling someone.",
    "{{matches}} matches. You have a CS2 problem and a CS2 community that's enabling you.",
    "{{matches}} matches. Touch grass. Specifically: dust2's grass doesn't count.",
  ],
};

// ── K/D RATIO ────────────────────────────────────────────────────────
// Vars: kd
const kd: ByTier<KDTier> = {
  abysmal: [
    "K/D of {{kd}}. The bots in offline mode are sweating less.",
    "K/D of {{kd}}. Statistically, you are the disadvantage.",
    "K/D of {{kd}}. Even the smokes flash you.",
  ],
  rough: [
    "K/D of {{kd}}. Your team plays 4v5 and doesn't tell you.",
    "K/D of {{kd}}. Aim is loading. Please wait. Forever.",
    "K/D of {{kd}}. Have you considered the support role? In a different game?",
  ],
  average: [
    "K/D of {{kd}}. Reliably mediocre. Your queue thanks you.",
    "K/D of {{kd}}. The exact statistical definition of \"meh.\"",
    "K/D of {{kd}}. You contribute. The way a bench warmer contributes.",
  ],
  decent: [
    "K/D of {{kd}}. Comfortably above your skill bracket. Fix that.",
    "K/D of {{kd}}. You frag. You also int. It balances out.",
    "K/D of {{kd}}. The team carries you less than you think.",
  ],
  elite: [
    "K/D of {{kd}}. Suspicious in a flattering way.",
    "K/D of {{kd}}. The \"why is this guy in our lobby\" tier.",
    "K/D of {{kd}}. Real, allegedly.",
  ],
  godlike: [
    "K/D of {{kd}}. Anti-cheat is on its way.",
    "K/D of {{kd}}. We forwarded your stats to ESIC, just in case.",
    "K/D of {{kd}}. Either a smurf or a war crime.",
  ],
};

// ── WIN RATE ─────────────────────────────────────────────────────────
// Vars: winRate, wins, losses, matches
const winrate: ByTier<WinRateTier> = {
  doomed: [
    "{{winRate}}% win rate. Negative IQ. Possibly cursed.",
    "{{winRate}}% win rate. Are you... okay? Blink twice.",
    "{{winRate}}% win rate. {{losses}} losses is a lifestyle, not a stat.",
  ],
  losing: [
    "{{winRate}}% win rate. The \"it's the team\" arc.",
    "{{winRate}}% win rate. You lose more than you win, but with style.",
    "{{winRate}}% win rate. Coinflip's evil twin.",
  ],
  even: [
    "{{winRate}}% win rate. The exact definition of running in place.",
    "{{winRate}}% win rate. Win one, lose one, queue again. Beautiful.",
    "{{winRate}}% win rate. Sisyphus would understand.",
  ],
  winning: [
    "{{winRate}}% win rate. Quietly carrying. Loudly complaining.",
    "{{winRate}}% win rate. The \"I climb when I queue alone\" mythos lives.",
    "{{winRate}}% win rate. Respect.",
  ],
  smurfing: [
    "{{winRate}}% win rate. We've alerted the authorities.",
    "{{winRate}}% win rate. The other team's parents miss them.",
    "{{winRate}}% win rate. Either a smurf or a deal with something dark.",
  ],
};

// ── HEADSHOT % ───────────────────────────────────────────────────────
// Vars: hs
const hs: ByTier<HSTier> = {
  spray: [
    "{{hs}}% headshots. You shoot the floor and call it macro.",
    "{{hs}}% headshots. The wall behind your enemy never had a chance.",
    "{{hs}}% headshots. Spray-and-pray, mostly pray.",
  ],
  low: [
    "{{hs}}% headshots. Crosshair placement is a suggestion to you.",
    "{{hs}}% headshots. Body shots build character.",
    "{{hs}}% headshots. Rifle? More like riflower-back.",
  ],
  mid: [
    "{{hs}}% headshots. Average aim, average rage.",
    "{{hs}}% headshots. You're hitting heads. Sometimes. With effort.",
    "{{hs}}% headshots. The aim training works. A little.",
  ],
  high: [
    "{{hs}}% headshots. Crosshair placement is real and you have it.",
    "{{hs}}% headshots. Genuinely scary. To level 4s.",
    "{{hs}}% headshots. Your deathmatch hours show.",
  ],
  aimgod: [
    "{{hs}}% headshots. Anti-cheat sweating in slow motion.",
    "{{hs}}% headshots. Either elite, alien, or both.",
    "{{hs}}% headshots. Send a demo. We'll watch in disbelief.",
  ],
};

// ── STREAK ───────────────────────────────────────────────────────────
// Vars: currentWinStreak, longestWinStreak, recentLossStreak
const streak: ByTier<StreakTier> = {
  tilted: [
    "{{recentLossStreak}} losses in a row. Step away from the keyboard. Slowly.",
    "{{recentLossStreak}} straight Ls. Your mouse is filing a restraining order.",
    "{{recentLossStreak}} losses deep. \"One more game\" is now a cry for help.",
  ],
  cold: [
    "{{recentLossStreak}} L's in a row. Cold streak. Probably the team. Probably.",
    "Currently {{recentLossStreak}} losses deep. Mid-tilt. Highly recommended you log off.",
    "{{recentLossStreak}} losses straight. The classic \"just one more\" trap.",
  ],
  warm: [
    "Longest win streak: {{longestWinStreak}}. Modest. We respect modest.",
    "Best streak ever: {{longestWinStreak}} wins. Not bad. Not good. Yours.",
    "{{longestWinStreak}} wins is your ceiling. The vibes are average.",
  ],
  heater: [
    "{{currentWinStreak}} wins in a row. Right now. We're watching.",
    "Currently on a {{currentWinStreak}}-win heater. Don't queue another, you'll lose it.",
    "{{currentWinStreak}}-game win streak. Touch grass before the universe corrects this.",
  ],
  biblical: [
    "{{currentWinStreak}} wins on a row. Stop now. The math will catch up.",
    "{{currentWinStreak}}-game win streak. Statistically suspicious. We love it.",
    "{{currentWinStreak}} straight wins. Your luck has loaned you a future loss streak.",
  ],
};

// ── FAVORITE MAP ─────────────────────────────────────────────────────
// Vars: mapName, mapMatches, mapWinRate
const map: string[] = [
  "Most-played map: {{mapName}}. {{mapMatches}} matches. {{mapWinRate}}% wins. A toxic relationship.",
  "{{mapName}} {{mapMatches}} times. You don't love it. You just know the smokes.",
  "{{mapName}}, {{mapWinRate}}% win rate over {{mapMatches}} games. Stockholm syndrome speedrun.",
  "You queue {{mapName}} like it owes you money.",
  "{{mapName}}: your home, your prison, your {{mapWinRate}}% comfort zone.",
];

// Map-specific zingers (optional bonus). Picked sometimes instead of generic.
const mapByName: Record<string, string[]> = {
  de_dust2: [
    "Dust 2. The Olive Garden of CS maps. Familiar. Mid. Loved anyway.",
    "Dust 2 mains have one personality and we can hear it through the mic.",
  ],
  de_mirage: [
    "Mirage. The map you queue when you don't want to think. Mission accomplished.",
    "Mirage main detected. Still smoking the same window every time.",
  ],
  de_inferno: [
    "Inferno. The map where banana takes years off your lifespan.",
    "Inferno enjoyer. You like pain in long, narrow corridors.",
  ],
  de_nuke: [
    "Nuke main. You enjoy violence in vertical form. Concerning.",
    "Nuke. The map where ramp room takes therapy to recover from.",
  ],
  de_anubis: [
    "Anubis. You picked the new map and we respect the recklessness.",
    "Anubis main. Brave. We'd say bold but it's mostly brave.",
  ],
  de_overpass: [
    "Overpass. You enjoy long matches and longer arguments about \"connector.\"",
  ],
  de_ancient: [
    "Ancient. The map nobody asked for, and you main it. Iconic.",
  ],
  de_vertigo: [
    "Vertigo. The map you queue to lose friends. Bold strategy.",
    "Vertigo. Your psychiatrist hears about this map by name.",
  ],
  de_train: [
    "Train. A relic. Like you, in spirit.",
  ],
};

// ── VERDICT ──────────────────────────────────────────────────────────
// Vars: nickname, level, elo, kd, winRate
const verdict: string[] = [
  "Verdict: {{nickname}} plays CS2 the way most people pay taxes. Reluctantly. Loudly.",
  "Final ruling: {{nickname}}, level {{level}}, {{kd}} K/D. The system works.",
  "We've seen the numbers. We're not mad. Just disappointed. Mostly mad.",
  "{{nickname}}: certified human. Statistically correct. Spiritually questionable.",
  "Conclusion: ELO {{elo}} and rising. Or falling. Probably both.",
  "Closing thoughts: at least your nickname is funny.",
];

// ── ZERO-MATCHES SPECIAL CASE ────────────────────────────────────────
const ghost: string[] = [
  "Zero CS2 matches. A blank canvas. A ghost. A liability.",
  "No matches found. We salute the unsmurfable purity.",
  "0 games played. The most peaceful FACEIT account in history.",
];

export const TEMPLATES = {
  intro,
  level,
  matches,
  kd,
  winrate,
  hs,
  streak,
  map,
  mapByName,
  verdict,
  ghost,
};

// Generic fallback line — used if any tier array above is accidentally empty.
export const FALLBACK_LINE = "Statistically: a player. Comedically: tragic.";

/**
 * Tiny variable substitution. Unknown vars resolve to "—" so missing
 * data looks intentional, not broken.
 */
export function fill(
  template: string,
  vars: Record<string, string | number | null | undefined>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    const v = vars[k];
    if (v === null || v === undefined || v === "") return "—";
    return String(v);
  });
}
