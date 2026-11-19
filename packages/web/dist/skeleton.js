/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ReconnectedCallback, AttachInternals, setCustomState, DesignToken, customElement } from './TextOverflowElement.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { waitForUpgrade } from './waitForUpgrade.js';
import 'lit/directives/if-defined.js';
import { positionAnchor } from './FloatingPanelElement.js';

/**
 * Determines whether a value is a `SkeletonAnimation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SkeletonAnimation`.
 */
function isSkeletonAnimation(value) {
  return value === "pulse" || value === "wave" || value === "none";
}

/**
 * Determines whether a value is a `SkeletonShape`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SkeletonShape`.
 */
function isSkeletonShape(value) {
  return value === "circular" || value === "rounded" || value === "square" || value === "auto";
}

var _M3eSkeletonElement_instances, _M3eSkeletonElement_anchoringCleanupMap, _M3eSkeletonElement_animation, _M3eSkeletonElement_animationMode, _M3eSkeletonElement_applyAnimation, _M3eSkeletonElement_applyShape, _M3eSkeletonElement_handleSlotChange, _M3eSkeletonElement_clearShapes, _M3eSkeletonElement_createShapes, _M3eSkeletonElement_createShape, _M3eSkeletonElement_updateLoading, _M3eSkeletonElement_startMotion, _M3eSkeletonElement_stopMotion, _M3eSkeletonElement_syncMotionState;
var M3eSkeletonElement_1;
/**
 * A visual placeholder that mimics the layout of content while it's still loading.
 * @description
 * The `m3e-skeleton` component provides a loading placeholder surface with flexible shape variants and
 * motion-based animations that communicate loading state while preserving layout stability. It mimics
 * the layout of content while it's still loading, ensuring a smooth user experience during data fetching
 * or rendering delays. The component supports different animation effects (`pulse`, `wave`, `none`) and
 * shape variants (`circular`, `rounded`, `square`, `auto`) to adapt to various content types. When the
 * content is loaded, the skeleton fades out with a smooth transition.
 *
 * @example
 * The following example illustrates a skeleton shaped and sized by the slotted `m3e-card`.
 * ```html
 * <m3e-skeleton>
 *  <m3e-card></m3e-card>
 * </m3e-skeleton>
 * ```
 *
 * @tag m3e-skeleton
 *
 * @attr animation - The animation effect of the skeleton.
 * @attr shape - The shape of the skeleton.
 * @attr loaded - Whether the content of the skeleton has been loaded.
 *
 * @slot - Renders the content to be mimicked by the skeleton.
 *
 * @cssprop --m3e-skeleton-color - Base fill color for the skeleton surface.
 * @cssprop --m3e-skeleton-tint-color - Tint fill color for the skeleton surface.
 * @cssprop --m3e-skeleton-tint-opacity - Tint Opacity applied when the skeleton animation is not pulsating.
 * @cssprop --m3e-skeleton-accent-color - Accent color used in wave animation.
 * @cssprop --m3e-skeleton-accent-opacity - Opacity of the accent effect in animations.
 * @cssprop --m3e-skeleton-rounded-shape - Corner radius for the rounded skeleton shape.
 * @cssprop --m3e-skeleton-circular-shape - Corner radius for the circular skeleton shape.
 * @cssprop --m3e-skeleton-square-shape - Corner radius for the square skeleton shape.
 * @cssprop --m3e-skeleton-shape - Corner radius for the skeleton shape.
 */
