/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { DesignToken, Checked, Disabled, AttachInternals, Role, HoverController, PressedController, setCustomState, customElement } from './TextOverflowElement.js';
import { ConstraintValidation } from './ConstraintValidation.js';
import { Labelled, Dirty, Touched, FormAssociated, formValue } from './FormAssociated.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';
import 'lit/directives/if-defined.js';
import './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';

/**
 * Component design tokens that control `M3eSwitchElement`.
 * @internal
 */
const SwitchToken = {
  selectedIconColor: unsafeCSS(`var(--m3e-switch-selected-icon-color, ${DesignToken.color.primary})`),
  selectedIconSize: unsafeCSS("var(--m3e-switch-selected-icon-size, 16px)"),
  unselectedIconColor: unsafeCSS(`var(--m3e-switch-unselected-icon-color, ${DesignToken.color.surfaceContainerHighest})`),
  unselectedIconSize: unsafeCSS("var(--m3e-switch-unselected-icon-size, 16px)"),
  trackHeight: unsafeCSS(`calc(var(--m3e-switch-track-height, 32px) + ${DesignToken.density.calc(-3)})`),
  trackWidth: unsafeCSS(`calc(var(--m3e-switch-track-width, 52px) + ${DesignToken.density.calc(-3)})`),
  trackOutlineColor: unsafeCSS(`var(--m3e-switch-track-outline-color, ${DesignToken.color.outline})`),
  trackOutlineWidth: unsafeCSS("var(--m3e-switch-track-outline-width, 2px)"),
  trackShape: unsafeCSS(`var(--m3e-switch-track-shape, ${DesignToken.shape.corner.full})`),
  selectedTrackColor: unsafeCSS(`var(--m3e-switch-selected-track-color, ${DesignToken.color.primary})`),
  unselectedTrackColor: unsafeCSS(`var(--m3e-switch-unselected-track-color, ${DesignToken.color.surfaceContainerHighest})`),
  unselectedHandleHeight: unsafeCSS(`calc(var(--m3e-switch-unselected-handle-height, 16px) + ${DesignToken.density.calc(-3)})`),
  unselectedHandleWidth: unsafeCSS(`calc(var(--m3e-switch-unselected-handle-width, 16px) + ${DesignToken.density.calc(-3)})`),
  withIconHandleHeight: unsafeCSS(`calc(var(--m3e-switch-with-icon-handle-height, 24px) + ${DesignToken.density.calc(-3)})`),
  withIconHandleWidth: unsafeCSS(`calc(var(--m3e-switch-with-icon-handle-width, 24px) + ${DesignToken.density.calc(-3)})`),
  selectedHandleHeight: unsafeCSS(`calc(var(--m3e-switch-selected-handle-height, 24px) + ${DesignToken.density.calc(-3)})`),
  selectedHandleWidth: unsafeCSS(`calc(var(--m3e-switch-selected-handle-width, 24px) + ${DesignToken.density.calc(-3)})`),
  pressedHandleHeight: unsafeCSS(`calc(var(--m3e-switch-pressed-handle-height, 28px) + ${DesignToken.density.calc(-3)})`),
  pressedHandleWidth: unsafeCSS(`calc(var(--m3e-switch-pressed-handle-width, 28px) + ${DesignToken.density.calc(-3)})`),
  handleShape: unsafeCSS(`var(--m3e-switch-handle-shape, ${DesignToken.shape.corner.full})`),
  selectedHandleColor: unsafeCSS(`var(--m3e-switch-selected-handle-color, ${DesignToken.color.onPrimary})`),
  unselectedHandleColor: unsafeCSS(`var(--m3e-switch-unselected-handle-color, ${DesignToken.color.outline})`),
  stateLayerSize: unsafeCSS(`calc(var(--m3e-switch-state-layer-size, 40px) + ${DesignToken.density.calc(-3)})`),
  stateLayerShape: unsafeCSS(`var(--m3e-switch-state-layer-shape, ${DesignToken.shape.corner.full})`),
  disabledSelectedIconColor: unsafeCSS(`var(--m3e-switch-disabled-selected-icon-color, ${DesignToken.color.onSurface})`),
  disabledSelectedIconOpacity: unsafeCSS("var(--m3e-switch-disabled-selected-icon-opacity, 38%)"),
  disabledUnselectedIconColor: unsafeCSS(`var(--m3e-switch-disabled-unselected-icon-color, ${DesignToken.color.surfaceContainerHighest})`),
  disabledUnselectedIconOpacity: unsafeCSS("var(--m3e-switch-disabled-unselected-icon-opacity, 38%)"),
  disabledTrackOpacity: unsafeCSS("var(--m3e-switch-disabled-track-opacity, 12%)"),
  disabledSelectedTrackColor: unsafeCSS(`var(--m3e-switch-disabled-selected-track-color, ${DesignToken.color.onSurface})`),
  disabledUnselectedTrackColor: unsafeCSS(`var(--m3e-switch-disabled-unselected-track-color, ${DesignToken.color.surfaceContainerHighest})`),
  disabledUnselectedTrackOutlineColor: unsafeCSS(`var(--m3e-switch-disabled-unselected-track-outline-color, ${DesignToken.color.onSurface})`),
  disabledUnselectedHandleOpacity: unsafeCSS("var(--m3e-switch-disabled-unselected-handle-opacity, 38%)"),
  disabledSelectedHandleOpacity: unsafeCSS("var(--m3e-switch-disabled-selected-handle-opacity, 100%)"),
  disabledSelectedHandleColor: unsafeCSS(`var(--m3e-switch-disabled-selected-handle-color, ${DesignToken.color.surface})`),
  disabledUnselectedHandleColor: unsafeCSS(`var(--m3e-switch-disabled-unselected-handle-color, ${DesignToken.color.onSurface})`),
  selectedHoverIconColor: unsafeCSS(`var(--m3e-switch-selected-hover-icon-color, ${DesignToken.color.onPrimaryContainer})`),
  unselectedHoverIconColor: unsafeCSS(`var(--m3e-switch-unselected-hover-icon-color, ${DesignToken.color.surfaceContainerHighest})`),
  selectedHoverTrackColor: unsafeCSS(`var(--m3e-switch-selected-hover-track-color, ${DesignToken.color.primary})`),
  selectedHoverStateLayerColor: unsafeCSS(`var(--m3e-switch-selected-hover-state-layer-color, ${DesignToken.color.primary})`),
  selectedHoverStateLayerOpacity: unsafeCSS("var(--m3e-switch-selected-hover-state-layer-opacity, 8%)"),
  unselectedHoverTrackColor: unsafeCSS(`var(--m3e-switch-unselected-hover-track-color, ${DesignToken.color.surfaceContainerHighest})`),
  unselectedHoverTrackOutlineColor: unsafeCSS(`var(--m3e-switch-unselected-hover-track-outline-color, ${DesignToken.color.outline})`),
  unselectedHoverStateLayerColor: unsafeCSS(`var(--m3e-switch-unselected-hover-state-layer-color, ${DesignToken.color.onSurface})`),
  unselectedHoverStateLayerOpacity: unsafeCSS("var(--m3e-switch-unselected-hover-state-layer-opacity, 8%)"),
  selectedHoverHandleColor: unsafeCSS(`var(--m3e-switch-selected-hover-handle-color, ${DesignToken.color.primaryContainer})`),
  unselectedHoverHandleColor: unsafeCSS(`var(--m3e-switch-unselected-hover-handle-color, ${DesignToken.color.onSurfaceVariant})`),
  selectedFocusIconColor: unsafeCSS(`var(--m3e-switch-selected-focus-icon-color, ${DesignToken.color.onPrimaryContainer})`),
  unselectedFocusIconColor: unsafeCSS(`var(--m3e-switch-unselected-focus-icon-color, ${DesignToken.color.surfaceContainerHighest})`),
  selectedFocusTrackColor: unsafeCSS(`var(--m3e-switch-selected-focus-track-color, ${DesignToken.color.primary})`),
  selectedFocusStateLayerColor: unsafeCSS(`var(--m3e-switch-selected-focus-state-layer-color, ${DesignToken.color.primary})`),
  selectedFocusStateLayerOpacity: unsafeCSS("var(--m3e-switch-selected-focus-state-layer-opacity, 10%)"),
  unselectedFocusTrackColor: unsafeCSS(`var(--m3e-switch-unselected-focus-track-color, ${DesignToken.color.surfaceContainerHighest})`),
  unselectedFocusTrackOutlineColor: unsafeCSS(`var(--m3e-switch-unselected-focus-track-outline-color, ${DesignToken.color.outline})`),
  unselectedFocusStateLayerColor: unsafeCSS(`var(--m3e-switch-unselected-focus-state-layer-color, ${DesignToken.color.onSurface})`),
  unselectedFocusStateLayerOpacity: unsafeCSS("var(--m3e-switch-unselected-focus-state-layer-opacity, 10%)"),
  selectedFocusHandleColor: unsafeCSS(`var(--m3e-switch-selected-focus-handle-color, ${DesignToken.color.primaryContainer})`),
  unselectedFocusHandleColor: unsafeCSS(`var(--m3e-switch-unselected-focus-handle-color, ${DesignToken.color.onSurfaceVariant})`),
  selectedPressedIconColor: unsafeCSS(`var(--m3e-switch-selected-pressed-icon-color, ${DesignToken.color.onPrimaryContainer})`),
  unselectedPressedIconColor: unsafeCSS(`var(--m3e-switch-unselected-pressed-icon-color, ${DesignToken.color.surfaceContainerHighest})`),
  selectedPressedTrackColor: unsafeCSS(`var(--m3e-switch-selected-pressed-track-color, ${DesignToken.color.primary})`),
  selectedPressedStateLayerColor: unsafeCSS(`var(--m3e-switch-selected-pressed-state-layer-color, ${DesignToken.color.primary})`),
  selectedPressedStateLayerOpacity: unsafeCSS("var(--m3e-switch-selected-pressed-state-layer-opacity, 10%)"),
  unselectedPressedTrackColor: unsafeCSS(`var(--m3e-switch-unselected-pressed-track-color, ${DesignToken.color.surfaceContainerHighest})`),
  unselectedPressedTrackOutlineColor: unsafeCSS(`var(--m3e-switch-unselected-pressed-track-outline-color, ${DesignToken.color.outline})`),
  unselectedPressedStateLayerColor: unsafeCSS(`var(--m3e-switch-unselected-pressed-state-layer-color, ${DesignToken.color.onSurface})`),
  unselectedPressedStateLayerOpacity: unsafeCSS("var(--m3e-switch-unselected-pressed-state-layer-opacity, 10%)"),
  selectedPressedHandleColor: unsafeCSS(`var(--m3e-switch-selected-pressed-handle-color, ${DesignToken.color.primaryContainer})`),
  unselectedPressedHandleColor: unsafeCSS(`var(--m3e-switch-unselected-pressed-handle-color, ${DesignToken.color.onSurfaceVariant})`)
};

