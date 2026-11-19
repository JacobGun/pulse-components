/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { svg, LitElement, html, css } from 'lit';
import { query, property } from 'lit/decorators.js';
import { Role, AttachInternals, setCustomEnumState, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';

var _a, _IconRegistry_icons, _IconRegistry_observers, _IconRegistry_createKey, _IconRegistry_validateSvgIconInfo;
/** @private */
const PATH_DATA_PATTERN = /^[MmLlHhVvCcSsQqTtAaZz0-9.,\s-]+$/;
/** @private */
const VIEW_BOX_PATTERN = /^-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s+-?\d+(\.\d+)?$/;
/**
 * Service to register and display icons used by the `m3e-icon` component.
 * @internal
 */
class IconRegistry {
  /**
   * Adds an icon to the registry for the given variant and weight.
   * @param {string} name The name of the icon.
   * @param {IconVariant} variant The variant of the icon.
   * @param {SvgIconFillSet} fillSet The SVG data for both fill states (outlined and filled) of the icon.
   */
  static addIcon(name, variant, fillSet) {
    const trustOutlinedViewBox = typeof fillSet.outlined === "string";
    const trustFilledViewBox = typeof fillSet.filled === "string";
    if (typeof fillSet.outlined === "string") {
      fillSet.outlined = {
        viewBox: "0 -960 960 960",
        path: fillSet.outlined
      };
    }
    if (typeof fillSet.filled === "string") {
      fillSet.filled = {
        viewBox: "0 -960 960 960",
        path: fillSet.filled
      };
    }
    __classPrivateFieldGet(this, _a, "m", _IconRegistry_validateSvgIconInfo).call(this, name, variant, fillSet.outlined, trustOutlinedViewBox);
    __classPrivateFieldGet(this, _a, "m", _IconRegistry_validateSvgIconInfo).call(this, name, variant, fillSet.filled, trustFilledViewBox);
    if (typeof window === "undefined") return;
    const key = __classPrivateFieldGet(this, _a, "m", _IconRegistry_createKey).call(this, name, variant);
    __classPrivateFieldGet(this, _a, "f", _IconRegistry_icons).set(key, {
      outlined: svg`<svg viewBox="${fillSet.outlined.viewBox}"><path d="${fillSet.outlined.path}"/></svg>`,
      filled: svg`<svg viewBox="${fillSet.filled.viewBox}"><path d="${fillSet.filled.path}"/></svg>`
    });
    const observers = __classPrivateFieldGet(this, _a, "f", _IconRegistry_observers).get(key);
    observers?.slice().forEach(x => x());
  }
  /**
   * Determines whether an icon is registered for the given variant.
   * @param {string} name The name of the icon.
   * @param {IconVariant} variant The variant of the icon.
   * @returns {boolean} Whether `icon` is registered for the given `variant`.
   */
  static isIconRegistered(name, variant) {
    return window !== undefined && __classPrivateFieldGet(this, _a, "f", _IconRegistry_icons).has(__classPrivateFieldGet(this, _a, "m", _IconRegistry_createKey).call(this, name, variant));
  }
  /**
   * Renders an icon from the registry.
   * @param {string} name The name of the icon.
   * @param {IconVariant} variant The variant of the icon.
   * @param {boolean} filled Whether to render a filled variant of the icon.
   * @returns {SVGTemplateResult | undefined} A `SVGTemplateResult` used to render the icon.
   */
  static renderIcon(name, variant, filled) {
    const data = __classPrivateFieldGet(this, _a, "f", _IconRegistry_icons).get(__classPrivateFieldGet(this, _a, "m", _IconRegistry_createKey).call(this, name, variant));
    return filled ? data?.filled : data?.outlined;
  }
  /**
   * Begins observing registration for the specified icon.
   * @param {string} name The name of the icon to observe.
   * @param {IconVariant} variant The variant of the icon to observe.
   * @param {() => void} callback Callback invoked when the specified icon is registered for the given variant.
   * @returns {() => void} Function used to stop observing.
   */
  static observe(name, variant, callback) {
    if (window === undefined) return () => {};
    const key = __classPrivateFieldGet(this, _a, "m", _IconRegistry_createKey).call(this, name, variant);
    if (!__classPrivateFieldGet(this, _a, "f", _IconRegistry_observers).has(key)) {
      __classPrivateFieldGet(this, _a, "f", _IconRegistry_observers).set(key, [callback]);
    } else {
      __classPrivateFieldGet(this, _a, "f", _IconRegistry_observers).get(key)?.push(callback);
    }
    return () => {
      const callbacks = __classPrivateFieldGet(this, _a, "f", _IconRegistry_observers).get(key);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index >= 0) {
          callbacks.splice(index, 1);
        }
        if (callbacks.length == 0) {
          __classPrivateFieldGet(this, _a, "f", _IconRegistry_observers).delete(key);
        }
      }
    };
  }
}
_a = IconRegistry, _IconRegistry_createKey = function _IconRegistry_createKey(name, variant) {
  return `${variant}-${name}`;
}, _IconRegistry_validateSvgIconInfo = function _IconRegistry_validateSvgIconInfo(name, variant, info, trustViewBox = false) {
  if (!trustViewBox && !VIEW_BOX_PATTERN.test(info.viewBox)) {
    throw new Error(`Unable to register icon '${name}' for variant '${variant}'. Invalid viewbox data.`);
  }
  if (!PATH_DATA_PATTERN.test(info.path)) {
    throw new Error(`Unable to register icon '${name}' for variant '${variant}'. Invalid path data.`);
  }
};
/** @private */
_IconRegistry_icons = {
  value: new Map()
};
/** @private */
_IconRegistry_observers = {
  value: new Map()
};

