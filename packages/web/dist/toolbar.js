/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DesignToken, Role, AttachInternals, setCustomEnumState, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { Vertical } from './Vertical.js';
import { RovingTabIndexManager, M3eInteractivityChecker } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';

/**
 * Determines whether a value is a `ToolbarVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ToolbarVariant`.
 */
function isToolbarVariant(value) {
  return value === "standard" || value === "vibrant";
}

/**
 * Determines whether a value is a `ToolbarShape`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ToolbarShape`.
 */
function isToolbarShape(value) {
  return value === "rounded" || value === "square";
}

/**
 * Component design tokens that control the shape variants of `M3eToolbarElement`.
 * @internal
 */
const ToolbarShapeToken = {
  square: {
    shape: unsafeCSS(`var(--m3e-toolbar-square-shape, ${DesignToken.shape.corner.none})`),
    leadingSpace: unsafeCSS(`var(--m3e-toolbar-square-leading-space, ${DesignToken.measurement.space200})`),
    trailingSpace: unsafeCSS(`var(--m3e-toolbar-square-trailing-space, ${DesignToken.measurement.space200})`),
    topSpace: unsafeCSS(`var(--m3e-toolbar-square-top-space, ${DesignToken.measurement.space100})`),
    bottomSpace: unsafeCSS(`var(--m3e-toolbar-square-bottom-space, ${DesignToken.measurement.space100})`)
  },
  rounded: {
    shape: unsafeCSS(`var(--m3e-toolbar-rounded-shape, ${DesignToken.shape.corner.full})`),
    leadingSpace: unsafeCSS(`var(--m3e-toolbar-rounded-leading-space, ${DesignToken.measurement.space100})`),
    trailingSpace: unsafeCSS(`var(--m3e-toolbar-rounded-trailing-space, ${DesignToken.measurement.space100})`),
    topSpace: unsafeCSS(`var(--m3e-toolbar-rounded-top-space, ${DesignToken.measurement.space100})`),
    bottomSpace: unsafeCSS(`var(--m3e-toolbar-rounded-bottom-space, ${DesignToken.measurement.space100})`)
  }
};

/** @private */
function toolbarShapeStyle(shape) {
  const selector = unsafeCSS(`:is(:state(--${shape}), :--${shape})`);
  return css`:host(${selector}) .base, :host(${selector}) .state-layer, :host(${selector}) .elevation { border-radius: ${ToolbarShapeToken[shape].shape}; } :host(${selector}:not([vertical])) .base { padding-inline-start: ${ToolbarShapeToken[shape].leadingSpace}; padding-inline-end: ${ToolbarShapeToken[shape].trailingSpace}; padding-block-start: calc(${ToolbarShapeToken[shape].topSpace} + ${DesignToken.density.calc(-3)}); padding-block-end: calc(${ToolbarShapeToken[shape].bottomSpace} + ${DesignToken.density.calc(-3)}); } :host(${selector}[vertical]) .base { padding-block-start: calc(${ToolbarShapeToken[shape].leadingSpace} + ${DesignToken.density.calc(-3)}); padding-block-end: calc(${ToolbarShapeToken[shape].trailingSpace} + ${DesignToken.density.calc(-3)}); padding-inline-start: ${ToolbarShapeToken[shape].topSpace}; padding-inline-end: ${ToolbarShapeToken[shape].bottomSpace}; }`;
}
/**
 * Shape variant styles for `M3eToolbarElement`.
 * @internal
 */
const ToolbarShapeStyle = [toolbarShapeStyle("square"), toolbarShapeStyle("rounded")];

/**
 * Component design tokens that control `M3eToolbarElement`.
 * @internal
 */
const ToolbarToken = {
  size: unsafeCSS(`var(--m3e-toolbar-size, 64px)`),
  spacing: unsafeCSS(`var(--m3e-toolbar-spacing, ${DesignToken.measurement.space50})`)
};

/**
 * Baseline styles for `M3eToolbarElement`.
 * @internal
 */
