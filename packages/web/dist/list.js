/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { ReconnectedCallback, AttachInternals, Role, ResizeController, setCustomState, DesignToken, customElement, setCustomEnumState, Disabled, FocusController, PressedController, HoverController } from './TextOverflowElement.js';
import { property, query } from 'lit/decorators.js';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { computeLineCount } from './computeLineCount.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';
import { Selected } from './Selected.js';
import { getTextContent } from './getTextContent.js';
import { selectionManager, SelectionManager } from './LiveAnnouncer.js';
import { Labelled, Dirty, Touched, FormAssociated, formValue } from './FormAssociated.js';

/**
 * Determines whether a value is a `ListVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ListVariant`.
 */
function isListVariant(value) {
  return value === "standard" || value === "segmented";
}

var _M3eListItemElement_instances, _M3eListItemElement_resizeController, _M3eListItemElement_lines, _M3eListItemElement_leadingContentType, _M3eListItemElement_trailingContentType, _M3eListItemElement_initialize, _M3eListItemElement_updateMultiline, _M3eListItemElement_getSlotContentType;
/**
 * An item in a list.
 *
 * @description
 * The `m3e-list-item` component represents a single item within a list. It supports rich
 * content, leading/trailing media, overline, supporting text, and trailing supporting text
 * via named slots. The component is highly customizable through CSS custom properties and
 * is designed for accessibility and flexible layout.
 *
 * @example
 * The following example illustrates a list with a single item using all supported slots.
 *
 * Note: This example uses the `@m3e/icon` package to present Material Design symbols, but any icon package can be
 * substituted depending on your design system or preferences
 *
 * ```html
 * <m3e-list>
 *  <m3e-list-item>
 *    <m3e-icon slot="leading" name="person"></m3e-icon>
 *    <span slot="overline">Overline</span>
 *    Headline
 *    <span slot="supporting-text">Supporting text</span>
 *    <m3e-icon slot="trailing" name="arrow_right"></m3e-icon>
 *  </m3e-list-item>
 * </m3e-list>
 * ```
 *
 * @tag m3e-list-item
 *
 * @slot - Renders the content of the list item.
 * @slot leading - Renders the leading content of the list item.
 * @slot overline - Renders the overline of the list item.
 * @slot supporting-text - Renders the supporting text of the list item.
 * @slot trailing - Renders the trailing content of the list item.
 *
 * @cssprop --m3e-list-item-between-space - Horizontal gap between elements.
 * @cssprop --m3e-list-item-leading-space - Horizontal padding for the leading side.
 * @cssprop --m3e-list-item-trailing-space - Horizontal padding for the trailing side.
 * @cssprop --m3e-list-item-padding-inline - Horizontal padding for the list item.
 * @cssprop --m3e-list-item-padding-block - Vertical padding for the list item.
 * @cssprop --m3e-list-item-one-line-top-space - Top padding for one-line items.
 * @cssprop --m3e-list-item-one-line-bottom-space - Bottom padding for one-line items.
 * @cssprop --m3e-list-item-two-line-top-space - Top padding for two-line items.
 * @cssprop --m3e-list-item-two-line-bottom-space - Bottom padding for two-line items.
 * @cssprop --m3e-list-item-three-line-top-space - Top padding for three-line items.
 * @cssprop --m3e-list-item-three-line-bottom-space - Bottom padding for three-line items.
 * @cssprop --m3e-list-item-font-size - Font size for main content.
 * @cssprop --m3e-list-item-font-weight - Font weight for main content.
 * @cssprop --m3e-list-item-line-height - Line height for main content.
 * @cssprop --m3e-list-item-tracking - Letter spacing for main content.
 * @cssprop --m3e-list-item-overline-font-size - Font size for overline slot.
 * @cssprop --m3e-list-item-overline-font-weight - Font weight for overline slot.
 * @cssprop --m3e-list-item-overline-line-height - Line height for overline slot.
 * @cssprop --m3e-list-item-overline-tracking - Letter spacing for overline slot.
 * @cssprop --m3e-list-item-supporting-text-font-size - Font size for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-font-weight - Font weight for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-line-height - Line height for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-tracking - Letter spacing for supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-size - Font size for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-weight - Font weight for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-line-height - Line height for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-tracking - Letter spacing for trailing supporting text slot.
 * @cssprop --m3e-list-item-icon-size - Size for leading/trailing icons.
 * @cssprop --m3e-list-item-label-text-color - Color for the main content.
 * @cssprop --m3e-list-item-overline-color - Color for the overline slot.
 * @cssprop --m3e-list-item-supporting-text-color - Color for the supporting text slot.
 * @cssprop --m3e-list-item-leading-color - Color for the leading content.
 * @cssprop --m3e-list-item-trailing-color - Color for the trailing content.
 * @cssprop --m3e-list-item-container-color - Background color of the list item.
 * @cssprop --m3e-list-item-container-shape - Border radius of the list item.
 * @cssprop --m3e-list-item-hover-container-shape - Border radius of the list item on hover.
 * @cssprop --m3e-list-item-focus-container-shape - Border radius of the list item on focus.
 * @cssprop --m3e-list-item-video-width - Width of the video slot.
 * @cssprop --m3e-list-item-video-height - Height of the video slot.
 * @cssprop --m3e-list-item-video-shape - Border radius of the video slot.
 * @cssprop --m3e-list-item-image-width - Width of the image slot.
 * @cssprop --m3e-list-item-image-height - Height of the image slot.
 * @cssprop --m3e-list-item-image-shape - Border radius of the image slot.
 * @cssprop --m3e-list-item-three-line-top-offset - Top offset for media in three line items.
 * @cssprop --m3e-list-item-one-line-height - Minimum height of a one line list item.
 * @cssprop --m3e-list-item-two-line-height - Minimum height of a two line list item.
 * @cssprop --m3e-list-item-three-line-height - Minimum height of a three line list item.
 */
