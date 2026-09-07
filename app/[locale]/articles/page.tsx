import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { buildAlternates } from "@/lib/seo";
import { articles } from "@/data/articles";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/home/ArticleCard";
import { CTASection } from "@/components/home/CTASection";

const pageCopy = {
  eyebrow: { en: "From the Blog", ar: "من المدونة" },
  title: { en: "All Articles", ar: "كل المقالات" },
  description: {
    en: "Practical, easy-to-understand guidance on orthopedic health, all in one place.",
    ar: "إرشادات عملية وسهلة الفهم حول صحة العظام والمفاصل، في مكان واحد.",
  },
} satisfies Record<"eyebrow" | "title" | "description", Localized>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: pageCopy.title[locale],
    description: pageCopy.description[locale],
    alternates: buildAlternates(locale, "articles"),
  };
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <section className="px-4 pb-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <SectionHeader
          locale={locale}
          eyebrow={pageCopy.eyebrow}
          title={pageCopy.title}
          description={pageCopy.description}
          titleAs="h1"
          className="mx-auto max-w-3xl"
        />
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <StaggerItem key={article.id} className="h-full">
                <ArticleCard article={article} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
