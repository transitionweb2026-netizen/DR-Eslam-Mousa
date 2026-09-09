import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { getAboutSections } from "@/lib/cms/publicSections";
import { getCertificates, getCareerMilestones, getStatistics, getServices } from "@/lib/cms/publicContent";

import { Hero } from "@/components/home/Hero";
import { AboutDoctorSection } from "@/components/about/AboutDoctorSection";
import { CertificatesSection } from "@/components/about/CertificatesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CareerSection } from "@/components/about/CareerSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { CTASection } from "@/components/home/CTASection";
import { getFinalCtaSettings } from "@/lib/cms/publicSettings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const { hero } = await getAboutSections();
  return {
    title: hero.content.headline[locale] + " " + hero.content.headlineAccent[locale],
    description: hero.content.description[locale],
    alternates: buildAlternates(locale, "about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  const [sections, certificates, careerMilestones, statistics, services, cta] = await Promise.all([
    getAboutSections(),
    getCertificates(),
    getCareerMilestones(),
    getStatistics(),
    getServices(),
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
      <AboutDoctorSection locale={locale} content={sections.aboutDoctor} />
      {sections.certificatesIntro && (
        <CertificatesSection locale={locale} intro={sections.certificatesIntro} certificates={certificates} />
      )}
      {sections.showStatistics && <StatsSection locale={locale} statistics={statistics} />}
      {sections.careerIntro && <CareerSection locale={locale} intro={sections.careerIntro} careerMilestones={careerMilestones} />}
      {sections.specialtiesIntro && (
        <SpecialtiesSection locale={locale} intro={sections.specialtiesIntro} specialties={services} />
      )}
      <CTASection locale={locale} content={cta} />
    </>
  );
}
