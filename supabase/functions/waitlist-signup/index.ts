import "@supabase/functions-js/edge-runtime.d.ts";
import * as React from "react";
import { render } from "@react-email/render";
import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "../_shared/cors.ts";
import { WaitlistVerificationEmail } from "./email-template.tsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_COOLDOWN_MS = 60_000;

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "Kassepris <hej@updates.kassepris.se>";
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") ?? "https://kassepris.se";
const FUNCTIONS_URL = Deno.env.get("SUPABASE_URL")!.replace(".supabase.co", ".supabase.co/functions/v1");

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `${FUNCTIONS_URL}/waitlist-verify?token=${token}`;
  const html = await render(React.createElement(WaitlistVerificationEmail, { verifyLink }));

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: email,
      subject: "Bekräfta din plats på väntelistan",
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "method not allowed" }, 405);
  }

  let email: string | undefined;
  try {
    ({ email } = await req.json());
  } catch {
    return json({ error: "invalid request body" }, 400);
  }

  email = email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "invalid email" }, 400);
  }

  const { data: existing, error: selectError } = await supabase
    .from("waitlist")
    .select("verified, created_at")
    .eq("email", email)
    .maybeSingle();

  if (selectError) {
    console.error(selectError);
    return json({ error: "internal error" }, 500);
  }

  if (existing?.verified) {
    return json({ status: "already_verified" });
  }

  if (existing && Date.now() - new Date(existing.created_at).getTime() < RESEND_COOLDOWN_MS) {
    // Recently sent — don't spam the inbox, but tell the client the same thing
    // as a fresh signup so we don't reveal timing info either way.
    return json({ status: "pending" });
  }

  const token = crypto.randomUUID();

  const { error: writeError } = existing
    ? await supabase.from("waitlist").update({ verification_token: token }).eq("email", email)
    : await supabase.from("waitlist").insert({ email, verification_token: token, verified: false });

  if (writeError) {
    console.error(writeError);
    return json({ error: "internal error" }, 500);
  }

  try {
    await sendVerificationEmail(email, token);
  } catch (err) {
    console.error(err);
    return json({ error: "could not send verification email" }, 502);
  }

  return json({ status: "pending" });
});
