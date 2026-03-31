var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-horizontal.js
  function parse(element, { document }) {
    const image = element.querySelector('img.block, img[class*="block"]');
    const heading = element.querySelector(".sb-heading, h1, h2");
    const description = element.querySelector(
      '.image-content-block_copyBlockMaxWidth__xdQPV > div.rich-text_text__VBZPW, .image-content-block_copyBlockMaxWidth__xdQPV > div[class*="rich-text"]'
    );
    const cta = element.querySelector('a.sb-button, a[class*="sb-button"]');
    const cells = [];
    if (image) {
      cells.push([image]);
    }
    const contentElements = [];
    if (heading) contentElements.push(heading);
    if (description) contentElements.push(description);
    if (cta) contentElements.push(cta);
    cells.push([contentElements]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-horizontal", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/starbucks-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#consent_blackbar",
        'iframe[title="Optimizely Internal Frame"]',
        "#trustarcNoticeFrame",
        ".sb-skipLinkWrapper"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.sb-globalNav",
        "header",
        "footer",
        "#primary-hamburger-nav-panel",
        "#secondary-hamburger-nav-panel-Account",
        "#modal",
        "next-route-announcer",
        "iframe",
        "noscript",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/starbucks-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { sections } = template;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = section.selector.startsWith("#") ? `[id="${section.selector.slice(1)}"]` : section.selector;
        const sectionEl = element.querySelector(selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-horizontal": parse
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Starbucks homepage with hero promotions, featured products, and brand storytelling sections",
    urls: [
      "https://www.starbucks.com/"
    ],
    blocks: [
      {
        name: "hero-horizontal",
        instances: [
          '[id="137-107004"]',
          '[id="137-107061"]',
          '[id="137-107018"]',
          '[id="137-107058"]'
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Promo Banner",
        selector: '[id="137-101291"]',
        style: null,
        blocks: [],
        defaultContent: ['[id="137-101291"] .content-block_innerContentContainer__VNBML']
      },
      {
        id: "section-2",
        name: "Spring Break Travel Hack",
        selector: '[id="137-107004"]',
        style: "starbucks-green",
        blocks: ["hero-horizontal"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Starbucks Rewards",
        selector: '[id="137-107061"]',
        style: "starbucks-green",
        blocks: ["hero-horizontal"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Spring Starts Now",
        selector: '[id="137-107018"]',
        style: null,
        blocks: ["hero-horizontal"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Matcha Fans",
        selector: '[id="137-107058"]',
        style: "starbucks-green",
        blocks: ["hero-horizontal"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Fine Print",
        selector: '[id="137-107062"]',
        style: null,
        blocks: [],
        defaultContent: ['[id="137-107062"] .content-block_innerContentContainer__VNBML']
      }
    ]
  };
  var transformers = [
    transform
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const sectionPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
      transform2("afterTransform", main, sectionPayload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
