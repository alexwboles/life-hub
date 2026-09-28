#!/usr/bin/env bash
# Life Hub smoke tests — quick structural + logic checks.
set -u
cd "$(dirname "$0")/.." || exit 1
PASS=0; FAIL=0
ok()   { PASS=$((PASS+1)); echo "PASS: $1"; }
bad()  { FAIL=$((FAIL+1)); echo "FAIL: $1"; }

# 1-5: required files exist
for f in index.html css/style.css js/data.js js/app.js README.md; do
  if [ -f "$f" ]; then ok "file exists: $f"; else bad "file exists: $f"; fi
done

# 6: JS syntax valid
if node --check js/data.js && node --check js/app.js; then
  ok "node --check on both JS files"
else
  bad "node --check on both JS files"
fi

# 7+: data-logic assertions via Node (same module the browser uses)
node -e '
const D = require("./js/data.js");
const assert = require("assert");
let n = 0;
const t = (name, cond) => { n++; if (!cond) { console.error("FAIL: " + name); process.exit(1); } console.log("PASS: " + name); };

t("29 products", D.PRODUCTS.length === 29);
const slugs = D.PRODUCTS.map(p => p.slug).sort();
t("all 29 slugs present",
  JSON.stringify(slugs) === JSON.stringify(["apartmenthunt-ai","applypilot-ai","babytracker-ai","bucketlist-ai","budgetlens-ai","debtpayoff-ai","fitnessplan-ai","gardenplan-ai","giftgenius-ai","habitloop-ai","hearth-ai","homeinventory-ai","homekeeper-ai","journalpilot-ai","medtrack-ai","menucraft-ai","movingcheck-ai","nestlife-ai","partyplan-ai","recipebox-ai","roadtrip-ai","roommatesplit-ai","sidehustle-ai","speechwriter-ai","studyflow-ai","taxprep-ai","travelpack-ai","wardrobe-ai","weddingplan-ai"]));
t("repo URLs well-formed",
  D.PRODUCTS.every(p => p.repoUrl === "https://github.com/alexwboles/" + p.slug));
t("7 sections", D.SECTIONS.length === 7);
t("section keys match spec",
  JSON.stringify(D.SECTIONS.map(s => s.key)) === JSON.stringify(["hearth","home","money","food","health","trips","personal"]));
t("every product has a valid section",
  D.PRODUCTS.every(p => D.SECTIONS.some(s => s.key === p.section)));
t("every section has products",
  D.SECTIONS.every(s => D.productsInSection(s.key).length > 0));
t("section sizes match spec",
  D.productsInSection("hearth").length === 1 &&
  D.productsInSection("home").length === 7 &&
  D.productsInSection("money").length === 5 &&
  D.productsInSection("food").length === 2 &&
  D.productsInSection("health").length === 4 &&
  D.productsInSection("trips").length === 5 &&
  D.productsInSection("personal").length === 5);
t("bundle covers original five only",
  JSON.stringify(D.BUNDLE_SLUGS.slice().sort()) === JSON.stringify(["budgetlens-ai","giftgenius-ai","homekeeper-ai","nestlife-ai","studyflow-ai"]));
t("bundle math: 8+8+6+8+0=30", D.separateTotal() === 30);
t("bundle price 19", D.bundlePrice() === 19);
t("bundle savings 11", D.bundleSavings() === 11);
t("grand total 196", D.grandTotal() === 196);
t("hearth is the front-door flagship",
  D.getProduct("hearth-ai").section === "hearth" && D.getProduct("hearth-ai").price === 12);
t("original five keep prices and copy",
  D.getProduct("nestlife-ai").price === 8 &&
  D.getProduct("budgetlens-ai").price === 8 &&
  D.getProduct("homekeeper-ai").price === 6 &&
  D.getProduct("studyflow-ai").price === 8 &&
  D.getProduct("giftgenius-ai").price === 0 &&
  D.getProduct("giftgenius-ai").priceLabel === "Free" &&
  D.getProduct("nestlife-ai").tagline === "The family command center");
t("weekly narrative has 7 days", D.WEEK.length === 7);
t("every product has 3 features", D.PRODUCTS.every(p => p.features.length === 3));
t("only giftgenius is free",
  D.PRODUCTS.filter(p => p.price === 0).map(p => p.slug).join(",") === "giftgenius-ai");
t("prices are non-negative numbers",
  D.PRODUCTS.every(p => typeof p.price === "number" && p.price >= 0));
console.log("node assertions: " + n + " passed");
' || bad "node data assertions"
[ $? -eq 0 ] && ok "node data assertions block"

# hero copy present
if grep -q "Run your household like it runs itself" index.html; then
  ok "hero copy present"
else
  bad "hero copy present"
fi

echo "---"
echo "smoke: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
