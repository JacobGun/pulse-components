import { CSSResultGroup, PropertyValues } from "lit";
import { TimepickerInputElementBase } from "./TimepickerInputElementBase";
declare const M3eTimepickerDialElement_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").SuppressInitialAnimationMixin> & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").AttachInternalsMixin> & import("../core/shared/mixins/Constructor").Constructor & typeof TimepickerInputElementBase;
/**
 * A clock‑face surface for selecting hours and minutes using a movable hand.
 * @description
 * The `m3e-timepicker-dial` component provides a clock-face experience
 * for selecting hours and minutes. It supports both 12- and 24-hour formats,
 * and exposes view changes through accessible events.
 *
 * @tag m3e-timepicker-dial
 *
 * @attr format - Whether to use a 12‑hour or 24‑hour clock.
 * @attr hour - The hour, in 24-hour time, from 0..23.
 * @attr max-time - The maximum time that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr minute - The minute, from 0..59.
 * @attr second - The second, from 0..59.
 * @attr show-seconds - Whether to show seconds.
 * @attr period - The 12-hour time period.
 * @attr view - The view used to input time.
 *
 * @fires change - Dispatched when the selected time changes.
 * @fires input - Dispatched when the selected time changes.
 * @fires view-change - Dispatched when the view changes.
 *
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
export declare class M3eTimepickerDialElement extends M3eTimepickerDialElement_base {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    protected updated(_changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected render(): unknown;
}
interface M3eTimepickerDialElementEventMap extends HTMLElementEventMap {
    "view-change": CustomEvent;
}
export interface M3eTimepickerDialElement {
    addEventListener<K extends keyof M3eTimepickerDialElementEventMap>(type: K, listener: (this: M3eTimepickerDialElement, ev: M3eTimepickerDialElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof M3eTimepickerDialElementEventMap>(type: K, listener: (this: M3eTimepickerDialElement, ev: M3eTimepickerDialElementEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-timepicker-dial": M3eTimepickerDialElement;
    }
}
export {};
//# sourceMappingURL=TimepickerDialElement.d.ts.map