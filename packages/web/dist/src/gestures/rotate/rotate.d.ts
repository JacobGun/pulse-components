import { GestureListener } from "@pulse/web/gestures";
import { RotateGestureDetail } from "./RotateGestureDetail";
import { RotateGestureOptions } from "./RotateGestureOptions";
import { RotateGestureRecognizer } from "./RotateGestureRecognizer";
/**
 * Creates a recognizer used to detect and interpret rotate gestures from incoming input streams.
 * @returns {RotateGestureRecognizer} A recognizer that can be used to detect and interpret rotate gestures.
 */
export declare function rotate(): RotateGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret rotate gestures from incoming input streams.
 * @param {GestureListener<RotateGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @returns {RotateGestureRecognizer} A recognizer that can be used to detect and interpret rotate gestures.
 */
export declare function rotate(listener: GestureListener<RotateGestureDetail>): RotateGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret rotate gestures from incoming input streams..
 * @param {Partial<RotateGestureOptions>} options The options used to detect and interpret rotate gestures.
 * @returns {RotateGestureRecognizer} A recognizer that can be used to detect and interpret rotate gestures.
 */
export declare function rotate(options: Partial<RotateGestureOptions>): RotateGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret rotate gestures from incoming input streams.
 * @param {GestureListener<RotateGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<RotateGestureOptions>} options The options used to detect and interpret rotate gestures.
 * @returns {RotateGestureRecognizer} A recognizer that can be used to detect and interpret rotate gestures.
 */
export declare function rotate(listener: GestureListener<RotateGestureDetail>, options: Partial<RotateGestureOptions>): RotateGestureRecognizer;
//# sourceMappingURL=rotate.d.ts.map