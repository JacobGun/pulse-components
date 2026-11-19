/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { DesignToken, Disabled, AttachInternals, Role, PressedController, setCustomEnumState, customElement } from './TextOverflowElement.js';
import { DisabledInteractive } from './DisabledInteractive.js';
import { Focusable } from './Focusable.js';
import { FormSubmitter } from './FormSubmitter.js';
import { KeyboardClick } from './KeyboardClick.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is a `FabSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `FabSize`.
 */
function isFabSize(value) {
  return value === "small" || value === "medium" || value === "large";
}

/**
 * Determines whether a value is a `FabVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `FabVariant`.
 */
function isFabVariant(value) {
  return value === "primary" || value === "primary-container" || value === "secondary" || value === "secondary-container" || value === "tertiary" || value === "tertiary-container" || value === "surface";
}

/**
 * Baseline styles for `M3eFabElement`.
 * @internal
 */
const FabStyle = css`:host { display: inline-block; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .touch { position: absolute; height: 48px; left: 0; right: 0; } .wrapper { width: 100%; overflow: hidden; display: inline-flex; align-items: center; box-sizing: border-box; } .label { white-space: nowrap; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .icon { transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host(:not(:disabled):not([disabled-interactive])) { cursor: pointer; } :host([disabled-interactive]) { cursor: not-allowed; } .close-icon, ::slotted(:not([slot])), ::slotted([slot="close-icon"]) { font-size: inherit !important; flex: none; } .close-icon, ::slotted(svg:not([slot])), ::slotted(svg[slot="close-icon"]) { width: 1em; height: 1em; } .base.with-menu ::slotted([slot="label"]), .base:not(.with-menu) ::slotted([slot="close-icon"]), .base:not(.with-menu) .close-icon, :host([aria-expanded="true"]) .base.with-menu ::slotted(:not([slot])), :host([aria-expanded="false"]) .base.with-menu ::slotted([slot="close-icon"]), :host([aria-expanded="false"]) .base.with-menu .close-icon { display: none; } :host([aria-expanded="true"]) .base.with-menu { border-radius: var(--m3e-fab-menu-close-button-container-shape, ${DesignToken.shape.corner.full}); min-height: calc(var(--m3e-fab-menu-close-button-container-height, 56px) + ${DesignToken.density.calc(-3)}); } :host([aria-expanded="true"]) .base.with-menu .wrapper { padding-block-start: calc( var(--m3e-fab-menu-close-button-top-space, ${DesignToken.measurement.space200}) + ${DesignToken.density.calcHalf(-3)} ); padding-block-end: calc( var(--m3e-fab-menu-close-button-bottom-space, ${DesignToken.measurement.space200}) + ${DesignToken.density.calcHalf(-3)} ); padding-inline-start: calc( var(--m3e-fab-menu-close-button-leading-space, ${DesignToken.measurement.space200}) + ${DesignToken.density.calcHalf(-3)} ); padding-inline-end: calc( var(--m3e-fab-menu-close-button-trailing-space, ${DesignToken.measurement.space200}) + ${DesignToken.density.calcHalf(-3)} ); } :host([aria-expanded="true"]) .base.with-menu .icon { font-size: calc(var(--m3e-fab-menu-close-button-icon-size, 24px) + ${DesignToken.density.calc(-3)}); --m3e-icon-size: calc(var(--m3e-fab-menu-close-button-icon-size, 24px) + ${DesignToken.density.calc(-3)}); } .base.with-menu { transition: min-height ${DesignToken.motion.spring.fastEffects}; } .base.with-menu .wrapper { transition: padding ${DesignToken.motion.spring.fastEffects}; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } @media (forced-colors: active) { .base, .icon { transition: none; } .base { outline-style: solid; } :host(:not(:disabled):not([disabled-interactive])) .base { background-color: ButtonFace !important; outline-color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])) .label, :host(:not(:disabled):not([disabled-interactive])) .icon { color: ButtonText !important; } :host(:disabled) .base, :host([disabled-interactive]) .base { outline-color: GrayText !important; background-color: unset !important; } :host(:disabled) .label, :host([disabled-interactive]) .label, :host(:disabled) .icon, :host([disabled-interactive]) .icon { color: GrayText !important; } :host(:is(:state(--small), :--small)) .base { outline-offset: calc(0px - var(--m3e-button-small-outline-thickness, 1px)); outline-width: var(--m3e-button-small-outline-thickness, 1px); } :host(:is(:state(--medium), :--medium)) .base { outline-offset: calc(0px - var(--m3e-button-medium-outline-thickness, 1px)); outline-width: var(--m3e-button-medium-outline-thickness, 1px); } :host(:is(:state(--large), :--large)) .base { outline-offset: calc(0px - var(--m3e-button-large-outline-thickness, 2px)); outline-width: var(--m3e-button-large-outline-thickness, 2px); } } @media (prefers-reduced-motion) { .base, .base.resting, .base.pressed, .label, .icon { transition: none; } }`;

/**
 * Component design tokens that control the `M3eFabElement` for all size variants.
 * @internal
 */
