---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - '_bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md'
  - '_bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/.decision-log.md'
  - '_bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/validation-report.md'
  - 'reference/index.html'
workflowType: 'architecture'
project_name: 'New SV automobile'
user_name: 'Balaji'
date: '2026-05-20'
lastStep: 8
status: 'complete'
completedAt: '2026-05-20'
---

# Architecture Decision Document

This architecture is for the New SV Automobile catalogue website. The project is a public, SEO-first product catalogue for automobile and industrial parts. It uses Next.js on Vercel and stores all business/catalogue data in JSON files, not Firebase or Firestore.

## Project Context

### Functional Scope

- Homepage with Automobile/Industrial mode switch.
- Category overview pages and SEO-friendly category detail pages.
- Product listing, filtering, sorting, and grid/list view toggle.
- Product detail pages with specs, compatibility, trust indicators, WhatsApp, and call CTAs.
- Vehicle/Application browse pages.
- Brands, search, contact, floating WhatsApp, and global navigation.
- SEO infrastructure with static metadata, canonical URLs, and JSON-LD structured data.

### Non-Functional Requirements

- Mobile-first layout for 360-430px viewports.
- LCP target below 2.5s on 4G.
- Server-rendered or statically generated crawlable HTML.
- Clean URLs with no hash routing.
- Exact visual fidelity to `reference/index.html`.
- No e-commerce: no cart, checkout, payment, order tracking, or user accounts.

### Primary Constraints

| Constraint | Decision |
|---|---|
| UI reference | `reference/index.html` is the source of truth for layout, classes, breakpoints, typography, and animation behavior. |
| Framework | Next.js App Router with TypeScript. |
| Hosting | Vercel frontend deployment. |
| Data storage | Version-controlled JSON files in `src/data/`. |
| Database services | No Firebase, Firestore, Firebase Storage, Prisma, or external database. |
| Routing | `/[mode]/[categorySlug]/` and `/[mode]/[categorySlug]/[productSlug]/`. |

## Technology Stack

| Area | Technology | Rationale |
|---|---|---|
| Framework | Next.js v16 App Router | Static generation, metadata APIs, Vercel-native deployment. |
| Language | TypeScript | Strong contracts for JSON data and component props. |
| Styling | Vanilla CSS in `src/app/globals.css` | Preserves the reference HTML styling exactly. |
| Data | JSON file imports | Simple manual editing, zero backend cost, easy deployment. |
| Data typing | `src/data/types.ts` | Validates shape used by pages and helpers. |
| Hosting | Vercel | Fast CDN and simple production/preview deploys. |
| Sitemap | `next-sitemap` | Generates `sitemap.xml` and `robots.txt`. |
| Analytics | Vercel Analytics | Lightweight Web Vitals monitoring. |

### Starter Command

```bash
npx create-next-app@latest ./ --typescript --eslint --app --no-tailwind --src-dir --turbopack
```

### Dependencies

- `next`, `react`, `react-dom`, `typescript`, `eslint`.
- `next-sitemap` for sitemap and robots generation.
- `@vercel/analytics` for performance monitoring.
- No Firebase or database SDK dependency.

## Data Architecture

### Decision D-1: JSON Catalogue Source Of Truth

**Choice:** Store all site and catalogue data in `src/data/catalog.json`.

**Rationale:** The user will maintain data manually in JSON. This avoids database setup, database billing, admin authentication, security rules, and runtime data-fetching complexity. Next.js can import the JSON at build time and generate static category/product pages.

**Implications:**

- Updating products requires editing `catalog.json` and redeploying.
- Product images are referenced by URL/path in JSON and stored in `public/images/` or external static URLs.
- All lookup, filtering, SEO, and search behavior reads from the same JSON source.
- If an admin panel is needed later, it must be introduced as a separate architecture decision. Firebase is not part of the planned architecture.

### Data Directory

```text
src/data/
|-- catalog.json          # Source of truth for modes, categories, products, brands, vehicles, applications
`-- types.ts              # TypeScript interfaces for the JSON schema
```

### JSON Shape

```json
{
  "modes": {
    "automobile": {},
    "industrial": {}
  },
  "categories": {
    "automobile": [],
    "industrial": []
  },
  "products": {
    "automobile": [],
    "industrial": []
  },
  "brands": {
    "automobile": [],
    "industrial": []
  },
  "vehicles": [],
  "applications": []
}
```

### Core Product Interface

```typescript
export interface Product {
  id: string;
  name: string;
  slug: string;
  oemNumber: string;
  shortDescription: string;
  fullDescription?: string;
  brand: string;
  category: string;
  categorySlug: string;
  compatibleVehicles?: string[];
  compatibleApplications?: string[];
  technicalSpecs?: Record<string, string>;
  availableSizes?: string[];
  stockStatus: 'in-stock' | 'ready-stock' | 'available';
  popularityRank: number;
  imageUrl?: string;
  imageFallbackInitials: string;
}
```

### Data Access Rules

- `src/data/catalog.json` is the only editable data source.
- `src/lib/dataUtils.ts` is the single query layer.
- Pages and components must not import raw JSON directly unless they are data utilities.
- Components receive data through props.
- All JSON keys use `camelCase`.
- Slugs in JSON must match the URL patterns in the PRD.
- Custom slug overrides are stored as `slugOverride` on the relevant category/product object.

### Data Flow

```text
src/data/catalog.json
  -> src/data/types.ts
  -> src/lib/dataUtils.ts
  -> src/app/**/page.tsx
  -> src/components/**/*.tsx
