import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign In | CMS", robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-card-strong w-full max-w-sm rounded-3xl p-8">
        <div className="text-center">
          <span className="bg-gradient-brand mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-glass">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
          <h1 className="mt-4 text-xl font-bold text-brand-ink">Dr. Islam Moussa CMS</h1>
          <p className="mt-1 text-sm text-brand-muted">Sign in to manage the website.</p>
        </div>

        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
