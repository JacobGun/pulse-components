import { GestureListener } from "@pulse/web/gestures";
import { TapGestureDetail } from "./TapGestureDetail";
import { TapGestureOptions } from "./TapGestureOptions";
import { TapGestureRecognizer } from "./TapGestureRecognizer";
/**
 * Creates a recognizer used to detect and interpret tap gestures from incoming input streams.
 * @returns {TapGestureRecognizer} A recognizer that can be used to detect and interpret tap gestures.
 */
export declare function tap(): TapGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret tap gestures from incoming input streams.
 * @param {GestureListener<TapGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @returns {TapGestureRecognizer} A recognizer that can be used to detect and interpret tap gestures.
 */
export declare function tap(listener: GestureListener<TapGestureDetail>): TapGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret tap gestures from incoming input streams..
 * @param {Partial<TapGestureOptions>} options The options used to detect and interpret tap gestures.
 * @returns {TapGestureRecognizer} A recognizer that can be used to detect and interpret tap gestures.
 */
export declare function tap(options: Partial<TapGestureOptions>): TapGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret tap gestures from incoming input streams.
 * @param {GestureListener<TapGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<TapGestureOptions>} options The options used to detect and interpret tap gestures.
 * @returns {TapGestureRecognizer} A recognizer that can be used to detect and interpret tap gestures.
 */
export declare function tap(listener: GestureListener<TapGestureDetail>, options: Partial<TapGestureOptions>): TapGestureRecognizer;
//# sourceMappingURL=tap.d.ts.map