import { GestureRecognizer } from "./GestureRecognizer";
/**
 * Resolves competing claims on input and issues resolutions to recognizers.
 * @internal
 */
export declare class GestureResolver {
    #private;
    /** The recognizers registered to the resolver. */
    get recognizers(): readonly GestureRecognizer[];
    /**
     * Registers a recognizer with the resolver.
     * @param {GestureRecognizer}  recognizer The recognizer to register with the resolver.
     */
    addRecognizer(recognizer: GestureRecognizer): void;
    /**
     * Unregisters a recognizer from the resolver.
     * @param {GestureRecognizer} recognizer The recognizer to unregister from the resolver.
     */
    removeRecognizer(recognizer: GestureRecognizer): void;
    /**
     * Resolves outstanding dispositions for the given input stream.
     * @param {number} inputId The identifier of the input stream to resolve.
     */
    resolve(inputId: number): void;
    /** Clears any dispositions on input . */
    clear(): void;
    /** Removes all recognizers and clears any dispositions on input. */
    destroy(): void;
}
//# sourceMappingURL=GestureResolver.d.ts.map