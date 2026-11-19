/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { LitElement, nothing, html, unsafeCSS, css } from 'lit';
import { query, state, property } from 'lit/decorators.js';
import { AttachInternals, Disabled, FocusController, DesignToken, HtmlFor, ActionElementBase, customElement, Role, HoverController, setCustomState, SuppressInitialAnimation, ScrollController, ClickOutsideController, deleteCustomState, addCustomState, setCustomEnumState, Checked, prefersReducedMotion } from './TextOverflowElement.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import 'lit/directives/if-defined.js';
import { addAriaReferencedId, removeAriaReferencedId, RovingTabIndexManager } from './LiveAnnouncer.js';
import { positionAnchor } from './FloatingPanelElement.js';
import { M3eDirectionality } from './Directionality.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { isLinkButtonMixin, renderPseudoLink, LinkButton } from './LinkButton.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';

/** A base implementation for an item of a menu. This class must be inherited. */
class MenuItemElementBase extends KeyboardClick(Focusable(AttachInternals(Disabled(LitElement), true))) {
  constructor() {
    super();
    new FocusController(this, {
      callback: focused => {
        if (focused) {
          this.menu?._activate();
        }
      }
    });
  }
  /** The menu to which this item belongs. */
  get menu() {
    return this.closest("m3e-menu");
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div class="touch" aria-hidden="true"></div>${isLinkButtonMixin(this) ? this[renderPseudoLink]() : nothing}<div class="wrapper">${this._renderContent()}</div></div>`;
  }
}
/** The styles of the element. */
MenuItemElementBase.styles = css`:host { display: inline-block; outline: none; user-select: none; flex: none; height: calc(var(--m3e-menu-item-container-height, 44px) + ${DesignToken.density.calc(-3)}); -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } :host(:not(:disabled)) .base { color: var(--m3e-menu-item-color, ${DesignToken.color.onSurface}); } :host(:not([aria-expanded="true"])) .base { --m3e-state-layer-hover-color: var(--m3e-menu-item-container-hover-color, ${DesignToken.color.onSurface}); --m3e-state-layer-focus-color: var(--m3e-menu-item-container-focus-color, ${DesignToken.color.onSurface}); --m3e-ripple-color: var(--m3e-menu-item-ripple-color, ${DesignToken.color.onSurface}); } :host(:not(:disabled)[aria-expanded="true"]) .base { background-color: color-mix( in srgb, var(--m3e-menu-item-active-state-layer-color, ${DesignToken.color.onSurface}) var(--m3e-menu-active-state-layer-opacity, 8%), transparent ); } :host([aria-expanded="true"]) .state-layer { display: none; } :host(:not(:disabled)[checked]) .base { color: var(--m3e-menu-item-selected-color, ${DesignToken.color.onTertiaryContainer}); background-color: var(--m3e-menu-item-selected-container-color, ${DesignToken.color.tertiaryContainer}); } :host([checked]) .base { --m3e-state-layer-hover-color: var( --m3e-menu-item-selected-container-hover-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-menu-item-selected-container-focus-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-ripple-color: var(--m3e-menu-item-selected-ripple-color, ${DesignToken.color.onTertiaryContainer}); } :host(:not(:disabled)) { cursor: pointer; } :host(:disabled) .base { color: color-mix( in srgb, var(--m3e-menu-item-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-menu-item-disabled-opacity, 38%), transparent ); } .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; position: relative; width: 100%; height: 100%; border-radius: var(--m3e-menu-item-shape, ${DesignToken.shape.corner.extraSmall}); transition: ${unsafeCSS(`border-radius ${DesignToken.motion.spring.fastEffects}`)}; } :host([checked]:not(:is(:state(--first), :--first))) .base { border-top-left-radius: var(--m3e-menu-item-selected-shape, ${DesignToken.shape.corner.medium}); border-top-right-radius: var(--m3e-menu-item-selected-shape, ${DesignToken.shape.corner.medium}); } :host([checked]:not(:is(:state(--last), :--last))) .base { border-bottom-left-radius: var(--m3e-menu-item-selected-shape, ${DesignToken.shape.corner.medium}); border-bottom-right-radius: var(--m3e-menu-item-selected-shape, ${DesignToken.shape.corner.medium}); } :host(:is(:state(--first), :--first)) .base { border-top-left-radius: var(--m3e-menu-item-first-child-shape, ${DesignToken.shape.corner.medium}); border-top-right-radius: var(--m3e-menu-item-first-child-shape, ${DesignToken.shape.corner.medium}); } :host(:is(:state(--last), :--last)) .base { border-bottom-left-radius: var(--m3e-menu-item-last-child-shape, ${DesignToken.shape.corner.medium}); border-bottom-right-radius: var(--m3e-menu-item-last-child-shape, ${DesignToken.shape.corner.medium}); } .touch { position: absolute; height: calc( var(--m3e-menu-item-container-height, 44px) + calc(var(--m3e-menu-gap, ${DesignToken.measurement.space25}) * 2) + ${DesignToken.density.calc(-3)} ); left: 0; right: 0; } .wrapper { flex: 1 1 auto; display: inline-flex; align-items: center; column-gap: var(--m3e-menu-item-icon-label-space, ${DesignToken.measurement.space100}); padding-inline-start: var(--m3e-menu-item-padding-start, ${DesignToken.measurement.space150}); padding-inline-end: var(--m3e-menu-item-padding-end, ${DesignToken.measurement.space150}); font-size: var(--m3e-menu-item-label-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var( --m3e-menu-item-label-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight} ); line-height: var( --m3e-menu-item-label-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight} ); letter-spacing: var(--m3e-menu-item-label-text-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } .focus-ring { border-radius: var(--m3e-menu-item-focus-ring-shape, inherit); } .content { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } ::slotted([slot="icon"]), ::slotted([slot="trailing-icon"]), .trailing-icon { flex: none; width: 1em; font-size: var(--m3e-menu-item-icon-size, 20px) !important; } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { background-color: Menu; color: MenuText; } :host(:disabled) .base { color: GrayText; } }`;
__decorate([query(".focus-ring")], MenuItemElementBase.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], MenuItemElementBase.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], MenuItemElementBase.prototype, "_ripple", void 0);

/**
 * An element, nested within a clickable element, used to open a menu.
 *
 * @description
 * The `m3e-menu-trigger` component is used to open a menu when nested within a clickable element
 * such as a button or menu item. It anchors the menu to its invoker, enabling contextual flows and
 * nested hierarchies.
 *
 * @example
 * The following example illustrates a basic menu.  The `m3e-menu-trigger` is used to trigger a `m3e-menu` specified
 * by the `for` attribute when its parenting element is activated.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu1">Basic menu</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu1">
 *   <m3e-menu-item>Apple</m3e-menu-item>
 *   <m3e-menu-item>Apricot</m3e-menu-item>
 *   <m3e-menu-item>Avocado</m3e-menu-item>
 *   <m3e-menu-item>Green Apple</m3e-menu-item>
 *   <m3e-menu-item>Green Grapes</m3e-menu-item>
 *   <m3e-menu-item>Olive</m3e-menu-item>
 *   <m3e-menu-item>Orange</m3e-menu-item>
 * </m3e-menu>
 * ```
 *
 * @example
 * The next example illustrates nested menus.  Submenus are triggered by placing a `m3e-menu-trigger` inside a `m3e-menu-item`.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu2">Nested menus</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu2">
 *   <m3e-menu-item>
 *     <m3e-menu-trigger for="menu3">Fruits with A</m3e-menu-trigger>
 *   </m3e-menu-item>
 *   <m3e-menu-item>Grapes</m3e-menu-item>
 *   <m3e-menu-item>Olive</m3e-menu-item>
 *   <m3e-menu-item>Orange</m3e-menu-item>
 * </m3e-menu>
 * <m3e-menu id="menu3">
 *   <m3e-menu-item>Apricot</m3e-menu-item>
 *   <m3e-menu-item>Avocado</m3e-menu-item>
 *   <m3e-menu-item>
 *     <m3e-menu-trigger for="menu4">Apples</m3e-menu-trigger>
 *   </m3e-menu-item>
 * </m3e-menu>
 * <m3e-menu id="menu4">
 *   <m3e-menu-item>Fuji</m3e-menu-item>
 *   <m3e-menu-item>Granny Smith</m3e-menu-item>
 *   <m3e-menu-item>Red Delicious</m3e-menu-item>
 * </m3e-menu>
 * ```
 *
 * @tag m3e-menu-trigger
 *
 * @slot - Renders the contents of the trigger.
 */
let M3eMenuTriggerElement = class M3eMenuTriggerElement extends HtmlFor(ActionElementBase) {
  /** The menu triggered by the element. */
  get menu() {
    return this.control?.tagName === "M3E-MENU" ? this.control : null;
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    const menu = this.menu;
    if (menu) {
      if (this.parentElement) {
        this.parentElement.ariaHasPopup = "menu";
        this.parentElement.ariaExpanded = "false";
        if (menu.id) {
          addAriaReferencedId(this.parentElement, "aria-controls", menu.id);
        }
      }
      if (this.closest("m3e-menu")) {
        menu.submenu = true;
      }
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.parentElement) {
      this.parentElement.ariaHasPopup = null;
      this.parentElement.ariaExpanded = null;
      const menu = this.menu;
      if (menu?.id) {
        removeAriaReferencedId(this.parentElement, "aria-controls", menu.id);
      }
    }
    super.detach();
  }
  /** @inheritdoc */
  _onClick() {
    if (this.parentElement) {
      if (this.parentElement.tagName === "M3E-MENU-ITEM") {
        this.menu?.show(this.parentElement);
      } else {
        this.menu?.toggle(this.parentElement);
      }
    }
  }
};
M3eMenuTriggerElement = __decorate([customElement("m3e-menu-trigger")], M3eMenuTriggerElement);

var _M3eMenuItemElement_instances, _M3eMenuItemElement_clickHandler, _M3eMenuItemElement_keyDownHandler, _M3eMenuItemElement_mouseEnterHandler, _M3eMenuItemElement_submenuTrigger, _M3eMenuItemElement_defaultSlotChangeHandler, _M3eMenuItemElement_iconSlotChangeHandler, _M3eMenuItemElement_trailingIconSlotChangeHandler, _M3eMenuItemElement_handleClick, _M3eMenuItemElement_handleKeyDown, _M3eMenuItemElement_handleMouseEnter;
var M3eMenuItemElement_1;
/**
 * An item of a menu.
 *
 * @description
 * The `m3e-menu-item` component represents a single actionable item within a menu, supporting standard
 * click behavior, optional link semantics, and flexible icon placement for navigation, commands, or
 * contextual actions. It behaves as a button or link depending on its attributes, and can trigger a submenu
 * when a nested `m3e-menu-trigger` is present—enabling hierarchical flows.
 *
 * @example
 * The following example illustrates a basic menu.  The `m3e-menu-trigger` is used to trigger a `m3e-menu` specified
 * by the `for` attribute when its parenting element is activated.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu1">Basic menu</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu1">
 *   <m3e-menu-item>Apple</m3e-menu-item>
 *   <m3e-menu-item>Apricot</m3e-menu-item>
 *   <m3e-menu-item>Avocado</m3e-menu-item>
 *   <m3e-menu-item>Green Apple</m3e-menu-item>
 *   <m3e-menu-item>Green Grapes</m3e-menu-item>
 *   <m3e-menu-item>Olive</m3e-menu-item>
 *   <m3e-menu-item>Orange</m3e-menu-item>
 * </m3e-menu>
 * ```
 *
 * @example
 * The next example illustrates nested menus.  Submenus are triggered by placing a `m3e-menu-trigger` inside a `m3e-menu-item`.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu2">Nested menus</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu2">
 *   <m3e-menu-item>
 *     <m3e-menu-trigger for="menu3">Fruits with A</m3e-menu-trigger>
 *   </m3e-menu-item>
 *   <m3e-menu-item>Grapes</m3e-menu-item>
 *   <m3e-menu-item>Olive</m3e-menu-item>
 *   <m3e-menu-item>Orange</m3e-menu-item>
 * </m3e-menu>
 * <m3e-menu id="menu3">
 *   <m3e-menu-item>Apricot</m3e-menu-item>
 *   <m3e-menu-item>Avocado</m3e-menu-item>
 *   <m3e-menu-item>
 *     <m3e-menu-trigger for="menu4">Apples</m3e-menu-trigger>
 *   </m3e-menu-item>
 * </m3e-menu>
 * <m3e-menu id="menu4">
 *   <m3e-menu-item>Fuji</m3e-menu-item>
 *   <m3e-menu-item>Granny Smith</m3e-menu-item>
 *   <m3e-menu-item>Red Delicious</m3e-menu-item>
 * </m3e-menu>
 * ```
 *
 * @tag m3e-menu-item
 *
 * @slot - Renders the label of the item.
 * @slot icon - Renders an icon before the items's label.
 * @slot trailing-icon - Renders an icon after the item's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr target - The target of the link button.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-menu-item-container-height - Height of the menu item container.
 * @cssprop --m3e-menu-item-color - Text color for unselected, enabled menu items.
 * @cssprop --m3e-menu-item-container-hover-color - State layer hover color for unselected items.
 * @cssprop --m3e-menu-item-container-focus-color - State layer focus color for unselected items.
 * @cssprop --m3e-menu-item-ripple-color - Ripple color for unselected items.
 * @cssprop --m3e-menu-item-selected-color - Text color for selected items.
 * @cssprop --m3e-menu-item-selected-container-color - Background color for selected items.
 * @cssprop --m3e-menu-item-selected-container-hover-color - State layer hover color for selected items.
 * @cssprop --m3e-menu-item-selected-container-focus-color - State layer focus color for selected items.
 * @cssprop --m3e-menu-item-selected-ripple-color - Ripple color for selected items.
 * @cssprop --m3e-menu-item-active-state-layer-color - State layer color for expanded items.
 * @cssprop --m3e-menu-item-active-state-layer-opacity - State layer opacity for expanded items.
 * @cssprop --m3e-menu-item-disabled-color - Base color for disabled items.
 * @cssprop --m3e-menu-item-disabled-opacity - Opacity percentage for disabled item color mix.
 * @cssprop --m3e-vibrant-menu-item-color - Text color for unselected, enabled menu items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-container-hover-color - State layer hover color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-container-focus-color - State layer focus color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-ripple-color - Ripple color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-color - Text color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-color - Background color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-hover-color - State layer hover color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-focus-color - State layer focus color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-ripple-color - Ripple color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-active-state-layer-color - State layer color for expanded items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-disabled-color - Base color for disabled items for vibrant variant.
 * @cssprop --m3e-menu-item-icon-label-space - Horizontal gap between icon and content.
 * @cssprop --m3e-menu-item-padding-start - Start padding for the item wrapper.
 * @cssprop --m3e-menu-item-padding-end - End padding for the item wrapper.
 * @cssprop --m3e-menu-item-label-text-font-size - Font size for menu item text.
 * @cssprop --m3e-menu-item-label-text-font-weight - Font weight for menu item text.
 * @cssprop --m3e-menu-item-label-text-line-height - Line height for menu item text.
 * @cssprop --m3e-menu-item-label-text-tracking - Letter spacing for menu item text.
 * @cssprop --m3e-menu-item-focus-ring-shape - Border radius for the focus ring.
 * @cssprop --m3e-menu-item-icon-size - Font size for leading and trailing icons.
 * @cssprop --m3e-menu-item-shape - Base shape of the menu item.
 * @cssprop --m3e-menu-item-first-child-shape - Shape for the first menu item in a menu.
 * @cssprop --m3e-menu-item-last-child-shape - Shape for the last menu item in a menu.
 */
let M3eMenuItemElement = M3eMenuItemElement_1 = class M3eMenuItemElement extends LinkButton(Role(MenuItemElementBase, "menuitem")) {
  constructor() {
    super();
    _M3eMenuItemElement_instances.add(this);
    /** @private */
    _M3eMenuItemElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuItemElement_instances, "m", _M3eMenuItemElement_handleClick).call(this, e));
    /** @private */
    _M3eMenuItemElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuItemElement_instances, "m", _M3eMenuItemElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eMenuItemElement_mouseEnterHandler.set(this, () => __classPrivateFieldGet(this, _M3eMenuItemElement_instances, "m", _M3eMenuItemElement_handleMouseEnter).call(this));
    /** @private */
    this._hasSubmenu = false;
    /** @private */
    _M3eMenuItemElement_submenuTrigger.set(this, void 0);
    new HoverController(this, {
      startDelay: 500,
      endDelay: 500,
      callback: hovering => {
        if (hovering && !this.disabled && __classPrivateFieldGet(this, _M3eMenuItemElement_submenuTrigger, "f")) {
          __classPrivateFieldGet(this, _M3eMenuItemElement_submenuTrigger, "f").menu?.show(this);
        }
      }
    });
  }
  /** The submenu triggered by the item. */
  get submenu() {
    return __classPrivateFieldGet(this, _M3eMenuItemElement_submenuTrigger, "f")?.menu ?? null;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eMenuItemElement_clickHandler, "f"));
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuItemElement_keyDownHandler, "f"));
    this.addEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuItemElement_mouseEnterHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eMenuItemElement_clickHandler, "f"));
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuItemElement_keyDownHandler, "f"));
    this.removeEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuItemElement_mouseEnterHandler, "f"));
  }
  /** @internal @inheritdoc */
  _renderContent() {
    return html`<slot name="icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemElement_instances, "m", _M3eMenuItemElement_iconSlotChangeHandler)}"></slot><span class="content"><slot @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemElement_instances, "m", _M3eMenuItemElement_defaultSlotChangeHandler)}"></slot></span>${this._hasSubmenu ? M3eDirectionality.current === "ltr" ? html`<svg class="trailing-icon" aria-hidden="true" viewBox="0 -960 960 960" fill="currentColor"><path d="M400-280v-400l200 200-200 200Z"/></svg>` : html`<svg class="trailing-icon" aria-hidden="true" viewBox="0 -960 960 960" fill="currentColor"><path d="M560-280 360-480l200-200v400Z"/></svg>` : html`<slot name="trailing-icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemElement_instances, "m", _M3eMenuItemElement_trailingIconSlotChangeHandler)}"></slot>`}`;
  }
};
_M3eMenuItemElement_clickHandler = new WeakMap();
_M3eMenuItemElement_keyDownHandler = new WeakMap();
_M3eMenuItemElement_mouseEnterHandler = new WeakMap();
_M3eMenuItemElement_submenuTrigger = new WeakMap();
_M3eMenuItemElement_instances = new WeakSet();
_M3eMenuItemElement_defaultSlotChangeHandler = function _M3eMenuItemElement_defaultSlotChangeHandler(e) {
  __classPrivateFieldSet(this, _M3eMenuItemElement_submenuTrigger, e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof M3eMenuTriggerElement), "f");
  this._hasSubmenu = __classPrivateFieldGet(this, _M3eMenuItemElement_submenuTrigger, "f") !== undefined;
};
_M3eMenuItemElement_iconSlotChangeHandler = function _M3eMenuItemElement_iconSlotChangeHandler(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eMenuItemElement_trailingIconSlotChangeHandler = function _M3eMenuItemElement_trailingIconSlotChangeHandler(e) {
  setCustomState(this, "--with-trailing-icon", hasAssignedNodes(e.target));
};
_M3eMenuItemElement_handleClick = function _M3eMenuItemElement_handleClick(e) {
  if (!e.defaultPrevented && !this._hasSubmenu) {
    this.menu?.hideAll(true);
  }
};
_M3eMenuItemElement_handleKeyDown = function _M3eMenuItemElement_handleKeyDown(e) {
  if (e.defaultPrevented || this.disabled) return;
  switch (e.key) {
    case "Right":
    case "ArrowRight":
      if (M3eDirectionality.current === "ltr") {
        e.preventDefault();
        this.submenu?.show(this);
      }
      break;
    case "Left":
    case "ArrowLeft":
      if (M3eDirectionality.current === "rtl") {
        e.preventDefault();
        this.submenu?.show(this);
      }
      break;
  }
};
_M3eMenuItemElement_handleMouseEnter = function _M3eMenuItemElement_handleMouseEnter() {
  this.menu?.items.forEach(item => {
    if (item instanceof M3eMenuItemElement_1 && item !== this && item.submenu?.isOpen) {
      item.submenu.hide();
    }
  });
};
__decorate([state()], M3eMenuItemElement.prototype, "_hasSubmenu", void 0);
M3eMenuItemElement = M3eMenuItemElement_1 = __decorate([customElement("m3e-menu-item")], M3eMenuItemElement);

/**
 * Determines whether a value is a `MenuPositionX`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `MenuPositionX`.
 */
function isMenuPositionX(value) {
  return value === "before" || value === "after";
}
/**
 * Determines whether a value is a `MenuPositionY`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `MenuPositionY`.
 */
function isMenuPositionY(value) {
  return value === "above" || value === "below";
}

/**
 * Determines whether a value is a `MenuVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `MenuVariant`.
 */
function isMenuVariant(value) {
  return value === "standard" || value === "vibrant";
}

var _M3eMenuElement_instances, _M3eMenuElement_trigger, _M3eMenuElement_anchorCleanup, _M3eMenuElement_anchorLastPosition, _M3eMenuElement_listManager, _M3eMenuElement_keyDownHandler, _M3eMenuElement_mouseEnterHandler, _M3eMenuElement_scrollController, _M3eMenuElement_clickOutsideController, _M3eMenuElement_toggleHandler, _M3eMenuElement_applyVariant, _M3eMenuElement_applyPosition, _M3eMenuElement_handleSlotChange, _M3eMenuElement_handleKeyDown, _M3eMenuElement_handleMouseEnter, _M3eMenuElement_getAbsolutePosition, _M3eMenuElement_deactivate;
var M3eMenuElement_1;
/**
 * Presents a list of choices on a temporary surface.
 *
 * @description
 * The `m3e-menu` component presents a list of choices on a temporary surface, typically anchored to a trigger element.
 * It supports dynamic positioning via `position-x` and `position-y` attributes, and renders its contents through the default slot.
 *
 * @example
 * The following example illustrates a basic menu.  The `m3e-menu-trigger` is used to trigger a `m3e-menu` specified
 * by the `for` attribute when its parenting element is activated.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu1">Basic menu</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu1">
 *   <m3e-menu-item>Apple</m3e-menu-item>
 *   <m3e-menu-item>Apricot</m3e-menu-item>
 *   <m3e-menu-item>Avocado</m3e-menu-item>
 *   <m3e-menu-item>Green Apple</m3e-menu-item>
 *   <m3e-menu-item>Green Grapes</m3e-menu-item>
 *   <m3e-menu-item>Olive</m3e-menu-item>
 *   <m3e-menu-item>Orange</m3e-menu-item>
 * </m3e-menu>
 * ```
 *
 * @example
 * The next example illustrates nested menus.  Submenus are triggered by placing a `m3e-menu-trigger` inside a `m3e-menu-item`.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu2">Nested menus</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu2">
 *   <m3e-menu-item>
 *     <m3e-menu-trigger for="menu3">Fruits with A</m3e-menu-trigger>
 *   </m3e-menu-item>
 *   <m3e-menu-item>Grapes</m3e-menu-item>
 *   <m3e-menu-item>Olive</m3e-menu-item>
 *   <m3e-menu-item>Orange</m3e-menu-item>
 * </m3e-menu>
 * <m3e-menu id="menu3">
 *   <m3e-menu-item>Apricot</m3e-menu-item>
 *   <m3e-menu-item>Avocado</m3e-menu-item>
 *   <m3e-menu-item>
 *     <m3e-menu-trigger for="menu4">Apples</m3e-menu-trigger>
 *   </m3e-menu-item>
 * </m3e-menu>
 * <m3e-menu id="menu4">
 *   <m3e-menu-item>Fuji</m3e-menu-item>
 *   <m3e-menu-item>Granny Smith</m3e-menu-item>
 *   <m3e-menu-item>Red Delicious</m3e-menu-item>
 * </m3e-menu>
 * ```
 *
 * @tag m3e-menu
 *
 * @slot - Renders the contents of the menu.
 *
 * @attr position-x - The position of the menu, on the x-axis.
 * @attr position-y - The position of the menu, on the y-axis.
 * @attr variant - The appearance variant of the menu.
 *
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-menu-container-shape - Controls the corner radius of the menu container.
 * @cssprop --m3e-menu-active-container-shape - Controls the corner radius of the menu container when active.
 * @cssprop --m3e-menu-container-min-width - Minimum width of the menu container.
 * @cssprop --m3e-menu-container-max-width - Maximum width of the menu container.
 * @cssprop --m3e-menu-container-max-height - Maximum height of the menu container.
 * @cssprop --m3e-menu-container-padding-block - Vertical padding inside the menu container.
 * @cssprop --m3e-menu-container-padding-inline - Horizontal padding inside the menu container.
 * @cssprop --m3e-menu-container-color - Background color of the menu container.
 * @cssprop --m3e-menu-container-elevation - Box shadow elevation of the menu container.
 * @cssprop --m3e-vibrant-menu-container-color - Background color of the menu container for vibrant variant.
 * @cssprop --m3e-menu-divider-spacing - Vertical spacing around slotted `m3e-divider` elements.
 * @cssprop --m3e-menu-gap - Gap between content in the menu.
 */
let M3eMenuElement = M3eMenuElement_1 = class M3eMenuElement extends SuppressInitialAnimation(AttachInternals(Role(LitElement, "menu"))) {
  constructor() {
    super(...arguments);
    _M3eMenuElement_instances.add(this);
    /** @private */
    _M3eMenuElement_trigger.set(this, void 0);
    /** @private */
    _M3eMenuElement_anchorCleanup.set(this, void 0);
    /** @private */
    _M3eMenuElement_anchorLastPosition.set(this, void 0);
    /** @private */
    _M3eMenuElement_listManager.set(this, new RovingTabIndexManager().withWrap().withHomeAndEnd().withVerticalOrientation());
    /** @private */
    _M3eMenuElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eMenuElement_mouseEnterHandler.set(this, () => __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_handleMouseEnter).call(this));
    /** @private */
    _M3eMenuElement_scrollController.set(this, new ScrollController(this, {
      target: null,
      callback: target => target instanceof M3eMenuElement_1 ? target.items.filter(x => x instanceof M3eMenuItemElement).forEach(x => x.submenu?.hide()) : this.hideAll()
    }));
    /** @private */
    _M3eMenuElement_clickOutsideController.set(this, new ClickOutsideController(this, {
      target: null,
      callback: composedPath => {
        // If the menu isn't a submenu and no submenu is being clicked, close the entire menu
        if (!this.submenu && !composedPath.some(x => x instanceof M3eMenuElement_1)) {
          this.hide();
        }
      }
    }));
    /** @private */
    _M3eMenuElement_toggleHandler.set(this, e => {
      switch (e.newState) {
        case "open":
          __classPrivateFieldGet(this, _M3eMenuElement_clickOutsideController, "f").observe(this);
          if (__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f")) {
            __classPrivateFieldGet(this, _M3eMenuElement_clickOutsideController, "f").observe(__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f"));
          }
          setTimeout(() => __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").setActiveItem(__classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").items.find(x => !x.disabled)), 40);
          break;
        case "closed":
          __classPrivateFieldGet(this, _M3eMenuElement_clickOutsideController, "f").unobserveAll();
          __classPrivateFieldGet(this, _M3eMenuElement_anchorCleanup, "f")?.call(this);
          __classPrivateFieldSet(this, _M3eMenuElement_anchorCleanup, undefined, "f");
          __classPrivateFieldSet(this, _M3eMenuElement_anchorLastPosition, undefined, "f");
          break;
      }
    });
    /**
     * The position of the menu, on the x-axis.
     * @default "after"
     */
    this.positionX = "after";
    /**
     * The position of the menu, on the y-axis.
     * @default "below"
     */
    this.positionY = "below";
    /**
     * The appearance variant of the menu.
     * @default "standard"
     */
    this.variant = "standard";
    /** Whether the menu is a submenu. */
    this.submenu = false;
  }
  /** The items of the menu. */
  get items() {
    return __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").items;
  }
  /** Whether the menu is open. */
  get isOpen() {
    return __classPrivateFieldGet(this, _M3eMenuElement_trigger, "f") !== undefined;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_applyPosition).call(this);
    this.tabIndex = -1;
    this.setAttribute("popover", "manual");
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuElement_keyDownHandler, "f"));
    this.addEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuElement_mouseEnterHandler, "f"));
    this.addEventListener("toggle", __classPrivateFieldGet(this, _M3eMenuElement_toggleHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuElement_keyDownHandler, "f"));
    this.removeEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuElement_mouseEnterHandler, "f"));
    this.removeEventListener("toggle", __classPrivateFieldGet(this, _M3eMenuElement_toggleHandler, "f"));
    __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_deactivate).call(this);
  }
  /**
   * Opens the menu.
   * @param {HTMLElement} trigger The element that triggered the menu.
   * @returns {Promise<void>} A `Promise` that resolves when the menu is opened.
   */
  async show(trigger) {
    if (__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f") && __classPrivateFieldGet(this, _M3eMenuElement_trigger, "f") !== trigger) {
      this.hide();
    }
    let positionX = this.positionX;
    if (M3eDirectionality.current === "rtl") {
      positionX = positionX === "before" ? "after" : "before";
    }
    __classPrivateFieldSet(this, _M3eMenuElement_anchorCleanup, await positionAnchor(this, trigger, {
      position: this.submenu ? positionX === "before" ? "left-start" : "right-start" : this.positionY === "above" ? positionX === "before" ? "top-end" : "top-start" : positionX === "before" ? "bottom-end" : "bottom-start",
      inline: true,
      flip: true,
      shift: "main",
      offset: !this.submenu ? 4 : undefined
    }, (x, y, position) => {
      if (!this.submenu) {
        setCustomState(this, "--top", position.includes("top"));
        setCustomState(this, "--bottom", position.includes("bottom"));
      } else if (__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f")) {
        const top = __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_getAbsolutePosition).call(this, __classPrivateFieldGet(this, _M3eMenuElement_trigger, "f")).y;
        setCustomState(this, "--shift-down", false);
        setCustomState(this, "--shift-up", false);
        setCustomState(this, Math.round(y) === Math.round(top) ? "--shift-down" : "--shift-up", true);
      }
      if (__classPrivateFieldGet(this, _M3eMenuElement_anchorLastPosition, "f")?.dir !== M3eDirectionality.current || __classPrivateFieldGet(this, _M3eMenuElement_anchorLastPosition, "f")?.x !== x) {
        if (M3eDirectionality.current === "rtl") {
          this.style.right = `${window.innerWidth - x - this.clientWidth}px`;
        } else {
          this.style.left = `${x}px`;
        }
      }
      if (__classPrivateFieldGet(this, _M3eMenuElement_anchorLastPosition, "f")?.y !== y) {
        this.style.top = `${y}px`;
      }
      __classPrivateFieldSet(this, _M3eMenuElement_anchorLastPosition, {
        x,
        y,
        dir: M3eDirectionality.current
      }, "f");
    }), "f");
    const parent = trigger.closest("m3e-menu");
    if (parent) {
      this.variant = parent.variant;
    } else {
      this._activate();
    }
    this.showPopover();
    __classPrivateFieldSet(this, _M3eMenuElement_trigger, trigger, "f");
    __classPrivateFieldGet(this, _M3eMenuElement_trigger, "f").ariaExpanded = "true";
    __classPrivateFieldGet(this, _M3eMenuElement_scrollController, "f").observe(__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f"));
  }
  /**
   * Hides the menu.
   * @param {boolean} [restoreFocus=false] Whether to restore focus to the menu's trigger.
   */
  hide(restoreFocus = false) {
    for (const item of __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").items) {
      const submenu = item.submenu;
      if (submenu && submenu.isOpen) {
        submenu.hide();
      }
    }
    __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_deactivate).call(this);
    this.hidePopover();
    if (__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f")) {
      __classPrivateFieldGet(this, _M3eMenuElement_trigger, "f").ariaExpanded = "false";
      if (restoreFocus) {
        __classPrivateFieldGet(this, _M3eMenuElement_trigger, "f").focus();
      }
      __classPrivateFieldGet(this, _M3eMenuElement_scrollController, "f").unobserve(__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f"));
      __classPrivateFieldSet(this, _M3eMenuElement_trigger, undefined, "f");
    }
  }
  /**
   * Closes this menu and any parenting menus.
   * @param {boolean} [restoreFocus=false] Whether to restore focus to the menu's trigger.
   */
  hideAll(restoreFocus = false) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let menu = this;
    while (__classPrivateFieldGet(menu, _M3eMenuElement_trigger, "f")) {
      const parent = __classPrivateFieldGet(menu, _M3eMenuElement_trigger, "f").closest("m3e-menu");
      if (!parent) {
        break;
      }
      menu = parent;
    }
    menu.hide(restoreFocus);
  }
  /**
   * Toggles the menu.
   * @param {HTMLElement} trigger The element that triggered the menu.
   * @returns {Promise<void>} A `Promise` that resolves when the menu is opened or closed.
   */
  async toggle(trigger) {
    if (__classPrivateFieldGet(this, _M3eMenuElement_trigger, "f")) {
      this.hide();
    } else {
      await this.show(trigger);
    }
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_applyVariant).call(this);
    }
    if (_changedProperties.has("positionX") || _changedProperties.has("positionY")) {
      __classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_applyPosition).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot @slotchange="${__classPrivateFieldGet(this, _M3eMenuElement_instances, "m", _M3eMenuElement_handleSlotChange)}"></slot></div>`;
  }
  /** @internal */
  _activate() {
    if (this !== M3eMenuElement_1.__activeMenu) {
      if (M3eMenuElement_1.__activeMenu) {
        deleteCustomState(M3eMenuElement_1.__activeMenu, "--active");
      }
      M3eMenuElement_1.__activeMenu = this;
      addCustomState(M3eMenuElement_1.__activeMenu, "--active");
    }
  }
};
_M3eMenuElement_trigger = new WeakMap();
_M3eMenuElement_anchorCleanup = new WeakMap();
_M3eMenuElement_anchorLastPosition = new WeakMap();
_M3eMenuElement_listManager = new WeakMap();
_M3eMenuElement_keyDownHandler = new WeakMap();
_M3eMenuElement_mouseEnterHandler = new WeakMap();
_M3eMenuElement_scrollController = new WeakMap();
_M3eMenuElement_clickOutsideController = new WeakMap();
_M3eMenuElement_toggleHandler = new WeakMap();
_M3eMenuElement_instances = new WeakSet();
_M3eMenuElement_applyVariant = function _M3eMenuElement_applyVariant() {
  if (!isMenuVariant(this.variant)) {
    this.variant = "standard";
  }
  setCustomEnumState(this, this.variant, "standard", "vibrant");
};
_M3eMenuElement_applyPosition = function _M3eMenuElement_applyPosition() {
  if (!isMenuPositionX(this.positionX)) {
    this.positionX = "after";
  }
  if (!isMenuPositionX(this.positionY)) {
    this.positionY = "below";
  }
};
_M3eMenuElement_handleSlotChange = function _M3eMenuElement_handleSlotChange() {
  const {
    added
  } = __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").setItems([...this.querySelectorAll("m3e-menu-item,m3e-menu-item-checkbox,m3e-menu-item-radio")].filter(x => x.closest("m3e-menu") === this));
  if (!__classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").activeItem) {
    __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").updateActiveItem(added.find(x => !x.disabled));
  }
  __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").items.forEach((x, i) => {
    setCustomState(x, "--first", i === 0 && !x.previousElementSibling);
    setCustomState(x, "--last", i === __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").items.length - 1);
  });
};
_M3eMenuElement_handleKeyDown = function _M3eMenuElement_handleKeyDown(e) {
  switch (e.key) {
    case "Right":
    case "ArrowRight":
      if (M3eDirectionality.current === "rtl") {
        e.preventDefault();
        this.hide(true);
      } else {
        __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").onKeyDown(e);
      }
      break;
    case "Left":
    case "ArrowLeft":
      if (M3eDirectionality.current === "ltr") {
        e.preventDefault();
        this.hide(true);
      } else {
        __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").onKeyDown(e);
      }
      break;
    case "Tab":
      this.hideAll();
      break;
    case "Escape":
      if (!e.shiftKey && !e.ctrlKey) {
        this.hide(true);
      }
      break;
    default:
      __classPrivateFieldGet(this, _M3eMenuElement_listManager, "f").onKeyDown(e);
      break;
  }
};
_M3eMenuElement_handleMouseEnter = function _M3eMenuElement_handleMouseEnter() {
  this._activate();
};
_M3eMenuElement_getAbsolutePosition = function _M3eMenuElement_getAbsolutePosition(element) {
  let x = 0,
    y = 0;
  for (let current = element; current; current = current.offsetParent instanceof HTMLElement ? current.offsetParent : null) {
    x += current.offsetLeft - current.scrollLeft + current.clientLeft;
    y += current.offsetTop - current.scrollTop + current.clientTop;
  }
  return {
    x,
    y
  };
};
_M3eMenuElement_deactivate = function _M3eMenuElement_deactivate() {
  if (this === M3eMenuElement_1.__activeMenu) {
    deleteCustomState(M3eMenuElement_1.__activeMenu, "--active");
    M3eMenuElement_1.__activeMenu = undefined;
  }
};
(() => {
  registerStyleSheet(css`m3e-menu > m3e-divider { margin-block: var(--m3e-menu-divider-spacing, ${DesignToken.measurement.space100}); }`);
})();
/** The styles of the element. */
M3eMenuElement.styles = css`:host { position: absolute; padding: unset; margin: unset; border: unset; overflow-y: auto; overflow-x: visible; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; scroll-padding-block: calc( var(--m3e-focus-ring-thickness, 3px) + var(--m3e-menu-container-padding-block, ${DesignToken.measurement.space50}) ); min-width: var(--m3e-menu-container-min-width, 112px); max-width: var(--m3e-menu-container-max-width, 280px); max-height: var(--m3e-menu-container-max-height, 282px); box-shadow: var(--m3e-menu-container-elevation, ${DesignToken.elevation.level3}); opacity: 0; display: none; } :host([hidden]) { display: none; } .base { contain: layout style paint; display: flex; flex-direction: column; row-gap: var(--m3e-menu-gap, ${DesignToken.measurement.space25}); min-width: inherit; max-width: inherit; line-height: 0; padding-block: var(--m3e-menu-container-padding-block, ${DesignToken.measurement.space50}); padding-inline: var(--m3e-menu-container-padding-inline, ${DesignToken.measurement.space50}); --m3e-focus-ring-outward-offset: 0px; --m3e-focus-ring-growth-factor: 1.5; } :host(:not(:is(:state(--active), :--active))) { border-radius: var(--m3e-menu-container-shape, ${DesignToken.shape.corner.small}); } :host(:not(:is(:state(--active), :--active))) .base { --m3e-menu-item-first-child-shape: ${DesignToken.shape.corner.extraSmall}; --m3e-menu-item-last-child-shape: ${DesignToken.shape.corner.extraSmall}; } :host(:is(:state(--active), :--active)) { border-radius: var(--m3e-menu-active-container-shape, ${DesignToken.shape.corner.large}); } :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}, 
        transform ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard},
        overlay ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete,
        display ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete,
        border-radius ${DesignToken.motion.spring.fastEffects}`)}; } :host(:not([submenu])) { transform: scaleY(0.8); } :host(:not([submenu]):popover-open) { transform: scaleY(1); animation: bounce-open ${DesignToken.motion.spring.fastSpatial}; } @keyframes bounce-open { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } } :host::backdrop { background-color: transparent; } :host(:popover-open) { display: block; opacity: 1; } :host(:is(:state(--bottom), :--bottom)) { transform-origin: top; } :host(:is(:state(--top), :--top)) { transform-origin: bottom; } :host(:is(:state(--shift-down), :--shift-down)) { margin-top: calc(0px - var(--m3e-menu-container-padding-block, ${DesignToken.measurement.space50})); } :host(:is(:state(--shift-up), :--shift-up)) { margin-top: var(--m3e-menu-container-padding-block, ${DesignToken.measurement.space50}); } :host(:is(:state(--vibrant), :--vibrant)) { background-color: var(--m3e-vibrant-menu-container-color, ${DesignToken.color.tertiaryContainer}); --m3e-menu-item-color: var(--m3e-vibrant-menu-item-color, ${DesignToken.color.onTertiaryContainer}); --m3e-menu-item-container-hover-color: var( --m3e-vibrant-menu-item-container-hover-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-menu-item-container-focus-color: var( --m3e-vibrant-menu-item-container-focus-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-menu-item-ripple-color: var(--m3e-vibrant-menu-item-ripple-color, ${DesignToken.color.onTertiaryContainer}); --m3e-menu-item-active-state-layer-color: var( --m3e-vibrant-menu-item-active-state-layer-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-menu-item-selected-color: var(--m3e-vibrant-menu-item-selected-color, ${DesignToken.color.onTertiary}); --m3e-menu-item-selected-container-color: var( --m3e-vibrant-menu-item-selected-container-color, ${DesignToken.color.tertiary} ); --m3e-menu-item-selected-container-hover-color: var( --m3e-vibrant-menu-item-selected-container-hover-color, ${DesignToken.color.onTertiary} ); --m3e-menu-item-container-selected-focus-color: var( --m3e-vibrant-menu-item-selected-container-focus-color, ${DesignToken.color.onTertiary} ); --m3e-menu-item-selected-ripple-color: var( --m3e-vibrant-menu-item-selected-ripple-color, ${DesignToken.color.onTertiary} ); --m3e-menu-item-disabled-color: var( --m3e-vibrant-menu-item-disabled-color, ${DesignToken.color.onTertiaryContainer} ); } :host(:is(:state(--standard), :--standard)) { background-color: var(--m3e-menu-container-color, ${DesignToken.color.surfaceContainer}); } @starting-style { :host(:popover-open) { opacity: 0; } } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: none; } :host(:not([submenu]):popover-open) { animation: none; } } @media (forced-colors: active) { :host { background-color: Menu; color: MenuText; outline: 1px solid MenuText; } }`;
