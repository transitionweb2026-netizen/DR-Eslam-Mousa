import { createClient } from "@/lib/supabase/server";
import type { MediaRow } from "@/lib/cms/media";

// Joined by hand (two plain `select("*")` queries + an in-memory match)
// rather than PostgREST's `alias:media!fk(*)` embed syntax — that syntax's
// TypeScript support statically parses the select string against each
// table's `Relationships` metadata, which the hand-written types.ts (see
// its header) doesn't populate. A real `supabase gen types` run will, at
// which point the embed form is equally valid; this is simply the safer
// choice without a live schema to verify against.
export async function getAllPagesWithSeo() {
  const supabase = await createClient();
  const [{ data: pages }, { data: seo }, { data: media }] = await Promise.all([
    supabase.from("pages").select("*").order("display_order"),
    supabase.from("page_seo").select("*"),
    supabase.from("media").select("*"),
  ]);

  const mediaById = new Map((media ?? []).map((m) => [m.id, m]));

  return (pages ?? []).map((page) => {
    const seoRow = (seo ?? []).find((s) => s.page_id === page.id) ?? null;
    const og_image_id: MediaRow | null = seoRow?.og_image_id ? (mediaById.get(seoRow.og_image_id) ?? null) : null;
    return { page, seo: seoRow ? { ...seoRow, og_image_id } : null };
  });
}
