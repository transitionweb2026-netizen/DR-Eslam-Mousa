-- ============================================================================
-- 0015: Research papers become image + downloadable PDF, no pop-up
-- ============================================================================
-- Replaces the modal's full-text (content_en/ar, Tiptap JSON) with an
-- actual PDF the visitor downloads — the card's own image plus a Download
-- button are now the whole interaction, no click-to-open pop-up.

-- ----------------------------------------------------------------------------
-- A "documents" bucket — the first non-image, non-video upload target.
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', true, 20971520, array['application/pdf'])
on conflict (id) do nothing;

create policy "Public can read documents bucket"
  on storage.objects for select
  using (bucket_id = 'documents');

create policy "Admins can upload to documents bucket"
  on storage.objects for insert
  with check (bucket_id = 'documents' and public.is_admin());

create policy "Admins can update documents bucket"
  on storage.objects for update
  using (bucket_id = 'documents' and public.is_admin())
  with check (bucket_id = 'documents' and public.is_admin());

create policy "Admins can delete from documents bucket"
  on storage.objects for delete
  using (bucket_id = 'documents' and public.is_admin());

-- ----------------------------------------------------------------------------
-- media: allow "documents" as a bucket_id and "research" as a category.
-- The two check constraints were declared inline in 0003 (no explicit
-- name), so this looks up whatever Postgres actually named them rather
-- than guessing — safer than a hardcoded `drop constraint <guessed-name>`.
-- ----------------------------------------------------------------------------
do $$
declare
  con_name text;
begin
  select conname into con_name
  from pg_constraint
  where conrelid = 'public.media'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%bucket_id%IN%';
  if con_name is not null then
    execute format('alter table public.media drop constraint %I', con_name);
  end if;
end $$;

alter table public.media
  add constraint media_bucket_id_check check (bucket_id in ('media', 'video-covers', 'videos', 'documents'));

do $$
declare
  con_name text;
begin
  select conname into con_name
  from pg_constraint
  where conrelid = 'public.media'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%category%IN%';
  if con_name is not null then
    execute format('alter table public.media drop constraint %I', con_name);
  end if;
end $$;

alter table public.media
  add constraint media_category_check
  check (category in ('doctor', 'services', 'conditions', 'certificates', 'videos', 'articles', 'general', 'seo', 'research'));

-- ----------------------------------------------------------------------------
-- research_papers: swap the on-site full text for a downloadable file.
-- ----------------------------------------------------------------------------
alter table public.research_papers
  add column pdf_media_id uuid references public.media (id) on delete set null,
  drop column if exists content_en,
  drop column if exists content_ar;

comment on column public.research_papers.pdf_media_id is
  'The actual paper as a PDF, from the "documents" storage bucket — shown as a Download button under the card image. Optional: a paper can exist without one yet while it''s still being prepared.';
