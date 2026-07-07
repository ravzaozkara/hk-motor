# PROGRESS.md — HK Motors Website

**Current position:** Phase 1 next.

> At session start: read CLAUDE.md, then continue from the first unchecked item below.
> At the end of each phase: check its boxes, add notes, and git commit.

## Phases
- [x] **Phase 0 — Scaffold:** Astro + git init; create CLAUDE.md & PROGRESS.md; base layout, design tokens, header + footer, sticky mobile "Acil Yol Yardımı" button; dev server runs.
- [ ] **Phase 1 — Content model + seed data:** all collections/schemas defined; Turkish placeholder content seeded (services, sample products incl. one 2nd-hand, reviews, FAQ, gallery, about, home hero, real business info in `site`).
- [ ] **Phase 2 — Home page:** hero, featured services, featured products, reviews snippet, CTAs.
- [ ] **Phase 3 — Services page.**
- [ ] **Phase 4 — Products page:** grid + category filter + pricing rule + WhatsApp "Sor" buttons + 2nd-hand fields.
- [ ] **Phase 5 — Gallery + About + FAQ + Reviews pages.**
- [ ] **Phase 6 — Contact page:** address, hours, clickable phones, WhatsApp, embedded map, Netlify form.
- [ ] **Phase 7 — Admin panel:** Sveltia CMS at /admin, Turkish labels, image upload, all collections editable.
- [ ] **Phase 8 — Polish:** SEO/meta/OG, performance, mobile QA, favicon, placeholder logo, image optimization, 404.
- [ ] **Phase 9 — Deploy + handover:** Netlify deploy; test live form + admin end to end; write Turkish KULLANIM.md guide.

## Decisions / notes log
- **2026-07-07 · Phase 0:** Astro 5 (static output), plain CSS with custom-property design tokens (no Tailwind — keeps the small site simple). Fonts: Barlow (headings) + Inter (body) via Google Fonts. Global tokens live in `src/styles/global.css`; business info + nav + `waLink()` helper live in `src/lib/site.ts` (temporary — Phase 1 moves the singleton into the `site` content collection, keeping the same shape). Sticky mobile CTA renders only ≤768px and calls the primary number. Header nav collapses into a mobile drawer ≤900px. Verified: `npm run build` succeeds and `npm run dev` serves the home page with the expected phone/WhatsApp/CTA strings.