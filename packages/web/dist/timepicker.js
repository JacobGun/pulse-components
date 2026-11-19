/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, nothing, unsafeCSS, css, svg } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { AttachInternals, SuppressInitialAnimation, Role, safeStyleMap, DesignToken, customElement, HtmlFor, setCustomState, ReconnectedCallback, ScrollLockController, InertController, deleteCustomState, setCustomEnumState, prefersReducedMotion, addCustomState, ActionElementBase } from './TextOverflowElement.js';
import { property, state, query } from 'lit/decorators.js';
import { computeCssSize } from './computeCssSize.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { timeConverter } from './timeConverter.js';
import { dateConverter } from './dateConverter.js';
import { waitForUpdate } from './waitForUpdate.js';
import { positionAnchor } from './FloatingPanelElement.js';
import { M3eDirectionality } from './Directionality.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';
import './LiveAnnouncer.js';
import './ButtonElement.js';
import './IconButtonElement.js';

/**
 * Determines whether a value is a `TimepickerFormat`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TimepickerFormat`.
 */
function isTimepickerFormat(value) {
  return value === "12" || value === "24" || value === "auto";
}

/**
 * Determines whether a value is a `TimepickerView`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TimepickerView`.
 */
function isTimepickerView(value) {
  return value === "hour" || value === "minute" || value === "second";
}

/**
 * Determines whether a value is a `TimepickerPeriod`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TimepickerPeriod`.
 */
function isTimepickerPeriod(value) {
  return value === "am" || value === "pm";
}

