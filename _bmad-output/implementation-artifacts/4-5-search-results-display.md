# Story 4.5: Search Results Display

## Status

review

## Story

As a site visitor, I want to see search results as product cards with filter chips, so that I can review matching products and refine my search.

## Acceptance Criteria

1. When a search query matches products, each result is shown as a horizontal product card.
2. Each result card shows image or icon, product name, meta information, brand, category, and availability status.
3. Category filter chips are displayed above results for quick category refinement.
4. A `See all` link or control with total result count is shown.
5. Tapping a result card navigates to the canonical product detail page.
6. When a query matches no products, an empty state message is shown, for example `No products found for your search`.
7. When no results are found, popular search suggestions are displayed as alternatives.
8. Results and filter chips are derived from JSON-backed product data, not static demo arrays.
9. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
10. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Add search results rendering.
  - [x] Create `src/components/search/SearchResults.tsx`.
  - [x] Integrate it with the `/search` page and the input state from Story 4.4.
  - [x] Render horizontal product result cards.
- [x] Build JSON-backed result cards.
  - [x] Use product image or fallback initials/icon.
  - [x] Show product name, OEM/spec/meta, brand, category, and availability/status.
  - [x] Link each card to `/${mode}/${categorySlug}/${productSlug}/`.
  - [x] Preserve canonical Hydraulic Parts slug behavior for industrial results.
- [x] Implement category refinement chips.
  - [x] Derive available category chips from current search result categories.
  - [x] Include an `All` chip.
  - [x] Active chip filters the visible results without re-running against unrelated modes.
  - [x] Keep chip state consistent when the query changes.
- [x] Implement see-all count.
  - [x] Show total matching result count.
  - [x] Link/control should reveal all matching results if initial display is limited.
  - [x] Do not navigate to a fake route unless a real route exists.
- [x] Implement empty state.
  - [x] Show a clear no-results message.
  - [x] Reuse popular suggestions from Story 4.4 as alternatives.
  - [x] Avoid showing stale previous results after a no-result query.
- [x] Validate.
  - [x] Confirm matching query renders result cards.
  - [x] Confirm result card links navigate to canonical product detail routes.
  - [x] Confirm category filter chips refine results.
  - [x] Confirm no-results query shows empty state and suggestions.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- Results must come from `src/data/catalog.json` through `searchProducts(query, mode?)` or equivalent utility.
- Do not use the static `searchPage.results` demo list as actual search results unless those entries are generated from catalog products.
- Do not add Firebase, Firestore, database SDKs, API routes, remote search services, or persistence.

### Architecture Requirements

- Route file remains `src/app/search/page.tsx`.
- Component file: `src/components/search/SearchResults.tsx`.
- Search results are client-side in v1.
- Product detail URLs must use the same slug helpers used by Epic 3.
- Sanitize user-controlled query text before display.

### Result Card Data Mapping

Use catalog fields to render:

- Product name
- OEM/spec/meta number
- Brand
- Category
- Availability/status when available, or a safe default such as `In stock`/`Ready stock`
- Image or fallback initials/icon
- Canonical product detail URL

### Reference Implementation Pointers

- `reference/index.html` includes result rows in `search-results-grid`.
- Relevant classes include `.demo-product-grid`, `.demo-product-card`, `.demo-product-visual`, `.demo-product-body`, `.demo-product-price`, `.search-filter-row`, and `.search-filter-chip`.
- Reference function `renderSearchPage()` provides visual guidance, but implementation must use real catalog products.

### Scope Boundaries

- Story 4.4 owns the input and suggestion behavior.
- This story does not add global search overlay, server search, analytics, autocomplete dropdowns, cart, checkout, payment, login, or product saving.
- This story should not alter category/product route generation except to consume existing canonical URL helpers.

## Testing

- Browser test `/search` with matching and no-result queries.
- Verify result links for at least one automobile and one industrial product.
- Verify category chips refine the currently displayed result set.
- Verify empty state clears stale results.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 4.5 acceptance criteria, architecture search component mapping, and JSON-only storage constraints.
- Ready for development after Story 4.4 search input state and Story 1.4 search utility exist.

## Dev Agent Record

### Completion Notes

- Added a client-side `SearchResults` component and integrated it into the `/search` page shell.
- Rendered JSON-backed horizontal result cards with product image/fallback, OEM metadata, brand, category, availability, category chips, and a see-all toggle.
- Implemented empty-state messaging with reusable suggestions and verified the route with `npm run lint` and `npm run build`.

### File List

- `src/components/search/SearchPageShell.tsx`
- `src/components/search/SearchResults.tsx`

### Change Log

- Implemented Story 4.5 search results display with JSON-backed cards, category refinement, see-all control, and empty-state handling.