let M3eListItemElement = class M3eListItemElement extends ReconnectedCallback(AttachInternals(Role(LitElement, "listitem"))) {
  constructor() {
    super(...arguments);
    _M3eListItemElement_instances.add(this);
    /** @private */
    _M3eListItemElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      callback: () => __classPrivateFieldGet(this, _M3eListItemElement_instances, "m", _M3eListItemElement_updateMultiline).call(this)
    }));
    /** @private */
    _M3eListItemElement_lines.set(this, void 0);
    /** @private */
    _M3eListItemElement_leadingContentType.set(this, void 0);
    /** @private */
    _M3eListItemElement_trailingContentType.set(this, void 0);
  }
  /** The type of leading content. */
  get leadingContentType() {
    return __classPrivateFieldGet(this, _M3eListItemElement_leadingContentType, "f");
  }
  /** The type of trailing content. */
  get trailingContentType() {
    return __classPrivateFieldGet(this, _M3eListItemElement_trailingContentType, "f");
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eListItemElement_instances, "m", _M3eListItemElement_initialize).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eListItemElement_instances, "m", _M3eListItemElement_initialize).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base">${this._renderBase()}</div>`;
  }
  /** @internal */
  _renderBase() {
    return html`<slot name="leading" @slotchange="${this._handleLeadingSlotChange}"><slot name="leading-icon" @slotchange="${this._handleLeadingSlotChange}"></slot></slot><div class="content"><slot name="overline"></slot><slot></slot><slot name="supporting-text"></slot></div><slot name="trailing" @slotchange="${this._handleTrailingSlotChange}"><slot name="trailing-supporting-text" @slotchange="${this._handleTrailingSlotChange}"></slot><slot name="trailing-icon" @slotchange="${this._handleTrailingSlotChange}"></slot></slot>`;
  }
  /** @internal */
  _handleLeadingSlotChange(e) {
    const contentType = __classPrivateFieldGet(this, _M3eListItemElement_leadingContentType, "f");
    __classPrivateFieldSet(this, _M3eListItemElement_leadingContentType, __classPrivateFieldGet(this, _M3eListItemElement_instances, "m", _M3eListItemElement_getSlotContentType).call(this, e.target), "f");
    setCustomState(this, "--has-leading", __classPrivateFieldGet(this, _M3eListItemElement_leadingContentType, "f") !== undefined);
    if (contentType !== __classPrivateFieldGet(this, _M3eListItemElement_leadingContentType, "f")) {
      this.closest("m3e-list,m3e-action-list,m3e-selection-list")?.notifyLeadingContentTypeChange(contentType, __classPrivateFieldGet(this, _M3eListItemElement_leadingContentType, "f"));
    }
  }
  /** @internal */
  _handleTrailingSlotChange(e) {
    const contentType = __classPrivateFieldGet(this, _M3eListItemElement_trailingContentType, "f");
    __classPrivateFieldSet(this, _M3eListItemElement_trailingContentType, __classPrivateFieldGet(this, _M3eListItemElement_instances, "m", _M3eListItemElement_getSlotContentType).call(this, e.target), "f");
    setCustomState(this, "--has-trailing", __classPrivateFieldGet(this, _M3eListItemElement_trailingContentType, "f") !== undefined);
    if (contentType !== __classPrivateFieldGet(this, _M3eListItemElement_trailingContentType, "f")) {
      this.closest("m3e-list,m3e-action-list,m3e-selection-list")?.notifyTrailingContentTypeChange(contentType, __classPrivateFieldGet(this, _M3eListItemElement_trailingContentType, "f"));
    }
  }
};
_M3eListItemElement_resizeController = new WeakMap();
_M3eListItemElement_lines = new WeakMap();
_M3eListItemElement_leadingContentType = new WeakMap();
_M3eListItemElement_trailingContentType = new WeakMap();
_M3eListItemElement_instances = new WeakSet();
_M3eListItemElement_initialize = function _M3eListItemElement_initialize() {
  const content = this.shadowRoot?.querySelector(".content");
  if (content) {
    __classPrivateFieldGet(this, _M3eListItemElement_resizeController, "f").observe(content);
  }
};
_M3eListItemElement_updateMultiline = function _M3eListItemElement_updateMultiline() {
  const content = this.shadowRoot?.querySelector(".content") ?? null;
  const lines = content === null ? 0 : computeLineCount(content);
  if (__classPrivateFieldGet(this, _M3eListItemElement_lines, "f") === lines) return;
  __classPrivateFieldSet(this, _M3eListItemElement_lines, lines, "f");
  // Defer state writes to rAF to avoid synchronous layout flush (forced reflow)
  requestAnimationFrame(() => {
    setCustomState(this, "--one-line", lines <= 1);
    setCustomState(this, "--two-line", lines == 2);
    setCustomState(this, "--three-line", lines > 2);
  });
};
_M3eListItemElement_getSlotContentType = function _M3eListItemElement_getSlotContentType(slot) {
  const elements = slot.assignedElements({
    flatten: true
  });
  if (elements.some(x => x.tagName === "VIDEO")) return "video";
  if (elements.some(x => x.tagName === "IMG")) return "image";
  if (elements.some(x => x.tagName === "M3E-AVATAR")) return "avatar";
  if (elements.some(x => x.tagName === "M3E-ICON")) return "icon";
  return elements.length > 0 ? "text" : undefined;
};
/** The styles of the element. */
M3eListItemElement.styles = css`:host { display: block; } .base { display: flex; min-height: inherit; width: 100%; box-sizing: border-box; column-gap: var(--m3e-list-item-between-space, ${DesignToken.measurement.space200}); padding-inline-start: var(--m3e-list-item-leading-space, ${DesignToken.measurement.space200}); padding-inline-end: var(--m3e-list-item-trailing-space, ${DesignToken.measurement.space200}); border-top-left-radius: var( --_list-item-top-container-shape, var(--m3e-list-item-container-shape, ${DesignToken.shape.corner.none}) ); border-top-right-radius: var( --_list-item-top-container-shape, var(--m3e-list-item-container-shape, ${DesignToken.shape.corner.none}) ); border-bottom-left-radius: var( --_list-item-bottom-container-shape, var(--m3e-list-item-container-shape, ${DesignToken.shape.corner.none}) ); border-bottom-right-radius: var( --_list-item-bottom-container-shape, var(--m3e-list-item-container-shape, ${DesignToken.shape.corner.none}) ); transition: ${unsafeCSS(`border-radius ${DesignToken.motion.spring.fastEffects}, background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--one-line), :--one-line)) { min-height: calc(var(--m3e-list-item-one-line-height, 56px) + ${DesignToken.density.calc(-3)}); } :host(:is(:state(--one-line), :--one-line)) .base { padding-block-start: var(--m3e-list-item-one-line-top-space, ${DesignToken.measurement.space100}); padding-block-end: var(--m3e-list-item-one-line-bottom-space, ${DesignToken.measurement.space100}); } :host(:is(:state(--two-line), :--two-line)) { min-height: calc(var(--m3e-list-item-two-line-height, 72px) + ${DesignToken.density.calc(-3)}); } :host(:is(:state(--two-line), :--two-line)) .base { padding-block-start: var(--m3e-list-item-two-line-top-space, ${DesignToken.measurement.space100}); padding-block-end: var(--m3e-list-item-two-line-bottom-space, ${DesignToken.measurement.space100}); } :host(:is(:state(--three-line), :--three-line)) { min-height: calc(var(--m3e-list-item-three-line-height, 88px) + ${DesignToken.density.calc(-3)}); } :host(:is(:state(--three-line), :--three-line)) .base { padding-block-start: var(--m3e-list-item-three-line-top-space, ${DesignToken.measurement.space150}); padding-block-end: var(--m3e-list-item-three-line-bottom-space, ${DesignToken.measurement.space150}); } :host(:not(:is(:state(--three-line), :--three-line))) .base { align-items: center; } :host(:is(:state(--three-line), :--three-line)) .base { align-items: flex-start; } :host(:not(:disabled):not([selected])) .base:not(.hover).focus-visible:not(.pressed) { border-top-left-radius: var( --_list-item-top-container-shape, var(--m3e-list-item-focus-container-shape, ${DesignToken.shape.corner.large}) ); border-top-right-radius: var( --_list-item-top-container-shape, var(--m3e-list-item-focus-container-shape, ${DesignToken.shape.corner.large}) ); border-bottom-left-radius: var( --_list-item-bottom-container-shape, var(--m3e-list-item-focus-container-shape, ${DesignToken.shape.corner.large}) ); border-bottom-right-radius: var( --_list-item-bottom-container-shape, var(--m3e-list-item-focus-container-shape, ${DesignToken.shape.corner.large}) ); } :host(:not(:disabled):not([selected])) .base.hover, :host(:not(:disabled):not([selected])) .base.pressed { border-top-left-radius: var( --_list-item-top-container-shape, var(--m3e-list-item-hover-container-shape, ${DesignToken.shape.corner.medium}) ); border-top-right-radius: var( --_list-item-top-container-shape, var(--m3e-list-item-hover-container-shape, ${DesignToken.shape.corner.medium}) ); border-bottom-left-radius: var( --_list-item-bottom-container-shape, var(--m3e-list-item-hover-container-shape, ${DesignToken.shape.corner.medium}) ); border-bottom-right-radius: var( --_list-item-bottom-container-shape, var(--m3e-list-item-hover-container-shape, ${DesignToken.shape.corner.medium}) ); } .content { flex: 1 1 auto; display: flex; flex-direction: column; align-items: unset; justify-content: unset; } ::slotted([slot="overline"]) { font-size: var(--m3e-list-item-overline-font-size, ${DesignToken.typescale.standard.label.small.fontSize}); font-weight: var(--m3e-list-item-overline-font-weight, ${DesignToken.typescale.standard.label.small.fontWeight}); line-height: var(--m3e-list-item-overline-line-height, ${DesignToken.typescale.standard.label.small.lineHeight}); letter-spacing: var(--m3e-list-item-overline-tracking, ${DesignToken.typescale.standard.label.small.tracking}); } ::slotted([slot="supporting-text"]) { font-size: var(--m3e-list-item-supporting-text-font-size, ${DesignToken.typescale.standard.body.medium.fontSize}); font-weight: var( --m3e-list-item-supporting-text-font-weight, ${DesignToken.typescale.standard.body.medium.fontWeight} ); line-height: var( --m3e-list-item-supporting-text-line-height, ${DesignToken.typescale.standard.body.medium.lineHeight} ); letter-spacing: var( --m3e-list-item-supporting-text-tracking, ${DesignToken.typescale.standard.body.medium.tracking} ); } ::slotted(:not([slot])) { font-size: var(--m3e-list-item-font-size, ${DesignToken.typescale.standard.body.large.fontSize}); font-weight: var(--m3e-list-item-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight}); line-height: var(--m3e-list-item-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}); letter-spacing: var(--m3e-list-item-tracking, ${DesignToken.typescale.standard.body.large.tracking}); } :host(:is(:state(--has-leading), :--has-leading)) slot[name="leading"], :host(:is(:state(--has-trailing), :--has-trailing)) slot[name="trailing"] { display: flex; justify-content: center; } :host(:not(:is(:state(--has-leading), :--has-leading))) slot[name="leading"] { display: var(--_list-item-leading-reserved-display, contents); } :host(:not(:is(:state(--has-trailing), :--has-trailing))) slot[name="trailing"] { display: var(--_list-item-trailing-reserved-display, contents); } slot[name="leading"] { min-width: var(--_list-item-leading-reserved-space, 0px); margin-inline-start: calc(0px - var(--_list-item-leading-reserved-outset, 0px)); } slot[name="trailing"] { min-width: var(--_list-item-trailing-reserved-space, 0px); margin-inline-end: calc(0px - var(--_list-item-trailing-reserved-outset, 0px)); } slot[name="leading"], slot[name="leading"] { --_icon-button-size: auto; --_icon-button-min-size: 48px; } ::slotted(span[slot="trailing"]), ::slotted([slot="trailing-supporting-text"]) { white-space: nowrap; font-size: var(--m3e-list-item-trailing-text-font-size, ${DesignToken.typescale.standard.label.small.fontSize}); font-weight: var( --m3e-list-item-trailing-text-font-weight, ${DesignToken.typescale.standard.label.small.fontWeight} ); line-height: var( --m3e-list-item-trailing-text-line-height, ${DesignToken.typescale.standard.label.small.lineHeight} ); letter-spacing: var( --m3e-list-item-trailing-text-tracking, ${DesignToken.typescale.standard.label.small.tracking} ); } ::slotted(video[slot="leading"]), ::slotted(video[slot="trailing"]), ::slotted(img[slot="leading"]), ::slotted(img[slot="trailing"]) { display: block; margin: 0 auto; overflow: hidden; object-fit: cover; } ::slotted(video) { width: var(--m3e-list-item-video-width, 100px); height: var(--m3e-list-item-video-height, 56px); } ::slotted(video[slot="leading"]), ::slotted(video[slot="trailing"]) { border-radius: var(--m3e-list-item-video-shape, ${DesignToken.shape.corner.none}); } ::slotted(video[slot="leading"]) { margin-inline-start: calc(0px - var(--_list-item-leading-video-outset, 0px)); } ::slotted(video[slot="trailing"]) { margin-inline-end: calc(0px - var(--_list-item-trailing-video-outset, 0px)); } ::slotted(img) { user-drag: none; user-select: none; pointer-events: none; width: var(--m3e-list-item-image-width, 56px); height: var(--m3e-list-item-image-height, 56px); } ::slotted(img[slot="leading"]), ::slotted(img[slot="trailing"]) { border-radius: var(--m3e-list-item-image-shape, ${DesignToken.shape.corner.none}); } ::slotted(m3e-icon[slot="leading"]), ::slotted(m3e-icon[slot="leading-icon"]), ::slotted(m3e-icon[slot="trailing"]), ::slotted(m3e-icon[slot="trailing-icon"]) { --m3e-icon-size: var(--m3e-list-item-icon-size, 24px); } :host(:not(:disabled)) ::slotted(m3e-icon[slot="leading"]), :host(:not(:disabled)) ::slotted(m3e-icon[slot="leading-icon"]) { color: var(--m3e-list-item-leading-color, ${DesignToken.color.onSurfaceVariant}); } :host(:not(:disabled)) .content { color: var(--m3e-list-item-label-text-color, ${DesignToken.color.onSurface}); } :host(:not(:disabled)) ::slotted([slot="overline"]) { color: var(--m3e-list-item-overline-color, ${DesignToken.color.onSurfaceVariant}); } :host(:not(:disabled)) ::slotted([slot="supporting-text"]) { color: var(--m3e-list-item-supporting-text-color, ${DesignToken.color.onSurfaceVariant}); } :host(:not(:disabled)) ::slotted([slot="trailing"]), :host(:not(:disabled)) ::slotted([slot="trailing-supporting-text"]), :host(:not(:disabled)) ::slotted([slot="trailing-icon"]) { color: var(--m3e-list-item-trailing-color, ${DesignToken.color.onSurfaceVariant}); } :host(:not(:disabled)) .base { background-color: var( --_list-item-container-color, var(--m3e-list-item-container-color, ${DesignToken.color.surface}) ); } :host(:disabled) .base { background-color: var(--m3e-list-item-disabled-container-color, transparent); } :host(:disabled) ::slotted(video), :host(:disabled) ::slotted(img), :host(:disabled) ::slotted(m3e-avatar) { opacity: var(--m3e-list-item-disabled-media-opacity, 38%); } :host(:disabled) .content { color: color-mix( in srgb, var(--m3e-list-item-disabled-label-text-color, ${DesignToken.color.onSurface}) var(--m3e-list-item-disabled-label-text-opacity, 38%), transparent ); } :host(:disabled) ::slotted([slot="overline"]) { color: color-mix( in srgb, var(--m3e-list-item-disabled-overline-color, ${DesignToken.color.onSurface}) var(--m3e-list-item-disabled-overline-opacity, 38%), transparent ); } :host(:disabled) ::slotted([slot="supporting-text"]) { color: color-mix( in srgb, var(--m3e-list-item-disabled-supporting-text-color, ${DesignToken.color.onSurface}) var(--m3e-list-item-disabled-supporting-text-opacity, 38%), transparent ); } :host(:disabled) ::slotted([slot="leading"]), :host(:disabled) ::slotted([slot="leading-icon"]) { color: color-mix( in srgb, var(--m3e-list-item-disabled-leading-color, ${DesignToken.color.onSurface}) var(--m3e-list-item-disabled-leading-opacity, 38%), transparent ); } :host(:disabled) ::slotted([slot="trailing"]), :host(:disabled) ::slotted([slot="trailing-supporting-text"]), :host(:disabled) ::slotted([slot="trailing-icon"]) { color: color-mix( in srgb, var(--m3e-list-item-disabled-trailing-color, ${DesignToken.color.onSurface}) var(--m3e-list-item-disabled-trailing-opacity, 38%), transparent ); } :host(:not(:disabled)) .state-layer { --m3e-state-layer-hover-color: var(--m3e-list-item-hover-state-layer-color, ${DesignToken.color.onSurface}); --m3e-state-layer-hover-opacity: var( --m3e-list-item-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity} ); --m3e-state-layer-focus-color: var(--m3e-list-item-focus-state-layer-color, ${DesignToken.color.onSurface}); --m3e-state-layer-focus-opacity: var( --m3e-list-item-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity} ); } :host(:not(:disabled)) .ripple { --m3e-ripple-color: var(--m3e-list-item-pressed-state-layer-color, ${DesignToken.color.onSurface}); --m3e-ripple-opacity: var( --m3e-list-item-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity} ); } @media (forced-colors: active) { .base { transition: none; } :host(:disabled) ::slotted([slot="leading"]), :host(:disabled) ::slotted([slot="leading-icon"]), :host(:disabled) .content, :host(:disabled) ::slotted([slot="overline"]), :host(:disabled) ::slotted([slot="supporting-text"]), :host(:disabled) ::slotted([slot="trailing"]), :host(:disabled) ::slotted([slot="trailing-supporting-text"]), :host(:disabled) ::slotted([slot="trailing-icon"]) { color: GrayText; } } @media (prefers-reduced-motion) { .base { transition: none; } }`;
M3eListItemElement = __decorate([customElement("m3e-list-item")], M3eListItemElement);

var _M3eListElement_instances, _M3eListElement_items, _M3eListElement_leadingContentTypes, _M3eListElement_trailingContentTypes, _M3eListElement_applyVariant, _M3eListElement_handleSlotChange;
/**
 * A list of items.
 *
 * @description
 * The `m3e-list` component provides a list container for organizing and displaying
 * multiple list items. It supports flexible layout, custom padding, and divider insets
 * via CSS custom properties.
 *
 * @example
 * The following example illustrates a list with a single item using all supported slots.
 *
 * Note: This example uses the `@m3e/icon` package to present Material Design symbols, but any icon package can be
 * substituted depending on your design system or preferences
 *
 * ```html
 * <m3e-list>
 *  <m3e-list-item>
 *    <m3e-icon slot="leading-icon" name="person"></m3e-icon>
 *    <span slot="overline">Overline</span>
 *    Headline
 *    <span slot="supporting-text">Supporting text</span>
 *    <span slot="trailing-text">100+</span>
 *    <m3e-icon slot="trailing-icon" name="arrow_right"></m3e-icon>
 *  </m3e-list-item>
 * </m3e-list>
 * ```
 *
 * @tag m3e-list
 *
 * @slot - Renders the items of the list.
 *
 * @attr variant - The appearance variant of the list.
 *
 * @cssprop --m3e-list-divider-inset-start-size - Start inset for dividers within the list.
 * @cssprop --m3e-list-divider-inset-end-size - End inset for dividers within the list.
 * @cssprop --m3e-segmented-list-segment-gap - Gap between list items in segmented variant.
 * @cssprop --m3e-segmented-list-container-shape - Border radius of the segmented list container.
 * @cssprop --m3e-segmented-list-item-container-color - Background color of items in segmented variant.
 * @cssprop --m3e-segmented-list-item-disabled-container-color - Background color of disabled items in segmented variant.
 * @cssprop --m3e-segmented-list-item-container-shape - Border radius of items in segmented variant.
 * @cssprop --m3e-segmented-list-item-hover-container-shape - Border radius of items in segmented variant on hover.
 * @cssprop --m3e-segmented-list-item-focus-container-shape - Border radius of items in segmented variant on focus.
 * @cssprop --m3e-segmented-list-item-selected-container-shape - Border radius of items in segmented variant when selected.
 */
let M3eListElement = class M3eListElement extends AttachInternals(Role(LitElement, "list")) {
  constructor() {
    super(...arguments);
    _M3eListElement_instances.add(this);
    /** @private */
    _M3eListElement_items.set(this, new Array());
    /** @private */
    _M3eListElement_leadingContentTypes.set(this, {
      video: 0,
      image: 0,
      avatar: 0,
      icon: 0,
      text: 0
    });
    /** @private */
    _M3eListElement_trailingContentTypes.set(this, {
      video: 0,
      image: 0,
      avatar: 0,
      icon: 0,
      text: 0
    });
    /**
     * The appearance variant of the list.
     * @default "standard"
     */
    this.variant = "standard";
  }
  /** The items of the list. */
  get items() {
    return __classPrivateFieldGet(this, _M3eListElement_items, "f");
  }
  /** The type of leading content. */
  get leadingContentType() {
    return __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f").video > 0 ? "video" : __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f").image > 0 ? "image" : __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f").avatar > 0 ? "avatar" : __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f").icon > 0 ? "icon" : __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f").text > 0 ? "text" : undefined;
  }
  /** The type of trailing content. */
  get trailingContentType() {
    return __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f").video > 0 ? "video" : __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f").image > 0 ? "image" : __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f").avatar > 0 ? "avatar" : __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f").icon > 0 ? "icon" : __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f").text > 0 ? "text" : undefined;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eListElement_instances, "m", _M3eListElement_applyVariant).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eListElement_instances, "m", _M3eListElement_applyVariant).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot @slotchange="${__classPrivateFieldGet(this, _M3eListElement_instances, "m", _M3eListElement_handleSlotChange)}"></slot>`;
  }
  /**
   * @internal
   * Notifies the list that items have changed.
   */
  notifyItemsChange() {}
  /**
   * @internal
   * Notifies the list that the leading content of an item has changed.
   */
  notifyLeadingContentTypeChange(oldType, newType) {
    if (oldType) {
      __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f")[oldType]--;
    }
    if (newType) {
      __classPrivateFieldGet(this, _M3eListElement_leadingContentTypes, "f")[newType]++;
    }
    ["video", "image", "avatar", "icon"].forEach(x => {
      setCustomState(this, `--has-leading-${x}`, this.leadingContentType === x);
    });
  }
  /**
   * @internal
   * Notifies the list that the trailing content of an item has changed.
   */
  notifyTrailingContentTypeChange(oldType, newType) {
    if (oldType) {
      __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f")[oldType]--;
    }
    if (newType) {
      __classPrivateFieldGet(this, _M3eListElement_trailingContentTypes, "f")[newType]--;
    }
    ["video", "image", "avatar", "icon"].forEach(x => {
      setCustomState(this, `--has-trailing-${x}`, this.trailingContentType === x);
    });
  }
};
_M3eListElement_items = new WeakMap();
_M3eListElement_leadingContentTypes = new WeakMap();
_M3eListElement_trailingContentTypes = new WeakMap();
_M3eListElement_instances = new WeakSet();
_M3eListElement_applyVariant = function _M3eListElement_applyVariant() {
  if (!isListVariant(this.variant)) {
    this.variant = "standard";
  }
  setCustomEnumState(this, this.variant, "segmented", "standard");
};
_M3eListElement_handleSlotChange = function _M3eListElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eListElement_items, e.target.assignedElements({
    flatten: true
  }).filter(x => x instanceof M3eListItemElement), "f");
  __classPrivateFieldGet(this, _M3eListElement_items, "f").forEach((x, i) => {
    setCustomState(x, "--first", i === 0);
    setCustomState(x, "--last", i === __classPrivateFieldGet(this, _M3eListElement_items, "f").length - 1);
  });
  this.notifyItemsChange();
};
/** The styles of the element. */
M3eListElement.styles = css`:host { display: flex; flex-direction: column; overflow-y: auto; box-sizing: border-box; padding-block: var(--m3e-list-block-padding, 0px); --m3e-divider-inset-start-size: var(--m3e-list-divider-inset-start-size, ${DesignToken.measurement.space200}); --m3e-divider-inset-end-size: var(--m3e-list-divider-inset-end-size, ${DesignToken.measurement.space300}); } :host([hidden]) { display: none; } :host(:is(:state(--standard), :--standard)) { --_list-item-leading-video-outset: var(--m3e-list-item-leading-space, ${DesignToken.measurement.space200}); --_list-item-trailing-video-outset: var(--m3e-list-item-trailing-space, ${DesignToken.measurement.space200}); --_expandable-list-item-expanded-toggle-icon-container-color: transparent; --_expandable-list-item-animation: ${DesignToken.motion.spring.fastEffects}; --_expandable-list-item-slide-animation: 0s linear; } :host(:is(:state(--segmented), :--segmented)) { row-gap: var(--m3e-segmented-list-segment-gap, ${DesignToken.measurement.space25}); --_expandable-list-item-animation: ${DesignToken.motion.spring.fastSpatial}; } :host(:is(:state(--segmented), :--segmented)) { --m3e-list-item-container-color: var(--m3e-segmented-list-item-container-color, ${DesignToken.color.surface}); --m3e-list-item-disabled-container-color: var( --m3e-segmented-list-item-disabled-container-color, ${DesignToken.color.surface} ); --m3e-list-item-container-shape: var( --m3e-segmented-list-item-container-shape, ${DesignToken.shape.corner.extraSmall} ); --m3e-list-item-hover-container-shape: var( --m3e-segmented-list-item-hover-container-shape, ${DesignToken.shape.corner.medium} ); --m3e-list-item-focus-container-shape: var( --m3e-segmented-list-item-focus-container-shape, ${DesignToken.shape.corner.large} ); --m3e-list-item-selected-container-shape: var( --m3e-segmented-list-item-selected-container-shape, ${DesignToken.shape.corner.large} ); --m3e-list-item-video-shape: var(--m3e-segmented-list-item-video-shape, ${DesignToken.shape.corner.small}); --m3e-list-item-image-shape: var(--m3e-segmented-list-item-image-shape, ${DesignToken.shape.corner.small}); --m3e-list-item-between-space: var(--m3e-segmented-list-item-spacing, ${DesignToken.measurement.space150}); --_expandable-list-item-items-segment-gap: var( --m3e-segmented-list-segment-gap, ${DesignToken.measurement.space25} ); --_expandable-list-item-expanded-top-shape: var( --m3e-segmented-list-container-shape, ${DesignToken.shape.corner.large} ); --_expandable-list-item-bottom-container-shape: var( --m3e-segmented-list-container-shape, ${DesignToken.shape.corner.large} ); } :host(:is(:state(--segmented), :--segmented)) ::slotted(:is(:state(--first), :--first)), :host(:is(:state(--segmented), :--segmented)) ::slotted(:is(:state(--has-previous-open), :--has-previous-open):not([open])) { --_list-item-top-container-shape: var(--m3e-segmented-list-container-shape, ${DesignToken.shape.corner.large}); } :host(:is(:state(--segmented), :--segmented)) ::slotted(:is(:state(--has-next-open), :--has-next-open):not([open])), :host(:is(:state(--segmented), :--segmented)) ::slotted(:is(:state(--last), :--last)) { --_list-item-bottom-container-shape: var(--m3e-segmented-list-container-shape, ${DesignToken.shape.corner.large}); } :host(:is(:state(--segmented), :--segmented)) ::slotted(m3e-divider) { display: none; } :host(:is(:state(--has-leading-video), :--has-leading-video)) { --_list-item-leading-reserved-display: block; --_list-item-leading-reserved-space: var(--m3e-list-item-video-width, 100px); } :host(:is(:state(--standard), :--standard):is(:state(--has-leading-video), :--has-leading-video)) { --_list-item-leading-reserved-outset: var(--m3e-list-item-leading-space, ${DesignToken.measurement.space200}); --_list-item-trailing-reserved-outset: var(--m3e-list-item-trailing-space, ${DesignToken.measurement.space200}); } :host(:is(:state(--has-leading-image), :--has-leading-image)) { --_list-item-leading-reserved-display: block; --_list-item-leading-reserved-space: var(--m3e-list-item-image-width, 56px); } :host(:is(:state(--has-leading-avatar), :--has-leading-avatar)) { --_list-item-leading-reserved-display: block; --_list-item-leading-reserved-space: var(--m3e-avatar-size, 40px); } :host(:is(:state(--has-leading-icon), :--has-leading-icon)) { --_list-item-leading-reserved-display: block; --_list-item-leading-reserved-space: var(--m3e-list-item-icon-size, 24px); }`;
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eListElement.prototype, "variant", void 0);
M3eListElement = __decorate([customElement("m3e-list")], M3eListElement);

