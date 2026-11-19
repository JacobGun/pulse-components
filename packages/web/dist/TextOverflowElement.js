/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { isServer, nothing, noChange, unsafeCSS, css, LitElement, html } from 'lit';
import { directive, Directive, PartType } from 'lit/directive.js';
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { property, query } from 'lit/decorators.js';
import 'lit/directives/if-defined.js';

var _AnimationLoopController_frameId, _AnimationLoopController_lastTime, _AnimationLoopController_running, _AnimationLoopController_callback, _AnimationLoopController_loop;
/** A `ReactiveController` used to execute a function in an animation loop. */
class AnimationLoopController {
  constructor(host, callback) {
    /** @private */_AnimationLoopController_frameId.set(this, null);
    /** @private */
    _AnimationLoopController_lastTime.set(this, 0);
    /** @private */
    _AnimationLoopController_running.set(this, false);
    /** @private */
    _AnimationLoopController_callback.set(this, void 0);
    /** @private */
    _AnimationLoopController_loop.set(this, () => {
      if (!__classPrivateFieldGet(this, _AnimationLoopController_running, "f")) return;
      const now = performance.now();
      __classPrivateFieldGet(this, _AnimationLoopController_callback, "f").call(this, (now - __classPrivateFieldGet(this, _AnimationLoopController_lastTime, "f")) / 1000, now / 1000);
      __classPrivateFieldSet(this, _AnimationLoopController_lastTime, now, "f");
      __classPrivateFieldSet(this, _AnimationLoopController_frameId, requestAnimationFrame(__classPrivateFieldGet(this, _AnimationLoopController_loop, "f")), "f");
    });
    __classPrivateFieldSet(this, _AnimationLoopController_callback, callback, "f");
    host.addController(this);
  }
  /** @inheritdoc */
  hostDisconnected() {
    this.stop();
  }
  /** Starts the animation loop. */
  start() {
    if (__classPrivateFieldGet(this, _AnimationLoopController_running, "f")) return;
    __classPrivateFieldSet(this, _AnimationLoopController_running, true, "f");
    __classPrivateFieldSet(this, _AnimationLoopController_lastTime, performance.now(), "f");
    __classPrivateFieldGet(this, _AnimationLoopController_loop, "f").call(this);
  }
  /** Stops the animation loop. */
  stop() {
    if (!__classPrivateFieldGet(this, _AnimationLoopController_running, "f")) return;
    __classPrivateFieldSet(this, _AnimationLoopController_running, false, "f");
    if (__classPrivateFieldGet(this, _AnimationLoopController_frameId, "f") !== null) {
      cancelAnimationFrame(__classPrivateFieldGet(this, _AnimationLoopController_frameId, "f"));
      __classPrivateFieldSet(this, _AnimationLoopController_frameId, null, "f");
    }
  }
}
_AnimationLoopController_frameId = new WeakMap(), _AnimationLoopController_lastTime = new WeakMap(), _AnimationLoopController_running = new WeakMap(), _AnimationLoopController_callback = new WeakMap(), _AnimationLoopController_loop = new WeakMap();

var _MonitorControllerBase_host, _MonitorControllerBase_target, _MonitorControllerBase_targets;
/**
 * A base implementation for a `ReactiveController` used to monitor the state of one
 * or more elements. This class must be inherited.
 */
class MonitorControllerBase {
  /**
   * Initializes the `MonitorControllerBase` base class values when called by a derived class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {MonitorControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    /** @private */_MonitorControllerBase_host.set(this, void 0);
    /** @private */
    _MonitorControllerBase_target.set(this, void 0);
    /** @private */
    _MonitorControllerBase_targets.set(this, new Set());
    __classPrivateFieldSet(this, _MonitorControllerBase_host, host, "f");
    __classPrivateFieldSet(this, _MonitorControllerBase_target, options.target, "f");
    __classPrivateFieldGet(this, _MonitorControllerBase_host, "f").addController(this);
  }
  /** The targets being observed. */
  get targets() {
    return __classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").values();
  }
  /** Whether one or more targets are being monitored. */
  get hasTargets() {
    return __classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").size > 0;
  }
  /** @inheritdoc */
  hostConnected() {
    // Target defaults to host unless explicitly null.
    if (__classPrivateFieldGet(this, _MonitorControllerBase_target, "f") !== null) {
      this.observe(__classPrivateFieldGet(this, _MonitorControllerBase_target, "f") ?? __classPrivateFieldGet(this, _MonitorControllerBase_host, "f"));
    }
  }
  /** @inheritdoc */
  hostDisconnected() {
    this.unobserveAll();
  }
  /**
   * Starts observing the specified element.
   * @param {HTMLElement} target The element to start observing.
   */
  observe(target) {
    if (__classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").has(target)) return;
    __classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").add(target);
    this._observe(target);
  }
  /**
   * Determines whether the specified element is being observed.
   * @param {HTMLElement} target The element to test.
   * @returns {boolean} Whether `target` is being observed.
   */
  isObserving(target) {
    return __classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").has(target);
  }
  /**
   * Stops observing the specified element.
   * @param {HTMLElement} target The element to stop observing.
   */
  unobserve(target) {
    if (!__classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").delete(target)) return;
    this._unobserve(target);
  }
  /** Stops observing all targets. */
  unobserveAll() {
    __classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").forEach(x => this.unobserve(x));
    __classPrivateFieldGet(this, _MonitorControllerBase_targets, "f").clear();
  }
}
_MonitorControllerBase_host = new WeakMap(), _MonitorControllerBase_target = new WeakMap(), _MonitorControllerBase_targets = new WeakMap();

var _ClickOutsideController_instances, _ClickOutsideController_callback, _ClickOutsideController_documentClickHandler, _ClickOutsideController_listening, _ClickOutsideController_handleDocumentClick;
/** A `ReactiveController` used to monitor whether the user clicks outside all observed elements. */
class ClickOutsideController extends MonitorControllerBase {
  /**
   * Initializes a new instance of this class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {FocusControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    _ClickOutsideController_instances.add(this);
    /** @private */
    _ClickOutsideController_callback.set(this, void 0);
    /** @private */
    _ClickOutsideController_documentClickHandler.set(this, e => __classPrivateFieldGet(this, _ClickOutsideController_instances, "m", _ClickOutsideController_handleDocumentClick).call(this, e));
    /** @private */
    _ClickOutsideController_listening.set(this, false);
    __classPrivateFieldSet(this, _ClickOutsideController_callback, options.callback, "f");
  }
  /** @inheritdoc */
  _observe() {
    if (!__classPrivateFieldGet(this, _ClickOutsideController_listening, "f")) {
      document.addEventListener("click", __classPrivateFieldGet(this, _ClickOutsideController_documentClickHandler, "f"));
      __classPrivateFieldSet(this, _ClickOutsideController_listening, true, "f");
    }
  }
  /** @inheritdoc */
  _unobserve() {
    if (!this.hasTargets && __classPrivateFieldGet(this, _ClickOutsideController_listening, "f")) {
      document.removeEventListener("click", __classPrivateFieldGet(this, _ClickOutsideController_documentClickHandler, "f"));
      __classPrivateFieldSet(this, _ClickOutsideController_listening, false, "f");
    }
  }
}
_ClickOutsideController_callback = new WeakMap(), _ClickOutsideController_documentClickHandler = new WeakMap(), _ClickOutsideController_listening = new WeakMap(), _ClickOutsideController_instances = new WeakSet(), _ClickOutsideController_handleDocumentClick = function _ClickOutsideController_handleDocumentClick(e) {
  const composedPath = e.composedPath();
  if (!composedPath.some(x => x instanceof HTMLElement && this.isObserving(x))) {
    __classPrivateFieldGet(this, _ClickOutsideController_callback, "f").call(this, composedPath);
  }
};

/**
 * Determines whether forced colors are active.
 * @returns {boolean} Whether forced colors are active.
 */
function forcedColorsActive() {
  return !isServer && matchMedia("(forced-colors: active)").matches;
}

/**
 * Determines whether reduced motion is preferred.
 * @returns {boolean} Whether reduced motion is preferred.
 */
function prefersReducedMotion() {
  return isServer || matchMedia("(prefers-reduced-motion)").matches;
}

/**
 * Resolves an element by ID, waiting for document readiness if needed.
 * @param {string} id - The element ID to resolve.
 * @param {ParentNode} root - Optional root node to query from (defaults to document).
 * @returns {Promise<T | null>} A promise that resolves with the element or `null` if not found.
 */
function resolveElementById(id, root = document) {
  return new Promise(resolve => {
    const element = root.querySelector(`#${id}`);
    if (element) {
      resolve(element);
      return;
    }
    if (document.readyState === "complete" || document.readyState === "interactive") {
      resolve(root.querySelector(`#${id}`));
      return;
    }
    document.addEventListener("DOMContentLoaded", () => resolve(root.querySelector(`#${id}`)), {
      once: true
    });
  });
}

var _FocusController_instances, _a, _FocusController_touch, _FocusController_callback, _FocusController_filter, _FocusController_keyDownHandler, _FocusController_focusInHandler, _FocusController_focusOutHandler, _FocusController_touchStartHandler, _FocusController_touchEndHandler, _FocusController_hadKeydown, _FocusController_handleKeyDown, _FocusController_handleFocusIn, _FocusController_handleFocusOut;
/** A `ReactiveController` used to monitor the focused state of one or more elements. */
class FocusController extends MonitorControllerBase {
  /**
   * Initializes a new instance of this class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {FocusControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    _FocusController_instances.add(this);
    /** @private */
    _FocusController_touch.set(this, false);
    /** @private */
    _FocusController_callback.set(this, void 0);
    /** @private */
    _FocusController_filter.set(this, void 0);
    /** @private */
    _FocusController_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _FocusController_instances, "m", _FocusController_handleKeyDown).call(this, e));
    /** @private */
    _FocusController_focusInHandler.set(this, e => __classPrivateFieldGet(this, _FocusController_instances, "m", _FocusController_handleFocusIn).call(this, e));
    /** @private */
    _FocusController_focusOutHandler.set(this, e => __classPrivateFieldGet(this, _FocusController_instances, "m", _FocusController_handleFocusOut).call(this, e));
    /** @private */
    _FocusController_touchStartHandler.set(this, () => __classPrivateFieldSet(this, _FocusController_touch, true, "f"));
    /** @private */
    _FocusController_touchEndHandler.set(this, () => __classPrivateFieldSet(this, _FocusController_touch, false, "f"));
    __classPrivateFieldSet(this, _FocusController_callback, options.callback, "f");
    __classPrivateFieldSet(this, _FocusController_filter, options.filter, "f");
  }
  /** @inheritdoc */
  _observe(target) {
    target.addEventListener("keydown", __classPrivateFieldGet(this, _FocusController_keyDownHandler, "f"));
    target.addEventListener("focusin", __classPrivateFieldGet(this, _FocusController_focusInHandler, "f"));
    target.addEventListener("focusout", __classPrivateFieldGet(this, _FocusController_focusOutHandler, "f"));
    target.addEventListener("touchstart", __classPrivateFieldGet(this, _FocusController_touchStartHandler, "f"), {
      passive: true
    });
    target.addEventListener("touchend", __classPrivateFieldGet(this, _FocusController_touchEndHandler, "f"));
    target.addEventListener("touchcancel", __classPrivateFieldGet(this, _FocusController_touchEndHandler, "f"));
  }
  /** @inheritdoc */
  _unobserve(target) {
    target.removeEventListener("keydown", __classPrivateFieldGet(this, _FocusController_keyDownHandler, "f"));
    target.removeEventListener("focusin", __classPrivateFieldGet(this, _FocusController_focusInHandler, "f"));
    target.removeEventListener("focusout", __classPrivateFieldGet(this, _FocusController_focusOutHandler, "f"));
    target.removeEventListener("touchstart", __classPrivateFieldGet(this, _FocusController_touchStartHandler, "f"));
    target.removeEventListener("touchend", __classPrivateFieldGet(this, _FocusController_touchEndHandler, "f"));
    target.removeEventListener("touchcancel", __classPrivateFieldGet(this, _FocusController_touchEndHandler, "f"));
  }
}
_a = FocusController, _FocusController_touch = new WeakMap(), _FocusController_callback = new WeakMap(), _FocusController_filter = new WeakMap(), _FocusController_keyDownHandler = new WeakMap(), _FocusController_focusInHandler = new WeakMap(), _FocusController_focusOutHandler = new WeakMap(), _FocusController_touchStartHandler = new WeakMap(), _FocusController_touchEndHandler = new WeakMap(), _FocusController_instances = new WeakSet(), _FocusController_handleKeyDown = function _FocusController_handleKeyDown(e) {
  if (__classPrivateFieldGet(this, _FocusController_filter, "f")?.call(this, e)) return;
  const target = e.currentTarget;
  if (target.matches(":focus-within")) {
    __classPrivateFieldGet(this, _FocusController_instances, "m", _FocusController_handleFocusIn).call(this, e);
  }
}, _FocusController_handleFocusIn = function _FocusController_handleFocusIn(e) {
  if (__classPrivateFieldGet(this, _FocusController_filter, "f")?.call(this, e)) return;
  if (__classPrivateFieldGet(this, _FocusController_touch, "f")) return;
  const target = e.currentTarget;
  __classPrivateFieldGet(this, _FocusController_callback, "f").call(this, true, target.matches(":focus-visible") || __classPrivateFieldGet(_a, _a, "f", _FocusController_hadKeydown) || forcedColorsActive(), target);
}, _FocusController_handleFocusOut = function _FocusController_handleFocusOut(e) {
  if (__classPrivateFieldGet(this, _FocusController_filter, "f")?.call(this, e)) return;
  if (__classPrivateFieldGet(this, _FocusController_touch, "f")) return;
  __classPrivateFieldGet(this, _FocusController_callback, "f").call(this, false, false, e.currentTarget);
};
(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", () => __classPrivateFieldSet(_a, _a, true, "f", _FocusController_hadKeydown), {
      capture: true,
      passive: true
    });
    window.addEventListener("pointerdown", () => __classPrivateFieldSet(_a, _a, false, "f", _FocusController_hadKeydown), {
      capture: true
    });
  }
})();
/** @private */
_FocusController_hadKeydown = {
  value: false
};

var _HoverController_instances, _HoverController_callback, _HoverController_startDelays, _HoverController_endDelays, _HoverController_pointerInHandler, _HoverController_pointerLeaveHandler, _HoverController_clearDelays, _HoverController_clearStartDelay, _HoverController_clearEndDelay, _HoverController_handlePointerEnter, _HoverController_handlePointerLeave;
/** A `ReactiveController` used to monitor the hover state of one or more elements. */
class HoverController extends MonitorControllerBase {
  /**
   * Initializes a new instance of this class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {HoverControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    _HoverController_instances.add(this);
    /** @private */
    _HoverController_callback.set(this, void 0);
    /** @private */
    _HoverController_startDelays.set(this, new Map());
    /** @private */
    _HoverController_endDelays.set(this, new Map());
    /** @private */
    _HoverController_pointerInHandler.set(this, e => __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_handlePointerEnter).call(this, e));
    /** @private */
    _HoverController_pointerLeaveHandler.set(this, e => __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_handlePointerLeave).call(this, e));
    __classPrivateFieldSet(this, _HoverController_callback, options.callback, "f");
    this.startDelay = options.startDelay ?? 0;
    this.endDelay = options.endDelay ?? 0;
  }
  /** Clears any hover delays for all targets. */
  clearDelays() {
    for (const target of this.targets) {
      __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearDelays).call(this, target);
    }
  }
  /** @inheritdoc */
  _observe(target) {
    target.addEventListener("pointerenter", __classPrivateFieldGet(this, _HoverController_pointerInHandler, "f"));
    target.addEventListener("pointerleave", __classPrivateFieldGet(this, _HoverController_pointerLeaveHandler, "f"));
    target.addEventListener("touchend", __classPrivateFieldGet(this, _HoverController_pointerLeaveHandler, "f"));
  }
  /** @inheritdoc */
  _unobserve(target) {
    target.removeEventListener("pointerenter", __classPrivateFieldGet(this, _HoverController_pointerInHandler, "f"));
    target.removeEventListener("pointerleave", __classPrivateFieldGet(this, _HoverController_pointerLeaveHandler, "f"));
    target.removeEventListener("touchend", __classPrivateFieldGet(this, _HoverController_pointerLeaveHandler, "f"));
    __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearDelays).call(this, target);
  }
}
_HoverController_callback = new WeakMap(), _HoverController_startDelays = new WeakMap(), _HoverController_endDelays = new WeakMap(), _HoverController_pointerInHandler = new WeakMap(), _HoverController_pointerLeaveHandler = new WeakMap(), _HoverController_instances = new WeakSet(), _HoverController_clearDelays = function _HoverController_clearDelays(target) {
  __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearStartDelay).call(this, target);
  __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearEndDelay).call(this, target);
}, _HoverController_clearStartDelay = function _HoverController_clearStartDelay(target) {
  if (__classPrivateFieldGet(this, _HoverController_startDelays, "f").has(target)) {
    clearTimeout(__classPrivateFieldGet(this, _HoverController_startDelays, "f").get(target));
    return __classPrivateFieldGet(this, _HoverController_startDelays, "f").delete(target);
  }
  return false;
}, _HoverController_clearEndDelay = function _HoverController_clearEndDelay(target) {
  if (__classPrivateFieldGet(this, _HoverController_endDelays, "f").has(target)) {
    clearTimeout(__classPrivateFieldGet(this, _HoverController_endDelays, "f").get(target));
    return __classPrivateFieldGet(this, _HoverController_endDelays, "f").delete(target);
  }
  return false;
}, _HoverController_handlePointerEnter = function _HoverController_handlePointerEnter(e) {
  const target = e.target;
  // If there is a pending end delay, cancel it.
  __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearEndDelay).call(this, target);
  // Otherwise, if there is a pending start delay, cancel it and start a new one.
  if (this.startDelay > 0) {
    __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearStartDelay).call(this, target);
    __classPrivateFieldGet(this, _HoverController_startDelays, "f").set(target, setTimeout(() => {
      __classPrivateFieldGet(this, _HoverController_startDelays, "f").delete(target);
      __classPrivateFieldGet(this, _HoverController_callback, "f").call(this, true, target);
    }, this.startDelay));
  } else {
    // Otherwise, report the start.
    __classPrivateFieldGet(this, _HoverController_callback, "f").call(this, true, target);
  }
}, _HoverController_handlePointerLeave = function _HoverController_handlePointerLeave(e) {
  const target = e.target;
  // If there is a pending start delay, cancel it and do not report the end.
  if (__classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearStartDelay).call(this, target)) return;
  // Otherwise, if there is a pending end delay, cancel it and start a new one.
  if (this.endDelay > 0) {
    __classPrivateFieldGet(this, _HoverController_instances, "m", _HoverController_clearEndDelay).call(this, target);
    __classPrivateFieldGet(this, _HoverController_endDelays, "f").set(target, setTimeout(() => {
      __classPrivateFieldGet(this, _HoverController_endDelays, "f").delete(target);
      __classPrivateFieldGet(this, _HoverController_callback, "f").call(this, false, target);
    }, this.endDelay));
  } else {
    // Otherwise, report the end.
    __classPrivateFieldGet(this, _HoverController_callback, "f").call(this, false, target);
  }
};

var _InertController_host, _InertController_inerts;
/**
 * A `ReactiveController` that provides safe, predictable inerting of background
 * content for modal UI surfaces (dialogs, date pickers, fullscreen search views).
 */
class InertController {
  constructor(host) {
    /** @private */_InertController_host.set(this, void 0);
    /** @private */
    _InertController_inerts.set(this, new Array());
    __classPrivateFieldSet(this, _InertController_host, host, "f");
    host.addController(this);
  }
  /**
   * Locks background content by applying inertness to all non‑modal elements,
   * isolating the active surface from pointer and keyboard interaction.
   */
  lock() {
    this.unlock();
    for (let current = __classPrivateFieldGet(this, _InertController_host, "f"); current.parentNode && current.parentNode !== document.documentElement; current = current.parentNode) {
      for (const sibling of current.parentNode.children) {
        if (sibling instanceof HTMLElement && sibling !== current && !sibling.inert) {
          sibling.inert = true;
          __classPrivateFieldGet(this, _InertController_inerts, "f").push(sibling);
        }
      }
    }
  }
  /** Restores background interactivity by removing inertness previously applied during `lock()`. */
  unlock() {
    __classPrivateFieldGet(this, _InertController_inerts, "f").forEach(x => x.inert = false);
    __classPrivateFieldGet(this, _InertController_inerts, "f").length = 0;
  }
  /** @inheritdoc */
  hostDisconnected() {
    this.unlock();
  }
}
_InertController_host = new WeakMap(), _InertController_inerts = new WeakMap();

var _IntersectionController_callback, _IntersectionController_skipInitial, _IntersectionController_observer, _IntersectionController_unobservedUpdate;
/** A `ReactiveController` used to monitor changes in the intersection of a target element with an ancestor element. */
class IntersectionController extends MonitorControllerBase {
  /**
   * Initializes a new instance of the `IntersectionController` class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {IntersectionControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    /** @private */
    _IntersectionController_callback.set(this, void 0);
    /** @private */
    _IntersectionController_skipInitial.set(this, false);
    /** @private */
    _IntersectionController_observer.set(this, void 0);
    /** @private */
    _IntersectionController_unobservedUpdate.set(this, true);
    __classPrivateFieldSet(this, _IntersectionController_callback, options.callback, "f");
    __classPrivateFieldSet(this, _IntersectionController_skipInitial, options.skipInitial ?? false, "f");
    if (isServer) return;
    if (!window.IntersectionObserver) {
      console.warn("IntersectionController error: the browser does not support IntersectionObserver.");
      return;
    }
    __classPrivateFieldSet(this, _IntersectionController_observer, new IntersectionObserver((entries, observer) => {
      __classPrivateFieldGet(this, _IntersectionController_callback, "f").call(this, entries, observer);
    }, options.init), "f");
  }
  /** @inheritdoc */
  async hostUpdated() {
    if (__classPrivateFieldGet(this, _IntersectionController_observer, "f") && !__classPrivateFieldGet(this, _IntersectionController_skipInitial, "f") && __classPrivateFieldGet(this, _IntersectionController_unobservedUpdate, "f")) {
      __classPrivateFieldGet(this, _IntersectionController_callback, "f").call(this, [], __classPrivateFieldGet(this, _IntersectionController_observer, "f"));
    }
    __classPrivateFieldSet(this, _IntersectionController_unobservedUpdate, false, "f");
  }
  /** @inheritdoc */
  _observe(target) {
    __classPrivateFieldGet(this, _IntersectionController_observer, "f")?.observe(target);
    __classPrivateFieldSet(this, _IntersectionController_unobservedUpdate, true, "f");
  }
  /** @inheritdoc */
  _unobserve(target) {
    __classPrivateFieldGet(this, _IntersectionController_observer, "f")?.unobserve(target);
  }
}
_IntersectionController_callback = new WeakMap(), _IntersectionController_skipInitial = new WeakMap(), _IntersectionController_observer = new WeakMap(), _IntersectionController_unobservedUpdate = new WeakMap();

