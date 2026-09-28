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

drop policy if exists "Public can read documents bucket" on storage.objects;
create policy "Public can read documents bucket"
  on storage.objects for select
  using (bucket_id = 'documents');

drop policy if exists "Admins can upload to documents bucket" on storage.objects;
create policy "Admins can upload to documents bucket"
  on storage.objects for insert
  with check (bucket_id = 'documents' and public.is_admin());

drop policy if exists "Admins can update documents bucket" on storage.objects;
create policy "Admins can update documents bucket"
  on storage.objects for update
  using (bucket_id = 'documents' and public.is_admin())
  with check (bucket_id = 'documents' and public.is_admin());

drop policy if exists "Admins can delete from documents bucket" on storage.objects;
create policy "Admins can delete from documents bucket"
  on storage.objects for delete
  using (bucket_id = 'documents' and public.is_admin());

-- ----------------------------------------------------------------------------
-- media: allow "documents" as a bucket_id and "research" as a category.
-- The two check constraints were declared inline in 0003 with no explicit
-- name, so Postgres auto-named them the default way (<table>_<column>_check
-- -> media_bucket_id_check / media_category_check). An earlier version of
-- this migration tried to look that name up dynamically by pattern-matching
-- pg_get_constraintdef()'s text for "IN" — but Postgres actually rewrites
-- `col in (a, b, c)` as `col = ANY (ARRAY[a, b, c])` when it reconstructs
-- the definition, so that pattern never matched, the drop was skipped, and
-- the add below collided with the still-present original constraint (error
-- 42710). Dropping by the known exact name instead avoids the guesswork.
-- ----------------------------------------------------------------------------
alter table public.media
  drop constraint if exists media_bucket_id_check;

alter table public.media
  add constraint media_bucket_id_check check (bucket_id in ('media', 'video-covers', 'videos', 'documents'));

alter table public.media
  drop constraint if exists media_category_check;

alter table public.media
  add constraint media_category_check
  check (category in ('doctor', 'services', 'conditions', 'certificates', 'videos', 'articles', 'general', 'seo', 'research'));

-- ----------------------------------------------------------------------------
-- research_papers: swap the on-site full text for a downloadable file.
-- ----------------------------------------------------------------------------
alter table public.research_papers
  add column if not exists pdf_media_id uuid references public.media (id) on delete set null,
  drop column if exists content_en,
  drop column if exists content_ar;

comment on column public.research_papers.pdf_media_id is
  'The actual paper as a PDF, from the "documents" storage bucket — shown as a Download button under the card image. Optional: a paper can exist without one yet while it''s still being prepared.';
