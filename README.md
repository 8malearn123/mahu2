# Mahu — website

Next.js build of the **Mahu Landing Page Design** (a Claude Design export) for Mahu, a specialty coffee drive thru in
Jazan. Four pages, in Arabic (the default, right-to-left) and English.

## Running it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev                 # http://localhost:3000, which redirects to /ar
npm run build && npm start  # production build
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/ar`, `/en` | Landing: hero, how it works, featured drinks, points card, story, the four windows, order call-to-action |
| `/{lang}/order` | Order ahead: menu → name for the cup → number → code → pay. Returning customers go menu → confirm. |
| `/{lang}/jobs` | Jobs: life at the window, open roles, application form |
| `/{lang}/franchise` | Franchise: the numbers, what you get, enquiry form |

- `/` redirects to `/ar`. Any URL that doesn't exist gets the bilingual 404 page (`src/app/global-not-found.tsx`).
- Order deep links: `?add=<drink>` puts a drink in the basket (e.g. `/en/order?add=mahu-latte`).
  `?branch=<window>` picks the pickup window: `corniche`, `prince`, `abuarish` or `sabya`.

## Project structure

```
src/
  app/              routes. app/[lang]/layout.tsx is the root layout: it sets lang/dir and the fonts
                    fonts.ts, globals.css, global-not-found.tsx, icon.png
  styles/tokens/    design tokens from the Mahu Cafe design system: colour, type, spacing, radii, elevation, motion
  components/ds/    design-system components: Button, Badge, Logo, SceneBand, Dialog, form controls, OrderLine, SlotImage
  components/site/  site header (desktop nav and mobile menu), footer, language switch
  features/         one folder per page (landing, order, jobs, franchise), plus forms shared by jobs and franchise
  i18n/             locale config, page metadata, and one dictionary per page
  lib/              branches (locations, hours, distance), Jazan clock, draft store
  assets/           brand images, fonts, and the photos placed in the design's image slots
```

## Styling

- **CSS Modules** sit on top of the design system's CSS custom properties.
- **Cascade layers.** `globals.css` declares two: `base` for element defaults and `components` for the design-system
  primitives. Page modules are unlayered, so their overrides always win.
- **Arabic.** Overrides on `[lang="ar"]` switch the type to Tajawal and Almarai and loosen tracking and line heights.
- **RTL.** Layouts use logical properties (`inset-inline-start`, `margin-inline-start`…), so they mirror automatically.

## Copy and languages

- All copy lives in `src/i18n/dictionaries/`, with English and Arabic side by side. The types make sure both languages
  have the same keys.
- The language switch goes to the same page in the other language. Basket, checkout step and form fields carry over
  (see `src/lib/draftStore.ts`).

## Front-end only (for now)

- **Order ahead is a demo.**
  - The verification code accepts any four digits.
  - Payment is simulated and the order number is random.
  - Points, the saved "usual" and the verified number are kept in the browser's localStorage (`mahu.order.v1`).
- **Forms don't send anything yet.** Job applications and franchise enquiries validate and show a confirmation. Connect a
  backend in `submitApplication` (`src/features/jobs/application.ts`) and `submitEnquiry`
  (`src/features/franchise/enquiry.ts`).
- **Opening hours.** A window's open/closed status uses Jazan time (Asia/Riyadh), whatever the visitor's timezone.

## Gaps in the brand assets

These come from the design system's own list of missing material:

- **Fonts.** Big Shoulders Display and Archivo Narrow stand in for the brand's Luam typeface, which wasn't supplied.
- **Logo.** The wordmark is a raster PNG. Swap in a vector logo in `src/assets/brand` when one exists.
- **Arabic wordmark.** There isn't one yet.

## Deploying

Deploy to Vercel or any Node host (`next start`). It isn't a static export: the `/` → `/ar` redirect and image
optimisation need the Next.js server.
