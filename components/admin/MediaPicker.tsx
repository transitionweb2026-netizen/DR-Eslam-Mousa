"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { resolveMediaUrl, type MediaRow } from "@/lib/cms/media";
import { uploadMedia } from "@/app/admin/actions/media";
import { cn } from "@/lib/utils";

interface MediaPickerProps {
  label: string;
  bucket: "media" | "video-covers" | "videos";
  category: MediaRow["category"];
  value: MediaRow | null;
  onChange: (media: MediaRow | null) => void;
}

/**
 * The one media-selection control used everywhere a hero image, card
 * image, video cover, actual video file or OG image needs to be set —
 * "choose existing" and "upload new" in one place, backed by the shared
 * media library (components/admin/... reuses the same table the top-level
 * Media Library page browses).
 */
export function MediaPicker({ label, bucket, category, value, onChange }: MediaPickerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetched from the trigger click (not a useEffect keyed on `open`) so the
  // fetch is an explicit response to user interaction rather than a
  // setState-in-effect cascade.
  async function openPicker() {
    setOpen(true);
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("media")
      .select("*")
      .eq("bucket_id", bucket)
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    formData.append("category", category);
    const result = await uploadMedia(formData);
    setUploading(false);
    if (!result.ok || !result.id) {
      setError(result.error ?? "Upload failed.");
      return;
    }
    const supabase = createClient();
    const { data } = await supabase.from("media").select("*").eq("id", result.id).single();
    if (data) {
      onChange(data);
      setOpen(false);
    }
  }

  const previewUrl = resolveMediaUrl(value);

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-brand-ink">{label}</span>
      <div className="flex items-center gap-3">
        <div className="glass-panel flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl">
          {previewUrl ? (
            bucket === "videos" ? (
              <video src={previewUrl} className="h-full w-full object-cover" muted />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview only, arbitrary external/storage URLs
              <img src={previewUrl} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <span className="text-xs text-brand-muted">None</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => void openPicker()}
            className="glass-panel rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-ink hover:text-brand-blue"
          >
            {value ? "Replace" : "Choose"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs font-semibold text-brand-muted hover:text-[#c8452f]"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div
            className="glass-card-strong max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-brand-ink">Select {label}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-brand-muted hover:text-brand-ink">
                Close
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept={bucket === "videos" ? "video/*" : "image/*"}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleUpload(file);
                }}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-brand rounded-full px-4 py-2 text-xs font-semibold text-white shadow-glass disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload New File"}
              </button>
              {error && <span className="text-xs font-medium text-[#c8452f]">{error}</span>}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {loading && <p className="col-span-full text-sm text-brand-muted">Loading…</p>}
              {!loading && items.length === 0 && (
                <p className="col-span-full text-sm text-brand-muted">No files in this bucket yet — upload one above.</p>
              )}
              {items.map((item) => {
                const url = resolveMediaUrl(item);
                const selected = value?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                    className={cn(
                      "glass-panel aspect-square overflow-hidden rounded-xl",
                      selected && "outline outline-2 outline-brand-blue"
                    )}
                  >
                    {url && item.kind === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[10px] text-brand-muted">
                        {item.file_name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
