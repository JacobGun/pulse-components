/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { SuppressInitialAnimation, Disabled, AttachInternals, Role, setCustomState, hasCustomState, DesignToken, customElement, PressedController, FocusController, forcedColorsActive, deleteCustomState } from './TextOverflowElement.js';
import { query, state, property } from 'lit/decorators.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { scrollIntoViewIfNeeded } from './scrollIntoViewIfNeeded.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { selectionManager, SelectionManager } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';
import { Selected } from './Selected.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';

var _M3eNavMenuItemElement_instances, _M3eNavMenuItemElement_items, _M3eNavMenuItemElement_menu, _M3eNavMenuItemElement_path, _M3eNavMenuItemElement_link, _M3eNavMenuItemElement_renderIcon, _M3eNavMenuItemElement_handleIconSlotChange, _M3eNavMenuItemElement_handleSlotChange, _M3eNavMenuItemElement_handleItemSlotChange, _M3eNavMenuItemElement_handleClick, _M3eNavMenuItemElement_handleCollapsibleEvent;
var M3eNavMenuItemElement_1;
/**
 * An expandable item, selectable item within a navigation menu.
 *
 * @description
 * The `m3e-nav-menu-item` component represents an expandable, selectable item within a navigation menu.
 * It supports nested child items, selection and disabled states, and emits events for open/close transitions.
 * The component is highly customizable via slots and CSS custom properties, and is designed for accessible,
 * keyboard-navigable menu structures.
 *
 * @example
 * The following example illustrates a navigation menu with a top-level group of menu items.
 * ```html
 * <m3e-nav-menu>
 *   <m3e-nav-menu-item-group>
 *     <m3e-heading slot="label" variant="label" size="large">Mail</m3e-heading>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="mail"></m3e-icon>
 *       <span slot="label">Inbox</span>
 *       <span slot="badge">24</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="send"></m3e-icon>
 *       <span slot="label">Outbox</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="favorite"></m3e-icon>
 *       <span slot="label">Favorites</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="delete"></m3e-icon>
 *       <span slot="label">Trash</span>
 *     </m3e-nav-menu-item>
 *   </m3e-nav-menu-item-group>
 * </m3e-nav-menu>
 * ```
 *
 * @example
 * The next example illustrates a multilevel navigation menu.
 * ```html
 * <m3e-nav-menu>
 *   <m3e-nav-menu-item open>
 *     <m3e-icon slot="icon" name="rocket_launch"></m3e-icon>
 *     <span slot="label">Getting Started</span>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="widgets"></m3e-icon>
 *       <span slot="label">Overview</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="package_2"></m3e-icon>
 *       <span slot="label">Installation</span>
 *     </m3e-nav-menu-item>
 *   </m3e-nav-menu-item>
 *   <m3e-nav-menu-item>
 *     <span slot="label">Actions</span>
 *     <m3e-nav-menu-item><span slot="label">Button</span></m3e-nav-menu-item>
 *     <m3e-nav-menu-item><span slot="label">Icon</span></m3e-nav-menu-item>
 *     <m3e-nav-menu-item><span slot="label">Icon Button</span></m3e-nav-menu-item>
 *   </m3e-nav-menu-item>
 * </m3e-nav-menu>
 * ```
 *
 * @tag m3e-nav-menu-item
 *
 * @slot - Renders the nested child items.
 * @slot label - Renders the label of the item.
 * @slot icon - Renders the icon of the item.
 * @slot badge - Renders the badge of the item.
 * @slot selected-icon - Renders the icon of the item when selected.
 * @slot toggle-icon - Renders the toggle icon.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr open - Whether the item is expanded.
 * @attr selected - Whether the item is selected.
 *
 * @fires opening - Dispatched when the item begins to open.
 * @fires opened - Dispatched when the item has opened.
 * @fires closing - Dispatched when the item begins to close.
 * @fires closed - Dispatched when the item has closed.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-nav-menu-item-font-size - Font size for the item label.
 * @cssprop --m3e-nav-menu-item-font-weight - Font weight for the item label.
 * @cssprop --m3e-nav-menu-item-line-height - Line height for the item label.
 * @cssprop --m3e-nav-menu-item-tracking - Letter spacing for the item label.
 * @cssprop --m3e-nav-menu-item-padding - Inline padding for the item.
 * @cssprop --m3e-nav-menu-item-height - Height of the item.
 * @cssprop --m3e-nav-menu-item-spacing - Spacing between icon and label.
 * @cssprop --m3e-nav-menu-item-shape - Border radius of the item and focus ring.
 * @cssprop --m3e-nav-menu-item-icon-size - Size of the icon.
 * @cssprop --m3e-nav-menu-item-inset - Indentation for nested items.
 * @cssprop --m3e-nav-menu-item-label-color - Text color for the item label.
 * @cssprop --m3e-nav-menu-item-selected-label-color - Text color for selected item label.
 * @cssprop --m3e-nav-menu-item-selected-container-color - Background color for selected item.
 * @cssprop --m3e-nav-menu-item-selected-container-focus-color - Focus color for selected item container.
 * @cssprop --m3e-nav-menu-item-selected-container-hover-color - Hover color for selected item container.
 * @cssprop --m3e-nav-menu-item-selected-container-pressed-color - Pressed color for selected item.
 * @cssprop --m3e-nav-menu-item-unselected-container-focus-color - Focus color for unselected item container.
 * @cssprop --m3e-nav-menu-item-unselected-container-hover-color - Hover color for unselected item container.
 * @cssprop --m3e-nav-menu-item-unselected-container-pressed-color - Pressed color for unselected item.
 * @cssprop --m3e-nav-menu-item-open-container-color - Background color for open item with children.
 * @cssprop --m3e-nav-menu-item-open-container-focus-color - Focus color for open item container.
 * @cssprop --m3e-nav-menu-item-open-container-hover-color - Hover color for open item container.
 * @cssprop --m3e-nav-menu-item-open-container-pressed-color - Pressed color for open item.
 * @cssprop --m3e-nav-menu-item-disabled-color - Text color for disabled item.
 * @cssprop --m3e-nav-menu-item-disabled-color-opacity - Opacity for disabled item text color.
 * @cssprop --m3e-nav-menu-item-badge-font-size - Font size for badge slot.
 * @cssprop --m3e-nav-menu-item-badge-font-weight - Font weight for badge slot.
 * @cssprop --m3e-nav-menu-item-badge-line-height - Line height for badge slot.
 * @cssprop --m3e-nav-menu-item-badge-tracking - Letter spacing for badge slot.
 * @cssprop --m3e-nav-menu-divider-margin - Margin for divider elements.
 * @cssprop --m3e-nav-menu-item-vertical-inset - Vertical margin for first/last child items.
 */
