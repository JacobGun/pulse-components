/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, nothing, css, unsafeCSS } from 'lit';
import { state, query, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Disabled, ReconnectedCallback, AttachInternals, PressedController, setCustomState, MutationController, deleteCustomState, prefersReducedMotion, addCustomState, DesignToken, customElement } from './TextOverflowElement.js';
import { spaceSeparatedStringConverter } from './spaceSeparatedStringConverter.js';
import { FormAssociated, formValue } from './FormAssociated.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';
import { M3eDirectionality } from './Directionality.js';
import './PanGestureElement.js';
import './RepeatGestureElement.js';
import './PointerTracker.js';
import './TapGestureElement.js';

/**
 * Determines whether a value is a `SplitPaneOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SplitPaneOrientation`.
 */
function isSplitPaneOrientation(value) {
  return value === "horizontal" || value === "vertical" || value === "auto";
}

var _M3eSplitPaneElement_instances, _M3eSplitPaneElement_breakpointUnobserve, _M3eSplitPaneElement_dragState, _M3eSplitPaneElement_valueChanged, _M3eSplitPaneElement_snapAnimation, _M3eSplitPaneElement_pressedController, _M3eSplitPaneElement_startMutationController, _M3eSplitPaneElement_endMutationController, _M3eSplitPaneElement_applyOrientation, _M3eSplitPaneElement_renderDragHandle, _M3eSplitPaneElement_handleStartSlotChange, _M3eSplitPaneElement_handleEndSlotChange, _M3eSplitPaneElement_handleSlotChange, _M3eSplitPaneElement_updatePaneVisibility, _M3eSplitPaneElement_hasVisibleElements, _M3eSplitPaneElement_initialize, _M3eSplitPaneElement_initBreakpointMonitoring, _M3eSplitPaneElement_updateOrientation, _M3eSplitPaneElement_clearOrientation, _M3eSplitPaneElement_handleDblTapGesture, _M3eSplitPaneElement_handlePanGesture, _M3eSplitPaneElement_handleKeyDown, _M3eSplitPaneElement_changeValue, _M3eSplitPaneElement_getClosestDetent, _M3eSplitPaneElement_getNextHigherDetent, _M3eSplitPaneElement_getNextLowerDetent, _M3eSplitPaneElement_computeDetent, _M3eSplitPaneElement_clearSnapAnimation, _M3eSplitPaneElement_snapToValue, _M3eSplitPaneElement_cycleDetent;
/**
 * A dual-view layout that separates content with a movable drag handle.
 * @description
 * The `m3e-split-pane` component delivers a Material 3-inspired split view with a
 * movable drag handle, enabling responsive layout composition and pane resizing.
 * It supports keyboard interaction, adaptive orientation, and optional detent snapping
 * for consistent, accessible content distribution.
 *
 * @example
 * The following example illustrates the basic use of the `m3e-split-pane` with start and end content.
 * In this example, the start pane occupies 25% of the available width.
 * ```html
 * <m3e-split-pane value="25">
 *  <m3e-card slot="start"></m3e-card>
 *  <m3e-card slot="end"></m3e-card>
 * </m3e-split-pane>
 * ```
 *
 * @example
 * The next example demonstrates minimum and maximum constraints, where the start pane
 * may shrink to 25% but cannot grow beyond 50% of the available space.
 * ```html
 * <m3e-split-pane value="25" min="25" max="50">
 *  <m3e-card slot="start"></m3e-card>
 *  <m3e-card slot="end"></m3e-card>
 * </m3e-split-pane>
 * ```
 *
 * @example
 * The next example demonstrates percentage‑based detents, allowing the drag handle to snap at
 * 0%, 25%, 50%, 75%, and 100% of the available space.
 * ```html
 * <m3e-split-pane value="50" detents="0 25 50 75 100">
 *  <m3e-card slot="start"></m3e-card>
 *  <m3e-card slot="end"></m3e-card>
 * </m3e-split-pane>
 * ```
 *
 * @tag m3e-split-pane
 *
 * @slot start - Renders content at the logical start side of the pane.
 * @slot end - Renders content at the logical end side of the pane.
 *
 * @attr detents - Detents (discrete sizes) the start pane can snap to.
 * @attr label - The accessible label given to the moveable drag handle.
 * @attr max - A fractional value, between 0 and 100, indicating the maximum size of the start pane.
 * @attr min - A fractional value, between 0 and 100, indicating the minimum size of the start pane.
 * @attr orientation - The orientation of the split.
 * @attr overshoot-limit - A fractional value, between 0 and 100, indicating the maximum visual overshoot allowed when dragging past the minimum or maximum size.
 * @attr step - A fractional value, between 0 and 100, indicating the increment by which to adjust the value when resized via keyboard.
 * @attr value - A fractional value, between 0 and 100, indicating the size of the start pane.
 * @attr wrap-detents - Whether cycling through detents will wrap.
 *
 * @fires beforeinput - Dispatched continuously before the user adjusts the drag handle.
 * @fires input - Dispatched continuously while the user adjusts the drag handle.
 * @fires change - Dispatched when the user finishes adjusting the drag handle.
 *
 * @cssprop --m3e-split-pane-drag-handle-hover-color - Color used for the drag handle hover state.
 * @cssprop --m3e-split-pane-drag-handle-hover-opacity - Opacity used for the drag handle hover state.
 * @cssprop --m3e-split-pane-drag-handle-focus-color - Color used for the drag handle focus state.
 * @cssprop --m3e-split-pane-drag-handle-focus-opacity - Opacity used for the drag handle focus state.
 * @cssprop --m3e-split-pane-drag-handle-color - Background color of the drag handle when not pressed.
 * @cssprop --m3e-split-pane-drag-handle-shape - Corner shape of the drag handle when not pressed.
 * @cssprop --m3e-split-pane-drag-handle-pressed-color - Background color of the drag handle when pressed.
 * @cssprop --m3e-split-pane-drag-handle-pressed-shape - Corner shape of the drag handle when pressed.
 * @cssprop --m3e-split-pane-drag-handle-container-width - Width of the drag handle container.
 * @cssprop --m3e-split-pane-drag-handle-width - Thickness of the drag handle when not pressed.
 * @cssprop --m3e-split-pane-drag-handle-height - Length of the drag handle when not pressed.
 * @cssprop --m3e-split-pane-drag-handle-pressed-width - Thickness of the drag handle when pressed.
 * @cssprop --m3e-split-pane-drag-handle-pressed-height - Length of the drag handle when pressed.
 */
