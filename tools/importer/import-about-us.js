/* eslint-disable */
/* global WebImporter */

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/starbucks-cleanup.js';
import sectionsTransformer from './transformers/starbucks-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'about-us',
  description: 'Starbucks About Us page - narrative landing page with company heritage, values, and directory links',
  urls: [
    'https://www.starbucks.com/about-us/',
  ],
  blocks: [],
  sections: [
    {
      id: 'section-1',
      name: 'Page Title',
      selector: 'main > div:nth-child(1)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(1) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-2',
      name: 'Our Heritage',
      selector: 'main > div:nth-child(2)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(2)'],
    },
    {
      id: 'section-3',
      name: 'Coffee & Craft',
      selector: 'main > div:nth-child(3)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(3)'],
    },
    {
      id: 'section-4',
      name: 'Our Partners',
      selector: 'main > div:nth-child(4)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(4)'],
    },
    {
      id: 'section-5',
      name: 'Doing Good',
      selector: 'main > div:nth-child(5)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(5)'],
    },
    {
      id: 'section-6',
      name: 'People',
      selector: 'main > div:nth-child(6)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(6) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-7',
      name: 'Planet',
      selector: 'main > div:nth-child(7)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(7) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-8',
      name: 'Learn More Header',
      selector: 'main > div:nth-child(8)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(8) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-9',
      name: 'Stories & News',
      selector: 'main > div:nth-child(9)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(9) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-10',
      name: 'Company Profile',
      selector: 'main > div:nth-child(10)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(10) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-11',
      name: 'Company Timeline',
      selector: 'main > div:nth-child(11)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(11) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-12',
      name: 'Ethics & Compliance',
      selector: 'main > div:nth-child(12)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(12) .content-block_innerContentContainer__VNBML'],
    },
    {
      id: 'section-13',
      name: 'Corporate Governance',
      selector: 'main > div:nth-child(13)',
      style: null,
      blocks: [],
      defaultContent: ['main > div:nth-child(13) .content-block_innerContentContainer__VNBML'],
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

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Insert section breaks and section-metadata BEFORE any block parsing
    // (This page has no blocks, but sections still need breaks)
    const sectionPayload = { ...payload, template: PAGE_TEMPLATE };
    sectionsTransformer('afterTransform', main, sectionPayload);

    // 3. No blocks on this page - all default content

    // 4. Execute afterTransform transformers (final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/about-us',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: [],
      },
    }];
  },
};