/**
 * A list of actions.
 *
 * @description
 * The `m3e-action-list` component provides a specialized list container for action-based
 * interactions following Material 3 design principles.
 *
 * @tag m3e-action-list
 *
 * @slot - Renders the items of the list.
 *
 * @attr variant - The appearance variant of the list.
 *
 * @cssprop --m3e-list-divider-inset-start-size - Start inset for dividers within the list.
 * @cssprop --m3e-list-divider-inset-end-size - End inset for dividers within the list.
 * @cssprop --m3e-segmented-list-segment-gap - Gap between list items in segmented variant.
 * @cssprop --m3e-segmented-list-container-shape - Border radius of the segmented list container.
 * @cssprop --m3e-segmented-list-item-container-color - Background color of items in segmented variant.
 * @cssprop --m3e-segmented-list-item-disabled-container-color - Background color of disabled items in segmented variant.
 * @cssprop --m3e-segmented-list-item-container-shape - Border radius of items in segmented variant.
 * @cssprop --m3e-segmented-list-item-hover-container-shape - Border radius of items in segmented variant on hover.
 * @cssprop --m3e-segmented-list-item-focus-container-shape - Border radius of items in segmented variant on focus.
 * @cssprop --m3e-segmented-list-item-selected-container-shape - Border radius of items in segmented variant when selected.
 */
