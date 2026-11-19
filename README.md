# Vice City Trophy Atlas — All 55 GTA VI Trophies, Cited

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/daring-falcon-58/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/daring-falcon-58/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline web guide + tracker for the 55 PlayStation 5 trophies of Grand Theft Auto VI. Open `app/index.html` in desktop Chrome with the network off: it loads only its own files, saves your checklist in localStorage (with export/import), filters by kind and grade, hides story spoilers until earned, and gives a 4-phase roadmap to the platinum plus the one missable trophy.

## Methodology

**The list and its provenance.** The 55 trophies are the official PlayStation list as Exophase and PSNProfiles listed it before this bounty opened (both agreeing on every name, description and grade), frozen in the competition kit on 18 November 2026. Independent launch-era reporting — PowerPyx, KeenGamer, OutputLag, CryptoGames, GTA Vice City Hub, Leonida Intel — matches the same 55 names and grades. Rockstar and Sony had not published a list pre-launch, per that reporting. Names, descriptions and grades are shown exactly as PlayStation publishes them; that is the one exception to the no-copying rule.

**How each guide is written.** Every trophy's guide is 2–4 sentences in our own words, paraphrased from the cited source — never copied. The main source is the PowerPyx trophy guide & roadmap (verified 19 November 2026), which covers the whole list, the roadmap, the counts and the missable trophy; KeenGamer's roadmap is cited where it adds a fact. Every guide names its source inline (e.g. "Method: PowerPyx roadmap; counts: official description") and lists its sources beside it, so a reader of a screenshot sees the citation without opening any data file. Source URLs are rendered as plain text, never as clickable links and never fetched — the app makes zero network requests.

**Roadmap logic.** The 4-phase roadmap is built from the official descriptions and PowerPyx's roadmap: Phase 1 story first (60–80 hours, ~200 hours total, difficulty 4/10), Phase 2 stranger strands as they unlock, Phase 3 activities and collectibles, Phase 4 cleanup against the 100% checklist (Progress > Stats > 100% Completion, unlocked after the story, closer to 60% true completion: any 100 optional missions, 70 of 80 challenges, 200 of 277 vehicles, 100 of 255 animals, 300 stunts, all 8 bank vaults, all 39 gang operations) and then the platinum.

**Missable logic.** Exactly one trophy is flagged missable — Positive Mental Attitude — because PowerPyx reports its first meditation, at Jason's house in Chapter 1 after the mission Down to Earth, is gone forever after Chapter 1. Whether that meditation is strictly required for the trophy is still unconfirmed, and the guide says so. All other trophies are safe: story trophies pop automatically, stranger strands stay open after the story, and the checklist can be finished in free-roam. The 17 story trophies get a "no mission replay — keep chapter-start saves" caution instead of a missable flag, and the spoiler setting hides their names and descriptions until earned (28 of the 55 are hidden on PlayStation per reporting; only these 17 are marked hidden here, the rest are not guessed).

