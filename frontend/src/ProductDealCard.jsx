/* Kassepris — condensed recreation of the real app's product card
   (category icon, "Bästa pris" store pill, price comparison row).
   Used on the marketing site to show what the actual app looks like,
   since we can't use real product photography. */
import React from "react";
import "./productdealcard.css";
import { Icon } from "./Icon.jsx";

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
