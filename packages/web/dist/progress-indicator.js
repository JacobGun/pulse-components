/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate, __classPrivateFieldSet } from 'tslib';
import { LitElement, css, html, nothing, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ReconnectedCallback, AttachInternals, Role, setCustomEnumState, DesignToken, customElement, ResizeController, AnimationLoopController, safeStyleMap } from './TextOverflowElement.js';
import { resolveFragmentUrl } from './resolveFragmentUrl.js';
import './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';

/**
 * Determines whether a value is a `ProgressIndicatorVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `ProgressIndicatorVariant`.
 */
function isProgressIndicatorVariant(value) {
  return value === "flat" || value === "wavy";
}

var _ProgressElementIndicatorBase_instances, _ProgressElementIndicatorBase_applyVariant;
/** A base implementation for an element used to convey progress. This class must be inherited. */
class ProgressElementIndicatorBase extends ReconnectedCallback(AttachInternals(Role(LitElement, "progressbar"), true)) {
  constructor() {
    super(...arguments);
    _ProgressElementIndicatorBase_instances.add(this);
    /**
     * A fractional value, between 0 and `max`, indicating progress.
     * @default 0
     */
    this.value = 0;
    /**
     * The maximum progress value.
     * @default 100
     */
    this.max = 100;
    /**
     * The appearance of the indicator.
     * @default "flat"
     */
    this.variant = "flat";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _ProgressElementIndicatorBase_instances, "m", _ProgressElementIndicatorBase_applyVariant).call(this);
    this.ariaValueMin = "0";
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("variant")) {
      __classPrivateFieldGet(this, _ProgressElementIndicatorBase_instances, "m", _ProgressElementIndicatorBase_applyVariant).call(this);
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("value")) {
      this.ariaValueNow = `${this.value}`;
    }
    if (changedProperties.has("max")) {
      this.ariaValueMax = `${this.max}`;
    }
  }
}
_ProgressElementIndicatorBase_instances = new WeakSet(), _ProgressElementIndicatorBase_applyVariant = function _ProgressElementIndicatorBase_applyVariant() {
  if (!isProgressIndicatorVariant(this.variant)) {
    this.variant = "flat";
  }
  setCustomEnumState(this, this.variant, "flat", "wavy");
};
/** The styles of the element. */
ProgressElementIndicatorBase.styles = css`:host([hidden]) { display: none; } @media (forced-colors: active) { .progress { --m3e-progress-indicator-track-color: GrayText; --m3e-progress-indicator-color: CanvasText; } }`;
__decorate([property({
  type: Number,
  reflect: true
})], ProgressElementIndicatorBase.prototype, "value", void 0);
__decorate([property({
  type: Number
})], ProgressElementIndicatorBase.prototype, "max", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], ProgressElementIndicatorBase.prototype, "variant", void 0);

var _M3eCircularProgressIndicatorElement_instances, _M3eCircularProgressIndicatorElement_maskId, _M3eCircularProgressIndicatorElement_diameter, _M3eCircularProgressIndicatorElement_strokeWidth, _M3eCircularProgressIndicatorElement_amplitude, _M3eCircularProgressIndicatorElement_wavelength, _M3eCircularProgressIndicatorElement_spinnerActiveTrack, _M3eCircularProgressIndicatorElement_spinnerTrack, _M3eCircularProgressIndicatorElement_resizeController, _M3eCircularProgressIndicatorElement_indeterminateWavyAnimationLoop, _M3eCircularProgressIndicatorElement_initialize, _M3eCircularProgressIndicatorElement_renderFlatIndicator, _M3eCircularProgressIndicatorElement_renderWavyIndicator, _M3eCircularProgressIndicatorElement_renderResizeObservedElements, _M3eCircularProgressIndicatorElement_renderContent, _M3eCircularProgressIndicatorElement_updateDiameterAndStroke, _M3eCircularProgressIndicatorElement_updateAmplitudeAndWavelength, _M3eCircularProgressIndicatorElement_updateWavyIndeterminateSpinner, _M3eCircularProgressIndicatorElement_computeWavyIndeterminateSweep, _M3eCircularProgressIndicatorElement_sizeToDegrees, _M3eCircularProgressIndicatorElement_degreesToRadians, _M3eCircularProgressIndicatorElement_polarToCartesian, _M3eCircularProgressIndicatorElement_computeCircle, _M3eCircularProgressIndicatorElement_drawArc, _M3eCircularProgressIndicatorElement_drawWavyArc;
var M3eCircularProgressIndicatorElement_1;
const WAVY_INDETERMINATE_DURATION = 1.575;
/**
 * A circular indicator of progress and activity.
 *
 * @description
 * The `m3e-circular-progress-indicator` component displays a circular progress spinner for
 * tracking the completion of a task or process. It supports determinate and indeterminate
 * modes, and can be customized with CSS custom properties for diameter, stroke width, and
 * color. The component is accessible, animates smoothly, and adapts to various use cases including
 * loading and activity indication.
 *
 * @example
 * The following example illustrates a determinate circular progress indicator.
 * ```html
 * <m3e-circular-progress-indicator value="30"></m3e-circular-progress-indicator>
 * ```
 * @example
 * The next example illustrates an indeterminate circular progress indicator using the `indeterminate` attribute.
 * ```html
 * <m3e-circular-progress-indicator indeterminate></m3e-circular-progress-indicator>
 * ```
 *
 * @tag m3e-circular-progress-indicator
 *
 * @slot - Renders the content inside the progress indicator.
 *
 * @attr indeterminate - Whether to show something is happening without conveying progress.
 * @attr max - The maximum progress value.
 * @attr value - A fractional value, between 0 and `max`, indicating progress.
 * @attr variant - The appearance of the indicator.
 *
 * @cssprop --m3e-circular-flat-progress-indicator-diameter - Diameter of the `flat` variant.
 * @cssprop --m3e-circular-wavy-progress-indicator-diameter - Diameter of the `wavy` variant.
 * @cssprop --m3e-circular-wavy-progress-indicator-amplitude - Amplitude of the `wavy` variant.
 * @cssprop --m3e-circular-wavy-progress-indicator-wavelength - Wavelength of the `wavy` variant.
 * @cssprop --m3e-circular-progress-indicator-thickness - Thickness of the progress indicator.
 * @cssprop --m3e-progress-indicator-track-color - Track color of the progress indicator (background).
 * @cssprop --m3e-progress-indicator-color - Color of the progress indicator (foreground).
 */
