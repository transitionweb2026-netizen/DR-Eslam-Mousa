"use client";

import { createClient } from "@/lib/supabase/client";
import { useAdminData } from "@/components/admin/useAdminData";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

async function loadMedia() {
  const supabase = createClient();
  const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export default function AdminMediaPage() {
  const items = useAdminData(loadMedia);
  if (items === undefined) return null;

  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Media Library</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Every image and video used across the site. Files chosen while editing a card, hero, video or article show up
        here too — this is the same store, not a separate one.
      </p>
      <div className="mt-6">
        <MediaLibrary initialItems={items} />
      </div>
    </div>
  );
}
