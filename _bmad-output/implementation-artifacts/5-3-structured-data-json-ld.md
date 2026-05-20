# Story 5.3: Structured Data JSON-LD

## Status
ready-for-dev

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
- [ ] Create or reuse JSON-LD component.
  - [ ] Add `src/components/shared/SeoJsonLd.tsx` if not already present.
  - [ ] Render safe JSON-LD using `JSON.stringify`.
  - [ ] Avoid user-controlled raw HTML.
- [ ] Implement JSON-LD builders.
  - [ ] Extend `src/lib/seoHelpers.ts` if needed.
  - [ ] Build `LocalBusiness`.
  - [ ] Build `BreadcrumbList`.
  - [ ] Build `Product`.
  - [ ] Build `ItemList`.
- [ ] Add schema to pages.
  - [ ] Add `LocalBusiness` to global layout or every page through a shared component.
  - [ ] Add `BreadcrumbList` and `ItemList` to category pages.
  - [ ] Add `Product` and full `BreadcrumbList` to product detail pages.
  - [ ] Add relevant breadcrumb schema to other crawlable pages where available.
- [ ] Use canonical URLs.
  - [ ] Build absolute URLs from `NEXT_PUBLIC_SITE_URL` or site URL helper.
  - [ ] Preserve lowercase hyphenated paths.
  - [ ] Preserve Hydraulic Parts canonical slug override.
- [ ] Validate.
  - [ ] Inspect page source for JSON-LD scripts.
  - [ ] Validate representative JSON-LD payloads.
  - [ ] Run lint and production build.

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