__decorate([property({
  attribute: "position-x"
})], M3eMenuElement.prototype, "positionX", void 0);
__decorate([property({
  attribute: "position-y"
})], M3eMenuElement.prototype, "positionY", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eMenuElement.prototype, "variant", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eMenuElement.prototype, "submenu", void 0);
M3eMenuElement = M3eMenuElement_1 = __decorate([customElement("m3e-menu")], M3eMenuElement);

var _M3eMenuItemCheckboxElement_instances, _M3eMenuItemCheckboxElement_clickHandler, _M3eMenuItemCheckboxElement_keyDownHandler, _M3eMenuItemCheckboxElement_keyUpHandler, _M3eMenuItemCheckboxElement_mouseEnterHandler, _M3eMenuItemCheckboxElement_spacePressed, _M3eMenuItemCheckboxElement_handleIconSlotChange, _M3eMenuItemCheckboxElement_handleTrailingIconSlotChange, _M3eMenuItemCheckboxElement_handleClick, _M3eMenuItemCheckboxElement_handleKeyDown, _M3eMenuItemCheckboxElement_handleKeyUp, _M3eMenuItemCheckboxElement_handleMouseEnter;
/**
 * An item of a menu which supports a checkable state.
 *
 * @description
 * The `m3e-menu-item-checkbox` component represents a menu item that supports an independent checkable state.
 * It allows users to toggle options on or off without affecting other items in the menu, making it ideal for
 * multi-select scenarios such as filters, visibility toggles, or feature flags. This component encodes a persistent
 * selection contract and can coexist with other checkbox or radio items within the same menu.
 *
 * @example
 * The following example illustrates use of the `m3e-menu-item-checkbox` to present multiple independent checkable
 * items in a menu.
 * ```html
 * <m3e-button>
 *   <m3e-menu-trigger for="menu">Format</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu">
 *   <m3e-menu-item-checkbox>Bold</m3e-menu-item-checkbox>
 *   <m3e-menu-item-checkbox>Italic</m3e-menu-item-checkbox>
 *   <m3e-menu-item-checkbox>Underline</m3e-menu-item-checkbox>
 * </m3e-menu>
 * ```
 *
 * @tag m3e-menu-item-checkbox
 *
 * @slot - Renders the label of the item.
 * @slot icon - Renders an icon before the items's label.
 * @slot trailing-icon - Renders an icon after the item's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr checked - Whether the element is checked.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-menu-item-container-height - Height of the menu item container.
 * @cssprop --m3e-menu-item-color - Text color for unselected, enabled menu items.
 * @cssprop --m3e-menu-item-container-hover-color - State layer hover color for unselected items.
 * @cssprop --m3e-menu-item-container-focus-color - State layer focus color for unselected items.
 * @cssprop --m3e-menu-item-ripple-color - Ripple color for unselected items.
 * @cssprop --m3e-menu-item-selected-color - Text color for selected items.
 * @cssprop --m3e-menu-item-selected-container-color - Background color for selected items.
 * @cssprop --m3e-menu-item-selected-container-hover-color - State layer hover color for selected items.
 * @cssprop --m3e-menu-item-selected-container-focus-color - State layer focus color for selected items.
 * @cssprop --m3e-menu-item-selected-ripple-color - Ripple color for selected items.
 * @cssprop --m3e-menu-item-active-state-layer-color - State layer color for expanded items.
 * @cssprop --m3e-menu-item-active-state-layer-opacity - State layer opacity for expanded items.
 * @cssprop --m3e-menu-item-disabled-color - Base color for disabled items.
 * @cssprop --m3e-menu-item-disabled-opacity - Opacity percentage for disabled item color mix.
 * @cssprop --m3e-vibrant-menu-item-color - Text color for unselected, enabled menu items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-container-hover-color - State layer hover color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-container-focus-color - State layer focus color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-ripple-color - Ripple color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-color - Text color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-color - Background color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-hover-color - State layer hover color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-focus-color - State layer focus color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-ripple-color - Ripple color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-active-state-layer-color - State layer color for expanded items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-disabled-color - Base color for disabled items for vibrant variant
 * @cssprop --m3e-menu-item-icon-label-space - Horizontal gap between icon and content.
 * @cssprop --m3e-menu-item-padding-start - Start padding for the item wrapper.
 * @cssprop --m3e-menu-item-padding-end - End padding for the item wrapper.
 * @cssprop --m3e-menu-item-label-text-font-size - Font size for menu item text.
 * @cssprop --m3e-menu-item-label-text-font-weight - Font weight for menu item text.
 * @cssprop --m3e-menu-item-label-text-line-height - Line height for menu item text.
 * @cssprop --m3e-menu-item-label-text-tracking - Letter spacing for menu item text.
 * @cssprop --m3e-menu-item-focus-ring-shape - Border radius for the focus ring.
 * @cssprop --m3e-menu-item-icon-size - Font size for leading and trailing icons.
 * @cssprop --m3e-menu-item-shape - Base shape of the menu item.
 * @cssprop --m3e-menu-item-selected-shape - Shape used for a selected menu item.
 * @cssprop --m3e-menu-item-first-child-shape - Shape for the first menu item in a menu.
 * @cssprop --m3e-menu-item-last-child-shape - Shape for the last menu item in a menu.
 */
