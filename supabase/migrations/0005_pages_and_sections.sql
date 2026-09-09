-- ============================================================================
-- 0005: Pages, page sections, and page SEO
-- ============================================================================
-- `pages` mirrors the site's 6 real routes. `page_sections` is one row per
-- section INSTANCE on a page (its type, order, visibility, and its own
-- small amount of bilingual copy). It intentionally holds that copy in a
-- `content` jsonb column rather than a fixed set of columns, because each
-- `section_type` has a genuinely different shape (a Hero needs a headline +
-- two CTAs; a "Statistics" section on a page needs only an eyebrow/title,
-- since the numbers themselves live in the separate `statistics` table).
-- This is different from collections like services/articles/videos, which
-- get real normalized tables (0006+) precisely because THEY need independent
-- ordering, filtering and CRUD — a page section instance does not.
--
-- Section types in use, by page:
--   home:     hero, statistics_intro, doctor_intro, specialties_intro,
--             conditions_intro, why_trust, featured_videos_intro, faq_intro,
--             featured_articles_intro
--   about:    hero, about_doctor, certificates_intro, statistics_intro,
--             career_intro, specialties_intro
--   services: hero, specialties_intro, conditions_intro
--   videos:   hero
--   articles: hero
--   contact:  hero, contact_intro
-- (The Final CTA is global — see cta_settings — and is not a page_section.)

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, -- '' = home, 'about', 'services', 'videos', 'articles', 'contact'
  name_en text not null,
  name_ar text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages (id) on delete cascade,
  section_type text not null,
  display_order int not null default 0,
  is_visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, section_type)
);

comment on column public.page_sections.content is
  'Bilingual copy + CTA + media-id references for this section instance. Shape depends on section_type — see lib/cms/sections.ts on the frontend for the typed shape of each.';

create index page_sections_page_id_idx on public.page_sections (page_id);

create table public.page_seo (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages (id) on delete cascade unique,
  seo_title_en text,
  seo_title_ar text,
  meta_description_en text,
  meta_description_ar text,
  canonical_url text,
  og_title_en text,
  og_title_ar text,
  og_description_en text,
  og_description_ar text,
  og_image_id uuid references public.media (id) on delete set null,
  twitter_title_en text,
  twitter_title_ar text,
  twitter_description_en text,
  twitter_description_ar text,
  twitter_image_id uuid references public.media (id) on delete set null,
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_pages_updated_at before update on public.pages for each row execute function public.set_updated_at();
create trigger set_page_sections_updated_at before update on public.page_sections for each row execute function public.set_updated_at();
create trigger set_page_seo_updated_at before update on public.page_seo for each row execute function public.set_updated_at();

alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.page_seo enable row level security;

create policy "Public can read pages" on public.pages for select using (true);
create policy "Admins can manage pages" on public.pages for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read visible page_sections" on public.page_sections for select using (is_visible = true);
create policy "Admins can manage page_sections" on public.page_sections for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read page_seo" on public.page_seo for select using (true);
create policy "Admins can manage page_seo" on public.page_seo for all using (public.is_admin()) with check (public.is_admin());
