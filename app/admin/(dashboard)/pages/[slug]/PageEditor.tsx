"use client";

import { useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAdminData } from "@/components/admin/useAdminData";
import { SectionEditor } from "@/components/admin/SectionEditor";

const URL_TO_SLUG: Record<string, string> = {
  home: "",
  about: "about",
  services: "services",
  videos: "videos",
  articles: "articles",
  contact: "contact",
};

async function loadPageEditor(urlSlug: string) {
  const supabase = createClient();
  const { data: page } = await supabase.from("pages").select("*").eq("slug", URL_TO_SLUG[urlSlug]).single();
  if (!page) return null;

  const [{ data: sections }, { data: videos }] = await Promise.all([
    supabase.from("page_sections").select("*").eq("page_id", page.id).order("display_order"),
    supabase.from("videos").select("id, title_en").order("display_order"),
  ]);
  return {
    page,
    sections: sections ?? [],
    videoOptions: (videos ?? []).map((v) => ({ id: v.id, title: v.title_en })),
  };
}

export function PageEditor({ urlSlug }: { urlSlug: string }) {
  const loader = useCallback(() => loadPageEditor(urlSlug), [urlSlug]);
  const data = useAdminData(loader);
  if (data === undefined) return null;
  if (data === null) return <p className="text-sm text-brand-muted">This page could not be found.</p>;

  const { page, sections, videoOptions } = data;
  return (
    <div>
      <h1 className="text-xl font-bold uppercase tracking-wide text-brand-ink">{page.name_en}</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Sections below appear in the exact order they render on the live page. The Final CTA at the bottom of every
        page is edited once, globally, under Global Settings → Final CTA.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {sections.map((section) => (
          <SectionEditor
            key={section.id}
            id={section.id}
            sectionType={section.section_type}
            displayOrder={section.display_order}
            initialContent={(section.content as Record<string, unknown>) ?? {}}
            initialVisible={section.is_visible}
            videoOptions={videoOptions}
          />
        ))}
      </div>
    </div>
  );
}
