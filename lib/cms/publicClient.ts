import "server-only";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

let warned = false;

// CI builds set CMS_STRICT_BUILD=1: a Supabase failure there must stop the
// deploy rather than silently publish the bundled placeholder content. Build
// workers are separate processes, so failures are recorded in a marker file
// that the deploy workflow checks once the build finishes.
const STRICT_BUILD = process.env.CMS_STRICT_BUILD === "1";
const FAILURE_MARKER = join(process.cwd(), ".next", "cms-build-failed");

function recordStrictFailure(reason: string) {
  console.error(`[cms] STRICT BUILD FAILURE: ${reason}`);
  try {
    mkdirSync(join(process.cwd(), ".next"), { recursive: true });
    writeFileSync(FAILURE_MARKER, `${reason}\n`, { flag: "a" });
  } catch {
    // The console error above still fails loudly in the build log.
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retries transient failures; anything still failing after that is recorded. */
async function strictFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(input, init);
      const failed = response.status >= 500 || response.status === 401 || response.status === 403;
      if (!failed) return response;
      if (attempt === 3) {
        recordStrictFailure(`Supabase responded ${response.status} for ${String(input)}`);
        return response;
      }
    } catch (error) {
      lastError = error;
    }
    await sleep(500 * attempt);
  }
  recordStrictFailure(`Supabase request failed for ${String(input)}: ${String(lastError)}`);
  throw lastError;
}

/**
 * Resilient Supabase client getter for public-facing pages ONLY. Public pages
 * are pre-rendered at build time (static export), so this uses the anon key
 * with no cookies or session — every read is limited to the rows the RLS
 * "Public can read active …" policies already expose.
 *
 * Returns null instead of throwing when Supabase isn't configured yet (no
 * project connected — see SETUP.md) or briefly unreachable, so the public
 * site always builds and renders — falling back to the bundled placeholder
 * content in /data — rather than crashing. Every function in
 * lib/cms/public*.ts goes through this.
 */
export async function getPublicClient(): Promise<SupabaseClient<Database> | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    if (STRICT_BUILD) recordStrictFailure("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set");
    if (!warned) {
      warned = true;
      console.warn(
        "[cms] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set — public pages are rendering the bundled placeholder content from /data instead of Supabase. See SETUP.md to connect a real project."
      );
    }
    return null;
  }
  try {
    return createClient<Database>(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: STRICT_BUILD ? { fetch: strictFetch } : undefined,
    });
  } catch (error) {
    if (STRICT_BUILD) recordStrictFailure(`could not create the Supabase client: ${String(error)}`);
    console.error("[cms] Failed to create the Supabase client for a public page:", error);
    return null;
  }
}
