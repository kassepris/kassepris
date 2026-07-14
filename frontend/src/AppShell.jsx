/* Kassepris — app shell: routing, persisted state, web layout.
   Guests can browse; saving to a list requires login. */
import React from "react";
import * as UI from "./ui.jsx";
import * as K from "./data.js";
import Landing from "./screens/Landing.jsx";
import Auth from "./screens/Auth.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import Home from "./screens/Home.jsx";
import AllProducts from "./screens/AllProducts.jsx";
import ProductDetail from "./screens/ProductDetail.jsx";
import ShoppingList from "./screens/ShoppingList.jsx";
import SmartList from "./screens/SmartList.jsx";
import Profile from "./screens/Profile.jsx";

const A = { ...UI, Landing, Auth, Onboarding, Home, AllProducts, ProductDetail, ShoppingList, SmartList, Profile };
const { Icon, AppleGlyph, GoogleGlyph, pressHandlers, metaOf, Sheet } = A;

const LS_KEY = "kassepris.v1";
function load() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; } }

const APP_ROUTES = ["home", "search", "list", "detail", "smartlist", "profile"];

// ── Login prompt (shown when a guest tries to save) ──
function AuthPrompt({ open, onClose, onSocial, onEmail, reason }) {
  const social = (glyph, label, dark) => (
    <button onClick={onSocial} {...pressHandlers()} style={{
      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 18px",
      borderRadius: "var(--radius-md)", cursor: "pointer", background: dark ? "var(--ink-900)" : "var(--bg-surface)",
      color: dark ? "var(--white)" : "var(--text-primary)", border: dark ? "1px solid var(--ink-900)" : "1px solid var(--border-strong)",
      font: "var(--text-label-md)", transition: "transform var(--duration-fast) var(--ease-standard)",
    }}>{glyph}{label}</button>
  );
  return (
    <Sheet open={open} onClose={onClose}>
      <div style={{ textAlign: "center", padding: "2px 0 6px" }}>
        <span style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "var(--green-800)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
          <Icon name="cart" size={27} color="var(--brand-accent)" />
        </span>
        <h2 style={{ font: "var(--text-h2)", color: "var(--ink-900)", margin: "0 0 6px" }}>{reason || "Logga in för att spara"}</h2>
        <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: "0 0 18px", textWrap: "pretty" }}>Skapa ett gratiskonto så sparas din lista och dina butiker – på alla enheter.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {social(<AppleGlyph size={19} color="#fff" />, "Fortsätt med Apple", true)}
        {social(<GoogleGlyph size={18} />, "Fortsätt med Google", false)}
        <button onClick={onEmail} style={{ width: "100%", padding: "13px 18px", borderRadius: "var(--radius-md)", cursor: "pointer", background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-strong)", font: "var(--text-label-md)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Icon name="mail" size={18} color="var(--text-secondary)" /> Fortsätt med e-post
        </button>
      </div>
      <button onClick={onClose} style={{ width: "100%", border: "none", background: "none", cursor: "pointer", padding: "16px 0 2px", font: "var(--text-label-md)", color: "var(--text-secondary)" }}>Inte nu</button>
    </Sheet>
  );
}

// ── City picker ──
function CitySheet({ open, onClose, city, onSet }) {
  return (
    <Sheet open={open} onClose={onClose} title="Din plats">
      <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: "0 0 14px" }}>Vi använder din plats för att visa butiker nära dig.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["Lund", "Malmö", "Helsingborg", "Stockholm", "Göteborg"].map((c) => (
          <button key={c} onClick={() => { onSet(c); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: "var(--radius-md)", cursor: "pointer", background: c === city ? "color-mix(in srgb, var(--green-700) 7%, var(--white))" : "var(--bg-surface)", border: `1px solid ${c === city ? "var(--green-700)" : "var(--border-default)"}` }}>
            <Icon name="pin" size={18} color="var(--green-700)" />
            <span style={{ flex: 1, textAlign: "left", font: "var(--text-body-md)", color: "var(--ink-900)" }}>{c}</span>
            {c === city ? <Icon name="check" size={18} color="var(--green-800)" /> : null}
          </button>
        ))}
      </div>
      <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: "14px 4px 0", textWrap: "pretty" }}>Vi jämför just nu <strong style={{ color: "var(--text-primary)" }}>ICA, Coop och Willys</strong>. Fler kedjor är på väg.</p>
    </Sheet>
  );
}

