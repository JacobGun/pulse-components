/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { SwipeGestureRecognizer } from './SwipeGestureElement.js';
export { DefaultSwipeGestureOptions, M3eSwipeGestureElement } from './SwipeGestureElement.js';

/** @internal */
function swipe(listenerOrOptions, maybeOptions) {
  let listener;
  let options;
  if (typeof listenerOrOptions === "function") {
    listener = listenerOrOptions;
    options = maybeOptions;
  } else {
    options = listenerOrOptions;
  }
  return new SwipeGestureRecognizer(options, listener);
}

export { SwipeGestureRecognizer, swipe };
//# sourceMappingURL=gestures-swipe.js.map