var _TimepickerInputElementBase_hour, _TimepickerInputElementBase_minute, _TimepickerInputElementBase_second, _TimepickerInputElementBase_format;
/** A base implementation for an element used to input time. This class must be inherited. */
class TimepickerInputElementBase extends AttachInternals(LitElement) {
  constructor() {
    super(...arguments);
    /** @private */
    _TimepickerInputElementBase_hour.set(this, null);
    /** @private */
    _TimepickerInputElementBase_minute.set(this, null);
    /** @private */
    _TimepickerInputElementBase_second.set(this, null);
    /** @private */
    _TimepickerInputElementBase_format.set(this, "12");
    /**
     * Whether to use a 12‑hour or 24‑hour clock.
     * @default "12"
     */
    this.format = "12";
    /**
     * The view used to input time.
     * @default "hour"
     */
    this.view = "hour";
    /**
     * The 12-hour time period.
     * @default "am"
     */
    this.period = "am";
    /**
     * Whether to show seconds.
     * @default false
     */
    this.showSeconds = false;
    /**
     * The minimum time that can be selected.
     * @default null
     */
    this.minTime = null;
    /**
     * The maximum time that can be selected.
     * @default null
     */
    this.maxTime = null;
  }
  /**
   * The hour, in 24-hour time, from 0..23.
   * @default null
   */
  get hour() {
    return __classPrivateFieldGet(this, _TimepickerInputElementBase_hour, "f");
  }
  set hour(value) {
    __classPrivateFieldSet(this, _TimepickerInputElementBase_hour, value === null ? null : Math.max(0, Math.min(value, 23)), "f");
  }
  /**
   * The minute, from 0..59.
   * @default null
   */
  get minute() {
    return __classPrivateFieldGet(this, _TimepickerInputElementBase_minute, "f");
  }
  set minute(value) {
    __classPrivateFieldSet(this, _TimepickerInputElementBase_minute, value === null ? null : Math.max(0, Math.min(value, 59)), "f");
  }
  /**
   * The second, from 0..59.
   * @default null
   */
  get second() {
    return __classPrivateFieldGet(this, _TimepickerInputElementBase_second, "f");
  }
  set second(value) {
    __classPrivateFieldSet(this, _TimepickerInputElementBase_second, value === null ? null : Math.max(0, Math.min(value, 59)), "f");
  }
  /** The hour in 12‑hour time from 1..12. */
  get hourOfPeriod() {
    if (this.hour === null) return null;
    const h = this.hour % 12;
    return h === 0 ? 12 : h;
  }
  set hourOfPeriod(value) {
    if (value === null) {
      this.hour = null;
    } else {
      const h = Math.max(1, Math.min(value, 12));
      this.hour = this.period === "am" ? h === 12 ? 0 : h : h === 12 ? 12 : h + 12;
    }
  }
  /** The current time format. */
  get currentFormat() {
    return __classPrivateFieldGet(this, _TimepickerInputElementBase_format, "f");
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("period") && !isTimepickerPeriod(this.period)) {
      this.period = "am";
    }
    if (_changedProperties.has("view") && !isTimepickerView(this.view)) {
      this.view = "hour";
    }
    if (_changedProperties.has("format")) {
      if (!isTimepickerFormat(this.format)) {
        this.format = "12";
      }
      __classPrivateFieldSet(this, _TimepickerInputElementBase_format, this.format !== "auto" ? this.format : new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric"
      }).resolvedOptions().hour12 ? "12" : "24", "f");
    }
    // If the hour changes, ensure the correct period; otherwise, if period changes, adjust hour.
    if (_changedProperties.has("hour")) {
      this.period = this.hour !== null && this.hour >= 12 ? "pm" : "am";
    } else if (_changedProperties.has("period")) {
      if (this.hour !== null) {
        const h = this.hour % 12 || 12;
        this.hour = this.period === "am" ? h === 12 ? 0 : h : h === 12 ? 12 : h + 12;
      }
    }
  }
  /**
   * Determines whether the given hour is disabled.
   * @param {number} hour The hour to test.
   * @returns {boolean} Whether `hour` is disabled.
   */
  isHourDisabled(hour) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s++) {
        if (!this.isSecondDisabled(hour, m, s)) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Determines whether the given minute of an hour is disabled.
   * @param {number} hour The hour to test.
   * @param {number} minute The minute to test.
   * @returns {boolean} Whether `minute` is disabled for `hour`.
   */
  isMinuteDisabled(hour, minute) {
    for (let s = 0; s < 60; s++) {
      if (!this.isSecondDisabled(hour, minute, s)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Determines whether a given hour, minute, and second is disabled.
   * @param {number} hour The hour to test.
   * @param {number} minute The minute to test.
   * @param {number} second The second to test.
   * @returns {boolean} Whether `hour`, `minute`, and `second` is disabled.
   */
  isSecondDisabled(hour, minute, second) {
    if (this.minTime) {
      const {
        hour: mh,
        minute: mm = 0,
        second: ms = 0
      } = this.minTime;
      if (hour < mh || hour === mh && minute < mm || hour === mh && minute === mm && second < ms) {
        return true;
      }
    }
    if (this.maxTime) {
      const {
        hour: Mh,
        minute: Mm = 59,
        second: Ms = 59
      } = this.maxTime;
      if (hour > Mh || hour === Mh && minute > Mm || hour === Mh && minute === Mm && second > Ms) {
        return true;
      }
    }
    if (this.blackoutTimes?.({
      hour,
      minute,
      second
    })) {
      return true;
    }
    return false;
  }
}
_TimepickerInputElementBase_hour = new WeakMap(), _TimepickerInputElementBase_minute = new WeakMap(), _TimepickerInputElementBase_second = new WeakMap(), _TimepickerInputElementBase_format = new WeakMap();
__decorate([property({
  type: Number
})], TimepickerInputElementBase.prototype, "hour", null);
__decorate([property({
  type: Number
})], TimepickerInputElementBase.prototype, "minute", null);
__decorate([property({
  type: Number
})], TimepickerInputElementBase.prototype, "second", null);
__decorate([property()], TimepickerInputElementBase.prototype, "format", void 0);
__decorate([property()], TimepickerInputElementBase.prototype, "view", void 0);
__decorate([property()], TimepickerInputElementBase.prototype, "period", void 0);
__decorate([property({
  attribute: "show-seconds",
  type: Boolean
})], TimepickerInputElementBase.prototype, "showSeconds", void 0);
__decorate([property({
  attribute: "min-time",
  converter: timeConverter
})], TimepickerInputElementBase.prototype, "minTime", void 0);
__decorate([property({
  attribute: "max-time",
  converter: timeConverter
})], TimepickerInputElementBase.prototype, "maxTime", void 0);
__decorate([property({
  attribute: false
})], TimepickerInputElementBase.prototype, "blackoutTimes", void 0);

var _M3eTimepickerDialElement_instances, _M3eTimepickerDialElement_dragState, _M3eTimepickerDialElement_renderHandle, _M3eTimepickerDialElement_renderHourFace, _M3eTimepickerDialElement_renderMinuteFace, _M3eTimepickerDialElement_renderSecondFace, _M3eTimepickerDialElement_renderNumeral, _M3eTimepickerDialElement_updateHand, _M3eTimepickerDialElement_handlePointerDown, _M3eTimepickerDialElement_handlePointerMove, _M3eTimepickerDialElement_handlePointerUp, _M3eTimepickerDialElement_angleFromPointer, _M3eTimepickerDialElement_radiusFromPointer, _M3eTimepickerDialElement_isPointerInsideInnerRing, _M3eTimepickerDialElement_hourFromAngle, _M3eTimepickerDialElement_minuteOrSecondFromAngle, _M3eTimepickerDialElement_changeHour, _M3eTimepickerDialElement_changeMinute, _M3eTimepickerDialElement_changeSecond;
/**
 * A clock‑face surface for selecting hours and minutes using a movable hand.
 * @description
 * The `m3e-timepicker-dial` component provides a clock-face experience
 * for selecting hours and minutes. It supports both 12- and 24-hour formats,
 * and exposes view changes through accessible events.
 *
 * @tag m3e-timepicker-dial
 *
 * @attr format - Whether to use a 12‑hour or 24‑hour clock.
 * @attr hour - The hour, in 24-hour time, from 0..23.
 * @attr max-time - The maximum time that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr minute - The minute, from 0..59.
 * @attr second - The second, from 0..59.
 * @attr show-seconds - Whether to show seconds.
 * @attr period - The 12-hour time period.
 * @attr view - The view used to input time.
 *
 * @fires change - Dispatched when the selected time changes.
 * @fires input - Dispatched when the selected time changes.
 * @fires view-change - Dispatched when the view changes.
 *
 * @cssprop --m3e-timepicker-dial-container-size - Size of the dial container.
 * @cssprop --m3e-timepicker-dial-container-shape - Corner radius of the dial container.
 * @cssprop --m3e-timepicker-dial-container-color - Background color of the dial container.
 * @cssprop --m3e-timepicker-dial-inset - Inset offset applied to the dial surface.
 * @cssprop --m3e-timepicker-dial-center-size - Size of the dial center.
 * @cssprop --m3e-timepicker-dial-handle-color - Color of the active handle.
 * @cssprop --m3e-timepicker-dial-handle-size - Size of the handle.
 * @cssprop --m3e-timepicker-dial-handle-disabled-color - Color of a disabled handle.
 * @cssprop --m3e-timepicker-dial-handle-disabled-opacity - Opacity of a disabled handle.
 * @cssprop --m3e-timepicker-dial-dial-inset - Inset applied to the handle area.
 * @cssprop --m3e-timepicker-dial-numeral-size - Size of the dial numerals.
 * @cssprop --m3e-timepicker-dial-numeral-color - Text color of inactive numerals.
 * @cssprop --m3e-timepicker-dial-numeral-shape - Corner radius of the numerals.
 * @cssprop --m3e-timepicker-dial-numeral-font-size - Font size of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-font-weight - Font weight of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-line-height - Line height of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-tracking - Letter spacing of the outer numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-font-size - Font size of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-font-weight - Font weight of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-line-height - Line height of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-tracking - Letter spacing of the inner numerals.
 * @cssprop --m3e-timepicker-dial-numeral-active-color - Color of active numerals.
 * @cssprop --m3e-timepicker-dial-numeral-disabled-color - Color of disabled numerals.
 * @cssprop --m3e-timepicker-dial-numeral-disabled-opacity - Opacity of disabled numerals.
 * @cssprop --m3e-timepicker-dial-handle-center-size - Size of the handle center indicator.
 */
let M3eTimepickerDialElement = class M3eTimepickerDialElement extends SuppressInitialAnimation(AttachInternals(Role(TimepickerInputElementBase, "none"))) {
  constructor() {
    super(...arguments);
    _M3eTimepickerDialElement_instances.add(this);
    /** @private */
    _M3eTimepickerDialElement_dragState.set(this, void 0);
  }
  /** @inheritdoc */
  connectedCallback() {
    this.ariaHidden = "true";
    super.connectedCallback();
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("hour") || _changedProperties.has("minute") || _changedProperties.has("second") || _changedProperties.has("showSeconds") || _changedProperties.has("view") || _changedProperties.has("period") || _changedProperties.has("minTime") || _changedProperties.has("maxTime") || _changedProperties.has("blackoutTimes")) {
      __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_updateHand).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @pointerdown="${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_handlePointerDown)}" @pointermove="${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_handlePointerMove)}" @pointerup="${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_handlePointerUp)}">${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderHandle).call(this)} ${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderHourFace).call(this)} ${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderMinuteFace).call(this)} ${__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderSecondFace).call(this)}<div class="center"></div></div>`;
  }
};
_M3eTimepickerDialElement_dragState = new WeakMap();
_M3eTimepickerDialElement_instances = new WeakSet();
_M3eTimepickerDialElement_renderHandle = function _M3eTimepickerDialElement_renderHandle() {
  return this[this.view] !== null ? html`<div class="handle"></div>` : nothing;
};
_M3eTimepickerDialElement_renderHourFace = function _M3eTimepickerDialElement_renderHourFace() {
  const use24 = this.currentFormat === "24";
  const step = 30;
  const outer = Array.from({
    length: 12
  }, (_, i) => {
    const hour = i === 0 ? 12 : i;
    const angle = i * step;
    const active = this.hour === null ? false : !use24 ? this.hour % 12 === i : this.hour < 13 && this.hour > 0 && this.hour % 12 === i;
    const disabled = this.isHourDisabled(use24 ? hour : this.period === "pm" ? hour % 12 + 12 : hour % 12);
    return __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderNumeral).call(this, `${hour}`, angle, active, disabled);
  });
  const inner = !use24 ? nothing : Array.from({
    length: 12
  }, (_, i) => {
    const hour = i + 13;
    const angle = (i + 1) * step;
    const active = this.hour === 0 && hour === 24 || this.hour === hour;
    const disabled = this.isHourDisabled(hour === 24 ? 0 : hour);
    return __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderNumeral).call(this, hour == 24 ? "00" : `${hour}`, angle, active, disabled, true);
  });
  return html`<div class="${classMap({
    dial: true,
    hour: true,
    hidden: this.view !== "hour"
  })}">${outer}${inner}</div>`;
};
_M3eTimepickerDialElement_renderMinuteFace = function _M3eTimepickerDialElement_renderMinuteFace() {
  return html`<div class="${classMap({
    dial: true,
    minute: true,
    hidden: this.view !== "minute"
  })}">${Array.from({
    length: 60
  }, (_, i) => {
    if (i % 5 !== 0) return;
    const angle = i * 6;
    const label = i % 5 === 0 ? i.toString().padStart(2, "0") : "";
    const active = i === this.minute;
    const disabled = this.hour !== null && this.isMinuteDisabled(this.hour, i);
    return __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderNumeral).call(this, label, angle, active, disabled);
  })}</div>`;
};
_M3eTimepickerDialElement_renderSecondFace = function _M3eTimepickerDialElement_renderSecondFace() {
  if (!this.showSeconds) return nothing;
  return html`<div class="${classMap({
    dial: true,
    second: true,
    hidden: this.view !== "second"
  })}">${Array.from({
    length: 60
  }, (_, i) => {
    if (i % 5 !== 0) return;
    const angle = i * 6;
    const label = i % 5 === 0 ? i.toString().padStart(2, "0") : "";
    const active = i === this.second;
    const disabled = this.hour !== null && this.minute !== null && this.isSecondDisabled(this.hour, this.minute, i);
    return __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_renderNumeral).call(this, label, angle, active, disabled);
  })}</div>`;
};
_M3eTimepickerDialElement_renderNumeral = function _M3eTimepickerDialElement_renderNumeral(label, angle, active, disabled, inner = false) {
  return html`<div class="${classMap({
    numeral: true,
    inner,
    active,
    disabled
  })}" style="${safeStyleMap({
    "--_numeral-angle": `${angle}deg`
  })}">${label}</div>`;
};
_M3eTimepickerDialElement_updateHand = function _M3eTimepickerDialElement_updateHand() {
  const hand = this.shadowRoot?.querySelector(".handle");
  const center = this.shadowRoot?.querySelector(".center");
  if (!hand || !center) return;
  let active = false;
  let inner = false;
  let angle = null;
  let disabled = false;
  switch (this.view) {
    case "hour":
      if (this.hour !== null) {
        active = true;
        angle = this.hour % 12 * 30;
        inner = this.currentFormat === "24" && (this.hour < 1 || this.hour > 12);
        disabled = this.isHourDisabled(this.hour);
      }
      break;
    case "minute":
      if (this.minute !== null) {
        angle = this.minute * 6;
        active = this.minute % 5 === 0;
        disabled = this.hour !== null && this.isMinuteDisabled(this.hour, this.minute);
      }
      break;
    case "second":
      if (this.second !== null) {
        angle = this.second * 6;
        active = this.second % 5 === 0;
        disabled = this.hour !== null && this.minute !== null && this.isSecondDisabled(this.hour, this.minute, this.second);
      }
      break;
  }
  hand.classList.toggle("active", active);
  hand.classList.toggle("inner", inner);
  hand.classList.toggle("disabled", disabled);
  center.classList.toggle("disabled", disabled);
  if (angle != null) {
    hand.style.setProperty("--_hand-angle", `${angle}`);
  } else {
    hand.style.removeProperty("--_hand-angle");
  }
};
_M3eTimepickerDialElement_handlePointerDown = function _M3eTimepickerDialElement_handlePointerDown(e) {
  if (e.pointerType === "mouse" && e.button > 1 || !(e.currentTarget instanceof HTMLElement)) return;
  e.currentTarget.setPointerCapture(e.pointerId);
  e.currentTarget.classList.add("dragging");
  __classPrivateFieldSet(this, _M3eTimepickerDialElement_dragState, {
    timeChanged: false,
    cachedRect: e.currentTarget.getBoundingClientRect(),
    cachedInnerInset: this.view === "hour" && this.currentFormat === "24" ? computeCssSize(e.currentTarget, "calc(var(--m3e-timepicker-dial-numeral-size, 40px) + var(--m3e-timepicker-dial-inset, 4px))") : 0
  }, "f");
  __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged = this.view === "hour" ? __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_changeHour).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_hourFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_isPointerInsideInnerRing).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")))) : this.view === "minute" ? __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_changeMinute).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_minuteOrSecondFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), this.minute === null)) : __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_changeSecond).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_minuteOrSecondFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), this.second === null));
  if (__classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged) {
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
  }
};
_M3eTimepickerDialElement_handlePointerMove = function _M3eTimepickerDialElement_handlePointerMove(e) {
  if (!(e.currentTarget instanceof HTMLElement) || !e.currentTarget.hasPointerCapture(e.pointerId) || !__classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")) {
    return;
  }
  const changed = this.view === "hour" ? __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_changeHour).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_hourFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_isPointerInsideInnerRing).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")))) : this.view === "minute" ? __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_changeMinute).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_minuteOrSecondFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), false)) : __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_changeSecond).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_minuteOrSecondFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), false));
  __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged = changed || __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged;
  if (changed) {
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
  }
};
_M3eTimepickerDialElement_handlePointerUp = function _M3eTimepickerDialElement_handlePointerUp(e) {
  if (!(e.currentTarget instanceof HTMLElement) || !e.currentTarget.hasPointerCapture(e.pointerId) || !__classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")) return;
  e.currentTarget.releasePointerCapture(e.pointerId);
  e.currentTarget.classList.remove("dragging");
  if (__classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged) {
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  if (this.view === "hour" && (__classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged || !this.isHourDisabled(__classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_hourFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_isPointerInsideInnerRing).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")))))) {
    this.view = "minute";
    this.dispatchEvent(new CustomEvent("view-change"));
  } else if (this.view === "minute" && this.showSeconds && (__classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f").timeChanged || this.hour === null || !this.isMinuteDisabled(this.hour, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_hourFromAngle).call(this, __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_angleFromPointer).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")), __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_isPointerInsideInnerRing).call(this, e, __classPrivateFieldGet(this, _M3eTimepickerDialElement_dragState, "f")))))) {
    this.view = "second";
    this.dispatchEvent(new CustomEvent("view-change"));
  }
  __classPrivateFieldSet(this, _M3eTimepickerDialElement_dragState, undefined, "f");
};
_M3eTimepickerDialElement_angleFromPointer = function _M3eTimepickerDialElement_angleFromPointer(e, state) {
  const cx = state.cachedRect.left + state.cachedRect.width / 2;
  const cy = state.cachedRect.top + state.cachedRect.height / 2;
  return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 450) % 360;
};
_M3eTimepickerDialElement_radiusFromPointer = function _M3eTimepickerDialElement_radiusFromPointer(e, state) {
  const cx = state.cachedRect.left + state.cachedRect.width / 2;
  const cy = state.cachedRect.top + state.cachedRect.height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  return Math.sqrt(dx * dx + dy * dy);
};
_M3eTimepickerDialElement_isPointerInsideInnerRing = function _M3eTimepickerDialElement_isPointerInsideInnerRing(e, state) {
  if (state.cachedInnerInset <= 0) return false;
  return __classPrivateFieldGet(this, _M3eTimepickerDialElement_instances, "m", _M3eTimepickerDialElement_radiusFromPointer).call(this, e, state) < state.cachedRect.width / 2 - state.cachedInnerInset;
};
_M3eTimepickerDialElement_hourFromAngle = function _M3eTimepickerDialElement_hourFromAngle(angle, inner) {
  const index = Math.round(angle / 30) % 12;
  const hour = inner ? index === 0 ? 0 : index + 12 : index === 0 ? 12 : index;
  return this.currentFormat === "24" ? hour : this.period === "pm" ? hour % 12 + 12 : hour % 12;
};
_M3eTimepickerDialElement_minuteOrSecondFromAngle = function _M3eTimepickerDialElement_minuteOrSecondFromAngle(angle, snap) {
  return snap ? Math.round(angle / 30) * 5 % 60 // 5-minute ticks
  : Math.round(angle / 6) % 60; // 1-minute resolution
};
_M3eTimepickerDialElement_changeHour = function _M3eTimepickerDialElement_changeHour(value) {
  if (this.hour !== value && !this.isHourDisabled(value)) {
    this.hour = value;
    return true;
  }
  return false;
};
_M3eTimepickerDialElement_changeMinute = function _M3eTimepickerDialElement_changeMinute(value) {
  if (this.hour !== null && this.isMinuteDisabled(this.hour, value)) return false;
  if (this.minute !== value) {
    this.minute = value;
    return true;
  }
  return false;
};
_M3eTimepickerDialElement_changeSecond = function _M3eTimepickerDialElement_changeSecond(value) {
  if (this.hour !== null && this.minute !== null && this.isSecondDisabled(this.hour, this.minute, value)) return false;
  if (this.second !== value) {
    this.second = value;
    return true;
  }
  return false;
};
/** The styles of the element. */
M3eTimepickerDialElement.styles = css`:host { display: block; width: var(--m3e-timepicker-dial-container-size, 256px); aspect-ratio: 1 / 1; } :host([hidden]) { display: none; } .base { contain: layout style paint; position: relative; width: 100%; height: 100%; touch-action: none; border-radius: var(--m3e-timepicker-dial-container-shape, ${DesignToken.shape.corner.full}); background-color: var(--m3e-timepicker-dial-container-color, ${DesignToken.color.surfaceContainerHighest}); } .base:not(.dragging) { cursor: grab; } .base.dragging { cursor: grabbing; } .dial { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: inherit; pointer-events: none; border-radius: inherit; --_numeral-radius: calc( calc(var(--m3e-timepicker-dial-container-size, 256px) / 2) - calc( var(--m3e-timepicker-dial-numeral-size, 40px) / 2 ) - var(--m3e-timepicker-dial-inset, 4px) ); } :host(:not(:is(:state(--no-animate), :--no-animate))) .dial { transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.medium1} ${DesignToken.motion.easing.standard},
        transform ${DesignToken.motion.duration.medium1} ${DesignToken.motion.easing.standard}`)}; } .dial:not(.hidden) { opacity: 1; transform: scale(1); } .dial.hidden { opacity: 0; } .dial.hour.hidden { transform: scale(1.2); } .dial.minute.hidden { transform: scale(0.8); } .dial.second.hidden { transform: scale(1.2); } .center { position: absolute; box-sizing: border-box; bottom: calc(50% - calc(var(--m3e-timepicker-dial-center-size, 8px) / 2)); left: calc(50% - calc(var(--m3e-timepicker-dial-center-size, 8px) / 2)); width: var(--m3e-timepicker-dial-center-size, 8px); height: var(--m3e-timepicker-dial-center-size, 8px); touch-action: inherit; pointer-events: none; border-radius: 50%; } .center::before, .center::after { content: ""; position: absolute; inset: 0; width: 100%; height: 100%; border-radius: inherit; } .center::before { background-color: var(--m3e-timepicker-dial-container-color, ${DesignToken.color.surfaceContainerHighest}); } .center:not(.disabled)::after { background-color: var(--m3e-timepicker-dial-handle-color, ${DesignToken.color.primary}); } .center.disabled::after { background-color: color-mix( in srgb, var(--m3e-timepicker-dial-handle-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-timepicker-dial-handle-disabled-opacity, 10%), transparent ); } .handle { position: absolute; touch-action: inherit; user-select: none; left: calc(50% - calc(var(--m3e-timepicker-dial-handle-size, 2px) / 2)); width: var(--m3e-timepicker-dial-handle-size, 2px); transform: rotate(calc(var(--_hand-angle, 0) * 1deg)); transform-origin: bottom; } .handle:not(.disabled) { background-color: var(--m3e-timepicker-dial-handle-color, ${DesignToken.color.primary}); } .handle.disabled { background-color: color-mix( in srgb, var(--m3e-timepicker-dial-handle-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-timepicker-dial-handle-disabled-opacity, 10%), transparent ); } :host(:not(:is(:state(--no-animate), :--no-animate))) .base:not(.dragging) .handle { transition: ${unsafeCSS(`transform ${DesignToken.motion.duration.medium1} ${DesignToken.motion.easing.standard}`)}; } .handle:not(.inner) { top: calc(var(--m3e-timepicker-dial-dial-inset, 4px) + var(--m3e-timepicker-dial-numeral-size, 40px)); height: calc(50% - var(--m3e-timepicker-dial-dial-inset, 4px) - var(--m3e-timepicker-dial-numeral-size, 40px)); } .handle.inner { top: calc( var(--m3e-timepicker-dial-numeral-size, 40px) + var(--m3e-timepicker-dial-dial-inset, 4px) + var(--m3e-timepicker-dial-numeral-size, 40px) ); height: calc( 50% - calc( var(--m3e-timepicker-dial-numeral-size, 40px) + var(--m3e-timepicker-dial-dial-inset, 4px) + var(--m3e-timepicker-dial-numeral-size, 40px) ) ); } .handle::before { content: ""; position: absolute; touch-action: inherit; width: var(--m3e-timepicker-dial-numeral-size, 40px); height: var(--m3e-timepicker-dial-numeral-size, 40px); top: calc(0px - var(--m3e-timepicker-dial-numeral-size, 40px)); left: calc( 0px - calc(var(--m3e-timepicker-dial-numeral-size, 40px) / 2) + calc(var(--m3e-timepicker-dial-handle-size, 2px) / 2) ); border-radius: 50%; box-sizing: border-box; } .handle:not(.disabled)::before { background-color: var(--m3e-timepicker-dial-handle-color, ${DesignToken.color.primary}); } .handle.disabled::before { background-color: color-mix( in srgb, var(--m3e-timepicker-dial-handle-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-timepicker-dial-handle-disabled-opacity, 10%), transparent ); } .handle:not(.active)::after { content: ""; position: absolute; touch-action: inherit; width: var(--m3e-timepicker-dial-handle-center-size, 4px); height: var(--m3e-timepicker-dial-handle-center-size, 4px); top: calc( 0px - calc(var(--m3e-timepicker-dial-numeral-size, 40px) / 2) - calc( var(--m3e-timepicker-dial-handle-center-size, 4px) / 2 ) ); left: calc(50% - calc(var(--m3e-timepicker-dial-handle-center-size, 4px) / 2)); border-radius: 50%; box-sizing: border-box; } .handle:not(.active):not(.disabled)::after { background-color: var(--m3e-timepicker-dial-numeral-active-color, ${DesignToken.color.onPrimary}); } .handle:not(.active).disabled::after { background-color: color-mix( in srgb, var(--m3e-timepicker-dial-numeral-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-timepicker-dial-numeral-disabled-opacity, 38%), transparent ); } .numeral { user-select: none; pointer-events: none; touch-action: inherit; position: absolute; inset: 50%; translate: -50% -50%; width: var(--m3e-timepicker-dial-numeral-size, 40px); aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; border-radius: var(--m3e-timepicker-dial-numeral-shape, ${DesignToken.shape.corner.full}); } :host(:not(:is(:state(--no-animate), :--no-animate))) .numeral.active { transition-delay: ${DesignToken.motion.duration.medium1}; transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short1} ${DesignToken.motion.easing.standard}`)}; } .numeral:not(.active):not(.disabled) { color: var(--m3e-timepicker-dial-numeral-color, ${DesignToken.color.onSurface}); } .numeral.active:not(.disabled) { color: var(--m3e-timepicker-dial-numeral-active-color, ${DesignToken.color.onPrimary}); } .numeral.disabled { color: color-mix( in srgb, var(--m3e-timepicker-dial-numeral-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-timepicker-dial-numeral-disabled-opacity, 38%), transparent ); } .numeral:not(.inner) { transform: rotate(var(--_numeral-angle)) translateY(calc(-1 * var(--_numeral-radius))) rotate(calc(-1 * var(--_numeral-angle))); font-size: var(--m3e-timepicker-dial-numeral-font-size, ${DesignToken.typescale.standard.body.large.fontSize}); font-weight: var( --m3e-timepicker-dial-numeral-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight} ); line-height: var( --m3e-timepicker-dial-numeral-line-height, ${DesignToken.typescale.standard.body.large.lineHeight} ); letter-spacing: var( --m3e-timepicker-dial-numeral-tracking, ${DesignToken.typescale.standard.body.large.tracking} ); } .numeral.inner { transform: rotate(var(--_numeral-angle)) translateY(calc(calc(-1 * var(--_numeral-radius)) + var(--m3e-timepicker-dial-numeral-size, 40px))) rotate(calc(-1 * var(--_numeral-angle))); font-size: var( --m3e-timepicker-dial-inner-numeral-font-size, ${DesignToken.typescale.standard.body.small.fontSize} ); font-weight: var( --m3e-timepicker-dial-inner-numeral-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight} ); line-height: var( --m3e-timepicker-dial-inner-numeral-line-height, ${DesignToken.typescale.standard.body.small.lineHeight} ); letter-spacing: var( --m3e-timepicker-dial-inner-numeral-tracking, ${DesignToken.typescale.standard.body.small.tracking} ); } @media (forced-colors: active) { .base, .center::before { background-color: Canvas; } .numeral:not(.active):not(.disabled) { color: CanvasText; } .center:not(.disabled)::after, .handle:not(.disabled) { background-color: Highlight; } .handle:not(.disabled)::before { background-color: unset; outline: var(--m3e-timepicker-dial-handle-size, 2px) solid Highlight; } .handle:not(.active):not(.disabled)::after { background-color: Highlight; } .numeral.active:not(.disabled) { color: Highlight; } .center.disabled::after, .handle:not(.active).disabled::after, .handle.disabled { background-color: GrayText; } .handle.disabled::before { background-color: unset; outline: var(--m3e-timepicker-dial-handle-size, 2px) solid GrayText; } .numeral.disabled:not(.active), .numeral.disabled.active { color: GrayText; } .numeral { forced-color-adjust: none; background-color: transparent; } .base { outline: 1px solid CanvasText; } } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))) .dial, :host(:not(:is(:state(--no-animate), :--no-animate))) .base:not(.dragging) .handle, :host(:not(:is(:state(--no-animate), :--no-animate))) .numeral.active { transition: none; } }`;
