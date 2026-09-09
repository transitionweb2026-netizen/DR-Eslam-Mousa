import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const PAGE_LINKS = [
  { label: "Home", href: "/admin/pages/home" },
  { label: "About Dr. Islam Moussa", href: "/admin/pages/about" },
  { label: "Services", href: "/admin/pages/services" },
  { label: "Videos", href: "/admin/pages/videos" },
  { label: "Articles", href: "/admin/pages/articles" },
  { label: "Contact Us", href: "/admin/pages/contact" },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [services, conditions, videos, articles, faqs, media] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("conditions").select("id", { count: "exact", head: true }),
    supabase.from("videos").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("faqs").select("id", { count: "exact", head: true }),
    supabase.from("media").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Services", value: services.count ?? 0, href: "/admin/content/services" },
    { label: "Conditions", value: conditions.count ?? 0, href: "/admin/content/conditions" },
    { label: "Videos", value: videos.count ?? 0, href: "/admin/content/videos" },
    { label: "Articles", value: articles.count ?? 0, href: "/admin/content/articles" },
    { label: "FAQs", value: faqs.count ?? 0, href: "/admin/content/faqs" },
    { label: "Media Files", value: media.count ?? 0, href: "/admin/media" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Everything here mirrors the live site. Start with <strong>Pages</strong> to edit a specific section, or jump
        straight to a collection below.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="glass-card glass-card-hover rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-brand-ink">{s.value}</p>
            <p className="mt-1 text-xs font-medium text-brand-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-brand-ink-soft">Pages</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGE_LINKS.map((p) => (
          <Link key={p.href} href={p.href} className="glass-panel flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-brand-ink hover:text-brand-blue">
            {p.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