var _MutationController_instances, _MutationController_callback, _MutationController_skipInitial, _MutationController_config, _MutationController_observer, _MutationController_unobservedUpdate, _MutationController_slotListeners, _MutationController_observedSlotted, _MutationController_disconnect, _MutationController_attachSlotListener, _MutationController_detachSlotListener, _MutationController_onSlotChange;
/**
 * A `ReactiveController` that integrates a `MutationObserver` with an element's reactive update lifecycle
 * to detect arbitrary changes to DOM, including nodes being added or removed and attributes changing.
 */
class MutationController extends MonitorControllerBase {
  /**
   * Initializes a new instance of the `MutationController` class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {MutationControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    _MutationController_instances.add(this);
    /** @private */
    _MutationController_callback.set(this, void 0);
    /** @private */
    _MutationController_skipInitial.set(this, false);
    /** @private */
    _MutationController_config.set(this, void 0);
    /** @private */
    _MutationController_observer.set(this, void 0);
    /** @private */
    _MutationController_unobservedUpdate.set(this, true);
    /** @private */
    _MutationController_slotListeners.set(this, new Map());
    /** @private */
    _MutationController_observedSlotted.set(this, new Map());
    __classPrivateFieldSet(this, _MutationController_callback, options.callback, "f");
    __classPrivateFieldSet(this, _MutationController_skipInitial, options.skipInitial ?? false, "f");
    __classPrivateFieldSet(this, _MutationController_config, options.config, "f");
    if (isServer) return;
    if (!window.MutationObserver) {
      console.warn("MutationController error: the browser does not support MutationObserver.");
      return;
    }
    __classPrivateFieldSet(this, _MutationController_observer, new MutationObserver((records, observer) => __classPrivateFieldGet(this, _MutationController_callback, "f").call(this, records, observer)), "f");
  }
  /** @inheritdoc */
  async hostUpdated() {
    if (__classPrivateFieldGet(this, _MutationController_observer, "f") && !__classPrivateFieldGet(this, _MutationController_skipInitial, "f") && __classPrivateFieldGet(this, _MutationController_unobservedUpdate, "f")) {
      const records = __classPrivateFieldGet(this, _MutationController_observer, "f").takeRecords();
      if (records.length > 0) {
        __classPrivateFieldGet(this, _MutationController_callback, "f").call(this, records, __classPrivateFieldGet(this, _MutationController_observer, "f"));
      }
    }
    __classPrivateFieldSet(this, _MutationController_unobservedUpdate, false, "f");
  }
  /** @inheritdoc */
  hostDisconnected() {
    super.hostDisconnected();
    __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_disconnect).call(this);
  }
  /** @inheritdoc */
  _observe(target) {
    if (target instanceof HTMLSlotElement) {
      __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_attachSlotListener).call(this, target);
    } else {
      __classPrivateFieldGet(this, _MutationController_observer, "f")?.observe(target, __classPrivateFieldGet(this, _MutationController_config, "f"));
      __classPrivateFieldSet(this, _MutationController_unobservedUpdate, true, "f");
    }
  }
  /** @inheritdoc */
  _unobserve() {
    __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_disconnect).call(this);
    for (const target of this.targets) {
      if (target instanceof HTMLSlotElement) {
        __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_attachSlotListener).call(this, target);
      } else {
        __classPrivateFieldGet(this, _MutationController_observer, "f")?.observe(target, __classPrivateFieldGet(this, _MutationController_config, "f"));
      }
    }
  }
}
_MutationController_callback = new WeakMap(), _MutationController_skipInitial = new WeakMap(), _MutationController_config = new WeakMap(), _MutationController_observer = new WeakMap(), _MutationController_unobservedUpdate = new WeakMap(), _MutationController_slotListeners = new WeakMap(), _MutationController_observedSlotted = new WeakMap(), _MutationController_instances = new WeakSet(), _MutationController_disconnect = function _MutationController_disconnect() {
  __classPrivateFieldGet(this, _MutationController_observer, "f")?.disconnect();
  for (const [slot] of __classPrivateFieldGet(this, _MutationController_slotListeners, "f")) {
    __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_detachSlotListener).call(this, slot);
  }
  __classPrivateFieldGet(this, _MutationController_slotListeners, "f").clear();
  __classPrivateFieldGet(this, _MutationController_observedSlotted, "f").clear();
}, _MutationController_attachSlotListener = function _MutationController_attachSlotListener(slot) {
  if (__classPrivateFieldGet(this, _MutationController_slotListeners, "f").has(slot)) return;
  const handler = () => __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_onSlotChange).call(this, slot);
  slot.addEventListener("slotchange", handler);
  __classPrivateFieldGet(this, _MutationController_slotListeners, "f").set(slot, () => slot.removeEventListener("slotchange", handler));
  __classPrivateFieldGet(this, _MutationController_instances, "m", _MutationController_onSlotChange).call(this, slot);
}, _MutationController_detachSlotListener = function _MutationController_detachSlotListener(slot) {
  const remover = __classPrivateFieldGet(this, _MutationController_slotListeners, "f").get(slot);
  if (remover) {
    remover();
    __classPrivateFieldGet(this, _MutationController_slotListeners, "f").delete(slot);
  }
  __classPrivateFieldGet(this, _MutationController_observedSlotted, "f").delete(slot);
}, _MutationController_onSlotChange = function _MutationController_onSlotChange(slot) {
  __classPrivateFieldGet(this, _MutationController_observer, "f")?.disconnect();
  const slotted = slot.assignedElements({
    flatten: true
  });
  __classPrivateFieldGet(this, _MutationController_observedSlotted, "f").set(slot, slotted);
  for (const el of slotted) {
    __classPrivateFieldGet(this, _MutationController_observer, "f")?.observe(el, __classPrivateFieldGet(this, _MutationController_config, "f"));
  }
  for (const target of this.targets) {
    if (!(target instanceof HTMLSlotElement)) {
      __classPrivateFieldGet(this, _MutationController_observer, "f")?.observe(target, __classPrivateFieldGet(this, _MutationController_config, "f"));
    }
  }
  __classPrivateFieldSet(this, _MutationController_unobservedUpdate, true, "f");
};

var _PressedController_instances, _PressedController_capture, _PressedController_callback, _PressedController_filter, _PressedController_isPressedKey, _PressedController_pressedTargets, _PressedController_releaseTimeouts, _PressedController_minPressedDuration, _PressedController_pointerDownHandler, _PressedController_pointerUpHandler, _PressedController_touchEndHandler, _PressedController_keyDownHandler, _PressedController_keyUpHandler, _PressedController_handlePointerDown, _PressedController_handlePointerUp, _PressedController_handleTouchEnd, _PressedController_handleKeyDown, _PressedController_handleKeyUp, _PressedController_clearPressedTargets, _PressedController_clearReleaseTimeout;
/** A `ReactiveController` used to monitor the pressed state of one or more elements. */
class PressedController extends MonitorControllerBase {
  /**
   * Initializes a new instance of this class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {PressedControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    _PressedController_instances.add(this);
    /** @private */
    _PressedController_capture.set(this, void 0);
    /** @private */
    _PressedController_callback.set(this, void 0);
    /** @private */
    _PressedController_filter.set(this, void 0);
    /** @private */
    _PressedController_isPressedKey.set(this, void 0);
    /** @private */
    _PressedController_pressedTargets.set(this, new Map());
    /** @private */
    _PressedController_releaseTimeouts.set(this, new Map());
    /** @private */
    _PressedController_minPressedDuration.set(this, void 0);
    /** @private */
    _PressedController_pointerDownHandler.set(this, e => __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_handlePointerDown).call(this, e));
    /** @private */
    _PressedController_pointerUpHandler.set(this, e => __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_handlePointerUp).call(this, e));
    /** @private */
    _PressedController_touchEndHandler.set(this, e => __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_handleTouchEnd).call(this, e));
    /** @private */
    _PressedController_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_handleKeyDown).call(this, e));
    /** @private */
    _PressedController_keyUpHandler.set(this, e => __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_handleKeyUp).call(this, e));
    __classPrivateFieldSet(this, _PressedController_capture, options.capture, "f");
    __classPrivateFieldSet(this, _PressedController_callback, options.callback, "f");
    __classPrivateFieldSet(this, _PressedController_filter, options.filter, "f");
    __classPrivateFieldSet(this, _PressedController_isPressedKey, options.isPressedKey, "f");
    __classPrivateFieldSet(this, _PressedController_minPressedDuration, options.minPressedDuration ?? 0, "f");
  }
  /** @inheritdoc */
  hostConnected() {
    document.addEventListener("pointerup", __classPrivateFieldGet(this, _PressedController_pointerUpHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    document.addEventListener("touchend", __classPrivateFieldGet(this, _PressedController_touchEndHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    document.addEventListener("touchcancel", __classPrivateFieldGet(this, _PressedController_touchEndHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    super.hostConnected();
  }
  /** @inheritdoc */
  hostDisconnected() {
    document.removeEventListener("pointerup", __classPrivateFieldGet(this, _PressedController_pointerUpHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    document.removeEventListener("touchend", __classPrivateFieldGet(this, _PressedController_touchEndHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    document.removeEventListener("touchcancel", __classPrivateFieldGet(this, _PressedController_touchEndHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    super.hostDisconnected();
    for (const id of __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").values()) {
      clearTimeout(id);
    }
    __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").clear();
    __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").clear();
  }
  /** @inheritdoc */
  _observe(target) {
    target.addEventListener("pointerdown", __classPrivateFieldGet(this, _PressedController_pointerDownHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    if (__classPrivateFieldGet(this, _PressedController_isPressedKey, "f")) {
      target.addEventListener("keydown", __classPrivateFieldGet(this, _PressedController_keyDownHandler, "f"), {
        capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
      });
      target.addEventListener("keyup", __classPrivateFieldGet(this, _PressedController_keyUpHandler, "f"), {
        capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
      });
    }
  }
  /** @inheritdoc */
  _unobserve(target) {
    target.removeEventListener("pointerdown", __classPrivateFieldGet(this, _PressedController_pointerDownHandler, "f"), {
      capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
    });
    if (__classPrivateFieldGet(this, _PressedController_isPressedKey, "f")) {
      target.removeEventListener("keydown", __classPrivateFieldGet(this, _PressedController_keyDownHandler, "f"), {
        capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
      });
      target.removeEventListener("keyup", __classPrivateFieldGet(this, _PressedController_keyUpHandler, "f"), {
        capture: __classPrivateFieldGet(this, _PressedController_capture, "f")
      });
    }
    __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearReleaseTimeout).call(this, target);
    __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").delete(target);
  }
}
_PressedController_capture = new WeakMap(), _PressedController_callback = new WeakMap(), _PressedController_filter = new WeakMap(), _PressedController_isPressedKey = new WeakMap(), _PressedController_pressedTargets = new WeakMap(), _PressedController_releaseTimeouts = new WeakMap(), _PressedController_minPressedDuration = new WeakMap(), _PressedController_pointerDownHandler = new WeakMap(), _PressedController_pointerUpHandler = new WeakMap(), _PressedController_touchEndHandler = new WeakMap(), _PressedController_keyDownHandler = new WeakMap(), _PressedController_keyUpHandler = new WeakMap(), _PressedController_instances = new WeakSet(), _PressedController_handlePointerDown = function _PressedController_handlePointerDown(e) {
  if (__classPrivateFieldGet(this, _PressedController_filter, "f")?.call(this, e)) return;
  if (e.pointerType === "mouse" && e.button > 1) return;
  for (const target of e.composedPath()) {
    if (target instanceof HTMLElement && this.isObserving(target)) {
      __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearReleaseTimeout).call(this, target);
      __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").set(target, performance.now());
      __classPrivateFieldGet(this, _PressedController_callback, "f").call(this, true, {
        x: e.x,
        y: e.y
      }, target);
      break;
    }
  }
}, _PressedController_handlePointerUp = function _PressedController_handlePointerUp(e) {
  if (e.pointerType === "mouse" && e.button > 1) return;
  __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearPressedTargets).call(this, e.x, e.y);
}, _PressedController_handleTouchEnd = function _PressedController_handleTouchEnd(e) {
  __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearPressedTargets).call(this, e.changedTouches[0]?.clientX ?? 0, e.changedTouches[0]?.clientY ?? 0);
}, _PressedController_handleKeyDown = function _PressedController_handleKeyDown(e) {
  if (__classPrivateFieldGet(this, _PressedController_filter, "f")?.call(this, e)) return;
  if (e.target !== e.currentTarget) return;
  const target = e.currentTarget;
  if (__classPrivateFieldGet(this, _PressedController_isPressedKey, "f")?.call(this, e.key)) {
    if (e.key === " ") {
      e.preventDefault();
    }
    if (!e.repeat) {
      __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearReleaseTimeout).call(this, target);
      __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").set(target, performance.now());
      const bounds = target.getBoundingClientRect();
      __classPrivateFieldGet(this, _PressedController_callback, "f").call(this, true, {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2
      }, target);
    }
  }
}, _PressedController_handleKeyUp = function _PressedController_handleKeyUp(e) {
  if (e.target !== e.currentTarget) return;
  const target = e.currentTarget;
  if (__classPrivateFieldGet(this, _PressedController_pressedTargets, "f").has(target) && __classPrivateFieldGet(this, _PressedController_isPressedKey, "f")?.call(this, e.key)) {
    __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearReleaseTimeout).call(this, target);
    const remainingTime = __classPrivateFieldGet(this, _PressedController_minPressedDuration, "f") - (performance.now() - __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").get(target));
    const bounds = target.getBoundingClientRect();
    if (remainingTime > 0) {
      __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").set(target, setTimeout(() => {
        __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").delete(target);
        __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").delete(target);
        __classPrivateFieldGet(this, _PressedController_callback, "f").call(this, false, {
          x: bounds.x + bounds.width / 2,
          y: bounds.y + bounds.height / 2
        }, target);
      }, remainingTime));
    } else {
      __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").delete(target);
      __classPrivateFieldGet(this, _PressedController_callback, "f").call(this, false, {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2
      }, target);
    }
  }
}, _PressedController_clearPressedTargets = function _PressedController_clearPressedTargets(x, y) {
  for (const target of __classPrivateFieldGet(this, _PressedController_pressedTargets, "f")) {
    __classPrivateFieldGet(this, _PressedController_instances, "m", _PressedController_clearReleaseTimeout).call(this, target[0]);
    const remainingTime = __classPrivateFieldGet(this, _PressedController_minPressedDuration, "f") - (performance.now() - target[1]);
    if (remainingTime > 0) {
      __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").set(target[0], setTimeout(() => {
        __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").delete(target[0]);
        __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").delete(target[0]);
        __classPrivateFieldGet(this, _PressedController_callback, "f").call(this, false, {
          x,
          y
        }, target[0]);
      }, remainingTime));
    } else {
      __classPrivateFieldGet(this, _PressedController_pressedTargets, "f").delete(target[0]);
      __classPrivateFieldGet(this, _PressedController_callback, "f").call(this, false, {
        x,
        y
      }, target[0]);
    }
  }
}, _PressedController_clearReleaseTimeout = function _PressedController_clearReleaseTimeout(target) {
  const id = __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").get(target);
  if (id !== undefined) {
    clearTimeout(id);
    __classPrivateFieldGet(this, _PressedController_releaseTimeouts, "f").delete(target);
  }
};

var _ResizeController_callback, _ResizeController_skipInitial, _ResizeController_config, _ResizeController_observer, _ResizeController_unobservedUpdate;
/** A `ReactiveController` used to monitor when an element is resized. */
class ResizeController extends MonitorControllerBase {
  /**
   * Initializes a new instance of the `ResizeController` class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {ResizeControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    /** @private */
    _ResizeController_callback.set(this, void 0);
    /** @private */
    _ResizeController_skipInitial.set(this, void 0);
    /** @private */
    _ResizeController_config.set(this, void 0);
    /** @private */
    _ResizeController_observer.set(this, void 0);
    /** @private */
    _ResizeController_unobservedUpdate.set(this, true);
    __classPrivateFieldSet(this, _ResizeController_callback, options.callback, "f");
    __classPrivateFieldSet(this, _ResizeController_skipInitial, options.skipInitial ?? false, "f");
    __classPrivateFieldSet(this, _ResizeController_config, options.config, "f");
    if (isServer) return;
    if (!window.ResizeObserver) {
      console.warn("ResizeController error: the browser does not support ResizeObserver.");
      return;
    }
    __classPrivateFieldSet(this, _ResizeController_observer, new ResizeObserver((entries, observer) => __classPrivateFieldGet(this, _ResizeController_callback, "f").call(this, entries, observer)), "f");
  }
  /** @inheritdoc */
  async hostUpdated() {
    if (__classPrivateFieldGet(this, _ResizeController_observer, "f") && !__classPrivateFieldGet(this, _ResizeController_skipInitial, "f") && __classPrivateFieldGet(this, _ResizeController_unobservedUpdate, "f")) {
      __classPrivateFieldGet(this, _ResizeController_callback, "f").call(this, [], __classPrivateFieldGet(this, _ResizeController_observer, "f"));
    }
    __classPrivateFieldSet(this, _ResizeController_unobservedUpdate, false, "f");
  }
  /** @inheritdoc */
  _observe(target) {
    __classPrivateFieldGet(this, _ResizeController_observer, "f")?.observe(target, __classPrivateFieldGet(this, _ResizeController_config, "f"));
    __classPrivateFieldSet(this, _ResizeController_unobservedUpdate, true, "f");
  }
  /** @inheritdoc */
  _unobserve(target) {
    __classPrivateFieldGet(this, _ResizeController_observer, "f")?.unobserve(target);
  }
}
_ResizeController_callback = new WeakMap(), _ResizeController_skipInitial = new WeakMap(), _ResizeController_config = new WeakMap(), _ResizeController_observer = new WeakMap(), _ResizeController_unobservedUpdate = new WeakMap();

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @param {string} tagName The tag name of the custom element to define.
 */
const customElement = tagName => (classOrTarget, context) => {
  const define = () => {
    if (typeof window !== "undefined" && !customElements.get(tagName)) {
      customElements.define(tagName, classOrTarget);
    }
  };
  if (context) {
    context.addInitializer(define);
  } else {
    define();
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A decorator that runs a function once after a given "cooldown" period.
 * @param {number} timeout The timeout, in milliseconds, after which the function is invoked.
 * @returns {MethodDecorator} The decorator that runs a function once after a given "cooldown" period.
 */
function debounce(timeout) {
  const _id = Symbol("_id");
  return (_, __, descriptor) => {
    const orig = descriptor.value;
    descriptor.value = function (...args) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      clearTimeout(self[_id]);
      self[_id] = setTimeout(() => orig.apply(this, args), timeout);
    };
    return descriptor;
  };
}

var _ScrollController_instances, _ScrollController_debounce, _ScrollController_callback, _ScrollController_scrollHandler, _ScrollController_scrollContainers, _ScrollController_getShadowScrollContainer, _ScrollController_isScrollable, _ScrollController_getScrollContainers, _ScrollController_handleScroll;
/** A `ReactiveController` used to monitor when a scroll event is emitted from a scrollable ancestor. */
class ScrollController extends MonitorControllerBase {
  /**
   * Initializes a new instance of the `ScrollController` class.
   * @param {ReactiveControllerHost & HTMLElement} host The host element to which this controller will be added.
   * @param {ScrollControllerOptions} options Options used to configure this controller.
   */
  constructor(host, options) {
    super(host, options);
    _ScrollController_instances.add(this);
    /** @private */
    _ScrollController_debounce.set(this, void 0);
    /** @private */
    _ScrollController_callback.set(this, void 0);
    /** @private */
    _ScrollController_scrollHandler.set(this, e => __classPrivateFieldGet(this, _ScrollController_instances, "m", _ScrollController_handleScroll).call(this, e));
    /** @private */
    _ScrollController_scrollContainers.set(this, new Map());
    __classPrivateFieldSet(this, _ScrollController_debounce, options.debounce === true, "f");
    __classPrivateFieldSet(this, _ScrollController_callback, options.callback, "f");
  }
  /**
   * Returns the scrollable ancestors for a target element currently being observed by this controller.
   * @param target The element whose scroll containers are currently being observed.
   * @returns {Element[] | undefined} The scrollable ancestors, or `undefined` if `target` is not being observed.
   */
  getScrollContainers(target) {
    return __classPrivateFieldGet(this, _ScrollController_scrollContainers, "f").get(target);
  }
  /** @inheritdoc */
  _observe(target) {
    const scrollableAncestors = __classPrivateFieldGet(this, _ScrollController_instances, "m", _ScrollController_getScrollContainers).call(this, target);
    if (scrollableAncestors.length > 0) {
      __classPrivateFieldGet(this, _ScrollController_scrollContainers, "f").set(target, scrollableAncestors);
      for (const ancestor of scrollableAncestors) {
        (ancestor === document.documentElement ? document : ancestor).addEventListener("scroll", __classPrivateFieldGet(this, _ScrollController_scrollHandler, "f"), {
          passive: true
        });
      }
    }
  }
  /** @inheritdoc */
  _unobserve(target) {
    if (__classPrivateFieldGet(this, _ScrollController_scrollContainers, "f").has(target)) {
      for (const ancestor of __classPrivateFieldGet(this, _ScrollController_scrollContainers, "f").get(target)) {
        (ancestor === document.documentElement ? document : ancestor).removeEventListener("scroll", __classPrivateFieldGet(this, _ScrollController_scrollHandler, "f"));
      }
      __classPrivateFieldGet(this, _ScrollController_scrollContainers, "f").delete(target);
    }
  }
  /** @private */
  _debounceCallback(target) {
    __classPrivateFieldGet(this, _ScrollController_callback, "f").call(this, target);
  }
}
_ScrollController_debounce = new WeakMap(), _ScrollController_callback = new WeakMap(), _ScrollController_scrollHandler = new WeakMap(), _ScrollController_scrollContainers = new WeakMap(), _ScrollController_instances = new WeakSet(), _ScrollController_getShadowScrollContainer = function _ScrollController_getShadowScrollContainer(element) {
  const root = element.shadowRoot;
  if (!root) return null;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode;
  while (node) {
    if (node instanceof Element && __classPrivateFieldGet(this, _ScrollController_instances, "m", _ScrollController_isScrollable).call(this, node)) return node;
    node = walker.nextNode();
  }
  return null;
}, _ScrollController_isScrollable = function _ScrollController_isScrollable(element) {
  const style = getComputedStyle(element);
  return /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX);
}, _ScrollController_getScrollContainers = function _ScrollController_getScrollContainers(element) {
  const ancestors = new Array();
  const shadowScrollContainer = __classPrivateFieldGet(this, _ScrollController_instances, "m", _ScrollController_getShadowScrollContainer).call(this, element);
  if (shadowScrollContainer) {
    ancestors.push(shadowScrollContainer);
  }
  let ancestor = element;
  while (ancestor) {
    if (__classPrivateFieldGet(this, _ScrollController_instances, "m", _ScrollController_isScrollable).call(this, ancestor)) {
      ancestors.push(ancestor);
    }
    ancestor = ancestor.parentElement;
  }
  return ancestors;
}, _ScrollController_handleScroll = function _ScrollController_handleScroll(e) {
  const target = e.target === document ? document.documentElement : e.target;
  if (__classPrivateFieldGet(this, _ScrollController_debounce, "f")) {
    this._debounceCallback(target);
  } else {
    __classPrivateFieldGet(this, _ScrollController_callback, "f").call(this, target);
  }
};
__decorate([debounce(40)], ScrollController.prototype, "_debounceCallback", null);

var _ScrollLockController_instances, _ScrollLockController_locked, _ScrollLockController_scrollTop, _ScrollLockController_scrollLeft, _ScrollLockController_previousOverflow, _ScrollLockController_previousScrollbarGutter, _ScrollLockController_isVerticallyScrollable;
/**
 * A `ReactiveController` that provides safe, predictable scroll locking for modal UI
 * surfaces (dialogs, bottom sheets, overlays).
 */
class ScrollLockController {
  constructor(host) {
    _ScrollLockController_instances.add(this);
    /** @private */
    _ScrollLockController_locked.set(this, false);
    /** @private */
    _ScrollLockController_scrollTop.set(this, 0);
    /** @private */
    _ScrollLockController_scrollLeft.set(this, 0);
    /** @private */
    _ScrollLockController_previousOverflow.set(this, "");
    /** @private */
    _ScrollLockController_previousScrollbarGutter.set(this, "");
    host.addController(this);
  }
  /** Locks document scrolling only if scroll actually exists. */
  lock() {
    if (__classPrivateFieldGet(this, _ScrollLockController_locked, "f")) return;
    __classPrivateFieldSet(this, _ScrollLockController_locked, true, "f");
    // Save scroll position
    __classPrivateFieldSet(this, _ScrollLockController_scrollTop, window.scrollY, "f");
    __classPrivateFieldSet(this, _ScrollLockController_scrollLeft, window.scrollX, "f");
    // Save existing inline styles
    __classPrivateFieldSet(this, _ScrollLockController_previousOverflow, document.documentElement.style.overflow, "f");
    __classPrivateFieldSet(this, _ScrollLockController_previousScrollbarGutter, document.documentElement.style.scrollbarGutter, "f");
    // Only apply gutter if vertical scroll exists
    if (__classPrivateFieldGet(this, _ScrollLockController_instances, "m", _ScrollLockController_isVerticallyScrollable).call(this)) {
      document.documentElement.style.scrollbarGutter = "stable";
    }
    // Lock scroll
    document.documentElement.style.overflow = "hidden";
    // Freeze scroll position
    window.scrollTo(__classPrivateFieldGet(this, _ScrollLockController_scrollLeft, "f"), __classPrivateFieldGet(this, _ScrollLockController_scrollTop, "f"));
  }
  /** Unlocks document scrolling and restores the previous state. */
  unlock() {
    if (!__classPrivateFieldGet(this, _ScrollLockController_locked, "f")) return;
    __classPrivateFieldSet(this, _ScrollLockController_locked, false, "f");
    // Restore previous inline styles
    document.documentElement.style.overflow = __classPrivateFieldGet(this, _ScrollLockController_previousOverflow, "f");
    document.documentElement.style.scrollbarGutter = __classPrivateFieldGet(this, _ScrollLockController_previousScrollbarGutter, "f");
    // Restore scroll position
    window.scrollTo(__classPrivateFieldGet(this, _ScrollLockController_scrollLeft, "f"), __classPrivateFieldGet(this, _ScrollLockController_scrollTop, "f"));
  }
  /** @inheritdoc */
  hostDisconnected() {
    this.unlock();
  }
}
_ScrollLockController_locked = new WeakMap(), _ScrollLockController_scrollTop = new WeakMap(), _ScrollLockController_scrollLeft = new WeakMap(), _ScrollLockController_previousOverflow = new WeakMap(), _ScrollLockController_previousScrollbarGutter = new WeakMap(), _ScrollLockController_instances = new WeakSet(), _ScrollLockController_isVerticallyScrollable = function _ScrollLockController_isVerticallyScrollable() {
  return document.documentElement.scrollHeight > document.documentElement.clientHeight;
};

const important = "important";
// The leading space is important
const importantFlag = " !" + important;
// How many characters to remove from a value, as a negative number
const flagTrim = 0 - importantFlag.length;
class SafeStyleMapDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    if (partInfo.type !== PartType.ATTRIBUTE || partInfo.name !== "style" || partInfo.strings?.length > 2) {
      throw new Error("The `styleMap` directive must be used in the `style` attribute " + "and must be the only part in the attribute.");
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_) {
    return nothing;
  }
  update(part, [styleInfo]) {
    const {
      style
    } = part.element;
    if (this._previousStyleProperties === undefined) {
      this._previousStyleProperties = new Set(Object.keys(styleInfo));
    }
    // Remove old properties that no longer exist in styleInfo
    for (const name of this._previousStyleProperties) {
      // If the name isn't in styleInfo or it's null/undefined
      if (styleInfo[name] == null) {
        this._previousStyleProperties.delete(name);
        if (name.includes("-")) {
          style.removeProperty(name);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style[name] = null;
        }
      }
    }
    // Add or update properties
    for (const name in styleInfo) {
      const value = styleInfo[name];
      if (value != null) {
        this._previousStyleProperties.add(name);
        const isImportant = typeof value === "string" && value.endsWith(importantFlag);
        if (name.includes("-") || isImportant) {
          style.setProperty(name, isImportant ? value.slice(0, flagTrim) : value, isImportant ? important : "");
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style[name] = value;
        }
      }
    }
    return noChange;
  }
}
/**
 * A directive that applies CSS properties to an element.
 *
 * `safeStyleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the
 * {@link StyleInfo styleInfo} object and adds the properties to the inline
 * style of the element.
 *
 * Property names with dashes (`-`) are assumed to be valid CSS
 * property names and set on the element's style object using `setProperty()`.
 * Names without dashes are assumed to be camelCased JavaScript property names
 * and set on the element's style object using property assignment, allowing the
 * style object to translate JavaScript-style names to CSS property names.
 *
 * For example `safeStyleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo
 * @see {@link https://lit.dev/docs/templates/directives/#stylemap styleMap code samples on Lit.dev}
 */
