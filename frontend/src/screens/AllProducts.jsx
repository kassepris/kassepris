/* Veckans erbjudanden — search + filter (was "Sök"). Web layout. */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button, Switch, Input } from "../design-system/components.jsx";

const { Icon, ProductCard, Segmented, metaOf, pressHandlers, PageContainer } = A;

const SORTS = [
  { value: "price", label: "Lägsta pris" },
  { value: "discount", label: "Störst rabatt" },
  { value: "name", label: "A–Ö" },
];

const hasEco = (p) => p.stores.some((b) => b.variants.some((v) => /eko|ekolog/i.test(v.name)));
const hasMember = (p) => p.stores.some((b) => b.variants.some((v) => v.member));

function AllProducts({ favorites, initial, onOpenProduct, onManageStores }) {
  const init = initial || {};
  const [query, setQuery] = React.useState(init.query || "");
  const [category, setCategory] = React.useState(init.category || "all");
  const [storeSel, setStoreSel] = React.useState(init.store ? [init.store] : favorites.slice());
  const [onlyDeals, setOnlyDeals] = React.useState(!!init.deals);
  const [eco, setEco] = React.useState(false);
  const [member, setMember] = React.useState(false);
  const [sort, setSort] = React.useState("price");
  const [maxPrice, setMaxPrice] = React.useState(100);
  const [filterOpen, setFilterOpen] = React.useState(false);

  const scope = storeSel.length ? storeSel : favorites;

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = K.PRODUCTS.filter((p) => {
      if (category !== "all" && p.cat !== category) return false;
      const avail = K.availableStoreIds(p);
      if (!scope.some((id) => avail.includes(id))) return false;
      if (onlyDeals) {
        const inScope = p.stores.filter((b) => scope.includes(b.storeId));
        if (!inScope.some((b) => b.variants.some((v) => v.discount))) return false;
      }
      if (eco && !hasEco(p)) return false;
      if (member && !hasMember(p)) return false;
      if (q) {
        const hay = (p.name + " " + (p.sub || "") + " " + p.stores.map((b) => b.variants.map((v) => v.name).join(" ")).join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      const best = K.bestVariant(p, scope);
      if (best && best.val > maxPrice) return false;
      return true;
    });
    list.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "sv");
      if (sort === "discount") {
        const d = (p) => Math.max(0, ...p.stores.filter((x) => scope.includes(x.storeId)).flatMap((x) => x.variants.map((v) => v.ord ? (K.money(v.ord) - K.money(v.price)) : 0)));
        return d(b) - d(a);
      }
      const ba = K.bestVariant(a, scope), bb = K.bestVariant(b, scope);
      return (ba ? ba.val : 999) - (bb ? bb.val : 999);
    });
    return list;
  }, [query, category, storeSel, onlyDeals, eco, member, sort, maxPrice, favorites]);

  const activeCount = (onlyDeals ? 1 : 0) + (eco ? 1 : 0) + (member ? 1 : 0) + (maxPrice < 100 ? 1 : 0) + (storeSel.length !== favorites.length ? 1 : 0) + (sort !== "price" ? 1 : 0);
  const clearAll = () => { setOnlyDeals(false); setEco(false); setMember(false); setSort("price"); setMaxPrice(100); setStoreSel(favorites.slice()); };
  const filterProps = { sort, setSort, onlyDeals, setOnlyDeals, eco, setEco, member, setMember, maxPrice, setMaxPrice, storeSel, setStoreSel, favorites, onManageStores, clearAll };

  return (
    <PageContainer>
      <A.PageHeader title="Veckans erbjudanden" sub={`${A.WEEK} · ${results.length} varor i dina butiker`} />

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* desktop filter rail */}
        <aside className="kp-filter-rail" style={{ width: 250, flexShrink: 0, position: "sticky", top: 16 }}>
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>Filter</span>
              {activeCount ? <button onClick={clearAll} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-sm)" }}>Rensa</button> : null}
            </div>
            <FilterBody {...filterProps} />
          </div>
        </aside>

        {/* results column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Input placeholder="Sök vara, t.ex. kaffe" size="lg" value={query} onChange={(e) => setQuery(e.target.value)} icon={<Icon name="search" size={19} color="var(--text-secondary)" />} />
            </div>
            <button className="kp-filter-btn" onClick={() => setFilterOpen(true)} style={{ position: "relative", alignItems: "center", gap: 6, background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "0 16px", cursor: "pointer", boxShadow: "var(--shadow-card)", color: "var(--text-primary)", font: "var(--text-label-md)" }}>
              <Icon name="filter" size={17} /> Filter
              {activeCount ? <span style={{ minWidth: 18, height: 18, padding: "0 5px", background: "var(--green-800)", color: "var(--cream-050)", borderRadius: 999, font: "700 11px/18px var(--font-body)", textAlign: "center" }}>{activeCount}</span> : null}
            </button>
          </div>

          {/* category chips */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", margin: "0 0 14px", paddingBottom: 4 }}>
            <CatChip label="Alla" on={category === "all"} onClick={() => setCategory("all")} />
            {K.CATEGORIES.map((c) => <CatChip key={c.id} label={c.name} on={category === c.id} onClick={() => setCategory(c.id)} dot={c.tint} />)}
          </div>

          {/* active filter chips */}
          {activeCount ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {onlyDeals ? <RemChip label="Endast rea" onX={() => setOnlyDeals(false)} /> : null}
              {eco ? <RemChip label="Ekologiskt" onX={() => setEco(false)} /> : null}
              {member ? <RemChip label="Medlemspris" onX={() => setMember(false)} /> : null}
              {maxPrice < 100 ? <RemChip label={`Max ${maxPrice} kr`} onX={() => setMaxPrice(100)} /> : null}
              {sort !== "price" ? <RemChip label={SORTS.find((s) => s.value === sort).label} onX={() => setSort("price")} /> : null}
              {storeSel.length !== favorites.length ? <RemChip label={`${storeSel.length} butiker`} onX={() => setStoreSel(favorites.slice())} /> : null}
            </div>
          ) : null}

          <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", marginBottom: 14 }}>{results.length} varor</div>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 20px", color: "var(--text-secondary)" }}>
              <Icon name="search" size={36} color="var(--ink-300)" />
              <p style={{ font: "var(--text-body-md)", marginTop: 10 }}>Inga varor matchar. Prova att rensa filtren.</p>
            </div>
          ) : (
            <div className="kp-product-grid">
              {results.map((p) => <ProductCard key={p.id} product={p} favorites={scope} onOpen={onOpenProduct} />)}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter sheet */}
      <A.Sheet open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter & sortering"
        footer={
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}><Button variant="secondary" size="lg" onClick={clearAll}><span style={{ width: "100%", textAlign: "center" }}>Rensa</span></Button></div>
            <div style={{ flex: 2 }} {...pressHandlers()}><Button variant="primary" size="lg" onClick={() => setFilterOpen(false)}><span style={{ width: "100%", textAlign: "center" }}>Visa {results.length} varor</span></Button></div>
          </div>
        }>
        <FilterBody {...filterProps} />
      </A.Sheet>
    </PageContainer>
  );
}

