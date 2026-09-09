-- ============================================================================
-- 0012: Seed data — matches the live site's current content exactly
-- ============================================================================
-- Every row below uses a fixed, hand-assigned UUID (not gen_random_uuid())
-- so foreign keys can be written directly as plain literals instead of
-- chained CTEs — e.g. service #1's image_id is always
-- 20000000-0000-0000-0000-000000000010. This is seed-only; every row the
-- CMS creates afterward gets a normal random UUID as usual.
--
-- Numbering: 1xxx pages · 2xxx media · 3xxx services · 31xx conditions ·
-- 32xx certificates · 33xx career items · 34xx videos · 35xx articles.
--
-- Media rows point at the placeholder SVGs already shipped in /public —
-- see 0003's media_has_a_source note. Replacing any of them through the
-- CMS later is a normal upload; nothing else in this file needs to change.

-- ----------------------------------------------------------------------------
-- Global settings
-- ----------------------------------------------------------------------------
update public.site_settings set
  website_title = 'Dr. Islam Moussa',
  website_url = 'https://www.dr-islammoussa.com',
  org_name_en = 'Dr. Islam Moussa',
  org_name_ar = 'د. إسلام موسى',
  doctor_credentials_en = 'Orthopedic & Joint Replacement Surgeon',
  doctor_credentials_ar = 'استشاري جراحة العظام والمفاصل',
  default_meta_description_en = 'Dr. Islam Moussa is an orthopedic surgeon specializing in joint replacement, arthroscopic surgery and sports injuries — combining surgical precision with patient-centered, modern care.',
  default_meta_description_ar = 'د. إسلام موسى استشاري جراحة العظام والمفاصل، متخصص في جراحات استبدال المفاصل والمناظير وإصابات الملاعب، يجمع بين الدقة الجراحية والرعاية الحديثة المتمحورة حول المريض.',
  default_language = 'en',
  default_robots = 'index,follow';

update public.navbar_settings set
  appointment_label_en = 'Book an Appointment',
  appointment_label_ar = 'احجز موعدك',
  appointment_url = '/contact';

update public.footer_settings set
  description_en = 'Precision orthopedic care, guided by modern medicine and genuine compassion.',
  description_ar = 'رعاية دقيقة لعظامك ومفاصلك، بأحدث الأساليب الطبية وبعناية إنسانية حقيقية.';

update public.cta_settings set
  heading_en = 'Take the First Step Toward Moving Freely Again',
  heading_ar = 'اتخذ خطوتك الأولى نحو الحركة الحرة من جديد',
  description_en = 'Whether it''s a nagging ache or a condition that needs surgical attention, Dr. Islam Moussa is here to guide you through every step, with clarity and care.',
  description_ar = 'سواء كان الأمر ألمًا مزعجًا أو حالة تحتاج إلى تدخل جراحي، د. إسلام موسى هنا لمرافقتك في كل خطوة، بوضوح واهتمام حقيقي.',
  primary_label_en = 'Book an Appointment', primary_label_ar = 'احجز موعدك', primary_url = '/contact',
  secondary_label_en = 'Contact Us', secondary_label_ar = 'تواصل معنا', secondary_url = '/contact',
  is_visible = true;

update public.contact_settings set
  address_en = '123 Corniche El Nile, Cairo, Egypt',
  address_ar = '123 كورنيش النيل، القاهرة، مصر',
  map_url = 'https://maps.google.com/?q=123+Corniche+El+Nile,+Cairo,+Egypt',
  phone_display = '+20 100 000 0000',
  phone_href = 'tel:+201000000000',
  whatsapp_number = '201000000000',
  email = 'info@dr-islammoussa.com',
  working_hours_en = 'Sat – Thu · 10:00 AM – 8:00 PM',
  working_hours_ar = 'السبت - الخميس · 10 صباحًا - 8 مساءً';

-- contact_form_settings keeps its 0004 defaults (already match the live form).

insert into public.navigation_items (id, label_en, label_ar, url, display_order) values
  ('40000000-0000-0000-0000-000000000001', 'Home', 'الرئيسية', '/', 1),
  ('40000000-0000-0000-0000-000000000002', 'About', 'عن الدكتور', '/about', 2),
  ('40000000-0000-0000-0000-000000000003', 'Services', 'الخدمات', '/services', 3),
  ('40000000-0000-0000-0000-000000000004', 'Videos', 'فيديوهات', '/videos', 4),
  ('40000000-0000-0000-0000-000000000005', 'Articles', 'مقالات', '/articles', 5),
  ('40000000-0000-0000-0000-000000000006', 'Contact Us', 'تواصل معنا', '/contact', 6);

insert into public.social_links (id, platform, label_en, label_ar, value, display_order) values
  ('41000000-0000-0000-0000-000000000001', 'phone', 'Call', 'اتصال', 'tel:+201000000000', 1),
  ('41000000-0000-0000-0000-000000000002', 'whatsapp', 'WhatsApp', 'واتساب', 'https://wa.me/201000000000', 2),
  ('41000000-0000-0000-0000-000000000003', 'facebook', 'Facebook', 'فيسبوك', 'https://facebook.com/dr.islam.moussa', 3),
  ('41000000-0000-0000-0000-000000000004', 'instagram', 'Instagram', 'إنستغرام', 'https://instagram.com/dr.islam.moussa', 4),
  ('41000000-0000-0000-0000-000000000005', 'youtube', 'YouTube', 'يوتيوب', 'https://youtube.com/@dr.islam.moussa', 5);

-- ----------------------------------------------------------------------------
-- Media (placeholder assets, served from /public via external_url)
-- ----------------------------------------------------------------------------
insert into public.media (id, external_url, file_name, mime_type, kind, category, alt_text_en, alt_text_ar) values
  ('20000000-0000-0000-0000-000000000001', '/images/hero/doctor-hero-placeholder.svg', 'doctor-hero-placeholder.svg', 'image/svg+xml', 'image', 'doctor', 'Dr. Islam Moussa, orthopedic surgeon, portrait placeholder', 'د. إسلام موسى، استشاري جراحة العظام، صورة توضيحية مؤقتة'),
  ('20000000-0000-0000-0000-000000000002', '/images/trust/doctor-portrait-placeholder.svg', 'doctor-portrait-placeholder.svg', 'image/svg+xml', 'image', 'doctor', 'Portrait placeholder of Dr. Islam Moussa', 'صورة توضيحية مؤقتة للدكتور إسلام موسى'),
  ('20000000-0000-0000-0000-000000000003', '/images/about/doctor-about-placeholder.svg', 'doctor-about-placeholder.svg', 'image/svg+xml', 'image', 'doctor', 'Dr. Islam Moussa, orthopedic surgeon, professional portrait placeholder', 'د. إسلام موسى، استشاري جراحة العظام، صورة مهنية توضيحية مؤقتة'),
  ('20000000-0000-0000-0000-000000000004', '/images/video/introduction-video-placeholder.svg', 'introduction-video-placeholder.svg', 'image/svg+xml', 'image', 'doctor', 'Introductory video placeholder thumbnail', 'صورة مصغرة مؤقتة للفيديو التعريفي'),
  -- services
  ('20000000-0000-0000-0000-000000000010', '/images/specialties/specialty-knee-placeholder.svg', 'specialty-knee-placeholder.svg', 'image/svg+xml', 'image', 'services', 'Knee surgery specialty illustration', 'توضيح تخصص جراحة الركبة'),
  ('20000000-0000-0000-0000-000000000011', '/images/specialties/specialty-hip-placeholder.svg', 'specialty-hip-placeholder.svg', 'image/svg+xml', 'image', 'services', 'Hip surgery specialty illustration', 'توضيح تخصص جراحة الحوض'),
  ('20000000-0000-0000-0000-000000000012', '/images/specialties/specialty-shoulder-placeholder.svg', 'specialty-shoulder-placeholder.svg', 'image/svg+xml', 'image', 'services', 'Shoulder surgery specialty illustration', 'توضيح تخصص جراحة الكتف'),
  ('20000000-0000-0000-0000-000000000013', '/images/specialties/specialty-joint-placeholder.svg', 'specialty-joint-placeholder.svg', 'image/svg+xml', 'image', 'services', 'Joint replacement specialty illustration', 'توضيح تخصص استبدال المفاصل'),
  ('20000000-0000-0000-0000-000000000014', '/images/specialties/specialty-sports-placeholder.svg', 'specialty-sports-placeholder.svg', 'image/svg+xml', 'image', 'services', 'Sports injury specialty illustration', 'توضيح تخصص إصابات الملاعب'),
  ('20000000-0000-0000-0000-000000000015', '/images/specialties/specialty-arthroscopy-placeholder.svg', 'specialty-arthroscopy-placeholder.svg', 'image/svg+xml', 'image', 'services', 'Arthroscopic surgery specialty illustration', 'توضيح تخصص جراحة المناظير'),
  -- conditions
  ('20000000-0000-0000-0000-000000000020', '/images/conditions/condition-knee-placeholder.svg', 'condition-knee-placeholder.svg', 'image/svg+xml', 'image', 'conditions', 'Knee pain condition illustration', 'توضيح حالة ألم الركبة'),
  ('20000000-0000-0000-0000-000000000021', '/images/conditions/condition-back-placeholder.svg', 'condition-back-placeholder.svg', 'image/svg+xml', 'image', 'conditions', 'Back pain condition illustration', 'توضيح حالة ألم الظهر'),
  ('20000000-0000-0000-0000-000000000022', '/images/conditions/condition-shoulder-placeholder.svg', 'condition-shoulder-placeholder.svg', 'image/svg+xml', 'image', 'conditions', 'Shoulder pain condition illustration', 'توضيح حالة ألم الكتف'),
  ('20000000-0000-0000-0000-000000000023', '/images/conditions/condition-neck-placeholder.svg', 'condition-neck-placeholder.svg', 'image/svg+xml', 'image', 'conditions', 'Neck pain condition illustration', 'توضيح حالة ألم الرقبة'),
  ('20000000-0000-0000-0000-000000000024', '/images/conditions/condition-joint-placeholder.svg', 'condition-joint-placeholder.svg', 'image/svg+xml', 'image', 'conditions', 'Joint pain condition illustration', 'توضيح حالة ألم المفاصل'),
  ('20000000-0000-0000-0000-000000000025', '/images/conditions/condition-sports-placeholder.svg', 'condition-sports-placeholder.svg', 'image/svg+xml', 'image', 'conditions', 'Sports injury condition illustration', 'توضيح حالة الإصابات الرياضية'),
  -- certificates
  ('20000000-0000-0000-0000-000000000030', '/images/certificates/certificate-placeholder-01.svg', 'certificate-placeholder-01.svg', 'image/svg+xml', 'image', 'certificates', 'M.D. in Orthopedic Surgery certificate placeholder', 'شهادة دكتوراه جراحة العظام التوضيحية'),
  ('20000000-0000-0000-0000-000000000031', '/images/certificates/certificate-placeholder-02.svg', 'certificate-placeholder-02.svg', 'image/svg+xml', 'image', 'certificates', 'Fellowship in Joint Replacement Surgery certificate placeholder', 'شهادة زمالة استبدال المفاصل التوضيحية'),
  ('20000000-0000-0000-0000-000000000032', '/images/certificates/certificate-placeholder-03.svg', 'certificate-placeholder-03.svg', 'image/svg+xml', 'image', 'certificates', 'Advanced Arthroscopic Surgery certificate placeholder', 'شهادة جراحة المناظير المتقدمة التوضيحية'),
  ('20000000-0000-0000-0000-000000000033', '/images/certificates/certificate-placeholder-04.svg', 'certificate-placeholder-04.svg', 'image/svg+xml', 'image', 'certificates', 'Sports Medicine certification placeholder', 'شهادة الطب الرياضي التوضيحية'),
  ('20000000-0000-0000-0000-000000000034', '/images/certificates/certificate-placeholder-05.svg', 'certificate-placeholder-05.svg', 'image/svg+xml', 'image', 'certificates', 'Board Certification in Orthopedic Surgery certificate placeholder', 'شهادة البورد في جراحة العظام التوضيحية'),
  -- video covers
  ('20000000-0000-0000-0000-000000000040', '/images/videos/video-placeholder-01.svg', 'video-placeholder-01.svg', 'image/svg+xml', 'image', 'videos', 'Knee replacement video thumbnail', 'صورة مصغرة لفيديو استبدال الركبة'),
  ('20000000-0000-0000-0000-000000000041', '/images/videos/video-placeholder-02.svg', 'video-placeholder-02.svg', 'image/svg+xml', 'image', 'videos', 'Sports injury recovery video thumbnail', 'صورة مصغرة لفيديو التعافي من الإصابات الرياضية'),
  ('20000000-0000-0000-0000-000000000042', '/images/videos/video-placeholder-03.svg', 'video-placeholder-03.svg', 'image/svg+xml', 'image', 'videos', 'Arthroscopic surgery video thumbnail', 'صورة مصغرة لفيديو جراحة المناظير'),
  ('20000000-0000-0000-0000-000000000043', '/images/videos/video-placeholder-01.svg', 'video-placeholder-01.svg', 'image/svg+xml', 'image', 'videos', 'Hip arthritis video thumbnail', 'صورة مصغرة لفيديو التهاب مفصل الحوض'),
  ('20000000-0000-0000-0000-000000000044', '/images/videos/video-placeholder-02.svg', 'video-placeholder-02.svg', 'image/svg+xml', 'image', 'videos', 'Rotator cuff video thumbnail', 'صورة مصغرة لفيديو الكفة المدورة'),
  ('20000000-0000-0000-0000-000000000045', '/images/videos/video-placeholder-03.svg', 'video-placeholder-03.svg', 'image/svg+xml', 'image', 'videos', 'Physiotherapy video thumbnail', 'صورة مصغرة لفيديو العلاج الطبيعي'),
  ('20000000-0000-0000-0000-000000000046', '/images/videos/video-placeholder-07.svg', 'video-placeholder-07.svg', 'image/svg+xml', 'image', 'videos', 'Neck pain video thumbnail', 'صورة مصغرة لفيديو ألم الرقبة'),
  ('20000000-0000-0000-0000-000000000047', '/images/videos/video-placeholder-08.svg', 'video-placeholder-08.svg', 'image/svg+xml', 'image', 'videos', 'Chronic back pain video thumbnail', 'صورة مصغرة لفيديو ألم الظهر المزمن'),
  ('20000000-0000-0000-0000-000000000048', '/images/videos/video-placeholder-09.svg', 'video-placeholder-09.svg', 'image/svg+xml', 'image', 'videos', 'Pre-surgery preparation video thumbnail', 'صورة مصغرة لفيديو التحضير قبل الجراحة'),
  -- articles
  ('20000000-0000-0000-0000-000000000050', '/images/articles/article-placeholder-01.svg', 'article-placeholder-01.svg', 'image/svg+xml', 'image', 'articles', 'Knee specialist article cover', 'غلاف مقال أخصائي الركبة'),
  ('20000000-0000-0000-0000-000000000051', '/images/articles/article-placeholder-02.svg', 'article-placeholder-02.svg', 'image/svg+xml', 'image', 'articles', 'Joint replacement recovery article cover', 'غلاف مقال التعافي من استبدال المفصل'),
  ('20000000-0000-0000-0000-000000000052', '/images/articles/article-placeholder-03.svg', 'article-placeholder-03.svg', 'image/svg+xml', 'image', 'articles', 'Sports injury prevention article cover', 'غلاف مقال الوقاية من الإصابات الرياضية'),
  ('20000000-0000-0000-0000-000000000053', '/images/articles/article-placeholder-01.svg', 'article-placeholder-01.svg', 'image/svg+xml', 'image', 'articles', 'Arthroscopy vs open surgery article cover', 'غلاف مقال المنظار مقابل الجراحة المفتوحة'),
  ('20000000-0000-0000-0000-000000000054', '/images/articles/article-placeholder-02.svg', 'article-placeholder-02.svg', 'image/svg+xml', 'image', 'articles', 'Spine care at a desk job article cover', 'غلاف مقال العناية بالعمود الفقري في العمل المكتبي'),
  ('20000000-0000-0000-0000-000000000055', '/images/articles/article-placeholder-03.svg', 'article-placeholder-03.svg', 'image/svg+xml', 'image', 'articles', 'Shoulder replacement article cover', 'غلاف مقال استبدال مفصل الكتف'),
  ('20000000-0000-0000-0000-000000000056', '/images/articles/article-placeholder-01.svg', 'article-placeholder-01.svg', 'image/svg+xml', 'image', 'articles', 'ACL tears in young athletes article cover', 'غلاف مقال إصابات الرباط الصليبي لدى الرياضيين الصغار');

