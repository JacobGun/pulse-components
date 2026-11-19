/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, nothing, html, css } from 'lit';
import { state, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Disabled, AttachInternals, Role, hasCustomState, setCustomState, isDisabledMixin, deleteCustomState, addCustomState, DesignToken, customElement } from './TextOverflowElement.js';
import { dateConverter } from './dateConverter.js';
import { timeConverter } from './timeConverter.js';
import { ConstraintValidation, defaultValidationMessages, validate } from './ConstraintValidation.js';
import { Dirty, Touched, FormAssociated, formValue } from './FormAssociated.js';
import { waitForUpdate } from './waitForUpdate.js';
import { ReadOnly } from './ReadOnly.js';
import { Required } from './Required.js';

/**
 * Determines whether a value is a `DateInputType`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `DateInputType`.
 */
function isDateInputType(value) {
  return value === "date" || value === "datetime" || value === "time";
}

/**
 * Determines whether a value is a `DateInputTimeFormat`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `DateInputTimeFormat`.
 */
function isDateInputTimeFormat(value) {
  return value === "12" || value === "24" || value === "auto";
}

var _M3eDateInputElement_instances, _M3eDateInputElement_format, _M3eDateInputElement_timeFormat, _M3eDateInputElement_changed, _M3eDateInputElement_ignoreValueUpdate, _M3eDateInputElement_renderField, _M3eDateInputElement_handlePointerDown, _M3eDateInputElement_handleFocusOut, _M3eDateInputElement_commitBuffer, _M3eDateInputElement_handleFieldFocus, _M3eDateInputElement_handleFieldKeyDown, _M3eDateInputElement_handleFieldWheel, _M3eDateInputElement_handleFieldPointerDown, _M3eDateInputElement_handleFieldPreventDefault, _M3eDateInputElement_handleFieldPreventDefaultReadonly, _M3eDateInputElement_handleLiteralPointerDown, _M3eDateInputElement_getCurrent, _M3eDateInputElement_updatePeriodFromHour, _M3eDateInputElement_updateHourFromPeriod, _M3eDateInputElement_updateValue, _M3eDateInputElement_updateValueBuffer, _M3eDateInputElement_adjustHourForPeriod, _M3eDateInputElement_clampDay, _M3eDateInputElement_selectAll, _M3eDateInputElement_deselectAll;
/**
 * A segmented input for entering date and/or time values using a keyboard.
 *
 * @description
 * The `m3e-date-input` component provides a segmented input for editing
 * date and/or time values. It supports date-only, time-only, and combined date/time entry,
 * and integrates with `m3e-form-field`, `m3e-datepicker`, and `m3e-timepicker`. Each segment
 * is independently editable for precise, accessible, form-friendly interaction.
 *
 * @example
 * The following example shows the `m3e-date-input` used with `m3e-form-field` and `m3e-datepicker`.
 * ```html
 * <m3e-form-field>
 *  <label slot="label" for="fld1">Date Field</label>
 *  <m3e-date-input id="fld1"></m3e-date-input>
 *  <m3e-icon-button slot="suffix">
 *    <m3e-icon name="calendar_today"></m3e-icon>
 *    <m3e-datepicker-toggle for="picker"></m3e-datepicker-toggle>
 *  </m3e-icon-button>
 *  <span slot="hint">MM/DD/YYYY</span>
 * </m3e-form-field>
 * <m3e-datepicker id="picker" for="fld1"></m3e-datepicker>
 * ```
 *
 * @tag m3e-date-input
 *
 * @attr value - The value of the input.
 * @attr type - The interaction mode for editing date and/or time values.
 * @attr show-seconds - Whether to show seconds.
 * @attr time-format - Format used when editing time values.
 * @attr min-date - The minimum date that can be selected.
 * @attr max-date - The maximum date that can be selected.
 * @attr min-time - The minimum time that can be selected.
 * @attr max-time - The maximum time that can be selected.
 * @attr month-label - The accessible label given to the month segment.
 * @attr day-label - The accessible label given to the day segment.
 * @attr year-label - The accessible label given to the year segment.
 * @attr hour-label - The accessible label given to the hour segment.
 * @attr minute-label - The accessible label given to the minute segment.
 * @attr second-label - The accessible label given to the second segment.
 * @attr period-label - The accessible label given to the period segment (AM/PM).
 * @attr disabled - Whether the element is disabled.
 * @attr readonly - Whether the element is read-only.
 * @attr required - Whether a value is required for the element.
 * @attr name - The name that identifies the element when submitting the associated form.
 *
 * @fires beforeinput - Dispatched before the value changes.
 * @fires input - Dispatched when the value changes.
 * @fires change - Dispatched when the value changes.
 * @fires invalid - Dispatched when a form is submitted and the element fails constraint validation.
 *
 * @cssprop --m3e-date-input-color - Color of the date input text when enabled.
 * @cssprop --m3e-date-input-disabled-color - Color of the date input text when disabled.
 * @cssprop --m3e-date-input-disabled-opacity - Opacity applied to the disabled date input text.
 * @cssprop --m3e-date-input-focused-container-color - Background color of the selected date input segment when focused.
 * @cssprop --m3e-date-input-focused-color - Text color of the selected date input segment when focused.
 */
