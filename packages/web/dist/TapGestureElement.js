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

/** Defines the default options used to detect and interpret tap gestures. */
const DefaultTapGestureOptions = {
  ...DefaultGestureOptions,
  pointers: 1,
  maxDuration: 180,
  maxDisplacement: 12,
  maxPressInterval: 120,
  maxReleaseInterval: 120
};

var _TapGestureRecognizer_instances, _TapGestureRecognizer_state, _TapGestureRecognizer_timeout, _TapGestureRecognizer_started, _TapGestureRecognizer_cancelled, _TapGestureRecognizer_cancelling, _TapGestureRecognizer_cancel, _TapGestureRecognizer_createDetail;
/** A {@link GestureRecognizer} used to detect and interpret tap gestures from incoming input streams. */
class TapGestureRecognizer extends GestureRecognizerBase {
  constructor() {
    super(...arguments);
    _TapGestureRecognizer_instances.add(this);
    /** @private */
    _TapGestureRecognizer_state.set(this, new Map());
    /** @private */
    _TapGestureRecognizer_timeout.set(this, void 0);
    /** @private */
    _TapGestureRecognizer_started.set(this, false);
    /** @private */
    _TapGestureRecognizer_cancelled.set(this, false);
    /** @private */
    _TapGestureRecognizer_cancelling.set(this, false);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultTapGestureOptions
    };
  }
  /** @inheritdoc */
  shouldCapturePointer(input) {
    return __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").has(input.inputId);
  }
  /** @inheritdoc */
  _onPointerDown(input) {
    // Reject duplicate input or too many pointers.
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").has(input.inputId) || __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").size >= this.options.pointers) {
      __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this);
      return;
    }
    // Reject if press exceeds interval from initial press.
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").size > 0 && this.options.maxPressInterval > 0) {
      const initialPress = Math.min(...[...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").values()].map(x => x.pressTimestamp));
      if (input.timestamp - initialPress > this.options.maxPressInterval) {
        __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this);
        return;
      }
    }
    __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").set(input.inputId, {
      tracker: new PointerTracker(input),
      pressTimestamp: input.timestamp
    });
    // Ensure max duration is not exceeded (starts from first pointer down).
    if (this.options.maxDuration > 0 && __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").size === 1) {
      __classPrivateFieldSet(this, _TapGestureRecognizer_timeout, setTimeout(() => __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this), this.options.maxDuration), "f");
    }
    // Input is deferred in order to notify the recognizer via reject when other gesture accepts.
    this._defer(input.inputId);
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").size === this.options.pointers) {
      // Emit start only when all pointers are down.
      __classPrivateFieldSet(this, _TapGestureRecognizer_started, true, "f");
      this._emit(__classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_createDetail).call(this, "start"));
    }
  }
  /** @inheritdoc */
  _onPointerMove(input) {
    // Ignore if pointer is not tracked.
    const state = __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").get(input.inputId);
    if (!state) return;
    state.tracker.append(input);
    // Only enforce displacement after gesture has started and not cancelled.
    if (!__classPrivateFieldGet(this, _TapGestureRecognizer_started, "f") || __classPrivateFieldGet(this, _TapGestureRecognizer_cancelled, "f")) return;
    // Reject when the centroid of the pointers moves beyond the allowed displacement.
    const trackers = [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").values()].map(x => x.tracker);
    if (PointerTracker.centroid(...trackers).totalDisplacement > this.options.maxDisplacement) {
      __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onPointerUp(input) {
    // Ignore if pointer is not tracked.
    const state = __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").get(input.inputId);
    if (!state) return;
    if (!__classPrivateFieldGet(this, _TapGestureRecognizer_started, "f")) {
      __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this);
      return;
    }
    // Reject if release exceeds interval from initial release.
    if (this.options.maxReleaseInterval > 0) {
      const states = [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").values()];
      if (states.some(x => x.releaseTimestamp !== undefined)) {
        const initialRelease = Math.min(...states.filter(x => x.releaseTimestamp !== undefined).map(x => x.releaseTimestamp));
        if (input.timestamp - initialRelease > this.options.maxReleaseInterval) {
          __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this);
          return;
        }
      }
    }
    state.tracker.append(input);
    state.releaseTimestamp = input.timestamp;
    // Clear max duration timeout when all pointers have pressed and released.
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_started, "f") && [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").values()].every(x => x.releaseTimestamp !== undefined)) {
      clearTimeout(__classPrivateFieldGet(this, _TapGestureRecognizer_timeout, "f"));
      __classPrivateFieldSet(this, _TapGestureRecognizer_timeout, undefined, "f");
    }
    // Acceptance emits the final detail only after every pointer is accepted.
    this._accept(input.inputId);
  }
  /** @inheritdoc */
  _onPointerCancel(input) {
    const state = __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").get(input.inputId);
    if (state) {
      __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this);
    }
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    const state = __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").get(inputId);
    if (!state) return;
    state.accepted = true;
    // Only emit end if gesture started, not cancelled and all inputs are accepted.
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_started, "f") && !__classPrivateFieldGet(this, _TapGestureRecognizer_cancelled, "f") && [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").values()].every(x => x.accepted)) {
      this._emit(__classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_createDetail).call(this, "end"));
      this.reset();
    }
  }
  /** @inheritdoc */
  _onReject(inputId) {
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").has(inputId)) {
      __classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_cancel).call(this, inputId);
    }
  }
  /** @inheritdoc */
  reset() {
    clearTimeout(__classPrivateFieldGet(this, _TapGestureRecognizer_timeout, "f"));
    __classPrivateFieldSet(this, _TapGestureRecognizer_timeout, undefined, "f");
    __classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").clear();
    __classPrivateFieldSet(this, _TapGestureRecognizer_started, false, "f");
    __classPrivateFieldSet(this, _TapGestureRecognizer_cancelled, false, "f");
  }
}
_TapGestureRecognizer_state = new WeakMap(), _TapGestureRecognizer_timeout = new WeakMap(), _TapGestureRecognizer_started = new WeakMap(), _TapGestureRecognizer_cancelled = new WeakMap(), _TapGestureRecognizer_cancelling = new WeakMap(), _TapGestureRecognizer_instances = new WeakSet(), _TapGestureRecognizer_cancel = function _TapGestureRecognizer_cancel(excludeInputId) {
  // Resolver callbacks are synchronous, so guard the rejection loop against recursive cancellation.
  if (__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").size === 0 || __classPrivateFieldGet(this, _TapGestureRecognizer_cancelling, "f")) return;
  try {
    __classPrivateFieldSet(this, _TapGestureRecognizer_cancelling, true, "f");
    // Emit cancel if started and not yet cancelled.
    if (__classPrivateFieldGet(this, _TapGestureRecognizer_started, "f") && !__classPrivateFieldGet(this, _TapGestureRecognizer_cancelled, "f")) {
      this._emit(__classPrivateFieldGet(this, _TapGestureRecognizer_instances, "m", _TapGestureRecognizer_createDetail).call(this, "cancel"));
    }
    __classPrivateFieldSet(this, _TapGestureRecognizer_cancelled, true, "f");
    // Reject all inputs and reset.
    [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").keys()].filter(x => x !== excludeInputId).forEach(x => this._reject(x));
    this.reset();
  } finally {
    __classPrivateFieldSet(this, _TapGestureRecognizer_cancelling, false, "f");
  }
}, _TapGestureRecognizer_createDetail = function _TapGestureRecognizer_createDetail(phase) {
  const trackers = [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").values()].map(x => x.tracker);
  const centroid = PointerTracker.centroid(...trackers);
  return {
    gestureName: "tap",
    phase,
    inputId: [...__classPrivateFieldGet(this, _TapGestureRecognizer_state, "f").keys()],
    timestamp: Math.max(...trackers.map(x => x.current.timestamp)),
    clientX: centroid.startClientX,
    clientY: centroid.startClientY,
    localX: centroid.startLocalX,
    localY: centroid.startLocalY,
    duration: trackers.reduce((sum, x) => sum + x.detail.duration, 0) / trackers.length
  };
};

/**
 * A non-visual element used to detect and interpret tap gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-tap-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr max-displacement - Maximum allowed movement (px).
 * @attr max-duration - Maximum allowed press duration (ms).
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 * @attr max-release-interval - Maximum allowed time (ms) between the earliest and latest release.
 *
 * @fires gesture - Emitted when semantic detail about a gesture is detected.
 */
let M3eTapGestureElement = class M3eTapGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    /** @inheritdoc */
    this.recognizer = new TapGestureRecognizer();
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    this.pointers = this.recognizer.defaultOptions.pointers;
    /**
     * Maximum allowed press duration (ms).
     * @default 180
     */
    this.maxDuration = this.recognizer.defaultOptions.maxDuration;
    /**
     * Maximum allowed movement (px).
     * @default 12
     */
    this.maxDisplacement = this.recognizer.defaultOptions.maxDisplacement;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    this.maxPressInterval = this.recognizer.defaultOptions.maxPressInterval;
    /**
     * Maximum allowed time (ms) between the earliest and latest release.
     * @default 120
     */
    this.maxReleaseInterval = this.recognizer.defaultOptions.maxReleaseInterval;
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    this.recognizer.options = {
      pointers: this.pointers,
      maxPressInterval: this.maxPressInterval,
      maxReleaseInterval: this.maxReleaseInterval,
      maxDuration: this.maxDuration,
      maxDisplacement: this.maxDisplacement
    };
  }
};
__decorate([property({
  type: Number,
  reflect: false
})], M3eTapGestureElement.prototype, "pointers", void 0);
__decorate([property({
  attribute: "max-duration",
  type: Number,
  reflect: false
})], M3eTapGestureElement.prototype, "maxDuration", void 0);
__decorate([property({
  attribute: "max-displacement",
  type: Number,
  reflect: false
})], M3eTapGestureElement.prototype, "maxDisplacement", void 0);
__decorate([property({
  attribute: "max-press-interval",
  type: Number,
  reflect: false
})], M3eTapGestureElement.prototype, "maxPressInterval", void 0);
__decorate([property({
  attribute: "max-release-interval",
  type: Number,
  reflect: false
})], M3eTapGestureElement.prototype, "maxReleaseInterval", void 0);
M3eTapGestureElement = __decorate([customElement("m3e-tap-gesture")], M3eTapGestureElement);

export { DefaultTapGestureOptions, M3eTapGestureElement, TapGestureRecognizer };
//# sourceMappingURL=TapGestureElement.js.map
