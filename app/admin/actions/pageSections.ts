"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export async function updatePageSection(
  sectionId: string,
  content: Record<string, unknown>,
  isVisible: boolean
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("page_sections")
    .update({ content, is_visible: isVisible } as never)
    .eq("id", sectionId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/", "layout");
  return { ok: true };
}
