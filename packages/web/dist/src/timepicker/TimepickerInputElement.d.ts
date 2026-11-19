import { CSSResultGroup, PropertyValues } from "lit";
import { TimepickerOrientation } from "./TimepickerOrientation";
import { TimepickerInputElementBase } from "./TimepickerInputElementBase";
import "./TimepickerInputPeriodToggleElement";
declare const M3eTimepickerInputElement_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").HtmlForMixin> & typeof TimepickerInputElementBase;
/**
 * A keyboard‑based time surface for choosing hours and minutes.
 * @description
 * The `m3e-timepicker-input` component provides a keyboard-focused time
 * entry surface, allowing users to type or navigate hour and minute fields,
 * toggle AM/PM, and receive accessible validation feedback.
 *
 * @tag m3e-timepicker-input
 *
 * @attr format - Whether to use a 12‑hour or 24‑hour clock.
 * @attr hide-labels - Whether to hide field labels.
 * @attr hour - The hour, in 24-hour time, from 0..23.
 * @attr max-time - The maximum time that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr minute - The minute, from 0..59.
 * @attr second - The second, from 0..59.
 * @attr show-seconds - Whether to show seconds.
 * @attr orientation - The orientation of the input.
 * @attr period - The 12-hour time period.
 * @attr view - The view used to input time.
 * @attr hour-label - The label for the hour field.
 * @attr minute-label - The label for the minute field.
 * @attr second-label - The label for the second field.
 * @attr period-toggle-label - The accessible label given to the period toggle.
 *
 * @fires change - Dispatched when the selected time changes.
 * @fires view-change - Dispatched when the view changes.
 *
 * @cssprop --m3e-timepicker-input-field-container-width - Width of the input field container.
 * @cssprop --m3e-timepicker-input-field-height - Height of the input fields.
 * @cssprop --m3e-timepicker-input-field-container-shape - Corner radius of the input field container.
 * @cssprop --m3e-timepicker-input-field-font-size - Font size of the input field text.
 * @cssprop --m3e-timepicker-input-field-font-weight - Font weight of the input field text.
 * @cssprop --m3e-timepicker-input-field-line-height - Line height of the input field text.
 * @cssprop --m3e-timepicker-input-field-tracking - Letter spacing of the input field text.
 * @cssprop --m3e-timepicker-input-field-label-unselected-color - Text color of unselected input field labels.
 * @cssprop --m3e-timepicker-input-field-unselected-container-color - Background color of unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-hover-state-layer-color - State layer color on hover for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-focus-state-layer-color - State layer color on focus for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-pressed-state-layer-color - State layer color on pressed for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-label-selected-color - Text color of selected input field labels.
 * @cssprop --m3e-timepicker-input-field-selected-container-color - Background color of selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-hover-state-layer-color - State layer color on hover for selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-focus-state-layer-color - State layer color on focus for selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-pressed-state-layer-color - State layer color on pressed for selected input fields.
 * @cssprop --m3e-timepicker-input-field-label-invalid-color - Text color of invalid input field labels.
 * @cssprop --m3e-timepicker-input-field-invalid-container-color - Background color of invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-hover-state-layer-color - State layer color on hover for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-focus-state-layer-color - State layer color on focus for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-pressed-state-layer-color - State layer color on pressed for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-supporting-text-color - Text color of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-font-size - Font size of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-font-weight - Font weight of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-line-height - Line height of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-tracking - Letter spacing of supporting labels.
 * @cssprop --m3e-timepicker-input-field-separator-width - Width of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-color - Color of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-font-size - Font size of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-font-weight - Font weight of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-tracking - Letter spacing of the field separator.
 * @cssprop --m3e-timepicker-input-horizontal-period-toggle-space - Space between the fields and period toggle in horizontal orientation.
 * @cssprop --m3e-timepicker-input-vertical-period-toggle-space - Space between the fields and period toggle in vertical orientation.
 */
export declare class M3eTimepickerInputElement extends M3eTimepickerInputElement_base {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /**
     * The orientation of the input.
     * @default "horizontal"
     */
    orientation: Exclude<TimepickerOrientation, "auto">;
    /**
     * Whether to hide field labels.
     * @default false
     */
    hideLabels: boolean;
    /**
     * The label for the hour field.
     * @default "Hour"
     */
    hourLabel: string;
    /**
     * The label for the minute field.
     * @default "Minute"
     */
    minuteLabel: string;
    /**
     * The label for the second field.
     * @default "Second"
     */
    secondLabel: string;
    /**
     * The accessible label given to the period toggle.
     * @default "AM or PM"
     */
    periodToggleLabel: string;
    /** @inheritdoc */
    attach(control: HTMLElement): void;
    /** @inheritdoc */
    detach(): void;
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected render(): unknown;
}
interface M3eTimepickerInputElementEventMap extends HTMLElementEventMap {
    "view-change": CustomEvent;
}
export interface M3eTimepickerInputElement {
    addEventListener<K extends keyof M3eTimepickerInputElementEventMap>(type: K, listener: (this: M3eTimepickerInputElement, ev: M3eTimepickerInputElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eTimepickerInputElementEventMap>(type: K, listener: (this: M3eTimepickerInputElement, ev: M3eTimepickerInputElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-timepicker-input": M3eTimepickerInputElement;
    }
}
export {};
//# sourceMappingURL=TimepickerInputElement.d.ts.map