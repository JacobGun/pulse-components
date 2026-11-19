/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, nothing, html, unsafeCSS, css } from 'lit';
import { AttachInternals, isDisabledMixin, setCustomEnumState, setCustomState, DesignToken, customElement, Disabled, Role } from './TextOverflowElement.js';
import { query, property, state } from 'lit/decorators.js';
import { isDisabledInteractiveMixin, DisabledInteractive } from './DisabledInteractive.js';
import { Focusable } from './Focusable.js';
import { FormSubmitter } from './FormSubmitter.js';
import { KeyboardClick } from './KeyboardClick.js';
import { isLinkButtonMixin, renderPseudoLink, LinkButton } from './LinkButton.js';
import { getTextContent } from './getTextContent.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Vertical } from './Vertical.js';
import { Selected } from './Selected.js';
import { selectionManager, SelectionManager, ListManager, ListKeyManager } from './LiveAnnouncer.js';
import { Labelled, Dirty, Touched, FormAssociated, formValue } from './FormAssociated.js';
import { M3eDirectionality } from './Directionality.js';
import { ConstraintValidation } from './ConstraintValidation.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { waitForUpdate } from './waitForUpdate.js';
import { Required } from './Required.js';
import { RequiredConstraintValidation } from './RequiredConstraintValidation.js';

/**
 * Determines whether a value is a `ChipVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ChipVariant`.
 */
function isChipVariant(value) {
  return value === "outlined" || value === "elevated";
}

var _M3eChipElement_instances, _M3eChipElement_value, _M3eChipElement_textContent, _M3eChipElement_applyVariant, _M3eChipElement_renderContent, _M3eChipElement_handleIconSlotChange, _M3eChipElement_handleTrailingIconSlotChange, _M3eChipElement_handleSlotChange;
/**
 * A non-interactive chip used to convey small pieces of information.
 *
 * @description
 * The `m3e-chip` component establishes the foundational structure for chips. It supports expressive styling,
 * accessible interaction, and flexible content projection, aligning with Material 3 guidelines. Appearance
 * variants include `elevated` and `outlined`, enabling visual differentiation and contextual emphasis.
 *
 * @example
 * The following example illustrates use of the `m3e-chip` and `m3e-chip-set` components to present non-interactive chips.
 * ```html
 * <m3e-chip-set>
 *  <m3e-chip><m3e-icon slot="icon" name="palette"></m3e-icon>Design</m3e-chip>
 *  <m3e-chip><m3e-icon slot="icon" name="accessibility_new"></m3e-icon>Accessibility</m3e-chip>
 *  <m3e-chip><m3e-icon slot="icon" name="motion_photos_on"></m3e-icon>Motion</m3e-chip>
 *  <m3e-chip><m3e-icon slot="icon" name="description"></m3e-icon>Documentation</m3e-chip>
 * </m3e-chip-set>
 * ```
 *
 * @tag m3e-chip
 *
 * @slot - Renders the label of the chip.
 * @slot icon - Renders an icon before the chip's label.
 * @slot trailing-icon - Renders an icon after the chip's label.
 *
 * @attr value - A string representing the value of the chip.
 * @attr variant - The appearance variant of the chip.
 *
 * @cssprop --m3e-chip-container-shape - Border radius of the chip container.
 * @cssprop --m3e-chip-container-height - Base height of the chip container before density adjustment.
 * @cssprop --m3e-chip-label-text-font-size - Font size of the chip label text.
 * @cssprop --m3e-chip-label-text-font-weight - Font weight of the chip label text.
 * @cssprop --m3e-chip-label-text-line-height - Line height of the chip label text.
 * @cssprop --m3e-chip-label-text-tracking - Letter spacing of the chip label text.
 * @cssprop --m3e-chip-label-text-color - Label text color in default state.
 * @cssprop --m3e-chip-icon-color - Icon color in default state.
 * @cssprop --m3e-chip-icon-size - Font size of leading/trailing icons.
 * @cssprop --m3e-chip-spacing - Horizontal gap between chip content elements.
 * @cssprop --m3e-chip-padding-start - Default start padding when no icon is present.
 * @cssprop --m3e-chip-padding-end - Default end padding when no trailing icon is present.
 * @cssprop --m3e-chip-with-icon-padding-start - Start padding when leading icon is present.
 * @cssprop --m3e-chip-with-icon-padding-end - End padding when trailing icon is present.
 * @cssprop --m3e-elevated-chip-container-color - Background color for elevated variant.
 * @cssprop --m3e-elevated-chip-elevation - Elevation level for elevated variant.
 * @cssprop --m3e-elevated-chip-hover-elevation - Elevation level on hover.
 * @cssprop --m3e-outlined-chip-outline-thickness - Outline thickness for outlined variant.
 * @cssprop --m3e-outlined-chip-outline-color - Outline color for outlined variant.
 */
