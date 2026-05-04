/**
 *  ┌──────────────────────────────────────────────────────────────────┐
 *  │ ROAST MY FACEIT — template bank.                                 │
 *  │                                                                  │
 *  │ Edit freely. The report generator picks ONE random line per      │
 *  │ slide. Keep arrays non-empty.                                    │
 *  │                                                                  │
 *  │ Template variables use double curlies: {{nickname}}.             │
 *  │                                                                  │
 *  │ Tone: aggressive, brainrot, dialed-up roast comedy.              │
 *  │ Low stats  → struggle / negative-aura roast.                     │
 *  │ Mid stats  → NPC / beige / mid roast.                            │
 *  │ High stats → sweat / ego / chronically-online roast.             │
 *  │                                                                  │
 *  │ Hard rules: no slurs, no identity attacks, no real threats.      │
 *  │ Roast the STATS and the LIFESTYLE, never the human underneath.   │
 *  │                                                                  │
 *  │ HONESTY RULES:                                                   │
 *  │   • peak and multikill come from a recent sample window.         │
 *  │     Mention {{sampleSize}} where relevant.                       │
 *  │   • kills, matches, kd, hs, winrate are lifetime stats.          │
 *  └──────────────────────────────────────────────────────────────────┘
 */

import type {
  KDTier,
  HSTier,
  KillsTier,
  MatchesTier,
  MultikillTier,
  PeakTier,
  StreakTier,
  WinRateTier,
} from "./tiers";

type ByTier<T extends string> = Record<T, string[]>;

// ── INTRO ────────────────────────────────────────────────────────────
// Vars: nickname, country, region, level, elo
const intro: string[] = [
  "{{nickname}}? in 2026? in this economy? unhinged behavior.",
  "FACEIT pulled {{nickname}}'s file. the file filed a restraining order.",
  "we're roasting {{nickname}} today. brace up. bro is COOKED.",
  "welcome to the autopsy, {{nickname}}. cause of death: 'one more queue'.",
  "{{nickname}} from {{region}}. {{region}} immediately denied involvement.",
  "loading {{nickname}}'s aura. the progress bar froze and sighed.",
  "{{nickname}} thought this was a stats site. it's an exposé.",
  "FACEIT said please be nice. we said skill issue.",
  "{{nickname}} pulled up like the lobby owes him something. the lobby owes him a hug.",
  "we opened {{nickname}}'s FACEIT stats and the browser asked if we were okay.",
  "{{nickname}} entered the site like the numbers were gonna defend him. bold.",
  "this report is brought to you by public data and private embarrassment.",
  "{{nickname}}'s public stats just leaked. by us. on purpose.",
];

