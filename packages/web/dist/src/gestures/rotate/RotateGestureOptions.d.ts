import { GestureOptions } from "@pulse/web/gestures";
import { PanGestureActivationMode } from "@pulse/web/gestures/pan";
/** Encapsulates options used to detect and interpret rotate gestures. */
export interface RotateGestureOptions extends GestureOptions {
    /**
     * Number of pointers required for the gesture to be recognized.
     * @default 2
     */
    readonly pointers: number;
    /**
     * Mode in which to activate the gesture.
     * @default "press"
     */
    readonly activationMode: PanGestureActivationMode;
    /**
     * Minimum centroid displacement (px) before rotation starts.
     * @default 4
     */
    readonly minDisplacement: number;
    /**
     * Maximum allowed time (ms) between the earliest and latest press.
     * @default 120
     */
    readonly maxPressInterval: number;
}
/** Defines the default options used to detect and interpret rotate gestures. */
export declare const DefaultRotateGestureOptions: RotateGestureOptions;
//# sourceMappingURL=RotateGestureOptions.d.ts.map