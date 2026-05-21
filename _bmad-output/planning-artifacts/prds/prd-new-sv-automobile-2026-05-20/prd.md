---
title: SV Enterprises â€” Automobile & Industrial Products Showcase Website
status: final
created: 2026-05-20
updated: 2026-05-21
---

# PRD: SV Enterprises â€” Product Showcase Website

## 0. Document Purpose

This PRD is for the product owner (sai), the development team, and any downstream architecture, UX, and sprint-planning workflows. It specifies the requirements for a **product showcase and enquiry-generation website** for SV Enterprises, a wholesale dealer of automobile spare parts and industrial products in Bangalore. The UI/UX design already exists as a fully designed HTML reference file (`reference/index.html`) and **must not be changed** â€” this PRD treats that design as the fixed visual specification. All functional requirements described here are derived from and constrained by that reference.

---

## 1. Vision

SV Enterprises is a Bangalore-based wholesale dealer serving workshops, retailers, fleet operators, and industrial buyers with automobile spare parts and industrial products. The business currently relies on phone calls, WhatsApp, and walk-in traffic. There is no digital presence to capture search traffic, run paid ads, or serve as a product catalogue for remote buyers.

This website will be a **mobile-first, SEO-optimised product showcase** that helps SV Enterprises rank organically on Google for automobile spare parts and industrial product searches in Bangalore, serve as a landing destination for Google Ads campaigns, and give customers a fast way to browse products and send enquiries via WhatsApp, phone, or email.

**This is not an e-commerce website.** There is no cart, no checkout, no online payment, and no order tracking. The website's sole commercial purpose is to generate enquiries and drive offline sales.

---

## 2. Target User

### 2.1 Primary Personas

- **Workshop Owner / Mechanic (Automobile):** Searches for OEM part numbers, compatible vehicle models, and brand availability. Needs to quickly identify a part and send a WhatsApp enquiry with the product details.
- **Industrial Maintenance Buyer:** Searches by bearing size, motor specification, hose type, or application. Needs to find the right industrial product and contact the dealer for bulk pricing.
- **Retail Spare Parts Shop Owner:** Browses by category or brand to check what SV Enterprises stocks. Wants to call or WhatsApp for wholesale pricing.

### 2.2 Jobs To Be Done

- Find a specific automobile spare part by OEM number, vehicle model, category, or brand and enquire about availability and pricing.
- Find a specific industrial product by size, specification, application, or brand and enquire about bulk supply.
- Verify that SV Enterprises carries the brands and categories relevant to the buyer's needs.
- Get SV Enterprises' contact details (phone, WhatsApp, email, address, hours) quickly.
- Share a specific product page link with a colleague or customer for reference.

### 2.3 Non-Users (v1)

- End consumers buying single parts for personal vehicles (the website targets B2B wholesale/dealer buyers).
- International buyers (all operations are Bangalore-local).
- Users expecting online ordering, payment, or delivery tracking.

### 2.4 Key User Journeys

- **UJ-1. Mechanic finds a brake disc by OEM number.**
  A workshop mechanic in Bangalore searches Google for "brake disc 51712M68K00 Bangalore". The product detail page ranks and opens. The mechanic sees the product image, OEM number, compatible vehicles, brand, and specs. They tap "WhatsApp Enquiry" to ask about price and availability.

- **UJ-2. Industrial buyer browses hydraulic products.**
  A maintenance engineer searches Google for "hydraulic hose wholesale Bangalore". The `/industrial/hydraulic-hoses/` category page ranks and opens. The buyer scrolls through the listed products, taps a specific hose assembly, reviews the specs, and taps "Call Supply Desk" for bulk pricing.

- **UJ-3. Retailer browses the catalogue by category.**
  A spare parts shop owner opens the website homepage on mobile, sees the Automobile/Industrial toggle, selects "Automobile Products", browses the categories (Engine Parts, Brake Parts, Suspension, etc.), taps into Brake Parts, and browses product cards. They tap a product to see full details and send a WhatsApp enquiry.

