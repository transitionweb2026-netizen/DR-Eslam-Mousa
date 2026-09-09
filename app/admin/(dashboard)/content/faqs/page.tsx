import { getAdminFaqs } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "question", label: "Question", type: "text", bilingual: true, required: true },
  { key: "answer", label: "Answer", type: "textarea", bilingual: true, required: true },
];

export default async function AdminFaqsPage() {
  const rows = await getAdminFaqs();
  return (
    <CollectionManager
      table="faqs"
      title="FAQs"
      description="Powers the Home page's FAQ accordion, in this order. All active FAQs are shown (10 in the seed data)."
      fields={fields}
      rows={rows}
      titleField="question"
      emptyRow={{ is_active: true }}
    />
  );
}
