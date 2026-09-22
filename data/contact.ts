import type { Localized } from "@/lib/types";

/**
 * Single source of truth for every contact + social placeholder used across
 * the site (Hero panel, Footer, and the Contact page) when Supabase is
 * unavailable — see lib/cms/publicSettings.ts, which reads the real,
 * CMS-editable values these mirror.
 */
export const contactInfo = {
  phoneDisplay: "010 38794334",
  phoneHref: "tel:+201038794334",
  whatsappHref: "https://wa.me/201004950774",
  email: "moussaislam059@gmail.com",
  emailHref: "mailto:moussaislam059@gmail.com",
  /** General reception/booking-line hours — not any one branch's visiting hours, see contactLocations. */
  workingHours: {
    en: "Sat 4–10 PM · Sun–Thu 10 AM–10 PM",
    ar: "السبت من ٤ إلى ١٠ م · الأحد إلى الخميس من ١٠ ص إلى ١٠ م",
  } satisfies Localized,
};

export interface ContactLocation {
  id: string;
  name: Localized;
  address: Localized;
  /** This branch's specific visiting hours (a doctor is only physically present on these days). */
  hours: Localized;
  mapUrl: string;
}

/** The clinic's branches, in display order — see lib/cms/publicSettings.ts's getContactLocations() for the CMS-editable version. */
export const contactLocations: ContactLocation[] = [
  {
    id: "nasr-city",
    name: { en: "Nasr City", ar: "مدينة نصر" },
    address: {
      en: "7 Abbas El Akkad St., Nasr City — First District (behind the Koshary El Tahrir building)",
      ar: "٧ شارع عباس العقاد، مدينة نصر - المنطقة الأولى - خلف عمارة كشري التحرير",
    },
    hours: {
      en: "Sat 7 PM · Mon 8 PM · Wed 7:30 PM",
      ar: "السبت ٧ م · الاثنين ٨ م · الأربعاء ٧:٣٠ م",
    },
    mapUrl: "https://maps.app.goo.gl/rUdHWFqxTYnyNdDk8?g_st=iw",
  },
  {
    id: "fifth-settlement",
    name: { en: "5th Settlement", ar: "التجمع الخامس" },
    address: {
      en: "164 North 90th St., 2nd Floor, next to Shifa Hospital",
      ar: "١٦٤ شارع التسعين الشمالي، الدور الثاني، بجوار مستشفى شفا",
    },
    hours: {
      en: "Thu 6 PM",
      ar: "الخميس ٦ م",
    },
    mapUrl: "https://maps.google.com/?q=30.021166,31.434963",
  },
];

export interface SocialLink {
  key: "whatsapp" | "facebook" | "instagram" | "youtube" | "phone";
  label: Localized;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { key: "phone", label: { en: "Call", ar: "اتصال" }, href: contactInfo.phoneHref },
  { key: "whatsapp", label: { en: "WhatsApp", ar: "واتساب" }, href: contactInfo.whatsappHref },
  { key: "facebook", label: { en: "Facebook", ar: "فيسبوك" }, href: "https://www.facebook.com/DrIslamMoussa.Clinic" },
  { key: "instagram", label: { en: "Instagram", ar: "إنستغرام" }, href: "https://www.instagram.com/dr.islam.sayed.moussa/" },
];
