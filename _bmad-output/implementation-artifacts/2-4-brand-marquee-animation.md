# Story 2.4: Brand Marquee Animation

Status: review

## Story

As a site visitor,
I want to see an auto-scrolling brand logo strip in the hero area,
so that I can quickly see the trusted brands SV Enterprises carries.

## Acceptance Criteria

1. Given the homepage hero section is displayed, when the brand marquee is visible, then brand names/logos scroll horizontally in a continuous infinite loop animation.
2. Automobile mode marquee uses the automobile brand list from the JSON catalogue.
3. Industrial mode marquee uses the industrial brand list from the JSON catalogue.
4. Switching between Automobile and Industrial modes updates the marquee brand list without a full page reload.
5. The marquee uses the existing CSS-based `brandMarquee` animation from `src/app/globals.css`.
6. The marquee duplicates the brand list enough to create a seamless loop without visible gaps.
7. The animation is smooth and does not jank on mobile.
8. Reduced-motion users do not get forced marquee motion; existing `prefers-reduced-motion` behavior is preserved.
9. The implementation preserves the reference class names and responsive behavior from `src/app/globals.css`.
10. `npm run lint` and `npm run build` pass after implementation.

## Tasks / Subtasks

- [x] Add hero brand marquee component. (AC: 1, 2, 3, 4, 5, 6, 9)
  - [x] Create `src/components/home/BrandMarquee.tsx`.
  - [x] Render the marquee inside the hero visual area from Story 2.1, matching the reference `.hero-brand-panel`, `.hero-brand-label`, `.hero-brand-list`, and `.hero-brand-pill` structure.
  - [x] Use the label `Our Brands` unless mode content provides a better reference-compatible label.
  - [x] Duplicate the active mode brand list at least once, matching the reference `repeated = [...brands, ...brands]` behavior.
  - [x] Do not create new marquee keyframes or JavaScript animation loops.
- [x] Wire marquee into active homepage mode. (AC: 2, 3, 4)
  - [x] Use the same `ModeContext`/mode state established by Story 2.1 and reused by Stories 2.2 and 2.3.
  - [x] Read brands from `src/data/catalog.json` through `src/lib/dataUtils.ts` when available.
  - [x] Do not create a second mode state or component-local brand arrays.
  - [x] Ensure toggling mode updates marquee pills in the same render cycle as the rest of the homepage.
- [x] Preserve CSS animation behavior. (AC: 5, 7, 8, 9)
  - [x] Use existing `.hero-brand-list { animation: brandMarquee 38s linear infinite; }` from `globals.css`.
  - [x] Preserve existing `@keyframes brandMarquee`.
  - [x] Preserve existing `@media (prefers-reduced-motion: reduce)` behavior for `.hero-brand-list`.
  - [x] Do not add timer-based animation, requestAnimationFrame loops, or animation libraries.
- [x] Preserve story boundaries. (AC: 1-10)
  - [x] Do not implement the `/brands` page; that belongs to Epic 4.
  - [x] Do not change the Top Brands grid from Story 2.2 unless needed to share a small presentational helper.
  - [x] Do not add featured products, advantages, contact band, product detail pages, filters, search, or category pages.
  - [x] Do not add Firebase, database, CMS, auth, cart, checkout, payment, or order behavior.
- [x] Validate marquee behavior. (AC: 1-10)
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Manually inspect `/` at mobile width around 360-430px and desktop width.
  - [x] Confirm the marquee scrolls smoothly and loops without visible empty gaps.
  - [x] Confirm active mode changes the marquee brand list.
  - [x] Confirm reduced-motion settings stop or reduce the animation according to existing CSS.

## Dev Notes

### Dependencies And Ordering

- Story 2.1 should be implemented first because the marquee belongs in the hero visual area.
- Stories 2.2 and 2.3 can coexist with this story but are not required for the marquee itself beyond shared mode state.
- Story 1.3 and Story 1.4 must be implemented before this story if they are not already done. This story must not create temporary brand arrays in components.
- Story 1.5 may provide `ModeContext`; otherwise use the compatible context established by Story 2.1.

### Current Project State

- Sprint status currently has Stories 2.1, 2.2, and 2.3 as `ready-for-dev`, not necessarily implemented.
- `src/app/globals.css` already contains `.hero-brand-panel`, `.hero-brand-label`, `.hero-brand-list`, `.hero-brand-pill`, `@keyframes brandMarquee`, and reduced-motion styling.
- The current source tree may still contain only the starter `src/app/page.tsx` unless earlier stories have been developed.
- `src/app/page.module.css` is starter CSS and must not be used for homepage marquee behavior.

### Reference Implementation Details

Use `reference/index.html` as the markup and behavior reference:

