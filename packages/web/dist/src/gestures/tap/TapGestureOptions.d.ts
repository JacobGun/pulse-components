import { GestureOptions } from "@pulse/web/gestures";
/** Encapsulates options used to detect and interpret tap gestures. */
export interface TapGestureOptions extends GestureOptions {
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 1
     */
    readonly pointers: number;
    /**
     * Maximum allowed press duration (ms).
     * @default 180
     */
    readonly maxDuration: number;
    /**
     * Maximum allowed movement (px).
     * @default 12
     */
    readonly maxDisplacement: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    readonly maxPressInterval: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest release.
     * @default 120
     */
    readonly maxReleaseInterval: number;
}
/** Defines the default options used to detect and interpret tap gestures. */
export declare const DefaultTapGestureOptions: TapGestureOptions;
//# sourceMappingURL=TapGestureOptions.d.ts.map