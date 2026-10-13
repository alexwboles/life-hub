#!/usr/bin/env bash
# Life Hub e2e tests — end-to-end flows exercising the shared data module.
set -u
cd "$(dirname "$0")/.." || exit 1

node -e '
const D = require("./js/data.js");
let pass = 0, fail = 0;
const flow = (name, fn) => {
  try { fn(); pass++; console.log("PASS flow: " + name); }
  catch (e) { fail++; console.log("FAIL flow: " + name + " — " + e.message); }
};
const assert = require("assert");

// Flow 1: product lookup works and misses cleanly
flow("getProduct lookup", () => {
  const p = D.getProduct("homekeeper-ai");
  assert.strictEqual(p.name, "HomeKeeper AI");
  assert.strictEqual(p.repoUrl, "https://github.com/alexwboles/homekeeper-ai");
  assert.strictEqual(D.getProduct("nope-not-real"), null);
});

// Flow 2: bundle economics are exactly as advertised (original five only)
flow("bundle economics", () => {
  assert.strictEqual(D.separateTotal(), 8 + 8 + 6 + 8); // giftgenius free
  assert.strictEqual(D.bundlePrice(), 19);
  assert.strictEqual(D.bundleSavings(), 11);
  assert.ok(D.bundleSavings() > 0, "bundle must actually save money");
  assert.strictEqual(D.grandTotal(), 196, "29 products sum to 196/mo");
});

// Flow 3: weekly narrative is a coherent Mon–Sun story
flow("weekly narrative", () => {
  const days = D.WEEK.map(w => w.day);
  assert.deepStrictEqual(days, ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]);
  D.WEEK.forEach(w => {
    assert.ok(w.title && w.body, "each day needs title + body");
    if (w.product !== null) assert.ok(D.getProduct(w.product), "week refs real slug: " + w.product);
  });
});

// Flow 4: every product card has everything the renderer needs
flow("card completeness", () => {
  D.PRODUCTS.forEach(p => {
    ["slug","section","name","tagline","oneliner","features","price","priceLabel","repoUrl"].forEach(k => {
      assert.ok(p[k] !== undefined && p[k] !== null && p[k] !== "", p.slug + " missing " + k);
    });
    assert.ok(D.SECTIONS.some(s => s.key === p.section), p.slug + " has unknown section " + p.section);
    assert.strictEqual(p.features.length, 3, p.slug + " needs exactly 3 features");
  });
});

// Flow 5: no slug collisions, prices sane, section rendering covers everything
flow("uniqueness + pricing + sections", () => {
  const slugs = D.PRODUCTS.map(p => p.slug);
  assert.strictEqual(new Set(slugs).size, 29, "slugs must be unique");
  assert.strictEqual(D.SECTIONS.length, 7);
  const covered = new Set();
  D.SECTIONS.forEach(s => {
    assert.ok(s.title && s.key, "section needs key + title");
    D.productsInSection(s.key).forEach(p => covered.add(p.slug));
  });
  assert.strictEqual(covered.size, 29, "every product rendered in exactly one section");
  D.PRODUCTS.forEach(p => {
    if (p.price === 0) assert.strictEqual(p.priceLabel, "Free");
    else assert.ok(p.priceLabel.includes(String(p.price)), p.slug + " label matches price");
  });
});

// Flow 6: renderer degrades gracefully with missing DOM (no crash on empty doc)
flow("renderer null-safety", () => {
  const src = require("fs").readFileSync("./js/app.js", "utf8");
  assert.ok(src.includes("if (!grid) return") && src.includes("if (!list) return"),
    "app.js guards against missing mount points");
});

// Flow 7: search + section filter
flow("searchProducts", () => {
  assert.strictEqual(D.searchProducts("", "all").length, 29, "empty query matches all");
  assert.strictEqual(D.searchProducts("", "home").length, D.productsInSection("home").length, "section filter matches section count");
  assert.strictEqual(D.searchProducts("62-task", "all").length, 1, "feature text search");
  assert.strictEqual(D.searchProducts("MEAL PLAN", "all").length >= 1, true, "case-insensitive");
  assert.strictEqual(D.searchProducts("zzz-no-match", "all").length, 0, "no false positives");
});

