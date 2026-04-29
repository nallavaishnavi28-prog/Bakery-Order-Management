// ============================================================
// THE DAILY CRUMB — Bakery Order Management v3
// Greedy Scheduling + 0/1 Knapsack DP + Oven Scheduling
// Customers · Loyalty · Staff · Charts · Auto-reorder
// ============================================================

// ---------- MENU CATEGORIES (8 categories, 45+ items) ----------
const categories = [
  {
    id: "breads", name: "Breads", emoji: "🥖",
    desc: "Crusty sourdoughs, baguettes and country loaves, from a 36-hour ferment.",
    gradient: "linear-gradient(135deg, hsl(28 55% 55%), hsl(35 70% 65%))",
    items: [
      { name: "Sourdough Loaf",    price: 9,  prep: 20, recipe: { Flour: 500, Yeast: 8 } },
      { name: "Baguette",          price: 6,  prep: 18, recipe: { Flour: 400, Yeast: 6 } },
      { name: "Country Rye",       price: 11, prep: 25, recipe: { Flour: 450, Yeast: 7 } },
      { name: "Whole Wheat Loaf",  price: 8,  prep: 22, recipe: { Flour: 500, Yeast: 8 } },
      { name: "Focaccia Slab",     price: 14, prep: 30, recipe: { Flour: 600, Yeast: 10, Butter: 60 } },
      { name: "Brioche Bun (4)",   price: 10, prep: 28, recipe: { Flour: 320, Butter: 120, Eggs: 100, Sugar: 40, Yeast: 5 } },
    ],
  },
  {
    id: "pastries", name: "Pastries", emoji: "🥐",
    desc: "Laminated, layered, and shamelessly buttery breakfast pastries.",
    gradient: "linear-gradient(135deg, hsl(35 80% 60%), hsl(22 70% 58%))",
    items: [
      { name: "Croissant Box (6)",    price: 18, prep: 30, recipe: { Flour: 300, Butter: 200, Sugar: 40, Eggs: 60 } },
      { name: "Pain au Chocolat (4)", price: 16, prep: 28, recipe: { Flour: 260, Butter: 180, Sugar: 30, Eggs: 50, Chocolate: 80 } },
      { name: "Almond Danish (4)",    price: 17, prep: 32, recipe: { Flour: 280, Butter: 170, Sugar: 60, Eggs: 70 } },
      { name: "Pastry Box (12)",      price: 28, prep: 25, recipe: { Flour: 400, Butter: 250, Sugar: 120, Eggs: 120 } },
      { name: "Cinnamon Rolls (8)",   price: 22, prep: 35, recipe: { Flour: 450, Butter: 180, Sugar: 150, Eggs: 100 } },
      { name: "Apple Turnover (4)",   price: 14, prep: 26, recipe: { Flour: 240, Butter: 150, Sugar: 80, Eggs: 40 } },
    ],
  },
  {
    id: "cakes", name: "Cakes", emoji: "🎂",
    desc: "From birthday classics to multi-tier wedding cakes — built to order.",
    gradient: "linear-gradient(135deg, hsl(345 60% 60%), hsl(22 65% 55%))",
    items: [
      { name: "Chocolate Cake",  price: 55,  prep: 45, recipe: { Flour: 250, Sugar: 200, Butter: 150, Eggs: 200, Chocolate: 250 } },
      { name: "Birthday Cake",   price: 65,  prep: 50, recipe: { Flour: 350, Sugar: 280, Butter: 200, Eggs: 240, Chocolate: 100 } },
      { name: "Wedding Cake",    price: 320, prep: 75, recipe: { Flour: 1200, Sugar: 900, Butter: 700, Eggs: 800, Chocolate: 300 } },
      { name: "Carrot Cake",     price: 48,  prep: 42, recipe: { Flour: 300, Sugar: 240, Butter: 160, Eggs: 200 } },
      { name: "Cheesecake",      price: 42,  prep: 55, recipe: { Flour: 180, Sugar: 220, Butter: 120, Eggs: 220 } },
      { name: "Lemon Tart",      price: 28,  prep: 38, recipe: { Flour: 200, Sugar: 160, Butter: 140, Eggs: 180 } },
    ],
  },
  {
    id: "cookies", name: "Cookies & Bars", emoji: "🍪",
    desc: "Chewy, crunchy and everything in between — sold by the dozen.",
    gradient: "linear-gradient(135deg, hsl(28 60% 45%), hsl(35 65% 60%))",
    items: [
      { name: "Chocolate Chip Dozen", price: 16, prep: 22, recipe: { Flour: 280, Sugar: 180, Butter: 160, Eggs: 100, Chocolate: 180 } },
      { name: "Oatmeal Raisin Dozen", price: 14, prep: 22, recipe: { Flour: 240, Sugar: 160, Butter: 140, Eggs: 100 } },
      { name: "Macaron Box (12)",     price: 24, prep: 40, recipe: { Sugar: 200, Eggs: 120, Butter: 80 } },
      { name: "Brownie Tray (9)",     price: 20, prep: 30, recipe: { Flour: 180, Sugar: 220, Butter: 150, Eggs: 140, Chocolate: 220 } },
      { name: "Shortbread Box",       price: 12, prep: 25, recipe: { Flour: 260, Sugar: 120, Butter: 200 } },
    ],
  },
  {
    id: "donuts", name: "Donuts & Muffins", emoji: "🍩",
    desc: "Hand-cut donuts and bakery-style muffins, glazed and fresh by 7 AM.",
    gradient: "linear-gradient(135deg, hsl(330 65% 65%), hsl(35 80% 65%))",
    items: [
      { name: "Glazed Donut Dozen",   price: 18, prep: 32, recipe: { Flour: 360, Sugar: 220, Butter: 100, Eggs: 140, Yeast: 6 } },
      { name: "Filled Donut (6)",     price: 14, prep: 28, recipe: { Flour: 280, Sugar: 180, Butter: 90, Eggs: 110, Yeast: 5 } },
      { name: "Blueberry Muffin (6)", price: 13, prep: 26, recipe: { Flour: 320, Sugar: 200, Butter: 130, Eggs: 140 } },
      { name: "Chocolate Muffin (6)", price: 14, prep: 26, recipe: { Flour: 300, Sugar: 200, Butter: 130, Eggs: 140, Chocolate: 120 } },
      { name: "Banana Bread Loaf",    price: 12, prep: 35, recipe: { Flour: 280, Sugar: 180, Butter: 120, Eggs: 120 } },
    ],
  },
  {
    id: "savory", name: "Savory", emoji: "🥧",
    desc: "Quiches, pies and stuffed buns for lunchtime customers.",
    gradient: "linear-gradient(135deg, hsl(85 35% 45%), hsl(40 50% 55%))",
    items: [
      { name: "Quiche Lorraine",      price: 24, prep: 40, recipe: { Flour: 280, Butter: 180, Eggs: 240 } },
      { name: "Spinach & Feta Pie",   price: 22, prep: 38, recipe: { Flour: 300, Butter: 160, Eggs: 180 } },
      { name: "Sausage Roll (4)",     price: 14, prep: 28, recipe: { Flour: 240, Butter: 140, Eggs: 80 } },
      { name: "Cheese Scones (6)",    price: 12, prep: 22, recipe: { Flour: 320, Butter: 120, Eggs: 100 } },
      { name: "Mushroom Tart",        price: 26, prep: 42, recipe: { Flour: 280, Butter: 170, Eggs: 200 } },
    ],
  },
  {
    id: "sandwiches", name: "Sandwiches", emoji: "🥪",
    desc: "Made-to-order sandwiches on bakery bread — quick, hot, hearty.",
    gradient: "linear-gradient(135deg, hsl(40 60% 55%), hsl(28 55% 50%))",
    items: [
      { name: "Ham & Cheese Baguette", price: 11, prep: 10, recipe: { Flour: 200, Yeast: 3 } },
      { name: "Caprese Focaccia",      price: 12, prep: 12, recipe: { Flour: 220, Yeast: 4, Butter: 20 } },
      { name: "Egg Salad Brioche",     price: 10, prep: 10, recipe: { Flour: 160, Eggs: 120, Butter: 30, Yeast: 3 } },
      { name: "Chicken Pesto Wrap",    price: 13, prep: 12, recipe: { Flour: 180 } },
    ],
  },
  {
    id: "drinks", name: "Drinks", emoji: "☕",
    desc: "Pour-overs, lattes and seasonal teas to go with your loaf.",
    gradient: "linear-gradient(135deg, hsl(28 40% 30%), hsl(22 50% 45%))",
    items: [
      { name: "Espresso",           price: 3.5, prep: 5, recipe: {} },
      { name: "Cappuccino",         price: 4.5, prep: 7, recipe: {} },
      { name: "Vanilla Latte",      price: 5.5, prep: 8, recipe: { Sugar: 10 } },
      { name: "Hot Chocolate",      price: 5,   prep: 7, recipe: { Sugar: 20, Chocolate: 40 } },
      { name: "Chai Tea Latte",     price: 5,   prep: 8, recipe: { Sugar: 15 } },
      { name: "Fresh Orange Juice", price: 6,   prep: 6, recipe: {} },
      { name: "Iced Mocha",         price: 6,   prep: 7, recipe: { Sugar: 15, Chocolate: 30 } },
    ],
  },
  {
    id: "seasonal", name: "Seasonal Specials", emoji: "🎄",
    desc: "Limited-time bakes that follow the calendar — order while they last.",
    gradient: "linear-gradient(135deg, hsl(355 65% 55%), hsl(15 70% 55%))",
    items: [
      { name: "Pumpkin Spice Loaf",   price: 16, prep: 35, recipe: { Flour: 320, Sugar: 220, Butter: 140, Eggs: 160 } },
      { name: "Gingerbread House",    price: 38, prep: 60, recipe: { Flour: 500, Sugar: 320, Butter: 200, Eggs: 120 } },
      { name: "Hot Cross Buns (6)",   price: 15, prep: 32, recipe: { Flour: 360, Sugar: 120, Butter: 100, Eggs: 100, Yeast: 6 } },
      { name: "Stollen",              price: 28, prep: 50, recipe: { Flour: 400, Sugar: 200, Butter: 220, Eggs: 140, Yeast: 8 } },
      { name: "Yule Log",             price: 45, prep: 55, recipe: { Flour: 240, Sugar: 240, Butter: 180, Eggs: 240, Chocolate: 220 } },
    ],
  },
];

