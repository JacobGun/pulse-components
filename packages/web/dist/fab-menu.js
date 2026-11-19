/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { SuppressInitialAnimation, AttachInternals, Role, ScrollController, ClickOutsideController, setCustomState, setCustomEnumState, hasCustomState, prefersReducedMotion, DesignToken, customElement, Disabled, HtmlFor, ActionElementBase } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { RovingTabIndexManager, addAriaReferencedId, removeAriaReferencedId } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';
import { positionAnchor } from './FloatingPanelElement.js';
import { KeyboardClick } from './KeyboardClick.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';

/**
 * Determines whether a value is a `FabMenuVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `FabMenuVariant`.
 */
function isFabMenuVariant(value) {
  return value === "primary" || value === "secondary" || value === "tertiary";
}

var _M3eFabMenuElement_instances, _M3eFabMenuElement_fabTabIndex, _M3eFabMenuElement_trigger, _M3eFabMenuElement_anchoringCleanup, _M3eFabMenuElement_listManager, _M3eFabMenuElement_keyDownHandler, _M3eFabMenuElement_transitionEndHandler, _M3eFabMenuElement_scrollController, _M3eFabMenuElement_clickOutsideController, _M3eFabMenuElement_toggleHandler, _M3eFabMenuElement_applyVariant, _M3eFabMenuElement_handleSlotChange, _M3eFabMenuElement_items, _M3eFabMenuElement_animates, _M3eFabMenuElement_stagger, _M3eFabMenuElement_grow, _M3eFabMenuElement_pin, _M3eFabMenuElement_unpin, _M3eFabMenuElement_handleTransitionEnd, _M3eFabMenuElement_handleKeyDown, _M3eFabMenuElement_attachFab, _M3eFabMenuElement_detachFab;
/**
 * Returns when each item of a menu appears or disappears, as in Compose's `FloatingActionButtonMenu`: a counter animates
 * between 0 and the number of items with the slow effects spring (damping ratio 1, stiffness 800 in both motion
 * schemes) and is truncated to an integer, and an item shows while the counter is at least the number of items minus
 * its index. The counter reaches the number of items only when its animation ends, at a remaining distance of 1, so the
 * top two items appear together.
 * @param {number} count The number of items.
 * @param {boolean} open Whether the menu is opening.
 * @returns {Array<number>} The delay of each item, from top to bottom, in whole milliseconds as Compose advances the
 * counter.
 */
