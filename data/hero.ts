import type { Localized, MediaImage } from "@/lib/types";

export interface HeroContent {
  eyebrow: Localized;
  headline: Localized;
  headlineAccent: Localized;
  description: Localized;
  image: MediaImage;
}

export const heroContent: HeroContent = {
  eyebrow: {
    en: "Orthopedic & Joint Replacement Surgeon",
    ar: "استشاري جراحة العظام والمفاصل",
  },
  headline: {
    en: "Precision Orthopedic Care,",
    ar: "رعاية دقيقة لعظامك ومفاصلك،",
  },
  headlineAccent: {
    en: "Built Around You",
    ar: "بأحدث الأساليب الطبية",
  },
  description: {
    en: "Dr. Islam Moussa blends surgical precision with modern, minimally invasive techniques to help every patient move without pain — from diagnosis to full recovery.",
    ar: "يجمع د. إسلام موسى بين الدقة الجراحية وأحدث تقنيات الجراحة طفيفة التوغل، لمساعدة كل مريض على الحركة دون ألم، من التشخيص وحتى التعافي الكامل.",
  },
  image: {
    // Swap this path for the doctor's real hero photograph when available —
    // the layout, framing and gradient treatment stay unchanged.
    src: "/images/hero/doctor-hero-placeholder.svg",
    alt: {
      en: "Dr. Islam Moussa, orthopedic surgeon, portrait placeholder",
      ar: "د. إسلام موسى، استشاري جراحة العظام، صورة توضيحية مؤقتة",
    },
    // The source SVG places the head/shoulders low in a tall (1200x1500)
    // canvas; the hero band is wide and short, so the crop window must be
    // anchored low too or it shows empty sky. Keep this in sync if the
    // placeholder (or a future real photo) changes framing.
    position: "center 82%",
  },
};
