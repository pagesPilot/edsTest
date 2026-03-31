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

  // tools/importer/import-about-us.js
  var import_about_us_exports = {};
  __export(import_about_us_exports, {
    default: () => import_about_us_default
  });

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

  // tools/importer/import-about-us.js
  var PAGE_TEMPLATE = {
    name: "about-us",
    description: "Starbucks About Us page - narrative landing page with company heritage, values, and directory links",
    urls: [
      "https://www.starbucks.com/about-us/"
    ],
    blocks: [],
    sections: [
      {
        id: "section-1",
        name: "Page Title",
        selector: "main > div:nth-child(1)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(1) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-2",
        name: "Our Heritage",
        selector: "main > div:nth-child(2)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(2)"]
      },
      {
        id: "section-3",
        name: "Coffee & Craft",
        selector: "main > div:nth-child(3)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(3)"]
      },
      {
        id: "section-4",
        name: "Our Partners",
        selector: "main > div:nth-child(4)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(4)"]
      },
      {
        id: "section-5",
        name: "Doing Good",
        selector: "main > div:nth-child(5)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(5)"]
      },
      {
        id: "section-6",
        name: "People",
        selector: "main > div:nth-child(6)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(6) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-7",
        name: "Planet",
        selector: "main > div:nth-child(7)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(7) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-8",
        name: "Learn More Header",
        selector: "main > div:nth-child(8)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(8) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-9",
        name: "Stories & News",
        selector: "main > div:nth-child(9)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(9) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-10",
        name: "Company Profile",
        selector: "main > div:nth-child(10)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(10) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-11",
        name: "Company Timeline",
        selector: "main > div:nth-child(11)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(11) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-12",
        name: "Ethics & Compliance",
        selector: "main > div:nth-child(12)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(12) .content-block_innerContentContainer__VNBML"]
      },
      {
        id: "section-13",
        name: "Corporate Governance",
        selector: "main > div:nth-child(13)",
        style: null,
        blocks: [],
        defaultContent: ["main > div:nth-child(13) .content-block_innerContentContainer__VNBML"]
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
  var import_about_us_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const sectionPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
      transform2("afterTransform", main, sectionPayload);
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
        path: path || "/about-us",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: []
        }
      }];
    }
  };
  return __toCommonJS(import_about_us_exports);
})();
