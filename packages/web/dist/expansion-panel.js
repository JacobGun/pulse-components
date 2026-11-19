/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { css, LitElement, html, unsafeCSS, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { DesignToken, customElement, Disabled, AttachInternals, Role, setCustomEnumState, ReconnectedCallback, setCustomState } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { M3eDirectionality } from './Directionality.js';

var _M3eAccordionElement_instances, _M3eAccordionElement_panels, _M3eAccordionElement_handleSlotChange, _M3eAccordionElement_handleOpening;
/**
 * Combines multiple expansion panels in to an accordion.
 *
 * @description
 * The `m3e-accordion` component organizes multiple expansion panels into a coordinated, accessible group.
 * It supports single or multiple open panels via the `multi` attribute, and provides expressive theming
 * and shape control for grouped layouts. The accordion manages open/close state across its child panels,
 * enabling interactive disclosure patterns for complex content.
 *
 * @example
 * The following example illustrates the basic use of the `m3e-accordion` and `m3e-expansion-panel` components.
 *
 * ```html
 * <m3e-accordion>
 *   <m3e-expansion-panel>
 *     <span slot="header">Panel 1</span>
 *     I am content for the first expansion panel
 *   </m3e-expansion-panel>
 *   <m3e-expansion-panel>
 *     <span slot="header">Panel 2</span>
 *     I am content for the second expansion panel
 *   </m3e-expansion-panel>
 * </m3e-accordion>
 * ```
 *
 * @tag m3e-accordion
 *
 * @slot - Renders the panels of the accordion.
 *
 * @attr multi - Whether multiple expansion panels can be open at the same time.
 */
let M3eAccordionElement = class M3eAccordionElement extends LitElement {
  constructor() {
    super(...arguments);
    _M3eAccordionElement_instances.add(this);
    /** @private */
    _M3eAccordionElement_panels.set(this, []);
    /**
     * Whether multiple expansion panels can be open at the same time.
     * @default false
     */
    this.multi = false;
  }
  /** The panels of the accordion. */
  get panels() {
    return __classPrivateFieldGet(this, _M3eAccordionElement_panels, "f");
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eAccordionElement_instances, "m", _M3eAccordionElement_handleSlotChange)}" @opening="${__classPrivateFieldGet(this, _M3eAccordionElement_instances, "m", _M3eAccordionElement_handleOpening)}"></slot>`;
  }
};
_M3eAccordionElement_panels = new WeakMap();
_M3eAccordionElement_instances = new WeakSet();
_M3eAccordionElement_handleSlotChange = function _M3eAccordionElement_handleSlotChange() {
  __classPrivateFieldSet(this, _M3eAccordionElement_panels, [...this.querySelectorAll("m3e-expansion-panel")], "f");
  if (this.multi) {
    return;
  }
  let alreadyOpen = false;
  for (const panel of __classPrivateFieldGet(this, _M3eAccordionElement_panels, "f").filter(x => !x.open)) {
    if (alreadyOpen) {
      panel.open = false;
    }
    alreadyOpen = true;
  }
};
_M3eAccordionElement_handleOpening = function _M3eAccordionElement_handleOpening(e) {
  if (!this.multi) {
    for (const panel of __classPrivateFieldGet(this, _M3eAccordionElement_panels, "f").filter(x => x !== e.target && x.open)) {
      panel.open = false;
    }
  }
};
/** The styles of the element. */
M3eAccordionElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } ::slotted(m3e-expansion-panel) { --m3e-expansion-panel-container-color: ${DesignToken.color.surface}; --m3e-expansion-panel-elevation: ${DesignToken.elevation.level2}; --m3e-expansion-panel-open-shape: ${DesignToken.shape.corner.medium}; --_expansion-panel-open-spacing: ${DesignToken.measurement.space200}; } ::slotted(m3e-expansion-panel:first-of-type:last-of-type) { --m3e-expansion-panel-shape: ${DesignToken.shape.corner.medium}; } ::slotted(m3e-expansion-panel:first-of-type:not(:last-of-type)) { --m3e-expansion-panel-shape: ${DesignToken.shape.corner.value.medium} ${DesignToken.shape.corner.value.medium} ${DesignToken.shape.corner.value.none} ${DesignToken.shape.corner.value.none}; } ::slotted(m3e-expansion-panel:last-of-type:not(:first-of-type)) { --m3e-expansion-panel-shape: ${DesignToken.shape.corner.value.none} ${DesignToken.shape.corner.value.none} ${DesignToken.shape.corner.value.medium} ${DesignToken.shape.corner.value.medium}; }`;
__decorate([property({
  type: Boolean
})], M3eAccordionElement.prototype, "multi", void 0);
M3eAccordionElement = __decorate([customElement("m3e-accordion")], M3eAccordionElement);

/**
 * Determines whether a value is an `ExpansionTogglePosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `ExpansionTogglePosition`.
 */