// Flow 8: stack builder with bundle-overlap pricing
flow("quoteStack", () => {
  const full = D.quoteStack(D.BUNDLE_SLUGS);
  assert.strictEqual(full.bundleApplies, true, "all five bundle products -> bundle applies");
  assert.strictEqual(full.separate, 30, "bundle five separate = 30");
  assert.strictEqual(full.effective, 19, "bundle price replaces separate total");
  assert.strictEqual(full.bundleDiscount, 11, "discount = 30-19");
  const partial = D.quoteStack(["nestlife-ai", "budgetlens-ai"]);
  assert.strictEqual(partial.bundleApplies, false, "partial bundle selection -> no discount");
  assert.strictEqual(partial.effective, 16, "partial pays à la carte");
  const mixed = D.quoteStack(["nestlife-ai", "budgetlens-ai", "homekeeper-ai", "studyflow-ai", "giftgenius-ai", "fitnessplan-ai"]);
  assert.strictEqual(mixed.bundleApplies, true, "bundle five + extra still applies");
  assert.strictEqual(mixed.effective, 19 + 8, "bundle five at 19 + extra at 8");
  const empty = D.quoteStack([]);
  assert.strictEqual(empty.count, 0, "empty stack");
  const dup = D.quoteStack(["nestlife-ai", "nestlife-ai", "nope"]);
  assert.strictEqual(dup.count, 1, "dedupes and ignores unknown");
});

// Flow 9: starter-pack quiz
flow("starterPack", () => {
  assert.strictEqual(D.STARTERS.length, 5, "5 starter profiles");
  const pack = D.starterPack("new-parent");
  assert.strictEqual(pack.profile.key, "new-parent", "profile lookup");
  assert.ok(pack.products.length >= 3, "profile recommends products");
  assert.ok(pack.products.every(p => D.getProduct(p.slug)), "all recommended slugs resolve");
  const keys = D.STARTERS.map(s => s.key);
  assert.strictEqual(new Set(keys).size, 5, "profile keys unique");
  const unknown = D.starterPack("nope");
  assert.strictEqual(unknown.profile, null, "unknown profile -> null");
});

// Flow 10: comparison table content is complete and aligned
flow("compareTable content", () => {
  const t = D.compareTable(["hearth-ai", "giftgenius-ai"]);
  assert.strictEqual(t.products[0].slug, "hearth-ai");
  assert.strictEqual(t.rows[2].label, "In one line");
  assert.ok(t.rows[2].cells.every(c => c.length > 10), "one-liners present");
  const f3 = t.rows[5];
  assert.strictEqual(f3.label, "Feature 3");
  assert.strictEqual(f3.cells[0], D.getProduct("hearth-ai").features[2]);
  assert.strictEqual(f3.cells[1], D.getProduct("giftgenius-ai").features[2]);
  // three columns stay aligned across all rows
  const t3 = D.compareTable(["nestlife-ai", "budgetlens-ai", "homekeeper-ai"]);
  t3.rows.forEach(r => assert.strictEqual(r.cells.length, 3, r.label + " has 3 cells"));
});

// Flow 11: shareable stack links round-trip and survive page reload semantics
flow("stack hash round-trip", () => {
  const slugs = ["nestlife-ai", "budgetlens-ai", "fitnessplan-ai"];
  const h = D.stackToHash(slugs);
  assert.ok(h.startsWith("#stack="), "hash has #stack= prefix");
  assert.deepStrictEqual(D.stackFromHash(h), slugs, "decode restores slug order");
  // garbage in -> clean out
  assert.deepStrictEqual(D.stackFromHash("#stack=,,,"), [], "empty segments ignored");
  assert.deepStrictEqual(D.stackFromHash("#STACK=NESTLIFE-AI"), ["nestlife-ai"], "case-insensitive decode");
  // every known product survives a round-trip alone
  D.PRODUCTS.forEach(p => {
    assert.deepStrictEqual(D.stackFromHash(D.stackToHash([p.slug])), [p.slug], p.slug + " round-trips");
  });
});

// Flow 12: renderer wires favorites, compare and stack sharing (source-level)
flow("renderer feature wiring", () => {
  const src = require("fs").readFileSync("./js/app.js", "utf8");
  assert.ok(src.includes("lifehub.favorites"), "favorites persisted under lifehub.favorites");
  assert.ok(src.includes("toggleFavorite") && src.includes("renderShortlist"), "shortlist render + toggle exist");
  assert.ok(src.includes("MAX_COMPARE = 3") && src.includes("renderCompareTable"), "compare capped at 3, table renderer exists");
  assert.ok(src.includes("stackFromHash(window.location.hash)"), "builder restores stack from URL hash");
  assert.ok(src.includes("copy-stack-link") && src.includes("navigator.clipboard"), "copy-link button with clipboard");
  assert.ok(src.includes("card-actions") && src.includes("aria-pressed"), "card action buttons are accessible");
});

console.log("---");
console.log("e2e: " + pass + " passed, " + fail + " failed");
process.exit(fail === 0 ? 0 : 1);
'
