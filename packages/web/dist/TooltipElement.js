/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { property, query, state } from 'lit/decorators.js';
import { customElement, ActionElementBase, HtmlFor, ReconnectedCallback, AttachInternals, HoverController, isDisabledMixin, DesignToken, ClickOutsideController, setCustomState } from './TextOverflowElement.js';
import { LitElement, unsafeCSS, css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getTextContent } from './getTextContent.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { M3eInteractivityChecker, M3eAriaDescriber } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';
import { M3ePlatform } from './Platform.js';
import { positionAnchor } from './FloatingPanelElement.js';
import './PointerTracker.js';
import { detectGesture, phase } from './phase.js';
import { longPress } from './longPress.js';

/**
 * An element, nested within a clickable element, used to dismiss a parenting rich tooltip.
 * @tag m3e-rich-tooltip-action
 *
 * @slot - Renders the content of the action.
 *
 * @attr disable-restore-focus - Whether to focus should not be restored to the trigger when activated.
 */
let M3eRichTooltipActionElement = class M3eRichTooltipActionElement extends ActionElementBase {
  constructor() {
    super(...arguments);
    /** Whether to focus should not be restored to the trigger when activated. */
    this.disableRestoreFocus = false;
  }
  /** @inheritdoc */
  _onClick() {
    this.closest("m3e-rich-tooltip")?.hide(!this.disableRestoreFocus);
  }
};
__decorate([property({
  attribute: "disable-restore-focus",
  type: Boolean
})], M3eRichTooltipActionElement.prototype, "disableRestoreFocus", void 0);
M3eRichTooltipActionElement = __decorate([customElement("m3e-rich-tooltip-action")], M3eRichTooltipActionElement);

/**
 * Determines whether a value is a `RichTooltipPosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `RichTooltipPosition`.
 */
function isRichTooltipPosition(value) {
  return value === "above-after" || value === "above-before" || value === "below-before" || value === "below-after" || value === "before" || value === "after" || value === "above" || value === "below";
}

/**
 * Determines whether a value is a `TooltipTouchGestures`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TooltipTouchGestures`.
 */
function isTooltipTouchGestures(value) {
  return value === "auto" || value === "on" || value === "off";
}

