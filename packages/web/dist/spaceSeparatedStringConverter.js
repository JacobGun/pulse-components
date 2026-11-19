/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/** Converts a space-separated attribute in to an array of strings. */
const spaceSeparatedStringConverter = {
  fromAttribute(value) {
    if (!value) return [];
    return value.split(/\s+/).map(d => d.trim()).filter(Boolean);
  },
  toAttribute(value) {
    return value.join(" ");
  }
};

export { spaceSeparatedStringConverter };
//# sourceMappingURL=spaceSeparatedStringConverter.js.map
