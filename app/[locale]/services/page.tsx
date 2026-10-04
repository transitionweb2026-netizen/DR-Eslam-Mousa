import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { getPageSeo } from "@/lib/cms/publicSeo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServicesSections } from "@/lib/cms/publicSections";
import { getServices, getConditions } from "@/lib/cms/publicContent";
import { getFinalCtaSettings, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";

import { Hero } from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AllServicesGrid } from "@/components/services/AllServicesGrid";
import { WhatWeTreatGrid } from "@/components/services/WhatWeTreatGrid";
import { ServicesVideosSection } from "@/components/services/ServicesVideosSection";
import { CTASection } from "@/components/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return buildPageMetadata(locale, "services", await getPageSeo("services"));
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  const [sections, services, conditions, cta, contactInfo, socialLinks] = await Promise.all([
    getServicesSections(),
    getServices(),
    getConditions(),
    getFinalCtaSettings(),
    getContactInfo(),
    getSocialLinks(),
  ]);

  const seo = await getPageSeo("services");

  return (
    <>
      <JsonLd data={[webPageJsonLd(locale, "services", seo.title[locale], seo.description[locale]), breadcrumbJsonLd(locale, "services")]} />
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: `${localeRoot}${sections.hero.primaryCta.url}` }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: `${localeRoot}${sections.hero.secondaryCta.url}` }}
        contactInfo={contactInfo}
        socialLinks={socialLinks}
      />

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="all-services-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="all-services-heading"
            eyebrow={sections.specialtiesIntro.eyebrow}
            title={sections.specialtiesIntro.title}
            description={sections.specialtiesIntro.description}
          />
          <AllServicesGrid locale={locale} specialties={services} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="what-we-treat-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="what-we-treat-heading"
            eyebrow={sections.conditionsIntro.eyebrow}
            title={sections.conditionsIntro.title}
            description={sections.conditionsIntro.description}
          />
          <WhatWeTreatGrid locale={locale} conditions={conditions} />
        </div>
      </section>

      {sections.servicesVideos && <ServicesVideosSection locale={locale} videos={sections.servicesVideos} />}

      <CTASection locale={locale} content={cta} />
    </>
  );
}
