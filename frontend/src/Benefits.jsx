/* Kassepris — three-up benefits row. */
import React from "react";
import "./benefits.css";
import { Icon } from "./Icon.jsx";

const BENEFITS = [
  { icon: "pin", title: "Bara dina butiker", body: "Se erbjudanden från butikerna nära dig — inte hela landet." },
  { icon: "clock", title: "Spara tid varje vecka", body: "Ett ställe istället för tre appar eller reklamblad att bläddra i." },
  { icon: "wallet", title: "Alltid gratis att jämföra", body: "Ingen kostnad för att se och jämföra priser — nu och i framtiden." },
];

export function Benefits() {
  return (
    <div className="kp-benefits">
      {BENEFITS.map((b) => (
        <div key={b.title} className="kp-benefit">
          <span className="kp-benefit-icon">
            <Icon name={b.icon} size={22} color="var(--green-700)" />
          </span>
          <h3 className="kp-benefit-title">{b.title}</h3>
          <p className="kp-benefit-body">{b.body}</p>
        </div>
      ))}
    </div>
  );
}