/**
 * Handle styles for `M3eSwitchElement`.
 * @internal
 */
const SwitchHandleStyle = css`.handle { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; --_switch-handle-inline-start: 0px; --_switch-handle-inline-end: 0px; --_switch-handle-height: ${SwitchToken.selectedHandleHeight}; --_switch-handle-clip-left: var(--_switch-handle-inline-start); --_switch-handle-clip-right: var(--_switch-handle-inline-end); } :host(:is(:state(--rtl), :--rtl)) .handle { --_switch-handle-clip-left: var(--_switch-handle-inline-end); --_switch-handle-clip-right: var(--_switch-handle-inline-start); } .handle::before { content: ""; position: absolute; left: 0; top: 50%; width: calc(100% - var(--_switch-handle-clip-left) - var(--_switch-handle-clip-right)); height: var(--_switch-handle-height); transform: translateX(var(--_switch-handle-clip-left)) translateY(-50%); border-radius: ${SwitchToken.handleShape}; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
      transform var(--_switch-handle-position-effect),
      width var(--_switch-handle-position-effect),
      height ${DesignToken.motion.spring.fastEffects}`)}; } :host(:not([checked])) .track:not(.pressed) .handle, :host([checked]) .track:not(.pressed) .handle { --_switch-handle-position-effect: ${DesignToken.motion.spring.fastSpatial}; } .track.pressed .handle { --_switch-handle-position-effect: ${DesignToken.motion.spring.fastEffects}; } .handle .base { transform: translateX(calc((var(--_switch-handle-clip-left) - var(--_switch-handle-clip-right)) / 2)); transition: transform var(--_switch-handle-position-effect); } :host(:not([aria-disabled="true"]):not([checked]):is(:state(--icons-both), :--icons-both)) .track:not(.pressed) .handle { --_switch-handle-inline-start: ${SwitchToken.trackOutlineWidth}; --_switch-handle-inline-end: calc( ${SwitchToken.trackWidth} - calc(${SwitchToken.trackOutlineWidth} * 3) - ${SwitchToken.withIconHandleWidth} ); --_switch-handle-height: ${SwitchToken.withIconHandleHeight}; } :host(:not([checked]):not(:is(:state(--icons-both), :--icons-both))) .track:not(.pressed) .handle, :host([aria-disabled="true"]:not([checked])) .handle { --_switch-handle-inline-start: calc( ${SwitchToken.trackOutlineWidth} + ${SwitchToken.pressedHandleWidth} - ${SwitchToken.withIconHandleWidth} ); --_switch-handle-inline-end: calc( ${SwitchToken.trackWidth} - calc(${SwitchToken.trackOutlineWidth} * 2) - ${SwitchToken.unselectedHandleWidth} - ${SwitchToken.trackOutlineWidth} - ${SwitchToken.pressedHandleWidth} + ${SwitchToken.withIconHandleWidth} ); --_switch-handle-height: ${SwitchToken.unselectedHandleHeight}; } :host([checked]) .track:not(.pressed) .handle { --_switch-handle-inline-start: calc( ${SwitchToken.trackWidth} - ${SwitchToken.selectedHandleWidth} - calc(${SwitchToken.trackOutlineWidth} * 3) ); --_switch-handle-inline-end: ${SwitchToken.trackOutlineWidth}; --_switch-handle-height: ${SwitchToken.selectedHandleHeight}; } :host(:not([checked])) .track.pressed .handle { --_switch-handle-inline-start: 0px; --_switch-handle-inline-end: calc( ${SwitchToken.trackWidth} - calc(${SwitchToken.trackOutlineWidth} * 2) - ${SwitchToken.pressedHandleWidth} ); --_switch-handle-height: ${SwitchToken.pressedHandleHeight}; } :host([checked]) .track.pressed .handle { --_switch-handle-inline-start: calc( ${SwitchToken.trackWidth} - ${SwitchToken.pressedHandleWidth} - calc(${SwitchToken.trackOutlineWidth} * 2) ); --_switch-handle-inline-end: 0px; --_switch-handle-height: ${SwitchToken.pressedHandleHeight}; } :host(:not([aria-disabled="true"]):not([checked]):not(:focus):not(:hover)) .track:not(.pressed) .handle::before { background-color: ${SwitchToken.unselectedHandleColor}; } :host(:not([aria-disabled="true"]):not([checked]):not(:focus):hover) .track:not(.pressed) .handle::before { background-color: ${SwitchToken.unselectedHoverHandleColor}; } :host(:not([aria-disabled="true"]):not([checked]):focus) .track:not(.pressed) .handle::before { background-color: ${SwitchToken.unselectedFocusHandleColor}; } :host(:not([aria-disabled="true"]):not([checked])) .track.pressed .handle::before { background-color: ${SwitchToken.unselectedPressedHandleColor}; } :host(:not([aria-disabled="true"])[checked]:not(:focus):not(:hover)) .track:not(.pressed) .handle::before { background-color: ${SwitchToken.selectedHandleColor}; } :host(:not([aria-disabled="true"])[checked]:not(:focus):hover) .track:not(.pressed) .handle::before { background-color: ${SwitchToken.selectedHoverHandleColor}; } :host(:not([aria-disabled="true"])[checked]:focus) .track:not(.pressed) .handle::before { background-color: ${SwitchToken.selectedFocusHandleColor}; } :host(:not([aria-disabled="true"])[checked]) .track.pressed .handle::before { background-color: ${SwitchToken.selectedPressedHandleColor}; } :host([aria-disabled="true"]:not([checked])) .handle::before { background-color: color-mix( in srgb, ${SwitchToken.disabledUnselectedHandleColor} ${SwitchToken.disabledUnselectedHandleOpacity}, transparent ); } :host([aria-disabled="true"][checked]) .handle::before { background-color: color-mix( in srgb, ${SwitchToken.disabledSelectedHandleColor} ${SwitchToken.disabledSelectedHandleOpacity}, transparent ); } @media (forced-colors: active) { .handle::before { transition: ${unsafeCSS(`transform var(--_switch-handle-position-effect),
      width var(--_switch-handle-position-effect),
      height ${DesignToken.motion.spring.fastEffects}`)}; } :host(:not([aria-disabled="true"]):not([checked]):not(:focus):not(:hover)) .track:not(.pressed) .handle::before, :host(:not([aria-disabled="true"]):not([checked]):not(:focus):hover) .track:not(.pressed) .handle::before, :host(:not([aria-disabled="true"]):not([checked]):focus) .track:not(.pressed) .handle::before, :host(:not([aria-disabled="true"]):not([checked])) .track.pressed .handle::before { background-color: ButtonText; } :host([aria-disabled="true"]:not([checked])) .handle::before { background-color: GrayText; } :host(:not([aria-disabled="true"])[checked]:not(:focus):not(:hover)) .track:not(.pressed) .handle::before, :host(:not([aria-disabled="true"])[checked]:not(:focus):hover) .track:not(.pressed) .handle::before, :host(:not([aria-disabled="true"])[checked]:focus) .track:not(.pressed) .handle::before, :host(:not([aria-disabled="true"])[checked]) .track.pressed .handle::before { background-color: Canvas; } :host([aria-disabled="true"][checked]) .handle::before { background-color: Canvas; } } @media (prefers-reduced-motion) { .handle::before, .handle .base, .handle .state-layer { transition: none; } }`;

/**
 * Icon styles for `M3eSwitchElement`.
 * @internal
 */
const SwitchIconStyle = css`:host(:is(:state(--icons-none), :--icons-none)) .icon, :host(:is(:state(--icons-selected), :--icons-selected):not([checked])) .icon.selected, :host(:is(:state(--icons-selected), :--icons-selected)) .icon.unselected, :host([aria-disabled="true"]:not([checked])) .icon { display: none; } .icon { width: 1em; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--icons-both), :--icons-both)) .icon { opacity: 0; transition: color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}, opacity 0s; } :host(:is(:state(--icons-both), :--icons-both):not([checked])) .icon.unselected, :host(:is(:state(--icons-both), :--icons-both)[checked]) .icon.selected { opacity: 1; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
      opacity ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}`)}; } .icon.unselected { font-size: ${SwitchToken.unselectedIconSize}; } .icon.selected { font-size: ${SwitchToken.selectedIconSize}; } :host(:not([aria-disabled="true"]):not(:focus):not(:hover)) .track:not(.pressed) .icon.unselected { color: ${SwitchToken.unselectedIconColor}; } :host(:not([aria-disabled="true"]):not(:focus):hover) .track:not(.pressed) .icon.unselected { color: ${SwitchToken.unselectedHoverIconColor}; } :host(:not([aria-disabled="true"]):focus) .track:not(.pressed) .icon.unselected { color: ${SwitchToken.unselectedFocusIconColor}; } :host(:not([aria-disabled="true"])) .track.pressed .icon.unselected { color: ${SwitchToken.unselectedPressedIconColor}; } :host(:not([aria-disabled="true"]):not(:focus):not(:hover)) .track:not(.pressed) .icon.selected { color: ${SwitchToken.selectedIconColor}; } :host(:not([aria-disabled="true"]):not(:focus):hover) .track:not(.pressed) .icon.selected { color: ${SwitchToken.selectedHoverIconColor}; } :host(:not([aria-disabled="true"]):focus) .track:not(.pressed) .icon.selected { color: ${SwitchToken.selectedFocusIconColor}; } :host(:not([aria-disabled="true"])) .track.pressed .icon.selected { color: ${SwitchToken.selectedPressedIconColor}; } :host([aria-disabled="true"]:not([checked])) .icon { color: color-mix( in srgb, ${SwitchToken.disabledUnselectedIconColor} ${SwitchToken.disabledUnselectedIconOpacity}, transparent ); } :host([aria-disabled="true"][checked]) .icon { color: color-mix( in srgb, ${SwitchToken.disabledSelectedIconColor} ${SwitchToken.disabledSelectedIconOpacity}, transparent ); } @media (forced-colors: active) { :host(:not([aria-disabled="true"]):not(:focus):not(:hover)) .track:not(.pressed) .icon.unselected, :host(:not([aria-disabled="true"]):not(:focus):hover) .track:not(.pressed) .icon.unselected, :host(:not([aria-disabled="true"]):focus) .track:not(.pressed) .icon.unselected, :host(:not([aria-disabled="true"])) .track.pressed .icon.unselected { color: Canvas; } :host(:not([aria-disabled="true"]):not(:focus):not(:hover)) .track:not(.pressed) .icon.selected, :host(:not([aria-disabled="true"]):not(:focus):hover) .track:not(.pressed) .icon.selected, :host(:not([aria-disabled="true"]):focus) .track:not(.pressed) .icon.selected, :host(:not([aria-disabled="true"])) .track.pressed .icon.selected { color: CanvasText; } :host([aria-disabled="true"]:not([checked])) .icon { color: Canvas; } :host([aria-disabled="true"][checked]) .icon { color: GrayText; } } @media (prefers-reduced-motion) { .icon { transition: none; } :host(:is(:state(--icons-both), :--icons-both):not([checked])) .icon.unselected, :host(:is(:state(--icons-both), :--icons-both)[checked]) .icon.selected { transition: none; } }`;

