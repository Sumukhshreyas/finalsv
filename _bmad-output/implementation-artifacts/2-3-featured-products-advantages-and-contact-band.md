# Story 2.3: Featured Products, Advantages & Contact Band

Status: review

## Story

As a site visitor,
I want to see featured products, business advantages, and contact information on the homepage,
so that I can see top-selling items, understand why to choose SV Enterprises, and reach them easily.

## Acceptance Criteria

1. Given the homepage is loaded with a mode active, when the user scrolls below categories and brands, then a Featured Products section displays 3 product tiles for the active mode.
2. Each featured product tile shows product name, OEM/spec number, brand, image/fallback code, and an "Enquire" button.
3. Each featured product tile links to the corresponding product detail URL using the planned pattern `/{mode}/{categorySlug}/{productSlug}/`.
4. The "Enquire" button on each tile opens a WhatsApp deep link with product name and OEM/spec number pre-filled.
5. Automobile mode featured products use the reference set: Brake Disc Rotor, O2 Sensor, and Shock Absorber.
6. Industrial mode featured products use the reference set: Deep Groove Bearing, 3 Phase Electric Motor, and Hydraulic Hose Assembly.
7. Given the Advantages section is visible, then 4 advantage cards are displayed and content adapts per mode.
8. Automobile advantages include OEM Matching, Wholesale Supply, Same Day Response, and Bangalore Pickup.
9. Industrial advantages include Application Support, Bulk and Repeat Supply, Specification Matching, and Ready Dispatch Options.
10. Given the Contact Band is visible, then a dark banner displays a mode-specific heading, descriptive copy, and contact rows for WhatsApp, Call, and Email.
11. Contact rows are tappable and open the appropriate external actions: WhatsApp deep link, `tel:`, and `mailto:`.
12. The sections update from the active mode without a full page reload.
13. The implementation preserves the reference class names and responsive behavior from `src/app/globals.css`.
14. `npm run lint` and `npm run build` pass after implementation.

## Tasks / Subtasks

- [x] Add Featured Products section. (AC: 1, 2, 3, 4, 5, 6, 12, 13)
  - [x] Create `src/components/home/FeaturedProducts.tsx`.
  - [x] Render the reference section structure after categories/brands in the existing homepage composition.
  - [x] Use reference classes including `.section`, `.section-head`, `.kicker`, `.section-title`, `.product-strip`, `.product-tile`, `.product-img`, `.product-body`, `.meta`, `.brand-text`, and `.mini-btn`.
  - [x] Resolve each featured product reference from `catalog.json.modes[mode].home.featured` to the real product in `catalog.json.products`.
  - [x] Use `dataUtils.ts` and slug utilities from Story 1.4; do not duplicate featured product data in components.
  - [x] Link the tile body to the future product detail URL.
  - [x] Ensure clicking/tapping the "Enquire" action opens WhatsApp and does not accidentally navigate first.
- [x] Add Advantages section. (AC: 7, 8, 9, 12, 13)
  - [x] Create `src/components/home/AdvantagesSection.tsx`.
  - [x] Render 4 mode-specific advantage cards from `catalog.json.modes[mode].home.advantages`.
  - [x] Use reference classes including `.advantage-grid` and `.brand-card`.
  - [x] Use mode-specific labels from `advantageKicker` and `advantageTitle`.
- [x] Add Contact Band section. (AC: 10, 11, 12, 13)
  - [x] Create `src/components/home/ContactBand.tsx`.
  - [x] Render the reference `.section.compact`, `.contact-band`, `.contact-band-grid`, `.contact-list`, `.biz-row`, and `.cat-icon` structure.
  - [x] Use mode-specific `contactTitle`, `contactCopy`, and `contactList` from `catalog.json.modes`.
  - [x] Convert WhatsApp row to a `wa.me` link using `whatsappUtils.ts`.
  - [x] Convert Call row to `tel:` and Email row to `mailto:`.
  - [x] Keep contact actions as outbound links only; do not add forms or API writes.
- [x] Reuse active homepage mode. (AC: 12)
  - [x] Use the same `ModeContext`/mode state established by Story 2.1 and reused by Story 2.2.
  - [x] Do not create a new local mode state for featured/advantages/contact sections.
  - [x] Ensure toggling mode in the hero updates all three sections in the same render cycle.
