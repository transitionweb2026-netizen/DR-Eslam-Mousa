import type { Localized } from "@/lib/types";

/**
 * Single source of truth for every contact + social placeholder used across
 * the site (Hero panel, Footer, and later the Contact page). Replace the
 * placeholder values below with the real details when available — nothing
 * else needs to change.
 */
export const contactInfo = {
  phoneDisplay: "+20 100 000 0000",
  phoneHref: "tel:+201000000000",
  whatsappHref: "https://wa.me/201000000000",
  email: "info@dr-islammoussa.com",
  emailHref: "mailto:info@dr-islammoussa.com",
  address: {
    en: "123 Corniche El Nile, Cairo, Egypt",
    ar: "123 كورنيش النيل، القاهرة، مصر",
  } satisfies Localized,
  workingHours: {
    en: "Sat – Thu · 10:00 AM – 8:00 PM",
    ar: "السبت - الخميس · 10 صباحًا - 8 مساءً",
  } satisfies Localized,
};

export interface SocialLink {
  key: "whatsapp" | "facebook" | "instagram" | "youtube" | "phone";
  label: Localized;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { key: "phone", label: { en: "Call", ar: "اتصال" }, href: contactInfo.phoneHref },
  { key: "whatsapp", label: { en: "WhatsApp", ar: "واتساب" }, href: contactInfo.whatsappHref },
  { key: "facebook", label: { en: "Facebook", ar: "فيسبوك" }, href: "https://facebook.com/dr.islam.moussa" },
  { key: "instagram", label: { en: "Instagram", ar: "إنستغرام" }, href: "https://instagram.com/dr.islam.moussa" },
  { key: "youtube", label: { en: "YouTube", ar: "يوتيوب" }, href: "https://youtube.com/@dr.islam.moussa" },
];
