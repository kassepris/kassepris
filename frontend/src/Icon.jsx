/* Kassepris — minimal icon set for the waitlist landing page. */
import React from "react";

export function Icon({ name, size = 20, color = "currentColor", sw = 2 }) {
  const p = { fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const svg = (children) => (<svg width={size} height={size} viewBox="0 0 24 24">{children}</svg>);
  switch (name) {
    case "tag": return svg(<g {...p}><path d="M3 3h8l10 10-8 8L3 11z" /><circle cx="7.5" cy="7.5" r="1.5" /></g>);
    case "arrow": return svg(<path {...p} d="M5 12h14M13 6l6 6-6 6" />);
    case "sparkle": return svg(<g><path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4z" fill={color} stroke="none" /><path d="M18.5 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" fill={color} stroke="none" /></g>);
    case "layers": return svg(<g {...p}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></g>);
    case "route": return svg(<g {...p}><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8 6h6a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8" /></g>);
    case "mail": return svg(<g {...p}><rect x="3" y="5" width="18" height="14" rx="2.2" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></g>);
    case "check": return svg(<path {...p} d="M5 12.5l4.5 4.5L19 7" />);
    case "instagram": return svg(<g {...p}><rect x="4" y="4" width="16" height="16" rx="4.6" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.6" cy="7.4" r="1" fill={color} stroke="none" /></g>);
    case "facebook": return svg(<path fill={color} stroke="none" d="M13.4 21v-7h2.3l.4-2.9h-2.7V9.2c0-.85.24-1.43 1.46-1.43H16.2V5.16c-.27-.03-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9v2.18H7.8V14h2.32v7z" />);
    case "tiktok": return svg(<path fill={color} stroke="none" d="M14.2 3.5c.3 1.6 1.3 3 3.3 3.3v2.4c-1.1 0-2.2-.34-3.1-.94v5.9c0 2.7-2.1 4.84-4.8 4.84S4.8 16.9 4.8 14.2s2.2-4.84 4.9-4.72v2.45c-1.4-.1-2.55 1-2.55 2.37 0 1.35 1.05 2.44 2.4 2.44 1.36 0 2.45-1.05 2.45-2.5V3.5z" />);
    default: return svg(<circle {...p} cx="12" cy="12" r="8" />);
  }
}
