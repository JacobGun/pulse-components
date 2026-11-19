/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { hasKeys } from './TextOverflowElement.js';
import 'tslib';
import 'lit/decorators.js';
import 'lit';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is a {@link GestureRecognizer}.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a {@link GestureRecognizer}.
 */
function isGestureRecognizer(value) {
  return hasKeys(value, "addListener", "canReceiveInput", "disabled", "eager", "onInput", "onResolution", "options", "removeListener", "reset", "shouldCapturePointer");
}

export { isGestureRecognizer };
//# sourceMappingURL=GestureRecognizer.js.map
