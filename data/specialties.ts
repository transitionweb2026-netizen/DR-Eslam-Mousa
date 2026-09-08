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
  /** Longer paragraphs shown inside the Service detail modal. */
  details: Localized<string[]>;
  /** Short, scannable highlights shown inside the Service detail modal. */
  benefits: Localized<string[]>;
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
    details: {
      en: [
        "From ACL and meniscus repair to full knee replacement, treatment is matched to the exact cause of the pain rather than a one-size-fits-all protocol.",
        "Where possible, minimally invasive arthroscopic techniques are used to protect healthy tissue and shorten the road back to normal movement.",
      ],
      ar: [
        "من إصلاح الرباط الصليبي والغضروف الهلالي وحتى الاستبدال الكامل للركبة، يُحدَّد العلاج بدقة حسب سبب الألم وليس وفق بروتوكول موحد للجميع.",
        "كلما أمكن، تُستخدم تقنيات المنظار طفيفة التوغل للحفاظ على الأنسجة السليمة وتقصير رحلة العودة للحركة الطبيعية.",
      ],
    },
    benefits: {
      en: [
        "Precise diagnosis with modern imaging before any treatment decision",
        "Minimally invasive options whenever clinically appropriate",
        "Structured rehabilitation plan built around your goals",
      ],
      ar: [
        "تشخيص دقيق بالأشعة الحديثة قبل اتخاذ أي قرار علاجي",
        "خيارات طفيفة التوغل كلما سمحت الحالة الطبية بذلك",
        "خطة تأهيل منظمة مبنية على أهدافك الشخصية",
      ],
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
    details: {
      en: [
        "Hip pain rarely has one single cause, so every case begins with a careful clinical exam to distinguish arthritis, impingement and soft-tissue injury.",
        "When surgery is the right path, precision-implanted replacements are planned for natural movement and long-term durability, not just short-term pain relief.",
      ],
      ar: [
        "نادرًا ما يكون لألم الحوض سبب واحد فقط، لذلك يبدأ كل حالة بفحص إكلينيكي دقيق للتمييز بين الالتهاب المفصلي والانحشار وإصابات الأنسجة الرخوة.",
        "عندما تكون الجراحة هي الخيار الأنسب، يُخطَّط للاستبدال الدقيق للمفصل لضمان حركة طبيعية ومتانة طويلة الأمد، وليس فقط تخفيف الألم على المدى القصير.",
      ],
    },
    benefits: {
      en: [
        "Conservative treatment explored first whenever safe to do so",
        "Precision-implanted replacements for natural, lasting movement",
        "Clear guidance on the right timing for surgery",
      ],
      ar: [
        "استكشاف العلاج التحفظي أولاً كلما كان ذلك آمنًا",
        "استبدال دقيق للمفصل يضمن حركة طبيعية ودائمة",
        "إرشاد واضح حول التوقيت المناسب للجراحة",
      ],
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
    details: {
      en: [
        "The shoulder's wide range of motion makes it especially prone to instability and overuse injuries, from a first dislocation to a chronic rotator cuff tear.",
        "Treatment combines targeted physiotherapy with arthroscopic repair when needed, aiming to restore full, pain-free range of motion.",
      ],
      ar: [
        "يجعل المدى الحركي الواسع للكتف عرضة بشكل خاص لعدم الثبات وإصابات الإجهاد، بدءًا من أول خلع وحتى تمزق مزمن في الكفة المدورة.",
        "يجمع العلاج بين العلاج الطبيعي الموجّه وإصلاح المنظار عند الحاجة، بهدف استعادة مدى الحركة الكامل دون ألم.",
      ],
    },
    benefits: {
      en: [
        "Targeted physiotherapy protocols for instability and overuse",
        "Arthroscopic rotator cuff repair with faster recovery",
        "Follow-up plan focused on full return to daily and sports activity",
      ],
      ar: [
        "بروتوكولات علاج طبيعي موجّهة لعدم الثبات وإصابات الإجهاد",
        "إصلاح الكفة المدورة بالمنظار مع تعافٍ أسرع",
        "خطة متابعة تركز على العودة الكاملة للأنشطة اليومية والرياضية",
      ],
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
    details: {
      en: [
        "When a joint is too damaged by arthritis or injury to respond to conservative care, replacement can restore comfortable, confident movement.",
        "Modern implants and pre-operative planning are matched to each patient's anatomy and activity level, not applied as a standard template.",
      ],
      ar: [
        "عندما يكون المفصل متضررًا بشدة من الالتهاب أو الإصابة ولا يستجيب للعلاج التحفظي، يمكن للاستبدال أن يعيد الحركة المريحة والواثقة.",
        "تُختار الأطراف الصناعية الحديثة ويُخطَّط لها قبل الجراحة بما يتناسب مع تشريح كل مريض ومستوى نشاطه، وليس وفق نموذج موحّد.",
      ],
    },
    benefits: {
      en: [
        "Personalized implant selection and surgical planning",
        "Focus on long-term durability, not just short-term relief",
        "Structured post-operative rehabilitation from day one",
      ],
      ar: [
        "اختيار مخصص للطرف الصناعي وتخطيط جراحي دقيق",
        "التركيز على المتانة طويلة الأمد وليس فقط الراحة المؤقتة",
        "تأهيل منظم بعد العملية من اليوم الأول",
      ],
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
    details: {
      en: [
        "Athletes and active patients need both an accurate diagnosis and a realistic timeline — treatment is planned around getting back to sport safely, not just quickly.",
        "From ligament sprains to overuse tendon injuries, care blends hands-on treatment with a graduated return-to-play program.",
      ],
      ar: [
        "يحتاج الرياضيون والأشخاص النشطون إلى تشخيص دقيق وجدول زمني واقعي معًا، إذ يُخطَّط العلاج للعودة الآمنة للرياضة وليس فقط للعودة السريعة.",
        "من التواءات الأربطة إلى إصابات الأوتار الناتجة عن الإجهاد، يجمع العلاج بين الرعاية المباشرة وبرنامج تدريجي للعودة للنشاط.",
      ],
    },
    benefits: {
      en: [
        "Rapid assessment to avoid re-injury from delayed treatment",
        "Graduated return-to-play programs, not one-size-fits-all rest",
        "Close coordination with physiotherapy throughout recovery",
      ],
      ar: [
        "تقييم سريع لتجنب تكرار الإصابة بسبب تأخر العلاج",
        "برامج تدريجية للعودة للنشاط بدلاً من الراحة الموحّدة للجميع",
        "تنسيق وثيق مع العلاج الطبيعي طوال فترة التعافي",
      ],
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
    details: {
      en: [
        "A small camera and instruments inserted through tiny incisions allow many joint problems to be diagnosed and treated without opening the joint.",
        "Because healthy tissue is disturbed far less than in open surgery, most patients experience less pain and a noticeably faster path back to daily life.",
      ],
      ar: [
        "يسمح إدخال كاميرا صغيرة وأدوات دقيقة عبر شقوق صغيرة بتشخيص وعلاج العديد من مشكلات المفاصل دون فتح المفصل بالكامل.",
        "ولأن الأنسجة السليمة تتأثر بدرجة أقل بكثير مقارنة بالجراحة المفتوحة، يشعر معظم المرضى بألم أقل وعودة أسرع بشكل ملحوظ لحياتهم اليومية.",
      ],
    },
    benefits: {
      en: [
        "Small incisions with less disruption to healthy tissue",
        "Typically less post-operative pain than open surgery",
        "Faster return to daily activity for most patients",
      ],
      ar: [
        "شقوق صغيرة مع تأثير أقل على الأنسجة السليمة",
        "ألم أقل بعد العملية مقارنة بالجراحة المفتوحة في الغالب",
        "عودة أسرع للأنشطة اليومية لدى معظم المرضى",
      ],
    },
  },
];
