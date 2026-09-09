import { getSiteSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "website_title", label: "Website Title", type: "text" },
  { key: "website_url", label: "Website URL", type: "url" },
  { key: "logo_media_id", label: "Logo", type: "media", mediaCategory: "general" },
  { key: "favicon_media_id", label: "Favicon", type: "media", mediaCategory: "general" },
  { key: "default_og_image_id", label: "Default OG Image", type: "media", mediaCategory: "seo", help: "Used for social share previews when a page doesn't set its own." },
  { key: "default_language", label: "Default Language", type: "select", options: [{ value: "en", label: "English" }, { value: "ar", label: "Arabic" }] },
  { key: "default_robots", label: "Default Robots", type: "text", help: "e.g. index,follow" },
  { key: "org_name", label: "Organization / Doctor Name", type: "text", bilingual: true },
  { key: "doctor_credentials", label: "Doctor Credentials", type: "text", bilingual: true },
  { key: "default_meta_description", label: "Default Meta Description", type: "textarea", bilingual: true },
];

export default async function AdminWebsiteSettingsPage() {
  const site = await getSiteSettings();
  return (
    <SettingsForm
      table="site_settings"
      title="Website Settings"
      description="Global identity and the SEO defaults used when a page doesn't set its own (see the SEO section for per-page overrides)."
      fields={fields}
      initialValues={site ?? {}}
    />
  );
}
