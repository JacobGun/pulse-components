import { ComplexAttributeConverter } from "lit";
/** Represents a clock time with no date, timezone, or offset, in 24‑hour format. */
export interface TimeParts {
    /** The hour, in 24-hour time, from 0..23. */
    hour: number;
    /** The minute, from 0..59. */
    minute: number;
    /** The second, from 0..59. */
    second: number;
}
/** Converts a time string (24h "HH:mm" or "HH:mm:ss",
 *  or 12h "h:mm am/pm" or "h:mm:ss am/pm")
 *  to and from a { hour, minute, second } object.
 */
export declare const timeConverter: ComplexAttributeConverter<TimeParts | null, string | null>;
//# sourceMappingURL=timeConverter.d.ts.map