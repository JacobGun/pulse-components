/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { RepeatGestureRecognizer } from './RepeatGestureElement.js';
export { DefaultRepeatGestureOptions, M3eRepeatGestureElement } from './RepeatGestureElement.js';
import './PointerTracker.js';
import { isGestureRecognizer } from './GestureRecognizer.js';

/** @internal */
function repeat(listenerOrOptionsOrRecognizer, optionsOrRecognizer, recognizerMaybe) {
  let listener;
  let options;
  let recognizer;
  // repeat(recognizer)
  if (isGestureRecognizer(listenerOrOptionsOrRecognizer)) {
    recognizer = listenerOrOptionsOrRecognizer;
  }
  // repeat(listener, recognizer)
  else if (typeof listenerOrOptionsOrRecognizer === "function" && isGestureRecognizer(optionsOrRecognizer)) {
    listener = listenerOrOptionsOrRecognizer;
    recognizer = optionsOrRecognizer;
  }
  // repeat(options, recognizer)
  else if (typeof listenerOrOptionsOrRecognizer === "object" && isGestureRecognizer(optionsOrRecognizer)) {
    options = listenerOrOptionsOrRecognizer;
    recognizer = optionsOrRecognizer;
  }
  // repeat(listener, options, recognizer)
  else {
    listener = listenerOrOptionsOrRecognizer;
    options = optionsOrRecognizer;
    recognizer = recognizerMaybe;
  }
  return new RepeatGestureRecognizer(options, listener, recognizer);
}

export { RepeatGestureRecognizer, repeat };
//# sourceMappingURL=gestures-repeat.js.map
