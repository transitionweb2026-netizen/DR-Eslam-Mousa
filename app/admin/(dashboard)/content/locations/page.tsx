"use client";

import { getAdminContactLocations } from "@/lib/cms/adminQueries";
import { useAdminData } from "@/components/admin/useAdminData";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "map_url", label: "Map URL", type: "url", help: "Opened when this location's card is clicked — a Google Maps link/share URL." },
  { key: "name", label: "Location Name", type: "text", bilingual: true, required: true, help: "e.g. Nasr City" },
  { key: "address", label: "Address", type: "textarea", bilingual: true, required: true },
  { key: "hours", label: "Visiting Hours", type: "text", bilingual: true, help: "The specific days/times the doctor is at this branch, e.g. \"Sat 7 PM · Mon 8 PM\"." },
];

export default function AdminContactLocationsPage() {
  const rows = useAdminData(getAdminContactLocations);
  if (rows === undefined) return null;
  return (
    <CollectionManager
      table="contact_locations"
      title="Clinic Locations"
      description="Every branch shown on the Contact page and in the Footer. This is separate from Global Settings → Contact Information, which holds the phone/WhatsApp/email/general booking hours shared by every branch."
      fields={fields}
      rows={rows}
      titleField="name"
      emptyRow={{ name_en: "", name_ar: "", address_en: "", address_ar: "", is_active: true }}
    />
  );
}
