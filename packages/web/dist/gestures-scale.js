/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldSet, __classPrivateFieldGet, __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { customElement } from './TextOverflowElement.js';
import 'lit';
import 'lit/directives/if-defined.js';
import { DefaultGestureOptions, DelegatingGestureRecognizerBase, GestureElementBase } from './PointerTracker.js';
import { PanGestureRecognizer } from './PanGestureElement.js';

/** Defines the default options used to detect and interpret scale gestures. */
const DefaultScaleGestureOptions = {
  ...DefaultGestureOptions,
  minDisplacement: 4,
  pointers: 2,
  maxPressInterval: 120
};

var _ScaleGestureRecognizer_initialDistance, _ScaleGestureRecognizer_previousDistance;
/** A {@link GestureRecognizer} used to detect and interpret scale gestures from incoming input streams. */
class ScaleGestureRecognizer extends DelegatingGestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<ScaleGestureOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<ScaleGestureDetail>} listener The function invoked when semantic detail is emitted.
   */
  constructor(options, listener) {
    super(options, listener, new PanGestureRecognizer());
    /** @private */
    _ScaleGestureRecognizer_initialDistance.set(this, 0);
    /** @private */
    _ScaleGestureRecognizer_previousDistance.set(this, 0);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultScaleGestureOptions
    };
  }
  /** @inheritdoc */
  _applyOptions(options, inner) {
    super._applyOptions(options, inner);
    inner.options = {
      minDisplacement: options.minDisplacement,
      pointers: options.pointers,
      maxPressInterval: options.maxPressInterval
    };
  }
  /** @inheritdoc */
  _handleGesture(detail) {
    const trackers = this._inner?.trackers;
    if (!trackers || trackers.length < 2) return;
    const centroidX = detail.clientX;
    const centroidY = detail.clientY;
    let sum = 0;
    for (const t of trackers) {
      const p = t.current;
      const dx = p.clientX - centroidX;
      const dy = p.clientY - centroidY;
      sum += Math.hypot(dx, dy);
    }
    const currentDistance = sum / trackers.length;
    // Capture initial distance on gesture start
    if (detail.phase === "start") {
      __classPrivateFieldSet(this, _ScaleGestureRecognizer_initialDistance, currentDistance, "f");
      __classPrivateFieldSet(this, _ScaleGestureRecognizer_previousDistance, currentDistance, "f");
    }
    const scale = currentDistance / __classPrivateFieldGet(this, _ScaleGestureRecognizer_initialDistance, "f");
    const scaleDelta = (currentDistance - __classPrivateFieldGet(this, _ScaleGestureRecognizer_previousDistance, "f")) / __classPrivateFieldGet(this, _ScaleGestureRecognizer_initialDistance, "f");
    const scaleVelocity = detail.deltaTime > 0 ? scaleDelta / detail.deltaTime : 0;
    __classPrivateFieldSet(this, _ScaleGestureRecognizer_previousDistance, currentDistance, "f");
    const scaleDetail = {
      ...detail,
      gestureName: "scale",
      initialDistance: __classPrivateFieldGet(this, _ScaleGestureRecognizer_initialDistance, "f"),
      currentDistance,
      scale,
      scaleDelta,
      scaleVelocity
    };
    this._emit(scaleDetail);
  }
  /** @inheritdoc */
  reset() {
    super.reset();
    __classPrivateFieldSet(this, _ScaleGestureRecognizer_initialDistance, 0, "f");
    __classPrivateFieldSet(this, _ScaleGestureRecognizer_previousDistance, 0, "f");
  }
}
_ScaleGestureRecognizer_initialDistance = new WeakMap(), _ScaleGestureRecognizer_previousDistance = new WeakMap();

/**
 * A non-visual element used to detect and interpret scale gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-scale-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr min-displacement - Minimum distance (px) a pointer must move before the gesture starts.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a gesture is detected.
 */
let M3eScaleGestureElement = class M3eScaleGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    /** @inheritdoc */
    this.recognizer = new ScaleGestureRecognizer();
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 2
     */
    this.pointers = this.recognizer.defaultOptions.pointers;
    /**
     * Minimum distance (px) a pointer must move before the gesture starts.
     * @default 4
     */
    this.minDisplacement = this.recognizer.defaultOptions.minDisplacement;
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
      minDisplacement: this.minDisplacement,
      maxPressInterval: this.maxPressInterval
    };
  }
};
__decorate([property({
  type: Number,
  reflect: false
})], M3eScaleGestureElement.prototype, "pointers", void 0);
__decorate([property({
  attribute: "min-displacement",
  type: Number,
  reflect: false
})], M3eScaleGestureElement.prototype, "minDisplacement", void 0);
__decorate([property({
  attribute: "max-press-interval",
  type: Number,
  reflect: false
})], M3eScaleGestureElement.prototype, "maxPressInterval", void 0);
M3eScaleGestureElement = __decorate([customElement("m3e-scale-gesture")], M3eScaleGestureElement);

/** @internal */
function scale(listenerOrOptions, maybeOptions) {
  let listener;
  let options;
  if (typeof listenerOrOptions === "function") {
    listener = listenerOrOptions;
    options = maybeOptions;
  } else {
    options = listenerOrOptions;
  }
  return new ScaleGestureRecognizer(options, listener);
}

export { DefaultScaleGestureOptions, M3eScaleGestureElement, ScaleGestureRecognizer, scale };
//# sourceMappingURL=gestures-scale.js.map