// ── SKILL LEVEL ──────────────────────────────────────────────────────
// Vars: level, elo, region
const level: Record<number, string[]> = {
  0: [
    "unranked. schrödinger's player. simultaneously a bot and a bot.",
    "unranked. bro is still in the character creation screen.",
    "unranked aura with {{elo}} ELO of pure speculation.",
    "FACEIT hasn't ranked you yet. brave cope.",
  ],
  1: [
    "level 1. brother lives in the basement of the basement. the dirt is judging him.",
    "level 1 with {{elo}} ELO. negative rizz, negative crosshair placement, negative reason to queue.",
    "level 1. bro is not hardstuck, bro is furniture.",
    "level 1 with {{elo}} ELO. this isn't ranked, this is a controlled experiment.",
  ],
  2: [
    "level 2 with {{elo}} ELO. bro is speedrunning humility and still losing time.",
    "level 2. peak NPC dialogue. unscripted. unfunded. unwell.",
    "level 2. your executes look like five kids accidentally joined the server.",
    "level 2. lobby joins, lobby sighs, cycle repeats.",
  ],
  3: [
    "level 3. the 'I'm just chillin' guy who's been chilling in level 3 for four years.",
    "level 3. bro knows one Mirage smoke and legally cannot stop mentioning it.",
    "level 3. the only thing you trade consistently is blame.",
    "level 3. brain operating at TikTok 'For You' algorithm levels.",
  ],
  4: [
    "level 4. bro saves an AK like it's family property, then loses it next round peeking mid.",
    "level 4 with {{elo}} ELO. utility usage: decorative. confidence: maxed.",
    "level 4. bro screams 'I could be 7 if I tried'. bro can not try.",
    "level 4. you call 'rush B' and somehow arrive last.",
  ],
  5: [
    "level 5. perfectly mid. nothing special about you.",
    "level 5. dangerous in pistol round, useless from round 4 onward.",
    "level 5. patrick bateman of FACEIT. looks the part. fits in nowhere.",
  ],
  6: [
    "level 6. the rank where ego gets installed without consent.",
    "level 6 with {{elo}} ELO. bro thinks he's cracked. bro is room temperature.",
    "level 6. you finally learned utility and immediately became a lobby professor.",
    "level 6. you bait with enough confidence to make it look like a role.",
    "level 6. wins pistol round, dies first 12 times in a row. cinematic.",
  ],
  7: [
    "level 7. the 'I could go pro' guy. the pro is going to bed at 8pm.",
    "level 7. mechanically solid, but every round sounds like a family argument.",
    "level 7. bro CAN aim. bro CANNOT shut up.",
    "level 7 with {{elo}} ELO. you know lineups, but not when to stop talking.",
  ],
  8: [
    "level 8. aim is real. queue addiction is realer.",
    "level 8 with {{elo}} ELO. almost elite, fully unbearable.",
    "level 8. the aim is crisp, the post-round blame is crispier.",
    "level 8. so close to 9 every loss is a personality crisis.",
  ],
  9: [
    "level 9. the waiting room for guys saying 'I was 10 last week I swear'.",
    "level 9 with {{elo}} ELO. you're almost HIM. THAT is what makes it tragic.",
    "level 9. mechanically lethal, emotionally on 64 tick.",
    "level 9. bro types 'gg' before the match starts.",
    "level 9. you call defaults like a pro and react to mistakes like a FB marketplace comment section.",
  ],
  10: [
    "level 10. bro knows every smoke and still doesn't know the logout button.",
    "level 10. congrats, your social life has unfriended you.",
    "level 10. you didn't beat FACEIT. you became one of its hostages.",
    "level 10. cracked aim, cracked posture, cracked everything except work-life balance.",
  ],
};

// ── MATCHES PLAYED ───────────────────────────────────────────────────
// Vars: matches, wins, losses, hours
const matches: ByTier<MatchesTier> = {
  rookie: [
    "{{matches}} matches. bro still thinks warmup performance means something.",
    "{{matches}} matches. fresh account, already asking for AWP.",
    "{{matches}} matches. the queue button doesn't even ID you yet.",
  ],
  casual: [
    "{{matches}} matches. casual gamer aura with {{losses}} losses worth of evidence.",
    "{{matches}} matches. you visit FACEIT like an ex's instagram. concerning frequency.",
    "{{matches}} matches. hobby. problem. both. stop pretending it's healthy.",
    "{{matches}} matches with {{losses}} losses. attendance: perfect. lore: tragic.",
  ],
  grinder: [
    "{{matches}} matches. bro has spent more time in buy freeze than some people spend outside.",
    "{{matches}} matches. your chair has filed for an restraining order.",
    "{{matches}} matches. bro is chronically online. like, medically.",
    "{{matches}} matches. retired pros have shorter careers.",
  ],
  nolife: [
    "{{matches}} matches. this isn't a profile. it's an archaeological dig.",
    "{{matches}} matches. brother needs to call his mother. she's worried.",
    "{{matches}} matches. bro touched grass once. a long time ago.",
  ],
};