const safeStyleMap = directive(SafeStyleMapDirective);

/**
 * Determines whether an object has keys for a given type.
 * @template T The type to test.
 * @param {unknown} value The value to test.
 * @param {...keys: Array<keyof T>} keys The keys of `T` to test.
 * @returns {boolean} Whether `value` has all `keys`.
 */
function hasKeys(value, ...keys) {
  return typeof value === "object" && value !== null && keys.every(x => x in value);
}

/** A symbol through which to access the `ElementInternals` attached to an element. */
const internals = Symbol("internals");
/**
 * Determines whether a value is an `AttachInternalsMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `AttachInternalsMixin`.
 */
function isAttachInternalsMixin(value) {
  return hasKeys(value, internals);
}
const _internals = Symbol("_internals");
// Since flushing custom state doesn't flush in Safari (affecting all iOS browsers),
// a copy of custom state is retained locally so components can correctly read after write.
const _customState = Symbol("_customState");
/**
 * Mixin to augment an element with behavior that attaches to `ElementInternals`.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {boolean | undefined} formAssociated Whether the element is "Form Associated".
 * @returns {Constructor<AttachInternalsMixin> & T} A constructor that implements `AttachInternalsMixin`.
 */
function AttachInternals(base, formAssociated) {
  var _a;
  class _AttachInternals extends base {
    constructor() {
      super(...arguments);
      // Since flushing custom state doesn't flush in Safari (affecting all iOS browsers),
      // a copy of custom state is retained locally so components can correctly read after write.
      /** @private */
      this[_a] = new Set();
    }
    /** @internal */
    get [(_a = _customState, internals)]() {
      return this[_internals] ?? (this[_internals] = this.attachInternals());
    }
  }
  /** @internal */
  _AttachInternals.formAssociated = formAssociated;
  return _AttachInternals;
}
/**
 * Convenience function used to test whether an element has a given custom state.
 * @param {AttachInternalsMixin} element The element to test.
 * @param {string} state The custom state to test.
 * @returns {boolean} Whether `element` has `state`.
 */
function hasCustomState(element, state) {
  // Since flushing custom state doesn't flush in Safari (affecting all iOS browsers),
  // a copy of custom state is retained locally so components can correctly read after write.
  if (_customState in element) {
    return element[_customState].has(state);
  }
  // This should never get called due to needing a local copy of custom state
  // since reading after write to flush doesn't work in Safari (affecting all iOS browsers).
  return element[internals].states.has(state);
}
/**
 * Convenience function used to add custom state to an element.
 * @param {AttachInternalsMixin} element The element to which to add custom state.
 * @param {string} state The custom state to add.
 */
function addCustomState(element, state) {
  // Avoid style recalculation when element already has state.
  if (hasCustomState(element, state)) return;
  // Since flushing custom state doesn't flush in Safari (affecting all iOS browsers),
  // a copy of custom state is retained locally so components can correctly read after write.
  if (_customState in element) {
    element[_customState].add(state);
  }
  element[internals]?.states.add(state);
  element[internals]?.states.has(state); // flush (even though this doesn't work in Safari)
}
/**
 * Convenience function used to delete custom state from an element.
 * @param {AttachInternalsMixin} element The element from which to delete custom state.
 * @param {string} state The custom state to delete.
 * @returns {boolean} Whether `state` was removed from `element`.
 */
function deleteCustomState(element, state) {
  // Since flushing custom state doesn't flush in Safari (affecting all iOS browsers),
  // a copy of custom state is retained locally so components can correctly read after write.
  if (_customState in element) {
    element[_customState].delete(state);
  }
  if (element[internals]?.states.delete(state)) {
    element[internals]?.states.has(state); // flush (even though this doesn't work in Safari)
    return true;
  }
  return false;
}
/**
 * Convenience function used to add or delete custom state for an element.
 * @param {AttachInternalsMixin} element The element for which to add or delete custom state.
 * @param {string} state The custom state to add or delete.
 * @param {boolean} value Whether to add or delete `state` from `element`.
 */
function setCustomState(element, state, value) {
  if (value) {
    addCustomState(element, state);
  } else {
    deleteCustomState(element, state);
  }
}
/**
 * Convenience function used to add custom state for an element based on an enumerated value.
 *
 * For each value in `values`, a custom state named `--${value}` is updated.
 * The state matching `value` is added; all others are removed.
 *
 * @template T extends string
 * @param {AttachInternalsMixin} element The element for which to set custom state.
 * @param {T} value The current value of the enumeration.
 * @param {readonly T[]} values The possible values of the enumeration.
 */
function setCustomEnumState(element, value, ...values) {
  values.forEach(x => setCustomState(element, `--${x}`, x === value));
}

/**
 * Determines whether a value is a `CheckedMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CheckedMixin`.
 */
function isCheckedMixin(value) {
  return hasKeys(value, "checked");
}
/**
 * Mixin to augment an element with behavior that supports a checked state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<CheckedMixin> & T} A constructor that implements `CheckedMixin`.
 */
function Checked(base) {
  class _CheckedMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * Whether the element is checked.
       * @default false
       */
      this.checked = false;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("checked")) {
        if (this.role === "button") {
          this.ariaPressed = `${this.checked}`;
          this.ariaChecked = null;
        } else if (this.role && this.role !== "none" && this.role !== "presentation") {
          this.ariaChecked = `${this.checked}`;
          this.ariaPressed = null;
        }
      }
    }
  }
  __decorate([property({
    type: Boolean,
    reflect: true
  })], _CheckedMixin.prototype, "checked", void 0);
  return _CheckedMixin;
}

/**
 * Determines whether a value is a `CheckedIndeterminateMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CheckedIndeterminateMixin`.
 */
function isCheckedIndeterminateMixin(value) {
  return hasKeys(value, "indeterminate") && isCheckedMixin(value);
}
/**
 * Mixin to augment an element with behavior that supports a mixed checked state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<CheckedIndeterminateMixin> & T} A constructor that implements `CheckedIndeterminateMixin`.
 */
function CheckedIndeterminate(base) {
  class _CheckedIndeterminateMixin extends Checked(base) {
    constructor() {
      super(...arguments);
      /**
       * Whether the element's checked state is indeterminate.
       * @default false
       */
      this.indeterminate = false;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("indeterminate") && this.role && this.role !== "none" && this.role !== "presentation") {
        this.ariaChecked = !this.checked && this.indeterminate ? "mixed" : `${this.checked}`;
      }
    }
  }
  __decorate([property({
    type: Boolean,
    reflect: true
  })], _CheckedIndeterminateMixin.prototype, "indeterminate", void 0);
  return _CheckedIndeterminateMixin;
}

/** Design tokens that control color. */
const ColorToken = {
  /** High-emphasis fills, texts, and icons against surface. */
  primary: unsafeCSS("var(--md-sys-color-primary, #6750A4)"),
  /** Text and icons against primary. */
  onPrimary: unsafeCSS("var(--md-sys-color-on-primary, #FFFFFF)"),
  /** Standout fill color against surface, for key components. */
  primaryContainer: unsafeCSS("var(--md-sys-color-primary-container, #EADDFF)"),
  /** Text and icons against primary container. */
  onPrimaryContainer: unsafeCSS("var(--md-sys-color-on-primary-container, #4F378B)"),
  /** High-emphasis fills, texts, and icons that maintain the same tone in light and dark themes. */
  primaryFixed: unsafeCSS("var(--md-sys-color-primary-fixed, #EADDFF)"),
  /** High-emphasis fills, texts, and icons that maintain the same stronger tone in light and dark themes. */
  primaryFixedDim: unsafeCSS("var(--md-sys-color-primary-fixed-dim, #D0BCFF)"),
  /** Text and icons against fixed primary. */
  onPrimaryFixed: unsafeCSS("var(--md-sys-color-on-primary-fixed, #21005D)"),
  /** Lower-emphasis text and icons against fixed primary. */
  onPrimaryFixedVariant: unsafeCSS("var(--md-sys-color-on-primary-fixed-variant, #4F378B)"),
  /** Less prominent fills, text, and icons against surface. */
  secondary: unsafeCSS("var(--md-sys-color-secondary, #625B71)"),
  /** Text and icons against secondary. */
  onSecondary: unsafeCSS("var(--md-sys-color-on-secondary, #FFFFFF)"),
  /** Less prominent fill color against surface, for recessive components. */
  secondaryContainer: unsafeCSS("var(--md-sys-color-secondary-container, #E8DEF8)"),
  /** Text and icons against secondary container. */
  onSecondaryContainer: unsafeCSS("var(--md-sys-color-on-secondary-container, #4A4458)"),
  /** Less prominent fills, texts, and icons that maintain the same tone in light and dark themes. */
  secondaryFixed: unsafeCSS("var(--md-sys-color-secondary-fixed, #E8DEF8)"),
  /** Less prominent fills, texts, and icons that maintain the same stronger tone in light and dark themes. */
  secondaryFixedDim: unsafeCSS("var(--md-sys-color-secondary-fixed-dim, #CCC2DC)"),
  /** Text and icons against fixed secondary. */
  onSecondaryFixed: unsafeCSS("var(--md-sys-color-on-secondary-fixed, #1D192B)"),
  /** Lower-emphasis text and icons against fixed secondary. */
  onSecondaryFixedVariant: unsafeCSS("var(--md-sys-color-on-secondary-fixed-variant, #4A4458)"),
  /** Complementary fills, text, and icons against surface. */
  tertiary: unsafeCSS("var(--md-sys-color-tertiary, #7D5260)"),
  /** Text and icons against tertiary. */
  onTertiary: unsafeCSS("var(--md-sys-color-on-tertiary, #FFFFFF)"),
  /** Complementary container color against surface. */
  tertiaryContainer: unsafeCSS("var(--md-sys-color-tertiary-container, #FFD8E4)"),
  /** Text and icons against tertiary container. */
  onTertiaryContainer: unsafeCSS("var(--md-sys-color-on-tertiary-container, #633B48)"),
  /** Complementary fills, texts, and icons that maintain the same tone in light and dark themes. */
  tertiaryFixed: unsafeCSS("var(--md-sys-color-tertiary-fixed, #FFD8E4)"),
  /** Complementary fills, texts, and icons that maintain the same stronger tone in light and dark themes. */
  tertiaryFixedDim: unsafeCSS("var(--md-sys-color-tertiary-fixed-dim, #EFB8C8)"),
  /** Text and icons against fixed tertiary. */
  onTertiaryFixed: unsafeCSS("var(--md-sys-color-on-tertiary-fixed, #31111D)"),
  /** Lower-emphasis text and icons against fixed tertiary. */
  onTertiaryFixedVariant: unsafeCSS("var(--md-sys-color-on-tertiary-fixed-variant, #633B48)"),
  /** Attention-grabbing color against surface for fills, icons, and text, indicating urgency. */
  error: unsafeCSS("var(--md-sys-color-error, #B3261E)"),
  /** Text and icons against error. */
  onError: unsafeCSS("var(--md-sys-color-on-error, #FFFFFF)"),
  /** Attention-grabbing fill color against surface. */
  errorContainer: unsafeCSS("var(--md-sys-color-error-container, #F9DEDC)"),
  /** Text and icons against error container. */
  onErrorContainer: unsafeCSS("var(--md-sys-color-on-error-container, #8C1D18)"),
  /** Default color for backgrounds. */
  surface: unsafeCSS("var(--md-sys-color-surface, #FEF7FF)"),
  /** Text and icons against any surface color. */
  onSurface: unsafeCSS("var(--md-sys-color-on-surface, #1D1B20)"),
  /** Lower-emphasis color for text and icons against any surface color. */
  onSurfaceVariant: unsafeCSS("var(--md-sys-color-on-surface-variant, #49454F)"),
  /** Lowest-emphasis container color. */
  surfaceContainerLowest: unsafeCSS("var(--md-sys-color-surface-container-lowest, #FFFFFF)"),
  /** Low-emphasis container color. */
  surfaceContainerLow: unsafeCSS("var(--md-sys-color-surface-container-low, #F7F2FA)"),
  /** Default container color. */
  surfaceContainer: unsafeCSS("var(--md-sys-color-surface-container, #F3EDF7)"),
  /** High-emphasis container color. */
  surfaceContainerHigh: unsafeCSS("var(--md-sys-color-surface-container-high, #ECE6F0)"),
  /** Highest-emphasis container color. */
  surfaceContainerHighest: unsafeCSS("var(--md-sys-color-surface-container-highest, #E6E0E9)"),
  /** Dimmest surface color in light and dark themes. */
  surfaceDim: unsafeCSS("var(--md-sys-color-surface-dim, #DED8E1)"),
  /** Brightest surface color in light and dark themes. */
  surfaceBright: unsafeCSS("var(--md-sys-color-surface-bright, #FEF7FF)"),
  /** Alternate surface color, can be used for active states. */
  surfaceVariant: unsafeCSS("var(--md-sys-color-surface-variant, #E7E0EC)"),
  /** Background fills for elements which contrast against surface. */
  inverseSurface: unsafeCSS("var(--md-sys-color-inverse-surface, #322F35)"),
  /** Text and icons against inverse surface. */
  inverseOnSurface: unsafeCSS("var(--md-sys-color-inverse-on-surface, #F5EFF7)"),
  /** Primary text and icons against inverse surface. */
  inversePrimary: unsafeCSS("var(--md-sys-color-inverse-primary, #D0BCFF)"),
  /** Important boundaries, such as a text field outline. */
  outline: unsafeCSS("var(--md-sys-color-outline, #79747E)"),
  /** Decorative elements, such as dividers. */
  outlineVariant: unsafeCSS("var(--md-sys-color-outline-variant, #CAC4D0)"),
  /** Elevation shadow color. */
  shadow: unsafeCSS("var(--md-sys-color-shadow, #000000)"),
  /** Backdrop which obscures underlying content. */
  scrim: unsafeCSS("var(--md-sys-color-scrim, #000000)")
};

const _DensityToken = {
  /** Base density multiplier. */
  scale: unsafeCSS("var(--md-sys-density-scale, 0)"),
  /** Spatial unit used to scale component dimensions based on density. */
  size: unsafeCSS("var(--md-sys-density-size, 4px)")
};
/** Design tokens that control density. */
const DensityToken = {
  ..._DensityToken,
  /**
   * Creates a CSS `calc` that calculates a dimension based on density.
   * @param {number} minScale The minimum supported scale.
   * @returns {CSSResult} A CSS `calc` used to calculate a dimension based on density.
   */
  calc(minScale) {
    return unsafeCSS(`calc(max(${minScale}, ${_DensityToken.scale}) * ${_DensityToken.size})`);
  },
  /**
   * Creates a CSS `calc` that calculates a dimension based on half density.
   * @param {number} minScale The minimum supported scale.
   * @returns {CSSResult} A CSS `calc` used to calculate a dimension based on half density.
   */
  calcHalf(minScale) {
    return unsafeCSS(`calc(max(${minScale}, ${_DensityToken.scale}) * (${_DensityToken.size} / 2))`);
  }
};