const ToolbarStyle = css`:host { display: inline-block; position: relative; } :host([hidden]) { display: none; } .base { display: flex; align-items: center; box-sizing: border-box; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; --_icon-button-size: auto; --_icon-button-min-size: 48px; } :host(:not([vertical])) { height: fit-content; } :host(:not([vertical])) .base { min-height: calc(${ToolbarToken.size} + ${DesignToken.density.calc(-3)}); column-gap: ${ToolbarToken.spacing}; } :host([vertical]) { width: fit-content; } :host([vertical]) .base { min-width: calc(${ToolbarToken.size} + ${DesignToken.density.calc(-3)}); } :host([vertical]) .base { flex-direction: column; justify-content: center; row-gap: ${ToolbarToken.spacing}; } .state-layer { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } @media (forced-colors: active) { :host(:is(:state(--standard), :--standard)) .state-layer, :host(:is(:state(--vibrant), :--vibrant)) .state-layer { background-color: Canvas; } :host(:is(:state(--standard), :--standard)) .base, :host(:is(:state(--vibrant), :--vibrant)) .base { color: CanvasText; outline: 1px solid CanvasText; } .state-layer, .base { transition: none; } } @media (prefers-reduced-motion) { .state-layer, .base { transition: none; } }`;

/**
 * Component design tokens that control the appearance variants of `M3eToolbarElement`.
 * @internal
 */
