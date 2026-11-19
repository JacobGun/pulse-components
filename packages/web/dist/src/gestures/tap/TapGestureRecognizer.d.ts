import { GestureRecognizerBase, PointerInput } from "@pulse/web/gestures";
import { TapGestureDetail } from "./TapGestureDetail";
import { TapGestureOptions } from "./TapGestureOptions";
/** A {@link GestureRecognizer} used to detect and interpret tap gestures from incoming input streams. */
export declare class TapGestureRecognizer extends GestureRecognizerBase<TapGestureOptions, TapGestureDetail> {
    #private;
    /** @inheritdoc */
    get defaultOptions(): TapGestureOptions;
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
//# sourceMappingURL=TapGestureRecognizer.d.ts.map