---

## 3. Glossary

- **Automobile Products** â€” Spare parts for cars, SUVs, MUVs, commercial vehicles, tractors, construction equipment, forklifts, two-wheelers, three-wheelers, and bus/trailers.
- **Industrial Products** â€” Bearings, hydraulic parts, motors, gearboxes, pneumatic parts, seals, and couplings for factory and industrial machinery.
- **Category** â€” A grouping of related products (e.g., "Brake Parts", "Bearings").
- **Product** â€” A single spare part or industrial item with a name, OEM/spec number, brand, description, compatibility, and specs.
- **Mode** â€” The top-level toggle on the homepage: Automobile or Industrial. Changes the entire homepage content, categories, brands, and navigation context.
- **Enquiry** â€” A contact action (WhatsApp, call, or email) initiated by the user from a product page. This is NOT an order.
- **OEM Number** â€” Original Equipment Manufacturer part number used to identify and cross-reference spare parts.
- **Product Number / Spec** â€” The size, specification, or model identifier for industrial products (e.g., "6205 ZZ", "SC 63 x 100").

---

## 4. Features

### 4.1 Homepage with Automobile/Industrial Mode Switch

**Description:** The homepage is the primary landing page. It features a prominent toggle switch allowing users to switch between **Automobile Products** and **Industrial Products** modes. Switching modes dynamically updates the hero section, categories, featured products, brands, advantages, and contact information â€” all without a page reload. Realizes UJ-3.

**Functional Requirements:**

#### FR-1: Mode Toggle Switch

User can switch between Automobile and Industrial modes via a two-button toggle on the homepage hero section.

**Consequences (testable):**
- Toggling to "Automobile Products" displays automobile-specific hero title, copy, highlight points, categories, featured products, brands, advantages, and contact details.
- Toggling to "Industrial Products" displays industrial-specific content across all homepage sections.
- The visual styling adapts per mode (orange accent for automobile, blue-grey accent for industrial) as defined in the reference HTML.
- Mode selection persists during the session when navigating away and returning to the homepage.

#### FR-2: Homepage Sections

The homepage displays the following sections in order, all content driven by the active mode:

**Consequences (testable):**
- **Hero Section:** Title, subtitle copy, three highlight points (e.g., "5000+ Parts In Stock"), two CTA buttons ("Search Parts", "Browse by Category"), hero image slideshow with auto-rotation, brand marquee strip.
- **Categories Section:** Horizontally scrollable category cards with image, title, description, and parts count. "View all" link navigates to the full categories overview page.
- **Top Brands Section:** Grid of brand cards for the active mode.
- **Featured Products Section:** 3 product tiles showing top-selling items with name, OEM, brand, and "Enquire" button.
- **Advantages Section:** 4 advantage cards (e.g., "OEM Matching", "Wholesale Supply").
- **Contact Band:** Dark banner with heading, copy, and contact rows (WhatsApp, Call, Email).

---

### 4.2 Category Overview Page

**Description:** A page showing all categories for the current mode in a grid layout, each as a card with image, title, description, parts count, and a "View products" link. Realizes UJ-3.

**Functional Requirements:**

#### FR-3: Category Overview Grid

User can view all available categories for the active mode on a dedicated page.

**Consequences (testable):**
- Automobile mode shows: Engine Parts, Brake Parts, Suspension, Electrical, Filters, Transmission, Cooling, Body Parts.
- Industrial mode shows: Bearings, Hydraulic Parts, Motors, Gearboxes, Pneumatic Parts, Seals and Couplings.
- Each card links to the corresponding category detail page.
- Breadcrumb navigation displays: Home > Categories.

---

### 4.3 Category Detail Page (Product Listing)