const ToolbarVariantToken = {
  standard: {
    containerColor: unsafeCSS(`var(--m3e-toolbar-standard-container-color, var(--m3e-toolbar-container-color, ${DesignToken.color.surfaceContainer}))`),
    buttonContainerColor: unsafeCSS(`var(--m3e-toolbar-standard-button-container-color, var(--m3e-toolbar-button-container-color, ${DesignToken.color.surfaceContainer}))`),
    selectedButtonContainerColor: unsafeCSS(`var(--m3e-toolbar-standard-selected-button-container-color, var(--m3e-toolbar-selected-button-container-color, ${DesignToken.color.secondaryContainer}))`),
    iconColor: unsafeCSS(`var(--m3e-toolbar-standard-icon-color, var(--m3e-toolbar-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
    selectedIconColor: unsafeCSS(`var(--m3e-toolbar-standard-selected-icon-color, var(--m3e-toolbar-selected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    labelColor: unsafeCSS(`var(--m3e-toolbar-standard-label-color, var(--m3e-toolbar-label-color, ${DesignToken.color.onSurfaceVariant}))`),
    selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-standard-selected-label-color, var(--m3e-toolbar-selected-label-color, ${DesignToken.color.onSecondaryContainer}))`),
    disabled: {
      iconColor: unsafeCSS(`var(--m3e-toolbar-standard-disabled-icon-color, var(--m3e-toolbar-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      iconOpacity: unsafeCSS(`var(--m3e-toolbar-standard-disabled-icon-opacity, var(--m3e-toolbar-disabled-icon-opacity, 38%))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-standard-disabled-label-color, var(--m3e-toolbar-disabled-label-color, ${DesignToken.color.onSurface}))`),
      labelOpacity: unsafeCSS(`var(--m3e-toolbar-standard-disabled-label-opacity, var(--m3e-toolbar-label-icon-opacity, 38%))`)
    },
    hover: {
      stateLayerColor: unsafeCSS(`var(--m3e-toolbar-standard-hover-state-layer-color, var(--m3e-toolbar-hover-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedStateLayerColor: unsafeCSS(`var(--m3e-toolbar-standard-hover-selected-state-layer-color, var(--m3e-toolbar-hover-selected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-toolbar-standard-hover-state-layer-opacity, var(--m3e-toolbar-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      iconColor: unsafeCSS(`var(--m3e-toolbar-standard-hover-icon-color, var(--m3e-toolbar-hover-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedIconColor: unsafeCSS(`var(--m3e-toolbar-standard-hover-selected-icon-color, var(--m3e-toolbar-hover-selected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-standard-hover-label-color, var(--m3e-toolbar-hover-label-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-standard-hover-selected-label-color, var(--m3e-toolbar-hover-selected-label-color, ${DesignToken.color.onSecondaryContainer}))`)
    },
    focus: {
      stateLayerColor: unsafeCSS(`var(--m3e-toolbar-standard-focus-state-layer-color, var(--m3e-toolbar-focus-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedStateLayerColor: unsafeCSS(`var(--m3e-toolbar-standard-focus-selected-state-layer-color, var(--m3e-toolbar-focus-selected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-toolbar-standard-focus-state-layer-opacity, var(--m3e-toolbar-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      iconColor: unsafeCSS(`var(--m3e-toolbar-standard-focus-icon-color, var(--m3e-toolbar-focus-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedIconColor: unsafeCSS(`var(--m3e-toolbar-standard-focus-selected-icon-color, var(--m3e-toolbar-focus-selected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-standard-focus-label-color, var(--m3e-toolbar-focus-label-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-standard-focus-selected-label-color, var(--m3e-toolbar-focus-selected-label-color, ${DesignToken.color.onSecondaryContainer}))`)
    },
    pressed: {
      stateLayerColor: unsafeCSS(`var(--m3e-toolbar-standard-pressed-state-layer-color, var(--m3e-toolbar-pressed-state-layer-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedStateLayerColor: unsafeCSS(`var(--m3e-toolbar-standard-pressed-selected-state-layer-color, var(--m3e-toolbar-pressed-selected-state-layer-color, ${DesignToken.color.onSecondaryContainer}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-toolbar-standard-pressed-state-layer-opacity, var(--m3e-toolbar-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      iconColor: unsafeCSS(`var(--m3e-toolbar-standard-pressed-icon-color, var(--m3e-toolbar-pressed-icon-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedIconColor: unsafeCSS(`var(--m3e-toolbar-standard-pressed-selected-icon-color, var(--m3e-toolbar-pressed-selected-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-standard-pressed-label-color, var(--m3e-toolbar-pressed-label-color, ${DesignToken.color.onSurfaceVariant}))`),
      selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-standard-pressed-selected-label-color, var(--m3e-toolbar-pressed-selected-label-color, ${DesignToken.color.onSecondaryContainer}))`)
    }
  },
  vibrant: {
    containerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-container-color, var(--m3e-toolbar-container-color, ${DesignToken.color.primaryContainer}))`),
    buttonContainerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-button-container-color, var(--m3e-toolbar-button-container-color, ${DesignToken.color.primaryContainer}))`),
    selectedButtonContainerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-selected-button-container-color, var(--m3e-toolbar-selected-button-container-color, ${DesignToken.color.surfaceContainer}))`),
    iconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-icon-color, var(--m3e-toolbar-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
    selectedIconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-selected-icon-color, var(--m3e-toolbar-selected-icon-color, ${DesignToken.color.onSurface}))`),
    labelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-label-color, var(--m3e-toolbar-label-color, ${DesignToken.color.onPrimaryContainer}))`),
    selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-selected-label-color, var(--m3e-toolbar-selected-label-color, ${DesignToken.color.onSurface}))`),
    disabled: {
      iconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-disabled-icon-color, var(--m3e-toolbar-disabled-icon-color, ${DesignToken.color.onSurface}))`),
      iconOpacity: unsafeCSS(`var(--m3e-toolbar-vibrant-disabled-icon-opacity, var(--m3e-toolbar-disabled-icon-opacity, 38%))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-disabled-label-color, var(--m3e-toolbar-disabled-label-color, ${DesignToken.color.onSurface}))`),
      labelOpacity: unsafeCSS(`var(--m3e-toolbar-vibrant-disabled-label-opacity, var(--m3e-toolbar-label-icon-opacity, 38%))`)
    },
    hover: {
      stateLayerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-state-layer-color, var(--m3e-toolbar-hover-state-layer-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedStateLayerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-selected-state-layer-color, var(--m3e-toolbar-hover-selected-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-state-layer-opacity, var(--m3e-toolbar-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity}))`),
      iconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-icon-color, var(--m3e-toolbar-hover-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedIconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-selected-icon-color, var(--m3e-toolbar-hover-selected-icon-color, ${DesignToken.color.onSurface}))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-label-color, var(--m3e-toolbar-hover-label-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-hover-selected-label-color, var(--m3e-toolbar-hover-selected-label-color, ${DesignToken.color.onSurface}))`)
    },
    focus: {
      stateLayerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-state-layer-color, var(--m3e-toolbar-focus-state-layer-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedStateLayerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-selected-state-layer-color, var(--m3e-toolbar-focus-selected-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-state-layer-opacity, var(--m3e-toolbar-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity}))`),
      iconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-icon-color, var(--m3e-toolbar-focus-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedIconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-selected-icon-color, var(--m3e-toolbar-focus-selected-icon-color, ${DesignToken.color.onSurface}))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-label-color, var(--m3e-toolbar-focus-label-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-focus-selected-label-color, var(--m3e-toolbar-focus-selected-label-color, ${DesignToken.color.onSurface}))`)
    },
    pressed: {
      stateLayerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-state-layer-color, var(--m3e-toolbar-pressed-state-layer-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedStateLayerColor: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-selected-state-layer-color, var(--m3e-toolbar-pressed-selected-state-layer-color, ${DesignToken.color.onSurface}))`),
      stateLayerOpacity: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-state-layer-opacity, var(--m3e-toolbar-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity}))`),
      iconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-icon-color, var(--m3e-toolbar-pressed-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedIconColor: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-selected-icon-color, var(--m3e-toolbar-pressed-selected-icon-color, ${DesignToken.color.onSurface}))`),
      labelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-label-color, var(--m3e-toolbar-pressed-label-color, ${DesignToken.color.onPrimaryContainer}))`),
      selectedLabelColor: unsafeCSS(`var(--m3e-toolbar-vibrant-pressed-selected-label-color, var(--m3e-toolbar-pressed-selected-label-color, ${DesignToken.color.onSurface}))`)
    }
  }
};

/** @private */
function iconButtonStateStyle(variant, prefix, state) {
  return unsafeCSS(`
    ${prefix}-${state}-state-layer-color: ${ToolbarVariantToken[variant].hover.stateLayerColor};
    ${prefix}-${state}-unselected-state-layer-color: ${ToolbarVariantToken[variant].hover.stateLayerColor};
    ${prefix}-${state}-selected-state-layer-color: ${ToolbarVariantToken[variant].hover.selectedStateLayerColor};
    ${prefix}-${state}-state-layer-opacity: ${ToolbarVariantToken[variant].hover.stateLayerOpacity};
    ${prefix}-${state}-icon-color: ${ToolbarVariantToken[variant].hover.iconColor};
    ${prefix}-${state}-unselected-icon-color: ${ToolbarVariantToken[variant].hover.iconColor};
    ${prefix}-${state}-selected-icon-color: ${ToolbarVariantToken[variant].hover.selectedIconColor};`);
}
/** @private */
function iconButtonStyle(variant) {
  const prefix = `--m3e-standard-icon-button`;
  return unsafeCSS(`
      ${prefix}-container-color: ${ToolbarVariantToken[variant].buttonContainerColor};
      ${prefix}-unselected-container-color: ${ToolbarVariantToken[variant].buttonContainerColor};
      ${prefix}-selected-container-color: ${ToolbarVariantToken[variant].selectedButtonContainerColor};
      ${prefix}-icon-color: ${ToolbarVariantToken[variant].iconColor};
      ${prefix}-unselected-icon-color: ${ToolbarVariantToken[variant].iconColor};
      ${prefix}-selected-icon-color: ${ToolbarVariantToken[variant].selectedIconColor};
      ${prefix}-disabled-icon-color: ${ToolbarVariantToken[variant].disabled.iconColor};
      ${prefix}-disabled-icon-opacity: ${ToolbarVariantToken[variant].disabled.iconOpacity};
      ${prefix}-disabled-container-color: transparent;
      ${iconButtonStateStyle(variant, prefix, "hover")}
      ${iconButtonStateStyle(variant, prefix, "focus")}
      ${iconButtonStateStyle(variant, prefix, "pressed")}
  `);
}
/** @private */
function buttonStateStyle(variant, prefix, state) {
  return unsafeCSS(`
    ${prefix}-${state}-state-layer-color: ${ToolbarVariantToken[variant].hover.stateLayerColor};
    ${prefix}-${state}-unselected-state-layer-color: ${ToolbarVariantToken[variant].hover.stateLayerColor};
    ${prefix}-${state}-selected-state-layer-color: ${ToolbarVariantToken[variant].hover.selectedStateLayerColor};
    ${prefix}-${state}-state-layer-opacity: ${ToolbarVariantToken[variant].hover.stateLayerOpacity};
    ${prefix}-${state}-icon-color: ${ToolbarVariantToken[variant].hover.iconColor};
    ${prefix}-${state}-unselected-icon-color: ${ToolbarVariantToken[variant].hover.iconColor};
    ${prefix}-${state}-selected-icon-color: ${ToolbarVariantToken[variant].hover.selectedIconColor};
    ${prefix}-${state}-label-text-color: ${ToolbarVariantToken[variant].hover.labelColor};
    ${prefix}-${state}-unselected-label-text-color: ${ToolbarVariantToken[variant].hover.labelColor};
    ${prefix}-${state}-selected-label-text-color: ${ToolbarVariantToken[variant].hover.selectedLabelColor};`);
}
/** @private */
function buttonStyle(variant) {
  const prefix = `--m3e-text-button`;
  return unsafeCSS(`
      ${prefix}-container-color: ${ToolbarVariantToken[variant].buttonContainerColor};
      ${prefix}-unselected-container-color: ${ToolbarVariantToken[variant].buttonContainerColor};
      ${prefix}-selected-container-color: ${ToolbarVariantToken[variant].selectedButtonContainerColor};
      ${prefix}-icon-color: ${ToolbarVariantToken[variant].iconColor};
      ${prefix}-unselected-icon-color: ${ToolbarVariantToken[variant].iconColor};
      ${prefix}-selected-icon-color: ${ToolbarVariantToken[variant].selectedIconColor};
      ${prefix}-label-text-color: ${ToolbarVariantToken[variant].labelColor};
      ${prefix}-unselected-label-text-color: ${ToolbarVariantToken[variant].labelColor};
      ${prefix}-selected-label-text-color: ${ToolbarVariantToken[variant].selectedLabelColor};
      ${prefix}-disabled-icon-color: ${ToolbarVariantToken[variant].disabled.iconColor};
      ${prefix}-disabled-icon-opacity: ${ToolbarVariantToken[variant].disabled.iconOpacity};
      ${prefix}-disabled-label-text-color: ${ToolbarVariantToken[variant].disabled.labelColor};
      ${prefix}-disabled-label-text-opacity: ${ToolbarVariantToken[variant].disabled.labelOpacity};
      ${prefix}-disabled-container-color: transparent;
      ${buttonStateStyle(variant, prefix, "hover")}
      ${buttonStateStyle(variant, prefix, "focus")}
      ${buttonStateStyle(variant, prefix, "pressed")}
  `);
}
/** @private */
function toolbarVariantStyle(variant) {
  const selector = unsafeCSS(`:is(:state(--${variant}), :--${variant})`);
  return unsafeCSS(`
    :host(${selector}) .state-layer {
      background-color: ${ToolbarVariantToken[variant].containerColor};
    }
    :host(${selector}) .base {
      color: ${ToolbarVariantToken[variant].labelColor};
      ${iconButtonStyle(variant)}
      ${buttonStyle(variant)}
    }
  `);
}
/**
 * Appearance variant styles for `M3eToolbarElement`.
 * @internal
 */
const ToolbarVariantStyle = [toolbarVariantStyle("standard"), toolbarVariantStyle("vibrant")];

var _M3eToolbarElement_instances, _M3eToolbarElement_directionalitySubscription, _M3eToolbarElement_focusKeyManager, _M3eToolbarElement_applyShape, _M3eToolbarElement_applyVariant, _M3eToolbarElement_handleSlotChange, _M3eToolbarElement_handleKeyDown, _M3eToolbarElement_handleClick;
/**
 * Presents frequently used actions relevant to the current page.
 *
 * @description
 * The `m3e-toolbar` component presents contextual actions, navigation, and controls. Designed according to
 * Material 3 principles, it supports vertical and horizontal orientation, shape and variant customization,
 * and adaptive layout via CSS custom properties.
 *
 * @example
 * The following example illustrates a `vibrant`, `rounded` toolbar containing icon buttons.
 *
 * ```html
 * <m3e-toolbar variant="vibrant" shape="rounded">
 *  <m3e-icon-button>
 *    <m3e-icon name="arrow_back"></m3e-icon>
 *  </m3e-icon-button>
 *  <m3e-icon-button>
 *    <m3e-icon name="arrow_forward"></m3e-icon>
 *  </m3e-icon-button>
 *  <m3e-icon-button width="wide" variant="filled">
 *    <m3e-icon name="add"></m3e-icon>
 *  </m3e-icon-button>
 *  <m3e-icon-button>
 *    <m3e-icon name="picture_in_picture"></m3e-icon>
 *  </m3e-icon-button>
 *  <m3e-icon-button>
 *    <m3e-icon name="more_vert"></m3e-icon>
 *  </m3e-icon-button>
 * </m3e-toolbar>
 * ```
 *
 * @tag m3e-toolbar
 *
 * @slot - Renders the content of the toolbar.
 *
 * @attr elevated - Whether the toolbar is elevated.
 * @attr shape - The shape of the toolbar.
 * @attr variant - The appearance variant of the toolbar.
 * @attr vertical - Whether the element is oriented vertically.
 *
 * @cssprop --m3e-toolbar-size - The size (height or width) of the toolbar.
 * @cssprop --m3e-toolbar-spacing - The gap between toolbar items.
 * @cssprop --m3e-toolbar-rounded-shape - Border radius for rounded shape.
 * @cssprop --m3e-toolbar-square-shape - Border radius for square shape.
 * @cssprop --m3e-toolbar-rounded-leading-space - Leading space for rounded shape.
 * @cssprop --m3e-toolbar-rounded-trailing-space - Trailing space for rounded shape.
 * @cssprop --m3e-toolbar-rounded-top-space - Top space for rounded shape.
 * @cssprop --m3e-toolbar-rounded-bottom-space - Bottom space for rounded shape.
 * @cssprop --m3e-toolbar-square-leading-space - Leading space for square shape.
 * @cssprop --m3e-toolbar-square-trailing-space - Trailing space for square shape.
 * @cssprop --m3e-toolbar-square-top-space - Top space for square shape.
 * @cssprop --m3e-toolbar-square-bottom-space - Bottom space for square shape.
 * @cssprop --m3e-toolbar-container-color - Container background color for all variants.
 * @cssprop --m3e-toolbar-button-container-color - Button container background color for all variants.
 * @cssprop --m3e-toolbar-selected-button-container-color - Selected button container background color for all variants.
 * @cssprop --m3e-toolbar-icon-color - Icon color for all variants.
 * @cssprop --m3e-toolbar-selected-icon-color - Selected icon color for all variants.
 * @cssprop --m3e-toolbar-label-color - Label color for all variants.
 * @cssprop --m3e-toolbar-selected-label-color - Selected label color for all variants.
 * @cssprop --m3e-toolbar-disabled-icon-color - Icon color when disabled for all variants.
 * @cssprop --m3e-toolbar-disabled-icon-opacity - Icon opacity when disabled for all variants.
 * @cssprop --m3e-toolbar-disabled-label-color - Label color when disabled for all variants.
 * @cssprop --m3e-toolbar-label-icon-opacity - Label opacity when disabled for all variants.
 * @cssprop --m3e-toolbar-hover-state-layer-color - State layer color on hover for all variants.
 * @cssprop --m3e-toolbar-hover-selected-state-layer-color - Selected state layer color on hover for all variants.
 * @cssprop --m3e-toolbar-hover-state-layer-opacity - State layer opacity on hover for all variants.
 * @cssprop --m3e-toolbar-hover-icon-color - Icon color on hover for all variants.
 * @cssprop --m3e-toolbar-hover-selected-icon-color - Selected icon color on hover for all variants.
 * @cssprop --m3e-toolbar-hover-label-color - Label color on hover for all variants.
 * @cssprop --m3e-toolbar-hover-selected-label-color - Selected label color on hover for all variants.
 * @cssprop --m3e-toolbar-focus-state-layer-color - State layer color on focus for all variants.
 * @cssprop --m3e-toolbar-focus-selected-state-layer-color - Selected state layer color on focus for all variants.
 * @cssprop --m3e-toolbar-focus-state-layer-opacity - State layer opacity on focus for all variants.
 * @cssprop --m3e-toolbar-focus-icon-color - Icon color on focus for all variants.
 * @cssprop --m3e-toolbar-focus-selected-icon-color - Selected icon color on focus for all variants.
 * @cssprop --m3e-toolbar-focus-label-color - Label color on focus for all variants.
 * @cssprop --m3e-toolbar-focus-selected-label-color - Selected label color on focus for all variants.
 * @cssprop --m3e-toolbar-pressed-state-layer-color - State layer color on press for all variants.
 * @cssprop --m3e-toolbar-pressed-selected-state-layer-color - Selected state layer color on press for all variants.
 * @cssprop --m3e-toolbar-pressed-state-layer-opacity - State layer opacity on press for all variants.
 * @cssprop --m3e-toolbar-pressed-icon-color - Icon color on press for all variants.
 * @cssprop --m3e-toolbar-pressed-selected-icon-color - Selected icon color on press for all variants.
 * @cssprop --m3e-toolbar-pressed-label-color - Label color on press for all variants.
 * @cssprop --m3e-toolbar-pressed-selected-label-color - Selected label color on press for all variants.
 * @cssprop --m3e-toolbar-standard-container-color - Container background color for the standard variant.
 * @cssprop --m3e-toolbar-standard-button-container-color - Button container background color for the standard variant.
 * @cssprop --m3e-toolbar-standard-selected-button-container-color - Selected button container background color for the standard variant.
 * @cssprop --m3e-toolbar-standard-icon-color - Icon color for the standard variant.
 * @cssprop --m3e-toolbar-standard-selected-icon-color - Selected icon color for the standard variant.
 * @cssprop --m3e-toolbar-standard-label-color - Label color for the standard variant.
 * @cssprop --m3e-toolbar-standard-selected-label-color - Selected label color for the standard variant.
 * @cssprop --m3e-toolbar-standard-disabled-icon-color - Icon color when disabled for the standard variant.
 * @cssprop --m3e-toolbar-standard-disabled-icon-opacity - Icon opacity when disabled for the standard variant.
 * @cssprop --m3e-toolbar-standard-disabled-label-color - Label color when disabled for the standard variant.
 * @cssprop --m3e-toolbar-standard-disabled-label-opacity - Label opacity when disabled for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-state-layer-color - State layer color on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-selected-state-layer-color - Selected state layer color on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-state-layer-opacity - State layer opacity on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-icon-color - Icon color on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-selected-icon-color - Selected icon color on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-label-color - Label color on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-hover-selected-label-color - Selected label color on hover for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-state-layer-color - State layer color on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-selected-state-layer-color - Selected state layer color on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-state-layer-opacity - State layer opacity on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-icon-color - Icon color on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-selected-icon-color - Selected icon color on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-label-color - Label color on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-focus-selected-label-color - Selected label color on focus for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-state-layer-color - State layer color on press for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-selected-state-layer-color - Selected state layer color on press for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-state-layer-opacity - State layer opacity on press for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-icon-color - Icon color on press for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-selected-icon-color - Selected icon color on press for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-label-color - Label color on press for the standard variant.
 * @cssprop --m3e-toolbar-standard-pressed-selected-label-color - Selected label color on press for the standard variant.
 * @cssprop --m3e-toolbar-vibrant-container-color - Container background color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-button-container-color - Button container background color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-selected-button-container-color - Selected button container background color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-icon-color - Icon color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-selected-icon-color - Selected icon color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-label-color - Label color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-selected-label-color - Selected label color for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-disabled-icon-color - Icon color when disabled for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-disabled-icon-opacity - Icon opacity when disabled for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-disabled-label-color - Label color when disabled for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-disabled-label-opacity - Label opacity when disabled for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-state-layer-color - State layer color on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-selected-state-layer-color - Selected state layer color on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-state-layer-opacity - State layer opacity on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-icon-color - Icon color on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-selected-icon-color - Selected icon color on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-label-color - Label color on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-hover-selected-label-color - Selected label color on hover for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-state-layer-color - State layer color on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-selected-state-layer-color - Selected state layer color on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-state-layer-opacity - State layer opacity on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-icon-color - Icon color on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-selected-icon-color - Selected icon color on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-label-color - Label color on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-focus-selected-label-color - Selected label color on focus for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-state-layer-color - State layer color on press for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-selected-state-layer-color - Selected state layer color on press for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-state-layer-opacity - State layer opacity on press for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-icon-color - Icon color on press for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-selected-icon-color - Selected icon color on press for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-label-color - Label color on press for the vibrant variant.
 * @cssprop --m3e-toolbar-vibrant-pressed-selected-label-color - Selected label color on press for the vibrant variant.
 */
let M3eToolbarElement = class M3eToolbarElement extends Vertical(Role(AttachInternals(LitElement), "toolbar")) {
  constructor() {
    super(...arguments);
    _M3eToolbarElement_instances.add(this);
    /** @private */
    _M3eToolbarElement_directionalitySubscription.set(this, void 0);
    /** @private */
    _M3eToolbarElement_focusKeyManager.set(this, new RovingTabIndexManager().withHomeAndEnd().withWrap().withDirectionality(M3eDirectionality.current));
    /**
     * The appearance variant of the toolbar.
     * @default "standard"
     */
    this.variant = "standard";
    /**
     * The shape of the toolbar.
     * @default "square"
     */
    this.shape = "square";
    /**
     * Whether the toolbar is elevated.
     * @default false
     */
    this.elevated = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_applyShape).call(this);
    __classPrivateFieldSet(this, _M3eToolbarElement_directionalitySubscription, M3eDirectionality.observe(() => __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").directionality = M3eDirectionality.current), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eToolbarElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("shape")) {
      __classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_applyShape).call(this);
    }
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_applyVariant).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("vertical")) {
      __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").vertical = this.vertical;
    }
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-state-layer class="state-layer"></m3e-state-layer><m3e-elevation class="elevation" level="${this.elevated ? 3 : 0}"></m3e-elevation><div class="base"><slot @click="${__classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_handleClick)}" @keydown="${__classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_handleKeyDown)}" @slotchange="${__classPrivateFieldGet(this, _M3eToolbarElement_instances, "m", _M3eToolbarElement_handleSlotChange)}"></slot></div>`;
  }
};
_M3eToolbarElement_directionalitySubscription = new WeakMap();
_M3eToolbarElement_focusKeyManager = new WeakMap();
_M3eToolbarElement_instances = new WeakSet();
_M3eToolbarElement_applyShape = function _M3eToolbarElement_applyShape() {
  if (!isToolbarShape(this.shape)) {
    this.shape = "square";
  }
  setCustomEnumState(this, this.shape, "rounded", "square");
};
_M3eToolbarElement_applyVariant = function _M3eToolbarElement_applyVariant() {
  if (!isToolbarVariant(this.variant)) {
    this.variant = "standard";
  }
  setCustomEnumState(this, this.variant, "standard", "vibrant");
};
_M3eToolbarElement_handleSlotChange = function _M3eToolbarElement_handleSlotChange() {
  const items = M3eInteractivityChecker.findInteractiveElements(this, true);
  const {
    added
  } = __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").setItems(items);
  if (!__classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").activeItem) {
    const active = added.find(x => !x.hasAttribute("disabled"));
    if (active) {
      __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").updateActiveItem(active);
    }
  }
};
_M3eToolbarElement_handleKeyDown = function _M3eToolbarElement_handleKeyDown(e) {
  __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").onKeyDown(e);
};
_M3eToolbarElement_handleClick = function _M3eToolbarElement_handleClick(e) {
  const item = e.composedPath().find(x => x instanceof HTMLElement && __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").items.includes(x));
  if (item) {
    __classPrivateFieldGet(this, _M3eToolbarElement_focusKeyManager, "f").updateActiveItem(item);
  }
};
/** The styles of the element. */
M3eToolbarElement.styles = [ToolbarStyle, ToolbarShapeStyle, ToolbarVariantStyle];
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eToolbarElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eToolbarElement.prototype, "shape", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eToolbarElement.prototype, "elevated", void 0);
M3eToolbarElement = __decorate([customElement("m3e-toolbar")], M3eToolbarElement);

export { M3eToolbarElement, isToolbarShape, isToolbarVariant };
//# sourceMappingURL=toolbar.js.map
