/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { validate, isConstraintValidationMixin } from './ConstraintValidation.js';
import { isCheckedMixin } from './TextOverflowElement.js';
import { isRequiredMixin } from './Required.js';

/**
 * Determines whether a value is a `RequiredConstraintValidationMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `RequiredConstraintValidationMixin`.
 */
function isRequiredConstraintValidationMixin(value) {
  return isRequiredMixin(value) && isConstraintValidationMixin(value);
}
/**
 * Mixin to augment an element with behavior that supports a required state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<RequiredConstraintValidationMixin> & T} A constructor that implements `RequiredConstraintValidationMixin`.
 */
function RequiredConstraintValidation(base) {
  class _RequiredConstraintValidation extends base {
    /** @internal */
    [validate]() {
      const validity = super[validate]();
      if (!validity && this.required) {
        if (isCheckedMixin(this) && !this.checked) {
          return {
            valueMissing: true
          };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!this.value) {
          return {
            valueMissing: true
          };
        }
      }
      return validity;
    }
  }
  return _RequiredConstraintValidation;
}

export { RequiredConstraintValidation, isRequiredConstraintValidationMixin };
//# sourceMappingURL=RequiredConstraintValidation.js.map
