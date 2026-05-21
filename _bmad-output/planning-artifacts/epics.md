---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-05-20'
inputDocuments:
  - '_bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - 'reference/index.html'
---

# New SV automobile - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for New SV automobile, decomposing the requirements from the PRD, Architecture, and reference HTML design into implementable stories.

## Requirements Inventory

### Functional Requirements

FR-1: Mode Toggle Switch â€” User can switch between Automobile and Industrial modes via a two-button toggle on the homepage hero section. Visual styling adapts per mode (orange accent for automobile, blue-grey for industrial). Mode selection persists during the session.

FR-2: Homepage Sections â€” Homepage displays Hero Section (title, subtitle, highlights, CTAs, slideshow, brand marquee), Categories Section (scrollable cards), Top Brands Section, Featured Products Section (3 tiles), Advantages Section (4 cards), and Contact Band â€” all driven by the active mode.

FR-3: Category Overview Grid â€” User can view all available categories for the active mode on a dedicated page. Automobile shows 8 categories, Industrial shows 6. Each card links to category detail. Breadcrumb: Home > Categories.

FR-4: Category Product Grid â€” User can view all products listed under a specific category. Each product card shows image/fallback, name, OEM/spec, description, brand pill, and Enquire CTA. Category chip row for quick switching.

FR-5: Filter and Sort â€” User can filter products by category, brand, vehicle/application and sort by Popular, Name, or OEM Number. Filter panel opens as modal overlay. Selected filters shown as removable chips.

FR-6: View Mode Toggle â€” User can switch between grid view and list view for the product listing. Active view mode is visually indicated.

FR-7: Product Information Display â€” User can view complete product details: image with gallery dots, product name as h1, stock status pill, OEM chip, brand chip, meta points, Compatible With section, Technical Specs, Product Description, Download PDF action, favourite button (visual only), back navigation.

FR-8: Enquiry Actions â€” Primary CTA: WhatsApp Enquiry with pre-filled product details. Secondary CTA: Call Now. Tertiary action: Download PDF printable product sheet. Note label: Bulk Orders Welcome. Trust row with 3 trust indicators.

FR-9: Vehicle/Application Type Listing â€” User can browse vehicle segments (6 types) or industrial applications (6 types). Each card shows icon, title, and description.

FR-10: Vehicle/Application Detail View â€” Detail view shows back button, kicker label, title, description, numbered parts list, and hero image. Each part is tappable and navigates to category page.

FR-11: Brand Grid â€” User can browse all available brands for the active mode. Automobile lists 12+ brands, Industrial lists 12+ brands. Responsive grid of brand cards.

FR-12: Search Input and Suggestions â€” User can search using free-text input with mode-specific placeholder. Popular search suggestion chips displayed. Tapping chip populates search input.

FR-13: Search Results â€” Results displayed as horizontal product cards with image, name, meta, brand, category, price indication, and availability. Filter chips for quick refinement. "See all" link with count.

FR-14: Contact Information â€” Business card section with name, phone, WhatsApp, email, address. Working hours card. Map card with Google Maps link. Content adapts per mode.

FR-15: Floating WhatsApp CTA â€” Green circular button fixed at bottom-right on every page. Opens WhatsApp or contact page fallback. Does not obstruct content on mobile.

FR-16: Responsive Navigation â€” Desktop: pill-style nav with all links + CTA buttons. Mobile (â‰¤1100px): hamburger with slide-out drawer. Active page highlighted. Labels adapt per mode.

FR-17: Dynamic SEO Metadata â€” Page-specific title, meta description, meta keywords, canonical URL, and Open Graph tags on every page.

FR-18: Structured Data (JSON-LD) â€” LocalBusiness schema on every page. BreadcrumbList on category/product pages. Product schema on product detail. ItemList on category pages.

FR-19: SEO-Friendly URL Structure â€” Category pages: /{mode}/{category-slug}/. Product pages: /{mode}/{category-slug}/{product-slug}/. Clean, lowercase, hyphenated URLs. Custom slug overrides supported.

### NonFunctional Requirements

NFR-1: Mobile-First Design â€” Primary target viewport 360â€“430px. Touch targets â‰¥44px. No horizontal scrolling. All development must follow mobile-first approach.

NFR-2: Performance â€” Mobile page load time (LCP) under 2.5s on 4G networks.