let M3eNavMenuItemElement = M3eNavMenuItemElement_1 = class M3eNavMenuItemElement extends SuppressInitialAnimation(Selected(Disabled(AttachInternals(Role(LitElement, "treeitem"), true)))) {
  constructor() {
    super(...arguments);
    _M3eNavMenuItemElement_instances.add(this);
    /** @private */
    this._hasChildItems = false;
    /** @private */
    _M3eNavMenuItemElement_items.set(this, []);
    /** @private */
    _M3eNavMenuItemElement_menu.set(this, null);
    /** @private */
    _M3eNavMenuItemElement_path.set(this, new Array());
    /** @private */
    _M3eNavMenuItemElement_link.set(this, null);
    /**
     * Whether the item is expanded.
     * @default false
     */
    this.open = false;
  }
  /** A reference to the nested `HTMLAnchorElement`. */
  get link() {
    return __classPrivateFieldGet(this, _M3eNavMenuItemElement_link, "f");
  }
  /** A reference to the element used to present the label of the item. */
  get label() {
    return this._base ?? null;
  }
  /** Whether the item is visible. */
  get visible() {
    return !__classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").some(x => !x.open);
  }
  /** The full path of the item, starting with the top-most ancestor, including this item. */
  get path() {
    return [...__classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f"), this];
  }
  /** Whether the item has child items. */
  get hasChildItems() {
    return this._hasChildItems;
  }
  /** The parenting item. */
  get parentItem() {
    return __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f")[__classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").length - 1] ?? null;
  }
  /** The items that immediately descend from this item. */
  get childItems() {
    return __classPrivateFieldGet(this, _M3eNavMenuItemElement_items, "f");
  }
  /** The one-based level of the item. */
  get level() {
    return __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").length + 1;
  }
  /**
   * Expands this item, and optionally, all descendants.
   * @param {boolean} [descendants=false] Whether to expand all descendants.
   */
  expand(descendants = false) {
    if (this.hasChildItems) {
      this.open = true;
      if (descendants) {
        this.childItems.forEach(x => x.expand(true));
      }
    }
  }
  /**
   * Collapses this item, and optionally, all descendants.
   * @param {boolean} [descendants=false] Whether to expand all descendants.
   */
  collapse(descendants = false) {
    if (this.hasChildItems) {
      this.open = false;
      if (descendants) {
        this.childItems.forEach(x => x.collapse(true));
      }
    }
  }
  /** Toggles the expanded state of the item. */
  toggle() {
    if (this.hasChildItems) {
      this.open = !this.open;
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").length = 0;
    for (let item = this.parentElement?.closest("m3e-nav-menu-item"); item; item = item.parentElement?.closest("m3e-nav-menu-item")) {
      __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").push(item);
    }
    __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").reverse();
    this.style.setProperty("--_nav-menu-item-level", `${this.level}`);
    __classPrivateFieldSet(this, _M3eNavMenuItemElement_menu, this.closest("m3e-nav-menu"), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").length = 0;
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      // Remove aria-selected and just use aria-current.
      this.ariaSelected = null;
      this.ariaCurrent = this.hasChildItems ? null : `${this.selected}`;
      for (const icon of this.querySelectorAll(":scope > m3e-icon[slot]")) {
        icon.toggleAttribute("filled", this.selected);
      }
      __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").forEach(x => x.selected = this.selected);
      if (this.selected && !this.hasChildItems) {
        this.closest("m3e-nav-menu")?.[selectionManager].notifySelectionChange(this);
      }
    }
    if (changedProperties.has("open") || changedProperties.has("_hasChildItems")) {
      this.ariaExpanded = this._hasChildItems ? `${this.open}` : null;
    }
    if (changedProperties.has("_hasChildItems") && this.disabled || changedProperties.has("disabled")) {
      __classPrivateFieldGet(this, _M3eNavMenuItemElement_items, "f").forEach(x => x.disabled = this.disabled);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const base = this._base;
    if (base) {
      [this.focusRing, this.indicator].forEach(x => x?.attach(base));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @click="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleClick)}"><m3e-focus-ring class="focus-ring" inward ?disabled="${this.disabled}"></m3e-focus-ring><m3e-selection-indicator bounce class="indicator" ?selected="${this.selected}" ?disabled="${this.disabled}"></m3e-selection-indicator><div class="icon" aria-hidden="true">${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_renderIcon).call(this)}</div><div class="label"><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleSlotChange)}"></slot></div><slot name="badge"></slot><div aria-hidden="true" class="toggle"><slot name="toggle-icon"><svg class="toggle-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360 280-560h400L480-360Z"/></svg></slot></div></div><m3e-collapsible class="group" role="group" aria-hidden="${ifDefined(this._hasChildItems ? undefined : "true")}" ?open="${this._hasChildItems && this.open}" @opening="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleCollapsibleEvent)}" @opened="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleCollapsibleEvent)}" @closing="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleCollapsibleEvent)}" @closed="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleCollapsibleEvent)}"><slot @slotchange="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleItemSlotChange)}"></slot></m3e-collapsible>`;
  }
};
_M3eNavMenuItemElement_items = new WeakMap();
_M3eNavMenuItemElement_menu = new WeakMap();
_M3eNavMenuItemElement_path = new WeakMap();
_M3eNavMenuItemElement_link = new WeakMap();
_M3eNavMenuItemElement_instances = new WeakSet();
_M3eNavMenuItemElement_renderIcon = function _M3eNavMenuItemElement_renderIcon() {
  const icon = html`<slot name="icon" @slotchange="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleIconSlotChange)}"></slot>`;
  return this.selected && !this.hasChildItems ? html`<slot name="selected-icon" @slotchange="${__classPrivateFieldGet(this, _M3eNavMenuItemElement_instances, "m", _M3eNavMenuItemElement_handleIconSlotChange)}">${icon}</slot>` : icon;
};
_M3eNavMenuItemElement_handleIconSlotChange = function _M3eNavMenuItemElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eNavMenuItemElement_handleSlotChange = function _M3eNavMenuItemElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eNavMenuItemElement_link, e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof HTMLAnchorElement) ?? null, "f");
  __classPrivateFieldGet(this, _M3eNavMenuItemElement_link, "f")?.setAttribute("tabindex", "-1");
};
_M3eNavMenuItemElement_handleItemSlotChange = function _M3eNavMenuItemElement_handleItemSlotChange(e) {
  __classPrivateFieldSet(this, _M3eNavMenuItemElement_items, e.target.assignedElements({
    flatten: true
  }).filter(x => x instanceof M3eNavMenuItemElement_1), "f");
  const hadChildItems = this._hasChildItems;
  this._hasChildItems = __classPrivateFieldGet(this, _M3eNavMenuItemElement_items, "f").length > 0;
  setCustomState(this, "--with-items", this._hasChildItems);
  if (hadChildItems || this._hasChildItems) {
    this.selected = __classPrivateFieldGet(this, _M3eNavMenuItemElement_items, "f").some(x => x.selected);
  }
};
_M3eNavMenuItemElement_handleClick = function _M3eNavMenuItemElement_handleClick() {
  if (this.disabled) return;
  __classPrivateFieldGet(this, _M3eNavMenuItemElement_menu, "f")?.[selectionManager].setActiveItem(this);
  if (!this._hasChildItems) {
    __classPrivateFieldGet(this, _M3eNavMenuItemElement_menu, "f")?.[selectionManager].select(this);
    __classPrivateFieldGet(this, _M3eNavMenuItemElement_path, "f").forEach(x => x.selected = this.selected);
    __classPrivateFieldGet(this, _M3eNavMenuItemElement_link, "f")?.click();
    const drawerContainer = this.closest("m3e-drawer-container");
    if (drawerContainer) {
      const drawer = this.closest("[slot='start']") ?? this.closest("[slot='end']");
      if (drawer && (hasCustomState(drawerContainer, `--${drawer.slot}-push`) || hasCustomState(drawerContainer, `--${drawer.slot}-over`))) {
        setTimeout(() => {
          drawerContainer.removeAttribute(drawer.slot);
          drawerContainer.dispatchEvent(new Event("change", {
            bubbles: true
          }));
        }, 300);
      }
    }
  } else {
    this.toggle();
  }
};
_M3eNavMenuItemElement_handleCollapsibleEvent = function _M3eNavMenuItemElement_handleCollapsibleEvent(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event(e.type, {
    bubbles: true
  }));
};
(() => {
  registerStyleSheet(css`m3e-nav-menu-item > m3e-divider { margin-block: var(--m3e-nav-menu-divider-margin, ${DesignToken.measurement.space50}); flex: none; } m3e-nav-menu-item > m3e-nav-menu-item:first-of-type { margin-block-start: var(--m3e-nav-menu-item-vertical-inset, ${DesignToken.measurement.space50}); } m3e-nav-menu-item > m3e-nav-menu-item:last-of-type { margin-block-end: var(--m3e-nav-menu-item-vertical-inset, ${DesignToken.measurement.space50}); }`);
})();
/** The styles of the element. */
M3eNavMenuItemElement.styles = css`:host { display: block; flex: none; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { contain: layout style; display: flex; align-items: center; position: relative; padding-inline: var(--m3e-nav-menu-item-padding, ${DesignToken.measurement.space300}); height: calc(var(--m3e-nav-menu-item-height, 56px) + ${DesignToken.density.calc(-3)}); column-gap: var(--m3e-nav-menu-item-spacing, ${DesignToken.measurement.space150}); font-size: var(--m3e-nav-menu-item-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-nav-menu-item-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-nav-menu-item-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-nav-menu-item-tracking, ${DesignToken.typescale.standard.label.large.tracking}); transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } * { user-select: none; -webkit-user-select: none; } .base, .focus-ring { border-radius: var(--m3e-nav-menu-item-shape, ${DesignToken.shape.corner.full}); } .label { flex: 1 1 auto; display: flex; align-items: center; position: relative; overflow: hidden; vertical-align: middle; } .icon, .toggle { flex: none; display: flex; align-items: center; justify-content: center; position: relative; vertical-align: middle; } ::slotted([slot="badge"]) { flex: none; position: relative; font-size: var(--m3e-nav-menu-item-badge-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-nav-menu-item-badge-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-nav-menu-item-badge-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-nav-menu-item-badge-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } .toggle { transition: ${unsafeCSS(`transform var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1})
        ${DesignToken.motion.easing.standard}`)}; } :host(:not(:is(:state(--with-icon), :--with-icon))) .icon { display: none; } .icon { margin-inline-start: calc(0px - ${DesignToken.measurement.space100}); } .toggle { margin-inline-end: calc(0px - ${DesignToken.measurement.space100}); } .group { padding-inline-start: var(--m3e-nav-menu-item-inset, ${DesignToken.measurement.space200}); } .group[open] { overflow: unset; } :host([open]) .toggle { transform: rotate(180deg); } :host(:not(:is(:state(--with-items), :--with-items))) .toggle, :host(:not(:is(:state(--with-items), :--with-items))) .group { display: none; } ::slotted([slot="selected-icon"]), ::slotted([slot="icon"]), ::slotted([slot="toggle-icon"]), .toggle-icon { vertical-align: middle; width: 1em; height: 1em; font-size: var(--m3e-nav-menu-item-icon-size, 24px); } :host(:not(:disabled)) .base { cursor: pointer; } :host(:not(:disabled)) .base { color: var(--m3e-nav-menu-item-label-color, ${DesignToken.color.onSurfaceVariant}); } :host(:disabled) .base { color: color-mix( in srgb, var(--m3e-nav-menu-item-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-nav-menu-item-disabled-color-opacity, 38%), transparent ); } :host([selected]:not(:is(:state(--with-items), :--with-items)):not(:disabled)) .base { color: var(--m3e-nav-menu-item-selected-label-color, ${DesignToken.color.onSecondaryContainer}); } :host([selected]:not(:is(:state(--with-items), :--with-items)):not(:disabled)) .indicator { --m3e-selection-indicator-color: var( --m3e-nav-menu-item-selected-container-color, ${DesignToken.color.secondaryContainer} ); --m3e-selection-indicator-state-layer-focus-color: var( --m3e-nav-menu-item-selected-container-focus-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-selection-indicator-state-layer-hover-color: var( --m3e-nav-menu-item-selected-container-hover-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-selection-indicator-state-layer-pressed-color: var( --m3e-nav-menu-item-selected-container-pressed-color, ${DesignToken.color.onSecondaryContainer} ); } :host(:not([selected]):not(:is(:state(--with-items), :--with-items)):not(:disabled)) .indicator { --m3e-selection-indicator-state-layer-focus-color: var( --m3e-nav-menu-item-unselected-container-focus-color, ${DesignToken.color.onSurface} ); --m3e-selection-indicator-state-layer-hover-color: var( --m3e-nav-menu-item-unselected-container-hover-color, ${DesignToken.color.onSurface} ); --m3e-selection-indicator-state-layer-pressed-color: var( --m3e-nav-menu-item-unselected-container-pressed-color, ${DesignToken.color.onSurface} ); } :host([selected]:is(:state(--with-items), :--with-items):not(:disabled)) .indicator { --m3e-selection-indicator-color: var( --m3e-nav-menu-item-open-container-color, ${DesignToken.color.surfaceContainerHighest} ); --m3e-selection-indicator-state-layer-focus-color: var( --m3e-nav-menu-item-open-container-focus-color, ${DesignToken.color.onSurface} ); --m3e-selection-indicator-state-layer-hover-color: var( --m3e-nav-menu-item-open-container-hover-color, ${DesignToken.color.onSurface} ); --m3e-selection-indicator-state-layer-pressed-color: var( --m3e-nav-menu-item-open-container-pressed-color, ${DesignToken.color.onSurface} ); } ::slotted(a[slot="label"]) { all: unset; } @media (prefers-reduced-motion) { .base, .toggle { transition: none; } } @media (forced-colors: active) { .base { transition: none; } :host(:disabled) .base { color: GrayText; } :host(:not(:disabled)) .base { color: LinkText; } :host([selected]:not(:is(:state(--with-items), :--with-items)):not(:disabled)) .indicator, :host([selected]:is(:state(--with-items), :--with-items):not(:disabled)) .indicator { --m3e-selection-indicator-color: transparent; } :host([selected]:not(:is(:state(--with-items), :--with-items)):not(:disabled)) .base, :host([selected]:is(:state(--with-items), :--with-items):not(:disabled)) .base { forced-color-adjust: none; color: Highlight; } :host([selected]:not(:is(:state(--with-items), :--with-items)):not(:disabled)) .base::after { content: ""; position: absolute; inset-inline-start: calc( calc(var(--m3e-nav-menu-item-padding, ${DesignToken.measurement.space300}) / 2) - calc(6px / 2) ); inset-block-start: 50%; width: 6px; height: 6px; border-radius: 50%; transform: translateY(-50%); background-color: currentColor; } }`;
