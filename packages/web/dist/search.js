/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html, nothing, svg } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { DesignToken, AttachInternals, setCustomState, customElement, ReconnectedCallback, ScrollLockController, InertController, FocusController, prefersReducedMotion, debounce } from './TextOverflowElement.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './IconButtonElement.js';
import { positionAnchor } from './FloatingPanelElement.js';
import { M3eDirectionality } from './Directionality.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';
import './LiveAnnouncer.js';

/** @internal */
const SearchBarToken = {
  containerColor: unsafeCSS(`var(--m3e-search-bar-container-color, ${DesignToken.color.surfaceContainerHigh})`),
  leadingIconColor: unsafeCSS(`var(--m3e-search-bar-leading-icon-color, ${DesignToken.color.onSurface})`),
  trailingIconColor: unsafeCSS(`var(--m3e-search-bar-trailing-icon-color, ${DesignToken.color.onSurfaceVariant})`),
  containerHeight: unsafeCSS("var(--m3e-search-bar-container-height, 56px)"),
  containerShape: unsafeCSS(`var(--m3e-search-bar-container-shape, ${DesignToken.shape.corner.full})`),
  iconSize: unsafeCSS("var(--m3e-search-bar-icon-size, 24px)"),
  supportingTextColor: unsafeCSS(`var(--m3e-search-bar-supporting-text-color, ${DesignToken.color.onSurfaceVariant})`),
  supportingTextFontSize: unsafeCSS(`var(--m3e-search-bar-supporting-text-font-size, ${DesignToken.typescale.standard.body.large.fontSize})`),
  supportingTextFontWeight: unsafeCSS(`var(--m3e-search-bar-supporting-text-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight})`),
  supportingTextLineHeight: unsafeCSS(`var(--m3e-search-bar-supporting-text-line-height, ${DesignToken.typescale.standard.body.large.lineHeight})`),
  supportingTextTracking: unsafeCSS(`var(--m3e-search-bar-supporting-text-tracking, ${DesignToken.typescale.standard.body.large.tracking})`),
  inputColor: unsafeCSS(`var(--m3e-search-bar-input-color, ${DesignToken.color.onSurface})`),
  inputTextFontSize: unsafeCSS(`var(--m3e-search-bar-input-text-font-size, ${DesignToken.typescale.standard.body.large.fontSize})`),
  inputTextFontWeight: unsafeCSS(`var(--m3e-search-bar-input-text-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight})`),
  inputTextLineHeight: unsafeCSS(`var(--m3e-search-bar-input-text-line-height, ${DesignToken.typescale.standard.body.large.lineHeight})`),
  inputTextTracking: unsafeCSS(`var(--m3e-search-bar-input-text-tracking, ${DesignToken.typescale.standard.body.large.tracking})`),
  leadingSpace: unsafeCSS(`var(--m3e-search-bar-leading-space, ${DesignToken.measurement.space50})`),
  trailingSpace: unsafeCSS(`var(--m3e-search-bar-trailing-space, ${DesignToken.measurement.space50})`),
  noActionsLeadingSpace: unsafeCSS(`var(--m3e-search-bar-no-actions-leading-space, ${DesignToken.measurement.space200})`),
  noActionsTrailingSpace: unsafeCSS(`var(--m3e-search-bar-no-actions-trailing-space, ${DesignToken.measurement.space200})`),
  leadingActionsTrailingSpace: unsafeCSS(`var(--m3e-search-bar-leading-actions-trailing-space, ${DesignToken.measurement.space50})`),
  trailingActionsLeadingSpace: unsafeCSS(`var(--m3e-search-bar-trailing-actions-leading-space, ${DesignToken.measurement.space50})`),
  actionsGap: unsafeCSS("var(--m3e-search-bar-actions-gap, 0px)")
};

/**
 * Light DOM styles for `M3eSearchBarElement`.
 * @internal
 */
const SearchBarLightDomStyle = css`m3e-search-bar input[slot="input"]::placeholder { user-select: none; color: ${SearchBarToken.supportingTextColor}; font-size: ${SearchBarToken.supportingTextFontSize}; font-weight: ${SearchBarToken.supportingTextFontWeight}; line-height: ${SearchBarToken.supportingTextLineHeight}; letter-spacing: ${SearchBarToken.supportingTextTracking}; }`;
/**
 * Styles for `M3eSearchBarElement`.
 * @internal
 */
const SearchBarStyle = css`:host { display: block; height: ${SearchBarToken.containerHeight}; } :host([hidden]) { display: none; } .base { contain: layout style paint; cursor: text; display: flex; align-items: center; box-sizing: border-box; width: 100%; height: 100%; border-radius: ${SearchBarToken.containerShape}; background-color: ${SearchBarToken.containerColor}; --_icon-button-size: auto; --_icon-button-min-size: 48px; } .clear { display: flex; align-items: center; justify-content: center; box-sizing: border-box; min-width: 48px; } :host(:not(:is(:state(--clearable), :--clearable))) .clear { display: none; } :host(:is(:state(--with-leading), :--with-leading)) slot[name="leading"], :host(:is(:state(--with-trailing), :--with-trailing)) slot[name="trailing"] { display: flex; align-items: center; justify-content: center; box-sizing: border-box; min-width: 48px; padding-inline: ${DesignToken.measurement.space50}; column-gap: calc(${DesignToken.measurement.space100} + ${SearchBarToken.actionsGap}); } ::slotted([slot="input"]) { flex: 1 1 auto; outline: unset; border: unset; background-color: transparent; box-shadow: none; min-width: 0; padding: unset; color: ${SearchBarToken.inputColor}; font-size: ${SearchBarToken.inputTextFontSize}; font-weight: ${SearchBarToken.inputTextFontWeight}; line-height: ${SearchBarToken.inputTextLineHeight}; letter-spacing: ${SearchBarToken.inputTextTracking}; } :host(:is(:state(--with-leading), :--with-leading)) .base { padding-inline-start: ${SearchBarToken.leadingSpace}; } :host(:not(:is(:state(--with-leading), :--with-leading))) .base { padding-inline-start: ${SearchBarToken.noActionsLeadingSpace}; } :host(:is(:is(:state(--with-trailing), :--with-trailing), :is(:state(--clearable), :--clearable))) .base { padding-inline-end: ${SearchBarToken.trailingSpace}; } :host(:not(:is(:is(:state(--with-trailing), :--with-trailing), :is(:state(--clearable), :--clearable)))) .base { padding-inline-end: ${SearchBarToken.noActionsTrailingSpace}; } :host(:is(:state(--with-leading), :--with-leading)) ::slotted([slot="input"]) { margin-inline-start: ${SearchBarToken.leadingActionsTrailingSpace}; } :host(:is(:is(:state(--with-trailing), :--with-trailing), :is(:state(--clearable), :--clearable))) ::slotted([slot="input"]) { margin-inline-end: ${SearchBarToken.trailingActionsLeadingSpace}; } slot[name="leading"] { color: ${SearchBarToken.leadingIconColor}; --m3e-icon-color: ${SearchBarToken.leadingIconColor}; --m3e-icon-button-icon-color: ${SearchBarToken.leadingIconColor}; --m3e-icon-size: ${SearchBarToken.iconSize}; } slot[name="trailing"], .clear { color: ${SearchBarToken.trailingIconColor}; --m3e-icon-color: ${SearchBarToken.trailingIconColor}; --m3e-icon-button-icon-color: ${SearchBarToken.trailingIconColor}; --m3e-icon-size: ${SearchBarToken.iconSize}; } ::slotted(svg[slot="leading"]), ::slotted(svg[slot="trailing"]) { width: 1em; font-size: ${SearchBarToken.iconSize}; } ::slotted([slot="clear-icon"]), .clear-icon { width: 1em; font-size: ${SearchBarToken.iconSize} !important; } slot[name="clear-icon"] { --m3e-icon-size: ${SearchBarToken.iconSize}; } @media (forced-colors: active) { .base { border: 1px var(--_search-bar-forced-color-outline-style, solid) CanvasText; } }`;