-- ----------------------------------------------------------------------------
-- Pages
-- ----------------------------------------------------------------------------
insert into public.pages (id, slug, name_en, name_ar, display_order) values
  ('10000000-0000-0000-0000-000000000001', '', 'Home', 'الرئيسية', 1),
  ('10000000-0000-0000-0000-000000000002', 'about', 'About Dr. Islam Moussa', 'عن د. إسلام موسى', 2),
  ('10000000-0000-0000-0000-000000000003', 'services', 'Services', 'الخدمات', 3),
  ('10000000-0000-0000-0000-000000000004', 'videos', 'Videos', 'فيديوهات', 4),
  ('10000000-0000-0000-0000-000000000005', 'articles', 'Articles', 'مقالات', 5),
  ('10000000-0000-0000-0000-000000000006', 'contact', 'Contact Us', 'تواصل معنا', 6);

-- ----------------------------------------------------------------------------
-- Page sections
-- ----------------------------------------------------------------------------

-- HOME -------------------------------------------------------------------
insert into public.page_sections (page_id, section_type, display_order, content) values
('10000000-0000-0000-0000-000000000001', 'hero', 1, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Orthopedic & Joint Replacement Surgeon','ar','استشاري جراحة العظام والمفاصل'),
  'headline', jsonb_build_object('en','Precision Orthopedic Care,','ar','رعاية دقيقة لعظامك ومفاصلك،'),
  'headlineAccent', jsonb_build_object('en','Built Around You','ar','بأحدث الأساليب الطبية'),
  'description', jsonb_build_object('en','Dr. Islam Moussa blends surgical precision with modern, minimally invasive techniques to help every patient move without pain — from diagnosis to full recovery.','ar','يجمع د. إسلام موسى بين الدقة الجراحية وأحدث تقنيات الجراحة طفيفة التوغل، لمساعدة كل مريض على الحركة دون ألم، من التشخيص وحتى التعافي الكامل.'),
  'image_id', '20000000-0000-0000-0000-000000000001',
  'image_position', 'center 82%',
  'primaryCta', jsonb_build_object('label', jsonb_build_object('en','Book an Appointment','ar','احجز موعدك'), 'url', '/contact'),
  'secondaryCta', jsonb_build_object('label', jsonb_build_object('en','Explore Services','ar','استكشف الخدمات'), 'url', '/services')
)),
('10000000-0000-0000-0000-000000000001', 'statistics_intro', 2, '{}'::jsonb),
('10000000-0000-0000-0000-000000000001', 'doctor_intro', 3, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Meet Your Surgeon','ar','تعرف على طبيبك'),
  'heading', jsonb_build_object('en','A Surgeon Focused on Your Full Recovery','ar','جراح يركز على تعافيك الكامل'),
  'paragraph', jsonb_build_object('en','With over 15 years dedicated to orthopedic and joint replacement surgery, Dr. Islam Moussa has built a practice on precision, evidence-based technique and genuine care for every patient''s story.','ar','بخبرة تمتد لأكثر من 15 عامًا في جراحة العظام واستبدال المفاصل، بنى د. إسلام موسى ممارسة طبية قائمة على الدقة والأسلوب العلمي والاهتمام الحقيقي بقصة كل مريض.'),
  'supporting', jsonb_build_object('en','From arthroscopic sports repairs to complex joint reconstruction, every treatment plan is tailored — combining modern technology with a calm, reassuring approach.','ar','من إصلاحات المناظير الرياضية إلى إعادة بناء المفاصل المعقدة، تُصمَّم كل خطة علاجية خصيصًا لكل حالة، بالجمع بين التقنية الحديثة وأسلوب هادئ ومطمئن.'),
  'cta', jsonb_build_object('label', jsonb_build_object('en','Learn More About Dr. Islam Moussa','ar','تعرف أكثر على د. إسلام موسى'), 'url', '/about'),
  'video_cover_media_id', '20000000-0000-0000-0000-000000000004',
  'video_media_id', null,
  'video_alt', jsonb_build_object('en','Introductory video placeholder thumbnail','ar','صورة مصغرة مؤقتة للفيديو التعريفي')
)),
('10000000-0000-0000-0000-000000000001', 'specialties_intro', 4, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Areas of Expertise','ar','مجالات الخبرة'),
  'title', jsonb_build_object('en','Top Medical Specialties','ar','أبرز التخصصات الطبية'),
  'description', jsonb_build_object('en','A focused orthopedic practice covering the full spectrum of bone and joint care, from sports injuries to complex reconstructive surgery.','ar','ممارسة متخصصة في جراحة العظام تغطي كل ما يتعلق بالعظام والمفاصل، من إصابات الملاعب وحتى جراحات إعادة البناء المعقدة.')
)),
('10000000-0000-0000-0000-000000000001', 'conditions_intro', 5, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Find Your Treatment','ar','ابحث عن علاجك'),
  'title', jsonb_build_object('en','What Are You Suffering From?','ar','ما هي المشكلة التي تعاني منها؟'),
  'description', jsonb_build_object('en','Start from your symptom. Every pathway below leads to a tailored diagnostic and treatment plan.','ar','ابدأ من العرض الذي تشعر به. كل حالة أدناه تقودك إلى خطة تشخيص وعلاج مخصصة لك.')
)),
('10000000-0000-0000-0000-000000000001', 'why_trust', 6, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Why Choose Us','ar','لماذا تختارنا'),
  'heading', jsonb_build_object('en','Why Trust Dr. Islam Moussa?','ar','لماذا تثق في د. إسلام موسى؟'),
  'description', jsonb_build_object('en','A track record built on precision, transparency and genuine care for every patient''s outcome.','ar','سجل حافل مبني على الدقة والشفافية والاهتمام الحقيقي بنتيجة كل مريض.'),
  'portrait_media_id', '20000000-0000-0000-0000-000000000002',
  'portrait_alt', jsonb_build_object('en','Portrait placeholder of Dr. Islam Moussa','ar','صورة توضيحية مؤقتة للدكتور إسلام موسى')
)),
('10000000-0000-0000-0000-000000000001', 'featured_videos_intro', 7, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Watch & Learn','ar','شاهد وتعرف'),
  'title', jsonb_build_object('en','Featured Videos','ar','فيديوهات مختارة'),
  'description', jsonb_build_object('en','Short, practical explanations straight from Dr. Islam Moussa.','ar','شروحات قصيرة وعملية مباشرة من د. إسلام موسى.')
)),
('10000000-0000-0000-0000-000000000001', 'faq_intro', 8, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Have Questions?','ar','لديك أسئلة؟'),
  'title', jsonb_build_object('en','Frequently Asked Questions','ar','الأسئلة الشائعة'),
  'description', jsonb_build_object('en','Answers to what patients most often ask before their first visit.','ar','إجابات على أكثر الأسئلة التي يطرحها المرضى قبل أول زيارة.')
)),
('10000000-0000-0000-0000-000000000001', 'featured_articles_intro', 9, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','From the Blog','ar','من المدونة'),
  'title', jsonb_build_object('en','Featured Articles','ar','مقالات مختارة'),
  'description', jsonb_build_object('en','Practical, easy-to-understand guidance on orthopedic health.','ar','إرشادات عملية وسهلة الفهم حول صحة العظام والمفاصل.')
));

