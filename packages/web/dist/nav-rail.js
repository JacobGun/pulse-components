/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet } from 'tslib';
import { css, unsafeCSS, LitElement } from 'lit';
import { DesignToken, customElement, SuppressInitialAnimation, setCustomState, HtmlFor, ActionElementBase } from './TextOverflowElement.js';
import 'lit/decorators.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import 'lit/directives/if-defined.js';
import { RovingTabIndexManager, selectionManager, M3eInteractivityChecker, addAriaReferencedId, removeAriaReferencedId } from './LiveAnnouncer.js';
import { M3eNavBarElement } from './NavItemElement.js';

var _M3eNavRailElement_instances, _M3eNavRailElement_focusKeyManager, _M3eNavRailElement_keyDownHandler, _M3eNavRailElement_handleKeyDown;
/**
 * A vertical bar, typically used on larger devices, that allows a user to switch between views.
 *
 * @description
 * The `m3e-nav-rail` component provides a vertical navigation rail for switching between views in
 * an application. Designed for larger devices, it supports compact and expanded modes, interactive
 * items, and theming via CSS custom properties.
 *
 * @example
 * The following example illustrates a nav rail whose expanded state is automatically determined by the
 * current screen size.  In addition, a toggle button is used to allow the user to manually toggle the
 * expanded state.
 *
 * ```html
 * <m3e-nav-rail id="nav-rail" mode="auto">
 *   <m3e-icon-button toggle>
 *     <m3e-icon name="menu"></m3e-icon>
 *     <m3e-icon slot="selected" name="menu_open"></m3e-icon>
 *     <m3e-nav-rail-toggle for="nav-rail"></m3e-nav-rail-toggle>
 *   </m3e-icon-button>
 *   <m3e-fab size="small">
 *     <m3e-icon name="edit"></m3e-icon>
 *     <span slot="label">Extended</span>
 *   </m3e-fab>
 *   <m3e-nav-item><m3e-icon slot="icon" name="news"></m3e-icon>News</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="globe"></m3e-icon>Global</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="star"></m3e-icon>For you</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="newsstand"></m3e-icon>Trending</m3e-nav-item>
 * </m3e-nav-rail>
 * ```
 *
 * @tag m3e-nav-rail
 *
 * @attr mode - The mode in which items in the rail are presented.
 *
 * @fires beforeinput - Dispatched before the selected state of an item changes.
 * @fires input - Dispatched when the selected state of an item changes.
 * @fires change - Dispatched when the selected state of an item changes.
 *
 * @cssprop --m3e-nav-rail-top-space - Top block padding for the nav rail.
 * @cssprop --m3e-nav-rail-bottom-space - Bottom block padding for the nav rail.
 * @cssprop --m3e-nav-rail-compact-width - Width of the nav rail in compact mode.
 * @cssprop --m3e-nav-rail-inline-padding - Inline padding for nav rail.
 * @cssprop --m3e-nav-rail-expanded-width - Width of the nav rail in expanded mode.
 * @cssprop --m3e-nav-rail-expanded-item-height - Height of nav items in expanded mode.
 * @cssprop --m3e-nav-rail-button-item-space - Space below icon buttons and FABs.
 * @cssprop --m3e-nav-rail-icon-button-inset - Inset for icon buttons.
 * @cssprop --m3e-nav-rail-expanded-inline-padding - Deprecated, use `--m3e-nav-rail-inline-padding`.
 * @cssprop --m3e-nav-rail-expanded-min-width - Deprecated, use `--m3e-nav-rail-expanded-width`.
 * @cssprop --m3e-nav-rail-expanded-max-width - Deprecated, use `--m3e-nav-rail-expanded-width`.
 * @cssprop --m3e-nav-rail-expanded-icon-button-inset - Deprecated, use `--m3e-nav-rail-icon-button-inset`.
 */
