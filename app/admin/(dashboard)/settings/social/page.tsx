"use client";

import { getAdminSocialLinks } from "@/lib/cms/adminQueries";
import { useAdminData } from "@/components/admin/useAdminData";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const PLATFORMS = ["phone", "whatsapp", "facebook", "instagram", "youtube", "tiktok", "twitter", "linkedin"];

const fields: FieldConfig[] = [
  { key: "platform", label: "Platform", type: "select", options: PLATFORMS.map((p) => ({ value: p, label: p })), required: true },
  { key: "value", label: "URL / Value", type: "url", required: true, help: "e.g. https://facebook.com/... or tel:+201000000000" },
  { key: "label", label: "Accessible Label", type: "text", bilingual: true, required: true },
];

export default function AdminSocialSettingsPage() {
  const rows = useAdminData(getAdminSocialLinks);
  if (rows === undefined) return null;
  return (
    <CollectionManager
      table="social_links"
      title="Social Media"
      description="Shown in the Hero contact panel, the Footer and the Contact page, in this order."
      fields={fields}
      rows={rows}
      titleField="label"
      emptyRow={{ platform: "facebook", value: "", is_active: true }}
    />
  );
}
