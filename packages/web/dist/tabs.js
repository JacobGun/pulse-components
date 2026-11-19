/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate, __classPrivateFieldSet } from 'tslib';
import { LitElement, html, css, nothing, unsafeCSS } from 'lit';
import { query, state, property } from 'lit/decorators.js';
import { HtmlFor, Disabled, AttachInternals, Role, DesignToken, customElement, ResizeController, addCustomState, setCustomEnumState, setCustomState, hasCustomState, prefersReducedMotion, deleteCustomState } from './TextOverflowElement.js';
import { Selected } from './Selected.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { addAriaReferencedId, removeAriaReferencedId, selectionManager, M3eInteractivityChecker, SelectionManager } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';
import './SlideGroupElement.js';
import './SwipeGestureElement.js';

var _M3eTabElement_instances, _M3eTabElement_clickHandler, _M3eTabElement_handleClick;
var M3eTabElement_1;
/**
 * An interactive element that, when activated, presents an associated tab panel.
 *
 * @description
 * The `m3e-tab` component is an interactive control used within a tabbed interface to activate and
 * reveal an associated tab panel. It supports accessible labeling, optional iconography, and selection
 * state styling consistent with Material 3 guidance. Tabs may be disabled, selected, or linked to a
 * specific panel via the `for` attribute, enabling declarative control and semantic clarity.
 *
 * @example
 * The following example illustrates using the `m3e-tabs`, `m3e-tab`, and `m3e-tab-panel` components to present
 * secondary tabs.
 * ```html
 * <m3e-tabs>
 *  <m3e-tab selected for="videos"><m3e-icon slot="icon" name="videocam"></m3e-icon>Video</m3e-tab>
 *  <m3e-tab for="photos"><m3e-icon slot="icon" name="photo"></m3e-icon>Photos</m3e-tab>
 *  <m3e-tab for="audio"><m3e-icon slot="icon" name="music_note"></m3e-icon>Audio</m3e-tab>
 *  <m3e-tab-panel id="videos">Videos</m3e-tab-panel>
 *  <m3e-tab-panel id="photos">Photos</m3e-tab-panel>
 *  <m3e-tab-panel id="audio">Audio</m3e-tab-panel>
 * </m3e-tabs>
 * ```
 *
 * @tag m3e-tab
 *
 * @slot - Renders the label of the tab.
 * @slot icon - Renders an icon before the tab's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr selected - Whether the element is selected.
 *
 * @fires beforeinput - Dispatched before the selected state changes.
 * @fires input - Dispatched when the selected state changes.
 * @fires change - Dispatched when the selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-tab-font-size - Font size for tab label.
 * @cssprop --m3e-tab-font-weight - Font weight for tab label.
 * @cssprop --m3e-tab-line-height - Line height for tab label.
 * @cssprop --m3e-tab-tracking - Letter spacing for tab label.
 * @cssprop --m3e-tab-padding-start - Padding on the inline start of the tab.
 * @cssprop --m3e-tab-padding-end - Padding on the inline end of the tab.
 * @cssprop --m3e-tab-focus-ring-shape - Border radius for the focus ring.
 * @cssprop --m3e-tab-selected-color - Text color for selected tab.
 * @cssprop --m3e-tab-selected-container-hover-color - Hover state-layer color for selected tab.
 * @cssprop --m3e-tab-selected-container-focus-color - Focus state-layer color for selected tab.
 * @cssprop --m3e-tab-selected-ripple-color - Ripple color for selected tab.
 * @cssprop --m3e-tab-unselected-color - Text color for unselected tab.
 * @cssprop --m3e-tab-unselected-container-hover-color - Hover state-layer color for unselected tab.
 * @cssprop --m3e-tab-unselected-container-focus-color - Focus state-layer color for unselected tab.
 * @cssprop --m3e-tab-unselected-ripple-color - Ripple color for unselected tab.
 * @cssprop --m3e-tab-disabled-color - Text color for disabled tab.
 * @cssprop --m3e-tab-disabled-opacity - Text opacity for disabled tab.
 * @cssprop --m3e-tab-spacing - Column gap between icon and label.
 * @cssprop --m3e-tab-icon-size - Font size for slotted icon.
 */