// Flatten -> map item name -> {recipe, category}
const recipeBook = {};
const itemMeta = {};
categories.forEach(cat => {
  cat.items.forEach(it => {
    recipeBook[it.name] = it.recipe;
    itemMeta[it.name] = { category: cat.id, categoryName: cat.name, emoji: cat.emoji, defaultPrice: it.price, defaultPrep: it.prep };
  });
});

// ---------- INVENTORY ----------
let ingredients = [
  { name: "Flour",     stock: 8500, capacity: 10000, costPerGram: 0.002, reorderPrice: 0.0015 },
  { name: "Sugar",     stock: 2200, capacity: 5000,  costPerGram: 0.003, reorderPrice: 0.0022 },
  { name: "Butter",    stock: 3400, capacity: 5000,  costPerGram: 0.012, reorderPrice: 0.009 },
  { name: "Eggs",      stock: 4800, capacity: 5000,  costPerGram: 0.008, reorderPrice: 0.006 },
  { name: "Chocolate", stock: 1800, capacity: 3000,  costPerGram: 0.018, reorderPrice: 0.014 },
  { name: "Yeast",     stock: 350,  capacity: 500,   costPerGram: 0.04,  reorderPrice: 0.03 },
];
const LOW_STOCK_PCT = 30;

// ---------- CUSTOMERS & LOYALTY ----------
// Loyalty tiers: Bronze (0+), Silver (5+ orders), Gold (12+), VIP (25+)
let customers = [
  { name: "Amelia Grant",   phone: "555-0101", email: "amelia@mail.com",   orders: 14, spent: 1840, points: 184 },
  { name: "Ben Lewis",      phone: "555-0102", email: "ben@mail.com",      orders: 6,  spent: 320,  points: 32 },
  { name: "Chloe Kim",      phone: "555-0103", email: "chloe@mail.com",    orders: 27, spent: 2150, points: 215 },
  { name: "David Moreno",   phone: "555-0104", email: "david@mail.com",    orders: 3,  spent: 145,  points: 14 },
  { name: "Elena Rossi",    phone: "555-0105", email: "elena@mail.com",    orders: 8,  spent: 410,  points: 41 },
];
function loyaltyTier(c) {
  if (!c) return { name: "New", boost: 1, color: "#9c8a78" };
  if (c.orders >= 25) return { name: "VIP",    boost: 1.4, color: "#a855f7" };
  if (c.orders >= 12) return { name: "Gold",   boost: 1.2, color: "#d4a017" };
  if (c.orders >= 5)  return { name: "Silver", boost: 1.1, color: "#94a3b8" };
  return { name: "Bronze", boost: 1, color: "#a0633a" };
}
function findCustomer(name) {
  return customers.find(c => c.name.toLowerCase() === name.toLowerCase());
}
function upsertCustomer(name, phone, email) {
  let c = findCustomer(name);
  if (!c) {
    c = { name, phone: phone || "", email: email || "", orders: 0, spent: 0, points: 0 };
    customers.push(c);
  } else {
    if (phone) c.phone = phone;
    if (email) c.email = email;
  }
  return c;
}

