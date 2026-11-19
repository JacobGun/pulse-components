import { PropertyValues } from "lit";
import { GestureElementBase } from "@pulse/web/gestures";
import { PanGestureDetail } from "./PanGestureDetail";
import { PanGestureActivationMode, PanGestureLockAxis, PanGestureOptions } from "./PanGestureOptions";
import { PanGestureRecognizer } from "./PanGestureRecognizer";
/**
 * A non-visual element used to detect and interpret pan gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-pan-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr activation-mode - Mode in which to activate the gesture.
 * @attr min-displacement - Minimum distance (px) a pointer can move before the gesture starts.
 * @attr lock-axis - Locks movement to an axis.
 * @attr axis-threshold - Minimum total displacement (px) required before axis locking resolves.
 * @attr delta-threshold - Minimum incremental movement (px) on the secondary axis required before emitting detail for a locked axis.
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 *
 * @fires gesture - Emitted when semantic detail about a pan gesture is detected.
 */
export declare class M3ePanGestureElement extends GestureElementBase<PanGestureOptions, PanGestureDetail> {
    /** @inheritdoc */
    readonly recognizer: PanGestureRecognizer;
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    pointers: number;
    /**
     * Mode in which to activate the gesture.
     * @default "press"
     */
    activationMode: PanGestureActivationMode;
    /**
     * Minimum distance (px) a pointer can move before the gesture starts.
     * @default 4
     */
    minDisplacement: number;
    /**
     * Locks movement to an axis.
     * @default "none"
     */
    lockAxis: PanGestureLockAxis;
    /**
     * Minimum total displacement (px) required before axis locking resolves orientation.
     * @default 8
     */
    axisThreshold: number;
    /**
     * Minimum incremental movement (px) on the secondary axis required before emitting detail for a locked axis.
     * @default 0
     */
    deltaThreshold: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    maxPressInterval: number;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
}
interface M3ePanGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<PanGestureDetail>;
}
export interface M3ePanGestureElement {
    addEventListener<K extends keyof M3ePanGestureElementEventMap>(type: K, listener: (this: M3ePanGestureElement, ev: M3ePanGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3ePanGestureElementEventMap>(type: K, listener: (this: M3ePanGestureElement, ev: M3ePanGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-pan-gesture": M3ePanGestureElement;
    }
}
export {};
//# sourceMappingURL=PanGestureElement.d.ts.map