NFR-3: SEO-First Rendering â€” Every page must be SSR or SSG. No critical content dependent on client-side JavaScript. Unique metadata per page.

NFR-4: Design Fidelity â€” Reference HTML is sacred. All CSS variables, class names, layouts, typography, colours, spacing, animations, and responsive breakpoints (1100px, 760px, 430px) must be preserved exactly.

NFR-5: No E-commerce â€” No cart, checkout, payment, or order tracking. No "Add to Cart" or "Buy Now" CTAs. Only enquiry CTAs.

NFR-6: Typography â€” Barlow and Barlow Condensed font families used exactly as specified in the reference HTML.

NFR-7: URL Constraints â€” Max URL depth of 3 segments. URLs must not exceed ~80 characters. No hash routing, no query-param-only routing.

### Additional Requirements

- AR-1: Starter Template â€” Initialize project with: `npx create-next-app@latest ./ --typescript --eslint --app --no-tailwind --src-dir --turbopack`
- AR-2: JSON Data Layer - Product, category, brand, vehicle, application, and mode data stored in `src/data/catalog.json`. No external database is used.
- AR-3: Mode State Management â€” Hybrid approach: React Context for homepage mode toggle, URL path segment for routed pages.
- AR-4: CSS Extraction â€” Extract 3,200+ lines of CSS from reference HTML into `src/app/globals.css` as a single global stylesheet. Preserve `:root` variables exactly.
- AR-5: Component Boundaries â€” Server Components (default) for pages/layouts. Client Components (`'use client'`) only for interactive elements (ModeToggle, HeroSlideshow, FilterPanel, SearchInput, MobileDrawer, FloatingWhatsApp).
- AR-6: Data Flow - One-directional: `src/data/catalog.json` -> `src/lib/dataUtils.ts` -> `page.tsx` -> components via props. No component writes to data.
- AR-7: Font Loading â€” Use `next/font/google` for Barlow/Barlow Condensed. No external font requests.
- AR-8: Sitemap â€” Use `next-sitemap` to generate `sitemap.xml` and `robots.txt` from day one.
- AR-9: Security Headers â€” HTTP security headers via `next.config.js`.
- AR-10: Vercel Deployment â€” Git integration with auto-deploy on `main` push, preview deployments for PRs.
- AR-11: Monitoring â€” Vercel Analytics for Web Vitals, Google Search Console post-launch.

### UX Design Requirements

No separate UX design document. The reference HTML (`reference/index.html`) serves as the complete UX specification. All UX requirements are captured within the FRs and NFRs above.

### FR Coverage Map

FR-1:  Epic 2 - Mode Toggle Switch
FR-2:  Epic 2 - Homepage Sections
FR-3:  Epic 3 - Category Overview Grid
FR-4:  Epic 3 - Category Product Grid
FR-5:  Epic 3 - Filter and Sort
FR-6:  Epic 3 - View Mode Toggle
FR-7:  Epic 3 - Product Information Display
FR-8:  Epic 3 - Enquiry Actions
FR-9:  Epic 4 - Vehicle/Application Type Listing
FR-10: Epic 4 - Vehicle/Application Detail View
FR-11: Epic 4 - Brand Grid
FR-12: Epic 4 - Search Input and Suggestions
FR-13: Epic 4 - Search Results
FR-14: Epic 5 - Contact Information
FR-15: Epic 1 - Floating WhatsApp CTA
FR-16: Epic 1 - Responsive Navigation
FR-17: Epic 5 - Dynamic SEO Metadata
FR-18: Epic 5 - Structured Data (JSON-LD)
FR-19: Epic 5 - SEO-Friendly URL Structure

## Epic List

### Epic 1: Project Foundation & Design System
Users can view the base website shell with navigation, fonts, and styling that exactly matches the reference design. A working Next.js app deployed on Vercel with the complete CSS design system, TypeScript data models, JSON catalogue data, root layout (Header, Footer, FloatingWhatsApp), and all utility libraries.
**FRs covered:** FR-15, FR-16
**ARs covered:** AR-1, AR-2, AR-3, AR-4, AR-5, AR-6, AR-7, AR-8, AR-9, AR-10, AR-11

### Epic 2: Homepage with Mode Switch
Users can land on the homepage, toggle between Automobile and Industrial modes, and see the full homepage experience â€” hero slideshow, categories strip, featured products, brand marquee, advantages, and contact band â€” all content dynamically switching per mode.
**FRs covered:** FR-1, FR-2
**ARs covered:** AR-3

