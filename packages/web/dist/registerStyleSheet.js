/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Registers a constructable stylesheet in the document's `adoptedStyleSheets`.
 * @param css - A `CSSResult` (e.g., from `css```) whose text will be injected into a constructable stylesheet.
 */
function registerStyleSheet(css) {
  if (typeof window === "undefined") return;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css.toString());
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}

export { registerStyleSheet };
//# sourceMappingURL=registerStyleSheet.js.map
