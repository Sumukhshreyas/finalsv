# PRD Quality Review — SV Enterprises Product Showcase Website

## Overall verdict

This is a **solid, well-structured PRD** for a clearly scoped product. The vision is sharp, the non-goals are unusually honest (the repeated "no e-commerce" guardrail genuinely does work), and the feature/FR structure is tight enough for downstream story creation. The main weaknesses are: (1) the personas and user journeys are adequate but don't drive feature prioritization — they're illustrative rather than load-bearing; (2) several FRs bundle multiple testable behaviours into a single requirement, which will cause trouble during story decomposition; and (3) the Assumptions Index and inline `[ASSUMPTION]` tags don't round-trip — assumptions are listed at the bottom but never appear inline in the feature text where the inference was made.

## Decision-readiness — adequate

The PRD makes its biggest decision — "no e-commerce, enquiry only" — loudly and clearly, repeating it in the Vision (§1), Non-Goals (§5), and a dedicated guardrail (§8.4). The "reference HTML is sacred" constraint is also stated decisively. However, several decisions that matter for downstream are deferred to Open Questions rather than resolved: hosting platform, data management strategy, WhatsApp pre-fill behaviour, and domain name. These are all tractable decisions that could have been resolved with the product owner during PRD creation. For a product at these stakes (a business website, not a regulated system), the current state is adequate — but a decision-maker would still need to answer 7 open questions before architecture work can start.

### Findings

- **medium** Open Questions are too numerous for "final" status (§11) — 7 open questions for a product this scoped is high. Several (hosting, data management, WhatsApp behaviour) are architectural decisions that should be resolved before marking status: final. _Fix:_ Resolve questions 1-3 and 6 with the product owner; move the rest to a post-v1 backlog item.
- **low** Mode persistence during session (FR-1) says "persists during the session" but doesn't specify the mechanism (sessionStorage, URL state, default). _Fix:_ Specify: default is "automobile"; persists via URL path prefix or sessionStorage; resets on new session.

## Substance over theater — strong

The PRD is lean and every section carries weight. No persona theater — the three personas are distinct and map to real buyer types in the Bangalore wholesale market. No innovation theater — the PRD makes no novelty claims. No NFR theater — there are no vague "must be scalable/secure" fillers; the NFRs are baked into specific guardrails (§8) with concrete thresholds (LCP < 2.5s, touch targets ≥ 44px). The Advantages section in the homepage (FR-2) could be mistaken for theater, but it's a direct extraction from the reference HTML, not padding. The Glossary is tight and genuinely useful — the "Mode" and "Enquiry" definitions do real work for downstream readers.

### Findings

- No findings. This dimension is clean.

## Strategic coherence — strong

The PRD has a clear thesis: "generate enquiries and rank on Google for spare parts searches in Bangalore." Every feature serves this thesis. The mode switch (FR-1) expands the addressable market to industrial buyers. The SEO infrastructure (FR-17–19) directly supports the ranking goal. The enquiry CTAs (FR-8) are the conversion mechanism. Success Metrics (SM-1 through SM-4) validate the thesis — organic impressions, enquiry generation, Google Ads CTR, and mobile performance. The counter-metric (SM-C1, bounce rate) is genuinely insightful — acknowledging that a single-page session ending in a WhatsApp call is a success, not a failure.

### Findings

- **low** SM-2 target of "≥20 enquiries/month" (§7) seems low for a B2B website with 5000+ products. _Fix:_ Validate the target with the product owner — if the business currently gets 5-10 enquiries/month via other channels, 20 may be aggressive; if they already get 50, it's too conservative.

## Done-ness clarity — adequate

Most FRs have testable consequences. The best examples are FR-1 (mode toggle — four specific, verifiable conditions), FR-19 (URL structure with exact patterns and examples), and FR-7 (product detail — enumerated display elements). However, several FRs bundle too many behaviours:

- FR-2 is really 6 separate requirements (hero, categories, brands, featured, advantages, contact band) packed into one FR with a bullet list as "consequences." Each could fail independently.
- FR-7 bundles 9+ display elements into one FR. "Product image displayed prominently with gallery dots" and "Technical Specs section listing specifications" are different testable requirements.

This won't block architecture but will cause friction during story creation — the dev will need to decompose these mega-FRs into individual stories.

### Findings

