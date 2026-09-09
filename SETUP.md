# Connecting a real Supabase project

The website and the CMS admin at `/admin` are both already fully built and
wired to Supabase — but no real Supabase project has been connected yet.
Until you do, the public site quietly renders bundled placeholder content
(see `lib/cms/publicClient.ts`) and `/admin` is unusable. Nothing else needs
to change in the code; this is purely a one-time setup.

This takes about 15 minutes and needs no local tools beyond a browser and a
text editor — everything below uses the Supabase Dashboard's SQL Editor, not
the Supabase CLI (no Docker/CLI is assumed to be installed).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Pick any name/region and set a database password (save it somewhere safe
   — you won't need it again unless you connect directly to Postgres later).
3. Wait for the project to finish provisioning (~2 minutes).

## 2. Run the migrations, in order

The full schema — tables, Row Level Security policies, storage buckets, and
seed data matching the site's original content exactly — lives in
`supabase/migrations/`, split into 12 numbered files.

1. In the Supabase Dashboard, open **SQL Editor** → **New query**.
2. Open `supabase/migrations/0001_extensions_and_helpers.sql` in this repo,
   copy its entire contents, paste into the SQL Editor, and click **Run**.
3. Repeat for every file **in numeric order**, one at a time:
   ```
   0001_extensions_and_helpers.sql
   0002_profiles.sql
   0003_media.sql
   0004_global_settings.sql
   0005_pages_and_sections.sql
   0006_services_and_conditions.sql
   0007_statistics_certificates_career.sql
   0008_videos.sql
   0009_articles.sql
   0010_faqs.sql
   0011_storage.sql
   0012_seed_data.sql
   ```
   The order matters — later files reference tables/functions created by
   earlier ones. If a run fails partway through a file, fix the cause and
   re-run that same file; each one is written to be safe to re-run only
   *after* fixing the error (they're not silently re-runnable on their own
   the way `create table if not exists` would be — if you need a clean
   retry, easiest is to pause here and use a fresh project).

If you have the Supabase CLI installed and prefer it instead: `supabase
link --project-ref <your-project-ref>` then `supabase db push` runs the same
12 files in order in one step. This repo has no `supabase/config.toml`, so
run `supabase init` first if you go this route.

When 0012 finishes, your database has: the CMS user/profile system, the
media library, global settings (navbar/footer/CTA/contact/contact form),
all 6 pages and their sections, and every content collection (services,
conditions, certificates, career items, statistics, videos, articles, FAQs)
pre-filled with the site's original copy.

## 3. Get your API keys

In the Dashboard, go to **Project Settings → API**. You need three values:

| Value | Where to find it |
|---|---|
| Project URL | "Project URL" |
| `anon` `public` key | "Project API keys" → `anon` `public` |
| `service_role` key | "Project API keys" → `service_role` — **keep this secret** |

## 4. Set environment variables

Create a file named `.env.local` in the project root (it's already covered
by `.gitignore` — never commit it):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
```

- The first two are used by the public site and by every browser-side
  Supabase call in the admin (`lib/supabase/client.ts`, `server.ts`).
- `SUPABASE_SERVICE_ROLE_KEY` is only read server-side by
  `lib/supabase/admin.ts`, which almost nothing uses today (routine CMS
  reads/writes go through the signed-in user's session + RLS instead) — but
  it must still be set for the few places that do.

Restart `npm run dev` (or redeploy) after adding/changing this file — Next
only reads `.env.local` at process start.

## 5. Create your first admin user

There's no public sign-up page in `/admin` by design — the CMS isn't meant
to let just anyone register. Create the first user directly:

1. In the Dashboard, go to **Authentication → Users → Add user**.
2. Enter an email and password, and check **Auto Confirm User** (so you can
   log in immediately without clicking an email link).
3. Click **Create user**.

The moment this user is created, a database trigger
(`handle_new_auth_user()` in `0002_profiles.sql`) automatically gives them a
`profiles` row — and because they're the **first** user ever created, that
row gets `role = 'admin'` automatically. Every user created after this one
starts as `role = 'editor'`; promote someone to admin later via the
Dashboard's **Table Editor → profiles** (there's deliberately no in-app way
to change roles, so a compromised admin session can't grant itself more
power).

## 6. Verify it worked

1. Run `npm run dev`, visit `/admin/login`, and sign in with the user from
   step 5.
2. You should land on the CMS dashboard showing real counts (6 services, 6
   conditions, 9 videos, 7 articles, etc.) pulled straight from Supabase.
3. Visit the public site (`/en` or `/ar`) — it should look identical to
   before, but now every word of it is coming from Supabase instead of the
   bundled fallback in `/data`. Edit something in the CMS (e.g. Content →
   FAQs), save, and refresh the public page — the change should appear
   immediately (the whole `/[locale]` tree renders per-request, not from a
   build-time cache).

If a page ever looks like it reverted to placeholder content, check your
server logs for a `[cms] ... failed` warning — every public query function
logs the specific Supabase error it hit before silently falling back.

## 7. Optional: regenerate precise TypeScript types

`lib/supabase/types.ts` is hand-written today (stubbed with
`Relationships: never[]` on every table) because it was built before a real
project existed to introspect. Once connected, you can replace it with
accurate generated types:

```bash
npx supabase gen types typescript --project-id <your-project-ref> > lib/supabase/types.ts
```

This isn't required — everything already works against the hand-written
types — but it will give you real foreign-key metadata, which would let
`lib/cms/adminQueries.ts` / `adminSettingsQueries.ts` / `adminSeoQueries.ts`
/ `publicSections.ts` / `publicContent.ts` use PostgREST's shorter embed
join syntax (`select("*, image:media!image_id(*)")`) instead of their
current manual application-side joins, if you ever want to simplify them.

## What's still on the roadmap after this

Connecting Supabase makes the CMS fully functional, but a few smaller,
previously-disclosed items are still open:

- `generateMetadata()` on each page still builds `<title>`/description from
  the page's Hero text, not from the **Page SEO** admin screen's
  `seo_title`/`meta_description` fields (that screen exists and saves
  correctly — it's just not read by the `<head>` yet).
- `sitemap.xml` / `robots.txt` are still the static files from before the
  CMS existed, not generated from published articles/services.
- There's no dedicated Service SEO / Condition SEO / Article SEO screen —
  only Global SEO and Page SEO exist today.
