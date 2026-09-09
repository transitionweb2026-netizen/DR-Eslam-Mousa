import { getAdminConditions } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const ICONS = ["knee", "hip", "shoulder", "joint", "sports", "arthroscopy", "spine", "neck"];

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug", type: "text", required: true, help: "Used in the URL and to link cards to this condition, e.g. knee-pain." },
  { key: "icon", label: "Icon", type: "select", options: ICONS.map((i) => ({ value: i, label: i })) },
  { key: "image_id", label: "Card Image", type: "media", mediaCategory: "conditions" },
  { key: "cta_url", label: "CTA URL", type: "url" },
  { key: "title", label: "Name", type: "text", bilingual: true, required: true },
  { key: "short_description", label: "Short Description (card)", type: "textarea", bilingual: true, required: true },
  { key: "full_description", label: "Full Description (popup, one paragraph per line)", type: "stringArray", bilingual: true },
  { key: "benefits", label: "Key Benefits (popup, one per line)", type: "stringArray", bilingual: true },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { key: "cta_label", label: "CTA Label", type: "text", bilingual: true },
];

export default async function AdminConditionsPage() {
  const rows = await getAdminConditions();
  return (
    <CollectionManager
      table="conditions"
      title="Conditions"
      description={'"What We Treat" / "What Are You Suffering From?" — all conditions. The Services page shows all of them; Home shows the ones marked Featured.'}
      fields={fields}
      rows={rows}
      hasFeatured
      emptyRow={{ slug: "", icon: "knee", is_active: true, is_featured: true, full_description_en: [], full_description_ar: [], benefits_en: [], benefits_ar: [] }}
    />
  );
}
