/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ReconnectedCallback, HtmlFor, AttachInternals, MutationController, setCustomEnumState, DesignToken, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { M3eDirectionality } from './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';
import { positionAnchor } from './FloatingPanelElement.js';

/**
 * Determines whether a value is a `BadgeSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `BadgeSize`.
 */
function isBadgeSize(value) {
  return value === "small" || value === "medium" || value === "large";
}

/**
 * Determines whether a value is a `BadgePosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `BadgePosition`.
 */
function isBadgePosition(value) {
  return value === "above-after" || value === "above-before" || value === "below-before" || value === "below-after" || value === "before" || value === "after" || value === "above" || value === "below";
}

var _M3eBadgeElement_instances, _M3eBadgeElement_directionalitySubscription, _M3eBadgeElement_anchorCleanup, _M3eBadgeElement_anchorLastPosition, _M3eBadgeElement_applySize, _M3eBadgeElement_applyPosition, _M3eBadgeElement_updatePadding, _M3eBadgeElement_detach, _M3eBadgeElement_attach, _M3eBadgeElement_initAnchoring;
/**
 * A visual indicator used to label content.
 *
 * @description
 * The `m3e-badge` component is a compact visual indicator used to label content. Designed
 * according to Material Design 3 guidelines, it can display counts, presence, or semantic
 * emphasis, and is attachable to icons, buttons, or other components. Badges support dynamic
 * sizing, color, and shape, ensuring clarity and accessibility while maintaining a consistent,
 * expressive appearance across surfaces.
 *
 * @example
 * The following example illustrates attaching a `m3e-badge` to another element using the `for` attribute.
 * ```html
 * <m3e-button id="button">Button</m3e-button>
 * <m3e-badge for="button">10</m3e-badge>
 * ```
 *
 * @tag m3e-badge
 *
 * @slot - Renders the content of the badge.
 *
 * @attr size - The size of the badge.
 *
 * @cssprop --m3e-badge-shape - Corner radius of the badge.
 * @cssprop --m3e-badge-color - Foreground color of badge content.
 * @cssprop --m3e-badge-container-color - Background color of the badge.
 * @cssprop --m3e-badge-small-size - Fixed dimensions for small badge. Used for minimal indicators (e.g. dot).
 * @cssprop --m3e-badge-medium-size - Height and min-width for medium badge.
 * @cssprop --m3e-badge-medium-font-size - Font size for medium badge label.
 * @cssprop --m3e-badge-medium-font-weight - Font weight for medium badge label.
 * @cssprop --m3e-badge-medium-line-height - Line height for medium badge label.
 * @cssprop --m3e-badge-medium-tracking - Letter spacing for medium badge label.
 * @cssprop --m3e-badge-large-size - Height and min-width for large badge.
 * @cssprop --m3e-badge-large-font-size - Font size for large badge label.
 * @cssprop --m3e-badge-large-font-weight - Font weight for large badge label.
 * @cssprop --m3e-badge-large-line-height - Line height for large badge label.
 * @cssprop --m3e-badge-large-tracking - Letter spacing for large badge label.
 */