// ---------- STAFF & OVENS ----------
let staff = [
  { id: "B1", name: "Marco",  role: "Head Baker",   speed: 1.0, busyUntil: 0 },
  { id: "B2", name: "Sofia",  role: "Pastry Chef",  speed: 1.1, busyUntil: 0 },
  { id: "B3", name: "Theo",   role: "Bread Baker",  speed: 0.95, busyUntil: 0 },
];
let ovens = [
  { id: "O1", name: "Stone Oven",      busyUntil: 0 },
  { id: "O2", name: "Convection 1",    busyUntil: 0 },
  { id: "O3", name: "Convection 2",    busyUntil: 0 },
];

// Oven scheduling: parallel-batch greedy. Returns {assignments: [{order, oven, baker, start, end}], makespan}
function scheduleOvens(list) {
  const queue = greedySchedule(list);
  const ovensCopy = ovens.map(o => ({ ...o, busyUntil: 0 }));
  const staffCopy = staff.map(s => ({ ...s, busyUntil: 0 }));
  const assignments = [];
  for (const o of queue) {
    // assign to earliest-free oven and earliest-free baker, take max
    ovensCopy.sort((a, b) => a.busyUntil - b.busyUntil);
    staffCopy.sort((a, b) => a.busyUntil - b.busyUntil);
    const oven = ovensCopy[0];
    const baker = staffCopy[0];
    const start = Math.max(oven.busyUntil, baker.busyUntil);
    const dur = Math.max(1, Math.round(o.prepMinutes / baker.speed));
    const end = start + dur;
    oven.busyUntil = end;
    baker.busyUntil = end;
    assignments.push({ orderId: o.id, item: o.item, ovenId: oven.id, ovenName: oven.name, bakerId: baker.id, bakerName: baker.name, start, end, dur });
  }
  const makespan = Math.max(0, ...ovensCopy.map(o => o.busyUntil), ...staffCopy.map(s => s.busyUntil));
  return { assignments, makespan };
}

// ---------- ORDERS ----------
let orders = [
  { id: "ORD-1101", customer: "Amelia Grant",  item: "Wedding Cake",          quantity: 1, pricePerUnit: 320, deadlineMinutes: 90,  prepMinutes: 75, status: "pending", type: "delivery", address: "12 Vine St", notes: "Vanilla buttercream, no nuts", giftWrap: true },
  { id: "ORD-1102", customer: "Ben Lewis",     item: "Pastry Box (12)",       quantity: 2, pricePerUnit: 28,  deadlineMinutes: 60,  prepMinutes: 25, status: "pending", type: "pickup",   address: "",            notes: "", giftWrap: false },
  { id: "ORD-1103", customer: "Chloe Kim",     item: "Sourdough Loaf",        quantity: 3, pricePerUnit: 9,   deadlineMinutes: 180, prepMinutes: 20, status: "pending", type: "pickup",   address: "",            notes: "Sliced please", giftWrap: false },
  { id: "ORD-1104", customer: "David Moreno",  item: "Birthday Cake",         quantity: 1, pricePerUnit: 65,  deadlineMinutes: 120, prepMinutes: 50, status: "pending", type: "delivery", address: "8 Oak Ave",   notes: "Write 'Happy 30th'", giftWrap: true },
  { id: "ORD-1105", customer: "Elena Rossi",   item: "Croissant Box (6)",     quantity: 4, pricePerUnit: 18,  deadlineMinutes: 75,  prepMinutes: 30, status: "pending", type: "delivery", address: "44 Park Rd",  notes: "", giftWrap: false },
  { id: "ORD-1106", customer: "Frank Okafor",  item: "Cinnamon Rolls (8)",    quantity: 2, pricePerUnit: 22,  deadlineMinutes: 150, prepMinutes: 35, status: "pending", type: "pickup",   address: "",            notes: "Allergy: tree nuts", giftWrap: false },
  { id: "ORD-1107", customer: "Grace Park",    item: "Chocolate Cake",        quantity: 1, pricePerUnit: 55,  deadlineMinutes: 100, prepMinutes: 45, status: "pending", type: "pickup",   address: "",            notes: "", giftWrap: false },
  { id: "ORD-1108", customer: "Hugo Bernard",  item: "Baguette",              quantity: 5, pricePerUnit: 6,   deadlineMinutes: 200, prepMinutes: 18, status: "pending", type: "pickup",   address: "",            notes: "", giftWrap: false },
  { id: "ORD-1109", customer: "Iris Tan",      item: "Chocolate Chip Dozen",  quantity: 2, pricePerUnit: 16,  deadlineMinutes: 110, prepMinutes: 22, status: "pending", type: "delivery", address: "9 River Ln",  notes: "", giftWrap: false },
  { id: "ORD-1110", customer: "Jonas Weber",   item: "Quiche Lorraine",       quantity: 1, pricePerUnit: 24,  deadlineMinutes: 80,  prepMinutes: 40, status: "pending", type: "pickup",   address: "",            notes: "", giftWrap: false },
  { id: "ORD-1111", customer: "Kira Nakamura", item: "Cappuccino",            quantity: 4, pricePerUnit: 4.5, deadlineMinutes: 30,  prepMinutes: 7,  status: "pending", type: "pickup",   address: "",            notes: "Extra hot", giftWrap: false },
  { id: "ORD-1112", customer: "Liam Carter",   item: "Brownie Tray (9)",      quantity: 1, pricePerUnit: 20,  deadlineMinutes: 95,  prepMinutes: 30, status: "pending", type: "pickup",   address: "",            notes: "", giftWrap: false },
  { id: "ORD-1113", customer: "Chloe Kim",     item: "Glazed Donut Dozen",    quantity: 1, pricePerUnit: 18,  deadlineMinutes: 70,  prepMinutes: 32, status: "pending", type: "pickup",   address: "",            notes: "", giftWrap: false },
];

