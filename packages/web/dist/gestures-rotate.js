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

/** Defines the default options used to detect and interpret rotate gestures. */
const DefaultRotateGestureOptions = {
  ...DefaultGestureOptions,
  activationMode: "press",
  minDisplacement: 4,
  pointers: 2,
  maxPressInterval: 120
};

var _RotateGestureRecognizer_initialAngle, _RotateGestureRecognizer_previousAngle;
/** A {@link GestureRecognizer} used to detect and interpret rotate gestures from incoming input streams. */
class RotateGestureRecognizer extends DelegatingGestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<RotateGestureOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<RotateGestureDetail>} listener The function invoked when semantic detail is emitted.
   */
  constructor(options, listener) {
    super(options, listener, new PanGestureRecognizer());
    /** @private */
    _RotateGestureRecognizer_initialAngle.set(this, 0);
    /** @private */
    _RotateGestureRecognizer_previousAngle.set(this, 0);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultRotateGestureOptions
    };
  }
  /** @inheritdoc */
  _applyOptions(options, inner) {
    super._applyOptions(options, inner);
    inner.options = {
      activationMode: options.activationMode,
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
      sum += Math.atan2(dy, dx);
    }
    const currentAngle = sum / trackers.length;
    if (detail.phase === "start") {
      __classPrivateFieldSet(this, _RotateGestureRecognizer_initialAngle, currentAngle, "f");
      __classPrivateFieldSet(this, _RotateGestureRecognizer_previousAngle, currentAngle, "f");
    }
    const rotation = currentAngle - __classPrivateFieldGet(this, _RotateGestureRecognizer_initialAngle, "f");
    const rotationDelta = currentAngle - __classPrivateFieldGet(this, _RotateGestureRecognizer_previousAngle, "f");
    const rotationVelocity = detail.deltaTime > 0 ? rotationDelta / detail.deltaTime : 0;
    __classPrivateFieldSet(this, _RotateGestureRecognizer_previousAngle, currentAngle, "f");
    const rotateDetail = {
      gestureName: "rotate",
      phase: detail.phase,
      inputId: detail.inputId,
      timestamp: detail.timestamp,
      initialAngle: __classPrivateFieldGet(this, _RotateGestureRecognizer_initialAngle, "f"),
      currentAngle,
      rotation,
      rotationDelta,
      rotationVelocity
    };
    this._emit(rotateDetail);
  }
  /** @inheritdoc */
  reset() {
    super.reset();
    __classPrivateFieldSet(this, _RotateGestureRecognizer_initialAngle, 0, "f");
    __classPrivateFieldSet(this, _RotateGestureRecognizer_previousAngle, 0, "f");
  }
}
_RotateGestureRecognizer_initialAngle = new WeakMap(), _RotateGestureRecognizer_previousAngle = new WeakMap();

/**
 * A non-visual element used to detect and interpret rotate gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-rotate-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr activation-mode - Mode in which to activate the gesture.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr min-displacement - Minimum centroid displacement (px) before rotation starts.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a gesture is detected.
 */
let M3eRotateGestureElement = class M3eRotateGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    /** @inheritdoc */
    this.recognizer = new RotateGestureRecognizer();
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 2
     */
    this.pointers = this.recognizer.defaultOptions.pointers;
    /**
     * Mode in which to activate the gesture.
     * @default "press"
     */
    this.activationMode = this.recognizer.defaultOptions.activationMode;
    /**
     * Minimum centroid displacement (px) before rotation starts.
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
      activationMode: this.activationMode,
      pointers: this.pointers,
      minDisplacement: this.minDisplacement,
      maxPressInterval: this.maxPressInterval
    };
  }
};
__decorate([property({
  type: Number,
  reflect: false
})], M3eRotateGestureElement.prototype, "pointers", void 0);
__decorate([property({
  attribute: "activation-mode",
  useDefault: true,
  reflect: false
})], M3eRotateGestureElement.prototype, "activationMode", void 0);
__decorate([property({
  attribute: "min-displacement",
  type: Number,
  reflect: false
})], M3eRotateGestureElement.prototype, "minDisplacement", void 0);
__decorate([property({
  attribute: "max-press-interval",
  type: Number,
  reflect: false
})], M3eRotateGestureElement.prototype, "maxPressInterval", void 0);
M3eRotateGestureElement = __decorate([customElement("m3e-rotate-gesture")], M3eRotateGestureElement);

/** @internal */
function rotate(listenerOrOptions, maybeOptions) {
  let listener;
  let options;
  if (typeof listenerOrOptions === "function") {
    listener = listenerOrOptions;
    options = maybeOptions;
  } else {
    options = listenerOrOptions;
  }
  return new RotateGestureRecognizer(options, listener);
}

export { DefaultRotateGestureOptions, M3eRotateGestureElement, RotateGestureRecognizer, rotate };
//# sourceMappingURL=gestures-rotate.js.map
