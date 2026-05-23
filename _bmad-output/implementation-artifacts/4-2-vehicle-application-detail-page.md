# Story 4.2: Vehicle/Application Detail Page

## Status

review

## Story

As a site visitor, I want to see common parts for a specific vehicle type or application, so that I can discover which spare parts are relevant to my equipment.

## Acceptance Criteria

1. `/vehicle/[type]` exists as a Next.js App Router dynamic route.
2. `/vehicle/tractors` loads a detail page for Tractors.
3. A back button is visible and links back to `/vehicle`.
4. A kicker label is displayed, for example `Vehicle Type` or `Product Range For`.
5. The selected vehicle/application title and description are shown.
6. A numbered parts list displays common parts for the selected vehicle/application.
7. Each part row is tappable and navigates to the relevant category page when a category mapping exists.
8. A hero vehicle/application image is displayed with meaningful alt text.
9. `generateStaticParams` pre-generates all valid vehicle/application type slugs from JSON data.
10. Invalid type slugs call `notFound()` and render the Next.js 404 behavior.
11. Page-specific metadata is generated for each valid vehicle/application detail page.
12. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
13. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Create the dynamic detail route.
  - [x] Add `src/app/vehicle/[type]/page.tsx`.
  - [x] Implement `generateStaticParams()` from JSON-backed vehicle/application helpers.
  - [x] Implement detail-specific `generateMetadata()`.
  - [x] Call `notFound()` for invalid type slugs.
- [x] Create or reuse vehicle detail components.
  - [x] Add `src/components/vehicle/VehicleDetail.tsx`.
  - [x] Reuse shared breadcrumb/back-link patterns if available.
  - [x] Use `range-item` style for numbered parts rows where compatible with extracted CSS.
- [x] Wire JSON catalog data.
  - [x] Load vehicle detail data from `catalog.json.vehicles`.
  - [x] Load industrial application detail data from `catalog.json.applications`.
  - [x] Use data utilities for lookup and static params.
  - [x] Do not duplicate detail maps in the route or component.
- [x] Implement category navigation from parts list.
  - [x] Map parts to relevant category URLs where data provides a mapping.
  - [x] Use canonical category URLs such as `/automobile/brake-parts/` or `/industrial/hydraulic-hoses/`.
  - [x] If a part has no explicit mapping, keep the row accessible but avoid linking to an incorrect category.
- [x] Validate.
  - [x] Confirm `/vehicle/tractors` renders title, copy, numbered parts, back button, and image.
  - [x] Confirm an industrial application route such as `/vehicle/conveyors` renders application content.
  - [x] Confirm invalid type slugs return 404.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- Vehicle/application detail content must come from `src/data/catalog.json`.
- Story 1.3 owns the schema for vehicle/application maps.
- Story 1.4 should provide lookup/static-param helpers; extend those utility files if needed.
- Do not add Firebase, Firestore, database SDKs, API persistence, or duplicate TypeScript data files.

### Architecture Requirements

- Route file: `src/app/vehicle/[type]/page.tsx`
- Component location: `src/components/vehicle/VehicleDetail.tsx`
- Dynamic route must include `generateStaticParams` and `generateMetadata`.
- Invalid slugs must use `notFound()`.

### Reference Implementation Pointers

- `reference/index.html` contains the detail page at `page-vehicle-detail`.
- Relevant reference classes include `.vehicle-range-grid`, `.range-back`, `.range-list`, `.range-item`, and `.vehicle-range-visual`.
- Reference function `openVehicleDetail(type)` shows the intended content structure.

### Scope Boundaries

- This story does not create new category pages; it links to category routes from Epic 3.
- This story does not implement search, brands, product detail, enquiry, cart, checkout, or user accounts.
- This story should not guess category links if the JSON data has no safe mapping.

## Testing

- Browser test `/vehicle/tractors` and one industrial application detail route.
- Verify generated static params include all 12 combined vehicle/application slugs.
- Verify invalid route `/vehicle/not-a-real-type` returns 404.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 4.2 acceptance criteria, architecture static route requirements, and JSON-only storage constraints.
- Ready for development after Story 4.1 listing and shared vehicle/application data are available.

## Dev Agent Record

### Completion Notes

- Added a static `/vehicle/[type]` route with `generateStaticParams()`, per-entity metadata, and `notFound()` handling for invalid slugs.
- Implemented `VehicleDetail` with a back link, kicker, descriptive copy, numbered parts list, hero image, and safe category links only where a mapping exists.
- Verified the route with `npm run lint` and `npm run build`.

### File List

- `src/app/vehicle/[type]/page.tsx`
- `src/components/vehicle/VehicleDetail.tsx`
- `src/lib/dataUtils.ts`
- `src/lib/vehicleUtils.ts`
- `src/data/types.ts`
- `src/app/globals.css`

### Change Log

- Implemented Story 4.2 dynamic vehicle/application detail pages with JSON-backed static params, metadata, and conservative category navigation.
