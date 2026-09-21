import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import type { MediaRow } from "@/lib/cms/media";
import { BUCKET_LIMITS, type MediaBucket } from "@/lib/cms/mediaLimits";

export interface ClientUploadResult {
  ok: boolean;
  error?: string;
  data?: MediaRow;
}

/**
 * Uploads a file straight from the browser to Supabase Storage and creates
 * its `media` row — no Next.js server involved for the file bytes.
 *
 * This replaced routing uploads through a Server Action. A Server Action
 * buffers the entire request body before your code runs; Next caps that at
 * 1MB by default (raised in next.config.ts, but hosting platforms often
 * enforce their own, stricter request-size cap that next.config.ts can't
 * override), and a slow/large upload failing there THREW instead of
 * cleanly returning an error — the callers' `await` never resolved, and
 * `setUploading(false)` never ran, leaving the UI stuck on "Uploading…"
 * forever with no visible error. Storage's own RLS policies
 * (0011_storage.sql) already let any signed-in admin/editor write here
 * directly, so this is both more robust and simply faster (one hop instead
 * of two).
 */
export async function uploadMediaFromBrowser(
  supabase: SupabaseClient<Database>,
  options: {
    file: File;
    bucket: MediaBucket;
    category: MediaRow["category"];
    altEn?: string;
    altAr?: string;
  }
): Promise<ClientUploadResult> {
  const { file, bucket, category, altEn, altAr } = options;

  if (!file || file.size === 0) return { ok: false, error: "No file selected." };

  const limits = BUCKET_LIMITS[bucket];
  if (!limits.mimeTypes.includes(file.type)) {
    return { ok: false, error: `${file.type || "This file type"} isn't allowed in the "${bucket}" bucket.` };
  }
  if (file.size > limits.maxBytes) {
    return { ok: false, error: `File is too large (max ${(limits.maxBytes / 1024 / 1024).toFixed(0)}MB).` };
  }

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
    .select("*")
    .single();

  if (insertError || !data) {
    // Roll back the orphaned Storage object so a failed insert never
    // leaves an unreferenced file behind.
    await supabase.storage.from(bucket).remove([path]);
    return { ok: false, error: insertError?.message ?? "Could not save the uploaded file's record." };
  }

  return { ok: true, data };
}
