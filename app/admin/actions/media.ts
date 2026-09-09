"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type MediaCategory = Database["public"]["Tables"]["media"]["Row"]["category"];
type MediaBucket = NonNullable<Database["public"]["Tables"]["media"]["Row"]["bucket_id"]>;

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
}

const BUCKET_LIMITS: Record<MediaBucket, { maxBytes: number; mimeTypes: string[] }> = {
  media: { maxBytes: 10 * 1024 * 1024, mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"] },
  "video-covers": { maxBytes: 5 * 1024 * 1024, mimeTypes: ["image/png", "image/jpeg", "image/webp"] },
  videos: { maxBytes: 500 * 1024 * 1024, mimeTypes: ["video/mp4", "video/webm", "video/quicktime"] },
};

/**
 * Uploads a file to the appropriate Supabase Storage bucket and creates its
 * `media` row in one step. Bucket/category choose each other — a "videos"
 * upload is always category "videos", etc. — so the caller only picks a
 * bucket. MIME type and size are validated against the bucket's own limits
 * (see supabase/migrations/0011_storage.sql for the matching bucket
 * config) before anything is sent to Storage.
 */
export async function uploadMedia(formData: FormData): Promise<ActionResult> {
  const file = formData.get("file");
  const bucket = String(formData.get("bucket") ?? "") as MediaBucket;
  const category = String(formData.get("category") ?? "general") as MediaCategory;
  const altEn = String(formData.get("altEn") ?? "");
  const altAr = String(formData.get("altAr") ?? "");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file selected." };
  }
  const limits = BUCKET_LIMITS[bucket];
  if (!limits) return { ok: false, error: "Unknown storage bucket." };
  if (!limits.mimeTypes.includes(file.type)) {
    return { ok: false, error: `${file.type || "This file type"} isn't allowed in the "${bucket}" bucket.` };
  }
  if (file.size > limits.maxBytes) {
    return { ok: false, error: `File is too large (max ${(limits.maxBytes / 1024 / 1024).toFixed(0)}MB).` };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${category}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return { ok: false, error: uploadError.message };

  const { data, error: insertError } = await supabase
    .from("media")
    .insert({
      bucket_id: bucket,
      storage_path: path,
      file_name: file.name,
      mime_type: file.type,
      file_size: file.size,
      kind: bucket === "videos" ? "video" : "image",
      category,
      alt_text_en: altEn || null,
      alt_text_ar: altAr || null,
      uploaded_by: user?.id ?? null,
    })
    .select("id")
    .single();

  if (insertError) {
    await supabase.storage.from(bucket).remove([path]);
    return { ok: false, error: insertError.message };
  }

  revalidatePath("/admin/media");
  return { ok: true, id: data.id };
}

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