var _TooltipElementBase_instances, _a, _TooltipElementBase_for, _TooltipElementBase_anchorCleanup, _TooltipElementBase_tooltipHovering, _TooltipElementBase_controlFocused, _TooltipElementBase_focusDelay, _TooltipElementBase_controlClickHandler, _TooltipElementBase_controlFocusInHandler, _TooltipElementBase_controlFocusOutHandler, _TooltipElementBase_documentKeyDownHandler, _TooltipElementBase_hoverController, _TooltipElementBase_longPressController, _TooltipElementBase_initialize, _TooltipElementBase_handleControlClick, _TooltipElementBase_handleControlFocusIn, _TooltipElementBase_handleControlFocusOut, _TooltipElementBase_handleDocumentKeyDown, _TooltipElementBase_clearFocusDelay, _TooltipElementBase_disableNativeGesturesIfNecessary;
/** The space, in pixels, between the tooltip and anchor. */
const TOOLTIP_OFFSET = 4;
/** The default time, in milliseconds, before hiding a tooltip. */
const TOOLTIP_HIDE_DELAY = 200;
/** Provides a base implementation for a tooltip. This class must be inherited. */
class TooltipElementBase extends HtmlFor(ReconnectedCallback(AttachInternals(LitElement))) {
  constructor() {
    super(...arguments);
    _TooltipElementBase_instances.add(this);
    /** @private */
    _TooltipElementBase_for.set(this, null);
    /** @private */
    _TooltipElementBase_anchorCleanup.set(this, void 0);
    /** @private */
    _TooltipElementBase_tooltipHovering.set(this, false);
    /** @private */
    _TooltipElementBase_controlFocused.set(this, false);
    /** @private */
    _TooltipElementBase_focusDelay.set(this, void 0);
    /** @private */
    _TooltipElementBase_controlClickHandler.set(this, () => __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_handleControlClick).call(this));
    /** @private */
    _TooltipElementBase_controlFocusInHandler.set(this, e => __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_handleControlFocusIn).call(this, e));
    /** @private */
    _TooltipElementBase_controlFocusOutHandler.set(this, () => __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_handleControlFocusOut).call(this));
    /** @private */
    _TooltipElementBase_documentKeyDownHandler.set(this, e => __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_handleDocumentKeyDown).call(this, e));
    /** @private */
    _TooltipElementBase_hoverController.set(this, new HoverController(this, {
      target: null,
      endDelay: TOOLTIP_HIDE_DELAY,
      callback: (hovering, target) => {
        if (this._isInteractive) return;
        if (hovering) {
          if (target === this._base) {
            __classPrivateFieldSet(this, _TooltipElementBase_tooltipHovering, true, "f");
            return;
          }
          this.show();
        } else if (!__classPrivateFieldGet(this, _TooltipElementBase_tooltipHovering, "f") || target === this._base) {
          __classPrivateFieldSet(this, _TooltipElementBase_tooltipHovering, false, "f");
          if (!__classPrivateFieldGet(this, _TooltipElementBase_controlFocused, "f")) {
            this.hide();
          }
        }
      }
    }));
    /** @private */
    _TooltipElementBase_longPressController.set(this, void 0);
    /**
     * Whether the element is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * The mode in which to handle touch gestures.
     * @default "auto"
     */
    this.touchGestures = "auto";
  }
  /**
   * The amount of time, in milliseconds, before showing the tooltip.
   * @default 0
   */
  get showDelay() {
    return __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").startDelay;
  }
  set showDelay(value) {
    __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").startDelay = value;
  }
  /**
   * The amount of time, in milliseconds, before hiding the tooltip.
   * @default 200
   */
  get hideDelay() {
    return __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").endDelay;
  }
  set hideDelay(value) {
    __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").endDelay = value;
  }
  /** Whether the tooltip is currently open. */
  get isOpen() {
    return _a.__openTooltips.includes(this);
  }
  /**
   * Whether the tooltip is interactive.
   * @internal
   */
  get _isInteractive() {
    return false;
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldSet(this, _TooltipElementBase_longPressController, detectGesture(control, longPress(phase({
      onStart: () => this.show(),
      onEnd: () => this.hide(),
      onCancel: () => this.hide()
    }), {
      discrete: true,
      pointerTypes: ["touch"],
      inputFilter: () => !this._isInteractive
    })), "f");
    if (M3ePlatform.iOS || M3ePlatform.Android) {
      __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_disableNativeGesturesIfNecessary).call(this);
    } else {
      __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").observe(control);
    }
    control.addEventListener("click", __classPrivateFieldGet(this, _TooltipElementBase_controlClickHandler, "f"));
    control.addEventListener("focusin", __classPrivateFieldGet(this, _TooltipElementBase_controlFocusInHandler, "f"));
    control.addEventListener("focusout", __classPrivateFieldGet(this, _TooltipElementBase_controlFocusOutHandler, "f"));
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").unobserve(this.control);
      __classPrivateFieldGet(this, _TooltipElementBase_longPressController, "f")?.destroy();
      this.control.removeEventListener("click", __classPrivateFieldGet(this, _TooltipElementBase_controlClickHandler, "f"));
      this.control.removeEventListener("focusin", __classPrivateFieldGet(this, _TooltipElementBase_controlFocusInHandler, "f"));
      this.control.removeEventListener("focusout", __classPrivateFieldGet(this, _TooltipElementBase_controlFocusOutHandler, "f"));
      this.hide();
    }
    super.detach();
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("touchGestures") && !isTooltipTouchGestures(this.touchGestures)) {
      this.touchGestures = "auto";
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("disabled") && this.disabled) {
      this.hide();
    }
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_initialize).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_initialize).call(this);
  }
  /**
   * Manually shows the tooltip.
   * @returns {Promise<void>} A `Promise` that resolves when the tooltip is shown.
   */
  async show() {
    if (!this.control || this.disabled || isDisabledMixin(this.control) && this.control.disabled) return;
    _a.__openTooltips.filter(x => x !== this).forEach(x => x.hide());
    this._base.showPopover();
    __classPrivateFieldSet(this, _TooltipElementBase_anchorCleanup, await positionAnchor(this._base, this.control, {
      position: this._anchorPosition,
      inline: true,
      flip: true,
      shift: "main",
      offset: TOOLTIP_OFFSET
    }, (x, y) => this._updatePosition(this._base, x, y)), "f");
    if (!_a.__openTooltips.includes(this)) {
      _a.__openTooltips.push(this);
    }
    document.addEventListener("keydown", __classPrivateFieldGet(this, _TooltipElementBase_documentKeyDownHandler, "f"));
  }
  /** Manually hides the tooltip. */
  hide() {
    this._base.hidePopover();
    __classPrivateFieldGet(this, _TooltipElementBase_anchorCleanup, "f")?.call(this);
    __classPrivateFieldSet(this, _TooltipElementBase_anchorCleanup, undefined, "f");
    __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").clearDelays();
    __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_clearFocusDelay).call(this);
    __classPrivateFieldSet(this, _TooltipElementBase_controlFocused, false, "f");
    document.removeEventListener("keydown", __classPrivateFieldGet(this, _TooltipElementBase_documentKeyDownHandler, "f"));
    if (_a.__openTooltips.includes(this)) {
      _a.__openTooltips = _a.__openTooltips.filter(x => x !== this);
    }
  }
}
_a = TooltipElementBase, _TooltipElementBase_for = new WeakMap(), _TooltipElementBase_anchorCleanup = new WeakMap(), _TooltipElementBase_tooltipHovering = new WeakMap(), _TooltipElementBase_controlFocused = new WeakMap(), _TooltipElementBase_focusDelay = new WeakMap(), _TooltipElementBase_controlClickHandler = new WeakMap(), _TooltipElementBase_controlFocusInHandler = new WeakMap(), _TooltipElementBase_controlFocusOutHandler = new WeakMap(), _TooltipElementBase_documentKeyDownHandler = new WeakMap(), _TooltipElementBase_hoverController = new WeakMap(), _TooltipElementBase_longPressController = new WeakMap(), _TooltipElementBase_instances = new WeakSet(), _TooltipElementBase_initialize = function _TooltipElementBase_initialize() {
  if (this._base) {
    __classPrivateFieldGet(this, _TooltipElementBase_hoverController, "f").observe(this._base);
  }
}, _TooltipElementBase_handleControlClick = function _TooltipElementBase_handleControlClick() {
  if (this._isInteractive) {
    if (_a.__openTooltips.includes(this)) {
      this.hide();
    } else {
      this.show();
    }
  } else {
    this.hide();
  }
}, _TooltipElementBase_handleControlFocusIn = function _TooltipElementBase_handleControlFocusIn(e) {
  if (this._isInteractive) return;
  // Only show for keyboard focus (i.e. not when focused by pointer or touch).
  const target = e.composedPath()[0];
  if (!(target instanceof Element) || !target.matches(":focus-visible")) return;
  __classPrivateFieldSet(this, _TooltipElementBase_controlFocused, true, "f");
  __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_clearFocusDelay).call(this);
  if (this.isOpen) return;
  if (this.showDelay > 0) {
    __classPrivateFieldSet(this, _TooltipElementBase_focusDelay, setTimeout(() => {
      __classPrivateFieldSet(this, _TooltipElementBase_focusDelay, undefined, "f");
      this.show();
    }, this.showDelay), "f");
  } else {
    this.show();
  }
}, _TooltipElementBase_handleControlFocusOut = function _TooltipElementBase_handleControlFocusOut() {
  if (this._isInteractive || !__classPrivateFieldGet(this, _TooltipElementBase_controlFocused, "f")) return;
  __classPrivateFieldSet(this, _TooltipElementBase_controlFocused, false, "f");
  // If there is a pending show delay, cancel it and do not hide.
  if (__classPrivateFieldGet(this, _TooltipElementBase_focusDelay, "f") !== undefined) {
    __classPrivateFieldGet(this, _TooltipElementBase_instances, "m", _TooltipElementBase_clearFocusDelay).call(this);
    return;
  }
  if (this.hideDelay > 0) {
    __classPrivateFieldSet(this, _TooltipElementBase_focusDelay, setTimeout(() => {
      __classPrivateFieldSet(this, _TooltipElementBase_focusDelay, undefined, "f");
      this.hide();
    }, this.hideDelay), "f");
  } else {
    this.hide();
  }
}, _TooltipElementBase_handleDocumentKeyDown = function _TooltipElementBase_handleDocumentKeyDown(e) {
  if (e.key === "Escape" && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
    e.preventDefault();
    this.hide();
  }
}, _TooltipElementBase_clearFocusDelay = function _TooltipElementBase_clearFocusDelay() {
  clearTimeout(__classPrivateFieldGet(this, _TooltipElementBase_focusDelay, "f"));
  __classPrivateFieldSet(this, _TooltipElementBase_focusDelay, undefined, "f");
}, _TooltipElementBase_disableNativeGesturesIfNecessary = function _TooltipElementBase_disableNativeGesturesIfNecessary() {
  if (this.touchGestures !== "off" && __classPrivateFieldGet(this, _TooltipElementBase_for, "f")) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const style = __classPrivateFieldGet(this, _TooltipElementBase_for, "f").style;
    // If gestures are set to `auto`, we don't disable text selection on inputs and
    // textareas, because it prevents the user from typing into them on iOS Safari.
    if (this.touchGestures === "on" || __classPrivateFieldGet(this, _TooltipElementBase_for, "f").nodeName !== "INPUT" && __classPrivateFieldGet(this, _TooltipElementBase_for, "f").nodeName !== "TEXTAREA") {
      style.userSelect = style.msUserSelect = style.webkitUserSelect = style.MozUserSelect = "none";
    }
    // If we have `auto` gestures and the element uses native HTML dragging,
    // we don't set `-webkit-user-drag` because it prevents the native behavior.
    if (this.touchGestures === "on" || !__classPrivateFieldGet(this, _TooltipElementBase_for, "f").draggable) {
      style.webkitUserDrag = "none";
    }
    style.touchAction = "none";
    style.webkitTapHighlightColor = "transparent";
  }
};
/** @private */
TooltipElementBase.__openTooltips = new Array();
__decorate([query(".base")], TooltipElementBase.prototype, "_base", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], TooltipElementBase.prototype, "disabled", void 0);
__decorate([property({
  attribute: "show-delay",
  type: Number
})], TooltipElementBase.prototype, "showDelay", null);
__decorate([property({
  attribute: "hide-delay",
  type: Number
})], TooltipElementBase.prototype, "hideDelay", null);
__decorate([property({
  attribute: "touch-gestures"
})], TooltipElementBase.prototype, "touchGestures", void 0);

