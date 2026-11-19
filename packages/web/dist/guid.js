/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Generates a new globally unique identifier (GUID).
 * @returns {string} A new globally unique identifier.
 */
function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

export { guid };
//# sourceMappingURL=guid.js.map
