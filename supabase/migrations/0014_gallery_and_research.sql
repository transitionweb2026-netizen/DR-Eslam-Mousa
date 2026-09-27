-- ============================================================================
-- 0014: Doctor photo gallery + Research papers
-- ============================================================================
-- Two new ordered collections for the About page:
--   doctor_gallery   — the horizontal photo slider (any number of photos,
--                      not hardcoded to 6 — the requested count is just the
--                      starting content)
--   research_papers  — cards that open a modal with the full paper text,
--                      the same shape as articles (bilingual title/excerpt/
--                      content as Tiptap JSON) plus a couple of
--                      publication-specific fields.
-- Both start EMPTY — research content in particular must never be seeded
-- with placeholder text, since that would misrepresent a real doctor's
-- actual publication record.

create table public.doctor_gallery (
  id uuid primary key default gen_random_uuid(),
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index doctor_gallery_display_order_idx on public.doctor_gallery (display_order);

create trigger set_doctor_gallery_updated_at
  before update on public.doctor_gallery
  for each row execute function public.set_updated_at();

alter table public.doctor_gallery enable row level security;

create policy "Public can read active doctor_gallery"
  on public.doctor_gallery for select
  using (is_active = true);

create policy "Admins can manage doctor_gallery"
  on public.doctor_gallery for all
  using (public.is_admin())
  with check (public.is_admin());

create table public.research_papers (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text not null,
  journal_name text,
  publish_year text,
  excerpt_en text,
  excerpt_ar text,
  content_en jsonb,
  content_ar jsonb,
  external_url text,
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.research_papers.content_en is
  'Tiptap JSON document, same format as articles.content_en — the full paper text shown in the card''s pop-up.';
comment on column public.research_papers.external_url is
  'Optional link to the published paper (DOI/PubMed/journal page) shown alongside the full text.';

create index research_papers_display_order_idx on public.research_papers (display_order);

create trigger set_research_papers_updated_at
  before update on public.research_papers
  for each row execute function public.set_updated_at();

alter table public.research_papers enable row level security;

create policy "Public can read active research_papers"
  on public.research_papers for select
  using (is_active = true);

create policy "Admins can manage research_papers"
  on public.research_papers for all
  using (public.is_admin())
  with check (public.is_admin());
