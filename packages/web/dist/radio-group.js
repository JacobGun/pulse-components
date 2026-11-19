/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate, __classPrivateFieldSet } from 'tslib';
import { LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators.js';
import { Checked, Disabled, AttachInternals, Role, HoverController, PressedController, DesignToken, customElement, setCustomState } from './TextOverflowElement.js';
import { Labelled, Dirty, Touched, FormAssociated, formValue, updateLabels } from './FormAssociated.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';
import 'lit/directives/if-defined.js';
import { selectionManager, SelectionManager } from './LiveAnnouncer.js';
import { ConstraintValidation } from './ConstraintValidation.js';
import { Required } from './Required.js';
import { RequiredConstraintValidation } from './RequiredConstraintValidation.js';
import { M3eDirectionality } from './Directionality.js';

var _M3eRadioElement_instances, _M3eRadioElement_clickHandler, _M3eRadioElement_hoverController, _M3eRadioElement_pressedController, _M3eRadioElement_renderIcon, _M3eRadioElement_handleClick, _M3eRadioElement_notifySelectionChange;
/**
 * A radio button that allows a user to select one option from a set of options.
 *
 * @description
 * The `m3e-radio` component represents a radio button that enables users to select an options from a set.
 * It supports selection from mutually exclusive options, emitting `input` and `change` events when its state updates.
 * The component reflects its state through customizable CSS properties for hover, focus, ripple, and icon styling—
 * adapting dynamically based on whether it is selected, unselected, or disabled.
 *
 * Attributes like `checked`, `disabled`, and `value` control its behavior and accessibility, while its visual
 * presentation can be tuned via design tokens such as `--m3e-radio-container-size` and `--m3e-radio-icon-size`.
 *
 * @example
 * The following example illustrates using `m3e-radio-group` and `m3e-radio` to present a group of options.
 * ```html
 * <label for="rdg1">Radio group</label>
 * <br />
 * <m3e-radio-group id="rdg1">
 *  <label><m3e-radio value="1"></m3e-radio> Value 1</label>
 *  <label><m3e-radio value="2"></m3e-radio> Value 2</label>
 *  <label><m3e-radio value="3"></m3e-radio> Value 3</label>
 *  <label><m3e-radio value="4"></m3e-radio> Value 4</label>
 * </m3e-radio-group>
 * ```
 *
 * @tag m3e-radio
 *
 * @attr checked - Whether the element is checked.
 * @attr disabled - Whether the element is disabled.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr required - Whether the element is required.
 * @attr value - A string representing the value of the radio.
 *
 * @fires beforeinput - Dispatched before the checked state changes.
 * @fires input - Dispatched when the checked state changes.
 * @fires change - Dispatched when the checked state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-radio-container-size - Base size of the radio button container.
 * @cssprop --m3e-radio-icon-size - Size of the radio icon inside the wrapper.
 * @cssprop --m3e-radio-unselected-hover-color - Hover state layer color when radio is not selected.
 * @cssprop --m3e-radio-unselected-focus-color - Focus state layer color when radio is not selected.
 * @cssprop --m3e-radio-unselected-ripple-color - Ripple color when radio is not selected.
 * @cssprop --m3e-radio-unselected-icon-color - Icon color when radio is not selected.
 * @cssprop --m3e-radio-selected-hover-color - Hover state layer color when radio is selected.
 * @cssprop --m3e-radio-selected-focus-color - Focus state layer color when radio is selected.
 * @cssprop --m3e-radio-selected-ripple-color - Ripple color when radio is selected.
 * @cssprop --m3e-radio-selected-icon-color - Icon color when radio is selected.
 * @cssprop --m3e-radio-disabled-icon-color - Icon color when radio is disabled.
 * @cssprop --m3e-radio-error-hover-color - Fallback hover color used when the radio is invalid and touched.
 * @cssprop --m3e-radio-error-focus-color - Fallback focus color used when the radio is invalid and touched.
 * @cssprop --m3e-radio-error-ripple-color - Fallback ripple color used when the radio is invalid and touched.
 * @cssprop --m3e-radio-error-icon-color - Fallback icon color used when the radio is invalid and touched.
 */
let M3eRadioElement = class M3eRadioElement extends Labelled(Dirty(Touched(Checked(KeyboardClick(Focusable(FormAssociated(Disabled(AttachInternals(Role(LitElement, "radio"), true))))))))) {
  constructor() {
    super(...arguments);
    _M3eRadioElement_instances.add(this);
    /** @private */
    _M3eRadioElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eRadioElement_instances, "m", _M3eRadioElement_handleClick).call(this, e));
    /** @private */
    _M3eRadioElement_hoverController.set(this, new HoverController(this, {
      target: null,
      callback: hovering => {
        if (this.disabled) return;
        if (hovering) {
          this._stateLayer?.show("hover");
        } else {
          this._stateLayer?.hide("hover");
        }
      }
    }));
    /** @private */
    _M3eRadioElement_pressedController.set(this, new PressedController(this, {
      target: null,
      minPressedDuration: 225,
      callback: pressed => {
        if (this.disabled) return;
        if (pressed) {
          this._ripple?.show(0, 0, true);
        } else {
          this._ripple?.hide();
        }
      }
    }));
    /**
     * A string representing the value of the radio.
     * @default "on"
     */
    this.value = "on";
  }
  /** @inheritdoc @internal */
  get [(_M3eRadioElement_clickHandler = new WeakMap(), _M3eRadioElement_hoverController = new WeakMap(), _M3eRadioElement_pressedController = new WeakMap(), _M3eRadioElement_instances = new WeakSet(), formValue)]() {
    return this.checked && !this.disabled ? this.value : null;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eRadioElement_clickHandler, "f"));
    for (const label of this.labels) {
      __classPrivateFieldGet(this, _M3eRadioElement_hoverController, "f").observe(label);
      __classPrivateFieldGet(this, _M3eRadioElement_pressedController, "f").observe(label);
    }
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eRadioElement_clickHandler, "f"));
    for (const label of this.labels) {
      __classPrivateFieldGet(this, _M3eRadioElement_hoverController, "f").unobserve(label);
      __classPrivateFieldGet(this, _M3eRadioElement_pressedController, "f").unobserve(label);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("checked")) {
      __classPrivateFieldGet(this, _M3eRadioElement_instances, "m", _M3eRadioElement_notifySelectionChange).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" centered ?disabled="${this.disabled}"></m3e-ripple><div class="touch" aria-hidden="true"></div><div class="wrapper" aria-hidden="true">${__classPrivateFieldGet(this, _M3eRadioElement_instances, "m", _M3eRadioElement_renderIcon).call(this)}</div></div>`;
  }
};
_M3eRadioElement_renderIcon = function _M3eRadioElement_renderIcon() {
  return html`<svg viewBox="0 0 20 20"><mask id="cutout2"><rect width="100%" height="100%" fill="white"></rect><circle cx="10" cy="10" r="8" fill="black"></circle></mask><circle class="outer circle" cx="10" cy="10" r="10" mask="url(#cutout2)"></circle><circle class="inner circle" cx="10" cy="10" r="5"></circle></svg>`;
};
_M3eRadioElement_handleClick = function _M3eRadioElement_handleClick(e) {
  if (e.defaultPrevented || this.checked) return;
  if (this.disabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    this.checked = true;
    __classPrivateFieldGet(this, _M3eRadioElement_instances, "m", _M3eRadioElement_notifySelectionChange).call(this);
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  // Prevent default avoids double-click in FireFox.
  if (this.closest("label")) {
    e.preventDefault();
  }
};
_M3eRadioElement_notifySelectionChange = function _M3eRadioElement_notifySelectionChange() {
  const group = this.closest("m3e-radio-group");
  if (group) {
    group[selectionManager].notifySelectionChange(this);
  } else if (this.name && this.checked) {
    // Uncheck any sibling radios of the same name which are also checked.
    [...(this.getRootNode()?.querySelectorAll(`m3e-radio[name="${this.name}"]`) ?? [])].filter(x => x !== this && x.checked).forEach(x => x.checked = false);
  }
};
/** The styles of the element. */
M3eRadioElement.styles = css`:host { display: inline-block; outline: none; width: fit-content; height: fit-content; vertical-align: middle; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); line-height: 0; } :host([hidden]) { display: none; } :host(:not([aria-disabled="true"])) { cursor: pointer; } .base { contain: layout style; box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; border-radius: 50%; width: calc(var(--m3e-radio-container-size, 40px) + ${DesignToken.density.calc(-3)}); height: calc(var(--m3e-radio-container-size, 40px) + ${DesignToken.density.calc(-3)}); } .touch { position: absolute; height: 48px; width: 48px; margin: auto; } .wrapper { box-sizing: border-box; pointer-events: none; width: var(--m3e-radio-icon-size, 20px); height: var(--m3e-radio-icon-size, 20px); } .circle { fill: currentColor; } :host(:not([checked])) .circle.inner { opacity: 0; } :host(:not([checked])) .base { --m3e-state-layer-hover-color: var(--m3e-radio-unselected-hover-color, ${DesignToken.color.onSurface}); --m3e-state-layer-focus-color: var(--m3e-radio-unselected-focus-color, ${DesignToken.color.onSurface}); --m3e-ripple-color: var(--m3e-radio-unselected-ripple-color, ${DesignToken.color.onSurface}); color: var(--m3e-radio-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}); } :host([checked]) .base { --m3e-state-layer-hover-color: var(--m3e-radio-selected-hover-color, ${DesignToken.color.primary}); --m3e-state-layer-focus-color: var(--m3e-radio-selected-focus-color, ${DesignToken.color.primary}); --m3e-ripple-color: var(--m3e-radio-selected-ripple-color, ${DesignToken.color.primary}); color: var(--m3e-radio-selected-icon-color, ${DesignToken.color.primary}); } :host([aria-disabled="true"]) .base { color: color-mix(in srgb, var(--m3e-radio-disabled-icon-color, ${DesignToken.color.onSurface}) 38%, transparent); } :host(:is(:state(--touched), :--touched):is(:state(--invalid), :--invalid)) .base { --m3e-state-layer-hover-color: var(--m3e-radio-error-hover-color, ${DesignToken.color.error}); --m3e-state-layer-focus-color: var(--m3e-radio-error-focus-color, ${DesignToken.color.error}); --m3e-ripple-color: var(--m3e-radio-error-ripple-color, ${DesignToken.color.error}); color: var(--m3e-radio-error-icon-color, ${DesignToken.color.error}); } @media (forced-colors: active) { :host(:not([checked])) .base, :host([checked]) .base { --m3e-state-layer-hover-color: var(--_radio-forced-color, CanvasText); --m3e-state-layer-focus-color: var(--_radio-forced-color, CanvasText); --m3e-ripple-color: var(--_radio-forced-color, CanvasText); color: var(--_radio-forced-color, CanvasText); } :host([aria-disabled="true"]) .base { color: GrayText; } :host(:is(:state(--touched), :--touched):is(:state(--invalid), :--invalid)) .base { --_radio-forced-color: Highlight; color: Highlight; } }`;
__decorate([query(".focus-ring")], M3eRadioElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eRadioElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eRadioElement.prototype, "_ripple", void 0);
__decorate([property()], M3eRadioElement.prototype, "value", void 0);
M3eRadioElement = __decorate([customElement("m3e-radio")], M3eRadioElement);

var _M3eRadioGroupElement_instances, _M3eRadioGroupElement_directionalitySubscription, _M3eRadioGroupElement_focusOutHandler, _M3eRadioGroupElement_handleSlotChange, _M3eRadioGroupElement_handleKeyDown, _M3eRadioGroupElement_handleChange, _a;
/**
 * A container for a set of radio buttons.
 *
 * @description
 * The `m3e-radio-group` component is a semantic container that orchestrates a set of `m3e-radio` elements.
 * It provides accessible grouping, keyboard navigation, and validation logic for mutually exclusive selection.
 * When marked as `required`, the group enforces selection constraints and reflects validation state, while
 * delegating form submission to the checked radio. The group does not submit a value itself—it coordinates
 * behavior, focus, and feedback across its radios.
 *
 * @example
 * The following example illustrates using `m3e-radio-group` and `m3e-radio` to present a group of options.
 * ```html
 * <label for="rdg1">Radio group</label>
 * <br />
 * <m3e-radio-group id="rdg1">
 *  <label><m3e-radio value="1"></m3e-radio> Value 1</label>
 *  <label><m3e-radio value="2"></m3e-radio> Value 2</label>
 *  <label><m3e-radio value="3"></m3e-radio> Value 3</label>
 *  <label><m3e-radio value="4"></m3e-radio> Value 4</label>
 * </m3e-radio-group>
 * ```
 *
 * @tag m3e-radio-group
 *
 * @slot - Renders the radio buttons of the group.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr required - Whether the element is required.
 *
 * @fires beforeinput - Dispatched before the checked state of a radio button changes.
 * @fires input - Dispatched when the checked state of a radio button changes.
 * @fires change - Dispatched when the checked state of a radio button changes.
 */
let M3eRadioGroupElement = class M3eRadioGroupElement extends Labelled(RequiredConstraintValidation(Dirty(Touched(Required(ConstraintValidation(FormAssociated(Disabled(AttachInternals(Role(LitElement, "radiogroup")), true, false)))))))) {
  constructor() {
    super(...arguments);
    _M3eRadioGroupElement_instances.add(this);
    /** @private */
    _M3eRadioGroupElement_directionalitySubscription.set(this, void 0);
    /** @private */
    _M3eRadioGroupElement_focusOutHandler.set(this, () => __classPrivateFieldGet(this, _M3eRadioGroupElement_instances, "m", _M3eRadioGroupElement_handleChange).call(this));
    /** @internal */
    this[_a] = new SelectionManager().withWrap().withDirectionality(M3eDirectionality.current).onActiveItemChange(() => {
      this[selectionManager].activeItem?.click();
    });
  }
  /** The list of attributes corresponding to the registered properties. */
  static get observedAttributes() {
    return [...super.observedAttributes, "aria-invalid"];
  }
  /** The radios in the group. */
  get radios() {
    return this[selectionManager]?.items ?? [];
  }
  /** The selected radio. */
  get selected() {
    return this[selectionManager]?.selectedItems[0] ?? null;
  }
  /** The selected value of the radio group. */
  get value() {
    return this.selected?.value ?? null;
  }
  /** @inheritdoc */
  markAsTouched() {
    super.markAsTouched();
    this.radios.forEach(x => x.markAsTouched());
  }
  /** @inheritdoc */
  markAsUntouched() {
    super.markAsUntouched();
    this.radios.forEach(x => x.markAsUntouched());
  }
  /** @inheritdoc */
  markAsDirty() {
    super.markAsDirty();
    this.radios.forEach(x => x.markAsDirty());
  }
  /** @inheritdoc */
  markAsPristine() {
    super.markAsPristine();
    this.radios.forEach(x => x.markAsPristine());
  }
  /** Synchronizes property values when attributes change. */
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case "name":
        this.radios.forEach(x => x.name = this.name);
        break;
      case "aria-invalid":
        this.radios.forEach(x => {
          setCustomState(x, "--invalid", newValue === "true");
          x[updateLabels]?.();
        });
        break;
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("focusout", __classPrivateFieldGet(this, _M3eRadioGroupElement_focusOutHandler, "f"));
    __classPrivateFieldSet(this, _M3eRadioGroupElement_directionalitySubscription, M3eDirectionality.observe(() => this[selectionManager].directionality = M3eDirectionality.current), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("focusout", __classPrivateFieldGet(this, _M3eRadioGroupElement_focusOutHandler, "f"));
    __classPrivateFieldGet(this, _M3eRadioGroupElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("disabled") && (changedProperties.get("disabled") !== undefined || this.disabled)) {
      this[selectionManager].disabled = this.disabled;
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eRadioGroupElement_instances, "m", _M3eRadioGroupElement_handleSlotChange)}" @keydown="${__classPrivateFieldGet(this, _M3eRadioGroupElement_instances, "m", _M3eRadioGroupElement_handleKeyDown)}" @change="${__classPrivateFieldGet(this, _M3eRadioGroupElement_instances, "m", _M3eRadioGroupElement_handleChange)}"></slot>`;
  }
};
_M3eRadioGroupElement_directionalitySubscription = new WeakMap();
_M3eRadioGroupElement_focusOutHandler = new WeakMap();
_M3eRadioGroupElement_instances = new WeakSet();
_a = selectionManager;
_M3eRadioGroupElement_handleSlotChange = function _M3eRadioGroupElement_handleSlotChange() {
  const {
    added
  } = this[selectionManager].setItems([...this.querySelectorAll("m3e-radio")]);
  added.forEach(x => x.name = x.name || this.name);
};
_M3eRadioGroupElement_handleKeyDown = function _M3eRadioGroupElement_handleKeyDown(e) {
  this[selectionManager].onKeyDown(e);
};
_M3eRadioGroupElement_handleChange = function _M3eRadioGroupElement_handleChange() {
  this.checkValidity();
};
/** The styles of the element. */
M3eRadioGroupElement.styles = css`:host { display: inline-flex; } :host([hidden]) { display: none; }`;
M3eRadioGroupElement = __decorate([customElement("m3e-radio-group")], M3eRadioGroupElement);

export { M3eRadioElement, M3eRadioGroupElement };
//# sourceMappingURL=radio-group.js.map
