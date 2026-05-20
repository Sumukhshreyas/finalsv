# Story 3.3: Filter Panel and Sort Controls

## Status
ready-for-dev

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
- [ ] Add listing controls to the category detail page.
  - [ ] Update `src/app/[mode]/[categorySlug]/page.tsx` or the listing shell created in Story 3.2.
  - [ ] Keep server-rendered default product content intact for SEO and no-JS baseline.
  - [ ] Move only the interactive filter/sort controls into Client Components.
- [ ] Create or reuse catalogue filter components.
  - [ ] Add `src/components/catalog/FilterPanel.tsx`.
  - [ ] Add `src/components/catalog/FilterChips.tsx`.
  - [ ] Add `src/components/catalog/SortDropdown.tsx`.
  - [ ] Reuse `ProductCard` from Story 3.2 instead of creating another card implementation.
- [ ] Implement filter behavior.
  - [ ] Use JSON catalog product fields for brand, vehicle type, and application values.
  - [ ] Use `filterProducts(products, filters)` from `src/lib/dataUtils.ts` when available.
  - [ ] For automobile mode, expose Vehicle Type filter values.
  - [ ] For industrial mode, expose Application filter values.
  - [ ] Show an empty-results state when no products match.
- [ ] Implement sort behavior.
  - [ ] Use `sortProducts(products, sort)` from `src/lib/dataUtils.ts` when available.
  - [ ] Popular sorts by catalogue popularity/order.
  - [ ] Name A-Z sorts by product name.
  - [ ] OEM Number sorts by OEM/spec number.
- [ ] Implement modal/sheet accessibility.
  - [ ] Use a semantic dialog/sheet structure with close button and backdrop.
  - [ ] Close on explicit close and after applying filters.
  - [ ] Prevent background scroll while the sheet is open.
  - [ ] Preserve keyboard access and focus visibility.
- [ ] Validate.
  - [ ] Confirm filters update visible products on `/automobile/brake-parts/`.
  - [ ] Confirm industrial routes show Application instead of Vehicle Type.
  - [ ] Confirm chips remove filters one at a time.
  - [ ] Confirm sort works with and without active filters.
  - [ ] Run lint and production build.

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
