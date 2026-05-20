# Story 3.1: Category Overview Page

## Status
ready-for-dev

## Story
As a site visitor, I want to see all product categories for the active business mode on a dedicated page, so that I can choose the category I want to browse.

## Acceptance Criteria
1. `/categories` exists as a Next.js App Router page and renders category content from the JSON catalog source of truth.
2. Automobile mode shows these 8 categories: Engine Parts, Brake Parts, Suspension, Electrical, Filters, Transmission, Cooling, Body Parts.
3. Industrial mode shows these 6 categories: Bearings, Hydraulic Parts, Motors, Gearboxes, Pneumatic Parts, Seals and Couplings.
4. Each category card shows a category image or approved fallback, title, description, and parts count.
5. Each card links to the canonical category route using `/${mode}/${categorySlug}/`, for example `/automobile/brake-parts/` and `/industrial/bearings/`.
6. Hydraulic Parts uses the custom canonical slug `/industrial/hydraulic-hoses/`.
7. The page includes the breadcrumb `Home > Categories`.
8. The default server-rendered HTML includes visible category data for the default Automobile mode; critical category content is not client-only.
9. Page-specific metadata is provided through `generateMetadata` or static metadata with a category overview title and description.
10. Existing reference visual language and CSS class conventions are preserved where applicable.
11. No Firebase, Firestore, external database, cart, checkout, login, or payment behavior is introduced.
12. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [ ] Create the category overview route.
  - [ ] Add `src/app/categories/page.tsx`.
  - [ ] Keep the route server-rendered by default so Automobile category content is present in HTML source.
  - [ ] Add page metadata for the category overview page.
- [ ] Build or reuse category presentation components.
  - [ ] Add or reuse `src/components/catalog/CategoryCard.tsx`.
  - [ ] Add or reuse a breadcrumb component if Story 1.5 has already created one.
  - [ ] Use image fallback behavior that matches the reference site when category imagery is unavailable.
- [ ] Wire JSON catalog data.
  - [ ] Read category data through Story 1.4 data utilities such as `getCategories(mode)`.
  - [ ] Use canonical slug utilities instead of duplicating slug logic in the page.
  - [ ] Preserve the Hydraulic Parts slug override as `hydraulic-hoses`.
- [ ] Support active mode switching.
  - [ ] Default SSR output to Automobile categories.
  - [ ] If a client mode context exists from Story 2.1, use it to switch the visible category set between Automobile and Industrial.
  - [ ] Do not duplicate mode state or hard-code category arrays in the page.
- [ ] Match reference behavior and styling.
  - [ ] Preserve reference classes for breadcrumb and category card sections where they already exist in `globals.css`.
  - [ ] Ensure cards are responsive across mobile and desktop.
  - [ ] Ensure card links are keyboard-accessible and have clear focus states.
- [ ] Validate.
  - [ ] Confirm `/categories` shows 8 Automobile categories by default.
  - [ ] Confirm switching to Industrial shows 6 Industrial categories.
  - [ ] Confirm each category link resolves to the expected canonical route.
  - [ ] Run lint and production build.

## Dev Notes

### Source of Truth
- All category data must come from local JSON files, primarily `src/data/catalog.json`.
- Do not add Firebase, Firestore, database SDKs, or API-backed persistence.
- Story 1.3 owns the catalog schema and seed data.
- Story 1.4 owns catalog utility functions and slug/mode helpers.

### Expected Existing Utilities
- `getCategories(mode)` should return categories for the active mode.
- Slug helpers should produce canonical slugs and apply the Hydraulic Parts override.
- If these utilities are missing when development starts, implement the smallest compatible utility surface in the Story 1.4-owned files rather than hard-coding route data inside this page.

### Route and Rendering
- Route: `src/app/categories/page.tsx`
- This route has no mode segment, so it should render Automobile as the default server output.
- Client-side mode switching may be layered on top using the existing mode context, but the default content must remain visible without waiting for client JavaScript.

### Required Category Sets
Automobile:
- Engine Parts
- Brake Parts
- Suspension
- Electrical
- Filters
- Transmission
- Cooling
- Body Parts

Industrial:
- Bearings
- Hydraulic Parts
- Motors
- Gearboxes
- Pneumatic Parts
- Seals and Couplings

### Reference Implementation Pointers
- `reference/index.html` contains the source visual and behavior reference.
- Category overview breadcrumb and page structure appear near the `category-breadcrumb` and `showCategoriesPage` sections.
- Existing extracted CSS should already be available in `src/app/globals.css` from Story 1.2.

### Scope Boundaries
- This story does not implement category detail product grids; that is Story 3.2.
- This story does not implement filtering, sorting, or grid/list view controls; those are later Epic 3 stories.
- This story does not implement product detail pages, enquiry forms, cart, checkout, user login, or payments.

## Testing
- Verify `/categories` in browser at desktop and mobile widths.
- Inspect server-rendered HTML or page source for default Automobile category text.
- Verify all category links use canonical mode/category slugs.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 3.1 acceptance criteria, architecture route guidance, PRD URL rules, and the JSON-only storage decision.
- Ready for development after Story 1.3 catalog data and Story 1.4 utility functions are available.