### Epic 3: Product Catalogue (Categories, Listings, Product Detail)
Users can browse categories, view product listings with filter/sort/view toggle, and drill down to full product detail pages with WhatsApp enquiry and call CTAs â€” the core business conversion flow.
**FRs covered:** FR-3, FR-4, FR-5, FR-6, FR-7, FR-8

### Epic 4: Discovery & Exploration (Vehicle/Application, Brands, Search)
Users can explore products through alternative discovery paths â€” browsing by vehicle type or industrial application, viewing all brands, or searching by OEM number, product name, or brand.
**FRs covered:** FR-9, FR-10, FR-11, FR-12, FR-13

### Epic 5: SEO & Launch Readiness
Every page ranks on Google with proper metadata, structured data, and clean URLs. The website is ready for Google Ads campaigns with contact page, sitemap, and robots.txt.
**FRs covered:** FR-14, FR-17, FR-18, FR-19
**ARs covered:** AR-8

## Epic 1: Project Foundation & Design System

Users can view the base website shell with navigation, fonts, and styling that exactly matches the reference design.

### Story 1.1: Next.js Project Initialization & Configuration

As a **developer**,
I want a properly initialized Next.js 16 project with TypeScript, ESLint, App Router, and all configuration files,
So that the entire team has a consistent, working development foundation.

**Acceptance Criteria:**

**Given** the project directory is empty (except `reference/` and `_bmad-output/`)
**When** `npx create-next-app@latest ./ --typescript --eslint --app --no-tailwind --src-dir --turbopack` is run
**Then** the project initializes with `src/app/` directory structure, `tsconfig.json`, `package.json`, `.gitignore`, and `.eslintrc.json`
**And** `next.config.js` includes security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Content-Security-Policy)
**And** `.env.example` is created only for optional runtime/deployment settings; no database config is required
**And** `next-sitemap` is installed and `next-sitemap.config.js` is created
**And** `@vercel/analytics` is installed
**And** `npm run dev` starts without errors
**And** `npm run build` completes successfully

### Story 1.2: CSS Design System Extraction

As a **developer**,
I want the complete CSS design system extracted from `reference/index.html` into `src/app/globals.css`,
So that all pages render with pixel-perfect design fidelity to the reference.

**Acceptance Criteria:**

**Given** the reference HTML contains 3,200+ lines of CSS in `<style>` tags
**When** all CSS is extracted into `src/app/globals.css`
**Then** all `:root` CSS variables are preserved exactly (colours, spacing, typography, shadows)
**And** all class names are preserved exactly (`.site-header`, `.hero-mode-btn`, `.catalog-card`, `.product-tile`, `.detail-sheet`, etc.)
**And** all responsive breakpoints at 1100px, 760px, and 430px are preserved
**And** all animations and keyframes are preserved
**And** Barlow and Barlow Condensed fonts are loaded via `next/font/google` in root `layout.tsx`
**And** the root layout imports `globals.css`

### Story 1.3: JSON Catalogue & TypeScript Data Types

As a **developer**,
I want TypeScript interfaces and a single JSON catalogue defined in `src/data/`,
So that every component has strongly typed, consistent data to render.

**Acceptance Criteria:**

**Given** the architecture defines the Product, Category, Brand, Vehicle, Application, and Mode interfaces
**When** `src/data/types.ts` is created with all interfaces
**Then** interfaces use `camelCase` field names as per architecture patterns
**And** `src/data/catalog.json` is created as the only editable catalogue data source
**And** `catalog.json.categories` defines all 14 categories (8 automobile + 6 industrial) with slugs
**And** `catalog.json.brands` defines brand lists per mode
**And** `catalog.json.modes` defines mode-specific content (hero, advantages, contact)
**And** `catalog.json.vehicles` defines 6 vehicle types
**And** `catalog.json.applications` defines 6 industrial applications
**And** `catalog.json.products.automobile` contains product data for all 8 automobile categories
**And** `catalog.json.products.industrial` contains product data for all 6 industrial categories
**And** all data matches the content structure from `reference/index.html`'s `siteModes` and `categoryCatalog` objects
**And** no duplicate category/product/brand/mode data is created in separate `.ts` files

### Story 1.4: Utility Libraries