let M3eCircularProgressIndicatorElement = M3eCircularProgressIndicatorElement_1 = class M3eCircularProgressIndicatorElement extends ProgressElementIndicatorBase {
  constructor() {
    super(...arguments);
    _M3eCircularProgressIndicatorElement_instances.add(this);
    /** @private */
    _M3eCircularProgressIndicatorElement_maskId.set(this, `m3e-circular-progress-mask-${M3eCircularProgressIndicatorElement_1.__nextMaskId++}`);
    /** @private */
    _M3eCircularProgressIndicatorElement_diameter.set(this, 0);
    /** @private */
    _M3eCircularProgressIndicatorElement_strokeWidth.set(this, 0);
    /** @private */
    _M3eCircularProgressIndicatorElement_amplitude.set(this, 0);
    /** @private */
    _M3eCircularProgressIndicatorElement_wavelength.set(this, 0);
    /** @private */
    _M3eCircularProgressIndicatorElement_spinnerActiveTrack.set(this, void 0);
    /** @private */
    _M3eCircularProgressIndicatorElement_spinnerTrack.set(this, void 0);
    /** @private */
    _M3eCircularProgressIndicatorElement_resizeController.set(this, new ResizeController(this, {
      skipInitial: true,
      target: null,
      callback: () => {
        __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_updateDiameterAndStroke).call(this);
        __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_updateAmplitudeAndWavelength).call(this);
        queueMicrotask(() => this.requestUpdate());
      }
    }));
    /** @private */
    _M3eCircularProgressIndicatorElement_indeterminateWavyAnimationLoop.set(this, new AnimationLoopController(this, (_, t) => __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_updateWavyIndeterminateSpinner).call(this, t)));
    /**
     * Whether to show something is happening without conveying progress.
     * @default false
     */
    this.indeterminate = false;
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("indeterminate")) {
      this.ariaValueNow = this.indeterminate ? null : `${this.value}`;
    }
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_initialize).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_initialize).call(this);
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("indeterminate")) {
      __classPrivateFieldSet(this, _M3eCircularProgressIndicatorElement_spinnerActiveTrack, this.shadowRoot?.querySelector(".spinner.active-track"), "f");
      __classPrivateFieldSet(this, _M3eCircularProgressIndicatorElement_spinnerTrack, this.shadowRoot?.querySelector(".spinner.track"), "f");
      if (this.indeterminate) {
        __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_indeterminateWavyAnimationLoop, "f").start();
      } else {
        __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_indeterminateWavyAnimationLoop, "f").stop();
      }
    }
  }
  /** @inheritdoc */
  render() {
    return this.variant === "wavy" ? __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderWavyIndicator).call(this) : __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderFlatIndicator).call(this);
  }
};
_M3eCircularProgressIndicatorElement_maskId = new WeakMap();
_M3eCircularProgressIndicatorElement_diameter = new WeakMap();
_M3eCircularProgressIndicatorElement_strokeWidth = new WeakMap();
_M3eCircularProgressIndicatorElement_amplitude = new WeakMap();
_M3eCircularProgressIndicatorElement_wavelength = new WeakMap();
_M3eCircularProgressIndicatorElement_spinnerActiveTrack = new WeakMap();
_M3eCircularProgressIndicatorElement_spinnerTrack = new WeakMap();
_M3eCircularProgressIndicatorElement_resizeController = new WeakMap();
_M3eCircularProgressIndicatorElement_indeterminateWavyAnimationLoop = new WeakMap();
_M3eCircularProgressIndicatorElement_instances = new WeakSet();
_M3eCircularProgressIndicatorElement_initialize = function _M3eCircularProgressIndicatorElement_initialize() {
  const diameterAndStroke = this.shadowRoot?.querySelector(".diameter-and-stroke");
  if (diameterAndStroke) {
    __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_updateDiameterAndStroke).call(this);
    __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_resizeController, "f").observe(diameterAndStroke);
  }
  const amplitudeAndWavelength = this.shadowRoot?.querySelector(".amplitude-and-wavelength");
  if (amplitudeAndWavelength) {
    __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_updateDiameterAndStroke).call(this);
    __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_resizeController, "f").observe(amplitudeAndWavelength);
  }
};
_M3eCircularProgressIndicatorElement_renderFlatIndicator = function _M3eCircularProgressIndicatorElement_renderFlatIndicator() {
  if (this.indeterminate) {
    const left = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
      startAngle: -45,
      endAngle: 90 + __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")
    });
    const right = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
      startAngle: -__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f"),
      endAngle: 135
    });
    return html`<div class="progress" aria-hidden="true"><div class="spinner"><div class="left"><svg width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" height="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" viewBox="${left.viewBox}" class="circle"><path class="active-track" d="${left.path}" stroke="currentColor" stroke-width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}" fill="none" stroke-linecap="round"/></svg></div><div class="right"><svg width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" height="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" viewBox="${right.viewBox}" class="circle"><path class="active-track" d="${right.path}" stroke="currentColor" stroke-width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}" fill="none" stroke-linecap="round"/></svg></div></div></div>${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderResizeObservedElements).call(this)}`;
  }
  const minDegrees = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") * 2, __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f"));
  let degrees = this.value / this.max * 360;
  if (degrees > 0) {
    degrees = Math.max(0, minDegrees, degrees);
  }
  const active = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
    gap: degrees < 360 ? __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") : 0,
    endAngle: degrees
  });
  const inactive = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
    gap: degrees > 0 ? __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") : 0,
    startAngle: degrees,
    endAngle: 360
  });
  return html`<div class="progress" aria-hidden="true"><svg width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" height="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" viewBox="${active.viewBox}">${degrees > 0 ? svg`<path
            class="active-track"
            d="${active.path}"
            stroke="currentColor"
            stroke-width=${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}
            fill="none"
            stroke-linecap="round"
          />` : nothing} ${360 - degrees >= minDegrees ? svg`<path
                class="track"
                d="${inactive.path}"
                stroke="currentColor"
                stroke-width=${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}
                fill="none"
                stroke-linecap="round"
              />` : nothing}</svg></div>${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderResizeObservedElements).call(this)}${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderContent).call(this)}`;
};
_M3eCircularProgressIndicatorElement_renderWavyIndicator = function _M3eCircularProgressIndicatorElement_renderWavyIndicator() {
  if (this.indeterminate) {
    return html`<div class="progress" aria-hidden="true"><svg width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" height="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")}" viewBox="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawWavyArc).call(this, {
      endAngle: 20
    }).viewBox}"><path class="spinner active-track" stroke="currentColor" stroke-width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path class="spinner track" stroke="currentColor" stroke-width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}" fill="none" stroke-linecap="round"/></svg></div>${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderResizeObservedElements).call(this)}`;
  }
  const minDegrees = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") * 2, __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f"));
  let degrees = this.value / this.max * 360;
  if (degrees > 0) {
    degrees = Math.max(0, minDegrees, degrees);
  }
  const amplitude = degrees <= minDegrees + minDegrees / 2 || degrees == 360 ? 0 : __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_amplitude, "f");
  const activeArc = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
    gap: degrees < 360 ? __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") : 0,
    endAngle: degrees
  });
  const active = amplitude == 0 ? activeArc : __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawWavyArc).call(this, {
    endAngle: 360,
    amplitude
  });
  const inactive = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
    gap: degrees > 0 ? __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") : 0,
    startAngle: degrees,
    endAngle: 360
  });
  const padding = amplitude > 0 ? amplitude + __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") / 2 : __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f");
  return html`<svg class="progress" viewBox="${inactive.viewBox}" aria-hidden="true">${degrees > 0 ? svg`${amplitude > 0 ? svg`<defs>
          <mask id="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_maskId, "f")}">
            <path
              d="${activeArc.path}"
              stroke="white"
              stroke-width="${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") + padding}"
              fill="none"
              stroke-linecap="round"
            />
          </mask>
        </defs>` : nothing}
        <g class="active-track" mask="${ifDefined(amplitude > 0 ? resolveFragmentUrl(__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_maskId, "f")) : undefined)}">
          <path
            class="${classMap({
    wave: amplitude > 0
  })}"
            d="${active.path}"
            stroke="currentColor"
            stroke-width=${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </g>` : nothing} ${360 - degrees >= minDegrees ? svg`<path
                class="track"
                d="${inactive.path}"
                stroke="currentColor"
                stroke-width=${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")}
                fill="none"
                stroke-linecap="round"
              />` : nothing}</svg> ${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderResizeObservedElements).call(this)}${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_renderContent).call(this)}`;
};
_M3eCircularProgressIndicatorElement_renderResizeObservedElements = function _M3eCircularProgressIndicatorElement_renderResizeObservedElements() {
  return html`<div class="diameter-and-stroke" aria-hidden="true"></div><div class="amplitude-and-wavelength" aria-hidden="true"></div>`;
};
_M3eCircularProgressIndicatorElement_renderContent = function _M3eCircularProgressIndicatorElement_renderContent() {
  return html`<div class="content" aria-hidden="true"><slot></slot></div>`;
};
_M3eCircularProgressIndicatorElement_updateDiameterAndStroke = function _M3eCircularProgressIndicatorElement_updateDiameterAndStroke() {
  const element = this.shadowRoot?.querySelector(".diameter-and-stroke");
  if (element) {
    __classPrivateFieldSet(this, _M3eCircularProgressIndicatorElement_diameter, element.clientWidth, "f");
    __classPrivateFieldSet(this, _M3eCircularProgressIndicatorElement_strokeWidth, element.clientHeight, "f");
  }
};
_M3eCircularProgressIndicatorElement_updateAmplitudeAndWavelength = function _M3eCircularProgressIndicatorElement_updateAmplitudeAndWavelength() {
  const element = this.shadowRoot?.querySelector(".amplitude-and-wavelength");
  if (element) {
    __classPrivateFieldSet(this, _M3eCircularProgressIndicatorElement_amplitude, element.clientWidth, "f");
    __classPrivateFieldSet(this, _M3eCircularProgressIndicatorElement_wavelength, element.clientHeight, "f");
  }
};
_M3eCircularProgressIndicatorElement_updateWavyIndeterminateSpinner = function _M3eCircularProgressIndicatorElement_updateWavyIndeterminateSpinner(t) {
  if (__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_amplitude, "f") === 0 || __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_wavelength, "f") === 0) return;
  const sweep = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_computeWavyIndeterminateSweep).call(this, t);
  __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_spinnerActiveTrack, "f")?.setAttribute("d", __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawWavyArc).call(this, {
    endAngle: sweep
  }).path);
  __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_spinnerTrack, "f")?.setAttribute("d", __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_drawArc).call(this, {
    gap: __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f"), __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f")),
    startAngle: sweep
  }).path);
};
_M3eCircularProgressIndicatorElement_computeWavyIndeterminateSweep = function _M3eCircularProgressIndicatorElement_computeWavyIndeterminateSweep(t) {
  const sweepPadding = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f")) * 2;
  const minSweep = 18 + sweepPadding;
  const maxSweep = 280 - sweepPadding;
  const duration = WAVY_INDETERMINATE_DURATION;
  const holdMin = duration;
  const growTime = duration;
  const holdMax = duration;
  const shrinkTime = duration;
  const cycle = holdMin + growTime + holdMax + shrinkTime;
  const u = t % cycle;
  if (u < holdMin) {
    return minSweep;
  }
  if (u < holdMin + growTime) {
    const p = (u - holdMin) / growTime;
    return minSweep + (maxSweep - minSweep) * (p * p * (3 - 2 * p));
  }
  if (u < holdMin + growTime + holdMax) {
    return maxSweep;
  }
  const p = (u - (holdMin + growTime + holdMax)) / shrinkTime;
  return maxSweep - (maxSweep - minSweep) * (p * p * (3 - 2 * p));
};
_M3eCircularProgressIndicatorElement_sizeToDegrees = function _M3eCircularProgressIndicatorElement_sizeToDegrees(size, padding = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_amplitude, "f")) {
  return size * (360 / (2 * Math.PI * __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_computeCircle).call(this, padding).r));
};
_M3eCircularProgressIndicatorElement_degreesToRadians = function _M3eCircularProgressIndicatorElement_degreesToRadians(degrees) {
  return (degrees - 90) * (Math.PI / 180);
};
_M3eCircularProgressIndicatorElement_polarToCartesian = function _M3eCircularProgressIndicatorElement_polarToCartesian(circle, degrees) {
  const rad = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_degreesToRadians).call(this, degrees);
  return {
    x: circle.cx + circle.r * Math.cos(rad),
    y: circle.cy + circle.r * Math.sin(rad)
  };
};
_M3eCircularProgressIndicatorElement_computeCircle = function _M3eCircularProgressIndicatorElement_computeCircle(padding) {
  padding = padding + __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") / 2;
  const r = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") / 2;
  const cx = r + padding;
  const cy = r + padding;
  return {
    cx,
    cy,
    r,
    padding
  };
};
_M3eCircularProgressIndicatorElement_drawArc = function _M3eCircularProgressIndicatorElement_drawArc({
  startAngle = 0,
  endAngle = 360,
  gap = 0,
  padding = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_amplitude, "f")
}) {
  if (__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") === 0 || __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") === 0) return {
    path: "",
    viewBox: "0 0 0 0"
  };
  const circle = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_computeCircle).call(this, padding);
  if (gap > 0) {
    startAngle += __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, gap, padding);
    endAngle -= __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, gap, padding);
  }
  if (endAngle - startAngle >= 360) {
    endAngle = startAngle + 359.999;
  }
  const start = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_polarToCartesian).call(this, circle, endAngle);
  const end = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_polarToCartesian).call(this, circle, startAngle);
  const path = `M ${start.x} ${start.y} A ${circle.r} ${circle.r} 0 ${endAngle - startAngle <= 180 ? "0" : "1"} 0 ${end.x} ${end.y}`;
  const viewBox = `0 0 ${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") + circle.padding * 2} ${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") + circle.padding * 2}`;
  return {
    path,
    viewBox
  };
};
_M3eCircularProgressIndicatorElement_drawWavyArc = function _M3eCircularProgressIndicatorElement_drawWavyArc({
  startAngle = 0,
  endAngle = 360,
  gap = 0,
  padding = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_amplitude, "f"),
  amplitude = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_amplitude, "f"),
  steps = 200
}) {
  if (__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") === 0 || __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_strokeWidth, "f") === 0) return {
    path: "",
    viewBox: "0 0 0 0"
  };
  const circle = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_computeCircle).call(this, padding);
  if (gap > 0) {
    startAngle += __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, gap, padding);
    endAngle -= __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_sizeToDegrees).call(this, gap, padding);
  }
  const startRad = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_degreesToRadians).call(this, startAngle);
  let endRad = __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_instances, "m", _M3eCircularProgressIndicatorElement_degreesToRadians).call(this, endAngle);
  if (startAngle === endAngle) {
    endRad = startRad;
  } else if (endRad < startRad) {
    endRad += Math.PI * 2;
  }
  const totalAngle = endRad - startRad;
  const waveCount = 2 * Math.PI * circle.r / __classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_wavelength, "f");
  const phase = Math.PI / 2 * (waveCount - 1);
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const angle = startRad + t * totalAngle;
    const wave = Math.sin(angle * waveCount + phase);
    const radius = circle.r - amplitude * wave;
    const x = radius * Math.cos(angle) + circle.cx;
    const y = radius * Math.sin(angle) + circle.cy;
    points.push([x, y]);
  }
  const path = points.length === 1 ? `M ${points[0][0]},${points[0][1]}` : `M ${points[0][0]},${points[0][1]} ` + points.slice(1).map(([x, y]) => `L ${x},${y}`).join(" ");
  const viewBox = `0 0 ${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") + circle.padding * 2} ${__classPrivateFieldGet(this, _M3eCircularProgressIndicatorElement_diameter, "f") + circle.padding * 2}`;
  return {
    path,
    viewBox
  };
};
/** The styles of the element. */
M3eCircularProgressIndicatorElement.styles = [ProgressElementIndicatorBase.styles, css`:host { display: inline-flex; vertical-align: middle; aspect-ratio: 1; position: relative; align-items: center; justify-content: center; } :host([hidden]) { display: none; } .progress { --_arc-duration: 1333ms; --_cycle-duration: calc(4 * var(--_arc-duration)); --_linear-rotate-duration: calc(var(--_arc-duration) * 360 / 306); --_indeterminate-easing: cubic-bezier(0.4, 0, 0.2, 1); } .active-track { transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1); } :host(:is(:state(--flat), :--flat)) .progress { flex: 1; align-self: stretch; pointer-events: none; } .progress, .spinner, .left, .right, .content, .circle { position: absolute; inset: 0; } .content { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; } .diameter-and-stroke, .amplitude-and-wavelength { visibility: hidden; position: absolute; } .diameter-and-stroke { width: inherit; height: var(--m3e-circular-progress-indicator-thickness, 4px); } .amplitude-and-wavelength { width: var(--m3e-circular-wavy-progress-indicator-amplitude, 1.6px); height: var(--m3e-circular-wavy-progress-indicator-wavelength, 15px); } :host(:is(:state(--flat), :--flat)) { width: var(--m3e-circular-flat-progress-indicator-diameter, 40px); } :host(:is(:state(--wavy), :--wavy)) { width: var(--m3e-circular-wavy-progress-indicator-diameter, 48px); } :host(:is(:state(--flat), :--flat)[indeterminate]) .progress { animation: linear infinite linear-rotate; animation-duration: var(--_linear-rotate-duration); } :host(:is(:state(--flat), :--flat)[indeterminate]) .spinner { animation: infinite both rotate-arc; animation-duration: var(--_cycle-duration); animation-timing-function: var(--_indeterminate-easing); } :host(:is(:state(--wavy), :--wavy)[indeterminate]) .spinner { transform-origin: 50% 50%; animation: wavy-spin ${WAVY_INDETERMINATE_DURATION}s linear infinite; } .left { clip-path: inset(0); inset: 0 50% 0 0; } .right { clip-path: inset(0); inset: 0 0 0 50%; } .circle { animation: expand-arc; animation-iteration-count: infinite; animation-fill-mode: both; animation-duration: var(--_arc-duration), var(--_cycle-duration); animation-timing-function: var(--_indeterminate-easing); } .left .circle { rotate: 135deg; inset: 0 -100% 0 0; } .right .circle { rotate: 100deg; inset: 0 0 0 -100%; animation-delay: calc(-0.5 * var(--_arc-duration)), 0ms; } .track { color: var(--m3e-progress-indicator-track-color, ${DesignToken.color.secondaryContainer}); } .active-track { color: var(--m3e-progress-indicator-color, ${DesignToken.color.primary}); } .wave { animation: spin-reverse 8s linear infinite; transform-origin: 50% 50%; } @keyframes expand-arc { 0% { transform: rotate(265deg); } 50% { transform: rotate(130deg); } 100% { transform: rotate(265deg); } } @keyframes rotate-arc { 12.5% { transform: rotate(135deg); } 25% { transform: rotate(270deg); } 37.5% { transform: rotate(405deg); } 50% { transform: rotate(540deg); } 62.5% { transform: rotate(675deg); } 75% { transform: rotate(810deg); } 87.5% { transform: rotate(945deg); } 100% { transform: rotate(1080deg); } } @keyframes linear-rotate { to { transform: rotate(360deg); } } @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes wavy-spin { 0% { transform: rotate(0deg); } 10% { transform: rotate(90deg); } 100% { transform: rotate(360deg); } } @media (forced-colors: active) { :host(:is(:state(--flat), :--flat)) circle { fill: Canvas; } :host(:is(:state(--flat), :--flat)) .circle { border-color: var(--m3e-progress-indicator-color, ${DesignToken.color.primary}) var(--m3e-progress-indicator-color, ${DesignToken.color.primary}) Canvas Canvas; } }`];
/** @private */
M3eCircularProgressIndicatorElement.__nextMaskId = 0;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eCircularProgressIndicatorElement.prototype, "indeterminate", void 0);
M3eCircularProgressIndicatorElement = M3eCircularProgressIndicatorElement_1 = __decorate([customElement("m3e-circular-progress-indicator")], M3eCircularProgressIndicatorElement);

