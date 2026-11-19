/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { hasCustomState, deleteCustomState, addCustomState, hasKeys, internals, isDisabledMixin, DesignToken, isAttachInternalsMixin, isCheckedMixin, isCheckedIndeterminateMixin } from './TextOverflowElement.js';
import { isDisabledInteractiveMixin } from './DisabledInteractive.js';

/**
 * Determines whether a value is a `DirtyMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `DirtyMixin`.
 */
function isDirtyMixin(value) {
  return hasKeys(value, "dirty", "pristine", "markAsDirty", "markAsPristine");
}
const _eventHandler$2 = Symbol("_eventHandler");
/**
 * Mixin to augment an element with functionality used to mark it as dirty.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<DirtyMixin> & T} A constructor that implements `DirtyMixin`.
 */
function Dirty(base) {
  var _a;
  class _Dirty extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = () => this.markAsDirty();
    }
    /** Whether the user has modified the value of the element. */
    get dirty() {
      return hasCustomState(this, "--dirty");
    }
    /** Whether the user has not modified the value of the element. */
    get pristine() {
      return !this.dirty;
    }
    /** @inheritdoc */
    connectedCallback() {
      this.markAsPristine();
      super.connectedCallback();
      this.addEventListener("change", this[_eventHandler$2]);
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("change", this[_eventHandler$2]);
    }
    /** Marks the element as pristine. */
    markAsPristine() {
      deleteCustomState(this, "--dirty");
    }
    /** Marks the element as dirty. */
    markAsDirty() {
      addCustomState(this, "--dirty");
    }
  }
  _a = _eventHandler$2;
  return _Dirty;
}

/**
 * Determines whether a value is a `TouchedMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TouchedMixin`.
 */
function isTouchedMixin(value) {
  return hasKeys(value, "touched", "untouched", "markAsTouched", "markAsUntouched");
}
const _eventHandler$1 = Symbol("_eventHandler");
/**
 * Mixin to augment an element with functionality used to mark it as touched.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<TouchedMixin> & T} A constructor that implements `TouchedMixin`.
 */
function Touched(base) {
  var _a;
  class _Touched extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = () => this.markAsTouched();
    }
    /** Whether the user has interacted when the element. */
    get touched() {
      return hasCustomState(this, "--touched");
    }
    /** Whether the user has not interacted when the element. */
    get untouched() {
      return !this.touched;
    }
    /** @inheritdoc */
    connectedCallback() {
      this.markAsUntouched();
      super.connectedCallback();
      this.addEventListener("focusout", this[_eventHandler$1], {
        capture: true
      });
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("focusout", this[_eventHandler$1], {
        capture: true
      });
    }
    /** Marks the element as touched. */
    markAsTouched() {
      addCustomState(this, "--touched");
    }
    /** Marks the element as untouched. */
    markAsUntouched() {
      deleteCustomState(this, "--touched");
    }
  }
  _a = _eventHandler$1;
  return _Touched;
}

/** A symbol through which to update labels to reflect a control's current state. */
const updateLabels = Symbol("updateLabels");
/**
 * Determines whether a value is a `LabelledMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `LabelledMixin`.
 */
function isLabelledMixin(value) {
  return hasKeys(value, "labels") && isAttachInternalsMixin(value);
}
const _eventHandler = Symbol("_eventHandler");
/**
 * Mixin to augment an element with support for labelling.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<FormAssociatedMixin> & T} A constructor that implements `FormAssociatedMixin`.
 */
function Labelled(base) {
  var _a;
  class _Labelled extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = e => {
        if (!e.defaultPrevented) {
          this[updateLabels]();
        }
      };
    }
    /** The label elements that the element is associated with. */
    get labels() {
      return this[internals].labels;
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("focusout", this[_eventHandler]);
      this.addEventListener("change", this[_eventHandler]);
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("focusout", this[_eventHandler]);
      this.removeEventListener("change", this[_eventHandler]);
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      this[updateLabels]();
    }
    /** @internal */
    [(_a = _eventHandler, updateLabels)]() {
      const focusable = this.hasAttribute("tabindex");
      const disabled = isDisabledMixin(this) && this.disabled || isDisabledInteractiveMixin(this) && this.disabledInteractive;
      const invalid = isTouchedMixin(this) && this.touched && (this.ariaInvalid || hasCustomState(this, "--invalid"));
      for (const label of this.labels ?? []) {
        label.style.userSelect = focusable ? "none" : "";
        label.style.cursor = !disabled && focusable ? "pointer" : "";
        if (!disabled && focusable) {
          label.style.setProperty("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)");
        } else {
          label.style.removeProperty("-webkit-tap-highlight-color");
        }
        label.style.color = disabled ? `color-mix(in srgb, ${DesignToken.color.onSurface} 38%, transparent)` : invalid ? `${DesignToken.color.error}` : "";
      }
    }
  }
  /** Indicates that this custom element participates in form submission, validation, and form state restoration. */
  _Labelled.formAssociated = true;
  return _Labelled;
}