// ── K/D RATIO ────────────────────────────────────────────────────────
// Vars: kd
const kd: ByTier<KDTier> = {
  abysmal: [
    "K/D {{kd}}. negative aura, negative rizz, negative crosshair placement, negative everything.",
    "K/D {{kd}}. you're not playing CS2. you're providing free educational content for the enemy.",
    "K/D {{kd}}. bro entries like helmets are allergic to bullets.",
    "K/D {{kd}}. donating frags as a public service. selfless. catastrophic.",
    "K/D {{kd}}. you don't create space, you create highlight clips for strangers.",
  ],
  rough: [
    "K/D {{kd}}. almost trading. almost.",
    "K/D {{kd}}. bro swings like prefire is illegal.",
    "K/D {{kd}}. your death cam has more screen time than your crosshair.",
    "K/D {{kd}}. intent visible. impact is not found.",
    "K/D {{kd}}. bro doesn't bait teammates. bro IS the bait.",
    "K/D {{kd}}. one duel away from uninstalling. every single round.",
  ],
  average: [
    "K/D {{kd}}. mid in 4K. peak NPC behaviour.",
    "K/D {{kd}}. you exist in the server. that's it.",
    "K/D {{kd}}. not feeding. not carrying. just present, like air conditioning.",
  ],
  decent: [
    "K/D {{kd}}. you win duels and immediately overpeek like success offended you.",
    "K/D {{kd}}. solid numbers, suspicious confidence, deeply concerning ego.",
    "K/D {{kd}}. you carry rounds. you carry every argument afterward.",
    "K/D {{kd}}. dangerous. mostly to your own friend group.",
    "K/D {{kd}}. bro gets opening kills and then spends the round explaining them.",
    "K/D {{kd}}. bro is sigma in spreadsheets, beta in voice chat.",
  ],
  elite: [
    "K/D {{kd}}. you frag like a demon and still type 'team?' after one lost clutch.",
    "K/D {{kd}}. scoreboard says carry. the comms say public health advisory.",
    "K/D {{kd}}. bro is HIM. bro also hasn't slept since wednesday.",
    "K/D {{kd}}. bro drops 28 and still makes the lobby feel like uninstalling.",
  ],
  godlike: [
    "K/D {{kd}}. anti-cheat opening a new tab.",
    "K/D {{kd}}. the mousepad has filed for HR.",
    "K/D {{kd}}. bro doesn't take duels. bro repossesses confidence.",
  ],
};

// ── WIN RATE ─────────────────────────────────────────────────────────
// Vars: winRate, wins, losses, matches
const winrate: ByTier<WinRateTier> = {
  doomed: [
    "{{winRate}}% WR. bro loses pistol, force buys, then calls the team economy cooked.",
    "{{winRate}}% WR. you don't play matches. you beta-test disappointment.",
    "{{winRate}}% WR over {{matches}} games. the sample size is APOLOGIZING.",
    "{{winRate}}% WR. even 12-0 half-time would feel throwable in your hands.",
  ],
  losing: [
    "{{winRate}}% WR. the 'it's my team' documentary just got renewed.",
    "{{winRate}}% WR. less ladder, more treadmill against a wall.",
    "{{winRate}}% WR. the climb is theoretical. like a job application sent in 2019.",
    "{{winRate}}% WR. 'unlucky lobbies' is now your entire personality.",
  ],
  even: [
    "{{winRate}}% WR. you're not climbing. you're maintaining altitude in a broken elevator.",
    "{{winRate}}% WR. perfect treadmill energy. nothing else.",
    "{{winRate}}% WR. bro is a permanent guest.",
  ],
  winning: [
    "{{winRate}}% WR. winning enough to become delulu when you don't.",
    "{{winRate}}% WR. profile looks healthy. queue habit does not.",
  ],
  smurfing: [
    "{{winRate}}% WR. winning this much and still queueing is villain origin lore.",
    "{{winRate}}% WR. the opponents didn't queue. they entered a playable cutscene.",
    "{{winRate}}% WR. impressive. legally suspicious. spiritually concerning.",
  ],
};

// ── HEADSHOT % ───────────────────────────────────────────────────────
// Vars: hs
const hs: ByTier<HSTier> = {
  spray: [
    "{{hs}} HS%. crosshair placement: out of stock since 2020.",
    "{{hs}} HS%. the floor has taken more damage than helmets.",
    "{{hs}} HS%. you don't clear angles. you decorate them with bullets.",
    "{{hs}} HS%. your recoil pattern looks like someone drawing a route to B site.",
    "{{hs}} HS%. bro is the reason map walls have textures.",
  ],
  low: [
    "{{hs}} HS%. you aim like head level is paid DLC.",
    "{{hs}} HS%. helmets surviving with generational wealth.",
    "{{hs}} HS%. bro aims at the chest. the CHEST. consistently. on purpose.",
    "{{hs}} HS%. your crosshair lives at stomach height and pays rent there.",
  ],
  mid: [
    "{{hs}} HS%. average aim. premium ego.",
    "{{hs}} HS%. the crosshair visits head level on weekends.",
    "{{hs}} HS%. respectably mid. bullets occasionally consult google maps.",
    "{{hs}} HS%. mid aim with main character syndrome.",
  ],
  high: [
    "{{hs}} HS%. you hit heads then lose the round not finding the bomb. art.",
    "{{hs}} HS%. clean enough to be scary. sweaty enough to need ventilation.",
  ],
  aimgod: [
    "{{hs}} HS%. spectators type '???' more than callouts.",
    "{{hs}} HS%. enemies aren't dying. they're being edited out.",
    "{{hs}} HS%. enemy helmets file insurance claims.",
    "{{hs}} HS%. bro is HIM. unfortunately HIM is also him at 4am.",
  ],
};

