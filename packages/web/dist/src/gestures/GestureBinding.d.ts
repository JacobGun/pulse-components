import { GestureRecognizer } from "./GestureRecognizer";
/**
 * Binds an element to gesture recognizers.
 * @internal
 */
export declare class GestureBinding {
    #private;
    readonly element: HTMLElement;
    /**
     * Initializes new instance of this class.
     * @param {HTMLElement} element The element to bind for gesture input.
     */
    constructor(element: HTMLElement);
    /** Whether there are no recognizers registered with this binding. */
    get empty(): boolean;
    /**
     * Registers one or more recognizers with this binding.
     * @param {readonly GestureRecognizer[]} recognizers The recognizers to add.
     */
    addRecognizer(...recognizers: readonly GestureRecognizer[]): void;
    /**
     * Unregisters one or more recognizers from this binding.
     * @param {readonly GestureRecognizer[]} recognizers The recognizers to remove.
     */
    removeRecognizer(...recognizers: readonly GestureRecognizer[]): void;
    /** Resets the binding to its initial state. */
    reset(): void;
    /** Removes all recognizers and detaches all event listeners. */
    destroy(): void;
}
//# sourceMappingURL=GestureBinding.d.ts.map