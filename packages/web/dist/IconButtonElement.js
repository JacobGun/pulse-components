/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, nothing, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { DesignToken, Disabled, AttachInternals, Role, ResizeController, FocusController, PressedController, hasCustomState, deleteCustomState, setCustomEnumState, addCustomState, prefersReducedMotion, setCustomState, debounce, customElement } from './TextOverflowElement.js';
import { DisabledInteractive } from './DisabledInteractive.js';
import { Focusable } from './Focusable.js';
import { FormSubmitter } from './FormSubmitter.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { KeyboardClick } from './KeyboardClick.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is an `IconButtonSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconButtonSize`.
 */
function isIconButtonSize(value) {
  return value === "extra-small" || value === "small" || value === "medium" || value === "large" || value === "extra-large";
}

/**
 * Determines whether a value is an `IconButtonShape`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconButtonShape`.
 */
function isIconButtonShape(value) {
  return value === "rounded" || value === "square";
}

/**
 * Determines whether a value is an `IconButtonVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconButtonVariant`.
 */
function isIconButtonVariant(value) {
  return value === "filled" || value === "tonal" || value === "outlined" || value === "elevated" || value === "standard";
}

/**
 * Determines whether a value is an `IconButtonWidth`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconButtonWidth`.
 */
function isIconButtonWidth(value) {
  return value === "default" || value === "narrow" || value === "wide";
}

/**
 * Component design tokens that control the `M3eIconButtonElement` for all size variants.
 * @internal
 */
