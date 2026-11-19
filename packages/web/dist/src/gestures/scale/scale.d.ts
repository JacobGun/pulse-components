import { GestureListener } from "@pulse/web/gestures";
import { ScaleGestureDetail } from "./ScaleGestureDetail";
import { ScaleGestureOptions } from "./ScaleGestureOptions";
import { ScaleGestureRecognizer } from "./ScaleGestureRecognizer";
/**
 * Creates a recognizer used to detect and interpret scale gestures from incoming input streams.
 * @returns {ScaleGestureRecognizer} A recognizer that can be used to detect and interpret scale gestures.
 */
export declare function scale(): ScaleGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret scale gestures from incoming input streams.
 * @param {GestureListener<ScaleGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @returns {ScaleGestureRecognizer} A recognizer that can be used to detect and interpret scale gestures.
 */
export declare function scale(listener: GestureListener<ScaleGestureDetail>): ScaleGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret scale gestures from incoming input streams..
 * @param {Partial<ScaleGestureOptions>} options The options used to detect and interpret scale gestures.
 * @returns {ScaleGestureRecognizer} A recognizer that can be used to detect and interpret scale gestures.
 */
export declare function scale(options: Partial<ScaleGestureOptions>): ScaleGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret scale gestures from incoming input streams.
 * @param {GestureListener<ScaleGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<ScaleGestureOptions>} options The options used to detect and interpret scale gestures.
 * @returns {ScaleGestureRecognizer} A recognizer that can be used to detect and interpret scale gestures.
 */
export declare function scale(listener: GestureListener<ScaleGestureDetail>, options: Partial<ScaleGestureOptions>): ScaleGestureRecognizer;
//# sourceMappingURL=scale.d.ts.map