/**
 * State layer styles for `M3eSwitchElement`.
 * @internal
 */
const SwitchStateLayerStyle = css`.state-layer { width: ${SwitchToken.stateLayerSize}; height: ${SwitchToken.stateLayerSize}; border-radius: ${SwitchToken.stateLayerShape}; inset-inline-start: calc( 50% + calc( calc(var(--_switch-handle-inline-start) - var(--_switch-handle-inline-end)) / 2 - calc(${SwitchToken.stateLayerSize} / 2) ) ); top: calc(50% - calc(${SwitchToken.stateLayerSize} / 2)); transition: ${unsafeCSS(`inset-inline-start ${DesignToken.motion.spring.fastEffects}`)}; } :host(:not([checked])) .state-layer { --m3e-state-layer-hover-color: ${SwitchToken.unselectedHoverStateLayerColor}; --m3e-state-layer-hover-opacity: ${SwitchToken.unselectedHoverStateLayerOpacity}; --m3e-state-layer-focus-color: ${SwitchToken.unselectedFocusStateLayerColor}; --m3e-state-layer-focus-opacity: ${SwitchToken.unselectedFocusStateLayerOpacity}; } :host([checked]) .state-layer { --m3e-state-layer-hover-color: ${SwitchToken.selectedHoverStateLayerColor}; --m3e-state-layer-hover-opacity: ${SwitchToken.selectedHoverStateLayerOpacity}; --m3e-state-layer-focus-color: ${SwitchToken.selectedFocusStateLayerColor}; --m3e-state-layer-focus-opacity: ${SwitchToken.selectedFocusStateLayerOpacity}; }`;

