import { GestureDetail } from "./GestureDetail";
import { GestureInput, PointerInput, WheelInput } from "./GestureInput";
import { GestureOptions } from "./GestureOptions";
import { GestureDisposition, GestureListener, GestureRecognizer } from "./GestureRecognizer";
import { GestureRecognizerBase } from "./GestureRecognizerBase";
/**
 * A base implementation for a {@link GestureRecognizer} which delegates recognition to another recognizer. This class must be inherited.
 * @template TOptions The type of options used to detect and interpret gestures.
 * @template TDetail The type of semantic detail emitted for a gesture.
 * @template TInnerOptions The type of options used to detect and interpret gestures by the inner recognizer.
 * @template TInnerDetail The type of semantic detail emitted by the inner recognizer.
 * @template TInnerRecognizer The type of recognizer to which recognition is delegated.
 */
export declare abstract class DelegatingGestureRecognizerBase<TOptions extends GestureOptions, TDetail extends GestureDetail, TInnerOptions extends GestureOptions = GestureOptions, TInnerDetail extends GestureDetail = GestureDetail, TInnerRecognizer extends GestureRecognizer<TInnerOptions, TInnerDetail> = GestureRecognizer<TInnerOptions, TInnerDetail>> extends GestureRecognizerBase<TOptions, TDetail> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<TOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<TDetail>} listener The function invoked when semantic detail is emitted.
     * @param {TInnerRecognizer} inner The recognizer used to detect the gesture to repeat.
     */
    constructor(options?: Partial<TOptions>, listener?: GestureListener<TDetail>, inner?: TInnerRecognizer);
    /** The recognizer to which recognition is delegated. */
    protected get _inner(): TInnerRecognizer | undefined;
    protected set _inner(value: TInnerRecognizer | undefined);
    /** @inheritdoc */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** @inheritdoc */
    get options(): TOptions;
    set options(value: Partial<TOptions>);
    /** @inheritdoc */
    get eager(): boolean;
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
    /**
     * Applies options to the inner recognizer.
     * @param {TOptions} options The options to apply.
     * @param {TInnerRecognizer} inner The recognizer to which recognition is delegated.
     */
    protected _applyOptions(options: TOptions, inner: TInnerRecognizer): void;
    /**
     * Handles dispositions from the inner recognizer.
     * @param {number} inputId The identifier of the input stream to disposition.
     * @param {GestureDisposition} disposition The disposition of the input stream.
     */
    protected _handleDisposition(inputId: number, disposition: GestureDisposition): void;
    /**
     * Handles semantic detail emitted from the inner recognizer.
     * @param {TInnerDetail} detail The semantic detail emitted from the inner recognizer.
     */
    protected abstract _handleGesture(detail: TInnerDetail): void;
}
//# sourceMappingURL=DelegatingGestureRecognizerBase.d.ts.map