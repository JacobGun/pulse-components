import { CSSResultGroup, LitElement, PropertyValues } from "lit";
declare const M3eSelectionIndicatorElement_base: import("../mixins/Constructor").Constructor<import("..").SuppressInitialAnimationMixin> & import("../mixins/Constructor").Constructor<import("..").ReconnectedCallbackMixin> & import("../mixins/Constructor").Constructor<import("..").HtmlForMixin> & import("../mixins/Constructor").Constructor & import("../mixins/Constructor").Constructor<import("..").AttachInternalsMixin> & typeof LitElement;
/**
 * Provides selection, focus, and hover state layer treatment for an interactive element that supports selection.
 *
 * @description
 * The `m3e-selection-indicator` component is an absolute positioned element used to depict a selected state
 * including hover and focus overlays. The parenting element must be a relative positioned element.
 *
 * This element can be attached to an interactive element using the `for` attribute or programmatically using the `attach` method.
 * The indicator's state layer is displayed when the interactive element is either hovered or focused.  This can be disabled using
 * the `disabled` attribute.  The `selected` attribute controls whether to present a selected state.
 *
 * @tag m3e-selection-indicator
 *
 * @attr bounce - Whether the indicator presents a bounce animation when selected.
 * @attr centered - Whether the selection animation always originates from the center of the element's bounds, rather than originating from the location of the click event.
 * @attr disabled - Whether hover and focus events will not trigger the indicator's state layer. State layers can still be controlled manually using the `show` and `hide` methods.
 * @attr selected - Whether the indicator is selected.
 *
 * @cssprop --m3e-selection-indicator-color - Color of the indicator.
 * @cssprop --m3e-selection-indicator-state-layer-duration - Duration of state layer changes.
 * @cssprop --m3e-selection-indicator-state-layer-easing - Easing curve of state layer changes.
 * @cssprop --m3e-selection-indicator-state-layer-focus-color - Color on focus.
 * @cssprop --m3e-selection-indicator-state-layer-focus-opacity - Opacity on focus.
 * @cssprop --m3e-selection-indicator-state-layer-hover-color - Color on hover.
 * @cssprop --m3e-selection-indicator-state-layer-hover-opacity - Opacity on hover.
 * @cssprop --m3e-selection-indicator-state-layer-pressed-color - Color on pressed.
 * @cssprop --m3e-selection-indicator-state-layer-pressed-opacity - Opacity on pressed.
 */
export declare class M3eSelectionIndicatorElement extends M3eSelectionIndicatorElement_base {
    #private;
    /** The styles of the element. */
    static styles: CSSResultGroup;
    /** @private */ private readonly _base?;
    /** @private */ private readonly _stateLayer?;
    /**
     * Whether hover and focus events will not trigger the indicator's state layer. State layers can still
     * be controlled manually using the `show` and `hide` methods.
     * @default false
     */
    disabled: boolean;
    /**
     * Whether the indicator is selected.
     * @default false
     */
    selected: boolean;
    /**
     * Whether the indicator presents a bounce animation when selected.
     * @default false
     */
    bounce: boolean;
    /**
     * Whether the selection animation always originates from the center of the element's bounds,
     * rather than originating from the location of the click event.
     * @default false
     */
    centered: boolean;
    /**
     * Launches a manual state layer for the indicator.
     * @param {"hover" | "focused" | "pressed"} state The state of the indicator's state layer to show.
     */
    show(state: "hover" | "focused" | "pressed"): void;
    /**
     * Hides the state layer for the indicator.
     * @param {"hover" | "focused" | "pressed"} state The state of the indicator's state layer to hide.
     */
    hide(state: "hover" | "focused" | "pressed"): void;
    /** @inheritdoc */
    attach(control: HTMLElement): void;
    /** @inheritdoc */
    detach(): void;
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    reconnectedCallback(): void;
    /** @inheritdoc */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /** @inheritdoc */
    protected render(): unknown;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-selection-indicator": M3eSelectionIndicatorElement;
    }
}
export {};
//# sourceMappingURL=SelectionIndicatorElement.d.ts.map