/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Starbucks sections.
 * Adds section breaks (<hr>) and section-metadata blocks based on template sections.
 * Selectors from captured DOM of https://www.starbucks.com/
 *
 * Template sections (from page-templates.json):
 *   section-1: #137-101291 (Promo Banner, style: null)
 *   section-2: #137-107004 (Spring Break Travel Hack, style: starbucks-green)
 *   section-3: #137-107061 (Starbucks Rewards, style: starbucks-green)
 *   section-4: #137-107018 (Spring Starts Now, style: null)
 *   section-5: #137-107058 (Matcha Fans, style: starbucks-green)
 *   section-6: #137-107062 (Fine Print, style: null)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { sections } = template;
    const document = element.ownerDocument;

    // Process sections in reverse order to avoid shifting DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      // IDs starting with digits are not valid CSS selectors with #,
      // so convert #id to [id="id"] attribute selector
      const selector = section.selector.startsWith('#')
        ? `[id="${section.selector.slice(1)}"]`
        : section.selector;
      const sectionEl = element.querySelector(selector);
      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> section break before non-first sections
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
