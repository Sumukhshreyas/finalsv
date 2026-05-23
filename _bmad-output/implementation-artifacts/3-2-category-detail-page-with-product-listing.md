# Story 3.2: Category Detail Page with Product Listing

## Status

review

## Story

As a site visitor, I want to view all products within a selected category as grid cards, so that I can compare relevant parts and start an enquiry.

## Acceptance Criteria

1. Category detail routes are implemented at `/${mode}/${categorySlug}/` using the App Router path `src/app/[mode]/[categorySlug]/page.tsx`.
2. `/automobile/brake-parts/` loads with a hero/banner area showing the category title `Brake Parts` and its category description.
3. The page displays a product count such as `6 products found`, based on JSON catalog data.
4. Product cards show image or initials fallback, product name, OEM/spec number, short description, brand pill, and an `Enquire` CTA.
5. A category chip row allows quick switching to other categories in the same mode.
6. Breadcrumb displays `Home > Categories > {Category Name}`.
7. `generateStaticParams` pre-generates every valid mode/category combination from the JSON catalog.
8. Invalid mode values or category slugs call `notFound()` and render the Next.js 404 behavior.
9. Page-specific SEO metadata is generated for each valid category.
10. Product and category content is server-rendered/static-generated; critical listing content is not client-only.
11. Canonical slug behavior is preserved, including Hydraulic Parts resolving at `/industrial/hydraulic-hoses/`.
12. Existing reference visual language and CSS class conventions are preserved where applicable.
13. No Firebase, Firestore, external database, cart, checkout, login, or payment behavior is introduced.
14. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Create the dynamic category detail route.
  - [x] Add `src/app/[mode]/[categorySlug]/page.tsx`.
  - [x] Implement `generateStaticParams()` from catalog utilities.
  - [x] Implement category-specific metadata with `generateMetadata()`.
  - [x] Call `notFound()` for invalid mode/category combinations.
- [x] Load category and product data from JSON utilities.
  - [x] Use `getCategoryBySlug(mode, categorySlug)`.
  - [x] Use `getCategoryProducts(mode, categorySlug)`.
  - [x] Use `getCategories(mode)` for same-mode category chips.
  - [x] Avoid local duplicated arrays or route maps in the page.
- [x] Build or reuse listing components.
  - [x] Add or reuse `src/components/catalog/ProductCard.tsx`.
  - [x] Add or reuse `src/components/catalog/CategoryChipRow.tsx`.
  - [x] Add or reuse shared breadcrumb behavior from Story 1.5 if available.
- [x] Implement category header and breadcrumb.
  - [x] Render category title and description from JSON data.
  - [x] Render `Home > Categories > {Category Name}`.
  - [x] Keep links keyboard-accessible and semantically valid.
- [x] Implement product cards.
  - [x] Show product image when available.
  - [x] Show initials fallback when no product image exists.
  - [x] Show product name, OEM/spec number, short description, brand pill, and `Enquire` CTA.
  - [x] Ensure the product card can link to the later product detail route without breaking the enquiry CTA.
- [x] Implement same-mode category switching.
  - [x] Render all categories for the current mode as chips.
  - [x] Mark the active category chip.
  - [x] Link each chip to its canonical category URL.
- [x] Validate.
  - [x] Confirm `/automobile/brake-parts/` renders Brake Parts content and product count.
  - [x] Confirm `/industrial/hydraulic-hoses/` resolves Hydraulic Parts content.
  - [x] Confirm invalid slugs return 404.
  - [x] Confirm static params cover all category routes.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- All category and product data must come from local JSON files, primarily `src/data/catalog.json`.
- Do not add Firebase, Firestore, database SDKs, or API-backed persistence.
- Story 1.3 owns catalog data shape and seed data.
- Story 1.4 owns data access, mode, slug, WhatsApp, and SEO utility helpers.

### Expected Existing Utilities