let M3eChipElement = class M3eChipElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    _M3eChipElement_instances.add(this);
    /** @private */
    _M3eChipElement_value.set(this, void 0);
    /** @private */
    _M3eChipElement_textContent.set(this, "");
    /**
     * The appearance variant of the chip.
     * @default "outlined"
     */
    this.variant = "outlined";
  }
  /** A string representing the value of the chip. */
  get value() {
    return __classPrivateFieldGet(this, _M3eChipElement_value, "f") ?? __classPrivateFieldGet(this, _M3eChipElement_textContent, "f");
  }
  set value(value) {
    __classPrivateFieldSet(this, _M3eChipElement_value, value, "f");
  }
  /** The textual label of the chip. */
  get label() {
    return __classPrivateFieldGet(this, _M3eChipElement_textContent, "f");
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eChipElement_instances, "m", _M3eChipElement_applyVariant).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (this.role === "listitem") {
      this.removeAttribute("tabindex");
    }
    [this._elevation, this._focusRing, this._stateLayer, this._ripple].forEach(x => {
      if (!x?.htmlFor) {
        x?.attach(this);
      }
    });
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eChipElement_instances, "m", _M3eChipElement_applyVariant).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    const disabled = !isDisabledMixin(this) || this.disabled;
    const disabledInteractive = isDisabledInteractiveMixin(this) && this.disabledInteractive;
    return html`<div class="base"><m3e-elevation class="elevation" ?disabled="${disabled || disabledInteractive}"></m3e-elevation><m3e-state-layer class="state-layer" ?disabled="${disabled || disabledInteractive}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${disabled || disabledInteractive}"></m3e-ripple><div class="touch" aria-hidden="true"></div>${isLinkButtonMixin(this) ? this[renderPseudoLink]() : nothing}<div class="wrapper">${__classPrivateFieldGet(this, _M3eChipElement_instances, "m", _M3eChipElement_renderContent).call(this)}</div></div>`;
  }
  /** @internal */
  _renderIcon() {
    return html`<slot name="icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eChipElement_instances, "m", _M3eChipElement_handleIconSlotChange)}"></slot>`;
  }
  /** @internal */
  _renderTrailingIcon() {
    return html`<slot name="trailing-icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eChipElement_instances, "m", _M3eChipElement_handleTrailingIconSlotChange)}"></slot>`;
  }
  /** @internal */
  _renderSlot() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eChipElement_instances, "m", _M3eChipElement_handleSlotChange)}"></slot>`;
  }
};
_M3eChipElement_value = new WeakMap();
_M3eChipElement_textContent = new WeakMap();
_M3eChipElement_instances = new WeakSet();
_M3eChipElement_applyVariant = function _M3eChipElement_applyVariant() {
  if (!isChipVariant(this.variant)) {
    this.variant = "outlined";
  }
  setCustomEnumState(this, this.variant, "elevated", "outlined");
};
_M3eChipElement_renderContent = function _M3eChipElement_renderContent() {
  return html`${this._renderIcon()}<div class="label">${this._renderSlot()}</div>${this._renderTrailingIcon()}`;
};
_M3eChipElement_handleIconSlotChange = function _M3eChipElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eChipElement_handleTrailingIconSlotChange = function _M3eChipElement_handleTrailingIconSlotChange(e) {
  setCustomState(this, "--with-trailing-icon", hasAssignedNodes(e.target));
};
_M3eChipElement_handleSlotChange = function _M3eChipElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eChipElement_textContent, getTextContent(e.target), "f");
};
/** The styles of the element. */
M3eChipElement.styles = css`:host { display: inline-block; vertical-align: middle; outline: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; border-radius: var(--m3e-chip-container-shape, ${DesignToken.shape.corner.small}); height: calc(var(--m3e-chip-container-height, 32px) + ${DesignToken.density.calc(-3)}); font-size: var(--m3e-chip-label-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-chip-label-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-chip-label-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-chip-label-text-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } :host(:not(m3e-chip):not(:disabled):not([disabled-interactive])) { cursor: pointer; } :host(:not(m3e-chip):not(:disabled)[disabled-interactive]) { cursor: not-allowed; } :host(:not(m3e-chip):not(:disabled):not([disabled-interactive])) .base { user-select: none; } .touch { position: absolute; height: 48px; left: 0; right: 0; } .wrapper { width: 100%; overflow: hidden; display: inline-flex; align-items: center; column-gap: var(--m3e-chip-spacing, ${DesignToken.measurement.space100}); } .label { flex: 1 1 auto; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } :host(:is(:state(--elevated), :--elevated)) .base { background-color: var(--m3e-elevated-chip-container-color, ${DesignToken.color.surfaceContainerLow}); --m3e-elevation-level: var(--m3e-elevated-chip-elevation, ${DesignToken.elevation.level1}); --m3e-elevation-hover-level: var(--m3e-elevated-chip-hover-elevation, ${DesignToken.elevation.level2}); --m3e-elevation-focus-level: var(--m3e-elevated-chip-elevation, ${DesignToken.elevation.level1}); --m3e-elevation-pressed-level: var(--m3e-elevated-chip-elevation, ${DesignToken.elevation.level1}); } :host(:is(:state(--outlined), :--outlined)) .base { outline-width: var(--m3e-outlined-chip-outline-thickness, 1px); outline-style: solid; outline-offset: calc(0px - var(--m3e-outlined-chip-outline-thickness, 1px)); } :host(:not(:disabled):not([disabled-interactive]):is(:state(--outlined), :--outlined)) .base { outline-color: var(--m3e-outlined-chip-outline-color, ${DesignToken.color.outlineVariant}); } :host(:disabled:is(:state(--outlined), :--outlined)) .base, :host([disabled-interactive]:is(:state(--outlined), :--outlined)) .base { outline-color: color-mix( in srgb, var(--m3e-outlined-chip-disabled-outline-color, ${DesignToken.color.onSurface}) var(--m3e-outlined-chip-disabled-outline-opacity, 12%), transparent ); } :host(:is(:state(--with-icon), :--with-icon)) .wrapper { padding-inline-start: var(--m3e-chip-with-icon-padding-start, ${DesignToken.measurement.space100}); } :host(:not(:is(:state(--with-icon), :--with-icon))) .wrapper { padding-inline-start: var(--m3e-chip-padding-start, ${DesignToken.measurement.space200}); } :host(:is(:state(--with-trailing-icon), :--with-trailing-icon)) .wrapper { padding-inline-end: var(--m3e-chip-with-icon-padding-end, ${DesignToken.measurement.space100}); } :host(:not(:is(:state(--with-trailing-icon), :--with-trailing-icon))) .wrapper { padding-inline-end: var(--m3e-chip-padding-end, ${DesignToken.measurement.space200}); } ::slotted([slot="icon"]), ::slotted([slot="trailing-icon"]) { flex: none; width: 1em; font-size: var(--m3e-chip-icon-size, 18px) !important; } :host(:not(:disabled):not([disabled-interactive]):not([selected])) .base { color: var(--m3e-chip-label-text-color, ${DesignToken.color.onSurface}); } :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="icon"]), :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="trailing-icon"]) { color: var(--m3e-chip-icon-color, ${DesignToken.color.primary}); } :host(:disabled) .base, :host([disabled-interactive]) .base { color: color-mix( in srgb, var(--m3e-chip-disabled-label-text-color, ${DesignToken.color.onSurface}) var(--m3e-chip-disabled-label-text-opacity, 38%), transparent ); } :host(:disabled) ::slotted([slot="icon"]), :host([disabled-interactive]) ::slotted([slot="icon"]), :host(:disabled) ::slotted([slot="trailing-icon"]), :host([disabled-interactive]) ::slotted([slot="trailing-icon"]) { color: color-mix( in srgb, var(--m3e-chip-disabled-icon-color, ${DesignToken.color.onSurface}) var(--m3e-chip-disabled-icon-opacity, 38%), transparent ); } :host(:is(:state(--elevated), :--elevated):disabled) .base, :host(:is(:state(--elevated), :--elevated)[disabled-interactive]) .base { background-color: color-mix( in srgb, var(--m3e-elevated-chip-disabled-container-color, ${DesignToken.color.onSurface}) var(--m3e-elevated-chip-disabled-container-opacity, 12%), transparent ); --m3e-elevation-level: var(--m3e-elevated-chip-disabled-elevation, ${DesignToken.elevation.level0}); } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { transition: none; } :host(:not(:disabled):not([disabled-interactive]):not([selected])) .base, :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="icon"]), :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="trailing-icon"]) { color: CanvasText; } :host(:not(:disabled):not([disabled-interactive]):is(:state(--outlined), :--outlined)) .base { outline-color: CanvasText; } :host(:disabled) .base, :host([disabled-interactive]) .base, :host(:disabled) ::slotted([slot="icon"]), :host([disabled-interactive]) ::slotted([slot="icon"]), :host(:disabled) ::slotted([slot="trailing-icon"]), :host([disabled-interactive]) ::slotted([slot="trailing-icon"]) { color: GrayText; } :host(:disabled:is(:state(--outlined), :--outlined)) .base, :host([disabled-interactive]:is(:state(--outlined), :--outlined)) .base { outline-color: GrayText; } }`;
__decorate([query(".elevation")], M3eChipElement.prototype, "_elevation", void 0);
__decorate([query(".focus-ring")], M3eChipElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eChipElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eChipElement.prototype, "_ripple", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eChipElement.prototype, "variant", void 0);
__decorate([property()], M3eChipElement.prototype, "value", null);
M3eChipElement = __decorate([customElement("m3e-chip")], M3eChipElement);

/**
 * A chip users interact with to perform a smart or automated action that can span multiple applications.
 *
 * @description
 * The `m3e-assist-chip` component presents a Material 3 assist chip, providing users with quick access to
 * contextually relevant actions. It is designed for use cases like suggested actions, quick filters, or
 * secondary operations, and supports accessibility, keyboard interaction, and expressive state styling
 * in line with Material 3 guidelines.  Appearance variants include `elevated` and `outlined`, enabling visual
 * differentiation and contextual emphasis.
 *
 * @example
 * The following example illustrates use of the `m3e-assist-chip`.  In this example, multiple chips are nested inside
 * a `m3e-chip-set` container to create a cohesive set of chips. The container is given the ARIA `role="group"` to convey
 * to assistive technologies that the chips are part of a related set of element.
 * ```html
 * <m3e-chip-set role="group" aria-label="Quick actions">
 *  <m3e-assist-chip><m3e-icon slot="icon" name="edit"></m3e-icon>Edit</m3e-assist-chip>
 *  <m3e-assist-chip><m3e-icon slot="icon" name="delete"></m3e-icon>Delete</m3e-assist-chip>
 *  <m3e-assist-chip><m3e-icon slot="icon" name="content_copy"></m3e-icon>Copy</m3e-assist-chip>
 *  <m3e-assist-chip><m3e-icon slot="icon" name="share"></m3e-icon>Share</m3e-assist-chip>
 * </m3e-chip-set>
 * ```
 *
 * @tag m3e-assist-chip
 *
 * @slot - Renders the label of the chip.
 * @slot icon - Renders an icon before the chip's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr name - The name of the element, submitted as a pair with the element's `value` as part of form data, when the element is used to submit a form.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr target - The target of the link button.
 * @attr type - The type of the element.
 * @attr value - A string representing the value of the chip.
 * @attr variant - The appearance variant of the chip.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-chip-container-shape - Border radius of the chip container.
 * @cssprop --m3e-chip-container-height - Base height of the chip container before density adjustment.
 * @cssprop --m3e-chip-label-text-font-size - Font size of the chip label text.
 * @cssprop --m3e-chip-label-text-font-weight - Font weight of the chip label text.
 * @cssprop --m3e-chip-label-text-line-height - Line height of the chip label text.
 * @cssprop --m3e-chip-label-text-tracking - Letter spacing of the chip label text.
 * @cssprop --m3e-chip-label-text-color - Label text color in default state.
 * @cssprop --m3e-chip-icon-color - Icon color in default state.
 * @cssprop --m3e-chip-icon-size - Font size of leading/trailing icons.
 * @cssprop --m3e-chip-spacing - Horizontal gap between chip content elements.
 * @cssprop --m3e-chip-padding-start - Default start padding when no icon is present.
 * @cssprop --m3e-chip-padding-end - Default end padding when no trailing icon is present.
 * @cssprop --m3e-chip-with-icon-padding-start - Start padding when leading icon is present.
 * @cssprop --m3e-chip-with-icon-padding-end - End padding when trailing icon is present.
 * @cssprop --m3e-chip-disabled-label-text-color - Base color for disabled label text.
 * @cssprop --m3e-chip-disabled-label-text-opacity - Opacity applied to disabled label text.
 * @cssprop --m3e-chip-disabled-icon-color - Base color for disabled icons.
 * @cssprop --m3e-chip-disabled-icon-opacity - Opacity applied to disabled icons.
 * @cssprop --m3e-elevated-chip-container-color - Background color for elevated variant.
 * @cssprop --m3e-elevated-chip-elevation - Elevation level for elevated variant.
 * @cssprop --m3e-elevated-chip-hover-elevation - Elevation level on hover.
 * @cssprop --m3e-elevated-chip-disabled-container-color - Background color for disabled elevated variant.
 * @cssprop --m3e-elevated-chip-disabled-container-opacity - Opacity applied to disabled elevated background.
 * @cssprop --m3e-elevated-chip-disabled-elevation - Elevation level for disabled elevated variant.
 * @cssprop --m3e-outlined-chip-outline-thickness - Outline thickness for outlined variant.
 * @cssprop --m3e-outlined-chip-outline-color - Outline color for outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-color - Outline color for disabled outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-opacity - Opacity applied to disabled outline.
 */