/**
 * Determines whether a value is a `LinearProgressMode`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `LinearProgressMode`.
 */
function isLinearProgressMode(value) {
  return value === "determinate" || value === "indeterminate" || value === "buffer" || value === "query";
}

var _M3eLinearProgressIndicatorElement_instances, _M3eLinearProgressIndicatorElement_maskId, _M3eLinearProgressIndicatorElement_strokeWidth, _M3eLinearProgressIndicatorElement_amplitude, _M3eLinearProgressIndicatorElement_wavelength, _M3eLinearProgressIndicatorElement_resizeController, _M3eLinearProgressIndicatorElement_applyMode, _M3eLinearProgressIndicatorElement_initialize, _M3eLinearProgressIndicatorElement_renderWave, _M3eLinearProgressIndicatorElement_renderResizeObservedElements, _M3eLinearProgressIndicatorElement_updateStroke, _M3eLinearProgressIndicatorElement_updateAmplitudeAndWavelength, _M3eLinearProgressIndicatorElement_drawWavyPath;
var M3eLinearProgressIndicatorElement_1;
/**
 * A horizontal bar for indicating progress and activity.
 *
 * @description
 * The `m3e-linear-progress-indicator` component displays a horizontal progress bar for tracking
 * the completion of a task or process. It supports `determinate`, `indeterminate`, `buffer`,
 * and `query` modes, and can be customized with CSS custom properties for thickness, shape, and color.
 * The component is accessible, animates smoothly, and adapts to various use cases including loading,
 * buffering, and activity indication.
 *
 * @example
 * The following example illustrates a determinate linear progress indicator.
 * ```html
 * <m3e-linear-progress-indicator value="30"></m3e-linear-progress-indicator>
 * ```
 * @example
 * The next example illustrates an indeterminate linear progress indicator using the `mode` attribute.
 * ```html
 * <m3e-linear-progress-indicator mode="indeterminate"></m3e-linear-progress-indicator>
 * ```
 *
 * @tag m3e-linear-progress-indicator
 *
 * @attr buffer-value - A fractional value, between 0 and `max`, indicating buffer progress.
 * @attr max - The maximum progress value.
 * @attr mode - The mode of the progress bar.
 * @attr value - A fractional value, between 0 and `max`, indicating progress.
 * @attr variant - The appearance of the indicator.
 *
 * @cssprop --m3e-linear-progress-indicator-thickness - Thickness (height) of the progress bar.
 * @cssprop --m3e-linear-progress-indicator-shape - Border radius of the progress bar.
 * @cssprop --m3e-progress-indicator-track-color - Track color of the progress bar (background/buffer).
 * @cssprop --m3e-progress-indicator-color - Color of the progress indicator (foreground).
 * @cssprop --m3e-linear-wavy-progress-indicator-amplitude - Amplitude of the `wavy` variant.
 * @cssprop --m3e-linear-wavy-progress-indicator-wavelength - Wavelength of the `wavy` variant.
 * @cssprop --m3e-linear-wavy-indeterminate-progress-indicator-wavelength - Wavelength of the indeterminate/query `wavy` variant.
 */
