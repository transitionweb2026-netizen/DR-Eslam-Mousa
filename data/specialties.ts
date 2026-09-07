import type { Localized, MediaImage } from "@/lib/types";

export type SpecialtyIcon =
  | "knee"
  | "hip"
  | "shoulder"
  | "joint"
  | "sports"
  | "arthroscopy";

export interface SpecialtyItem {
  id: string;
  slug: string;
  icon: SpecialtyIcon;
  title: Localized;
  description: Localized;
  image: MediaImage;
}

export const specialtiesIntro = {
  eyebrow: { en: "Areas of Expertise", ar: "مجالات الخبرة" } satisfies Localized,
  title: { en: "Top Medical Specialties", ar: "أبرز التخصصات الطبية" } satisfies Localized,
  description: {
    en: "A focused orthopedic practice covering the full spectrum of bone and joint care, from sports injuries to complex reconstructive surgery.",
    ar: "ممارسة متخصصة في جراحة العظام تغطي كل ما يتعلق بالعظام والمفاصل، من إصابات الملاعب وحتى جراحات إعادة البناء المعقدة.",
  } satisfies Localized,
};

export const specialties: SpecialtyItem[] = [
  {
    id: "knee-surgery",
    slug: "knee-surgery",
    icon: "knee",
    title: { en: "Knee Surgery", ar: "جراحة الركبة" },
    description: {
      en: "Advanced treatment for ligament tears, cartilage damage and degenerative knee conditions.",
      ar: "علاج متقدم لتمزقات الأربطة وتلف الغضاريف وحالات الركبة التنكسية.",
    },
    image: {
      src: "/images/specialties/specialty-knee-placeholder.svg",
      alt: { en: "Knee surgery specialty illustration", ar: "توضيح تخصص جراحة الركبة" },
    },
  },
  {
    id: "hip-surgery",
    slug: "hip-surgery",
    icon: "hip",
    title: { en: "Hip Surgery", ar: "جراحة الحوض" },
    description: {
      en: "Comprehensive care for hip pain, from conservative treatment to full hip replacement.",
      ar: "رعاية شاملة لآلام الحوض، من العلاج التحفظي وحتى الاستبدال الكامل للمفصل.",
    },
    image: {
      src: "/images/specialties/specialty-hip-placeholder.svg",
      alt: { en: "Hip surgery specialty illustration", ar: "توضيح تخصص جراحة الحوض" },
    },
  },
  {
    id: "shoulder-surgery",
    slug: "shoulder-surgery",
    icon: "shoulder",
    title: { en: "Shoulder Surgery", ar: "جراحة الكتف" },
    description: {
      en: "Restoring mobility for rotator cuff injuries, dislocations and chronic shoulder pain.",
      ar: "استعادة الحركة في إصابات الكفة المدورة والخلع وآلام الكتف المزمنة.",
    },
    image: {
      src: "/images/specialties/specialty-shoulder-placeholder.svg",
      alt: { en: "Shoulder surgery specialty illustration", ar: "توضيح تخصص جراحة الكتف" },
    },
  },
  {
    id: "joint-replacement",
    slug: "joint-replacement",
    icon: "joint",
    title: { en: "Joint Replacement", ar: "استبدال المفاصل" },
    description: {
      en: "Precision-implanted joint replacements designed for long-term durability and natural movement.",
      ar: "استبدال دقيق للمفاصل بأحدث التقنيات لضمان متانة طويلة الأمد وحركة طبيعية.",
    },
    image: {
      src: "/images/specialties/specialty-joint-placeholder.svg",
      alt: { en: "Joint replacement specialty illustration", ar: "توضيح تخصص استبدال المفاصل" },
    },
  },
  {
    id: "sports-injuries",
    slug: "sports-injuries",
    icon: "sports",
    title: { en: "Sports Injuries", ar: "إصابات الملاعب" },
    description: {
      en: "Rapid, precise treatment to get athletes and active patients safely back in motion.",
      ar: "علاج سريع ودقيق لإعادة الرياضيين والأشخاص النشطين إلى الحركة بأمان.",
    },
    image: {
      src: "/images/specialties/specialty-sports-placeholder.svg",
      alt: { en: "Sports injury specialty illustration", ar: "توضيح تخصص إصابات الملاعب" },
    },
  },
  {
    id: "arthroscopic-surgery",
    slug: "arthroscopic-surgery",
    icon: "arthroscopy",
    title: { en: "Arthroscopic Surgery", ar: "جراحة المناظير" },
    description: {
      en: "Minimally invasive keyhole surgery for faster recovery and less post-operative pain.",
      ar: "جراحة طفيفة التوغل عبر المنظار لتعافٍ أسرع وألم أقل بعد العملية.",
    },
    image: {
      src: "/images/specialties/specialty-arthroscopy-placeholder.svg",
      alt: { en: "Arthroscopic surgery specialty illustration", ar: "توضيح تخصص جراحة المناظير" },
    },
  },
];
