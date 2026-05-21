# Story 4.4: Search Input and Suggestions

## Status
review

## Story
As a site visitor, I want to search for products using a text input with popular suggestions, so that I can quickly find a specific part by OEM number, name, or brand.

## Acceptance Criteria
1. `/search` exists as a Next.js App Router page.
2. The page displays a search input field with a mode-specific placeholder.
3. Popular search suggestion chips are displayed below the input.
4. Tapping a suggestion chip populates the search input with that text and triggers search.
5. When a user enters at least 2 characters, search executes client-side against all products in the active mode.
6. Matching is case-insensitive substring matching on product name, OEM/spec number, brand, and category.
7. Search input and suggestions use JSON-backed product and mode data.
8. The default server-rendered HTML includes the search page shell and default Automobile suggestions.
9. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
10. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [x] Create the search route.
  - [x] Add `src/app/search/page.tsx`.
  - [x] Render the search page shell and default Automobile suggestions.
  - [x] Add page-specific metadata.
- [x] Create search input components.
  - [x] Add `src/components/search/SearchInput.tsx`.
  - [x] Add `src/components/search/SearchSuggestions.tsx`.
  - [x] Use a Client Component for input value, suggestion clicks, and client-side search triggering.
- [x] Wire JSON-backed search data.
  - [x] Use `searchProducts(query, mode?)` from `src/lib/dataUtils.ts` if available.
  - [x] Search only active-mode products by default.
  - [x] Match product name, OEM/spec number, brand, and category.
  - [x] Sanitize displayed query text.
- [x] Implement suggestion behavior.
  - [x] Read popular suggestions from mode-specific JSON data when available.
  - [x] Clicking a chip sets the input value and triggers the same search path as typing.
  - [x] Do not use reference hard-coded demo results as the source of truth.
- [x] Prepare integration with Story 4.5.
  - [x] Expose search results state to `SearchResults` once Story 4.5 is implemented.
  - [x] Keep input/suggestions usable even when no results component exists yet.
- [x] Validate.
  - [x] Confirm `/search` renders input and suggestions.
  - [x] Confirm suggestions populate the input and trigger search.
  - [x] Confirm two-character threshold.
  - [x] Confirm matching works by name, OEM/spec, brand, and category.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth
- Product and suggestion data must come from `src/data/catalog.json` through `src/lib/dataUtils.ts`.
- Do not add Firebase, Firestore, database SDKs, API routes, or remote search services.
- Search is client-side in v1.

### Architecture Requirements
- Route file: `src/app/search/page.tsx`
- Component files:
  - `src/components/search/SearchInput.tsx`
  - `src/components/search/SearchSuggestions.tsx`
  - `src/components/search/SearchResults.tsx` in Story 4.5
- Search input is a Client Component.
- Use `searchProducts(query, mode?)` from the utility layer or extend Story 1.4 utility files if missing.
- Sanitize user-controlled search strings before display.

### Reference Implementation Pointers
- `reference/index.html` includes the search page near `page-search`.
- Relevant classes include `.search-bar`, `.suggestion-chip`, and `.search-filter-row`.
- Reference function `renderSearchPage()` demonstrates mode-specific placeholder and suggestion content.

### Scope Boundaries
- This story owns input and suggestions.
- Story 4.5 owns rendering result cards, category filter chips, see-all count, and empty state.
- This story does not add server search, database search, analytics tracking, or search persistence.

## Testing
- Browser test `/search` at desktop and mobile widths.
- Verify keyboard entry and suggestion chip click behavior.
- Verify active mode changes placeholder and suggestion list if mode context is available.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 4.4 acceptance criteria, architecture client-component guidance, and JSON-only storage constraints.
- Ready for development after Story 1.4 search utility exists.

## Dev Agent Record
### Completion Notes
- Added a static `/search` page shell with a client-side search input and mode-specific suggestion chips sourced from the JSON catalog.
- Wired search behavior to the shared `searchProducts()` utility with an active-mode default and a 2-character minimum threshold.
- Verified the implementation with `npm run lint` and `npm run build`.

### File List
- `src/app/search/page.tsx`
- `src/components/search/SearchInput.tsx`
- `src/components/search/SearchPageShell.tsx`
- `src/components/search/SearchSuggestions.tsx`

### Change Log
- Implemented Story 4.4 search input and suggestion behavior with JSON-backed mode-specific data and live client-side matching.
