/* Kassepris — "Old way vs new way" comparison section.
   Left: the reality today — a separate paper/app flyer per store, skewed
   and stacked to read as clutter. Right: Kassepris — one clean grid of
   deal cards. Coded illustrations, not screenshots or real flyer content. */
import React from "react";
import "./oldvsnew.css";
import { ProductDealCard } from "./ProductDealCard.jsx";

function OldWayFlyer({ store, color, bg, price, sub, rotate }) {
  return (
    <div className="kp-ovn-flyer" style={{ "--flyer-rotate": `${rotate}deg` }}>
      <div className="kp-ovn-flyer-header" style={{ background: color }}>
        <span>{store}</span>
        <span className="kp-ovn-flyer-week">V.29</span>
      </div>
      <div className="kp-ovn-flyer-photo" style={{ background: bg }}>
        <div className="kp-ovn-flyer-tag">
          <span className="kp-ovn-flyer-tag-price">{price}<sup>90</sup></span>
        </div>
      </div>
      <div className="kp-ovn-flyer-sub">{sub}</div>
    </div>
  );
}

function OldWayVisual() {
  return (
    <div className="kp-ovn-visual kp-ovn-visual-old">
      <OldWayFlyer store="ICA" color="var(--store-ica)" bg="var(--store-ica-bg)" price="19" sub="Bryggkaffe 450 g" rotate={-7} />
      <OldWayFlyer store="Coop" color="var(--store-coop)" bg="var(--store-coop-bg)" price="24" sub="Ägg 12-pack" rotate={4} />
      <OldWayFlyer store="Willys Lund" color="var(--store-willys)" bg="var(--store-willys-bg)" price="14" sub="Mellanmjölk 1 l" rotate={-2} />
    </div>
  );
}

function NewWayVisual() {
  return (
    <div className="kp-ovn-visual kp-ovn-visual-new">
      <ProductDealCard
        icon="jar" tint="#F1E8D6" name="Gevalia Mellanrost" sub="Bryggkaffe · 450 g"
        storeLabel="Willys Lund" storeColor="var(--store-willys)" storeBg="var(--store-willys-bg)"
        price="49,90" unit="kr" was="74,90" discount="-33%"
        others={[
          { label: "ICA", color: "var(--store-ica)", bg: "var(--store-ica-bg)", price: "64,90" },
          { label: "Coop", color: "var(--store-coop)", bg: "var(--store-coop-bg)", price: "69,90" },
        ]}
      />
      <ProductDealCard
        icon="milk" tint="#E7F1E8" name="Mellanmjölk" sub="Mejeri · 1 l"
        storeLabel="ICA" storeColor="var(--store-ica)" storeBg="var(--store-ica-bg)"
        price="12,90" unit="kr"
        others={[
          { label: "Coop", color: "var(--store-coop)", bg: "var(--store-coop-bg)", price: "14,90" },
          { label: "Willys Lund", color: "var(--store-willys)", bg: "var(--store-willys-bg)", price: "15,90" },
        ]}
      />
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
