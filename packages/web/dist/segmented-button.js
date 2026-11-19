/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate, __classPrivateFieldSet } from 'tslib';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { query, property } from 'lit/decorators.js';
import { Checked, Disabled, AttachInternals, Role, DesignToken, setCustomState, customElement } from './TextOverflowElement.js';
import { Dirty, Touched, Labelled, FormAssociated, formValue } from './FormAssociated.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import 'lit/directives/if-defined.js';
import { selectionManager, SelectionManager } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';

var _M3eButtonSegmentElement_instances, _M3eButtonSegmentElement_clickHandler, _M3eButtonSegmentElement_handleIconSlotChange, _M3eButtonSegmentElement_handleClick;
var M3eButtonSegmentElement_1;
/**
 * A option that can be selected within a segmented button.
 *
 * @description
 * The `m3e-button-segment` component represents a single selectable option within a segmented button group.
 * It behaves like a toggle-able button, supporting icon and label content, selection state, and accessibility
 * roles. Segments are visually unified but independently interactive, adapting shape, color, and ripple feedback
 * based on their position and state.
 *
 * @example
 * The following example illustrates a single-select segmented button with four segments.
 * ```html
 * <m3e-segmented-button>
 *  <m3e-button-segment checked>8 oz</m3e-button-segment>
 *  <m3e-button-segment>12 oz</m3e-button-segment>
 *  <m3e-button-segment>16 oz</m3e-button-segment>
 *  <m3e-button-segment>20 oz</m3e-button-segment>
 * </m3e-segmented-button>
 * ```
 * @example
 * The next example illustrates a multiselect segmented button designated using the `multi` attribute.
 * ```html
 * <m3e-segmented-button multi>
 *  <m3e-button-segment checked>$</m3e-button-segment>
 *  <m3e-button-segment checked>$$</m3e-button-segment>
 *  <m3e-button-segment>$$$</m3e-button-segment>
 *  <m3e-button-segment>$$$$</m3e-button-segment>
 * </m3e-segmented-button>
 * ```
 *
 * @tag m3e-button-segment
 *
 * @slot - Renders the label of the option.
 * @slot icon - Renders an icon before the option's label.
 *
 * @attr checked - Whether the element is checked.
 * @attr disabled - Whether the element is disabled.
 * @attr value - A string representing the value of the segment.
 *
 * @fires beforeinput - Dispatched before the checked state changes.
 * @fires input - Dispatched when the checked state changes.
 * @fires change - Dispatched when the checked state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-segmented-button-height - Total height of the segmented button.
 * @cssprop --m3e-segmented-button-outline-thickness - Thickness of the button's border.
 * @cssprop --m3e-segmented-button-outline-color - Color of the button's border.
 * @cssprop --m3e-segmented-button-padding-start - Padding on the leading edge of the button content.
 * @cssprop --m3e-segmented-button-padding-end - Padding on the trailing edge of the button content.
 * @cssprop --m3e-segmented-button-spacing - Horizontal gap between icon and label.
 * @cssprop --m3e-segmented-button-font-size - Font size of the label text.
 * @cssprop --m3e-segmented-button-font-weight - Font weight of the label text.
 * @cssprop --m3e-segmented-button-line-height - Line height of the label text.
 * @cssprop --m3e-segmented-button-tracking - Letter spacing of the label text.
 * @cssprop --m3e-segmented-button-with-icon-padding-start - Leading padding when an icon is present.
 * @cssprop --m3e-segmented-button-selected-container-color - Background color of a selected segment.
 * @cssprop --m3e-segmented-button-selected-container-hover-color - Hover state-layer color for selected segments.
 * @cssprop --m3e-segmented-button-selected-container-focus-color - Focus state-layer color for selected segments.
 * @cssprop --m3e-segmented-button-selected-ripple-color - Ripple color for selected segments.
 * @cssprop --m3e-segmented-button-selected-label-text-color - Label text color for selected segments.
 * @cssprop --m3e-segmented-button-selected-icon-color - Icon color for selected segments.
 * @cssprop --m3e-segmented-button-unselected-container-hover-color - Hover state-layer color for unselected segments.
 * @cssprop --m3e-segmented-button-unselected-container-focus-color - Focus state-layer color for unselected segments.
 * @cssprop --m3e-segmented-button-unselected-ripple-color - Ripple color for unselected segments.
 * @cssprop --m3e-segmented-button-unselected-label-text-color - Label text color for unselected segments.
 * @cssprop --m3e-segmented-button-unselected-icon-color - Icon color for unselected segments.
 * @cssprop --m3e-segmented-button-icon-size - Font size of the icon.
 * @cssprop --m3e-segmented-button-disabled-outline-color - Base color for disabled segment borders.
 * @cssprop --m3e-segmented-button-disabled-outline-opacity - Opacity applied to disabled segment borders.
 * @cssprop --m3e-segmented-button-disabled-label-text-color - Base color for disabled label text.
 * @cssprop --m3e-segmented-button-disabled-label-text-opacity - Opacity applied to disabled label text.
 * @cssprop --m3e-segmented-button-disabled-icon-color - Base color for disabled icons.
 * @cssprop --m3e-segmented-button-disabled-icon-opacity - Opacity applied to disabled icons.
 */
