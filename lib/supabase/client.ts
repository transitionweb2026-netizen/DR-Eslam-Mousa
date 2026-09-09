"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Browser Supabase client — uses the public anon key, so every read it
 * performs is subject to the RLS policies in supabase/migrations. Safe to
 * import from any Client Component (the CMS admin UI's interactive pieces).
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
