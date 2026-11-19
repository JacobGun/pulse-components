/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { isServer } from 'lit';
import { property } from 'lit/decorators.js';
import { internals, setCustomState, hasKeys } from './TextOverflowElement.js';
import { isTouchedMixin, isLabelledMixin, updateLabels, isFormAssociatedMixin } from './FormAssociated.js';

/** A symbol through which a "Form Associated" custom element validates its current state. */
const validate = Symbol("validate");
/** A symbol through which a "Form Associated" custom element provides default validation messages. */
const defaultValidationMessages = Symbol("defaultValidationMessages");
/**
 * Determines whether a value is a `ConstraintValidationMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ConstraintValidationMixin`.
 */
function isConstraintValidationMixin(value) {
  return hasKeys(value, "willValidate", "validity", "validationMessage", "reportValidity", "checkValidity", "setCustomValidity") && isFormAssociatedMixin(value);
}
const _updateValidity = Symbol("_updateValidity");
const _validityMessage = Symbol("_validityMessage");
const _validationMessages = Symbol("_validationMessages");
/**
 * Mixin to augment an element with "Form Associated" behavior that supports constraint validation.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<ConstraintValidationMixin> & T} A constructor that implements `ConstraintValidationMixin`.
 */
function ConstraintValidation(base) {
  var _a;
  class _ConstraintValidation extends base {
    constructor() {
      super(...arguments);
      this[_a] = {};
    }
    /** Whether the element is a submittable element that is a candidate for constraint validation. */
    get willValidate() {
      return this[internals].willValidate;
    }
    /** The validity state of the element. */
    get validity() {
      this[_updateValidity]();
      return this[internals].validity;
    }
    /** The error message that would be displayed if the user submits the form, or an empty string if no error message. */
    get validationMessage() {
      this[_updateValidity]();
      return this[internals].validationMessage;
    }
    /** Default validation messages mapped to individual error types. */
    get [(_a = _validationMessages, defaultValidationMessages)]() {
      return {
        valueMissing: "This field is required.",
        typeMismatch: "The value is not in the correct format.",
        patternMismatch: "The value does not match the required pattern.",
        tooLong: "The value is too long.",
        tooShort: "The value is too short.",
        rangeUnderflow: "The value is too small.",
        rangeOverflow: "The value is too large.",
        stepMismatch: "The value is not a valid step.",
        badInput: "The value is invalid.",
        customError: "The value is invalid."
      };
    }
    /** Validation messages mapped to individual error types. */
    set validationMessages(value) {
      this[_validationMessages] = value;
    }
    get validationMessages() {
      return {
        ...this[defaultValidationMessages],
        ...this[_validationMessages]
      };
    }
    /** @internal */
    [validate]() {
      return this[_validityMessage] ? {
        customError: true
      } : undefined;
    }
    /**
     * Returns `true` if the element has no validity problems; otherwise, returns `false`, fires
     * an invalid event, and (if the event isn't canceled) reports the problem to the user.
     */
    reportValidity() {
      if (isTouchedMixin(this)) {
        this.markAsTouched();
      }
      this[_updateValidity]();
      return this[internals].reportValidity();
    }
    /**
     * Returns `true` if the element has no validity problems; otherwise,
     * returns `false`, fires an invalid event.
     */
    checkValidity() {
      this[_updateValidity]();
      return this[internals].checkValidity();
    }
    /**
     * Sets a custom validity message for the element.
     * @param error The message to use for validity errors.
     */
    setCustomValidity(error) {
      if (error) {
        this[_validityMessage] = error;
      } else {
        this[_validityMessage] = undefined;
      }
      this[_updateValidity]();
    }
    /** @inheritdoc */
    requestUpdate(name, oldValue, options) {
      super.requestUpdate(name, oldValue, options);
      this[_updateValidity]();
    }
    /** @inheritdoc */
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      this[_updateValidity]();
    }
    /** @private */
    [_updateValidity]() {
      if (isServer || !this.isConnected) return;
      const validity = this[validate]();
      const validityMessage = validity?.customError ? this[_validityMessage] || this._getValidityMessage(validity) : this._getValidityMessage(validity);
      const invalid = !!validityMessage;
      this[internals].setValidity(validity, validityMessage);
      this.ariaInvalid = invalid ? "true" : null;
      setCustomState(this, "--invalid", invalid === true);
      if (isLabelledMixin(this)) {
        this[updateLabels]?.();
      }
    }
    /** @private */
    _getValidityMessage(flags) {
      if (flags) {
        const msgs = this.validationMessages;
        for (const key in flags) {
          if (flags[key]) {
            const msg = msgs[key];
            if (typeof msg === "string") return msg;
            if (typeof msg === "function") return msg(this);
          }
        }
      }
      return "";
    }
  }
  __decorate([property({
    type: Object
  })], _ConstraintValidation.prototype, "validationMessages", null);
  return _ConstraintValidation;
}

export { ConstraintValidation, defaultValidationMessages, isConstraintValidationMixin, validate };
//# sourceMappingURL=ConstraintValidation.js.map
