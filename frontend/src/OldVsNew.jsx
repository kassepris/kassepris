/* Kassepris — "Old way vs new way" comparison section.
   Left: the reality today — a separate paper/app flyer per store, skewed
   and stacked to read as clutter. Right: Kassepris — one clean grid of
   deal cards. Coded illustrations, not screenshots or real flyer content. */
import React from "react";
import "./oldvsnew.css";
import { Icon } from "./Icon.jsx";

function OldWayFlyer({ store, color, bg, rotate }) {
  return (
    <div className="kp-ovn-flyer" style={{ "--flyer-rotate": `${rotate}deg` }}>
      <div className="kp-ovn-flyer-header" style={{ background: bg, color }}>{store}</div>
      <div className="kp-ovn-flyer-lines">
        <span />
        <span />
        <span style={{ width: "58%" }} />
      </div>
      <div className="kp-ovn-flyer-price">
        <span className="kp-ovn-flyer-price-value">19<sup>90</sup></span>
      </div>
      <div className="kp-ovn-flyer-lines">
        <span style={{ width: "80%" }} />
        <span style={{ width: "45%" }} />
      </div>
    </div>
  );
}

function OldWayVisual() {
  return (
    <div className="kp-ovn-visual kp-ovn-visual-old">
      <OldWayFlyer store="ICA" color="var(--store-ica)" bg="var(--store-ica-bg)" rotate={-7} />
      <OldWayFlyer store="Coop" color="var(--store-coop)" bg="var(--store-coop-bg)" rotate={4} />
      <OldWayFlyer store="Willys" color="var(--store-willys)" bg="var(--store-willys-bg)" rotate={-2} />
    </div>
  );
}

function NewWayDeal({ name, store, storeColor, storeBg, price }) {
  return (
    <div className="kp-ovn-deal">
      <div className="kp-ovn-deal-top" style={{ background: storeBg }}>
        <Icon name="tag" size={16} color={storeColor} />
        <span className="kp-ovn-deal-store" style={{ color: storeColor }}>{store}</span>
      </div>
      <div className="kp-ovn-deal-name">{name}</div>
      <div className="kp-ovn-deal-price">{price}</div>
    </div>
  );
}

function NewWayVisual() {
  return (
    <div className="kp-ovn-visual kp-ovn-visual-new">
      <NewWayDeal name="Mellanmjölk 1 l" store="ICA" storeColor="var(--store-ica)" storeBg="var(--store-ica-bg)" price="12,90 kr" />
      <NewWayDeal name="Bryggkaffe 450 g" store="Willys" storeColor="var(--store-willys)" storeBg="var(--store-willys-bg)" price="34,90 kr" />
      <NewWayDeal name="Ägg 12-pack" store="Coop" storeColor="var(--store-coop)" storeBg="var(--store-coop-bg)" price="29,90 kr" />
      <NewWayDeal name="Bananer 1 kg" store="ICA" storeColor="var(--store-ica)" storeBg="var(--store-ica-bg)" price="14,90 kr" />
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
