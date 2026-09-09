-- ============================================================================
-- 0009: Articles
-- ============================================================================
-- content_en / content_ar store Tiptap's JSON document format (produced by
-- the CMS's rich text editor) rather than raw HTML — it's structured,
-- trivially validated, and the frontend renders it with a small, safe
-- Tiptap-JSON-to-React renderer instead of dangerouslySetInnerHTML.

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  excerpt_en text,
  excerpt_ar text,
  content_en jsonb,
  content_ar jsonb,
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  category_en text,
  category_ar text,
  author text not null default 'Dr. Islam Moussa',
  read_time_minutes int not null default 4,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_featured boolean not null default false,
  display_order int not null default 0,
  published_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.articles.status is
  'draft: only visible to admins in the CMS. published: publicly readable and included in the sitemap. archived: kept for records, excluded from the sitemap, still admin-editable.';

create table public.article_seo (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles (id) on delete cascade unique,
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
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  updated_at timestamptz not null default now()
);

create index articles_status_idx on public.articles (status);
create index articles_display_order_idx on public.articles (display_order);
create index articles_is_featured_idx on public.articles (is_featured) where is_featured = true;
create index articles_published_at_idx on public.articles (published_at desc);

create trigger set_articles_updated_at before update on public.articles for each row execute function public.set_updated_at();
create trigger set_article_seo_updated_at before update on public.article_seo for each row execute function public.set_updated_at();

alter table public.articles enable row level security;
alter table public.article_seo enable row level security;

create policy "Public can read published articles" on public.articles for select using (status = 'published');
create policy "Admins can manage articles" on public.articles for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read article_seo" on public.article_seo for select using (true);
create policy "Admins can manage article_seo" on public.article_seo for all using (public.is_admin()) with check (public.is_admin());
