# Story 5.3: Structured Data JSON-LD

## Status
review

## Story
As a search engine crawler, I want structured data on every page for rich results, so that SV Enterprises product pages can appear with enhanced listings in Google Search.

## Acceptance Criteria
1. Every page includes a `LocalBusiness` JSON-LD schema with SV Enterprises name, URL, telephone, and Bangalore address.
2. Category pages such as `/automobile/brake-parts/` include a `BreadcrumbList` JSON-LD schema with the correct hierarchy.
3. Category pages include an `ItemList` JSON-LD schema listing all products in the category.
4. Product detail pages such as `/automobile/brake-parts/brake-disc-rotor/` include a `Product` JSON-LD schema.
5. Product JSON-LD includes product name, brand, SKU/OEM number, description, category, and URL.
6. Product detail pages include a `BreadcrumbList` JSON-LD schema for Home, Categories, category, and product.
7. JSON-LD output is valid JSON in `<script type="application/ld+json">`.
8. Structured data validates with no errors in Google's Rich Results Test or Schema Markup Validator.
9. Structured data is generated from JSON-backed helpers, not duplicated static maps.
10. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
11. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [x] Create or reuse JSON-LD component.
  - [x] Add `src/components/shared/SeoJsonLd.tsx` if not already present.
  - [x] Render safe JSON-LD using `JSON.stringify`.
  - [x] Avoid user-controlled raw HTML.
- [x] Implement JSON-LD builders.
  - [x] Extend `src/lib/seoHelpers.ts` if needed.
  - [x] Build `LocalBusiness`.
  - [x] Build `BreadcrumbList`.
  - [x] Build `Product`.
  - [x] Build `ItemList`.
- [x] Add schema to pages.
  - [x] Add `LocalBusiness` to global layout or every page through a shared component.
  - [x] Add `BreadcrumbList` and `ItemList` to category pages.
  - [x] Add `Product` and full `BreadcrumbList` to product detail pages.
  - [x] Add relevant breadcrumb schema to other crawlable pages where available.
- [x] Use canonical URLs.
  - [x] Build absolute URLs from `NEXT_PUBLIC_SITE_URL` or site URL helper.
  - [x] Preserve lowercase hyphenated paths.
  - [x] Preserve Hydraulic Parts canonical slug override.
- [x] Validate.
  - [x] Inspect page source for JSON-LD scripts.
  - [x] Validate representative JSON-LD payloads.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth
- JSON-LD data must come from `src/data/catalog.json` and utility helpers.
- Do not duplicate product/category/business data in schema files.
- Do not add Firebase, Firestore, database SDKs, API routes, or external schema services.

### Architecture Requirements
- Architecture specifies JSON-LD for `LocalBusiness`, `BreadcrumbList`, `Product`, and `ItemList`.
- Component location: `src/components/shared/SeoJsonLd.tsx`.
- Helper location: `src/lib/seoHelpers.ts`.
- Structured data should be server-rendered in page HTML.

### Reference Implementation Pointers
- `reference/index.html` contains `getStructuredData(...)`.
- The reference graph includes `LocalBusiness`, `BreadcrumbList`, `Product`, and `ItemList`.
- Use the reference as structure guidance but source all data from JSON utilities.

### Scope Boundaries
- This story owns structured data only.
- Story 5.2 owns normal metadata tags.
- Story 5.4 owns sitemap, robots, and 404.
- This story does not add reviews, ratings, prices, or offers unless real validated data exists in the catalog.

## Testing
- Validate JSON-LD for:
  - `/`
  - `/automobile/brake-parts/`
  - `/automobile/brake-parts/brake-disc-rotor/`
  - `/industrial/hydraulic-hoses/`
- Confirm scripts contain valid JSON and absolute canonical URLs.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 5.3 acceptance criteria, architecture structured-data requirements, and JSON-only storage constraints.
- Ready for development after SEO helpers and product/category route helpers exist.

## Dev Agent Record
### Completion Notes
- Added a shared `SeoJsonLd` component and rendered `LocalBusiness` JSON-LD from the root layout so every page receives business schema.
- Added breadcrumb, item list, and product schema to the appropriate category, product, and supporting crawlable pages using the existing catalog-backed SEO helpers.
- Strengthened the local business schema with an address derived from the JSON catalog and verified the implementation with `npm run lint` and `npm run build`.

### File List
- `src/components/shared/SeoJsonLd.tsx`
- `src/app/layout.tsx`
- `src/app/categories/page.tsx`
- `src/app/brands/page.tsx`
- `src/app/search/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/vehicle/page.tsx`
- `src/app/vehicle/[type]/page.tsx`
- `src/app/[mode]/[categorySlug]/page.tsx`
- `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`
- `src/lib/seoHelpers.ts`

### Change Log
- Implemented Story 5.3 structured data coverage across the catalog with shared JSON-LD rendering and catalog-backed schema builders.
