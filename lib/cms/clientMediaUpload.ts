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
 * Uploads a file straight to Supabase Storage's REST endpoint via
 * XMLHttpRequest — not the Supabase SDK's own `.storage.from().upload()`,
 * which is built on `fetch()` and (as of the installed @supabase/storage-js
 * version) has no upload-progress event at all. `xhr.upload.onprogress`
 * does, so a large video actually shows a percentage instead of an
 * indefinite spinner. The request is built to match storage-js's own POST
 * wire format exactly (form fields, headers) — see
 * node_modules/@supabase/storage-js/src/packages/StorageFileApi.ts's
 * `uploadOrUpdate` for the reference this mirrors.
 */
function uploadWithProgress(
  url: string,
  file: File,
  headers: Record<string, string>,
  onProgress?: (fraction: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    for (const [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }
      let message = `Upload failed (status ${xhr.status}).`;
      try {
        const body = JSON.parse(xhr.responseText) as { message?: string; error?: string };
        message = body.message ?? body.error ?? message;
      } catch {
        // response wasn't JSON — keep the generic message
      }
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error("Network error during upload — check your connection and try again."));
    xhr.onabort = () => reject(new Error("Upload cancelled."));

    const body = new FormData();
    body.append("cacheControl", "3600");
    body.append("", file);
    xhr.send(body);
  });
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
    onProgress?: (fraction: number) => void;
  }
): Promise<ClientUploadResult> {
  const { file, bucket, category, altEn, altAr, onProgress } = options;

  if (!file || file.size === 0) return { ok: false, error: "No file selected." };

  const limits = BUCKET_LIMITS[bucket];
  if (!limits.mimeTypes.includes(file.type)) {
    return { ok: false, error: `${file.type || "This file type"} isn't allowed in the "${bucket}" bucket.` };
  }
  if (file.size > limits.maxBytes) {
    return { ok: false, error: `File is too large (max ${(limits.maxBytes / 1024 / 1024).toFixed(0)}MB).` };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: "Your session has expired — please sign in again." };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return { ok: false, error: "Supabase isn't configured (missing env vars)." };

  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${category}/${crypto.randomUUID()}.${ext}`;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${path}`;

  try {
    await uploadWithProgress(
      uploadUrl,
      file,
      {
        apikey: anonKey,
        Authorization: `Bearer ${session.access_token}`,
        "x-upsert": "false",
      },
      onProgress
    );
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed." };
  }

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
      uploaded_by: session.user.id,
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
