/* Kassepris — dedicated post-verification page, reached after a user clicks
   the confirmation link in their waitlist email (see supabase/functions/waitlist-verify),
   or resubmits an already-verified address on the homepage. */
import React, { useState } from "react";
import { Icon } from "./Icon.jsx";
import { Wordmark } from "./Wordmark.jsx";
import { WaitlistForm } from "./WaitlistForm.jsx";

const SHARE_URL = "https://kassepris.se";
const SHARE_TEXT = "Jag gick precis med i väntelistan för Kassepris, jämför veckans bästa matpriser från ICA, Coop och Willys på ett ställe.";

const SOCIAL_LINKS = [
  ["instagram", "https://www.instagram.com/kassepris/", "Instagram"],
  ["facebook", "https://www.facebook.com/people/Kassepris/61591959780845/", "Facebook"],
  ["tiktok", "https://www.tiktok.com/@kassepris", "TikTok"],
  ["linkedin", "https://www.linkedin.com/company/kassepris/", "LinkedIn"],
];

function ShareSection() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Kassepris", text: SHARE_TEXT, url: SHARE_URL });
      } catch {
        // user cancelled — no-op
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <p style={{ font: "var(--text-label-md)", color: "var(--text-secondary)", margin: 0 }}>Dela med en vän</p>
      <button
        type="button"
        onClick={handleShare}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--bg-surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)",
          padding: "10px 18px",
          font: "var(--text-label-md)",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
      >
        <Icon name={copied ? "check" : "gift"} size={17} color="var(--green-800)" />
        {copied ? "Länk kopierad!" : "Kopiera länk / dela"}
      </button>
      <div style={{ display: "flex", gap: 10 }}>
        {SOCIAL_LINKS.map(([name, href, aria]) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={aria}
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-md)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-strong)",
              color: "var(--green-800)",
            }}
          >
            <Icon name={name} size={19} color="var(--green-800)" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function WelcomePage({ status }) {
  const isConfirmed = status === "verified" || status === "already_verified";

  return (
    <div style={{ minHeight: "100%", background: "var(--bg-page)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 8, background: "color-mix(in srgb, var(--bg-page) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-default)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center" }}>
          <a href="#/" aria-label="Till startsidan" style={{ display: "inline-flex", alignItems: "center", height: "100%" }}><Wordmark size={32} /></a>
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "64px 24px 80px", display: "flex", flexDirection: "column", alignItems: "center", gap: 32, textAlign: "center" }}>
        {isConfirmed ? (
          <>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--green-800)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="check" size={34} color="var(--cream-050)" />
            </div>

            <div>
              <h1 style={{ font: "800 clamp(28px, 4vw, 36px)/1.15 var(--font-body)", color: "var(--ink-900)", margin: "0 0 12px" }}>
                {status === "verified" ? "Välkommen till Kassepris!" : "Du står redan på listan!"}
              </h1>
              <p style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>
                Din plats på väntelistan är säkrad. Vi hör av oss så snart Kassepris är redo, och som en
                av de första 100 kan du få <strong>1 månad Kassepris Pro gratis</strong> vid lansering.
              </p>
            </div>

            <ShareSection />
          </>
        ) : (
          <>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "color-mix(in srgb, var(--red-700, #b91c1c) 12%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="mail" size={32} color="var(--red-700, #b91c1c)" />
            </div>

            <div>
              <h1 style={{ font: "800 clamp(28px, 4vw, 36px)/1.15 var(--font-body)", color: "var(--ink-900)", margin: "0 0 12px" }}>
                Länken är inte längre giltig
              </h1>
              <p style={{ font: "var(--text-body-lg)", color: "var(--text-secondary)", margin: 0, textWrap: "pretty" }}>
                Ange din e-postadress igen nedan så skickar vi en ny bekräftelselänk.
              </p>
            </div>

            <WaitlistForm size="md" showTerms={false} />
          </>
        )}

        <a href="#/" style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--text-label-md)", color: "var(--text-secondary)" }}>
          <Icon name="arrow" size={16} color="var(--text-secondary)" style={{ transform: "rotate(180deg)" }} /> Till startsidan
        </a>
      </div>
    </div>
  );
}