let M3eTabElement = M3eTabElement_1 = class M3eTabElement extends Selected(HtmlFor(KeyboardClick(Focusable(Disabled(AttachInternals(Role(LitElement, "tab"), true)))))) {
  constructor() {
    super(...arguments);
    _M3eTabElement_instances.add(this);
    /** @private */
    _M3eTabElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eTabElement_instances, "m", _M3eTabElement_handleClick).call(this, e));
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    control.id = control.id || `m3e-tab-panel-${M3eTabElement_1.__nextId++}`;
    addAriaReferencedId(this, "aria-controls", control.id);
  }
  /** @inheritdoc */
  detach() {
    if (this.control && this.control.id) {
      removeAriaReferencedId(this, "aria-controls", this.control.id);
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eTabElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eTabElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      this.closest("m3e-tabs")?.[selectionManager].notifySelectionChange(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" inward ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div class="touch" aria-hidden="true"></div><div class="wrapper"><slot name="icon" aria-hidden="true"></slot><span class="label"><slot></slot></span></div></div>`;
  }
};
_M3eTabElement_clickHandler = new WeakMap();
_M3eTabElement_instances = new WeakSet();
_M3eTabElement_handleClick = function _M3eTabElement_handleClick(e) {
  if (this.disabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  if (e.defaultPrevented || this.selected) return;
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    this.selected = true;
    this.closest("m3e-tabs")?.[selectionManager].notifySelectionChange(this);
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
/** The styles of the element. */
M3eTabElement.styles = css`:host { display: inline-block; outline: none; user-select: none; height: calc(var(--_tab-height) + ${DesignToken.density.calc(-3)}); font-size: var(--m3e-tab-font-size, ${DesignToken.typescale.standard.title.small.fontSize}); font-weight: var(--m3e-tab-font-weight, ${DesignToken.typescale.standard.title.small.fontWeight}); line-height: var(--m3e-tab-line-height, ${DesignToken.typescale.standard.title.small.lineHeight}); letter-spacing: var(--m3e-tab-tracking, ${DesignToken.typescale.standard.title.small.tracking}); flex-grow: var(--_tab-grow); -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } :host(:not(:disabled)) { cursor: pointer; } .base { contain: layout style; box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%; padding-inline-start: var(--m3e-tab-padding-start, ${DesignToken.measurement.space300}); padding-inline-end: var(--m3e-tab-padding-end, ${DesignToken.measurement.space300}); } .touch { position: absolute; height: 48px; left: 0; right: 0; } .focus-ring { border-radius: var(--m3e-tab-focus-ring-shape, ${DesignToken.shape.corner.large}); } :host([selected]:focus-within) .focus-ring { top: var(--_tab-focus-ring-top-offset, 0); bottom: var(--_tab-focus-ring-bottom-offset, 0); } :host([selected]:not(:disabled)) .base { color: var(--m3e-tab-selected-color, var(--_tab-selected-color, ${DesignToken.color.primary})); --m3e-state-layer-hover-color: var( --m3e-tab-selected-container-hover-color, var(--_tab-selected-container-hover-color, ${DesignToken.color.primary}) ); --m3e-state-layer-focus-color: var( --_tab-selected-container-focus-color, var(--m3e-tab-selected-container-focus-color, ${DesignToken.color.primary}) ); --m3e-ripple-color: var( --_tab-selected-ripple-color, var(--m3e-tab-selected-ripple-color, ${DesignToken.color.primary}) ); } :host(:not([selected]):not(:disabled)) .base { color: var(--m3e-tab-unselected-color, ${DesignToken.color.onSurfaceVariant}); --m3e-state-layer-hover-color: var(--m3e-tab-unselected-container-hover-color, ${DesignToken.color.onSurface}); --m3e-state-layer-focus-color: var(--m3e-tab-unselected-container-focus-color, ${DesignToken.color.onSurface}); --m3e-ripple-color: var(--m3e-tab-unselected-ripple-color, ${DesignToken.color.onSurface}); } :host(:disabled) .base { color: color-mix( in srgb, var(--m3e-tab-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-tab-disabled-opacity, 38%), transparent ); } .wrapper { display: inline-flex; align-items: center; white-space: nowrap; flex-direction: var(--_tab-direction); justify-content: center; column-gap: var(--m3e-tab-spacing, ${DesignToken.measurement.space100}); } ::slotted([slot="icon"]) { width: 1em; font-size: var(--m3e-tab-icon-size, 24px) !important; } @media (forced-colors: active) { :host([selected]:not(:disabled)) .base { color: ButtonText; } :host(:not([selected]):not(:disabled)) .base { color: ButtonText; } :host(:disabled) .base { color: GrayText; } }`;
/** @private */
M3eTabElement.__nextId = 0;
__decorate([query(".focus-ring")], M3eTabElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eTabElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eTabElement.prototype, "_ripple", void 0);
__decorate([query(".label")], M3eTabElement.prototype, "label", void 0);
M3eTabElement = M3eTabElement_1 = __decorate([customElement("m3e-tab")], M3eTabElement);

/**
 * Determines whether a value is a `TabHeaderPosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TabHeaderPosition`.
 */
function isTabHeaderPosition(value) {
  return value === "before" || value === "after";
}

/**
 * A panel presented for a tab.
 *
 * @description
 * The `m3e-tab-panel` component represents the content region associated with a selected tab.
 * It is conditionally rendered based on tab selection and provides a structured surface for
 * displaying contextual information, media, or interactive elements. Panels are linked to their
 * corresponding tabs via the `for` attribute on `m3e-tab`, enabling declarative control and
 * accessible navigation consistent with Material 3 guidance.
 *
 * @example
 * The following example illustrates using the `m3e-tabs`, `m3e-tab`, and `m3e-tab-panel` components to present
 * secondary tabs.
 * ```html
 * <m3e-tabs>
 *  <m3e-tab selected for="videos"><m3e-icon slot="icon" name="videocam"></m3e-icon>Video</m3e-tab>
 *  <m3e-tab for="photos"><m3e-icon slot="icon" name="photo"></m3e-icon>Photos</m3e-tab>
 *  <m3e-tab for="audio"><m3e-icon slot="icon" name="music_note"></m3e-icon>Audio</m3e-tab>
 *  <m3e-tab-panel id="videos">Videos</m3e-tab-panel>
 *  <m3e-tab-panel id="photos">Photos</m3e-tab-panel>
 *  <m3e-tab-panel id="audio">Audio</m3e-tab-panel>
 * </m3e-tabs>
 * ```
 *
 * @tag m3e-tab-panel
 *
 * @slot - Renders the content of the panel.
 */
let M3eTabPanelElement = class M3eTabPanelElement extends Role(LitElement, "tabpanel") {
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.slot = "panel";
  }
  /** @inheritdoc */
  render() {
    return html`<slot></slot>`;
  }
};
/** The styles of the element. */
M3eTabPanelElement.styles = css`:host { contain: layout style paint; display: block; overflow-y: auto; scrollbar-width: ${DesignToken.scrollbar.width}; scrollbar-color: ${DesignToken.scrollbar.color}; } :host([hidden]) { display: none; }`;
M3eTabPanelElement = __decorate([customElement("m3e-tab-panel")], M3eTabPanelElement);

/**
 * Determines whether a value is a `TabVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TabVariant`.
 */
function isTabVariant(value) {
  return value === "primary" || value === "secondary";
}

var _M3eTabsElement_instances, _M3eTabsElement_directionalitySubscription, _M3eTabsElement_swipeInputFilter, _M3eTabsElement_applyVariant, _M3eTabsElement_applyHeaderPosition, _M3eTabsElement_renderHeader, _M3eTabsElement_handleSlotChange, _M3eTabsElement_handleKeyDown, _M3eTabsElement_handleChange, _M3eTabsElement_handleSelectedChange, _M3eTabsElement_handleActiveItemChange, _M3eTabsElement_handleTabsPaginationChange, _M3eTabsElement_handleSwipeGesture, _M3eTabsElement_endSwipeGesture, _M3eTabsElement_scrollTabIntoView, _M3eTabsElement_updateInkBar, _a;
const MIN_PRIMARY_TAB_WIDTH = 24;
/**
 * Organizes content into separate views where only one view can be visible at a time.
 *
 * @description
 * The `m3e-tabs` component provides a structured navigation surface for organizing content into distinct views,
 * where only one view is visible at a time. It supports scrollable tab headers with optional pagination,
 * accessible labeling for navigation controls, and configurable header positioning to suit various layout
 * contexts. Two visual variants are available: `primary`, which emphasizes active indicators and shape styling
 * for prominent navigation, and `secondary`, which offers a more subtle presentation with reduced indicator
 * thickness. Stretch behavior allows tabs to expand and align rhythmically within their container, consistent
 * with Material 3 guidance.
 *
 * @example
 * The following example illustrates using the `m3e-tabs`, `m3e-tab`, and `m3e-tab-panel` components to present
 * secondary tabs.
 * ```html
 * <m3e-tabs>
 *  <m3e-tab selected for="videos"><m3e-icon slot="icon" name="videocam"></m3e-icon>Video</m3e-tab>
 *  <m3e-tab for="photos"><m3e-icon slot="icon" name="photo"></m3e-icon>Photos</m3e-tab>
 *  <m3e-tab for="audio"><m3e-icon slot="icon" name="music_note"></m3e-icon>Audio</m3e-tab>
 *  <m3e-tab-panel id="videos">Videos</m3e-tab-panel>
 *  <m3e-tab-panel id="photos">Photos</m3e-tab-panel>
 *  <m3e-tab-panel id="audio">Audio</m3e-tab-panel>
 * </m3e-tabs>
 * ```
 *
 * @tag m3e-tabs
 *
 * @slot - Renders the tabs.
 * @slot panel - Renders the panels of the tabs.
 * @slot next-icon - Renders the icon to present for the next button used to paginate.
 * @slot prev-icon - Renders the icon to present for the previous button used to paginate.
 *
 * @attr disable-pagination - Whether scroll buttons are disabled.
 * @attr disable-swipe - Whether to disable swipe gestures for switching tabs.
 * @attr header-position - The position of the tab headers.
 * @attr next-page-label - The accessible label given to the button used to move to the previous page.
 * @attr previous-page-label - The accessible label given to the button used to move to the next page.
 * @attr stretch - Whether tabs are stretched to fill the header.
 * @attr variant - The appearance variant of the tabs.
 *
 * @fires beforeinput - Dispatched before the selected state of a tab changes.
 * @fires input - Dispatched when the selected state of a tab changes.
 * @fires change - Dispatched when the selected tab changes.
 *
 * @cssprop --m3e-tabs-paginator-button-icon-size - Overrides the icon size for paginator buttons.
 * @cssprop --m3e-tabs-active-indicator-color - Color of the active tab indicator.
 * @cssprop --m3e-tabs-primary-before-active-indicator-shape - Border radius for active indicator when header is before and variant is primary.
 * @cssprop --m3e-tabs-primary-after-active-indicator-shape - Border radius for active indicator when header is after and variant is primary.
 * @cssprop --m3e-tabs-primary-active-indicator-inset - Inset for primary variant's active indicator.
 * @cssprop --m3e-tabs-primary-active-indicator-thickness - Thickness for primary variant's active indicator.
 * @cssprop --m3e-tabs-secondary-active-indicator-thickness - Thickness for secondary variant's active indicator.
 */
let M3eTabsElement = class M3eTabsElement extends SupportsDirectionality(AttachInternals(LitElement)) {
  constructor() {
    super();
    _M3eTabsElement_instances.add(this);
    /** @private */
    _M3eTabsElement_directionalitySubscription.set(this, void 0);
    /** @private */
    this._selectedIndex = null;
    /** @private */
    _M3eTabsElement_swipeInputFilter.set(this, input => !(input.target instanceof HTMLElement && M3eInteractivityChecker.isFocusable(input.target)));
    /** @internal */
    this[_a] = new SelectionManager().onSelectedItemsChange(() => __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleSelectedChange).call(this)).onActiveItemChange(() => __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleActiveItemChange).call(this)).withHomeAndEnd().withWrap().withDirectionality(M3eDirectionality.current);
    /**
     * The position of the tab headers.
     * @default "before"
     */
    this.headerPosition = "before";
    /**
     * The appearance variant of the tabs.
     * @default "secondary"
     */
    this.variant = "secondary";
    /**
     * Whether tabs are stretched to fill the header.
     * @default false
     */
    this.stretch = false;
    /**
     * The accessible label given to the button used to move to the previous page.
     * @default "Previous page"
     */
    this.previousPageLabel = "Previous page";
    /**
     * The accessible label given to the button used to move to the next page.
     * @default "Next page"
     */
    this.nextPageLabel = "Next page";
    /**
     * Whether to disable swipe gestures for switching tabs.
     * @default false
     */
    this.disableSwipe = false;
    new ResizeController(this, {
      skipInitial: true,
      callback: () => {
        addCustomState(this, "--no-animate");
        const activeTab = this[selectionManager].activeItem ?? this.selectedTab;
        if (activeTab) {
          __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_scrollTabIntoView).call(this, activeTab, true);
        } else {
          __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_updateInkBar).call(this);
        }
      }
    });
  }
  /**
   * Whether scroll buttons are disabled.
   * @default false
   */
  get disablePagination() {
    switch (this.getAttribute("disable-pagination")) {
      case "auto":
        return "auto";
      case "":
      case "true":
        return true;
      default:
        return false;
    }
  }
  set disablePagination(value) {
    switch (value) {
      case false:
        this.removeAttribute("disable-pagination");
        break;
      case true:
        this.toggleAttribute("disable-pagination", true);
        break;
      case "auto":
        this.setAttribute("disable-pagination", "auto");
        break;
    }
  }
  /** The tabs. */
  get tabs() {
    return this[selectionManager]?.items ?? [];
  }
  /** The selected tab. */
  get selectedTab() {
    return this._selectedIndex !== null ? this.tabs[this._selectedIndex] ?? null : null;
  }
  /** The zero-based index of the selected tab. */
  get selectedIndex() {
    return this._selectedIndex ?? -1;
  }
  set selectedIndex(value) {
    if (value >= 0 && value < this.tabs.length) {
      this.tabs[value].selected = true;
    } else {
      const selectedTab = this.selectedTab;
      if (selectedTab) {
        selectedTab.selected = false;
      }
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_applyHeaderPosition).call(this);
    addCustomState(this, "--no-animate");
    __classPrivateFieldSet(this, _M3eTabsElement_directionalitySubscription, M3eDirectionality.observe(() => {
      this.requestUpdate();
      this[selectionManager].directionality = M3eDirectionality.current;
    }), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eTabsElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_applyVariant).call(this);
    }
    if (_changedProperties.has("headerPosition")) {
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_applyHeaderPosition).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("variant") && this._selectedIndex !== null) {
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_updateInkBar).call(this);
    }
    const swipeGesture = this.shadowRoot?.querySelector("m3e-swipe-gesture");
    if (swipeGesture) {
      swipeGesture.inputFilter = __classPrivateFieldGet(this, _M3eTabsElement_swipeInputFilter, "f");
      swipeGesture.pointerTypes = ["touch"];
      swipeGesture.directions = ["left", "right"];
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if ((_changedProperties.has("variant") || _changedProperties.has("stretch")) && this._selectedIndex !== null) {
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_updateInkBar).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    let panelIndex;
    if (this.selectedTab?.control) {
      panelIndex = [...this.querySelectorAll("[slot='panel']")].indexOf(this.selectedTab.control);
      if (panelIndex === -1) {
        panelIndex = undefined;
      }
    }
    return html`${this.headerPosition === "before" ? __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_renderHeader).call(this) : nothing}<m3e-slide id="tabs" class="tabs" selected-index="${ifDefined(panelIndex)}"><slot name="panel"></slot></m3e-slide><m3e-swipe-gesture for="tabs" ?disabled="${this.disableSwipe}" @gesture="${__classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleSwipeGesture)}"></m3e-swipe-gesture>${this.headerPosition === "after" ? __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_renderHeader).call(this) : nothing}`;
  }
};
_M3eTabsElement_directionalitySubscription = new WeakMap();
_M3eTabsElement_swipeInputFilter = new WeakMap();
_M3eTabsElement_instances = new WeakSet();
_a = selectionManager;
_M3eTabsElement_applyVariant = function _M3eTabsElement_applyVariant() {
  if (!isTabVariant(this.variant)) {
    this.variant = "secondary";
  }
  setCustomEnumState(this, this.variant, "primary", "secondary");
};
_M3eTabsElement_applyHeaderPosition = function _M3eTabsElement_applyHeaderPosition() {
  if (!isTabHeaderPosition(this.headerPosition)) {
    this.headerPosition = "before";
  }
  setCustomState(this, "--header-position-before", this.headerPosition === "before");
  setCustomState(this, "--header-position-after", this.headerPosition === "after");
};
_M3eTabsElement_renderHeader = function _M3eTabsElement_renderHeader() {
  return html`<m3e-slide-group class="tablist" threshold="8" previous-page-label="${this.previousPageLabel}" next-page-label="${this.nextPageLabel}" ?disabled="${this.disablePagination === "auto" ? matchMedia("(hover: none) and (pointer: coarse)").matches : this.disablePagination}" @pagination-changed="${__classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleTabsPaginationChange)}"><slot name="prev-icon" slot="prev-icon">${M3eDirectionality.current === "ltr" ? html`<svg class="prev icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>` : html`<svg class="next icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>`}</slot><slot name="next-icon" slot="next-icon">${M3eDirectionality.current === "ltr" ? html`<svg class="next icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>` : html`<svg class="prev icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>`}</slot><div class="header" role="tablist"><div class="tabs"><slot @slotchange="${__classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleSlotChange)}" @keydown="${__classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleKeyDown)}" @change="${__classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_handleChange)}"></slot></div><div class="ink-bar" aria-hidden="true"><div class="active-indicator"></div></div></div></m3e-slide-group>`;
};
_M3eTabsElement_handleSlotChange = function _M3eTabsElement_handleSlotChange() {
  this[selectionManager].setItems([...this.querySelectorAll("m3e-tab")]);
};
_M3eTabsElement_handleKeyDown = function _M3eTabsElement_handleKeyDown(e) {
  this[selectionManager].onKeyDown(e);
};
_M3eTabsElement_handleChange = function _M3eTabsElement_handleChange(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eTabsElement_handleSelectedChange = function _M3eTabsElement_handleSelectedChange() {
  const selected = this[selectionManager].selectedItems[0];
  let selectedIndex = selected ? this.tabs.indexOf(selected) : null;
  if (selectedIndex === -1) {
    selectedIndex = null;
  }
  if (this._selectedIndex !== selectedIndex) {
    const previousIndex = this._selectedIndex ?? -1;
    this._selectedIndex = selectedIndex;
    if (selected) {
      const instant = hasCustomState(this, "--no-animate");
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_scrollTabIntoView).call(this, selected, instant, previousIndex);
    } else {
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_updateInkBar).call(this);
    }
  }
};
_M3eTabsElement_handleActiveItemChange = function _M3eTabsElement_handleActiveItemChange() {
  if (this[selectionManager].activeItem) {
    __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_scrollTabIntoView).call(this, this[selectionManager].activeItem, hasCustomState(this, "--no-animate"));
  }
};
_M3eTabsElement_handleTabsPaginationChange = function _M3eTabsElement_handleTabsPaginationChange() {
  if (this.disablePagination) return;
  const activeTab = this[selectionManager].activeItem ?? this.selectedTab;
  if (activeTab) {
    __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_scrollTabIntoView).call(this, activeTab, true);
  }
};
_M3eTabsElement_handleSwipeGesture = function _M3eTabsElement_handleSwipeGesture(e) {
  switch (e.detail.phase) {
    case "update":
      {
        let dx = e.detail.translationX;
        let dir = e.detail.direction;
        if (M3eDirectionality.current === "rtl") {
          dir = dir === "left" ? "right" : "left";
        }
        if (this.selectedIndex === 0 && dir === "right" || this.selectedIndex === this.tabs.length - 1 && dir === "left") {
          dx = 0;
        }
        this.shadowRoot?.querySelector("m3e-slide")?.classList.add("sliding");
        this.selectedTab?.control?.style.setProperty("--_tabs-slide-offset-x", `${dx}px`);
        const nextTab = this.tabs[dir === "right" ? this.selectedIndex - 1 : this.selectedIndex + 1];
        nextTab?.control?.style.setProperty("--_tabs-slide-offset-x", `${dx}px`);
        nextTab?.control?.style.setProperty("--_tabs-slide-visibility", "visible");
        const prevTab = this.tabs[dir === "right" ? this.selectedIndex + 1 : this.selectedIndex - 1];
        prevTab?.control?.style.removeProperty("--_tabs-slide-offset-x");
        prevTab?.control?.style.removeProperty("--_tabs-slide-visibility");
      }
      break;
    case "end":
      {
        __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_endSwipeGesture).call(this);
        let dir = e.detail.direction;
        if (M3eDirectionality.current === "rtl") {
          dir = dir === "left" ? "right" : "left";
        }
        if (dir === "right") {
          // go to the previous tab only if its not disabled.
          if (this.selectedIndex > 0 && this.tabs.length > 1 && !this.tabs[this.selectedIndex - 1].disabled) {
            this.selectedIndex--;
          }
        } else if (dir === "left") {
          // go to the next tab only if its not disabled.
          if (this.selectedIndex < this.tabs.length - 1 && !this.tabs[this.selectedIndex + 1].disabled) {
            this.selectedIndex++;
          }
        }
      }
      break;
    case "cancel":
      __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_endSwipeGesture).call(this);
      break;
  }
};
_M3eTabsElement_endSwipeGesture = function _M3eTabsElement_endSwipeGesture() {
  const slide = this.shadowRoot?.querySelector("m3e-slide");
  if (!slide || !slide.classList.contains("sliding")) {
    return;
  }
  slide.classList.add("snap");
  if (!prefersReducedMotion()) {
    slide.addEventListener("transitionend", () => slide.classList.remove("snap"), {
      once: true
    });
  }
  slide.classList.remove("sliding");
  this.tabs.forEach(x => {
    x.control?.style.removeProperty("--_tabs-slide-offset-x");
    x.control?.style.removeProperty("--_tabs-slide-visibility");
  });
};
_M3eTabsElement_scrollTabIntoView = /** @private */
async function _M3eTabsElement_scrollTabIntoView(tab, instant, previousIndex = -1) {
  await this.updateComplete;
  for (const tab of this.tabs) {
    await tab.updateComplete;
  }
  await this._tablist?.updateComplete;
  const scrollMargin = 48;
  const scrollContainer = this._tablist?.scrollContainer;
  if (!scrollContainer) return;
  scrollContainer?.scrollTo({
    behavior: instant ? "instant" : "smooth",
    top: 0,
    left: Math.min(tab.offsetLeft - scrollContainer.offsetLeft - scrollMargin, Math.max(tab.offsetLeft + tab.offsetWidth - scrollContainer.offsetWidth - scrollContainer.offsetLeft + scrollMargin, scrollContainer.scrollLeft))
  });
  __classPrivateFieldGet(this, _M3eTabsElement_instances, "m", _M3eTabsElement_updateInkBar).call(this, previousIndex);
};
_M3eTabsElement_updateInkBar = function _M3eTabsElement_updateInkBar(previousIndex = -1) {
  if (!this._tablist) return;
  const selected = this[selectionManager].selectedItems[0];
  let left = 0;
  let width = 0;
  if (selected && this._selectedIndex !== null) {
    for (let i = 0; i < this._selectedIndex; i++) {
      left += this.tabs[i].clientWidth;
    }
    width = selected.clientWidth;
    if (this.variant === "primary" && selected.label) {
      left += selected.label.offsetLeft;
      width = selected.label.clientWidth;
      if (width < MIN_PRIMARY_TAB_WIDTH) {
        left -= (MIN_PRIMARY_TAB_WIDTH - width) / 2;
        width = MIN_PRIMARY_TAB_WIDTH;
      }
    }
  }
  let indicator;
  if (previousIndex >= 0 && previousIndex !== this._selectedIndex && this._selectedIndex !== null && this.variant === "primary" && !hasCustomState(this, "--no-animate") && !prefersReducedMotion()) {
    indicator = this.shadowRoot?.querySelector(".active-indicator");
  }
  if (indicator) {
    let dir = previousIndex < this._selectedIndex ? "end" : "start";
    if (M3eDirectionality.current === "rtl") {
      dir = dir === "start" ? "end" : "start";
    }
    indicator.classList.remove("start");
    indicator.classList.remove("end");
    indicator.classList.add(dir);
    indicator.addEventListener("transitionend", () => indicator?.classList.remove(dir), {
      once: true
    });
  }
  this._tablist.style.setProperty("--_tabs-active-tab-position", `${left}px`);
  this._tablist.style.setProperty("--_tabs-active-tab-size", `${width}px`);
  if (width > 0 && hasCustomState(this, "--no-animate")) {
    setTimeout(() => deleteCustomState(this, "--no-animate"));
  }
};
/** The styles of the element. */
M3eTabsElement.styles = css`:host { display: flex; flex-direction: column; position: relative; } :host([hidden]) { display: none; } .tablist { contain: layout style; position: relative; box-sizing: border-box; flex: none; } ::slotted(prev-icon), ::slotted(next-icon), .icon { width: 1em; font-size: var(--m3e-tabs-paginator-button-icon-size, var(--m3e-icon-button-icon-size, 24px)) !important; } .header { display: flex; flex-direction: column; } .tabs { display: flex; flex-wrap: nowrap; align-items: center; } .ink-bar { contain: layout style paint; box-sizing: border-box; height: var(--_tabs-active-indicator-thickness); } .active-indicator { position: absolute; height: var(--_tabs-active-indicator-thickness); background-color: var(--m3e-tabs-active-indicator-color, ${DesignToken.color.primary}); } :host(:not(:is(:state(--rtl), :--rtl))) .active-indicator { left: calc(var(--_tabs-active-tab-position) + var(--_tabs-activate-indicator-inset, 0px)); right: calc( 100% - ( var(--_tabs-active-tab-position) + var(--_tabs-active-tab-size) - ((var(--_tabs-activate-indicator-inset, 0px) * 2)) ) ); } :host(:is(:state(--rtl), :--rtl)) .active-indicator { right: calc(var(--_tabs-active-tab-position) + var(--_tabs-activate-indicator-inset, 0px)); left: calc( 100% - ( var(--_tabs-active-tab-position) + var(--_tabs-active-tab-size) - ((var(--_tabs-activate-indicator-inset, 0px) * 2)) ) ); } :host(:is(:state(--primary), :--primary)) .active-indicator.start { transition: ${unsafeCSS(`left var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.emphasizedDecelerate},
        right var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--primary), :--primary)) .active-indicator.end { transition: ${unsafeCSS(`left var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard},
        right var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.emphasizedDecelerate}`)}; } :host(:is(:state(--primary), :--primary)) .active-indicator:not(.start):not(.end), :host(:is(:state(--secondary), :--secondary)) .active-indicator { transition: ${unsafeCSS(`left var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard},
        right var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--header-position-after), :--header-position-after)) .header { flex-direction: column-reverse; } :host(:is(:state(--header-position-before), :--header-position-before)) .ink-bar { margin-top: calc(0px - var(--_tabs-active-indicator-thickness)); } :host(:is(:state(--header-position-before), :--header-position-before)) .tablist { --m3e-slide-group-divider-bottom: var(--m3e-divider-thickness, 1px) solid var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); } :host(:is(:state(--header-position-after), :--header-position-after)) .ink-bar { margin-bottom: calc(0px - var(--_tabs-active-indicator-thickness)); } :host(:is(:state(--header-position-after), :--header-position-after)) .tablist { --m3e-slide-group-divider-top: var(--m3e-divider-thickness, 1px) solid var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); } :host(:is(:state(--header-position-before), :--header-position-before):is(:state(--primary), :--primary)) .active-indicator { border-radius: var(--m3e-tabs-primary-before-active-indicator-shape, ${DesignToken.shape.corner.extraSmallTop}); } :host(:is(:state(--header-position-after), :--header-position-after):is(:state(--primary), :--primary)) .active-indicator { border-radius: var(--m3e-tabs-primary-after-active-indicator-shape, ${DesignToken.shape.corner.extraSmallBottom}); } .tabs { flex: 1 1 auto; } :host(:is(:state(--primary), :--primary)) .tablist { --_tabs-activate-indicator-inset: var(--m3e-tabs-primary-active-indicator-inset, 2px); --_tabs-active-indicator-thickness: var(--m3e-tabs-primary-active-indicator-thickness, 3px); --_tab-height: 64px; } :host(:is(:state(--header-position-before), :--header-position-before)) .tablist { --_tab-focus-ring-bottom-offset: calc(var(--_tabs-active-indicator-thickness) + 1px); } :host(:is(:state(--header-position-after), :--header-position-after)) .tablist { --_tab-focus-ring-top-offset: calc(var(--_tabs-active-indicator-thickness) + 2px); } :host(:is(:state(--header-position-before), :--header-position-before):is(:state(--primary), :--primary)) .tablist { --_tab-direction: column; } :host(:is(:state(--header-position-after), :--header-position-after):is(:state(--primary), :--primary)) .tablist { --_tab-direction: column-reverse; } :host(:is(:state(--secondary), :--secondary)) .tablist { --_tabs-active-indicator-thickness: var(--m3e-tabs-secondary-active-indicator-thickness, 2px); --_tab-height: 48px; --_tab-selected-color: ${DesignToken.color.onSurface}; --_tab-selected-container-hover-color: ${DesignToken.color.onSurface}; --_tab-selected-container-focus-color: ${DesignToken.color.onSurface}; --_tab-selected-ripple-color: ${DesignToken.color.onSurface}; } :host([stretch]) .header { width: 100%; --_tab-grow: 1; } .tabs.sliding ::slotted([slot="panel"]) { transform: translateX(var(--_tabs-slide-offset-x)); visibility: var(--_tabs-slide-visibility, "hidden"); } .tabs.snap ::slotted([slot="panel"]) { transition: ${unsafeCSS(`inset-inline-start var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard},
        transform var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard},
        visibility var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard} allow-discrete`)}; } .tabs:not(.sliding) ::slotted([slot="panel"]) { transform: translateX(0); } :host(:is(:state(--no-animate), :--no-animate)) .active-indicator { transition: none; } @media (prefers-reduced-motion) { :host(:is(:state(--secondary), :--secondary)) .active-indicator, :host(:is(:state(--primary), :--primary)) .active-indicator { transition: none !important; } .tabs.snap ::slotted([slot="panel"]) { transition: none; } } @media (forced-colors: active) { .active-indicator { background-color: ButtonText; --m3e-divider-color: GrayText; } }`;
__decorate([query(".tablist")], M3eTabsElement.prototype, "_tablist", void 0);
__decorate([state()], M3eTabsElement.prototype, "_selectedIndex", void 0);
__decorate([property({
  attribute: false
})], M3eTabsElement.prototype, "disablePagination", null);
__decorate([property({
  attribute: "header-position",
  reflect: true,
  useDefault: true
})], M3eTabsElement.prototype, "headerPosition", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eTabsElement.prototype, "variant", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTabsElement.prototype, "stretch", void 0);
__decorate([property({
  attribute: "previous-page-label"
})], M3eTabsElement.prototype, "previousPageLabel", void 0);
__decorate([property({
  attribute: "next-page-label"
})], M3eTabsElement.prototype, "nextPageLabel", void 0);
__decorate([property({
  attribute: "disable-swipe",
  type: Boolean
})], M3eTabsElement.prototype, "disableSwipe", void 0);
M3eTabsElement = __decorate([customElement("m3e-tabs")], M3eTabsElement);

export { M3eTabElement, M3eTabPanelElement, M3eTabsElement, isTabHeaderPosition, isTabVariant };
//# sourceMappingURL=tabs.js.map
