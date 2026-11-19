/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { query, property, queryAssignedElements } from 'lit/decorators.js';
import { Role, AttachInternals, PressedController, setCustomEnumState, setCustomState, addCustomState, prefersReducedMotion, hasCustomState, DesignToken, customElement } from './TextOverflowElement.js';
import { isSelectedMixin } from './Selected.js';
import { waitForUpdate } from './waitForUpdate.js';
import { waitForUpgrade } from './waitForUpgrade.js';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is a `ButtonGroupVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ButtonGroupVariant`.
 */
function isButtonGroupVariant(value) {
  return value === "standard" || value === "connected";
}

/**
 * Determines whether a value is a `ButtonGroupSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ButtonGroupSize`.
 */
function isButtonGroupSize(value) {
  return value === "extra-small" || value === "small" || value === "medium" || value === "large" || value === "extra-large";
}

var _M3eButtonGroupElement_instances, _M3eButtonGroupElement_pressedController, _M3eButtonGroupElement_applyVariant, _M3eButtonGroupElement_applySize, _M3eButtonGroupElement_updateButtons, _M3eButtonGroupElement_handleChange, _M3eButtonGroupElement_handlePressedChange, _M3eButtonGroupElement_cleanupPressed;
/**
 * Organizes buttons and adds interactions between them.
 *
 * @description
 * The `m3e-button-group` component arranges multiple buttons into a unified, expressive layout,
 * supporting both `standard` and `connected` variants. It enables seamless, accessible grouping
 * of actions, adapts to various sizes, and ensures consistent spacing, shape, and alignment.
 * Designed according to Material 3 principles, it empowers users to interact with related actions
 * in a visually harmonious and intuitive way.
 *
 * @example
 * The following example illustrates a standard button group.
 * ``` html
 * <m3e-button-group>
 *  <m3e-icon-button variant="tonal" toggle><m3e-icon name="format_bold"></m3e-icon></m3e-icon-button>
 *  <m3e-icon-button variant="tonal" toggle><m3e-icon name="format_italic"></m3e-icon></m3e-icon-button>
 *  <m3e-icon-button variant="tonal" toggle><m3e-icon name="format_underlined"></m3e-icon></m3e-icon-button>
 * </m3e-button-group>
 * ```
 * @example
 * The next example illustrates a connected button group.
 * ```html
 * <m3e-button-group variant="connected">
 *  <m3e-button variant="tonal" shape="square" toggle>Start</m3e-button>
 *  <m3e-button variant="tonal" shape="square" toggle>Directions</m3e-button>
 *  <m3e-button variant="tonal" shape="square" toggle>Share</m3e-button>
 * </m3e-button-group>
 * ```
 *
 * @tag m3e-button-group
 *
 * @slot - Renders the buttons of the group.
 *
 * @attr multi - Whether multiple toggle buttons can be selected.
 * @attr size - The size of the group.
 * @attr variant - The appearance variant of the group.
 *
 * @cssprop --m3e-standard-button-group-extra-small-spacing - Spacing between buttons in standard variant, extra-small size.
 * @cssprop --m3e-standard-button-group-small-spacing - Spacing between buttons in standard variant, small size.
 * @cssprop --m3e-standard-button-group-medium-spacing - Spacing between buttons in standard variant, medium size.
 * @cssprop --m3e-standard-button-group-large-spacing - Spacing between buttons in standard variant, large size.
 * @cssprop --m3e-standard-button-group-extra-large-spacing - Spacing between buttons in standard variant, extra-large size.
 * @cssprop --m3e-connected-button-group-spacing - Spacing between buttons in connected variant.
 * @cssprop --m3e-connected-button-group-extra-small-inner-shape - Corner shape for connected variant, extra-small size.
 * @cssprop --m3e-connected-button-group-extra-small-inner-pressed-shape - Pressed corner shape for connected variant, extra-small size.
 * @cssprop --m3e-connected-button-group-small-inner-shape - Corner shape for connected variant, small size.
 * @cssprop --m3e-connected-button-group-small-inner-pressed-shape - Pressed corner shape for connected variant, small size.
 * @cssprop --m3e-connected-button-group-medium-inner-shape - Corner shape for connected variant, medium size.
 * @cssprop --m3e-connected-button-group-medium-inner-pressed-shape - Pressed corner shape for connected variant, medium size.
 * @cssprop --m3e-connected-button-group-large-inner-shape - Corner shape for connected variant, large size.
 * @cssprop --m3e-connected-button-group-large-inner-pressed-shape - Pressed corner shape for connected variant, large size.
 * @cssprop --m3e-connected-button-group-extra-large-inner-shape - Corner shape for connected variant, extra-large size.
 * @cssprop --m3e-connected-button-group-extra-large-inner-pressed-shape - Pressed corner shape for connected variant, extra-large size.
 */