As a **developer**,
I want all utility libraries created in `src/lib/`,
So that page components and components have consistent, reusable helper functions.

**Acceptance Criteria:**

**Given** the architecture defines 5 utility modules
**When** `src/lib/slugUtils.ts` is created
**Then** it exports functions for slug generation, lookup, and custom override support matching PRD Â§9.3 rules
**And** `src/lib/modeUtils.ts` exports functions for mode validation, default mode, and URL extraction
**And** `src/lib/whatsappUtils.ts` exports a function to build WhatsApp deep links with pre-filled product name and OEM number
**And** `src/lib/dataUtils.ts` imports `src/data/catalog.json` and exports query helpers (getProductBySlug, getCategoryProducts, getProductsByMode, filterProducts, sortProducts)
**And** `src/lib/seoHelpers.ts` exports generateMetadata helpers and JSON-LD builders (LocalBusiness, BreadcrumbList, Product, ItemList)
**And** all functions are properly typed with TypeScript

### Story 1.5: Root Layout with Header, Footer & FloatingWhatsApp

As a **site visitor**,
I want to see a sticky header with navigation and a floating WhatsApp button on every page,
So that I can navigate the site and contact the business from anywhere.

**Acceptance Criteria:**

**Given** the user opens any page on the website
**When** the page loads
**Then** a sticky header is displayed with the SV Enterprises logo, desktop navigation pills (Home, Products, Search by Vehicle, Brands, Contact), and "Search Parts" / "Get Quote" CTA buttons (FR-16)
**And** on mobile (â‰¤1100px), the header shows a hamburger icon that opens a slide-out drawer with all nav links (FR-16)
**And** the active page is visually highlighted in navigation
**And** navigation labels adapt per mode (e.g., "Search by Vehicle" â†” "Search by Application")
**And** a footer is displayed at the bottom of every page
**And** a green circular WhatsApp button is fixed at bottom-right that opens WhatsApp on tap (FR-15)
**And** the WhatsApp button does not obstruct content on mobile
**And** `ModeContext` provider wraps the app in the root layout
**And** Vercel Analytics is included in the root layout

### Story 1.6: Vercel Deployment & CI

As a **developer**,
I want the project deployed to Vercel with auto-deploy on push,
So that every commit is automatically built and deployed.

**Acceptance Criteria:**

**Given** the project has a valid `package.json` and `next.config.js`
**When** the repository is connected to Vercel
**Then** pushing to `main` triggers an automatic production deployment
**And** preview deployments are created for pull requests
**And** the deployed site loads without errors
**And** security headers are present in HTTP responses
**And** `npm run build` completes without warnings

## Epic 2: Homepage with Mode Switch

Users can land on the homepage, toggle between Automobile and Industrial modes, and see the full homepage experience â€” hero slideshow, categories strip, featured products, brand marquee, advantages, and contact band.

### Story 2.1: Mode Toggle & Hero Section

As a **site visitor**,
I want to toggle between Automobile and Industrial modes on the homepage and see a dynamic hero section with slideshow,
So that I immediately understand what products SV Enterprises offers in my area of interest.

**Acceptance Criteria:**

**Given** the user loads the homepage (`/`)
**When** the page renders
**Then** the hero section displays with the Automobile mode active by default
**And** a two-button toggle ("Automobile Products" / "Industrial Products") is visible in the hero
**And** the hero shows mode-specific title, subtitle, and 3 highlight points (e.g., "5000+ Parts In Stock")
**And** two CTA buttons are displayed: "Search Parts" and "Browse by Category"
**And** a hero image slideshow auto-rotates with CSS transitions
**And** visual styling uses orange accent for automobile mode

**Given** the user taps "Industrial Products" on the toggle
**When** the mode switches
**Then** the hero title, subtitle, highlights, and CTAs update to industrial content
**And** the visual accent changes to blue-grey
**And** the mode selection persists if the user navigates away and returns to homepage

### Story 2.2: Categories Strip & Top Brands

As a **site visitor**,
I want to see category cards and top brands for my selected mode on the homepage,
So that I can quickly browse product categories or identify trusted brands.

**Acceptance Criteria:**

**Given** the homepage is loaded with Automobile mode active
**When** the user scrolls past the hero section
**Then** a horizontally scrollable strip of category cards is displayed showing automobile categories (Engine Parts, Brake Parts, Suspension, Electrical, Filters, Transmission, Cooling, Body Parts)
**And** each category card shows an image, title, description, and parts count
**And** a "View all" link is visible that navigates to `/categories`
**And** a Top Brands section displays a grid of automobile brand cards

