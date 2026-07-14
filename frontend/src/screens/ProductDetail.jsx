/* Product detail — compare veckans erbjudande across your stores + "Visa liknande varor". */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button } from "../design-system/components.jsx";

const { Icon, SaveChip, DiscountBadge, metaOf, pressHandlers, PageContainer, BackLink, SectionHeader, ProductRow } = A;

function VariantLine({ v, cheapest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 0", borderTop: "1px solid var(--border-default)" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: "var(--text-body-md)", color: "var(--ink-900)" }}>{v.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
          <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{v.size}</span>
          {v.cmp ? <span style={{ font: "var(--text-mono-sm)", color: "var(--text-secondary)" }}>· {v.cmp}</span> : null}
          {v.member ? <span style={{ font: "var(--text-label-sm)", color: "var(--store-coop)", background: "var(--store-coop-bg)", padding: "1px 7px", borderRadius: "var(--radius-pill)" }}>Medlemspris</span> : null}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5, justifyContent: "flex-end" }}>
          {v.discount ? <DiscountBadge>{v.discount}</DiscountBadge> : null}
          <span style={{ font: "var(--text-display-sm)", color: cheapest ? "var(--green-800)" : "var(--ink-700)" }}>{v.price}</span>
        </div>
        {v.ord ? <div style={{ font: "var(--text-label-sm)", color: "var(--ink-300)", textDecoration: "line-through" }}>{v.ord}</div> : null}
      </div>
    </div>
  );
}

