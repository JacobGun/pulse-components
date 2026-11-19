/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Determines the number of textual lines presented by an element.
 * @param {HTMLElement} element The element for which to compute the number of lines.
 * @returns {number} The number of lines presented by an element.
 */
function computeLineCount(element) {
  const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
  return isNaN(lineHeight) || lineHeight <= 0 ? 0 : Math.round(element.scrollHeight / lineHeight);
}

export { computeLineCount };
//# sourceMappingURL=computeLineCount.js.map
