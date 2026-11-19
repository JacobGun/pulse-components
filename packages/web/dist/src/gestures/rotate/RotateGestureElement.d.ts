import { PropertyValues } from "lit";
import { GestureElementBase } from "@pulse/web/gestures";
import { PanGestureActivationMode } from "@pulse/web/gestures/pan";
import { RotateGestureDetail } from "./RotateGestureDetail";
import { RotateGestureOptions } from "./RotateGestureOptions";
import { RotateGestureRecognizer } from "./RotateGestureRecognizer";
/**
 * A non-visual element used to detect and interpret rotate gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-rotate-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr activation-mode - Mode in which to activate the gesture.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr min-displacement - Minimum centroid displacement (px) before rotation starts.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a gesture is detected.
 */
export declare class M3eRotateGestureElement extends GestureElementBase<RotateGestureOptions, RotateGestureDetail> {
    /** @inheritdoc */
    readonly recognizer: RotateGestureRecognizer;
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 2
     */
    pointers: number;
    /**
     * Mode in which to activate the gesture.
     * @default "press"
     */
    activationMode: PanGestureActivationMode;
    /**
     * Minimum centroid displacement (px) before rotation starts.
     * @default 4
     */
    minDisplacement: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    maxPressInterval: number;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
}
interface M3eRotateGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<RotateGestureDetail>;
}
export interface M3eRotateGestureElement {
    addEventListener<K extends keyof M3eRotateGestureElementEventMap>(type: K, listener: (this: M3eRotateGestureElement, ev: M3eRotateGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eRotateGestureElementEventMap>(type: K, listener: (this: M3eRotateGestureElement, ev: M3eRotateGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-rotate-gesture": M3eRotateGestureElement;
    }
}
export {};
//# sourceMappingURL=RotateGestureElement.d.ts.map