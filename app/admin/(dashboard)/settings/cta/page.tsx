import { getCtaSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "is_visible", label: "Show on the site", type: "select", options: [{ value: "true", label: "Visible" }, { value: "false", label: "Hidden" }] },
  { key: "background_image_id", label: "Optional Background Image", type: "media", mediaCategory: "general" },
  { key: "primary_url", label: "Primary Button URL", type: "url" },
  { key: "secondary_url", label: "Secondary Button URL", type: "url" },
  { key: "heading", label: "Heading", type: "text", bilingual: true },
  { key: "description", label: "Description", type: "textarea", bilingual: true },
  { key: "primary_label", label: "Primary Button Label", type: "text", bilingual: true },
  { key: "secondary_label", label: "Secondary Button Label", type: "text", bilingual: true },
];

export default async function AdminCtaSettingsPage() {
  const cta = await getCtaSettings();
  return (
    <SettingsForm
      table="cta_settings"
      title="Final CTA"
      description="The ONE closing call-to-action card, shown at the bottom of every page (Home, About, Services, Videos, Articles, Contact). Editing it here updates it everywhere."
      fields={fields}
      initialValues={{ ...cta, is_visible: cta?.is_visible ? "true" : "false" }}
    />
  );
}
