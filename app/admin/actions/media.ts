import { createClient } from "@/lib/supabase/client";

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
}

// Uploading happens in lib/cms/clientMediaUpload.ts (browser straight to
// Supabase Storage). These run in the browser too, as the signed-in admin,
// so RLS on media and storage.objects decides what they may change.

export async function updateMediaAltText(id: string, altEn: string, altAr: string): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase.from("media").update({ alt_text_en: altEn, alt_text_ar: altAr }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  const supabase = createClient();
  const { data: row } = await supabase.from("media").select("bucket_id, storage_path").eq("id", id).single();

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  if (row?.bucket_id && row.storage_path) {
    await supabase.storage.from(row.bucket_id).remove([row.storage_path]);
  }

  return { ok: true };
}
