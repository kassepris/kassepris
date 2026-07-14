/* Auth — Skapa konto / Logga in. Web-centered card. */
import React from "react";
import * as A from "../ui.jsx";
import { Button } from "../design-system/components.jsx";

const { Icon, AppleGlyph, GoogleGlyph, Segmented, Wordmark, IconButton, pressHandlers } = A;

function SocialButton({ glyph, label, dark, onClick }) {
  return (
    <button onClick={onClick} {...pressHandlers()} style={{
      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      padding: "13px 18px", borderRadius: "var(--radius-md)", cursor: "pointer",
      background: dark ? "var(--ink-900)" : "var(--bg-surface)",
      color: dark ? "var(--white)" : "var(--text-primary)",
      border: dark ? "1px solid var(--ink-900)" : "1px solid var(--border-strong)",
      font: "var(--text-label-md)", transition: "transform var(--duration-fast) var(--ease-standard)",
    }}>
      {glyph}{label}
    </button>
  );
}

function Field({ label, type = "text", value, onChange, placeholder, icon }) {
  const [show, setShow] = React.useState(false);
  const t = type === "password" && !show ? "password" : (type === "password" ? "text" : type);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ font: "var(--text-label-md)", color: "var(--text-primary)" }}>{label}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
        {icon ? <Icon name={icon} size={18} color="var(--text-secondary)" /> : null}
        <input type={t} value={value} onChange={onChange} placeholder={placeholder} style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", font: "var(--text-body-md)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }} />
        {type === "password" ? (
          <button type="button" onClick={() => setShow((s) => !s)} style={{ border: "none", background: "none", cursor: "pointer", font: "var(--text-label-sm)", color: "var(--text-link)" }}>{show ? "Dölj" : "Visa"}</button>
        ) : null}
      </span>
    </label>
  );
}

function Auth({ initialMode = "signup", onBack, onAuthed }) {
  const [mode, setMode] = React.useState(initialMode);
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const signup = mode === "signup";
  const name = email.split("@")[0] || "Du";

  return (
    <div style={{ minHeight: "100%", background: "var(--bg-page)", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 20px 48px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ marginBottom: 8 }}>
          <IconButton name="left" onClick={onBack} ariaLabel="Tillbaka" surface />
        </div>

        <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: "28px 24px", marginTop: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}>
            <Wordmark size={26} />
            <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: "8px 0 0" }}>{signup ? "Skapa konto" : "Välkommen tillbaka"}</h1>
            <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>
              {signup ? "Gratis. Börja jämföra priser på under en minut." : "Logga in för att se dina butiker och din lista."}
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <Segmented options={[{ value: "signup", label: "Skapa konto" }, { value: "login", label: "Logga in" }]} value={mode} onChange={setMode} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            <SocialButton glyph={<AppleGlyph size={19} color="#fff" />} label="Fortsätt med Apple" dark onClick={() => onAuthed(name)} />
            <SocialButton glyph={<GoogleGlyph size={18} />} label="Fortsätt med Google" onClick={() => onAuthed(name)} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0 18px" }}>
            <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
            <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>eller med e-post</span>
            <span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onAuthed(name); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="E-post" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="du@exempel.se" icon="mail" />
            <Field label="Lösenord" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder={signup ? "Välj ett lösenord" : "Ditt lösenord"} icon="lock" />
            {!signup ? <button type="button" style={{ alignSelf: "flex-end", border: "none", background: "none", cursor: "pointer", font: "var(--text-label-sm)", color: "var(--text-link)" }}>Glömt lösenord?</button> : null}
            <div {...pressHandlers()} style={{ transition: "transform var(--duration-fast) var(--ease-standard)", marginTop: 2 }}>
              <Button variant="primary" size="lg" type="submit">
                <span style={{ width: "100%", textAlign: "center" }}>{signup ? "Skapa konto" : "Logga in"}</span>
              </Button>
            </div>
          </form>

          <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", textAlign: "center", margin: "18px 0 0", textWrap: "pretty" }}>
            Genom att fortsätta godkänner du våra <span style={{ color: "var(--text-link)" }}>villkor</span> och vår <span style={{ color: "var(--text-link)" }}>integritetspolicy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
