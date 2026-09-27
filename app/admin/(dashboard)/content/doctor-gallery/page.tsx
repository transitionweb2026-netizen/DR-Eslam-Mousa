import { getAdminDoctorGallery } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "image_id", label: "Photo", type: "media", mediaCategory: "doctor", required: true },
  { key: "image_alt", label: "Alt Text", type: "text", bilingual: true },
];

export default async function AdminDoctorGalleryPage() {
  const rows = await getAdminDoctorGallery();
  return (
    <CollectionManager
      table="doctor_gallery"
      title="Doctor Photo Gallery"
      description="The horizontal photo slider on the About page, just before the closing call-to-action. Reorder with the arrows, or hide a photo without deleting it."
      fields={fields}
      rows={rows}
      titleField="image_alt"
      emptyRow={{ is_active: true }}
    />
  );
}
