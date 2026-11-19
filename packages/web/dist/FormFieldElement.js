/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, nothing, html, css, unsafeCSS } from 'lit';
import { query, state, property } from 'lit/decorators.js';
import { ReconnectedCallback, AttachInternals, MutationController, ResizeController, FocusController, setCustomState, PressedController, deleteCustomState, HoverController, hasCustomState, setCustomEnumState, DesignToken, customElement } from './TextOverflowElement.js';
import { getTextContent } from './getTextContent.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { interceptProperty } from './interceptProperty.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import 'lit/directives/if-defined.js';
import { isReadOnlyMixin } from './ReadOnly.js';
import { M3eAriaDescriber } from './LiveAnnouncer.js';

/**
 * Determines whether a value is a `FloatLabelType`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `FloatLabelType`.
 */
function isFloatLabelType(value) {
  return value === "always" || value === "auto";
}

/**
 * Adapted from Angular Material Form Field Control
 * Source: https://github.com/angular/components/blob/main/src/material/form-field/form-field-control.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
const KNOWN_FORM_FIELD_TAGS = ["m3e-input-chip-set", "m3e-select", "m3e-date-input"];
/**
 * Determines whether a value is a `FormFieldControl`.
 * @param {unknown} value The value to test.
 * @returns {value is FormFieldControl} Whether `value` is a `FormFieldControl`.
 */
function isFormFieldControl(value) {
  return value instanceof HTMLElement && (value instanceof HTMLInputElement || value instanceof HTMLTextAreaElement || value instanceof HTMLSelectElement || KNOWN_FORM_FIELD_TAGS.includes(value.tagName.toLowerCase()));
}
/**
 * Locates the first `FormFieldControl` in a given slot.
 * @param {HTMLSlotElement} slot The slot in which to locate a `FormFieldControl`.
 * @returns {FormFieldControl | null} The `FormFieldControl` located in `slot`.
 */
function findFormFieldControl(slot) {
  for (const element of slot.assignedElements({
    flatten: true
  })) {
    if (isFormFieldControl(element)) {
      return element;
    }
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      if (isFormFieldControl(walker.currentNode)) {
        return walker.currentNode;
      }
    }
  }
  return null;
}

/**
 * Determines whether a value is a `FormFieldVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `FormFieldVariant`.
 */
function isFormFieldVariant(value) {
  return value === "filled" || value === "outlined";
}

/**
 * Determines whether a value is a `HideSubscriptType`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `HideSubscriptType`.
 */
function isHideSubscriptType(value) {
  return value === "always" || value === "auto" || value === "never";
}

/**
 * Adapted from Angular Material Form Field
 * Source: https://github.com/angular/components/blob/main/src/material/form-field/form-field.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3eFormFieldElement_instances, _M3eFormFieldElement_ownsValidity, _M3eFormFieldElement_control, _M3eFormFieldElement_removeValueInterceptor, _M3eFormFieldElement_formResetHandler, _M3eFormFieldElement_controlInvalidHandler, _M3eFormFieldElement_controlMutationController, _M3eFormFieldElement_resizeController, _M3eFormFieldElement_focusController, _M3eFormFieldElement_labelMutationController, _M3eFormFieldElement_hintMutationController, _M3eFormFieldElement_errorMutationController, _M3eFormFieldElement_pressedController, _M3eFormFieldElement_focused, _M3eFormFieldElement_hintText, _M3eFormFieldElement_errorText, _M3eFormFieldElement_shouldFloatLabel_get, _M3eFormFieldElement_applyVariant, _M3eFormFieldElement_applyFloatLabel, _M3eFormFieldElement_applyHideSubscriptType, _M3eFormFieldElement_initialize, _M3eFormFieldElement_handleLabelSlotChange, _M3eFormFieldElement_updateLabel, _M3eFormFieldElement_handlePrefixSlotChange, _M3eFormFieldElement_handleSuffixSlotChange, _M3eFormFieldElement_handlePrefixResize, _M3eFormFieldElement_handleSlotChange, _M3eFormFieldElement_handleContainerClick, _M3eFormFieldElement_handleControlInvalid, _M3eFormFieldElement_handleControlChange, _M3eFormFieldElement_handleFormReset, _M3eFormFieldElement_ignoreEvent, _M3eFormFieldElement_changeControl, _M3eFormFieldElement_bindValueInterceptor, _M3eFormFieldElement_handleHintChange, _M3eFormFieldElement_handleErrorChange, _M3eFormFieldElement_updateCustomValidity;
/**
 * A container for form controls that applies Material Design styling and behavior.
 *
 * @description
 * The `m3e-form-field` component is a semantic, expressive container for form controls that anchors
 * label behavior, subscript messaging, and variant-specific layout. Designed according to Material Design 3
 * guidelines, it supports two visual variants—`outlined` and `filled`—each with dynamic elevation,
 * shape transitions, and adaptive color theming. The component responds to control state changes
 * (focus, hover, press, disabled, invalid) with smooth motion and semantic clarity, ensuring
 * visual hierarchy and emotional resonance.

 * The component is accessible by default, with ARIA annotations, contrast-safe color tokens,
 * and dynamic descriptions for hint and error messaging. It supports prefix and suffix content,
 * floating labels, and adaptive subscript visibility. When hosting a control with validation,
 * error messages are surfaced with `aria-invalid` and described for assistive technology.

 * Native form controls may not expose full state or messaging on their own. `m3e-form-field` bridges
 * these gaps by coordinating label floating, container styling, and subscript feedback.
 *
 * @example
 * The following example illustrates a basic usage of the `m3e-form-field`.
 * ```html
 * <m3e-form-field>
 *  <label slot="label" for="field">Text field</label>
 *  <input id="field" />
 * </m3e-form-field>
 * ```
 *
 * @tag m3e-form-field
 *
 * @slot - Renders the control of the field.
 * @slot label - Renders the label of the field.
 * @slot prefix - Renders content before the fields's control.
 * @slot prefix-text - Renders text before the fields's control.
 * @slot suffix - Renders content after the fields's control.
 * @slot suffix-text - Renders text after the fields's control.
 * @slot hint - Renders hint text in the fields's subscript, when the control is valid.
 * @slot error - Renders error text in the fields's subscript, when the control is invalid.
 *
 * @attr float-label - Specifies whether the label should float always or only when necessary.
 * @attr hide-required-marker - Whether the required marker should be hidden.
 * @attr hide-subscript - Whether subscript content is hidden.
 * @attr variant - The appearance variant of the field.
 * @attr error - Manually forces the field into an error state using the error slot text.
 *
 * @cssprop --m3e-form-field-font-size - Font size for the form field container text.
 * @cssprop --m3e-form-field-font-weight - Font weight for the form field container text.
 * @cssprop --m3e-form-field-line-height - Line height for the form field container text.
 * @cssprop --m3e-form-field-tracking - Letter spacing for the form field container text.
 * @cssprop --m3e-form-field-label-font-size - Font size for the floating label.
 * @cssprop --m3e-form-field-label-font-weight - Font weight for the floating label.
 * @cssprop --m3e-form-field-label-line-height - Line height for the floating label.
 * @cssprop --m3e-form-field-label-tracking - Letter spacing for the floating label.
 * @cssprop --m3e-form-field-subscript-font-size - Font size for hint and error text.
 * @cssprop --m3e-form-field-subscript-font-weight - Font weight for hint and error text.
 * @cssprop --m3e-form-field-subscript-line-height - Line height for hint and error text.
 * @cssprop --m3e-form-field-subscript-tracking - Letter spacing for hint and error text.
 * @cssprop --m3e-form-field-color - Text color for the form field container.
 * @cssprop --m3e-form-field-subscript-color - Color for hint and error text.
 * @cssprop --m3e-form-field-invalid-color - Color used when the control is invalid.
 * @cssprop --m3e-form-field-focused-outline-color - Outline color when focused.
 * @cssprop --m3e-form-field-focused-color - Label color when focused.
 * @cssprop --m3e-form-field-outline-color - Outline color in outlined variant.
 * @cssprop --m3e-form-field-container-color - Background color in filled variant.
 * @cssprop --m3e-form-field-hover-container-color - Hover background color in filled variant.
 * @cssprop --m3e-form-field-width - Width of the form field container.
 * @cssprop --m3e-form-field-icon-size - Size of prefix and suffix icons.
 * @cssprop --m3e-outlined-form-field-container-shape - Corner radius for outlined container.
 * @cssprop --m3e-form-field-container-shape - Corner radius for filled container.
 * @cssprop --m3e-form-field-hover-container-opacity - Opacity for hover background in filled variant.
 * @cssprop --m3e-form-field-disabled-opacity - Opacity for disabled text.
 * @cssprop --m3e-form-field-disabled-container-opacity - Opacity for disabled container background.
 */
