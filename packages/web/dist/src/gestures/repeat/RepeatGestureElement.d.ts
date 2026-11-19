import { PropertyValues } from "lit";
import { GestureElementBase } from "@pulse/web/gestures";
import { RepeatGestureRecognizer } from "./RepeatGestureRecognizer";
import { RepeatGestureOptions } from "./RepeatGestureOptions";
import { RepeatGestureDetail } from "./RepeatGestureDetail";
/**
 * A non-visual element used to detect and interpret repeated gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-repeat-gesture
 *
 * @slot - The gesture to repeat.
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr max-interval - Maximum allowed time (ms) between consecutive gesture occurrences.
 * @attr count - Number of times a gesture must be repeated.
 *
 * @fires gesture - Emitted when semantic detail about a repeated gesture is detected.
 */
export declare class M3eRepeatGestureElement extends GestureElementBase<RepeatGestureOptions, RepeatGestureDetail> {
    #private;
    /** @inheritdoc */
    readonly recognizer: RepeatGestureRecognizer<import("@pulse/web/gestures").GestureDetail>;
    /**
     * Maximum allowed time (ms) between consecutive gesture occurrences.
     * @default 250
     */
    maxInterval: number;
    /**
     * Number of times a gesture must be repeated.
     * @default 2
     */
    count: number;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected render(): unknown;
}
interface M3eRepeatGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<RepeatGestureDetail>;
}
export interface M3eRepeatGestureElement {
    addEventListener<K extends keyof M3eRepeatGestureElementEventMap>(type: K, listener: (this: M3eRepeatGestureElement, ev: M3eRepeatGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eRepeatGestureElementEventMap>(type: K, listener: (this: M3eRepeatGestureElement, ev: M3eRepeatGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-repeat-gesture": M3eRepeatGestureElement;
    }
}
export {};
//# sourceMappingURL=RepeatGestureElement.d.ts.map