let M3eLinearProgressIndicatorElement = M3eLinearProgressIndicatorElement_1 = class M3eLinearProgressIndicatorElement extends SupportsDirectionality(ProgressElementIndicatorBase) {
  constructor() {
    super(...arguments);
    _M3eLinearProgressIndicatorElement_instances.add(this);
    /** @private */
    _M3eLinearProgressIndicatorElement_maskId.set(this, `m3e-linear-progress-mask-${M3eLinearProgressIndicatorElement_1.__nextMaskId++}`);
    /** @private */
    _M3eLinearProgressIndicatorElement_strokeWidth.set(this, 0);
    /** @private */
    _M3eLinearProgressIndicatorElement_amplitude.set(this, 0);
    /** @private */
    _M3eLinearProgressIndicatorElement_wavelength.set(this, 0);
    /** @private */
    _M3eLinearProgressIndicatorElement_resizeController.set(this, new ResizeController(this, {
      skipInitial: true,
      target: null,
      callback: () => {
        __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_updateStroke).call(this);
        __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_updateAmplitudeAndWavelength).call(this);
        queueMicrotask(() => this.requestUpdate());
      }
    }));
    /**
     * The mode of the progress bar.
     * @default "determinate"
     */
    this.mode = "determinate";
    /**
     * A fractional value, between 0 and `max`, indicating buffer progress.
     * @default 0
     */
    this.bufferValue = 0;
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_applyMode).call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_initialize).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("mode")) {
      __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_applyMode).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_initialize).call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("mode")) {
      this.ariaValueNow = this.mode === "indeterminate" || this.mode === "query" ? null : `${this.value}`;
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("value") || _changedProperties.has("bufferValue") || _changedProperties.has("max")) {
      const progress = this.shadowRoot?.querySelector(".progress");
      progress?.style.setProperty("--_value", `${this.value / this.max * 100}%`);
      progress?.style.setProperty("--_buffer-value", `${this.bufferValue / this.max * 100}%`);
    }
  }
  /** @inheritdoc */
  render() {
    const clampedValue = Math.max(0, Math.min(this.value, this.max));
    const activeWidth = clampedValue / this.max * this.clientWidth;
    const waveWidth = this.mode === "indeterminate" || this.mode === "query" ? this.clientWidth : activeWidth + __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_wavelength, "f") * 3;
    const wave = this.variant === "wavy" && __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_strokeWidth, "f") > 0 && __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_amplitude, "f") > 0 && __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_wavelength, "f") > 0 ? __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_drawWavyPath).call(this, waveWidth) : undefined;
    return html`<div class="progress" aria-hidden="true" style="${safeStyleMap({
      "--_translate-x": `-${activeWidth}px`
    })}">${!wave ? html`<div class="track"></div>` : nothing} ${(this.mode === "determinate" || this.mode === "buffer") && this.value <= 0 ? nothing : html`<div class="primary">${wave && (this.mode === "determinate" || this.mode === "buffer") ? __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_renderWave).call(this, waveWidth, wave.height, wave.viewBox, wave.path) : nothing}</div>${this.mode === "determinate" || this.mode === "buffer" ? html`<div class="gap"></div>` : nothing}`} ${this.mode !== "buffer" || this.bufferValue > 0 ? html`<div class="secondary"></div>` : nothing} ${this.mode === "buffer" && this.bufferValue > 0 ? html`<div class="gap"></div>` : nothing} ${this.mode === "buffer" ? html`<div class="buffer"></div>` : nothing} ${(this.mode === "determinate" || this.mode === "buffer") && this.value > 0 ? html`<div class="gap"></div><div class="stop"></div>` : nothing} ${wave && !(this.mode === "determinate" || this.mode === "buffer") ? __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_renderWave).call(this, waveWidth, wave.height, wave.viewBox, wave.path) : nothing}</div>${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_renderResizeObservedElements).call(this)}`;
  }
};
_M3eLinearProgressIndicatorElement_maskId = new WeakMap();
_M3eLinearProgressIndicatorElement_strokeWidth = new WeakMap();
_M3eLinearProgressIndicatorElement_amplitude = new WeakMap();
_M3eLinearProgressIndicatorElement_wavelength = new WeakMap();
_M3eLinearProgressIndicatorElement_resizeController = new WeakMap();
_M3eLinearProgressIndicatorElement_instances = new WeakSet();
_M3eLinearProgressIndicatorElement_applyMode = function _M3eLinearProgressIndicatorElement_applyMode() {
  if (!isLinearProgressMode(this.mode)) {
    this.mode = "determinate";
  }
  setCustomEnumState(this, this.mode, "buffer", "determinate", "indeterminate", "query");
};
_M3eLinearProgressIndicatorElement_initialize = function _M3eLinearProgressIndicatorElement_initialize() {
  __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_updateStroke).call(this);
  __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_instances, "m", _M3eLinearProgressIndicatorElement_updateAmplitudeAndWavelength).call(this);
  const stroke = this.shadowRoot?.querySelector(".stroke");
  if (stroke) {
    __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_resizeController, "f").observe(stroke);
  }
  const amplitudeAndWavelength = this.shadowRoot?.querySelector(".amplitude-and-wavelength");
  if (amplitudeAndWavelength) {
    __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_resizeController, "f").observe(amplitudeAndWavelength);
  }
};
_M3eLinearProgressIndicatorElement_renderWave = function _M3eLinearProgressIndicatorElement_renderWave(width, height, viewBox, path) {
  const masked = this.mode === "indeterminate" || this.mode === "query";
  if (!masked && this.value / this.max === 1) {
    return html`<div class="complete"></div>`;
  }
  return html`<svg class="wave" width="${width}" height="${height}" viewBox="${viewBox}" preserveAspectRatio="none">${masked ? svg`
        <mask id="${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_maskId, "f")}" maskUnits="userSpaceOnUse">
          <rect width="${width}" height="${height}" fill="black" />
          <rect class="primary" height="${height}" fill="white" />
          <rect class="secondary" height="${height}" fill="white" />
        </mask>
        <mask id="${`${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_maskId, "f")}-inverse`}" maskUnits="userSpaceOnUse">
          <rect width="${width}" height="${height}" fill="white" />
          <rect class="primary" height="${height}" fill="black" />
          <rect class="secondary" height="${height}" fill="black" />
        </mask>
        <g mask="${resolveFragmentUrl(__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_maskId, "f"))}">
          <path d="${path}" stroke="currentColor" stroke-width=${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_strokeWidth, "f")} fill="none" stroke-linecap="round" />
        </g>
        <g mask="${resolveFragmentUrl(`${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_maskId, "f")}-inverse`)}">
          <rect class="track" width="100%" height="${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_strokeWidth, "f")}" fill="currentColor" />
        </g>` : svg`<path d="${path}" stroke="currentColor" stroke-width=${__classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_strokeWidth, "f")} fill="none" stroke-linecap="round" />`}</svg>`;
};
_M3eLinearProgressIndicatorElement_renderResizeObservedElements = function _M3eLinearProgressIndicatorElement_renderResizeObservedElements() {
  return html`<div class="stroke" aria-hidden="true"></div><div class="amplitude-and-wavelength" aria-hidden="true"></div>`;
};
_M3eLinearProgressIndicatorElement_updateStroke = function _M3eLinearProgressIndicatorElement_updateStroke() {
  const element = this.shadowRoot?.querySelector(".stroke");
  if (element) {
    __classPrivateFieldSet(this, _M3eLinearProgressIndicatorElement_strokeWidth, element.clientHeight, "f");
  }
};
_M3eLinearProgressIndicatorElement_updateAmplitudeAndWavelength = function _M3eLinearProgressIndicatorElement_updateAmplitudeAndWavelength() {
  const element = this.shadowRoot?.querySelector(".amplitude-and-wavelength");
  if (element) {
    __classPrivateFieldSet(this, _M3eLinearProgressIndicatorElement_amplitude, element.clientHeight, "f");
    __classPrivateFieldSet(this, _M3eLinearProgressIndicatorElement_wavelength, element.clientWidth, "f");
  }
};
_M3eLinearProgressIndicatorElement_drawWavyPath = function _M3eLinearProgressIndicatorElement_drawWavyPath(width, phase = 0) {
  const amplitude = __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_amplitude, "f") + __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_strokeWidth, "f") / 2;
  const y = amplitude;
  const path = [];
  const step = __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_wavelength, "f") / 2;
  let x = 0;
  path.push(`M ${x},${y}`);
  while (x <= width) {
    const endX = x + step;
    const endY = y + amplitude * Math.sin(2 * Math.PI * endX / __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_wavelength, "f") + phase);
    const cpX = x + step / 2;
    const cpY = y + amplitude * Math.sin(2 * Math.PI * (x + step / 2) / __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_wavelength, "f") + phase);
    path.push(`Q ${cpX},${cpY} ${endX},${endY}`);
    x += step;
  }
  const padding = 1;
  const viewBox = `0 ${-padding} ${width} ${amplitude * 2 + padding * 2}`;
  return {
    path: path.join(" "),
    viewBox,
    height: __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_strokeWidth, "f") + __classPrivateFieldGet(this, _M3eLinearProgressIndicatorElement_amplitude, "f") * 2,
    padding
  };
};
/** The styles of the element. */
M3eLinearProgressIndicatorElement.styles = [ProgressElementIndicatorBase.styles, css`:host { display: block; position: relative; } .progress { width: 100%; height: 100%; position: relative; align-items: center; border-radius: var(--m3e-linear-progress-indicator-shape, ${DesignToken.shape.corner.extraSmall}); } .stroke, .amplitude-and-wavelength { visibility: hidden; position: absolute; } .stroke { width: 100%; height: var(--m3e-linear-progress-indicator-thickness, 4px); } .amplitude-and-wavelength { height: var(--m3e-linear-wavy-progress-indicator-amplitude, 3px); width: var(--m3e-linear-wavy-progress-indicator-wavelength, 40px); } :host(:is(:state(--indeterminate), :--indeterminate)) .amplitude-and-wavelength, :host(:is(:state(--query), :--query)) .amplitude-and-wavelength { width: var(--m3e-linear-wavy-indeterminate-progress-indicator-wavelength, 24px); } .primary, .secondary, .stop { height: var(--m3e-linear-progress-indicator-thickness, 4px); border-radius: inherit; } .stop { aspect-ratio: 1; flex: none; } :host(:is(:state(--flat), :--flat)) { height: var(--m3e-linear-progress-indicator-thickness, 4px); } :host(:is(:state(--wavy), :--wavy)) { height: calc( var(--m3e-linear-progress-indicator-thickness, 4px) + calc(var(--m3e-linear-wavy-progress-indicator-amplitude, 3px) * 2) ); } :host(:is(:state(--wavy), :--wavy)) .primary, :host(:is(:state(--wavy), :--wavy)) .secondary { position: relative; height: 100%; overflow: hidden; } :host(:is(:state(--wavy), :--wavy)) .complete { position: absolute; margin: auto; top: calc(50% - calc(var(--m3e-linear-progress-indicator-thickness, 4px) / 2)); left: 0; right: 0; height: var(--m3e-linear-progress-indicator-thickness, 4px); border-radius: inherit; } :host(:is(:state(--wavy), :--wavy)) .secondary { height: var(--m3e-linear-progress-indicator-thickness, 4px); } .wave { position: absolute; display: block; } .primary .wave, .secondary .wave { margin-inline-start: calc(0px - var(--m3e-linear-wavy-progress-indicator-wavelength, 40px)); } :host(:is(:state(--wavy), :--wavy):is(:state(--determinate), :--determinate)) .primary path, :host(:is(:state(--wavy), :--wavy):is(:state(--buffer), :--buffer)) .primary path { animation: wave-slide 1.5s linear infinite; } @keyframes wave-slide { from { transform: translateX(0); } to { transform: translateX(calc(0px - var(--m3e-linear-wavy-progress-indicator-wavelength, 40px))); } } :host(:is(:state(--determinate), :--determinate)) .progress, :host(:is(:state(--buffer), :--buffer)) .progress { display: flex; overflow: hidden; } :host(:is(:state(--determinate), :--determinate)) .primary, :host(:is(:state(--buffer), :--buffer)) .primary { width: var(--_value, 0px); flex: none; } :host(:is(:state(--determinate), :--determinate)) .gap, :host(:is(:state(--buffer), :--buffer)) .gap { flex-basis: var(--m3e-linear-progress-indicator-thickness, 4px); flex-shrink: 1; } :host(:is(:state(--determinate), :--determinate)) .secondary, :host(:is(:state(--buffer), :--buffer)) .buffer { flex: 1 1 auto; } :host(:is(:state(--buffer), :--buffer)) .buffer { flex-shrink: 5; height: 100%; width: 100%; background-color: var(--m3e-progress-indicator-track-color, ${DesignToken.color.secondaryContainer}); mask-image: radial-gradient( circle, black 0, black calc(var(--m3e-linear-progress-indicator-thickness, 4px) / 2), transparent calc(var(--m3e-linear-progress-indicator-thickness, 4px) / 2) ); mask-size: calc(var(--m3e-linear-progress-indicator-thickness, 4px) * 2) 100%; mask-repeat: repeat; animation: buffer 250ms linear infinite; } :host(:is(:state(--rtl), :--rtl):is(:state(--buffer), :--buffer)) .buffer { transform: scaleX(-1); } @keyframes buffer { from { mask-position: 0 0; } to { mask-position: calc(-1 * calc(var(--m3e-linear-progress-indicator-thickness, 4px) * 2)) 0; } } :host(:is(:state(--buffer), :--buffer)) .secondary { width: var(--_buffer-value, 0px); flex: none; } :host(:is(:state(--indeterminate), :--indeterminate)) .primary, :host(:is(:state(--query), :--query)) .primary { position: absolute; top: 0; height: 100%; border-radius: inherit; animation: indeterminate-primary 2.1s infinite linear; } :host(:is(:state(--wavy), :--wavy):is(:state(--indeterminate), :--indeterminate)) .primary, :host(:is(:state(--wavy), :--wavy):is(:state(--query), :--query)) .primary { animation-name: wavy-indeterminate-primary; } :host(:is(:state(--indeterminate), :--indeterminate)) .secondary, :host(:is(:state(--query), :--query)) .secondary { position: absolute; top: 0; height: 100%; border-radius: inherit; animation: indeterminate-secondary 2.1s infinite linear; animation-delay: 1.15s; animation-fill-mode: backwards; } :host(:is(:state(--wavy), :--wavy):is(:state(--indeterminate), :--indeterminate)) .secondary, :host(:is(:state(--wavy), :--wavy):is(:state(--query), :--query)) .secondary { animation-name: wavy-indeterminate-secondary; } :host(:is(:state(--indeterminate), :--indeterminate)) .progress, :host(:is(:state(--query), :--query)) .progress { overflow: hidden; position: relative; } :host(:not(:is(:state(--rtl), :--rtl)):is(:state(--query), :--query)) .progress, :host(:is(:state(--rtl), :--rtl):is(:state(--indeterminate), :--indeterminate)) .progress { transform: scaleX(-1); } :host(:is(:state(--flat), :--flat)) .primary, :host(:is(:state(--flat), :--flat):is(:state(--indeterminate), :--indeterminate)) .secondary, :host(:is(:state(--flat), :--flat):is(:state(--query), :--query)) .secondary, :host(:is(:state(--wavy), :--wavy)) .complete, .stop { background-color: var(--m3e-progress-indicator-color, ${DesignToken.color.primary}); } :host(:is(:state(--wavy), :--wavy)) .progress { color: var(--m3e-progress-indicator-color, ${DesignToken.color.primary}); } :host(:is(:state(--determinate), :--determinate)) .secondary, :host(:is(:state(--buffer), :--buffer)) .secondary, :host(:is(:state(--flat), :--flat):is(:state(--indeterminate), :--indeterminate)) .track, :host(:is(:state(--flat), :--flat):is(:state(--query), :--query)) .track { background-color: var(--m3e-progress-indicator-track-color, ${DesignToken.color.secondaryContainer}); } :host(:is(:state(--wavy), :--wavy):is(:state(--indeterminate), :--indeterminate)) .track, :host(:is(:state(--wavy), :--wavy):is(:state(--query), :--query)) .track { color: var(--m3e-progress-indicator-track-color, ${DesignToken.color.secondaryContainer}); } :host(:is(:state(--wavy), :--wavy):is(:state(--indeterminate), :--indeterminate)) .track, :host(:is(:state(--wavy), :--wavy):is(:state(--query), :--query)) .track { y: calc(50% - calc(var(--m3e-linear-progress-indicator-thickness, 4px) / 2)); border-radius: inherit; } :host(:is(:state(--flat), :--flat):is(:state(--indeterminate), :--indeterminate)) .track, :host(:is(:state(--flat), :--flat):is(:state(--query), :--query)) .track { position: absolute; margin: auto; top: calc(50% - calc(var(--m3e-linear-progress-indicator-thickness, 4px) / 2)); left: 0; right: 0; height: var(--m3e-linear-progress-indicator-thickness, 4px); border-radius: inherit; } @keyframes indeterminate-primary { 0% { left: -145.167%; width: 8%; } 20% { left: -113.333%; width: 48%; } 60% { left: 56.333%; width: 78%; } 100% { left: 100%; width: 8%; } } @keyframes indeterminate-secondary { 0% { left: -54.888%; width: 8%; } 20% { left: -20%; width: 48%; } 60% { left: 60%; width: 78%; } 100% { left: 160%; width: 8%; } } @keyframes wavy-indeterminate-primary { 0% { transform: translateX(-145.167%); width: 8%; } 20% { transform: translateX(-113.333%); width: 48%; } 60% { transform: translateX(56.333%); width: 78%; } 100% { transform: translateX(100%); width: 8%; } } @keyframes wavy-indeterminate-secondary { 0% { transform: translateX(-54.888%); width: 8%; } 20% { transform: translateX(-20%); width: 48%; } 60% { transform: translateX(60%); width: 78%; } 100% { transform: translateX(160%); width: 8%; } }`];
/** @private */
M3eLinearProgressIndicatorElement.__nextMaskId = 0;
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eLinearProgressIndicatorElement.prototype, "mode", void 0);
__decorate([property({
  attribute: "buffer-value",
  type: Number
})], M3eLinearProgressIndicatorElement.prototype, "bufferValue", void 0);
M3eLinearProgressIndicatorElement = M3eLinearProgressIndicatorElement_1 = __decorate([customElement("m3e-linear-progress-indicator")], M3eLinearProgressIndicatorElement);

export { M3eCircularProgressIndicatorElement, M3eLinearProgressIndicatorElement, ProgressElementIndicatorBase, isLinearProgressMode, isProgressIndicatorVariant };
//# sourceMappingURL=progress-indicator.js.map
