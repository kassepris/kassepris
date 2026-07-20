/* Product detail — Kassepris intelligence center: best deal, full market comparison,
   price history, deal score, and a preview of future AI guidance. */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button } from "../design-system/components.jsx";

const { Icon, SaveChip, DiscountBadge, metaOf, pressHandlers, PageContainer, BackLink, SectionHeader, ProductRow, Stat, PriceSparkline, SoonTag, CAT_ICON } = A;

const TREND_META = {
  down: { label: "Priset sjunker", icon: "down", color: "var(--green-700)" },
  up: { label: "Priset stiger", icon: "up", color: "var(--ink-700)" },
  flat: { label: "Stabilt pris", icon: "minus", color: "var(--text-secondary)" },
};

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

function CompareRow({ storeId, product, isBest, expanded, onToggle }) {
  const m = metaOf(storeId), s = K.storeById(storeId);
  const blk = product.stores.find((b) => b.storeId === storeId);
  const vs = blk.variants.slice().sort((a, b) => K.money(a.price) - K.money(b.price));
  const cheapest = vs[0];
  return (
    <div style={{ borderRadius: "var(--radius-md)", background: isBest ? "var(--bg-surface-sunken)" : "var(--bg-surface)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ background: m.bg, color: m.color, font: "var(--text-label-md)", padding: "5px 11px", borderRadius: "var(--radius-pill)", flexShrink: 0 }}>{m.label}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", font: "var(--text-body-md)", fontWeight: 600, color: "var(--ink-900)" }}>{s.short} · {s.area}</span>
          {isBest ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "var(--text-label-sm)", color: "var(--green-700)", fontWeight: 600, marginTop: 2 }}><Icon name="star" size={12} color="var(--green-700)" /> Billigast</span>
          ) : (
            <span style={{ display: "block", font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{vs.length} variant{vs.length > 1 ? "er" : ""}</span>
          )}
        </span>
        <span style={{ display: "flex", alignItems: "baseline", gap: 4, flexShrink: 0 }}>
          <span style={{ font: "var(--text-display-sm)", color: isBest ? "var(--green-800)" : "var(--ink-700)" }}>{cheapest.price}</span>
          <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{cheapest.unit}</span>
        </span>
        <Icon name={expanded ? "up" : "down"} size={18} color="var(--text-secondary)" />
      </button>
      {expanded ? <div style={{ padding: "0 14px 12px" }}>{vs.map((v, i) => <VariantLine key={i} v={v} cheapest={isBest && v === cheapest} />)}</div> : null}
    </div>
  );
}

