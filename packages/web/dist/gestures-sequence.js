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
import { DefaultGestureOptions, GestureRecognizerBase, GestureElementBase } from './PointerTracker.js';
import { isGestureRecognizer } from './GestureRecognizer.js';

/** Defines the default options used to detect and interpret a sequence of gestures. */
const DefaultSequenceGestureOptions = {
  ...DefaultGestureOptions,
  maxInterval: 250
};

var _SequenceGestureRecognizer_instances, _SequenceGestureRecognizer_listener, _SequenceGestureRecognizer_details, _SequenceGestureRecognizer_accepted, _SequenceGestureRecognizer_recognizers, _SequenceGestureRecognizer_timeout, _SequenceGestureRecognizer_handleDisposition, _SequenceGestureRecognizer_handleGesture, _SequenceGestureRecognizer_createDetail;
/** A {@link GestureRecognizer} used to detect and interpret a sequence of gestures from incoming input streams. */
class SequenceGestureRecognizer extends GestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<SequenceGestureOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<SequenceGestureDetail>} listener The function invoked when semantic detail is emitted.
   * @param {readonly GestureRecognizer[]} recognizers The recognizers used to detect a sequence of gesture gestures.
   */
  constructor(options, listener, ...recognizers) {
    super(options, listener);
    _SequenceGestureRecognizer_instances.add(this);
    /** @private */
    _SequenceGestureRecognizer_listener.set(this, detail => __classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_handleGesture).call(this, detail));
    /** @private */
    _SequenceGestureRecognizer_details.set(this, new Array());
    /** @private */
    _SequenceGestureRecognizer_accepted.set(this, new Set());
    /** @private */
    _SequenceGestureRecognizer_recognizers.set(this, new Array());
    /** @private */
    _SequenceGestureRecognizer_timeout.set(this, void 0);
    this.recognizers = recognizers;
  }
  /** The current recognizer in the sequence. */
  get recognizer() {
    return __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f")[__classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length];
  }
  /** The recognizers used to detect a sequence of gestures. */
  get recognizers() {
    return __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f");
  }
  set recognizers(value) {
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f").forEach(x => {
      x.removeListener(__classPrivateFieldGet(this, _SequenceGestureRecognizer_listener, "f"));
      x.onDisposition = undefined;
      x.reset();
    });
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f").length = 0;
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f").push(...value);
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f").forEach(x => {
      x.addListener(__classPrivateFieldGet(this, _SequenceGestureRecognizer_listener, "f"));
      x.onDisposition = __classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_handleDisposition).bind(this, x);
      x.reset();
    });
    this.reset();
  }
  /** @inheritdoc */
  get defaultOptions() {
    return {
      ...DefaultSequenceGestureOptions
    };
  }
  /** @inheritdoc */
  shouldCapturePointer(input) {
    return this.recognizer?.shouldCapturePointer(input) ?? super.shouldCapturePointer(input);
  }
  /** @inheritdoc */
  canReceiveInput(input) {
    return this.recognizer !== undefined && this.recognizer.canReceiveInput(input) && super.canReceiveInput(input);
  }
  /** @inheritdoc */
  _onPointerOver(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerEnter(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerDown(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerMove(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerUp(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerCancel(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerOut(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerLeave(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onWheel(input) {
    this.recognizer?.onInput(input);
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    // Discard if input is not accepted (held)
    if (!__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").delete(inputId)) return;
    // End gesture when all input has been accepted
    if (__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").size === 0 && __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length === this.recognizers.length) {
      this._emit(__classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_createDetail).call(this, "end"));
      this.reset();
    }
  }
  /** @inheritdoc */
  _onReject(inputId) {
    // Cancel and reset if accepted input was rejected
    if (__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").has(inputId)) {
      this._emit(__classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_createDetail).call(this, "cancel"));
      this.reset();
    }
  }
  /** @inheritdoc */
  reset() {
    clearTimeout(__classPrivateFieldGet(this, _SequenceGestureRecognizer_timeout, "f"));
    __classPrivateFieldSet(this, _SequenceGestureRecognizer_timeout, undefined, "f");
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_recognizers, "f").forEach(x => x.reset());
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").forEach(x => this._release(x));
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").clear();
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length = 0;
  }
}
_SequenceGestureRecognizer_listener = new WeakMap(), _SequenceGestureRecognizer_details = new WeakMap(), _SequenceGestureRecognizer_accepted = new WeakMap(), _SequenceGestureRecognizer_recognizers = new WeakMap(), _SequenceGestureRecognizer_timeout = new WeakMap(), _SequenceGestureRecognizer_instances = new WeakSet(), _SequenceGestureRecognizer_handleDisposition = function _SequenceGestureRecognizer_handleDisposition(recognizer, inputId, disposition) {
  switch (disposition) {
    case "accept":
      // Place holds on accepted input and inform the recognizer it can be accepted.
      if (!__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").has(inputId)) {
        __classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").add(inputId);
        this._hold(inputId);
      }
      recognizer.onResolution(inputId, "accept");
      break;
    case "reject":
      // When a recognizer rejects, the sequence gesture is rejected.
      if (!__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").has(inputId)) {
        this._reject(inputId);
      }
      this.reset();
      break;
    case "hold":
      // Forward holds on input.
      if (!__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").has(inputId)) {
        this._hold(inputId);
      }
      break;
    case "release":
      // Forward releases to holds on input.
      if (!__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").has(inputId)) {
        this._release(inputId);
      }
      break;
    case "defer":
      // Forward deferrals on input.
      if (!__classPrivateFieldGet(this, _SequenceGestureRecognizer_accepted, "f").has(inputId)) {
        this._defer(inputId);
      }
      break;
  }
}, _SequenceGestureRecognizer_handleGesture = function _SequenceGestureRecognizer_handleGesture(detail) {
  // Ignore non-terminal detail
  if (detail.phase === "start" || detail.phase === "update") return;
  if (detail.phase === "cancel") {
    if (__classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length > 0) {
      // The gesture has started, cancel it
      this._emit(__classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_createDetail).call(this, "cancel"));
    }
    this.reset();
    return;
  }
  __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").push(detail);
  if (__classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length === this.recognizers.length) {
    // Disposition all inputs as accepted when detail count is satisfied
    __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").forEach(x => this._accept(x.inputId));
  } else {
    this._emit(__classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_createDetail).call(this, __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length === 1 ? "start" : "update"));
    if (this.options.maxInterval > 0) {
      clearTimeout(__classPrivateFieldGet(this, _SequenceGestureRecognizer_timeout, "f"));
      // Cancel and reset (releasing outstanding holds) if max interval exceeded
      __classPrivateFieldSet(this, _SequenceGestureRecognizer_timeout, setTimeout(() => {
        this._emit(__classPrivateFieldGet(this, _SequenceGestureRecognizer_instances, "m", _SequenceGestureRecognizer_createDetail).call(this, "cancel"));
        this.reset();
      }, this.options.maxInterval), "f");
    }
  }
}, _SequenceGestureRecognizer_createDetail = function _SequenceGestureRecognizer_createDetail(phase) {
  const last = __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f")[__classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").length - 1];
  return {
    inputId: __classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f").flatMap(d => Array.isArray(d.inputId) ? d.inputId : [d.inputId]),
    gestureName: "sequence",
    phase,
    timestamp: last.timestamp,
    details: [...__classPrivateFieldGet(this, _SequenceGestureRecognizer_details, "f")]
  };
};

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
var _M3eSequenceGestureElement_instances, _M3eSequenceGestureElement_handleSlotChange;
/**
 * A non-visual element used to detect and interpret a sequence of gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-sequence-gesture
 *
 * @slot - The gestures that make up the sequence.
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr max-interval - Maximum allowed time (ms) between each gesture in the sequence.
 *
 * @fires gesture - Emitted when semantic detail about a sequence of gestures is detected.
 */
let M3eSequenceGestureElement = class M3eSequenceGestureElement extends GestureElementBase {
  constructor() {
    super(...arguments);
    _M3eSequenceGestureElement_instances.add(this);
    /** @inheritdoc */
    this.recognizer = new SequenceGestureRecognizer();
    /**
     * Maximum allowed time (ms) between each gesture in the sequence.
     * @default 250
     */
    this.maxInterval = this.recognizer.defaultOptions.maxInterval;
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    this.recognizer.options = {
      maxInterval: this.maxInterval
    };
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eSequenceGestureElement_instances, "m", _M3eSequenceGestureElement_handleSlotChange)}"></slot>`;
  }
};
_M3eSequenceGestureElement_instances = new WeakSet();
_M3eSequenceGestureElement_handleSlotChange = function _M3eSequenceGestureElement_handleSlotChange(e) {
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
  // Update recognizers (in order of DOM).
  this.recognizer.recognizers = sequence;
};
__decorate([property({
  attribute: "max-interval",
  type: Number,
  reflect: false
})], M3eSequenceGestureElement.prototype, "maxInterval", void 0);
M3eSequenceGestureElement = __decorate([customElement("m3e-sequence-gesture")], M3eSequenceGestureElement);

/** @internal */
function sequence(...args) {
  let listener;
  let options;
  let index = 0;
  if (typeof args[0] === "function") {
    listener = args[0];
    index++;
  }
  if (args[index] !== undefined && typeof args[index] === "object" && !isGestureRecognizer(args[index])) {
    options = args[index];
    index++;
  }
  const recognizers = args.slice(index);
  return new SequenceGestureRecognizer(options, listener, ...recognizers);
}

export { DefaultSequenceGestureOptions, M3eSequenceGestureElement, SequenceGestureRecognizer, sequence };
//# sourceMappingURL=gestures-sequence.js.map
