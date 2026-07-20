import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

const FRONTEND_URL = Deno.env.get("FRONTEND_URL") ?? "https://kassepris.se";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function redirect(status: "verified" | "invalid" | "already_verified") {
  return Response.redirect(`${FRONTEND_URL}/?waitlist=${status}`, 302);
}

Deno.serve(async (req) => {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return redirect("invalid");

  const { data, error } = await supabase
    .from("waitlist")
    .select("id, verified")
    .eq("verification_token", token)
    .maybeSingle();

  if (error) {
    console.error(error);
    return redirect("invalid");
  }

  if (!data) return redirect("invalid");
  if (data.verified) return redirect("already_verified");

  const { error: updateError } = await supabase
    .from("waitlist")
    .update({ verified: true })
    .eq("id", data.id);

  if (updateError) {
    console.error(updateError);
    return redirect("invalid");
  }

  return redirect("verified");
});
