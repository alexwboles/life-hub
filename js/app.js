/* Life Hub — renders product cards, the weekly narrative, and bundle math from LifeHubData. */
(function () {
  var D = window.LifeHubData;
  if (!D) return;

  var FAV_KEY = "lifehub.favorites";
  var compareSlugs = [];
  var MAX_COMPARE = 3;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* --- favorites (shortlist) ------------------------------------------------ */
  function loadFavorites() {
    try {
      var raw = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      return raw.filter(function (s) { return !!D.getProduct(s); });
    } catch (e) { return []; }
  }
  function saveFavorites(list) {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }
  var favorites = loadFavorites();

  function isFavorite(slug) { return favorites.indexOf(slug) !== -1; }
  function toggleFavorite(slug) {
    var i = favorites.indexOf(slug);
    if (i === -1) favorites.push(slug);
    else favorites.splice(i, 1);
    saveFavorites(favorites);
    renderProducts();
    renderShortlist();
  }

  function renderShortlist() {
    var sec = document.getElementById("shortlist");
    var list = document.getElementById("shortlist-list");
    if (!sec || !list) return;
    list.innerHTML = "";
    if (!favorites.length) { sec.style.display = "none"; return; }
    sec.style.display = "";
    document.getElementById("shortlist-count").textContent =
      favorites.length + (favorites.length === 1 ? " product" : " products");
    favorites.forEach(function (slug) {
      var p = D.getProduct(slug);
      if (!p) return;
      var row = el("div", "short-row");
      row.appendChild(el("span", "short-name", p.name));
      row.appendChild(el("span", "short-price", p.priceLabel));
      var go = el("a", "short-go", "Open →");
      go.href = "#card-" + p.slug;
      row.appendChild(go);
      var rm = el("button", "short-remove", "Remove");
      rm.type = "button";
      rm.setAttribute("aria-label", "Remove " + p.name + " from shortlist");
      (function (s) {
        rm.addEventListener("click", function () { toggleFavorite(s); });
        go.addEventListener("click", function () {
          var card = document.getElementById("card-" + s);
          if (card) setTimeout(function () {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 50);
        });
      })(slug);
      row.appendChild(rm);
      list.appendChild(row);
    });
  }

  /* --- product compare (up to 3) -------------------------------------------- */
  function toggleCompare(slug) {
    var i = compareSlugs.indexOf(slug);
    if (i === -1) {
      if (compareSlugs.length >= MAX_COMPARE) return;
      compareSlugs.push(slug);
    } else {
      compareSlugs.splice(i, 1);
    }
    renderProducts();
    renderCompareTray();
  }

  function renderCompareTray() {
    var tray = document.getElementById("compare-tray");
    var tableBox = document.getElementById("compare-table");
    if (!tray || !tableBox) return;
    tray.innerHTML = "";
    tableBox.innerHTML = "";
    if (!compareSlugs.length) {
      tray.appendChild(el("p", "compare-hint",
        "Pick up to three products with the Compare button on any card."));
      return;
    }
    compareSlugs.forEach(function (slug) {
      var p = D.getProduct(slug);
      if (!p) return;
      var chip = el("span", "compare-chip", p.name);
      var x = el("button", "compare-chip-x", "✕");
      x.type = "button";
      x.setAttribute("aria-label", "Remove " + p.name + " from comparison");
      (function (s) { x.addEventListener("click", function () { toggleCompare(s); }); })(slug);
      chip.appendChild(x);
      tray.appendChild(chip);
    });
    if (compareSlugs.length >= 2) {
      var go = el("button", "compare-go", "Compare " + compareSlugs.length + " products");
      go.type = "button";
      go.addEventListener("click", renderCompareTable);
      tray.appendChild(go);
    } else {
      tray.appendChild(el("p", "compare-hint", "Pick at least one more to compare side by side."));
    }
    var clear = el("button", "compare-clear", "Clear");
    clear.type = "button";
    clear.addEventListener("click", function () {
      compareSlugs = [];
      renderProducts();
      renderCompareTray();
    });
    tray.appendChild(clear);
  }

  function renderCompareTable() {
    var tableBox = document.getElementById("compare-table");
    if (!tableBox) return;
    var t = D.compareTable(compareSlugs);
    if (t.products.length < 2) return;
    var table = el("table", "compare-table-el");
    var head = document.createElement("tr");
    head.appendChild(el("th", null, ""));
    t.products.forEach(function (p) {
      var th = el("th", null, p.name);
      head.appendChild(th);
    });
    table.appendChild(head);
    t.rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.appendChild(el("th", "row-label", r.label));
      r.cells.forEach(function (c) { tr.appendChild(el("td", null, c)); });
      table.appendChild(tr);
    });
    tableBox.innerHTML = "";
    tableBox.appendChild(table);
    tableBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function productCard(p) {
    var card = el("article", "card");

    var badge = el("span", "card-badge", p.priceLabel);
    card.appendChild(badge);

    card.appendChild(el("h3", "card-name", p.name));
    card.appendChild(el("p", "card-tagline", p.tagline));
    card.appendChild(el("p", "card-oneliner", p.oneliner));

    var ul = el("ul", "card-features");
    p.features.forEach(function (f) {
      ul.appendChild(el("li", null, f));
    });
    card.appendChild(ul);

    var link = el("a", "card-link", "View on GitHub →");
    link.href = p.repoUrl;
    link.target = "_blank";
    link.rel = "noopener";
    card.appendChild(link);

    var actions = el("div", "card-actions");

    var save = el("button", "card-btn" + (isFavorite(p.slug) ? " saved" : ""), null);
    save.type = "button";
    save.setAttribute("aria-pressed", isFavorite(p.slug) ? "true" : "false");
    save.textContent = isFavorite(p.slug) ? "Saved ✓" : "Save";
    (function (slug) {
      save.addEventListener("click", function () { toggleFavorite(slug); });
    })(p.slug);
    actions.appendChild(save);

    var inCompare = compareSlugs.indexOf(p.slug) !== -1;
    var cmp = el("button", "card-btn" + (inCompare ? " compared" : ""), null);
    cmp.type = "button";
    cmp.setAttribute("aria-pressed", inCompare ? "true" : "false");
    cmp.textContent = inCompare ? "Comparing ✓" : "Compare";
    if (!inCompare && compareSlugs.length >= MAX_COMPARE) cmp.disabled = true;
    (function (slug) {
      cmp.addEventListener("click", function () { toggleCompare(slug); });
    })(p.slug);
    actions.appendChild(cmp);

    card.appendChild(actions);

    return card;
  }

  function renderProducts() {
    var grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = "";
    var q = document.getElementById("search").value;
    var sec = document.getElementById("section-filter").value;
    var matches = D.searchProducts(q, sec);
    var shown = 0;
    D.SECTIONS.forEach(function (s) {
      var items = matches.filter(function (p) { return p.section === s.key; });
      if (!items.length) return;
      var block = el("div", "section-block");
      block.appendChild(el("h3", "section-title", s.title));
      if (s.sub) block.appendChild(el("p", "section-sub-line", s.sub));
      var row = el("div", "grid");
      items.forEach(function (p) {
        shown++;
        var card = productCard(p);
        card.id = "card-" + p.slug;
        if (starterSlugs && starterSlugs.indexOf(p.slug) !== -1) {
          card.className += " starter-pick";
        }
        row.appendChild(card);
      });
      block.appendChild(row);
      grid.appendChild(block);
    });
    var rc = document.getElementById("result-count");
    if (rc) rc.textContent = shown === D.PRODUCTS.length
      ? "Showing all " + shown + " products."
      : "Showing " + shown + " of " + D.PRODUCTS.length + " products.";
  }

  /* --- starter-pack quiz ------------------------------------------------- */
  var starterSlugs = null;

  function renderStarter() {
    var wrap = document.getElementById("starter-picks");
    if (!wrap) return;
    D.STARTERS.forEach(function (s) {
      var b = el("button", "starter-btn", s.label);
      b.type = "button";
      b.title = s.blurb;
      b.addEventListener("click", function () { pickStarter(s.key); });
      wrap.appendChild(b);
    });
  }

  function pickStarter(key) {
    var res = D.starterPack(key);
    starterSlugs = res.products.map(function (p) { return p.slug; });
    var btns = document.querySelectorAll("#starter-picks .starter-btn");
    Array.prototype.forEach.call(btns, function (b) {
      b.classList.toggle("active", b.textContent === res.profile.label);
    });
    document.getElementById("starter-result").textContent =
      res.profile.label + ": " + res.profile.blurb + " Start with " +
      res.products.map(function (p) { return p.name; }).join(", ") + ".";
    renderProducts();
    var first = document.getElementById("card-" + starterSlugs[0]);
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* --- toolbar: search + section filter ---------------------------------- */
  function renderFilters() {
    var sel = document.getElementById("section-filter");
    if (!sel) return;
    D.SECTIONS.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s.key;
      o.textContent = s.title;
      sel.appendChild(o);
    });
    document.getElementById("search").addEventListener("input", renderProducts);
    sel.addEventListener("change", renderProducts);
  }

  /* --- build-your-stack quote -------------------------------------------- */
  function renderBuilder() {
    var list = document.getElementById("pick-list");
    if (!list) return;
    var fromHash = D.stackFromHash(window.location.hash);
    D.PRODUCTS.forEach(function (p) {
      var label = el("label", "pick");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.value = p.slug;
      if (fromHash.indexOf(p.slug) !== -1) box.checked = true;
      box.addEventListener("change", renderStackQuote);
      label.appendChild(box);
      label.appendChild(el("span", "pick-name", p.name));
      label.appendChild(el("span", "pick-price", p.priceLabel));
      list.appendChild(label);
    });
    renderStackQuote();
  }

  function selectedSlugs() {
    var boxes = document.querySelectorAll("#pick-list input[type=checkbox]:checked");
    return Array.prototype.map.call(boxes, function (b) { return b.value; });
  }

  function renderStackQuote() {
    var slugs = selectedSlugs();
    var q = D.quoteStack(slugs);
    var box = document.getElementById("stack-quote");
    box.innerHTML = "";
    box.appendChild(el("div", "quote-line",
      q.count + " picked · à la carte $" + q.separate + "/mo"));
    if (q.bundleApplies) {
      box.appendChild(el("div", "quote-line",
        "Life OS bundle applied: -$" + q.bundleDiscount + "/mo"));
    }
    if (q.count > 0) {
      box.appendChild(el("div", "quote-line quote-total",
        "Your stack: $" + q.effective + "/mo"));
    }
    box.appendChild(el("p", "quote-verdict" + (q.bundleApplies ? " bundle-wins" : ""), q.verdict));

    // Shareable link: the picked stack encoded in the URL hash.
    var copyBtn = document.getElementById("copy-stack-link");
    if (copyBtn) {
      var hash = D.stackToHash(slugs);
      if (slugs.length) {
        copyBtn.style.display = "";
        copyBtn.onclick = function () {
          var url = window.location.origin + window.location.pathname + hash;
          var done = function () {
            copyBtn.textContent = "Link copied ✓";
            setTimeout(function () { copyBtn.textContent = "Copy stack link"; }, 2000);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(done, function () { fallbackCopy(url, done); });
          } else {
            fallbackCopy(url, done);
          }
        };
      } else {
        copyBtn.style.display = "none";
      }
    }
  }

  function fallbackCopy(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (e) { /* clipboard unavailable */ }
    done();
  }

  function renderWeek() {
    var list = document.getElementById("week-list");
    if (!list) return;
    D.WEEK.forEach(function (w) {
      var item = el("div", "week-item");

      var head = el("div", "week-head");
      head.appendChild(el("span", "week-day", w.day));
      if (w.product) {
        var p = D.getProduct(w.product);
        if (p) head.appendChild(el("span", "week-product", p.name));
      }
      item.appendChild(head);

      item.appendChild(el("h4", "week-title", w.title));
      item.appendChild(el("p", "week-body", w.body));
      list.appendChild(item);
    });
  }

  function renderBundle() {
    var sep = document.getElementById("bundle-separate");
    var bun = document.getElementById("bundle-price");
    var sav = document.getElementById("bundle-save");
    if (sep) sep.textContent = "$" + D.separateTotal() + "/mo";
    if (bun) bun.textContent = "$" + D.bundlePrice() + "/mo";
    if (sav) sav.textContent = "You keep $" + D.bundleSavings() + "/mo";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderStarter();
    renderFilters();
    renderProducts();
    renderShortlist();
    renderCompareTray();
    renderWeek();
    renderBundle();
    renderBuilder();
  });
})();
