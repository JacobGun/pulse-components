/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { isDisabledMixin, internals, hasKeys, isAttachInternalsMixin } from './TextOverflowElement.js';
import { isDisabledInteractiveMixin } from './DisabledInteractive.js';

/**
 * Determines whether a value is a `FormSubmitterMixin`.
 * @param {unknown} value The value to test.
 * @returns {value is FormSubmitterMixin} Whether `value` is a `FormSubmitterMixin`.
 */
function isFormSubmitterMixin(value) {
  return hasKeys(value, "name", "type", "value") && isAttachInternalsMixin(value);
}
const _clickHandler = Symbol("_clickHandler");
/**
 * Mixin to augment an element with behavior used to submit a form.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<FormSubmitterMixin>} A constructor that implements `FormSubmitterMixin`.
 */
function FormSubmitter(base) {
  var _a;
  class _FormSubmitterMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * The type of the element.
       * @default "button"
       */
      this.type = "button";
      /** @private */
      this[_a] = async e => {
        if (e.defaultPrevented || isDisabledMixin(this) && this.disabled || isDisabledInteractiveMixin(this) && this.disabledInteractive) {
          return;
        }
        const form = this[internals].form;
        if (!form || this.type === "button") {
          return;
        }
        await new Promise(resolve => setTimeout(resolve));
        if (e.defaultPrevented) {
          return;
        }
        switch (this.type) {
          case "reset":
            form.reset();
            break;
          case "submit":
            form.addEventListener("submit", e => Object.defineProperty(e, "submitter", {
              configurable: true,
              enumerable: true,
              get: () => this
            }), {
              capture: true,
              once: true
            });
            this[internals].setFormValue(this.value);
            form.requestSubmit();
            break;
        }
      };
    }
    /**
     * The name of the element, submitted as a pair with the element's `value`
     * as part of form data, when the element is used to submit a form.
     */
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(value) {
      if (value) {
        this.setAttribute("name", value);
      } else {
        this.removeAttribute("name");
      }
    }
    /** The value associated with the element's name when it's submitted with form data. */
    get value() {
      return this.getAttribute("value");
    }
    set value(value) {
      if (value !== null && value !== undefined) {
        this.setAttribute("value", value);
      } else {
        this.removeAttribute("value");
      }
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", this[_clickHandler]);
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("click", this[_clickHandler]);
    }
  }
  _a = _clickHandler;
  /** Indicates that this custom element participates in form submission, validation, and form state restoration. */
  _FormSubmitterMixin.formAssociated = true;
  __decorate([property()], _FormSubmitterMixin.prototype, "name", null);
  __decorate([property()], _FormSubmitterMixin.prototype, "value", null);
  __decorate([property()], _FormSubmitterMixin.prototype, "type", void 0);
  return _FormSubmitterMixin;
}

export { FormSubmitter, isFormSubmitterMixin };
//# sourceMappingURL=FormSubmitter.js.map
