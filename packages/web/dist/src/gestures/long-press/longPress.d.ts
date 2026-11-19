import { GestureListener } from "@pulse/web/gestures";
import { LongPressGestureDetail } from "./LongPressGestureDetail";
import { LongPressGestureOptions } from "./LongPressGestureOptions";
import { LongPressGestureRecognizer } from "./LongPressGestureRecognizer";
/**
 * Creates a recognizer used to detect and interpret long-press gestures from incoming input streams.
 * @returns {LongPressGestureRecognizer} A recognizer that can be used to detect and interpret long-press gestures.
 */
export declare function longPress(): LongPressGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret long-press gestures from incoming input streams.
 * @param {GestureListener<LongPressGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @returns {LongPressGestureRecognizer} A recognizer that can be used to detect and interpret long-press gestures.
 */
export declare function longPress(listener: GestureListener<LongPressGestureDetail>): LongPressGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret long-press gestures from incoming input streams..
 * @param {Partial<LongPressGestureOptions>} options The options used to detect and interpret long-press gestures.
 * @returns {LongPressGestureRecognizer} A recognizer that can be used to detect and interpret long-press gestures.
 */
export declare function longPress(options: Partial<LongPressGestureOptions>): LongPressGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret long-press gestures from incoming input streams.
 * @param {GestureListener<LongPressGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<LongPressGestureOptions>} options The options used to detect and interpret long-press gestures.
 * @returns {LongPressGestureRecognizer} A recognizer that can be used to detect and interpret long-press gestures.
 */
export declare function longPress(listener: GestureListener<LongPressGestureDetail>, options: Partial<LongPressGestureOptions>): LongPressGestureRecognizer;
//# sourceMappingURL=longPress.d.ts.map