const UMBRA_COLOR = `color-mix(in srgb, var(--m3e-elevation-color, ${ColorToken.shadow}) 20%, transparent)`;
const UMBRA = ["0px 0px 0px 0px", "0px 2px 1px -1px", "0px 3px 1px -2px", "0px 3px 3px -2px", "0px 2px 4px -1px", "0px 3px 5px -1px", "0px 3px 5px -1px", "0px 4px 5px -2px", "0px 5px 5px -3px", "0px 5px 6px -3px", "0px 6px 6px -3px", "0px 6px 7px -4px", "0px 7px 8px -4px", "0px 7px 8px -4px", "0px 7px 9px -4px", "0px 8px 9px -5px", "0px 8px 10px -5px", "0px 8px 11px -5px", "0px 9px 11px -5px", "0px 9px 12px -6px", "0px 10px 13px -6px", "0px 10px 13px -6px", "0px 10px 14px -6px", "0px 11px 14px -7px", "0px 11px 15px -7px"];
const PENUMBRA_COLOR = `color-mix(in srgb, var(--m3e-elevation-color, ${ColorToken.shadow}) 14%, transparent)`;
const PENUMBRA = ["0px 0px 0px 0px", "0px 1px 1px 0px", "0px 2px 2px 0px", "0px 3px 4px 0px", "0px 4px 5px 0px", "0px 5px 8px 0px", "0px 6px 10px 0px", "0px 7px 10px 1px", "0px 8px 10px 1px", "0px 9px 12px 1px", "0px 10px 14px 1px", "0px 11px 15px 1px", "0px 12px 17px 2px", "0px 13px 19px 2px", "0px 14px 21px 2px", "0px 15px 22px 2px", "0px 16px 24px 2px", "0px 17px 26px 2px", "0px 18px 28px 2px", "0px 19px 29px 2px", "0px 20px 31px 3px", "0px 21px 33px 3px", "0px 22px 35px 3px", "0px 23px 36px 3px", "0px 24px 38px 3px"];
const AMBIENT_COLOR = `color-mix(in srgb, var(--m3e-elevation-color, ${ColorToken.shadow}) 12%, transparent)`;
const AMBIENT = ["0px 0px 0px 0px", "0px 1px 3px 0px", "0px 1px 5px 0px", "0px 1px 8px 0px", "0px 1px 10px 0px", "0px 1px 14px 0px", "0px 1px 18px 0px", "0px 2px 16px 1px", "0px 3px 14px 2px", "0px 3px 16px 2px", "0px 4px 18px 3px", "0px 4px 20px 3px", "0px 5px 22px 4px", "0px 5px 24px 4px", "0px 5px 26px 4px", "0px 6px 28px 5px", "0px 6px 30px 5px", "0px 6px 32px 5px", "0px 7px 34px 6px", "0px 7px 36px 6px", "0px 8px 38px 7px", "0px 8px 40px 7px", "0px 8px 42px 7px", "0px 9px 44px 8px", "0px 9px 46px 8px"];
function elevation(z) {
  return `${UMBRA_COLOR} ${UMBRA[z]},${PENUMBRA_COLOR} ${PENUMBRA[z]},${AMBIENT_COLOR} ${AMBIENT[z]}`;
}
/** Design tokens that control elevation. */
const ElevationToken$1 = {
  /** Level 0 elevation. */
  level0: unsafeCSS(`var(--md-sys-elevation-level0, ${elevation(0)})`),
  /** Level 1 elevation. */
  level1: unsafeCSS(`var(--md-sys-elevation-level1, ${elevation(1)})`),
  /** Level 2 elevation. */
  level2: unsafeCSS(`var(--md-sys-elevation-level2, ${elevation(3)})`),
  /** Level 3 elevation. */
  level3: unsafeCSS(`var(--md-sys-elevation-level3, ${elevation(6)})`),
  /** Level 4 elevation. */
  level4: unsafeCSS(`var(--md-sys-elevation-level4, ${elevation(8)})`),
  /** Level 5 elevation. */
  level5: unsafeCSS(`var(--md-sys-elevation-level5, ${elevation(12)})`)
};

function space(unit) {
  return unsafeCSS(`var(--md-sys-measurement-space${unit}, ${8 * (unit / 100)}px)`);
}
/** Design tokens that control measurements. */
const MeasurementToken = {
  /** Zero spacing. */
  space0: space(0),
  /** 2dp spacing. */
  space25: space(25),
  /** 4dp spacing. */
  space50: space(50),
  /** 6dp spacing. */
  space75: space(75),
  /** 8dp spacing. */
  space100: space(100),
  /** 10dp spacing. */
  space125: space(125),
  /** 12dp spacing. */
  space150: space(150),
  /** 14dp spacing. */
  space175: space(175),
  /** 16dp spacing. */
  space200: space(200),
  /** 18dp spacing. */
  space225: space(225),
  /** 20dp spacing. */
  space250: space(250),
  /** 24dp spacing. */
  space300: space(300),
  /** 26dp spacing. */
  space325: space(325),
  /** 28dp spacing. */
  space350: space(350),
  /** 30dp spacing. */
  space375: space(375),
  /** 32dp spacing. */
  space400: space(400),
  /** 34dp spacing. */
  space425: space(425),
  /** 36dp spacing. */
  space450: space(450),
  /** 38dp spacing. */
  space475: space(475),
  /** 40dp spacing. */
  space500: space(500),
  /** 42dp spacing. */
  space525: space(525),
  /** 44dp spacing. */
  space550: space(550),
  /** 46dp spacing. */
  space575: space(575),
  /** 48dp spacing. */
  space600: space(600),
  /** 50dp spacing. */
  space625: space(625),
  /** 52dp spacing. */
  space650: space(650),
  /** 54dp spacing. */
  space675: space(675),
  /** 56dp spacing. */
  space700: space(700),
  /** 58dp spacing. */
  space725: space(725),
  /** 60dp spacing. */
  space750: space(750),
  /** 62dp spacing. */
  space775: space(775),
  /** 64dp spacing. */
  space800: space(800),
  /** 66dp spacing. */
  space825: space(825),
  /** 68dp spacing. */
  space850: space(850),
  /** 70dp spacing. */
  space875: space(875),
  /** 72dp spacing. */
  space900: space(900)
};

const EasingToken = {
  /** Emphasized transition. */
  emphasized: unsafeCSS("var(--md-sys-motion-easing-emphasized, cubic-bezier(0.2, 0.0, 0, 1.0))"),
  /** Decelerated emphasized transition. */
  emphasizedDecelerate: unsafeCSS("var(--md-sys-motion-easing-emphasized-decelerate, cubic-bezier(0.05, 0.7, 0.1, 1.0))"),
  /** Accelerated emphasized transition. */
  emphasizedAccelerate: unsafeCSS("var(--md-sys-motion-easing-emphasized-accelerate, cubic-bezier(0.3, 0.0, 0.8, 0.15))"),
  /** Simple, small, or utility-focused transition. */
  standard: unsafeCSS("var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0.0, 0, 1.0))"),
  /** Decelerated standard transition. */
  standardDecelerate: unsafeCSS("var(--md-sys-motion-easing-standard-decelerate, cubic-bezier(0, 0, 0, 1))"),
  /** Accelerated standard transition. */
  standardAccelerate: unsafeCSS("var(--md-sys-motion-easing-standard-accelerate, cubic-bezier(0.3, 0, 1, 1))")
};
const SpringToken = {
  /** Fast spatial spring. */
  fastSpatial: unsafeCSS("var(--md-sys-motion-spring-fast-spatial, 350ms cubic-bezier(0.27, 1.06, 0.18, 1.00))"),
  /** Default spatial spring. */
  defaultSpatial: unsafeCSS("var(--md-sys-motion-spring-default-spatial, 500ms cubic-bezier(0.27, 1.06, 0.18, 1.00))"),
  /** Slow spatial spring. */
  slowSpatial: unsafeCSS("var(--md-sys-motion-spring-slow-spatial, 750ms cubic-bezier(0.27, 1.06, 0.18, 1.00))"),
  /** Fast effects spring. */
  fastEffects: unsafeCSS("var(--md-sys-motion-spring-fast-effects, 150ms cubic-bezier(0.31, 0.94, 0.34, 1.00))"),
  /** Default effects spring. */
  defaultEffects: unsafeCSS("var(--md-sys-motion-spring-default-effects, 200ms cubic-bezier(0.34, 0.80, 0.34, 1.00))"),
  /** Slow effects spring. */
  slowEffects: unsafeCSS("var(--md-sys-motion-spring-slow-effects, 300ms cubic-bezier(0.34, 0.88, 0.34, 1.00))")
};
const DurationToken = {
  /** Small utility-focused transition duration. */
  short1: unsafeCSS("var(--md-sys-motion-duration-short-1, 50ms)"),
  /** Small utility-focused transition duration. */
  short2: unsafeCSS("var(--md-sys-motion-duration-short-2, 100ms)"),
  /** Small utility-focused transition duration. */
  short3: unsafeCSS("var(--md-sys-motion-duration-short-3, 150ms)"),
  /** Small utility-focused transition duration. */
  short4: unsafeCSS("var(--md-sys-motion-duration-short-4, 200ms)"),
  /**  Duration for transitions that traverse a medium area of the screen. */
  medium1: unsafeCSS("var(--md-sys-motion-duration-medium-1, 250ms)"),
  /**  Duration for transitions that traverse a medium area of the screen. */
  medium2: unsafeCSS("var(--md-sys-motion-duration-medium-2, 300ms)"),
  /**  Duration for transitions that traverse a medium area of the screen. */
  medium3: unsafeCSS("var(--md-sys-motion-duration-medium-3, 350ms)"),
  /**  Duration for transitions that traverse a medium area of the screen. */
  medium4: unsafeCSS("var(--md-sys-motion-duration-medium-4, 400ms)"),
  /**  Duration for large expressive transitions. */
  long1: unsafeCSS("var(--md-sys-motion-duration-long-1, 450ms)"),
  /**  Duration for large expressive transitions. */
  long2: unsafeCSS("var(--md-sys-motion-duration-long-2, 500ms)"),
  /**  Duration for large expressive transitions. */
  long3: unsafeCSS("var(--md-sys-motion-duration-long-3, 550ms)"),
  /**  Duration for large expressive transitions. */
  long4: unsafeCSS("var(--md-sys-motion-duration-long-4, 600ms)"),
  /**  Extra long duration for ambient transitions. */
  extraLong1: unsafeCSS("var(--md-sys-motion-duration-extra-long-1, 700ms)"),
  /**  Extra long duration for ambient transitions. */
  extraLong2: unsafeCSS("var(--md-sys-motion-duration-extra-long-2, 800ms)"),
  /**  Extra long duration for ambient transitions. */
  extraLong3: unsafeCSS("var(--md-sys-motion-duration-extra-long-3, 900ms)"),
  /**  Extra long duration for ambient transitions. */
  extraLong4: unsafeCSS("var(--md-sys-motion-duration-extra-long-4, 1000ms)")
};
/** Design tokens that control motion. */
const MotionToken = {
  /** Design tokens that control transition effects. */
  easing: EasingToken,
  /** Design tokens that control transition duration. */
  duration: DurationToken,
  /** Design tokens that control spring effects. */
  spring: SpringToken
};

/** Design tokens that control scrollbars. */
const ScrollbarToken = {
  /** Width of a standard scrollbar. */
  width: unsafeCSS(`var(--m3e-scrollbar-width, auto)`),
  /** Width of a thin scrollbar. */
  thinWidth: unsafeCSS(`var(--m3e-scrollbar-thin-width, thin)`),
  /** Color of a scrollbar. */
  color: unsafeCSS(`var(--m3e-scrollbar-thumb-color, #938f94) var(--m3e-scrollbar-track-color, transparent)`)
};

const CornerValue = {
  /** No rounding. */
  none: unsafeCSS("var(--md-sys-shape-corner-value-none, 0)"),
  /** Extra small rounded corner. */
  extraSmall: unsafeCSS("var(--md-sys-shape-corner-value-extra-small, 4px)"),
  /** Small rounded corner. */
  small: unsafeCSS("var(--md-sys-shape-corner-value-small, 8px)"),
  /** Medium rounded corner. */
  medium: unsafeCSS("var(--md-sys-shape-corner-value-medium, 12px)"),
  /** Large rounded corner. */
  large: unsafeCSS("var(--md-sys-shape-corner-value-large, 16px)"),
  /** Increased large rounded corner. */
  largeIncreased: unsafeCSS("var(--md-sys-shape-corner-value-large-increased, 20px)"),
  /** Extra large rounded corner. */
  extraLarge: unsafeCSS("var(--md-sys-shape-corner-value-extra-large, 28px)"),
  /** Increased extra large rounded corner. */
  extraLargeIncreased: unsafeCSS("var(--md-sys-shape-corner-value-extra-large-increased, 32px)"),
  /** Extra extra large rounded corner. */
  extraExtraLarge: unsafeCSS("var(--md-sys-shape-corner-value-extra-extra-large, 48px)")
};
/** Design tokens that control shape. */
const ShapeToken = {
  corner: {
    /** Fully rounded symmetric shape. */
    full: unsafeCSS("var(--md-sys-shape-corner-full, 9999px)"),
    /** Extra large rounded asymmetric shape directed towards the top. */
    extraLargeTop: unsafeCSS(`var(--md-sys-shape-corner-extra-large-top, ${CornerValue.extraLarge} ${CornerValue.extraLarge} ${CornerValue.none} ${CornerValue.none})`),
    /** Extra large rounded symmetric shape. */
    extraLarge: unsafeCSS(`var(--md-sys-shape-corner-extra-large, ${CornerValue.extraLarge})`),
    /** Extra large rounded asymmetric shape directed towards the end. */
    extraLargeEnd: unsafeCSS(`${CornerValue.none} ${CornerValue.extraLarge} ${CornerValue.extraLarge} ${CornerValue.none}`),
    /** Extra large rounded asymmetric shape directed towards the start. */
    extraLargeStart: unsafeCSS(`${CornerValue.extraLarge} ${CornerValue.none} ${CornerValue.none} ${CornerValue.extraLarge}`),
    /** Large rounded asymmetric shape directed towards the top. */
    largeTop: unsafeCSS(`var(--md-sys-shape-corner-large-top, ${CornerValue.large} ${CornerValue.large} ${CornerValue.none} ${CornerValue.none})`),
    /** Large rounded asymmetric shape directed towards the end. */
    largeEnd: unsafeCSS(`var(--md-sys-shape-corner-large-end, ${CornerValue.none} ${CornerValue.large} ${CornerValue.large} ${CornerValue.none})`),
    /** Large rounded asymmetric shape directed towards the start. */
    largeStart: unsafeCSS(`var(--md-sys-shape-corner-large-start, ${CornerValue.large} ${CornerValue.none} ${CornerValue.none} ${CornerValue.large})`),
    /** Large rounded symmetric shape. */
    large: unsafeCSS(`var(--md-sys-shape-corner-large, ${CornerValue.large})`),
    /** Medium rounded symmetric shape. */
    medium: unsafeCSS(`var(--md-sys-shape-corner-medium, ${CornerValue.medium})`),
    /** Medium rounded asymmetric shape directed towards the top. */
    mediumTop: unsafeCSS(`${CornerValue.medium} ${CornerValue.medium} ${CornerValue.none} ${CornerValue.none}`),
    /** Medium rounded asymmetric shape directed towards the end. */
    mediumEnd: unsafeCSS(`${CornerValue.none} ${CornerValue.medium} ${CornerValue.medium} ${CornerValue.none}`),
    /** Medium rounded asymmetric shape directed towards the start. */
    mediumStart: unsafeCSS(`${CornerValue.medium} ${CornerValue.none} ${CornerValue.none} ${CornerValue.medium}`),
    /** Small rounded symmetric shape. */
    small: unsafeCSS(`var(--md-sys-shape-corner-small, ${CornerValue.small})`),
    /** Small rounded asymmetric shape directed towards the top. */
    smallTop: unsafeCSS(`${CornerValue.small} ${CornerValue.small} ${CornerValue.none} ${CornerValue.none}`),
    /** Small rounded asymmetric shape directed towards the end. */
    smallEnd: unsafeCSS(`${CornerValue.none} ${CornerValue.small} ${CornerValue.small} ${CornerValue.none}`),
    /** Small rounded asymmetric shape directed towards the start. */
    smallStart: unsafeCSS(`${CornerValue.small} ${CornerValue.none} ${CornerValue.none} ${CornerValue.small}`),
    /** Extra small rounded asymmetric shape directed towards the top. */
    extraSmallTop: unsafeCSS(`var(--md-sys-shape-corner-extra-small-top, ${CornerValue.extraSmall} ${CornerValue.extraSmall} ${CornerValue.none} ${CornerValue.none})`),
    /** Extra small rounded symmetric shape. */
    extraSmall: unsafeCSS(`var(--md-sys-shape-corner-extra-small, ${CornerValue.extraSmall})`),
    /** Extra small rounded asymmetric shape directed towards the end. */
    extraSmallEnd: unsafeCSS(`${CornerValue.none} ${CornerValue.extraSmall} ${CornerValue.extraSmall} ${CornerValue.none}`),
    /** Extra small rounded asymmetric shape directed towards the start. */
    extraSmallStart: unsafeCSS(`${CornerValue.extraSmall} ${CornerValue.none} ${CornerValue.none} ${CornerValue.extraSmall}`),
    /** Extra small rounded asymmetric shape directed towards the bottom. */
    extraSmallBottom: unsafeCSS(`${CornerValue.none} ${CornerValue.none} ${CornerValue.extraSmall} ${CornerValue.extraSmall}`),
    /** No rounding. */
    none: unsafeCSS(`var(--md-sys-shape-corner-none, ${CornerValue.none})`),
    /** Increased large rounded symmetric shape. */
    largeIncreased: unsafeCSS(`var(--md-sys-shape-corner-large-increased, ${CornerValue.largeIncreased})`),
    /** Increased extra large rounded symmetric shape. */
    extraLargeIncreased: unsafeCSS(`var(--md-sys-shape-corner-extra-large-increased, ${CornerValue.extraLargeIncreased})`),
    /** Extra extra large rounded symmetric shape. */
    extraExtraLarge: unsafeCSS(`var(--md-sys-shape-corner-extra-extra-large, ${CornerValue.extraExtraLarge})`),
    /** Design tokens that control specific corners. */
    value: CornerValue
  }
};

/** Design tokens that control state layer. */
const StateToken = {
  /** Opacity of the state layer on focus. */
  focusStateLayerOpacity: unsafeCSS("var(--md-sys-state-focus-state-layer-opacity, 10%)"),
  /** Opacity of the state layer on hover. */
  hoverStateLayerOpacity: unsafeCSS("var(--md-sys-state-hover-state-layer-opacity, 8%)"),
  /** Opacity of the state layer on pressed. */
  pressedStateLayerOpacity: unsafeCSS("var(--md-sys-state-pressed-state-layer-opacity, 10%)")
};

/** Design tokens that control typescale. */
const TypescaleToken = {
  /** Standard typescale variant. */
  standard: {
    /** Short, important text or numerals. */
    display: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-display-large-font-size, 3.5625rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-display-large-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-display-large-line-height, 4rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-display-large-tracking, 0.015625rem)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-display-medium-font-size, 2.8125rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-display-medium-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-display-medium-line-height, 3.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-display-medium-tracking, 0)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-display-small-font-size, 2.25rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-display-small-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-display-small-line-height, 2.75rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-display-small-tracking, 0)")
      }
    },
    /** Short, high-emphasis text on smaller screens. */
    headline: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-headline-large-font-size, 2rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-headline-large-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-headline-large-line-height, 2.5rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-headline-large-tracking, 0)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-headline-medium-font-size, 1.75rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-headline-medium-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-headline-medium-line-height, 2.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-headline-medium-tracking, 0)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-headline-small-font-size, 1.5rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-headline-small-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-headline-small-line-height, 2rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-headline-small-tracking, 0)")
      }
    },
    /** Medium-emphasis text that remains relatively short. */
    title: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-title-large-font-size, 1.375rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-title-large-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-title-large-line-height, 1.75rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-title-large-tracking, 0)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-title-medium-font-size, 1rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-title-medium-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-title-medium-line-height, 1.5rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-title-medium-tracking, 0.009375rem)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-title-small-font-size, 0.875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-title-small-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-title-small-line-height, 1.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-title-small-tracking, 0.00625rem)")
      }
    },
    /** Longer passages of text. */
    body: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-body-large-font-size, 1rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-body-large-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-body-large-line-height, 1.5rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-body-large-tracking, 0.03125rem)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-body-medium-font-size, 0.875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-body-medium-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-body-medium-line-height, 1.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-body-medium-tracking, 0.015625rem)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-body-small-font-size, 0.75rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-body-small-font-weight, 400)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-body-small-line-height, 1rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-body-small-tracking, 0.025rem)")
      }
    },
    /** Smaller, utilitarian text. */
    label: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-label-large-font-size, 0.875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-label-large-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-label-large-line-height, 1.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-label-large-tracking, 0.00625rem)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-label-medium-font-size, 0.75rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-label-medium-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-label-medium-line-height, 1rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-label-medium-tracking, 0.03125rem)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-label-small-font-size, 0.6875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-label-small-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-label-small-line-height, 1rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-label-small-tracking, 0.03125rem)")
      }
    }
  },
  /** Emphasized typescale variant. */
  emphasized: {
    /** Short, important text or numerals. */
    display: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-display-large-font-size, 3.5625rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-display-large-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-display-large-line-height, 4rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-display-large-tracking, 0.015625rem)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-display-medium-font-size, 2.8125rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-display-medium-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-display-medium-line-height, 3.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-display-medium-tracking, 0)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-display-small-font-size, 2.25rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-display-small-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-display-small-line-height, 2.75rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-display-small-tracking, 0)")
      }
    },
    /** Short, high-emphasis text on smaller screens. */
    headline: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-headline-large-font-size, 2rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-headline-large-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-headline-large-line-height, 2.5rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-headline-large-tracking, 0)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-headline-medium-font-size, 1.75rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-headline-medium-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-headline-medium-line-height, 2.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-headline-medium-tracking, 0)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-headline-small-font-size, 1.5rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-headline-small-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-headline-small-line-height, 2rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-headline-small-tracking, 0)")
      }
    },
    /** Medium-emphasis text that remains relatively short. */
    title: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-title-large-font-size, 1.375rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-title-large-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-title-large-line-height, 1.75rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-title-large-tracking, 0)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-title-medium-font-size, 1rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-title-medium-font-weight, 700)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-title-medium-line-height, 3.5rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-title-medium-tracking, 0.009375rem)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-title-small-font-size, 0.875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-title-small-font-weight, 700)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-title-small-line-height, 1.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-title-small-tracking, 0.00625rem)")
      }
    },
    /** Longer passages of text. */
    body: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-body-large-font-size, 1rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-body-large-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-body-large-line-height, 1.5rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-body-large-tracking, 0.03125rem)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-body-medium-font-size, 0.875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-body-medium-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-body-medium-line-height, 1.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-body-medium-tracking, 0.015625rem)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-body-small-font-size, 0.75rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-body-small-font-weight, 500)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-body-small-line-height, 1rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-body-small-tracking, 0.025rem)")
      }
    },
    /** Smaller, utilitarian text. */
    label: {
      large: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-label-large-font-size, 0.875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-label-large-font-weight, 700)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-label-large-line-height, 1.25rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-label-large-tracking, 0.00625rem)")
      },
      medium: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-label-medium-font-size, 0.75rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-label-medium-font-weight, 700)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-label-medium-line-height, 1rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-label-medium-tracking, 0.03125rem)")
      },
      small: {
        fontSize: unsafeCSS("var(--md-sys-typescale-emphasized-label-small-font-size, 0.6875rem)"),
        fontWeight: unsafeCSS("var(--md-sys-typescale-emphasized-label-small-font-weight, 700)"),
        lineHeight: unsafeCSS("var(--md-sys-typescale-emphasized-label-small-line-height, 1rem)"),
        tracking: unsafeCSS("var(--md-sys-typescale-emphasized-label-small-tracking, 0.03125rem)")
      }
    }
  }
};

