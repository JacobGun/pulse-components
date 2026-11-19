/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { DefaultGestureOptions, DelegatingGestureRecognizerBase, GestureElementBase } from './PointerTracker.js';

/** Defines the default options used to detect and interpret repeated gestures. */
const DefaultRepeatGestureOptions = {
  ...DefaultGestureOptions,
  maxInterval: 250,
  count: 2
};

var _RepeatGestureRecognizer_instances, _RepeatGestureRecognizer_details, _RepeatGestureRecognizer_accepted, _RepeatGestureRecognizer_timeout, _RepeatGestureRecognizer_createDetail;
/**
 * A {@link GestureRecognizer} used to detect and interpret repeated gestures from incoming input streams.
 * @template TDetail - The type of semantic detail produced by each repeated occurrence.
 */
class RepeatGestureRecognizer extends DelegatingGestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<RepeatGestureOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<RepeatGestureDetail<TDetail>>} listener The function invoked when semantic detail is emitted.
   * @param {GestureRecognizer<GestureOptions, TDetail>} recognizer The recognizer used to detect the gesture to repeat.
   */
  constructor(options, listener, recognizer) {
    super(options, listener, recognizer);
    _RepeatGestureRecognizer_instances.add(this);
    /** @private */
    _RepeatGestureRecognizer_details.set(this, new Array());
    /** @private */
    _RepeatGestureRecognizer_accepted.set(this, new Set());
    /** @private */
    _RepeatGestureRecognizer_timeout.set(this, void 0);
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultRepeatGestureOptions
    };
  }
  /** The recognizer used to detect the gesture to repeat. */
  get recognizer() {
    return super._inner;
  }
  set recognizer(value) {
    super._inner = value;
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    // Discard if input is not accepted (held).
    if (!__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").delete(inputId)) return;
    // End gesture when all input has been accepted.
    if (__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").size === 0 && __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").length === this.options.count) {
      this._emit(__classPrivateFieldGet(this, _RepeatGestureRecognizer_instances, "m", _RepeatGestureRecognizer_createDetail).call(this, "end"));
      this.reset();
    }
  }
  /** @inheritdoc */
  _onReject(inputId) {
    // Cancel and reset if accepted input was rejected.
    if (__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").has(inputId)) {
      this._emit(__classPrivateFieldGet(this, _RepeatGestureRecognizer_instances, "m", _RepeatGestureRecognizer_createDetail).call(this, "cancel"));
      this.reset();
    }
  }
  /** @inheritdoc */
  reset() {
    super.reset();
    clearTimeout(__classPrivateFieldGet(this, _RepeatGestureRecognizer_timeout, "f"));
    __classPrivateFieldSet(this, _RepeatGestureRecognizer_timeout, undefined, "f");
    __classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").forEach(x => this._release(x));
    __classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").clear();
    __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").length = 0;
  }
  /** @inheritdoc */
  _handleDisposition(inputId, disposition) {
    if (!this.recognizer) return;
    switch (disposition) {
      case "accept":
        // Place holds on accepted input and inform the recognizer it can be accepted.
        if (!__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").has(inputId)) {
          __classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").add(inputId);
          this._hold(inputId);
        }
        this.recognizer.onResolution(inputId, "accept");
        break;
      case "reject":
        // When a recognizer rejects, the repeated gesture is rejected.
        if (!__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").has(inputId)) {
          this._reject(inputId);
        }
        this.reset();
        break;
      case "hold":
        // Forward holds on input
        if (!__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").has(inputId)) {
          this._hold(inputId);
        }
        break;
      case "release":
        // Forward releases to holds on input.
        if (!__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").has(inputId)) {
          this._release(inputId);
        }
        break;
      case "defer":
        // Forward deferrals on input.
        if (!__classPrivateFieldGet(this, _RepeatGestureRecognizer_accepted, "f").has(inputId)) {
          this._defer(inputId);
        }
        break;
    }
  }
  /** @inheritdoc */
  _handleGesture(detail) {
    if (!this.recognizer) return;
    // Ignore non-terminal detail
    if (detail.phase === "start" || detail.phase === "update") return;
    if (detail.phase === "cancel") {
      if (__classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").length > 0) {
        // The gesture has started, cancel it
        this._emit(__classPrivateFieldGet(this, _RepeatGestureRecognizer_instances, "m", _RepeatGestureRecognizer_createDetail).call(this, "cancel"));
      }
      this.reset();
      return;
    }
    __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").push(detail);
    if (__classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").length === this.options.count) {
      // Disposition all inputs as accepted when detail count is satisfied
      __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").forEach(x => this._accept(x.inputId));
    } else {
      this._emit(__classPrivateFieldGet(this, _RepeatGestureRecognizer_instances, "m", _RepeatGestureRecognizer_createDetail).call(this, __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").length === 1 ? "start" : "update"));
      // Reset for next occurrence
      this.recognizer.reset();
      if (this.options.maxInterval > 0) {
        clearTimeout(__classPrivateFieldGet(this, _RepeatGestureRecognizer_timeout, "f"));
        // Cancel and reset (releasing outstanding holds) if max interval exceeded
        __classPrivateFieldSet(this, _RepeatGestureRecognizer_timeout, setTimeout(() => {
          this._emit(__classPrivateFieldGet(this, _RepeatGestureRecognizer_instances, "m", _RepeatGestureRecognizer_createDetail).call(this, "cancel"));
          this.reset();
        }, this.options.maxInterval), "f");
      }
    }
  }
}
_RepeatGestureRecognizer_details = new WeakMap(), _RepeatGestureRecognizer_accepted = new WeakMap(), _RepeatGestureRecognizer_timeout = new WeakMap(), _RepeatGestureRecognizer_instances = new WeakSet(), _RepeatGestureRecognizer_createDetail = function _RepeatGestureRecognizer_createDetail(phase) {
  const last = __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f")[__classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").length - 1];
  return {
    inputId: __classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f").flatMap(d => Array.isArray(d.inputId) ? d.inputId : [d.inputId]),
    gestureName: "repeat",
    phase,
    timestamp: last.timestamp,
    details: [...__classPrivateFieldGet(this, _RepeatGestureRecognizer_details, "f")]
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
var _M3eRepeatGestureElement_instances, _M3eRepeatGestureElement_handleSlotChange;
/**
 * A non-visual element used to detect and interpret repeated gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-repeat-gesture
 *
 * @slot - The gesture to repeat.
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr max-interval - Maximum allowed time (ms) between consecutive gesture occurrences.
 * @attr count - Number of times a gesture must be repeated.
 *
 * @fires gesture - Emitted when semantic detail about a repeated gesture is detected.
 */
let M3eRepeatGestureElement = class M3eRepeatGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    _M3eRepeatGestureElement_instances.add(this);
    /** @inheritdoc */
    this.recognizer = new RepeatGestureRecognizer();
    /**
     * Maximum allowed time (ms) between consecutive gesture occurrences.
     * @default 250
     */
    this.maxInterval = this.recognizer.defaultOptions.maxInterval;
    /**
     * Number of times a gesture must be repeated.
     * @default 2
     */
    this.count = this.recognizer.defaultOptions.count;
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    this.recognizer.options = {
      maxInterval: this.maxInterval,
      count: this.count
    };
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eRepeatGestureElement_instances, "m", _M3eRepeatGestureElement_handleSlotChange)}"></slot>`;
  }
};
_M3eRepeatGestureElement_instances = new WeakSet();
_M3eRepeatGestureElement_handleSlotChange = function _M3eRepeatGestureElement_handleSlotChange(e) {
  const elements = e.target.assignedElements({
    flatten: true
  }).filter(x => x instanceof GestureElementBase);
  const sequence = new Array();
  for (const element of elements) {
    // Ensure nested elements are not attached.
    if (element.htmlFor) {
      element.detach();
      element.removeAttribute("for");
    }
    sequence.push(element.recognizer);
  }
  // Update recognizer with first recognizer (in order of DOM).
  this.recognizer.recognizer = sequence[0];
};
__decorate([property({
  attribute: "max-interval",
  type: Number,
  reflect: false
})], M3eRepeatGestureElement.prototype, "maxInterval", void 0);
__decorate([property({
  type: Number,
  reflect: false
})], M3eRepeatGestureElement.prototype, "count", void 0);
M3eRepeatGestureElement = __decorate([customElement("m3e-repeat-gesture")], M3eRepeatGestureElement);

export { DefaultRepeatGestureOptions, M3eRepeatGestureElement, RepeatGestureRecognizer };
//# sourceMappingURL=RepeatGestureElement.js.map