**Given** the user switches to Industrial mode
**When** the homepage sections update
**Then** the category strip shows industrial categories (Bearings, Hydraulic Parts, Motors, Gearboxes, Pneumatic Parts, Seals and Couplings)
**And** the brands section shows industrial brands (SKF, NSK, FAG, Fenner, etc.)

### Story 2.3: Featured Products, Advantages & Contact Band

As a **site visitor**,
I want to see featured products, business advantages, and contact information on the homepage,
So that I can see top-selling items, understand why to choose SV Enterprises, and reach them easily.

**Acceptance Criteria:**

**Given** the homepage is loaded with a mode active
**When** the user scrolls to the lower homepage sections
**Then** a Featured Products section shows 3 product tiles with name, OEM number, brand, and "Enquire" button â€” content matches the active mode
**And** the "Enquire" button on each tile triggers a WhatsApp deep link with the product name and OEM pre-filled

**Given** the user continues scrolling
**When** the Advantages section is visible
**Then** 4 advantage cards are displayed (e.g., "OEM Matching", "Wholesale Supply", "Fast Dispatch", "GST Billing") â€” content adapts per mode

**Given** the user reaches the bottom of the homepage
**When** the Contact Band is visible
**Then** a dark banner displays with a heading, descriptive copy, and contact rows for WhatsApp, Call, and Email â€” content adapts per mode
**And** each contact action is tappable and opens the appropriate external action (WhatsApp link, `tel:`, `mailto:`)

### Story 2.4: Brand Marquee Animation

As a **site visitor**,
I want to see an auto-scrolling brand logo strip in the hero area,
So that I can quickly see the trusted brands SV Enterprises carries.

**Acceptance Criteria:**

**Given** the homepage hero section is displayed
**When** the brand marquee is visible
**Then** brand logos scroll horizontally in a continuous infinite loop animation
**And** the logos match the active mode's brand list
**And** the animation is smooth and does not jank on mobile
**And** the marquee uses CSS-based animation matching the reference HTML's keyframes

## Epic 3: Product Catalogue (Categories, Listings, Product Detail)

Users can browse categories, view product listings with filter/sort/view toggle, and drill down to full product detail pages with WhatsApp enquiry and call CTAs â€” the core business conversion flow.

### Story 3.1: Category Overview Page

As a **site visitor**,
I want to see all available product categories for my selected mode on a dedicated page,
So that I can choose which category of parts to browse.

**Acceptance Criteria:**

**Given** the user navigates to `/categories`
**When** the page loads with Automobile mode active
**Then** a grid of 8 category cards is displayed: Engine Parts, Brake Parts, Suspension, Electrical, Filters, Transmission, Cooling, Body Parts
**And** each card shows a category image, title, description, and parts count
**And** each card links to the corresponding category detail page (e.g., `/automobile/brake-parts/`)
**And** breadcrumb navigation displays: Home > Categories

**Given** the user switches to Industrial mode
**When** the categories page renders
**Then** 6 category cards are displayed: Bearings, Hydraulic Parts, Motors, Gearboxes, Pneumatic Parts, Seals and Couplings
**And** each card links to the corresponding industrial category page (e.g., `/industrial/bearings/`)

**Given** the page is statically generated
**When** search engines crawl `/categories`
**Then** `generateMetadata` provides a page-specific title and description
**And** the page is server-rendered with all category data visible in the HTML source

### Story 3.2: Category Detail Page with Product Listing

As a **site visitor**,
I want to view all products within a specific category displayed as a grid of product cards,
So that I can browse and find the spare part I need.

**Acceptance Criteria:**

**Given** the user navigates to `/automobile/brake-parts/`
**When** the page loads
**Then** a hero banner displays the category title ("Brake Parts") and description
**And** a product count is shown (e.g., "6 products found")
**And** a grid of product cards is displayed, each showing: product image (or fallback initials), product name, OEM/spec number, short description, brand pill, and "Enquire" CTA
**And** a category chip row is visible allowing quick switching between categories within the same mode
**And** breadcrumb navigation displays: Home > Categories > Brake Parts

