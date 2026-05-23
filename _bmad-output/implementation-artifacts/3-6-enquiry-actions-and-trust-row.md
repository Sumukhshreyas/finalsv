# Story 3.6: Enquiry Actions and Trust Row

## Status

review

## Story

As a site visitor, I want to send a WhatsApp enquiry or call directly from the product detail page, so that I can quickly ask about price and availability without leaving the product page.

## Acceptance Criteria

1. On automobile product detail pages, a primary CTA button reads `WhatsApp Enquiry`.
2. Tapping the automobile WhatsApp CTA opens WhatsApp with a pre-filled message containing the product name and OEM/spec number.
3. On automobile product detail pages, a secondary CTA button reads `Call Now` and uses a `tel:` link.
4. On automobile product detail pages, a note label reads `Bulk Orders Welcome`.
5. On automobile product detail pages, the trust row displays:
   - `Genuine Parts / OEM grade`
   - `Fast Dispatch / Across Bangalore`
   - `GST Billing / Tax invoice`
6. On industrial product detail pages, the primary CTA reads `WhatsApp for Pricing`.
7. On industrial product detail pages, the secondary CTA reads `Call Supply Desk`.
8. On industrial product detail pages, the note label reads `Bulk Supply Available`.
9. Industrial trust indicators adapt to industrial context while preserving three trust items.
10. A `Download PDF` action is available on the product detail page and opens a print-friendly single-page product summary with image, product details, company info, and contact number.
11. All enquiry, call, and PDF actions are outbound or client-side only; no enquiry data is stored.
12. No Firebase, Firestore, external database, API persistence, forms backend, cart, checkout, login, or payment behavior is introduced.
13. The implementation passes the project lint and production build commands.

## Tasks / Subtasks

- [x] Add enquiry action components to product detail.
  - [x] Add `src/components/product/EnquiryActions.tsx`.
  - [x] Add `src/components/product/TrustRow.tsx`.
  - [x] Integrate them into the product detail layout from Story 3.5.
- [x] Implement WhatsApp deep links.
  - [x] Use `src/lib/whatsappUtils.ts` from Story 1.4.
  - [x] Include product name and OEM/spec number in the pre-filled message.
  - [x] Include mode/category context where utility support exists.
  - [x] URL-encode the message correctly.
- [x] Implement call links.
  - [x] Use the configured business phone number from catalog/config data if available.
  - [x] Render `tel:` links for both automobile and industrial variants.
  - [x] Do not create API routes, forms, or database writes.
- [x] Implement mode-specific labels.
  - [x] Automobile: `WhatsApp Enquiry`, `Call Now`, `Bulk Orders Welcome`.
  - [x] Industrial: `WhatsApp for Pricing`, `Call Supply Desk`, `Bulk Supply Available`.
  - [x] Derive mode from the product detail URL segment.
- [x] Implement trust row.
  - [x] Render exactly three trust indicators.
  - [x] Use automobile trust copy required by the acceptance criteria.
  - [x] Use industrial trust copy from JSON data or mode-specific config if available.
  - [x] Preserve reference visual style and responsive behavior.
- [x] Validate.
  - [x] Confirm automobile product detail CTAs and trust text.
  - [x] Confirm industrial product detail CTAs and trust text.
  - [x] Confirm WhatsApp message includes product name and OEM/spec number.
  - [x] Confirm phone links use `tel:`.
  - [x] Run lint and production build.

## Dev Notes

### Source of Truth

- Product name, OEM/spec number, mode, and trust content must come from JSON catalog/config data or existing utilities.
- Do not store enquiry submissions anywhere.
- Do not add Firebase, Firestore, database SDKs, API routes, or form persistence.

### Architecture Requirements

- Product detail route remains `src/app/[mode]/[categorySlug]/[productSlug]/page.tsx`.
- Mode is URL-derived on routed pages.
- WhatsApp, phone, email, and Google Maps are outbound links only.
- `whatsappUtils.ts` is the expected place for message/link construction.

### Expected Utility Surface

- `buildWhatsAppLink(...)` or equivalent helper from `src/lib/whatsappUtils.ts`.
- Product data from `getProductBySlug(mode, categorySlug, productSlug)`.
- Mode validation from `modeUtils.ts` if available.

### Reference Implementation Pointers

- `reference/index.html` includes the detail trust row near `detail-trust-row`.
- Relevant classes include `.detail-trust-row`, `.detail-trust-item`, and product detail CTA classes around the detail page markup.
- Reference mode data includes separate detail/trust copy for automobile and industrial contexts.

### Scope Boundaries

- This story enhances the product detail page from Story 3.5.
- This story does not implement product detail routing or core detail layout if Story 3.5 is not yet present; create only the minimal integration needed once that page exists.
- This story does not add a contact form, quote form backend, order flow, cart, checkout, payment, login, or saved enquiry state.
- This story does not persist favourite/save actions.

## Testing

- Browser test one automobile product detail route and one industrial product detail route.
- Inspect generated WhatsApp URLs for encoded product name and OEM/spec number.
- Verify CTA labels and trust row copy match the active mode.
- Verify there are no network writes or API calls on CTA render.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes

- Reviewed against Epic 3.6 acceptance criteria, architecture outbound-link security rules, and JSON-only storage constraints.
- Ready for development after Story 3.5 product detail page exists.

## Dev Agent Record

### Debug Log

- Added `EnquiryActions` and `TrustRow` product detail components.
- Reused `buildProductWhatsAppUrl` and the catalog contact number for outbound enquiry links.
- Kept all actions link-only with no persisted enquiry state.
- Verified the new markup on automobile and industrial product detail pages.

### Completion Notes

- Automobile detail pages now render `WhatsApp Enquiry`, `Call Now`, and `Bulk Orders Welcome`.
- Industrial detail pages now render `WhatsApp for Pricing`, `Call Supply Desk`, and `Bulk Supply Available`.
- WhatsApp links include the product name, OEM/spec number, category, and mode in the encoded message.
- Trust rows render exactly three items per mode.
- Validation passed with `npm run lint` and `npm run build`.

## File List

- `src/components/product/EnquiryActions.tsx`
- `src/components/product/TrustRow.tsx`
- `src/components/product/ProductDetail.tsx`
- `src/app/globals.css`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/sitemap-0.xml`

## Change Log

- 2026-05-21: Implemented outbound enquiry CTAs and mode-aware trust rows for product detail pages, then validated with lint, build, and live route checks.
