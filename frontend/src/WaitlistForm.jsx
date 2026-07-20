/* Kassepris — waitlist email capture with double opt-in.
   Submits to a Supabase Edge Function which stores the signup unverified,
   emails a confirmation link via Resend, and only flips verified=true once
   the user clicks it (see supabase/functions/waitlist-signup + waitlist-verify). */
import React, { useEffect, useState } from "react";
import { Button, Input } from "./design-system/components.jsx";
import { Icon } from "./Icon.jsx";

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const RESEND_COOLDOWN_SECONDS = 30;

function statusFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("waitlist");
  if (!status) return null;

  // Strip the param so refreshing/sharing the URL doesn't re-show the banner.
  params.delete("waitlist");
  const query = params.toString();
  const cleanUrl = window.location.pathname + (query ? `?${query}` : "") + window.location.hash;
  window.history.replaceState({}, "", cleanUrl);

  return status;
}

export function WaitlistForm({ size = "lg", showTerms = true }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | submitting | pending | error
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [verifiedStatus, setVerifiedStatus] = useState(null);

  useEffect(() => {
    const status = statusFromUrl();
    if (status) setVerifiedStatus(status);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || state === "submitting") return;

    setState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${FUNCTIONS_URL}/waitlist-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setErrorMessage("Något gick fel. Försök igen om en liten stund.");
        return;
      }

      setState("pending");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      setState("error");
      setErrorMessage("Kunde inte nå servern. Kontrollera din anslutning och försök igen.");
    }
  }

  if (verifiedStatus === "verified" || verifiedStatus === "already_verified") {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "var(--text-body-md)", color: "var(--green-800)" }}>
        <Icon name="check" size={20} color="var(--green-800)" /> Du är bekräftad och står nu på listan!
      </div>
    );
  }

  if (state === "pending") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%", maxWidth: 420 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "var(--text-body-md)", color: "var(--green-800)", textAlign: "center" }}>
          <Icon name="mail" size={20} color="var(--green-800)" /> Kolla din inkorg för att bekräfta din plats.
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={cooldown > 0}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            font: "var(--text-body-sm)",
            color: cooldown > 0 ? "var(--text-secondary)" : "var(--text-link)",
            cursor: cooldown > 0 ? "default" : "pointer",
          }}
        >
          {cooldown > 0 ? `Skicka igen (${cooldown}s)` : "Fick du inget mejl? Skicka igen"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", maxWidth: 420 }}>
      {verifiedStatus === "invalid" ? (
        <p style={{ font: "var(--text-body-sm)", color: "var(--red-700, #b91c1c)", margin: 0, textAlign: "center" }}>
          Länken är inte längre giltig. Ange din e-post igen nedan.
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="kp-waitlist-form">
        <Input
          size={size}
          type="email"
          placeholder="Din e-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Icon name="mail" size={18} color="var(--text-secondary)" />}
        />
        <Button type="submit" variant="accent" size={size} disabled={state === "submitting"}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
            {state === "submitting" ? "Skickar..." : "Gå med i väntelistan"} <Icon name="arrow" size={18} />
          </span>
        </Button>
      </form>
      {state === "error" ? (
        <p style={{ font: "var(--text-body-sm)", color: "var(--red-700, #b91c1c)", margin: 0, textAlign: "center" }}>
          {errorMessage}
        </p>
      ) : null}
      {showTerms ? (
        <p style={{ font: "var(--text-body-sm)", color: "var(--text-secondary)", margin: 0, textAlign: "center" }}>
          Genom att gå med godkänner du vår <a href="#/integritetspolicy" style={{ color: "var(--text-link)" }}>integritetspolicy</a>.
        </p>
      ) : null}
    </div>
  );
}