const FabSizeToken = {
  /** Design tokens that control the `small` `size` variant. */
  small: {
    containerHeight: unsafeCSS(`calc(var(--m3e-fab-small-container-height, var(--m3e-fab-container-height, 56px)) + ${DesignToken.density.calc(-3)})`),
    labelTextFontSize: unsafeCSS(`var(--m3e-fab-small-label-text-font-size, var(--m3e-fab-label-text-font-size, ${DesignToken.typescale.standard.title.medium.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-fab-small-label-text-font-weight, var(--m3e-fab-label-text-font-weight, ${DesignToken.typescale.standard.title.medium.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-fab-small-label-text-line-height, var(--m3e-fab-label-text-line-height, ${DesignToken.typescale.standard.title.medium.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-fab-small-label-text-tracking, var(--m3e-fab-label-text-tracking, ${DesignToken.typescale.standard.title.medium.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-fab-small-icon-size, var(--m3e-fab-icon-size, 24px))"),
    extendedIconSize: unsafeCSS("var(--m3e-fab-small-icon-size, var(--m3e-fab-icon-size, 24px))"),
    shape: unsafeCSS(`var(--m3e-fab-small-shape, var(--m3e-fab-shape, ${DesignToken.shape.corner.large}))`),
    leadingSpace: unsafeCSS(`calc(var(--m3e-fab-small-leading-space, var(--m3e-fab-leading-space, ${DesignToken.measurement.space200})) + ${DesignToken.density.calcHalf(-3)})`),
    trailingSpace: unsafeCSS(`calc(var(--m3e-fab-small-trailing-space, var(--m3e-fab-trailing-space, ${DesignToken.measurement.space200})) + ${DesignToken.density.calcHalf(-3)})`),
    iconLabelSpace: unsafeCSS(`var(--m3e-fab-small-icon-label-space, var(--m3e-fab-icon-label-space, ${DesignToken.measurement.space100}))`),
    extendedLeadingSpace: unsafeCSS(`var(--m3e-fab-small-leading-space, var(--m3e-fab-leading-space, ${DesignToken.measurement.space200}))`),
    extendedTrailingSpace: unsafeCSS(`var(--m3e-fab-small-trailing-space, var(--m3e-fab-trailing-space, ${DesignToken.measurement.space200}))`)
  },
  /** Design tokens that control the `medium` `size` variant. */
  medium: {
    containerHeight: unsafeCSS(`calc(var(--m3e-fab-medium-container-height, var(--m3e-fab-container-height, 80px)) + ${DesignToken.density.calc(-3)})`),
    labelTextFontSize: unsafeCSS(`var(--m3e-fab-medium-label-text-font-size, var(--m3e-fab-label-text-font-size, ${DesignToken.typescale.standard.title.large.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-fab-medium-label-text-font-weight, var(--m3e-fab-label-text-font-weight, ${DesignToken.typescale.standard.title.large.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-fab-medium-label-text-line-height, var(--m3e-fab-label-text-line-height, ${DesignToken.typescale.standard.title.large.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-fab-medium-label-text-tracking, var(--m3e-fab-label-text-tracking, ${DesignToken.typescale.standard.title.large.tracking}))`),
    iconSize: unsafeCSS(`var(--m3e-fab-medium-icon-size, var(--m3e-fab-icon-size, ${DesignToken.measurement.space350}))`),
    extendedIconSize: unsafeCSS(`var(--m3e-fab-medium-icon-size, var(--m3e-fab-icon-size, ${DesignToken.measurement.space350}))`),
    shape: unsafeCSS(`var(--m3e-fab-medium-shape, var(--m3e-fab-shape, ${DesignToken.shape.corner.largeIncreased}))`),
    leadingSpace: unsafeCSS(`calc(var(--m3e-fab-medium-leading-space, var(--m3e-fab-leading-space, ${DesignToken.measurement.space325})) + ${DesignToken.density.calcHalf(-3)})`),
    trailingSpace: unsafeCSS(`calc(var(--m3e-fab-medium-trailing-space, var(--m3e-fab-trailing-space, ${DesignToken.measurement.space325})) + ${DesignToken.density.calcHalf(-3)})`),
    iconLabelSpace: unsafeCSS(`var(--m3e-fab-medium-icon-label-space, var(--m3e-fab-icon-label-space, ${DesignToken.measurement.space150}))`),
    extendedLeadingSpace: unsafeCSS(`var(--m3e-fab-medium-leading-space, var(--m3e-fab-leading-space, ${DesignToken.measurement.space325}))`),
    extendedTrailingSpace: unsafeCSS(`var(--m3e-fab-medium-trailing-space, var(--m3e-fab-trailing-space, ${DesignToken.measurement.space325}))`)
  },
  /** Design tokens that control the `large` `size` variant. */
  large: {
    containerHeight: unsafeCSS(`calc(var(--m3e-fab-large-container-height, var(--m3e-fab-container-height, 96px)) + ${DesignToken.density.calc(-3)})`),
    labelTextFontSize: unsafeCSS(`var(--m3e-fab-large-label-text-font-size, var(--m3e-fab-label-text-font-size, ${DesignToken.typescale.standard.headline.small.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-fab-large-label-text-font-weight, var(--m3e-fab-label-text-font-weight, ${DesignToken.typescale.standard.headline.small.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-fab-large-label-text-line-height, var(--m3e-fab-label-text-line-height, ${DesignToken.typescale.standard.headline.small.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-fab-large-label-text-tracking, var(--m3e-fab-label-text-tracking, ${DesignToken.typescale.standard.headline.small.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-fab-large-icon-size, var(--m3e-fab-icon-size, 36px))"),
    extendedIconSize: unsafeCSS("var(--m3e-fab-large-icon-size, var(--m3e-fab-icon-size, 36px))"),
    shape: unsafeCSS(`var(--m3e-fab-large-shape, var(--m3e-fab-shape, ${DesignToken.shape.corner.extraLarge}))`),
    leadingSpace: unsafeCSS(`calc(var(--m3e-fab-large-leading-space, var(--m3e-fab-leading-space, ${DesignToken.measurement.space350})) + ${DesignToken.density.calcHalf(-3)})`),
    trailingSpace: unsafeCSS(`calc(var(--m3e-fab-large-trailing-space, var(--m3e-fab-trailing-space, ${DesignToken.measurement.space350})) + ${DesignToken.density.calcHalf(-3)})`),
    iconLabelSpace: unsafeCSS(`var(--m3e-fab-large-icon-label-space, var(--m3e-fab-icon-label-space, ${DesignToken.measurement.space200}))`),
    extendedLeadingSpace: unsafeCSS(`var(--m3e-fab-large-leading-space, var(--m3e-fab-leading-space, ${DesignToken.measurement.space350}))`),
    extendedTrailingSpace: unsafeCSS(`var(--m3e-fab-large-trailing-space, var(--m3e-fab-trailing-space, ${DesignToken.measurement.space350}))`)
  }
};

/** @private */
function fabStyle(size) {
  const selector = unsafeCSS(`:is(:state(--${size}), :--${size})`);
  return css`:host(${selector}) .base { min-height: ${FabSizeToken[size].containerHeight}; } :host(${selector}) .base { border-radius: ${FabSizeToken[size].shape}; } :host(${selector}) .label { font-size: ${FabSizeToken[size].labelTextFontSize}; font-weight: ${FabSizeToken[size].labelTextFontWeight}; line-height: ${FabSizeToken[size].labelTextLineHeight}; letter-spacing: ${FabSizeToken[size].labelTextTracking}; } :host(${selector}:not([extended])) .wrapper { padding-inline-start: ${FabSizeToken[size].leadingSpace}; padding-inline-end: ${FabSizeToken[size].trailingSpace}; } :host(${selector}:not([extended])) .icon { font-size: ${FabSizeToken[size].iconSize}; --m3e-icon-size: ${FabSizeToken[size].iconSize}; } :host(${selector}[extended]) .wrapper { padding-inline-start: ${FabSizeToken[size].extendedLeadingSpace}; padding-inline-end: ${FabSizeToken[size].extendedTrailingSpace}; column-gap: ${FabSizeToken[size].iconLabelSpace}; } :host(${selector}[extended]) .icon { font-size: ${FabSizeToken[size].extendedIconSize}; --m3e-icon-size: ${FabSizeToken[size].extendedIconSize}; }`;
}
/**
 * Size variant styles for `M3eFabElement`.
 * @internal
 */
const FabSizeStyle = [fabStyle("small"), fabStyle("medium"), fabStyle("large")];

/**
 * Component design tokens that control the appearance variants of `M3FabElement`.
 * @internal
 */
const FabVariantToken = {
  /** Design tokens that control the `primary` variant. */
  primary: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-primary-fab-label-text-color, var(--m3e-fab-label-text-color, ${DesignToken.color.onPrimary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-primary-fab-icon-color, var(--m3e-fab-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-primary-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.primary}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-primary-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-primary-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-primary-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-primary-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-primary-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-primary-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-primary-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-primary-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-primary-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-primary-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-primary-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-primary-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-primary-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-primary-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-primary-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-primary-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-primary-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-primary-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-primary-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-primary-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  },
  /** Design tokens that control the `secondary` variant. */
  secondary: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-secondary-fab-label-text-color, var(--m3e-fab-label-text-color, ${DesignToken.color.onSecondary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-secondary-fab-icon-color, var(--m3e-fab-icon-color, ${DesignToken.color.onSecondary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-secondary-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.secondary}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-secondary-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-secondary-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-secondary-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-secondary-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-secondary-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-secondary-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-secondary-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.onSecondary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-secondary-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.onSecondary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-secondary-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-secondary-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.onSecondary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-secondary-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.onSecondary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-secondary-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-secondary-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.onSecondary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-secondary-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.onSecondary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-secondary-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  },
  /** Design tokens that control the `tertiary` variant. */
  tertiary: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-tertiary-fab-label-text-color, var(--m3e-fab-label-text-color, ${DesignToken.color.onTertiary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-tertiary-fab-icon-color, var(--m3e-fab-icon-color, ${DesignToken.color.onTertiary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-tertiary-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.tertiary}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-tertiary-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-tertiary-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-tertiary-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-tertiary-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-tertiary-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.onTertiary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.onTertiary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-tertiary-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.onTertiary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tertiary-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.onTertiary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.onTertiary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-tertiary-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.onTertiary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tertiary-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.onTertiary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.onTertiary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-tertiary-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.onTertiary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tertiary-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  },
  /** Design tokens that control the `primary-container` variant. */
  "primary-container": {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-primary-container-fab-label-text-color, var(--m3e-primary-container-fab-label-text-color, ${DesignToken.color.onPrimaryContainer}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-primary-container-fab-icon-color, var(--m3e-primary-container-fab-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-primary-container-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.primaryContainer}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-primary-container-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-primary-container-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-primary-container-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-primary-container-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-primary-container-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-primary-container-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-container-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-primary-container-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-primary-container-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-container-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-primary-container-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-container-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-primary-container-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-primary-container-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-primary-container-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-container-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-primary-container-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-container-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-primary-container-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.onPrimaryContainer}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-primary-container-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-primary-container-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-container-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-primary-container-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-primary-container-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-primary-container-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.onPrimaryContainer}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-primary-container-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-primary-container-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-primary-container-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  },
  /** Design tokens that control the `secondary-container` variant. */
  "secondary-container": {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-secondary-container-fab-label-text-color, var(--m3e-fab-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-secondary-container-fab-icon-color, var(--m3e-fab-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-secondary-container-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.secondaryContainer}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-secondary-container-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-container-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-secondary-container-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-secondary-container-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-secondary-container-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-container-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-secondary-container-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-secondary-container-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-secondary-container-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-secondary-container-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-secondary-container-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-secondary-container-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-secondary-container-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  },
  /** Design tokens that control the `tertiary-container` variant. */
  "tertiary-container": {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-tertiary-container-fab-label-text-color, var(--m3e-fab-label-text-color, ${DesignToken.color.onTertiaryContainer}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-tertiary-container-fab-icon-color, var(--m3e-fab-icon-color, ${DesignToken.color.onTertiaryContainer}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-tertiary-container-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.tertiaryContainer}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-container-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-container-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-tertiary-container-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tertiary-container-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-container-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-container-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-tertiary-container-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.onTertiaryContainer}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tertiary-container-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-tertiary-container-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-tertiary-container-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-tertiary-container-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.onTertiaryContainer}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tertiary-container-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-tertiary-container-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  },
  /** Design tokens that control the `surface` variant. */
  surface: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-surface-fab-label-text-color, var(--m3e-fab-label-text-color, ${DesignToken.color.primary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-surface-fab-icon-color, var(--m3e-fab-icon-color, ${DesignToken.color.primary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-surface-fab-container-color, var(--m3e-fab-container-color, ${DesignToken.color.surfaceContainerHigh}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-surface-fab-container-elevation, var(--m3e-fab-container-elevation, ${DesignToken.elevation.level3}))`),
    /** Lowered resting elevation. */
    loweredContainerElevation: unsafeCSS(`var(--m3e-surface-fab-lowered-container-elevation, var(--m3e-fab-lowered-container-elevation, ${DesignToken.elevation.level2}))`),
    /** Lowered container background color. */
    loweredContainerColor: unsafeCSS(`var(--m3e-surface-fab-lowered-container-color, var(--m3e-fab-lowered-container-color, ${DesignToken.color.surfaceContainerLow}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-surface-fab-disabled-container-color, var(--m3e-fab-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-surface-fab-disabled-container-opacity, var(--m3e-fab-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-surface-fab-disabled-icon-color, var(--m3e-fab-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-surface-fab-disabled-icon-opacity, var(--m3e-fab-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-surface-fab-disabled-label-text-color, var(--m3e-fab-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-surface-fab-disabled-label-text-opacity, var(--m3e-fab-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-surface-fab-disabled-container-elevation, var(--m3e-fab-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Lowered elevation when disabled. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-surface-fab-lowered-disabled-container-elevation, var(--m3e-fab-lowered-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-surface-fab-hover-icon-color, var(--m3e-fab-hover-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-surface-fab-hover-label-text-color, var(--m3e-fab-hover-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-surface-fab-hover-state-layer-color, var(--m3e-fab-hover-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-surface-fab-hover-state-layer-opacity, var(--m3e-fab-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-surface-fab-hover-container-elevation, var(--m3e-fab-hover-container-elevation, ${DesignToken.elevation.level4}))`),
      /** Lowered elevation on hover. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-surface-fab-lowered-hover-container-elevation, var(--m3e-fab-lowered-hover-container-elevation, ${DesignToken.elevation.level3}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-surface-fab-focus-icon-color, var(--m3e-fab-focus-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-surface-fab-focus-label-text-color, var(--m3e-fab-focus-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-surface-fab-focus-state-layer-color, var(--m3e-fab-focus-state-layer-color, ${DesignToken.color.primary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-surface-fab-focus-state-layer-opacity, var(--m3e-fab-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-surface-fab-focus-container-elevation, var(--m3e-fab-focus-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on focus. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-surface-fab-lowered-focus-container-elevation, var(--m3e-fab-lowered-focus-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-surface-fab-pressed-icon-color, var(--m3e-fab-pressed-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-surface-fab-pressed-label-text-color, var(--m3e-fab-pressed-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-surface-fab-pressed-state-layer-color, var(--m3e-fab-pressed-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-surface-fab-pressed-state-layer-opacity, var(--m3e-fab-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-surface-fab-pressed-container-elevation, var(--m3e-fab-pressed-container-elevation, ${DesignToken.elevation.level3}))`),
      /** Lowered elevation on pressed. */
      loweredContainerElevation: unsafeCSS(`var(--m3e-surface-fab-lowered-pressed-container-elevation, var(--m3e-fab-lowered-pressed-container-elevation, ${DesignToken.elevation.level2}))`)
    }
  }
};

/** @private */
function fabVariantStyle(variant) {
  const selector = unsafeCSS(`:is(:state(--${variant}), :--${variant})`);
  return css`:host(${selector}:not([lowered])) .base { background-color: ${FabVariantToken[variant].containerColor}; --m3e-elevation-level: ${FabVariantToken[variant].containerElevation}; --m3e-elevation-hover-level: ${FabVariantToken[variant].hover.containerElevation}; --m3e-elevation-focus-level: ${FabVariantToken[variant].focus.containerElevation}; --m3e-elevation-pressed-level: ${FabVariantToken[variant].pressed.containerElevation}; } :host(${selector}[lowered]) .base { background-color: ${FabVariantToken[variant].loweredContainerColor ?? FabVariantToken[variant].containerColor}; --m3e-elevation-level: ${FabVariantToken[variant].loweredContainerElevation}; --m3e-elevation-hover-level: ${FabVariantToken[variant].hover.loweredContainerElevation}; --m3e-elevation-focus-level: ${FabVariantToken[variant].focus.loweredContainerElevation}; --m3e-elevation-pressed-level: ${FabVariantToken[variant].pressed.loweredContainerElevation}; } :host(${selector}) .base { --m3e-state-layer-hover-color: ${FabVariantToken[variant].hover.stateLayerColor}; --m3e-state-layer-hover-opacity: ${FabVariantToken[variant].hover.stateLayerOpacity}; --m3e-state-layer-focus-color: ${FabVariantToken[variant].focus.stateLayerColor}; --m3e-state-layer-focus-opacity: ${FabVariantToken[variant].focus.stateLayerOpacity}; --m3e-ripple-color: ${FabVariantToken[variant].pressed.stateLayerColor}; --m3e-ripple-opacity: ${FabVariantToken[variant].pressed.stateLayerOpacity}; } :host(${selector}) .label { color: ${FabVariantToken[variant].labelTextColor}; } :host(${selector}:focus) .label { color: ${FabVariantToken[variant].focus.labelTextColor}; } :host(${selector}:hover) .label { color: ${FabVariantToken[variant].hover.labelTextColor}; } :host(${selector}) .base.pressed .label { color: ${FabVariantToken[variant].pressed.labelTextColor}; } :host(${selector}) .icon { color: ${FabVariantToken[variant].iconColor}; } :host(${selector}:focus) .icon { color: ${FabVariantToken[variant].focus.iconColor}; } :host(${selector}:hover) .icon { color: ${FabVariantToken[variant].hover.iconColor}; } :host(${selector}) .base.pressed .icon { color: ${FabVariantToken[variant].pressed.iconColor}; } :host(${selector}:disabled) .base, :host(${selector}[disabled-interactive]) .base { --m3e-elevation-level: ${FabVariantToken[variant].disabled.containerElevation}; background-color: color-mix( in srgb, ${FabVariantToken[variant].disabled.containerColor} ${FabVariantToken[variant].disabled.containerOpacity}, transparent ); } :host(${selector}:disabled) .label, :host(${selector}[disabled-interactive]) .label { color: color-mix( in srgb, ${FabVariantToken[variant].disabled.labelTextColor} ${FabVariantToken[variant].disabled.labelTextOpacity}, transparent ); } :host(${selector}:disabled) .icon, :host(${selector}[disabled-interactive]) .icon { color: color-mix( in srgb, ${FabVariantToken[variant].disabled.iconColor} ${FabVariantToken[variant].disabled.iconOpacity}, transparent ); }`;
}
/**
 * Appearance variant styles for `M3eFabElement`.
 * @internal
 */
const FabVariantStyle = [fabVariantStyle("primary"), fabVariantStyle("secondary"), fabVariantStyle("tertiary"), fabVariantStyle("primary-container"), fabVariantStyle("secondary-container"), fabVariantStyle("tertiary-container"), fabVariantStyle("surface")];

var _M3eFabElement_instances, _M3eFabElement_applyVariant, _M3eFabElement_applySize, _M3eFabElement_handleSlotChange;
/**
 * A floating action button (FAB) used to present important actions.
 *
 * @description
 * The `m3e-fab` component is a prominent, expressive UI component that represents the primary action on a screen.
 * Designed according to Material Design 3 guidelines, it supports seven visual variants, specified using the
 * `variant` attribute—`primary`, `primary-container`, `secondary`, `secondary-container`, `tertiary`, `tertiary-container`
 * and `surface`—each with dynamic elevation and adaptive color theming.
 *
 * The component is accessible by default, with ARIA roles, contrast-safe color tokens, and strong focus indicators.
 * It can be extended to display a label alongside its icon, and responds to interaction states (hover, focus, press, disabled)
 * with smooth motion transitions, elevation changes, and adaptive color theming. It can also function as a link or be
 * used to submit form data.
 *
 * Native disabled `<button>` elements cannot receive focus. This can be problematic in some cases because it can prevent you
 * from telling the user why the button is disabled. You can use the `disabled-interactive` attribute to style a `m3e-fab`
 * as disabled but allow for it to receive focus. The button will have `aria-disabled="true"` for assistive technology.
 *
 * @example
 * The following example illustrates a basic floating action button.
 * ```html
 * <m3e-fab>
 *  <m3e-icon>add</m3e-icon>
 * </m3e-fab>
 * ```
 *
 * @example
 * The next example illustrates an extended floating action button.
 * ```html
 * <m3e-fab extended>
 *  <m3e-icon>add</m3e-icon>
 *  <span slot="label">Add</span>
 * </m3e-fab>
 * ```
 *
 * @tag m3e-fab
 *
 * @slot - Renders the icon of the button.
 * @slot label - Renders the label of an extended button.
 * @slot close-icon - Renders the close icon when used to open a FAB menu.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr extended - Whether the button is extended to show the label.
 * @attr href - The URL to which the link button points.
 * @attr lowered - Whether to present a lowered elevation.
 * @attr name - The name of the element, submitted as a pair with the element's `value` as part of form data, when the element is used to submit a form.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr size - The size of the button.
 * @attr target - The target of the link button.
 * @attr type - The type of the element.
 * @attr value - The value associated with the element's name when it's submitted with form data.
 * @attr variant - The appearance variant of the button.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-fab-container-height - Height of the FAB container for all size variants.
 * @cssprop --m3e-fab-label-text-font-size - Font size for the FAB label text for all size variants.
 * @cssprop --m3e-fab-label-text-font-weight - Font weight for the FAB label text for all size variants.
 * @cssprop --m3e-fab-label-text-line-height - Line height for the FAB label text for all size variants.
 * @cssprop --m3e-fab-label-text-tracking - Letter spacing (tracking) for the FAB label text for all size variants.
 * @cssprop --m3e-fab-icon-size - Icon size for the FAB for all size variants.
 * @cssprop --m3e-fab-shape - Border radius for the FAB for all size variants.
 * @cssprop --m3e-fab-leading-space - Leading space for the FAB for all size variants.
 * @cssprop --m3e-fab-trailing-space - Trailing space for the FAB for all size variants.
 * @cssprop --m3e-fab-icon-label-space - Space between icon and label for the FAB for all size variants.
 * @cssprop --m3e-fab-small-container-height - Height of the small FAB container.
 * @cssprop --m3e-fab-small-label-text-font-size - Font size for the small FAB label text.
 * @cssprop --m3e-fab-small-label-text-font-weight - Font weight for the small FAB label text.
 * @cssprop --m3e-fab-small-label-text-line-height - Line height for the small FAB label text.
 * @cssprop --m3e-fab-small-label-text-tracking - Letter spacing (tracking) for the small FAB label text.
 * @cssprop --m3e-fab-small-icon-size - Icon size for the small FAB.
 * @cssprop --m3e-fab-small-shape - Border radius for the small FAB.
 * @cssprop --m3e-fab-small-leading-space - Leading space for the small FAB.
 * @cssprop --m3e-fab-small-trailing-space - Trailing space for the small FAB.
 * @cssprop --m3e-fab-small-icon-label-space - Space between icon and label for the small FAB.
 * @cssprop --m3e-fab-medium-container-height - Height of the medium FAB container.
 * @cssprop --m3e-fab-medium-label-text-font-size - Font size for the medium FAB label text.
 * @cssprop --m3e-fab-medium-label-text-font-weight - Font weight for the medium FAB label text.
 * @cssprop --m3e-fab-medium-label-text-line-height - Line height for the medium FAB label text.
 * @cssprop --m3e-fab-medium-label-text-tracking - Letter spacing (tracking) for the medium FAB label text.
 * @cssprop --m3e-fab-medium-icon-size - Icon size for the medium FAB.
 * @cssprop --m3e-fab-medium-shape - Border radius for the medium FAB.
 * @cssprop --m3e-fab-medium-leading-space - Leading space for the medium FAB.
 * @cssprop --m3e-fab-medium-trailing-space - Trailing space for the medium FAB.
 * @cssprop --m3e-fab-medium-icon-label-space - Space between icon and label for the medium FAB.
 * @cssprop --m3e-fab-large-container-height - Height of the large FAB container.
 * @cssprop --m3e-fab-large-label-text-font-size - Font size for the large FAB label text.
 * @cssprop --m3e-fab-large-label-text-font-weight - Font weight for the large FAB label text.
 * @cssprop --m3e-fab-large-label-text-line-height - Line height for the large FAB label text.
 * @cssprop --m3e-fab-large-label-text-tracking - Letter spacing (tracking) for the large FAB label text.
 * @cssprop --m3e-fab-large-icon-size - Icon size for the large FAB.
 * @cssprop --m3e-fab-large-shape - Border radius for the large FAB.
 * @cssprop --m3e-fab-large-leading-space - Leading space for the large FAB.
 * @cssprop --m3e-fab-large-trailing-space - Trailing space for the large FAB.
 * @cssprop --m3e-fab-large-icon-label-space - Space between icon and label for the large FAB.
 * @cssprop --m3e-fab-label-text-color - Default label text color for FAB (all variants).
 * @cssprop --m3e-fab-icon-color - Default icon color for FAB (all variants).
 * @cssprop --m3e-fab-container-color - Default container background color for FAB (all variants).
 * @cssprop --m3e-fab-container-elevation - Resting elevation for FAB (all variants).
 * @cssprop --m3e-fab-lowered-container-elevation - Lowered resting elevation for FAB (all variants).
 * @cssprop --m3e-fab-disabled-container-color - Container background color when disabled (all variants).
 * @cssprop --m3e-fab-disabled-container-opacity - Opacity of container when disabled (all variants).
 * @cssprop --m3e-fab-disabled-icon-color - Icon color when disabled (all variants).
 * @cssprop --m3e-fab-disabled-icon-opacity - Icon opacity when disabled (all variants).
 * @cssprop --m3e-fab-disabled-label-text-color - Label text color when disabled (all variants).
 * @cssprop --m3e-fab-disabled-label-text-opacity - Label text opacity when disabled (all variants).
 * @cssprop --m3e-fab-disabled-container-elevation - Elevation when disabled (all variants).
 * @cssprop --m3e-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (all variants).
 * @cssprop --m3e-fab-hover-icon-color - Icon color on hover (all variants).
 * @cssprop --m3e-fab-hover-label-text-color - Label text color on hover (all variants).
 * @cssprop --m3e-fab-hover-state-layer-color - State layer color on hover (all variants).
 * @cssprop --m3e-fab-hover-state-layer-opacity - State layer opacity on hover (all variants).
 * @cssprop --m3e-fab-hover-container-elevation - Elevation on hover (all variants).
 * @cssprop --m3e-fab-lowered-hover-container-elevation - Lowered elevation on hover (all variants).
 * @cssprop --m3e-fab-focus-icon-color - Icon color on focus (all variants).
 * @cssprop --m3e-fab-focus-label-text-color - Label text color on focus (all variants).
 * @cssprop --m3e-fab-focus-state-layer-color - State layer color on focus (all variants).
 * @cssprop --m3e-fab-focus-state-layer-opacity - State layer opacity on focus (all variants).
 * @cssprop --m3e-fab-focus-container-elevation - Elevation on focus (all variants).
 * @cssprop --m3e-fab-lowered-focus-container-elevation - Lowered elevation on focus (all variants).
 * @cssprop --m3e-fab-pressed-icon-color - Icon color on pressed (all variants).
 * @cssprop --m3e-fab-pressed-label-text-color - Label text color on pressed (all variants).
 * @cssprop --m3e-fab-pressed-state-layer-color - State layer color on pressed (all variants).
 * @cssprop --m3e-fab-pressed-state-layer-opacity - State layer opacity on pressed (all variants).
 * @cssprop --m3e-fab-pressed-container-elevation - Elevation on pressed (all variants).
 * @cssprop --m3e-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (all variants).
 * @cssprop --m3e-primary-fab-label-text-color - Default label text color for primary FAB.
 * @cssprop --m3e-primary-fab-icon-color - Default icon color for primary FAB.
 * @cssprop --m3e-primary-fab-container-color - Default container background color for primary FAB.
 * @cssprop --m3e-primary-fab-container-elevation - Resting elevation for primary FAB.
 * @cssprop --m3e-primary-fab-lowered-container-elevation - Lowered resting elevation for primary FAB.
 * @cssprop --m3e-primary-fab-disabled-container-color - Container background color when disabled (primary).
 * @cssprop --m3e-primary-fab-disabled-container-opacity - Opacity of container when disabled (primary).
 * @cssprop --m3e-primary-fab-disabled-icon-color - Icon color when disabled (primary).
 * @cssprop --m3e-primary-fab-disabled-icon-opacity - Icon opacity when disabled (primary).
 * @cssprop --m3e-primary-fab-disabled-label-text-color - Label text color when disabled (primary).
 * @cssprop --m3e-primary-fab-disabled-label-text-opacity - Label text opacity when disabled (primary).
 * @cssprop --m3e-primary-fab-disabled-container-elevation - Elevation when disabled (primary).
 * @cssprop --m3e-primary-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (primary).
 * @cssprop --m3e-primary-fab-hover-icon-color - Icon color on hover (primary).
 * @cssprop --m3e-primary-fab-hover-label-text-color - Label text color on hover (primary).
 * @cssprop --m3e-primary-fab-hover-state-layer-color - State layer color on hover (primary).
 * @cssprop --m3e-primary-fab-hover-state-layer-opacity - State layer opacity on hover (primary).
 * @cssprop --m3e-primary-fab-hover-container-elevation - Elevation on hover (primary).
 * @cssprop --m3e-primary-fab-lowered-hover-container-elevation - Lowered elevation on hover (primary).
 * @cssprop --m3e-primary-fab-focus-icon-color - Icon color on focus (primary).
 * @cssprop --m3e-primary-fab-focus-label-text-color - Label text color on focus (primary).
 * @cssprop --m3e-primary-fab-focus-state-layer-color - State layer color on focus (primary).
 * @cssprop --m3e-primary-fab-focus-state-layer-opacity - State layer opacity on focus (primary).
 * @cssprop --m3e-primary-fab-focus-container-elevation - Elevation on focus (primary).
 * @cssprop --m3e-primary-fab-lowered-focus-container-elevation - Lowered elevation on focus (primary).
 * @cssprop --m3e-primary-fab-pressed-icon-color - Icon color on pressed (primary).
 * @cssprop --m3e-primary-fab-pressed-label-text-color - Label text color on pressed (primary).
 * @cssprop --m3e-primary-fab-pressed-state-layer-color - State layer color on pressed (primary).
 * @cssprop --m3e-primary-fab-pressed-state-layer-opacity - State layer opacity on pressed (primary).
 * @cssprop --m3e-primary-fab-pressed-container-elevation - Elevation on pressed (primary).
 * @cssprop --m3e-primary-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (primary).
 * @cssprop --m3e-secondary-fab-label-text-color - Default label text color for secondary FAB.
 * @cssprop --m3e-secondary-fab-icon-color - Default icon color for secondary FAB.
 * @cssprop --m3e-secondary-fab-container-color - Default container background color for secondary FAB.
 * @cssprop --m3e-secondary-fab-container-elevation - Resting elevation for secondary FAB.
 * @cssprop --m3e-secondary-fab-lowered-container-elevation - Lowered resting elevation for secondary FAB.
 * @cssprop --m3e-secondary-fab-disabled-container-color - Container background color when disabled (secondary).
 * @cssprop --m3e-secondary-fab-disabled-container-opacity - Opacity of container when disabled (secondary).
 * @cssprop --m3e-secondary-fab-disabled-icon-color - Icon color when disabled (secondary).
 * @cssprop --m3e-secondary-fab-disabled-icon-opacity - Icon opacity when disabled (secondary).
 * @cssprop --m3e-secondary-fab-disabled-label-text-color - Label text color when disabled (secondary).
 * @cssprop --m3e-secondary-fab-disabled-label-text-opacity - Label text opacity when disabled (secondary).
 * @cssprop --m3e-secondary-fab-disabled-container-elevation - Elevation when disabled (secondary).
 * @cssprop --m3e-secondary-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (secondary).
 * @cssprop --m3e-secondary-fab-hover-icon-color - Icon color on hover (secondary).
 * @cssprop --m3e-secondary-fab-hover-label-text-color - Label text color on hover (secondary).
 * @cssprop --m3e-secondary-fab-hover-state-layer-color - State layer color on hover (secondary).
 * @cssprop --m3e-secondary-fab-hover-state-layer-opacity - State layer opacity on hover (secondary).
 * @cssprop --m3e-secondary-fab-hover-container-elevation - Elevation on hover (secondary).
 * @cssprop --m3e-secondary-fab-lowered-hover-container-elevation - Lowered elevation on hover (secondary).
 * @cssprop --m3e-secondary-fab-focus-icon-color - Icon color on focus (secondary).
 * @cssprop --m3e-secondary-fab-focus-label-text-color - Label text color on focus (secondary).
 * @cssprop --m3e-secondary-fab-focus-state-layer-color - State layer color on focus (secondary).
 * @cssprop --m3e-secondary-fab-focus-state-layer-opacity - State layer opacity on focus (secondary).
 * @cssprop --m3e-secondary-fab-focus-container-elevation - Elevation on focus (secondary).
 * @cssprop --m3e-secondary-fab-lowered-focus-container-elevation - Lowered elevation on focus (secondary).
 * @cssprop --m3e-secondary-fab-pressed-icon-color - Icon color on pressed (secondary).
 * @cssprop --m3e-secondary-fab-pressed-label-text-color - Label text color on pressed (secondary).
 * @cssprop --m3e-secondary-fab-pressed-state-layer-color - State layer color on pressed (secondary).
 * @cssprop --m3e-secondary-fab-pressed-state-layer-opacity - State layer opacity on pressed (secondary).
 * @cssprop --m3e-secondary-fab-pressed-container-elevation - Elevation on pressed (secondary).
 * @cssprop --m3e-secondary-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (secondary).
 * @cssprop --m3e-tertiary-fab-label-text-color - Default label text color for tertiary FAB.
 * @cssprop --m3e-tertiary-fab-icon-color - Default icon color for tertiary FAB.
 * @cssprop --m3e-tertiary-fab-container-color - Default container background color for tertiary FAB.
 * @cssprop --m3e-tertiary-fab-container-elevation - Resting elevation for tertiary FAB.
 * @cssprop --m3e-tertiary-fab-lowered-container-elevation - Lowered resting elevation for tertiary FAB.
 * @cssprop --m3e-tertiary-fab-disabled-container-color - Container background color when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-disabled-container-opacity - Opacity of container when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-disabled-icon-color - Icon color when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-disabled-icon-opacity - Icon opacity when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-disabled-label-text-color - Label text color when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-disabled-label-text-opacity - Label text opacity when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-disabled-container-elevation - Elevation when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (tertiary).
 * @cssprop --m3e-tertiary-fab-hover-icon-color - Icon color on hover (tertiary).
 * @cssprop --m3e-tertiary-fab-hover-label-text-color - Label text color on hover (tertiary).
 * @cssprop --m3e-tertiary-fab-hover-state-layer-color - State layer color on hover (tertiary).
 * @cssprop --m3e-tertiary-fab-hover-state-layer-opacity - State layer opacity on hover (tertiary).
 * @cssprop --m3e-tertiary-fab-hover-container-elevation - Elevation on hover (tertiary).
 * @cssprop --m3e-tertiary-fab-lowered-hover-container-elevation - Lowered elevation on hover (tertiary).
 * @cssprop --m3e-tertiary-fab-focus-icon-color - Icon color on focus (tertiary).
 * @cssprop --m3e-tertiary-fab-focus-label-text-color - Label text color on focus (tertiary).
 * @cssprop --m3e-tertiary-fab-focus-state-layer-color - State layer color on focus (tertiary).
 * @cssprop --m3e-tertiary-fab-focus-state-layer-opacity - State layer opacity on focus (tertiary).
 * @cssprop --m3e-tertiary-fab-focus-container-elevation - Elevation on focus (tertiary).
 * @cssprop --m3e-tertiary-fab-lowered-focus-container-elevation - Lowered elevation on focus (tertiary).
 * @cssprop --m3e-tertiary-fab-pressed-icon-color - Icon color on pressed (tertiary).
 * @cssprop --m3e-tertiary-fab-pressed-label-text-color - Label text color on pressed (tertiary).
 * @cssprop --m3e-tertiary-fab-pressed-state-layer-color - State layer color on pressed (tertiary).
 * @cssprop --m3e-tertiary-fab-pressed-state-layer-opacity - State layer opacity on pressed (tertiary).
 * @cssprop --m3e-tertiary-fab-pressed-container-elevation - Elevation on pressed (tertiary).
 * @cssprop --m3e-tertiary-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (tertiary).
 * @cssprop --m3e-primary-container-fab-label-text-color - Default label text color for primary-container FAB.
 * @cssprop --m3e-primary-container-fab-icon-color - Default icon color for primary-container FAB.
 * @cssprop --m3e-primary-container-fab-container-color - Default container background color for primary-container FAB.
 * @cssprop --m3e-primary-container-fab-container-elevation - Resting elevation for primary-container FAB.
 * @cssprop --m3e-primary-container-fab-lowered-container-elevation - Lowered resting elevation for primary-container FAB.
 * @cssprop --m3e-primary-container-fab-disabled-container-color - Container background color when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-disabled-container-opacity - Opacity of container when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-disabled-icon-color - Icon color when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-disabled-icon-opacity - Icon opacity when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-disabled-label-text-color - Label text color when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-disabled-label-text-opacity - Label text opacity when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-disabled-container-elevation - Elevation when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (primary-container).
 * @cssprop --m3e-primary-container-fab-hover-icon-color - Icon color on hover (primary-container).
 * @cssprop --m3e-primary-container-fab-hover-label-text-color - Label text color on hover (primary-container).
 * @cssprop --m3e-primary-container-fab-hover-state-layer-color - State layer color on hover (primary-container).
 * @cssprop --m3e-primary-container-fab-hover-state-layer-opacity - State layer opacity on hover (primary-container).
 * @cssprop --m3e-primary-container-fab-hover-container-elevation - Elevation on hover (primary-container).
 * @cssprop --m3e-primary-container-fab-lowered-hover-container-elevation - Lowered elevation on hover (primary-container).
 * @cssprop --m3e-primary-container-fab-focus-icon-color - Icon color on focus (primary-container).
 * @cssprop --m3e-primary-container-fab-focus-label-text-color - Label text color on focus (primary-container).
 * @cssprop --m3e-primary-container-fab-focus-state-layer-color - State layer color on focus (primary-container).
 * @cssprop --m3e-primary-container-fab-focus-state-layer-opacity - State layer opacity on focus (primary-container).
 * @cssprop --m3e-primary-container-fab-focus-container-elevation - Elevation on focus (primary-container).
 * @cssprop --m3e-primary-container-fab-lowered-focus-container-elevation - Lowered elevation on focus (primary-container).
 * @cssprop --m3e-primary-container-fab-pressed-icon-color - Icon color on pressed (primary-container).
 * @cssprop --m3e-primary-container-fab-pressed-label-text-color - Label text color on pressed (primary-container).
 * @cssprop --m3e-primary-container-fab-pressed-state-layer-color - State layer color on pressed (primary-container).
 * @cssprop --m3e-primary-container-fab-pressed-state-layer-opacity - State layer opacity on pressed (primary-container).
 * @cssprop --m3e-primary-container-fab-pressed-container-elevation - Elevation on pressed (primary-container).
 * @cssprop --m3e-primary-container-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (primary-container).
 * @cssprop --m3e-secondary-container-fab-label-text-color - Default label text color for secondary-container FAB.
 * @cssprop --m3e-secondary-container-fab-icon-color - Default icon color for secondary-container FAB.
 * @cssprop --m3e-secondary-container-fab-container-color - Default container background color for secondary-container FAB.
 * @cssprop --m3e-secondary-container-fab-container-elevation - Resting elevation for secondary-container FAB.
 * @cssprop --m3e-secondary-container-fab-lowered-container-elevation - Lowered resting elevation for secondary-container FAB.
 * @cssprop --m3e-secondary-container-fab-disabled-container-color - Container background color when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-disabled-container-opacity - Opacity of container when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-disabled-icon-color - Icon color when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-disabled-icon-opacity - Icon opacity when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-disabled-label-text-color - Label text color when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-disabled-label-text-opacity - Label text opacity when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-disabled-container-elevation - Elevation when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (secondary-container).
 * @cssprop --m3e-secondary-container-fab-hover-icon-color - Icon color on hover (secondary-container).
 * @cssprop --m3e-secondary-container-fab-hover-label-text-color - Label text color on hover (secondary-container).
 * @cssprop --m3e-secondary-container-fab-hover-state-layer-color - State layer color on hover (secondary-container).
 * @cssprop --m3e-secondary-container-fab-hover-state-layer-opacity - State layer opacity on hover (secondary-container).
 * @cssprop --m3e-secondary-container-fab-hover-container-elevation - Elevation on hover (secondary-container).
 * @cssprop --m3e-secondary-container-fab-lowered-hover-container-elevation - Lowered elevation on hover (secondary-container).
 * @cssprop --m3e-secondary-container-fab-focus-icon-color - Icon color on focus (secondary-container).
 * @cssprop --m3e-secondary-container-fab-focus-label-text-color - Label text color on focus (secondary-container).
 * @cssprop --m3e-secondary-container-fab-focus-state-layer-color - State layer color on focus (secondary-container).
 * @cssprop --m3e-secondary-container-fab-focus-state-layer-opacity - State layer opacity on focus (secondary-container).
 * @cssprop --m3e-secondary-container-fab-focus-container-elevation - Elevation on focus (secondary-container).
 * @cssprop --m3e-secondary-container-fab-lowered-focus-container-elevation - Lowered elevation on focus (secondary-container).
 * @cssprop --m3e-secondary-container-fab-pressed-icon-color - Icon color on pressed (secondary-container).
 * @cssprop --m3e-secondary-container-fab-pressed-label-text-color - Label text color on pressed (secondary-container).
 * @cssprop --m3e-secondary-container-fab-pressed-state-layer-color - State layer color on pressed (secondary-container).
 * @cssprop --m3e-secondary-container-fab-pressed-state-layer-opacity - State layer opacity on pressed (secondary-container).
 * @cssprop --m3e-secondary-container-fab-pressed-container-elevation - Elevation on pressed (secondary-container).
 * @cssprop --m3e-secondary-container-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (secondary-container).
 * @cssprop --m3e-tertiary-container-fab-label-text-color - Default label text color for tertiary-container FAB.
 * @cssprop --m3e-tertiary-container-fab-icon-color - Default icon color for tertiary-container FAB.
 * @cssprop --m3e-tertiary-container-fab-container-color - Default container background color for tertiary-container FAB.
 * @cssprop --m3e-tertiary-container-fab-container-elevation - Resting elevation for tertiary-container FAB.
 * @cssprop --m3e-tertiary-container-fab-lowered-container-elevation - Lowered resting elevation for tertiary-container FAB.
 * @cssprop --m3e-tertiary-container-fab-disabled-container-color - Container background color when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-disabled-container-opacity - Opacity of container when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-disabled-icon-color - Icon color when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-disabled-icon-opacity - Icon opacity when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-disabled-label-text-color - Label text color when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-disabled-label-text-opacity - Label text opacity when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-disabled-container-elevation - Elevation when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-hover-icon-color - Icon color on hover (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-hover-label-text-color - Label text color on hover (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-hover-state-layer-color - State layer color on hover (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-hover-state-layer-opacity - State layer opacity on hover (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-hover-container-elevation - Elevation on hover (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-lowered-hover-container-elevation - Lowered elevation on hover (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-focus-icon-color - Icon color on focus (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-focus-label-text-color - Label text color on focus (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-focus-state-layer-color - State layer color on focus (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-focus-state-layer-opacity - State layer opacity on focus (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-focus-container-elevation - Elevation on focus (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-lowered-focus-container-elevation - Lowered elevation on focus (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-pressed-icon-color - Icon color on pressed (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-pressed-label-text-color - Label text color on pressed (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-pressed-state-layer-color - State layer color on pressed (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-pressed-state-layer-opacity - State layer opacity on pressed (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-pressed-container-elevation - Elevation on pressed (tertiary-container).
 * @cssprop --m3e-tertiary-container-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (tertiary-container).
 * @cssprop --m3e-surface-fab-label-text-color - Default label text color for surface FAB.
 * @cssprop --m3e-surface-fab-icon-color - Default icon color for surface FAB.
 * @cssprop --m3e-surface-fab-container-color - Default container background color for surface FAB.
 * @cssprop --m3e-surface-fab-container-elevation - Resting elevation for surface FAB.
 * @cssprop --m3e-surface-fab-lowered-container-elevation - Lowered resting elevation for surface FAB.
 * @cssprop --m3e-surface-fab-lowered-container-color - Lowered container background color for surface FAB.
 * @cssprop --m3e-surface-fab-disabled-container-color - Container background color when disabled (surface).
 * @cssprop --m3e-surface-fab-disabled-container-opacity - Opacity of container when disabled (surface).
 * @cssprop --m3e-surface-fab-disabled-icon-color - Icon color when disabled (surface).
 * @cssprop --m3e-surface-fab-disabled-icon-opacity - Icon opacity when disabled (surface).
 * @cssprop --m3e-surface-fab-disabled-label-text-color - Label text color when disabled (surface).
 * @cssprop --m3e-surface-fab-disabled-label-text-opacity - Label text opacity when disabled (surface).
 * @cssprop --m3e-surface-fab-disabled-container-elevation - Elevation when disabled (surface).
 * @cssprop --m3e-surface-fab-lowered-disabled-container-elevation - Lowered elevation when disabled (surface).
 * @cssprop --m3e-surface-fab-hover-icon-color - Icon color on hover (surface).
 * @cssprop --m3e-surface-fab-hover-label-text-color - Label text color on hover (surface).
 * @cssprop --m3e-surface-fab-hover-state-layer-color - State layer color on hover (surface).
 * @cssprop --m3e-surface-fab-hover-state-layer-opacity - State layer opacity on hover (surface).
 * @cssprop --m3e-surface-fab-hover-container-elevation - Elevation on hover (surface).
 * @cssprop --m3e-surface-fab-lowered-hover-container-elevation - Lowered elevation on hover (surface).
 * @cssprop --m3e-surface-fab-focus-icon-color - Icon color on focus (surface).
 * @cssprop --m3e-surface-fab-focus-label-text-color - Label text color on focus (surface).
 * @cssprop --m3e-surface-fab-focus-state-layer-color - State layer color on focus (surface).
 * @cssprop --m3e-surface-fab-focus-state-layer-opacity - State layer opacity on focus (surface).
 * @cssprop --m3e-surface-fab-focus-container-elevation - Elevation on focus (surface).
 * @cssprop --m3e-surface-fab-lowered-focus-container-elevation - Lowered elevation on focus (surface).
 * @cssprop --m3e-surface-fab-pressed-icon-color - Icon color on pressed (surface).
 * @cssprop --m3e-surface-fab-pressed-label-text-color - Label text color on pressed (surface).
 * @cssprop --m3e-surface-fab-pressed-state-layer-color - State layer color on pressed (surface).
 * @cssprop --m3e-surface-fab-pressed-state-layer-opacity - State layer opacity on pressed (surface).
 * @cssprop --m3e-surface-fab-pressed-container-elevation - Elevation on pressed (surface).
 * @cssprop --m3e-surface-fab-lowered-pressed-container-elevation - Lowered elevation on pressed (surface).
 */
let M3eFabElement = class M3eFabElement extends KeyboardClick(LinkButton(FormSubmitter(Focusable(DisabledInteractive(Disabled(AttachInternals(Role(LitElement, "button"), true))))))) {
  constructor() {
    super();
    _M3eFabElement_instances.add(this);
    /**
     * The appearance variant of the button.
     * @default "primary-container"
     */
    this.variant = "primary-container";
    /**
     * Whether to present a lowered elevation.
     * @default false
     */
    this.lowered = false;
    /**
     * The size of the button.
     * @default "medium"
     */
    this.size = "medium";
    /**
     * Whether the button is extended to show the label.
     * @default false
     */
    this.extended = false;
    new PressedController(this, {
      isPressedKey: key => key === " ",
      callback: pressed => {
        if (!this.disabled && !this.disabledInteractive) {
          this._base?.classList.toggle("pressed", pressed);
          this._base?.classList.toggle("resting", !pressed);
        }
      }
    });
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eFabElement_instances, "m", _M3eFabElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eFabElement_instances, "m", _M3eFabElement_applySize).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._base?.classList.toggle("pressed", false);
    this._base?.classList.toggle("resting", false);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eFabElement_instances, "m", _M3eFabElement_applyVariant).call(this);
    }
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eFabElement_instances, "m", _M3eFabElement_applySize).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._elevation, this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled") && this.disabled || _changedProperties.has("disabledInteractive") && this.disabledInteractive) {
      this._base?.classList.toggle("pressed", false);
      this._base?.classList.toggle("resting", false);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-elevation class="elevation" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-elevation><m3e-state-layer class="state-layer" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-ripple><div class="touch" aria-hidden="true"></div>${this[renderPseudoLink]()}<div class="wrapper"><slot class="icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eFabElement_instances, "m", _M3eFabElement_handleSlotChange)}"></slot><slot class="icon" aria-hidden="true" name="close-icon"><svg class="close-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></slot><m3e-collapsible class="label-wrapper" orientation="horizontal" ?open="${this.extended}"><div class="label"><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eFabElement_instances, "m", _M3eFabElement_handleSlotChange)}"></slot></div></m3e-collapsible></div></div>`;
  }
};
_M3eFabElement_instances = new WeakSet();
_M3eFabElement_applyVariant = function _M3eFabElement_applyVariant() {
  if (!isFabVariant(this.variant)) {
    this.variant = "primary-container";
  }
  setCustomEnumState(this, this.variant, "primary", "primary-container", "secondary", "secondary-container", "surface", "tertiary", "tertiary-container");
};
_M3eFabElement_applySize = function _M3eFabElement_applySize() {
  if (!isFabSize(this.size)) {
    this.size = "medium";
  }
  setCustomEnumState(this, this.size, "large", "medium", "small");
};
_M3eFabElement_handleSlotChange = function _M3eFabElement_handleSlotChange() {
  this._base?.classList.toggle("with-menu", this.querySelector("m3e-fab-menu-trigger") !== null);
};
/** The styles of the element. */
M3eFabElement.styles = [FabSizeStyle, FabVariantStyle, FabStyle];
__decorate([query(".base")], M3eFabElement.prototype, "_base", void 0);
__decorate([query(".elevation")], M3eFabElement.prototype, "_elevation", void 0);
__decorate([query(".focus-ring")], M3eFabElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eFabElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eFabElement.prototype, "_ripple", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eFabElement.prototype, "variant", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eFabElement.prototype, "lowered", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eFabElement.prototype, "size", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eFabElement.prototype, "extended", void 0);
M3eFabElement = __decorate([customElement("m3e-fab")], M3eFabElement);

export { M3eFabElement, isFabSize, isFabVariant };
//# sourceMappingURL=fab.js.map
