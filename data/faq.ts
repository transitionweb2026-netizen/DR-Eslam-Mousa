import type { Localized } from "@/lib/types";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const faqIntro = {
  eyebrow: { en: "Have Questions?", ar: "لديك أسئلة؟" } satisfies Localized,
  title: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" } satisfies Localized,
  description: {
    en: "Answers to what patients most often ask before their first visit.",
    ar: "إجابات على أكثر الأسئلة التي يطرحها المرضى قبل أول زيارة.",
  } satisfies Localized,
};

export const faqItems: FaqItem[] = [
  {
    id: "faq-01",
    question: { en: "What should I bring to my first appointment?", ar: "ماذا أحضر معي في أول زيارة؟" },
    answer: {
      en: "Please bring any prior imaging (X-rays, MRI, CT), a list of current medications and a summary of your symptoms and their duration.",
      ar: "يُرجى إحضار أي صور أشعة سابقة (أشعة سينية، رنين مغناطيسي، أشعة مقطعية)، وقائمة بالأدوية الحالية، وملخص لأعراضك ومدتها.",
    },
  },
  {
    id: "faq-02",
    question: { en: "Do I need a referral to book a consultation?", ar: "هل أحتاج إلى تحويل لحجز استشارة؟" },
    answer: {
      en: "No referral is required. You can book directly through the website, phone or WhatsApp.",
      ar: "لا تحتاج إلى تحويل. يمكنك الحجز مباشرة عبر الموقع أو الهاتف أو واتساب.",
    },
  },
  {
    id: "faq-03",
    question: { en: "How long does a typical joint replacement recovery take?", ar: "كم تستغرق فترة التعافي المعتادة من استبدال المفصل؟" },
    answer: {
      en: "Most patients resume light daily activity within 4–6 weeks, with full recovery typically within 3–6 months depending on the joint and procedure.",
      ar: "يستأنف معظم المرضى الأنشطة اليومية الخفيفة خلال 4-6 أسابيع، ويكتمل التعافي الكامل عادة خلال 3-6 أشهر حسب المفصل ونوع العملية.",
    },
  },
  {
    id: "faq-04",
    question: { en: "Is arthroscopic surgery painful?", ar: "هل جراحة المناظير مؤلمة؟" },
    answer: {
      en: "Because it's minimally invasive, arthroscopy typically involves significantly less pain and a faster recovery than open surgery.",
      ar: "نظرًا لكونها طفيفة التوغل، تتضمن جراحة المناظير عادة ألمًا أقل بكثير وتعافيًا أسرع مقارنة بالجراحة المفتوحة.",
    },
  },
  {
    id: "faq-05",
    question: { en: "Can sports injuries be treated without surgery?", ar: "هل يمكن علاج الإصابات الرياضية دون جراحة؟" },
    answer: {
      en: "Many sports injuries respond well to physiotherapy and conservative care. Surgery is recommended only when necessary.",
      ar: "تستجيب العديد من الإصابات الرياضية جيدًا للعلاج الطبيعي والرعاية التحفظية، ولا يُنصح بالجراحة إلا عند الضرورة.",
    },
  },
  {
    id: "faq-06",
    question: { en: "What age is appropriate for joint replacement?", ar: "ما هو العمر المناسب لاستبدال المفصل؟" },
    answer: {
      en: "There is no fixed age — the decision depends on joint damage, pain levels and how much they limit your daily life.",
      ar: "لا يوجد عمر محدد، فالقرار يعتمد على درجة تلف المفصل ومستوى الألم ومدى تأثيره على حياتك اليومية.",
    },
  },
  {
    id: "faq-07",
    question: { en: "How soon can I walk after knee surgery?", ar: "متى يمكنني المشي بعد جراحة الركبة؟" },
    answer: {
      en: "Depending on the procedure, many patients begin supported walking within 24 hours with guided physiotherapy.",
      ar: "حسب نوع العملية، يبدأ العديد من المرضى المشي بمساعدة خلال 24 ساعة مع متابعة العلاج الطبيعي.",
    },
  },
  {
    id: "faq-08",
    question: { en: "Do you offer online or remote consultations?", ar: "هل تتوفر استشارات عن بُعد؟" },
    answer: {
      en: "Yes, an initial remote consultation is available to review your case before an in-person visit is scheduled.",
      ar: "نعم، تتوفر استشارة أولية عن بُعد لمراجعة حالتك قبل تحديد موعد الزيارة الشخصية.",
    },
  },
  {
    id: "faq-09",
    question: { en: "What imaging is required before diagnosis?", ar: "ما هي الأشعة المطلوبة قبل التشخيص؟" },
    answer: {
      en: "This depends on your symptoms — commonly X-ray, and MRI for soft tissue or ligament concerns.",
      ar: "يعتمد ذلك على الأعراض، وعادةً ما تشمل الأشعة السينية، والرنين المغناطيسي في حالات الأنسجة الرخوة أو الأربطة.",
    },
  },
  {
    id: "faq-10",
    question: { en: "How can I book an appointment?", ar: "كيف يمكنني حجز موعد؟" },
    answer: {
      en: "Use the 'Book an Appointment' button anywhere on the site, or reach out directly by phone or WhatsApp.",
      ar: "استخدم زر 'احجز موعدك' في أي مكان بالموقع، أو تواصل مباشرة عبر الهاتف أو واتساب.",
    },
  },
];