const IconButtonSizeToken = {
  /** Design tokens that control the `extra-small` `size` variant. */
  "extra-small": {
    containerHeight: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-container-height, var(--m3e-icon-button-container-height, 32px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-icon-button-extra-small-outline-thickness, var(--m3e-icon-button-outline-thickness, 1px))"),
    iconSize: unsafeCSS(`var(--m3e-icon-button-extra-small-icon-size, var(--m3e-icon-button-icon-size, 20px))`),
    shapeRound: unsafeCSS(`var(--m3e-icon-button-extra-small-shape-round, var(--m3e-icon-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-icon-button-extra-small-shape-square, var(--m3e-icon-button-shape-square, ${DesignToken.shape.corner.medium}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-icon-button-extra-small-selected-shape-round, var(--m3e-icon-button-selected-shape-round, ${DesignToken.shape.corner.medium}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-icon-button-extra-small-selected-shape-square, var(--m3e-icon-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-icon-button-extra-small-shape-pressed-morph, var(--m3e-icon-button-shape-pressed-morph, ${DesignToken.shape.corner.small}))`),
    narrowLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-narrow-leading-space, var(--m3e-icon-button-narrow-leading-space, ${DesignToken.measurement.space50})) + ${DesignToken.density.calcHalf(-3)})`),
    narrowTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-narrow-trailing-space, var(--m3e-icon-button-narrow-trailing-space, ${DesignToken.measurement.space50})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-default-leading-space, var(--m3e-icon-button-default-leading-space, ${DesignToken.measurement.space75})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-default-trailing-space, var(--m3e-icon-button-default-trailing-space, ${DesignToken.measurement.space75})) + ${DesignToken.density.calcHalf(-3)})`),
    wideLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-wide-leading-space, var(--m3e-icon-button-wide-leading-space, ${DesignToken.measurement.space125})) + ${DesignToken.density.calcHalf(-3)})`),
    wideTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-small-wide-trailing-space, var(--m3e-icon-button-wide-trailing-space, ${DesignToken.measurement.space125})) + ${DesignToken.density.calcHalf(-3)})`)
  },
  /** Design tokens that control the `small` `size` variant. */
  small: {
    containerHeight: unsafeCSS(`calc(var(--m3e-icon-button-small-container-height, var(--m3e-icon-button-container-height, 40px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-icon-button-small-outline-thickness, var(--m3e-icon-button-outline-thickness, 1px))"),
    iconSize: unsafeCSS(`var(--m3e-icon-button-small-icon-size, var(--m3e-icon-button-icon-size, 24px))`),
    shapeRound: unsafeCSS(`var(--m3e-icon-button-small-shape-round, var(--m3e-icon-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-icon-button-small-shape-square, var(--m3e-icon-button-shape-square, ${DesignToken.shape.corner.medium}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-icon-button-small-selected-shape-round, var(--m3e-icon-button-selected-shape-round, ${DesignToken.shape.corner.medium}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-icon-button-small-selected-shape-square, var(--m3e-icon-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-icon-button-small-shape-pressed-morph, var(--m3e-icon-button-shape-pressed-morph, ${DesignToken.shape.corner.small}))`),
    narrowLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-small-narrow-leading-space, var(--m3e-icon-button-narrow-leading-space, ${DesignToken.measurement.space50})) + ${DesignToken.density.calcHalf(-3)})`),
    narrowTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-small-narrow-trailing-space, var(--m3e-icon-button-narrow-trailing-space, ${DesignToken.measurement.space50})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-small-default-leading-space, var(--m3e-icon-button-default-leading-space, ${DesignToken.measurement.space100})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-small-default-trailing-space, var(--m3e-icon-button-default-trailing-space, ${DesignToken.measurement.space100})) + ${DesignToken.density.calcHalf(-3)})`),
    wideLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-small-wide-leading-space, var(--m3e-icon-button-wide-leading-space, ${DesignToken.measurement.space175})) + ${DesignToken.density.calcHalf(-3)})`),
    wideTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-small-wide-trailing-space, var(--m3e-icon-button-wide-trailing-space, ${DesignToken.measurement.space175})) + ${DesignToken.density.calcHalf(-3)})`)
  },
  /** Design tokens that control the `medium` `size` variant. */
  medium: {
    containerHeight: unsafeCSS(`calc(var(--m3e-icon-button-medium-container-height, var(--m3e-icon-button-container-height, 56px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-icon-button-medium-outline-thickness, var(--m3e-icon-button-outline-thickness, 1px))"),
    iconSize: unsafeCSS(`var(--m3e-icon-button-medium-icon-size, var(--m3e-icon-button-icon-size, 24px))`),
    shapeRound: unsafeCSS(`var(--m3e-icon-button-medium-shape-round, var(--m3e-icon-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-icon-button-medium-shape-square, var(--m3e-icon-button-shape-square, ${DesignToken.shape.corner.large}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-icon-button-medium-selected-shape-round, var(--m3e-icon-button-selected-shape-round, ${DesignToken.shape.corner.large}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-icon-button-medium-selected-shape-square, var(--m3e-icon-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-icon-button-medium-shape-pressed-morph, var(--m3e-icon-button-shape-pressed-morph, ${DesignToken.shape.corner.medium}))`),
    narrowLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-medium-narrow-leading-space, var(--m3e-icon-button-narrow-leading-space, ${DesignToken.measurement.space150})) + ${DesignToken.density.calcHalf(-3)})`),
    narrowTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-medium-narrow-trailing-space, var(--m3e-icon-button-narrow-trailing-space, ${DesignToken.measurement.space150})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-medium-default-leading-space, var(--m3e-icon-button-default-leading-space, ${DesignToken.measurement.space200})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-medium-default-trailing-space, var(--m3e-icon-button-default-trailing-space, ${DesignToken.measurement.space200})) + ${DesignToken.density.calcHalf(-3)})`),
    wideLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-medium-wide-leading-space, var(--m3e-icon-button-wide-leading-space, ${DesignToken.measurement.space300})) + ${DesignToken.density.calcHalf(-3)})`),
    wideTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-medium-wide-trailing-space, var(--m3e-icon-button-wide-trailing-space, ${DesignToken.measurement.space300})) + ${DesignToken.density.calcHalf(-3)})`)
  },
  /** Design tokens that control the `large` `size` variant. */
  large: {
    containerHeight: unsafeCSS(`calc(var(--m3e-icon-button-large-container-height, var(--m3e-icon-button-container-height, 96px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-icon-button-large-outline-thickness, var(--m3e-icon-button-outline-thickness, 2px))"),
    iconSize: unsafeCSS(`var(--m3e-icon-button-large-icon-size, var(--m3e-icon-button-icon-size, 32px))`),
    shapeRound: unsafeCSS(`var(--m3e-icon-button-large-shape-round, var(--m3e-icon-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-icon-button-large-shape-square, var(--m3e-icon-button-shape-square, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-icon-button-large-selected-shape-round, var(--m3e-icon-button-selected-shape-round, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-icon-button-large-selected-shape-square, var(--m3e-icon-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-icon-button-large-shape-pressed-morph, var(--m3e-icon-button-shape-pressed-morph, ${DesignToken.shape.corner.large}))`),
    narrowLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-large-narrow-leading-space, var(--m3e-icon-button-narrow-leading-space, ${DesignToken.measurement.space200})) + ${DesignToken.density.calcHalf(-3)})`),
    narrowTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-large-narrow-trailing-space, var(--m3e-icon-button-narrow-trailing-space, ${DesignToken.measurement.space200})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-large-default-leading-space, var(--m3e-icon-button-default-leading-space, ${DesignToken.measurement.space400})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-large-default-trailing-space, var(--m3e-icon-button-default-trailing-space, ${DesignToken.measurement.space400})) + ${DesignToken.density.calcHalf(-3)})`),
    wideLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-large-wide-leading-space, var(--m3e-icon-button-wide-leading-space, ${DesignToken.measurement.space600})) + ${DesignToken.density.calcHalf(-3)})`),
    wideTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-large-wide-trailing-space, var(--m3e-icon-button-wide-trailing-space, ${DesignToken.measurement.space600})) + ${DesignToken.density.calcHalf(-3)})`)
  },
  /** Design tokens that control the `extra-large` `size` variant. */
  "extra-large": {
    containerHeight: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-container-height, var(--m3e-icon-button-container-height, 136px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-icon-button-extra-large-outline-thickness, var(--m3e-icon-button-outline-thickness, 3px))"),
    iconSize: unsafeCSS(`var(--m3e-icon-button-extra-large-icon-size, var(--m3e-icon-button-icon-size, 40px))`),
    shapeRound: unsafeCSS(`var(--m3e-icon-button-extra-large-shape-round, var(--m3e-icon-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-icon-button-extra-large-shape-square, var(--m3e-icon-button-shape-square, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-icon-button-extra-large-selected-shape-round, var(--m3e-icon-button-selected-shape-round, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-icon-button-extra-large-selected-shape-square, var(--m3e-icon-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-icon-button-extra-large-shape-pressed-morph, var(--m3e-icon-button-shape-pressed-morph, ${DesignToken.shape.corner.large}))`),
    narrowLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-narrow-leading-space, var(--m3e-icon-button-narrow-leading-space, ${DesignToken.measurement.space400})) + ${DesignToken.density.calcHalf(-3)})`),
    narrowTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-narrow-trailing-space, var(--m3e-icon-button-narrow-trailing-space, ${DesignToken.measurement.space400})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-default-leading-space, var(--m3e-icon-button-default-leading-space, ${DesignToken.measurement.space600})) + ${DesignToken.density.calcHalf(-3)})`),
    defaultTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-default-trailing-space, var(--m3e-icon-button-default-trailing-space, ${DesignToken.measurement.space600})) + ${DesignToken.density.calcHalf(-3)})`),
    wideLeadingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-wide-leading-space, var(--m3e-icon-button-wide-leading-space, ${DesignToken.measurement.space900})) + ${DesignToken.density.calcHalf(-3)})`),
    wideTrailingSpace: unsafeCSS(`calc(var(--m3e-icon-button-extra-large-wide-trailing-space, var(--m3e-icon-button-wide-trailing-space, ${DesignToken.measurement.space900})) + ${DesignToken.density.calcHalf(-3)})`)
  }
};

/** @private */
function iconButtonStyle(size) {
  const selector = unsafeCSS(`:is(:state(--${size}), :--${size})`);
  return css`:host(${selector}) .base { height: ${IconButtonSizeToken[size].containerHeight}; } :host(${selector}:is(:state(--default), :--default)) .wrapper { padding-inline-start: calc( ${IconButtonSizeToken[size].defaultLeadingSpace} - calc(var(--_adjacent-shrink, 0px) / 2) ); padding-inline-end: calc( ${IconButtonSizeToken[size].defaultTrailingSpace} - calc(var(--_adjacent-shrink, 0px) / 2) ); } :host(${selector}:is(:state(--narrow), :--narrow)) .wrapper { padding-inline-start: calc( ${IconButtonSizeToken[size].narrowLeadingSpace} - calc(var(--_adjacent-shrink, 0px) / 2) ); padding-inline-end: calc( ${IconButtonSizeToken[size].narrowTrailingSpace} - calc(var(--_adjacent-shrink, 0px) / 2) ); } :host(${selector}:is(:state(--wide), :--wide)) .wrapper { padding-inline-start: calc( ${IconButtonSizeToken[size].wideLeadingSpace} - calc(var(--_adjacent-shrink, 0px) / 2) ); padding-inline-end: calc(${IconButtonSizeToken[size].wideTrailingSpace} - calc(var(--_adjacent-shrink, 0px) / 2)); } :host(${selector}) .icon { font-size: ${IconButtonSizeToken[size].iconSize}; } :host(${selector}) .base { outline-offset: calc(0px - ${IconButtonSizeToken[size].outlineThickness}); outline-width: ${IconButtonSizeToken[size].outlineThickness}; } :host( :not(:is(:state(--connected), :--connected))${selector}:is(:state(--rounded), :--rounded):not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${IconButtonSizeToken[size].shapeRound}); } :host( :is(:state(--connected), :--connected)${selector}:is(:state(--rounded), :--rounded)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${IconButtonSizeToken[size].shapeRound}); } :host(:not(:is(:state(--connected), :--connected))${selector}:is(:state(--square), :--square)) .base { border-radius: ${IconButtonSizeToken[size].shapeSquare}; } :host( :not(:is(:state(--connected), :--connected))${selector}:is(:state(--rounded), :--rounded)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: ${IconButtonSizeToken[size].selectedShapeRound}; } :host( :not(:is(:state(--connected), :--connected))${selector}:is(:state(--square), :--square)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${IconButtonSizeToken[size].selectedShapeSquare}); } :host(:not(:is(:state(--connected), :--connected))${selector}:is(:state(--pressed), :--pressed)) .base { border-radius: ${IconButtonSizeToken[size].shapePressedMorph}; } :host(:is(:state(--connected), :--connected)${selector}:is(:state(--rounded), :--rounded):not([toggle][selected])) .base { border-start-start-radius: var( --_button-rounded-start-shape, var(--_button-shape, ${IconButtonSizeToken[size].shapeRound}) ); border-end-start-radius: var( --_button-rounded-start-shape, var(--_button-shape, ${IconButtonSizeToken[size].shapeRound}) ); border-start-end-radius: var( --_button-rounded-end-shape, var(--_button-shape, ${IconButtonSizeToken[size].shapeRound}) ); border-end-end-radius: var( --_button-rounded-end-shape, var(--_button-shape, ${IconButtonSizeToken[size].shapeRound}) ); } :host(:is(:state(--connected), :--connected)${selector}:is(:state(--square), :--square)) .base { border-start-start-radius: var(--_button-square-start-shape, ${IconButtonSizeToken[size].shapeSquare}); border-end-start-radius: var(--_button-square-start-shape, ${IconButtonSizeToken[size].shapeSquare}); border-start-end-radius: var(--_button-square-end-shape, ${IconButtonSizeToken[size].shapeSquare}); border-end-end-radius: var(--_button-square-end-shape, ${IconButtonSizeToken[size].shapeSquare}); } :host( :is(:state(--connected), :--connected)${selector}:is(:state(--square), :--square)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${IconButtonSizeToken[size].selectedShapeSquare}); } :host(:is(:state(--connected), :--connected)${selector}:is(:state(--pressed), :--pressed)) .base { border-start-start-radius: var( --_button-start-shape-pressed-morph, ${IconButtonSizeToken[size].shapePressedMorph} ); border-end-start-radius: var(--_button-start-shape-pressed-morph, ${IconButtonSizeToken[size].shapePressedMorph}); border-start-end-radius: var(--_button-end-shape-pressed-morph, ${IconButtonSizeToken[size].shapePressedMorph}); border-end-end-radius: var(--_button-end-shape-pressed-morph, ${IconButtonSizeToken[size].shapePressedMorph}); }`;
}
/**
 * Size variant styles for `M3eIconButtonElement`.
 * @internal
 */
const IconButtonSizeStyle = [iconButtonStyle("extra-small"), iconButtonStyle("small"), iconButtonStyle("medium"), iconButtonStyle("large"), iconButtonStyle("extra-large")];

/**
 * Baseline styles for `M3eIconButtonElement`.
 * @internal
 */
const IconButtonStyle = css`:host { display: inline-block; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .layout, .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; } .layout { width: var(--_icon-button-size, 100%); min-width: var(--_icon-button-min-size); min-height: var(--_icon-button-min-size); height: var(--_icon-button-size, 100%); } .base { position: relative; width: var(--_icon-button-size, 100%); transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .touch { position: absolute; aspect-ratio: 1 / 1; height: 48px; left: auto; right: auto; } :host(:is(:state(--pressed), :--pressed)) .base, :host(:is(:state(--resting), :--resting)) .base { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
          border-radius ${DesignToken.motion.spring.fastEffects}`)}; } .wrapper { width: 100%; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; transition: ${unsafeCSS(`padding-inline ${DesignToken.motion.spring.fastEffects}`)}; } .icon { transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; --m3e-icon-size: 1em; } :host(:not(:disabled):not([disabled-interactive])) { cursor: pointer; } :host([disabled-interactive]) { cursor: not-allowed; } ::slotted(*) { font-size: inherit !important; flex: none; transform: var(--_icon-button-icon-transform); transform-origin: center center; transition: ${unsafeCSS(`transform var(--_icon-button-icon-transform-transition, ${DesignToken.motion.spring.fastEffects})`)}; } ::slotted(svg) { width: 1em; height: 1em; } :host([toggle]:not([selected])) .base.with-selected-icon slot[name="selected"], :host([toggle][selected]) .base.with-selected-icon slot:not([name]) { display: none; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } :host(:is(:state(--grouped), :--grouped):is(:state(--connected), :--connected)) { flex: 1 1 auto; } :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) { transition: ${unsafeCSS(`width ${DesignToken.motion.spring.fastSpatial}`)}; } :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) .wrapper { transition: ${unsafeCSS(`padding-inline ${DesignToken.motion.spring.fastSpatial}`)}; } :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) { flex-shrink: 0; flex-grow: 0; } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):not( :is(:state(--pressed), :--pressed, :state(--adjacent-pressed), :--adjacent-pressed) ) ) { width: var(--_button-width); } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):not( :is(:state(--pressed), :--pressed) ):is(:state(--adjacent-pressed), :--adjacent-pressed) ) { width: calc(var(--_button-width) - var(--_adjacent-shrink, 0px)); } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):is( :state(--pressed), :--pressed ):not([disabled-interactive]):not(:disabled) ) { width: calc(var(--_button-width) + var(--_pressed-growth, 0px)); /* Padding grows with the width, so the icon keeps its box while the spring overshoots on release. */ --_adjacent-shrink: calc(var(--_pressed-growth, 0px) * -1); } @media (forced-colors: active) { .base, .icon { transition: none; } :host(:is(:state(--pressed), :--pressed)) .base, :host(:is(:state(--resting), :--resting)) .base { transition: border-radius ${DesignToken.motion.spring.fastEffects}; } :host(:not(:disabled):not([disabled-interactive]):not([toggle])) .base { background-color: ButtonFace !important; outline-color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive]):not([toggle])) .icon { color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .base { background-color: ButtonFace !important; outline-color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .icon, :host(:hover:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .icon, :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected]):focus) .icon { color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])[toggle][selected]) .base { background-color: ButtonText !important; outline: none !important; } :host(:not(:disabled):not([disabled-interactive])[toggle][selected]) .icon, :host(:hover:not(:disabled):not([disabled-interactive])[toggle][selected]) .icon, :host(:not(:disabled):not([disabled-interactive])[toggle][selected]:focus) .icon { forced-color-adjust: none; color: ButtonFace !important; background-color: ButtonText !important; } :host(:disabled) .base, :host([disabled-interactive]) .base { outline-color: GrayText !important; background-color: unset !important; } :host(:disabled) .icon, :host([disabled-interactive]) .icon { color: GrayText !important; } .base { outline-style: solid; } :host(:is(:state(--extra-small), :--extra-small)) .base { outline-offset: calc(0px - var(--m3e-icon-button-extra-small-outline-thickness, 1px)); outline-width: var(--m3e-icon-button-extra-small-outline-thickness, 1px); } :host(:is(:state(--small), :--small)) .base { outline-offset: calc(0px - var(--m3e-icon-button-small-outline-thickness, 1px)); outline-width: var(--m3e-icon-button-small-outline-thickness, 1px); } :host(:is(:state(--medium), :--medium)) .base { outline-offset: calc(0px - var(--m3e-icon-button-medium-outline-thickness, 1px)); outline-width: var(--m3e-icon-button-medium-outline-thickness, 1px); } :host(:is(:state(--large), :--large)) .base { outline-offset: calc(0px - var(--m3e-icon-button-large-outline-thickness, 2px)); outline-width: var(--m3e-icon-button-large-outline-thickness, 2px); } :host(:is(:state(--extra-large), :--extra-large)) .base { outline-offset: calc(0px - var(--m3e-icon-button-extra-large-outline-thickness, 3px)); outline-width: var(--m3e-icon-button-extra-large-outline-thickness, 3px); } } @media (prefers-reduced-motion) { :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))), :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) .wrapper, :host(:is(:state(--pressed), :--pressed)) .base, :host(:is(:state(--resting), :--resting)) .base, .base, .wrapper, .icon { transition: none; } }`;

/**
 * Component design tokens that control the appearance variants of `M3eIconButtonElement`.
 * @internal
 */
const IconButtonVariantToken = {
  /** Design tokens that control the `elevated` variant. */
  elevated: {
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-elevated-icon-button-icon-color, var(--m3e-icon-button-icon-color, ${DesignToken.color.primary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-elevated-icon-button-container-color, var(--m3e-icon-button-container-color, ${DesignToken.color.surfaceContainerLow}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-elevated-icon-button-container-elevation, var(--m3e-icon-button-container-elevation, ${DesignToken.elevation.level1}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-unselected-icon-color, var(--m3e-icon-button-unselected-icon-color, ${DesignToken.color.primary}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-elevated-icon-button-unselected-container-color, var(--m3e-icon-button-unselected-container-color, ${DesignToken.color.surfaceContainerLow}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-selected-icon-color, var(--m3e-icon-button-selected-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-elevated-icon-button-selected-container-color, var(--m3e-icon-button-selected-container-color, ${DesignToken.color.primary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-elevated-icon-button-disabled-container-color, var(--m3e-icon-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-elevated-icon-button-disabled-container-opacity, var(--m3e-icon-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-elevated-icon-button-disabled-icon-color, var(--m3e-icon-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-elevated-icon-button-disabled-icon-opacity, var(--m3e-icon-button-disabled-icon-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-icon-button-disabled-container-elevation, var(--m3e-icon-button-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-elevated-icon-button-hover-icon-color, var(--m3e-icon-button-hover-icon-color, ${DesignToken.color.primary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-hover-state-layer-color, var(--m3e-icon-button-hover-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-icon-button-hover-state-layer-opacity, var(--m3e-icon-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-icon-button-hover-container-elevation, var(--m3e-icon-button-hover-container-elevation, ${DesignToken.elevation.level2}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-hover-unselected-icon-color, var(--m3e-icon-button-hover-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-hover-unselected-state-layer-color, var(--m3e-icon-button-hover-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-hover-selected-icon-color, var(--m3e-icon-button-hover-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected ripple color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-hover-selected-state-layer-color, var(--m3e-icon-button-hover-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-elevated-icon-button-focus-icon-color, var(--m3e-icon-button-focus-icon-color, ${DesignToken.color.primary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-focus-state-layer-color, var(--m3e-icon-button-focus-state-layer-color, ${DesignToken.color.primary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-icon-button-focus-state-layer-opacity, var(--m3e-icon-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-icon-button-focus-container-elevation, var(--m3e-icon-button-focus-container-elevation, ${DesignToken.elevation.level1}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-focus-unselected-icon-color, var(--m3e-icon-button-focus-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected ripple color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-focus-unselected-state-layer-color, var(--m3e-icon-button-focus-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-focus-selected-icon-color, var(--m3e-icon-button-focus-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected ripple color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-focus-selected-state-layer-color, var(--m3e-icon-button-focus-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-icon-color, var(--m3e-icon-button-pressed-icon-color, ${DesignToken.color.primary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-state-layer-color, var(--m3e-icon-button-pressed-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-state-layer-opacity, var(--m3e-icon-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-container-elevation, var(--m3e-icon-button-pressed-container-elevation, ${DesignToken.elevation.level1}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-unselected-icon-color, var(--m3e-icon-button-pressed-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected ripple color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-unselected-state-layer-color, var(--m3e-icon-button-pressed-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-selected-icon-color, var(--m3e-icon-button-pressed-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected ripple color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-icon-button-pressed-selected-state-layer-color, var(--m3e-icon-button-pressed-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    }
  },
  /** Design tokens that control the `outlined` variant. */
  outlined: {
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-outlined-icon-button-icon-color, var(--m3e-icon-button-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Default outline color. */
    outlineColor: unsafeCSS(`var(--m3e-outlined-icon-button-outline-color, var(--m3e-icon-button-outline-color, ${DesignToken.color.outlineVariant}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-unselected-icon-color, var(--m3e-icon-button-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-selected-icon-color, var(--m3e-icon-button-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-outlined-icon-button-selected-container-color, var(--m3e-icon-button-selected-container-color, ${DesignToken.color.inverseSurface}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-outlined-icon-button-disabled-container-color, var(--m3e-icon-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-outlined-icon-button-disabled-container-opacity, var(--m3e-icon-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-outlined-icon-button-disabled-icon-color, var(--m3e-icon-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-outlined-icon-button-disabled-icon-opacity, var(--m3e-icon-button-disabled-icon-opacity, 38%))`),
      /** Outline color when disabled. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-icon-button-disabled-outline-color, var(--m3e-icon-button-disabled-outline-color, ${DesignToken.color.outlineVariant}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-icon-color, var(--m3e-icon-button-hover-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Outline color on hover. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-outline-color, var(--m3e-icon-button-hover-outline-color, ${DesignToken.color.outlineVariant}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-state-layer-color, var(--m3e-icon-button-hover-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-icon-button-hover-state-layer-opacity, var(--m3e-icon-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-unselected-icon-color, var(--m3e-icon-button-hover-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-unselected-state-layer-color, var(--m3e-icon-button-hover-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-selected-icon-color, var(--m3e-icon-button-hover-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-hover-selected-state-layer-color, var(--m3e-icon-button-hover-selected-state-layer-color, ${DesignToken.color.inverseOnSurface}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-icon-color, var(--m3e-icon-button-focus-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Outline color on focus. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-outline-color, var(--m3e-icon-button-focus-outline-color, ${DesignToken.color.outlineVariant}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-state-layer-color, var(--m3e-icon-button-focus-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-icon-button-focus-state-layer-opacity, var(--m3e-icon-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-unselected-icon-color, var(--m3e-icon-button-focus-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-unselected-state-layer-color, var(--m3e-icon-button-focus-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-selected-icon-color, var(--m3e-icon-button-focus-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-focus-selected-state-layer-color, var(--m3e-icon-button-focus-selected-state-layer-color, ${DesignToken.color.inverseOnSurface}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-icon-color, var(--m3e-icon-button-pressed-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Outline color on pressed. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-outline-color, var(--m3e-icon-button-pressed-outline-color, ${DesignToken.color.outlineVariant}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-state-layer-color, var(--m3e-icon-button-pressed-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-state-layer-opacity, var(--m3e-icon-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-unselected-icon-color, var(--m3e-icon-button-pressed-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-unselected-state-layer-color, var(--m3e-icon-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-selected-icon-color, var(--m3e-icon-button-pressed-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-icon-button-pressed-selected-state-layer-color, var(--m3e-icon-button-pressed-selected-state-layer-color, ${DesignToken.color.inverseOnSurface}))`)
    }
  },
  /** Design tokens that control the `filled` variant. */
  filled: {
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-filled-icon-button-icon-color, var(--m3e-icon-button-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-filled-icon-button-container-color, var(--m3e-icon-button-container-color, ${DesignToken.color.primary}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-unselected-icon-color, var(--m3e-icon-button-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-filled-icon-button-unselected-container-color, var(--m3e-icon-button-unselected-container-color, ${DesignToken.color.surfaceContainer}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-selected-icon-color, var(--m3e-icon-button-selected-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-filled-icon-button-selected-container-color, var(--m3e-icon-button-selected-container-color, ${DesignToken.color.primary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-filled-icon-button-disabled-container-color, var(--m3e-icon-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-filled-icon-button-disabled-container-opacity, var(--m3e-icon-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-filled-icon-button-disabled-icon-color, var(--m3e-icon-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-filled-icon-button-disabled-icon-opacity, var(--m3e-icon-button-disabled-icon-opacity, 38%))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-filled-icon-button-hover-icon-color, var(--m3e-icon-button-hover-icon-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-hover-state-layer-color, var(--m3e-icon-button-hover-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-icon-button-hover-state-layer-opacity, var(--m3e-icon-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-hover-unselected-icon-color, var(--m3e-icon-button-hover-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-hover-unselected-state-layer-color, var(--m3e-icon-button-hover-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-hover-selected-icon-color, var(--m3e-icon-button-hover-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-hover-selected-state-layer-color, var(--m3e-icon-button-hover-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-filled-icon-button-focus-icon-color, var(--m3e-icon-button-focus-icon-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-focus-state-layer-color, var(--m3e-icon-button-focus-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-icon-button-focus-state-layer-opacity, var(--m3e-icon-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-focus-unselected-icon-color, var(--m3e-icon-button-focus-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-focus-unselected-state-layer-color, var(--m3e-icon-button-focus-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-focus-selected-icon-color, var(--m3e-icon-button-focus-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-focus-selected-state-layer-color, var(--m3e-icon-button-focus-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-filled-icon-button-pressed-icon-color, var(--m3e-icon-button-pressed-icon-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-pressed-state-layer-color, var(--m3e-icon-button-pressed-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-icon-button-pressed-state-layer-opacity, var(--m3e-icon-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-pressed-unselected-icon-color, var(--m3e-icon-button-pressed-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-pressed-unselected-state-layer-color, var(--m3e-icon-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-filled-icon-button-pressed-selected-icon-color, var(--m3e-icon-button-pressed-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-filled-icon-button-pressed-selected-state-layer-color, var(--m3e-icon-button-pressed-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    }
  },
  /** Design tokens that control the `tonal` variant. */
  tonal: {
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-tonal-icon-button-icon-color, var(--m3e-icon-button-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-tonal-icon-button-container-color, var(--m3e-icon-button-container-color, ${DesignToken.color.secondaryContainer}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-unselected-icon-color, var(--m3e-icon-button-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-tonal-icon-button-unselected-container-color, var(--m3e-icon-button-unselected-container-color, ${DesignToken.color.secondaryContainer}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-selected-icon-color, var(--m3e-icon-button-selected-icon-color, ${DesignToken.color.onSecondary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-tonal-icon-button-selected-container-color, var(--m3e-icon-button-selected-container-color, ${DesignToken.color.secondary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-tonal-icon-button-disabled-container-color, var(--m3e-icon-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-tonal-icon-button-disabled-container-opacity, var(--m3e-icon-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-tonal-icon-button-disabled-icon-color, var(--m3e-icon-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-tonal-icon-button-disabled-icon-opacity, var(--m3e-icon-button-disabled-icon-opacity, 38%))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-tonal-icon-button-hover-icon-color, var(--m3e-icon-button-hover-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-hover-state-layer-color, var(--m3e-icon-button-hover-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tonal-icon-button-hover-state-layer-opacity, var(--m3e-icon-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-hover-unselected-icon-color, var(--m3e-icon-button-hover-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-hover-unselected-state-layer-color, var(--m3e-icon-button-hover-unselected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-hover-selected-icon-color, var(--m3e-icon-button-hover-selected-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-hover-selected-state-layer-color, var(--m3e-icon-button-hover-selected-state-layer-color, ${DesignToken.color.onSecondary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-tonal-icon-button-focus-icon-color, var(--m3e-icon-button-focus-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-focus-state-layer-color, var(--m3e-icon-button-focus-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tonal-icon-button-focus-state-layer-opacity, var(--m3e-icon-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-focus-unselected-icon-color, var(--m3e-icon-button-focus-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-focus-unselected-state-layer-color, var(--m3e-icon-button-focus-unselected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-focus-selected-icon-color, var(--m3e-icon-button-focus-selected-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-focus-selected-state-layer-color, var(--m3e-icon-button-focus-selected-state-layer-color, ${DesignToken.color.onSecondary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-icon-color, var(--m3e-icon-button-pressed-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-state-layer-color, var(--m3e-icon-button-pressed-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-state-layer-opacity, var(--m3e-icon-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-unselected-icon-color, var(--m3e-icon-button-pressed-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-unselected-state-layer-color, var(--m3e-icon-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-selected-icon-color, var(--m3e-icon-button-pressed-selected-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-icon-button-pressed-selected-state-layer-color, var(--m3e-icon-button-pressed-selected-state-layer-color, ${DesignToken.color.onSecondary}))`)
    }
  },
  /** Design tokens that control the `standard` variant. */
  standard: {
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-standard-icon-button-icon-color, var(--m3e-icon-button-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-standard-icon-button-container-color)`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-unselected-icon-color, var(--m3e-icon-button-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-standard-icon-button-unselected-container-color)`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-standard-icon-button-selected-container-color)`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-selected-icon-color, var(--m3e-icon-button-selected-icon-color, ${DesignToken.color.primary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-standard-icon-button-disabled-container-color, var(--m3e-icon-button-disabled-container-color, transparent))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-standard-icon-button-disabled-container-opacity, var(--m3e-icon-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-standard-icon-button-disabled-icon-color, var(--m3e-icon-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-standard-icon-button-disabled-icon-opacity, var(--m3e-icon-button-disabled-icon-opacity, 38%))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-standard-icon-button-hover-icon-color, var(--m3e-icon-button-hover-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-hover-state-layer-color, var(--m3e-icon-button-hover-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-standard-icon-button-hover-state-layer-opacity, var(--m3e-icon-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-hover-unselected-icon-color, var(--m3e-icon-button-hover-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-hover-unselected-state-layer-color, var(--m3e-icon-button-hover-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-hover-selected-icon-color, var(--m3e-icon-button-hover-selected-icon-color, ${DesignToken.color.primary}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-hover-selected-state-layer-color, var(--m3e-icon-button-hover-selected-state-layer-color, ${DesignToken.color.primary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-standard-icon-button-focus-icon-color, var(--m3e-icon-button-focus-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-focus-state-layer-color, var(--m3e-icon-button-focus-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-standard-icon-button-focus-state-layer-opacity, var(--m3e-icon-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-focus-unselected-icon-color, var(--m3e-icon-button-focus-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-focus-unselected-state-layer-color, var(--m3e-icon-button-focus-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-focus-selected-icon-color, var(--m3e-icon-button-focus-selected-icon-color, ${DesignToken.color.primary}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-focus-selected-state-layer-color, var(--m3e-icon-button-focus-selected-state-layer-color, ${DesignToken.color.primary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-standard-icon-button-pressed-icon-color, var(--m3e-icon-button-pressed-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-pressed-state-layer-color, var(--m3e-icon-button-pressed-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-standard-icon-button-pressed-state-layer-opacity, var(--m3e-icon-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-pressed-unselected-icon-color, var(--m3e-icon-button-pressed-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-pressed-unselected-state-layer-color, var(--m3e-icon-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-standard-icon-button-pressed-selected-icon-color, var(--m3e-icon-button-pressed-selected-icon-color, ${DesignToken.color.primary}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-standard-icon-button-pressed-selected-state-layer-color, var(--m3e-icon-button-pressed-selected-state-layer-color, ${DesignToken.color.primary}))`)
    }
  }
};

/** @private */
function iconButtonVariantStyle(variant) {
  const selector = unsafeCSS(`:is(:state(--${variant}), :--${variant})`);
  return css`:host(${selector}:not(:disabled):not([disabled-interactive])) .base { background-color: ${IconButtonVariantToken[variant].containerColor ?? unsafeCSS("unset")}; --m3e-state-layer-hover-color: ${IconButtonVariantToken[variant].hover.stateLayerColor}; --m3e-state-layer-hover-opacity: ${IconButtonVariantToken[variant].hover.stateLayerOpacity}; --m3e-state-layer-focus-color: ${IconButtonVariantToken[variant].focus.stateLayerColor}; --m3e-state-layer-focus-opacity: ${IconButtonVariantToken[variant].focus.stateLayerOpacity}; --m3e-ripple-color: ${IconButtonVariantToken[variant].pressed.stateLayerColor}; --m3e-ripple-opacity: ${IconButtonVariantToken[variant].pressed.stateLayerOpacity}; --m3e-elevation-level: ${IconButtonVariantToken[variant].containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-hover-level: ${IconButtonVariantToken[variant].hover.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-focus-level: ${IconButtonVariantToken[variant].focus.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-pressed-level: ${IconButtonVariantToken[variant].pressed.containerElevation ?? unsafeCSS("unset")}; } :host(${selector}[toggle]:not([selected]):not(:disabled):not([disabled-interactive])) .base { background-color: ${IconButtonVariantToken[variant].unselectedContainerColor ?? unsafeCSS("unset")}; --m3e-state-layer-hover-color: ${IconButtonVariantToken[variant].hover.unselectedStateLayerColor}; --m3e-state-layer-focus-color: ${IconButtonVariantToken[variant].focus.unselectedStateLayerColor}; --m3e-ripple-color: ${IconButtonVariantToken[variant].pressed.unselectedStateLayerColor}; } :host(${selector}[toggle][selected]:not(:disabled):not([disabled-interactive])) .base { background-color: ${IconButtonVariantToken[variant].selectedContainerColor ?? unsafeCSS("unset")}; --m3e-state-layer-hover-color: ${IconButtonVariantToken[variant].hover.selectedStateLayerColor}; --m3e-state-layer-focus-color: ${IconButtonVariantToken[variant].focus.selectedStateLayerColor}; --m3e-ripple-color: ${IconButtonVariantToken[variant].pressed.selectedStateLayerColor}; } :host(${selector}:not(:disabled):not([disabled-interactive])) .base { outline-color: ${IconButtonVariantToken[variant].outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:focus:not(:disabled):not([disabled-interactive])) .base { outline-color: ${IconButtonVariantToken[variant].focus.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:hover:not(:disabled):not([disabled-interactive])) .base { outline-color: ${IconButtonVariantToken[variant].hover.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .base { outline-color: ${IconButtonVariantToken[variant].pressed.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].iconColor}; } :host(${selector}[toggle]:not([selected]):not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].unselectedIconColor}; } :host(${selector}[toggle][selected]:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].selectedIconColor}; } :host(${selector}:focus:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].focus.iconColor}; } :host(${selector}[toggle]:not([selected]):focus:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].focus.unselectedIconColor}; } :host(${selector}[toggle][selected]:focus:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].focus.selectedIconColor}; } :host(${selector}:hover:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].hover.iconColor}; } :host(${selector}[toggle]:not([selected]):hover:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].hover.unselectedIconColor}; } :host(${selector}[toggle][selected]:hover:not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].hover.selectedIconColor}; } :host(${selector}:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].pressed.iconColor}; } :host( ${selector}[toggle]:not([selected]):is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive]) ) .icon { color: ${IconButtonVariantToken[variant].pressed.unselectedIconColor}; } :host(${selector}[toggle][selected]:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .icon { color: ${IconButtonVariantToken[variant].pressed.selectedIconColor}; } :host(${selector}:disabled) .base, :host(${selector}[disabled-interactive]) .base { outline-color: ${IconButtonVariantToken[variant].disabled.outlineColor ?? unsafeCSS("unset")}; background-color: color-mix( in srgb, ${IconButtonVariantToken[variant].disabled.containerColor} ${IconButtonVariantToken[variant].disabled.containerOpacity}, transparent ); } :host(${selector}:disabled) .icon, :host(${selector}[disabled-interactive]) .icon { color: color-mix( in srgb, ${IconButtonVariantToken[variant].disabled.iconColor} ${IconButtonVariantToken[variant].disabled.iconOpacity}, transparent ); }`;
}
/**
 * Appearance variant styles for `M3eIconButtonElement`.
 * @internal
 */
const IconButtonVariantStyle = [iconButtonVariantStyle("standard"), iconButtonVariantStyle("outlined"), iconButtonVariantStyle("filled"), iconButtonVariantStyle("tonal"), iconButtonVariantStyle("elevated"), css`:host(:is(:state(--outlined), :--outlined):not([toggle][selected]):not(:disabled):not([disabled-interactive])) .base { outline-style: solid; }`];

var _M3eIconButtonElement_instances, _M3eIconButtonElement_clickHandler, _M3eIconButtonElement_applyVariant, _M3eIconButtonElement_applyShape, _M3eIconButtonElement_applySize, _M3eIconButtonElement_applyWidth, _M3eIconButtonElement_updateButtonShape, _M3eIconButtonElement_handlePressedChange, _M3eIconButtonElement_cleanupAdjacentPressed, _M3eIconButtonElement_compressionLimit, _M3eIconButtonElement_handleClick, _M3eIconButtonElement_handleSelectedIconSlotChange;
/**
 * An icon button users interact with to perform a supplementary action.
 *
 * @description
 * The `m3e-icon-button` component is a semantic, expressive UI primitive for triggering actions with a single icon.
 * Designed according to Material Design 3 guidelines, it supports five four variants, specified using the
 * `variant` attribute—`filled`, `tonal`, `outlined`, and `standard`—each with dynamic elevation, shape morphing, and
 * adaptive color theming. The component responds to interaction states (hover, focus, press, disabled) with smooth motion
 * transitions, ensuring emotional clarity and visual hierarchy.
 *
 * The component is accessible by default, with ARIA roles, contrast-safe color tokens, and strong focus indicators.
 * It supports optional icons and states for binary actions.  When using `m3e-icon` for icons, `filled` is automatically
 * set based on the selected state of a toggle button. It can also function as a link or be used to submit form data.
 *
 * Native disabled `<button>` elements cannot receive focus. This can be problematic in some cases because it can prevent you
 * from telling the user why the button is disabled. You can use the `disabled-interactive` attribute to style a `m3e-icon-button`
 * as disabled but allow for it to receive focus. The button will have `aria-disabled="true"` for assistive technology.
 *
 * @example
 * The following example illustrates changing the appearance from `standard` (default) to `filled` using the `variant`
 * attribute, changing the size using the `size` attribute, and enabling toggle behavior using the `toggle` attribute.
 *
 * ```html
 * <m3e-icon-button variant="filled" size="large" toggle selected>
 *  <m3e-icon name="favorite"></m3e-icon>
 * </m3e-icon-button>
 * ```
 *
 * @tag m3e-icon-button
 *
 * @slot - Renders the icon of the button.
 * @slot selected - Renders an icon, when selected.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disabled-interactive - Whether the element is disabled and interactive.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr name - The name of the element, submitted as a pair with the element's `value` as part of form data, when the element is used to submit a form.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr selected - Whether the toggle button is selected.
 * @attr shape - The shape of the button.
 * @attr size - The size of the button.
 * @attr target - The target of the link button.
 * @attr toggle - Whether the button will toggle between selected and unselected states.
 * @attr type - The type of the element.
 * @attr value - The value associated with the element's name when it's submitted with form data.
 * @attr variant - The appearance variant of the button.
 * @attr width - The width of the button.
 *
 * @fires beforeinput - Dispatched before a toggle button's selected state changes.
 * @fires input - Dispatched when a toggle button's selected state changes.
 * @fires change - Dispatched when a toggle button's selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-icon-button-container-height - Height of the container for all size variants.
 * @cssprop --m3e-icon-button-outline-thickness - Outline thickness for all size variants.
 * @cssprop --m3e-icon-button-icon-size - Icon size for all size variants.
 * @cssprop --m3e-icon-button-shape-round - Corner radius for all round size variants.
 * @cssprop --m3e-icon-button-shape-square - Corner radius for all square size variants.
 * @cssprop --m3e-icon-button-selected-shape-round - Corner radius for all selected round size variants.
 * @cssprop --m3e-icon-button-selected-shape-square - Corner radius for all selected square size variants.
 * @cssprop --m3e-icon-button-shape-pressed-morph - Corner radius for all pressed size variants.
 * @cssprop --m3e-icon-button-narrow-leading-space - Leading space for all size variants (narrow).
 * @cssprop --m3e-icon-button-narrow-trailing-space - Trailing space for all size variants (narrow).
 * @cssprop --m3e-icon-button-default-leading-space - Leading space for all size variants (default).
 * @cssprop --m3e-icon-button-default-trailing-space - Trailing space for all size variants (default).
 * @cssprop --m3e-icon-button-wide-leading-space - Leading space for all size variants (wide).
 * @cssprop --m3e-icon-button-wide-trailing-space - Trailing space for all size variants (wide).
 * @cssprop --m3e-icon-button-extra-small-container-height - Height of the extra-small container.
 * @cssprop --m3e-icon-button-extra-small-outline-thickness - Outline thickness for extra-small.
 * @cssprop --m3e-icon-button-extra-small-icon-size - Icon size for extra-small.
 * @cssprop --m3e-icon-button-extra-small-shape-round - Corner radius for round extra-small.
 * @cssprop --m3e-icon-button-extra-small-shape-square - Corner radius for square extra-small.
 * @cssprop --m3e-icon-button-extra-small-selected-shape-round - Corner radius for selected round extra-small.
 * @cssprop --m3e-icon-button-extra-small-selected-shape-square - Corner radius for selected square extra-small.
 * @cssprop --m3e-icon-button-extra-small-shape-pressed-morph - Corner radius for pressed extra-small.
 * @cssprop --m3e-icon-button-extra-small-narrow-leading-space - Leading space for extra-small (narrow).
 * @cssprop --m3e-icon-button-extra-small-narrow-trailing-space - Trailing space for extra-small (narrow).
 * @cssprop --m3e-icon-button-extra-small-default-leading-space - Leading space for extra-small (default).
 * @cssprop --m3e-icon-button-extra-small-default-trailing-space - Trailing space for extra-small (default).
 * @cssprop --m3e-icon-button-extra-small-wide-leading-space - Leading space for extra-small (wide).
 * @cssprop --m3e-icon-button-extra-small-wide-trailing-space - Trailing space for extra-small (wide).
 * @cssprop --m3e-icon-button-small-container-height - Height of the small container.
 * @cssprop --m3e-icon-button-small-outline-thickness - Outline thickness for small.
 * @cssprop --m3e-icon-button-small-icon-size - Icon size for small.
 * @cssprop --m3e-icon-button-small-shape-round - Corner radius for round small.
 * @cssprop --m3e-icon-button-small-shape-square - Corner radius for square small.
 * @cssprop --m3e-icon-button-small-selected-shape-round - Corner radius for selected round small.
 * @cssprop --m3e-icon-button-small-selected-shape-square - Corner radius for selected square small.
 * @cssprop --m3e-icon-button-small-shape-pressed-morph - Corner radius for pressed small.
 * @cssprop --m3e-icon-button-small-narrow-leading-space - Leading space for small (narrow).
 * @cssprop --m3e-icon-button-small-narrow-trailing-space - Trailing space for small (narrow).
 * @cssprop --m3e-icon-button-small-default-leading-space - Leading space for small (default).
 * @cssprop --m3e-icon-button-small-default-trailing-space - Trailing space for small (default).
 * @cssprop --m3e-icon-button-small-wide-leading-space - Leading space for small (wide).
 * @cssprop --m3e-icon-button-small-wide-trailing-space - Trailing space for small (wide).
 * @cssprop --m3e-icon-button-medium-container-height - Height of the medium container.
 * @cssprop --m3e-icon-button-medium-outline-thickness - Outline thickness for medium.
 * @cssprop --m3e-icon-button-medium-icon-size - Icon size for medium.
 * @cssprop --m3e-icon-button-medium-shape-round - Corner radius for round medium.
 * @cssprop --m3e-icon-button-medium-shape-square - Corner radius for square medium.
 * @cssprop --m3e-icon-button-medium-selected-shape-round - Corner radius for selected round medium.
 * @cssprop --m3e-icon-button-medium-selected-shape-square - Corner radius for selected square medium.
 * @cssprop --m3e-icon-button-medium-shape-pressed-morph - Corner radius for pressed medium.
 * @cssprop --m3e-icon-button-medium-narrow-leading-space - Leading space for medium (narrow).
 * @cssprop --m3e-icon-button-medium-narrow-trailing-space - Trailing space for medium (narrow).
 * @cssprop --m3e-icon-button-medium-default-leading-space - Leading space for medium (default).
 * @cssprop --m3e-icon-button-medium-default-trailing-space - Trailing space for medium (default).
 * @cssprop --m3e-icon-button-medium-wide-leading-space - Leading space for medium (wide).
 * @cssprop --m3e-icon-button-medium-wide-trailing-space - Trailing space for medium (wide).
 * @cssprop --m3e-icon-button-large-container-height - Height of the large container.
 * @cssprop --m3e-icon-button-large-outline-thickness - Outline thickness for large.
 * @cssprop --m3e-icon-button-large-icon-size - Icon size for large.
 * @cssprop --m3e-icon-button-large-shape-round - Corner radius for round large.
 * @cssprop --m3e-icon-button-large-shape-square - Corner radius for square large.
 * @cssprop --m3e-icon-button-large-selected-shape-round - Corner radius for selected round large.
 * @cssprop --m3e-icon-button-large-selected-shape-square - Corner radius for selected square large.
 * @cssprop --m3e-icon-button-large-shape-pressed-morph - Corner radius for pressed large.
 * @cssprop --m3e-icon-button-large-narrow-leading-space - Leading space for large (narrow).
 * @cssprop --m3e-icon-button-large-narrow-trailing-space - Trailing space for large (narrow).
 * @cssprop --m3e-icon-button-large-default-leading-space - Leading space for large (default).
 * @cssprop --m3e-icon-button-large-default-trailing-space - Trailing space for large (default).
 * @cssprop --m3e-icon-button-large-wide-leading-space - Leading space for large (wide).
 * @cssprop --m3e-icon-button-large-wide-trailing-space - Trailing space for large (wide).
 * @cssprop --m3e-icon-button-extra-large-container-height - Height of the extra-large container.
 * @cssprop --m3e-icon-button-extra-large-outline-thickness - Outline thickness for extra-large.
 * @cssprop --m3e-icon-button-extra-large-icon-size - Icon size for extra-large.
 * @cssprop --m3e-icon-button-extra-large-shape-round - Corner radius for round extra-large.
 * @cssprop --m3e-icon-button-extra-large-shape-square - Corner radius for square extra-large.
 * @cssprop --m3e-icon-button-extra-large-selected-shape-round - Corner radius for selected round extra-large.
 * @cssprop --m3e-icon-button-extra-large-selected-shape-square - Corner radius for selected square extra-large.
 * @cssprop --m3e-icon-button-extra-large-shape-pressed-morph - Corner radius for pressed extra-large.
 * @cssprop --m3e-icon-button-extra-large-narrow-leading-space - Leading space for extra-large (narrow).
 * @cssprop --m3e-icon-button-extra-large-narrow-trailing-space - Trailing space for extra-large (narrow).
 * @cssprop --m3e-icon-button-extra-large-default-leading-space - Leading space for extra-large (default).
 * @cssprop --m3e-icon-button-extra-large-default-trailing-space - Trailing space for extra-large (default).
 * @cssprop --m3e-icon-button-extra-large-wide-leading-space - Leading space for extra-large (wide).
 * @cssprop --m3e-icon-button-extra-large-wide-trailing-space - Trailing space for extra-large (wide).
 * @cssprop --m3e-icon-button-outline-color - Default outline color for all variants.
 * @cssprop --m3e-icon-button-disabled-outline-color - Outline color when disabled (all variants).
 * @cssprop --m3e-icon-button-hover-outline-color - Outline color on hover (all variants).
 * @cssprop --m3e-icon-button-focus-outline-color - Outline color on focus (all variants).
 * @cssprop --m3e-icon-button-pressed-outline-color - Outline color on pressed (all variants).
 * @cssprop --m3e-icon-button-container-color - Default container background color for all variants.
 * @cssprop --m3e-icon-button-unselected-container-color - Unselected container background color for all variants.
 * @cssprop --m3e-icon-button-selected-container-color - Selected container background color for all variants.
 * @cssprop --m3e-icon-button-icon-color - Default icon color for tonal variant.
 * @cssprop --m3e-icon-button-container-color - Default container background color for tonal variant.
 * @cssprop --m3e-icon-button-unselected-icon-color - Unselected icon color for tonal variant.
 * @cssprop --m3e-icon-button-unselected-container-color - Unselected container background color for tonal variant.
 * @cssprop --m3e-icon-button-selected-icon-color - Selected icon color for tonal variant.
 * @cssprop --m3e-icon-button-selected-container-color - Selected container background color for tonal variant.
 * @cssprop --m3e-icon-button-icon-color - Default icon color for all variants.
 * @cssprop --m3e-icon-button-unselected-icon-color - Unselected icon color for all variants.
 * @cssprop --m3e-icon-button-selected-icon-color - Selected icon color for all variants.
 * @cssprop --m3e-icon-button-disabled-container-color - Container background color when disabled (all variants).
 * @cssprop --m3e-icon-button-disabled-container-opacity - Opacity of container when disabled (all variants).
 * @cssprop --m3e-icon-button-disabled-icon-color - Icon color when disabled (all variants).
 * @cssprop --m3e-icon-button-disabled-icon-opacity - Icon opacity when disabled (all variants).
 * @cssprop --m3e-icon-button-hover-icon-color - Icon color on hover (all variants).
 * @cssprop --m3e-icon-button-hover-state-layer-color - State layer color on hover (all variants).
 * @cssprop --m3e-icon-button-hover-state-layer-opacity - State layer opacity on hover (all variants).
 * @cssprop --m3e-icon-button-hover-unselected-icon-color - Unselected icon color on hover (all variants).
 * @cssprop --m3e-icon-button-hover-unselected-state-layer-color - Unselected state layer color on hover (all variants).
 * @cssprop --m3e-icon-button-hover-selected-icon-color - Selected icon color on hover (all variants).
 * @cssprop --m3e-icon-button-hover-selected-state-layer-color - Selected state layer color on hover (all variants).
 * @cssprop --m3e-icon-button-focus-icon-color - Icon color on focus (all variants).
 * @cssprop --m3e-icon-button-focus-state-layer-color - State layer color on focus (all variants).
 * @cssprop --m3e-icon-button-focus-state-layer-opacity - State layer opacity on focus (all variants).
 * @cssprop --m3e-icon-button-focus-unselected-icon-color - Unselected icon color on focus (all variants).
 * @cssprop --m3e-icon-button-focus-unselected-state-layer-color - Unselected state layer color on focus (all variants).
 * @cssprop --m3e-icon-button-focus-selected-icon-color - Selected icon color on focus (all variants).
 * @cssprop --m3e-icon-button-focus-selected-state-layer-color - Selected state layer color on focus (all variants).
 * @cssprop --m3e-icon-button-pressed-icon-color - Icon color on pressed (all variants).
 * @cssprop --m3e-icon-button-pressed-state-layer-color - State layer color on pressed (all variants).
 * @cssprop --m3e-icon-button-pressed-state-layer-opacity - State layer opacity on pressed (all variants).
 * @cssprop --m3e-icon-button-pressed-unselected-icon-color - Unselected icon color on pressed (all variants).
 * @cssprop --m3e-icon-button-pressed-unselected-state-layer-color - Unselected state layer color on pressed (all variants).
 * @cssprop --m3e-icon-button-pressed-selected-icon-color - Selected icon color on pressed (all variants).
 * @cssprop --m3e-icon-button-pressed-selected-state-layer-color - Selected state layer color on pressed (all variants).
 * @cssprop --m3e-outlined-icon-button-icon-color - Default icon color for outlined variant.
 * @cssprop --m3e-outlined-icon-button-outline-color - Default outline color for outlined variant.
 * @cssprop --m3e-outlined-icon-button-unselected-icon-color - Unselected icon color for outlined variant.
 * @cssprop --m3e-outlined-icon-button-selected-icon-color - Selected icon color for outlined variant.
 * @cssprop --m3e-outlined-icon-button-selected-container-color - Selected container background color for outlined variant.
 * @cssprop --m3e-outlined-icon-button-disabled-container-color - Container background color when disabled (outlined).
 * @cssprop --m3e-outlined-icon-button-disabled-container-opacity - Opacity of container when disabled (outlined).
 * @cssprop --m3e-outlined-icon-button-disabled-icon-color - Icon color when disabled (outlined).
 * @cssprop --m3e-outlined-icon-button-disabled-icon-opacity - Icon opacity when disabled (outlined).
 * @cssprop --m3e-outlined-icon-button-disabled-outline-color - Outline color when disabled (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-icon-color - Icon color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-outline-color - Outline color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-state-layer-color - State layer color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-state-layer-opacity - State layer opacity on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-unselected-icon-color - Unselected icon color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-unselected-state-layer-color - Unselected state layer color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-selected-icon-color - Selected icon color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-hover-selected-state-layer-color - Selected state layer color on hover (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-icon-color - Icon color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-outline-color - Outline color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-state-layer-color - State layer color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-state-layer-opacity - State layer opacity on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-unselected-icon-color - Unselected icon color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-unselected-state-layer-color - Unselected state layer color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-selected-icon-color - Selected icon color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-focus-selected-state-layer-color - Selected state layer color on focus (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-icon-color - Icon color on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-outline-color - Outline color on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-state-layer-color - State layer color on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-state-layer-opacity - State layer opacity on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-unselected-icon-color - Unselected icon color on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-unselected-state-layer-color - Unselected state layer color on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-selected-icon-color - Selected icon color on pressed (outlined).
 * @cssprop --m3e-outlined-icon-button-pressed-selected-state-layer-color - Selected state layer color on pressed (outlined).
 * @cssprop --m3e-filled-icon-button-icon-color - Default icon color for filled variant.
 * @cssprop --m3e-filled-icon-button-container-color - Default container background color for filled variant.
 * @cssprop --m3e-filled-icon-button-unselected-icon-color - Unselected icon color for filled variant.
 * @cssprop --m3e-filled-icon-button-unselected-container-color - Unselected container background color for filled variant.
 * @cssprop --m3e-filled-icon-button-selected-icon-color - Selected icon color for filled variant.
 * @cssprop --m3e-filled-icon-button-selected-container-color - Selected container background color for filled variant.
 * @cssprop --m3e-filled-icon-button-disabled-container-color - Container background color when disabled (filled).
 * @cssprop --m3e-filled-icon-button-disabled-container-opacity - Opacity of container when disabled (filled).
 * @cssprop --m3e-filled-icon-button-disabled-icon-color - Icon color when disabled (filled).
 * @cssprop --m3e-filled-icon-button-disabled-icon-opacity - Icon opacity when disabled (filled).
 * @cssprop --m3e-filled-icon-button-hover-icon-color - Icon color on hover (filled).
 * @cssprop --m3e-filled-icon-button-hover-state-layer-color - State layer color on hover (filled).
 * @cssprop --m3e-filled-icon-button-hover-state-layer-opacity - State layer opacity on hover (filled).
 * @cssprop --m3e-filled-icon-button-hover-unselected-icon-color - Unselected icon color on hover (filled).
 * @cssprop --m3e-filled-icon-button-hover-unselected-state-layer-color - Unselected state layer color on hover (filled).
 * @cssprop --m3e-filled-icon-button-hover-selected-icon-color - Selected icon color on hover (filled).
 * @cssprop --m3e-filled-icon-button-hover-selected-state-layer-color - Selected state layer color on hover (filled).
 * @cssprop --m3e-filled-icon-button-focus-icon-color - Icon color on focus (filled).
 * @cssprop --m3e-filled-icon-button-focus-state-layer-color - State layer color on focus (filled).
 * @cssprop --m3e-filled-icon-button-focus-state-layer-opacity - State layer opacity on focus (filled).
 * @cssprop --m3e-filled-icon-button-focus-unselected-icon-color - Unselected icon color on focus (filled).
 * @cssprop --m3e-filled-icon-button-focus-unselected-state-layer-color - Unselected state layer color on focus (filled).
 * @cssprop --m3e-filled-icon-button-focus-selected-icon-color - Selected icon color on focus (filled).
 * @cssprop --m3e-filled-icon-button-focus-selected-state-layer-color - Selected state layer color on focus (filled).
 * @cssprop --m3e-filled-icon-button-pressed-icon-color - Icon color on pressed (filled).
 * @cssprop --m3e-filled-icon-button-pressed-state-layer-color - State layer color on pressed (filled).
 * @cssprop --m3e-filled-icon-button-pressed-state-layer-opacity - State layer opacity on pressed (filled).
 * @cssprop --m3e-filled-icon-button-pressed-unselected-icon-color - Unselected icon color on pressed (filled).
 * @cssprop --m3e-filled-icon-button-pressed-unselected-state-layer-color - Unselected state layer color on pressed (filled).
 * @cssprop --m3e-filled-icon-button-pressed-selected-icon-color - Selected icon color on pressed (filled).
 * @cssprop --m3e-filled-icon-button-pressed-selected-state-layer-color - Selected state layer color on pressed (filled).
 * @cssprop --m3e-tonal-icon-button-icon-color - Default icon color for tonal variant.
 * @cssprop --m3e-tonal-icon-button-container-color - Default container background color for tonal variant.
 * @cssprop --m3e-tonal-icon-button-unselected-icon-color - Unselected icon color for tonal variant.
 * @cssprop --m3e-tonal-icon-button-unselected-container-color - Unselected container background color for tonal variant.
 * @cssprop --m3e-tonal-icon-button-selected-icon-color - Selected icon color for tonal variant.
 * @cssprop --m3e-tonal-icon-button-selected-container-color - Selected container background color for tonal variant.
 * @cssprop --m3e-tonal-icon-button-disabled-container-color - Container background color when disabled (tonal).
 * @cssprop --m3e-tonal-icon-button-disabled-container-opacity - Opacity of container when disabled (tonal).
 * @cssprop --m3e-tonal-icon-button-disabled-icon-color - Icon color when disabled (tonal).
 * @cssprop --m3e-tonal-icon-button-disabled-icon-opacity - Icon opacity when disabled (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-icon-color - Icon color on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-state-layer-color - State layer color on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-state-layer-opacity - State layer opacity on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-unselected-icon-color - Unselected icon color on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-unselected-state-layer-color - Unselected state layer color on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-selected-icon-color - Selected icon color on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-hover-selected-state-layer-color - Selected state layer color on hover (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-icon-color - Icon color on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-state-layer-color - State layer color on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-state-layer-opacity - State layer opacity on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-unselected-icon-color - Unselected icon color on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-unselected-state-layer-color - Unselected state layer color on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-selected-icon-color - Selected icon color on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-focus-selected-state-layer-color - Selected state layer color on focus (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-icon-color - Icon color on pressed (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-state-layer-color - State layer color on pressed (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-state-layer-opacity - State layer opacity on pressed (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-unselected-icon-color - Unselected icon color on pressed (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-unselected-state-layer-color - Unselected state layer color on pressed (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-selected-icon-color - Selected icon color on pressed (tonal).
 * @cssprop --m3e-tonal-icon-button-pressed-selected-state-layer-color - Selected state layer color on pressed (tonal).
 * @cssprop --m3e-standard-icon-button-icon-color - Default icon color for standard variant.
 * @cssprop --m3e-standard-icon-button-container-color - Default container background color for standard variant.
 * @cssprop --m3e-standard-icon-button-unselected-icon-color - Unselected icon color for standard variant.
 * @cssprop --m3e-standard-icon-button-unselected-container-color - Unselected container background color for standard variant.
 * @cssprop --m3e-standard-icon-button-selected-icon-color - Selected icon color for standard variant.
 * @cssprop --m3e-standard-icon-button-selected-container-color - Selected container background color for standard variant.
 * @cssprop --m3e-standard-icon-button-disabled-container-color - Container background color when disabled (standard).
 * @cssprop --m3e-standard-icon-button-disabled-container-opacity - Opacity of container when disabled (standard).
 * @cssprop --m3e-standard-icon-button-disabled-icon-color - Icon color when disabled (standard).
 * @cssprop --m3e-standard-icon-button-disabled-icon-opacity - Icon opacity when disabled (standard).
 * @cssprop --m3e-standard-icon-button-hover-icon-color - Icon color on hover (standard).
 * @cssprop --m3e-standard-icon-button-hover-state-layer-color - State layer color on hover (standard).
 * @cssprop --m3e-standard-icon-button-hover-state-layer-opacity - State layer opacity on hover (standard).
 * @cssprop --m3e-standard-icon-button-hover-unselected-icon-color - Unselected icon color on hover (standard).
 * @cssprop --m3e-standard-icon-button-hover-unselected-state-layer-color - Unselected state layer color on hover (standard).
 * @cssprop --m3e-standard-icon-button-hover-selected-icon-color - Selected icon color on hover (standard).
 * @cssprop --m3e-standard-icon-button-hover-selected-state-layer-color - Selected state layer color on hover (standard).
 * @cssprop --m3e-standard-icon-button-focus-icon-color - Icon color on focus (standard).
 * @cssprop --m3e-standard-icon-button-focus-state-layer-color - State layer color on focus (standard).
 * @cssprop --m3e-standard-icon-button-focus-state-layer-opacity - State layer opacity on focus (standard).
 * @cssprop --m3e-standard-icon-button-focus-unselected-icon-color - Unselected icon color on focus (standard).
 * @cssprop --m3e-standard-icon-button-focus-unselected-state-layer-color - Unselected state layer color on focus (standard).
 * @cssprop --m3e-standard-icon-button-focus-selected-icon-color - Selected icon color on focus (standard).
 * @cssprop --m3e-standard-icon-button-focus-selected-state-layer-color - Selected state layer color on focus (standard).
 * @cssprop --m3e-standard-icon-button-pressed-icon-color - Icon color on pressed (standard).
 * @cssprop --m3e-standard-icon-button-pressed-state-layer-color - State layer color on pressed (standard).
 * @cssprop --m3e-standard-icon-button-pressed-state-layer-opacity - State layer opacity on pressed (standard).
 * @cssprop --m3e-standard-icon-button-pressed-unselected-icon-color - Unselected icon color on pressed (standard).
 * @cssprop --m3e-standard-icon-button-pressed-unselected-state-layer-color - Unselected state layer color on pressed (standard).
 * @cssprop --m3e-standard-icon-button-pressed-selected-icon-color - Selected icon color on pressed (standard).
 * @cssprop --m3e-standard-icon-button-pressed-selected-state-layer-color - Selected state layer color on pressed (standard).
 */
let M3eIconButtonElement = class M3eIconButtonElement extends KeyboardClick(LinkButton(FormSubmitter(Focusable(DisabledInteractive(Disabled(AttachInternals(Role(LitElement, "button"), true))))))) {
  constructor() {
    super();
    _M3eIconButtonElement_instances.add(this);
    /** @internal */
    this._adjacentPressedTimeout = -1;
    /** @private */
    _M3eIconButtonElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_handleClick).call(this, e));
    /**
     * The appearance variant of the button.
     * @default "standard"
     */
    this.variant = "standard";
    /**
     * The shape of the button.
     * @default "rounded"
     */
    this.shape = "rounded";
    /**
     * The size of the button.
     * @default "small"
     */
    this.size = "small";
    /**
     * The width of the button.
     * @default "default"
     */
    this.width = "default";
    /**
     * Whether the button will toggle between selected and unselected states.
     * @default false
     */
    this.toggle = false;
    /**
     * Whether the toggle button is selected.
     * @default false
     */
    this.selected = false;
    new ResizeController(this, {
      callback: () => this._handleResize()
    });
    new FocusController(this, {
      callback: focused => {
        if (!this.disabledInteractive && !focused && !this.grouped) {
          this._base?.style.removeProperty("--_button-shape");
        }
      }
    });
    new PressedController(this, {
      isPressedKey: key => key === " ",
      minPressedDuration: 225,
      callback: pressed => {
        if (!this.disabled && !this.disabledInteractive) {
          if (pressed) {
            __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_updateButtonShape).call(this);
            __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_handlePressedChange).call(this, true);
          } else {
            __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_handlePressedChange).call(this, false);
          }
        }
      }
    });
  }
  /** Whether the button is contained by a button group. */
  get grouped() {
    return hasCustomState(this, "--grouped");
  }
  /** @inheritdoc */
  render() {
    return html`<div class="layout"><div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-state-layer><m3e-elevation class="elevation" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-elevation><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-ripple><div class="touch" aria-hidden="true"></div>${this[renderPseudoLink]()}<div class="wrapper">${this.toggle ? html`<slot class="icon" name="selected" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_handleSelectedIconSlotChange)}"></slot>` : nothing}<slot class="icon" aria-hidden="true"></slot></div></div></div>`;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applyShape).call(this);
    __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applySize).call(this);
    __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applyWidth).call(this);
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eIconButtonElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    ["--pressed", "--resting", "--grouped", "--connected"].forEach(x => deleteCustomState(this, x));
    this._base?.style.removeProperty("--_button-shape");
    this.style.removeProperty("--_button-width");
    this.style.removeProperty("--_adjacent-shrink");
    this.style.removeProperty("--_pressed-growth");
    deleteCustomState(this, "--adjacent-pressed");
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eIconButtonElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applyVariant).call(this);
    }
    if (_changedProperties.has("shape")) {
      __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applyShape).call(this);
    }
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applySize).call(this);
    }
    if (_changedProperties.has("width")) {
      __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_applyWidth).call(this);
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
      deleteCustomState(this, "--pressed");
      deleteCustomState(this, "--resting");
    }
    if (_changedProperties.has("toggle") || _changedProperties.has("selected")) {
      this.ariaPressed = this.toggle ? `${this.selected}` : null;
      if (this.toggle) {
        for (const icon of this.querySelectorAll("m3e-icon")) {
          icon.toggleAttribute("filled", this.selected);
        }
      }
    }
  }
  /** @private */
  _handleResize() {
    if (this.grouped && !hasCustomState(this, "--no-resize") && this !== document.activeElement) {
      const width = this.getBoundingClientRect().width;
      if (width > 0) {
        this.style.setProperty("--_button-width", `${width}px`);
        __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_updateButtonShape).call(this, true);
      } else {
        // Hidden (display:none): drop the lock so natural size restores on re-show.
        this.style.removeProperty("--_button-width");
      }
    }
  }
};
_M3eIconButtonElement_clickHandler = new WeakMap();
_M3eIconButtonElement_instances = new WeakSet();
_M3eIconButtonElement_applyVariant = function _M3eIconButtonElement_applyVariant() {
  if (!isIconButtonVariant(this.variant)) {
    this.variant = "standard";
  }
  setCustomEnumState(this, this.variant, "elevated", "filled", "outlined", "standard", "tonal");
};
_M3eIconButtonElement_applyShape = function _M3eIconButtonElement_applyShape() {
  if (!isIconButtonShape(this.shape)) {
    this.shape = "rounded";
  }
  setCustomEnumState(this, this.shape, "rounded", "square");
};
_M3eIconButtonElement_applySize = function _M3eIconButtonElement_applySize() {
  if (!isIconButtonSize(this.size)) {
    this.size = "small";
  }
  setCustomEnumState(this, this.size, "extra-large", "extra-small", "large", "medium", "small");
};
_M3eIconButtonElement_applyWidth = function _M3eIconButtonElement_applyWidth() {
  if (!isIconButtonWidth(this.width)) {
    this.width = "default";
  }
  setCustomEnumState(this, this.width, "default", "narrow", "wide");
};
_M3eIconButtonElement_updateButtonShape = function _M3eIconButtonElement_updateButtonShape(force = false) {
  if (!this._base) return;
  const shape = parseFloat(getComputedStyle(this._base).borderRadius);
  if (!isNaN(shape) || force) {
    const adjustedShape = this.clientHeight / 2;
    if (adjustedShape < shape || force) {
      this._base?.style.setProperty("--_button-shape", `${adjustedShape}px`);
    }
  }
};
_M3eIconButtonElement_handlePressedChange = function _M3eIconButtonElement_handlePressedChange(pressed) {
  const clientWidth = this.getBoundingClientRect().width;
  const group = this.closest("m3e-button-group");
  if (group && group.variant === "standard") {
    const buttons = [...group.querySelectorAll("m3e-button,m3e-icon-button")];
    for (const button of buttons) {
      clearTimeout(button._adjacentPressedTimeout);
      button._adjacentPressedTimeout = -1;
    }
    const index = buttons.indexOf(this);
    if (pressed) {
      const multiplier = parseFloat(getComputedStyle(this).getPropertyValue("--m3e-standard-button-group-width-multiplier") || "0.15");
      let adjacentShrink = clientWidth * multiplier;
      if (index > 0 && index < buttons.length - 1) {
        adjacentShrink /= 2;
      }
      // As in Compose, a neighbor shrinks by at most its end padding (its compression limit), and the
      // pressed button grows by what its neighbors give up.
      const adjacent = [buttons[index - 1], buttons[index + 1]].filter(x => x !== undefined);
      adjacentShrink = Math.min(adjacentShrink, ...adjacent.map(x => __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_compressionLimit).call(this, x)));
      this.style.setProperty("--_pressed-growth", `${adjacentShrink * Math.max(1, adjacent.length)}px`);
      for (let i = 0; i < buttons.length; i++) {
        if (i == index - 1 || i == index + 1) {
          addCustomState(buttons[i], "--no-resize");
          buttons[i].style.setProperty("--_adjacent-shrink", `${adjacentShrink}px`);
          addCustomState(buttons[i], "--adjacent-pressed");
        } else if (i == index) {
          addCustomState(buttons[i], "--no-resize");
          buttons[i].style.removeProperty("--_adjacent-shrink");
          deleteCustomState(buttons[i], "--adjacent-pressed");
        } else {
          deleteCustomState(buttons[i], "--no-resize");
          buttons[i].style.removeProperty("--_adjacent-shrink");
          deleteCustomState(buttons[i], "--adjacent-pressed");
        }
      }
    } else {
      for (let i = 0; i < buttons.length; i++) {
        if (i == index - 1 || i == index + 1) {
          buttons[i].style.setProperty("--_adjacent-shrink", "0px");
        }
      }
      if (!prefersReducedMotion()) {
        this.addEventListener("transitionend", e => {
          if (e.propertyName === "width") {
            this._adjacentPressedTimeout = setTimeout(() => {
              // Pressed timeout is tested to ensure this runs only when the button
              // is no longer pressed. This handles changes to pressed state in
              // quick succession.
              if (this._adjacentPressedTimeout > -1) {
                __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_cleanupAdjacentPressed).call(this, buttons);
              }
            }, 600);
          }
        }, {
          once: true
        });
      } else {
        __classPrivateFieldGet(this, _M3eIconButtonElement_instances, "m", _M3eIconButtonElement_cleanupAdjacentPressed).call(this, buttons);
      }
    }
  }
  setCustomState(this, "--pressed", pressed);
  setCustomState(this, "--resting", !pressed);
};
_M3eIconButtonElement_cleanupAdjacentPressed = function _M3eIconButtonElement_cleanupAdjacentPressed(buttons) {
  for (const button of buttons) {
    deleteCustomState(button, "--adjacent-pressed");
    deleteCustomState(button, "--no-resize");
    button.style.removeProperty("--_adjacent-shrink");
    button.style.removeProperty("--_pressed-growth");
  }
};
_M3eIconButtonElement_compressionLimit = function _M3eIconButtonElement_compressionLimit(button) {
  // The end padding at rest: the current padding plus what an ongoing shrink has taken from it.
  const wrapper = button.shadowRoot?.querySelector(".wrapper");
  if (!wrapper) return Infinity;
  const shrink = parseFloat(button.style.getPropertyValue("--_adjacent-shrink")) || 0;
  return parseFloat(getComputedStyle(wrapper).paddingInlineEnd) + shrink / 2;
};
_M3eIconButtonElement_handleClick = function _M3eIconButtonElement_handleClick(e) {
  if (this.disabled || this.disabledInteractive) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  if (this.toggle && !e.defaultPrevented) {
    if (this.dispatchEvent(new Event("beforeinput", {
      bubbles: true,
      cancelable: true
    }))) {
      this.selected = !this.selected;
      this.dispatchEvent(new Event("input", {
        bubbles: true
      }));
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  }
};
_M3eIconButtonElement_handleSelectedIconSlotChange = function _M3eIconButtonElement_handleSelectedIconSlotChange(e) {
  this._base?.classList.toggle("with-selected-icon", hasAssignedNodes(e.target));
};
/** The styles of the element. */
M3eIconButtonElement.styles = [IconButtonSizeStyle, IconButtonVariantStyle, IconButtonStyle];
__decorate([query(".base")], M3eIconButtonElement.prototype, "_base", void 0);
__decorate([query(".elevation")], M3eIconButtonElement.prototype, "_elevation", void 0);
__decorate([query(".focus-ring")], M3eIconButtonElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eIconButtonElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eIconButtonElement.prototype, "_ripple", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eIconButtonElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eIconButtonElement.prototype, "shape", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eIconButtonElement.prototype, "size", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eIconButtonElement.prototype, "width", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eIconButtonElement.prototype, "toggle", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eIconButtonElement.prototype, "selected", void 0);
__decorate([debounce(40)], M3eIconButtonElement.prototype, "_handleResize", null);
M3eIconButtonElement = __decorate([customElement("m3e-icon-button")], M3eIconButtonElement);

export { M3eIconButtonElement, isIconButtonShape, isIconButtonSize, isIconButtonVariant, isIconButtonWidth };
//# sourceMappingURL=IconButtonElement.js.map
