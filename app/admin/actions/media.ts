"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
}

// Uploading itself happens client-side now (lib/cms/clientMediaUpload.ts,
// straight from the browser to Supabase Storage) — see its header comment
// for why a Server Action was the wrong place for that. These two actions
// stay server-side since neither carries a large file body: alt-text is a
// couple of short strings, and delete only ever sends an id.

export async function updateMediaAltText(id: string, altEn: string, altAr: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("media").update({ alt_text_en: altEn, alt_text_ar: altAr }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: row } = await supabase.from("media").select("bucket_id, storage_path").eq("id", id).single();

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  if (row?.bucket_id && row.storage_path) {
    await supabase.storage.from(row.bucket_id).remove([row.storage_path]);
  }

  revalidatePath("/admin/media");
  return { ok: true };
}
