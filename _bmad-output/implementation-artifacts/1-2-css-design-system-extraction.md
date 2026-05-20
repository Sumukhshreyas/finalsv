# Story 1.2: CSS Design System Extraction

Status: done

## Story

As a developer,
I want the complete CSS design system extracted from `reference/index.html` into `src/app/globals.css`,
so that all pages render with pixel-perfect design fidelity to the reference.

## Acceptance Criteria

1. Given the reference HTML contains the approved CSS inside its `<style>` tag, when all CSS is extracted into `src/app/globals.css`, then the starter CSS is replaced and the reference CSS is preserved without visual reinterpretation.
2. All `:root` CSS variables are preserved exactly, including colours, spacing, typography, shadows, and mode-specific variables.
3. All reference class names are preserved exactly, including `.site-header`, `.hero-mode-btn`, `.catalog-card`, `.product-tile`, `.detail-sheet`, and related nested selectors.
4. Responsive breakpoints at `1100px`, `760px`, and `430px` are preserved.
5. All animations and keyframes are preserved, including the brand marquee animation and reduced-motion handling.
6. Barlow and Barlow Condensed fonts are loaded via `next/font/google` in `src/app/layout.tsx`.
7. The root layout imports `globals.css`.
8. `npm run lint` and `npm run build` pass after extraction.

## Tasks / Subtasks

- [x] Extract the approved CSS from `reference/index.html`. (AC: 1, 2, 3, 4, 5)
  - [x] Copy only the CSS between the single `<style>` and `</style>` block in `reference/index.html`.
  - [x] Replace the current starter CSS in `src/app/globals.css`.
  - [x] Preserve selector names, CSS variables, comments, keyframes, and media query logic exactly unless a Next.js build error forces a minimal compatibility fix.
- [x] Restore the required project fonts in the root layout. (AC: 6, 7)
  - [x] Import `Barlow` and `Barlow_Condensed` from `next/font/google` in `src/app/layout.tsx`.
  - [x] Configure weights to match the reference link: Barlow `400`, `500`, `600`, `700`, `800`; Barlow Condensed `700`, `800`.
  - [x] Apply font variables/classes on the root `<html>` or `<body>` without disrupting the extracted CSS variables `--font` and `--display`.
  - [x] Keep the existing `import "./globals.css";`.
- [x] Remove starter design assumptions that conflict with the reference. (AC: 1, 2, 3)
  - [x] Ensure starter dark-mode CSS variables and default body/font rules are not retained unless they already exist in the reference CSS.
  - [x] Do not introduce Tailwind, CSS Modules, or component-scoped replacements for the global design system.
- [x] Validate the extracted design system. (AC: 1-8)
  - [x] Confirm `:root` exists in `globals.css` and includes reference typography variables.
  - [x] Confirm required selectors exist in `globals.css`: `.site-header`, `.hero-mode-btn`, `.catalog-card`, `.product-tile`, `.detail-sheet`.
  - [x] Confirm media queries for `1100px`, `760px`, and `430px` exist.
  - [x] Confirm `@keyframes brandMarquee` exists.
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.

## Dev Notes

### Current Workspace State

- Story 1.1 initialized the Next.js App Router project and moved it to review.
- Current app files include `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/page.module.css`.
- `src/app/globals.css` currently contains default starter CSS. This story replaces it with the reference CSS.
- `src/app/layout.tsx` currently imports `./globals.css` but has no font imports. Story 1.1 intentionally removed starter Geist font imports because local builds failed while fetching Google Fonts.

### Reference CSS Facts

- `reference/index.html` has one CSS block: `<style>` starts near the top of the document and `</style>` closes before the body markup.
- The reference imports Google Fonts through this HTML link: `Barlow` weights `400;500;600;700;800` and `Barlow Condensed` weights `700;800`.
- The approved CSS includes:
  - `:root` variables, including `--font` and `--display`.
  - Required class selectors such as `.site-header`, `.hero-mode-btn`, `.catalog-card`, `.product-tile`, and `.detail-sheet`.
  - `@keyframes brandMarquee`.
  - `@media (prefers-reduced-motion: reduce)`.
  - Responsive breakpoints at `max-width: 1100px`, `max-width: 760px`, and `max-width: 430px`.

