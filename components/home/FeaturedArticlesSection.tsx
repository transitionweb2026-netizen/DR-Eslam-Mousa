import type { ArticleItem } from "@/data/articles";
import { siteContent } from "@/data/site";
import type { IntroContent } from "@/lib/cms/publicSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { ArticleCard } from "./ArticleCard";

interface FeaturedArticlesSectionProps {
  locale: Locale;
  intro: IntroContent;
  articles: ArticleItem[];
}

export function FeaturedArticlesSection({ locale, intro, articles }: FeaturedArticlesSectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="articles-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="articles-heading"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem key={article.id} className="h-full">
              <ArticleCard article={article} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button href={`/${locale}/articles`} variant="secondary" withArrow>
            {siteContent.actions.viewAllArticles[locale]}
          </Button>
        </div>
      </div>
    </section>
  );
}