let M3eMenuItemCheckboxElement = class M3eMenuItemCheckboxElement extends Checked(Role(MenuItemElementBase, "menuitemcheckbox")) {
  constructor() {
    super(...arguments);
    _M3eMenuItemCheckboxElement_instances.add(this);
    /** @internal */
    _M3eMenuItemCheckboxElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_instances, "m", _M3eMenuItemCheckboxElement_handleClick).call(this, e));
    /** @internal */
    _M3eMenuItemCheckboxElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_instances, "m", _M3eMenuItemCheckboxElement_handleKeyDown).call(this, e));
    /** @internal */
    _M3eMenuItemCheckboxElement_keyUpHandler.set(this, () => __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_instances, "m", _M3eMenuItemCheckboxElement_handleKeyUp).call(this));
    /** @internal */
    _M3eMenuItemCheckboxElement_mouseEnterHandler.set(this, () => __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_instances, "m", _M3eMenuItemCheckboxElement_handleMouseEnter).call(this));
    /** @internal */
    _M3eMenuItemCheckboxElement_spacePressed.set(this, false);
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_clickHandler, "f"));
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_keyDownHandler, "f"));
    this.addEventListener("keyup", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_keyUpHandler, "f"));
    this.addEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_mouseEnterHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_clickHandler, "f"));
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_keyDownHandler, "f"));
    this.removeEventListener("keyup", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_keyUpHandler, "f"));
    this.removeEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_mouseEnterHandler, "f"));
  }
  /** @internal @inheritdoc */
  _renderContent() {
    return html`<div class="icon"><svg class="check" viewBox="0 -960 960 960" aria-hidden="true"><path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg><slot name="icon" @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_instances, "m", _M3eMenuItemCheckboxElement_handleIconSlotChange)}"></slot></div><slot></slot><slot name="trailing-icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_instances, "m", _M3eMenuItemCheckboxElement_handleTrailingIconSlotChange)}"></slot>`;
  }
};
_M3eMenuItemCheckboxElement_clickHandler = new WeakMap();
_M3eMenuItemCheckboxElement_keyDownHandler = new WeakMap();
_M3eMenuItemCheckboxElement_keyUpHandler = new WeakMap();
_M3eMenuItemCheckboxElement_mouseEnterHandler = new WeakMap();
_M3eMenuItemCheckboxElement_spacePressed = new WeakMap();
_M3eMenuItemCheckboxElement_instances = new WeakSet();
_M3eMenuItemCheckboxElement_handleIconSlotChange = function _M3eMenuItemCheckboxElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eMenuItemCheckboxElement_handleTrailingIconSlotChange = function _M3eMenuItemCheckboxElement_handleTrailingIconSlotChange(e) {
  setCustomState(this, "--with-trailing-icon", hasAssignedNodes(e.target));
};
_M3eMenuItemCheckboxElement_handleClick = function _M3eMenuItemCheckboxElement_handleClick(e) {
  if (!e.defaultPrevented) {
    this.checked = !this.checked;
    this.performUpdate();
    if (!__classPrivateFieldGet(this, _M3eMenuItemCheckboxElement_spacePressed, "f")) {
      if (!prefersReducedMotion()) {
        setTimeout(() => this.menu?.hideAll(true), 150);
      } else {
        this.menu?.hideAll(true);
      }
    }
  }
};
_M3eMenuItemCheckboxElement_handleKeyDown = function _M3eMenuItemCheckboxElement_handleKeyDown(e) {
  __classPrivateFieldSet(this, _M3eMenuItemCheckboxElement_spacePressed, e.key === " ", "f");
};
_M3eMenuItemCheckboxElement_handleKeyUp = function _M3eMenuItemCheckboxElement_handleKeyUp() {
  __classPrivateFieldSet(this, _M3eMenuItemCheckboxElement_spacePressed, false, "f");
};
_M3eMenuItemCheckboxElement_handleMouseEnter = function _M3eMenuItemCheckboxElement_handleMouseEnter() {
  this.menu?.items.forEach(item => {
    if (item instanceof M3eMenuItemElement && item.submenu?.isOpen) {
      item.submenu.hide();
    }
  });
};
/** The styles of the element. */
M3eMenuItemCheckboxElement.styles = [MenuItemElementBase.styles, css`.icon { display: flex; align-items: center; justify-content: center; transition: margin-inline-start ${DesignToken.motion.spring.fastEffects}; } :host(:not(:is(:state(--with-icon), :--with-icon))) .icon { margin-inline-start: calc(0px - var(--m3e-menu-item-icon-label-space, ${DesignToken.measurement.space150})); } .check { width: 1em; font-size: var(--m3e-menu-item-icon-size, 20px) !important; } :host(:not([checked])) .check { display: none; } :host([checked]) .icon { margin-inline-start: 0; } :host([checked]) ::slotted([slot="icon"]) { display: none !important; } @media (prefers-reduced-motion) { .icon { transition: none; } }`];
M3eMenuItemCheckboxElement = __decorate([customElement("m3e-menu-item-checkbox")], M3eMenuItemCheckboxElement);

