/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { ReconnectedCallback, DesignToken, customElement } from './TextOverflowElement.js';
import 'lit/decorators.js';
import { getScrollbarWidth } from './getScrollbarWidth.js';
import 'lit/directives/if-defined.js';

var _M3eContentPaneElement_instances, _M3eContentPaneElement_updateScrollbarWidth;
/**
 * A shaped surface for vertically scrollable content.
 *
 * @description
 * The `m3e-content-pane` component renders a shaped surface with padding and vertical
 * scrolling for document‑like content.
 *
 * @example
 * The following example illustrates basic usage of the content pane.
 * ```html
 * <m3e-content-pane>
 *   <p>This is some scrollable content.</p>
 *   <p>More content here...</p>
 * </m3e-content-pane>
 * ```
 *
 * @tag m3e-content-pane
 *
 * @slot - Renders the content of the pane.
 *
 * @cssprop --m3e-content-pane-container-shape - Corner radius applied to the pane's outer surface.
 * @cssprop --m3e-content-pane-container-color - Background color of the pane's surface.
 * @cssprop --m3e-content-pane-container-padding - Internal padding applied to all sides of the scrollable content.
 */
let M3eContentPaneElement = class M3eContentPaneElement extends ReconnectedCallback(LitElement) {
  constructor() {
    super(...arguments);
    _M3eContentPaneElement_instances.add(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eContentPaneElement_instances, "m", _M3eContentPaneElement_updateScrollbarWidth).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eContentPaneElement_instances, "m", _M3eContentPaneElement_updateScrollbarWidth).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><div class="scroll-container"><slot></slot></div></div>`;
  }
};
_M3eContentPaneElement_instances = new WeakSet();
_M3eContentPaneElement_updateScrollbarWidth = function _M3eContentPaneElement_updateScrollbarWidth() {
  const base = this.shadowRoot?.querySelector(".base");
  if (!base) return;
  const style = getComputedStyle(base);
  const scrollbarThinWidth = style.getPropertyValue("--m3e-scrollbar-thin-width");
  const scrollbarWidth = scrollbarThinWidth.endsWith("px") ? parseFloat(scrollbarThinWidth) : getScrollbarWidth(!scrollbarThinWidth || scrollbarThinWidth === "thin");
  base.style.setProperty("--_scrollbar-width", `${scrollbarWidth}px`);
};
/** The styles of the element. */
M3eContentPaneElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .base { width: 100%; height: 100%; overflow: hidden; border-radius: var(--m3e-content-pane-container-shape, ${DesignToken.shape.corner.extraLarge}); background-color: var(--m3e-content-pane-container-color, ${DesignToken.color.surface}); transition: ${unsafeCSS(`border-radius ${DesignToken.motion.duration.medium2} ${DesignToken.motion.easing.standard}`)}; } .scroll-container { width: inherit; height: inherit; border-radius: inherit; box-sizing: border-box; overflow-y: auto; overflow-x: hidden; outline: none; padding-block: var(--m3e-content-pane-container-padding, ${DesignToken.shape.corner.value.extraLarge}); padding-inline-start: var(--m3e-content-pane-container-padding, ${DesignToken.shape.corner.value.extraLarge}); padding-inline-end: calc( var(--m3e-content-pane-container-padding, ${DesignToken.shape.corner.value.extraLarge}) - var( --_scrollbar-width, 0px ) ); scrollbar-color: ${DesignToken.scrollbar.color}; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { border-radius: unset; transition: none; } }`;
M3eContentPaneElement = __decorate([customElement("m3e-content-pane")], M3eContentPaneElement);

export { M3eContentPaneElement };
//# sourceMappingURL=content-pane.js.map
