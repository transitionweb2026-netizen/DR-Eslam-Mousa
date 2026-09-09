import { createClient } from "@/lib/supabase/server";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-xl font-bold text-brand-ink">Media Library</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Every image and video used across the site. Files chosen while editing a card, hero, video or article show up
        here too — this is the same store, not a separate one.
      </p>
      <div className="mt-6">
        <MediaLibrary initialItems={data ?? []} />
      </div>
    </div>
  );
}
