import { getContactSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "phone_display", label: "Phone (displayed)", type: "text", help: "e.g. 010 38794334" },
  { key: "phone_href", label: "Phone (tel: link)", type: "text", help: "e.g. tel:+201038794334" },
  { key: "whatsapp_number", label: "WhatsApp Number", type: "text", help: "Digits only with country code, e.g. 201004950774 — this is the ONE place the WhatsApp destination is configured." },
  { key: "email", label: "Email", type: "text" },
  { key: "working_hours", label: "General Booking Hours", type: "text", bilingual: true, help: "Reception/booking-line availability — NOT any one branch's visiting hours. Branch addresses and their own hours live under Content → Clinic Locations." },
];

export default async function AdminContactSettingsPage() {
  const contact = await getContactSettings();
  return (
    <SettingsForm
      table="contact_settings"
      title="Contact Information"
      description="Phone, WhatsApp, email and general booking hours — used on every page's Hero panel and in the Footer. For clinic branch addresses/maps/visiting hours, see Content → Clinic Locations."
      fields={fields}
      initialValues={contact ?? {}}
    />
  );
}