function ProductDetail({ product, favorites, authed, onBack, onAdd, onOpen, onManageStores, city }) {
  const cat = K.catById(product.cat) || {};
  const marketIds = K.availableStoreIds(product);
  const best = K.bestVariant(product, marketIds);
  const insights = K.dealInsights(product, marketIds);
  const history = K.priceHistory(product, marketIds);
  const score = K.dealScore(product, marketIds);
  const sorted = marketIds.slice().sort((a, b) => K.bestVariant(product, [a]).val - K.bestVariant(product, [b]).val);
  const [expanded, setExpanded] = React.useState(best.storeId);
  const [toast, setToast] = React.useState("");
  const similar = K.PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id)
    .map((p) => ({ p, b: K.bestVariant(p, K.availableStoreIds(p)) }))
    .sort((a, b) => (a.b ? a.b.val : 999) - (b.b ? b.b.val : 999))
    .slice(0, 6).map((x) => x.p);

  function showToast(t) { setToast(t); setTimeout(() => setToast(""), 1700); }
  function add() {
    onAdd(product, { storeId: best.storeId, price: best.variant.price, unit: best.variant.unit });
    if (authed) showToast("Tillagd i din lista");
  }

  const bestStore = K.storeById(best.storeId);
  const bestMeta = metaOf(best.storeId);
  const trend = history ? TREND_META[history.trend] : null;
  const aiBlurb = insights.atLow
    ? `Priset ligger bland de lägsta på 6 månader${insights.savingsPct > 0 ? ` och ${insights.savingsPct}% under snittet` : ""} — ett bra tillfälle att handla.`
    : insights.savingsPct >= 15
    ? `Priset är ${insights.savingsPct}% under snittpriset den här veckan. Ett bra läge att slå till.`
    : `Priset ligger nära snittet just nu. Inget akut — men håll koll om du kan vänta.`;

  return (
    <PageContainer max={720} style={{ position: "relative" }}>
      <BackLink label="Tillbaka" onClick={onBack} />

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* 1. product header */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: cat.tint, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={CAT_ICON[product.cat] || "tag"} size={26} color="var(--green-700)" />
          </span>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: 0 }}>{product.name}</h1>
            <div style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", marginTop: 4 }}>{best.variant.name} · {best.variant.size} · {cat.name}</div>
          </div>
        </div>

        {/* 2. current best deal */}
        <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 22 }}>
          <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--green-700)", marginBottom: 12 }}>Bästa pris denna vecka</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ background: bestMeta.bg, color: bestMeta.color, font: "var(--text-label-md)", padding: "5px 12px", borderRadius: "var(--radius-pill)" }}>{bestMeta.label}</span>
                <span style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{bestStore.short} · {bestStore.area}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ font: "var(--text-display-lg)", color: "var(--green-800)" }}>{best.variant.price}</span>
                <span style={{ font: "var(--text-label-md)", color: "var(--text-secondary)" }}>{best.variant.unit}</span>
                {best.variant.ord ? <span style={{ font: "var(--text-body-md)", color: "var(--ink-300)", textDecoration: "line-through" }}>{best.variant.ord}</span> : null}
              </div>
              <div style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", marginTop: 6 }}>Giltigt t.o.m. söndag · {A.WEEK}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              {insights.savingsPct > 0 ? <SaveChip tone="best">{`${insights.savingsPct}% (${K.fmt(insights.savingsKr)} kr) under snitt`}</SaveChip> : null}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: insights.tone === "best" ? "var(--yellow-100)" : "var(--ink-150)", color: insights.tone === "best" ? "var(--green-800)" : "var(--ink-700)", border: `1px solid ${insights.tone === "best" ? "var(--yellow-500)" : "var(--border-default)"}`, font: "var(--text-label-sm)", fontWeight: 600, padding: "5px 11px 5px 8px", borderRadius: "var(--radius-pill)" }}>
                <Icon name={insights.badgeIcon} size={13} color={insights.tone === "best" ? "var(--green-800)" : "var(--ink-700)"} />{insights.badge}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <div style={{ flex: 1 }} {...pressHandlers()}>
              <Button variant="accent" size="lg" onClick={add}><span style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}><Icon name="plus" size={19} /> Lägg i lista</span></Button>
            </div>
            <div {...pressHandlers()}>
              <Button variant="secondary" size="lg" onClick={() => showToast("Delningslänk kopierad")}><Icon name="share" size={19} color="var(--text-primary)" /></Button>
            </div>
          </div>
        </div>

        {/* 3. full store comparison */}
        <div>
          <SectionHeader title="Alla butiker" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sorted.map((id) => (
              <CompareRow key={id} storeId={id} product={product} isBest={id === best.storeId} expanded={expanded === id} onToggle={() => setExpanded(expanded === id ? null : id)} />
            ))}
          </div>
        </div>

        {/* 4. price history */}
        {history ? (
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 22 }}>
            <SectionHeader title="Prishistorik" />
            <div style={{ marginBottom: 14 }}><PriceSparkline points={history.points} low={history.low} high={history.high} height={64} /></div>
            {trend ? <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16, font: "var(--text-label-md)", color: trend.color }}><Icon name={trend.icon} size={16} color={trend.color} /> {trend.label}</div> : null}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
              <Stat label="Nu" value={`${K.fmt(history.current)} kr`} accent />
              <Stat label="Snitt" value={`${K.fmt(history.avg)} kr`} />
              <Stat label="Lägst" value={`${K.fmt(history.low)} kr`} />
              <Stat label="Högst" value={`${K.fmt(history.high)} kr`} />
            </div>
          </div>
        ) : null}

        {/* 5. deal score */}
        {score ? (
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 22 }}>
            <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 10 }}>Kassepris-poäng</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
              <Icon name="flame" size={24} color="var(--yellow-600)" />
              <span style={{ font: "var(--text-display-md)", color: "var(--green-800)" }}>{score.score}</span>
              <span style={{ font: "var(--text-label-md)", color: "var(--text-secondary)" }}>/ 10</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {score.reasons.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="check" size={15} color="var(--green-700)" />
                  <span style={{ font: "var(--text-body-sm)", color: "var(--ink-700)" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 6. future AI placeholder */}
        <div style={{ background: "var(--bg-surface-sunken)", border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-lg)", padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", background: "var(--green-800)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="sparkle" size={18} color="var(--brand-accent)" /></span>
            <span style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>Ska jag köpa nu?</span>
            <SoonTag />
          </div>
          <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>{aiBlurb}</p>
        </div>

        {/* cheaper alternatives */}
        <div>
          <SectionHeader title="Billigare alternativ" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {similar.map((p) => <ProductRow key={p.id} product={p} favorites={favorites} onOpen={onOpen} />)}
            {similar.length === 0 ? <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)" }}>Inga liknande varor den här veckan.</p> : null}
          </div>
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
