import { GestureOptions } from "@pulse/web/gestures";
/** Encapsulates options used to detect and interpret a sequence of gestures. */
export interface SequenceGestureOptions extends GestureOptions {
    /**
     * Maximum allowed time (ms) between each gesture in the sequence.
     * @default 250
     */
    readonly maxInterval: number;
}
/** Defines the default options used to detect and interpret a sequence of gestures. */
export declare const DefaultSequenceGestureOptions: SequenceGestureOptions;
//# sourceMappingURL=SequenceGestureOptions.d.ts.map