M3eTimepickerDialElement = __decorate([customElement("m3e-timepicker-dial")], M3eTimepickerDialElement);

/**
 * Determines whether a value is a `TimepickerVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TimepickerVariant`.
 */
function isTimepickerVariant(value) {
  return value === "docked" || value === "modal" || value === "auto";
}

/**
 * Determines whether a value is a `TimepickerMode`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TimepickerMode`.
 */
function isTimepickerMode(value) {
  return value === "dial" || value === "input";
}

/**
 * Determines whether a value is a `TimepickerOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `TimepickerOrientation`.
 */
function isTimepickerOrientation(value) {
  return value === "horizontal" || value === "vertical" || value === "auto";
}

var _M3eTimepickerInputPeriodToggleElement_instances, _M3eTimepickerInputPeriodToggleElement_handleKeyDown, _M3eTimepickerInputPeriodToggleElement_handleClick;
/** @internal An internal element responsible for selecting a time period (AM/PM). */
let M3eTimepickerInputPeriodToggleElement = class M3eTimepickerInputPeriodToggleElement extends Role(LitElement, "radiogroup") {
  constructor() {
    super(...arguments);
    _M3eTimepickerInputPeriodToggleElement_instances.add(this);
    /** The 12-hour time period. */
    this.period = "am";
    /** The orientation of the toggle. */
    this.orientation = "vertical";
  }
  /** @inheritdoc */
  render() {
    const format = new Intl.DateTimeFormat(navigator.language, {
      hour: "numeric",
      hour12: true
    });
    return html`<div class="base" tabindex="-1" @keydown="${__classPrivateFieldGet(this, _M3eTimepickerInputPeriodToggleElement_instances, "m", _M3eTimepickerInputPeriodToggleElement_handleKeyDown)}"><div id="am" class="period-button" role="radio" aria-checked="${this.period === "am" ? "true" : "false"}" tabindex="${this.period === "am" ? "0" : "-1"}" @click="${__classPrivateFieldGet(this, _M3eTimepickerInputPeriodToggleElement_instances, "m", _M3eTimepickerInputPeriodToggleElement_handleClick)}"><m3e-focus-ring class="focus-ring" for="am"></m3e-focus-ring><m3e-state-layer class="state-layer" for="am"></m3e-state-layer><m3e-ripple class="ripple" for="am"></m3e-ripple>${format.formatToParts(new Date(2020, 0, 1, 9)).find(p => p.type === "dayPeriod")?.value ?? "AM"}</div><div class="divider" aria-hidden="true"></div><div id="pm" class="period-button" role="radio" aria-checked="${this.period === "pm" ? "true" : "false"}" tabindex="${this.period === "pm" ? "0" : "-1"}" @click="${__classPrivateFieldGet(this, _M3eTimepickerInputPeriodToggleElement_instances, "m", _M3eTimepickerInputPeriodToggleElement_handleClick)}"><m3e-focus-ring class="focus-ring" for="pm"></m3e-focus-ring><m3e-state-layer class="state-layer" for="pm"></m3e-state-layer><m3e-ripple class="ripple" for="pm"></m3e-ripple>${format.formatToParts(new Date(2020, 0, 1, 21)).find(p => p.type === "dayPeriod")?.value ?? "PM"}</div></div>`;
  }
};
_M3eTimepickerInputPeriodToggleElement_instances = new WeakSet();
_M3eTimepickerInputPeriodToggleElement_handleKeyDown = function _M3eTimepickerInputPeriodToggleElement_handleKeyDown(e) {
  if (e.defaultPrevented) return;
  const changePeriod = (prev, next) => {
    if (this.period === prev) {
      this.period = next;
      this.shadowRoot?.querySelector(`#${this.period}`)?.focus();
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  };
  switch (e.key) {
    case "Left":
    case "ArrowLeft":
      e.preventDefault();
      if (this.orientation === "horizontal") {
        if (M3eDirectionality.current === "rtl") {
          changePeriod("am", "pm");
        } else {
          changePeriod("pm", "am");
        }
      }
      break;
    case "Right":
    case "ArrowRight":
      e.preventDefault();
      if (this.orientation === "horizontal") {
        if (M3eDirectionality.current === "rtl") {
          changePeriod("pm", "am");
        } else {
          changePeriod("am", "pm");
        }
      }
      break;
    case "Up":
    case "ArrowUp":
      e.preventDefault();
      if (this.orientation === "vertical") {
        changePeriod("pm", "am");
      }
      break;
    case "Down":
    case "ArrowDown":
      e.preventDefault();
      if (this.orientation === "vertical") {
        changePeriod("am", "pm");
      }
      break;
  }
};
_M3eTimepickerInputPeriodToggleElement_handleClick = function _M3eTimepickerInputPeriodToggleElement_handleClick(e) {
  const period = e.currentTarget.id;
  if (period !== this.period) {
    this.period = period;
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
/** The styles of the element. */
M3eTimepickerInputPeriodToggleElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .base { contain: layout style; display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%; height: 100%; border-radius: var(--m3e-timepicker-input-period-toggle-shape, ${DesignToken.shape.corner.small}); border: var(--m3e-timepicker-input-period-toggle-outline-thickness, 1px) solid var(--m3e-timepicker-input-period-toggle-outline-color, ${DesignToken.color.outline}); } :host([orientation="vertical"]) { height: var(--m3e-timepicker-input-period-toggle-vertical-height, 80px); width: var(--m3e-timepicker-input-period-toggle-vertical-width, 52px); } :host([orientation="vertical"]) .base { flex-direction: column; } :host([orientation="horizontal"]) { height: var(--m3e-timepicker-input-period-toggle-horizontal-height, 38px); width: var(--m3e-timepicker-input-period-toggle-horizontal-width, 216px); } .period-button { display: flex; align-items: center; justify-content: center; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: pointer; position: relative; transition: ${unsafeCSS(`background-color color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
        color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; font-size: var( --m3e-timepicker-input-period-toggle-label-font-size, ${DesignToken.typescale.standard.title.medium.fontSize} ); font-weight: var( --m3e-timepicker-input-period-toggle-label-font-weight, ${DesignToken.typescale.standard.title.medium.fontWeight} ); line-height: var( --m3e-timepicker-input-period-toggle-label-line-height, ${DesignToken.typescale.standard.title.medium.lineHeight} ); letter-spacing: var( --m3e-timepicker-input-period-toggle-label-tracking, ${DesignToken.typescale.standard.title.medium.tracking} ); } :host([orientation="vertical"]) .period-button { height: 50%; width: 100%; } :host([orientation="horizontal"]) .period-button { height: 100%; width: 50%; } :host([orientation="vertical"]) .period-button:first-child { border-start-start-radius: inherit; border-start-end-radius: inherit; } :host([orientation="horizontal"]) .period-button:first-child { border-start-start-radius: inherit; border-end-start-radius: inherit; } .divider { flex: none; } :host([orientation="vertical"]) .divider { width: 100%; border-bottom: var(--m3e-timepicker-input-period-toggle-outline-thickness, 1px) solid var(--m3e-timepicker-input-period-toggle-outline-color, ${DesignToken.color.outline}); } :host([orientation="horizontal"]) .divider { height: 100%; border-inline-end: var(--m3e-timepicker-input-period-toggle-outline-thickness, 1px) solid var(--m3e-timepicker-input-period-toggle-outline-color, ${DesignToken.color.outline}); } :host([orientation="vertical"]) .period-button:last-child { border-end-start-radius: inherit; border-end-end-radius: inherit; } :host([orientation="horizontal"]) .period-button:last-child { border-start-end-radius: inherit; border-end-end-radius: inherit; } .period-button[aria-checked="true"] { background-color: var( --m3e-timepicker-input-period-toggle-selected-container-color, ${DesignToken.color.tertiaryContainer} ); color: var(--m3e-timepicker-input-period-toggle-selected-label-color, ${DesignToken.color.onTertiaryContainer}); --m3e-state-layer-hover-color: var( --m3e-timepicker-input-period-toggle-selected-hover-state-layer-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-timepicker-input-period-toggle-selected-focus-state-layer-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-ripple-color: var( --m3e-timepicker-input-period-toggle-selected-pressed-state-layer-color, ${DesignToken.color.onTertiaryContainer} ); } .period-button[aria-checked="false"] { color: var(--m3e-timepicker-input-period-toggle-unselected-label-color, ${DesignToken.color.onSurfaceVariant}); --m3e-state-layer-hover-color: var( --m3e-timepicker-input-period-toggle-unselected-hover-state-layer-color, ${DesignToken.color.onSurfaceVariant} ); --m3e-state-layer-focus-color: var( --m3e-timepicker-input-period-toggle-unselected-focus-state-layer-color, ${DesignToken.color.onSurfaceVariant} ); --m3e-ripple-color: var( --m3e-timepicker-input-period-toggle-unselected-pressed-state-layer-color, ${DesignToken.color.onSurfaceVariant} ); }`;
__decorate([property()], M3eTimepickerInputPeriodToggleElement.prototype, "period", void 0);
__decorate([property({
  reflect: true
})], M3eTimepickerInputPeriodToggleElement.prototype, "orientation", void 0);
M3eTimepickerInputPeriodToggleElement = __decorate([customElement("m3e-timepicker-input-period-toggle")], M3eTimepickerInputPeriodToggleElement);

var _M3eTimepickerInputElement_instances, _M3eTimepickerInputElement_clockChangeHandler, _M3eTimepickerInputElement_clockInputHandler, _M3eTimepickerInputElement_clockViewChangeHandler, _M3eTimepickerInputElement_applyOrientation, _M3eTimepickerInputElement_syncControl, _M3eTimepickerInputElement_renderField, _M3eTimepickerInputElement_handleFieldFocus, _M3eTimepickerInputElement_handleFieldKeyDown, _M3eTimepickerInputElement_handleFieldWheel, _M3eTimepickerInputElement_handleFieldInput, _M3eTimepickerInputElement_increment, _M3eTimepickerInputElement_handlePeriodChange, _M3eTimepickerInputElement_handleClockInput, _M3eTimepickerInputElement_handleClockChange, _M3eTimepickerInputElement_handleClockViewChange, _M3eTimepickerInputElement_isDisabled;
/**
 * A keyboard‑based time surface for choosing hours and minutes.
 * @description
 * The `m3e-timepicker-input` component provides a keyboard-focused time
 * entry surface, allowing users to type or navigate hour and minute fields,
 * toggle AM/PM, and receive accessible validation feedback.
 *
 * @tag m3e-timepicker-input
 *
 * @attr format - Whether to use a 12‑hour or 24‑hour clock.
 * @attr hide-labels - Whether to hide field labels.
 * @attr hour - The hour, in 24-hour time, from 0..23.
 * @attr max-time - The maximum time that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr minute - The minute, from 0..59.
 * @attr second - The second, from 0..59.
 * @attr show-seconds - Whether to show seconds.
 * @attr orientation - The orientation of the input.
 * @attr period - The 12-hour time period.
 * @attr view - The view used to input time.
 * @attr hour-label - The label for the hour field.
 * @attr minute-label - The label for the minute field.
 * @attr second-label - The label for the second field.
 * @attr period-toggle-label - The accessible label given to the period toggle.
 *
 * @fires change - Dispatched when the selected time changes.
 * @fires view-change - Dispatched when the view changes.
 *
 * @cssprop --m3e-timepicker-input-field-container-width - Width of the input field container.
 * @cssprop --m3e-timepicker-input-field-height - Height of the input fields.
 * @cssprop --m3e-timepicker-input-field-container-shape - Corner radius of the input field container.
 * @cssprop --m3e-timepicker-input-field-font-size - Font size of the input field text.
 * @cssprop --m3e-timepicker-input-field-font-weight - Font weight of the input field text.
 * @cssprop --m3e-timepicker-input-field-line-height - Line height of the input field text.
 * @cssprop --m3e-timepicker-input-field-tracking - Letter spacing of the input field text.
 * @cssprop --m3e-timepicker-input-field-label-unselected-color - Text color of unselected input field labels.
 * @cssprop --m3e-timepicker-input-field-unselected-container-color - Background color of unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-hover-state-layer-color - State layer color on hover for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-focus-state-layer-color - State layer color on focus for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-pressed-state-layer-color - State layer color on pressed for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-label-selected-color - Text color of selected input field labels.
 * @cssprop --m3e-timepicker-input-field-selected-container-color - Background color of selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-hover-state-layer-color - State layer color on hover for selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-focus-state-layer-color - State layer color on focus for selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-pressed-state-layer-color - State layer color on pressed for selected input fields.
 * @cssprop --m3e-timepicker-input-field-label-invalid-color - Text color of invalid input field labels.
 * @cssprop --m3e-timepicker-input-field-invalid-container-color - Background color of invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-hover-state-layer-color - State layer color on hover for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-focus-state-layer-color - State layer color on focus for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-pressed-state-layer-color - State layer color on pressed for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-supporting-text-color - Text color of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-font-size - Font size of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-font-weight - Font weight of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-line-height - Line height of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-tracking - Letter spacing of supporting labels.
 * @cssprop --m3e-timepicker-input-field-separator-width - Width of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-color - Color of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-font-size - Font size of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-font-weight - Font weight of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-tracking - Letter spacing of the field separator.
 * @cssprop --m3e-timepicker-input-horizontal-period-toggle-space - Space between the fields and period toggle in horizontal orientation.
 * @cssprop --m3e-timepicker-input-vertical-period-toggle-space - Space between the fields and period toggle in vertical orientation.
 */
let M3eTimepickerInputElement = class M3eTimepickerInputElement extends HtmlFor(TimepickerInputElementBase) {
  constructor() {
    super(...arguments);
    _M3eTimepickerInputElement_instances.add(this);
    /** @private */
    _M3eTimepickerInputElement_clockChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleClockChange).call(this));
    /** @private */
    _M3eTimepickerInputElement_clockInputHandler.set(this, () => __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleClockInput).call(this));
    /** @private */
    _M3eTimepickerInputElement_clockViewChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleClockViewChange).call(this));
    /**
     * The orientation of the input.
     * @default "horizontal"
     */
    this.orientation = "horizontal";
    /**
     * Whether to hide field labels.
     * @default false
     */
    this.hideLabels = false;
    /**
     * The label for the hour field.
     * @default "Hour"
     */
    this.hourLabel = "Hour";
    /**
     * The label for the minute field.
     * @default "Minute"
     */
    this.minuteLabel = "Minute";
    /**
     * The label for the second field.
     * @default "Second"
     */
    this.secondLabel = "Second";
    /**
     * The accessible label given to the period toggle.
     * @default "AM or PM"
     */
    this.periodToggleLabel = "AM or PM";
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    if (this.control instanceof M3eTimepickerDialElement) {
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_syncControl).call(this);
      this.control.addEventListener("change", __classPrivateFieldGet(this, _M3eTimepickerInputElement_clockChangeHandler, "f"));
      this.control.addEventListener("input", __classPrivateFieldGet(this, _M3eTimepickerInputElement_clockInputHandler, "f"));
      this.control.addEventListener("view-change", __classPrivateFieldGet(this, _M3eTimepickerInputElement_clockViewChangeHandler, "f"));
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.control instanceof M3eTimepickerDialElement) {
      this.control.removeEventListener("change", __classPrivateFieldGet(this, _M3eTimepickerInputElement_clockChangeHandler, "f"));
      this.control.removeEventListener("input", __classPrivateFieldGet(this, _M3eTimepickerInputElement_clockInputHandler, "f"));
      this.control.removeEventListener("view-change", __classPrivateFieldGet(this, _M3eTimepickerInputElement_clockViewChangeHandler, "f"));
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_applyOrientation).call(this);
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_applyOrientation).call(this);
    }
    if (_changedProperties.has("hour") || _changedProperties.has("minute") || _changedProperties.has("second") || _changedProperties.has("showSeconds") || _changedProperties.has("view") || _changedProperties.has("period") || _changedProperties.has("format") || _changedProperties.has("minTime") || _changedProperties.has("maxTime") || _changedProperties.has("blackoutTimes")) {
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_syncControl).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base">${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_renderField).call(this, "hour")}<div class="field-separator">:</div>${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_renderField).call(this, "minute")} ${this.showSeconds ? html`<div class="field-separator">:</div>${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_renderField).call(this, "second")}` : nothing} ${this.currentFormat === "12" && this.orientation === "horizontal" ? html`<m3e-timepicker-input-period-toggle class="period-toggle" period="${this.period}" orientation="vertical" aria-label="${this.periodToggleLabel}" @change="${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handlePeriodChange)}"></m3e-timepicker-input-period-toggle>` : nothing}</div>${this.currentFormat === "12" && this.orientation === "vertical" ? html`<m3e-timepicker-input-period-toggle class="period-toggle" period="${this.period}" orientation="horizontal" @change="${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handlePeriodChange)}"></m3e-timepicker-input-period-toggle>` : nothing}`;
  }
};
_M3eTimepickerInputElement_clockChangeHandler = new WeakMap();
_M3eTimepickerInputElement_clockInputHandler = new WeakMap();
_M3eTimepickerInputElement_clockViewChangeHandler = new WeakMap();
_M3eTimepickerInputElement_instances = new WeakSet();
_M3eTimepickerInputElement_applyOrientation = function _M3eTimepickerInputElement_applyOrientation() {
  if (this.orientation !== "horizontal" && this.orientation !== "vertical") {
    this.orientation = "horizontal";
  }
  setCustomState(this, "--horizontal", this.orientation === "horizontal");
  setCustomState(this, "--vertical", this.orientation === "vertical");
};
_M3eTimepickerInputElement_syncControl = function _M3eTimepickerInputElement_syncControl() {
  if (this.control instanceof M3eTimepickerDialElement) {
    this.control.view = this.view;
    this.control.format = this.currentFormat;
    this.control.hour = this.hour;
    this.control.minute = this.minute;
    this.control.second = this.second;
    this.control.showSeconds = this.showSeconds;
    this.control.minTime = this.minTime;
    this.control.maxTime = this.maxTime;
    this.control.blackoutTimes = this.blackoutTimes;
    this.control.period = this.period;
  }
};
_M3eTimepickerInputElement_renderField = function _M3eTimepickerInputElement_renderField(view) {
  const pad = n => n === null ? "" : n < 10 ? "0" + n : String(n);
  const label = view === "hour" ? this.hourLabel : view === "minute" ? this.minuteLabel : this.secondLabel;
  const invalid = __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_isDisabled).call(this, this[view], view);
  let valueText;
  if (this[view] !== null) {
    const date = new Date();
    date.setHours(this.hour ?? 0, this.minute ?? 0, 0, 0);
    valueText = new Intl.DateTimeFormat(navigator.language, view === "hour" ? {
      hour: "numeric",
      hour12: this.currentFormat === "12"
    } : view === "minute" ? {
      minute: "2-digit"
    } : {
      second: "2-digit"
    }).format(date);
  }
  return html`<div class="field-wrapper"><input id="${view}" class="${classMap({
    field: true,
    selected: this.view === view,
    invalid
  })}" role="spinbutton" placeholder="––" inputmode="numeric" autocomplete="off" aria-label="${label}" aria-valuemin="0" aria-valuemax="${view === "hour" ? 23 : 59}" aria-valuenow="${ifDefined(valueText ? pad(this[view]) : undefined)}" aria-valuetext="${ifDefined(valueText)}" @focus="${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleFieldFocus)}" @keydown="${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleFieldKeyDown)}" @input="${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleFieldInput)}" @wheel="${__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_handleFieldWheel)}" .value="${pad(view === "hour" ? this.currentFormat === "12" ? this.hourOfPeriod : this.hour : view === "minute" ? this.minute : this.second)}"><m3e-collapsible aria-hidden="true" ?open="${!this.hideLabels}"><span class="label">${label}</span></m3e-collapsible><m3e-focus-ring class="focus-ring" for="${view}"></m3e-focus-ring><m3e-ripple class="ripple" for="${view}"></m3e-ripple></div>`;
};
_M3eTimepickerInputElement_handleFieldFocus = function _M3eTimepickerInputElement_handleFieldFocus(e) {
  const input = e.target;
  const view = input.id;
  if (this.view !== view) {
    this.view = view;
    this.dispatchEvent(new CustomEvent("view-change"));
  }
};
_M3eTimepickerInputElement_handleFieldKeyDown = function _M3eTimepickerInputElement_handleFieldKeyDown(e) {
  const input = e.target;
  const view = input.id;
  switch (e.key) {
    case "Up":
    case "ArrowUp":
      e.preventDefault();
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_increment).call(this, view, 1, true);
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return;
    case "PageUp":
      e.preventDefault();
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_increment).call(this, view, view === "hour" ? 1 : 5);
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return;
    case "Down":
    case "ArrowDown":
      e.preventDefault();
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_increment).call(this, view, -1, true);
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return;
    case "PageDown":
      e.preventDefault();
      __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_increment).call(this, view, view === "hour" ? -1 : -5);
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return;
    case "Backspace":
    case "Delete":
      e.preventDefault();
      this[view] = null;
      input.value = "";
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      break;
    case "Tab":
    case "ArrowLeft":
    case "Left":
    case "ArrowRight":
    case "Right":
      return;
  }
  if (e.ctrlKey || e.metaKey) {
    return;
  }
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};
_M3eTimepickerInputElement_handleFieldWheel = function _M3eTimepickerInputElement_handleFieldWheel(e) {
  const input = e.target;
  const view = input.id;
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  if (delta > 0) {
    __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_increment).call(this, view, -1, true);
  } else if (delta < 0) {
    __classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_increment).call(this, view, 1, true);
  }
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eTimepickerInputElement_handleFieldInput = function _M3eTimepickerInputElement_handleFieldInput(e) {
  if (e.isComposing) return;
  const input = e.target;
  const view = input.id;
  const raw = input.value.replace(/\D/g, "");
  if (raw.length === 0) {
    this[view] = null;
    input.value = "";
    this.requestUpdate();
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
    return;
  }
  const isValid = v => view === "hour" ? this.currentFormat === "12" ? v >= 1 && v <= 12 : v >= 0 && v <= 23 : v >= 0 && v <= 59;
  const cursor = input.selectionStart ?? input.value.length;
  const atEnd = cursor === input.value.length;
  // Typed digit (only valid for insertText)
  const typedDigit = typeof e.data === "string" && /^\d$/.test(e.data) ? Number(e.data) : null;
  let value;
  if (typedDigit !== null && !atEnd) {
    // Cursor not at end, always treat as fresh single-digit overwrite
    value = typedDigit;
  } else if (raw.length >= 2 && atEnd && (typedDigit === null || raw.startsWith("0"))) {
    // Natural 2-digit typing, or a paste / autofill of a whole value
    const candidate = parseInt(raw.slice(-2));
    value = isValid(candidate) ? candidate : Number(raw.slice(-1));
  } else {
    // Single-digit typing or fallback
    value = typedDigit !== null ? typedDigit : Number(raw.slice(-1));
  }
  // 12-hour correction
  if (view === "hour" && this.currentFormat === "12" && value === 0) {
    value = 12;
  }
  input.value = value < 10 ? `0${value}` : String(value);
  try {
    input.setSelectionRange(input.value.length, input.value.length);
  } catch {
    // ignore
  }
  if (view === "hour" && this.currentFormat === "12") {
    this.hourOfPeriod = value;
  } else {
    this[view] = value;
  }
  this.requestUpdate();
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eTimepickerInputElement_increment = function _M3eTimepickerInputElement_increment(view, by, wrap = false) {
  const max = view === "hour" ? 24 : 60;
  const step = Math.sign(by);
  let candidate = this[view] ?? 0;
  let remaining = Math.abs(by);
  while (remaining > 0) {
    candidate += step;
    if (!wrap) {
      if (candidate < 0) {
        candidate = 0;
        break;
      }
      if (candidate >= max) {
        candidate = max - 1;
        break;
      }
    }
    candidate = (candidate % max + max) % max;
    remaining--;
  }
  let skipStep = step;
  if (!wrap) {
    if (candidate === 0) skipStep = 1;else if (candidate === max - 1) skipStep = -1;
  }
  if (__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_isDisabled).call(this, candidate, view)) {
    let attempts = 0;
    while (__classPrivateFieldGet(this, _M3eTimepickerInputElement_instances, "m", _M3eTimepickerInputElement_isDisabled).call(this, candidate, view)) {
      candidate += skipStep;
      if (!wrap) {
        if (candidate < 0 || candidate >= max) return;
      }
      candidate = (candidate % max + max) % max;
      if (++attempts > max) return;
    }
  }
  this[view] = candidate;
};
_M3eTimepickerInputElement_handlePeriodChange = function _M3eTimepickerInputElement_handlePeriodChange(e) {
  e.stopPropagation();
  this.period = e.currentTarget.period;
  if (this.hour !== null) {
    const h = this.hour % 12 || 12;
    this.hour = this.period === "am" ? h === 12 ? 0 : h : h === 12 ? 12 : h + 12;
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
_M3eTimepickerInputElement_handleClockInput = function _M3eTimepickerInputElement_handleClockInput() {
  if (!this.control) return;
  const dial = this.control;
  this.hour = dial.hour;
  this.minute = dial.minute;
  this.second = dial.second;
};
_M3eTimepickerInputElement_handleClockChange = function _M3eTimepickerInputElement_handleClockChange() {
  if (!this.control) return;
  const dial = this.control;
  this.hour = dial.hour;
  this.minute = dial.minute;
  this.second = dial.second;
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eTimepickerInputElement_handleClockViewChange = function _M3eTimepickerInputElement_handleClockViewChange() {
  if (!this.control) return;
  this.view = this.control.view;
  this.dispatchEvent(new CustomEvent("view-change"));
};
_M3eTimepickerInputElement_isDisabled = function _M3eTimepickerInputElement_isDisabled(value, view) {
  if (value === null) return false;
  switch (view) {
    case "hour":
      return this.isHourDisabled(value);
    case "minute":
      return this.hour !== null && this.isMinuteDisabled(this.hour, value);
    case "second":
      return this.hour != null && this.minute !== null && this.isSecondDisabled(this.hour, this.minute, value);
  }
};
/** The styles of the element. */
M3eTimepickerInputElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .base { display: flex; align-items: flex-start; height: 100%; } .field-wrapper { display: flex; flex-direction: column; justify-content: stretch; position: relative; } .field, .focus-ring, .ripple { width: var(--m3e-timepicker-input-field-container-width, 96px); height: var(--m3e-timepicker-input-field-height, 80px); border-radius: var(--m3e-timepicker-input-field-container-shape, ${DesignToken.shape.corner.small}); } .field { display: block; text-align: center; cursor: text; outline: none; border: unset; box-shadow: none; padding: unset; font-size: var(--m3e-timepicker-input-field-font-size, ${DesignToken.typescale.standard.display.medium.fontSize}); font-weight: var( --m3e-timepicker-input-field-font-weight, ${DesignToken.typescale.standard.display.medium.fontWeight} ); line-height: var( --m3e-timepicker-input-field-line-height, ${DesignToken.typescale.standard.display.medium.lineHeight} ); letter-spacing: var( --m3e-timepicker-input-field-tracking, ${DesignToken.typescale.standard.display.medium.tracking} ); } .field:not(.selected):not(.invalid) { color: var(--m3e-timepicker-input-field-label-unselected-color, ${DesignToken.color.onSurface}); background-color: var( --m3e-timepicker-input-field-unselected-container-color, ${DesignToken.color.surfaceContainerHighest} ); --m3e-state-layer-hover-color: var( --m3e-timepicker-input-field-unselected-hover-state-layer-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-focus-color: var( --m3e-timepicker-input-field-unselected-focus-state-layer-color, ${DesignToken.color.onSurface} ); --m3e-ripple-color: var( --m3e-timepicker-input-field-unselected-pressed-state-layer-color, ${DesignToken.color.onSurface} ); } .field.selected:not(.invalid) { color: var(--m3e-timepicker-input-field-label-selected-color, ${DesignToken.color.onPrimaryContainer}); background-color: var( --m3e-timepicker-input-field-selected-container-color, ${DesignToken.color.primaryContainer} ); --m3e-state-layer-hover-color: var( --m3e-timepicker-input-field-selected-hover-state-layer-color, ${DesignToken.color.onPrimaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-timepicker-input-field-selected-focus-state-layer-color, ${DesignToken.color.onPrimaryContainer} ); --m3e-ripple-color: var( --m3e-timepicker-input-field-selected-pressed-state-layer-color, ${DesignToken.color.onPrimaryContainer} ); } .field.invalid { color: var(--m3e-timepicker-input-field-label-invalid-color, ${DesignToken.color.onErrorContainer}); background-color: var(--m3e-timepicker-input-field-invalid-container-color, ${DesignToken.color.errorContainer}); --m3e-state-layer-hover-color: var( --m3e-timepicker-input-field-invalid-hover-state-layer-color, ${DesignToken.color.onErrorContainer} ); --m3e-state-layer-focus-color: var( --m3e-timepicker-input-field-invalid-focus-state-layer-color, ${DesignToken.color.onErrorContainer} ); --m3e-ripple-color: var( --m3e-timepicker-input-field-invalid-pressed-state-layer-color, ${DesignToken.color.onErrorContainer} ); } .field::placeholder { user-select: none; color: currentColor; transition: opacity ${DesignToken.motion.duration.short4}; } .field:focus::placeholder { opacity: 0; } .label { user-select: none; margin-top: ${DesignToken.measurement.space50}; color: var(--m3e-timepicker-input-field-supporting-text-color, ${DesignToken.color.onSurfaceVariant}); font-size: var( --m3e-timepicker-input-field-supporting-text-font-size, ${DesignToken.typescale.standard.body.small.fontSize} ); font-weight: var( --m3e-timepicker-input-field-supporting-text-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight} ); line-height: var( --m3e-timepicker-input-field-supporting-text-line-height, ${DesignToken.typescale.standard.body.small.lineHeight} ); letter-spacing: var( --m3e-timepicker-input-field-supporting-text-tracking, ${DesignToken.typescale.standard.body.small.tracking} ); } .field-separator { user-select: none; display: flex; align-items: center; justify-content: center; width: var(--m3e-timepicker-input-field-separator-width, 24px); height: var(--m3e-timepicker-input-field-height, 80px); color: var(--m3e-timepicker-input-field-separator-color, ${DesignToken.color.onSurface}); font-size: var( --m3e-timepicker-input-field-separator-font-size, ${DesignToken.typescale.standard.display.large.fontSize} ); font-weight: var( --m3e-timepicker-input-field-separator-font-weight, ${DesignToken.typescale.standard.display.large.fontWeight} ); letter-spacing: var( --m3e-timepicker-input-field-separator-tracking, ${DesignToken.typescale.standard.display.large.tracking} ); } :host(:is(:state(--horizontal), :--horizontal)) .period-toggle { margin-inline-start: var( --m3e-timepicker-input-horizontal-period-toggle-space, ${DesignToken.measurement.space150} ); } :host(:is(:state(--vertical), :--vertical)) .period-toggle { margin-block-start: var(--m3e-timepicker-input-vertical-period-toggle-space, ${DesignToken.measurement.space200}); }`;
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eTimepickerInputElement.prototype, "orientation", void 0);
__decorate([property({
  attribute: "hide-labels",
  type: Boolean
})], M3eTimepickerInputElement.prototype, "hideLabels", void 0);
__decorate([property({
  attribute: "hour-label"
})], M3eTimepickerInputElement.prototype, "hourLabel", void 0);
__decorate([property({
  attribute: "minute-label"
})], M3eTimepickerInputElement.prototype, "minuteLabel", void 0);
__decorate([property({
  attribute: "second-label"
})], M3eTimepickerInputElement.prototype, "secondLabel", void 0);
__decorate([property({
  attribute: "period-toggle-label"
})], M3eTimepickerInputElement.prototype, "periodToggleLabel", void 0);
M3eTimepickerInputElement = __decorate([customElement("m3e-timepicker-input")], M3eTimepickerInputElement);

var _M3eTimepickerElement_instances, _M3eTimepickerElement_closeTimeout, _M3eTimepickerElement_date, _M3eTimepickerElement_breakpointUnobserve, _M3eTimepickerElement_trigger, _M3eTimepickerElement_anchor, _M3eTimepickerElement_anchorCleanup, _M3eTimepickerElement_anchorLastPosition, _M3eTimepickerElement_scrollLockController, _M3eTimepickerElement_inertController, _M3eTimepickerElement_documentClickHandler, _M3eTimepickerElement_documentKeyDownHandler, _M3eTimepickerElement_toggleHandler, _M3eTimepickerElement_applyMode, _M3eTimepickerElement_renderHeader, _M3eTimepickerElement_renderPicker, _M3eTimepickerElement_renderActions, _M3eTimepickerElement_renderModeToggleButton, _M3eTimepickerElement_handleModeClick, _M3eTimepickerElement_handleDocumentClick, _M3eTimepickerElement_handleInputChange, _M3eTimepickerElement_handleDismissClick, _M3eTimepickerElement_handleConfirmClick, _M3eTimepickerElement_handleDocumentKeyDown, _M3eTimepickerElement_handleToggle, _M3eTimepickerElement_initBreakpointMonitoring, _M3eTimepickerElement_updateVariant, _M3eTimepickerElement_updateOrientation, _M3eTimepickerElement_updatePosition, _M3eTimepickerElement_clearAnchoring, _M3eTimepickerElement_clearSelectionState, _M3eTimepickerElement_validate;
/**
 * Presents a time picker on a temporary surface.
 * @description
 * The `m3e-timepicker` component provides a time-selection experience consistent
 * with Material 3 guidance for layout, motion, and accessibility. It displays a
 * temporary surface that allows users to choose a time using both keyboard-based
 * input and clock-face dial controls.
 *
 * While open, the picker ensures users can review their selection and complete
 * the interaction through confirm, dismiss, or toggle actions, making updates
 * intentional and accessible.
 *
 * It accepts and emits plain `Date` values, allowing applications to apply their
 * own formatting, parsing, and localization.
 *
 * @tag m3e-timepicker
 *
 * @attr variant - The appearance variant of the picker.
 * @attr mode - The mode in which to select time.
 * @attr orientation - The orientation of the picker.
 * @attr date - The selected date.
 * @attr format - Whether to use a 12‑hour or 24‑hour clock.
 * @attr max-time - The maximum time that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr show-seconds - Whether to show seconds.
 * @attr confirm-label - Label given to the button used apply the selected date and close the picker.
 * @attr dismiss-label - Label given to the button used discard the selected date and close the picker.
 * @attr dial-label - Label given to the the picker when in dial mode.
 * @attr input-label - Label given to the the picker when in input mode.
 * @attr hour-label - Label for the hour field.
 * @attr minute-label - Label for the minute field.
 * @attr second-label - Label for the second field.
 * @attr mode-toggle-label - The accessible label given to the mode toggle button.
 * @attr hide-mode-toggle - Whether to hide the mode toggle button.
 * @attr period-toggle-label - The accessible label given to the period toggle.
 *
 * @fires change - Dispatched when the selected time is confirmed.
 * @fires beforetoggle - Dispatched before the picker toggles.
 * @fires toggle - Dispatched when the picker toggles.
 *
 * @cssprop --m3e-timepicker-container-padding-block - Block padding inside the picker container.
 * @cssprop --m3e-timepicker-container-padding-inline - Inline padding inside the picker container.
 * @cssprop --m3e-timepicker-container-color - Background color of the picker container.
 * @cssprop --m3e-timepicker-container-elevation - Box shadow / elevation of the picker container.
 * @cssprop --m3e-timepicker-docked-container-color - Background color of the docked picker container.
 * @cssprop --m3e-timepicker-docked-container-shape - Border radius of the docked picker container.
 * @cssprop --m3e-timepicker-modal-container-color - Background color of the modal picker container.
 * @cssprop --m3e-timepicker-modal-container-shape - Border radius of the modal picker container.
 * @cssprop --m3e-timepicker-headline-color - Color of the headline.
 * @cssprop --m3e-timepicker-headline-font-size - Font size of the headline.
 * @cssprop --m3e-timepicker-headline-font-weight - Font weight of the headline.
 * @cssprop --m3e-timepicker-headline-line-height - Line height of the headline.
 * @cssprop --m3e-timepicker-headline-tracking - Letter spacing of the headline.
 * @cssprop --m3e-timepicker-headline-top-space - Top margin above the headline.
 * @cssprop --m3e-timepicker-actions-space - Space above the action buttons.
 * @cssprop --m3e-timepicker-label-input-space - Space between Label and the input.
 * @cssprop --m3e-timepicker-vertical-input-dial-space - Space between the input and dial in vertical orientation.
 * @cssprop --m3e-timepicker-horizontal-input-dial-space - Space between the input and dial in horizontal orientation.
 * @cssprop --m3e-timepicker-input-field-container-width - Width of the input field container.
 * @cssprop --m3e-timepicker-input-field-height - Height of the input fields.
 * @cssprop --m3e-timepicker-input-field-container-shape - Corner radius of the input field container.
 * @cssprop --m3e-timepicker-input-field-font-size - Font size of the input field text.
 * @cssprop --m3e-timepicker-input-field-font-weight - Font weight of the input field text.
 * @cssprop --m3e-timepicker-input-field-line-height - Line height of the input field text.
 * @cssprop --m3e-timepicker-input-field-tracking - Letter spacing of the input field text.
 * @cssprop --m3e-timepicker-input-field-label-unselected-color - Text color of unselected input field labels.
 * @cssprop --m3e-timepicker-input-field-unselected-container-color - Background color of unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-hover-state-layer-color - State layer color on hover for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-focus-state-layer-color - State layer color on focus for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-unselected-pressed-state-layer-color - State layer color on pressed for unselected input fields.
 * @cssprop --m3e-timepicker-input-field-label-selected-color - Text color of selected input field labels.
 * @cssprop --m3e-timepicker-input-field-selected-container-color - Background color of selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-hover-state-layer-color - State layer color on hover for selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-focus-state-layer-color - State layer color on focus for selected input fields.
 * @cssprop --m3e-timepicker-input-field-selected-pressed-state-layer-color - State layer color on pressed for selected input fields.
 * @cssprop --m3e-timepicker-input-field-label-invalid-color - Text color of invalid input field labels.
 * @cssprop --m3e-timepicker-input-field-invalid-container-color - Background color of invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-hover-state-layer-color - State layer color on hover for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-focus-state-layer-color - State layer color on focus for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-invalid-pressed-state-layer-color - State layer color on pressed for invalid input fields.
 * @cssprop --m3e-timepicker-input-field-supporting-text-color - Text color of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-font-size - Font size of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-font-weight - Font weight of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-line-height - Line height of supporting labels.
 * @cssprop --m3e-timepicker-input-field-supporting-text-tracking - Letter spacing of supporting labels.
 * @cssprop --m3e-timepicker-input-field-separator-width - Width of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-color - Color of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-font-size - Font size of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-font-weight - Font weight of the field separator.
 * @cssprop --m3e-timepicker-input-field-separator-tracking - Letter spacing of the field separator.
 * @cssprop --m3e-timepicker-input-horizontal-period-toggle-space - Space between the fields and period toggle in horizontal orientation.
 * @cssprop --m3e-timepicker-input-vertical-period-toggle-space - Space between the fields and period toggle in vertical orientation.
 * @cssprop --m3e-timepicker-dial-container-size - Size of the dial container.
 * @cssprop --m3e-timepicker-dial-container-shape - Corner radius of the dial container.
 * @cssprop --m3e-timepicker-dial-container-color - Background color of the dial container.
 * @cssprop --m3e-timepicker-dial-inset - Inset offset applied to the dial surface.
 * @cssprop --m3e-timepicker-dial-center-size - Size of the dial center.
 * @cssprop --m3e-timepicker-dial-handle-color - Color of the active handle.
 * @cssprop --m3e-timepicker-dial-handle-size - Size of the handle.
 * @cssprop --m3e-timepicker-dial-handle-disabled-color - Color of a disabled handle.
 * @cssprop --m3e-timepicker-dial-handle-disabled-opacity - Opacity of a disabled handle.
 * @cssprop --m3e-timepicker-dial-dial-inset - Inset applied to the handle area.
 * @cssprop --m3e-timepicker-dial-numeral-size - Size of the dial numerals.
 * @cssprop --m3e-timepicker-dial-numeral-color - Text color of inactive numerals.
 * @cssprop --m3e-timepicker-dial-numeral-shape - Corner radius of the numerals.
 * @cssprop --m3e-timepicker-dial-numeral-font-size - Font size of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-font-weight - Font weight of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-line-height - Line height of the outer numerals.
 * @cssprop --m3e-timepicker-dial-numeral-tracking - Letter spacing of the outer numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-font-size - Font size of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-font-weight - Font weight of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-line-height - Line height of the inner numerals.
 * @cssprop --m3e-timepicker-dial-inner-numeral-tracking - Letter spacing of the inner numerals.
 * @cssprop --m3e-timepicker-dial-numeral-active-color - Color of active numerals.
 * @cssprop --m3e-timepicker-dial-numeral-disabled-color - Color of disabled numerals.
 * @cssprop --m3e-timepicker-dial-numeral-disabled-opacity - Opacity of disabled numerals.
 * @cssprop --m3e-timepicker-dial-handle-center-size - Size of the handle center indicator.
 */
let M3eTimepickerElement = class M3eTimepickerElement extends HtmlFor(SuppressInitialAnimation(ReconnectedCallback(AttachInternals(Role(LitElement, "dialog"))))) {
  constructor() {
    super(...arguments);
    _M3eTimepickerElement_instances.add(this);
    /** @private */
    _M3eTimepickerElement_closeTimeout.set(this, -1);
    /** @private */
    _M3eTimepickerElement_date.set(this, void 0);
    /** @private */
    this._open = false;
    /** @private */
    this._invalid = false;
    /** @private */
    _M3eTimepickerElement_breakpointUnobserve.set(this, void 0);
    /** @private */
    _M3eTimepickerElement_trigger.set(this, void 0);
    /** @private */
    _M3eTimepickerElement_anchor.set(this, void 0);
    /** @private */
    _M3eTimepickerElement_anchorCleanup.set(this, void 0);
    /** @private */
    _M3eTimepickerElement_anchorLastPosition.set(this, void 0);
    /** @private */
    _M3eTimepickerElement_scrollLockController.set(this, new ScrollLockController(this));
    /** @private */
    _M3eTimepickerElement_inertController.set(this, new InertController(this));
    /** @private */
    _M3eTimepickerElement_documentClickHandler.set(this, e => __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleDocumentClick).call(this, e));
    /** @private */
    _M3eTimepickerElement_documentKeyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleDocumentKeyDown).call(this, e));
    /** @private */
    _M3eTimepickerElement_toggleHandler.set(this, e => __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleToggle).call(this, e));
    /**
     * The appearance variant of the picker.
     * @default "docked"
     */
    this.variant = "docked";
    /**
     * The mode in which to select time.
     * @default "dial"
     */
    this.mode = "dial";
    /**
     * The orientation of the picker.
     * @default "vertical"
     */
    this.orientation = "vertical";
    /**
     * The selected date.
     * @default null
     */
    this.date = null;
    /**
     * Whether to use a 12‑hour or 24‑hour clock.
     * @default "12"
     */
    this.format = "12";
    /**
     * Whether to show seconds.
     * @default false
     */
    this.showSeconds = false;
    /**
     * The minimum time that can be selected.
     * @default null
     */
    this.minTime = null;
    /**
     * The maximum time that can be selected.
     * @default null
     */
    this.maxTime = null;
    /**
     * Whether to hide the mode toggle button.
     * @default false
     */
    this.hideModeToggle = false;
    /**
     * Label given to the button used apply the selected date and close the picker.
     * @default "OK"
     */
    this.confirmLabel = "OK";
    /**
     * Label given to the button used discard the selected date and close the picker.
     * @default "Cancel"
     */
    this.dismissLabel = "Cancel";
    /**
     * Label given to the the picker when in dial mode.
     * @default "Select time"
     */
    this.dialLabel = "Select time";
    /**
     * Label given to the the picker when in input mode.
     * @default "Edit time"
     */
    this.inputLabel = "Edit time";
    /**
     * Label for the hour field.
     * @default "Hour"
     */
    this.hourLabel = "Hour";
    /**
     * Label for the minute field.
     * @default "Minute"
     */
    this.minuteLabel = "Minute";
    /**
     * The label for the second field.
     * @default "Second"
     */
    this.secondLabel = "Second";
    /**
     * The accessible label given to the mode toggle button.
     * @default "Toggle input picker"
     */
    this.modeToggleLabel = "Toggle input picker";
    /**
     * The accessible label given to the period toggle.
     * @default "AM or PM"
     */
    this.periodToggleLabel = "AM or PM";
  }
  /** Whether the picker is open. */
  get isOpen() {
    return __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f") !== undefined;
  }
  /** The current variant applied to the picker. */
  get currentVariant() {
    return this._variant ?? (this.variant !== "modal" ? "docked" : "modal");
  }
  /** The current orientation applied to the picker. */
  get currentOrientation() {
    return this._orientation ?? (this.orientation !== "horizontal" ? "vertical" : "horizontal");
  }
  /** The current input mode applied to the picker. */
  get currentMode() {
    return this._mode ?? this.mode;
  }
  /** @inheritdoc */
  attach(control) {
    if (control.tagName === "M3E-DATE-INPUT") {
      super.attach(control);
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_applyMode).call(this);
    this.setAttribute("popover", "manual");
    this.addEventListener("toggle", __classPrivateFieldGet(this, _M3eTimepickerElement_toggleHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._variant = undefined;
    __classPrivateFieldGet(this, _M3eTimepickerElement_breakpointUnobserve, "f")?.call(this);
    __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_clearAnchoring).call(this);
    deleteCustomState(this, "--docked");
    deleteCustomState(this, "--modal");
    this.removeEventListener("toggle", __classPrivateFieldGet(this, _M3eTimepickerElement_toggleHandler, "f"));
    document.removeEventListener("click", __classPrivateFieldGet(this, _M3eTimepickerElement_documentClickHandler, "f"));
    document.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eTimepickerElement_documentKeyDownHandler, "f"));
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    if (this.variant === "auto" || this.orientation === "auto") {
      __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_initBreakpointMonitoring).call(this);
    }
  }
  /**
   * Opens the picker.
   * @param {HTMLElement} trigger The element that triggered the picker.
   * @param {HTMLElement | undefined} anchor The element used to position the picker.
   * @returns {Promise<void>} A `Promise` that resolves when the picker is opened.
   */
  async show(trigger, anchor) {
    if (__classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f") && __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f") !== trigger) {
      this.hide();
    }
    clearTimeout(__classPrivateFieldGet(this, _M3eTimepickerElement_closeTimeout, "f"));
    if (this.currentVariant === "modal") {
      __classPrivateFieldGet(this, _M3eTimepickerElement_scrollLockController, "f").lock();
      __classPrivateFieldGet(this, _M3eTimepickerElement_inertController, "f").lock();
    }
    // Validate the current value prior to opening
    __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_validate).call(this);
    // The picker is rendered on demand
    this._open = true;
    // Wait for the picker to render
    await waitForUpdate(this);
    // When bound to a control, use the control's value.
    if (this.control) {
      this.date = this.control.value;
    }
    const input = this._input;
    input.hour = this.date?.getHours() ?? null;
    input.minute = this.date?.getMinutes() ?? null;
    input.second = this.date?.getSeconds() ?? null;
    input.minTime = this.control?.minTime ?? this.minTime;
    input.maxTime = this.control?.maxTime ?? this.maxTime;
    input.showSeconds = this.control?.showSeconds ?? this.showSeconds;
    input.format = this.control?.timeFormat ?? this.format;
    input.blackoutTimes = this.control?.blackoutTimes ?? this.blackoutTimes;
    await waitForUpdate(input);
    __classPrivateFieldSet(this, _M3eTimepickerElement_date, undefined, "f");
    __classPrivateFieldSet(this, _M3eTimepickerElement_trigger, trigger, "f");
    __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f").ariaExpanded = "true";
    __classPrivateFieldSet(this, _M3eTimepickerElement_anchor, anchor, "f");
    await __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_updatePosition).call(this);
    this.showPopover();
    document.addEventListener("click", __classPrivateFieldGet(this, _M3eTimepickerElement_documentClickHandler, "f"));
    document.addEventListener("keydown", __classPrivateFieldGet(this, _M3eTimepickerElement_documentKeyDownHandler, "f"));
  }
  /**
   * Hides the picker.
   * @param {boolean} [restoreFocus=false] Whether to restore focus to the picker's trigger.
   */
  hide(restoreFocus = false) {
    if (!this.isOpen) return;
    document.removeEventListener("click", __classPrivateFieldGet(this, _M3eTimepickerElement_documentClickHandler, "f"));
    document.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eTimepickerElement_documentKeyDownHandler, "f"));
    if (this.currentVariant === "modal") {
      __classPrivateFieldGet(this, _M3eTimepickerElement_scrollLockController, "f").unlock();
      __classPrivateFieldGet(this, _M3eTimepickerElement_inertController, "f").unlock();
    }
    this.hidePopover();
    if (__classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f")) {
      __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f").ariaExpanded = "false";
      if (restoreFocus) {
        __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f").focus();
      }
      __classPrivateFieldSet(this, _M3eTimepickerElement_trigger, undefined, "f");
    }
  }
  /**
   * Toggles the picker.
   * @param {HTMLElement} trigger The element that triggered the picker.
   * @param {HTMLElement | undefined} anchor The element used to position the picker.
   * @returns {Promise<void>} A `Promise` that resolves when the picker is opened or closed.
   */
  async toggle(trigger, anchor) {
    if (__classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f")) {
      this.hide();
    } else {
      await this.show(trigger, anchor);
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("mode")) {
      __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_applyMode).call(this);
    }
    if (changedProperties.has("variant") && !isTimepickerVariant(this.variant)) {
      this.variant = "docked";
    }
    if (changedProperties.has("orientation") && !isTimepickerOrientation(this.orientation)) {
      this.orientation = "vertical";
    }
    if (changedProperties.has("format") && !isTimepickerFormat(this.format)) {
      this.format = "12";
    }
    if (changedProperties.has("date")) {
      __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_clearSelectionState).call(this);
    }
    if (changedProperties.has("variant") || changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eTimepickerElement_breakpointUnobserve, "f")?.call(this);
      if (this.variant !== "auto") {
        this._variant = undefined;
        __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_updateVariant).call(this);
      }
      if (this.orientation !== "auto") {
        this._orientation = undefined;
        __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_updateOrientation).call(this);
      }
      if (this.variant === "auto" || this.orientation === "auto") {
        __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_initBreakpointMonitoring).call(this);
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-focus-trap ?disabled="${!this._open}">${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_renderHeader).call(this)}${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_renderPicker).call(this)}${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_renderActions).call(this)}</m3e-focus-trap>`;
  }
};
_M3eTimepickerElement_closeTimeout = new WeakMap();
_M3eTimepickerElement_date = new WeakMap();
_M3eTimepickerElement_breakpointUnobserve = new WeakMap();
_M3eTimepickerElement_trigger = new WeakMap();
_M3eTimepickerElement_anchor = new WeakMap();
_M3eTimepickerElement_anchorCleanup = new WeakMap();
_M3eTimepickerElement_anchorLastPosition = new WeakMap();
_M3eTimepickerElement_scrollLockController = new WeakMap();
_M3eTimepickerElement_inertController = new WeakMap();
_M3eTimepickerElement_documentClickHandler = new WeakMap();
_M3eTimepickerElement_documentKeyDownHandler = new WeakMap();
_M3eTimepickerElement_toggleHandler = new WeakMap();
_M3eTimepickerElement_instances = new WeakSet();
_M3eTimepickerElement_applyMode = function _M3eTimepickerElement_applyMode() {
  if (!isTimepickerMode(this.mode)) {
    this.mode = "dial";
  }
  setCustomEnumState(this, this.mode, "dial", "input");
};
_M3eTimepickerElement_renderHeader = function _M3eTimepickerElement_renderHeader() {
  return html`<div class="headline">${this.currentMode === "dial" ? this.dialLabel : this.inputLabel}</div>`;
};
_M3eTimepickerElement_renderPicker = function _M3eTimepickerElement_renderPicker() {
  // Picker is rendered only when open
  return this._open ? html`<div class="base"><m3e-timepicker-input class="input" for="${ifDefined(this.currentMode === "input" ? undefined : "dial")}" ?hide-labels="${this.currentMode === "dial"}" period-toggle-label="${this.periodToggleLabel}" hour-label="${this.hourLabel}" minute-label="${this.minuteLabel}" second-label="${this.secondLabel}" orientation="${this.currentOrientation === "vertical" ? "horizontal" : "vertical"}" @change="${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleInputChange)}"></m3e-timepicker-input><m3e-collapsible orientation="${this.currentOrientation === "horizontal" ? "both" : "vertical"}" ?open="${this.currentMode === "dial"}"><div class="dial-wrapper"><div class="dial-spacer"></div><m3e-timepicker-dial id="dial" class="dial"></m3e-timepicker-dial></div></m3e-collapsible></div>` : nothing;
};
_M3eTimepickerElement_renderActions = function _M3eTimepickerElement_renderActions() {
  return html`<div class="actions">${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_renderModeToggleButton).call(this)}<div class="spacer" aria-hidden="true"></div><m3e-button @click="${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleDismissClick)}">${this.dismissLabel}</m3e-button><m3e-button ?disabled="${this._invalid}" @click="${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleConfirmClick)}">${this.confirmLabel}</m3e-button></div>`;
};
_M3eTimepickerElement_renderModeToggleButton = function _M3eTimepickerElement_renderModeToggleButton() {
  if (this.hideModeToggle) return nothing;
  return html`<m3e-icon-button aria-label="${this.modeToggleLabel}" aria-expanded="${this.currentMode === "dial"}" aria-controls="dial" @click="${__classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_handleModeClick)}">${this.currentMode === "dial" ? svg`<svg viewBox="0 -960 960 960" fill="currentColor">
              <path
                d="M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-440h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-560h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-280v-400 400Z"
              />
            </svg>` : svg`<svg viewBox="0 -960 960 960" fill="currentColor">
              <path
                d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
              />
            </svg>`}</m3e-icon-button>`;
};
_M3eTimepickerElement_handleModeClick = function _M3eTimepickerElement_handleModeClick() {
  this._mode = this.currentMode === "dial" ? "input" : "dial";
};
_M3eTimepickerElement_handleDocumentClick = function _M3eTimepickerElement_handleDocumentClick(e) {
  if (this.isOpen && !e.composedPath().some(x => x === this || x === __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f"))) {
    this.hide();
  }
};
_M3eTimepickerElement_handleInputChange = function _M3eTimepickerElement_handleInputChange(e) {
  const input = e.target;
  if (input.hour === null || input.minute === null || input.showSeconds && input.second === null) {
    __classPrivateFieldSet(this, _M3eTimepickerElement_date, null, "f");
  } else {
    __classPrivateFieldSet(this, _M3eTimepickerElement_date, new Date(this.date ?? Date.now()), "f");
    __classPrivateFieldGet(this, _M3eTimepickerElement_date, "f").setHours(input.hour, input.minute, input.second ?? 0, 0);
  }
  __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_validate).call(this);
};
_M3eTimepickerElement_handleDismissClick = function _M3eTimepickerElement_handleDismissClick() {
  this.hide(true);
};
_M3eTimepickerElement_handleConfirmClick = /** @private */
async function _M3eTimepickerElement_handleConfirmClick() {
  if (__classPrivateFieldGet(this, _M3eTimepickerElement_date, "f") !== undefined) {
    this.date = __classPrivateFieldGet(this, _M3eTimepickerElement_date, "f");
  }
  this.hide(true);
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
  if (this.control) {
    const dateInput = this.control;
    if (dateInput.value?.getTime() !== this.date?.getTime()) {
      dateInput.value = this.date;
      await waitForUpdate(dateInput);
      dateInput.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  }
};
_M3eTimepickerElement_handleDocumentKeyDown = function _M3eTimepickerElement_handleDocumentKeyDown(e) {
  if (this.isOpen && this.currentVariant === "modal" && e.key === "Escape" && !e.shiftKey && !e.ctrlKey) {
    e.preventDefault();
    this.hide(true);
  }
};
_M3eTimepickerElement_handleToggle = function _M3eTimepickerElement_handleToggle(e) {
  if (e.newState === "closed") {
    __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_clearSelectionState).call(this);
    __classPrivateFieldGet(this, _M3eTimepickerElement_anchorCleanup, "f")?.call(this);
    __classPrivateFieldSet(this, _M3eTimepickerElement_anchorCleanup, undefined, "f");
    __classPrivateFieldSet(this, _M3eTimepickerElement_anchorLastPosition, undefined, "f");
    clearTimeout(__classPrivateFieldGet(this, _M3eTimepickerElement_closeTimeout, "f"));
    if (!prefersReducedMotion()) {
      __classPrivateFieldSet(this, _M3eTimepickerElement_closeTimeout, setTimeout(() => this._open = false, 100), "f");
    } else {
      this._open = false;
    }
  }
};
_M3eTimepickerElement_initBreakpointMonitoring = function _M3eTimepickerElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eTimepickerElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall, Breakpoint.Small], matches => {
    if (this.variant === "auto") {
      this._variant = matches.get(Breakpoint.XSmall) || matches.get(Breakpoint.Small) ? "modal" : "docked";
      __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_updateVariant).call(this);
    }
    if (this.orientation === "auto") {
      this._orientation = matches.get(Breakpoint.Small) ? "horizontal" : "vertical";
      __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_updateOrientation).call(this);
    }
  }), "f");
};
_M3eTimepickerElement_updateVariant = function _M3eTimepickerElement_updateVariant() {
  switch (this.currentVariant) {
    case "docked":
      this.ariaModal = null;
      deleteCustomState(this, "--modal");
      addCustomState(this, "--docked");
      __classPrivateFieldGet(this, _M3eTimepickerElement_scrollLockController, "f").unlock();
      __classPrivateFieldGet(this, _M3eTimepickerElement_inertController, "f").unlock();
      break;
    case "modal":
      this.ariaModal = "true";
      deleteCustomState(this, "--docked");
      addCustomState(this, "--modal");
      if (this.isOpen) {
        __classPrivateFieldGet(this, _M3eTimepickerElement_scrollLockController, "f").lock();
        __classPrivateFieldGet(this, _M3eTimepickerElement_inertController, "f").lock();
      }
      break;
  }
  if (this.isOpen) {
    __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_updatePosition).call(this);
  }
};
_M3eTimepickerElement_updateOrientation = function _M3eTimepickerElement_updateOrientation() {
  switch (this.currentOrientation) {
    case "horizontal":
      addCustomState(this, "--horizontal");
      break;
    case "vertical":
      deleteCustomState(this, "--horizontal");
      break;
  }
};
_M3eTimepickerElement_updatePosition = /** @private */
async function _M3eTimepickerElement_updatePosition() {
  if (this.currentVariant === "docked" && __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f")) {
    __classPrivateFieldGet(this, _M3eTimepickerElement_anchorCleanup, "f")?.call(this);
    __classPrivateFieldSet(this, _M3eTimepickerElement_anchorLastPosition, undefined, "f");
    __classPrivateFieldSet(this, _M3eTimepickerElement_anchorCleanup, await positionAnchor(this, __classPrivateFieldGet(this, _M3eTimepickerElement_anchor, "f") ?? __classPrivateFieldGet(this, _M3eTimepickerElement_trigger, "f"), {
      position: "bottom-start",
      inline: true,
      flip: true,
      shift: "both"
    }, (x, y, position) => {
      setCustomState(this, "--top", position.includes("top"));
      setCustomState(this, "--bottom", position.includes("bottom"));
      if (__classPrivateFieldGet(this, _M3eTimepickerElement_anchorLastPosition, "f")?.dir !== M3eDirectionality.current || __classPrivateFieldGet(this, _M3eTimepickerElement_anchorLastPosition, "f")?.x !== x) {
        if (M3eDirectionality.current === "rtl") {
          this.style.right = `${window.innerWidth - x - this.clientWidth}px`;
          this.style.left = "";
        } else {
          this.style.left = `${x}px`;
          this.style.right = "";
        }
      }
      if (__classPrivateFieldGet(this, _M3eTimepickerElement_anchorLastPosition, "f")?.y !== y) {
        this.style.top = `${y}px`;
      }
      __classPrivateFieldSet(this, _M3eTimepickerElement_anchorLastPosition, {
        x,
        y,
        dir: M3eDirectionality.current
      }, "f");
    }), "f");
  } else {
    __classPrivateFieldGet(this, _M3eTimepickerElement_instances, "m", _M3eTimepickerElement_clearAnchoring).call(this);
  }
};
_M3eTimepickerElement_clearAnchoring = function _M3eTimepickerElement_clearAnchoring() {
  __classPrivateFieldGet(this, _M3eTimepickerElement_anchorCleanup, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eTimepickerElement_anchorCleanup, undefined, "f");
  __classPrivateFieldSet(this, _M3eTimepickerElement_anchorLastPosition, undefined, "f");
  this.style.left = "";
  this.style.right = "";
  this.style.top = "";
};
_M3eTimepickerElement_clearSelectionState = function _M3eTimepickerElement_clearSelectionState() {
  __classPrivateFieldSet(this, _M3eTimepickerElement_date, undefined, "f");
};
_M3eTimepickerElement_validate = function _M3eTimepickerElement_validate() {
  if (__classPrivateFieldGet(this, _M3eTimepickerElement_date, "f") === undefined && this.date) {
    // There is a value, but the value didn't change
    this._invalid = false;
    return;
  }
  if (__classPrivateFieldGet(this, _M3eTimepickerElement_date, "f") === null || __classPrivateFieldGet(this, _M3eTimepickerElement_date, "f") === undefined) {
    this._invalid = true;
    return;
  }
  const hour = __classPrivateFieldGet(this, _M3eTimepickerElement_date, "f").getHours();
  const minute = __classPrivateFieldGet(this, _M3eTimepickerElement_date, "f").getMinutes();
  const second = __classPrivateFieldGet(this, _M3eTimepickerElement_date, "f").getSeconds();
  if (this.minTime) {
    const {
      hour: mh,
      minute: mm = 0,
      second: ms = 0
    } = this.minTime;
    if (hour < mh || hour === mh && minute < mm || hour === mh && minute === mm && second < ms) {
      this._invalid = true;
      return;
    }
  }
  if (this.maxTime) {
    const {
      hour: Mh,
      minute: Mm = 59,
      second: Ms = 59
    } = this.maxTime;
    if (hour > Mh || hour === Mh && minute > Mm || hour === Mh && minute === Mm && second > Ms) {
      this._invalid = true;
      return;
    }
  }
  if (this.blackoutTimes?.({
    hour,
    minute,
    second
  })) {
    this._invalid = true;
    return;
  }
  this._invalid = false;
};
/** The styles of the element. */
M3eTimepickerElement.styles = css`:host { flex-direction: column; margin: unset; border: unset; padding-block: var(--m3e-timepicker-container-padding-block, ${DesignToken.measurement.space150}); padding-inline: var(--m3e-timepicker-container-padding-inline, ${DesignToken.measurement.space350}); background-color: var(--m3e-timepicker-container-color, ${DesignToken.color.surfaceContainer}); box-shadow: var(--m3e-timepicker-container-elevation, ${DesignToken.elevation.level3}); opacity: 0; display: none; } :host([hidden]) { display: none; } .headline { color: var(--m3e-timepicker-headline-color, ${DesignToken.color.onSurfaceVariant}); font-size: var(--m3e-timepicker-headline-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-timepicker-headline-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-timepicker-headline-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-timepicker-headline-tracking, ${DesignToken.typescale.standard.label.large.tracking}); margin-block-start: var(--m3e-timepicker-headline-top-space, ${DesignToken.measurement.space200}); } .actions { margin-block-start: var(--m3e-timepicker-actions-space, ${DesignToken.measurement.space300}); display: flex; align-items: center; column-gap: ${DesignToken.measurement.space100}; } .spacer { flex: 1 1 auto; } :host(:is(:state(--docked), :--docked)) { position: absolute; background-color: var(--m3e-timepicker-docked-container-color, ${DesignToken.color.surfaceContainer}); border-radius: var(--m3e-timepicker-docked-container-shape, ${DesignToken.shape.corner.large}); } :host(:is(:state(--modal), :--modal)) { position: fixed; inset: 0; margin: auto; transform-origin: top; background-color: var(--m3e-timepicker-modal-container-color, ${DesignToken.color.surfaceContainerHigh}); border-radius: var(--m3e-timepicker-modal-container-shape, ${DesignToken.shape.corner.extraLarge}); } :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}, 
        transform ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard},
        overlay ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete,
        display ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host { transform: scaleY(0.8); } :host(:popover-open) { transform: scaleY(1); display: inline-flex; opacity: 1; } :host(:is(:state(--docked), :--docked))::backdrop { background-color: transparent; } :host(:is(:state(--modal), :--modal))::backdrop { background-color: color-mix(in srgb, var(--m3e-dialog-scrim-color, ${DesignToken.color.scrim}) 0%, transparent); margin-inline-end: -20px; } :host(:is(:state(--modal), :--modal):not(:popover-open))::backdrop { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--modal), :--modal):popover-open)::backdrop { background-color: color-mix( in srgb, var(--m3e-dialog-scrim-color, ${DesignToken.color.scrim}) var(--m3e-dialog-scrim-opacity, 32%), transparent ); transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--bottom), :--bottom)) { transform-origin: top; } :host(:is(:state(--top), :--top)) { transform-origin: bottom; } @starting-style { :host(:popover-open) { transform: scaleY(0.8); } :host(:is(:state(--modal), :--modal):popover-open)::backdrop { background-color: color-mix(in srgb, var(--m3e-dialog-scrim-color, ${DesignToken.color.scrim}) 0%, transparent); } } .base { width: 100%; display: flex; align-items: center; justify-content: center; } :host(:not(:is(:state(--horizontal), :--horizontal))) .base { flex-direction: column; } .input { margin-top: var(--m3e-timepicker-label-input-space, ${DesignToken.measurement.space250}); } .dial-wrapper { display: flex; transition: ${unsafeCSS(`opacity var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1}) ${DesignToken.motion.easing.standard}`)}; } .dial-spacer, .dial { flex: none; } :host(:is(:state(--input), :--input)) .dial-wrapper { opacity: 0; } :host(:is(:state(--dial), :--dial)) .dial-wrapper { opacity: 1; } :host(:not(:is(:state(--horizontal), :--horizontal))) .dial-wrapper { flex-direction: column; } :host(:not(:is(:state(--horizontal), :--horizontal))) .dial-spacer { height: var(--m3e-timepicker-vertical-input-dial-space, ${DesignToken.measurement.space450}); } :host(:is(:state(--horizontal), :--horizontal)) .dial-spacer { width: var(--m3e-timepicker-horizontal-input-dial-space, ${DesignToken.measurement.space650}); } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: none; } } @media (forced-colors: active) { :host { background-color: Menu; color: MenuText; border: 1px solid CanvasText; } }`;
