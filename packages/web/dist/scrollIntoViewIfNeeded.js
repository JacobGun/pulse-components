/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * If needed, scrolls an element into view within a given scroll container.
 * @param {HTMLElement} element The element to scroll into view.
 * @param {HTMLElement} scrollContainer The scrollable container.
 * @param {ScrollIntoViewOptions} [options=undefined] Options used to scroll into view.
 */
function scrollIntoViewIfNeeded(element, scrollContainer, options) {
  const containerBounds = scrollContainer.getBoundingClientRect();
  const elementBounds = element.getBoundingClientRect();
  if (elementBounds.top < containerBounds.top || elementBounds.bottom > containerBounds.bottom) {
    element.scrollIntoView(options);
  }
}

export { scrollIntoViewIfNeeded };
//# sourceMappingURL=scrollIntoViewIfNeeded.js.map
