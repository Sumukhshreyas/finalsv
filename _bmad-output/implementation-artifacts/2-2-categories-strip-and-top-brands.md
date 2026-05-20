# Story 2.2: Categories Strip & Top Brands

Status: ready-for-dev

## Story

As a site visitor,
I want to see category cards and top brands for my selected mode on the homepage,
so that I can quickly browse product categories or identify trusted brands.

## Acceptance Criteria

1. Given the homepage is loaded with Automobile mode active, when the user scrolls past the hero section, then a horizontally scrollable strip of category cards is displayed.
2. Automobile mode category cards show all 8 automobile categories: Engine Parts, Brake Parts, Suspension, Electrical, Filters, Transmission, Cooling, and Body Parts.
3. Each category card shows a category image or reference fallback, title, description, and parts count.
4. Each category card links to the corresponding category detail page using the planned URL pattern `/{mode}/{categorySlug}/`.
5. A "View all" link is visible in the categories section and navigates to `/categories`.
6. A Top Brands section displays a grid of automobile brand cards.
7. Given the user switches to Industrial mode, when the homepage sections update, then the category strip shows all 6 industrial categories: Bearings, Hydraulic Parts, Motors, Gearboxes, Pneumatic Parts, and Seals and Couplings.
8. Industrial Hydraulic Parts uses the SEO slug override `hydraulic-hoses` for category links.
9. Industrial mode brands show industrial brands from the JSON catalogue, including SKF, NSK, FAG, Fenner, Bonfiglioli, Bosch Rexroth, Janatics, Parker, ABB, Siemens, Hiwin, and Wurth.
10. The categories and brands sections preserve the reference class names and responsive behavior from `src/app/globals.css`.
11. The sections update from the active mode without a full page reload.
12. `npm run lint` and `npm run build` pass after implementation.

## Tasks / Subtasks

- [ ] Add homepage categories section. (AC: 1, 2, 3, 4, 5, 7, 8, 10)
  - [ ] Create `src/components/home/CategoryStrip.tsx`.
  - [ ] Render the reference section structure after the hero section in `src/app/page.tsx` or the existing homepage composition from Story 2.1.
  - [ ] Use reference classes including `.section-head`, `.section-kicker`, `.section-title`, `.text-link`, `.category-strip`, `.category-card`, and related nested classes present in `globals.css`.
  - [ ] Render every category for the active mode from the JSON catalogue; do not limit automobile to the older 6-item reference `homeModes` list.
  - [ ] Link category cards to `/${mode}/${categorySlug}/`.
  - [ ] Link "View all" to `/categories`.
- [ ] Add top brands section. (AC: 6, 9, 10, 11)
  - [ ] Create `src/components/home/TopBrands.tsx`.
  - [ ] Render the reference brands section after the categories strip.
  - [ ] Use reference classes including `.brands-grid` and `.brand-card`.
  - [ ] Use mode-specific brand section labels from `catalog.json.modes` when available: Automobile `Top Brands`, Industrial `Preferred Makes`.
  - [ ] Render brand cards from `catalog.json.brands` or mode content through `dataUtils.ts`.
  - [ ] Link "View all" to `/brands`.
- [ ] Reuse active mode from the existing homepage state. (AC: 7, 11)
  - [ ] Use the `ModeContext`/mode state established by Story 2.1 or Story 1.5.
  - [ ] Do not create a second independent mode state for categories/brands.
  - [ ] Ensure toggling mode in the hero updates categories and brands in the same render cycle.
- [ ] Read category and brand data from the JSON utility layer. (AC: 2, 3, 4, 7, 8, 9)
  - [ ] Use `src/lib/dataUtils.ts` from Story 1.4.
  - [ ] Use category and brand records from `src/data/catalog.json` created by Story 1.3.
  - [ ] Use slug helpers from `src/lib/slugUtils.ts` for generated slugs and `slugOverride` support.
  - [ ] Do not duplicate category or brand arrays inside components or `page.tsx`.
- [ ] Preserve story boundaries. (AC: 1-12)
  - [ ] Do not implement Featured Products, Advantages, Contact Band, or Brand Marquee in this story.
  - [ ] Do not add category overview page implementation; `/categories` can remain a planned route until Epic 3.
  - [ ] Do not add product listing pages, filters, search, or product detail pages.
  - [ ] Do not add Firebase, database, CMS, auth, cart, checkout, payment, or order behavior.
- [ ] Validate homepage sections. (AC: 1-12)
  - [ ] Run `npm run lint`.
  - [ ] Run `npm run build`.
  - [ ] Manually inspect `/` at mobile width around 360-430px and desktop width.
  - [ ] Confirm the category strip scrolls horizontally on mobile without causing page-level horizontal scroll.
  - [ ] Confirm active mode updates category cards, brand cards, labels, and category links.

## Dev Notes

### Dependencies And Ordering

