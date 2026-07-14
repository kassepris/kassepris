/* Onboarding — step 1: location, step 2: favorite stores. Web-centered. */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button, Input } from "../design-system/components.jsx";

const { Icon, StepDots, Wordmark, metaOf, pressHandlers } = A;

function LocationStep({ onNext }) {
  const [phase, setPhase] = React.useState("idle");
  const [city, setCity] = React.useState("");
  const [manual, setManual] = React.useState("");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function locate() {
    setPhase("locating");
    setTimeout(() => { setCity("Lund"); setPhase("done"); }, reduce ? 200 : 1300);
  }
  const suggestions = ["Lund", "Malmö", "Helsingborg", "Stockholm"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: "0 0 6px" }}>Var handlar du?</h1>
        <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>
          Vi visar veckans erbjudanden i butiker nära dig. Din plats stannar på din enhet.
        </p>
      </div>

      <div style={{ position: "relative", height: 170, borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--cream-100)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--cream-200) 1px, transparent 1px), linear-gradient(90deg, var(--cream-200) 1px, transparent 1px)", backgroundSize: "26px 26px", opacity: 0.6 }} />
        {phase !== "done" ? (
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span className={phase === "locating" ? "kp-ping" : ""} style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--green-700)", boxShadow: "0 0 0 6px color-mix(in srgb, var(--green-700) 22%, transparent)" }} />
            <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{phase === "locating" ? "Söker din plats…" : "Ingen plats vald"}</span>
          </div>
        ) : (
          <div className="kp-fade-up" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <Icon name="pin" size={34} color="var(--green-800)" />
            <span style={{ font: "var(--text-h3)", color: "var(--ink-900)" }}>{city}</span>
            <span style={{ font: "var(--text-label-sm)", color: "var(--green-700)" }}>Plats hittad</span>
          </div>
        )}
      </div>

      {phase !== "done" ? (
        <React.Fragment>
          <div {...pressHandlers()} style={{ transition: "transform var(--duration-fast) var(--ease-standard)" }}>
            <Button variant="primary" size="lg" onClick={locate} disabled={phase === "locating"}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}>
                {phase === "locating" ? <span className="kp-spin" style={{ width: 18, height: 18, border: "2px solid var(--cream-100)", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block" }} /> : <Icon name="locate" size={20} color="var(--cream-050)" />}
                {phase === "locating" ? "Söker…" : "Använd min plats"}
              </span>
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
            <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>eller ange manuellt</span>
            <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
          </div>
          <Input placeholder="Postnummer eller ort" size="lg" value={manual} onChange={(e) => setManual(e.target.value)} icon={<Icon name="search" size={18} color="var(--text-secondary)" />} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {suggestions.map((s) => (
              <button key={s} onClick={() => { setCity(s); setPhase("done"); }} style={{ border: "1px solid var(--border-default)", background: "var(--bg-surface)", borderRadius: "var(--radius-pill)", padding: "7px 14px", font: "var(--text-label-md)", cursor: "pointer", color: "var(--text-primary)" }}>{s}</button>
            ))}
          </div>
        </React.Fragment>
      ) : (
        <div {...pressHandlers()} style={{ transition: "transform var(--duration-fast) var(--ease-standard)" }}>
          <Button variant="accent" size="lg" onClick={() => onNext(city)}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center" }}>Fortsätt <Icon name="arrow" size={20} /></span>
          </Button>
        </div>
      )}
    </div>
  );
}

function StoreSelectRow({ store, selected, onToggle }) {
  const m = metaOf(store.id);
  return (
    <button onClick={onToggle} style={{
      width: "100%", display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer",
      background: selected ? "color-mix(in srgb, var(--green-700) 7%, var(--white))" : "var(--bg-surface)",
      border: `1.5px solid ${selected ? "var(--green-700)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)", padding: 14, transition: "all var(--duration-fast) var(--ease-standard)",
    }}>
      <span style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: m.bg, color: m.color, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name="store" size={22} color={m.color} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "2px 8px", borderRadius: "var(--radius-pill)" }}>{m.label}</span>
          <span style={{ font: "var(--text-body-md)", fontWeight: 600, color: "var(--ink-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{store.short}</span>
        </span>
        <span style={{ display: "block", font: "var(--text-label-sm)", color: "var(--text-secondary)", marginTop: 4 }}>{store.area} · {store.dist} km · öppet till {store.open}</span>
      </span>
      <span style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: selected ? "var(--green-800)" : "transparent", border: selected ? "none" : "1.5px solid var(--border-strong)", color: "var(--cream-050)" }}>
        <Icon name={selected ? "check" : "plus"} size={17} color={selected ? "var(--cream-050)" : "var(--text-secondary)"} />
      </span>
    </button>
  );
}

function StoresStep({ sel, onToggle }) {
  const stores = K.STORES.slice().sort((a, b) => a.dist - b.dist);
  return (
    <React.Fragment>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: "0 0 6px" }}>Butiker nära dig</h1>
        <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>
          Lägg till butikerna du handlar i. Vi jämför veckans priser mellan ICA, Coop och Willys.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {stores.map((s) => <StoreSelectRow key={s.id} store={s} selected={sel.includes(s.id)} onToggle={() => onToggle(s.id)} />)}
      </div>
    </React.Fragment>
  );
}

function Onboarding({ onDone, initialFavorites }) {
  const [step, setStep] = React.useState(0);
  const [city, setCity] = React.useState(K.CITY);
  const [fav, setFav] = React.useState(initialFavorites || K.DEFAULT_FAVORITES);
  const toggleFav = (id) => setFav((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--bg-page)", padding: "22px 20px 40px" }}>
      <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", flex: 1 }}>
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          {step === 1 ? <A.IconButton name="left" onClick={() => setStep(0)} ariaLabel="Tillbaka" surface /> : <Wordmark size={22} />}
          <StepDots count={2} active={step} />
          <span style={{ width: 40 }} />
        </div>

        <div style={{ flex: 1 }}>
          {step === 0
            ? <LocationStep onNext={(c) => { setCity(c); setStep(1); }} />
            : <StoresStep sel={fav} onToggle={toggleFav} />}
        </div>

        {step === 1 ? (
          <div style={{ position: "sticky", bottom: 0, background: "var(--bg-page)", paddingTop: 16, marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ font: "var(--text-label-md)", color: "var(--text-secondary)", flexShrink: 0 }}>{fav.length} valda</span>
            <div style={{ flex: 1 }} {...pressHandlers()}>
              <Button variant="accent" size="lg" disabled={fav.length === 0} onClick={() => onDone(fav, city)}>
                <span style={{ width: "100%", textAlign: "center" }}>Fortsätt till appen</span>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Onboarding;