let M3eNavRailElement = class M3eNavRailElement extends SuppressInitialAnimation(M3eNavBarElement) {
  constructor() {
    super();
    _M3eNavRailElement_instances.add(this);
    /** @private */
    _M3eNavRailElement_focusKeyManager.set(this, new RovingTabIndexManager().withHomeAndEnd().withWrap());
    /** @private */
    _M3eNavRailElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eNavRailElement_instances, "m", _M3eNavRailElement_handleKeyDown).call(this, e));
    this[selectionManager].onSelectedItemsChange(() => {
      __classPrivateFieldGet(this, _M3eNavRailElement_focusKeyManager, "f").updateActiveItem(this[selectionManager].activeItem);
    });
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eNavRailElement_keyDownHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eNavRailElement_keyDownHandler, "f"));
  }
  /** @inheritdoc @internal */
  _updateItems() {
    const items = M3eInteractivityChecker.findInteractiveElements(this, true);
    const {
      added
    } = __classPrivateFieldGet(this, _M3eNavRailElement_focusKeyManager, "f").setItems(items);
    if (!__classPrivateFieldGet(this, _M3eNavRailElement_focusKeyManager, "f").activeItem) {
      const active = added.find(x => !x.hasAttribute("disabled"));
      if (active) {
        __classPrivateFieldGet(this, _M3eNavRailElement_focusKeyManager, "f").updateActiveItem(active);
      }
    }
    this.items.forEach((x, i) => setCustomState(x, "--first", i === 0));
    super._updateItems();
  }
  /** @inheritdoc @internal */
  _updateOrientation(orientation) {
    super._updateOrientation(orientation);
    this.querySelectorAll("m3e-fab").forEach(x => x.toggleAttribute("extended", orientation === "horizontal"));
  }
};
_M3eNavRailElement_focusKeyManager = new WeakMap();
_M3eNavRailElement_keyDownHandler = new WeakMap();
_M3eNavRailElement_instances = new WeakSet();
_M3eNavRailElement_handleKeyDown = function _M3eNavRailElement_handleKeyDown(e) {
  __classPrivateFieldGet(this, _M3eNavRailElement_focusKeyManager, "f").onKeyDown(e);
};
(() => {
  registerStyleSheet(css`m3e-nav-rail > m3e-icon-button, m3e-nav-rail > m3e-fab { margin-block-end: var(--m3e-nav-rail-button-item-space, ${DesignToken.measurement.space200}); } m3e-nav-rail > m3e-icon-button { margin-inline-start: var(--m3e-nav-rail-icon-button-inset, ${DesignToken.measurement.space100}); }`);
})();
/** The styles of the element. */
M3eNavRailElement.styles = css`:host { display: block; overflow-x: hidden; overflow-y: auto; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; } :host([hidden]) { display: none; } :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: ${unsafeCSS(`width ${DesignToken.motion.spring.defaultSpatial}`)}; } .base { contain: layout style; display: flex; width: inherit; flex-direction: column; align-items: flex-start; box-sizing: border-box; padding-block-start: var(--m3e-nav-rail-top-space, ${DesignToken.measurement.space550}); padding-block-end: var(--m3e-nav-rail-bottom-space, ${DesignToken.measurement.space100}); padding-inline: var(--m3e-nav-rail-inline-padding, ${DesignToken.measurement.space250}); } :host(:is(:state(--compact), :--compact)) { width: var(--m3e-nav-rail-compact-width, 96px); } :host(:is(:state(--compact), :--compact)) .base { --_vertical-nav-item-width: var(--m3e-nav-rail-compact-width, 96px); --_vertical-nav-item-margin-inline: calc( 0px - var(--m3e-nav-rail-inline-padding, ${DesignToken.measurement.space250}) ); --_vertical-nav-item-inset-start: calc(50% - calc(var(--m3e-vertical-nav-item-active-indicator-width, 56px)) / 2); } :host(:not(:is(:state(--compact), :--compact))) { width: var(--m3e-nav-rail-expanded-width, 220px); } :host(:not(:is(:state(--compact), :--compact))) { --m3e-horizontal-nav-item-active-indicator-height: var(--m3e-nav-rail-expanded-item-height, 56px); --_nav-item-align-self: stretch; --_nav-item-justify-content: flex-start; } ::slotted(*) { flex: none; } ::slotted(m3e-fab) { --m3e-fab-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-disabled-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-focus-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-pressed-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-hover-container-elevation: ${DesignToken.elevation.level1}; --m3e-fab-lowered-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-lowered-disabled-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-lowered-focus-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-lowered-pressed-container-elevation: ${DesignToken.elevation.level0}; --m3e-fab-lowered-hover-container-elevation: ${DesignToken.elevation.level1}; } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: none; } }`;
M3eNavRailElement = __decorate([customElement("m3e-nav-rail")], M3eNavRailElement);

