"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavLeaf {
  label: string;
  href: string;
}
interface NavGroup {
  label: string;
  items: NavLeaf[];
}

const PAGES: NavLeaf[] = [
  { label: "Home", href: "/admin/pages/home" },
  { label: "About Dr. Islam Moussa", href: "/admin/pages/about" },
  { label: "Services", href: "/admin/pages/services" },
  { label: "Videos", href: "/admin/pages/videos" },
  { label: "Articles", href: "/admin/pages/articles" },
  { label: "Contact Us", href: "/admin/pages/contact" },
];

const CONTENT: NavLeaf[] = [
  { label: "Services", href: "/admin/content/services" },
  { label: "Conditions", href: "/admin/content/conditions" },
  { label: "Certificates", href: "/admin/content/certificates" },
  { label: "Career Journey", href: "/admin/content/career" },
  { label: "Statistics", href: "/admin/content/statistics" },
  { label: "FAQs", href: "/admin/content/faqs" },
  { label: "Videos", href: "/admin/content/videos" },
  { label: "Articles", href: "/admin/content/articles" },
];

const SETTINGS: NavLeaf[] = [
  { label: "Navbar", href: "/admin/settings/navbar" },
  { label: "Footer", href: "/admin/settings/footer" },
  { label: "Final CTA", href: "/admin/settings/cta" },
  { label: "Contact Information", href: "/admin/settings/contact" },
  { label: "Contact Form", href: "/admin/settings/contact-form" },
  { label: "Social Media", href: "/admin/settings/social" },
  { label: "Website Settings", href: "/admin/settings/website" },
];

const SEO: NavLeaf[] = [
  { label: "Global SEO", href: "/admin/seo/global" },
  { label: "Page SEO", href: "/admin/seo/pages" },
];

const GROUPS: NavGroup[] = [
  { label: "Pages", items: PAGES },
  { label: "Content", items: CONTENT },
  { label: "Global Settings", items: SETTINGS },
  { label: "SEO", items: SEO },
];

function NavLink({ item }: { item: NavLeaf }) {
  const pathname = usePathname();
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={cn(
        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-gradient-brand text-white shadow-glass" : "text-brand-muted hover:bg-white/60 hover:text-brand-ink"
      )}
    >
      {item.label}
    </Link>
  );
}

function Group({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-ink-soft"
      >
        {group.label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={cn("h-3.5 w-3.5 transition-transform", open ? "rotate-180" : "")}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && <div className="flex flex-col gap-0.5">{group.items.map((item) => <NavLink key={item.href} item={item} />)}</div>}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="glass-panel hidden w-64 shrink-0 flex-col gap-1 overflow-y-auto rounded-none border-e p-4 lg:flex">
      <Link href="/admin" className="mb-4 block px-3 py-2">
        <span className="text-sm font-extrabold text-brand-ink">Dr. Islam Moussa</span>
        <span className="block text-xs text-brand-muted">CMS Dashboard</span>
      </Link>

      <NavLink item={{ label: "Dashboard", href: "/admin" }} />
      <NavLink item={{ label: "Media Library", href: "/admin/media" }} />

      <div className="my-2 border-t border-brand-line/70" />

      {GROUPS.map((group) => (
        <Group key={group.label} group={group} />
      ))}
    </aside>
  );
}