-- ABOUT --------------------------------------------------------------------
insert into public.page_sections (page_id, section_type, display_order, content) values
('10000000-0000-0000-0000-000000000002', 'hero', 1, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','About the Surgeon','ar','عن الجراح'),
  'headline', jsonb_build_object('en','15+ Years of Precision Orthopedic','ar','أكثر من 15 عامًا من جراحة العظام'),
  'headlineAccent', jsonb_build_object('en','Care & Expertise','ar','الدقيقة والخبرة الموثوقة'),
  'description', jsonb_build_object('en','Dr. Islam Moussa combines surgical precision, modern technique and genuine, patient-centered care — a career built one careful diagnosis at a time.','ar','يجمع د. إسلام موسى بين الدقة الجراحية والأساليب الحديثة والرعاية الحقيقية المتمحورة حول المريض، في مسيرة مهنية بُنيت على تشخيص دقيق لكل حالة.'),
  'image_id', '20000000-0000-0000-0000-000000000001',
  'image_position', 'center 82%',
  'primaryCta', jsonb_build_object('label', jsonb_build_object('en','Book an Appointment','ar','احجز موعدك'), 'url', '/contact'),
  'secondaryCta', jsonb_build_object('label', jsonb_build_object('en','Contact Us','ar','تواصل معنا'), 'url', '/contact')
)),
('10000000-0000-0000-0000-000000000002', 'about_doctor', 2, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Meet Dr. Islam Moussa','ar','تعرف على د. إسلام موسى'),
  'heading', jsonb_build_object('en','An Orthopedic Surgeon Devoted to Precise, Patient-First Care','ar','جراح عظام يكرّس خبرته لرعاية دقيقة تضع المريض أولاً'),
  'paragraphs', jsonb_build_object(
    'en', jsonb_build_array(
      'Dr. Islam Moussa is an orthopedic and joint replacement surgeon with over 15 years of experience treating patients across the full spectrum of bone, joint and sports-related conditions.',
      'His approach is built on a simple principle: an accurate diagnosis first, then a treatment plan that fits the patient''s life — not a standard protocol applied to every case. That has meant embracing minimally invasive and arthroscopic techniques wherever they offer a safer, faster path to recovery.',
      'Beyond the operating room, Dr. Moussa believes patients recover with more confidence when they understand exactly what is happening to their body and why a particular treatment is recommended — a philosophy that shapes every consultation.'
    ),
    'ar', jsonb_build_array(
      'د. إسلام موسى استشاري جراحة العظام واستبدال المفاصل، ويحمل خبرة تمتد لأكثر من 15 عامًا في علاج كامل نطاق حالات العظام والمفاصل والإصابات الرياضية.',
      'يقوم أسلوبه على مبدأ بسيط: تشخيص دقيق أولاً، ثم خطة علاج تناسب حياة المريض، وليست بروتوكولًا موحدًا يُطبَّق على كل حالة. وهذا ما دفعه لتبني تقنيات المناظير والجراحة طفيفة التوغل كلما وفّرت طريقًا أكثر أمانًا وسرعة للتعافي.',
      'خارج غرفة العمليات، يؤمن د. موسى بأن المرضى يتعافون بثقة أكبر عندما يفهمون بدقة ما يحدث لأجسادهم ولماذا يُوصى بعلاج معين، وهذه الفلسفة تحكم كل استشارة يقدمها.'
    )
  ),
  'supportingStatement', jsonb_build_object('en','Every treatment plan starts with listening — because the best outcome is the one that fits your life, not just your scan.','ar','تبدأ كل خطة علاجية بالإصغاء الجيد، لأن أفضل نتيجة هي التي تناسب حياتك، وليست فقط ما تظهره الأشعة.'),
  'image_id', '20000000-0000-0000-0000-000000000003',
  'image_alt', jsonb_build_object('en','Dr. Islam Moussa, orthopedic surgeon, professional portrait placeholder','ar','د. إسلام موسى، استشاري جراحة العظام، صورة مهنية توضيحية مؤقتة')
)),
('10000000-0000-0000-0000-000000000002', 'certificates_intro', 3, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Credentials','ar','المؤهلات'),
  'title', jsonb_build_object('en','Certificates & Qualifications','ar','الشهادات والمؤهلات'),
  'description', jsonb_build_object('en','A track record of formal training and specialized certification, drag or scroll to explore.','ar','سجل من التدريب الرسمي والشهادات المتخصصة، اسحب أو مرر لاستعراضها.')
)),
('10000000-0000-0000-0000-000000000002', 'statistics_intro', 4, '{}'::jsonb),
('10000000-0000-0000-0000-000000000002', 'career_intro', 5, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','The Journey','ar','المسيرة المهنية'),
  'title', jsonb_build_object('en','A Career Built on Precision','ar','مسيرة مهنية قائمة على الدقة'),
  'description', jsonb_build_object('en','From medical school to specialized fellowship training, every stage shaped a practice centered on careful, evidence-based care.','ar','من كلية الطب إلى التدريب التخصصي، شكّلت كل مرحلة ممارسة طبية تقوم على الدقة والرعاية المبنية على الأدلة العلمية.')
)),
('10000000-0000-0000-0000-000000000002', 'specialties_intro', 6, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Areas of Expertise','ar','مجالات الخبرة'),
  'title', jsonb_build_object('en','Top Medical Specialties','ar','أبرز التخصصات الطبية'),
  'description', jsonb_build_object('en','A focused orthopedic practice covering the full spectrum of bone and joint care, from sports injuries to complex reconstructive surgery.','ar','ممارسة متخصصة في جراحة العظام تغطي كل ما يتعلق بالعظام والمفاصل، من إصابات الملاعب وحتى جراحات إعادة البناء المعقدة.')
));

-- SERVICES -------------------------------------------------------------------
insert into public.page_sections (page_id, section_type, display_order, content) values
('10000000-0000-0000-0000-000000000003', 'hero', 1, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Services & Conditions','ar','الخدمات والحالات'),
  'headline', jsonb_build_object('en','Orthopedic Surgery,','ar','جراحة عظام'),
  'headlineAccent', jsonb_build_object('en','Tailored to Every Diagnosis','ar','مصممة خصيصًا لكل تشخيص'),
  'description', jsonb_build_object('en','From full surgical specialties to the everyday conditions that bring patients in, explore every treatment Dr. Islam Moussa provides.','ar','من التخصصات الجراحية الكاملة إلى الحالات اليومية التي تدفع المرضى لزيارته، تعرف على كل علاج يقدمه د. إسلام موسى.'),
  'image_id', '20000000-0000-0000-0000-000000000001',
  'image_position', 'center 82%',
  'primaryCta', jsonb_build_object('label', jsonb_build_object('en','Book an Appointment','ar','احجز موعدك'), 'url', '/contact'),
  'secondaryCta', jsonb_build_object('label', jsonb_build_object('en','Explore Services','ar','استكشف الخدمات'), 'url', '/services')
)),
('10000000-0000-0000-0000-000000000003', 'specialties_intro', 2, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Areas of Expertise','ar','مجالات الخبرة'),
  'title', jsonb_build_object('en','Top Medical Specialties','ar','أبرز التخصصات الطبية'),
  'description', jsonb_build_object('en','A focused orthopedic practice covering the full spectrum of bone and joint care, from sports injuries to complex reconstructive surgery.','ar','ممارسة متخصصة في جراحة العظام تغطي كل ما يتعلق بالعظام والمفاصل، من إصابات الملاعب وحتى جراحات إعادة البناء المعقدة.')
)),
('10000000-0000-0000-0000-000000000003', 'conditions_intro', 3, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Find Your Treatment','ar','ابحث عن علاجك'),
  'title', jsonb_build_object('en','What Are You Suffering From?','ar','ما هي المشكلة التي تعاني منها؟'),
  'description', jsonb_build_object('en','Start from your symptom. Every pathway below leads to a tailored diagnostic and treatment plan.','ar','ابدأ من العرض الذي تشعر به. كل حالة أدناه تقودك إلى خطة تشخيص وعلاج مخصصة لك.')
));

-- VIDEOS -----------------------------------------------------------------
insert into public.page_sections (page_id, section_type, display_order, content) values
('10000000-0000-0000-0000-000000000004', 'hero', 1, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Video Library','ar','مكتبة الفيديو'),
  'headline', jsonb_build_object('en','Watch & Learn,','ar','شاهد وتعلّم'),
  'headlineAccent', jsonb_build_object('en','Straight from Dr. Islam Moussa','ar','مباشرة من د. إسلام موسى'),
  'description', jsonb_build_object('en','Short, practical explanations of common orthopedic conditions, treatments and recovery — filmed to be easy to understand and easy to trust.','ar','شروحات قصيرة وعملية لأشهر حالات العظام وعلاجاتها ومراحل التعافي منها، بأسلوب سهل الفهم وموثوق.'),
  'image_id', '20000000-0000-0000-0000-000000000001',
  'image_position', 'center 82%',
  'primaryCta', jsonb_build_object('label', jsonb_build_object('en','Book an Appointment','ar','احجز موعدك'), 'url', '/contact'),
  'secondaryCta', jsonb_build_object('label', jsonb_build_object('en','Explore Services','ar','استكشف الخدمات'), 'url', '/services')
));

-- ARTICLES ---------------------------------------------------------------
insert into public.page_sections (page_id, section_type, display_order, content) values
('10000000-0000-0000-0000-000000000005', 'hero', 1, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','From the Blog','ar','من المدونة'),
  'headline', jsonb_build_object('en','Practical Guidance,','ar','إرشادات عملية'),
  'headlineAccent', jsonb_build_object('en','Written for Real Patients','ar','مكتوبة لمرضى حقيقيين'),
  'description', jsonb_build_object('en','Easy-to-understand articles on orthopedic health — the same clear explanations Dr. Islam Moussa gives in the clinic, in writing.','ar','مقالات سهلة الفهم حول صحة العظام والمفاصل، بنفس الشروحات الواضحة التي يقدمها د. إسلام موسى في العيادة، مكتوبة هنا.'),
  'image_id', '20000000-0000-0000-0000-000000000001',
  'image_position', 'center 82%',
  'primaryCta', jsonb_build_object('label', jsonb_build_object('en','Book an Appointment','ar','احجز موعدك'), 'url', '/contact'),
  'secondaryCta', jsonb_build_object('label', jsonb_build_object('en','Explore Services','ar','استكشف الخدمات'), 'url', '/services')
));

