/* Kassepris — mock backend data (fictional, demo only).
   Model: STORES are specific local branches. PRODUCTS are generic concepts
   ("Bryggkaffe") that appear in multiple stores; each store lists its own
   store-specific VARIANTS (brand + size + price). The Pro "find cheaper /
   similar" feature reveals (a) cheaper exact variants in non-favorite stores
   and (b) explicit `similar` items where the exact product is missing. */

export const money = (s) => (typeof s === "number" ? s : parseFloat(String(s).replace(/[:,]/, ".")));
export const fmt = (n) => {
  const kr = Math.floor(n);
  const oren = Math.round((n - kr) * 100);
  return kr + "," + String(oren).padStart(2, "0");
};

// ---- Stores: specific branches around Lund (student city) ----
export const STORES = [
  { id: "ica1",   chain: "ica",    name: "ICA Maxi Lund",        short: "Maxi",   area: "Nova Lund",     dist: 1.6, open: "22:00" },
  { id: "ica2",   chain: "ica",    name: "ICA Kvantum Malmborgs", short: "Kvantum", area: "Tuna",         dist: 0.8, open: "22:00" },
  { id: "coop1",  chain: "coop",   name: "Coop Nära Clemenstorget", short: "Nära", area: "Centrum",      dist: 0.5, open: "23:00" },
  { id: "coop2",  chain: "coop",   name: "Coop Extra Lund",       short: "Extra",  area: "Gunnesbo",      dist: 2.3, open: "22:00" },
  { id: "willys1",chain: "willys", name: "Willys Nova Lund",      short: "Nova",   area: "Nova Lund",     dist: 1.7, open: "22:00" },
  { id: "willys2",chain: "willys", name: "Willys Hemma Bankgatan", short: "Hemma", area: "Centrum",       dist: 0.4, open: "22:00" },
];
export const storeById = (id) => STORES.find((s) => s.id === id);

// ---- Categories ----
export const CATEGORIES = [
  { id: "mejeri",  name: "Mejeri & ägg",   tint: "#E7F1E8" },
  { id: "frukt",   name: "Frukt & grönt",  tint: "#ECF1D9" },
  { id: "kott",    name: "Kött & fågel",   tint: "#F5E1DB" },
  { id: "fisk",    name: "Fisk & skaldjur",tint: "#E4EEF0" },
  { id: "skafferi",name: "Skafferi",       tint: "#F1E8D6" },
  { id: "brod",    name: "Bröd & bageri",  tint: "#F3E4C9" },
  { id: "dryck",   name: "Dryck",          tint: "#E5EDF3" },
  { id: "snacks",  name: "Snacks & godis", tint: "#F2E3D2" },
];
export const catById = (id) => CATEGORIES.find((c) => c.id === id);

// variant + store-block authoring helpers
const vr = (name, size, price, unit, extra = {}) => ({ name, size, price, unit, ...extra });
const at = (storeId, variants) => ({ storeId, variants });

