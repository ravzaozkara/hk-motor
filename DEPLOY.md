# Deploy notes (for the developer)

Owner-facing guide lives in [`KULLANIM.md`](./KULLANIM.md).

## 0) External values needed before we can finish deployment

Collect these first — the deploy steps below refer back to them.

| # | Status | Value | Format | Where it comes from | Where it goes |
|---|---|---|---|---|---|
| 1 | ✅ done | **GitHub repo slug** — `ravzaozkara/hk-motor` | `owner/name` | Created in step [1](#1-github) | `public/admin/config.yml` → `backend.repo` ✅ |
| 2 | ✅ done | **Default branch name** — `main` | usually `main` | GitHub repo settings | `public/admin/config.yml` → `backend.branch` ✅ |
| 3 | ✅ done | **Live Netlify URL** — `https://hkmotor.netlify.app` | `https://<subdomain>.netlify.app` (no trailing slash) | Assigned in step [2](#2-netlify) | `astro.config.mjs` → `site:` ✅ · `public/admin/config.yml` → `site_url:` ✅ · GitHub OAuth App → Homepage URL ✅ |
| 4 | ✅ done | **GitHub OAuth App Client ID + Client Secret** | Client ID: 20-char alphanumeric; Secret: 40-char hex (generate on the OAuth App page) | Created in step [4](#4-sveltia-cms-auth-github-oauth-via-netlify) | **Netlify dashboard** → Site → Site configuration → Access & security → OAuth → Install provider → GitHub. **Not** in `config.yml`. |
| 5 | ✅ done | **OAuth callback URL** — **fixed:** `https://api.netlify.com/auth/done` | fixed | Netlify's built-in OAuth handler | GitHub OAuth App → Authorization callback URL |

Nothing else is required. Sveltia's default GitHub backend uses Netlify's
built-in OAuth provider — no client secret in `config.yml`, no Cloudflare
Worker, no `base_url`. The OAuth App's Client ID and Secret live only in the
Netlify dashboard. Netlify Forms auto-registers from the built HTML
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

## 4) Sveltia CMS auth (GitHub OAuth via Netlify)

Sveltia's default GitHub backend uses Netlify's built-in OAuth service — no
Cloudflare Worker, no PKCE client-id in `config.yml`, no `base_url`. All that
lives in `public/admin/config.yml` is `name`, `repo`, and `branch`.

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `HK Motors CMS`
   - Homepage URL: `https://hkmotor.netlify.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Generate a **Client Secret** as well as noting the **Client ID**.
2. Netlify → **Site → Site configuration → Access & security → OAuth →
   Install provider**. Choose **GitHub** and paste the Client ID + Client
   Secret from step 1. Save.
3. Visit `https://hkmotor.netlify.app/admin`. Click **Login with GitHub** —
   you'll be redirected to GitHub's authorize screen, then bounced back to
   `/admin` logged in.

## 5) Owner handover

Give the owner:
- Live site URL
- Admin URL (`/admin`)
- GitHub username + password for the dedicated CMS account (the account must
  have push access to the repo)
- [`KULLANIM.md`](./KULLANIM.md) as a PDF or a link
