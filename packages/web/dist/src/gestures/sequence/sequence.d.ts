import { GestureListener, GestureRecognizer } from "@pulse/web/gestures";
import { SequenceGestureRecognizer } from "./SequenceGestureRecognizer";
import { SequenceGestureDetail } from "./SequenceGestureDetail";
import { SequenceGestureOptions } from "./SequenceGestureOptions";
/**
 * Creates a recognizer used to detect and interpret a sequence of gestures from incoming input streams.
 * @param {readonly GestureRecognizer[]} recognizers The recognizers used to detect a sequence of gestures.
 * @returns {SequenceGestureRecognizer} A recognizer that can be used to detect and interpret a sequence of gestures.
 */
export declare function sequence(...recognizers: readonly GestureRecognizer[]): SequenceGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret a sequence of gestures from incoming input streams.
 * @param {GestureListener<SequenceGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {readonly GestureRecognizer[]} recognizers The recognizers used to detect a sequence of gestures.
 * @returns {SequenceGestureRecognizer} A recognizer that can be used to detect and interpret a sequence of gestures.
 */
export declare function sequence(listener: GestureListener<SequenceGestureDetail>, ...recognizers: readonly GestureRecognizer[]): SequenceGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret a sequence of gestures from incoming input streams.
 * @param {Partial<SequenceGestureOptions>} options The options used to detect and interpret a sequence of gestures.
 * @param {readonly GestureRecognizer[]} recognizers The recognizers used to detect a sequence of gestures.
 * @returns {SequenceGestureRecognizer} A recognizer that can be used to detect and interpret a sequence of gestures.
 */
export declare function sequence(options: Partial<SequenceGestureOptions>, ...recognizers: readonly GestureRecognizer[]): SequenceGestureRecognizer;
/**
 * Creates a recognizer used to detect and interpret a sequence of gestures from incoming input streams.
 * @param {GestureListener<SequenceGestureDetail>} listener The function invoked when semantic detail is emitted.
 * @param {Partial<SequenceGestureOptions>} options The options used to detect and interpret a sequence of gestures.
 * @param {readonly GestureRecognizer[]} recognizers The recognizers used to detect a sequence of gestures.
 * @returns {SequenceGestureRecognizer} A recognizer that can be used to detect and interpret a sequence of gestures.
 */
export declare function sequence(listener: GestureListener<SequenceGestureDetail>, options: Partial<SequenceGestureOptions>, ...recognizers: readonly GestureRecognizer[]): SequenceGestureRecognizer;
//# sourceMappingURL=sequence.d.ts.map