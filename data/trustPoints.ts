import type { Localized, MediaImage } from "@/lib/types";

export interface TrustPoint {
  id: string;
  icon: "experience" | "patient" | "technique" | "plan" | "safety";
  title: Localized;
  description: Localized;
}

export const trustContent = {
  eyebrow: { en: "Why Choose Us", ar: "لماذا تختارنا" } satisfies Localized,
  title: { en: "Why Trust Dr. Islam Moussa?", ar: "لماذا تثق في د. إسلام موسى؟" } satisfies Localized,
  description: {
    en: "A track record built on precision, transparency and genuine care for every patient's outcome.",
    ar: "سجل حافل مبني على الدقة والشفافية والاهتمام الحقيقي بنتيجة كل مريض.",
  } satisfies Localized,
  portrait: {
    src: "/images/trust/doctor-portrait-placeholder.svg",
    alt: {
      en: "Portrait placeholder of Dr. Islam Moussa",
      ar: "صورة توضيحية مؤقتة للدكتور إسلام موسى",
    },
  } satisfies MediaImage,
};

export const trustPoints: TrustPoint[] = [
  {
    id: "experience",
    icon: "experience",
    title: { en: "Extensive Orthopedic Experience", ar: "خبرة واسعة في جراحة العظام" },
    description: {
      en: "Over 15 years treating complex bone, joint and sports-related conditions.",
      ar: "أكثر من 15 عامًا في علاج حالات العظام والمفاصل والإصابات الرياضية المعقدة.",
    },
  },
  {
    id: "patient",
    icon: "patient",
    title: { en: "Patient-Centered Care", ar: "رعاية تتمحور حول المريض" },
    description: {
      en: "Every treatment plan starts with truly listening to your story and goals.",
      ar: "تبدأ كل خطة علاجية بالاستماع الحقيقي لقصتك وأهدافك.",
    },
  },
  {
    id: "technique",
    icon: "technique",
    title: { en: "Modern Treatment Techniques", ar: "تقنيات علاجية حديثة" },
    description: {
      en: "Minimally invasive and arthroscopic methods for faster, safer recovery.",
      ar: "أساليب طفيفة التوغل وجراحة المناظير لتعافٍ أسرع وأكثر أمانًا.",
    },
  },
  {
    id: "plan",
    icon: "plan",
    title: { en: "Personalized Treatment Plans", ar: "خطط علاج مخصصة" },
    description: {
      en: "No two patients are alike — care is tailored to your body and lifestyle.",
      ar: "لا يوجد مريضان متشابهان، لذا تُصمَّم الرعاية بما يناسب جسمك وأسلوب حياتك.",
    },
  },
  {
    id: "safety",
    icon: "safety",
    title: { en: "Precision and Safety", ar: "الدقة والأمان" },
    description: {
      en: "Rigorous surgical standards and post-operative monitoring at every step.",
      ar: "معايير جراحية دقيقة ومتابعة حريصة بعد العملية في كل خطوة.",
    },
  },
];