/**
 * Determines whether a value is an `IconVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconVariant`.
 */
function isIconVariant(value) {
  return value === "outlined" || value === "rounded" || value === "sharp";
}

/**
 * Determines whether a value is an `IconGrade`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconGrade`.
 */
function isIconGrade(value) {
  return value === "low" || value === "medium" || value === "high";
}

/**
 * Determines whether a value is an `IconWeight`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `IconWeight`.
 */
function isIconWeight(value) {
  return value === 100 || value === 200 || value === 300 || value === 400 || value === 500 || value === 600 || value === 700;
}

var _M3eIconElement_instances, _M3eIconElement_iconRegistryUnobserve, _M3eIconElement_applyVariant, _M3eIconElement_applyGrade, _M3eIconElement_applyWeight;
/**
 * A small symbol used to easily identify an action or category.
 *
 * @description
 * The `m3e-icon` component makes it easier to use Material Symbols in your application. Material Symbols are Google's newest icons supporting
 * a range of design variants. For more information, see:
 * - {@link https://developers.google.com/fonts/docs/material_symbols|Material Symbol Guide}
 * - {@link https://fonts.google.com/icons|Material Symbol Library}
 *
 * The Material Symbols font is the easiest way to incorporate Material Symbols into your application. Using the
 * {@link https://developers.google.com/fonts/docs/css2#forming_api_urls|Fonts CSS API}, you can use variable fonts to optimize icon
 * usage within your application. See {@link https://caniuse.com/variable-fonts|Can I Use's Variable Fonts} to determine whether
 * your user's browser support variable fonts.
 *
 * @example
 * The following example illustrates showing the `home` icon. The `name` attribute specifies the icon to present.
 * ```html
 * <m3e-icon name="home"></m3e-icon>
 * ```
 * @example
 * The next example illustrates a link used to download a variable font for outlined icons with fill support.
 * ```html
 * <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" rel="stylesheet"/>
 * ```
 *
 * @tag m3e-icon
 *
 * @attr filled - Whether the icon is filled.
 * @attr grade - The grade of the icon.
 * @attr optical-size - A value from 20 to 48 indicating the optical size of the icon.
 * @attr name - The name of the icon.
 * @attr variant - The appearance variant of the icon.
 * @attr weight - A value from 100 to 700 indicating the weight of the icon.
 */
