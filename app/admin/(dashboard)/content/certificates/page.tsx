import { getAdminCertificates } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "image_id", label: "Certificate Image", type: "media", mediaCategory: "certificates" },
  { key: "year", label: "Year", type: "text", required: true },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "institution", label: "Institution", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description (optional)", type: "textarea", bilingual: true },
  { key: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
];

export default async function AdminCertificatesPage() {
  const rows = await getAdminCertificates();
  return (
    <CollectionManager
      table="certificates"
      title="Certificates"
      description="Powers the About page's horizontal certificate gallery, in this order."
      fields={fields}
      rows={rows}
      emptyRow={{ year: "", is_active: true }}
    />
  );
}
