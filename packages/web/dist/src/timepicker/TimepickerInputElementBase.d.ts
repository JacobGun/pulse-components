import { LitElement, PropertyValues } from "lit";
import { TimeParts } from "@pulse/web/core";
import { TimepickerFormat } from "./TimepickerFormat";
import { TimepickerView } from "./TimepickerView";
import { TimepickerPeriod } from "./TimepickerPeriod";
declare const TimepickerInputElementBase_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").AttachInternalsMixin> & typeof LitElement;
/** A base implementation for an element used to input time. This class must be inherited. */
export declare class TimepickerInputElementBase extends TimepickerInputElementBase_base {
    #private;
    /**
     * The hour, in 24-hour time, from 0..23.
     * @default null
     */
    get hour(): number | null;
    set hour(value: number | null);
    /**
     * The minute, from 0..59.
     * @default null
     */
    get minute(): number | null;
    set minute(value: number | null);
    /**
     * The second, from 0..59.
     * @default null
     */
    get second(): number | null;
    set second(value: number | null);
    /**
     * Whether to use a 12‑hour or 24‑hour clock.
     * @default "12"
     */
    format: TimepickerFormat;
    /**
     * The view used to input time.
     * @default "hour"
     */
    view: TimepickerView;
    /**
     * The 12-hour time period.
     * @default "am"
     */
    period: TimepickerPeriod;
    /**
     * Whether to show seconds.
     * @default false
     */
    showSeconds: boolean;
    /**
     * The minimum time that can be selected.
     * @default null
     */
    minTime: TimeParts | null;
    /**
     * The maximum time that can be selected.
     * @default null
     */
    maxTime: TimeParts | null;
    /** A function used to determine whether a time cannot be selected. */
    blackoutTimes?: (time: TimeParts) => boolean;
    /** The hour in 12‑hour time from 1..12. */
    get hourOfPeriod(): number | null;
    set hourOfPeriod(value: number | null);
    /** The current time format. */
    get currentFormat(): Exclude<TimepickerFormat, "auto">;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
    /**
     * Determines whether the given hour is disabled.
     * @param {number} hour The hour to test.
     * @returns {boolean} Whether `hour` is disabled.
     */
    isHourDisabled(hour: number): boolean;
    /**
     * Determines whether the given minute of an hour is disabled.
     * @param {number} hour The hour to test.
     * @param {number} minute The minute to test.
     * @returns {boolean} Whether `minute` is disabled for `hour`.
     */
    isMinuteDisabled(hour: number, minute: number): boolean;
    /**
     * Determines whether a given hour, minute, and second is disabled.
     * @param {number} hour The hour to test.
     * @param {number} minute The minute to test.
     * @param {number} second The second to test.
     * @returns {boolean} Whether `hour`, `minute`, and `second` is disabled.
     */
    isSecondDisabled(hour: number, minute: number, second: number): boolean;
}
export {};
//# sourceMappingURL=TimepickerInputElementBase.d.ts.map