let M3eActionListElement = class M3eActionListElement extends M3eListElement {};
M3eActionListElement = __decorate([customElement("m3e-action-list")], M3eActionListElement);

var _M3eExpandableListItemElement_instances, _M3eExpandableListItemElement_id, _M3eExpandableListItemElement_contentId, _M3eExpandableListItemElement_headerId, _M3eExpandableListItemElement_items, _M3eExpandableListItemElement_handleHeaderClick, _M3eExpandableListItemElement_handleCollapsibleEvent, _M3eExpandableListItemElement_handleSlotChange;
var M3eExpandableListItemElement_1;
/**
 * An item in a list that can be expanded to show more items.
 *
 * @description
 * The `m3e-expandable-list-item` provides a hierarchical navigation structure that allows
 * users to expand and collapse content sections. It follows Material 3 design principles
 * with smooth animations, semantic color tokens, and accessible interactions. The component
 * extends the base `m3e-list-item` functionality with toggle state management and nested
 * content support.
 *
 * @example
 * The following example illustrates an expandable list item.
 * ```html
 * <m3e-action-list>
 *  <m3e-expandable-list-item>
 *    Pick up supplies
 *    <span slot="supporting-text">Due monday</span>
 *    <div slot="items">
 *      <m3e-list-action>
 *        Dry-erase board
 *        <span slot="supporting-text">$35.99</span>
 *      </m3e-list-action>
 *      <m3e-list-action>
 *        Markers
 *        <span slot="supporting-text">$8.99</span>
 *      </m3e-list-action>
 *    </div>
 *  </m3e-expandable-list-item>
 * </m3e-action-list>
 * ```
 *
 * @tag m3e-expandable-list-item
 *
 * @slot - Renders the content of the list item.
 * @slot leading - Renders the leading content of the list item.
 * @slot overline - Renders the overline of the list item.
 * @slot supporting-text - Renders the supporting text of the list item.
 * @slot toggle-icon - Renders a custom icon for the expand/collapse toggle.
 * @slot items - Container for child list items displayed when expanded.
 * @slot trailing - This component does not expose the base trailing slot.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr open - Whether the item is expanded.
 *
 * @fires opening - Dispatched when the item begins to open.
 * @fires opened - Dispatched when the item has opened.
 * @fires closing - Dispatched when the item begins to close.
 * @fires closed - Dispatched when the item has closed.
 *
 * @cssprop --m3e-expandable-list-item-toggle-icon-container-width - Width of the toggle icon container.
 * @cssprop --m3e-expandable-list-item-toggle-icon-container-shape - Border radius of the toggle icon container.
 * @cssprop --m3e-expandable-list-item-toggle-icon-size - Size of the toggle icon.
 * @cssprop --m3e-expandable-list-item-expanded-toggle-icon-container-color - Background color of the toggle icon container when expanded.
 * @cssprop --m3e-list-item-between-space - Horizontal gap between elements.
 * @cssprop --m3e-list-item-padding-inline - Horizontal padding for the list item.
 * @cssprop --m3e-list-item-padding-block - Vertical padding for the list item.
 * @cssprop --m3e-list-item-height - Minimum height of the list item.
 * @cssprop --m3e-list-item-font-size - Font size for main content.
 * @cssprop --m3e-list-item-font-weight - Font weight for main content.
 * @cssprop --m3e-list-item-line-height - Line height for main content.
 * @cssprop --m3e-list-item-tracking - Letter spacing for main content.
 * @cssprop --m3e-list-item-overline-font-size - Font size for overline slot.
 * @cssprop --m3e-list-item-overline-font-weight - Font weight for overline slot.
 * @cssprop --m3e-list-item-overline-line-height - Line height for overline slot.
 * @cssprop --m3e-list-item-overline-tracking - Letter spacing for overline slot.
 * @cssprop --m3e-list-item-supporting-text-font-size - Font size for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-font-weight - Font weight for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-line-height - Line height for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-tracking - Letter spacing for supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-size - Font size for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-weight - Font weight for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-line-height - Line height for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-tracking - Letter spacing for trailing supporting text slot.
 * @cssprop --m3e-list-item-icon-size - Size for leading/trailing icons.
 * @cssprop --m3e-list-item-label-text-color - Color for the main content.
 * @cssprop --m3e-list-item-overline-color - Color for the overline slot.
 * @cssprop --m3e-list-item-supporting-text-color - Color for the supporting text slot.
 * @cssprop --m3e-list-item-leading-color - Color for the leading content.
 * @cssprop --m3e-list-item-trailing-color - Color for the trailing content.
 * @cssprop --m3e-list-item-container-color - Background color of the list item.
 * @cssprop --m3e-list-item-container-shape - Border radius of the list item.
 * @cssprop --m3e-list-item-hover-container-shape - Border radius of the list item on hover.
 * @cssprop --m3e-list-item-focus-container-shape - Border radius of the list item on focus.
 * @cssprop --m3e-list-item-video-width - Width of the video slot.
 * @cssprop --m3e-list-item-video-height - Height of the video slot.
 * @cssprop --m3e-list-item-video-shape - Border radius of the video slot.
 * @cssprop --m3e-list-item-image-width - Width of the image slot.
 * @cssprop --m3e-list-item-image-height - Height of the image slot.
 * @cssprop --m3e-list-item-image-shape - Border radius of the image slot.
 * @cssprop --m3e-list-item-disabled-label-text-color - Color for the main content when disabled.
 * @cssprop --m3e-list-item-disabled-label-text-opacity - Opacity for the main content when disabled.
 * @cssprop --m3e-list-item-disabled-overline-color - Color for the overline slot when disabled.
 * @cssprop --m3e-list-item-disabled-overline-opacity - Opacity for the overline slot when disabled.
 * @cssprop --m3e-list-item-disabled-supporting-text-color - Color for the supporting text slot when disabled.
 * @cssprop --m3e-list-item-disabled-supporting-text-opacity - Opacity for the supporting text slot when disabled.
 * @cssprop --m3e-list-item-disabled-leading-color - Color for the leading icon when disabled.
 * @cssprop --m3e-list-item-disabled-leading-opacity - Opacity for the leading icon when disabled.
 * @cssprop --m3e-list-item-disabled-trailing-color - Color for the trailing icon when disabled.
 * @cssprop --m3e-list-item-disabled-trailing-opacity - Opacity for the trailing icon when disabled.
 * @cssprop --m3e-list-item-hover-state-layer-color - Color for the hover state layer.
 * @cssprop --m3e-list-item-hover-state-layer-opacity - Opacity for the hover state layer.
 * @cssprop --m3e-list-item-focus-state-layer-color - Color for the focus state layer.
 * @cssprop --m3e-list-item-focus-state-layer-opacity - Opacity for the focus state layer.
 * @cssprop --m3e-list-item-pressed-state-layer-color - Color for the pressed state layer.
 * @cssprop --m3e-list-item-pressed-state-layer-opacity - Opacity for the pressed state layer.
 * @cssprop --m3e-segmented-list-container-shape - Border radius of the segmented list container shape.
 * @cssprop --m3e-segmented-list-segment-gap - Gap between list item segments.
 * @cssprop --m3e-list-item-three-line-top-offset - Top offset for media in three line items.
 * @cssprop --m3e-list-item-disabled-media-opacity - Opacity for media when disabled.
 */
