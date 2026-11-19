/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { isDisabledMixin } from './TextOverflowElement.js';
import { isDisabledInteractiveMixin } from './DisabledInteractive.js';

/**
 * Mixin to augment an element with behavior emits a click event on keyboard events.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {boolean} [allowEnter=true] Whether the `ENTER` key emits a click event.
 * @returns {T} A class that extends `base` with keyboard click behavior.
 */
function KeyboardClick(base, allowEnter = true) {
  var __KeyboardClickMixin_instances, __KeyboardClickMixin_keyPressed, __KeyboardClickMixin_keyDownHandler, __KeyboardClickMixin_keyUpHandler, __KeyboardClickMixin_focusOutHandler, __KeyboardClickMixin_handleKeyDown, __KeyboardClickMixin_handleKeyUp;
  class _KeyboardClickMixin extends base {
    constructor() {
      super(...arguments);
      __KeyboardClickMixin_instances.add(this);
      /** @private */
      __KeyboardClickMixin_keyPressed.set(this, false);
      /** @private */
      __KeyboardClickMixin_keyDownHandler.set(this, e => __classPrivateFieldGet(this, __KeyboardClickMixin_instances, "m", __KeyboardClickMixin_handleKeyDown).call(this, e));
      __KeyboardClickMixin_keyUpHandler.set(this, e => __classPrivateFieldGet(this, __KeyboardClickMixin_instances, "m", __KeyboardClickMixin_handleKeyUp).call(this, e));
      __KeyboardClickMixin_focusOutHandler.set(this, () => __classPrivateFieldSet(this, __KeyboardClickMixin_keyPressed, false, "f"));
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", __classPrivateFieldGet(this, __KeyboardClickMixin_keyDownHandler, "f"));
      this.addEventListener("keyup", __classPrivateFieldGet(this, __KeyboardClickMixin_keyUpHandler, "f"));
      this.addEventListener("focusout", __classPrivateFieldGet(this, __KeyboardClickMixin_focusOutHandler, "f"));
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", __classPrivateFieldGet(this, __KeyboardClickMixin_keyDownHandler, "f"));
      this.removeEventListener("keyup", __classPrivateFieldGet(this, __KeyboardClickMixin_keyUpHandler, "f"));
      this.removeEventListener("focusout", __classPrivateFieldGet(this, __KeyboardClickMixin_focusOutHandler, "f"));
    }
  }
  __KeyboardClickMixin_keyPressed = new WeakMap(), __KeyboardClickMixin_keyDownHandler = new WeakMap(), __KeyboardClickMixin_keyUpHandler = new WeakMap(), __KeyboardClickMixin_focusOutHandler = new WeakMap(), __KeyboardClickMixin_instances = new WeakSet(), __KeyboardClickMixin_handleKeyDown = function __KeyboardClickMixin_handleKeyDown(e) {
    if (e.target !== e.currentTarget || isDisabledMixin(this) && this.disabled || isDisabledInteractiveMixin(this) && this.disabledInteractive) {
      __classPrivateFieldSet(this, __KeyboardClickMixin_keyPressed, false, "f");
      return;
    }
    if (e.key === " " || allowEnter && e.key === "Enter") {
      __classPrivateFieldSet(this, __KeyboardClickMixin_keyPressed, true, "f");
    }
  }, __KeyboardClickMixin_handleKeyUp = function __KeyboardClickMixin_handleKeyUp(e) {
    if (e.target !== e.currentTarget || isDisabledMixin(this) && this.disabled || isDisabledInteractiveMixin(this) && this.disabledInteractive || !__classPrivateFieldGet(this, __KeyboardClickMixin_keyPressed, "f")) {
      __classPrivateFieldSet(this, __KeyboardClickMixin_keyPressed, false, "f");
      return;
    }
    __classPrivateFieldSet(this, __KeyboardClickMixin_keyPressed, false, "f");
    // NOTE: the dispatched click event will not be trusted since it is synthetic.
    this.dispatchEvent(new MouseEvent("click", {
      cancelable: true,
      bubbles: true,
      composed: true
    }));
  };
  return _KeyboardClickMixin;
}

export { KeyboardClick };
//# sourceMappingURL=KeyboardClick.js.map
