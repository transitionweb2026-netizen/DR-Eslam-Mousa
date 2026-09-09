"use client";

import { useMemo, useRef, useState } from "react";
import { deleteMedia, updateMediaAltText, uploadMedia } from "@/app/admin/actions/media";
import { resolveMediaUrl, type MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "doctor", "services", "conditions", "certificates", "videos", "articles", "general", "seo"] as const;

export function MediaLibrary({ initialItems }: { initialItems: MediaRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [selected, setSelected] = useState<MediaRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery = query.trim() === "" || item.file_name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  async function handleUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", file.type.startsWith("video/") ? "videos" : "media");
    formData.append("category", "general");
    const result = await uploadMedia(formData);
    setUploading(false);
    if (!result.ok) {
      alert(result.error ?? "Upload failed.");
      return;
    }
    window.location.reload();
  }

  async function handleDelete(item: MediaRow) {
    if (!confirm(`Delete "${item.file_name}"? Any card still referencing it will show a broken image.`)) return;
    const result = await deleteMedia(item.id);
    if (!result.ok) {
      alert(result.error ?? "Could not delete — it may still be referenced somewhere.");
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelected(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by file name…"
          className="glass-panel w-full max-w-xs rounded-xl border-transparent px-4 py-2 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-blue"
        />
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold capitalize",
                category === c ? "bg-gradient-brand text-white" : "glass-panel text-brand-muted"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
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
          className="bg-gradient-brand ms-auto rounded-full px-4 py-2 text-xs font-semibold text-white shadow-glass disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "+ Upload File"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {filtered.map((item) => {
          const url = resolveMediaUrl(item);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              className="glass-card glass-card-hover flex flex-col overflow-hidden rounded-2xl text-start"
            >
              <div className="aspect-square w-full overflow-hidden bg-white/40">
                {url && item.kind === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={item.alt_text_en ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-brand-muted">{item.kind}</span>
                )}
              </div>
              <div className="p-2.5">
                <p className="truncate text-xs font-semibold text-brand-ink">{item.file_name}</p>
                <p className="text-[10px] uppercase text-brand-muted">{item.category}</p>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && <p className="col-span-full py-10 text-center text-sm text-brand-muted">No files match.</p>}
      </div>

      {selected && (
        <MediaDetailModal
          item={selected}
          onClose={() => setSelected(null)}
          onDelete={() => handleDelete(selected)}
          onSaved={(altEn, altAr) => {
            setItems((prev) => prev.map((i) => (i.id === selected.id ? { ...i, alt_text_en: altEn, alt_text_ar: altAr } : i)));
            setSelected((prev) => (prev ? { ...prev, alt_text_en: altEn, alt_text_ar: altAr } : prev));
          }}
        />
      )}
    </div>
  );
}

function MediaDetailModal({
  item,
  onClose,
  onDelete,
  onSaved,
}: {
  item: MediaRow;
  onClose: () => void;
  onDelete: () => void;
  onSaved: (altEn: string, altAr: string) => void;
}) {
  const [altEn, setAltEn] = useState(item.alt_text_en ?? "");
  const [altAr, setAltAr] = useState(item.alt_text_ar ?? "");
  const [saving, setSaving] = useState(false);
  const url = resolveMediaUrl(item);

  async function handleSave() {
    setSaving(true);
    await updateMediaAltText(item.id, altEn, altAr);
    setSaving(false);
    onSaved(altEn, altAr);
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="glass-card-strong w-full max-w-lg rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-brand-ink">{item.file_name}</h3>
          <button type="button" onClick={onClose} className="text-sm text-brand-muted hover:text-brand-ink">
            Close
          </button>
        </div>

        {url && item.kind === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="mt-4 max-h-56 w-full rounded-xl object-contain" />
        )}

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-brand-muted">
          <dt>Type</dt>
          <dd className="text-brand-ink">{item.mime_type}</dd>
          <dt>Size</dt>
          <dd className="text-brand-ink">{item.file_size ? `${(item.file_size / 1024).toFixed(0)} KB` : "—"}</dd>
          <dt>Category</dt>
          <dd className="capitalize text-brand-ink">{item.category}</dd>
          <dt>Uploaded</dt>
          <dd className="text-brand-ink">{new Date(item.created_at).toLocaleDateString()}</dd>
        </dl>

        <div className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-brand-ink">Alt Text (English)</label>
            <input value={altEn} onChange={(e) => setAltEn(e.target.value)} className="glass-panel w-full rounded-lg px-3 py-2 text-sm text-brand-ink outline-none" />
          </div>
          <div dir="rtl">
            <label className="mb-1 block text-xs font-semibold text-brand-ink">النص البديل (العربية)</label>
            <input value={altAr} onChange={(e) => setAltAr(e.target.value)} className="glass-panel w-full rounded-lg px-3 py-2 text-sm text-brand-ink outline-none" />
          </div>
        </div>

        <div className="mt-5 flex justify-between">
          <button type="button" onClick={onDelete} className="text-xs font-semibold text-[#c8452f] hover:underline">
            Delete File
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-brand rounded-full px-5 py-2 text-xs font-semibold text-white shadow-glass disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
