import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { buildAlternates } from "@/lib/seo";
import { siteContent } from "@/data/site";
import { getContactSections } from "@/lib/cms/publicSections";
import { getContactInfo, getContactFormSettings } from "@/lib/cms/publicSettings";

import { Hero } from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LocationCard } from "@/components/contact/LocationCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Localized } from "@/lib/types";

const quickActionsLabel = { en: "Or reach us directly", ar: "أو تواصل معنا مباشرة" } as const satisfies Localized;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const { hero } = await getContactSections();
  return {
    title: hero.content.headline[locale] + " " + hero.content.headlineAccent[locale],
    description: hero.content.description[locale],
    alternates: buildAlternates(locale, "contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const localeRoot = `/${locale}`;

  const [sections, contactInfo, contactFormSettings] = await Promise.all([
    getContactSections(),
    getContactInfo(),
    getContactFormSettings(),
  ]);

  return (
    <>
      <Hero
        locale={locale}
        content={sections.hero.content}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: `${localeRoot}${sections.hero.secondaryCta.url}` }}
      />

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="contact-heading"
            eyebrow={sections.contactIntro.eyebrow}
            title={sections.contactIntro.title}
            description={sections.contactIntro.description}
          />

          <div className="mx-auto mt-12 grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal scale delay={0.05}>
              <LocationCard locale={locale} contactInfo={contactInfo} />
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <ContactForm
                  locale={locale}
                  fieldLabels={contactFormSettings.fieldLabels}
                  successMessage={contactFormSettings.successMessage}
                  errorMessage={contactFormSettings.errorMessage}
                  whatsappTemplate={contactFormSettings.whatsappTemplate}
                  whatsappHref={contactInfo.whatsappHref}
                />

                <div className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-start">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    {quickActionsLabel[locale]}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={contactInfo.phoneHref}
                      aria-label={siteContent.actions.contactUs[locale]}
                      className="glass-panel flex h-11 w-11 items-center justify-center rounded-xl text-brand-purple-glow transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue"
                    >
                      <Icon name="phone" className="h-4 w-4" />
                    </a>
                    <a
                      href={contactInfo.whatsappHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="WhatsApp"
                      className="glass-panel flex h-11 w-11 items-center justify-center rounded-xl text-brand-purple-glow transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue"
                    >
                      <Icon name="whatsapp" className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 border-t border-brand-line/70 pt-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <p className="text-sm text-brand-muted">{contactInfo.workingHours[locale]}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <a href={contactInfo.emailHref} dir="ltr" className="text-sm text-brand-muted hover:text-brand-blue">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
