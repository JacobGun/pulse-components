/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { state, property, query } from 'lit/decorators.js';
import { ReconnectedCallback, AttachInternals, Role, setCustomState, DesignToken, customElement, SuppressInitialAnimation, Disabled, ResizeController, FocusController, setCustomEnumState } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { SelectionManager, selectionManager } from './LiveAnnouncer.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';
import { Selected } from './Selected.js';
import { DisabledInteractive } from './DisabledInteractive.js';
import { Focusable } from './Focusable.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { KeyboardClick } from './KeyboardClick.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';
import './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';

/**
 * Determines whether a value is a `NavBarMode`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `NavBarMode`.
 */
function isNavBarMode(value) {
  return value === "compact" || value === "expanded" || value === "auto";
}

var _M3eNavBarElement_instances, _M3eNavBarElement_breakpointUnobserve, _M3eNavBarElement_applyMode, _M3eNavBarElement_initBreakpointMonitoring, _M3eNavBarElement_handleSlotChange, _M3eNavBarElement_handleChange, _a;
/**
 * A horizontal bar, typically used on smaller devices, that allows a user to switch between 3-5 views.
 *
 * @description
 * The `m3e-nav-bar` component provides a horizontal navigation bar for switching between primary destinations in
 * an application. Designed for smaller devices, it supports 3-5 interactive items, orientation, and theming
 * via CSS custom properties.
 *
 * @example
 * The following example illustrates a nav bar with vertically oriented items.
 * ```html
 * <m3e-nav-bar>
 *   <m3e-nav-item><m3e-icon slot="icon" name="news"></m3e-icon>News</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="globe"></m3e-icon>Global</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="star"></m3e-icon>For you</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="newsstand"></m3e-icon>Trending</m3e-nav-item>
 * </m3e-nav-bar>
 * ```
 *
 * @tag m3e-nav-bar
 *
 * @slot - Renders the items of the bar.
 *
 * @attr mode - The mode in which items in the bar are presented.
 *
 * @fires beforeinput - Dispatched before the selected state of an item changes.
 * @fires input - Dispatched when the selected state of an item changes.
 * @fires change - Dispatched when the selected state of an item changes.
 *
 * @cssprop --m3e-nav-bar-height - Height of the navigation bar.
 * @cssprop --m3e-nav-bar-container-color - Background color of the navigation bar container.
 * @cssprop --m3e-nav-bar-vertical-item-width - Minimum width of vertical nav items.
 * @cssprop --m3e-nav-bar-horizontal-nav-item-leading-space - Leading space for horizontal nav items.
 * @cssprop --m3e-nav-bar-horizontal-nav-item-trailing-space - Trailing space for horizontal nav items.
 */
