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
import { Icon } from "./Icon.jsx";
import { ProductDealCard } from "./ProductDealCard.jsx";

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
        <ProductDealCard
          icon="jar" tint="#F1E8D6" name="Gevalia Mellanrost" sub="Bryggkaffe · 450 g"
          storeLabel="Willys Lund" storeColor="var(--store-willys)" storeBg="var(--store-willys-bg)"
          price="49,90" unit="kr" was="74,90" discount="-33%"
          others={[{ label: "ICA", color: "var(--store-ica)", bg: "var(--store-ica-bg)", price: "64,90" }]}
        />
        <ProductDealCard
          icon="milk" tint="#E7F1E8" name="Mellanmjölk" sub="Mejeri · 1 l"
          storeLabel="ICA" storeColor="var(--store-ica)" storeBg="var(--store-ica-bg)"
          price="12,90" unit="kr"
          others={[{ label: "Coop", color: "var(--store-coop)", bg: "var(--store-coop-bg)", price: "14,90" }]}
        />
      </div>
    </div>
  );
}

function ComparePreview() {
  const rows = [
    { store: "Willys Lund", price: "34,90", best: true, color: "var(--store-willys)" },
    { store: "ICA Kvantum Clemenstorget", price: "49,90", color: "var(--store-ica)" },
    { store: "Coop Mårtenstorget", price: "56,90", color: "var(--store-coop)" },
  ];
  return (
    <div className="kp-preview-card">
      <div className="kp-preview-title-row">
        <span className="kp-preview-title">Bryggkaffe</span>
        <span className="kp-preview-sub">3 butiker</span>
      </div>
      <div className="kp-preview-compare-list">
        {rows.map((r) => (
          <div key={r.store} className={`kp-preview-compare-row${r.best ? " is-best" : ""}`}>
            <span className="kp-preview-store-dot" style={{ background: r.color }} />
            <span className="kp-preview-store-fullname">{r.store}</span>
            <span className="kp-preview-compare-price">{r.price}</span>
          </div>
        ))}
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
      <StepRow n="3" title="Se var den är billigast" body="Alla priser och varianter sida vid sida. Handla smartare.">
        <ComparePreview />
      </StepRow>
    </div>
  );
}
