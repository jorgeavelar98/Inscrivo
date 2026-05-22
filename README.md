# Inscrivo — Marketing Website

The conversion-focused marketing site for **Inscrivo**, a service that designs and hosts
professional websites for restaurants. Its single job: turn a visiting restaurant owner
into a paying customer.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Fully bilingual
(English + Spanish) with an in-page language toggle. No CMS, no database — a static
marketing site.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass with zero type/lint errors)
npm run start    # serve the production build
npm run lint     # ESLint
```

Requires Node 18.18+ (developed on Node 20).

---

## Project structure

```
src/
  app/
    layout.tsx        # root layout: Inter font, SEO metadata, providers, Vercel Analytics
    page.tsx          # assembles the single landing page from section components
    globals.css       # theme tokens (CSS custom properties) + Tailwind v4 @theme + motion
  lib/
    translations.ts   # ← ALL user-facing copy lives here (en + es)
    i18n.tsx          # language context, useTranslation() hook, localStorage persistence
  components/         # Navbar, Hero, ValueProps, HowItWorks, FeatureShowcase,
                      # Pricing, Faq, Contact, Footer, LanguageToggle, CtaButton, Reveal
public/
  hero-phone.svg      # PLACEHOLDER hero visual
  dashboard.svg       # PLACEHOLDER owner-dashboard visual
  sample-site.svg     # PLACEHOLDER sample-site visual
```

---

## Editing the copy / translations

**Every** user-facing string — nav, hero, features, pricing, FAQ, footer, buttons, form
labels and image `alt` text — lives in [`src/lib/translations.ts`](src/lib/translations.ts).
Components never hardcode text; they read it via the `useTranslation()` hook.

To change wording, edit `translations.ts`. The English object (`en`) defines the shape and
TypeScript forces the Spanish object (`es`) to match it key-for-key, so you can't forget a
translation. Spanish is neutral Latin American Spanish written for restaurant owners.

### How the language toggle works

- A visible `EN | ES` toggle sits in the navbar and footer.
- The choice is persisted to `localStorage` (`inscrivo-locale`).
- On first visit the language defaults from `navigator.language` (Spanish browsers land in
  Spanish), falling back to English.
- `<html lang>` and the document `<title>` update to match the active locale.

---

## Theming / colors

Theme colors are declared once as CSS custom properties in
[`src/app/globals.css`](src/app/globals.css) (`--color-primary`, `--color-accent`, etc.)
and exposed to Tailwind through the `@theme` block, so you use them as utilities like
`bg-primary` / `text-accent`. The starting palette is a deep slate base + warm
amber/terracotta accent — **change the values in `:root` and the whole site updates.**

---

## TODOs before launch (search the codebase for `TODO:`)

These are the real-data gaps left for the owner to fill in:

- **Contact destination** — the contact form currently just shows a confirmation
  client-side. Wire it to a real endpoint (Formspree/Resend, an API route, or a Calendly
  booking link). See [`src/components/Contact.tsx`](src/components/Contact.tsx) and the
  pricing CTA in [`src/components/Pricing.tsx`](src/components/Pricing.tsx).
- **Email & phone** — replace the placeholder `hello@inscrivo.com` / `(555) 123-4567` in
  `translations.ts` (`contact.emailValue` / `contact.phoneValue`).
- **Real screenshots** — replace the three placeholder SVGs in `public/` with real
  screenshots of sites Inscrivo has built and the owner dashboard.
- **Pricing** — confirm `$699` setup / `$99`/mo against live Stripe products
  (see note in `Pricing.tsx`).
- **Domain & Open Graph** — set the real production domain in `metadataBase` and add a
  `public/og-image.png` (1200×630) — see [`src/app/layout.tsx`](src/app/layout.tsx).

---

## Notes

- Only the **Standard** plan is shown publicly, by design. The Basic plan is sold in
  person and intentionally appears nowhere on the site.
- All testimonials/logos/stats are intentionally omitted rather than faked. Add real
  ones when available.
- `@vercel/analytics` is wired up in the root layout for page-view tracking.
