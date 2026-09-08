import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { HeroContent } from "@/data/hero";
import { heroContent } from "@/data/hero";
import { buildAlternates } from "@/lib/seo";
import { articles } from "@/data/articles";

import { Hero } from "@/components/home/Hero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { ArticleCard } from "@/components/home/ArticleCard";
import { CTASection } from "@/components/home/CTASection";

const articlesHero: HeroContent = {
  ...heroContent,
  eyebrow: { en: "From the Blog", ar: "من المدونة" },
  headline: { en: "Practical Guidance,", ar: "إرشادات عملية" },
  headlineAccent: { en: "Written for Real Patients", ar: "مكتوبة لمرضى حقيقيين" },
  description: {
    en: "Easy-to-understand articles on orthopedic health — the same clear explanations Dr. Islam Moussa gives in the clinic, in writing.",
    ar: "مقالات سهلة الفهم حول صحة العظام والمفاصل، بنفس الشروحات الواضحة التي يقدمها د. إسلام موسى في العيادة، مكتوبة هنا.",
  },
};

// The most recently published article leads the page as the large,
// editorial feature; everything else fills the grid beneath it.
const [mainArticle, ...restArticles] = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const otherArticles = restArticles.slice(0, 6);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: articlesHero.headline[locale] + " " + articlesHero.headlineAccent[locale],
    description: articlesHero.description[locale],
    alternates: buildAlternates(locale, "articles"),
  };
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <Hero locale={locale} content={articlesHero} />

      <section className="px-4 pt-16 pb-4 sm:px-6 sm:pt-24 lg:px-8" aria-label="Featured article">
        <div className="mx-auto max-w-7xl">
          <FeaturedArticle article={mainArticle} locale={locale} />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-label="More articles">
        <div className="mx-auto max-w-7xl">
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherArticles.map((article) => (
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
