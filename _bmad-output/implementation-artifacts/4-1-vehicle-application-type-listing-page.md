# Story 4.1: Vehicle/Application Type Listing Page

## Status
ready-for-dev

## Story
As a site visitor, I want to browse vehicle segments or industrial applications on a dedicated page, so that I can find parts relevant to my specific vehicle or machinery type.

## Acceptance Criteria
1. `/vehicle` exists as a Next.js App Router page and renders listing content from the JSON catalog source of truth.
2. In Automobile mode, the page displays 6 vehicle type cards: Tractors, Bus and Trailers, Construction, Three Wheeler, Two Wheeler, Forklift.
3. Each vehicle card shows an icon or badge, title, and short description.
4. Each vehicle card links to a vehicle detail route, for example `/vehicle/tractors`.
5. In Industrial mode, the page displays 6 application type cards: Conveyors, Compressors, Hydraulic Power Packs, Packaging Machines, Industrial Pumps, Electrical Panels.
6. In Industrial mode, the page title adapts to `Search by Application`.
7. Each industrial application card links to an application detail route, for example `/vehicle/conveyors`.
8. The default server-rendered HTML includes visible Automobile vehicle listing content; critical listing content is not client-only.
9. Page-specific metadata is provided for `/vehicle`.
10. Existing reference visual language and CSS class conventions are preserved where applicable.
11. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
12. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [ ] Create the vehicle/application listing route.
  - [ ] Add `src/app/vehicle/page.tsx`.
  - [ ] Render Automobile vehicles by default for server output.
  - [ ] Add page-specific metadata.
- [ ] Create or reuse vehicle listing components.
  - [ ] Add `src/components/vehicle/VehicleCard.tsx`.
  - [ ] Use icon, badge, or existing reference SVG treatment for the card visual.
  - [ ] Keep cards as links to `/vehicle/{typeSlug}`.
- [ ] Wire JSON catalog data.
  - [ ] Read vehicle data from `src/data/catalog.json` through `src/lib/dataUtils.ts`.
  - [ ] Read industrial application data from `src/data/catalog.json` through the same utility layer.
  - [ ] Do not duplicate vehicle/application arrays in component files.
- [ ] Support mode-aware content.
  - [ ] Default no-JS/SSR output to Automobile.
  - [ ] If the existing mode context is available, allow client-side switching between Automobile vehicles and Industrial applications.
  - [ ] Keep `/vehicle` as a shared route for both modes, matching the PRD.
- [ ] Match reference styling and behavior.
  - [ ] Use reference classes such as `.vehicle-type-list`, `.vehicle-type-card`, and `.vehicle-type-icon` where applicable.
  - [ ] Ensure cards are keyboard-accessible and responsive.
- [ ] Validate.
  - [ ] Confirm Automobile mode shows all 6 vehicle types.
  - [ ] Confirm Industrial mode shows all 6 application types and title `Search by Application`.
  - [ ] Confirm each card links to a `/vehicle/{typeSlug}` route.
  - [ ] Run lint and production build.

## Dev Notes

### Source of Truth
- `catalog.json.vehicles` defines the 6 Automobile vehicle types.
- `catalog.json.applications` defines the 6 Industrial application types.
- Do not add `vehicles.ts`, `applications.ts`, Firebase, Firestore, database SDKs, or API-backed persistence.

### Architecture Requirements
- Route file: `src/app/vehicle/page.tsx`
- Component location: `src/components/vehicle/VehicleCard.tsx`
- Server Components should load default listing data.
- Client Components may be used only for mode switching if needed.
- Use interfaces from `src/data/types.ts`.

### Required Automobile Items
- Tractors
- Bus and Trailers
- Construction
- Three Wheeler
- Two Wheeler
- Forklift

### Required Industrial Items
- Conveyors
- Compressors
- Hydraulic Power Packs
- Packaging Machines
- Industrial Pumps
- Electrical Panels

### Reference Implementation Pointers
- `reference/index.html` contains the listing page at `page-vehicle`.
- Relevant reference classes include `.vehicle-type-list`, `.vehicle-type-card`, and `.vehicle-type-icon`.
- Reference function `renderExplorePage()` shows how mode-specific items populate the listing.

### Scope Boundaries
- This story does not implement `/vehicle/[type]` detail content; that is Story 4.2.
- This story does not implement brands or search pages.
- This story does not implement category/product detail pages beyond linking to existing routes.

## Testing
- Browser test `/vehicle` at desktop and mobile widths.
- Inspect server-rendered HTML or page source for Automobile vehicle names.
- Verify mode switch updates the listing if mode context is available.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 4.1 acceptance criteria, architecture component mapping, and JSON-only storage constraints.
- Ready for development after Story 1.3 catalog data and Story 1.4 utility functions are available.