**Given** the URL uses the `[mode]/[categorySlug]` pattern
**When** `generateStaticParams` runs at build time
**Then** all valid mode + category slug combinations are pre-generated as static pages
**And** navigating to an invalid slug shows the 404 page

### Story 3.3: Filter Panel & Sort Controls

As a **site visitor**,
I want to filter products by brand and vehicle/application type and sort by different criteria,
So that I can quickly narrow down to the exact part I need.

**Acceptance Criteria:**

**Given** the user is on a category detail page (e.g., `/automobile/brake-parts/`)
**When** the user taps the "Filter" button
**Then** a modal overlay opens with dropdown filter fields: Brand, Vehicle Type (automobile) or Application (industrial)
**And** the filter panel is touch-friendly on mobile with touch targets â‰¥44px

**Given** the user selects a filter (e.g., Brand = "Gabriel")
**When** the filter is applied
**Then** the product grid updates to show only matching products
**And** selected filters are displayed as removable chips above the product grid
**And** tapping the "Ã—" on a chip removes that filter and updates the grid

**Given** the user taps the "Sort" dropdown
**When** a sort option is selected (Popular, Name A-Z, OEM Number)
**Then** the product grid reorders according to the selected sort
**And** the active sort option is visually indicated

### Story 3.4: Grid/List View Toggle

As a **site visitor**,
I want to switch between grid and list view for the product listing,
So that I can choose my preferred way to browse products.

**Acceptance Criteria:**

**Given** the user is on a category detail page
**When** the view toggle buttons are visible
**Then** two toggle buttons (grid icon, list icon) are displayed
**And** grid view is active by default, showing product cards in a 2-column grid on mobile

**Given** the user taps the list view toggle
**When** the view switches
**Then** products display as horizontal rows instead of grid cards
**And** the list view toggle button is visually highlighted as active
**And** switching back to grid view restores the 2-column layout

### Story 3.5: Product Detail Page

As a **site visitor**,
I want to view complete details of a specific product on a dedicated page,
So that I can verify it's the right part before making an enquiry.

**Acceptance Criteria:**

**Given** the user navigates to `/automobile/brake-parts/brake-disc-rotor/`
**When** the page loads
**Then** the product image is displayed prominently with gallery dots (visual only in v1, single image)
**And** the product name is displayed as the page `<h1>`
**And** a stock status pill is shown (e.g., "In Stock", "Ready stock")
**And** an OEM/spec chip is displayed (e.g., "OEM: 51712M68K00")
**And** a brand chip and meta points are shown (e.g., "Enquiry Pricing", "OEM Matching", "Bangalore Supply")
**And** a "Compatible With" section lists compatible vehicles (automobile) or "Suitable For" lists applications (industrial)
**And** a "Technical Specs" section lists specifications in a table format
**And** a "Product Description" section shows detailed description text
**And** a favourite/save heart button is visible (visual only, no functionality in v1)
**And** a back navigation button returns to the parent category page
**And** breadcrumb navigation displays: Home > Categories > Brake Parts > Brake Disc Rotor

**Given** the URL uses the `[mode]/[categorySlug]/[productSlug]` pattern
**When** `generateStaticParams` runs at build time
**Then** all valid mode + category + product slug combinations are pre-generated
**And** navigating to an invalid product slug shows the 404 page

### Story 3.6: Enquiry Actions & Trust Row

As a **site visitor**,
I want to send a WhatsApp enquiry or call directly from the product detail page,
So that I can quickly ask about price and availability without leaving the product page.

**Acceptance Criteria:**

**Given** the user is on a product detail page in automobile mode
**When** the enquiry section is visible
**Then** a primary CTA button "WhatsApp Enquiry" is displayed
**And** tapping it opens WhatsApp with a pre-filled message containing the product name and OEM number
**And** a secondary CTA button "Call Now" is displayed that initiates a phone call via `tel:` link
**And** a note label shows "Bulk Orders Welcome"
**And** a trust row displays 3 trust indicators: "Genuine Parts / OEM grade", "Fast Dispatch / Across Bangalore", "GST Billing / Tax invoice"

**Given** the user is on a product detail page in industrial mode
**When** the enquiry section is visible
**Then** the primary CTA reads "WhatsApp for Pricing"
**And** the secondary CTA reads "Call Supply Desk"
**And** the note label reads "Bulk Supply Available"
**And** the trust indicators adapt to industrial context