function staggerDelays(count, open) {
  const w = Math.sqrt(800);
  // The time, in milliseconds, at which the remaining distance of the counter, count * (1 + wt) * e^-wt, drops to
  // `remaining`.
  const crossing = remaining => {
    if (remaining >= count) return 0;
    let [low, high] = [0, 1];
    for (let i = 0; i < 40; i++) {
      const mid = (low + high) / 2;
      if (count * (1 + w * mid) * Math.exp(-w * mid) > remaining) low = mid;else high = mid;
    }
    return high * 1000;
  };
  // The animation snaps to its target at its estimated duration, truncated to a whole millisecond.
  const end = Math.floor(crossing(1));
  return Array.from({
    length: count
  }, (_, i) => Math.min(Math.ceil(crossing(open ? Math.max(i, 1) : count - i)), end));
}
/**
 * A menu, opened from a floating action button (FAB), used to display multiple related actions.
 *
 * @description
 * The `m3e-fab-menu` component presents a dynamic menu of related actions, elegantly revealed from a
 * floating action button (FAB). Designed using expressive, adaptive surfaces, it enables seamless access
 * to contextual actions in modern, visually rich interfaces.
 *
 * @example
 * The following example illustrates triggering a `m3e-fab-menu` from an `m3e-fab` using a `m3e-fab-menu-trigger`.
 * ```html
 * <m3e-fab variant="primary" size="large">
 *  <m3e-fab-menu-trigger for="fabmenu">
 *    <m3e-icon name="edit"></m3e-icon>
 *  </m3e-fab-menu-trigger>
 * </m3e-fab>
 * <m3e-fab-menu id="fabmenu" variant="secondary">
 *  <m3e-fab-menu-item>First</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Second</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Third</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Forth</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Fifth</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Sixth</m3e-fab-menu-item>
 * </m3e-fab-menu>
 * ```
 *
 * @tag m3e-fab-menu
 *
 * @slot - Renders the contents of the menu.
 *
 * @attr variant - The appearance variant of the menu.
 *
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-fab-menu-spacing - Vertical gap between menu items.
 * @cssprop --m3e-fab-menu-max-width - Maximum width of the menu.
 * @cssprop --m3e-primary-fab-color - Foreground color for primary variant items.
 * @cssprop --m3e-primary-fab-container-color - Container color for primary variant items.
 * @cssprop --m3e-primary-fab-hover-color - Hover background color for primary variant items.
 * @cssprop --m3e-primary-fab-focus-color - Focus background color for primary variant items.
 * @cssprop --m3e-primary-fab-ripple-color - Ripple color for primary variant items.
 * @cssprop --m3e-secondary-fab-color - Foreground color for secondary variant items.
 * @cssprop --m3e-secondary-fab-container-color - Container color for secondary variant items.
 * @cssprop --m3e-secondary-fab-hover-color - Hover background color for secondary variant items.
 * @cssprop --m3e-secondary-fab-focus-color - Focus background color for secondary variant items.
 * @cssprop --m3e-secondary-fab-ripple-color - Ripple color for secondary variant items.
 * @cssprop --m3e-tertiary-fab-color - Foreground color for tertiary variant items.
 * @cssprop --m3e-tertiary-fab-container-color - Container color for tertiary variant items.
 * @cssprop --m3e-tertiary-fab-hover-color - Hover background color for tertiary variant items.
 * @cssprop --m3e-tertiary-fab-focus-color - Focus background color for tertiary variant items.
 * @cssprop --m3e-tertiary-fab-ripple-color - Ripple color for tertiary variant items.
 */