let M3eDateInputElement = class M3eDateInputElement extends Dirty(Touched(Required(ConstraintValidation(FormAssociated(ReadOnly(Disabled(AttachInternals(Role(LitElement, "group")))))), false))) {
  constructor() {
    super(...arguments);
    _M3eDateInputElement_instances.add(this);
    /** @private */
    this._val = null;
    /** @private */
    _M3eDateInputElement_format.set(this, []);
    /** @private */
    _M3eDateInputElement_timeFormat.set(this, "12");
    /** @private */
    _M3eDateInputElement_changed.set(this, false);
    /** @private */
    _M3eDateInputElement_ignoreValueUpdate.set(this, false);
    /** @private */
    this._activeField = "month";
    /** @private */
    this._value = {};
    /** @private */
    this._buffer = {};
    /** The interaction mode for editing date and/or time values. */
    this.type = "date";
    /**
     * Whether to show seconds.
     * @default false
     */
    this.showSeconds = false;
    /**
     * Format used when editing time values.
     * @default "12"
     */
    this.timeFormat = "12";
    /**
     * The minimum date that can be selected.
     * @default null
     */
    this.minDate = null;
    /**
     * The maximum date that can be selected.
     * @default null
     */
    this.maxDate = null;
    /**
     * A function used to determine whether a date cannot be selected.
     * @default null
     */
    this.blackoutDates = null;
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
     * The accessible label given to the month segment.
     * @default "Month"
     */
    this.monthLabel = "Month";
    /**
     * The accessible label given to the day segment.
     * @default "Day"
     */
    this.dayLabel = "Day";
    /**
     * The accessible label given to the year segment.
     * @default "Year"
     */
    this.yearLabel = "Year";
    /**
     * The accessible label given to the hour segment.
     * @default "Hour"
     */
    this.hourLabel = "Hour";
    /**
     * The accessible label given to the minute segment.
     * @default "Minute"
     */
    this.minuteLabel = "Minute";
    /**
     * The accessible label given to the second segment.
     * @default "Second"
     */
    this.secondLabel = "Second";
    /**
     * The accessible label given to the period segment (AM/PM).
     * @default "Period"
     */
    this.periodLabel = "Period";
  }
  /**
   * The value of the input.
   * @default null
   */
  get value() {
    return this._val;
  }
  set value(value) {
    if (value && Number.isNaN(value.getTime())) {
      console.error("[m3e-date-input] Invalid date assigned to value");
      return;
    }
    this._val = value;
  }
  /** @inheritdoc @private */
  get [(_M3eDateInputElement_format = new WeakMap(), _M3eDateInputElement_timeFormat = new WeakMap(), _M3eDateInputElement_changed = new WeakMap(), _M3eDateInputElement_ignoreValueUpdate = new WeakMap(), _M3eDateInputElement_instances = new WeakSet(), formValue)]() {
    return !this.disabled ? this.value?.toISOString() ?? null : null;
  }
  /** @inheritdoc */
  get shouldLabelFloat() {
    return hasCustomState(this, "--focus") || !this._isEmpty;
  }
  /** @private */
  get _isEmpty() {
    if (this.value) return false;
    switch (this.type) {
      case "date":
        return this._value.year === undefined && this._value.month === undefined && this._value.day === undefined;
      case "time":
        return this._value.hour === undefined && this._value.minute === undefined && (!this.showSeconds || this._value.second === undefined) && (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "24" || this._value.period === undefined);
      case "datetime":
        return this._value.year === undefined && this._value.month === undefined && this._value.day === undefined && this._value.hour === undefined && this._value.minute === undefined && (!this.showSeconds || this._value.second === undefined) && (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "24" || this._value.period === undefined);
    }
  }
  /** @private */
  get _isPartiallyEmpty() {
    if (this.type === "date") {
      const any = this._value.year !== undefined || this._value.month !== undefined || this._value.day !== undefined;
      const all = this._value.year !== undefined && this._value.month !== undefined && this._value.day !== undefined;
      return any && !all;
    }
    if (this.type === "time") {
      const any = this._value.hour !== undefined || this._value.minute !== undefined || this.showSeconds && this._value.second !== undefined || __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12" && this._value.period !== undefined;
      const all = this._value.hour !== undefined && this._value.minute !== undefined && (!this.showSeconds || this._value.second !== undefined) && (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "24" || this._value.period !== undefined);
      return any && !all;
    }
    const any = this._value.year !== undefined || this._value.month !== undefined || this._value.day !== undefined || this._value.hour !== undefined || this._value.minute !== undefined || this.showSeconds && this._value.second !== undefined || __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12" && this._value.period !== undefined;
    const all = this._value.year !== undefined && this._value.month !== undefined && this._value.day !== undefined && this._value.hour !== undefined && this._value.minute !== undefined && (!this.showSeconds || this._value.second !== undefined) && (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "24" || this._value.period !== undefined);
    return any && !all;
  }
  /** @inheritdoc */
  get [defaultValidationMessages]() {
    switch (this.type) {
      case "date":
        return {
          ...super[defaultValidationMessages],
          typeMismatch: "Enter a valid date.",
          rangeUnderflow: "Date is too early.",
          rangeOverflow: "Date is too late.",
          customError: "Date is within a disabled range."
        };
      case "time":
        return {
          ...super[defaultValidationMessages],
          typeMismatch: "Enter a valid time.",
          rangeUnderflow: "Time is too early.",
          rangeOverflow: "Time is too late.",
          customError: "Time is within a disabled range."
        };
      case "datetime":
        return {
          ...super[defaultValidationMessages],
          typeMismatch: "Enter a valid date and time.",
          rangeUnderflow: "Date and time are too early.",
          rangeOverflow: "Date and time are too late.",
          customError: "Date and time are within a disabled range."
        };
    }
  }
  /** @internal */
  [validate]() {
    const validity = super[validate]();
    if (!validity && this._value && this.touched && !this.readOnly) {
      // Value is missing when required and empty
      if (this.required && this._isEmpty) {
        return {
          valueMissing: true
        };
      }
      // Type mismatch if partially populated
      if (this._isPartiallyEmpty) {
        return {
          typeMismatch: true
        };
      }
      if (this.value) {
        const validateDate = date => {
          if (this.minDate && date < this.minDate) return {
            rangeUnderflow: true
          };
          if (this.maxDate && date > this.maxDate) return {
            rangeOverflow: true
          };
          if (this.blackoutDates?.(date)) return {
            customError: true
          };
          return undefined;
        };
        const validateTime = date => {
          const parts = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
          };
          const mins = parts.hour * 60 + parts.minute + (parts.second ? parts.second / 60 : 0);
          if (this.minTime) {
            const min = this.minTime.hour * 60 + this.minTime.minute + (this.minTime.second ? this.minTime.second / 60 : 0);
            if (mins < min) return {
              rangeUnderflow: true
            };
          }
          if (this.maxTime) {
            const max = this.maxTime.hour * 60 + this.maxTime.minute + (this.maxTime.second ? this.maxTime.second / 60 : 0);
            if (mins > max) return {
              rangeOverflow: true
            };
          }
          if (this.blackoutTimes?.(parts)) return {
            customError: true
          };
          return undefined;
        };
        switch (this.type) {
          case "date":
            return validateDate(this.value);
          case "time":
            return validateTime(this.value);
          case "datetime":
            return validateDate(this.value) ?? validateTime(this.value);
        }
      }
    }
    return validity;
  }
  /** @inheritdoc */
  focus(options) {
    this.shadowRoot?.querySelector("[tabindex='0']")?.focus(options);
  }
  /** @inheritdoc */
  blur() {
    this.shadowRoot?.querySelector("[tabindex='0']")?.blur();
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("timeFormat")) {
      if (!isDateInputTimeFormat(this.timeFormat)) {
        this.timeFormat = "12";
      }
      __classPrivateFieldSet(this, _M3eDateInputElement_timeFormat, this.timeFormat !== "auto" ? this.timeFormat : new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric"
      }).resolvedOptions().hour12 ? "12" : "24", "f");
    }
    if (_changedProperties.has("type")) {
      if (!isDateInputType(this.type)) {
        this.type = "date";
      }
      switch (this.type) {
        case "date":
          __classPrivateFieldSet(this, _M3eDateInputElement_format, new Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }).formatToParts(), "f");
          break;
        case "time":
          __classPrivateFieldSet(this, _M3eDateInputElement_format, new Intl.DateTimeFormat(navigator.language, {
            hour: "numeric",
            minute: "numeric",
            hour12: __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12",
            ...(this.showSeconds ? {
              second: "numeric"
            } : {})
          }).formatToParts(), "f");
          break;
        case "datetime":
          __classPrivateFieldSet(this, _M3eDateInputElement_format, new Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12",
            ...(this.showSeconds ? {
              second: "numeric"
            } : {})
          }).formatToParts(), "f");
          break;
      }
      this._activeField = __classPrivateFieldGet(this, _M3eDateInputElement_format, "f").filter(x => ["month", "day", "year", "hour", "minute", "second"].includes(x.type))[0].type;
    }
    if (_changedProperties.has("value")) {
      if (!__classPrivateFieldGet(this, _M3eDateInputElement_ignoreValueUpdate, "f")) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValueBuffer).call(this);
      }
    }
    if (_changedProperties.has("value") || _changedProperties.has("_value")) {
      setCustomState(this, "--empty", this._isEmpty);
    }
    if (this.id && (_changedProperties.has("disabled") || _changedProperties.has("readOnly"))) {
      // When disabled or readonly and attached to a picker, automatically disable the picker's toggle button.
      const root = this.getRootNode();
      if (root) {
        // There could be a datepicker and timepicker associated with the input.
        const datepicker = root.querySelector(`m3e-datepicker[for="${this.id}"]`);
        if (datepicker?.id) {
          const toggle = root.querySelector(`m3e-datepicker-toggle[for="${datepicker.id}"]`);
          if (toggle && isDisabledMixin(toggle.parentElement)) {
            toggle.parentElement.disabled = this.disabled || this.readOnly;
          }
        }
        const timepicker = root.querySelector(`m3e-timepicker[for="${this.id}"]`);
        if (timepicker?.id) {
          const toggle = root.querySelector(`m3e-timepicker-toggle[for="${timepicker.id}"]`);
          if (toggle && isDisabledMixin(toggle.parentElement)) {
            toggle.parentElement.disabled = this.disabled || this.readOnly;
          }
        }
      }
    }
  }
  /** @inheritdoc */
  render() {
    // Intl is used to determine the order to present segments.
    return html`<div class="base" tabindex="-1" @pointerdown="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handlePointerDown)}" @focusout="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFocusOut)}">${__classPrivateFieldGet(this, _M3eDateInputElement_format, "f").map(part => {
      switch (part.type) {
        case "month":
          {
            // Use the long month name for ARIA value text.
            const valueText = this._value.month !== undefined ? new Intl.DateTimeFormat(navigator.language, {
              month: "long"
            }).format(new Date(2000, this._value.month - 1, 1)) : undefined;
            return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, part.type, this._buffer.month ?? this._value.month, 2, "mm", 1, 12, this.monthLabel, valueText);
          }
        case "day":
          {
            // To get max day: if year is undefined, use 2000; if month is undefined, use January
            const max = new Date(this._value.year ?? 2000, this._value.month ?? 1, 0).getDate();
            return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, part.type, this._buffer.day ?? this._value.day, 2, "dd", 1, max, this.dayLabel);
          }
        case "year":
          return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, part.type, this._buffer.year ?? this._value.year, 4, "yyyy", 1, 9999, this.yearLabel);
        case "hour":
          {
            const numeric = this._buffer.hour ?? this._value.hour;
            let displayValue = numeric;
            if (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12" && numeric !== undefined) {
              displayValue = Number(numeric) % 12 || 12;
            }
            return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, "hour", this._buffer.hour ?? this._value.hour, 2, "––", 0, 23, this.hourLabel, displayValue ? String(displayValue) : undefined, displayValue ? String(displayValue)?.padStart(2, "0") : undefined);
          }
        case "minute":
          return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, "minute", this._buffer.minute ?? this._value.minute, 2, "––", 0, 59, this.minuteLabel);
        case "second":
          return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, "second", this._buffer.second ?? this._value.second, 2, "––", 0, 59, this.secondLabel);
        // Treat AM/PM as a spinbutton with numeric values 0/1.
        case "dayPeriod":
          {
            const raw = this._buffer.period ?? this._value.period;
            const numeric = typeof raw === "string" ? Number(raw) : raw;
            // Locale-specific AM/PM text
            const valueText = new Intl.DateTimeFormat(navigator.language, {
              hour: "numeric",
              hour12: true
            }).formatToParts(new Date(2000, 0, 1, numeric === 1 ? 13 : 1)).find(x => x.type === "dayPeriod")?.value ?? (numeric === 1 ? "PM" : "AM");
            const displayValue = numeric !== undefined ? valueText : undefined;
            return __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_renderField).call(this, "period", numeric, 2, "––", 0, 1, this.periodLabel, valueText, displayValue);
          }
        case "literal":
          return html`<span class="segment literal" aria-hidden="true" @pointerdown="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleLiteralPointerDown)}">${part.value}</span>`;
        default:
          return nothing;
      }
    })}</div>`;
  }
};
_M3eDateInputElement_renderField = function _M3eDateInputElement_renderField(id, value, maxLength, placeholder, minValue, maxValue, label, valueText, displayValue) {
  if (!valueText && value !== undefined) {
    valueText = String(value).padStart(maxLength, "0");
  }
  return html`<span id="${id}" class="segment field" role="spinbutton" aria-label="${label}" aria-valuemin="${minValue}" aria-valuemax="${maxValue}" aria-valuenow="${ifDefined(value)}" aria-valuetext="${ifDefined(valueText)}" aria-disabled="${this.disabled}" aria-readonly="${this.readOnly}" contenteditable="${ifDefined(this.disabled ? undefined : true)}" spellcheck="false" autocapitalize="none" autocorrect="off" inputmode="${ifDefined(id !== "period" ? "numeric" : undefined)}" tabindex="${ifDefined(this.disabled ? undefined : id === this._activeField ? 0 : -1)}" @focus="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldFocus)}" @keydown="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldKeyDown)}" @wheel="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldWheel)}" @pointerdown="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldPointerDown)}" @drop="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldPreventDefault)}" @paste="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldPreventDefault)}" @beforeinput="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldPreventDefaultReadonly)}" @input="${__classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_handleFieldPreventDefaultReadonly)}">${displayValue ?? (value !== undefined ? String(value).padStart(maxLength, "0") : placeholder)}</span>`;
};
_M3eDateInputElement_handlePointerDown = function _M3eDateInputElement_handlePointerDown(e) {
  if (this.disabled) return;
  if (!e.defaultPrevented) {
    e.preventDefault();
    queueMicrotask(() => this.focus());
  }
};
_M3eDateInputElement_handleFocusOut = function _M3eDateInputElement_handleFocusOut(e) {
  if (e.relatedTarget instanceof HTMLSpanElement && e.relatedTarget.classList.contains("field") && this.shadowRoot?.contains(e.relatedTarget)) {
    __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, this._activeField, true);
    return;
  }
  // Commit active buffer.
  __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, this._activeField, false);
  // Always clear buffer and deselect all when leaving input
  this._buffer = {};
  __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_deselectAll).call(this);
  // Reset the active field to the first field segment when leaving input.
  this._activeField = __classPrivateFieldGet(this, _M3eDateInputElement_format, "f").filter(x => ["month", "day", "year", "hour", "minute", "second"].includes(x.type))[0].type;
  deleteCustomState(this, "--focus");
  if (__classPrivateFieldGet(this, _M3eDateInputElement_changed, "f")) {
    __classPrivateFieldSet(this, _M3eDateInputElement_changed, false, "f");
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
_M3eDateInputElement_commitBuffer = function _M3eDateInputElement_commitBuffer(id, emitEvent) {
  // Commit segment if buffer exists
  if (this._buffer[id] !== undefined) {
    const old = this._value[id];
    const next = Number(this._buffer[id]); // works for period too ("0"/"1")
    if (next !== old) {
      this._value = {
        ...this._value,
        [id]: next
      };
    }
  }
  // Clear only this segment's buffer
  this._buffer = {
    ...this._buffer,
    [id]: undefined
  };
  const {
    month,
    day,
    year,
    hour,
    minute,
    second,
    period
  } = this._value;
  let newDate = null;
  switch (this.type) {
    case "date":
      {
        if (year !== undefined && month !== undefined && day !== undefined) {
          // Use existing time if set; otherwise, these default to 0 (midnight).
          newDate = new Date(year, month - 1, __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_clampDay).call(this, day, month, year), __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_adjustHourForPeriod).call(this, hour, period) ?? 0, minute ?? 0, second ?? 0);
        }
        break;
      }
    case "time":
      {
        if (hour !== undefined && minute !== undefined && period !== undefined && (!this.showSeconds || second !== undefined) && (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "24" || this._value.period !== undefined)) {
          // Use existing date if set; otherwise, use current date.
          const current = year !== undefined && month !== undefined && day !== undefined ? {
            month,
            day,
            year
          } : __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this);
          newDate = new Date(current.year, current.month - 1, current.day, __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_adjustHourForPeriod).call(this, hour, period), minute, second ?? 0);
        }
        break;
      }
    case "datetime":
      {
        if (year !== undefined && month !== undefined && day !== undefined && hour !== undefined && minute !== undefined && (!this.showSeconds || second !== undefined) && (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "24" || this._value.period !== undefined)) {
          newDate = new Date(year, month - 1, __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_clampDay).call(this, day, month, year), __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_adjustHourForPeriod).call(this, hour, period), minute, second ?? 0);
        }
        break;
      }
  }
  // If neither date nor time was complete, nothing to update
  if (!newDate) return;
  // Emit change only if the date actually changed
  const oldValue = this.value;
  if (!oldValue || oldValue.getTime() !== newDate.getTime()) {
    this.value = newDate;
    if (emitEvent) {
      if (this.dispatchEvent(new Event("beforeinput", {
        bubbles: true,
        cancelable: true
      }))) {
        __classPrivateFieldSet(this, _M3eDateInputElement_changed, true, "f");
        this.dispatchEvent(new Event("input", {
          bubbles: true
        }));
      } else {
        this.value = oldValue;
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValueBuffer).call(this);
      }
      this.dispatchEvent(new Event("input", {
        bubbles: true
      }));
    } else {
      __classPrivateFieldSet(this, _M3eDateInputElement_changed, true, "f");
    }
  }
};
_M3eDateInputElement_handleFieldFocus = function _M3eDateInputElement_handleFieldFocus(e) {
  const field = e.target;
  this._activeField = field.id;
  __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_selectAll).call(this, field);
  addCustomState(this, "--focus");
};
_M3eDateInputElement_handleFieldKeyDown = function _M3eDateInputElement_handleFieldKeyDown(e) {
  const field = e.target;
  const id = field.id;
  switch (e.key) {
    case "Backspace":
    case "Delete":
      e.preventDefault();
      if (!this.readOnly) {
        if (this._value[id] !== undefined) {
          this._value = {
            ...this._value
          };
          this._value[id] = undefined;
          this._buffer = {
            ...this._buffer
          };
          this._buffer[id] = undefined;
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
        } else {
          const fields = [...(this.shadowRoot?.querySelectorAll(".field") ?? [])];
          const index = fields.indexOf(field);
          fields[index - 1]?.focus();
        }
      }
      break;
    case "ArrowLeft":
    case "Left":
      {
        e.preventDefault();
        const fields = [...(this.shadowRoot?.querySelectorAll(".field") ?? [])];
        const index = fields.indexOf(field);
        fields[index - 1]?.focus();
      }
      break;
    case "ArrowRight":
    case "Right":
      {
        e.preventDefault();
        const fields = [...(this.shadowRoot?.querySelectorAll(".field") ?? [])];
        const index = fields.indexOf(field);
        fields[index + 1]?.focus();
      }
      break;
    case "ArrowUp":
    case "Up":
      e.preventDefault();
      if (!this.readOnly) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
        const now = Number(field.ariaValueNow);
        const min = Number(field.ariaValueMin);
        const max = Number(field.ariaValueMax);
        this._value = {
          ...this._value
        };
        this._value[id] = !field.ariaValueNow ? __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this)[id] : now >= max ? min : now + 1;
        // Special handling for period (AM/PM)
        if (id === "hour") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
        } else if (id === "period") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
        }
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
      }
      break;
    case "ArrowDown":
    case "Down":
      e.preventDefault();
      if (!this.readOnly) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
        const now = Number(field.ariaValueNow);
        const min = Number(field.ariaValueMin);
        const max = Number(field.ariaValueMax);
        this._value = {
          ...this._value
        };
        this._value[id] = !field.ariaValueNow ? __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this)[id] : now <= min ? max : now - 1;
        // Special handling for period (AM/PM)
        if (id === "hour") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
        } else if (id === "period") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
        }
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
      }
      break;
    case "Home":
      e.preventDefault();
      if (!this.readOnly) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
        this._value = {
          ...this._value
        };
        this._value[id] = Number(field.ariaValueMin);
        // Special handling for period (AM/PM)
        if (id === "hour") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
        } else if (id === "period") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
        }
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
      }
      break;
    case "End":
      e.preventDefault();
      if (!this.readOnly) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
        this._value = {
          ...this._value
        };
        this._value[id] = Number(field.ariaValueMax);
        // Special handling for period (AM/PM)
        if (id === "hour") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
        } else if (id === "period") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
        }
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
      }
      break;
    case "PageUp":
      e.preventDefault();
      if (!this.readOnly) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
        const now = Number(field.ariaValueNow);
        const min = Number(field.ariaValueMin);
        const max = Number(field.ariaValueMax);
        this._value = {
          ...this._value
        };
        if (!field.ariaValueNow) {
          this._value[id] = __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this)[id];
        } else {
          const next = now + 5;
          this._value[id] = next > max ? min + (next - min) % (max - min + 1) : next;
        }
        // Special handling for period (AM/PM)
        if (id === "hour") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
        } else if (id === "period") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
        }
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
      }
      break;
    case "PageDown":
      e.preventDefault();
      if (!this.readOnly) {
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
        const now = Number(field.ariaValueNow);
        const min = Number(field.ariaValueMin);
        const max = Number(field.ariaValueMax);
        this._value = {
          ...this._value
        };
        if (!field.ariaValueNow) {
          this._value[id] = __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this)[id];
        } else {
          const next = now - 5;
          this._value[id] = next < min ? max - (min - next) % (max - min + 1) : next;
        }
        // Special handling for period (AM/PM)
        if (id === "hour") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
        } else if (id === "period") {
          __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
        }
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
      }
      break;
    case "Tab":
      break;
    default:
      {
        if (this.readOnly) {
          e.preventDefault();
          return;
        }
        // Special handling for period (AM/PM)
        if (id === "period") {
          if (e.key.toLowerCase() === "a") {
            this._buffer = {
              ...this._buffer
            };
            this._buffer.period = "0";
          } else if (e.key.toLowerCase() === "p") {
            this._buffer = {
              ...this._buffer
            };
            this._buffer.period = "1";
          }
          e.preventDefault();
          break;
        }
        // Block ctrl/meta combos and non‑digits
        if (this.readOnly || e.ctrlKey || e.metaKey || !/^\d$/.test(e.key)) {
          e.preventDefault();
          break;
        }
        const prev = this._buffer[id] ?? "";
        let min = Number(field.ariaValueMin);
        let max = Number(field.ariaValueMax);
        // Special handling for 12-hour clock typing.
        if (id === "hour" && __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12") {
          min = 1;
          max = 12;
        }
        // Build candidate buffer
        let next = prev + e.key;
        let num = Number(next);
        // If candidate exceeds max, try overwrite with single digit
        if (num > max) {
          const single = Number(e.key);
          if (single < min || single > max) {
            // Digit alone is invalid, reject
            e.preventDefault();
            break;
          }
          next = e.key;
          num = single;
        }
        if (num < min || num > max) {
          e.preventDefault();
          break;
        }
        this._buffer = {
          ...this._buffer
        };
        this._buffer[id] = next;
        // Auto‑advance if no more digits possible
        if (num * 10 > max) {
          const fields = [...(this.shadowRoot?.querySelectorAll(".field") ?? [])];
          const index = fields.indexOf(field);
          fields[index + 1]?.focus();
        }
        e.preventDefault();
        break;
      }
  }
};
_M3eDateInputElement_handleFieldWheel = function _M3eDateInputElement_handleFieldWheel(e) {
  const field = e.target;
  const id = field.id;
  e.preventDefault();
  if (!this.readOnly) {
    __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_commitBuffer).call(this, id, false);
    const now = Number(field.ariaValueNow);
    const min = Number(field.ariaValueMin);
    const max = Number(field.ariaValueMax);
    const delta = Math.sign(e.deltaY);
    this._value = {
      ...this._value
    };
    if (delta > 0) {
      this._value[id] = !field.ariaValueNow ? __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this)[id] : now <= min ? max : now - 1;
    } else if (delta < 0) {
      this._value[id] = !field.ariaValueNow ? __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this)[id] : now >= max ? min : now + 1;
    }
    // Special handling for period (AM/PM)
    if (id === "hour") {
      __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updatePeriodFromHour).call(this);
    } else if (id === "period") {
      __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateHourFromPeriod).call(this);
    }
    __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValue).call(this);
  }
};
_M3eDateInputElement_handleFieldPointerDown = function _M3eDateInputElement_handleFieldPointerDown(e) {
  if (this.disabled) return;
  e.preventDefault();
  const field = e.target;
  queueMicrotask(() => field.focus());
};
_M3eDateInputElement_handleFieldPreventDefault = function _M3eDateInputElement_handleFieldPreventDefault(e) {
  e.preventDefault();
};
_M3eDateInputElement_handleFieldPreventDefaultReadonly = function _M3eDateInputElement_handleFieldPreventDefaultReadonly(e) {
  if (this.readOnly) {
    e.preventDefault();
  }
};
_M3eDateInputElement_handleLiteralPointerDown = function _M3eDateInputElement_handleLiteralPointerDown(e) {
  if (this.disabled) return;
  e.preventDefault();
  // Focus previous or next field
  let element = e.target;
  while (element) {
    if (element.classList.contains("field")) {
      element.focus();
      return;
    }
    element = element.previousElementSibling;
  }
  element = e.target;
  while (element) {
    if (element.classList.contains("field")) {
      element.focus();
      return;
    }
    element = element.nextElementSibling;
  }
};
_M3eDateInputElement_getCurrent = function _M3eDateInputElement_getCurrent() {
  const current = new Date();
  return {
    month: current.getMonth() + 1,
    day: current.getDate(),
    year: current.getFullYear(),
    hour: current.getHours(),
    minute: current.getMinutes(),
    second: current.getSeconds(),
    period: current.getHours() >= 12 ? 1 : 0
  };
};
_M3eDateInputElement_updatePeriodFromHour = function _M3eDateInputElement_updatePeriodFromHour() {
  if (__classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12" && this._value.hour !== undefined && this._value.period !== undefined) {
    if (this._value.hour === 0) this._value.period = 0;else if (this._value.hour === 12) this._value.period = 1;else this._value.period = this._value.hour >= 12 ? 1 : 0;
  }
};
_M3eDateInputElement_updateHourFromPeriod = function _M3eDateInputElement_updateHourFromPeriod() {
  if (this._value.hour === undefined || this._value.period === undefined) return;
  const hour12 = this._value.hour % 12 || 12;
  let newHour = hour12;
  if (this._value.period === 1) newHour += 12;
  if (this._value.period === 0 && hour12 === 12) newHour = 0;
  this._value.hour = newHour;
};
_M3eDateInputElement_updateValue = /** @private */
async function _M3eDateInputElement_updateValue() {
  __classPrivateFieldSet(this, _M3eDateInputElement_ignoreValueUpdate, true, "f");
  try {
    const oldValue = this.value;
    let base = oldValue ?? new Date();
    switch (this.type) {
      case "date":
        {
          const {
            year,
            month,
            day
          } = this._value;
          if (year === undefined || month === undefined || day === undefined) {
            this.value = null;
            if (year === undefined && month === undefined && day === undefined) {
              // Reset time to midnight when clearing date.
              this._value = {
                ...this._value,
                hour: 0,
                minute: 0,
                second: 0,
                period: 0
              };
            }
          } else {
            if (!oldValue) {
              // Use midnight when creating a new date.
              base = new Date(base.getFullYear(), base.getMonth(), base.getDate());
            }
            const clampedDay = __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_clampDay).call(this, day, month, year);
            this._value = {
              ...this._value,
              day: clampedDay
            };
            this.value = new Date(year, month - 1, clampedDay, base.getHours(), base.getMinutes(), base.getSeconds());
          }
        }
        break;
      case "time":
        {
          const {
            hour,
            minute,
            second,
            period
          } = this._value;
          if (hour === undefined || minute === undefined || second === undefined || __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12" && period === undefined) {
            this.value = null;
            if (hour === undefined && minute === undefined && (!this.showSeconds || second === undefined)) {
              // Reset date to current date when clearing time.
              const {
                month,
                day,
                year
              } = __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_getCurrent).call(this);
              this._value = {
                ...this._value,
                month,
                day,
                year
              };
            }
          } else {
            this.value = new Date(base.getFullYear(), base.getMonth(), base.getDate(), __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_adjustHourForPeriod).call(this, hour, period), minute, second);
          }
        }
        break;
      case "datetime":
        {
          const {
            year,
            month,
            day,
            hour,
            minute,
            second,
            period
          } = this._value;
          if (year === undefined || month === undefined || day === undefined || hour === undefined || minute === undefined || second === undefined || __classPrivateFieldGet(this, _M3eDateInputElement_timeFormat, "f") === "12" && period === undefined) {
            this.value = null;
          } else {
            const clampedDay = __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_clampDay).call(this, day, month, year);
            this._value = {
              ...this._value,
              day: clampedDay
            };
            this.value = new Date(year, month - 1, clampedDay, __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_adjustHourForPeriod).call(this, hour, period), minute, second);
          }
        }
        break;
    }
    if (oldValue?.getTime() !== this.value?.getTime()) {
      if (this.dispatchEvent(new Event("beforeinput", {
        bubbles: true,
        cancelable: true
      }))) {
        __classPrivateFieldSet(this, _M3eDateInputElement_changed, true, "f");
        this.dispatchEvent(new Event("input", {
          bubbles: true
        }));
      } else {
        this.value = oldValue;
        __classPrivateFieldGet(this, _M3eDateInputElement_instances, "m", _M3eDateInputElement_updateValueBuffer).call(this);
      }
    }
    await waitForUpdate(this);
  } finally {
    __classPrivateFieldSet(this, _M3eDateInputElement_ignoreValueUpdate, false, "f");
  }
};
_M3eDateInputElement_updateValueBuffer = function _M3eDateInputElement_updateValueBuffer() {
  this._value = this.value ? {
    year: this.value.getFullYear(),
    month: this.value.getMonth() + 1,
    day: this.value.getDate(),
    hour: this.value.getHours(),
    minute: this.value.getMinutes(),
    second: this.value.getSeconds(),
    period: this.value.getHours() >= 12 ? 1 : 0
  } : {};
};
_M3eDateInputElement_adjustHourForPeriod = function _M3eDateInputElement_adjustHourForPeriod(hour, period) {
  if (hour !== undefined) {
    if (period === 1 && hour < 12) hour += 12;
    if (period === 0 && hour === 12) hour = 0;
  }
  return hour;
};
_M3eDateInputElement_clampDay = function _M3eDateInputElement_clampDay(day, month, year) {
  return Math.min(day, new Date(year, month, 0).getDate());
};
_M3eDateInputElement_selectAll = function _M3eDateInputElement_selectAll(field) {
  const range = document.createRange();
  range.selectNodeContents(field);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};