**Description:** Displays all products within a specific category. Includes a hero banner with category title and description, filter and sort controls, category chip navigation, and a grid of product cards. Realizes UJ-1, UJ-2, UJ-3.

**Functional Requirements:**

#### FR-4: Category Product Grid

User can view all products listed under a specific category.

**Consequences (testable):**
- Each product card shows: product image (or fallback initials), product name, OEM/spec number, short description, brand pill, and "Enquire" CTA.
- Breadcrumb navigation displays: Home > Categories > {Category Name}.
- Product count is displayed (e.g., "6 products found").
- Category chip row allows quick switching between categories within the same mode.

#### FR-5: Filter and Sort

User can filter products by category, brand, vehicle/application, and other dimensions, and sort by Popular, Name, or OEM Number.

**Consequences (testable):**
- Filter panel opens as a modal overlay with dropdown fields relevant to the active mode.
- Selected filters are displayed as removable chips.
- Sort dropdown changes the product order in the grid.
- Filter and sort controls are touch-friendly on mobile.

#### FR-6: View Mode Toggle

User can switch between grid view and list view for the product listing.

**Consequences (testable):**
- Grid view shows product cards in a 2-column grid (mobile) or wider on desktop.
- List view shows product rows.
- Active view mode is visually indicated.

---

### 4.4 Product Detail Page

**Description:** A dedicated page for a single product, showing full product information, compatibility, technical specs, description, and enquiry actions. Realizes UJ-1, UJ-2.

**Functional Requirements:**

#### FR-7: Product Information Display

User can view complete product details on a dedicated page.

**Consequences (testable):**
- Product image displayed prominently with gallery dots (indicating multiple images capability).
- Product name displayed as the page `<h1>`.
- Stock status pill (e.g., "In Stock", "Ready stock").
- OEM/spec chip (e.g., "OEM: 51712M68K00").
- Brand chip and meta points (e.g., "Enquiry Pricing", "OEM Matching", "Bangalore Supply").
- **Compatible With** section listing compatible vehicles (automobile) or suitable applications (industrial).
- **Technical Specs** section listing specifications.
- **Product Description** section with detailed description text.
- Download PDF action opens a print-friendly, single-page product sheet containing the product image, product details, company information, and contact number.
- Favourite/save button (visual only in v1).
- Back navigation button returning to the parent category page.

#### FR-8: Enquiry Actions

User can initiate contact directly from the product detail page.

**Consequences (testable):**
- Primary CTA: "WhatsApp Enquiry" (or "WhatsApp for Pricing" in industrial mode) opens WhatsApp with pre-filled product details.
- Secondary CTA: "Call Now" (or "Call Supply Desk") initiates a phone call.
- Tertiary action: "Download PDF" opens a single-page printable product summary for sharing or offline reference.
- Note label: "Bulk Orders Welcome" (or "Bulk Supply Available").
- Trust row with 3 trust indicators (e.g., "Genuine Parts / OEM grade", "Fast Dispatch / Across Bangalore", "GST Billing / Tax invoice").

### 4.5 Search by Vehicle / Search by Application Page

**Description:** Automobile mode shows a "Search by Vehicle" page with vehicle segment cards (Tractors, Bus and Trailers, Construction, Three Wheeler, Two Wheeler, Forklift). Industrial mode shows a "Search by Application" page with application cards (Conveyors, Compressors, Hydraulic Power Packs, Packaging Machines, Industrial Pumps, Electrical Panels). Tapping a card opens a detail view with parts list for that vehicle/application. Realizes UJ-3.

**Functional Requirements:**

#### FR-9: Vehicle/Application Type Listing

User can browse vehicle segments or industrial applications to find relevant parts.

**Consequences (testable):**
- Each card shows an icon, title, and short description.
- Automobile mode lists: Tractors, Bus and Trailers, Construction, Three Wheeler, Two Wheeler, Forklift.
- Industrial mode lists: Conveyors, Compressors, Hydraulic Power Packs, Packaging Machines, Industrial Pumps, Electrical Panels.

