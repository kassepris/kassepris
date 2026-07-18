/* Kassepris — "Så kommer det funka" zigzag showcase.
   Each step pairs its copy with a small, real coded recreation of that
   part of the app UI (not a screenshot) inside a bordered preview card.

   Store names/addresses are real Lund locations (for flavor/realism);
   distances are illustrative estimates, not measured — same spirit as
   the fictional-but-plausible mock data the app itself uses. Product
   images are brand-neutral coded illustrations, not real packaging
   photography (avoids depicting trademarked packaging). */
import React from "react";
import "./stepshowcase.css";
import { Icon } from "./Icon.jsx";

function StoresPreview() {
  const stores = [
    { name: "ICA Kvantum Clemenstorget", dist: "0.4 km", color: "var(--store-ica)", bg: "var(--store-ica-bg)" },
    { name: "Coop Mårtenstorget", dist: "0.7 km", color: "var(--store-coop)", bg: "var(--store-coop-bg)" },
    { name: "Willys Magistratsvägen", dist: "2.3 km", color: "var(--store-willys)", bg: "var(--store-willys-bg)" },
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

function CoffeeArt() {
  return (
    <svg viewBox="0 0 120 84" preserveAspectRatio="xMidYMid slice" className="kp-preview-art">
      <rect width="120" height="84" fill="#EFE3D0" />
      <path d="M40 18 h40 l6 52 a6 6 0 0 1-6 6 H40 a6 6 0 0 1-6-6z" fill="#6B4226" />
      <path d="M40 18 h40 l2 13 H38z" fill="#8A5A34" />
      <rect x="37" y="12" width="46" height="8" rx="2.5" fill="#4A2E1A" />
      <rect x="45" y="40" width="30" height="19" rx="3" fill="#F1E8D6" />
      <text x="60" y="53" textAnchor="middle" fontSize="7.5" fontFamily="Georgia, serif" fill="#4A2E1A">Kaffe</text>
      <path d="M53 9 q2 -4 0 -8" stroke="#C9B79C" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M61 9 q2 -4 0 -8" stroke="#C9B79C" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M69 9 q2 -4 0 -8" stroke="#C9B79C" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MilkArt() {
  return (
    <svg viewBox="0 0 120 84" preserveAspectRatio="xMidYMid slice" className="kp-preview-art">
      <rect width="120" height="84" fill="#E7F1E8" />
      <path d="M45 22 h30 l6 7 v40 a3 3 0 0 1-3 3 H42 a3 3 0 0 1-3-3 V29z" fill="#FFFFFF" stroke="#CFE0D5" strokeWidth="1.5" />
      <path d="M45 22 l15 -11 l15 11 z" fill="#FFFFFF" stroke="#CFE0D5" strokeWidth="1.5" />
      <rect x="42" y="46" width="36" height="15" fill="#DCEEE1" />
      <text x="60" y="56" textAnchor="middle" fontSize="7" fontFamily="Georgia, serif" fill="#24503F">Mjölk</text>
    </svg>
  );
}

function DealMini({ name, cat, weight, store, storeColor, storeBg, price, was, pct, perUnit, art: Art }) {
  return (
    <div className="kp-preview-deal">
      <div className="kp-preview-deal-img">
        <Art />
        <span className="kp-preview-deal-store" style={{ background: storeBg, color: storeColor }}>{store}</span>
        {pct ? <span className="kp-preview-deal-badge">{pct}</span> : null}
      </div>
      <div className="kp-preview-deal-body">
        <span className="kp-preview-deal-cat">{cat}{weight ? ` · ${weight}` : ""}</span>
        <div className="kp-preview-deal-name">{name}</div>
        <div className="kp-preview-deal-price">
          {price}
          {was ? <s className="kp-preview-deal-was">{was}</s> : null}
        </div>
        {perUnit ? <div className="kp-preview-deal-perunit">{perUnit}</div> : null}
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
        <DealMini
          cat="Skafferi" weight="450 g" name="Gevalia Mellanrost" store="Willys" storeColor="var(--store-willys)" storeBg="var(--store-willys-bg)"
          price="49,90" was="74,90" pct="-33%" perUnit="110,89 kr/kg" art={CoffeeArt}
        />
        <DealMini
          cat="Mejeri & ägg" weight="1 l" name="Mellanmjölk" store="ICA" storeColor="var(--store-ica)" storeBg="var(--store-ica-bg)"
          price="12,90" perUnit="12,90 kr/l" art={MilkArt}
        />
      </div>
    </div>
  );
}

function ComparePreview() {
  const rows = [
    { store: "Willys Magistratsvägen", price: "34,90", best: true, color: "var(--store-willys)" },
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
      <StepRow n="2" title="Sök varan" body="Hitta produkten — vi visar veckans pris i varje butik du valt." reverse>
        <OffersPreview />
      </StepRow>
      <StepRow n="3" title="Se var den är billigast" body="Alla priser och varianter sida vid sida. Handla smartare.">
        <ComparePreview />
      </StepRow>
    </div>
  );
}
