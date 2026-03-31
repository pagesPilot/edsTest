# Starbucks About Us Page Migration Plan

## Overview
Migrate the Starbucks About Us page (`https://www.starbucks.com/about-us/`) to AEM Edge Delivery Services. This is an **addition to an existing migration project** — the homepage has already been successfully migrated.

**Source URL:** `https://www.starbucks.com/about-us/`  
**Scope:** Single page (About Us)  
**Mode:** Single Page Migration

## Existing Project Context
- **Project type:** doc (`.migration/project.json`)
- **Library:** `https://main--sta-boilerplate--aemdemos.aem.page/tools/sidekick/library.json`
- **Existing block variant:** `hero-horizontal` (in `blocks/hero-horizontal/`)
- **Existing transformers:** `starbucks-cleanup.js`, `starbucks-sections.js`
- **Existing parser:** `hero-horizontal.js`
- **Existing template:** `homepage` in `page-templates.json`
- **Homepage content:** `content/index.plain.html` (already imported)

## Page Analysis (Completed via Playwright)

The About Us page has been analyzed. Key findings:

| Aspect | Detail |
|--------|--------|
| **Total sections** | 13 |
| **Blocks needed** | 0 (all default content) |
| **Images** | 4 (stacked above text, not side-by-side) |
| **Backgrounds** | All white (no starbucks-green alternation) |
| **Element IDs** | None (selectors use `main > div:nth-child(N)`) |

### Section Breakdown

| # | Section | Type | Content |
|---|---------|------|---------|
| 1 | Page Title | H1 heading | "Our Company" |
| 2 | Our Heritage | Image + text (stacked) | Storefront image, H2, 3 paragraphs |
| 3 | Coffee & Craft | Image + text (stacked) | Barista image, H2, paragraph, CTA |
| 4 | Our Partners | Image + text (stacked) | ASL image, H2, paragraph, CTA |
| 5 | Doing Good | Image + text (stacked) | Mountain image, H2, paragraph |
| 6 | People | Text only | H3, paragraph, CTA |
| 7 | Planet | Text only | H3, paragraph, CTA |
| 8 | Learn More Header | H2 heading | "Learn More About Us" |
| 9 | Stories & News | Text + CTA | H3, description, CTA |
| 10 | Company Profile | Text + CTA | H3, short description, CTA |
| 11 | Company Timeline | Text + CTA | H3, short description, CTA |
| 12 | Ethics & Compliance | Text + CTA | H3, CTA only |
| 13 | Corporate Governance | Text + CTA | H3, CTA only |

### Authoring Decision: All Default Content
Following David's Model (minimize blocks), **every section is default content**:
- Image+text sections are vertically stacked (image on top, text below) — standard default content, NOT side-by-side like `hero-horizontal`
- Text sections are simple heading + paragraph + link patterns
- No blocks are needed for this page

## Migration Steps

### Phase 1: Create Analysis Artifacts
- [ ] Create `migration-work/about-us/` directory with analysis files
- [ ] Save `metadata.json` (page title, description, OG data, 4 images)
- [ ] Save `cleaned.html` (sanitized main content)
- [ ] Save `page-structure.json` (13 sections with selectors)
- [ ] Save `authoring-analysis.json` (all default-content decisions)
- [ ] Copy screenshot from Playwright

### Phase 2: Add Template to page-templates.json
- [ ] Add `about-us` template with 13 sections and `main > div:nth-child(N)` selectors
- [ ] No blocks array needed (empty)
- [ ] No section styles needed (all null)

### Phase 3: Import Infrastructure
- [ ] Reuse existing transformers (`starbucks-cleanup.js`, `starbucks-sections.js`)
- [ ] No new parsers needed (no blocks on this page)
- [ ] Generate `import-about-us.js` import script (cleanup + sections only)
- [ ] Bundle the import script

### Phase 4: Content Import & Verification
- [ ] Create `tools/importer/urls-about-us.txt`
- [ ] Run bulk import against `https://www.starbucks.com/about-us/`
- [ ] Verify `content/about-us.plain.html` generated correctly
- [ ] Check section breaks, headings, images, links, and metadata

## Checklist
- [x] Source URL confirmed: `https://www.starbucks.com/about-us/`
- [x] Page analyzed via Playwright (13 sections, 0 blocks, all default content)
- [x] Existing project infrastructure reviewed
- [ ] Analysis artifacts saved to `migration-work/about-us/`
- [ ] `about-us` template added to `page-templates.json`
- [ ] Import script generated and bundled
- [ ] Content imported and verified
- [ ] Local preview validated

## Key Differences from Homepage Migration
| Aspect | Homepage | About Us |
|--------|----------|----------|
| Blocks | 4x hero-horizontal | None (all default) |
| Section styles | 3x starbucks-green | None |
| Element IDs | Yes (`137-*`) | No (use nth-child) |
| Images | Inside blocks | Standalone (default content) |
| New parsers needed | Yes (hero-horizontal) | No |

---

> **Ready for execution.** Switch to Execute mode to begin creating analysis files and running the import. The existing transformers will be reused; no new block code is needed.
