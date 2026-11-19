import { DelegatingGestureRecognizerBase, GestureListener } from "@pulse/web/gestures";
import { PanGestureDetail, PanGestureOptions, PanGestureRecognizer } from "@pulse/web/gestures/pan";
import { RotateGestureDetail } from "./RotateGestureDetail";
import { RotateGestureOptions } from "./RotateGestureOptions";
/** A {@link GestureRecognizer} used to detect and interpret rotate gestures from incoming input streams. */
export declare class RotateGestureRecognizer extends DelegatingGestureRecognizerBase<RotateGestureOptions, RotateGestureDetail, PanGestureOptions, PanGestureDetail, PanGestureRecognizer> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<RotateGestureOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<RotateGestureDetail>} listener The function invoked when semantic detail is emitted.
     */
    constructor(options?: Partial<RotateGestureOptions>, listener?: GestureListener<RotateGestureDetail>);
    /** @inheritdoc */
    get defaultOptions(): RotateGestureOptions;
    /** @inheritdoc */
    protected _applyOptions(options: RotateGestureOptions, inner: PanGestureRecognizer): void;
    /** @inheritdoc */
    protected _handleGesture(detail: PanGestureDetail): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=RotateGestureRecognizer.d.ts.map