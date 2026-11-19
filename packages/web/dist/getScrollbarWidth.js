/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
let _cachedScrollbarWidth = null;
let _cachedThinScrollbarWidth = null;
/**
 * Computes the width of a scrollbar.
 * @param {boolean} [thin=false] Whether to get the width of a thin scrollbar.
 * @returns {number} The width of a scrollbar.
 */
function getScrollbarWidth(thin = false) {
  if (thin) {
    if (_cachedThinScrollbarWidth !== null) {
      return _cachedThinScrollbarWidth;
    }
  }
  if (_cachedScrollbarWidth !== null) {
    return _cachedScrollbarWidth;
  }
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  if (thin) {
    outer.style.scrollbarWidth = "thin";
  }
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  let scrollbarWidth;
  if (thin) {
    scrollbarWidth = _cachedThinScrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  } else {
    scrollbarWidth = _cachedScrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  }
  outer.remove();
  return scrollbarWidth;
}

export { getScrollbarWidth };
//# sourceMappingURL=getScrollbarWidth.js.map
