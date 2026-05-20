# Story 3.5: Product Detail Page

## Status
ready-for-dev

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
14. Breadcrumb displays `Home > Categories > {Category Name} > {Product Name}`.
15. `generateStaticParams` pre-generates every valid mode/category/product combination from the JSON catalog.
16. Invalid mode, category, or product slugs call `notFound()` and render the Next.js 404 behavior.
17. Page-specific SEO metadata is generated for each valid product.
18. Product content is server-rendered/static-generated; critical detail content is not client-only.
19. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
20. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [ ] Create the dynamic product detail route.
  - [ ] Add `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`.
  - [ ] Implement `generateStaticParams()` from JSON-backed route helpers.
  - [ ] Implement product-specific `generateMetadata()`.
  - [ ] Call `notFound()` for invalid mode/category/product combinations.
- [ ] Load product data from utilities.
  - [ ] Use `getProductBySlug(mode, categorySlug, productSlug)`.
  - [ ] Use `getCategoryBySlug(mode, categorySlug)` for breadcrumb and back URL.
  - [ ] Use `getStaticProductParams()` for static generation.
  - [ ] Avoid duplicated product/category data in page or components.
- [ ] Build product detail components.
  - [ ] Add `src/components/product/ProductDetail.tsx`.
  - [ ] Add `src/components/product/ProductGallery.tsx`.
  - [ ] Add `src/components/product/CompatibilityList.tsx`.
  - [ ] Add `src/components/product/TechSpecs.tsx`.
  - [ ] Reuse shared breadcrumb component if available.
- [ ] Implement detail layout.
  - [ ] Render prominent product image or approved fallback.
  - [ ] Render visual gallery dots.
  - [ ] Render product title, stock pill, OEM/spec chip, brand chip, and meta points.
  - [ ] Render description, compatibility/application list, and technical specs.
  - [ ] Render visual-only favourite button without local storage or database persistence.
- [ ] Implement navigation.
  - [ ] Back button links to `/${mode}/${categorySlug}/`.
  - [ ] Breadcrumb links Home and Categories, then parent category and current product.
  - [ ] Preserve canonical slug behavior including `/industrial/hydraulic-hoses/...`.
- [ ] Validate.
  - [ ] Confirm `/automobile/brake-parts/brake-disc-rotor/` loads.
  - [ ] Confirm an industrial product detail route renders `Suitable For`.
  - [ ] Confirm invalid product slug returns 404.
  - [ ] Confirm all static params are generated from JSON catalog data.
  - [ ] Run lint and production build.

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
