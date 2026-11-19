/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Asynchronously attempts to focus an element once it becomes focusable.
 * @param {HTMLElement} element The element to to focus.
 * @param {number} [timeout=200] The maximum amount of time to attempt to focus `el`.
 * @returns {Promise<boolean>} A `Promise` that resolves to whether `el` was focused.
 */
async function focusWhenReady(element, timeout = 200) {
  element.focus();
  function isFocused(element) {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root.activeElement === element : document.activeElement === element;
  }
  const start = performance.now();
  while (!isFocused(element)) {
    if (!element.isConnected || performance.now() - start > timeout) {
      return false;
    }
    await new Promise(requestAnimationFrame);
    element.focus();
  }
  return true;
}

export { focusWhenReady };
//# sourceMappingURL=focusWhenReady.js.map