// ── STREAK ───────────────────────────────────────────────────────────
// Vars: currentWinStreak, longestWinStreak, recentLossStreak
const streak: ByTier<StreakTier> = {
  tilted: [
    "{{recentLossStreak}} losses in a row. CRASHING OUT. CRASHING OUT FR.",
    "{{recentLossStreak}} consecutive losses. 'last game' has a series finale arc now.",
    "{{recentLossStreak}} losses straight. negative aura. negative friends. negative reasoning.",
  ],
  cold: [
    "{{recentLossStreak}} losses. bro's recent form is stuck in eco.",
    "{{recentLossStreak}} Ls. vibes have a credit score. it's negative.",
    "{{recentLossStreak}} losses. blame suspiciously falls in your direction.",
    "{{recentLossStreak}} Ls. the scoreboard has started using lowercase for your name.",
    "{{recentLossStreak}} Ls. queueing now is art.",
  ],
  warm: [
    "longest streak {{longestWinStreak}}. cute. like a small candle in a hurricane.",
    "{{longestWinStreak}} W streak. universe allowed a trial version of confidence.",
  ],
  heater: [
    "{{currentWinStreak}} W's right now. log off before reality arrives.",
    "current heater {{currentWinStreak}}. correct play is uninstalling until tomorrow.",
    "{{currentWinStreak}}-game streak. one more queue and the arc turns tragic.",
    "{{currentWinStreak}} W's straight. FACEIT is BAITING you.",
    "cooking for {{currentWinStreak}} games. next lobby smells the ego before you load in.",
  ],
  biblical: [
    "{{currentWinStreak}} W's. algorithm is letting you borrow joy.",
    "{{currentWinStreak}} consecutive wins. comeback mechanic is ABOUT to be real life.",
    "{{currentWinStreak}} wins. this is how people start saying 'I understand the game differently'.",
  ],
};

// ── FAVORITE MAP ─────────────────────────────────────────────────────
// Vars: mapName, mapMatches, mapWinRate
const map: string[] = [
  "most-played map {{mapName}}. {{mapMatches}} matches at {{mapWinRate}}% WR. captivity, not preference.",
  "{{mapName}} {{mapMatches}} times. you don't main it. you have a lease.",
  "{{mapName}} at {{mapWinRate}}% wins. comfort food: greasy, familiar, questionable.",
  "you queue {{mapName}} like it has your family photos.",
  "{{mapName}} again. wide map pool, narrow brain.",
  "{{mapName}}: home, prison, recurring dental appointment.",
  "{{mapMatches}} games on {{mapName}}. strat book is three smokes and a vibe check.",
];

// Map-specific zingers. Key matches FACEIT map labels.
const mapByName: Record<string, string[]> = {
  de_dust2: [
    "Dust2 main. you enjoy maps with the strategic depth of a hallway argument.",
    "Dust2. the equivalent of ordering plain fries and calling it culture.",
    "Dust2 again. your playbook is older than the rookies in your lobby.",
    "Dust2 enjoyer. long doors has done irreversible things to your brain.",
    "Dust2. bro has been playing the same map since middle school. concerning.",
  ],
  de_mirage: [
    "Mirage main. you only smoke window and call it 'carrying' for the 4000th time.",
    "Mirage. official map of guys who say 'default' and mean 'five solo duels'.",
    "Mirage again. you don't like CS2. you like muscle memory with palm trees.",
    "Mirage enjoyer. tactical identity stuck between connector and denial.",
    "Mirage main. the map for guys who think they're entry fragging when they're throwing.",
  ],
  de_inferno: [
    "Inferno. you chose banana as a lifestyle. consequences include utility damage.",
    "Inferno main. round plan: 40 seconds of waiting then panic with a molotov.",
    "Inferno enjoyer. you think 'clearing corners' is a personality.",
    "Inferno. CT side is a religion you've been losing for years.",
  ],
  de_nuke: [
    "Nuke enjoyer. comms require a floor plan and emotional support.",
    "Nuke again. ramp has taken years off your life and you THANKED it.",
    "Nuke main. bro plays 3D chess. badly.",
    "Nuke. outside smokes are not a personality.",
  ],
  de_anubis: [
    "Anubis. picked the map noobs pretend to understand. bold costume.",
    "Anubis enjoyer. brave. strange. wildly overconfident about mid.",
    "Anubis. pyramids cost less than the rounds you've donated here.",
    "Anubis. new map confidence, old map mistakes.",
  ],
  de_overpass: [
    "Overpass main. strats involve three bathrooms and zero closure.",
    "Overpass again. every rotate feels like commuting in traffic.",
    "Overpass enjoyer. the kind of guy who calls 'monster' like he invented it.",
  ],
  de_ancient: [
    "Ancient again. mid control turns your team into a leaderless group project.",
    "Ancient. mid control looking like five people sharing one braincell.",
  ],
  de_vertigo: [
    "Vertigo. you queue on a skyscraper. normal suffering wasn't cinematic enough.",
    "Vertigo enjoyer. you don't fear heights. you fear competent utility.",
    "Vertigo. bro's CT side is a public service announcement against vertigo.",
  ],
  de_train: [
    "Train. vintage map. vintage pain. modern excuses.",
    "Train again. the map returns. so does your uncle's tactical vocabulary.",
    "Train. bro called 'red' three times. nobody knew where.",
  ],
  de_cache: [
    "Cache. you miss the old days. the old days do not miss your crosshair placement.",
    "Cache enjoyer. A-site takes and fossil energy in one package.",
    "Cache main. bro is 30 in CS years.",
  ],
};

