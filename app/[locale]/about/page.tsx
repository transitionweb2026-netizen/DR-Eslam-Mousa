import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { getAboutSections } from "@/lib/cms/publicSections";
import {
  getCertificates,
  getCareerMilestones,
  getStatistics,
  getServices,
  getDoctorGallery,
  getResearchPapers,
  getReviews,
} from "@/lib/cms/publicContent";

import { Hero } from "@/components/home/Hero";
import { AboutDoctorSection } from "@/components/about/AboutDoctorSection";
import { CertificatesSection } from "@/components/about/CertificatesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CareerSection } from "@/components/about/CareerSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { ReviewsSection } from "@/components/about/ReviewsSection";
import { DoctorGallerySection } from "@/components/about/DoctorGallerySection";
import { ResearchSection } from "@/components/about/ResearchSection";
import { CTASection } from "@/components/home/CTASection";
import { getFinalCtaSettings, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";

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

  const [sections, certificates, careerMilestones, statistics, services, reviews, doctorGallery, researchPapers, cta, contactInfo, socialLinks] =
    await Promise.all([
      getAboutSections(),
      getCertificates(),
      getCareerMilestones(),
      getStatistics(),
      getServices(),
      getReviews(),
      getDoctorGallery(),
      getResearchPapers(),
      getFinalCtaSettings(),
      getContactInfo(),
      getSocialLinks(),
    ]);

  return (
    <>
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: `${localeRoot}${sections.hero.primaryCta.url}` }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: `${localeRoot}${sections.hero.secondaryCta.url}` }}
        contactInfo={contactInfo}
        socialLinks={socialLinks}
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
      {sections.reviewsIntro && reviews.length > 0 && (
        <ReviewsSection locale={locale} intro={sections.reviewsIntro} reviews={reviews} />
      )}
      {sections.doctorGalleryIntro && doctorGallery.length > 0 && (
        <DoctorGallerySection locale={locale} intro={sections.doctorGalleryIntro} photos={doctorGallery} />
      )}
      {sections.researchIntro && researchPapers.length > 0 && (
        <ResearchSection locale={locale} intro={sections.researchIntro} papers={researchPapers} />
      )}
      <CTASection locale={locale} content={cta} />
    </>
  );
}