function isExpansionTogglePosition(value) {
  return value === "before" || value === "after";
}

/**
 * Determines whether a value is an `ExpansionToggleDirection`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `ExpansionToggleDirection`.
 */
function isExpansionToggleDirection(value) {
  return value === "vertical" || value === "horizontal";
}

/**
 * Component design tokens for `M3eExpansionHeaderElement`.
 * @internal
 */
const ExpansionHeaderToken = {
  collapsedHeight: unsafeCSS("var(--m3e-expansion-header-collapsed-height, 48px)"),
  expandedHeight: unsafeCSS("var(--m3e-expansion-header-expanded-height, 64px)"),
  paddingLeft: unsafeCSS(`var(--m3e-expansion-header-padding-left, ${DesignToken.measurement.space300})`),
  paddingRight: unsafeCSS(`var(--m3e-expansion-header-padding-right, ${DesignToken.measurement.space300})`),
  spacing: unsafeCSS(`var(--m3e-expansion-header-spacing, ${DesignToken.measurement.space100})`),
  toggleIconSize: unsafeCSS("var(--m3e-expansion-header-toggle-icon-size, 24px)"),
  fontSize: unsafeCSS(`var(--m3e-expansion-header-font-size, ${DesignToken.typescale.standard.title.medium.fontSize})`),
  fontWeight: unsafeCSS(`var(--m3e-expansion-header-font-weight, ${DesignToken.typescale.standard.title.medium.fontWeight})`),
  lineHeight: unsafeCSS(`var(--m3e-expansion-header-line-height, ${DesignToken.typescale.standard.title.medium.lineHeight})`),
  tracking: unsafeCSS(`var(--m3e-expansion-header-tracking, ${DesignToken.typescale.standard.title.medium.tracking})`)
};

/**
 * Styles for `M3eExpansionHeaderElement`.
 * @internal
 */