let M3eAssistChipElement = class M3eAssistChipElement extends FormSubmitter(LinkButton(KeyboardClick(Focusable(DisabledInteractive(Disabled(Role(M3eChipElement, "button"))))))) {
  /** @internal @inheritdoc */
  _renderTrailingIcon() {
    return nothing;
  }
};
/** Indicates that this custom element participates in form submission, validation, and form state restoration. */
M3eAssistChipElement.formAssociated = true;
M3eAssistChipElement = __decorate([customElement("m3e-assist-chip")], M3eAssistChipElement);

/**
 * A container used to organize chips into a cohesive unit.
 *
 * @description
 * The `m3e-chip-set` component provides a flexible container for grouping chips, supporting both
 * horizontal and vertical layouts. It manages chip arrangement, spacing, and accessibility, and
 * serves as the foundation for chip set variants such as input and filter chip sets.
 *
 * @example
 * The following example illustrates use of the `m3e-chip` and `m3e-chip-set` components to present non-interactive chips.
 * ```html
 * <m3e-chip-set>
 *  <m3e-chip><m3e-icon slot="icon" name="palette"></m3e-icon>Design</m3e-chip>
 *  <m3e-chip><m3e-icon slot="icon" name="accessibility_new"></m3e-icon>Accessibility</m3e-chip>
 *  <m3e-chip><m3e-icon slot="icon" name="motion_photos_on"></m3e-icon>Motion</m3e-chip>
 *  <m3e-chip><m3e-icon slot="icon" name="description"></m3e-icon>Documentation</m3e-chip>
 * </m3e-chip-set>
 * ```
 *
 * @tag m3e-chip-set
 *
 * @slot - Renders the chips of the set.
 *
 * @attr vertical - Whether the element is oriented vertically.
 *
 * @cssprop --m3e-chip-set-spacing - The spacing (gap) between chips in the set.
 */
let M3eChipSetElement = class M3eChipSetElement extends Vertical(LitElement) {
  /** @inheritdoc */
  render() {
    return html`<slot></slot>`;
  }
};
/** The styles of the element. */
M3eChipSetElement.styles = css`:host { display: inline-flex; flex-wrap: wrap; vertical-align: middle; gap: var(--m3e-chip-set-spacing, ${DesignToken.measurement.space100}); outline: none; } :host([hidden]) { display: none; } :host([vertical]) { flex-direction: column; }`;
M3eChipSetElement = __decorate([customElement("m3e-chip-set")], M3eChipSetElement);

var _M3eFilterChipElement_instances, _M3eFilterChipElement_clickHandler, _M3eFilterChipElement_handleClick;
/**
 * A chip users interact with to select/deselect options.
 *
 * @description
 * The `m3e-filter-chip` component presents a chip that users can select or deselect to filter
 * content or data sets. It supports single and multi-selection, keyboard interaction, accessibility,
 * and expressive state styling, providing a modern and interactive filtering experience in line
 * with Material 3 guidelines.  Appearance variants include `elevated` and `outlined`, enabling visual
 * differentiation and contextual emphasis.
 *
 * @example
 * The following example illustrates a single-select `m3e-filter-chip-set` containing multiple `m3e-filter-chip` components that
 * allow a user to choose an option. You can use the `multi` attribute to enable multiselect.
 * ```html
 * <m3e-filter-chip-set aria-label="Filter by topic">
 *  <m3e-filter-chip><m3e-icon slot="icon" name="palette"></m3e-icon>Design</m3e-filter-chip>
 *  <m3e-filter-chip><m3e-icon slot="icon" name="accessibility_new"></m3e-icon>Accessibility</m3e-filter-chip>
 *  <m3e-filter-chip><m3e-icon slot="icon" name="motion_photos_on"></m3e-icon>Motion</m3e-filter-chip>
 *  <m3e-filter-chip><m3e-icon slot="icon" name="description"></m3e-icon>Documentation</m3e-filter-chip>
 * </m3e-filter-chip-set>
 * ```
 *
 * @tag m3e-filter-chip
 *
 * @slot - Renders the label of the chip.
 * @slot icon - Renders an icon before the chip's label.
 * @slot trailing-icon - Renders an icon after the chip's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr selected - Whether the element is selected.
 * @attr value - A string representing the value of the chip.
 * @attr variant - The appearance variant of the chip.
 *
 * @fires beforeinput - Dispatched before the selected state changes.
 * @fires input - Dispatched when the selected state changes.
 * @fires change - Dispatched when the selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-chip-container-shape - Border radius of the chip container.
 * @cssprop --m3e-chip-container-height - Base height of the chip container before density adjustment.
 * @cssprop --m3e-chip-label-text-font-size - Font size of the chip label text.
 * @cssprop --m3e-chip-label-text-font-weight - Font weight of the chip label text.
 * @cssprop --m3e-chip-label-text-line-height - Line height of the chip label text.
 * @cssprop --m3e-chip-label-text-tracking - Letter spacing of the chip label text.
 * @cssprop --m3e-chip-icon-size - Font size of leading/trailing icons.
 * @cssprop --m3e-chip-spacing - Horizontal gap between chip content elements.
 * @cssprop --m3e-chip-padding-start - Default start padding when no icon is present.
 * @cssprop --m3e-chip-padding-end - Default end padding when no trailing icon is present.
 * @cssprop --m3e-chip-with-icon-padding-start - Start padding when leading icon is present.
 * @cssprop --m3e-chip-with-icon-padding-end - End padding when trailing icon is present.
 * @cssprop --m3e-chip-disabled-label-text-color - Base color for disabled label text.
 * @cssprop --m3e-chip-disabled-label-text-opacity - Opacity applied to disabled label text.
 * @cssprop --m3e-chip-disabled-icon-color - Base color for disabled icons.
 * @cssprop --m3e-chip-disabled-icon-opacity - Opacity applied to disabled icons.
 * @cssprop --m3e-elevated-chip-container-color - Background color for elevated variant.
 * @cssprop --m3e-elevated-chip-elevation - Elevation level for elevated variant.
 * @cssprop --m3e-elevated-chip-hover-elevation - Elevation level on hover.
 * @cssprop --m3e-elevated-chip-disabled-container-color - Background color for disabled elevated variant.
 * @cssprop --m3e-elevated-chip-disabled-container-opacity - Opacity applied to disabled elevated background.
 * @cssprop --m3e-elevated-chip-disabled-elevation - Elevation level for disabled elevated variant.
 * @cssprop --m3e-outlined-chip-outline-thickness - Outline thickness for outlined variant.
 * @cssprop --m3e-outlined-chip-outline-color - Outline color for outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-color - Outline color for disabled outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-opacity - Opacity applied to disabled outline.
 * @cssprop --m3e-chip-selected-outline-thickness - Outline thickness for selected state.
 * @cssprop --m3e-chip-selected-label-text-color - Text color in selected state.
 * @cssprop --m3e-chip-selected-container-color - Background color in selected state.
 * @cssprop --m3e-chip-selected-container-hover-color - Hover state layer color in selected state.
 * @cssprop --m3e-chip-selected-container-focus-color - Focus state layer color in selected state.
 * @cssprop --m3e-chip-selected-hover-elevation - Elevation on hover in selected state.
 * @cssprop --m3e-chip-selected-ripple-color - Ripple color in selected state.
 * @cssprop --m3e-chip-selected-state-layer-focus-color - Focus state layer color in selected state.
 * @cssprop --m3e-chip-selected-state-layer-hover-color - Hover state layer color in selected state.
 * @cssprop --m3e-chip-selected-leading-icon-color - Leading icon color in selected state.
 * @cssprop --m3e-chip-selected-trailing-icon-color - Trailing icon color in selected state.
 * @cssprop --m3e-chip-unselected-label-text-color - Text color in unselected state.
 * @cssprop --m3e-chip-unselected-ripple-color - Ripple color in unselected state.
 * @cssprop --m3e-chip-unselected-state-layer-focus-color - Focus state layer color in unselected state.
 * @cssprop --m3e-chip-unselected-state-layer-hover-color - Hover state layer color in unselected state.
 * @cssprop --m3e-chip-unselected-leading-icon-color - Leading icon color in unselected state.
 * @cssprop --m3e-chip-unselected-trailing-icon-color - Trailing icon color in unselected state.
 */