```

## Routing Architecture

### Decision D-2: App Router Static Routes

**Choice:** Use Next.js App Router dynamic segments.

```text
src/app/
|-- layout.tsx
|-- page.tsx
|-- categories/page.tsx
|-- [mode]/
|   |-- layout.tsx
|   `-- [categorySlug]/
|       |-- page.tsx
|       `-- [productSlug]/page.tsx
|-- vehicle/
|   |-- page.tsx
|   `-- [type]/page.tsx
|-- brands/page.tsx
|-- contact/page.tsx
`-- search/page.tsx
```

### Static Generation

- Every `[mode]/[categorySlug]` route must implement `generateStaticParams`.
- Every `[mode]/[categorySlug]/[productSlug]` route must implement `generateStaticParams`.
- Route params are generated from `catalog.json`.
- Invalid slugs call `notFound()`.
- All SEO metadata is generated server-side from JSON.

## Frontend Architecture

### Decision D-3: Hybrid Mode State

**Choice:** Use React Context for homepage mode switching and URL path segments for routed pages.

- Homepage mode switch is client-side and does not require navigation.
- Category/product pages use `/automobile/...` or `/industrial/...` as the source of truth.
- URL-derived mode is required for SEO and static generation.

### Component Organization

```text
src/components/
|-- layout/
|   |-- Header.tsx
|   |-- MobileDrawer.tsx
|   |-- Footer.tsx
|   |-- FloatingWhatsApp.tsx
|   `-- Breadcrumb.tsx
|-- home/
|   |-- HeroSection.tsx
|   |-- ModeToggle.tsx
|   |-- HeroSlideshow.tsx
|   |-- CategoryStrip.tsx
|   |-- FeaturedProducts.tsx
|   |-- BrandMarquee.tsx
|   |-- AdvantagesSection.tsx
|   `-- ContactBand.tsx
|-- catalog/
|   |-- CategoryCard.tsx
|   |-- ProductCard.tsx
|   |-- FilterPanel.tsx
|   |-- FilterChips.tsx
|   |-- SortDropdown.tsx
|   `-- ViewToggle.tsx
|-- product/
|   |-- ProductDetail.tsx
|   |-- ProductGallery.tsx
|   |-- EnquiryActions.tsx
|   |-- CompatibilityList.tsx
|   |-- TechSpecs.tsx
|   `-- TrustRow.tsx
|-- vehicle/
|   |-- VehicleCard.tsx
|   `-- VehicleDetail.tsx
|-- search/
|   |-- SearchInput.tsx
|   |-- SearchSuggestions.tsx
|   `-- SearchResults.tsx
`-- shared/
    |-- SeoJsonLd.tsx
    `-- ImageFallback.tsx
```

### Server And Client Boundaries

- Server Components: pages, layouts, SEO generation, data lookup.
- Client Components: mode toggle, slideshow, filters, search input, mobile drawer, floating WhatsApp.
- Minimize `'use client'`; only use it where browser APIs, state, effects, or events are required.

## Utility Layer

```text
src/lib/
|-- dataUtils.ts       # JSON-backed catalogue queries
|-- slugUtils.ts       # Slug validation and lookup helpers
|-- seoHelpers.ts      # Metadata and JSON-LD builders
|-- modeUtils.ts       # Mode validation and URL-derived mode helpers
`-- whatsappUtils.ts   # WhatsApp deep link construction
```

### Query Responsibilities

`dataUtils.ts` must expose stable helpers such as:

- `getModes()`
- `getCategories(mode)`
- `getCategoryBySlug(mode, categorySlug)`
- `getProducts(mode)`
- `getCategoryProducts(mode, categorySlug)`
- `getProductBySlug(mode, categorySlug, productSlug)`
- `searchProducts(query, mode?)`
- `getStaticCategoryParams()`
- `getStaticProductParams()`

## SEO Architecture

