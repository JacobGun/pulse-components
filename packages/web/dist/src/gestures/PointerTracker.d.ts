import { PointerInput } from "./GestureInput";
/** Describes semantic motion metrics derived from a sequence of pointer input samples. */
export interface PointerGestureDetail {
    /** Horizontal viewport coordinate of the initial input sample. */
    readonly startClientX: number;
    /** Vertical viewport coordinate of the initial input sample. */
    readonly startClientY: number;
    /** Element-relative horizontal coordinate of the initial input sample. */
    readonly startLocalX: number;
    /** Element-relative vertical coordinate of the initial input sample. */
    readonly startLocalY: number;
    /** Horizontal viewport coordinate of the most recent input sample. */
    readonly clientX: number;
    /** Vertical viewport coordinate of the most recent input sample. */
    readonly clientY: number;
    /** Element-relative horizontal coordinate of the most recent input sample. */
    readonly localX: number;
    /** Element-relative vertical coordinate of the most recent input sample. */
    readonly localY: number;
    /** Incremental horizontal movement (px) between the last two samples. */
    readonly deltaX: number;
    /** Incremental vertical movement (px) between the last two samples. */
    readonly deltaY: number;
    /** Incremental displacement (px), computed as the Euclidean magnitude of incremental movement. */
    readonly displacement: number;
    /** Total horizontal movement (px) from the initial sample. */
    readonly totalDeltaX: number;
    /** Total vertical movement (px) from the initial sample. */
    readonly totalDeltaY: number;
    /** Total displacement (px), computed as the Euclidean magnitude of total movement. */
    readonly totalDisplacement: number;
    /** Dominant axis of movement. */
    readonly axis: "x" | "y";
    /** Instantaneous horizontal velocity (px/ms). */
    readonly velocityX: number;
    /** Instantaneous vertical velocity (px/ms). */
    readonly velocityY: number;
    /** Horizontal movement direction (-1, 0, or 1). */
    readonly directionX: number;
    /** Vertical movement direction (-1, 0, or 1). */
    readonly directionY: number;
    /** Magnitude of the velocity vector. */
    readonly speed: number;
    /** Movement angle (radians), computed from total displacement. */
    readonly angle: number;
    /** Total duration (ms) from the initial sample. */
    readonly duration: number;
    /** Duration (ms) between the last two samples. */
    readonly deltaTime: number;
}
/**
 * Tracks pointer input samples and produces semantic motion metrics for gesture recognition.
 * @template PointerInput The type of pointer input sample.
 */
export declare class PointerTracker {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {PointerInput} initial The initial pointer input sample.
     * @param {number} [maxSamples=20] The maximum number of samples to retain.
     */
    constructor(initial: PointerInput, maxSamples?: number);
    /** The most recent input sample. */
    get current(): PointerInput;
    /** Semantic motion metrics derived from tracked samples. */
    get detail(): PointerGestureDetail;
    /**
     * Appends a new pointer input sample to the tracker.
     * @param {PointerInput} sample The pointer input sample to append.
     */
    append(sample: PointerInput): void;
    /**
     * Computes the average position of all pointers and produces motion metrics as if the
     * group of pointers were a single virtual pointer.
     * @param trackers The pointer trackers contributing to the centroid.
     * @returns A {@link PointerGestureDetail} describing centroid motion.
     */
    static centroid(...trackers: PointerTracker[]): PointerGestureDetail;
}
//# sourceMappingURL=PointerTracker.d.ts.map