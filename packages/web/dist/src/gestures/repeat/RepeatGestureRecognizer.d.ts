import { DelegatingGestureRecognizerBase, GestureDetail, GestureDisposition, GestureListener, GestureOptions, GestureRecognizer } from "@pulse/web/gestures";
import { RepeatGestureDetail } from "./RepeatGestureDetail";
import { RepeatGestureOptions } from "./RepeatGestureOptions";
/**
 * A {@link GestureRecognizer} used to detect and interpret repeated gestures from incoming input streams.
 * @template TDetail - The type of semantic detail produced by each repeated occurrence.
 */
export declare class RepeatGestureRecognizer<TDetail extends GestureDetail = GestureDetail> extends DelegatingGestureRecognizerBase<RepeatGestureOptions, RepeatGestureDetail<TDetail>, GestureOptions, TDetail, GestureRecognizer<GestureOptions, TDetail>> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<RepeatGestureOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<RepeatGestureDetail<TDetail>>} listener The function invoked when semantic detail is emitted.
     * @param {GestureRecognizer<GestureOptions, TDetail>} recognizer The recognizer used to detect the gesture to repeat.
     */
    constructor(options?: Partial<RepeatGestureOptions>, listener?: GestureListener<RepeatGestureDetail<TDetail>>, recognizer?: GestureRecognizer<GestureOptions, TDetail>);
    /** @inheritdoc */
    get defaultOptions(): RepeatGestureOptions;
    /** The recognizer used to detect the gesture to repeat. */
    get recognizer(): GestureRecognizer<GestureOptions, TDetail> | undefined;
    set recognizer(value: GestureRecognizer<GestureOptions, TDetail> | undefined);
    /** @inheritdoc */
    protected _onAccept(inputId: number): void;
    /** @inheritdoc */
    protected _onReject(inputId: number): void;
    /** @inheritdoc */
    reset(): void;
    /** @inheritdoc */
    protected _handleDisposition(inputId: number, disposition: GestureDisposition): void;
    /** @inheritdoc */
    protected _handleGesture(detail: GestureDetail): void;
}
//# sourceMappingURL=RepeatGestureRecognizer.d.ts.map