import { getAdminCareerItems } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const ICONS = ["plan", "technique", "safety", "arthroscopy", "experience", "patients", "patient", "procedures", "cases"];

const fields: FieldConfig[] = [
  { key: "year", label: "Year / Period", type: "text", required: true },
  { key: "icon", label: "Icon", type: "select", options: ICONS.map((i) => ({ value: i, label: i })) },
  { key: "image_id", label: "Optional Image", type: "media", mediaCategory: "doctor" },
  { key: "position", label: "Position / Achievement", type: "text", bilingual: true, required: true },
  { key: "institution", label: "Institution", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true },
];

export default async function AdminCareerPage() {
  const rows = await getAdminCareerItems();
  return (
    <CollectionManager
      table="career_items"
      title="Career Journey"
      description="Powers the About page's timeline, in this order (earliest first)."
      fields={fields}
      rows={rows}
      emptyRow={{ year: "", icon: "experience", is_active: true }}
    />
  );
}
