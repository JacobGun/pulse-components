import { PropertyValues } from "lit";
import { GestureElementBase } from "@pulse/web/gestures";
import { SequenceGestureRecognizer } from "./SequenceGestureRecognizer";
import { SequenceGestureOptions } from "./SequenceGestureOptions";
import { SequenceGestureDetail } from "./SequenceGestureDetail";
/**
 * A non-visual element used to detect and interpret a sequence of gestures from an input stream
 * produced from an attached element.
 *
 * @tag m3e-sequence-gesture
 *
 * @slot - The gestures that make up the sequence.
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr buttons - Which buttons can be pressed.
 * @attr pointer-types - Which types of pointers can be used to recognize gestures.
 * @attr disabled - Whether gesture recognition is disabled.
 * @attr priority - The priority in which to recognize gestures.
 * @attr max-interval - Maximum allowed time (ms) between each gesture in the sequence.
 *
 * @fires gesture - Emitted when semantic detail about a sequence of gestures is detected.
 */
export declare class M3eSequenceGestureElement extends GestureElementBase<SequenceGestureOptions, SequenceGestureDetail> {
    #private;
    /** @inheritdoc */
    readonly recognizer: SequenceGestureRecognizer;
    /**
     * Maximum allowed time (ms) between each gesture in the sequence.
     * @default 250
     */
    maxInterval: number;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected render(): unknown;
}
interface M3eSequenceGestureElementEventMap extends HTMLElementEventMap {
    gesture: CustomEvent<SequenceGestureDetail>;
}
export interface M3eSequenceGestureElement {
    addEventListener<K extends keyof M3eSequenceGestureElementEventMap>(type: K, listener: (this: M3eSequenceGestureElement, ev: M3eSequenceGestureElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eSequenceGestureElementEventMap>(type: K, listener: (this: M3eSequenceGestureElement, ev: M3eSequenceGestureElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-sequence-gesture": M3eSequenceGestureElement;
    }
}
export {};
//# sourceMappingURL=SequenceGestureElement.d.ts.map