/** Design tokens used to style components. */
const DesignToken = {
  /** Design tokens that control color. */
  color: ColorToken,
  /** Design tokens that control elevation. */
  elevation: ElevationToken$1,
  /** Design tokens that control motion. */
  motion: MotionToken,
  /** Design tokens that control shape. */
  shape: ShapeToken,
  /** Design tokens that control state layer. */
  state: StateToken,
  /** Design tokens that control typescale. */
  typescale: TypescaleToken,
  /** Design tokens that control scrollbars. */
  scrollbar: ScrollbarToken,
  /** Design tokens that control density. */
  density: DensityToken,
  /** Design tokens that control measurement. */
  measurement: MeasurementToken
};

/**
 * Determines whether a value is a `DisabledMixin`.
 * @param {unknown} value The value to test.
 * @returns {value is DisabledMixin} Whether `value` is a `DisabledMixin`.
 */
function isDisabledMixin(value) {
  return hasKeys(value, "disabled");
}
/**
 * Mixin to augment an element with behavior that supports a disabled state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {boolean} [reflect=true] Whether the disabled property is reflected as an attribute.
 * @param {boolean} [supportsAria=true] Whether ARIA is supported.
 * @returns {Constructor<DisabledMixin> & T} A constructor that implements `DisabledMixin`.
 */
function Disabled(base, reflect = true, supportsAria = true) {
  class _DisabledMixin extends base {
    constructor() {
      super(...arguments);
      /**
       * Whether the element is disabled.
       * @default false
       */
      this.disabled = false;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("disabled") && supportsAria && this.role && this.role !== "none" && this.role !== "presentation") {
        this.ariaDisabled = this.disabled ? "true" : null;
      }
    }
  }
  __decorate([property({
    type: Boolean,
    reflect: reflect
  })], _DisabledMixin.prototype, "disabled", void 0);
  return _DisabledMixin;
}

/**
 * Determines whether a value is a `HtmlForMixin`.
 * @param {unknown} value The value to test.
 * @returns {value is HtmlForMixin} Whether `value` is a `HtmlForMixin`.
 */
function isHtmlForMixin(value) {
  return hasKeys(value, "htmlFor", "control", "attach", "detach");
}
const _control = Symbol("_control");
const _firstUpdated = Symbol("_firstUpdated");
/**
 * Mixin that creates an attached element associated with an interactive control.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<HtmlForMixin> & T} A constructor extends `base` and implements `HtmlForMixin`.
 */
function HtmlFor(base) {
  var _a;
  class _HtmlForMixin extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = false;
      /** The identifier of the interactive control to which this element is attached. */
      this.htmlFor = null;
    }
    /** The interactive element to which this element is attached. */
    get control() {
      return this[_control]?.deref() ?? null;
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      const control = this[_control]?.deref();
      if (control) {
        this.attach(control);
      }
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      const control = this[_control];
      if (control) {
        this.detach();
        this[_control] = control;
      }
    }
    /** @inheritdoc */
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      this[_firstUpdated] = true;
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if (changedProperties.has("htmlFor")) {
        if (this.htmlFor) {
          const root = this.getRootNode();
          if (root) {
            resolveElementById(this.htmlFor, root).then(control => {
              if (control !== this.control) {
                if (this.control) {
                  this.detach();
                }
                if (control instanceof HTMLElement) {
                  this.attach(control);
                }
              }
            });
          }
        } else if (this.control && this[_firstUpdated]) {
          this.detach();
        }
      }
    }
    /**
     * Attaches the element to an interactive control.
     * @param {HTMLElement} control The element that controls the attachable element.
     */
    attach(control) {
      this[_control] = new WeakRef(control);
    }
    /** Detaches the element from its current interactive control. */
    detach() {
      this[_control] = undefined;
    }
  }
  _a = _firstUpdated;
  __decorate([property({
    attribute: "for"
  })], _HtmlForMixin.prototype, "htmlFor", void 0);
  return _HtmlForMixin;
}

const _wasConnected = Symbol("_wasConnected");
/**
 * Mixin to augment an element with behavior that supports reconnection logic.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<ReconnectedCallbackMixin> & T} A constructor that implements `ReconnectedCallbackMixin`.
 */
function ReconnectedCallback(base) {
  var _a;
  class _ReconnectedCallbackMixin extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = false;
    }
    /** @inheritdoc */
    reconnectedCallback() {}
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      if (this[_wasConnected]) {
        this.reconnectedCallback();
      }
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      this[_wasConnected] = true;
    }
  }
  _a = _wasConnected;
  return _ReconnectedCallbackMixin;
}

/**
 * Mixin to augment an element with an ARIA role.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {ARIARole} role The ARIA role.
 * @returns {Constructor & T} A constructor that implements focusable behavior.
 */
function Role(base, role) {
  class _RoleMixin extends base {
    /** @inheritdoc */
    connectedCallback() {
      this.role = this.role || role;
      super.connectedCallback();
    }
  }
  return _RoleMixin;
}

/** A symbol used to define the function called to resume animation. */
const resumeAnimation = Symbol("resumeAnimation");
/**
 * Mixin to augment an element with behavior that suppresses initial animations.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<SuppressInitialAnimationMixin> & T} A constructor that implements initial animation suppression.
 */
function SuppressInitialAnimation(base) {
  class _SuppressInitialAnimation extends base {
    connectedCallback() {
      super.connectedCallback();
      addCustomState(this, "--no-animate");
      this[resumeAnimation]();
    }
    /** @internal */
    [resumeAnimation]() {
      requestAnimationFrame(() => deleteCustomState(this, "--no-animate"));
    }
  }
  return _SuppressInitialAnimation;
}

var _ActionElementBase_clickHandler;
/**
 * A base implementation for an element, nested within a clickable element, used to
 * perform an action. This class must be inherited.
 */
class ActionElementBase extends LitElement {
  constructor() {
    super(...arguments);
    /** @private */
    _ActionElementBase_clickHandler.set(this, e => {
      if (!e.defaultPrevented) {
        this._onClick(e);
      }
    });
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.parentElement?.addEventListener("click", __classPrivateFieldGet(this, _ActionElementBase_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.parentElement?.removeEventListener("click", __classPrivateFieldGet(this, _ActionElementBase_clickHandler, "f"));
  }
  /** @inheritdoc */
  render() {
    return html`<slot></slot>`;
  }
}
_ActionElementBase_clickHandler = new WeakMap();
/** The styles of the element. */
ActionElementBase.styles = css`:host { display: contents; } ::slotted(.material-icons) { font-size: inherit !important; }`;

/**
 * Determines whether a value is a `CollapsibleOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CollapsibleOrientation`.
 */
function isCollapsibleOrientation(value) {
  return value === "vertical" || value === "horizontal" || value === "both";
}

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
var _M3eCollapsibleElement_instances, _M3eCollapsibleElement_slotChanged, _M3eCollapsibleElement_hasOpened, _M3eCollapsibleElement_applyOrientation, _M3eCollapsibleElement_handleSlotChange, _M3eCollapsibleElement_autoSize, _M3eCollapsibleElement_clearSize, _M3eCollapsibleElement_actualSize, _M3eCollapsibleElement_updateSlideState;
/**
 * A container used to expand and collapse content.
 *
 * @example
 * ```html
 * <m3e-collapsible>
 *  <!-- Collapsible content -->
 * </m3e-collapsible>
 * ```
 *
 * @tag m3e-collapsible
 *
 * @slot - Renders the collapsible content.
 *
 * @attr open - Whether content is visible.
 * @attr orientation - Orientation of collapsible content.
 * @attr no-animate - Whether to disable animation.
 * @attr slide - Whether content slides into view.
 *
 * @fires opening - Dispatched when the collapsible begins to open.
 * @fires opened - Dispatched when the collapsible has opened.
 * @fires closing - Dispatched when the collapsible begins to close.
 * @fires closed - Dispatched when the collapsible has closed.
 *
 * @cssprop --m3e-collapsible-animation - The animation shorthand for expanding and collapsing content.
 * @cssprop --m3e-collapsible-animation-duration - The duration of the expand / collapse animation.
 * @cssprop --m3e-collapsible-animation-function - The timing function of the expand / collapse animation.
 * @cssprop --m3e-collapsible-slide-animation - The animation shorthand for the slide transform when `slide` is enabled.
 */
let M3eCollapsibleElement = class M3eCollapsibleElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    _M3eCollapsibleElement_instances.add(this);
    /** @private */
    _M3eCollapsibleElement_slotChanged.set(this, false);
    /** @private */
    _M3eCollapsibleElement_hasOpened.set(this, false);
    /**
     * Whether content is visible.
     * @default false
     */
    this.open = false;
    /**
     * Orientation of collapsible content.
     * @default "vertical"
     */
    this.orientation = "vertical";
    /**
     * Whether to disable animation.
     * @default false
     */
    this.noAnimate = false;
    /**
     * Whether content slides into view.
     * @default false
     */
    this.slide = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_applyOrientation).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_applyOrientation).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    const noAnimate = this.noAnimate || (changedProperties.has("orientation") || changedProperties.has("slide")) && !changedProperties.has("open");
    addCustomState(this, "--no-animate");
    if (!__classPrivateFieldGet(this, _M3eCollapsibleElement_slotChanged, "f")) {
      if (this.open) {
        __classPrivateFieldSet(this, _M3eCollapsibleElement_hasOpened, true, "f");
        __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_autoSize).call(this);
      }
      __classPrivateFieldSet(this, _M3eCollapsibleElement_slotChanged, true, "f");
      return;
    }
    this.toggleAttribute("inert", !this.open);
    if (this.open) {
      __classPrivateFieldSet(this, _M3eCollapsibleElement_hasOpened, true, "f");
      if (!(noAnimate || prefersReducedMotion())) {
        __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_autoSize).call(this);
        setCustomState(this, "--overflows", this.orientation === "vertical" ? this.clientHeight < this.scrollHeight : this.orientation === "horizontal" ? this.clientWidth < this.scrollWidth : this.clientHeight < this.scrollHeight || this.clientWidth < this.scrollWidth);
        __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_clearSize).call(this);
      }
      deleteCustomState(this, "--closing");
      addCustomState(this, "--opening");
      this.dispatchEvent(new Event("opening"));
      __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_clearSize).call(this);
      deleteCustomState(this, "--no-animate");
      __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_actualSize).call(this);
      if (noAnimate || prefersReducedMotion()) {
        __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_autoSize).call(this);
        deleteCustomState(this, "--opening");
        this.dispatchEvent(new Event("opened"));
      } else {
        this.addEventListener("transitionend", () => {
          if (this.open) {
            __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_autoSize).call(this);
            deleteCustomState(this, "--opening");
            this.dispatchEvent(new Event("opened"));
          }
        }, {
          once: true
        });
      }
    } else {
      deleteCustomState(this, "--opening");
      addCustomState(this, "--closing");
      this.dispatchEvent(new Event("closing"));
      __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_actualSize).call(this);
      if (__classPrivateFieldGet(this, _M3eCollapsibleElement_hasOpened, "f")) {
        deleteCustomState(this, "--no-animate");
      }
      if (noAnimate || prefersReducedMotion()) {
        __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_clearSize).call(this);
        deleteCustomState(this, "--closing");
        this.dispatchEvent(new Event("closed"));
      } else {
        // Commit the explicit size so the collapse transitions from it rather than from `auto`.
        void this.offsetHeight;
        requestAnimationFrame(() => {
          __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_clearSize).call(this);
          this.addEventListener("transitionend", () => {
            if (!this.open) {
              deleteCustomState(this, "--closing");
              this.dispatchEvent(new Event("closed"));
            }
          }, {
            once: true
          });
        });
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_handleSlotChange)}"></slot>`;
  }
};
_M3eCollapsibleElement_slotChanged = new WeakMap();
_M3eCollapsibleElement_hasOpened = new WeakMap();
_M3eCollapsibleElement_instances = new WeakSet();
_M3eCollapsibleElement_applyOrientation = function _M3eCollapsibleElement_applyOrientation() {
  if (!isCollapsibleOrientation(this.orientation)) {
    this.orientation = "horizontal";
  }
  setCustomEnumState(this, this.orientation, "both", "horizontal", "vertical");
};
_M3eCollapsibleElement_handleSlotChange = function _M3eCollapsibleElement_handleSlotChange() {
  __classPrivateFieldSet(this, _M3eCollapsibleElement_slotChanged, true, "f");
  __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_updateSlideState).call(this);
};
_M3eCollapsibleElement_autoSize = function _M3eCollapsibleElement_autoSize() {
  switch (this.orientation) {
    case "vertical":
      this.style.height = "auto";
      break;
    case "horizontal":
      this.style.width = "auto";
      break;
    case "both":
      this.style.height = this.style.width = "auto";
      break;
  }
};
_M3eCollapsibleElement_clearSize = function _M3eCollapsibleElement_clearSize() {
  switch (this.orientation) {
    case "vertical":
      this.style.height = "";
      break;
    case "horizontal":
      this.style.width = "";
      break;
    case "both":
      this.style.height = this.style.width = "";
      break;
  }
};
_M3eCollapsibleElement_actualSize = function _M3eCollapsibleElement_actualSize() {
  switch (this.orientation) {
    case "vertical":
      this.style.height = `${this.scrollHeight}px`;
      break;
    case "horizontal":
      this.style.width = `${this.scrollWidth}px`;
      break;
    case "both":
      this.style.height = `${this.scrollHeight}px`;
      this.style.width = `${this.scrollWidth}px`;
      break;
  }
  __classPrivateFieldGet(this, _M3eCollapsibleElement_instances, "m", _M3eCollapsibleElement_updateSlideState).call(this);
};
_M3eCollapsibleElement_updateSlideState = function _M3eCollapsibleElement_updateSlideState() {
  if (!this.slide) return;
  switch (this.orientation) {
    case "vertical":
      this.style.setProperty("--_collapsible-vertical-offset", `${-this.scrollHeight}px`);
      break;
    case "horizontal":
      this.style.setProperty("--_collapsible-horizontal-offset", `${-this.scrollWidth}px`);
      break;
    case "both":
      this.style.setProperty("--_collapsible-vertical-offset", `${-this.scrollHeight}px`);
      this.style.setProperty("--_collapsible-horizontal-offset", `${-this.scrollWidth}px`);
      break;
  }
};
/** The styles of the element. */
M3eCollapsibleElement.styles = css`:host { display: block; overflow: hidden; --_collapsible-animation: var( --m3e-collapsible-animation, var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1}) var(--m3e-collapsible-animation-function, ${DesignToken.motion.easing.standard}) ); } :host([hidden]) { display: none; } :host(:is(:state(--vertical), :--vertical)) { height: 0px; } :host(:is(:state(--vertical), :--vertical):not([slide])) { transition: ${unsafeCSS(`visibility var(--_collapsible-animation),
        height var(--_collapsible-animation),
        padding-top var(--_collapsible-animation),
        padding-bottom var(--_collapsible-animation)`)}; } :host(:is(:state(--vertical), :--vertical)[slide]) { transition: ${unsafeCSS(`visibility var(--_collapsible-animation),
        height var(--_collapsible-animation),
        transform var(--m3e-collapsible-slide-animation, var(--_collapsible-animation)),
        padding-top var(--_collapsible-animation),
        padding-bottom var(--_collapsible-animation)`)}; } :host(:is(:state(--horizontal), :--horizontal)) { width: 0px; } :host(:is(:state(--horizontal), :--horizontal):not([slide])) { transition: ${unsafeCSS(`visibility var(--_collapsible-animation),
        width var(--_collapsible-animation),
        padding-left var(--_collapsible-animation),
        padding-right var(--_collapsible-animation)`)}; } :host(:is(:state(--horizontal), :--horizontal)[slide]) { transition: ${unsafeCSS(`visibility var(--_collapsible-animation),
        width var(--_collapsible-animation),
        transform var(--m3e-collapsible-slide-animation, var(--_collapsible-animation)),
        padding-left var(--_collapsible-animation),
        padding-right var(--_collapsible-animation)`)}; } :host(:is(:state(--both), :--both)) { height: 0px; width: 0px; } :host(:is(:state(--both), :--both):not([slide])) { transition: ${unsafeCSS(`visibility var(--_collapsible-animation),
        width var(--_collapsible-animation),
        height var(--_collapsible-animation),
        padding var(--_collapsible-animation)`)}; } :host(:is(:state(--both), :--both)[slide]) { transition: ${unsafeCSS(`visibility var(--_collapsible-animation),
        width var(--_collapsible-animation),
        height var(--_collapsible-animation),
        transform var(--m3e-collapsible-slide-animation, var(--_collapsible-animation)),
        padding var(--_collapsible-animation)`)}; } :host(:not(:is(:state(--closing), :--closing)):not([open])) { visibility: hidden; } :host(:is(:state(--vertical), :--vertical):not([open])) { min-height: unset !important; padding-top: 0px !important; padding-bottom: 0px !important; } :host(:is(:state(--horizontal), :--horizontal):not([open])) { min-width: unset !important; padding-left: 0px !important; padding-right: 0px !important; } :host(:is(:state(--both), :--both):not([open])) { min-height: unset !important; min-width: unset !important; padding: 0px !important; } :host([no-animate]), :host(:is(:state(--no-animate), :--no-animate)) { transition-duration: 0ms; } :host(:is(:state(--vertical), :--vertical):is(:state(--opening), :--opening)), :host(:is(:state(--vertical), :--vertical):is(:state(--closing), :--closing)) { overflow-y: hidden !important; } :host(:is(:state(--horizontal), :--horizontal):is(:state(--opening), :--opening)), :host(:is(:state(--horizontal), :--horizontal):is(:state(--closing), :--closing)) { overflow-x: hidden !important; } :host(:is(:state(--both), :--both):is(:state(--opening), :--opening)), :host(:is(:state(--both), :--both):is(:state(--closing), :--closing)) { overflow-y: hidden !important; overflow-x: hidden !important; } :host(:is(:state(--overflows), :--overflows)) { scrollbar-gutter: stable; } :host(:is(:state(--vertical), :--vertical)[slide]:not([open])) { transform: translateY(var(--_collapsible-vertical-offset, 0px)); } :host(:is(:state(--vertical), :--vertical)[slide][open]) { transform: translateY(0px); } :host(:is(:state(--horizontal), :--horizontal)[slide]:not([open])) { transform: translateX(var(--_collapsible-horizontal-offset, 0px)); } :host(:is(:state(--horizontal), :--horizontal)[slide][open]) { transform: translateX(0px); } :host(:is(:state(--both), :--both)[slide]:not([open])) { transform: translateX(var(--_collapsible-horizontal-offset, 0px)) translateY(var(--_collapsible-vertical-offset, 0px)); } :host(:is(:state(--both), :--both)[slide][open]) { transform: translateX(0px) translateY(0px); } ::slotted(*) { --m3e-collapsible-animation: initial; --m3e-collapsible-animation-duration: initial; --m3e-collapsible-animation-function: initial; } @media (prefers-reduced-motion) { :host(:is(:state(--vertical), :--vertical):not([slide])), :host(:is(:state(--vertical), :--vertical)[slide]), :host(:is(:state(--horizontal), :--horizontal):not([slide])), :host(:is(:state(--horizontal), :--horizontal)[slide]), :host(:is(:state(--both), :--both):not([slide])), :host(:is(:state(--both), :--both)[slide]) { transition: none; } }`;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eCollapsibleElement.prototype, "open", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eCollapsibleElement.prototype, "orientation", void 0);
__decorate([property({
  attribute: "no-animate",
  type: Boolean,
  reflect: true
})], M3eCollapsibleElement.prototype, "noAnimate", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eCollapsibleElement.prototype, "slide", void 0);
M3eCollapsibleElement = __decorate([customElement("m3e-collapsible")], M3eCollapsibleElement);

/**
 * Determines whether a value is an `ElevationLevel`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `ElevationLevel`.
 */
