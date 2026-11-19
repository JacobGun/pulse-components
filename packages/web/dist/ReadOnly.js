/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { hasKeys } from './TextOverflowElement.js';

/**
 * Determines whether a value is a `ReadOnlyMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ReadOnlyMixin`.
 */
function isReadOnlyMixin(value) {
  return hasKeys(value, "readOnly");
}
/**
 * Mixin to augment an element with behavior that supports a read-only state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {boolean} reflect Whether the read-only state is reflected as an attribute. The default value is `true`.
 * @returns {Constructor<ReadOnlyMixin> & T} A constructor that implements `ReadOnlyMixin`.
 */
function ReadOnly(base, reflect = true) {
  class _ReadOnlyMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * Whether the element is read-only.
       * @default false
       */
      this.readOnly = false;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("readOnly")) {
        this.ariaReadOnly = this.readOnly ? "true" : null;
      }
    }
  }
  __decorate([property({
    attribute: "readonly",
    type: Boolean,
    reflect: reflect
  })], _ReadOnlyMixin.prototype, "readOnly", void 0);
  return _ReadOnlyMixin;
}

export { ReadOnly, isReadOnlyMixin };
//# sourceMappingURL=ReadOnly.js.map