### Architecture Guardrails

- `reference/index.html` is the fixed UI/UX specification. Do not redesign, rename classes, convert global CSS into CSS Modules, or replace the styling with Tailwind.
- The architecture requires vanilla CSS in `src/app/globals.css` because the reference relies on global selectors and `:root` cascade.
- The site remains JSON-backed and public. Do not add Firebase, databases, auth, cart, checkout, payment, or API endpoints.
- This story is CSS/font foundation only. Do not build catalogue pages, components, JSON data, or routing beyond what is necessary to keep the starter app compiling.

### Font Implementation Notes

- Use `next/font/google` from the App Router root layout.
- Official Next.js guidance says `next/font` can be imported from `next/font/google`, configured with options, and applied through `className` or CSS variables in the root layout. It self-hosts Google Fonts at build time.
- Because Story 1.1 saw a build failure when the environment could not fetch Google Fonts, if `npm run build` fails only because Google Fonts cannot be fetched, document the exact failure in the Dev Agent Record. Prefer keeping the intended Barlow implementation unless the user approves a local-font fallback.
- Do not restore Geist. The required project fonts are Barlow and Barlow Condensed.

### Testing / Verification

Run these commands before moving the story to review:

```bash
npm run lint
npm run build
```

If build fails due to network access while fetching `next/font/google`, rerun with the appropriate approval path. If it still fails, leave the story in progress and document the blocker instead of silently replacing fonts.

## Project Structure Notes

Expected files modified by this story:

```text
src/app/globals.css
src/app/layout.tsx
_bmad-output/implementation-artifacts/1-2-css-design-system-extraction.md
_bmad-output/implementation-artifacts/sprint-status.yaml
```

Potential cleanup if verified unused:

```text
src/app/page.module.css
```

Only remove starter files if they are genuinely unused after this story's changes.

## References

- [Source: _bmad-output/planning-artifacts/epics.md - Story 1.2]
- [Source: _bmad-output/planning-artifacts/architecture.md - Technology Stack, Frontend Architecture, Implementation Rules]
- [Source: _bmad-output/planning-artifacts/prds/prd-new-sv-automobile-2026-05-20/prd.md - Design Constraint and Typography Guardrails]
- [Source: reference/index.html - approved CSS `<style>` block and Google Fonts link]
- [Source: _bmad-output/implementation-artifacts/1-1-nextjs-project-initialization-and-configuration.md - previous story notes]
- [Source: Next.js docs - Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Source: Next.js docs - Font Module API](https://nextjs.org/docs/app/api-reference/components/font)

## Dev Agent Record

### Agent Model Used

GPT-5.2 Codex

### Debug Log References

- Extracted CSS from the single `<style>` block in `reference/index.html` into `src/app/globals.css`.
- Updated `src/app/layout.tsx` to import `Barlow` and `Barlow_Condensed` from `next/font/google` with required weights.
- Verified selectors and responsive rules with `rg`: `:root`, `--font`, `--display`, `.site-header`, `.hero-mode-btn`, `.catalog-card`, `.product-tile`, `.detail-sheet`, `@keyframes brandMarquee`, and `max-width` breakpoints `1100px`, `760px`, `430px`.
- `cmd /c npm run lint` passed.
- `cmd /c npm run build` initially failed because Google Fonts could not be fetched in the sandbox.
- Re-ran `cmd /c npm run build` with network approval; build passed and Next.js self-hosted the Barlow fonts.

### Completion Notes List

- Story context created from current architecture, epics, PRD, reference CSS scan, previous story notes, and official Next.js font docs.
- Replaced starter global CSS with the approved reference CSS.
- Added Barlow and Barlow Condensed font loading in the App Router root layout.
- Removed starter dark-mode/default body styling by replacing the entire starter stylesheet.
- Confirmed required selectors, media queries, and `brandMarquee` keyframes are present.
- Verified lint and production build.

### Change Log

- 2026-05-20: Extracted reference CSS design system, restored required fonts, and moved story to review.

### File List

- `_bmad-output/implementation-artifacts/1-2-css-design-system-extraction.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/app/globals.css`
- `src/app/layout.tsx`
