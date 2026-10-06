"use client";

import { getAdminReviews } from "@/lib/cms/adminQueries";
import { useAdminData } from "@/components/admin/useAdminData";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  {
    key: "icon_media_id",
    label: "Icon",
    type: "media",
    mediaCategory: "reviews",
    help: "A generic illustration representing a man or woman — never a real patient photo. Leave empty to use a neutral placeholder icon.",
  },
  { key: "name", label: "Patient Name", type: "text", bilingual: true, required: true },
  { key: "review", label: "Review Text", type: "textarea", bilingual: true, required: true },
];

export default function AdminReviewsPage() {
  const rows = useAdminData(getAdminReviews);
  if (rows === undefined) return null;
  return (
    <CollectionManager
      table="reviews"
      title="Patient Reviews"
      description="Real patient reviews only — this starts empty on purpose. Shown on the About page between Specialties and the Doctor Photo Gallery. Reorder with the arrows, or hide a review without deleting it."
      fields={fields}
      rows={rows}
      titleField="name"
      emptyRow={{ name_en: "", name_ar: "", review_en: "", review_ar: "", is_active: true }}
    />
  );
}
