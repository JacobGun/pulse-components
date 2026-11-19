/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { Role, DesignToken, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';

/**
 * A thin line that separates content in lists or other containers.
 *
 * @description
 * The `m3e-divider` component visually separates content within layouts, lists, or containers using a thin, unobtrusive line.
 * It supports horizontal and vertical orientation, with optional inset variants to align with layout padding and visual hierarchy.
 * The divider thickness, color, and inset behavior are customizable via CSS properties to maintain consistency across surfaces.
 * It is designed to reinforce spatial relationships without drawing attention, preserving focus on primary content.
 *
 * @example
 * The following example illustrates a basic horizontal divider.
 * ```html
 * <m3e-divider></m3e-divider>
 * ```
 *
 * @tag m3e-divider
 *
 * @attr inset - Whether the divider is indented with equal padding on both sides.
 * @attr inset-start - Whether the divider is indented with padding on the leading side.
 * @attr inset-end - Whether the divider is indented with padding on the trailing side.
 * @attr vertical - Whether the divider is vertically aligned with adjacent content.
 *
 * @cssprop --m3e-divider-thickness - Thickness of the divider line.
 * @cssprop --m3e-divider-color - Color of the divider line.
 * @cssprop --m3e-divider-inset-size - When inset, fallback inset size used when no specific start or end inset is provided.
 * @cssprop --m3e-divider-inset-start-size - When inset, leading inset size.
 * @cssprop --m3e-divider-inset-end-size - When inset, trailing inset size.
 */
let M3eDividerElement = class M3eDividerElement extends Role(LitElement, "separator") {
  constructor() {
    super(...arguments);
    /**
     * Whether the divider is vertically aligned with adjacent content.
     * @default false
     */
    this.vertical = false;
    /**
     * Whether the divider is indented with equal padding on both sides.
     * @default false
     */
    this.inset = false;
    /**
     * Whether the divider is indented with padding on the leading side.
     * @default false
     */
    this.insetStart = false;
    /**
     * Whether the divider is indented with padding on the trailing side.
     * @default false
     */
    this.insetEnd = false;
  }
  /** @inheritdoc */
  render() {
    return html`<div class="line"></div>`;
  }
};
/** The styles of the element. */
M3eDividerElement.styles = css`:host { display: block; position: relative; } :host([hidden]) { display: none; } :host(:not([vertical])) { height: var(--m3e-divider-thickness, 1px); width: 100%; } :host([vertical]) { width: var(--m3e-divider-thickness, 1px); height: 100%; } .line { contain: layout style paint; box-sizing: border-box; position: absolute; } :host(:not([vertical])) .line { border-bottom: var(--m3e-divider-thickness, 1px) solid var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); height: inherit; } :host([vertical]) .line { border-right: var(--m3e-divider-thickness, 1px) solid var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); width: inherit; } :host([vertical][inset]) .line, :host([vertical][inset-start]) .line { top: var(--m3e-divider-inset-start-size, var(--m3e-divider-inset-size, ${DesignToken.measurement.space200})); } :host(:not([vertical])[inset]) .line, :host(:not([vertical])[inset-start]) .line { left: var(--m3e-divider-inset-start-size, var(--m3e-divider-inset-size, ${DesignToken.measurement.space200})); } :host([vertical][inset]) .line, :host([vertical][inset-end]) .line { bottom: var(--m3e-divider-inset-end-size, var(--m3e-divider-inset-size, ${DesignToken.measurement.space200})); } :host(:not([vertical])[inset]) .line, :host(:not([vertical])[inset-end]) .line { right: var(--m3e-divider-inset-end-size, var(--m3e-divider-inset-size, ${DesignToken.measurement.space200})); } :host([vertical]:not([inset]):not([inset-start])) .line { top: 0; } :host(:not([vertical]):not([inset]):not([inset-start])) .line { left: 0; } :host([vertical]:not([inset]):not([inset-end])) .line { bottom: 0; } :host(:not([vertical]):not([inset]):not([inset-end])) .line { right: 0; } @media (forced-colors: active) { .line { border-color: GrayText; } }`;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eDividerElement.prototype, "vertical", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eDividerElement.prototype, "inset", void 0);
__decorate([property({
  attribute: "inset-start",
  type: Boolean,
  reflect: true
})], M3eDividerElement.prototype, "insetStart", void 0);
__decorate([property({
  attribute: "inset-end",
  type: Boolean,
  reflect: true
})], M3eDividerElement.prototype, "insetEnd", void 0);
M3eDividerElement = __decorate([customElement("m3e-divider")], M3eDividerElement);

export { M3eDividerElement };
//# sourceMappingURL=divider.js.map
