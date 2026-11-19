import { PropertyValues } from "lit";
import { GestureElementBase } from "@m3e/web/gestures";
import { FlingGestureDetail, FlingGestureDirection, FlingGestureOptions } from "./FlingGestureRecognizer";
/**
 * A non-visual element used to detect a fling gesture for an associated element.
 * @tag m3e-fling-gesture
 *
 * @example
 * The following example illustrates detecting fling gestures on an element using `<m3e-fling-gesture>`.
 * Use the `for` attribute to bind the gesture recognizer to a target element:
 *
 * ```html
 * <div id="div1"></div>
 * <m3e-fling-gesture for="div1"></m3e-fling-gesture>
 * ```
 *
 * Listen for the `gesture` event to handle detected fling gestures:
 *
 * ```ts
 * const recognizer = document.querySelector("m3e-fling-gesture");
 *
 * recognizer.addEventListener("gesture", e => {
 *   const detail = e.detail;
 *
 *   // Current direction
 *   console.log(detail.direction);
 * });
 * ```
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr min-displacement - * Minimum distance (px) a pointer must move before the gesture can be recognized.
 * @attr min-velocity - Minimum velocity (px/ms) required to recognize a fling.
 * @attr direction-threshold - Minimum displacement (px) required before direction is considered valid.
 * @attr directions - The allowed directions of the fling.
 *
 * @fires gesture - Emitted when a fling gesture is recognized.
 */
export declare class M3eFlingGestureElement extends GestureElementBase<FlingGestureOptions> {
    constructor();
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
     * The allowed directions of the fling.
     * @default ["left", "right", "up", "down"]
     */
    directions: readonly FlingGestureDirection[];
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
}
interface M3eFlingGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<FlingGestureDetail>;
}
export interface M3eFlingGestureElement {
    addEventListener<K extends keyof M3eFlingGestureElementEventMap>(type: K, listener: (this: M3eFlingGestureElement, ev: M3eFlingGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eFlingGestureElementEventMap>(type: K, listener: (this: M3eFlingGestureElement, ev: M3eFlingGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-fling-gesture": M3eFlingGestureElement;
    }
}
export {};
//# sourceMappingURL=FlingGestureElement.d.ts.map