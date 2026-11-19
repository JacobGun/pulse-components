import { GestureDetail } from "./GestureDetail";
import { GestureInput, PointerInput, WheelInput } from "./GestureInput";
import { GestureOptions } from "./GestureOptions";
import { GestureDispositionCallback, GestureListener, GestureRecognizer, GestureResolution } from "./GestureRecognizer";
/**
 * A base implementation for a {@link GestureRecognizer} used to detect and interpret gestures from incoming input
 * streams. This class must be inherited.
 * @template TOptions The type of options used to detect and interpret gestures.
 * @template TDetail The type of semantic detail emitted for a gesture.
 */
export declare abstract class GestureRecognizerBase<TOptions extends GestureOptions, TDetail extends GestureDetail> implements GestureRecognizer<TOptions, TDetail> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<TOptions>} options The options used to detect and interpret gestures.
     * @param {GestureListener<TDetail>} listener The function invoked when semantic detail is emitted.
     */
    constructor(options?: Partial<TOptions>, listener?: GestureListener<TDetail>);
    /** @inheritdoc */
    get options(): TOptions;
    set options(value: Partial<TOptions>);
    /** Whether gesture recognition is disabled. */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** The default options used to detect and interpret gestures. */
    get defaultOptions(): TOptions;
    /** @inheritdoc */
    get eager(): boolean;
    /** @inheritdoc */
    canReceiveInput(input: GestureInput): boolean;
    /** @inheritdoc */
    shouldCapturePointer(_input: PointerInput): boolean;
    /** @inheritdoc */
    onInput(input: GestureInput): void;
    /** Processes input from a `pointerover` event. */
    protected _onPointerOver(_input: PointerInput): void;
    /** Processes input from a `pointerenter` event. */
    protected _onPointerEnter(_input: PointerInput): void;
    /** Processes input from a `pointerdown` event. */
    protected _onPointerDown(_input: PointerInput): void;
    /** Processes input from a `pointermove` event. */
    protected _onPointerMove(_input: PointerInput): void;
    /** Processes input from a `pointerup` event. */
    protected _onPointerUp(_input: PointerInput): void;
    /** Processes input from a `pointercancel` event. */
    protected _onPointerCancel(_input: PointerInput): void;
    /** Processes input from a `pointerout` event. */
    protected _onPointerOut(_input: PointerInput): void;
    /** Processes input from a `pointerleave` event. */
    protected _onPointerLeave(_input: PointerInput): void;
    /** Processes input from a `wheel` event. */
    protected _onWheel(_input: WheelInput): void;
    /** @inheritdoc */
    onDisposition?: GestureDispositionCallback | undefined;
    /**
     * Dispositions the specified input stream as accepted.
     * @param {number | readonly number[]} inputId The identifier(s) of the input stream to accepted.
     */
    protected _accept(inputId: number | readonly number[]): void;
    /**
     * Dispositions the specified input stream as rejected.
     * @param {number | readonly number[]} inputId The identifier(s) of the input stream to reject.
     */
    protected _reject(inputId: number | readonly number[]): void;
    /**
     * Dispositions the specified input stream as held.
     * @param {number} inputId The identifier of the input stream to hold.
     */
    protected _hold(inputId: number | readonly number[]): void;
    /**
     * Dispositions the specified input stream as released.
     * @param {number} inputId The identifier of the input stream to release.
     */
    protected _release(inputId: number | readonly number[]): void;
    /**
     * Dispositions the specified input stream as deferred.
     * @param {number} inputId The identifier of the input stream to defer.
     */
    protected _defer(inputId: number | readonly number[]): void;
    /**
     * Emits semantic detail about a recognized gesture.
     * @param {TDetail} detail The detail to emit.
     */
    protected _emit(detail: TDetail): void;
    /** @inheritdoc */
    addListener(listener: GestureListener<TDetail>): void;
    /** @inheritdoc */
    removeListener(listener: GestureListener<TDetail>): void;
    /** @inheritdoc */
    onResolution(inputId: number, resolution: GestureResolution): void;
    /**
     * Handles an accepted input stream.
     * @param {number} inputId The identifier of the accepted input stream.
     */
    protected abstract _onAccept(inputId: number): void;
    /**
     * Handles a rejected input stream.
     * @param {number} inputId The identifier of the rejected input stream.
     */
    protected abstract _onReject(inputId: number): void;
    /** @inheritdoc */
    abstract reset(): void;
}
//# sourceMappingURL=GestureRecognizerBase.d.ts.map