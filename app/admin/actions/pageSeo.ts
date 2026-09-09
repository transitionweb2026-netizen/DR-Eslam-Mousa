"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/** page_seo has one row per page (unique page_id) rather than a fixed id=true singleton. */
export async function updatePageSeo(pageId: string, patch: Record<string, unknown>): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("page_seo").update(patch as never).eq("page_id", pageId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}
