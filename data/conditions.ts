import type { Localized, MediaImage } from "@/lib/types";
import type { SpecialtyIcon } from "@/data/specialties";

export interface ConditionItem {
  id: string;
  slug: string;
  icon: SpecialtyIcon | "spine" | "neck";
  title: Localized;
  description: Localized;
  image: MediaImage;
  /** Longer paragraphs shown inside the Condition detail modal. */
  details: Localized<string[]>;
  /** Short, scannable highlights shown inside the Condition detail modal. */
  benefits: Localized<string[]>;
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
    details: {
      en: [
        "Knee pain can come from a sudden twisting injury, gradual cartilage wear, or overuse from training — each points to a different treatment path.",
        "A precise diagnosis, usually supported by imaging, is the first step toward a plan that fits the true cause rather than the symptom alone.",
      ],
      ar: [
        "قد ينشأ ألم الركبة عن إصابة مفاجئة بالالتواء، أو تآكل تدريجي في الغضروف، أو إجهاد ناتج عن التمرين، وكل سبب يقود إلى مسار علاجي مختلف.",
        "التشخيص الدقيق، المدعوم عادة بالأشعة، هو الخطوة الأولى نحو خطة تناسب السبب الحقيقي وليس العرض فقط.",
      ],
    },
    benefits: {
      en: [
        "Clear diagnosis before any treatment recommendation",
        "Conservative options explored before considering surgery",
        "Rehabilitation guidance to prevent recurrence",
      ],
      ar: [
        "تشخيص واضح قبل أي توصية علاجية",
        "استكشاف الخيارات التحفظية قبل التفكير في الجراحة",
        "إرشادات تأهيلية للوقاية من تكرار الإصابة",
      ],
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
    details: {
      en: [
        "Back pain is one of the most common reasons patients seek an orthopedic opinion, ranging from muscular strain to disc-related nerve irritation.",
        "Most cases improve with a structured, conservative program; a thorough exam helps identify the rarer cases that need closer investigation.",
      ],
      ar: [
        "يُعد ألم الظهر من أكثر الأسباب شيوعًا لزيارة أخصائي العظام، وتتراوح أسبابه بين الشد العضلي وتهيج الأعصاب المرتبط بالغضروف.",
        "تتحسن معظم الحالات ببرنامج تحفظي منظم، بينما يساعد الفحص الدقيق في تحديد الحالات الأقل شيوعًا التي تحتاج فحصًا أعمق.",
      ],
    },
    benefits: {
      en: [
        "Thorough exam to distinguish muscular from nerve-related pain",
        "Posture and movement guidance for lasting relief",
        "Clear next steps if imaging or further care is needed",
      ],
      ar: [
        "فحص دقيق للتمييز بين الألم العضلي والألم المرتبط بالأعصاب",
        "إرشادات للوضعية والحركة لتخفيف دائم",
        "خطوات واضحة إذا لزم إجراء أشعة أو رعاية إضافية",
      ],
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
    details: {
      en: [
        "Shoulder pain often limits everyday movements like reaching overhead or sleeping on one side, well before any imaging shows the cause.",
        "Treatment usually starts with targeted physiotherapy, reserving surgery for cases where structural damage doesn't respond to conservative care.",
      ],
      ar: [
        "غالبًا ما يحد ألم الكتف من حركات يومية بسيطة مثل الوصول لأعلى أو النوم على أحد الجانبين، حتى قبل ظهور السبب في الأشعة.",
        "يبدأ العلاج عادة بجلسات علاج طبيعي موجّهة، وتُترك الجراحة للحالات التي لا يستجيب فيها التلف الهيكلي للعلاج التحفظي.",
      ],
    },
    benefits: {
      en: [
        "Targeted assessment of the true source of restricted movement",
        "Physiotherapy-first approach whenever appropriate",
        "Surgical options reserved for structural damage that needs it",
      ],
      ar: [
        "تقييم دقيق للسبب الحقيقي وراء محدودية الحركة",
        "نهج يعتمد على العلاج الطبيعي أولاً كلما كان ذلك مناسبًا",
        "خيارات جراحية تُترك للتلف الهيكلي الذي يستدعيها",
      ],
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
    details: {
      en: [
        "Neck pain can stem from posture, a sports-related strain, or nerve compression that also radiates into the shoulder or arm.",
        "A careful history and exam help separate simple muscular stiffness from the cases that call for imaging or specialist referral.",
      ],
      ar: [
        "قد ينشأ ألم الرقبة عن الوضعية غير الصحيحة، أو إجهاد رياضي، أو انضغاط عصبي يمتد أثره إلى الكتف أو الذراع.",
        "يساعد التاريخ المرضي والفحص الدقيق في التمييز بين التيبس العضلي البسيط والحالات التي تستدعي أشعة أو تحويلًا لأخصائي.",
      ],
    },
    benefits: {
      en: [
        "Careful exam to identify nerve-related versus muscular pain",
        "Practical posture and ergonomic guidance",
        "Referral pathway ready if further investigation is needed",
      ],
      ar: [
        "فحص دقيق للتمييز بين الألم العصبي والألم العضلي",
        "إرشادات عملية للوضعية وبيئة العمل",
        "مسار تحويل جاهز في حال احتاجت الحالة لفحوصات إضافية",
      ],
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
    details: {
      en: [
        "Joint pain that involves swelling or stiffness, especially in the morning, deserves a proper evaluation rather than being dismissed as 'just age'.",
        "Identifying whether the cause is mechanical wear, inflammation, or a previous injury shapes a treatment plan that actually addresses it.",
      ],
      ar: [
        "ألم المفاصل المصحوب بتورم أو تيبس، خاصة في الصباح، يستحق تقييمًا طبيًا مناسبًا بدلاً من اعتباره 'مجرد تقدم في العمر'.",
        "تحديد ما إذا كان السبب تآكلًا ميكانيكيًا أو التهابًا أو إصابة سابقة يوجّه خطة علاج تعالج السبب الفعلي.",
      ],
    },
    benefits: {
      en: [
        "Evaluation that looks beyond 'normal wear and tear'",
        "Treatment matched to the specific joint and cause",
        "Long-term management plan, not just symptom relief",
      ],
      ar: [
        "تقييم لا يكتفي باعتباره 'تآكلًا طبيعيًا'",
        "علاج يتناسب مع المفصل المحدد وسببه",
        "خطة إدارة طويلة الأمد وليست مجرد تخفيف للأعراض",
      ],
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
    details: {
      en: [
        "From a rolled ankle to a suspected ligament tear, the first 48 hours after a sports injury often shape how smoothly recovery goes.",
        "Getting an accurate read on severity early helps avoid both unnecessary time off and a rushed return that risks re-injury.",
      ],
      ar: [
        "من التواء بسيط في الكاحل إلى اشتباه في تمزق رباط، غالبًا ما تحدد أول 48 ساعة بعد الإصابة الرياضية مدى سلاسة التعافي.",
        "يساعد التقييم المبكر والدقيق لشدة الإصابة على تجنب كل من التوقف غير الضروري عن النشاط والعودة المتسرعة التي قد تُعرِّض للإصابة مجددًا.",
      ],
    },
    benefits: {
      en: [
        "Rapid, accurate assessment of injury severity",
        "Clear guidance on rest versus safe continued activity",
        "Structured plan for a confident return to sport",
      ],
      ar: [
        "تقييم سريع ودقيق لشدة الإصابة",
        "إرشاد واضح حول الراحة أو مواصلة النشاط بأمان",
        "خطة منظمة للعودة الواثقة إلى الرياضة",
      ],
    },
  },
];
