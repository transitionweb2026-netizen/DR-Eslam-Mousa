import type { Localized } from "@/lib/types";

export interface CtaContent {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
}

export const finalCtaContent: CtaContent = {
  eyebrow: { en: "Ready When You Are", ar: "نحن جاهزون لاستقبالك" },
  title: {
    en: "Take the First Step Toward Moving Freely Again",
    ar: "اتخذ خطوتك الأولى نحو الحركة الحرة من جديد",
  },
  description: {
    en: "Whether it's a nagging ache or a condition that needs surgical attention, Dr. Islam Moussa is here to guide you through every step, with clarity and care.",
    ar: "سواء كان الأمر ألمًا مزعجًا أو حالة تحتاج إلى تدخل جراحي، د. إسلام موسى هنا لمرافقتك في كل خطوة، بوضوح واهتمام حقيقي.",
  },
};