let M3eFormFieldElement = class M3eFormFieldElement extends ReconnectedCallback(AttachInternals(LitElement)) {
  constructor() {
    super();
    _M3eFormFieldElement_instances.add(this);
    /** @private */
    _M3eFormFieldElement_ownsValidity.set(this, false);
    /** @private */
    _M3eFormFieldElement_control.set(this, null);
    /** @private */
    _M3eFormFieldElement_removeValueInterceptor.set(this, void 0);
    /** @private */
    _M3eFormFieldElement_formResetHandler.set(this, () => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleFormReset).call(this));
    /** @private */
    _M3eFormFieldElement_controlInvalidHandler.set(this, () => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleControlInvalid).call(this));
    /** @private */
    _M3eFormFieldElement_controlMutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        attributeFilter: ["disabled", "readonly", "required"]
      },
      callback: () => this.notifyControlStateChange()
    }));
    /** @private */
    _M3eFormFieldElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      callback: () => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handlePrefixResize).call(this)
    }));
    /** @private */
    _M3eFormFieldElement_focusController.set(this, new FocusController(this, {
      target: null,
      filter: e => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_ignoreEvent).call(this, e),
      callback: focused => {
        focused = focused && !(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.disabled ?? true);
        setCustomState(this, "--no-animate", false);
        __classPrivateFieldSet(this, _M3eFormFieldElement_focused, focused, "f");
        if (focused) {
          setCustomState(this, "--float-label", true);
        } else {
          this._invalid = !(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.checkValidity?.() ?? true);
          this.notifyControlStateChange();
        }
      }
    }));
    /**
     * @private
     * `slotchange` does not fire when text mutates inside an already-assigned
     * element, which is how frameworks and runtime localisation set label text.
     * `characterData` is needed to observe the text node itself changing.
     */
    _M3eFormFieldElement_labelMutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        childList: true,
        subtree: true,
        characterData: true
      },
      callback: () => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_updateLabel).call(this)
    }));
    /** @private */
    _M3eFormFieldElement_hintMutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        childList: true,
        subtree: true
      },
      callback: () => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleHintChange).call(this)
    }));
    /** @private */
    _M3eFormFieldElement_errorMutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        childList: true,
        subtree: true
      },
      callback: () => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleErrorChange).call(this)
    }));
    /** @private */
    _M3eFormFieldElement_pressedController.set(this, new PressedController(this, {
      target: null,
      filter: e => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_ignoreEvent).call(this, e),
      callback: pressed => {
        setCustomState(this, "--pressed", pressed && !(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.disabled ?? true));
        if (!pressed && !__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "a", _M3eFormFieldElement_shouldFloatLabel_get)) {
          deleteCustomState(this, "--float-label");
        }
      }
    }));
    /** @private */
    _M3eFormFieldElement_focused.set(this, false);
    /** @private */
    this._pseudoLabel = "";
    /** @private */
    this._required = false;
    /** @private */
    this._invalid = false;
    /** @private */
    this._validationMessage = "";
    /** @private */
    _M3eFormFieldElement_hintText.set(this, "");
    /** @private */
    _M3eFormFieldElement_errorText.set(this, "");
    /**
     * The appearance variant of the field.
     * @default "outlined"
     */
    this.variant = "outlined";
    /**
     * Whether the required marker should be hidden.
     * @default false
     */
    this.hideRequiredMarker = false;
    /**
     * Whether subscript content is hidden.
     * @default "auto"
     */
    this.hideSubscript = "auto";
    /**
     * Specifies whether the label should float always or only when necessary.
     * @default "auto"
     */
    this.floatLabel = "auto";
    /**
     * Manually forces the field into an error state using the error slot text.
     * @default false
     */
    this.error = false;
    new HoverController(this, {
      callback: () => setCustomState(this, "--no-animate", false)
    });
  }
  /** A reference to the element used to anchor dropdown menus. */
  get menuAnchor() {
    return this._base;
  }
  /** A reference to the hosted form field control. */
  get control() {
    return __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f");
  }
  /**
   * Notifies the form field that the state of the hosted `control` has changed.
   * @param {boolean} [checkValidity=false] Whether to check validity.
   */
  notifyControlStateChange(checkValidity = false) {
    this._required = __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.required === true;
    setCustomState(this, "--required", this._required);
    setCustomState(this, "--disabled", __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.disabled === true);
    setCustomState(this, "--readonly", isReadOnlyMixin(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")) && __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").readOnly === true);
    if (this.floatLabel === "auto") {
      setCustomState(this, "--float-label", __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "a", _M3eFormFieldElement_shouldFloatLabel_get));
    }
    if (checkValidity) {
      this._invalid = !(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.checkValidity?.() ?? true);
    }
    setCustomState(this, "--invalid", this._invalid);
    this._validationMessage = __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.validationMessage ?? "";
    if (!this.isUpdatePending) {
      this.performUpdate();
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_applyFloatLabel).call(this);
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_applyHideSubscriptType).call(this);
    // Label animations are disabled on initial paint.
    setCustomState(this, "--no-animate", true);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_changeControl).call(this, null);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_initialize).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_applyVariant).call(this);
    }
    if (_changedProperties.has("floatLabel")) {
      __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_applyFloatLabel).call(this);
    }
    if (_changedProperties.has("hideSubscript")) {
      __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_applyHideSubscriptType).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_initialize).call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("error")) {
      __classPrivateFieldSet(this, _M3eFormFieldElement_ownsValidity, true, "f");
      __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_updateCustomValidity).call(this);
    }
    if (changedProperties.has("_invalid") && __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")) {
      __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").ariaInvalid = this._invalid ? "true" : null;
      if (__classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f")) {
        if (this._invalid) {
          M3eAriaDescriber.describe(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f"));
        } else {
          M3eAriaDescriber.removeDescription(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f"));
        }
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @click="${__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleContainerClick)}">${this.variant === "outlined" ? html`<div class="outline" aria-hidden="true"><div class="outline-start"></div><div class="outline-notch"><div class="pseudo-label">${this._pseudoLabel} ${!this.hideRequiredMarker && this._required ? html`&nbsp;*` : nothing}</div></div><div class="outline-end"></div></div>` : nothing}<div class="prefix"><slot name="prefix" @slotchange="${__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handlePrefixSlotChange)}"></slot></div><div class="content"><span class="prefix-text"><slot name="prefix-text"></slot></span><span class="input"><slot @slotchange="${__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleSlotChange)}" @change="${__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleControlChange)}"></slot></span><span class="suffix-text"><slot name="suffix-text"></slot></span><span class="label"><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleLabelSlotChange)}"></slot>${!this.hideRequiredMarker && this._required ? html`<span class="required-marker" aria-hidden="true">&nbsp;*</span>` : nothing}</span></div><div class="suffix"><slot name="suffix" @slotchange="${__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleSuffixSlotChange)}"></slot></div></div><span class="subscript" aria-hidden="true"><span class="error"><slot name="error">${this._validationMessage}</slot></span><span class="hint"><slot name="hint"></slot></span></span>`;
  }
};
_M3eFormFieldElement_ownsValidity = new WeakMap();
_M3eFormFieldElement_control = new WeakMap();
_M3eFormFieldElement_removeValueInterceptor = new WeakMap();
_M3eFormFieldElement_formResetHandler = new WeakMap();
_M3eFormFieldElement_controlInvalidHandler = new WeakMap();
_M3eFormFieldElement_controlMutationController = new WeakMap();
_M3eFormFieldElement_resizeController = new WeakMap();
_M3eFormFieldElement_focusController = new WeakMap();
_M3eFormFieldElement_labelMutationController = new WeakMap();
_M3eFormFieldElement_hintMutationController = new WeakMap();
_M3eFormFieldElement_errorMutationController = new WeakMap();
_M3eFormFieldElement_pressedController = new WeakMap();
_M3eFormFieldElement_focused = new WeakMap();
_M3eFormFieldElement_hintText = new WeakMap();
_M3eFormFieldElement_errorText = new WeakMap();
_M3eFormFieldElement_instances = new WeakSet();
_M3eFormFieldElement_shouldFloatLabel_get = function _M3eFormFieldElement_shouldFloatLabel_get() {
  return __classPrivateFieldGet(this, _M3eFormFieldElement_focused, "f") || hasCustomState(this, "--pressed") || (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.shouldLabelFloat !== undefined ? __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").shouldLabelFloat === true : typeof __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.value == "string" && __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").value.length > 0);
};
_M3eFormFieldElement_applyVariant = function _M3eFormFieldElement_applyVariant() {
  if (!isFormFieldVariant(this.variant)) {
    this.variant = "outlined";
  }
  setCustomEnumState(this, this.variant, "filled", "outlined");
};
_M3eFormFieldElement_applyFloatLabel = function _M3eFormFieldElement_applyFloatLabel() {
  if (!isFloatLabelType(this.floatLabel)) {
    this.floatLabel = "auto";
  }
  setCustomState(this, "--float-label-auto", this.floatLabel === "auto");
};
_M3eFormFieldElement_applyHideSubscriptType = function _M3eFormFieldElement_applyHideSubscriptType() {
  if (!isHideSubscriptType(this.hideSubscript)) {
    this.hideSubscript = "auto";
  }
  setCustomState(this, "--hide-subscript-always", this.hideSubscript === "always");
  setCustomState(this, "--hide-subscript-auto", this.hideSubscript === "auto");
  setCustomState(this, "--hide-subscript-never", this.hideSubscript === "never");
};
_M3eFormFieldElement_initialize = function _M3eFormFieldElement_initialize() {
  __classPrivateFieldGet(this, _M3eFormFieldElement_focusController, "f").observe(this._base);
  __classPrivateFieldGet(this, _M3eFormFieldElement_pressedController, "f").observe(this._base);
  __classPrivateFieldGet(this, _M3eFormFieldElement_labelMutationController, "f").observe(this._labelSlot);
  __classPrivateFieldGet(this, _M3eFormFieldElement_hintMutationController, "f").observe(this._hint);
  __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleHintChange).call(this);
  __classPrivateFieldGet(this, _M3eFormFieldElement_errorMutationController, "f").observe(this._error);
  __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleErrorChange).call(this);
};
_M3eFormFieldElement_handleLabelSlotChange = function _M3eFormFieldElement_handleLabelSlotChange(e) {
  __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_updateLabel).call(this, e.target);
};
_M3eFormFieldElement_updateLabel = function _M3eFormFieldElement_updateLabel(slot = this._labelSlot) {
  if (!slot) return;
  setCustomState(this, "--with-label", slot.assignedElements({
    flatten: true
  }).length > 0);
  this._pseudoLabel = getTextContent(slot);
};
_M3eFormFieldElement_handlePrefixSlotChange = function _M3eFormFieldElement_handlePrefixSlotChange(e) {
  setCustomState(this, "--with-prefix", hasAssignedNodes(e.target));
  __classPrivateFieldGet(this, _M3eFormFieldElement_resizeController, "f").observe(this._prefix);
};
_M3eFormFieldElement_handleSuffixSlotChange = function _M3eFormFieldElement_handleSuffixSlotChange(e) {
  setCustomState(this, "--with-suffix", hasAssignedNodes(e.target));
};
_M3eFormFieldElement_handlePrefixResize = function _M3eFormFieldElement_handlePrefixResize() {
  if (this.variant === "outlined") {
    this._base.style.setProperty("--_prefix-width", `${this._prefix.clientWidth}px`);
  }
};
_M3eFormFieldElement_handleSlotChange = function _M3eFormFieldElement_handleSlotChange(e) {
  __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_changeControl).call(this, findFormFieldControl(e.target));
};
_M3eFormFieldElement_handleContainerClick = function _M3eFormFieldElement_handleContainerClick(e) {
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_ignoreEvent).call(this, e, true)) return;
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f") && !__classPrivateFieldGet(this, _M3eFormFieldElement_focused, "f") && !__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").disabled) {
    if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").onContainerClick) {
      __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").onContainerClick(e);
    } else {
      __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").focus();
    }
  }
};
_M3eFormFieldElement_handleControlInvalid = function _M3eFormFieldElement_handleControlInvalid() {
  this._invalid = true;
  this.notifyControlStateChange();
};
_M3eFormFieldElement_handleControlChange = function _M3eFormFieldElement_handleControlChange() {
  this._invalid = !(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.checkValidity?.() ?? true);
  this.notifyControlStateChange();
};
_M3eFormFieldElement_handleFormReset = function _M3eFormFieldElement_handleFormReset() {
  this._invalid = false;
  setTimeout(() => this.notifyControlStateChange());
};
_M3eFormFieldElement_ignoreEvent = function _M3eFormFieldElement_ignoreEvent(e, ignoreControl = false) {
  if (e.composed) {
    const path = e.composedPath();
    return path.includes(this._suffix) || ignoreControl && this.control !== null && path.includes(this.control);
  }
  return false;
};
_M3eFormFieldElement_changeControl = function _M3eFormFieldElement_changeControl(control) {
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f") === control) return;
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")) {
    if (__classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f")) {
      M3eAriaDescriber.removeDescription(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f"));
    }
    if (__classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f")) {
      M3eAriaDescriber.removeDescription(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f"));
    }
    __classPrivateFieldGet(this, _M3eFormFieldElement_controlMutationController, "f").unobserve(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"));
    __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").removeEventListener("invalid", __classPrivateFieldGet(this, _M3eFormFieldElement_controlInvalidHandler, "f"));
    __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").form?.removeEventListener("reset", __classPrivateFieldGet(this, _M3eFormFieldElement_formResetHandler, "f"));
    __classPrivateFieldGet(this, _M3eFormFieldElement_removeValueInterceptor, "f")?.call(this);
    __classPrivateFieldSet(this, _M3eFormFieldElement_removeValueInterceptor, undefined, "f");
  }
  __classPrivateFieldSet(this, _M3eFormFieldElement_control, control, "f");
  if (["INPUT", "TEXTAREA", "M3E-DATE-INPUT"].includes(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.tagName ?? "")) {
    this._base.style.setProperty("--_form-field-cursor", "text");
  } else {
    this._base.style.removeProperty("--_form-field-cursor");
  }
  setCustomState(this, "--with-select", __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")?.tagName === "M3E-SELECT");
  if (hasCustomState(this, "--with-select")) {
    this._base.style.setProperty("--_form-field-cursor", "pointer");
  }
  // Reset validity ownership when the control changes.
  __classPrivateFieldSet(this, _M3eFormFieldElement_ownsValidity, this.error, "f");
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")) {
    __classPrivateFieldGet(this, _M3eFormFieldElement_controlMutationController, "f").observe(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"));
    __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").addEventListener("invalid", __classPrivateFieldGet(this, _M3eFormFieldElement_controlInvalidHandler, "f"));
    __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").form?.addEventListener("reset", __classPrivateFieldGet(this, _M3eFormFieldElement_formResetHandler, "f"));
    __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").removeAttribute("aria-invalid");
    if (__classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f")) {
      M3eAriaDescriber.describe(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f"));
    }
    const tagname = __classPrivateFieldGet(this, _M3eFormFieldElement_control, "f").tagName.toLowerCase();
    if (tagname.startsWith("m3e-") && !customElements.get(tagname)) {
      customElements.whenDefined(tagname).then(() => __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_bindValueInterceptor).call(this));
    } else {
      __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_bindValueInterceptor).call(this);
    }
    if (__classPrivateFieldGet(this, _M3eFormFieldElement_ownsValidity, "f")) {
      __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_updateCustomValidity).call(this);
    } else {
      this.notifyControlStateChange();
    }
  }
};
_M3eFormFieldElement_bindValueInterceptor = function _M3eFormFieldElement_bindValueInterceptor() {
  if (!__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f")) return;
  __classPrivateFieldSet(this, _M3eFormFieldElement_removeValueInterceptor, interceptProperty(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), "value", {
    set: (value, setter) => {
      setter(value);
      this.notifyControlStateChange(true);
    }
  }), "f");
};
_M3eFormFieldElement_handleHintChange = function _M3eFormFieldElement_handleHintChange() {
  const hintText = getTextContent(this._hint, true);
  if (hintText === __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f")) return;
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f") && __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f")) {
    M3eAriaDescriber.removeDescription(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f"));
  }
  __classPrivateFieldSet(this, _M3eFormFieldElement_hintText, hintText, "f");
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f") && __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f")) {
    M3eAriaDescriber.describe(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_hintText, "f"));
  }
};
_M3eFormFieldElement_handleErrorChange = function _M3eFormFieldElement_handleErrorChange() {
  const errorText = getTextContent(this._error, true);
  if (errorText === __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f")) return;
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_ownsValidity, "f")) {
    __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_updateCustomValidity).call(this);
  }
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f") && __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f")) {
    M3eAriaDescriber.removeDescription(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f"));
  }
  __classPrivateFieldSet(this, _M3eFormFieldElement_errorText, errorText, "f");
  if (__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f") && __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f") && this._invalid) {
    M3eAriaDescriber.describe(__classPrivateFieldGet(this, _M3eFormFieldElement_control, "f"), __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f"));
  }
};
_M3eFormFieldElement_updateCustomValidity = function _M3eFormFieldElement_updateCustomValidity() {
  if (!__classPrivateFieldGet(this, _M3eFormFieldElement_ownsValidity, "f")) return;
  if (this.error) {
    this.control?.setAttribute("aria-invalid", "true");
  } else {
    this.control?.removeAttribute("aria-invalid");
  }
  this.control?.setCustomValidity?.(this.error ? __classPrivateFieldGet(this, _M3eFormFieldElement_errorText, "f") : "");
  __classPrivateFieldGet(this, _M3eFormFieldElement_instances, "m", _M3eFormFieldElement_handleControlChange).call(this);
};
(() => {
  registerStyleSheet(css`m3e-form-field input::placeholder, m3e-form-field textarea::placeholder { user-select: none; color: currentColor; transition: opacity ${DesignToken.motion.duration.extraLong1}; } m3e-form-field:is(:state(--float-label-auto), :--float-label-auto):not( :is(:state(--float-label), :--float-label) ):is(:state(--with-label), :--with-label) input::placeholder, m3e-form-field:is(:state(--float-label-auto), :--float-label-auto):not( :is(:state(--float-label), :--float-label) ):is(:state(--with-label), :--with-label) textarea::placeholder { opacity: 0; transition: opacity 0s; } m3e-form-field:is(:state(--outlined), :--outlined) m3e-input-chip-set { margin-block: calc(calc(56px + ${DesignToken.density.calc(-3)}) / 4); } m3e-form-field:is(:state(--outlined), :--outlined) textarea { margin-block: calc( var(--m3e-form-field-label-line-height, var(--md-sys-typescale-body-small-line-height, 16px)) / 2 ); } @media (prefers-reduced-motion) { m3e-form-field input::placeholder, m3e-form-field textarea::placeholder { transition: none !important; } }`);
})();
/** The styles of the element. */
M3eFormFieldElement.styles = css`:host { display: inline-flex; flex-direction: column; vertical-align: middle; font-size: var(--m3e-form-field-font-size, ${DesignToken.typescale.standard.body.large.fontSize}); font-weight: var(--m3e-form-field-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight}); line-height: var(--m3e-form-field-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}); letter-spacing: var(--m3e-form-field-tracking, ${DesignToken.typescale.standard.body.large.tracking}); width: var(--m3e-form-field-width, 270px); color: var(--_form-field-color); } :host([hidden]) { display: none; } :host(:not(:is(:state(--disabled), :--disabled))) .base { cursor: var(--_form-field-cursor); } .base { display: flex; align-items: center; position: relative; min-height: calc(56px + ${DesignToken.density.calc(-3)}); --_form-field-label-font-size: var( --m3e-form-field-label-font-size, ${DesignToken.typescale.standard.body.small.fontSize} ); --_form-field-label-line-height: var( --m3e-form-field-label-line-height, ${DesignToken.typescale.standard.body.small.lineHeight} ); } .content { display: flex; align-items: center; position: relative; flex: 1 1 auto; min-width: 0; min-height: var(--m3e-form-field-icon-size, 24px); } .prefix, .suffix { display: flex; align-items: center; position: relative; user-select: none; flex: none; font-size: var(--m3e-form-field-icon-size, 24px); } .prefix-text, .suffix-text { opacity: 1; transition: opacity ${DesignToken.motion.duration.extraLong1}; user-select: none; flex: none; } .input { display: inline-flex; flex-wrap: wrap; flex: 1 1 auto; min-width: 0; } .label { display: flex; position: absolute; pointer-events: none; user-select: none; top: 0; left: 0; right: 0; font-size: var(--m3e-form-field-label-font-size, ${DesignToken.typescale.standard.body.small.fontSize}); font-weight: var(--m3e-form-field-label-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight}); line-height: var(--m3e-form-field-label-line-height, ${DesignToken.typescale.standard.body.small.lineHeight}); letter-spacing: var(--m3e-form-field-label-tracking, ${DesignToken.typescale.standard.body.small.tracking}); color: var(--_form-field-label-color, inherit); transition: ${unsafeCSS(`top ${DesignToken.motion.duration.short4}, 
        font-size ${DesignToken.motion.duration.short4}, 
        line-height ${DesignToken.motion.duration.short4}`)}; } :host(:is(:state(--with-select), :--with-select)) .label { margin-inline-end: 24px; } ::slotted([slot="label"]) { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .subscript { display: inline-flex; width: 100%; margin-top: 4px; font-size: var(--m3e-form-field-subscript-font-size, ${DesignToken.typescale.standard.body.small.fontSize}); font-weight: var(--m3e-form-field-subscript-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight}); line-height: var(--m3e-form-field-subscript-line-height, ${DesignToken.typescale.standard.body.small.lineHeight}); letter-spacing: var(--m3e-form-field-subscript-tracking, ${DesignToken.typescale.standard.body.small.tracking}); min-height: var(--m3e-form-field-subscript-line-height, ${DesignToken.typescale.standard.body.small.lineHeight}); color: var(--m3e-form-field-subscript-color, ${DesignToken.color.onSurfaceVariant}); } .error, .hint { flex: 1 1 auto; } :host(:is(:state(--hide-subscript-always), :--hide-subscript-always)) .subscript { display: none; } :host(:is(:state(--hide-subscript-auto), :--hide-subscript-auto):not(:is(:state(--invalid), :--invalid))) .subscript { opacity: 0; margin-top: 4px; transform: translateY(-4px); transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short4}, 
        transform ${DesignToken.motion.duration.short4}`)}; } :host( :is(:state(--hide-subscript-auto), :--hide-subscript-auto):not(:is(:state(--invalid), :--invalid)):focus-within ) .subscript, :host( :is(:state(--hide-subscript-auto), :--hide-subscript-auto):not(:is(:state(--invalid), :--invalid)):is( :state(--pressed), :--pressed ) ) .subscript { opacity: 1; transform: translateY(0); } :host(:is(:state(--invalid), :--invalid)) .hint { display: none; } :host(:not(:is(:state(--invalid), :--invalid))) .error { display: none; } ::slotted(input), ::slotted(textarea), ::slotted(select) { outline: unset; border: unset; background-color: transparent; box-shadow: none; font-family: inherit; font-size: inherit; line-height: inherit; letter-spacing: inherit; color: var(--_form-field-input-color, inherit); flex: 1 1 auto; min-width: 0; padding: unset; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } ::slotted(textarea) { scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; } ::slotted(m3e-select), ::slotted(m3e-input-chip-set), ::slotted(m3e-date-input) { flex: 1 1 auto; min-width: 0; } :host(:is(:state(--float-label-auto), :--float-label-auto):not(:is(:state(--float-label), :--float-label))) .label { font-size: inherit; } :host( :is(:state(--float-label-auto), :--float-label-auto):not(:is(:state(--float-label), :--float-label)):is( :state(--with-label), :--with-label ) ) .prefix-text, :host( :is(:state(--float-label-auto), :--float-label-auto):not(:is(:state(--float-label), :--float-label)):is( :state(--with-label), :--with-label ) ) .suffix-text { opacity: 0; transition: opacity 0s; } .prefix { margin-inline-start: 16px; } :host(:is(:state(--with-prefix), :--with-prefix)) .prefix { margin-inline-end: 16px; margin-inline-start: 12px; } .suffix { margin-inline-end: 16px; } :host(:is(:state(--with-suffix), :--with-suffix)) .suffix { margin-inline-start: 4px; margin-inline-end: 8px; } :host(:is(:state(--with-suffix), :--with-suffix):is(:state(--with-select), :--with-select)) .suffix { margin-inline-start: unset; } :host(:is(:state(--with-select), :--with-select)) .suffix-text { display: none; } :host(:is(:state(--outlined), :--outlined)) .label { margin-top: calc(0px - var(--_form-field-label-line-height) / 2); } :host(:is(:state(--outlined), :--outlined)) .outline { position: absolute; display: flex; pointer-events: none; left: 0; top: 0; bottom: 0; right: 0; } :host(:is(:state(--outlined), :--outlined)) .pseudo-label { visibility: hidden; margin-inline-end: 8px; font-size: var(--_form-field-label-font-size); line-height: var(--_form-field-label-line-height); letter-spacing: var(--_form-field-label-tracking); max-width: 100%; transition-property: max-width, margin-inline-end; transition-duration: 1ms; } :host( :is(:state(--required), :--required):not([hide-required-marker]):not(:is(:state(--with-label), :--with-label)) ) .pseudo-label, :host( :is(:state(--required), :--required):not([hide-required-marker]):not(:is(:state(--with-label), :--with-label)) ) .required-marker { display: none; } :host(:is(:state(--outlined), :--outlined):is(:state(--required), :--required):not([hide-required-marker])) .pseudo-label { margin-inline-end: 4px; } :host( :is(:state(--outlined), :--outlined):is(:state(--float-label-auto), :--float-label-auto):not( :is(:state(--float-label), :--float-label) ) ) .pseudo-label { max-width: 0; margin-inline-end: 0px; transition-delay: ${DesignToken.motion.duration.short2}; } :host(:is(:state(--outlined), :--outlined)) .outline-start, :host(:is(:state(--outlined), :--outlined)) .outline-notch, :host(:is(:state(--outlined), :--outlined)) .outline-end { box-sizing: border-box; border-width: var(--_form-field-outline-size, 1px); border-color: var(--_form-field-outline-color); transition: border-color ${DesignToken.motion.duration.short4}; } :host(:is(:state(--outlined), :--outlined):not(:is(:state(--with-label), :--with-label))) .outline-notch { display: none; } :host(:is(:state(--outlined), :--outlined)) .outline-start { min-width: 12px; border-top-style: solid; border-inline-start-style: solid; border-bottom-style: solid; border-start-start-radius: var(--m3e-outlined-form-field-container-shape, ${DesignToken.shape.corner.extraSmall}); border-end-start-radius: var(--m3e-outlined-form-field-container-shape, ${DesignToken.shape.corner.extraSmall}); } :host(:is(:state(--outlined), :--outlined)) .outline-notch { border-bottom-style: solid; } :host(:is(:state(--outlined), :--outlined)) .outline-end { flex-grow: 1; min-width: 16px; border-top-style: solid; border-inline-end-style: solid; border-bottom-style: solid; border-start-end-radius: var(--m3e-outlined-form-field-container-shape, ${DesignToken.shape.corner.extraSmall}); border-end-end-radius: var(--m3e-outlined-form-field-container-shape, ${DesignToken.shape.corner.extraSmall}); } :host(:is(:state(--outlined), :--outlined):is(:state(--with-prefix), :--with-prefix)) .outline-start { min-width: calc(20px + var(--_prefix-width, 0px) + 4px); } :host(:is(:state(--outlined), :--outlined):not(:is(:state(--disabled), :--disabled))) .base:hover .outline, :host(:is(:state(--outlined), :--outlined):not(:is(:state(--disabled), :--disabled)):focus-within) .outline, :host( :is(:state(--outlined), :--outlined):not(:is(:state(--disabled), :--disabled)):is(:state(--pressed), :--pressed) ) .outline { --_form-field-outline-size: 2px; } :host(:is(:state(--outlined), :--outlined)) .subscript { margin-inline: 16px; width: calc(100% - 32px); } :host(:is(:state(--outlined), :--outlined)) .content { min-height: calc(56px + ${DesignToken.density.calc(-3)}); --_form-field-label-font-size: var( --m3e-form-field-label-font-size, ${DesignToken.typescale.standard.body.small.fontSize} ); } :host( :is(:state(--outlined), :--outlined):is(:state(--float-label-auto), :--float-label-auto):not( :is(:state(--float-label), :--float-label) ) ) .label { margin-top: unset; line-height: calc(56px + ${DesignToken.density.calc(-3)}); --_form-field-label-font-size: var( --m3e-form-field-label-font-size, ${DesignToken.typescale.standard.body.small.fontSize} ); } :host(:is(:state(--filled), :--filled)) .base { --_select-arrow-margin-top: calc( 0px - calc(16px / max(calc(0 - calc(var(--md-sys-density-scale, 0) + var(--md-sys-density-scale, 0))), 1)) ); } :host(:is(:state(--filled), :--filled)) .base::before { content: ""; box-sizing: border-box; position: absolute; pointer-events: none; top: 0; left: 0; right: 0; bottom: 0; border-bottom-style: solid; border-width: 1px; border-radius: var(--m3e-form-field-container-shape, ${DesignToken.shape.corner.extraSmallTop}); border-color: var(--_form-field-outline-color); background-color: var(--_form-field-container-color); } :host(:is(:state(--filled), :--filled):not(:is(:state(--disabled), :--disabled))) .base:hover::before, :host(:is(:state(--filled), :--filled):not(:is(:state(--disabled), :--disabled)):focus-within) .base::before, :host(:is(:state(--filled), :--filled):not(:is(:state(--disabled), :--disabled)):is(:state(--pressed), :--pressed)) .base::before { border-width: 3px; } :host(:is(:state(--filled), :--filled)) .base::after { content: ""; box-sizing: border-box; position: absolute; pointer-events: none; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--_form-field-hover-container-color); transition: background-color ${DesignToken.motion.duration.short4}; } :host(:is(:state(--filled), :--filled)) .subscript { margin-inline: 16px; width: calc(100% - 32px); } :host(:is(:state(--filled), :--filled)) .content { padding-top: calc(24px + ${DesignToken.density.calc(-3)}); margin-bottom: 8px; } :host(:is(:state(--filled), :--filled)) .label { top: max(0px, calc(8px + ${DesignToken.density.calc(-3)})); } :host( :is(:state(--filled), :--filled):is(:state(--float-label-auto), :--float-label-auto):not( :is(:state(--float-label), :--float-label) ) ) .label { top: 0px; line-height: calc(56px + ${DesignToken.density.calc(-3)} - 1px); --_form-field-label-font-size: var( --m3e-form-field-label-font-size, ${DesignToken.typescale.standard.body.small.fontSize} ); } :host(:not(:is(:state(--disabled), :--disabled)):not(:focus-within):not(:is(:state(--pressed), :--pressed))) .base:hover { --_form-field-hover-container-color: color-mix( in srgb, var(--m3e-form-field-hover-container-color, ${DesignToken.color.onSurface}) var(--m3e-form-field-hover-container-opacity, 8%), transparent ); } :host(:not(:is(:state(--disabled), :--disabled)):not(:is(:state(--invalid), :--invalid))) { color: var(--m3e-form-field-color, ${DesignToken.color.onSurface}); } :host( :is(:state(--outlined), :--outlined):not(:is(:state(--disabled), :--disabled)):not( :is(:state(--invalid), :--invalid) ) ) .base { --_form-field-outline-color: var(--m3e-form-field-outline-color, ${DesignToken.color.outline}); } :host( :is(:state(--filled), :--filled):not(:is(:state(--disabled), :--disabled)):not( :is(:state(--invalid), :--invalid) ) ) .base { --_form-field-outline-color: var(--m3e-form-field-outline-color, ${DesignToken.color.onSurfaceVariant}); } :host( :is(:state(--outlined), :--outlined):not(:is(:state(--disabled), :--disabled)):not( :is(:state(--invalid), :--invalid) ):focus-within ) .base, :host( :is(:state(--outlined), :--outlined):not(:is(:state(--disabled), :--disabled)):not( :is(:state(--invalid), :--invalid) ):is(:state(--pressed), :--pressed) ) .base, :host( :is(:state(--filled), :--filled):not(:is(:state(--disabled), :--disabled)):not( :is(:state(--invalid), :--invalid) ):focus-within ) .base, :host( :is(:state(--filled), :--filled):not(:is(:state(--disabled), :--disabled)):not( :is(:state(--invalid), :--invalid) ):is(:state(--pressed), :--pressed) ) .base { --_form-field-outline-color: var(--m3e-form-field-focused-outline-color, ${DesignToken.color.primary}); --_form-field-label-color: var(--m3e-form-field-focused-color, ${DesignToken.color.primary}); } :host(:not(:is(:state(--disabled), :--disabled))) .base { --_form-field-container-color: var( --m3e-form-field-container-color, ${DesignToken.color.surfaceContainerHighest} ); } :host(:not(:is(:state(--disabled), :--disabled)):is(:state(--invalid), :--invalid)) .base { --_form-field-label-color: var(--m3e-form-field-invalid-color, ${DesignToken.color.error}); --_form-field-outline-color: var(--m3e-form-field-invalid-color, ${DesignToken.color.error}); } :host(:not(:is(:state(--disabled), :--disabled)):is(:state(--invalid), :--invalid)) .subscript { color: var(--m3e-form-field-invalid-color, ${DesignToken.color.error}); } :host(:is(:state(--disabled), :--disabled)) { color: color-mix( in srgb, var(--m3e-form-field-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-form-field-disabled-opacity, 38%), transparent ); } :host(:is(:state(--disabled), :--disabled)) .base { --_form-field-container-color: color-mix( in srgb, var(--m3e-form-field-disabled-container-color, ${DesignToken.color.onSurface}) var(--m3e-form-field-disabled-container-opacity, 4%), transparent ); } :host(:is(:state(--no-animate), :--no-animate)) *, :host(:is(:state(--no-animate), :--no-animate)) *::before, :host(:is(:state(--no-animate), :--no-animate)) *::after { transition: none !important; } @media (forced-colors: active) { :host(:is(:state(--filled), :--filled)) .base::after { transition: none; } :host { --_form-field-outline-color: CanvasText; } :host(:is(:state(--disabled), :--disabled)) { --_form-field-input-color: GrayText; --_form-field-color: GrayText; --_form-field-label-color: GrayText; --_form-field-outline-color: GrayText; } } @media (prefers-reduced-motion) { .base::before, .prefix-text, .suffix-text, .label, .subscript, .outline-start, .outline-notch, .outline-end, .pseudo-label { transition: none !important; } }`;
__decorate([query(".base")], M3eFormFieldElement.prototype, "_base", void 0);
__decorate([query(".prefix")], M3eFormFieldElement.prototype, "_prefix", void 0);
__decorate([query(".suffix")], M3eFormFieldElement.prototype, "_suffix", void 0);
__decorate([query(".error")], M3eFormFieldElement.prototype, "_error", void 0);
__decorate([query(".hint")], M3eFormFieldElement.prototype, "_hint", void 0);
__decorate([query('slot[name="label"]')], M3eFormFieldElement.prototype, "_labelSlot", void 0);
__decorate([state()], M3eFormFieldElement.prototype, "_pseudoLabel", void 0);
__decorate([state()], M3eFormFieldElement.prototype, "_required", void 0);
__decorate([state()], M3eFormFieldElement.prototype, "_invalid", void 0);
__decorate([state()], M3eFormFieldElement.prototype, "_validationMessage", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eFormFieldElement.prototype, "variant", void 0);
__decorate([property({
  attribute: "hide-required-marker",
  type: Boolean,
  reflect: true
})], M3eFormFieldElement.prototype, "hideRequiredMarker", void 0);
__decorate([property({
  attribute: "hide-subscript",
  reflect: true,
  useDefault: true
})], M3eFormFieldElement.prototype, "hideSubscript", void 0);
__decorate([property({
  attribute: "float-label",
  reflect: true,
  useDefault: true
})], M3eFormFieldElement.prototype, "floatLabel", void 0);
__decorate([property({
  type: Boolean,
  reflect: false,
  useDefault: true
})], M3eFormFieldElement.prototype, "error", void 0);
M3eFormFieldElement = __decorate([customElement("m3e-form-field")], M3eFormFieldElement);

export { M3eFormFieldElement, findFormFieldControl, isFloatLabelType, isFormFieldControl, isFormFieldVariant, isHideSubscriptType };
//# sourceMappingURL=FormFieldElement.js.map
