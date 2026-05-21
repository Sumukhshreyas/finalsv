Please run the bmad-review-edge-case-hunter skill on the following diff:

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
