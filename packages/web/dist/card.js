/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { DesignToken, Disabled, AttachInternals, PressedController, setCustomEnumState, customElement } from './TextOverflowElement.js';
import { DisabledInteractive } from './DisabledInteractive.js';
import { Focusable } from './Focusable.js';
import { FormSubmitter } from './FormSubmitter.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { KeyboardClick } from './KeyboardClick.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is a `CardVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CardVariant`.
 */
function isCardVariant(value) {
  return value === "elevated" || value === "filled" || value === "outlined";
}

/**
 * Component design tokens for `M3eCardElement`.
 * @internal
 */
const CardToken = {
  padding: unsafeCSS(`var(--m3e-card-padding, ${DesignToken.measurement.space200})`),
  shape: unsafeCSS(`var(--m3e-card-shape, ${DesignToken.shape.corner.medium});`)
};

/**
 * Component design tokens that control the appearance variants of `M3eCardElement`.
 * @internal
 */
const CardVariantToken = {
  filled: {
    textColor: unsafeCSS(`var(--m3e-filled-card-text-color, var(--m3e-card-text-color, ${DesignToken.color.onSurface}))`),
    containerColor: unsafeCSS(`var(--m3e-filled-card-container-color, var(--m3e-card-container-color, ${DesignToken.color.surfaceContainerHighest}))`),
    containerElevation: unsafeCSS(`var(--m3e-filled-card-container-elevation, var(--m3e-card-container-elevation, ${DesignToken.elevation.level0}))`),
    disabled: {
      textColor: unsafeCSS(`var(--m3e-filled-card-disabled-text-color, var(--m3e-card-disabled-text-color, ${DesignToken.color.onSurface}))`),
      textOpacity: unsafeCSS(`var(--m3e-filled-card-disabled-text-opacity, var(--m3e-card-disabled-text-opacity, 38%))`),
      imageOpacity: unsafeCSS(`var(--m3e-filled-card-disabled-image-opacity, var(--m3e-card-disabled-image-opacity, 38%))`),
      containerColor: unsafeCSS(`var(--m3e-filled-card-disabled-container-color, var(--m3e-card-disabled-container-color, ${DesignToken.color.surfaceVariant}))`),
      containerElevation: unsafeCSS(`var(--m3e-filled-card-disabled-container-elevation, var(--m3e-card-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      containerElevationColor: unsafeCSS(`var(--m3e-filled-card-disabled-container-elevation-color, var(--m3e-card-disabled-container-elevation-color, ${DesignToken.color.onSurface}))`),
      containerElevationOpacity: unsafeCSS(`var(--m3e-filled-card-disabled-container-elevation-opacity, var(--m3e-card-disabled-container-elevation-opacity, 38%))`),
      containerOpacity: unsafeCSS(`var(--m3e-filled-card-disabled-container-opacity, var(--m3e-card-disabled-container-opacity, 38%))`)
    },
    hover: {
      textColor: unsafeCSS(`var(--m3e-filled-card-hover-text-color, var(--m3e-card-hover-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-filled-card-hover-state-layer-color, var(--m3e-card-hover-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-card-hover-state-layer-opacity, var(--m3e-card-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-filled-card-hover-container-elevation, var(--m3e-card-hover-container-elevation, ${DesignToken.elevation.level1}))`)
    },
    focus: {
      textColor: unsafeCSS(`var(--m3e-filled-card-focus-text-color, var(--m3e-card-focus-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-filled-card-focus-state-layer-color, var(--m3e-card-focus-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-card-focus-state-layer-opacity, var(--m3e-card-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-filled-card-focus-container-elevation, var(--m3e-card-focus-container-elevation, ${DesignToken.elevation.level0}))`)
    },
    pressed: {
      textColor: unsafeCSS(`var(--m3e-filled-card-pressed-text-color, var(--m3e-card-pressed-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-filled-card-pressed-state-layer-color, var(--m3e-card-pressed-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-filled-card-pressed-state-layer-opacity, var(--m3e-card-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-filled-card-pressed-container-elevation, var(--m3e-card-pressed-container-elevation, ${DesignToken.elevation.level0}))`)
    }
  },
  elevated: {
    textColor: unsafeCSS(`var(--m3e-elevated-card-text-color, var(--m3e-card-text-color, ${DesignToken.color.onSurface}))`),
    containerColor: unsafeCSS(`var(--m3e-elevated-card-container-color, var(--m3e-card-container-color, ${DesignToken.color.surfaceContainerLow}))`),
    containerElevation: unsafeCSS(`var(--m3e-elevated-card-container-elevation, var(--m3e-card-container-elevation, ${DesignToken.elevation.level1}))`),
    disabled: {
      textColor: unsafeCSS(`var(--m3e-elevated-card-disabled-text-color, var(--m3e-card-disabled-text-color, ${DesignToken.color.onSurface}))`),
      textOpacity: unsafeCSS(`var(--m3e-elevated-card-disabled-text-opacity, var(--m3e-card-disabled-text-opacity, 38%))`),
      imageOpacity: unsafeCSS(`var(--m3e-elevated-card-disabled-image-opacity, var(--m3e-card-disabled-image-opacity, 38%))`),
      containerColor: unsafeCSS(`var(--m3e-elevated-card-disabled-container-color, var(--m3e-card-disabled-container-color, ${DesignToken.color.surface}))`),
      containerElevation: unsafeCSS(`var(--m3e-elevated-card-disabled-container-elevation, var(--m3e-card-disabled-container-elevation, ${DesignToken.elevation.level1}))`),
      containerElevationColor: unsafeCSS(`var(--m3e-elevated-card-disabled-container-elevation-color, var(--m3e-card-disabled-container-elevation-color, ${DesignToken.color.onSurface}))`),
      containerElevationOpacity: unsafeCSS(`var(--m3e-elevated-card-disabled-container-elevation-opacity, var(--m3e-card-disabled-container-elevation-opacity, 38%))`),
      containerOpacity: unsafeCSS(`var(--m3e-elevated-card-disabled-container-opacity, var(--m3e-card-disabled-container-opacity, 38%))`)
    },
    hover: {
      textColor: unsafeCSS(`var(--m3e-elevated-card-hover-text-color, var(--m3e-card-hover-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-card-hover-state-layer-color, var(--m3e-card-hover-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-card-hover-state-layer-opacity, var(--m3e-card-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-elevated-card-hover-container-elevation, var(--m3e-card-hover-container-elevation, ${DesignToken.elevation.level2}))`)
    },
    focus: {
      textColor: unsafeCSS(`var(--m3e-elevated-card-focus-text-color, var(--m3e-card-focus-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-card-focus-state-layer-color, var(--m3e-card-focus-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-card-focus-state-layer-opacity, var(--m3e-card-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-elevated-card-focus-container-elevation, var(--m3e-card-focus-container-elevation, ${DesignToken.elevation.level1}))`)
    },
    pressed: {
      textColor: unsafeCSS(`var(--m3e-elevated-card-pressed-text-color, var(--m3e-card-pressed-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-elevated-card-pressed-state-layer-color, var(--m3e-card-pressed-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-elevated-card-pressed-state-layer-opacity, var(--m3e-card-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-elevated-card-pressed-container-elevation, var(--m3e-card-pressed-container-elevation, ${DesignToken.elevation.level1}))`)
    }
  },
  outlined: {
    textColor: unsafeCSS(`var(--m3e-outlined-card-text-color, var(--m3e-card-text-color, ${DesignToken.color.onSurface}))`),
    containerColor: unsafeCSS(`var(--m3e-outlined-card-container-color, var(--m3e-card-container-color, ${DesignToken.color.surface}))`),
    containerElevation: unsafeCSS(`var(--m3e-outlined-card-container-elevation, var(--m3e-card-container-elevation, ${DesignToken.elevation.level0}))`),
    outlineColor: unsafeCSS(`var(--m3e-outlined-card-outline-color, var(--m3e-card-outline-color, ${DesignToken.color.outlineVariant}))`),
    outlineThickness: unsafeCSS("var(--m3e-outlined-card-outline-thickness, var(--m3e-card-outline-thickness, 1px))"),
    disabled: {
      textColor: unsafeCSS(`var(--m3e-outlined-card-disabled-text-color, var(--m3e-card-disabled-text-color, ${DesignToken.color.onSurface}))`),
      textOpacity: unsafeCSS(`var(--m3e-outlined-card-disabled-text-opacity, var(--m3e-card-disabled-text-opacity, 38%))`),
      imageOpacity: unsafeCSS(`var(--m3e-outlined-card-disabled-image-opacity, var(--m3e-card-disabled-image-opacity, 38%))`),
      containerElevation: unsafeCSS(`var(--m3e-outlined-card-disabled-container-elevation, var(--m3e-card-disabled-container-elevation, ${DesignToken.elevation.level0}))`),
      containerElevationColor: unsafeCSS(`var(--m3e-outlined-card-disabled-container-elevation-color, var(--m3e-card-disabled-container-elevation-color, ${DesignToken.color.onSurface}))`),
      containerElevationOpacity: unsafeCSS(`var(--m3e-outlined-card-disabled-container-elevation-opacity, var(--m3e-card-disabled-container-elevation-opacity, 38%))`),
      outlineColor: unsafeCSS(`var(--m3e-outlined-card-disabled-outline-color, var(--m3e-card-disabled-outline-color, ${DesignToken.color.outline}))`),
      outlineOpacity: unsafeCSS(`var(--m3e-outlined-card-disabled-outline-opacity, var(--m3e-card-disabled-outline-opacity, 12%))`)
    },
    hover: {
      textColor: unsafeCSS(`var(--m3e-outlined-card-hover-text-color, var(--m3e-card-hover-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-card-hover-state-layer-color, var(--m3e-card-hover-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-card-hover-state-layer-opacity, var(--m3e-card-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-outlined-card-hover-container-elevation, var(--m3e-card-hover-container-elevation, ${DesignToken.elevation.level1}))`),
      outlineColor: unsafeCSS(`var(--m3e-outlined-card-hover-outline-color, var(--m3e-card-hover-outline-color, ${DesignToken.color.outlineVariant}))`)
    },
    focus: {
      textColor: unsafeCSS(`var(--m3e-outlined-card-focus-text-color, var(--m3e-card-focus-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-card-focus-state-layer-color, var(--m3e-card-focus-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-card-focus-state-layer-opacity, var(--m3e-card-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-outlined-card-focus-container-elevation, var(--m3e-card-focus-container-elevation, ${DesignToken.elevation.level0}))`),
      outlineColor: unsafeCSS(`var(--m3e-outlined-card-focus-outline-color, var(--m3e-card-focus-outline-color, ${DesignToken.color.onSurface}))`)
    },
    pressed: {
      textColor: unsafeCSS(`var(--m3e-outlined-card-pressed-text-color, var(--m3e-card-pressed-text-color, ${DesignToken.color.onSurface}))`),
      stateLayerColor: unsafeCSS(`var(--m3e-outlined-card-pressed-state-layer-color, var(--m3e-card-pressed-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-outlined-card-pressed-state-layer-opacity, var(--m3e-card-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      containerElevation: unsafeCSS(`var(--m3e-outlined-card-pressed-container-elevation, var(--m3e-card-pressed-container-elevation, ${DesignToken.elevation.level0}))`),
      outlineColor: unsafeCSS(`var(--m3e-outlined-card-pressed-outline-color, var(--m3e-card-pressed-outline-color, ${DesignToken.color.outlineVariant}))`)
    }
  }
};

/**
 * Baseline styles for `M3eCardElement`.
 * @internal
 */
const CardStyle = css`:host { outline: none; } :host([hidden]) { display: none; } :host(:not([inline])) { display: block; } :host(:not([inline])) .base { display: flex; } :host([inline]) { display: inline-block; vertical-align: middle; } :host([inline]) .base { display: inline-flex; } .base { width: 100%; height: 100%; position: relative; box-sizing: border-box; border-radius: ${CardToken.shape}; } :host([actionable]) .base { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
      border-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host([actionable]) { user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([actionable]:not(:disabled):not([disabled-interactive])) { cursor: pointer; } :host([actionable][disabled-interactive]) { cursor: not-allowed; } :host(:not([actionable])) .focus-ring, :host(:not([actionable])) .state-layer, :host(:not([actionable])) .ripple { display: none; } :host(:is(:state(--outlined), :--outlined)) .base { border-style: solid; } ::slotted([slot="content"]) { flex: 1 1 auto; } ::slotted(img), ::slotted(video) { inset: 0; object-fit: cover; } ::slotted(img[slot="header"]), ::slotted(video[slot="header"]) { border-radius: ${CardToken.shape}; } ::slotted([slot="actions"][end]) { justify-content: flex-end; } ::slotted([slot="header"]), ::slotted([slot="actions"]), ::slotted([slot="footer"]) { flex: none; display: flex; align-items: center; } :host(:is(:state(--vertical), :--vertical)) .base, :host(:is(:state(--horizontal), :--horizontal)) ::slotted([slot="header"]), :host(:is(:state(--horizontal), :--horizontal)) ::slotted([slot="actions"]), :host(:is(:state(--horizontal), :--horizontal)) ::slotted([slot="footer"]) { flex-direction: column; } :host(:is(:state(--horizontal), :--horizontal)) .base, :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="header"]), :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="actions"]), :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="footer"]) { flex-direction: row; } :host(:is(:state(--horizontal), :--horizontal)) ::slotted(img), :host(:is(:state(--horizontal), :--horizontal)) ::slotted(video) { aspect-ratio: 16 / 9; } .has-content:not(.has-default) slot[name="content"], .has-content.has-default slot:not([name]) { display: inherit; flex-direction: inherit; flex: 1 1 auto; } .has-header slot[name="header"], .has-actions slot[name="actions"], .has-footer slot[name="footer"] { display: inherit; flex-direction: inherit; flex: none; } :host(:is(:state(--vertical), :--vertical)) .has-content:not(.has-default) slot[name="content"] { margin-inline: ${CardToken.padding}; } :host(:is(:state(--vertical), :--vertical)) .has-content:not(.has-default):not(.has-header) slot[name="content"] { margin-block-start: ${CardToken.padding}; } :host(:is(:state(--vertical), :--vertical)) .has-content:not(.has-default):not(.has-actions):not(.has-footer) slot[name="content"] { margin-block-end: ${CardToken.padding}; } :host(:is(:state(--horizontal), :--horizontal)) .has-content:not(.has-default) slot[name="content"] { margin-block: ${CardToken.padding}; } :host(:is(:state(--horizontal), :--horizontal)) .has-content:not(.has-default):not(.has-header) slot[name="content"] { margin-inline-start: ${CardToken.padding}; } :host(:is(:state(--horizontal), :--horizontal)) .has-content:not(.has-default):not(.has-actions):not(.has-footer) slot[name="content"] { margin-inline-end: ${CardToken.padding}; } :host(:is(:state(--vertical), :--vertical)) .has-header:not(.has-header-media) slot[name="header"] { margin-inline: ${CardToken.padding}; margin-block-start: ${CardToken.padding}; } :host(:is(:state(--horizontal), :--horizontal)) .has-header:not(.has-header-media) slot[name="header"] { margin-inline-start: ${CardToken.padding}; margin-block: ${CardToken.padding}; } .has-actions slot[name="actions"] { margin-inline: ${CardToken.padding}; margin-block: ${CardToken.padding}; } :host(:is(:state(--vertical), :--vertical)) .has-footer slot[name="footer"] { margin-inline: ${CardToken.padding}; margin-block-end: ${CardToken.padding}; } :host(:is(:state(--horizontal), :--horizontal)) .has-footer slot[name="footer"] { margin-block: ${CardToken.padding}; margin-inline-end: ${CardToken.padding}; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } @media (forced-colors: active) { :host([actionable]) .base { transition: none; } .base { border-style: solid !important; border-color: CanvasText !important; border-width: ${CardVariantToken.outlined.outlineThickness ?? unsafeCSS("unset")} !important; } :host([actionable]:disabled) .base, :host([actionable][disabled-interactive]) .base { color: GrayText !important; border-color: GrayText !important; } } @media (prefers-reduced-motion) { :host([actionable]) .base { transition: none; } }`;

/** @private */
function cardVariantStyle(variant) {
  const selector = unsafeCSS(`:is(:state(--${variant}), :--${variant})`);
  return css`:host(${selector}) .base { background-color: ${CardVariantToken[variant].containerColor ?? unsafeCSS("unset")}; box-shadow: ${CardVariantToken[variant].containerElevation ?? unsafeCSS("unset")}; border-width: ${CardVariantToken[variant].outlineThickness ?? unsafeCSS("unset")}; } :host([actionable]${selector}) .base { --m3e-state-layer-hover-color: ${CardVariantToken[variant].hover.stateLayerColor}; --m3e-state-layer-hover-opacity: ${CardVariantToken[variant].hover.stateLayerOpacity}; --m3e-state-layer-focus-color: ${CardVariantToken[variant].focus.stateLayerColor}; --m3e-state-layer-focus-opacity: ${CardVariantToken[variant].focus.stateLayerOpacity}; --m3e-ripple-color: ${CardVariantToken[variant].pressed.stateLayerColor}; --m3e-ripple-opacity: ${CardVariantToken[variant].pressed.stateLayerOpacity}; --m3e-elevation-level: ${CardVariantToken[variant].containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-hover-level: ${CardVariantToken[variant].hover.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-focus-level: ${CardVariantToken[variant].focus.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-pressed-level: ${CardVariantToken[variant].pressed.containerElevation ?? unsafeCSS("unset")}; } :host(${selector}) .base { border-color: ${CardVariantToken[variant].outlineColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}:focus .base) { border-color: ${CardVariantToken[variant].focus.outlineColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}:hover .base) { border-color: ${CardVariantToken[variant].hover.outlineColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}) .base.pressed { border-color: ${CardVariantToken[variant].pressed.outlineColor ?? unsafeCSS("unset")}; } :host(${selector}) .base { color: ${CardVariantToken[variant].textColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}:focus) .base { color: ${CardVariantToken[variant].focus.textColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}:hover) .base { color: ${CardVariantToken[variant].hover.textColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}) .base.pressed { color: ${CardVariantToken[variant].pressed.textColor ?? unsafeCSS("unset")}; } :host([actionable]${selector}:disabled) .base, :host([actionable]${selector}[disabled-interactive]) .base { --m3e-elevation-level: ${CardVariantToken[variant].disabled.containerElevation ?? unsafeCSS("unset")}; --m3e-elevation-color: color-mix( in srgb, ${CardVariantToken[variant].disabled.containerElevationColor} ${CardVariantToken[variant].disabled.containerElevationOpacity}, transparent ); color: color-mix( in srgb, ${CardVariantToken[variant].disabled.textColor} ${CardVariantToken[variant].disabled.textOpacity}, transparent ); background-color: ${CardVariantToken[variant].disabled.containerColor && CardVariantToken[variant].disabled.containerOpacity ? unsafeCSS(`color-mix(
        in srgb,
        ${CardVariantToken[variant].disabled.containerColor} ${CardVariantToken[variant].disabled.containerOpacity},
        transparent
      )`) : unsafeCSS("unset")}; border-color: ${CardVariantToken[variant].disabled.outlineColor && CardVariantToken[variant].disabled.outlineOpacity ? unsafeCSS(`color-mix(
        in srgb,
        ${CardVariantToken[variant].disabled.outlineColor} ${CardVariantToken[variant].disabled.outlineOpacity},
        transparent
      )`) : unsafeCSS("unset")}; } :host([actionable]${selector}:disabled) ::slotted(img), :host([actionable]${selector}[disabled-interactive]) ::slotted(img), :host([actionable]${selector}:disabled) ::slotted(video), :host([actionable]${selector}[disabled-interactive]) ::slotted(video) { opacity: ${CardVariantToken[variant].disabled.imageOpacity}; }`;
}
/**
 * Appearance variant styles for `M3eCardElement`.
 * @internal
 */
const CardVariantStyle = [cardVariantStyle("filled"), cardVariantStyle("elevated"), cardVariantStyle("outlined")];

/**
 * Determines whether a value is a `CardOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CardOrientation`.
 */
function isCardOrientation(value) {
  return value === "horizontal" || value === "vertical";
}

var _M3eCardElement_instances, _M3eCardElement_clickHandler, _M3eCardElement_applyVariant, _M3eCardElement_applyOrientation, _M3eCardElement_handleHeaderSlotChange, _M3eCardElement_handleContentSlotChange, _M3eCardElement_handleDefaultSlotChange, _M3eCardElement_handleActionsSlotChange, _M3eCardElement_handleFooterSlotChange, _M3eCardElement_handleClick;
/**
 * A content container for text, images (or other media), and actions in the context of a single subject.
 *
 * @description
 * The `m3e-card` component is a flexible, expressive container for presenting a unified subject—text,
 * media, and actions—on a visually distinct surface. It supports multiple appearance variants via the
 * `variant` attribute: `filled` (default, for solid emphasis), `outlined` (for subtle framing with a border),
 * and `elevated` (for depth and motion with shadow elevation).
 *
 * Cards can be made actionable, responding to user interaction when the `actionable` attribute is set, and can be
 * presented inline with surrounding content using the `inline` attribute.
 *
 * It supports both vertical and horizontal layouts through the `orientation` attribute. Content organization is
 * enabled via dedicated slots for `header`, `content`, `actions`, and `footer`, or developers can use the default
 * slot for custom layouts.
 *
 * The component provides dynamic elevation, adaptive shape, and expressive color theming, and responds to interaction states
 * (hover, focus, press, disabled) with smooth motion and visual feedback, ensuring clarity, accessibility,
 * and a cohesive user experience in accordance with Material Design 3 guidelines.
 *
 * @example
 * The following example illustrates each of the dedicated slots of a card.
 * ```html
 * <m3e-card>
 *  <div slot="header">Header section</div>
 *  <div slot="content">Content section</div>
 *  <div slot="actions">Actions section</div>
 *  <div slot="footer">Footer section</div>
 * </m3e-card>
 * ```
 *
 * @tag m3e-card
 *
 * @slot - Renders the content of the card without padding.
 * @slot header - Renders the header of the card.
 * @slot content - Renders the content of the card with padding.
 * @slot actions - Renders the actions of the card.
 * @slot footer - Renders the footer of the card.
 *
 * @attr actionable - Whether the card is "actionable" and will respond to use interaction.
 * @attr inline - Whether to present the card inline with surrounding content.
 * @attr orientation - The orientation of the card.
 * @attr variant - The appearance variant of the card.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-card-padding - Internal spacing for all slotted regions
 * @cssprop --m3e-card-shape - Corner radius of the card container.
 * @cssprop --m3e-filled-card-text-color - Foreground color for text content in filled cards.
 * @cssprop --m3e-filled-card-container-color - Background color of the filled card container.
 * @cssprop --m3e-filled-card-container-elevation - Elevation level for filled card container.
 * @cssprop --m3e-filled-card-disabled-text-color - Text color when filled card is disabled.
 * @cssprop --m3e-filled-card-disabled-text-opacity - Opacity applied to text when disabled.
 * @cssprop --m3e-filled-card-disabled-container-color - Background color when disabled.
 * @cssprop --m3e-filled-card-disabled-container-elevation - Elevation level when disabled.
 * @cssprop --m3e-filled-card-disabled-container-elevation-color - Shadow color when disabled.
 * @cssprop --m3e-filled-card-disabled-container-elevation-opacity - Shadow opacity when disabled.
 * @cssprop --m3e-filled-card-disabled-container-opacity - Overall container opacity when disabled.
 * @cssprop --m3e-filled-card-hover-text-color - Text color on hover.
 * @cssprop --m3e-filled-card-hover-state-layer-color - State layer color on hover.
 * @cssprop --m3e-filled-card-hover-state-layer-opacity - State layer opacity on hover.
 * @cssprop --m3e-filled-card-hover-container-elevation - Elevation level on hover.
 * @cssprop --m3e-filled-card-focus-text-color - Text color on focus.
 * @cssprop --m3e-filled-card-focus-state-layer-color - State layer color on focus.
 * @cssprop --m3e-filled-card-focus-state-layer-opacity - State layer opacity on focus.
 * @cssprop --m3e-filled-card-focus-container-elevation - Elevation level on focus.
 * @cssprop --m3e-filled-card-pressed-text-color - Text color on press.
 * @cssprop --m3e-filled-card-pressed-state-layer-color - State layer color on press.
 * @cssprop --m3e-filled-card-pressed-state-layer-opacity - State layer opacity on press.
 * @cssprop --m3e-filled-card-pressed-container-elevation - Elevation level on press.
 * @cssprop --m3e-elevated-card-text-color - Foreground color for text content in elevated cards.
 * @cssprop --m3e-elevated-card-container-color - Background color of the elevated card container.
 * @cssprop --m3e-elevated-card-container-elevation - Elevation level for elevated card container.
 * @cssprop --m3e-elevated-card-disabled-text-color - Text color when elevated card is disabled.
 * @cssprop --m3e-elevated-card-disabled-text-opacity - Opacity applied to text when disabled.
 * @cssprop --m3e-elevated-card-disabled-container-color - Background color when disabled.
 * @cssprop --m3e-elevated-card-disabled-container-elevation - Elevation level when disabled.
 * @cssprop --m3e-elevated-card-disabled-container-elevation-color - Shadow color when disabled.
 * @cssprop --m3e-elevated-card-disabled-container-elevation-opacity - Shadow opacity when disabled.
 * @cssprop --m3e-elevated-card-disabled-container-opacity - Overall container opacity when disabled.
 * @cssprop --m3e-elevated-card-hover-text-color - Text color on hover.
 * @cssprop --m3e-elevated-card-hover-state-layer-color - State layer color on hover.
 * @cssprop --m3e-elevated-card-hover-state-layer-opacity - State layer opacity on hover.
 * @cssprop --m3e-elevated-card-hover-container-elevation - Elevation level on hover.
 * @cssprop --m3e-elevated-card-focus-text-color - Text color on focus.
 * @cssprop --m3e-elevated-card-focus-state-layer-color - State layer color on focus.
 * @cssprop --m3e-elevated-card-focus-state-layer-opacity - State layer opacity on focus.
 * @cssprop --m3e-elevated-card-focus-container-elevation - Elevation level on focus.
 * @cssprop --m3e-elevated-card-pressed-text-color - Text color on press.
 * @cssprop --m3e-elevated-card-pressed-state-layer-color - State layer color on press.
 * @cssprop --m3e-elevated-card-pressed-state-layer-opacity - State layer opacity on press.
 * @cssprop --m3e-elevated-card-pressed-container-elevation - Elevation level on press.
 * @cssprop --m3e-outlined-card-text-color - Foreground color for text content in outlined cards.
 * @cssprop --m3e-outlined-card-container-color - Background color of the outlined card container.
 * @cssprop --m3e-outlined-card-container-elevation - Elevation level for outlined card container.
 * @cssprop --m3e-outlined-card-outline-color - Border color for outlined cards.
 * @cssprop --m3e-outlined-card-outline-thickness - Border thickness for outlined cards.
 * @cssprop --m3e-outlined-card-disabled-text-color - Text color when outlined card is disabled.
 * @cssprop --m3e-outlined-card-disabled-text-opacity - Opacity applied to text when disabled.
 * @cssprop --m3e-outlined-card-disabled-container-elevation - Elevation level when disabled.
 * @cssprop --m3e-outlined-card-disabled-container-elevation-color - Shadow color when disabled.
 * @cssprop --m3e-outlined-card-disabled-container-elevation-opacity - Shadow opacity when disabled.
 * @cssprop --m3e-outlined-card-disabled-outline-color - Border color when disabled.
 * @cssprop --m3e-outlined-card-disabled-outline-opacity - Border opacity when disabled.
 * @cssprop --m3e-outlined-card-hover-text-color - Text color on hover.
 * @cssprop --m3e-outlined-card-hover-state-layer-color - State layer color on hover.
 * @cssprop --m3e-outlined-card-hover-state-layer-opacity - State layer opacity on hover.
 * @cssprop --m3e-outlined-card-hover-container-elevation - Elevation level on hover.
 * @cssprop --m3e-outlined-card-hover-outline-color - Border color on hover.
 * @cssprop --m3e-outlined-card-focus-text-color - Text color on focus.
 * @cssprop --m3e-outlined-card-focus-state-layer-color - State layer color on focus.
 * @cssprop --m3e-outlined-card-focus-state-layer-opacity - State layer opacity on focus.
 * @cssprop --m3e-outlined-card-focus-container-elevation - Elevation level on focus.
 * @cssprop --m3e-outlined-card-focus-outline-color - Border color on focus.
 * @cssprop --m3e-outlined-card-pressed-text-color - Text color on press.
 * @cssprop --m3e-outlined-card-pressed-state-layer-color - State layer color on press.
 * @cssprop --m3e-outlined-card-pressed-state-layer-opacity - State layer opacity on press.
 * @cssprop --m3e-outlined-card-pressed-container-elevation - Elevation level on press.
 * @cssprop --m3e-outlined-card-pressed-outline-color - Border color on press.
 */
let M3eCardElement = class M3eCardElement extends KeyboardClick(LinkButton(FormSubmitter(Focusable(DisabledInteractive(Disabled(AttachInternals(LitElement), true)))))) {
  constructor() {
    super();
    _M3eCardElement_instances.add(this);
    /** @private */
    _M3eCardElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_handleClick).call(this, e));
    /**
     * Whether to present the card inline with surrounding content.
     * @default false
     */
    this.inline = false;
    /**
     * Whether the card is "actionable" and will respond to use interaction.
     * @default false
     */
    this.actionable = false;
    /**
     * The appearance variant of the card.
     * @default "filled"
     */
    this.variant = "filled";
    /**
     * The orientation of the card.
     * @default "vertical"
     */
    this.orientation = "vertical";
    new PressedController(this, {
      isPressedKey: key => key === " ",
      callback: pressed => {
        if (this.actionable && !this.disabled && !this.disabledInteractive) {
          this._base?.classList.toggle("pressed", pressed);
        }
      }
    });
  }
  /** @inheritdoc */
  connectedCallback() {
    if (this.hasAttribute("actionable")) {
      // If href is specified, the LinkButton mixin changes this to "link" if role is "button".
      this.role = "button";
    }
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eCardElement_clickHandler, "f"));
    __classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_applyOrientation).call(this);
    __classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_applyVariant).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._base?.classList.toggle("pressed", false);
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eCardElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_applyVariant).call(this);
    }
    if (_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_applyOrientation).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-elevation class="elevation" ?disabled="${!this.actionable || this.disabled || this.disabledInteractive}"></m3e-elevation><m3e-focus-ring class="focus-ring" ?disabled="${!this.actionable || this.disabled}"></m3e-focus-ring><m3e-state-layer class="state-layer" ?disabled="${!this.actionable || this.disabled || this.disabledInteractive}"></m3e-state-layer><m3e-ripple class="ripple" ?disabled="${!this.actionable || this.disabled || this.disabledInteractive}"></m3e-ripple>${this[renderPseudoLink]()}<slot name="header" @slotchange="${__classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_handleHeaderSlotChange)}"></slot><slot name="content" @slotchange="${__classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_handleContentSlotChange)}"><slot @slotchange="${__classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_handleDefaultSlotChange)}"></slot></slot><slot name="actions" @slotchange="${__classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_handleActionsSlotChange)}"></slot><slot name="footer" @slotchange="${__classPrivateFieldGet(this, _M3eCardElement_instances, "m", _M3eCardElement_handleFooterSlotChange)}"></slot></div>`;
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._elevation, this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
    if (!this.actionable && this.hasAttribute("tabindex")) {
      this.removeAttribute("tabindex");
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (!this.actionable && this.hasAttribute("tabindex")) {
      this.removeAttribute("tabindex");
    }
  }
};
_M3eCardElement_clickHandler = new WeakMap();
_M3eCardElement_instances = new WeakSet();
_M3eCardElement_applyVariant = function _M3eCardElement_applyVariant() {
  if (!isCardVariant(this.variant)) {
    this.variant = "filled";
  }
  setCustomEnumState(this, this.variant, "elevated", "filled", "outlined");
};
_M3eCardElement_applyOrientation = function _M3eCardElement_applyOrientation() {
  if (!isCardOrientation(this.orientation)) {
    this.orientation = "vertical";
  }
  setCustomEnumState(this, this.orientation, "horizontal", "vertical");
};
_M3eCardElement_handleHeaderSlotChange = function _M3eCardElement_handleHeaderSlotChange(e) {
  const assignedNodes = e.target.assignedNodes({
    flatten: true
  });
  const base = this.shadowRoot?.querySelector(".base");
  base?.classList.toggle("has-header", assignedNodes.length > 0);
  base?.classList.toggle("has-header-media", assignedNodes.some(x => x instanceof HTMLElement && (x.tagName === "IMG" || x.tagName === "VIDEO")));
};
_M3eCardElement_handleContentSlotChange = function _M3eCardElement_handleContentSlotChange() {
  this.shadowRoot?.querySelector(".base")?.classList.toggle("has-content", this.querySelector(":scope > [slot='content']") !== null);
};
_M3eCardElement_handleDefaultSlotChange = function _M3eCardElement_handleDefaultSlotChange(e) {
  this.shadowRoot?.querySelector(".base")?.classList.toggle("has-default", hasAssignedNodes(e.target) && this.querySelector(":scope > [slot='content']") === null);
};
_M3eCardElement_handleActionsSlotChange = function _M3eCardElement_handleActionsSlotChange(e) {
  this.shadowRoot?.querySelector(".base")?.classList.toggle("has-actions", hasAssignedNodes(e.target));
};
_M3eCardElement_handleFooterSlotChange = function _M3eCardElement_handleFooterSlotChange(e) {
  this.shadowRoot?.querySelector(".base")?.classList.toggle("has-footer", hasAssignedNodes(e.target));
};
_M3eCardElement_handleClick = function _M3eCardElement_handleClick(e) {
  if (this.disabled || this.disabledInteractive) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
};
/** The styles of the element. */
M3eCardElement.styles = [CardVariantStyle, CardStyle];
__decorate([query(".base")], M3eCardElement.prototype, "_base", void 0);
__decorate([query(".elevation")], M3eCardElement.prototype, "_elevation", void 0);
__decorate([query(".focus-ring")], M3eCardElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eCardElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eCardElement.prototype, "_ripple", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eCardElement.prototype, "inline", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eCardElement.prototype, "actionable", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eCardElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eCardElement.prototype, "orientation", void 0);
M3eCardElement = __decorate([customElement("m3e-card")], M3eCardElement);

export { M3eCardElement, isCardOrientation, isCardVariant };
//# sourceMappingURL=card.js.map
