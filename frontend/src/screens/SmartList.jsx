/* Smart inköpslista — coming soon (repurposed premium concept). */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button } from "../design-system/components.jsx";

const { Icon, SoonTag, metaOf, pressHandlers, PageContainer, BackLink } = A;

function Feature({ icon, title, body }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <span style={{ width: 42, height: 42, flexShrink: 0, borderRadius: "var(--radius-md)", background: "var(--yellow-100)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={21} color="var(--green-800)" />
      </span>
      <div>
        <div style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>{title}</div>
        <div style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", marginTop: 2, textWrap: "pretty" }}>{body}</div>
      </div>
    </div>
  );
}

// static preview: a basket split across stores for the lowest total
function SplitPreview() {
  const rows = [
    { store: "willys1", items: ["Bryggkaffe", "Bananer", "Pasta"], sum: "57,70" },
    { store: "ica1", items: ["Blandfärs", "Riven ost"], sum: "104,80" },
    { store: "coop1", items: ["Ägg", "Yoghurt"], sum: "51,80" },
  ];
  return (
    <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-secondary)" }}>Så här skulle det se ut</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--text-label-md)", color: "var(--green-800)", background: "var(--yellow-100)", padding: "4px 10px", borderRadius: "var(--radius-pill)" }}>Spar 38,20</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r) => {
          const m = metaOf(r.store), s = K.storeById(r.store);
          return (
            <div key={r.store} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}>
              <span style={{ background: m.bg, color: m.color, font: "var(--text-label-md)", padding: "5px 11px", borderRadius: "var(--radius-pill)", flexShrink: 0 }}>{m.label}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", font: "var(--text-body-md)", fontWeight: 600, color: "var(--ink-900)" }}>{s.short}</span>
                <span style={{ display: "block", font: "var(--text-label-sm)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.items.join(" · ")}</span>
              </span>
              <span style={{ font: "var(--text-display-sm)", color: "var(--green-800)", flexShrink: 0 }}>{r.sum}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SmartList({ onBack, onBrowse }) {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  return (
    <PageContainer max={960}>
      <BackLink label="Tillbaka" onClick={onBack} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 52, height: 52, borderRadius: "var(--radius-lg)", background: "var(--green-800)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="sparkle" size={26} color="var(--brand-accent)" />
            </span>
            <SoonTag size="lg" />
          </div>
          <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: 0, textWrap: "balance" }}>Smart inköpslista</h1>
          <p style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", margin: 0, maxWidth: 620, textWrap: "pretty" }}>
            Lägg in hela din handlingslista, så räknar Kassepris ut var varje vara är billigast den här veckan – och delar upp listan butik för butik så att du sparar mest.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Feature icon="layers" title="Hela listan optimerad" body="Vi jämför varje vara mot veckans erbjudanden i dina butiker automatiskt." />
            <Feature icon="route" title="Uppdelad per butik" body="Se exakt vad du köper var – och den totala kostnaden i varje butik." />
            <Feature icon="tag" title="Din besparing, svart på vitt" body="Tydlig summa på hur mycket du sparar jämfört med att handla allt på ett ställe." />
          </div>
          <SplitPreview />
        </div>

        {/* notify */}
        <div style={{ background: "var(--green-800)", borderRadius: "var(--radius-lg)", padding: 24, color: "var(--cream-050)" }}>
          {done ? (
            <div className="kp-fade-up" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: "50%", background: "var(--brand-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={22} color="var(--green-900)" /></span>
              <div>
                <div style={{ font: "var(--text-h3)", color: "var(--cream-050)" }}>Tack – vi hör av oss!</div>
                <div style={{ font: "var(--text-body-sm)", color: "var(--cream-100)", marginTop: 2 }}>Du får ett mejl så fort smarta listan är igång.</div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div style={{ font: "var(--text-h3)", color: "var(--cream-050)", marginBottom: 4 }}>Vill du testa först?</div>
              <p style={{ font: "var(--text-body-md)", color: "var(--cream-100)", margin: "0 0 16px", textWrap: "pretty" }}>Lämna din e-post så hör vi av oss när smarta listan släpps.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setDone(true); }} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="du@exempel.se" style={{ flex: "1 1 220px", minWidth: 0, border: "none", outline: "none", borderRadius: "var(--radius-md)", padding: "13px 16px", font: "var(--text-body-md)", fontFamily: "var(--font-body)", color: "var(--text-primary)", background: "var(--cream-050)" }} />
                <div {...pressHandlers()}><Button variant="accent" size="lg" type="submit"><span style={{ width: "100%", textAlign: "center" }}>Meddela mig</span></Button></div>
              </form>
            </React.Fragment>
          )}
        </div>

        <button onClick={onBrowse} style={{ alignSelf: "flex-start", border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-md)", display: "inline-flex", alignItems: "center", gap: 4 }}>
          Bläddra bland veckans erbjudanden så länge <Icon name="right" size={16} />
        </button>
      </div>
    </PageContainer>
  );
}

export default SmartList;