let M3eFabMenuElement = class M3eFabMenuElement extends SuppressInitialAnimation(AttachInternals(Role(LitElement, "menu"))) {
  constructor() {
    super(...arguments);
    _M3eFabMenuElement_instances.add(this);
    /** @private */
    _M3eFabMenuElement_fabTabIndex.set(this, void 0);
    /** @private */
    _M3eFabMenuElement_trigger.set(this, void 0);
    /** @private */
    _M3eFabMenuElement_anchoringCleanup.set(this, void 0);
    /** @private */
    _M3eFabMenuElement_listManager.set(this, new RovingTabIndexManager().withWrap().withHomeAndEnd().withVerticalOrientation());
    /** @private */
    _M3eFabMenuElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eFabMenuElement_transitionEndHandler.set(this, e => __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_handleTransitionEnd).call(this, e));
    /** @private */
    _M3eFabMenuElement_scrollController.set(this, new ScrollController(this, {
      target: null,
      callback: () => this.hide()
    }));
    /** @private */
    _M3eFabMenuElement_clickOutsideController.set(this, new ClickOutsideController(this, {
      target: null,
      callback: () => this.hide()
    }));
    /** @private */
    _M3eFabMenuElement_toggleHandler.set(this, e => {
      switch (e.newState) {
        case "open":
          __classPrivateFieldGet(this, _M3eFabMenuElement_clickOutsideController, "f").observe(this);
          if (__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f")) {
            __classPrivateFieldGet(this, _M3eFabMenuElement_clickOutsideController, "f").observe(__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f"));
          }
          setTimeout(() => __classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").setActiveItem(__classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").items.find(x => !x.disabled)), 40);
          break;
        case "closed":
          __classPrivateFieldGet(this, _M3eFabMenuElement_clickOutsideController, "f").unobserveAll();
          __classPrivateFieldGet(this, _M3eFabMenuElement_anchoringCleanup, "f")?.call(this);
          __classPrivateFieldSet(this, _M3eFabMenuElement_anchoringCleanup, undefined, "f");
          break;
      }
    });
    /**
     * The appearance variant of the menu.
     * @default "primary"
     */
    this.variant = "primary";
  }
  /** Whether the menu is open. */
  get isOpen() {
    return __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f") !== undefined;
  }
  /**
   * Opens the menu.
   * @param {HTMLElement} trigger The element that triggered the menu.
   * @returns {Promise<void>} A `Promise` that resolves when the menu is opened.
   */
  async show(trigger) {
    if (__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f") && __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f") !== trigger) {
      this.hide();
    }
    __classPrivateFieldGet(this, _M3eFabMenuElement_anchoringCleanup, "f")?.call(this);
    __classPrivateFieldSet(this, _M3eFabMenuElement_anchoringCleanup, await positionAnchor(this, trigger, {
      position: "top-end",
      inline: true,
      shift: "main",
      offset: 8
    }, (x, y, position) => {
      setCustomState(this, "--right", position.includes("end"));
      setCustomState(this, "--left", position.includes("start"));
      if (M3eDirectionality.current === "rtl") {
        this.style.right = `${window.innerWidth - x - this.clientWidth}px`;
        this.style.left = "";
      } else {
        this.style.left = `${x}px`;
        this.style.right = "";
      }
      this.style.top = `${y}px`;
    }), "f");
    const items = __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_items).call(this);
    const animate = __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_animates).call(this);
    // A menu still closing keeps the widths its items close from, so they grow back from where they are.
    const closing = animate && getComputedStyle(this).display !== "none";
    __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_stagger).call(this, items, true);
    if (!closing) {
      __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_unpin).call(this, items);
    }
    this.showPopover();
    if (animate && !closing) {
      __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_grow).call(this, items);
    }
    __classPrivateFieldSet(this, _M3eFabMenuElement_trigger, trigger, "f");
    __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f").ariaExpanded = "true";
    __classPrivateFieldGet(this, _M3eFabMenuElement_scrollController, "f").observe(__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f"));
    __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_attachFab).call(this);
  }
  /**
   * Hides the menu.
   * @param {boolean} [restoreFocus=false] Whether to restore focus to the menu's trigger.
   */
  hide(restoreFocus = false) {
    __classPrivateFieldGet(this, _M3eFabMenuElement_anchoringCleanup, "f")?.call(this);
    __classPrivateFieldSet(this, _M3eFabMenuElement_anchoringCleanup, undefined, "f");
    if (__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f")) {
      __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f").ariaExpanded = "false";
      if (restoreFocus) {
        __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f").focus();
      }
      __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_detachFab).call(this);
      __classPrivateFieldGet(this, _M3eFabMenuElement_scrollController, "f").unobserve(__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f"));
      __classPrivateFieldSet(this, _M3eFabMenuElement_trigger, undefined, "f");
    }
    const items = __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_items).call(this);
    if (__classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_animates).call(this) && this.matches(":popover-open")) {
      __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_pin).call(this, items);
    }
    __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_stagger).call(this, items, false);
    this.hidePopover();
  }
  /**
   * Toggles the menu.
   * @param {HTMLElement} trigger The element that triggered the menu.
   * @returns {Promise<void>} A `Promise` that resolves when the menu is opened or closed.
   */
  async toggle(trigger) {
    if (__classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f")) {
      this.hide();
    } else {
      await this.show(trigger);
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_applyVariant).call(this);
    this.tabIndex = -1;
    this.setAttribute("popover", "manual");
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eFabMenuElement_keyDownHandler, "f"));
    this.addEventListener("toggle", __classPrivateFieldGet(this, _M3eFabMenuElement_toggleHandler, "f"));
    this.addEventListener("transitionend", __classPrivateFieldGet(this, _M3eFabMenuElement_transitionEndHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eFabMenuElement_keyDownHandler, "f"));
    this.removeEventListener("toggle", __classPrivateFieldGet(this, _M3eFabMenuElement_toggleHandler, "f"));
    this.removeEventListener("transitionend", __classPrivateFieldGet(this, _M3eFabMenuElement_transitionEndHandler, "f"));
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_applyVariant).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot @slotchange="${__classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_handleSlotChange)}"></slot></div>`;
  }
};
_M3eFabMenuElement_fabTabIndex = new WeakMap();
_M3eFabMenuElement_trigger = new WeakMap();
_M3eFabMenuElement_anchoringCleanup = new WeakMap();
_M3eFabMenuElement_listManager = new WeakMap();
_M3eFabMenuElement_keyDownHandler = new WeakMap();
_M3eFabMenuElement_transitionEndHandler = new WeakMap();
_M3eFabMenuElement_scrollController = new WeakMap();
_M3eFabMenuElement_clickOutsideController = new WeakMap();
_M3eFabMenuElement_toggleHandler = new WeakMap();
_M3eFabMenuElement_instances = new WeakSet();
_M3eFabMenuElement_applyVariant = function _M3eFabMenuElement_applyVariant() {
  if (!isFabMenuVariant(this.variant)) {
    this.variant = "primary";
  }
  setCustomEnumState(this, this.variant, "primary", "secondary", "tertiary");
};
_M3eFabMenuElement_handleSlotChange = function _M3eFabMenuElement_handleSlotChange() {
  const {
    added
  } = __classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").setItems([...this.querySelectorAll("m3e-fab-menu-item")]);
  if (!__classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").activeItem) {
    __classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").updateActiveItem(added.find(x => !x.disabled));
  }
};
_M3eFabMenuElement_items = function _M3eFabMenuElement_items() {
  return [...this.querySelectorAll("m3e-fab-menu-item")].filter(x => !x.hidden);
};
_M3eFabMenuElement_animates = function _M3eFabMenuElement_animates() {
  return !hasCustomState(this, "--no-animate") && !prefersReducedMotion();
};
_M3eFabMenuElement_stagger = function _M3eFabMenuElement_stagger(items, open) {
  const delays = staggerDelays(items.length, open);
  items.forEach((x, i) => x.style.setProperty("--_fab-menu-item-delay", `${delays[i]}ms`));
  // The menu stays displayed until its last item has closed.
  this.style.setProperty("--_fab-menu-delay", `${open ? 0 : Math.max(0, ...delays)}ms`);
};
_M3eFabMenuElement_grow = function _M3eFabMenuElement_grow(items) {
  // Items are measured at their natural widths and grow to them from zero, as Compose measures an item before
  // animating its width. The menu takes the width of its widest item meanwhile, so its anchored position does not
  // move. Its own box is not measured: its first position was computed while it was hidden.
  const widths = items.map(x => x.getBoundingClientRect().width);
  this.style.setProperty("--_fab-menu-width", `${Math.max(0, ...widths)}px`);
  // Commit zero so the items transition from it rather than from `auto`.
  items.forEach(x => x.style.setProperty("--_fab-menu-item-width", "0px"));
  void this.offsetWidth;
  items.forEach((x, i) => x.style.setProperty("--_fab-menu-item-width", `${widths[i]}px`));
};
_M3eFabMenuElement_pin = function _M3eFabMenuElement_pin(items) {
  // Commit explicit widths so the items close from them rather than from `auto`, and keep their content laid out at
  // them while clipped. Items still growing keep the widths they grow to.
  for (const item of items) {
    if (!item.style.getPropertyValue("--_fab-menu-item-width")) {
      item.style.setProperty("--_fab-menu-item-width", `${item.getBoundingClientRect().width}px`);
    }
  }
  if (!this.style.getPropertyValue("--_fab-menu-width")) {
    this.style.setProperty("--_fab-menu-width", `${this.getBoundingClientRect().width}px`);
  }
  void this.offsetWidth;
};
_M3eFabMenuElement_unpin = function _M3eFabMenuElement_unpin(items) {
  this.style.removeProperty("--_fab-menu-width");
  items.forEach(x => x.style.removeProperty("--_fab-menu-item-width"));
};
_M3eFabMenuElement_handleTransitionEnd = function _M3eFabMenuElement_handleTransitionEnd(e) {
  // Once grown, an item returns to its natural width, so that it follows later changes to its content.
  if (e.propertyName !== "width" || !this.matches(":popover-open")) return;
  const items = __classPrivateFieldGet(this, _M3eFabMenuElement_instances, "m", _M3eFabMenuElement_items).call(this);
  const item = items.find(x => x === e.target);
  if (!item) return;
  item.style.removeProperty("--_fab-menu-item-width");
  if (items.every(x => !x.style.getPropertyValue("--_fab-menu-item-width"))) {
    this.style.removeProperty("--_fab-menu-width");
  }
};
_M3eFabMenuElement_handleKeyDown = function _M3eFabMenuElement_handleKeyDown(e) {
  switch (e.key) {
    case "Tab":
      this.hide();
      break;
    case "Escape":
      if (!e.shiftKey && !e.ctrlKey) {
        this.hide(true);
      }
      break;
    default:
      __classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").onKeyDown(e);
      break;
  }
};
_M3eFabMenuElement_attachFab = function _M3eFabMenuElement_attachFab() {
  const fab = __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f")?.closest("m3e-fab");
  if (fab) {
    __classPrivateFieldSet(this, _M3eFabMenuElement_fabTabIndex, fab.tabIndex, "f");
    fab.addEventListener("keydown", __classPrivateFieldGet(this, _M3eFabMenuElement_keyDownHandler, "f"));
    __classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").setItems([...__classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").items, fab]);
  }
};
_M3eFabMenuElement_detachFab = function _M3eFabMenuElement_detachFab() {
  const fab = __classPrivateFieldGet(this, _M3eFabMenuElement_trigger, "f")?.closest("m3e-fab");
  if (fab) {
    if (__classPrivateFieldGet(this, _M3eFabMenuElement_fabTabIndex, "f") !== undefined) {
      fab.tabIndex = __classPrivateFieldGet(this, _M3eFabMenuElement_fabTabIndex, "f");
    }
    fab.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eFabMenuElement_keyDownHandler, "f"));
    __classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").setItems([...__classPrivateFieldGet(this, _M3eFabMenuElement_listManager, "f").items.filter(x => x !== fab)]);
  }
};
/** The styles of the element. */
M3eFabMenuElement.styles = css`:host { contain: layout style; position: absolute; flex-direction: column; row-gap: var(--m3e-fab-menu-spacing, ${DesignToken.measurement.space50}); padding: unset; margin: unset; border: unset; overflow: visible; width: var(--_fab-menu-width, fit-content); max-width: var(--m3e-fab-menu-max-width, 280px); background-color: transparent; display: none; } :host([hidden]) { display: none; } :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: ${unsafeCSS(`overlay ${DesignToken.motion.spring.fastSpatial} allow-discrete var(--_fab-menu-delay, 0ms),
        display ${DesignToken.motion.spring.fastSpatial} allow-discrete var(--_fab-menu-delay, 0ms)`)}; } ::slotted(m3e-fab-menu-item) { width: 0; opacity: 0; } :host(:popover-open) ::slotted(m3e-fab-menu-item) { width: var(--_fab-menu-item-width, auto); opacity: 1; } :host(:not(:is(:state(--no-animate), :--no-animate))) ::slotted(m3e-fab-menu-item) { transition: ${unsafeCSS(`width ${DesignToken.motion.spring.fastSpatial} var(--_fab-menu-item-delay, 0ms),
        opacity ${DesignToken.motion.spring.fastEffects} var(--_fab-menu-item-delay, 0ms)`)}; } .base { display: contents; } :host(:is(:state(--primary), :--primary)) .base { --_fab-menu-item-color: var(--m3e-primary-fab-color, ${DesignToken.color.onPrimaryContainer}); --_fab-menu-item-container-color: var(--m3e-primary-fab-container-color, ${DesignToken.color.primaryContainer}); --_fab-menu-background-hover-color: var(--m3e-primary-fab-hover-color, ${DesignToken.color.onPrimaryContainer}); --_fab-menu-background-focus-color: var(--m3e-primary-fab-focus-color, ${DesignToken.color.onPrimaryContainer}); --_fab-menu-ripple-color: var(--m3e-primary-fab-ripple-color, ${DesignToken.color.onPrimaryContainer}); } :host(:is(:state(--secondary), :--secondary)) .base { --_fab-menu-item-color: var(--m3e-secondary-fab-color, ${DesignToken.color.onSecondaryContainer}); --_fab-menu-item-container-color: var( --m3e-secondary-fab-container-color, ${DesignToken.color.secondaryContainer} ); --_fab-menu-background-hover-color: var( --m3e-secondary-fab-hover-color, ${DesignToken.color.onSecondaryContainer} ); --_fab-menu-background-focus-color: var( --m3e-secondary-fab-focus-color, ${DesignToken.color.onSecondaryContainer} ); --_fab-menu-ripple-color: var(--m3e-secondary-fab-ripple-color, ${DesignToken.color.onSecondaryContainer}); } :host(:is(:state(--tertiary), :--tertiary)) .base { --_fab-menu-item-color: var(--m3e-tertiary-fab-color, ${DesignToken.color.onTertiaryContainer}); --_fab-menu-item-container-color: var(--m3e-tertiary-fab-container-color, ${DesignToken.color.tertiaryContainer}); --_fab-menu-background-hover-color: var(--m3e-tertiary-fab-hover-color, ${DesignToken.color.onTertiaryContainer}); --_fab-menu-background-focus-color: var(--m3e-tertiary-fab-focus-color, ${DesignToken.color.onTertiaryContainer}); --_fab-menu-ripple-color: var(--m3e-tertiary-fab-ripple-color, ${DesignToken.color.onTertiaryContainer}); } :host(:is(:state(--left), :--left)) { align-items: flex-start; --_fab-menu-item-justify: flex-start; } :host(:is(:state(--right), :--right)) { align-items: flex-end; --_fab-menu-item-justify: flex-end; } :host(:popover-open) { display: inline-flex; } :host::backdrop { background-color: transparent; } @starting-style { :host(:popover-open) ::slotted(m3e-fab-menu-item) { opacity: 0; } } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))), :host(:not(:is(:state(--no-animate), :--no-animate))) ::slotted(m3e-fab-menu-item) { transition: none; } } @media (forced-colors: active) { :host { border-radius: ${DesignToken.shape.corner.medium}; outline: 1px solid MenuText; background-color: Menu; } }`;
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eFabMenuElement.prototype, "variant", void 0);
M3eFabMenuElement = __decorate([customElement("m3e-fab-menu")], M3eFabMenuElement);

var _M3eFabMenuItemElement_instances, _M3eFabMenuItemElement_clickHandler, _M3eFabMenuItemElement_handleClick;
/**
 * An item of a floating action button (FAB) menu.
 *
 * @example
 * The following example illustrates triggering a `m3e-fab-menu` from an `m3e-fab` using a `m3e-fab-menu-trigger`.
 * ```html
 * <m3e-fab variant="primary" size="large">
 *  <m3e-fab-menu-trigger for="fabmenu">
 *    <m3e-icon name="edit"></m3e-icon>
 *  </m3e-fab-menu-trigger>
 * </m3e-fab>
 * <m3e-fab-menu id="fabmenu" variant="secondary">
 *  <m3e-fab-menu-item>First</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Second</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Third</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Forth</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Fifth</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Sixth</m3e-fab-menu-item>
 * </m3e-fab-menu>
 * ```
 *
 * @tag m3e-fab-menu-item
 *
 * @slot - Renders the label of the item.
 * @slot icon - Renders an icon before the items's label.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr target - The target of the link button.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-fab-menu-item-height - Height of the menu item.
 * @cssprop --m3e-fab-menu-item-font-size - Font size of the menu item label.
 * @cssprop --m3e-fab-menu-item-font-weight - Font weight of the menu item label.
 * @cssprop --m3e-fab-menu-item-line-height - Line height of the menu item label.
 * @cssprop --m3e-fab-menu-item-tracking - Letter spacing of the menu item label.
 * @cssprop --m3e-fab-menu-item-shape - Border radius of the menu item.
 * @cssprop --m3e-fab-menu-item-leading-space - Padding at the start of the menu item.
 * @cssprop --m3e-fab-menu-item-trailing-space - Padding at the end of the menu item.
 * @cssprop --m3e-fab-menu-item-top-space - Padding at the top of the menu item.
 * @cssprop --m3e-fab-menu-item-bottom-space - Padding at the bottom of the menu item.
 * @cssprop --m3e-fab-menu-item-spacing - Gap between icon and label.
 * @cssprop --m3e-fab-menu-item-icon-size - Size of the icon in the menu item.
 */
let M3eFabMenuItemElement = class M3eFabMenuItemElement extends KeyboardClick(LinkButton(Disabled(AttachInternals(Role(LitElement, "menuitem"), true)))) {
  constructor() {
    super(...arguments);
    _M3eFabMenuItemElement_instances.add(this);
    /** @private */
    _M3eFabMenuItemElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eFabMenuItemElement_instances, "m", _M3eFabMenuItemElement_handleClick).call(this, e));
  }
  /** The floating action button (FAB) menu to which this item belongs. */
  get menu() {
    return this.closest("m3e-fab-menu");
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eFabMenuItemElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eFabMenuItemElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._elevation, this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-elevation class="elevation" ?disabled="${this.disabled}"></m3e-elevation><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div class="touch" aria-hidden="true"></div>${this[renderPseudoLink]()}<div class="wrapper"><div class="content"><slot class="icon" name="icon" aria-hidden="true"></slot><div class="label"><slot></slot></div></div></div></div>`;
  }
};
_M3eFabMenuItemElement_clickHandler = new WeakMap();
_M3eFabMenuItemElement_instances = new WeakSet();
_M3eFabMenuItemElement_handleClick = function _M3eFabMenuItemElement_handleClick(e) {
  if (!e.defaultPrevented) {
    this.menu?.hide(true);
  }
};
/** The styles of the element. */
M3eFabMenuItemElement.styles = css`:host { display: inline-block; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; min-height: var(--m3e-fab-menu-item-height, 56px); font-size: var(--m3e-fab-menu-item-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-fab-menu-item-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-fab-menu-item-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-fab-menu-item-tracking, ${DesignToken.typescale.standard.label.large.tracking}); border-radius: var(--m3e-fab-menu-item-shape, ${DesignToken.shape.corner.full}); } :host(:not(:disabled)) .label, :host(:not(:disabled)) .icon { color: var(--_fab-menu-item-color); } :host(:not(:disabled)) .base { background-color: var(--_fab-menu-item-container-color); --m3e-state-layer-hover-color: var(--_fab-menu-background-hover-color); --m3e-state-layer-focus-color: var(--_fab-menu-background-focus-color); --m3e-ripple-color: var(--_fab-menu-ripple-color); } :host(:disabled) .base { background-color: color-mix( in srgb, var(--m3e-fab-menu-item-disabled-container-color, ${DesignToken.color.onSurface}) var(--m3e-fab-menu-item-disabled-container-opacity, 10%), transparent ); } :host(:disabled) .label, :host(:disabled) .icon { color: color-mix( in srgb, var(--m3e-fab-menu-item-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-fab-menu-item-disabled-opacity, 38%), transparent ); } .touch { position: absolute; height: 48px; left: 0; right: 0; } .wrapper { width: 100%; overflow: clip; display: inline-flex; justify-content: var(--_fab-menu-item-justify, center); border-radius: inherit; } .content { flex: none; box-sizing: border-box; width: var(--_fab-menu-item-width, 100%); display: inline-flex; align-items: center; padding-block-start: var(--m3e-fab-menu-item-top-space, ${DesignToken.measurement.space200}); padding-block-end: var(--m3e-fab-menu-item-bottom-space, ${DesignToken.measurement.space200}); padding-inline-start: var(--m3e-fab-menu-item-leading-space, ${DesignToken.measurement.space300}); padding-inline-end: var(--m3e-fab-menu-item-trailing-space, ${DesignToken.measurement.space300}); column-gap: var(--m3e-fab-menu-item-spacing, ${DesignToken.measurement.space100}); } .label { justify-self: center; flex: 1 1 auto; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .icon { font-size: var(--m3e-fab-menu-item-icon-size, 24px); transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host(:not(:disabled)) { cursor: pointer; } ::slotted([slot="icon"]) { font-size: inherit !important; flex: none; } ::slotted(svg[slot="icon"]) { width: 1em; height: 1em; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } @media (prefers-reduced-motion) { .base, .label, .icon { transition: none; } } @media (forced-colors: active) { .base, .label, .icon { transition: none; } :host(:not(:disabled)) .base { background-color: Menu; } :host(:not(:disabled)) .label, :host(:not(:disabled)) .icon { color: MenuText; } :host(:disabled) .label, :host(:disabled) .icon { color: GrayText; } }`;
__decorate([query(".elevation")], M3eFabMenuItemElement.prototype, "_elevation", void 0);
__decorate([query(".focus-ring")], M3eFabMenuItemElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eFabMenuItemElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eFabMenuItemElement.prototype, "_ripple", void 0);
M3eFabMenuItemElement = __decorate([customElement("m3e-fab-menu-item")], M3eFabMenuItemElement);