var _M3eRichTooltipElement_instances, _M3eRichTooltipElement_id, _M3eRichTooltipElement_subheadText, _M3eRichTooltipElement_contentText, _M3eRichTooltipElement_message, _M3eRichTooltipElement_messageRegistered, _M3eRichTooltipElement_anchorLastPosition, _M3eRichTooltipElement_clickOutsideController, _M3eRichTooltipElement_handleBeforeToggle, _M3eRichTooltipElement_handleToggle, _M3eRichTooltipElement_handleKeyDown, _M3eRichTooltipElement_handleSubheadSlotChange, _M3eRichTooltipElement_handleContentSlotChange, _M3eRichTooltipElement_handleActionsSlotChange, _M3eRichTooltipElement_updateMessage;
var M3eRichTooltipElement_1;
/**
 * Provides contextual details for a control, such as explaining the value or purpose of a feature.
 *
 * @description
 * The `m3e-rich-tooltip` component provides contextual guidance for a control. It supports an optional
 * subhead, multi-line supporting text, and optional action elements. When non‑interactive, it behaves
 * as a standard tooltip and contributes an `aria-describedby` message to its control. When interactive,
 * it becomes a lightweight anchored dialog with manual popover behavior, keyboard dismissal, and
 * click‑outside light‑dismiss.
 *
 * @example
 * The following example illustrates connecting an interactive rich tooltip to a button using the `for` attribute.
 * ```html
 * <m3e-icon-button id="btnSettings">
 *  <m3e-icon name="settings"></m3e-icon>
 * </m3e-icon-button>
 * <m3e-rich-tooltip for="btnSettings">
 *  <span slot="subhead">New settings available</span>
 *  Now you can adjust the uploaded image quality, and upgrade your available storage space.
 *  <div slot="actions">
 *    <m3e-button>
 *      <m3e-rich-tooltip-action>Learn more</m3e-rich-tooltip-action>
 *    </m3e-button>
 *  </div>
 * </m3e-rich-tooltip>
 * ```
 *
 * @tag m3e-rich-tooltip
 *
 * @slot - The main supporting text of the tooltip.
 * @slot subhead - Optional subhead text displayed above the supporting content.
 * @slot actions - Optional action elements displayed at the bottom of the tooltip.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr hide-delay - The amount of time, in milliseconds, before hiding the tooltip.
 * @attr position - The position of the tooltip.
 * @attr show-delay - The amount of time, in milliseconds, before showing the tooltip.
 *
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-rich-tooltip-padding-top - Top padding of the tooltip container.
 * @cssprop --m3e-rich-tooltip-padding-bottom - Bottom padding of the tooltip container (when no actions are present).
 * @cssprop --m3e-rich-tooltip-padding-inline - Horizontal padding of the tooltip container.
 * @cssprop --m3e-rich-tooltip-max-width - Maximum width of the tooltip surface.
 * @cssprop --m3e-rich-tooltip-shape - Border‑radius of the tooltip container.
 * @cssprop --m3e-rich-tooltip-container-color - Background color of the tooltip surface.
 * @cssprop --m3e-rich-tooltip-subhead-color - Color of the subhead text.
 * @cssprop --m3e-rich-tooltip-subhead-font-size - Font size of the subhead text.
 * @cssprop --m3e-rich-tooltip-subhead-font-weight - Font weight of the subhead text.
 * @cssprop --m3e-rich-tooltip-subhead-line-height - Line height of the subhead text.
 * @cssprop --m3e-rich-tooltip-subhead-tracking - Letter‑spacing of the subhead text.
 * @cssprop --m3e-rich-tooltip-subhead-bottom-space - Space below the subhead before the supporting text.
 * @cssprop --m3e-rich-tooltip-supporting-text-color - Color of the supporting text.
 * @cssprop --m3e-rich-tooltip-supporting-text-font-size - Font size of the supporting text.
 * @cssprop --m3e-rich-tooltip-supporting-text-font-weight - Font weight of the supporting text.
 * @cssprop --m3e-rich-tooltip-supporting-text-line-height - Line height of the supporting text.
 * @cssprop --m3e-rich-tooltip-supporting-text-tracking - Letter‑spacing of the supporting text.
 * @cssprop --m3e-rich-tooltip-actions-padding-inline - Horizontal padding applied to the actions slot area.
 * @cssprop --m3e-rich-tooltip-actions-top-space - Space above the actions slot.
 * @cssprop --m3e-rich-tooltip-actions-bottom-space - Space below the actions slot.
 */
