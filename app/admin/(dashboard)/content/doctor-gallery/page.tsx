"use client";

import { getAdminDoctorGallery } from "@/lib/cms/adminQueries";
import { useAdminData } from "@/components/admin/useAdminData";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "image_id", label: "Photo", type: "media", mediaCategory: "doctor", required: true },
  { key: "image_alt", label: "Alt Text", type: "text", bilingual: true },
  {
    key: "image_position",
    label: "Image Focal Point",
    type: "text",
    help: "Optional CSS object-position, e.g. \"25% center\" — nudges the crop so the subject isn't cut off in this card's tall 3:4 frame. Leave empty for a plain center crop.",
  },
];

export default function AdminDoctorGalleryPage() {
  const rows = useAdminData(getAdminDoctorGallery);
  if (rows === undefined) return null;
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
