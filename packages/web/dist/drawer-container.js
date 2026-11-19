/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html } from 'lit';
import { state, property } from 'lit/decorators.js';
import { DesignToken, ReconnectedCallback, AttachInternals, ResizeController, addCustomState, hasCustomState, deleteCustomState, customElement, HtmlFor, ActionElementBase } from './TextOverflowElement.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { waitForUpdate } from './waitForUpdate.js';
import 'lit/directives/if-defined.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';
import './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';
import { addAriaReferencedId, removeAriaReferencedId } from './LiveAnnouncer.js';

/**
 * Determines whether a value is a `DrawerMode`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `DrawerMode`.
 */
function isDrawerMode(value) {
  return value === "over" || value === "push" || value === "side" || value === "auto";
}

/**
 * Component design tokens that control `M3eDrawerContainerElement`.
 * @internal
 */
const DrawerContainerToken = {
  containerColor: unsafeCSS(`var(--m3e-drawer-container-color, ${DesignToken.color.surface})`),
  containerElevation: unsafeCSS(`var(--m3e-drawer-container-elevation, ${DesignToken.elevation.level0})`),
  containerWidth: unsafeCSS(`var(--m3e-drawer-container-width, 360px)`),
  scrimOpacity: unsafeCSS("var(--m3e-drawer-container-scrim-opacity, 32%)"),
  startShape: unsafeCSS(`var(--m3e-modal-drawer-start-shape, var(--m3e-modal-drawer-corner-shape, ${DesignToken.shape.corner.large}))`),
  endShape: unsafeCSS(`var(--m3e-modal-drawer-end-shape, var(--m3e-modal-drawer-corner-shape, ${DesignToken.shape.corner.large}))`),
  modalContainerColor: unsafeCSS(`var(--m3e-modal-drawer-container-color, ${DesignToken.color.surfaceContainerLow})`),
  modalContainerElevation: unsafeCSS(`var(--m3e-modal-drawer-elevation, ${DesignToken.elevation.level1})`),
  dividerColor: unsafeCSS(`var(--m3e-drawer-divider-color, ${DesignToken.color.outline})`),
  dividerThickness: unsafeCSS("var(--m3e-drawer-divider-thickness, 1px)")
};

/**
 * Styles for `M3eDrawerContainerElement`.
 * @internal
 */
