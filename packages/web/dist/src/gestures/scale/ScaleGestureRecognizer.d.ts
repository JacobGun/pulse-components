import { DelegatingGestureRecognizerBase, GestureListener } from "@pulse/web/gestures";
import { PanGestureDetail, PanGestureOptions, PanGestureRecognizer } from "@pulse/web/gestures/pan";
import { ScaleGestureDetail } from "./ScaleGestureDetail";
import { ScaleGestureOptions } from "./ScaleGestureOptions";
/** A {@link GestureRecognizer} used to detect and interpret scale gestures from incoming input streams. */
export declare class ScaleGestureRecognizer extends DelegatingGestureRecognizerBase<ScaleGestureOptions, ScaleGestureDetail, PanGestureOptions, PanGestureDetail, PanGestureRecognizer> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<ScaleGestureOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<ScaleGestureDetail>} listener The function invoked when semantic detail is emitted.
     */
    constructor(options?: Partial<ScaleGestureOptions>, listener?: GestureListener<ScaleGestureDetail>);
    /** @inheritdoc */
    get defaultOptions(): ScaleGestureOptions;
    /** @inheritdoc */
    protected _applyOptions(options: ScaleGestureOptions, inner: PanGestureRecognizer): void;
    /** @inheritdoc */
    protected _handleGesture(detail: PanGestureDetail): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=ScaleGestureRecognizer.d.ts.map