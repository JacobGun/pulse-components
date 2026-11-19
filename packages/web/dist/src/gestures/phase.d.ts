import { GestureDetail } from "./GestureDetail";
import { GestureListener } from "./GestureRecognizer";
/**
 * Defines handlers for individual gesture phases.
 * @template TDetail The type of semantic detail emitted for a gesture.
 */
export interface GesturePhaseHandlers<TDetail extends GestureDetail> {
    /** Invoked when initial conditions are satisfied and the gesture begins. */
    onStart?: GestureListener<TDetail>;
    /** Invoked when the interaction continues and the gesture has changed or progressed. */
    onUpdate?: GestureListener<TDetail>;
    /** Invoked when the interaction completes the gesture. */
    onEnd?: GestureListener<TDetail>;
    /** Invoked when the gesture has failed or been interrupted. */
    onCancel?: GestureListener<TDetail>;
}
/**
 * Creates a gesture listener that dispatches semantic detail about a gesture to phase-specific handlers.
 * @template TDetail The type of semantic detail emitted for a gesture.
 * @param {GesturePhaseHandlers<TDetail>} handlers The phase-specific handlers to invoke.
 * @returns {GestureListener<TDetail>} A listener that forwards gesture detail to the matching phase handler.
 */
export declare function phase<TDetail extends GestureDetail>(handlers: GesturePhaseHandlers<TDetail>): GestureListener<TDetail>;
//# sourceMappingURL=phase.d.ts.map