- `getCategoryBySlug(mode, categorySlug)` should resolve canonical category slugs.
- `getCategoryProducts(mode, categorySlug)` should return products for the selected category.
- `getCategories(mode)` should return same-mode categories for the chip row.
- `getStaticCategoryParams()` should provide all `{ mode, categorySlug }` values for `generateStaticParams`.
- `seoHelpers` should be used for category metadata if already implemented.
- `whatsappUtils` should be used for enquiry URLs if already implemented.

### Route Rules

- Route file: `src/app/[mode]/[categorySlug]/page.tsx`
- Valid mode segments are expected to be `automobile` and `industrial`.
- URL depth must remain at most three segments after the domain.
- Category detail examples:
  - `/automobile/brake-parts/`
  - `/industrial/hydraulic-hoses/`
- Hydraulic Parts must use `/industrial/hydraulic-hoses/` as the canonical route.

### Product Card Data Mapping

Use the catalog fields defined by Story 1.3. Product cards should map available fields to:

- Product name
- OEM/spec number
- Short description
- Brand pill
- Image URL or initials fallback
- Product detail URL placeholder route `/${mode}/${categorySlug}/${productSlug}/`
- Enquiry CTA URL or action

### Reference Implementation Pointers

- `reference/index.html` contains the source visual and behavior reference.
- Category detail behavior appears near the `showCategoryPage`, `category-breadcrumb`, and category product grid sections.
- Existing extracted CSS should already be available in `src/app/globals.css` from Story 1.2.

### Scope Boundaries

- This story does not implement product filters or sorting; those are Story 3.3.
- This story does not implement grid/list view toggle behavior; that is Story 3.4.
- This story does not implement product detail page content; that is Story 3.5.
- This story does not implement sticky enquiry or trust badges; that is Story 3.6.
- This story does not add cart, checkout, user login, payments, Firebase, Firestore, or any external database.

## Testing

- Verify valid category routes in browser at desktop and mobile widths.
- Inspect server-rendered HTML or page source for category title and product names.
- Verify `/automobile/brake-parts/` shows Brake Parts and a data-driven product count.
- Verify `/industrial/hydraulic-hoses/` resolves Hydraulic Parts.
- Verify an invalid route such as `/automobile/not-a-category/` returns 404.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 3.2 acceptance criteria, architecture route guidance, PRD URL rules, and the JSON-only storage decision.
- Ready for development after Story 1.3 catalog data and Story 1.4 utility functions are available.

## Dev Agent Record

### Debug Log

- Implemented the `[mode]/[categorySlug]` App Router page as a server component with `generateStaticParams`, `generateMetadata`, and `notFound()` handling.
- Added reusable catalog listing components for category chips and product cards.
- Verified the rendered HTML for `/automobile/brake-parts/` and `/industrial/hydraulic-hoses/` includes the expected breadcrumb, hero copy, product counts, chip row, and product cards.
- Restored build-generated `public/robots.txt`, `public/sitemap.xml`, and `public/sitemap-0.xml` back to the repository baseline after validation.

### Completion Notes

- Canonical category routing is preserved, including Hydraulic Parts at `/industrial/hydraulic-hoses/`.
- Product listing content is server-rendered/static-generated and driven by the JSON catalog source of truth.
- The implementation passed lint and production build checks.

### File List

- `src/app/[mode]/[categorySlug]/page.tsx`
- `src/components/catalog/ProductCard.tsx`
- `src/components/catalog/CategoryChipRow.tsx`
- `src/components/catalog/cardUtils.ts`
- `src/components/catalog/CategoryCard.tsx`
- `src/lib/dataUtils.ts`
- `src/app/globals.css`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap-0.xml`
- `_bmad-output/implementation-artifacts/3-2-category-detail-page-with-product-listing.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- Added the dynamic category detail route with static generation and SEO metadata.
- Added reusable product and category chip listing components.
- Added catalog image/fallback helpers for card rendering.
- Updated the story record and sprint status to `review`.
