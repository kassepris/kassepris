/* Kassepris — integritetspolicy (privacy policy) for the waitlist. */
import React from "react";
import { Icon } from "./Icon.jsx";
import { Wordmark } from "./Wordmark.jsx";

const CONTACT_EMAIL = "hej@kassepris.se";

function Section({ title, children }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h2 style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>{title}</h2>
      <div style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 8, textWrap: "pretty" }}>{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: "100%", background: "var(--bg-page)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 8, background: "color-mix(in srgb, var(--bg-page) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-default)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center" }}>
          <a href="#/" aria-label="Till startsidan" style={{ display: "inline-flex", alignItems: "center", height: "100%" }}><Wordmark size={32} /></a>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 72px", display: "flex", flexDirection: "column", gap: 32 }}>
        <a href="#/" style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--text-label-md)", color: "var(--text-secondary)" }}>
          <Icon name="arrow" size={16} color="var(--text-secondary)" style={{ transform: "rotate(180deg)" }} /> Till startsidan
        </a>

        <div>
          <h1 style={{ font: "800 clamp(30px, 4vw, 40px)/1.1 var(--font-body)", color: "var(--ink-900)", margin: "0 0 8px" }}>Integritetspolicy</h1>
          <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: 0 }}>Senast uppdaterad: juli 2026</p>
        </div>

        <Section title="Vilka uppgifter vi samlar in">
          <p>I det här skedet samlar Kassepris enbart in den e-postadress du själv anger när du går med i väntelistan. Vi samlar inte in namn, adress eller betalningsuppgifter.</p>
        </Section>

        <Section title="Hur vi använder din e-postadress">
          <p>Din e-postadress används uteslutande för att skicka information om lanseringen av Kassepris, inklusive eventuell tidig tillgång eller erbjudanden kopplade till väntelistan (till exempel en gratis månad för de första 100 som går med).</p>
          <p>Vi säljer, hyr ut eller delar aldrig din e-postadress med tredje part i marknadsföringssyfte.</p>
        </Section>

        <Section title="Hur länge vi sparar dina uppgifter">
          <p>Vi sparar din e-postadress fram tills du avregistrerar dig eller Kassepris lanseras och du väljer att skapa ett konto, då dina uppgifter hanteras enligt villkoren för själva tjänsten.</p>
        </Section>

        <Section title="Dina rättigheter">
          <p>Du kan när som helst be oss ta bort din e-postadress från väntelistan genom att kontakta oss (se nedan). Vi raderar då dina uppgifter utan onödigt dröjsmål.</p>
        </Section>

        <Section title="Kontakt">
          <p>
            Har du frågor om den här policyn eller vill ta bort dina uppgifter, mejla oss på{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--text-link)" }}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>
      </div>
    </div>
  );
}
