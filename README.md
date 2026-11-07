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
  styles/tokens/    design tokens: colour (the 2026 rebrand palette), type, spacing, radii, elevation, motion
  components/ds/    design-system components: Button, Badge, Logo, Landscape, Eyebrow, SceneBand, Dialog, form
                    controls, OrderLine, SlotImage
  components/site/  site header (desktop nav and mobile menu), footer, language switch
  features/         one folder per page (landing, order, jobs, franchise), plus forms shared by jobs and franchise
  i18n/             locale config, page metadata, and one dictionary per page
  lib/              branches (locations, hours, distance), Jazan clock, draft store
  assets/           brand images, fonts, and the photos placed in the design's image slots
```

## Brand

The site follows the 2026 rebrand ("REBRANDING.MAHU CAFE"):

- **Colour.** Cream paper (`#FFF3E1`) and ink (`#0D0D0D`), led by the sunset gradient: orange `#EF964A` into
  coral `#E86660`. Teal `#067B80` is a minor accent. Text on orange, coral or the gradient is ink; cream text
  only sits on ink or photos. See `src/styles/tokens/colors.css`.
- **Logo.** `Logo` draws the bilingual wordmark (ماهو / MāHū) as vectors extracted from the brand PDF:
  `stacked`, `horizontal`, `latin` and `arabic` lockups.
- **Line art.** `Landscape` draws the cover's mountains and waves ("Jazan, from its mountains to its sea").
  It's the only illustration style.
- **Type.** The brand sets its copy in Effra, which isn't licensed for the web here. Tajawal stands in for
  Arabic, Figtree for Latin text; Latin headlines use Big Shoulders Display, which echoes the logo's
  condensed letters.

## Styling

- **CSS Modules** sit on top of the design system's CSS custom properties.
- **Cascade layers.** `globals.css` declares two: `base` for element defaults and `components` for the design-system
  primitives. Page modules are unlayered, so their overrides always win.
- **Arabic.** Overrides on `[lang="ar"]` switch the type to Tajawal and loosen tracking and line heights.
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

- **Fonts.** Effra (the rebrand's typeface) isn't licensed for the web here; Tajawal, Figtree and Big
  Shoulders Display stand in. Swap them in `src/app/fonts.ts` once web licences exist.
- **Hero photo.** The rebrand's website photo was supplied at 833 × 833 px with the logo baked in. A larger
  version (about 2000 px) without the logo would look sharper on large and high-density screens.
- **Product photos.** The drink photos in `src/assets/slots/` and the jobs-page photos still show the 2021
  cups (teal logo, beach illustrations). Reshoot them with the new gradient cups.

## Deploying

Deploy to Vercel or any Node host (`next start`). It isn't a static export: the `/` → `/ar` redirect and image
optimisation need the Next.js server.
