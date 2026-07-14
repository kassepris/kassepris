/* Kassepris app — shared UI built on the Kassepris design system.
   Web layout: top-right nav header (Coop-style), centered content containers,
   fixed-dimension product cards. */
import React from "react";
import * as K from "./data.js";
import logoName from "./assets/logo_name.png";

const WEEK = "Vecka 28";
const MAXW = 1180;

const STORE_META = {
  ica:    { label: "ICA",    color: "var(--store-ica)",    bg: "var(--store-ica-bg)" },
  coop:   { label: "Coop",   color: "var(--store-coop)",   bg: "var(--store-coop-bg)" },
  willys: { label: "Willys", color: "var(--store-willys)", bg: "var(--store-willys-bg)" },
};
const chainOf = (storeId) => (K.storeById(storeId) || {}).chain;
const metaOf = (storeId) => STORE_META[chainOf(storeId)] || STORE_META.ica;

// ───────────────────────── Icons ─────────────────────────
function Icon({ name, size = 20, color = "currentColor", sw = 2, style }) {
  const p = { fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const svg = (children) => (<svg width={size} height={size} viewBox="0 0 24 24" style={style}>{children}</svg>);
  switch (name) {
    case "search": return svg(<g {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></g>);
    case "pin": return svg(<g {...p}><path d="M12 21s-6-5.7-6-10a6 6 0 0 1 12 0c0 4.3-6 10-6 10z" /><circle cx="12" cy="11" r="2.3" /></g>);
    case "locate": return svg(<g {...p}><circle cx="12" cy="12" r="7" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /><circle cx="12" cy="12" r="1.4" fill={color} stroke="none" /></g>);
    case "left": return svg(<path {...p} d="M15 5l-7 7 7 7" />);
    case "right": return svg(<path {...p} d="M9 5l7 7-7 7" />);
    case "down": return svg(<path {...p} d="M6 9l6 6 6-6" />);
    case "up": return svg(<path {...p} d="M6 15l6-6 6 6" />);
    case "plus": return svg(<path {...p} d="M12 5v14M5 12h14" />);
    case "minus": return svg(<path {...p} d="M5 12h14" />);
    case "check": return svg(<path {...p} d="M5 12.5l4.5 4.5L19 7" />);
    case "checkCircle": return svg(<g {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.2l2.6 2.6L16 9" /></g>);
    case "home": return svg(<g {...p}><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9.5h12V10" /></g>);
    case "list": return svg(<g {...p}><path d="M8.5 6.5H21M8.5 12H21M8.5 17.5H21" /><path d="M3.5 6.5h.01M3.5 12h.01M3.5 17.5h.01" strokeWidth="2.4" /></g>);
    case "user": return svg(<g {...p}><circle cx="12" cy="8" r="4" /><path d="M4.5 20c0-3.6 3.4-5.5 7.5-5.5s7.5 1.9 7.5 5.5" /></g>);
    case "filter": return svg(<path {...p} d="M4 5h16l-6 8v6l-4-2v-4z" />);
    case "sparkle": return svg(<g><path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4z" fill={color} stroke="none" /><path d="M18.5 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" fill={color} stroke="none" /></g>);
    case "x": return svg(<path {...p} d="M6 6l12 12M18 6L6 18" />);
    case "arrow": return svg(<path {...p} d="M5 12h14M13 6l6 6-6 6" />);
    case "tag": return svg(<g {...p}><path d="M3 3h8l10 10-8 8L3 11z" /><circle cx="7.5" cy="7.5" r="1.5" /></g>);
    case "store": return svg(<g {...p}><path d="M4 9l1.2-4.5h13.6L20 9" /><path d="M5 9v10.5h14V9" /><path d="M4 9h16" /></g>);
    case "cart": return svg(<g {...p}><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2.2l2 11h9.6l2-8H6.5" /></g>);
    case "heart": return svg(<path {...p} d="M12 20S3.5 14.5 3.5 8.8C3.5 6 5.6 4.3 8 4.3c1.6 0 2.9 1 3.6 2 .7-1 2-2 3.6-2 2.4 0 4.5 1.7 4.5 4.5C19.7 14.5 12 20 12 20z" />);
    case "trash": return svg(<g {...p}><path d="M4 7h16M9.5 7V5h5v2M6.5 7l1 12h9l1-12" /></g>);
    case "star": return svg(<path d="M12 3.5l2.5 5.6 6 .5-4.6 4 1.4 5.9L12 16.4 6.7 19.5l1.4-5.9-4.6-4 6-.5z" fill={color} stroke="none" />);
    case "lock": return svg(<g {...p}><rect x="5" y="11" width="14" height="9" rx="2.2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></g>);
    case "bell": return svg(<g {...p}><path d="M6.5 9a5.5 5.5 0 0 1 11 0c0 5 2 6 2 6H4.5s2-1 2-6" /><path d="M10 20a2 2 0 0 0 4 0" /></g>);
    case "mail": return svg(<g {...p}><rect x="3" y="5" width="18" height="14" rx="2.2" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></g>);
    case "logout": return svg(<g {...p}><path d="M9.5 4.5H5v15h4.5" /><path d="M15 8l4 4-4 4M19 12H9" /></g>);
    case "share": return svg(<g {...p}><path d="M12 15V4M8.5 7.5L12 4l3.5 3.5" /><path d="M6 11v8.5h12V11" /></g>);
    case "settings": return svg(<g {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v2.5M12 19v2.5M4.5 4.5l1.8 1.8M17.7 17.7l1.8 1.8M2.5 12h2.5M19 12h2.5M4.5 19.5l1.8-1.8M17.7 6.3l1.8-1.8" /></g>);
    case "leaf": return svg(<g {...p}><path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14a5 5 0 0 1-1-1z" /><path d="M8 16c3-3 6-4.5 9-5" /></g>);
    case "clock": return svg(<g {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></g>);
    case "route": return svg(<g {...p}><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8 6h6a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8" /></g>);
    case "layers": return svg(<g {...p}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></g>);
    case "instagram": return svg(<g {...p}><rect x="4" y="4" width="16" height="16" rx="4.6" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.6" cy="7.4" r="1" fill={color} stroke="none" /></g>);
    case "facebook": return svg(<path fill={color} stroke="none" d="M13.4 21v-7h2.3l.4-2.9h-2.7V9.2c0-.85.24-1.43 1.46-1.43H16.2V5.16c-.27-.03-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9v2.18H7.8V14h2.32v7z" />);
    case "tiktok": return svg(<path fill={color} stroke="none" d="M14.2 3.5c.3 1.6 1.3 3 3.3 3.3v2.4c-1.1 0-2.2-.34-3.1-.94v5.9c0 2.7-2.1 4.84-4.8 4.84S4.8 16.9 4.8 14.2s2.2-4.84 4.9-4.72v2.45c-1.4-.1-2.55 1-2.55 2.37 0 1.35 1.05 2.44 2.4 2.44 1.36 0 2.45-1.05 2.45-2.5V3.5z" />);
    default: return svg(<circle {...p} cx="12" cy="12" r="8" />);
  }
}

function AppleGlyph({ size = 18, color = "currentColor" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M16.4 12.8c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.5-1.7-1.5-.1-2.9.9-3.6.9-.7 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.7-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.6-3.9zM14 6.3c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.5 2.8-1.3z" /></svg>);
}
function GoogleGlyph({ size = 18 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z" /><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3C3.7 21.4 7.6 24 12 24z" /><path fill="#FBBC05" d="M5.6 14.6a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6z" /><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 7l3.8 3C6.5 6.9 9 4.8 12 4.8z" /></svg>);
}

// ───────────────────────── Primitives ─────────────────────────
function Wordmark({ size = 25 }) {
  return <img src={logoName} alt="Kassepris" style={{ height: size * 1.4, width: "auto", display: "block" }} />;
}

function IconButton({ name, onClick, size = 22, color = "var(--text-primary)", surface = false, badge, ariaLabel }) {
  return (
    <button aria-label={ariaLabel || name} onClick={onClick} style={{
      width: 40, height: 40, borderRadius: "var(--radius-pill)", cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative",
      border: surface ? "1px solid var(--border-default)" : "none",
      background: surface ? "var(--bg-surface)" : "transparent", color,
    }}>
      <Icon name={name} size={size} />
      {badge ? <span style={{ position: "absolute", top: 2, right: 2, minWidth: 16, height: 16, padding: "0 4px", background: "var(--brand-accent)", color: "var(--ink-900)", borderRadius: 999, font: "700 10px/16px var(--font-body)", textAlign: "center" }}>{badge}</span> : null}
    </button>
  );
}

function Avatar({ name = "Du", size = 36, onClick, ring }) {
  const initials = name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "D";
  return (
    <button onClick={onClick} aria-label="Profil" style={{
      width: size, height: size, borderRadius: "var(--radius-pill)", cursor: onClick ? "pointer" : "default",
      background: "var(--green-700)", color: "var(--cream-050)",
      font: `700 ${Math.round(size * 0.38)}px/1 var(--font-body)`, border: ring ? "2px solid var(--brand-accent)" : "none",
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>{initials}</button>
  );
}

function LocationChip({ city, onClick, className }) {
  return (
    <button onClick={onClick} className={className} style={{
      display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer",
      background: "var(--bg-surface)", border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-pill)", padding: "7px 12px 7px 9px", color: "var(--text-primary)",
      font: "var(--text-label-md)",
    }}>
      <Icon name="pin" size={16} color="var(--green-700)" />
      <span className="kp-loc-label">{city}</span>
      <Icon name="down" size={15} color="var(--text-secondary)" />
    </button>
  );
}

function SoonTag({ size = "sm" }) {
  const pad = size === "sm" ? "3px 9px" : "5px 12px";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, background: "var(--brand-accent)",
      color: "var(--ink-900)", borderRadius: "var(--radius-pill)", padding: pad,
      font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase",
    }}>Kommer snart</span>
  );
}

function SaveChip({ children, tone = "save" }) {
  const tones = {
    save: { bg: "color-mix(in srgb, var(--store-coop) 15%, var(--white))", color: "var(--green-800)" },
    best: { bg: "var(--yellow-100)", color: "var(--green-800)" },
  };
  const t = tones[tone];
  return <span style={{ display: "inline-flex", alignItems: "center", background: t.bg, color: t.color, font: "var(--text-label-sm)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>{children}</span>;
}

function DiscountBadge({ children }) {
  return <span style={{ background: "var(--deal-badge-bg)", color: "var(--white)", font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", padding: "3px 8px", borderRadius: "var(--radius-pill)" }}>{children}</span>;
}

function WeekChip() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--yellow-100)", color: "var(--green-800)", padding: "4px 10px", borderRadius: "var(--radius-pill)", font: "var(--text-label-sm)" }}>
      <Icon name="tag" size={13} color="var(--green-700)" /> {WEEK}
    </span>
  );
}

function StepDots({ count, active }) {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 999, background: i === active ? "var(--green-800)" : "var(--ink-150)", transition: "width var(--duration-base) var(--ease-standard)" }} />
      ))}
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, background: "var(--bg-surface-sunken)", padding: 4, borderRadius: "var(--radius-md)" }}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            flex: 1, border: "none", cursor: "pointer", padding: "9px 8px", borderRadius: "var(--radius-sm)",
            font: "var(--text-label-md)", background: on ? "var(--bg-surface)" : "transparent",
            color: on ? "var(--text-primary)" : "var(--text-secondary)",
            boxShadow: on ? "var(--shadow-card)" : "none", transition: "all var(--duration-fast) var(--ease-standard)",
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// ───────────────────────── Image placeholder ─────────────────────────
function ImageTile({ product, height = 108, aspect, radius = "var(--radius-md)", full = false }) {
  const cat = K.catById(product.cat) || {};
  const box = {
    width: "100%", height: full ? "100%" : (aspect ? "auto" : height), aspectRatio: aspect || undefined,
    borderRadius: radius, background: product.img ? "var(--cream-200)" : cat.tint,
    position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  };
  if (product.img) {
    return <div style={box}><img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>;
  }
  return (
    <div style={box}>
      <span style={{ font: "700 clamp(20px, 6vw, 32px)/0.95 var(--font-display)", color: "rgba(32,36,31,0.16)", textTransform: "uppercase", letterSpacing: "0.02em", textAlign: "center", padding: "0 10px", maxWidth: "100%" }}>{product.name}</span>
      <span style={{ position: "absolute", left: 8, bottom: 8, font: "var(--text-mono-sm)", color: "rgba(32,36,31,0.32)" }}>{cat.name}</span>
    </div>
  );
}

// pressable wrapper
function pressHandlers(scale = 0.98) {
  return {
    onMouseDown: (e) => { e.currentTarget.style.transform = `scale(${scale})`; },
    onMouseUp: (e) => { e.currentTarget.style.transform = "scale(1)"; },
    onMouseLeave: (e) => { e.currentTarget.style.transform = "scale(1)"; },
    onTouchStart: (e) => { e.currentTarget.style.transform = `scale(${scale})`; },
    onTouchEnd: (e) => { e.currentTarget.style.transform = "scale(1)"; },
  };
}

// ───────────────────────── Product card (grid) — fixed dimensions ─────────────────────────
function ProductCard({ product, favorites, onOpen }) {
  const favWith = (favorites || []).filter((id) => K.availableStoreIds(product).includes(id));
  const scope = favWith.length ? favWith : K.availableStoreIds(product);
  const best = K.bestVariant(product, scope);
  const outsideFav = (favorites || []).length > 0 && favWith.length === 0;
  const m = best ? metaOf(best.storeId) : STORE_META.ica;
  const store = best ? K.storeById(best.storeId) : null;
  const disc = best && best.variant.discount;
  return (
    <div onClick={() => onOpen(product)} {...pressHandlers()} style={{
      display: "flex", flexDirection: "column", background: "var(--bg-surface)", borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)", overflow: "hidden", cursor: "pointer", height: "100%", minWidth: 0,
      transition: "transform var(--duration-fast) var(--ease-standard)",
    }}>
      <div style={{ position: "relative" }}>
        <ImageTile product={product} aspect="4 / 3" radius="0" />
        <span style={{ position: "absolute", top: 10, left: 10, background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "3px 9px", borderRadius: "var(--radius-pill)" }}>{m.label}</span>
        {disc ? <span style={{ position: "absolute", top: 10, right: 10 }}><DiscountBadge>{disc}</DiscountBadge></span> : null}
      </div>
      <div style={{ padding: 13, display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <div style={{ font: "var(--text-body-md)", fontWeight: 500, color: "var(--ink-900)", lineHeight: 1.25, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "2.5em" }}>{product.name}</div>
        <div style={{ marginTop: "auto", paddingTop: 4, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          <span style={{ font: "var(--text-display-sm)", color: "var(--green-800)" }}>{best ? best.variant.price : "–"}</span>
          <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{best ? best.variant.unit : ""}</span>
          {best && best.variant.ord ? <span style={{ font: "var(--text-body-sm)", color: "var(--ink-300)", textDecoration: "line-through" }}>{best.variant.ord}</span> : null}
        </div>
        <div style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {outsideFav ? "utanför dina butiker" : `${store ? store.short : ""} · ${scope.length} butik${scope.length > 1 ? "er" : ""}`}
        </div>
      </div>
    </div>
  );
}

// compact list row
function ProductRow({ product, favorites, onOpen }) {
  const favWith = (favorites || []).filter((id) => K.availableStoreIds(product).includes(id));
  const scope = favWith.length ? favWith : K.availableStoreIds(product);
  const best = K.bestVariant(product, scope);
  const m = best ? metaOf(best.storeId) : STORE_META.ica;
  return (
    <div onClick={() => onOpen(product)} {...pressHandlers(0.99)} style={{
      display: "flex", alignItems: "center", gap: 12, background: "var(--bg-surface)", borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-card)", padding: 10, cursor: "pointer", minWidth: 0, transition: "transform var(--duration-fast) var(--ease-standard)",
    }}>
      <div style={{ width: 60, height: 60, flexShrink: 0 }}><ImageTile product={product} full radius="var(--radius-sm)" /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "var(--text-body-md)", fontWeight: 500, color: "var(--ink-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{ background: m.bg, color: m.color, font: "var(--text-label-sm)", padding: "2px 8px", borderRadius: "var(--radius-pill)" }}>{m.label}</span>
          <span style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{scope.length} butiker</span>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ font: "var(--text-display-sm)", color: "var(--green-800)" }}>{best ? best.variant.price : "–"}</div>
        <div style={{ font: "var(--text-label-sm)", color: "var(--text-secondary)" }}>{best ? best.variant.unit : ""}</div>
      </div>
    </div>
  );
}

// ───────────────────────── Web header (top nav, right-aligned) ─────────────────────────
const NAV_ITEMS = [
  { key: "home", label: "Hem", icon: "home" },
  { key: "search", label: "Erbjudanden", icon: "tag" },
  { key: "list", label: "Lista", icon: "list" },
];

function HeaderSearch({ onSearch, full }) {
  const [q, setQ] = React.useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch(q); }} style={{
      display: "flex", alignItems: "center", gap: 9, background: "var(--bg-surface-sunken)",
      border: "1px solid var(--border-default)", borderRadius: "var(--radius-pill)",
      padding: full ? "12px 16px" : "9px 15px", width: "100%", minWidth: 0,
    }}>
      <Icon name="search" size={full ? 19 : 17} color="var(--text-secondary)" />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sök vara, t.ex. kaffe" style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", font: full ? "var(--text-body-md)" : "var(--text-body-sm)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }} />
    </form>
  );
}

// rounded-square ("cubic") header icon button
function CubeIcon({ name, label, onClick, active, accent, badge }) {
  const t = accent
    ? { bg: "var(--green-800)", fg: "var(--cream-050)", bd: "none" }
    : active
      ? { bg: "var(--bg-surface-sunken)", fg: "var(--green-800)", bd: "1px solid var(--green-700)" }
      : { bg: "var(--bg-surface)", fg: "var(--text-primary)", bd: "1px solid var(--border-default)" };
  return (
    <button aria-label={label} title={label} onClick={onClick} {...pressHandlers(0.94)} style={{
      position: "relative", width: 42, height: 42, borderRadius: "var(--radius-md)", cursor: "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      background: t.bg, border: t.bd, color: t.fg, boxShadow: "var(--shadow-card)",
      transition: "transform var(--duration-fast) var(--ease-standard)",
      outline: accent && active ? "2px solid var(--green-800)" : "none", outlineOffset: 2,
    }}>
      <Icon name={name} size={21} color={t.fg} sw={active || accent ? 2.2 : 2} />
      {badge ? <span style={{ position: "absolute", top: -5, right: -5, minWidth: 18, height: 18, padding: "0 5px", background: "var(--brand-accent)", color: "var(--ink-900)", borderRadius: 999, font: "700 11px/18px var(--font-body)", textAlign: "center", border: "2px solid var(--bg-surface)" }}>{badge}</span> : null}
    </button>
  );
}

function WebHeader({ active, onNav, onHome, onSearchSubmit, listCount, onProfile }) {
  const icons = (key) => (
    <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <CubeIcon name="tag" label="Erbjudanden" onClick={() => onNav("search")} active={active === "search"} />
      <CubeIcon name="user" label="Profil" onClick={onProfile} active={active === "profile"} />
      <CubeIcon name="list" label="Din lista" onClick={() => onNav("list")} active={active === "list"} accent badge={listCount || null} />
    </div>
  );
  const logo = (size) => (
    <button onClick={onHome} aria-label="Kassepris – till startsidan" style={{ display: "inline-flex", alignItems: "center", border: "none", background: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
      <Wordmark size={size} />
    </button>
  );
  return (
    <header style={{ flexShrink: 0, background: "var(--bg-surface)", borderBottom: "1px solid var(--border-default)", position: "relative", zIndex: 12 }}>
      {/* desktop: logo · search · cubic icons */}
      <div className="kp-hd-row" style={{ maxWidth: MAXW, margin: "0 auto", padding: "0 24px", minHeight: 68, alignItems: "center", gap: 20 }}>
        {logo(25)}
        <div className="kp-hd-search" style={{ flex: 1, maxWidth: 480, margin: "0 auto" }}><HeaderSearch onSearch={onSearchSubmit} /></div>
        {icons("d")}
      </div>

      {/* mobile: logo + icons row, then full-width search */}
      <div className="kp-hd-mobile">
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px 0" }}>
          {logo(23)}
          <div style={{ marginLeft: "auto" }}>{icons("m")}</div>
        </div>
        <div style={{ padding: "11px 14px 12px" }}><HeaderSearch onSearch={onSearchSubmit} full /></div>
      </div>
    </header>
  );
}

// ───────────────────────── Footer (global) ─────────────────────────
function FooterHead({ children }) {
  return <div style={{ font: "var(--text-label-caps)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--brand-accent)", marginBottom: 14 }}>{children}</div>;
}
function Footer({ onNav, onHome, onProfile }) {
  const link = { background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", font: "var(--text-body-sm)", color: "var(--cream-100)", display: "block", marginBottom: 11 };
  const soc = (name, href, aria) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={aria} style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "color-mix(in srgb, var(--cream-050) 12%, transparent)", color: "var(--cream-050)" }}>
      <Icon name={name} size={19} color="var(--cream-050)" />
    </a>
  );
  return (
    <footer style={{ background: "var(--green-900)", color: "var(--cream-050)", flexShrink: 0 }}>
      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "44px 24px 26px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "34px 24px" }}>
          <div style={{ minWidth: 0 }}>
            <Wordmark size={24} color="var(--cream-050)" />
            <p style={{ font: "var(--text-body-sm)", color: "var(--cream-100)", margin: "12px 0 16px", maxWidth: 250, textWrap: "pretty" }}>Veckans bästa matpriser från ICA, Coop och Willys – samlade på ett ställe.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {soc("instagram", "https://instagram.com", "Instagram")}
              {soc("facebook", "https://facebook.com", "Facebook")}
              {soc("tiktok", "https://tiktok.com", "TikTok")}
            </div>
          </div>
          <div>
            <FooterHead>Snabbnavigering</FooterHead>
            <button style={link} onClick={onHome}>Hem</button>
            <button style={link} onClick={() => onNav("search")}>Veckans erbjudanden</button>
            <button style={link} onClick={() => onNav("list")}>Din lista</button>
            <button style={link} onClick={onProfile}>Profil</button>
          </div>
          <div>
            <FooterHead>Kassepris</FooterHead>
            <button style={link}>Om oss</button>
            <button style={link}>Kontakta oss</button>
            <button style={link}>Villkor</button>
            <button style={link}>Integritetspolicy</button>
          </div>
          <div>
            <FooterHead>Vi jämför</FooterHead>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              {["ica", "coop", "willys"].map((c) => (
                <span key={c} style={{ font: "var(--text-label-sm)", color: "var(--cream-050)", background: "color-mix(in srgb, var(--cream-050) 12%, transparent)", padding: "5px 11px", borderRadius: "var(--radius-pill)" }}>{STORE_META[c].label}</span>
              ))}
            </div>
            <p style={{ font: "var(--text-body-sm)", color: "var(--cream-100)", margin: 0 }}>Fler kedjor är på väg.</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid color-mix(in srgb, var(--cream-100) 18%, transparent)", marginTop: 30, paddingTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ font: "var(--text-mono-sm)", color: "color-mix(in srgb, var(--cream-100) 80%, transparent)" }}>© 2026 Kassepris</span>
          <span style={{ font: "var(--text-mono-sm)", color: "color-mix(in srgb, var(--cream-100) 80%, transparent)" }}>Gjord i Sverige · v0.9 beta</span>
        </div>
      </div>
    </footer>
  );
}

// App shell for authed/guest browsing routes: header + scrollable main + footer.
function WebShell({ children, headerProps }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "var(--bg-page)" }}>
      <WebHeader {...headerProps} />
      <main id="kp-main" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "1 0 auto" }}>{children}</div>
        <Footer onNav={headerProps.onNav} onHome={headerProps.onHome} onProfile={headerProps.onProfile} />
      </main>
    </div>
  );
}

function PageContainer({ children, max = MAXW, style }) {
  return <div className="kp-page" style={{ maxWidth: max, margin: "0 auto", width: "100%", boxSizing: "border-box", ...style }}>{children}</div>;
}

function PageHeader({ title, sub, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 22, flexWrap: "wrap" }}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ font: "var(--text-h1)", color: "var(--ink-900)", margin: 0 }}>{title}</h1>
        {sub ? <p style={{ font: "var(--text-body-md)", color: "var(--text-secondary)", margin: "6px 0 0" }}>{sub}</p> : null}
      </div>
      {right ? <div style={{ flexShrink: 0 }}>{right}</div> : null}
    </div>
  );
}

