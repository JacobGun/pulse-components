/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import { hasKeys, isDisabledMixin } from './TextOverflowElement.js';

/**
 * Determines whether a value is a `DisabledInteractiveMixin`.
 * @param {unknown} value The value to test.
 * @returns {value is DisabledInteractiveMixin} Whether `value` is a `DisabledInteractiveMixin`.
 */
function isDisabledInteractiveMixin(value) {
  return hasKeys(value, "disabledInteractive") && isDisabledMixin(value);
}
const SUPPRESSED_EVENTS = ["click", "dblclick", "auxclick", "keydown", "keyup"];
const INTERACTIVE_KEYS = ["Tab", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Left", "Up", "Right", "Down"];
const _suppressedEventHandler = Symbol("_suppressedEventHandler");
/**
 * Mixin to augment an element with behavior that supports an interactive disabled state.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {Constructor<DisabledInteractiveMixin>} A constructor that implements `DisabledInteractiveMixin`.
 */
function DisabledInteractive(base) {
  var _a;
  class _DisabledInteractiveMixin extends base {
    constructor() {
      super(...arguments);
      /** @private */
      this[_a] = e => {
        if (this.disabledInteractive) {
          // Only allow specific keys when disabled and interactive.
          if (e instanceof KeyboardEvent && INTERACTIVE_KEYS.includes(e.key)) {
            return;
          }
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      };
      /**
       * Whether the element is disabled and interactive.
       * @default false
       */
      this.disabledInteractive = false;
    }
    /** @inheritdoc */
    connectedCallback() {
      SUPPRESSED_EVENTS.forEach(x => this.addEventListener(x, this[_suppressedEventHandler], true));
      super.connectedCallback();
    }
    /** @inheritdoc */
    disconnectedCallback() {
      SUPPRESSED_EVENTS.forEach(x => this.removeEventListener(x, this[_suppressedEventHandler], true));
      super.disconnectedCallback();
    }
    /** @inheritdoc */
    update(changedProperties) {
      super.update(changedProperties);
      if ((changedProperties.has("disabled") || changedProperties.has("disabledInteractive")) && this.role && this.role !== "none" && this.role !== "presentation" && this.role !== "none") {
        this.ariaDisabled = this.disabled || this.disabledInteractive ? "true" : null;
      }
    }
  }
  _a = _suppressedEventHandler;
  __decorate([property({
    attribute: "disabled-interactive",
    type: Boolean,
    reflect: true
  })], _DisabledInteractiveMixin.prototype, "disabledInteractive", void 0);
  return _DisabledInteractiveMixin;
}

export { DisabledInteractive, isDisabledInteractiveMixin };
//# sourceMappingURL=DisabledInteractive.js.map
