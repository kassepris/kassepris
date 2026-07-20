/* Kassepris — pre-launch waitlist landing page. */
import React from "react";
import "./landing.css";
import { Icon } from "./Icon.jsx";
import { Wordmark } from "./Wordmark.jsx";
import { WaitlistForm } from "./WaitlistForm.jsx";
import { StepShowcase } from "./StepShowcase.jsx";
import { OldVsNew } from "./OldVsNew.jsx";
import { Benefits } from "./Benefits.jsx";
import { Faq } from "./Faq.jsx";

function ProPill() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", background: "var(--brand-accent)", color: "var(--ink-900)", borderRadius: "var(--radius-pill)", padding: "5px 12px", font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase" }}>
      <Icon name="sparkle" size={13} color="var(--ink-900)" /> Pro
    </span>
  );
}

const CONTACT_EMAIL = "hej@kassepris.se";

function Footer() {
  const soc = (name, href, aria) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={aria} style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "color-mix(in srgb, var(--cream-050) 12%, transparent)", color: "var(--cream-050)" }}>
      <Icon name={name} size={19} color="var(--cream-050)" />
    </a>
  );
  const footerLink = { font: "var(--text-body-sm)" };
  return (
    <footer style={{ background: "var(--green-900)", color: "var(--cream-050)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <Wordmark size={28} mode="dark" />
          <p style={{ font: "var(--text-body-sm)", color: "var(--cream-100)", margin: 0, maxWidth: 320, textWrap: "pretty" }}>
            Veckans bästa matpriser från ICA, Coop och Willys – snart samlade på ett ställe.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {soc("instagram", "https://www.instagram.com/kassepris/", "Instagram")}
          {soc("facebook", "https://www.facebook.com/people/Kassepris/61591959780845/", "Facebook")}
          {soc("tiktok", "https://www.tiktok.com/@kassepris", "TikTok")}
          {soc("linkedin", "https://www.linkedin.com/company/kassepris/", "LinkedIn")}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 24px 26px", borderTop: "1px solid color-mix(in srgb, var(--cream-100) 18%, transparent)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ font: "var(--text-mono-sm)", color: "color-mix(in srgb, var(--cream-100) 80%, transparent)" }}>© 2026 Kassepris</span>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="#/integritetspolicy" className="kp-footer-link" style={footerLink}>Integritetspolicy</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="kp-footer-link" style={footerLink}>Kontakta oss</a>
        </div>
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
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="kp-hero-dots" />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "72px 24px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <span className="kp-fade-up kp-fade-up-1" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--yellow-100)", color: "var(--green-800)", padding: "6px 13px", borderRadius: "var(--radius-pill)", font: "var(--text-label-sm)" }}>
            <Icon name="tag" size={14} color="var(--green-700)" /> ICA · Coop · Willys — fler kedjor snart
          </span>
          <h1 className="kp-fade-up kp-fade-up-2" style={{ font: "800 clamp(36px, 5vw, 52px)/1.08 var(--font-body)", color: "var(--ink-900)", margin: 0, letterSpacing: "-0.015em", textWrap: "balance" }}>
            Veckans bästa priser, på ett ställe.
          </h1>
          <p className="kp-fade-up kp-fade-up-3" style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", margin: 0, maxWidth: 520, textWrap: "pretty" }}>
            Kassepris jämför veckans erbjudanden från ICA, Coop och Willys — utan att öppna tre appar eller bläddra i tre reklamblad. Gratis att använda. Vi bygger det just nu — gå med i väntelistan så hör vi av oss när det är dags.
          </p>
          <div className="kp-fade-up kp-fade-up-4" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* old way vs new way */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 8px" }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 32px", textAlign: "center" }}>Så var det förut. Så är det nu.</h2>
        <OldVsNew />
      </section>

      {/* benefits */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 8px" }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 40px", textAlign: "center" }}>Varför Kassepris?</h2>
        <Benefits />
      </section>

      {/* how it will work */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 8px" }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 40px", textAlign: "center" }}>Så kommer det funka</h2>
        <StepShowcase />
      </section>

      {/* smart list teaser — pro feature, framed as a waitlist incentive */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px" }}>
        <div style={{ background: "var(--green-800)", borderRadius: "var(--radius-lg)", padding: "32px 28px", color: "var(--cream-050)", display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <ProPill />
              <div style={{ font: "var(--text-h2)", color: "var(--cream-050)" }}>Smart inköpslista</div>
              <p style={{ font: "var(--text-body-md)", color: "var(--cream-100)", margin: 0, textWrap: "pretty" }}>
                Låt Kassepris sätta ihop din billigaste inköpskorg – helt automatiskt.
              </p>
              <p style={{ font: "var(--text-body-sm)", color: "var(--cream-100)", margin: 0, textWrap: "pretty" }}>
                Kassepris är och förblir gratis att använda för att jämföra priser — Smart inköpslista är en valfri Pro-funktion.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["layers", "Smartare inköpslista"], ["route", "Mer kontroll över din handling"], ["tag", "Fler sätt att spara"]].map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "var(--radius-sm)", background: "color-mix(in srgb, var(--brand-accent) 20%, transparent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name={ic} size={17} color="var(--brand-accent)" /></span>
                  <span style={{ font: "var(--text-body-md)", color: "var(--cream-050)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid color-mix(in srgb, var(--cream-050) 18%, transparent)", paddingTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, maxWidth: 420 }}>
              <span style={{ width: 36, height: 36, flexShrink: 0, borderRadius: "var(--radius-sm)", background: "var(--brand-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="gift" size={19} color="var(--ink-900)" />
              </span>
              <p style={{ font: "var(--text-body-md)", color: "var(--cream-050)", margin: 0, textWrap: "pretty" }}>
                Gå med i väntelistan och bli en av <strong>de första 100</strong> att få <strong>1 månad Kassepris Pro gratis</strong> vid lansering.
              </p>
            </div>
            <div style={{ flex: "1 1 280px", maxWidth: 420 }}>
              <WaitlistForm size="md" showTerms={false} />
            </div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 8px" }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 32px", textAlign: "center" }}>Vanliga frågor</h2>
        <Faq />
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
