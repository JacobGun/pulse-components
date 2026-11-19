import { ActionElementBase } from "@pulse/web/core";
declare const M3eTimepickerToggleElement_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").HtmlForMixin> & typeof ActionElementBase;
/**
 * An element, nested within a clickable element, used to toggle a timepicker.
 * @tag m3e-timepicker-toggle
 */
export declare class M3eTimepickerToggleElement extends M3eTimepickerToggleElement_base {
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    disconnectedCallback(): void;
    /** @inheritdoc */
    _onClick(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-timepicker-toggle": M3eTimepickerToggleElement;
    }
}
export {};
//# sourceMappingURL=TimepickerToggleElement.d.ts.map