/**
 * An element, nested within a clickable element, used to open a floating action button (FAB) menu.
 *
 * @example
 * The following example illustrates triggering a `m3e-fab-menu` from an `m3e-fab` using a `m3e-fab-menu-trigger`.
 * ```html
 * <m3e-fab variant="primary" size="large">
 *  <m3e-fab-menu-trigger for="fabmenu">
 *    <m3e-icon name="edit"></m3e-icon>
 *  </m3e-fab-menu-trigger>
 * </m3e-fab>
 * <m3e-fab-menu id="fabmenu" variant="secondary">
 *  <m3e-fab-menu-item>First</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Second</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Third</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Forth</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Fifth</m3e-fab-menu-item>
 *  <m3e-fab-menu-item>Sixth</m3e-fab-menu-item>
 * </m3e-fab-menu>
 * ```
 *
 * @tag m3e-fab-menu-trigger
 */
let M3eFabMenuTriggerElement = class M3eFabMenuTriggerElement extends HtmlFor(ActionElementBase) {
  /** The menu triggered by the element. */
  get menu() {
    return this.control instanceof M3eFabMenuElement ? this.control : null;
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    if (this.parentElement && control instanceof M3eFabMenuElement) {
      this.parentElement.ariaHasPopup = "menu";
      this.parentElement.ariaExpanded = "false";
      if (control.id) {
        addAriaReferencedId(this.parentElement, "aria-controls", control.id);
      }
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.parentElement) {
      this.parentElement.ariaHasPopup = null;
      this.parentElement.ariaExpanded = null;
      if (this.control?.id) {
        removeAriaReferencedId(this.parentElement, "aria-controls", this.control.id);
      }
    }
    super.detach();
  }
  /** @inheritdoc */
  _onClick() {
    if (this.parentElement) {
      this.menu?.toggle(this.parentElement);
    }
  }
};
M3eFabMenuTriggerElement = __decorate([customElement("m3e-fab-menu-trigger")], M3eFabMenuTriggerElement);

export { M3eFabMenuElement, M3eFabMenuItemElement, M3eFabMenuTriggerElement, isFabMenuVariant };
//# sourceMappingURL=fab-menu.js.map