// Pre-seed a "yesterday" sales log for weekly trend chart
const today = new Date();
function dateKey(d) { return d.toISOString().slice(0, 10); }
let salesHistory = []; // {date, item, category, quantity, revenue, profit}
// Generate 6 prior days of synthetic sales
for (let d = 6; d >= 1; d--) {
  const dt = new Date(today.getTime() - d * 86400000);
  const key = dateKey(dt);
  const n = 8 + Math.floor(Math.random() * 12);
  for (let i = 0; i < n; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const item = cat.items[Math.floor(Math.random() * cat.items.length)];
    const qty = 1 + Math.floor(Math.random() * 3);
    const rev = item.price * qty;
    salesHistory.push({ date: key, item: item.name, category: cat.name, quantity: qty, revenue: rev, profit: rev * 0.55 });
  }
}

let budget = 180;
let activeCategory = "all"; // dashboard filter

// ---------- ALGORITHMS ----------
function greedyScore(o) {
  const value = o.pricePerUnit * o.quantity;
  const urgency = 100 / Math.max(o.deadlineMinutes, 1);
  const c = findCustomer(o.customer);
  const tier = loyaltyTier(c);
  return ((value * urgency) / Math.max(o.prepMinutes, 1)) * tier.boost;
}
function greedySchedule(list) {
  return list.filter(o => o.status !== "completed").slice().sort((a, b) => greedyScore(b) - greedyScore(a));
}
function priorityLabel(o) {
  const s = greedyScore(o);
  if (s > 25 || o.deadlineMinutes < 75) return "high";
  if (s > 8 || o.deadlineMinutes < 150) return "medium";
  return "low";
}
function recipeOf(o) { return recipeBook[o.item] || {}; }
function categoryOf(o) { return itemMeta[o.item]?.category || "other"; }
function canFulfill(o, ing) {
  const r = recipeOf(o);
  return Object.entries(r).every(([n, g]) => {
    const i = ing.find(x => x.name === n);
    return i && i.stock >= g * o.quantity;
  });
}
function consume(o, ing) {
  const r = recipeOf(o);
  return ing.map(i => ({ ...i, stock: Math.max(0, i.stock - (r[i.name] || 0) * o.quantity) }));
}
function orderCost(o, ing) {
  const r = recipeOf(o);
  return Object.entries(r).reduce((s, [n, g]) => {
    const i = ing.find(x => x.name === n);
    return s + (i ? g * o.quantity * i.costPerGram : 0);
  }, 0);
}
function orderProfit(o, ing) { return o.pricePerUnit * o.quantity - orderCost(o, ing); }

function estimateDelivery(list, id) {
  // Use parallel oven schedule when possible
  const sched = scheduleOvens(list);
  const a = sched.assignments.find(x => x.orderId === id);
  return a ? a.end : 0;
}

// 0/1 knapsack on prep time, maximize profit
function dpOptimize(list, ing, W) {
  const eligible = list.filter(o => o.status !== "completed" && canFulfill(o, ing));
  const n = eligible.length;
  W = Math.max(0, Math.floor(W));
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));
  const profits = eligible.map(o => Math.max(0, orderProfit(o, ing)));
  const times = eligible.map(o => Math.max(1, o.prepMinutes));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      dp[i][w] = dp[i - 1][w];
      if (times[i - 1] <= w) {
        const take = dp[i - 1][w - times[i - 1]] + profits[i - 1];
        if (take > dp[i][w]) dp[i][w] = take;
      }
    }
  }
  const selected = [];
  let w = W;
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) { selected.push(eligible[i - 1]); w -= times[i - 1]; }
  }
  return { selected: selected.reverse(), profit: dp[n][W], timeUsed: selected.reduce((s, o) => s + o.prepMinutes, 0) };
}

