import { getNavbarSettings, getSiteSettings } from "@/lib/cms/adminSettingsQueries";
import { getAdminNavigationItems } from "@/lib/cms/adminQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const navFields: FieldConfig[] = [
  { key: "logo_media_id", label: "Logo", type: "media", mediaCategory: "general" },
  { key: "org_name_en", label: "Doctor Name (English)", type: "text" },
  { key: "org_name_ar", label: "Doctor Name (Arabic)", type: "text" },
  { key: "appointment_url", label: "Appointment Button URL", type: "url" },
  { key: "appointment_label", label: "Appointment Button Label", type: "text", bilingual: true },
];

const navItemFields: FieldConfig[] = [
  { key: "url", label: "URL", type: "url", required: true },
  { key: "label", label: "Label", type: "text", bilingual: true, required: true },
];

export default async function AdminNavbarSettingsPage() {
  const [navbar, site, navItems] = await Promise.all([getNavbarSettings(), getSiteSettings(), getAdminNavigationItems()]);

  return (
    <SettingsForm
      table="navbar_settings"
      title="Navbar"
      description="The sticky navigation shown at the top of every page."
      fields={navFields}
      initialValues={{
        appointment_url: navbar?.appointment_url,
        appointment_label_en: navbar?.appointment_label_en,
        appointment_label_ar: navbar?.appointment_label_ar,
        org_name_en: site?.org_name_en,
        org_name_ar: site?.org_name_ar,
        logo_media_id: site?.logo_media_id,
      }}
    >
      <h2 className="mb-4 text-base font-bold text-brand-ink">Navigation Items</h2>
      <CollectionManager
        table="navigation_items"
        title=""
        fields={navItemFields}
        rows={navItems}
        titleField="label"
        hasFeatured={false}
        emptyRow={{ url: "/", is_active: true }}
      />
    </SettingsForm>
  );
}
