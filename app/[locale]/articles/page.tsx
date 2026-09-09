import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { getArticlesHero } from "@/lib/cms/publicSections";
import { getArticles } from "@/lib/cms/publicContent";
import { getFinalCtaSettings } from "@/lib/cms/publicSettings";

import { Hero } from "@/components/home/Hero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { FeaturedArticle } from "@/components/articles/FeaturedArticle";
import { ArticleCard } from "@/components/home/ArticleCard";
import { CTASection } from "@/components/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const hero = await getArticlesHero();
  return {
    title: hero.content.headline[locale] + " " + hero.content.headlineAccent[locale],
    description: hero.content.description[locale],
    alternates: buildAlternates(locale, "articles"),
  };
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  const [hero, articles, cta] = await Promise.all([getArticlesHero(), getArticles(), getFinalCtaSettings()]);

  // The most recently published article leads the page as the large,
  // editorial feature; everything else fills the grid beneath it.
  const [mainArticle, ...restArticles] = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const otherArticles = restArticles.slice(0, 6);

  return (
    <>
      <Hero
        locale={locale}
        content={hero.content}
        primaryCta={{ label: hero.primaryCta.label, href: `${localeRoot}${hero.primaryCta.url}` }}
        secondaryCta={{ label: hero.secondaryCta.label, href: `${localeRoot}${hero.secondaryCta.url}` }}
      />

      {mainArticle && (
        <section className="px-4 pt-16 pb-4 sm:px-6 sm:pt-24 lg:px-8" aria-label="Featured article">
          <div className="mx-auto max-w-7xl">
            <FeaturedArticle article={mainArticle} locale={locale} />
          </div>
        </section>
      )}

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

      <CTASection locale={locale} content={cta} />
    </>
  );
}
