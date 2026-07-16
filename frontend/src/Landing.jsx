/* Kassepris — pre-launch waitlist landing page. */
import React from "react";
import { Icon } from "./Icon.jsx";
import { Wordmark } from "./Wordmark.jsx";
import { WaitlistForm } from "./WaitlistForm.jsx";

function Step({ n, title, body }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span style={{ width: 38, height: 38, flexShrink: 0, borderRadius: "var(--radius-md)", background: "var(--green-800)", color: "var(--brand-accent)", font: "700 22px/38px var(--font-display)", textAlign: "center" }}>{n}</span>
      <div>
        <div style={{ font: "var(--text-h3)", color: "var(--text-primary)" }}>{title}</div>
        <div style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", marginTop: 3, textWrap: "pretty" }}>{body}</div>
      </div>
    </div>
  );
}

function Footer() {
  const soc = (name, href, aria) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={aria} style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "color-mix(in srgb, var(--cream-050) 12%, transparent)", color: "var(--cream-050)" }}>
      <Icon name={name} size={19} color="var(--cream-050)" />
    </a>
  );
  return (
    <footer style={{ background: "var(--green-900)", color: "var(--cream-050)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <Wordmark size={28} mode="dark" />
        <div style={{ display: "flex", gap: 10 }}>
          {soc("instagram", "https://instagram.com", "Instagram")}
          {soc("facebook", "https://facebook.com", "Facebook")}
          {soc("tiktok", "https://tiktok.com", "TikTok")}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 26px", font: "var(--text-mono-sm)", color: "color-mix(in srgb, var(--cream-100) 80%, transparent)" }}>
        © 2026 Kassepris
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div style={{ minHeight: "100%", background: "var(--bg-page)" }}>
      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 8, background: "color-mix(in srgb, var(--bg-page) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-default)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center" }}>
          <Wordmark size={32} />
        </div>
      </header>

      {/* hero */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--yellow-100)", color: "var(--green-800)", padding: "6px 13px", borderRadius: "var(--radius-pill)", font: "var(--text-label-sm)" }}>
          <Icon name="tag" size={14} color="var(--green-700)" /> ICA · Coop · Willys — fler kedjor snart
        </span>
        <h1 style={{ font: "800 clamp(36px, 5vw, 52px)/1.08 var(--font-body)", color: "var(--ink-900)", margin: 0, letterSpacing: "-0.015em", textWrap: "balance" }}>
          Veckans bästa priser, på ett ställe.
        </h1>
        <p style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", margin: 0, maxWidth: 520, textWrap: "pretty" }}>
          Kassepris jämför veckans erbjudanden från ICA, Coop och Willys — utan att öppna tre appar eller bläddra i tre reklamblad. Vi bygger det just nu — gå med i väntelistan så hör vi av oss när det är dags.
        </p>
        <WaitlistForm />
      </section>

      {/* how it will work */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 26px", textAlign: "center" }}>Så kommer det funka</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
          <Step n="1" title="Välj dina butiker" body="Lägg till butikerna du handlar i, från ICA, Coop och Willys." />
          <Step n="2" title="Sök varan" body="Hitta produkten — vi visar veckans pris i varje butik du valt." />
          <Step n="3" title="Se var den är billigast" body="Alla priser och varianter sida vid sida. Handla smartare." />
        </div>
      </section>

      {/* smart list teaser */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px" }}>
        <div style={{ background: "var(--green-800)", borderRadius: "var(--radius-lg)", padding: "32px 28px", color: "var(--cream-050)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Icon name="sparkle" size={22} color="var(--brand-accent)" />
            <div style={{ font: "var(--text-h2)", color: "var(--cream-050)" }}>Snart: smart inköpslista</div>
            <p style={{ font: "var(--text-body-md)", color: "var(--cream-100)", margin: 0, textWrap: "pretty" }}>
              Lägg in hela din lista, så delar vi upp den butik för butik där varorna är billigast – och räknar ut din totala besparing.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["layers", "Hela listan optimerad automatiskt"], ["route", "Uppdelad per butik"], ["tag", "Din besparing svart på vitt"]].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "var(--radius-sm)", background: "color-mix(in srgb, var(--brand-accent) 20%, transparent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={ic} size={17} color="var(--brand-accent)" /></span>
                <span style={{ font: "var(--text-body-md)", color: "var(--cream-050)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 64px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: 0, textWrap: "balance" }}>Var först att veta när vi lanserar</h2>
        <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, maxWidth: 440 }}>Ingen spam. Bara ett mejl när Kassepris är redo att användas.</p>
        <WaitlistForm />
      </section>

      <Footer />
    </div>
  );
}
