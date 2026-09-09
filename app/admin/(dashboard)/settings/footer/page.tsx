import { getFooterSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "description", label: "Tagline", type: "textarea", bilingual: true },
  { key: "copyright", label: "Copyright Line", type: "text", bilingual: true },
];

export default async function AdminFooterSettingsPage() {
  const footer = await getFooterSettings();
  return (
    <SettingsForm
      table="footer_settings"
      title="Footer"
      description="Shown at the bottom of every page. Logo, doctor name, navigation and social links are shared with the Navbar / Social Media settings."
      fields={fields}
      initialValues={footer ?? {}}
    />
  );
}