let M3eButtonSegmentElement = M3eButtonSegmentElement_1 = class M3eButtonSegmentElement extends Dirty(Touched(Checked(Disabled(AttachInternals(Role(LitElement, "radio"), true))))) {
  constructor() {
    super(...arguments);
    _M3eButtonSegmentElement_instances.add(this);
    /** @private */
    _M3eButtonSegmentElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eButtonSegmentElement_instances, "m", _M3eButtonSegmentElement_handleClick).call(this, e));
    /**
     * A string representing the value of the segment.
     * @default "on"
     */
    this.value = "on";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eButtonSegmentElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eButtonSegmentElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  update(changedProperties) {
    const segmentedButton = this.closest("m3e-segmented-button");
    if (segmentedButton) {
      this.role = segmentedButton.multi ? "button" : "radio";
    }
    super.update(changedProperties);
    if (changedProperties.has("checked")) {
      segmentedButton?.[selectionManager].notifySelectionChange(this);
      segmentedButton?.requestUpdate();
    }
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        if (this.nextElementSibling instanceof M3eButtonSegmentElement_1) {
          if (!this.nextElementSibling.disabled) {
            this.style.setProperty("--_segmented-button-disabled-outline-color", `var(--m3e-segmented-button-outline-color, ${DesignToken.color.outline})`);
          } else {
            this.style.removeProperty("--_segmented-button-disabled-outline-color");
          }
        }
      } else {
        this.style.removeProperty("--_segmented-button-disabled-outline-color");
        if (this.previousElementSibling instanceof M3eButtonSegmentElement_1) {
          if (this.previousElementSibling.disabled) {
            this.previousElementSibling.style.setProperty("--_segmented-button-disabled-outline-color", `var(--m3e-segmented-button-outline-color, ${DesignToken.color.outline})`);
          } else {
            this.previousElementSibling.style.removeProperty("--_segmented-button-disabled-outline-color");
          }
        }
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div class="touch" aria-hidden="true"></div><div class="wrapper"><div class="icon" aria-hidden="true"><svg class="check" viewBox="0 -960 960 960"><path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg><slot name="icon" @slotchange="${__classPrivateFieldGet(this, _M3eButtonSegmentElement_instances, "m", _M3eButtonSegmentElement_handleIconSlotChange)}"></slot></div><div class="label"><slot></slot></div></div></div>`;
  }
};
_M3eButtonSegmentElement_clickHandler = new WeakMap();
_M3eButtonSegmentElement_instances = new WeakSet();
_M3eButtonSegmentElement_handleIconSlotChange = function _M3eButtonSegmentElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eButtonSegmentElement_handleClick = function _M3eButtonSegmentElement_handleClick(e) {
  if (e.defaultPrevented) return;
  const segmentedButton = this.closest("m3e-segmented-button");
  if (this.disabled || segmentedButton?.disabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  if (segmentedButton && (segmentedButton.multi || !this.checked)) {
    if (this.dispatchEvent(new Event("beforeinput", {
      bubbles: true,
      cancelable: true
    }))) {
      this.checked = !this.checked;
      this.closest("m3e-segmented-button")?.[selectionManager].notifySelectionChange(this);
      this.dispatchEvent(new Event("input", {
        bubbles: true
      }));
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  }
};
/** The styles of the element. */
M3eButtonSegmentElement.styles = css`:host { display: inline-block; position: relative; vertical-align: middle; outline: none; user-select: none; flex: 1 1 auto; min-width: 0; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { position: relative; display: inline-flex; vertical-align: middle; align-items: center; width: 100%; height: calc(var(--m3e-segmented-button-height, 40px) + ${DesignToken.density.calc(-3)}); line-height: 1; box-sizing: border-box; border-width: var(--m3e-segmented-button-outline-thickness, 1px); border-color: var(--m3e-segmented-button-outline-color, ${DesignToken.color.outline}); border-style: solid; border-radius: inherit; border-inline-start-style: var(--_segmented-button-left-border, solid); transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .touch { position: absolute; height: 48px; left: 0; right: 0; } .wrapper { width: 100%; overflow: hidden; display: inline-flex; align-items: center; padding-inline-start: var(--m3e-segmented-button-padding-start, ${DesignToken.measurement.space200}); padding-inline-end: var(--m3e-segmented-button-padding-end, ${DesignToken.measurement.space200}); column-gap: var(--m3e-segmented-button-spacing, ${DesignToken.measurement.space100}); } .label { font-size: var(--m3e-segmented-button-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-segmented-button-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-segmented-button-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-segmented-button-tracking, ${DesignToken.typescale.standard.label.large.tracking}); justify-self: center; flex: 1 1 auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .icon { display: flex; align-items: center; justify-content: center; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host(:not(:disabled)) { cursor: pointer; } :host([checked]:not(:is(:state(--hide-selection), :--hide-selection))) .wrapper, :host(:is(:state(--with-icon), :--with-icon)) .wrapper { padding-inline-start: var(--m3e-segmented-button-with-icon-padding-start, ${DesignToken.measurement.space150}); } :host(:not(:disabled)[checked]) .base { background-color: var(--m3e-segmented-button-selected-container-color, ${DesignToken.color.secondaryContainer}); --m3e-state-layer-hover-color: var( --m3e-segmented-button-selected-container-hover-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-segmented-button-selected-container-focus-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-ripple-color: var(--m3e-segmented-button-selected-ripple-color, ${DesignToken.color.onSecondaryContainer}); } :host(:not(:disabled)[checked]) .label { color: var(--m3e-segmented-button-selected-label-text-color, ${DesignToken.color.onSecondaryContainer}); } :host(:not(:disabled)[checked]) .icon { color: var(--m3e-segmented-button-selected-icon-color, ${DesignToken.color.onSecondaryContainer}); } :host(:not(:disabled):not([checked])) .base { --m3e-state-layer-hover-color: var( --m3e-segmented-button-unselected-container-hover-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-focus-color: var( --m3e-segmented-button-unselected-container-focus-color, ${DesignToken.color.onSurface} ); --m3e-ripple-color: var(--m3e-segmented-button-unselected-ripple-color, ${DesignToken.color.onSurface}); } :host(:not(:disabled):not([checked])) .label { color: var(--m3e-segmented-button-unselected-label-text-color, ${DesignToken.color.onSurface}); } :host(:not(:disabled):not([checked])) .icon { color: var(--m3e-segmented-button-unselected-icon-color, ${DesignToken.color.onSurface}); } :host(:not(:is(:state(--with-icon), :--with-icon))) .icon { margin-inline-start: calc(0px - var(--m3e-segmented-button-spacing, ${DesignToken.measurement.space100})); transition: margin-inline-start ${DesignToken.motion.spring.fastEffects}; } .check, ::slotted([slot="icon"]) { width: 1em; font-size: var(--m3e-segmented-button-icon-size, 18px) !important; } :host(:not([checked])) .check, :host(:is(:state(--hide-selection), :--hide-selection)) .check, :host(:is(:state(--hide-selection), :--hide-selection):not(:is(:state(--with-icon), :--with-icon))) .icon { display: none; } :host([checked]) .icon { margin-inline-start: 0; } :host([checked]:not(:is(:state(--hide-selection), :--hide-selection))) ::slotted([slot="icon"]) { display: none !important; } :host(:disabled) .base { border-color: color-mix( in srgb, var(--m3e-segmented-button-disabled-outline-color, ${DesignToken.color.onSurface}) var(--m3e-segmented-button-disabled-outline-opacity, 12%), transparent ); border-inline-end-color: var( --_segmented-button-disabled-outline-color, color-mix( in srgb, var(--m3e-segmented-button-disabled-outline-color, ${DesignToken.color.onSurface}) var(--m3e-segmented-button-disabled-outline-opacity, 12%), transparent ) ); } :host(:disabled) .label { color: color-mix( in srgb, var(--m3e-segmented-button-disabled-label-text-color, ${DesignToken.color.onSurface}) var(--m3e-segmented-button-disabled-label-text-opacity, 38%), transparent ); } :host(:disabled) .icon { color: color-mix( in srgb, var(--m3e-segmented-button-disabled-icon-color, ${DesignToken.color.onSurface}) var(--m3e-segmented-button-disabled-icon-opacity, 38%), transparent ); } @media (prefers-reduced-motion) { .base, .icon, .label { transition: none; } } @media (forced-colors: active) { .base, .icon, .label { transition: none !important; } :host(:disabled) .label, :host(:disabled) .icon { color: GrayText; } :host(:not([selected]):not(:disabled)) .label, :host(:not([selected]):not(:disabled)) .icon { color: ButtonText; } :host(:not(:disabled)[checked]) .base { background-color: ButtonText; } :host(:not(:disabled)[checked]) .label, :host(:not(:disabled)[checked]) .icon { forced-color-adjust: none; color: ButtonFace; } :host { --m3e-segmented-button-outline-color: ButtonText; } }`;
__decorate([query(".focus-ring")], M3eButtonSegmentElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eButtonSegmentElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eButtonSegmentElement.prototype, "_ripple", void 0);
__decorate([property()], M3eButtonSegmentElement.prototype, "value", void 0);
M3eButtonSegmentElement = M3eButtonSegmentElement_1 = __decorate([customElement("m3e-button-segment")], M3eButtonSegmentElement);

var _M3eSegmentedButtonElement_instances, _M3eSegmentedButtonElement_directionalitySubscription, _M3eSegmentedButtonElement_handleSlotChange, _M3eSegmentedButtonElement_handleKeyDown, _M3eSegmentedButtonElement_handleChange, _a;
/**
 * A button that allows a user to select from a limited set of options.
 *
 * @description
 * The `m3e-segmented-button` component allows users to select one or more options from a horizontal group.
 * Each segment behaves like a toggle-able button, supporting icon and label content, selection state, and
 * accessibility roles. Built with Material Design 3 principles, it adapts shape, color, and ripple feedback
 * based on interaction state and input modality. Segments are visually unified but independently interactive.
 *
 * @example
 * The following example illustrates a single-select segmented button with four segments.
 * ```html
 * <m3e-segmented-button>
 *  <m3e-button-segment checked>8 oz</m3e-button-segment>
 *  <m3e-button-segment>12 oz</m3e-button-segment>
 *  <m3e-button-segment>16 oz</m3e-button-segment>
 *  <m3e-button-segment>20 oz</m3e-button-segment>
 * </m3e-segmented-button>
 * ```
 * @example
 * The next example illustrates a multiselect segmented button designated using the `multi` attribute.
 * ```html
 * <m3e-segmented-button multi>
 *  <m3e-button-segment checked>$</m3e-button-segment>
 *  <m3e-button-segment checked>$$</m3e-button-segment>
 *  <m3e-button-segment>$$$</m3e-button-segment>
 *  <m3e-button-segment>$$$$</m3e-button-segment>
 * </m3e-segmented-button>
 * ```
 *
 * @tag m3e-segmented-button
 *
 * @slot - Renders the segments of the button.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr hide-selection-indicator - Whether to hide the selection indicator.
 * @attr multi - Whether multiple options can be selected.
 * @attr name - The name that identifies the element when submitting the associated form.
 *
 * @fires beforeinput - Dispatched before the checked state of a segment changes.
 * @fires input - Dispatched when the checked state of a segment changes.
 * @fires change - Dispatched when the checked state of a segment changes.
 *
 * @cssprop --m3e-segmented-button-start-shape - Border radius for the first segment in a segmented button.
 * @cssprop --m3e-segmented-button-end-shape - Border radius for the last segment in a segmented button.
 */
let M3eSegmentedButtonElement = class M3eSegmentedButtonElement extends Labelled(Dirty(Touched(FormAssociated(Disabled(AttachInternals(Role(LitElement, "radiogroup"))))))) {
  constructor() {
    super(...arguments);
    _M3eSegmentedButtonElement_instances.add(this);
    /** @private */
    _M3eSegmentedButtonElement_directionalitySubscription.set(this, void 0);
    /** @internal */
    this[_a] = new SelectionManager().withWrap().withDirectionality(M3eDirectionality.current).onActiveItemChange(() => this[selectionManager].activeItem?.click());
    /**
     * Whether multiple options can be selected.
     * @default false
     */
    this.multi = false;
    /**
     * Whether to hide the selection indicator.
     * @default false
     */
    this.hideSelectionIndicator = false;
  }
  /** The segments of the button. */
  get segments() {
    return this[selectionManager]?.items ?? [];
  }
  /** The selected segment(s) of the button. */
  get selected() {
    return this[selectionManager]?.selectedItems ?? [];
  }
  /** The selected (enabled) value(s) of the button. */
  get value() {
    const values = this.selected.filter(x => !x.disabled).map(x => x.value);
    switch (values.length) {
      case 0:
        return null;
      case 1:
        return values[0];
      default:
        return values;
    }
  }
  /** @inheritdoc @internal */
  get [(_M3eSegmentedButtonElement_directionalitySubscription = new WeakMap(), _M3eSegmentedButtonElement_instances = new WeakSet(), _a = selectionManager, formValue)]() {
    const values = this.value;
    if (Array.isArray(values)) {
      const data = new FormData();
      for (const value of values) {
        data.append(this.name, value);
      }
      return data;
    }
    return values;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this[selectionManager].multi = this.multi;
    this[selectionManager].disableRovingTabIndex(this.multi);
    __classPrivateFieldSet(this, _M3eSegmentedButtonElement_directionalitySubscription, M3eDirectionality.observe(() => this[selectionManager].directionality = M3eDirectionality.current), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eSegmentedButtonElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("disabled") && (changedProperties.get("disabled") !== undefined || this.disabled)) {
      this[selectionManager].disabled = this.disabled;
    }
    if (changedProperties.has("multi")) {
      this.role = this.multi ? "group" : "radiogroup";
      this[selectionManager].multi = this.multi;
      this[selectionManager].disableRovingTabIndex(this.multi);
      this[selectionManager].items.forEach(x => {
        if (this.multi) {
          x.role = "button";
          x.ariaPressed = `${x.checked}`;
          x.ariaSelected = x.ariaChecked = null;
        } else {
          x.role = "radio";
          x.ariaChecked = `${x.checked}`;
          x.ariaPressed = x.ariaSelected = null;
        }
      });
    }
    if (changedProperties.has("multi") || changedProperties.has("disabled")) {
      // aria-disabled is not supported on radiogroup roles.
      this.ariaDisabled = this.multi && this.disabled ? "true" : null;
    }
    if (changedProperties.has("hideSelectionIndicator")) {
      this.segments.forEach(x => setCustomState(x, "--hide-selection", this.hideSelectionIndicator));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eSegmentedButtonElement_instances, "m", _M3eSegmentedButtonElement_handleSlotChange)}" @keydown="${__classPrivateFieldGet(this, _M3eSegmentedButtonElement_instances, "m", _M3eSegmentedButtonElement_handleKeyDown)}" @change="${__classPrivateFieldGet(this, _M3eSegmentedButtonElement_instances, "m", _M3eSegmentedButtonElement_handleChange)}"></slot>`;
  }
};
_M3eSegmentedButtonElement_handleSlotChange = function _M3eSegmentedButtonElement_handleSlotChange() {
  const {
    added
  } = this[selectionManager].setItems([...this.querySelectorAll("m3e-button-segment")]);
  added.forEach(x => setCustomState(x, "--hide-selection", this.hideSelectionIndicator));
  this[selectionManager].items.forEach((segment, i) => {
    setCustomState(segment, "--first", i == 0);
    setCustomState(segment, "--last", i == this[selectionManager].items.length - 1);
  });
};
_M3eSegmentedButtonElement_handleKeyDown = function _M3eSegmentedButtonElement_handleKeyDown(e) {
  if (!this.multi) {
    this[selectionManager].onKeyDown(e);
  }
};
_M3eSegmentedButtonElement_handleChange = function _M3eSegmentedButtonElement_handleChange(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
/** The styles of the element. */
M3eSegmentedButtonElement.styles = css`:host { display: inline-flex; vertical-align: middle; align-items: center; } :host([hidden]) { display: none; } ::slotted(:is(:state(--first), :--first)) { border-start-start-radius: var(--m3e-segmented-button-start-shape, ${DesignToken.shape.corner.full}); border-end-start-radius: var(--m3e-segmented-button-start-shape, ${DesignToken.shape.corner.full}); } ::slotted(:is(:state(--last), :--last)) { border-start-end-radius: var(--m3e-segmented-button-end-shape, ${DesignToken.shape.corner.full}); border-end-end-radius: var(--m3e-segmented-button-end-shape, ${DesignToken.shape.corner.full}); } ::slotted(:not(:is(:state(--first), :--first))) { --_segmented-button-left-border: none; }`;
__decorate([property({
  type: Boolean
})], M3eSegmentedButtonElement.prototype, "multi", void 0);
__decorate([property({
  attribute: "hide-selection-indicator",
  type: Boolean
})], M3eSegmentedButtonElement.prototype, "hideSelectionIndicator", void 0);
M3eSegmentedButtonElement = __decorate([customElement("m3e-segmented-button")], M3eSegmentedButtonElement);

export { M3eButtonSegmentElement, M3eSegmentedButtonElement };
//# sourceMappingURL=segmented-button.js.map
