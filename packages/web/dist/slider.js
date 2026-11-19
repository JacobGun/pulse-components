/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate, __classPrivateFieldSet } from 'tslib';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Disabled, AttachInternals, Role, DesignToken, customElement, ResizeController, setCustomEnumState, safeStyleMap, addCustomState, deleteCustomState, hasCustomState, prefersReducedMotion } from './TextOverflowElement.js';
import { M3eDirectionality } from './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';
import { Dirty, Touched, FormAssociated, formValue } from './FormAssociated.js';
import { Focusable } from './Focusable.js';

var _M3eSliderThumbElement_instances, _M3eSliderThumbElement_labelText_get;
/**
 * A thumb used to select a value in a slider.
 *
 * @description
 * The `m3e-slider-thumb` component is used within a `m3e-slider` to represent and select a specific value.
 * This component supports continuous and discrete input, form association, and accessibility semantics.
 * It emits `input` and `change` events to reflect value updates.
 *
 * @example
 * The following example illustrates a labelled slider with thumb used to select a single numeric value.
 * ```html
 * <m3e-slider labelled>
 *  <m3e-slider-thumb value="50"></m3e-slider-thumb>
 * </m3e-slider>
 * ```
 *
 * @example
 * The next example illustrates a labelled range slider with two thumbs used to select a minimum and maximum numeric value.
 * ```html
 * <m3e-slider labelled>
 *  <m3e-slider-thumb value="25"></m3e-slider-thumb>
 *  <m3e-slider-thumb value="75"></m3e-slider-thumb>
 * </m3e-slider>
 * ```
 *
 * @tag m3e-slider-thumb
 *
 * @attr disabled - Whether the element is disabled.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr value - The value of the thumb.
 *
 * @fires beforeinput - Dispatched before the value changes.
 * @fires input - Dispatched when the value changes.
 * @fires change - Dispatched when the value changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-slider-thumb-width - Width of the slider thumb.
 * @cssprop --m3e-slider-thumb-padding - Horizontal padding around the thumb.
 * @cssprop --m3e-slider-thumb-color - Active color of the slider thumb when enabled.
 * @cssprop --m3e-slider-thumb-pressed-width - Width of the thumb when pressed.
 * @cssprop --m3e-slider-thumb-disabled-color - Color of the thumb when disabled.
 * @cssprop --m3e-slider-thumb-disabled-opacity - Opacity of the thumb when disabled.
 * @cssprop --m3e-slider-label-width - Width of the floating label above the thumb.
 * @cssprop --m3e-slider-label-container-color - Background color of the label container.
 * @cssprop --m3e-slider-label-color - Text color of the label.
 * @cssprop --m3e-slider-label-font-size - Font size of the label text.
 * @cssprop --m3e-slider-label-font-weight - Font weight of the label text.
 * @cssprop --m3e-slider-label-line-height - Line height of the label text.
 * @cssprop --m3e-slider-label-tracking - Letter spacing of the label text.
 */