## Epic 4: Discovery & Exploration (Vehicle/Application, Brands, Search)

Users can explore products through alternative discovery paths â€” browsing by vehicle type or industrial application, viewing all brands, or searching by OEM number, product name, or brand.

### Story 4.1: Vehicle/Application Type Listing Page

As a **site visitor**,
I want to browse vehicle segments or industrial applications on a dedicated page,
So that I can find parts relevant to my specific vehicle or machinery type.

**Acceptance Criteria:**

**Given** the user navigates to `/vehicle` in Automobile mode
**When** the page loads
**Then** 6 vehicle type cards are displayed: Tractors, Bus and Trailers, Construction, Three Wheeler, Two Wheeler, Forklift
**And** each card shows an icon, title, and short description
**And** each card links to a vehicle detail page (e.g., `/vehicle/tractors`)

**Given** the user navigates to `/vehicle` in Industrial mode
**When** the page loads
**Then** 6 application type cards are displayed: Conveyors, Compressors, Hydraulic Power Packs, Packaging Machines, Industrial Pumps, Electrical Panels
**And** the page title adapts to "Search by Application"
**And** each card links to an application detail page (e.g., `/vehicle/conveyors`)

### Story 4.2: Vehicle/Application Detail Page

As a **site visitor**,
I want to see common parts for a specific vehicle type or application,
So that I can discover which spare parts are relevant to my equipment.

**Acceptance Criteria:**

**Given** the user navigates to `/vehicle/tractors`
**When** the page loads
**Then** a back button is visible that returns to the vehicle listing page
**And** a kicker label is displayed (e.g., "Vehicle Type")
**And** the vehicle title (e.g., "Tractors") and description are shown
**And** a numbered parts list is displayed showing common parts for tractors
**And** each part in the list is tappable and navigates to the relevant category page
**And** a hero vehicle/application image is displayed

**Given** the URL uses the `[type]` pattern
**When** `generateStaticParams` runs at build time
**Then** all valid vehicle/application type slugs are pre-generated
**And** navigating to an invalid type slug shows the 404 page

### Story 4.3: Brands Page

As a **site visitor**,
I want to browse all brands/manufacturers that SV Enterprises stocks,
So that I can verify they carry my preferred brand.

**Acceptance Criteria:**

**Given** the user navigates to `/brands`
**When** the page loads with Automobile mode active
**Then** a responsive grid of brand cards is displayed showing automobile brands: Annabond, Ceekay, Delphi, Elofic, Gabriel, Gates, Hella, Hi-Q+, NGK, OSRAM, Varroc, Wurth (and others)
**And** each brand card displays the brand name/logo

**Given** the user is in Industrial mode
**When** the brands page renders
**Then** the grid shows industrial brands: SKF, NSK, FAG, Fenner, Bonfiglioli, Hindustan, Bosch Rexroth, Janatics, Parker, ABB, Siemens, Wurth (and others)

**Given** the page is statically generated
**When** search engines crawl `/brands`
**Then** `generateMetadata` provides a page-specific title and description

### Story 4.4: Search Input & Suggestions

As a **site visitor**,
I want to search for products using a text input with popular suggestions,
So that I can quickly find a specific part by OEM number, name, or brand.

**Acceptance Criteria:**

**Given** the user navigates to `/search`
**When** the page loads
**Then** a search input field is displayed with a mode-specific placeholder
**And** popular search suggestion chips are displayed below the input
**And** tapping a suggestion chip populates the search input with that text and triggers search

**Given** the user types a query in the search input
**When** at least 2 characters are entered
**Then** the search executes client-side against all products in the active mode
**And** matching is case-insensitive substring matching on product name, OEM number, brand, and category

### Story 4.5: Search Results Display

As a **site visitor**,
I want to see search results as product cards with filter chips,
So that I can review matching products and refine my search.

**Acceptance Criteria:**

**Given** the user has entered a search query that matches products
**When** results are displayed
**Then** each result is shown as a horizontal product card with: image/icon, product name, meta information, brand, category, and availability status
**And** filter chips are displayed above results for quick category refinement
**And** a "See all" link with total result count is shown
**And** tapping a result card navigates to the product detail page

**Given** the user enters a query that matches no products
**When** results are displayed
**Then** an empty state message is shown (e.g., "No products found for your search")
**And** popular search suggestions are displayed as alternatives

## Epic 5: SEO & Launch Readiness

