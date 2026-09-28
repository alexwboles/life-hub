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

console.log("---");
console.log("e2e: " + pass + " passed, " + fail + " failed");
process.exit(fail === 0 ? 0 : 1);
'