- [x] Preserve story boundaries. (AC: 1-14)
  - [x] Do not implement Brand Marquee; that is Story 2.4.
  - [x] Do not implement product detail page behavior beyond final URL links.
  - [x] Do not implement category overview, product listing, filters, search results, or contact page.
  - [x] Do not add Firebase, database, CMS, auth, cart, checkout, payment, or order behavior.
- [x] Validate homepage lower sections. (AC: 1-14)
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Manually inspect `/` at mobile width around 360-430px and desktop width.
  - [x] Confirm featured product tiles, advantages, and contact rows update when mode changes.
  - [x] Confirm WhatsApp, phone, and email actions produce correct external links.

## Dev Notes

### Dependencies And Ordering

- Story 2.1 should be implemented first because it establishes the homepage mode toggle and mode state.
- Story 2.2 should be implemented first because this story places sections after categories and brands.
- Story 1.3 and Story 1.4 must be implemented before this story if they are not already done. This story must not create temporary product, advantage, or contact data in components.
- Story 1.5 may provide `ModeContext`; otherwise use the compatible context established by Story 2.1.

### Current Project State

- Sprint status currently has Stories 2.1 and 2.2 as `ready-for-dev`, not necessarily implemented.
- The current source tree may still contain only the starter `src/app/page.tsx` unless earlier stories have been developed.
- `src/app/globals.css` contains the reference CSS classes for featured product tiles, advantage cards, and the contact band.
- `src/app/page.module.css` is starter CSS and must not be used for homepage sections.

### Reference Implementation Details

Use `reference/index.html` as the markup and behavior reference:

- Featured section starts near `home-featured-title` and renders into `home-featured-grid`.
- `renderHomeFeatured(items)` resolves each `{ category, product, code }` item through `findProduct`.
- Product tiles use `.product-tile`, `.product-img`, `.product-body`, `.meta`, `.brand-text`, and `.mini-btn`.
- Advantages section starts near `home-advantage-kicker` and renders into `home-advantage-grid`.
- Contact band starts near `home-contact-title` and renders `home-contact-list`.
- `renderHomeSupplementarySections()` updates advantage labels, contact copy, advantage cards, and contact rows when mode changes.

### Data Requirements

Data must come from the JSON source of truth:

- Featured products: `catalog.json.modes[mode].home.featured`
- Product details: `catalog.json.products[mode]`
- Advantages: `catalog.json.modes[mode].home.advantages`
- Contact band: `catalog.json.modes[mode].home.contactTitle`, `contactCopy`, and `contactList`

Expected automobile content:

- Featured: Brake Disc Rotor, O2 Sensor, Shock Absorber
- Advantages: OEM Matching, Wholesale Supply, Same Day Response, Bangalore Pickup
- Contact rows: WhatsApp `+91 98765 43210`, Call `+91 80 2345 6789`, Email `info@sventerprises.in`

Expected industrial content:

- Featured: Deep Groove Bearing, 3 Phase Electric Motor, Hydraulic Hose Assembly
- Advantages: Application Support, Bulk and Repeat Supply, Specification Matching, Ready Dispatch Options
- Contact rows: WhatsApp `+91 98765 43210`, Call `+91 80 2345 6789`, Email `industrial@sventerprises.in`

### WhatsApp Link Requirements

- Use `src/lib/whatsappUtils.ts` from Story 1.4.
- Featured product enquiry messages must include at minimum product name and OEM/spec number.
- Contact band WhatsApp can use a general homepage enquiry message with active mode context.
- URL-encode all WhatsApp message text.
- Do not treat enquiry as an order. No cart, checkout, payment, or database write.

### Component Boundary Guidance

- `FeaturedProducts` can be a Client Component if it consumes active mode or handles nested WhatsApp click behavior.
- `AdvantagesSection` can be a Server Component if it receives mode/content props, or Client Component if consuming mode context directly.
- `ContactBand` can be a Server Component if it receives props, or Client Component if consuming mode context directly.
- Prefer one homepage client wrapper that reads active mode and passes mode-specific data down.

### Architecture Guardrails