/**
 * Baseline styles for `M3eSwitchElement`.
 * @internal
 */
const SwitchStyle = css`:host { display: inline-block; position: relative; outline: none; height: fit-content; width: fit-content; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } :host(:not([aria-disabled="true"])) { cursor: pointer; } .focus-ring { border-radius: ${SwitchToken.trackShape}; } .touch { position: absolute; height: 48px; left: 0; right: 0; } .base { contain: layout style paint; display: grid; place-items: center; } .icon { grid-area: 1 / 1; }`;

/**
 * Track styles for `M3eSwitchElement`.
 * @internal
 */
const SwitchTrackStyle = css`.track { contain: layout style; display: flex; align-items: center; position: relative; box-sizing: border-box; border-radius: ${SwitchToken.trackShape}; width: ${SwitchToken.trackWidth}; height: ${SwitchToken.trackHeight}; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .track { border-width: ${SwitchToken.trackOutlineWidth}; border-style: solid; } :host([checked]) .track { border-color: transparent; } :host(:not([aria-disabled="true"]):not([checked]):not(:focus):not(:hover)) .track:not(.pressed) { border-color: ${SwitchToken.trackOutlineColor}; background-color: ${SwitchToken.unselectedTrackColor}; } :host(:not([aria-disabled="true"]):not([checked]):not(:focus):hover) .track:not(.pressed) { border-color: ${SwitchToken.unselectedHoverTrackOutlineColor}; background-color: ${SwitchToken.unselectedHoverTrackColor}; } :host(:not([aria-disabled="true"]):not([checked]):focus) .track:not(.pressed) { border-color: ${SwitchToken.unselectedFocusTrackOutlineColor}; background-color: ${SwitchToken.unselectedFocusTrackColor}; } :host(:not([aria-disabled="true"]):not([checked])) .track.pressed { border-color: ${SwitchToken.unselectedPressedTrackOutlineColor}; background-color: ${SwitchToken.unselectedPressedTrackColor}; } :host([aria-disabled="true"]:not([checked])) .track { border-color: color-mix( in srgb, ${SwitchToken.disabledUnselectedTrackOutlineColor} ${SwitchToken.disabledTrackOpacity}, transparent ); background-color: color-mix( in srgb, ${SwitchToken.disabledUnselectedTrackColor} ${SwitchToken.disabledTrackOpacity}, transparent ); } :host(:not([aria-disabled="true"])[checked]:not(:focus):not(:hover)) .track:not(.pressed) { background-color: ${SwitchToken.selectedTrackColor}; } :host(:not([aria-disabled="true"])[checked]:not(:focus):hover) .track:not(.pressed) { background-color: ${SwitchToken.selectedHoverTrackColor}; } :host(:not([aria-disabled="true"])[checked]:focus) .track:not(.pressed) { background-color: ${SwitchToken.selectedFocusTrackColor}; } :host(:not([aria-disabled="true"])[checked]) .track.pressed { background-color: ${SwitchToken.selectedPressedTrackColor}; } :host([aria-disabled="true"][checked]) .track { background-color: color-mix( in srgb, ${SwitchToken.disabledSelectedTrackColor} ${SwitchToken.disabledTrackOpacity}, transparent ); } @media (forced-colors: active) { .track { transition: none; } :host(:not([aria-disabled="true"]):not([checked]):not(:focus):not(:hover)) .track:not(.pressed), :host(:not([aria-disabled="true"]):not([checked]):not(:focus):hover) .track:not(.pressed), :host(:not([aria-disabled="true"]):not([checked]):focus) .track:not(.pressed), :host(:not([aria-disabled="true"]):not([checked])) .track.pressed { border-color: ButtonText; background-color: Canvas; } :host([aria-disabled="true"]:not([checked])) .track { border-color: GrayText; background-color: Canvas; } :host(:not([aria-disabled="true"])[checked]:not(:focus):not(:hover)) .track:not(.pressed), :host(:not([aria-disabled="true"])[checked]:not(:focus):hover) .track:not(.pressed), :host(:not([aria-disabled="true"])[checked]:focus) .track:not(.pressed), :host(:not([aria-disabled="true"])[checked]) .track.pressed { background-color: ButtonText; } :host([aria-disabled="true"][checked]) .track { background-color: GrayText; } } @media (prefers-reduced-motion) { .track { transition: none; } }`;

