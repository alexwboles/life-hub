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
    D.SECTIONS.forEach(function (s) {
      var items = D.productsInSection(s.key);
      if (!items.length) return;
      var block = el("div", "section-block");
      block.appendChild(el("h3", "section-title", s.title));
      if (s.sub) block.appendChild(el("p", "section-sub-line", s.sub));
      var row = el("div", "grid");
      items.forEach(function (p) {
        row.appendChild(productCard(p));
      });
      block.appendChild(row);
      grid.appendChild(block);
    });
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
    renderProducts();
    renderWeek();
    renderBundle();
  });
})();