/** @internal */
const SearchViewToken = {
  containerColor: unsafeCSS(`var(--m3e-search-view-container-color, ${DesignToken.color.surfaceContainerHigh})`),
  containedContainerColor: unsafeCSS(`var(--m3e-search-view-contained-container-color, ${DesignToken.color.surfaceContainerLow})`),
  dividerColor: unsafeCSS(`var(--m3e-search-view-divider-color, ${DesignToken.color.outline})`),
  dividerThickness: unsafeCSS(`var(--m3e-search-view-divider-thickness, 1px)`),
  fullScreenContainerShape: unsafeCSS(`var(--m3e-search-view-full-screen-container-shape, ${DesignToken.shape.corner.none})`),
  fullScreenHeaderContainerHeight: unsafeCSS("var(--m3e-search-view-full-screen-header-container-height, 72px)"),
  dockedContainerShape: unsafeCSS(`var(--m3e-search-view-docked-container-shape, ${DesignToken.shape.corner.extraLarge})`),
  dockedHeaderContainerHeight: unsafeCSS("var(--m3e-search-view-docked-header-container-height, 56px)"),
  containedLeadingMargin: unsafeCSS(`var(--m3e-search-view-contained-leading-margin, ${DesignToken.measurement.space300})`),
  containedTrailingMargin: unsafeCSS(`var(--m3e-search-view-contained-trailing-margin, ${DesignToken.measurement.space300})`),
  containedFocusedLeadingMargin: unsafeCSS(`var(--m3e-search-view-contained-focused-leading-margin, ${DesignToken.measurement.space150})`),
  containedFocusedTrailingMargin: unsafeCSS(`var(--m3e-search-view-contained-focused-trailing-margin, ${DesignToken.measurement.space150})`),
  containedDockedBarResultsGap: unsafeCSS(`var(--m3e-search-view-contained-docked-bar-results-gap, ${DesignToken.measurement.space25})`),
  containedDockedResultsShape: unsafeCSS(`var(--m3e-search-view-contained-docked-results-shape, ${DesignToken.shape.corner.medium})`),
  containedDockedBarShape: unsafeCSS(`var(--m3e-search-view-contained-docked-bar-shape, ${DesignToken.shape.corner.full})`),
  containedFullScreenBarContainerHeight: unsafeCSS("var(--m3e-search-view-contained-full-screen-bar-container-height, 56px)"),
  dockedContainerMinHeight: unsafeCSS("var(--m3e-search-view-docked-container-min-height, 240px)"),
  dockedContainerMaxHeight: unsafeCSS("var(--m3e-search-view-docked-container-max-height, calc(100vh * 0.6667))"),
  containedDockedResultsSpace: unsafeCSS(`var(--m3e-search-view-contained-docked-results-space, ${DesignToken.measurement.space50})`),
  dockedResultsBottomSpace: unsafeCSS(`var(--m3e-search-view-docked-results-bottom-space,  ${DesignToken.measurement.space200})`),
  dockedScrimColor: unsafeCSS(`var(--m3e-search-view-docked-scrim-color, ${DesignToken.color.scrim})`),
  dockedScrimOpacity: unsafeCSS("var(--m3e-search-view-docked-scrim-opacity, 32%)")
};

/**
 * Light DOM styles for `M3eSearchViewElement`.
 * @internal
 */
const SearchViewLightDomStyle = css`m3e-search-view input[slot="input"]::placeholder { user-select: none; color: ${SearchBarToken.supportingTextColor}; font-size: ${SearchBarToken.supportingTextFontSize}; font-weight: ${SearchBarToken.supportingTextFontWeight}; line-height: ${SearchBarToken.supportingTextLineHeight}; letter-spacing: ${SearchBarToken.supportingTextTracking}; }`;
/**
 * Styles for `M3eSearchViewElement`.
 * @internal
 */
