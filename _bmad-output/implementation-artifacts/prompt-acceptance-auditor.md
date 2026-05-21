You are an Acceptance Auditor. Review this diff against the spec and context docs. Check for: violations of acceptance criteria, deviations from spec intent, missing implementation of specified behavior, contradictions between spec constraints and actual code. Output findings as a Markdown list. Each finding: one-line title, which AC/constraint it violates, and evidence from the diff.

SPEC:
```markdown
# Story 1.4: Utility Libraries

Status: review

## Story

As a developer,
I want all utility libraries created in `src/lib/`,
so that page components and components have consistent, reusable helper functions.

## Acceptance Criteria

1. `src/lib/slugUtils.ts` exports functions for slug generation, slug lookup, and custom override support matching PRD slug rules.
2. `src/lib/modeUtils.ts` exports functions for mode validation, default mode, and URL extraction.
3. `src/lib/whatsappUtils.ts` exports a function to build WhatsApp deep links with pre-filled product name and OEM/spec number.
4. `src/lib/dataUtils.ts` imports `src/data/catalog.json` and exports query helpers: `getProductBySlug`, `getCategoryProducts`, `getProductsByMode`, `filterProducts`, and `sortProducts`.
5. `src/lib/seoHelpers.ts` exports metadata helpers and JSON-LD builders for `LocalBusiness`, `BreadcrumbList`, `Product`, and `ItemList`.
6. All functions are properly typed with TypeScript and use interfaces from `src/data/types.ts`.
7. No page/component bypasses the utility layer to query catalogue data directly.
8. `npm run lint` and `npm run build` pass after utilities are added.

## Tasks / Subtasks

- [x] Create slug utilities. (AC: 1)
  - [x] Implement `slugify` using PRD rules: lowercase, replace `&` with `and`, replace non-alphanumeric with hyphens, trim leading/trailing hyphens.
  - [x] Implement custom override support for categories/products via `slugOverride`.
  - [x] Include helpers to compare generated slugs and explicit slugs safely.
- [x] Create mode utilities. (AC: 2)
  - [x] Define `DEFAULT_MODE = "automobile"`.
  - [x] Implement `isMode`, `getValidMode`, and URL/path-segment extraction helpers.
  - [x] Keep mode typing aligned with `src/data/types.ts`.
- [x] Create WhatsApp utilities. (AC: 3)
  - [x] Implement a message builder that includes product name, OEM/spec number, category, and mode context.
  - [x] Implement a `wa.me` URL builder with URL-encoded message text.
  - [x] Keep phone number/config inputs explicit; do not hardcode hidden credentials or external config.
- [x] Create JSON-backed data utilities. (AC: 4, 6, 7)
  - [x] Import `src/data/catalog.json`.
  - [x] Cast or validate the imported JSON as `Catalogue` from `src/data/types.ts`.
  - [x] Implement `getProductBySlug`, `getCategoryProducts`, `getProductsByMode`, `filterProducts`, and `sortProducts`.
  - [x] Add route/static helper functions from architecture where useful: `getCategories`, `getCategoryBySlug`, `getProducts`, `searchProducts`, `getStaticCategoryParams`, `getStaticProductParams`.
  - [x] Ensure helpers return stable empty arrays or `null` for not-found cases rather than throwing during normal lookup.
- [x] Create SEO helpers. (AC: 5, 6)
  - [x] Add page metadata helper functions that can be consumed by `generateMetadata`.
  - [x] Add JSON-LD builders for `LocalBusiness`, `BreadcrumbList`, `Product`, and `ItemList`.
  - [x] Keep returned JSON serializable and compatible with React script injection in later components.
- [x] Validate utilities. (AC: 1-8)
  - [x] Confirm imports use `@/data/types` and `@/data/catalog.json` or equivalent project aliases.
  - [x] Confirm no Firebase/database/auth/e-commerce utilities are introduced.
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.

## Dev Notes

### Dependency On Story 1.3

- Story 1.4 depends on `src/data/types.ts` and `src/data/catalog.json` from Story 1.3.
- If Story 1.3 is not implemented yet, implement Story 1.3 first. Do not create alternate data structures inside `src/lib/`.
- If this story is implemented in parallel, coordinate file ownership: Story 1.4 owns `src/lib/**`; Story 1.3 owns `src/data/**`.

### Architecture Data Flow

Required one-way flow:

```text
src/data/catalog.json
  -> src/data/types.ts
  -> src/lib/dataUtils.ts
  -> src/app/**/page.tsx
  -> src/components/**/*.tsx