// ---------- TOAST ----------
function toast(title, desc, type = "success") {
  const host = document.getElementById("toast-host");
  if (!host) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<div class="t-title">${title}</div>${desc ? `<div class="t-desc">${desc}</div>` : ""}`;
  host.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity 0.3s"; }, 3200);
  setTimeout(() => el.remove(), 3600);
}

// ---------- DASHBOARD-ONLY RENDER ----------
function isDashboard() { return !!document.getElementById("queue"); }

function renderStats() {
  const pending = orders.filter(o => o.status !== "completed");
  const completed = orders.filter(o => o.status === "completed");
  const pendingRevenue = pending.reduce((s, o) => s + o.pricePerUnit * o.quantity, 0);
  const todayProfit = completed.reduce((s, o) => s + orderProfit(o, ingredients), 0);
  const avgPrep = pending.length ? Math.round(pending.reduce((s, o) => s + o.prepMinutes, 0) / pending.length) : 0;
  const urgent = pending.filter(o => o.deadlineMinutes < 90).length;
  const sched = scheduleOvens(orders);

  const cards = [
    { label: "Pending revenue", value: `$${pendingRevenue.toFixed(0)}`, hint: `${pending.length} open orders`, icon: "💰", accent: true },
    { label: "Profit today",    value: `$${todayProfit.toFixed(0)}`,    hint: `${completed.length} fulfilled`, icon: "📋" },
    { label: "Bake makespan",   value: `${sched.makespan}m`,            hint: `${ovens.length} ovens · ${staff.length} bakers`, icon: "🔥" },
    { label: "Urgent orders",   value: `${urgent}`,                     hint: "< 90 min to deadline",         icon: "⚡" },
  ];

  document.getElementById("stats").innerHTML = cards.map(c => `
    <div class="stat-card ${c.accent ? "accent" : ""}">
      <div>
        <div class="stat-label">${c.label}</div>
        <div class="stat-value">${c.value}</div>
        <div class="stat-hint">${c.hint}</div>
      </div>
      <div class="stat-icon">${c.icon}</div>
    </div>`).join("");
}

function renderCatFilter() {
  const host = document.getElementById("cat-filter");
  if (!host) return;
  const all = [{ id: "all", name: "All", emoji: "🍞" }, ...categories.map(c => ({ id: c.id, name: c.name, emoji: c.emoji }))];
  host.innerHTML = all.map(c => `
    <button class="cat-chip ${activeCategory === c.id ? "active" : ""}" data-cat="${c.id}">
      <span>${c.emoji}</span>${c.name}
    </button>`).join("");
  host.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderCatFilter();
      renderQueue();
    });
  });
}

function renderQueue() {
  let queue = greedySchedule(orders);
  if (activeCategory !== "all") queue = queue.filter(o => categoryOf(o) === activeCategory);
  document.getElementById("queue-count").textContent = `${queue.length} in queue`;
  const host = document.getElementById("queue");

  if (queue.length === 0) {
    host.innerHTML = `<div class="empty"><div class="title">All caught up!</div><div class="sub">No pending orders in this category. ☕</div></div>`;
    return;
  }

  const sched = scheduleOvens(orders);
  const lookup = {};
  sched.assignments.forEach(a => { lookup[a.orderId] = a; });

  host.innerHTML = queue.map(o => {
    const p = priorityLabel(o);
    const score = greedyScore(o);
    const ok = canFulfill(o, ingredients);
    const profit = orderProfit(o, ingredients);
    const a = lookup[o.id];
    const eta = a ? a.end : o.prepMinutes;
    const total = o.pricePerUnit * o.quantity;
    const meta = itemMeta[o.item];
    const cust = findCustomer(o.customer);
    const tier = loyaltyTier(cust);
    const typeIcon = o.type === "delivery" ? "🚲" : "🛍️";
    const wrapIcon = o.giftWrap ? "🎁 " : "";
    const noteHtml = o.notes ? `<div class="order-note">📝 ${escapeHtml(o.notes)}</div>` : "";
    const addrHtml = o.type === "delivery" && o.address ? `<span>📍 ${escapeHtml(o.address)}</span>` : "";
    return `
      <div class="order-card">
        <div class="order-top">
          <div style="flex:1; min-width:0;">
            <div class="order-meta">
              <span class="badge badge-${p}">${p === "high" ? "🔥 " : ""}${p} priority</span>
              ${meta ? `<span class="badge badge-cat">${meta.emoji} ${meta.categoryName}</span>` : ""}
              <span class="badge badge-tier" style="background:${tier.color}22; color:${tier.color}; border-color:${tier.color}55;">★ ${tier.name}</span>
              <span class="order-id">${o.id}</span>
              ${ok ? "" : `<span class="badge badge-warn">⚠ Low stock</span>`}
            </div>
            <div class="order-title">${wrapIcon}${o.item} <span class="qty">× ${o.quantity}</span></div>
            <div class="order-info">
              <span>👤 ${escapeHtml(o.customer)}</span>
              <span>${typeIcon} ${o.type}</span>
              <span>🕐 due in ${o.deadlineMinutes}m</span>
              ${addrHtml}
            </div>
            ${noteHtml}
          </div>
          <div class="order-price">
            <div class="total">$${total.toFixed(0)}</div>
            <div class="profit">+$${profit.toFixed(2)} profit</div>
          </div>
        </div>
        <div class="order-stats">
          <div><div class="label">Prep time</div><div class="val">${o.prepMinutes} min</div></div>
          <div><div class="label">Greedy score</div><div class="val primary">${score.toFixed(1)}</div></div>
          <div><div class="label">Oven · Baker</div><div class="val">${a ? `${a.ovenName.split(" ")[0]} · ${a.bakerName}` : "—"}</div></div>
          <div><div class="label">ETA</div><div class="val">~${eta} min</div></div>
        </div>
        <button class="btn btn-primary" data-fulfill="${o.id}" ${ok ? "" : "disabled"}>✓ Bake & Fulfill</button>
      </div>`;
  }).join("");

  host.querySelectorAll("[data-fulfill]").forEach(btn => {
    btn.addEventListener("click", () => fulfill(btn.dataset.fulfill));
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderInventory() {
  const lowItems = [];
  document.getElementById("ingredients").innerHTML = ingredients.map(i => {
    const pct = Math.round((i.stock / i.capacity) * 100);
    const low = pct < LOW_STOCK_PCT;
    if (low) lowItems.push(i);
    return `
      <div class="ing">
        <div class="ing-row">
          <span class="ing-name">${i.name}</span>
          <span class="ing-amt ${low ? "low" : ""}">${i.stock.toLocaleString()}g <span style="opacity:0.6">/ ${i.capacity.toLocaleString()}g</span></span>
        </div>
        <div class="bar"><div class="bar-fill ${low ? "low" : ""}" style="width:${pct}%"></div></div>
      </div>`;
  }).join("");

  // Auto-reorder suggestion panel
  const reorderHost = document.getElementById("reorder-panel");
  if (reorderHost) {
    if (lowItems.length === 0) {
      reorderHost.innerHTML = `<div class="reorder-ok">✓ All ingredients above ${LOW_STOCK_PCT}% — no reorder needed.</div>`;
    } else {
      const rows = lowItems.map(i => {
        const need = i.capacity - i.stock;
        const cost = need * i.reorderPrice;
        return `<div class="reorder-row">
          <span class="reorder-name">${i.name}</span>
          <span class="reorder-need">+${need.toLocaleString()}g</span>
          <span class="reorder-cost">$${cost.toFixed(2)}</span>
        </div>`;
      }).join("");
      const totalCost = lowItems.reduce((s, i) => s + (i.capacity - i.stock) * i.reorderPrice, 0);
      reorderHost.innerHTML = `
        <div class="reorder-alert">⚠ ${lowItems.length} ingredient${lowItems.length > 1 ? "s" : ""} below ${LOW_STOCK_PCT}%</div>
        ${rows}
        <div class="reorder-total"><span>Estimated cost</span><strong>$${totalCost.toFixed(2)}</strong></div>
        <button class="btn btn-ghost" id="reorder-btn">📦 Place reorder</button>`;
      document.getElementById("reorder-btn").addEventListener("click", () => {
        ingredients = ingredients.map(i => ({ ...i, stock: i.stock < i.capacity * LOW_STOCK_PCT / 100 ? i.capacity : i.stock }));
        toast("Reorder placed", `${lowItems.length} ingredient${lowItems.length > 1 ? "s" : ""} restocked`);
        renderAll();
      });
    }
  }
}

function renderDP() {
  document.getElementById("budget-val").textContent = `${budget} min`;
  const pending = orders.filter(o => o.status !== "completed");
  const r = dpOptimize(pending, ingredients, budget);

  document.getElementById("dp-stats").innerHTML = `
    <div class="dp-stat"><div class="lbl">Picked</div><div class="val">${r.selected.length}</div></div>
    <div class="dp-stat"><div class="lbl">Time used</div><div class="val">${r.timeUsed}m</div></div>
    <div class="dp-stat highlight"><div class="lbl">Max profit</div><div class="val">$${r.profit.toFixed(0)}</div></div>`;
  document.getElementById("dp-picks").innerHTML = r.selected.map(o => `<span class="dp-pick">${o.id}</span>`).join("");

  const btn = document.getElementById("dp-apply");
  btn.disabled = r.selected.length === 0;
  btn.onclick = () => fulfillBatch(r.selected.map(o => o.id));
}

function renderStaff() {
  const sched = scheduleOvens(orders);
  // Tally per-baker assigned minutes & orders
  const tally = {};
  staff.forEach(s => { tally[s.id] = { name: s.name, role: s.role, mins: 0, orders: 0 }; });
  sched.assignments.forEach(a => {
    if (tally[a.bakerId]) { tally[a.bakerId].mins += a.dur; tally[a.bakerId].orders += 1; }
  });
  const ovenTally = {};
  ovens.forEach(o => { ovenTally[o.id] = { name: o.name, mins: 0, orders: 0 }; });
  sched.assignments.forEach(a => {
    if (ovenTally[a.ovenId]) { ovenTally[a.ovenId].mins += a.dur; ovenTally[a.ovenId].orders += 1; }
  });

  const host = document.getElementById("staff-panel");
  if (!host) return;
  const max = Math.max(1, sched.makespan);
  host.innerHTML = `
    <div class="staff-section-title">👨‍🍳 Bakers</div>
    ${Object.values(tally).map(t => `
      <div class="staff-row">
        <div class="staff-row-head">
          <span class="staff-name">${t.name} <span class="muted small">· ${t.role}</span></span>
          <span class="muted small tabular">${t.orders} orders · ${t.mins}m</span>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${(t.mins / max) * 100}%"></div></div>
      </div>`).join("")}
    <div class="staff-section-title" style="margin-top:18px;">🔥 Ovens</div>
    ${Object.values(ovenTally).map(t => `
      <div class="staff-row">
        <div class="staff-row-head">
          <span class="staff-name">${t.name}</span>
          <span class="muted small tabular">${t.orders} orders · ${t.mins}m</span>
        </div>
        <div class="bar"><div class="bar-fill" style="width:${(t.mins / max) * 100}%"></div></div>
      </div>`).join("")}
    <div class="muted small" style="margin-top:14px; text-align:center;">Total makespan: <strong class="tabular">${sched.makespan} min</strong></div>
  `;
}

// ---------- CHARTS (vanilla SVG, no libs) ----------
function renderHourlyChart() {
  const host = document.getElementById("chart-hourly");
  if (!host) return;
  // Synthetic hourly distribution from completed orders + plausible base curve
  const base = [2, 3, 8, 12, 14, 11, 9, 8, 10, 13, 15, 12, 9, 6, 4]; // 6am-8pm
  const labels = ["6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p"];
  // Bump current hour by completed orders count
  const completed = orders.filter(o => o.status === "completed");
  const bumped = base.map(v => v + Math.floor(Math.random() * 2));
  const idxNow = Math.min(bumped.length - 1, 6); // pretend it's noon
  bumped[idxNow] += completed.length;
  drawLineChart(host, labels, bumped, "Sales by hour");
}

function renderWeeklyChart() {
  const host = document.getElementById("chart-weekly");
  if (!host) return;
  const days = [];
  for (let d = 6; d >= 0; d--) {
    const dt = new Date(today.getTime() - d * 86400000);
    const key = dateKey(dt);
    const lbl = dt.toLocaleDateString(undefined, { weekday: "short" });
    let rev = salesHistory.filter(s => s.date === key).reduce((s, x) => s + x.revenue, 0);
    if (d === 0) {
      // Today: add completed orders
      rev += orders.filter(o => o.status === "completed").reduce((s, o) => s + o.pricePerUnit * o.quantity, 0);
    }
    days.push({ lbl, rev });
  }
  drawBarChart(host, days.map(d => d.lbl), days.map(d => d.rev), "Revenue this week");
}

function renderCategoryPie() {
  const host = document.getElementById("chart-pie");
  if (!host) return;
  // Aggregate revenue per category from history + today
  const tally = {};
  categories.forEach(c => { tally[c.name] = 0; });
  salesHistory.forEach(s => { if (tally[s.category] !== undefined) tally[s.category] += s.revenue; });
  orders.filter(o => o.status === "completed").forEach(o => {
    const cn = itemMeta[o.item]?.categoryName || "Other";
    tally[cn] = (tally[cn] || 0) + o.pricePerUnit * o.quantity;
  });
  drawPieChart(host, tally);
}

function drawLineChart(host, labels, values, title) {
  const W = 560, H = 200, pad = 30;
  const max = Math.max(1, ...values);
  const stepX = (W - pad * 2) / (labels.length - 1);
  const points = values.map((v, i) => `${pad + i * stepX},${H - pad - (v / max) * (H - pad * 2)}`).join(" ");
  const area = `${pad},${H - pad} ${points} ${pad + (labels.length - 1) * stepX},${H - pad}`;
  const ticks = labels.map((l, i) => i % 2 === 0 ? `<text x="${pad + i * stepX}" y="${H - 8}" class="ax">${l}</text>` : "").join("");
  host.innerHTML = `
    <div class="chart-title">${title}</div>
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="hsl(22 60% 52%)" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="hsl(22 60% 52%)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${area}" fill="url(#lineGrad)"/>
      <polyline points="${points}" fill="none" stroke="hsl(22 60% 52%)" stroke-width="2.5"/>
      ${values.map((v, i) => `<circle cx="${pad + i * stepX}" cy="${H - pad - (v / max) * (H - pad * 2)}" r="3" fill="hsl(22 60% 52%)"/>`).join("")}
      ${ticks}
    </svg>`;
}

function drawBarChart(host, labels, values, title) {
  const W = 560, H = 200, pad = 30;
  const max = Math.max(1, ...values);
  const bw = (W - pad * 2) / labels.length;
  const bars = values.map((v, i) => {
    const h = (v / max) * (H - pad * 2);
    const x = pad + i * bw + 6;
    const y = H - pad - h;
    return `<rect x="${x}" y="${y}" width="${bw - 12}" height="${h}" rx="4" fill="hsl(22 60% 52%)"/>
            <text x="${x + (bw - 12) / 2}" y="${y - 4}" class="ax" text-anchor="middle">$${Math.round(v)}</text>
            <text x="${x + (bw - 12) / 2}" y="${H - 8}" class="ax" text-anchor="middle">${labels[i]}</text>`;
  }).join("");
  host.innerHTML = `<div class="chart-title">${title}</div><svg viewBox="0 0 ${W} ${H}" class="chart-svg" preserveAspectRatio="xMidYMid meet">${bars}</svg>`;
}

function drawPieChart(host, tally) {
  const entries = Object.entries(tally).filter(([, v]) => v > 0);
  const total = entries.reduce((s, [, v]) => s + v, 0) || 1;
  const palette = ["hsl(22 60% 52%)", "hsl(35 80% 60%)", "hsl(345 60% 60%)", "hsl(28 60% 45%)", "hsl(330 65% 65%)", "hsl(85 35% 45%)", "hsl(40 60% 55%)", "hsl(28 40% 30%)", "hsl(355 65% 55%)"];
  let acc = 0;
  const cx = 90, cy = 90, r = 70;
  const slices = entries.map(([name, v], i) => {
    const start = acc / total * Math.PI * 2 - Math.PI / 2;
    acc += v;
    const end = acc / total * Math.PI * 2 - Math.PI / 2;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    return `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z" fill="${palette[i % palette.length]}" stroke="var(--card)" stroke-width="2"/>`;
  }).join("");
  const legend = entries.map(([name, v], i) => `
    <div class="legend-row">
      <span class="legend-dot" style="background:${palette[i % palette.length]}"></span>
      <span class="legend-name">${name}</span>
      <span class="legend-val tabular">${((v / total) * 100).toFixed(0)}%</span>
    </div>`).join("");
  host.innerHTML = `
    <div class="chart-title">Revenue by category</div>
    <div class="pie-wrap">
      <svg viewBox="0 0 180 180" class="pie-svg">${slices}<circle cx="${cx}" cy="${cy}" r="36" fill="var(--card)"/><text x="${cx}" y="${cy - 2}" text-anchor="middle" class="pie-center-num">$${Math.round(total)}</text><text x="${cx}" y="${cy + 14}" text-anchor="middle" class="pie-center-lbl">7-day rev</text></svg>
      <div class="legend">${legend}</div>
    </div>`;
}