**Honesty note.** Five trophies have no published method yet — In The Beginning…, Capital Offense, Bad Luck, I Guess, The Truth Is Out There and Ten Pin. Their guides say so plainly, state only what the official description requires, and point at PowerPyx for updates. No location or step is invented for them, or for any trophy whose detail is still unconfirmed (Fair Game's exact animal; Treat Yo Self, Little Boxes and On the Spot, whose published detail is only the official description). A cited guide beats an uncited one, however detailed — so every guide carries its source.

**Offline and artwork.** The app is static files under `app/` (index.html, style.css, app.js, data/trophies.json). The trophy data is also inlined in index.html so the page renders from `file://` as well as from a server. No Rockstar logo, official artwork, box art or game screenshot is used anywhere — the look is our own dark neon design (CSS gradients only). No online trophies exist: the Online filter honestly shows an empty state ("0 online trophies — every trophy is single-player/offline").

## How to run

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Or open `app/index.html` directly in a desktop browser — it works with the network off and from `file://`. Tick trophies to save progress (localStorage key `gta6-trophy-guide-01-progress-v1`); Export downloads your progress as JSON, Import reads the same format back, Reset clears it. Add `?trophy=28` to open one trophy's guide, `?spoiler=on` for the spoiler setting, `?shot=roadmap` to jump to the roadmap.

Screenshots were taken with headless Chromium (see `take-shots.mjs` in the build directory, not in this repo): `01-cover.jpg` (header, progress, filters, platinum hero), `02-detail.jpg` (Positive Mental Attitude open — guide, sources, missable badge), `03-roadmap.jpg` (roadmap + missable section), `04-tracker.jpg` (spoiler on, 6 trophies earned, progress moved).

## The 55 trophies

| # | Trophy | Grade | Kind | Missable |
|---|--------|-------|------|----------|
| 1 | Vice Got a Price! | platinum | platinum | — |
| 2 | Just Like Paradise | bronze | story | — |
| 3 | Paradise Lost | bronze | story | — |
| 4 | T**s Ass Drug Money | bronze | story | — |
| 5 | Vice City, Baby! | bronze | story | — |
| 6 | Top Of The World, Ma | bronze | story | — |
| 7 | You Gotta Know When to Get Off | gold | story | — |
| 8 | Trust | bronze | story | — |
| 9 | Break the Bank | bronze | story | — |
| 10 | Family Matters | bronze | story | — |
| 11 | DWNFALL | bronze | story | — |
| 12 | Hi-Jacked | bronze | story | — |
| 13 | Snow Storm | bronze | story | — |
| 14 | A Long Road | gold | activities | — |
| 15 | Cunning Stunts | silver | activities | — |
| 16 | Master of None | bronze | activities | — |
| 17 | The Shootist | silver | activities | — |
| 18 | Top Fun | bronze | activities | — |
| 19 | Earn Cash, Not Kudos | bronze | activities | — |
| 20 | Baited My Tackle | bronze | activities | — |
| 21 | Stick Fiddler | bronze | activities | — |
| 22 | Road to Rehabilitation | bronze | story | — |
| 23 | This Was No Boat Accident | bronze | story | — |
| 24 | The Lone Rider | bronze | story | — |
| 25 | Strangers & Freaks | silver | activities | — |
| 26 | Supply & Demand | bronze | story | — |
| 27 | Spin On This! | bronze | story | — |
| 28 | Positive Mental Attitude | bronze | activities | Yes |
| 29 | Fair Game | bronze | activities | — |
| 30 | Don't Touch My Deck | silver | collectibles | — |
| 31 | You WAiNKer! | silver | collectibles | — |
| 32 | One Last Thing | bronze | activities | — |
| 33 | Hot Together | bronze | activities | — |
| 34 | Retail Therapy | bronze | activities | — |
| 35 | Whip It Good | bronze | collectibles | — |
| 36 | Gunslinger | bronze | activities | — |
| 37 | Catch Me If You Can | bronze | activities | — |
| 38 | Challenging Tank | bronze | activities | — |
| 39 | Sneakthief | bronze | activities | — |
| 40 | Maximum Withdrawal | silver | activities | — |
| 41 | A Classic Blitz Play | bronze | activities | — |
| 42 | The Goodtime State | bronze | collectibles | — |
| 43 | Pest Control | bronze | activities | — |
| 44 | In The Beginning… | bronze | activities | — |
| 45 | Capital Offense | bronze | activities | — |
| 46 | Let’s Go Bowling | bronze | activities | — |
| 47 | Personal Best | bronze | activities | — |
| 48 | Actions Speak Louder | bronze | activities | — |
| 49 | Bad Luck, I Guess | bronze | activities | — |
| 50 | The Truth Is Out There | bronze | activities | — |
| 51 | Ten Pin | bronze | activities | — |
| 52 | Dime on the Dollar | bronze | collectibles | — |
| 53 | Treat Yo Self | bronze | collectibles | — |
| 54 | Little Boxes | bronze | collectibles | — |
| 55 | On the Spot | bronze | collectibles | — |

Sources, last checked 19 November 2026:

- PowerPyx — GTA 6 Trophy Guide & Roadmap: https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/
- KeenGamer — GTA 6 Trophy Guide & Platinum Roadmap: https://www.keengamer.com/articles/guides/gta-6-trophy-guide-platinum-roadmap-all-55-trophies/
- OutputLag — GTA 6 Trophy List: https://outputlag.com/guides/gta-6-trophy-list/
- CryptoGames — GTA 6 Trophies & Achievements Full List: https://cryptogames.gg/gta-6-trophies-achievements-full-list/
- GTA Vice City Hub — Achievements: https://www.gtavicecityhub.com/achievements
- Leonida Intel — GTA 6 Trophies & Achievements: https://leonida-intel.com/guides/gta-6-trophies-achievements/
- PlayStation official trophy list (via Exophase / PSNProfiles, as in the competition kit starter list)

License: MIT (see LICENSE). An unofficial fan guide, not affiliated with Rockstar Games, Sony or PlayStation.

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