const ExpansionHeaderStyle = css`:host { display: block; border-radius: inherit; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transition: ${unsafeCSS(`height var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1})
        ${DesignToken.motion.easing.standard}`)}; } :host([hidden]) { display: none; } .base { contain: layout style; box-sizing: border-box; width: 100%; height: 100%; display: flex; border-radius: inherit; outline: none; position: relative; padding-inline-start: ${ExpansionHeaderToken.paddingLeft}; padding-inline-end: ${ExpansionHeaderToken.paddingRight}; font-size: ${ExpansionHeaderToken.fontSize}; font-weight: ${ExpansionHeaderToken.fontWeight}; line-height: ${ExpansionHeaderToken.lineHeight}; letter-spacing: ${ExpansionHeaderToken.tracking}; column-gap: ${ExpansionHeaderToken.spacing}; } :host(:not(:disabled)) { cursor: pointer; } :host(:not([aria-expanded="true"])) { height: ${ExpansionHeaderToken.collapsedHeight}; } :host([aria-expanded="true"]) { height: ${ExpansionHeaderToken.expandedHeight}; } :host(:not(:focus-visible)) .state-layer { --m3e-state-layer-focus-color: transparent; } :host([aria-expanded="true"]) .state-layer { --m3e-state-layer-hover-color: transparent; } :host([aria-expanded="true"]) [part="background"], .content { flex: 1 1 auto; display: flex; align-items: center; min-width: 0; } .toggle { contain: layout style paint; display: flex; align-items: center; justify-content: center; vertical-align: middle; font-size: ${ExpansionHeaderToken.toggleIconSize}; transition: ${unsafeCSS(`transform var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1})
        ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--vertical), :--vertical)[aria-expanded="true"]) .toggle { transform: rotate(180deg); } :host(:is(:state(--horizontal), :--horizontal)[aria-expanded="true"]) .toggle { transform: rotate(var(--_expansion-header-horizontal-expanded-toggle-rotation, 90deg)); } :host(:is(:state(--before), :--before)) .toggle { margin-inline-start: calc(0px - ${ExpansionHeaderToken.spacing}); } :host(:is(:state(--after), :--after)) .toggle { margin-inline-end: calc(0px - ${ExpansionHeaderToken.spacing}); } :host([hide-toggle]) .toggle { display: none; } ::slotted([slot="toggle-icon"]) { font-size: inherit !important; flex: none; } ::slotted(svg[slot="toggle-icon"]) { width: 1em; height: 1em; } @media (prefers-reduced-motion) { :host, .toggle { transition: none; } }`;

/**
 * Component design tokens for `M3eExpansionPanelElement`.
 * @internal
 */
const ExpansionPanelToken = {
  textColor: unsafeCSS(`var(--m3e-expansion-panel-text-color, ${DesignToken.color.onSurface})`),
  disabledTextColor: unsafeCSS(`var(--m3e-expansion-panel-disabled-text-color, ${DesignToken.color.onSurface})`),
  disabledTextOpacity: unsafeCSS(`var(--m3e-expansion-panel-disabled-text-opacity, 38%)`),
  containerColor: unsafeCSS("var(--m3e-expansion-panel-container-color)"),
  collapsedElevation: unsafeCSS("var(--m3e-expansion-panel-elevation)"),
  collapsedShape: unsafeCSS("var(--m3e-expansion-panel-shape)"),
  expandedElevation: unsafeCSS("var(--m3e-expansion-panel-open-elevation, var(--m3e-expansion-panel-elevation))"),
  expandedShape: unsafeCSS("var(--m3e-expansion-panel-open-shape, var(--m3e-expansion-panel-shape))"),
  expandedSpace: unsafeCSS("var(--_expansion-panel-open-spacing)"),
  contentPadding: unsafeCSS(`var(--m3e-expansion-panel-content-padding, 0 ${DesignToken.measurement.space300} ${DesignToken.measurement.space200} ${DesignToken.measurement.space300})`),
  actionsSpacing: unsafeCSS(`var(--m3e-expansion-panel-actions-spacing, ${DesignToken.measurement.space100})`),
  actionsPadding: unsafeCSS(`var(--m3e-expansion-panel-actions-padding, ${DesignToken.measurement.space200} ${DesignToken.measurement.space300} ${DesignToken.measurement.space200} ${DesignToken.measurement.space300})`),
  actionsDividerThickness: unsafeCSS("var(--m3e-expansion-panel-actions-divider-thickness, var(--m3e-divider-thickness, 1px))"),
  actionsDividerColor: unsafeCSS(`var(--m3e-expansion-panel-actions-divider-color, var(--m3e-divider-color, ${DesignToken.color.outlineVariant}))`)
};

/**
 * Styles for `M3eExpansionPanelElement`.
 * @internal
 */
const ExpansionPanelStyle = css`:host { display: block; } :host([hidden]) { display: none; } .base { background-color: ${ExpansionPanelToken.containerColor}; transition: ${unsafeCSS(`box-shadow var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1})
        ${DesignToken.motion.easing.standard}`)}; } :host(:not(:disabled)) .base { color: ${ExpansionPanelToken.textColor}; } :host(:disabled) .base { color: color-mix( in srgb, ${ExpansionPanelToken.disabledTextColor} ${ExpansionPanelToken.disabledTextOpacity}, transparent ); } :host(:not([open])) .base { box-shadow: ${ExpansionPanelToken.collapsedElevation}; border-radius: ${ExpansionPanelToken.collapsedShape}; } :host([open]) .base { box-shadow: ${ExpansionPanelToken.expandedElevation}; border-radius: ${ExpansionPanelToken.expandedShape}; margin-block: ${ExpansionPanelToken.expandedSpace}; } .toggle { display: flex; align-items: center; justify-content: center; font-size: ${ExpansionHeaderToken.toggleIconSize}; } ::slotted([slot="toggle-icon"]) { font-size: inherit !important; flex: none; } .toggle svg, ::slotted(svg[slot="toggle-icon"]) { width: 1em; height: 1em; } .content { contain: layout style; padding: ${ExpansionPanelToken.contentPadding}; } :host(:not(:is(:state(--with-actions), :--with-actions))) .actions { display: none; } .actions { padding: ${ExpansionPanelToken.actionsPadding}; border-top-style: solid; border-top-width: ${ExpansionPanelToken.actionsDividerThickness}; border-top-color: ${ExpansionPanelToken.actionsDividerColor}; } ::slotted([slot="actions"]) { flex: none; display: flex; align-items: center; column-gap: ${ExpansionPanelToken.actionsSpacing}; } ::slotted([slot="actions"][end]) { justify-content: flex-end; } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { border: 1px solid CanvasText; } :host(:disabled) .base { color: GrayText; } .actions { border-top-color: GrayText; } }`;

var _M3eExpansionHeaderElement_instances, _M3eExpansionHeaderElement_applyTogglePosition, _M3eExpansionHeaderElement_applyToggleDirection, _M3eExpansionHeaderElement_renderToggle;
/**
 * A button used to toggle the expanded state of an expansion panel.
 *
 * @tag m3e-expansion-header
 *
 * @slot - Renders the content of the header.
 * @slot toggle-icon - Renders the icon of the expansion toggle.
 *
 * @attr hide-toggle - Whether to hide the expansion toggle.
 * @attr toggle-direction - The direction of the expansion toggle.
 * @attr toggle-position - The position of the expansion toggle.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-expansion-header-collapsed-height - Height of the header when the panel is collapsed.
 * @cssprop --m3e-expansion-header-expanded-height - Height of the header when the panel is expanded.
 * @cssprop --m3e-expansion-header-padding-left - Left padding inside the header.
 * @cssprop --m3e-expansion-header-padding-right - Right padding inside the header.
 * @cssprop --m3e-expansion-header-spacing - Spacing between header elements.
 * @cssprop --m3e-expansion-header-toggle-icon-size - Size of the toggle icon (e.g. chevron).
 * @cssprop --m3e-expansion-header-font-size - The font size of the header text.
 * @cssprop --m3e-expansion-header-font-weight - The font weight of the header text.
 * @cssprop --m3e-expansion-header-line-height - The line height of the header text.
 * @cssprop --m3e-expansion-header-tracking - Letter spacing (tracking) of the header text.
 */
let M3eExpansionHeaderElement = class M3eExpansionHeaderElement extends KeyboardClick(Focusable(Disabled(AttachInternals(Role(LitElement, "button"), true)))) {
  constructor() {
    super(...arguments);
    _M3eExpansionHeaderElement_instances.add(this);
    /**
     * The direction of the expansion toggle.
     * @default "vertical"
     */
    this.toggleDirection = "vertical";
    /**
     * The position of the expansion toggle.
     * @default "after"
     */
    this.togglePosition = "after";
    /**
     * Whether to hide the expansion toggle.
     * @default false
     */
    this.hideToggle = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eExpansionHeaderElement_instances, "m", _M3eExpansionHeaderElement_applyToggleDirection).call(this);
    __classPrivateFieldGet(this, _M3eExpansionHeaderElement_instances, "m", _M3eExpansionHeaderElement_applyTogglePosition).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("togglePosition")) {
      __classPrivateFieldGet(this, _M3eExpansionHeaderElement_instances, "m", _M3eExpansionHeaderElement_applyTogglePosition).call(this);
    }
    if (_changedProperties.has("toggleDirection")) {
      __classPrivateFieldGet(this, _M3eExpansionHeaderElement_instances, "m", _M3eExpansionHeaderElement_applyToggleDirection).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer>${this.togglePosition === "before" ? __classPrivateFieldGet(this, _M3eExpansionHeaderElement_instances, "m", _M3eExpansionHeaderElement_renderToggle).call(this) : nothing}<div class="content"><m3e-text-overflow><slot></slot></m3e-text-overflow></div>${this.togglePosition === "after" ? __classPrivateFieldGet(this, _M3eExpansionHeaderElement_instances, "m", _M3eExpansionHeaderElement_renderToggle).call(this) : nothing}</div>`;
  }
};
_M3eExpansionHeaderElement_instances = new WeakSet();
_M3eExpansionHeaderElement_applyTogglePosition = function _M3eExpansionHeaderElement_applyTogglePosition() {
  if (!isExpansionTogglePosition(this.togglePosition)) {
    this.togglePosition = "after";
  }
  setCustomEnumState(this, this.togglePosition, "after", "before");
};
_M3eExpansionHeaderElement_applyToggleDirection = function _M3eExpansionHeaderElement_applyToggleDirection() {
  if (!isExpansionToggleDirection(this.toggleDirection)) {
    this.toggleDirection = "vertical";
  }
  setCustomEnumState(this, this.toggleDirection, "horizontal", "vertical");
};
_M3eExpansionHeaderElement_renderToggle = function _M3eExpansionHeaderElement_renderToggle() {
  return html`<div class="toggle" aria-hidden="true"><slot name="toggle-icon"></slot></div>`;
};
/** The styles of the element. */
M3eExpansionHeaderElement.styles = ExpansionHeaderStyle;
__decorate([query(".focus-ring")], M3eExpansionHeaderElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eExpansionHeaderElement.prototype, "_stateLayer", void 0);
__decorate([property({
  attribute: "toggle-direction",
  reflect: true,
  useDefault: true
})], M3eExpansionHeaderElement.prototype, "toggleDirection", void 0);
__decorate([property({
  attribute: "toggle-position",
  reflect: true,
  useDefault: true
})], M3eExpansionHeaderElement.prototype, "togglePosition", void 0);
__decorate([property({
  attribute: "hide-toggle",
  type: Boolean,
  reflect: true
})], M3eExpansionHeaderElement.prototype, "hideToggle", void 0);
M3eExpansionHeaderElement = __decorate([customElement("m3e-expansion-header")], M3eExpansionHeaderElement);

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
var _M3eExpansionPanelElement_instances, _M3eExpansionPanelElement_id, _M3eExpansionPanelElement_contentId, _M3eExpansionPanelElement_headerId, _M3eExpansionPanelElement_directionalitySubscription, _M3eExpansionPanelElement_applyTogglePosition, _M3eExpansionPanelElement_applyToggleDirection, _M3eExpansionPanelElement_renderToggleIcon, _M3eExpansionPanelElement_handleHeaderClick, _M3eExpansionPanelElement_handleKeyDown, _M3eExpansionPanelElement_handleCollapsibleEvent, _M3eExpansionPanelElement_handleActionsSlotChange, _M3eExpansionPanelElement_updateHeaderToggleRotation;
var M3eExpansionPanelElement_1;
/**
 * An expandable details-summary view.
 *
 * @description
 * The `m3e-expansion-panel` component provides an accessible, animated details-summary view for
 * organizing content in collapsible sections. It supports custom header, content, actions, and
 * toggle icon slots, and offers configurable toggle position and direction. The panel responds to
 * open/close states, emits lifecycle events, and supports rich theming via CSS custom properties
 * for elevation, shape, spacing, and color.
 *
 * @example
 * The following example illustrates the basic use of the `m3e-accordion` and `m3e-expansion-panel` components.
 *
 * ```html
 * <m3e-accordion>
 *   <m3e-expansion-panel>
 *     <span slot="header">Panel 1</span>
 *     I am content for the first expansion panel
 *   </m3e-expansion-panel>
 *   <m3e-expansion-panel>
 *     <span slot="header">Panel 2</span>
 *     I am content for the second expansion panel
 *   </m3e-expansion-panel>
 * </m3e-accordion>
 * ```
 *
 * @tag m3e-expansion-panel
 *
 * @slot - Renders the detail of the panel.
 * @slot actions - Renders the actions bar of the panel.
 * @slot header - Renders the header content.
 * @slot toggle-icon - Renders the expansion toggle icon.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr hide-toggle - Whether to hide the expansion toggle.
 * @attr open - Whether the panel is expanded.
 * @attr toggle-direction - The direction of the expansion toggle.
 * @attr toggle-position - The position of the expansion toggle.
 *
 * @fires opening - Dispatched when the expansion panel begins to open.
 * @fires opened - Dispatched when the expansion panel has opened.
 * @fires closing - Dispatched when the expansion panel begins to close.
 * @fires closed - Dispatched when the expansion panel has closed.
 *
 * @cssprop --m3e-expansion-header-collapsed-height - Height of the header when the panel is collapsed.
 * @cssprop --m3e-expansion-header-expanded-height - Height of the header when the panel is expanded.
 * @cssprop --m3e-expansion-header-padding-left - Left padding inside the header.
 * @cssprop --m3e-expansion-header-padding-right - Right padding inside the header.
 * @cssprop --m3e-expansion-header-spacing - Spacing between header elements.
 * @cssprop --m3e-expansion-header-toggle-icon-size - Size of the toggle icon (e.g. chevron).
 * @cssprop --m3e-expansion-header-font-size - The font size of the header text.
 * @cssprop --m3e-expansion-header-font-weight - The font weight of the header text.
 * @cssprop --m3e-expansion-header-line-height - The line height of the header text.
 * @cssprop --m3e-expansion-header-tracking - Letter spacing (tracking) of the header text.
 * @cssprop --m3e-expansion-panel-text-color - Color of the panel's text content.
 * @cssprop --m3e-expansion-panel-disabled-text-color - Color of the panel's text content, when disabled.
 * @cssprop --m3e-expansion-panel-disabled-text-opacity - Opacity of the panel's text content, when disabled.
 * @cssprop --m3e-expansion-panel-container-color - Background color of the panel container.
 * @cssprop --m3e-expansion-panel-elevation - Elevation level when the panel is collapsed.
 * @cssprop --m3e-expansion-panel-shape - Shape (e.g. border radius) of the panel when collapsed.
 * @cssprop --m3e-expansion-panel-open-elevation - Elevation level when the panel is expanded.
 * @cssprop --m3e-expansion-panel-open-shape - Shape (e.g. border radius) of the panel when expanded.
 * @cssprop --m3e-expansion-panel-content-padding - Padding around the panel's content area.
 * @cssprop --m3e-expansion-panel-actions-spacing - Spacing between action buttons or elements.
 * @cssprop --m3e-expansion-panel-actions-padding - Padding around the actions section.
 * @cssprop --m3e-expansion-panel-actions-divider-thickness - Thickness of the divider above actions.
 * @cssprop --m3e-expansion-panel-actions-divider-color - Color of the divider above actions.
 */
