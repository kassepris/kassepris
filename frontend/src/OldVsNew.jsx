/* Kassepris — "Old way vs new way" comparison section.
   Left: the reality today — a separate paper/app flyer per store, skewed
   and stacked to read as clutter. Right: Kassepris — one clean grid of
   deal cards. Coded illustrations, not screenshots or real flyer content. */
import React from "react";
import "./oldvsnew.css";
import { ProductDealCard, DEMO_DEALS } from "./ProductDealCard.jsx";

const FLYER_SLOTS = [
  ["#EFE3D0", "19"],
  ["#E7F1E8", "24"],
  ["#F3E4C9", "14"],
];

function OldWayFlyer({ store, color, rotate }) {
  return (
    <div className="kp-ovn-flyer" style={{ "--flyer-rotate": `${rotate}deg` }}>
      <div className="kp-ovn-flyer-header" style={{ background: color }}>
        <span>{store}</span>
        <span className="kp-ovn-flyer-week">V.29</span>
      </div>
      <div className="kp-ovn-flyer-body">
        {FLYER_SLOTS.map(([bg, price]) => (
          <div key={price} className="kp-ovn-flyer-slot" style={{ background: bg }}>
            <div className="kp-ovn-flyer-tag">
              <span className="kp-ovn-flyer-tag-price">{price}<sup>90</sup></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OldWayVisual() {
  return (
    <div className="kp-ovn-visual kp-ovn-visual-old">
      <OldWayFlyer store="ICA" color="var(--store-ica)" rotate={-7} />
      <OldWayFlyer store="Coop" color="var(--store-coop)" rotate={4} />
      <OldWayFlyer store="Willys" color="var(--store-willys)" rotate={-2} />
    </div>
  );
}

function NewWayVisual() {
  return (
    <div className="kp-ovn-visual kp-ovn-visual-new">
      <ProductDealCard {...DEMO_DEALS.coffee} />
      <ProductDealCard {...DEMO_DEALS.cheese} />
    </div>
  );
}

function ComparisonCard({ variant, eyebrow, title, points, children }) {
  return (
    <div className={`kp-ovn-card kp-ovn-card-${variant}`}>
      <div className="kp-ovn-card-visual">{children}</div>
      <div className="kp-ovn-card-body">
        <span className="kp-ovn-card-eyebrow">{eyebrow}</span>
        <h3 className="kp-ovn-card-title">{title}</h3>
        <ul className="kp-ovn-card-list">
          {points.map((pt) => (
            <li key={pt}>
              <span className="kp-ovn-dot" />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OldVsNew() {
  return (
    <div className="kp-ovn">
      <ComparisonCard
        variant="old"
        eyebrow="Gamla sättet"
        title="Ett reklamblad per butik"
        points={[
          "Bläddra i tre olika appar eller blad",
          "Svårt att jämföra priser mellan butiker",
          "Lätt att missa veckans bästa pris",
        ]}
      >
        <OldWayVisual />
      </ComparisonCard>
      <ComparisonCard
        variant="new"
        eyebrow="Med Kassepris"
        title="Alla erbjudanden, sida vid sida"
        points={[
          "ICA, Coop och Willys på ett ställe",
          "Priserna jämförda automatiskt åt dig",
          "Veckans bästa deal alltid överst",
        ]}
      >
        <NewWayVisual />
      </ComparisonCard>
    </div>
  );
}