_M3eDateInputElement_deselectAll = function _M3eDateInputElement_deselectAll() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !this.shadowRoot) return;
  const range = selection.getRangeAt(0);
  if (this.shadowRoot.contains(range.startContainer) || this.shadowRoot.contains(range.endContainer)) {
    selection.removeAllRanges();
  }
};
/** The styles of the element. */
M3eDateInputElement.styles = css`:host { display: inline-block; text-align: start; } :host([hidden]) { display: none; } .base { display: inline-flex; width: 100%; align-items: center; flex-wrap: nowrap; overflow: hidden; vertical-align: middle; user-select: none; } :host(:not([aria-disabled="true"])) .base { color: var(--m3e-date-input-color, ${DesignToken.color.onSurface}); } :host([aria-disabled="true"]) .base { color: color-mix( in srgb, var(--m3e-date-input-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-date-input-disabled-opacity, 38%), transparent ); } .segment { flex: none; } .field { caret-color: transparent; outline: none; } .literal { white-space: pre; } .base, .segment { direction: ltr; } :host(:not(:is(:state(--focus), :--focus)):is(:state(--empty), :--empty)) .segment { opacity: 0; } :host(:not([aria-disabled="true"])) .base, :host(:not([aria-disabled="true"])) .segment { cursor: text; } :host(:not([aria-disabled="true"])) .segment { user-select: none; } :host([aria-disabled="true"]) .segment { user-select: text; } :host(:not([aria-disabled="true"])) .segment:focus, :host(:not([aria-disabled="true"])) .segment::selection { background-color: var(--m3e-date-input-focused-container-color, Highlight); color: var(--m3e-date-input-focused-color, HighlightText); }`;
__decorate([state()], M3eDateInputElement.prototype, "_activeField", void 0);
__decorate([state()], M3eDateInputElement.prototype, "_value", void 0);
__decorate([state()], M3eDateInputElement.prototype, "_buffer", void 0);
__decorate([property({
  converter: dateConverter
})], M3eDateInputElement.prototype, "value", null);
__decorate([property()], M3eDateInputElement.prototype, "type", void 0);
__decorate([property({
  attribute: "show-seconds",
  type: Boolean
})], M3eDateInputElement.prototype, "showSeconds", void 0);
__decorate([property({
  attribute: "time-format"
})], M3eDateInputElement.prototype, "timeFormat", void 0);
__decorate([property({
  attribute: "min-date",
  converter: dateConverter
})], M3eDateInputElement.prototype, "minDate", void 0);
__decorate([property({
  attribute: "max-date",
  converter: dateConverter
})], M3eDateInputElement.prototype, "maxDate", void 0);
__decorate([property({
  attribute: false
})], M3eDateInputElement.prototype, "blackoutDates", void 0);
__decorate([property({
  attribute: "min-time",
  converter: timeConverter
})], M3eDateInputElement.prototype, "minTime", void 0);
__decorate([property({
  attribute: "max-time",
  converter: timeConverter
})], M3eDateInputElement.prototype, "maxTime", void 0);
__decorate([property({
  attribute: false
})], M3eDateInputElement.prototype, "blackoutTimes", void 0);
__decorate([property({
  attribute: "month-label"
})], M3eDateInputElement.prototype, "monthLabel", void 0);
__decorate([property({
  attribute: "day-label"
})], M3eDateInputElement.prototype, "dayLabel", void 0);
__decorate([property({
  attribute: "year-label"
})], M3eDateInputElement.prototype, "yearLabel", void 0);
__decorate([property({
  attribute: "hour-label"
})], M3eDateInputElement.prototype, "hourLabel", void 0);
__decorate([property({
  attribute: "minute-label"
})], M3eDateInputElement.prototype, "minuteLabel", void 0);
__decorate([property({
  attribute: "second-label"
})], M3eDateInputElement.prototype, "secondLabel", void 0);
__decorate([property({
  attribute: "period-label"
})], M3eDateInputElement.prototype, "periodLabel", void 0);
M3eDateInputElement = __decorate([customElement("m3e-date-input")], M3eDateInputElement);

export { M3eDateInputElement, isDateInputTimeFormat, isDateInputType };
//# sourceMappingURL=date-input.js.map
