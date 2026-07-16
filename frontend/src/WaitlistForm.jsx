/* Kassepris — waitlist email capture.
   UI only for now: no submission endpoint wired up yet (decide on
   Formspree/Mailchimp/custom backend before launch). */
import React, { useState } from "react";
import { Button, Input } from "./design-system/components.jsx";
import { Icon } from "./Icon.jsx";

export function WaitlistForm({ size = "lg" }) {
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
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ minWidth: 240 }}>
        <Input
          size={size}
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
  );
}
