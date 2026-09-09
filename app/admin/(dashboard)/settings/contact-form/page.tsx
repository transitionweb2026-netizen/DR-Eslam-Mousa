import { getContactFormSettings } from "@/lib/cms/adminSettingsQueries";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "title", label: "Form Title", type: "text", bilingual: true },
  { key: "description", label: "Form Description", type: "textarea", bilingual: true },
  { key: "success_message", label: "Success Message", type: "textarea", bilingual: true },
  { key: "error_message", label: "Validation Error Message", type: "textarea", bilingual: true },
  {
    key: "whatsapp_template",
    label: "WhatsApp Message Template",
    type: "textarea",
    bilingual: true,
    help: "Placeholders: {{name}} {{phone}} {{contactMethod}} {{date}} {{message}} — substituted with the patient's answers before WhatsApp opens.",
  },
];

export default async function AdminContactFormSettingsPage() {
  const settings = await getContactFormSettings();
  return (
    <SettingsForm
      table="contact_form_settings"
      title="Contact Form"
      description="The patient appointment-request form's copy and the WhatsApp message it generates. Field labels, placeholders and required state live in field_labels — edit those directly in the Supabase Table Editor for now."
      fields={fields}
      initialValues={settings ?? {}}
    />
  );
}