__decorate([query(".indicator")], M3eNavMenuItemElement.prototype, "indicator", void 0);
__decorate([query(".focus-ring")], M3eNavMenuItemElement.prototype, "focusRing", void 0);
__decorate([query(".base")], M3eNavMenuItemElement.prototype, "_base", void 0);
__decorate([state()], M3eNavMenuItemElement.prototype, "_hasChildItems", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eNavMenuItemElement.prototype, "open", void 0);
M3eNavMenuItemElement = M3eNavMenuItemElement_1 = __decorate([customElement("m3e-nav-menu-item")], M3eNavMenuItemElement);

var _M3eNavMenuElement_instances, _M3eNavMenuElement_ignoreFocusVisible, _M3eNavMenuElement_ignoreFocus, _M3eNavMenuElement_keyDownHandler, _M3eNavMenuElement_keyUpHandler, _M3eNavMenuElement_pointerDownHandler, _M3eNavMenuElement_handleSlotChange, _M3eNavMenuElement_handleKeyDown, _M3eNavMenuElement_handleKeyUp, _M3eNavMenuElement_handlePointerDown, _M3eNavMenuElement_activateItem, _M3eNavMenuElement_updateFocusVisible, _M3eNavMenuElement_updateItemFocusVisible, _b;
var M3eNavMenuElement_1;
/**
 * A hierarchical menu, typically used on larger devices, that allows a user to switch between views.
 *
 * @description
 * The `m3e-nav-menu` component provides a hierarchical, accessible navigation menu supporting
 * nested expandable items, keyboard navigation, and focus management. It is highly customizable
 * via slots and CSS custom properties, and is designed for use in sidebars, navigation drawers,
 * and complex menu structures.
 *
 * @example
 * The following example illustrates a navigation menu with a top-level group of menu items.
 * ```html
 * <m3e-nav-menu>
 *   <m3e-nav-menu-item-group>
 *     <m3e-heading slot="label" variant="label" size="large">Mail</m3e-heading>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="mail"></m3e-icon>
 *       <span slot="label">Inbox</span>
 *       <span slot="badge">24</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="send"></m3e-icon>
 *       <span slot="label">Outbox</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="favorite"></m3e-icon>
 *       <span slot="label">Favorites</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="delete"></m3e-icon>
 *       <span slot="label">Trash</span>
 *     </m3e-nav-menu-item>
 *   </m3e-nav-menu-item-group>
 * </m3e-nav-menu>
 * ```
 *
 * @example
 * The next example illustrates a multilevel navigation menu.
 * ```html
 * <m3e-nav-menu>
 *   <m3e-nav-menu-item open>
 *     <m3e-icon slot="icon" name="rocket_launch"></m3e-icon>
 *     <span slot="label">Getting Started</span>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="widgets"></m3e-icon>
 *       <span slot="label">Overview</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="package_2"></m3e-icon>
 *       <span slot="label">Installation</span>
 *     </m3e-nav-menu-item>
 *   </m3e-nav-menu-item>
 *   <m3e-nav-menu-item>
 *     <span slot="label">Actions</span>
 *     <m3e-nav-menu-item><span slot="label">Button</span></m3e-nav-menu-item>
 *     <m3e-nav-menu-item><span slot="label">Icon</span></m3e-nav-menu-item>
 *     <m3e-nav-menu-item><span slot="label">Icon Button</span></m3e-nav-menu-item>
 *   </m3e-nav-menu-item>
 * </m3e-nav-menu>
 * ```
 *
 * @tag m3e-nav-menu
 *
 * @slot - Renders the items of the menu.
 *
 * @cssprop --m3e-nav-menu-padding-top - Top padding for the menu.
 * @cssprop --m3e-nav-menu-padding-bottom - Bottom padding for the menu.
 * @cssprop --m3e-nav-menu-padding-left - Left padding for the menu.
 * @cssprop --m3e-nav-menu-padding-right - Right padding for the menu.
 * @cssprop --m3e-nav-menu-divider-margin - Margin for divider elements in the menu.
 * @cssprop --m3e-nav-menu-scrollbar-width - Width of the menu scrollbar.
 * @cssprop --m3e-nav-menu-scrollbar-color - Color of the menu scrollbar.
 */