// ── PEAK ELO (recent window only — never claim all-time) ─────────────
// Vars: peakElo, currentElo, delta, sampleSize
const peak: ByTier<PeakTier> = {
  atPeak: [
    "recent peak {{peakElo}} in last {{sampleSize}} games — and you're sitting on it RIGHT NOW. don't queue. it's for your own good.",
    "{{peakElo}} ELO. recent peak. THE moment. screenshot it before matchmaking adds character development.",
    "highest in last {{sampleSize}}: today. statistically: this is the moment before the sad documentary.",
    "{{peakElo}} ELO, current AND recent peak. rare. fragile. one DelyanxBGx away from crashing.",
  ],
  near: [
    "recent peak {{peakElo}}. currently {{delta}} under. spitting distance. that's the worst kind.",
    "only {{delta}} below recent peak. exact mood that makes you queue tired and call it 'discipline'.",
    "recent ceiling {{peakElo}}. current {{currentElo}}. you're basically there. which makes every loss DOUBLE embarrassing.",
  ],
  ascending: [
    "hit {{peakElo}} recently. donated {{delta}} ELO back to the ecosystem. very sustainable.",
    "you touched {{peakElo}} recently and immediately started calling mid-rounds like Karrigan.",
    "last {{sampleSize}} peak {{peakElo}}. current {{currentElo}}. graph said 'main character' then tripped.",
  ],
  fallen: [
    "you were {{peakElo}} in last {{sampleSize}}. now {{delta}} ELO lower. not variance. that's LORE.",
    "{{delta}} ELO gone since recent peak. FACEIT didn't take it. you handed it over with both hands.",
    "recent high {{peakElo}}. current {{currentElo}}. graph has a villain arc. you are villain AND victim.",
  ],
};

// ── TOTAL CAREER KILLS ───────────────────────────────────────────────
// Vars: totalKills, totalDeaths, perMatch, mostKills
const kills: ByTier<KillsTier> = {
  minor: [
    "{{totalKills}} kills total. enemies are statistically safe around you.",
    "{{totalKills}} kills, ~{{perMatch}} per match. low volume. high mystery.",
    "{{totalKills}} kills. the killfeed knows you as a guest star.",
    "{{totalKills}} kills. enemies peek you for confidence practice.",
    "{{totalKills}} kills. contribution: atmospheric. operational impact: TBD.",
  ],
  casual: [
    "{{totalKills}} kills, best game {{mostKills}}. one map accidentally became cinema.",
    "{{totalKills}} kills, ~{{perMatch}} per match. employee of the month at a small store.",
    "{{totalKills}} eliminations. respectable paperwork. limited fear factor.",
  ],
  veteran: [
    "{{totalKills}} kills, ~{{perMatch}} per match. productive menace with mild workplace issues.",
    "{{totalKills}} kills. best single match {{mostKills}}. evenings have been ruined.",
    "{{totalKills}} kills, {{totalDeaths}} deaths. high activity. high mess. landlord special.",
  ],
  psycho: [
    "{{totalKills}} kills. the respawn screen has you saved as emergency contact.",
    "{{totalKills}} kills, {{totalDeaths}} deaths. circle of life, played aggressively.",
    "{{totalKills}} kills. bro is HIM. ONLY HIM. and HIM has serious posture problems.",
  ],
};

