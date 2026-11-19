/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { Role, customElement, Disabled, AttachInternals, setCustomState, DesignToken } from './TextOverflowElement.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LinkButton, renderPseudoLink } from './LinkButton.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';

var _M3eBreadcrumbElement_instances, _M3eBreadcrumbElement_customSeparator, _M3eBreadcrumbElement_handleSlotChange, _M3eBreadcrumbElement_handleSeparatorSlotChange, _M3eBreadcrumbElement_setSeparator;
/**
 * Displays a hierarchical navigation path and identifies the user's
 * current location within an application.
 *
 * @description
 * The `m3e-breadcrumb` component arranges `m3e-breadcrumb-item` children into
 * a trail of navigation steps. It tracks the last item as the current page and
 * supports a custom separator slot for alternate divider content.
 *
 * @example
 * The following example illustrates a simple breadcrumb with three items.
 * ```html
 * <m3e-breadcrumb>
 *   <m3e-breadcrumb-item href="/dashboard">Dashboard</m3e-breadcrumb-item>
 *   <m3e-breadcrumb-item href="/dashboard/reports">Reports</m3e-breadcrumb-item>
 *   <m3e-breadcrumb-item href="/dashboard/reports/annual">Annual</m3e-breadcrumb-item>
 * </m3e-breadcrumb>
 * ```
 *
 * @tag m3e-breadcrumb
 *
 * @slot - Renders breadcrumb items.
 * @slot separator - Renders a custom separator between breadcrumb items.
 *
 * @attr wrap - Whether breadcrumb items should wrap onto a new line.
 */
