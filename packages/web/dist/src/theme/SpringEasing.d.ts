import type { MotionScheme } from "./MotionScheme";
/** A spring of a motion scheme. */
export interface MotionSchemeSpring {
    /** The damping ratio. */
    readonly damping: number;
    /** The stiffness, for a unit mass. */
    readonly stiffness: number;
    /** The duration, in milliseconds, of the equivalent CSS transition. */
    readonly duration: number;
}
/**
 * The springs of each motion scheme, keyed by `--md-sys-motion-spring-*` token name. Damping ratio and stiffness are
 * those of Compose Material 3 (`StandardMotionTokens`, `ExpressiveMotionTokens`); durations are those of the
 * "Web: Convert springs to curves" table of the Material 3 motion specs.
 */
export declare const MotionSchemeSprings: Readonly<Record<MotionScheme, Readonly<Record<string, MotionSchemeSpring>>>>;
/**
 * Determines whether the browser supports the CSS `linear()` easing function.
 * @returns {boolean} Whether `linear()` is supported.
 */
export declare function supportsLinearEasing(): boolean;
/**
 * Returns the position of a unit-mass spring released from rest toward its target.
 * @param {number} damping The damping ratio.
 * @param {number} stiffness The stiffness.
 * @param {number} time The time, in milliseconds, since release.
 * @returns {number} The position, where 0 is the start and 1 is the target.
 */
export declare function springStep(damping: number, stiffness: number, time: number): number;
/**
 * Generates a CSS `linear()` easing function that follows the step response of a spring over a duration.
 * @param {number} damping The damping ratio.
 * @param {number} stiffness The stiffness, for a unit mass.
 * @param {number} duration The duration, in milliseconds.
 * @returns {string} The `linear()` easing function.
 */
export declare function springEasing(damping: number, stiffness: number, duration: number): string;
//# sourceMappingURL=SpringEasing.d.ts.map