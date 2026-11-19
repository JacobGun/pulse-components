import { CSSResultGroup, LitElement, PropertyValues } from "lit";
import { TimeParts } from "@pulse/web/core";
import "@pulse/web/core/a11y";
import "@pulse/web/button";
import "@pulse/web/icon-button";
import { TimepickerVariant } from "./TimepickerVariant";
import { TimepickerMode } from "./TimepickerMode";
import { TimepickerOrientation } from "./TimepickerOrientation";
import { TimepickerFormat } from "./TimepickerFormat";
import "./TimepickerDialElement";
import "./TimepickerInputElement";
declare const M3eTimepickerElement_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").HtmlForMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").SuppressInitialAnimationMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").ReconnectedCallbackMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").AttachInternalsMixin> & import("../core/shared/mixins/Constructor").Constructor & typeof LitElement;
/**
 * Presents a time picker on a temporary surface.
 * @description
 * The `m3e-timepicker` component provides a time-selection experience consistent
 * with Material 3 guidance for layout, motion, and accessibility. It displays a
 * temporary surface that allows users to choose a time using both keyboard-based
 * input and clock-face dial controls.
 *
 * While open, the picker ensures users can review their selection and complete
 * the interaction through confirm, dismiss, or toggle actions, making updates
 * intentional and accessible.
 *
 * It accepts and emits plain `Date` values, allowing applications to apply their
 * own formatting, parsing, and localization.
 *
 * @tag m3e-timepicker
 *
 * @attr variant - The appearance variant of the picker.
 * @attr mode - The mode in which to select time.
 * @attr orientation - The orientation of the picker.
 * @attr date - The selected date.
 * @attr format - Whether to use a 12‑hour or 24‑hour clock.
 * @attr max-time - The maximum time that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr show-seconds - Whether to show seconds.
 * @attr confirm-label - Label given to the button used apply the selected date and close the picker.
 * @attr dismiss-label - Label given to the button used discard the selected date and close the picker.
 * @attr dial-label - Label given to the the picker when in dial mode.
 * @attr input-label - Label given to the the picker when in input mode.
 * @attr hour-label - Label for the hour field.
 * @attr minute-label - Label for the minute field.
 * @attr second-label - Label for the second field.
 * @attr mode-toggle-label - The accessible label given to the mode toggle button.
 * @attr hide-mode-toggle - Whether to hide the mode toggle button.
 * @attr period-toggle-label - The accessible label given to the period toggle.
 *
 * @fires change - Dispatched when the selected time is confirmed.
 * @fires beforetoggle - Dispatched before the picker toggles.
 * @fires toggle - Dispatched when the picker toggles.
 *
 * @cssprop --m3e-timepicker-container-padding-block - Block padding inside the picker container.
 * @cssprop --m3e-timepicker-container-padding-inline - Inline padding inside the picker container.
 * @cssprop --m3e-timepicker-container-color - Background color of the picker container.
 * @cssprop --m3e-timepicker-container-elevation - Box shadow / elevation of the picker container.
 * @cssprop --m3e-timepicker-docked-container-color - Background color of the docked picker container.
 * @cssprop --m3e-timepicker-docked-container-shape - Border radius of the docked picker container.
 * @cssprop --m3e-timepicker-modal-container-color - Background color of the modal picker container.
 * @cssprop --m3e-timepicker-modal-container-shape - Border radius of the modal picker container.
 * @cssprop --m3e-timepicker-headline-color - Color of the headline.
 * @cssprop --m3e-timepicker-headline-font-size - Font size of the headline.
 * @cssprop --m3e-timepicker-headline-font-weight - Font weight of the headline.
 * @cssprop --m3e-timepicker-headline-line-height - Line height of the headline.
 * @cssprop --m3e-timepicker-headline-tracking - Letter spacing of the headline.
 * @cssprop --m3e-timepicker-headline-top-space - Top margin above the headline.
 * @cssprop --m3e-timepicker-actions-space - Space above the action buttons.
 * @cssprop --m3e-timepicker-label-input-space - Space between Label and the input.
 * @cssprop --m3e-timepicker-vertical-input-dial-space - Space between the input and dial in vertical orientation.
 * @cssprop --m3e-timepicker-horizontal-input-dial-space - Space between the input and dial in horizontal orientation.
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
 * @cssprop --m3e-timepicker-dial-container-size - Size of the dial container.
 * @cssprop --m3e-timepicker-dial-container-shape - Corner radius of the dial container.
 * @cssprop --m3e-timepicker-dial-container-color - Background color of the dial container.
 * @cssprop --m3e-timepicker-dial-inset - Inset offset applied to the dial surface.
 * @cssprop --m3e-timepicker-dial-center-size - Size of the dial center.
 * @cssprop --m3e-timepicker-dial-handle-color - Color of the active handle.
 * @cssprop --m3e-timepicker-dial-handle-size - Size of the handle.
 * @cssprop --m3e-timepicker-dial-handle-disabled-color - Color of a disabled handle.
 * @cssprop --m3e-timepicker-dial-handle-disabled-opacity - Opacity of a disabled handle.
 * @cssprop --m3e-timepicker-dial-dial-inset - Inset applied to the handle area.
 * @cssprop --m3e-timepicker-dial-numeral-size - Size of the dial numerals.
 * @cssprop --m3e-timepicker-dial-numeral-color - Text color of inactive numerals.
 * @cssprop --m3e-timepicker-dial-numeral-shape - Corner radius of the numerals.
 * @cssprop --m3e-timepicker-dial-numeral-font-size - Font size of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-font-weight - Font weight of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-line-height - Line height of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-tracking - Letter spacing of the outer numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-font-size - Font size of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-font-weight - Font weight of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-line-height - Line height of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-tracking - Letter spacing of the inner numerals.
 * @cssprop --m3e-timepicker-dial-numeral-active-color - Color of active numerals.
 * @cssprop --m3e-timepicker-dial-numeral-disabled-color - Color of disabled numerals.
 * @cssprop --m3e-timepicker-dial-numeral-disabled-opacity - Opacity of disabled numerals.
 * @cssprop --m3e-timepicker-dial-handle-center-size - Size of the handle center indicator.
 */