let M3eBreadcrumbElement = class M3eBreadcrumbElement extends Role(LitElement, "navigation") {
  constructor() {
    super(...arguments);
    _M3eBreadcrumbElement_instances.add(this);
    /** @private */
    _M3eBreadcrumbElement_customSeparator.set(this, []);
    /**
     * Whether items wrap to a new line.
     * @default false
     */
    this.wrap = false;
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" role="list"><slot @slotchange="${__classPrivateFieldGet(this, _M3eBreadcrumbElement_instances, "m", _M3eBreadcrumbElement_handleSlotChange)}"></slot><slot name="separator" @slotchange="${__classPrivateFieldGet(this, _M3eBreadcrumbElement_instances, "m", _M3eBreadcrumbElement_handleSeparatorSlotChange)}"></slot></div>`;
  }
};
_M3eBreadcrumbElement_customSeparator = new WeakMap();
_M3eBreadcrumbElement_instances = new WeakSet();
_M3eBreadcrumbElement_handleSlotChange = function _M3eBreadcrumbElement_handleSlotChange() {
  const items = this.querySelectorAll("m3e-breadcrumb-item");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (i < items.length - 1) {
      item.removeAttribute("current");
    } else if (!item.hasAttribute("current")) {
      item.setAttribute("current", "page");
    }
    __classPrivateFieldGet(this, _M3eBreadcrumbElement_instances, "m", _M3eBreadcrumbElement_setSeparator).call(this, item);
  }
};
_M3eBreadcrumbElement_handleSeparatorSlotChange = function _M3eBreadcrumbElement_handleSeparatorSlotChange(e) {
  __classPrivateFieldSet(this, _M3eBreadcrumbElement_customSeparator, e.target.assignedElements({
    flatten: true
  }), "f");
  this.querySelectorAll("m3e-breadcrumb-item").forEach(x => __classPrivateFieldGet(this, _M3eBreadcrumbElement_instances, "m", _M3eBreadcrumbElement_setSeparator).call(this, x));
};
_M3eBreadcrumbElement_setSeparator = function _M3eBreadcrumbElement_setSeparator(item) {
  item._setSeparator(__classPrivateFieldGet(this, _M3eBreadcrumbElement_customSeparator, "f").map(x => {
    const clone = x.cloneNode(true);
    clone.part = "separator";
    return clone;
  }));
};
/** The styles of the element. */
M3eBreadcrumbElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .base { display: flex; align-items: center; } :host([wrap]) .base { flex-wrap: wrap; } slot[name="separator"] { display: none; }`;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eBreadcrumbElement.prototype, "wrap", void 0);
M3eBreadcrumbElement = __decorate([customElement("m3e-breadcrumb")], M3eBreadcrumbElement);

/**
 * Determines whether a value is a `BreadcrumbItemCurrent`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `BreadcrumbItemCurrent`.
 */
function isBreadcrumbItemCurrent(value) {
  return value === "page" || value === "step" || value === "location" || value === "date" || value === "time" || value === "true";
}

/** @internal */
function isIconOnly(slot) {
  const elements = slot.assignedElements({
    flatten: true
  });
  if (elements.length === 1) {
    const rect = elements[0].getBoundingClientRect();
    return rect.width <= 28 && rect.height <= 28;
  }
  return false;
}

var _M3eBreadcrumbItemButtonElement_instances, _M3eBreadcrumbItemButtonElement_clickHandler, _M3eBreadcrumbItemButtonElement_handleSlotChange, _M3eBreadcrumbItemButtonElement_handleClick;
/**
 * @internal
 * An internal interactive element used to present the content of a breadcrumb item.
 */
let M3eBreadcrumbItemButtonElement = class M3eBreadcrumbItemButtonElement extends KeyboardClick(LinkButton(Focusable(Disabled(AttachInternals(Role(LitElement, "button"), true))))) {
  constructor() {
    super(...arguments);
    _M3eBreadcrumbItemButtonElement_instances.add(this);
    /** @private */
    _M3eBreadcrumbItemButtonElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eBreadcrumbItemButtonElement_instances, "m", _M3eBreadcrumbItemButtonElement_handleClick).call(this, e));
    /**
     * Indicates the current item in the breadcrumb path.
     * @default undefined
     */
    this.current = null;
  }
  /** @inheritdoc */
  connectedCallback() {
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eBreadcrumbItemButtonElement_clickHandler, "f"));
    super.connectedCallback();
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eBreadcrumbItemButtonElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("disabled") || changedProperties.has("current")) {
      this.ariaDisabled = this.disabled && !this.current ? "true" : null;
      if (this.current || this.disabled) {
        this.removeAttribute("tabindex");
      } else {
        this.setAttribute("tabindex", "0");
      }
    }
    if (changedProperties.has("current")) {
      if (this.current) {
        this.role = null;
      } else if (this.hasAttribute("href")) {
        this.role = "link";
      } else {
        this.role = "button";
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" aria-current="${ifDefined(this.current ?? undefined)}">${this.current ? nothing : html`<m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple>${this[renderPseudoLink]()}`}<slot class="icon" name="icon" aria-hidden="true"></slot><m3e-text-overflow class="overflow"><slot @slotchange="${__classPrivateFieldGet(this, _M3eBreadcrumbItemButtonElement_instances, "m", _M3eBreadcrumbItemButtonElement_handleSlotChange)}"></slot></m3e-text-overflow>${this.current ? nothing : html`<div class="touch" aria-hidden="true"></div>`}</div>`;
  }
};
_M3eBreadcrumbItemButtonElement_clickHandler = new WeakMap();
_M3eBreadcrumbItemButtonElement_instances = new WeakSet();
_M3eBreadcrumbItemButtonElement_handleSlotChange = function _M3eBreadcrumbItemButtonElement_handleSlotChange(e) {
  setCustomState(this, "--icon-only", isIconOnly(e.target));
};
_M3eBreadcrumbItemButtonElement_handleClick = function _M3eBreadcrumbItemButtonElement_handleClick(e) {
  // If current and link, disable default link click handler behavior.
  if (this.current && this.href) {
    e.preventDefault();
  }
};
/** The styles of the element. */
M3eBreadcrumbItemButtonElement.styles = css`:host { display: block; outline: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { display: flex; align-items: center; justify-content: center; position: relative; border-radius: var(--m3e-breadcrumb-item-shape, ${DesignToken.shape.corner.full}); height: calc(var(--m3e-breadcrumb-item-container-height, 40px) + ${DesignToken.density.calc(-3)}); column-gap: var(--m3e-breadcrumb-item-icon-label-space, ${DesignToken.measurement.space100}); } .icon { font-size: var(--m3e-breadcrumb-item-icon-size, 20px); --m3e-icon-size: var(--m3e-breadcrumb-item-icon-size, 20px); } ::slotted([slot="icon"]) { font-size: inherit !important; flex: none; } ::slotted(svg[slot="icon"]) { width: 1em; height: 1em; } :host(:is(:state(--icon-only), :--icon-only)) .overflow { flex: none; } :host(:not(:is(:state(--icon-only), :--icon-only))), :host(:not(:is(:state(--icon-only), :--icon-only))) .base { min-width: 0; } :host(:is(:state(--icon-only), :--icon-only):not([current]):not(:disabled)) .base { color: var(--m3e-breadcrumb-item-icon-color, ${DesignToken.color.onSurfaceVariant}); } :host(:is(:state(--icon-only), :--icon-only)) .base { width: calc(var(--m3e-breadcrumb-item-container-height, 40px) + ${DesignToken.density.calc(-3)}); padding-inline: var(--m3e-breadcrumb-item-icon-padding-inline, 0px); --m3e-state-layer-hover-color: var( --m3e-breadcrumb-item-icon-hover-state-layer-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-focus-color: var( --m3e-breadcrumb-item-icon-focus-state-layer-color, ${DesignToken.color.onSurface} ); --m3e-ripple-color: var(--m3e-breadcrumb-item-icon-pressed-state-layer-color, ${DesignToken.color.onSurface}); } :host(:not(:is(:state(--icon-only), :--icon-only)):not([current]):not(:disabled)) .base { color: var(--m3e-breadcrumb-item-label-color, ${DesignToken.color.primary}); } :host(:not(:is(:state(--icon-only), :--icon-only))) .base { font-size: var(--m3e-breadcrumb-item-label-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var( --m3e-breadcrumb-item-label-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight} ); line-height: var( --m3e-breadcrumb-item-label-line-height, ${DesignToken.typescale.standard.label.large.lineHeight} ); letter-spacing: var(--m3e-breadcrumb-item-label-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } :host(:not(:is(:state(--icon-only), :--icon-only))) .base { padding-inline: var(--m3e-breadcrumb-item-label-padding-inline, ${DesignToken.measurement.space150}); --m3e-state-layer-hover-color: var( --m3e-breadcrumb-item-label-hover-state-layer-color, ${DesignToken.color.primary} ); --m3e-state-layer-focus-color: var( --m3e-breadcrumb-item-label-focus-state-layer-color, ${DesignToken.color.primary} ); --m3e-ripple-color: var(--m3e-breadcrumb-item-label-pressed-state-layer-color, ${DesignToken.color.primary}); } :host([current]) .base { color: var(--m3e-breadcrumb-item-last-color, ${DesignToken.color.onSurface}); } :host(:not(:disabled):not([current])) { cursor: pointer; user-select: none; } :host(:disabled:not([current])) .base { color: color-mix( in srgb, var(--m3e-breadcrumb-item-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-breadcrumb-item-disabled-opacity, 38%), transparent ); } .touch { position: absolute; height: 48px; width: max(48px, 100%); margin: auto; } a { all: unset; display: block; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 1; } @media (forced-colors: active) { :host(:is(:state(--icon-only), :--icon-only):not([current]):not(:disabled)) .base, :host(:not(:is(:state(--icon-only), :--icon-only)):not([current]):not(:disabled)) .base { color: LinkText; outline: 1px solid LinkText; } :host(:disabled) .base { color: GrayText; } }`;
__decorate([query(".focus-ring")], M3eBreadcrumbItemButtonElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eBreadcrumbItemButtonElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eBreadcrumbItemButtonElement.prototype, "_ripple", void 0);
__decorate([property({
  reflect: true
})], M3eBreadcrumbItemButtonElement.prototype, "current", void 0);
M3eBreadcrumbItemButtonElement = __decorate([customElement("m3e-breadcrumb-item-button")], M3eBreadcrumbItemButtonElement);

