/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Determines whether an element is a custom element and waits for it to be upgraded.
 * @param {Element} el The element for which to wait for upgrade.
 */
async function waitForUpgrade(el) {
  const tag = el.tagName.toLowerCase();
  if (!tag.includes("-")) return;
  if (!customElements.get(tag)) {
    await customElements.whenDefined(tag);
  }
  const ctor = customElements.get(tag);
  if (!ctor || el instanceof ctor) {
    return;
  }
  await Promise.resolve();
  if (el instanceof ctor) {
    return;
  }
  await Promise.resolve();
}

export { waitForUpgrade };
//# sourceMappingURL=waitForUpgrade.js.map
