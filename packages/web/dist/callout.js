/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { css, unsafeCSS, LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { DesignToken, AttachInternals, setCustomState, setCustomEnumState, customElement } from './TextOverflowElement.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is a `CalloutShape`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CalloutShape`.
 */
function isCalloutShape(value) {
  return value === "rounded" || value === "square";
}

/**
 * Determines whether a value is a `CalloutVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CalloutVariant`.
 */
function isCalloutVariant(value) {
  return value === "primary" || value === "secondary" || value === "tertiary" || value === "error" || value === "surface";
}

/**
 * Baseline styles for `M3eCalloutElement`.
 * @internal
 */
const CalloutStyle = css`:host { display: block; } .base { display: flex; flex-direction: column; position: relative; overflow: clip; padding-inline-start: var(--m3e-callout-leading-space, ${DesignToken.measurement.space200}); padding-inline-end: var(--m3e-callout-trailing-space, ${DesignToken.measurement.space200}); padding-block-start: calc( var(--m3e-callout-top-space, ${DesignToken.measurement.space150}) + ${DesignToken.density.calcHalf(-3)} ); padding-block-end: calc( var(--m3e-callout-bottom-space, ${DesignToken.measurement.space150}) + ${DesignToken.density.calcHalf(-3)} ); } .base::before { content: ""; position: absolute; inset: 0; inline-size: var(--m3e-callout-leading-accent-size, 4px); } .header { flex: none; display: flex; align-items: center; column-gap: var(--m3e-callout-icon-label-space, ${DesignToken.measurement.space100}); } slot[name="icon"] { font-size: var(--m3e-callout-icon-size, 24px); --m3e-icon-size: var(--m3e-callout-icon-size, 24px); } ::slotted([slot="icon"]) { font-size: inherit !important; flex: none; } ::slotted(svg[slot="icon"]) { width: 1em; height: 1em; } slot[name="label"] { font-size: var(--m3e-callout-label-font-size, ${DesignToken.typescale.standard.title.medium.fontSize}); font-weight: var(--m3e-callout-label-font-weight, ${DesignToken.typescale.standard.title.medium.fontWeight}); line-height: var(--m3e-callout-label-line-height, ${DesignToken.typescale.standard.title.medium.lineHeight}); letter-spacing: var(--m3e-callout-label-tracking, ${DesignToken.typescale.standard.title.medium.tracking}); } .content { font-size: var(--m3e-callout-content-font-size, ${DesignToken.typescale.standard.body.large.fontSize}); font-weight: var(--m3e-callout-content-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight}); line-height: var(--m3e-callout-content-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}); letter-spacing: var(--m3e-callout-content-tracking, ${DesignToken.typescale.standard.body.large.tracking}); } :host(:is(:state(--with-icon), :--with-icon)) .base, :host(:is(:state(--with-label), :--with-label)) .base { row-gap: calc( var(--m3e-callout-label-content-space, ${DesignToken.measurement.space100}) + ${DesignToken.density.calc(-3)} ); } :host(:is(:state(--rounded), :--rounded)) .base { border-radius: var(--m3e-callout-rounded-shape, ${DesignToken.shape.corner.large}); } :host(:is(:state(--square), :--square)) .base { border-radius: var(--m3e-callout-square-shape, ${DesignToken.shape.corner.none}); } @media (forced-colors: active) { .base { background-color: transparent !important; } .base::before { background-color: CanvasText !important; } slot[name="icon"], slot[name="label"], .content { color: CanvasText !important; } .base { outline: solid 1px CanvasText; } }`;

/**
 * Component design tokens that control the appearance variants of `M3eCalloutElement`.
 * @internal
 */
const CalloutVariantToken = {
  primary: {
    containerColor: unsafeCSS(`var(--m3e-primary-container-callout-container-color, var(--m3e-callout-container-color, ${DesignToken.color.primaryContainer}))`),
    labelTextColor: unsafeCSS(`var(--m3e-primary-container-callout-label-text-color, var(--m3e-callout-label-text-color, ${DesignToken.color.onPrimaryContainer}))`),
    iconColor: unsafeCSS(`var(--m3e-primary-container-callout-icon-color, var(--m3e-callout-icon-color, ${DesignToken.color.onPrimaryContainer}))`),
    contentColor: unsafeCSS(`var(--m3e-primary-container-callout-content-color, var(--m3e-callout-content-color, ${DesignToken.color.onPrimaryContainer}))`),
    leadingAccentColor: unsafeCSS(`var(--m3e-primary-container-callout-leading-accent-color, var(--m3e-callout-leading-accent-color, ${DesignToken.color.primary}))`)
  },
  secondary: {
    containerColor: unsafeCSS(`var(--m3e-secondary-container-callout-container-color, var(--m3e-callout-container-color, ${DesignToken.color.secondaryContainer}))`),
    labelTextColor: unsafeCSS(`var(--m3e-secondary-container-callout-label-text-color, var(--m3e-callout-label-text-color, ${DesignToken.color.onSecondaryContainer}))`),
    iconColor: unsafeCSS(`var(--m3e-secondary-container-callout-icon-color, var(--m3e-callout-icon-color, ${DesignToken.color.onSecondaryContainer}))`),
    contentColor: unsafeCSS(`var(--m3e-secondary-container-callout-content-color, var(--m3e-callout-content-color, ${DesignToken.color.onSecondaryContainer}))`),
    leadingAccentColor: unsafeCSS(`var(--m3e-secondary-container-callout-leading-accent-color, var(--m3e-callout-leading-accent-color, ${DesignToken.color.secondary}))`)
  },
  tertiary: {
    containerColor: unsafeCSS(`var(--m3e-tertiary-container-callout-container-color, var(--m3e-callout-container-color, ${DesignToken.color.tertiaryContainer}))`),
    labelTextColor: unsafeCSS(`var(--m3e-tertiary-container-callout-label-text-color, var(--m3e-callout-label-text-color, ${DesignToken.color.onTertiaryContainer}))`),
    iconColor: unsafeCSS(`var(--m3e-tertiary-container-callout-icon-color, var(--m3e-callout-icon-color, ${DesignToken.color.onTertiaryContainer}))`),
    contentColor: unsafeCSS(`var(--m3e-tertiary-container-callout-content-color, var(--m3e-callout-content-color, ${DesignToken.color.onTertiaryContainer}))`),
    leadingAccentColor: unsafeCSS(`var(--m3e-tertiary-container-callout-leading-accent-color, var(--m3e-callout-leading-accent-color, ${DesignToken.color.tertiary}))`)
  },
  error: {
    containerColor: unsafeCSS(`var(--m3e-error-container-callout-container-color, var(--m3e-callout-container-color, ${DesignToken.color.errorContainer}))`),
    labelTextColor: unsafeCSS(`var(--m3e-error-container-callout-label-text-color, var(--m3e-callout-label-text-color, ${DesignToken.color.onErrorContainer}))`),
    iconColor: unsafeCSS(`var(--m3e-error-container-callout-icon-color, var(--m3e-callout-icon-color, ${DesignToken.color.onErrorContainer}))`),
    contentColor: unsafeCSS(`var(--m3e-error-container-callout-content-color, var(--m3e-callout-content-color, ${DesignToken.color.onErrorContainer}))`),
    leadingAccentColor: unsafeCSS(`var(--m3e-error-container-callout-leading-accent-color, var(--m3e-callout-leading-accent-color, ${DesignToken.color.error}))`)
  },
  surface: {
    containerColor: unsafeCSS(`var(--m3e-surface-callout-container-color, var(--m3e-callout-container-color, ${DesignToken.color.surfaceContainer}))`),
    labelTextColor: unsafeCSS(`var(--m3e-surface-callout-label-text-color, var(--m3e-callout-label-text-color, ${DesignToken.color.onSurface}))`),
    iconColor: unsafeCSS(`var(--m3e-surface-callout-icon-color, var(--m3e-callout-icon-color, ${DesignToken.color.onSurface}))`),
    contentColor: unsafeCSS(`var(--m3e-surface-callout-content-color, var(--m3e-callout-content-color, ${DesignToken.color.onSurface}))`),
    leadingAccentColor: unsafeCSS(`var(--m3e-surface-callout-leading-accent-color, var(--m3e-callout-leading-accent-color, ${DesignToken.color.outlineVariant}))`)
  }
};

/** @private */
function calloutVariantStyle(variant) {
  const selector = unsafeCSS(`:is(:state(--${variant}), :--${variant})`);
  return css`:host(${selector}) .base { background-color: ${CalloutVariantToken[variant].containerColor}; } :host(${selector}) .base::before { background-color: ${CalloutVariantToken[variant].leadingAccentColor}; } :host(${selector}) slot[name="icon"] { color: ${CalloutVariantToken[variant].iconColor}; } :host(${selector}) slot[name="label"] { color: ${CalloutVariantToken[variant].labelTextColor}; } :host(${selector}) .content { color: ${CalloutVariantToken[variant].contentColor}; }`;
}
/**
 * Appearance variant styles for `M3eCalloutElement`.
 * @internal
 */
const CalloutVariantStyle = [calloutVariantStyle("primary"), calloutVariantStyle("secondary"), calloutVariantStyle("tertiary"), calloutVariantStyle("error"), calloutVariantStyle("surface")];

var _M3eCalloutElement_instances, _M3eCalloutElement_handleIconSlotChange, _M3eCalloutElement_handleLabelSlotChange, _M3eCalloutElement_applyVariant, _M3eCalloutElement_applyShape;
/**
 * A supporting container used to present content with visual emphasis.
 *
 * @description
 * The `m3e-callout` component provides a visually distinct supporting container
 * for contextual or supplemental information. A callout typically includes an
 * icon, heading, and text-based content that helps draw attention to important details
 * without disrupting the primary content flow.
 *
 * @example
 * The following example illustrates a callout including an icon, label, and text-based content.
 * ```html
 * <m3e-callout>
 *  <m3e-icon slot="icon" name="info"></m3e-icon>
 *  <span slot="label">Lorem ipsum dolor sit amet</span>
 *  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
 *  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
 *  ea commodo consequat.
 * </m3e-callout>
 * ```
 *
 * @tag m3e-callout
 *
 * @slot - Renders the text-based content of the callout.
 * @slot icon - Renders the icon of the callout.
 * @slot label - Renders the label of the callout.
 *
 * @attr variant - The appearance variant of the callout.
 * @attr shape - The shape of the callout.
 *
 * @cssprop --m3e-callout-leading-space - Padding at the start of the callout.
 * @cssprop --m3e-callout-trailing-space - Padding at the end of the callout.
 * @cssprop --m3e-callout-top-space - Padding at the top of the callout.
 * @cssprop --m3e-callout-bottom-space - Padding at the bottom of the callout.
 * @cssprop --m3e-callout-leading-accent-size - Width of the leading accent.
 * @cssprop --m3e-callout-icon-label-space - Space between the icon and label.
 * @cssprop --m3e-callout-icon-size - Size of the icon.
 * @cssprop --m3e-callout-label-font-size - Font size of the label.
 * @cssprop --m3e-callout-label-font-weight - Font weight of the label.
 * @cssprop --m3e-callout-label-line-height - Line height of the label.
 * @cssprop --m3e-callout-label-tracking - Letter spacing of the label.
 * @cssprop --m3e-callout-content-font-size - Font size of the content.
 * @cssprop --m3e-callout-content-font-weight - Font weight of the content.
 * @cssprop --m3e-callout-content-line-height - Line height of the content.
 * @cssprop --m3e-callout-content-tracking - Letter spacing of the content.
 * @cssprop --m3e-callout-label-content-space - Space between the header and content.
 * @cssprop --m3e-callout-rounded-shape - Corner radius of the rounded shape.
 * @cssprop --m3e-callout-square-shape - Corner radius of the square shape.
 * @cssprop --m3e-callout-container-color - Fallback background color for all variants.
 * @cssprop --m3e-callout-label-text-color - Fallback label text color for all variants.
 * @cssprop --m3e-callout-icon-color - Fallback icon color for all variants.
 * @cssprop --m3e-callout-content-color - Fallback content color for all variants.
 * @cssprop --m3e-callout-leading-accent-color - Fallback leading accent color for all variants.
 * @cssprop --m3e-primary-container-callout-container-color - Background color for the primary variant.
 * @cssprop --m3e-primary-container-callout-label-text-color - Label text color for the primary variant.
 * @cssprop --m3e-primary-container-callout-icon-color - Icon color for the primary variant.
 * @cssprop --m3e-primary-container-callout-content-color - Content color for the primary variant.
 * @cssprop --m3e-primary-container-callout-leading-accent-color - Leading accent color for the primary variant.
 * @cssprop --m3e-secondary-container-callout-container-color - Background color for the secondary variant.
 * @cssprop --m3e-secondary-container-callout-label-text-color - Label text color for the secondary variant.
 * @cssprop --m3e-secondary-container-callout-icon-color - Icon color for the secondary variant.
 * @cssprop --m3e-secondary-container-callout-content-color - Content color for the secondary variant.
 * @cssprop --m3e-secondary-container-callout-leading-accent-color - Leading accent color for the secondary variant.
 * @cssprop --m3e-tertiary-container-callout-container-color - Background color for the tertiary variant.
 * @cssprop --m3e-tertiary-container-callout-label-text-color - Label text color for the tertiary variant.
 * @cssprop --m3e-tertiary-container-callout-icon-color - Icon color for the tertiary variant.
 * @cssprop --m3e-tertiary-container-callout-content-color - Content color for the tertiary variant.
 * @cssprop --m3e-tertiary-container-callout-leading-accent-color - Leading accent color for the tertiary variant.
 * @cssprop --m3e-error-container-callout-container-color - Background color for the error variant.
 * @cssprop --m3e-error-container-callout-label-text-color - Label text color for the error variant.
 * @cssprop --m3e-error-container-callout-icon-color - Icon color for the error variant.
 * @cssprop --m3e-error-container-callout-content-color - Content color for the error variant.
 * @cssprop --m3e-error-container-callout-leading-accent-color - Leading accent color for the error variant.
 * @cssprop --m3e-surface-callout-container-color - Background color for the surface variant.
 * @cssprop --m3e-surface-callout-label-text-color - Label text color for the surface variant.
 * @cssprop --m3e-surface-callout-icon-color - Icon color for the surface variant.
 * @cssprop --m3e-surface-callout-content-color - Content color for the surface variant.
 * @cssprop --m3e-surface-callout-leading-accent-color - Leading accent color for the surface variant.
 */
let M3eCalloutElement = class M3eCalloutElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    _M3eCalloutElement_instances.add(this);
    /**
     * The appearance variant of the callout.
     * @default "secondary"
     */
    this.variant = "secondary";
    /**
     * The shape of the callout.
     * @default "rounded"
     */
    this.shape = "rounded";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eCalloutElement_instances, "m", _M3eCalloutElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eCalloutElement_instances, "m", _M3eCalloutElement_applyShape).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eCalloutElement_instances, "m", _M3eCalloutElement_applyVariant).call(this);
    }
    if (_changedProperties.has("shape")) {
      __classPrivateFieldGet(this, _M3eCalloutElement_instances, "m", _M3eCalloutElement_applyShape).call(this);
    }
  }
  /** @private */
  render() {
    return html`<aside class="base"><div class="header"><slot name="icon" @slotchange="${__classPrivateFieldGet(this, _M3eCalloutElement_instances, "m", _M3eCalloutElement_handleIconSlotChange)}"></slot><m3e-text-overflow><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eCalloutElement_instances, "m", _M3eCalloutElement_handleLabelSlotChange)}"></slot></m3e-text-overflow></div><div class="content"><slot></slot></div></aside>`;
  }
};
_M3eCalloutElement_instances = new WeakSet();
_M3eCalloutElement_handleIconSlotChange = function _M3eCalloutElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eCalloutElement_handleLabelSlotChange = function _M3eCalloutElement_handleLabelSlotChange(e) {
  setCustomState(this, "--with-label", hasAssignedNodes(e.target));
};
_M3eCalloutElement_applyVariant = function _M3eCalloutElement_applyVariant() {
  if (!isCalloutVariant(this.variant)) {
    this.variant = "secondary";
  }
  setCustomEnumState(this, this.variant, "primary", "secondary", "tertiary", "error", "surface");
};
_M3eCalloutElement_applyShape = function _M3eCalloutElement_applyShape() {
  if (!isCalloutShape(this.shape)) {
    this.shape = "rounded";
  }
  setCustomEnumState(this, this.shape, "square", "rounded");
};
/** The styles of the element. */
M3eCalloutElement.styles = [CalloutStyle, CalloutVariantStyle];
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eCalloutElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eCalloutElement.prototype, "shape", void 0);
M3eCalloutElement = __decorate([customElement("m3e-callout")], M3eCalloutElement);

export { M3eCalloutElement, isCalloutShape, isCalloutVariant };
//# sourceMappingURL=callout.js.map
