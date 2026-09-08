import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { HeroContent } from "@/data/hero";
import { heroContent } from "@/data/hero";
import { specialtiesIntro } from "@/data/specialties";
import { conditionsIntro } from "@/data/conditions";
import { buildAlternates } from "@/lib/seo";

import { Hero } from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AllServicesGrid } from "@/components/services/AllServicesGrid";
import { WhatWeTreatGrid } from "@/components/services/WhatWeTreatGrid";
import { CTASection } from "@/components/home/CTASection";

const servicesHero: HeroContent = {
  ...heroContent,
  eyebrow: { en: "Services & Conditions", ar: "الخدمات والحالات" },
  headline: { en: "Orthopedic Surgery,", ar: "جراحة عظام" },
  headlineAccent: { en: "Tailored to Every Diagnosis", ar: "مصممة خصيصًا لكل تشخيص" },
  description: {
    en: "From full surgical specialties to the everyday conditions that bring patients in, explore every treatment Dr. Islam Moussa provides.",
    ar: "من التخصصات الجراحية الكاملة إلى الحالات اليومية التي تدفع المرضى لزيارته، تعرف على كل علاج يقدمه د. إسلام موسى.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: servicesHero.headline[locale] + " " + servicesHero.headlineAccent[locale],
    description: servicesHero.description[locale],
    alternates: buildAlternates(locale, "services"),
  };
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <Hero locale={locale} content={servicesHero} />

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="all-services-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="all-services-heading"
            eyebrow={specialtiesIntro.eyebrow}
            title={specialtiesIntro.title}
            description={specialtiesIntro.description}
          />
          <AllServicesGrid locale={locale} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="what-we-treat-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="what-we-treat-heading"
            eyebrow={conditionsIntro.eyebrow}
            title={conditionsIntro.title}
            description={conditionsIntro.description}
          />
          <WhatWeTreatGrid locale={locale} />
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