function isElevationLevel(value) {
  return value === 0 || value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

/**
 * Component design tokens that control the `M3eElevationElement`.
 * @internal
 */
const ElevationToken = {
  liftDuration: unsafeCSS(`var(--m3e-elevation-lift-duration, ${DesignToken.motion.duration.short4})`),
  liftEasing: unsafeCSS(`var(--m3e-elevation-lift-easing, ${DesignToken.motion.easing.standard})`),
  settleDuration: unsafeCSS(`var(--m3e-elevation-settle-duration, ${DesignToken.motion.duration.short3})`),
  settleEasing: unsafeCSS(`var(--m3e-elevation-settle-easing, ${DesignToken.motion.easing.standardAccelerate})`),
  level: unsafeCSS(`var(--m3e-elevation-level, ${DesignToken.elevation.level0})`),
  hoverLevel: unsafeCSS(`var(--m3e-elevation-hover-level, ${DesignToken.elevation.level0})`),
  focusLevel: unsafeCSS(`var(--m3e-elevation-focus-level, ${DesignToken.elevation.level0})`),
  pressedLevel: unsafeCSS(`var(--m3e-elevation-pressed-level, ${DesignToken.elevation.level0})`)
};

var _M3eElevationElement_instances, _M3eElevationElement_hoverController, _M3eElevationElement_focusController, _M3eElevationElement_pressedController, _M3eElevationElement_handleHoverChange, _M3eElevationElement_handleFocusChange, _M3eElevationElement_handlePressedChange;
/**
 * Visually depicts elevation using a shadow.
 *
 * @description
 * The `m3e-elevation` component is an absolute positioned element used to depict elevation using a shadow.
 * The parenting element must be a relative positioned element and allow for overflow. Use the `level` attribute
 * to specify the elevation level.
 *
 * The component can also be attached to another element using the `for` attribute.  When attached, elevation will
 * be lifted by 1 level on hover. This can be disabled using the `disabled` attribute.
 *
 * Alternatively, use the `attach` and `detach` methods to programmatically attach and detach this element to another.
 *
 * @example
 * The following example illustrates basic markup. Note how the parenting element's position is `relative`. A parenting
 * element's position must be `relative` and overflow must be visible.
 *
 * ```html
 * <div style="position: relative;">
 *  <m3e-elevation level="1"></m3e-elevation>
 * <div>
 * ```
 * @example
 * The following example illustrates attaching elevation to an interactive element. In this example, the parenting div
 * is given an `id` referenced by `m3e-elevation` using the `for` attribute.  Note that `#myDiv` is not used when
 * specifying the attached element's identifier.  The `#` is inferred.
 *
 * ```html
 * <div id="myDiv" style="position: relative;">
 *  <m3e-elevation for="myDiv" level="1"></m3e-elevation>
 * <div>
 * ```
 *
 * @tag m3e-elevation
 *
 * @attr disabled - Whether hover and press events will not trigger changes in elevation, when attached to an interactive element.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr level - The level at which to visually depict elevation.
 *
 * @cssprop --m3e-elevation-color - Color used to depict elevation.
 * @cssprop --m3e-elevation-lift-duration - Duration when lifting.
 * @cssprop --m3e-elevation-lift-easing - Easing curve when lifting.
 * @cssprop --m3e-elevation-settle-duration - Duration when settling.
 * @cssprop --m3e-elevation-settle-easing - Easing curve when settling.
 * @cssprop --m3e-elevation-level - Elevation when resting (box-shadow).
 * @cssprop --m3e-elevation-hover-level - Elevation on hover (box-shadow).
 * @cssprop --m3e-elevation-focus-level - Elevation on focus (box-shadow).
 * @cssprop --m3e-elevation-pressed-level - Elevation on pressed (box-shadow).
 */
let M3eElevationElement = class M3eElevationElement extends HtmlFor(Role(LitElement, "none")) {
  constructor() {
    super(...arguments);
    _M3eElevationElement_instances.add(this);
    /** @private */
    _M3eElevationElement_hoverController.set(this, new HoverController(this, {
      target: null,
      callback: hovering => __classPrivateFieldGet(this, _M3eElevationElement_instances, "m", _M3eElevationElement_handleHoverChange).call(this, hovering)
    }));
    /** @private */
    _M3eElevationElement_focusController.set(this, new FocusController(this, {
      target: null,
      callback: focused => __classPrivateFieldGet(this, _M3eElevationElement_instances, "m", _M3eElevationElement_handleFocusChange).call(this, focused)
    }));
    /** @private */
    _M3eElevationElement_pressedController.set(this, new PressedController(this, {
      target: null,
      callback: pressed => __classPrivateFieldGet(this, _M3eElevationElement_instances, "m", _M3eElevationElement_handlePressedChange).call(this, pressed)
    }));
    /**
     * Whether hover and press events will not trigger changes in elevation, when attached to an interactive element.
     * @default false
     */
    this.disabled = false;
    /**
     * The level at which to visually depict elevation.
     * @default null
     */
    this.level = null;
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eElevationElement_hoverController, "f").observe(control);
    __classPrivateFieldGet(this, _M3eElevationElement_focusController, "f").observe(control);
    __classPrivateFieldGet(this, _M3eElevationElement_pressedController, "f").observe(control);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eElevationElement_hoverController, "f").unobserve(this.control);
      __classPrivateFieldGet(this, _M3eElevationElement_focusController, "f").unobserve(this.control);
      __classPrivateFieldGet(this, _M3eElevationElement_pressedController, "f").unobserve(this.control);
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._shadow?.classList.toggle("hover", false);
    this._shadow?.classList.toggle("focus", false);
    this._shadow?.classList.toggle("pressed", false);
    this._shadow?.classList.toggle("resting", false);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("level") && this.level !== null && !isElevationLevel(this.level)) {
      this.level = null;
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled") && this.disabled) {
      this._shadow?.classList.toggle("hover", false);
      this._shadow?.classList.toggle("focus", false);
      this._shadow?.classList.toggle("pressed", false);
      this._shadow?.classList.toggle("resting", true);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="shadow"></div>`;
  }
};
_M3eElevationElement_hoverController = new WeakMap();
_M3eElevationElement_focusController = new WeakMap();
_M3eElevationElement_pressedController = new WeakMap();
_M3eElevationElement_instances = new WeakSet();
_M3eElevationElement_handleHoverChange = function _M3eElevationElement_handleHoverChange(hovering) {
  if (!this.disabled) {
    this._shadow?.classList.toggle("hover", hovering);
    this._shadow?.classList.toggle("resting", !hovering);
  }
};
_M3eElevationElement_handleFocusChange = function _M3eElevationElement_handleFocusChange(focused) {
  if (!this.disabled) {
    this._shadow?.classList.toggle("focus", focused);
  }
};
_M3eElevationElement_handlePressedChange = function _M3eElevationElement_handlePressedChange(pressed) {
  if (!this.disabled) {
    this._shadow?.classList.toggle("pressed", pressed);
  }
};
/** The styles of the element. */
M3eElevationElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } :host, .shadow { position: absolute; left: 0; top: 0; right: 0; bottom: 0; pointer-events: none; border-radius: inherit; } .shadow.resting, .shadow.focus, .shadow.pressed { will-change: box-shadow; transition: ${unsafeCSS(`box-shadow ${ElevationToken.settleDuration} ${ElevationToken.settleEasing};`)}; } .shadow.hover { will-change: box-shadow; transition: ${unsafeCSS(`box-shadow ${ElevationToken.liftDuration} ${ElevationToken.liftEasing};`)}; } .shadow { box-shadow: ${ElevationToken.level}; } .shadow.focus { box-shadow: ${ElevationToken.focusLevel}; } .shadow.hover { box-shadow: ${ElevationToken.hoverLevel}; } .shadow.pressed { box-shadow: ${ElevationToken.pressedLevel}; } :host([level="0"]) .shadow { --m3e-elevation-level: ${DesignToken.elevation.level0}; --m3e-elevation-hover-level: ${DesignToken.elevation.level1}; } :host([level="1"]) .shadow { --m3e-elevation-level: ${DesignToken.elevation.level1}; --m3e-elevation-hover-level: ${DesignToken.elevation.level2}; } :host([level="2"]) .shadow { --m3e-elevation-level: ${DesignToken.elevation.level2}; --m3e-elevation-hover-level: ${DesignToken.elevation.level3}; } :host([level="3"]) .shadow { --m3e-elevation-level: ${DesignToken.elevation.level3}; --m3e-elevation-hover-level: ${DesignToken.elevation.level4}; } :host([level="4"]) .shadow { --m3e-elevation-level: ${DesignToken.elevation.level4}; --m3e-elevation-hover-level: ${DesignToken.elevation.level5}; } :host([level="5"]) .shadow { --m3e-elevation-level: ${DesignToken.elevation.level5}; --m3e-elevation-hover-level: ${ElevationToken.level}; } :host([level]) .shadow { --m3e-elevation-focus-level: ${ElevationToken.level}; --m3e-elevation-pressed-level: ${ElevationToken.level}; } @media (prefers-reduced-motion) { .shadow.resting, .shadow.pressed, .shadow.focus, .shadow.hover { transition: none; } } @media (forced-colors: active) { .shadow { display: none; } }`;
__decorate([query(".shadow")], M3eElevationElement.prototype, "_shadow", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eElevationElement.prototype, "disabled", void 0);
__decorate([property({
  type: Number,
  reflect: true,
  useDefault: true
})], M3eElevationElement.prototype, "level", void 0);
M3eElevationElement = __decorate([customElement("m3e-elevation")], M3eElevationElement);

/**
 * Component design tokens that control the `M3eFocusRingElement`.
 * @internal
 */
const FocusRingToken = {
  /** The color of the focus ring. */
  color: unsafeCSS(`var(--m3e-focus-ring-color, ${DesignToken.color.secondary})`),
  /** The duration of the focus ring animation. */
  duration: unsafeCSS(`var(--m3e-focus-ring-duration, ${DesignToken.motion.duration.long2})`),
  /** The thickness of the focus ring. */
  thickness: unsafeCSS("var(--m3e-focus-ring-thickness, 3px)"),
  /** Offset of an outward focus ring. */
  outwardOffset: unsafeCSS("var(--m3e-focus-ring-outward-offset, 2px)"),
  /** Offset of an inward focus ring. */
  inwardOffset: unsafeCSS("var(--m3e-focus-ring-inward-offset, 0px)"),
  /** The visibility of the focus ring. */
  visibility: unsafeCSS("var(--m3e-focus-ring-visibility, visible)"),
  /** The factor by which the focus ring grows. */
  growthFactor: unsafeCSS("var(--m3e-focus-ring-growth-factor, 2)")
};

var _M3eFocusRingElement_instances, _M3eFocusRingElement_focusController, _M3eFocusRingElement_handleFocusChange;
/**
 * A focus ring used to depict a strong focus indicator.
 *
 * @description
 * The `m3e-focus-ring` component is an absolute positioned element used to provide a strong focus indicator.
 * The parenting element must be a relative positioned focusable element and allow for overflow.
 *
 * The component can be attached to an interactive element using the `for` attribute or programmatically using the `attach` method.
 * The focus ring is displayed when the interactive element receives visible focus and hidden when focus is lost.
 * This can be disabled using the `disabled` attribute.
 *
 * Alternatively, you can use the `show` and `hide` methods to programmatically control the focus ring.
 *
 * @example
 * The following example illustrates attaching a focus ring to an interactive element. In this example, the parenting div
 * has relative positioning and is given an `id` referenced by `m3e-focus-ring` using the `for` attribute.  Note that `#myDiv`
 * is not used when specifying the attached element's identifier.  The `#` is inferred.
 *
 * ```html
 * <div id="myDiv" tabindex="0" style="position: relative;">
 *  <m3e-focus-ring for="myDiv"></m3e-focus-ring>
 * <div>
 * ```
 *
 * @tag m3e-focus-ring
 *
 * @attr disabled - Whether the focus events will not trigger the focus ring. Focus rings can be still controlled manually by using the `show` and `hide` methods.
 * @attr inward - Whether the focus ring animates inward instead of outward.
 *
 * @cssprop --m3e-focus-ring-color - The color of the focus ring.
 * @cssprop --m3e-focus-ring-duration - The duration of the focus ring animation.
 * @cssprop --m3e-focus-ring-growth-factor - The factor by which the focus ring grows.
 * @cssprop --m3e-focus-ring-thickness - The thickness of the focus ring.
 * @cssprop --m3e-focus-ring-visibility - The visibility of the focus ring.
 * @cssprop --m3e-focus-ring-outward-offset - Offset of an outward focus ring.
 * @cssprop --m3e-focus-ring-inward-offset - Offset of an inward focus ring.
 */
let M3eFocusRingElement = class M3eFocusRingElement extends HtmlFor(Role(LitElement, "none")) {
  constructor() {
    super(...arguments);
    _M3eFocusRingElement_instances.add(this);
    /** @private */
    _M3eFocusRingElement_focusController.set(this, new FocusController(this, {
      target: null,
      callback: (_, focusVisible) => __classPrivateFieldGet(this, _M3eFocusRingElement_instances, "m", _M3eFocusRingElement_handleFocusChange).call(this, focusVisible)
    }));
    /**
     * Whether the focus ring animates inward instead of outward.
     * @default false
     */
    this.inward = false;
    /**
     * Whether the focus events will not trigger the focus ring.
     * Focus rings can be still controlled manually by using the `show` and `hide` methods.
     * @default false
     */
    this.disabled = false;
  }
  /** Launches a manual focus ring. */
  show() {
    this._outline?.classList.toggle("visible", true);
  }
  /** Hides the focus ring. */
  hide() {
    this._outline?.classList.toggle("visible", false);
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eFocusRingElement_focusController, "f").observe(control);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eFocusRingElement_focusController, "f").unobserve(this.control);
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide();
  }
  /** @inheritdoc */
  render() {
    return html`<div class="outline"></div>`;
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled") && this.disabled) {
      this.hide();
    }
  }
};
_M3eFocusRingElement_focusController = new WeakMap();
_M3eFocusRingElement_instances = new WeakSet();
_M3eFocusRingElement_handleFocusChange = function _M3eFocusRingElement_handleFocusChange(focusVisible) {
  if (!this.disabled) {
    if (focusVisible) {
      this.show();
    } else {
      this.hide();
    }
  }
};
/** The styles of the element. */
M3eFocusRingElement.styles = css`:host { display: block; position: absolute; left: 0; top: 0; right: 0; bottom: 0; pointer-events: none; border-radius: inherit; outline: none; } :host([hidden]) { display: none; } .outline { contain: layout style; position: absolute; left: 0; top: 0; right: 0; bottom: 0; pointer-events: none; border-radius: inherit; z-index: 1; outline-color: ${FocusRingToken.color}; outline-width: ${FocusRingToken.thickness}; visibility: ${FocusRingToken.visibility}; } .outline.visible { outline-style: solid; } :host(:not([inward])) .outline { outline-offset: ${FocusRingToken.outwardOffset}; } :host([inward]) .outline { outline-offset: calc(${FocusRingToken.inwardOffset} - ${FocusRingToken.thickness}); } :host(:not([inward])) .outline.visible { animation: grow-shrink ${FocusRingToken.duration}; } :host([inward]) .outline.visible { animation: shrink-grow ${FocusRingToken.duration}; } @keyframes grow-shrink { 50% { outline-width: calc(${FocusRingToken.thickness} * ${FocusRingToken.growthFactor}); } } @keyframes shrink-grow { 50% { outline-offset: calc( ${FocusRingToken.inwardOffset} - calc(${FocusRingToken.thickness} * ${FocusRingToken.growthFactor}) ); outline-width: calc(${FocusRingToken.thickness} * ${FocusRingToken.growthFactor}); } } @media (prefers-reduced-motion) { :host(:not([inward])) .outline.visible, :host([inward]) .outline.visible { animation: none; } } @media (forced-colors: active) { .outline { outline-color: Highlight; } }`;
__decorate([query(".outline")], M3eFocusRingElement.prototype, "_outline", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eFocusRingElement.prototype, "inward", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eFocusRingElement.prototype, "disabled", void 0);
M3eFocusRingElement = __decorate([customElement("m3e-focus-ring")], M3eFocusRingElement);

/**
 * An element which looks like a checkbox.
 *
 * @description
 * The `m3e-pseudo-checkbox` component is a pseudo-checkbox supporting checked, indeterminate, and disabled
 * states. It is customizable via CSS properties for expressive, accessible UI design.
 *
 * @example
 * The following example illustrates how to render a checked pseudo-checkbox.
 * ```html
 * <m3e-pseudo-checkbox checked></m3e-pseudo-checkbox>
 * ```
 *
 * @tag m3e-pseudo-checkbox
 *
 * @attr checked - Whether the element is checked.
 * @attr disabled - Whether the element is disabled.
 * @attr indeterminate - Whether the element's checked state is indeterminate.
 *
 * @cssprop --m3e-checkbox-icon-size - Size of the checkbox icon.
 * @cssprop --m3e-checkbox-container-shape - Border radius of the checkbox container.
 * @cssprop --m3e-checkbox-unselected-outline-thickness - Outline thickness for unselected state.
 * @cssprop --m3e-checkbox-unselected-outline-color - Outline color for unselected state.
 * @cssprop --m3e-checkbox-selected-container-color - Background color for selected state.
 * @cssprop --m3e-checkbox-selected-icon-color - Icon color for selected state.
 * @cssprop --m3e-checkbox-unselected-disabled-outline-color - Outline color for unselected disabled state.
 * @cssprop --m3e-checkbox-unselected-disabled-outline-opacity - Outline opacity for unselected disabled state.
 * @cssprop --m3e-checkbox-selected-disabled-container-color - Background color for selected disabled state.
 * @cssprop --m3e-checkbox-selected-disabled-container-opacity - Background opacity for selected disabled state.
 * @cssprop --m3e-checkbox-selected-disabled-icon-color - Icon color for selected disabled state.
 * @cssprop --m3e-checkbox-selected-disabled-icon-opacity - Icon opacity for selected disabled state.
 */
let M3ePseudoCheckboxElement = class M3ePseudoCheckboxElement extends CheckedIndeterminate(Disabled(Role(LitElement, "none"))) {
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.ariaHidden = "true";
  }
  /** @inheritdoc */
  render() {
    if (this.indeterminate) {
      return html`<svg viewBox="0 -960 960 960" fill="currentColor"><path Required d="M240-440v-80h480v80H240Z"/></svg>`;
    }
    if (this.checked) {
      return html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
    }
    return nothing;
  }
};
/** The styles of the element. */
M3ePseudoCheckboxElement.styles = css`:host { display: inline-block; vertical-align: middle; width: var(--m3e-checkbox-icon-size, 18px); height: var(--m3e-checkbox-icon-size, 18px); border-radius: var(--m3e-checkbox-container-shape, 2px); box-sizing: border-box; flex: none; contain: layout style paint; line-height: 0; } :host([hidden]) { display: none; } :host(:not([checked]):not([indeterminate])) { border-width: var(--m3e-checkbox-unselected-outline-thickness, 2px); border-style: solid; } :host(:not([disabled])[checked]), :host(:not([disabled])[indeterminate]) { background-color: var(--m3e-checkbox-selected-container-color, ${DesignToken.color.primary}); color: var(--m3e-checkbox-selected-icon-color, ${DesignToken.color.onPrimary}); } :host(:not([disabled]):not([checked]):not([indeterminate])) { border-color: var(--m3e-checkbox-unselected-outline-color, ${DesignToken.color.onSurfaceVariant}); } :host([disabled]:not([checked]):not([indeterminate])) { border-color: color-mix( in srgb, var(--m3e-checkbox-unselected-disabled-outline-color, ${DesignToken.color.onSurface}) var(--m3e-checkbox-unselected-disabled-outline-opacity, 38%), transparent ); } :host([disabled][checked]), :host([disabled][indeterminate]) { background-color: color-mix( in srgb, var(--m3e-checkbox-selected-disabled-container-color, ${DesignToken.color.onSurface}) var(--m3e-checkbox-selected-disabled-container-opacity, 38%), transparent ); color: color-mix( in srgb, var(--m3e-checkbox-selected-disabled-icon-color, ${DesignToken.color.surface}) var(--m3e-checkbox-selected-disabled-icon-opacity, 100%), transparent ); } svg { pointer-events: none; } @media (forced-colors: active) { :host(:not([disabled])[checked]), :host(:not([disabled])[indeterminate]) { border-color: Highlight; background-color: Highlight; color: HighlightText; } :host(:not([disabled]):not([checked]):not([indeterminate])) { border-color: CanvasText; background: Canvas; } :host([disabled]:not([checked]):not([indeterminate])) { border-color: GrayText; background-color: Canvas; } :host([disabled][checked]), :host([disabled][indeterminate]) { background-color: GrayText; color: Canvas; } }`;
M3ePseudoCheckboxElement = __decorate([customElement("m3e-pseudo-checkbox")], M3ePseudoCheckboxElement);

/**
 * An element which looks like a radio button.
 *
 * @description
 * The `m3e-pseudo-radio` component is a pseudo-radio supporting checked and disabled
 * states. It is customizable via CSS properties for expressive, accessible UI design.
 *
 * @example
 * The following example illustrates how to render a checked pseudo-radio.
 * ```html
 * <m3e-pseudo-radio checked></m3e-pseudo-radio>
 * ```
 *
 * @tag m3e-pseudo-radio
 *
 * @attr checked - Whether the element is checked.
 * @attr disabled - Whether the element is disabled.
 *
 * @cssprop --m3e-radio-icon-size - Size of the radio icon.
 * @cssprop --m3e-radio-unselected-icon-color - Color of the unselected radio icon.
 * @cssprop --m3e-radio-selected-icon-color - Color of the selected radio icon.
 * @cssprop --m3e-radio-disabled-icon-color - Color of the disabled radio icon.
 */
let M3ePseudoRadioElement = class M3ePseudoRadioElement extends Checked(Disabled(Role(LitElement, "none"))) {
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.ariaHidden = "true";
  }
  /** @inheritdoc */
  render() {
    return html`<svg class="icon" viewBox="0 0 20 20"><mask id="cutout2"><rect width="100%" height="100%" fill="white"></rect><circle cx="10" cy="10" r="8" fill="black"></circle></mask><circle class="outer circle" cx="10" cy="10" r="10" mask="url(#cutout2)"></circle><circle class="inner circle" cx="10" cy="10" r="5"></circle></svg>`;
  }
};
/** The styles of the element. */
M3ePseudoRadioElement.styles = css`:host { display: inline-block; vertical-align: middle; box-sizing: border-box; width: var(--m3e-radio-icon-size, 20px); height: var(--m3e-radio-icon-size, 20px); flex: none; contain: layout style paint; line-height: 0; } :host([hidden]) { display: none; } .circle { fill: currentColor; } :host(:not([checked])) .circle.inner { opacity: 0; } :host(:not([checked])) { color: var(--m3e-radio-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}); } :host([checked]) { color: var(--m3e-radio-selected-icon-color, ${DesignToken.color.primary}); } :host([disabled]) { color: color-mix(in srgb, var(--m3e-radio-disabled-icon-color, ${DesignToken.color.onSurface}) 38%, transparent); } @media (forced-colors: active) { :host { border-radius: 50%; } :host(:not([checked])) { color: CanvasText; background-color: Canvas; } :host([checked]) { color: HighlightText; background-color: Highlight; } :host([disabled]) { color: GrayText; background-color: Canvas; } }`;
M3ePseudoRadioElement = __decorate([customElement("m3e-pseudo-radio")], M3ePseudoRadioElement);

/**
 * Component design tokens that control the `M3eRippleElement`.
 * @internal
 */
const RippleToken = {
  color: unsafeCSS(`var(--m3e-ripple-color, ${DesignToken.color.onSurface})`),
  opacity: unsafeCSS(`var(--m3e-ripple-opacity, ${DesignToken.state.pressedStateLayerOpacity})`),
  enterDuration: unsafeCSS(`var(--m3e-ripple-enter-duration, ${DesignToken.motion.duration.long1})`),
  exitDuration: unsafeCSS(`var(--m3e-ripple-exit-duration, ${DesignToken.motion.duration.medium3})`)
};

