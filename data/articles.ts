import type { Localized, MediaImage } from "@/lib/types";

export const articlesIntro = {
  eyebrow: { en: "From the Blog", ar: "من المدونة" } satisfies Localized,
  title: { en: "Featured Articles", ar: "مقالات مختارة" } satisfies Localized,
  description: {
    en: "Practical, easy-to-understand guidance on orthopedic health.",
    ar: "إرشادات عملية وسهلة الفهم حول صحة العظام والمفاصل.",
  } satisfies Localized,
};

export interface ArticleItem {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  /** Full body, as an array of paragraphs, rendered inside the Article Modal. */
  content: Localized<string[]>;
  image: MediaImage;
  category: Localized;
  date: string;
  readTimeMinutes: number;
  featured: boolean;
}

/**
 * The single source of truth for all articles. The future /articles page
 * lists everything here; the Home page filters `featured === true`.
 */
export const articles: ArticleItem[] = [
  {
    id: "article-01",
    slug: "5-signs-you-need-a-knee-specialist",
    title: {
      en: "5 Signs You Should See a Knee Specialist",
      ar: "5 علامات تستدعي زيارة أخصائي الركبة",
    },
    excerpt: {
      en: "Knee pain is common — but some signs mean it's time for a professional evaluation.",
      ar: "ألم الركبة أمر شائع، لكن بعض العلامات تعني أنه حان وقت التقييم الطبي المتخصص.",
    },
    content: {
      en: [
        "Occasional knee soreness after a long day is normal. But certain patterns of pain point to something that benefits from an orthopedic evaluation rather than rest alone.",
        "Persistent swelling that doesn't improve within a few days, a feeling of instability or the knee 'giving way', and a locking or catching sensation during movement are all signs worth taking seriously.",
        "Pain that wakes you up at night, or that has lasted more than two to three weeks despite rest and over-the-counter care, is another strong signal to book a consultation.",
        "An early evaluation doesn't always mean surgery — in many cases, a precise diagnosis leads to a simple, conservative treatment plan that prevents the issue from progressing.",
      ],
      ar: [
        "الشعور بألم خفيف في الركبة بعد يوم طويل أمر طبيعي، لكن بعض أنماط الألم تشير إلى ضرورة التقييم الطبي المتخصص بدلاً من الاكتفاء بالراحة.",
        "من العلامات التي تستحق الاهتمام: التورم المستمر الذي لا يتحسن خلال أيام قليلة، الشعور بعدم الثبات أو 'خيانة' الركبة، وأي إحساس بانحباس أو 'تعليق' أثناء الحركة.",
        "الألم الذي يوقظك أثناء الليل، أو الذي استمر لأكثر من أسبوعين إلى ثلاثة أسابيع رغم الراحة والعلاج المتاح دون وصفة طبية، يُعد أيضًا إشارة قوية لحجز استشارة.",
        "التقييم المبكر لا يعني بالضرورة الجراحة، ففي كثير من الحالات يؤدي التشخيص الدقيق إلى خطة علاج تحفظية بسيطة تمنع تفاقم المشكلة.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-01.svg",
      alt: { en: "Knee specialist article cover", ar: "غلاف مقال أخصائي الركبة" },
    },
    category: { en: "Knee Health", ar: "صحة الركبة" },
    date: "2026-02-01",
    readTimeMinutes: 4,
    featured: true,
  },
  {
    id: "article-02",
    slug: "recovering-well-after-joint-replacement",
    title: {
      en: "Recovering Well After Joint Replacement",
      ar: "التعافي الجيد بعد استبدال المفصل",
    },
    excerpt: {
      en: "A smooth recovery depends as much on the weeks after surgery as the surgery itself.",
      ar: "التعافي السلس يعتمد على الأسابيع التالية للجراحة بقدر اعتماده على الجراحة نفسها.",
    },
    content: {
      en: [
        "Modern joint replacement surgery is remarkably precise, but a smooth recovery depends heavily on what happens in the days and weeks that follow.",
        "Early, guided movement — usually starting within 24 hours — helps prevent stiffness and supports circulation, even though it may feel counterintuitive right after surgery.",
        "A structured physiotherapy plan, consistent pain management and realistic milestones (not comparisons to other patients) are the three pillars of a confident recovery.",
        "Most patients return to normal daily activities within six weeks, with continued improvement in strength and range of motion for several months afterward.",
      ],
      ar: [
        "أصبحت جراحة استبدال المفاصل الحديثة دقيقة للغاية، لكن التعافي السلس يعتمد بشكل كبير على ما يحدث في الأيام والأسابيع التالية للعملية.",
        "الحركة المبكرة الموجهة، والتي تبدأ عادة خلال 24 ساعة، تساعد على منع التيبس ودعم الدورة الدموية، حتى وإن بدت غير منطقية مباشرة بعد الجراحة.",
        "خطة علاج طبيعي منظمة، وإدارة ثابتة للألم، وأهداف واقعية دون مقارنة النفس بمرضى آخرين، هي الركائز الثلاث لتعافٍ واثق.",
        "يعود معظم المرضى إلى أنشطتهم اليومية الطبيعية خلال ستة أسابيع، مع استمرار تحسن القوة ومدى الحركة لعدة أشهر بعد ذلك.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-02.svg",
      alt: { en: "Joint replacement recovery article cover", ar: "غلاف مقال التعافي من استبدال المفصل" },
    },
    category: { en: "Joint Replacement", ar: "استبدال المفاصل" },
    date: "2026-01-18",
    readTimeMinutes: 5,
    featured: true,
  },
  {
    id: "article-03",
    slug: "preventing-common-sports-injuries",
    title: {
      en: "Preventing the Most Common Sports Injuries",
      ar: "الوقاية من أكثر الإصابات الرياضية شيوعًا",
    },
    excerpt: {
      en: "Simple habits that meaningfully reduce the risk of ligament and tendon injuries.",
      ar: "عادات بسيطة تقلل بشكل ملحوظ من خطر إصابات الأربطة والأوتار.",
    },
    content: {
      en: [
        "Most sports injuries are not the result of bad luck alone — they're often linked to preventable factors like inadequate warm-up, muscular imbalance or returning to activity too soon after a previous injury.",
        "A proper warm-up that gradually raises heart rate and mobilizes key joints reduces strain on cold muscles and ligaments.",
        "Strength and stability training, particularly for the muscles supporting the knee and ankle, meaningfully lowers the risk of sprains and tears.",
        "Perhaps most importantly, respecting recovery time after a previous injury — rather than rushing back — prevents a minor issue from becoming a recurring one.",
      ],
      ar: [
        "معظم الإصابات الرياضية ليست نتيجة سوء حظ فقط، بل غالبًا ما ترتبط بعوامل يمكن تجنبها مثل الإحماء غير الكافي أو عدم توازن العضلات أو العودة للنشاط مبكرًا بعد إصابة سابقة.",
        "الإحماء الصحيح الذي يرفع معدل ضربات القلب تدريجيًا ويُحرك المفاصل الأساسية يقلل من الإجهاد على العضلات والأربطة الباردة.",
        "تمارين القوة والثبات، خاصة للعضلات الداعمة للركبة والكاحل، تقلل بشكل ملحوظ من خطر الالتواءات والتمزقات.",
        "والأهم من ذلك، احترام فترة التعافي بعد إصابة سابقة بدلاً من التسرع في العودة، يمنع تحول مشكلة بسيطة إلى مشكلة متكررة.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-03.svg",
      alt: { en: "Sports injury prevention article cover", ar: "غلاف مقال الوقاية من الإصابات الرياضية" },
    },
    category: { en: "Sports Medicine", ar: "الطب الرياضي" },
    date: "2025-12-30",
    readTimeMinutes: 4,
    featured: true,
  },
  {
    id: "article-04",
    slug: "arthroscopy-vs-open-surgery",
    title: {
      en: "Arthroscopy vs. Open Surgery: What's the Difference?",
      ar: "المنظار مقابل الجراحة المفتوحة: ما الفرق؟",
    },
    excerpt: {
      en: "Understanding when minimally invasive surgery is the right choice.",
      ar: "فهم متى تكون الجراحة طفيفة التوغل هي الخيار الأنسب.",
    },
    content: {
      en: [
        "Arthroscopic surgery uses small incisions and a camera to diagnose and treat joint problems, while open surgery involves a larger incision for direct access.",
        "The primary advantages of arthroscopy are reduced tissue damage, less post-operative pain and typically a faster return to daily activity.",
        "That said, not every condition is suited to arthroscopy — complex reconstructions or severe joint damage may still require an open approach for the best long-term outcome.",
        "The right choice always depends on an accurate diagnosis, which is why imaging and a thorough clinical exam come before any surgical recommendation.",
      ],
      ar: [
        "تستخدم جراحة المناظير شقوقًا صغيرة وكاميرا لتشخيص وعلاج مشكلات المفصل، بينما تتطلب الجراحة المفتوحة شقًا أكبر للوصول المباشر.",
        "المزايا الأساسية للمنظار هي تقليل تلف الأنسجة وألم أقل بعد العملية وعودة أسرع للأنشطة اليومية غالبًا.",
        "مع ذلك، لا تناسب جراحة المناظير كل الحالات، فبعض عمليات إعادة البناء المعقدة أو التلف الشديد بالمفصل قد يتطلب جراحة مفتوحة لتحقيق أفضل نتيجة على المدى الطويل.",
        "يعتمد الاختيار الصحيح دائمًا على تشخيص دقيق، ولهذا يسبق الفحص بالأشعة والفحص السريري الشامل أي توصية جراحية.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-01.svg",
      alt: { en: "Arthroscopy vs open surgery article cover", ar: "غلاف مقال المنظار مقابل الجراحة المفتوحة" },
    },
    category: { en: "Arthroscopic Surgery", ar: "جراحة المناظير" },
    date: "2025-11-20",
    readTimeMinutes: 6,
    featured: false,
  },
  {
    id: "article-05",
    slug: "caring-for-your-spine-at-a-desk-job",
    title: {
      en: "Caring for Your Spine in a Desk Job",
      ar: "العناية بعمودك الفقري في وظيفة مكتبية",
    },
    excerpt: {
      en: "Practical posture and movement habits to reduce chronic back strain.",
      ar: "عادات وضعية وحركية عملية لتقليل إجهاد الظهر المزمن.",
    },
    content: {
      en: [
        "Long hours at a desk place sustained load on the lower back and neck, even with a comfortable chair. Small, consistent adjustments matter more than an expensive setup alone.",
        "Keeping the screen at eye level, feet flat on the floor and hips slightly above knee height reduces strain on the lumbar spine throughout the day.",
        "A short movement break every 45–60 minutes — even just standing and walking briefly — prevents the stiffness that builds up from prolonged static posture.",
        "If back pain persists despite these adjustments, it's worth a professional evaluation rather than assuming it's simply part of office life.",
      ],
      ar: [
        "الجلوس لساعات طويلة على المكتب يضع حملاً مستمرًا على أسفل الظهر والرقبة، حتى مع وجود كرسي مريح. التعديلات الصغيرة والمستمرة أهم من مجرد إعداد مكتب باهظ الثمن.",
        "الحفاظ على مستوى الشاشة عند مستوى العين، والقدمين مسطحتين على الأرض، والوركين أعلى قليلاً من الركبتين، يقلل من الإجهاد على العمود الفقري القطني طوال اليوم.",
        "أخذ استراحة حركية قصيرة كل 45-60 دقيقة، حتى لو كانت مجرد وقوف ومشي بسيط، يمنع التيبس الناتج عن الجلوس الثابت لفترات طويلة.",
        "إذا استمر ألم الظهر رغم هذه التعديلات، فمن الأفضل إجراء تقييم طبي متخصص بدلاً من افتراض أنه مجرد جزء طبيعي من العمل المكتبي.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-02.svg",
      alt: { en: "Spine care at a desk job article cover", ar: "غلاف مقال العناية بالعمود الفقري في العمل المكتبي" },
    },
    category: { en: "Back Health", ar: "صحة الظهر" },
    date: "2025-10-09",
    readTimeMinutes: 3,
    featured: false,
  },
  {
    id: "article-06",
    slug: "when-to-consider-shoulder-replacement",
    title: {
      en: "When Should You Consider Shoulder Replacement?",
      ar: "متى يجب التفكير في استبدال مفصل الكتف؟",
    },
    excerpt: {
      en: "Signs that conservative treatment has run its course and surgery may help.",
      ar: "علامات تشير إلى أن العلاج التحفظي وصل لحدوده وأن الجراحة قد تكون الخطوة التالية.",
    },
    content: {
      en: [
        "Most shoulder pain responds well to physiotherapy and conservative care, but severe arthritis or a badly damaged joint can eventually stop responding to non-surgical treatment.",
        "Key signs worth discussing with a surgeon include pain that disrupts sleep most nights, a noticeable loss of the ability to lift the arm, and little improvement after several months of dedicated physiotherapy.",
        "Modern shoulder replacement is a well-established procedure with a strong track record for restoring comfortable, functional movement.",
        "The decision is never made from an X-ray alone — it always follows a detailed conversation about symptoms, goals and daily activity level.",
      ],
      ar: [
        "يستجيب معظم ألم الكتف جيدًا للعلاج الطبيعي والرعاية التحفظية، لكن الالتهاب الشديد أو التلف الكبير بالمفصل قد يتوقف في النهاية عن الاستجابة للعلاج غير الجراحي.",
        "من العلامات المهمة التي تستحق مناقشتها مع الجراح: الألم الذي يعطل النوم في معظم الليالي، وفقدان ملحوظ للقدرة على رفع الذراع، وقلة التحسن بعد أشهر من العلاج الطبيعي الملتزم.",
        "يُعد استبدال مفصل الكتف الحديث إجراءً راسخًا بسجل قوي في استعادة حركة مريحة وفعالة.",
        "لا يُتخذ القرار أبدًا بناءً على الأشعة وحدها، بل يأتي دائمًا بعد نقاش تفصيلي حول الأعراض والأهداف ومستوى النشاط اليومي.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-03.svg",
      alt: { en: "Shoulder replacement article cover", ar: "غلاف مقال استبدال مفصل الكتف" },
    },
    category: { en: "Shoulder Surgery", ar: "جراحة الكتف" },
    date: "2025-09-05",
    readTimeMinutes: 4,
    featured: false,
  },
  {
    id: "article-07",
    slug: "acl-tears-in-young-athletes",
    title: {
      en: "Understanding ACL Tears in Young Athletes",
      ar: "فهم إصابات الرباط الصليبي لدى الرياضيين الصغار",
    },
    excerpt: {
      en: "Why early diagnosis and a careful return-to-sport plan matter most for growing athletes.",
      ar: "لماذا يُعد التشخيص المبكر وخطة العودة الدقيقة للرياضة الأهم بالنسبة للرياضيين الصغار في مرحلة النمو.",
    },
    content: {
      en: [
        "A sudden pop, immediate swelling and a feeling of the knee 'giving way' during a pivot or jump are the classic signs of an ACL tear in young athletes.",
        "Because the injury affects a still-developing joint, treatment planning has to balance the demands of the sport with protecting long-term knee health.",
        "For many young athletes, reconstructive surgery followed by a structured, sport-specific rehabilitation program offers the most reliable path back to competition.",
        "Just as important as the surgery itself is a disciplined, gradual return-to-play protocol that reduces the risk of a second injury.",
      ],
      ar: [
        "سماع صوت 'فرقعة' مفاجئ، وتورم فوري، والشعور بـ'خيانة' الركبة أثناء الالتفاف أو القفز، من العلامات الكلاسيكية لتمزق الرباط الصليبي لدى الرياضيين الصغار.",
        "ولأن الإصابة تؤثر على مفصل لا يزال في طور النمو، يجب أن يوازن التخطيط العلاجي بين متطلبات الرياضة والحفاظ على صحة الركبة على المدى الطويل.",
        "بالنسبة لكثير من الرياضيين الصغار، توفر جراحة إعادة البناء متبوعة ببرنامج تأهيل منظم ومخصص للرياضة المسار الأكثر موثوقية للعودة للمنافسة.",
        "لا يقل الالتزام ببروتوكول تدريجي ومنضبط للعودة للنشاط أهمية عن الجراحة نفسها، إذ يقلل من خطر تكرار الإصابة.",
      ],
    },
    image: {
      src: "/images/articles/article-placeholder-01.svg",
      alt: { en: "ACL tears in young athletes article cover", ar: "غلاف مقال إصابات الرباط الصليبي لدى الرياضيين الصغار" },
    },
    category: { en: "Sports Medicine", ar: "الطب الرياضي" },
    date: "2025-08-12",
    readTimeMinutes: 5,
    featured: false,
  },
];

export const featuredArticles = articles.filter((article) => article.featured);
