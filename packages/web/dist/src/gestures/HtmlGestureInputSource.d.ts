import { GestureInput } from "./GestureInput";
import { GestureInputSource } from "./GestureInputSource";
/**
 * Provides input from an HTML element for gesture detection.
 * @internal
 */
export declare class HtmlGestureInputSource implements GestureInputSource {
    #private;
    /**
     * Initializes a new instance of this class.
     * @param {HTMLElement} element The element from which to provide a source of input for gesture detection.
     */
    constructor(element: HTMLElement);
    /** @inheritdoc */
    onInput?: (input: GestureInput) => void;
    /** Destroys the input source. */
    destroy(): void;
}
//# sourceMappingURL=HtmlGestureInputSource.d.ts.map