let M3eExpandableListItemElement = M3eExpandableListItemElement_1 = class M3eExpandableListItemElement extends M3eListItemElement {
  constructor() {
    super(...arguments);
    _M3eExpandableListItemElement_instances.add(this);
    /** @private */
    _M3eExpandableListItemElement_id.set(this, M3eExpandableListItemElement_1.__nextId++);
    /** @private */
    _M3eExpandableListItemElement_contentId.set(this, `m3e-expandable-list-item-${__classPrivateFieldGet(this, _M3eExpandableListItemElement_id, "f")}-content`);
    /** @private */
    _M3eExpandableListItemElement_headerId.set(this, `m3e-expandable-list-item-${__classPrivateFieldGet(this, _M3eExpandableListItemElement_id, "f")}-header`);
    /** @private */
    _M3eExpandableListItemElement_items.set(this, new Array());
    /**
     * Whether the element is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * Whether the item is expanded.
     * @default false
     */
    this.open = false;
  }
  /** The direct child items of this item. */
  get items() {
    return __classPrivateFieldGet(this, _M3eExpandableListItemElement_items, "f");
  }
  /** @inheritdoc */
  focus(options) {
    this.button?.focus(options);
  }
  /** @inheritdoc */
  blur() {
    this.button?.blur();
  }
  /** @inheritdoc */
  click() {
    this.button?.click();
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("open")) {
      for (let sibling = this.previousElementSibling; sibling; sibling = sibling.previousElementSibling) {
        if (sibling instanceof M3eListItemElement) {
          setCustomState(sibling, "--has-next-open", this.open);
          break;
        }
      }
      for (let sibling = this.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
        if (sibling instanceof M3eListItemElement) {
          setCustomState(sibling, "--has-previous-open", this.open);
          break;
        }
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-list-item-button id="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_headerId, "f")}" class="header" ?disabled="${this.disabled}" aria-expanded="${this.open}" aria-controls="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_contentId, "f")}" @click="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_instances, "m", _M3eExpandableListItemElement_handleHeaderClick)}"><slot name="leading" slot="leading" @slotchange="${this._handleLeadingSlotChange}"></slot><slot name="overline" slot="overline"></slot><slot></slot><slot name="supporting-text" slot="supporting-text"></slot><div class="toggle-container" slot="trailing" aria-hidden="true"><div class="toggle"><slot name="toggle-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></slot></div></div></m3e-list-item-button><m3e-collapsible id="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_contentId, "f")}" class="items" role="list" aria-labelledby="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_headerId, "f")}" ?open="${this.open}" slide @opening="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_instances, "m", _M3eExpandableListItemElement_handleCollapsibleEvent)}" @opened="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_instances, "m", _M3eExpandableListItemElement_handleCollapsibleEvent)}" @closing="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_instances, "m", _M3eExpandableListItemElement_handleCollapsibleEvent)}" @closed="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_instances, "m", _M3eExpandableListItemElement_handleCollapsibleEvent)}"><slot name="items" @slotchange="${__classPrivateFieldGet(this, _M3eExpandableListItemElement_instances, "m", _M3eExpandableListItemElement_handleSlotChange)}"></slot></m3e-collapsible></div>`;
  }
};
_M3eExpandableListItemElement_id = new WeakMap();
_M3eExpandableListItemElement_contentId = new WeakMap();
_M3eExpandableListItemElement_headerId = new WeakMap();
_M3eExpandableListItemElement_items = new WeakMap();
_M3eExpandableListItemElement_instances = new WeakSet();
_M3eExpandableListItemElement_handleHeaderClick = function _M3eExpandableListItemElement_handleHeaderClick(e) {
  if (!e.defaultPrevented) {
    this.open = !this.open;
  }
};
_M3eExpandableListItemElement_handleCollapsibleEvent = function _M3eExpandableListItemElement_handleCollapsibleEvent(e) {
  e.stopPropagation();
  ["opening", "opened", "closing", "closed"].forEach(x => {
    this.button?.classList.toggle(x, e.type === x);
  });
  this.dispatchEvent(new Event(e.type, {
    bubbles: true
  }));
};
_M3eExpandableListItemElement_handleSlotChange = function _M3eExpandableListItemElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eExpandableListItemElement_items, e.target.assignedElements({
    flatten: true
  }).flatMap(x => [...x.childNodes].filter(x => x instanceof M3eListItemElement)), "f");
  __classPrivateFieldGet(this, _M3eExpandableListItemElement_items, "f").forEach((x, i) => {
    if (i == __classPrivateFieldGet(this, _M3eExpandableListItemElement_items, "f").length - 1) {
      x.style.setProperty("--_list-item-bottom-container-shape", `var(--_expandable-list-item-bottom-container-shape)`);
    } else {
      x.style.removeProperty("--_list-item-bottom-container-shape");
    }
  });
  this.closest("m3e-list, m3e-action-list, m3e-selection-list")?.notifyItemsChange();
};
/** The styles of the element. */
M3eExpandableListItemElement.styles = css`:host { display: block; } .header { width: 100%; margin-bottom: 0px; z-index: 1; --_list-item-button-trailing-align-self: stretch; } .toggle-container { display: flex; align-items: center; justify-content: center; align-self: stretch; width: var(--m3e-expandable-list-item-toggle-icon-container-width, 32px); border-radius: var(--m3e-expandable-list-item-toggle-icon-container-shape, ${DesignToken.shape.corner.full}); transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .toggle { display: flex; align-items: center; justify-content: center; vertical-align: middle; font-size: var(--m3e-expandable-list-item-toggle-icon-size, 24px); transition: ${unsafeCSS(`transform ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .toggle svg, ::slotted(svg[slot="toggle-icon"]) { width: 1em; height: 1em; } :host([open]) .toggle-container { background-color: var( --_expandable-list-item-expanded-toggle-icon-container-color, var(--m3e-expandable-list-item-expanded-toggle-icon-container-color, ${DesignToken.color.surfaceContainer}) ); } :host([open]) .toggle { transform: rotate(180deg); } :host([open]) .header { --_list-item-top-container-shape: var(--_expandable-list-item-expanded-top-shape, initial); --_list-item-bottom-container-shape: initial; margin-bottom: var(--_expandable-list-item-items-segment-gap, 0px); } :host([open]) .header, :host([open]) .items { --_list-item-container-color: var( --m3e-expandable-list-item-expanded-container-color, var(--m3e-list-item-container-color, ${DesignToken.color.surface}) ); } .base { overflow-y: hidden; } .base, ::slotted([slot="items"]) { display: flex; flex-direction: column; box-sizing: border-box; } ::slotted([slot="items"]) { flex: none; --_list-item-top-container-shape: initial; --_list-item-bottom-container-shape: initial; row-gap: var(--_expandable-list-item-items-segment-gap, 0px); } .items { --m3e-collapsible-animation: var(--_expandable-list-item-animation); --m3e-collapsible-slide-animation: var(--_expandable-list-item-slide-animation); } @media (forced-colors: active) { .header { transition: none; } :host([open]) .header.opening { margin-bottom: var(--_expandable-list-item-items-segment-gap, 0px); } } @media (prefers-reduced-motion) { .header, .toggle-container, .toggle { transition: none; } }`;
/** @private */
M3eExpandableListItemElement.__nextId = 0;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eExpandableListItemElement.prototype, "disabled", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eExpandableListItemElement.prototype, "open", void 0);
__decorate([query(".header")], M3eExpandableListItemElement.prototype, "button", void 0);
M3eExpandableListItemElement = M3eExpandableListItemElement_1 = __decorate([customElement("m3e-expandable-list-item")], M3eExpandableListItemElement);

/**
 * @internal
 * An internal interactive element used to present the content of a list item.
 */
let M3eListItemButtonElement = class M3eListItemButtonElement extends KeyboardClick(LinkButton(Focusable(Disabled(AttachInternals(Role(M3eListItemElement, "button"), true))))) {
  constructor() {
    super();
    new FocusController(this, {
      callback: (_, focusVisible) => this.shadowRoot?.querySelector(".base")?.classList.toggle("focus-visible", focusVisible)
    });
    new PressedController(this, {
      callback: pressed => this.shadowRoot?.querySelector(".base")?.classList.toggle("pressed", pressed)
    });
    new HoverController(this, {
      callback: hovering => this.shadowRoot?.querySelector(".base")?.classList.toggle("hover", hovering)
    });
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" inward ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple>${this[renderPseudoLink]()} ${super._renderBase()}</div>`;
  }
};
/** The styles of the element. */
M3eListItemButtonElement.styles = [M3eListItemElement.styles, css`:host { outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } .base { position: relative; } :host(:not(:disabled)) { cursor: pointer; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } slot[name="trailing"] { align-self: var(--_list-item-button-trailing-align-self, auto); }`];
__decorate([query(".focus-ring")], M3eListItemButtonElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eListItemButtonElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eListItemButtonElement.prototype, "_ripple", void 0);
M3eListItemButtonElement = __decorate([customElement("m3e-list-item-button")], M3eListItemButtonElement);

