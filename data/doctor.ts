import type { Localized, MediaImage } from "@/lib/types";

/**
 * The About page's main biography section — one logical content group,
 * kept separate from the shorter Home page introduction in `doctorIntro.ts`.
 */
export interface DoctorBioContent {
  eyebrow: Localized;
  title: Localized;
  paragraphs: Localized<string[]>;
  supportingStatement: Localized;
  image: MediaImage;
}

export const doctorBioContent: DoctorBioContent = {
  eyebrow: { en: "Meet Dr. Islam Moussa", ar: "تعرف على د. إسلام موسى" },
  title: {
    en: "An Orthopedic Surgeon Devoted to Precise, Patient-First Care",
    ar: "جراح عظام يكرّس خبرته لرعاية دقيقة تضع المريض أولاً",
  },
  paragraphs: {
    en: [
      "Dr. Islam Moussa is an orthopedic and joint replacement surgeon with over 15 years of experience treating patients across the full spectrum of bone, joint and sports-related conditions.",
      "His approach is built on a simple principle: an accurate diagnosis first, then a treatment plan that fits the patient's life — not a standard protocol applied to every case. That has meant embracing minimally invasive and arthroscopic techniques wherever they offer a safer, faster path to recovery.",
      "Beyond the operating room, Dr. Moussa believes patients recover with more confidence when they understand exactly what is happening to their body and why a particular treatment is recommended — a philosophy that shapes every consultation.",
    ],
    ar: [
      "د. إسلام موسى استشاري جراحة العظام واستبدال المفاصل، ويحمل خبرة تمتد لأكثر من 15 عامًا في علاج كامل نطاق حالات العظام والمفاصل والإصابات الرياضية.",
      "يقوم أسلوبه على مبدأ بسيط: تشخيص دقيق أولاً، ثم خطة علاج تناسب حياة المريض، وليست بروتوكولًا موحدًا يُطبَّق على كل حالة. وهذا ما دفعه لتبني تقنيات المناظير والجراحة طفيفة التوغل كلما وفّرت طريقًا أكثر أمانًا وسرعة للتعافي.",
      "خارج غرفة العمليات، يؤمن د. موسى بأن المرضى يتعافون بثقة أكبر عندما يفهمون بدقة ما يحدث لأجسادهم ولماذا يُوصى بعلاج معين، وهذه الفلسفة تحكم كل استشارة يقدمها.",
    ],
  },
  supportingStatement: {
    en: "Every treatment plan starts with listening — because the best outcome is the one that fits your life, not just your scan.",
    ar: "تبدأ كل خطة علاجية بالإصغاء الجيد، لأن أفضل نتيجة هي التي تناسب حياتك، وليست فقط ما تظهره الأشعة.",
  },
  image: {
    src: "/images/about/doctor-about-placeholder.svg",
    alt: {
      en: "Dr. Islam Moussa, orthopedic surgeon, professional portrait placeholder",
      ar: "د. إسلام موسى، استشاري جراحة العظام، صورة مهنية توضيحية مؤقتة",
    },
    position: "center 30%",
  },
};