let M3eRichTooltipElement = M3eRichTooltipElement_1 = class M3eRichTooltipElement extends TooltipElementBase {
  constructor() {
    super(...arguments);
    _M3eRichTooltipElement_instances.add(this);
    /** @private */
    _M3eRichTooltipElement_id.set(this, M3eRichTooltipElement_1.__nextId++);
    /** @private */
    _M3eRichTooltipElement_subheadText.set(this, "");
    /** @private */
    _M3eRichTooltipElement_contentText.set(this, "");
    /** @private */
    _M3eRichTooltipElement_message.set(this, "");
    /** @private */
    _M3eRichTooltipElement_messageRegistered.set(this, false);
    /** @private */
    _M3eRichTooltipElement_anchorLastPosition.set(this, void 0);
    /** @private */
    this._hasSubhead = false;
    /** @private */
    this._interactive = false;
    /** @private */
    _M3eRichTooltipElement_clickOutsideController.set(this, new ClickOutsideController(this, {
      target: null,
      callback: () => this.hide()
    }));
    /**
     * The position of the tooltip.
     * @default "below-after"
     */
    this.position = "below-after";
  }
  /** @inheritdoc */
  get _isInteractive() {
    return this._interactive;
  }
  /** @inheritdoc */
  get _anchorPosition() {
    switch (this.position) {
      case "above":
        return "top";
      case "above-after":
        return M3eDirectionality.current === "rtl" ? "top-start" : "top-end";
      case "above-before":
        return M3eDirectionality.current === "rtl" ? "top-end" : "top-start";
      case "after":
        return M3eDirectionality.current === "rtl" ? "left" : "right";
      case "before":
        return M3eDirectionality.current === "rtl" ? "right" : "left";
      case "below":
        return "bottom";
      case "below-after":
        return M3eDirectionality.current === "rtl" ? "bottom-start" : "bottom-end";
      case "below-before":
        return M3eDirectionality.current === "rtl" ? "bottom-end" : "bottom-start";
    }
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("position") && !isRichTooltipPosition(this.position)) {
      this.position = "below-after";
    }
  }
  /** @inheritdoc */
  render() {
    const subheadId = this._interactive && this._hasSubhead ? `m3e-rich-tooltip-${__classPrivateFieldGet(this, _M3eRichTooltipElement_id, "f")}-subhead` : undefined;
    return html`<div class="base" popover="manual" role="${ifDefined(this._interactive ? "dialog" : undefined)}" aria-labelledby="${ifDefined(subheadId)}" @keydown="${__classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_handleKeyDown)}" @beforetoggle="${__classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_handleBeforeToggle)}" @toggle="${__classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_handleToggle)}"><m3e-elevation level="3"></m3e-elevation><div class="subhead" id="${ifDefined(subheadId)}"><slot name="subhead" @slotchange="${__classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_handleSubheadSlotChange)}"></slot></div><div class="content"><slot @slotchange="${__classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_handleContentSlotChange)}"></slot></div><div class="actions"><slot name="actions" @slotchange="${__classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_handleActionsSlotChange)}"></slot></div></div>`;
  }
  /** @inheritdoc */
  show() {
    __classPrivateFieldSet(this, _M3eRichTooltipElement_anchorLastPosition, undefined, "f");
    return super.show();
  }
  /**
   * Manually hides the tooltip.
   * @param [restoreFocus=true] Whether to restore focus to the element that triggered the interactive tooltip.
   */
  hide(restoreFocus = true) {
    super.hide();
    __classPrivateFieldSet(this, _M3eRichTooltipElement_anchorLastPosition, undefined, "f");
    if (restoreFocus && this._interactive && this.control && M3eInteractivityChecker.isFocusable(this.control)) {
      this.control.focus();
    }
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_updateMessage).call(this);
    if (this._interactive) {
      control.ariaHasPopup = "dialog";
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("_interactive")) {
      this.ariaHidden = this._interactive ? null : "true";
      __classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_updateMessage).call(this);
      if (this.control && this._interactive) {
        this.control.ariaHasPopup = "dialog";
      }
    }
  }
  /** @inheritdoc */
  _updatePosition(base, x, y) {
    if (this.position.includes("before") && this.position !== "before") {
      if (M3eDirectionality.current === "rtl") {
        x += this.control?.clientWidth ?? 0;
      } else {
        x -= this.control?.clientWidth ?? 0;
      }
    }
    if (this.position.includes("after") && this.position !== "after") {
      if (M3eDirectionality.current === "rtl") {
        x -= this.control?.clientWidth ?? 0;
      } else {
        x += this.control?.clientWidth ?? 0;
      }
    }
    if (__classPrivateFieldGet(this, _M3eRichTooltipElement_anchorLastPosition, "f")?.dir !== M3eDirectionality.current || __classPrivateFieldGet(this, _M3eRichTooltipElement_anchorLastPosition, "f").x !== x) {
      if (M3eDirectionality.current === "rtl") {
        base.style.right = `${window.innerWidth - x - base.clientWidth}px`;
        base.style.left = "";
      } else {
        base.style.left = `${x}px`;
        base.style.right = "";
      }
    }
    if (__classPrivateFieldGet(this, _M3eRichTooltipElement_anchorLastPosition, "f")?.y !== y) {
      base.style.top = `${y}px`;
    }
    __classPrivateFieldSet(this, _M3eRichTooltipElement_anchorLastPosition, {
      x,
      y,
      dir: M3eDirectionality.current
    }, "f");
  }
};
_M3eRichTooltipElement_id = new WeakMap();
_M3eRichTooltipElement_subheadText = new WeakMap();
_M3eRichTooltipElement_contentText = new WeakMap();
_M3eRichTooltipElement_message = new WeakMap();
_M3eRichTooltipElement_messageRegistered = new WeakMap();
_M3eRichTooltipElement_anchorLastPosition = new WeakMap();
_M3eRichTooltipElement_clickOutsideController = new WeakMap();
_M3eRichTooltipElement_instances = new WeakSet();
_M3eRichTooltipElement_handleBeforeToggle = function _M3eRichTooltipElement_handleBeforeToggle(e) {
  if (!this.dispatchEvent(new ToggleEvent("beforetoggle", {
    oldState: e.oldState,
    newState: e.newState,
    bubbles: true,
    composed: true,
    cancelable: e.cancelable
  }))) {
    e.preventDefault();
    this.hide();
  }
};
_M3eRichTooltipElement_handleToggle = function _M3eRichTooltipElement_handleToggle(e) {
  switch (e.newState) {
    case "open":
      if (this._interactive) {
        __classPrivateFieldGet(this, _M3eRichTooltipElement_clickOutsideController, "f").observe(this);
        if (this.control) {
          __classPrivateFieldGet(this, _M3eRichTooltipElement_clickOutsideController, "f").observe(this.control);
        }
      }
      break;
    case "closed":
      __classPrivateFieldGet(this, _M3eRichTooltipElement_clickOutsideController, "f").unobserveAll();
      break;
  }
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: e.oldState,
    newState: e.newState,
    bubbles: true,
    composed: true
  }));
};
_M3eRichTooltipElement_handleKeyDown = function _M3eRichTooltipElement_handleKeyDown(e) {
  if (e.key === "Escape" && !e.shiftKey && !e.ctrlKey) {
    e.preventDefault();
    this.hide();
  }
};
_M3eRichTooltipElement_handleSubheadSlotChange = function _M3eRichTooltipElement_handleSubheadSlotChange(e) {
  this._hasSubhead = hasAssignedNodes(e.target);
  this.shadowRoot?.querySelector(".base")?.classList.toggle("has-subhead", this._hasSubhead);
  __classPrivateFieldSet(this, _M3eRichTooltipElement_subheadText, this._hasSubhead ? getTextContent(e.target, true) : "", "f");
  __classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_updateMessage).call(this);
};
_M3eRichTooltipElement_handleContentSlotChange = function _M3eRichTooltipElement_handleContentSlotChange(e) {
  this._interactive = M3eInteractivityChecker.findInteractiveElements(this, true).length > 0;
  __classPrivateFieldSet(this, _M3eRichTooltipElement_contentText, getTextContent(e.target, true), "f");
  __classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_updateMessage).call(this);
};
_M3eRichTooltipElement_handleActionsSlotChange = function _M3eRichTooltipElement_handleActionsSlotChange(e) {
  this.shadowRoot?.querySelector(".base")?.classList.toggle("has-actions", hasAssignedNodes(e.target));
  this._interactive = M3eInteractivityChecker.findInteractiveElements(this, true).length > 0;
  __classPrivateFieldGet(this, _M3eRichTooltipElement_instances, "m", _M3eRichTooltipElement_updateMessage).call(this);
};
_M3eRichTooltipElement_updateMessage = function _M3eRichTooltipElement_updateMessage() {
  const message = __classPrivateFieldGet(this, _M3eRichTooltipElement_subheadText, "f") ? `${__classPrivateFieldGet(this, _M3eRichTooltipElement_subheadText, "f")}\n${__classPrivateFieldGet(this, _M3eRichTooltipElement_contentText, "f")}` : __classPrivateFieldGet(this, _M3eRichTooltipElement_contentText, "f");
  if (this.isConnected && this.control) {
    if (__classPrivateFieldGet(this, _M3eRichTooltipElement_message, "f") && __classPrivateFieldGet(this, _M3eRichTooltipElement_messageRegistered, "f")) {
      M3eAriaDescriber.removeDescription(this.control, __classPrivateFieldGet(this, _M3eRichTooltipElement_message, "f"));
      __classPrivateFieldSet(this, _M3eRichTooltipElement_messageRegistered, false, "f");
    }
    __classPrivateFieldSet(this, _M3eRichTooltipElement_message, message, "f");
    if (__classPrivateFieldGet(this, _M3eRichTooltipElement_message, "f") && !this._interactive) {
      M3eAriaDescriber.describe(this.control, __classPrivateFieldGet(this, _M3eRichTooltipElement_message, "f"));
      __classPrivateFieldSet(this, _M3eRichTooltipElement_messageRegistered, true, "f");
    }
  }
};
/** The styles of the element. */
M3eRichTooltipElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; } .base { contain: layout style; flex-direction: column; position: absolute; padding: unset; margin: unset; border: unset; padding-block-start: var(--m3e-rich-tooltip-padding-top, ${DesignToken.measurement.space150}); padding-inline: var(--m3e-rich-tooltip-padding-inline, ${DesignToken.measurement.space200}); max-width: var(--m3e-rich-tooltip-max-width, 320px); box-sizing: border-box; overflow: visible; border-radius: var(--m3e-rich-tooltip-shape, ${DesignToken.shape.corner.medium}); background-color: var(--m3e-rich-tooltip-container-color, ${DesignToken.color.surfaceContainer}); display: none; opacity: 0; transform: scale(0.8); transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
            transform ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard},
            overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
            display ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } .base:not(.has-actions) { padding-block-end: var(--m3e-rich-tooltip-padding-bottom, ${DesignToken.measurement.space150}); } .base::backdrop { background-color: transparent; } .base:popover-open { display: flex; opacity: 1; transform: scale(1); } .base:not(.has-subhead) .subhead, .base:not(.has-actions) .actions { display: none; } .subhead { color: var(--m3e-rich-tooltip-subhead-color, ${DesignToken.color.onSurfaceVariant}); font-size: var(--m3e-rich-tooltip-subhead-font-size, ${DesignToken.typescale.standard.title.small.fontSize}); font-weight: var( --m3e-rich-tooltip-subhead-font-weight, ${DesignToken.typescale.standard.title.small.fontWeight} ); line-height: var( --m3e-rich-tooltip-subhead-line-height, ${DesignToken.typescale.standard.title.small.lineHeight} ); letter-spacing: var(--m3e-rich-tooltip-subhead-tracking, ${DesignToken.typescale.standard.title.small.tracking}); padding-block-end: var(--m3e-rich-tooltip-subhead-bottom-space, ${DesignToken.measurement.space50}); } .content { color: var(--m3e-rich-tooltip-supporting-text-color, ${DesignToken.color.onSurfaceVariant}); font-size: var( --m3e-rich-tooltip-supporting-text-font-size, ${DesignToken.typescale.standard.body.medium.fontSize} ); font-weight: var( --m3e-rich-tooltip-supporting-text-font-weight, ${DesignToken.typescale.standard.body.medium.fontWeight} ); line-height: var( --m3e-rich-tooltip-supporting-text-line-height, ${DesignToken.typescale.standard.body.medium.lineHeight} ); letter-spacing: var( --m3e-rich-tooltip-supporting-text-tracking, ${DesignToken.typescale.standard.body.medium.tracking} ); } .actions { margin-inline: calc( 0px - calc( var(--m3e-rich-tooltip-padding-inline, ${DesignToken.measurement.space200}) - var( --m3e-rich-tooltip-actions-padding-inline, ${DesignToken.measurement.space50} ) ) ); padding-block-start: var(--m3e-rich-tooltip-actions-top-space, ${DesignToken.measurement.space150}); padding-block-end: var(--m3e-rich-tooltip-actions-bottom-space, ${DesignToken.measurement.space100}); } ::slotted([slot="actions"]) { flex: none; display: flex; align-items: center; min-height: 24px; column-gap: ${DesignToken.measurement.space100}; } ::slotted([slot="actions"][end]) { justify-content: flex-end; } @starting-style { .base:popover-open { opacity: 0; transform: scale(0.8); } } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { background-color: Canvas; color: CanvasText; box-sizing: border-box; border: 1px solid CanvasText; } }`;
/** @private */
M3eRichTooltipElement.__nextId = 0;
__decorate([state()], M3eRichTooltipElement.prototype, "_hasSubhead", void 0);
__decorate([state()], M3eRichTooltipElement.prototype, "_interactive", void 0);
__decorate([property()], M3eRichTooltipElement.prototype, "position", void 0);
M3eRichTooltipElement = M3eRichTooltipElement_1 = __decorate([customElement("m3e-rich-tooltip")], M3eRichTooltipElement);

/**
 * Determines whether a value is a `TooltipPosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TooltipPosition`.
 */
function isTooltipPosition(value) {
  return value === "above" || value === "below" || value === "before" || value === "after";
}

var _M3eTooltipElement_instances, _M3eTooltipElement_message, _M3eTooltipElement_anchorLastPosition, _M3eTooltipElement_handleSlotChange, _M3eTooltipElement_handleToggle;
/**
 * Adds additional context to a button or other UI element.
 *
 * @description
 * The `m3e-tooltip` component provides contextual information in response to user interaction, enhancing comprehension
 * and reducing ambiguity. Tooltips are positioned relative to a target element and support configurable delays for
 * show and hide behavior. The component is designed to reinforce accessibility and usability, especially in dense or
 * icon-driven interfaces. Use the `for` attribute to designate the element for which to provide a tooltip.
 *
 * @example
 * The following example illustrates connecting a tooltip to a button using the `for` attribute.
 * ```html
 * <m3e-icon-button id="button" aria-label="Back">
 *  <m3e-icon name="arrow_back"></m3e-icon>
 * </m3e-icon-button>
 * <m3e-tooltip for="button">Go Back</m3e-tooltip>
 * ```
 *
 * @tag m3e-tooltip
 *
 * @slot - Renders the content of the tooltip.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr hide-delay - The amount of time, in milliseconds, before hiding the tooltip.
 * @attr position - The position of the tooltip.
 * @attr show-delay - The amount of time, in milliseconds, before showing the tooltip.
 *
 * @cssprop --m3e-tooltip-padding - Internal spacing of the tooltip container.
 * @cssprop --m3e-tooltip-min-width - Minimum width of the tooltip.
 * @cssprop --m3e-tooltip-max-width - Maximum width of the tooltip.
 * @cssprop --m3e-tooltip-min-height - Minimum height of the tooltip container.
 * @cssprop --m3e-tooltip-max-height - Maximum height of the tooltip.
 * @cssprop --m3e-tooltip-shape - Border radius of the tooltip container.
 * @cssprop --m3e-tooltip-container-color - Background color of the tooltip.
 * @cssprop --m3e-tooltip-supporting-text-color - Text color of supporting text.
 * @cssprop --m3e-tooltip-supporting-text-font-size - Font size of supporting text.
 * @cssprop --m3e-tooltip-supporting-text-font-weight - Font weight of supporting text.
 * @cssprop --m3e-tooltip-supporting-text-line-height - Line height of supporting text.
 * @cssprop --m3e-tooltip-supporting-text-tracking - Letter spacing of supporting text.
 */
let M3eTooltipElement = class M3eTooltipElement extends TooltipElementBase {
  constructor() {
    super(...arguments);
    _M3eTooltipElement_instances.add(this);
    /** @private */
    _M3eTooltipElement_message.set(this, void 0);
    /** @private */
    _M3eTooltipElement_anchorLastPosition.set(this, void 0);
    /**
     * The position of the tooltip.
     * @default "below"
     */
    this.position = "below";
  }
  /** @inheritdoc */
  get _anchorPosition() {
    return this.position === "above" ? "top" : this.position === "below" ? "bottom" : this.position === "before" ? M3eDirectionality.current === "ltr" ? "left" : "right" : M3eDirectionality.current === "ltr" ? "right" : "left";
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    if (__classPrivateFieldGet(this, _M3eTooltipElement_message, "f")) {
      M3eAriaDescriber.describe(control, __classPrivateFieldGet(this, _M3eTooltipElement_message, "f"));
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.control && __classPrivateFieldGet(this, _M3eTooltipElement_message, "f")) {
      M3eAriaDescriber.removeDescription(this.control, __classPrivateFieldGet(this, _M3eTooltipElement_message, "f"));
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.ariaHidden = "true";
  }
  /** @inheritdoc */
  show() {
    __classPrivateFieldSet(this, _M3eTooltipElement_anchorLastPosition, undefined, "f");
    return super.show();
  }
  /** @inheritdoc */
  hide() {
    super.hide();
    __classPrivateFieldSet(this, _M3eTooltipElement_anchorLastPosition, undefined, "f");
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("position") && !isTooltipPosition(this.position)) {
      this.position = "below";
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" popover="manual" @toggle="${__classPrivateFieldGet(this, _M3eTooltipElement_instances, "m", _M3eTooltipElement_handleToggle)}"><slot @slotchange="${__classPrivateFieldGet(this, _M3eTooltipElement_instances, "m", _M3eTooltipElement_handleSlotChange)}"></slot></div>`;
  }
  /** @inheritdoc */
  _updatePosition(base, x, y) {
    if (__classPrivateFieldGet(this, _M3eTooltipElement_anchorLastPosition, "f")?.dir !== M3eDirectionality.current || __classPrivateFieldGet(this, _M3eTooltipElement_anchorLastPosition, "f")?.x !== x) {
      if (M3eDirectionality.current === "rtl") {
        base.style.right = `${window.innerWidth - x - base.clientWidth}px`;
        base.style.left = "";
      } else {
        base.style.left = `${x}px`;
        base.style.right = "";
      }
    }
    if (__classPrivateFieldGet(this, _M3eTooltipElement_anchorLastPosition, "f")?.y !== y) {
      base.style.top = `${y}px`;
    }
    __classPrivateFieldSet(this, _M3eTooltipElement_anchorLastPosition, {
      x,
      y,
      dir: M3eDirectionality.current
    }, "f");
  }
};
_M3eTooltipElement_message = new WeakMap();
_M3eTooltipElement_anchorLastPosition = new WeakMap();
_M3eTooltipElement_instances = new WeakSet();
_M3eTooltipElement_handleSlotChange = function _M3eTooltipElement_handleSlotChange(e) {
  const message = getTextContent(e.target, true);
  if (this.isConnected && this.control) {
    if (__classPrivateFieldGet(this, _M3eTooltipElement_message, "f")) {
      M3eAriaDescriber.removeDescription(this.control, __classPrivateFieldGet(this, _M3eTooltipElement_message, "f"));
    }
    __classPrivateFieldSet(this, _M3eTooltipElement_message, message, "f");
    if (__classPrivateFieldGet(this, _M3eTooltipElement_message, "f")) {
      M3eAriaDescriber.describe(this.control, __classPrivateFieldGet(this, _M3eTooltipElement_message, "f"));
    }
  } else {
    __classPrivateFieldSet(this, _M3eTooltipElement_message, message, "f");
  }
};
_M3eTooltipElement_handleToggle = function _M3eTooltipElement_handleToggle(e) {
  if (e.newState === "open") {
    const multiline = this._base.getBoundingClientRect().height > parseFloat(getComputedStyle(this._base).minHeight);
    setCustomState(this, "--multiline", multiline);
  }
};
/** The styles of the element. */
M3eTooltipElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; } .base { contain: layout style paint; position: absolute; pointer-events: none; margin: unset; border: unset; word-break: normal; overflow-wrap: break-word; padding: var(--m3e-tooltip-padding, ${DesignToken.measurement.space50} ${DesignToken.measurement.space100}); min-width: var(--m3e-tooltip-min-width, 40px); max-width: var(--m3e-tooltip-max-width, 200px); min-height: var(--m3e-tooltip-min-height, 24px); max-height: var(--m3e-tooltip-max-height, 40vh); box-sizing: border-box; overflow: hidden; text-align: center; border-radius: var(--m3e-tooltip-shape, ${DesignToken.shape.corner.extraSmall}); background-color: var(--m3e-tooltip-container-color, ${DesignToken.color.inverseSurface}); color: var(--m3e-tooltip-supporting-text-color, ${DesignToken.color.inverseOnSurface}); font-size: var(--m3e-tooltip-supporting-text-font-size, ${DesignToken.typescale.standard.body.small.fontSize}); font-weight: var( --m3e-tooltip-supporting-text-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight} ); line-height: var( --m3e-tooltip-supporting-text-line-height, ${DesignToken.typescale.standard.body.small.lineHeight} ); letter-spacing: var( --m3e-tooltip-supporting-text-tracking, ${DesignToken.typescale.standard.body.small.tracking} ); display: none; opacity: 0; transform: scale(0.8); transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
        transform ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard},
        overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
        display ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--multiline), :--multiline)) .base { text-align: start; } .base::backdrop { background-color: transparent; } .base:popover-open { display: block; opacity: 1; transform: scale(1); } @starting-style { .base:popover-open { opacity: 0; transform: scale(0.8); } } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { background-color: Canvas; color: CanvasText; box-sizing: border-box; border: 1px solid CanvasText; } }`;
__decorate([property()], M3eTooltipElement.prototype, "position", void 0);
M3eTooltipElement = __decorate([customElement("m3e-tooltip")], M3eTooltipElement);

export { M3eRichTooltipActionElement, M3eRichTooltipElement, M3eTooltipElement, TooltipElementBase, isRichTooltipPosition, isTooltipPosition, isTooltipTouchGestures };
//# sourceMappingURL=TooltipElement.js.map