export declare class M3eTimepickerElement extends M3eTimepickerElement_base {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /** @private */ private _open;
    /** @private */ private readonly _input;
    /** @private */ _invalid: boolean;
    /** @private */ private _variant?;
    /** @private */ private _orientation?;
    /** @private */ private _mode?;
    /**
     * The appearance variant of the picker.
     * @default "docked"
     */
    variant: TimepickerVariant;
    /**
     * The mode in which to select time.
     * @default "dial"
     */
    mode: TimepickerMode;
    /**
     * The orientation of the picker.
     * @default "vertical"
     */
    orientation: TimepickerOrientation;
    /**
     * The selected date.
     * @default null
     */
    date: Date | null;
    /**
     * Whether to use a 12‑hour or 24‑hour clock.
     * @default "12"
     */
    format: TimepickerFormat;
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
    /**
     * Whether to hide the mode toggle button.
     * @default false
     */
    hideModeToggle: boolean;
    /**
     * Label given to the button used apply the selected date and close the picker.
     * @default "OK"
     */
    confirmLabel: string;
    /**
     * Label given to the button used discard the selected date and close the picker.
     * @default "Cancel"
     */
    dismissLabel: string;
    /**
     * Label given to the the picker when in dial mode.
     * @default "Select time"
     */
    dialLabel: string;
    /**
     * Label given to the the picker when in input mode.
     * @default "Edit time"
     */
    inputLabel: string;
    /**
     * Label for the hour field.
     * @default "Hour"
     */
    hourLabel: string;
    /**
     * Label for the minute field.
     * @default "Minute"
     */
    minuteLabel: string;
    /**
     * The label for the second field.
     * @default "Second"
     */
    secondLabel: string;
    /**
     * The accessible label given to the mode toggle button.
     * @default "Toggle input picker"
     */
    modeToggleLabel: string;
    /**
     * The accessible label given to the period toggle.
     * @default "AM or PM"
     */
    periodToggleLabel: string;
    /** Whether the picker is open. */
    get isOpen(): boolean;
    /** The current variant applied to the picker. */
    get currentVariant(): Exclude<TimepickerVariant, "auto">;
    /** The current orientation applied to the picker. */
    get currentOrientation(): Exclude<TimepickerOrientation, "auto">;
    /** The current input mode applied to the picker. */
    get currentMode(): Exclude<TimepickerMode, "auto">;
    /** @inheritdoc */
    attach(control: HTMLElement): void;
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    disconnectedCallback(): void;
    /** @inheritdoc */
    reconnectedCallback(): void;
    /**
     * Opens the picker.
     * @param {HTMLElement} trigger The element that triggered the picker.
     * @param {HTMLElement | undefined} anchor The element used to position the picker.
     * @returns {Promise<void>} A `Promise` that resolves when the picker is opened.
     */
    show(trigger: HTMLElement, anchor?: HTMLElement): Promise<void>;
    /**
     * Hides the picker.
     * @param {boolean} [restoreFocus=false] Whether to restore focus to the picker's trigger.
     */
    hide(restoreFocus?: boolean): void;
    /**
     * Toggles the picker.
     * @param {HTMLElement} trigger The element that triggered the picker.
     * @param {HTMLElement | undefined} anchor The element used to position the picker.
     * @returns {Promise<void>} A `Promise` that resolves when the picker is opened or closed.
     */
    toggle(trigger: HTMLElement, anchor?: HTMLElement): Promise<void>;
    /** @inheritdoc */
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected render(): unknown;
}
interface M3eTimepickerElementEventMap extends HTMLElementEventMap {
    beforetoggle: ToggleEvent;
    toggle: ToggleEvent;
}
export interface M3eTimepickerElement {
    addEventListener<K extends keyof M3eTimepickerElementEventMap>(type: K, listener: (this: M3eTimepickerElement, ev: M3eTimepickerElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eTimepickerElementEventMap>(type: K, listener: (this: M3eTimepickerElement, ev: M3eTimepickerElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-timepicker": M3eTimepickerElement;
    }
}
export {};
//# sourceMappingURL=TimepickerElement.d.ts.map