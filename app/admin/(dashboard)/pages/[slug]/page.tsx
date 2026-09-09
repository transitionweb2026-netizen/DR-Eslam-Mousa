import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SectionEditor } from "@/components/admin/SectionEditor";

const URL_TO_SLUG: Record<string, string> = {
  home: "",
  about: "about",
  services: "services",
  videos: "videos",
  articles: "articles",
  contact: "contact",
};

export default async function AdminPageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: urlSlug } = await params;
  if (!(urlSlug in URL_TO_SLUG)) notFound();
  const dbSlug = URL_TO_SLUG[urlSlug];

  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("*").eq("slug", dbSlug).single();
  if (!page) notFound();

  const { data: sections } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", page.id)
    .order("display_order");

  return (
    <div>
      <h1 className="text-xl font-bold uppercase tracking-wide text-brand-ink">{page.name_en}</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Sections below appear in the exact order they render on the live page. The Final CTA at the bottom of every
        page is edited once, globally, under Global Settings → Final CTA.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {(sections ?? []).map((section) => (
          <SectionEditor
            key={section.id}
            id={section.id}
            sectionType={section.section_type}
            displayOrder={section.display_order}
            initialContent={(section.content as Record<string, unknown>) ?? {}}
            initialVisible={section.is_visible}
          />
        ))}
      </div>
    </div>
  );
}
