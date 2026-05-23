# Story 3.1: Category Overview Page

## Status

review

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

- [x] Create the category overview route.
  - [x] Add `src/app/categories/page.tsx`.
  - [x] Keep the route server-rendered by default so Automobile category content is present in HTML source.
  - [x] Add page metadata for the category overview page.
- [x] Build or reuse category presentation components.
  - [x] Add or reuse `src/components/catalog/CategoryCard.tsx`.
  - [x] Add or reuse a breadcrumb component if Story 1.5 has already created one.
  - [x] Use image fallback behavior that matches the reference site when category imagery is unavailable.
- [x] Wire JSON catalog data.
  - [x] Read category data through Story 1.4 data utilities such as `getCategories(mode)`.
  - [x] Use canonical slug utilities instead of duplicating slug logic in the page.
  - [x] Preserve the Hydraulic Parts slug override as `hydraulic-hoses`.
- [x] Support active mode switching.
  - [x] Default SSR output to Automobile categories.
  - [x] If a client mode context exists from Story 2.1, use it to switch the visible category set between Automobile and Industrial.
  - [x] Do not duplicate mode state or hard-code category arrays in the page.
- [x] Match reference behavior and styling.
  - [x] Preserve reference classes for breadcrumb and category card sections where they already exist in `globals.css`.
  - [x] Ensure cards are responsive across mobile and desktop.
  - [x] Ensure card links are keyboard-accessible and have clear focus states.
- [x] Validate.
  - [x] Confirm `/categories` shows 8 Automobile categories by default.
  - [x] Confirm switching to Industrial shows 6 Industrial categories.
  - [x] Confirm each category link resolves to the expected canonical route.
  - [x] Run lint and production build.

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

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `npm run lint`
- `npm run build`
- `curl.exe -I http://localhost:3000/categories`
- Rendered `/categories` HTML confirmed breadcrumb, mode toggle, and default automobile categories in server output.

### Completion Notes List

- Implemented a server-rendered `/categories` route with page metadata and a mode-aware overview component.
- Reused a shared category card component between the homepage strip and the overview page so the card markup and fallback handling stay aligned.
- Preserved canonical slugs, including the Hydraulic Parts override to `hydraulic-hoses`.
- Confirmed the page renders visible automobile category data in the HTML response and switches categories through the shared mode context.

### File List

- `_bmad-output/implementation-artifacts/3-1-category-overview-page.md`
- `src/app/categories/page.tsx`
- `src/app/globals.css`
- `src/components/catalog/CategoriesOverview.tsx`
- `src/components/catalog/CategoryCard.tsx`
- `src/components/home/CategoryStrip.tsx`

## Change Log

- Added the `/categories` overview route and metadata.
- Shared category card rendering between the homepage strip and the dedicated categories page.
- Added breadcrumb link styling and retained the reference class structure.
