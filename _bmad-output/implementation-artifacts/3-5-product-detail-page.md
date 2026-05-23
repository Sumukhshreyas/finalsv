# Story 3.5: Product Detail Page

## Status

review

## Story

As a site visitor, I want to view complete details of a specific product on a dedicated page, so that I can verify it is the right part before making an enquiry.

## Acceptance Criteria

1. Product detail routes are implemented at `/${mode}/${categorySlug}/${productSlug}/` using `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`.
2. `/automobile/brake-parts/brake-disc-rotor/` loads a product detail page for Brake Disc Rotor.
3. The product image is displayed prominently with gallery dots; gallery dots are visual only in v1 and may represent a single image.
4. The product name is displayed as the page `<h1>`.
5. A stock status pill is shown, such as `In Stock` or `Ready stock`.
6. An OEM/spec chip is displayed, such as `OEM: 51712M68K00`.
7. A brand chip and meta points are shown, such as `Enquiry Pricing`, `OEM Matching`, and `Bangalore Supply`.
8. A `Compatible With` section lists compatible vehicles for automobile products.
9. A `Suitable For` section lists applications for industrial products.
10. A `Technical Specs` section lists specifications in a table or structured grid format.
11. A `Product Description` section shows detailed description text.
12. A favourite/save heart button is visible but visual only, with no persistence in v1.
13. Back navigation returns to the parent category page.
14. A `Download PDF` action is visible on the product detail page and opens a print-friendly product sheet for the current product.
15. Breadcrumb displays `Home > Categories > {Category Name} > {Product Name}`.
16. `generateStaticParams` pre-generates every valid mode/category/product combination from the JSON catalog.
17. Invalid mode, category, or product slugs call `notFound()` and render the Next.js 404 behavior.
18. Page-specific SEO metadata is generated for each valid product.
19. Product content is server-rendered/static-generated; critical detail content is not client-only.
20. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
21. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Create the dynamic product detail route.
  - [x] Add `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`.
  - [x] Implement `generateStaticParams()` from JSON-backed route helpers.
  - [x] Implement product-specific `generateMetadata()`.
  - [x] Call `notFound()` for invalid mode/category/product combinations.
- [x] Load product data from utilities.
  - [x] Use `getProductBySlug(mode, categorySlug, productSlug)`.
  - [x] Use `getCategoryBySlug(mode, categorySlug)` for breadcrumb and back URL.
  - [x] Use `getStaticProductParams()` for static generation.
  - [x] Avoid duplicated product/category data in page or components.
- [x] Build product detail components.
  - [x] Add `src/components/product/ProductDetail.tsx`.
  - [x] Add `src/components/product/ProductGallery.tsx`.
  - [x] Add `src/components/product/CompatibilityList.tsx`.
  - [x] Add `src/components/product/TechSpecs.tsx`.
  - [x] Reuse shared breadcrumb component if available.
- [x] Implement detail layout.
  - [x] Render prominent product image or approved fallback.
  - [x] Render visual gallery dots.
  - [x] Render product title, stock pill, OEM/spec chip, brand chip, and meta points.
  - [x] Render description, compatibility/application list, and technical specs.
  - [x] Render visual-only favourite button without local storage or database persistence.
- [x] Implement navigation.
  - [x] Back button links to `/${mode}/${categorySlug}/`.
  - [x] Breadcrumb links Home and Categories, then parent category and current product.
  - [x] Preserve canonical slug behavior including `/industrial/hydraulic-hoses/...`.
- [x] Validate.
  - [x] Confirm `/automobile/brake-parts/brake-disc-rotor/` loads.
  - [x] Confirm an industrial product detail route renders `Suitable For`.
  - [x] Confirm invalid product slug returns 404.
  - [x] Confirm all static params are generated from JSON catalog data.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- All product detail fields must come from `src/data/catalog.json` through `src/lib/dataUtils.ts`.
- Do not add Firebase, Firestore, database SDKs, API persistence, or local duplicated data.
- Use interfaces from `src/data/types.ts`.

### Architecture Requirements

- Product route file: `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`
- Valid mode segments are `automobile` and `industrial`.
- Routed pages derive mode from URL segments.
- Dynamic product routes must include `generateStaticParams` and `generateMetadata`.
- Invalid slugs must use `notFound()`.
- Static params must come from `getStaticProductParams()` or equivalent JSON-backed helper.

### Expected Utility Surface

- `getProductBySlug(mode, categorySlug, productSlug)`
- `getCategoryBySlug(mode, categorySlug)`
- `getStaticProductParams()`
- `seoHelpers` for product metadata
- Slug helpers for canonical category and product URLs

### Reference Implementation Pointers

- `reference/index.html` contains the product detail layout near the `product-page` and `detail-grid` sections.
- Relevant reference classes include `.detail-grid`, `.detail-visual`, `.detail-card`, `.detail-title`, `.detail-meta`, `.compat-grid`, `.spec-grid`, and related detail section classes.
- Existing CSS from Story 1.2 should already be present in `src/app/globals.css`.

### Scope Boundaries

- This story may reserve layout space for enquiry actions, but Story 3.6 owns the final WhatsApp/call CTA section and trust row behavior.
- This story does not add cart, checkout, buy-now, user accounts, product saving persistence, or order tracking.
- This story does not implement multi-image gallery behavior beyond visual dots in v1.
- This story does not implement filters, sorting, or view toggle changes.

## Testing

- Browser test one automobile and one industrial product detail route.
- Inspect server-rendered HTML or page source for product name, OEM/spec number, and description.
- Verify invalid mode/category/product combinations return 404.
- Verify back and breadcrumb links use canonical routes.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 3.5 acceptance criteria, architecture dynamic route requirements, PRD URL depth rules, and JSON-only storage constraints.
- Ready for development after Stories 1.3, 1.4, and 3.2 provide catalog data, slug helpers, and product URLs.

## Dev Agent Record

### Debug Log

- Read the Story 3.5 brief and confirmed the route did not exist yet.
- Inspected the JSON catalog and existing detail CSS before coding so the page could use the established classes and data fields.
- Added a server-rendered dynamic product route with JSON-backed static params and per-product metadata.
- Built reusable product detail components for the gallery, compatibility list, and technical specs.
- Verified the automobile and industrial detail routes in the browser and confirmed invalid product slugs render the Next 404.
- Restored build-generated sitemap files back to the repository baseline after validation.

### Completion Notes

- Story 3.5 is implemented and ready for review.
- The product detail page is server-rendered and statically generated from the JSON catalog.
- Automobile and industrial product pages both render the required detail sections.
- The favourite heart button is present but has no persistence.
- Invalid mode/category/product combinations still call `notFound()`.

### File List

- `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`
- `src/components/product/ProductDetail.tsx`
- `src/components/product/ProductGallery.tsx`
- `src/components/product/CompatibilityList.tsx`
- `src/components/product/TechSpecs.tsx`
- `src/app/globals.css`
- `_bmad-output/implementation-artifacts/3-5-product-detail-page.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log

- Added the dynamic product detail route and static generation helpers.
- Added reusable detail components for the gallery, compatibility list, and technical specs.
- Added fallback styling for image-less detail rendering.
- Updated the story and sprint status to `review`.
