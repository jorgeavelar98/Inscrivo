# Build Prompt — Inscrivo Marketing Website

> **How to use this file:** Start a fresh Claude Code session in a **brand-new, empty
> repository** (not this one) and paste the contents of this file as your first message.
> This repo (`InscrivoSites`) builds restaurant *client* sites — it is the product, not
> the storefront. The site described below is Inscrivo's own **sales/marketing site**,
> which is what convinces restaurant owners to buy. Keep the two repos separate.

---

## Your task

Build a polished, conversion-focused **marketing website for Inscrivo**, a service that
designs and hosts professional websites for restaurants. The site's single job is to turn
a visiting restaurant owner into a paying customer — clear value, social proof, an honest
price, and an obvious way to get started.

It must be **fully bilingual (English + Spanish)** with an in-page language toggle, because
a large share of the target market are Spanish-speaking restaurant owners.

Scaffold a new project with:

```bash
npx create-next-app@latest inscrivo-site --typescript --tailwind --app --eslint
```

Then build everything described below inside it.

---

## About the business (context you need)

**Inscrivo builds and hosts websites for restaurants — they never have to touch code.**

The product is a multi-tenant platform: each restaurant gets its own fast, mobile-friendly
website (home, menu, photo gallery, hours, location, contact) plus a private **owner
dashboard** where they update their own menu, hours, photos, and text anytime — no developer,
no redeploy, changes go live in seconds. Owners log in with a passwordless **magic link** sent
to their email.

Sell the *outcomes*, not the tech. What a restaurant owner actually gets:

- A professional website live in days, not months
- They control their own content — change a price or a photo from their phone
- Looks great on mobile (where their customers actually are)
- Built-in photo gallery, menu, hours, directions, and click-to-call
- Direct links to their online-ordering / reservation platforms
- Fast and reliable hosting; page-view analytics included
- Custom domain support (e.g. `mytaqueria.com`)

**Tone:** confident, warm, plain-spoken, small-business-friendly. Not corporate, not techy.
Speak to a busy restaurant owner, not a CTO.

---

## Pricing (show the Standard plan ONLY)

Display **one** plan publicly — Standard. The Basic plan is sold in person and must **not**
appear anywhere on the site.

**Standard**
- **$699** one-time setup
- **$99 / month** hosting + unlimited content updates
- *(Confirm against live Stripe before launch — these match the current Standard "Website
  Setup" and "Website Hosting" products as of this prompt.)*

What's included (list these on the pricing card):

- Custom-designed website (home, menu, gallery, hours, location, contact)
- Owner dashboard — update menu, hours, photos, and text yourself, anytime
- Mobile-optimized and fast
- Photo gallery + menu management
- Click-to-call, directions, and online-ordering / reservation links
- Custom domain support
- Page-view analytics
- Ongoing hosting and support

CTA on the pricing section should drive to **"Get started"** / **"Empezar"** → the contact
form (or a `mailto:`/booking link — leave a clearly-marked TODO for the real destination).

---

## Internationalization (English + Spanish)

This is a hard requirement, not a nice-to-have.

- **No heavy i18n library.** Use a simple, typed approach: a `lib/translations.ts` dictionary
  keyed by locale (`en` / `es`), and a lightweight React context + `useTranslation()` hook.
- A visible **language toggle** in the navbar (e.g. `EN | ES`), persisted to `localStorage`.
- On first visit, default the language from `navigator.language` (Spanish speakers land in
  Spanish), falling back to English.
- **Every** user-facing string — nav, hero, features, pricing, FAQ, footer, buttons, form
  labels, alt text — must come from the dictionary. No hardcoded copy in components.
- Set `<html lang>` to match the active locale.
- Translations must be natural, native-quality Spanish — not machine-literal. Use neutral
  Latin American Spanish appropriate for restaurant owners.

---

## Design direction

The user is undecided on colors and wants it to look **professional and genuinely enticing
for business orders.** Use this as the recommended starting palette, and refine for polish:

- **Recommended palette:** a deep, trustworthy base (ink/charcoal `#1a1a2e` or deep slate)
  paired with a warm, appetizing accent (amber/terracotta `#e07a3f` or a confident orange).
  Warm accents read as "food" and "inviting"; the dark base reads as "premium and serious."
  Generous whitespace, a clean sans-serif (e.g. Inter), and one tasteful display weight for
  headlines.
- Expose theme colors as CSS custom properties and consume them via Tailwind's extended
  config (mirror how the product repo does `--color-primary` / `--color-secondary`).
- High-contrast, accessible (WCAG AA), large tap targets, no tiny text.
- Use real-feeling restaurant imagery placeholders (`next/image` with descriptive alt) and
  leave clearly-marked TODOs where the user should drop in real screenshots of sites Inscrivo
  has built.
- Subtle, tasteful motion only (fade/slide on scroll). Nothing gimmicky.

---

## Page structure (single landing page, smooth-scroll sections)

1. **Navbar** — Inscrivo logo/wordmark, anchor links, language toggle, primary "Get started" CTA.
2. **Hero** — one-line promise ("A professional website for your restaurant — and you control
   it."), short subhead, primary + secondary CTA, hero visual (mock of a restaurant site on a
   phone).
3. **Value props** — 3–4 benefit cards (you control your content / live in days / looks great
   on mobile / everything in one place).
4. **How it works** — 3 simple steps (1. We build it → 2. You review & we launch → 3. Update
   it yourself anytime).
5. **Feature showcase** — the owner dashboard + a sample site, with short captions.
6. **Pricing** — single Standard card as specified above.
7. **FAQ** — 5–6 questions (Do I need to know anything technical? Can I make changes myself?
   How long does it take? Can I use my own domain? What if I need help? — answer in both
   languages).
8. **Final CTA / Contact** — strong closing pitch + contact form or booking link (TODO for real
   endpoint) and an email/phone.
9. **Footer** — Inscrivo name, copyright, language toggle, minimal links.

---

## Engineering conventions (match the product repo's standards)

- **Next.js App Router + TypeScript.** No `any` types — everything properly typed.
- **Tailwind only.** No inline styles, no CSS modules.
- **`next/image` for every image. Never `<img>`.**
- **`next/link` for internal navigation. Never `<a>` for internal links.**
- Components are reusable and config/props-driven; no copy hardcoded inside them (it lives in
  the translation dictionary).
- Handle all optional/nullable data gracefully.
- Fully responsive, mobile-first (`sm:` `md:` `lg:`).
- Good SEO: per-locale `<title>` / meta description, Open Graph tags, semantic headings.
- Add `@vercel/analytics` (the product repo uses Vercel Web Analytics) so traffic is tracked.
- `npm run build` must pass with zero type/lint errors before you consider the task done.

---

## Deliverables / definition of done

- A running site (`npm run dev`) with all sections above, fully bilingual via the toggle.
- Clean, typed, build-passing code following the conventions.
- All real-data gaps (contact destination, phone/email, real screenshots, custom domain) left
  as clearly-marked `TODO:` comments so the owner can fill them in.
- A short `README.md` explaining how to run it, where to edit translations, and where the
  TODOs are.

## Do NOT

- Show or mention the Basic plan anywhere.
- Invent fake testimonials, fake client logos, or fake statistics — use clearly-labeled
  placeholders instead.
- Pull in a heavy i18n framework, a CMS, or a database. This is a static marketing site.
- Copy restaurant-client code from the product repo — this is a separate, standalone project.
