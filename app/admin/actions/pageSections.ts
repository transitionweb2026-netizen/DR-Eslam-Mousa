import { createClient } from "@/lib/supabase/client";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export async function updatePageSection(
  sectionId: string,
  content: Record<string, unknown>,
  isVisible: boolean
): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase
    .from("page_sections")
    .update({ content, is_visible: isVisible } as never)
    .eq("id", sectionId);
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}
