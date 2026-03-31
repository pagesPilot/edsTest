/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroHorizontalParser from './parsers/hero-horizontal.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/starbucks-cleanup.js';
import sectionsTransformer from './transformers/starbucks-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-horizontal': heroHorizontalParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Starbucks homepage with hero promotions, featured products, and brand storytelling sections',
  urls: [
    'https://www.starbucks.com/',
  ],
  blocks: [
    {
      name: 'hero-horizontal',
      instances: [
        '[id="137-107004"]',
        '[id="137-107061"]',
        '[id="137-107018"]',
        '[id="137-107058"]',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Promo Banner',
      selector: '[id="137-101291"]',
      style: null,
      blocks: [],
      defaultContent: ['[id="137-101291"] .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-2',
      name: 'Spring Break Travel Hack',
      selector: '[id="137-107004"]',
      style: 'starbucks-green',
      blocks: ['hero-horizontal'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Starbucks Rewards',
      selector: '[id="137-107061"]',
      style: 'starbucks-green',
      blocks: ['hero-horizontal'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Spring Starts Now',
      selector: '[id="137-107018"]',
      style: null,
      blocks: ['hero-horizontal'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Matcha Fans',
      selector: '[id="137-107058"]',
      style: 'starbucks-green',
      blocks: ['hero-horizontal'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Fine Print',
      selector: '[id="137-107062"]',
      style: null,
      blocks: [],
      defaultContent: ['[id="137-107062"] .content-block_innerContentContainer__VNBML'],
    },
  ],
};

// TRANSFORMER REGISTRY
// Cleanup transformers run in both hooks; section transformer runs separately
// before block parsing (since parsers replace elements the sections target)
const transformers = [
  cleanupTransformer,
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Insert section breaks and section-metadata BEFORE block parsing
    // Parsers replace elements via replaceWith(), removing the original IDs
    // that the section transformer needs, so sections must be inserted first
    const sectionPayload = { ...payload, template: PAGE_TEMPLATE };
    sectionsTransformer('afterTransform', main, sectionPayload);

    // 3. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 4. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 5. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 6. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 7. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