/**
 * Determines whether a value is a `SwitchIcons`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SwitchIcons`.
 */
function isSwitchIcons(value) {
  return value === "none" || value === "selected" || value === "both";
}

var _M3eSwitchElement_instances, _M3eSwitchElement_clickHandler, _M3eSwitchElement_hoverController, _M3eSwitchElement_pressedController, _M3eSwitchElement_applyIcons, _M3eSwitchElement_handleClick;
/**
 * An on/off control that can be toggled by clicking.
 *
 * @description
 * The `m3e-switch` component is a semantic, accessible toggle control that reflects a binary state.
 * Designed according to Material Design 3 guidelines, it supports shape transitions, and adaptive color
 * theming across selected, unselected, and disabled states. The component responds to user interaction
 * with smooth motion and expressive feedback. It supports optional icons (`none`, `selected`, or `both`)
 * and integrates with form-associated behavior, emitting `input` and `change` events when toggled.
 *
 * @example
 * The following example illustrates a switch wrapped by a `label`.
 *
 * ```html
 * <label>Switch label&nbsp;<m3e-switch></m3e-switch></label>
 * ```
 *
 * @example
 * By default, icons are not presented. Use the `icons` attribute to control which icons to show. The next
 * example illustrates showing both the unselected and selected icons.
 *
 * ```html
 * <label>Switch label&nbsp;<m3e-switch icons="both"></m3e-switch></label>
 * ```
 *
 * @tag m3e-switch
 *
 * @attr checked - Whether the element is checked.
 * @attr disabled - Whether the element is disabled.
 * @attr icons - The icons to present.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr value - A string representing the value of the switch.
 *
 * @fires beforeinput - Dispatched before the checked state changes.
 * @fires input - Dispatched when the checked state changes.
 * @fires change - Dispatched when the checked state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-switch-selected-icon-color - Color of the icon when the switch is selected.
 * @cssprop --m3e-switch-selected-icon-size - Size of the icon in the selected state.
 * @cssprop --m3e-switch-unselected-icon-color - Color of the icon when the switch is unselected.
 * @cssprop --m3e-switch-unselected-icon-size - Size of the icon in the unselected state.
 * @cssprop --m3e-switch-track-height - Height of the switch track.
 * @cssprop --m3e-switch-track-width - Width of the switch track.
 * @cssprop --m3e-switch-track-outline-color - Color of the track's outline.
 * @cssprop --m3e-switch-track-outline-width - Thickness of the track's outline.
 * @cssprop --m3e-switch-track-shape - Corner shape of the track.
 * @cssprop --m3e-switch-selected-track-color - Track color when selected.
 * @cssprop --m3e-switch-unselected-track-color - Track color when unselected.
 * @cssprop --m3e-switch-unselected-handle-height - Height of the handle when unselected.
 * @cssprop --m3e-switch-unselected-handle-width - Width of the handle when unselected.
 * @cssprop --m3e-switch-with-icon-handle-height - Height of the handle when icons are present.
 * @cssprop --m3e-switch-with-icon-handle-width - Width of the handle when icons are present.
 * @cssprop --m3e-switch-selected-handle-height - Height of the handle when selected.
 * @cssprop --m3e-switch-selected-handle-width - Width of the handle when selected.
 * @cssprop --m3e-switch-pressed-handle-height - Height of the handle during press.
 * @cssprop --m3e-switch-pressed-handle-width - Width of the handle during press.
 * @cssprop --m3e-switch-handle-shape - Corner shape of the handle.
 * @cssprop --m3e-switch-selected-handle-color - Handle color when selected.
 * @cssprop --m3e-switch-unselected-handle-color - Handle color when unselected.
 * @cssprop --m3e-switch-state-layer-size - Diameter of the state layer overlay.
 * @cssprop --m3e-switch-state-layer-shape - Corner shape of the state layer.
 * @cssprop --m3e-switch-disabled-selected-icon-color - Icon color when selected and disabled.
 * @cssprop --m3e-switch-disabled-selected-icon-opacity - Icon opacity when selected and disabled.
 * @cssprop --m3e-switch-disabled-unselected-icon-color - Icon color when unselected and disabled.
 * @cssprop --m3e-switch-disabled-unselected-icon-opacity - Icon opacity when unselected and disabled.
 * @cssprop --m3e-switch-disabled-track-opacity - Track opacity when disabled.
 * @cssprop --m3e-switch-disabled-selected-track-color - Track color when selected and disabled.
 * @cssprop --m3e-switch-disabled-unselected-track-color - Track color when unselected and disabled.
 * @cssprop --m3e-switch-disabled-unselected-track-outline-color - Outline color when unselected and disabled.
 * @cssprop --m3e-switch-disabled-unselected-handle-opacity - Handle opacity when unselected and disabled.
 * @cssprop --m3e-switch-disabled-selected-handle-opacity - Handle opacity when selected and disabled.
 * @cssprop --m3e-switch-disabled-selected-handle-color - Handle color when selected and disabled.
 * @cssprop --m3e-switch-disabled-unselected-handle-color - Handle color when unselected and disabled.
 * @cssprop --m3e-switch-selected-hover-icon-color - Icon color when selected and hovered.
 * @cssprop --m3e-switch-unselected-hover-icon-color - Icon color when unselected and hovered.
 * @cssprop --m3e-switch-selected-hover-track-color - Track color when selected and hovered.
 * @cssprop --m3e-switch-selected-hover-state-layer-color - State layer color when selected and hovered.
 * @cssprop --m3e-switch-selected-hover-state-layer-opacity - State layer opacity when selected and hovered.
 * @cssprop --m3e-switch-unselected-hover-track-color - Track color when unselected and hovered.
 * @cssprop --m3e-switch-unselected-hover-track-outline-color - Outline color when unselected and hovered.
 * @cssprop --m3e-switch-unselected-hover-state-layer-color - State layer color when unselected and hovered.
 * @cssprop --m3e-switch-unselected-hover-state-layer-opacity - State layer opacity when unselected and hovered.
 * @cssprop --m3e-switch-selected-hover-handle-color - Handle color when selected and hovered.
 * @cssprop --m3e-switch-unselected-hover-handle-color - Handle color when unselected and hovered.
 * @cssprop --m3e-switch-selected-focus-icon-color - Icon color when selected and focused.
 * @cssprop --m3e-switch-unselected-focus-icon-color - Icon color when unselected and focused.
 * @cssprop --m3e-switch-selected-focus-track-color - Track color when selected and focused.
 * @cssprop --m3e-switch-selected-focus-state-layer-color - State layer color when selected and focused.
 * @cssprop --m3e-switch-selected-focus-state-layer-opacity - State layer opacity when selected and focused.
 * @cssprop --m3e-switch-unselected-focus-track-color - Track color when unselected and focused.
 * @cssprop --m3e-switch-unselected-focus-track-outline-color - Outline color when unselected and focused.
 * @cssprop --m3e-switch-unselected-focus-state-layer-color - State layer color when unselected and focused.
 * @cssprop --m3e-switch-unselected-focus-state-layer-opacity - State layer opacity when unselected and focused.
 * @cssprop --m3e-switch-selected-focus-handle-color - Handle color when selected and focused.
 * @cssprop --m3e-switch-unselected-focus-handle-color - Handle color when unselected and focused.
 * @cssprop --m3e-switch-selected-pressed-icon-color - Icon color when selected and pressed.
 * @cssprop --m3e-switch-unselected-pressed-icon-color - Icon color when unselected and pressed.
 * @cssprop --m3e-switch-selected-pressed-track-color - Track color when selected and pressed.
 * @cssprop --m3e-switch-selected-pressed-state-layer-color - State layer color when selected and pressed.
 * @cssprop --m3e-switch-selected-pressed-state-layer-opacity - State layer opacity when selected and pressed.
 * @cssprop --m3e-switch-unselected-pressed-track-color - Track color when unselected and pressed.
 * @cssprop --m3e-switch-unselected-pressed-track-outline-color - Outline color when unselected and pressed.
 * @cssprop --m3e-switch-unselected-pressed-state-layer-color - State layer color when unselected and pressed.
 * @cssprop --m3e-switch-unselected-pressed-state-layer-opacity - State layer opacity when unselected and pressed.
 * @cssprop --m3e-switch-selected-pressed-handle-color - Handle color when selected and pressed.
 * @cssprop --m3e-switch-unselected-pressed-handle-color - Handle color when unselected and pressed.
 */
