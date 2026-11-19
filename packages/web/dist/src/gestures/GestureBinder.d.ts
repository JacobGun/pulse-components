import { GestureRecognizer } from "./GestureRecognizer";
/**
 * Binds elements to recognizers responsible for detecting gestures.
 * @internal
 */
export declare class GestureBinder {
    #private;
    /**
     * Binds one or more gesture recognizers to an element.
     * @param {HTMLElement} element The element to which to bind a recognizer.
     * @param {readonly GestureRecognizer[]} recognizers The recognizers to bind to the specified element.
     */
    static bind(element: HTMLElement, ...recognizers: readonly GestureRecognizer[]): void;
    /**
     * Removes one or more gesture recognizers from an element.
     * @param {HTMLElement} element The element from which to remove a recognizer.
     * @param {readonly GestureRecognizer[]} recognizers The recognizers to remove from the specified element.
     */
    static unbind(element: HTMLElement, ...recognizers: readonly GestureRecognizer[]): void;
}
//# sourceMappingURL=GestureBinder.d.ts.map