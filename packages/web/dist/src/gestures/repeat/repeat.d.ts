import { GestureDetail, GestureListener, GestureOptions, GestureRecognizer } from "@pulse/web/gestures";
import { RepeatGestureDetail } from "./RepeatGestureDetail";
import { RepeatGestureOptions } from "./RepeatGestureOptions";
import { RepeatGestureRecognizer } from "./RepeatGestureRecognizer";
/**
 * Creates a recognizer used to detect and interpret repeated gestures from incoming input streams.
 * @template TDetail The type of semantic detail produced by each repeated occurrence.
 * @param {GestureRecognizer<GestureOptions, TDetail>} recognizer The recognizer used to detect the gesture to repeat.
 * @returns {RepeatGestureRecognizer<TDetail>} A recognizer that can be used to detect and interpret repeated gestures.
 */
export declare function repeat<TDetail extends GestureDetail>(recognizer: GestureRecognizer<GestureOptions, TDetail>): RepeatGestureRecognizer<TDetail>;
/**
 * Creates a recognizer used to detect and interpret repeated gestures from incoming input streams.
 * @template TDetail The type of semantic detail produced by each repeated occurrence.
 * @param {GestureListener<RepeatGestureDetail<TDetail>>} listener The function invoked when semantic detail is emitted.
 * @param {GestureRecognizer<GestureOptions, TDetail>} recognizer The recognizer used to detect the gesture to repeat.
 * @returns {RepeatGestureRecognizer<TDetail>} A recognizer that can be used to detect and interpret repeated gestures.
 */
export declare function repeat<TDetail extends GestureDetail>(listener: GestureListener<RepeatGestureDetail<TDetail>>, recognizer: GestureRecognizer<GestureOptions, TDetail>): RepeatGestureRecognizer<TDetail>;
/**
 * Creates a recognizer used to detect and interpret repeated gestures from incoming input streams.
 * @template TDetail The type of semantic detail produced by each repeated occurrence.
 * @param {Partial<RepeatGestureOptions>} options The options used to detect and interpret repeated gestures.
 * @param {GestureRecognizer<GestureOptions, TDetail>} recognizer The recognizer used to detect the gesture to repeat.
 * @returns {RepeatGestureRecognizer<TDetail>} A recognizer that can be used to detect and interpret repeated gestures.
 */
export declare function repeat<TDetail extends GestureDetail>(options: Partial<RepeatGestureOptions>, recognizer: GestureRecognizer<GestureOptions, TDetail>): RepeatGestureRecognizer<TDetail>;
/**
 * Creates a recognizer used to detect and interpret repeated gestures from incoming input streams.
 * @template TDetail The type of semantic detail produced by each repeated occurrence.
 * @param {GestureListener<RepeatGestureDetail<TDetail>>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<RepeatGestureOptions>} options The options used to detect and interpret repeated gestures.
 * @param {GestureRecognizer<GestureOptions, TDetail>} recognizer The recognizer used to detect the gesture to repeat.
 * @returns {RepeatGestureRecognizer<TDetail>} A recognizer that can be used to detect and interpret repeated gestures.
 */
export declare function repeat<TDetail extends GestureDetail>(listener: GestureListener<RepeatGestureDetail<TDetail>>, options: Partial<RepeatGestureOptions>, recognizer: GestureRecognizer<GestureOptions, TDetail>): RepeatGestureRecognizer<TDetail>;
//# sourceMappingURL=repeat.d.ts.map