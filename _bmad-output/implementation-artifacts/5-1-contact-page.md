# Story 5.1: Contact Page

## Status
ready-for-dev

## Story
As a site visitor, I want to view all business contact details on a dedicated page, so that I can call, WhatsApp, email, or visit SV Enterprises directly.

## Acceptance Criteria
1. `/contact` exists as a Next.js App Router page and renders contact content from the JSON catalog/config source of truth.
2. A business card section displays business name, subtitle, phone number, WhatsApp number, email address, and physical address.
3. Phone number is a tappable `tel:` link.
4. WhatsApp number is a tappable outbound WhatsApp link.
5. Email address is a tappable `mailto:` link.
6. A working hours card displays business hours.
7. A map card is displayed with a link to Google Maps.
8. Content adapts per mode for automobile vs. industrial contact details, address, and hours.
9. The default server-rendered HTML includes visible Automobile contact content; critical contact details are not client-only.
10. `generateMetadata` provides a contact-specific title and description.
11. No Firebase, Firestore, external database, API persistence, contact form backend, cart, checkout, login, or payment behavior is introduced.
12. The implementation passes the project lint and production build commands.

## Tasks / Subtasks
- [ ] Create the contact route.
  - [ ] Add `src/app/contact/page.tsx`.
  - [ ] Render Automobile contact content by default for SSR/static HTML.
  - [ ] Add contact-specific metadata.
- [ ] Build or reuse contact components.
  - [ ] Add `src/components/contact/ContactCard.tsx` or a local page component if no contact folder exists.
  - [ ] Reuse shared action/link helpers where available.
  - [ ] Preserve layout shell from Story 1.5.
- [ ] Wire JSON-backed contact data.
  - [ ] Read mode-specific contact data from `src/data/catalog.json`.
  - [ ] Use `whatsappUtils.ts` for WhatsApp link construction.
  - [ ] Do not duplicate address/phone/email/hours in component files.
- [ ] Implement contact actions.
  - [ ] Render `tel:` phone link.
  - [ ] Render WhatsApp outbound link with safe encoded message if utility supports it.
  - [ ] Render `mailto:` email link.
  - [ ] Render Google Maps outbound link.
- [ ] Support mode-aware content.
  - [ ] Default SSR output to Automobile.
  - [ ] If mode context exists, switch visible contact copy between Automobile and Industrial.
  - [ ] Keep default crawlable contact details visible without client JavaScript.
- [ ] Validate.
  - [ ] Confirm `/contact` renders business card, working hours, and map card.
  - [ ] Confirm links use `tel:`, WhatsApp URL, `mailto:`, and Google Maps URL.
  - [ ] Confirm Industrial mode copy changes if mode switching is available.
  - [ ] Run lint and production build.

## Dev Notes

### Source of Truth
- Contact content must come from `src/data/catalog.json` mode data or a shared JSON-backed config field.
- Do not add Firebase, Firestore, database SDKs, API routes, contact submission storage, or form persistence.

### Architecture Requirements
- Route file: `src/app/contact/page.tsx`
- Architecture maps FR-14 Contact to `contact/page.tsx`, `ContactCard`, and `catalog.json.modes`.
- Use `generateMetadata` or static metadata for the contact page.
- WhatsApp, phone, email, and Google Maps are outbound links only.

### Reference Implementation Pointers
- `reference/index.html` contains contact page data in `contactPage` and render behavior in `renderContactPage()`.
- Relevant reference classes include `.contact-band`, `.contact-band-grid`, `.contact-list`, `.biz-row`, and contact card styles.

### Scope Boundaries
- This story does not implement a contact form or quote submission backend.
- This story does not create API endpoints.
- This story does not change global floating WhatsApp behavior except to reuse existing utilities.

## Testing
- Browser test `/contact` at desktop and mobile widths.
- Inspect server-rendered HTML or page source for default contact details.
- Verify each outbound contact link target.
- Run:
  - `npm run lint`
  - `npm run build`

## Review Notes
- Reviewed against Epic 5.1 acceptance criteria, architecture contact mapping, and JSON-only/no-backend constraints.
- Ready for development after Story 1.3 mode contact data and Story 1.4 WhatsApp helpers are available.
