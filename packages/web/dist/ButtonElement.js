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
 * Determines whether a value is a `ButtonShape`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ButtonShape`.
 */
function isButtonShape(value) {
  return value === "rounded" || value === "square";
}

/**
 * Determines whether a value is a `ButtonSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ButtonSize`.
 */
function isButtonSize(value) {
  return value === "extra-small" || value === "small" || value === "medium" || value === "large" || value === "extra-large";
}

/**
 * Determines whether a value is a `ButtonVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ButtonVariant`.
 */
function isButtonVariant(value) {
  return value === "elevated" || value === "filled" || value === "tonal" || value === "outlined";
}

/**
 * Component design tokens that control the `M3eButtonElement` for all size variants.
 * @internal
 */
const ButtonSizeToken = {
  "extra-small": {
    containerHeight: unsafeCSS(`calc(var(--m3e-button-extra-small-container-height, var(--m3e-button-container-height, 32px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-button-extra-small-outline-thickness, var(--m3e-button-outline-thickness, 1px))"),
    labelTextFontSize: unsafeCSS(`var(--m3e-button-extra-small-label-text-font-size, var(--m3e-button-label-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-button-extra-small-label-text-font-weight, var(--m3e-button-label-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-button-extra-small-label-text-line-height, var(--m3e-button-label-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-button-extra-small-label-text-tracking, var(--m3e-button-label-text-tracking, ${DesignToken.typescale.standard.label.large.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-button-extra-small-icon-size, var(--m3e-button-icon-size, 20px))"),
    shapeRound: unsafeCSS(`var(--m3e-button-extra-small-shape-round, var(--m3e-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-button-extra-small-shape-square, var(--m3e-button-shape-square, ${DesignToken.shape.corner.medium}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-button-extra-small-selected-shape-round, var(--m3e-button-selected-shape-round, ${DesignToken.shape.corner.medium}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-button-extra-small-selected-shape-square, var(--m3e-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-button-extra-small-shape-pressed-morph, var(--m3e-button-shape-pressed-morph, ${DesignToken.shape.corner.small}))`),
    leadingSpace: unsafeCSS(`var(--m3e-button-extra-small-leading-space, var(--m3e-button-leading-space, ${DesignToken.measurement.space150}))`),
    trailingSpace: unsafeCSS(`var(--m3e-button-extra-small-trailing-space, var(--m3e-button-trailing-space, ${DesignToken.measurement.space150}))`),
    iconLabelSpace: unsafeCSS(`var(--m3e-button-extra-small-icon-label-space, var(--m3e-button-icon-label-space, ${DesignToken.measurement.space100}))`)
  },
  small: {
    containerHeight: unsafeCSS(`calc(var(--m3e-button-small-container-height, var(--m3e-button-container-height, 40px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-button-small-outline-thickness, var(--m3e-button-outline-thickness, 1px))"),
    labelTextFontSize: unsafeCSS(`var(--m3e-button-small-label-text-font-size, var(--m3e-button-label-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-button-small-label-text-font-weight, var(--m3e-button-label-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-button-small-label-text-line-height, var(--m3e-button-label-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-button-small-label-text-tracking, var(--m3e-button-label-text-tracking, ${DesignToken.typescale.standard.label.large.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-button-small-icon-size, var(--m3e-button-icon-size, 20px))"),
    shapeRound: unsafeCSS(`var(--m3e-button-small-shape-round, var(--m3e-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-button-small-shape-square, var(--m3e-button-shape-square, ${DesignToken.shape.corner.medium}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-button-small-selected-shape-round, var(--m3e-button-selected-shape-round, ${DesignToken.shape.corner.medium}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-button-small-selected-shape-square, var(--m3e-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-button-small-shape-pressed-morph, var(--m3e-button-shape-pressed-morph, ${DesignToken.shape.corner.small}))`),
    leadingSpace: unsafeCSS(`var(--m3e-button-small-leading-space, var(--m3e-button-leading-space, ${DesignToken.measurement.space250}))`),
    trailingSpace: unsafeCSS(`var(--m3e-button-small-trailing-space, var(--m3e-button-trailing-space, ${DesignToken.measurement.space250}))`),
    iconLabelSpace: unsafeCSS(`var(--m3e-button-small-icon-label-space, var(--m3e-button-icon-label-space, ${DesignToken.measurement.space100}))`)
  },
  medium: {
    containerHeight: unsafeCSS(`calc(var(--m3e-button-medium-container-height, var(--m3e-button-container-height, 56px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-button-medium-outline-thickness, var(--m3e-button-outline-thickness, 1px))"),
    labelTextFontSize: unsafeCSS(`var(--m3e-button-medium-label-text-font-size, var(--m3e-button-label-text-font-size, ${DesignToken.typescale.standard.body.large.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-button-medium-label-text-font-weight, var(--m3e-button-label-text-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-button-medium-label-text-line-height, var(--m3e-button-label-text-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-button-medium-label-text-tracking, var(--m3e-button-label-text-tracking, ${DesignToken.typescale.standard.body.large.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-button-medium-icon-size, var(--m3e-button-icon-size, 24px))"),
    shapeRound: unsafeCSS(`var(--m3e-button-medium-shape-round, var(--m3e-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-button-medium-shape-square, var(--m3e-button-shape-square, ${DesignToken.shape.corner.large}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-button-medium-selected-shape-round, var(--m3e-button-selected-shape-round, ${DesignToken.shape.corner.large}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-button-medium-selected-shape-square, var(--m3e-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-button-medium-shape-pressed-morph, var(--m3e-button-shape-pressed-morph, ${DesignToken.shape.corner.medium}))`),
    leadingSpace: unsafeCSS(`var(--m3e-button-medium-leading-space, var(--m3e-button-leading-space, ${DesignToken.measurement.space300}))`),
    trailingSpace: unsafeCSS(`var(--m3e-button-medium-trailing-space, var(--m3e-button-trailing-space, ${DesignToken.measurement.space300}))`),
    iconLabelSpace: unsafeCSS(`var(--m3e-button-medium-icon-label-space, var(--m3e-button-icon-label-space, ${DesignToken.measurement.space100}))`)
  },
  large: {
    containerHeight: unsafeCSS(`calc(var(--m3e-button-large-container-height, var(--m3e-button-container-height, 96px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-button-large-outline-thickness, var(--m3e-button-outline-thickness, 2px))"),
    labelTextFontSize: unsafeCSS(`var(--m3e-button-large-label-text-font-size, var(--m3e-button-label-text-font-size, ${DesignToken.typescale.standard.headline.small.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-button-large-label-text-font-weight, var(--m3e-button-label-text-font-weight, ${DesignToken.typescale.standard.headline.small.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-button-large-label-text-line-height, var(--m3e-button-label-text-line-height, ${DesignToken.typescale.standard.headline.small.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-button-large-label-text-tracking, var(--m3e-button-label-text-tracking, ${DesignToken.typescale.standard.headline.small.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-button-large-icon-size, var(--m3e-button-icon-size, 32px))"),
    shapeRound: unsafeCSS(`var(--m3e-button-large-shape-round, var(--m3e-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-button-large-shape-square, var(--m3e-button-shape-square, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-button-large-selected-shape-round, var(--m3e-button-selected-shape-round, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-button-large-selected-shape-square, var(--m3e-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-button-large-shape-pressed-morph, var(--m3e-button-shape-pressed-morph, ${DesignToken.shape.corner.large}))`),
    leadingSpace: unsafeCSS(`var(--m3e-button-large-leading-space, var(--m3e-button-leading-space, ${DesignToken.measurement.space600}))`),
    trailingSpace: unsafeCSS(`var(--m3e-button-large-trailing-space, var(--m3e-button-trailing-space, ${DesignToken.measurement.space600}))`),
    iconLabelSpace: unsafeCSS(`var(--m3e-button-large-icon-label-space, var(--m3e-button-icon-label-space, ${DesignToken.measurement.space150}))`)
  },
  "extra-large": {
    containerHeight: unsafeCSS(`calc(var(--m3e-button-extra-large-container-height, var(--m3e-button-container-height, 136px)) + ${DesignToken.density.calc(-3)})`),
    outlineThickness: unsafeCSS("var(--m3e-button-extra-large-outline-thickness, var(--m3e-button-outline-thickness, 3px))"),
    labelTextFontSize: unsafeCSS(`var(--m3e-button-extra-large-label-text-font-size, var(--m3e-button-label-text-font-size, ${DesignToken.typescale.standard.headline.large.fontSize}))`),
    labelTextFontWeight: unsafeCSS(`var(--m3e-button-extra-large-label-text-font-weight, var(--m3e-button-label-text-font-weight, ${DesignToken.typescale.standard.headline.large.fontWeight}))`),
    labelTextLineHeight: unsafeCSS(`var(--m3e-button-extra-large-label-text-line-height, var(--m3e-button-label-text-line-height, ${DesignToken.typescale.standard.headline.large.lineHeight}))`),
    labelTextTracking: unsafeCSS(`var(--m3e-button-extra-large-label-text-tracking, var(--m3e-button-label-text-tracking, ${DesignToken.typescale.standard.headline.large.tracking}))`),
    iconSize: unsafeCSS("var(--m3e-button-extra-large-icon-size, var(--m3e-button-icon-size, 40px))"),
    shapeRound: unsafeCSS(`var(--m3e-button-extra-large-shape-round, var(--m3e-button-shape-round, ${DesignToken.shape.corner.full}))`),
    shapeSquare: unsafeCSS(`var(--m3e-button-extra-large-shape-square, var(--m3e-button-shape-square, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeRound: unsafeCSS(`var(--m3e-button-extra-large-selected-shape-round, var(--m3e-button-selected-shape-round, ${DesignToken.shape.corner.extraLarge}))`),
    selectedShapeSquare: unsafeCSS(`var(--m3e-button-extra-large-selected-shape-square, var(--m3e-button-selected-shape-square, ${DesignToken.shape.corner.full}))`),
    shapePressedMorph: unsafeCSS(`var(--m3e-button-extra-large-shape-pressed-morph, var(--m3e-button-shape-pressed-morph, ${DesignToken.shape.corner.large}))`),
    leadingSpace: unsafeCSS(`var(--m3e-button-extra-large-leading-space, var(--m3e-button-leading-space, ${DesignToken.measurement.space800}))`),
    trailingSpace: unsafeCSS(`var(--m3e-button-extra-large-trailing-space, var(--m3e-button-trailing-space, ${DesignToken.measurement.space800}))`),
    iconLabelSpace: unsafeCSS(`var(--m3e-button-extra-large-icon-label-space, var(--m3e-button-icon-label-space, ${DesignToken.measurement.space200}))`)
  }
};

/** @private */
function buttonStyle(size) {
  const selector = unsafeCSS(`:is(:state(--${size}), :--${size})`);
  return css`:host(${selector}) .base { height: ${ButtonSizeToken[size].containerHeight}; } :host(${selector}) .wrapper { padding-inline-start: calc(${ButtonSizeToken[size].leadingSpace} - calc(var(--_adjacent-shrink, 0px) / 2)); padding-inline-end: calc(${ButtonSizeToken[size].trailingSpace} - calc(var(--_adjacent-shrink, 0px) / 2)); column-gap: ${ButtonSizeToken[size].iconLabelSpace}; } :host(${selector}) .label { font-size: ${ButtonSizeToken[size].labelTextFontSize}; font-weight: ${ButtonSizeToken[size].labelTextFontWeight}; line-height: ${ButtonSizeToken[size].labelTextLineHeight}; letter-spacing: ${ButtonSizeToken[size].labelTextTracking}; } :host(${selector}) .icon { font-size: ${ButtonSizeToken[size].iconSize}; --m3e-icon-size: ${ButtonSizeToken[size].iconSize}; } :host(${selector}) .base { outline-offset: calc(0px - ${ButtonSizeToken[size].outlineThickness}); outline-width: ${ButtonSizeToken[size].outlineThickness}; } :host(:not(:is(:state(--connected), :--connected))${selector}:is(:state(--rounded), :--rounded)) .base { border-radius: var(--_button-shape, ${ButtonSizeToken[size].shapeRound}); } :host( :is(:state(--connected), :--connected)${selector}:is(:state(--rounded), :--rounded)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${ButtonSizeToken[size].shapeRound}); } :host( :not(:is(:state(--connected), :--connected))${selector}:is(:state(--rounded), :--rounded)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: ${ButtonSizeToken[size].selectedShapeRound}; } :host(:not(:is(:state(--connected), :--connected))${selector}:is(:state(--square), :--square)) .base { border-radius: ${ButtonSizeToken[size].shapeSquare}; } :host( :not(:is(:state(--connected), :--connected))${selector}:is(:state(--square), :--square)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${ButtonSizeToken[size].selectedShapeSquare}); } :host(:not(:is(:state(--connected), :--connected))${selector}:is(:state(--pressed), :--pressed)) .base { border-radius: ${ButtonSizeToken[size].shapePressedMorph}; } :host(:is(:state(--connected), :--connected)${selector}:is(:state(--rounded), :--rounded):not([toggle][selected])) .base { border-start-start-radius: var( --_button-rounded-start-shape, var(--_button-shape, ${ButtonSizeToken[size].shapeRound}) ); border-end-start-radius: var( --_button-rounded-start-shape, var(--_button-shape, ${ButtonSizeToken[size].shapeRound}) ); border-start-end-radius: var( --_button-rounded-end-shape, var(--_button-shape, ${ButtonSizeToken[size].shapeRound}) ); border-end-end-radius: var( --_button-rounded-end-shape, var(--_button-shape, ${ButtonSizeToken[size].shapeRound}) ); } :host(:is(:state(--connected), :--connected)${selector}:is(:state(--square), :--square)) .base { border-start-start-radius: var(--_button-square-start-shape, ${ButtonSizeToken[size].shapeSquare}); border-end-start-radius: var(--_button-square-start-shape, ${ButtonSizeToken[size].shapeSquare}); border-start-end-radius: var(--_button-square-end-shape, ${ButtonSizeToken[size].shapeSquare}); border-end-end-radius: var(--_button-square-end-shape, ${ButtonSizeToken[size].shapeSquare}); } :host( :is(:state(--connected), :--connected)${selector}:is(:state(--square), :--square)[toggle][selected]:not( :is(:state(--pressed), :--pressed) ) ) .base { border-radius: var(--_button-shape, ${ButtonSizeToken[size].selectedShapeSquare}); } :host(:is(:state(--connected), :--connected)${selector}:is(:state(--pressed), :--pressed)) .base { border-start-start-radius: var(--_button-start-shape-pressed-morph, ${ButtonSizeToken[size].shapePressedMorph}); border-end-start-radius: var(--_button-start-shape-pressed-morph, ${ButtonSizeToken[size].shapePressedMorph}); border-start-end-radius: var(--_button-end-shape-pressed-morph, ${ButtonSizeToken[size].shapePressedMorph}); border-end-end-radius: var(--_button-end-shape-pressed-morph, ${ButtonSizeToken[size].shapePressedMorph}); }`;
}
/**
 * Size variant styles for `M3eButtonElement`.
 * @internal
 */
const ButtonSizeStyle = [buttonStyle("extra-small"), buttonStyle("small"), buttonStyle("medium"), buttonStyle("large"), buttonStyle("extra-large")];

/**
 * Baseline styles for `M3eButtonElement`.
 * @internal
 */
const ButtonStyle = css`:host { display: inline-block; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .touch { position: absolute; height: 48px; left: 0; right: 0; } :host(:is(:state(--pressed), :--pressed)) .base, :host(:is(:state(--resting), :--resting)) .base { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
          border-radius ${DesignToken.motion.spring.fastEffects}`)}; } .wrapper { box-sizing: border-box; width: 100%; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; } .label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .icon { transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host(:not(:disabled):not([disabled-interactive])) { cursor: pointer; } :host([disabled-interactive]) { cursor: not-allowed; } ::slotted([slot="icon"]), ::slotted([slot="selected-icon"]), ::slotted([slot="trailing-icon"]) { font-size: inherit !important; flex: none; } ::slotted(svg[slot="icon"]), ::slotted(svg[slot="selected-icon"]), ::slotted(svg[slot="trailing-icon"]) { width: 1em; height: 1em; } :host([toggle]:not([selected])) .base.with-selected-icon slot[name="selected-icon"], :host([toggle][selected]) .base.with-selected-icon slot[name="icon"] { display: none; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } :host(:is(:state(--grouped), :--grouped):is(:state(--connected), :--connected)) { flex: 1 1 auto; } :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) { transition: ${unsafeCSS(`width ${DesignToken.motion.spring.fastSpatial}`)}; } :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) .wrapper { transition: ${unsafeCSS(`padding-inline ${DesignToken.motion.spring.fastSpatial}`)}; } :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) { flex-shrink: 0; flex-grow: 0; } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):not( :is(:state(--pressed), :--pressed, :state(--adjacent-pressed), :--adjacent-pressed) ) ) { width: var(--_button-width); } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):not( :is(:state(--pressed), :--pressed) ):is(:state(--adjacent-pressed), :--adjacent-pressed) ) { width: calc(var(--_button-width) - var(--_adjacent-shrink, 0px)); } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):is( :state(--pressed), :--pressed ):not([disabled-interactive]):not(:disabled) ) { width: calc(var(--_button-width) + var(--_pressed-growth, 0px)); /* Padding grows with the width, so the label keeps its box while the spring overshoots on release. */ --_adjacent-shrink: calc(var(--_pressed-growth, 0px) * -1); } :host( :is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected)):is( :state(--adjacent-pressed), :--adjacent-pressed ):not(:is(:state(--pressed), :--pressed)) ) .label { text-overflow: clip; } @media (forced-colors: active) { .base, .label, .icon { transition: none; } :host(:is(:state(--pressed), :--pressed)) .base, :host(:is(:state(--resting), :--resting)) .base { transition: ${unsafeCSS(`border-radius ${DesignToken.motion.spring.fastEffects}`)}; } :host(:not(:disabled):not([disabled-interactive]):not([toggle])) .base { background-color: ButtonFace !important; outline-color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive]):not([toggle])) .label, :host(:not(:disabled):not([disabled-interactive]):not([toggle])) .icon { color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .base { background-color: ButtonFace !important; outline-color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .label, :host(:hover:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .label, :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected]):focus) .label, :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .icon, :host(:hover:not(:disabled):not([disabled-interactive])[toggle]:not([selected])) .icon, :host(:not(:disabled):not([disabled-interactive])[toggle]:not([selected]):focus) .icon { color: ButtonText !important; } :host(:not(:disabled):not([disabled-interactive])[toggle][selected]) .base { background-color: ButtonText !important; outline: none !important; } :host(:not(:disabled):not([disabled-interactive])[toggle][selected]) .label, :host(:hover:not(:disabled):not([disabled-interactive])[toggle][selected]) .label, :host(:not(:disabled):not([disabled-interactive])[toggle][selected]:focus) .label, :host(:not(:disabled):not([disabled-interactive])[toggle][selected]) .icon, :host(:hover:not(:disabled):not([disabled-interactive])[toggle][selected]) .icon, :host(:not(:disabled):not([disabled-interactive])[toggle][selected]:focus) .icon { forced-color-adjust: none; color: ButtonFace !important; background-color: ButtonText !important; } :host(:disabled) .base, :host([disabled-interactive]) .base { outline-color: GrayText !important; background-color: unset !important; } :host(:disabled) .label, :host([disabled-interactive]) .label, :host(:disabled) .icon, :host([disabled-interactive]) .icon { color: GrayText !important; } .base { outline-style: solid; } :host(:is(:state(--extra-small), :--extra-small)) .base { outline-offset: calc(0px - var(--m3e-button-extra-small-outline-thickness, 1px)); outline-width: var(--m3e-button-extra-small-outline-thickness, 1px); } :host(:is(:state(--small), :--small)) .base { outline-offset: calc(0px - var(--m3e-button-small-outline-thickness, 1px)); outline-width: var(--m3e-button-small-outline-thickness, 1px); } :host(:is(:state(--medium), :--medium)) .base { outline-offset: calc(0px - var(--m3e-button-medium-outline-thickness, 1px)); outline-width: var(--m3e-button-medium-outline-thickness, 1px); } :host(:is(:state(--large), :--large)) .base { outline-offset: calc(0px - var(--m3e-button-large-outline-thickness, 2px)); outline-width: var(--m3e-button-large-outline-thickness, 2px); } :host(:is(:state(--extra-large), :--extra-large)) .base { outline-offset: calc(0px - var(--m3e-button-extra-large-outline-thickness, 3px)); outline-width: var(--m3e-button-extra-large-outline-thickness, 3px); } } @media (prefers-reduced-motion) { :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))), :host(:is(:state(--grouped), :--grouped):not(:is(:state(--connected), :--connected))) .wrapper, :host(:is(:state(--pressed), :--pressed)) .base, :host(:is(:state(--resting), :--resting)) .base, .base, .label, .icon { transition: none; } }`;

/**
 * Component design tokens that control the appearance variants of `M3eButtonElement`.
 * @internal
 */
const ButtonVariantToken = {
  /** Design tokens that control the `elevated` variant. */
  elevated: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-elevated-button-label-text-color, var(--m3e-button-label-text-color, ${DesignToken.color.primary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-elevated-button-icon-color, var(--m3e-button-icon-color, ${DesignToken.color.primary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-elevated-button-container-color, var(--m3e-button-container-color, ${DesignToken.color.surfaceContainerLow}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-elevated-button-container-elevation, var(--m3e-button-container-elevation, ${DesignToken.elevation.level1}))`),
    /** Unselected label color. */
    unselectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-unselected-label-text-color, var(--m3e-button-unselected-label-text-color, ${DesignToken.color.primary}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-elevated-button-unselected-icon-color, var(--m3e-button-unselected-icon-color, ${DesignToken.color.primary}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-elevated-button-unselected-container-color, var(--m3e-button-unselected-container-color, ${DesignToken.color.surfaceContainerLow}))`),
    /** Selected label color. */
    selectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-selected-label-text-color, var(--m3e-button-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-elevated-button-selected-icon-color, var(--m3e-button-selected-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-elevated-button-selected-container-color, var(--m3e-button-selected-container-color, ${DesignToken.color.primary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-elevated-button-disabled-container-color, var(--m3e-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-elevated-button-disabled-container-opacity, var(--m3e-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-elevated-button-disabled-icon-color, var(--m3e-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-elevated-button-disabled-icon-opacity, var(--m3e-button-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-elevated-button-disabled-label-text-color, var(--m3e-button-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-elevated-button-disabled-label-text-opacity, var(--m3e-button-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-button-disabled-container-elevation, var(--m3e-button-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-elevated-button-hover-icon-color, var(--m3e-button-hover-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-elevated-button-hover-label-text-color, var(--m3e-button-hover-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-button-hover-state-layer-color, var(--m3e-button-hover-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-button-hover-state-layer-opacity, var(--m3e-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-button-hover-container-elevation, var(--m3e-button-hover-container-elevation, ${DesignToken.elevation.level2}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-elevated-button-hover-unselected-icon-color, var(--m3e-button-hover-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected label color on hover. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-hover-unselected-label-text-color, var(--m3e-button-hover-unselected-label-text-color, ${DesignToken.color.primary}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-button-hover-unselected-state-layer-color, var(--m3e-button-hover-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-elevated-button-hover-selected-icon-color, var(--m3e-button-hover-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected label color on hover. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-hover-selected-label-text-color, var(--m3e-button-hover-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** Selected ripple color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-button-hover-selected-state-layer-color, var(--m3e-button-hover-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-elevated-button-focus-icon-color, var(--m3e-button-focus-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-elevated-button-focus-label-text-color, var(--m3e-button-focus-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-button-focus-state-layer-color, var(--m3e-button-focus-state-layer-color, ${DesignToken.color.primary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-button-focus-state-layer-opacity, var(--m3e-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-button-focus-container-elevation, var(--m3e-button-focus-container-elevation, ${DesignToken.elevation.level1}))`),
      /** Unselected label color on focus. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-focus-unselected-label-text-color, var(--m3e-button-focus-unselected-label-text-color, ${DesignToken.color.primary}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-elevated-button-focus-unselected-icon-color, var(--m3e-button-focus-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected ripple color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-button-focus-unselected-state-layer-color, var(--m3e-button-focus-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-elevated-button-focus-selected-icon-color, var(--m3e-button-focus-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected label color on focus. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-focus-selected-label-text-color, var(--m3e-button-focus-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** Selected ripple color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-button-focus-selected-state-layer-color, var(--m3e-button-focus-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-elevated-button-pressed-icon-color, var(--m3e-button-pressed-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-elevated-button-pressed-label-text-color, var(--m3e-button-pressed-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-button-pressed-state-layer-color, var(--m3e-button-pressed-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-button-pressed-state-layer-opacity, var(--m3e-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-elevated-button-pressed-container-elevation, var(--m3e-button-pressed-container-elevation, ${DesignToken.elevation.level1}))`),
      /** Unselected label color on pressed. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-pressed-unselected-label-text-color, var(--m3e-button-pressed-unselected-label-text-color, ${DesignToken.color.primary}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-elevated-button-pressed-unselected-icon-color, var(--m3e-button-pressed-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected ripple color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-button-pressed-unselected-state-layer-color, var(--m3e-button-pressed-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-elevated-button-pressed-selected-icon-color, var(--m3e-button-pressed-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected label color on pressed. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-elevated-button-pressed-selected-label-text-color, var(--m3e-button-pressed-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** Selected ripple color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-elevated-button-pressed-selected-state-layer-color, var(--m3e-button-pressed-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    }
  },
  /** Design tokens that control the `outlined` variant. */
  outlined: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-outlined-button-label-text-color, var(--m3e-button-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-outlined-button-icon-color, var(--m3e-button-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Default outline color. */
    outlineColor: unsafeCSS(`var(--m3e-outlined-button-outline-color, var(--m3e-button-outline-color, ${DesignToken.color.outlineVariant}))`),
    /** Unselected label color. */
    unselectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-unselected-label-text-color, var(--m3e-button-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-outlined-button-unselected-icon-color, var(--m3e-button-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Selected label color. */
    selectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-selected-label-text-color, var(--m3e-button-selected-label-text-color, ${DesignToken.color.inverseOnSurface}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-outlined-button-selected-icon-color, var(--m3e-button-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-outlined-button-selected-container-color, var(--m3e-button-selected-container-color, ${DesignToken.color.inverseSurface}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-outlined-button-disabled-container-color, var(--m3e-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-outlined-button-disabled-container-opacity, var(--m3e-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-outlined-button-disabled-icon-color, var(--m3e-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-outlined-button-disabled-icon-opacity, var(--m3e-button-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-outlined-button-disabled-label-text-color, var(--m3e-button-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-outlined-button-disabled-label-text-opacity, var(--m3e-button-disabled-label-text-opacity, 38%))`),
      /** Outline color when disabled. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-button-disabled-outline-color, var(--m3e-button-disabled-outline-color, ${DesignToken.color.outlineVariant}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-outlined-button-hover-icon-color, var(--m3e-button-hover-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-outlined-button-hover-label-text-color, var(--m3e-button-hover-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Outline color on hover. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-button-hover-outline-color, var(--m3e-button-hover-outline-color, ${DesignToken.color.outlineVariant}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-button-hover-state-layer-color, var(--m3e-button-hover-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-button-hover-state-layer-opacity, var(--m3e-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-outlined-button-hover-unselected-icon-color, var(--m3e-button-hover-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected label color on hover. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-hover-unselected-label-text-color, var(--m3e-button-hover-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-button-hover-unselected-state-layer-color, var(--m3e-button-hover-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-outlined-button-hover-selected-icon-color, var(--m3e-button-hover-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected label color on hover. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-hover-selected-label-text-color, var(--m3e-button-hover-selected-label-text-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-button-hover-selected-state-layer-color, var(--m3e-button-hover-selected-state-layer-color, ${DesignToken.color.inverseOnSurface}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-outlined-button-focus-icon-color, var(--m3e-button-focus-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-outlined-button-focus-label-text-color, var(--m3e-button-focus-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Outline color on focus. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-button-focus-outline-color, var(--m3e-button-focus-outline-color, ${DesignToken.color.outlineVariant}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-button-focus-state-layer-color, var(--m3e-button-focus-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-button-focus-state-layer-opacity, var(--m3e-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-outlined-button-focus-unselected-icon-color, var(--m3e-button-focus-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected label color on focus. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-focus-unselected-label-text-color, var(--m3e-button-focus-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-button-focus-unselected-state-layer-color, var(--m3e-button-focus-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-outlined-button-focus-selected-icon-color, var(--m3e-button-focus-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected label color on focus. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-focus-selected-label-text-color, var(--m3e-button-focus-selected-label-text-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-button-focus-selected-state-layer-color, var(--m3e-button-focus-selected-state-layer-color, ${DesignToken.color.inverseOnSurface}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-outlined-button-pressed-icon-color, var(--m3e-button-pressed-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-outlined-button-pressed-label-text-color, var(--m3e-button-pressed-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Outline color on pressed. */
      outlineColor: unsafeCSS(`var(--m3e-outlined-button-pressed-outline-color, var(--m3e-button-pressed-outline-color, ${DesignToken.color.outlineVariant}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-button-pressed-state-layer-color, var(--m3e-button-pressed-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-button-pressed-state-layer-opacity, var(--m3e-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-outlined-button-pressed-unselected-icon-color, var(--m3e-button-pressed-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected label color on pressed. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-pressed-unselected-label-text-color, var(--m3e-button-pressed-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-button-pressed-unselected-state-layer-color, var(--m3e-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-outlined-button-pressed-selected-icon-color, var(--m3e-button-pressed-selected-icon-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected label color on pressed. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-outlined-button-pressed-selected-label-text-color, var(--m3e-button-pressed-selected-label-text-color, ${DesignToken.color.inverseOnSurface}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-outlined-button-pressed-selected-state-layer-color, var(--m3e-button-pressed-selected-state-layer-color, ${DesignToken.color.inverseOnSurface}))`)
    }
  },
  /** Design tokens that control the `filled` variant. */
  filled: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-filled-button-label-text-color, var(--m3e-button-label-text-color, ${DesignToken.color.onPrimary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-filled-button-icon-color, var(--m3e-button-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-filled-button-container-color, var(--m3e-button-container-color, ${DesignToken.color.primary}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-filled-button-container-elevation, var(--m3e-button-container-elevation, ${DesignToken.elevation.level0}))`),
    /** Unselected label color. */
    unselectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-unselected-label-text-color, var(--m3e-button-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-filled-button-unselected-icon-color, var(--m3e-button-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-filled-button-unselected-container-color, var(--m3e-button-unselected-container-color, ${DesignToken.color.surfaceContainer}))`),
    /** Selected label color. */
    selectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-selected-label-text-color, var(--m3e-button-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-filled-button-selected-icon-color, var(--m3e-button-selected-icon-color, ${DesignToken.color.onPrimary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-filled-button-selected-container-color, var(--m3e-button-selected-container-color, ${DesignToken.color.primary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-filled-button-disabled-container-color, var(--m3e-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-filled-button-disabled-container-opacity, var(--m3e-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-filled-button-disabled-icon-color, var(--m3e-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-filled-button-disabled-icon-opacity, var(--m3e-button-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-filled-button-disabled-label-text-color, var(--m3e-button-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-filled-button-disabled-label-text-opacity, var(--m3e-button-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-filled-button-disabled-container-elevation, var(--m3e-button-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-filled-button-hover-icon-color, var(--m3e-button-hover-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-filled-button-hover-label-text-color, var(--m3e-button-hover-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-filled-button-hover-state-layer-color, var(--m3e-button-hover-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-button-hover-state-layer-opacity, var(--m3e-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-filled-button-hover-container-elevation, var(--m3e-button-hover-container-elevation, ${DesignToken.elevation.level1}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-filled-button-hover-unselected-icon-color, var(--m3e-button-hover-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected label color on hover. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-hover-unselected-label-text-color, var(--m3e-button-hover-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-filled-button-hover-unselected-state-layer-color, var(--m3e-button-hover-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-filled-button-hover-selected-icon-color, var(--m3e-button-hover-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected label color on hover. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-hover-selected-label-text-color, var(--m3e-button-hover-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-filled-button-hover-selected-state-layer-color, var(--m3e-button-hover-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-filled-button-focus-icon-color, var(--m3e-button-focus-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-filled-button-focus-label-text-color, var(--m3e-button-focus-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-filled-button-focus-state-layer-color, var(--m3e-button-focus-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-button-focus-state-layer-opacity, var(--m3e-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-filled-button-focus-container-elevation, var(--m3e-button-focus-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-filled-button-focus-unselected-icon-color, var(--m3e-button-focus-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected label color on focus. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-focus-unselected-label-text-color, var(--m3e-button-focus-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-filled-button-focus-unselected-state-layer-color, var(--m3e-button-focus-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-filled-button-focus-selected-icon-color, var(--m3e-button-focus-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected label color on focus. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-focus-selected-label-text-color, var(--m3e-button-focus-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-filled-button-focus-selected-state-layer-color, var(--m3e-button-focus-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-filled-button-pressed-icon-color, var(--m3e-button-pressed-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-filled-button-pressed-label-text-color, var(--m3e-button-pressed-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-filled-button-pressed-state-layer-color, var(--m3e-button-pressed-state-layer-color, ${DesignToken.color.onPrimary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-button-pressed-state-layer-opacity, var(--m3e-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-filled-button-pressed-container-elevation, var(--m3e-button-pressed-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-filled-button-pressed-unselected-icon-color, var(--m3e-button-pressed-unselected-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected label color on pressed. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-pressed-unselected-label-text-color, var(--m3e-button-pressed-unselected-label-text-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-filled-button-pressed-unselected-state-layer-color, var(--m3e-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-filled-button-pressed-selected-icon-color, var(--m3e-button-pressed-selected-icon-color, ${DesignToken.color.onPrimary}))`),
      /** Selected label color on pressed. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-filled-button-pressed-selected-label-text-color, var(--m3e-button-pressed-selected-label-text-color, ${DesignToken.color.onPrimary}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-filled-button-pressed-selected-state-layer-color, var(--m3e-button-pressed-selected-state-layer-color, ${DesignToken.color.onPrimary}))`)
    }
  },
  /** Design tokens that control the `tonal` variant. */
  tonal: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-tonal-button-label-text-color, var(--m3e-button-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-tonal-button-icon-color, var(--m3e-button-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-tonal-button-container-color, var(--m3e-button-container-color, ${DesignToken.color.secondaryContainer}))`),
    /** Resting elevation. */
    containerElevation: unsafeCSS(`var(--m3e-tonal-button-container-elevation, var(--m3e-button-container-elevation, ${DesignToken.elevation.level0}))`),
    /** Unselected label color. */
    unselectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-unselected-label-text-color, var(--m3e-button-unselected-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-tonal-button-unselected-icon-color, var(--m3e-button-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-tonal-button-unselected-container-color, var(--m3e-button-unselected-container-color, ${DesignToken.color.secondaryContainer}))`),
    /** Selected label color. */
    selectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-selected-label-text-color, var(--m3e-button-selected-label-text-color, ${DesignToken.color.onSecondary}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-tonal-button-selected-icon-color, var(--m3e-button-selected-icon-color, ${DesignToken.color.onSecondary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-tonal-button-selected-container-color, var(--m3e-button-selected-container-color, ${DesignToken.color.secondary}))`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-tonal-button-disabled-container-color, var(--m3e-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-tonal-button-disabled-container-opacity, var(--m3e-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-tonal-button-disabled-icon-color, var(--m3e-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-tonal-button-disabled-icon-opacity, var(--m3e-button-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-tonal-button-disabled-label-text-color, var(--m3e-button-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-tonal-button-disabled-label-text-opacity, var(--m3e-button-disabled-label-text-opacity, 38%))`),
      /** Elevation when disabled. */
      containerElevation: unsafeCSS(`var(--m3e-tonal-button-disabled-container-elevation, var(--m3e-button-disabled-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-tonal-button-hover-icon-color, var(--m3e-button-hover-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-tonal-button-hover-label-text-color, var(--m3e-button-hover-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-tonal-button-hover-state-layer-color, var(--m3e-button-hover-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tonal-button-hover-state-layer-opacity, var(--m3e-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Elevation on hover. */
      containerElevation: unsafeCSS(`var(--m3e-tonal-button-hover-container-elevation, var(--m3e-button-hover-container-elevation, ${DesignToken.elevation.level1}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-tonal-button-hover-unselected-icon-color, var(--m3e-button-hover-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected label color on hover. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-hover-unselected-label-text-color, var(--m3e-button-hover-unselected-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-button-hover-unselected-state-layer-color, var(--m3e-button-hover-unselected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-tonal-button-hover-selected-icon-color, var(--m3e-button-hover-selected-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Selected label color on hover. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-hover-selected-label-text-color, var(--m3e-button-hover-selected-label-text-color, ${DesignToken.color.onSecondary}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-button-hover-selected-state-layer-color, var(--m3e-button-hover-selected-state-layer-color, ${DesignToken.color.onSecondary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-tonal-button-focus-icon-color, var(--m3e-button-focus-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-tonal-button-focus-label-text-color, var(--m3e-button-focus-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-tonal-button-focus-state-layer-color, var(--m3e-button-focus-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tonal-button-focus-state-layer-opacity, var(--m3e-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Elevation on focus. */
      containerElevation: unsafeCSS(`var(--m3e-tonal-button-focus-container-elevation, var(--m3e-button-focus-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-tonal-button-focus-unselected-icon-color, var(--m3e-button-focus-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected label color on focus. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-focus-unselected-label-text-color, var(--m3e-button-focus-unselected-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-button-focus-unselected-state-layer-color, var(--m3e-button-focus-unselected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-tonal-button-focus-selected-icon-color, var(--m3e-button-focus-selected-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Selected label color on focus. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-focus-selected-label-text-color, var(--m3e-button-focus-selected-label-text-color, ${DesignToken.color.onSecondary}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-button-focus-selected-state-layer-color, var(--m3e-button-focus-selected-state-layer-color, ${DesignToken.color.onSecondary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-tonal-button-pressed-icon-color, var(--m3e-button-pressed-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-tonal-button-pressed-label-text-color, var(--m3e-button-pressed-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-tonal-button-pressed-state-layer-color, var(--m3e-button-pressed-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-tonal-button-pressed-state-layer-opacity, var(--m3e-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Elevation on pressed. */
      containerElevation: unsafeCSS(`var(--m3e-tonal-button-pressed-container-elevation, var(--m3e-button-pressed-container-elevation, ${DesignToken.elevation.level0}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-tonal-button-pressed-unselected-icon-color, var(--m3e-button-pressed-unselected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected label color on pressed. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-pressed-unselected-label-text-color, var(--m3e-button-pressed-unselected-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-button-pressed-unselected-state-layer-color, var(--m3e-button-pressed-unselected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-tonal-button-pressed-selected-icon-color, var(--m3e-button-pressed-selected-icon-color, ${DesignToken.color.onSecondary}))`),
      /** Selected label color on pressed. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-tonal-button-pressed-selected-label-text-color, var(--m3e-button-pressed-selected-label-text-color, ${DesignToken.color.onSecondary}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-tonal-button-pressed-selected-state-layer-color, var(--m3e-button-pressed-selected-state-layer-color, ${DesignToken.color.onSecondary}))`)
    }
  },
  /** Design tokens that control the `text` variant. */
  text: {
    /** Default label color. */
    labelTextColor: unsafeCSS(`var(--m3e-text-button-label-text-color, var(--m3e-button-label-text-color, ${DesignToken.color.primary}))`),
    /** Default icon color. */
    iconColor: unsafeCSS(`var(--m3e-text-button-icon-color, var(--m3e-button-icon-color, ${DesignToken.color.primary}))`),
    /** Default container background color. */
    containerColor: unsafeCSS(`var(--m3e-text-button-container-color)`),
    /** Unselected label color. */
    unselectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-unselected-label-text-color, var(--m3e-button-unselected-label-text-color, ${DesignToken.color.primary}))`),
    /** Unselected icon color. */
    unselectedIconColor: unsafeCSS(`var(--m3e-text-button-unselected-icon-color, var(--m3e-button-unselected-icon-color, ${DesignToken.color.primary}))`),
    /** Unselected container background color. */
    unselectedContainerColor: unsafeCSS(`var(--m3e-text-button-unselected-container-color)`),
    /** Selected label color. */
    selectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-selected-label-text-color, var(--m3e-button-selected-label-text-color, ${DesignToken.color.primary}))`),
    /** Selected icon color. */
    selectedIconColor: unsafeCSS(`var(--m3e-text-button-selected-icon-color, var(--m3e-button-selected-icon-color, ${DesignToken.color.primary}))`),
    /** Selected container background color. */
    selectedContainerColor: unsafeCSS(`var(--m3e-text-button-selected-container-color)`),
    /** Design tokens that control disabled state. */
    disabled: {
      /** Container background color when disabled. */
      containerColor: unsafeCSS(`var(--m3e-text-button-disabled-container-color, var(--m3e-button-disabled-container-color, ${DesignToken.color.onSurface}))`),
      /** Opacity of container when disabled. */
      containerOpacity: unsafeCSS(`var(--m3e-text-button-disabled-container-opacity, var(--m3e-button-disabled-container-opacity, 10%))`),
      /** Icon color when disabled. */
      iconColor: unsafeCSS(`var(--m3e-text-button-disabled-icon-color, var(--m3e-button-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      /** Icon opacity when disabled. */
      iconOpacity: unsafeCSS(`var(--m3e-text-button-disabled-icon-opacity, var(--m3e-button-disabled-icon-opacity, 38%))`),
      /** Label color when disabled. */
      labelTextColor: unsafeCSS(`var(--m3e-text-button-disabled-label-text-color, var(--m3e-button-disabled-label-text-color, ${DesignToken.color.onSurface}))`),
      /** Label opacity when disabled. */
      labelTextOpacity: unsafeCSS(`var(--m3e-text-button-disabled-label-text-opacity, var(--m3e-button-disabled-label-text-opacity, 38%))`)
    },
    /** Design tokens that control hover state. */
    hover: {
      /** Icon color on hover. */
      iconColor: unsafeCSS(`var(--m3e-text-button-hover-icon-color, var(--m3e-button-hover-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on hover. */
      labelTextColor: unsafeCSS(`var(--m3e-text-button-hover-label-text-color, var(--m3e-button-hover-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on hover. */
      stateLayerColor: unsafeCSS(`var(--m3e-text-button-hover-state-layer-color, var(--m3e-button-hover-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on hover. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-text-button-hover-state-layer-opacity, var(--m3e-button-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      /** Unselected icon color on hover. */
      unselectedIconColor: unsafeCSS(`var(--m3e-text-button-hover-unselected-icon-color, var(--m3e-button-hover-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected label color on hover. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-hover-unselected-label-text-color, var(--m3e-button-hover-unselected-label-text-color, ${DesignToken.color.primary}))`),
      /** Unselected state layer color on hover. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-text-button-hover-unselected-state-layer-color, var(--m3e-button-hover-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on hover. */
      selectedIconColor: unsafeCSS(`var(--m3e-text-button-hover-selected-icon-color, var(--m3e-button-hover-selected-icon-color, ${DesignToken.color.primary}))`),
      /** Selected label color on hover. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-hover-selected-label-text-color, var(--m3e-button-hover-selected-label-text-color, ${DesignToken.color.primary}))`),
      /** Selected state layer color on hover. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-text-button-hover-selected-state-layer-color, var(--m3e-button-hover-selected-state-layer-color, ${DesignToken.color.primary}))`)
    },
    /** Design tokens that control focus state. */
    focus: {
      /** Icon color on focus. */
      iconColor: unsafeCSS(`var(--m3e-text-button-focus-icon-color, var(--m3e-button-focus-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on focus. */
      labelTextColor: unsafeCSS(`var(--m3e-text-button-focus-label-text-color, var(--m3e-button-focus-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on focus. */
      stateLayerColor: unsafeCSS(`var(--m3e-text-button-focus-state-layer-color, var(--m3e-button-focus-state-layer-color, ${DesignToken.color.primary}))`),
      /**State layer opacity on focus. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-text-button-focus-state-layer-opacity, var(--m3e-button-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      /** Unselected icon color on focus. */
      unselectedIconColor: unsafeCSS(`var(--m3e-text-button-focus-unselected-icon-color, var(--m3e-button-focus-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected label color on focus. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-focus-unselected-label-text-color, var(--m3e-button-focus-unselected-label-text-color, ${DesignToken.color.primary}))`),
      /** Unselected state layer color on focus. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-text-button-focus-unselected-state-layer-color, var(--m3e-button-focus-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on focus. */
      selectedIconColor: unsafeCSS(`var(--m3e-text-button-focus-selected-icon-color, var(--m3e-button-focus-selected-icon-color, ${DesignToken.color.primary}))`),
      /** Selected label color on focus. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-focus-selected-label-text-color, var(--m3e-button-focus-selected-label-text-color, ${DesignToken.color.primary}))`),
      /** Selected state layer color on focus. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-text-button-focus-selected-state-layer-color, var(--m3e-button-focus-selected-state-layer-color, ${DesignToken.color.primary}))`)
    },
    /** Design tokens that control pressed state. */
    pressed: {
      /** Icon color on pressed. */
      iconColor: unsafeCSS(`var(--m3e-text-button-pressed-icon-color, var(--m3e-button-pressed-icon-color, ${DesignToken.color.primary}))`),
      /** Label color on pressed. */
      labelTextColor: unsafeCSS(`var(--m3e-text-button-pressed-label-text-color, var(--m3e-button-pressed-label-text-color, ${DesignToken.color.primary}))`),
      /** State layer color on pressed. */
      stateLayerColor: unsafeCSS(`var(--m3e-text-button-pressed-state-layer-color, var(--m3e-button-pressed-state-layer-color, ${DesignToken.color.primary}))`),
      /** State layer opacity on pressed. */
      stateLayerOpacity: unsafeCSS(`var(--m3e-text-button-pressed-state-layer-opacity, var(--m3e-button-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      /** Unselected icon color on pressed. */
      unselectedIconColor: unsafeCSS(`var(--m3e-text-button-pressed-unselected-icon-color, var(--m3e-button-pressed-unselected-icon-color, ${DesignToken.color.primary}))`),
      /** Unselected label color on pressed. */
      unselectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-pressed-unselected-label-text-color, var(--m3e-button-pressed-unselected-label-text-color, ${DesignToken.color.primary}))`),
      /** Unselected state layer color on pressed. */
      unselectedStateLayerColor: unsafeCSS(`var(--m3e-text-button-pressed-unselected-state-layer-color, var(--m3e-button-pressed-unselected-state-layer-color, ${DesignToken.color.primary}))`),
      /** Selected icon color on pressed. */
      selectedIconColor: unsafeCSS(`var(--m3e-text-button-pressed-selected-icon-color, var(--m3e-button-pressed-selected-icon-color, ${DesignToken.color.primary}))`),
      /** Selected label color on pressed. */
      selectedLabelTextColor: unsafeCSS(`var(--m3e-text-button-pressed-selected-label-text-color, var(--m3e-button-pressed-selected-label-text-color, ${DesignToken.color.primary}))`),
      /** Selected state layer color on pressed. */
      selectedStateLayerColor: unsafeCSS(`var(--m3e-text-button-pressed-selected-state-layer-color, var(--m3e-button-pressed-selected-state-layer-color, ${DesignToken.color.primary}))`)
    }
  }
};

/** @private */
function buttonVariantStyle(variant) {
  const selector = unsafeCSS(`:is(:state(--${variant}), :--${variant})`);
  return css`:host(${selector}:not(:disabled):not([disabled-interactive])) .base { background-color: ${ButtonVariantToken[variant].containerColor ?? unsafeCSS("unset")}; --m3e-state-layer-hover-color: ${ButtonVariantToken[variant].hover.stateLayerColor}; --m3e-state-layer-hover-opacity: ${ButtonVariantToken[variant].hover.stateLayerOpacity}; --m3e-state-layer-focus-color: ${ButtonVariantToken[variant].focus.stateLayerColor}; --m3e-state-layer-focus-opacity: ${ButtonVariantToken[variant].focus.stateLayerOpacity}; --m3e-ripple-color: ${ButtonVariantToken[variant].pressed.stateLayerColor}; --m3e-ripple-opacity: ${ButtonVariantToken[variant].pressed.stateLayerOpacity}; --m3e-elevation-level: ${ButtonVariantToken[variant].containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-hover-level: ${ButtonVariantToken[variant].hover.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-focus-level: ${ButtonVariantToken[variant].focus.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-pressed-level: ${ButtonVariantToken[variant].pressed.containerElevation ?? unsafeCSS("unset")}; } :host(${selector}[toggle]:not([selected]):not(:disabled):not([disabled-interactive])) .base { background-color: ${ButtonVariantToken[variant].unselectedContainerColor ?? unsafeCSS("unset")}; --m3e-state-layer-hover-color: ${ButtonVariantToken[variant].hover.unselectedStateLayerColor}; --m3e-state-layer-focus-color: ${ButtonVariantToken[variant].focus.unselectedStateLayerColor}; --m3e-ripple-color: ${ButtonVariantToken[variant].pressed.unselectedStateLayerColor}; } :host(${selector}[toggle][selected]:not(:disabled):not([disabled-interactive])) .base { background-color: ${ButtonVariantToken[variant].selectedContainerColor ?? unsafeCSS("unset")}; --m3e-state-layer-hover-color: ${ButtonVariantToken[variant].hover.selectedStateLayerColor}; --m3e-state-layer-focus-color: ${ButtonVariantToken[variant].focus.selectedStateLayerColor}; --m3e-ripple-color: ${ButtonVariantToken[variant].pressed.selectedStateLayerColor}; } :host(${selector}:not(:disabled):not([disabled-interactive])) .base { outline-color: ${ButtonVariantToken[variant].outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:focus:not(:disabled):not([disabled-interactive])) .base { outline-color: ${ButtonVariantToken[variant].focus.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:hover:not(:disabled):not([disabled-interactive])) .base { outline-color: ${ButtonVariantToken[variant].hover.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .base { outline-color: ${ButtonVariantToken[variant].pressed.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].labelTextColor}; } :host(${selector}[toggle]:not([selected]):not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].unselectedLabelTextColor}; } :host(${selector}[toggle][selected]:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].selectedLabelTextColor}; } :host(${selector}:focus:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].focus.labelTextColor}; } :host(${selector}[toggle]:not([selected]):focus:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].focus.unselectedLabelTextColor}; } :host(${selector}[toggle][selected]:focus:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].focus.selectedLabelTextColor}; } :host(${selector}:hover:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].hover.labelTextColor}; } :host(${selector}[toggle]:not([selected]):hover:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].hover.unselectedLabelTextColor}; } :host(${selector}[toggle][selected]:hover:not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].hover.selectedLabelTextColor}; } :host(${selector}:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].pressed.labelTextColor}; } :host( ${selector}[toggle]:not([selected]):is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive]) ) .label { color: ${ButtonVariantToken[variant].pressed.unselectedLabelTextColor}; } :host(${selector}[toggle][selected]:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .label { color: ${ButtonVariantToken[variant].pressed.selectedLabelTextColor}; } :host(${selector}:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].iconColor}; } :host(${selector}[toggle]:not([selected]):not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].unselectedIconColor}; } :host(${selector}[toggle][selected]:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].selectedIconColor}; } :host(${selector}:focus:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].focus.iconColor}; } :host(${selector}[toggle]:not([selected]):focus:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].focus.unselectedIconColor}; } :host(${selector}[toggle][selected]:focus:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].focus.selectedIconColor}; } :host(${selector}:hover:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].hover.iconColor}; } :host(${selector}[toggle]:not([selected]):hover:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].hover.unselectedIconColor}; } :host(${selector}[toggle][selected]:hover:not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].hover.selectedIconColor}; } :host(${selector}:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].pressed.iconColor}; } :host( ${selector}[toggle]:not([selected]):is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive]) ) .icon { color: ${ButtonVariantToken[variant].pressed.unselectedIconColor}; } :host(${selector}[toggle][selected]:is(:state(--pressed), :--pressed):not(:disabled):not([disabled-interactive])) .icon { color: ${ButtonVariantToken[variant].pressed.selectedIconColor}; } :host(${selector}:disabled) .base, :host(${selector}[disabled-interactive]) .base { --m3e-elevation-level: ${ButtonVariantToken[variant].disabled.containerElevation ?? unsafeCSS("unset")}; outline-color: ${ButtonVariantToken[variant].disabled.outlineColor ?? unsafeCSS("unset")}; background-color: color-mix( in srgb, ${ButtonVariantToken[variant].disabled.containerColor} ${ButtonVariantToken[variant].disabled.containerOpacity}, transparent ); } :host(${selector}:disabled) .label, :host(${selector}[disabled-interactive]) .label { color: color-mix( in srgb, ${ButtonVariantToken[variant].disabled.labelTextColor} ${ButtonVariantToken[variant].disabled.labelTextOpacity}, transparent ); } :host(${selector}:disabled) .icon, :host(${selector}[disabled-interactive]) .icon { color: color-mix( in srgb, ${ButtonVariantToken[variant].disabled.iconColor} ${ButtonVariantToken[variant].disabled.iconOpacity}, transparent ); }`;
}
/**
 * Appearance variant styles for `M3eButtonElement`.
 * @internal
 */
const ButtonVariantStyle = [buttonVariantStyle("text"), buttonVariantStyle("elevated"), buttonVariantStyle("outlined"), buttonVariantStyle("filled"), buttonVariantStyle("tonal"), css`:host(:is(:state(--outlined), :--outlined):not([toggle][selected]):not(:disabled):not([disabled-interactive])) .base { outline-style: solid; }`];

var _M3eButtonElement_instances, _M3eButtonElement_clickHandler, _M3eButtonElement_applyVariant, _M3eButtonElement_applyShape, _M3eButtonElement_applySize, _M3eButtonElement_handleClick, _M3eButtonElement_handleSelectedIconSlotChange, _M3eButtonElement_updateButtonShape, _M3eButtonElement_handlePressedChange, _M3eButtonElement_cleanupAdjacentPressed, _M3eButtonElement_compressionLimit;
/**
 * A button users interact with to perform an action.
 *
 * @description
 * The `m3e-button` component is a semantic, expressive UI primitive users interact with to perform an action.
 * Designed according to Material Design 3 guidelines, it supports five visual variants, specified using the
 * `variant` attribute—`filled`, `tonal`, `elevated`, `outlined`, and `text`—each with dynamic elevation,
 * shape morphing, and adaptive color theming. The component responds to interaction states (hover, focus, press, disabled)
 * with smooth motion transitions, ensuring emotional clarity and visual hierarchy.
 *
 * The component is accessible by default, with ARIA roles, contrast-safe color tokens, and strong focus indicators.
 * It supports optional icons and states for binary actions.  When using `m3e-icon` for icons, `filled` is automatically
 * set based on the selected state of a toggle button. It can also function as a link or be used to submit form data.
 *
 * Native disabled `<button>` elements cannot receive focus. This can be problematic in some cases because it can prevent you
 * from telling the user why the button is disabled. You can use the `disabled-interactive` attribute to style a `m3e-button`
 * as disabled but allow for it to receive focus. The button will have `aria-disabled="true"` for assistive technology.
 *
 * @example
 * The following example illustrates changing the appearance from `text` (default), to `tonal` using the `variant` attribute.
 * ```html
 * <m3e-button variant="tonal">Tonal Button</m3e-button>
 * ```
 *
 * @tag m3e-button
 *
 * @slot - Renders the label of the button.
 * @slot icon - Renders an icon before the button's label.
 * @slot selected - Renders the label of the button, when selected.
 * @slot selected-icon - Renders an icon before the button's label, when selected.
 * @slot trailing-icon - Renders an icon after the button's label.
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
 *
 * @fires beforeinput - Dispatched before a toggle button's selected state changes.
 * @fires input - Dispatched when a toggle button's selected state changes.
 * @fires change - Dispatched when a toggle button's selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-button-container-height - Height of the button container, for all size variants.
 * @cssprop --m3e-button-outline-thickness - Thickness of the button outline, for all size variants.
 * @cssprop --m3e-button-label-text-font-size - Font size for the label text, for all size variants.
 * @cssprop --m3e-button-label-text-font-weight - Font weight for the label text, for all size variants.
 * @cssprop --m3e-button-label-text-line-height - Line height for the label text, for all size variants.
 * @cssprop --m3e-button-label-text-tracking - Letter tracking for the label text, for all size variants.
 * @cssprop --m3e-button-icon-size - Size of the icon, for all size variants.
 * @cssprop --m3e-button-shape-round - Corner radius for round shape, for all size variants.
 * @cssprop --m3e-button-shape-square - Corner radius for square shape, for all size variants.
 * @cssprop --m3e-button-selected-shape-round - Corner radius when selected (round), for all size variants.
 * @cssprop --m3e-button-selected-shape-square - Corner radius when selected (square), for all size variants.
 * @cssprop --m3e-button-shape-pressed-morph - Corner radius when pressed, for all size variants.
 * @cssprop --m3e-button-leading-space - Space before icon or label, for all size variants.
 * @cssprop --m3e-button-trailing-space - Space after icon or label, for all size variants.
 * @cssprop --m3e-button-icon-label-space - Space between icon and label, for all size variants.
 * @cssprop --m3e-button-extra-small-container-height - Height of the button container, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-outline-thickness - Thickness of the button outline, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-label-text-font-size - Font size for the label text, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-label-text-font-weight - Font weight for the label text, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-label-text-line-height - Line height for the label text, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-label-text-tracking - Letter tracking for the label text, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-icon-size - Size of the icon, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-shape-round - Corner radius for round shape, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-shape-square - Corner radius for square shape, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-selected-shape-round - Corner radius when selected (round), for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-selected-shape-square - Corner radius when selected (square), for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-shape-pressed-morph - Corner radius when pressed, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-leading-space - Space before icon or label, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-trailing-space - Space after icon or label, for the extra-small size variant.
 * @cssprop --m3e-button-extra-small-icon-label-space - Space between icon and label, for the extra-small size variant.
 * @cssprop --m3e-button-small-container-height - Height of the button container, for the small size variant.
 * @cssprop --m3e-button-small-outline-thickness - Thickness of the button outline, for the small size variant.
 * @cssprop --m3e-button-small-label-text-font-size - Font size for the label text, for the small size variant.
 * @cssprop --m3e-button-small-label-text-font-weight - Font weight for the label text, for the small size variant.
 * @cssprop --m3e-button-small-label-text-line-height - Line height for the label text, for the small size variant.
 * @cssprop --m3e-button-small-label-text-tracking - Letter tracking for the label text, for the small size variant.
 * @cssprop --m3e-button-small-icon-size - Size of the icon, for the small size variant.
 * @cssprop --m3e-button-small-shape-round - Corner radius for round shape, for the small size variant.
 * @cssprop --m3e-button-small-shape-square - Corner radius for square shape, for the small size variant.
 * @cssprop --m3e-button-small-selected-shape-round - Corner radius when selected (round), for the small size variant.
 * @cssprop --m3e-button-small-selected-shape-square - Corner radius when selected (square), for the small size variant.
 * @cssprop --m3e-button-small-shape-pressed-morph - Corner radius when pressed, for the small size variant.
 * @cssprop --m3e-button-small-leading-space - Space before icon or label, for the small size variant.
 * @cssprop --m3e-button-small-trailing-space - Space after icon or label, for the small size variant.
 * @cssprop --m3e-button-small-icon-label-space - Space between icon and label, for the small size variant.
 * @cssprop --m3e-button-medium-container-height - Height of the button container, for the medium size variant.
 * @cssprop --m3e-button-medium-outline-thickness - Thickness of the button outline, for the medium size variant.
 * @cssprop --m3e-button-medium-label-text-font-size - Font size for the label text, for the medium size variant.
 * @cssprop --m3e-button-medium-label-text-font-weight - Font weight for the label text, for the medium size variant.
 * @cssprop --m3e-button-medium-label-text-line-height - Line height for the label text, for the medium size variant.
 * @cssprop --m3e-button-medium-label-text-tracking - Letter tracking for the label text, for the medium size variant.
 * @cssprop --m3e-button-medium-icon-size - Size of the icon, for the medium size variant.
 * @cssprop --m3e-button-medium-shape-round - Corner radius for round shape, for the medium size variant.
 * @cssprop --m3e-button-medium-shape-square - Corner radius for square shape, for the medium size variant.
 * @cssprop --m3e-button-medium-selected-shape-round - Corner radius when selected (round), for the medium size variant.
 * @cssprop --m3e-button-medium-selected-shape-square - Corner radius when selected (square), for the medium size variant.
 * @cssprop --m3e-button-medium-shape-pressed-morph - Corner radius when pressed, for the medium size variant.
 * @cssprop --m3e-button-medium-leading-space - Space before icon or label, for the medium size variant.
 * @cssprop --m3e-button-medium-trailing-space - Space after icon or label, for the medium size variant.
 * @cssprop --m3e-button-medium-icon-label-space - Space between icon and label, for the medium size variant.
 * @cssprop --m3e-button-large-container-height - Height of the button container, for the large size variant.
 * @cssprop --m3e-button-large-outline-thickness - Thickness of the button outline, for the large size variant.
 * @cssprop --m3e-button-large-label-text-font-size - Font size for the label text, for the large size variant.
 * @cssprop --m3e-button-large-label-text-font-weight - Font weight for the label text, for the large size variant.
 * @cssprop --m3e-button-large-label-text-line-height - Line height for the label text, for the large size variant.
 * @cssprop --m3e-button-large-label-text-tracking - Letter tracking for the label text, for the large size variant.
 * @cssprop --m3e-button-large-icon-size - Size of the icon, for the large size variant.
 * @cssprop --m3e-button-large-shape-round - Corner radius for round shape, for the large size variant.
 * @cssprop --m3e-button-large-shape-square - Corner radius for square shape, for the large size variant.
 * @cssprop --m3e-button-large-selected-shape-round - Corner radius when selected (round), for the large size variant.
 * @cssprop --m3e-button-large-selected-shape-square - Corner radius when selected (square), for the large size variant.
 * @cssprop --m3e-button-large-shape-pressed-morph - Corner radius when pressed, for the large size variant.
 * @cssprop --m3e-button-large-leading-space - Space before icon or label, for the large size variant.
 * @cssprop --m3e-button-large-trailing-space - Space after icon or label, for the large size variant.
 * @cssprop --m3e-button-large-icon-label-space - Space between icon and label, for the large size variant.
 * @cssprop --m3e-button-extra-large-container-height - Height of the button container, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-outline-thickness - Thickness of the button outline, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-label-text-font-size - Font size for the label text, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-label-text-font-weight - Font weight for the label text, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-label-text-line-height - Line height for the label text, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-label-text-tracking - Letter tracking for the label text, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-icon-size - Size of the icon, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-shape-round - Corner radius for round shape, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-shape-square - Corner radius for square shape, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-selected-shape-round - Corner radius when selected (round), for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-selected-shape-square - Corner radius when selected (square), for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-shape-pressed-morph - Corner radius when pressed, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-leading-space - Space before icon or label, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-trailing-space - Space after icon or label, for the extra-large size variant.
 * @cssprop --m3e-button-extra-large-icon-label-space - Space between icon and label, for the extra-large size variant.
 * @cssprop --m3e-button-outline-color - Outline color, for all variants.
 * @cssprop --m3e-button-disabled-outline-color - Disabled outline color, for all variants.
 * @cssprop --m3e-button-hover-outline-color - Hover outline color, for all variants.
 * @cssprop --m3e-button-focus-outline-color - Focus outline color, for all variants.
 * @cssprop --m3e-button-pressed-outline-color - Pressed outline color, for all variants.
 * @cssprop --m3e-button-container-color - Container background color, for all variants.
 * @cssprop --m3e-button-container-elevation - Elevation, for all variants.
 * @cssprop --m3e-button-unselected-container-color - Unselected container color, for all variants.
 * @cssprop --m3e-button-selected-container-color - Selected container color, for all variants.
 * @cssprop --m3e-button-disabled-container-elevation - Disabled elevation, for all variants.
 * @cssprop --m3e-button-hover-container-elevation - Hover elevation, for all variants.
 * @cssprop --m3e-button-focus-container-elevation - Focus elevation, for all variants.
 * @cssprop --m3e-button-pressed-container-elevation - Pressed elevation, for all variants.
 * @cssprop --m3e-button-label-text-color - Label color, for all variants.
 * @cssprop --m3e-button-icon-color - Icon color, for all variants.
 * @cssprop --m3e-button-unselected-label-text-color - Unselected label color, for all variants.
 * @cssprop --m3e-button-unselected-icon-color - Unselected icon color, for all variants.
 * @cssprop --m3e-button-selected-label-text-color - Selected label color, for all variants.
 * @cssprop --m3e-button-selected-icon-color - Selected icon color, for all variants.
 * @cssprop --m3e-button-disabled-container-color - Disabled container color, for all variants.
 * @cssprop --m3e-button-disabled-container-opacity - Disabled container opacity, for all variants.
 * @cssprop --m3e-button-disabled-icon-color - Disabled icon color, for all variants.
 * @cssprop --m3e-button-disabled-icon-opacity - Disabled icon opacity, for all variants.
 * @cssprop --m3e-button-disabled-label-text-color - Disabled label color, for all variants.
 * @cssprop --m3e-button-disabled-label-text-opacity - Disabled label opacity, for all variants.
 * @cssprop --m3e-button-hover-icon-color - Hover icon color, for all variants.
 * @cssprop --m3e-button-hover-label-text-color - Hover label color, for all variants.
 * @cssprop --m3e-button-hover-state-layer-color - Hover state layer color, for all variants.
 * @cssprop --m3e-button-hover-state-layer-opacity - Hover state layer opacity, for all variants.
 * @cssprop --m3e-button-hover-unselected-icon-color - Hover unselected icon color, for all variants.
 * @cssprop --m3e-button-hover-unselected-label-text-color - Hover unselected label color, for all variants.
 * @cssprop --m3e-button-hover-unselected-state-layer-color - Hover unselected state layer color, for all variants.
 * @cssprop --m3e-button-hover-selected-icon-color - Hover selected icon color, for all variants.
 * @cssprop --m3e-button-hover-selected-label-text-color - Hover selected label color, for all variants.
 * @cssprop --m3e-button-hover-selected-state-layer-color - Hover selected state layer color, for all variants.
 * @cssprop --m3e-button-focus-icon-color - Focus icon color, for all variants.
 * @cssprop --m3e-button-focus-label-text-color - Focus label color, for all variants.
 * @cssprop --m3e-button-focus-state-layer-color - Focus state layer color, for all variants.
 * @cssprop --m3e-button-focus-state-layer-opacity - Focus state layer opacity, for all variants.
 * @cssprop --m3e-button-focus-unselected-icon-color - Focus unselected icon color, for all variants.
 * @cssprop --m3e-button-focus-unselected-label-text-color - Focus unselected label color, for all variants.
 * @cssprop --m3e-button-focus-unselected-state-layer-color - Focus unselected state layer color, for all variants.
 * @cssprop --m3e-button-focus-selected-icon-color - Focus selected icon color, for all variants.
 * @cssprop --m3e-button-focus-selected-label-text-color - Focus selected label color, for all variants.
 * @cssprop --m3e-button-focus-selected-state-layer-color - Focus selected state layer color, for all variants.
 * @cssprop --m3e-button-pressed-icon-color - Pressed icon color, for all variants.
 * @cssprop --m3e-button-pressed-label-text-color - Pressed label color, for all variants.
 * @cssprop --m3e-button-pressed-state-layer-color - Pressed state layer color, for all variants.
 * @cssprop --m3e-button-pressed-state-layer-opacity - Pressed state layer opacity, for all variants.
 * @cssprop --m3e-button-pressed-unselected-icon-color - Pressed unselected icon color, for all variants.
 * @cssprop --m3e-button-pressed-unselected-label-text-color - Pressed unselected label color, for all variants.
 * @cssprop --m3e-button-pressed-unselected-state-layer-color - Pressed unselected state layer color, for all variants.
 * @cssprop --m3e-button-pressed-selected-icon-color - Pressed selected icon color, for all variants.
 * @cssprop --m3e-button-pressed-selected-label-text-color - Pressed selected label color, for all variants.
 * @cssprop --m3e-button-pressed-selected-state-layer-color - Pressed selected state layer color, for all variants.
 * @cssprop --m3e-elevated-button-label-text-color - Label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-icon-color - Icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-container-color - Container background color, for the elevated variant.
 * @cssprop --m3e-elevated-button-container-elevation - Elevation, for the elevated variant.
 * @cssprop --m3e-elevated-button-unselected-label-text-color - Unselected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-unselected-icon-color - Unselected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-unselected-container-color - Unselected container color, for the elevated variant.
 * @cssprop --m3e-elevated-button-selected-label-text-color - Selected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-selected-icon-color - Selected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-selected-container-color - Selected container color, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-container-color - Disabled container color, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-container-opacity - Disabled container opacity, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-icon-color - Disabled icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-icon-opacity - Disabled icon opacity, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-label-text-color - Disabled label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-label-text-opacity - Disabled label opacity, for the elevated variant.
 * @cssprop --m3e-elevated-button-disabled-container-elevation - Disabled elevation, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-icon-color - Hover icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-label-text-color - Hover label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-state-layer-color - Hover state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-state-layer-opacity - Hover state layer opacity, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-container-elevation - Hover elevation, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-unselected-icon-color - Hover unselected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-unselected-label-text-color - Hover unselected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-unselected-state-layer-color - Hover unselected state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-selected-icon-color - Hover selected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-selected-label-text-color - Hover selected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-hover-selected-state-layer-color - Hover selected state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-icon-color - Focus icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-label-text-color - Focus label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-state-layer-color - Focus state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-state-layer-opacity - Focus state layer opacity, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-container-elevation - Focus elevation, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-unselected-label-text-color - Focus unselected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-unselected-icon-color - Focus unselected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-unselected-state-layer-color - Focus unselected state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-selected-icon-color - Focus selected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-selected-label-text-color - Focus selected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-focus-selected-state-layer-color - Focus selected state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-icon-color - Pressed icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-label-text-color - Pressed label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-state-layer-color - Pressed state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-state-layer-opacity - Pressed state layer opacity, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-container-elevation - Pressed elevation, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-unselected-label-text-color - Pressed unselected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-unselected-icon-color - Pressed unselected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-unselected-state-layer-color - Pressed unselected state layer color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-selected-icon-color - Pressed selected icon color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-selected-label-text-color - Pressed selected label color, for the elevated variant.
 * @cssprop --m3e-elevated-button-pressed-selected-state-layer-color - Pressed selected state layer color, for the elevated variant.
 * @cssprop --m3e-outlined-button-label-text-color - Label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-icon-color - Icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-outline-color - Outline color, for the outlined variant.
 * @cssprop --m3e-outlined-button-unselected-label-text-color - Unselected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-unselected-icon-color - Unselected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-selected-label-text-color - Selected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-selected-icon-color - Selected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-selected-container-color - Selected container color, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-container-color - Disabled container color, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-container-opacity - Disabled container opacity, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-icon-color - Disabled icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-icon-opacity - Disabled icon opacity, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-label-text-color - Disabled label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-label-text-opacity - Disabled label opacity, for the outlined variant.
 * @cssprop --m3e-outlined-button-disabled-outline-color - Disabled outline color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-icon-color - Hover icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-label-text-color - Hover label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-outline-color - Hover outline color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-state-layer-color - Hover state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-state-layer-opacity - Hover state layer opacity, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-unselected-icon-color - Hover unselected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-unselected-label-text-color - Hover unselected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-unselected-state-layer-color - Hover unselected state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-selected-icon-color - Hover selected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-selected-label-text-color - Hover selected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-hover-selected-state-layer-color - Hover selected state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-icon-color - Focus icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-label-text-color - Focus label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-outline-color - Focus outline color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-state-layer-color - Focus state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-state-layer-opacity - Focus state layer opacity, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-unselected-icon-color - Focus unselected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-unselected-label-text-color - Focus unselected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-unselected-state-layer-color - Focus unselected state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-selected-icon-color - Focus selected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-selected-label-text-color - Focus selected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-focus-selected-state-layer-color - Focus selected state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-icon-color - Pressed icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-label-text-color - Pressed label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-outline-color - Pressed outline color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-state-layer-color - Pressed state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-state-layer-opacity - Pressed state layer opacity, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-unselected-icon-color - Pressed unselected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-unselected-label-text-color - Pressed unselected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-unselected-state-layer-color - Pressed unselected state layer color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-selected-icon-color - Pressed selected icon color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-selected-label-text-color - Pressed selected label color, for the outlined variant.
 * @cssprop --m3e-outlined-button-pressed-selected-state-layer-color - Pressed selected state layer color, for the outlined variant.
 * @cssprop --m3e-filled-button-label-text-color - Label color, for the filled variant.
 * @cssprop --m3e-filled-button-icon-color - Icon color, for the filled variant.
 * @cssprop --m3e-filled-button-container-color - Container background color, for the filled variant.
 * @cssprop --m3e-filled-button-container-elevation - Elevation, for the filled variant.
 * @cssprop --m3e-filled-button-unselected-label-text-color - Unselected label color, for the filled variant.
 * @cssprop --m3e-filled-button-unselected-icon-color - Unselected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-unselected-container-color - Unselected container color, for the filled variant.
 * @cssprop --m3e-filled-button-selected-label-text-color - Selected label color, for the filled variant.
 * @cssprop --m3e-filled-button-selected-icon-color - Selected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-selected-container-color - Selected container color, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-container-color - Disabled container color, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-container-opacity - Disabled container opacity, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-icon-color - Disabled icon color, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-icon-opacity - Disabled icon opacity, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-label-text-color - Disabled label color, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-label-text-opacity - Disabled label opacity, for the filled variant.
 * @cssprop --m3e-filled-button-disabled-container-elevation - Disabled elevation, for the filled variant.
 * @cssprop --m3e-filled-button-hover-icon-color - Hover icon color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-label-text-color - Hover label color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-state-layer-color - Hover state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-state-layer-opacity - Hover state layer opacity, for the filled variant.
 * @cssprop --m3e-filled-button-hover-container-elevation - Hover elevation, for the filled variant.
 * @cssprop --m3e-filled-button-hover-unselected-icon-color - Hover unselected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-unselected-label-text-color - Hover unselected label color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-unselected-state-layer-color - Hover unselected state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-selected-icon-color - Hover selected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-selected-label-text-color - Hover selected label color, for the filled variant.
 * @cssprop --m3e-filled-button-hover-selected-state-layer-color - Hover selected state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-icon-color - Focus icon color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-label-text-color - Focus label color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-state-layer-color - Focus state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-state-layer-opacity - Focus state layer opacity, for the filled variant.
 * @cssprop --m3e-filled-button-focus-container-elevation - Focus elevation, for the filled variant.
 * @cssprop --m3e-filled-button-focus-unselected-icon-color - Focus unselected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-unselected-label-text-color - Focus unselected label color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-unselected-state-layer-color - Focus unselected state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-selected-icon-color - Focus selected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-selected-label-text-color - Focus selected label color, for the filled variant.
 * @cssprop --m3e-filled-button-focus-selected-state-layer-color - Focus selected state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-icon-color - Pressed icon color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-label-text-color - Pressed label color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-state-layer-color - Pressed state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-state-layer-opacity - Pressed state layer opacity, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-container-elevation - Pressed elevation, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-unselected-icon-color - Pressed unselected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-unselected-label-text-color - Pressed unselected label color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-unselected-state-layer-color - Pressed unselected state layer color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-selected-icon-color - Pressed selected icon color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-selected-label-text-color - Pressed selected label color, for the filled variant.
 * @cssprop --m3e-filled-button-pressed-selected-state-layer-color - Pressed selected state layer color, for the filled variant.
 * @cssprop --m3e-tonal-button-label-text-color - Label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-icon-color - Icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-container-color - Container background color, for the tonal variant.
 * @cssprop --m3e-tonal-button-container-elevation - Elevation, for the tonal variant.
 * @cssprop --m3e-tonal-button-unselected-label-text-color - Unselected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-unselected-icon-color - Unselected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-unselected-container-color - Unselected container color, for the tonal variant.
 * @cssprop --m3e-tonal-button-selected-label-text-color - Selected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-selected-icon-color - Selected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-selected-container-color - Selected container color, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-container-color - Disabled container color, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-container-opacity - Disabled container opacity, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-icon-color - Disabled icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-icon-opacity - Disabled icon opacity, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-label-text-color - Disabled label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-label-text-opacity - Disabled label opacity, for the tonal variant.
 * @cssprop --m3e-tonal-button-disabled-container-elevation - Disabled elevation, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-icon-color - Hover icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-label-text-color - Hover label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-state-layer-color - Hover state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-state-layer-opacity - Hover state layer opacity, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-container-elevation - Hover elevation, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-unselected-icon-color - Hover unselected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-unselected-label-text-color - Hover unselected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-unselected-state-layer-color - Hover unselected state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-selected-icon-color - Hover selected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-selected-label-text-color - Hover selected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-hover-selected-state-layer-color - Hover selected state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-icon-color - Focus icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-label-text-color - Focus label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-state-layer-color - Focus state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-state-layer-opacity - Focus state layer opacity, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-container-elevation - Focus elevation, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-unselected-icon-color - Focus unselected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-unselected-label-text-color - Focus unselected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-unselected-state-layer-color - Focus unselected state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-selected-icon-color - Focus selected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-selected-label-text-color - Focus selected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-focus-selected-state-layer-color - Focus selected state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-icon-color - Pressed icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-label-text-color - Pressed label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-state-layer-color - Pressed state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-state-layer-opacity - Pressed state layer opacity, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-container-elevation - Pressed elevation, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-unselected-icon-color - Pressed unselected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-unselected-label-text-color - Pressed unselected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-unselected-state-layer-color - Pressed unselected state layer color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-selected-icon-color - Pressed selected icon color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-selected-label-text-color - Pressed selected label color, for the tonal variant.
 * @cssprop --m3e-tonal-button-pressed-selected-state-layer-color - Pressed selected state layer color, for the tonal variant.
 * @cssprop --m3e-text-button-label-text-color - Label color, for the text variant.
 * @cssprop --m3e-text-button-icon-color - Icon color, for the text variant.
 * @cssprop --m3e-text-button-container-color - Container background color, for the text variant.
 * @cssprop --m3e-text-button-unselected-label-text-color - Unselected label color, for the text variant.
 * @cssprop --m3e-text-button-unselected-icon-color - Unselected icon color, for the text variant.
 * @cssprop --m3e-text-button-unselected-container-color - Unselected container color, for the text variant.
 * @cssprop --m3e-text-button-selected-label-text-color - Selected label color, for the text variant.
 * @cssprop --m3e-text-button-selected-icon-color - Selected icon color, for the text variant.
 * @cssprop --m3e-text-button-selected-container-color - Selected container color, for the text variant.
 * @cssprop --m3e-text-button-disabled-container-color - Disabled container color, for the text variant.
 * @cssprop --m3e-text-button-disabled-container-opacity - Disabled container opacity, for the text variant.
 * @cssprop --m3e-text-button-disabled-icon-color - Disabled icon color, for the text variant.
 * @cssprop --m3e-text-button-disabled-icon-opacity - Disabled icon opacity, for the text variant.
 * @cssprop --m3e-text-button-disabled-label-text-color - Disabled label color, for the text variant.
 * @cssprop --m3e-text-button-disabled-label-text-opacity - Disabled label opacity, for the text variant.
 * @cssprop --m3e-text-button-hover-icon-color - Hover icon color, for the text variant.
 * @cssprop --m3e-text-button-hover-label-text-color - Hover label color, for the text variant.
 * @cssprop --m3e-text-button-hover-state-layer-color - Hover state layer color, for the text variant.
 * @cssprop --m3e-text-button-hover-state-layer-opacity - Hover state layer opacity, for the text variant.
 * @cssprop --m3e-text-button-hover-unselected-icon-color - Hover unselected icon color, for the text variant.
 * @cssprop --m3e-text-button-hover-unselected-label-text-color - Hover unselected label color, for the text variant.
 * @cssprop --m3e-text-button-hover-unselected-state-layer-color - Hover unselected state layer color, for the text variant.
 * @cssprop --m3e-text-button-hover-selected-icon-color - Hover selected icon color, for the text variant.
 * @cssprop --m3e-text-button-hover-selected-label-text-color - Hover selected label color, for the text variant.
 * @cssprop --m3e-text-button-hover-selected-state-layer-color - Hover selected state layer color, for the text variant.
 * @cssprop --m3e-text-button-focus-icon-color - Focus icon color, for the text variant.
 * @cssprop --m3e-text-button-focus-label-text-color - Focus label color, for the text variant.
 * @cssprop --m3e-text-button-focus-state-layer-color - Focus state layer color, for the text variant.
 * @cssprop --m3e-text-button-focus-state-layer-opacity - Focus state layer opacity, for the text variant.
 * @cssprop --m3e-text-button-focus-unselected-icon-color - Focus unselected icon color, for the text variant.
 * @cssprop --m3e-text-button-focus-unselected-label-text-color - Focus unselected label color, for the text variant.
 * @cssprop --m3e-text-button-focus-unselected-state-layer-color - Focus unselected state layer color, for the text variant.
 * @cssprop --m3e-text-button-focus-selected-icon-color - Focus selected icon color, for the text variant.
 * @cssprop --m3e-text-button-focus-selected-label-text-color - Focus selected label color, for the text variant.
 * @cssprop --m3e-text-button-focus-selected-state-layer-color - Focus selected state layer color, for the text variant.
 * @cssprop --m3e-text-button-pressed-icon-color - Pressed icon color, for the text variant.
 * @cssprop --m3e-text-button-pressed-label-text-color - Pressed label color, for the text variant.
 * @cssprop --m3e-text-button-pressed-state-layer-color - Pressed state layer color, for the text variant.
 * @cssprop --m3e-text-button-pressed-state-layer-opacity - Pressed state layer opacity, for the text variant.
 * @cssprop --m3e-text-button-pressed-unselected-icon-color - Pressed unselected icon color, for the text variant.
 * @cssprop --m3e-text-button-pressed-unselected-label-text-color - Pressed unselected label color, for the text variant.
 * @cssprop --m3e-text-button-pressed-unselected-state-layer-color - Pressed unselected state layer color, for the text variant.
 * @cssprop --m3e-text-button-pressed-selected-icon-color - Pressed selected icon color, for the text variant.
 * @cssprop --m3e-text-button-pressed-selected-label-text-color - Pressed selected label color, for the text variant.
 * @cssprop --m3e-text-button-pressed-selected-state-layer-color - Pressed selected state layer color, for the text variant.
 */
let M3eButtonElement = class M3eButtonElement extends KeyboardClick(LinkButton(FormSubmitter(Focusable(DisabledInteractive(Disabled(AttachInternals(Role(LitElement, "button"), true))))))) {
  constructor() {
    super();
    _M3eButtonElement_instances.add(this);
    /** @internal */
    this._adjacentPressedTimeout = -1;
    /** @private */
    _M3eButtonElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_handleClick).call(this, e));
    /**
     * The appearance variant of the button.
     * @default "text"
     */
    this.variant = "text";
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
            __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_updateButtonShape).call(this);
            __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_handlePressedChange).call(this, true);
          } else {
            __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_handlePressedChange).call(this, false);
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
    return html`<div class="base"><m3e-elevation class="elevation" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-elevation><m3e-state-layer class="state-layer" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled || this.disabledInteractive}"></m3e-ripple><div class="touch" aria-hidden="true"></div>${this[renderPseudoLink]()}<div class="wrapper">${this.toggle ? html`<slot class="icon" name="selected-icon" aria-hidden="true" @slotchange="${__classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_handleSelectedIconSlotChange)}"></slot>` : nothing}<slot class="icon" name="icon" aria-hidden="true"></slot><div class="label">${this.toggle && this.selected ? html`<slot name="selected"><slot></slot></slot>` : html`<slot></slot>`}</div><slot class="icon" name="trailing-icon" aria-hidden="true"></slot></div></div>`;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eButtonElement_clickHandler, "f"));
    __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_applyShape).call(this);
    __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_applySize).call(this);
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
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eButtonElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_applyVariant).call(this);
    }
    if (_changedProperties.has("shape")) {
      __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_applyShape).call(this);
    }
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_applySize).call(this);
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
        __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_updateButtonShape).call(this, true);
      } else {
        // Hidden (display:none): drop the lock so natural size restores on re-show.
        this.style.removeProperty("--_button-width");
      }
    }
  }
};
_M3eButtonElement_clickHandler = new WeakMap();
_M3eButtonElement_instances = new WeakSet();
_M3eButtonElement_applyVariant = function _M3eButtonElement_applyVariant() {
  if (!isButtonVariant(this.variant)) {
    this.variant = "text";
  }
  setCustomEnumState(this, this.variant, "elevated", "filled", "outlined", "text", "tonal");
};
_M3eButtonElement_applyShape = function _M3eButtonElement_applyShape() {
  if (!isButtonShape(this.shape)) {
    this.shape = "rounded";
  }
  setCustomEnumState(this, this.shape, "rounded", "square");
};
_M3eButtonElement_applySize = function _M3eButtonElement_applySize() {
  if (!isButtonSize(this.size)) {
    this.size = "small";
  }
  setCustomEnumState(this, this.size, "extra-large", "extra-small", "large", "medium", "small");
};
_M3eButtonElement_handleClick = function _M3eButtonElement_handleClick(e) {
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
_M3eButtonElement_handleSelectedIconSlotChange = function _M3eButtonElement_handleSelectedIconSlotChange(e) {
  this._base?.classList.toggle("with-selected-icon", hasAssignedNodes(e.target));
};
_M3eButtonElement_updateButtonShape = function _M3eButtonElement_updateButtonShape(force = false) {
  if (!this._base) return;
  const shape = parseFloat(getComputedStyle(this._base).borderRadius);
  if (!isNaN(shape) || force) {
    const adjustedShape = this.clientHeight / 2;
    if (adjustedShape < shape || force) {
      this._base?.style.setProperty("--_button-shape", `${adjustedShape}px`);
    }
  }
};
_M3eButtonElement_handlePressedChange = function _M3eButtonElement_handlePressedChange(pressed) {
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
      adjacentShrink = Math.min(adjacentShrink, ...adjacent.map(x => __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_compressionLimit).call(this, x)));
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
                __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_cleanupAdjacentPressed).call(this, buttons);
              }
            }, 600);
          }
        }, {
          once: true
        });
      } else {
        __classPrivateFieldGet(this, _M3eButtonElement_instances, "m", _M3eButtonElement_cleanupAdjacentPressed).call(this, buttons);
      }
    }
  }
  setCustomState(this, "--pressed", pressed);
  setCustomState(this, "--resting", !pressed);
};
_M3eButtonElement_cleanupAdjacentPressed = function _M3eButtonElement_cleanupAdjacentPressed(buttons) {
  for (const button of buttons) {
    deleteCustomState(button, "--adjacent-pressed");
    deleteCustomState(button, "--no-resize");
    button.style.removeProperty("--_adjacent-shrink");
    button.style.removeProperty("--_pressed-growth");
  }
};
_M3eButtonElement_compressionLimit = function _M3eButtonElement_compressionLimit(button) {
  // The end padding at rest: the current padding plus what an ongoing shrink has taken from it.
  const wrapper = button.shadowRoot?.querySelector(".wrapper");
  if (!wrapper) return Infinity;
  const shrink = parseFloat(button.style.getPropertyValue("--_adjacent-shrink")) || 0;
  return parseFloat(getComputedStyle(wrapper).paddingInlineEnd) + shrink / 2;
};
/** The styles of the element. */
M3eButtonElement.styles = [ButtonSizeStyle, ButtonVariantStyle, ButtonStyle];
__decorate([query(".base")], M3eButtonElement.prototype, "_base", void 0);
__decorate([query(".elevation")], M3eButtonElement.prototype, "_elevation", void 0);
__decorate([query(".focus-ring")], M3eButtonElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eButtonElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eButtonElement.prototype, "_ripple", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eButtonElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eButtonElement.prototype, "shape", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eButtonElement.prototype, "size", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eButtonElement.prototype, "toggle", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eButtonElement.prototype, "selected", void 0);
__decorate([debounce(40)], M3eButtonElement.prototype, "_handleResize", null);
M3eButtonElement = __decorate([customElement("m3e-button")], M3eButtonElement);

export { M3eButtonElement, isButtonShape, isButtonSize, isButtonVariant };
//# sourceMappingURL=ButtonElement.js.map