#### FR-10: Vehicle/Application Detail View

User can see common parts for a specific vehicle type or application.

**Consequences (testable):**
- Detail view shows: back button, kicker label, title, description, parts list (numbered), and a hero vehicle/application image.
- Each part in the list is tappable and navigates to the relevant category page.

---

### 4.6 Brands Page

**Description:** A dedicated page listing all brands/manufacturers stocked by SV Enterprises for the active mode. Realizes UJ-3.

**Functional Requirements:**

#### FR-11: Brand Grid

User can browse all available brands.

**Consequences (testable):**
- Automobile mode lists: Annabond, Ceekay, Delphi, Elofic, Gabriel, Gates, Hella, Hi-Q+, NGK, OSRAM, Varroc, Wurth (and more).
- Industrial mode lists: SKF, NSK, FAG, Fenner, Bonfiglioli, Hindustan, Bosch Rexroth, Janatics, Parker, ABB, Siemens, Wurth (and more).
- Brands displayed in a responsive grid of brand cards.

---

### 4.7 Search Page

**Description:** A dedicated search interface where users can search by OEM number, product code, brand, vehicle model, or category. Includes popular search suggestions, search filter chips, and a results grid. Realizes UJ-1, UJ-2.

**Functional Requirements:**

#### FR-12: Search Input and Suggestions

User can search for products using free-text input.

**Consequences (testable):**
- Search input with relevant placeholder text per mode.
- Popular search suggestion chips displayed below the input.
- Tapping a suggestion chip populates the search input.

#### FR-13: Search Results

User can view search results as a list of product cards.

**Consequences (testable):**
- Results displayed as horizontal product cards with image/icon, product name, meta information, brand, category, price indication, and availability status.
- Filter chips (e.g., "All", "Brake", "Engine", "Suspension") for quick result refinement.
- "See all" link with total count.

---

### 4.8 Contact Page

**Description:** Business contact page with phone, WhatsApp, email, address, working hours, and map placeholder. Realizes all UJs.

**Functional Requirements:**

#### FR-14: Contact Information

User can access all business contact details from a dedicated page.

**Consequences (testable):**
- Business card section showing: business name, subtitle, phone, WhatsApp, email, and address.
- Working hours card.
- Map card with link to Google Maps.
- Content adapts per mode (automobile vs. industrial contact details, address, and hours).

---

### 4.9 Floating WhatsApp Button

**Description:** A persistent floating WhatsApp button in the bottom-right corner of every page for instant contact access.

**Functional Requirements:**

#### FR-15: Floating WhatsApp CTA

A floating WhatsApp button is always visible and accessible.

**Consequences (testable):**
- Green circular button fixed at bottom-right.
- Tapping opens WhatsApp (or the contact page as fallback).
- Button does not obstruct content on mobile.

---

### 4.10 Global Navigation

**Description:** Sticky header with brand logo, desktop navigation pills, mobile hamburger menu with slide-out drawer. Navigation labels adapt per mode.

**Functional Requirements:**

#### FR-16: Responsive Navigation

User can navigate to all main sections from any page.

**Consequences (testable):**
- Desktop: pill-style nav bar with Home, Products, Search by Vehicle, Brands, Contact + "Search Parts" and "Get Quote" buttons.
- Mobile (â‰¤1100px): hamburger menu opens a slide-out drawer with all nav links and a CTA button.
- Active page is visually highlighted in navigation.
- Navigation labels adapt per mode (e.g., "Search by Vehicle" becomes "Search by Application" in industrial mode).

---

### 4.11 SEO Infrastructure

**Description:** Every page must have proper SEO metadata, structured data, and clean URLs to support organic ranking and Google Ads landing pages. Realizes UJ-1, UJ-2.

**Functional Requirements:**

