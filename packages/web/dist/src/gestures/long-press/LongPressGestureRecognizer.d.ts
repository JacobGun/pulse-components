import { GestureRecognizerBase, PointerInput } from "@pulse/web/gestures";
import { LongPressGestureDetail } from "./LongPressGestureDetail";
import { LongPressGestureOptions } from "./LongPressGestureOptions";
/** A {@link GestureRecognizer} used to detect and interpret long-press gestures from incoming input streams. */
export declare class LongPressGestureRecognizer extends GestureRecognizerBase<LongPressGestureOptions, LongPressGestureDetail> {
    #private;
    /** @inheritdoc */
    get defaultOptions(): LongPressGestureOptions;
    /** @inheritdoc */
    get eager(): boolean;
    /** @inheritdoc */
    shouldCapturePointer(input: PointerInput): boolean;
    /** @inheritdoc */
    _onPointerDown(input: PointerInput): void;
    /** @inheritdoc */
    _onPointerMove(input: PointerInput): void;
    /** @inheritdoc */
    _onPointerUp(input: PointerInput): void;
    /** @inheritdoc */
    _onPointerCancel(input: PointerInput): void;
    /** @inheritdoc */
    _onAccept(inputId: number): void;
    /** @inheritdoc */
    protected _onReject(inputId: number): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=LongPressGestureRecognizer.d.ts.map