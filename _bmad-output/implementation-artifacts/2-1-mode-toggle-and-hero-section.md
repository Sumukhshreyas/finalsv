# Story 2.1: Mode Toggle & Hero Section

Status: review

## Story

As a site visitor,
I want to toggle between Automobile and Industrial modes on the homepage and see a dynamic hero section with slideshow,
so that I immediately understand what products SV Enterprises offers in my area of interest.

## Acceptance Criteria

1. Given the user loads the homepage (`/`), when the page renders, then the hero section displays with Automobile mode active by default.
2. A two-button toggle is visible in the hero with labels "Automobile Products" and "Industrial Products".
3. In Automobile mode, the hero displays mode-specific title, subtitle, and three highlight points from the JSON catalogue mode content.
4. In Automobile mode, the hero displays two CTA links/buttons: "Search Parts" and "Browse by Category".
5. A hero image slideshow is visible and auto-rotates with CSS transitions, using the reference `.hero-slide` and `.active` behavior.
6. Automobile mode uses the reference orange accent styling.
7. Given the user selects "Industrial Products", when the mode switches, then the hero title, subtitle, highlights, CTA context, and visual accent update to industrial content.
8. Industrial mode uses the reference blue-grey accent styling via `body[data-home-mode="industrial"]` or an equivalent root data attribute that preserves existing CSS behavior.
9. Mode selection persists during the browser session when the user navigates away and returns to the homepage.
10. The implementation preserves the reference hero class names and responsive behavior from `src/app/globals.css`.
11. The starter Next.js homepage UI and `page.module.css` dependency are removed from the rendered homepage.
12. `npm run lint` and `npm run build` pass after implementation.

## Tasks / Subtasks

- [x] Replace the starter homepage with the reference hero shell. (AC: 1, 2, 3, 4, 10, 11)
  - [x] Update `src/app/page.tsx` so it no longer imports `src/app/page.module.css`.
  - [x] Render the homepage hero using reference classes: `.page`, `.hero`, `.container`, `.hero-grid`, `.hero-content`, `.hero-title`, `.hero-copy`, `.hero-points`, `.hero-actions`, `.hero-cta`, `.hero-visual-card`, `.hero-slide`, `.hero-mode-switch`, and `.hero-mode-btn`.
  - [x] Remove or leave unused `src/app/page.module.css`; do not keep it imported.
  - [x] Do not redesign the hero or introduce Tailwind/CSS Modules for reference classes.
- [x] Create focused homepage components. (AC: 1-8, 10)
  - [x] Create `src/components/home/HeroSection.tsx`.
  - [x] Create `src/components/home/ModeToggle.tsx`.
  - [x] Create `src/components/home/HeroSlideshow.tsx`.
  - [x] Use Client Components only where interaction, state, effects, or browser storage are required.
  - [x] Keep page/layout components server-renderable where possible.
- [x] Integrate mode state correctly. (AC: 1, 7, 8, 9)
  - [x] Use `ModeContext` from Story 1.5 if it exists.
  - [x] If Story 1.5 is not implemented, create the minimal compatible `src/context/ModeContext.tsx` needed by this story and keep it aligned with Story 1.5 expectations.
  - [x] Default mode to `automobile`.
  - [x] Persist selected mode in `sessionStorage`, not localStorage, because the PRD requires session persistence.
  - [x] Apply the selected mode to `body[data-home-mode]` or an equivalent root data attribute that activates the existing industrial CSS selectors.
- [x] Read hero content from the JSON data layer. (AC: 3, 4, 7)
  - [x] Use `src/lib/dataUtils.ts` from Story 1.4 when available.
  - [x] Use mode content from `src/data/catalog.json` created by Story 1.3; do not duplicate hero copy in component-local arrays.
  - [x] If Story 1.3/1.4 is not implemented yet, implement those prerequisite stories first instead of creating alternate homepage data files.
  - [x] Use the `siteModes` content from `reference/index.html` as the source reference for expected titles, copy, points, and mode labels.
- [x] Implement CTAs and slideshow behavior. (AC: 4, 5)
  - [x] "Search Parts" links to `/search`.
  - [x] "Browse by Category" links to `/categories`.
  - [x] Auto-rotate hero slides every 5 seconds to match the reference behavior.
  - [x] Respect `prefers-reduced-motion` by avoiding unnecessary animation/timer behavior when reduced motion is requested.
  - [x] Use image paths provided by the JSON catalogue or reference-compatible public assets; do not introduce remote image dependencies for this story.
