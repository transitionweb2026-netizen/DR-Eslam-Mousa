import { getContactSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "phone_display", label: "Phone (displayed)", type: "text", help: "e.g. +20 100 000 0000" },
  { key: "phone_href", label: "Phone (tel: link)", type: "text", help: "e.g. tel:+201000000000" },
  { key: "whatsapp_number", label: "WhatsApp Number", type: "text", help: "Digits only with country code, e.g. 201000000000 — this is the ONE place the WhatsApp destination is configured." },
  { key: "email", label: "Email", type: "text" },
  { key: "map_url", label: "Map URL", type: "url", help: "Opened when the location image is clicked." },
  { key: "location_image_id", label: "Location Image", type: "media", mediaCategory: "general" },
  { key: "address", label: "Address", type: "textarea", bilingual: true },
  { key: "working_hours", label: "Working Hours", type: "text", bilingual: true },
  { key: "location_image_alt", label: "Location Image Alt Text", type: "text", bilingual: true },
];

export default async function AdminContactSettingsPage() {
  const contact = await getContactSettings();
  return (
    <SettingsForm
      table="contact_settings"
      title="Contact Information"
      description="Address, map, phone, WhatsApp and hours — used on the Contact page, the Hero panel and the Footer."
      fields={fields}
      initialValues={contact ?? {}}
    />
  );
}
