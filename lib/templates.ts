/**
 *  ┌──────────────────────────────────────────────────────────────────┐
 *  │ ROAST MY FACEIT — template bank.                                 │
 *  │                                                                  │
 *  │ Edit freely. The report generator picks ONE random line per      │
 *  │ slide. Keep arrays non-empty.                                    │
 *  │                                                                  │
 *  │ Template variables use double curlies: {{nickname}}.             │
 *  │                                                                  │
 *  │ Tone rule: always roast the stats.                               │
 *  │ Low stats  -> struggle roast.                                    │
 *  │ Mid stats  -> NPC / stuck / beige aura roast.                    │
 *  │ High stats -> sweat / ego / chronically-online roast.            │
 *  │                                                                  │
 *  │ No slurs, no identity insults, no real threats.                  │
 *  │                                                                  │
 *  │ HONESTY RULES:                                                   │
 *  │   • peak and multikill are from a recent sample window, not      │
 *  │     lifetime. Mention {{sampleSize}} where relevant.             │
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
  "{{nickname}} opened FACEIT and accidentally generated a case file.",
  "We pulled {{nickname}}'s public stats. The the game is crying.",
  "Welcome to the hearing, {{nickname}}. The evidence is numeric and deeply unserious.",
  "{{nickname}} thought this was a stats page. It is actually a mirror with better formatting.",
  "Loading {{nickname}}'s FACEIT lore. Please keep hands and excuses inside the vehicle.",
  "{{nickname}} from {{region}}. The region denies involvement.",
  "We checked the numbers. FACEIT said: please be gentle. We ignored that.",
  "This is not coaching. You will not get better by looking at this.",
  "{{nickname}} queued enough for the algorithm to develop an opinion.",
  "Your stats have been converted into content. Horrible day for accountability.",
  "The lobby has spoken, {{nickname}}. Unfortunately, it used data.",
  "This report contains traces of ELO, cope, and lobby-wide emotional trauma.",
];

// ── SKILL LEVEL ──────────────────────────────────────────────────────
// Vars: level, elo, region
const level: Record<number, string[]> = {
  0: [
    "Unranked. FACEIT hasn't judged you yet, which means we get first swing.",
    "Level 0. The account is still in its witness protection era.",
    "Unranked with {{elo}} ELO energy. Somehow both innocent and suspicious.",
    "FACEIT hasn't assigned a level. Rare case where the silence is louder than the stat.",
  ],
  1: [
    "Level 1. The basement has a basement and you brought a gaming chair.",
    "Level 1. Your ELO is not low, it's doing limbo with commitment.",
    "Level 1. Every game is slow and painfull.",
    "Level 1 with {{elo}} ELO. The number has the posture of a defeated worm.",
    "Level 1. You don't climb ladders, you are unable to climb a slope.",
  ],
  2: [
    "Level 2. Not rock bottom, but you can hear it through the floor.",
    "Level 2. The tutorial ended and the allegations began.",
    "Level 2 with {{elo}} ELO. Your rank has expired coupon energy.",
    "Level 2. The lobby sees you join and immediately starts speaking in sighs.",
    "Level 2. You are not lost. You live here now.",
  ],
  3: [
    "Level 3. A rank so neutral it could moderate a Discord argument.",
    "Level 3. You have left the basement and entered your parents living room.",
    "Level 3 with {{elo}} ELO. The climb is technically happening, like continental drift.",
    "Level 3. Enough skill to have opinions, not enough for anyone to care.",
    "Level 3. Your gameplay says 'I watched one NadeKing video in 2021'.",
  ],
  4: [
    "Level 4. The human loading screen of FACEIT skill levels.",
    "Level 4 with {{elo}} ELO. Mid, but with delusional dreams in your own head.",
    "Level 4. Your aim has moments. Your decision-making has plot holes.",
    "Level 4. The exact place where 'let me entry' becomes a group project disaster.",
    "Level 4. You are not throwing. You're just pioneering alternative outcomes.",
  ],
  5: [
    "Level 5. Perfectly centered. Spiritually stuck. Mathematically beige.",
    "Level 5 with {{elo}} ELO. You are the median voter of Counter-Strike.",
    "Level 5. FACEIT's way of saying 'could be worse' and refusing to elaborate.",
    "Level 5. Half the lobby fears you, the other half has already muted you.",
    "Level 5. You don't have a skill ceiling, you have a drop ceiling.",
  ],
  6: [
    "Level 6. Above average enough to develop ego, not enough to justify the monologue.",
    "Level 6 with {{elo}} ELO. Dangerous in pistol round, confusing everywhere else.",
    "Level 6. The aim is improving but the takes in voice chat are still silver elite.",
    "Level 6. You are one losing streak away from rediscovering humility.",
    "Level 6. Good enough to blame teammates with confidence. Bad enough for it to be funny.",
  ],
  7: [
    "Level 7. The rank where every player thinks they are one monitor upgrade from pro.",
    "Level 7 with {{elo}} ELO. Respectable stats, insufferable replay commentary.",
    "Level 7. You can shoot, but your mid-round calls arrive by carrier pigeon.",
    "Level 7. Enough talent to carry. Enough ego to make carrying unpleasant.",
    "Level 7. You say 'I'm just playing for fun' with tournament comms.",
  ],
  8: [
    "Level 8. Your mechanics are real, but so is the visible queue addiction.",
    "Level 8 with {{elo}} ELO. Almost elite, fully unbearable.",
    "Level 8. You do not play FACEIT, you negotiate with your nervous system.",
    "Level 8. The crosshair is clean, the life balance is in overtime.",
    "Level 8. You are close enough to level 10 to make every loss a personality crisis.",
  ],
  9: [
    "Level 9. The waiting room for people who say 'bro I swear I was 10 yesterday'.",
    "Level 9 with {{elo}} ELO. One bad queue away from writing a paragraph in party chat.",
    "Level 9. The skill is there. The emotional regulation is on 64 tick.",
    "Level 9. You are almost HIM, which is exactly why this is tragic.",
    "Level 9. FACEIT gave you hope, then invented teammates.",
  ],
  10: [
    "Level 10 with {{elo}} ELO. The scoreboard loves you. Everyone else has you at 40% volume.",
    "Level 10. Congratulations: your free time has unionized against you.",
    "Level 10 with {{elo}} ELO. This is either discipline or a cry for help with better crosshair placement.",
    "Level 10. You didn't beat FACEIT, you became one of its environmental hazards.",
    "Level 10. The skill is undeniable, which makes the aura damage more legally interesting.",
    "Level 10 with {{elo}} ELO. Your opponents call you cracked; your sleep schedule calls you missing.",
  ],
};

// ── MATCHES PLAYED ───────────────────────────────────────────────────
// Vars: matches, wins, losses, hours
const matches: ByTier<MatchesTier> = {
  rookie: [
    "{{matches}} matches. Still fresh enough to think matchmaking is a fair concept.",
    "Only {{matches}} matches. Your trauma subscription is still in free trial.",
    "{{matches}} matches. The FACEIT client barely knows your legal name.",
    "{{matches}} matches played. You are not washed yet, just pre-soaked.",
    "{{matches}} matches. Cute sample size. The spreadsheet is using baby voice.",
  ],
  casual: [
    "{{matches}} matches. Casual numbers on a platform built for emotional property damage.",
    "{{matches}} matches, {{losses}} losses. Enough evidence for a small claims court.",
    "{{matches}} matches. You visit FACEIT like a toxic ex: not daily, but enough to worry friends.",
    "{{matches}} matches. Still pretending this is a hobby. Adorable paperwork.",
    "{{matches}} matches. The queue button knows your finger, not your soul. Yet.",
  ],
  grinder: [
    "{{matches}} matches. That's about {{hours}} hours of saying 'last one' with no legal meaning.",
    "{{matches}} matches. Your chair has seen more debriefs than a police station.",
    "{{matches}} matches. FACEIT is not on your PC; your PC is inside FACEIT.",
    "{{matches}} matches. At this point the queue sound is a family member.",
    "{{matches}} matches. You didn't grind, you opened a franchise location.",
    "{{matches}} matches with {{losses}} losses. The lore has filler arcs.",
  ],
  nolife: [
    "{{matches}} matches. This is no longer a profile, it's an archaeological site.",
    "{{matches}} matches. The sun filed a missing persons report and listed your Steam ID.",
    "{{matches}} matches. Your keyboard has absorbed enough tilt to become sentient.",
    "{{matches}} matches. FACEIT should send you a W-2 form.",
    "{{matches}} matches. You don't queue games, you clock in.",
    "{{matches}} matches. At this point 'one more' is a hereditary curse.",
  ],
};

// ── K/D RATIO ────────────────────────────────────────────────────────
// Vars: kd
const kd: ByTier<KDTier> = {
  abysmal: [
    "K/D {{kd}}. Bro is not the hunter. Bro is environmental storytelling.",
    "K/D {{kd}}. Every duel is a donation with better audio.",
    "K/D {{kd}}. Your crosshair placement has a side hustle in real estate: always off-site.",
    "K/D {{kd}}. The killfeed treats you like background texture.",
    "K/D {{kd}}. You are not losing fights, you're providing educational examples.",
    "K/D {{kd}}. The enemy team farms you like a seasonal event.",
  ],
  rough: [
    "K/D {{kd}}. You are almost trading. Philosophically.",
    "K/D {{kd}}. Not disaster class, more like disaster elective.",
    "K/D {{kd}}. You peek like rent is due and information is optional.",
    "K/D {{kd}}. The intent is visible. The impact is under investigation.",
    "K/D {{kd}}. Your team doesn't need bait; they have you by default.",
    "K/D {{kd}}. The aim duel starts, then your monitor becomes a spectator device.",
  ],
  average: [
    "K/D {{kd}}. Perfectly serviceable, like airport Wi‑Fi with confidence issues.",
    "K/D {{kd}}. The stat equivalent of 'seen at 2:14 PM'.",
    "K/D {{kd}}. You exist in the server with measurable but legally limited impact.",
    "K/D {{kd}}. Not feeding, not carrying. Just professionally present.",
    "K/D {{kd}}. Your highlight reel has terms and conditions.",
    "K/D {{kd}}. Mid, but not peacefully. Mid with a manifesto.",
  ],
  decent: [
    "K/D {{kd}}. You win enough duels to make the bad decisions look intentional.",
    "K/D {{kd}}. Solid numbers, suspicious confidence, unresolved teammate trauma.",
    "K/D {{kd}}. You are statistically useful and emotionally expensive.",
    "K/D {{kd}}. The frags are there; the post-round speech is the real griefing.",
    "K/D {{kd}}. You carry some rounds and every argument.",
    "K/D {{kd}}. Dangerous player, but the ego scaling needs a nerf.",
  ],
  elite: [
    "K/D {{kd}}. Impressive. Also exactly the kind of stat that makes you say 'drop me AWP' unprompted.",
    "K/D {{kd}}. You can clearly shoot, which makes the typing in chat even less defensible.",
    "K/D {{kd}}. The enemies fear you; your friends fear inviting you casually.",
    "K/D {{kd}}. Fragging like rent is due, communicating like the landlord changed the locks.",
    "K/D {{kd}}. Your mechanics are premium, your patience is freeware.",
    "K/D {{kd}}. The scoreboard says carry; the vibe says public health advisory.",
  ],
  godlike: [
    "K/D {{kd}}. This is no longer a stat, it's a moderation ticket with good branding.",
    "K/D {{kd}}. Either you're him or your matchmaking history needs subtitles.",
    "K/D {{kd}}. The server experiences you as a weather event.",
    "K/D {{kd}}. At this point your mousepad should have an HR department.",
    "K/D {{kd}}. You don't take duels, you repossess confidence.",
    "K/D {{kd}}. Absurd numbers. Unfortunately, the aura tax is enormous.",
  ],
};

// ── WIN RATE ─────────────────────────────────────────────────────────
// Vars: winRate, wins, losses, matches
const winrate: ByTier<WinRateTier> = {
  doomed: [
    "{{winRate}}% win rate. The queue button is basically a trapdoor with branding.",
    "{{winRate}}% WR. You don't play matches, you beta-test disappointment.",
    "{{winRate}}% win rate over {{matches}} games. The sample size has started apologizing.",
    "{{winRate}}% WR. Even variance said 'nah, this one's on you'.",
    "{{winRate}}% win rate. Your ELO has learned to flinch.",
  ],
  losing: [
    "{{winRate}}% win rate. The 'it's my team' documentary has too many seasons.",
    "{{winRate}}% WR. You lose more than you win, but at least you collect excuses efficiently.",
    "{{winRate}}% win rate. The climb is less ladder, more treadmill facing a wall.",
    "{{winRate}}% WR. Your match history has the mood lighting of a hospital corridor.",
    "{{winRate}}% win rate. Not cursed. Just consistently negotiated with by fate.",
  ],
  even: [
    "{{winRate}}% win rate. FACEIT purgatory, but with better fonts.",
    "{{winRate}}% WR. Win one, lose one, call it progress, repeat until emotionally crispy.",
    "{{winRate}}% win rate. You are not climbing; you are maintaining altitude in a broken elevator.",
    "{{winRate}}% WR. The coin is fair. The coping is not.",
    "{{winRate}}% win rate. You have achieved perfect statistical treadmill energy.",
  ],
  winning: [
    "{{winRate}}% win rate. Nice. Shame it's turning every loss into a courtroom drama.",
    "{{winRate}}% WR. You win enough to believe you're cursed when you don't. Dangerous mythology.",
    "{{winRate}}% win rate. The profile looks healthy; the queue habits do not.",
    "{{winRate}}% WR. Strong results, but the post-loss debrief probably needs a producer credit.",
    "{{winRate}}% win rate. You are climbing and still somehow giving 'held hostage by teammates'.",
  ],
  smurfing: [
    "{{winRate}}% win rate. Either smurfing or the lobby got assigned community service.",
    "{{winRate}}% WR. Winning this much and still queueing is villain origin behavior.",
    "{{winRate}}% win rate. FACEIT matchmaking looked at you and whispered 'my bad'.",
    "{{winRate}}% WR. The opponents didn't queue, they entered a playable cutscene.",
    "{{winRate}}% win rate. Impressive, yes. Normal, absolutely not.",
  ],
};

// ── HEADSHOT % ───────────────────────────────────────────────────────
// Vars: hs
const hs: ByTier<HSTier> = {
  spray: [
    "{{hs}} headshots. You aim like the enemy is a weather forecast: generally that direction.",
    "{{hs}} headshots. Crosshair placement currently listed as missing cargo.",
    "{{hs}} headshots. The floor has taken more damage than the opponent's helmet.",
    "{{hs}} headshots. Your recoil control is less pattern, more interpretive dance.",
    "{{hs}} headshots. You don't clear angles, you decorate them with bullets.",
  ],
  low: [
    "{{hs}} headshots. Body-shot economy is alive and unfortunately funded by you.",
    "{{hs}} headshots. You see heads as optional DLC.",
    "{{hs}} headshots. Crosshair placement has been marked 'out for delivery' since 2020.",
    "{{hs}} headshots. The helmets are surviving with generational wealth.",
    "{{hs}} headshots. You shoot center mass like this is airport security training.",
  ],
  mid: [
    "{{hs}} headshots. Enough to feel clean, not enough to stop explaining every death.",
    "{{hs}} headshots. Average aim with premium confidence packaging.",
    "{{hs}} headshots. Sometimes crispy, sometimes toast left in the sink.",
    "{{hs}} headshots. Your crosshair knows the assignment but submits it late.",
    "{{hs}} headshots. Respectably mid. The bullets occasionally receive guidance.",
  ],
  high: [
    "{{hs}} headshots. Sharp aim. Shame the ego came bundled like browser toolbar malware.",
    "{{hs}} headshots. You click heads and then narrate it like a documentary nobody ordered.",
    "{{hs}} headshots. Clean enough to be scary, sweaty enough to need ventilation.",
    "{{hs}} headshots. The crosshair is disciplined; the comms are a group chat leak.",
    "{{hs}} headshots. Great aim, terrible vibes per second.",
  ],
  aimgod: [
    "{{hs}} headshots. This stat has the energy of a demo review and three angry comments.",
    "{{hs}} headshots. You don't aim, you issue eviction notices to helmets.",
    "{{hs}} headshots. Spectators watching you probably type '???' more than callouts.",
    "{{hs}} headshots. The enemies are not dying, they are being edited out.",
    "{{hs}} headshots. Mechanically illegal-looking, socially exhausting-looking.",
  ],
};

// ── STREAK ───────────────────────────────────────────────────────────
// Vars: currentWinStreak, longestWinStreak, recentLossStreak
const streak: ByTier<StreakTier> = {
  tilted: [
    "{{recentLossStreak}} losses in a row. The queue button is now a self-own with UI polish.",
    "{{recentLossStreak}} straight Ls. Your match history looks like a red carpet event.",
    "{{recentLossStreak}} losses deep. This is no longer tilt, this is residency.",
    "{{recentLossStreak}} consecutive losses. The 'last game' lie has entered season finale territory.",
    "{{recentLossStreak}} Ls in a row. Your ELO is leaving in installments.",
  ],
  cold: [
    "{{recentLossStreak}} losses straight. Not a collapse, more like a controlled demolition.",
    "Currently {{recentLossStreak}} losses deep. The vibes have a negative credit score.",
    "{{recentLossStreak}}-game skid. The matchmaker did not do this alone, respectfully.",
    "{{recentLossStreak}} losses in a row. The blame pie chart has suspiciously few slices for you.",
    "Cold streak: {{recentLossStreak}} Ls. Queueing now would be performance art.",
  ],
  warm: [
    "Longest streak: {{longestWinStreak}} wins. Cute. A small candle in a very windy lobby.",
    "Best streak ever: {{longestWinStreak}}. The montage would be short but emotionally sincere.",
    "{{longestWinStreak}} wins is your best run. Not bad, just not documentary material.",
    "Longest win streak {{longestWinStreak}}. The ceiling exists and it's wearing Crocs.",
    "{{longestWinStreak}} wins in a row. The universe allowed a trial version of confidence.",
  ],
  heater: [
    "{{currentWinStreak}} wins in a row right now. Log off before probability remembers your address.",
    "Current streak: {{currentWinStreak}}. The correct play is uninstalling until tomorrow.",
    "{{currentWinStreak}}-game heater. You're one more queue from turning the arc tragic.",
    "{{currentWinStreak}} straight wins. FACEIT is baiting you into the correction patch.",
    "Currently cooking for {{currentWinStreak}} games. The next lobby can smell the ego already.",
  ],
  biblical: [
    "{{currentWinStreak}} wins in a row. The algorithm is letting you borrow joy at predatory interest.",
    "{{currentWinStreak}} straight wins. This is either dominance or matchmaking clerical error.",
    "{{currentWinStreak}}-game streak. Your confidence is about to become publicly traded and crash.",
    "{{currentWinStreak}} wins in a row. Statistically hot, spiritually overleveraged.",
    "{{currentWinStreak}} consecutive wins. Please do not queue again; the comeback mechanic is real life.",
  ],
};

// ── FAVORITE MAP ─────────────────────────────────────────────────────
// Vars: mapName, mapMatches, mapWinRate
const map: string[] = [
  "Most-played map: {{mapName}}. {{mapMatches}} matches. {{mapWinRate}}% WR. That's not preference, that's captivity.",
  "{{mapName}} {{mapMatches}} times. You don't main it, you have a lease agreement.",
  "{{mapName}} with {{mapWinRate}}% wins. The comfort pick is giving comfort food: familiar, greasy, questionable.",
  "You queue {{mapName}} like it has your family photos.",
  "{{mapName}} again. The map pool is wide and yet here you are, emotionally fenced in.",
  "{{mapName}}: your home map, your prison yard, your recurring appointment.",
  "{{mapMatches}} games on {{mapName}}. The strat book is probably three smokes and a vibe check.",
  "{{mapName}} at {{mapWinRate}}% WR. Either comfort zone or Stockholm syndrome with callouts.",
];

// Map-specific zingers. Key must match FACEIT map label when available.
const mapByName: Record<string, string[]> = {
  de_dust2: [
    "Dust2 main. You enjoy maps with the strategic depth of a hallway argument.",
    "Dust2. The map equivalent of ordering plain fries and calling it culture.",
    "Dust2 again. Your playbook is older than half the lobby.",
    "Dust2 enjoyer. Long doors has done irreversible things to your worldview.",
  ],
  de_mirage: [
    "Mirage main. You smoke window and call it innovation every single time.",
    "Mirage. The official map of people who say 'default' and mean 'five solo duels'.",
    "Mirage again. You don't like CS2, you like muscle memory with palm trees.",
    "Mirage enjoyer. Your entire tactical identity lives between connector and denial.",
  ],
  de_inferno: [
    "Inferno. You chose banana as a lifestyle and now the consequences have utility damage.",
    "Inferno main. Your round plan is 40 seconds of waiting, then panic with a molotov.",
    "Inferno again. Nothing says peace like arguing about car for 13 rounds.",
    "Inferno enjoyer. You think clearing corners is a personality trait.",
  ],
  de_nuke: [
    "Nuke main. You enjoy vertical suffering and explaining rotations like a geography teacher.",
    "Nuke. The map for people who hear footsteps in three dimensions and still guess wrong.",
    "Nuke enjoyer. Your comms probably require a floor plan and emotional support.",
    "Nuke again. Ramp has taken years off your life and you thanked it.",
  ],
  de_anubis: [
    "Anubis. You picked the map newer players pretend to understand. Bold costume choice.",
    "Anubis main. You like water, weird timings, and teammates saying 'where is B again?'.",
    "Anubis again. The rotates are long enough to rethink your queue habits.",
    "Anubis enjoyer. Brave, strange, and probably overconfident about mid.",
  ],
  de_overpass: [
    "Overpass. You enjoy connector fights and making simple rounds require urban planning.",
    "Overpass main. Your strats involve three bathrooms and zero emotional closure.",
    "Overpass again. The map where every rotate feels like commuting.",
  ],
  de_ancient: [
    "Ancient. You looked at green walls and said 'this is where my ELO goes to argue'.",
    "Ancient main. You enjoy visibility issues and calling it tactical depth.",
    "Ancient again. Mid control has turned your team into a group project with no leader.",
  ],
  de_vertigo: [
    "Vertigo. You queue on a skyscraper because normal suffering wasn't cinematic enough.",
    "Vertigo main. The map where every round feels like someone dropped a toolbox on your mental health.",
    "Vertigo again. Ramp fights have replaced your personality with plywood.",
    "Vertigo enjoyer. You don't fear heights, you fear competent utility.",
  ],
  de_train: [
    "Train. Vintage map, vintage pain, modern excuses.",
    "Train enjoyer. You like angles so tight they need legal representation.",
    "Train again. The map returns and so does your uncle's tactical vocabulary.",
  ],
  de_cache: [
    "Cache. You miss the old days, but the old days do not miss your crosshair placement.",
    "Cache enjoyer. A-site takes and fossil energy in one convenient package.",
  ],
};

// ── PEAK ELO (recent window only — never claim all-time) ─────────────
// Vars: peakElo, currentElo, delta, sampleSize
const peak: ByTier<PeakTier> = {
  atPeak: [
    "Recent peak: {{peakElo}} across the last {{sampleSize}} games, and you're sitting on it now. Do not queue. The plot twist is armed.",
    "You are at your recent high: {{peakElo}} ELO. Screenshot it before matchmaking adds character development.",
    "Highest ELO in your last {{sampleSize}}: right now. This is the moment before the documentary gets sad.",
    "{{peakElo}} ELO, current and recent peak. Rare. Fragile. One teammate named xXDarkNikoXx away from rubble.",
    "At your last-{{sampleSize}} peak. The correct next move is closing the laptop like it contains classified material.",
  ],
  near: [
    "Recent peak {{peakElo}}, currently {{delta}} under. Close enough to taste it, far enough to blame map veto.",
    "Last {{sampleSize}} high: {{peakElo}}. You're {{delta}} ELO below. The comeback arc is loading, or buffering forever.",
    "{{peakElo}} was right there recently. Now {{delta}} away. Tiny gap, enormous emotional noise.",
    "Only {{delta}} ELO below your recent peak. This is exactly when people queue tired and call it discipline.",
    "Recent ceiling {{peakElo}}. Current {{currentElo}}. You are basically there, which makes every loss twice as embarrassing.",
  ],
  ascending: [
    "Recent ceiling {{peakElo}} in the last {{sampleSize}}, now {{delta}} below. You touched the light and immediately sold the candle.",
    "You hit {{peakElo}} recently, then donated {{delta}} ELO back to the ecosystem. Very sustainable.",
    "Last {{sampleSize}} peak: {{peakElo}}. Current: {{currentElo}}. The graph said 'main character' then tripped.",
    "{{delta}} below your recent peak. Not a crash, more like your ELO slipping on banana peel utility.",
    "Recent peak {{peakElo}}. Current {{currentElo}}. The fall is small, but the cope will be premium.",
  ],
  fallen: [
    "Recent peak {{peakElo}}, current {{currentElo}}. Down {{delta}}. The fall-off allegations have entered evidence.",
    "You were {{peakElo}} in the last {{sampleSize}} games. Now {{delta}} ELO lower. That's not variance, that's lore.",
    "{{delta}} ELO gone since your recent peak. FACEIT didn't take it; you handed it over with both hands.",
    "Recent high {{peakElo}}. Current {{currentElo}}. This graph has a villain arc and you are both villain and victim.",
    "Down {{delta}} from your last-{{sampleSize}} peak. The account is not washed, it's emotionally damp.",
  ],
};

// ── TOTAL CAREER KILLS ───────────────────────────────────────────────
// Vars: totalKills, totalDeaths, perMatch, mostKills
const kills: ByTier<KillsTier> = {
  minor: [
    "{{totalKills}} career kills. The server wildlife remains mostly undisturbed.",
    "{{totalKills}} kills total. Your enemies are statistically safe around you.",
    "{{totalKills}} kills, about {{perMatch}} per match. Low volume, high mystery.",
    "{{totalKills}} career kills. The killfeed knows you as a guest star.",
    "{{totalKills}} kills. Your contribution is more atmospheric than operational.",
  ],
  casual: [
    "{{totalKills}} career kills. Enough to have victims, not enough to have mythology.",
    "{{totalKills}} kills, ~{{perMatch}} per match. Solid employee-of-the-month-at-a-small-store energy.",
    "{{totalKills}} kills. Best game: {{mostKills}}. The ceiling made a brief cameo.",
    "{{totalKills}} eliminations. Respectable paperwork, limited fear factor.",
    "{{totalKills}} kills and {{totalDeaths}} deaths. Balanced ecosystem, questionable tourism.",
  ],
  veteran: [
    "{{totalKills}} career kills. The killfeed has your handwriting memorized.",
    "{{totalKills}} kills, ~{{perMatch}} a match. Productive menace with mild workplace issues.",
    "{{totalKills}} kills. Best single match: {{mostKills}}. You have clearly ruined evenings.",
    "{{totalKills}} kills and {{totalDeaths}} deaths. High activity, high mess, landlord special gameplay.",
    "{{totalKills}} career kills. The résumé is violent, the decision-making still has typos.",
  ],
  psycho: [
    "{{totalKills}} career kills. This is not a stat line, it's a municipal incident report.",
    "{{totalKills}} kills. The respawn screen has your name saved as an emergency contact.",
    "{{totalKills}} kills, {{totalDeaths}} deaths. You are not playing CS2, you are participating in the circle of life aggressively.",
    "{{totalKills}} career kills. Impressive output, concerning time management, loud chair energy.",
    "{{totalKills}} kills. The account has seen more bodies than a true crime podcast thumbnail.",
  ],
};

// ── MULTIKILLS (recent match-stats window only) ──────────────────────
// Vars: triples, quads, pentas, sampleSize
const multikill: ByTier<MultikillTier> = {
  tame: [
    "Last {{sampleSize}} games: {{triples}} triples, {{quads}} quads, {{pentas}} aces. The highlight reel is in power saving mode.",
    "Multi-kills over {{sampleSize}} games: quiet enough to be library-compliant.",
    "{{triples}} triples in {{sampleSize}}. Clips folder currently contains hope and a settings screenshot.",
    "Last {{sampleSize}}: {{quads}} quads, {{pentas}} aces. The ace economy remains untouched.",
    "Your last {{sampleSize}} games produced gentle multi-kill activity. Very carbon neutral.",
  ],
  spicy: [
    "Last {{sampleSize}}: {{triples}} triples, {{quads}} quads, {{pentas}} aces. Some sauce, but still store-brand.",
    "Multi-kills over {{sampleSize}} games: occasional menace with inconsistent office hours.",
    "{{triples}} triples and {{quads}} quads recently. The clip button woke up, stretched, then sat back down.",
    "Last {{sampleSize}} games had a few moments. Not a montage, more like a TikTok draft.",
    "{{pentas}} aces in the last {{sampleSize}}. If that's zero, please pretend this line looked away respectfully.",
  ],
  menace: [
    "Last {{sampleSize}}: {{triples}} triples, {{quads}} quads, {{pentas}} aces. The lobby has started checking corners emotionally.",
    "{{quads}} quads in {{sampleSize}} games. You are not trading, you're collecting receipts.",
    "Recent multi-kills say menace. The comms probably say 'I told you I had it' before anyone asked.",
    "{{pentas}} aces in your last {{sampleSize}}. The enemies queued FACEIT and got a boss fight with buy menu.",
    "{{triples}} triples recently. You open rounds like a problematic group chat.",
  ],
  godmode: [
    "Last {{sampleSize}}: {{triples}} triples, {{quads}} quads, {{pentas}} aces. The lobby was not a match; it was downloadable content for your ego.",
    "{{pentas}} aces across {{sampleSize}} games. The server watched you and started drafting patch notes.",
    "{{quads}} quads, {{pentas}} aces recently. Absurd production. Horrible day for humility.",
    "Multi-kill output over {{sampleSize}} games is giving raid boss with queue addiction.",
    "{{pentas}} aces in {{sampleSize}}. You don't make clips, you manufacture evidence.",
  ],
};

// ── VERDICT ──────────────────────────────────────────────────────────
// Vars: nickname, level, elo, kd, winRate
const verdict: string[] = [
  "Final verdict: {{nickname}} is not bad at CS2. Worse: the stats are interesting enough to justify the ego.",
  "Verdict: Level {{level}}, {{kd}} K/D, {{winRate}}% WR. The account is playable. The aura needs a hotfix.",
  "Closing statement: {{nickname}} has the numbers of a FACEIT player and the emotional stability of overtime economy.",
  "Final ruling: not guilty of being boring. Guilty of queueing like consequences are optional.",
  "Verdict: {{nickname}} is statistically real, spiritually muted, and probably one loss away from a notes-app manifesto.",
  "Conclusion: the profile has potential, which is exactly what makes the current situation so roastable.",
  "Final verdict: the ELO says {{elo}}, but the vibes say 'I can explain'.",
  "Case closed: {{nickname}} plays like every match is winnable and every teammate is evidence.",
  "Verdict: playable account, unstable mythology, suspicious relationship with the queue button.",
  "Closing thoughts: the stats are not the problem. The confidence built on top of them is.",
  "Final report: {{nickname}} is cooked, but in a way that keeps loading another match.",
  "Verdict: your FACEIT profile has lore. Unfortunately, most of it is admissible in court.",
];

// ── ZERO-MATCHES SPECIAL CASE ────────────────────────────────────────
const ghost: string[] = [
  "Zero CS2 matches. A blank account with the confidence of a private profile.",
  "No CS2 matches found. Can't roast performance, so we're roasting the absence of evidence.",
  "0 games played. The cleanest stat line is always the one too scared to queue.",
  "No matches. The account is either new, retired, or hiding from accountability.",
  "0 CS2 matches. Ghost account aura. Strong mysterious uncle energy.",
  "No data. The player has achieved peace by never entering the courtroom.",
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
export const FALLBACK_LINE = "Statistically present. Comedically in danger.";

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
