import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

let warned = false;

/**
 * Resilient Supabase client getter for public-facing pages ONLY (the admin
 * CMS calls lib/supabase/server.ts directly — a real connection is required
 * for the admin to be useful at all, so it's fine for that to throw).
 *
 * Returns null instead of throwing when Supabase isn't configured yet (no
 * project connected — see SETUP.md) or briefly unreachable, so the public
 * site always builds and renders — falling back to the bundled placeholder
 * content in /data — rather than crashing. Every function in
 * lib/cms/public*.ts goes through this.
 */
export async function getPublicClient(): Promise<SupabaseClient<Database> | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (!warned) {
      warned = true;
      console.warn(
        "[cms] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set — public pages are rendering the bundled placeholder content from /data instead of Supabase. See SETUP.md to connect a real project."
      );
    }
    return null;
  }
  try {
    return await createClient();
  } catch (error) {
    console.error("[cms] Failed to create the Supabase client for a public page:", error);
    return null;
  }
}
