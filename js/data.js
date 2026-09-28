(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.LifeHubData = factory();
  }
}(typeof self !== "undefined" ? self : this, function () {

  var BASE = "https://github.com/alexwboles/";

  // Section order and display copy for the hub page.
  var SECTIONS = [
    { key: "hearth",   title: "Hearth AI",      sub: "The conversational front door — talk to Hearth, and it plans." },
    { key: "home",     title: "Home & family",  sub: "The household, handled: the roof over your head and the people under it." },
    { key: "money",    title: "Money & work",   sub: "Earn it, keep it, file it." },
    { key: "food",     title: "Food",           sub: "Menus and meals, from restaurant plate to weeknight dinner." },
    { key: "health",   title: "Health & habits",sub: "Body, mind, and the small things that add up." },
    { key: "trips",    title: "Trips & events", sub: "Getaways, gatherings, and the big days." },
    { key: "personal", title: "Personal",       sub: "The rest of you: learning, gifting, reflecting, dressing, speaking." }
  ];

  var PRODUCTS = [
    {
      slug: "hearth-ai",
      section: "hearth",
      name: "Hearth AI",
      tagline: "The hub's conversational front door",
      oneliner: "Chat-first personal health & home hub: meals, health, schedule and comms in one conversation.",
      features: [
        "Chat plans your week: meals, groceries, health trends, schedules, email drafts, call scripts",
        "Health logs with Apple Health import and rule-based predictive nudges",
        "Morning briefing + weekly review; planner model — it drafts, you approve, nothing sends"
      ],
      price: 12,
      priceLabel: "$12/mo"
    },
    {
      slug: "nestlife-ai",
      section: "home",
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
      slug: "homekeeper-ai",
      section: "home",
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
      slug: "homeinventory-ai",
      section: "home",
      name: "HomeInventory AI",
      tagline: "What you own, documented",
      oneliner: "A room-by-room record of everything you own — so an insurance claim never relies on memory.",
      features: [
        "Items with price, serial, notes and photo, organized by room",
        "Total-value dashboard per room and overall",
        "One-click CSV export plus a print-ready insurance report"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "gardenplan-ai",
      section: "home",
      name: "GardenPlan AI",
      tagline: "What to plant, when, and where",
      oneliner: "A 41-plant garden planner with a planting calendar computed from your frost date.",
      features: [
        "Indoor-start, transplant and direct-sow dates from your last frost date",
        "14-day care task list: watering cadence, fertilizing, harvest windows",
        "Harvest tracker with season totals per crop"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "apartmenthunt-ai",
      section: "home",
      name: "ApartmentHunt AI",
      tagline: "Compare apartments like a pro",
      oneliner: "True-cost math and weighted scoring for your apartment shortlist — rent is just the headline number.",
      features: [
        "True monthly cost: rent + amortized fees + utilities + commute cost",
        "Weighted scoring on price, space, commute, amenities — ranked best-first",
        "Side-by-side table for the whole shortlist"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "roommatesplit-ai",
      section: "home",
      name: "RoommateSplit AI",
      tagline: "Bills divided fairly",
      oneliner: "Split shared bills by even, room size or custom shares — and settle up in the fewest payments.",
      features: [
        "Even, by-room-size, or custom-% splits with exact-cent math, zero rounding drift",
        "Running balances: who owes whom, netted across bills and payments",
        "Smart settlement plan that clears debts with the fewest payments"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "movingcheck-ai",
      section: "home",
      name: "MovingCheck AI",
      tagline: "Your moving-day copilot",
      oneliner: "An 8-week countdown checklist, box inventory and mover quote comparison.",
      features: [
        "36 tasks across 5 categories, auto-dated from your moving date with overdue highlighting",
        "Box inventory with first-night essentials box flagging",
        "Mover quotes auto-ranked cheapest-first with a best-quote badge"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "budgetlens-ai",
      section: "money",
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
      slug: "debtpayoff-ai",
      section: "money",
      name: "DebtPayoff AI",
      tagline: "Your debt-free date, calculated",
      oneliner: "Avalanche vs. snowball, simulated month by month with exact payoff dates.",
      features: [
        "Strategy showdown: snowball vs. avalanche with debt-free date and total interest",
        "Balance-over-time chart vs. minimums-only, with an extra-payment what-if slider",
        "Payoff journey: interest saved, the first debt you'll kill, per-debt timeline"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "taxprep-ai",
      section: "money",
      name: "TaxPrep AI",
      tagline: "Tax season, minus the shoebox",
      oneliner: "A personalized document checklist, vault tracker and deadline countdowns for your tax situation.",
      features: [
        "Mix-and-match situations (W-2, freelancer, homeowner, investor) with merged checklists",
        "Document vault with Missing → Received → N/A tracking and a readiness progress bar",
        "Live countdowns to every federal deadline, urgent ones highlighted"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "sidehustle-ai",
      section: "money",
      name: "SideHustle AI",
      tagline: "Find your hustle, launch in 30 days",
      oneliner: "24 ranked side-hustle ideas, 30-day launch plans, and an income tracker toward your goal.",
      features: [
        "24-idea bank scored transparently by skill, interest, time, cost and earning fit",
        "30-day launch plans in 4 weekly phases: Validate → Set up → Launch → Grow",
        "Income tracker with a progress bar toward your monthly goal"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "applypilot-ai",
      section: "money",
      name: "ApplyPilot AI",
      tagline: "The job-seeker's copilot",
      oneliner: "Track applications, write cover letters in 3 tones, and never miss a follow-up.",
      features: [
        "Visual pipeline: wishlist → applied → interviewing → offer / rejected",
        "Cover letter writer from any job description, with keyword-match scoring",
        "Follow-up nudges for stalled applications, plus response-rate stats"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "menucraft-ai",
      section: "food",
      name: "MenuCraft AI",
      tagline: "Menus that sell, margins that hold",
      oneliner: "Crave-worthy menu descriptions in 3 styles plus plate-cost and margin math for small restaurants.",
      features: [
        "Descriptions in upscale, casual and fun styles from a local sensory-word bank",
        "Plate cost, suggested price at your target margin, and plain-language health flags",
        "Printable menu preview grouped by course, plus weekend-special combos"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "recipebox-ai",
      section: "food",
      name: "RecipeBox AI",
      tagline: "Your recipes, all in one box",
      oneliner: "Save recipes, plan the week, and let the grocery list write itself.",
      features: [
        "20 starter recipes plus your own — searchable by ingredient, tag and favorite",
        "Week planner with per-day servings; the grocery list merges duplicates and scales",
        "Smart filters like \"dinner in 20 minutes\""
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "fitnessplan-ai",
      section: "health",
      name: "FitnessPlan AI",
      tagline: "Your goal, your gear, your week",
      oneliner: "Weekly workout plans built from your goal, schedule and the equipment you own.",
      features: [
        "Goal-based plans: strength splits, HIIT cardio, weight-loss circuits, full-body",
        "Equipment-aware — only exercises you can do with your gear, from a 40-exercise library",
        "Workout log with streaks and rest-day reminders"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "medtrack-ai",
      section: "health",
      name: "MedTrack AI",
      tagline: "Never wonder \"did I take it?\"",
      oneliner: "Simple private medication schedules: tap doses off, track refills, see adherence.",
      features: [
        "Tap time slots to log doses; missed doses flag themselves",
        "Refill alerts from days-left math, with your own threshold",
        "7-day adherence per medication — 100% local, a memory aid not medical advice"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "habitloop-ai",
      section: "health",
      name: "HabitLoop AI",
      tagline: "Small habits, kept promises",
      oneliner: "A gentle habit tracker with honest streaks, milestones and habit-stacking reminders.",
      features: [
        "Daily + weekly habits with streak math that handles both correctly",
        "Milestone celebrations at 7 / 14 / 30 / 60 / 100 / 365 — unchecking drops the streak honestly",
        "Gentle reminder notes with habit-stacking tips, no nagging notifications"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "babytracker-ai",
      section: "health",
      name: "BabyTracker AI",
      tagline: "One-tap logging for tired parents",
      oneliner: "Feeds, naps, diapers and milestones recorded in seconds — the 3 AM mental math, solved.",
      features: [
        "Quick-log buttons: feeds, nap start/stop, diapers — one tap, auto-timestamped",
        "Today dashboard: totals and \"last feed 25 min ago\" at a glance",
        "Growth tracker plus a 24-tip soothing library (a logbook, not medical advice)"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "travelpack-ai",
      section: "trips",
      name: "TravelPack AI",
      tagline: "Never forget the chargers",
      oneliner: "Smart packing lists from three questions: trip type, days, weather.",
      features: [
        "6 trip types × 5 weather profiles with a 60+ item bank",
        "Per-day quantities and a \"don't forget\" essentials strip",
        "Check-off with live progress, saved trips, printable list"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "roadtrip-ai",
      section: "trips",
      name: "RoadTrip AI",
      tagline: "Plan the drive, enjoy the ride",
      oneliner: "Day-by-day road trip itineraries with fuel costs and a full trip budget.",
      features: [
        "Origin → destination + waypoints, stops auto-distributed across days",
        "Fuel cost and drive-time estimates from distance, MPG and gas price",
        "Full budget summary: fuel, lodging, food, activities, per-day cost"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "partyplan-ai",
      section: "trips",
      name: "PartyPlan AI",
      tagline: "Any event, minus the stress",
      oneliner: "Countdown timelines, budget tracking, guest lists and vendors for any party.",
      features: [
        "10 event types, each with tasks auto-scheduled backwards from your date",
        "Budget tracker with planned vs. spent by category and one-click auto-split",
        "Guest list with RSVP headcount math and a vendor pipeline board"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "weddingplan-ai",
      section: "trips",
      name: "WeddingPlan AI",
      tagline: "Your wedding, planned",
      oneliner: "A 12-month timeline, budget tracker, guest list and vendor board — no spreadsheet chaos.",
      features: [
        "26 tasks auto-scheduled backwards from your date with plain-language tips",
        "Budget by category with a one-click sensible auto-split",
        "RSVP headcount math with meal choices, plus a vendor pipeline board"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "bucketlist-ai",
      section: "trips",
      name: "BucketList AI",
      tagline: "Dream it, plan it, check it off",
      oneliner: "A bucket list with a state machine: dreaming → planning → done, with memories attached.",
      features: [
        "105-idea bank across 5 categories — search, filter, \"surprise me\", one-click adoption",
        "Dreaming → planning → done flow with completion dates and memory notes",
        "Progress dashboard with completion % and live progress bar"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "journalpilot-ai",
      section: "personal",
      name: "JournalPilot AI",
      tagline: "A prompt a day, a life on record",
      oneliner: "A private daily journal with a fresh prompt every morning, mood tagging and streaks.",
      features: [
        "Deterministic daily prompt from a 102-prompt bank across 6 categories",
        "Mood tagging with insights, full-text search, streak tracking",
        "100% local — entries live only in your browser, nothing uploaded"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "wardrobe-ai",
      section: "personal",
      name: "Wardrobe AI",
      tagline: "Outfits from what you own",
      oneliner: "A closet organizer and outfit builder that answers \"what should I wear?\".",
      features: [
        "Closet with category, color, season, occasion and optional photos",
        "Enter weather + occasion → suggested outfit from your actual closet",
        "Donate & sell piles that keep pieces without deleting them"
      ],
      price: 6,
      priceLabel: "$6/mo"
    },
    {
      slug: "speechwriter-ai",
      section: "personal",
      name: "SpeechWriter AI",
      tagline: "A toast they'll remember",
      oneliner: "Draft vows, toasts and talks in 15 minutes — you bring the stories, it brings the shape.",
      features: [
        "5 occasions × 3 tones with structured drafts: opening, story beats, closing, toast line",
        "Timing estimate from word count so you never run long",
        "Practice checklist with saved progress"
      ],
      price: 8,
      priceLabel: "$8/mo"
    },
    {
      slug: "studyflow-ai",
      section: "personal",
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
      section: "personal",
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

  // The bundle covers the original five only — everything else is priced individually.
  var BUNDLE_SLUGS = ["nestlife-ai", "budgetlens-ai", "homekeeper-ai", "studyflow-ai", "giftgenius-ai"];

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

  function bundleProducts() {
    return PRODUCTS.filter(function (p) { return BUNDLE_SLUGS.indexOf(p.slug) !== -1; });
  }

  function separateTotal() {
    return bundleProducts().reduce(function (sum, p) { return sum + p.price; }, 0);
  }

  function bundlePrice() { return 19; }

  function bundleSavings() { return separateTotal() - bundlePrice(); }

  function grandTotal() {
    return PRODUCTS.reduce(function (sum, p) { return sum + p.price; }, 0);
  }

  function getProduct(slug) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].slug === slug) return PRODUCTS[i];
    }
    return null;
  }

  function productsInSection(key) {
    return PRODUCTS.filter(function (p) { return p.section === key; });
  }

  return {
    PRODUCTS: PRODUCTS,
    SECTIONS: SECTIONS,
    WEEK: WEEK,
    BASE: BASE,
    BUNDLE_SLUGS: BUNDLE_SLUGS,
    separateTotal: separateTotal,
    bundlePrice: bundlePrice,
    bundleSavings: bundleSavings,
    grandTotal: grandTotal,
    getProduct: getProduct,
    productsInSection: productsInSection
  };
}));
