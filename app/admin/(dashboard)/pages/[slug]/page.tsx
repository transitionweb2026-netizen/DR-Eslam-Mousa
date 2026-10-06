import { notFound } from "next/navigation";
import { PageEditor } from "./PageEditor";

// The admin editor only exists for these six pages (the public URL names,
// mapped to their database slugs inside PageEditor).
const SECTION_PAGE_SLUGS = ["home", "about", "services", "videos", "articles", "contact"] as const;

export function generateStaticParams() {
  return SECTION_PAGE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function AdminPageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(SECTION_PAGE_SLUGS as readonly string[]).includes(slug)) notFound();
  return <PageEditor urlSlug={slug} />;
}
