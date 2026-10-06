"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";
import { createClient } from "@/lib/supabase/client";

// Static export has no server to check the session on each request, so the
// guard runs in the browser: signed-out visitors are sent to the login page
// before any CMS UI is shown. This is UX only — every CMS read and write is
// still enforced by Supabase RLS, which rejects anything without a valid
// admin session regardless of what this page renders.
interface AdminSession {
  email: string;
  role: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (active) router.replace(`/admin/login?next=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      const { data: profile } = await supabase.from("profiles").select("email, role").eq("id", user.id).maybeSingle();
      if (active) {
        setSession({ email: profile?.email ?? user.email ?? "", role: profile?.role ?? "editor" });
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  if (session === undefined || session === null) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar email={session.email} role={session.role} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
