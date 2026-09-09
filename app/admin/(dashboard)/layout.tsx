import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";
import { TopBar } from "@/components/admin/TopBar";

// Defense-in-depth: proxy.ts (lib/supabase/proxy.ts) already redirects
// signed-out visitors before this ever renders, but Next.js's own guidance
// is to never rely on proxy alone for auth — a matcher change elsewhere
// should never be able to silently expose the CMS. This is the same check,
// run again, right where the protected UI is actually composed.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase.from("profiles").select("email, role").eq("id", user.id).maybeSingle();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar email={profile?.email ?? user.email ?? ""} role={profile?.role ?? "editor"} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
