# Story 4.3: Brands Page

## Status

review

## Story

As a site visitor, I want to browse all brands/manufacturers that SV Enterprises stocks, so that I can verify they carry my preferred brand.

## Acceptance Criteria

1. `/brands` exists as a Next.js App Router page and renders brand content from the JSON catalog source of truth.
2. With Automobile mode active, the page displays a responsive grid of automobile brand cards including Annabond, Ceekay, Delphi, Elofic, Gabriel, Gates, Hella, Hi-Q+, NGK, OSRAM, Varroc, and Wurth.
3. Each automobile brand card displays the brand name and/or logo treatment.
4. With Industrial mode active, the grid displays industrial brands including SKF, NSK, FAG, Fenner, Bonfiglioli, Hindustan, Bosch Rexroth, Janatics, Parker, ABB, Siemens, and Wurth.
5. The page is statically generated and provides page-specific title and description metadata.
6. The default server-rendered HTML includes visible Automobile brand content; critical brand content is not client-only.
7. Existing reference visual language and CSS class conventions are preserved where applicable.
8. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
9. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Create the brands route.
  - [x] Add `src/app/brands/page.tsx`.
  - [x] Render Automobile brands by default for SSR/static HTML.
  - [x] Add page-specific metadata.
- [x] Create or reuse brand card UI.
  - [x] Add `src/components/shared/BrandCard.tsx` or `src/components/brands/BrandCard.tsx`, depending on existing component organization.
  - [x] Use brand name as fallback when no logo asset exists.
  - [x] Keep cards responsive and keyboard-safe if interactive.
- [x] Wire JSON catalog data.
  - [x] Load mode-specific brand lists from `src/data/catalog.json`.
  - [x] Use `dataUtils` or mode utilities rather than hard-coded arrays.
  - [x] Keep Wurth available in both mode lists if present in catalog data.
- [x] Support active mode switching.
  - [x] Default to Automobile in server-rendered output.
  - [x] If mode context exists, switch the visible brand list between Automobile and Industrial.
  - [x] Preserve SEO-friendly default content without requiring client JavaScript.
- [x] Validate.
  - [x] Confirm `/brands` shows Automobile brands by default.
  - [x] Confirm Industrial mode shows industrial brands.
  - [x] Confirm metadata exists for `/brands`.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- Brand lists must come from `src/data/catalog.json`.
- Do not add `brands.ts`, Firebase, Firestore, database SDKs, or API-backed persistence.

### Architecture Requirements

- Route file: `src/app/brands/page.tsx`
- Architecture maps FR-11 Brands to `brands/page.tsx`, brand card component, and `catalog.json.brands`.
- Use `generateMetadata` or static metadata for the page.
- Server-rendered default should expose Automobile brand names to crawlers.

### Required Brand Examples

Automobile examples:

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

Industrial examples:

- SKF
- NSK
- FAG
- Fenner
- Bonfiglioli
- Hindustan
- Bosch Rexroth
- Janatics
- Parker
- ABB
- Siemens
- Wurth

### Reference Implementation Pointers

- `reference/index.html` includes `renderBrandsPage()`.
- Relevant reference classes include `.brands-grid` and `.brand-card`.
- Reference mode data includes `brandsPage.title`, `brandsPage.copy`, and `brands`.

### Scope Boundaries

- This story does not implement brand detail pages.
- This story does not filter product listings by brand unless an existing link pattern already supports it.
- This story does not implement search behavior.

## Testing

- Browser test `/brands` at desktop and mobile widths.
- Inspect server-rendered HTML or page source for Automobile brand names.
- Verify Industrial mode brand list when mode switching is available.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 4.3 acceptance criteria, architecture mapping, and JSON-only storage constraints.
- Ready for development after Story 1.3 brand data and Story 2.1 mode context are available.

## Dev Agent Record

### Completion Notes

- Added a static `/brands` page that defaults to automobile brands on SSR and swaps to industrial brands through the existing mode context.
- Added a lightweight `BrandCard` component using the catalog-backed brand names and the existing brand card visual treatment.
- Verified the implementation with `npm run lint` and `npm run build`.

### File List

- `src/app/brands/page.tsx`
- `src/components/brands/BrandCard.tsx`
- `src/components/brands/BrandsListing.tsx`

### Change Log

- Implemented Story 4.3 brands page with JSON-backed mode-aware brand grids and page metadata.
