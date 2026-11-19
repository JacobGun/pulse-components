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

/** Defines the default options used to detect and interpret long-press gestures. */
const DefaultLongPressGestureOptions = {
  ...DefaultGestureOptions,
  pointers: 1,
  minDuration: 500,
  maxDisplacement: 4,
  maxPressInterval: 120,
  discrete: false
};

var _LongPressGestureRecognizer_instances, _LongPressGestureRecognizer_state, _LongPressGestureRecognizer_timeout, _LongPressGestureRecognizer_starting, _LongPressGestureRecognizer_started, _LongPressGestureRecognizer_cancelled, _LongPressGestureRecognizer_cancelling, _LongPressGestureRecognizer_cancel, _LongPressGestureRecognizer_createDetail;
/** A {@link GestureRecognizer} used to detect and interpret long-press gestures from incoming input streams. */
class LongPressGestureRecognizer extends GestureRecognizerBase {
  constructor() {
    super(...arguments);
    _LongPressGestureRecognizer_instances.add(this);
    /** @private */
    _LongPressGestureRecognizer_state.set(this, new Map());
    /** @private */
    _LongPressGestureRecognizer_timeout.set(this, void 0);
    /** @private */
    _LongPressGestureRecognizer_starting.set(this, false);
    /** @private */
    _LongPressGestureRecognizer_started.set(this, false);
    /** @private */
    _LongPressGestureRecognizer_cancelled.set(this, false);
    /** @private */
    _LongPressGestureRecognizer_cancelling.set(this, false);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultLongPressGestureOptions
    };
  }
  /** @inheritdoc */
  get eager() {
    return true;
  }
  /** @inheritdoc */
  shouldCapturePointer(input) {
    return __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").has(input.inputId);
  }
  /** @inheritdoc */
  _onPointerDown(input) {
    // Reject duplicate input or too many pointers.
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").has(input.inputId) || __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").size >= this.options.pointers) {
      __classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_cancel).call(this);
      return;
    }
    // Reject if press exceeds interval from initial press.
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").size > 0 && this.options.maxPressInterval > 0) {
      const initialPress = Math.min(...[...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").values()].map(x => x.pressTimestamp));
      if (input.timestamp - initialPress > this.options.maxPressInterval) {
        __classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_cancel).call(this);
        return;
      }
    }
    __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").set(input.inputId, {
      tracker: new PointerTracker(input),
      pressTimestamp: input.timestamp
    });
    this._defer(input.inputId);
    // Ignore unless all pointers are down.
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").size !== this.options.pointers) return;
    if (!this.options.discrete) {
      // Emit start only when all pointers are down.
      __classPrivateFieldSet(this, _LongPressGestureRecognizer_started, true, "f");
      this._emit(__classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_createDetail).call(this, "start"));
      // Start acceptance timeout
      const timeout = __classPrivateFieldSet(this, _LongPressGestureRecognizer_timeout, setTimeout(() => {
        if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_timeout, "f") !== timeout) return;
        __classPrivateFieldSet(this, _LongPressGestureRecognizer_timeout, undefined, "f");
        if (!__classPrivateFieldGet(this, _LongPressGestureRecognizer_cancelled, "f")) {
          // Acceptance emits the final detail only after every pointer is accepted.
          this._accept([...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").keys()]);
        }
      }, this.options.minDuration), "f");
    } else {
      __classPrivateFieldSet(this, _LongPressGestureRecognizer_starting, true, "f");
      const timeout = __classPrivateFieldSet(this, _LongPressGestureRecognizer_timeout, setTimeout(() => {
        if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_timeout, "f") !== timeout) return;
        __classPrivateFieldSet(this, _LongPressGestureRecognizer_timeout, undefined, "f");
        if (!__classPrivateFieldGet(this, _LongPressGestureRecognizer_cancelled, "f")) {
          // Emit start only when all all pointers held for min-duration.
          // Acceptance and end occur on pointerup.
          __classPrivateFieldSet(this, _LongPressGestureRecognizer_started, true, "f");
          this._emit(__classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_createDetail).call(this, "start"));
        }
      }, this.options.minDuration), "f");
    }
  }
  /** @inheritdoc */
  _onPointerMove(input) {
    // Ignore if pointer is not tracked.
    const state = __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").get(input.inputId);
    if (!state) return;
    state.tracker.append(input);
    // Only enforce displacement after gesture has started (or discrete is starting) and not cancelled.
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_cancelled, "f")) return;
    if (!this.options.discrete && !__classPrivateFieldGet(this, _LongPressGestureRecognizer_started, "f")) return;
    if (this.options.discrete && !__classPrivateFieldGet(this, _LongPressGestureRecognizer_starting, "f")) return;
    // Reject when the centroid of the pointers moves beyond the allowed displacement.
    const trackers = [...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").values()].map(x => x.tracker);
    if (PointerTracker.centroid(...trackers).totalDisplacement > this.options.maxDisplacement) {
      __classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onPointerUp(input) {
    const state = __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").get(input.inputId);
    if (state) {
      state.tracker.append(input);
      if (this.options.discrete && __classPrivateFieldGet(this, _LongPressGestureRecognizer_started, "f")) {
        // Acceptance emits the final detail only after every pointer is accepted.
        this._accept([...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").keys()]);
        return;
      }
      // If any pointer comes up before the gesture has fully ended, the long‑press must cancel.
      // If pointers are pending acceptance (other gestures have holds), these will be rejected.
      __classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onPointerCancel(input) {
    const state = __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").get(input.inputId);
    if (state) {
      __classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    const state = __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").get(inputId);
    if (!state) return;
    state.accepted = true;
    // Only emit end if gesture started, not cancelled and all inputs are accepted.
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_started, "f") && !__classPrivateFieldGet(this, _LongPressGestureRecognizer_cancelled, "f") && [...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").values()].every(x => x.accepted)) {
      this._emit(__classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_createDetail).call(this, "end"));
      this.reset();
    }
  }
  /** @inheritdoc */
  _onReject(inputId) {
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").has(inputId)) {
      __classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_cancel).call(this, inputId);
    }
  }
  /** @inheritdoc */
  reset() {
    clearTimeout(__classPrivateFieldGet(this, _LongPressGestureRecognizer_timeout, "f"));
    __classPrivateFieldSet(this, _LongPressGestureRecognizer_timeout, undefined, "f");
    __classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").clear();
    __classPrivateFieldSet(this, _LongPressGestureRecognizer_starting, __classPrivateFieldSet(this, _LongPressGestureRecognizer_started, __classPrivateFieldSet(this, _LongPressGestureRecognizer_cancelled, false, "f"), "f"), "f");
  }
}
_LongPressGestureRecognizer_state = new WeakMap(), _LongPressGestureRecognizer_timeout = new WeakMap(), _LongPressGestureRecognizer_starting = new WeakMap(), _LongPressGestureRecognizer_started = new WeakMap(), _LongPressGestureRecognizer_cancelled = new WeakMap(), _LongPressGestureRecognizer_cancelling = new WeakMap(), _LongPressGestureRecognizer_instances = new WeakSet(), _LongPressGestureRecognizer_cancel = function _LongPressGestureRecognizer_cancel(excludeInputId) {
  // Resolver callbacks are synchronous, so guard the rejection loop against recursive cancellation.
  if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").size === 0 || __classPrivateFieldGet(this, _LongPressGestureRecognizer_cancelling, "f")) return;
  try {
    __classPrivateFieldSet(this, _LongPressGestureRecognizer_cancelling, true, "f");
    // Emit cancel if started and not yet cancelled.
    if (__classPrivateFieldGet(this, _LongPressGestureRecognizer_started, "f") && !__classPrivateFieldGet(this, _LongPressGestureRecognizer_cancelled, "f")) {
      this._emit(__classPrivateFieldGet(this, _LongPressGestureRecognizer_instances, "m", _LongPressGestureRecognizer_createDetail).call(this, "cancel"));
    }
    __classPrivateFieldSet(this, _LongPressGestureRecognizer_cancelled, true, "f");
    // Reject all inputs and reset.
    [...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").keys()].filter(x => x !== excludeInputId).forEach(x => this._reject(x));
    this.reset();
  } finally {
    __classPrivateFieldSet(this, _LongPressGestureRecognizer_cancelling, false, "f");
  }
}, _LongPressGestureRecognizer_createDetail = function _LongPressGestureRecognizer_createDetail(phase) {
  const trackers = [...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").values()].map(x => x.tracker);
  const centroid = PointerTracker.centroid(...trackers);
  return {
    gestureName: "long-press",
    phase,
    inputId: [...__classPrivateFieldGet(this, _LongPressGestureRecognizer_state, "f").keys()],
    timestamp: Math.max(...trackers.map(x => x.current.timestamp)),
    clientX: centroid.startClientX,
    clientY: centroid.startClientY,
    localX: centroid.startLocalX,
    localY: centroid.startLocalY,
    duration: Math.max(trackers.reduce((sum, x) => sum + x.detail.duration, 0) / trackers.length, phase === "end" ? this.options.minDuration : 0)
  };
};

/**
 * A non-visual element used to detect and interpret long-press gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-long-press-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr discrete - Whether the gesture is discrete.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr max-displacement - Maximum allowed movement (px).
 * @attr min-duration - Minimum time (ms) a pointer must remain pressed.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a gesture is detected.
 */
let M3eLongPressGestureElement = class M3eLongPressGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    /** @inheritdoc */
    this.recognizer = new LongPressGestureRecognizer();
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    this.pointers = this.recognizer.defaultOptions.pointers;
    /**
     * Minimum time (ms) a pointer must remain pressed.
     * @default 500
     */
    this.minDuration = this.recognizer.defaultOptions.minDuration;
    /**
     * Maximum allowed movement (px).
     * @default 4
     */
    this.maxDisplacement = this.recognizer.defaultOptions.maxDisplacement;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    this.maxPressInterval = this.recognizer.defaultOptions.maxPressInterval;
    /**
     * Whether the gesture is discrete. If `true`, starts after `minDuration`
     * while pointers stay down and ends on pointer-up. If `false`, starts
     * immediately when pointers are down and ends after `minDuration`.
     * @default false
     */
    this.discrete = false;
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    this.recognizer.options = {
      pointers: this.pointers,
      minDuration: this.minDuration,
      maxDisplacement: this.maxDisplacement,
      maxPressInterval: this.maxPressInterval,
      discrete: this.discrete
    };
  }
};
__decorate([property({
  type: Number,
  reflect: false
})], M3eLongPressGestureElement.prototype, "pointers", void 0);
__decorate([property({
  attribute: "min-duration",
  type: Number,
  reflect: false
})], M3eLongPressGestureElement.prototype, "minDuration", void 0);
__decorate([property({
  attribute: "max-displacement",
  type: Number,
  reflect: false
})], M3eLongPressGestureElement.prototype, "maxDisplacement", void 0);
__decorate([property({
  attribute: "max-press-interval",
  type: Number,
  reflect: false
})], M3eLongPressGestureElement.prototype, "maxPressInterval", void 0);
__decorate([property({
  type: Boolean,
  reflect: false
})], M3eLongPressGestureElement.prototype, "discrete", void 0);
M3eLongPressGestureElement = __decorate([customElement("m3e-long-press-gesture")], M3eLongPressGestureElement);

/** @internal */
function longPress(listenerOrOptions, maybeOptions) {
  let listener;
  let options;
  if (typeof listenerOrOptions === "function") {
    listener = listenerOrOptions;
    options = maybeOptions;
  } else {
    options = listenerOrOptions;
  }
  return new LongPressGestureRecognizer(options, listener);
}

export { DefaultLongPressGestureOptions, LongPressGestureRecognizer, M3eLongPressGestureElement, longPress };
//# sourceMappingURL=longPress.js.map
