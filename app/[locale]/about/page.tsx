import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { HeroContent } from "@/data/hero";
import { heroContent } from "@/data/hero";
import { siteContent } from "@/data/site";
import { buildAlternates } from "@/lib/seo";

import { Hero } from "@/components/home/Hero";
import { AboutDoctorSection } from "@/components/about/AboutDoctorSection";
import { CertificatesSection } from "@/components/about/CertificatesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CareerSection } from "@/components/about/CareerSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { CTASection } from "@/components/home/CTASection";

const aboutHero: HeroContent = {
  ...heroContent,
  eyebrow: { en: "About the Surgeon", ar: "عن الجراح" },
  headline: { en: "15+ Years of Precision Orthopedic", ar: "أكثر من 15 عامًا من جراحة العظام" },
  headlineAccent: { en: "Care & Expertise", ar: "الدقيقة والخبرة الموثوقة" },
  description: {
    en: "Dr. Islam Moussa combines surgical precision, modern technique and genuine, patient-centered care — a career built one careful diagnosis at a time.",
    ar: "يجمع د. إسلام موسى بين الدقة الجراحية والأساليب الحديثة والرعاية الحقيقية المتمحورة حول المريض، في مسيرة مهنية بُنيت على تشخيص دقيق لكل حالة.",
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
    title: aboutHero.headline[locale] + " " + aboutHero.headlineAccent[locale],
    description: aboutHero.description[locale],
    alternates: buildAlternates(locale, "about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  return (
    <>
      <Hero
        locale={locale}
        content={aboutHero}
        primaryCta={{ label: siteContent.actions.bookAppointment, href: `${localeRoot}/contact` }}
        secondaryCta={{ label: siteContent.actions.contactUs, href: `${localeRoot}/contact` }}
      />
      <AboutDoctorSection locale={locale} />
      <CertificatesSection locale={locale} />
      <StatsSection locale={locale} />
      <CareerSection locale={locale} />
      <SpecialtiesSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
