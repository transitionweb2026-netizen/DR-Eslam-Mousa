"use client";

import { useState, type ReactNode } from "react";
import { updateSettings, type SettingsTable } from "@/app/admin/actions/settings";
import type { FieldConfig } from "@/components/admin/CollectionManager";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";

interface SettingsFormProps {
  table: SettingsTable;
  title: string;
  description?: string;
  fields: FieldConfig[];
  initialValues: Record<string, unknown>;
  /** Extra content rendered below the form — e.g. a CollectionManager for navigation_items on the Navbar settings page. */
  children?: ReactNode;
}

/**
 * One reusable "edit the single row" form, used by every Global Settings
 * screen (Navbar, Footer, Final CTA, Contact Information, Contact Form,
 * Website Settings). Same field-config shape and same bilingual English /
 * Arabic tabs as CollectionManager, just without a list — there's only
 * ever one row.
 */
export function SettingsForm({ table, title, description, fields, initialValues, children }: SettingsFormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const generalFields = fields.filter((f) => !f.bilingual);
  const bilingualFields = fields.filter((f) => f.bilingual);

  function setField(key: string, v: unknown) {
    setValues((prev) => ({ ...prev, [key]: v }));
    setSaveState("idle");
  }

  async function handleSave() {
    setSaveState("saving");
    const payload: Record<string, unknown> = { ...values };
    for (const f of fields) {
      if (f.type === "media") {
        const current = payload[f.key];
        payload[f.key] = current && typeof current === "object" ? (current as MediaRow).id : (current ?? null);
      }
    }
    const result = await updateSettings(table, payload);
    setSaveState(result.ok ? "saved" : "error");
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-ink">{title}</h1>
          {description && <p className="mt-1 text-sm text-brand-muted">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {saveState === "saved" && <span className="text-xs font-semibold text-brand-blue">Saved ✓</span>}
          {saveState === "error" && <span className="text-xs font-semibold text-[#c8452f]">Could not save</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={saveState === "saving"}
            className="bg-gradient-brand rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-glass hover:-translate-y-0.5 hover:shadow-glass-lg disabled:opacity-60"
          >
            {saveState === "saving" ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {generalFields.length > 0 && (
        <div className="glass-panel mt-6 flex flex-col gap-4 rounded-2xl p-5">
          {generalFields.map((f) => (
            <SettingsFieldInput key={f.key} field={f} value={values[f.key]} onChange={(v) => setField(f.key, v)} />
          ))}
        </div>
      )}

      {bilingualFields.length > 0 && (
        <>
          <div className="mt-6 inline-flex rounded-full bg-white/60 p-1">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "en" ? "bg-gradient-brand text-white" : "text-brand-muted")}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("ar")}
              className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "ar" ? "bg-gradient-brand text-white" : "text-brand-muted")}
            >
              العربية
            </button>
          </div>
          <div className="glass-panel mt-3 flex flex-col gap-4 rounded-2xl p-5" dir={lang === "ar" ? "rtl" : "ltr"}>
            {bilingualFields.map((f) => {
              const key = `${f.key}_${lang}`;
              return <SettingsFieldInput key={key} field={{ ...f, key }} value={values[key]} onChange={(v) => setField(key, v)} />;
            })}
          </div>
        </>
      )}

      {children && <div className="mt-8 border-t border-brand-line/70 pt-8">{children}</div>}
    </div>
  );
}

function SettingsFieldInput({ field, value, onChange }: { field: FieldConfig; value: unknown; onChange: (v: unknown) => void }) {
  const baseClasses =
    "glass-panel w-full rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-blue";

  if (field.type === "media") {
    return (
      <MediaPicker
        label={field.label}
        bucket={field.mediaBucket ?? "media"}
        category={field.mediaCategory ?? "general"}
        value={(value as MediaRow) ?? null}
        onChange={(media) => onChange(media)}
      />
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label}</label>
      {field.type === "richtext" ? (
        <RichTextEditor value={value as never} onChange={(doc) => onChange(doc)} />
      ) : field.type === "textarea" ? (
        <textarea rows={3} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={cn(baseClasses, "resize-y")} />
      ) : field.type === "select" ? (
        <select value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={baseClasses}>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input type="number" value={(value as number) ?? ""} onChange={(e) => onChange(Number(e.target.value))} className={baseClasses} />
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          dir={field.type === "url" ? "ltr" : undefined}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        />
      )}
      {field.help && <p className="mt-1 text-xs text-brand-muted">{field.help}</p>}
    </div>
  );
}
