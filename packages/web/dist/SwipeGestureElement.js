/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { customElement } from './TextOverflowElement.js';
import { spaceSeparatedStringConverter } from './spaceSeparatedStringConverter.js';
import 'lit';
import 'lit/directives/if-defined.js';
import { DefaultGestureOptions, DelegatingGestureRecognizerBase, GestureElementBase } from './PointerTracker.js';
import { PanGestureRecognizer } from './PanGestureElement.js';

/** Defines the default options used to detect and interpret swipe gestures. */
const DefaultSwipeGestureOptions = {
  ...DefaultGestureOptions,
  pointers: 1,
  startThreshold: 4,
  minVelocity: 0.3,
  directions: ["left", "right", "up", "down"],
  directionThreshold: 12,
  directionGracePeriod: 0,
  minDisplacement: 24,
  maxPressInterval: 120
};

var _SwipeGestureRecognizer_instances, _SwipeGestureRecognizer_state, _SwipeGestureRecognizer_shouldIgnoreInput, _SwipeGestureRecognizer_computeDirection, _SwipeGestureRecognizer_createDetail, _SwipeGestureRecognizer_releaseAndReset;
/** A {@link GestureRecognizer} used to detect and interpret swipe gestures from incoming input streams. */
class SwipeGestureRecognizer extends DelegatingGestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<SwipeGestureOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<SwipeGestureDetail>} listener The function invoked when semantic detail is emitted.
   */
  constructor(options, listener) {
    super(options, listener, new PanGestureRecognizer());
    _SwipeGestureRecognizer_instances.add(this);
    /** @private */
    _SwipeGestureRecognizer_state.set(this, void 0);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultSwipeGestureOptions
    };
  }
  /** @inheritdoc */
  get eager() {
    return true;
  }
  /** @inheritdoc */
  _applyOptions(options, inner) {
    super._applyOptions(options, inner);
    inner.options = {
      minDisplacement: options.startThreshold,
      pointers: options.pointers,
      maxPressInterval: options.maxPressInterval
    };
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    // Ignore if no state or state is for a different input.
    if (!__classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f") || __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_shouldIgnoreInput).call(this, inputId, __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f"))) return;
    this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "end", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
    this.reset();
  }
  /** @inheritdoc */
  _onReject(inputId) {
    // Ignore if no state or state is for a different input.
    if (!__classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f") || __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_shouldIgnoreInput).call(this, inputId, __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f"))) return;
    this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
    this.reset();
  }
  /** @private */
  _handleDisposition(inputId, disposition) {
    if (disposition === "accept") {
      // The inner recognizer does not compete with other gestures.
      this._inner?.onResolution(inputId, "accept");
    }
  }
  _handleGesture(detail) {
    switch (detail.phase) {
      case "cancel":
        // If cancelled and there is state (gesture started), cancel and release deferred input.
        // Otherwise, just reset the recognizer.
        if (__classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")) {
          this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
          __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
        } else {
          this.reset();
        }
        break;
      case "start":
        // On start, initialize state, emit start and defer input. Input is deferred so that the
        // recognizer can be informed when another gesture accepts the input.
        __classPrivateFieldSet(this, _SwipeGestureRecognizer_state, {
          detail,
          direction: __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_computeDirection).call(this, detail),
          axis: detail.axis
        }, "f");
        this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "start", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
        this._defer(detail.inputId);
        break;
      case "update":
        {
          // On update (pointer move), update state, and validate whether the started gesture should be cancelled.
          const previousAxis = __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")?.axis ?? detail.axis;
          const newAxis = detail.axis;
          __classPrivateFieldSet(this, _SwipeGestureRecognizer_state, {
            detail,
            direction: __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_computeDirection).call(this, detail),
            axis: newAxis
          }, "f");
          if (this.options.directionGracePeriod > 0 && detail.duration > this.options.directionGracePeriod) {
            // Cancel early if axis flips after a grace period.
            if (previousAxis !== newAxis) {
              this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
              __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
              break;
            }
            // Cancel early if direction is not supported after a grace period.
            if (!this.options.directions.includes(__classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f").direction)) {
              this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
              __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
              break;
            }
          }
          // Emit an update if the gesture has not been cancelled.
          this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "update", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
          break;
        }
      case "end":
        {
          __classPrivateFieldSet(this, _SwipeGestureRecognizer_state, {
            detail,
            direction: __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_computeDirection).call(this, detail),
            axis: detail.axis
          }, "f");
          // Cancel if there is not enough displacement.
          if (detail.totalDisplacement < this.options.minDisplacement) {
            this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
            __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
            break;
          }
          // Cancel if not enough velocity.
          if (detail.speed < this.options.minVelocity) {
            this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
            __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
            break;
          }
          // Cancel if there is no directional commitment.
          const committed = __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f").axis === "x" ? Math.abs(detail.totalDeltaX) >= this.options.directionThreshold : Math.abs(detail.totalDeltaY) >= this.options.directionThreshold;
          if (!committed) {
            this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
            __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
            break;
          }
          // Cancel if not in an allowed directions
          if (!this.options.directions.includes(__classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f").direction)) {
            this._emit(__classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_createDetail).call(this, "cancel", __classPrivateFieldGet(this, _SwipeGestureRecognizer_state, "f")));
            __classPrivateFieldGet(this, _SwipeGestureRecognizer_instances, "m", _SwipeGestureRecognizer_releaseAndReset).call(this, detail.inputId);
            break;
          }
          // Attempt to accept input (eagerly).
          this._accept(detail.inputId);
          break;
        }
    }
  }
  /** @inheritdoc */
  reset() {
    super.reset();
    __classPrivateFieldSet(this, _SwipeGestureRecognizer_state, undefined, "f");
  }
}
_SwipeGestureRecognizer_state = new WeakMap(), _SwipeGestureRecognizer_instances = new WeakSet(), _SwipeGestureRecognizer_shouldIgnoreInput = function _SwipeGestureRecognizer_shouldIgnoreInput(inputId, state) {
  const ids = Array.isArray(state.detail.inputId) ? state.detail.inputId : [state.detail.inputId];
  return !ids.includes(inputId);
}, _SwipeGestureRecognizer_computeDirection = function _SwipeGestureRecognizer_computeDirection(detail) {
  return detail.axis === "x" ? detail.totalDeltaX > 0 ? "right" : "left" : detail.totalDeltaY > 0 ? "down" : "up";
}, _SwipeGestureRecognizer_createDetail = function _SwipeGestureRecognizer_createDetail(phase, state) {
  return {
    inputId: state.detail.inputId,
    gestureName: "swipe",
    phase,
    timestamp: state.detail.timestamp,
    direction: state.direction,
    axis: state.detail.axis,
    startClientX: state.detail.startClientX,
    startClientY: state.detail.startClientY,
    startLocalX: state.detail.startLocalX,
    startLocalY: state.detail.startLocalY,
    translationX: state.detail.totalDeltaX,
    translationY: state.detail.totalDeltaY,
    displacement: state.detail.totalDisplacement,
    velocityX: state.detail.velocityX,
    velocityY: state.detail.velocityY,
    speed: state.detail.speed,
    duration: state.detail.duration
  };
}, _SwipeGestureRecognizer_releaseAndReset = function _SwipeGestureRecognizer_releaseAndReset(inputId) {
  this._release(inputId);
  this.reset();
};

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/**
 * A non-visual element used to detect and interpret swipe gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-swipe-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr start-threshold - Minimum distance (px) a pointer must move before the gesture starts.
 * @attr min-displacement - * Minimum distance (px) a pointer must move before the gesture can be recognized.
 * @attr min-velocity - Minimum velocity (px/ms) required to recognize a swipe.
 * @attr direction-threshold - Minimum displacement (px) required before direction is considered valid.
 * @attr direction-grace-period - Maximum amount of time (ms) a pointer can move in an uncommitted or
 * disallowed direction before the gesture is rejected.
 * @attr directions - The allowed directions of the swipe.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a swipe gesture is detected.
 */