const SearchViewStyle = css`:host { display: block; } :host([hidden]) { display: none; } .base { position: relative; width: 100%; } .anchor { position: absolute; width: 100%; visibility: hidden; } .view { contain: layout style; display: flex; flex-direction: column; box-sizing: border-box; width: 100%; outline: none; padding: unset; margin: unset; border: unset; } .header { flex: none; display: flex; align-items: center; } .bar { flex: 1 1 auto; min-width: 0; } :host(:is(:state(--fullscreen), :--fullscreen)) .bar { transition: ${unsafeCSS(`margin ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--fullscreen), :--fullscreen)[contained]:not([open])) .bar { margin-inline-start: ${SearchViewToken.containedLeadingMargin}; margin-inline-end: ${SearchViewToken.containedTrailingMargin}; } :host(:is(:state(--fullscreen), :--fullscreen)[contained][open]) .bar, :host(:is(:state(--fullscreen), :--fullscreen)[contained][open]) .results { margin-inline-start: ${SearchViewToken.containedFocusedLeadingMargin}; margin-inline-end: ${SearchViewToken.containedFocusedTrailingMargin}; } .icon { display: flex; align-items: center; justify-content: center; box-sizing: border-box; min-width: 48px; } ::slotted([slot="search-icon"]), .search-icon, ::slotted([slot="close-icon"]), .close-icon { width: 1em; font-size: ${SearchBarToken.iconSize} !important; } .results { overflow: hidden; flex: 1 1 auto; display: flex; flex-direction: column; } .scroll-container { flex: 1 1 auto; overflow-y: auto; overflow-x: hidden; scrollbar-color: ${DesignToken.scrollbar.color}; } .view:not(:popover-open) .results, .view.closing .results { display: none; } :host(:not(:is(:is(:state(--clearable), :--clearable), [open]))) .clear { display: none; } ::slotted([slot="clear-icon"]), .clear-icon { width: 1em; font-size: ${SearchBarToken.iconSize} !important; } slot[name="clear-icon"] { --m3e-icon-size: ${SearchBarToken.iconSize}; } :host(:is(:state(--fullscreen), :--fullscreen)) .header { transition: height 150ms cubic-bezier(0.2, 0, 0, 1); } :host(:is(:state(--fullscreen), :--fullscreen)) .view:popover-open:not(.closing) .header { height: ${SearchViewToken.fullScreenHeaderContainerHeight}; } :host(:is(:state(--fullscreen), :--fullscreen):not([open])) .header, :host(:is(:state(--fullscreen), :--fullscreen)[open]) .view.closing .header { height: ${SearchViewToken.containedFullScreenBarContainerHeight}; } :host(:is(:state(--fullscreen), :--fullscreen)[open]) .bar { --m3e-search-bar-container-height: ${SearchViewToken.containedFullScreenBarContainerHeight}; } :host(:is(:state(--fullscreen), :--fullscreen)) .anchor { height: ${SearchViewToken.containedFullScreenBarContainerHeight}; } :host(:is(:state(--fullscreen), :--fullscreen)) .view:popover-open { border-radius: ${SearchViewToken.fullScreenContainerShape}; } :host(:is(:state(--fullscreen), :--fullscreen)[contained]) .view:popover-open { background-color: ${SearchViewToken.containedContainerColor}; } :host(:is(:state(--fullscreen), :--fullscreen):not([contained])) .view:popover-open { background-color: ${SearchViewToken.containerColor}; } :host(:is(:state(--docked), :--docked)[open]) .header, :host(:is(:state(--docked), :--docked)) .anchor { height: ${SearchViewToken.dockedHeaderContainerHeight}; } :host(:not([contained])[open]) .results { border-top-width: ${SearchViewToken.dividerThickness}; border-top-style: solid; border-top-color: ${SearchViewToken.dividerColor}; } :host(:is(:state(--docked), :--docked)[contained]) .results { margin-top: ${SearchViewToken.containedDockedBarResultsGap}; } :host(:is(:state(--docked), :--docked):not([contained])[open]) .view { background-color: ${SearchViewToken.containerColor}; --m3e-search-bar-container-color: ${SearchViewToken.containerColor}; } :host(:is(:state(--docked), :--docked)[contained]) .results { background-color: ${SearchViewToken.containerColor}; } :host(:is(:state(--docked), :--docked):not([contained])) .view, :host(:is(:state(--docked), :--docked)[contained]) .results { border-radius: ${SearchViewToken.dockedContainerShape}; } :host(:is(:state(--docked), :--docked)) .results { min-height: calc(${SearchViewToken.dockedContainerMinHeight} - ${SearchViewToken.dockedHeaderContainerHeight}); max-height: calc(${SearchViewToken.dockedContainerMaxHeight} - ${SearchViewToken.dockedHeaderContainerHeight}); } :host(:is(:state(--docked), :--docked)) .scroll-container { scrollbar-width: ${DesignToken.scrollbar.thinWidth}; } :host(:is(:state(--docked), :--docked):not([contained])) .scroll-container { padding-bottom: ${SearchViewToken.dockedResultsBottomSpace}; } :host(:is(:state(--docked), :--docked)[contained]) .scroll-container { padding: ${SearchViewToken.containedDockedResultsSpace}; } :host(:is(:state(--docked), :--docked)) .results { transform-origin: top; transition: ${unsafeCSS(`transform ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard},
      overlay ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete,
      display ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--docked), :--docked):not([open])) .results { transform: scaleY(0.8); } :host(:is(:state(--docked), :--docked)[open]) .results { transform: scaleY(1); } @starting-style { :host(:is(:state(--docked), :--docked)[open]) .results { transform: scaleY(0.8); } } :host(:is(:state(--docked), :--docked)) .view { background-color: transparent; } :host(:is(:state(--docked), :--docked):not([open])) .view { transition: ${unsafeCSS(`border-radius ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard},
      background-color ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--docked), :--docked):not([open])) .view::backdrop { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--docked), :--docked)) .view::backdrop { background-color: color-mix(in srgb, ${SearchViewToken.dockedScrimColor} 0%, transparent); margin-inline-end: -20px; } :host(:is(:state(--docked), :--docked)[open]) .view::backdrop { background-color: color-mix( in srgb, ${SearchViewToken.dockedScrimColor} ${SearchViewToken.dockedScrimOpacity}, transparent ); transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } @starting-style { :host(:is(:state(--docked), :--docked)[open]) .view::backdrop { background-color: color-mix(in srgb, ${SearchViewToken.dockedScrimColor} 0%, transparent); } } :host(:is(:state(--fullscreen), :--fullscreen)) .view:popover-open { width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; overflow: hidden; } @media (prefers-reduced-motion) { :host(:is(:state(--fullscreen), :--fullscreen)) .bar, :host(:is(:state(--fullscreen), :--fullscreen)) .header, :host(:is(:state(--docked), :--docked)) .results, :host(:is(:state(--docked), :--docked):not([open])) .view, :host(:is(:state(--docked), :--docked):not([open])) .view::backdrop, :host(:is(:state(--docked), :--docked)[open]) .view::backdrop { transition: none; } } @media (forced-colors: active) { :host(:not([contained])[open]) .bar { --_search-bar-forced-color-outline-style: none; } :host(:is(:state(--docked), :--docked):not([contained])[open]) .view, :host(:is(:state(--docked), :--docked)[contained]) .results { border: 1px solid CanvasText; } :host(:not([contained])[open]) .results { border-top-color: CanvasText; } }`;

var _M3eSearchBarElement_instances, _M3eSearchBarElement_input, _M3eSearchBarElement_inputInputHandler, _M3eSearchBarElement_renderClearButton, _M3eSearchBarElement_handleContainerClick, _M3eSearchBarElement_handleLeadingSlotChange, _M3eSearchBarElement_handleTrailingSlotChange, _M3eSearchBarElement_handleInputSlotChange, _M3eSearchBarElement_handleInputInput, _M3eSearchBarElement_handleClearClick;
/**
 * A bar that provides a prominent entry point for search.
 *
 * @description
 * The `m3e-search-bar` component provides a prominent entry point for search,
 * capturing user input and emitting `query` and `clear` events as the text
 * changes. It reflects focus and interaction states through customizable CSS
 * properties for container, icons, and text styling.
 *
 * @example
 * The following example illustrates typical usage with a leading icon and the
 * ability to clear the current search text.
 * ```html
 * <m3e-search-bar clearable>
 *  <m3e-icon name="search" slot="leading"></m3e-icon>
 *  <input slot="input" placeholder="Search..." />
 *  </m3e-search-bar>
 * ```
 *
 * @tag m3e-search-bar
 *
 * @attr clearable - Whether the bar presents a button used to clear the search term.
 * @attr clear-label - The accessible label given to the button used to clear the search term.
 *
 * @slot leading - Renders content before the input of the bar.
 * @slot input - Renders the input of the bar.
 * @slot trailing - Renders content after the input of the bar.
 * @slot clear-icon - Overrides the default clear icon of the bar.
 *
 * @fires clear - Dispatched when the search term is cleared.
 *
 * @cssprop --m3e-search-bar-container-color - Background color of the search bar container.
 * @cssprop --m3e-search-bar-leading-icon-color - Color of the leading icon.
 * @cssprop --m3e-search-bar-trailing-icon-color - Color of the trailing icon.
 * @cssprop --m3e-search-bar-container-height - Height of the search bar container.
 * @cssprop --m3e-search-bar-container-shape - Shape (border radius) of the search bar container.
 * @cssprop --m3e-search-bar-icon-size - Size of icons inside the search bar.
 * @cssprop --m3e-search-bar-supporting-text-color - Color of the supporting text.
 * @cssprop --m3e-search-bar-supporting-text-font-size - Font size of the supporting text.
 * @cssprop --m3e-search-bar-supporting-text-font-weight - Font weight of the supporting text.
 * @cssprop --m3e-search-bar-supporting-text-line-height - Line height of the supporting text.
 * @cssprop --m3e-search-bar-supporting-text-tracking - Letter spacing of the supporting text.
 * @cssprop --m3e-search-bar-input-color - Color of the input text.
 * @cssprop --m3e-search-bar-input-text-font-size - Font size of the input text.
 * @cssprop --m3e-search-bar-input-text-font-weight - Font weight of the input text.
 * @cssprop --m3e-search-bar-input-text-line-height - Line height of the input text.
 * @cssprop --m3e-search-bar-input-text-tracking - Letter spacing of the input text.
 * @cssprop --m3e-search-bar-leading-space - Space before the leading icon.
 * @cssprop --m3e-search-bar-trailing-space - Space after the trailing icon.
 * @cssprop --m3e-search-bar-no-actions-leading-space - Leading padding when no actions are present.
 * @cssprop --m3e-search-bar-no-actions-trailing-space - Trailing padding when no actions are present.
 * @cssprop --m3e-search-bar-leading-actions-trailing-space - Space between leading actions and the input.
 * @cssprop --m3e-search-bar-trailing-actions-leading-space - Space between the input and trailing actions.
 * @cssprop --m3e-search-bar-actions-gap - Gap between action icons.
 */
let M3eSearchBarElement = class M3eSearchBarElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    _M3eSearchBarElement_instances.add(this);
    /** @private */
    _M3eSearchBarElement_input.set(this, void 0);
    /** @private */
    _M3eSearchBarElement_inputInputHandler.set(this, () => __classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleInputInput).call(this));
    /**
     * Whether the bar presents a button used to clear the search term.
     * @default false
     */
    this.clearable = false;
    /**
     * The accessible label given to the button used to clear the search term.
     * @default "Clear"
     */
    this.clearLabel = "Clear";
  }
  /** Clears the search term. */
  clear() {
    if (!__classPrivateFieldGet(this, _M3eSearchBarElement_input, "f") || __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").value === "") return;
    __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").focus();
    __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").value = "";
    __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").dispatchEvent(new Event("input", {
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new Event("clear", {
      bubbles: true,
      composed: true
    }));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @click="${__classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleContainerClick)}"><slot name="leading" @slotchange="${__classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleLeadingSlotChange)}"></slot><slot name="input" @slotchange="${__classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleInputSlotChange)}"></slot>${__classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_renderClearButton).call(this)}<slot name="trailing" @slotchange="${__classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleTrailingSlotChange)}"></slot></div>`;
  }
};
_M3eSearchBarElement_input = new WeakMap();
_M3eSearchBarElement_inputInputHandler = new WeakMap();
_M3eSearchBarElement_instances = new WeakSet();
_M3eSearchBarElement_renderClearButton = function _M3eSearchBarElement_renderClearButton() {
  return this.clearable ? html`<div class="clear"><m3e-icon-button aria-label="${this.clearLabel}" @click="${__classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleClearClick)}"><slot name="clear-icon"><svg class="clear-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></slot></m3e-icon-button></div>` : nothing;
};
_M3eSearchBarElement_handleContainerClick = function _M3eSearchBarElement_handleContainerClick() {
  if (!this.matches(":focus-within")) {
    __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f")?.focus();
  }
};
_M3eSearchBarElement_handleLeadingSlotChange = function _M3eSearchBarElement_handleLeadingSlotChange(e) {
  setCustomState(this, "--with-leading", hasAssignedNodes(e.target));
};
_M3eSearchBarElement_handleTrailingSlotChange = function _M3eSearchBarElement_handleTrailingSlotChange(e) {
  setCustomState(this, "--with-trailing", hasAssignedNodes(e.target));
};
_M3eSearchBarElement_handleInputSlotChange = function _M3eSearchBarElement_handleInputSlotChange(e) {
  const input = e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof HTMLInputElement);
  if (input != __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f")) {
    __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f")?.removeEventListener("input", __classPrivateFieldGet(this, _M3eSearchBarElement_inputInputHandler, "f"));
    __classPrivateFieldSet(this, _M3eSearchBarElement_input, input, "f");
    __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f")?.addEventListener("input", __classPrivateFieldGet(this, _M3eSearchBarElement_inputInputHandler, "f"));
    if (__classPrivateFieldGet(this, _M3eSearchBarElement_input, "f")) {
      __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").role = __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").role || "searchbox";
      __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").inputMode = __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").inputMode || "search";
      __classPrivateFieldGet(this, _M3eSearchBarElement_input, "f").type = "text";
    }
    __classPrivateFieldGet(this, _M3eSearchBarElement_instances, "m", _M3eSearchBarElement_handleInputInput).call(this);
  }
};
_M3eSearchBarElement_handleInputInput = function _M3eSearchBarElement_handleInputInput() {
  setCustomState(this, "--clearable", this.clearable && (__classPrivateFieldGet(this, _M3eSearchBarElement_input, "f")?.value ?? "").length > 0);
};
_M3eSearchBarElement_handleClearClick = function _M3eSearchBarElement_handleClearClick() {
  this.clear();
};
(() => {
  registerStyleSheet(SearchBarLightDomStyle);
})();
/** The styles of the element. */
M3eSearchBarElement.styles = SearchBarStyle;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSearchBarElement.prototype, "clearable", void 0);
__decorate([property({
  attribute: "clear-label"
})], M3eSearchBarElement.prototype, "clearLabel", void 0);
M3eSearchBarElement = __decorate([customElement("m3e-search-bar")], M3eSearchBarElement);

