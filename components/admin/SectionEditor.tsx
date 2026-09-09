"use client";

import { useState } from "react";
import { updatePageSection } from "@/app/admin/actions/pageSections";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SECTION_LABELS, SECTION_NOTES, SECTION_SCHEMAS, type SectionFieldDef } from "@/lib/cms/sectionSchemas";
import { getPath, setPath } from "@/lib/cms/jsonPath";
import type { MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";

interface SectionEditorProps {
  id: string;
  sectionType: string;
  displayOrder: number;
  initialContent: Record<string, unknown>;
  initialVisible: boolean;
}

export function SectionEditor({ id, sectionType, displayOrder, initialContent, initialVisible }: SectionEditorProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [visible, setVisible] = useState(initialVisible);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const schema = SECTION_SCHEMAS[sectionType] ?? [];
  const note = SECTION_NOTES[sectionType];
  const generalFields = schema.filter((f) => !f.bilingual);
  const bilingualFields = schema.filter((f) => f.bilingual);

  function setField(path: string, value: unknown) {
    setContent((prev) => setPath(prev, path, value));
    setSaveState("idle");
  }

  async function handleSave() {
    setSaveState("saving");
    const payload = normalizeMediaFields(content, schema);
    const result = await updatePageSection(id, payload, visible);
    setSaveState(result.ok ? "saved" : "error");
  }

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start"
      >
        <span className="flex items-center gap-3">
          <span className="bg-gradient-brand flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
            {String(displayOrder).padStart(2, "0")}
          </span>
          <span className="text-sm font-bold text-brand-ink">{SECTION_LABELS[sectionType] ?? sectionType}</span>
          {!visible && <span className="chip-purple rounded-full px-2 py-0.5 text-[10px] font-bold uppercase">Hidden</span>}
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn("h-4 w-4 transition-transform", open && "rotate-180")}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-brand-line/60 px-5 py-5">
          <label className="mb-4 flex items-center gap-2 text-sm text-brand-ink">
            <input type="checkbox" checked={visible} onChange={(e) => { setVisible(e.target.checked); setSaveState("idle"); }} />
            Visible on the page
          </label>

          {note && <p className="mb-4 text-xs text-brand-muted">{note}</p>}

          {generalFields.length > 0 && (
            <div className="flex flex-col gap-4">
              {generalFields.map((f) => (
                <SectionField key={f.path} field={f} value={getPath(content, f.path)} onChange={(v) => setField(f.path, v)} />
              ))}
            </div>
          )}

          {bilingualFields.length > 0 && (
            <>
              <div className="mt-5 inline-flex rounded-full bg-white/60 p-1">
                <button type="button" onClick={() => setLang("en")} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "en" ? "bg-gradient-brand text-white" : "text-brand-muted")}>
                  English
                </button>
                <button type="button" onClick={() => setLang("ar")} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "ar" ? "bg-gradient-brand text-white" : "text-brand-muted")}>
                  العربية
                </button>
              </div>
              <div className="mt-3 flex flex-col gap-4" dir={lang === "ar" ? "rtl" : "ltr"}>
                {bilingualFields.map((f) => {
                  const path = `${f.path}.${lang}`;
                  return <SectionField key={path} field={{ ...f, path }} value={getPath(content, path)} onChange={(v) => setField(path, v)} />;
                })}
              </div>
            </>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            {saveState === "saved" && <span className="text-xs font-semibold text-brand-blue">Saved ✓</span>}
            {saveState === "error" && <span className="text-xs font-semibold text-[#c8452f]">Could not save</span>}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="bg-gradient-brand rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-glass disabled:opacity-60"
            >
              {saveState === "saving" ? "Saving…" : "Save Section"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function normalizeMediaFields(content: Record<string, unknown>, schema: SectionFieldDef[]): Record<string, unknown> {
  let next = content;
  for (const f of schema) {
    if (f.type === "media") {
      const current = getPath(next, f.path);
      if (current && typeof current === "object") {
        next = setPath(next, f.path, (current as MediaRow).id);
      }
    }
  }
  return next;
}

function SectionField({ field, value, onChange }: { field: SectionFieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const baseClasses =
    "glass-panel w-full rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-blue";

  if (field.type === "media") {
    return (
      <MediaPicker
        label={field.label}
        bucket="media"
        category={(field.mediaCategory as MediaRow["category"]) ?? "general"}
        value={(value as MediaRow) ?? null}
        onChange={(media) => onChange(media)}
      />
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label}</label>
      {field.type === "textarea" ? (
        <textarea rows={3} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={cn(baseClasses, "resize-y")} />
      ) : field.type === "stringArray" ? (
        <textarea
          rows={4}
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim().length > 0))}
          className={cn(baseClasses, "resize-y")}
        />
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          dir={field.type === "url" ? "ltr" : undefined}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        />
      )}
    </div>
  );
}