let M3eButtonGroupElement = class M3eButtonGroupElement extends Role(AttachInternals(LitElement), "group") {
  constructor() {
    super(...arguments);
    _M3eButtonGroupElement_instances.add(this);
    /** @private */
    _M3eButtonGroupElement_pressedController.set(this, new PressedController(this, {
      target: null,
      capture: true,
      minPressedDuration: 225,
      isPressedKey: key => key === " ",
      callback: pressed => __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_handlePressedChange).call(this, pressed)
    }));
    /**
     * The appearance variant of the group.
     * @default "standard"
     */
    this.variant = "standard";
    /**
     * The size of the group.
     * @default "small"
     */
    this.size = "small";
    /**
     * Whether multiple toggle buttons can be selected.
     * @default false
     */
    this.multi = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_applySize).call(this);
    if (this.hasAttribute("disable-role")) {
      this.role = null;
    }
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._base?.style.removeProperty("--_button-group-width");
    this._base?.classList.remove("pressed");
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_applyVariant).call(this);
    }
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_applySize).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("multi") || changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_updateButtons).call(this);
    }
    if (changedProperties.has("variant")) {
      this._base?.style.removeProperty("--_button-group-width");
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot @slotchange="${__classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_updateButtons)}" @change="${__classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_handleChange)}"></slot></div>`;
  }
};
_M3eButtonGroupElement_pressedController = new WeakMap();
_M3eButtonGroupElement_instances = new WeakSet();
_M3eButtonGroupElement_applyVariant = function _M3eButtonGroupElement_applyVariant() {
  if (!isButtonGroupVariant(this.variant)) {
    this.variant = "standard";
  }
  setCustomEnumState(this, this.variant, "connected", "standard");
};
_M3eButtonGroupElement_applySize = function _M3eButtonGroupElement_applySize() {
  if (!isButtonGroupSize(this.size)) {
    this.size = "small";
  }
  setCustomEnumState(this, this.size, "extra-large", "extra-small", "large", "medium", "small");
};
_M3eButtonGroupElement_updateButtons = /** @private */
async function _M3eButtonGroupElement_updateButtons() {
  const buttons = this.buttons;
  for (const target of __classPrivateFieldGet(this, _M3eButtonGroupElement_pressedController, "f").targets) {
    __classPrivateFieldGet(this, _M3eButtonGroupElement_pressedController, "f").unobserve(target);
  }
  for (const button of this.buttons) {
    await waitForUpgrade(button);
    await waitForUpdate(button);
  }
  const canToggle = [...buttons].some(x => x.toggle);
  // disable-role is an internal attribute to by split-button to disable setting roles.
  if (!this.hasAttribute("disable-role")) {
    this.role = canToggle && !this.multi ? "radiogroup" : "group";
  }
  const buttonRole = this.role === "radiogroup" ? "radio" : "button";
  buttons.forEach((button, i) => {
    __classPrivateFieldGet(this, _M3eButtonGroupElement_pressedController, "f").observe(button);
    setCustomState(button, "--connected", this.variant === "connected");
    addCustomState(button, "--grouped");
    setCustomState(button, "--first", i == 0);
    setCustomState(button, "--last", i == buttons.length - 1);
    if (!this.hasAttribute("disable-role") && button.role !== buttonRole && button.toggle) {
      const checked = !button.toggle ? null : button.selected ? "true" : "false";
      button.role = buttonRole;
      if (button.role === "button") {
        button.ariaPressed = checked;
        button.ariaChecked = null;
      } else {
        button.ariaChecked = checked;
        button.ariaPressed = null;
      }
    }
  });
};
_M3eButtonGroupElement_handleChange = function _M3eButtonGroupElement_handleChange(e) {
  if (this.multi || !(e.target instanceof HTMLElement)) return;
  if (e.target.tagName === "M3E-BUTTON" || e.target.tagName === "M3E-ICON-BUTTON") {
    if (!isSelectedMixin(e.target) || !e.target.selected) {
      return;
    }
    for (const button of this.buttons) {
      if (button === e.target || !button.selected) continue;
      button.selected = false;
    }
  }
};
_M3eButtonGroupElement_handlePressedChange = function _M3eButtonGroupElement_handlePressedChange(pressed) {
  const base = this._base;
  if (!base) return;
  if (!pressed || this.variant === "connected") {
    const button = this.buttons.find(x => x === document.activeElement);
    if (!prefersReducedMotion() && button) {
      button.addEventListener("transitionend", () => queueMicrotask(() => {
        // Pressed state is tested to ensure this runs only when the button
        // is no longer pressed. This handles changes to pressed state in
        // quick succession.
        if (!hasCustomState(button, "--pressed")) {
          __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_cleanupPressed).call(this, base);
        }
      }), {
        once: true
      });
    } else {
      __classPrivateFieldGet(this, _M3eButtonGroupElement_instances, "m", _M3eButtonGroupElement_cleanupPressed).call(this, base);
    }
  } else {
    base.classList.add("pressed");
    base.style.setProperty("--_button-group-width", `${base.getBoundingClientRect().width}px`);
  }
};
_M3eButtonGroupElement_cleanupPressed = function _M3eButtonGroupElement_cleanupPressed(base) {
  base.style.removeProperty("--_button-group-width");
  base.classList.remove("pressed");
};
/** The styles of the element. */
M3eButtonGroupElement.styles = css`:host { display: flex; vertical-align: middle; flex-wrap: nowrap; align-items: center; } :host([hidden]) { display: none; } .base { display: flex; vertical-align: middle; flex-wrap: nowrap; align-items: center; } :host(:is(:state(--standard), :--standard)) { justify-content: center; } :host(:is(:state(--connected), :--connected)) .base { flex: 1 1 auto; } :host(:is(:state(--standard), :--standard)) .base { width: fit-content; flex: none; } :host(:is(:state(--standard), :--standard)) .base.pressed { justify-content: space-between; width: var(--_button-group-width); } :host(:is(:state(--standard), :--standard):is(:state(--extra-small), :--extra-small)) .base { column-gap: var(--m3e-standard-button-group-extra-small-spacing, ${DesignToken.measurement.space225}); } :host(:is(:state(--standard), :--standard):is(:state(--small), :--small)) .base { column-gap: var(--m3e-standard-button-group-small-spacing, ${DesignToken.measurement.space150}); } :host(:is(:state(--standard), :--standard):is(:state(--medium), :--medium)).base { column-gap: var(--m3e-standard-button-group-medium-spacing, ${DesignToken.measurement.space100}); } :host(:is(:state(--standard), :--standard):is(:state(--large), :--large)) .base { column-gap: var(--m3e-standard-button-group-large-spacing, ${DesignToken.measurement.space100}); } :host(:is(:state(--standard), :--standard):is(:state(--extra-large), :--extra-large)) .base { column-gap: var(--m3e-standard-button-group-extra-large-spacing, ${DesignToken.measurement.space100}); } :host(:is(:state(--connected), :--connected)) .base { column-gap: var(--m3e-connected-button-group-spacing, ${DesignToken.measurement.space25}); } :host(:is(:state(--connected), :--connected):is(:state(--extra-small), :--extra-small)) ::slotted(:is(:state(--first), :--first):is(:state(--extra-small), :--extra-small)), :host(:is(:state(--connected), :--connected):is(:state(--extra-small), :--extra-small)) ::slotted( :not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--extra-small), :--extra-small) ) { --_button-rounded-end-shape: var( --m3e-connected-button-group-extra-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-end-shape: var( --m3e-connected-button-group-extra-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-end-pressed-shape: var( --m3e-connected-button-group-extra-small-inner-pressed-shape, ${DesignToken.shape.corner.extraSmall} ); } :host(:is(:state(--connected), :--connected):is(:state(--extra-small), :--extra-small)) ::slotted(:is(:state(--last), :--last):is(:state(--extra-small), :--extra-small)), :host(:is(:state(--connected), :--connected):is(:state(--extra-small), :--extra-small)) ::slotted( :not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--extra-small), :--extra-small) ) { --_button-rounded-start-shape: var( --m3e-connected-button-group-extra-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-start-shape: var( --m3e-connected-button-group-extra-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-start-pressed-shape: var( --m3e-connected-button-group-extra-small-inner-pressed-shape, ${DesignToken.shape.corner.extraSmall} ); } :host(:is(:state(--connected), :--connected):is(:state(--small), :--small)) ::slotted(:is(:state(--first), :--first):is(:state(--small), :--small)), :host(:is(:state(--connected), :--connected):is(:state(--small), :--small)) ::slotted(:not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--small), :--small)) { --_button-rounded-end-shape: var( --m3e-connected-button-group-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-end-shape: var( --m3e-connected-button-group-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-end-shape-pressed-morph: var( --m3e-connected-button-group-small-inner-pressed-shape, ${DesignToken.shape.corner.extraSmall} ); } :host(:is(:state(--connected), :--connected):is(:state(--small), :--small)) ::slotted(:is(:state(--last), :--last):is(:state(--small), :--small)), :host(:is(:state(--connected), :--connected):is(:state(--small), :--small)) ::slotted(:not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--small), :--small)) { --_button-rounded-start-shape: var( --m3e-connected-button-group-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-start-shape: var( --m3e-connected-button-group-small-inner-shape, ${DesignToken.shape.corner.small} ); --_button-start-shape-pressed-morph: var( --m3e-connected-button-group-small-inner-pressed-shape, ${DesignToken.shape.corner.extraSmall} ); } :host(:is(:state(--connected), :--connected):is(:state(--medium), :--medium)) ::slotted(:is(:state(--first), :--first):is(:state(--medium), :--medium)), :host(:is(:state(--connected), :--connected):is(:state(--medium), :--medium)) ::slotted( :not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--medium), :--medium) ) { --_button-rounded-end-shape: var( --m3e-connected-button-group-medium-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-end-shape: var( --m3e-connected-button-group-medium-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-end-pressed-shape: var( --m3e-connected-button-group-medium-inner-pressed-shape, ${DesignToken.shape.corner.extraSmall} ); } :host(:is(:state(--connected), :--connected):is(:state(--medium), :--medium)) ::slotted(:is(:state(--last), :--last):is(:state(--medium), :--medium)), :host(:is(:state(--connected), :--connected):is(:state(--medium), :--medium)) ::slotted( :not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--medium), :--medium) ) { --_button-rounded-start-shape: var( --m3e-connected-button-group-medium-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-start-shape: var( --m3e-connected-button-group-medium-inner-shape, ${DesignToken.shape.corner.small} ); --_button-square-start-pressed-shape: var( --m3e-connected-button-group-medium-inner-pressed-shape, ${DesignToken.shape.corner.extraSmall} ); } :host(:is(:state(--connected), :--connected):is(:state(--large), :--large)) ::slotted(:is(:state(--first), :--first):is(:state(--large), :--large)), :host(:is(:state(--connected), :--connected):is(:state(--large), :--large)) ::slotted(:not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--large), :--large)) { --_button-rounded-end-shape: var( --m3e-connected-button-group-large-inner-shape, ${DesignToken.shape.corner.large} ); --_button-square-end-shape: var( --m3e-connected-button-group-large-inner-shape, ${DesignToken.shape.corner.large} ); --_button-square-end-pressed-shape: var( --m3e-connected-button-group-large-inner-pressed-shape, ${DesignToken.shape.corner.medium} ); } :host(:is(:state(--connected), :--connected):is(:state(--large), :--large)) ::slotted(:is(:state(--last), :--last):is(:state(--large), :--large)), :host(:is(:state(--connected), :--connected):is(:state(--large), :--large)) ::slotted(:not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--large), :--large)) { --_button-rounded-start-shape: var( --m3e-connected-button-group-large-inner-shape, ${DesignToken.shape.corner.large} ); --_button-square-start-shape: var( --m3e-connected-button-group-large-inner-shape, ${DesignToken.shape.corner.large} ); --_button-square-start-pressed-shape: var( --m3e-connected-button-group-large-inner-pressed-shape, ${DesignToken.shape.corner.medium} ); } :host(:is(:state(--connected), :--connected):is(:state(--extra-large), :--extra-large)) ::slotted(:is(:state(--first), :--first):is(:state(--extra-large), :--extra-large)), :host(:is(:state(--connected), :--connected):is(:state(--extra-large), :--extra-large)) ::slotted( :not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--extra-large), :--extra-large) ) { --_button-rounded-end-shape: var( --m3e-connected-button-group-extra-large-inner-shape, ${DesignToken.shape.corner.largeIncreased} ); --_button-square-end-shape: var( --m3e-connected-button-group-extra-large-inner-shape, ${DesignToken.shape.corner.largeIncreased} ); --_button-square-end-pressed-shape: var( --m3e-connected-button-group-extra-large-inner-pressed-shape, ${DesignToken.shape.corner.large} ); } :host(:is(:state(--connected), :--connected):is(:state(--extra-large), :--extra-large)) ::slotted(:is(:state(--last), :--last):is(:state(--extra-large), :--extra-large)), :host(:is(:state(--connected), :--connected):is(:state(--extra-large), :--extra-large)) ::slotted( :not(:is(:state(--first), :--first)):not(:is(:state(--last), :--last)):is(:state(--extra-large), :--extra-large) ) { --_button-rounded-start-shape: var( --m3e-connected-button-group-extra-large-inner-shape, ${DesignToken.shape.corner.largeIncreased} ); --_button-square-start-shape: var( --m3e-connected-button-group-extra-large-inner-shape, ${DesignToken.shape.corner.largeIncreased} ); --_button-square-start-pressed-shape: var( --m3e-connected-button-group-extra-large-inner-pressed-shape, ${DesignToken.shape.corner.large} ); }`;
__decorate([query(".base")], M3eButtonGroupElement.prototype, "_base", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eButtonGroupElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eButtonGroupElement.prototype, "size", void 0);
__decorate([property({
  type: Boolean
})], M3eButtonGroupElement.prototype, "multi", void 0);
__decorate([queryAssignedElements({
  slot: "",
  selector: "m3e-button,m3e-icon-button",
  flatten: true
})], M3eButtonGroupElement.prototype, "buttons", void 0);
M3eButtonGroupElement = __decorate([customElement("m3e-button-group")], M3eButtonGroupElement);

export { M3eButtonGroupElement, isButtonGroupSize, isButtonGroupVariant };
//# sourceMappingURL=ButtonGroupElement.js.map