let M3eIconElement = class M3eIconElement extends Role(AttachInternals(LitElement), "img") {
  constructor() {
    super(...arguments);
    _M3eIconElement_instances.add(this);
    /** @private */
    _M3eIconElement_iconRegistryUnobserve.set(this, void 0);
    /** The name of the icon. */
    this.name = "";
    /**
     * The appearance variant of the icon.
     * @default "outlined"
     */
    this.variant = "outlined";
    /**
     * Whether the icon is filled.
     * @default false
     */
    this.filled = false;
    /**
     * The grade of the icon.
     * @default "medium"
     */
    this.grade = "medium";
    /**
     * A value from 100 to 700 indicating the weight of the icon.
     * @default 400
     */
    this.weight = 400;
    /**
     * A value from 20 to 48 indicating the optical size of the icon.
     * @default 24
     */
    this.opticalSize = 24;
  }
  /** @inheritdoc */
  connectedCallback() {
    if (!this.hasAttribute("aria-label") && !this.hasAttribute("aria-labelledby") && !this.hasAttribute("aria-hidden")) {
      this.ariaHidden = "true";
    }
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eIconElement_instances, "m", _M3eIconElement_applyVariant).call(this);
    __classPrivateFieldGet(this, _M3eIconElement_instances, "m", _M3eIconElement_applyGrade).call(this);
    __classPrivateFieldGet(this, _M3eIconElement_instances, "m", _M3eIconElement_applyWeight).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eIconElement_iconRegistryUnobserve, "f")?.call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("name") && !IconRegistry.isIconRegistered(this.name, this.variant)) {
      __classPrivateFieldSet(this, _M3eIconElement_iconRegistryUnobserve, IconRegistry.observe(this.name, this.variant, () => {
        this.requestUpdate();
        __classPrivateFieldGet(this, _M3eIconElement_iconRegistryUnobserve, "f")?.call(this);
        __classPrivateFieldSet(this, _M3eIconElement_iconRegistryUnobserve, undefined, "f");
      }), "f");
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _M3eIconElement_instances, "m", _M3eIconElement_applyVariant).call(this);
    }
    if (_changedProperties.has("filled")) {
      this._icon?.style.setProperty("--_icon-fill", this.filled ? "1" : "0");
    }
    if (_changedProperties.has("grade")) {
      __classPrivateFieldGet(this, _M3eIconElement_instances, "m", _M3eIconElement_applyGrade).call(this);
      this._icon?.style.setProperty("--_icon-grade", this.grade === "low" ? "-25" : this.grade === "high" ? "200" : "0");
    }
    if (_changedProperties.has("weight")) {
      __classPrivateFieldGet(this, _M3eIconElement_instances, "m", _M3eIconElement_applyWeight).call(this);
      this._icon?.style.setProperty("--_icon-weight", `${this.weight}`);
    }
    if (_changedProperties.has("opticalSize")) {
      this._icon?.style.setProperty("--_icon-optical-size", `${this.opticalSize}`);
    }
  }
  /** @inheritdoc */
  render() {
    return IconRegistry.isIconRegistered(this.name, this.variant) ? IconRegistry.renderIcon(this.name, this.variant, this.filled) : html`<div class="icon" aria-hidden="true" translate="no">${this.name}</div>`;
  }
};
_M3eIconElement_iconRegistryUnobserve = new WeakMap();
_M3eIconElement_instances = new WeakSet();
_M3eIconElement_applyVariant = function _M3eIconElement_applyVariant() {
  if (!isIconVariant(this.variant)) {
    this.variant = "outlined";
  }
  setCustomEnumState(this, this.variant, "outlined", "rounded", "sharp");
};
_M3eIconElement_applyGrade = function _M3eIconElement_applyGrade() {
  if (!isIconGrade(this.grade)) {
    this.grade = "medium";
  }
};
_M3eIconElement_applyWeight = function _M3eIconElement_applyWeight() {
  if (!isIconWeight(this.weight)) {
    this.weight = 400;
  }
};
/** The styles of the element. */
M3eIconElement.styles = css`:host { display: inline-block; user-select: none; font-size: var(--m3e-icon-size, 24px); line-height: 1em; width: 1em; height: 1em; vertical-align: middle; overflow: hidden; } :host([hidden]) { display: none; } .icon { font-weight: normal; font-style: normal; line-height: 1; letter-spacing: normal; text-transform: none; white-space: nowrap; word-wrap: normal; direction: ltr; font-feature-settings: "liga"; -webkit-font-smoothing: antialiased; width: inherit; height: inherit; vertical-align: inherit; font-variation-settings: "FILL" var(--_icon-fill, 0), "wght" var(--_icon-weight, 400), "GRAD" var(--_icon-grade, 0), "opsz" var(--_icon-optical-size, 24); } :host(:is(:state(--outlined), :--outlined)) .icon { font-family: "Material Symbols Outlined"; } :host(:is(:state(--rounded), :--rounded)) .icon { font-family: "Material Symbols Rounded"; } :host(:is(:state(--sharp), :--sharp)) .icon { font-family: "Material Symbols Sharp"; } svg { fill: currentColor; font-size: inherit; width: 1em; height: 1em; }`;
__decorate([query(".icon")], M3eIconElement.prototype, "_icon", void 0);
__decorate([property()], M3eIconElement.prototype, "name", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eIconElement.prototype, "variant", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eIconElement.prototype, "filled", void 0);
__decorate([property()], M3eIconElement.prototype, "grade", void 0);
__decorate([property({
  type: Number
})], M3eIconElement.prototype, "weight", void 0);
__decorate([property({
  attribute: "optical-size",
  type: Number
})], M3eIconElement.prototype, "opticalSize", void 0);
M3eIconElement = __decorate([customElement("m3e-icon")], M3eIconElement);

/**
 * Registers an SVG icon to the internal icon registry used by `m3e-icon`.
 * @param {string} name The name of the icon.
 * @param {IconVariant} variant The variant of the icon.
 * @param data The outlined and filled SVG information of the icon.
 */
function registerIcon(name, variant, data) {
  IconRegistry.addIcon(name, variant, data);
}

export { M3eIconElement, isIconGrade, isIconVariant, registerIcon };
//# sourceMappingURL=icon.js.map
