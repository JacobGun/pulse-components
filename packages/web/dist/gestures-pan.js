/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { PanGestureRecognizer } from './PanGestureElement.js';
export { DefaultPanGestureOptions, M3ePanGestureElement } from './PanGestureElement.js';

/** @internal */
function pan(listenerOrOptions, maybeOptions) {
  let listener;
  let options;
  if (typeof listenerOrOptions === "function") {
    listener = listenerOrOptions;
    options = maybeOptions;
  } else {
    options = listenerOrOptions;
  }
  return new PanGestureRecognizer(options, listener);
}

export { PanGestureRecognizer, pan };
//# sourceMappingURL=gestures-pan.js.map