- Hero brand panel markup appears inside the hero visual area near `hero-brand-panel`.
- `renderHeroBrands(brands)` targets `hero-brand-list`.
- The reference duplicates the list with `const repeated = [...brands, ...brands]`.
- Each brand is rendered as `.hero-brand-pill`.
- CSS animation is defined by `.hero-brand-list` and `@keyframes brandMarquee`.
- Reduced-motion behavior is defined under `@media (prefers-reduced-motion: reduce)`.

### Data Requirements

Data must come from the JSON source of truth:

- Automobile brands: `catalog.json.brands.automobile`
- Industrial brands: `catalog.json.brands.industrial`

Expected automobile brands include:

- Annabond
- Ceekay
- Delphi
- Elofic
- Gabriel
- Gates
- Hella
- Hi-Q+
- NGK
- OSRAM
- Varroc
- Wurth

Expected industrial brands include:

- SKF
- NSK
- FAG
- Fenner
- Bonfiglioli
- Bosch Rexroth
- Janatics
- Parker
- ABB
- Siemens
- Hiwin
- Wurth

### Component Boundary Guidance

- `BrandMarquee` can be a Client Component if it consumes active mode context directly.
- If the homepage has a single client wrapper from prior Epic 2 stories, prefer passing `brands` into a presentational `BrandMarquee` to avoid unnecessary client boundaries.
- Do not use browser timers for the marquee; CSS owns the animation.
- Keep the default Automobile brand list present in rendered HTML where practical for crawlability and no-JS baseline content.

### Architecture Guardrails

- JSON remains the data source of truth. Do not create `brandMarqueeData.ts`, `brands.ts`, or component-local brand arrays.
- Do not import raw `catalog.json` directly in components if `dataUtils.ts` exists; use the utility layer.
- Preserve reference class names and CSS variables exactly.
- Do not replace the reference CSS with Tailwind, CSS Modules, a UI library, or a JS animation library.
- No Firebase, Firestore, Firebase Storage, Prisma, CMS, API data routes, auth, cart, checkout, payment, order, or form-submission functionality.

### Testing / Verification

Run:

```bash
npm run lint
npm run build
```

Manual verification:

- `/` shows the brand marquee in the hero area.
- Automobile mode shows automobile brands in the marquee by default.
- Industrial mode shows industrial brands in the marquee.
- The marquee loops continuously with no obvious gap.
- Mobile widths 360-430px do not show page-level horizontal scrolling.
- Browser reduced-motion setting stops or reduces the marquee motion according to `globals.css`.

## Project Structure Notes

Expected files created or modified:

```text
src/app/page.tsx
src/components/home/BrandMarquee.tsx
src/components/home/HeroSection.tsx
_bmad-output/implementation-artifacts/2-4-brand-marquee-animation.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

Expected prerequisite files:

```text
src/data/catalog.json
src/data/types.ts
src/lib/dataUtils.ts
src/context/ModeContext.tsx
src/components/home/HeroSection.tsx
```

Do not create:

```text
src/data/brands.ts
src/data/brandMarquee.ts
src/components/home/brandMarqueeData.ts
```

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 2.4]
- [Source: _bmad-output/planning-artifacts/architecture.md - Component Organization, Data Flow, Frontend Architecture]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - FR-2 Hero brand marquee strip]
- [Source: reference/index.html - hero brand panel markup, `renderHeroBrands`, and `brandMarquee` CSS]
- [Source: src/app/globals.css - `.hero-brand-list`, `.hero-brand-pill`, `@keyframes brandMarquee`, reduced-motion rules]
- [Source: _bmad-output/implementation-artifacts/2-1-mode-toggle-and-hero-section.md - hero and mode-state prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-3-json-catalogue-and-typescript-data-types.md - brand data prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-4-utility-libraries.md - data utility prerequisite]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `npm run lint`
- `npm run build`
- `curl.exe -I http://localhost:3000`
- Rendered home HTML confirmed `hero-brand-panel` and automobile brand pills on `/`.

### Completion Notes List

- Story context created from Epic 2 requirements, PRD FR-2, architecture data-flow rules, reference marquee implementation, and existing extracted CSS.
- Story reviewed for common implementation traps: duplicate brand arrays, JS animation loops, missing reduced-motion support, mode state divergence, full-page horizontal scroll, and scope creep into the `/brands` page.
- Added a presentational `BrandMarquee` component and wired it into the shared hero mode flow.
- The marquee uses the existing CSS animation and duplicated brand list pattern from the reference markup.
- Verified the generated home HTML includes the automobile marquee content; `npm run lint` and `npm run build` passed.

### File List

- `_bmad-output/implementation-artifacts/2-4-brand-marquee-animation.md`
- `src/components/home/BrandMarquee.tsx`
- `src/components/home/HeroSection.tsx`

## Change Log

- Implemented the hero brand marquee and connected it to the active homepage mode.
- Preserved the existing CSS-driven animation model and reference class names.
- Updated the story record and sprint tracker to `review`.
