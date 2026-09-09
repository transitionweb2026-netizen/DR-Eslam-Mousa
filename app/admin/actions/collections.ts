"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * One generic, table-agnostic set of CRUD actions backing every "Content"
 * collection screen (services, conditions, certificates, career_items,
 * statistics, faqs, videos, articles) and the Navigation/Social Links
 * collections under Global Settings.
 *
 * This is safe specifically BECAUSE authorization lives in Postgres RLS
 * (supabase/migrations — every one of these tables' "Admins can manage X"
 * policy), not in this code: the table name is never trusted as a
 * capability, it's just routing. A non-admin session gets a database-level
 * permission error on every one of these calls, RLS policy already covers
 * that — this layer only has to get data to/from Supabase and revalidate
 * the pages that read it.
 */
const ALLOWED_TABLES = [
  "services",
  "service_seo",
  "conditions",
  "condition_seo",
  "certificates",
  "career_items",
  "statistics",
  "faqs",
  "videos",
  "articles",
  "article_seo",
  "navigation_items",
  "social_links",
] as const;

export type CollectionTable = (typeof ALLOWED_TABLES)[number];

function assertAllowed(table: string): asserts table is CollectionTable {
  if (!(ALLOWED_TABLES as readonly string[]).includes(table)) {
    throw new Error(`"${table}" is not an editable CMS collection.`);
  }
}

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
}

export async function upsertCollectionRow(
  table: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const { id, ...patch } = values as { id?: string } & Record<string, unknown>;

  // `table` is a runtime-dynamic union (see ALLOWED_TABLES) — Supabase's
  // per-table Update/Insert types can't be statically verified against a
  // generic patch object here. That's fine: authorization and column
  // validity are enforced by Postgres RLS and NOT NULL/CHECK constraints
  // (supabase/migrations), which is the actual safety boundary for this
  // action, not this cast.
  const query = id
    ? supabase.from(table).update(patch as never).eq("id", id).select("id").single()
    : supabase.from(table).insert(patch as never).select("id").single();

  const { data, error } = await query;
  if (error) return { ok: false, error: error.message };

  revalidateCollection(table);
  return { ok: true, id: data?.id as string | undefined };
}

export async function deleteCollectionRow(table: string, id: string): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidateCollection(table);
  return { ok: true };
}

export async function reorderCollectionRows(
  table: string,
  orderedIds: string[]
): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const updates = orderedIds.map((id, index) =>
    supabase.from(table).update({ display_order: index + 1 } as never).eq("id", id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) return { ok: false, error: failed.error.message };

  revalidateCollection(table);
  return { ok: true };
}

export async function toggleCollectionField(
  table: string,
  id: string,
  field: string,
  value: boolean
): Promise<ActionResult> {
  assertAllowed(table);
  const supabase = await createClient();

  const { error } = await supabase.from(table).update({ [field]: value } as never).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidateCollection(table);
  return { ok: true };
}

/** Revalidates every public route that could show this table's data. */
function revalidateCollection(table: CollectionTable) {
  revalidatePath("/", "layout");
  const pathsByTable: Partial<Record<CollectionTable, string[]>> = {
    services: ["/[locale]", "/[locale]/services", "/[locale]/about"],
    service_seo: ["/[locale]/services"],
    conditions: ["/[locale]", "/[locale]/services"],
    condition_seo: ["/[locale]/services"],
    certificates: ["/[locale]/about"],
    career_items: ["/[locale]/about"],
    statistics: ["/[locale]", "/[locale]/about"],
    faqs: ["/[locale]"],
    videos: ["/[locale]", "/[locale]/videos"],
    articles: ["/[locale]", "/[locale]/articles"],
    article_seo: ["/[locale]/articles"],
    navigation_items: ["/[locale]"],
    social_links: ["/[locale]", "/[locale]/contact"],
  };
  for (const path of pathsByTable[table] ?? []) {
    revalidatePath(path, "page");
  }
}