/**
 * An item in a list that performs an action.
 *
 * @description
 * The `m3e-list-action` component represents an interactive list item that performs a
 * user-initiated action. It combines the semantic structure of a list item with
 * button-like interactions, supporting ripple effects, and state layers.
 *
 * @tag m3e-list-action
 *
 * @slot - Renders the content of the list item.
 * @slot leading - Renders the leading content of the list item.
 * @slot overline - Renders the overline of the list item.
 * @slot supporting-text - Renders the supporting text of the list item.
 * @slot trailing - Renders the trailing content of the list item.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr download - Whether the `target` of the link button will be downloaded, optionally specifying the new name of the file.
 * @attr href - The URL to which the link button points.
 * @attr rel - The relationship between the `target` of the link button and the document.
 * @attr target - The target of the link button.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-list-item-between-space - Horizontal gap between elements.
 * @cssprop --m3e-list-item-padding-inline - Horizontal padding for the list item.
 * @cssprop --m3e-list-item-padding-block - Vertical padding for the list item.
 * @cssprop --m3e-list-item-height - Minimum height of the list item.
 * @cssprop --m3e-list-item-font-size - Font size for main content.
 * @cssprop --m3e-list-item-font-weight - Font weight for main content.
 * @cssprop --m3e-list-item-line-height - Line height for main content.
 * @cssprop --m3e-list-item-tracking - Letter spacing for main content.
 * @cssprop --m3e-list-item-overline-font-size - Font size for overline slot.
 * @cssprop --m3e-list-item-overline-font-weight - Font weight for overline slot.
 * @cssprop --m3e-list-item-overline-line-height - Line height for overline slot.
 * @cssprop --m3e-list-item-overline-tracking - Letter spacing for overline slot.
 * @cssprop --m3e-list-item-supporting-text-font-size - Font size for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-font-weight - Font weight for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-line-height - Line height for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-tracking - Letter spacing for supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-size - Font size for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-weight - Font weight for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-line-height - Line height for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-tracking - Letter spacing for trailing supporting text slot.
 * @cssprop --m3e-list-item-icon-size - Size for leading/trailing icons.
 * @cssprop --m3e-list-item-label-text-color - Color for the main content.
 * @cssprop --m3e-list-item-overline-color - Color for the overline slot.
 * @cssprop --m3e-list-item-supporting-text-color - Color for the supporting text slot.
 * @cssprop --m3e-list-item-leading-color - Color for the leading content.
 * @cssprop --m3e-list-item-trailing-color - Color for the trailing content.
 * @cssprop --m3e-list-item-container-color - Background color of the list item.
 * @cssprop --m3e-list-item-container-shape - Border radius of the list item.
 * @cssprop --m3e-list-item-hover-container-shape - Border radius of the list item on hover.
 * @cssprop --m3e-list-item-focus-container-shape - Border radius of the list item on focus.
 * @cssprop --m3e-list-item-video-width - Width of the video slot.
 * @cssprop --m3e-list-item-video-height - Height of the video slot.
 * @cssprop --m3e-list-item-video-shape - Border radius of the video slot.
 * @cssprop --m3e-list-item-image-width - Width of the image slot.
 * @cssprop --m3e-list-item-image-height - Height of the image slot.
 * @cssprop --m3e-list-item-image-shape - Border radius of the image slot.
 * @cssprop --m3e-list-item-disabled-container-color - Background color of the list item when disabled.
 * @cssprop --m3e-list-item-disabled-label-text-color - Color for the main content when disabled.
 * @cssprop --m3e-list-item-disabled-label-text-opacity - Opacity for the main content when disabled.
 * @cssprop --m3e-list-item-disabled-overline-color - Color for the overline slot when disabled.
 * @cssprop --m3e-list-item-disabled-overline-opacity - Opacity for the overline slot when disabled.
 * @cssprop --m3e-list-item-disabled-supporting-text-color - Color for the supporting text slot when disabled.
 * @cssprop --m3e-list-item-disabled-supporting-text-opacity - Opacity for the supporting text slot when disabled.
 * @cssprop --m3e-list-item-disabled-leading-color - Color for the leading icon when disabled.
 * @cssprop --m3e-list-item-disabled-leading-opacity - Opacity for the leading icon when disabled.
 * @cssprop --m3e-list-item-disabled-trailing-color - Color for the trailing icon when disabled.
 * @cssprop --m3e-list-item-disabled-trailing-opacity - Opacity for the trailing icon when disabled.
 * @cssprop --m3e-list-item-hover-state-layer-color - Color for the hover state layer.
 * @cssprop --m3e-list-item-hover-state-layer-opacity - Opacity for the hover state layer.
 * @cssprop --m3e-list-item-focus-state-layer-color - Color for the focus state layer.
 * @cssprop --m3e-list-item-focus-state-layer-opacity - Opacity for the focus state layer.
 * @cssprop --m3e-list-item-pressed-state-layer-color - Color for the pressed state layer.
 * @cssprop --m3e-list-item-pressed-state-layer-opacity - Opacity for the pressed state layer.
 * @cssprop --m3e-list-item-three-line-top-offset - Top offset for media in three line items.
 * @cssprop --m3e-list-item-disabled-media-opacity - Opacity for media when disabled.
 */