// ---- Products ----
export const PRODUCTS = [
  // ============ MEJERI ============
  {
    id: "mjolk", name: "Mellanmjölk", sub: "1,5 % mjölk", cat: "mejeri", unit: "kr/l", hero: true,
    stores: [
      at("ica1",   [vr("Arla Ko Mellanmjölk", "1,5 l", "18,90", "kr/l", { cmp: "12,60 kr/l" }), vr("ICA Mellanmjölk", "1 l", "13,50", "kr/l")]),
      at("ica2",   [vr("Arla Ko Mellanmjölk", "1 l", "14,90", "kr/l")]),
      at("coop1",  [vr("Änglamark Eko Mellanmjölk", "1 l", "16,90", "kr/l", { member: true }), vr("Coop Mellanmjölk", "1 l", "13,90", "kr/l")]),
      at("willys1",[vr("Garant Mellanmjölk", "1 l", "12,90", "kr/l", { ord: "14,90", discount: "-13%" }), vr("Arla Ko Mellanmjölk", "1,5 l", "17,90", "kr/l")]),
      at("willys2",[vr("Garant Mellanmjölk", "1 l", "12,90", "kr/l")]),
    ],
    similar: [],
  },
  {
    id: "smor", name: "Smör & bregott", sub: "Bordssmör, normalsaltat", cat: "mejeri", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("Arla Bregott", "600 g", "39,90", "kr/förp", { ord: "52,90", discount: "-25%" })]),
      at("coop1",  [vr("Arla Bregott", "600 g", "42,90", "kr/förp"), vr("Änglamark Eko Smör", "500 g", "44,90", "kr/förp", { member: true })]),
      at("willys1",[vr("Bregott", "600 g", "38,50", "kr/förp"), vr("Garant Bordsmargarin", "600 g", "22,90", "kr/förp")]),
    ],
  },
  {
    id: "agg", name: "Ägg", sub: "Frigående, stora", cat: "mejeri", unit: "kr/st",
    stores: [
      at("ica2",   [vr("ICA Ägg frigående", "15-p", "34,90", "kr/förp"), vr("Kronägg Frigående", "6-p", "22,90", "kr/förp")]),
      at("coop1",  [vr("Änglamark Eko Ägg", "6-p", "29,90", "kr/förp", { member: true })]),
      at("willys1",[vr("Garant Ägg frigående", "10-p", "24,90", "kr/förp", { ord: "29,90", discount: "-17%" })]),
      at("coop2",  [vr("Coop Ägg frigående", "12-p", "28,90", "kr/förp")]),
    ],
  },
  {
    id: "yoghurt", name: "Naturell yoghurt", sub: "3 % fetthalt", cat: "mejeri", unit: "kr/l",
    stores: [
      at("ica1",   [vr("Arla Yoggi Naturell", "1 kg", "18,90", "kr/kg")]),
      at("coop1",  [vr("Änglamark Eko Yoghurt", "1 l", "21,90", "kr/l", { member: true })]),
      at("willys2",[vr("Garant Yoghurt Naturell", "1 l", "12,90", "kr/l", { ord: "16,90", discount: "-24%" })]),
    ],
  },
  {
    id: "ost", name: "Riven ost", sub: "Mellanlagrad", cat: "mejeri", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("ICA Riven ost 28%", "500 g", "44,90", "kr/förp", { ord: "59,90", discount: "-25%" })]),
      at("coop2",  [vr("Coop Riven ost", "300 g", "32,90", "kr/förp")]),
      at("willys1",[vr("Garant Riven ost", "500 g", "42,90", "kr/förp")]),
    ],
  },

  // ============ FRUKT & GRÖNT ============
  {
    id: "bananer", name: "Bananer", sub: "Lösvikt", cat: "frukt", unit: "kr/kg", hero: true,
    stores: [
      at("ica2",   [vr("Bananer", "lösvikt", "16,90", "kr/kg")]),
      at("coop1",  [vr("Bananer Änglamark Eko", "lösvikt", "24,90", "kr/kg", { member: true }), vr("Bananer", "lösvikt", "15,90", "kr/kg")]),
      at("willys1",[vr("Bananer", "lösvikt", "12,90", "kr/kg", { ord: "18,90", discount: "-32%" })]),
      at("willys2",[vr("Bananer", "lösvikt", "13,90", "kr/kg")]),
      at("ica1",   [vr("Bananer", "lösvikt", "16,90", "kr/kg")]),
    ],
  },
  {
    id: "avokado", name: "Avokado", sub: "Mogen, klass 1", cat: "frukt", unit: "kr/st",
    stores: [
      at("ica1",   [vr("Avokado 4-pack", "4-p", "34,90", "kr/förp", { ord: "44,90", discount: "-22%" })]),
      at("coop1",  [vr("Avokado", "st", "12,90", "kr/st")]),
      at("willys1",[vr("Avokado 4-pack", "4-p", "29,90", "kr/förp")]),
    ],
  },
  {
    id: "tomater", name: "Cherrytomater", sub: "250 g", cat: "frukt", unit: "kr/kg",
    stores: [
      at("ica2",   [vr("Cherrytomater", "250 g", "16,90", "kr/förp")]),
      at("willys1",[vr("Garant Cherrytomater", "250 g", "12,90", "kr/förp", { ord: "16,90", discount: "-24%" })]),
      at("coop2",  [vr("Änglamark Cherrytomater", "250 g", "19,90", "kr/förp", { member: true })]),
    ],
  },
  {
    id: "sallad", name: "Salladsmix", sub: "Färdigskuren", cat: "frukt", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("ICA Salladsmix", "175 g", "19,90", "kr/förp")]),
      at("coop1",  [vr("Coop Salladsmix", "150 g", "17,90", "kr/förp")]),
    ],
  },

  // ============ KÖTT & FÅGEL ============
  {
    id: "kyckling", name: "Färsk kycklingfilé", sub: "Fryst alt. färsk", cat: "kott", unit: "kr/kg", hero: true,
    stores: [
      at("ica1",   [vr("Kronfågel Kycklingfilé", "900 g", "79,90", "kr/förp", { cmp: "88,78 kr/kg" }), vr("ICA Kycklingfilé", "700 g", "65,90", "kr/förp")]),
      at("ica2",   [vr("Kronfågel Kycklingfilé", "900 g", "84,90", "kr/förp")]),
      at("coop1",  [vr("Guldfågeln Kycklingfilé", "800 g", "72,90", "kr/förp", { member: true })]),
      at("willys1",[vr("Garant Kycklingfilé fryst", "1 kg", "69,90", "kr/förp", { ord: "89,90", discount: "-22%", cmp: "69,90 kr/kg" })]),
    ],
  },
  {
    id: "fars", name: "Blandfärs", sub: "Nöt & fläsk 50/50", cat: "kott", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("ICA Blandfärs", "800 g", "59,90", "kr/förp", { ord: "79,90", discount: "-25%" })]),
      at("coop1",  [vr("Coop Blandfärs", "500 g", "44,90", "kr/förp")]),
      at("willys1",[vr("Garant Blandfärs", "1 kg", "69,90", "kr/förp")]),
      at("willys2",[vr("Scan Blandfärs", "500 g", "49,90", "kr/förp")]),
    ],
  },
  {
    id: "korv", name: "Falukorv", sub: "Klassisk", cat: "kott", unit: "kr/kg",
    stores: [
      at("ica2",   [vr("Scan Falukorv", "800 g", "32,90", "kr/förp")]),
      at("willys1",[vr("Garant Falukorv", "800 g", "22,90", "kr/förp", { ord: "29,90", discount: "-23%" })]),
    ],
  },

  // ============ FISK ============
  {
    id: "lax", name: "Laxfilé", sub: "Färsk, benfri", cat: "fisk", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("ICA Laxfilé", "400 g", "69,90", "kr/förp")]),
      at("coop1",  [vr("Coop Laxfilé ASC", "500 g", "84,90", "kr/förp", { member: true })]),
      at("willys1",[vr("Garant Laxfilé fryst", "400 g", "54,90", "kr/förp", { ord: "69,90", discount: "-21%" })]),
    ],
  },

  // ============ SKAFFERI ============
  {
    id: "kaffe", name: "Bryggkaffe", sub: "Mellanrost, malet", cat: "skafferi", unit: "kr/kg", hero: true, featured: true,
    stores: [
      at("ica1",   [vr("Gevalia Mellanrost", "450 g", "49,90", "kr/förp", { ord: "69,90", discount: "-29%", cmp: "110,89 kr/kg" }), vr("Zoégas Mollbergs", "450 g", "54,90", "kr/förp")]),
      at("ica2",   [vr("Gevalia Mellanrost", "450 g", "52,90", "kr/förp")]),
      at("coop1",  [vr("Änglamark Eko Bryggkaffe", "450 g", "59,90", "kr/förp", { member: true }), vr("Zoégas Skånerost", "450 g", "56,90", "kr/förp")]),
      at("willys1",[vr("Gevalia Mellanrost", "450 g", "44,90", "kr/förp", { ord: "64,90", discount: "-31%", cmp: "99,78 kr/kg" }), vr("Garant Bryggkaffe", "500 g", "34,90", "kr/förp", { cmp: "69,80 kr/kg" })]),
      at("willys2",[vr("Garant Bryggkaffe", "500 g", "29,90", "kr/förp", { ord: "36,90", discount: "-19%", cmp: "59,80 kr/kg" }), vr("Löfbergs Medium", "450 g", "47,90", "kr/förp")]),
      at("coop2",  [vr("Zoégas Skånerost", "450 g", "55,90", "kr/förp")]),
    ],
  },
  {
    id: "pasta", name: "Pasta", sub: "Spaghetti / penne", cat: "skafferi", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("Barilla Spaghetti", "1 kg", "24,90", "kr/förp"), vr("ICA Pasta Penne", "500 g", "9,90", "kr/förp")]),
      at("coop1",  [vr("Zeta Spaghetti", "500 g", "16,90", "kr/förp")]),
      at("willys1",[vr("Garant Pasta", "1 kg", "12,90", "kr/förp", { ord: "16,90", discount: "-24%" })]),
      at("willys2",[vr("Barilla Penne", "500 g", "14,90", "kr/förp")]),
    ],
  },
  {
    id: "krosstomat", name: "Krossade tomater", sub: "Konserv", cat: "skafferi", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("Mutti Krossade tomater", "400 g", "12,90", "kr/st")]),
      at("coop1",  [vr("Coop Krossade tomater", "390 g", "6,90", "kr/st")]),
      at("willys1",[vr("Garant Krossade tomater", "390 g", "5,90", "kr/st", { ord: "7,90", discount: "-25%" })]),
    ],
  },
  {
    id: "havregryn", name: "Havregryn", sub: "Fullkorn", cat: "skafferi", unit: "kr/kg",
    // NOTE: intentionally NOT in coop1 (a common favorite) -> drives the "similar" Pro reveal.
    stores: [
      at("ica1",   [vr("AXA Havregryn", "1,5 kg", "22,90", "kr/förp", { cmp: "15,27 kr/kg" })]),
      at("ica2",   [vr("AXA Havregryn", "1,5 kg", "24,90", "kr/förp")]),
      at("willys1",[vr("Garant Havregryn", "1,5 kg", "16,90", "kr/förp", { ord: "22,90", discount: "-26%", cmp: "11,27 kr/kg" })]),
    ],
    similar: [
      { storeId: "coop1", name: "Änglamark Eko Havregryn", size: "750 g", price: "12,90", unit: "kr/förp", note: "Liknande" },
      { storeId: "coop2", name: "Coop Havregryn", size: "1,5 kg", price: "18,90", unit: "kr/förp", note: "Liknande" },
    ],
  },
  {
    id: "musli", name: "Müsli", sub: "Frukt & nöt", cat: "skafferi", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("Start Müsli Frukt", "750 g", "29,90", "kr/förp")]),
      at("coop1",  [vr("Änglamark Eko Müsli", "600 g", "32,90", "kr/förp", { member: true })]),
      at("willys1",[vr("Garant Müsli", "750 g", "19,90", "kr/förp", { ord: "26,90", discount: "-26%" })]),
    ],
  },

  // ============ BRÖD ============
  {
    id: "brod", name: "Rågbröd", sub: "Skivat, mörkt", cat: "brod", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("Pågen Rågbröd", "500 g", "27,90", "kr/st")]),
      at("coop1",  [vr("Skogaholm Limpa", "680 g", "24,90", "kr/st")]),
      at("willys1",[vr("Garant Rågbröd", "500 g", "16,90", "kr/st", { ord: "21,90", discount: "-23%" })]),
    ],
  },
  {
    id: "knacke", name: "Knäckebröd", sub: "Fullkorn", cat: "brod", unit: "kr/kg",
    stores: [
      at("ica2",   [vr("Wasa Husman", "260 g", "18,90", "kr/st")]),
      at("willys1",[vr("Garant Knäckebröd", "300 g", "9,90", "kr/st")]),
    ],
  },

  // ============ DRYCK ============
  {
    id: "vatten", name: "Kolsyrat vatten", sub: "Naturell", cat: "dryck", unit: "kr/l",
    stores: [
      at("ica1",   [vr("Loka Naturell", "6×0,5 l", "34,90", "kr/förp")]),
      at("coop1",  [vr("Ramlösa Citrus", "6×0,33 l", "39,90", "kr/förp")]),
      at("willys1",[vr("Garant Kolsyrat vatten", "1,5 l", "4,90", "kr/st", { ord: "6,90", discount: "-29%" })]),
    ],
  },
  {
    id: "juice", name: "Apelsinjuice", sub: "Färskpressad stil", cat: "dryck", unit: "kr/l",
    stores: [
      at("ica1",   [vr("Bravo Apelsin", "1 l", "22,90", "kr/st")]),
      at("coop1",  [vr("God Morgon Apelsin", "1 l", "24,90", "kr/st")]),
      at("willys1",[vr("Garant Apelsinjuice", "1 l", "14,90", "kr/st", { ord: "18,90", discount: "-21%" })]),
    ],
  },

  // ============ SNACKS ============
  {
    id: "choklad", name: "Chokladkaka", sub: "Mjölkchoklad", cat: "snacks", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("Marabou Mjölkchoklad", "200 g", "22,90", "kr/st", { ord: "32,90", discount: "-30%" })]),
      at("coop1",  [vr("Marabou Mjölkchoklad", "200 g", "26,90", "kr/st")]),
      at("willys1",[vr("Marabou Mjölkchoklad", "200 g", "21,90", "kr/st")]),
    ],
  },
  {
    id: "chips", name: "Chips", sub: "Lättsaltat", cat: "snacks", unit: "kr/kg",
    stores: [
      at("ica1",   [vr("OLW Lättsaltade", "275 g", "24,90", "kr/st")]),
      at("willys1",[vr("Estrella Sourcream", "275 g", "19,90", "kr/st", { ord: "26,90", discount: "-26%" })]),
      at("coop2",  [vr("OLW Cheez Doodles", "160 g", "22,90", "kr/st")]),
    ],
  },
];

export const productById = (id) => PRODUCTS.find((p) => p.id === id);

// cheapest variant across a given set of store ids
export function bestVariant(product, storeIds) {
  let best = null;
  product.stores.forEach((blk) => {
    if (storeIds && !storeIds.includes(blk.storeId)) return;
    blk.variants.forEach((v) => {
      const val = money(v.price);
      if (!best || val < best.val) best = { val, variant: v, storeId: blk.storeId };
    });
  });
  return best;
}
// most expensive (for savings calc) among a set
export function worstVariant(product, storeIds) {
  let worst = null;
  product.stores.forEach((blk) => {
    if (storeIds && !storeIds.includes(blk.storeId)) return;
    blk.variants.forEach((v) => {
      const val = money(v.price);
      if (!worst || val > worst.val) worst = { val, variant: v, storeId: blk.storeId };
    });
  });
  return worst;
}
export const availableStoreIds = (product) => product.stores.map((b) => b.storeId);
export const hasDiscount = (product) =>
  product.stores.some((b) => b.variants.some((v) => v.discount));

export const DEFAULT_FAVORITES = ["ica1", "coop1", "willys1"];

export const DEFAULT_LIST = [];
export const DEFAULT_SAVED = [];

export const CITY = "Lund";