let M3eSkeletonElement = M3eSkeletonElement_1 = class M3eSkeletonElement extends ReconnectedCallback(AttachInternals(LitElement)) {
  constructor() {
    super(...arguments);
    _M3eSkeletonElement_instances.add(this);
    /** @private */
    _M3eSkeletonElement_anchoringCleanupMap.set(this, new Map());
    /** @private */
    _M3eSkeletonElement_animation.set(this, null);
    /** The animation mode `#animation` was created for, so mode changes recreate it. @private */
    _M3eSkeletonElement_animationMode.set(this, null);
    /**
     * The shape of the skeleton.
     * @default "auto"
     */
    this.shape = "auto";
    /**
     * The animation effect of the skeleton.
     * @default "wave"
     */
    this.animation = "wave";
    /**
     * Whether the content of the skeleton has been loaded.
     * @default false
     */
    this.loaded = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_applyAnimation).call(this);
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_applyShape).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_clearShapes).call(this);
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_stopMotion).call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_createShapes).call(this);
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_updateLoading).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("animation")) {
      __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_applyAnimation).call(this);
    }
    if (_changedProperties.has("shape")) {
      __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_applyShape).call(this);
    }
    if (_changedProperties.has("loaded") || _changedProperties.has("animation")) {
      __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_updateLoading).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("animation") && !this.loaded) {
      __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_updateLoading).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<slot ?inert="${!this.loaded}" @slotchange="${__classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_handleSlotChange)}"></slot>`;
  }
  /** Whether motion is currently suppressed for accessibility or forced-colors reasons. @private */
  static __motionDisabled() {
    return M3eSkeletonElement_1.__reducedMediaQuery.matches || M3eSkeletonElement_1.__forcedColorsMediaQuery.matches;
  }
  /**
   * Re-applies the current motion preference to every animating skeleton. Invoked when
   * the reduced-motion or forced-colors preference changes.
   * @private
   */
  static __updateMotion() {
    for (const skeleton of M3eSkeletonElement_1.__animating) {
      __classPrivateFieldGet(skeleton, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_syncMotionState).call(skeleton);
    }
  }
};
_M3eSkeletonElement_anchoringCleanupMap = new WeakMap();
_M3eSkeletonElement_animation = new WeakMap();
_M3eSkeletonElement_animationMode = new WeakMap();
_M3eSkeletonElement_instances = new WeakSet();
_M3eSkeletonElement_applyAnimation = function _M3eSkeletonElement_applyAnimation() {
  if (!isSkeletonAnimation(this.animation)) {
    this.animation = "wave";
  }
  setCustomState(this, "--pulse", this.animation === "pulse");
  setCustomState(this, "--wave", this.animation === "wave");
};
_M3eSkeletonElement_applyShape = function _M3eSkeletonElement_applyShape() {
  if (!isSkeletonShape(this.shape)) {
    this.shape = "auto";
  }
  setCustomState(this, "--circular", this.shape === "circular");
  setCustomState(this, "--rounded", this.shape === "rounded");
  setCustomState(this, "--square", this.shape === "square");
};
_M3eSkeletonElement_handleSlotChange = /** @private */
async function _M3eSkeletonElement_handleSlotChange() {
  __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_createShapes).call(this);
};
_M3eSkeletonElement_clearShapes = function _M3eSkeletonElement_clearShapes() {
  for (const item of __classPrivateFieldGet(this, _M3eSkeletonElement_anchoringCleanupMap, "f")) {
    item[0].remove();
    item[1]();
  }
  __classPrivateFieldGet(this, _M3eSkeletonElement_anchoringCleanupMap, "f").clear();
};
_M3eSkeletonElement_createShapes = /** @private */
async function _M3eSkeletonElement_createShapes() {
  __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_clearShapes).call(this);
  const slot = this.shadowRoot?.querySelector("slot");
  if (!slot) return;
  for (const element of slot.assignedElements({
    flatten: true
  }).filter(x => x instanceof HTMLElement)) {
    await __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_createShape).call(this, element);
  }
};
_M3eSkeletonElement_createShape = /** @private */
async function _M3eSkeletonElement_createShape(element) {
  await waitForUpgrade(element);
  const shape = document.createElement("div");
  shape.classList.add("shape");
  if (this.shape === "auto") {
    let borderRadius = getComputedStyle(element).borderRadius;
    if (!borderRadius || borderRadius === "0px") {
      const firstElement = element.shadowRoot?.firstElementChild;
      if (firstElement && !firstElement.nextElementSibling) {
        borderRadius = getComputedStyle(firstElement).borderRadius;
      }
    }
    if (borderRadius && borderRadius !== "0px") {
      shape.style.borderRadius = borderRadius;
    }
  }
  const anchoringCleanup = await positionAnchor(shape, element, {
    position: "bottom"
  }, (x, y) => {
    shape.style.left = `${x}px`;
    shape.style.top = `${y - element.clientHeight}px`;
    shape.style.width = `${element.clientWidth}px`;
    shape.style.height = `${element.clientHeight}px`;
  });
  __classPrivateFieldGet(this, _M3eSkeletonElement_anchoringCleanupMap, "f").set(shape, anchoringCleanup);
  this.shadowRoot?.appendChild(shape);
};
_M3eSkeletonElement_updateLoading = function _M3eSkeletonElement_updateLoading() {
  if (this.isConnected && !this.loaded && (this.animation === "wave" || this.animation === "pulse")) {
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_startMotion).call(this);
  } else {
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_stopMotion).call(this);
  }
};
_M3eSkeletonElement_startMotion = function _M3eSkeletonElement_startMotion() {
  if (__classPrivateFieldGet(this, _M3eSkeletonElement_animation, "f")) {
    if (__classPrivateFieldGet(this, _M3eSkeletonElement_animationMode, "f") === this.animation) {
      // Already running for the current mode; nothing to do but re-sync motion state.
      __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_syncMotionState).call(this);
      return;
    }
    // Effect mode changed (wave <-> pulse); tear down and recreate below.
    __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_stopMotion).call(this);
  }
  M3eSkeletonElement_1.__motionOrigin ??= document.timeline.currentTime ?? 0;
  const animation = this.animation === "pulse" ? this.animate([{
    ["--_m3e-skeleton-pulse-norm"]: 0
  }, {
    ["--_m3e-skeleton-pulse-norm"]: 1
  }, {
    ["--_m3e-skeleton-pulse-norm"]: 0
  }], {
    duration: 1200,
    iterations: Infinity,
    easing: "ease-in-out"
  }) : this.animate([{
    ["--_m3e-skeleton-wave-pct"]: 0
  }, {
    ["--_m3e-skeleton-wave-pct"]: 1
  }], {
    duration: 2100,
    iterations: Infinity,
    easing: "linear"
  });
  animation.startTime = M3eSkeletonElement_1.__motionOrigin;
  __classPrivateFieldSet(this, _M3eSkeletonElement_animation, animation, "f");
  __classPrivateFieldSet(this, _M3eSkeletonElement_animationMode, this.animation, "f");
  M3eSkeletonElement_1.__animating.add(this);
  __classPrivateFieldGet(this, _M3eSkeletonElement_instances, "m", _M3eSkeletonElement_syncMotionState).call(this);
};
_M3eSkeletonElement_stopMotion = function _M3eSkeletonElement_stopMotion() {
  if (!__classPrivateFieldGet(this, _M3eSkeletonElement_animation, "f")) {
    return;
  }
  __classPrivateFieldGet(this, _M3eSkeletonElement_animation, "f").cancel();
  __classPrivateFieldSet(this, _M3eSkeletonElement_animation, null, "f");
  __classPrivateFieldSet(this, _M3eSkeletonElement_animationMode, null, "f");
  M3eSkeletonElement_1.__animating.delete(this);
};
_M3eSkeletonElement_syncMotionState = function _M3eSkeletonElement_syncMotionState() {
  if (!__classPrivateFieldGet(this, _M3eSkeletonElement_animation, "f")) {
    return;
  }
  if (M3eSkeletonElement_1.__motionDisabled()) {
    __classPrivateFieldGet(this, _M3eSkeletonElement_animation, "f").pause();
  } else {
    __classPrivateFieldGet(this, _M3eSkeletonElement_animation, "f").play();
  }
};
/** Skeletons with a live per-instance animation, so preference changes re-sync them all. @private */
M3eSkeletonElement.__animating = new Set();
/** Shared timeline origin so every skeleton's wave/pulse stays in phase. @private */
M3eSkeletonElement.__motionOrigin = null;
(() => {
  if (typeof window !== "undefined") {
    registerStyleSheet(css`@property --_m3e-skeleton-wave-pct { syntax: "<number>"; inherits: true; initial-value: 0; } @property --_m3e-skeleton-pulse-norm { syntax: "<number>"; inherits: true; initial-value: 0; } :root { --_m3e-skeleton-wave-span: 40vw; --_m3e-skeleton-pulse-min: 0.06; }</number></number>`);
    M3eSkeletonElement_1.__reducedMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    M3eSkeletonElement_1.__forcedColorsMediaQuery = window.matchMedia("(forced-colors: active)");
    M3eSkeletonElement_1.__reducedMediaQuery.addEventListener("change", () => M3eSkeletonElement_1.__updateMotion());
    M3eSkeletonElement_1.__forcedColorsMediaQuery.addEventListener("change", () => M3eSkeletonElement_1.__updateMotion());
  }
})();
/** The styles of the element. */
M3eSkeletonElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; } .shape { position: absolute; overflow: hidden; pointer-events: none; opacity: 1; background-color: var(--m3e-skeleton-color, ${DesignToken.color.surface}); } .shape::before { content: ""; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: color-mix( in srgb, var(--m3e-skeleton-tint-color, ${DesignToken.color.onSurface}) var(--m3e-skeleton-tint-opacity, 8%), transparent ); } :host(:not([loaded])) { contain: layout style paint; } :host(:not([loaded])) slot { visibility: hidden; } :host([loaded]) .shape { opacity: 0; transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--rounded), :--rounded)) .shape { border-radius: var(--m3e-skeleton-rounded-shape, var(--m3e-skeleton-shape, ${DesignToken.shape.corner.large})); } :host(:is(:state(--circular), :--circular)) .shape { border-radius: var(--m3e-skeleton-circular-shape, var(--m3e-skeleton-shape, ${DesignToken.shape.corner.full})); } :host(:is(:state(--square), :--square)) .shape { border-radius: var(--m3e-skeleton-square-shape, var(--m3e-skeleton-shape, 0px)); } :host(:is(:state(--pulse), :--pulse):not([loaded])) .shape::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: calc( var(--m3e-skeleton-accent-opacity, 0.06) + (1 - var(--m3e-skeleton-accent-opacity, 0.06)) * var(--_m3e-skeleton-pulse-norm) ); background-color: var(--m3e-skeleton-tint-color, ${DesignToken.color.surfaceDim}); } :host(:is(:state(--wave), :--wave):not([loaded])) .shape::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient( 90deg, transparent 0%, transparent 35%, var(--m3e-skeleton-accent-color, ${DesignToken.color.onSurface}) 50%, transparent 65%, transparent 100% ); background-attachment: fixed; background-size: calc(100vw + var(--_m3e-skeleton-wave-span) * 2) 100%; background-position-x: calc( var(--_m3e-skeleton-wave-pct) * (100vw + var(--_m3e-skeleton-wave-span) * 2) - var(--_m3e-skeleton-wave-span) ); opacity: var(--m3e-skeleton-accent-opacity, 0.06); } @media (forced-colors: active) { :host([loaded]) .shape { transition: none; } .shape::after { display: none; } .shape { background-color: GrayText; } } @media (prefers-reduced-motion) { :host([loaded]) .shape { transition: none; } .shape::after { display: none; } }`;
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSkeletonElement.prototype, "shape", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSkeletonElement.prototype, "animation", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSkeletonElement.prototype, "loaded", void 0);
M3eSkeletonElement = M3eSkeletonElement_1 = __decorate([customElement("m3e-skeleton")], M3eSkeletonElement);

export { M3eSkeletonElement, isSkeletonAnimation, isSkeletonShape };
//# sourceMappingURL=skeleton.js.map