- JSON remains the data source of truth. Do not create `featuredProducts.ts`, `advantages.ts`, `contactData.ts`, or component-local data arrays.
- Do not import raw `catalog.json` directly in components if `dataUtils.ts` exists; use the utility layer.
- Preserve reference class names and CSS variables exactly.
- Do not replace the reference CSS with Tailwind, CSS Modules, or a UI library.
- Links may point to planned routes implemented later, but they must use the final URL pattern.
- No Firebase, Firestore, Firebase Storage, Prisma, CMS, API data routes, auth, cart, checkout, payment, order, or form-submission functionality.

### Testing / Verification

Run:

```bash
npm run lint
npm run build
```

Manual verification:

- `/` shows 3 Automobile featured products by default.
- Automobile advantages and contact copy match the reference.
- Industrial mode shows 3 industrial featured products, industrial advantages, and `industrial@sventerprises.in`.
- Product tile links use `/{mode}/{categorySlug}/{productSlug}/`.
- "Enquire" opens WhatsApp with product name and OEM/spec value.
- Contact rows open WhatsApp, phone, and email actions.
- Mobile widths 360-430px do not show horizontal scrolling or overlapping contact rows.

## Project Structure Notes

Expected files created or modified:

```text
src/app/page.tsx
src/components/home/FeaturedProducts.tsx
src/components/home/AdvantagesSection.tsx
src/components/home/ContactBand.tsx
_bmad-output/implementation-artifacts/2-3-featured-products-advantages-and-contact-band.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

Expected prerequisite files:

```text
src/data/catalog.json
src/data/types.ts
src/lib/dataUtils.ts
src/lib/slugUtils.ts
src/lib/whatsappUtils.ts
src/context/ModeContext.tsx
src/components/home/HeroSection.tsx
src/components/home/CategoryStrip.tsx
src/components/home/TopBrands.tsx
```

Do not create:

```text
src/data/featuredProducts.ts
src/data/advantages.ts
src/data/contactData.ts
src/components/home/homeData.ts
```

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 2.3]
- [Source: _bmad-output/planning-artifacts/architecture.md - Component Organization, Data Flow, Utility Layer, Security Architecture]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - FR-2 Featured Products, Advantages, Contact Band]
- [Source: reference/index.html - featured products, advantages, contact band markup, `renderHomeFeatured`, and `renderHomeSupplementarySections`]
- [Source: _bmad-output/implementation-artifacts/2-1-mode-toggle-and-hero-section.md - homepage mode state prerequisite]
- [Source: _bmad-output/implementation-artifacts/2-2-categories-strip-and-top-brands.md - homepage section ordering prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-3-json-catalogue-and-typescript-data-types.md - mode/product/contact data prerequisite]
- [Source: _bmad-output/implementation-artifacts/1-4-utility-libraries.md - data, slug, and WhatsApp utility prerequisite]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Read local Next.js 16 App Router docs for pages, links, and server/client boundaries before editing.
- `npm run lint` passed.
- `npm run build` passed.
- Verified the live homepage at `http://localhost:3000` with headless Edge screenshots at mobile and desktop widths.

### Completion Notes List

- Story context created from Epic 2 requirements, PRD FR-2, architecture data-flow rules, reference featured/advantage/contact implementation, and Stories 2.1/2.2 dependencies.
- Story reviewed for common implementation traps: duplicate homepage data, unresolved featured product references, WhatsApp message omissions, nested link/button behavior, contact actions becoming forms/API writes, and scope creep into Brand Marquee or product detail pages.
- Added mode-aware featured products, advantages, and contact band sections to the homepage composition.
- Reused the existing `ModeContext` so the hero toggle updates all three sections without a page reload.
- Wired featured product links to the planned product detail route pattern and the enquiry actions to WhatsApp deep links using the data utility layer.
- Verified mobile and desktop layouts with tall headless Edge screenshots to confirm the lower homepage sections render cleanly and stay responsive.

### File List

- `_bmad-output/implementation-artifacts/2-3-featured-products-advantages-and-contact-band.md`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/components/home/AdvantagesSection.tsx`
- `src/components/home/ContactBand.tsx`
- `src/components/home/FeaturedProducts.tsx`

### Change Log

- 2026-05-21: Implemented Story 2.3 featured products, advantages, and contact band sections; validated with lint, build, and responsive screenshot checks.
