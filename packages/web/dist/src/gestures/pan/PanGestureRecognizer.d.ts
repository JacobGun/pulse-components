import { GestureRecognizerBase, PointerInput, PointerTracker } from "@pulse/web/gestures";
import { PanGestureDetail } from "./PanGestureDetail";
import { PanGestureOptions } from "./PanGestureOptions";
/** A {@link GestureRecognizer} used to detect and interpret pan gestures from incoming input streams. */
export declare class PanGestureRecognizer extends GestureRecognizerBase<PanGestureOptions, PanGestureDetail> {
    #private;
    /** Returns the pointer trackers for all active pointers. */
    get trackers(): PointerTracker[];
    /** @inheritdoc */
    get defaultOptions(): PanGestureOptions;
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
    protected _onAccept(inputId: number): void;
    /** @inheritdoc */
    protected _onReject(inputId: number): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=PanGestureRecognizer.d.ts.map