import { createClient } from "@/lib/supabase/client";

export interface AuthActionState {
  error: string | null;
  /** Where to go after a successful sign-in; the form navigates there. */
  redirectTo?: string;
}

export async function signIn(_prevState: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Enter both your email and password." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Incorrect email or password." };
  }

  return { error: null, redirectTo: next.startsWith("/admin") ? next : "/admin" };
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}