var _M3eBreadcrumbItemElement_instances, _M3eBreadcrumbItemElement_defaultSeparator, _M3eBreadcrumbItemElement_renderSeparator, _M3eBreadcrumbItemElement_handleIconSlotChange, _M3eBreadcrumbItemElement_handleSlotChange, _M3eBreadcrumbItemElement_updateIconFilled;
/**
 * An item in a breadcrumb.
 *
 * @description
 * The `m3e-breadcrumb-item` element represents a single item in a breadcrumb
 * navigation trail. It renders an internal button and supports navigation
 * attributes for link behavior.
 *
 * @tag m3e-breadcrumb-item
 *
 * @slot - Renders the content of the breadcrumb item.
 * @slot icon - Renders an icon before the item's label.
 *
 * @attr item-label - The accessible label used by the internal breadcrumb button.
 * @attr disabled - Whether the breadcrumb item is disabled.
 * @attr current - Marks the breadcrumb item as the current location in the trail.
 * @attr href - The URL to which the internal breadcrumb link button points.
 * @attr target - The target of the internal breadcrumb link button.
 * @attr download - Whether the internal link target will be downloaded, optionally specifying a file name.
 * @attr rel - The relationship between the internal link target and the document.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-breadcrumb-item-shape - Shape of the internal breadcrumb item button.
 * @cssprop --m3e-breadcrumb-item-container-height - Height of the internal breadcrumb item button container.
 * @cssprop --m3e-breadcrumb-item-icon-color - Color of breadcrumb item icon-only content.
 * @cssprop --m3e-breadcrumb-item-icon-padding-inline - Horizontal padding for icon-only breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-icon-hover-state-layer-color - Hover state layer color for icon-only breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-icon-focus-state-layer-color - Focus state layer color for icon-only breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-icon-pressed-state-layer-color - Pressed state layer color for icon-only breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-label-color - Color of breadcrumb item label content.
 * @cssprop --m3e-breadcrumb-item-label-font-size - Font size of breadcrumb item label content.
 * @cssprop --m3e-breadcrumb-item-label-font-weight - Font weight of breadcrumb item label content.
 * @cssprop --m3e-breadcrumb-item-label-line-height - Line height of breadcrumb item label content.
 * @cssprop --m3e-breadcrumb-item-label-tracking - Letter spacing of breadcrumb item label content.
 * @cssprop --m3e-breadcrumb-item-label-padding-inline - Horizontal padding for label breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-label-hover-state-layer-color - Hover state layer color for label breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-label-focus-state-layer-color - Focus state layer color for label breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-label-pressed-state-layer-color - Pressed state layer color for label breadcrumb items.
 * @cssprop --m3e-breadcrumb-item-last-color - Color used for the current breadcrumb item.
 * @cssprop --m3e-breadcrumb-item-icon-label-space - Space between icon and label.
 * @cssprop --m3e-breadcrumb-item-icon-size - Size of the icon.
 * @cssprop --m3e-breadcrumb-item-disabled-color - Disabled color used by the breadcrumb item button.
 * @cssprop --m3e-breadcrumb-item-disabled-opacity - Disabled opacity used by the breadcrumb item button.
 */
