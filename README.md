# Life Hub — Personal Life OS

One calm dashboard for five independent AI products that help you run your household and life: **food, money, home, learning, gifting**.

> A portfolio, not a suite. Each product stands alone and works on its own. The hub just makes them easy to find — and offers one honest bundle where it makes sense.

## The five

| Product | What it does | Price |
|---------|--------------|-------|
| [nestlife-ai](https://github.com/alexwboles/nestlife-ai) | Family organizer: meal plans, groceries, bills, chores | $8/mo |
| [budgetlens-ai](https://github.com/alexwboles/budgetlens-ai) | Bank CSV → spending insights + subscription finder | $8/mo |
| [homekeeper-ai](https://github.com/alexwboles/homekeeper-ai) | Seasonal home maintenance plan + reminders | $6/mo |
| [studyflow-ai](https://github.com/alexwboles/studyflow-ai) | Spaced-repetition exam planner | $8/mo |
| [giftgenius-ai](https://github.com/alexwboles/giftgenius-ai) | Gift ideas matched to people + occasions | Free |

**Life OS bundle:** $30/mo separately → **$19/mo** for all five (GiftGenius stays free). You keep $11/mo.

## Run it

No build step, no dependencies, no accounts. Just open `index.html` in a browser — or serve it statically:

```bash
cd life-hub
python3 -m http.server 8080
# open http://localhost:8080
```

## What's inside

- `index.html` — page structure (hero, products, weekly narrative, bundle, principles)
- `css/style.css` — warm, calm personal-life theme
- `js/data.js` — product catalogue + weekly narrative + bundle math (UMD: shared by browser and Node so tests exercise the same logic)
- `js/app.js` — renders everything from `data.js`
- `test/smoke.sh`, `test/e2e.sh` — tests, all green before release

## Principles

- **Local-first** — family data stays on your devices.
- **Calm by design** — plain language, gentle nudges.
- **Independent** — bundles offered, never forced.
- **Honest pricing** — free tiers that are actually useful.
