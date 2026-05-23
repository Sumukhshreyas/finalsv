# Story 3.4: Grid/List View Toggle

## Status

review

## Story

As a site visitor, I want to switch between grid and list view for the product listing, so that I can choose my preferred way to browse products.

## Acceptance Criteria

1. On category detail pages, two view toggle buttons are visible: grid icon and list icon.
2. Grid view is active by default.
3. On mobile, grid view shows product cards in a 2-column layout.
4. Tapping the list view toggle changes products to horizontal row cards.
5. The active toggle button is visually highlighted and accessible to screen readers.
6. Switching back to grid restores the 2-column mobile grid and desktop grid behavior.
7. View switching preserves the current filtered and sorted product set from Story 3.3.
8. Product card content remains equivalent in both views: image/fallback, name, OEM/spec number, short description, brand, and enquiry affordance.
9. The URL route and static generation behavior from Story 3.2 remain unchanged.
10. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
11. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Add the view toggle component.
  - [x] Create `src/components/catalog/ViewToggle.tsx`.
  - [x] Use icon buttons for grid and list states.
  - [x] Add accessible names and `aria-pressed` state.
- [x] Integrate with category listing UI.
  - [x] Place the view toggle with the listing controls from Stories 3.2 and 3.3.
  - [x] Default to grid view.
  - [x] Keep the mode/category route server-rendered and statically generated.
- [x] Update product card layout variants.
  - [x] Extend `ProductCard` to support `grid` and `list` variants, or introduce a small wrapper that changes layout without duplicating product rendering logic.
  - [x] Preserve existing card links and enquiry behavior.
  - [x] Ensure list rows remain tappable/clickable without nested invalid links.
- [x] Preserve filter/sort state.
  - [x] View switching must not reset selected filters.
  - [x] View switching must not reset selected sort.
  - [x] Empty-results behavior must look correct in both views.
- [x] Match reference styling.
  - [x] Use existing catalogue grid/list classes where present in `globals.css`.
  - [x] Add only scoped CSS that is required for the React implementation.
  - [x] Keep mobile product cards stable with no layout shift when toggling.
- [x] Validate.
  - [x] Confirm grid is default on category pages.
  - [x] Confirm mobile grid uses 2 columns.
  - [x] Confirm list view renders horizontal rows.
  - [x] Confirm filters and sort remain active while changing views.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- Product data remains JSON-backed through `src/data/catalog.json` and `src/lib/dataUtils.ts`.
- Do not duplicate product arrays or create separate list-view data.
- Do not add Firebase, Firestore, database SDKs, or API-backed persistence.

### Architecture Requirements

- `ViewToggle` is a Client Component because it owns interactive UI state.
- The category page should still render a default grid listing from server data before hydration.
- If Story 3.3 introduced a client listing shell, integrate the view mode into that same shell rather than creating competing state containers.

### Component Guidance

- Preferred files:
  - `src/components/catalog/ViewToggle.tsx`
  - Existing listing shell from Story 3.3, if present
  - Existing `src/components/catalog/ProductCard.tsx`
- Avoid separate `GridProductCard` and `ListProductCard` components unless sharing the content renderer would be more complex than the duplication removed.

### Reference Implementation Pointers

- The reference product listing uses `.category-grid` and product card classes for the grid layout.
- Search/list-like product rows in `reference/index.html` use horizontal row patterns such as `.demo-product-card`; use as visual guidance without importing search-specific behavior.

### Scope Boundaries

- This story does not add new filters or sort options.
- This story does not implement product detail page content.
- This story does not implement product-detail trust row or WhatsApp/call CTA section.
- This story does not persist view preference to a database or server.

## Testing

- Browser test at desktop and mobile widths.
- Verify toggle buttons with keyboard and screen reader labels.
- Verify filtered/sorted products remain unchanged while switching views.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 3.4 acceptance criteria, architecture client-component guidance, and JSON-only storage constraints.
- Ready for development after Stories 3.2 and 3.3 establish the listing shell.

## Dev Agent Record

### Debug Log

- Loaded the story spec and inspected the existing category listing shell from Story 3.3.
- Confirmed the Next.js app router docs locally before editing the route and client component boundary.
- Added a dedicated client `ViewToggle` and threaded `viewMode` state through the listing shell without touching the server route or static params logic.
- Extended `ProductCard` with grid/list variants so both views reuse the same product content renderer.
- Tuned CSS for horizontal list rows and preserved the existing 2-column mobile grid default.
- Verified lint, production build, and live route markup for the new toggle controls.

### Completion Notes

- Story 3.4 is implemented and ready for review.
- Grid remains the default view on category pages.
- Filters and sort state continue to work while switching between grid and list views.
- The category route and static generation behavior from Story 3.2 were not changed.
- No persistence, checkout, login, or external database behavior was introduced.

### File List

- `src/components/catalog/ViewToggle.tsx`
- `src/components/catalog/ProductCard.tsx`
- `src/components/catalog/CatalogListingShell.tsx`
- `src/app/globals.css`
- `_bmad-output/implementation-artifacts/3-4-grid-list-view-toggle.md`

### Change Log

- Added grid/list view toggles to category detail listing controls.
- Added list-row product card rendering while keeping the existing product content and enquiry affordance.
- Added responsive styling for the new view mode and preserved the existing mobile grid layout.
- Updated the story status and task checklist for Story 3.4.
