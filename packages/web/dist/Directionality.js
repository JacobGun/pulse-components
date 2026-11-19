/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';

/**
 * Adapted from Angular Material CDK Directionality
 * Source: https://github.com/angular/components/blob/main/src/cdk/bidi/directionality.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _a, _M3eDirectionality_current, _M3eDirectionality_observers, _M3eDirectionality_updateDirection, _M3eDirectionality_handleChange;
/** Taken from `goog.i18n.bidi.isRtlLanguage`. */
const RTL_LOCALES = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
/** Utility used to determine the directionality of the current document. */
class M3eDirectionality {
  /** The directionality of the current document. */
  static get current() {
    return __classPrivateFieldGet(this, _a, "f", _M3eDirectionality_current);
  }
  /**
   * Observes changes to directionality.
   * @param {()=>void} callback Function invoked when directionality changes.
   * @returns {()=>void} A function used to unobserve changes.
   */
  static observe(callback) {
    __classPrivateFieldGet(this, _a, "f", _M3eDirectionality_observers).push(callback);
    return () => {
      __classPrivateFieldGet(this, _a, "f", _M3eDirectionality_observers).splice(__classPrivateFieldGet(this, _a, "f", _M3eDirectionality_observers).indexOf(callback), 1);
    };
  }
}
_a = M3eDirectionality, _M3eDirectionality_updateDirection = function _M3eDirectionality_updateDirection() {
  const _dir = (document.body?.dir || document.documentElement?.dir)?.toLowerCase() || "auto";
  __classPrivateFieldSet(this, _a, _dir === "auto" && navigator?.language ? RTL_LOCALES.test(navigator.language) ? "rtl" : "ltr" : _dir === "rtl" ? "rtl" : "ltr", "f", _M3eDirectionality_current);
}, _M3eDirectionality_handleChange = function _M3eDirectionality_handleChange() {
  __classPrivateFieldGet(this, _a, "m", _M3eDirectionality_updateDirection).call(this);
  __classPrivateFieldGet(this, _a, "f", _M3eDirectionality_observers).forEach(x => x());
};
/** @private */
_M3eDirectionality_current = {
  value: "ltr"
};
/** @private */
_M3eDirectionality_observers = {
  value: Array()
};
(() => {
  if (typeof window !== "undefined") {
    __classPrivateFieldGet(_a, _a, "m", _M3eDirectionality_updateDirection).call(_a);
    if (MutationObserver) {
      const init = {
        attributeFilter: ["dir"]
      };
      const observer = new MutationObserver(() => __classPrivateFieldGet(_a, _a, "m", _M3eDirectionality_handleChange).call(_a));
      if (document.body) {
        observer.observe(document.body, init);
      }
      if (document.documentElement) {
        observer.observe(document.documentElement, init);
      }
    }
    window.addEventListener("languagechange", () => __classPrivateFieldGet(_a, _a, "m", _M3eDirectionality_handleChange).call(_a));
  }
})();
globalThis.M3eDirectionality = M3eDirectionality;

export { M3eDirectionality };
//# sourceMappingURL=Directionality.js.map
