import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { IconName } from "@/components/icons/Icon";
import type { Localized } from "@/lib/types";
import { buildAlternates } from "@/lib/seo";
import { contactInfo, socialLinks } from "@/data/contact";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";

const pageCopy = {
  eyebrow: { en: "Get in Touch", ar: "تواصل معنا" },
  title: { en: "Contact Us", ar: "تواصل معنا" },
  description: {
    en: "Reach out directly — a dedicated online booking experience is coming soon.",
    ar: "تواصل معنا مباشرة، وقريبًا ستتوفر تجربة حجز إلكترونية مخصصة بالكامل.",
  },
} satisfies Record<"eyebrow" | "title" | "description", Localized>;

const details: Array<{ icon: IconName; label: Localized; value: string; href: string; external?: boolean }> = [
  { icon: "phone", label: { en: "Phone", ar: "الهاتف" }, value: contactInfo.phoneDisplay, href: contactInfo.phoneHref },
  {
    icon: "whatsapp",
    label: { en: "WhatsApp", ar: "واتساب" },
    value: contactInfo.phoneDisplay,
    href: contactInfo.whatsappHref,
    external: true,
  },
  { icon: "mail", label: { en: "Email", ar: "البريد الإلكتروني" }, value: contactInfo.email, href: contactInfo.emailHref },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: pageCopy.title[locale],
    description: pageCopy.description[locale],
    alternates: buildAlternates(locale, "contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeader
        locale={locale}
        eyebrow={pageCopy.eyebrow}
        title={pageCopy.title}
        description={pageCopy.description}
        titleAs="h1"
        className="mx-auto max-w-3xl"
      />

      <Reveal className="mx-auto mt-12 max-w-3xl">
        <GlassCard strong className="p-6 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {details.map((detail) => (
              <a
                key={detail.icon}
                href={detail.href}
                target={detail.external ? "_blank" : undefined}
                rel={detail.external ? "noreferrer noopener" : undefined}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white/[0.05] p-5 text-center transition-colors duration-300 hover:bg-white/[0.1]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <Icon name={detail.icon} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  {detail.label[locale]}
                </span>
                <span dir="ltr" className="text-sm font-bold text-brand-ink">
                  {detail.value}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 grid gap-4 border-t border-brand-line/70 pt-8 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Icon name="map-pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <p className="text-sm text-brand-muted">{contactInfo.address[locale]}</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <p className="text-sm text-brand-muted">{contactInfo.workingHours[locale]}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-brand-line/70 pt-8">
            {socialLinks
              .filter((social) => social.key !== "phone")
              .map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label[locale]}
                  className="glass-panel flex h-11 w-11 items-center justify-center rounded-xl text-brand-purple-glow transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue"
                >
                  <Icon name={social.key} className="h-4 w-4" />
                </a>
              ))}
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