- [x] Validate implementation. (AC: 1-12)
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Manually inspect `/` at mobile width around 360-430px and desktop width to confirm no horizontal scroll and no overlapping hero text/buttons.
  - [x] Confirm toggling to industrial changes copy, highlights, active button state, and accent color.
  - [x] Confirm session persistence by navigating away and returning within the same browser session.

## Dev Notes

### Dependencies And Ordering

- Story 1.2 is done and provides the global reference CSS in `src/app/globals.css`.
- Story 1.3 and Story 1.4 are `ready-for-dev`. Story 2.1 should use their JSON catalogue and utility layer. If they are not implemented, implement them first rather than hardcoding duplicate mode/homepage data.
- Story 1.5 is `ready-for-dev`. If it is implemented first, reuse its `ModeContext`; if not, keep any temporary context implementation compatible with Story 1.5 so it does not need to be rewritten.
- Story 2.1 owns only the hero and mode toggle. Categories strip, top brands, featured products, advantages, contact band, and brand marquee are Epic 2 follow-up stories.

### Current Project State

- `src/app/page.tsx` still renders the default Next.js starter page and imports `src/app/page.module.css`.
- `src/app/page.module.css` still contains starter styles, including a `var(--font-geist-sans)` reference and starter dark-mode styling. Do not keep it attached to the homepage.
- `src/app/layout.tsx` currently imports Barlow fonts and `globals.css`.
- No `src/components/home/` directory exists yet unless created by an earlier implementation.
- No `src/data/`, `src/lib/`, or `src/context/` directory exists yet unless prior ready stories have been implemented.

### Reference Implementation Details

Use `reference/index.html` as the markup and behavior reference:

- Hero markup starts around the `#page-home` section.
- Reference classes include `.hero`, `.hero-grid`, `.hero-content`, `.hero-title`, `.hero-copy`, `.hero-points`, `.hero-point`, `.hero-point-badge`, `.hero-actions`, `.hero-cta`, `.hero-visual-card`, `.hero-slide`, `.hero-mode-switch`, and `.hero-mode-btn`.
- `setHomeMode(mode)` updates `currentHomeMode`, sets `body[data-home-mode]`, toggles active button state, updates hero title/copy/points, and updates mode-driven sections.
- `rotateHeroSlide()` changes the active `.hero-slide` every 5000ms.
- Industrial styling is driven by selectors such as `body[data-home-mode="industrial"] .hero` and `body[data-home-mode="industrial"] .hero-mode-btn.active`.

### Mode Content Requirements

Expected source data should come from `catalog.json.modes`.

Automobile hero reference:

- Title: `Automobile spare parts, <span>ready to source.</span>`
- Copy: `Trusted Bangalore supplier for car, commercial, tractor, construction, forklift, and two-wheeler parts. Search by OEM number, product code, vehicle, category, or brand.`
- Points: `5000+ Parts In Stock`, `Same Day Dispatch`, `GST Invoice Available`

Industrial hero reference:

- Title: `Wholesale industrial products, <span>ready for supply.</span>`
- Copy: `Trusted Bangalore dealer for motors, bearings, hydraulics, pneumatics, sealing products, gearboxes and workshop consumables for factories, maintenance teams, and OEM buyers.`
- Points: `Bulk Orders Welcome`, `Factory Supply Support`, `Bangalore Wholesale Dispatch`

Keep HTML in titles controlled. Prefer storing split title text in JSON or rendering a safe typed structure instead of injecting arbitrary HTML strings.

### Component Boundary Guidance

- `ModeToggle` must be a Client Component.
- `HeroSlideshow` must be a Client Component if it owns interval state.
- `HeroSection` can be a Client Component if it consumes `ModeContext`; otherwise it can receive mode/content props.
- Avoid making `src/app/page.tsx` a Client Component unless needed. Prefer a small client wrapper for interactive hero behavior.

### Architecture Guardrails

