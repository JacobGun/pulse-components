/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { setCustomState, deleteCustomState } from './TextOverflowElement.js';
import 'lit/decorators.js';
import 'lit';
import 'lit/directives/if-defined.js';

/**
 * Mixin to augment an element with behavior that supports styling based on directionality, avoiding the need to use :dir.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {T} A class that extends `base` with directionality styling support.
 */
function SupportsDirectionality(base) {
  var __SupportsDirectionalityMixin_directionalitySubscription;
  class _SupportsDirectionalityMixin extends base {
    constructor() {
      super(...arguments);
      /** @private */
      __SupportsDirectionalityMixin_directionalitySubscription.set(this, void 0);
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      __classPrivateFieldGet(this, __SupportsDirectionalityMixin_directionalitySubscription, "f")?.call(this);
      __classPrivateFieldSet(this, __SupportsDirectionalityMixin_directionalitySubscription, M3eDirectionality.observe(() => setCustomState(this, "--rtl", M3eDirectionality.current === "rtl")), "f");
      setCustomState(this, "--rtl", M3eDirectionality.current === "rtl");
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      __classPrivateFieldGet(this, __SupportsDirectionalityMixin_directionalitySubscription, "f")?.call(this);
      deleteCustomState(this, "--rtl");
    }
  }
  __SupportsDirectionalityMixin_directionalitySubscription = new WeakMap();
  return _SupportsDirectionalityMixin;
}

export { SupportsDirectionality };
//# sourceMappingURL=SupportsDirectionality.js.map