-- CONTACT ------------------------------------------------------------------
insert into public.page_sections (page_id, section_type, display_order, content) values
('10000000-0000-0000-0000-000000000006', 'hero', 1, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Get in Touch','ar','تواصل معنا'),
  'headline', jsonb_build_object('en','Let''s Talk About','ar','لنتحدث عن'),
  'headlineAccent', jsonb_build_object('en','Your Recovery','ar','رحلة تعافيك'),
  'description', jsonb_build_object('en','Call, message on WhatsApp, or send a quick note below — Dr. Islam Moussa''s clinic is ready to help you take the next step.','ar','اتصل بنا، أو راسلنا عبر واتساب، أو أرسل رسالة سريعة أدناه، فعيادة د. إسلام موسى جاهزة لمساعدتك على اتخاذ خطوتك التالية.'),
  'image_id', '20000000-0000-0000-0000-000000000001',
  'image_position', 'center 82%',
  'primaryCta', jsonb_build_object('label', jsonb_build_object('en','Book an Appointment','ar','احجز موعدك'), 'url', '/contact'),
  'secondaryCta', jsonb_build_object('label', jsonb_build_object('en','Explore Services','ar','استكشف الخدمات'), 'url', '/services')
)),
('10000000-0000-0000-0000-000000000006', 'contact_intro', 2, jsonb_build_object(
  'eyebrow', jsonb_build_object('en','Visit or Reach Out','ar','زُرنا أو تواصل معنا'),
  'heading', jsonb_build_object('en','Find Us & Send a Message','ar','موقعنا وإرسال رسالة'),
  'description', jsonb_build_object('en','The clinic is easy to reach, and the fastest way to book is a quick WhatsApp message.','ar','يسهل الوصول إلى العيادة، وأسرع طريقة للحجز هي رسالة سريعة عبر واتساب.')
));

-- ----------------------------------------------------------------------------
-- Page SEO
-- ----------------------------------------------------------------------------
insert into public.page_seo (page_id, seo_title_en, seo_title_ar, meta_description_en, meta_description_ar, canonical_url) values
('10000000-0000-0000-0000-000000000001', 'Dr. Islam Moussa | Orthopedic & Joint Replacement Surgeon', 'د. إسلام موسى | استشاري جراحة العظام والمفاصل',
 'Dr. Islam Moussa is an orthopedic surgeon specializing in joint replacement, arthroscopic surgery and sports injuries — combining surgical precision with patient-centered, modern care.',
 'د. إسلام موسى استشاري جراحة العظام والمفاصل، متخصص في جراحات استبدال المفاصل والمناظير وإصابات الملاعب، يجمع بين الدقة الجراحية والرعاية الحديثة المتمحورة حول المريض.', '/'),
('10000000-0000-0000-0000-000000000002', 'About Dr. Islam Moussa | Orthopedic Surgeon', 'عن د. إسلام موسى | استشاري جراحة العظام',
 'Dr. Islam Moussa combines surgical precision, modern technique and genuine, patient-centered care — a career built one careful diagnosis at a time.',
 'يجمع د. إسلام موسى بين الدقة الجراحية والأساليب الحديثة والرعاية الحقيقية المتمحورة حول المريض.', '/about'),
('10000000-0000-0000-0000-000000000003', 'Services & Conditions | Dr. Islam Moussa', 'الخدمات والحالات | د. إسلام موسى',
 'From full surgical specialties to the everyday conditions that bring patients in, explore every treatment Dr. Islam Moussa provides.',
 'من التخصصات الجراحية الكاملة إلى الحالات اليومية، تعرف على كل علاج يقدمه د. إسلام موسى.', '/services'),
('10000000-0000-0000-0000-000000000004', 'Video Library | Dr. Islam Moussa', 'مكتبة الفيديو | د. إسلام موسى',
 'Short, practical explanations of common orthopedic conditions, treatments and recovery from Dr. Islam Moussa.',
 'شروحات قصيرة وعملية لأشهر حالات العظام وعلاجاتها من د. إسلام موسى.', '/videos'),
('10000000-0000-0000-0000-000000000005', 'Articles | Dr. Islam Moussa', 'مقالات | د. إسلام موسى',
 'Easy-to-understand articles on orthopedic health from Dr. Islam Moussa''s clinic.',
 'مقالات سهلة الفهم حول صحة العظام والمفاصل من عيادة د. إسلام موسى.', '/articles'),
('10000000-0000-0000-0000-000000000006', 'Contact Us | Dr. Islam Moussa', 'تواصل معنا | د. إسلام موسى',
 'Call, message on WhatsApp, or send a quick note — Dr. Islam Moussa''s clinic is ready to help you take the next step.',
 'اتصل بنا، أو راسلنا عبر واتساب، أو أرسل رسالة سريعة، فعيادة د. إسلام موسى جاهزة لمساعدتك.', '/contact');

-- ----------------------------------------------------------------------------
-- Services
-- ----------------------------------------------------------------------------
insert into public.services (id, slug, icon, title_en, title_ar, short_description_en, short_description_ar, full_description_en, full_description_ar, benefits_en, benefits_ar, image_id, image_alt_en, image_alt_ar, display_order) values
('30000000-0000-0000-0000-000000000001', 'knee-surgery', 'knee', 'Knee Surgery', 'جراحة الركبة',
 'Advanced treatment for ligament tears, cartilage damage and degenerative knee conditions.', 'علاج متقدم لتمزقات الأربطة وتلف الغضاريف وحالات الركبة التنكسية.',
 array['From ACL and meniscus repair to full knee replacement, treatment is matched to the exact cause of the pain rather than a one-size-fits-all protocol.','Where possible, minimally invasive arthroscopic techniques are used to protect healthy tissue and shorten the road back to normal movement.'],
 array['من إصلاح الرباط الصليبي والغضروف الهلالي وحتى الاستبدال الكامل للركبة، يُحدَّد العلاج بدقة حسب سبب الألم وليس وفق بروتوكول موحد للجميع.','كلما أمكن، تُستخدم تقنيات المنظار طفيفة التوغل للحفاظ على الأنسجة السليمة وتقصير رحلة العودة للحركة الطبيعية.'],
 array['Precise diagnosis with modern imaging before any treatment decision','Minimally invasive options whenever clinically appropriate','Structured rehabilitation plan built around your goals'],
 array['تشخيص دقيق بالأشعة الحديثة قبل اتخاذ أي قرار علاجي','خيارات طفيفة التوغل كلما سمحت الحالة الطبية بذلك','خطة تأهيل منظمة مبنية على أهدافك الشخصية'],
 '20000000-0000-0000-0000-000000000010', 'Knee surgery specialty illustration', 'توضيح تخصص جراحة الركبة', 1),
('30000000-0000-0000-0000-000000000002', 'hip-surgery', 'hip', 'Hip Surgery', 'جراحة الحوض',
 'Comprehensive care for hip pain, from conservative treatment to full hip replacement.', 'رعاية شاملة لآلام الحوض، من العلاج التحفظي وحتى الاستبدال الكامل للمفصل.',
 array['Hip pain rarely has one single cause, so every case begins with a careful clinical exam to distinguish arthritis, impingement and soft-tissue injury.','When surgery is the right path, precision-implanted replacements are planned for natural movement and long-term durability, not just short-term pain relief.'],
 array['نادرًا ما يكون لألم الحوض سبب واحد فقط، لذلك يبدأ كل حالة بفحص إكلينيكي دقيق للتمييز بين الالتهاب المفصلي والانحشار وإصابات الأنسجة الرخوة.','عندما تكون الجراحة هي الخيار الأنسب، يُخطَّط للاستبدال الدقيق للمفصل لضمان حركة طبيعية ومتانة طويلة الأمد، وليس فقط تخفيف الألم على المدى القصير.'],
 array['Conservative treatment explored first whenever safe to do so','Precision-implanted replacements for natural, lasting movement','Clear guidance on the right timing for surgery'],
 array['استكشاف العلاج التحفظي أولاً كلما كان ذلك آمنًا','استبدال دقيق للمفصل يضمن حركة طبيعية ودائمة','إرشاد واضح حول التوقيت المناسب للجراحة'],
 '20000000-0000-0000-0000-000000000011', 'Hip surgery specialty illustration', 'توضيح تخصص جراحة الحوض', 2),
('30000000-0000-0000-0000-000000000003', 'shoulder-surgery', 'shoulder', 'Shoulder Surgery', 'جراحة الكتف',
 'Restoring mobility for rotator cuff injuries, dislocations and chronic shoulder pain.', 'استعادة الحركة في إصابات الكفة المدورة والخلع وآلام الكتف المزمنة.',
 array['The shoulder''s wide range of motion makes it especially prone to instability and overuse injuries, from a first dislocation to a chronic rotator cuff tear.','Treatment combines targeted physiotherapy with arthroscopic repair when needed, aiming to restore full, pain-free range of motion.'],
 array['يجعل المدى الحركي الواسع للكتف عرضة بشكل خاص لعدم الثبات وإصابات الإجهاد، بدءًا من أول خلع وحتى تمزق مزمن في الكفة المدورة.','يجمع العلاج بين العلاج الطبيعي الموجّه وإصلاح المنظار عند الحاجة، بهدف استعادة مدى الحركة الكامل دون ألم.'],
 array['Targeted physiotherapy protocols for instability and overuse','Arthroscopic rotator cuff repair with faster recovery','Follow-up plan focused on full return to daily and sports activity'],
 array['بروتوكولات علاج طبيعي موجّهة لعدم الثبات وإصابات الإجهاد','إصلاح الكفة المدورة بالمنظار مع تعافٍ أسرع','خطة متابعة تركز على العودة الكاملة للأنشطة اليومية والرياضية'],
 '20000000-0000-0000-0000-000000000012', 'Shoulder surgery specialty illustration', 'توضيح تخصص جراحة الكتف', 3),
('30000000-0000-0000-0000-000000000004', 'joint-replacement', 'joint', 'Joint Replacement', 'استبدال المفاصل',
 'Precision-implanted joint replacements designed for long-term durability and natural movement.', 'استبدال دقيق للمفاصل بأحدث التقنيات لضمان متانة طويلة الأمد وحركة طبيعية.',
 array['When a joint is too damaged by arthritis or injury to respond to conservative care, replacement can restore comfortable, confident movement.','Modern implants and pre-operative planning are matched to each patient''s anatomy and activity level, not applied as a standard template.'],
 array['عندما يكون المفصل متضررًا بشدة من الالتهاب أو الإصابة ولا يستجيب للعلاج التحفظي، يمكن للاستبدال أن يعيد الحركة المريحة والواثقة.','تُختار الأطراف الصناعية الحديثة ويُخطَّط لها قبل الجراحة بما يتناسب مع تشريح كل مريض ومستوى نشاطه، وليس وفق نموذج موحّد.'],
 array['Personalized implant selection and surgical planning','Focus on long-term durability, not just short-term relief','Structured post-operative rehabilitation from day one'],
 array['اختيار مخصص للطرف الصناعي وتخطيط جراحي دقيق','التركيز على المتانة طويلة الأمد وليس فقط الراحة المؤقتة','تأهيل منظم بعد العملية من اليوم الأول'],
 '20000000-0000-0000-0000-000000000013', 'Joint replacement specialty illustration', 'توضيح تخصص استبدال المفاصل', 4),