var _M3eRippleElement_instances, _M3eRippleElement_ripples, _M3eRippleElement_pressedController, _M3eRippleElement_destroyRipple, _M3eRippleElement_handleAnimationEnd, _M3eRippleElement_handlePressedChange;
/**
 * Connects user input to screen reactions using ripples.
 *
 * @description
 * The `m3e-ripple` component is an absolute positioned element used to depict a ripple.
 * The parenting element must be a relative positioned element.
 *
 * The component can be attached to an interactive element using the `for` attribute or programmatically using the `attach` method.
 * The ripple is displayed when the interactive element is pressed and hidden when released.  This can be disabled using the `disabled` attribute.
 *
 * The pressed state actives either using both pointer and keyboard events. For keyboard events, `SPACE` activate a ripple.
 *
 * Alternatively, you can use the `show` and `hide` methods to programmatically control the ripple.
 *
 * @example
 * The following example illustrates attaching a ripple to an interactive element. In this example, the parenting div
 * has relative positioning and is given an `id` referenced by `m3e-ripple` using the `for` attribute.  Note that `#myDiv`
 * is not used when specifying the attached element's identifier.  The `#` is inferred.
 *
 * ```html
 * <div id="myDiv" tabindex="0" style="position: relative;">
 *  <m3e-ripple for="myDiv"></m3e-ripple>
 * <div>
 * ```
 *
 * @tag m3e-ripple
 *
 * @attr centered - Whether the ripple always originates from the center of the element's bounds, rather than originating from the location of the click event.
 * @attr disabled - Whether click events will not trigger the ripple.  Ripples can be still controlled manually by using the `show` and 'hide' methods.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr radius - The radius, in pixels, of the ripple.
 * @attr unbounded - Whether the ripple is visible outside the element's bounds.
 *
 * @cssprop --m3e-ripple-color - The color of the ripple.
 * @cssprop --m3e-ripple-enter-duration - The duration for the enter animation (expansion from point of contact).
 * @cssprop --m3e-ripple-exit-duration - The duration for the exit animation (fade-out).
 * @cssprop --m3e-ripple-opacity - The opacity of the ripple.
 */
let M3eRippleElement = class M3eRippleElement extends HtmlFor(Role(LitElement, "none")) {
  constructor() {
    super(...arguments);
    _M3eRippleElement_instances.add(this);
    /** @private */
    _M3eRippleElement_ripples.set(this, new Set());
    /** @private */
    _M3eRippleElement_pressedController.set(this, new PressedController(this, {
      target: null,
      minPressedDuration: 0,
      isPressedKey: key => key === " ",
      callback: (pressed, {
        x,
        y
      }) => __classPrivateFieldGet(this, _M3eRippleElement_instances, "m", _M3eRippleElement_handlePressedChange).call(this, pressed, x, y)
    }));
    /**
     * Whether click events will not trigger the ripple.
     * Ripples can be still controlled manually by using the `show` and 'hide' methods.
     * @default false
     */
    this.disabled = false;
    /**
     * Whether the ripple always originates from the center of the element's bounds, rather
     * than originating from the location of the click event.
     * @default false
     */
    this.centered = false;
    /**
     * Whether the ripple is visible outside the element's bounds.
     * @default false
     */
    this.unbounded = false;
    /**
     * The radius, in pixels, of the ripple.
     * @default null
     */
    this.radius = null;
  }
  /** Whether the ripple is currently visible to the user. */
  get visible() {
    return __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f").size > 0;
  }
  /**
   * Launches a manual ripple.
   * @param {number} x The x-coordinate, relative to the viewport, at which to present the ripple.
   * @param {number} y The y-coordinate, relative to the viewport, at which to present the ripple.
   * @param {boolean} [persistent=false] Whether the ripple will persist until hidden.
   */
  show(x, y, persistent = false) {
    const bounds = this.getBoundingClientRect();
    if (this.centered) {
      x = bounds.left + bounds.width / 2;
      y = bounds.top + bounds.height / 2;
    }
    let radius = this.radius;
    if (!radius || isNaN(radius)) {
      const distX = Math.max(Math.abs(x - bounds.left), Math.abs(x - bounds.right));
      const distY = Math.max(Math.abs(y - bounds.top), Math.abs(y - bounds.bottom));
      radius = Math.sqrt(distX * distX + distY * distY);
    }
    const offsetX = x - bounds.left;
    const offsetY = y - bounds.top;
    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    if (persistent) {
      ripple.classList.add("persistent");
    }
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.width = `${radius * 2}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.addEventListener("animationend", () => __classPrivateFieldGet(this, _M3eRippleElement_instances, "m", _M3eRippleElement_handleAnimationEnd).call(this, ripple, persistent), {
      once: true
    });
    ripple.addEventListener("transitionend", e => {
      if (e.propertyName === "opacity") {
        __classPrivateFieldGet(this, _M3eRippleElement_instances, "m", _M3eRippleElement_destroyRipple).call(this, ripple);
      }
    }, {
      once: true
    });
    if (!this.shadowRoot) {
      __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f").delete(ripple);
      return;
    }
    __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f").add(ripple);
    this.shadowRoot.appendChild(ripple);
  }
  /** Manually hides the ripple. */
  hide() {
    for (const ripple of __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f")) {
      ripple.classList.add("exit");
    }
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eRippleElement_pressedController, "f").observe(control);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eRippleElement_pressedController, "f").unobserve(this.control);
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eRippleElement_instances, "m", _M3eRippleElement_destroyRipple).call(this);
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled") && this.disabled) {
      this.hide();
    }
  }
};
_M3eRippleElement_ripples = new WeakMap();
_M3eRippleElement_pressedController = new WeakMap();
_M3eRippleElement_instances = new WeakSet();
_M3eRippleElement_destroyRipple = function _M3eRippleElement_destroyRipple(ripple) {
  if (ripple) {
    ripple.remove();
    __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f").delete(ripple);
  } else {
    for (const r of __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f")) {
      r.remove();
    }
    __classPrivateFieldGet(this, _M3eRippleElement_ripples, "f").clear();
  }
};
_M3eRippleElement_handleAnimationEnd = function _M3eRippleElement_handleAnimationEnd(ripple, persistent) {
  if (persistent) {
    ripple.classList.add("pressed");
  } else {
    ripple.classList.add("exit");
  }
};
_M3eRippleElement_handlePressedChange = function _M3eRippleElement_handlePressedChange(pressed, x, y) {
  if (!this.disabled) {
    if (pressed) {
      this.show(x, y, true);
    } else {
      this.hide();
    }
  }
};
/** The styles of the element. */
M3eRippleElement.styles = css`:host { display: block; position: absolute; left: 0; top: 0; right: 0; bottom: 0; pointer-events: none; border-radius: inherit; } :host([hidden]) { display: none; } :host(:not([unbounded])) { overflow: hidden; } :host(:not([unbounded])) .ripple { contain: layout style paint; } :host([unbounded]) .ripple { contain: layout style; } .ripple { display: block; position: absolute; inset: 0; pointer-events: none; transform: scale(0); opacity: ${RippleToken.opacity}; border-radius: 50%; filter: blur(20px); background-color: ${RippleToken.color}; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short1} ${DesignToken.motion.easing.standard}`)}; will-change: transform, background-color, opacity; animation: ripple ${RippleToken.enterDuration} linear; } .ripple.persistent.pressed { transform: scale(4); } .ripple.exit { transition: ${unsafeCSS(`opacity ${RippleToken.exitDuration} cubic-bezier(0, 0, 0.2, 0.1),
        background-color ${DesignToken.motion.duration.short1} ${DesignToken.motion.easing.standard}`)}; opacity: 0; } @keyframes ripple { to { transform: scale(4); } } @media (prefers-reduced-motion) { .ripple { transform: scale(4); animation-duration: 90ms; } .ripple:not(.exit), .ripple.exit { transition-duration: 10ms; } } @media (forced-colors: active) { .ripple { display: none; } }`;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eRippleElement.prototype, "disabled", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eRippleElement.prototype, "centered", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eRippleElement.prototype, "unbounded", void 0);
__decorate([property({
  type: Number
})], M3eRippleElement.prototype, "radius", void 0);
M3eRippleElement = __decorate([customElement("m3e-ripple")], M3eRippleElement);

/**
 * Determines whether a value is a `ScrollDividers`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ScrollDividers`.
 */
function isScrollDividers(value) {
  return value === "above" || value === "below" || value === "above-below" || value === "none";
}

var _M3eScrollContainerElement_scrollHandler;
/**
 * A vertically oriented content container which presents dividers above and below content when scrolled.
 *
 * @description
 * The `m3e-scroll-container` component provides a vertically oriented scrollable container with dynamic
 * dividers above and below content. Designed according to Material 3 principles, it supports custom scrollbar
 * thickness, divider styling, and focus ring theming via CSS custom properties.
 *
 * @example
 * This example shows a scrollable container with dividers above and below the content, and thin scrollbars enabled.
 * ```html
 * <m3e-scroll-container dividers="above-below" thin>
 *   <div>Scrollable content goes here</div>
 * </m3e-scroll-container>
 * ```
 *
 * @tag m3e-scroll-container
 *
 * @slot - Renders the scrollable content.
 *
 * @attr dividers - The dividers used to separate scrollable content.
 * @attr thin - Whether to present thin scrollbars.
 *
 * @cssprop --m3e-divider-thickness - Thickness of the divider lines above and below content.
 * @cssprop --m3e-divider-color - Color of the divider lines when visible.
 * @cssprop --m3e-focus-ring-color - Color of the focus ring outline.
 * @cssprop --m3e-focus-ring-thickness - Thickness of the focus ring outline.
 * @cssprop --m3e-focus-ring-factor - Animation factor for focus ring thickness.
 * @cssprop --m3e-focus-ring-duration - Duration of the focus ring animation.
 */
let M3eScrollContainerElement = class M3eScrollContainerElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    /** @private */
    _M3eScrollContainerElement_scrollHandler.set(this, () => this._updateScroll());
    /**
     * The dividers used to separate scrollable content.
     * @default "above-below"
     */
    this.dividers = "above-below";
    /**
     * Whether to present thin scrollbars.
     * @default false
     */
    this.thin = false;
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("scroll", __classPrivateFieldGet(this, _M3eScrollContainerElement_scrollHandler, "f"));
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("dividers") && !isScrollDividers(this.dividers)) {
      this.dividers = "above-below";
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("dividers")) {
      this.removeEventListener("scroll", __classPrivateFieldGet(this, _M3eScrollContainerElement_scrollHandler, "f"));
      if (this.dividers !== "none") {
        this.addEventListener("scroll", __classPrivateFieldGet(this, _M3eScrollContainerElement_scrollHandler, "f"), {
          passive: true
        });
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${this._updateScroll}"></slot>`;
  }
  /** @private */
  _updateScroll() {
    const before = (this.dividers === "above" || this.dividers === "above-below") && this.scrollTop > 0;
    const after = (this.dividers === "below" || this.dividers === "above-below") && this.scrollHeight - this.scrollTop - this.clientHeight > 1;
    setCustomState(this, "--above", before);
    setCustomState(this, "--below", after);
  }
};
_M3eScrollContainerElement_scrollHandler = new WeakMap();
/** The styles of the element. */
M3eScrollContainerElement.styles = css`:host { display: block; overflow-y: auto; position: relative; box-sizing: border-box; scrollbar-color: ${DesignToken.scrollbar.color}; border-top: var(--m3e-divider-thickness, 1px) solid transparent; border-bottom: var(--m3e-divider-thickness, 1px) solid transparent; outline-color: ${FocusRingToken.color}; outline-width: ${FocusRingToken.thickness}; outline-offset: ${FocusRingToken.outwardOffset}; } :host([hidden]) { display: none; } :host([thin]) { scrollbar-width: ${DesignToken.scrollbar.thinWidth}; } :host(:not([thin])) { scrollbar-width: ${DesignToken.scrollbar.width}; } :host(:not(:focus-visible):is(:state(--above), :--above)) { border-top-color: var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); } :host(:not(:focus-visible):is(:state(--below), :--below)) { border-bottom-color: var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); } :host(:focus-visible) { outline-style: solid; animation: grow-shrink ${FocusRingToken.duration}; } @keyframes grow-shrink { 50% { outline-width: calc(${FocusRingToken.thickness} * ${FocusRingToken.growthFactor}); } } @media (forced-colors: active) { :host { border-top: var(--m3e-divider-thickness, 1px) solid Canvas; border-bottom: var(--m3e-divider-thickness, 1px) solid Canvas; } :host(:not(:focus-visible):is(:state(--above), :--above)) { border-top-color: GrayText; } :host(:not(:focus-visible):is(:state(--below), :--below)) { border-bottom-color: GrayText; } } @media (prefers-reduced-motion) { :host(:focus-visible) { animation: none; } }`;
__decorate([property()], M3eScrollContainerElement.prototype, "dividers", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eScrollContainerElement.prototype, "thin", void 0);
__decorate([debounce(40)], M3eScrollContainerElement.prototype, "_updateScroll", null);
M3eScrollContainerElement = __decorate([customElement("m3e-scroll-container")], M3eScrollContainerElement);

var _M3eSelectionIndicatorElement_instances, _M3eSelectionIndicatorElement_pressedController, _M3eSelectionIndicatorElement_initStateLayer, _M3eSelectionIndicatorElement_handlePressedChange, _M3eSelectionIndicatorElement_handleAnimationEnd;
/**
 * Provides selection, focus, and hover state layer treatment for an interactive element that supports selection.
 *
 * @description
 * The `m3e-selection-indicator` component is an absolute positioned element used to depict a selected state
 * including hover and focus overlays. The parenting element must be a relative positioned element.
 *
 * This element can be attached to an interactive element using the `for` attribute or programmatically using the `attach` method.
 * The indicator's state layer is displayed when the interactive element is either hovered or focused.  This can be disabled using
 * the `disabled` attribute.  The `selected` attribute controls whether to present a selected state.
 *
 * @tag m3e-selection-indicator
 *
 * @attr bounce - Whether the indicator presents a bounce animation when selected.
 * @attr centered - Whether the selection animation always originates from the center of the element's bounds, rather than originating from the location of the click event.
 * @attr disabled - Whether hover and focus events will not trigger the indicator's state layer. State layers can still be controlled manually using the `show` and `hide` methods.
 * @attr selected - Whether the indicator is selected.
 *
 * @cssprop --m3e-selection-indicator-color - Color of the indicator.
 * @cssprop --m3e-selection-indicator-state-layer-duration - Duration of state layer changes.
 * @cssprop --m3e-selection-indicator-state-layer-easing - Easing curve of state layer changes.
 * @cssprop --m3e-selection-indicator-state-layer-focus-color - Color on focus.
 * @cssprop --m3e-selection-indicator-state-layer-focus-opacity - Opacity on focus.
 * @cssprop --m3e-selection-indicator-state-layer-hover-color - Color on hover.
 * @cssprop --m3e-selection-indicator-state-layer-hover-opacity - Opacity on hover.
 * @cssprop --m3e-selection-indicator-state-layer-pressed-color - Color on pressed.
 * @cssprop --m3e-selection-indicator-state-layer-pressed-opacity - Opacity on pressed.
 */
let M3eSelectionIndicatorElement = class M3eSelectionIndicatorElement extends SuppressInitialAnimation(ReconnectedCallback(HtmlFor(Role(AttachInternals(LitElement), "none")))) {
  constructor() {
    super(...arguments);
    _M3eSelectionIndicatorElement_instances.add(this);
    /** @private */
    _M3eSelectionIndicatorElement_pressedController.set(this, new PressedController(this, {
      target: null,
      isPressedKey: key => key === " ",
      callback: (pressed, point) => __classPrivateFieldGet(this, _M3eSelectionIndicatorElement_instances, "m", _M3eSelectionIndicatorElement_handlePressedChange).call(this, pressed, point)
    }));
    /**
     * Whether hover and focus events will not trigger the indicator's state layer. State layers can still
     * be controlled manually using the `show` and `hide` methods.
     * @default false
     */
    this.disabled = false;
    /**
     * Whether the indicator is selected.
     * @default false
     */
    this.selected = false;
    /**
     * Whether the indicator presents a bounce animation when selected.
     * @default false
     */
    this.bounce = false;
    /**
     * Whether the selection animation always originates from the center of the element's bounds,
     * rather than originating from the location of the click event.
     * @default false
     */
    this.centered = false;
  }
  /**
   * Launches a manual state layer for the indicator.
   * @param {"hover" | "focused" | "pressed"} state The state of the indicator's state layer to show.
   */
  show(state) {
    this._stateLayer?.show(state);
  }
  /**
   * Hides the state layer for the indicator.
   * @param {"hover" | "focused" | "pressed"} state The state of the indicator's state layer to hide.
   */
  hide(state) {
    this._stateLayer?.hide(state);
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eSelectionIndicatorElement_pressedController, "f").observe(control);
    this._stateLayer?.attach(control);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eSelectionIndicatorElement_pressedController, "f").unobserve(this.control);
      this._stateLayer?.detach();
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eSelectionIndicatorElement_instances, "m", _M3eSelectionIndicatorElement_initStateLayer).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eSelectionIndicatorElement_instances, "m", _M3eSelectionIndicatorElement_initStateLayer).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @animationend="${__classPrivateFieldGet(this, _M3eSelectionIndicatorElement_instances, "m", _M3eSelectionIndicatorElement_handleAnimationEnd)}"><div class="indicator"></div><m3e-state-layer class="state-layer" enable-pressed ?disabled="${this.disabled}"></m3e-state-layer></div>`;
  }
};
_M3eSelectionIndicatorElement_pressedController = new WeakMap();
_M3eSelectionIndicatorElement_instances = new WeakSet();
_M3eSelectionIndicatorElement_initStateLayer = function _M3eSelectionIndicatorElement_initStateLayer() {
  const stateLayer = this._stateLayer;
  if (stateLayer && this.control !== stateLayer.control) {
    if (this.control) {
      stateLayer.attach(this.control);
    } else {
      stateLayer.detach();
    }
  }
};
_M3eSelectionIndicatorElement_handlePressedChange = function _M3eSelectionIndicatorElement_handlePressedChange(pressed, point) {
  if (this.disabled || this.selected || this.centered || prefersReducedMotion()) return;
  const base = this._base;
  if (pressed && base) {
    const bounds = base.getBoundingClientRect();
    const x = Math.min(Math.max(point.x - bounds.left, bounds.height), bounds.width - bounds.height);
    base?.style.setProperty("--_pressed-origin-x", `${x}px`);
  }
};
_M3eSelectionIndicatorElement_handleAnimationEnd = function _M3eSelectionIndicatorElement_handleAnimationEnd() {
  this._base?.style.removeProperty("--_pressed-origin-x");
};
/** The styles of the element. */
M3eSelectionIndicatorElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .state-layer { --m3e-state-layer-hover-color: var( --m3e-selection-indicator-state-layer-hover-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-hover-opacity: var( --m3e-selection-indicator-state-layer-hover-opacity, ${DesignToken.state.hoverStateLayerOpacity} ); --m3e-state-layer-focus-color: var( --m3e-selection-indicator-state-layer-focus-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-focus-opacity: var( --m3e-selection-indicator-state-layer-focus-opacity, ${DesignToken.state.focusStateLayerOpacity} ); --m3e-state-layer-pressed-color: var( --m3e-selection-indicator-state-layer-pressed-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-pressed-opacity: var( --m3e-selection-indicator-state-layer-pressed-opacity, ${DesignToken.state.pressedStateLayerOpacity} ); --m3e-state-layer-duration: var( --m3e-selection-indicator-state-layer-duration, ${DesignToken.motion.duration.medium1} ); --m3e-state-layer-easing: var( --m3e-selection-indicator-state-layer-easing, ${DesignToken.motion.easing.standard} ); } :host, .base, .indicator { position: absolute; inset: 0; pointer-events: none; border-radius: inherit; } .indicator { opacity: 0; will-change: opacity; } :host(:not([disabled])) .indicator { background-color: var(--m3e-selection-indicator-color, ${DesignToken.color.secondaryContainer}); } :host(:not(:is(:state(--no-animate), :--no-animate))) .indicator { transition: ${unsafeCSS(`opacity var(--m3e-selection-indicator-state-layer-duration, ${DesignToken.motion.duration.medium1}) var(--m3e-selection-indicator-state-layer-easing, ${DesignToken.motion.easing.standard})`)}; } .base { contain: layout style paint; } :host(:not([centered])) .base { transform-origin: var(--_pressed-origin-x, center) center; } :host([centered]) .base { transform-origin: center center; } :host([selected]:not([bounce]):not(:is(:state(--no-animate), :--no-animate))) .base { animation: grow ${DesignToken.motion.spring.fastEffects}; } :host([selected][bounce]:not(:is(:state(--no-animate), :--no-animate))) .base { animation: grow ${DesignToken.motion.spring.fastSpatial}; } :host([selected]) .indicator { opacity: 1; transition: none; } :host(:not(:is(:state(--no-animate), :--no-animate))) .indicator { transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } @keyframes grow { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))) .indicator { transition: none; } :host([selected]:not([bounce]):not(:is(:state(--no-animate), :--no-animate))) .base, :host([selected][bounce]:not(:is(:state(--no-animate), :--no-animate))) .base { animation: none; } }`;
__decorate([query(".base")], M3eSelectionIndicatorElement.prototype, "_base", void 0);
__decorate([query(".state-layer")], M3eSelectionIndicatorElement.prototype, "_stateLayer", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSelectionIndicatorElement.prototype, "disabled", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSelectionIndicatorElement.prototype, "selected", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSelectionIndicatorElement.prototype, "bounce", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSelectionIndicatorElement.prototype, "centered", void 0);
M3eSelectionIndicatorElement = __decorate([customElement("m3e-selection-indicator")], M3eSelectionIndicatorElement);

var _M3eSlideElement_instances, _M3eSlideElement_items, _M3eSlideElement_handleSlotChange, _M3eSlideElement_updateItems;
/**
 * A carousel-like container used to horizontally cycle through slotted items.
 *
 * @example
 * The following example illustrates the use of `m3e-slide` to cycle through content.
 * In this example, `selected-index` is set to `1` so that "Content at index 1" is presented
 * by the component.
 * ```html
 * <m3e-slide selected-index="1">
 *  <div>Content at index 0</div>
 *  <div>Content at index 1</div>
 *  <div>Content at index 2</div>
 *  <div>Content at index 3</div>
 * </m3e-slide>
 * ```
 *
 * @tag m3e-slide
 *
 * @slot - Renders the items through which to cycle.
 *
 * @attr selected-index - The zero-based index of the visible item.
 *
 * @cssprop --m3e-slide-animation-duration - The duration of transitions between slotted items.
 */
