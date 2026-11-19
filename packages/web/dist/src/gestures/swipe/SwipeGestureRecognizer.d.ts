import { DelegatingGestureRecognizerBase, GestureDisposition, GestureListener } from "@pulse/web/gestures";
import { PanGestureDetail, PanGestureOptions, PanGestureRecognizer } from "@pulse/web/gestures/pan";
import { SwipeGestureOptions } from "./SwipeGestureOptions";
import { SwipeGestureDetail } from "./SwipeGestureDetail";
/** A {@link GestureRecognizer} used to detect and interpret swipe gestures from incoming input streams. */
export declare class SwipeGestureRecognizer extends DelegatingGestureRecognizerBase<SwipeGestureOptions, SwipeGestureDetail, PanGestureOptions, PanGestureDetail, PanGestureRecognizer> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<SwipeGestureOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<SwipeGestureDetail>} listener The function invoked when semantic detail is emitted.
     */
    constructor(options?: Partial<SwipeGestureOptions>, listener?: GestureListener<SwipeGestureDetail>);
    /** @inheritdoc */
    get defaultOptions(): SwipeGestureOptions;
    /** @inheritdoc */
    get eager(): boolean;
    /** @inheritdoc */
    protected _applyOptions(options: SwipeGestureOptions, inner: PanGestureRecognizer): void;
    /** @inheritdoc */
    protected _onAccept(inputId: number): void;
    /** @inheritdoc */
    protected _onReject(inputId: number): void;
    /** @private */
    protected _handleDisposition(inputId: number, disposition: GestureDisposition): void;
    protected _handleGesture(detail: PanGestureDetail): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=SwipeGestureRecognizer.d.ts.map