('30000000-0000-0000-0000-000000000005', 'sports-injuries', 'sports', 'Sports Injuries', 'إصابات الملاعب',
 'Rapid, precise treatment to get athletes and active patients safely back in motion.', 'علاج سريع ودقيق لإعادة الرياضيين والأشخاص النشطين إلى الحركة بأمان.',
 array['Athletes and active patients need both an accurate diagnosis and a realistic timeline — treatment is planned around getting back to sport safely, not just quickly.','From ligament sprains to overuse tendon injuries, care blends hands-on treatment with a graduated return-to-play program.'],
 array['يحتاج الرياضيون والأشخاص النشطون إلى تشخيص دقيق وجدول زمني واقعي معًا، إذ يُخطَّط العلاج للعودة الآمنة للرياضة وليس فقط للعودة السريعة.','من التواءات الأربطة إلى إصابات الأوتار الناتجة عن الإجهاد، يجمع العلاج بين الرعاية المباشرة وبرنامج تدريجي للعودة للنشاط.'],
 array['Rapid assessment to avoid re-injury from delayed treatment','Graduated return-to-play programs, not one-size-fits-all rest','Close coordination with physiotherapy throughout recovery'],
 array['تقييم سريع لتجنب تكرار الإصابة بسبب تأخر العلاج','برامج تدريجية للعودة للنشاط بدلاً من الراحة الموحّدة للجميع','تنسيق وثيق مع العلاج الطبيعي طوال فترة التعافي'],
 '20000000-0000-0000-0000-000000000014', 'Sports injury specialty illustration', 'توضيح تخصص إصابات الملاعب', 5),
('30000000-0000-0000-0000-000000000006', 'arthroscopic-surgery', 'arthroscopy', 'Arthroscopic Surgery', 'جراحة المناظير',
 'Minimally invasive keyhole surgery for faster recovery and less post-operative pain.', 'جراحة طفيفة التوغل عبر المنظار لتعافٍ أسرع وألم أقل بعد العملية.',
 array['A small camera and instruments inserted through tiny incisions allow many joint problems to be diagnosed and treated without opening the joint.','Because healthy tissue is disturbed far less than in open surgery, most patients experience less pain and a noticeably faster path back to daily life.'],
 array['يسمح إدخال كاميرا صغيرة وأدوات دقيقة عبر شقوق صغيرة بتشخيص وعلاج العديد من مشكلات المفاصل دون فتح المفصل بالكامل.','ولأن الأنسجة السليمة تتأثر بدرجة أقل بكثير مقارنة بالجراحة المفتوحة، يشعر معظم المرضى بألم أقل وعودة أسرع بشكل ملحوظ لحياتهم اليومية.'],
 array['Small incisions with less disruption to healthy tissue','Typically less post-operative pain than open surgery','Faster return to daily activity for most patients'],
 array['شقوق صغيرة مع تأثير أقل على الأنسجة السليمة','ألم أقل بعد العملية مقارنة بالجراحة المفتوحة في الغالب','عودة أسرع للأنشطة اليومية لدى معظم المرضى'],
 '20000000-0000-0000-0000-000000000015', 'Arthroscopic surgery specialty illustration', 'توضيح تخصص جراحة المناظير', 6);

insert into public.service_seo (service_id, seo_title_en, seo_title_ar, meta_description_en, meta_description_ar)
select id, title_en || ' | Dr. Islam Moussa', title_ar || ' | د. إسلام موسى', short_description_en, short_description_ar
from public.services;

-- ----------------------------------------------------------------------------
-- Conditions
-- ----------------------------------------------------------------------------
insert into public.conditions (id, slug, icon, title_en, title_ar, short_description_en, short_description_ar, full_description_en, full_description_ar, benefits_en, benefits_ar, image_id, image_alt_en, image_alt_ar, display_order) values
('31000000-0000-0000-0000-000000000001', 'knee-pain', 'knee', 'Knee Pain', 'ألم الركبة',
 'Persistent or sudden knee pain from injury, arthritis or overuse.', 'ألم مفاجئ أو مستمر في الركبة نتيجة إصابة أو التهاب مفاصل أو إجهاد.',
 array['Knee pain can come from a sudden twisting injury, gradual cartilage wear, or overuse from training — each points to a different treatment path.','A precise diagnosis, usually supported by imaging, is the first step toward a plan that fits the true cause rather than the symptom alone.'],
 array['قد ينشأ ألم الركبة عن إصابة مفاجئة بالالتواء، أو تآكل تدريجي في الغضروف، أو إجهاد ناتج عن التمرين، وكل سبب يقود إلى مسار علاجي مختلف.','التشخيص الدقيق، المدعوم عادة بالأشعة، هو الخطوة الأولى نحو خطة تناسب السبب الحقيقي وليس العرض فقط.'],
 array['Clear diagnosis before any treatment recommendation','Conservative options explored before considering surgery','Rehabilitation guidance to prevent recurrence'],
 array['تشخيص واضح قبل أي توصية علاجية','استكشاف الخيارات التحفظية قبل التفكير في الجراحة','إرشادات تأهيلية للوقاية من تكرار الإصابة'],
 '20000000-0000-0000-0000-000000000020', 'Knee pain condition illustration', 'توضيح حالة ألم الركبة', 1),
('31000000-0000-0000-0000-000000000002', 'back-pain', 'spine', 'Back Pain', 'ألم الظهر',
 'Chronic or acute back pain affecting posture, mobility and daily comfort.', 'ألم مزمن أو حاد بالظهر يؤثر على الوضعية والحركة والراحة اليومية.',
 array['Back pain is one of the most common reasons patients seek an orthopedic opinion, ranging from muscular strain to disc-related nerve irritation.','Most cases improve with a structured, conservative program; a thorough exam helps identify the rarer cases that need closer investigation.'],
 array['يُعد ألم الظهر من أكثر الأسباب شيوعًا لزيارة أخصائي العظام، وتتراوح أسبابه بين الشد العضلي وتهيج الأعصاب المرتبط بالغضروف.','تتحسن معظم الحالات ببرنامج تحفظي منظم، بينما يساعد الفحص الدقيق في تحديد الحالات الأقل شيوعًا التي تحتاج فحصًا أعمق.'],
 array['Thorough exam to distinguish muscular from nerve-related pain','Posture and movement guidance for lasting relief','Clear next steps if imaging or further care is needed'],
 array['فحص دقيق للتمييز بين الألم العضلي والألم المرتبط بالأعصاب','إرشادات للوضعية والحركة لتخفيف دائم','خطوات واضحة إذا لزم إجراء أشعة أو رعاية إضافية'],
 '20000000-0000-0000-0000-000000000021', 'Back pain condition illustration', 'توضيح حالة ألم الظهر', 2),
('31000000-0000-0000-0000-000000000003', 'shoulder-pain', 'shoulder', 'Shoulder Pain', 'ألم الكتف',
 'Limited range of motion, stiffness or pain from shoulder injury or wear.', 'محدودية الحركة أو التيبس أو الألم الناتج عن إصابة أو تآكل الكتف.',
 array['Shoulder pain often limits everyday movements like reaching overhead or sleeping on one side, well before any imaging shows the cause.','Treatment usually starts with targeted physiotherapy, reserving surgery for cases where structural damage doesn''t respond to conservative care.'],
 array['غالبًا ما يحد ألم الكتف من حركات يومية بسيطة مثل الوصول لأعلى أو النوم على أحد الجانبين، حتى قبل ظهور السبب في الأشعة.','يبدأ العلاج عادة بجلسات علاج طبيعي موجّهة، وتُترك الجراحة للحالات التي لا يستجيب فيها التلف الهيكلي للعلاج التحفظي.'],
 array['Targeted assessment of the true source of restricted movement','Physiotherapy-first approach whenever appropriate','Surgical options reserved for structural damage that needs it'],
 array['تقييم دقيق للسبب الحقيقي وراء محدودية الحركة','نهج يعتمد على العلاج الطبيعي أولاً كلما كان ذلك مناسبًا','خيارات جراحية تُترك للتلف الهيكلي الذي يستدعيها'],
 '20000000-0000-0000-0000-000000000022', 'Shoulder pain condition illustration', 'توضيح حالة ألم الكتف', 3),
('31000000-0000-0000-0000-000000000004', 'neck-pain', 'neck', 'Neck Pain', 'ألم الرقبة',
 'Stiffness, nerve-related discomfort or chronic neck pain relief.', 'تيبس أو إزعاج مرتبط بالأعصاب أو ألم مزمن بالرقبة يحتاج إلى علاج.',
 array['Neck pain can stem from posture, a sports-related strain, or nerve compression that also radiates into the shoulder or arm.','A careful history and exam help separate simple muscular stiffness from the cases that call for imaging or specialist referral.'],
 array['قد ينشأ ألم الرقبة عن الوضعية غير الصحيحة، أو إجهاد رياضي، أو انضغاط عصبي يمتد أثره إلى الكتف أو الذراع.','يساعد التاريخ المرضي والفحص الدقيق في التمييز بين التيبس العضلي البسيط والحالات التي تستدعي أشعة أو تحويلًا لأخصائي.'],
 array['Careful exam to identify nerve-related versus muscular pain','Practical posture and ergonomic guidance','Referral pathway ready if further investigation is needed'],
 array['فحص دقيق للتمييز بين الألم العصبي والألم العضلي','إرشادات عملية للوضعية وبيئة العمل','مسار تحويل جاهز في حال احتاجت الحالة لفحوصات إضافية'],
 '20000000-0000-0000-0000-000000000023', 'Neck pain condition illustration', 'توضيح حالة ألم الرقبة', 4),
('31000000-0000-0000-0000-000000000005', 'joint-pain', 'joint', 'Joint Pain', 'ألم المفاصل',
 'Swelling, stiffness or pain across one or multiple joints.', 'تورم أو تيبس أو ألم في مفصل واحد أو أكثر من مفاصل الجسم.',
 array['Joint pain that involves swelling or stiffness, especially in the morning, deserves a proper evaluation rather than being dismissed as ''just age''.','Identifying whether the cause is mechanical wear, inflammation, or a previous injury shapes a treatment plan that actually addresses it.'],
 array['ألم المفاصل المصحوب بتورم أو تيبس، خاصة في الصباح، يستحق تقييمًا طبيًا مناسبًا بدلاً من اعتباره ''مجرد تقدم في العمر''.','تحديد ما إذا كان السبب تآكلًا ميكانيكيًا أو التهابًا أو إصابة سابقة يوجّه خطة علاج تعالج السبب الفعلي.'],
 array['Evaluation that looks beyond ''normal wear and tear''','Treatment matched to the specific joint and cause','Long-term management plan, not just symptom relief'],
 array['تقييم لا يكتفي باعتباره ''تآكلًا طبيعيًا''','علاج يتناسب مع المفصل المحدد وسببه','خطة إدارة طويلة الأمد وليست مجرد تخفيف للأعراض'],
 '20000000-0000-0000-0000-000000000024', 'Joint pain condition illustration', 'توضيح حالة ألم المفاصل', 5),
