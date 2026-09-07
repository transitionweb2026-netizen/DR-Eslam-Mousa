import type { Localized } from "@/lib/types";

/**
 * Global site identity, SEO defaults and reusable UI microcopy.
 * One logical content group — the future CMS "Site Settings" singleton.
 */
export const siteContent = {
  brand: {
    name: "Dr. Islam Moussa" as const,
    nameLocalized: {
      en: "Dr. Islam Moussa",
      ar: "د. إسلام موسى",
    } satisfies Localized,
    credentials: {
      en: "Orthopedic & Joint Replacement Surgeon",
      ar: "استشاري جراحة العظام والمفاصل",
    } satisfies Localized,
  },

  seo: {
    titleTemplate: {
      en: "%s | Dr. Islam Moussa — Orthopedic Surgeon",
      ar: "%s | د. إسلام موسى - استشاري جراحة العظام",
    } satisfies Localized,
    defaultTitle: {
      en: "Dr. Islam Moussa | Orthopedic & Joint Replacement Surgeon",
      ar: "د. إسلام موسى | استشاري جراحة العظام والمفاصل",
    } satisfies Localized,
    defaultDescription: {
      en: "Dr. Islam Moussa is an orthopedic surgeon specializing in joint replacement, arthroscopic surgery and sports injuries — combining surgical precision with patient-centered, modern care.",
      ar: "د. إسلام موسى استشاري جراحة العظام والمفاصل، متخصص في جراحات استبدال المفاصل والمناظير وإصابات الملاعب، يجمع بين الدقة الجراحية والرعاية الحديثة المتمحورة حول المريض.",
    } satisfies Localized,
    keywords: {
      en: ["orthopedic surgeon", "joint replacement", "arthroscopic surgery", "sports injuries", "knee surgery", "hip surgery"],
      ar: ["جراح عظام", "استبدال المفاصل", "جراحة المناظير", "إصابات الملاعب", "جراحة الركبة", "جراحة الحوض"],
    } satisfies Localized<string[]>,
  },

  /** Shared action labels reused across Navbar, Hero, CTA sections, etc. */
  actions: {
    bookAppointment: { en: "Book an Appointment", ar: "احجز موعدك" } satisfies Localized,
    exploreServices: { en: "Explore Services", ar: "استكشف الخدمات" } satisfies Localized,
    contactUs: { en: "Contact Us", ar: "تواصل معنا" } satisfies Localized,
    readMore: { en: "Read More", ar: "اقرأ المزيد" } satisfies Localized,
    learnMore: { en: "Learn More", ar: "اعرف المزيد" } satisfies Localized,
    viewAllServices: { en: "View All Services", ar: "عرض كل الخدمات" } satisfies Localized,
    exploreAllConditions: { en: "Explore All Conditions", ar: "استكشف كل الحالات" } satisfies Localized,
    viewAllVideos: { en: "View All Videos", ar: "عرض كل الفيديوهات" } satisfies Localized,
    viewAllArticles: { en: "View All Articles", ar: "عرض كل المقالات" } satisfies Localized,
    learnMoreAboutDoctor: { en: "Learn More About Dr. Islam Moussa", ar: "تعرف أكثر على د. إسلام موسى" } satisfies Localized,
    close: { en: "Close", ar: "إغلاق" } satisfies Localized,
    play: { en: "Play video", ar: "تشغيل الفيديو" } satisfies Localized,
    menu: { en: "Menu", ar: "القائمة" } satisfies Localized,
    minRead: { en: "min read", ar: "دقائق قراءة" } satisfies Localized,
    skipToContent: { en: "Skip to content", ar: "تخطَّ إلى المحتوى" } satisfies Localized,
    videoComingSoon: { en: "Full video coming soon.", ar: "الفيديو الكامل قريبًا." } satisfies Localized,
  },

  footer: {
    tagline: {
      en: "Precision orthopedic care, guided by modern medicine and genuine compassion.",
      ar: "رعاية دقيقة لعظامك ومفاصلك، بأحدث الأساليب الطبية وبعناية إنسانية حقيقية.",
    } satisfies Localized,
    quickLinksTitle: { en: "Quick Links", ar: "روابط سريعة" } satisfies Localized,
    contactTitle: { en: "Get in Touch", ar: "تواصل معنا" } satisfies Localized,
    followTitle: { en: "Follow", ar: "تابعنا" } satisfies Localized,
    rights: {
      en: "All rights reserved.",
      ar: "جميع الحقوق محفوظة.",
    } satisfies Localized,
  },
} as const;
