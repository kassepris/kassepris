/* Home / dashboard (Hem) — web layout, list quick-nav, distinct from Erbjudanden. */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";

const { Icon, ProductCard, SectionHeader, SmartListCard, SaveChip, ImageTile, metaOf, pressHandlers, PageContainer } = A;

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function FavStoreChip({ storeId, onClick }) {
  const m = metaOf(storeId), s = K.storeById(storeId);
  return (
    <button onClick={onClick} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10, background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "9px 14px 9px 9px", boxShadow: "var(--shadow-card)", cursor: "pointer", textAlign: "left" }}>
      <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", background: m.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="store" size={18} color={m.color} /></span>
      <span>
        <span style={{ display: "block", font: "var(--text-label-md)", color: "var(--ink-900)" }}>{m.label} {s.short}</span>
        <span style={{ display: "block", font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{s.dist} km</span>
      </span>
    </button>
  );
}

function ListCard({ list, favorites, authed, onOpenList, onBrowse, onLogin }) {
  let total = 0, worstTotal = 0;
  list.forEach((it) => {
    const p = K.productById(it.productId); if (!p) return;
    const scope = favorites.filter((id) => K.availableStoreIds(p).includes(id));
    const b = K.bestVariant(p, scope.length ? scope : K.availableStoreIds(p));
    const w = K.worstVariant(p, scope.length ? scope : K.availableStoreIds(p));
    if (b) total += b.val; if (w) worstTotal += w.val;
  });
  const savings = worstTotal - total;
  const empty = list.length === 0;

  return (
    <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 20, display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", background: "var(--green-800)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="list" size={18} color="var(--brand-accent)" /></span>
          <span style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>Din lista</span>
        </span>
        {!empty ? <button onClick={onOpenList} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-md)", display: "inline-flex", alignItems: "center", gap: 2 }}>Öppna <Icon name="right" size={16} /></button> : null}
      </div>

      {empty ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, padding: "6px 0" }}>
          <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>Lägg till varor så räknar vi ut var de är billigast den här veckan.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={onBrowse} {...pressHandlers()} style={{ cursor: "pointer", background: "var(--green-800)", color: "var(--cream-050)", border: "none", borderRadius: "var(--radius-md)", padding: "11px 18px", font: "var(--text-label-md)", display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name="plus" size={18} color="var(--cream-050)" /> Lägg till varor</button>
            {!authed ? <button onClick={onLogin} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-md)" }}>Logga in för att spara</button> : null}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)", marginBottom: 2 }}>Billigast totalt</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ font: "var(--text-display-md)", color: "var(--green-800)" }}>{K.fmt(total)}</span>
                <span style={{ font: "var(--text-label-md)", color: "var(--text-secondary)" }}>kr</span>
              </div>
            </div>
            {savings > 0.001 ? <A.SaveChip>{`Spar ${K.fmt(savings)} kr`}</A.SaveChip> : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 2 }}>
            {list.slice(0, 3).map((it) => {
              const p = K.productById(it.productId); if (!p) return null;
              const scope = favorites.filter((id) => K.availableStoreIds(p).includes(id));
              const b = K.bestVariant(p, scope.length ? scope : K.availableStoreIds(p));
              return (
                <div key={it.productId} style={{ display: "flex", alignItems: "center", gap: 8, font: "var(--text-body-sm)", color: "var(--ink-700)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-150)", flexShrink: 0 }} />
                  <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: it.checked ? "line-through" : "none", opacity: it.checked ? 0.6 : 1 }}>{p.name}</span>
                  <span style={{ font: "var(--text-label-sm)", color: "var(--green-800)" }}>{b ? b.variant.price : "–"}</span>
                </div>
              );
            })}
            {list.length > 3 ? <div style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>+{list.length - 3} till</div> : null}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