function StoreBlock({ storeId, product, best, expanded, onToggle }) {
  const m = metaOf(storeId), s = K.storeById(storeId);
  const blk = product.stores.find((b) => b.storeId === storeId);
  const vs = blk.variants.slice().sort((a, b) => K.money(a.price) - K.money(b.price));
  const cheapest = vs[0];
  const isBest = best && best.storeId === storeId;
  return (
    <div style={{ borderRadius: "var(--radius-md)", background: isBest ? "var(--yellow-100)" : "var(--bg-surface)", border: `1px solid ${isBest ? "var(--yellow-500)" : "var(--border-default)"}`, boxShadow: isBest ? "none" : "var(--shadow-card)", overflow: "hidden" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ background: m.bg, color: m.color, font: "var(--text-label-md)", padding: "5px 11px", borderRadius: "var(--radius-pill)", flexShrink: 0 }}>{m.label}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", font: "var(--text-body-md)", fontWeight: 600, color: "var(--ink-900)" }}>{s.short} · {s.area}</span>
          <span style={{ display: "block", font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{s.dist} km · {vs.length} variant{vs.length > 1 ? "er" : ""}</span>
        </span>
        <span style={{ textAlign: "right", flexShrink: 0 }}>
          {isBest ? <span style={{ display: "block", font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--green-800)" }}>Bästa pris</span> : null}
          <span style={{ font: "var(--text-display-sm)", color: "var(--green-800)" }}>{cheapest.price}</span>
        </span>
        <Icon name={expanded ? "up" : "down"} size={18} color="var(--text-secondary)" />
      </button>
      {expanded ? <div style={{ padding: "0 14px 12px" }}>{vs.map((v, i) => <VariantLine key={i} v={v} cheapest={isBest && v === cheapest} />)}</div> : null}
    </div>
  );
}

function ProductDetail({ product, favorites, authed, onBack, onAdd, onOpen, onManageStores, city }) {
  const cat = K.catById(product.cat);
  const favHave = favorites.filter((id) => K.availableStoreIds(product).includes(id));
  const favMissing = favorites.filter((id) => !K.availableStoreIds(product).includes(id));
  const best = K.bestVariant(product, favHave.length ? favHave : K.availableStoreIds(product));
  const worst = K.worstVariant(product, favHave);
  const saveVs = worst && best ? worst.val - best.val : 0;
  const bestStore = best ? best.storeId : null;
  const [expanded, setExpanded] = React.useState(bestStore);
  const [showSimilar, setShowSimilar] = React.useState(false);
  const [toast, setToast] = React.useState("");
  const sortedHave = favHave.slice().sort((a, b) => K.bestVariant(product, [a]).val - K.bestVariant(product, [b]).val);
  const similar = K.PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 6);

  function showToast(t) { setToast(t); setTimeout(() => setToast(""), 1700); }
  function add() { onAdd(product); if (authed) showToast("Tillagd i din lista"); }

  return (
    <PageContainer style={{ position: "relative" }}>
      <BackLink label="Tillbaka" onClick={onBack} />

      <div className="kp-detail-grid">
        {/* summary */}
        <div className="kp-detail-summary">
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 18, boxShadow: "var(--shadow-card)" }}>
            <A.ImageTile product={product} aspect="16 / 10" radius="0" />
          </div>
          <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 6 }}>{cat.name}</div>
          <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: "0 0 4px" }}>{product.name}</h1>
          <div style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", marginBottom: 18 }}>{product.sub}</div>

          {best ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--yellow-100)", border: "1px solid var(--yellow-500)", borderRadius: "var(--radius-lg)", padding: 16, marginBottom: 16 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ font: "var(--text-label-sm)", color: "var(--green-800)", marginBottom: 2 }}>Billigast just nu</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ font: "var(--text-display-md)", color: "var(--green-800)" }}>{best.variant.price}</span>
                  <span style={{ font: "var(--text-label-md)", color: "var(--text-secondary)" }}>{best.variant.unit}</span>
                </div>
                <div style={{ font: "var(--text-body-sm)", color: "var(--ink-700)", marginTop: 2 }}>hos {metaOf(bestStore).label} {K.storeById(bestStore).short}</div>
              </div>
              {saveVs > 0.001 ? <div style={{ marginLeft: "auto" }}><SaveChip>{`Spar ${K.fmt(saveVs)} kr`}</SaveChip></div> : null}
            </div>
          ) : null}

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }} {...pressHandlers()}>
              <Button variant="accent" size="lg" onClick={add}><span style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}><Icon name="plus" size={19} /> Lägg i lista</span></Button>
            </div>
            <div {...pressHandlers()}>
              <Button variant="secondary" size="lg" onClick={() => showToast("Delningslänk kopierad")}><Icon name="share" size={19} color="var(--text-primary)" /></Button>
            </div>
          </div>
          <p style={{ font: "var(--text-mono-sm)", color: "var(--ink-300)", margin: "14px 2px 0" }}>{A.WEEK} · erbjudande så länge lagret räcker</p>
        </div>

        {/* comparison */}
        <div style={{ minWidth: 0 }}>
          <SectionHeader title="Finns i dina butiker" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: favMissing.length ? 12 : 26 }}>
            {sortedHave.length ? sortedHave.map((id) => (
              <StoreBlock key={id} storeId={id} product={product} best={best} expanded={expanded === id} onToggle={() => setExpanded(expanded === id ? null : id)} />
            )) : (
              <div style={{ padding: "16px", borderRadius: "var(--radius-md)", background: "var(--bg-surface-sunken)", border: "1px dashed var(--border-strong)", font: "var(--text-body-md)", color: "var(--text-secondary)" }}>
                Ingen av dina butiker har den här varan på erbjudande. <button onClick={onManageStores} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-md)", padding: 0 }}>Lägg till fler butiker</button>
              </div>
            )}
          </div>

          {favMissing.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
              {favMissing.map((id) => {
                const m = metaOf(id), s = K.storeById(id);
                return (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--bg-surface-sunken)", border: "1px dashed var(--border-strong)" }}>
                    <span style={{ background: m.bg, color: m.color, font: "var(--text-label-md)", padding: "5px 11px", borderRadius: "var(--radius-pill)", opacity: 0.8 }}>{m.label}</span>
                    <span style={{ flex: 1, font: "var(--text-body-md)", color: "var(--text-secondary)" }}>{s.short} · inte på erbjudande den här veckan</span>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* similar products */}
          <SectionHeader title="Liknande varor" />
          {!showSimilar ? (
            <button onClick={() => setShowSimilar(true)} {...pressHandlers(0.99)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 18px", borderRadius: "var(--radius-md)", cursor: "pointer", background: "var(--bg-surface)", border: "1px solid var(--border-strong)", color: "var(--text-primary)", font: "var(--text-h3)", transition: "transform var(--duration-fast) var(--ease-standard)" }}>
              <Icon name="layers" size={19} color="var(--green-700)" /> Visa liknande varor
            </button>
          ) : (
            <div className="kp-fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
              {similar.map((p) => <ProductRow key={p.id} product={p} favorites={favorites} onOpen={onOpen} />)}
              {similar.length === 0 ? <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)" }}>Inga liknande varor den här veckan.</p> : null}
            </div>
          )}
        </div>
      </div>

      {toast ? (
        <div className="kp-fade-up" style={{ position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 28, background: "var(--ink-900)", color: "var(--cream-050)", borderRadius: "var(--radius-md)", padding: "12px 18px", font: "var(--text-body-md)", display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow-raised)", zIndex: 50 }}>
          <Icon name="checkCircle" size={18} color="var(--brand-accent)" /> {toast}
        </div>
      ) : null}
    </PageContainer>
  );
}

export default ProductDetail;