#### FR-17: Dynamic SEO Metadata

Each page dynamically updates its SEO metadata.

**Consequences (testable):**
- `<title>` tag is page-specific (e.g., "Brake Disc Rotor 51712M68K00 | Brake Parts Bangalore | SV Enterprises").
- `<meta name="description">` is page-specific and keyword-rich.
- `<meta name="keywords">` includes relevant terms.
- `<link rel="canonical">` is set per page.
- Open Graph tags (`og:title`, `og:description`, `og:url`) are set per page.

#### FR-18: Structured Data (JSON-LD)

Each page includes structured data for search engine rich results.

**Consequences (testable):**
- `LocalBusiness` schema on every page with name, URL, telephone, address.
- `BreadcrumbList` schema on category and product pages.
- `Product` schema on product detail pages with name, brand, SKU, description, category, URL.
- `ItemList` schema on category pages listing all products.

#### FR-19: SEO-Friendly URL Structure

All pages use clean, readable, SEO-friendly URLs.

**Consequences (testable):**
- Category pages follow the pattern: `/{mode}/{category-slug}/`
  - Examples: `/automobile/brake-parts/`, `/industrial/hydraulic-hoses/`, `/automobile/engine-parts/`
- Product detail pages follow the pattern: `/{mode}/{category-slug}/{product-slug}/`
  - Examples: `/automobile/brake-parts/brake-disc-rotor/`, `/industrial/hydraulic-hoses/skf-6205/`
- URLs are short, lowercase, hyphenated, and human-readable.
- No query parameters in canonical product/category URLs.
- Custom slug overrides are supported for SEO-optimized URLs (e.g., "Hydraulic Parts" category uses slug "hydraulic-hoses" for better keyword targeting).

---

## 5. Non-Goals (Explicit)

- **No e-commerce functionality.** No cart, no checkout, no online payment, no order tracking. Period.
- **No user accounts or login.** No registration, no saved carts, no order history.
- **No pricing display** (except indicative prices on search results for context). Pricing is handled offline.
- **No inventory management.** Stock status is for display purposes only and managed via the product data.
- **No CMS or admin panel in v1.** Product data is managed via code/data files. A CMS is a future consideration.
- **No blog or content marketing section in v1.**
- **No multi-language support in v1.** English only.
- **No dark mode in v1.** The reference design uses a light theme only.

---

## 6. MVP Scope

### 6.1 In Scope

- Complete implementation of all pages defined in the reference HTML: Home, Categories Overview, Category Detail, Product Detail, Search by Vehicle/Application, Brands, Contact, Search.
- Automobile/Industrial mode switch with full content adaptation.
- Mobile-first responsive design matching the reference HTML exactly.
- SEO metadata, structured data, and clean URL routing.
- WhatsApp/Call/Email enquiry CTAs on product pages and contact sections.
- Floating WhatsApp button.
- Hero image slideshow with auto-rotation.
- Brand marquee animation.
- Filter and sort on category pages.
- Breadcrumb navigation on category and product pages.

### 6.2 Out of Scope for MVP

- **CMS or admin panel** â€” product data will be managed as static data/JSON files. [Deferred to v2.]
- **Google Analytics / Tag Manager integration** â€” can be added post-launch. [Deferred to v1.1.]
- **Google Ads conversion tracking** â€” can be added post-launch. [Deferred to v1.1.]
- **Image gallery with swipe on product detail** â€” gallery dots are shown but only a single image per product in v1. [Deferred to v2.]
- **Full-text search with fuzzy matching** â€” search in v1 will be client-side basic matching. [Deferred to v2.]
- **Favourite/save product functionality** â€” the heart button is visual only in v1. [Deferred to v2.]
- **Blog / content pages for SEO.** [Deferred to v2.]
- **Sitemap.xml and robots.txt** â€” should be added before production launch. [Deferred to v1.1.]

---

## 7. Success Metrics

