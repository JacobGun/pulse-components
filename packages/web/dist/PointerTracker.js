/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldSet, __classPrivateFieldGet, __decorate } from 'tslib';
import { LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { HtmlFor } from './TextOverflowElement.js';
import { spaceSeparatedStringConverter } from './spaceSeparatedStringConverter.js';
import 'lit/directives/if-defined.js';

/** Defines the default options used to detect and interpret gestures. */
const DefaultGestureOptions = {
  priority: 1,
  buttons: ["primary"],
  pointerTypes: ["mouse", "pen", "touch"]
};

var _GestureRecognizerBase_instances, _GestureRecognizerBase_options, _GestureRecognizerBase_disabled, _GestureRecognizerBase_listeners, _GestureRecognizerBase_disposition;
const GESTURE_INPUT_BUTTON_NAME_TO_INDEX = new Map([["primary", 0], ["middle", 1], ["secondary", 2], ["back", 3], ["forward", 4]]);
/**
 * A base implementation for a {@link GestureRecognizer} used to detect and interpret gestures from incoming input
 * streams. This class must be inherited.
 * @template TOptions The type of options used to detect and interpret gestures.
 * @template TDetail The type of semantic detail emitted for a gesture.
 */
class GestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<TOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<TDetail>} listener The function invoked when semantic detail is emitted.
   */
  constructor(options, listener) {
    _GestureRecognizerBase_instances.add(this);
    /** @private */
    _GestureRecognizerBase_options.set(this, void 0);
    /** @private */
    _GestureRecognizerBase_disabled.set(this, false);
    /** @private */
    _GestureRecognizerBase_listeners.set(this, new Array());
    __classPrivateFieldSet(this, _GestureRecognizerBase_options, {
      ...this.defaultOptions,
      ...options
    }, "f");
    if (listener) {
      this.addListener(listener);
    }
  }
  /** @inheritdoc */
  get options() {
    return __classPrivateFieldGet(this, _GestureRecognizerBase_options, "f");
  }
  set options(value) {
    __classPrivateFieldSet(this, _GestureRecognizerBase_options, {
      ...__classPrivateFieldGet(this, _GestureRecognizerBase_options, "f"),
      ...value
    }, "f");
  }
  /** Whether gesture recognition is disabled. */
  get disabled() {
    return __classPrivateFieldGet(this, _GestureRecognizerBase_disabled, "f");
  }
  set disabled(value) {
    __classPrivateFieldSet(this, _GestureRecognizerBase_disabled, value, "f");
    if (__classPrivateFieldGet(this, _GestureRecognizerBase_disabled, "f")) {
      this.reset();
    }
  }
  /** The default options used to detect and interpret gestures. */
  get defaultOptions() {
    return {
      ...DefaultGestureOptions
    };
  }
  /** @inheritdoc */
  get eager() {
    return false;
  }
  /** @inheritdoc */
  canReceiveInput(input) {
    if (this.disabled) return false;
    if (!(this.options.inputFilter?.(input) ?? true)) return false;
    // Only test allowed buttons on pointerdown.
    if (input.kind === "pointerdown" && this.options.buttons.length > 0) {
      let allowedButton = false;
      for (const allowedName of this.options.buttons) {
        const allowedIndex = GESTURE_INPUT_BUTTON_NAME_TO_INDEX.get(allowedName);
        if (allowedIndex === undefined) continue;
        const allowedMask = 1 << allowedIndex;
        if ((input.buttons & allowedMask) !== 0) {
          allowedButton = true;
          break;
        }
      }
      if (!allowedButton) {
        return false;
      }
    }
    if (this.options.pointerTypes.length > 0) {
      if ("pointerType" in input && !this.options.pointerTypes.includes(input.pointerType)) {
        return false;
      }
    }
    return true;
  }
  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldCapturePointer(_input) {
    return false;
  }
  /** @inheritdoc */
  onInput(input) {
    if (!this.canReceiveInput(input)) return;
    switch (input.kind) {
      case "pointerover":
        this._onPointerOver(input);
        break;
      case "pointerenter":
        this._onPointerEnter(input);
        break;
      case "pointerdown":
        this._onPointerDown(input);
        break;
      case "pointermove":
        this._onPointerMove(input);
        break;
      case "pointerup":
        this._onPointerUp(input);
        break;
      case "pointercancel":
        this._onPointerCancel(input);
        break;
      case "pointerout":
        this._onPointerOut(input);
        break;
      case "pointerleave":
        this._onPointerLeave(input);
        break;
      case "wheel":
        this._onWheel(input);
        break;
    }
  }
  /** Processes input from a `pointerover` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerOver(_input) {}
  /** Processes input from a `pointerenter` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerEnter(_input) {}
  /** Processes input from a `pointerdown` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerDown(_input) {}
  /** Processes input from a `pointermove` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerMove(_input) {}
  /** Processes input from a `pointerup` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerUp(_input) {}
  /** Processes input from a `pointercancel` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerCancel(_input) {}
  /** Processes input from a `pointerout` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerOut(_input) {}
  /** Processes input from a `pointerleave` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPointerLeave(_input) {}
  /** Processes input from a `wheel` event. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onWheel(_input) {}
  /**
   * Dispositions the specified input stream as accepted.
   * @param {number | readonly number[]} inputId The identifier(s) of the input stream to accepted.
   */
  _accept(inputId) {
    __classPrivateFieldGet(this, _GestureRecognizerBase_instances, "m", _GestureRecognizerBase_disposition).call(this, inputId, "accept");
  }
  /**
   * Dispositions the specified input stream as rejected.
   * @param {number | readonly number[]} inputId The identifier(s) of the input stream to reject.
   */
  _reject(inputId) {
    __classPrivateFieldGet(this, _GestureRecognizerBase_instances, "m", _GestureRecognizerBase_disposition).call(this, inputId, "reject");
  }
  /**
   * Dispositions the specified input stream as held.
   * @param {number} inputId The identifier of the input stream to hold.
   */
  _hold(inputId) {
    __classPrivateFieldGet(this, _GestureRecognizerBase_instances, "m", _GestureRecognizerBase_disposition).call(this, inputId, "hold");
  }
  /**
   * Dispositions the specified input stream as released.
   * @param {number} inputId The identifier of the input stream to release.
   */
  _release(inputId) {
    __classPrivateFieldGet(this, _GestureRecognizerBase_instances, "m", _GestureRecognizerBase_disposition).call(this, inputId, "release");
  }
  /**
   * Dispositions the specified input stream as deferred.
   * @param {number} inputId The identifier of the input stream to defer.
   */
  _defer(inputId) {
    __classPrivateFieldGet(this, _GestureRecognizerBase_instances, "m", _GestureRecognizerBase_disposition).call(this, inputId, "defer");
  }
  /**
   * Emits semantic detail about a recognized gesture.
   * @param {TDetail} detail The detail to emit.
   */
  _emit(detail) {
    __classPrivateFieldGet(this, _GestureRecognizerBase_listeners, "f").forEach(x => x(detail));
  }
  /** @inheritdoc */
  addListener(listener) {
    if (!__classPrivateFieldGet(this, _GestureRecognizerBase_listeners, "f").includes(listener)) {
      __classPrivateFieldGet(this, _GestureRecognizerBase_listeners, "f").push(listener);
    }
  }
  /** @inheritdoc */
  removeListener(listener) {
    const index = __classPrivateFieldGet(this, _GestureRecognizerBase_listeners, "f").indexOf(listener);
    if (index >= 0) {
      __classPrivateFieldGet(this, _GestureRecognizerBase_listeners, "f").splice(index, 1);
    }
  }
  /** @inheritdoc */
  onResolution(inputId, resolution) {
    switch (resolution) {
      case "accept":
        this._onAccept(inputId);
        break;
      case "reject":
        this._onReject(inputId);
        break;
    }
  }
}
_GestureRecognizerBase_options = new WeakMap(), _GestureRecognizerBase_disabled = new WeakMap(), _GestureRecognizerBase_listeners = new WeakMap(), _GestureRecognizerBase_instances = new WeakSet(), _GestureRecognizerBase_disposition = function _GestureRecognizerBase_disposition(inputId, disposition) {
  const ids = Array.isArray(inputId) ? inputId : [inputId];
  for (const id of ids) {
    this.onDisposition?.(id, disposition);
  }
};

