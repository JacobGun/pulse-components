/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { LitElement, html, nothing, css, unsafeCSS, isServer } from 'lit';
import { Role, DesignToken, customElement, prefersReducedMotion } from './TextOverflowElement.js';
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { property } from 'lit/decorators.js';
import 'lit/directives/if-defined.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { waitForUpdate } from './waitForUpdate.js';
import './ButtonElement.js';
import './IconButtonElement.js';

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
var _M3eSnackbarElement_instances, _M3eSnackbarElement_timeoutId, _M3eSnackbarElement_actionTaken, _M3eSnackbarElement_beforeToggleHandler, _M3eSnackbarElement_renderActionButton, _M3eSnackbarElement_renderCloseButton, _M3eSnackbarElement_handleActionClick, _M3eSnackbarElement_handleDismissClick, _M3eSnackbarElement_handleBeforeToggle;
var M3eSnackbarElement_1;
/**
 * Presents short updates about application processes at the bottom of the screen.
 * @tag m3e-snackbar
 *
 * @slot - Renders the content of the snackbar.
 * @slot close-icon - Renders the icon of the button used to close the snackbar.
 *
 * @attr action - The label of the snackbar's action.
 * @attr close-label - The accessible label given to the button used to dismiss the snackbar.
 * @attr dismissible - Whether a button is presented that can be used to close the snackbar.
 * @attr duration - The length of time, in milliseconds, to wait before automatically dismissing the snackbar.
 * @attr open - Whether the snackbar is open.
 *
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-snackbar-margin - Vertical offset from the bottom of the viewport.
 * @cssprop --m3e-snackbar-container-shape - Border radius of the snackbar container.
 * @cssprop --m3e-snackbar-container-color - Background color of the snackbar.
 * @cssprop --m3e-snackbar-padding - Internal spacing of the snackbar container.
 * @cssprop --m3e-snackbar-min-width - Minimum width of the snackbar.
 * @cssprop --m3e-snackbar-max-width - Maximum width of the snackbar.
 */