function renderReports() {
  const completed = orders.filter(o => o.status === "completed");
  const revenue = completed.reduce((s, o) => s + o.pricePerUnit * o.quantity, 0);
  const profit = completed.reduce((s, o) => s + orderProfit(o, ingredients), 0);
  const items = completed.reduce((s, o) => s + o.quantity, 0);

  document.getElementById("report-stats").innerHTML = `
    <div class="report-stat"><div class="lbl">Orders done</div><div class="val">${completed.length}</div></div>
    <div class="report-stat"><div class="lbl">Items baked</div><div class="val">${items}</div></div>
    <div class="report-stat accent"><div class="lbl">Profit</div><div class="val">$${profit.toFixed(0)}</div></div>`;

  const byItem = completed.reduce((acc, o) => { acc[o.item] = (acc[o.item] || 0) + o.quantity; return acc; }, {});
  const top = Object.entries(byItem).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const max = Math.max(1, ...top.map(([, v]) => v));

  document.getElementById("top-sellers").innerHTML = top.length === 0
    ? `<p class="muted small" style="font-style:italic; margin-top:8px;">No orders fulfilled yet today.</p>`
    : `<div style="margin-top:12px;">${top.map(([n, q]) => `
        <div class="seller">
          <div class="seller-row"><span class="seller-name">${n}</span><span class="seller-qty">${q}</span></div>
          <div class="seller-bar"><div class="seller-bar-fill" style="width:${(q / max) * 100}%"></div></div>
        </div>`).join("")}</div>`;

  // Category breakdown
  const byCat = {};
  completed.forEach(o => {
    const cat = itemMeta[o.item]?.categoryName || "Other";
    byCat[cat] = (byCat[cat] || 0) + o.pricePerUnit * o.quantity;
  });
  const catEntries = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const catMax = Math.max(1, ...catEntries.map(([, v]) => v));
  const catHost = document.getElementById("cat-breakdown");
  if (catHost) {
    catHost.innerHTML = catEntries.length === 0
      ? `<p class="muted small" style="font-style:italic; margin-top:8px;">—</p>`
      : `<div style="margin-top:12px;">${catEntries.map(([n, v]) => `
          <div class="seller">
            <div class="seller-row"><span class="seller-name">${n}</span><span class="seller-qty">$${v.toFixed(0)}</span></div>
            <div class="seller-bar"><div class="seller-bar-fill" style="width:${(v / catMax) * 100}%"></div></div>
          </div>`).join("")}</div>`;
  }

  // Weekly summary
  const weekHost = document.getElementById("week-summary");
  if (weekHost) {
    const days = [];
    for (let d = 6; d >= 0; d--) {
      const dt = new Date(today.getTime() - d * 86400000);
      const key = dateKey(dt);
      let rev = salesHistory.filter(s => s.date === key).reduce((s, x) => s + x.revenue, 0);
      let prof = salesHistory.filter(s => s.date === key).reduce((s, x) => s + x.profit, 0);
      if (d === 0) {
        rev += revenue;
        prof += profit;
      }
      days.push({ key, dt, rev, prof });
    }
    const totalRev = days.reduce((s, d) => s + d.rev, 0);
    const totalProf = days.reduce((s, d) => s + d.prof, 0);
    const best = days.reduce((b, d) => d.rev > b.rev ? d : b, days[0]);
    const margin = totalRev > 0 ? (totalProf / totalRev) * 100 : 0;
    weekHost.innerHTML = `
      <div class="week-row"><span>7-day revenue</span><strong class="tabular">$${totalRev.toFixed(0)}</strong></div>
      <div class="week-row"><span>7-day profit</span><strong class="tabular">$${totalProf.toFixed(0)}</strong></div>
      <div class="week-row"><span>Profit margin</span><strong class="tabular">${margin.toFixed(0)}%</strong></div>
      <div class="week-row"><span>Best day</span><strong>${best.dt.toLocaleDateString(undefined, { weekday: "long" })} · $${best.rev.toFixed(0)}</strong></div>
    `;
  }

  document.getElementById("report-total").textContent = `$${revenue.toFixed(2)}`;
}

