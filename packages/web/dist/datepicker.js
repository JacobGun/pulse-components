/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, nothing, unsafeCSS, css } from 'lit';
import { state, query, property } from 'lit/decorators.js';
import { HtmlFor, SuppressInitialAnimation, ReconnectedCallback, AttachInternals, Role, ScrollLockController, InertController, prefersReducedMotion, deleteCustomState, addCustomState, setCustomState, DesignToken, customElement, ActionElementBase } from './TextOverflowElement.js';
import { dateConverter } from './dateConverter.js';
import 'lit/directives/if-defined.js';
import { waitForUpdate } from './waitForUpdate.js';
import { positionAnchor } from './FloatingPanelElement.js';
import { M3eDirectionality } from './Directionality.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';
import './LiveAnnouncer.js';
import './ButtonElement.js';
import './CalendarElement.js';

/**
 * Determines whether a value is a `DatepickerVariant`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `DatepickerVariant`.
 */
function isDatepickerVariant(value) {
  return value === "docked" || value === "modal" || value === "auto";
}

var _M3eDatepickerElement_instances, _M3eDatepickerElement_closeTimeout, _M3eDatepickerElement_breakpointUnobserve, _M3eDatepickerElement_trigger, _M3eDatepickerElement_anchor, _M3eDatepickerElement_anchorCleanup, _M3eDatepickerElement_anchorLastPosition, _M3eDatepickerElement_scrollLockController, _M3eDatepickerElement_inertController, _M3eDatepickerElement_documentClickHandler, _M3eDatepickerElement_documentKeyDownHandler, _M3eDatepickerElement_toggleHandler, _M3eDatepickerElement_renderHeader, _M3eDatepickerElement_renderCalendar, _M3eDatepickerElement_renderActions, _M3eDatepickerElement_handleDocumentClick, _M3eDatepickerElement_handleCalendarChange, _M3eDatepickerElement_handleClearClick, _M3eDatepickerElement_handleDismissClick, _M3eDatepickerElement_handleConfirmClick, _M3eDatepickerElement_updateInput, _M3eDatepickerElement_handleDocumentKeyDown, _M3eDatepickerElement_initBreakpointMonitoring, _M3eDatepickerElement_updateVariant, _M3eDatepickerElement_updatePosition, _M3eDatepickerElement_clearAnchoring, _M3eDatepickerElement_clearSelectionState;
/**
 * Presents a date picker on a temporary surface.
 *
 * @description
 * The `m3e-datepicker` component provides a date‑selection experience
 * consistent with Material 3 guidance for layout, motion, and accessibility.
 * It displays a temporary surface that allows users to select a date or date
 * range using calendar-based views. The picker supports month, year, and
 * multi‑year views, enabling users to navigate across time efficiently.
 *
 * While open, the picker uses a focused selection flow. Users review their
 * choice and complete the interaction through confirm, dismiss, or clear
 * actions, ensuring intentional updates to the field or control that invoked it.
 *
 * It accepts and emits plain `Date` values, allowing applications to apply their
 * own formatting, parsing, and localization.
 *
 * @tag m3e-datepicker
 *
 * @attr variant - The appearance variant of the picker.
 * @attr clearable - Whether the user can clear the selected date and close the picker.
 * @attr date - The selected date.
 * @attr max-date - The maximum date that can be selected.
 * @attr min-date - The minimum date that can be selected.
 * @attr range - Whether a range of dates can be selected.
 * @attr range-end - End of a date range.
 * @attr range-start - Start of a date range.
 * @attr start-at - A date specifying the period (month or year) to start the calendar in.
 * @attr start-view - The initial view used to select a date.
 * @attr previous-month-label - The accessible label given to the button used to move to the previous month.
 * @attr next-month-label - The accessible label given to the button used to move to the next month.
 * @attr previous-year-label - The accessible label given to the button used to move to the previous year.
 * @attr next-year-label - The accessible label given to the button used to move to the next year.
 * @attr previous-multi-year-label - The accessible label given to the button used to move to the previous 24 years.
 * @attr next-multi-year-label - The accessible label given to the button used to move to the next 24 years.
 * @attr clear-label - The label given to the button used clear the selected date and close the picker.
 * @attr confirm-label - The label given to the button used apply the selected date and close the picker.
 * @attr dismiss-label - The label given to the button used discard the selected date and close the picker.
 * @attr label - The label given to the the picker.
 * @attr for - The identifier of the interactive control to which this element is attached.
 *
 * @fires change - Dispatched when the selected date changes.
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-datepicker-container-padding-block - Block‑axis padding of the date picker container.
 * @cssprop --m3e-datepicker-container-padding-inline - Inline‑axis padding of the date picker container.
 * @cssprop --m3e-datepicker-container-color - Background color of the standard container surface.
 * @cssprop --m3e-datepicker-container-elevation - Elevation shadow applied to the container surface.
 * @cssprop --m3e-datepicker-modal-headline-color - Color used for the modal headline text.
 * @cssprop --m3e-datepicker-modal-headline-font-size - Font size used for the modal headline text.
 * @cssprop --m3e-datepicker-modal-headline-font-weight - Font weight used for the modal headline text.
 * @cssprop --m3e-datepicker-modal-headline-line-height - Line height used for the modal headline text.
 * @cssprop --m3e-datepicker-modal-headline-tracking - Letter spacing used for the modal headline text.
 * @cssprop --m3e-datepicker-modal-supporting-text-color - Color used for supporting text in modal mode.
 * @cssprop --m3e-datepicker-modal-supporting-text-font-size - Font size used for supporting text in modal mode.
 * @cssprop --m3e-datepicker-modal-supporting-text-font-weight - Font weight used for supporting text in modal mode.
 * @cssprop --m3e-datepicker-modal-supporting-text-line-height - Line height used for supporting text in modal mode.
 * @cssprop --m3e-datepicker-modal-supporting-text-tracking - Letter spacing used for supporting text in modal mode.
 * @cssprop --m3e-datepicker-actions-padding-inline - Inline‑axis padding of the action row.
 * @cssprop --m3e-datepicker-docked-container-color - Background color of the container in docked mode.
 * @cssprop --m3e-datepicker-docked-container-shape - Corner radius of the container in docked mode.
 * @cssprop --m3e-datepicker-modal-container-color - Background color of the container in modal mode.
 * @cssprop --m3e-datepicker-modal-container-shape - Corner radius of the container in modal mode.
 * @cssprop --m3e-divider-thickness - Thickness of divider elements within the picker.
 * @cssprop --m3e-divider-color - Color of divider rules within the picker.
 * @cssprop --m3e-dialog-scrim-color - Base color used for the modal scrim behind the picker.
 * @cssprop --m3e-dialog-scrim-opacity - Opacity applied to the scrim color in modal mode.
 */