let M3eSwipeGestureElement = class M3eSwipeGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    /** @inheritdoc */
    this.recognizer = new SwipeGestureRecognizer();
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    this.pointers = this.recognizer.defaultOptions.pointers;
    /**
     * Minimum distance (px) a pointer must move before the gesture starts.
     * @default 4
     */
    this.startThreshold = this.recognizer.defaultOptions.startThreshold;
    /**
     * * Minimum distance (px) a pointer must move before the gesture can be recognized.
     * @default 12
     */
    this.minDisplacement = this.recognizer.defaultOptions.minDisplacement;
    /**
     * Minimum velocity (px/ms) required before the gesture fails.
     * @default 0.3
     */
    this.minVelocity = this.recognizer.defaultOptions.minVelocity;
    /**
     * Minimum displacement (px) required before direction is considered valid.
     * @default 12
     */
    this.directionThreshold = this.recognizer.defaultOptions.directionThreshold;
    /**
     * Maximum amount of time (ms) a pointer can move in an uncommitted or
     * disallowed direction before the gesture is rejected. When set to 0,
     * early‑direction rejection is disabled.
     * @default 0
     */
    this.directionGracePeriod = this.recognizer.defaultOptions.directionGracePeriod;
    /**
     * The allowed directions of the swipe.
     * @default ["left", "right", "up", "down"]
     */
    this.directions = this.recognizer.defaultOptions.directions;
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
      startThreshold: this.startThreshold,
      minDisplacement: this.minDisplacement,
      minVelocity: this.minVelocity,
      directionThreshold: this.directionThreshold,
      directionGracePeriod: this.directionGracePeriod,
      directions: this.directions,
      maxPressInterval: this.maxPressInterval
    };
  }
};
__decorate([property({
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "pointers", void 0);
__decorate([property({
  attribute: "start-threshold",
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "startThreshold", void 0);
__decorate([property({
  attribute: "min-displacement",
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "minDisplacement", void 0);
__decorate([property({
  attribute: "min-velocity",
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "minVelocity", void 0);
__decorate([property({
  attribute: "direction-threshold",
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "directionThreshold", void 0);
__decorate([property({
  attribute: "direction-grace-period",
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "directionGracePeriod", void 0);
__decorate([property({
  converter: spaceSeparatedStringConverter,
  reflect: false
})], M3eSwipeGestureElement.prototype, "directions", void 0);
__decorate([property({
  attribute: "max-press-interval",
  type: Number,
  reflect: false
})], M3eSwipeGestureElement.prototype, "maxPressInterval", void 0);
M3eSwipeGestureElement = __decorate([customElement("m3e-swipe-gesture")], M3eSwipeGestureElement);

export { DefaultSwipeGestureOptions, M3eSwipeGestureElement, SwipeGestureRecognizer };
//# sourceMappingURL=SwipeGestureElement.js.map
