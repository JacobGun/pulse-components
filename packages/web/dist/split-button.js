/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators.js';
import { Role, AttachInternals, PressedController, HoverController, setCustomEnumState, DesignToken, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { isButtonSize, M3eButtonElement } from './ButtonElement.js';
import { M3eIconButtonElement } from './IconButtonElement.js';
import './ButtonGroupElement.js';

/**
 * Determines whether a value is a `SplitButtonVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SplitButtonVariant`.
 */
function isSplitButtonVariant(value) {
  return value === "elevated" || value === "filled" || value === "tonal" || value === "outlined";
}

var _M3eSplitButtonElement_instances, _M3eSplitButtonElement_leadingButton, _M3eSplitButtonElement_trailingButton, _M3eSplitButtonElement_trailingButtonHover, _M3eSplitButtonElement_pressedController, _M3eSplitButtonElement_hoverController, _M3eSplitButtonElement_applyVariant, _M3eSplitButtonElement_applySize, _M3eSplitButtonElement_handleLeadingSlotChange, _M3eSplitButtonElement_handleTrailingSlotChange, _M3eSplitButtonElement_updateButtons, _M3eSplitButtonElement_updateLeadingButtonShape, _M3eSplitButtonElement_updateTrailingButtonShape, _M3eSplitButtonElement_updateButtonShape;
/**
 * A button used to show an action with a menu of related actions.
 *
 * @description
 * The `m3e-split-button` component presents a primary action alongside a menu of related actions,
 * uniting two buttons in a single expressive surface. Designed for Material 3, it supports `elevated`,
 * `filled`, `tonal`, and `outlined` variants, and adapts to all button sizes. The leading button triggers
 * the main action, while the trailing icon button reveals additional options, enabling efficient workflows
 * and clear visual hierarchy. The split button ensures accessible, adaptive, and visually harmonious
 * interactions, reflecting Material 3's principles of clarity, flexibility, and expressive design.
 *
 * @example
 * The following example illustrates use of the `m3e-split-button` to combine the `m3e-button`,
 * `m3e-icon-button`, and `m3e-menu` components into a split button.
 *
 * ```html
 * <m3e-split-button>
 *  <m3e-button slot="leading-button">
 *    <m3e-icon slot="icon" name="edit"></m3e-icon>Edit
 *  </m3e-button>
 *  <m3e-icon-button slot="trailing-button">
 *  <m3e-icon name="keyboard_arrow_down"></m3e-icon>
 *  <m3e-menu-trigger for="menu1"></m3e-menu-trigger>
 * </m3e-icon-button>
 * ```
 *
 * @tag m3e-split-button
 *
 * @slot leading-button - The leading button used to perform the primary action.
 * @slot trailing-button - The trailing icon button used to open a menu of related actions.
 *
 * @attr variant - The appearance variant of the button.
 * @attr size - The size of the button.
 *
 * @cssprop --m3e-split-button-extra-small-trailing-button-unselected-leading-space - Leading space for the trailing button (extra-small, unselected).
 * @cssprop --m3e-split-button-extra-small-trailing-button-unselected-trailing-space - Trailing space for the trailing button (extra-small, unselected).
 * @cssprop --m3e-split-button-small-trailing-button-unselected-leading-space - Leading space for the trailing button (small, unselected).
 * @cssprop --m3e-split-button-small-trailing-button-unselected-trailing-space - Trailing space for the trailing button (small, unselected).
 * @cssprop --m3e-split-button-medium-trailing-button-unselected-leading-space - Leading space for the trailing button (medium, unselected).
 * @cssprop --m3e-split-button-medium-trailing-button-unselected-trailing-space - Trailing space for the trailing button (medium, unselected).
 * @cssprop --m3e-split-button-large-trailing-button-unselected-leading-space - Leading space for the trailing button (large, unselected).
 * @cssprop --m3e-split-button-large-trailing-button-unselected-trailing-space - Trailing space for the trailing button (large, unselected).
 * @cssprop --m3e-split-button-extra-large-trailing-button-unselected-leading-space - Leading space for the trailing button (extra-large, unselected).
 * @cssprop --m3e-split-button-extra-large-trailing-button-unselected-trailing-space - Trailing space for the trailing button (extra-large, unselected).
 * @cssprop --m3e-split-button-extra-small-trailing-button-selected-leading-space - Leading space for the trailing button (extra-small, selected).
 * @cssprop --m3e-split-button-extra-small-trailing-button-selected-trailing-space - Trailing space for the trailing button (extra-small, selected).
 * @cssprop --m3e-split-button-small-trailing-button-selected-leading-space - Leading space for the trailing button (small, selected).
 * @cssprop --m3e-split-button-small-trailing-button-selected-trailing-space - Trailing space for the trailing button (small, selected).
 * @cssprop --m3e-split-button-medium-trailing-button-selected-leading-space - Leading space for the trailing button (medium, selected).
 * @cssprop --m3e-split-button-medium-trailing-button-selected-trailing-space - Trailing space for the trailing button (medium, selected).
 * @cssprop --m3e-split-button-large-trailing-button-selected-leading-space - Leading space for the trailing button (large, selected).
 * @cssprop --m3e-split-button-large-trailing-button-selected-trailing-space - Trailing space for the trailing button (large, selected).
 * @cssprop --m3e-split-button-extra-large-trailing-button-selected-leading-space - Leading space for the trailing button (extra-large, selected).
 * @cssprop --m3e-split-button-extra-large-trailing-button-selected-trailing-space - Trailing space for the trailing button (extra-large, selected).
 * @cssprop --m3e-split-button-extra-small-inner-corner-size - Inner corner size for the leading/trailing button (extra-small).
 * @cssprop --m3e-split-button-small-inner-corner-size - Inner corner size for the leading/trailing button (small).
 * @cssprop --m3e-split-button-medium-inner-corner-size - Inner corner size for the leading/trailing button (medium).
 * @cssprop --m3e-split-button-large-inner-corner-size - Inner corner size for the leading/trailing button (large).
 * @cssprop --m3e-split-button-extra-large-inner-corner-size - Inner corner size for the leading/trailing button (extra-large).
 * @cssprop --m3e-split-button-extra-small-inner-corner-hover-size - Inner corner size on hover (extra-small).
 * @cssprop --m3e-split-button-small-inner-corner-hover-size - Inner corner size on hover (small).
 * @cssprop --m3e-split-button-medium-inner-corner-hover-size - Inner corner size on hover (medium).
 * @cssprop --m3e-split-button-large-inner-corner-hover-size - Inner corner size on hover (large).
 * @cssprop --m3e-split-button-extra-large-inner-corner-hover-size - Inner corner size on hover (extra-large).
 * @cssprop --m3e-split-button-extra-small-inner-corner-pressed-size - Inner corner size on press (extra-small).
 * @cssprop --m3e-split-button-small-inner-corner-pressed-size - Inner corner size on press (small).
 * @cssprop --m3e-split-button-medium-inner-corner-pressed-size - Inner corner size on press (medium).
 * @cssprop --m3e-split-button-large-inner-corner-pressed-size - Inner corner size on press (large).
 * @cssprop --m3e-split-button-extra-large-inner-corner-pressed-size - Inner corner size on press (extra-large).
 * @cssprop --m3e-split-button-extra-small-between-spacing - Spacing between leading and trailing buttons (extra-small).
 * @cssprop --m3e-split-button-small-between-spacing - Spacing between leading and trailing buttons (small).
 * @cssprop --m3e-split-button-medium-between-spacing - Spacing between leading and trailing buttons (medium).
 * @cssprop --m3e-split-button-large-between-spacing - Spacing between leading and trailing buttons (large).
 * @cssprop --m3e-split-button-extra-large-between-spacing - Spacing between leading and trailing buttons (extra-large).
 */
let M3eSplitButtonElement = class M3eSplitButtonElement extends Role(AttachInternals(LitElement), "group") {
  constructor() {
    super(...arguments);
    _M3eSplitButtonElement_instances.add(this);
    /** @private */
    _M3eSplitButtonElement_leadingButton.set(this, void 0);
    /** @private */
    _M3eSplitButtonElement_trailingButton.set(this, void 0);
    /** @private */
    _M3eSplitButtonElement_trailingButtonHover.set(this, false);
    /** @private */
    _M3eSplitButtonElement_pressedController.set(this, new PressedController(this, {
      target: null,
      capture: true,
      minPressedDuration: 225,
      isPressedKey: key => key === " ",
      callback: (pressed, _, target) => {
        switch (target) {
          case __classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f"):
            __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateLeadingButtonShape).call(this, pressed);
            break;
          case __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"):
            __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateTrailingButtonShape).call(this, pressed || __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButtonHover, "f"));
            break;
        }
      }
    }));
    /** @private */
    _M3eSplitButtonElement_hoverController.set(this, new HoverController(this, {
      target: null,
      callback: (hovering, target) => {
        switch (target) {
          case __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"):
            if (!__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f")?.disabled && !__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f")?.disabledInteractive) {
              __classPrivateFieldSet(this, _M3eSplitButtonElement_trailingButtonHover, hovering, "f");
              __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateTrailingButtonShape).call(this, hovering);
            }
            break;
        }
      }
    }));
    /**
     * The appearance variant of the button.
     * @default "filled"
     */
    this.variant = "filled";
    /**
     * The size of the button.
     * @default "small"
     */
    this.size = "small";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_applySize).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_applyVariant).call(this);
    }
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_applySize).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("variant") || changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateButtons).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateButtons).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-button-group class="base" disable-role variant="connected" size="${this.size}"><slot name="leading-button" @slotchange="${__classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_handleLeadingSlotChange)}"></slot><slot name="trailing-button" @slotchange="${__classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_handleTrailingSlotChange)}"></slot></m3e-button-group>`;
  }
};
_M3eSplitButtonElement_leadingButton = new WeakMap();
_M3eSplitButtonElement_trailingButton = new WeakMap();
_M3eSplitButtonElement_trailingButtonHover = new WeakMap();
_M3eSplitButtonElement_pressedController = new WeakMap();
_M3eSplitButtonElement_hoverController = new WeakMap();
_M3eSplitButtonElement_instances = new WeakSet();
_M3eSplitButtonElement_applyVariant = function _M3eSplitButtonElement_applyVariant() {
  if (!isSplitButtonVariant(this.variant)) {
    this.variant = "filled";
  }
};
_M3eSplitButtonElement_applySize = function _M3eSplitButtonElement_applySize() {
  if (!isButtonSize(this.size)) {
    this.size = "small";
  }
  setCustomEnumState(this, this.size, "extra-large", "extra-small", "large", "medium", "small");
};
_M3eSplitButtonElement_handleLeadingSlotChange = function _M3eSplitButtonElement_handleLeadingSlotChange(e) {
  if (__classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_pressedController, "f").unobserve(__classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f"));
  }
  __classPrivateFieldSet(this, _M3eSplitButtonElement_leadingButton, e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof M3eButtonElement), "f");
  if (__classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_pressedController, "f").observe(__classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f"));
  }
  __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateButtons).call(this);
};
_M3eSplitButtonElement_handleTrailingSlotChange = function _M3eSplitButtonElement_handleTrailingSlotChange(e) {
  if (__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_pressedController, "f").unobserve(__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"));
    __classPrivateFieldGet(this, _M3eSplitButtonElement_hoverController, "f").unobserve(__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"));
  }
  __classPrivateFieldSet(this, _M3eSplitButtonElement_trailingButton, e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof M3eIconButtonElement), "f");
  if (__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_pressedController, "f").observe(__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"));
    __classPrivateFieldGet(this, _M3eSplitButtonElement_hoverController, "f").observe(__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"));
  }
  __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateButtons).call(this);
};
_M3eSplitButtonElement_updateButtons = function _M3eSplitButtonElement_updateButtons() {
  if (__classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f").variant = this.variant;
    __classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f").size = this.size;
    __classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f").shape = "rounded";
  }
  if (__classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f").width = "default";
    __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f").shape = "rounded";
    __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f").setAttribute("variant", this.variant);
    __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f").size = this.size;
  }
};
_M3eSplitButtonElement_updateLeadingButtonShape = function _M3eSplitButtonElement_updateLeadingButtonShape(update) {
  if (update && __classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateButtonShape).call(this, __classPrivateFieldGet(this, _M3eSplitButtonElement_leadingButton, "f"), "--_leading-button-shape");
  } else {
    this._base?.style.removeProperty("--_leading-button-shape");
  }
};
_M3eSplitButtonElement_updateTrailingButtonShape = function _M3eSplitButtonElement_updateTrailingButtonShape(update) {
  if (update && __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f")) {
    __classPrivateFieldGet(this, _M3eSplitButtonElement_instances, "m", _M3eSplitButtonElement_updateButtonShape).call(this, __classPrivateFieldGet(this, _M3eSplitButtonElement_trailingButton, "f"), "--_trailing-button-shape");
  } else {
    this._base?.style.removeProperty("--_trailing-button-shape");
  }
};
_M3eSplitButtonElement_updateButtonShape = function _M3eSplitButtonElement_updateButtonShape(button, property) {
  const adjustedShape = button.clientHeight / 2;
  if (adjustedShape) {
    this._base?.style.setProperty(property, `${adjustedShape}px`);
  }
};
/** The styles of the element. */
M3eSplitButtonElement.styles = css`:host { display: inline-flex; vertical-align: middle; } :host([hidden]) { display: none; } ::slotted([slot="leading-button"]) { flex: 1 1 auto; min-width: 0; --_button-start-shape-pressed-morph: var(--_leading-button-shape, ${DesignToken.shape.corner.full}); } ::slotted([slot="trailing-button"]:not([aria-expanded="true"])) { --m3e-icon-button-extra-small-default-leading-space: var( --m3e-split-button-extra-small-trailing-button-unselected-leading-space, 12px ); --m3e-icon-button-extra-small-default-trailing-space: var( --m3e-split-button-extra-small-trailing-button-unselected-trailing-space, 14px ); --m3e-icon-button-small-default-leading-space: var( --m3e-split-button-small-trailing-button-unselected-leading-space, 12px ); --m3e-icon-button-small-default-trailing-space: var( --m3e-split-button-small-trailing-button-unselected-trailing-space, 14px ); --m3e-icon-button-medium-default-leading-space: var( --m3e-split-button-medium-trailing-button-unselected-leading-space, 13px ); --m3e-icon-button-medium-default-trailing-space: var( --m3e-split-button-medium-trailing-button-unselected-trailing-space, 17px ); --m3e-icon-button-large-default-leading-space: var( --m3e-split-button-large-trailing-button-unselected-leading-space, 26px ); --m3e-icon-button-large-default-trailing-space: var( --m3e-split-button-large-trailing-button-unselected-trailing-space, 32px ); --m3e-icon-button-extra-large-default-leading-space: var( --m3e-split-button-extra-large-trailing-button-unselected-leading-space, 37px ); --m3e-icon-button-extra-large-default-trailing-space: var( --m3e-split-button-extra-large-trailing-button-unselected-trailing-space, 49px ); } ::slotted([slot="trailing-button"][aria-expanded="true"]) { --m3e-icon-button-extra-small-default-leading-space: var( --m3e-split-button-extra-small-trailing-button-selected-leading-space, 13px ); --m3e-icon-button-extra-small-default-trailing-space: var( --m3e-split-button-extra-small-trailing-button-selected-trailing-space, 13px ); --m3e-icon-button-small-default-leading-space: var( --m3e-split-button-small-trailing-button-selected-leading-space, 13px ); --m3e-icon-button-small-default-trailing-space: var( --m3e-split-button-small-trailing-button-selected-trailing-space, 13px ); --m3e-icon-button-medium-default-leading-space: var( --m3e-split-button-medium-trailing-button-selected-leading-space, 15px ); --m3e-icon-button-medium-default-trailing-space: var( --m3e-split-button-medium-trailing-button-selected-trailing-space, 15px ); --m3e-icon-button-large-default-leading-space: var( --m3e-split-button-large-trailing-button-selected-leading-space, 29px ); --m3e-icon-button-large-default-trailing-space: var( --m3e-split-button-large-trailing-button-selected-trailing-space, 29px ); --m3e-icon-button-extra-large-default-leading-space: var( --m3e-split-button-extra-large-trailing-button-selected-leading-space, 43px ); --m3e-icon-button-extra-large-default-trailing-space: var( --m3e-split-button-extra-large-trailing-button-selected-trailing-space, 43px ); } ::slotted([slot="leading-button"]:not(:hover)), ::slotted([slot="leading-button"]:disabled), ::slotted([slot="leading-button"][disabled-interactive]) { --m3e-connected-button-group-extra-small-inner-shape: var( --m3e-split-button-extra-small-inner-corner-size, ${DesignToken.shape.corner.extraSmall} ); --m3e-connected-button-group-small-inner-shape: var( --m3e-split-button-small-inner-corner-size, ${DesignToken.shape.corner.extraSmall} ); --m3e-connected-button-group-medium-inner-shape: var( --m3e-split-button-medium-inner-corner-size, ${DesignToken.shape.corner.extraSmall} ); --m3e-connected-button-group-large-inner-shape: var( --m3e-split-button-large-inner-corner-size, ${DesignToken.shape.corner.small} ); --m3e-connected-button-group-extra-large-inner-shape: var( --m3e-split-button-extra-large-inner-corner-size, ${DesignToken.shape.corner.medium} ); } ::slotted([slot="leading-button"]:hover:not(:disabled):not([disabled-interactive])), ::slotted([slot="trailing-button"]:not([aria-expanded="true"]):hover:not(:disabled):not([disabled-interactive])) { --m3e-connected-button-group-extra-small-inner-shape: var( --m3e-split-button-extra-small-inner-corner-hover-size, ${DesignToken.shape.corner.small} ); --m3e-connected-button-group-small-inner-shape: var( --m3e-split-button-small-inner-corner-hover-size, ${DesignToken.shape.corner.medium} ); --m3e-connected-button-group-medium-inner-shape: var( --m3e-split-button-medium-inner-corner-hover-size, ${DesignToken.shape.corner.medium} ); --m3e-connected-button-group-large-inner-shape: var( --m3e-split-button-large-inner-corner-hover-size, ${DesignToken.shape.corner.largeIncreased} ); --m3e-connected-button-group-extra-large-inner-shape: var( --m3e-split-button-extra-large-inner-corner-hover-size, ${DesignToken.shape.corner.largeIncreased} ); } ::slotted([slot="leading-button"]), ::slotted([slot="trailing-button"]) { --m3e-connected-button-group-extra-small-inner-pressed-shape: var( --m3e-split-button-extra-small-inner-corner-pressed-size, ${DesignToken.shape.corner.small} ); --m3e-connected-button-group-small-inner-pressed-shape: var( --m3e-split-button-small-inner-corner-pressed-size, ${DesignToken.shape.corner.medium} ); --m3e-connected-button-group-medium-inner-pressed-shape: var( --m3e-split-button-medium-inner-corner-pressed-size, ${DesignToken.shape.corner.medium} ); --m3e-connected-button-group-large-inner-pressed-shape: var( --m3e-split-button-large-inner-corner-pressed-size, ${DesignToken.shape.corner.largeIncreased} ); --m3e-connected-button-group-extra-large-inner-pressed-shape: var( --m3e-split-button-extra-large-inner-corner-pressed-size, ${DesignToken.shape.corner.largeIncreased} ); } ::slotted([slot="trailing-button"]:not([aria-expanded="true"]):not(:hover)), ::slotted([slot="trailing-button"]:disabled), ::slotted([slot="trailing-button"][disabled-interactive]) { --m3e-connected-button-group-extra-small-inner-shape: var( --m3e-split-button-extra-small-inner-corner-size, ${DesignToken.shape.corner.extraSmall} ); --m3e-connected-button-group-small-inner-shape: var( --m3e-split-button-small-inner-corner-size, ${DesignToken.shape.corner.extraSmall} ); --m3e-connected-button-group-medium-inner-shape: var( --m3e-split-button-medium-inner-corner-size, ${DesignToken.shape.corner.extraSmall} ); --m3e-connected-button-group-large-inner-shape: var( --m3e-split-button-large-inner-corner-size, ${DesignToken.shape.corner.small} ); --m3e-connected-button-group-extra-large-inner-shape: var( --m3e-split-button-extra-large-inner-corner-size, ${DesignToken.shape.corner.medium} ); } ::slotted([slot="trailing-button"][aria-expanded="true"]) { --_icon-button-icon-transform: rotate(180deg); --_button-rounded-start-shape: var(--_trailing-button-shape, ${DesignToken.shape.corner.full}); --_button-rounded-end-shape: var(--_trailing-button-shape, ${DesignToken.shape.corner.full}); } ::slotted([slot="trailing-button"]) { --_button-end-shape-pressed-morph: var(--_trailing-button-shape, ${DesignToken.shape.corner.full}); } .base { --m3e-icon-button-extra-small-icon-size: var(--m3e-spit-button-extra-small-trailing-button-icon-size, 22px); --m3e-button-extra-small-icon-size: var(--m3e-spit-button-extra-small-trailing-button-icon-size, 22px); --m3e-icon-button-small-icon-size: var(--m3e-spit-button-small-trailing-button-icon-size, 22px); --m3e-button-small-icon-size: var(--m3e-spit-button-small-trailing-button-icon-size, 22px); --m3e-icon-button-medium-icon-size: var(--m3e-spit-button-medium-trailing-button-icon-size, 26px); --m3e-button-medium-icon-size: var(--m3e-spit-button-medium-trailing-button-icon-size, 26px); --m3e-icon-button-large-icon-size: var(--m3e-spit-button-large-trailing-button-icon-size, 38px); --m3e-button-large-icon-size: var(--m3e-spit-button-large-trailing-button-icon-size, 38px); --m3e-icon-button-extra-large-icon-size: var(--m3e-spit-button-extra-large-trailing-button-icon-size, 50px); --m3e-button-extra-large-icon-size: var(--m3e-spit-button-extra-large-trailing-button-icon-size, 50px); } :host(:is(:state(--extra-small), :--extra-small)) .base { --m3e-connected-button-group-spacing: var(--m3e-split-button-extra-small-between-spacing, 2px); } :host(:is(:state(--small), :--small)) .base { --m3e-connected-button-group-spacing: var(--m3e-split-button-small-between-spacing, 2px); } :host(:is(:state(--medium), :--medium)).base { --m3e-connected-button-group-spacing: var(--m3e-split-button-medium-between-spacing, 2px); } :host(:is(:state(--large), :--large)) .base { --m3e-connected-button-group-spacing: var(--m3e-split-button-large-between-spacing, 2px); } :host(:is(:state(--extra-large), :--extra-large)) .base { --m3e-connected-button-group-spacing: var(--m3e-split-button-extra-large-between-spacing, 2px); }`;
__decorate([query(".base")], M3eSplitButtonElement.prototype, "_base", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSplitButtonElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSplitButtonElement.prototype, "size", void 0);
M3eSplitButtonElement = __decorate([customElement("m3e-split-button")], M3eSplitButtonElement);

export { M3eSplitButtonElement, isSplitButtonVariant };
//# sourceMappingURL=split-button.js.map
