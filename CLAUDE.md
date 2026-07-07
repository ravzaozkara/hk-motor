# CLAUDE.md — HK Motors Website

> Read this file and PROGRESS.md at the start of every session. They are the source of truth. Do not re-scan the whole codebase to re-derive context — resume from the first unchecked item in PROGRESS.md.

## What this is
Small, mobile-first, Turkish-only showcase website for HK Motors, a motorcycle repair shop.
Focus: repair / maintenance / 24-7 roadside assistance. Secondary: showcase catalogue of spare
parts, accessories, and second-hand motorcycles — inquiries via WhatsApp/phone only. No cart, no payment.

## Stack
- Astro (static output)
- Netlify hosting (free) + Netlify Forms for the contact form
- Sveltia CMS at /admin (Turkish labels, image upload) — owner-editable content
- Google Maps embed iframe (no API key)
- Turkish only (no i18n)

## Commands
- Dev:    `npm run dev`
- Build:  `npm run build`
- Preview:`npm run preview`

## Business info (default content)
- Name: HK Motors
- Address: Çırçır Mah. Sezai Karakoç Cad. No:27/29 Eyüpsultan/İstanbul
- Hours: 09:00–21:00
- Roadside: 7/24, İstanbul Avrupa
- Phone primary (call + WhatsApp): +90 537 213 6728 → wa.me/905372136728 → tel:+905372136728
- Phone secondary (call only): +90 507 061 2860 → tel:+905070612860
- No logo / social yet (placeholders). Free Netlify subdomain; custom domain later.

## Design tokens
- Base dark: anthracite / charcoal. Accent: amber / safety yellow. Light content backgrounds.
- Headings: industrial sans (Barlow/Archivo). Body: Inter. Mobile-first, large tap targets.
- Sticky mobile CTA button: "Acil Yol Yardımı — Ara" → tel:+905372136728

## Content model
Collections: site (singleton), home (singleton), services, products, gallery, reviews, faq, about (singleton).
products.category ∈ { yedek-parca, aksesuar, ikinci-el }. price optional.
ikinci-el extra optional fields: brand, model, year, km, engineCc, condition.
Pricing rule: price present → show `₺` amount; price empty → show "Fiyat için WhatsApp'tan sor".
Each product has a WhatsApp "Sor" button → wa.me/905372136728 with pre-filled Turkish message.

## Pages
Ana Sayfa, Hizmetler, Ürünler (category filter), Galeri, Hakkımızda, SSS, Müşteri Yorumları, İletişim, /admin.

## Conventions
- Keep it simple; this is a small showcase site. All user-facing text in Turkish.
- Optimize images. Commit once per completed phase.
- Update PROGRESS.md checkboxes + notes at the end of every phase.