('31000000-0000-0000-0000-000000000006', 'sports-injuries', 'sports', 'Sports Injuries', 'إصابات رياضية',
 'Sprains, strains and ligament injuries from training or competition.', 'التواءات وشد عضلي وإصابات أربطة ناتجة عن التمرين أو المنافسة.',
 array['From a rolled ankle to a suspected ligament tear, the first 48 hours after a sports injury often shape how smoothly recovery goes.','Getting an accurate read on severity early helps avoid both unnecessary time off and a rushed return that risks re-injury.'],
 array['من التواء بسيط في الكاحل إلى اشتباه في تمزق رباط، غالبًا ما تحدد أول 48 ساعة بعد الإصابة الرياضية مدى سلاسة التعافي.','يساعد التقييم المبكر والدقيق لشدة الإصابة على تجنب كل من التوقف غير الضروري عن النشاط والعودة المتسرعة التي قد تُعرِّض للإصابة مجددًا.'],
 array['Rapid, accurate assessment of injury severity','Clear guidance on rest versus safe continued activity','Structured plan for a confident return to sport'],
 array['تقييم سريع ودقيق لشدة الإصابة','إرشاد واضح حول الراحة أو مواصلة النشاط بأمان','خطة منظمة للعودة الواثقة إلى الرياضة'],
 '20000000-0000-0000-0000-000000000025', 'Sports injury condition illustration', 'توضيح حالة الإصابات الرياضية', 6);

insert into public.condition_seo (condition_id, seo_title_en, seo_title_ar, meta_description_en, meta_description_ar)
select id, title_en || ' | Dr. Islam Moussa', title_ar || ' | د. إسلام موسى', short_description_en, short_description_ar
from public.conditions;

-- ----------------------------------------------------------------------------
-- Statistics
-- ----------------------------------------------------------------------------
insert into public.statistics (icon, value, suffix, label_en, label_ar, display_order) values
('experience', 15, '+', 'Years of Experience', 'سنوات الخبرة', 1),
('procedures', 4200, '+', 'Successful Procedures', 'عملية جراحية ناجحة', 2),
('patients', 9800, '+', 'Patients Treated', 'مريض تمت معالجته', 3),
('cases', 1500, '+', 'Complex Medical Cases', 'حالة طبية معقدة', 4);

-- ----------------------------------------------------------------------------
-- Certificates
-- ----------------------------------------------------------------------------
insert into public.certificates (id, image_id, image_alt_en, image_alt_ar, title_en, title_ar, institution_en, institution_ar, year, display_order) values
('32000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000030', 'M.D. in Orthopedic Surgery certificate placeholder', 'شهادة دكتوراه جراحة العظام التوضيحية', 'M.D. in Orthopedic Surgery', 'دكتوراه في جراحة العظام', 'Faculty of Medicine, Cairo University', 'كلية الطب، جامعة القاهرة', '2010', 1),
('32000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000031', 'Fellowship in Joint Replacement Surgery certificate placeholder', 'شهادة زمالة استبدال المفاصل التوضيحية', 'Fellowship in Joint Replacement Surgery', 'زمالة جراحة استبدال المفاصل', 'Royal College of Surgeons', 'الكلية الملكية للجراحين', '2014', 2),
('32000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000032', 'Advanced Arthroscopic Surgery certificate placeholder', 'شهادة جراحة المناظير المتقدمة التوضيحية', 'Advanced Arthroscopic Surgery Certification', 'شهادة متقدمة في جراحة المناظير', 'International Society of Arthroscopy', 'الجمعية الدولية لجراحة المناظير', '2017', 3),
('32000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000033', 'Sports Medicine certification placeholder', 'شهادة الطب الرياضي التوضيحية', 'Sports Medicine & Injury Management', 'الطب الرياضي وإدارة الإصابات', 'European Board of Orthopedics', 'المجلس الأوروبي لجراحة العظام', '2019', 4),
('32000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000034', 'Board Certification in Orthopedic Surgery certificate placeholder', 'شهادة البورد في جراحة العظام التوضيحية', 'Board Certification in Orthopedic Surgery', 'البورد في جراحة العظام', 'Egyptian Orthopedic Association', 'الجمعية المصرية لجراحة العظام', '2021', 5);

-- ----------------------------------------------------------------------------
-- Career items
-- ----------------------------------------------------------------------------
insert into public.career_items (id, year, icon, position_en, position_ar, institution_en, institution_ar, description_en, description_ar, display_order) values
('33000000-0000-0000-0000-000000000001', '2004', 'plan', 'Medical Degree', 'بكالوريوس الطب والجراحة', 'Faculty of Medicine, Cairo University', 'كلية الطب، جامعة القاهرة', 'Graduated with honors, developing an early focus on musculoskeletal anatomy and surgical technique.', 'تخرج بتقدير امتياز، مع تركيز مبكر على تشريح الجهاز الحركي والمهارات الجراحية.', 1),
('33000000-0000-0000-0000-000000000002', '2007', 'technique', 'Orthopedic Residency', 'الإقامة الطبية في جراحة العظام', 'Cairo University Hospitals', 'مستشفيات جامعة القاهرة', 'Completed a rigorous residency across trauma, spine and joint surgery, building the foundation for a broad surgical practice.', 'أتم فترة إقامة مكثفة شملت جراحة الإصابات والعمود الفقري والمفاصل، لتشكل أساسًا لممارسة جراحية شاملة.', 2),
('33000000-0000-0000-0000-000000000003', '2011', 'safety', 'Joint Replacement Fellowship', 'زمالة استبدال المفاصل', 'Royal College of Surgeons', 'الكلية الملكية للجراحين', 'Specialized fellowship training in hip and knee replacement, focused on precision implant planning.', 'تدريب تخصصي في زمالة استبدال مفصلي الحوض والركبة، مع تركيز على التخطيط الدقيق للأطراف الصناعية.', 3),
('33000000-0000-0000-0000-000000000004', '2015', 'arthroscopy', 'Advanced Arthroscopic Training', 'تدريب متقدم في جراحة المناظير', 'International Society of Arthroscopy', 'الجمعية الدولية لجراحة المناظير', 'Advanced certification in minimally invasive arthroscopic techniques for faster, safer patient recovery.', 'شهادة متقدمة في تقنيات المناظير طفيفة التوغل لتعافٍ أسرع وأكثر أمانًا للمرضى.', 4),
('33000000-0000-0000-0000-000000000005', '2018', 'experience', 'Senior Consultant', 'استشاري أول', 'Private Orthopedic Practice, Cairo', 'عيادة خاصة لجراحة العظام، القاهرة', 'Established an independent practice built on the same principle: precise diagnosis before any treatment decision.', 'أسس ممارسة طبية مستقلة تقوم على المبدأ نفسه: تشخيص دقيق قبل اتخاذ أي قرار علاجي.', 5),
('33000000-0000-0000-0000-000000000006', '2026', 'patients', 'Today', 'اليوم', 'Dr. Islam Moussa Orthopedic Clinic', 'عيادة د. إسلام موسى لجراحة العظام', 'Continuing to treat complex bone, joint and sports-related cases with the same care given to the very first patient.', 'يواصل علاج الحالات المعقدة للعظام والمفاصل والإصابات الرياضية بنفس القدر من العناية التي قدمها لأول مريض له.', 6);

