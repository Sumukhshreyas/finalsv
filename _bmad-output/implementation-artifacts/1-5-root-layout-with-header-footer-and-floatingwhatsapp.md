# Story 1.5: Root Layout with Header, Footer & FloatingWhatsApp

Status: ready-for-dev

## Story

As a site visitor,
I want to see a sticky header with navigation and a floating WhatsApp button on every page,
so that I can navigate the site and contact the business from anywhere.

## Acceptance Criteria

1. Given the user opens any page on the website, when the page loads, then a sticky header is displayed with the SV Enterprises logo, desktop navigation pills (Home, Products, Search by Vehicle, Brands, Contact), and "Search Parts" / "Get Quote" CTA buttons.
2. On mobile (`<=1100px`), the header shows a hamburger icon that opens a slide-out drawer with all nav links.
3. The active page is visually highlighted in navigation.
4. Navigation labels adapt per mode, including "Search by Vehicle" for automobile and "Search by Application" for industrial.
5. A footer is displayed at the bottom of every page.
6. A green circular WhatsApp button is fixed at bottom-right and opens WhatsApp on tap.
7. The WhatsApp button does not obstruct content on mobile.
8. `ModeContext` provider wraps the app in the root layout.
9. Vercel Analytics is included in the root layout.
10. `npm run lint` and `npm run build` pass after implementation.

## Tasks / Subtasks

- [ ] Create layout component structure. (AC: 1, 2, 5, 6)
  - [ ] Create `src/components/layout/Header.tsx`.
  - [ ] Create `src/components/layout/MobileDrawer.tsx`.
  - [ ] Create `src/components/layout/Footer.tsx`.
  - [ ] Create `src/components/layout/FloatingWhatsApp.tsx`.
  - [ ] Use existing reference CSS class names such as `.site-header`, `.mobile-drawer`, `.whatsapp-float`, and footer classes where present.
- [ ] Create mode context provider. (AC: 4, 8)
  - [ ] Create `src/context/ModeContext.tsx`.
  - [ ] Default mode to `automobile`.
  - [ ] Provide mode and setter for homepage/global UI labels.
  - [ ] Keep routed-page URL-derived mode behavior for future stories; do not make Context the sole source of truth for SEO routes.
- [ ] Wire root layout. (AC: 5, 8, 9)
  - [ ] Wrap the app in `ModeContext` provider in `src/app/layout.tsx`.
  - [ ] Render `Header`, `Footer`, and `FloatingWhatsApp` around `{children}`.
  - [ ] Add Vercel Analytics from `@vercel/analytics/next`.
  - [ ] Preserve existing Barlow font loading and `globals.css` import from Story 1.2.
- [ ] Implement navigation behavior. (AC: 1, 2, 3, 4)
  - [ ] Desktop nav includes Home, Products, Search by Vehicle/Application, Brands, Contact.
  - [ ] CTA buttons include Search Parts and Get Quote.
  - [ ] Mobile hamburger opens/closes the drawer.
  - [ ] Active page highlighting works based on current pathname.
  - [ ] Labels adapt from current mode.
- [ ] Implement WhatsApp behavior. (AC: 6, 7)
  - [ ] Use `whatsappUtils.ts` from Story 1.4 if available.
  - [ ] If Story 1.4 is not implemented, use a small local link construction only if necessary and mark it for replacement by `whatsappUtils.ts`.
  - [ ] Do not add API endpoints, forms, database writes, cart, checkout, or order behavior.
- [ ] Validate layout foundation. (AC: 1-10)
  - [ ] Run `npm run lint`.
  - [ ] Run `npm run build`.
  - [ ] Manually check that root pages render with header, footer, and floating WhatsApp present.

## Dev Notes

### Dependencies

- Story 1.2 should already be complete because this story relies on reference CSS class names in `src/app/globals.css`.
- Story 1.3 and Story 1.4 are currently ready-for-dev and may not yet be implemented. If they are not implemented, avoid hard dependency on catalogue data utilities. Use minimal static labels/contact values from the reference and keep the integration boundary clear for later replacement.
- When Story 1.4 exists, prefer `modeUtils.ts` and `whatsappUtils.ts` instead of duplicating logic.

### Current Project State

- The Next.js project uses App Router under `src/app/`.
- `src/app/layout.tsx` currently owns root HTML, Barlow font variables, and global CSS import.
- The design system has been extracted into `src/app/globals.css`.
- No layout components or context directory exist yet unless created by earlier development.

### Component Boundaries

- `Header`, `MobileDrawer`, `FloatingWhatsApp`, and `ModeContext` are Client Components because they need pathname, click handlers, local state, context, or browser interactions.
- `Footer` can be a Server Component unless it consumes mode context or browser APIs.
- Keep `'use client'` only on files that need it.

### Required Architecture Patterns

- Preserve global reference CSS class names. Do not redesign the header/footer/floating button.
- Do not introduce Tailwind, CSS Modules for reference classes, UI libraries, Firebase, auth, cart, checkout, payment, or database access.
- Data flow remains JSON-backed. Components should receive catalogue/contact data through props or future utilities, not hardcoded duplicate data once Story 1.3/1.4 are available.
- Root layout should remain compatible with static generation and SEO.

### Suggested Files

```text
src/components/layout/Header.tsx
src/components/layout/MobileDrawer.tsx
src/components/layout/Footer.tsx
src/components/layout/FloatingWhatsApp.tsx
src/context/ModeContext.tsx
src/app/layout.tsx
```

### Navigation Guidance

Use these routes initially:

- Home: `/`
- Products: `/categories`
- Search by Vehicle/Application: `/vehicle`
- Brands: `/brands`
- Contact: `/contact`
- Search Parts CTA: `/search`
- Get Quote CTA: `/contact`

Future route stories will implement the target pages. Links can point to planned routes now as long as they do not break build.

### Testing / Verification

Run:

```bash
npm run lint
npm run build
```

If practical, start the dev server and inspect `/` to ensure the layout renders. Do not leave dev server processes running.

## Project Structure Notes

Expected files created or modified:

```text
src/components/layout/Header.tsx
src/components/layout/MobileDrawer.tsx
src/components/layout/Footer.tsx
src/components/layout/FloatingWhatsApp.tsx
src/context/ModeContext.tsx
src/app/layout.tsx
_bmad-output/implementation-artifacts/1-5-root-layout-with-header-footer-and-floatingwhatsapp.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 1.5]
- [Source: _bmad-output/planning-artifacts/architecture.md - Component Organization, Frontend Architecture, Data Flow, Implementation Rules]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - FR-15 Floating WhatsApp CTA and FR-16 Responsive Navigation]
- [Source: reference/index.html - header, mobile drawer, footer, floating WhatsApp markup and classes]
- [Source: _bmad-output/implementation-artifacts/1-2-css-design-system-extraction.md - design system state]
- [Source: _bmad-output/implementation-artifacts/1-4-utility-libraries.md - utility integration expectations]

## Dev Agent Record

### Agent Model Used

TBD by dev agent

### Debug Log References

### Completion Notes List

- Story context created from epics, architecture, PRD requirements, reference layout expectations, and current sprint state.

### File List

- `_bmad-output/implementation-artifacts/1-5-root-layout-with-header-footer-and-floatingwhatsapp.md`
