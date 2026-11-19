import { GestureInput, GestureListener, GestureRecognizer, GestureRecognizerBase, PointerInput, WheelInput } from "@pulse/web/gestures";
import { SequenceGestureDetail } from "./SequenceGestureDetail";
import { SequenceGestureOptions } from "./SequenceGestureOptions";
/** A {@link GestureRecognizer} used to detect and interpret a sequence of gestures from incoming input streams. */
export declare class SequenceGestureRecognizer extends GestureRecognizerBase<SequenceGestureOptions, SequenceGestureDetail> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<SequenceGestureOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<SequenceGestureDetail>} listener The function invoked when semantic detail is emitted.
     * @param {readonly GestureRecognizer[]} recognizers The recognizers used to detect a sequence of gesture gestures.
     */
    constructor(options?: Partial<SequenceGestureOptions>, listener?: GestureListener<SequenceGestureDetail>, ...recognizers: readonly GestureRecognizer[]);
    /** The current recognizer in the sequence. */
    get recognizer(): GestureRecognizer | undefined;
    /** The recognizers used to detect a sequence of gestures. */
    get recognizers(): readonly GestureRecognizer[];
    set recognizers(value: readonly GestureRecognizer[]);
    /** @inheritdoc */
    get defaultOptions(): SequenceGestureOptions;
    /** @inheritdoc */
    shouldCapturePointer(input: PointerInput): boolean;
    /** @inheritdoc */
    canReceiveInput(input: GestureInput): boolean;
    /** @inheritdoc */
    protected _onPointerOver(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerEnter(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerDown(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerMove(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerUp(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerCancel(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerOut(input: PointerInput): void;
    /** @inheritdoc */
    protected _onPointerLeave(input: PointerInput): void;
    /** @inheritdoc */
    protected _onWheel(input: WheelInput): void;
    /** @inheritdoc */
    protected _onAccept(inputId: number): void;
    /** @inheritdoc */
    protected _onReject(inputId: number): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=SequenceGestureRecognizer.d.ts.map