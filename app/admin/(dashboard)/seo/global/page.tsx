import { getSiteSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "website_title", label: "Website Title", type: "text" },
  { key: "website_url", label: "Website URL (canonical base)", type: "url" },
  { key: "default_og_image_id", label: "Default OG Image", type: "media", mediaCategory: "seo" },
  { key: "default_robots", label: "Default Robots", type: "text", help: "e.g. index,follow" },
  { key: "default_meta_description", label: "Default Meta Description", type: "textarea", bilingual: true, help: "Used by any page that doesn't set its own — see Page SEO for overrides." },
];

export default async function AdminGlobalSeoPage() {
  const site = await getSiteSettings();
  return (
    <SettingsForm
      table="site_settings"
      title="Global SEO"
      description="Site-wide SEO defaults. Every page, service, condition and article can still override these individually."
      fields={fields}
      initialValues={site ?? {}}
    />
  );
}
