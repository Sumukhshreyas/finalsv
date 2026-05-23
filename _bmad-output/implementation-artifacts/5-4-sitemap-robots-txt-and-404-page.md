# Story 5.4: Sitemap, Robots.txt and 404 Page

## Status

review

## Story

As a search engine crawler, I want a sitemap.xml, robots.txt, and proper 404 handling, so that all pages are discoverable and crawl budget is used efficiently.

## Acceptance Criteria

1. After production build, `next-sitemap` generates `/sitemap.xml`.
2. After production build, `next-sitemap` generates `/robots.txt` with appropriate crawl directives.
3. Sitemap includes all statically generated pages.
4. Sitemap includes all category URLs.
5. Sitemap includes all product detail URLs.
6. Navigating to a missing URL such as `/automobile/invalid-slug/` displays a custom 404 page.
7. Missing URLs return HTTP status code 404.
8. The 404 page uses the same layout shell, including header, footer, and floating WhatsApp button.
9. SEO-critical URLs are clean, lowercase, hyphenated, and human-readable.
10. Canonical content URLs do not use query parameters.
11. Maximum URL depth is 3 segments after the domain.
12. Custom slug overrides work correctly, including Hydraulic Parts -> `/industrial/hydraulic-hoses/`.
13. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
14. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Finalize sitemap generation.
  - [x] Verify `next-sitemap` is installed and configured.
  - [x] Verify `postbuild` runs `next-sitemap`.
  - [x] Ensure `next-sitemap.config.js` uses `NEXT_PUBLIC_SITE_URL` with a safe fallback.
  - [x] Add transform/additionalPaths logic if needed so JSON-backed dynamic routes are included.
- [x] Include all SEO-critical routes.
  - [x] Include `/`, `/categories`, `/vehicle`, `/brands`, `/search`, and `/contact`.
  - [x] Include all `/${mode}/${categorySlug}/` routes from JSON data.
  - [x] Include all `/${mode}/${categorySlug}/${productSlug}/` routes from JSON data.
  - [x] Include `/vehicle/{typeSlug}` routes from JSON vehicle/application data.
- [x] Generate robots.txt.
  - [x] Allow public crawling of catalogue pages.
  - [x] Reference the generated sitemap URL.
  - [x] Avoid blocking product/category routes.
- [x] Create custom 404 page.
  - [x] Add `src/app/not-found.tsx`.
  - [x] Use existing layout shell automatically through App Router.
  - [x] Provide helpful navigation links to Home, Categories, Search, Brands, and Contact.
  - [x] Keep copy concise and business-relevant.
- [x] Verify URL hygiene.
  - [x] Check lowercase hyphenated route helpers.
  - [x] Check no canonical query-param URLs.
  - [x] Check URL depth limit.
  - [x] Check Hydraulic Parts canonical override.
- [x] Validate.
  - [x] Run production build and postbuild.
  - [x] Inspect generated `sitemap.xml` and `robots.txt`.
  - [x] Verify invalid routes render 404.
  - [x] Run lint.

## Dev Notes

### Source of Truth

- Sitemap dynamic paths must come from JSON-backed route helpers in `src/lib/dataUtils.ts` and `src/lib/slugUtils.ts`.
- Do not hand-write static lists of category/product URLs.
- Do not hand-write `public/sitemap.xml` or `public/robots.txt`; let `next-sitemap` generate them.
- Do not add Firebase, Firestore, database SDKs, API routes, or external crawl services.

### Architecture Requirements

- `next-sitemap.config.js` handles sitemap and robots output.
- `NEXT_PUBLIC_SITE_URL` should define the production canonical domain.
- Invalid slugs in dynamic routes should already call `notFound()`.
- Custom 404 page file: `src/app/not-found.tsx`.

### Dependency Notes

- Story 1.1 installed and configured `next-sitemap`.
- Story 1.6 requires `postbuild` to run `next-sitemap`.
- This story finalizes catalogue route coverage once category/product/vehicle routes exist.

### URL Rules

- Category route: `/${mode}/${categorySlug}/`
- Product route: `/${mode}/${categorySlug}/${productSlug}/`
- Vehicle/application route: `/vehicle/${typeSlug}`
- Maximum canonical product depth: 3 segments after domain.
- Hydraulic Parts canonical path: `/industrial/hydraulic-hoses/`

### Scope Boundaries

- This story does not implement metadata tags; that is Story 5.2.
- This story does not implement JSON-LD; that is Story 5.3.
- This story does not deploy to production; it makes build output ready for deployment.

## Testing

- Run:
  - `npm run lint`
  - `npm run build`
- Inspect generated:
  - `public/sitemap.xml`
  - `public/robots.txt`
- Verify sitemap contains representative category, product, vehicle, and static page URLs.
- Verify invalid route behavior in browser or production server.

## Review Notes

- Reviewed against Epic 5.4 acceptance criteria, architecture sitemap/404 requirements, and JSON-only storage constraints.
- Ready for development after prior route stories and JSON-backed route helpers are implemented.

## Dev Agent Record

### Completion Notes

- Updated `next-sitemap.config.js` to use the project site URL fallback and emit JSON-backed catalog routes during the postbuild step.
- Added a custom App Router `not-found` page that inherits the shared layout shell and provides direct navigation back into the catalogue.
- Verified the generated `robots.txt` and `sitemap.xml` output after a production build and confirmed lint/build both pass.

### File List

- `next-sitemap.config.js`
- `src/app/not-found.tsx`

### Change Log

- Implemented Story 5.4 sitemap, robots, and 404 handling with catalog-backed route generation and custom not-found navigation.