const DrawerContainerStyle = css`:host { display: block; position: relative; overflow: clip; flex: 1 1 auto; } :host([hidden]) { display: none; } .base { display: contents; } .start, .end { contain: layout style; position: absolute; top: 0; bottom: 0; z-index: 3; outline: none; overflow-x: hidden; overflow-y: auto; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; box-sizing: border-box; background-color: ${DrawerContainerToken.containerColor}; box-shadow: ${DrawerContainerToken.containerElevation}; transition: ${unsafeCSS(`margin ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard},
      visibility ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard} allow-discrete,
      background-color ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard},
      box-shadow ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard}`)}; } .start { inset-inline-start: 0; } .end { inset-inline-end: 0; } :host(:not([start])) .start { visibility: hidden; } :host(:not([start]):not(:is(:state(--rtl), :--rtl))) .start { margin-left: calc(0px - var(--_start-drawer-size, ${DrawerContainerToken.containerWidth})); } :host(:not([start]):is(:state(--rtl), :--rtl)) .start { margin-right: calc(0px - var(--_start-drawer-size, ${DrawerContainerToken.containerWidth})); } :host([start]:not(:is(:state(--rtl), :--rtl))) .start { margin-left: 0; } :host([start]:is(:state(--rtl), :--rtl)) .start { margin-right: 0; } :host(:not([end])) .end { visibility: hidden; } :host(:not([end]):not(:is(:state(--rtl), :--rtl))) .end { margin-right: calc(0px - var(--_end-drawer-size, ${DrawerContainerToken.containerWidth})); } :host(:not([end]):is(:state(--rtl), :--rtl)) .end { margin-left: calc(0px - var(--_end-drawer-size, ${DrawerContainerToken.containerWidth})); } :host([end]:not(:is(:state(--rtl), :--rtl))) .end { margin-right: 0; } :host([end]:is(:state(--rtl), :--rtl)) .end { margin-left: 0; } ::slotted([slot="start"]), ::slotted([slot="end"]) { height: 100%; width: ${DrawerContainerToken.containerWidth}; box-sizing: border-box; } .content { contain: layout style; position: relative; height: 100%; overflow: auto; margin-left: 0; margin-right: 0; transition: ${unsafeCSS(`margin ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--start-push), :--start-push)[start]:not(:is(:state(--rtl), :--rtl))) .content, :host(:is(:state(--start-side), :--start-side)[start]:not(:is(:state(--rtl), :--rtl))) .content { margin-left: var(--_start-drawer-size, ${DrawerContainerToken.containerWidth}); } :host(:is(:state(--start-push), :--start-push)[start]:is(:state(--rtl), :--rtl)) .content, :host(:is(:state(--start-side), :--start-side)[start]:is(:state(--rtl), :--rtl)) .content { margin-right: var(--_start-drawer-size, ${DrawerContainerToken.containerWidth}); } :host(:is(:state(--end-push), :--end-push)[end]:not(:is(:state(--rtl), :--rtl))) .content, :host(:is(:state(--end-side), :--end-side)[end]:not(:is(:state(--rtl), :--rtl))) .content { margin-right: var(--_end-drawer-size, ${DrawerContainerToken.containerWidth}); } :host(:is(:state(--end-push), :--end-push)[end]:is(:state(--rtl), :--rtl)) .content, :host(:is(:state(--end-side), :--end-side)[end]:is(:state(--rtl), :--rtl)) .content { margin-left: var(--_end-drawer-size, ${DrawerContainerToken.containerWidth}); } .scrim { display: block; position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 1; background-color: ${DesignToken.color.scrim}; opacity: 0; visibility: hidden; transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard}, 
        visibility ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard} allow-discrete`)}; } @starting-style { .scrim { opacity: 0; } } :host(:is(:state(--start-push), :--start-push)[start]) .scrim, :host(:is(:state(--end-push), :--end-push)[end]) .scrim, :host(:is(:state(--start-over), :--start-over)[start]) .scrim, :host(:is(:state(--end-over), :--end-over)[end]) .scrim { visibility: visible; opacity: ${DrawerContainerToken.scrimOpacity}; } :host(:is(:state(--start-push), :--start-push)) .start, :host(:is(:state(--start-over), :--start-over)) .start { border-start-end-radius: ${DrawerContainerToken.endShape}; border-end-end-radius: ${DrawerContainerToken.endShape}; } :host(:is(:state(--end-push), :--end-push)) .end, :host(:is(:state(--end-over), :--end-over)) .end { border-start-start-radius: ${DrawerContainerToken.startShape}; border-end-start-radius: ${DrawerContainerToken.startShape}; } :host(:is(:state(--start-push), :--start-push)) .start, :host(:is(:state(--end-push), :--end-push)) .end, :host(:is(:state(--start-over), :--start-over)) .start, :host(:is(:state(--end-over), :--end-over)) .end { background-color: ${DrawerContainerToken.modalContainerColor}; box-shadow: ${DrawerContainerToken.modalContainerElevation}; } :host([start-divider]) .start { border-inline-end-color: transparent; border-inline-end-width: ${DrawerContainerToken.dividerThickness}; border-inline-end-style: solid; box-sizing: border-box; } :host( [start-divider]:is(:state(--start-side), :--start-side)[start]:not(:is(:state(--end-push), :--end-push)[end]):not( :is(:state(--end-over), :--end-over)[end] ) ) .start { border-inline-end-color: ${DrawerContainerToken.dividerColor}; } :host([end-divider]) .end { border-inline-start-color: transparent; border-inline-start-width: ${DrawerContainerToken.dividerThickness}; border-inline-start-style: solid; box-sizing: border-box; } :host( [end-divider]:is(:state(--end-side), :--end-side)[end]:not(:is(:state(--start-push), :--start-push)[start]):not( :is(:state(--start-over), :--start-over)[start] ) ) .end { border-inline-start-color: ${DrawerContainerToken.dividerColor}; } :host(:is(:state(--no-animate), :--no-animate)) .start, :host(:is(:state(--no-animate), :--no-animate)) .end, :host(:is(:state(--no-animate), :--no-animate)) .content { transition: none; } @media (forced-colors: active) { .start, .end { background-color: Canvas; box-shadow: unset; transition: ${unsafeCSS(`margin ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard},
      visibility ${DesignToken.motion.duration.medium4} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--start-push), :--start-push)) .start, :host(:is(:state(--end-push), :--end-push)) .end, :host(:is(:state(--start-over), :--start-over)) .start, :host(:is(:state(--end-over), :--end-over)) .end { background-color: Canvas; box-shadow: unset; border-color: CanvasText; } .start, .end { border-style: solid; border-color: Canvas; border-width: 1px; } .start { border-inline-start-style: none; } .end { border-inline-end-style: none; } :host( [start-divider]:is(:state(--start-side), :--start-side)[start]:not( :is(:state(--end-push), :--end-push)[end] ):not(:is(:state(--end-over), :--end-over)[end]) ) .start { border-inline-end-color: GrayText; } :host( [end-divider]:is(:state(--end-side), :--end-side)[end]:not(:is(:state(--start-push), :--start-push)[start]):not( :is(:state(--start-over), :--start-over)[start] ) ) .end { border-inline-start-color: GrayText; } } @media (prefers-reduced-motion) { .start, .end, .content, .scrim { transition: none; } }`;

var _M3eDrawerContainerElement_instances, _M3eDrawerContainerElement_breakpointUnobserve, _M3eDrawerContainerElement_disableStartFocusTrap, _M3eDrawerContainerElement_disableEndFocusTrap, _M3eDrawerContainerElement_resizeController, _M3eDrawerContainerElement_initialize, _M3eDrawerContainerElement_handleScrimClick, _M3eDrawerContainerElement_handleStartSlotChange, _M3eDrawerContainerElement_handleEndSlotChange, _M3eDrawerContainerElement_handleDrawerResize, _M3eDrawerContainerElement_initBreakpointMonitoring, _M3eDrawerContainerElement_clearMode, _M3eDrawerContainerElement_updateMode;
/**
 * A container for one or two sliding drawers.
 *
 * @description
 * A responsive layout container that manages left and right drawers alongside main content.
 * Supports `over`, `push`, `side`, and `auto` modes, adapting drawer behavior based on breakpoint size.
 * Encodes spatial hierarchy, motion transitions, and accessibility semantics for modal, dismissible,
 * and permanent navigation.
 *
 * @example
 * The following example illustrates a typical drawer layout.
 * ```html
 * <m3e-drawer-container>
 *  <nav slot="start">
 *    <!-- Start drawer content -->
 *  </nav>
 *  <main>
 *    <!-- Main content -->
 *  </main>
 *  <aside slot="end">
 *    <!-- End drawer content -->
 *  </aside>
 * <m3e-drawer-container>
 * ```
 *
 * @tag m3e-drawer-container
 *
 * @slot - Renders the main content.
 * @slot start - Renders the start drawer.
 * @slot end - Renders the end drawer.
 *
 * @attr end - Whether the end drawer is open.
 * @attr end-mode - The behavior mode of the end drawer.
 * @attr end-divider - Whether to show a divider between the end drawer and content for `side` mode.
 * @attr start - Whether the start drawer is open.
 * @attr start-mode - The behavior mode of the start drawer.
 * @attr start-divider - Whether to show a divider between the start drawer and content for `side` mode.
 *
 * @fires change - Dispatched when the state of the start or end drawers change.
 *
 * @cssprop --m3e-drawer-container-color - The background color of the drawer container.
 * @cssprop --m3e-drawer-container-elevation - The elevation level of the drawer container.
 * @cssprop --m3e-drawer-container-width - The width of the drawer container.
 * @cssprop --m3e-drawer-container-scrim-opacity - The opacity of the scrim behind the drawer.
 * @cssprop --m3e-modal-drawer-start-shape - The shape of the drawer's start edge (typically left in LTR), used by a modal end drawer.
 * @cssprop --m3e-modal-drawer-end-shape - The shape of the drawer's end edge (typically right in LTR), used by a modal start drawer.
 * @cssprop --m3e-modal-drawer-container-color - The background color of the modal drawer container.
 * @cssprop --m3e-modal-drawer-elevation - The elevation level of the modal drawer container.
 * @cssprop --m3e-drawer-divider-color - The color of the divider between drawer sections.
 * @cssprop --m3e-drawer-divider-thickness - The thickness of the divider line.
 */
let M3eDrawerContainerElement = class M3eDrawerContainerElement extends SupportsDirectionality(ReconnectedCallback(AttachInternals(LitElement))) {
  constructor() {
    super(...arguments);
    _M3eDrawerContainerElement_instances.add(this);
    /** @private */
    this._startMode = "side";
    /** @private */
    this._endMode = "side";
    /** @private */
    _M3eDrawerContainerElement_breakpointUnobserve.set(this, void 0);
    /** @private */
    _M3eDrawerContainerElement_disableStartFocusTrap.set(this, false);
    /** @private */
    _M3eDrawerContainerElement_disableEndFocusTrap.set(this, false);
    /** @private */
    _M3eDrawerContainerElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      skipInitial: true,
      callback: entries => __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_handleDrawerResize).call(this, entries)
    }));
    /**
     * Whether the start drawer is open.
     * @default false
     */
    this.start = false;
    /**
     * The behavior mode of the start drawer.
     * @default "side"
     */
    this.startMode = "side";
    /**
     * Whether to show a divider between the start drawer and content for `side` mode.
     * @default "side"
     */
    this.startDivider = false;
    /**
     * Whether the end drawer is open.
     * @default false
     */
    this.end = false;
    /**
     * The behavior mode of the end drawer.
     * @default "side"
     */
    this.endMode = "side";
    /**
     * Whether to show a divider between the end drawer and content for `side` mode.
     * @default "side"
     */
    this.endDivider = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    addCustomState(this, "--no-animate");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eDrawerContainerElement_breakpointUnobserve, "f")?.call(this);
    __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_clearMode).call(this);
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("startMode") && !isDrawerMode(this.startMode)) {
      this.startMode = "side";
    }
    if (changedProperties.has("endMode") && !isDrawerMode(this.endMode)) {
      this.endMode = "side";
    }
    if (changedProperties.has("startMode") || changedProperties.has("endMode")) {
      __classPrivateFieldGet(this, _M3eDrawerContainerElement_breakpointUnobserve, "f")?.call(this);
      if (this.startMode === "auto" || this.endMode === "auto") {
        __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_initBreakpointMonitoring).call(this);
      } else {
        __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_updateMode).call(this);
      }
    }
    if (changedProperties.has("start")) {
      if (this.start && this.end && this._endMode !== "side") {
        this.end = false;
      }
    } else if (changedProperties.has("end")) {
      if (this.end && this.start && this._startMode !== "side") {
        this.start = false;
      }
    }
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_initialize).call(this);
    if (this.startMode === "auto" || this.endMode === "auto") {
      __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_initBreakpointMonitoring).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (this.startMode === "side" && this.endMode === "side") {
      __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_updateMode).call(this);
    }
    __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_initialize).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><div class="start"><m3e-focus-trap ?disabled="${!this.start || this._startMode === "side" || __classPrivateFieldGet(this, _M3eDrawerContainerElement_disableStartFocusTrap, "f")}"><slot name="start" @slotchange="${__classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_handleStartSlotChange)}"></slot></m3e-focus-trap></div><div class="content" .inert="${(this._startMode !== "side" || this._endMode !== "side") && (this.start || this.end)}"><slot></slot></div><div class="scrim" @click="${__classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_handleScrimClick)}"></div><div class="end"><m3e-focus-trap ?disabled="${!this.end || this._endMode === "side" || __classPrivateFieldGet(this, _M3eDrawerContainerElement_disableEndFocusTrap, "f")}"><slot name="end" @slotchange="${__classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_handleEndSlotChange)}"></slot></m3e-focus-trap></div></div>`;
  }
};
_M3eDrawerContainerElement_breakpointUnobserve = new WeakMap();
_M3eDrawerContainerElement_disableStartFocusTrap = new WeakMap();
_M3eDrawerContainerElement_disableEndFocusTrap = new WeakMap();
_M3eDrawerContainerElement_resizeController = new WeakMap();
_M3eDrawerContainerElement_instances = new WeakSet();
_M3eDrawerContainerElement_initialize = function _M3eDrawerContainerElement_initialize() {
  let drawer = this.shadowRoot?.querySelector(".start");
  if (drawer) __classPrivateFieldGet(this, _M3eDrawerContainerElement_resizeController, "f").observe(drawer);
  drawer = this.shadowRoot?.querySelector(".end");
  if (drawer) __classPrivateFieldGet(this, _M3eDrawerContainerElement_resizeController, "f").observe(drawer);
};
_M3eDrawerContainerElement_handleScrimClick = function _M3eDrawerContainerElement_handleScrimClick() {
  if (this._startMode !== "side") {
    this.start = false;
  }
  if (this._endMode !== "side") {
    this.end = false;
  }
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eDrawerContainerElement_handleStartSlotChange = function _M3eDrawerContainerElement_handleStartSlotChange(e) {
  __classPrivateFieldSet(this, _M3eDrawerContainerElement_disableStartFocusTrap, !hasAssignedNodes(e.target), "f");
};
_M3eDrawerContainerElement_handleEndSlotChange = function _M3eDrawerContainerElement_handleEndSlotChange(e) {
  __classPrivateFieldSet(this, _M3eDrawerContainerElement_disableEndFocusTrap, !hasAssignedNodes(e.target), "f");
};
_M3eDrawerContainerElement_handleDrawerResize = function _M3eDrawerContainerElement_handleDrawerResize(entries) {
  const base = this.shadowRoot?.querySelector(".base");
  if (base) {
    for (const entry of entries) {
      const borderSize = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
      if (entry.target.classList.contains("start")) {
        base.style.setProperty("--_start-drawer-size", `${borderSize.inlineSize}px`);
      } else if (entry.target.classList.contains("end")) {
        base.style.setProperty("--_end-drawer-size", `${borderSize.inlineSize}px`);
      }
    }
  }
  if (hasCustomState(this, "--no-animate")) {
    // Force synchronous layout flush
    void this.offsetTop;
    deleteCustomState(this, "--no-animate");
  }
};
_M3eDrawerContainerElement_initBreakpointMonitoring = function _M3eDrawerContainerElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eDrawerContainerElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall, Breakpoint.Small], matches => __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_updateMode).call(this, matches, true)), "f");
};
_M3eDrawerContainerElement_clearMode = function _M3eDrawerContainerElement_clearMode() {
  deleteCustomState(this, "--start-over");
  deleteCustomState(this, "--start-push");
  deleteCustomState(this, "--start-side");
  deleteCustomState(this, "--end-over");
  deleteCustomState(this, "--end-push");
  deleteCustomState(this, "--end-side");
};
_M3eDrawerContainerElement_updateMode = /** @inheritdoc */
async function _M3eDrawerContainerElement_updateMode(breakpoints, autoClose = false) {
  let autoCloseStart = false,
    autoCloseEnd = false;
  if (this.startMode === "auto") {
    if (breakpoints?.get(Breakpoint.Medium)) {
      this._startMode = "side";
    } else if (breakpoints?.get(Breakpoint.Small)) {
      autoCloseStart = this._startMode === "side" && this.start;
      this._startMode = "push";
    } else if (breakpoints?.get(Breakpoint.XSmall)) {
      autoCloseStart = this._startMode !== "over" && this.start;
      this._startMode = "over";
    } else {
      this._startMode = "side";
    }
  } else {
    this._startMode = this.startMode;
  }
  if (this.endMode === "auto") {
    if (breakpoints?.get(Breakpoint.Medium)) {
      this._endMode = "side";
    } else if (breakpoints?.get(Breakpoint.Small)) {
      autoCloseEnd = this._endMode === "side" && this.end;
      this._endMode = "push";
    } else if (breakpoints?.get(Breakpoint.XSmall)) {
      autoCloseEnd = this._endMode !== "over" && this.end;
      this._endMode = "over";
    } else {
      this._endMode = "side";
    }
  } else {
    this._endMode = this.endMode;
  }
  __classPrivateFieldGet(this, _M3eDrawerContainerElement_instances, "m", _M3eDrawerContainerElement_clearMode).call(this);
  addCustomState(this, `--start-${this._startMode}`);
  addCustomState(this, `--end-${this._endMode}`);
  if (autoClose && (autoCloseStart || autoCloseEnd)) {
    if (autoCloseStart) {
      this.start = false;
    }
    if (autoCloseEnd) {
      this.end = false;
    }
    await waitForUpdate(this);
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
/** The styles of the element. */
M3eDrawerContainerElement.styles = DrawerContainerStyle;
__decorate([state()], M3eDrawerContainerElement.prototype, "_startMode", void 0);
__decorate([state()], M3eDrawerContainerElement.prototype, "_endMode", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eDrawerContainerElement.prototype, "start", void 0);
__decorate([property({
  attribute: "start-mode",
  reflect: true,
  useDefault: true
})], M3eDrawerContainerElement.prototype, "startMode", void 0);
__decorate([property({
  attribute: "start-divider",
  type: Boolean,
  reflect: true
})], M3eDrawerContainerElement.prototype, "startDivider", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eDrawerContainerElement.prototype, "end", void 0);
__decorate([property({
  attribute: "end-mode",
  reflect: true,
  useDefault: true
})], M3eDrawerContainerElement.prototype, "endMode", void 0);
__decorate([property({
  attribute: "end-divider",
  type: Boolean,
  reflect: true
})], M3eDrawerContainerElement.prototype, "endDivider", void 0);
M3eDrawerContainerElement = __decorate([customElement("m3e-drawer-container")], M3eDrawerContainerElement);

var _M3eDrawerToggleElement_instances, _M3eDrawerToggleElement_drawerContainerChangeHandler, _M3eDrawerToggleElement_togglingDrawer, _M3eDrawerToggleElement_handleDrawerContainerChange, _M3eDrawerToggleElement_toggleDrawer, _M3eDrawerToggleElement_updateToggle;
/**
 * An element, nested within a clickable element, used to toggle the opened state of a drawer.
 *
 * @example
 * The following example illustrates the use of a `m3e-drawer-toggle`, nested inside a `m3e-icon-button` component,
 * which toggles the open state of the start drawer.
 *
 * ```html
 * <m3e-icon-button slot="leading-icon" aria-label="Menu" toggle selected>
 *   <m3e-drawer-toggle for="startDrawer"></m3e-drawer-toggle>
 *   <m3e-icon name="menu"></m3e-icon>
 *   <m3e-icon slot="selected" name="menu_open"></m3e-icon>
 * </m3e-icon-button>
 *
 * <m3e-drawer-container start>
 *   <nav slot="start" id="startDrawer" aria-label="Navigation">
 *     <!-- Start drawer content -->
 *   </nav>
 *   <!-- Container content -->
 * </m3e-drawer-container>
 * ```
 *
 * @tag m3e-drawer-toggle
 */
let M3eDrawerToggleElement = class M3eDrawerToggleElement extends HtmlFor(ActionElementBase) {
  constructor() {
    super(...arguments);
    _M3eDrawerToggleElement_instances.add(this);
    /** @private */
    _M3eDrawerToggleElement_drawerContainerChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eDrawerToggleElement_instances, "m", _M3eDrawerToggleElement_handleDrawerContainerChange).call(this));
    /** @private */
    _M3eDrawerToggleElement_togglingDrawer.set(this, false);
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    if (this.htmlFor && this.parentElement) {
      addAriaReferencedId(this.parentElement, "aria-controls", this.htmlFor);
    }
    const container = control.closest("m3e-drawer-container");
    if (container) {
      container.addEventListener("change", __classPrivateFieldGet(this, _M3eDrawerToggleElement_drawerContainerChangeHandler, "f"));
      __classPrivateFieldGet(this, _M3eDrawerToggleElement_instances, "m", _M3eDrawerToggleElement_updateToggle).call(this, container, true);
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.parentElement) {
      if (this.htmlFor) {
        removeAriaReferencedId(this.parentElement, "aria-controls", this.htmlFor);
      }
      this.parentElement.ariaExpanded = null;
    }
    this.control?.closest("m3e-drawer-container")?.removeEventListener("change", __classPrivateFieldGet(this, _M3eDrawerToggleElement_drawerContainerChangeHandler, "f"));
    super.detach();
  }
  /** @inheritdoc */
  _onClick() {
    __classPrivateFieldGet(this, _M3eDrawerToggleElement_instances, "m", _M3eDrawerToggleElement_toggleDrawer).call(this);
  }
};
_M3eDrawerToggleElement_drawerContainerChangeHandler = new WeakMap();
_M3eDrawerToggleElement_togglingDrawer = new WeakMap();
_M3eDrawerToggleElement_instances = new WeakSet();
_M3eDrawerToggleElement_handleDrawerContainerChange = function _M3eDrawerToggleElement_handleDrawerContainerChange() {
  if (this.control && !__classPrivateFieldGet(this, _M3eDrawerToggleElement_togglingDrawer, "f")) {
    const container = this.control.closest("m3e-drawer-container");
    if (container) {
      __classPrivateFieldGet(this, _M3eDrawerToggleElement_instances, "m", _M3eDrawerToggleElement_updateToggle).call(this, container, true);
    }
  }
};
_M3eDrawerToggleElement_toggleDrawer = /** @private */
async function _M3eDrawerToggleElement_toggleDrawer() {
  if (!this.parentElement || !this.control) {
    return;
  }
  const container = this.control.closest("m3e-drawer-container");
  if (container) {
    __classPrivateFieldSet(this, _M3eDrawerToggleElement_togglingDrawer, true, "f");
    try {
      let changed = false;
      if (this.control.slot === "start") {
        container.start = !container.start;
        changed = true;
      } else if (this.control.slot === "end") {
        container.end = !container.end;
        changed = true;
      }
      await waitForUpdate(container);
      if (changed) {
        container.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      }
      await __classPrivateFieldGet(this, _M3eDrawerToggleElement_instances, "m", _M3eDrawerToggleElement_updateToggle).call(this, container, false);
    } finally {
      __classPrivateFieldSet(this, _M3eDrawerToggleElement_togglingDrawer, false, "f");
    }
  }
};
_M3eDrawerToggleElement_updateToggle = /** @private */
async function _M3eDrawerToggleElement_updateToggle(container, syncToggle) {
  if (!this.parentElement || !this.control) {
    return;
  }
  let selected = false;
  if (this.control.slot === "start") {
    selected = container.start;
  } else if (this.control.slot === "end") {
    selected = container.end;
  }
  this.parentElement.ariaExpanded = `${selected}`;
  if (syncToggle && this.parentElement.hasAttribute("toggle")) {
    this.parentElement.toggleAttribute("selected", selected);
  }
  if (this.parentElement instanceof LitElement) {
    // Wait for update and remove aria-pressed due to use of aria-expanded.
    await this.parentElement.updateComplete;
    this.parentElement.ariaPressed = null;
  }
};
M3eDrawerToggleElement = __decorate([customElement("m3e-drawer-toggle")], M3eDrawerToggleElement);

export { M3eDrawerContainerElement, M3eDrawerToggleElement, isDrawerMode };
//# sourceMappingURL=drawer-container.js.map
