/* Kassepris — waitlist email capture.
   UI only for now: no submission endpoint wired up yet (decide on
   Formspree/Mailchimp/custom backend before launch). */
import React, { useState } from "react";
import { Button, Input } from "./design-system/components.jsx";
import { Icon } from "./Icon.jsx";

export function WaitlistForm({ size = "lg", showTerms = true }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to a real waitlist endpoint (Formspree/Mailchimp/custom backend).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "var(--text-body-md)", color: "var(--green-800)" }}>
        <Icon name="check" size={20} color="var(--green-800)" /> Tack! Du står på listan.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        <div style={{ minWidth: 240 }}>
          <Input
            size={size}
            type="email"
            placeholder="Din e-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Icon name="mail" size={18} color="var(--text-secondary)" />}
          />
        </div>
        <Button type="submit" variant="accent" size={size}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>Gå med i väntelistan <Icon name="arrow" size={18} /></span>
        </Button>
      </form>
      {showTerms ? (
        <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: 0, textAlign: "center" }}>
          Genom att gå med godkänner du vår <a href="#/integritetspolicy" style={{ color: "var(--text-link)" }}>integritetspolicy</a>.
        </p>
      ) : null}
    </div>
  );
}