/**
 * Groups related items (such a radios) in a menu.
 *
 * @description
 * The `m3e-menu-item-group` component groups related items within a menu, establishing a shared
 * context for interaction and selection. It enables separation of concerns—such as organizing radio
 * items into mutually exclusive sets.
 *
 * @tag m3e-menu-item-group
 *
 * @slot - Renders the contents of the group.
 */
let M3eMenuItemGroupElement = class M3eMenuItemGroupElement extends Role(LitElement, "group") {
  /** @inheritdoc */
  render() {
    return html`<slot></slot>`;
  }
};
/** The styles of the element. */
M3eMenuItemGroupElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; }`;
M3eMenuItemGroupElement = __decorate([customElement("m3e-menu-item-group")], M3eMenuItemGroupElement);

var _M3eMenuItemRadioElement_instances, _M3eMenuItemRadioElement_clickHandler, _M3eMenuItemRadioElement_keyDownHandler, _M3eMenuItemRadioElement_keyUpHandler, _M3eMenuItemRadioElement_mouseEnterHandler, _M3eMenuItemRadioElement_spacePressed, _M3eMenuItemRadioElement_handleIconSlotChange, _M3eMenuItemRadioElement_handleTrailingIconSlotChange, _M3eMenuItemRadioElement_handleClick, _M3eMenuItemRadioElement_handleKeyDown, _M3eMenuItemRadioElement_handleKeyUp, _M3eMenuItemRadioElement_handleMouseEnter;
/**
 * An item of a menu which supports a mutually exclusive checkable state.
 *
 * @description
 * The `m3e-menu-item-radio` component represents a selectable menu item that participates in a mutually exclusive group.
 * It reflects a singular choice within a shared context—such as sort order, theme selection, or view mode—and updates
 * group state when selected. This component can be nested within an `m3e-menu-item-group`, allowing multiple exclusive
 * groups to coexist within a single menu.
 *
 * @example
 * The following example illustrates use of the `m3e-menu-item-radio` in a `m3e-menu` to allow a user to select a sort order.
 * The `m3e-menu-trigger` is used to trigger a `m3e-menu` specified by the `for` attribute when its parenting element is activated.
 * ```html
 * <m3e-button>
 *  <m3e-menu-trigger for="menu">Sort order</m3e-menu-trigger>
 * </m3e-button>
 * <m3e-menu id="menu">
 *  <m3e-menu-item-radio>Ascending</m3e-menu-item-radio>
 *  <m3e-menu-item-radio>Descending</m3e-menu-item-radio>
 * </m3e-menu>
 * ```
 *
 * @tag m3e-menu-item-radio
 *
 * @slot - Renders the label of the item.
 * @slot icon - Renders an icon before the items's label.
 * @slot trailing-icon - Renders an icon after the item's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr checked - Whether the element is checked.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-menu-item-container-height - Height of the menu item container.
 * @cssprop --m3e-menu-item-color - Text color for unselected, enabled menu items.
 * @cssprop --m3e-menu-item-container-hover-color - State layer hover color for unselected items.
 * @cssprop --m3e-menu-item-container-focus-color - State layer focus color for unselected items.
 * @cssprop --m3e-menu-item-ripple-color - Ripple color for unselected items.
 * @cssprop --m3e-menu-item-selected-color - Text color for selected items.
 * @cssprop --m3e-menu-item-selected-container-color - Background color for selected items.
 * @cssprop --m3e-menu-item-selected-container-hover-color - State layer hover color for selected items.
 * @cssprop --m3e-menu-item-selected-container-focus-color - State layer focus color for selected items.
 * @cssprop --m3e-menu-item-selected-ripple-color - Ripple color for selected items.
 * @cssprop --m3e-menu-item-active-state-layer-color - State layer color for expanded items.
 * @cssprop --m3e-menu-item-active-state-layer-opacity - State layer opacity for expanded items.
 * @cssprop --m3e-menu-item-disabled-color - Base color for disabled items.
 * @cssprop --m3e-menu-item-disabled-opacity - Opacity percentage for disabled item color mix.
 * @cssprop --m3e-vibrant-menu-item-color - Text color for unselected, enabled menu items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-container-hover-color - State layer hover color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-container-focus-color - State layer focus color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-ripple-color - Ripple color for unselected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-color - Text color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-color - Background color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-hover-color - State layer hover color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-container-focus-color - State layer focus color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-selected-ripple-color - Ripple color for selected items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-active-state-layer-color - State layer color for expanded items for vibrant variant.
 * @cssprop --m3e-vibrant-menu-item-disabled-color - Base color for disabled items for vibrant variant
 * @cssprop --m3e-menu-item-icon-label-space - Horizontal gap between icon and content.
 * @cssprop --m3e-menu-item-padding-start - Start padding for the item wrapper.
 * @cssprop --m3e-menu-item-padding-end - End padding for the item wrapper.
 * @cssprop --m3e-menu-item-label-text-font-size - Font size for menu item text.
 * @cssprop --m3e-menu-item-label-text-font-weight - Font weight for menu item text.
 * @cssprop --m3e-menu-item-label-text-line-height - Line height for menu item text.
 * @cssprop --m3e-menu-item-label-text-tracking - Letter spacing for menu item text.
 * @cssprop --m3e-menu-item-focus-ring-shape - Border radius for the focus ring.
 * @cssprop --m3e-menu-item-icon-size - Font size for leading and trailing icons.
 * @cssprop --m3e-menu-item-shape - Base shape of the menu item.
 * @cssprop --m3e-menu-item-selected-shape - Shape used for a selected menu item.
 * @cssprop --m3e-menu-item-first-child-shape - Shape for the first menu item in a menu.
 * @cssprop --m3e-menu-item-last-child-shape - Shape for the last menu item in a menu.
 */
let M3eMenuItemRadioElement = class M3eMenuItemRadioElement extends Checked(Role(MenuItemElementBase, "menuitemradio")) {
  constructor() {
    super(...arguments);
    _M3eMenuItemRadioElement_instances.add(this);
    /** @private */
    _M3eMenuItemRadioElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuItemRadioElement_instances, "m", _M3eMenuItemRadioElement_handleClick).call(this, e));
    /** @private */
    _M3eMenuItemRadioElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eMenuItemRadioElement_instances, "m", _M3eMenuItemRadioElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eMenuItemRadioElement_keyUpHandler.set(this, () => __classPrivateFieldGet(this, _M3eMenuItemRadioElement_instances, "m", _M3eMenuItemRadioElement_handleKeyUp).call(this));
    /** @private */
    _M3eMenuItemRadioElement_mouseEnterHandler.set(this, () => __classPrivateFieldGet(this, _M3eMenuItemRadioElement_instances, "m", _M3eMenuItemRadioElement_handleMouseEnter).call(this));
    /** @private */
    _M3eMenuItemRadioElement_spacePressed.set(this, false);
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_clickHandler, "f"));
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_keyDownHandler, "f"));
    this.addEventListener("keyup", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_keyUpHandler, "f"));
    this.addEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_mouseEnterHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_clickHandler, "f"));
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_keyDownHandler, "f"));
    this.removeEventListener("keyup", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_keyUpHandler, "f"));
    this.removeEventListener("mouseenter", __classPrivateFieldGet(this, _M3eMenuItemRadioElement_mouseEnterHandler, "f"));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("checked") && this.checked) {
      (this.closest("[role='group']") ?? this.closest("m3e-menu"))?.querySelectorAll("m3e-menu-item-radio").forEach(x => {
        if (x !== this && x.checked) {
          x.checked = false;
        }
      });
    }
  }
  /** @internal @inheritdoc */
  _renderContent() {
    return html`<div class="icon"><svg class="check" viewBox="0 -960 960 960" aria-hidden="true"><path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg><slot name="icon" @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemRadioElement_instances, "m", _M3eMenuItemRadioElement_handleIconSlotChange)}"></slot></div><slot></slot><slot name="trailing-icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eMenuItemRadioElement_instances, "m", _M3eMenuItemRadioElement_handleTrailingIconSlotChange)}"></slot>`;
  }
};
_M3eMenuItemRadioElement_clickHandler = new WeakMap();
_M3eMenuItemRadioElement_keyDownHandler = new WeakMap();
_M3eMenuItemRadioElement_keyUpHandler = new WeakMap();
_M3eMenuItemRadioElement_mouseEnterHandler = new WeakMap();
_M3eMenuItemRadioElement_spacePressed = new WeakMap();
_M3eMenuItemRadioElement_instances = new WeakSet();
_M3eMenuItemRadioElement_handleIconSlotChange = function _M3eMenuItemRadioElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eMenuItemRadioElement_handleTrailingIconSlotChange = function _M3eMenuItemRadioElement_handleTrailingIconSlotChange(e) {
  setCustomState(this, "--with-trailing-icon", hasAssignedNodes(e.target));
};
_M3eMenuItemRadioElement_handleClick = function _M3eMenuItemRadioElement_handleClick(e) {
  if (!e.defaultPrevented) {
    this.checked = true;
    this.performUpdate();
    if (!__classPrivateFieldGet(this, _M3eMenuItemRadioElement_spacePressed, "f")) {
      if (!prefersReducedMotion()) {
        setTimeout(() => this.menu?.hideAll(true), 150);
      } else {
        this.menu?.hideAll(true);
      }
    }
  }
};
_M3eMenuItemRadioElement_handleKeyDown = function _M3eMenuItemRadioElement_handleKeyDown(e) {
  __classPrivateFieldSet(this, _M3eMenuItemRadioElement_spacePressed, e.key === " ", "f");
};
_M3eMenuItemRadioElement_handleKeyUp = function _M3eMenuItemRadioElement_handleKeyUp() {
  __classPrivateFieldSet(this, _M3eMenuItemRadioElement_spacePressed, false, "f");
};
_M3eMenuItemRadioElement_handleMouseEnter = function _M3eMenuItemRadioElement_handleMouseEnter() {
  this.menu?.items.forEach(item => {
    if (item instanceof M3eMenuItemElement && item.submenu?.isOpen) {
      item.submenu.hide();
    }
  });
};
/** The styles of the element. */
M3eMenuItemRadioElement.styles = M3eMenuItemCheckboxElement.styles;
M3eMenuItemRadioElement = __decorate([customElement("m3e-menu-item-radio")], M3eMenuItemRadioElement);

export { M3eMenuElement, M3eMenuItemCheckboxElement, M3eMenuItemElement, M3eMenuItemGroupElement, M3eMenuItemRadioElement, M3eMenuTriggerElement, isMenuPositionX, isMenuPositionY, isMenuVariant };
//# sourceMappingURL=menu.js.map
