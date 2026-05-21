# Story 3.3: Filter Panel and Sort Controls

## Status
review

## Story
As a site visitor, I want to filter products by brand and vehicle/application type and sort by different criteria, so that I can quickly narrow down to the exact part I need.

## Acceptance Criteria
1. On a category detail page such as `/automobile/brake-parts/`, a `Filter` button is visible near the product listing controls.
2. Tapping `Filter` opens a modal/sheet overlay with dropdown fields for Brand and either Vehicle Type for automobile mode or Application for industrial mode.
3. The filter panel is touch-friendly on mobile, with interactive targets at least 44px high.
4. Applying a filter updates the visible product grid using JSON-backed product data.
5. Selected filters display as removable chips above the product grid.
6. Removing a filter chip immediately updates the product results.
7. A `Sort` dropdown supports Popular, Name A-Z, and OEM Number.
8. Selecting a sort option reorders the visible products and visually indicates the active sort.
9. Filter and sort state must work together: sorting applies to the already-filtered set.
10. The URL route and static generation behavior from Story 3.2 remain unchanged.
11. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
12. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [x] Add listing controls to the category detail page.
  - [x] Update `src/app/[mode]/[categorySlug]/page.tsx` or the listing shell created in Story 3.2.
  - [x] Keep server-rendered default product content intact for SEO and no-JS baseline.
  - [x] Move only the interactive filter/sort controls into Client Components.
- [x] Create or reuse catalogue filter components.
  - [x] Add `src/components/catalog/FilterPanel.tsx`.
  - [x] Add `src/components/catalog/FilterChips.tsx`.
  - [x] Add `src/components/catalog/SortDropdown.tsx`.
  - [x] Reuse `ProductCard` from Story 3.2 instead of creating another card implementation.
- [x] Implement filter behavior.
  - [x] Use JSON catalog product fields for brand, vehicle type, and application values.
  - [x] Use `filterProducts(products, filters)` from `src/lib/dataUtils.ts` when available.
  - [x] For automobile mode, expose Vehicle Type filter values.
  - [x] For industrial mode, expose Application filter values.
  - [x] Show an empty-results state when no products match.
- [x] Implement sort behavior.
  - [x] Use `sortProducts(products, sort)` from `src/lib/dataUtils.ts` when available.
  - [x] Popular sorts by catalogue popularity/order.
  - [x] Name A-Z sorts by product name.
  - [x] OEM Number sorts by OEM/spec number.
- [x] Implement modal/sheet accessibility.
  - [x] Use a semantic dialog/sheet structure with close button and backdrop.
  - [x] Close on explicit close and after applying filters.
  - [x] Prevent background scroll while the sheet is open.
  - [x] Preserve keyboard access and focus visibility.
- [x] Validate.
  - [x] Confirm filters update visible products on `/automobile/brake-parts/`.
  - [x] Confirm industrial routes show Application instead of Vehicle Type.
  - [x] Confirm chips remove filters one at a time.
  - [x] Confirm sort works with and without active filters.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth
- All products, brands, vehicle/application values, and sort fields must come from `src/data/catalog.json` through `src/lib/dataUtils.ts`.
- Do not duplicate product/category data in component files.
- Do not add Firebase, Firestore, database SDKs, or API-backed persistence.

### Architecture Requirements
- Category route remains `src/app/[mode]/[categorySlug]/page.tsx`.
- Routed pages derive mode from the URL, not from homepage mode context.
- Server Components should continue to fetch the initial category/product data.
- Client Components are appropriate for browser state, dialog open state, selected filters, and selected sort.

### Expected Utility Surface
- `filterProducts(products, filters)`
- `sortProducts(products, sort)`
- `getCategoryProducts(mode, categorySlug)`
- `getCategoryBySlug(mode, categorySlug)`
- If utility gaps are found, extend Story 1.4-owned utility files rather than embedding filter rules in the UI.

### Reference Implementation Pointers
- `reference/index.html` includes these relevant classes and behaviors:
  - `.catalog-filter-btn`
  - `.catalog-filter-badge`
  - `.catalog-sort`
  - `.selected-filters`
  - `.selected-filter-chip`
  - `.filter-backdrop`
  - `.filter-sheet`
  - `.filter-form`
- Reference JavaScript functions include `renderFilterForm`, `getFilterSelections`, `renderFilterSelections`, `applyFilterSelections`, and `resetFilterSelections`.

### Scope Boundaries
- This story does not implement grid/list view switching; that is Story 3.4.
- This story does not implement product detail pages; that is Story 3.5.
- This story does not implement product-detail enquiry actions or trust row; that is Story 3.6.
- This story does not change `generateStaticParams`, canonical route generation, or product detail URL rules from Story 3.2.

## Testing
- Browser test `/automobile/brake-parts/` and one industrial category route.
- Verify touch target sizing for mobile filter controls.
- Verify keyboard focus reaches filter open, close, apply, reset, dropdowns, and chips.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 3.3 acceptance criteria, architecture server/client boundary rules, and JSON-only storage constraints.
- Ready for development after Story 3.2 category listing exists.

## Dev Agent Record

### Debug Log
- Added a client-side listing shell to the category detail route while preserving the server-rendered initial product list.
- Created reusable filter panel, selected filter chip, and sort dropdown components.
- Extended `sortProducts` to support OEM number ordering.
- Verified both automobile and industrial category routes render the new toolbar, listing shell, and the existing static product data.

### Completion Notes
- Filter state is browser-local and layered on top of the JSON catalog source of truth.
- Brand and vehicle/application filters work together with sorting on the filtered result set.
- The empty-results state and modal sheet close behavior are implemented, and the page still prerenders with the original category listing content.
- Lint and production build both passed.

### File List
- `src/app/[mode]/[categorySlug]/page.tsx`
- `src/components/catalog/CatalogListingShell.tsx`
- `src/components/catalog/FilterPanel.tsx`
- `src/components/catalog/FilterChips.tsx`
- `src/components/catalog/SortDropdown.tsx`
- `src/components/catalog/ProductCard.tsx`
- `src/lib/dataUtils.ts`
- `src/app/globals.css`
- `_bmad-output/implementation-artifacts/3-3-filter-panel-and-sort-controls.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

### Change Log
- Added category listing filter and sort controls.
- Added filter modal, selected filter chips, and sort dropdown components.
- Added OEM number sorting support.
- Updated the story record and sprint status to `review`.
