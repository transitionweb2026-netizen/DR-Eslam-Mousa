-- ============================================================================
-- 0002: Admin profiles
-- ============================================================================
-- One row per Supabase Auth user who is allowed anywhere near the CMS. Auth
-- itself is handled entirely by Supabase Auth (auth.users); this table only
-- adds the `role` the rest of the schema's RLS policies check.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'CMS users. role=admin: full access. role=editor: content access (see RLS policies per table).';

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row the moment someone signs up via Supabase Auth,
-- so there is never a logged-in user without a corresponding profiles row.
-- The FIRST user ever created is granted 'admin'; everyone after starts as
-- 'editor' and must be promoted by an existing admin (see profiles RLS).
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    case when (select count(*) from public.profiles) = 0 then 'admin' else 'editor' end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ----------------------------------------------------------------------------
-- is_admin(): the single helper every RLS policy in this schema calls to
-- decide write access. SECURITY DEFINER so it can read `profiles` even from
-- inside a policy on `profiles` itself, without recursive-RLS deadlock.
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

comment on function public.is_admin() is
  'True if the current auth.uid() has a profiles row (admin or editor). Used by every table''s "manage" RLS policy.';

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- Role changes are deliberately NOT exposed to authenticated users through
-- RLS (not even admins) — promoting/demoting a CMS user is done from the
-- Supabase dashboard's Table Editor, so a compromised admin session can
-- never silently grant itself more power through the app.