__decorate([state()], M3eTimepickerElement.prototype, "_open", void 0);
__decorate([query("m3e-timepicker-input")], M3eTimepickerElement.prototype, "_input", void 0);
__decorate([state()], M3eTimepickerElement.prototype, "_invalid", void 0);
__decorate([state()], M3eTimepickerElement.prototype, "_variant", void 0);
__decorate([state()], M3eTimepickerElement.prototype, "_orientation", void 0);
__decorate([state()], M3eTimepickerElement.prototype, "_mode", void 0);
__decorate([property()], M3eTimepickerElement.prototype, "variant", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eTimepickerElement.prototype, "mode", void 0);
__decorate([property()], M3eTimepickerElement.prototype, "orientation", void 0);
__decorate([property({
  converter: dateConverter
})], M3eTimepickerElement.prototype, "date", void 0);
__decorate([property()], M3eTimepickerElement.prototype, "format", void 0);
__decorate([property({
  attribute: "show-seconds",
  type: Boolean
})], M3eTimepickerElement.prototype, "showSeconds", void 0);
__decorate([property({
  attribute: "min-time",
  converter: timeConverter
})], M3eTimepickerElement.prototype, "minTime", void 0);
__decorate([property({
  attribute: "max-time",
  converter: timeConverter
})], M3eTimepickerElement.prototype, "maxTime", void 0);
__decorate([property({
  attribute: false
})], M3eTimepickerElement.prototype, "blackoutTimes", void 0);
__decorate([property({
  attribute: "hide-mode-toggle",
  type: Boolean
})], M3eTimepickerElement.prototype, "hideModeToggle", void 0);
__decorate([property({
  attribute: "confirm-label"
})], M3eTimepickerElement.prototype, "confirmLabel", void 0);
__decorate([property({
  attribute: "dismiss-label"
})], M3eTimepickerElement.prototype, "dismissLabel", void 0);
__decorate([property({
  attribute: "dial-label"
})], M3eTimepickerElement.prototype, "dialLabel", void 0);
__decorate([property({
  attribute: "input-label"
})], M3eTimepickerElement.prototype, "inputLabel", void 0);
__decorate([property({
  attribute: "hour-label"
})], M3eTimepickerElement.prototype, "hourLabel", void 0);
__decorate([property({
  attribute: "minute-label"
})], M3eTimepickerElement.prototype, "minuteLabel", void 0);
__decorate([property({
  attribute: "second-label"
})], M3eTimepickerElement.prototype, "secondLabel", void 0);
__decorate([property({
  attribute: "mode-toggle-label"
})], M3eTimepickerElement.prototype, "modeToggleLabel", void 0);
__decorate([property({
  attribute: "period-toggle-label"
})], M3eTimepickerElement.prototype, "periodToggleLabel", void 0);
M3eTimepickerElement = __decorate([customElement("m3e-timepicker")], M3eTimepickerElement);

/**
 * An element, nested within a clickable element, used to toggle a timepicker.
 * @tag m3e-timepicker-toggle
 */
let M3eTimepickerToggleElement = class M3eTimepickerToggleElement extends HtmlFor(ActionElementBase) {
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement) {
      this.parentElement.ariaHasPopup = "dialog";
    }
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.parentElement) {
      this.parentElement.ariaHasPopup = null;
    }
  }
  /** @inheritdoc */
  _onClick() {
    if (this.control instanceof M3eTimepickerElement && this.parentElement) {
      this.control.toggle(this.parentElement, this.closest("m3e-form-field") ?? undefined);
    }
  }
};
M3eTimepickerToggleElement = __decorate([customElement("m3e-timepicker-toggle")], M3eTimepickerToggleElement);

export { M3eTimepickerDialElement, M3eTimepickerElement, M3eTimepickerInputElement, M3eTimepickerToggleElement, isTimepickerFormat, isTimepickerMode, isTimepickerOrientation, isTimepickerPeriod, isTimepickerVariant, isTimepickerView };
//# sourceMappingURL=timepicker.js.map