```

No component should write to catalogue data. All catalogue reads should go through `dataUtils.ts`.

### Required Utility Files

```text
src/lib/slugUtils.ts
src/lib/modeUtils.ts
src/lib/whatsappUtils.ts
src/lib/dataUtils.ts
src/lib/seoHelpers.ts
```

### Slug Requirements

Implement PRD slug rules:

- Lowercase.
- Replace `&` with `and`.
- Replace non-alphanumeric characters with hyphens.
- Collapse repeated hyphens.
- Trim leading/trailing hyphens.
- Respect explicit `slug` or `slugOverride` fields when present.
- Support the Industrial Hydraulic Parts override to `hydraulic-hoses`.

### Query Helper Expectations

`dataUtils.ts` should expose, at minimum:

```typescript
getProductBySlug(mode, categorySlug, productSlug)
getCategoryProducts(mode, categorySlug)
getProductsByMode(mode)
filterProducts(products, filters)
sortProducts(products, sort)
```

Architecture also recommends:

```typescript
getModes()
getCategories(mode)
getCategoryBySlug(mode, categorySlug)
getProducts(mode)
searchProducts(query, mode?)
getStaticCategoryParams()
getStaticProductParams()
```

Use these names unless there is a strong TypeScript reason to split implementation internally.

### SEO Helper Expectations

`seoHelpers.ts` should prepare data for later pages/components, not render UI. Include:

- Metadata helper inputs/outputs compatible with Next.js `Metadata`.
- `buildLocalBusinessJsonLd`
- `buildBreadcrumbListJsonLd`
- `buildProductJsonLd`
- `buildItemListJsonLd`

### Architecture Guardrails

- Do not add Firebase, Firestore, Firebase Storage, Prisma, CMS, auth, cart, checkout, payment, or order utilities.
- Do not add route handlers or API endpoints for catalogue data.
- Keep functions deterministic and side-effect free.
- Keep returned data immutable from the caller's perspective where practical.

### Testing / Verification

Run:

```bash
npm run lint
npm run build
```

If practical within the existing project setup, add lightweight unit tests for slug and data helpers. If no test framework exists yet, do not add a framework solely for this story; rely on TypeScript build and lint until testing architecture is introduced.

## Project Structure Notes

Expected files created:

```text
src/lib/slugUtils.ts
src/lib/modeUtils.ts
src/lib/whatsappUtils.ts
src/lib/dataUtils.ts
src/lib/seoHelpers.ts
_bmad-output/implementation-artifacts/1-4-utility-libraries.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

Expected prerequisite files from Story 1.3:

```text
src/data/types.ts
src/data/catalog.json
```

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 1.4]
- [Source: _bmad-output/planning-artifacts/architecture.md - Utility Layer, Data Flow, SEO Architecture]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - Slug Rules, SEO Infrastructure, Enquiry Actions]
- [Source: _bmad-output/implementation-artifacts/1-3-json-catalogue-and-typescript-data-types.md - data model prerequisite]
- [Source: reference/index.html - `getProductSlug`, metadata, JSON-LD, WhatsApp, and catalogue rendering logic]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Reviewed Next.js 16 metadata documentation in `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`.
- `node -e "<catalog prerequisite check>"` passed.
- `cmd /c npm run lint` passed.
- `cmd /c npm run build` passed.
- `rg -n "catalog\\.json|Firebase|Firestore|Prisma|checkout|payment|cart|auth" src` confirmed only `dataUtils.ts` imports catalogue JSON; remaining match was product text containing "cartridge".

### Completion Notes List

- Story context created from architecture, epics, PRD, reference implementation scan, and Story 1.3 dependency.
- Created slug utilities with PRD-compliant slug generation, override-aware slug resolution, slug comparison, and lookup helpers.
- Created mode utilities for default mode, mode validation, and pathname/path-segment extraction.
- Created WhatsApp utilities for explicit-phone `wa.me` deep links with pre-filled product enquiry context.
- Created JSON-backed data utilities that expose typed catalogue query, filtering, sorting, search, and static route parameter helpers.
- Created SEO helpers for Next.js-compatible metadata plus LocalBusiness, BreadcrumbList, Product, and ItemList JSON-LD builders.
- Confirmed no pages or components import `catalog.json` directly; catalogue access now goes through `src/lib/dataUtils.ts`.

### File List

