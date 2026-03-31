/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-horizontal
 * Base block: hero
 * Source: https://www.starbucks.com/
 * Updated: 2026-03-28
 *
 * Extracts side-by-side 50/50 hero sections from Starbucks homepage.
 * Source DOM structure (from captured HTML):
 *   - Container: .md-flex (inside .sb-contentColumn)
 *   - Image column: .md-size6of12 > img.block
 *   - Text column: .md-size6of12 > .image-content-block_copyBlockMaxWidth__xdQPV
 *     - Heading: .sb-heading (h1 or h2)
 *     - Description: div.rich-text_text__VBZPW (sibling of heading)
 *     - CTA: a.sb-button
 *
 * Target table structure (from hero block library):
 *   Row 1: Image (optional)
 *   Row 2: Heading + Description + CTA
 */
export default function parse(element, { document }) {
  // Extract the image from the hero section
  const image = element.querySelector('img.block, img[class*="block"]');

  // Extract heading (h1 or h2 with .sb-heading class, fallback to any h1/h2)
  const heading = element.querySelector('.sb-heading, h1, h2');

  // Extract description text (div with rich-text class, sibling of heading container)
  const description = element.querySelector(
    '.image-content-block_copyBlockMaxWidth__xdQPV > div.rich-text_text__VBZPW, '
    + '.image-content-block_copyBlockMaxWidth__xdQPV > div[class*="rich-text"]'
  );

  // Extract CTA button link
  const cta = element.querySelector('a.sb-button, a[class*="sb-button"]');

  // Build cells matching hero block library structure:
  // Row 1: Image
  // Row 2: Content (heading + description + CTA)
  const cells = [];

  // Row 1: Image
  if (image) {
    cells.push([image]);
  }

  // Row 2: Single content cell with heading, description, and CTA
  // Wrap in nested array so all elements go into one cell (1-column table per hero block spec)
  const contentElements = [];
  if (heading) contentElements.push(heading);
  if (description) contentElements.push(description);
  if (cta) contentElements.push(cta);
  cells.push([contentElements]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-horizontal', cells });
  element.replaceWith(block);
}
