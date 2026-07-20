/* Kassepris — "Så kommer det funka" zigzag showcase.
   Each step pairs its copy with a small, real coded recreation of that
   part of the app UI (not a screenshot) inside a bordered preview card.

   Store names/addresses are real Lund locations (for flavor/realism);
   distances are illustrative estimates, not measured, same spirit as
   the fictional-but-plausible mock data the app itself uses. The deal
   cards mirror the real app's product card (see app-redesign branch),
   which avoids product photography (copyright) by leaning into a
   data-forward card design instead. */
import React from "react";
import "./stepshowcase.css";
import "./productdealcard.css";
import { Icon } from "./Icon.jsx";
import { ProductDealCard, DEMO_DEALS } from "./ProductDealCard.jsx";

function StoresPreview() {
  const stores = [
    { name: "ICA Kvantum Clemenstorget", dist: "0.4 km", color: "var(--store-ica)", bg: "var(--store-ica-bg)" },
    { name: "Coop Mårtenstorget", dist: "0.7 km", color: "var(--store-coop)", bg: "var(--store-coop-bg)" },
    { name: "Willys Lund", dist: "2.3 km", color: "var(--store-willys)", bg: "var(--store-willys-bg)" },
  ];
  return (
    <div className="kp-preview-card">
      <div className="kp-preview-title-row">
        <span className="kp-preview-title">Dina butiker</span>
        <span className="kp-preview-link">Ändra</span>
      </div>
      <div className="kp-preview-store-grid">
        {stores.map((s) => (
          <div key={s.name} className="kp-preview-store-chip">
            <span className="kp-preview-store-icon" style={{ background: s.bg }}>
              <Icon name="store" size={15} color={s.color} />
            </span>
            <span className="kp-preview-store-text">
              <span className="kp-preview-store-name">{s.name}</span>
              <span className="kp-preview-store-dist">{s.dist}</span>
            </span>
          </div>
        ))}
        <div className="kp-preview-store-add">
          <Icon name="plus" size={14} color="var(--text-secondary)" /> Lägg till
        </div>
      </div>
    </div>
  );
}

function OffersPreview() {
  return (
    <div className="kp-preview-card">
      <div className="kp-preview-search-row">
        <div className="kp-preview-search"><Icon name="search" size={14} color="var(--text-secondary)" /> Sök vara, t.ex. kaffe</div>
        <div className="kp-preview-filter"><Icon name="filter" size={14} color="var(--text-primary)" /> Filter</div>
      </div>
      <div className="kp-preview-chip-row">
        <span className="kp-preview-chip is-active">Alla</span>
        <span className="kp-preview-chip">Mejeri &amp; ägg</span>
        <span className="kp-preview-chip">Skafferi</span>
      </div>
      <div className="kp-preview-deal-grid">
        <ProductDealCard {...DEMO_DEALS.coffee} />
        <ProductDealCard {...DEMO_DEALS.cheese} />
      </div>
    </div>
  );
}

const STORE_INFO = {
  ICA: { short: "Kvantum", area: "Clemenstorget" },
  Coop: { short: "Nära", area: "Mårtenstorget" },
  Willys: { short: "Lund", area: "Magistratsvägen" },
};

