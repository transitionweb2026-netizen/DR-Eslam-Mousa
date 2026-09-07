import type { Localized, MediaImage } from "@/lib/types";
import type { SpecialtyIcon } from "@/data/specialties";

export interface ConditionItem {
  id: string;
  slug: string;
  icon: SpecialtyIcon | "spine" | "neck";
  title: Localized;
  description: Localized;
  image: MediaImage;
}

export const conditionsIntro = {
  eyebrow: { en: "Find Your Treatment", ar: "ابحث عن علاجك" } satisfies Localized,
  title: { en: "What Are You Suffering From?", ar: "ما هي المشكلة التي تعاني منها؟" } satisfies Localized,
  description: {
    en: "Start from your symptom. Every pathway below leads to a tailored diagnostic and treatment plan.",
    ar: "ابدأ من العرض الذي تشعر به. كل حالة أدناه تقودك إلى خطة تشخيص وعلاج مخصصة لك.",
  } satisfies Localized,
};

export const conditions: ConditionItem[] = [
  {
    id: "knee-pain",
    slug: "knee-pain",
    icon: "knee",
    title: { en: "Knee Pain", ar: "ألم الركبة" },
    description: {
      en: "Persistent or sudden knee pain from injury, arthritis or overuse.",
      ar: "ألم مفاجئ أو مستمر في الركبة نتيجة إصابة أو التهاب مفاصل أو إجهاد.",
    },
    image: {
      src: "/images/conditions/condition-knee-placeholder.svg",
      alt: { en: "Knee pain condition illustration", ar: "توضيح حالة ألم الركبة" },
    },
  },
  {
    id: "back-pain",
    slug: "back-pain",
    icon: "spine",
    title: { en: "Back Pain", ar: "ألم الظهر" },
    description: {
      en: "Chronic or acute back pain affecting posture, mobility and daily comfort.",
      ar: "ألم مزمن أو حاد بالظهر يؤثر على الوضعية والحركة والراحة اليومية.",
    },
    image: {
      src: "/images/conditions/condition-back-placeholder.svg",
      alt: { en: "Back pain condition illustration", ar: "توضيح حالة ألم الظهر" },
    },
  },
  {
    id: "shoulder-pain",
    slug: "shoulder-pain",
    icon: "shoulder",
    title: { en: "Shoulder Pain", ar: "ألم الكتف" },
    description: {
      en: "Limited range of motion, stiffness or pain from shoulder injury or wear.",
      ar: "محدودية الحركة أو التيبس أو الألم الناتج عن إصابة أو تآكل الكتف.",
    },
    image: {
      src: "/images/conditions/condition-shoulder-placeholder.svg",
      alt: { en: "Shoulder pain condition illustration", ar: "توضيح حالة ألم الكتف" },
    },
  },
  {
    id: "neck-pain",
    slug: "neck-pain",
    icon: "neck",
    title: { en: "Neck Pain", ar: "ألم الرقبة" },
    description: {
      en: "Stiffness, nerve-related discomfort or chronic neck pain relief.",
      ar: "تيبس أو إزعاج مرتبط بالأعصاب أو ألم مزمن بالرقبة يحتاج إلى علاج.",
    },
    image: {
      src: "/images/conditions/condition-neck-placeholder.svg",
      alt: { en: "Neck pain condition illustration", ar: "توضيح حالة ألم الرقبة" },
    },
  },
  {
    id: "joint-pain",
    slug: "joint-pain",
    icon: "joint",
    title: { en: "Joint Pain", ar: "ألم المفاصل" },
    description: {
      en: "Swelling, stiffness or pain across one or multiple joints.",
      ar: "تورم أو تيبس أو ألم في مفصل واحد أو أكثر من مفاصل الجسم.",
    },
    image: {
      src: "/images/conditions/condition-joint-placeholder.svg",
      alt: { en: "Joint pain condition illustration", ar: "توضيح حالة ألم المفاصل" },
    },
  },
  {
    id: "sports-injuries",
    slug: "sports-injuries",
    icon: "sports",
    title: { en: "Sports Injuries", ar: "إصابات رياضية" },
    description: {
      en: "Sprains, strains and ligament injuries from training or competition.",
      ar: "التواءات وشد عضلي وإصابات أربطة ناتجة عن التمرين أو المنافسة.",
    },
    image: {
      src: "/images/conditions/condition-sports-placeholder.svg",
      alt: { en: "Sports injury condition illustration", ar: "توضيح حالة الإصابات الرياضية" },
    },
  },
];
