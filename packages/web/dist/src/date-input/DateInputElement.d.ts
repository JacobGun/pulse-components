import { CSSResultGroup, LitElement, PropertyValues } from "lit";
import { defaultValidationMessages, formValue, TimeParts, validate, ValidationMessages } from "@pulse/web/core";
import type { FormFieldControl } from "@pulse/web/form-field";
import { DateInputType } from "./DateInputType";
import { DateInputTimeFormat } from "./DateInputTimeFormat";
declare const M3eDateInputElement_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").DirtyMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").TouchedMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").RequiredMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").ConstraintValidationMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").FormAssociatedMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").ReadOnlyMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").DisabledMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").AttachInternalsMixin> & import("../core/shared/mixins/Constructor").Constructor & typeof LitElement;
/**
 * A segmented input for entering date and/or time values using a keyboard.
 *
 * @description
 * The `m3e-date-input` component provides a segmented input for editing
 * date and/or time values. It supports date-only, time-only, and combined date/time entry,
 * and integrates with `m3e-form-field`, `m3e-datepicker`, and `m3e-timepicker`. Each segment
 * is independently editable for precise, accessible, form-friendly interaction.
 *
 * @example
 * The following example shows the `m3e-date-input` used with `m3e-form-field` and `m3e-datepicker`.
 * ```html
 * <m3e-form-field>
 *  <label slot="label" for="fld1">Date Field</label>
 *  <m3e-date-input id="fld1"></m3e-date-input>
 *  <m3e-icon-button slot="suffix">
 *    <m3e-icon name="calendar_today"></m3e-icon>
 *    <m3e-datepicker-toggle for="picker"></m3e-datepicker-toggle>
 *  </m3e-icon-button>
 *  <span slot="hint">MM/DD/YYYY</span>
 * </m3e-form-field>
 * <m3e-datepicker id="picker" for="fld1"></m3e-datepicker>
 * ```
 *
 * @tag m3e-date-input
 *
 * @attr value - The value of the input.
 * @attr type - The interaction mode for editing date and/or time values.
 * @attr show-seconds - Whether to show seconds.
 * @attr time-format - Format used when editing time values.
 * @attr min-date - The minimum date that can be selected.
 * @attr max-date - The maximum date that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr max-time - The maximum time that can be selected.
 * @attr month-label - The accessible label given to the month segment.
 * @attr day-label - The accessible label given to the day segment.
 * @attr year-label - The accessible label given to the year segment.
 * @attr hour-label - The accessible label given to the hour segment.
 * @attr minute-label - The accessible label given to the minute segment.
 * @attr second-label - The accessible label given to the second segment.
 * @attr period-label - The accessible label given to the period segment (AM/PM).
 * @attr disabled - Whether the element is disabled.
 * @attr readonly - Whether the element is read-only.
 * @attr required - Whether a value is required for the element.
 * @attr name - The name that identifies the element when submitting the associated form.
 *
 * @fires beforeinput - Dispatched before the value changes.
 * @fires input - Dispatched when the value changes.
 * @fires change - Dispatched when the value changes.
 * @fires invalid - Dispatched when a form is submitted and the element fails constraint validation.
 *
 * @cssprop --m3e-date-input-color - Color of the date input text when enabled.
 * @cssprop --m3e-date-input-disabled-color - Color of the date input text when disabled.
 * @cssprop --m3e-date-input-disabled-opacity - Opacity applied to the disabled date input text.
 * @cssprop --m3e-date-input-focused-container-color - Background color of the selected date input segment when focused.
 * @cssprop --m3e-date-input-focused-color - Text color of the selected date input segment when focused.
 */
export declare class M3eDateInputElement extends M3eDateInputElement_base implements FormFieldControl {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /** @private */ _val: Date | null;
    /** @private */ private _activeField;
    /** @private */ private _value;
    /** @private */ private _buffer;
    /**
     * The value of the input.
     * @default null
     */
    get value(): Date | null;
    set value(value: Date | null);
    /** The interaction mode for editing date and/or time values. */
    type: DateInputType;
    /**
     * Whether to show seconds.
     * @default false
     */
    showSeconds: boolean;
    /**
     * Format used when editing time values.
     * @default "12"
     */
    timeFormat: DateInputTimeFormat;
    /**
     * The minimum date that can be selected.
     * @default null
     */
    minDate: Date | null;
    /**
     * The maximum date that can be selected.
     * @default null
     */
    maxDate: Date | null;
    /**
     * A function used to determine whether a date cannot be selected.
     * @default null
     */
    blackoutDates: ((date: Date) => boolean) | null;
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
    /**
     * The accessible label given to the month segment.
     * @default "Month"
     */
    monthLabel: string;
    /**
     * The accessible label given to the day segment.
     * @default "Day"
     */
    dayLabel: string;
    /**
     * The accessible label given to the year segment.
     * @default "Year"
     */
    yearLabel: string;
    /**
     * The accessible label given to the hour segment.
     * @default "Hour"
     */
    hourLabel: string;
    /**
     * The accessible label given to the minute segment.
     * @default "Minute"
     */
    minuteLabel: string;
    /**
     * The accessible label given to the second segment.
     * @default "Second"
     */
    secondLabel: string;
    /**
     * The accessible label given to the period segment (AM/PM).
     * @default "Period"
     */
    periodLabel: string;
    /** @inheritdoc @private */
    get [formValue](): string | File | FormData | null;
    /** @inheritdoc */
    get shouldLabelFloat(): boolean;
    /** @private */
    private get _isEmpty();
    /** @private */
    private get _isPartiallyEmpty();
    /** @inheritdoc */
    get [defaultValidationMessages](): Readonly<ValidationMessages>;
    /** @internal */
    [validate](): ValidityStateFlags | undefined;
    /** @inheritdoc */
    focus(options?: FocusOptions): void;
    /** @inheritdoc */
    blur(): void;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected render(): unknown;
}
export {};
//# sourceMappingURL=DateInputElement.d.ts.map