let M3eFilterChipElement = class M3eFilterChipElement extends Selected(KeyboardClick(Focusable(DisabledInteractive(Disabled(Role(M3eChipElement, "radio")))))) {
  constructor() {
    super(...arguments);
    _M3eFilterChipElement_instances.add(this);
    /** @private */
    _M3eFilterChipElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eFilterChipElement_instances, "m", _M3eFilterChipElement_handleClick).call(this, e));
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eFilterChipElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eFilterChipElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      this.closest("m3e-filter-chip-set")?.[selectionManager].notifySelectionChange(this);
    }
  }
  /** @inheritdoc @private */
  _renderIcon() {
    return html`<div class="icon" aria-hidden="true"><svg class="check" viewBox="0 -960 960 960" aria-hidden="true"><path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> ${super._renderIcon()}</div>`;
  }
};
_M3eFilterChipElement_clickHandler = new WeakMap();
_M3eFilterChipElement_instances = new WeakSet();
_M3eFilterChipElement_handleClick = function _M3eFilterChipElement_handleClick(e) {
  if (e.defaultPrevented) return;
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    this.selected = !this.selected;
    this.closest("m3e-filter-chip-set")?.[selectionManager].notifySelectionChange(this);
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
/** Indicates that this custom element participates in form submission, validation, and form state restoration. */
M3eFilterChipElement.formAssociated = true;
/** The styles of the element. */
M3eFilterChipElement.styles = [M3eChipElement.styles, css`:host([selected]:not(:is(:state(--hide-selection), :--hide-selection))) .wrapper { padding-inline-start: var(--m3e-chip-with-icon-padding-start, ${DesignToken.measurement.space100}); } .icon { display: flex; align-items: center; justify-content: center; } .check { width: 1em; font-size: var(--m3e-chip-icon-size, 18px); } :host(:not(:disabled):not([disabled-interactive])) .check { color: var(--m3e-chip-selected-leading-icon-color, ${DesignToken.color.onSecondaryContainer}); } :host(:not([selected])) .check, :host(:is(:state(--hide-selection), :--hide-selection)) .check, :host(:is(:state(--hide-selection), :--hide-selection):not(:is(:state(--with-icon), :--with-icon))) .icon { display: none; } :host(:not(:is(:state(--with-icon), :--with-icon))) .icon { margin-inline-start: calc(0px - var(--m3e-chip-with-icon-padding-start, ${DesignToken.measurement.space100})); transition: margin-inline-start ${DesignToken.motion.spring.fastEffects}; } :host([selected]) .icon { margin-inline-start: 0; } :host([selected]:not(:is(:state(--hide-selection), :--hide-selection))) ::slotted([slot="icon"]) { display: none !important; } :host(:not(:disabled):not([disabled-interactive]):not([selected])) .base { color: var(--m3e-chip-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}); --m3e-ripple-color: var(--m3e-chip-unselected-ripple-color, ${DesignToken.color.onSurfaceVariant}); --m3e-state-layer-focus-color: var( --m3e-chip-unselected-state-layer-focus-color, ${DesignToken.color.onSurfaceVariant} ); --m3e-state-layer-hover-color: var( --m3e-chip-unselected-state-layer-hover-color, ${DesignToken.color.onSurfaceVariant} ); } :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="icon"]) { color: var(--m3e-chip-unselected-leading-icon-color, ${DesignToken.color.primary}); } :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="trailing-icon"]) { color: var(--m3e-chip-unselected-trailing-icon-color, ${DesignToken.color.onSurfaceVariant}); } :host(:not(:disabled):not([disabled-interactive])[selected]) .base { outline-offset: unset; outline-width: var(--m3e-chip-selected-outline-thickness, 0); color: var(--m3e-chip-selected-label-text-color, ${DesignToken.color.onSecondaryContainer}); background-color: var(--m3e-chip-selected-container-color, ${DesignToken.color.secondaryContainer}); --m3e-state-layer-hover-color: var( --m3e-chip-selected-container-hover-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-chip-selected-container-focus-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-elevation-hover-level: var(--m3e-chip-selected-hover-elevation, ${DesignToken.elevation.level1}); --m3e-ripple-color: var(--m3e-chip-selected-ripple-color, ${DesignToken.color.onSecondaryContainer}); --m3e-state-layer-focus-color: var( --m3e-chip-selected-state-layer-focus-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-state-layer-hover-color: var( --m3e-chip-selected-state-layer-hover-color, ${DesignToken.color.onSecondaryContainer} ); } :host(:not(:disabled):not([disabled-interactive])[selected]) ::slotted([slot="icon"]) { color: var(--m3e-chip-selected-leading-icon-color, ${DesignToken.color.onSecondaryContainer}); } :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="trailing-icon"]) { color: var(--m3e-chip-selected-trailing-icon-color, ${DesignToken.color.onSecondaryContainer}); } @media (prefers-reduced-motion) { .base, :host(:not(:is(:state(--with-icon), :--with-icon))) .icon { transition: none; } } @media (forced-colors: active) { :host(:not(:disabled):not([disabled-interactive]):not([selected])) .base, :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="icon"]), :host(:not(:disabled):not([disabled-interactive]):not([selected])) ::slotted([slot="trailing-icon"]) { color: CanvasText; } :host(:not(:disabled):not([disabled-interactive])[selected]) .base, :host(:not(:disabled):not([disabled-interactive])[selected]) ::slotted([slot="icon"]), :host(:not(:disabled):not([disabled-interactive])[selected]) ::slotted([slot="trailing-icon"]), :host(:not(:disabled):not([disabled-interactive])) .check { color: ButtonText; } :host(:not(:disabled):not([disabled-interactive])[selected]) .base { outline-offset: calc(0px - var(--m3e-outlined-chip-outline-thickness, 1px)); outline-width: var(--m3e-outlined-chip-outline-thickness, 1px); outline-color: ButtonText; } }`];
M3eFilterChipElement = __decorate([customElement("m3e-filter-chip")], M3eFilterChipElement);

var _M3eFilterChipSetElement_instances, _M3eFilterChipSetElement_directionalitySubscription, _M3eFilterChipSetElement_handleSlotChange, _M3eFilterChipSetElement_handleKeyDown, _M3eFilterChipSetElement_handleChange, _M3eFilterChipSetElement_updateChipRole, _a;
/**
 * A container that organizes filter chips into a cohesive group, enabling selection and
 * deselection of values used to refine content or trigger contextual behavior.
 *
 * @description
 * The `m3e-filter-chip-set` component presents a group of filter chips, enabling users to select
 * one or more options to filter content or data sets. It supports single and multi-selection,
 * keyboard navigation, accessibility, and seamless form association, providing expressive and
 * interactive filtering experiences in line with Material 3 guidelines.
 *
 * @example
 * The following example illustrates a single-select `m3e-filter-chip-set` containing multiple `m3e-filter-chip` components that
 * allow a user to choose an option. You can use the `multi` attribute to enable multiselect.
 * ```html
 * <m3e-filter-chip-set aria-label="Filter by topic">
 *  <m3e-filter-chip><m3e-icon slot="icon" name="palette"></m3e-icon>Design</m3e-filter-chip>
 *  <m3e-filter-chip><m3e-icon slot="icon" name="accessibility_new"></m3e-icon>Accessibility</m3e-filter-chip>
 *  <m3e-filter-chip><m3e-icon slot="icon" name="motion_photos_on"></m3e-icon>Motion</m3e-filter-chip>
 *  <m3e-filter-chip><m3e-icon slot="icon" name="description"></m3e-icon>Documentation</m3e-filter-chip>
 * </m3e-filter-chip-set>
 * ```
 *
 * @tag m3e-filter-chip-set
 *
 * @slot - Renders the chips of the set.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr hide-selection-indicator - Whether to hide the selection indicator.
 * @attr multi - Whether multiple chips can be selected.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr vertical - Whether the element is oriented vertically.
 *
 * @fires beforeinput - Dispatched before the selected state of a chip changes.
 * @fires input - Dispatched when the selected state of a chip changes.
 * @fires change - Dispatched when the selected state of a chip changes.
 *
 * @cssprop --m3e-chip-set-spacing - The spacing (gap) between chips in the set.
 */
let M3eFilterChipSetElement = class M3eFilterChipSetElement extends Labelled(Dirty(Touched(FormAssociated(Disabled(AttachInternals(Role(M3eChipSetElement, "radiogroup"))))))) {
  constructor() {
    super(...arguments);
    _M3eFilterChipSetElement_instances.add(this);
    /** @private */
    _M3eFilterChipSetElement_directionalitySubscription.set(this, void 0);
    /** @internal */
    this[_a] = new SelectionManager().onActiveItemChange(() => this[selectionManager].activeItem?.focus()).withWrap().withDirectionality(M3eDirectionality.current);
    /**
     * Whether multiple chips can be selected.
     * @default false
     */
    this.multi = false;
    /**
     * Whether to hide the selection indicator.
     * @default false
     */
    this.hideSelectionIndicator = false;
  }
  /** The chips of the set. */
  get chips() {
    return this[selectionManager]?.items ?? [];
  }
  /** The selected chip(s) of the set. */
  get selected() {
    return this[selectionManager]?.selectedItems ?? [];
  }
  /** The selected (enabled) value(s) of the set. */
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
  get [(_M3eFilterChipSetElement_directionalitySubscription = new WeakMap(), _M3eFilterChipSetElement_instances = new WeakSet(), _a = selectionManager, formValue)]() {
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
    __classPrivateFieldSet(this, _M3eFilterChipSetElement_directionalitySubscription, M3eDirectionality.observe(() => this[selectionManager].directionality = M3eDirectionality.current), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eFilterChipSetElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("vertical")) {
      this[selectionManager].vertical = this.vertical;
    }
    if (changedProperties.has("disabled") && (changedProperties.get("disabled") !== undefined || this.disabled)) {
      this[selectionManager].disabled = this.disabled;
    }
    if (changedProperties.has("multi")) {
      this.role = this.multi ? "group" : "radiogroup";
      __classPrivateFieldGet(this, _M3eFilterChipSetElement_instances, "m", _M3eFilterChipSetElement_updateChipRole).call(this);
      this[selectionManager].multi = this.multi;
      this[selectionManager].disableRovingTabIndex(this.multi);
    }
    if (changedProperties.has("multi") || changedProperties.has("disabled")) {
      // aria-disabled is not supported on radiogroup roles.
      this.ariaDisabled = this.multi && this.disabled ? "true" : null;
    }
    if (changedProperties.has("hideSelectionIndicator")) {
      this.chips.forEach(x => setCustomState(x, "--hide-selection", this.hideSelectionIndicator));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eFilterChipSetElement_instances, "m", _M3eFilterChipSetElement_handleSlotChange)}" @keydown="${__classPrivateFieldGet(this, _M3eFilterChipSetElement_instances, "m", _M3eFilterChipSetElement_handleKeyDown)}" @change="${__classPrivateFieldGet(this, _M3eFilterChipSetElement_instances, "m", _M3eFilterChipSetElement_handleChange)}"></slot>`;
  }
};
_M3eFilterChipSetElement_handleSlotChange = function _M3eFilterChipSetElement_handleSlotChange() {
  const {
    added
  } = this[selectionManager].setItems([...this.querySelectorAll("m3e-filter-chip")]);
  added.forEach(x => setCustomState(x, "--hide-selection", this.hideSelectionIndicator));
  __classPrivateFieldGet(this, _M3eFilterChipSetElement_instances, "m", _M3eFilterChipSetElement_updateChipRole).call(this);
};
_M3eFilterChipSetElement_handleKeyDown = function _M3eFilterChipSetElement_handleKeyDown(e) {
  if (!this.multi) {
    this[selectionManager].onKeyDown(e);
  }
};
_M3eFilterChipSetElement_handleChange = function _M3eFilterChipSetElement_handleChange(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eFilterChipSetElement_updateChipRole = function _M3eFilterChipSetElement_updateChipRole() {
  this.chips.forEach(x => {
    if (this.multi) {
      x.role = "button";
      x.ariaPressed = `${x.selected}`;
      x.ariaSelected = x.ariaChecked = null;
    } else {
      x.role = "radio";
      x.ariaChecked = `${x.selected}`;
      x.ariaPressed = x.ariaSelected = null;
    }
  });
};
__decorate([property({
  type: Boolean
})], M3eFilterChipSetElement.prototype, "multi", void 0);
__decorate([property({
  attribute: "hide-selection-indicator",
  type: Boolean
})], M3eFilterChipSetElement.prototype, "hideSelectionIndicator", void 0);
M3eFilterChipSetElement = __decorate([customElement("m3e-filter-chip-set")], M3eFilterChipSetElement);

var _M3eInputChipElement_instances, _M3eInputChipElement_handleAvatarSlotChange, _M3eInputChipElement_handleRemoveButtonClick, _M3eInputChipElement_handleKeyDown;
/**
 * A chip which represents a discrete piece of information entered by a user.
 *
 * @description
 * The `m3e-input-chip` component represents an input chip, allowing users to enter, display,
 * and manage discrete values such as tags or keywords. It supports expressive styling, accessibility,
 * keyboard interaction, and appearance variants including `elevated` and `outlined`.
 *
 * @example
 * The following example illustrates the use of the `m3e-input-chip-set` inside a `m3e-form-field`.
 * In this example, the `input` slot specifies the `input` element used to add input chips and the
 * field label's `for` attribute targets the `input` element to provide an accessible label.
 * ```html
 * <m3e-form-field>
 *  <label slot="label" for="keywords">Keywords</label>
 *  <m3e-input-chip-set aria-label="Enter keywords">
 *    <input id="keywords" slot="input" placeholder="New keyword..." />
 *  </m3e-input-chip-set>
 * </m3e-form-field>
 * ```
 *
 * @tag m3e-input-chip
 *
 * @slot - Renders the label of the chip.
 * @slot avatar - Renders an avatar before the chip's label.
 * @slot icon - Renders an icon before the chip's label.
 * @slot remove-icon - Renders the icon for the button used to remove the chip.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr removable - Whether the chip is removable.
 * @attr remove-label - The accessible label given to the button used to remove the chip.
 * @attr value - A string representing the value of the chip.
 * @attr variant - The appearance variant of the chip.
 *
 * @fires remove - Dispatched when the remove button is clicked or DELETE or BACKSPACE key is pressed.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-chip-container-shape - Border radius of the chip container.
 * @cssprop --m3e-chip-container-height - Base height of the chip container before density adjustment.
 * @cssprop --m3e-chip-label-text-font-size - Font size of the chip label text.
 * @cssprop --m3e-chip-label-text-font-weight - Font weight of the chip label text.
 * @cssprop --m3e-chip-label-text-line-height - Line height of the chip label text.
 * @cssprop --m3e-chip-label-text-tracking - Letter spacing of the chip label text.
 * @cssprop --m3e-chip-label-text-color - Label text color in default state.
 * @cssprop --m3e-chip-icon-color - Icon color in default state.
 * @cssprop --m3e-chip-icon-size - Font size of leading/trailing icons.
 * @cssprop --m3e-chip-spacing - Horizontal gap between chip content elements.
 * @cssprop --m3e-chip-padding-start - Default start padding when no icon is present.
 * @cssprop --m3e-chip-padding-end - Default end padding when no trailing icon is present.
 * @cssprop --m3e-chip-with-icon-padding-start - Start padding when leading icon is present.
 * @cssprop --m3e-chip-with-icon-padding-end - End padding when trailing icon is present.
 * @cssprop --m3e-chip-disabled-label-text-color - Base color for disabled label text.
 * @cssprop --m3e-chip-disabled-label-text-opacity - Opacity applied to disabled label text.
 * @cssprop --m3e-chip-disabled-icon-color - Base color for disabled icons.
 * @cssprop --m3e-chip-disabled-icon-opacity - Opacity applied to disabled icons.
 * @cssprop --m3e-elevated-chip-container-color - Background color for elevated variant.
 * @cssprop --m3e-elevated-chip-elevation - Elevation level for elevated variant.
 * @cssprop --m3e-elevated-chip-hover-elevation - Elevation level on hover.
 * @cssprop --m3e-elevated-chip-disabled-container-color - Background color for disabled elevated variant.
 * @cssprop --m3e-elevated-chip-disabled-container-opacity - Opacity applied to disabled elevated background.
 * @cssprop --m3e-elevated-chip-disabled-elevation - Elevation level for disabled elevated variant.
 * @cssprop --m3e-outlined-chip-outline-thickness - Outline thickness for outlined variant.
 * @cssprop --m3e-outlined-chip-outline-color - Outline color for outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-color - Outline color for disabled outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-opacity - Opacity applied to disabled outline.
 * @cssprop --m3e-chip-avatar-size - Font size of the avatar slot content.
 * @cssprop --m3e-chip-avatar-icon-size - Size of the icon displayed inside the avatar when used in a chip.
 * @cssprop --m3e-chip-avatar-font-size - Font size of text initials inside the avatar when used in a chip.
 * @cssprop --m3e-chip-avatar-font-weight - Font weight of text initials inside the avatar when used in a chip.
 * @cssprop --m3e-chip-avatar-line-height - Line height of text initials inside the avatar when used in a chip.
 * @cssprop --m3e-chip-avatar-tracking - Letter spacing (tracking) of text initials inside the avatar when used in a chip.
 * @cssprop --m3e-chip-disabled-avatar-opacity - Opacity applied to the avatar when disabled.
 * @cssprop --m3e-chip-with-avatar-padding-start - Start padding when an avatar is present.
 */
let M3eInputChipElement = class M3eInputChipElement extends DisabledInteractive(Disabled(Role(M3eChipElement, "row"))) {
  constructor() {
    super(...arguments);
    _M3eInputChipElement_instances.add(this);
    /**
     * Whether the chip is removable.
     * @default false
     */
    this.removable = false;
    /**
     * The accessible label given to the button used to remove the chip.
     * @default "Remove"
     */
    this.removeLabel = "Remove";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute("tabindex");
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    this.removeAttribute("tabindex");
    if (changedProperties.has("removable")) {
      setCustomState(this, "--with-trailing-icon", this.removable);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-elevation class="elevation" for="cell" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-elevation><m3e-state-layer class="state-layer" for="cell" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-state-layer><m3e-focus-ring class="focus-ring" for="cell" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" for="cell" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-ripple><div class="wrapper"><div id="cell" class="cell" role="gridcell" tabindex="${ifDefined(this.disabled ? undefined : "-1")}" @keydown="${__classPrivateFieldGet(this, _M3eInputChipElement_instances, "m", _M3eInputChipElement_handleKeyDown)}"><slot name="avatar" @slotchange="${__classPrivateFieldGet(this, _M3eInputChipElement_instances, "m", _M3eInputChipElement_handleAvatarSlotChange)}"></slot>${this._renderIcon()}<div class="label">${this._renderSlot()}</div><div class="touch" aria-hidden="true"></div></div>${this._renderTrailingIcon()}</div></div>`;
  }
  /** @internal @inheritdoc */
  _renderTrailingIcon() {
    return this.removable ? html`<span role="gridcell" class="remove"><m3e-icon-button class="remove-button" aria-label="${this.removeLabel}" size="extra-small" tabindex="-1" ?disabled="${this.disabled}" ?disabled-interactive="${this.disabledInteractive}" @click="${__classPrivateFieldGet(this, _M3eInputChipElement_instances, "m", _M3eInputChipElement_handleRemoveButtonClick)}"><slot name="remove-icon"><svg class="remove-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></slot></m3e-icon-button></span>` : nothing;
  }
};
_M3eInputChipElement_instances = new WeakSet();
_M3eInputChipElement_handleAvatarSlotChange = function _M3eInputChipElement_handleAvatarSlotChange(e) {
  setCustomState(this, "--with-avatar", hasAssignedNodes(e.target));
};
_M3eInputChipElement_handleRemoveButtonClick = function _M3eInputChipElement_handleRemoveButtonClick(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event("remove"));
};
_M3eInputChipElement_handleKeyDown = function _M3eInputChipElement_handleKeyDown(e) {
  if (this.removable) {
    switch (e.key) {
      case "Backspace":
      case "Delete":
        this.dispatchEvent(new Event("remove"));
        break;
    }
  }
};
/** Indicates that this custom element participates in form submission, validation, and form state restoration. */
M3eInputChipElement.formAssociated = true;
/** The styles of the element. */
M3eInputChipElement.styles = [M3eChipElement.styles, css`.cell { display: inline-flex; align-items: center; outline: none; column-gap: var(--m3e-chip-spacing, ${DesignToken.measurement.space100}); min-width: 0; } .remove { line-height: 0; } .remove-button { --m3e-icon-button-extra-small-container-height: 24px; --m3e-icon-button-extra-small-icon-size: var(--m3e-chip-icon-size, 18px); width: 24px; } .remove-icon { flex: none; width: var(--m3e-chip-icon-size, 18px); height: var(--m3e-chip-icon-size, 18px); } .touch { top: calc( 0px - calc(calc(48px - calc(var(--m3e-chip-container-height, 32px) + ${DesignToken.density.calc(-3)})) / 2) ); } .wrapper { height: 100%; overflow: visible; min-width: 0; } ::slotted([slot="avatar"]) { flex: none; font-size: var(--m3e-chip-avatar-size, 24px); } ::slotted(m3e-avatar[slot="avatar"]) { --m3e-icon-size: var(--m3e-chip-avatar-icon-size, 18px); --m3e-avatar-size: var(--m3e-chip-avatar-size, 24px); --m3e-avatar-font-size: var( --m3e-chip-avatar-font-size, ${DesignToken.typescale.standard.title.small.fontSize} ); --m3e-avatar-font-weight: var( --m3e-chip-avatar-font-height, ${DesignToken.typescale.standard.title.small.fontWeight} ); --m3e-avatar-line-height: var( --m3e-chip-avatar-line-height, ${DesignToken.typescale.standard.title.small.lineHeight} ); --m3e-avatar-tracking: var(--m3e-chip-avatar-tracking, ${DesignToken.typescale.standard.title.small.tracking}); } :host(:disabled) ::slotted([slot="avatar"]), :host([disabled-interactive]) ::slotted([slot="avatar"]) { opacity: var(--m3e-chip-disabled-avatar-opacity, 38%); color: var(--m3e-chip-disabled-icon-color, ${DesignToken.color.onSurface}); } :host(:is(:state(--with-avatar), :--with-avatar)) ::slotted([slot="icon"]) { display: none; } :host(:is(:state(--with-avatar), :--with-avatar)) .wrapper { padding-inline-start: var(--m3e-chip-with-avatar-padding-start, ${DesignToken.measurement.space50}); } @media (forced-colors: active) { :host(:disabled) ::slotted([slot="avatar"]), :host([disabled-interactive]) ::slotted([slot="avatar"]) { color: CanvasText; } }`];
__decorate([query(".cell")], M3eInputChipElement.prototype, "cell", void 0);
__decorate([query(".remove-button")], M3eInputChipElement.prototype, "removeButton", void 0);
__decorate([property({
  type: Boolean
})], M3eInputChipElement.prototype, "removable", void 0);
__decorate([property({
  attribute: "remove-label"
})], M3eInputChipElement.prototype, "removeLabel", void 0);
M3eInputChipElement = __decorate([customElement("m3e-input-chip")], M3eInputChipElement);

var _M3eInputChipSetElement_instances, _M3eInputChipSetElement_directionalitySubscription, _M3eInputChipSetElement_inputChangeHandler, _M3eInputChipSetElement_inputKeyDownHandler, _M3eInputChipSetElement_focusHandler, _M3eInputChipSetElement_focusInHandler, _M3eInputChipSetElement_focusOutHandler, _M3eInputChipSetElement_chipRemoveHandler, _M3eInputChipSetElement_chipClickHandler, _M3eInputChipSetElement_listManager, _M3eInputChipSetElement_listKeyManager, _M3eInputChipSetElement_ignoreInputChange, _M3eInputChipSetElement_input, _M3eInputChipSetElement_tabindex, _M3eInputChipSetElement_handleKeyDown, _M3eInputChipSetElement_handleSlotChange, _M3eInputChipSetElement_handleInputSlotChange, _M3eInputChipSetElement_handleFocus, _M3eInputChipSetElement_handleFocusIn, _M3eInputChipSetElement_handleFocusOut, _M3eInputChipSetElement_handleChipRemove, _M3eInputChipSetElement_handleChipClick, _M3eInputChipSetElement_handleInputChange, _M3eInputChipSetElement_handleInputKeyDown, _M3eInputChipSetElement_updateChipVisibility;
/**
 * A container that transforms user input into a cohesive set of interactive chips, supporting entry, editing, and removal of discrete values.
 *
 * @description
 * The `m3e-input-chip-set` component enables users to input, display, and manage a collection of discrete
 * values as input chips. Designed for expressive, accessible forms, it supports keyboard navigation, validation,
 * and seamless integration with form controls. This component is ideal for capturing user-generated tags,
 * keywords, or selections in a visually consistent and interactive manner.
 *
 * @example
 * The following example illustrates the use of the `m3e-input-chip-set` inside a `m3e-form-field`.
 * In this example, the `input` slot specifies the `input` element used to add input chips and the
 * field label's `for` attribute targets the `input` element to provide an accessible label.
 * ```html
 * <m3e-form-field>
 *  <label slot="label" for="keywords">Keywords</label>
 *  <m3e-input-chip-set aria-label="Enter keywords">
 *    <input id="keywords" slot="input" placeholder="New keyword..." />
 *  </m3e-input-chip-set>
 * </m3e-form-field>
 * ```
 *
 * @tag m3e-input-chip-set
 *
 * @slot - Renders the chips of the set.
 * @slot input - Renders the input element used to add new chips to the set.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr required - Whether a value is required for the element.
 * @attr vertical - Whether the element is oriented vertically.
 * @attr max-chips - Maximum number of chips to display when not focused. When focused, all chips are displayed.
 *
 * @fires change - Dispatched when a chip is added to, or removed from, the set.
 *
 * @cssprop --m3e-chip-set-spacing - The spacing (gap) between chips in the set.
 */
let M3eInputChipSetElement = class M3eInputChipSetElement extends RequiredConstraintValidation(Required(ConstraintValidation(Dirty(Touched(FormAssociated(Disabled(AttachInternals(Role(M3eChipSetElement, "grid"))))))), false)) {
  constructor() {
    super(...arguments);
    _M3eInputChipSetElement_instances.add(this);
    /** @private */
    _M3eInputChipSetElement_directionalitySubscription.set(this, void 0);
    /** @private */
    _M3eInputChipSetElement_inputChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleInputChange).call(this));
    /** @private */
    _M3eInputChipSetElement_inputKeyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleInputKeyDown).call(this, e));
    /** @private */
    _M3eInputChipSetElement_focusHandler.set(this, () => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleFocus).call(this));
    /** @private */
    _M3eInputChipSetElement_focusInHandler.set(this, () => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleFocusIn).call(this));
    /** @private */
    _M3eInputChipSetElement_focusOutHandler.set(this, () => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleFocusOut).call(this));
    /** @private */
    _M3eInputChipSetElement_chipRemoveHandler.set(this, e => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleChipRemove).call(this, e));
    /** @private */
    _M3eInputChipSetElement_chipClickHandler.set(this, e => __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleChipClick).call(this, e));
    /** @private */
    _M3eInputChipSetElement_listManager.set(this, new ListManager());
    /** @private */
    _M3eInputChipSetElement_listKeyManager.set(this, new ListKeyManager().onActiveItemChange(() => __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").activeItem?.focus()).withHomeAndEnd().withSkipPredicate(x => !x.hasAttribute("tabindex")).withDirectionality(M3eDirectionality.current));
    /** @private */
    _M3eInputChipSetElement_ignoreInputChange.set(this, false);
    /** @private */
    _M3eInputChipSetElement_input.set(this, null);
    /** @private */
    _M3eInputChipSetElement_tabindex.set(this, 0);
    /** @private */
    this._focused = false;
    /**
     * Maximum number of chips to display when not focused. When focused, all chips are displayed.
     * @default null
     */
    this.maxChips = null;
  }
  /** The chips of the set. */
  get chips() {
    // NOTE: query is used instead of the internal list management due to
    // validating required state on change to support form-field integration.
    return [...this.querySelectorAll("m3e-input-chip")];
  }
  /** The values of the set. */
  get value() {
    const values = this.chips.filter(x => !x.disabled).map(x => x.value);
    return values.length == 0 ? null : values;
  }
  /** @inheritdoc @internal */
  get [(_M3eInputChipSetElement_directionalitySubscription = new WeakMap(), _M3eInputChipSetElement_inputChangeHandler = new WeakMap(), _M3eInputChipSetElement_inputKeyDownHandler = new WeakMap(), _M3eInputChipSetElement_focusHandler = new WeakMap(), _M3eInputChipSetElement_focusInHandler = new WeakMap(), _M3eInputChipSetElement_focusOutHandler = new WeakMap(), _M3eInputChipSetElement_chipRemoveHandler = new WeakMap(), _M3eInputChipSetElement_chipClickHandler = new WeakMap(), _M3eInputChipSetElement_listManager = new WeakMap(), _M3eInputChipSetElement_listKeyManager = new WeakMap(), _M3eInputChipSetElement_ignoreInputChange = new WeakMap(), _M3eInputChipSetElement_input = new WeakMap(), _M3eInputChipSetElement_tabindex = new WeakMap(), _M3eInputChipSetElement_instances = new WeakSet(), formValue)]() {
    const values = this.value;
    if (!values) return null;
    const data = new FormData();
    for (const value of values) {
      data.append(this.name, value);
    }
    return data;
  }
  /** @inheritdoc */
  get shouldLabelFloat() {
    return this.chips.length > 0;
  }
  /** @inheritdoc */
  onContainerClick() {
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")?.focus();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    if (!customElements.get("m3e-form-field")) {
      customElements.whenDefined("m3e-form-field").then(() => {
        this.closest("m3e-form-field")?.notifyControlStateChange();
      });
    } else {
      this.closest("m3e-form-field")?.notifyControlStateChange();
    }
    __classPrivateFieldSet(this, _M3eInputChipSetElement_tabindex, Number.parseInt(this.getAttribute("tabindex") ?? "0"), "f");
    this.addEventListener("focus", __classPrivateFieldGet(this, _M3eInputChipSetElement_focusHandler, "f"));
    this.addEventListener("focusin", __classPrivateFieldGet(this, _M3eInputChipSetElement_focusInHandler, "f"));
    this.addEventListener("focusout", __classPrivateFieldGet(this, _M3eInputChipSetElement_focusOutHandler, "f"));
    __classPrivateFieldSet(this, _M3eInputChipSetElement_directionalitySubscription, M3eDirectionality.observe(() => __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").directionality = M3eDirectionality.current), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("focus", __classPrivateFieldGet(this, _M3eInputChipSetElement_focusHandler, "f"));
    this.removeEventListener("focusin", __classPrivateFieldGet(this, _M3eInputChipSetElement_focusInHandler, "f"));
    this.removeEventListener("focusout", __classPrivateFieldGet(this, _M3eInputChipSetElement_focusOutHandler, "f"));
    __classPrivateFieldGet(this, _M3eInputChipSetElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", `${__classPrivateFieldGet(this, _M3eInputChipSetElement_tabindex, "f")}`);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("vertical")) {
      this.ariaOrientation = null;
    }
    if (changedProperties.has("disabled")) {
      __classPrivateFieldGet(this, _M3eInputChipSetElement_listManager, "f").items.forEach(x => x.disabled = this.disabled);
      if (__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")) {
        __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").disabled = this.disabled;
      }
    }
  }
  /** @inherit */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("maxChips") || _changedProperties.has("_focused")) {
      __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_updateChipVisibility).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @keydown="${__classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleKeyDown)}" @slotchange="${__classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleSlotChange)}"></slot>${!this._focused && this.maxChips && this.chips.length > this.maxChips ? html`<div class="overflow">+${this.chips.length - this.maxChips}</div>` : nothing} <span role="row"><span role="gridcell"><slot name="input" @slotchange="${__classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleInputSlotChange)}"></slot></span></span>`;
  }
};
_M3eInputChipSetElement_handleKeyDown = function _M3eInputChipSetElement_handleKeyDown(e) {
  __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").onKeyDown(e);
};
_M3eInputChipSetElement_handleSlotChange = /** @private */
async function _M3eInputChipSetElement_handleSlotChange() {
  const {
    added,
    removed
  } = __classPrivateFieldGet(this, _M3eInputChipSetElement_listManager, "f").setItems([...this.querySelectorAll("m3e-input-chip")]);
  for (const chip of added) {
    await waitForUpdate(chip);
    if (this.disabled) {
      chip.disabled = true;
    }
    chip.addEventListener("remove", __classPrivateFieldGet(this, _M3eInputChipSetElement_chipRemoveHandler, "f"));
    chip.cell.addEventListener("click", __classPrivateFieldGet(this, _M3eInputChipSetElement_chipClickHandler, "f"));
  }
  removed.forEach(x => {
    x.removeEventListener("remove", __classPrivateFieldGet(this, _M3eInputChipSetElement_chipRemoveHandler, "f"));
    x.cell.removeEventListener("click", __classPrivateFieldGet(this, _M3eInputChipSetElement_chipClickHandler, "f"));
  });
  __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").setItems(__classPrivateFieldGet(this, _M3eInputChipSetElement_listManager, "f").items.flatMap(x => x.removeButton ? [x.cell, x.removeButton] : [x.cell]));
  if (!__classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").activeItem) {
    __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").updateActiveItem(__classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").items.find(x => x.hasAttribute("tabindex")));
  }
  __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_updateChipVisibility).call(this);
};
_M3eInputChipSetElement_handleInputSlotChange = function _M3eInputChipSetElement_handleInputSlotChange() {
  const input = this.querySelector("input");
  if (__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")) {
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").removeEventListener("change", __classPrivateFieldGet(this, _M3eInputChipSetElement_inputChangeHandler, "f"));
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").removeEventListener("keydown", __classPrivateFieldGet(this, _M3eInputChipSetElement_inputKeyDownHandler, "f"));
  }
  __classPrivateFieldSet(this, _M3eInputChipSetElement_input, input, "f");
  if (__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")) {
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").disabled = this.disabled;
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").addEventListener("change", __classPrivateFieldGet(this, _M3eInputChipSetElement_inputChangeHandler, "f"));
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").addEventListener("keydown", __classPrivateFieldGet(this, _M3eInputChipSetElement_inputKeyDownHandler, "f"));
    const property = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    Object.defineProperty(input, "value", {
      get: () => property.get?.call(input),
      set: value => {
        property.set?.call(input, value);
        if (__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f") === input && !__classPrivateFieldGet(this, _M3eInputChipSetElement_ignoreInputChange, "f")) {
          __classPrivateFieldGet(this, _M3eInputChipSetElement_instances, "m", _M3eInputChipSetElement_handleInputChange).call(this);
        }
      }
    });
  }
};
_M3eInputChipSetElement_handleFocus = function _M3eInputChipSetElement_handleFocus() {
  setTimeout(() => (__classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").activeItem ?? __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f"))?.focus());
};
_M3eInputChipSetElement_handleFocusIn = function _M3eInputChipSetElement_handleFocusIn() {
  this.setAttribute("tabindex", "-1");
  this._focused = true;
};
_M3eInputChipSetElement_handleFocusOut = function _M3eInputChipSetElement_handleFocusOut() {
  this.setAttribute("tabindex", `${__classPrivateFieldGet(this, _M3eInputChipSetElement_tabindex, "f")}`);
  this._focused = false;
};
_M3eInputChipSetElement_handleChipRemove = function _M3eInputChipSetElement_handleChipRemove(e) {
  const chip = e.target;
  const index = __classPrivateFieldGet(this, _M3eInputChipSetElement_listManager, "f").items.indexOf(chip);
  const nextChip = __classPrivateFieldGet(this, _M3eInputChipSetElement_listManager, "f").items.find((x, y) => y > index && !x.disabled && x.removable);
  chip.remove();
  __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").setActiveItem(__classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").items.find(x => x === nextChip?.removeButton));
  if (!__classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").activeItem) {
    __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")?.focus();
  }
  this.dispatchEvent(new CustomEvent("change", {
    bubbles: true,
    detail: {
      type: "remove",
      value: chip.value,
      chip: chip
    }
  }));
};
_M3eInputChipSetElement_handleChipClick = function _M3eInputChipSetElement_handleChipClick(e) {
  __classPrivateFieldGet(this, _M3eInputChipSetElement_listKeyManager, "f").updateActiveItem(e.composedPath().find(x => x instanceof M3eInputChipElement)?.cell);
};
_M3eInputChipSetElement_handleInputChange = /** @private */
async function _M3eInputChipSetElement_handleInputChange() {
  if (!__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")) return;
  const value = __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").value;
  if (!value) return;
  // Determine the value that corresponds to the new chip based on options provided
  // by a corresponding autocomplete.
  let matchedOption = null;
  const options = this.getRootNode().querySelector(`m3e-autocomplete[for="${__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").id}"]`)?.querySelectorAll("m3e-option");
  if (options) {
    for (const option of options) {
      // Label is used as the input's value when supplied by an autocomplete.
      if (option.label === value) {
        matchedOption = option;
        break;
      }
    }
  }
  // Prevent duplicate chips from being added.
  let newChip = null;
  if (!this.chips.some(x => x.value === (matchedOption?.value ?? value))) {
    newChip = document.createElement("m3e-input-chip");
    newChip.removable = true;
    newChip.appendChild(document.createTextNode(value));
    if (matchedOption) {
      newChip.value = matchedOption.value;
    }
    this.appendChild(newChip);
    await waitForUpdate(newChip);
  }
  if (__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")) {
    try {
      __classPrivateFieldSet(this, _M3eInputChipSetElement_ignoreInputChange, true, "f");
      __classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f").value = "";
    } finally {
      __classPrivateFieldSet(this, _M3eInputChipSetElement_ignoreInputChange, false, "f");
    }
  }
  if (newChip) {
    this.dispatchEvent(new CustomEvent("change", {
      bubbles: true,
      detail: {
        type: "add",
        value: value,
        chip: newChip
      }
    }));
  }
};
_M3eInputChipSetElement_handleInputKeyDown = function _M3eInputChipSetElement_handleInputKeyDown(e) {
  if (e.key === "Backspace" && !__classPrivateFieldGet(this, _M3eInputChipSetElement_input, "f")?.value) {
    const item = [...__classPrivateFieldGet(this, _M3eInputChipSetElement_listManager, "f").items].reverse().find(x => !x.disabled && !x.disabledInteractive && x.removable);
    if (item) {
      item.dispatchEvent(new Event("remove"));
    }
  }
};
_M3eInputChipSetElement_updateChipVisibility = function _M3eInputChipSetElement_updateChipVisibility() {
  this.chips.forEach((chip, i) => chip.hidden = !this._focused && this.maxChips != null && i >= this.maxChips);
};
(() => {
  registerStyleSheet(css`m3e-input-chip-set [slot="input"]::placeholder { user-select: none; color: currentColor; transition: opacity ${DesignToken.motion.duration.extraLong1}; } m3e-input-chip-set:not(:focus-within) [slot="input"]::placeholder { opacity: 0; transition: 0s; } m3e-input-chip-set:hover [slot="input"]::placeholder { transition: 0s; } @media (prefers-reduced-motion) { m3e-input-chip-set [slot="input"]::placeholder { transition: none !important; } }`);
})();
/** The styles of the element. */
M3eInputChipSetElement.styles = [M3eChipSetElement.styles, css`::slotted([slot="input"]) { outline: unset; border: unset; background-color: transparent; box-shadow: none; font-family: inherit; font-size: inherit; line-height: initial; letter-spacing: inherit; color: var(--_form-field-input-color, inherit); flex: 1 1 auto; min-width: 0; padding: unset; } ::slotted(m3e-input-chip) { min-width: 0; } span[role="row"], span[role="gridcell"] { display: contents; } .overflow { display: flex; flex: none; align-items: center; justify-content: center; font-size: var(--m3e-chip-label-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-chip-label-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-chip-label-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-chip-label-text-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } :host(:not(:disabled)) .overflow { color: var(--m3e-chip-label-text-color, ${DesignToken.color.onSurface}); } :host(:disabled) .overflow { color: color-mix( in srgb, var(--m3e-chip-disabled-label-text-color, ${DesignToken.color.onSurface}) var(--m3e-chip-disabled-label-text-opacity, 38%), transparent ); }`];
__decorate([state()], M3eInputChipSetElement.prototype, "_focused", void 0);
__decorate([property({
  attribute: "max-chips",
  type: Number
})], M3eInputChipSetElement.prototype, "maxChips", void 0);
M3eInputChipSetElement = __decorate([customElement("m3e-input-chip-set")], M3eInputChipSetElement);

