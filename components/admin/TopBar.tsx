import Link from "next/link";
import { signOut } from "@/app/admin/actions/auth";

export function TopBar({ email, role }: { email: string; role: string }) {
  return (
    <header className="glass-panel sticky top-0 z-30 flex items-center justify-between gap-3 rounded-none border-b px-4 py-3 sm:px-6 lg:px-8">
      <Link href="/" target="_blank" className="text-sm font-semibold text-brand-blue hover:underline">
        View live site ↗
      </Link>
      <div className="flex items-center gap-3">
        <div className="text-end">
          <p className="text-sm font-semibold text-brand-ink">{email}</p>
          <p className="text-xs capitalize text-brand-muted">{role}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="glass-panel rounded-full px-4 py-2 text-xs font-semibold text-brand-ink transition-colors hover:text-brand-blue"
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
