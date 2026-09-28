(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.LifeHubData = factory();
  }
}(typeof self !== "undefined" ? self : this, function () {

  var BASE = "https://github.com/alexwboles/";

  var PRODUCTS = [
    {
      slug: "nestlife-ai",
      name: "NestLife AI",
      tagline: "The family command center",
      oneliner: "Meal plans, groceries, bills and chores in one calm place.",
      features: [
        "7-day meal planner from a 36-recipe bank (diet + budget aware)",
        "Auto-aggregated grocery list with check-off and cost estimates",
        "Plain-language bill nudges and a fair weekly chore rotation"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "budgetlens-ai",
      name: "BudgetLens AI",
      tagline: "See where your money goes",
      oneliner: "Drop in a bank CSV, get spending clarity and find forgotten subscriptions.",
      features: [
        "12-category AI categorization with confidence flags",
        "Subscription detector with yearly-cost 'cancel candidate' math",
        "Plain-language savings nudges — 100% in your browser, nothing uploaded"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "homekeeper-ai",
      name: "HomeKeeper AI",
      tagline: "Never miss home maintenance again",
      oneliner: "A personalized 12-month maintenance calendar for your home.",
      features: [
        "62-task rule bank matched to your home's type, heating and climate",
        "Cost-of-neglect notes in plain language ('a $5 filter vs a $400 repair')",
        "This-month view with check-offs and a streak counter"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "studyflow-ai",
      name: "StudyFlow AI",
      tagline: "Study once, remember it",
      oneliner: "Spaced-repetition exam planner that adapts to how you recall.",
      features: [
        "SM-2-inspired scheduler: Again / Hard / Good / Easy ratings move reviews",
        "Reviews-only taper in the final 2 days — no cramming",
        "Per-subject readiness % and consecutive-day streaks"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "giftgenius-ai",
      name: "GiftGenius AI",
      tagline: "Never panic about gifts again",
      oneliner: "Gift ideas matched to the people you love and the occasions ahead.",
      features: [
        "152-idea bank scored by interests, age fit and budget",
        "Occasion countdowns with gentle 'order soon' nudges",
        "No-repeat memory: bought and hidden gifts stay remembered"
      ],
      price: 0,
      priceLabel: "Free"
    }
  ];

  PRODUCTS.forEach(function (p) {
    p.repoUrl = BASE + p.slug;
  });

  var WEEK = [
    {
      day: "Monday",
      title: "Dinner is already decided",
      body: "NestLife builds your 7-day meal plan around your diet and budget. The grocery list writes itself — you just shop.",
      product: "nestlife-ai"
    },
    {
      day: "Tuesday",
      title: "Bills handled before they're late",
      body: "\"Electric is due in 3 days ($85).\" NestLife nudges you in plain language, so late fees stop happening.",
      product: "nestlife-ai"
    },
    {
      day: "Wednesday",
      title: "Found money",
      body: "BudgetLens scans your bank CSV and flags the $15.49/mo streaming sub you forgot. That's $185.88 a year back.",
      product: "budgetlens-ai"
    },
    {
      day: "Thursday",
      title: "Five minutes saves $400",
      body: "HomeKeeper reminds you: change the furnace filter. A $5 filter beats a $250–$600 blower repair.",
      product: "homekeeper-ai"
    },
    {
      day: "Friday",
      title: "Study session, zero planning",
      body: "StudyFlow queues exactly what to review today, spaced so it sticks. Your readiness % climbs without cramming.",
      product: "studyflow-ai"
    },
    {
      day: "Saturday",
      title: "Birthday? Already sorted",
      body: "GiftGenius knew Maya's birthday was 12 days out, matched her love of gardening to your $30 budget, and remembered you bought her gloves last year.",
      product: "giftgenius-ai"
    },
    {
      day: "Sunday",
      title: "Nothing to do",
      body: "Chores rotated fairly, bills paid, fridge stocked, home maintained. That's the whole point of a Life OS.",
      product: null
    }
  ];

  function separateTotal() {
    return PRODUCTS.reduce(function (sum, p) { return sum + p.price; }, 0);
  }

  function bundlePrice() { return 19; }

  function bundleSavings() { return separateTotal() - bundlePrice(); }

  function getProduct(slug) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].slug === slug) return PRODUCTS[i];
    }
    return null;
  }

  return {
    PRODUCTS: PRODUCTS,
    WEEK: WEEK,
    BASE: BASE,
    separateTotal: separateTotal,
    bundlePrice: bundlePrice,
    bundleSavings: bundleSavings,
    getProduct: getProduct
  };
}));
