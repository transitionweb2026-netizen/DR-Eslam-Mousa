import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { siteContent } from "@/data/site";
// Trust points (the 5 icon+title+description items) have no dedicated CMS
// collection — they're stable, rarely-changed content, unlike the section's
// header text and portrait image (why_trust in page_sections, CMS-driven).
import { trustPoints } from "@/data/trustPoints";
import { getHomeSections } from "@/lib/cms/publicSections";
import { getServices, getConditions, getStatistics, getFeaturedVideos, getFaqs, getFeaturedArticles } from "@/lib/cms/publicContent";
import { getFinalCtaSettings } from "@/lib/cms/publicSettings";

import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { DoctorIntroSection } from "@/components/home/DoctorIntroSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { ConditionsSection } from "@/components/home/ConditionsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FeaturedVideosSection } from "@/components/home/FeaturedVideosSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedArticlesSection } from "@/components/home/FeaturedArticlesSection";
import { CTASection } from "@/components/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return {
    title: siteContent.seo.defaultTitle[locale],
    description: siteContent.seo.defaultDescription[locale],
    alternates: buildAlternates(locale, ""),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  const [sections, services, conditions, statistics, featuredVideos, faqItems, featuredArticles, cta] = await Promise.all([
    getHomeSections(),
    getServices(),
    getConditions(),
    getStatistics(),
    getFeaturedVideos(),
    getFaqs(),
    getFeaturedArticles(),
    getFinalCtaSettings(),
  ]);

  return (
    <>
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: `${localeRoot}${sections.hero.primaryCta.url}` }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: `${localeRoot}${sections.hero.secondaryCta.url}` }}
      />
      {sections.showStatistics && <StatsSection locale={locale} statistics={statistics} />}
      {sections.doctorIntro && <DoctorIntroSection locale={locale} content={sections.doctorIntro} />}
      {sections.specialtiesIntro && <SpecialtiesSection locale={locale} intro={sections.specialtiesIntro} specialties={services} />}
      {sections.conditionsIntro && <ConditionsSection locale={locale} intro={sections.conditionsIntro} conditions={conditions} />}
      {sections.whyTrust && <TrustSection locale={locale} content={sections.whyTrust} trustPoints={trustPoints} />}
      {sections.featuredVideosIntro && (
        <FeaturedVideosSection locale={locale} intro={sections.featuredVideosIntro} videos={featuredVideos} />
      )}
      {sections.faqIntro && <FAQSection locale={locale} intro={sections.faqIntro} faqItems={faqItems} />}
      {sections.featuredArticlesIntro && (
        <FeaturedArticlesSection locale={locale} intro={sections.featuredArticlesIntro} articles={featuredArticles} />
      )}
      <CTASection locale={locale} content={cta} />
    </>
  );
}