let M3eSnackbarElement = M3eSnackbarElement_1 = class M3eSnackbarElement extends Role(LitElement, "status") {
  constructor() {
    super(...arguments);
    _M3eSnackbarElement_instances.add(this);
    /** @private */
    _M3eSnackbarElement_timeoutId.set(this, -1);
    /** @private */
    _M3eSnackbarElement_actionTaken.set(this, false);
    /** @private */
    _M3eSnackbarElement_beforeToggleHandler.set(this, e => __classPrivateFieldGet(this, _M3eSnackbarElement_instances, "m", _M3eSnackbarElement_handleBeforeToggle).call(this, e));
    /**
     * The length of time, in milliseconds, to wait before automatically dismissing the snackbar.
     * @default 3000
     */
    this.duration = 3000;
    /**
     * The label of the snackbar's action.
     * @default ""
     */
    this.action = "";
    /**
     * Whether a button is presented that can be used to close the snackbar.
     * @default false
     */
    this.dismissible = false;
    /**
     * Whether the snackbar is open.
     * @default false
     */
    this.open = false;
    /**
     * The accessible label given to the button used to dismiss the snackbar.
     * @default "Close"
     */
    this.closeLabel = "Close";
  }
  /** The currently open snackbar. */
  static get current() {
    return M3eSnackbarElement_1.__current;
  }
  /** Whether the user clicked the action. */
  get isActionTaken() {
    return __classPrivateFieldGet(this, _M3eSnackbarElement_actionTaken, "f");
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("beforetoggle", __classPrivateFieldGet(this, _M3eSnackbarElement_beforeToggleHandler, "f"));
    this.setAttribute("popover", "manual");
    this.ariaLive = "polite";
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("beforetoggle", __classPrivateFieldGet(this, _M3eSnackbarElement_beforeToggleHandler, "f"));
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><span class="supporting-text"><slot></slot></span>${__classPrivateFieldGet(this, _M3eSnackbarElement_instances, "m", _M3eSnackbarElement_renderActionButton).call(this)} ${__classPrivateFieldGet(this, _M3eSnackbarElement_instances, "m", _M3eSnackbarElement_renderCloseButton).call(this)}</div>`;
  }
  /** @inheritdoc */
  updated(changed) {
    super.updated(changed);
    if (changed.has("open")) {
      const popoverOpen = this.matches(":popover-open");
      if (this.open) {
        if (!popoverOpen) {
          this.showPopover();
        }
      } else if (popoverOpen) {
        this.hidePopover();
      }
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    // After render, compute the (unscaled) height of the snackbar in order
    // to properly position it relative to the viewport.
    // top: calc(100vh - var(--_snackbar-height, 0px) - var(--m3e-snackbar-margin, 16px));
    this.style.setProperty("--_snackbar-height", `${this.getBoundingClientRect().height / 0.8}px`);
  }
};
_M3eSnackbarElement_timeoutId = new WeakMap();
_M3eSnackbarElement_actionTaken = new WeakMap();
_M3eSnackbarElement_beforeToggleHandler = new WeakMap();
_M3eSnackbarElement_instances = new WeakSet();
_M3eSnackbarElement_renderActionButton = function _M3eSnackbarElement_renderActionButton() {
  return !this.action ? nothing : html`<m3e-button @click="${__classPrivateFieldGet(this, _M3eSnackbarElement_instances, "m", _M3eSnackbarElement_handleActionClick)}">${this.action}</m3e-button>`;
};
_M3eSnackbarElement_renderCloseButton = function _M3eSnackbarElement_renderCloseButton() {
  return !this.dismissible ? nothing : html`<m3e-icon-button aria-label="${this.closeLabel}" @click="${__classPrivateFieldGet(this, _M3eSnackbarElement_instances, "m", _M3eSnackbarElement_handleDismissClick)}"><slot name="close-icon"><svg class="close-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></slot></m3e-icon-button>`;
};
_M3eSnackbarElement_handleActionClick = function _M3eSnackbarElement_handleActionClick() {
  __classPrivateFieldSet(this, _M3eSnackbarElement_actionTaken, true, "f");
  this.open = false;
};
_M3eSnackbarElement_handleDismissClick = function _M3eSnackbarElement_handleDismissClick() {
  this.open = false;
};
_M3eSnackbarElement_handleBeforeToggle = /** @private */
async function _M3eSnackbarElement_handleBeforeToggle(e) {
  if (e.newState == "open") {
    if (M3eSnackbarElement_1.__current) {
      M3eSnackbarElement_1.__current.open = false;
      await waitForUpdate(M3eSnackbarElement_1.__current);
    }
    M3eSnackbarElement_1.__current = this;
    if (this.duration > 0) {
      __classPrivateFieldSet(this, _M3eSnackbarElement_timeoutId, setTimeout(() => this.open = false, this.duration), "f");
    }
  } else {
    if (M3eSnackbarElement_1.__current === this) {
      M3eSnackbarElement_1.__current = null;
    }
    clearTimeout(__classPrivateFieldGet(this, _M3eSnackbarElement_timeoutId, "f"));
  }
};
(() => {
  registerStyleSheet(css`m3e-snackbar { margin-inline: auto; }`);
})();
/** The styles of the element. */
M3eSnackbarElement.styles = css`:host { contain: layout style paint; position: fixed; top: calc(100vh - var(--_snackbar-height, 0px) - var(--m3e-snackbar-margin, ${DesignToken.measurement.space200})); display: inline-flex; align-items: center; min-width: var(--m3e-snackbar-min-width, 344px); max-width: var(--m3e-snackbar-max-width, min(672px, 100% - 48px)); visibility: hidden; border: none; margin: 0; padding: 0; opacity: 0; transform: scaleY(0.8); transform-origin: bottom; transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
        transform ${DesignToken.motion.duration.medium1} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } @supports (height: 100dvh) { :host { top: calc( 100dvh - var(--_snackbar-height, 0px) - var(--m3e-snackbar-margin, ${DesignToken.measurement.space200}) ); } } :host([hidden]) { display: none; } :host::backdrop { background-color: transparent; } :host(:popover-open) { visibility: visible; opacity: 1; transform: scaleY(1); } @starting-style { :host(:popover-open) { opacity: 0; transform: scaleY(0.8); } } .base { display: inline-flex; align-items: center; flex: 1 1 auto; box-sizing: border-box; padding: var(--m3e-snackbar-padding, 0 ${DesignToken.measurement.space200} 0 ${DesignToken.measurement.space200}); border-radius: var(--m3e-snackbar-container-shape, ${DesignToken.shape.corner.extraSmall}); background-color: var(--m3e-snackbar-container-color, ${DesignToken.color.inverseSurface}); font-size: var(--m3e-snackbar-supporting-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var( --m3e-snackbar-supporting-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight} ); line-height: var( --m3e-snackbar-supporting-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight} ); letter-spacing: var( --m3e-snackbar-supporting-text-tracking, ${DesignToken.typescale.standard.label.large.tracking} ); color: var(--m3e-snackbar-supporting-text-color, ${DesignToken.color.inverseOnSurface}); --m3e-text-button-label-text-color: var(--m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary}); --m3e-text-button-hover-label-text-color: var( --m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary} ); --m3e-text-button-hover-state-layer-color: var( --m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary} ); --m3e-text-button-focus-label-text-color: var( --m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary} ); --m3e-text-button-focus-state-layer-color: var( --m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary} ); --m3e-text-button-pressed-label-text-color: var( --m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary} ); --m3e-text-button-pressed-state-layer-color: var( --m3e-snackbar-action-text-color, ${DesignToken.color.inversePrimary} ); --m3e-standard-icon-button-icon-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); --m3e-standard-icon-button-hover-icon-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); --m3e-standard-icon-button-hover-state-layer-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); --m3e-standard-icon-button-focus-icon-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); --m3e-standard-icon-button-focus-state-layer-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); --m3e-standard-icon-button-pressed-icon-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); --m3e-standard-icon-button-pressed-state-layer-color: var( --m3e-snackbar-close-icon-color, ${DesignToken.color.inverseOnSurface} ); } :host([dismissible]) .base { padding-inline-end: ${DesignToken.measurement.space100}; } .supporting-text { flex: 1 1 auto; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-clamp: 2; margin-block: var(--m3e-snackbar-supporting-text-margin-block, ${DesignToken.measurement.space175}); } ::slotted([slot="close-icon"]), .close-icon { width: 1em; font-size: var(--m3e-icon-button-icon-size, 24px) !important; } @media (forced-colors: active) { :host { background-color: Canvas; color: CanvasText; border-radius: ${DesignToken.shape.corner.small}; box-sizing: border-box; outline: 1px solid CanvasText; } }`;
/** @private */
M3eSnackbarElement.__current = null;
__decorate([property({
  type: Number
})], M3eSnackbarElement.prototype, "duration", void 0);
__decorate([property()], M3eSnackbarElement.prototype, "action", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSnackbarElement.prototype, "dismissible", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSnackbarElement.prototype, "open", void 0);
__decorate([property({
  attribute: "close-label"
})], M3eSnackbarElement.prototype, "closeLabel", void 0);
M3eSnackbarElement = M3eSnackbarElement_1 = __decorate([customElement("m3e-snackbar")], M3eSnackbarElement);

/**
 * Presents short updates about application processes at the bottom of the screen from anywhere in an application.
 * @example
 * The following example illustrates basic usage.
 * ```js
 * M3eSnackbar.open("File deleted");
 * ```
 * @example
 * The next example illustrates presenting a snackbar with an action and callback.
 * ```js
 * M3eSnackbar.open("File deleted", "Undo", {
 *   actionCallback: () => {
 *     // Undo logic here
 *   },
 * });
 */
class M3eSnackbar {
  static open(message, actionOrDismissibleOrOptions, dismissibleOrOptions, options) {
    if (isServer) return;
    const snackbar = document.createElement("m3e-snackbar");
    snackbar.append(document.createTextNode(message));
    let actualOptions = undefined;
    if (typeof actionOrDismissibleOrOptions == "string") {
      snackbar.action = actionOrDismissibleOrOptions;
    } else if (typeof actionOrDismissibleOrOptions == "boolean") {
      snackbar.dismissible = actionOrDismissibleOrOptions;
    } else {
      actualOptions = actionOrDismissibleOrOptions;
    }
    if (typeof dismissibleOrOptions == "boolean") {
      snackbar.dismissible = dismissibleOrOptions;
    } else if (dismissibleOrOptions) {
      actualOptions = dismissibleOrOptions;
    }
    if (options) {
      actualOptions = options;
    }
    if (actualOptions?.duration !== undefined) {
      snackbar.duration = actualOptions.duration;
    }
    if (actualOptions?.closeLabel) {
      snackbar.closeLabel = actualOptions.closeLabel;
    }
    snackbar.addEventListener("toggle", e => {
      if (e.newState === "closed") {
        if (prefersReducedMotion()) {
          snackbar.remove();
        } else {
          snackbar.addEventListener("transitionend", () => snackbar.remove(), {
            once: true
          });
        }
        if (snackbar.isActionTaken) {
          actualOptions?.actionCallback?.();
        }
      }
    });
    document.body.append(snackbar);
    snackbar.open = true;
  }
  /** Dismisses the currently visible snackbar. */
  static dismiss() {
    M3eSnackbarElement.current?.hidePopover();
  }
}
globalThis.M3eSnackbar = M3eSnackbar;

export { M3eSnackbar, M3eSnackbarElement };
//# sourceMappingURL=snackbar.js.map
