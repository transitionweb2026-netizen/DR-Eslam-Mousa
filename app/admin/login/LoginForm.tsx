"use client";

import { useActionState } from "react";
import { signIn, type AuthActionState } from "@/app/admin/actions/auth";

const initialState: AuthActionState = { error: null };

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          dir="ltr"
          className="glass-panel w-full rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-brand-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          dir="ltr"
          className="glass-panel w-full rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-[#c8452f]">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-gradient-brand mt-1 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
