/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { GestureBinder } from './PointerTracker.js';

/**
 * Starts detecting gestures on the specified element using one or more gesture recognizers.
 * @param {HTMLElement} element The element whose incoming input streams should be interpreted as gestures.
 * @param {...GestureRecognizer} recognizers One or more gesture recognizers used to detect and interpret gestures on the element.
 * @returns {GestureController} A controller used to disable, re-enable, or stop detecting gestures for all recognizers bound by this call.
 */
function detectGesture(element, ...recognizers) {
  GestureBinder.bind(element, ...recognizers);
  return {
    get disabled() {
      return recognizers.every(x => x.disabled);
    },
    set disabled(value) {
      recognizers.forEach(x => x.disabled = value);
    },
    destroy() {
      GestureBinder.unbind(element, ...recognizers);
    }
  };
}

/**
 * Creates a gesture listener that dispatches semantic detail about a gesture to phase-specific handlers.
 * @template TDetail The type of semantic detail emitted for a gesture.
 * @param {GesturePhaseHandlers<TDetail>} handlers The phase-specific handlers to invoke.
 * @returns {GestureListener<TDetail>} A listener that forwards gesture detail to the matching phase handler.
 */
function phase(handlers) {
  return detail => {
    switch (detail.phase) {
      case "start":
        handlers.onStart?.(detail);
        break;
      case "update":
        handlers.onUpdate?.(detail);
        break;
      case "end":
        handlers.onEnd?.(detail);
        break;
      case "cancel":
        handlers.onCancel?.(detail);
        break;
    }
  };
}

export { detectGesture, phase };
//# sourceMappingURL=phase.js.map
