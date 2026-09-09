"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  deleteCollectionRow,
  reorderCollectionRows,
  upsertCollectionRow,
  type CollectionTable,
} from "@/app/admin/actions/collections";
import type { JSONContent } from "@tiptap/react";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";

export type FieldType = "text" | "textarea" | "richtext" | "stringArray" | "number" | "media" | "select" | "date" | "url";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  /** If true, this field is actually two columns: `${key}_en` and `${key}_ar`. */
  bilingual?: boolean;
  required?: boolean;
  options?: { value: string; label: string }[];
  mediaBucket?: "media" | "video-covers" | "videos";
  mediaCategory?: MediaRow["category"];
  help?: string;
}

export interface CollectionManagerProps {
  table: CollectionTable;
  title: string;
  description?: string;
  fields: FieldConfig[];
  rows: Record<string, unknown>[];
  hasOrder?: boolean;
  hasActive?: boolean;
  hasFeatured?: boolean;
  titleField?: string; // defaults to "title" (bilingual) — used for the list summary + search
  emptyRow?: Record<string, unknown>;
}

type Row = Record<string, unknown>;

function get(row: Row, key: string): unknown {
  return row[key];
}

function summarize(row: Row, titleField: string): string {
  const en = row[`${titleField}_en`] ?? row[titleField];
  return typeof en === "string" && en.length > 0 ? en : "(untitled)";
}