let M3eSplitPaneElement = class M3eSplitPaneElement extends FormAssociated(Disabled(ReconnectedCallback(AttachInternals(LitElement)))) {
  constructor() {
    super(...arguments);
    _M3eSplitPaneElement_instances.add(this);
    /** @private */
    _M3eSplitPaneElement_breakpointUnobserve.set(this, void 0);
    /** @private */
    _M3eSplitPaneElement_dragState.set(this, void 0);
    /** @private */
    _M3eSplitPaneElement_valueChanged.set(this, false);
    /** @private */
    _M3eSplitPaneElement_snapAnimation.set(this, void 0);
    /** @private */
    _M3eSplitPaneElement_pressedController.set(this, new PressedController(this, {
      target: null,
      isPressedKey: key => key === " ",
      minPressedDuration: 225,
      callback: pressed => setCustomState(this, "--pressed", pressed && !this.disabled)
    }));
    /** @private */
    _M3eSplitPaneElement_startMutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        attributeFilter: ["hidden"]
      },
      callback: () => __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_updatePaneVisibility).call(this, "start")
    }));
    /** @private */
    _M3eSplitPaneElement_endMutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        attributeFilter: ["hidden"]
      },
      callback: () => __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_updatePaneVisibility).call(this, "end")
    }));
    /**
     * A fractional value, between 0 and 100, indicating the size of the start pane.
     * @default 50
     */
    this.value = 50;
    /**
     * A fractional value, between 0 and 100, indicating the minimum size of the start pane.
     * @default 0
     */
    this.min = 0;
    /**
     * A fractional value, between 0 and 100, indicating the maximum size of the start pane.
     * @default 100
     */
    this.max = 100;
    /**
     * A fractional value, between 0 and 100, indicating the maximum visual overshoot allowed when dragging past the minimum or maximum size.
     * @default 4
     */
    this.overshootLimit = 4;
    /**
     * A fractional value, between 0 and 100, indicating the increment by which to adjust the value when resized via keyboard.
     * @default 1
     */
    this.step = 1;
    /**
     * Detents (discrete sizes) the start pane can snap to.
     * @default []
     */
    this.detents = [];
    /**
     * Whether cycling through detents will wrap.
     * @default false
     */
    this.wrapDetents = false;
    /**
     * The orientation of the split.
     * @default "horizontal"
     */
    this.orientation = "horizontal";
    /**
     * The accessible label given to the movable drag handle.
     * @default "Resize panes"
     */
    this.label = "Resize panes";
    /** A function used to generates human readable text for the accessible value (`aria-valuetext`) of the drag handle. */
    this.valueFormatter = (value, orientation, dir) => {
      value = Math.round(value);
      if (value >= 48 && value <= 52) {
        return "Panes equally sized";
      }
      switch (value) {
        case 0:
          return orientation === "horizontal" ? dir === "ltr" ? "Left pane collapsed" : "Right pane collapsed" : "Top pane collapsed";
        case 100:
          return orientation === "horizontal" ? dir === "ltr" ? "Right pane collapsed" : "Left pane collapsed" : "Bottom pane collapsed";
        default:
          return orientation === "horizontal" ? dir === "ltr" ? `Left pane ${value}%, right pane ${100 - value}%` : `Left pane ${100 - value}%, right pane ${value}%` : `Top pane ${value}%, bottom pane ${100 - value}%`;
      }
    };
  }
  /** The current orientation of the split. */
  get currentOrientation() {
    return this._orientation ?? (this.orientation !== "vertical" ? "horizontal" : "vertical");
  }
  /** @inheritdoc */
  get [(_M3eSplitPaneElement_breakpointUnobserve = new WeakMap(), _M3eSplitPaneElement_dragState = new WeakMap(), _M3eSplitPaneElement_valueChanged = new WeakMap(), _M3eSplitPaneElement_snapAnimation = new WeakMap(), _M3eSplitPaneElement_pressedController = new WeakMap(), _M3eSplitPaneElement_startMutationController = new WeakMap(), _M3eSplitPaneElement_endMutationController = new WeakMap(), _M3eSplitPaneElement_instances = new WeakSet(), formValue)]() {
    return this.value?.toString() ?? null;
  }
  /**
   * Moves the drag handle to the collapsed position. If detents exist, snaps to the collapsed detent.
   * If no detents exist, moves to the minimum allowed value.
   */
  collapse() {
    this.snapToValue(this.min);
  }
  /**
   * Moves the drag handle to the expanded position. If detents exist, snaps to the expanded detent.
   * If no detents exist, moves to the maximum allowed value.
   */
  expand() {
    this.snapToValue(this.max);
  }
  /**
   * Moves the drag handle to the specified position. If detents exist, snaps to the closest detent.
   * If no detents exist, moves to the specified value.
   * @param {number} value A fractional value, between 0 and 100, indicating the size of the start pane.
   */
  snapToValue(value) {
    const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, value);
    value = detent > -1 ? __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[detent]) : value;
    if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
      __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value);
    } else {
      __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_changeValue).call(this, value);
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_applyOrientation).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_clearOrientation).call(this);
    __classPrivateFieldGet(this, _M3eSplitPaneElement_pressedController, "f").unobserve(this._dragHandle);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_initialize).call(this);
    if (this.orientation === "auto") {
      __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_initBreakpointMonitoring).call(this);
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_applyOrientation).call(this);
      __classPrivateFieldGet(this, _M3eSplitPaneElement_breakpointUnobserve, "f")?.call(this);
      if (this.orientation === "auto") {
        __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_initBreakpointMonitoring).call(this);
      } else {
        this._orientation = undefined;
        __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_updateOrientation).call(this);
      }
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("value")) {
      this._base.style.setProperty("--_split-pane-value", `${this.value}%`);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_updateOrientation).call(this);
    }
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_initialize).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><div class="start" id="start" ?inert="${this.value <= 0}"><slot name="start" @slotchange="${__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handleStartSlotChange)}"></slot></div>${__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_renderDragHandle).call(this)}<div class="end" ?inert="${this.value >= 100}"><slot name="end" @slotchange="${__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handleEndSlotChange)}"></slot></div></div>`;
  }
};
_M3eSplitPaneElement_applyOrientation = function _M3eSplitPaneElement_applyOrientation() {
  if (!isSplitPaneOrientation(this.orientation)) {
    this.orientation = "horizontal";
  }
};
_M3eSplitPaneElement_renderDragHandle = function _M3eSplitPaneElement_renderDragHandle() {
  return html`<div id="drag-handle" class="drag-handle" role="separator" tabindex="${ifDefined(this.disabled ? undefined : 0)}" aria-label="${this.label}" aria-controls="start" aria-disabled="${ifDefined(this.disabled ? "true" : undefined)}" aria-orientation="${this.currentOrientation === "horizontal" ? "vertical" : "horizontal"}" aria-valuemin="${this.min}" aria-valuemax="${this.max}" aria-valuenow="${this.value}" aria-valuetext="${ifDefined(this.valueFormatter?.(this.value, this.currentOrientation, M3eDirectionality.current))}" @keydown="${__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handleKeyDown)}">${this.disabled ? nothing : html`<div class="handle"><m3e-focus-ring for="drag-handle"></m3e-focus-ring><m3e-state-layer for="drag-handle"></m3e-state-layer></div><div class="touch"></div>`}</div><m3e-pan-gesture for="drag-handle" lock-axis="${this.currentOrientation === "horizontal" ? "x" : "y"}" ?disabled="${this.disabled}" @gesture="${__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handlePanGesture)}"></m3e-pan-gesture><m3e-repeat-gesture for="drag-handle" ?disabled="${this.disabled}" @gesture="${__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handleDblTapGesture)}"><m3e-tap-gesture></m3e-tap-gesture></m3e-repeat-gesture>`;
};
_M3eSplitPaneElement_handleStartSlotChange = function _M3eSplitPaneElement_handleStartSlotChange(e) {
  __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handleSlotChange).call(this, e.target, __classPrivateFieldGet(this, _M3eSplitPaneElement_startMutationController, "f"), "--with-start");
};
_M3eSplitPaneElement_handleEndSlotChange = function _M3eSplitPaneElement_handleEndSlotChange(e) {
  __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_handleSlotChange).call(this, e.target, __classPrivateFieldGet(this, _M3eSplitPaneElement_endMutationController, "f"), "--with-end");
};
_M3eSplitPaneElement_handleSlotChange = function _M3eSplitPaneElement_handleSlotChange(slot, mutationController, state) {
  for (const target of mutationController.targets) {
    mutationController.unobserve(target);
  }
  const assignedElements = new Array();
  setCustomState(this, state, __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_hasVisibleElements).call(this, slot, assignedElements));
  for (const element of assignedElements) {
    if (element instanceof HTMLElement) {
      mutationController.observe(element);
    }
  }
};
_M3eSplitPaneElement_updatePaneVisibility = function _M3eSplitPaneElement_updatePaneVisibility(pane) {
  setCustomState(this, `--with-${pane}`, __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_hasVisibleElements).call(this, this.shadowRoot?.querySelector(`slot[name='${pane}']`)));
};
_M3eSplitPaneElement_hasVisibleElements = function _M3eSplitPaneElement_hasVisibleElements(slot, assignedElements) {
  assignedElements = assignedElements ?? [];
  assignedElements.push(...(slot?.assignedElements({
    flatten: true
  }) ?? []));
  return assignedElements.length > 0 && !assignedElements.every(x => x.hasAttribute("hidden"));
};
_M3eSplitPaneElement_initialize = function _M3eSplitPaneElement_initialize() {
  __classPrivateFieldGet(this, _M3eSplitPaneElement_pressedController, "f").observe(this._dragHandle);
};
_M3eSplitPaneElement_initBreakpointMonitoring = function _M3eSplitPaneElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eSplitPaneElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall], matches => {
    this._orientation = matches.get(Breakpoint.XSmall) ? "vertical" : "horizontal";
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_updateOrientation).call(this);
  }), "f");
};
_M3eSplitPaneElement_updateOrientation = function _M3eSplitPaneElement_updateOrientation() {
  setCustomState(this, "--vertical", this.currentOrientation === "vertical");
};
_M3eSplitPaneElement_clearOrientation = function _M3eSplitPaneElement_clearOrientation() {
  deleteCustomState(this, "--vertical");
  this._orientation = undefined;
  __classPrivateFieldGet(this, _M3eSplitPaneElement_breakpointUnobserve, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eSplitPaneElement_breakpointUnobserve, undefined, "f");
};
_M3eSplitPaneElement_handleDblTapGesture = function _M3eSplitPaneElement_handleDblTapGesture(e) {
  if (e.detail.phase === "end") {
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_cycleDetent).call(this);
  }
};
_M3eSplitPaneElement_handlePanGesture = function _M3eSplitPaneElement_handlePanGesture(e) {
  switch (e.detail.phase) {
    case "start":
      {
        __classPrivateFieldSet(this, _M3eSplitPaneElement_valueChanged, false, "f");
        let min = this.min;
        if (min === 0 && this.detents.length > 0) {
          const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, 0);
          if (detent > -1) {
            min = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[detent]) ?? this.min;
          }
        }
        let max = this.max;
        if (max === 100 && this.detents.length > 0) {
          const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, 100);
          if (detent > -1) {
            max = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[detent]) ?? this.max;
          }
        }
        __classPrivateFieldSet(this, _M3eSplitPaneElement_dragState, {
          startValue: this.value,
          cachedSize: this.currentOrientation === "vertical" ? this.clientHeight : this.clientWidth,
          min,
          max
        }, "f");
      }
      break;
    case "update":
      {
        if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f")) return;
        const displacement = this.currentOrientation === "vertical" ? e.detail.totalDeltaY : e.detail.totalDeltaX;
        let delta = __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").cachedSize > 0 ? displacement / __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").cachedSize * 100 : 0;
        if (M3eDirectionality.current === "rtl" && this.currentOrientation !== "vertical") {
          delta = -delta;
        }
        let value = __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").startValue + delta;
        if (value < __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").min) {
          const overshoot = __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").min - value;
          const compressed = this.overshootLimit * overshoot / (overshoot + this.overshootLimit);
          value = __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").min - compressed;
        } else if (value > __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").max) {
          const overshoot = value - __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").max;
          const compressed = this.overshootLimit * overshoot / (overshoot + this.overshootLimit);
          value = __classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f").max + compressed;
        }
        if (__classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_changeValue).call(this, value, false, true)) {
          __classPrivateFieldSet(this, _M3eSplitPaneElement_valueChanged, true, "f");
        }
      }
      break;
    case "cancel":
    case "end":
      {
        if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_dragState, "f")) return;
        __classPrivateFieldSet(this, _M3eSplitPaneElement_dragState, undefined, "f");
        const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.value);
        if (detent >= 0) {
          const value = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[detent]);
          if (value !== undefined) {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value, false);
          }
        } else if (this.value < this.min) {
          __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.min, false);
        } else if (this.value > this.max) {
          __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.max, false);
        }
        if (__classPrivateFieldGet(this, _M3eSplitPaneElement_valueChanged, "f")) {
          this.dispatchEvent(new Event("change", {
            bubbles: true
          }));
          __classPrivateFieldSet(this, _M3eSplitPaneElement_valueChanged, false, "f");
        }
      }
      break;
  }
};
_M3eSplitPaneElement_handleKeyDown = function _M3eSplitPaneElement_handleKeyDown(e) {
  const ltr = M3eDirectionality.current === "ltr" || this.currentOrientation === "vertical";
  switch (e.key) {
    case "Up":
    case "ArrowUp":
    case "Left":
    case "ArrowLeft":
      {
        e.preventDefault();
        const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.value);
        if (detent >= 0) {
          const nextDetent = ltr ? __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextLowerDetent).call(this, detent) : __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextHigherDetent).call(this, detent);
          if (nextDetent !== detent && !__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
            const value = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[nextDetent]);
            if (value !== undefined) {
              __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value);
            }
          }
        } else if (this.step > 1) {
          if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.value + (ltr ? -this.step : this.step));
          }
        } else {
          __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_changeValue).call(this, this.value + (ltr ? -this.step : this.step));
        }
        break;
      }
    case "Down":
    case "ArrowDown":
    case "Right":
    case "ArrowRight":
      {
        e.preventDefault();
        const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.value);
        if (detent >= 0) {
          const nextDetent = ltr ? __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextHigherDetent).call(this, detent) : __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextLowerDetent).call(this, detent);
          if (nextDetent !== detent && !__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
            const value = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[nextDetent]);
            if (value !== undefined) {
              __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value);
            }
          }
        } else if (this.step > 1) {
          if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.value + (ltr ? this.step : -this.step));
          }
        } else {
          __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_changeValue).call(this, this.value + (ltr ? this.step : -this.step));
        }
        break;
      }
    case "Home":
      {
        e.preventDefault();
        if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
          const next = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.min);
          if (next > -1) {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[next]));
          } else {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.min);
          }
        }
        break;
      }
    case "End":
      {
        e.preventDefault();
        if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
          const next = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.max);
          if (next > -1) {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[next]));
          } else {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.max);
          }
        }
        break;
      }
    case "PageUp":
      {
        e.preventDefault();
        if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
          const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.value);
          if (detent >= 0) {
            const nextDetent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextLowerDetent).call(this, detent);
            if (nextDetent !== detent) {
              const value = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[nextDetent]);
              if (value !== undefined) {
                __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value);
              }
            }
          } else {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.value - Math.max(10, this.step));
          }
        }
        break;
      }
    case "PageDown":
      {
        e.preventDefault();
        if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
          const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.value);
          if (detent >= 0) {
            const nextDetent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextHigherDetent).call(this, detent);
            if (nextDetent !== detent) {
              const value = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[nextDetent]);
              if (value !== undefined) {
                __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value);
              }
            }
          } else {
            __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, this.value + Math.max(10, this.step));
          }
        }
        break;
      }
    case "Enter":
      if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
        __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_cycleDetent).call(this);
      }
      break;
    case " ":
      e.preventDefault();
      if (!__classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")) {
        __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_cycleDetent).call(this);
      }
      break;
  }
};
_M3eSplitPaneElement_changeValue = function _M3eSplitPaneElement_changeValue(value, emitChange = true, allowOvershoot = false) {
  __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_clearSnapAnimation).call(this);
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    if (!allowOvershoot) {
      value = Math.max(this.min, Math.min(this.max, value));
    }
    if (value != this.value) {
      this.value = value;
      this._base.style.setProperty("--_split-pane-value", `${this.value}%`);
      this.dispatchEvent(new Event("input", {
        bubbles: true
      }));
      if (emitChange) {
        this.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      }
      return true;
    }
  }
  return false;
};
_M3eSplitPaneElement_getClosestDetent = function _M3eSplitPaneElement_getClosestDetent(value) {
  let closestDetent = -1;
  let closestDistance = Infinity;
  for (let i = 0; i < this.detents.length; i++) {
    const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[i]);
    if (detent === undefined) continue;
    const distance = Math.abs(value - detent);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestDetent = i;
    }
  }
  return closestDetent;
};
_M3eSplitPaneElement_getNextHigherDetent = function _M3eSplitPaneElement_getNextHigherDetent(detentIndex) {
  const currentValue = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[detentIndex]);
  if (currentValue === undefined) return detentIndex;
  let value = Infinity;
  let nextDetent = detentIndex;
  for (let i = 0; i < this.detents.length; i++) {
    if (i === detentIndex) continue;
    const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[i]);
    if (detent === undefined) continue;
    if (detent > currentValue && detent < value) {
      value = detent;
      nextDetent = i;
    }
  }
  return nextDetent;
};
_M3eSplitPaneElement_getNextLowerDetent = function _M3eSplitPaneElement_getNextLowerDetent(detentIndex) {
  const currentValue = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[detentIndex]);
  if (currentValue === undefined) return detentIndex;
  let value = -Infinity;
  let nextDetent = detentIndex;
  for (let i = 0; i < this.detents.length; i++) {
    if (i === detentIndex) continue;
    const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[i]);
    if (detent === undefined) continue;
    if (detent < currentValue && detent > value) {
      value = detent;
      nextDetent = i;
    }
  }
  return nextDetent;
};
_M3eSplitPaneElement_computeDetent = function _M3eSplitPaneElement_computeDetent(detent) {
  const size = this.currentOrientation === "vertical" ? this.clientHeight : this.clientWidth;
  const value = detent.endsWith("px") ? size > 0 ? parseFloat(detent) / size * 100 : NaN : parseFloat(detent);
  return !isNaN(value) ? value : undefined;
};
_M3eSplitPaneElement_clearSnapAnimation = function _M3eSplitPaneElement_clearSnapAnimation() {
  __classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f")?.cancel();
  __classPrivateFieldSet(this, _M3eSplitPaneElement_snapAnimation, undefined, "f");
};
_M3eSplitPaneElement_snapToValue = function _M3eSplitPaneElement_snapToValue(value, emitChange = true) {
  __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_clearSnapAnimation).call(this);
  value = Math.max(this.min, Math.min(this.max, value));
  if (value === this.value) return;
  if (!prefersReducedMotion()) {
    addCustomState(this, "--animating");
    __classPrivateFieldSet(this, _M3eSplitPaneElement_snapAnimation, this._base.animate([{
      "--_split-pane-value": `${this.value}%`
    }, {
      "--_split-pane-value": `${value}%`
    }], {
      duration: 250,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)"
    }), "f");
    __classPrivateFieldGet(this, _M3eSplitPaneElement_snapAnimation, "f").onfinish = () => {
      __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_changeValue).call(this, value, emitChange);
      __classPrivateFieldSet(this, _M3eSplitPaneElement_snapAnimation, undefined, "f");
      deleteCustomState(this, "--animating");
    };
  } else {
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_changeValue).call(this, value, emitChange);
  }
};
_M3eSplitPaneElement_cycleDetent = function _M3eSplitPaneElement_cycleDetent() {
  if (this.detents.length === 0) return;
  const detent = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, this.value);
  if (detent === -1) return;
  let next = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getNextHigherDetent).call(this, detent);
  if (next === detent && this.wrapDetents) {
    next = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_getClosestDetent).call(this, 0);
    if (next === -1) return;
  }
  const value = __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_computeDetent).call(this, this.detents[next]);
  if (value !== undefined) {
    __classPrivateFieldGet(this, _M3eSplitPaneElement_instances, "m", _M3eSplitPaneElement_snapToValue).call(this, value);
  }
};
(() => {
  registerStyleSheet(css`@property --_split-pane-value { syntax: "<length-percentage>"; inherits: true; initial-value: 50%; }</length-percentage>`);
})();
/** The styles of the element. */
M3eSplitPaneElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .base { contain: layout style; display: flex; width: 100%; height: 100%; overflow: hidden; } :host(:not(:is(:state(--vertical), :--vertical))) .base { flex-direction: row; } :host(:is(:state(--vertical), :--vertical)) .base { flex-direction: column; } :host(:is(:state(--with-start), :--with-start):is(:state(--with-end), :--with-end)) .start { flex: 0 1 calc(var(--_split-pane-value) - calc(var(--m3e-split-pane-drag-handle-container-width, 24px) / 2)); } :host(:not(:is(:state(--with-end), :--with-end))) .start { flex: 1 1 auto; } :host(:is(:state(--with-end), :--with-end)) .end { flex: 1 1 auto; } :host(:not(:is(:state(--with-end), :--with-end))) .end { display: none; } :host(:not(:is(:state(--animating), :--animating))) .start[inert], :host(:not(:is(:state(--animating), :--animating))) .end[inert] { visibility: hidden; } .drag-handle { contain: layout style; flex: none; display: flex; align-items: center; justify-content: center; outline: none; touch-action: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --m3e-state-layer-hover-color: var(--m3e-split-pane-drag-handle-hover-color, ${DesignToken.color.onSurface}); --m3e-state-layer-hover-opacity: var(--m3e-split-pane-drag-handle-hover-opacity, 8%); --m3e-state-layer-focus-color: var(--m3e-split-pane-drag-handle-focus-color, ${DesignToken.color.onSurface}); --m3e-state-layer-focus-opacity: var(--m3e-split-pane-drag-handle-focus-opacity, 10%); } :host(:is(:not(:is(:state(--with-start), :--with-start)), :not(:is(:state(--with-end), :--with-end)))) .drag-handle { display: none; } :host(:not(:is(:state(--pressed), :--pressed))) .drag-handle:not([aria-disabled]) { cursor: grab; } :host(:is(:state(--pressed), :--pressed)) .drag-handle:not([aria-disabled]) { cursor: grabbing; } .handle { position: relative; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
        width ${DesignToken.motion.spring.fastEffects}, height ${DesignToken.motion.spring.fastEffects}`)}; } .touch { z-index: 1; position: absolute; height: 48px; width: 48px; margin: auto; touch-action: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host(:not(:is(:state(--pressed), :--pressed))) .handle { background-color: var(--m3e-split-pane-drag-handle-color, ${DesignToken.color.outline}); border-radius: var(--m3e-split-pane-drag-handle-shape, ${DesignToken.shape.corner.full}); } :host(:is(:state(--pressed), :--pressed)) .handle { background-color: var(--m3e-split-pane-drag-handle-pressed-color, ${DesignToken.color.onSurface}); border-radius: var(--m3e-split-pane-drag-handle-pressed-shape, ${DesignToken.shape.corner.medium}); } :host(:not(:is(:state(--vertical), :--vertical))) .drag-handle { flex-direction: column; width: var(--m3e-split-pane-drag-handle-container-width, 24px); } :host(:not(:is(:state(--vertical), :--vertical)):not(:is(:state(--pressed), :--pressed))) .handle { width: var(--m3e-split-pane-drag-handle-width, 4px); height: var(--m3e-split-pane-drag-handle-height, 48px); } :host(:not(:is(:state(--vertical), :--vertical)):is(:state(--pressed), :--pressed)) .handle { width: var(--m3e-split-pane-drag-handle-pressed-width, 12px); height: var(--m3e-split-pane-drag-handle-pressed-height, 52px); } :host(:is(:state(--vertical), :--vertical)) .drag-handle { height: var(--m3e-split-pane-drag-handle-container-width, 24px); } :host(:is(:state(--vertical), :--vertical):not(:is(:state(--pressed), :--pressed))) .handle { width: var(--m3e-split-pane-drag-handle-height, 48px); height: var(--m3e-split-pane-drag-handle-width, 4px); } :host(:is(:state(--vertical), :--vertical):is(:state(--pressed), :--pressed)) .handle { width: var(--m3e-split-pane-drag-handle-pressed-height, 52px); height: var(--m3e-split-pane-drag-handle-pressed-width, 12px); } @media (prefers-reduced-motion) { .handle { transition: none; } } @media (forced-colors: active) { :host(:is(:state(--pressed), :--pressed)) .handle, :host(:not(:is(:state(--pressed), :--pressed))) .handle { background-color: ButtonText; } }`;
__decorate([state()], M3eSplitPaneElement.prototype, "_orientation", void 0);
__decorate([query(".base")], M3eSplitPaneElement.prototype, "_base", void 0);
__decorate([query(".drag-handle")], M3eSplitPaneElement.prototype, "_dragHandle", void 0);
__decorate([property({
  type: Number
})], M3eSplitPaneElement.prototype, "value", void 0);
__decorate([property({
  type: Number
})], M3eSplitPaneElement.prototype, "min", void 0);
__decorate([property({
  type: Number
})], M3eSplitPaneElement.prototype, "max", void 0);
__decorate([property({
  attribute: "overshoot-limit",
  type: Number
})], M3eSplitPaneElement.prototype, "overshootLimit", void 0);
__decorate([property({
  type: Number
})], M3eSplitPaneElement.prototype, "step", void 0);
__decorate([property({
  attribute: "detents",
  converter: spaceSeparatedStringConverter
})], M3eSplitPaneElement.prototype, "detents", void 0);
__decorate([property({
  attribute: "wrap-detents",
  type: Boolean
})], M3eSplitPaneElement.prototype, "wrapDetents", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSplitPaneElement.prototype, "orientation", void 0);
__decorate([property()], M3eSplitPaneElement.prototype, "label", void 0);
__decorate([property({
  attribute: false
})], M3eSplitPaneElement.prototype, "valueFormatter", void 0);
M3eSplitPaneElement = __decorate([customElement("m3e-split-pane")], M3eSplitPaneElement);

export { M3eSplitPaneElement, isSplitPaneOrientation };
//# sourceMappingURL=split-pane.js.map
