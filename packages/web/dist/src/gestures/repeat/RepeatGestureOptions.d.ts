import { GestureOptions } from "@pulse/web/gestures";
/** Encapsulates options used to detect and interpret repeated gestures. */
export interface RepeatGestureOptions extends GestureOptions {
    /**
     * Maximum allowed time (ms) between consecutive gesture occurrences.
     * @default 250
     */
    readonly maxInterval: number;
    /**
     * Number of times a gesture must be repeated.
     * @default 2
     */
    readonly count: number;
}
/** Defines the default options used to detect and interpret repeated gestures. */
export declare const DefaultRepeatGestureOptions: RepeatGestureOptions;
//# sourceMappingURL=RepeatGestureOptions.d.ts.map