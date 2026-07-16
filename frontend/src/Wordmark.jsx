/* Kassepris — brand logo: icon tile (on-light/on-dark) + wordmark. */
import React from "react";
import iconOnLight from "./assets/brand/icon-512-on-light.png";
import iconOnDark from "./assets/brand/icon-512-on-dark.png";

export function Wordmark({ size = 25, mode = "light" }) {
  const gap = Math.round(size * 0.28);
  const wordSize = Math.round(size * 0.62);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <img src={mode === "dark" ? iconOnDark : iconOnLight} alt="" width={size} height={size} style={{ display: "block", flexShrink: 0 }} />
      <span style={{ font: `800 ${wordSize}px/1 var(--font-display)`, color: mode === "dark" ? "var(--cream-050)" : "var(--green-800)", letterSpacing: "0.01em" }}>Kassepris</span>
    </span>
  );
}