let M3eNavBarElement = class M3eNavBarElement extends ReconnectedCallback(AttachInternals(Role(LitElement, "navigation"))) {
  constructor() {
    super(...arguments);
    _M3eNavBarElement_instances.add(this);
    /** @internal */
    this[_a] = new SelectionManager().disableRovingTabIndex();
    /** @private */
    _M3eNavBarElement_breakpointUnobserve.set(this, void 0);
    /**
     * The mode in which items in the bar are presented.
     * @default "compact"
     */
    this.mode = "compact";
  }
  /** The items of the bar. */
  get items() {
    return this[selectionManager].items;
  }
  /** The selected item. */
  get selected() {
    return this[selectionManager].selectedItems[0] ?? null;
  }
  /** The current mode applied to the bar. */
  get currentMode() {
    return this._mode ?? (this.mode !== "compact" ? "expanded" : "compact");
  }
  set currentMode(value) {
    this._mode = value;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eNavBarElement_instances, "m", _M3eNavBarElement_applyMode).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._mode = undefined;
    __classPrivateFieldGet(this, _M3eNavBarElement_breakpointUnobserve, "f")?.call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    if (this.mode === "auto") {
      __classPrivateFieldGet(this, _M3eNavBarElement_instances, "m", _M3eNavBarElement_initBreakpointMonitoring).call(this);
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("mode")) {
      __classPrivateFieldGet(this, _M3eNavBarElement_instances, "m", _M3eNavBarElement_applyMode).call(this);
      __classPrivateFieldGet(this, _M3eNavBarElement_breakpointUnobserve, "f")?.call(this);
      if (this.mode === "auto") {
        __classPrivateFieldGet(this, _M3eNavBarElement_instances, "m", _M3eNavBarElement_initBreakpointMonitoring).call(this);
      } else {
        this._mode = undefined;
        this._updateItems();
      }
    }
    if (changedProperties.has("_mode")) {
      this._updateItems();
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("mode")) {
      this._updateItems();
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot @change="${__classPrivateFieldGet(this, _M3eNavBarElement_instances, "m", _M3eNavBarElement_handleChange)}" @slotchange="${__classPrivateFieldGet(this, _M3eNavBarElement_instances, "m", _M3eNavBarElement_handleSlotChange)}"></slot></div>`;
  }
  /** @internal */
  _updateItems() {
    const orientation = this.currentMode === "compact" ? "vertical" : "horizontal";
    this._updateOrientation(orientation);
    setCustomState(this, "--compact", orientation === "vertical");
    // Internal notification (not part of the public API) so dependents, such as a rail toggle,
    // can react to the effective mode changing.
    this["dispatchEvent"](new Event("mode-change"));
  }
  /** @internal */
  _updateOrientation(orientation) {
    this[selectionManager].items.forEach(x => x.orientation = orientation);
  }
};
_M3eNavBarElement_breakpointUnobserve = new WeakMap();
_M3eNavBarElement_instances = new WeakSet();
_a = selectionManager;
_M3eNavBarElement_applyMode = function _M3eNavBarElement_applyMode() {
  if (!isNavBarMode(this.mode)) {
    this.mode = "compact";
  }
};
_M3eNavBarElement_initBreakpointMonitoring = function _M3eNavBarElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eNavBarElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall, Breakpoint.Small], matches => {
    this._mode = matches.get(Breakpoint.XSmall) || matches.get(Breakpoint.Small) ? "compact" : "expanded";
    this._updateItems();
  }), "f");
};
_M3eNavBarElement_handleSlotChange = function _M3eNavBarElement_handleSlotChange() {
  this[selectionManager].setItems([...this.querySelectorAll("m3e-nav-item")]);
  this._updateItems();
};
_M3eNavBarElement_handleChange = function _M3eNavBarElement_handleChange(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
/** The styles of the element. */
M3eNavBarElement.styles = css`:host { display: block; overflow-x: auto; overflow-y: hidden; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; min-height: var(--m3e-nav-bar-height, 64px); } :host([hidden]) { display: none; } .base { contain: layout style; display: flex; align-items: stretch; justify-content: center; box-sizing: border-box; min-height: inherit; height: inherit; width: 100%; background-color: var(--m3e-nav-bar-container-color, ${DesignToken.color.surfaceContainer}); --_vertical-nav-item-min-width: var(--m3e-nav-bar-vertical-item-width, 112px); --_horizontal-nav-item-leading-space: var( --m3e-nav-bar-horizontal-nav-item-leading-space, ${DesignToken.measurement.space200} ); --_horizontal-nav-item-trailing-space: var( --m3e-nav-bar-horizontal-nav-item-trailing-space, ${DesignToken.measurement.space200} ); }`;
__decorate([state()], M3eNavBarElement.prototype, "_mode", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eNavBarElement.prototype, "mode", void 0);
M3eNavBarElement = __decorate([customElement("m3e-nav-bar")], M3eNavBarElement);

/**
 * Determines whether a value is a `NavItemOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `NavItemOrientation`.
 */
function isNavItemOrientation(value) {
  return value === "vertical" || value === "horizontal";
}

var _M3eNavItemElement_instances, _M3eNavItemElement_inRail, _M3eNavItemElement_clickHandler, _M3eNavItemElement_resizeController, _M3eNavItemElement_applyOrientation, _M3eNavItemElement_handleClick, _M3eNavItemElement_handleSelectedIconSlotChange, _M3eNavItemElement_handleStateLayerResize, _M3eNavItemElement_initResizeObserver;
/**
 * An item, placed in a navigation bar or rail, used to navigate to destinations in an application.
 *
 * @description
 * The `m3e-nav-item` component represents an interactive navigation item for use in navigation bars
 * or rails. Designed according to Material 3 principles, it supports icon and label slots, selection state,
 * orientation, and extensive theming via CSS custom properties.
 *
 * @example
 * The following example illustrates a nav bar with vertically oriented items.
 * ```html
 * <m3e-nav-bar>
 *   <m3e-nav-item><m3e-icon slot="icon" name="news"></m3e-icon>News</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="globe"></m3e-icon>Global</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="star"></m3e-icon>For you</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="newsstand"></m3e-icon>Trending</m3e-nav-item>
 * </m3e-nav-bar>
 * ```
 *
 * @tag m3e-nav-item
 *
 * @slot - Renders the label of the item.
 * @slot icon - Renders the icon of the item.
 * @slot selected-icon - Renders the icon of the item when selected.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr orientation - The layout orientation of the item.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr selected - Whether the element is selected.
 * @attr target - The target of the link button.
 *
 * @fires beforeinput - Dispatched before the selected state changes.
 * @fires input - Dispatched when the selected state changes.
 * @fires change - Dispatched when the selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-nav-item-label-text-font-size - Font size for the label text.
 * @cssprop --m3e-nav-item-label-text-font-weight - Font weight for the label text.
 * @cssprop --m3e-nav-item-label-text-line-height - Line height for the label text.
 * @cssprop --m3e-nav-item-label-text-tracking - Letter spacing for the label text.
 * @cssprop --m3e-nav-item-shape - Border radius of the nav item.
 * @cssprop --m3e-nav-item-icon-size - Size of the icon.
 * @cssprop --m3e-nav-item-spacing - Spacing between icon and label.
 * @cssprop --m3e-nav-item-inactive-label-text-color - Color of the label text when inactive.
 * @cssprop --m3e-nav-item-inactive-icon-color - Color of the icon when inactive.
 * @cssprop --m3e-nav-item-inactive-hover-state-layer-color - State layer color on hover when inactive.
 * @cssprop --m3e-nav-item-inactive-focus-state-layer-color - State layer color on focus when inactive.
 * @cssprop --m3e-nav-item-inactive-pressed-state-layer-color - State layer color on press when inactive.
 * @cssprop --m3e-nav-item-active-label-text-color - Color of the label text when active/selected.
 * @cssprop --m3e-nav-item-active-icon-color - Color of the icon when active/selected.
 * @cssprop --m3e-nav-item-active-container-color - Container color when active/selected.
 * @cssprop --m3e-nav-item-active-hover-state-layer-color - State layer color on hover when active.
 * @cssprop --m3e-nav-item-active-focus-state-layer-color - State layer color on focus when active.
 * @cssprop --m3e-nav-item-active-pressed-state-layer-color - State layer color on press when active.
 * @cssprop --m3e-nav-item-focus-ring-shape - Border radius for the focus ring.
 * @cssprop --m3e-nav-item-disabled-label-text-color - Color of the label text when disabled.
 * @cssprop --m3e-nav-item-disabled-label-text-opacity - Opacity of the label text when disabled.
 * @cssprop --m3e-nav-item-disabled-icon-color - Color of the icon when disabled.
 * @cssprop --m3e-nav-item-disabled-icon-opacity - Opacity of the icon when disabled.
 * @cssprop --m3e-horizontal-nav-item-padding - Padding for horizontal orientation.
 * @cssprop --m3e-horizontal-nav-item-active-indicator-height - Height of the active indicator in horizontal orientation.
 * @cssprop --m3e-vertical-nav-item-active-indicator-width - Width of the active indicator in vertical orientation.
 * @cssprop --m3e-vertical-nav-item-active-indicator-height - Height of the active indicator in vertical orientation.
 * @cssprop --m3e-vertical-nav-item-active-indicator-margin - Margin for the active indicator in vertical orientation.
 */
let M3eNavItemElement = class M3eNavItemElement extends SupportsDirectionality(ReconnectedCallback(SuppressInitialAnimation(LinkButton(Selected(KeyboardClick(Focusable(DisabledInteractive(Disabled(AttachInternals(Role(LitElement, "button"), true)))))))))) {
  constructor() {
    super();
    _M3eNavItemElement_instances.add(this);
    /** @private */
    _M3eNavItemElement_inRail.set(this, false);
    /** @private */
    _M3eNavItemElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_handleClick).call(this, e));
    /** @private */
    this._focusVisible = false;
    /** @private */
    _M3eNavItemElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      callback: entries => __classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_handleStateLayerResize).call(this, entries)
    }));
    /**
     * The layout orientation of the item.
     * @default "vertical"
     */
    this.orientation = "vertical";
    new FocusController(this, {
      target: null,
      callback: (focused, focusVisible) => this._focusVisible = focused && focusVisible
    });
  }
  /** The navigation bar to which this item belongs. */
  get navBar() {
    return this.closest("m3e-nav-bar") ?? this.closest("m3e-nav-rail") ?? null;
  }
  /** @inheritdoc */
  connectedCallback() {
    __classPrivateFieldSet(this, _M3eNavItemElement_inRail, this.closest("m3e-nav-rail") !== null, "f");
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_applyOrientation).call(this);
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eNavItemElement_clickHandler, "f"), {
      capture: true
    });
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eNavItemElement_clickHandler, "f"), {
      capture: true
    });
    __classPrivateFieldSet(this, _M3eNavItemElement_inRail, false, "f");
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_initResizeObserver).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_applyOrientation).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      this.ariaSelected = null;
      this.ariaPressed = null;
      this.ariaCurrent = `${this.selected}`;
      for (const icon of this.querySelectorAll("m3e-icon")) {
        icon.toggleAttribute("filled", this.selected);
      }
      this.navBar?.[selectionManager].notifySelectionChange(this);
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("orientation")) {
      this._focusRing?.attach(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._indicator].forEach(x => x?.attach(this));
    __classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_initResizeObserver).call(this);
  }
  /** @inheritdoc */
  render() {
    const disabled = this.disabled || this.disabledInteractive;
    const label = html`<div class="label"><slot></slot></div>`;
    return html`${this.orientation === "vertical" ? html`<m3e-focus-ring class="focus-ring" inward></m3e-focus-ring>` : nothing}<div class="outer">${this[renderPseudoLink]()}<div class="inner">${this.orientation === "horizontal" ? html`<m3e-focus-ring class="focus-ring"></m3e-focus-ring>` : nothing}<m3e-selection-indicator class="indicator" ?bounce="${this.orientation === "vertical" || !this._focusVisible}" ?centered="${this.orientation === "vertical"}" ?selected="${this.selected}" ?disabled="${disabled}"></m3e-selection-indicator><div class="touch" aria-hidden="true"></div><div class="base"><div class="icon-wrapper" aria-hidden="true"><div class="icon"><slot name="icon"></slot><slot name="selected-icon" @slotchange="${__classPrivateFieldGet(this, _M3eNavItemElement_instances, "m", _M3eNavItemElement_handleSelectedIconSlotChange)}"></slot></div></div><m3e-collapsible orientation="horizontal" ?no-animate="${!__classPrivateFieldGet(this, _M3eNavItemElement_inRail, "f")}" ?open="${this.orientation === "horizontal"}">${this.orientation === "horizontal" ? label : nothing}</m3e-collapsible>${this.orientation === "horizontal" ? nothing : label}</div></div></div>`;
  }
};
_M3eNavItemElement_inRail = new WeakMap();
_M3eNavItemElement_clickHandler = new WeakMap();
_M3eNavItemElement_resizeController = new WeakMap();
_M3eNavItemElement_instances = new WeakSet();
_M3eNavItemElement_applyOrientation = function _M3eNavItemElement_applyOrientation() {
  if (!isNavItemOrientation(this.orientation)) {
    this.orientation = "vertical";
  }
  setCustomEnumState(this, this.orientation, "horizontal", "vertical");
};
_M3eNavItemElement_handleClick = function _M3eNavItemElement_handleClick(e) {
  if (e.defaultPrevented) return;
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    this.selected = true;
    this.navBar?.[selectionManager].notifySelectionChange(this);
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
_M3eNavItemElement_handleSelectedIconSlotChange = function _M3eNavItemElement_handleSelectedIconSlotChange(e) {
  setCustomState(this, "--with-selected-icon", hasAssignedNodes(e.target));
};
_M3eNavItemElement_handleStateLayerResize = function _M3eNavItemElement_handleStateLayerResize(entries) {
  if (entries.length === 0 || this.orientation === "vertical") return;
  this._inner?.style.setProperty("--_expanded-width", `${entries[0].contentRect.width}px`);
};
_M3eNavItemElement_initResizeObserver = function _M3eNavItemElement_initResizeObserver() {
  if (this._indicator && __classPrivateFieldGet(this, _M3eNavItemElement_inRail, "f")) {
    __classPrivateFieldGet(this, _M3eNavItemElement_resizeController, "f").observe(this._indicator);
  }
};
/** The styles of the element. */
M3eNavItemElement.styles = css`:host { display: inline-block; vertical-align: middle; position: relative; outline: none; user-select: none; flex: 1; font-size: var(--m3e-nav-item-label-text-font-size, ${DesignToken.typescale.standard.label.medium.fontSize}); font-weight: var( --m3e-nav-item-label-text-font-weight, ${DesignToken.typescale.standard.label.medium.fontWeight} ); line-height: var( --m3e-nav-item-label-text-line-height, ${DesignToken.typescale.standard.label.medium.lineHeight} ); letter-spacing: var(--m3e-nav-item-label-text-tracking, ${DesignToken.typescale.standard.label.medium.tracking}); border-radius: var(--m3e-nav-item-shape, ${DesignToken.shape.corner.full}); align-self: var(--_nav-item-align-self); -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } :host(:is(:state(--vertical), :--vertical)) { min-width: var(--_vertical-nav-item-min-width); width: var(--_vertical-nav-item-width); margin-inline: var(--_vertical-nav-item-margin-inline); } :host(:is(:state(--horizontal), :--horizontal)) { max-width: fit-content; } :host(:is(:state(--horizontal), :--horizontal)) .outer { margin-inline-start: var(--_horizontal-nav-item-leading-space); margin-inline-end: var(--_horizontal-nav-item-trailing-space); } :host(:not(:disabled):not([disabled-interactive])) { cursor: pointer; } :host([disabled-interactive]) { cursor: not-allowed; } .outer { height: 100%; } .outer, .inner { display: flex; align-items: center; justify-content: var(--_nav-item-justify-content, center); position: relative; border-radius: inherit; } .icon-wrapper { position: relative; flex: none; line-height: 0; } .base { contain: layout style; justify-content: unset; box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; } :host(:not(:is(:state(--no-animate), :--no-animate))) .base { transition: ${unsafeCSS(`margin-top ${DesignToken.motion.duration.short1} ${DesignToken.motion.easing.standard}`)}; } .icon { position: absolute; } .label { vertical-align: middle; } * { user-select: none; -webkit-user-select: none; } :host(:is(:state(--horizontal), :--horizontal)) .label { white-space: nowrap; } ::slotted([slot="icon"]), ::slotted([slot="selected-icon"]) { width: 1em; font-size: var(--m3e-nav-item-icon-size, 24px) !important; } :host(:not(:is(:state(--no-animate), :--no-animate))) .indicator { transition: ${unsafeCSS(`height ${DesignToken.motion.duration.short1} ${DesignToken.motion.easing.standard}`)}; } :host(:not([selected])) slot[name="selected-icon"], :host(:not(:is(:state(--with-selected-icon), :--with-selected-icon))) slot[name="selected-icon"], :host([selected]:is(:state(--with-selected-icon), :--with-selected-icon)) slot[name="icon"] { display: none; } .indicator { --m3e-selection-indicator-color: var( --m3e-nav-item-active-container-color, ${DesignToken.color.secondaryContainer} ); } :host(:not([selected]):not(:disabled):not([disabled-interactive])) .indicator { --m3e-selection-indicator-state-layer-hover-color: var( --m3e-nav-item-inactive-hover-state-layer-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-selection-indicator-state-layer-focus-color: var( --m3e-nav-item-inactive-focus-state-layer-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-selection-indicator-state-layer-pressed-color: var( --m3e-nav-item-inactive-pressed-state-layer-color, ${DesignToken.color.onSecondaryContainer} ); } :host(:not([selected]):not(:disabled):not([disabled-interactive])) .label { color: var(--m3e-nav-item-inactive-label-text-color, ${DesignToken.color.onSurfaceVariant}); } :host(:not([selected]):not(:disabled):not([disabled-interactive])) .icon { color: var(--m3e-nav-item-inactive-icon-color, ${DesignToken.color.onSurfaceVariant}); } :host([selected]:not(:disabled):not([disabled-interactive])) .indicator { --m3e-selection-indicator-state-layer-hover-color: var( --m3e-nav-item-active-hover-state-layer-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-selection-indicator-state-layer-focus-color: var( --m3e-nav-item-active-focus-state-layer-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-selection-indicator-state-layer-pressed-color: var( --m3e-nav-item-active-pressed-state-layer-color, ${DesignToken.color.onSecondaryContainer} ); } :host([selected]:not(:disabled):not([disabled-interactive]):not(:is(:state(--horizontal), :--horizontal))) .label { color: var(--m3e-nav-item-active-label-text-color, ${DesignToken.color.secondary}); } :host([selected]:not(:disabled):not([disabled-interactive]):is(:state(--horizontal), :--horizontal)) .label, :host([selected]:not(:disabled):not([disabled-interactive])) .icon { color: var(--m3e-nav-item-active-icon-color, ${DesignToken.color.onSecondaryContainer}); } :host(:is(:state(--vertical), :--vertical)) .outer { align-self: stretch; align-items: flex-start; } :host(:is(:state(--vertical), :--vertical)) .label { text-align: center; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-clamp: 2; } :host(:is(:state(--vertical), :--vertical)) .base { flex-direction: column; row-gap: var(--m3e-nav-item-spacing, ${DesignToken.measurement.space50}); } :host(:is(:state(--horizontal), :--horizontal)) .base { margin-top: 0; } :host(:is(:state(--vertical), :--vertical)) .base { margin-top: var(--m3e-vertical-nav-item-active-indicator-margin, ${DesignToken.measurement.space75}); margin-bottom: var(--m3e-vertical-nav-item-active-indicator-margin, ${DesignToken.measurement.space75}); } :host(:is(:state(--vertical), :--vertical)) .indicator { top: var(--m3e-vertical-nav-item-active-indicator-margin, ${DesignToken.measurement.space75}); bottom: unset; } :host(:is(:state(--vertical), :--vertical):is(:state(--rtl), :--rtl)) .indicator { right: var(--_vertical-nav-item-inset-start); left: unset; } :host(:is(:state(--vertical), :--vertical):not(:is(:state(--rtl), :--rtl))) .indicator { left: var(--_vertical-nav-item-inset-start); right: unset; } :host(:is(:state(--vertical), :--vertical)) .indicator, :host(:is(:state(--vertical), :--vertical)) .icon-wrapper { min-width: var(--m3e-vertical-nav-item-active-indicator-width, 56px); } :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical)) .state-layer { ${unsafeCSS(`collapse ${DesignToken.motion.duration.medium1}, indicator-grow-bounce ${DesignToken.motion.duration.medium2} ${DesignToken.motion.easing.standardAccelerate}`)}; } :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical)) .indicator { animation: collapse ${DesignToken.motion.duration.medium1}; } @keyframes collapse { from { width: var(--_expanded-width, var(--m3e-vertical-nav-item-active-indicator-width, 56px)); } to { width: var(--m3e-vertical-nav-item-active-indicator-width, 56px); } } :host(:is(:state(--vertical), :--vertical)) .indicator, :host(:is(:state(--vertical), :--vertical)) .icon-wrapper { height: var(--m3e-vertical-nav-item-active-indicator-height, 32px); } :host(:is(:state(--vertical), :--vertical)) .icon { top: calc( calc(var(--m3e-vertical-nav-item-active-indicator-height, 32px) / 2) - calc( var(--m3e-nav-item-icon-size, 24px) / 2 ) ); left: calc( calc(var(--m3e-vertical-nav-item-active-indicator-width, 56px) / 2) - calc( var(--m3e-nav-item-icon-size, 24px) / 2 ) ); } :host(:is(:state(--vertical), :--vertical)) .focus-ring { border-radius: var(--m3e-nav-item-focus-ring-shape, ${DesignToken.shape.corner.medium}); } :host(:is(:state(--horizontal), :--horizontal)) .icon-wrapper { width: var(--m3e-nav-item-icon-size, 24px); height: var(--m3e-nav-item-icon-size, 24px); } :host(:is(:state(--horizontal), :--horizontal)) .base { padding: var(--m3e-horizontal-nav-item-padding, ${DesignToken.measurement.space200}); } :host(:is(:state(--horizontal), :--horizontal)) .label { flex: 1 1 auto; } :host(:is(:state(--horizontal), :--horizontal)) .base { column-gap: var(--m3e-nav-item-spacing, ${DesignToken.measurement.space50}); } :host(:is(:state(--horizontal), :--horizontal)) .indicator, :host(:is(:state(--horizontal), :--horizontal)) .inner { height: var(--m3e-horizontal-nav-item-active-indicator-height, 40px); } :host(:is(:state(--horizontal), :--horizontal)) .inner { width: fit-content; } .indicator { margin-inline: auto; } :host( :is(:state(--first), :--first):not(:is(:state(--no-animate), :--no-animate)):is( :state(--horizontal), :--horizontal ) ) .icon-wrapper, :host( :not(:is(:state(--first), :--first)):not(:is(:state(--no-animate), :--no-animate)):is( :state(--vertical), :--vertical ) ) .icon-wrapper { animation: ${unsafeCSS(`slide-down ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}`)}; } :host( :not(:is(:state(--first), :--first)):not(:is(:state(--no-animate), :--no-animate)):is( :state(--horizontal), :--horizontal ) ) .icon-wrapper, :host( :is(:state(--first), :--first):not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical) ) .icon-wrapper { animation: ${unsafeCSS(`slide-up ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}`)}; } @keyframes slide-down { from { transform: translateY(-4px); } to { transform: translateY(0); } } @keyframes slide-up { from { transform: translateY(4px); } to { transform: translateY(0); } } :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--horizontal), :--horizontal)) .label { animation: horizontal-fade-in ${DesignToken.motion.duration.medium1}; } :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical)) .label { animation: vertical-fade-in ${DesignToken.motion.duration.medium1}; } @keyframes horizontal-fade-in { from { opacity: 0; } to { opacity: 1; } } @keyframes vertical-fade-in { from { opacity: 0; } to { opacity: 1; } } :host(:disabled) .label, :host([disabled-interactive]) .label { color: color-mix( in srgb, var(--m3e-nav-item-disabled-label-text-color, ${DesignToken.color.onSurface}) var(--m3e-nav-item-disabled-label-text-opacity, 38%), transparent ); } :host(:disabled) .icon, :host([disabled-interactive]) .icon { color: color-mix( in srgb, var(--m3e-nav-item-disabled-icon-color, ${DesignToken.color.onSurface}) var(--m3e-nav-item-disabled-icon-opacity, 38%), transparent ); } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } @media (prefers-reduced-motion) { :host( :is(:state(--first), :--first):not(:is(:state(--no-animate), :--no-animate)):is( :state(--horizontal), :--horizontal ) ) .icon-wrapper, :host( :not(:is(:state(--first), :--first)):not(:is(:state(--no-animate), :--no-animate)):is( :state(--vertical), :--vertical ) ) .icon-wrapper, :host( :not(:is(:state(--first), :--first)):not(:is(:state(--no-animate), :--no-animate)):is( :state(--horizontal), :--horizontal ) ) .icon-wrapper, :host( :is(:state(--first), :--first):not(:is(:state(--no-animate), :--no-animate)):is( :state(--vertical), :--vertical ) ) .icon-wrapper, :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical)) .state-layer, :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical)) .indicator, :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--horizontal), :--horizontal)) .label, :host(:not(:is(:state(--no-animate), :--no-animate)):is(:state(--vertical), :--vertical)) .label { animation: none; } :host(:not(:is(:state(--no-animate), :--no-animate))) .state-layer, :host(:not(:is(:state(--no-animate), :--no-animate))) .indicator, :host(:not(:is(:state(--no-animate), :--no-animate))) .base { transition: none; } } @media (forced-colors: active) { :host(:disabled) .label, :host([disabled-interactive]) .label, :host(:disabled) .icon, :host([disabled-interactive]) .icon { color: GrayText; } :host(:not([selected]):not(:disabled):not([disabled-interactive])) .label, :host(:not([selected]):not(:disabled):not([disabled-interactive])) .icon { color: ButtonText; } :host([selected]:not(:disabled):not([disabled-interactive])) .indicator { --m3e-selection-indicator-color: ButtonText; } :host(:is(:state(--vertical), :--vertical)[selected]:not(:disabled):not([disabled-interactive])) .label { color: ButtonText; } :host(:is(:state(--horizontal), :--horizontal)[selected]:not(:disabled):not([disabled-interactive])) .label, :host([selected]:not(:disabled):not([disabled-interactive])) .icon { forced-color-adjust: none; color: ButtonFace; } }`;
__decorate([query(".focus-ring")], M3eNavItemElement.prototype, "_focusRing", void 0);
__decorate([query(".indicator")], M3eNavItemElement.prototype, "_indicator", void 0);
__decorate([query(".inner")], M3eNavItemElement.prototype, "_inner", void 0);
__decorate([state()], M3eNavItemElement.prototype, "_focusVisible", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eNavItemElement.prototype, "orientation", void 0);
M3eNavItemElement = __decorate([customElement("m3e-nav-item")], M3eNavItemElement);

export { M3eNavBarElement, M3eNavItemElement, isNavBarMode, isNavItemOrientation };
//# sourceMappingURL=NavItemElement.js.map
