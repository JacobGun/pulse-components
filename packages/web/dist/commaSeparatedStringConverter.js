/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/** Converts a comma-separated attribute into an array of strings. */
const commaSeparatedStringConverter = {
  fromAttribute(value) {
    if (!value) return [];
    return value.split(/,+/).map(d => d.trim()).filter(Boolean);
  },
  toAttribute(value) {
    return value.join(",");
  }
};

export { commaSeparatedStringConverter };
//# sourceMappingURL=commaSeparatedStringConverter.js.map
