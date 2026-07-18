/* Kassepris — FAQ accordion (native <details>, no JS state needed). */
import React from "react";
import "./faq.css";
import { Icon } from "./Icon.jsx";

const FAQS = [
  { q: "Är Kassepris gratis?", a: "Ja, att jämföra priser är och förblir gratis. Kassepris Pro är en valfri betaltjänst med extra funktioner, som Smart inköpslista." },
  { q: "Vilka butiker jämförs?", a: "Just nu ICA, Coop och Willys. Fler kedjor tillkommer efter hand." },
  { q: "När lanseras appen?", a: "Vi bygger Kassepris just nu. Gå med i väntelistan så mejlar vi dig så fort det är dags." },
  { q: "Vad händer med min e-postadress?", a: "Vi använder den bara för att kontakta dig om lanseringen — ingen spam, inget delande med tredje part." },
  { q: "Vad är Kassepris Pro?", a: "En valfri, betald nivå med extra funktioner, som en smart inköpslista som automatiskt hittar din billigaste kundvagn. Att jämföra priser är alltid gratis." },
];

export function Faq() {
  return (
    <div className="kp-faq">
      {FAQS.map((f) => (
        <details key={f.q} className="kp-faq-item">
          <summary className="kp-faq-question">
            <span>{f.q}</span>
            <span className="kp-faq-chevron">
              <Icon name="chevron-down" size={18} color="var(--text-secondary)" />
            </span>
          </summary>
          <p className="kp-faq-answer">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