function DetailPreview() {
  const deal = DEMO_DEALS.cheese;
  const stores = [
    { label: deal.storeLabel, color: deal.storeColor, bg: deal.storeBg, price: deal.price, best: true },
    ...deal.others.map((o) => ({ ...o, best: false })),
  ];
  return (
    <div className="kp-preview-card kp-detail-preview">
      <div className="kp-detail-head">
        <span className="kp-deal-card-icon" style={{ background: deal.tint, width: 40, height: 40 }}>
          <Icon name={deal.icon} size={19} color="var(--green-700)" />
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="kp-detail-name">{deal.name}</div>
          <div className="kp-detail-sub">{deal.sub}</div>
        </div>
      </div>

      <div className="kp-detail-best">
        <span className="kp-detail-best-label">Bästa pris denna vecka</span>
        <div className="kp-detail-best-row">
          <span className="kp-deal-card-store-pill" style={{ background: deal.storeBg, color: deal.storeColor }}>{deal.storeLabel}</span>
          <span className="kp-detail-store-shortarea">{STORE_INFO[deal.storeLabel].short} · {STORE_INFO[deal.storeLabel].area}</span>
        </div>
        <div className="kp-detail-price-row">
          <span className="kp-detail-price">{deal.price}</span>
          <span className="kp-deal-card-unit">{deal.unit}</span>
          {deal.was ? <span className="kp-deal-card-was">{deal.was}</span> : null}
          {deal.discount ? <span className="kp-deal-card-discount">{deal.discount}</span> : null}
        </div>
        <div className="kp-detail-validity">Giltigt t.o.m. söndag · {deal.week}</div>
        <div className="kp-detail-actions">
          <span className="kp-detail-btn-primary"><Icon name="plus" size={13} color="var(--ink-900)" /> Lägg i lista</span>
          <span className="kp-detail-btn-secondary"><Icon name="share" size={13} color="var(--text-primary)" /></span>
        </div>
      </div>

      <div className="kp-detail-stores-label">Alla butiker</div>
      <div className="kp-detail-stores">
        {stores.map((s) => {
          // Expanded by default for the first (best-price) store, so the
          // variant dropdown from the real detail page has an example open.
          const expanded = s.best;
          const info = STORE_INFO[s.label];
          return (
            <div key={s.label} className={`kp-detail-store-row${s.best ? " is-best" : ""}`}>
              <div className="kp-detail-store-summary">
                <span className="kp-deal-card-store-pill" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                <div className="kp-detail-store-info">
                  <span className="kp-detail-store-fullname">{info.short} · {info.area}</span>
                  {s.best ? (
                    <span className="kp-detail-store-best-tag"><Icon name="star" size={11} color="var(--green-700)" /> Billigast</span>
                  ) : (
                    <span className="kp-detail-store-variant-count">{deal.variants.length} varianter</span>
                  )}
                </div>
                <span className="kp-detail-store-price">{s.price} <span className="kp-deal-card-unit">{deal.unit}</span></span>
                <Icon name="chevron-down" size={16} color="var(--text-secondary)" style={{ transform: expanded ? "rotate(180deg)" : "none" }} />
              </div>
              {expanded ? (
                <div className="kp-detail-variant-list">
                  {deal.variants.map((v, i) => (
                    <div key={v.name} className="kp-detail-variant-line" style={i === 0 ? { borderTop: "none", paddingTop: 0 } : undefined}>
                      <div>
                        <div className="kp-detail-variant-name">{v.name}</div>
                        <div className="kp-detail-variant-meta">{v.size} · {v.perUnit}</div>
                      </div>
                      <div className="kp-detail-variant-price-block">
                        <span className="kp-detail-variant-price">{v.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepRow({ n, title, body, reverse, children }) {
  return (
    <div className={`kp-step-row${reverse ? " is-reverse" : ""}`}>
      <div className="kp-step-row-text">
        <span className="kp-step-row-num">{n}</span>
        <h3 className="kp-step-row-title">{title}</h3>
        <p className="kp-step-row-body">{body}</p>
      </div>
      <div className="kp-step-row-visual">{children}</div>
    </div>
  );
}

export function StepShowcase() {
  return (
    <div className="kp-step-showcase">
      <StepRow n="1" title="Välj dina butiker" body="Lägg till butikerna du handlar i, från ICA, Coop och Willys.">
        <StoresPreview />
      </StepRow>
      <StepRow n="2" title="Sök varan" body="Hitta produkten. Vi visar veckans pris i varje butik du valt." reverse>
        <OffersPreview />
      </StepRow>
      <StepRow n="3" title="Se var den är billigast" body="Lägg varan i din lista och se priset hos var och en av dina valda butiker, sida vid sida. Gå med i väntelistan för tidig tillgång.">
        <DetailPreview />
      </StepRow>
    </div>
  );
}
