/* Kassepris — condensed recreation of the real app's product card
   (category icon, "Bästa pris" store pill, price comparison row).
   Used on the marketing site to show what the actual app looks like,
   since we can't use real product photography. */
import React from "react";
import "./productdealcard.css";
import { Icon } from "./Icon.jsx";

/* Shared demo data so every placement of these two example deals (old-vs-new,
   step 2, and the step-3 detail mockup) renders identically. */
export const DEMO_DEALS = {
  coffee: {
    icon: "jar", tint: "#F1E8D6", name: "Gevalia Mellanrost", sub: "Bryggkaffe · 450 g",
    variant: "Gevalia Mellanrost, 450 g",
    storeLabel: "Willys", storeColor: "var(--store-willys)", storeBg: "var(--store-willys-bg)",
    price: "49,90", unit: "kr", was: "74,90", discount: "-33%",
    others: [
      { label: "ICA", color: "var(--store-ica)", bg: "var(--store-ica-bg)", price: "64,90" },
      { label: "Coop", color: "var(--store-coop)", bg: "var(--store-coop-bg)", price: "69,90" },
    ],
  },
  cheese: {
    icon: "milk", tint: "#E7F1E8", name: "Skivad ost Arla", sub: "Mejeri · 300 g",
    variant: "Skivad ost Arla, 300 g",
    storeLabel: "ICA", storeColor: "var(--store-ica)", storeBg: "var(--store-ica-bg)",
    price: "39,90", unit: "kr/förp",
    others: [
      { label: "Coop", color: "var(--store-coop)", bg: "var(--store-coop-bg)", price: "43,90" },
      { label: "Willys", color: "var(--store-willys)", bg: "var(--store-willys-bg)", price: "41,90" },
    ],
    // Extra context used only by the step-3 detail-page mockup (see
    // app-redesign's ProductDetail.jsx): validity window.
    week: "Vecka 29",
    // Real variants at the best-price store, used by the step-3 detail
    // mockup's expandable "Alla butiker" row (see app-redesign's VariantLine).
    // Same weight and price across variants, just different flavors.
    variants: [
      { name: "Skivad ost Familjefavoriter Gouda", size: "300 g", perUnit: "133 kr/kg", price: "39,90" },
      { name: "Skivad ost Familjefavoriter Gräddis", size: "300 g", perUnit: "133 kr/kg", price: "39,90" },
    ],
  },
};

export function ProductDealCard({ icon, tint, name, sub, storeLabel, storeColor, storeBg, price, unit, was, discount, others = [] }) {
  return (
    <div className="kp-deal-card">
      <div className="kp-deal-card-head">
        <span className="kp-deal-card-icon" style={{ background: tint }}>
          <Icon name={icon} size={15} color="var(--green-700)" />
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="kp-deal-card-name">{name}</div>
          <div className="kp-deal-card-sub">{sub}</div>
        </div>
      </div>

      <div className="kp-deal-card-price-block">
        <div className="kp-deal-card-best-row">
          <span className="kp-deal-card-best-label">Bästa pris</span>
          <span className="kp-deal-card-store-pill" style={{ background: storeBg, color: storeColor }}>{storeLabel}</span>
        </div>
        <div className="kp-deal-card-price-row">
          <span className="kp-deal-card-price">{price}</span>
          <span className="kp-deal-card-unit">{unit}</span>
        </div>
        <div className="kp-deal-card-discount-row">
          {was ? <span className="kp-deal-card-was">{was}</span> : null}
          {discount ? <span className="kp-deal-card-discount">{discount}</span> : null}
        </div>
      </div>

      {others.length ? (
        <div className="kp-deal-card-compare">
          {others.map((o) => (
            <div key={o.label} className="kp-deal-card-compare-row">
              <span className="kp-deal-card-store-pill" style={{ background: o.bg, color: o.color }}>{o.label}</span>
              <span className="kp-deal-card-compare-price">{o.price}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="kp-deal-card-foot">
        <span>Visa detaljer</span>
        <Icon name="arrow" size={13} color="var(--text-link)" />
      </div>
    </div>
  );
}
