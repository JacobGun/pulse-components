/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
const _tabindex = Symbol("_tabindex");
/**
 * Mixin to augment an element with behavior that supports a focused state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor & T} A constructor that implements focusable behavior.
 */
function Focusable(base) {
  var _a;
  class _FocusableMixin extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = 0;
    }
    /** @inheritdoc */
    connectedCallback() {
      this[_tabindex] = Number.parseInt(this.getAttribute("tabindex") ?? "0");
      super.connectedCallback();
    }
    /** @inheritdoc */
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      if (!this.hasAttribute("tabindex") && !_changedProperties.has("disabled")) {
        this.setAttribute("tabindex", `${this[_tabindex]}`);
      }
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("disabled")) {
        if (!this.disabled && this.role !== "none") {
          if (!this.hasAttribute("tabindex")) {
            this.setAttribute("tabindex", `${this[_tabindex]}`);
          }
        } else {
          const tabIndex = this.getAttribute("tabindex");
          if (tabIndex) {
            this[_tabindex] = Number.parseInt(tabIndex);
          }
          this.removeAttribute("tabindex");
        }
      }
    }
  }
  _a = _tabindex;
  return _FocusableMixin;
}

export { Focusable };
//# sourceMappingURL=Focusable.js.map