// ── Store manager (favorites) ──
function StoresSheet({ open, onClose, favorites, onToggle }) {
  return (
    <Sheet open={open} onClose={onClose} title="Dina butiker">
      <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: "0 0 14px" }}>Välj butikerna du handlar i. Vi jämför veckans erbjudanden mellan dem.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {K.STORES.slice().sort((a, b) => a.dist - b.dist).map((s) => {
          const m = metaOf(s.id), on = favorites.includes(s.id);
          return (
            <button key={s.id} onClick={() => onToggle(s.id)} style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer", background: on ? "color-mix(in srgb, var(--green-700) 7%, var(--white))" : "var(--bg-surface)", border: `1.5px solid ${on ? "var(--green-700)" : "var(--border-default)"}`, borderRadius: "var(--radius-md)", padding: 14 }}>
              <span style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: m.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="store" size={20} color={m.color} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", font: "var(--text-body-md)", fontWeight: 600, color: "var(--ink-900)" }}>{m.label} {s.short}</span>
                <span style={{ display: "block", font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{s.area} · {s.dist} km</span>
              </span>
              <span style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: on ? "var(--green-800)" : "transparent", border: on ? "none" : "1.5px solid var(--border-strong)" }}><Icon name={on ? "check" : "plus"} size={16} color={on ? "var(--cream-050)" : "var(--text-secondary)"} /></span>
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}

function AppShell() {
  const saved0 = load();
  const [authed, setAuthed] = React.useState(!!saved0.authed);
  const [onboarded, setOnboarded] = React.useState(!!saved0.onboarded);
  const [user, setUser] = React.useState(saved0.user || "");
  const [city, setCity] = React.useState(saved0.city || K.CITY);
  const [favorites, setFavorites] = React.useState(saved0.favorites || K.DEFAULT_FAVORITES);
  const [list, setList] = React.useState(saved0.list || K.DEFAULT_LIST);

  const initialRoute = (!saved0.onboarded && !saved0.authed) ? "landing" : "home";
  const [route, setRoute] = React.useState(initialRoute);
  const [authMode, setAuthMode] = React.useState("signup");
  const [selected, setSelected] = React.useState(null);
  const [backTo, setBackTo] = React.useState("home");
  const [searchInit, setSearchInit] = React.useState({});

  const [authOpen, setAuthOpen] = React.useState(false);
  const [authReturn, setAuthReturn] = React.useState(null);
  const pendingRef = React.useRef(null);
  const [citySheet, setCitySheet] = React.useState(false);
  const [storesSheet, setStoresSheet] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ authed, onboarded, user, city, favorites, list }));
  }, [authed, onboarded, user, city, favorites, list]);

  React.useEffect(() => { const m = document.getElementById("kp-main"); if (m) m.scrollTop = 0; }, [route, selected]);

  // ── auth gating ──
  function requireAuth(action) {
    if (authed) { action(); return; }
    pendingRef.current = action;
    setAuthReturn(route);
    setAuthOpen(true);
  }
  const completeAuth = (name) => {
    setAuthed(true); setUser((u) => u || name || "Du"); setAuthOpen(false);
    const act = pendingRef.current; pendingRef.current = null;
    if (act) { act(); if (authReturn) { setRoute(authReturn); setAuthReturn(null); } }
    else { setRoute(onboarded ? "home" : "onboarding"); }
  };
  const onAuthEmail = () => { setAuthOpen(false); setAuthMode("signup"); setRoute("auth"); };

  // ── handlers ──
  const openProduct = (p) => { setSelected(p); setBackTo(["home", "search", "list"].includes(route) ? route : "home"); setRoute("detail"); };
  const nav = (k) => { if (k === "search") setSearchInit({}); setRoute(k); };
  const goSearch = (opts) => { setSearchInit(opts || {}); setRoute("search"); };
  const finishOnboarding = (fav, c) => { setFavorites(fav); if (c) setCity(c); setOnboarded(true); setRoute("home"); };
  const addToList = (id) => requireAuth(() => setList((l) => l.some((i) => i.productId === id) ? l : [...l, { productId: id, checked: false }]));
  const toggleCheck = (id) => setList((l) => l.map((i) => i.productId === id ? { ...i, checked: !i.checked } : i));
  const removeFromList = (id) => setList((l) => l.filter((i) => i.productId !== id));
  const toggleFav = (id) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  const logout = () => { setAuthed(false); setUser(""); setRoute("home"); };
  const goLogin = () => { setAuthMode("login"); setRoute("auth"); };
  const goProfile = () => { setBackTo(APP_ROUTES.includes(route) && route !== "profile" ? route : "home"); setRoute("profile"); };
  const goSmart = () => { setBackTo(APP_ROUTES.includes(route) && route !== "smartlist" ? route : "home"); setRoute("smartlist"); };

  const listCount = list.length;

  const headerProps = {
    active: route, onNav: nav, onHome: () => setRoute("home"), onSearchSubmit: (q) => goSearch({ query: q }),
    authed, user, listCount, city, onCity: () => setCitySheet(true), onLogin: goLogin, onProfile: goProfile,
  };

  let screen, chrome = true;
  if (route === "landing") { chrome = false; screen = <A.Landing onGetStarted={() => finishOrGuestStart()} onLogin={goLogin} onSmart={() => setRoute("landing")} />; }
  else if (route === "auth") { chrome = false; screen = <A.Auth initialMode={authMode} onBack={() => setRoute(onboarded || authed ? "home" : "landing")} onAuthed={completeAuth} />; }
  else if (route === "onboarding") { chrome = false; screen = <A.Onboarding initialFavorites={favorites} onDone={finishOnboarding} />; }
  else if (route === "search") screen = <A.AllProducts favorites={favorites} initial={searchInit} onOpenProduct={openProduct} onManageStores={() => setStoresSheet(true)} />;
  else if (route === "list") screen = <A.ShoppingList list={list} favorites={favorites} authed={authed} onToggle={toggleCheck} onRemove={removeFromList} onAdd={addToList} onOpen={openProduct} onBrowse={() => goSearch({})} onLogin={goLogin} />;
  else if (route === "smartlist") screen = <A.SmartList onBack={() => setRoute(backTo)} onBrowse={() => goSearch({})} />;
  else if (route === "profile") screen = <A.Profile user={user} authed={authed} city={city} favorites={favorites} onBack={() => setRoute(backTo)} onToggleFav={toggleFav} onManageStores={() => setStoresSheet(true)} onCity={() => setCitySheet(true)} onSmart={goSmart} onLogout={logout} onLogin={goLogin} />;
  else if (route === "detail" && selected) screen = <A.ProductDetail product={selected} favorites={favorites} onBack={() => setRoute(backTo)} onAdd={(p) => addToList(p.id)} onOpen={openProduct} onManageStores={() => setStoresSheet(true)} city={city} />;
  else screen = <A.Home user={user} authed={authed} city={city} favorites={favorites} list={list} onOpenProduct={openProduct} onSearch={goSearch} onManageStores={() => setStoresSheet(true)} onSmart={goSmart} onOpenList={() => setRoute("list")} onLogin={goLogin} />;

  function finishOrGuestStart() { setRoute("onboarding"); }

  const screenKey = route + (route === "detail" && selected ? ":" + selected.id : "") + (route === "search" ? ":" + JSON.stringify(searchInit) : "");

  const body = <div key={screenKey} className="kp-route" style={{ minHeight: chrome ? "auto" : "100%" }}>{screen}</div>;

  return (
    <React.Fragment>
      {chrome
        ? <A.WebShell headerProps={headerProps}>{body}</A.WebShell>
        : <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-page)" }} id="kp-main">{body}</div>}
      <AuthPrompt open={authOpen} onClose={() => { setAuthOpen(false); pendingRef.current = null; }} onSocial={() => completeAuth("Du")} onEmail={onAuthEmail} />
      <CitySheet open={citySheet} onClose={() => setCitySheet(false)} city={city} onSet={setCity} />
      <StoresSheet open={storesSheet} onClose={() => setStoresSheet(false)} favorites={favorites} onToggle={toggleFav} />
    </React.Fragment>
  );
}

export default AppShell;