// Spotlight: biggest price spread this week among your stores — same-unit comparisons only
function SpotlightCompare({ favorites, onOpen }) {
  const pick = React.useMemo(() => {
    let best = null, spread = -1;
    K.PRODUCTS.forEach((p) => {
      const inFav = favorites.filter((id) => K.availableStoreIds(p).includes(id));
      if (inFav.length < 2) return;
      const rows = inFav.map((id) => ({ id, v: K.bestVariant(p, [id]) })).filter((r) => r.v);
      if (rows.length < 2) return;
      // only compare when every store's price is in the same unit (avoid 1,5 l vs 6-pack)
      if (new Set(rows.map((r) => r.v.variant.unit)).size !== 1) return;
      const vals = rows.map((r) => r.v.val);
      const s = Math.max(...vals) - Math.min(...vals);
      if (s > spread) { spread = s; best = { p, rows: rows.sort((a, b) => a.v.val - b.v.val), save: s }; }
    });
    return best;
  }, [favorites]);
  if (!pick) return null;
  const { p, rows, save } = pick;
  const cheapStore = K.storeById(rows[0].id);
  return (
    <div>
      <SectionHeader title="Värt att jämföra" actionLabel="Se varan" onAction={() => onOpen(p)} />
      <button onClick={() => onOpen(p)} {...pressHandlers(0.99)} style={{ width: "100%", textAlign: "left", cursor: "pointer", border: "none", background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 16, display: "flex", gap: 16, alignItems: "stretch", flexWrap: "wrap", transition: "transform var(--duration-fast) var(--ease-standard)" }}>
        <div className="kp-spot-img" style={{ width: 120, flexShrink: 0 }}><ImageTile product={p} aspect="1 / 1" radius="var(--radius-md)" /></div>
        <div style={{ flex: 1, minWidth: 210, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>{p.name}</div>
              <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{p.sub} · billigast hos {metaOf(rows[0].id).label} {cheapStore.short}</div>
            </div>
            {save > 0.001 ? <SaveChip>{`Spar ${K.fmt(save)} kr`}</SaveChip> : null}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${rows.length}, minmax(0, 1fr))`, gap: 8 }}>
            {rows.map((r, i) => {
              const m = metaOf(r.id), cheap = i === 0;
              return (
                <div key={r.id} style={{ padding: "10px 12px", borderRadius: "var(--radius-md)", background: cheap ? "var(--yellow-100)" : "var(--bg-surface-sunken)", border: `1px solid ${cheap ? "var(--yellow-500)" : "var(--border-default)"}` }}>
                  <span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "2px 8px", borderRadius: "var(--radius-pill)" }}>{m.label}</span>
                  <div style={{ font: "var(--text-display-sm)", color: cheap ? "var(--green-800)" : "var(--ink-700)", marginTop: 6 }}>{r.v.variant.price}</div>
                  <div style={{ font: "var(--text-label-sm)", color: cheap ? "var(--green-800)" : "var(--text-secondary)" }}>{cheap ? "Billigast" : r.v.variant.unit}</div>
                </div>
              );
            })}
          </div>
        </div>
      </button>
    </div>
  );
}

function Home({ user, authed, city, favorites, list, onOpenProduct, onSearch, onManageStores, onSmart, onOpenList, onLogin }) {
  const deals = K.PRODUCTS
    .filter((p) => K.availableStoreIds(p).some((id) => favorites.includes(id)) && K.hasDiscount(p))
    .map((p) => { const best = K.bestVariant(p, favorites); const disc = best && best.variant.ord ? (K.money(best.variant.ord) - best.val) : 0; return { p, disc }; })
    .sort((a, b) => b.disc - a.disc).slice(0, 8).map((x) => x.p);

  return (
    <PageContainer>
      {/* greeting */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
        <div>
          <div style={{ marginBottom: 8 }}><A.WeekChip /></div>
          <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: 0 }}>{authed ? `Hej ${cap(user)}!` : "Veckans erbjudanden"}</h1>
          <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: "6px 0 0" }}>De bästa priserna i dina butiker just nu.</p>
        </div>
      </div>

      {/* your stores */}
      <div style={{ marginBottom: 24 }}>
        <SectionHeader title="Dina butiker" actionLabel="Ändra" onAction={onManageStores} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {favorites.map((id) => <FavStoreChip key={id} storeId={id} onClick={() => onSearch({ store: id })} />)}
          <button onClick={onManageStores} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "1.5px dashed var(--border-strong)", borderRadius: "var(--radius-md)", padding: "0 16px", cursor: "pointer", color: "var(--text-secondary)", font: "var(--text-label-md)" }}>
            <Icon name="plus" size={18} /> Lägg till
          </button>
        </div>
      </div>

      {/* dashboard: list + smart list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 30 }}>
        <ListCard list={list} favorites={favorites} authed={authed} onOpenList={onOpenList} onBrowse={() => onSearch()} onLogin={onLogin} />
        <SmartListCard onClick={onSmart} />
      </div>

      {/* weekly deals */}
      <div style={{ marginBottom: 30 }}>
        <SectionHeader title="Veckans erbjudanden" actionLabel="Se alla" onAction={() => onSearch({ deals: true })} />
        <div className="kp-product-grid">
          {deals.map((p) => <ProductCard key={p.id} product={p} favorites={favorites} onOpen={onOpenProduct} />)}
        </div>
      </div>

      {/* spotlight comparison */}
      <SpotlightCompare favorites={favorites} onOpen={onOpenProduct} />
    </PageContainer>
  );
}

export default Home;