**Primary**
- **SM-1**: Organic search impressions for target keywords (e.g., "automobile spare parts Bangalore", "brake disc Bangalore") reach 1,000/month within 3 months of launch. Validates FR-17, FR-18, FR-19.
- **SM-2**: Website generates â‰¥20 WhatsApp/call enquiries per month from product detail pages within 2 months of launch. Validates FR-8.

**Secondary**
- **SM-3**: Google Ads click-through to product/category landing pages achieves â‰¥3% CTR. Validates FR-19, FR-17.
- **SM-4**: Mobile page load time (Largest Contentful Paint) under 2.5 seconds on 4G. Validates mobile-first design.

**Counter-metrics (do not optimize)**
- **SM-C1**: Bounce rate â€” do not optimize for artificially low bounce. A user who lands on a product page, reads the details, and calls via WhatsApp has completed a successful journey even if it's a single-page session.

---

## 8. Constraints and Guardrails

### 8.1 Design Constraint â€” Reference HTML is Sacred

> **âš ï¸ CRITICAL: The HTML design in `reference/index.html` is the fixed, approved UI/UX specification. It must NOT be changed, redesigned, or deviated from during development.**

- All CSS variables, class names, layout structures, typography, colours, spacing, animations, and responsive breakpoints defined in the reference HTML are the source of truth.
- The component hierarchy (`.site-header`, `.hero`, `.section`, `.card-grid`, `.product-tile`, `.catalog-card`, `.detail-sheet`, etc.) must be preserved exactly.
- Responsive breakpoints at 1100px, 760px, and 430px must be maintained.
- The Barlow and Barlow Condensed font families must be used exactly as specified.

### 8.2 Mobile-First Guardrail

- All development must follow a mobile-first approach.
- The primary target device is a smartphone with a viewport width of 360â€“430px.
- Touch targets must be â‰¥44px as already defined in the reference HTML.
- The website must be fully usable and visually complete on mobile without horizontal scrolling.

### 8.3 SEO-First Guardrail

- Every page must be server-side rendered (SSR) or statically generated (SSG) so that search engine crawlers receive fully rendered HTML.
- No critical content should depend on client-side JavaScript for rendering.
- Category and product pages must have unique, keyword-rich `<title>`, `<meta description>`, and structured data.
- URLs must be clean, short, and SEO-friendly (no hash routing, no query-param-only routing).

### 8.4 No E-commerce Guardrail

- There must be no cart, checkout, payment, or order tracking functionality anywhere in the codebase.
- Product cards and detail pages must NOT display "Add to Cart", "Buy Now", or any purchase-related CTAs.
- The only CTAs are: "Enquire", "WhatsApp Enquiry", "Call Now", and "Get Quote" â€” all of which lead to external communication channels (WhatsApp, phone, email).

---

## 9. Information Architecture

### 9.1 Page Structure

| Page | URL Pattern | SEO Page? |
|---|---|---|
| Homepage | `/` | Yes |
| Categories Overview | `/categories` | Yes |
| Category Detail (Auto) | `/automobile/{category-slug}/` | Yes â€” target category keywords |
| Category Detail (Industrial) | `/industrial/{category-slug}/` | Yes â€” target category keywords |
| Product Detail (Auto) | `/automobile/{category-slug}/{product-slug}/` | Yes â€” target long-tail keywords |
| Product Detail (Industrial) | `/industrial/{category-slug}/{product-slug}/` | Yes â€” target long-tail keywords |
| Search by Vehicle | `/vehicle` | No |
| Vehicle Detail | `/vehicle/{type}` | No |
| Brands | `/brands` | Yes |
| Contact | `/contact` | Yes |
| Search | `/search` | No |

### 9.2 URL Examples

**Automobile:**
- `/automobile/brake-parts/`
- `/automobile/brake-parts/brake-disc-rotor/`
- `/automobile/engine-parts/`
- `/automobile/engine-parts/oil-filter-cartridge/`
- `/automobile/suspension/`
- `/automobile/suspension/shock-absorber/`

