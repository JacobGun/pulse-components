/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { AttachInternals, setCustomEnumState, DesignToken, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';

/**
 * Determines whether a value is a `HeadingSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `HeadingSize`.
 */
function isHeadingSize(value) {
  return value === "small" || value === "medium" || value === "large";
}

/**
 * Determines whether a value is a `HeadingVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `HeadingVariant`.
 */
function isHeadingVariant(value) {
  return value === "display" || value === "headline" || value === "title" || value === "label";
}

var _M3eHeadingElement_instances, _M3eHeadingElement_applyVariant, _M3eHeadingElement_applySize;
/**
 * A heading to a page or section.
 *
 * @description
 * The `m3e-heading` component provides expressive, accessible headings for pages and sections, supporting display,
 * headline, title, and label variants in multiple sizes. It applies Material 3 typographic tokens for font size,
 * weight, line height, and letter spacing, ensuring visual hierarchy and clarity.
 *
 * @example
 * The following example illustrates use of the `m3e-heading` to present each variant and size.
 * ```html
 * <m3e-heading variant="display" size="large">Display Large</m3e-heading>
 * <m3e-heading variant="display" size="medium">Display Medium</m3e-heading>
 * <m3e-heading variant="display" size="small">Display Small</m3e-heading>
 * <m3e-heading variant="headline" size="large">Headline Large</m3e-heading>
 * <m3e-heading variant="headline" size="medium">Headline Medium</m3e-heading>
 * <m3e-heading variant="headline" size="small">Headline Small</m3e-heading>
 * <m3e-heading variant="title" size="large">Title Large</m3e-heading>
 * <m3e-heading variant="title" size="medium">Title Medium</m3e-heading>
 * <m3e-heading variant="title" size="small">Title Small</m3e-heading>
 * <m3e-heading variant="label" size="large">Label Large</m3e-heading>
 * <m3e-heading variant="label" size="medium">Label Medium</m3e-heading>
 * <m3e-heading variant="label" size="small">Label Small</m3e-heading>
 * ```
 *
 * @example
 * The next example illustrates use of the `level` attribute to designate the accessibility level of a heading.
 * When specified, ARIA `role="heading"` is applied and the `level` is propagated to `aria-level`.
 * ```html
 * <m3e-heading variant="headline" size="large" level="1">Page title</m3e-heading>
 * ```
 *
 * @tag m3e-heading
 *
 * @slot - Renders the content of the heading.
 *
 * @attr emphasized - Whether the heading uses an emphasized typescale.
 * @attr level - The accessibility level of the heading.
 * @attr size - The size of the heading.
 * @attr variant - The appearance variant of the heading.
 *
 * @cssprop --md-sys-typescale-display-large-font-size - Font size for Display Large text, ideal for hero headlines
 * @cssprop --md-sys-typescale-display-large-font-weight - Font weight for Display Large text
 * @cssprop --md-sys-typescale-display-large-tracking - Letter spacing for Display Large text
 * @cssprop --md-sys-typescale-display-large-line-height - Line height for Display Large text
 * @cssprop --md-sys-typescale-display-medium-font-size - Font size for Display Medium text
 * @cssprop --md-sys-typescale-display-medium-font-weight - Font weight for Display Medium text
 * @cssprop --md-sys-typescale-display-medium-tracking - Letter spacing for Display Medium text
 * @cssprop --md-sys-typescale-display-medium-line-height - Line height for Display Medium text
 * @cssprop --md-sys-typescale-display-small-font-size - Font size for Display Small text
 * @cssprop --md-sys-typescale-display-small-font-weight - Font weight for Display Small text
 * @cssprop --md-sys-typescale-display-small-tracking - Letter spacing for Display Small text
 * @cssprop --md-sys-typescale-display-small-line-height - Line height for Display Small text
 * @cssprop --md-sys-typescale-headline-large-font-size - Font size for Headline Large text
 * @cssprop --md-sys-typescale-headline-large-font-weight - Font weight for Headline Large text
 * @cssprop --md-sys-typescale-headline-large-tracking - Letter spacing for Headline Large text
 * @cssprop --md-sys-typescale-headline-large-line-height - Line height for Headline Large text
 * @cssprop --md-sys-typescale-headline-medium-font-size - Font size for Headline Medium text
 * @cssprop --md-sys-typescale-headline-medium-font-weight - Font weight for Headline Medium text
 * @cssprop --md-sys-typescale-headline-medium-tracking - Letter spacing for Headline Medium text
 * @cssprop --md-sys-typescale-headline-medium-line-height - Line height for Headline Medium text
 * @cssprop --md-sys-typescale-headline-small-font-size - Font size for Headline Small text
 * @cssprop --md-sys-typescale-headline-small-font-weight - Font weight for Headline Small text
 * @cssprop --md-sys-typescale-headline-small-tracking - Letter spacing for Headline Small text
 * @cssprop --md-sys-typescale-headline-small-line-height - Line height for Headline Small text
 * @cssprop --md-sys-typescale-title-large-font-size - Font size for Title Large text
 * @cssprop --md-sys-typescale-title-large-font-weight - Font weight for Title Large text
 * @cssprop --md-sys-typescale-title-large-tracking - Letter spacing for Title Large text
 * @cssprop --md-sys-typescale-title-large-line-height - Line height for Title Large text
 * @cssprop --md-sys-typescale-title-medium-font-size - Font size for Title Medium text
 * @cssprop --md-sys-typescale-title-medium-font-weight - Font weight for Title Medium text
 * @cssprop --md-sys-typescale-title-medium-tracking - Letter spacing for Title Medium text
 * @cssprop --md-sys-typescale-title-medium-line-height - Line height for Title Medium text
 * @cssprop --md-sys-typescale-title-small-font-size - Font size for Title Small text
 * @cssprop --md-sys-typescale-title-small-font-weight - Font weight for Title Small text
 * @cssprop --md-sys-typescale-title-small-tracking - Letter spacing for Title Small text
 * @cssprop --md-sys-typescale-title-small-line-height - Line height for Title Small text
 * @cssprop --md-sys-typescale-label-large-font-size - Font size for Label Large text
 * @cssprop --md-sys-typescale-label-large-font-weight - Font weight for Label Large text
 * @cssprop --md-sys-typescale-label-large-tracking - Letter spacing for Label Large text
 * @cssprop --md-sys-typescale-label-large-line-height - Line height for Label Large text
 * @cssprop --md-sys-typescale-label-medium-font-size - Font size for Label Medium text
 * @cssprop --md-sys-typescale-label-medium-font-weight - Font weight for Label Medium text
 * @cssprop --md-sys-typescale-label-medium-tracking - Letter spacing for Label Medium text
 * @cssprop --md-sys-typescale-label-medium-line-height - Line height for Label Medium text
 * @cssprop --md-sys-typescale-label-small-font-size - Font size for Label Small text
 * @cssprop --md-sys-typescale-label-small-font-weight - Font weight for Label Small text
 * @cssprop --md-sys-typescale-label-small-tracking - Letter spacing for Label Small text
 * @cssprop --md-sys-typescale-label-small-line-height - Line height for Label Small text
 * @cssprop --md-sys-typescale-emphasized-display-large-font-size - Font size for emphasized Display Large text
 * @cssprop --md-sys-typescale-emphasized-display-large-font-weight - Font weight for emphasized Display Large text
 * @cssprop --md-sys-typescale-emphasized-display-large-tracking - Letter spacing for emphasized Display Large text
 * @cssprop --md-sys-typescale-emphasized-display-large-line-height - Line height for emphasized Display Large text
 * @cssprop --md-sys-typescale-emphasized-display-medium-font-size - Font size for emphasized Display Medium text
 * @cssprop --md-sys-typescale-emphasized-display-medium-font-weight - Font weight for emphasized Display Medium text
 * @cssprop --md-sys-typescale-emphasized-display-medium-tracking - Letter spacing for emphasized Display Medium text
 * @cssprop --md-sys-typescale-emphasized-display-medium-line-height - Line height for emphasized Display Medium text
 * @cssprop --md-sys-typescale-emphasized-display-small-font-size - Font size for emphasized Display Small text
 * @cssprop --md-sys-typescale-emphasized-display-small-font-weight - Font weight for emphasized Display Small text
 * @cssprop --md-sys-typescale-emphasized-display-small-tracking - Letter spacing for emphasized Display Small text
 * @cssprop --md-sys-typescale-emphasized-display-small-line-height - Line height for emphasized Display Small text
 * @cssprop --md-sys-typescale-emphasized-headline-large-font-size - Font size for emphasized Headline Large text
 * @cssprop --md-sys-typescale-emphasized-headline-large-font-weight - Font weight for emphasized Headline Large text
 * @cssprop --md-sys-typescale-emphasized-headline-large-tracking - Letter spacing for emphasized Headline Large text
 * @cssprop --md-sys-typescale-emphasized-headline-large-line-height - Line height for emphasized Headline Large text
 * @cssprop --md-sys-typescale-emphasized-headline-medium-font-size - Font size for emphasized Headline Medium text
 * @cssprop --md-sys-typescale-emphasized-headline-medium-font-weight - Font weight for emphasized Headline Medium text
 * @cssprop --md-sys-typescale-emphasized-headline-medium-tracking - Letter spacing for emphasized Headline Medium text
 * @cssprop --md-sys-typescale-emphasized-headline-medium-line-height - Line height for emphasized Headline Medium text
 * @cssprop --md-sys-typescale-emphasized-headline-small-font-size - Font size for emphasized Headline Small text
 * @cssprop --md-sys-typescale-emphasized-headline-small-font-weight - Font weight for emphasized Headline Small text
 * @cssprop --md-sys-typescale-emphasized-headline-small-tracking - Letter spacing for emphasized Headline Small text
 * @cssprop --md-sys-typescale-emphasized-headline-small-line-height - Line height for emphasized Headline Small text
 * @cssprop --md-sys-typescale-emphasized-title-large-font-size - Font size for emphasized Title Large text
 * @cssprop --md-sys-typescale-emphasized-title-large-font-weight - Font weight for emphasized Title Large text
 * @cssprop --md-sys-typescale-emphasized-title-large-tracking - Letter spacing for emphasized Title Large text
 * @cssprop --md-sys-typescale-emphasized-title-large-line-height - Line height for emphasized Title Large text
 * @cssprop --md-sys-typescale-emphasized-title-medium-font-size - Font size for emphasized Title Medium text
 * @cssprop --md-sys-typescale-emphasized-title-medium-font-weight - Font weight for emphasized Title Medium text
 * @cssprop --md-sys-typescale-emphasized-title-medium-tracking - Letter spacing for emphasized Title Medium text
 * @cssprop --md-sys-typescale-emphasized-title-medium-line-height - Line height for emphasized Title Medium text
 * @cssprop --md-sys-typescale-emphasized-title-small-font-size - Font size for emphasized Title Small text
 * @cssprop --md-sys-typescale-emphasized-title-small-font-weight - Font weight for emphasized Title Small text
 * @cssprop --md-sys-typescale-emphasized-title-small-tracking - Letter spacing for emphasized Title Small text
 * @cssprop --md-sys-typescale-emphasized-title-small-line-height - Line height for emphasized Title Small text
 * @cssprop --md-sys-typescale-emphasized-label-large-font-size - Font size for emphasized Label Large text
 * @cssprop --md-sys-typescale-emphasized-label-large-font-weight - Font weight for emphasized Label Large text
 * @cssprop --md-sys-typescale-emphasized-label-large-tracking - Letter spacing for emphasized Label Large text
 * @cssprop --md-sys-typescale-emphasized-label-large-line-height - Line height for emphasized Label Large text
 * @cssprop --md-sys-typescale-emphasized-label-medium-font-size - Font size for emphasized Label Medium text
 * @cssprop --md-sys-typescale-emphasized-label-medium-font-weight - Font weight for emphasized Label Medium text
 * @cssprop --md-sys-typescale-emphasized-label-medium-tracking - Letter spacing for emphasized Label Medium text
 * @cssprop --md-sys-typescale-emphasized-label-medium-line-height - Line height for emphasized Label Medium text
 * @cssprop --md-sys-typescale-emphasized-label-small-font-size - Font size for emphasized Label Small text
 * @cssprop --md-sys-typescale-emphasized-label-small-font-weight - Font weight for emphasized Label Small text
 * @cssprop --md-sys-typescale-emphasized-label-small-tracking - Letter spacing for emphasized Label Small text
 * @cssprop --md-sys-typescale-emphasized-label-small-line-height - Line height for emphasized Label Small text
 */
let M3eHeadingElement = class M3eHeadingElement extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    _M3eHeadingElement_instances.add(this);
    /**
     * Whether the heading uses an emphasized typescale.
     * @default false
     */
    this.emphasized = false;
    /**
     * The appearance variant of the heading.
     * @default "display"
     */
    this.variant = "display";
    /**
     * The size of the heading.
     * @default "medium"
     */
    this.size = "medium";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eHeadingElement_instances, "m", _M3eHeadingElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eHeadingElement_instances, "m", _M3eHeadingElement_applySize).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eHeadingElement_instances, "m", _M3eHeadingElement_applyVariant).call(this);
    }
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eHeadingElement_instances, "m", _M3eHeadingElement_applySize).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("level")) {
      if (typeof this.level !== "number") {
        this.removeAttribute("aria-level");
        this.removeAttribute("role");
      } else {
        this.setAttribute("aria-level", `${this.level}`);
        this.setAttribute("role", "heading");
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot></slot>`;
  }
};
_M3eHeadingElement_instances = new WeakSet();
_M3eHeadingElement_applyVariant = function _M3eHeadingElement_applyVariant() {
  if (!isHeadingVariant(this.variant)) {
    this.variant = "display";
  }
  setCustomEnumState(this, this.variant, "display", "headline", "label", "title");
};
_M3eHeadingElement_applySize = function _M3eHeadingElement_applySize() {
  if (!isHeadingSize(this.size)) {
    this.size = "medium";
  }
  setCustomEnumState(this, this.size, "large", "medium", "small");
};
/** The styles of the element. */
M3eHeadingElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } :host(:is(:state(--display), :--display):is(:state(--large), :--large):not([emphasized])) { font-size: ${DesignToken.typescale.standard.display.large.fontSize}; font-weight: ${DesignToken.typescale.standard.display.large.fontWeight}; line-height: ${DesignToken.typescale.standard.display.large.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.display.large.tracking}; } :host(:is(:state(--display), :--display):is(:state(--medium), :--medium):not([emphasized])) { font-size: ${DesignToken.typescale.standard.display.medium.fontSize}; font-weight: ${DesignToken.typescale.standard.display.medium.fontWeight}; line-height: ${DesignToken.typescale.standard.display.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.display.medium.tracking}; } :host(:is(:state(--display), :--display):is(:state(--small), :--small):not([emphasized])) { font-size: ${DesignToken.typescale.standard.display.small.fontSize}; font-weight: ${DesignToken.typescale.standard.display.small.fontWeight}; line-height: ${DesignToken.typescale.standard.display.small.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.display.small.tracking}; } :host(:is(:state(--headline), :--headline):is(:state(--large), :--large):not([emphasized])) { font-size: ${DesignToken.typescale.standard.headline.large.fontSize}; font-weight: ${DesignToken.typescale.standard.headline.large.fontWeight}; line-height: ${DesignToken.typescale.standard.headline.large.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.headline.large.tracking}; } :host(:is(:state(--headline), :--headline):is(:state(--medium), :--medium):not([emphasized])) { font-size: ${DesignToken.typescale.standard.headline.medium.fontSize}; font-weight: ${DesignToken.typescale.standard.headline.medium.fontWeight}; line-height: ${DesignToken.typescale.standard.headline.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.headline.medium.tracking}; } :host(:is(:state(--headline), :--headline):is(:state(--small), :--small):not([emphasized])) { font-size: ${DesignToken.typescale.standard.headline.small.fontSize}; font-weight: ${DesignToken.typescale.standard.headline.small.fontWeight}; line-height: ${DesignToken.typescale.standard.headline.small.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.headline.small.tracking}; } :host(:is(:state(--title), :--title):is(:state(--large), :--large):not([emphasized])) { font-size: ${DesignToken.typescale.standard.title.large.fontSize}; font-weight: ${DesignToken.typescale.standard.title.large.fontWeight}; line-height: ${DesignToken.typescale.standard.title.large.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.title.large.tracking}; } :host(:is(:state(--title), :--title):is(:state(--medium), :--medium):not([emphasized])) { font-size: ${DesignToken.typescale.standard.title.medium.fontSize}; font-weight: ${DesignToken.typescale.standard.title.medium.fontWeight}; line-height: ${DesignToken.typescale.standard.title.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.title.medium.tracking}; } :host(:is(:state(--title), :--title):is(:state(--small), :--small):not([emphasized])) { font-size: ${DesignToken.typescale.standard.title.small.fontSize}; font-weight: ${DesignToken.typescale.standard.title.small.fontWeight}; line-height: ${DesignToken.typescale.standard.title.small.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.title.small.tracking}; } :host(:is(:state(--label), :--label):is(:state(--large), :--large):not([emphasized])) { font-size: ${DesignToken.typescale.standard.label.large.fontSize}; font-weight: ${DesignToken.typescale.standard.label.large.fontWeight}; line-height: ${DesignToken.typescale.standard.label.large.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.label.large.tracking}; } :host(:is(:state(--label), :--label):is(:state(--medium), :--medium):not([emphasized])) { font-size: ${DesignToken.typescale.standard.label.medium.fontSize}; font-weight: ${DesignToken.typescale.standard.label.medium.fontWeight}; line-height: ${DesignToken.typescale.standard.label.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.label.medium.tracking}; } :host(:is(:state(--label), :--label):is(:state(--small), :--small):not([emphasized])) { font-size: ${DesignToken.typescale.standard.label.small.fontSize}; font-weight: ${DesignToken.typescale.standard.label.small.fontWeight}; line-height: ${DesignToken.typescale.standard.label.small.lineHeight}; letter-spacing: ${DesignToken.typescale.standard.label.small.tracking}; } :host(:is(:state(--display), :--display):is(:state(--large), :--large)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.display.large.fontSize}; font-weight: ${DesignToken.typescale.emphasized.display.large.fontWeight}; line-height: ${DesignToken.typescale.emphasized.display.large.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.display.large.tracking}; } :host(:is(:state(--display), :--display):is(:state(--medium), :--medium)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.display.medium.fontSize}; font-weight: ${DesignToken.typescale.emphasized.display.medium.fontWeight}; line-height: ${DesignToken.typescale.emphasized.display.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.display.medium.tracking}; } :host(:is(:state(--display), :--display):is(:state(--small), :--small)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.display.small.fontSize}; font-weight: ${DesignToken.typescale.emphasized.display.small.fontWeight}; line-height: ${DesignToken.typescale.emphasized.display.small.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.display.small.tracking}; } :host(:is(:state(--headline), :--headline):is(:state(--large), :--large)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.headline.large.fontSize}; font-weight: ${DesignToken.typescale.emphasized.headline.large.fontWeight}; line-height: ${DesignToken.typescale.emphasized.headline.large.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.headline.large.tracking}; } :host(:is(:state(--headline), :--headline):is(:state(--medium), :--medium)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.headline.medium.fontSize}; font-weight: ${DesignToken.typescale.emphasized.headline.medium.fontWeight}; line-height: ${DesignToken.typescale.emphasized.headline.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.headline.medium.tracking}; } :host(:is(:state(--headline), :--headline):is(:state(--small), :--small)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.headline.small.fontSize}; font-weight: ${DesignToken.typescale.emphasized.headline.small.fontWeight}; line-height: ${DesignToken.typescale.emphasized.headline.small.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.headline.small.tracking}; } :host(:is(:state(--title), :--title):is(:state(--large), :--large)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.title.large.fontSize}; font-weight: ${DesignToken.typescale.emphasized.title.large.fontWeight}; line-height: ${DesignToken.typescale.emphasized.title.large.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.title.large.tracking}; } :host(:is(:state(--title), :--title):is(:state(--medium), :--medium)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.title.medium.fontSize}; font-weight: ${DesignToken.typescale.emphasized.title.medium.fontWeight}; line-height: ${DesignToken.typescale.emphasized.title.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.title.medium.tracking}; } :host(:is(:state(--title), :--title):is(:state(--small), :--small)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.title.small.fontSize}; font-weight: ${DesignToken.typescale.emphasized.title.small.fontWeight}; line-height: ${DesignToken.typescale.emphasized.title.small.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.title.small.tracking}; } :host(:is(:state(--label), :--label):is(:state(--large), :--large)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.label.large.fontSize}; font-weight: ${DesignToken.typescale.emphasized.label.large.fontWeight}; line-height: ${DesignToken.typescale.emphasized.label.large.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.label.large.tracking}; } :host(:is(:state(--label), :--label):is(:state(--medium), :--medium)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.label.medium.fontSize}; font-weight: ${DesignToken.typescale.emphasized.label.medium.fontWeight}; line-height: ${DesignToken.typescale.emphasized.label.medium.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.label.medium.tracking}; } :host(:is(:state(--label), :--label):is(:state(--small), :--small)[emphasized]) { font-size: ${DesignToken.typescale.emphasized.label.small.fontSize}; font-weight: ${DesignToken.typescale.emphasized.label.small.fontWeight}; line-height: ${DesignToken.typescale.emphasized.label.small.lineHeight}; letter-spacing: ${DesignToken.typescale.emphasized.label.small.tracking}; }`;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eHeadingElement.prototype, "emphasized", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eHeadingElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eHeadingElement.prototype, "size", void 0);
__decorate([property({
  type: Number
})], M3eHeadingElement.prototype, "level", void 0);
M3eHeadingElement = __decorate([customElement("m3e-heading")], M3eHeadingElement);

export { M3eHeadingElement, isHeadingSize, isHeadingVariant };
//# sourceMappingURL=heading.js.map
