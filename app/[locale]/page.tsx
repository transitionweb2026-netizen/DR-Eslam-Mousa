import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { siteContent } from "@/data/site";

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

  return (
    <>
      <Hero locale={locale} />
      <StatsSection locale={locale} />
      <DoctorIntroSection locale={locale} />
      <SpecialtiesSection locale={locale} />
      <ConditionsSection locale={locale} />
      <TrustSection locale={locale} />
      <FeaturedVideosSection locale={locale} />
      <FAQSection locale={locale} />
      <FeaturedArticlesSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