// ── MULTIKILLS (recent match-stats window only) ──────────────────────
// Vars: triples, quads, pentas, sampleSize
const multikill: ByTier<MultikillTier> = {
  tame: [
    "last {{sampleSize}}: {{triples}} triples, {{quads}} quads, {{pentas}} aces. brain: power saving mode.",
    "{{triples}} triples in {{sampleSize}}. clips folder contains hope and a crosshair screenshot.",
    "last {{sampleSize}}: {{quads}} quads, {{pentas}} aces. ace economy untouched.",
  ],
  spicy: [
    "last {{sampleSize}}: {{triples}} triples, {{quads}} quads, {{pentas}} aces. some sauce.",
    "multi-kills over {{sampleSize}}: occasional menace. inconsistent office hours.",
    "last {{sampleSize}} games had moments. not a montage. a TikTok draft.",
  ],
  menace: [
    "{{quads}} quads in {{sampleSize}}. bro clears sites like he's collecting rent.",
    "recent multi-kills say menace. comms probably say 'I told you I had it' before anyone asks.",
    "{{pentas}} aces in last {{sampleSize}}. enemies queued for fun, got a boss fight.",
    "{{triples}} triples recently. you open rounds like a problematic group chat.",
  ],
  godmode: [
    "{{pentas}} aces across {{sampleSize}}. server watched you and started drafting patch notes.",
    "{{quads}} quads, {{pentas}} aces recently. absurd output. horrible day for humility.",
    "recent multi-kill output: raid boss with queue addiction.",
    "{{pentas}} aces in {{sampleSize}}. you don't make clips. you manufacture EVIDENCE.",
  ],
};

// ── VERDICT ──────────────────────────────────────────────────────────
// Vars: nickname, level, elo, kd, winRate
const verdict: string[] = [
  "final verdict: {{nickname}} is not bad at CS2. WORSE: the stats justify the ego.",
  "final verdict: mechanically present, strategically alt-tabbed.",
  "verdict: level {{level}}, {{kd}} K/D, {{winRate}}% WR. account is playable. aura needs a hotfix.",
  "closing statement: {{nickname}} has the numbers of a player and the emotional range of overtime economy.",
  "final ruling: not guilty of being boring. guilty of queueing like consequences are optional.",
  "verdict: {{nickname}} is statistically real. spiritually muted. one loss from a notes-app manifesto.",
  "conclusion: profile has potential. that's exactly what makes the current situation so ROASTABLE.",
  "final verdict: ELO says {{elo}}. vibes say 'I can explain'.",
  "case closed: {{nickname}} plays like every match is winnable and every teammate is evidence.",
  "verdict: playable account. unstable mythology. suspicious relationship with the queue button.",
  "closing thoughts: stats aren't the problem. the confidence built on top of them is.",
  "final report: {{nickname}} is COOKED. but in a way that keeps loading another match.",
  "verdict: your FACEIT profile has lore. unfortunately, most of it is admissible in court.",
  "final ruling: bro is HIM. unfortunately HIM is also visibly online at 3:47am.",
  "closing argument: {{nickname}} is brainrotted. with style.",
];

// ── ZERO-MATCHES SPECIAL CASE ────────────────────────────────────────
const ghost: string[] = [
  "zero CS2 matches. blank account. private profile aura.",
  "no matches found. can't roast performance, so we're roasting the silence.",
  "0 games. cleanest stat line is always the one too scared to queue.",
  "no matches. account is new, retired, or hiding from accountability.",
  "0 CS2 matches. ghost arc. mysterious uncle aura.",
  "no data. you achieved peace by NEVER entering the courtroom.",
  "0 games. bro is just vibes and aspiration. no receipts.",
  "zero matches. either smart or terrified. likely both.",
];

export const TEMPLATES = {
  intro,
  level,
  peak,
  matches,
  kills,
  kd,
  winrate,
  hs,
  multikill,
  streak,
  map,
  mapByName,
  verdict,
  ghost,
};

// Generic fallback line — used if any tier array above is accidentally empty.
export const FALLBACK_LINE = "statistically present. comedically in danger.";

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
