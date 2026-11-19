import { LitElement, PropertyValues } from "lit";
import { LoadingIndicatorVariant } from "./LoadingIndicatorVariant";
declare const M3eLoadingIndicatorElement_base: import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").ReconnectedCallbackMixin> & import("../core/shared/mixins/Constructor").Constructor & import("../core/shared/mixins/Constructor").Constructor<import("@pulse/web/core").AttachInternalsMixin> & typeof LitElement;
/**
 * Shows indeterminate progress for a short wait time.
 *
 * @description
 * The `m3e-loading-indicator` component uses animation to grab attention, mitigate perceived latency, and indicate
 * that an activity is in progress.
 *
 * When placed over other content, use the `variant` attribute to change the appearance from `uncontained` (the default),
 * to `contained` so that it has strong contrast to help it stand out better.
 *
 * @example
 * The following example illustrates an uncontained loading indicator.
 * ```html
 * <m3e-loading-indicator></m3e-loading-indicator>
 * ```
 *
 * @tag m3e-loading-indicator
 *
 * @attr variant - The appearance variant of the indicator.
 * @attr pull-progress - Pull-to-refresh progress in turns; each increment of 1 rotates the indicator one full turn.
 *
 * @cssprop --m3e-loading-indicator-active-indicator-color - Uncontained active indicator color.
 * @cssprop --m3e-loading-indicator-contained-active-indicator-color - Contained active indicator color.
 * @cssprop --m3e-loading-indicator-contained-container-color - Contained container (background) color.
 * @cssprop --m3e-loading-indicator-active-indicator-size - Size of the active indicator.
 * @cssprop --m3e-loading-indicator-container-shape - Container shape.
 * @cssprop --m3e-loading-indicator-container-size - Container size.
 */
export declare class M3eLoadingIndicatorElement extends M3eLoadingIndicatorElement_base {
    #private;
    /** The styles of the element. */
    static styles: import("lit").CSSResult;
    /** @private */
    private readonly _container?;
    /**
     * The appearance variant of the indicator.
     * @default "uncontained"
     */
    variant: LoadingIndicatorVariant;
    /**
     * Pull-to-refresh progress in turns; each increment of 1 rotates the indicator one full turn. Set to `null` when no
     * pull gesture is active.
     * @default null
     */
    pullProgress: number | null;
    /** @inheritdoc */
    connectedCallback(): void;
    /** @inheritdoc */
    disconnectedCallback(): void;
    /** @inheritdoc */
    reconnectedCallback(): void;
    /** @inheritdoc */
    protected willUpdate(_changedProperties: PropertyValues<this>): void;
    /** @inheritdoc */
    protected firstUpdated(_changedProperties: PropertyValues): void;
    /** @inheritdoc */
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "m3e-loading-indicator": M3eLoadingIndicatorElement;
    }
}
export {};
//# sourceMappingURL=LoadingIndicatorElement.d.ts.map