import { getAdminVideos } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "cover_media_id", label: "Video Cover / Thumbnail", type: "media", mediaBucket: "video-covers", mediaCategory: "videos", help: "Replacing this never touches the actual video file below." },
  { key: "video_media_id", label: "Actual Video File", type: "media", mediaBucket: "videos", mediaCategory: "videos", help: "Replacing this never touches the cover image above. Leave empty and set an External URL for a YouTube/Vimeo embed instead." },
  { key: "external_url", label: "External Video URL (optional)", type: "url" },
  { key: "duration_label", label: "Duration Label", type: "text", help: "e.g. 06:12" },
  { key: "published_at", label: "Published Date", type: "date" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true },
  { key: "category", label: "Category", type: "text", bilingual: true },
];

export default async function AdminVideosPage() {
  const rows = await getAdminVideos();
  return (
    <CollectionManager
      table="videos"
      title="Videos"
      description="The full Video Library, in this order. The Home page's Featured Videos section shows the ones marked Featured (3 in the seed data)."
      fields={fields}
      rows={rows}
      hasFeatured
      emptyRow={{ slug: "", is_active: true, is_featured: false, published_at: new Date().toISOString().slice(0, 10) }}
    />
  );
}