/** A symbol through which a "Form Associated" custom element provides a value for a form. */
const formValue = Symbol("formValue");
/** A symbol through which a "Form Associated" custom element provides a default value for resetting a form. */
const defaultValue = Symbol("defaultValue");
/**
 * Determines whether a value is a `FormAssociatedMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `FormAssociatedMixin`.
 */
function isFormAssociatedMixin(value) {
  return hasKeys(value, "disabled", "form", "name") && isLabelledMixin(value) && isAttachInternalsMixin(value);
}
const _defaultValue = Symbol("_defaultValue");
const _defaultIndeterminate = Symbol("_defaultIndeterminate");
const _formDisabled = Symbol("_formDisabled");
/**
 * Mixin to augment an element with "Form Associated" behavior.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<FormAssociatedMixin> & T} A constructor that implements `FormAssociatedMixin`.
 */
function FormAssociated(base) {
  var _a, _b;
  class _FormAssociatedMixin extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = false;
      /** @private */
      this[_b] = false;
    }
    /** The `HTMLFormElement` associated with this element. */
    get form() {
      return this[internals].form;
    }
    /** @inheritdoc */
    get labels() {
      return this[internals].labels;
    }
    /** @internal */
    get [(_a = _defaultIndeterminate, _b = _formDisabled, formValue)]() {
      return null;
    }
    /** @internal */
    get [defaultValue]() {
      return this[_defaultValue];
    }
    /** The name that identifies the element when submitting the associated form. */
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
    // Disabled attributes should not be reflected for form associated elements due to
    // how the formDisabledCallback overrides an element's disabled state.
    // See https://github.com/whatwg/html/issues/8365
    /**
     * Whether the element is disabled.
     * @default false
     */
    get disabled() {
      return super.disabled || this[_formDisabled];
    }
    set disabled(value) {
      super.disabled = value;
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      if (isCheckedMixin(this)) {
        this[_defaultValue] = this.checked;
        if (isCheckedIndeterminateMixin(this)) {
          this[_defaultIndeterminate] = this.indeterminate;
        }
      } else if ("value" in this) {
        this[_defaultValue] = this.value;
      }
    }
    /** @inheritdoc */
    requestUpdate(name, oldValue, options) {
      super.requestUpdate(name, oldValue, options);
      this[internals].setFormValue(this[formValue]);
    }
    /** Called when the element is disabled or enabled via its form association. */
    formDisabledCallback(disabled) {
      const wasDisabled = this.disabled;
      this[_formDisabled] = disabled;
      if (this.disabled != wasDisabled) {
        this.requestUpdate("disabled", wasDisabled);
      }
    }
    /** Called when the associated form is reset. */
    formResetCallback() {
      if (isCheckedMixin(this)) {
        this.checked = this[_defaultValue] === true;
        if (isCheckedIndeterminateMixin(this)) {
          this.indeterminate = this[_defaultIndeterminate];
        }
      } else if ("value" in this) {
        this.value = this[defaultValue];
      }
      if (isDirtyMixin(this)) {
        this.markAsPristine();
      }
      if (isTouchedMixin(this)) {
        this.markAsUntouched();
      }
    }
  }
  /** Indicates that this custom element participates in form submission, validation, and form state restoration. */
  _FormAssociatedMixin.formAssociated = true;
  __decorate([property({
    noAccessor: true
  })], _FormAssociatedMixin.prototype, "name", null);
  __decorate([property({
    type: Boolean
  })], _FormAssociatedMixin.prototype, "disabled", null);
  return _FormAssociatedMixin;
}

export { Dirty, FormAssociated, Labelled, Touched, defaultValue, formValue, isDirtyMixin, isFormAssociatedMixin, isLabelledMixin, isTouchedMixin, updateLabels };
//# sourceMappingURL=FormAssociated.js.map
