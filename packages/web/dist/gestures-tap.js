/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { TapGestureRecognizer } from './TapGestureElement.js';
export { DefaultTapGestureOptions, M3eTapGestureElement } from './TapGestureElement.js';

/** @internal */
function tap(listenerOrOptions, maybeOptions) {
  let listener;
  let options;
  if (typeof listenerOrOptions === "function") {
    listener = listenerOrOptions;
    options = maybeOptions;
  } else {
    options = listenerOrOptions;
  }
  return new TapGestureRecognizer(options, listener);
}

export { TapGestureRecognizer, tap };
//# sourceMappingURL=gestures-tap.js.map
