/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { hasKeys } from './TextOverflowElement.js';

/**
 * Determines whether a value is a `RequiredMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `RequiredMixin`.
 */
function isRequiredMixin(value) {
  return hasKeys(value, "required", "optional");
}
/**
 * Mixin to augment an element with behavior that supports a required state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {boolean} [supportsAria=true] Whether ARIA is supported.
 * @returns {Constructor<RequiredMixin> & T} A constructor that implements `RequiredMixin`.
 */
function Required(base, supportsAria = true) {
  class _RequiredMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * Whether a value is required for the element.
       * @default false
       */
      this.required = false;
    }
    /** Whether a value is not required for the element. */
    get optional() {
      return !this.required;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("required") && supportsAria) {
        this.ariaRequired = `${this.required}`;
      }
    }
  }
  __decorate([property({
    type: Boolean,
    reflect: true
  })], _RequiredMixin.prototype, "required", void 0);
  return _RequiredMixin;
}

export { Required, isRequiredMixin };
//# sourceMappingURL=Required.js.map
