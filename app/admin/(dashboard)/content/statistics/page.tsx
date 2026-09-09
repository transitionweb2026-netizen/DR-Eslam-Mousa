import { getAdminStatistics } from "@/lib/cms/adminQueries";
import { CollectionManager, type FieldConfig } from "@/components/admin/CollectionManager";

const ICONS = ["experience", "procedures", "patients", "cases"];

const fields: FieldConfig[] = [
  { key: "icon", label: "Icon", type: "select", options: ICONS.map((i) => ({ value: i, label: i })) },
  { key: "value", label: "Number", type: "number", required: true },
  { key: "prefix", label: "Prefix (optional)", type: "text" },
  { key: "suffix", label: "Suffix", type: "text", help: "e.g. + or %" },
  { key: "label", label: "Label", type: "text", bilingual: true, required: true },
  { key: "description", label: "Description (optional)", type: "text", bilingual: true },
];

export default async function AdminStatisticsPage() {
  const rows = await getAdminStatistics();
  return (
    <CollectionManager
      table="statistics"
      title="Statistics"
      description="Shared, in this order, by both the Home page and the About page — edit once, both update."
      fields={fields}
      rows={rows}
      emptyRow={{ icon: "experience", value: 0, prefix: "", suffix: "+", is_active: true }}
    />
  );
}
