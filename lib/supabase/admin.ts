import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * SERVICE-ROLE client — bypasses Row Level Security entirely.
 *
 * The `server-only` import above makes any accidental import of this file
 * from a Client Component a BUILD ERROR, not just a runtime mistake. Every
 * routine CMS read/write (services, articles, media, settings...) should
 * go through the user's own authenticated session (lib/supabase/server.ts
 * or lib/supabase/client.ts) and the RLS policies in supabase/migrations —
 * NOT this file. It exists only for the small number of operations RLS
 * genuinely cannot express as a user-scoped policy, e.g. an admin-invite
 * Route Handler that needs to call `auth.admin.inviteUserByEmail`.
 *
 * SUPABASE_SERVICE_ROLE_KEY must never be prefixed with NEXT_PUBLIC_ and
 * must never be sent to, or read by, the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "createAdminClient(): NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set."
    );
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
