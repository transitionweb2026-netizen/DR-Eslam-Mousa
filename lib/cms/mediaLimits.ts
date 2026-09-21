import type { Database } from "@/lib/supabase/types";

export type MediaBucket = NonNullable<Database["public"]["Tables"]["media"]["Row"]["bucket_id"]>;

/**
 * Per-bucket MIME/size allow-list, matching the actual Supabase Storage
 * bucket config in supabase/migrations/0011_storage.sql — that config (not
 * this one) is the real enforcement boundary, since uploads now go straight
 * from the browser to Storage (see lib/cms/clientMediaUpload.ts) rather
 * than through a server action that could check first. This copy exists
 * purely so the picker can reject an obviously-wrong file instantly,
 * client-side, before spending any time on the network.
 *
 * Plain data, no "server-only" — needs to be importable from client
 * components.
 */
export const BUCKET_LIMITS: Record<MediaBucket, { maxBytes: number; mimeTypes: string[] }> = {
  media: { maxBytes: 10 * 1024 * 1024, mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"] },
  "video-covers": { maxBytes: 5 * 1024 * 1024, mimeTypes: ["image/png", "image/jpeg", "image/webp"] },
  videos: { maxBytes: 500 * 1024 * 1024, mimeTypes: ["video/mp4", "video/webm", "video/quicktime"] },
};
