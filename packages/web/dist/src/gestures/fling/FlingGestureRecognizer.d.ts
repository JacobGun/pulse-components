import { GestureDetail, GestureInput, GestureRecognizerBase, GestureRecognizerOptions, PointerInput } from "@m3e/web/gestures";
/**
 * Specifies the possible directions of a fling gesture.
 * - `left` — A fling with dominant movement toward the negative x‑axis.
 * - `right` — A fling with dominant movement toward the positive x‑axis.
 * - `up` — A fling with dominant movement toward the negative y‑axis.
 * - `down` — A fling with dominant movement toward the positive y‑axis.
 */
export type FlingGestureDirection = "left" | "right" | "up" | "down";
/**
 * Specifies the dominant axis of a fling gesture.
 * - `x` — The fling's primary movement occurs along the horizontal axis.
 * - `y` — The fling's primary movement occurs along the vertical axis.
 */
export type FlingGestureAxis = "x" | "y";
/** Encapsulates detail about a fling gesture. */
export interface FlingGestureDetail extends GestureDetail {
    /** Resolved fling direction. */
    readonly direction: FlingGestureDirection;
    /** Dominant axis of the fling. */
    readonly axis: FlingGestureAxis;
    /** Total movement distance (px) traveled by the pointer. */
    readonly distance: number;
    /** Velocity magnitude (px/ms). */
    readonly speed: number;
    /** Angle (radians) of movement. */
    readonly angle: number;
}
/** Encapsulates options used to recognize a fling gesture. */
export interface FlingGestureOptions extends GestureRecognizerOptions {
    /**
     * Minimum velocity (px/ms) required to recognize a fling.
     * @default 0.3
     */
    readonly minVelocity: number;
    /**
     * The allowed directions of the fling.
     * @default ["left", "right", "up", "down"]
     */
    readonly directions: readonly FlingGestureDirection[];
    /**
     * Minimum displacement (px) required before direction is considered valid.
     * @default 12
     */
    readonly directionThreshold: number;
    /**
     * Minimum distance (px) a pointer must move before the gesture can be recognized.
     * @default 24
     */
    readonly minDisplacement: number;
}
/** Recognizes a fling gesture. */
export declare class FlingGestureRecognizer extends GestureRecognizerBase<FlingGestureOptions, FlingGestureDetail> {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {Partial<FlingGestureOptions> | undefined} options Options used to recognize gestures.
     */
    constructor(options?: Partial<FlingGestureOptions>);
    /** @inheritdoc */
    protected get _defaultOptions(): Partial<FlingGestureOptions>;
    /** @inheritdoc */
    get eager(): boolean;
    /** @inheritdoc */
    shouldCapturePointer(input: PointerInput): boolean;
    /** @private */
    onInput(input: GestureInput): void;
    /** @inheritdoc */
    protected _onAcceptInput(id: number): void;
    /** @inheritdoc */
    protected _onRejectInput(): void;
    /** @inheritdoc */
    reset(): void;
}
//# sourceMappingURL=FlingGestureRecognizer.d.ts.map