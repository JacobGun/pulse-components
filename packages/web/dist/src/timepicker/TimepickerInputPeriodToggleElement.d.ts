import { CSSResultGroup, LitElement } from "lit";
import { TimepickerOrientation } from "./TimepickerOrientation";
import { TimepickerPeriod } from "./TimepickerPeriod";
declare const M3eTimepickerInputPeriodToggleElement_base: import("../core/shared/mixins/Constructor").Constructor & typeof LitElement;
/** @internal An internal element responsible for selecting a time period (AM/PM). */
export declare class M3eTimepickerInputPeriodToggleElement extends M3eTimepickerInputPeriodToggleElement_base {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /** The 12-hour time period. */
    period: TimepickerPeriod;
    /** The orientation of the toggle. */
    orientation: Exclude<TimepickerOrientation, "auto">;
    /** @inheritdoc */
    protected render(): unknown;
}
export {};
//# sourceMappingURL=TimepickerInputPeriodToggleElement.d.ts.map