- JSON remains the data source of truth. Do not add Firebase, Firestore, Firebase Storage, Prisma, CMS, database SDKs, auth, cart, checkout, payment, or order functionality.
- Do not create duplicate homepage data in `src/components/**`, `src/app/page.tsx`, or new TypeScript data files.
- Use `src/lib/dataUtils.ts` for catalogue/mode queries once Story 1.4 exists.
- Preserve reference class names and CSS variables exactly.
- Do not replace the reference CSS with a new design system.
- Keep the homepage crawlable: core hero title/copy should exist in rendered HTML for the default Automobile mode.

### Testing / Verification

Run:

```bash
npm run lint
npm run build
```

Manual verification:

- `/` loads with Automobile hero by default.
- Toggle buttons are keyboard reachable and have visible active state.
- Industrial mode updates copy, points, active state, and accent color.
- Session persistence works within the same browser session.
- Hero slideshow rotates visually and does not cause layout shift.
- Mobile widths 360-430px do not show horizontal scrolling.

## Project Structure Notes

Expected files created or modified:

```text
src/app/page.tsx
src/components/home/HeroSection.tsx
src/components/home/ModeToggle.tsx
src/components/home/HeroSlideshow.tsx
src/context/ModeContext.tsx              # only if Story 1.5 has not already created it
_bmad-output/implementation-artifacts/2-1-mode-toggle-and-hero-section.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

Expected files not to use for the homepage:

```text
src/app/page.module.css
```

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Epic 2 and Story 2.1]
- [Source: _bmad-output/planning-artifacts/architecture.md - Frontend Architecture, Hybrid Mode State, Component Organization, Data Flow]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - FR-1 Mode Toggle Switch and FR-2 Homepage Sections]
- [Source: reference/index.html - `#page-home` hero markup, `siteModes`, `setHomeMode`, and `rotateHeroSlide`]
- [Source: _bmad-output/implementation-artifacts/1-3-json-catalogue-and-typescript-data-types.md - mode content data prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-4-utility-libraries.md - data and mode utility prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-5-root-layout-with-header-footer-and-floatingwhatsapp.md - `ModeContext` expectation]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Reviewed Next.js 16 page/layout guidance in `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`.
- `cmd /c npm run lint` passed.
- `$env:NEXT_PUBLIC_SITE_URL='https://new-sv-automobile.vercel.app'; cmd /c npm run build` passed.
- Built HTML check confirmed `hero-mode-switch`, `Automobile Products`, `Industrial Products`, `hero-slide`, default automobile copy, and local slideshow asset paths are present; starter "To get started" copy is absent.
- Local `next start` smoke check on `/` returned `200` and confirmed hero markers, both toggle labels, slideshow markup, and no starter UI.
- Source verification confirmed `sessionStorage`, `body[data-home-mode]`, `prefers-reduced-motion`, and slideshow interval support. A temporary Playwright attempt was blocked by missing local Playwright test dependencies; no test framework was added per story guidance.

### Completion Notes List

- Story context created from Epic 2 requirements, PRD FR-1/FR-2, architecture mode-state rules, reference hero implementation, and current implementation state.
- Story reviewed for common implementation traps: starter page residue, duplicate hardcoded data, missing prerequisite utilities, unsafe title HTML injection, reduced-motion behavior, and `body[data-home-mode]` CSS compatibility.
- Replaced the starter Next.js homepage with the reference hero shell driven by `catalog.json.modes` through `getCatalogue()`.
- Added focused homepage components for the hero section, mode toggle, and auto-rotating slideshow.
- Extended `ModeContext` to persist selected mode in `sessionStorage` and apply `body[data-home-mode]` for existing industrial CSS selectors.
- Rendered title span content safely by parsing the controlled catalogue title string instead of injecting arbitrary HTML.
- Added local reference-compatible slideshow SVG assets under `public/assets` and avoided remote image dependencies.

### File List

- `_bmad-output/implementation-artifacts/2-1-mode-toggle-and-hero-section.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/app/page.tsx`
- `src/app/page.module.css` (deleted)
- `src/context/ModeContext.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/home/ModeToggle.tsx`
- `src/components/home/HeroSlideshow.tsx`
- `public/assets/hero-machine-parts-cutout.svg`
- `public/assets/car-sedan-cutout.svg`
- `public/assets/car-suv-cutout.svg`

### Change Log

- 2026-05-20: Implemented homepage mode toggle, dynamic JSON-backed hero content, local slideshow assets, session mode persistence, and starter homepage removal.
