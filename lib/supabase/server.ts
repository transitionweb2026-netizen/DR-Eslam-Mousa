import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Server-side Supabase client for Server Components, Server Actions and
 * Route Handlers — reads the visitor's/admin's session from cookies, so
 * RLS sees the real `auth.uid()` (unlike a bare anon-key client). Uses the
 * public anon key; it is NOT the service-role client (see admin.ts).
 *
 * `setAll` is wrapped in try/catch because a Server Component is allowed to
 * call this but not to write cookies — that's fine as long as
 * `middleware.ts` refreshes the session on every request, which it does.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component — no-op; middleware.ts keeps
            // the session cookie fresh instead.
          }
        },
      },
    }
  );
}