- Use `generateMetadata` on every crawlable page.
- Generate title, description, canonical URL, Open Graph metadata, and structured data from `catalog.json`.
- Use JSON-LD for `LocalBusiness`, `BreadcrumbList`, `Product`, and `ItemList`.
- Generate sitemap entries from the JSON-backed route helpers.

## Security Architecture

- No authentication.
- No database credentials.
- No API endpoints required for catalogue data.
- Use security headers in `next.config.js`.
- Sanitize any user-controlled search string before display.
- WhatsApp, phone, email, and Google Maps are outbound links only.

## Performance Architecture

- Static generation for all category and product pages.
- Vercel CDN for cached static HTML/assets.
- `next/font/google` for Barlow and Barlow Condensed.
- Lazy-load slideshow images after the first visible image.
- Use plain `<img>` initially to preserve layout; migrate to `next/image` only after visual parity is verified.
- Keep the JSON catalogue import server-side where possible.

## Environment Configuration

- `.env.local` is optional and only for runtime/deployment settings.
- No database secrets are required.
- `next.config.js` handles security headers, image domains, and redirects.
- `next-sitemap.config.js` handles sitemap and robots output.

## Implementation Rules

1. Never add Firebase, Firestore, Firebase Storage, or database SDKs.
2. Never create duplicate product/category data in TypeScript files.
3. Always read catalogue data from `src/data/catalog.json` through `src/lib/dataUtils.ts`.
4. Always use interfaces from `src/data/types.ts`.
5. Always derive mode from URL on routed pages.
6. Always include `generateStaticParams` and `generateMetadata` for SEO-critical dynamic routes.
7. Preserve reference HTML class names and CSS variables exactly.
8. Never add cart, checkout, payment, order, or user-account functionality.
9. Use `camelCase` for TypeScript/JSON fields and preserve `kebab-case` CSS classes.

## Requirements Mapping

| PRD Feature | Pages | Components | Data Source |
|---|---|---|---|
| FR-1/FR-2 Mode Switch | `page.tsx` | `ModeToggle`, `HeroSection` | `catalog.json.modes` |
| FR-3 Category Overview | `categories/page.tsx` | `CategoryCard` | `catalog.json.categories` |
| FR-4/FR-5/FR-6 Product Listing | `[mode]/[categorySlug]/page.tsx` | `ProductCard`, `FilterPanel`, `ViewToggle` | `catalog.json.products` |
| FR-7/FR-8 Product Detail | `[mode]/[categorySlug]/[productSlug]/page.tsx` | `ProductDetail`, `EnquiryActions`, `TrustRow` | `catalog.json.products` |
| FR-9/FR-10 Vehicle/Application | `vehicle/page.tsx`, `vehicle/[type]/page.tsx` | `VehicleCard`, `VehicleDetail` | `catalog.json.vehicles`, `catalog.json.applications` |
| FR-11 Brands | `brands/page.tsx` | `BrandCard` | `catalog.json.brands` |
| FR-12/FR-13 Search | `search/page.tsx` | `SearchInput`, `SearchResults` | `dataUtils.ts` |
| FR-14 Contact | `contact/page.tsx` | `ContactCard` | `catalog.json.modes` |
| FR-15 Floating WhatsApp | `layout.tsx` | `FloatingWhatsApp` | `whatsappUtils.ts` |
| FR-16 Navigation | `layout.tsx` | `Header`, `MobileDrawer` | `catalog.json.modes`, `catalog.json.categories` |
| FR-17/FR-18/FR-19 SEO | All pages | `SeoJsonLd` | `seoHelpers.ts`, `catalog.json` |

## Validation Results

### Coherence

- Next.js, TypeScript, JSON imports, and Vercel static generation are compatible.
- JSON-backed route helpers align with `generateStaticParams`.
- The architecture has no backend runtime dependency.
- Mode state is URL-backed where SEO requires stable crawlable routes.

### Coverage

- All 19 functional requirements are covered.
- Mobile-first, SEO, performance, design fidelity, and no-e-commerce constraints are preserved.
- JSON storage replaces Firebase completely.

### Remaining Gaps

- `catalog.json` needs to be populated from `reference/index.html`.
- Optional JSON schema validation can be added later if catalogue edits become frequent.
- Favicon, Open Graph image, and Google Ads conversion tracking are launch/post-launch tasks.
- Full-text fuzzy search is deferred.

## Implementation Handoff

First implementation priority:

```bash
npx create-next-app@latest ./ --typescript --eslint --app --no-tailwind --src-dir --turbopack
```

Then:

1. Extract CSS from `reference/index.html` into `src/app/globals.css`.
2. Create `src/data/types.ts`.
3. Create and populate `src/data/catalog.json`.
4. Build `src/lib/dataUtils.ts`.
5. Implement static routes and metadata generation from JSON.
