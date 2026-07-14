/* Profil & inställningar — web layout. No member/eco toggles (those are filters). */
import React from "react";
import * as A from "../ui.jsx";
import * as K from "../data.js";
import { Button, Switch } from "../design-system/components.jsx";

const { Icon, Avatar, metaOf, pressHandlers, PageContainer, SmartListCard } = A;

function Row({ icon, title, detail, onClick, last, right }) {
  return (
    <button onClick={onClick} disabled={!onClick} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "15px 16px", background: "transparent", border: "none", borderBottom: last ? "none" : "1px solid var(--border-default)", cursor: onClick ? "pointer" : "default", textAlign: "left" }}>
      {icon ? <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", background: "var(--cream-100)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={icon} size={19} color="var(--green-800)" /></span> : null}
      <span style={{ flex: 1, font: "var(--text-body-md)", color: "var(--ink-900)" }}>{title}</span>
      {detail ? <span style={{ font: "var(--text-body-md)", color: "var(--text-secondary)" }}>{detail}</span> : null}
      {right !== undefined ? right : (onClick ? <Icon name="right" size={18} color="var(--ink-300)" /> : null)}
    </button>
  );
}

function Card({ children, title }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {title ? <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-secondary)", margin: "0 4px 8px" }}>{title}</div> : null}
      <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function Profile({ user, authed, city, favorites, onBack, onToggleFav, onManageStores, onCity, onSmart, onLogout, onLogin }) {
  const [notify, setNotify] = React.useState(true);
  const email = (user || "du").toLowerCase().replace(/\s+/g, "") + "@exempel.se";

  if (!authed) {
    return (
      <PageContainer max={520}>
        <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-card)", padding: "48px 28px", textAlign: "center", marginTop: 20 }}>
          <span style={{ width: 60, height: 60, borderRadius: "var(--radius-lg)", background: "var(--green-800)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Icon name="user" size={28} color="var(--brand-accent)" /></span>
          <h1 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 6px" }}>Logga in på Kassepris</h1>
          <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: "0 0 22px", textWrap: "pretty" }}>Spara din lista och dina butiker på alla dina enheter.</p>
          <div {...pressHandlers()} style={{ display: "inline-block" }}><Button variant="primary" size="lg" onClick={onLogin}><span style={{ width: "100%", textAlign: "center" }}>Logga in</span></Button></div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer max={760}>
      <A.BackLink label="Tillbaka" onClick={onBack} />

      {/* user */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
        <Avatar name={user} size={64} />
        <div style={{ minWidth: 0 }}>
          <div style={{ font: "var(--text-h1)", color: "var(--ink-900)", textTransform: "capitalize" }}>{user || "Du"}</div>
          <div style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</div>
        </div>
      </div>

      {/* smart list (repurposed premium concept) */}
      <div style={{ marginBottom: 24 }}>
        <SmartListCard onClick={onSmart} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, columnGap: 22 }}>
        {/* stores */}
        <Card title="Mina butiker">
          {favorites.map((id) => {
            const m = metaOf(id), s = K.storeById(id);
            return (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: "1px solid var(--border-default)" }}>
                <span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "3px 9px", borderRadius: "var(--radius-pill)", flexShrink: 0 }}>{m.label}</span>
                <span style={{ flex: 1, font: "var(--text-body-md)", color: "var(--ink-900)", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.short} <span style={{ color: "var(--text-secondary)", font: "var(--text-label-sm)" }}>· {s.dist} km</span></span>
                <button onClick={() => onToggleFav(id)} aria-label="Ta bort butik" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 4 }}><Icon name="x" size={18} /></button>
              </div>
            );
          })}
          <Row icon="plus" title="Lägg till butik" onClick={onManageStores} last />
        </Card>

        {/* settings — member/eco removed (they live as filters in Erbjudanden) */}
        <Card title="Inställningar">
          <Row icon="pin" title="Plats" detail={city} onClick={onCity} />
          <Row icon="bell" title="Prisnotiser" onClick={null} right={<Switch checked={notify} onChange={setNotify} />} />
          <Row icon="settings" title="Språk" detail="Svenska" onClick={() => {}} last />
        </Card>
      </div>

      <div style={{ maxWidth: 300 }} {...pressHandlers(0.99)}>
        <Button variant="secondary" size="lg" onClick={onLogout}><span style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "center", color: "var(--red-700)" }}><Icon name="logout" size={19} color="var(--red-700)" /> Logga ut</span></Button>
      </div>
      <p style={{ font: "var(--text-mono-sm)", color: "var(--ink-300)", marginTop: 18 }}>Kassepris · v0.9 beta · ICA · Coop · Willys</p>
    </PageContainer>
  );
}

export default Profile;