**Industrial:**
- `/industrial/bearings/`
- `/industrial/bearings/deep-groove-bearing/` (or `/industrial/bearings/skf-6205/` via slug override)
- `/industrial/hydraulic-hoses/`
- `/industrial/hydraulic-hoses/hydraulic-hose-assembly/`
- `/industrial/motors/`
- `/industrial/pneumatic-parts/`

### 9.3 Slug Rules

- Slugs are generated by lowercasing the name, replacing `&` with "and", replacing non-alphanumeric characters with hyphens, and trimming leading/trailing hyphens.
- Custom slug overrides are supported for SEO optimization (e.g., "Hydraulic Parts" â†’ `hydraulic-hoses`).
- Maximum URL depth: 3 segments after domain (e.g., `/industrial/bearings/skf-6205/`).
- URLs must not exceed ~80 characters total for readability and SEO.

---

## 10. Product Card & Detail Page Data Requirements

Every product displayed on the website must include the following data fields:

| Field | Required | Display Location |
|---|---|---|
| Product Name | âœ… | Card title, detail `<h1>`, SEO title |
| Product Image | âœ… (fallback: initials) | Card visual, detail hero |
| Category | âœ… | Breadcrumb, meta |
| OEM Number / Product Number | âœ… | Card subtitle, detail chip |
| Short Description | âœ… | Card body |
| Full Description | Optional | Detail page section |
| Brand / Manufacturer | âœ… | Card pill, detail chip |
| Compatible Vehicles (Auto) | Optional | Detail "Compatible With" section |
| Compatible Applications (Industrial) | Optional | Detail "Suitable For" section |
| Technical Specs | Optional | Detail "Technical Specs" section |
| Available Sizes | Optional | Detail specs or meta |
| Stock Status | Optional | Detail pill ("In Stock", "Ready stock") |
| Popularity Rank | âœ… | Sort order |

---

## 11. Open Questions

1. **Hosting and deployment target:** Firebase Hosting is referenced in the canonical URL (`new-sv-auto-test.web.app`). Is Firebase the confirmed hosting platform?
2. **Product data management:** For v1, will product data be hardcoded in JSON/JS files (as in the reference HTML) or loaded from an external source like a Google Sheet or Firebase Realtime Database?
3. **WhatsApp integration:** Should the WhatsApp button pre-fill a message with the product name and OEM number, or just open a blank chat?
4. **Google Maps embed:** Should the contact page include an actual Google Maps iframe embed, or remain as a link-only card?
5. **Image assets:** The reference HTML uses placeholder SVGs. When will real product images be available, and what format/size should they be?
6. **Domain name:** What is the final production domain? This affects canonical URLs and structured data.
7. **Google Analytics / Ads:** Should tracking scripts be included in v1 even if conversion events are configured later?

---

## 12. Assumptions Index

- [ASSUMPTION] The reference HTML (`reference/index.html`) is the complete and final UI design. No additional pages or features beyond what it shows are expected for v1.
- [ASSUMPTION] Firebase Hosting is the deployment target based on the canonical URL in the reference HTML.
- [ASSUMPTION] Product data for v1 will be static (hardcoded JSON objects as shown in the reference HTML's JavaScript).
- [ASSUMPTION] The automobile and industrial product catalogs shown in the reference HTML's `siteModes` and `categoryCatalog` objects represent the complete v1 product dataset.
- [ASSUMPTION] Real product images are not available yet. The fallback initial system from the reference HTML will be used until images are provided.
- [ASSUMPTION] The "favourite" heart button on product detail pages is decorative only in v1 â€” no persistence or functionality.
- [ASSUMPTION] WhatsApp enquiry opens a WhatsApp chat with a pre-filled message containing the product name and OEM/spec number.
