/* Life Hub — renders product cards, the weekly narrative, and bundle math from LifeHubData. */
(function () {
  var D = window.LifeHubData;
  if (!D) return;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
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
    D.PRODUCTS.forEach(function (p) {
      var label = el("label", "pick");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.value = p.slug;
      box.addEventListener("change", renderStackQuote);
      label.appendChild(box);
      label.appendChild(el("span", "pick-name", p.name));
      label.appendChild(el("span", "pick-price", p.priceLabel));
      list.appendChild(label);
    });
    renderStackQuote();
  }

  function renderStackQuote() {
    var boxes = document.querySelectorAll("#pick-list input[type=checkbox]:checked");
    var slugs = Array.prototype.map.call(boxes, function (b) { return b.value; });
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
    renderWeek();
    renderBundle();
    renderBuilder();
  });
})();