/**
 * Determines whether a value is a `SearchViewMode`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SearchViewMode`.
 */
function isSearchViewMode(value) {
  return value === "fullscreen" || value === "docked" || value === "auto";
}

var _M3eSearchViewElement_instances, _M3eSearchViewElement_input, _M3eSearchViewElement_closeOnInputFocus, _M3eSearchViewElement_inputInputHandler, _M3eSearchViewElement_inputFocusHandler, _M3eSearchViewElement_inputKeyDownHandler, _M3eSearchViewElement_inputPointerHandler, _M3eSearchViewElement_scrollLockController, _M3eSearchViewElement_inertController, _M3eSearchViewElement_openMode, _M3eSearchViewElement_anchorCleanup, _M3eSearchViewElement_anchorLastPosition, _M3eSearchViewElement_breakpointUnobserve, _M3eSearchViewElement_applyMode, _M3eSearchViewElement_renderIconOrBackButton, _M3eSearchViewElement_renderIcon, _M3eSearchViewElement_renderBackButton, _M3eSearchViewElement_renderClearButton, _M3eSearchViewElement_initBreakpointMonitoring, _M3eSearchViewElement_handleInputSlotChange, _M3eSearchViewElement_handleInputInput, _M3eSearchViewElement_updateMode, _M3eSearchViewElement_updateClearableState, _M3eSearchViewElement_handleInputFocus, _M3eSearchViewElement_handleCloseClick, _M3eSearchViewElement_handleClearClick, _M3eSearchViewElement_handleInputPointerDown, _M3eSearchViewElement_handleInputKeyDown, _M3eSearchViewElement_handleKeyDown, _M3eSearchViewElement_openDocked, _M3eSearchViewElement_closeDocked, _M3eSearchViewElement_hideDocked, _M3eSearchViewElement_openFullscreen, _M3eSearchViewElement_closeFullscreen;
/**
 * A surface that presents suggestions and results for a search.
 *
 * @description
 * The `m3e-search-view` component presents the surface for suggestions,
 * history, and results, managing the open and close lifecycle around an
 * embedded search bar. It emits `query`, `clear`, and `toggle`, events to
 * support application driven search logic, and exposes CSS properties for
 * container, shape, spacing, and layout across contained, docked, and full
 * screen configurations.
 *
 * @example
 * The following example shows a contained view in docked mode with a simple set of search results.
 * ```html
 * <m3e-search-view mode="docked" contained>
 *   <input slot="input" placeholder="Search..." />
 *   <m3e-list>
 *     <m3e-list-item>Result One</m3e-list-item>
 *     <m3e-list-item>Result Two</m3e-list-item>
 *     <m3e-list-item>Result Three</m3e-list-item>
 *   </m3e-list>
 * </m3e-search-view>
 * ```
 *
 * @tag m3e-search-view
 *
 * @attr contained - Whether the view features a persistent, filled search container.
 * @attr mode - The behavior mode of the view.
 * @attr open - Whether the view is expanded to show results.
 * @attr clear-label - The accessible label given to the button used to clear the search term.
 * @attr close-label - The accessible label given to the button used to collapse the view.
 * @attr hide-search-icon - Whether to hide the search icon.
 *
 * @slot - When open, renders the results content of the view.
 * @slot input - Renders the input of the view.
 * @slot open-leading - When open, renders content before the input of the view.
 * @slot open-trailing - When open, renders content after the input of the view.
 * @slot closed-leading - When closed, renders content before the input of the view.
 * @slot closed-trailing - When closed, renders content after the input of the view.
 * @slot search-icon - Overrides the default search icon of the view.
 * @slot close-icon - Overrides the default close icon shown while the view is open.
 * @slot clear-icon - Overrides the default clear icon of the view.
 *
 * @fires clear - Dispatched when the search term is cleared.
 * @fires query - Dispatched when the view is opened or when the user modifies the search term.
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-search-view-container-color - Background color of the view container.
 * @cssprop --m3e-search-view-contained-container-color - Background color of the contained view container.
 * @cssprop --m3e-search-view-divider-color - Color of the divider separating header and results.
 * @cssprop --m3e-search-view-divider-thickness - Thickness of the divider separating header and results.
 * @cssprop --m3e-search-view-full-screen-container-shape - Shape of the fullscreen view container.
 * @cssprop --m3e-search-view-full-screen-header-container-height - Height of the header container in fullscreen mode.
 * @cssprop --m3e-search-view-docked-container-shape - Shape of the docked view container.
 * @cssprop --m3e-search-view-docked-header-container-height - Height of the header container in docked mode.
 * @cssprop --m3e-search-view-contained-leading-margin - Leading margin for the contained view.
 * @cssprop --m3e-search-view-contained-trailing-margin - Trailing margin for the contained view.
 * @cssprop --m3e-search-view-contained-focused-leading-margin - Leading margin when the contained view is focused.
 * @cssprop --m3e-search-view-contained-focused-trailing-margin - Trailing margin when the contained view is focused.
 * @cssprop --m3e-search-view-contained-docked-bar-results-gap - Gap between the contained docked bar and results.
 * @cssprop --m3e-search-view-contained-docked-results-shape - Shape of the results container in contained docked mode.
 * @cssprop --m3e-search-view-contained-docked-bar-shape - Shape of the bar in contained docked mode.
 * @cssprop --m3e-search-view-contained-full-screen-bar-container-height - Height of the bar container in contained fullscreen mode.
 * @cssprop --m3e-search-view-docked-container-min-height - Minimum height of the docked view container.
 * @cssprop --m3e-search-view-docked-container-max-height - Maximum height of the docked view container.
 * @cssprop --m3e-search-view-contained-docked-results-space - Space above the results in contained docked mode.
 * @cssprop --m3e-search-view-docked-results-bottom-space - Space below the results in docked mode.
 * @cssprop --m3e-search-view-docked-scrim-color - Color of the scrim behind the docked view.
 * @cssprop --m3e-search-view-docked-scrim-opacity - Opacity of the scrim behind the docked view.
 */
