/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { hasKeys } from './TextOverflowElement.js';

/**
 * Determines whether a value is a `SelectedMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SelectedMixin`.
 */
function isSelectedMixin(value) {
  return hasKeys(value, "selected");
}
/**
 * Mixin to augment an element with behavior that supports a selected state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<SelectedMixin> & T} A constructor that implements `SelectedMixin`.
 */
function Selected(base) {
  class _SelectedMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * Whether the element is selected.
       * @default false
       */
      this.selected = false;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("selected")) {
        if (this.role === "button") {
          this.ariaPressed = `${this.selected}`;
          this.ariaSelected = null;
          this.ariaChecked = null;
        } else if (this.role === "radio") {
          this.ariaChecked = `${this.selected}`;
          this.ariaSelected = null;
          this.ariaPressed = null;
        } else if (this.role && this.role !== "none" && this.role !== "presentation") {
          this.ariaSelected = `${this.selected}`;
          this.ariaPressed = null;
          this.ariaChecked = null;
        }
      }
    }
  }
  __decorate([property({
    type: Boolean,
    reflect: true
  })], _SelectedMixin.prototype, "selected", void 0);
  return _SelectedMixin;
}

export { Selected, isSelectedMixin };
//# sourceMappingURL=Selected.js.map