- Story 2.1 should be implemented first because this story extends the homepage mode state and places sections after the hero.
- Story 1.3 and Story 1.4 must be implemented before this story if they are not already done. This story should not create temporary category/brand data in components.
- Story 1.5 may provide `ModeContext`; Story 2.1 may also create a compatible context if 1.5 is not implemented yet. Reuse whichever exists.

### Current Project State

- Sprint status currently has Story 2.1 as `ready-for-dev`, not necessarily implemented.
- The current source tree may still contain only the starter `src/app/page.tsx` unless Story 2.1 has been developed.
- `src/app/globals.css` contains the reference CSS classes for homepage categories and brand cards.
- `src/app/page.module.css` is starter CSS and must not be used for homepage sections.

### Reference Implementation Details

Use `reference/index.html` as the markup and behavior reference:

- Categories section appears after the hero and starts near `home-category-title`.
- Reference markup includes a section header with kicker, title, and `View all` button.
- `renderHomeCategories(items)` renders category cards from the active mode.
- Top Brands section starts near `home-brands-title`.
- Reference `brands-grid` renders `brand-card` elements from `getModeData().brands`.
- `setHomeMode(mode)` triggers `renderHomeCategories(data.categories)` and updates the brand grid.

### Data Requirements

Data must come from the JSON source of truth:

- Categories: `catalog.json.categories[mode]`
- Brands: `catalog.json.brands[mode]` or equivalent mode-backed brand data
- Mode section labels: `catalog.json.modes[mode].home.categoryTitle`, `brandsKicker`, and `brandsTitle` when present

Required automobile categories:

- Engine Parts
- Brake Parts
- Suspension
- Electrical
- Filters
- Transmission
- Cooling
- Body Parts

Required industrial categories:

- Bearings
- Hydraulic Parts
- Motors
- Gearboxes
- Pneumatic Parts
- Seals and Couplings

Required industrial slug override:

- Hydraulic Parts -> `hydraulic-hoses`

### Component Boundary Guidance

- `CategoryStrip` can be a Client Component if it consumes mode context directly.
- `TopBrands` can be a Client Component if it consumes mode context directly.
- Prefer a single client homepage wrapper that reads active mode and passes data down, rather than each child managing its own state.
- Keep category and brand cards present in rendered HTML for the default Automobile mode where practical.

### Architecture Guardrails

- JSON remains the data source of truth. Do not create `categories.ts`, `brands.ts`, or component-local data arrays.
- Do not import raw `catalog.json` directly in components if `dataUtils.ts` exists; use the utility layer.
- Preserve reference class names and CSS variables exactly.
- Do not replace the reference CSS with Tailwind, CSS Modules, or a UI library.
- Links may point to planned routes that are implemented later, but they must use the final URL pattern.
- No Firebase, Firestore, Firebase Storage, Prisma, CMS, API data routes, auth, cart, checkout, payment, or order functionality.

### Testing / Verification

Run:

```bash
npm run lint
npm run build
```

Manual verification:

- `/` shows Automobile categories and brands by default.
- Automobile category strip includes all 8 required categories.
- Industrial mode includes all 6 required categories.
- Hydraulic Parts link resolves to `/industrial/hydraulic-hoses/`.
- Brand cards change when the mode changes.
- `View all` links navigate to `/categories` and `/brands`.
- Mobile category strip scrolls inside the strip and does not create full-page horizontal scrolling.

## Project Structure Notes

Expected files created or modified:

```text
src/app/page.tsx
src/components/home/CategoryStrip.tsx
src/components/home/TopBrands.tsx
_bmad-output/implementation-artifacts/2-2-categories-strip-and-top-brands.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

Expected prerequisite files:

```text
src/data/catalog.json
src/data/types.ts
src/lib/dataUtils.ts
src/lib/slugUtils.ts
src/context/ModeContext.tsx
src/components/home/HeroSection.tsx
src/components/home/ModeToggle.tsx
```

Do not create:

```text
src/data/categories.ts
src/data/brands.ts
src/components/home/homeData.ts
```

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 2.2]
- [Source: _bmad-output/planning-artifacts/architecture.md - Frontend Architecture, Component Organization, Data Flow, Implementation Rules]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - FR-2 Categories Section and Top Brands Section]
- [Source: reference/index.html - categories section, brands section, `renderHomeCategories`, `setHomeMode`, and `siteModes`]
- [Source: _bmad-output/implementation-artifacts/2-1-mode-toggle-and-hero-section.md - homepage mode state and hero prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-3-json-catalogue-and-typescript-data-types.md - category and brand data prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-4-utility-libraries.md - data and slug utility prerequisite]

## Dev Agent Record

### Agent Model Used

TBD by dev agent

### Debug Log References

### Completion Notes List

- Story context created from Epic 2 requirements, PRD FR-2, architecture data-flow rules, reference homepage categories/brands implementation, and Story 2.1 dependency.
- Story reviewed for common implementation traps: duplicate category/brand arrays, older 6-item automobile reference data, missing Hydraulic Parts slug override, separate mode state, and scope creep into later Epic 2 stories.

### File List

- `_bmad-output/implementation-artifacts/2-2-categories-strip-and-top-brands.md`