let M3eSearchViewElement = class M3eSearchViewElement extends ReconnectedCallback(AttachInternals(LitElement)) {
  constructor() {
    super();
    _M3eSearchViewElement_instances.add(this);
    /** @private */
    _M3eSearchViewElement_input.set(this, void 0);
    /** @private */
    _M3eSearchViewElement_closeOnInputFocus.set(this, false);
    /** @private */
    _M3eSearchViewElement_inputInputHandler.set(this, () => __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleInputInput).call(this));
    /** @private */
    _M3eSearchViewElement_inputFocusHandler.set(this, () => __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleInputFocus).call(this));
    /** @private */
    _M3eSearchViewElement_inputKeyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleInputKeyDown).call(this, e));
    /** @private */
    _M3eSearchViewElement_inputPointerHandler.set(this, () => __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleInputPointerDown).call(this));
    /** @private */
    _M3eSearchViewElement_scrollLockController.set(this, new ScrollLockController(this));
    /** @private */
    _M3eSearchViewElement_inertController.set(this, new InertController(this));
    /** @private */
    this._clearable = false;
    /** @private */
    _M3eSearchViewElement_openMode.set(this, void 0);
    /** @private */
    _M3eSearchViewElement_anchorCleanup.set(this, void 0);
    /** @private */
    _M3eSearchViewElement_anchorLastPosition.set(this, void 0);
    /** @private */
    _M3eSearchViewElement_breakpointUnobserve.set(this, void 0);
    /**
     * Whether the view features a persistent, filled search container.
     * @default false
     */
    this.contained = false;
    /**
     * The behavior mode of the view.
     * @default "docked"
     */
    this.mode = "docked";
    /**
     * Whether the view is expanded to show results.
     * @default false
     */
    this.open = false;
    /**
     * The accessible label given to the button used to clear the search term.
     * @default "Clear"
     */
    this.clearLabel = "Clear";
    /**
     * The accessible label given to the button used to collapse the view.
     * @default "Close"
     */
    this.closeLabel = "Close";
    /**
     * Whether to hide the search icon.
     * @default false;
     */
    this.hideSearchIcon = false;
    new FocusController(this, {
      callback: focused => this._handleFocusChange(focused)
    });
  }
  /** The current mode applied to the view. */
  get currentMode() {
    return this._mode ?? (this.mode !== "fullscreen" ? "docked" : "fullscreen");
  }
  set currentMode(value) {
    this._mode = value;
  }
  /** Clears the search term. */
  clear() {
    if (!__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")) return;
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").value = "";
    __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateClearableState).call(this);
    this.dispatchEvent(new CustomEvent("query", {
      detail: {
        term: ""
      },
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new Event("clear", {
      bubbles: true,
      composed: true
    }));
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_applyMode).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._mode = undefined;
    __classPrivateFieldGet(this, _M3eSearchViewElement_breakpointUnobserve, "f")?.call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    if (this.mode === "auto") {
      __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_initBreakpointMonitoring).call(this);
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("mode")) {
      __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_applyMode).call(this);
      __classPrivateFieldGet(this, _M3eSearchViewElement_breakpointUnobserve, "f")?.call(this);
      const previousMode = changedProperties.get("mode");
      if (previousMode && previousMode !== this.mode && this.open) {
        this.open = false;
      }
      if (this.mode === "auto") {
        __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_initBreakpointMonitoring).call(this);
      } else {
        this._mode = undefined;
        __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateMode).call(this);
      }
    }
    if (changedProperties.has("_mode")) {
      __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateMode).call(this);
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("open")) {
      if (!this.open) {
        if ((__classPrivateFieldGet(this, _M3eSearchViewElement_openMode, "f") ?? this.currentMode) === "fullscreen") {
          __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_closeFullscreen).call(this);
        } else {
          __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_closeDocked).call(this);
        }
      } else {
        if (this.currentMode === "fullscreen") {
          __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_openFullscreen).call(this);
        } else {
          __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_openDocked).call(this);
        }
      }
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("mode")) {
      __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateMode).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><div class="anchor"></div><div role="${ifDefined(this.open ? "dialog" : undefined)}" aria-modal="${ifDefined(this.open ? "true" : undefined)}" aria-labelledby="${ifDefined(this.open ? "header" : undefined)}" class="view" tabindex="-1" @keydown="${__classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleKeyDown)}"><m3e-focus-trap ?disabled="${!this.open}"><div class="header" id="header"><m3e-search-bar class="bar">${__classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_renderIconOrBackButton).call(this)} ${this.open ? html`<slot name="open-leading" slot="leading"></slot>` : html`<slot name="closed-leading" slot="leading"></slot>`}<slot name="input" slot="input" @slotchange="${__classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleInputSlotChange)}"></slot>${__classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_renderClearButton).call(this)} ${this.open ? html`<slot name="open-trailing" slot="trailing"></slot>` : html`<slot name="closed-trailing" slot="trailing"></slot>`}</m3e-search-bar></div><div class="results"><div class="scroll-container"><slot></slot></div></div></m3e-focus-trap></div></div>`;
  }
  /** @private */
  _handleFocusChange(focused) {
    if (!focused && this.currentMode === "docked") {
      this.clear();
      this.open = false;
    }
  }
};
_M3eSearchViewElement_input = new WeakMap();
_M3eSearchViewElement_closeOnInputFocus = new WeakMap();
_M3eSearchViewElement_inputInputHandler = new WeakMap();
_M3eSearchViewElement_inputFocusHandler = new WeakMap();
_M3eSearchViewElement_inputKeyDownHandler = new WeakMap();
_M3eSearchViewElement_inputPointerHandler = new WeakMap();
_M3eSearchViewElement_scrollLockController = new WeakMap();
_M3eSearchViewElement_inertController = new WeakMap();
_M3eSearchViewElement_openMode = new WeakMap();
_M3eSearchViewElement_anchorCleanup = new WeakMap();
_M3eSearchViewElement_anchorLastPosition = new WeakMap();
_M3eSearchViewElement_breakpointUnobserve = new WeakMap();
_M3eSearchViewElement_instances = new WeakSet();
_M3eSearchViewElement_applyMode = function _M3eSearchViewElement_applyMode() {
  if (!isSearchViewMode(this.mode)) {
    this.mode = "docked";
  }
};
_M3eSearchViewElement_renderIconOrBackButton = function _M3eSearchViewElement_renderIconOrBackButton() {
  if (!this.open && this.hideSearchIcon) return nothing;
  return html`<div class="icon" slot="leading">${this.open ? __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_renderBackButton).call(this) : __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_renderIcon).call(this)}</div>`;
};
_M3eSearchViewElement_renderIcon = function _M3eSearchViewElement_renderIcon() {
  return html`<slot name="search-icon"><svg class="search-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></slot>`;
};
_M3eSearchViewElement_renderBackButton = function _M3eSearchViewElement_renderBackButton() {
  return html`<m3e-icon-button class="close" slot="leading" aria-label="${this.closeLabel}" @click="${__classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleCloseClick)}"><slot name="close-icon"><svg class="close-icon" viewBox="0 -960 960 960" fill="currentColor">${this.currentMode === "docked" ? svg`<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>` : svg`<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>`}</svg></slot></m3e-icon-button>`;
};
_M3eSearchViewElement_renderClearButton = function _M3eSearchViewElement_renderClearButton() {
  return html`<m3e-icon-button class="clear" slot="trailing" aria-label="${this.open && !this._clearable ? this.closeLabel : this.clearLabel}" @click="${__classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleClearClick)}"><slot name="clear-icon"><svg class="clear-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></slot></m3e-icon-button>`;
};
_M3eSearchViewElement_initBreakpointMonitoring = function _M3eSearchViewElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eSearchViewElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall], matches => {
    const currentMode = this.currentMode;
    this._mode = matches.get(Breakpoint.XSmall) ? "fullscreen" : "docked";
    if (currentMode !== this._mode && this.open) {
      this.open = false;
    }
    __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateMode).call(this);
  }), "f");
};
_M3eSearchViewElement_handleInputSlotChange = function _M3eSearchViewElement_handleInputSlotChange(e) {
  const input = e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof HTMLInputElement);
  if (input != __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")) {
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.removeEventListener("input", __classPrivateFieldGet(this, _M3eSearchViewElement_inputInputHandler, "f"));
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.removeEventListener("focus", __classPrivateFieldGet(this, _M3eSearchViewElement_inputFocusHandler, "f"));
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eSearchViewElement_inputKeyDownHandler, "f"));
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.removeEventListener("pointerdown", __classPrivateFieldGet(this, _M3eSearchViewElement_inputPointerHandler, "f"));
    __classPrivateFieldSet(this, _M3eSearchViewElement_input, input, "f");
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.addEventListener("input", __classPrivateFieldGet(this, _M3eSearchViewElement_inputInputHandler, "f"));
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.addEventListener("focus", __classPrivateFieldGet(this, _M3eSearchViewElement_inputFocusHandler, "f"));
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.addEventListener("keydown", __classPrivateFieldGet(this, _M3eSearchViewElement_inputKeyDownHandler, "f"));
    __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.addEventListener("pointerdown", __classPrivateFieldGet(this, _M3eSearchViewElement_inputPointerHandler, "f"));
    if (__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")) {
      __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").role = __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").role || "searchbox";
      __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").inputMode = __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").inputMode || "search";
      __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").type = "text";
      __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").ariaHasPopup = "dialog";
    }
    __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateClearableState).call(this);
  }
};
_M3eSearchViewElement_handleInputInput = function _M3eSearchViewElement_handleInputInput() {
  __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_updateClearableState).call(this);
  if (this.open) {
    this.dispatchEvent(new CustomEvent("query", {
      detail: {
        term: __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.value ?? ""
      },
      bubbles: true,
      composed: true
    }));
  } else {
    this.open = true;
  }
};
_M3eSearchViewElement_updateMode = function _M3eSearchViewElement_updateMode() {
  setCustomState(this, "--fullscreen", this.currentMode === "fullscreen");
  setCustomState(this, "--docked", this.currentMode === "docked");
};
_M3eSearchViewElement_updateClearableState = function _M3eSearchViewElement_updateClearableState() {
  this._clearable = (__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.value ?? "").length > 0;
  setCustomState(this, "--clearable", this._clearable);
};
_M3eSearchViewElement_handleInputFocus = function _M3eSearchViewElement_handleInputFocus() {
  this.open = !__classPrivateFieldGet(this, _M3eSearchViewElement_closeOnInputFocus, "f");
  __classPrivateFieldSet(this, _M3eSearchViewElement_closeOnInputFocus, false, "f");
};
_M3eSearchViewElement_handleCloseClick = function _M3eSearchViewElement_handleCloseClick() {
  if (!__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")) return;
  if (__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").value) {
    this.clear();
  }
  __classPrivateFieldSet(this, _M3eSearchViewElement_closeOnInputFocus, true, "f");
  __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.focus();
};
_M3eSearchViewElement_handleClearClick = function _M3eSearchViewElement_handleClearClick() {
  if (!__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")) return;
  if (__classPrivateFieldGet(this, _M3eSearchViewElement_input, "f").value) {
    this.clear();
  } else {
    __classPrivateFieldSet(this, _M3eSearchViewElement_closeOnInputFocus, true, "f");
  }
  __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.focus();
};
_M3eSearchViewElement_handleInputPointerDown = function _M3eSearchViewElement_handleInputPointerDown() {
  if (!this.open && __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.matches(":focus")) {
    this.open = true;
  }
};
_M3eSearchViewElement_handleInputKeyDown = function _M3eSearchViewElement_handleInputKeyDown(e) {
  if (this.open && e.key === "Escape" && !e.shiftKey && !e.ctrlKey) {
    e.preventDefault();
    const input = e.target;
    if (input.value) {
      this.clear();
    }
    this.open = false;
  }
};
_M3eSearchViewElement_handleKeyDown = function _M3eSearchViewElement_handleKeyDown(e) {
  if (this.open && e.key === "Escape" && !e.shiftKey && !e.ctrlKey) {
    e.preventDefault();
    __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_handleCloseClick).call(this);
  }
};
_M3eSearchViewElement_openDocked = /** @private */
async function _M3eSearchViewElement_openDocked() {
  if (!this.dispatchEvent(new ToggleEvent("beforetoggle", {
    oldState: "closed",
    newState: "open",
    bubbles: true,
    composed: true,
    cancelable: true
  }))) {
    this.open = false;
    return;
  }
  __classPrivateFieldSet(this, _M3eSearchViewElement_openMode, this.currentMode, "f");
  const view = this._view;
  __classPrivateFieldGet(this, _M3eSearchViewElement_anchorCleanup, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eSearchViewElement_anchorLastPosition, undefined, "f");
  __classPrivateFieldSet(this, _M3eSearchViewElement_anchorCleanup, await positionAnchor(view, this._anchor, {
    position: "bottom"
  }, (x, y) => {
    const view = this._view;
    y -= this._anchor.clientHeight;
    if (__classPrivateFieldGet(this, _M3eSearchViewElement_anchorLastPosition, "f")?.y !== y) {
      view.style.top = `${y}px`;
    }
    const width = this._anchor.clientWidth;
    if (__classPrivateFieldGet(this, _M3eSearchViewElement_anchorLastPosition, "f")?.width !== width) {
      view.style.width = `${width}px`;
    }
    if (__classPrivateFieldGet(this, _M3eSearchViewElement_anchorLastPosition, "f")?.dir !== M3eDirectionality.current || __classPrivateFieldGet(this, _M3eSearchViewElement_anchorLastPosition, "f")?.x !== x) {
      if (M3eDirectionality.current === "rtl") {
        view.style.right = `${window.innerWidth - x - this.clientWidth}px`;
        view.style.left = "";
      } else {
        view.style.left = `${x}px`;
        view.style.right = "";
      }
    }
    __classPrivateFieldSet(this, _M3eSearchViewElement_anchorLastPosition, {
      x,
      y,
      width,
      dir: M3eDirectionality.current
    }, "f");
  }), "f");
  this._anchor.style.position = "relative";
  view.popover = "manual";
  view.style.position = "absolute";
  view.showPopover();
  __classPrivateFieldGet(this, _M3eSearchViewElement_scrollLockController, "f").lock();
  __classPrivateFieldGet(this, _M3eSearchViewElement_inertController, "f").lock();
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: "closed",
    newState: "open",
    bubbles: true,
    composed: true
  }));
  this.dispatchEvent(new CustomEvent("query", {
    detail: {
      term: __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.value ?? ""
    },
    bubbles: true,
    composed: true
  }));
};
_M3eSearchViewElement_closeDocked = function _M3eSearchViewElement_closeDocked() {
  const view = this._view;
  if (view.popover !== "manual") return;
  if (!this.dispatchEvent(new ToggleEvent("beforetoggle", {
    oldState: "open",
    newState: "closed",
    bubbles: true,
    composed: true,
    cancelable: true
  }))) {
    this.open = true;
    return;
  }
  __classPrivateFieldSet(this, _M3eSearchViewElement_openMode, undefined, "f");
  __classPrivateFieldGet(this, _M3eSearchViewElement_scrollLockController, "f").unlock();
  __classPrivateFieldGet(this, _M3eSearchViewElement_inertController, "f").unlock();
  if (prefersReducedMotion()) {
    __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_hideDocked).call(this);
  } else {
    view.classList.add("closing");
    view.addEventListener("transitionend", () => __classPrivateFieldGet(this, _M3eSearchViewElement_instances, "m", _M3eSearchViewElement_hideDocked).call(this), {
      once: true
    });
  }
};
_M3eSearchViewElement_hideDocked = function _M3eSearchViewElement_hideDocked() {
  __classPrivateFieldGet(this, _M3eSearchViewElement_anchorCleanup, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eSearchViewElement_anchorCleanup, undefined, "f");
  __classPrivateFieldSet(this, _M3eSearchViewElement_anchorLastPosition, undefined, "f");
  const view = this._view;
  view.classList.remove("closing");
  view.style.position = "";
  view.style.width = "";
  view.style.top = "";
  view.style.left = "";
  view.style.right = "";
  view.hidePopover();
  view.popover = null;
  this._anchor.style.position = "";
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: "open",
    newState: "closed",
    bubbles: true,
    composed: true
  }));
};
_M3eSearchViewElement_openFullscreen = /** @private */
async function _M3eSearchViewElement_openFullscreen() {
  if (!this.dispatchEvent(new ToggleEvent("beforetoggle", {
    oldState: "closed",
    newState: "open",
    bubbles: true,
    composed: true,
    cancelable: true
  }))) {
    this.open = false;
    return;
  }
  __classPrivateFieldSet(this, _M3eSearchViewElement_openMode, this.currentMode, "f");
  __classPrivateFieldGet(this, _M3eSearchViewElement_scrollLockController, "f").lock();
  __classPrivateFieldGet(this, _M3eSearchViewElement_inertController, "f").lock();
  const view = this._view;
  __classPrivateFieldGet(this, _M3eSearchViewElement_anchorCleanup, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eSearchViewElement_anchorLastPosition, undefined, "f");
  if (!prefersReducedMotion()) {
    const rect = view.getBoundingClientRect();
    const startInline = M3eDirectionality.current === "rtl" ? window.innerWidth - rect.right : rect.left;
    view.style.position = "fixed";
    view.popover = "manual";
    view.showPopover();
    this._anchor.style.position = "relative";
    view.animate([{
      transform: `translateX(${startInline}px)`,
      width: `${rect.width}px`,
      top: `${rect.top}px`,
      height: `${rect.height}px`
    }, {
      transform: "translateX(0px)",
      width: "100vw",
      top: "0px",
      height: "100vh"
    }], {
      duration: 150,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)"
    });
  } else {
    view.style.position = "fixed";
    view.popover = "manual";
    view.showPopover();
    this._anchor.style.position = "relative";
  }
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: "closed",
    newState: "open",
    bubbles: true,
    composed: true
  }));
  this.dispatchEvent(new CustomEvent("query", {
    detail: {
      term: __classPrivateFieldGet(this, _M3eSearchViewElement_input, "f")?.value ?? ""
    },
    bubbles: true,
    composed: true
  }));
};
_M3eSearchViewElement_closeFullscreen = /** @private */
async function _M3eSearchViewElement_closeFullscreen() {
  const view = this._view;
  if (view.popover !== "manual") return;
  if (!this.dispatchEvent(new ToggleEvent("beforetoggle", {
    oldState: "open",
    newState: "closed",
    bubbles: true,
    composed: true,
    cancelable: true
  }))) {
    this.open = true;
    return;
  }
  __classPrivateFieldSet(this, _M3eSearchViewElement_openMode, undefined, "f");
  __classPrivateFieldGet(this, _M3eSearchViewElement_scrollLockController, "f").unlock();
  __classPrivateFieldGet(this, _M3eSearchViewElement_inertController, "f").unlock();
  const anchor = this._anchor;
  if (!prefersReducedMotion()) {
    const start = view.getBoundingClientRect();
    const end = anchor.getBoundingClientRect();
    const startInline = M3eDirectionality.current === "rtl" ? window.innerWidth - start.right : start.left;
    const endInline = M3eDirectionality.current === "rtl" ? window.innerWidth - end.right : end.left;
    const dx = M3eDirectionality.current === "rtl" ? startInline - endInline : endInline - startInline;
    view.classList.add("closing");
    await view.animate([{
      transform: `translateX(0px)`,
      width: `${start.width}px`,
      top: `${start.top}px`,
      height: `${start.height}px`
    }, {
      transform: `translateX(${dx}px)`,
      width: `${end.width}px`,
      top: `${end.top}px`,
      height: `${end.height}px`
    }], {
      duration: 150,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)"
    }).finished;
  }
  view.hidePopover();
  view.style.position = "";
  view.popover = null;
  view.classList.remove("closing");
  anchor.style.position = "";
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: "open",
    newState: "closed",
    bubbles: true,
    composed: true
  }));
};
(() => {
  registerStyleSheet(SearchViewLightDomStyle);
})();
/** The styles of the element. */
M3eSearchViewElement.styles = SearchViewStyle;
__decorate([state()], M3eSearchViewElement.prototype, "_clearable", void 0);
__decorate([state()], M3eSearchViewElement.prototype, "_mode", void 0);
__decorate([query(".anchor")], M3eSearchViewElement.prototype, "_anchor", void 0);
__decorate([query(".view")], M3eSearchViewElement.prototype, "_view", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSearchViewElement.prototype, "contained", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSearchViewElement.prototype, "mode", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSearchViewElement.prototype, "open", void 0);
__decorate([property({
  attribute: "clear-label"
})], M3eSearchViewElement.prototype, "clearLabel", void 0);
__decorate([property({
  attribute: "close-label"
})], M3eSearchViewElement.prototype, "closeLabel", void 0);
__decorate([property({
  attribute: "hide-search-icon",
  type: Boolean
})], M3eSearchViewElement.prototype, "hideSearchIcon", void 0);
__decorate([debounce(40)], M3eSearchViewElement.prototype, "_handleFocusChange", null);
M3eSearchViewElement = __decorate([customElement("m3e-search-view")], M3eSearchViewElement);

export { M3eSearchBarElement, M3eSearchViewElement, isSearchViewMode };
//# sourceMappingURL=search.js.map