function BackLink({ label = "Tillbaka", onClick }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 5, border: "none", background: "none", cursor: "pointer", color: "var(--text-secondary)", font: "var(--text-label-md)", padding: "4px 0", marginBottom: 14 }}>
      <Icon name="left" size={17} /> {label}
    </button>
  );
}

function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 14px" }}>
      <h2 style={{ font: "var(--text-h3)", color: "var(--text-primary)", margin: 0 }}>{title}</h2>
      {actionLabel ? (
        <button onClick={onAction} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-link)", font: "var(--text-label-md)", display: "inline-flex", alignItems: "center", gap: 2 }}>
          {actionLabel}<Icon name="right" size={16} />
        </button>
      ) : null}
    </div>
  );
}

// Smart shopping list teaser card (repurposed premium feature → coming soon)
function SmartListCard({ onClick, dark = true }) {
  return (
    <button onClick={onClick} {...pressHandlers(0.99)} style={{
      width: "100%", textAlign: "left", cursor: "pointer", border: "none", borderRadius: "var(--radius-lg)",
      background: "var(--green-800)", padding: 20, display: "flex", alignItems: "center", gap: 16,
      transition: "transform var(--duration-fast) var(--ease-standard)",
    }}>
      <span style={{ width: 48, height: 48, flexShrink: 0, borderRadius: "var(--radius-md)", background: "color-mix(in srgb, var(--brand-accent) 22%, transparent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="sparkle" size={25} color="var(--brand-accent)" />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ font: "var(--text-h3)", color: "var(--cream-050)" }}>Smart inköpslista</span>
          <SoonTag />
        </span>
        <span style={{ display: "block", font: "var(--text-body-sm)", color: "var(--cream-100)", marginTop: 4, textWrap: "pretty" }}>Vi delar upp din lista på butikerna där varje vara är billigast — och räknar ut din totala besparing.</span>
      </span>
      <Icon name="right" size={20} color="var(--cream-100)" />
    </button>
  );
}

// ───────────────────────── Bottom sheet (mobile) / used for filters & prompts ─────────────────────────
function Sheet({ open, onClose, title, children, footer, maxWidth = 460 }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(32,36,31,0.42)", opacity: open ? 1 : 0, transition: "opacity var(--duration-base) var(--ease-standard)" }} />
      <div className="kp-sheet-panel" style={{
        position: "absolute", left: "50%", bottom: "auto", top: "50%", transform: open ? "translate(-50%,-50%)" : "translate(-50%,-46%)",
        width: `min(${maxWidth}px, calc(100vw - 32px))`, background: "var(--bg-surface)", borderRadius: "var(--radius-lg)",
        opacity: open ? 1 : 0, transition: "opacity var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)",
        maxHeight: "86vh", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-raised)",
      }}>
        {title ? (
          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-default)" }}>
            <span style={{ font: "var(--text-h3)", color: "var(--text-primary)" }}>{title}</span>
            <IconButton name="x" onClick={onClose} size={20} color="var(--text-secondary)" />
          </div>
        ) : null}
        <div style={{ overflowY: "auto", padding: 20, flex: 1 }}>{children}</div>
        {footer ? <div style={{ padding: 16, borderTop: "1px solid var(--border-default)" }}>{footer}</div> : null}
      </div>
    </div>
  );
}

export {
  WEEK, MAXW, STORE_META, chainOf, metaOf, NAV_ITEMS,
  Icon, AppleGlyph, GoogleGlyph, Wordmark, IconButton, Avatar, LocationChip, SoonTag, SaveChip, DiscountBadge, WeekChip,
  StepDots, Segmented, ImageTile, pressHandlers, ProductCard, ProductRow,
  WebHeader, WebShell, PageContainer, PageHeader, BackLink, SectionHeader, SmartListCard, Sheet, Footer,
};
