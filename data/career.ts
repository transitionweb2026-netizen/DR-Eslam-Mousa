import type { Localized } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";

export const careerIntro = {
  eyebrow: { en: "The Journey", ar: "المسيرة المهنية" } satisfies Localized,
  title: { en: "A Career Built on Precision", ar: "مسيرة مهنية قائمة على الدقة" } satisfies Localized,
  description: {
    en: "From medical school to specialized fellowship training, every stage shaped a practice centered on careful, evidence-based care.",
    ar: "من كلية الطب إلى التدريب التخصصي، شكّلت كل مرحلة ممارسة طبية تقوم على الدقة والرعاية المبنية على الأدلة العلمية.",
  } satisfies Localized,
};

export interface CareerMilestone {
  id: string;
  year: string;
  icon: IconName;
  title: Localized;
  institution: Localized;
  description: Localized;
}

export const careerMilestones: CareerMilestone[] = [
  {
    id: "milestone-education",
    year: "2004",
    icon: "plan",
    title: { en: "Medical Degree", ar: "بكالوريوس الطب والجراحة" },
    institution: { en: "Faculty of Medicine, Cairo University", ar: "كلية الطب، جامعة القاهرة" },
    description: {
      en: "Graduated with honors, developing an early focus on musculoskeletal anatomy and surgical technique.",
      ar: "تخرج بتقدير امتياز، مع تركيز مبكر على تشريح الجهاز الحركي والمهارات الجراحية.",
    },
  },
  {
    id: "milestone-residency",
    year: "2007",
    icon: "technique",
    title: { en: "Orthopedic Residency", ar: "الإقامة الطبية في جراحة العظام" },
    institution: { en: "Cairo University Hospitals", ar: "مستشفيات جامعة القاهرة" },
    description: {
      en: "Completed a rigorous residency across trauma, spine and joint surgery, building the foundation for a broad surgical practice.",
      ar: "أتم فترة إقامة مكثفة شملت جراحة الإصابات والعمود الفقري والمفاصل، لتشكل أساسًا لممارسة جراحية شاملة.",
    },
  },
  {
    id: "milestone-fellowship",
    year: "2011",
    icon: "safety",
    title: { en: "Joint Replacement Fellowship", ar: "زمالة استبدال المفاصل" },
    institution: { en: "Royal College of Surgeons", ar: "الكلية الملكية للجراحين" },
    description: {
      en: "Specialized fellowship training in hip and knee replacement, focused on precision implant planning.",
      ar: "تدريب تخصصي في زمالة استبدال مفصلي الحوض والركبة، مع تركيز على التخطيط الدقيق للأطراف الصناعية.",
    },
  },
  {
    id: "milestone-arthroscopy",
    year: "2015",
    icon: "arthroscopy",
    title: { en: "Advanced Arthroscopic Training", ar: "تدريب متقدم في جراحة المناظير" },
    institution: { en: "International Society of Arthroscopy", ar: "الجمعية الدولية لجراحة المناظير" },
    description: {
      en: "Advanced certification in minimally invasive arthroscopic techniques for faster, safer patient recovery.",
      ar: "شهادة متقدمة في تقنيات المناظير طفيفة التوغل لتعافٍ أسرع وأكثر أمانًا للمرضى.",
    },
  },
  {
    id: "milestone-consultant",
    year: "2018",
    icon: "experience",
    title: { en: "Senior Consultant", ar: "استشاري أول" },
    institution: { en: "Private Orthopedic Practice, Cairo", ar: "عيادة خاصة لجراحة العظام، القاهرة" },
    description: {
      en: "Established an independent practice built on the same principle: precise diagnosis before any treatment decision.",
      ar: "أسس ممارسة طبية مستقلة تقوم على المبدأ نفسه: تشخيص دقيق قبل اتخاذ أي قرار علاجي.",
    },
  },
  {
    id: "milestone-today",
    year: "2026",
    icon: "patients",
    title: { en: "Today", ar: "اليوم" },
    institution: { en: "Dr. Islam Moussa Orthopedic Clinic", ar: "عيادة د. إسلام موسى لجراحة العظام" },
    description: {
      en: "Continuing to treat complex bone, joint and sports-related cases with the same care given to the very first patient.",
      ar: "يواصل علاج الحالات المعقدة للعظام والمفاصل والإصابات الرياضية بنفس القدر من العناية التي قدمها لأول مريض له.",
    },
  },
];
