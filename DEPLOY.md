# Deploy notes (for the developer)

Owner-facing guide lives in [`KULLANIM.md`](./KULLANIM.md).

## 0) External values needed before we can finish deployment

Collect these first — the deploy steps below refer back to them.

| # | Status | Value | Format | Where it comes from | Where it goes |
|---|---|---|---|---|---|
| 1 | ✅ done | **GitHub repo slug** — `ravzaozkara/hk-motor` | `owner/name` | Created in step [1](#1-github) | `public/admin/config.yml` → `backend.repo` (still needs to be filled) |
| 2 | ✅ done | **Default branch name** — `main` | usually `main` | GitHub repo settings | `public/admin/config.yml` → `backend.branch` (already `main`) |
| 3 | ✅ done | **Live Netlify URL** — `https://hkmotor.netlify.app` | `https://<subdomain>.netlify.app` (no trailing slash) | Assigned in step [2](#2-netlify) | `astro.config.mjs` → `site:` ✅ · `public/admin/config.yml` → `site_url:` ✅ · GitHub OAuth App → Homepage URL (still to do) |
| 4 | ⏳ pending | **GitHub OAuth App Client ID** | 20-char alphanumeric string | Created in step [4](#4-sveltia-cms-auth-github-oauth-pkce) | `public/admin/config.yml` → `backend.app_id` |
| 5 | ⏳ pending | **OAuth callback URL** — **fixed:** `https://cms.sveltia.dev/callback` | fixed | Sveltia's hosted PKCE relay | GitHub OAuth App → Authorization callback URL |

Nothing else is required — Sveltia's `auth_type: pkce` means no client secret and
no self-hosted auth worker. Netlify Forms auto-registers from the built HTML
(no dashboard toggle needed).

## 1) GitHub

1. Create a new repo (public or private) — e.g. `hkmotor`.
2. Push this repo to it:
   ```bash
   git remote add origin git@github.com:OWNER/hkmotor.git
   git branch -M main
   git push -u origin main
   ```

## 2) Netlify

1. netlify.com → **Add new site → Import from Git → GitHub → hkmotor repo**.
2. Netlify auto-detects Astro from [`netlify.toml`](./netlify.toml). Confirm:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 22
3. Deploy. Netlify assigns a free `*.netlify.app` subdomain — take note of it.
4. **Set the canonical site URL:** open [`astro.config.mjs`](./astro.config.mjs)
   and update `site:` to the actual URL (currently `https://hkmotor.netlify.app`),
   then commit + push. This makes sitemap URLs, OG tags, and canonicals correct.

## 3) Netlify Forms (contact form)

Nothing to enable — form is already tagged `data-netlify="true"` with the
required hidden `form-name` field. Netlify auto-detects it on the first deploy.

Set email notifications: **Site → Forms → Settings → Form notifications**.

Test end-to-end:
1. Open `/iletisim` on the live site.
2. Submit a message.
3. Confirm redirect to `/iletisim?success=1` shows the green banner and the
   URL cleans up.
4. Confirm the submission arrives under **Site → Forms → contact** in Netlify.

## 4) Sveltia CMS auth (GitHub OAuth PKCE)

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `HK Motors CMS`
   - Homepage URL: the live Netlify URL
   - Authorization callback URL: `https://cms.sveltia.dev/callback`
2. Copy the generated **Client ID**.
3. Edit [`public/admin/config.yml`](./public/admin/config.yml):
   - `backend.repo` → `OWNER/hkmotor`
   - `backend.app_id` → the Client ID
4. Commit + push. Netlify redeploys.
5. Log in at `https://YOUR_SITE/admin`.

## 5) Owner handover

Give the owner:
- Live site URL
- Admin URL (`/admin`)
- GitHub username + password for the dedicated CMS account (the account must
  have push access to the repo)
- [`KULLANIM.md`](./KULLANIM.md) as a PDF or a link