let M3eSwitchElement = class M3eSwitchElement extends SupportsDirectionality(Labelled(Dirty(Touched(ConstraintValidation(Checked(FormAssociated(KeyboardClick(Focusable(Disabled(AttachInternals(Role(LitElement, "switch")))))))))))) {
  constructor() {
    super();
    _M3eSwitchElement_instances.add(this);
    /** @private */
    _M3eSwitchElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eSwitchElement_instances, "m", _M3eSwitchElement_handleClick).call(this, e));
    /** @private */
    _M3eSwitchElement_hoverController.set(this, new HoverController(this, {
      target: null,
      callback: hovering => {
        if (this.disabled) return;
        if (hovering) {
          this._stateLayer?.show("hover");
        } else {
          this._stateLayer?.hide("hover");
        }
      }
    }));
    /** @private */
    _M3eSwitchElement_pressedController.set(this, new PressedController(this, {
      target: null,
      callback: pressed => this._track?.classList.toggle("pressed", pressed && !this.disabled)
    }));
    /**
     * The icons to present.
     * @default "none"
     */
    this.icons = "none";
    /**
     * A string representing the value of the switch.
     * @default "on"
     */
    this.value = "on";
    new PressedController(this, {
      isPressedKey: key => key === " ",
      callback: pressed => this._track?.classList.toggle("pressed", pressed && !this.disabled)
    });
  }
  /** @inheritdoc @private */
  get [(_M3eSwitchElement_clickHandler = new WeakMap(), _M3eSwitchElement_hoverController = new WeakMap(), _M3eSwitchElement_pressedController = new WeakMap(), _M3eSwitchElement_instances = new WeakSet(), formValue)]() {
    return this.checked && !this.disabled ? this.value : null;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eSwitchElement_instances, "m", _M3eSwitchElement_applyIcons).call(this);
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eSwitchElement_clickHandler, "f"));
    for (const label of this.labels) {
      __classPrivateFieldGet(this, _M3eSwitchElement_hoverController, "f").observe(label);
      __classPrivateFieldGet(this, _M3eSwitchElement_pressedController, "f").observe(label);
    }
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eSwitchElement_clickHandler, "f"));
    for (const label of this.labels) {
      __classPrivateFieldGet(this, _M3eSwitchElement_hoverController, "f").unobserve(label);
      __classPrivateFieldGet(this, _M3eSwitchElement_pressedController, "f").unobserve(label);
    }
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("icons")) {
      __classPrivateFieldGet(this, _M3eSwitchElement_instances, "m", _M3eSwitchElement_applyIcons).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-focus-ring class="focus-ring"></m3e-focus-ring><div class="track" aria-hidden="true"><div class="touch" aria-hidden="true"></div><div class="handle"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><div class="base" aria-hidden="true"><svg class="icon unselected" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> <svg class="icon selected" viewBox="0 0 24 24"><path fill="currentColor" d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"></path></svg></div></div></div>`;
  }
};
_M3eSwitchElement_applyIcons = function _M3eSwitchElement_applyIcons() {
  if (!isSwitchIcons(this.icons)) {
    this.icons = "none";
  }
  setCustomState(this, "--icons-none", this.icons === "none");
  setCustomState(this, "--icons-selected", this.icons === "selected");
  setCustomState(this, "--icons-both", this.icons === "both");
};
_M3eSwitchElement_handleClick = function _M3eSwitchElement_handleClick(e) {
  if (e.defaultPrevented) return;
  if (this.disabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    this.checked = !this.checked;
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  // Prevent default avoids double-click in FireFox.
  if (this.closest("label")) {
    e.preventDefault();
  }
};
/** The styles of the element. */
M3eSwitchElement.styles = [SwitchStyle, SwitchStateLayerStyle, SwitchTrackStyle, SwitchHandleStyle, SwitchIconStyle];
__decorate([query(".track")], M3eSwitchElement.prototype, "_track", void 0);
__decorate([query(".focus-ring")], M3eSwitchElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eSwitchElement.prototype, "_stateLayer", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSwitchElement.prototype, "icons", void 0);
__decorate([property()], M3eSwitchElement.prototype, "value", void 0);
M3eSwitchElement = __decorate([customElement("m3e-switch")], M3eSwitchElement);

export { M3eSwitchElement, isSwitchIcons };
//# sourceMappingURL=switch.js.map