let M3eBadgeElement = class M3eBadgeElement extends ReconnectedCallback(HtmlFor(SupportsDirectionality(AttachInternals(LitElement)))) {
  constructor() {
    super();
    _M3eBadgeElement_instances.add(this);
    /** @private */
    _M3eBadgeElement_directionalitySubscription.set(this, void 0);
    /** @private */
    _M3eBadgeElement_anchorCleanup.set(this, void 0);
    /** @private */
    _M3eBadgeElement_anchorLastPosition.set(this, void 0);
    /**
     * The size of the badge.
     * @default "medium"
     */
    this.size = "medium";
    /**
     * The position of the badge, when attached to another element.
     * @default "above-after"
     */
    this.position = "above-after";
    new MutationController(this, {
      skipInitial: true,
      config: {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: false
      },
      callback: () => __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_updatePadding).call(this)
    });
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_attach).call(this);
  }
  /** @inheritdoc */
  detach() {
    super.detach();
    __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_detach).call(this);
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldSet(this, _M3eBadgeElement_directionalitySubscription, M3eDirectionality.observe(() => __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_attach).call(this)), "f");
    __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_applySize).call(this);
    __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_applyPosition).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eBadgeElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_initAnchoring).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_applySize).call(this);
    }
    if (_changedProperties.has("position")) {
      __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_applyPosition).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_initAnchoring).call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("position") || changedProperties.has("size") || changedProperties.has("htmlFor")) {
      __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_attach).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="outer"><div class="inner"><slot @slotchange="${__classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_updatePadding)}"><span aria-hidden="true">&nbsp;</span></slot></div></div>`;
  }
};
_M3eBadgeElement_directionalitySubscription = new WeakMap();
_M3eBadgeElement_anchorCleanup = new WeakMap();
_M3eBadgeElement_anchorLastPosition = new WeakMap();
_M3eBadgeElement_instances = new WeakSet();
_M3eBadgeElement_applySize = function _M3eBadgeElement_applySize() {
  if (!isBadgeSize(this.size)) {
    this.size = "medium";
  }
  setCustomEnumState(this, this.size, "small", "medium", "large");
};
_M3eBadgeElement_applyPosition = function _M3eBadgeElement_applyPosition() {
  if (!isBadgePosition(this.position)) {
    this.position = "above-after";
  }
  setCustomEnumState(this, this.position, "above", "above-after", "above-before", "after", "before", "below", "below-after", "below-before");
};
_M3eBadgeElement_updatePadding = function _M3eBadgeElement_updatePadding() {
  if (!this.isConnected) return;
  this.shadowRoot?.querySelector(".outer")?.style.setProperty("--_badge-padding", this.textContent && this.textContent.length > 2 ? `0 ${this.size === "medium" ? "4px" : this.size === "large" ? "8px" : "0"}` : "");
};
_M3eBadgeElement_detach = function _M3eBadgeElement_detach() {
  __classPrivateFieldGet(this, _M3eBadgeElement_anchorCleanup, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eBadgeElement_anchorCleanup, undefined, "f");
  __classPrivateFieldSet(this, _M3eBadgeElement_anchorLastPosition, undefined, "f");
};
_M3eBadgeElement_attach = function _M3eBadgeElement_attach() {
  __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_detach).call(this);
  __classPrivateFieldGet(this, _M3eBadgeElement_instances, "m", _M3eBadgeElement_initAnchoring).call(this);
};
_M3eBadgeElement_initAnchoring = /** @private */
async function _M3eBadgeElement_initAnchoring() {
  if (__classPrivateFieldGet(this, _M3eBadgeElement_anchorCleanup, "f")) return;
  if (!this.control) return;
  const outer = this.shadowRoot?.querySelector(".outer");
  if (!outer) return;
  let position = "top-end";
  switch (this.position) {
    case "above":
      position = "top";
      break;
    case "above-before":
      position = "top-start";
      break;
    case "after":
      position = "right";
      break;
    case "before":
      position = "left";
      break;
    case "below":
      position = "bottom";
      break;
    case "below-after":
      position = "bottom-end";
      break;
    case "below-before":
      position = "bottom-start";
      break;
  }
  __classPrivateFieldSet(this, _M3eBadgeElement_anchorCleanup, await positionAnchor(outer, this.control, {
    position
  }, (x, y) => {
    if (this.position.includes("before") && this.position !== "before") {
      if (M3eDirectionality.current === "rtl") {
        x += outer.clientWidth;
      } else {
        x -= outer.clientWidth;
      }
    }
    if (this.position.includes("after") && this.position !== "after") {
      if (M3eDirectionality.current === "rtl") {
        x -= outer.clientWidth;
      } else {
        x += outer.clientWidth;
      }
    }
    if (__classPrivateFieldGet(this, _M3eBadgeElement_anchorLastPosition, "f")?.x !== x) {
      outer.style.left = `${x}px`;
    }
    if (__classPrivateFieldGet(this, _M3eBadgeElement_anchorLastPosition, "f")?.y !== y) {
      outer.style.top = `${y}px`;
    }
    __classPrivateFieldSet(this, _M3eBadgeElement_anchorLastPosition, {
      x,
      y
    }, "f");
  }), "f");
};
/** The styles of the element. */
M3eBadgeElement.styles = css`:host([for]) .outer, :host(:not([for])) { display: inline-block; vertical-align: baseline; pointer-events: none; } :host(:not([for])[hidden]), :host([for][hidden]) .outer { display: none; } :host(:not([for])) .outer, :host([for]) .inner { contain: layout style paint; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; white-space: nowrap; vertical-align: baseline; box-sizing: border-box; user-select: none; padding: var(--_badge-padding); border-radius: var(--m3e-badge-shape, ${DesignToken.shape.corner.full}); color: var(--m3e-badge-color, ${DesignToken.color.onError}); background-color: var(--m3e-badge-container-color, ${DesignToken.color.error}); } :host(:not([for])) .inner, :host([for]) { display: contents; } :host([for]) .outer { position: absolute; z-index: 1; } :host([for]:is(:state(--above), :--above)) .outer { transform: translateY(var(--_badge-offset, 0px)); } :host([for]:is(:state(--above-after), :--above-after):not(:is(:state(--rtl), :--rtl))) .outer { transform: translate3d(calc(0px - var(--_badge-offset, 0px)), var(--_badge-offset, 0px), 0); } :host([for]:is(:state(--above-after), :--above-after):is(:state(--rtl), :--rtl)) .outer { transform: translate3d(var(--_badge-offset, 0px), var(--_badge-offset, 0px), 0); } :host([for]:is(:state(--above-before), :--above-before):not(:is(:state(--rtl), :--rtl))) .outer { transform: translate3d(var(--_badge-offset, 0px), var(--_badge-offset, 0px), 0); } :host([for]:is(:state(--above-before), :--above-before):is(:state(--rtl), :--rtl)) .outer { transform: translate3d(calc(0px - var(--_badge-offset, 0px)), var(--_badge-offset, 0px), 0); } :host([for]:is(:state(--below), :--below)) .outer { transform: translateY(calc(0px - var(--_badge-offset, 0px))); } :host([for]:is(:state(--below-after), :--below-after):not(:is(:state(--rtl), :--rtl))) .outer { transform: translate3d(calc(0px - var(--_badge-offset, 0px)), calc(0px - var(--_badge-offset, 0px)), 0); } :host([for]:is(:state(--below-after), :--below-after):is(:state(--rtl), :--rtl)) .outer { transform: translate3d(var(--_badge-offset, 0px), calc(0px - var(--_badge-offset, 0px)), 0); } :host([for]:is(:state(--below-before), :--below-before):not(:is(:state(--rtl), :--rtl))) .outer { transform: translate3d(var(--_badge-offset, 0px), calc(0px - var(--_badge-offset, 0px)), 0); } :host([for]:is(:state(--below-before), :--below-before):is(:state(--rtl), :--rtl)) .outer { transform: translate3d(calc(0px - var(--_badge-offset, 0px)), calc(0px - var(--_badge-offset, 0px)), 0); } :host([for]:is(:state(--before), :--before):not(:is(:state(--rtl), :--rtl))) .outer, :host([for]:is(:state(--before), :--before):is(:state(--rtl), :--rtl)) .outer { transform: translateX(var(--_badge-offset, 0px)); } :host([for]:is(:state(--after), :--after):not(:is(:state(--rtl), :--rtl))) .outer, :host([for]:is(:state(--after), :--after):is(:state(--rtl), :--rtl)) .outer { transform: translateX(calc(0px - var(--_badge-offset, 0px))); } :host(:is(:state(--small), :--small):not([for])), :host(:is(:state(--small), :--small)[for]) .outer { height: var(--m3e-badge-small-size, 6px); max-height: var(--m3e-badge-small-size, 6px); width: var(--m3e-badge-small-size, 6px); min-width: var(--m3e-badge-small-size, 6px); --_badge-offset: var(--m3e-badge-small-offset, 6px); } :host(:is(:state(--small), :--small)) .outer { font-size: 0; } :host(:is(:state(--medium), :--medium):not([for])), :host(:is(:state(--medium), :--medium)[for]) .outer { height: var(--m3e-badge-medium-size, 22px); min-width: var(--m3e-badge-medium-size, 22px); --_badge-offset: var(--m3e-badge-small-offset, 12px); } :host(:is(:state(--medium), :--medium)) .outer { font-size: var(--m3e-badge-medium-font-size, ${DesignToken.typescale.standard.label.small.fontSize}); font-weight: var(--m3e-badge-medium-font-weight, ${DesignToken.typescale.standard.label.small.fontWeight}); line-height: var(--m3e-badge-medium-line-height, ${DesignToken.typescale.standard.label.small.lineHeight}); letter-spacing: var(--m3e-badge-medium-tracking, ${DesignToken.typescale.standard.label.small.tracking}); } :host(:is(:state(--large), :--large):not([for])), :host(:is(:state(--large), :--large)[for]) .outer { height: var(--m3e-badge-large-size, 28px); min-width: var(--m3e-badge-large-size, 28px); --_badge-offset: var(--m3e-badge-small-offset, 16px); } :host(:is(:state(--large), :--large)) .outer { font-size: var(--m3e-badge-large-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-badge-large-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-badge-large-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-badge-large-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } @media (forced-colors: active) { .outer { background-color: ButtonFace; color: ButtonText; outline: 1px solid ButtonText; } }`;
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eBadgeElement.prototype, "size", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eBadgeElement.prototype, "position", void 0);
M3eBadgeElement = __decorate([customElement("m3e-badge")], M3eBadgeElement);

export { M3eBadgeElement, isBadgePosition, isBadgeSize };
//# sourceMappingURL=badge.js.map