var _DelegatingGestureRecognizerBase_listener, _DelegatingGestureRecognizerBase_inner;
/**
 * A base implementation for a {@link GestureRecognizer} which delegates recognition to another recognizer. This class must be inherited.
 * @template TOptions The type of options used to detect and interpret gestures.
 * @template TDetail The type of semantic detail emitted for a gesture.
 * @template TInnerOptions The type of options used to detect and interpret gestures by the inner recognizer.
 * @template TInnerDetail The type of semantic detail emitted by the inner recognizer.
 * @template TInnerRecognizer The type of recognizer to which recognition is delegated.
 */
class DelegatingGestureRecognizerBase extends GestureRecognizerBase {
  /**
   * Initializes a new instance of this class.
   * @param {Partial<TOptions>} options The options used to detect and interpret gestures.
   * @param {GestureListener<TDetail>} listener The function invoked when semantic detail is emitted.
   * @param {TInnerRecognizer} inner The recognizer used to detect the gesture to repeat.
   */
  constructor(options, listener, inner) {
    super(options, listener);
    /** @private */
    _DelegatingGestureRecognizerBase_listener.set(this, detail => this._handleGesture(detail));
    /** @private*/
    _DelegatingGestureRecognizerBase_inner.set(this, void 0);
    if (inner) {
      this._inner = inner;
    }
  }
  /** The recognizer to which recognition is delegated. */
  get _inner() {
    return __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f");
  }
  set _inner(value) {
    if (__classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f")) {
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").removeListener(__classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_listener, "f"));
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").onDisposition = undefined;
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").reset();
    }
    __classPrivateFieldSet(this, _DelegatingGestureRecognizerBase_inner, value, "f");
    if (__classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f")) {
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").reset();
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").disabled = this.disabled;
      this._applyOptions(this.options, __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f"));
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").onDisposition = this._handleDisposition.bind(this);
      __classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_inner, "f").addListener(__classPrivateFieldGet(this, _DelegatingGestureRecognizerBase_listener, "f"));
    }
  }
  /** @inheritdoc */
  get disabled() {
    return super.disabled;
  }
  set disabled(value) {
    super.disabled = value;
    if (this._inner) {
      this._inner.disabled = value;
    }
  }
  /** @inheritdoc */
  get options() {
    return super.options;
  }
  set options(value) {
    super.options = value;
    if (this._inner) {
      this._applyOptions(this.options, this._inner);
    }
  }
  /** @inheritdoc */
  get eager() {
    return this._inner?.eager ?? false;
  }
  /** @inheritdoc */
  shouldCapturePointer(input) {
    return this._inner?.shouldCapturePointer(input) ?? false;
  }
  /** @inheritdoc */
  canReceiveInput(input) {
    return this._inner?.canReceiveInput(input) ?? false;
  }
  /** @inheritdoc */
  _onPointerOver(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerEnter(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerDown(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerMove(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerUp(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerCancel(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerOut(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onPointerLeave(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onWheel(input) {
    this._inner?.onInput(input);
  }
  /** @inheritdoc */
  _onAccept(inputId) {
    this._inner?.onResolution(inputId, "accept");
  }
  /** @inheritdoc */
  _onReject(inputId) {
    this._inner?.onResolution(inputId, "reject");
  }
  /** @inheritdoc */
  reset() {
    this._inner?.reset();
  }
  /**
   * Applies options to the inner recognizer.
   * @param {TOptions} options The options to apply.
   * @param {TInnerRecognizer} inner The recognizer to which recognition is delegated.
   */
  _applyOptions(options, inner) {
    inner.options = {
      priority: options.priority,
      buttons: options.buttons,
      pointerTypes: options.pointerTypes,
      inputFilter: options.inputFilter
    };
  }
  /**
   * Handles dispositions from the inner recognizer.
   * @param {number} inputId The identifier of the input stream to disposition.
   * @param {GestureDisposition} disposition The disposition of the input stream.
   */
  _handleDisposition(inputId, disposition) {
    switch (disposition) {
      case "accept":
        this._accept(inputId);
        break;
      case "defer":
        this._defer(inputId);
        break;
      case "hold":
        this._hold(inputId);
        break;
      case "reject":
        this._reject(inputId);
        break;
      case "release":
        this._release(inputId);
        break;
    }
  }
}
_DelegatingGestureRecognizerBase_listener = new WeakMap(), _DelegatingGestureRecognizerBase_inner = new WeakMap();

var _GestureResolver_instances, _GestureResolver_recognizers, _GestureResolver_streams, _GestureResolver_onDisposition, _GestureResolver_onAccept, _GestureResolver_onReject, _GestureResolver_onHold, _GestureResolver_onRelease, _GestureResolver_onDefer, _GestureResolver_resolve, _GestureResolver_exclude, _GestureResolver_include;
/**
 * Resolves competing claims on input and issues resolutions to recognizers.
 * @internal
 */
class GestureResolver {
  constructor() {
    _GestureResolver_instances.add(this);
    /** @private */
    _GestureResolver_recognizers.set(this, new Array());
    /** @private */
    _GestureResolver_streams.set(this, new Map());
  }
  /** The recognizers registered to the resolver. */
  get recognizers() {
    return __classPrivateFieldGet(this, _GestureResolver_recognizers, "f");
  }
  /**
   * Registers a recognizer with the resolver.
   * @param {GestureRecognizer}  recognizer The recognizer to register with the resolver.
   */
  addRecognizer(recognizer) {
    if (!__classPrivateFieldGet(this, _GestureResolver_recognizers, "f").includes(recognizer)) {
      recognizer.reset();
      __classPrivateFieldGet(this, _GestureResolver_recognizers, "f").push(recognizer);
      recognizer.onDisposition = __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_onDisposition).bind(this, recognizer);
    }
  }
  /**
   * Unregisters a recognizer from the resolver.
   * @param {GestureRecognizer} recognizer The recognizer to unregister from the resolver.
   */
  removeRecognizer(recognizer) {
    const index = __classPrivateFieldGet(this, _GestureResolver_recognizers, "f").indexOf(recognizer);
    if (index >= 0) {
      recognizer.reset();
      __classPrivateFieldGet(this, _GestureResolver_recognizers, "f").splice(index, 1);
      recognizer.onDisposition = undefined;
    }
  }
  /**
   * Resolves outstanding dispositions for the given input stream.
   * @param {number} inputId The identifier of the input stream to resolve.
   */
  resolve(inputId) {
    __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_resolve).call(this, inputId, true);
  }
  /** Clears any dispositions on input . */
  clear() {
    __classPrivateFieldGet(this, _GestureResolver_streams, "f").clear();
  }
  /** Removes all recognizers and clears any dispositions on input. */
  destroy() {
    __classPrivateFieldGet(this, _GestureResolver_recognizers, "f").forEach(x => this.removeRecognizer(x));
    __classPrivateFieldGet(this, _GestureResolver_streams, "f").clear();
  }
}
_GestureResolver_recognizers = new WeakMap(), _GestureResolver_streams = new WeakMap(), _GestureResolver_instances = new WeakSet(), _GestureResolver_onDisposition = function _GestureResolver_onDisposition(recognizer, inputId, disposition) {
  switch (disposition) {
    case "accept":
      __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_onAccept).call(this, recognizer, inputId);
      break;
    case "reject":
      __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_onReject).call(this, recognizer, inputId);
      break;
    case "hold":
      __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_onHold).call(this, recognizer, inputId);
      break;
    case "release":
      __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_onRelease).call(this, recognizer, inputId);
      break;
    case "defer":
      __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_onDefer).call(this, recognizer, inputId);
      break;
  }
}, _GestureResolver_onAccept = function _GestureResolver_onAccept(recognizer, inputId) {
  const stream = __classPrivateFieldGet(this, _GestureResolver_streams, "f").get(inputId) ?? {
    acceptors: [],
    holders: [],
    deferrers: []
  };
  __classPrivateFieldGet(this, _GestureResolver_streams, "f").set(inputId, stream);
  if (stream.acceptors.includes(recognizer)) return;
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.deferrers);
  // If recognizer was a holder, move them to the front of the acceptor queue; otherwise append.
  if (__classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.holders)) {
    stream.acceptors.unshift(recognizer);
  } else {
    stream.acceptors.push(recognizer);
  }
  // If eager or stale, immediately attempt to resolve; wait a tick to support pending timers.
  // A stream becomes stale when resolve is explicitly called and input could not resolve.
  if (recognizer.eager || stream.stale) {
    clearTimeout(stream.timeout);
    stream.timeout = setTimeout(() => __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_resolve).call(this, inputId));
  }
}, _GestureResolver_onReject = function _GestureResolver_onReject(recognizer, inputId) {
  let held = false;
  const stream = __classPrivateFieldGet(this, _GestureResolver_streams, "f").get(inputId);
  if (stream) {
    __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.acceptors);
    __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.deferrers);
    held = __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.holders);
  }
  // Notify recognizer input was rejected, regardless of stream existence.
  recognizer.onResolution(inputId, "reject");
  if (!stream) return;
  // Resolve input if the rejecting recognizer had a hold, no further holds exist, and one or more acceptors exist;
  // otherwise, remove the stream if there are no further acceptors, holders or deferrers.
  if (held && stream.acceptors.length > 0 && stream.holders.length === 0) {
    __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_resolve).call(this, inputId);
  } else if (stream.acceptors.length === 0 && stream.holders.length === 0 && stream.deferrers.length === 0) {
    clearTimeout(stream.timeout);
    __classPrivateFieldGet(this, _GestureResolver_streams, "f").delete(inputId);
  }
}, _GestureResolver_onHold = function _GestureResolver_onHold(recognizer, inputId) {
  const stream = __classPrivateFieldGet(this, _GestureResolver_streams, "f").get(inputId) ?? {
    acceptors: [],
    holders: [],
    deferrers: []
  };
  __classPrivateFieldGet(this, _GestureResolver_streams, "f").set(inputId, stream);
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_include).call(this, recognizer, stream.holders);
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.deferrers);
}, _GestureResolver_onRelease = function _GestureResolver_onRelease(recognizer, inputId) {
  const stream = __classPrivateFieldGet(this, _GestureResolver_streams, "f").get(inputId);
  if (!stream) return;
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.deferrers);
  // Resolve input if the releasing recognizer had a hold, no further holds exist, and one or more acceptors exist;
  // otherwise, remove the stream if there are no further acceptors, holders or deferrers.
  if (__classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.holders) && stream.acceptors.length > 0 && stream.holders.length === 0) {
    __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_resolve).call(this, inputId);
  } else if (stream.acceptors.length === 0 && stream.holders.length === 0 && stream.deferrers.length === 0) {
    clearTimeout(stream.timeout);
    __classPrivateFieldGet(this, _GestureResolver_streams, "f").delete(inputId);
  }
}, _GestureResolver_onDefer = function _GestureResolver_onDefer(recognizer, inputId) {
  const stream = __classPrivateFieldGet(this, _GestureResolver_streams, "f").get(inputId) ?? {
    acceptors: [],
    holders: [],
    deferrers: []
  };
  __classPrivateFieldGet(this, _GestureResolver_streams, "f").set(inputId, stream);
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_include).call(this, recognizer, stream.deferrers);
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.acceptors);
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, recognizer, stream.holders);
}, _GestureResolver_resolve = function _GestureResolver_resolve(inputId, explicit = false) {
  const stream = __classPrivateFieldGet(this, _GestureResolver_streams, "f").get(inputId);
  if (!stream) return;
  // Input cannot be resolved when there are holds.
  if (stream.holders.length > 0) {
    // Mark the stream as stale when resolution is explicit and the stream cannot be resolved.
    if (explicit) {
      stream.stale = true;
    }
    return;
  }
  // Find the first eager recognizer with highest priority.
  let resolved = null;
  for (const recognizer of stream.acceptors) {
    if (!recognizer.eager) continue;
    if (!resolved || recognizer.options.priority > resolved.options.priority) {
      resolved = recognizer;
    }
  }
  // If there are no eager recognizers, fallback the recognizer with highest priority.
  if (!resolved) {
    for (const recognizer of stream.acceptors) {
      if (!resolved || recognizer.options.priority > resolved.options.priority) {
        resolved = recognizer;
      }
    }
  }
  if (!resolved) {
    // Mark the stream as stale when resolution is explicit and the stream cannot be resolved.
    if (explicit) {
      stream.stale = true;
    }
    return;
  }
  // Notify the recognizer that input can be accepted.
  resolved.onResolution(inputId, "accept");
  __classPrivateFieldGet(this, _GestureResolver_instances, "m", _GestureResolver_exclude).call(this, resolved, stream.acceptors);
  // Notify remaining acceptors and any deferrers that input should be rejected.
  stream.acceptors.forEach(x => x.onResolution(inputId, "reject"));
  stream.deferrers.forEach(x => x.onResolution(inputId, "reject"));
  clearTimeout(stream.timeout);
  __classPrivateFieldGet(this, _GestureResolver_streams, "f").delete(inputId);
}, _GestureResolver_exclude = function _GestureResolver_exclude(recognizer, disposition) {
  const index = disposition.indexOf(recognizer);
  if (index < 0) return false;
  disposition.splice(index, 1);
  return true;
}, _GestureResolver_include = function _GestureResolver_include(recognizer, disposition) {
  if (!disposition.includes(recognizer)) {
    disposition.push(recognizer);
  }
};

