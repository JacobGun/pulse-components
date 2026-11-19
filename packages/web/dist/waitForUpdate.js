/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Determines whether an update is pending for an element and waits for it to complete.
 * @param {LitElement} el The element for which to wait for update.
 */
async function waitForUpdate(el) {
  if (el.isUpdatePending) {
    await el.updateComplete;
  }
}

export { waitForUpdate };
//# sourceMappingURL=waitForUpdate.js.map
