import { createClient } from "@/lib/supabase/server";
import type { MediaRow } from "@/lib/cms/media";

// See adminQueries.ts's header comment for why media is joined by hand
// here instead of via PostgREST's typed embed syntax.
async function getMedia(supabase: Awaited<ReturnType<typeof createClient>>, id: string | null): Promise<MediaRow | null> {
  if (!id) return null;
  const { data } = await supabase.from("media").select("*").eq("id", id).maybeSingle();
  return data ?? null;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data: site } = await supabase.from("site_settings").select("*").eq("id", true).single();
  if (!site) return null;
  const [logo, favicon, ogImage] = await Promise.all([
    getMedia(supabase, site.logo_media_id),
    getMedia(supabase, site.favicon_media_id),
    getMedia(supabase, site.default_og_image_id),
  ]);
  return { ...site, logo_media_id: logo, favicon_media_id: favicon, default_og_image_id: ogImage };
}

export async function getNavbarSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("navbar_settings").select("*").eq("id", true).single();
  return data;
}

export async function getFooterSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("footer_settings").select("*").eq("id", true).single();
  return data;
}

export async function getCtaSettings() {
  const supabase = await createClient();
  const { data: cta } = await supabase.from("cta_settings").select("*").eq("id", true).single();
  if (!cta) return null;
  const background = await getMedia(supabase, cta.background_image_id);
  return { ...cta, background_image_id: background };
}

export async function getContactSettings() {
  const supabase = await createClient();
  const { data: contact } = await supabase.from("contact_settings").select("*").eq("id", true).single();
  if (!contact) return null;
  const location = await getMedia(supabase, contact.location_image_id);
  return { ...contact, location_image_id: location };
}

export async function getContactFormSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_form_settings").select("*").eq("id", true).single();
  return data;
}