var _GestureBinding_instances, _GestureBinding_resolver, _GestureBinding_releasedCaptures, _GestureBinding_pointerEventHandler, _GestureBinding_wheelEventHandler, _GestureBinding_preventDefaultHandler, _GestureBinding_resizeObserver, _GestureBinding_cachedElementBounds, _GestureBinding_handlePointerEvent, _GestureBinding_handleWheelEvent, _GestureBinding_dispatchInput, _GestureBinding_createPointerInput, _GestureBinding_createWheelInput;
/**
 * Binds an element to gesture recognizers.
 * @internal
 */
class GestureBinding {
  /**
   * Initializes new instance of this class.
   * @param {HTMLElement} element The element to bind for gesture input.
   */
  constructor(element) {
    _GestureBinding_instances.add(this);
    this.element = element;
    /** @private */
    _GestureBinding_resolver.set(this, new GestureResolver());
    /** @private */
    _GestureBinding_releasedCaptures.set(this, new Set());
    /** @private */
    _GestureBinding_pointerEventHandler.set(this, e => __classPrivateFieldGet(this, _GestureBinding_instances, "m", _GestureBinding_handlePointerEvent).call(this, e));
    /** @private */
    _GestureBinding_wheelEventHandler.set(this, e => __classPrivateFieldGet(this, _GestureBinding_instances, "m", _GestureBinding_handleWheelEvent).call(this, e));
    /** @private */
    _GestureBinding_preventDefaultHandler.set(this, e => e.preventDefault());
    /** @private */
    _GestureBinding_resizeObserver.set(this, void 0);
    /** @private */
    _GestureBinding_cachedElementBounds.set(this, void 0);
    element.addEventListener("pointerover", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointerenter", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointerdown", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointermove", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointerup", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointercancel", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointerleave", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("pointerout", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("lostpointercapture", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    element.addEventListener("wheel", __classPrivateFieldGet(this, _GestureBinding_wheelEventHandler, "f"), {
      passive: true
    });
    element.addEventListener("gesturestart", __classPrivateFieldGet(this, _GestureBinding_preventDefaultHandler, "f"));
    element.addEventListener("gesturechange", __classPrivateFieldGet(this, _GestureBinding_preventDefaultHandler, "f"));
    element.addEventListener("gestureend", __classPrivateFieldGet(this, _GestureBinding_preventDefaultHandler, "f"));
    if (window !== undefined && window.ResizeObserver) {
      __classPrivateFieldSet(this, _GestureBinding_resizeObserver, new ResizeObserver(() => __classPrivateFieldSet(this, _GestureBinding_cachedElementBounds, undefined, "f")), "f");
      __classPrivateFieldGet(this, _GestureBinding_resizeObserver, "f").observe(element);
    }
  }
  /** Whether there are no recognizers registered with this binding. */
  get empty() {
    return __classPrivateFieldGet(this, _GestureBinding_resolver, "f").recognizers.length == 0;
  }
  /**
   * Registers one or more recognizers with this binding.
   * @param {readonly GestureRecognizer[]} recognizers The recognizers to add.
   */
  addRecognizer(...recognizers) {
    recognizers.forEach(x => __classPrivateFieldGet(this, _GestureBinding_resolver, "f").addRecognizer(x));
  }
  /**
   * Unregisters one or more recognizers from this binding.
   * @param {readonly GestureRecognizer[]} recognizers The recognizers to remove.
   */
  removeRecognizer(...recognizers) {
    recognizers.forEach(x => __classPrivateFieldGet(this, _GestureBinding_resolver, "f").removeRecognizer(x));
  }
  /** Resets the binding to its initial state. */
  reset() {
    for (const id of __classPrivateFieldGet(this, _GestureBinding_releasedCaptures, "f")) {
      if (this.element.hasPointerCapture(id)) {
        this.element.releasePointerCapture(id);
      }
    }
    __classPrivateFieldSet(this, _GestureBinding_cachedElementBounds, undefined, "f");
    __classPrivateFieldGet(this, _GestureBinding_releasedCaptures, "f").clear();
    __classPrivateFieldGet(this, _GestureBinding_resolver, "f").clear();
  }
  /** Removes all recognizers and detaches all event listeners. */
  destroy() {
    __classPrivateFieldGet(this, _GestureBinding_resizeObserver, "f")?.disconnect();
    __classPrivateFieldSet(this, _GestureBinding_cachedElementBounds, undefined, "f");
    __classPrivateFieldGet(this, _GestureBinding_releasedCaptures, "f").clear();
    __classPrivateFieldGet(this, _GestureBinding_resolver, "f").destroy();
    this.element.removeEventListener("pointerover", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointerenter", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointerdown", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointermove", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointerup", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointercancel", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointerleave", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("pointerout", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("lostpointercapture", __classPrivateFieldGet(this, _GestureBinding_pointerEventHandler, "f"));
    this.element.removeEventListener("wheel", __classPrivateFieldGet(this, _GestureBinding_wheelEventHandler, "f"));
    this.element.removeEventListener("gesturestart", __classPrivateFieldGet(this, _GestureBinding_preventDefaultHandler, "f"));
    this.element.removeEventListener("gesturechange", __classPrivateFieldGet(this, _GestureBinding_preventDefaultHandler, "f"));
    this.element.removeEventListener("gestureend", __classPrivateFieldGet(this, _GestureBinding_preventDefaultHandler, "f"));
  }
}
_GestureBinding_resolver = new WeakMap(), _GestureBinding_releasedCaptures = new WeakMap(), _GestureBinding_pointerEventHandler = new WeakMap(), _GestureBinding_wheelEventHandler = new WeakMap(), _GestureBinding_preventDefaultHandler = new WeakMap(), _GestureBinding_resizeObserver = new WeakMap(), _GestureBinding_cachedElementBounds = new WeakMap(), _GestureBinding_instances = new WeakSet(), _GestureBinding_handlePointerEvent = function _GestureBinding_handlePointerEvent(e) {
  let input = __classPrivateFieldGet(this, _GestureBinding_instances, "m", _GestureBinding_createPointerInput).call(this, e);
  if (e.type === "lostpointercapture") {
    // Ignore intentionally released pointer captures.
    if (__classPrivateFieldGet(this, _GestureBinding_releasedCaptures, "f").has(input.inputId)) {
      __classPrivateFieldGet(this, _GestureBinding_releasedCaptures, "f").delete(input.inputId);
      return;
    }
    // Convert lostpointercapture to a pointercancel to inform recognizers they should cancel gestures.
    input = {
      ...input,
      kind: "pointercancel"
    };
  }
  __classPrivateFieldGet(this, _GestureBinding_instances, "m", _GestureBinding_dispatchInput).call(this, input);
  switch (e.type) {
    case "pointerdown":
    case "pointermove":
      // Capture pointer if any recognizer requires capture.
      if (__classPrivateFieldGet(this, _GestureBinding_resolver, "f").recognizers.some(x => x.shouldCapturePointer(input)) && !input.currentTarget.hasPointerCapture(input.inputId)) {
        input.currentTarget.setPointerCapture(input.inputId);
      }
      break;
    case "pointerup":
    case "pointercancel":
      // Resolve dispositions on input for terminal events.
      __classPrivateFieldGet(this, _GestureBinding_resolver, "f").resolve(input.inputId);
      // Release pointer capture.
      if (input.currentTarget.hasPointerCapture(input.inputId)) {
        input.currentTarget.releasePointerCapture(input.inputId);
        __classPrivateFieldGet(this, _GestureBinding_releasedCaptures, "f").add(input.inputId);
      }
      break;
  }
}, _GestureBinding_handleWheelEvent = function _GestureBinding_handleWheelEvent(e) {
  __classPrivateFieldGet(this, _GestureBinding_instances, "m", _GestureBinding_dispatchInput).call(this, __classPrivateFieldGet(this, _GestureBinding_instances, "m", _GestureBinding_createWheelInput).call(this, e));
}, _GestureBinding_dispatchInput = function _GestureBinding_dispatchInput(input) {
  for (const recognizer of __classPrivateFieldGet(this, _GestureBinding_resolver, "f").recognizers) {
    if (recognizer.canReceiveInput(input)) {
      recognizer.onInput(input);
    }
  }
}, _GestureBinding_createPointerInput = function _GestureBinding_createPointerInput(e) {
  const bounds = __classPrivateFieldGet(this, _GestureBinding_cachedElementBounds, "f") ?? __classPrivateFieldSet(this, _GestureBinding_cachedElementBounds, this.element.getBoundingClientRect(), "f");
  return {
    inputId: e.pointerId,
    kind: e.type,
    currentTarget: e.currentTarget,
    target: e.target,
    ctrlKey: e.ctrlKey,
    altKey: e.altKey,
    shiftKey: e.shiftKey,
    metaKey: e.metaKey,
    button: e.button,
    buttons: e.buttons,
    pointerType: e.pointerType,
    clientX: e.clientX,
    clientY: e.clientY,
    localX: e.clientX - bounds.left,
    localY: e.clientY - bounds.top,
    timestamp: e.timeStamp
  };
}, _GestureBinding_createWheelInput = function _GestureBinding_createWheelInput(e) {
  return {
    inputId: -1,
    kind: e.type,
    currentTarget: e.currentTarget,
    target: e.target,
    ctrlKey: e.ctrlKey,
    altKey: e.altKey,
    shiftKey: e.shiftKey,
    metaKey: e.metaKey,
    button: e.button,
    buttons: e.buttons,
    deltaX: e.deltaX,
    deltaY: e.deltaY,
    deltaZ: e.deltaZ,
    deltaMode: e.deltaMode,
    timestamp: e.timeStamp
  };
};

var _a, _GestureBinder_bindings;
/**
 * Binds elements to recognizers responsible for detecting gestures.
 * @internal
 */
class GestureBinder {
  /**
   * Binds one or more gesture recognizers to an element.
   * @param {HTMLElement} element The element to which to bind a recognizer.
   * @param {readonly GestureRecognizer[]} recognizers The recognizers to bind to the specified element.
   */
  static bind(element, ...recognizers) {
    if (!recognizers) return;
    let binding = __classPrivateFieldGet(this, _a, "f", _GestureBinder_bindings).get(element);
    if (!binding) {
      binding = new GestureBinding(element);
      __classPrivateFieldGet(this, _a, "f", _GestureBinder_bindings).set(element, binding);
    }
    binding.addRecognizer(...recognizers);
  }
  /**
   * Removes one or more gesture recognizers from an element.
   * @param {HTMLElement} element The element from which to remove a recognizer.
   * @param {readonly GestureRecognizer[]} recognizers The recognizers to remove from the specified element.
   */
  static unbind(element, ...recognizers) {
    const binding = __classPrivateFieldGet(this, _a, "f", _GestureBinder_bindings).get(element);
    if (!binding) return;
    binding.removeRecognizer(...recognizers);
    if (binding.empty) {
      binding.destroy();
      __classPrivateFieldGet(this, _a, "f", _GestureBinder_bindings).delete(element);
    }
  }
}
_a = GestureBinder;
/** @private */
_GestureBinder_bindings = {
  value: new WeakMap()
};

var _GestureElementBase_gestureListener;
/**
 * A base implementation for a non-visual element used to detect and interpret gestures from an
 * input stream produced from an attached element. This class must be inherited.
 * @template TOptions The type of options used to detect and interpret gestures.
 * @template TDetail The type of semantic detail emitted for a gesture.
 */
class GestureElementBase extends HtmlFor(LitElement) {
  constructor() {
    super(...arguments);
    /** @private */
    _GestureElementBase_gestureListener.set(this, detail => this.dispatchEvent(new CustomEvent("gesture", {
      detail
    })));
    /**
     * Whether gesture recognition is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * The priority in which to recognize gestures.
     * @default 1
     */
    this.priority = DefaultGestureOptions.priority;
    /**
     * Which buttons can be pressed.
     * @default ["primary"]
     */
    this.buttons = DefaultGestureOptions.buttons;
    /**
     * Which types of pointers can be used to recognize gestures.
     * @default ["mouse", "pen", "touch"]
     */
    this.pointerTypes = DefaultGestureOptions.pointerTypes;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.recognizer.addListener(__classPrivateFieldGet(this, _GestureElementBase_gestureListener, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.recognizer.removeListener(__classPrivateFieldGet(this, _GestureElementBase_gestureListener, "f"));
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    GestureBinder.bind(control, this.recognizer);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      GestureBinder.unbind(this.control, this.recognizer);
    }
    super.detach();
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("disabled")) {
      this.recognizer.disabled = this.disabled;
    }
    this.recognizer.options = {
      priority: this.priority,
      buttons: this.buttons,
      pointerTypes: this.pointerTypes,
      inputFilter: this.inputFilter
    };
  }
}
_GestureElementBase_gestureListener = new WeakMap();
/** The styles of the element. */
GestureElementBase.styles = css`:host { display: none; }`;
__decorate([property({
  type: Boolean,
  reflect: false
})], GestureElementBase.prototype, "disabled", void 0);
__decorate([property({
  type: Number,
  reflect: false
})], GestureElementBase.prototype, "priority", void 0);
__decorate([property({
  converter: spaceSeparatedStringConverter,
  reflect: false
})], GestureElementBase.prototype, "buttons", void 0);
__decorate([property({
  attribute: "pointer-types",
  converter: spaceSeparatedStringConverter,
  reflect: false
})], GestureElementBase.prototype, "pointerTypes", void 0);
__decorate([property({
  attribute: false,
  reflect: false
})], GestureElementBase.prototype, "inputFilter", void 0);

var _PointerTracker_instances, _PointerTracker_maxSamples, _PointerTracker_samples, _PointerTracker_detail, _PointerTracker_computePointerStreamDetail;
/**
 * Tracks pointer input samples and produces semantic motion metrics for gesture recognition.
 * @template PointerInput The type of pointer input sample.
 */
class PointerTracker {
  /**
   * Initializes a new instance of this class.
   * @param {PointerInput} initial The initial pointer input sample.
   * @param {number} [maxSamples=20] The maximum number of samples to retain.
   */
  constructor(initial, maxSamples = 1000000) {
    _PointerTracker_instances.add(this);
    /** @private */
    _PointerTracker_maxSamples.set(this, void 0);
    /** @private */
    _PointerTracker_samples.set(this, new Array());
    /** @private */
    _PointerTracker_detail.set(this, void 0);
    __classPrivateFieldSet(this, _PointerTracker_maxSamples, Math.max(4, maxSamples), "f");
    __classPrivateFieldGet(this, _PointerTracker_samples, "f").push(initial);
    __classPrivateFieldSet(this, _PointerTracker_detail, __classPrivateFieldGet(this, _PointerTracker_instances, "m", _PointerTracker_computePointerStreamDetail).call(this), "f");
  }
  /** The most recent input sample. */
  get current() {
    return __classPrivateFieldGet(this, _PointerTracker_samples, "f")[__classPrivateFieldGet(this, _PointerTracker_samples, "f").length - 1];
  }
  /** Semantic motion metrics derived from tracked samples. */
  get detail() {
    return __classPrivateFieldGet(this, _PointerTracker_detail, "f");
  }
  /**
   * Appends a new pointer input sample to the tracker.
   * @param {PointerInput} sample The pointer input sample to append.
   */
  append(sample) {
    if (__classPrivateFieldGet(this, _PointerTracker_maxSamples, "f") && __classPrivateFieldGet(this, _PointerTracker_samples, "f").length >= __classPrivateFieldGet(this, _PointerTracker_maxSamples, "f")) {
      // Preserve first (for duration), last motion, and previous motion samples.
      const samples = __classPrivateFieldGet(this, _PointerTracker_samples, "f");
      let motionLast;
      let motionPrev;
      for (let i = samples.length - 1; i >= 0; i--) {
        if (samples[i].kind === "pointermove") {
          if (!motionLast) {
            motionLast = samples[i];
          } else if (!motionPrev) {
            motionPrev = samples[i];
            break;
          }
        }
      }
      const mustKeep = new Set([samples[0], motionLast ?? samples[0], motionPrev ?? samples[0]]);
      // Trim oldest samples except protected ones.
      while (samples.length >= __classPrivateFieldGet(this, _PointerTracker_maxSamples, "f")) {
        const candidate = samples[0];
        if (mustKeep.has(candidate)) {
          // Rotate protected sample to the end.
          samples.push(samples.shift());
        } else {
          samples.shift();
        }
      }
    }
    __classPrivateFieldGet(this, _PointerTracker_samples, "f").push(sample);
    __classPrivateFieldSet(this, _PointerTracker_detail, __classPrivateFieldGet(this, _PointerTracker_instances, "m", _PointerTracker_computePointerStreamDetail).call(this), "f");
  }
  /**
   * Computes the average position of all pointers and produces motion metrics as if the
   * group of pointers were a single virtual pointer.
   * @param trackers The pointer trackers contributing to the centroid.
   * @returns A {@link PointerGestureDetail} describing centroid motion.
   */
  static centroid(...trackers) {
    const avg = arr => arr.reduce((s, v) => s + v, 0) / arr.length;
    const samples = trackers.map(t => __classPrivateFieldGet(t, _PointerTracker_samples, "f"));
    const initials = samples.map(arr => arr[0]);
    const lasts = samples.map(arr => arr[arr.length - 1]);
    const motionPairs = samples.map(arr => {
      let lastMove;
      let prevMove;
      for (let i = arr.length - 1; i >= 0; i--) {
        const sample = arr[i];
        if (sample.kind === "pointermove") {
          if (!lastMove) {
            lastMove = sample;
          } else {
            prevMove = sample;
            break;
          }
        }
      }
      const first = arr[0];
      if (!lastMove) lastMove = first;
      if (!prevMove) prevMove = first;
      return {
        lastMove,
        prevMove
      };
    });
    const motionLasts = motionPairs.map(p => p.lastMove);
    const motionPrevs = motionPairs.map(p => p.prevMove);
    const startClientX = avg(initials.map(s => s.clientX));
    const startClientY = avg(initials.map(s => s.clientY));
    const startLocalX = avg(initials.map(s => s.localX));
    const startLocalY = avg(initials.map(s => s.localY));
    const clientX = avg(lasts.map(s => s.clientX));
    const clientY = avg(lasts.map(s => s.clientY));
    const localX = avg(lasts.map(s => s.localX));
    const localY = avg(lasts.map(s => s.localY));
    const motionClientX = avg(motionLasts.map(s => s.clientX));
    const motionClientY = avg(motionLasts.map(s => s.clientY));
    const prevClientX = avg(motionPrevs.map(s => s.clientX));
    const prevClientY = avg(motionPrevs.map(s => s.clientY));
    const deltaX = motionClientX - prevClientX;
    const deltaY = motionClientY - prevClientY;
    const totalDeltaX = motionClientX - startClientX;
    const totalDeltaY = motionClientY - startClientY;
    const lastTimestamp = Math.max(...lasts.map(s => s.timestamp));
    const motionLastTs = Math.max(...motionLasts.map(s => s.timestamp));
    const motionPrevTs = Math.max(...motionPrevs.map(s => s.timestamp));
    const firstTimestamp = Math.min(...initials.map(s => s.timestamp));
    const deltaTime = motionLastTs - motionPrevTs;
    const duration = lastTimestamp - firstTimestamp;
    const velocityX = deltaTime > 0 ? deltaX / deltaTime : 0;
    const velocityY = deltaTime > 0 ? deltaY / deltaTime : 0;
    return {
      startClientX,
      startClientY,
      startLocalX,
      startLocalY,
      clientX,
      clientY,
      localX,
      localY,
      deltaX,
      deltaY,
      displacement: Math.hypot(deltaX, deltaY),
      totalDeltaX,
      totalDeltaY,
      totalDisplacement: Math.hypot(totalDeltaX, totalDeltaY),
      axis: Math.abs(totalDeltaX) >= Math.abs(totalDeltaY) ? "x" : "y",
      velocityX,
      velocityY,
      directionX: Math.sign(totalDeltaX),
      directionY: Math.sign(totalDeltaY),
      speed: Math.hypot(velocityX, velocityY),
      angle: totalDeltaX === 0 && totalDeltaY === 0 ? 0 : Math.atan2(totalDeltaY, totalDeltaX),
      duration,
      deltaTime
    };
  }
}
_PointerTracker_maxSamples = new WeakMap(), _PointerTracker_samples = new WeakMap(), _PointerTracker_detail = new WeakMap(), _PointerTracker_instances = new WeakSet(), _PointerTracker_computePointerStreamDetail = function _PointerTracker_computePointerStreamDetail() {
  const first = __classPrivateFieldGet(this, _PointerTracker_samples, "f")[0];
  const last = __classPrivateFieldGet(this, _PointerTracker_samples, "f")[__classPrivateFieldGet(this, _PointerTracker_samples, "f").length - 1];
  let motionLast;
  let motionPrev;
  for (let i = __classPrivateFieldGet(this, _PointerTracker_samples, "f").length - 1; i >= 0; i--) {
    const sample = __classPrivateFieldGet(this, _PointerTracker_samples, "f")[i];
    if (sample.kind === "pointermove") {
      if (!motionLast) {
        motionLast = sample;
      } else {
        motionPrev = sample;
        break;
      }
    }
  }
  if (!motionLast) motionLast = first;
  if (!motionPrev) motionPrev = first;
  const deltaX = motionLast.clientX - motionPrev.clientX;
  const deltaY = motionLast.clientY - motionPrev.clientY;
  const totalDeltaX = motionLast.clientX - first.clientX;
  const totalDeltaY = motionLast.clientY - first.clientY;
  const deltaTime = motionLast.timestamp - motionPrev.timestamp;
  const duration = last.timestamp - first.timestamp;
  const velocityX = deltaTime > 0 ? deltaX / deltaTime : 0;
  const velocityY = deltaTime > 0 ? deltaY / deltaTime : 0;
  return {
    startClientX: first.clientX,
    startClientY: first.clientY,
    startLocalX: first.localX,
    startLocalY: first.localY,
    clientX: last.clientX,
    clientY: last.clientY,
    localX: last.localX,
    localY: last.localY,
    deltaX,
    deltaY,
    displacement: Math.hypot(deltaX, deltaY),
    totalDeltaX,
    totalDeltaY,
    totalDisplacement: Math.hypot(totalDeltaX, totalDeltaY),
    axis: Math.abs(totalDeltaX) >= Math.abs(totalDeltaY) ? "x" : "y",
    velocityX,
    velocityY,
    directionX: Math.sign(totalDeltaX),
    directionY: Math.sign(totalDeltaY),
    speed: Math.hypot(velocityX, velocityY),
    angle: totalDeltaX === 0 && totalDeltaY === 0 ? 0 : Math.atan2(totalDeltaY, totalDeltaX),
    duration,
    deltaTime
  };
};

export { DefaultGestureOptions, DelegatingGestureRecognizerBase, GestureBinder, GestureElementBase, GestureRecognizerBase, PointerTracker };
//# sourceMappingURL=PointerTracker.js.map
