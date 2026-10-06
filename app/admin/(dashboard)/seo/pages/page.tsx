"use client";

import { getAllPagesWithSeo } from "@/lib/cms/adminSeoQueries";
import { useAdminData } from "@/components/admin/useAdminData";
import { PageSeoManager } from "@/components/admin/PageSeoManager";

export default function AdminPageSeoPage() {
  const entries = useAdminData(getAllPagesWithSeo);
  if (entries === undefined) return null;
  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Page SEO</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Independent SEO for each of the 6 pages. Service, Condition and Article SEO live inside each item&apos;s own
        editor under Content.
      </p>
      <div className="mt-6">
        <PageSeoManager entries={entries} />
      </div>
    </div>
  );
}
