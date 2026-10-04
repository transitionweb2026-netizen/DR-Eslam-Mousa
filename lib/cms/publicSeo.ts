import "server-only";
import { cache } from "react";
import { getPublicClient } from "./publicClient";
import { resolveMediaUrl } from "./media";
import { PAGE_SEO_FALLBACK, type PageSeoValues, type PublicPath } from "@/lib/seo";

/**
 * Per-route SEO copy from the CMS (Content → SEO → Pages). Falls back to the
 * bundled copy in lib/seo.ts whenever Supabase is unavailable or the route
 * has no row, so a page always has a real title and description. Deduplicated
 * per request, since both generateMetadata and the page body read it.
 */
export const getPageSeo = cache(async (path: PublicPath): Promise<PageSeoValues> => {
  const fallback: PageSeoValues = {
    ...PAGE_SEO_FALLBACK[path],
    isIndexed: true,
    isFollowed: true,
    ogImageUrl: null,
  };

  const supabase = await getPublicClient();
  if (!supabase) return fallback;

  try {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", path).maybeSingle();
    if (!page) return fallback;

    const { data: row } = await supabase.from("page_seo").select("*").eq("page_id", page.id).maybeSingle();
    if (!row) return fallback;

    let ogImageUrl: string | null = null;
    if (row.og_image_id) {
      const { data: media } = await supabase.from("media").select("*").eq("id", row.og_image_id).maybeSingle();
      ogImageUrl = resolveMediaUrl(media);
    }

    return {
      title: {
        en: row.seo_title_en || fallback.title.en,
        ar: row.seo_title_ar || fallback.title.ar,
      },
      description: {
        en: row.meta_description_en || fallback.description.en,
        ar: row.meta_description_ar || fallback.description.ar,
      },
      isIndexed: row.is_indexed,
      isFollowed: row.is_followed,
      ogImageUrl,
    };
  } catch (error) {
    console.error(`[cms] getPageSeo(${path}) failed:`, error);
    return fallback;
  }
});
