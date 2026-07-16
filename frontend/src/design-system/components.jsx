/* Kassepris design system — core interactive primitives (Button, Input, Switch). */
import React from "react";

const BUTTON_SIZES = {
  sm: { padding: "6px 14px", font: "var(--text-label-md)" },
  md: { padding: "10px 18px", font: "var(--text-label-md)" },
  lg: { padding: "13px 22px", font: "var(--text-h3)" },
};

const BUTTON_VARIANTS = {
  primary: { background: "var(--brand-primary)", color: "var(--text-inverse)", border: "1px solid var(--brand-primary)" },
  accent: { background: "var(--brand-accent)", color: "var(--ink-900)", border: "1px solid var(--brand-accent)" },
  secondary: { background: "var(--bg-surface)", color: "var(--text-primary)", border: "1px solid var(--border-strong)" },
  ghost: { background: "transparent", color: "var(--text-primary)", border: "1px solid transparent" },
};

export function Button({ variant = "primary", size = "md", disabled = false, icon = null, children, onClick, type = "button" }) {
  const style = {
    ...BUTTON_SIZES[size],
    ...BUTTON_VARIANTS[variant],
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-body)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {icon}{children}
    </button>
  );
}

export function Input({ placeholder = "", value, onChange, icon = null, size = "md" }) {
  const pad = size === "lg" ? "13px 16px" : "10px 14px";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--bg-surface)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: pad }}>
      {icon}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", font: "var(--text-body-md)", color: "var(--text-primary)", fontFamily: "var(--font-body)" }}
      />
    </div>
  );
}

export function Switch({ checked = false, onChange, label }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
      <span
        onClick={() => onChange && onChange(!checked)}
        style={{ width: 40, height: 24, borderRadius: "var(--radius-pill)", background: checked ? "var(--brand-primary)" : "var(--ink-150)", position: "relative", transition: "background var(--duration-base) var(--ease-standard)", flexShrink: 0 }}
      >
        <span style={{ position: "absolute", top: 3, left: checked ? 19 : 3, width: 18, height: 18, borderRadius: "50%", background: "var(--white)", boxShadow: "var(--shadow-card)", transition: "left var(--duration-base) var(--ease-standard)" }} />
      </span>
      {label ? <span style={{ font: "var(--text-body-md)" }}>{label}</span> : null}
    </label>
  );
}