function renderCustomers() {
  const host = document.getElementById("customer-list");
  if (!host) return;
  const top = customers.slice().sort((a, b) => b.spent - a.spent).slice(0, 6);
  host.innerHTML = top.map(c => {
    const tier = loyaltyTier(c);
    return `<div class="cust-row">
      <div class="cust-info">
        <span class="cust-name">${escapeHtml(c.name)}</span>
        <span class="cust-meta muted small">${c.orders} orders · $${c.spent.toFixed(0)} spent · ${c.points} pts</span>
      </div>
      <span class="cust-tier" style="background:${tier.color}22; color:${tier.color}; border:1px solid ${tier.color}55;">★ ${tier.name}</span>
    </div>`;
  }).join("");
}

function renderAll() {
  if (!isDashboard()) return;
  renderStats(); renderCatFilter(); renderQueue(); renderInventory(); renderDP();
  renderStaff(); renderHourlyChart(); renderWeeklyChart(); renderCategoryPie();
  renderReports(); renderCustomers();
}

// ---------- ACTIONS ----------
function fulfill(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  if (!canFulfill(o, ingredients)) { toast("Not enough ingredients", "Restock to bake this order.", "error"); return; }
  const profit = orderProfit(o, ingredients);
  ingredients = consume(o, ingredients);
  o.status = "completed";
  // Update customer loyalty
  const c = upsertCustomer(o.customer);
  c.orders += 1;
  const total = o.pricePerUnit * o.quantity;
  c.spent += total;
  c.points += Math.round(total);
  toast(`Fulfilled ${o.item}`, `+$${profit.toFixed(2)} profit · ${c.name} now ${loyaltyTier(c).name}`);
  renderAll();
}

