import { PropertyValues } from "lit";
import { GestureElementBase } from "@pulse/web/gestures";
import { TapGestureDetail } from "./TapGestureDetail";
import { TapGestureOptions } from "./TapGestureOptions";
import { TapGestureRecognizer } from "./TapGestureRecognizer";
/**
 * A non-visual element used to detect and interpret tap gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-tap-gesture
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr pointers - Number of pointers required for the gesture to be recognized.
 * @attr max-displacement - Maximum allowed movement (px).
 * @attr max-duration - Maximum allowed press duration (ms).
 * @attr max-press-interval - Maximum allowed time (ms) between the earliest and latest press.
 * @attr max-release-interval - Maximum allowed time (ms) between the earliest and latest release.
 *
 * @fires gesture - Emitted when semantic detail about a gesture is detected.
 */
export declare class M3eTapGestureElement extends GestureElementBase<TapGestureOptions, TapGestureDetail> {
    /** @inheritdoc */
    readonly recognizer: TapGestureRecognizer;
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    pointers: number;
    /**
     * Maximum allowed press duration (ms).
     * @default 180
     */
    maxDuration: number;
    /**
     * Maximum allowed movement (px).
     * @default 12
     */
    readonly maxDisplacement: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    maxPressInterval: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest release.
     * @default 120
     */
    maxReleaseInterval: number;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
}
interface M3eTapGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<TapGestureDetail>;
}
export interface M3eTapGestureElement {
    addEventListener<K extends keyof M3eTapGestureElementEventMap>(type: K, listener: (this: M3eTapGestureElement, ev: M3eTapGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eTapGestureElementEventMap>(type: K, listener: (this: M3eTapGestureElement, ev: M3eTapGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-tap-gesture": M3eTapGestureElement;
    }
}
export {};
//# sourceMappingURL=TapGestureElement.d.ts.map