import { getAdminArticles } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true },
  { key: "status", label: "Status", type: "select", options: [
    { value: "draft", label: "Draft (admin-only)" },
    { value: "published", label: "Published (live on the site)" },
    { value: "archived", label: "Archived (kept, not shown)" },
  ] },
  { key: "image_id", label: "Featured Image", type: "media", mediaCategory: "articles" },
  { key: "author", label: "Author", type: "text" },
  { key: "read_time_minutes", label: "Read Time (minutes)", type: "number" },
  { key: "published_at", label: "Published Date", type: "date" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "excerpt", label: "Short Excerpt (card)", type: "textarea", bilingual: true, required: true },
  { key: "content", label: "Full Article Content", type: "richtext", bilingual: true },
  { key: "category", label: "Category", type: "text", bilingual: true },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
];

export default async function AdminArticlesPage() {
  const rows = await getAdminArticles();
  return (
    <CollectionManager
      table="articles"
      title="Articles"
      description="The full blog. Only Published articles appear on the site. The Articles page's large feature is the most recently published; Home shows the ones marked Featured."
      fields={fields}
      rows={rows}
      hasActive={false}
      hasFeatured
      emptyRow={{ slug: "", status: "draft", is_featured: false, author: "Dr. Islam Moussa", read_time_minutes: 4, published_at: new Date().toISOString().slice(0, 10) }}
    />
  );
}