function fulfillBatch(ids) {
  let count = 0, profit = 0;
  for (const id of ids) {
    const o = orders.find(x => x.id === id);
    if (o && canFulfill(o, ingredients)) {
      profit += orderProfit(o, ingredients);
      ingredients = consume(o, ingredients);
      o.status = "completed";
      const c = upsertCustomer(o.customer);
      c.orders += 1;
      const total = o.pricePerUnit * o.quantity;
      c.spent += total;
      c.points += Math.round(total);
      count++;
    }
  }
  if (count) toast(`Baked ${count} optimal orders`, `+$${profit.toFixed(2)} profit`);
  renderAll();
}

function restock() {
  ingredients = ingredients.map(i => ({ ...i, stock: i.capacity }));
  toast("Pantry restocked", "All ingredients back to full.");
  renderAll();
}

// ---------- INIT (dashboard only) ----------
document.addEventListener("DOMContentLoaded", () => {
  if (!isDashboard()) return;

  const catSel = document.getElementById("f-cat");
  const itemSel = document.getElementById("f-item");

  function fillItems(catId) {
    const cat = categories.find(c => c.id === catId) || categories[0];
    itemSel.innerHTML = cat.items.map(it => `<option value="${it.name}">${it.name} — $${it.price.toFixed(2)}</option>`).join("");
    syncDefaults();
  }
  function syncDefaults() {
    const meta = itemMeta[itemSel.value];
    if (meta) {
      document.getElementById("f-price").value = meta.defaultPrice;
      document.getElementById("f-prep").value = meta.defaultPrep;
    }
  }

  catSel.innerHTML = categories.map(c => `<option value="${c.id}">${c.emoji} ${c.name}</option>`).join("");
  fillItems(catSel.value);
  catSel.addEventListener("change", () => fillItems(catSel.value));
  itemSel.addEventListener("change", syncDefaults);

  // Toggle delivery address visibility
  const typeRadios = document.querySelectorAll('input[name="f-type"]');
  const addrLabel = document.getElementById("f-addr-label");
  function syncAddr() {
    const t = document.querySelector('input[name="f-type"]:checked')?.value;
    addrLabel.style.display = t === "delivery" ? "" : "none";
  }
  typeRadios.forEach(r => r.addEventListener("change", syncAddr));
  syncAddr();

  document.getElementById("budget").addEventListener("input", e => {
    budget = +e.target.value;
    renderDP();
  });

  document.getElementById("restock").addEventListener("click", restock);

  document.getElementById("new-order-form").addEventListener("submit", e => {
    e.preventDefault();
    const customer = document.getElementById("f-customer").value.trim();
    if (!customer) { toast("Customer name is required", "", "error"); return; }
    if (customer.length > 60) { toast("Name too long", "Max 60 characters.", "error"); return; }
    const phone = document.getElementById("f-phone").value.trim().slice(0, 20);
    const email = document.getElementById("f-email").value.trim().slice(0, 80);
    const type = document.querySelector('input[name="f-type"]:checked')?.value || "pickup";
    const address = type === "delivery" ? document.getElementById("f-address").value.trim().slice(0, 120) : "";
    const notes = document.getElementById("f-notes").value.trim().slice(0, 200);
    const giftWrap = document.getElementById("f-gift").checked;
    upsertCustomer(customer, phone, email);
    const o = {
      id: `ORD-${1100 + orders.length + 1}`,
      customer,
      item: itemSel.value,
      quantity: +document.getElementById("f-qty").value,
      pricePerUnit: +document.getElementById("f-price").value,
      deadlineMinutes: +document.getElementById("f-deadline").value,
      prepMinutes: +document.getElementById("f-prep").value,
      status: "pending",
      type, address, notes, giftWrap,
    };
    orders.push(o);
    document.getElementById("f-customer").value = "";
    document.getElementById("f-phone").value = "";
    document.getElementById("f-email").value = "";
    document.getElementById("f-address").value = "";
    document.getElementById("f-notes").value = "";
    document.getElementById("f-gift").checked = false;
    toast("Order placed", `${o.quantity} × ${o.item} for ${o.customer}`);
    renderAll();
  });

  // Contact form (cover page parity, but here too if present)
  const contact = document.getElementById("contact-form");
  if (contact) {
    contact.addEventListener("submit", e => {
      e.preventDefault();
      toast("Message sent", "We'll get back within a day.");
      contact.reset();
    });
  }

  renderAll();
});
