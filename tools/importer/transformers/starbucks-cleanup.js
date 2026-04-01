/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Starbucks cleanup.
 * Selectors from captured DOM of https://www.starbucks.com/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner: <div id="consent_blackbar">
    // Optimizely iframe: <iframe title="Optimizely Internal Frame">
    // Trustarc consent iframe: <iframe id="trustarcNoticeFrame">
    // Skip link: <div class="sb-skipLinkWrapper">
    WebImporter.DOMUtils.remove(element, [
      '#consent_blackbar',
      'iframe[title="Optimizely Internal Frame"]',
      '#trustarcNoticeFrame',
      '.sb-skipLinkWrapper',
    ]);
  }


  if (hookName === TransformHook.afterTransform) {
    // Non-authorable: header navigation
    // Non-authorable: footer with link columns
    // Non-authorable: hamburger menu panels
    // Non-authorable: modal container, route announcer
    // Non-authorable: remaining iframes, noscript, link elements
    WebImporter.DOMUtils.remove(element, [
      'header.sb-globalNav',
      'header',
      'footer',
      '#primary-hamburger-nav-panel',
      '#secondary-hamburger-nav-panel-Account',
      '#modal',
      'next-route-announcer',
      'iframe',
      'noscript',
      'link',
    ]);

  }
}
