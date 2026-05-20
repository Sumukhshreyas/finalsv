# Story 5.2: Dynamic SEO Metadata on All Pages

## Status
ready-for-dev

## Story
As a search engine crawler, I want every page to have unique, keyword-rich metadata, so that SV Enterprises pages rank well for target search terms.

## Acceptance Criteria
1. Every crawlable page has a page-specific `<title>` tag.
2. Every crawlable page has a page-specific `<meta name="description">` with keyword-rich content.
3. Every crawlable page has a `<meta name="keywords">` tag with relevant terms.
4. Every crawlable page has a `<link rel="canonical">` set to the correct canonical URL.
5. Every crawlable page has Open Graph tags: `og:title`, `og:description`, and `og:url`.
6. Every `page.tsx` for crawlable content implements `generateMetadata` or exports equivalent static metadata where dynamic data is not needed.
7. Every statically generated page has unique metadata in the production HTML output.
8. No two SEO-critical pages share the same title or meta description.
9. Metadata is generated from JSON-backed route/product/category helpers, not duplicated static maps.
10. No Firebase, Firestore, external database, API persistence, cart, checkout, login, or payment behavior is introduced.
11. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [ ] Audit all crawlable routes.
  - [ ] Homepage `/`
  - [ ] `/categories`
  - [ ] `/[mode]/[categorySlug]`
  - [ ] `/[mode]/[categorySlug]/[productSlug]`
  - [ ] `/vehicle`
  - [ ] `/vehicle/[type]`
  - [ ] `/brands`
  - [ ] `/search`
  - [ ] `/contact`
- [ ] Implement metadata helpers.
  - [ ] Extend `src/lib/seoHelpers.ts` if needed.
  - [ ] Generate title, description, keywords, canonical, and Open Graph metadata from JSON data.
  - [ ] Use `NEXT_PUBLIC_SITE_URL` or configured site URL for canonical absolute URLs.
- [ ] Add route-level metadata.
  - [ ] Add `generateMetadata` to dynamic category pages.
  - [ ] Add `generateMetadata` to dynamic product pages.
  - [ ] Add `generateMetadata` to vehicle/application detail pages.
  - [ ] Add static or generated metadata to all static routes.
- [ ] Preserve canonical URL rules.
  - [ ] Use lowercase hyphenated URLs.
  - [ ] Preserve custom slug override: Hydraulic Parts -> `/industrial/hydraulic-hoses/`.
  - [ ] Do not use query parameters for canonical content.
- [ ] Validate uniqueness.
  - [ ] Check titles and descriptions for duplicate values across key generated pages.
  - [ ] Confirm product metadata includes product name and OEM/spec number.
  - [ ] Confirm category metadata includes category and mode context.
  - [ ] Run lint and production build.

## Dev Notes

### Source of Truth
- Metadata must be built from `src/data/catalog.json` through `src/lib/dataUtils.ts`, `slugUtils.ts`, `modeUtils.ts`, and `seoHelpers.ts`.
- Do not create separate SEO data maps that duplicate product/category/brand/contact data.
- Do not add Firebase, Firestore, database SDKs, or API-backed metadata lookup.

### Architecture Requirements
- Architecture requires `generateMetadata` on every crawlable page.
- SEO helpers should build title, description, canonical URL, Open Graph fields, and keywords.
- All SEO metadata is generated server-side from JSON.
- URL-derived mode is required on routed category/product pages.

### Expected Utility Surface
- `buildPageMetadata(...)` or equivalent helper from `seoHelpers.ts`.
- Route helpers from `dataUtils.ts` for categories, products, vehicles/applications, brands, and search/contact pages.
- Slug helpers for canonical path generation.

### Critical Page Examples
- Product title example: `Brake Disc Rotor 51712M68K00 | Brake Parts Bangalore | SV Enterprises`
- Category title should include category, mode context, Bangalore, and SV Enterprises.
- Contact title should include SV Enterprises contact and Bangalore.

### Scope Boundaries
- This story only handles metadata tags.
- Story 5.3 owns JSON-LD structured data.
- Story 5.4 owns sitemap, robots, and custom 404 page.

## Testing
- Inspect production build HTML or use framework output checks for representative static pages.
- Confirm unique metadata for at least:
  - `/`
  - `/categories`
  - `/automobile/brake-parts/`
  - `/automobile/brake-parts/brake-disc-rotor/`
  - `/industrial/hydraulic-hoses/`
  - `/vehicle/tractors`
  - `/brands`
  - `/search`
  - `/contact`
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 5.2 acceptance criteria, architecture SEO requirements, and JSON-only storage constraints.
- Ready for development after route helpers from earlier epics exist.