let M3eListActionElement = class M3eListActionElement extends LinkButton(M3eListItemElement, true) {
  constructor() {
    super(...arguments);
    /**
     * Whether the element is disabled.
     * @default false
     */
    this.disabled = false;
  }
  /** @inheritdoc */
  focus(options) {
    this._button?.focus(options);
  }
  /** @inheritdoc */
  blur() {
    this._button?.blur();
  }
  /** @inheritdoc */
  click() {
    this._button?.click();
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-list-item-button class="button" ?disabled="${this.disabled}" href="${ifDefined(this.href || undefined)}" target="${ifDefined(this.target || undefined)}" download="${ifDefined(this.download || undefined)}" rel="${ifDefined(this.rel || undefined)}"><slot name="leading" slot="leading" @slotchange="${this._handleLeadingSlotChange}"></slot><slot name="overline" slot="overline"></slot><slot></slot><slot name="supporting-text" slot="supporting-text"></slot><slot name="trailing" slot="trailing" @slotchange="${this._handleTrailingSlotChange}"></slot></m3e-list-item-button>`;
  }
};
/** The styles of the element. */
M3eListActionElement.styles = css`:host { display: block; } .button { width: 100%; }`;
__decorate([query(".button")], M3eListActionElement.prototype, "_button", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eListActionElement.prototype, "disabled", void 0);
M3eListActionElement = __decorate([customElement("m3e-list-action")], M3eListActionElement);

var _M3eListOptionElement_instances, _M3eListOptionElement_value, _M3eListOptionElement_textContent, _M3eListOptionElement_clickHandler, _M3eListOptionElement_handleSlotChange, _M3eListOptionElement_handleClick;
/**
 * A selectable option in a list.
 *
 * @description
 * The `m3e-list-option` component represents a selectable item within a list container. It extends
 * the base `m3e-list-item` functionality with selection state management, providing visual feedback
 * for selected and unselected states. The component is designed for use with `m3e-selection-list`
 * and supports rich content through multiple slots, comprehensive styling via CSS custom properties,
 * and accessible interactions following Material 3 design principles.
 *
 * @tag m3e-list-option
 *
 * @slot - Renders the content of the list item.
 * @slot leading - Renders the leading content of the list item.
 * @slot overline - Renders the overline of the list item.
 * @slot supporting-text - Renders the supporting text of the list item.
 * @slot trailing - Renders the trailing content of the list item.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr selected - Whether the element is selected.
 *
 * @fires beforeinput - Dispatched before the selected state changes.
 * @fires input - Dispatched when the selected state changes.
 * @fires change - Dispatched when the selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-list-item-between-space - Horizontal gap between elements.
 * @cssprop --m3e-list-item-padding-inline - Horizontal padding for the list item.
 * @cssprop --m3e-list-item-padding-block - Vertical padding for the list item.
 * @cssprop --m3e-list-item-height - Minimum height of the list item.
 * @cssprop --m3e-list-item-font-size - Font size for main content.
 * @cssprop --m3e-list-item-font-weight - Font weight for main content.
 * @cssprop --m3e-list-item-line-height - Line height for main content.
 * @cssprop --m3e-list-item-tracking - Letter spacing for main content.
 * @cssprop --m3e-list-item-overline-font-size - Font size for overline slot.
 * @cssprop --m3e-list-item-overline-font-weight - Font weight for overline slot.
 * @cssprop --m3e-list-item-overline-line-height - Line height for overline slot.
 * @cssprop --m3e-list-item-overline-tracking - Letter spacing for overline slot.
 * @cssprop --m3e-list-item-supporting-text-font-size - Font size for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-font-weight - Font weight for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-line-height - Line height for supporting text slot.
 * @cssprop --m3e-list-item-supporting-text-tracking - Letter spacing for supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-size - Font size for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-font-weight - Font weight for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-line-height - Line height for trailing supporting text slot.
 * @cssprop --m3e-list-item-trailing-text-tracking - Letter spacing for trailing supporting text slot.
 * @cssprop --m3e-list-item-icon-size - Size for leading/trailing icons.
 * @cssprop --m3e-list-item-label-text-color - Color for the main content.
 * @cssprop --m3e-list-item-overline-color - Color for the overline slot.
 * @cssprop --m3e-list-item-supporting-text-color - Color for the supporting text slot.
 * @cssprop --m3e-list-item-leading-color - Color for the leading content.
 * @cssprop --m3e-list-item-trailing-color - Color for the trailing content.
 * @cssprop --m3e-list-item-container-color - Background color of the list item.
 * @cssprop --m3e-list-item-container-shape - Border radius of the list item.
 * @cssprop --m3e-list-item-hover-container-shape - Border radius of the list item on hover.
 * @cssprop --m3e-list-item-focus-container-shape - Border radius of the list item on focus.
 * @cssprop --m3e-list-item-video-width - Width of the video slot.
 * @cssprop --m3e-list-item-video-height - Height of the video slot.
 * @cssprop --m3e-list-item-video-shape - Border radius of the video slot.
 * @cssprop --m3e-list-item-image-width - Width of the image slot.
 * @cssprop --m3e-list-item-image-height - Height of the image slot.
 * @cssprop --m3e-list-item-image-shape - Border radius of the image slot.
 * @cssprop --m3e-list-item-disabled-container-color - Background color of the list item when disabled.
 * @cssprop --m3e-list-item-disabled-label-text-color - Color for the main content when disabled.
 * @cssprop --m3e-list-item-disabled-label-text-opacity - Opacity for the main content when disabled.
 * @cssprop --m3e-list-item-disabled-overline-color - Color for the overline slot when disabled.
 * @cssprop --m3e-list-item-disabled-overline-opacity - Opacity for the overline slot when disabled.
 * @cssprop --m3e-list-item-disabled-supporting-text-color - Color for the supporting text slot when disabled.
 * @cssprop --m3e-list-item-disabled-supporting-text-opacity - Opacity for the supporting text slot when disabled.
 * @cssprop --m3e-list-item-disabled-leading-color - Color for the leading icon when disabled.
 * @cssprop --m3e-list-item-disabled-leading-opacity - Opacity for the leading icon when disabled.
 * @cssprop --m3e-list-item-disabled-trailing-color - Color for the trailing icon when disabled.
 * @cssprop --m3e-list-item-disabled-trailing-opacity - Opacity for the trailing icon when disabled.
 * @cssprop --m3e-list-item-hover-state-layer-color - Color for the hover state layer.
 * @cssprop --m3e-list-item-hover-state-layer-opacity - Opacity for the hover state layer.
 * @cssprop --m3e-list-item-focus-state-layer-color - Color for the focus state layer.
 * @cssprop --m3e-list-item-focus-state-layer-opacity - Opacity for the focus state layer.
 * @cssprop --m3e-list-item-pressed-state-layer-color - Color for the pressed state layer.
 * @cssprop --m3e-list-item-pressed-state-layer-opacity - Opacity for the pressed state layer.
 * @cssprop --m3e-list-item-selected-label-text-color - Selected color for the main content.
 * @cssprop --m3e-list-item-selected-overline-color - Selected color for the overline slot.
 * @cssprop --m3e-list-item-selected-supporting-text-color - Selected color for the supporting text slot.
 * @cssprop --m3e-list-item-selected-leading-color - Selected color for the leading content.
 * @cssprop --m3e-list-item-selected-trailing-color - Selected color for the trailing content.
 * @cssprop --m3e-list-item-selected-container-color - Selected background color of the list item.
 * @cssprop --m3e-list-item-selected-container-shape - Selected border radius of the list item.
 * @cssprop --m3e-list-item-selected-disabled-container-color - Selected background color when disabled.
 * @cssprop --m3e-list-item-selected-disabled-container-opacity - Selected opacity when disabled.
 * @cssprop --m3e-list-item-selected-hover-state-layer-color - Color for the hover state layer when selected.
 * @cssprop --m3e-list-item-selected-hover-state-layer-opacity - Opacity for the hover state layer when selected.
 * @cssprop --m3e-list-item-selected-focus-state-layer-color - Color for the focus state layer when selected.
 * @cssprop --m3e-list-item-selected-focus-state-layer-opacity - Opacity for the focus state layer when selected.
 * @cssprop --m3e-list-item-selected-pressed-state-layer-color - Color for the pressed state layer when selected.
 * @cssprop --m3e-list-item-selected-pressed-state-layer-opacity - Opacity for the pressed state layer when selected.
 * @cssprop --m3e-list-item-three-line-top-offset - Top offset for media in three line items.
 * @cssprop --m3e-list-item-disabled-media-opacity - Opacity for media when disabled.
 */
let M3eListOptionElement = class M3eListOptionElement extends KeyboardClick(Focusable(Selected(Disabled(AttachInternals(Role(M3eListItemElement, "option"), true))))) {
  constructor() {
    super();
    _M3eListOptionElement_instances.add(this);
    /** @private */
    _M3eListOptionElement_value.set(this, void 0);
    /** @private */
    _M3eListOptionElement_textContent.set(this, "");
    /** @private */
    _M3eListOptionElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eListOptionElement_instances, "m", _M3eListOptionElement_handleClick).call(this, e));
    new FocusController(this, {
      callback: (_, focusVisible) => this.shadowRoot?.querySelector(".base")?.classList.toggle("focus-visible", focusVisible)
    });
    new PressedController(this, {
      callback: pressed => this.shadowRoot?.querySelector(".base")?.classList.toggle("pressed", pressed)
    });
    new HoverController(this, {
      callback: hovering => this.shadowRoot?.querySelector(".base")?.classList.toggle("hover", hovering)
    });
  }
  /** A string representing the value of the option. */
  get value() {
    return __classPrivateFieldGet(this, _M3eListOptionElement_value, "f") ?? __classPrivateFieldGet(this, _M3eListOptionElement_textContent, "f");
  }
  set value(value) {
    __classPrivateFieldSet(this, _M3eListOptionElement_value, value, "f");
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eListOptionElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eListOptionElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      this.closest("m3e-selection-list")?.[selectionManager].notifySelectionChange(this);
      for (const icon of this.querySelectorAll("m3e-icon")) {
        icon.toggleAttribute("filled", this.selected);
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" inward ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><slot name="leading" @slotchange="${this._handleLeadingSlotChange}"></slot><div class="content"><slot name="overline"></slot><slot @slotchange="${__classPrivateFieldGet(this, _M3eListOptionElement_instances, "m", _M3eListOptionElement_handleSlotChange)}"></slot><slot name="supporting-text"></slot></div><slot name="trailing" @slotchange="${this._handleTrailingSlotChange}"></slot><div class="indicator">${this.closest("m3e-selection-list")?.multi ? html`<m3e-pseudo-checkbox ?checked="${this.selected}" ?disabled="${this.disabled}"></m3e-pseudo-checkbox>` : html`<m3e-pseudo-radio ?checked="${this.selected}" ?disabled="${this.disabled}"></m3e-pseudo-radio>`}</div></div>`;
  }
};
_M3eListOptionElement_value = new WeakMap();
_M3eListOptionElement_textContent = new WeakMap();
_M3eListOptionElement_clickHandler = new WeakMap();
_M3eListOptionElement_instances = new WeakSet();
_M3eListOptionElement_handleSlotChange = function _M3eListOptionElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eListOptionElement_textContent, getTextContent(e.target), "f");
};
_M3eListOptionElement_handleClick = function _M3eListOptionElement_handleClick(e) {
  const selectionList = this.closest("m3e-selection-list");
  if (e.defaultPrevented || !selectionList) return;
  if (selectionList.multi || !this.selected) {
    if (this.dispatchEvent(new Event("beforeinput", {
      bubbles: true,
      cancelable: true
    }))) {
      this.selected = !this.selected;
      selectionList[selectionManager].notifySelectionChange(this);
      this.dispatchEvent(new Event("input", {
        bubbles: true
      }));
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  }
};
/** The styles of the element. */
M3eListOptionElement.styles = [M3eListItemElement.styles, css`:host { outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } .base { position: relative; } .indicator { min-width: 24px; min-height: 24px; display: flex; align-items: center; justify-content: center; } :host(:not(:disabled)) { cursor: pointer; } :host(:is(:state(--three-line), :--three-line)) .indicator { align-self: flex-start; margin-top: var(--m3e-list-item-three-line-top-offset, ${DesignToken.measurement.space50}); } :host([selected]) .base, :host([selected]) .state-layer, :host([selected]) .ripple, :host([selected]) .focus-ring { border-radius: var(--m3e-list-item-selected-container-shape, ${DesignToken.shape.corner.large}); } :host([selected]:not(:disabled)) .content { color: var(--m3e-list-item-selected-label-text-color, ${DesignToken.color.onSecondaryContainer}); } :host([selected]:not(:disabled)) ::slotted([slot="overline"]) { color: var(--m3e-list-item-selected-overline-color, ${DesignToken.color.onSecondaryContainer}); } :host([selected]:not(:disabled)) ::slotted([slot="supporting-text"]) { color: var(--m3e-list-item-selected-supporting-text-color, ${DesignToken.color.onSecondaryContainer}); } :host([selected]:not(:disabled)) ::slotted([slot="leading"]) { color: var(--m3e-list-item-selected-leading-color, ${DesignToken.color.onSecondaryContainer}); } :host([selected]:not(:disabled)) ::slotted([slot="trailing"]) { color: var(--m3e-list-item-selected-trailing-color, ${DesignToken.color.onSecondaryContainer}); } :host([selected]:not(:disabled)) .base { background-color: var(--m3e-list-item-selected-container-color, ${DesignToken.color.secondaryContainer}); } :host([selected]:disabled) .base { background-color: color-mix( in srgb, var(--m3e-list-item-selected-disabled-container-color, ${DesignToken.color.onSurface}) var(--m3e-list-item-selected-disabled-container-opacity, 10%), transparent ); } :host([selected]:not(:disabled)) .state-layer { --m3e-state-layer-hover-color: var( --m3e-list-item-selected-hover-state-layer-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-hover-opacity: var( --m3e-list-item-selected-hover-state-layer-opacity, ${DesignToken.state.hoverStateLayerOpacity} ); --m3e-state-layer-focus-color: var( --m3e-list-item-selected-focus-state-layer-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-focus-opacity: var( --m3e-list-item-selected-focus-state-layer-opacity, ${DesignToken.state.focusStateLayerOpacity} ); } :host([selected]:not(:disabled)) .ripple { --m3e-ripple-color: var(--m3e-list-item-selected-pressed-state-layer-color, ${DesignToken.color.onSurface}); --m3e-ripple-opacity: var( --m3e-list-item-selected-pressed-state-layer-opacity, ${DesignToken.state.pressedStateLayerOpacity} ); } :host(:is(:state(--hide-selection), :--hide-selection)) .indicator, :host(:not(:is(:state(--hide-selection), :--hide-selection))) ::slotted([slot="trailing"]) { display: none; } @media (forced-colors: active) { :host([selected]:not(:disabled)) .content, :host([selected]:not(:disabled)) ::slotted([slot="overline"]), :host([selected]:not(:disabled)) ::slotted([slot="supporting-text"]), :host([selected]:not(:disabled)) ::slotted([slot="leading"]), :host([selected]:not(:disabled)) ::slotted([slot="trailing"]) { color: HighlightText; forced-color-adjust: none; } :host([selected]:not(:disabled)) .base { background-color: Highlight; } }`];
__decorate([query(".focus-ring")], M3eListOptionElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eListOptionElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eListOptionElement.prototype, "_ripple", void 0);
__decorate([property()], M3eListOptionElement.prototype, "value", null);
M3eListOptionElement = __decorate([customElement("m3e-list-option")], M3eListOptionElement);

var _M3eSelectionListElement_instances, _M3eSelectionListElement_keyDownHandler, _M3eSelectionListElement_changeHandler, _M3eSelectionListElement_handleChange, _a;
/**
 * A list of selectable options.
 *
 * @description
 * The `m3e-selection-list` component provides a container for managing selectable list items with
 * single or multi-select capabilities. It implements robust keyboard navigation, form association,
 * and state management for both individual options and the list as a whole. The component supports
 * flexible layout, custom theming via CSS custom properties, and comprehensive accessibility features
 * including aria roles, roving tabindex management, and semantic event handling following Material 3
 * design principles.
 *
 * @tag m3e-selection-list
 *
 * @slot - Renders the items of the list.
 *
 * @attr hide-selection-indicator - Whether to hide the selection indicator.
 * @attr multi - Whether multiple items can be selected.
 * @attr variant - The appearance variant of the list.
 *
 * @fires beforeinput - Dispatched before the selected state of an option changes.
 * @fires input - Dispatched when the selected state of an option changes.
 * @fires change - Dispatched when the selected state of an option changes.
 *
 * @cssprop --m3e-list-divider-inset-start-size - Start inset for dividers within the list.
 * @cssprop --m3e-list-divider-inset-end-size - End inset for dividers within the list.
 * @cssprop --m3e-segmented-list-segment-gap - Gap between list items in segmented variant.
 * @cssprop --m3e-segmented-list-container-shape - Border radius of the segmented list container.
 * @cssprop --m3e-segmented-list-item-container-color - Background color of items in segmented variant.
 * @cssprop --m3e-segmented-list-item-disabled-container-color - Background color of disabled items in segmented variant.
 * @cssprop --m3e-segmented-list-item-container-shape - Border radius of items in segmented variant.
 * @cssprop --m3e-segmented-list-item-hover-container-shape - Border radius of items in segmented variant on hover.
 * @cssprop --m3e-segmented-list-item-focus-container-shape - Border radius of items in segmented variant on focus.
 * @cssprop --m3e-segmented-list-item-selected-container-shape - Border radius of items in segmented variant when selected.
 */
let M3eSelectionListElement = class M3eSelectionListElement extends Labelled(Dirty(Touched(FormAssociated(Disabled(AttachInternals(Role(M3eListElement, "listbox"))))))) {
  constructor() {
    super(...arguments);
    _M3eSelectionListElement_instances.add(this);
    /** @private */
    _M3eSelectionListElement_keyDownHandler.set(this, e => this[selectionManager].onKeyDown(e));
    /** @private */
    _M3eSelectionListElement_changeHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectionListElement_instances, "m", _M3eSelectionListElement_handleChange).call(this, e));
    /** @private */
    this[_a] = new SelectionManager().withWrap().withHomeAndEnd().withVerticalOrientation();
    /**
     * Whether multiple items can be selected.
     * @default false
     */
    this.multi = false;
    /**
     * Whether to hide the selection indicator.
     * @default false
     */
    this.hideSelectionIndicator = false;
  }
  /** The options of the list. */
  get options() {
    return this[selectionManager]?.items ?? [];
  }
  /** The selected option(s) of the list. */
  get selected() {
    return this[selectionManager]?.selectedItems ?? [];
  }
  /** The selected (enabled) value(s) of the set. */
  get value() {
    const values = this.selected.filter(x => !x.disabled).map(x => x.value);
    switch (values.length) {
      case 0:
        return null;
      case 1:
        return values[0];
      default:
        return values;
    }
  }
  /** @inheritdoc @internal */
  get [(_M3eSelectionListElement_keyDownHandler = new WeakMap(), _M3eSelectionListElement_changeHandler = new WeakMap(), _M3eSelectionListElement_instances = new WeakSet(), _a = selectionManager, formValue)]() {
    const values = this.value;
    if (Array.isArray(values)) {
      const data = new FormData();
      for (const value of values) {
        data.append(this.name, value);
      }
      return data;
    }
    return values;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eSelectionListElement_keyDownHandler, "f"));
    this.addEventListener("change", __classPrivateFieldGet(this, _M3eSelectionListElement_changeHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eSelectionListElement_keyDownHandler, "f"));
    this.removeEventListener("change", __classPrivateFieldGet(this, _M3eSelectionListElement_changeHandler, "f"));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("disabled") && (changedProperties.get("disabled") !== undefined || this.disabled)) {
      this[selectionManager].disabled = this.disabled;
    }
    if (changedProperties.has("multi")) {
      this[selectionManager].multi = this.multi;
      if (this.multi) {
        this.setAttribute("aria-multiselectable", "true");
      } else {
        this.removeAttribute("aria-multiselectable");
      }
      this[selectionManager].items.forEach(x => x.requestUpdate());
    }
    if (changedProperties.has("hideSelectionIndicator")) {
      this[selectionManager].items.forEach(x => setCustomState(x, "--hide-selection", this.hideSelectionIndicator));
    }
  }
  /** @inheritdoc */
  notifyItemsChange() {
    const {
      added
    } = this[selectionManager].setItems(this.items.filter(x => x instanceof M3eListOptionElement));
    added.forEach(x => setCustomState(x, "--hide-selection", this.hideSelectionIndicator));
    if (!this[selectionManager].activeItem) {
      this[selectionManager].updateActiveItem(added.find(x => !x.disabled));
    }
  }
};
_M3eSelectionListElement_handleChange = function _M3eSelectionListElement_handleChange(e) {
  if (e.target !== this) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
__decorate([property({
  type: Boolean
})], M3eSelectionListElement.prototype, "multi", void 0);
__decorate([property({
  attribute: "hide-selection-indicator",
  type: Boolean
})], M3eSelectionListElement.prototype, "hideSelectionIndicator", void 0);
M3eSelectionListElement = __decorate([customElement("m3e-selection-list")], M3eSelectionListElement);

export { M3eActionListElement, M3eExpandableListItemElement, M3eListActionElement, M3eListElement, M3eListItemElement, M3eListOptionElement, M3eSelectionListElement, isListVariant };
//# sourceMappingURL=list.js.map
