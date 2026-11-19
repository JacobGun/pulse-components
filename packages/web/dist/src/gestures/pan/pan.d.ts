import { GestureListener } from "@pulse/web/gestures";
import { PanGestureDetail } from "./PanGestureDetail";
import { PanGestureOptions } from "./PanGestureOptions";
import { PanGestureRecognizer } from "./PanGestureRecognizer";
/**
 * Creates a recognizer used to detect and interpret pan gestures from incoming input streams.
 * @returns {PanGestureRecognizer} A recognizer that can be used to detect and interpret pan gestures.
 */
export declare function pan(): PanGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret pan gestures from incoming input streams.
 * @param {GestureListener<PanGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @returns {PanGestureRecognizer} A recognizer that can be used to detect and interpret pan gestures.
 */
export declare function pan(listener: GestureListener<PanGestureDetail>): PanGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret pan gestures from incoming input streams.
 * @param {Partial<PanGestureOptions>} options The options used to detect and interpret pan gestures.
 * @returns {PanGestureRecognizer} A recognizer that can be used to detect and interpret pan gestures.
 */
export declare function pan(options: Partial<PanGestureOptions>): PanGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret pan gestures from incoming input streams.
 * @param {GestureListener<PanGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<PanGestureOptions>} options The options used to detect and interpret pan gestures.
 * @returns {PanGestureRecognizer} A recognizer that can be used to detect and interpret pan gestures.
 */
export declare function pan(listener: GestureListener<PanGestureDetail>, options: Partial<PanGestureOptions>): PanGestureRecognizer;
//# sourceMappingURL=pan.d.ts.map