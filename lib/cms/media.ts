import type { Tables } from "@/lib/supabase/types";
import type { Localized, MediaImage } from "@/lib/types";

export type MediaRow = Tables<"media">;

/** Used only when a media reference is unexpectedly null — see toMediaImage. */
const FALLBACK_IMAGE_SRC = "/images/hero/doctor-hero-placeholder.svg";

/**
 * Resolves any media row to a usable URL — a Supabase Storage public URL
 * for uploaded files, or the row's external_url as-is for seed/placeholder
 * assets served from /public (see 0003_media.sql). Every image/video
 * reference on the frontend and in the CMS goes through this one function.
 */
export function resolveMediaUrl(media: Pick<MediaRow, "bucket_id" | "storage_path" | "external_url"> | null | undefined): string | null {
  if (!media) return null;
  if (media.external_url) return media.external_url;
  if (media.bucket_id && media.storage_path) {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return null;
    return `${base}/storage/v1/object/public/${media.bucket_id}/${media.storage_path}`;
  }
  return null;
}

/**
 * Converts a media row (plus an optional alt-text override, e.g. a
 * `page_sections.content` field that carries its own alt text separately
 * from `media.alt_text_en/ar`) into the frontend's `MediaImage` shape. Falls
 * back to a generic placeholder + the given alt text if the row is missing
 * or fails to resolve — an admin left an optional image field empty, not a
 * sign Supabase itself is unavailable (see publicClient.ts for that case).
 */
export function toMediaImage(
  media: MediaRow | null,
  altFallback: Localized,
  options?: { alt?: Localized; position?: string }
): MediaImage {
  const alt = options?.alt ?? (media ? { en: media.alt_text_en ?? altFallback.en, ar: media.alt_text_ar ?? altFallback.ar } : altFallback);
  return {
    src: resolveMediaUrl(media) ?? FALLBACK_IMAGE_SRC,
    alt,
    position: options?.position,
  };
}