- **high** FR-2 bundles 6 distinct homepage sections into one requirement (§4.1) — each section is independently testable and could fail independently. _Fix:_ Either split FR-2 into FR-2a through FR-2f, or explicitly note that story creation should decompose this FR per section.
- **high** FR-7 bundles 9+ display elements into one requirement (§4.4) — the product detail page is the most complex page in the application. _Fix:_ Same — split or add a decomposition note.
- **medium** FR-6 (view mode toggle) says "List view shows product rows" but the reference HTML's list view CSS and JS aren't fully implemented (only grid is shown in the data). _Fix:_ Clarify whether list view is in MVP scope or decorative-only. If in scope, specify the list row layout.
- **low** FR-13 mentions "price indication" in search results but §5 says "No pricing display (except indicative prices on search results for context)." The tension is acknowledged but the source/format of these prices is unspecified. _Fix:_ Add a note: prices in search results are hardcoded indicative values from the product data, not dynamic.

## Scope honesty — strong

The Non-Goals section (§5) does genuine work — it doesn't just list what's excluded, it names the specific things a reader might expect (cart, checkout, accounts, CMS, blog, dark mode, multi-language) and explicitly closes them. The Out of Scope for MVP (§6.2) tags each item with a version target ([Deferred to v2], [Deferred to v1.1]) and includes reasoning. The `[ASSUMPTION]` tags in §12 are honest — they name real inferences (Firebase hosting, static data, placeholder images) rather than safe assumptions everyone already agrees on.

### Findings

- **medium** Assumptions are listed in §12 but never appear inline as `[ASSUMPTION: ...]` tags within the feature text (§4). The rubric expects inline tagging at the point of inference, with the index providing a roundtrip. _Fix:_ Add inline `[ASSUMPTION]` tags in the relevant FR descriptions — e.g., in FR-7: "Product image displayed prominently [ASSUMPTION: single image per product in v1, real images TBD]."

## Downstream usability — adequate

The PRD is well-structured for downstream extraction. The Glossary terms are used consistently. FR IDs are contiguous (FR-1 through FR-19). UJ IDs are contiguous (UJ-1 through UJ-3). SM IDs are contiguous. Cross-references from features to UJs work (e.g., "Realizes UJ-3"). The IA table (§9.1) and data requirements table (§10) are directly usable by an architect.

However, UJ personas don't exactly match §2.1 labels. UJ-1 says "A workshop mechanic" but §2.1 defines "Workshop Owner / Mechanic (Automobile)." UJ-2 says "A maintenance engineer" but §2.1 defines "Industrial Maintenance Buyer." UJ-3 says "A spare parts shop owner" but §2.1 defines "Retail Spare Parts Shop Owner." These are minor — the intent is clear — but they break strict persona-label linkage.

### Findings

- **low** UJ persona labels don't exactly match §2.1 persona labels (§2.4). _Fix:_ Use exact persona names — "Workshop Owner / Mechanic" instead of "workshop mechanic"; "Industrial Maintenance Buyer" instead of "maintenance engineer."
- **low** No `addendum.md` exists, which is fine for this scope, but the §0 Document Purpose doesn't mention it. If downstream workflows look for it, they'll wonder. _Fix:_ Add a note: "No addendum; all relevant context is captured in this document."

## Shape fit — strong

This is a product showcase / lead-gen website for a specific local business. The PRD correctly avoids over-formalizing: three personas (not ten), three user journeys (not twenty), lean success metrics, and no stakeholder approval matrix. The UJs are appropriately lightweight for a showcase site — they describe search-to-enquiry flows without enterprise ceremony. The §8 Constraints section is an excellent shape choice for a design-constrained build — it replaces the typical "Aesthetic and Tone" adapt-in section with something more useful ("here is the exact HTML, don't touch it"). The IA table (§9) and product data requirements (§10) are the right adapt-in additions for a catalogue site. No over-engineering, no under-specification.

### Findings

- No findings. Shape is well-matched.

## Mechanical notes

- **Glossary drift:** "OEM Number" is defined in §3 but FR-4, FR-5, FR-7, and FR-13 alternate between "OEM number", "OEM/spec number", and "OEM". Standardize to "OEM Number" per glossary.
- **ID continuity:** FR-1 through FR-19, UJ-1 through UJ-3, SM-1 through SM-4, SM-C1 — all contiguous, no gaps, no duplicates. Clean.
- **Assumptions roundtrip:** 7 assumptions listed in §12; 0 appear inline with `[ASSUMPTION: ...]` tags. Roundtrip is broken.
- **UJ persona linkage:** Persona names in UJs don't exactly match §2.1 labels (see Downstream usability finding).
- **Frontmatter inconsistency:** §0 says product owner is "Balaji" but the user edited it to "sai". The frontmatter doesn't include an author field. Either is fine — just ensure consistency.
- **Section numbering:** §8 ("Constraints and Guardrails"), §9 ("Information Architecture"), §10 ("Product Data Requirements") are adapt-in sections that don't follow the template's numbering. This is fine — the template says to adapt.
