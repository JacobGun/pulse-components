/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldSet, __classPrivateFieldGet, __decorate } from 'tslib';
import { LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { HtmlFor, Role, debounce, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';

/**
 * Adapted from Angular Material CDK Text Field
 * Source: https://github.com/angular/components/blob/main/src/cdk/text-field/autosize.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3eTextareaAutosizeElement_instances, _M3eTextareaAutosizeElement_initialHeight, _M3eTextareaAutosizeElement_cachedLineHeight, _M3eTextareaAutosizeElement_cachedPlaceholderHeight, _M3eTextareaAutosizeElement_previousMinRows, _M3eTextareaAutosizeElement_previousValue, _M3eTextareaAutosizeElement_hasFocus, _M3eTextareaAutosizeElement_appliedMinHeight, _M3eTextareaAutosizeElement_appliedMaxHeight, _M3eTextareaAutosizeElement_windowResizeHandler, _M3eTextareaAutosizeElement_focusHandler, _M3eTextareaAutosizeElement_inputHandler, _M3eTextareaAutosizeElement_cacheTextareaLineHeight, _M3eTextareaAutosizeElement_cacheTextareaPlaceholderHeight, _M3eTextareaAutosizeElement_setMinHeight, _M3eTextareaAutosizeElement_setMaxHeight, _M3eTextareaAutosizeElement_measureScrollHeight, _M3eTextareaAutosizeElement_scrollToCaretPosition;
/**
 * A non-visual element used to automatically resize a `textarea` to fit its content.
 *
 * @description
 * The `m3e-textarea-autosize` component automatically adjusts the height of a linked `textarea` to fit its content,
 * preserving layout integrity and user experience. This non-visual element listens to input changes and applies
 * dynamic resizing, constrained by optional row limits. It supports declarative configuration via attributes and
 * can be disabled when manual control is preferred.
 *
 * @example
 * The following example illustrates the `m3e-textarea-autosize` in conjunction with the `m3e-form-field` to
 * automatically resize a field's `textarea` with a 5 row limit.
 * ```html
 * <m3e-form-field>
 *  <label slot="label" for="fld">Textarea Autosize</label>
 *  <textarea id="fld"></textarea>
 *  <m3e-textarea-autosize for="fld" max-rows="5"></m3e-textarea-autosize>
 * </m3e-form-field>
 * ```
 *
 * @tag m3e-textarea-autosize
 *
 * @attr disabled - Whether auto-sizing is disabled.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr max-rows - The maximum amount of rows in the `textarea`.
 * @attr min-rows - The minimum amount of rows in the `textarea`.
 */
let M3eTextareaAutosizeElement = class M3eTextareaAutosizeElement extends HtmlFor(Role(LitElement, "none")) {
  constructor() {
    super(...arguments);
    _M3eTextareaAutosizeElement_instances.add(this);
    /** @private */
    _M3eTextareaAutosizeElement_initialHeight.set(this, void 0);
    /** @private */
    _M3eTextareaAutosizeElement_cachedLineHeight.set(this, void 0);
    /** @private */
    _M3eTextareaAutosizeElement_cachedPlaceholderHeight.set(this, void 0);
    /** @private */
    _M3eTextareaAutosizeElement_previousMinRows.set(this, void 0);
    /** @private */
    _M3eTextareaAutosizeElement_previousValue.set(this, void 0);
    /** @private */
    _M3eTextareaAutosizeElement_hasFocus.set(this, false);
    /** @private */
    _M3eTextareaAutosizeElement_appliedMinHeight.set(this, false);
    /** @private */
    _M3eTextareaAutosizeElement_appliedMaxHeight.set(this, false);
    /** @private */
    _M3eTextareaAutosizeElement_windowResizeHandler.set(this, () => this._handleWindowResize());
    /** @private */
    _M3eTextareaAutosizeElement_focusHandler.set(this, e => __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_hasFocus, e.type === "focus", "f"));
    /** @private */
    _M3eTextareaAutosizeElement_inputHandler.set(this, () => this.resizeToFitContent());
    /**
     * The maximum amount of rows in the `textarea`.
     * @default 0
     */
    this.maxRows = 0;
    /**
     * The minimum amount of rows in the `textarea`.
     * @default 0
     */
    this.minRows = 0;
    /**
     * Whether auto-sizing is disabled.
     * @default false
     */
    this.disabled = false;
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    if (control instanceof HTMLTextAreaElement) {
      control.style.resize = "none";
      __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_initialHeight, control.style.height, "f");
      control.addEventListener("focus", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_focusHandler, "f"));
      control.addEventListener("blur", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_focusHandler, "f"));
      control.addEventListener("input", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_inputHandler, "f"));
      window.addEventListener("resize", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_windowResizeHandler, "f"));
      this.resizeToFitContent(true);
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.control instanceof HTMLTextAreaElement) {
      window.removeEventListener("resize", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_windowResizeHandler, "f"));
      this.control.removeEventListener("focus", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_focusHandler, "f"));
      this.control.removeEventListener("blur", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_focusHandler, "f"));
      this.control.removeEventListener("input", __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_inputHandler, "f"));
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled") && this.disabled) {
      this.reset();
    } else if (!this.disabled && (_changedProperties.has("disabled") || _changedProperties.has("minRows") || _changedProperties.has("maxRows"))) {
      __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_setMinHeight).call(this);
      __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_setMaxHeight).call(this);
      this.resizeToFitContent(true);
    }
  }
  /**
   * Resize the `textarea` to fit its content.
   * @param {boolean} [force=false] - Whether to force a height recalculation.
   */
  resizeToFitContent(force = false) {
    if (this.disabled || !(this.control instanceof HTMLTextAreaElement)) {
      return;
    }
    __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_cacheTextareaLineHeight).call(this);
    __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_cacheTextareaPlaceholderHeight).call(this);
    if (!__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedLineHeight, "f")) {
      return;
    }
    const value = this.control.value;
    if (!force && this.minRows === __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_previousMinRows, "f") && value === __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_previousValue, "f")) {
      return;
    }
    const scrollHeight = __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_measureScrollHeight).call(this);
    const height = Math.max(scrollHeight, __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedPlaceholderHeight, "f") || 0);
    this.control.style.height = `${height}px`;
    setTimeout(() => __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_scrollToCaretPosition).call(this));
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_previousValue, value, "f");
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_previousMinRows, this.minRows, "f");
  }
  /** Resets the `textarea` to its original size. */
  reset() {
    if (this.control instanceof HTMLTextAreaElement) {
      if (__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_initialHeight, "f") !== undefined) {
        this.control.style.height = __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_initialHeight, "f");
      }
      if (__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_appliedMinHeight, "f")) {
        this.control.style.removeProperty("min-height");
        __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_appliedMinHeight, false, "f");
      }
      if (__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_appliedMaxHeight, "f")) {
        this.control.style.removeProperty("max-height");
        __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_appliedMaxHeight, false, "f");
      }
    }
  }
  /** @private */
  _handleWindowResize() {
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_cachedLineHeight, __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_cachedPlaceholderHeight, undefined, "f"), "f");
    this.resizeToFitContent(true);
  }
};
_M3eTextareaAutosizeElement_initialHeight = new WeakMap();
_M3eTextareaAutosizeElement_cachedLineHeight = new WeakMap();
_M3eTextareaAutosizeElement_cachedPlaceholderHeight = new WeakMap();
_M3eTextareaAutosizeElement_previousMinRows = new WeakMap();
_M3eTextareaAutosizeElement_previousValue = new WeakMap();
_M3eTextareaAutosizeElement_hasFocus = new WeakMap();
_M3eTextareaAutosizeElement_appliedMinHeight = new WeakMap();
_M3eTextareaAutosizeElement_appliedMaxHeight = new WeakMap();
_M3eTextareaAutosizeElement_windowResizeHandler = new WeakMap();
_M3eTextareaAutosizeElement_focusHandler = new WeakMap();
_M3eTextareaAutosizeElement_inputHandler = new WeakMap();
_M3eTextareaAutosizeElement_instances = new WeakSet();
_M3eTextareaAutosizeElement_cacheTextareaLineHeight = function _M3eTextareaAutosizeElement_cacheTextareaLineHeight() {
  if (__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedLineHeight, "f") || !(this.control instanceof HTMLTextAreaElement)) {
    return;
  }
  const clone = this.control.cloneNode(false);
  clone.rows = 1;
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.border = "none";
  clone.style.padding = "0";
  clone.style.height = "";
  clone.style.minHeight = "";
  clone.style.maxHeight = "";
  clone.style.top = clone.style.bottom = clone.style.left = clone.style.right = "auto";
  clone.style.overflow = "hidden";
  this.control.parentElement?.appendChild(clone);
  __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_cachedLineHeight, clone.clientHeight, "f");
  clone.remove();
  __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_setMinHeight).call(this);
  __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_setMaxHeight).call(this);
};
_M3eTextareaAutosizeElement_cacheTextareaPlaceholderHeight = function _M3eTextareaAutosizeElement_cacheTextareaPlaceholderHeight() {
  if (!(this.control instanceof HTMLTextAreaElement) || __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedPlaceholderHeight, "f") != undefined) {
    return;
  }
  if (!this.control.placeholder) {
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_cachedPlaceholderHeight, 0, "f");
    return;
  }
  const value = this.control.value;
  this.control.value = this.control.placeholder;
  __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_cachedPlaceholderHeight, __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_instances, "m", _M3eTextareaAutosizeElement_measureScrollHeight).call(this), "f");
  this.control.value = value;
};
_M3eTextareaAutosizeElement_setMinHeight = function _M3eTextareaAutosizeElement_setMinHeight() {
  if (!this.control || !__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedLineHeight, "f")) return;
  if (this.minRows) {
    this.control.style.minHeight = `${this.minRows * __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedLineHeight, "f")}px`;
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_appliedMinHeight, true, "f");
  } else if (__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_appliedMinHeight, "f")) {
    this.control.style.removeProperty("min-height");
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_appliedMinHeight, false, "f");
  }
};
_M3eTextareaAutosizeElement_setMaxHeight = function _M3eTextareaAutosizeElement_setMaxHeight() {
  if (!this.control || !__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedLineHeight, "f")) return;
  if (this.maxRows) {
    this.control.style.maxHeight = `${this.maxRows * __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_cachedLineHeight, "f")}px`;
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_appliedMaxHeight, true, "f");
  } else if (__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_appliedMaxHeight, "f")) {
    this.control.style.removeProperty("max-height");
    __classPrivateFieldSet(this, _M3eTextareaAutosizeElement_appliedMaxHeight, false, "f");
  }
};
_M3eTextareaAutosizeElement_measureScrollHeight = function _M3eTextareaAutosizeElement_measureScrollHeight() {
  if (!this.control) {
    return 0;
  }
  const element = this.control;
  const previousMargin = element.style.marginBottom || "";
  const isFirefox = navigator.userAgent.includes("Firefox");
  const needsMarginFiller = isFirefox && __classPrivateFieldGet(this, _M3eTextareaAutosizeElement_hasFocus, "f");
  if (needsMarginFiller) {
    element.style.marginBottom = `${element.clientHeight}px`;
  }
  const initialStyle = {
    padding: element.style.padding,
    boxSizing: element.style.boxSizing,
    height: element.style.height,
    overflow: element.style.overflow
  };
  element.style.padding = "2px 0";
  element.style.boxSizing = "content-box";
  if (!isFirefox) {
    element.style.height = "auto";
    element.style.overflow = "hidden";
  } else {
    element.style.height = "0";
  }
  const scrollHeight = element.scrollHeight - 4;
  element.style.padding = initialStyle.padding;
  element.style.boxSizing = initialStyle.boxSizing;
  element.style.height = initialStyle.height;
  element.style.overflow = initialStyle.overflow;
  if (needsMarginFiller) {
    element.style.marginBottom = previousMargin;
  }
  return scrollHeight;
};
_M3eTextareaAutosizeElement_scrollToCaretPosition = function _M3eTextareaAutosizeElement_scrollToCaretPosition() {
  if (!(this.control instanceof HTMLTextAreaElement) || !__classPrivateFieldGet(this, _M3eTextareaAutosizeElement_hasFocus, "f")) {
    return;
  }
  const {
    selectionStart,
    selectionEnd
  } = this.control;
  this.control.setSelectionRange(selectionStart, selectionEnd);
};
/** The styles of the element. */
M3eTextareaAutosizeElement.styles = css`:host { display: none; } :host([hidden]) { display: none; }`;
__decorate([property({
  attribute: "max-rows",
  type: Number
})], M3eTextareaAutosizeElement.prototype, "maxRows", void 0);
__decorate([property({
  attribute: "min-rows",
  type: Number
})], M3eTextareaAutosizeElement.prototype, "minRows", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTextareaAutosizeElement.prototype, "disabled", void 0);
__decorate([debounce(16)], M3eTextareaAutosizeElement.prototype, "_handleWindowResize", null);
M3eTextareaAutosizeElement = __decorate([customElement("m3e-textarea-autosize")], M3eTextareaAutosizeElement);

export { M3eTextareaAutosizeElement };
//# sourceMappingURL=textarea-autosize.js.map