var _M3eNavRailToggleElement_instances, _M3eNavRailToggleElement_modeChangeHandler, _M3eNavRailToggleElement_updateToggle;
/**
 * An element, nested within a clickable element, used to toggle the expanded state of a navigation rail.
 *
 * @example
 * The following example illustrates a nav rail whose expanded state is automatically determined by the
 * current screen size.  In addition, a toggle button is used to allow the user to manually toggle the
 * expanded state.
 *
 * ```html
 * <m3e-nav-rail id="nav-rail" mode="auto">
 *   <m3e-icon-button toggle>
 *     <m3e-icon name="menu"></m3e-icon>
 *     <m3e-icon slot="selected" name="menu_open"></m3e-icon>
 *     <m3e-nav-rail-toggle for="nav-rail"></m3e-nav-rail-toggle>
 *   </m3e-icon-button>
 *   <m3e-fab size="small">
 *     <m3e-icon name="edit"></m3e-icon>
 *     <span slot="label">Extended</span>
 *   </m3e-fab>
 *   <m3e-nav-item><m3e-icon slot="icon" name="news"></m3e-icon>News</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="globe"></m3e-icon>Global</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="star"></m3e-icon>For you</m3e-nav-item>
 *   <m3e-nav-item><m3e-icon slot="icon" name="newsstand"></m3e-icon>Trending</m3e-nav-item>
 * </m3e-nav-rail>
 * ```
 *
 * @tag m3e-nav-rail-toggle
 */
let M3eNavRailToggleElement = class M3eNavRailToggleElement extends HtmlFor(ActionElementBase) {
  constructor() {
    super(...arguments);
    _M3eNavRailToggleElement_instances.add(this);
    /** @private */
    _M3eNavRailToggleElement_modeChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eNavRailToggleElement_instances, "m", _M3eNavRailToggleElement_updateToggle).call(this));
  }
  /** @inheritdoc */
  attach(control) {
    if (control instanceof M3eNavRailElement) {
      control.addEventListener("mode-change", __classPrivateFieldGet(this, _M3eNavRailToggleElement_modeChangeHandler, "f"));
    }
    if (this.htmlFor && this.parentElement) {
      addAriaReferencedId(this.parentElement, "aria-controls", this.htmlFor);
    }
    super.attach(control);
    __classPrivateFieldGet(this, _M3eNavRailToggleElement_instances, "m", _M3eNavRailToggleElement_updateToggle).call(this);
  }
  /** @inheritdoc */
  detach() {
    this.control?.removeEventListener("mode-change", __classPrivateFieldGet(this, _M3eNavRailToggleElement_modeChangeHandler, "f"));
    if (this.parentElement) {
      if (this.htmlFor) {
        removeAriaReferencedId(this.parentElement, "aria-controls", this.htmlFor);
      }
      this.parentElement.ariaExpanded = null;
    }
    super.detach();
  }
  /** @inheritdoc */
  _onClick() {
    if (this.control instanceof M3eNavRailElement) {
      this.control.currentMode = this.control.currentMode === "compact" ? "expanded" : "compact";
    }
  }
};
_M3eNavRailToggleElement_modeChangeHandler = new WeakMap();
_M3eNavRailToggleElement_instances = new WeakSet();
_M3eNavRailToggleElement_updateToggle = /** @private */
async function _M3eNavRailToggleElement_updateToggle() {
  if (!this.parentElement) return;
  const selected = this.control instanceof M3eNavRailElement && this.control.currentMode === "expanded";
  this.parentElement.ariaExpanded = `${selected}`;
  if (this.parentElement.hasAttribute("toggle")) {
    this.parentElement.toggleAttribute("selected", selected);
  }
  if (this.parentElement instanceof LitElement) {
    // Wait for update and remove aria-pressed due to use of aria-expanded.
    await this.parentElement.updateComplete;
    this.parentElement.ariaPressed = null;
  }
};
M3eNavRailToggleElement = __decorate([customElement("m3e-nav-rail-toggle")], M3eNavRailToggleElement);

export { M3eNavRailElement, M3eNavRailToggleElement };
//# sourceMappingURL=nav-rail.js.map
