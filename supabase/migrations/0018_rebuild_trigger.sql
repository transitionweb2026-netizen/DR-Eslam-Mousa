-- ============================================================================
-- 0018: Rebuild the static site after CMS changes
-- ============================================================================
-- The public site is pre-rendered HTML (static export on Hostinger), so a CMS
-- save reaches visitors only after a rebuild. These triggers ask GitHub
-- Actions to run the "Deploy to Hostinger" workflow
-- (.github/workflows/deploy-hostinger.yml) whenever content the public site
-- reads changes. They are statement-level, so a multi-row change sends one
-- request, and the workflow's concurrency group collapses bursts of saves
-- into a single build.
--
-- One-time setup, in the SQL Editor (before or after running this file):
--   select vault.create_secret('<fine-grained GitHub token>', 'github_rebuild_token');
-- The token needs only "Actions: Read and write" on this one repository.
-- Until that secret exists, the triggers do nothing.

create extension if not exists pg_net;

create or replace function public.request_site_rebuild()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  token text;
begin
  select decrypted_secret into token
  from vault.decrypted_secrets
  where name = 'github_rebuild_token'
  limit 1;

  if token is not null then
    perform net.http_post(
      url := 'https://api.github.com/repos/transitionweb2026-netizen/DR-Eslam-Mousa/actions/workflows/deploy-hostinger.yml/dispatches',
      body := jsonb_build_object('ref', 'main'),
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || token,
        'Accept', 'application/vnd.github+json',
        'X-GitHub-Api-Version', '2022-11-28',
        'User-Agent', 'supabase-site-rebuild',
        'Content-Type', 'application/json'
      )
    );
  end if;
  return null;
exception when others then
  -- A failed rebuild request must never block or roll back a CMS save.
  raise warning 'request_site_rebuild failed: %', sqlerrm;
  return null;
end;
$$;

revoke all on function public.request_site_rebuild() from public, anon, authenticated;

-- Every table the public pages read (lib/cms/public*.ts).
do $$
declare
  t text;
begin
  foreach t in array array[
    'articles', 'career_items', 'certificates', 'conditions', 'contact_form_settings',
    'contact_locations', 'contact_settings', 'cta_settings', 'doctor_gallery', 'faqs',
    'footer_settings', 'media', 'navigation_items', 'page_sections', 'page_seo', 'pages',
    'research_papers', 'reviews', 'services', 'site_settings', 'social_links', 'statistics',
    'videos'
  ] loop
    execute format('drop trigger if exists request_site_rebuild on public.%I', t);
    execute format(
      'create trigger request_site_rebuild after insert or update or delete on public.%I '
      'for each statement execute function public.request_site_rebuild()',
      t
    );
  end loop;
end $$;