Every page ranks on Google with proper metadata, structured data, and clean URLs. The website is ready for Google Ads campaigns with contact page, sitemap, and robots.txt.

### Story 5.1: Contact Page

As a **site visitor**,
I want to view all business contact details on a dedicated page,
So that I can call, WhatsApp, email, or visit SV Enterprises directly.

**Acceptance Criteria:**

**Given** the user navigates to `/contact`
**When** the page loads
**Then** a business card section displays: business name, subtitle, phone number, WhatsApp number, email address, and physical address
**And** phone number is a tappable `tel:` link
**And** WhatsApp number is a tappable link that opens WhatsApp
**And** email is a tappable `mailto:` link
**And** a working hours card displays business hours
**And** a map card is displayed with a link to Google Maps
**And** content adapts per mode (automobile vs. industrial contact details, address, and hours)

**Given** the page is statically generated
**When** search engines crawl `/contact`
**Then** `generateMetadata` provides a contact-specific title and description

### Story 5.2: Dynamic SEO Metadata on All Pages

As a **search engine crawler**,
I want every page to have unique, keyword-rich metadata,
So that SV Enterprises pages rank well for target search terms.

**Acceptance Criteria:**

**Given** any page on the website is loaded
**When** the HTML source is inspected
**Then** a page-specific `<title>` tag is present (e.g., "Brake Disc Rotor 51712M68K00 | Brake Parts Bangalore | SV Enterprises")
**And** a page-specific `<meta name="description">` is present with keyword-rich content
**And** a `<meta name="keywords">` tag includes relevant terms
**And** a `<link rel="canonical">` tag is set with the correct canonical URL
**And** Open Graph tags (`og:title`, `og:description`, `og:url`) are set per page

**Given** `generateMetadata` is implemented in every `page.tsx`
**When** the build runs
**Then** every statically generated page has unique metadata in the HTML output
**And** no two pages share the same `<title>` or `<meta description>`

### Story 5.3: Structured Data (JSON-LD)

As a **search engine crawler**,
I want structured data on every page for rich results,
So that SV Enterprises product pages can appear with enhanced listings in Google Search.

**Acceptance Criteria:**

**Given** any page on the website is loaded
**When** the HTML source is inspected
**Then** a `LocalBusiness` JSON-LD schema is present with: name, URL, telephone, address (SV Enterprises, Bangalore)

**Given** a category page is loaded (e.g., `/automobile/brake-parts/`)
**When** the HTML source is inspected
**Then** a `BreadcrumbList` JSON-LD schema is present with correct hierarchy
**And** an `ItemList` JSON-LD schema lists all products in the category

**Given** a product detail page is loaded (e.g., `/automobile/brake-parts/brake-disc-rotor/`)
**When** the HTML source is inspected
**Then** a `Product` JSON-LD schema is present with: name, brand, SKU (OEM number), description, category, and URL
**And** a `BreadcrumbList` JSON-LD schema shows the full breadcrumb path

**Given** the structured data is validated
**When** Google's Rich Results Test or Schema Markup Validator is used
**Then** all JSON-LD schemas pass validation with no errors

### Story 5.4: Sitemap, Robots.txt & 404 Page

As a **search engine crawler**,
I want a sitemap.xml, robots.txt, and proper 404 handling,
So that all pages are discoverable and crawl budget is used efficiently.

**Acceptance Criteria:**

**Given** the production build completes
**When** `next-sitemap` runs in the post-build step
**Then** a `sitemap.xml` is generated at `/sitemap.xml` listing all statically generated pages
**And** a `robots.txt` is generated at `/robots.txt` with appropriate directives
**And** the sitemap includes all category and product detail URLs

**Given** a user navigates to a URL that doesn't exist (e.g., `/automobile/invalid-slug/`)
**When** the page loads
**Then** a custom 404 page is displayed with helpful navigation options
**And** the HTTP response code is 404
**And** the 404 page uses the same layout (header, footer, WhatsApp button)

**Given** all SEO-critical URLs from PRD Â§9.1 are checked
**When** the URL patterns are verified
**Then** all URLs are clean, lowercase, hyphenated, and human-readable
**And** no URLs use query parameters for canonical content
**And** maximum URL depth is 3 segments after domain
**And** all custom slug overrides work correctly (e.g., "Hydraulic Parts" â†’ `/industrial/hydraulic-hoses/`)