let M3eSliderThumbElement = class M3eSliderThumbElement extends Dirty(Touched(FormAssociated(Focusable(Disabled(AttachInternals(Role(LitElement, "slider"))))))) {
  constructor() {
    super(...arguments);
    _M3eSliderThumbElement_instances.add(this);
    /**
     * The value of the thumb.
     * @default null
     */
    this.value = null;
  }
  /** @inheritdoc */
  get [(_M3eSliderThumbElement_instances = new WeakSet(), formValue)]() {
    return this.value?.toString() ?? null;
  }
  /** @inheritdoc */
  focus(options) {
    if (this._focusRing) {
      this._focusRing.disabled = true;
    }
    super.focus(options);
    if (this._focusRing) {
      this._focusRing.disabled = this.disabled;
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._focusRing?.attach(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("value")) {
      this.dispatchEvent(new Event("value-change", {
        bubbles: true
      }));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="label" aria-hidden="true">${__classPrivateFieldGet(this, _M3eSliderThumbElement_instances, "a", _M3eSliderThumbElement_labelText_get)}</div><div class="base"><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><div class="touch" aria-hidden="true"></div><div class="wrapper"><div class="handle"></div></div></div>`;
  }
};
_M3eSliderThumbElement_labelText_get = function _M3eSliderThumbElement_labelText_get() {
  return this.closest("m3e-slider")?.displayWith?.(this.value) ?? this.value?.toString() ?? "";
};
/** The styles of the element. */
M3eSliderThumbElement.styles = css`:host { display: block; box-sizing: border-box; position: absolute; outline: none; top: 0; bottom: 0; border-radius: var(--m3e-slider-thumb-shape, ${DesignToken.shape.corner.full}); user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { contain: layout style; box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%; border-radius: inherit; } .touch { position: absolute; height: 48px; left: 0; right: 0; touch-action: none; } .wrapper { display: inline-flex; justify-content: center; height: 100%; border-radius: inherit; width: calc(var(--m3e-slider-thumb-width, 4px) + calc(var(--m3e-slider-thumb-padding, 6px) * 2)); } .focus-ring { top: calc(0px - var(--m3e-focus-ring-thickness, 3px)); bottom: calc(0px - var(--m3e-focus-ring-thickness, 3px)); left: var(--m3e-focus-ring-thickness, 3px); right: var(--m3e-focus-ring-thickness, 3px); } .label { user-select: none; position: absolute; display: flex; align-items: center; justify-content: center; visibility: var(--_slider-label-visibility, hidden); opacity: var(--_slider-label-opacity, 0); transform: var(--_slider-label-transform, scale(0)); transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
          transform ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard},
          visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; width: var(--m3e-slider-label-width, 48px); height: var(--_m3e-slider-label-height, 44px); top: calc(0px - var(--_m3e-slider-label-height, 44px) - var(--_m3e-slider-label-margin, 4px)); inset-inline-start: calc(0px - 100%); border-radius: var(--m3e-slider-label-shape, ${DesignToken.shape.corner.full}); background-color: var(--m3e-slider-label-container-color, ${DesignToken.color.inverseSurface}); color: var(--m3e-slider-label-color, ${DesignToken.color.inverseOnSurface}); font-size: var(--m3e-slider-label-font-size, ${DesignToken.typescale.standard.label.medium.fontSize}); font-weight: var(--m3e-slider-label-font-weight, ${DesignToken.typescale.standard.label.medium.fontWeight}); line-height: var(--m3e-slider-label-line-height, ${DesignToken.typescale.standard.label.medium.lineHeight}); letter-spacing: var(--m3e-slider-label-tracking, ${DesignToken.typescale.standard.label.medium.tracking}); } @starting-style { .label { opacity: 0; transform: scale(0); } } .handle { height: 100%; width: var(--m3e-slider-thumb-width, 4px); border-radius: inherit; transition: ${unsafeCSS(`width ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}`)}; } :host(:is(:active, :focus-visible, :is(:state(--active), :--active)):not([aria-disabled="true"])) .handle { width: var(--m3e-slider-thumb-pressed-width, 2px); } :host(:not([aria-disabled="true"])) .handle { background-color: var(--m3e-slider-thumb-color, ${DesignToken.color.primary}); } :host([aria-disabled="true"]) .handle { opacity: var(--m3e-slider-thumb-disabled-opacity, 38%); background-color: var(--m3e-slider-thumb-disabled-color, ${DesignToken.color.onSurface}); } @media (prefers-reduced-motion) { .label { transition: none; } } @media (forced-colors: active) { .label { forced-color-adjust: none; background-color: CanvasText; color: Canvas; } :host(:not([aria-disabled="true"])) .handle { background-color: CanvasText; } :host([aria-disabled="true"]) .handle { opacity: unset; background-color: GrayText; } } /* ── Vertical orientation ──────────────────────────────────────────────── Set by the parent slider as a custom state: the thumb is slotted light DOM, so its own stylesheet cannot select on the slider's orientation attribute. The thumb is anchored to the bottom, because a vertical slider runs bottom-to-top and the parent positions it with a negative Y translation. Its block size mirrors what .wrapper gives the horizontal thumb on the inline axis, so the parent's clientHeight measurement stays symmetric with clientWidth. */ :host(:is(:state(--vertical), :--vertical)) { top: auto; bottom: 0; inset-inline: 0; height: calc(var(--m3e-slider-thumb-width, 4px) + calc(var(--m3e-slider-thumb-padding, 6px) * 2)); } :host(:is(:state(--vertical), :--vertical)) .touch { height: auto; width: 48px; top: 0; bottom: 0; inset-inline-start: 50%; translate: -50% 0; } :host(:is(:state(--vertical), :--vertical)) .wrapper { width: 100%; height: 100%; align-items: center; } :host(:is(:state(--vertical), :--vertical)) .handle { width: 100%; height: var(--m3e-slider-thumb-width, 4px); transition: ${unsafeCSS(`height ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}`)}; } :host( :is(:state(--vertical), :--vertical):is(:active, :focus-visible, :is(:state(--active), :--active)):not( [aria-disabled="true"] ) ) .handle { width: 100%; height: var(--m3e-slider-thumb-pressed-width, 2px); } :host(:is(:state(--vertical), :--vertical)) .focus-ring { top: var(--m3e-focus-ring-thickness, 3px); bottom: var(--m3e-focus-ring-thickness, 3px); left: calc(0px - var(--m3e-focus-ring-thickness, 3px)); right: calc(0px - var(--m3e-focus-ring-thickness, 3px)); } :host(:is(:state(--vertical), :--vertical)) .label { top: calc(50% - calc(var(--_m3e-slider-label-height, 44px) / 2)); inset-inline-start: calc(0px - var(--m3e-slider-label-width, 48px) - var(--_m3e-slider-label-margin, 4px)); }`;
__decorate([query(".focus-ring")], M3eSliderThumbElement.prototype, "_focusRing", void 0);
__decorate([property({
  type: Number,
  reflect: true
})], M3eSliderThumbElement.prototype, "value", void 0);
M3eSliderThumbElement = __decorate([customElement("m3e-slider-thumb")], M3eSliderThumbElement);

/**
 * Determines whether a value is a `SliderOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SliderOrientation`.
 */
function isSliderOrientation(value) {
  return value === "horizontal" || value === "vertical";
}

/**
 * Determines whether a value is a `SliderSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `SliderSize`.
 */
function isSliderSize(value) {
  return value === "extra-small" || value === "small" || value === "medium" || value === "large" || value === "extra-large";
}

var _M3eSliderElement_instances, _M3eSliderElement_directionalitySubscription, _M3eSliderElement_changedThumbs, _M3eSliderElement_thumbs, _M3eSliderElement_activeThumb, _M3eSliderElement_cachedSize, _M3eSliderElement_cachedThumbSize, _M3eSliderElement_cachedClientStart, _M3eSliderElement_cachedClientEnd, _M3eSliderElement_cachedClientSize, _M3eSliderElement_lastThumbMoveTimestamp, _M3eSliderElement_vertical_get, _M3eSliderElement_applySize, _M3eSliderElement_applyOrientation, _M3eSliderElement_renderTick, _M3eSliderElement_handleSlotChange, _M3eSliderElement_updateThumbs, _M3eSliderElement_translate, _M3eSliderElement_pointFromValue, _M3eSliderElement_valueFromPoint, _M3eSliderElement_updateCachedDimensions, _M3eSliderElement_updateDimensions, _M3eSliderElement_updateTicks, _M3eSliderElement_updateTickOverlap, _M3eSliderElement_handlePointerDown, _M3eSliderElement_handlePointerMove, _M3eSliderElement_handlePointerUp, _M3eSliderElement_handleKeyDown, _M3eSliderElement_handleKeyUp, _M3eSliderElement_handleThumbChange, _M3eSliderElement_changeThumb, _M3eSliderElement_commitThumb;
/**
 * Allows for the selection of numeric values from a range.
 *
 * @description
 * The `m3e-slider` component enables users to select a numeric value from a continuous or discrete range.
 * Designed according to Material 3 principles, it supports labeled value indicators, tick marks, and
 * snapping behavior.
 *
 * @example
 * The following example illustrates a labelled slider with thumb used to select a single numeric value.
 * ```html
 * <m3e-slider labelled>
 *  <m3e-slider-thumb value="50"></m3e-slider-thumb>
 * </m3e-slider>
 * ```
 *
 * @example
 * The next example illustrates a labelled range slider with two thumbs used to select a minimum and maximum numeric value.
 * ```html
 * <m3e-slider labelled>
 *  <m3e-slider-thumb value="25"></m3e-slider-thumb>
 *  <m3e-slider-thumb value="75"></m3e-slider-thumb>
 * </m3e-slider>
 * ```
 *
 * @example
 * The next example illustrates a vertical slider. Values run bottom-to-top.
 * ```html
 * <m3e-slider orientation="vertical" labelled>
 *  <m3e-slider-thumb value="40"></m3e-slider-thumb>
 * </m3e-slider>
 * ```
 *
 * @tag m3e-slider
 *
 * @slot - Renders the thumbs of the slider.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr discrete - Whether to show tick marks.
 * @attr labelled - Whether to show value labels when activated.
 * @attr max - The maximum allowable value.
 * @attr min - The minimum allowable value.
 * @attr orientation - The orientation of the slider.
 * @attr step - The value at which the thumb will snap.
 * @attr size - The size of the slider.
 *
 * @fires beforeinput - Dispatched before the value of a thumb changes.
 * @fires input - Dispatched when the value of a thumb changes.
 * @fires change - Dispatched when the value of a thumb changes.
 *
 * @cssprop --m3e-slider-min-width - Minimum inline size of the slider host.
 * @cssprop --m3e-slider-small-height - Height of the slider when size is small or extra-small.
 * @cssprop --m3e-slider-medium-height - Height of the slider when size is medium.
 * @cssprop --m3e-slider-large-height - Height of the slider when size is large.
 * @cssprop --m3e-slider-extra-large-height - Height of the slider when size is extra-large.
 * @cssprop --m3e-slider-small-active-track-shape - Corner shape of the active track for small sliders.
 * @cssprop --m3e-slider-small-inactive-active-track-start-shape - Corner shape of the inactive track start for small sliders.
 * @cssprop --m3e-slider-small-inactive-track-end-shape - Corner shape of the inactive track end for small sliders.
 * @cssprop --m3e-slider-medium-active-track-shape - Corner shape of the active track for medium sliders.
 * @cssprop --m3e-slider-medium-inactive-active-track-start-shape - Corner shape of the inactive track start for medium sliders.
 * @cssprop --m3e-slider-medium-inactive-track-end-shape - Corner shape of the inactive track end for medium sliders.
 * @cssprop --m3e-slider-large-active-track-shape - Corner shape of the active track for large sliders.
 * @cssprop --m3e-slider-large-inactive-active-track-start-shape - Corner shape of the inactive track start for large sliders.
 * @cssprop --m3e-slider-large-inactive-track-end-shape - Corner shape of the inactive track end for large sliders.
 * @cssprop --m3e-slider-extra-large-active-track-shape - Corner shape of the active track for extra-large sliders.
 * @cssprop --m3e-slider-extra-large-inactive-active-track-start-shape - Corner shape of the inactive track start for extra-large sliders.
 * @cssprop --m3e-slider-extra-large-inactive-track-end-shape - Corner shape of the inactive track end for extra-large sliders.
 * @cssprop --m3e-slider-extra-small-track-height - Height of the track for extra-small sliders.
 * @cssprop --m3e-slider-small-track-height - Height of the track for small sliders.
 * @cssprop --m3e-slider-medium-track-height - Height of the track for medium sliders.
 * @cssprop --m3e-slider-large-track-height - Height of the track for large sliders.
 * @cssprop --m3e-slider-extra-large-track-height - Height of the track for extra-large sliders.
 * @cssprop --m3e-slider-tick-size - Size of each tick mark.
 * @cssprop --m3e-slider-tick-shape - Corner shape of each tick mark.
 * @cssprop --m3e-slider-inactive-track-color - Background color of the inactive track when enabled.
 * @cssprop --m3e-slider-disabled-inactive-track-color - Base color of the inactive track when disabled.
 * @cssprop --m3e-slider-disabled-inactive-track-opacity - Opacity of the inactive track when disabled.
 * @cssprop --m3e-slider-active-track-color - Background color of the active track when enabled.
 * @cssprop --m3e-slider-disabled-active-track-color - Base color of the active track when disabled.
 * @cssprop --m3e-slider-disabled-active-track-opacity - Opacity of the active track when disabled.
 * @cssprop --m3e-slider-tick-active-color - Color of active ticks when enabled.
 * @cssprop --m3e-slider-disabled-tick-active-color - Color of active ticks when disabled.
 * @cssprop --m3e-slider-tick-inactive-color - Color of inactive ticks when enabled.
 * @cssprop --m3e-slider-disabled-tick-inactive-color - Color of inactive ticks when disabled.
 */
let M3eSliderElement = class M3eSliderElement extends SupportsDirectionality(AttachInternals(LitElement)) {
  constructor() {
    super();
    _M3eSliderElement_instances.add(this);
    /** @private */
    _M3eSliderElement_directionalitySubscription.set(this, void 0);
    /** @private */
    this._ticks = new Array();
    /** @private */
    _M3eSliderElement_changedThumbs.set(this, new Set());
    /** @private */
    _M3eSliderElement_thumbs.set(this, new Array());
    /** @private */
    _M3eSliderElement_activeThumb.set(this, void 0);
    /** @private Extent of the slider along its own axis. */
    _M3eSliderElement_cachedSize.set(this, 0);
    /** @private Extent of a thumb along the slider's axis. */
    _M3eSliderElement_cachedThumbSize.set(this, 0);
    /** @private Client coordinate of the axis start edge — left when horizontal, top when vertical. */
    _M3eSliderElement_cachedClientStart.set(this, 0);
    /** @private Client coordinate of the axis end edge — right when horizontal, bottom when vertical. */
    _M3eSliderElement_cachedClientEnd.set(this, 0);
    /** @private Extent of the slider's bounding rect along its own axis. */
    _M3eSliderElement_cachedClientSize.set(this, 0);
    /** @private */
    _M3eSliderElement_lastThumbMoveTimestamp.set(this, 0);
    /**
     * The orientation of the slider.
     * @default "horizontal"
     */
    this.orientation = "horizontal";
    /**
     * The size of the slider.
     * @default "extra-small"
     */
    this.size = "extra-small";
    /**
     * Whether the element is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * Whether to show tick marks.
     * @default false
     */
    this.discrete = false;
    /**
     * The minimum allowable value.
     * @default 0
     */
    this.min = 0;
    /**
     * The maximum allowable value.
     * @default 100
     */
    this.max = 100;
    /**
     * The value at which the thumb will snap.
     * @default 1
     */
    this.step = 1;
    /**
     * Whether to show value labels when activated.
     * @default false
     */
    this.labelled = false;
    /** The function used to format display values. */
    this.displayWith = null;
    new ResizeController(this, {
      callback: () => __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateDimensions).call(this, true)
    });
  }
  /** The thumbs used to select values. */
  get thumbs() {
    return __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f");
  }
  /** Whether the slider is a range slider. */
  get isRange() {
    return __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f").length > 1;
  }
  /** The thumb used to select a value. */
  get thumb() {
    return __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f")[0] ?? null;
  }
  /** The thumb used to select the lower value of a range slider. */
  get lowerThumb() {
    return this.thumb;
  }
  /** The thumb used to select the upper value of a range slider. */
  get upperThumb() {
    return __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f")[1] ?? null;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_applySize).call(this);
    __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_applyOrientation).call(this);
    __classPrivateFieldSet(this, _M3eSliderElement_directionalitySubscription, M3eDirectionality.observe(() => {
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateDimensions).call(this, true);
      this.requestUpdate();
    }), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eSliderElement_changedThumbs, "f").clear();
    __classPrivateFieldGet(this, _M3eSliderElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_applySize).call(this);
    }
    if (_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_applyOrientation).call(this);
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("disabled")) {
      __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f").forEach(x => x.disabled = this.disabled);
    }
    if (_changedProperties.has("orientation")) {
      // The axis changed, so every cached measurement and every thumb transform
      // now describes the wrong one.
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateThumbs).call(this);
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateDimensions).call(this, true);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" tabindex="${ifDefined(!this.disabled ? "-1" : undefined)}" @pointerdown="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handlePointerDown)}" @pointermove="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handlePointerMove)}" @pointerup="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handlePointerUp)}" @keydown="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handleKeyDown)}" @keyup="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handleKeyUp)}" @value-change="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handleThumbChange)}"><div class="track" aria-hidden="true"><div class="track-inactive start"></div><div class="track-active"></div><div class="track-inactive end"></div></div><div class="ticks" aria-hidden="true">${this._ticks.map(x => __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_renderTick).call(this, x))}</div><slot @slotchange="${__classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_handleSlotChange)}"></slot></div>`;
  }
};
_M3eSliderElement_directionalitySubscription = new WeakMap();
_M3eSliderElement_changedThumbs = new WeakMap();
_M3eSliderElement_thumbs = new WeakMap();
_M3eSliderElement_activeThumb = new WeakMap();
_M3eSliderElement_cachedSize = new WeakMap();
_M3eSliderElement_cachedThumbSize = new WeakMap();
_M3eSliderElement_cachedClientStart = new WeakMap();
_M3eSliderElement_cachedClientEnd = new WeakMap();
_M3eSliderElement_cachedClientSize = new WeakMap();
_M3eSliderElement_lastThumbMoveTimestamp = new WeakMap();
_M3eSliderElement_instances = new WeakSet();
_M3eSliderElement_vertical_get = function _M3eSliderElement_vertical_get() {
  return this.orientation === "vertical";
};
_M3eSliderElement_applySize = function _M3eSliderElement_applySize() {
  if (!isSliderSize(this.size)) {
    this.size = "extra-small";
  }
  setCustomEnumState(this, this.size, "extra-large", "extra-small", "large", "medium", "small");
};
_M3eSliderElement_applyOrientation = function _M3eSliderElement_applyOrientation() {
  if (!isSliderOrientation(this.orientation)) {
    this.orientation = "horizontal";
  }
  setCustomEnumState(this, this.orientation, "horizontal", "vertical");
};
_M3eSliderElement_renderTick = function _M3eSliderElement_renderTick(tick) {
  return html`<div class="tick ${tick.active ? "active" : "inactive"}${tick.hidden ? " hidden" : ""}" style="${safeStyleMap({
    transform: __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_translate).call(this, __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_pointFromValue).call(this, tick.value))
  })}"></div>`;
};
_M3eSliderElement_handleSlotChange = function _M3eSliderElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eSliderElement_thumbs, e.target.assignedElements({
    flatten: true
  }).filter(x => x instanceof M3eSliderThumbElement), "f");
  if (__classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f").length > 2) {
    __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f").length = 2;
  }
  if (this.isRange) {
    this._base?.style.setProperty("--_slider-active-track-middle-shape", `0`);
  } else {
    this._base?.style.removeProperty("--_slider-active-track-middle-shape");
  }
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateThumbs).call(this);
};
_M3eSliderElement_updateThumbs = function _M3eSliderElement_updateThumbs() {
  __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f").forEach((thumb, i) => {
    if (this.disabled) {
      thumb.disabled = true;
    }
    thumb.ariaValueMin = `${__classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f")[i - 1]?.value ?? this.min}`;
    thumb.ariaValueMax = `${__classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f")[i + 1]?.value ?? this.max}`;
    thumb.ariaValueNow = `${thumb.value ?? __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f")[i - 1]?.value ?? this.min}`;
    thumb.ariaOrientation = this.orientation;
    // The thumb is slotted light DOM, so its own stylesheet cannot select on the
    // slider's orientation. A custom state carries it across.
    if (__classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get)) {
      addCustomState(thumb, "--vertical");
    } else {
      deleteCustomState(thumb, "--vertical");
    }
  });
};
_M3eSliderElement_translate = function _M3eSliderElement_translate(pos) {
  return __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? `translate(0, ${-pos}px)` : `translate(${M3eDirectionality.current === "rtl" ? -pos : pos}px, 0)`;
};
_M3eSliderElement_pointFromValue = function _M3eSliderElement_pointFromValue(value) {
  return (__classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") - __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f")) * ((value - this.min) / (this.max - this.min));
};
_M3eSliderElement_valueFromPoint = function _M3eSliderElement_valueFromPoint(e) {
  // The axis end holds `min` for a vertical slider, as it does in rtl.
  const pos = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) || M3eDirectionality.current === "rtl" ? __classPrivateFieldGet(this, _M3eSliderElement_cachedClientEnd, "f") - (__classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? e.clientY : e.clientX) : e.clientX - __classPrivateFieldGet(this, _M3eSliderElement_cachedClientStart, "f");
  const step = this.step === 0 ? 1 : this.step;
  const numSteps = Math.floor((this.max - this.min) / step);
  const thumbRatio = __classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") ? __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f") / __classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") : 0;
  const percentage = (pos / __classPrivateFieldGet(this, _M3eSliderElement_cachedClientSize, "f") - thumbRatio / 2) / (1 - thumbRatio || 1);
  const fixedPercentage = Math.round(percentage * numSteps) / numSteps;
  const impreciseValue = fixedPercentage * (this.max - this.min) + this.min;
  return Math.round(impreciseValue / step) * step;
};
_M3eSliderElement_updateCachedDimensions = function _M3eSliderElement_updateCachedDimensions(force = false) {
  if (!this.lowerThumb) return;
  const size = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? this.clientHeight : this.clientWidth;
  const thumbSize = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? this.lowerThumb.clientHeight : this.lowerThumb.clientWidth;
  __classPrivateFieldSet(this, _M3eSliderElement_cachedSize, !force && __classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") > 0 ? __classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") : size, "f");
  __classPrivateFieldSet(this, _M3eSliderElement_cachedThumbSize, !force && __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f") > 0 ? __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f") : thumbSize, "f");
  const rect = this.getBoundingClientRect();
  const clientStart = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? rect.top : rect.left;
  const clientEnd = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? rect.bottom : rect.right;
  const clientSize = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) ? rect.height : rect.width;
  __classPrivateFieldSet(this, _M3eSliderElement_cachedClientStart, !force && __classPrivateFieldGet(this, _M3eSliderElement_cachedClientStart, "f") > 0 ? __classPrivateFieldGet(this, _M3eSliderElement_cachedClientStart, "f") : clientStart, "f");
  __classPrivateFieldSet(this, _M3eSliderElement_cachedClientEnd, !force && __classPrivateFieldGet(this, _M3eSliderElement_cachedClientEnd, "f") > 0 ? __classPrivateFieldGet(this, _M3eSliderElement_cachedClientEnd, "f") : clientEnd, "f");
  __classPrivateFieldSet(this, _M3eSliderElement_cachedClientSize, !force && __classPrivateFieldGet(this, _M3eSliderElement_cachedClientSize, "f") > 0 ? __classPrivateFieldGet(this, _M3eSliderElement_cachedClientSize, "f") : clientSize, "f");
};
_M3eSliderElement_updateDimensions = function _M3eSliderElement_updateDimensions(force = false) {
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateCachedDimensions).call(this, force);
  if (!this.lowerThumb) return;
  const lowerValue = this.lowerThumb.value ?? this.min;
  const lowerPos = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_pointFromValue).call(this, lowerValue);
  this.lowerThumb.style.transform = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_translate).call(this, lowerPos);
  if (!this.upperThumb) {
    this._base?.classList.toggle("range", false);
    this._base?.style.setProperty("--_slider-active-track-size", `${lowerPos}px`);
    this._base?.style.setProperty("--_slider-inactive-track-after-offset", `${lowerPos + __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f")}px`);
    this._base?.style.setProperty("--_slider-inactive-track-after-size", `${__classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") - lowerPos - __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f")}px`);
    __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateTicks).call(this, i => i < lowerValue);
  } else {
    const upperValue = this.upperThumb.value ?? lowerValue;
    const upperPos = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_pointFromValue).call(this, upperValue);
    this.upperThumb.style.transform = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_translate).call(this, upperPos);
    this._base?.classList.toggle("range", true);
    this._base?.style.setProperty("--_slider-inactive-track-before-size", `${lowerPos}px`);
    this._base?.style.setProperty("--_slider-active-track-offset", `${lowerPos + __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f")}px`);
    this._base?.style.setProperty("--_slider-active-track-size", `${upperPos - lowerPos - __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f")}px`);
    this._base?.style.setProperty("--_slider-inactive-track-after-offset", `${upperPos + __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f")}px`);
    this._base?.style.setProperty("--_slider-inactive-track-after-size", `${__classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") - __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f") - upperPos}px`);
    __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateTicks).call(this, i => i > lowerValue && i < upperValue);
  }
};
_M3eSliderElement_updateTicks = function _M3eSliderElement_updateTicks(active) {
  this._ticks = [];
  if (this.discrete && this.step > 1) {
    for (let i = this.min; i <= this.max; i += this.step) {
      this._ticks.push({
        value: i,
        active: active(i),
        hidden: false
      });
    }
  } else {
    this._ticks.push({
      value: this.min,
      active: active(this.min),
      hidden: false
    });
    if (this.min < 0 && this.max > 0) {
      this._ticks.push({
        value: 0,
        active: active(0),
        hidden: false
      });
    }
    this._ticks.push({
      value: this.max,
      active: active(this.max),
      hidden: false
    });
  }
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateTickOverlap).call(this);
};
_M3eSliderElement_updateTickOverlap = function _M3eSliderElement_updateTickOverlap() {
  if (__classPrivateFieldGet(this, _M3eSliderElement_cachedSize, "f") === 0 || __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f") === 0) return;
  const thumbs = __classPrivateFieldGet(this, _M3eSliderElement_thumbs, "f").filter(t => t.value != null);
  if (thumbs.length === 0) return;
  const thumbHalfWidth = __classPrivateFieldGet(this, _M3eSliderElement_cachedThumbSize, "f") / 2;
  this._ticks = this._ticks.map(tick => {
    const tickPos = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_pointFromValue).call(this, tick.value);
    const hidden = thumbs.some(thumb => {
      const thumbPos = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_pointFromValue).call(this, thumb.value);
      return Math.abs(tickPos - thumbPos) < thumbHalfWidth;
    });
    return {
      ...tick,
      hidden
    };
  });
};
_M3eSliderElement_handlePointerDown = function _M3eSliderElement_handlePointerDown(e) {
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateCachedDimensions).call(this, true);
  if (e.pointerType === "mouse" && e.button > 1) return;
  if (!this.lowerThumb || this.disabled) return;
  if (e.target instanceof HTMLElement) {
    e.target.setPointerCapture(e.pointerId);
  }
  __classPrivateFieldGet(this, _M3eSliderElement_changedThumbs, "f").clear();
  __classPrivateFieldSet(this, _M3eSliderElement_lastThumbMoveTimestamp, e.timeStamp, "f");
  __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, e.composedPath().find(x => x instanceof M3eSliderThumbElement), "f");
  if (__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f")) {
    return;
  }
  const value = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_valueFromPoint).call(this, e);
  let min = this.min;
  let max = this.max;
  if (__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f") === this.upperThumb) {
    min = Math.max(min, this.lowerThumb?.value ?? 0);
  } else if (this.upperThumb) {
    max = Math.min(max, this.upperThumb.value ?? this.max);
  }
  if (!this.upperThumb) {
    if (!this.lowerThumb.disabled) {
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, this.lowerThumb, Math.min(max, Math.max(min, value)), true);
      __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, this.lowerThumb, "f");
    }
  } else {
    const lowerValue = this.lowerThumb.value ?? this.min;
    const upperValue = this.upperThumb.value ?? lowerValue;
    if (value < lowerValue) {
      if (!this.lowerThumb.disabled) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, this.lowerThumb, Math.min(max, Math.max(min, value)), true);
        __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, this.lowerThumb, "f");
      }
    } else if (value > upperValue) {
      if (!this.upperThumb.disabled) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, this.upperThumb, Math.min(max, Math.max(min, value)), true);
        __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, this.upperThumb, "f");
      }
    } else {
      const mid = (lowerValue + upperValue) / 2;
      if (value < mid && !this.lowerThumb.disabled) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, this.lowerThumb, Math.min(max, Math.max(min, value)), true);
        __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, this.lowerThumb, "f");
      } else if (!this.upperThumb.disabled) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, this.upperThumb, Math.min(max, Math.max(min, value)), true);
        __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, this.upperThumb, "f");
      }
    }
  }
  if (__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f")) {
    addCustomState(__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), "--active");
  }
};
_M3eSliderElement_handlePointerMove = function _M3eSliderElement_handlePointerMove(e) {
  if (!(e.target instanceof HTMLElement) || !e.target.hasPointerCapture(e.pointerId) || !__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f") || __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f").disabled) {
    return;
  }
  let value = __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_valueFromPoint).call(this, e);
  let min = this.min;
  let max = this.max;
  if (__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f") === this.upperThumb) {
    min = Math.max(min, this.lowerThumb?.value ?? 0);
  } else if (this.upperThumb) {
    max = Math.min(max, this.upperThumb.value ?? this.max);
  }
  value = Math.min(max, Math.max(min, value));
  if (value === __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f").value) {
    return;
  }
  // Only animate value change when there are steps and drag speed occurs past a tolerance.
  // Tolerance is based on visual impact to transitions during fast drag operations.
  const effectiveStep = this.step === 0 ? 1 : this.step;
  let animate = effectiveStep !== 1;
  if (animate) {
    for (const coalescedEvent of e.getCoalescedEvents()) {
      if (coalescedEvent.timeStamp - __classPrivateFieldGet(this, _M3eSliderElement_lastThumbMoveTimestamp, "f") < 90) {
        animate = false;
      }
      __classPrivateFieldSet(this, _M3eSliderElement_lastThumbMoveTimestamp, coalescedEvent.timeStamp, "f");
    }
  }
  if (!animate) {
    if (hasCustomState(this, "--animating")) {
      deleteCustomState(this, "--animating");
      __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f").style.transition = "";
    }
  }
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), value, animate);
};
_M3eSliderElement_handlePointerUp = function _M3eSliderElement_handlePointerUp(e) {
  if (e.pointerType === "mouse" && e.button > 1) return;
  if (!this.lowerThumb || this.disabled) return;
  if (e.target instanceof HTMLElement) {
    e.target.releasePointerCapture(e.pointerId);
  }
  __classPrivateFieldSet(this, _M3eSliderElement_lastThumbMoveTimestamp, 0, "f");
  if (__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f") && !__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f").disabled) {
    __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_commitThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"));
    __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f").focus();
    deleteCustomState(__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), "--active");
  }
};
_M3eSliderElement_handleKeyDown = function _M3eSliderElement_handleKeyDown(e) {
  __classPrivateFieldSet(this, _M3eSliderElement_activeThumb, e.composedPath().find(x => x instanceof M3eSliderThumbElement), "f");
  if (!__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f")) return;
  const value = __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f").value ?? 0;
  let min = this.min;
  let max = this.max;
  if (__classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f") === this.upperThumb) {
    min = Math.max(min, this.lowerThumb?.value ?? 0);
  } else if (this.upperThumb) {
    max = Math.min(max, this.upperThumb.value ?? this.max);
  }
  // A vertical slider runs bottom-to-top, so ArrowUp always increases and
  // directionality — an inline-axis concern — does not apply.
  const ascending = __classPrivateFieldGet(this, _M3eSliderElement_instances, "a", _M3eSliderElement_vertical_get) || M3eDirectionality.current === "ltr";
  switch (e.key) {
    case "Home":
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), min);
      e.preventDefault();
      break;
    case "End":
      __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), max);
      e.preventDefault();
      break;
    case "PageUp":
      if (ascending) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.min(max, value + (this.step > 1 ? this.step : 10)));
      } else {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.max(min, value - (this.step > 1 ? this.step : 10)));
      }
      e.preventDefault();
      break;
    case "PageDown":
      if (ascending) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.max(min, value - (this.step > 1 ? this.step : 10)));
      } else {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.min(max, value + (this.step > 1 ? this.step : 10)));
      }
      e.preventDefault();
      break;
    case "Down":
    case "ArrowDown":
    case "Left":
    case "ArrowLeft":
      if (ascending) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.max(min, value - this.step));
      } else {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.min(max, value + this.step));
      }
      e.preventDefault();
      break;
    case "Up":
    case "ArrowUp":
    case "Right":
    case "ArrowRight":
      if (ascending) {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.min(max, value + this.step));
      } else {
        __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_changeThumb).call(this, __classPrivateFieldGet(this, _M3eSliderElement_activeThumb, "f"), Math.max(min, value - this.step));
      }
      e.preventDefault();
      break;
    case " ":
      e.preventDefault();
      break;
  }
};
_M3eSliderElement_handleKeyUp = function _M3eSliderElement_handleKeyUp(e) {
  const activeThumb = e.composedPath().find(x => x instanceof M3eSliderThumbElement);
  if (activeThumb) {
    __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_commitThumb).call(this, activeThumb);
  }
};
_M3eSliderElement_handleThumbChange = function _M3eSliderElement_handleThumbChange(e) {
  e.stopPropagation();
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateThumbs).call(this);
  __classPrivateFieldGet(this, _M3eSliderElement_instances, "m", _M3eSliderElement_updateDimensions).call(this);
};
_M3eSliderElement_changeThumb = function _M3eSliderElement_changeThumb(thumb, value, animate = false) {
  if (thumb.value === value) return;
  if (thumb.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    if (animate && !prefersReducedMotion()) {
      addCustomState(this, "--animating");
      thumb.addEventListener("transitionend", () => {
        thumb.style.transition = "";
        deleteCustomState(this, "--animating");
      }, {
        once: true
      });
      thumb.style.transition = `transform ${DesignToken.motion.spring.fastEffects}`;
    }
    __classPrivateFieldGet(this, _M3eSliderElement_changedThumbs, "f").add(thumb);
    thumb.value = value;
    thumb.markAsDirty();
    thumb.markAsTouched();
    thumb.dispatchEvent(new Event("input", {
      bubbles: true
    }));
  }
};
_M3eSliderElement_commitThumb = function _M3eSliderElement_commitThumb(thumb) {
  if (__classPrivateFieldGet(this, _M3eSliderElement_changedThumbs, "f").has(thumb)) {
    thumb.dispatchEvent(new Event("change", {
      bubbles: true
    }));
    __classPrivateFieldGet(this, _M3eSliderElement_changedThumbs, "f").delete(thumb);
  }
};
/** The styles of the element. */
M3eSliderElement.styles = css`:host { display: inline-block; vertical-align: middle; min-inline-size: var(--m3e-slider-min-width, 200px); user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); line-height: 0; } :host([hidden]) { display: none; } :host(:not([disabled])) { cursor: pointer; } :host(:is(:state(--extra-small), :--extra-small)), :host(:is(:state(--small), :--small)) { height: var(--m3e-slider-small-height, 44px); } :host(:not(:is(:state(--rtl), :--rtl)):is(:state(--extra-small), :--extra-small)) .base, :host(:not(:is(:state(--rtl), :--rtl)):is(:state(--small), :--small)) .base { --_slider-active-track-shape: var(--m3e-slider-small-active-track-shape, ${DesignToken.shape.corner.smallStart}); --_slider-inactive-track-start-shape: var( --m3e-slider-small-inactive-active-track-start-shape, ${DesignToken.shape.corner.smallStart} ); --_slider-inactive-track-end-shape: var( --m3e-slider-small-inactive-track-end-shape, ${DesignToken.shape.corner.smallEnd} ); } :host(:is(:state(--rtl), :--rtl):is(:state(--extra-small), :--extra-small)) .base, :host(:is(:state(--rtl), :--rtl):is(:state(--small), :--small)) .base { --_slider-active-track-shape: var(--m3e-slider-small-active-track-shape, ${DesignToken.shape.corner.smallEnd}); --_slider-inactive-track-start-shape: var( --m3e-slider-small-inactive-active-track-start-shape, ${DesignToken.shape.corner.smallEnd} ); --_slider-inactive-track-end-shape: var( --m3e-slider-small-inactive-track-end-shape, ${DesignToken.shape.corner.smallStart} ); } :host(:is(:state(--extra-small), :--extra-small)) .track { height: calc(var(--m3e-slider-extra-small-track-height, 16px)); } :host(:is(:state(--small), :--small)) .track { height: calc(var(--m3e-slider-small-track-height, 24px)); } :host(:is(:state(--medium), :--medium)) { height: var(--m3e-slider-medium-height, 52px); } :host(:not(:is(:state(--rtl), :--rtl)):is(:state(--medium), :--medium)) .base { --_slider-active-track-shape: var( --m3e-slider-medium-active-track-shape, ${DesignToken.shape.corner.mediumStart} ); --_slider-inactive-track-start-shape: var( --m3e-slider-medium-inactive-active-track-start-shape, ${DesignToken.shape.corner.mediumStart} ); --_slider-inactive-track-end-shape: var( --m3e-slider-medium-inactive-track-end-shape, ${DesignToken.shape.corner.mediumEnd} ); } :host(:is(:state(--rtl), :--rtl):is(:state(--medium), :--medium)) .base { --_slider-active-track-shape: var(--m3e-slider-medium-active-track-shape, ${DesignToken.shape.corner.mediumEnd}); --_slider-inactive-track-start-shape: var( --m3e-slider-medium-inactive-active-track-start-shape, ${DesignToken.shape.corner.mediumEnd} ); --_slider-inactive-track-end-shape: var( --m3e-slider-medium-inactive-track-end-shape, ${DesignToken.shape.corner.mediumStart} ); } :host(:is(:state(--medium), :--medium)) .track { height: var(--m3e-slider-medium-track-height, 40px); } :host(:is(:state(--large), :--large)) { height: var(--m3e-slider-large-height, 68px); } :host(:not(:is(:state(--rtl), :--rtl)):is(:state(--large), :--large)) .base { --_slider-active-track-shape: var(--m3e-slider-large-active-track-shape, ${DesignToken.shape.corner.largeStart}); --_slider-inactive-track-start-shape: var( --m3e-slider-large-inactive-active-track-start-shape, ${DesignToken.shape.corner.largeStart} ); --_slider-inactive-track-end-shape: var( --m3e-slider-large-inactive-track-end-shape, ${DesignToken.shape.corner.largeEnd} ); } :host(:is(:state(--rtl), :--rtl):is(:state(--large), :--large)) .base { --_slider-active-track-shape: var(--m3e-slider-large-active-track-shape, ${DesignToken.shape.corner.largeEnd}); --_slider-inactive-track-start-shape: var( --m3e-slider-large-inactive-active-track-start-shape, ${DesignToken.shape.corner.largeEnd} ); --_slider-inactive-track-end-shape: var( --m3e-slider-large-inactive-track-end-shape, ${DesignToken.shape.corner.largeStart} ); } :host(:is(:state(--large), :--large)) .track { height: var(--m3e-slider-large-track-height, 56px); } :host(:is(:state(--extra-large), :--extra-large)) { height: var(--m3e-slider-extra-large-height, 108px); } :host(:not(:is(:state(--rtl), :--rtl)):is(:state(--extra-large), :--extra-large)) .base { --_slider-active-track-shape: var( --m3e-slider-extra-large-active-track-shape, ${DesignToken.shape.corner.extraLargeStart} ); --_slider-inactive-track-start-shape: var( --m3e-slider-extra-large-inactive-active-track-start-shape, ${DesignToken.shape.corner.extraLargeStart} ); --_slider-inactive-track-end-shape: var( --m3e-slider-extra-large-inactive-track-end-shape, ${DesignToken.shape.corner.extraLargeEnd} ); } :host(:is(:state(--rtl), :--rtl):is(:state(--extra-large), :--extra-large)) .base { --_slider-active-track-shape: var( --m3e-slider-extra-large-active-track-shape, ${DesignToken.shape.corner.extraLargeEnd} ); --_slider-inactive-track-start-shape: var( --m3e-slider-extra-large-inactive-active-track-start-shape, ${DesignToken.shape.corner.extraLargeEnd} ); --_slider-inactive-track-end-shape: var( --m3e-slider-extra-large-inactive-track-end-shape, ${DesignToken.shape.corner.extraLargeStart} ); } :host(:is(:state(--extra-large), :--extra-large)) .track { height: var(--m3e-slider-extra-large-track-height, 96px); } :host(:is(:state(--animating), :--animating)) .track-active, :host(:is(:state(--animating), :--animating)) .track-inactive.start, :host(:is(:state(--animating), :--animating)) .track-inactive.end { transition: ${unsafeCSS(`margin-inline-start ${DesignToken.motion.spring.fastEffects},
        width ${DesignToken.motion.spring.fastEffects}`)}; } .base { contain: layout style; display: inline-flex; align-items: center; position: relative; width: 100%; height: 100%; border-radius: inherit; outline: none; touch-action: none; } .track { contain: layout style paint; position: relative; flex: 1 1 auto; touch-action: none; } .track-inactive, .track-active { contain: layout style paint; position: absolute; height: 100%; touch-action: none; } .track-active { margin-inline-start: var(--_slider-active-track-offset, 0px); width: var(--_slider-active-track-size, 0px); border-radius: var(--_slider-active-track-middle-shape, var(--_slider-active-track-shape)); } .track-inactive.start { width: var(--_slider-inactive-track-before-size, 0px); border-radius: var(--_slider-inactive-track-start-shape); } .track-inactive.end { margin-inline-start: var(--_slider-inactive-track-after-offset, 0px); width: var(--_slider-inactive-track-after-size, 0px); border-radius: var(--_slider-inactive-track-end-shape); } .ticks { position: absolute; width: 100%; height: var(--m3e-slider-tick-size, 4px); overflow: visible; touch-action: none; } .tick { position: absolute; top: 0; touch-action: none; inset-inline-start: calc(var(--m3e-slider-tick-size, 4px) + calc(var(--m3e-slider-tick-size, 4px) / 2)); width: var(--m3e-slider-tick-size, 4px); height: var(--m3e-slider-tick-size, 4px); border-radius: var(--m3e-slider-tick-shape, ${DesignToken.shape.corner.full}); } .tick.hidden { visibility: hidden; } :host(:not([disabled])) .track-inactive { background-color: var(--m3e-slider-inactive-track-color, ${DesignToken.color.secondaryContainer}); } :host([disabled]) .track-inactive { background-color: color-mix( in srgb, var(--m3e-slider-disabled-inactive-track-color, ${DesignToken.color.onSurface}) var(--m3e-slider-disabled-inactive-track-opacity, 12%), transparent ); } :host(:not([disabled])) .track-active { background-color: var(--m3e-slider-active-track-color, ${DesignToken.color.primary}); } :host([disabled]) .track-active { background-color: color-mix( in srgb, var(--m3e-slider-disabled-active-track-color, ${DesignToken.color.onSurface}) var(--m3e-slider-disabled-active-track-opacity, 38%), transparent ); } :host(:not([disabled])) .tick.active { background-color: var(--m3e-slider-tick-active-color, ${DesignToken.color.onPrimary}); } :host([disabled]) .tick.active { background-color: var(--m3e-slider-disabled-tick-active-color, ${DesignToken.color.inverseOnSurface}); } :host(:not([disabled])) .tick.inactive { background-color: var(--m3e-slider-tick-inactive-color, ${DesignToken.color.onSecondaryContainer}); } :host([disabled]) .tick.inactive { background-color: var(--m3e-slider-disabled-tick-inactive-color, ${DesignToken.color.onSurface}); } :host(:not([discrete])) .tick.active { display: none; } :host(:hover[labelled]) .base, :host(:focus-within[labelled]) .base { --_slider-label-visibility: visible; --_slider-label-opacity: 1; --_slider-label-transform: scale(1); } @media (forced-colors: active) { :host(:not([disabled])) .track-inactive { background-color: unset; } :host(:not([disabled])) .base.range .track-inactive.start, :host(:not([disabled])) .track-inactive.end { border: 1px solid CanvasText; box-sizing: border-box; } :host(:not([disabled])) .tick.inactive { background-color: CanvasText; } :host(:not([disabled])) .tick.active { background-color: Canvas; } :host(:not([disabled])) .track-active { background-color: CanvasText; } :host([disabled]) .base.range .track-inactive.start, :host([disabled]) .track-inactive.end { border: 1px solid GrayText; box-sizing: border-box; } :host([disabled]) .track-active { background-color: GrayText; } :host([disabled]) .tick.inactive { background-color: GrayText; } :host([disabled]) .tick.active { background-color: Canvas; } } /* ── Vertical orientation ──────────────────────────────────────────────── Everything above lays the slider out along the inline axis. These rules re-map it to the block axis and are deliberately additive: they come last and so win on source order, which keeps the horizontal path untouched. Segments are anchored with bottom rather than margin-inline-start because a vertical slider runs bottom-to-top, so the offsets the element writes — measured from the end holding the minimum — already point the right way. The five --_slider-* custom properties are plain lengths and need no change; only the property they feed does. Corner radii are composed from the symmetric corner tokens rather than the Start/End ones, whose 4-value radii round the inline edges. */ :host(:is(:state(--vertical), :--vertical)) { min-inline-size: auto; min-block-size: var(--m3e-slider-min-width, 200px); /* Containing block for .base below. */ position: relative; } /* .base is taken out of flow rather than sized with height: 100%. A vertical host has no definite block size of its own - its height comes from min-block-size, from a flex parent, or from the consumer - and a percentage height resolves against the parent's *computed* height, which is auto. That collapses .base to zero and takes the track and both thumbs with it, since .base is their containing block. Insets resolve against the used height, so they work in every case. */ :host(:is(:state(--vertical), :--vertical)) .base { position: absolute; inset: 0; width: auto; height: auto; flex-direction: column; } :host(:is(:state(--vertical), :--vertical):is(:state(--extra-small), :--extra-small)), :host(:is(:state(--vertical), :--vertical):is(:state(--small), :--small)) { height: auto; width: var(--m3e-slider-small-height, 44px); } :host(:is(:state(--vertical), :--vertical):is(:state(--extra-small), :--extra-small)) .track { height: auto; width: calc(var(--m3e-slider-extra-small-track-height, 16px)); } :host(:is(:state(--vertical), :--vertical):is(:state(--small), :--small)) .track { height: auto; width: calc(var(--m3e-slider-small-track-height, 24px)); } :host(:is(:state(--vertical), :--vertical):is(:state(--medium), :--medium)) { height: auto; width: var(--m3e-slider-medium-height, 52px); } :host(:is(:state(--vertical), :--vertical):is(:state(--medium), :--medium)) .track { height: auto; width: var(--m3e-slider-medium-track-height, 40px); } :host(:is(:state(--vertical), :--vertical):is(:state(--large), :--large)) { height: auto; width: var(--m3e-slider-large-height, 68px); } :host(:is(:state(--vertical), :--vertical):is(:state(--large), :--large)) .track { height: auto; width: var(--m3e-slider-large-track-height, 56px); } :host(:is(:state(--vertical), :--vertical):is(:state(--extra-large), :--extra-large)) { height: auto; width: var(--m3e-slider-extra-large-height, 108px); } :host(:is(:state(--vertical), :--vertical):is(:state(--extra-large), :--extra-large)) .track { height: auto; width: var(--m3e-slider-extra-large-track-height, 96px); } :host(:is(:state(--vertical), :--vertical):is(:state(--extra-small), :--extra-small)) .base { --_slider-active-track-shape: var( --m3e-slider-extra-small-active-track-shape, 0 0 ${DesignToken.shape.corner.small} ${DesignToken.shape.corner.small} ); --_slider-inactive-track-start-shape: var( --m3e-slider-extra-small-inactive-active-track-start-shape, 0 0 ${DesignToken.shape.corner.small} ${DesignToken.shape.corner.small} ); --_slider-inactive-track-end-shape: var( --m3e-slider-extra-small-inactive-track-end-shape, ${DesignToken.shape.corner.small} ${DesignToken.shape.corner.small} 0 0 ); } :host(:is(:state(--vertical), :--vertical):is(:state(--small), :--small)) .base { --_slider-active-track-shape: var( --m3e-slider-small-active-track-shape, 0 0 ${DesignToken.shape.corner.small} ${DesignToken.shape.corner.small} ); --_slider-inactive-track-start-shape: var( --m3e-slider-small-inactive-active-track-start-shape, 0 0 ${DesignToken.shape.corner.small} ${DesignToken.shape.corner.small} ); --_slider-inactive-track-end-shape: var( --m3e-slider-small-inactive-track-end-shape, ${DesignToken.shape.corner.small} ${DesignToken.shape.corner.small} 0 0 ); } :host(:is(:state(--vertical), :--vertical):is(:state(--medium), :--medium)) .base { --_slider-active-track-shape: var( --m3e-slider-medium-active-track-shape, 0 0 ${DesignToken.shape.corner.medium} ${DesignToken.shape.corner.medium} ); --_slider-inactive-track-start-shape: var( --m3e-slider-medium-inactive-active-track-start-shape, 0 0 ${DesignToken.shape.corner.medium} ${DesignToken.shape.corner.medium} ); --_slider-inactive-track-end-shape: var( --m3e-slider-medium-inactive-track-end-shape, ${DesignToken.shape.corner.medium} ${DesignToken.shape.corner.medium} 0 0 ); } :host(:is(:state(--vertical), :--vertical):is(:state(--large), :--large)) .base { --_slider-active-track-shape: var( --m3e-slider-large-active-track-shape, 0 0 ${DesignToken.shape.corner.large} ${DesignToken.shape.corner.large} ); --_slider-inactive-track-start-shape: var( --m3e-slider-large-inactive-active-track-start-shape, 0 0 ${DesignToken.shape.corner.large} ${DesignToken.shape.corner.large} ); --_slider-inactive-track-end-shape: var( --m3e-slider-large-inactive-track-end-shape, ${DesignToken.shape.corner.large} ${DesignToken.shape.corner.large} 0 0 ); } :host(:is(:state(--vertical), :--vertical):is(:state(--extra-large), :--extra-large)) .base { --_slider-active-track-shape: var( --m3e-slider-extra-large-active-track-shape, 0 0 ${DesignToken.shape.corner.extraLarge} ${DesignToken.shape.corner.extraLarge} ); --_slider-inactive-track-start-shape: var( --m3e-slider-extra-large-inactive-active-track-start-shape, 0 0 ${DesignToken.shape.corner.extraLarge} ${DesignToken.shape.corner.extraLarge} ); --_slider-inactive-track-end-shape: var( --m3e-slider-extra-large-inactive-track-end-shape, ${DesignToken.shape.corner.extraLarge} ${DesignToken.shape.corner.extraLarge} 0 0 ); } :host(:is(:state(--vertical), :--vertical)) .track-inactive, :host(:is(:state(--vertical), :--vertical)) .track-active { width: 100%; height: auto; margin-inline-start: 0; } :host(:is(:state(--vertical), :--vertical)) .track-active { bottom: var(--_slider-active-track-offset, 0px); height: var(--_slider-active-track-size, 0px); } :host(:is(:state(--vertical), :--vertical)) .track-inactive.start { bottom: 0; height: var(--_slider-inactive-track-before-size, 0px); } :host(:is(:state(--vertical), :--vertical)) .track-inactive.end { bottom: var(--_slider-inactive-track-after-offset, 0px); height: var(--_slider-inactive-track-after-size, 0px); } :host(:is(:state(--vertical), :--vertical):is(:state(--animating), :--animating)) .track-active, :host(:is(:state(--vertical), :--vertical):is(:state(--animating), :--animating)) .track-inactive.start, :host(:is(:state(--vertical), :--vertical):is(:state(--animating), :--animating)) .track-inactive.end { transition: ${unsafeCSS(`bottom ${DesignToken.motion.spring.fastEffects},
        height ${DesignToken.motion.spring.fastEffects}`)}; } :host(:is(:state(--vertical), :--vertical)) .ticks { width: var(--m3e-slider-tick-size, 4px); height: 100%; } :host(:is(:state(--vertical), :--vertical)) .tick { top: auto; inset-inline-start: 0; bottom: calc(var(--m3e-slider-tick-size, 4px) + calc(var(--m3e-slider-tick-size, 4px) / 2)); }`;
__decorate([query(".base")], M3eSliderElement.prototype, "_base", void 0);
__decorate([state()], M3eSliderElement.prototype, "_ticks", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSliderElement.prototype, "orientation", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eSliderElement.prototype, "size", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSliderElement.prototype, "disabled", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSliderElement.prototype, "discrete", void 0);
__decorate([property({
  type: Number
})], M3eSliderElement.prototype, "min", void 0);
__decorate([property({
  type: Number
})], M3eSliderElement.prototype, "max", void 0);
__decorate([property({
  type: Number
})], M3eSliderElement.prototype, "step", void 0);
__decorate([property({
  type: Boolean
})], M3eSliderElement.prototype, "labelled", void 0);
__decorate([property({
  attribute: false
})], M3eSliderElement.prototype, "displayWith", void 0);
M3eSliderElement = __decorate([customElement("m3e-slider")], M3eSliderElement);

export { M3eSliderElement, M3eSliderThumbElement, isSliderOrientation, isSliderSize };
//# sourceMappingURL=slider.js.map
