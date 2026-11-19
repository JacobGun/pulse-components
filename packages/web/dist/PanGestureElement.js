/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { customElement } from './TextOverflowElement.js';
import 'lit';
import 'lit/directives/if-defined.js';
import { DefaultGestureOptions, GestureRecognizerBase, PointerTracker, GestureElementBase } from './PointerTracker.js';

/** Defines the default options used to detect and interpret pan gestures. */
const DefaultPanGestureOptions = {
  ...DefaultGestureOptions,
  activationMode: "press",
  minDisplacement: 4,
  lockAxis: "none",
  axisThreshold: 8,
  deltaThreshold: 0,
  pointers: 1,
  maxPressInterval: 120
};

var _PanGestureRecognizer_instances, _PanGestureRecognizer_state, _PanGestureRecognizer_invalid, _PanGestureRecognizer_axis, _PanGestureRecognizer_timeout, _PanGestureRecognizer_started, _PanGestureRecognizer_cancelled, _PanGestureRecognizer_cancelling, _PanGestureRecognizer_allPointersDownAndActive, _PanGestureRecognizer_tryLockAxis, _PanGestureRecognizer_cancel, _PanGestureRecognizer_createDetail;
/** A {@link GestureRecognizer} used to detect and interpret pan gestures from incoming input streams. */
class PanGestureRecognizer extends GestureRecognizerBase {
  constructor() {
    super(...arguments);
    _PanGestureRecognizer_instances.add(this);
    /** @private */
    _PanGestureRecognizer_state.set(this, new Map());
    /** @private */
    _PanGestureRecognizer_invalid.set(this, false);
    /** @private */
    _PanGestureRecognizer_axis.set(this, null);
    /** @private */
    _PanGestureRecognizer_timeout.set(this, void 0);
    /** @private */
    _PanGestureRecognizer_started.set(this, false);
    /** @private */
    _PanGestureRecognizer_cancelled.set(this, false);
    /** @private */
    _PanGestureRecognizer_cancelling.set(this, false);
  }
  /** Returns the pointer trackers for all active pointers. */
  get trackers() {
    return [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].map(s => s.tracker);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultPanGestureOptions
    };
  }
  /** @inheritdoc */
  shouldCapturePointer(input) {
    return __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").has(input.inputId);
  }
  /** @inheritdoc */
  _onPointerDown(input) {
    // Reject duplicate input or too many pointers.
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").has(input.inputId) || __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").size >= this.options.pointers) {
      __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_cancel).call(this);
      return;
    }
    __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").set(input.inputId, {
      active: true,
      tracker: new PointerTracker(input),
      pressTimestamp: input.timestamp
    });
    // If activation mode is move and a pointer down occurs, the state is invalid.
    __classPrivateFieldSet(this, _PanGestureRecognizer_invalid, this.options.activationMode === "move", "f");
    if (!__classPrivateFieldGet(this, _PanGestureRecognizer_invalid, "f")) {
      this._defer(input.inputId);
      // Immediately start gesture if there is no min displacement
      // requirement and all pointers are down and active.
      if (!__classPrivateFieldGet(this, _PanGestureRecognizer_started, "f") && this.options.minDisplacement <= 0 && __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_allPointersDownAndActive).call(this)) {
        __classPrivateFieldSet(this, _PanGestureRecognizer_started, true, "f");
        this._emit(__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_createDetail).call(this, "start"));
      }
    }
  }
  /** @inheritdoc */
  _onPointerMove(input) {
    // Ignore if invalid.
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_invalid, "f")) return;
    // If activation mode is move and there is no state, capture initial state.
    if (!__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").has(input.inputId) && this.options.activationMode === "move") {
      __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").set(input.inputId, {
        active: true,
        tracker: new PointerTracker(input),
        pressTimestamp: input.timestamp
      });
      this._defer(input.inputId);
      // Immediately start gesture if there is no min displacement
      // requirement and all pointers are down and active.
      if (!__classPrivateFieldGet(this, _PanGestureRecognizer_started, "f") && this.options.minDisplacement <= 0 && __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_allPointersDownAndActive).call(this)) {
        __classPrivateFieldSet(this, _PanGestureRecognizer_started, true, "f");
        this._emit(__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_createDetail).call(this, "start"));
        return;
      }
    }
    const state = __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").get(input.inputId);
    // Ignore if no state, all pointers are not down, or all pointers are not active.
    if (!state || !__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_allPointersDownAndActive).call(this)) {
      return;
    }
    // Update state with new input.
    state.tracker.append(input);
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_started, "f")) {
      // When started, optionally lock axis.
      __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_tryLockAxis).call(this);
      const trackers = [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].map(x => x.tracker);
      const centroid = PointerTracker.centroid(...trackers);
      // Don’t emit move if perpendicular movement is below the delta threshold.
      switch (__classPrivateFieldGet(this, _PanGestureRecognizer_axis, "f")) {
        case "x":
          if (Math.abs(centroid.deltaY) < this.options.deltaThreshold) {
            return;
          }
          break;
        case "y":
          if (Math.abs(centroid.deltaX) < this.options.deltaThreshold) {
            return;
          }
          break;
      }
      // Dispatch updates.
      this._emit(__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_createDetail).call(this, "update"));
      return;
    }
    const trackers = [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].map(x => x.tracker);
    const centroid = PointerTracker.centroid(...trackers);
    // Ensure min displacement and prior to activation.
    if (centroid.totalDisplacement >= this.options.minDisplacement) {
      // Lock axis before activation.
      __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_tryLockAxis).call(this);
      // Start gesture.
      __classPrivateFieldSet(this, _PanGestureRecognizer_started, true, "f");
      this._emit(__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_createDetail).call(this, "start"));
    }
  }
  /** @inheritdoc */
  _onPointerUp(input) {
    // Ignore if no state.
    const state = __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").get(input.inputId);
    if (!state) return;
    state.active = false;
    // If started and all pointers are no longer active, accept the gesture (which ends on acceptance).
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_started, "f")) {
      if (![...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].every(x => x.active)) {
        state.tracker.append(input);
        this._accept([...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").keys()]);
      }
    } else {
      __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onPointerCancel(input) {
    const state = __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").get(input.inputId);
    if (state) {
      __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    const state = __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").get(inputId);
    if (!state) return;
    state.accepted = true;
    // Only emit end if gesture started, not cancelled and all inputs are accepted.
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_started, "f") && !__classPrivateFieldGet(this, _PanGestureRecognizer_cancelled, "f") && [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].every(x => x.accepted)) {
      this._emit(__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_createDetail).call(this, "end"));
      this.reset();
    }
  }
  /** @inheritdoc */
  _onReject(inputId) {
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").has(inputId)) {
      __classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_cancel).call(this, inputId);
    }
  }
  /** @inheritdoc */
  reset() {
    clearTimeout(__classPrivateFieldGet(this, _PanGestureRecognizer_timeout, "f"));
    __classPrivateFieldSet(this, _PanGestureRecognizer_timeout, undefined, "f");
    __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").clear();
    __classPrivateFieldSet(this, _PanGestureRecognizer_invalid, false, "f");
    __classPrivateFieldSet(this, _PanGestureRecognizer_started, false, "f");
    __classPrivateFieldSet(this, _PanGestureRecognizer_cancelled, false, "f");
    __classPrivateFieldSet(this, _PanGestureRecognizer_axis, null, "f");
  }
}
_PanGestureRecognizer_state = new WeakMap(), _PanGestureRecognizer_invalid = new WeakMap(), _PanGestureRecognizer_axis = new WeakMap(), _PanGestureRecognizer_timeout = new WeakMap(), _PanGestureRecognizer_started = new WeakMap(), _PanGestureRecognizer_cancelled = new WeakMap(), _PanGestureRecognizer_cancelling = new WeakMap(), _PanGestureRecognizer_instances = new WeakSet(), _PanGestureRecognizer_allPointersDownAndActive = function _PanGestureRecognizer_allPointersDownAndActive() {
  return __classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").size === this.options.pointers && [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].every(x => x.active);
}, _PanGestureRecognizer_tryLockAxis = function _PanGestureRecognizer_tryLockAxis() {
  if (this.options.lockAxis === "x" || this.options.lockAxis === "y") {
    __classPrivateFieldSet(this, _PanGestureRecognizer_axis, this.options.lockAxis, "f");
    return;
  }
  if (this.options.lockAxis !== "auto" || __classPrivateFieldGet(this, _PanGestureRecognizer_axis, "f")) return;
  // Lock axis only after threshold displacement.
  const trackers = [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].map(x => x.tracker);
  const centroid = PointerTracker.centroid(...trackers);
  if (centroid.totalDisplacement >= this.options.axisThreshold) {
    __classPrivateFieldSet(this, _PanGestureRecognizer_axis, centroid.axis, "f");
  }
}, _PanGestureRecognizer_cancel = function _PanGestureRecognizer_cancel(excludeInputId) {
  // Resolver callbacks are synchronous, so guard the rejection loop against recursive cancellation.
  if (__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").size === 0 || __classPrivateFieldGet(this, _PanGestureRecognizer_cancelling, "f")) return;
  try {
    __classPrivateFieldSet(this, _PanGestureRecognizer_cancelling, true, "f");
    // Emit cancel if started and not yet cancelled.
    if (__classPrivateFieldGet(this, _PanGestureRecognizer_started, "f") && !__classPrivateFieldGet(this, _PanGestureRecognizer_cancelled, "f")) {
      this._emit(__classPrivateFieldGet(this, _PanGestureRecognizer_instances, "m", _PanGestureRecognizer_createDetail).call(this, "cancel"));
    }
    __classPrivateFieldSet(this, _PanGestureRecognizer_cancelled, true, "f");
    // Reject all inputs and reset.
    [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").keys()].filter(x => x !== excludeInputId).forEach(x => this._reject(x));
    this.reset();
  } finally {
    __classPrivateFieldSet(this, _PanGestureRecognizer_cancelling, false, "f");
  }
}, _PanGestureRecognizer_createDetail = function _PanGestureRecognizer_createDetail(phase) {
  const trackers = [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").values()].map(x => x.tracker);
  const centroid = PointerTracker.centroid(...trackers);
  return {
    gestureName: "pan",
    phase: phase,
    inputId: [...__classPrivateFieldGet(this, _PanGestureRecognizer_state, "f").keys()],
    ...centroid,
    timestamp: Math.max(...trackers.map(x => x.current.timestamp))
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/**
 * A non-visual element used to detect and interpret pan gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-pan-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr activation-mode - Mode in which to activate the gesture.
 * @attr min-displacement - Minimum distance (px) a pointer can move before the gesture starts.
 * @attr lock-axis - Locks movement to an axis.
 * @attr axis-threshold - Minimum total displacement (px) required before axis locking resolves.
 * @attr delta-threshold - Minimum incremental movement (px) on the secondary axis required before emitting detail for a locked axis.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a pan gesture is detected.
 */
let M3ePanGestureElement = class M3ePanGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    /** @inheritdoc */
    this.recognizer = new PanGestureRecognizer();
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    this.pointers = this.recognizer.defaultOptions.pointers;
    /**
     * Mode in which to activate the gesture.
     * @default "press"
     */
    this.activationMode = this.recognizer.defaultOptions.activationMode;
    /**
     * Minimum distance (px) a pointer can move before the gesture starts.
     * @default 4
     */
    this.minDisplacement = this.recognizer.defaultOptions.minDisplacement;
    /**
     * Locks movement to an axis.
     * @default "none"
     */
    this.lockAxis = this.recognizer.defaultOptions.lockAxis;
    /**
     * Minimum total displacement (px) required before axis locking resolves orientation.
     * @default 8
     */
    this.axisThreshold = this.recognizer.defaultOptions.axisThreshold;
    /**
     * Minimum incremental movement (px) on the secondary axis required before emitting detail for a locked axis.
     * @default 0
     */
    this.deltaThreshold = this.recognizer.defaultOptions.deltaThreshold;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    this.maxPressInterval = this.recognizer.defaultOptions.maxPressInterval;
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    this.recognizer.options = {
      pointers: this.pointers,
      activationMode: this.activationMode,
      minDisplacement: this.minDisplacement,
      lockAxis: this.lockAxis,
      axisThreshold: this.axisThreshold,
      deltaThreshold: this.deltaThreshold,
      maxPressInterval: this.maxPressInterval
    };
  }
};
__decorate([property({
  type: Number,
  reflect: false
})], M3ePanGestureElement.prototype, "pointers", void 0);
__decorate([property({
  attribute: "activation-mode",
  useDefault: true,
  reflect: false
})], M3ePanGestureElement.prototype, "activationMode", void 0);
__decorate([property({
  attribute: "min-displacement",
  type: Number,
  reflect: false
})], M3ePanGestureElement.prototype, "minDisplacement", void 0);
__decorate([property({
  attribute: "lock-axis",
  reflect: false
})], M3ePanGestureElement.prototype, "lockAxis", void 0);
__decorate([property({
  attribute: "axis-threshold",
  type: Number,
  reflect: false
})], M3ePanGestureElement.prototype, "axisThreshold", void 0);
__decorate([property({
  attribute: "delta-threshold",
  type: Number,
  reflect: false
})], M3ePanGestureElement.prototype, "deltaThreshold", void 0);
__decorate([property({
  attribute: "max-press-interval",
  type: Number,
  reflect: false
})], M3ePanGestureElement.prototype, "maxPressInterval", void 0);
M3ePanGestureElement = __decorate([customElement("m3e-pan-gesture")], M3ePanGestureElement);

export { DefaultPanGestureOptions, M3ePanGestureElement, PanGestureRecognizer };
//# sourceMappingURL=PanGestureElement.js.map
