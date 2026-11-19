import { CSSResultGroup, LitElement, PropertyValues } from "lit";
import { GestureDetail } from "./GestureDetail";
import { GestureInput, PointerType } from "./GestureInput";
import { GestureInputButton, GestureOptions } from "./GestureOptions";
import { GestureRecognizer } from "./GestureRecognizer";
declare const GestureElementBase_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").HtmlForMixin> & typeof LitElement;
/**
 * A base implementation for a non-visual element used to detect and interpret gestures from an
 * input stream produced from an attached element. This class must be inherited.
 * @template TOptions The type of options used to detect and interpret gestures.
 * @template TDetail The type of semantic detail emitted for a gesture.
 */
export declare abstract class GestureElementBase<TOptions extends GestureOptions, TDetail extends GestureDetail> extends GestureElementBase_base {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /** The recognizer used to detect and interpret gestures. */
    abstract readonly recognizer: GestureRecognizer<TOptions, TDetail>;
    /**
     * Whether gesture recognition is disabled.
     * @default false
     */
    disabled: boolean;
    /**
     * The priority in which to recognize gestures.
     * @default 1
     */
    priority: number;
    /**
     * Which buttons can be pressed.
     * @default ["primary"]
     */
    buttons: readonly GestureInputButton[];
    /**
     * Which types of pointers can be used to recognize gestures.
     * @default ["mouse", "pen", "touch"]
     */
    pointerTypes: readonly PointerType[];
    /**
     * Optional predicate used to determine whether input can be used to recognize gestures.
     * @param {GestureInput} input The input to evaluate.
     * @returns {boolean} `true` if the recognizer should process the input; otherwise, `false`.
     */
    inputFilter?: (input: GestureInput) => boolean;
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    disconnectedCallback(): void;
    /** @inheritdoc */
    attach(control: HTMLElement): void;
    /** @inheritdoc */
    detach(): void;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
}
export {};
//# sourceMappingURL=GestureElementBase.d.ts.map