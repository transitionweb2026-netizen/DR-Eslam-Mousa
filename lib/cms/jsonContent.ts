import type { Localized } from "@/lib/types";

/**
 * Small, defensive readers for `page_sections.content` (a `jsonb` column
 * typed only as `Json` by Supabase's generated types). An admin can only
 * ever write these through SectionEditor's typed fields (see
 * lib/cms/sectionSchemas.ts), so the shape is trusted in practice — these
 * helpers exist so a page still renders its static fallback instead of
 * crashing if a row is ever missing a key or malformed.
 */
export type JsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): JsonRecord | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as JsonRecord) : undefined;
}

export function str(obj: JsonRecord | undefined, key: string, fallback: string): string {
  const v = obj?.[key];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}

export function optionalStr(obj: JsonRecord | undefined, key: string): string | undefined {
  const v = obj?.[key];
  return typeof v === "string" ? v : undefined;
}

export function localized(obj: JsonRecord | undefined, key: string, fallback: Localized): Localized {
  const v = asRecord(obj?.[key]);
  if (v && typeof v.en === "string" && typeof v.ar === "string") return { en: v.en, ar: v.ar };
  return fallback;
}

export function localizedArray(obj: JsonRecord | undefined, key: string, fallback: Localized<string[]>): Localized<string[]> {
  const v = asRecord(obj?.[key]);
  if (v && Array.isArray(v.en) && Array.isArray(v.ar)) {
    return { en: v.en.filter((x): x is string => typeof x === "string"), ar: v.ar.filter((x): x is string => typeof x === "string") };
  }
  return fallback;
}

export function nestedCta(
  obj: JsonRecord | undefined,
  key: string,
  fallback: { label: Localized; url: string }
): { label: Localized; url: string } {
  const v = asRecord(obj?.[key]);
  return { label: localized(v, "label", fallback.label), url: str(v, "url", fallback.url) };
}
