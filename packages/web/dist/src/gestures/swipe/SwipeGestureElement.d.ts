import { PropertyValues } from "lit";
import { GestureElementBase } from "@pulse/web/gestures";
import { SwipeGestureRecognizer } from "./SwipeGestureRecognizer";
import { SwipeGestureDetail } from "./SwipeGestureDetail";
import { SwipeGestureDirection, SwipeGestureOptions } from "./SwipeGestureOptions";
/**
 * A non-visual element used to detect and interpret swipe gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-swipe-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr start-threshold - Minimum distance (px) a pointer must move before the gesture starts.
 * @attr min-displacement - * Minimum distance (px) a pointer must move before the gesture can be recognized.
 * @attr min-velocity - Minimum velocity (px/ms) required to recognize a swipe.
 * @attr direction-threshold - Minimum displacement (px) required before direction is considered valid.
 * @attr direction-grace-period - Maximum amount of time (ms) a pointer can move in an uncommitted or
 * disallowed direction before the gesture is rejected.
 * @attr directions - The allowed directions of the swipe.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a swipe gesture is detected.
 */
export declare class M3eSwipeGestureElement extends GestureElementBase<SwipeGestureOptions, SwipeGestureDetail> {
    /** @inheritdoc */
    readonly recognizer: SwipeGestureRecognizer;
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    pointers: number;
    /**
     * Minimum distance (px) a pointer must move before the gesture starts.
     * @default 4
     */
    startThreshold: number;
    /**
     * * Minimum distance (px) a pointer must move before the gesture can be recognized.
     * @default 12
     */
    minDisplacement: number;
    /**
     * Minimum velocity (px/ms) required before the gesture fails.
     * @default 0.3
     */
    minVelocity: number;
    /**
     * Minimum displacement (px) required before direction is considered valid.
     * @default 12
     */
    directionThreshold: number;
    /**
     * Maximum amount of time (ms) a pointer can move in an uncommitted or
     * disallowed direction before the gesture is rejected. When set to 0,
     * early‑direction rejection is disabled.
     * @default 0
     */
    directionGracePeriod: number;
    /**
     * The allowed directions of the swipe.
     * @default ["left", "right", "up", "down"]
     */
    directions: readonly SwipeGestureDirection[];
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    maxPressInterval: number;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
}
interface M3eSwipeGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<SwipeGestureDetail>;
}
export interface M3eSwipeGestureElement {
    addEventListener<K extends keyof M3eSwipeGestureElementEventMap>(type: K, listener: (this: M3eSwipeGestureElement, ev: M3eSwipeGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eSwipeGestureElementEventMap>(type: K, listener: (this: M3eSwipeGestureElement, ev: M3eSwipeGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-swipe-gesture": M3eSwipeGestureElement;
    }
}
export {};
//# sourceMappingURL=SwipeGestureElement.d.ts.map