-- ----------------------------------------------------------------------------
-- Videos (9 total; first 3 are the Home page's "Featured Videos")
-- ----------------------------------------------------------------------------
insert into public.videos (id, slug, title_en, title_ar, description_en, description_ar, category_en, category_ar, cover_media_id, video_media_id, duration_label, display_order, is_featured, published_at) values
('34000000-0000-0000-0000-000000000001', 'understanding-knee-replacement', 'Understanding Knee Replacement Surgery', 'فهم عملية استبدال مفصل الركبة',
 'Dr. Islam Moussa explains what to expect before, during and after a knee replacement.', 'يشرح د. إسلام موسى ما يجب توقعه قبل وأثناء وبعد عملية استبدال الركبة.',
 'Joint Replacement', 'استبدال المفاصل', '20000000-0000-0000-0000-000000000040', null, '06:12', 1, true, '2026-02-10'),
('34000000-0000-0000-0000-000000000002', 'recovering-from-sports-injuries', 'Recovering from Common Sports Injuries', 'التعافي من الإصابات الرياضية الشائعة',
 'A practical look at rehabilitation timelines for ligament and tendon injuries.', 'نظرة عملية على الجداول الزمنية للتعافي من إصابات الأربطة والأوتار.',
 'Sports Injuries', 'إصابات الملاعب', '20000000-0000-0000-0000-000000000041', null, '04:45', 2, true, '2026-01-22'),
('34000000-0000-0000-0000-000000000003', 'arthroscopy-explained', 'Arthroscopic Surgery, Explained Simply', 'جراحة المناظير ببساطة',
 'How keyhole surgery reduces recovery time compared to open procedures.', 'كيف تقلل جراحة المناظير من مدة التعافي مقارنة بالجراحة المفتوحة.',
 'Arthroscopic Surgery', 'جراحة المناظير', '20000000-0000-0000-0000-000000000042', null, '05:30', 3, true, '2025-12-18'),
('34000000-0000-0000-0000-000000000004', 'living-with-hip-arthritis', 'Living with Hip Arthritis', 'التعايش مع التهاب مفصل الحوض',
 'Non-surgical strategies and knowing when it''s time to consider surgery.', 'استراتيجيات غير جراحية ومتى يكون الوقت مناسبًا للتفكير في الجراحة.',
 'Hip Surgery', 'جراحة الحوض', '20000000-0000-0000-0000-000000000043', null, '07:02', 4, false, '2025-11-05'),
('34000000-0000-0000-0000-000000000005', 'shoulder-rotator-cuff', 'Rotator Cuff Injuries: Causes & Care', 'إصابات الكفة المدورة: الأسباب والعلاج',
 'Identifying early symptoms and treatment options for shoulder tears.', 'التعرف على الأعراض المبكرة وخيارات العلاج لتمزقات الكتف.',
 'Shoulder Surgery', 'جراحة الكتف', '20000000-0000-0000-0000-000000000044', null, '05:58', 5, false, '2025-10-14'),
('34000000-0000-0000-0000-000000000006', 'post-surgery-physiotherapy', 'The Role of Physiotherapy After Surgery', 'دور العلاج الطبيعي بعد الجراحة',
 'Why structured rehabilitation is essential to a full, lasting recovery.', 'لماذا يُعد التأهيل المنظم أساسيًا لتعافٍ كامل ودائم.',
 'Recovery', 'التعافي', '20000000-0000-0000-0000-000000000045', null, '03:40', 6, false, '2025-09-29'),
('34000000-0000-0000-0000-000000000007', 'neck-pain-when-to-worry', 'Neck Pain: When Should You Worry?', 'ألم الرقبة: متى يجب أن تقلق؟',
 'Telling ordinary stiffness apart from nerve-related neck pain that needs evaluation.', 'التمييز بين التيبس العادي وألم الرقبة المرتبط بالأعصاب الذي يحتاج تقييمًا طبيًا.',
 'Neck Pain', 'ألم الرقبة', '20000000-0000-0000-0000-000000000046', null, '04:02', 7, false, '2025-08-14'),
('34000000-0000-0000-0000-000000000008', 'understanding-back-pain', 'Understanding Chronic Back Pain', 'فهم ألم الظهر المزمن',
 'Common causes of persistent back pain and a realistic path toward relief.', 'الأسباب الشائعة لألم الظهر المستمر ومسار واقعي نحو التخفيف منه.',
 'Back Pain', 'ألم الظهر', '20000000-0000-0000-0000-000000000047', null, '05:15', 8, false, '2025-07-22'),
('34000000-0000-0000-0000-000000000009', 'what-to-expect-before-surgery', 'What to Expect Before Any Orthopedic Surgery', 'ما الذي يجب توقعه قبل أي جراحة عظام',
 'A walkthrough of the consultation, imaging and preparation steps before an operation.', 'جولة توضيحية حول الاستشارة والأشعة وخطوات التحضير قبل العملية.',
 'Patient Guide', 'دليل المريض', '20000000-0000-0000-0000-000000000048', null, '06:48', 9, false, '2025-06-30');

-- Placeholder playback source until real footage is uploaded — a freely
-- licensed test clip, referenced the same "external" way as the images
-- above (media.external_url), so it needs no Supabase Storage upload either.
insert into public.media (id, external_url, file_name, mime_type, kind, category)
values ('20000000-0000-0000-0000-000000000060', 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', 'placeholder-video.mp4', 'video/mp4', 'video', 'videos');

update public.videos set video_media_id = '20000000-0000-0000-0000-000000000060';

-- ----------------------------------------------------------------------------
-- Articles (7 total; most recent by published_at is the Articles page's
-- main featured story; is_featured = true selects the Home page's 3)
-- ----------------------------------------------------------------------------
insert into public.articles (id, slug, title_en, title_ar, excerpt_en, excerpt_ar, image_id, image_alt_en, image_alt_ar, category_en, category_ar, read_time_minutes, status, is_featured, published_at) values
('35000000-0000-0000-0000-000000000001', '5-signs-you-need-a-knee-specialist', '5 Signs You Should See a Knee Specialist', '5 علامات تستدعي زيارة أخصائي الركبة',
 'Knee pain is common — but some signs mean it''s time for a professional evaluation.', 'ألم الركبة أمر شائع، لكن بعض العلامات تعني أنه حان وقت التقييم الطبي المتخصص.',
 '20000000-0000-0000-0000-000000000050', 'Knee specialist article cover', 'غلاف مقال أخصائي الركبة', 'Knee Health', 'صحة الركبة', 4, 'published', true, '2026-02-01'),
('35000000-0000-0000-0000-000000000002', 'recovering-well-after-joint-replacement', 'Recovering Well After Joint Replacement', 'التعافي الجيد بعد استبدال المفصل',
 'A smooth recovery depends as much on the weeks after surgery as the surgery itself.', 'التعافي السلس يعتمد على الأسابيع التالية للجراحة بقدر اعتماده على الجراحة نفسها.',
 '20000000-0000-0000-0000-000000000051', 'Joint replacement recovery article cover', 'غلاف مقال التعافي من استبدال المفصل', 'Joint Replacement', 'استبدال المفاصل', 5, 'published', true, '2026-01-18'),
('35000000-0000-0000-0000-000000000003', 'preventing-common-sports-injuries', 'Preventing the Most Common Sports Injuries', 'الوقاية من أكثر الإصابات الرياضية شيوعًا',
 'Simple habits that meaningfully reduce the risk of ligament and tendon injuries.', 'عادات بسيطة تقلل بشكل ملحوظ من خطر إصابات الأربطة والأوتار.',
 '20000000-0000-0000-0000-000000000052', 'Sports injury prevention article cover', 'غلاف مقال الوقاية من الإصابات الرياضية', 'Sports Medicine', 'الطب الرياضي', 4, 'published', true, '2025-12-30'),
('35000000-0000-0000-0000-000000000004', 'arthroscopy-vs-open-surgery', 'Arthroscopy vs. Open Surgery: What''s the Difference?', 'المنظار مقابل الجراحة المفتوحة: ما الفرق؟',
 'Understanding when minimally invasive surgery is the right choice.', 'فهم متى تكون الجراحة طفيفة التوغل هي الخيار الأنسب.',
 '20000000-0000-0000-0000-000000000053', 'Arthroscopy vs open surgery article cover', 'غلاف مقال المنظار مقابل الجراحة المفتوحة', 'Arthroscopic Surgery', 'جراحة المناظير', 6, 'published', false, '2025-11-20'),
('35000000-0000-0000-0000-000000000005', 'caring-for-your-spine-at-a-desk-job', 'Caring for Your Spine in a Desk Job', 'العناية بعمودك الفقري في وظيفة مكتبية',
 'Practical posture and movement habits to reduce chronic back strain.', 'عادات وضعية وحركية عملية لتقليل إجهاد الظهر المزمن.',
 '20000000-0000-0000-0000-000000000054', 'Spine care at a desk job article cover', 'غلاف مقال العناية بالعمود الفقري في العمل المكتبي', 'Back Health', 'صحة الظهر', 3, 'published', false, '2025-10-09'),
('35000000-0000-0000-0000-000000000006', 'when-to-consider-shoulder-replacement', 'When Should You Consider Shoulder Replacement?', 'متى يجب التفكير في استبدال مفصل الكتف؟',
 'Signs that conservative treatment has run its course and surgery may help.', 'علامات تشير إلى أن العلاج التحفظي وصل لحدوده وأن الجراحة قد تكون الخطوة التالية.',
 '20000000-0000-0000-0000-000000000055', 'Shoulder replacement article cover', 'غلاف مقال استبدال مفصل الكتف', 'Shoulder Surgery', 'جراحة الكتف', 4, 'published', false, '2025-09-05'),
('35000000-0000-0000-0000-000000000007', 'acl-tears-in-young-athletes', 'Understanding ACL Tears in Young Athletes', 'فهم إصابات الرباط الصليبي لدى الرياضيين الصغار',
 'Why early diagnosis and a careful return-to-sport plan matter most for growing athletes.', 'لماذا يُعد التشخيص المبكر وخطة العودة الدقيقة للرياضة الأهم بالنسبة للرياضيين الصغار في مرحلة النمو.',
 '20000000-0000-0000-0000-000000000056', 'ACL tears in young athletes article cover', 'غلاف مقال إصابات الرباط الصليبي لدى الرياضيين الصغار', 'Sports Medicine', 'الطب الرياضي', 5, 'published', false, '2025-08-12');

-- Full article bodies as Tiptap JSON documents (one paragraph node per
-- source paragraph) — kept in a DO block purely to avoid repeating the
-- jsonb_build_object boilerplate seven times over.
do $$
declare
  para_en text[];
  para_ar text[];
  art_id uuid;
  doc_en jsonb;
  doc_ar jsonb;
  p text;
begin
  for art_id, para_en, para_ar in
    select * from (values
      ('35000000-0000-0000-0000-000000000001'::uuid,
       array['Occasional knee soreness after a long day is normal. But certain patterns of pain point to something that benefits from an orthopedic evaluation rather than rest alone.','Persistent swelling that doesn''t improve within a few days, a feeling of instability or the knee ''giving way'', and a locking or catching sensation during movement are all signs worth taking seriously.','Pain that wakes you up at night, or that has lasted more than two to three weeks despite rest and over-the-counter care, is another strong signal to book a consultation.','An early evaluation doesn''t always mean surgery — in many cases, a precise diagnosis leads to a simple, conservative treatment plan that prevents the issue from progressing.'],
       array['الشعور بألم خفيف في الركبة بعد يوم طويل أمر طبيعي، لكن بعض أنماط الألم تشير إلى ضرورة التقييم الطبي المتخصص بدلاً من الاكتفاء بالراحة.','من العلامات التي تستحق الاهتمام: التورم المستمر الذي لا يتحسن خلال أيام قليلة، الشعور بعدم الثبات أو ''خيانة'' الركبة، وأي إحساس بانحباس أو ''تعليق'' أثناء الحركة.','الألم الذي يوقظك أثناء الليل، أو الذي استمر لأكثر من أسبوعين إلى ثلاثة أسابيع رغم الراحة والعلاج المتاح دون وصفة طبية، يُعد أيضًا إشارة قوية لحجز استشارة.','التقييم المبكر لا يعني بالضرورة الجراحة، ففي كثير من الحالات يؤدي التشخيص الدقيق إلى خطة علاج تحفظية بسيطة تمنع تفاقم المشكلة.']),
      ('35000000-0000-0000-0000-000000000002'::uuid,
       array['Modern joint replacement surgery is remarkably precise, but a smooth recovery depends heavily on what happens in the days and weeks that follow.','Early, guided movement — usually starting within 24 hours — helps prevent stiffness and supports circulation, even though it may feel counterintuitive right after surgery.','A structured physiotherapy plan, consistent pain management and realistic milestones (not comparisons to other patients) are the three pillars of a confident recovery.','Most patients return to normal daily activities within six weeks, with continued improvement in strength and range of motion for several months afterward.'],
       array['أصبحت جراحة استبدال المفاصل الحديثة دقيقة للغاية، لكن التعافي السلس يعتمد بشكل كبير على ما يحدث في الأيام والأسابيع التالية للعملية.','الحركة المبكرة الموجهة، والتي تبدأ عادة خلال 24 ساعة، تساعد على منع التيبس ودعم الدورة الدموية، حتى وإن بدت غير منطقية مباشرة بعد الجراحة.','خطة علاج طبيعي منظمة، وإدارة ثابتة للألم، وأهداف واقعية دون مقارنة النفس بمرضى آخرين، هي الركائز الثلاث لتعافٍ واثق.','يعود معظم المرضى إلى أنشطتهم اليومية الطبيعية خلال ستة أسابيع، مع استمرار تحسن القوة ومدى الحركة لعدة أشهر بعد ذلك.']),
      ('35000000-0000-0000-0000-000000000003'::uuid,
       array['Most sports injuries are not the result of bad luck alone — they''re often linked to preventable factors like inadequate warm-up, muscular imbalance or returning to activity too soon after a previous injury.','A proper warm-up that gradually raises heart rate and mobilizes key joints reduces strain on cold muscles and ligaments.','Strength and stability training, particularly for the muscles supporting the knee and ankle, meaningfully lowers the risk of sprains and tears.','Perhaps most importantly, respecting recovery time after a previous injury — rather than rushing back — prevents a minor issue from becoming a recurring one.'],
       array['معظم الإصابات الرياضية ليست نتيجة سوء حظ فقط، بل غالبًا ما ترتبط بعوامل يمكن تجنبها مثل الإحماء غير الكافي أو عدم توازن العضلات أو العودة للنشاط مبكرًا بعد إصابة سابقة.','الإحماء الصحيح الذي يرفع معدل ضربات القلب تدريجيًا ويُحرك المفاصل الأساسية يقلل من الإجهاد على العضلات والأربطة الباردة.','تمارين القوة والثبات، خاصة للعضلات الداعمة للركبة والكاحل، تقلل بشكل ملحوظ من خطر الالتواءات والتمزقات.','والأهم من ذلك، احترام فترة التعافي بعد إصابة سابقة بدلاً من التسرع في العودة، يمنع تحول مشكلة بسيطة إلى مشكلة متكررة.']),
      ('35000000-0000-0000-0000-000000000004'::uuid,
       array['Arthroscopic surgery uses small incisions and a camera to diagnose and treat joint problems, while open surgery involves a larger incision for direct access.','The primary advantages of arthroscopy are reduced tissue damage, less post-operative pain and typically a faster return to daily activity.','That said, not every condition is suited to arthroscopy — complex reconstructions or severe joint damage may still require an open approach for the best long-term outcome.','The right choice always depends on an accurate diagnosis, which is why imaging and a thorough clinical exam come before any surgical recommendation.'],
       array['تستخدم جراحة المناظير شقوقًا صغيرة وكاميرا لتشخيص وعلاج مشكلات المفصل، بينما تتطلب الجراحة المفتوحة شقًا أكبر للوصول المباشر.','المزايا الأساسية للمنظار هي تقليل تلف الأنسجة وألم أقل بعد العملية وعودة أسرع للأنشطة اليومية غالبًا.','مع ذلك، لا تناسب جراحة المناظير كل الحالات، فبعض عمليات إعادة البناء المعقدة أو التلف الشديد بالمفصل قد يتطلب جراحة مفتوحة لتحقيق أفضل نتيجة على المدى الطويل.','يعتمد الاختيار الصحيح دائمًا على تشخيص دقيق، ولهذا يسبق الفحص بالأشعة والفحص السريري الشامل أي توصية جراحية.']),
      ('35000000-0000-0000-0000-000000000005'::uuid,
       array['Long hours at a desk place sustained load on the lower back and neck, even with a comfortable chair. Small, consistent adjustments matter more than an expensive setup alone.','Keeping the screen at eye level, feet flat on the floor and hips slightly above knee height reduces strain on the lumbar spine throughout the day.','A short movement break every 45–60 minutes — even just standing and walking briefly — prevents the stiffness that builds up from prolonged static posture.','If back pain persists despite these adjustments, it''s worth a professional evaluation rather than assuming it''s simply part of office life.'],
       array['الجلوس لساعات طويلة على المكتب يضع حملاً مستمرًا على أسفل الظهر والرقبة، حتى مع وجود كرسي مريح. التعديلات الصغيرة والمستمرة أهم من مجرد إعداد مكتب باهظ الثمن.','الحفاظ على مستوى الشاشة عند مستوى العين، والقدمين مسطحتين على الأرض، والوركين أعلى قليلاً من الركبتين، يقلل من الإجهاد على العمود الفقري القطني طوال اليوم.','أخذ استراحة حركية قصيرة كل 45-60 دقيقة، حتى لو كانت مجرد وقوف ومشي بسيط، يمنع التيبس الناتج عن الجلوس الثابت لفترات طويلة.','إذا استمر ألم الظهر رغم هذه التعديلات، فمن الأفضل إجراء تقييم طبي متخصص بدلاً من افتراض أنه مجرد جزء طبيعي من العمل المكتبي.']),
      ('35000000-0000-0000-0000-000000000006'::uuid,
       array['Most shoulder pain responds well to physiotherapy and conservative care, but severe arthritis or a badly damaged joint can eventually stop responding to non-surgical treatment.','Key signs worth discussing with a surgeon include pain that disrupts sleep most nights, a noticeable loss of the ability to lift the arm, and little improvement after several months of dedicated physiotherapy.','Modern shoulder replacement is a well-established procedure with a strong track record for restoring comfortable, functional movement.','The decision is never made from an X-ray alone — it always follows a detailed conversation about symptoms, goals and daily activity level.'],
       array['يستجيب معظم ألم الكتف جيدًا للعلاج الطبيعي والرعاية التحفظية، لكن الالتهاب الشديد أو التلف الكبير بالمفصل قد يتوقف في النهاية عن الاستجابة للعلاج غير الجراحي.','من العلامات المهمة التي تستحق مناقشتها مع الجراح: الألم الذي يعطل النوم في معظم الليالي، وفقدان ملحوظ للقدرة على رفع الذراع، وقلة التحسن بعد أشهر من العلاج الطبيعي الملتزم.','يُعد استبدال مفصل الكتف الحديث إجراءً راسخًا بسجل قوي في استعادة حركة مريحة وفعالة.','لا يُتخذ القرار أبدًا بناءً على الأشعة وحدها، بل يأتي دائمًا بعد نقاش تفصيلي حول الأعراض والأهداف ومستوى النشاط اليومي.']),
      ('35000000-0000-0000-0000-000000000007'::uuid,
       array['A sudden pop, immediate swelling and a feeling of the knee ''giving way'' during a pivot or jump are the classic signs of an ACL tear in young athletes.','Because the injury affects a still-developing joint, treatment planning has to balance the demands of the sport with protecting long-term knee health.','For many young athletes, reconstructive surgery followed by a structured, sport-specific rehabilitation program offers the most reliable path back to competition.','Just as important as the surgery itself is a disciplined, gradual return-to-play protocol that reduces the risk of a second injury.'],
       array['سماع صوت ''فرقعة'' مفاجئ، وتورم فوري، والشعور بـ''خيانة'' الركبة أثناء الالتفاف أو القفز، من العلامات الكلاسيكية لتمزق الرباط الصليبي لدى الرياضيين الصغار.','ولأن الإصابة تؤثر على مفصل لا يزال في طور النمو، يجب أن يوازن التخطيط العلاجي بين متطلبات الرياضة والحفاظ على صحة الركبة على المدى الطويل.','بالنسبة لكثير من الرياضيين الصغار، توفر جراحة إعادة البناء متبوعة ببرنامج تأهيل منظم ومخصص للرياضة المسار الأكثر موثوقية للعودة للمنافسة.','لا يقل الالتزام ببروتوكول تدريجي ومنضبط للعودة للنشاط أهمية عن الجراحة نفسها، إذ يقلل من خطر تكرار الإصابة.'])
    ) as t(art_id, para_en, para_ar)
  loop
    doc_en := jsonb_build_object('type', 'doc', 'content', '[]'::jsonb);
    doc_ar := jsonb_build_object('type', 'doc', 'content', '[]'::jsonb);
    foreach p in array para_en loop
      doc_en := jsonb_set(doc_en, '{content}', (doc_en->'content') || jsonb_build_array(
        jsonb_build_object('type', 'paragraph', 'content', jsonb_build_array(jsonb_build_object('type', 'text', 'text', p)))
      ));
    end loop;
    foreach p in array para_ar loop
      doc_ar := jsonb_set(doc_ar, '{content}', (doc_ar->'content') || jsonb_build_array(
        jsonb_build_object('type', 'paragraph', 'content', jsonb_build_array(jsonb_build_object('type', 'text', 'text', p)))
      ));
    end loop;
    update public.articles set content_en = doc_en, content_ar = doc_ar where id = art_id;
  end loop;
end $$;

insert into public.article_seo (article_id, seo_title_en, seo_title_ar, meta_description_en, meta_description_ar)
select id, title_en || ' | Dr. Islam Moussa', title_ar || ' | د. إسلام موسى', excerpt_en, excerpt_ar
from public.articles;

-- ----------------------------------------------------------------------------
-- FAQs
-- ----------------------------------------------------------------------------
insert into public.faqs (question_en, question_ar, answer_en, answer_ar, display_order) values
('What should I bring to my first appointment?', 'ماذا أحضر معي في أول زيارة؟', 'Please bring any prior imaging (X-rays, MRI, CT), a list of current medications and a summary of your symptoms and their duration.', 'يُرجى إحضار أي صور أشعة سابقة (أشعة سينية، رنين مغناطيسي، أشعة مقطعية)، وقائمة بالأدوية الحالية، وملخص لأعراضك ومدتها.', 1),
('Do I need a referral to book a consultation?', 'هل أحتاج إلى تحويل لحجز استشارة؟', 'No referral is required. You can book directly through the website, phone or WhatsApp.', 'لا تحتاج إلى تحويل. يمكنك الحجز مباشرة عبر الموقع أو الهاتف أو واتساب.', 2),
('How long does a typical joint replacement recovery take?', 'كم تستغرق فترة التعافي المعتادة من استبدال المفصل؟', 'Most patients resume light daily activity within 4–6 weeks, with full recovery typically within 3–6 months depending on the joint and procedure.', 'يستأنف معظم المرضى الأنشطة اليومية الخفيفة خلال 4-6 أسابيع، ويكتمل التعافي الكامل عادة خلال 3-6 أشهر حسب المفصل ونوع العملية.', 3),
('Is arthroscopic surgery painful?', 'هل جراحة المناظير مؤلمة؟', 'Because it''s minimally invasive, arthroscopy typically involves significantly less pain and a faster recovery than open surgery.', 'نظرًا لكونها طفيفة التوغل، تتضمن جراحة المناظير عادة ألمًا أقل بكثير وتعافيًا أسرع مقارنة بالجراحة المفتوحة.', 4),
('Can sports injuries be treated without surgery?', 'هل يمكن علاج الإصابات الرياضية دون جراحة؟', 'Many sports injuries respond well to physiotherapy and conservative care. Surgery is recommended only when necessary.', 'تستجيب العديد من الإصابات الرياضية جيدًا للعلاج الطبيعي والرعاية التحفظية، ولا يُنصح بالجراحة إلا عند الضرورة.', 5),
('What age is appropriate for joint replacement?', 'ما هو العمر المناسب لاستبدال المفصل؟', 'There is no fixed age — the decision depends on joint damage, pain levels and how much they limit your daily life.', 'لا يوجد عمر محدد، فالقرار يعتمد على درجة تلف المفصل ومستوى الألم ومدى تأثيره على حياتك اليومية.', 6),
('How soon can I walk after knee surgery?', 'متى يمكنني المشي بعد جراحة الركبة؟', 'Depending on the procedure, many patients begin supported walking within 24 hours with guided physiotherapy.', 'حسب نوع العملية، يبدأ العديد من المرضى المشي بمساعدة خلال 24 ساعة مع متابعة العلاج الطبيعي.', 7),
('Do you offer online or remote consultations?', 'هل تتوفر استشارات عن بُعد؟', 'Yes, an initial remote consultation is available to review your case before an in-person visit is scheduled.', 'نعم، تتوفر استشارة أولية عن بُعد لمراجعة حالتك قبل تحديد موعد الزيارة الشخصية.', 8),
('What imaging is required before diagnosis?', 'ما هي الأشعة المطلوبة قبل التشخيص؟', 'This depends on your symptoms — commonly X-ray, and MRI for soft tissue or ligament concerns.', 'يعتمد ذلك على الأعراض، وعادةً ما تشمل الأشعة السينية، والرنين المغناطيسي في حالات الأنسجة الرخوة أو الأربطة.', 9),
('How can I book an appointment?', 'كيف يمكنني حجز موعد؟', 'Use the ''Book an Appointment'' button anywhere on the site, or reach out directly by phone or WhatsApp.', 'استخدم زر ''احجز موعدك'' في أي مكان بالموقع، أو تواصل مباشرة عبر الهاتف أو واتساب.', 10);
