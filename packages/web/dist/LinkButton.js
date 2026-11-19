/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet } from 'tslib';
import { nothing, html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { isDisabledInteractiveMixin } from './DisabledInteractive.js';
import { isDisabledMixin, hasKeys } from './TextOverflowElement.js';

/** A symbol through which to access a function used to render a pseudo link. */
const renderPseudoLink = Symbol("renderPseudoLink");
/**
 * Determines whether a value is a `LinkButtonMixin`.
 * @param {unknown} value The value to test.
 * @returns {value is LinkButtonMixin} Whether `value` is a `LinkButtonMixin`.
 */
function isLinkButtonMixin(value) {
  return hasKeys(value, "download", "href", "rel", "target");
}
const _clickHandler = Symbol("_clickHandler");
/**
 * Mixin to augment an element with behavior that supports functioning as a link.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @param {boolean} [disableClick=false] Whether to disable the default click handler.
 * @returns {Constructor<LinkButtonMixin>} A constructor that implements `LinkButtonMixin`.
 */
function LinkButton(base, disableClick = false) {
  var __LinkButtonMixin_instances, __LinkButtonMixin_handleLinkPointerDown, __LinkButtonMixin_handleLinkFocus, __LinkButtonMixin_handleLinkBlur, _a;
  class _LinkButtonMixin extends base {
    constructor() {
      super(...arguments);
      __LinkButtonMixin_instances.add(this);
      this[_a] = async e => {
        if (isDisabledInteractiveMixin(this) && this.disabledInteractive) {
          e.preventDefault();
          e.stopPropagation();
        }
        // Capture the originating element before yielding, as the composed path is only available during dispatch.
        const origin = e.composedPath()[0];
        await new Promise(resolve => resolve());
        if (e.defaultPrevented) {
          return;
        }
        if (this.href) {
          e.stopImmediatePropagation();
          // Clicks with modifier keys (e.g. open in new tab/window, download) are left to the pseudo link's
          // native activation behavior, as not all browsers honor modifier keys for synthetic clicks.
          if (origin instanceof HTMLAnchorElement && origin.getRootNode() === this.shadowRoot && e instanceof MouseEvent && (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) {
            return;
          }
          e.preventDefault();
          const link = document.createElement("a");
          link.href = this.href;
          link.rel = this.rel;
          link.target = this.target;
          if (this.download != null) {
            link.download = this.download;
          }
          link.addEventListener("click", async () => {
            await new Promise(resolve => resolve());
            link.remove();
          });
          document.body.appendChild(link);
          link.click();
        }
      };
      /**
       * The URL to which the link button points.
       * @default ""
       */
      this.href = "";
      /**
       * The target of the link button.
       * @default ""
       */
      this.target = "";
      /**
       * The relationship between the `target` of the link button and the document.
       * @default ""
       */
      this.rel = "";
    }
    /**
     * Whether the `target` of the link button will be downloaded,
     * optionally specifying the new name of the file.
     * @default null
     */
    get download() {
      return this.getAttribute("download");
    }
    set download(value) {
      const old = this.download;
      if (old !== value) {
        if (value) {
          this.setAttribute("download", value);
        } else {
          this.removeAttribute("download");
        }
        this.requestUpdate("download", old);
      }
    }
    /** @inheritdoc */
    connectedCallback() {
      super.connectedCallback();
      if (!disableClick) {
        this.addEventListener("click", this[_clickHandler]);
      }
      if (this.hasAttribute("href") && this.role === "button") {
        this.role = "link";
      }
    }
    /** @inheritdoc */
    disconnectedCallback() {
      super.disconnectedCallback();
      if (!disableClick) {
        this.removeEventListener("click", this[_clickHandler]);
      }
    }
    /** @internal */
    [(__LinkButtonMixin_instances = new WeakSet(), _a = _clickHandler, renderPseudoLink)]() {
      const disabled = isDisabledMixin(this) && this.disabled;
      const disabledInteractive = isDisabledInteractiveMixin(this) && this.disabledInteractive;
      return !disabled && !disabledInteractive && this.href ? html`<a href="${this.href}" target="${ifDefined(this.target || undefined)}" rel="${ifDefined(this.rel || undefined)}" download="${ifDefined(this.download || undefined)}" tabindex="-1" aria-hidden="true" @pointerdown="${__classPrivateFieldGet(this, __LinkButtonMixin_instances, "m", __LinkButtonMixin_handleLinkPointerDown)}" @focus="${__classPrivateFieldGet(this, __LinkButtonMixin_instances, "m", __LinkButtonMixin_handleLinkFocus)}" @blur="${__classPrivateFieldGet(this, __LinkButtonMixin_instances, "m", __LinkButtonMixin_handleLinkBlur)}"></a>` : nothing;
    }
  }
  __LinkButtonMixin_handleLinkPointerDown = function __LinkButtonMixin_handleLinkPointerDown(e) {
    if (e.button !== 2) {
      // Preventing default cancel's link activation but will not cancel click.
      e.preventDefault();
    } else {
      e.target.removeAttribute("aria-hidden");
    }
  }, __LinkButtonMixin_handleLinkFocus = function __LinkButtonMixin_handleLinkFocus(e) {
    e.target.blur();
    this.focus();
  }, __LinkButtonMixin_handleLinkBlur = function __LinkButtonMixin_handleLinkBlur(e) {
    e.target.setAttribute("aria-hidden", "true");
  };
  __decorate([property()], _LinkButtonMixin.prototype, "href", void 0);
  __decorate([property()], _LinkButtonMixin.prototype, "target", void 0);
  __decorate([property()], _LinkButtonMixin.prototype, "rel", void 0);
  __decorate([property({
    reflect: false
  })], _LinkButtonMixin.prototype, "download", null);
  return _LinkButtonMixin;
}

export { LinkButton, isLinkButtonMixin, renderPseudoLink };
//# sourceMappingURL=LinkButton.js.map