/**
 * A chip used to help narrow a user's intent by presenting dynamically generated suggestions, such as
 * suggested responses or search filters.
 *
 * @description
 * The `m3e-suggestion-chip` component presents a suggestion chip, offering users contextually relevant
 * actions or responses. It is designed for dynamic suggestion scenarios, such as search filters or
 * smart replies, and supports accessibility, keyboard interaction, and expressive state styling in line
 * with Material 3 guidelines.  Appearance variants include `elevated` and `outlined`, enabling visual
 * differentiation and contextual emphasis.
 *
 * @example
 * The following example illustrates use of the `m3e-suggestion-chip`.  In this example, multiple chips are nested inside
 * a `m3e-chip-set` container to create a cohesive set of chips. The container is given the ARIA `role="group"` to convey
 * to assistive technologies that the chips are part of a related set of element.
 * ```html
 * <m3e-chip-set role="group" aria-label="Suggested replies">
 *  <m3e-suggestion-chip>Sounds good!</m3e-suggestion-chip>
 *  <m3e-suggestion-chip>Can you clarify?</m3e-suggestion-chip>
 *  <m3e-suggestion-chip>Let's do it.</m3e-suggestion-chip>
 *  <m3e-suggestion-chip>Maybe later.</m3e-suggestion-chip>
 * </m3e-chip-set>
 * ```
 *
 * @tag m3e-suggestion-chip
 *
 * @slot - Renders the label of the chip.
 * @slot icon - Renders an icon before the chip's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr name - The name of the element, submitted as a pair with the element's `value` as part of form data, when the element is used to submit a form.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr target - The target of the link button.
 * @attr type - The type of the element.
 * @attr value - A string representing the value of the chip.
 * @attr variant - The appearance variant of the chip.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-chip-container-shape - Border radius of the chip container.
 * @cssprop --m3e-chip-container-height - Base height of the chip container before density adjustment.
 * @cssprop --m3e-chip-label-text-font-size - Font size of the chip label text.
 * @cssprop --m3e-chip-label-text-font-weight - Font weight of the chip label text.
 * @cssprop --m3e-chip-label-text-line-height - Line height of the chip label text.
 * @cssprop --m3e-chip-label-text-tracking - Letter spacing of the chip label text.
 * @cssprop --m3e-chip-label-text-color - Label text color in default state.
 * @cssprop --m3e-chip-icon-color - Icon color in default state.
 * @cssprop --m3e-chip-icon-size - Font size of leading/trailing icons.
 * @cssprop --m3e-chip-spacing - Horizontal gap between chip content elements.
 * @cssprop --m3e-chip-padding-start - Default start padding when no icon is present.
 * @cssprop --m3e-chip-padding-end - Default end padding when no trailing icon is present.
 * @cssprop --m3e-chip-with-icon-padding-start - Start padding when leading icon is present.
 * @cssprop --m3e-chip-with-icon-padding-end - End padding when trailing icon is present.
 * @cssprop --m3e-chip-disabled-label-text-color - Base color for disabled label text.
 * @cssprop --m3e-chip-disabled-label-text-opacity - Opacity applied to disabled label text.
 * @cssprop --m3e-chip-disabled-icon-color - Base color for disabled icons.
 * @cssprop --m3e-chip-disabled-icon-opacity - Opacity applied to disabled icons.
 * @cssprop --m3e-elevated-chip-container-color - Background color for elevated variant.
 * @cssprop --m3e-elevated-chip-elevation - Elevation level for elevated variant.
 * @cssprop --m3e-elevated-chip-hover-elevation - Elevation level on hover.
 * @cssprop --m3e-elevated-chip-disabled-container-color - Background color for disabled elevated variant.
 * @cssprop --m3e-elevated-chip-disabled-container-opacity - Opacity applied to disabled elevated background.
 * @cssprop --m3e-elevated-chip-disabled-elevation - Elevation level for disabled elevated variant.
 * @cssprop --m3e-outlined-chip-outline-thickness - Outline thickness for outlined variant.
 * @cssprop --m3e-outlined-chip-outline-color - Outline color for outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-color - Outline color for disabled outlined variant.
 * @cssprop --m3e-outlined-chip-disabled-outline-opacity - Opacity applied to disabled outline.
 */
let M3eSuggestionChipElement = class M3eSuggestionChipElement extends FormSubmitter(LinkButton(KeyboardClick(Focusable(DisabledInteractive(Disabled(Role(M3eChipElement, "button"))))))) {
  /** @internal @inheritdoc */
  _renderTrailingIcon() {
    return nothing;
  }
};
/** Indicates that this custom element participates in form submission, validation, and form state restoration. */
M3eSuggestionChipElement.formAssociated = true;
M3eSuggestionChipElement = __decorate([customElement("m3e-suggestion-chip")], M3eSuggestionChipElement);

export { M3eAssistChipElement, M3eChipElement, M3eChipSetElement, M3eFilterChipElement, M3eFilterChipSetElement, M3eInputChipElement, M3eInputChipSetElement, M3eSuggestionChipElement, isChipVariant };
//# sourceMappingURL=chips.js.map
