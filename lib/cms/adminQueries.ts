import { createClient } from "@/lib/supabase/server";
import type { MediaRow } from "@/lib/cms/media";

/**
 * Server-side fetchers used by the admin "Content" collection pages. Each
 * selects EVERY row (not just is_active/published — the CMS itself needs
 * to see and edit hidden/draft content) and, for tables with a media
 * foreign key, joins the related `media` row(s) in application code (see
 * lib/cms/adminSeoQueries.ts for why: a hand-written Database type without
 * populated `Relationships` metadata can't use PostgREST's typed embed
 * syntax reliably) so <CollectionManager>'s MediaPicker fields can preview
 * the current image immediately. See lib/cms/media.ts for how a media row
 * becomes a URL.
 */

async function loadMediaMap(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await supabase.from("media").select("*");
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}

function attachMedia<T extends Record<string, unknown>>(
  row: T,
  mediaMap: Map<string, MediaRow>,
  ...fkKeys: (keyof T)[]
): T {
  const next = { ...row };
  for (const key of fkKeys) {
    const id = row[key];
    if (typeof id === "string") {
      (next as Record<string, unknown>)[key as string] = mediaMap.get(id) ?? null;
    }
  }
  return next;
}

export async function getAdminServices() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([
    supabase.from("services").select("*").order("display_order"),
    loadMediaMap(supabase),
  ]);
  return (data ?? []).map((row) => attachMedia(row, mediaMap, "image_id"));
}

export async function getAdminConditions() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([
    supabase.from("conditions").select("*").order("display_order"),
    loadMediaMap(supabase),
  ]);
  return (data ?? []).map((row) => attachMedia(row, mediaMap, "image_id"));
}

export async function getAdminCertificates() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([
    supabase.from("certificates").select("*").order("display_order"),
    loadMediaMap(supabase),
  ]);
  return (data ?? []).map((row) => attachMedia(row, mediaMap, "image_id"));
}

export async function getAdminCareerItems() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([
    supabase.from("career_items").select("*").order("display_order"),
    loadMediaMap(supabase),
  ]);
  return (data ?? []).map((row) => attachMedia(row, mediaMap, "image_id"));
}

export async function getAdminStatistics() {
  const supabase = await createClient();
  const { data } = await supabase.from("statistics").select("*").order("display_order");
  return data ?? [];
}

export async function getAdminFaqs() {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("display_order");
  return data ?? [];
}

export async function getAdminVideos() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([
    supabase.from("videos").select("*").order("display_order"),
    loadMediaMap(supabase),
  ]);
  return (data ?? []).map((row) => attachMedia(row, mediaMap, "cover_media_id", "video_media_id"));
}

export async function getAdminArticles() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([
    supabase.from("articles").select("*").order("display_order"),
    loadMediaMap(supabase),
  ]);
  return (data ?? []).map((row) => attachMedia(row, mediaMap, "image_id"));
}

export async function getAdminNavigationItems() {
  const supabase = await createClient();
  const { data } = await supabase.from("navigation_items").select("*").order("display_order");
  return data ?? [];
}

export async function getAdminSocialLinks() {
  const supabase = await createClient();
  const { data } = await supabase.from("social_links").select("*").order("display_order");
  return data ?? [];
}