- `_bmad-output/implementation-artifacts/1-4-utility-libraries.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/lib/slugUtils.ts`
- `src/lib/modeUtils.ts`
- `src/lib/whatsappUtils.ts`
- `src/lib/dataUtils.ts`
- `src/lib/seoHelpers.ts`

### Change Log

- 2026-05-20: Implemented utility layer for slugs, modes, WhatsApp links, JSON-backed catalogue queries, and SEO helpers.

```

DIFF:
```diff
diff --git a/src/lib/dataUtils.ts b/src/lib/dataUtils.ts
new file mode 100644
index 0000000..bc0d4b2
--- /dev/null
+++ b/src/lib/dataUtils.ts
@@ -0,0 +1,213 @@
+import catalogJson from "@/data/catalog.json";
+import type { Catalogue, Category, Mode, Product } from "@/data/types";
+import { DEFAULT_MODE, getValidMode } from "@/lib/modeUtils";
+import { findBySlug, getProductSlug, slugsMatch, slugify } from "@/lib/slugUtils";
+
+export type ProductSort =
+  | "popularity"
+  | "name-ascending"
+  | "name-descending"
+  | "brand-ascending"
+  | "oem-ascending";
+
+export interface ProductFilters {
+  categorySlug?: string;
+  brand?: string;
+  stockStatus?: Product["stockStatus"];
+  compatibleWith?: string;
+  query?: string;
+}
+
+export interface StaticCategoryParam {
+  mode: Mode;
+  categorySlug: string;
+}
+
+export interface StaticProductParam extends StaticCategoryParam {
+  productSlug: string;
+}
+
+export const catalogue = catalogJson as Catalogue;
+
+export function getCatalogue(): Catalogue {
+  return catalogue;
+}
+
+export function getModes(): Mode[] {
+  return ["automobile", "industrial"];
+}
+
+export function getCategories(mode: Mode = DEFAULT_MODE): Category[] {
+  return [...catalogue.categories[getValidMode(mode)]];
+}
+
+export function getCategoryBySlug(
+  mode: Mode,
+  categorySlug: string,
+): Category | null {
+  return findBySlug(getCategories(mode), categorySlug);
+}
+
+export function getProductsByMode(mode: Mode = DEFAULT_MODE): Product[] {
+  const modeProducts = catalogue.products[getValidMode(mode)];
+
+  return Object.values(modeProducts).flat();
+}
+
+export const getProducts = getProductsByMode;
+
+export function getCategoryProducts(
+  mode: Mode,
+  categorySlug: string,
+): Product[] {
+  const category = getCategoryBySlug(mode, categorySlug);
+
+  if (!category) {
+    return [];
+  }
+
+  return [...(catalogue.products[mode][category.slug] || [])];
+}
+
+export function getProductBySlug(
+  mode: Mode,
+  categorySlug: string,
+  productSlug: string,
+): Product | null {
+  return (
+    getCategoryProducts(mode, categorySlug).find((product) =>
+      slugsMatch(product, productSlug),
+    ) || null
+  );
+}
+
+export function filterProducts(
+  products: readonly Product[],
+  filters: ProductFilters = {},
+): Product[] {
+  const normalizedQuery = filters.query?.trim().toLowerCase();
+  const normalizedCompatible = filters.compatibleWith?.trim().toLowerCase();
+
+  return products.filter((product) => {
+    if (filters.categorySlug && product.categorySlug !== filters.categorySlug) {
+      return false;
+    }
+
+    if (filters.brand && product.brand !== filters.brand) {
+      return false;
+    }
+
+    if (filters.stockStatus && product.stockStatus !== filters.stockStatus) {
+      return false;
+    }
+
+    if (normalizedCompatible) {
+      const compatibility = [
+        ...(product.compatibleVehicles || []),
+        ...(product.compatibleApplications || []),
+      ].map((item) => item.toLowerCase());
+
+      if (!compatibility.some((item) => item.includes(normalizedCompatible))) {
+        return false;
+      }
+    }
+
+    if (normalizedQuery) {
+      const searchable = [
+        product.name,
+        product.oemNumber,
+        product.shortDescription,
+        product.fullDescription,
+        product.brand,
+        product.category,
+        ...(product.compatibleVehicles || []),
+        ...(product.compatibleApplications || []),
+        ...Object.values(product.technicalSpecs || {}),
+      ]
+        .filter(Boolean)
+        .join(" ")
+        .toLowerCase();
+
+      return searchable.includes(normalizedQuery);
+    }
+
+    return true;
+  });
+}
+
+export function sortProducts(
+  products: readonly Product[],
+  sort: ProductSort = "popularity",
+): Product[] {
+  const sortedProducts = [...products];
+
+  switch (sort) {
+    case "name-ascending":
+      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
+    case "name-descending":
+      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
+    case "brand-ascending":
+      return sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
+    case "oem-ascending":
+      return sortedProducts.sort((a, b) =>
+        a.oemNumber.localeCompare(b.oemNumber, undefined, {
+          numeric: true,
+          sensitivity: "base",
+        }),
+      );
+    case "popularity":
+    default:
+      return sortedProducts.sort(
+        (a, b) => a.popularityRank - b.popularityRank,
+      );
+  }
+}
+
+export function searchProducts(query: string, mode?: Mode): Product[] {
+  const products = mode ? getProductsByMode(mode) : getModes().flatMap(getProductsByMode);
+
+  return filterProducts(products, { query });
+}
+
+export function getStaticCategoryParams(): StaticCategoryParam[] {
+  return getModes().flatMap((mode) =>
+    getCategories(mode).map((category) => ({
+      mode,
+      categorySlug: category.slug,
+    })),
+  );
+}
+
+export function getStaticProductParams(): StaticProductParam[] {
+  return getModes().flatMap((mode) =>
+    getProductsByMode(mode).map((product) => ({
+      mode,
+      categorySlug: product.categorySlug,
+      productSlug: getProductSlug(product),
+    })),
+  );
+}
+
+export function getProductUrl(product: Product, mode: Mode): string {
+  return `/${mode}/${product.categorySlug}/${getProductSlug(product)}/`;
+}
+
+export function getCategoryUrl(category: Category, mode: Mode): string {
+  return `/${mode}/${category.slug}/`;
+}
+
+export function getBrands(mode: Mode) {
+  return [...catalogue.brands[getValidMode(mode)]];
+}
+
+export function getVehicles() {
+  return [...catalogue.vehicles];
+}
+
+export function getApplications() {
+  return [...catalogue.applications];
+}
+
+export function normalizeSearchQuery(query: string): string {
+  return slugify(query).replace(/-/g, " ");
+}
diff --git a/src/lib/modeUtils.ts b/src/lib/modeUtils.ts
new file mode 100644
index 0000000..d44b8d4
--- /dev/null
+++ b/src/lib/modeUtils.ts
@@ -0,0 +1,33 @@
+import type { Mode } from "@/data/types";
+
+export const DEFAULT_MODE: Mode = "automobile";
+
+const MODES: readonly Mode[] = ["automobile", "industrial"];
+
+export function getModes(): Mode[] {
+  return [...MODES];
+}
+
+export function isMode(value: unknown): value is Mode {
+  return typeof value === "string" && MODES.includes(value as Mode);
+}
+
+export function getValidMode(value: unknown): Mode {
+  return isMode(value) ? value : DEFAULT_MODE;
+}
+
+export function getModeFromPathname(pathname: string): Mode | null {
+  const [firstSegment] = pathname.split("/").filter(Boolean);
+
+  return isMode(firstSegment) ? firstSegment : null;
+}
+
+export function getModeFromSegments(segments: readonly string[]): Mode | null {
+  const [firstSegment] = segments;
+
+  return isMode(firstSegment) ? firstSegment : null;
+}
+
+export function getModeOrDefaultFromPathname(pathname: string): Mode {
+  return getModeFromPathname(pathname) || DEFAULT_MODE;
+}
diff --git a/src/lib/seoHelpers.ts b/src/lib/seoHelpers.ts
new file mode 100644
index 0000000..691a899
--- /dev/null
+++ b/src/lib/seoHelpers.ts
@@ -0,0 +1,195 @@
+import type { Metadata } from "next";
+import type { Category, Mode, Product } from "@/data/types";
+import {
+  getCategoryProducts,
+  getCategoryUrl,
+  getProductUrl,
+} from "@/lib/dataUtils";
+
+export const DEFAULT_SITE_URL = "https://new-sv-auto-test.web.app";
+export const BUSINESS_NAME = "SV Enterprises";
+export const BUSINESS_PHONE = "+91 80 2345 6789";
+
+export interface SeoMetadataInput {
+  title: string;
+  description: string;
+  path?: string;
+  siteUrl?: string;
+  keywords?: string[];
+}
+
+export interface BreadcrumbItem {
+  name: string;
+  path: string;
+}
+
+export type JsonLdValue =
+  | string
+  | number
+  | boolean
+  | null
+  | JsonLdValue[]
+  | { [key: string]: JsonLdValue };
+
+export type JsonLdObject = { [key: string]: JsonLdValue };
+
+export function absoluteUrl(
+  path = "/",
+  siteUrl = DEFAULT_SITE_URL,
+): string {
+  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
+  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
+
+  return `${normalizedSiteUrl}${normalizedPath}`;
+}
+
+export function buildMetadata(input: SeoMetadataInput): Metadata {
+  const url = absoluteUrl(input.path || "/", input.siteUrl);
+
+  return {
+    title: input.title,
+    description: input.description,
+    keywords: input.keywords,
+    alternates: {
+      canonical: url,
+    },
+    openGraph: {
+      title: input.title,
+      description: input.description,
+      url,
+      siteName: BUSINESS_NAME,
+      type: "website",
+    },
+  };
+}
+
+export function buildHomeMetadata(mode: Mode, description: string): Metadata {
+  const title =
+    mode === "industrial"
+      ? "SV Enterprises - Industrial Products Wholesale Dealer Bangalore"
+      : "SV Enterprises - Automobile Spare Parts Bangalore";
+
+  return buildMetadata({
+    title,
+    description,
+    path: "/",
+    keywords: [
+      BUSINESS_NAME,
+      mode === "industrial"
+        ? "industrial products Bangalore"
+        : "automobile spare parts Bangalore",
+    ],
+  });
+}
+
+export function buildCategoryMetadata(
+  mode: Mode,
+  category: Category,
+): Metadata {
+  const seoTitle =
+    mode === "industrial" && category.title === "Hydraulic Parts"
+      ? "Hydraulic Hoses & Hydraulic Parts"
+      : category.title;
+  const productLabel =
+    mode === "industrial" ? "industrial products" : "automobile spare parts";
+
+  return buildMetadata({
+    title: `${seoTitle} Wholesale Dealer in Bangalore | ${BUSINESS_NAME}`,
+    description: `${category.catalogueCopy} Available from ${BUSINESS_NAME}, Bangalore wholesale dealer for ${productLabel}.`,
+    path: getCategoryUrl(category, mode),
+    keywords: [category.title, productLabel, BUSINESS_NAME],
+  });
+}
+
+export function buildProductMetadata(
+  mode: Mode,
+  product: Product,
+): Metadata {
+  return buildMetadata({
+    title: `${product.name} ${product.oemNumber} | ${product.category} Bangalore | ${BUSINESS_NAME}`,
+    description: `Enquire for ${product.name} (${product.oemNumber || "standard specification"}) from ${BUSINESS_NAME}, Bangalore wholesale dealer for ${product.category.toLowerCase()}.`,
+    path: getProductUrl(product, mode),
+    keywords: [
+      product.name,
+      product.oemNumber,
+      product.category,
+      product.brand,
+      BUSINESS_NAME,
+    ],
+  });
+}
+
+export function buildLocalBusinessJsonLd(
+  siteUrl = DEFAULT_SITE_URL,
+): JsonLdObject {
+  return {
+    "@context": "https://schema.org",
+    "@type": "LocalBusiness",
+    "@id": `${absoluteUrl("/", siteUrl)}#business`,
+    name: BUSINESS_NAME,
+    url: absoluteUrl("/", siteUrl),
+    telephone: BUSINESS_PHONE,
+    address: {
+      "@type": "PostalAddress",
+      addressLocality: "Bangalore",
+      addressRegion: "Karnataka",
+      addressCountry: "IN",
+    },
+  };
+}
+
+export function buildBreadcrumbListJsonLd(
+  items: readonly BreadcrumbItem[],
+  siteUrl = DEFAULT_SITE_URL,
+): JsonLdObject {
+  return {
+    "@context": "https://schema.org",
+    "@type": "BreadcrumbList",
+    itemListElement: items.map((item, index) => ({
+      "@type": "ListItem",
+      position: index + 1,
+      name: item.name,
+      item: absoluteUrl(item.path, siteUrl),
+    })),
+  };
+}
+
+export function buildProductJsonLd(
+  product: Product,
+  mode: Mode,
+  siteUrl = DEFAULT_SITE_URL,
+): JsonLdObject {
+  return {
+    "@context": "https://schema.org",
+    "@type": "Product",
+    name: product.name,
+    brand: {
+      "@type": "Brand",
+      name: product.brand || BUSINESS_NAME,
+    },
+    sku: product.oemNumber,
+    description: product.fullDescription || product.shortDescription,
+    category: product.category,
+    url: absoluteUrl(getProductUrl(product, mode), siteUrl),
+  };
+}
+
+export function buildItemListJsonLd(
+  mode: Mode,
+  category: Category,
+  products = getCategoryProducts(mode, category.slug),
+  siteUrl = DEFAULT_SITE_URL,
+): JsonLdObject {
+  return {
+    "@context": "https://schema.org",
+    "@type": "ItemList",
+    name: `${category.title} products`,
+    url: absoluteUrl(getCategoryUrl(category, mode), siteUrl),
+    itemListElement: products.map((product, index) => ({
+      "@type": "ListItem",
+      position: index + 1,
+      name: product.name,
+      url: absoluteUrl(getProductUrl(product, mode), siteUrl),
+    })),
+  };
+}
diff --git a/src/lib/slugUtils.ts b/src/lib/slugUtils.ts
new file mode 100644
index 0000000..3164c01
--- /dev/null
+++ b/src/lib/slugUtils.ts
@@ -0,0 +1,49 @@
+export interface SlugSource {
+  name?: string;
+  title?: string;
+  slug?: string;
+  slugOverride?: string;
+}
+
+export function slugify(value: string): string {
+  return value
+    .toLowerCase()
+    .replace(/&/g, " and ")
+    .replace(/[^a-z0-9]+/g, "-")
+    .replace(/-+/g, "-")
+    .replace(/^-+|-+$/g, "");
+}
+
+export function getPreferredSlug(source: SlugSource | string): string {
+  if (typeof source === "string") {
+    return slugify(source);
+  }
+
+  return (
+    source.slugOverride ||
+    source.slug ||
+    slugify(source.title || source.name || "")
+  );
+}
+
+export function slugsMatch(source: SlugSource | string, slug: string): boolean {
+  const expectedSlug = getPreferredSlug(source);
+  const normalizedSlug = slugify(slug);
+
+  return expectedSlug === slug || expectedSlug === normalizedSlug;
+}
+
+export function findBySlug<T extends SlugSource>(
+  items: readonly T[],
+  slug: string,
+): T | null {
+  return items.find((item) => slugsMatch(item, slug)) || null;
+}
+
+export function getCategorySlug(category: SlugSource | string): string {
+  return getPreferredSlug(category);
+}
+
+export function getProductSlug(product: SlugSource | string): string {
+  return getPreferredSlug(product);
+}
diff --git a/src/lib/whatsappUtils.ts b/src/lib/whatsappUtils.ts
new file mode 100644
index 0000000..2968655
--- /dev/null
+++ b/src/lib/whatsappUtils.ts
@@ -0,0 +1,58 @@
+import type { Mode, Product } from "@/data/types";
+
+export interface WhatsAppMessageInput {
+  productName: string;
+  oemNumber: string;
+  category: string;
+  mode: Mode;
+}
+
+export function normalizeWhatsAppPhone(phoneNumber: string): string {
+  return phoneNumber.replace(/[^0-9]/g, "");
+}
+
+export function buildWhatsAppMessage(input: WhatsAppMessageInput): string {
+  const productLabel =
+    input.mode === "industrial" ? "industrial product" : "automobile part";
+
+  return [
+    `Hello SV Enterprises, I want to enquire about this ${productLabel}.`,
+    `Product: ${input.productName}`,
+    `OEM/Spec: ${input.oemNumber}`,
+    `Category: ${input.category}`,
+    `Mode: ${input.mode}`,
+  ].join("\n");
+}
+
+export function buildProductWhatsAppMessage(
+  product: Product,
+  mode: Mode,
+): string {
+  return buildWhatsAppMessage({
+    productName: product.name,
+    oemNumber: product.oemNumber,
+    category: product.category,
+    mode,
+  });
+}
+
+export function buildWhatsAppUrl(
+  phoneNumber: string,
+  message: string,
+): string {
+  const phone = normalizeWhatsAppPhone(phoneNumber);
+  const encodedMessage = encodeURIComponent(message);
+
+  return `https://wa.me/${phone}?text=${encodedMessage}`;
+}
+
+export function buildProductWhatsAppUrl(
+  phoneNumber: string,
+  product: Product,
+  mode: Mode,
+): string {
+  return buildWhatsAppUrl(
+    phoneNumber,
+    buildProductWhatsAppMessage(product, mode),
+  );
+}

```
