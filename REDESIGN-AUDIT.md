# Redesign Audit — life-hub ("The Hearth Ledger")
Date: 2026-10-13 · Worker: batch-hubs

## Competitors researched
1. **Notion personal dashboards (Personal OS / LifeOS templates)** — two-column layout: sidebar with life-score + quick links, main area with gallery cards per life area; warm minimal aesthetic.
2. **Mint dashboard** — net-worth hero number, category budget bars, calm blue-green money language, tabular figures.
3. **Notionland ULTRA OS** — 28-template dashboard: sectioned planner with daily/weekly/monthly rhythm, calm copy.

## Visual gaps (current state)
- Generic warm theme but flat: plain section headers, uniform white cards, default sans — reads as a template, not a "calm personal OS".
- 29 products across 7 sections with no chapter identity; sections blur together.
- The weekly narrative is a plain vertical list — Notion planners render the week as a spread/rhythm.
- Bundle card is a generic price box; Mint-style ledger language (separate total, bundle price, "you keep") is there but visually flat.
- No visual hierarchy between Hearth (the front door) and the rest.

## Functional gaps (vs competitors)
- **No chapter navigation.** 29 products = a long scroll with no way to jump. Notion dashboards all have a sidebar index. A sticky chapter nav with scrollspy is the missing competitor-grade pattern.
- Starter quiz exists but the result is plain text; recommended cards get a subtle class with no payoff.
- Compare tray is unstyled chips; the table is plain.
- Shortlist exists but has no presence in the header (count only in its own section).

## Flow gaps
- "Start with a starter pack" → cards highlight → user still has to scroll and hunt for the highlighted cards. The quiz should scroll to the first pick (it does) but the highlight is weak.
- Builder's quote is honest but buried; the "your stack" total deserves ledger-style emphasis.

## Plan (this redesign)
1. **Identity: "The Hearth Ledger"** — warm paper journal. Cream paper (#f8f3e8), ink-brown (#2b251d), one terracotta accent (#b4552d). Georgia serif headlines, double-rule chapter dividers with roman numerals, calm generous spacing. Sharp corners.
2. **Chapter nav (new):** sticky index bar — Hearth · Home · Money · Food · Health · Trips · Personal — with scrollspy active state; jumps to chapters.
3. **Hearth chapter** as the front door: larger feature card, conversational framing.
4. **Week spread:** the 7-day narrative as a planner spread (day columns with the product chip inline).
5. **Ledger bundle card:** tabular figures, "à la carte → bundle → you keep" three-column ledger.
6. **Starter quiz** as a "find your rhythm" console; recommended cards get a terracotta "STARTER PICK" ribbon.
7. Keep hero headline "Run your household like it runs itself" (test contract).

## Preserved (must not regress)
- All section IDs the tests require (starter, starter-picks, starter-result, search, section-filter, result-count, builder, pick-list, stack-quote, shortlist, shortlist-list, copy-stack-link, compare, compare-tray, compare-table) + app.js markers (lifehub.favorites, toggleFavorite, renderShortlist, MAX_COMPARE = 3, renderCompareTable, stackFromHash(window.location.hash), copy-stack-link, navigator.clipboard, card-actions, aria-pressed, "if (!grid) return", "if (!list) return").
- Starter-pack quiz, search + section filter, product cards (badge/name/tagline/oneliner/features/GitHub/save/compare), shortlist, compare tray + table (max 3), weekly narrative, bundle math, stack builder + quote + shareable hash.