export function CollectionManager({
  table,
  title,
  description,
  fields,
  rows: initialRows,
  hasOrder = true,
  hasActive = true,
  hasFeatured = false,
  titleField = "title",
  emptyRow = {},
}: CollectionManagerProps) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) => summarize(row, titleField).toLowerCase().includes(q));
  }, [rows, query, titleField]);

  function openNew() {
    setEditing({ ...emptyRow });
    setIsNew(true);
  }
  function openEdit(row: Row) {
    setEditing({ ...row });
    setIsNew(false);
  }

  async function handleSave(values: Row) {
    // Media-type fields hold the full joined media row in local state (so
    // the picker can preview it) but the database column is a plain FK id
    // — swap object -> id only for the payload actually sent to Supabase.
    const payload: Row = { ...values };
    for (const f of fields) {
      if (f.type === "media") {
        const current = payload[f.key];
        payload[f.key] = current && typeof current === "object" ? (current as MediaRow).id : current ?? null;
      }
    }

    const result = await upsertCollectionRow(table, payload);
    if (!result.ok) {
      alert(result.error ?? "Could not save — please try again.");
      return;
    }
    if (isNew) {
      setRows((prev) => [...prev, { ...values, id: result.id }]);
    } else {
      setRows((prev) => prev.map((r) => (r.id === values.id ? { ...r, ...values } : r)));
    }
    setEditing(null);
  }

  async function handleDelete(row: Row) {
    if (!confirm(`Delete "${summarize(row, titleField)}"? This can't be undone.`)) return;
    setBusyId(row.id as string);
    const result = await deleteCollectionRow(table, row.id as string);
    setBusyId(null);
    if (!result.ok) {
      alert(result.error ?? "Could not delete.");
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  }

  async function move(row: Row, direction: -1 | 1) {
    const index = rows.findIndex((r) => r.id === row.id);
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    setRows(next);
    await reorderCollectionRows(table, next.map((r) => r.id as string));
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-ink">{title}</h1>
          {description && <p className="mt-1 text-sm text-brand-muted">{description}</p>}
        </div>
        <button
          type="button"
          onClick={openNew}
          className="bg-gradient-brand shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-glass hover:-translate-y-0.5 hover:shadow-glass-lg"
        >
          + Add New
        </button>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
        className="glass-panel mt-5 w-full max-w-sm rounded-xl border-transparent px-4 py-2 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-blue"
      />

      <div className="mt-5 flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="glass-panel rounded-xl p-6 text-center text-sm text-brand-muted">
            {rows.length === 0 ? "Nothing here yet — add the first one." : "No results match your search."}
          </p>
        )}
        {filtered.map((row) => (
          <div key={row.id as string} className="glass-panel flex items-center gap-3 rounded-xl p-3">
            {hasOrder && (
              <div className="flex flex-col">
                <button type="button" onClick={() => move(row, -1)} className="text-brand-muted hover:text-brand-blue" aria-label="Move up">
                  ▲
                </button>
                <button type="button" onClick={() => move(row, 1)} className="text-brand-muted hover:text-brand-blue" aria-label="Move down">
                  ▼
                </button>
              </div>
            )}
            <button type="button" onClick={() => openEdit(row)} className="min-w-0 flex-1 text-start">
              <p className="truncate text-sm font-semibold text-brand-ink">{summarize(row, titleField)}</p>
              <div className="mt-0.5 flex gap-2">
                {hasActive && (
                  <span className={cn("text-xs", get(row, "is_active") === false ? "text-brand-muted" : "text-brand-blue")}>
                    {get(row, "is_active") === false ? "Hidden" : "Visible"}
                  </span>
                )}
                {hasFeatured && get(row, "is_featured") === true && <span className="text-xs text-brand-purple">Featured</span>}
                {get(row, "status") ? <span className="text-xs capitalize text-brand-muted">{String(get(row, "status"))}</span> : null}
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleDelete(row)}
              disabled={busyId === row.id}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-muted hover:text-[#c8452f] disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <RowEditor
          fields={fields}
          value={editing}
          isNew={isNew}
          hasActive={hasActive}
          hasFeatured={hasFeatured}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function RowEditor({
  fields,
  value,
  isNew,
  hasActive,
  hasFeatured,
  onCancel,
  onSave,
}: {
  fields: FieldConfig[];
  value: Row;
  isNew: boolean;
  hasActive: boolean;
  hasFeatured: boolean;
  onCancel: () => void;
  onSave: (values: Row) => Promise<void>;
}) {
  const [values, setValues] = useState<Row>(value);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saving, setSaving] = useState(false);

  const generalFields = fields.filter((f) => !f.bilingual);
  const bilingualFields = fields.filter((f) => f.bilingual);

  function setField(key: string, v: unknown) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function handleSubmit() {
    setSaving(true);
    await onSave(values);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onClick={onCancel}>
      <div
        className="glass-card-strong max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-ink">{isNew ? "Add New" : "Edit"}</h2>
          <button type="button" onClick={onCancel} className="text-sm text-brand-muted hover:text-brand-ink">
            Close
          </button>
        </div>

        {(hasActive || hasFeatured) && (
          <div className="mt-4 flex gap-4">
            {hasActive && (
              <label className="flex items-center gap-2 text-sm text-brand-ink">
                <input
                  type="checkbox"
                  checked={get(values, "is_active") !== false}
                  onChange={(e) => setField("is_active", e.target.checked)}
                />
                Visible on the site
              </label>
            )}
            {hasFeatured && (
              <label className="flex items-center gap-2 text-sm text-brand-ink">
                <input
                  type="checkbox"
                  checked={get(values, "is_featured") === true}
                  onChange={(e) => setField("is_featured", e.target.checked)}
                />
                Featured
              </label>
            )}
          </div>
        )}

        {generalFields.length > 0 && (
          <div className="mt-5 flex flex-col gap-4">
            {generalFields.map((f) => (
              <FieldInput key={f.key} field={f} value={values[f.key]} onChange={(v) => setField(f.key, v)} />
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

            <div className="mt-4 flex flex-col gap-4" dir={lang === "ar" ? "rtl" : "ltr"}>
              {bilingualFields.map((f) => {
                const key = `${f.key}_${lang}`;
                return <FieldInput key={key} field={{ ...f, key }} value={values[key]} onChange={(v) => setField(key, v)} />;
              })}
            </div>
          </>
        )}

        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="glass-panel rounded-full px-5 py-2.5 text-sm font-semibold text-brand-ink">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="bg-gradient-brand rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-glass disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldConfig; value: unknown; onChange: (v: unknown) => void }): ReactNode {
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
      <label className="mb-1.5 block text-sm font-semibold text-brand-ink">
        {field.label}
        {field.required && <span className="text-brand-blue"> *</span>}
      </label>
      {field.type === "richtext" ? (
        <RichTextEditor value={(value as JSONContent) ?? null} onChange={(doc) => onChange(doc)} />
      ) : field.type === "textarea" ? (
        <textarea
          rows={4}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseClasses, "resize-y")}
        />
      ) : field.type === "stringArray" ? (
        <textarea
          rows={4}
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim().length > 0))}
          placeholder="One item per line"
          className={cn(baseClasses, "resize-y")}
        />
      ) : field.type === "select" ? (
        <select value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={baseClasses}>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "number" ? (
        <input
          type="number"
          value={(value as number) ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
          className={baseClasses}
        />
      ) : field.type === "date" ? (
        <input type="date" value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={baseClasses} />
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
