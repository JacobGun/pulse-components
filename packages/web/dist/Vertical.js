/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { hasKeys } from './TextOverflowElement.js';

/**
 * Determines whether a value is a `VerticalMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `VerticalMixin`.
 */
function isVerticalMixin(value) {
  return hasKeys(value, "vertical");
}
/**
 * Mixin to augment an element with behavior that supports a vertical orientation.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<VerticalMixin> & T} A constructor that implements `VerticalMixin`.
 */
function Vertical(base) {
  class _VerticalMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * Whether the element is oriented vertically.
       * @default false
       */
      this.vertical = false;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("vertical")) {
        this.ariaOrientation = this.vertical ? "vertical" : "horizontal";
      }
    }
  }
  __decorate([property({
    type: Boolean,
    reflect: true
  })], _VerticalMixin.prototype, "vertical", void 0);
  return _VerticalMixin;
}

export { Vertical, isVerticalMixin };
//# sourceMappingURL=Vertical.js.map
