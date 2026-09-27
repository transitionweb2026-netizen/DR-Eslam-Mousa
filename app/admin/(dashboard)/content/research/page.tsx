import { getAdminResearchPapers } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const fields: FieldConfig[] = [
  { key: "journal_name", label: "Journal / Publication", type: "text", help: "e.g. The Journal of Bone & Joint Surgery" },
  { key: "publish_year", label: "Year", type: "text", help: "e.g. 2023" },
  { key: "external_url", label: "Link to Published Paper (optional)", type: "url", help: "DOI, PubMed, or the journal's own page." },
  { key: "image_id", label: "Cover Image (optional)", type: "media", mediaCategory: "articles" },
  { key: "title", label: "Title", type: "text", bilingual: true, required: true },
  { key: "excerpt", label: "Excerpt (shown on the card)", type: "textarea", bilingual: true },
  { key: "content", label: "Full Text (shown in the pop-up)", type: "richtext", bilingual: true },
];

export default async function AdminResearchPapersPage() {
  const rows = await getAdminResearchPapers();
  return (
    <CollectionManager
      table="research_papers"
      title="Research Papers"
      description="Real published research only — this starts empty on purpose. Cards appear on the About page; clicking one opens the full text. Hide a paper without deleting it if it's not ready yet."
      fields={fields}
      rows={rows}
      emptyRow={{ title_en: "", title_ar: "", is_active: true }}
    />
  );
}