let M3eSlideElement = class M3eSlideElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    _M3eSlideElement_instances.add(this);
    /** @private */
    _M3eSlideElement_items.set(this, new Array());
    /**
     * The zero-based index of the visible item.
     * @default null
     */
    this.selectedIndex = null;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    addCustomState(this, "--no-animate");
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selectedIndex")) {
      if (this.selectedIndex === null) {
        addCustomState(this, "--no-animate");
      }
      __classPrivateFieldGet(this, _M3eSlideElement_instances, "m", _M3eSlideElement_updateItems).call(this);
      if (this.selectedIndex !== null && hasCustomState(this, "--no-animate")) {
        requestAnimationFrame(() => {
          if (this.selectedIndex !== null) {
            deleteCustomState(this, "--no-animate");
          }
        });
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eSlideElement_instances, "m", _M3eSlideElement_handleSlotChange)}"></slot>`;
  }
};
_M3eSlideElement_items = new WeakMap();
_M3eSlideElement_instances = new WeakSet();
_M3eSlideElement_handleSlotChange = function _M3eSlideElement_handleSlotChange(e) {
  const items = [...e.target.assignedElements({
    flatten: true
  })];
  for (const removed of __classPrivateFieldGet(this, _M3eSlideElement_items, "f").filter(x => !items.includes(x))) {
    removed.classList.remove("-before");
    removed.classList.remove("-after");
    removed.removeAttribute("inert");
  }
  __classPrivateFieldSet(this, _M3eSlideElement_items, items, "f");
  __classPrivateFieldGet(this, _M3eSlideElement_instances, "m", _M3eSlideElement_updateItems).call(this);
};
_M3eSlideElement_updateItems = function _M3eSlideElement_updateItems() {
  const selectedIndex = this.selectedIndex ?? __classPrivateFieldGet(this, _M3eSlideElement_items, "f").length;
  for (let i = 0; i < __classPrivateFieldGet(this, _M3eSlideElement_items, "f").length; i++) {
    const item = __classPrivateFieldGet(this, _M3eSlideElement_items, "f")[i];
    item.classList.toggle("-before", i < selectedIndex);
    item.classList.toggle("-after", i > selectedIndex);
    item.toggleAttribute("inert", i !== selectedIndex);
  }
};
/** The styles of the element. */
M3eSlideElement.styles = css`:host { display: flex; position: relative; overflow: hidden; } :host([hidden]) { display: none; } ::slotted(*) { width: 100%; top: 0; transition: ${unsafeCSS(`inset-inline-start var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard},
        visibility var(--m3e-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard} allow-discrete`)}; } ::slotted(.-before), ::slotted(.-after) { visibility: hidden; position: absolute; } ::slotted(.-before) { inset-inline-start: -100%; } ::slotted(.-after) { inset-inline-start: 100%; } ::slotted(:not(.-before):not(.-after)) { position: relative; inset-inline-start: 0; } :host(:is(:state(--no-animate), :--no-animate)) ::slotted(*) { transition: none; } @media (prefers-reduced-motion) { ::slotted(*) { transition: none; } }`;
__decorate([property({
  attribute: "selected-index",
  type: Number,
  reflect: true
})], M3eSlideElement.prototype, "selectedIndex", void 0);
M3eSlideElement = __decorate([customElement("m3e-slide")], M3eSlideElement);

/**
 * Component design tokens that control the `M3eStateLayerElement`.
 * @internal
 */
const StateLayerToken = {
  hoverColor: unsafeCSS(`var(--m3e-state-layer-hover-color, ${DesignToken.color.onSurface})`),
  hoverOpacity: unsafeCSS(`var(--m3e-state-layer-hover-opacity, ${DesignToken.state.hoverStateLayerOpacity})`),
  focusColor: unsafeCSS(`var(--m3e-state-layer-focus-color, ${DesignToken.color.onSurface})`),
  focusOpacity: unsafeCSS(`var(--m3e-state-layer-focus-opacity, ${DesignToken.state.focusStateLayerOpacity})`),
  pressedColor: unsafeCSS(`var(--m3e-state-layer-pressed-color, ${DesignToken.color.onSurface})`),
  pressedOpacity: unsafeCSS(`var(--m3e-state-layer-pressed-opacity, ${DesignToken.state.pressedStateLayerOpacity})`),
  duration: unsafeCSS(`var(--m3e-state-layer-duration, ${DesignToken.motion.duration.medium1})`),
  easing: unsafeCSS(`var(--m3e-state-layer-easing, ${DesignToken.motion.easing.standard})`)
};

var _M3eStateLayerElement_instances, _M3eStateLayerElement_hoverController, _M3eStateLayerElement_focusController, _M3eStateLayerElement_pressedController, _M3eStateLayerElement_handleHoverChange, _M3eStateLayerElement_handleFocusChange, _M3eStateLayerElement_handlePressedChange, _M3eStateLayerElement_updateHoverController, _M3eStateLayerElement_updatePressedController;
/**
 * Provides focus and hover state layer treatment for an interactive element.
 *
 * @description
 * The `m3e-state-layer` component is an absolute positioned element used to depict hover and focus overlays.
 * The parenting element must be a relative positioned element.
 *
 * This element can be attached to an interactive element using the `for` attribute or programmatically using the `attach` method.
 * The state layer is displayed when the interactive element is either hovered or focused.  This can be disabled using
 * the `disabled` attribute.
 *
 * @example
 * The following example illustrates attaching a state layer to an interactive element. In this example, the parenting div
 * has relative positioning and is given an `id` referenced by `m3e-state-layer` using the `for` attribute.  Note that `#myDiv`
 * is not used when specifying the attached element's identifier.  The `#` is inferred.
 *
 * ```html
 * <div id="myDiv" tabindex="0" style="position: relative;">
 *  <m3e-state-layer for="myDiv"></m3e-state-layer>
 * <div>
 * ```
 *
 * @tag m3e-state-layer
 *
 * @attr disabled - Whether hover and focus events will not trigger the state layer. State layers can still be controlled manually using the `show` and `hide` methods.
 * @attr disable-hover - Whether hover events will not trigger the state layer. State layers can still be controlled manually using the `show` and `hide` methods.
 * @attr enable-pressed - Whether pressed events will trigger the state layer. State layers can still be controlled manually using the `show` and `hide` methods.
 *
 * @cssprop --m3e-state-layer-duration - Duration of state layer changes.
 * @cssprop --m3e-state-layer-easing - Easing curve of state layer changes.
 * @cssprop --m3e-state-layer-focus-color - Color on focus.
 * @cssprop --m3e-state-layer-focus-opacity - Opacity on focus.
 * @cssprop --m3e-state-layer-hover-color - Color on hover.
 * @cssprop --m3e-state-layer-hover-opacity - Opacity on hover.
 * @cssprop --m3e-state-layer-pressed-color - Color on pressed.
 * @cssprop --m3e-state-layer-pressed-opacity - Opacity on pressed.
 */
let M3eStateLayerElement = class M3eStateLayerElement extends HtmlFor(Role(LitElement, "none")) {
  constructor() {
    super(...arguments);
    _M3eStateLayerElement_instances.add(this);
    /** @private */
    _M3eStateLayerElement_hoverController.set(this, new HoverController(this, {
      target: null,
      callback: hovering => __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_handleHoverChange).call(this, hovering)
    }));
    /** @private */
    _M3eStateLayerElement_focusController.set(this, new FocusController(this, {
      target: null,
      callback: (_, focusVisible) => __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_handleFocusChange).call(this, focusVisible)
    }));
    /** @private */
    _M3eStateLayerElement_pressedController.set(this, new PressedController(this, {
      target: null,
      capture: true,
      minPressedDuration: 225,
      isPressedKey: key => key === " ",
      callback: pressed => __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_handlePressedChange).call(this, pressed)
    }));
    /**
     * Whether hover and focus events will not trigger the state layer. State layers can still
     * be controlled manually using the `show` and `hide` methods.
     * @default false
     */
    this.disabled = false;
    /**
     * Whether hover events will not trigger the state layer. State layers can still
     * be controlled manually using the `show` and `hide` methods.
     * @default false
     */
    this.disableHover = false;
    /**
     * Whether pressed events will trigger the state layer. State layers can still
     * be controlled manually using the `show` and `hide` methods.
     * @default false
     */
    this.enablePressed = false;
  }
  /**
   * Launches a manual state layer.
   * @param {"hover" | "focused" | "pressed"} state The state of the layer to show.
   */
  show(state) {
    this._layer?.classList.toggle(state, true);
  }
  /**
   * Hides the state layer.
   * @param {"hover" | "focused" | "pressed"} state The state of the layer to hide.
   */
  hide(state) {
    this._layer?.classList.toggle(state, false);
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eStateLayerElement_focusController, "f").observe(control);
    __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_updateHoverController).call(this);
    __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_updatePressedController).call(this);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eStateLayerElement_hoverController, "f").unobserve(this.control);
      __classPrivateFieldGet(this, _M3eStateLayerElement_focusController, "f").unobserve(this.control);
      __classPrivateFieldGet(this, _M3eStateLayerElement_pressedController, "f").unobserve(this.control);
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.hide("hover");
    this.hide("focused");
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled") && this.disabled) {
      this.hide("hover");
      this.hide("focused");
    }
    if (_changedProperties.has("disableHover") && this.disableHover) {
      __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_updateHoverController).call(this);
      this.hide("hover");
    }
    if (_changedProperties.has("enablePressed") && !this.enablePressed) {
      __classPrivateFieldGet(this, _M3eStateLayerElement_instances, "m", _M3eStateLayerElement_updatePressedController).call(this);
      this.hide("pressed");
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="layer"></div>`;
  }
};
_M3eStateLayerElement_hoverController = new WeakMap();
_M3eStateLayerElement_focusController = new WeakMap();
_M3eStateLayerElement_pressedController = new WeakMap();
_M3eStateLayerElement_instances = new WeakSet();
_M3eStateLayerElement_handleHoverChange = function _M3eStateLayerElement_handleHoverChange(hovering) {
  if (!this.disabled && !this.disableHover) {
    if (hovering) {
      this.show("hover");
    } else {
      this.hide("hover");
    }
  }
};
_M3eStateLayerElement_handleFocusChange = function _M3eStateLayerElement_handleFocusChange(focusVisible) {
  if (!this.disabled) {
    if (focusVisible) {
      this.show("focused");
    } else {
      this.hide("focused");
    }
  }
};
_M3eStateLayerElement_handlePressedChange = function _M3eStateLayerElement_handlePressedChange(pressed) {
  if (!this.disabled && this.enablePressed) {
    if (pressed) {
      this.show("pressed");
    } else {
      this.hide("pressed");
    }
  }
};
_M3eStateLayerElement_updateHoverController = function _M3eStateLayerElement_updateHoverController() {
  if (!this.control) return;
  if (this.disableHover) {
    __classPrivateFieldGet(this, _M3eStateLayerElement_hoverController, "f").unobserve(this.control);
  } else {
    __classPrivateFieldGet(this, _M3eStateLayerElement_hoverController, "f").observe(this.control);
  }
};
_M3eStateLayerElement_updatePressedController = function _M3eStateLayerElement_updatePressedController() {
  if (!this.control) return;
  if (this.enablePressed) {
    __classPrivateFieldGet(this, _M3eStateLayerElement_pressedController, "f").observe(this.control);
  } else {
    __classPrivateFieldGet(this, _M3eStateLayerElement_pressedController, "f").unobserve(this.control);
  }
};
/** The styles of the element. */
M3eStateLayerElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } :host, .layer { position: absolute; left: 0; top: 0; right: 0; bottom: 0; pointer-events: none; border-radius: inherit; } .layer { contain: layout style paint; will-change: background-color; transition: ${unsafeCSS(`background-color ${StateLayerToken.duration} ${StateLayerToken.easing}`)}; } .layer.focused { background-color: color-mix(in srgb, ${StateLayerToken.focusColor} ${StateLayerToken.focusOpacity}, transparent); } .layer.hover { background-color: color-mix(in srgb, ${StateLayerToken.hoverColor} ${StateLayerToken.hoverOpacity}, transparent); } .layer.pressed { background-color: color-mix( in srgb, ${StateLayerToken.pressedColor} ${StateLayerToken.pressedOpacity}, transparent ); } @media (prefers-reduced-motion) { .layer { transition: none; } } @media (forced-colors: active) { .layer { display: none; } }`;
__decorate([query(".layer")], M3eStateLayerElement.prototype, "_layer", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eStateLayerElement.prototype, "disabled", void 0);
__decorate([property({
  attribute: "disable-hover",
  type: Boolean,
  reflect: true
})], M3eStateLayerElement.prototype, "disableHover", void 0);
__decorate([property({
  attribute: "enable-pressed",
  type: Boolean,
  reflect: true
})], M3eStateLayerElement.prototype, "enablePressed", void 0);
M3eStateLayerElement = __decorate([customElement("m3e-state-layer")], M3eStateLayerElement);

var _M3eTextHighlightElement_instances, _M3eTextHighlightElement_id, _M3eTextHighlightElement_ranges, _M3eTextHighlightElement_styles, _M3eTextHighlightElement_isTextNode, _M3eTextHighlightElement_findTextNodes, _M3eTextHighlightElement_highlight;
var M3eTextHighlightElement_1;
/**
 * Highlights text which matches a given search term.
 *
 * @description
 * Highlights all text ranges in slotted content that match a given search term using the CSS Custom Highlight API.
 *
 * @example
 * The following example illustrates highlighting "Lor".
 * ```html
 * <m3e-text-highlight term="Lor">
 *  <p>
 *    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
 *    ut labore et dolore magna aliqua.
 *  </p>
 * </m3e-text-highlight>
 * ```
 *
 * @tag m3e-text-highlight
 *
 * @slot - Renders the content to highlight.
 *
 * @attr case-sensitive - Whether matching is case sensitive.
 * @attr disabled - Whether text highlighting is disabled.
 * @attr mode - The mode in which to highlight text.
 * @attr term - The term to highlight.
 *
 * @fires highlight - Dispatched when content is highlighted.
 *
 * @cssprop --m3e-text-highlight-container-color - Background color applied to highlighted text ranges.
 * @cssprop --m3e-text-highlight-color - Foreground color of highlighted text content.
 * @cssprop --m3e-text-highlight-decoration - Optional text decoration (e.g., underline, line-through) for highlighted text.
 * @cssprop --m3e-text-highlight-shadow - Optional text shadow for emphasis or contrast.
 */
let M3eTextHighlightElement = M3eTextHighlightElement_1 = class M3eTextHighlightElement extends LitElement {
  constructor() {
    super();
    _M3eTextHighlightElement_instances.add(this);
    /** @private */
    _M3eTextHighlightElement_id.set(this, `m3e-text-highlight-${M3eTextHighlightElement_1.__nextId++}`);
    /** @private */
    _M3eTextHighlightElement_ranges.set(this, new Array());
    /** @private */
    _M3eTextHighlightElement_styles.set(this, null);
    /**
     * Whether text highlighting is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * The term to highlight.
     * @default ""
     */
    this.term = "";
    /**
     * Whether matching is case sensitive.
     * @default false
     */
    this.caseSensitive = false;
    /**
     * The mode in which to highlight text.
     * @default "contains"
     */
    this.mode = "contains";
    if (this.isSupported) {
      __classPrivateFieldSet(this, _M3eTextHighlightElement_styles, new CSSStyleSheet(), "f");
      __classPrivateFieldGet(this, _M3eTextHighlightElement_styles, "f").replaceSync(css`::highlight(${unsafeCSS(__classPrivateFieldGet(this, _M3eTextHighlightElement_id, "f"))}) { background-color: var(--m3e-text-highlight-container-color, Highlight); color: var(--m3e-text-highlight-color, HighlightText); text-decoration: var(--m3e-text-highlight-decoration); text-shadow: var(--m3e-text-highlight-shadow); }`.toString());
    }
  }
  /** Whether text highlighting is supported by the browser. */
  get isSupported() {
    return !isServer && CSS.highlights ? true : false;
  }
  /** The ranges that match the current term. */
  get ranges() {
    return __classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f");
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (this.shadowRoot && __classPrivateFieldGet(this, _M3eTextHighlightElement_styles, "f") && !this.shadowRoot.adoptedStyleSheets.includes(__classPrivateFieldGet(this, _M3eTextHighlightElement_styles, "f"))) {
      this.shadowRoot.adoptedStyleSheets.push(__classPrivateFieldGet(this, _M3eTextHighlightElement_styles, "f"));
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("term") || _changedProperties.has("caseSensitive") || _changedProperties.has("disabled")) {
      __classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_highlight).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_highlight)}"></slot>`;
  }
};
_M3eTextHighlightElement_id = new WeakMap();
_M3eTextHighlightElement_ranges = new WeakMap();
_M3eTextHighlightElement_styles = new WeakMap();
_M3eTextHighlightElement_instances = new WeakSet();
_M3eTextHighlightElement_isTextNode = function _M3eTextHighlightElement_isTextNode(node) {
  return !/^\s*$/.test(node.data);
};
_M3eTextHighlightElement_findTextNodes = function _M3eTextHighlightElement_findTextNodes(parent, nodes) {
  if (parent instanceof HTMLSlotElement) {
    parent.assignedNodes({
      flatten: true
    }).forEach(x => {
      switch (x.nodeType) {
        case Node.TEXT_NODE:
          if (__classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_isTextNode).call(this, x)) {
            nodes.push(x);
          }
          break;
        case Node.ELEMENT_NODE:
          __classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_findTextNodes).call(this, x, nodes);
          break;
      }
    });
  } else {
    parent.childNodes.forEach(x => {
      switch (x.nodeType) {
        case Node.TEXT_NODE:
          if (__classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_isTextNode).call(this, x)) {
            nodes.push(x);
          }
          break;
        case Node.ELEMENT_NODE:
          __classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_findTextNodes).call(this, x, nodes);
          break;
      }
    });
  }
};
_M3eTextHighlightElement_highlight = function _M3eTextHighlightElement_highlight() {
  if (!this.isSupported || !this.isConnected) return;
  CSS.highlights.delete(__classPrivateFieldGet(this, _M3eTextHighlightElement_id, "f"));
  __classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f").length = 0;
  if (this.disabled) return;
  if (!this.term) {
    this.dispatchEvent(new CustomEvent("highlight", {
      detail: [...__classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f")],
      bubbles: false,
      composed: false
    }));
    return;
  }
  const texts = new Array();
  __classPrivateFieldGet(this, _M3eTextHighlightElement_instances, "m", _M3eTextHighlightElement_findTextNodes).call(this, this, texts);
  if (texts.length > 0) {
    const term = !this.caseSensitive ? this.term.toLowerCase() : this.term;
    switch (this.mode) {
      case "starts-with":
        {
          const first = texts[0];
          const text = (this.caseSensitive ? first.textContent : first.textContent?.toLowerCase()) ?? "";
          if (text.startsWith(term)) {
            const range = new Range();
            range.setStart(first, 0);
            range.setEnd(first, term.length);
            __classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f").push(range);
          }
        }
        break;
      case "ends-with":
        {
          const last = texts[texts.length - 1];
          const text = (this.caseSensitive ? last.textContent : last.textContent?.toLowerCase()) ?? "";
          if (text.endsWith(term)) {
            const start = text.length - term.length;
            const end = start + term.length;
            const range = new Range();
            range.setStart(last, start);
            range.setEnd(last, end);
            __classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f").push(range);
          }
        }
        break;
      case "contains":
        __classPrivateFieldSet(this, _M3eTextHighlightElement_ranges, texts.map(x => {
          return {
            el: x,
            text: (!this.caseSensitive ? x.textContent?.toLowerCase() : x.textContent) ?? ""
          };
        }).map(({
          el,
          text
        }) => {
          const indices = new Array();
          let startPos = 0;
          while (startPos < text.length) {
            const index = text.indexOf(term, startPos);
            if (index === -1) break;
            indices.push(index);
            startPos = index + term.length;
          }
          return indices.map(index => {
            const range = new Range();
            range.setStart(el, index);
            range.setEnd(el, index + term.length);
            return range;
          });
        }).flat(), "f");
        break;
    }
    if (__classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f").length > 0) {
      CSS.highlights.set(__classPrivateFieldGet(this, _M3eTextHighlightElement_id, "f"), new Highlight(...__classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f")));
    }
  }
  this.dispatchEvent(new CustomEvent("highlight", {
    detail: [...__classPrivateFieldGet(this, _M3eTextHighlightElement_ranges, "f")],
    bubbles: false,
    composed: false
  }));
};
/** The styles of the element. */
M3eTextHighlightElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; }`;
/** @private */
M3eTextHighlightElement.__nextId = 0;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTextHighlightElement.prototype, "disabled", void 0);
__decorate([property()], M3eTextHighlightElement.prototype, "term", void 0);
__decorate([property({
  attribute: "case-sensitive",
  type: Boolean
})], M3eTextHighlightElement.prototype, "caseSensitive", void 0);
__decorate([property()], M3eTextHighlightElement.prototype, "mode", void 0);
M3eTextHighlightElement = M3eTextHighlightElement_1 = __decorate([customElement("m3e-text-highlight")], M3eTextHighlightElement);

/**
 * An inline container which presents an ellipsis when content overflows.
 *
 * @description
 * The `m3e-text-overflow` component truncates inline content with an ellipsis when it
 * exceeds the available width. It's intended for use inside flex or otherwise
 * constrained containers to preserve layout while providing predictable, single-line
 * truncation behavior for long text.
 *
 * @example
 * A typical usage inside a flex container where the heading and trailing actions are
 * constrained, allowing the center text to truncate with an ellipsis.
 *
 * ```html
 * <div style="display:flex;align-items:center;gap:12px;">
 *   <m3e-icon name="menu"></m3e-icon>
 *   <m3e-text-overflow>Very long title or breadcrumb that should truncate gracefully</m3e-text-overflow>
 *   <m3e-icon name="more_vert"></m3e-icon>
 * </div>
 * ```
 *
 * @tag m3e-text-overflow
 *
 * @slot - Renders the content to truncate with an ellipsis.
 */
let M3eTextOverflowElement = class M3eTextOverflowElement extends LitElement {
  /** @inheritdoc */
  render() {
    return html`<span class="base"><slot></slot></span>`;
  }
};
/** The styles of the element. */
M3eTextOverflowElement.styles = css`:host { flex: 1 1 auto; display: inline-flex; align-items: center; flex-wrap: nowrap; min-width: 0; } :host([hidden]) { display: none; } .base { flex: 1 1 auto; display: inline; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`;
M3eTextOverflowElement = __decorate([customElement("m3e-text-overflow")], M3eTextOverflowElement);

export { ActionElementBase, AnimationLoopController, AttachInternals, Checked, CheckedIndeterminate, ClickOutsideController, DesignToken, Disabled, FocusController, HoverController, HtmlFor, InertController, IntersectionController, M3eCollapsibleElement, M3eElevationElement, M3eFocusRingElement, M3ePseudoCheckboxElement, M3ePseudoRadioElement, M3eRippleElement, M3eScrollContainerElement, M3eSelectionIndicatorElement, M3eSlideElement, M3eStateLayerElement, M3eTextHighlightElement, M3eTextOverflowElement, MutationController, PressedController, ReconnectedCallback, ResizeController, Role, ScrollController, ScrollLockController, SuppressInitialAnimation, addCustomState, customElement, debounce, deleteCustomState, forcedColorsActive, hasCustomState, hasKeys, internals, isAttachInternalsMixin, isCheckedIndeterminateMixin, isCheckedMixin, isCollapsibleOrientation, isDisabledMixin, isElevationLevel, isHtmlForMixin, isScrollDividers, prefersReducedMotion, resolveElementById, resumeAnimation, safeStyleMap, setCustomEnumState, setCustomState };
//# sourceMappingURL=TextOverflowElement.js.map
