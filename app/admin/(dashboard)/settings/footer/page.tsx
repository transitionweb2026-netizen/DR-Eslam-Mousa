"use client";

import { getFooterSettings } from "@/lib/cms/adminSettingsQueries";
import { useAdminData } from "@/components/admin/useAdminData";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "description", label: "Tagline", type: "textarea", bilingual: true },
  { key: "copyright", label: "Copyright Line", type: "text", bilingual: true },
];

export default function AdminFooterSettingsPage() {
  const footer = useAdminData(getFooterSettings);
  if (footer === undefined) return null;
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