let M3eDatepickerElement = class M3eDatepickerElement extends HtmlFor(SuppressInitialAnimation(ReconnectedCallback(AttachInternals(Role(LitElement, "dialog"))))) {
  constructor() {
    super(...arguments);
    _M3eDatepickerElement_instances.add(this);
    /** @private */
    _M3eDatepickerElement_closeTimeout.set(this, -1);
    /** @private */
    this._open = false;
    /** @private */
    _M3eDatepickerElement_breakpointUnobserve.set(this, void 0);
    /** @private */
    _M3eDatepickerElement_trigger.set(this, void 0);
    /** @private */
    _M3eDatepickerElement_anchor.set(this, void 0);
    /** @private */
    _M3eDatepickerElement_anchorCleanup.set(this, void 0);
    /** @private */
    _M3eDatepickerElement_anchorLastPosition.set(this, void 0);
    /** @private */
    _M3eDatepickerElement_scrollLockController.set(this, new ScrollLockController(this));
    /** @private */
    _M3eDatepickerElement_inertController.set(this, new InertController(this));
    /** @private */
    _M3eDatepickerElement_documentClickHandler.set(this, e => __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_handleDocumentClick).call(this, e));
    /** @private */
    _M3eDatepickerElement_documentKeyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_handleDocumentKeyDown).call(this, e));
    /** @private */
    _M3eDatepickerElement_toggleHandler.set(this, e => {
      if (e.newState === "closed") {
        __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_clearSelectionState).call(this);
        __classPrivateFieldGet(this, _M3eDatepickerElement_anchorCleanup, "f")?.call(this);
        __classPrivateFieldSet(this, _M3eDatepickerElement_anchorCleanup, undefined, "f");
        __classPrivateFieldSet(this, _M3eDatepickerElement_anchorLastPosition, undefined, "f");
        clearTimeout(__classPrivateFieldGet(this, _M3eDatepickerElement_closeTimeout, "f"));
        if (!prefersReducedMotion()) {
          __classPrivateFieldSet(this, _M3eDatepickerElement_closeTimeout, setTimeout(() => this._open = false, 100), "f");
        } else {
          this._open = false;
        }
      }
    });
    /**
     * The appearance variant of the picker.
     * @default "docked"
     */
    this.variant = "docked";
    /**
     * The initial view used to select a date.
     * @default "month"
     */
    this.startView = "month";
    /**
     * The selected date.
     * @default null
     */
    this.date = null;
    /**
     * A date specifying the period (month or year) to start the calendar in.
     * @default null
     */
    this.startAt = null;
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
     * Whether a range of dates can be selected.
     * @default false
     */
    this.range = false;
    /**
     * Start of a date range.
     * @default null
     */
    this.rangeStart = null;
    /**
     * End of a date range.
     * @default null
     */
    this.rangeEnd = null;
    /**
     * A function used to determine whether a date cannot be selected.
     * @default null
     */
    this.blackoutDates = null;
    /**
     * A function used to determine whether a date is special.
     * @default null
     */
    this.specialDates = null;
    /**
     * The accessible label given to the button used to move to the previous month.
     * @default "Previous month"
     */
    this.previousMonthLabel = "Previous month";
    /**
     * The accessible label given to the button used to move to the previous year.
     * @default "Previous year"
     */
    this.previousYearLabel = "Previous year";
    /**
     * The accessible label given to the button used to move to the previous 24 years.
     * @default "Previous 24 years"
     */
    this.previousMultiYearLabel = "Previous 24 years";
    /**
     * The accessible label given to the button used to move to the next month.
     * @default "Next month"
     */
    this.nextMonthLabel = "Next month";
    /**
     * The accessible label given to the button used to move to the next year.
     * @default "Next year"
     */
    this.nextYearLabel = "Next year";
    /**
     * The accessible label given to the button used to move to the next 24 years.
     * @default "Next 24 years"
     */
    this.nextMultiYearLabel = "Next 24 years";
    /**
     * Whether the user can clear the selected date and close the picker.
     * @default false
     */
    this.clearable = false;
    /**
     * The label given to the button used clear the selected date and close the picker.
     * @default "Clear"
     */
    this.clearLabel = "Clear";
    /**
     * The label given to the button used apply the selected date and close the picker.
     * @default "OK"
     */
    this.confirmLabel = "OK";
    /**
     * The label given to the button used discard the selected date and close the picker.
     * @default "Cancel"
     */
    this.dismissLabel = "Cancel";
    /**
     * The label given to the the picker.
     * @default "Select date"
     */
    this.label = "Select date";
  }
  /** Whether the picker is open. */
  get isOpen() {
    return __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f") !== undefined;
  }
  /** The current variant applied to the picker. */
  get currentVariant() {
    return this._variant ?? (this.variant !== "modal" ? "docked" : "modal");
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
    this.setAttribute("popover", "manual");
    this.addEventListener("toggle", __classPrivateFieldGet(this, _M3eDatepickerElement_toggleHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._variant = undefined;
    __classPrivateFieldGet(this, _M3eDatepickerElement_breakpointUnobserve, "f")?.call(this);
    __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_clearAnchoring).call(this);
    deleteCustomState(this, "--docked");
    deleteCustomState(this, "--modal");
    this.removeEventListener("toggle", __classPrivateFieldGet(this, _M3eDatepickerElement_toggleHandler, "f"));
    document.removeEventListener("click", __classPrivateFieldGet(this, _M3eDatepickerElement_documentClickHandler, "f"));
    document.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eDatepickerElement_documentKeyDownHandler, "f"));
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    if (this.variant === "auto") {
      __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_initBreakpointMonitoring).call(this);
    }
  }
  /**
   * Opens the picker.
   * @param {HTMLElement} trigger The element that triggered the picker.
   * @param {HTMLElement | undefined} anchor The element used to position the picker.
   * @returns {Promise<void>} A `Promise` that resolves when the picker is opened.
   */
  async show(trigger, anchor) {
    if (__classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f") && __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f") !== trigger) {
      this.hide();
    }
    clearTimeout(__classPrivateFieldGet(this, _M3eDatepickerElement_closeTimeout, "f"));
    if (this.currentVariant === "modal") {
      __classPrivateFieldGet(this, _M3eDatepickerElement_scrollLockController, "f").lock();
      __classPrivateFieldGet(this, _M3eDatepickerElement_inertController, "f").lock();
    }
    // The calendar is rendered on demand
    this._open = true;
    // Wait for the calendar to render
    await waitForUpdate(this);
    const calendar = this._calendar;
    // When bound to a control, use the control's value.
    if (this.control) {
      this.date = this.control.value;
    }
    calendar.startView = this.startView;
    calendar.startAt = this.startAt;
    calendar.minDate = this.control?.minDate ?? this.minDate;
    calendar.maxDate = this.control?.maxDate ?? this.maxDate;
    calendar.date = this.date;
    calendar.rangeStart = this.rangeStart;
    calendar.rangeEnd = this.rangeEnd;
    calendar.specialDates = this.specialDates;
    calendar.blackoutDates = this.control?.blackoutDates ?? this.blackoutDates;
    await waitForUpdate(calendar);
    __classPrivateFieldSet(this, _M3eDatepickerElement_trigger, trigger, "f");
    __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f").ariaExpanded = "true";
    __classPrivateFieldSet(this, _M3eDatepickerElement_anchor, anchor, "f");
    await __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_updatePosition).call(this);
    this.showPopover();
    document.addEventListener("click", __classPrivateFieldGet(this, _M3eDatepickerElement_documentClickHandler, "f"));
    document.addEventListener("keydown", __classPrivateFieldGet(this, _M3eDatepickerElement_documentKeyDownHandler, "f"));
    await calendar.focusActiveCell();
  }
  /**
   * Hides the picker.
   * @param {boolean} [restoreFocus=false] Whether to restore focus to the picker's trigger.
   */
  hide(restoreFocus = false) {
    if (!this.isOpen) return;
    document.removeEventListener("click", __classPrivateFieldGet(this, _M3eDatepickerElement_documentClickHandler, "f"));
    document.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eDatepickerElement_documentKeyDownHandler, "f"));
    if (this.currentVariant === "modal") {
      __classPrivateFieldGet(this, _M3eDatepickerElement_scrollLockController, "f").unlock();
      __classPrivateFieldGet(this, _M3eDatepickerElement_inertController, "f").unlock();
    }
    this.hidePopover();
    if (__classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f")) {
      __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f").ariaExpanded = "false";
      if (restoreFocus) {
        __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f").focus();
      }
      __classPrivateFieldSet(this, _M3eDatepickerElement_trigger, undefined, "f");
    }
  }
  /**
   * Toggles the picker.
   * @param {HTMLElement} trigger The element that triggered the picker.
   * @param {HTMLElement | undefined} anchor The element used to position the picker.
   * @returns {Promise<void>} A `Promise` that resolves when the picker is opened or closed.
   */
  async toggle(trigger, anchor) {
    if (__classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f")) {
      this.hide();
    } else {
      await this.show(trigger, anchor);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-focus-trap ?disabled="${!this._open}">${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_renderHeader).call(this)}${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_renderCalendar).call(this)}${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_renderActions).call(this)}</m3e-focus-trap>`;
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (["date", "rangeStart", "rangeEnd"].some(x => changedProperties.has(x))) {
      __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_clearSelectionState).call(this);
    }
    if (changedProperties.has("rangeStart") && this.rangeStart) {
      this.range = true;
    }
    if (changedProperties.has("rangeStart") && this.rangeStart && !changedProperties.has("date")) {
      this.date = new Date(this.rangeStart);
    }
    if (changedProperties.has("rangeEnd") && this.rangeEnd && !changedProperties.has("date")) {
      this.date = new Date(this.rangeEnd);
    }
    if (changedProperties.has("variant")) {
      if (!isDatepickerVariant(this.variant)) {
        this.variant = "docked";
      }
      __classPrivateFieldGet(this, _M3eDatepickerElement_breakpointUnobserve, "f")?.call(this);
      if (this.variant === "auto") {
        __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_initBreakpointMonitoring).call(this);
      } else {
        this._variant = undefined;
        __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_updateVariant).call(this);
      }
    }
  }
};
_M3eDatepickerElement_closeTimeout = new WeakMap();
_M3eDatepickerElement_breakpointUnobserve = new WeakMap();
_M3eDatepickerElement_trigger = new WeakMap();
_M3eDatepickerElement_anchor = new WeakMap();
_M3eDatepickerElement_anchorCleanup = new WeakMap();
_M3eDatepickerElement_anchorLastPosition = new WeakMap();
_M3eDatepickerElement_scrollLockController = new WeakMap();
_M3eDatepickerElement_inertController = new WeakMap();
_M3eDatepickerElement_documentClickHandler = new WeakMap();
_M3eDatepickerElement_documentKeyDownHandler = new WeakMap();
_M3eDatepickerElement_toggleHandler = new WeakMap();
_M3eDatepickerElement_instances = new WeakSet();
_M3eDatepickerElement_renderHeader = function _M3eDatepickerElement_renderHeader() {
  if (this.currentVariant === "docked") return nothing;
  const rangeStart = this._rangeStart ?? this.rangeStart;
  const rangeEnd = this._rangeStart ? this._rangeEnd : this._rangeEnd ?? this.rangeEnd;
  const selectedDate = this._date ?? this.date;
  return html`<div class="supporting-text">${this.label}</div>${rangeStart ? html`<div class="headline">${new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "numeric"
  }).format(rangeStart) + " – " + (rangeEnd ? new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "numeric"
  }).format(rangeEnd) : "")}</div>` : html`<div class="headline">${selectedDate ? new Intl.DateTimeFormat(navigator.language, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(selectedDate) : "––"}</div>`}<div class="divider"></div>`;
};
_M3eDatepickerElement_renderCalendar = function _M3eDatepickerElement_renderCalendar() {
  // Calendar is rendered only when open
  return this._open ? html`<m3e-calendar class="calendar" @change="${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_handleCalendarChange)}"></m3e-calendar>` : nothing;
};
_M3eDatepickerElement_renderActions = function _M3eDatepickerElement_renderActions() {
  return html`<div class="actions">${this.clearable ? html`<m3e-button @click="${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_handleClearClick)}">${this.clearLabel}</m3e-button>` : nothing}<div class="spacer" aria-hidden="true"></div><m3e-button @click="${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_handleDismissClick)}">${this.dismissLabel}</m3e-button><m3e-button @click="${__classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_handleConfirmClick)}">${this.confirmLabel}</m3e-button></div>`;
};
_M3eDatepickerElement_handleDocumentClick = function _M3eDatepickerElement_handleDocumentClick(e) {
  if (this.isOpen && !e.composedPath().some(x => x === this || x === __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f"))) {
    this.hide();
  }
};
_M3eDatepickerElement_handleCalendarChange = function _M3eDatepickerElement_handleCalendarChange(e) {
  const calendar = e.target;
  this._date = calendar.date;
  this._rangeStart = calendar.rangeStart;
  this._rangeEnd = calendar.rangeEnd;
  if (this.range && !this._rangeStart && this._date) {
    this._rangeStart = new Date(this._date);
    calendar.rangeStart = this._rangeStart;
  }
};
_M3eDatepickerElement_handleClearClick = function _M3eDatepickerElement_handleClearClick() {
  this.date = null;
  this.rangeStart = null;
  this.rangeEnd = null;
  this.hide(true);
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
  __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_updateInput).call(this);
};
_M3eDatepickerElement_handleDismissClick = function _M3eDatepickerElement_handleDismissClick() {
  this.hide(true);
};
_M3eDatepickerElement_handleConfirmClick = function _M3eDatepickerElement_handleConfirmClick() {
  this.date = this._date ?? this.date;
  this.rangeStart = this._rangeStart === undefined ? this.rangeStart : this._rangeStart;
  this.rangeEnd = this._rangeEnd === undefined ? this.rangeEnd : this._rangeEnd;
  this.hide(true);
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
  __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_updateInput).call(this);
};
_M3eDatepickerElement_updateInput = /** @private */
async function _M3eDatepickerElement_updateInput() {
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
_M3eDatepickerElement_handleDocumentKeyDown = function _M3eDatepickerElement_handleDocumentKeyDown(e) {
  if (this.isOpen && this.currentVariant === "modal" && e.key === "Escape" && !e.shiftKey && !e.ctrlKey) {
    e.preventDefault();
    this.hide(true);
  }
};
_M3eDatepickerElement_initBreakpointMonitoring = function _M3eDatepickerElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eDatepickerElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall, Breakpoint.Small], matches => {
    this._variant = matches.get(Breakpoint.XSmall) || matches.get(Breakpoint.Small) ? "modal" : "docked";
    __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_updateVariant).call(this);
  }), "f");
};
_M3eDatepickerElement_updateVariant = function _M3eDatepickerElement_updateVariant() {
  switch (this.currentVariant) {
    case "docked":
      this.ariaModal = null;
      deleteCustomState(this, "--modal");
      addCustomState(this, "--docked");
      __classPrivateFieldGet(this, _M3eDatepickerElement_scrollLockController, "f").unlock();
      __classPrivateFieldGet(this, _M3eDatepickerElement_inertController, "f").unlock();
      break;
    case "modal":
      this.ariaModal = "true";
      deleteCustomState(this, "--docked");
      addCustomState(this, "--modal");
      if (this.isOpen) {
        __classPrivateFieldGet(this, _M3eDatepickerElement_scrollLockController, "f").lock();
        __classPrivateFieldGet(this, _M3eDatepickerElement_inertController, "f").lock();
      }
      break;
  }
  if (this.isOpen) {
    __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_updatePosition).call(this);
  }
};
_M3eDatepickerElement_updatePosition = /** @private */
async function _M3eDatepickerElement_updatePosition() {
  if (this.currentVariant === "docked" && __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f")) {
    __classPrivateFieldGet(this, _M3eDatepickerElement_anchorCleanup, "f")?.call(this);
    __classPrivateFieldSet(this, _M3eDatepickerElement_anchorLastPosition, undefined, "f");
    __classPrivateFieldSet(this, _M3eDatepickerElement_anchorCleanup, await positionAnchor(this, __classPrivateFieldGet(this, _M3eDatepickerElement_anchor, "f") ?? __classPrivateFieldGet(this, _M3eDatepickerElement_trigger, "f"), {
      position: "bottom-start",
      inline: true,
      flip: true,
      shift: "both"
    }, (x, y, position) => {
      setCustomState(this, "--top", position.includes("top"));
      setCustomState(this, "--bottom", position.includes("bottom"));
      if (__classPrivateFieldGet(this, _M3eDatepickerElement_anchorLastPosition, "f")?.dir !== M3eDirectionality.current || __classPrivateFieldGet(this, _M3eDatepickerElement_anchorLastPosition, "f")?.x !== x) {
        if (M3eDirectionality.current === "rtl") {
          this.style.right = `${window.innerWidth - x - this.clientWidth}px`;
          this.style.left = "";
        } else {
          this.style.left = `${x}px`;
          this.style.right = "";
        }
      }
      if (__classPrivateFieldGet(this, _M3eDatepickerElement_anchorLastPosition, "f")?.y !== y) {
        this.style.top = `${y}px`;
      }
      __classPrivateFieldSet(this, _M3eDatepickerElement_anchorLastPosition, {
        x,
        y,
        dir: M3eDirectionality.current
      }, "f");
    }), "f");
  } else {
    __classPrivateFieldGet(this, _M3eDatepickerElement_instances, "m", _M3eDatepickerElement_clearAnchoring).call(this);
  }
};
_M3eDatepickerElement_clearAnchoring = function _M3eDatepickerElement_clearAnchoring() {
  __classPrivateFieldGet(this, _M3eDatepickerElement_anchorCleanup, "f")?.call(this);
  __classPrivateFieldSet(this, _M3eDatepickerElement_anchorCleanup, undefined, "f");
  __classPrivateFieldSet(this, _M3eDatepickerElement_anchorLastPosition, undefined, "f");
  this.style.left = "";
  this.style.right = "";
  this.style.top = "";
};
_M3eDatepickerElement_clearSelectionState = function _M3eDatepickerElement_clearSelectionState() {
  this._date = this._rangeStart = this._rangeEnd = undefined;
};
/** The styles of the element. */
M3eDatepickerElement.styles = css`:host { flex-direction: column; margin: unset; border: unset; padding-block: var(--m3e-datepicker-container-padding-block, ${DesignToken.measurement.space150}); padding-inline: var(--m3e-datepicker-container-padding-inline, ${DesignToken.measurement.space50}); background-color: var(--m3e-datepicker-container-color, ${DesignToken.color.surfaceContainer}); box-shadow: var(--m3e-datepicker-container-elevation, ${DesignToken.elevation.level3}); opacity: 0; display: none; } :host([hidden]) { display: none; } .calendar { --m3e-calendar-container-color: transparent; --m3e-calendar-container-elevation: ${DesignToken.elevation.level0}; --m3e-calendar-container-shape: ${DesignToken.shape.corner.none}; } .headline { color: var(--m3e-datepicker-modal-headline-color, ${DesignToken.color.onSurfaceVariant}); font-size: var( --m3e-datepicker-modal-headline-font-size, ${DesignToken.typescale.standard.headline.large.fontSize} ); font-weight: var( --m3e-datepicker-modal-headline-font-weight, ${DesignToken.typescale.standard.headline.large.fontWeight} ); line-height: var( --m3e-datepicker-modal-headline-line-height, ${DesignToken.typescale.standard.headline.large.lineHeight} ); letter-spacing: var( --m3e-datepicker-modal-headline-tracking, ${DesignToken.typescale.standard.headline.large.tracking} ); margin-block-start: ${DesignToken.measurement.space450}; margin-block-end: ${DesignToken.measurement.space150}; margin-inline: ${DesignToken.measurement.space300}; } .supporting-text { color: var(--m3e-datepicker-modal-supporting-text-color, ${DesignToken.color.onSurfaceVariant}); font-size: var( --m3e-datepicker-modal-supporting-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize} ); font-weight: var( --m3e-datepicker-modal-supporting-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight} ); line-height: var( --m3e-datepicker-modal-supporting-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight} ); letter-spacing: var( --m3e-datepicker-modal-supporting-text-tracking, ${DesignToken.typescale.standard.label.large.tracking} ); margin-block-start: ${DesignToken.measurement.space200}; margin-inline: ${DesignToken.measurement.space300}; } .divider { height: var(--m3e-divider-thickness, 1px); width: 100%; position: relative; } .divider::before { content: ""; box-sizing: border-box; position: absolute; border-bottom: var(--m3e-divider-thickness, 1px) solid var(--m3e-divider-color, ${DesignToken.color.outlineVariant}); height: inherit; left: calc(0px - ${DesignToken.measurement.space50}); right: calc(0px - ${DesignToken.measurement.space50}); } .actions { display: flex; align-items: center; column-gap: ${DesignToken.measurement.space100}; padding-inline: var(--m3e-datepicker-actions-padding-inline, ${DesignToken.measurement.space100}); } .spacer { flex: 1 1 auto; } :host(:is(:state(--docked), :--docked)) { position: absolute; background-color: var(--m3e-datepicker-docked-container-color, ${DesignToken.color.surfaceContainer}); border-radius: var(--m3e-datepicker-docked-container-shape, ${DesignToken.shape.corner.large}); } :host(:is(:state(--modal), :--modal)) { position: fixed; inset: 0; margin: auto; transform-origin: top; background-color: var(--m3e-datepicker-modal-container-color, ${DesignToken.color.surfaceContainerHigh}); border-radius: var(--m3e-datepicker-modal-container-shape, ${DesignToken.shape.corner.extraLarge}); } :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard}, 
        transform ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard},
        overlay ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete,
        display ${DesignToken.motion.duration.short2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host { transform: scaleY(0.8); } :host(:popover-open) { transform: scaleY(1); display: inline-flex; opacity: 1; } :host(:is(:state(--docked), :--docked))::backdrop { background-color: transparent; } :host(:is(:state(--modal), :--modal))::backdrop { background-color: color-mix(in srgb, var(--m3e-dialog-scrim-color, ${DesignToken.color.scrim}) 0%, transparent); margin-inline-end: -20px; } :host(:is(:state(--modal), :--modal):not(:popover-open))::backdrop { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--modal), :--modal):popover-open)::backdrop { background-color: color-mix( in srgb, var(--m3e-dialog-scrim-color, ${DesignToken.color.scrim}) var(--m3e-dialog-scrim-opacity, 32%), transparent ); transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:is(:state(--bottom), :--bottom)) { transform-origin: top; } :host(:is(:state(--top), :--top)) { transform-origin: bottom; } @starting-style { :host(:popover-open) { transform: scaleY(0.8); } :host(:is(:state(--modal), :--modal):popover-open)::backdrop { background-color: color-mix(in srgb, var(--m3e-dialog-scrim-color, ${DesignToken.color.scrim}) 0%, transparent); } } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: none; } } @media (forced-colors: active) { :host { background-color: Menu; color: MenuText; border: 1px solid CanvasText; } }`;
__decorate([state()], M3eDatepickerElement.prototype, "_open", void 0);
__decorate([state()], M3eDatepickerElement.prototype, "_date", void 0);
__decorate([state()], M3eDatepickerElement.prototype, "_rangeStart", void 0);
__decorate([state()], M3eDatepickerElement.prototype, "_rangeEnd", void 0);
__decorate([query("m3e-calendar")], M3eDatepickerElement.prototype, "_calendar", void 0);
__decorate([state()], M3eDatepickerElement.prototype, "_variant", void 0);
__decorate([property()], M3eDatepickerElement.prototype, "variant", void 0);
__decorate([property({
  attribute: "start-view"
})], M3eDatepickerElement.prototype, "startView", void 0);
__decorate([property({
  converter: dateConverter
})], M3eDatepickerElement.prototype, "date", void 0);
__decorate([property({
  attribute: "start-at",
  converter: dateConverter
})], M3eDatepickerElement.prototype, "startAt", void 0);
__decorate([property({
  attribute: "min-date",
  converter: dateConverter
})], M3eDatepickerElement.prototype, "minDate", void 0);
__decorate([property({
  attribute: "max-date",
  converter: dateConverter
})], M3eDatepickerElement.prototype, "maxDate", void 0);
__decorate([property({
  type: Boolean
})], M3eDatepickerElement.prototype, "range", void 0);
__decorate([property({
  attribute: "range-start",
  converter: dateConverter
})], M3eDatepickerElement.prototype, "rangeStart", void 0);
__decorate([property({
  attribute: "range-end",
  converter: dateConverter
})], M3eDatepickerElement.prototype, "rangeEnd", void 0);
__decorate([property({
  attribute: false
})], M3eDatepickerElement.prototype, "blackoutDates", void 0);
__decorate([property({
  attribute: false
})], M3eDatepickerElement.prototype, "specialDates", void 0);
__decorate([property({
  attribute: "previous-month-label"
})], M3eDatepickerElement.prototype, "previousMonthLabel", void 0);
__decorate([property({
  attribute: "previous-year-label"
})], M3eDatepickerElement.prototype, "previousYearLabel", void 0);
__decorate([property({
  attribute: "previous-multi-year-label"
})], M3eDatepickerElement.prototype, "previousMultiYearLabel", void 0);
__decorate([property({
  attribute: "next-month-label"
})], M3eDatepickerElement.prototype, "nextMonthLabel", void 0);
__decorate([property({
  attribute: "next-year-label"
})], M3eDatepickerElement.prototype, "nextYearLabel", void 0);
__decorate([property({
  attribute: "next-multi-year-label"
})], M3eDatepickerElement.prototype, "nextMultiYearLabel", void 0);
__decorate([property({
  type: Boolean
})], M3eDatepickerElement.prototype, "clearable", void 0);
__decorate([property({
  attribute: "clear-label"
})], M3eDatepickerElement.prototype, "clearLabel", void 0);
__decorate([property({
  attribute: "confirm-label"
})], M3eDatepickerElement.prototype, "confirmLabel", void 0);
__decorate([property({
  attribute: "dismiss-label"
})], M3eDatepickerElement.prototype, "dismissLabel", void 0);
__decorate([property()], M3eDatepickerElement.prototype, "label", void 0);
M3eDatepickerElement = __decorate([customElement("m3e-datepicker")], M3eDatepickerElement);

/**
 * An element, nested within a clickable element, used to toggle a datepicker.
 * @tag m3e-datepicker-toggle
 */
let M3eDatepickerToggleElement = class M3eDatepickerToggleElement extends HtmlFor(ActionElementBase) {
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
    if (this.control instanceof M3eDatepickerElement && this.parentElement) {
      this.control.toggle(this.parentElement, this.closest("m3e-form-field") ?? undefined);
    }
  }
};
M3eDatepickerToggleElement = __decorate([customElement("m3e-datepicker-toggle")], M3eDatepickerToggleElement);

export { M3eDatepickerElement, M3eDatepickerToggleElement, isDatepickerVariant };
//# sourceMappingURL=datepicker.js.map