function CatChip({ label, on, onClick, dot }) {
  return (
    <button onClick={onClick} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 7, cursor: "pointer", border: `1px solid ${on ? "transparent" : "var(--border-default)"}`, borderRadius: "var(--radius-pill)", padding: dot ? "7px 14px 7px 8px" : "7px 14px", background: on ? "var(--green-800)" : "var(--bg-surface)", color: on ? "var(--cream-050)" : "var(--text-primary)", font: "var(--text-label-md)", whiteSpace: "nowrap" }}>
      {dot ? <span style={{ width: 18, height: 18, borderRadius: "50%", background: dot, display: "inline-block" }} /> : null}
      {label}
    </button>
  );
}
function RemChip({ label, onX }) {
  return (
    <button onClick={onX} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--bg-surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-pill)", padding: "6px 8px 6px 12px", font: "var(--text-label-sm)", color: "var(--text-primary)", cursor: "pointer" }}>
      {label}<Icon name="x" size={14} color="var(--text-secondary)" />
    </button>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <Label noMargin>{label}</Label>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

function FilterBody({ sort, setSort, onlyDeals, setOnlyDeals, eco, setEco, member, setMember, maxPrice, setMaxPrice, storeSel, setStoreSel, favorites, onManageStores }) {
  const toggleStore = (id) => setStoreSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div>
        <Label>Sortera</Label>
        <Segmented options={SORTS} value={sort} onChange={setSort} />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <Label noMargin>Butiker</Label>
          <button onClick={onManageStores} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-sm)" }}>Hantera</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {favorites.map((id) => {
            const m = metaOf(id), s = K.storeById(id), on = storeSel.includes(id);
            return (
              <button key={id} onClick={() => toggleStore(id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: "var(--radius-md)", cursor: "pointer", background: on ? "color-mix(in srgb, var(--green-700) 7%, var(--white))" : "var(--bg-surface)", border: `1px solid ${on ? "var(--green-700)" : "var(--border-default)"}` }}>
                <span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>{m.label}</span>
                <span style={{ flex: 1, textAlign: "left", minWidth: 0, font: "var(--text-body-sm)", color: "var(--ink-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.short}</span>
                <span style={{ width: 20, height: 20, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", background: on ? "var(--green-800)" : "transparent", border: on ? "none" : "1.5px solid var(--border-strong)", flexShrink: 0 }}>{on ? <Icon name="check" size={13} color="var(--cream-050)" /> : null}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 4, borderTop: "1px solid var(--border-default)" }}>
        <div style={{ height: 2 }} />
        <ToggleRow label="Endast rea" checked={onlyDeals} onChange={setOnlyDeals} />
        <ToggleRow label="Ekologiskt" checked={eco} onChange={setEco} />
        <ToggleRow label="Visa medlemspris" checked={member} onChange={setMember} />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <Label noMargin>Maxpris</Label>
          <span style={{ font: "var(--text-label-md)", color: "var(--green-800)" }}>{maxPrice >= 100 ? "Ingen gräns" : `${maxPrice} kr`}</span>
        </div>
        <input type="range" min="5" max="100" step="5" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--green-800)" }} />
      </div>
    </div>
  );
}
function Label({ children, noMargin }) {
  return <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: noMargin ? 0 : 10 }}>{children}</div>;
}

export default AllProducts;