let M3eNavMenuElement = M3eNavMenuElement_1 = class M3eNavMenuElement extends Role(LitElement, "tree") {
  constructor() {
    super();
    _M3eNavMenuElement_instances.add(this);
    /** @private */
    _M3eNavMenuElement_ignoreFocusVisible.set(this, false);
    /** @private */
    _M3eNavMenuElement_ignoreFocus.set(this, false);
    /** @private */
    this[_b] = new SelectionManager().withVerticalOrientation().withHomeAndEnd().withTypeahead().withSkipPredicate(x => x.disabled || !x.visible).disableRovingTabIndex().onActiveItemChange(() => {
      if (this[selectionManager].activeItem) {
        __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_activateItem).call(this, this[selectionManager].activeItem);
      }
    }).onSelectedItemsChange(() => {
      const selected = this.selected;
      for (const item of this.items) {
        if (item !== selected) {
          __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateItemFocusVisible).call(this, item, false, false);
        }
      }
      if (selected?.label) {
        scrollIntoViewIfNeeded(selected.label, this, {
          block: "start",
          behavior: "smooth"
        });
      }
    });
    /** @private */
    _M3eNavMenuElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eNavMenuElement_keyUpHandler.set(this, e => __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_handleKeyUp).call(this, e));
    /** @private */
    _M3eNavMenuElement_pointerDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_handlePointerDown).call(this, e));
    new PressedController(this, {
      callback: pressed => __classPrivateFieldSet(this, _M3eNavMenuElement_ignoreFocus, pressed, "f")
    });
    new FocusController(this, {
      callback: () => {
        if (!__classPrivateFieldGet(this, _M3eNavMenuElement_ignoreFocus, "f")) {
          __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateFocusVisible).call(this);
        }
      }
    });
  }
  /** The selected item of the menu. */
  get selected() {
    return this[selectionManager].selectedItems[0] ?? null;
  }
  /** All the items of the menu. */
  get items() {
    return this[selectionManager].items;
  }
  /** @internal */
  expand(itemsOrDescendants, maybeDescendants = false) {
    const items = Array.isArray(itemsOrDescendants) ? itemsOrDescendants : this[selectionManager].items;
    const descendants = typeof itemsOrDescendants === "boolean" ? itemsOrDescendants : maybeDescendants;
    items.forEach(x => x.expand(descendants));
  }
  /** @internal */
  collapse(itemsOrDescendants, maybeDescendants = false) {
    const items = Array.isArray(itemsOrDescendants) ? itemsOrDescendants : this[selectionManager].items;
    const descendants = typeof itemsOrDescendants === "boolean" ? itemsOrDescendants : maybeDescendants;
    items.forEach(x => x.collapse(descendants));
    const activeItem = this[selectionManager].activeItem;
    if (activeItem && !activeItem.visible) {
      for (let parent = activeItem.parentItem; parent; parent = parent.parentItem) {
        if (parent.visible) {
          this[selectionManager].setActiveItem(parent);
          break;
        }
      }
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eNavMenuElement_keyDownHandler, "f"));
    this.addEventListener("keyup", __classPrivateFieldGet(this, _M3eNavMenuElement_keyUpHandler, "f"));
    this.addEventListener("pointerdown", __classPrivateFieldGet(this, _M3eNavMenuElement_pointerDownHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eNavMenuElement_keyDownHandler, "f"));
    this.removeEventListener("keyup", __classPrivateFieldGet(this, _M3eNavMenuElement_keyUpHandler, "f"));
    this.removeEventListener("pointerdown", __classPrivateFieldGet(this, _M3eNavMenuElement_pointerDownHandler, "f"));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot @slotchange="${__classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_handleSlotChange)}"></slot></div>`;
  }
};
_M3eNavMenuElement_ignoreFocusVisible = new WeakMap();
_M3eNavMenuElement_ignoreFocus = new WeakMap();
_M3eNavMenuElement_keyDownHandler = new WeakMap();
_M3eNavMenuElement_keyUpHandler = new WeakMap();
_M3eNavMenuElement_pointerDownHandler = new WeakMap();
_M3eNavMenuElement_instances = new WeakSet();
_b = selectionManager;
_M3eNavMenuElement_handleSlotChange = function _M3eNavMenuElement_handleSlotChange() {
  for (const divider of this.querySelectorAll("m3e-divider")) {
    divider.ariaHidden = "true";
  }
  const {
    added
  } = this[selectionManager].setItems([...this.querySelectorAll("m3e-nav-menu-item")]);
  for (const item of added) {
    item.id = item.id || `m3e-nav-menu-item-${M3eNavMenuElement_1.__nextId++}`;
  }
  if (this[selectionManager].activeItem) {
    this.setAttribute("aria-activedescendant", this[selectionManager].activeItem.id);
    __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateFocusVisible).call(this);
  } else {
    this.removeAttribute("aria-activedescendant");
  }
};
_M3eNavMenuElement_handleKeyDown = function _M3eNavMenuElement_handleKeyDown(e) {
  __classPrivateFieldSet(this, _M3eNavMenuElement_ignoreFocusVisible, false, "f");
  __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateFocusVisible).call(this);
  const item = this[selectionManager].activeItem;
  if (e.defaultPrevented || !item || item.disabled) return;
  switch (e.key) {
    case "Enter":
    case " ":
      e.preventDefault();
      if (e.key === " ") {
        item.indicator?.show("pressed");
      }
      if (item.hasChildItems) {
        requestAnimationFrame(() => item.toggle());
      } else if (!item.selected) {
        this[selectionManager].select(item);
        item.link?.click();
      }
      break;
    case "*":
      e.preventDefault();
      item.expand(true);
      break;
    case "Left":
    case "ArrowLeft":
      e.preventDefault();
      if (M3eDirectionality.current === "ltr") {
        if (item.hasChildItems && item.open) {
          requestAnimationFrame(() => item.collapse());
        } else {
          const parent = item.parentItem;
          if (parent) {
            this[selectionManager].setActiveItem(parent);
          }
        }
      } else if (item.hasChildItems && !item.open) {
        item.expand();
      }
      break;
    case "Right":
    case "ArrowRight":
      e.preventDefault();
      if (M3eDirectionality.current === "rtl") {
        if (item.hasChildItems && item.open) {
          requestAnimationFrame(() => item.collapse());
        } else {
          const parent = item.parentItem;
          if (parent) {
            this[selectionManager].setActiveItem(parent);
          }
        }
      } else if (item.hasChildItems && !item.open) {
        item.expand();
      }
      break;
    default:
      this[selectionManager].onKeyDown(e);
      break;
  }
};
_M3eNavMenuElement_handleKeyUp = function _M3eNavMenuElement_handleKeyUp(e) {
  const item = this[selectionManager].activeItem;
  if (!e.defaultPrevented && item && !item.disabled && e.key === " ") {
    item.indicator?.hide("pressed");
  }
};
_M3eNavMenuElement_handlePointerDown = function _M3eNavMenuElement_handlePointerDown(e) {
  if (!e.defaultPrevented && !__classPrivateFieldGet(this, _M3eNavMenuElement_ignoreFocusVisible, "f") && !forcedColorsActive()) {
    __classPrivateFieldSet(this, _M3eNavMenuElement_ignoreFocusVisible, true, "f");
    const item = e.composedPath().reverse().find(x => x instanceof M3eNavMenuItemElement);
    if (item && !item.disabled) {
      __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateItemFocusVisible).call(this, item, true, false);
    }
  }
};
_M3eNavMenuElement_activateItem = function _M3eNavMenuElement_activateItem(item) {
  this.setAttribute("aria-activedescendant", item.id);
  if (item.label) {
    scrollIntoViewIfNeeded(item.label, this, {
      block: "nearest",
      behavior: "smooth"
    });
  }
  __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateFocusVisible).call(this);
};
_M3eNavMenuElement_updateFocusVisible = function _M3eNavMenuElement_updateFocusVisible() {
  const focusWithin = this.matches(":focus-within");
  const focused = focusWithin || this.matches(":focus");
  const focusVisible = focused && !__classPrivateFieldGet(this, _M3eNavMenuElement_ignoreFocusVisible, "f") && (forcedColorsActive() || this.matches(":focus-visible") || focusWithin && this.querySelector("a:focus-visible") !== null);
  this[selectionManager].items.forEach(x => {
    const active = x === this[selectionManager].activeItem;
    __classPrivateFieldGet(this, _M3eNavMenuElement_instances, "m", _M3eNavMenuElement_updateItemFocusVisible).call(this, x, active && focused, active && focusVisible);
  });
};
_M3eNavMenuElement_updateItemFocusVisible = function _M3eNavMenuElement_updateItemFocusVisible(item, focused, focusVisible) {
  if (item.indicator) {
    // Ensure selection indicator doesn't bounce outside the bounds of the focus ring.
    item.indicator.bounce = !focusVisible;
  }
  if (focused && focusVisible) {
    item.indicator?.show("focused");
  } else {
    item.indicator?.hide("focused");
  }
  if (focusVisible) {
    item.focusRing?.show();
  } else {
    item.focusRing?.hide();
  }
};
(() => {
  registerStyleSheet(css`m3e-nav-menu > m3e-divider { margin-block: var(--m3e-nav-menu-divider-margin, ${DesignToken.measurement.space50}); flex: none; }`);
})();
/** The styles of the element. */
M3eNavMenuElement.styles = css`:host { display: block; outline: none; overflow-y: auto; min-height: 0; scrollbar-width: ${DesignToken.scrollbar.width}; scrollbar-color: ${DesignToken.scrollbar.color}; } :host([hidden]) { display: none; } .base { contain: layout style; width: 100%; display: flex; flex-direction: column; position: relative; min-height: inherit; box-sizing: border-box; padding-block-start: var(--m3e-nav-menu-padding-top, ${DesignToken.measurement.space100}); padding-block-end: var(--m3e-nav-menu-padding-bottom, ${DesignToken.measurement.space100}); padding-inline-start: var(--m3e-nav-menu-padding-left, ${DesignToken.measurement.space150}); padding-inline-end: var(--m3e-nav-menu-padding-right, ${DesignToken.measurement.space150}); }`;
/** @private */
M3eNavMenuElement.__nextId = 0;
M3eNavMenuElement = M3eNavMenuElement_1 = __decorate([customElement("m3e-nav-menu")], M3eNavMenuElement);

var _M3eNavMenuItemGroupElement_instances, _M3eNavMenuItemGroupElement_labelId, _M3eNavMenuItemGroupElement_label, _M3eNavMenuItemGroupElement_handleLabelSlotChange;
var M3eNavMenuItemGroupElement_1;
/**
 * A top-level semantic grouping of items in a navigation menu.
 *
 * @description
 * The `m3e-nav-menu-item-group` is a top-level semantic grouping of items in a navigation menu.
 * It encapsulates related items under a shared heading or label, supporting visual hierarchy and accessibility.
 *
 * @example
 * The following example illustrates a navigation menu with a top-level group of menu items.
 * ```html
 * <m3e-nav-menu>
 *   <m3e-nav-menu-item-group>
 *     <m3e-heading slot="label" variant="label" size="large">Mail</m3e-heading>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="mail"></m3e-icon>
 *       <span slot="label">Inbox</span>
 *       <span slot="badge">24</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="send"></m3e-icon>
 *       <span slot="label">Outbox</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="favorite"></m3e-icon>
 *       <span slot="label">Favorites</span>
 *     </m3e-nav-menu-item>
 *     <m3e-nav-menu-item>
 *       <m3e-icon slot="icon" name="delete"></m3e-icon>
 *       <span slot="label">Trash</span>
 *     </m3e-nav-menu-item>
 *   </m3e-nav-menu-item-group>
 * </m3e-nav-menu>
 * ```
 *
 * @tag m3e-nav-menu-item-group
 *
 * @slot - Renders the items of the group.
 * @slot label - Renders the label of the group.
 *
 * @cssprop --m3e-nav-menu-item-group-label-inset - Insets the label from the start edge of the group.
 * @cssprop --m3e-nav-menu-item-group-label-space - Vertical spacing around the group's label.
 */
let M3eNavMenuItemGroupElement = M3eNavMenuItemGroupElement_1 = class M3eNavMenuItemGroupElement extends AttachInternals(Role(LitElement, "group")) {
  constructor() {
    super(...arguments);
    _M3eNavMenuItemGroupElement_instances.add(this);
    /** @private */
    _M3eNavMenuItemGroupElement_labelId.set(this, `m3e-nav-menu-item-group-label-${M3eNavMenuItemGroupElement_1.__nextId++}`);
    /** @private */
    _M3eNavMenuItemGroupElement_label.set(this, void 0);
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    setCustomState(this, "--divided", this.previousElementSibling?.tagName === "M3E-DIVIDER");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    deleteCustomState(this, "--divided");
  }
  /** @inheritdoc */
  render() {
    return html`<div class="label"><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_instances, "m", _M3eNavMenuItemGroupElement_handleLabelSlotChange)}"></slot></div><slot></slot>`;
  }
};
_M3eNavMenuItemGroupElement_labelId = new WeakMap();
_M3eNavMenuItemGroupElement_label = new WeakMap();
_M3eNavMenuItemGroupElement_instances = new WeakSet();
_M3eNavMenuItemGroupElement_handleLabelSlotChange = function _M3eNavMenuItemGroupElement_handleLabelSlotChange(e) {
  const label = e.target.assignedElements({
    flatten: true
  })[0];
  if (label !== __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f")) {
    // If the label is changed and its id matched the reversed id,
    // clear the id in the event the element is moved elsewhere in the DOM.
    if (__classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f")?.id === __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_labelId, "f")) {
      __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f").id = "";
    }
    __classPrivateFieldSet(this, _M3eNavMenuItemGroupElement_label, label, "f");
    if (__classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f")) {
      __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f").id = __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f").id || __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_labelId, "f");
      this.setAttribute("aria-labelledby", __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f").id);
    } else {
      this.removeAttribute("aria-labelledby");
    }
  }
  setCustomState(this, "--with-label", __classPrivateFieldGet(this, _M3eNavMenuItemGroupElement_label, "f") !== undefined);
};
/** The styles of the element. */
M3eNavMenuItemGroupElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; } :host(:not(:is(:state(--with-label), :--with-label))) .label { display: none; } .label { margin-inline-start: var(--m3e-nav-menu-item-group-label-inset, ${DesignToken.measurement.space200}); margin-block-end: var(--m3e-nav-menu-item-group-label-space, ${DesignToken.measurement.space200}); flex: none; } :host(:is(:state(--divided), :--divided)) .label { margin-block-start: calc( var(--m3e-nav-menu-item-group-label-space, ${DesignToken.measurement.space200}) - var( --m3e-nav-menu-divider-margin, ${DesignToken.measurement.space50} ) ); } :host(:not(:is(:state(--divided), :--divided))) .label { margin-block-start: var(--m3e-nav-menu-item-group-label-space, ${DesignToken.measurement.space200}); }`;
/** @private */
M3eNavMenuItemGroupElement.__nextId = 0;
M3eNavMenuItemGroupElement = M3eNavMenuItemGroupElement_1 = __decorate([customElement("m3e-nav-menu-item-group")], M3eNavMenuItemGroupElement);

export { M3eNavMenuElement, M3eNavMenuItemElement, M3eNavMenuItemGroupElement };
//# sourceMappingURL=nav-menu.js.map
