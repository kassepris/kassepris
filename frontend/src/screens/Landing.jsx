/* Landing / marketing (pre-auth) — web layout. */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button } from "../design-system/components.jsx";

const { Icon, Wordmark, SoonTag, metaOf, SaveChip, pressHandlers } = A;

function HeroCompareCard() {
  const kaffe = K.productById("kaffe");
  const ids = ["willys1", "ica1", "coop1"];
  const rows = ids.map((sid) => {
    const best = K.bestVariant(kaffe, [sid]);
    return { sid, price: best.variant.price, val: best.val };
  }).sort((a, b) => a.val - b.val);
  const spread = K.fmt(rows[rows.length - 1].val - rows[0].val);
  return (
    <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-raised)", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ font: "var(--text-label-md)", color: "var(--text-primary)" }}>Bryggkaffe · Gevalia 450 g</div>
          <div style={{ font: "var(--text-mono-sm)", color: "var(--text-secondary)" }}>{A.WEEK} · veckans erbjudande</div>
        </div>
        <Icon name="tag" size={24} color="var(--green-700)" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r, i) => {
          const m = metaOf(r.sid), store = K.storeById(r.sid), best = i === 0;
          return (
            <div key={r.sid} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "var(--radius-md)", background: best ? "var(--yellow-100)" : "var(--bg-surface)", border: `1px solid ${best ? "var(--yellow-500)" : "var(--border-default)"}` }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>{m.label}</span>
                <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{store.short}</span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
                {best ? <span style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--green-800)" }}>Billigast</span> : null}
                <span style={{ font: "var(--text-display-sm)", color: best ? "var(--green-800)" : "var(--ink-700)" }}>{r.price}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <SaveChip>{`Spar ${spread} kr`}</SaveChip>
        <span style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)" }}>samma kaffe, tre butiker</span>
      </div>
    </div>
  );
}

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

function Landing({ onGetStarted, onLogin }) {
  const totalPrices = K.PRODUCTS.reduce((n, p) => n + p.stores.reduce((a, b) => a + b.variants.length, 0), 0);
  const startBtn = (variant, label) => (
    <div {...pressHandlers()} style={{ transition: "transform var(--duration-fast) var(--ease-standard)" }}>
      <Button variant={variant} size="lg" onClick={onGetStarted}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>{label} <Icon name="arrow" size={20} /></span>
      </Button>
    </div>
  );

  return (
    <div style={{ minHeight: "100%", background: "var(--bg-page)" }}>
      {/* header */}
      <header style={{ position: "sticky", top: 0, zIndex: 8, background: "color-mix(in srgb, var(--bg-page) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-default)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Wordmark size={24} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onLogin} style={{ border: "none", background: "none", cursor: "pointer", font: "var(--text-label-md)", color: "var(--text-primary)", padding: "9px 12px" }}>Logga in</button>
            <button onClick={onGetStarted} style={{ cursor: "pointer", background: "var(--green-800)", color: "var(--cream-050)", border: "none", borderRadius: "var(--radius-pill)", padding: "10px 18px", font: "var(--text-label-md)" }}>Kom igång</button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, alignSelf: "flex-start", background: "var(--yellow-100)", color: "var(--green-800)", padding: "6px 13px", borderRadius: "var(--radius-pill)", font: "var(--text-label-sm)" }}>
              <Icon name="tag" size={14} color="var(--green-700)" /> ICA · Coop · Willys — fler kedjor snart
            </span>
            <h1 style={{ font: "800 clamp(36px, 5vw, 52px)/1.08 var(--font-body)", color: "var(--ink-900)", margin: 0, letterSpacing: "-0.015em", textWrap: "balance" }}>
              Veckans bästa priser, på ett ställe.
            </h1>
            <p style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", margin: 0, maxWidth: 520, textWrap: "pretty" }}>
              Jämför veckans erbjudanden från ICA, Coop och Willys — utan att öppna tre appar eller bläddra i tre reklamblad.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              {startBtn("accent", "Kom igång – gratis")}
              <span style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>{totalPrices} priser</strong> från veckans reklamblad
              </span>
            </div>
          </div>
          <HeroCompareCard />
        </div>
      </section>

      {/* how it works */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 26px" }}>Så funkar det</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
          <Step n="1" title="Välj dina butiker" body="Lägg till butikerna du handlar i, från ICA, Coop och Willys." />
          <Step n="2" title="Sök varan" body="Hitta produkten — vi visar veckans pris i varje butik du valt." />
          <Step n="3" title="Se var den är billigast" body="Alla priser och varianter sida vid sida. Handla smartare." />
        </div>
      </section>

      {/* smart list teaser */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px 8px" }}>
        <div style={{ background: "var(--green-800)", borderRadius: "var(--radius-lg)", padding: "32px 28px", color: "var(--cream-050)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="sparkle" size={22} color="var(--brand-accent)" /><SoonTag /></div>
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
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 56px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: 0, textWrap: "balance" }}>Börja jämföra på under en minut</h2>
        <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, maxWidth: 440 }}>Gratis. Inget kort. Logga in när du vill spara din lista.</p>
        {startBtn("primary", "Kom igång – gratis")}
        <button onClick={onLogin} style={{ border: "none", background: "none", cursor: "pointer", font: "var(--text-body-md)", color: "var(--text-secondary)", marginTop: 2 }}>
          Har du redan konto? <span style={{ color: "var(--text-link)", fontWeight: 600 }}>Logga in</span>
        </button>
      </section>

      <A.Footer onHome={() => { const m = document.getElementById("kp-main"); if (m) m.scrollTo({ top: 0, behavior: "smooth" }); }} onNav={() => onGetStarted()} onProfile={onLogin} />
    </div>
  );
}

export default Landing;
