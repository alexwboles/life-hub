# Life Hub — Personal Life OS

One calm dashboard for twenty-nine independent AI products that help you run your household and life: **home, money, food, health, trips, events, learning, gifting**.

> A portfolio, not a suite. Each product stands alone and works on its own. The hub just makes them easy to find — and offers one honest bundle where it makes sense.

## Hearth AI

The conversational front door — talk to Hearth, and it plans.

| Product | What it does | Price |
|---------|--------------|-------|
| [hearth-ai](https://github.com/alexwboles/hearth-ai) | Chat-first health & home hub: meals, health, schedule, comms in one conversation | $12/mo |

## Home & family

| Product | What it does | Price |
|---------|--------------|-------|
| [nestlife-ai](https://github.com/alexwboles/nestlife-ai) | Family organizer: meal plans, groceries, bills, chores | $8/mo |
| [homekeeper-ai](https://github.com/alexwboles/homekeeper-ai) | Seasonal home maintenance plan + reminders | $6/mo |
| [homeinventory-ai](https://github.com/alexwboles/homeinventory-ai) | Home inventory: what you own, where it is, what it's worth | $6/mo |
| [gardenplan-ai](https://github.com/alexwboles/gardenplan-ai) | Garden planner: what to plant, when, and where | $6/mo |
| [apartmenthunt-ai](https://github.com/alexwboles/apartmenthunt-ai) | Compare apartment listings: rent, fees, commute and space side by side | $6/mo |
| [roommatesplit-ai](https://github.com/alexwboles/roommatesplit-ai) | Roommate expense splitter: bills divided fairly | $6/mo |
| [movingcheck-ai](https://github.com/alexwboles/movingcheck-ai) | Moving checklist: timeline, tasks and box inventory | $6/mo |

## Money & work

| Product | What it does | Price |
|---------|--------------|-------|
| [budgetlens-ai](https://github.com/alexwboles/budgetlens-ai) | Bank CSV → spending insights + subscription finder | $8/mo |
| [debtpayoff-ai](https://github.com/alexwboles/debtpayoff-ai) | Debt payoff planner: avalanche vs snowball, payoff dates | $8/mo |
| [taxprep-ai](https://github.com/alexwboles/taxprep-ai) | Tax prep organizer: documents, deductions and deadlines | $8/mo |
| [sidehustle-ai](https://github.com/alexwboles/sidehustle-ai) | Side-hustle planner: ideas, pricing and launch checklists | $8/mo |
| [applypilot-ai](https://github.com/alexwboles/applypilot-ai) | Job application tracker: applications, follow-ups and interview prep | $8/mo |

## Food

| Product | What it does | Price |
|---------|--------------|-------|
| [menucraft-ai](https://github.com/alexwboles/menucraft-ai) | Menu copywriter + food-cost/margin calculator for restaurants | $8/mo |
| [recipebox-ai](https://github.com/alexwboles/recipebox-ai) | Recipe box: save, organize and plan meals from your recipes | $6/mo |

## Health & habits

| Product | What it does | Price |
|---------|--------------|-------|
| [fitnessplan-ai](https://github.com/alexwboles/fitnessplan-ai) | Personal workout plans built around your goals and gear | $8/mo |
| [medtrack-ai](https://github.com/alexwboles/medtrack-ai) | Medication tracker: schedules, refills and adherence | $6/mo |
| [habitloop-ai](https://github.com/alexwboles/habitloop-ai) | Habit tracker with streaks and gentle accountability | $6/mo |
| [babytracker-ai](https://github.com/alexwboles/babytracker-ai) | Baby tracker: feeds, naps, diapers and milestones logged simply | $6/mo |

## Trips & events

| Product | What it does | Price |
|---------|--------------|-------|
| [travelpack-ai](https://github.com/alexwboles/travelpack-ai) | Packing lists tailored to your trip | $6/mo |
| [roadtrip-ai](https://github.com/alexwboles/roadtrip-ai) | Road trip planner: routes, stops and packing lists | $6/mo |
| [partyplan-ai](https://github.com/alexwboles/partyplan-ai) | Party planner: guest lists, timelines and checklists | $6/mo |
| [weddingplan-ai](https://github.com/alexwboles/weddingplan-ai) | Wedding planner: budget, vendors and timelines | $8/mo |
| [bucketlist-ai](https://github.com/alexwboles/bucketlist-ai) | Bucket list planner: dream it, plan it, check it off | $6/mo |

## Personal

| Product | What it does | Price |
|---------|--------------|-------|
| [journalpilot-ai](https://github.com/alexwboles/journalpilot-ai) | Guided journaling with prompts and reflection | $6/mo |
| [wardrobe-ai](https://github.com/alexwboles/wardrobe-ai) | Wardrobe planner: outfits from what you own | $6/mo |
| [speechwriter-ai](https://github.com/alexwboles/speechwriter-ai) | Speech writer: vows, toasts and talks that land | $8/mo |
| [studyflow-ai](https://github.com/alexwboles/studyflow-ai) | Spaced-repetition exam planner | $8/mo |
| [giftgenius-ai](https://github.com/alexwboles/giftgenius-ai) | Gift ideas matched to people + occasions | Free |

## Pricing

**Life OS bundle:** $30/mo separately → **$19/mo** for the original five (NestLife, BudgetLens, HomeKeeper, StudyFlow — GiftGenius stays free). You keep $11/mo.

Everything else is priced individually, from free to $12/mo. There's no mega-bundle: you only pay for the tools you actually use.

## Run it

No build step, no dependencies, no accounts. Just open `index.html` in a browser — or serve it statically:

```bash
cd life-hub
python3 -m http.server 8080
# open http://localhost:8080
```

## What's inside

- `index.html` — page structure (hero, themed product sections, weekly narrative, bundle, principles)
- `css/style.css` — warm, calm personal-life theme
- `js/data.js` — product catalogue + sections + weekly narrative + bundle math (UMD: shared by browser and Node so tests exercise the same logic)
- `js/app.js` — renders everything from `data.js`
- `test/smoke.sh`, `test/e2e.sh` — tests, all green before release

## Principles

- **Local-first** — family data stays on your devices.
- **Calm by design** — plain language, gentle nudges.
- **Independent** — bundles offered, never forced.
- **Honest pricing** — free tiers that are actually useful.