let M3eBreadcrumbItemElement = class M3eBreadcrumbItemElement extends LinkButton(AttachInternals(Role(LitElement, "listitem")), true) {
  constructor() {
    super(...arguments);
    _M3eBreadcrumbItemElement_instances.add(this);
    /** @private */
    _M3eBreadcrumbItemElement_defaultSeparator.set(this, void 0);
    /**
     * The accessible label given to the item's internal button.
     * @default ""
     */
    this.itemLabel = "";
    /**
     * Whether the element is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * Indicates the current item in the breadcrumb path.
     * @default null
     */
    this.current = null;
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
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("current") && this.current !== null && !isBreadcrumbItemCurrent(this.current)) {
      this.current = null;
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("current")) {
      __classPrivateFieldGet(this, _M3eBreadcrumbItemElement_instances, "m", _M3eBreadcrumbItemElement_updateIconFilled).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-breadcrumb-item-button class="button" aria-label="${ifDefined(this.itemLabel || undefined)}" ?disabled="${this.disabled}" current="${ifDefined(this.current ?? undefined)}" href="${ifDefined(this.href || undefined)}" target="${ifDefined(this.target || undefined)}" download="${ifDefined(this.download || undefined)}" rel="${ifDefined(this.rel || undefined)}"><slot name="icon" slot="icon" @slotchange="${__classPrivateFieldGet(this, _M3eBreadcrumbItemElement_instances, "m", _M3eBreadcrumbItemElement_handleIconSlotChange)}"></slot><slot @slotchange="${__classPrivateFieldGet(this, _M3eBreadcrumbItemElement_instances, "m", _M3eBreadcrumbItemElement_handleSlotChange)}"></slot></m3e-breadcrumb-item-button>${__classPrivateFieldGet(this, _M3eBreadcrumbItemElement_instances, "m", _M3eBreadcrumbItemElement_renderSeparator).call(this)}</div>`;
  }
  /** @internal */
  _setSeparator(nodes) {
    const separator = this.shadowRoot?.querySelector(".separator");
    if (!separator) return;
    if (nodes.length > 0) {
      if (!__classPrivateFieldGet(this, _M3eBreadcrumbItemElement_defaultSeparator, "f") && separator.firstElementChild) {
        __classPrivateFieldSet(this, _M3eBreadcrumbItemElement_defaultSeparator, separator.firstElementChild, "f");
      }
      separator.replaceChildren(...nodes);
    } else if (__classPrivateFieldGet(this, _M3eBreadcrumbItemElement_defaultSeparator, "f")) {
      separator.replaceChildren(__classPrivateFieldGet(this, _M3eBreadcrumbItemElement_defaultSeparator, "f"));
      __classPrivateFieldSet(this, _M3eBreadcrumbItemElement_defaultSeparator, undefined, "f");
    }
  }
};
_M3eBreadcrumbItemElement_defaultSeparator = new WeakMap();
_M3eBreadcrumbItemElement_instances = new WeakSet();
_M3eBreadcrumbItemElement_renderSeparator = function _M3eBreadcrumbItemElement_renderSeparator() {
  return this.current ? nothing : html`<div class="separator" aria-hidden="true"><svg class="separator-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></div>`;
};
_M3eBreadcrumbItemElement_handleIconSlotChange = function _M3eBreadcrumbItemElement_handleIconSlotChange() {
  __classPrivateFieldGet(this, _M3eBreadcrumbItemElement_instances, "m", _M3eBreadcrumbItemElement_updateIconFilled).call(this);
};
_M3eBreadcrumbItemElement_handleSlotChange = function _M3eBreadcrumbItemElement_handleSlotChange(e) {
  setCustomState(this, "--icon-only", isIconOnly(e.target));
  __classPrivateFieldGet(this, _M3eBreadcrumbItemElement_instances, "m", _M3eBreadcrumbItemElement_updateIconFilled).call(this);
};
_M3eBreadcrumbItemElement_updateIconFilled = function _M3eBreadcrumbItemElement_updateIconFilled() {
  this.querySelectorAll("m3e-icon").forEach(x => x.filled = this.current !== undefined && this.current !== null);
};
/** The styles of the element. */
M3eBreadcrumbItemElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .base { display: flex; align-items: center; height: 100%; } :host(:not(:is(:state(--icon-only), :--icon-only))[current]), :host(:not(:is(:state(--icon-only), :--icon-only))[current]) .base { min-width: 0; } .button { flex: 1 1 auto; } .separator { flex: none; display: flex; justify-content: center; align-items: center; min-width: 8px; --m3e-icon-size: var(--m3e-breadcrumb-separator-icon-size, 24px); } .separator-icon { width: 1em; height: 1em; font-size: var(--m3e-icon-size); vertical-align: middle; }`;
__decorate([query(".button")], M3eBreadcrumbItemElement.prototype, "_button", void 0);
__decorate([property({
  attribute: "item-label"
})], M3eBreadcrumbItemElement.prototype, "itemLabel", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eBreadcrumbItemElement.prototype, "disabled", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eBreadcrumbItemElement.prototype, "current", void 0);
M3eBreadcrumbItemElement = __decorate([customElement("m3e-breadcrumb-item")], M3eBreadcrumbItemElement);

export { M3eBreadcrumbElement, M3eBreadcrumbItemElement, isBreadcrumbItemCurrent };
//# sourceMappingURL=breadcrumb.js.map