let M3eExpansionPanelElement = M3eExpansionPanelElement_1 = class M3eExpansionPanelElement extends Disabled(ReconnectedCallback(AttachInternals(LitElement, true))) {
  constructor() {
    super(...arguments);
    _M3eExpansionPanelElement_instances.add(this);
    /** @private */
    _M3eExpansionPanelElement_id.set(this, M3eExpansionPanelElement_1.__nextId++);
    /** @private */
    _M3eExpansionPanelElement_contentId.set(this, `m3e-expansion-panel-${__classPrivateFieldGet(this, _M3eExpansionPanelElement_id, "f")}-content`);
    /** @private */
    _M3eExpansionPanelElement_headerId.set(this, `m3e-expansion-panel-${__classPrivateFieldGet(this, _M3eExpansionPanelElement_id, "f")}-header`);
    /** @private */
    _M3eExpansionPanelElement_directionalitySubscription.set(this, void 0);
    /**
     * Whether the panel is expanded.
     * @default false
     */
    this.open = false;
    /**
     * The direction of the expansion toggle.
     * @default "vertical"
     */
    this.toggleDirection = "vertical";
    /**
     * The position of the expansion toggle.
     * @default "after"
     */
    this.togglePosition = "after";
    /**
     * Whether to hide the expansion toggle.
     * @default false
     */
    this.hideToggle = false;
  }
  /** @inheritdoc */
  focus(options) {
    this._header?.focus(options);
  }
  /** @inheritdoc */
  blur() {
    this._header?.blur();
  }
  /** @inheritdoc */
  click() {
    this._header?.click();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_applyToggleDirection).call(this);
    __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_applyTogglePosition).call(this);
    __classPrivateFieldSet(this, _M3eExpansionPanelElement_directionalitySubscription, M3eDirectionality.observe(() => {
      this.requestUpdate();
      __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_updateHeaderToggleRotation).call(this);
    }), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eExpansionPanelElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_updateHeaderToggleRotation).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_updateHeaderToggleRotation).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("togglePosition")) {
      __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_applyTogglePosition).call(this);
    }
    if (_changedProperties.has("toggleDirection")) {
      __classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_applyToggleDirection).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-expansion-header id="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_headerId, "f")}" toggle-direction="${this.toggleDirection}" toggle-position="${this.togglePosition}" ?hide-toggle="${this.hideToggle}" ?disabled="${this.disabled}" aria-expanded="${this.open}" aria-controls="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_contentId, "f")}" @click="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleHeaderClick)}" @keydown="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleKeyDown)}"><div slot="toggle-icon" class="toggle"><slot name="toggle-icon">${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_renderToggleIcon).call(this)}</slot></div><slot name="header"></slot></m3e-expansion-header><m3e-collapsible id="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_contentId, "f")}" role="region" aria-labelledby="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_headerId, "f")}" ?open="${this.open}" @opening="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleCollapsibleEvent)}" @opened="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleCollapsibleEvent)}" @closing="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleCollapsibleEvent)}" @closed="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleCollapsibleEvent)}"><div class="content"><slot></slot></div><div class="actions"><slot name="actions" @slotchange="${__classPrivateFieldGet(this, _M3eExpansionPanelElement_instances, "m", _M3eExpansionPanelElement_handleActionsSlotChange)}"></slot></div></m3e-collapsible></div>`;
  }
};
_M3eExpansionPanelElement_id = new WeakMap();
_M3eExpansionPanelElement_contentId = new WeakMap();
_M3eExpansionPanelElement_headerId = new WeakMap();
_M3eExpansionPanelElement_directionalitySubscription = new WeakMap();
_M3eExpansionPanelElement_instances = new WeakSet();
_M3eExpansionPanelElement_applyTogglePosition = function _M3eExpansionPanelElement_applyTogglePosition() {
  if (!isExpansionTogglePosition(this.togglePosition)) {
    this.togglePosition = "after";
  }
};
_M3eExpansionPanelElement_applyToggleDirection = function _M3eExpansionPanelElement_applyToggleDirection() {
  if (!isExpansionToggleDirection(this.toggleDirection)) {
    this.toggleDirection = "vertical";
  }
};
_M3eExpansionPanelElement_renderToggleIcon = function _M3eExpansionPanelElement_renderToggleIcon() {
  return this.toggleDirection === "vertical" ? html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>` : M3eDirectionality.current === "ltr" ? html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>` : html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>`;
};
_M3eExpansionPanelElement_handleHeaderClick = function _M3eExpansionPanelElement_handleHeaderClick() {
  this.open = !this.open;
};
_M3eExpansionPanelElement_handleKeyDown = function _M3eExpansionPanelElement_handleKeyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      {
        e.preventDefault();
        const accordion = this.closest("m3e-accordion");
        if (accordion) {
          const panels = [...accordion.panels].reverse();
          const index = panels.indexOf(this);
          (panels.find((x, i) => !x.disabled && i > index) ?? panels.find((x, i) => !x.disabled && i < index))?._header?.focus();
        } else {
          this.open = false;
        }
      }
      break;
    case "ArrowDown":
      {
        e.preventDefault();
        const accordion = this.closest("m3e-accordion");
        if (accordion) {
          const index = accordion.panels.indexOf(this);
          (accordion.panels.find((x, i) => !x.disabled && i > index) ?? accordion.panels.find((x, i) => !x.disabled && i < index))?._header?.focus();
        } else {
          this.open = true;
        }
      }
      break;
    case " ":
      e.preventDefault();
      break;
  }
};
_M3eExpansionPanelElement_handleCollapsibleEvent = function _M3eExpansionPanelElement_handleCollapsibleEvent(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event(e.type, {
    bubbles: true
  }));
};
_M3eExpansionPanelElement_handleActionsSlotChange = function _M3eExpansionPanelElement_handleActionsSlotChange(e) {
  setCustomState(this, "--with-actions", hasAssignedNodes(e.target));
};
_M3eExpansionPanelElement_updateHeaderToggleRotation = function _M3eExpansionPanelElement_updateHeaderToggleRotation() {
  if (M3eDirectionality.current === "rtl") {
    this._header?.style.setProperty("--_expansion-header-horizontal-expanded-toggle-rotation", "-90deg");
  } else {
    this._header?.style.removeProperty("--_expansion-header-horizontal-expanded-toggle-rotation");
  }
};
/** The styles of the element. */
M3eExpansionPanelElement.styles = ExpansionPanelStyle;
/** @private */
M3eExpansionPanelElement.__nextId = 0;
__decorate([query("m3e-expansion-header")], M3eExpansionPanelElement.prototype, "_header", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eExpansionPanelElement.prototype, "open", void 0);
__decorate([property({
  attribute: "toggle-direction",
  reflect: true,
  useDefault: true
})], M3eExpansionPanelElement.prototype, "toggleDirection", void 0);
__decorate([property({
  attribute: "toggle-position",
  reflect: true,
  useDefault: true
})], M3eExpansionPanelElement.prototype, "togglePosition", void 0);
__decorate([property({
  attribute: "hide-toggle",
  type: Boolean,
  reflect: true
})], M3eExpansionPanelElement.prototype, "hideToggle", void 0);
M3eExpansionPanelElement = M3eExpansionPanelElement_1 = __decorate([customElement("m3e-expansion-panel")], M3eExpansionPanelElement);

export { M3eAccordionElement, M3eExpansionHeaderElement, M3eExpansionPanelElement, isExpansionToggleDirection, isExpansionTogglePosition };
//# sourceMappingURL=expansion-panel.js.map
