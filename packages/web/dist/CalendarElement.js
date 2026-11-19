/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { css, LitElement, nothing, html, unsafeCSS } from 'lit';
import { query, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DesignToken, customElement, prefersReducedMotion } from './TextOverflowElement.js';
import { dateConverter } from './dateConverter.js';
import { waitForUpdate } from './waitForUpdate.js';
import { M3eDirectionality } from './Directionality.js';
import './ButtonElement.js';
import './IconButtonElement.js';
import './TooltipElement.js';
import { focusWhenReady } from './focusWhenReady.js';

/**
 * Determines whether a value is a `CalendarView`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CalendarView`.
 */
function isCalendarView(value) {
  return value === "month" || value === "year" || value === "multi-year";
}

/** @private */
function createDateWithOverflow(year, month, day) {
  const date = new Date();
  date.setFullYear(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}
/** @private */
function getStartingYear(minDate, maxDate) {
  if (maxDate) {
    return maxDate.getFullYear() - YEARS_PER_PAGE + 1;
  } else if (minDate) {
    return minDate.getFullYear();
  }
  return 0;
}
/** @private */
function euclideanModulo(a, b) {
  return (a % b + b) % b;
}
/** @internal */
function addCalendarDays(date, days) {
  return createDateWithOverflow(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
/** @internal */
function addCalendarMonths(date, months) {
  let newDate = createDateWithOverflow(date.getFullYear(), date.getMonth() + months, date.getDate());
  if (newDate.getMonth() != ((date.getMonth() + months) % 12 + 12) % 12) {
    newDate = createDateWithOverflow(newDate.getFullYear(), newDate.getMonth(), 0);
  }
  return newDate;
}
/** @internal */
function addCalendarYears(date, years) {
  return addCalendarMonths(date, years * 12);
}
/** @internal */
function getNumDaysInMonth(date) {
  return createDateWithOverflow(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
/** @internal */
function compareDate(first, second) {
  return first.getFullYear() - second.getFullYear() || first.getMonth() - second.getMonth() || first.getDate() - second.getDate();
}
/** @internal */
function sameDate(first, second) {
  return first && second ? compareDate(first, second) == 0 : first == second;
}
/** @internal */
function getActiveOffset(activeDate, minDate, maxDate) {
  return euclideanModulo(activeDate.getFullYear() - getStartingYear(minDate, maxDate), YEARS_PER_PAGE);
}
/** @internal */
function minYearOfPage(activeDate, minDate, maxDate) {
  return activeDate.getFullYear() - getActiveOffset(activeDate, minDate, maxDate);
}
/** @internal */
function maxYearOfPage(activeDate, minDate, maxDate) {
  return minYearOfPage(activeDate, minDate, maxDate) + YEARS_PER_PAGE - 1;
}
/** @internal */
function clampDate(date, minDate, maxDate) {
  if (minDate && compareDate(date, minDate) < 0) return minDate;
  if (maxDate && compareDate(date, maxDate) > 0) return maxDate;
  return date;
}
/** @internal */
const YEARS_PER_PAGE = 18;
/** @internal */
const YEARS_PER_ROW = 3;
/** @internal */
const MONTHS_PER_ROW = 4;

/**
 * A base implementation for a view in a calendar. This class must be inherited.
 * @internal
 */
class CalendarViewElementBase extends LitElement {
  constructor() {
    super(...arguments);
    /** Whether the view is active. */
    this.active = false;
    /** Today's date. */
    this.today = new Date();
    /** The selected date. */
    this.date = null;
    /** The active date. */
    this.activeDate = new Date();
    /** The minimum date that can be selected. */
    this.minDate = null;
    /** The maximum date that can be selected. */
    this.maxDate = null;
  }
  /**
   * Asynchronously focuses the active date.
   * @returns {Promise<void>} A promise that resolves after the active date has been focused.
   */
  async focusActiveCell() {
    await waitForUpdate(this);
    if (this._activeItem) {
      await focusWhenReady(this._activeItem);
    }
  }
  /** @internal */
  _changeActiveDate(activeDate) {
    activeDate = clampDate(activeDate, this.minDate, this.maxDate);
    if (!sameDate(activeDate, this.activeDate)) {
      this._activeItem?.style.setProperty("--m3e-state-layer-duration", "0ms");
      this._activeItem?.blur();
      this._activeItem?.style.removeProperty("--m3e-state-layer-duration");
      this.activeDate = activeDate;
      this.dispatchEvent(new Event("active-change", {
        bubbles: false
      }));
    }
  }
}
/** The styles of the element. */
CalendarViewElementBase.styles = css`:host { display: inline-block; user-select: none; vertical-align: top; } :host([hidden]) { display: none; } .visually-hidden { position: absolute; appearance: none; visibility: hidden; border: none; outline: none; overflow: hidden; left: 0; height: 1px; width: 1px; margin: -1px; padding: 0; white-space: nowrap; } table { border-collapse: collapse; border-spacing: 0; width: calc(48px * 7); } td, th { font: inherit; text-align: center; padding: unset; } td { box-sizing: border-box; height: 48px; padding: 4px; position: relative; color: var(--m3e-calendar-item-color, ${DesignToken.color.onSurface}); } .item, .item > span { position: relative; } .item { display: flex; align-items: center; justify-content: center; border-radius: inherit; outline: none; width: 100%; height: 100%; border-radius: ${DesignToken.shape.corner.full}; } .item:not([aria-disabled]) { cursor: pointer; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } .touch { position: absolute; height: 48px; width: 48px; margin: auto; } td:not(:has(.item[aria-disabled])).selected { color: var(--m3e-calendar-item-selected-color, ${DesignToken.color.onPrimary}); --m3e-ripple-color: var(--m3e-calendar-item-selected-ripple-color, ${DesignToken.color.onPrimary}); --m3e-state-layer-hover-color: var(--m3e-calendar-item-selected-hover-color, ${DesignToken.color.onPrimary}); --m3e-state-layer-focus-color: var(--m3e-calendar-item-selected-focus-color, ${DesignToken.color.onPrimary}); } td:not(:has(.item[aria-disabled])).selected .state-layer { background-color: var(--m3e-calendar-item-selected-container-color, ${DesignToken.color.primary}); } td.current:not(.selected):not(.special):not(.range-start):not(.range-end) { color: var(--m3e-calendar-item-current-outline-color, ${DesignToken.color.primary}); } td.current:not(.selected):not(.special):not(.range-start):not(.range-end) .state-layer { outline-style: solid; outline-offset: -1px; outline-width: var(--m3e-calendar-item-current-outline-thickness, 1px); outline-color: var(--m3e-calendar-item-current-outline-color, ${DesignToken.color.primary}); } td:has(.item[aria-disabled]) { color: color-mix( in srgb, var(--m3e-calendar-item-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-calendar-item-disabled-color-opacity, 38%), transparent ); } @media (forced-colors: active) { td:not(:has(.item[aria-disabled])).selected { forced-color-adjust: none; color: ButtonFace; } td:not(:has(.item[aria-disabled])).selected .state-layer { background-color: ButtonText; } td:has(.item[aria-disabled]) { color: GrayText; } td.current:not(.selected):not(.special):not(.range-start):not(.range-end) { color: ButtonText; } td.current:not(.selected):not(.special):not(.range-start):not(.range-end) .state-layer { border-color: ButtonText; } }`;
__decorate([query(".active > .item")], CalendarViewElementBase.prototype, "_activeItem", void 0);
__decorate([property({
  type: Boolean
})], CalendarViewElementBase.prototype, "active", void 0);
__decorate([property({
  converter: dateConverter
})], CalendarViewElementBase.prototype, "today", void 0);
__decorate([property({
  converter: dateConverter
})], CalendarViewElementBase.prototype, "date", void 0);
__decorate([property({
  attribute: "active-date",
  converter: dateConverter
})], CalendarViewElementBase.prototype, "activeDate", void 0);
__decorate([property({
  attribute: "min-date",
  converter: dateConverter
})], CalendarViewElementBase.prototype, "minDate", void 0);
__decorate([property({
  attribute: "max-date",
  converter: dateConverter
})], CalendarViewElementBase.prototype, "maxDate", void 0);

/**
 * Adapted from Angular Material Datepicker
 * Source: https://github.com/angular/components/blob/main/src/material/datepicker/month-view.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3eMonthViewElement_instances, _M3eMonthViewElement_renderItem, _M3eMonthViewElement_handleItemClick, _M3eMonthViewElement_handleItemKeyDown, _M3eMonthViewElement_handleItemMouseEnter, _M3eMonthViewElement_handleItemFocus, _M3eMonthViewElement_setRangeHighlight, _M3eMonthViewElement_clearRangeHighlight;
/**
 * An internal component used to display a single month in a calendar.
 * @internal
 */
let M3eMonthViewElement = class M3eMonthViewElement extends CalendarViewElementBase {
  constructor() {
    super(...arguments);
    _M3eMonthViewElement_instances.add(this);
    /** @internal */
    this._suppressFocusHighlight = true;
    /** Start of a date range. */
    this.rangeStart = null;
    /** End of a date range. */
    this.rangeEnd = null;
    /** A function used to determine whether a date cannot be selected. */
    this.blackoutDates = null;
    /** A function used to determine whether a date is special. */
    this.specialDates = null;
  }
  /** @inheritdoc */
  render() {
    const date = new Date(this.today);
    date.setDate(1);
    while (date.getDay() != 0) {
      date.setDate(date.getDate() + 1);
    }
    const weekdays = new Array();
    const narrowFormat = new Intl.DateTimeFormat(navigator.language, {
      weekday: "narrow"
    });
    const longFormat = new Intl.DateTimeFormat(navigator.language, {
      weekday: "long"
    });
    for (let i = 0; i < 7; i++) {
      weekdays.push({
        id: i,
        narrow: narrowFormat.format(date),
        long: longFormat.format(date)
      });
      date.setDate(date.getDate() + 1);
    }
    const year = this.activeDate.getFullYear();
    const month = this.activeDate.getMonth();
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const numDays = lastDate.getDate();
    let weeks = [];
    let dayOfWeek = firstDate.getDay();
    for (let i = 1; i <= numDays; i++) {
      if (dayOfWeek === 0 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(i);
      dayOfWeek = (dayOfWeek + 1) % 7;
    }
    weeks = weeks.filter(x => !!x.length);
    return html`<table role="grid"><thead><tr>${weekdays.map(x => html`<th scope="col"><span class="visually-hidden">${x.long}</span><div id="weekday-${x.id}-month-${month}" aria-hidden="true">${x.narrow}</div>${this.active ? html`<m3e-tooltip for="weekday-${x.id}-month-${month}">${x.long}</m3e-tooltip>` : nothing}</th>`)}</tr></thead><tbody>${weeks.map((row, i) => html`<tr role="row">${i === 0 && row.length < 7 ? html`<td colspan="${7 - row.length}"></td>` : nothing} ${row.map(y => __classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_renderItem).call(this, new Date(year, month, y)))} ${i > 0 && row.length < 7 ? html`<td colspan="${7 - row.length}"></td>` : nothing}</tr>`)}</tbody></table>`;
  }
};
_M3eMonthViewElement_instances = new WeakSet();
_M3eMonthViewElement_renderItem = function _M3eMonthViewElement_renderItem(value) {
  const long = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(value);
  const special = this.specialDates?.(value) ?? false;
  const selected = sameDate(this.date, value);
  const active = sameDate(this.activeDate, value);
  const current = sameDate(this.today, value);
  const disabled = this.minDate && compareDate(value, this.minDate) < 0 || this.maxDate && compareDate(value, this.maxDate) > 0 || this.blackoutDates?.(value) === true;
  const id = `date-${value.getMonth()}-${value.getDate()}-${value.getFullYear()}`;
  let range = false,
    rangeStart = false,
    rangeEnd = false,
    rangeStartRange = false;
  if (this.rangeStart) {
    if (!this.rangeEnd) {
      rangeStart = sameDate(value, this.rangeStart);
    } else {
      range = compareDate(value, this.rangeStart) > 0 && compareDate(value, this.rangeEnd) < 0;
      if (!range) {
        rangeStart = compareDate(value, this.rangeStart) >= 0 && compareDate(value, this.rangeEnd) < 0;
        if (!rangeStart) {
          rangeEnd = compareDate(value, this.rangeStart) > 0 && compareDate(value, this.rangeEnd) <= 0;
        } else {
          rangeStartRange = true;
        }
      }
    }
  }
  if (!this.active) {
    return html`<td role="gridcell" class="${classMap({
      current,
      selected,
      active,
      special,
      range,
      "range-start": rangeStart,
      "range-start-range": rangeStartRange,
      "range-end": rangeEnd
    })}"><div id="${id}" role="button" class="item" data-value="${value.toISOString()}" tabindex="${active ? "0" : "-1"}" aria-disabled="${ifDefined(disabled || undefined)}" aria-current="${ifDefined(current ? "date" : undefined)}" aria-pressed="${selected || rangeStart || rangeEnd}"><m3e-state-layer class="state-layer" disabled="disabled" disable-hover></m3e-state-layer><span aria-hidden="true">${value.getDate()}</span></div></td>`;
  }
  return html`<td role="gridcell" class="${classMap({
    current,
    selected,
    active,
    special,
    range,
    "range-start": rangeStart,
    "range-start-range": rangeStartRange,
    "range-end": rangeEnd
  })}"><div id="${id}" role="button" class="item" data-value="${value.toISOString()}" tabindex="${active ? "0" : "-1"}" aria-disabled="${ifDefined(disabled || undefined)}" aria-current="${ifDefined(current ? "date" : undefined)}" aria-pressed="${selected || rangeStart || rangeEnd}" @click="${__classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_handleItemClick)}" @mouseenter="${__classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_handleItemMouseEnter)}" @focus="${__classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_handleItemFocus)}" @mouseleave="${__classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_clearRangeHighlight)}" @blur="${__classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_clearRangeHighlight)}" @keydown="${__classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_handleItemKeyDown)}"><m3e-focus-ring class="focus-ring" for="${id}"></m3e-focus-ring><m3e-state-layer class="state-layer" for="${id}" ?disable-hover="${disabled}"></m3e-state-layer><m3e-ripple class="ripple" centered for="${id}" ?disabled="${disabled}"></m3e-ripple><div class="touch"></div><span class="visually-hidden">${long}</span> <span aria-hidden="true">${value.getDate()}</span></div></td>`;
};
_M3eMonthViewElement_handleItemClick = function _M3eMonthViewElement_handleItemClick(e) {
  const item = e.currentTarget;
  if (item.ariaDisabled === "true" || !item.dataset["value"]) return;
  this.activeDate = new Date(item.dataset["value"]);
  this.activeDate = clampDate(this.activeDate, this.minDate, this.maxDate);
  if (this.rangeEnd) {
    this.rangeStart = this.activeDate;
    this.rangeEnd = null;
    __classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_clearRangeHighlight).call(this);
  } else if (this.rangeStart) {
    if (compareDate(this.activeDate, this.rangeStart) < 0) {
      this.rangeStart = this.activeDate;
      this.rangeEnd = null;
    } else {
      this.rangeEnd = this.activeDate;
    }
    __classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_clearRangeHighlight).call(this);
  }
  this.dispatchEvent(new Event("change", {
    bubbles: false
  }));
};
_M3eMonthViewElement_handleItemKeyDown = function _M3eMonthViewElement_handleItemKeyDown(e) {
  let activeDate = this.activeDate;
  switch (e.key) {
    case " ":
    case "Enter":
      e.preventDefault();
      e.currentTarget.click();
      return;
    case "ArrowLeft":
    case "Left":
      activeDate = addCalendarDays(activeDate, M3eDirectionality.current === "rtl" ? 1 : -1);
      break;
    case "ArrowRight":
    case "Right":
      activeDate = addCalendarDays(activeDate, M3eDirectionality.current === "rtl" ? -1 : 1);
      break;
    case "ArrowUp":
    case "Up":
      activeDate = addCalendarDays(activeDate, -7);
      break;
    case "ArrowDown":
    case "Down":
      activeDate = addCalendarDays(activeDate, 7);
      break;
    case "Home":
      activeDate = addCalendarDays(activeDate, 1 - activeDate.getDate());
      break;
    case "End":
      activeDate = addCalendarDays(activeDate, getNumDaysInMonth(activeDate) - activeDate.getDate());
      break;
    case "PageUp":
      activeDate = e.altKey ? addCalendarYears(activeDate, -1) : addCalendarMonths(activeDate, -1);
      break;
    case "PageDown":
      activeDate = e.altKey ? addCalendarYears(activeDate, 1) : addCalendarMonths(activeDate, 1);
      break;
    default:
      return;
  }
  e.preventDefault();
  this._changeActiveDate(activeDate);
};
_M3eMonthViewElement_handleItemMouseEnter = function _M3eMonthViewElement_handleItemMouseEnter(e) {
  __classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_setRangeHighlight).call(this, e.currentTarget);
};
_M3eMonthViewElement_handleItemFocus = function _M3eMonthViewElement_handleItemFocus(e) {
  if (!this._suppressFocusHighlight) {
    __classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_setRangeHighlight).call(this, e.currentTarget);
  }
};
_M3eMonthViewElement_setRangeHighlight = function _M3eMonthViewElement_setRangeHighlight(item) {
  __classPrivateFieldGet(this, _M3eMonthViewElement_instances, "m", _M3eMonthViewElement_clearRangeHighlight).call(this);
  if (this.rangeStart && !this.rangeEnd && item.dataset["value"]) {
    if (compareDate(new Date(item.dataset["value"]), this.rangeStart) > 0) {
      item.parentElement.classList.add("range-highlight-end");
    }
    for (const cell of item.closest("table")?.querySelectorAll(".item") ?? []) {
      if (cell === item) break;
      const value = new Date(cell.dataset["value"]);
      if (compareDate(value, this.rangeStart) > 0) {
        cell.parentElement.classList.add("range-highlight");
      } else if (compareDate(value, this.rangeStart) >= 0) {
        cell.parentElement.classList.add("range-highlight-start");
      }
    }
  }
};
_M3eMonthViewElement_clearRangeHighlight = function _M3eMonthViewElement_clearRangeHighlight() {
  if (this.rangeStart) {
    this.shadowRoot?.querySelectorAll(".range-highlight,.range-highlight-end,.range-highlight-start").forEach(x => x.classList.remove("range-highlight", "range-highlight-end", "range-highlight-start"));
  }
};
/** The styles of the element. */
M3eMonthViewElement.styles = [CalendarViewElementBase.styles, css`thead { font-size: var(--m3e-calendar-weekday-font-size, ${DesignToken.typescale.standard.title.small.fontSize}); font-weight: var(--m3e-calendar-weekday-font-weight, ${DesignToken.typescale.standard.title.small.fontWeight}); line-height: var(--m3e-calendar-weekday-line-height, ${DesignToken.typescale.standard.title.small.lineHeight}); letter-spacing: var(--m3e-calendar-weekday-tracking, ${DesignToken.typescale.standard.title.small.tracking}); color: var(--m3e-calendar-weekday-color, ${DesignToken.color.onSurface}); } th { box-sizing: border-box; height: 48px; padding: 4px; } tbody { font-size: var(--m3e-calendar-date-font-size, ${DesignToken.typescale.standard.body.medium.fontSize}); font-weight: var(--m3e-calendar-date-font-weight, ${DesignToken.typescale.standard.body.medium.fontWeight}); line-height: var(--m3e-calendar-date-line-height, ${DesignToken.typescale.standard.body.medium.lineHeight}); letter-spacing: var(--m3e-calendar-date-tracking, ${DesignToken.typescale.standard.body.medium.tracking}); } td:not(:has(.item[aria-disabled])):not(.selected):not(.range-start):not(.range-end).special { color: var(--m3e-calendar-item-special-color, ${DesignToken.color.onTertiaryContainer}); --m3e-ripple-color: var(--m3e-calendar-item-special-ripple-color, ${DesignToken.color.onTertiaryContainer}); --m3e-state-layer-hover-color: var( --m3e-calendar-item-special-hover-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-calendar-item-special-focus-color, ${DesignToken.color.onTertiaryContainer} ); } td:not(:has(.item[aria-disabled])):not(.selected):not(.range-start):not(.range-end).special .state-layer { background-color: var(--m3e-calendar-item-special-container-color, ${DesignToken.color.tertiaryContainer}); } td:not(:has(.item[aria-disabled])).range-start, td:not(:has(.item[aria-disabled])).range-end { color: var(--m3e-calendar-item-selected-color, ${DesignToken.color.onPrimary}); --m3e-ripple-color: var(--m3e-calendar-item-selected-ripple-color, ${DesignToken.color.onPrimary}); } td:not(:has(.item[aria-disabled])).range-start .state-layer, td:not(:has(.item[aria-disabled])).range-end .state-layer { background-color: var(--m3e-calendar-item-selected-container-color, ${DesignToken.color.primary}); } td:not(:has(.item[aria-disabled])).range::before, td:not(:has(.item[aria-disabled])).range-start-range::before, td:not(:has(.item[aria-disabled])).range-end::before { content: ""; position: absolute; left: 0; right: 0; top: 4px; bottom: 4px; background-color: var(--m3e-calendar-range-container-color, ${DesignToken.color.primaryContainer}); } td:not(:has(.item[aria-disabled])):not(.selected).range { color: var(--m3e-calendar-range-color, ${DesignToken.color.onPrimaryContainer}); } td:not(:has(.item[aria-disabled])).range-start::before { inset-inline-start: 50%; width: 50%; } td:not(:has(.item[aria-disabled])).range-end::before { inset-inline-end: 50%; width: 50%; } td:not(:has(.item[aria-disabled])).range-highlight-start .item::after, td:not(:has(.item[aria-disabled])).range-highlight .item::after, td:not(:has(.item[aria-disabled])).range-highlight-end .item::after { content: ""; position: absolute; top: 0; left: calc(0px - 3px); right: calc(0px - 3px); bottom: 0; border-style: dashed; border-color: ${DesignToken.color.primary}; border-width: 1px; } td:not(:has(.item[aria-disabled])).range-highlight-start .item::after { margin-inline-start: 50%; } td:not(:has(.item[aria-disabled])).range-highlight-end .item::after { margin-inline-end: 3px; } td:not(:has(.item[aria-disabled])).range-highlight-start .item::after, td:not(:has(.item[aria-disabled])).range-highlight .item::after { border-inline-style: none; } td:not(:has(.item[aria-disabled])).range-highlight-end .item::after { border-start-end-radius: ${DesignToken.shape.corner.full}; border-end-end-radius: ${DesignToken.shape.corner.full}; border-inline-start-style: none; } @media (forced-colors: active) { td:not(:has(.item[aria-disabled])).range-start, td:not(:has(.item[aria-disabled])).range-end { forced-color-adjust: none; color: HighlightText; } td:not(:has(.item[aria-disabled])).range-start .state-layer, td:not(:has(.item[aria-disabled])).range-end .state-layer { background-color: Highlight; } td:not(:has(.item[aria-disabled])).range::before, td:not(:has(.item[aria-disabled])).range-start-range::before, td:not(:has(.item[aria-disabled])).range-end::before { background-color: Highlight; } td:not(:has(.item[aria-disabled])):not(.selected).range { forced-color-adjust: none; color: HighlightText; } td:not(:has(.item[aria-disabled])).range-highlight-start .item::after, td:not(:has(.item[aria-disabled])).range-highlight .item::after, td:not(:has(.item[aria-disabled])).range-highlight-end .item::after { border-color: GrayText; } }`];
__decorate([property({
  attribute: "range-start",
  converter: dateConverter
})], M3eMonthViewElement.prototype, "rangeStart", void 0);
__decorate([property({
  attribute: "range-end",
  converter: dateConverter
})], M3eMonthViewElement.prototype, "rangeEnd", void 0);
__decorate([property({
  attribute: false
})], M3eMonthViewElement.prototype, "blackoutDates", void 0);
__decorate([property({
  attribute: false
})], M3eMonthViewElement.prototype, "specialDates", void 0);
M3eMonthViewElement = __decorate([customElement("m3e-month-view")], M3eMonthViewElement);

/**
 * Adapted from Angular Material Datepicker
 * Source: https://github.com/angular/components/blob/main/src/material/datepicker/multi-year-view.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3eMultiYearViewElement_instances, _M3eMultiYearViewElement_renderItem, _M3eMultiYearViewElement_handleItemClick, _M3eMultiYearViewElement_handleItemKeyDown;
/**
 * An internal component used to display a year selector in a calendar.
 * @internal
 */
let M3eMultiYearViewElement = class M3eMultiYearViewElement extends CalendarViewElementBase {
  constructor() {
    super(...arguments);
    _M3eMultiYearViewElement_instances.add(this);
  }
  /** @inheritdoc */
  render() {
    const years = new Array();
    const minYear = minYearOfPage(this.activeDate, this.minDate, this.maxDate);
    for (let i = 0, row = []; i < YEARS_PER_PAGE; i++) {
      row.push(minYear + i);
      if (row.length === YEARS_PER_ROW) {
        years.push(row);
        row = new Array();
      }
    }
    return html`<table role="grid"><thead aria-hidden="true"><tr><th colspan="${YEARS_PER_ROW}"></th></tr></thead><tbody>${years.map(row => html`<tr role="row">${row.map(year => __classPrivateFieldGet(this, _M3eMultiYearViewElement_instances, "m", _M3eMultiYearViewElement_renderItem).call(this, year))}</tr>`)}</tbody></table>`;
  }
};
_M3eMultiYearViewElement_instances = new WeakSet();
_M3eMultiYearViewElement_renderItem = function _M3eMultiYearViewElement_renderItem(year) {
  const yearFormat = new Intl.DateTimeFormat(navigator.language, {
    year: "numeric"
  });
  const active = this.activeDate.getFullYear() === year;
  const selected = this.date?.getFullYear() === year;
  const current = this.today.getFullYear() === year;
  const disabled = this.minDate && year < this.minDate.getFullYear() || this.maxDate && year > this.maxDate.getFullYear();
  const id = `year-${year}`;
  if (!this.active) {
    return html`<td role="gridcell" class="${classMap({
      current,
      selected,
      active
    })}"><div id="${id}" class="item" role="button" tabindex="${active ? "0" : "-1"}" data-value="${year}" aria-disabled="${ifDefined(disabled || undefined)}" aria-current="${ifDefined(current ? "date" : undefined)}" aria-pressed="${selected}"><m3e-state-layer class="state-layer" disabled="disabled" disable-hover></m3e-state-layer><span>${yearFormat.format(new Date(year, 0, 1))}</span></div></td>`;
  }
  return html`<td role="gridcell" class="${classMap({
    current,
    selected,
    active
  })}"><div id="${id}" class="item" role="button" tabindex="${active ? "0" : "-1"}" data-value="${year}" aria-disabled="${ifDefined(disabled || undefined)}" aria-current="${ifDefined(current ? "date" : undefined)}" aria-pressed="${selected}" @click="${__classPrivateFieldGet(this, _M3eMultiYearViewElement_instances, "m", _M3eMultiYearViewElement_handleItemClick)}" @keydown="${__classPrivateFieldGet(this, _M3eMultiYearViewElement_instances, "m", _M3eMultiYearViewElement_handleItemKeyDown)}"><m3e-focus-ring class="focus-ring" for="${id}"></m3e-focus-ring><m3e-state-layer class="state-layer" for="${id}" ?disable-hover="${disabled}"></m3e-state-layer><m3e-ripple class="ripple" for="${id}" centered ?disabled="${disabled}"></m3e-ripple><div class="touch"></div><span>${yearFormat.format(new Date(year, 0, 1))}</span></div></td>`;
};
_M3eMultiYearViewElement_handleItemClick = function _M3eMultiYearViewElement_handleItemClick(e) {
  const item = e.currentTarget;
  if (item.ariaDisabled === "true" || !item.dataset["value"]) return;
  this.activeDate = new Date(this.activeDate);
  this.activeDate.setFullYear(Number(item.dataset["value"]));
  this.activeDate = clampDate(this.activeDate, this.minDate, this.maxDate);
  this.dispatchEvent(new Event("change", {
    bubbles: false
  }));
};
_M3eMultiYearViewElement_handleItemKeyDown = function _M3eMultiYearViewElement_handleItemKeyDown(e) {
  let activeDate = this.activeDate;
  switch (e.key) {
    case " ":
    case "Enter":
      e.preventDefault();
      e.currentTarget.click();
      return;
    case "ArrowLeft":
    case "Left":
      activeDate = addCalendarYears(activeDate, M3eDirectionality.current === "rtl" ? 1 : -1);
      break;
    case "ArrowRight":
    case "Right":
      activeDate = addCalendarYears(activeDate, M3eDirectionality.current === "rtl" ? -1 : 1);
      break;
    case "ArrowUp":
    case "Up":
      activeDate = addCalendarYears(activeDate, -YEARS_PER_ROW);
      break;
    case "ArrowDown":
    case "Down":
      activeDate = addCalendarYears(activeDate, YEARS_PER_ROW);
      break;
    case "Home":
      activeDate = addCalendarYears(activeDate, -getActiveOffset(activeDate, this.minDate, this.maxDate));
      break;
    case "End":
      activeDate = addCalendarYears(activeDate, YEARS_PER_PAGE - getActiveOffset(activeDate, this.minDate, this.maxDate) - 1);
      break;
    case "PageUp":
      activeDate = addCalendarYears(activeDate, e.altKey ? -YEARS_PER_PAGE * 10 : -YEARS_PER_PAGE);
      break;
    case "PageDown":
      activeDate = addCalendarYears(activeDate, e.altKey ? YEARS_PER_PAGE * 10 : YEARS_PER_PAGE);
      break;
    default:
      return;
  }
  e.preventDefault();
  this._changeActiveDate(activeDate);
};
/** The styles of the element. */
M3eMultiYearViewElement.styles = [CalendarViewElementBase.styles, css`.item { height: 36px; } .touch { width: 100%; } th { height: 0px; } td { padding-inline: 16px; padding-block: 8px; } tbody { font-size: var(--m3e-calendar-item-font-size, ${DesignToken.typescale.standard.body.medium.fontSize}); font-weight: var(--m3e-calendar-item-font-weight, ${DesignToken.typescale.standard.body.medium.fontWeight}); line-height: var(--m3e-calendar-item-line-height, ${DesignToken.typescale.standard.body.medium.lineHeight}); letter-spacing: var(--m3e-calendar-item-tracking, ${DesignToken.typescale.standard.body.medium.tracking}); }`];
M3eMultiYearViewElement = __decorate([customElement("m3e-multi-year-view")], M3eMultiYearViewElement);

/**
 * Adapted from Angular Material Datepicker
 * Source: https://github.com/angular/components/blob/main/src/material/datepicker/year-view.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3eYearViewElement_instances, _M3eYearViewElement_renderItem, _M3eYearViewElement_handleItemClick, _M3eYearViewElement_handleItemKeyDown;
/**
 * An internal component used to display a single year in a calendar.
 * @internal
 */
let M3eYearViewElement = class M3eYearViewElement extends CalendarViewElementBase {
  constructor() {
    super(...arguments);
    _M3eYearViewElement_instances.add(this);
  }
  /** @inheritdoc */
  render() {
    const months = new Array();
    const shortFormat = new Intl.DateTimeFormat(navigator.language, {
      month: "short"
    });
    const longFormat = new Intl.DateTimeFormat(navigator.language, {
      month: "long"
    });
    const year = this.activeDate.getFullYear();
    for (let month = 0, row = new Array(); month < 12; month++) {
      const date = new Date(year, month, 1);
      row.push({
        narrow: shortFormat.format(date),
        long: longFormat.format(date),
        date: date
      });
      if (row.length == MONTHS_PER_ROW) {
        months.push(row);
        row = [];
      }
    }
    return html`<table role="grid"><thead aria-hidden="true"><tr><th colspan="${MONTHS_PER_ROW}"></th></tr></thead><tbody>${months.map(row => html`<tr role="row">${row.map(month => __classPrivateFieldGet(this, _M3eYearViewElement_instances, "m", _M3eYearViewElement_renderItem).call(this, month))}</tr>`)}</tbody></table>`;
  }
};
_M3eYearViewElement_instances = new WeakSet();
_M3eYearViewElement_renderItem = function _M3eYearViewElement_renderItem(month) {
  const active = this.activeDate.getFullYear() === month.date.getFullYear() && this.activeDate.getMonth() === month.date.getMonth();
  const selected = this.date?.getFullYear() === month.date.getFullYear() && this.date?.getMonth() === month.date.getMonth();
  const current = this.today.getFullYear() === month.date.getFullYear() && this.today.getMonth() === month.date.getMonth();
  const disabled = this.minDate && (month.date.getFullYear() < this.minDate.getFullYear() || month.date.getFullYear() === this.minDate.getFullYear() && month.date.getMonth() < this.minDate.getMonth()) || this.maxDate && (month.date.getFullYear() > this.maxDate.getFullYear() || month.date.getFullYear() === this.maxDate.getFullYear() && month.date.getMonth() > this.maxDate.getMonth());
  const id = `month-${month.date.getMonth()}`;
  if (!this.active) {
    return html`<td role="gridcell" class="${classMap({
      current,
      selected,
      active
    })}"><div id="${id}" class="item" role="button" tabindex="${active ? "0" : "-1"}" data-value="${month.date.toISOString()}" aria-disabled="${ifDefined(disabled || undefined)}" aria-current="${ifDefined(current ? "date" : undefined)}" aria-pressed="${selected}"><m3e-state-layer class="state-layer" disabled="disabled" disable-hover></m3e-state-layer><span aria-hidden="true">${month.narrow}</span></div></td>`;
  }
  return html`<td role="gridcell" class="${classMap({
    current,
    selected,
    active
  })}"><div id="${id}" class="item" role="button" tabindex="${active ? "0" : "-1"}" data-value="${month.date.toISOString()}" aria-disabled="${ifDefined(disabled || undefined)}" aria-current="${ifDefined(current ? "date" : undefined)}" aria-pressed="${selected}" @click="${__classPrivateFieldGet(this, _M3eYearViewElement_instances, "m", _M3eYearViewElement_handleItemClick)}" @keydown="${__classPrivateFieldGet(this, _M3eYearViewElement_instances, "m", _M3eYearViewElement_handleItemKeyDown)}"><m3e-focus-ring class="focus-ring" for="${id}"></m3e-focus-ring><m3e-state-layer class="state-layer" for="${id}" ?disable-hover="${disabled}"></m3e-state-layer><m3e-ripple class="ripple" centered for="${id}" ?disabled="${disabled}"></m3e-ripple><div class="touch"></div><span class="visually-hidden">${month.long}</span> <span aria-hidden="true">${month.narrow}</span></div></td>`;
};
_M3eYearViewElement_handleItemClick = function _M3eYearViewElement_handleItemClick(e) {
  const item = e.currentTarget;
  if (item.ariaDisabled === "true" || !item.dataset["value"]) return;
  this.activeDate = clampDate(new Date(item.dataset["value"]), this.minDate, this.maxDate);
  this.dispatchEvent(new Event("change", {
    bubbles: false
  }));
};
_M3eYearViewElement_handleItemKeyDown = function _M3eYearViewElement_handleItemKeyDown(e) {
  let activeDate = this.activeDate;
  switch (e.key) {
    case " ":
    case "Enter":
      e.preventDefault();
      e.currentTarget.click();
      return;
    case "ArrowLeft":
    case "Left":
      activeDate = addCalendarMonths(activeDate, M3eDirectionality.current === "rtl" ? 1 : -1);
      break;
    case "ArrowRight":
    case "Right":
      activeDate = addCalendarMonths(activeDate, M3eDirectionality.current === "rtl" ? -1 : 1);
      break;
    case "ArrowUp":
    case "Up":
      activeDate = addCalendarMonths(activeDate, -4);
      break;
    case "ArrowDown":
    case "Down":
      activeDate = addCalendarMonths(activeDate, 4);
      break;
    case "Home":
      activeDate = addCalendarMonths(activeDate, -activeDate.getMonth());
      break;
    case "End":
      activeDate = addCalendarMonths(activeDate, 11 - activeDate.getMonth());
      break;
    case "PageUp":
      activeDate = addCalendarYears(activeDate, e.altKey ? -10 : -1);
      break;
    case "PageDown":
      activeDate = addCalendarYears(activeDate, e.altKey ? 10 : 1);
      break;
    default:
      return;
  }
  e.preventDefault();
  this._changeActiveDate(activeDate);
};
/** The styles of the element. */
M3eYearViewElement.styles = [CalendarViewElementBase.styles, css`.item { height: 36px; } .touch { width: 100%; } th { height: 0px; } td { padding-inline: 6px; padding-block: 8px; } tbody { font-size: var(--m3e-calendar-item-font-size, ${DesignToken.typescale.standard.body.medium.fontSize}); font-weight: var(--m3e-calendar-item-font-weight, ${DesignToken.typescale.standard.body.medium.fontWeight}); line-height: var(--m3e-calendar-item-line-height, ${DesignToken.typescale.standard.body.medium.lineHeight}); letter-spacing: var(--m3e-calendar-item-tracking, ${DesignToken.typescale.standard.body.medium.tracking}); }`];
M3eYearViewElement = __decorate([customElement("m3e-year-view")], M3eYearViewElement);

/**
 * Adapted from Angular Material Datepicker
 * Source: https://github.com/angular/components/blob/main/src/material/datepicker/calendar.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3eCalendarElement_instances, _M3eCalendarElement_transitionComplete, _M3eCalendarElement_renderHeader, _M3eCalendarElement_renderView, _M3eCalendarElement_handleDateChange, _M3eCalendarElement_handleMonthChange, _M3eCalendarElement_handleYearChange, _M3eCalendarElement_handleActiveChange, _M3eCalendarElement_getPreviousPeriod, _M3eCalendarElement_getNextPeriod;
/**
 * A calendar used to select a date.
 *
 * @description
 * The `m3e-calendar` component provides structured navigation and selection across
 * month, year, and multi‑year views. It supports single‑date and range selection,
 * applies disabled rules including minimum, maximum, and blackout constraints, and
 * provides styling hooks for special date states.
 *
 * @example
 * The following example illustrates use of the `m3e-calendar`. In this example, a calendar is displayed
 * with a selected date.
 *
 * ```html
 * <m3e-calendar date="2025-12-13"></m3e-calendar>
 * ```
 *
 * @tag m3e-calendar
 *
 * @slot header - Renders the header of the calendar.
 *
 * @attr date - The selected date.
 * @attr max-date - The maximum date that can be selected.
 * @attr min-date - The minimum date that can be selected.
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
 *
 * @fires change - Dispatched when the selected date changes.
 *
 * @cssprop --m3e-calendar-container-color - Background color of the container surface.
 * @cssprop --m3e-calendar-container-elevation - Elevation shadow applied to the container surface.
 * @cssprop --m3e-calendar-container-shape - Corner radius of the container surface.
 * @cssprop --m3e-calendar-padding - Padding applied to the calendar header and body.
 * @cssprop --m3e-calendar-period-button-text-color - Text color used for the period‑navigation buttons in the header.
 * @cssprop --m3e-calendar-weekday-font-size - Font size of weekday labels in month view.
 * @cssprop --m3e-calendar-weekday-font-weight - Font weight of weekday labels in month view.
 * @cssprop --m3e-calendar-weekday-line-height - Line height of weekday labels in month view.
 * @cssprop --m3e-calendar-weekday-tracking - Letter spacing of weekday labels in month view.
 * @cssprop --m3e-calendar-weekday-color - Text color for weekday labels in month view.
 * @cssprop --m3e-calendar-date-font-size - Font size of date cells in month view.
 * @cssprop --m3e-calendar-date-font-weight - Font weight of date cells in month view.
 * @cssprop --m3e-calendar-date-line-height - Line height of date cells in month view.
 * @cssprop --m3e-calendar-date-tracking - Letter spacing of date cells in month view.
 * @cssprop --m3e-calendar-item-font-size - Font size of items in year and multi‑year views.
 * @cssprop --m3e-calendar-item-font-weight - Font weight of items in year and multi‑year views.
 * @cssprop --m3e-calendar-item-line-height - Line height of items in year and multi‑year views.
 * @cssprop --m3e-calendar-item-tracking - Letter spacing of items in year and multi‑year views.
 * @cssprop --m3e-calendar-item-color - Text color for date items.
 * @cssprop --m3e-calendar-item-selected-color - Text color for selected date items.
 * @cssprop --m3e-calendar-item-selected-container-color - Background color for selected date items.
 * @cssprop --m3e-calendar-item-selected-ripple-color - Ripple color used when interacting with selected date items.
 * @cssprop --m3e-calendar-item-selected-hover-color - Hover color used when interacting with selected date items.
 * @cssprop --m3e-calendar-item-selected-focus-color - Focus color used when interacting with selected date items.
 * @cssprop --m3e-calendar-item-current-outline-thickness - Outline thickness used to indicate the current date.
 * @cssprop --m3e-calendar-item-current-outline-color - Outline color used to indicate the current date.
 * @cssprop --m3e-calendar-item-special-color - Text color for dates marked as special.
 * @cssprop --m3e-calendar-item-special-container-color - Background color for dates marked as special.
 * @cssprop --m3e-calendar-item-special-ripple-color - Ripple color used when interacting with dates marked as special.
 * @cssprop --m3e-calendar-item-special-hover-color - Hover color used when interacting with dates marked as special.
 * @cssprop --m3e-calendar-item-special-focus-color - Focus color used when interacting with dates marked as special.
 * @cssprop --m3e-calendar-range-container-color - Background color applied to the selected date range.
 * @cssprop --m3e-calendar-range-color - Text color for dates within a selected range.
 * @cssprop --m3e-calendar-item-disabled-color - Color used for disabled date items.
 * @cssprop --m3e-calendar-item-disabled-color-opacity - Opacity applied to the disabled item color.
 * @cssprop --m3e-calendar-slide-animation-duration - Duration of slide transitions between calendar views.
 */
let M3eCalendarElement = class M3eCalendarElement extends LitElement {
  constructor() {
    super(...arguments);
    _M3eCalendarElement_instances.add(this);
    /** @private */
    _M3eCalendarElement_transitionComplete.set(this, void 0);
    /** @private */
    this._today = new Date();
    /** @private */
    this._activeView = "month";
    /** @private */
    this._activeDate = new Date();
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
  }
  /** The label to present for the current period. */
  get periodLabel() {
    switch (this._activeView) {
      case "month":
        return new Intl.DateTimeFormat(navigator.language, {
          month: "short",
          year: "numeric"
        }).format(this._activeDate);
      case "year":
        return new Intl.DateTimeFormat(navigator.language, {
          year: "numeric"
        }).format(new Date(this._activeDate.getFullYear(), 0, 1));
      case "multi-year":
        return new Intl.DateTimeFormat(navigator.language, {
          year: "numeric"
        }).formatRange(new Date(minYearOfPage(this._activeDate, this.minDate, this.maxDate), 0, 1), new Date(maxYearOfPage(this._activeDate, this.minDate, this.maxDate), 0, 1));
    }
  }
  /** Whether the calendar can move to the previous period. */
  get canMovePreviousPeriod() {
    if (!this.minDate) return true;
    switch (this._activeView) {
      case "month":
        return new Date(this._activeDate.getFullYear(), this._activeDate.getMonth(), 0) >= this.minDate;
      case "year":
        return new Date(this._activeDate.getFullYear() - 1, 11, 31) >= this.minDate;
      case "multi-year":
        return new Date(minYearOfPage(this._activeDate, this.minDate, this.maxDate) - 1, 12, 1) >= this.minDate;
    }
  }
  /** Whether the calendar can move to the next period. */
  get canMoveNextPeriod() {
    if (!this.maxDate) return true;
    switch (this._activeView) {
      case "month":
        return new Date(this._activeDate.getFullYear(), this._activeDate.getMonth() + 1, 1) <= this.maxDate;
      case "year":
        return new Date(this._activeDate.getFullYear() + 1, 0, 1) <= this.maxDate;
      case "multi-year":
        return new Date(maxYearOfPage(this._activeDate, this.minDate, this.maxDate) + 1, 12, 1) <= this.maxDate;
    }
  }
  /**
   * Asynchronously focuses the active date.
   * @returns {Promise<void>} A promise that resolves after the active date has been focused.
   */
  async focusActiveCell() {
    await waitForUpdate(this);
    await this._view?.focusActiveCell();
  }
  /** Updates today's date. */
  updateTodayDate() {
    this._today = new Date();
  }
  /** Resets the active view. */
  resetActiveView() {
    this._activeView = this.startView;
  }
  /**
   * Moves the calendar to the previous period.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async movePreviousPeriod() {
    if (!this.canMovePreviousPeriod) return;
    if (prefersReducedMotion()) {
      this._activeDate = __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_getPreviousPeriod).call(this, this._activeView);
      return;
    }
    await __classPrivateFieldGet(this, _M3eCalendarElement_transitionComplete, "f");
    if (!this.canMovePreviousPeriod) return;
    const views = [...(this.shadowRoot?.querySelectorAll(`.row.${this._activeView} .view`) ?? [])];
    if (views.length != 3) return;
    __classPrivateFieldSet(this, _M3eCalendarElement_transitionComplete, new Promise(resolve => {
      views[0].addEventListener("transitionend", () => {
        if (this.canMovePreviousPeriod) {
          this._activeDate = __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_getPreviousPeriod).call(this, this._activeView);
        }
        views.forEach(x => x.classList.add("no-animate"));
        views[1].classList.remove("after");
        views[0].classList.add("before");
        setTimeout(() => {
          views.forEach(x => x.classList.remove("no-animate"));
          resolve();
        });
      }, {
        once: true
      });
    }), "f");
    this._body.style.overflow = "hidden";
    views[1].classList.add("after");
    views[0].classList.remove("before");
    await __classPrivateFieldGet(this, _M3eCalendarElement_transitionComplete, "f");
    this._body.style.overflow = "";
  }
  /**
   * Moves the calendar to the next period.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async moveNextPeriod() {
    if (!this.canMoveNextPeriod) return;
    if (prefersReducedMotion()) {
      this._activeDate = __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_getNextPeriod).call(this, this._activeView);
      return;
    }
    await __classPrivateFieldGet(this, _M3eCalendarElement_transitionComplete, "f");
    if (!this.canMoveNextPeriod) return;
    const views = [...(this.shadowRoot?.querySelectorAll(`.row.${this._activeView} .view`) ?? [])];
    if (views.length != 3) return;
    __classPrivateFieldSet(this, _M3eCalendarElement_transitionComplete, new Promise(resolve => {
      views[2].addEventListener("transitionend", () => {
        if (this.canMoveNextPeriod) {
          this._activeDate = __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_getNextPeriod).call(this, this._activeView);
        }
        views.forEach(x => x.classList.add("no-animate"));
        views[1].classList.remove("before");
        views[2].classList.add("after");
        setTimeout(() => {
          views.forEach(x => x.classList.remove("no-animate"));
          resolve();
        });
      }, {
        once: true
      });
    }), "f");
    this._body.style.overflow = "hidden";
    views[1].classList.add("before");
    views[2].classList.remove("after");
    await __classPrivateFieldGet(this, _M3eCalendarElement_transitionComplete, "f");
    this._body.style.overflow = "";
  }
  /**
   * Toggles the current period.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async togglePeriod() {
    await __classPrivateFieldGet(this, _M3eCalendarElement_transitionComplete, "f");
    this._activeView = this._activeView === "month" ? "multi-year" : "month";
    await this.focusActiveCell();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    if (!isCalendarView(this.startView)) {
      this.startView = "month";
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("startView")) {
      if (!isCalendarView(this.startView)) {
        this.startView = "month";
      }
    }
    if (changedProperties.has("date")) {
      this._activeDate = new Date(this.date ?? this._today);
    }
    if (changedProperties.has("startAt")) {
      this._activeDate = new Date(this.startAt ?? this.date ?? this._today);
    }
    if (changedProperties.has("rangeStart") && this.rangeStart) {
      this._activeDate = new Date(this.rangeStart);
      if (!changedProperties.has("date")) {
        this.date = new Date(this.rangeStart);
      }
    }
    if (changedProperties.has("rangeEnd") && this.rangeEnd) {
      this._activeDate = new Date(this.rangeEnd);
      if (!changedProperties.has("date")) {
        this.date = new Date(this.rangeEnd);
      }
    }
    if (changedProperties.has("startView")) {
      this.resetActiveView();
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (this._view instanceof M3eMonthViewElement) {
      if (_changedProperties.has("specialDates") || _changedProperties.has("blackoutDates")) {
        this.shadowRoot?.querySelectorAll("m3e-month-view").forEach(x => {
          x.specialDates = this.specialDates;
          x.blackoutDates = this.blackoutDates;
        });
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot name="header">${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderHeader).call(this)}</slot><div class="body ${this._activeView}"><div class="row multi-year">${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "multi-year", -1)}${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "multi-year", 0)}${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "multi-year", 1)}</div><div class="row year">${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "year", -1)}${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "year", 0)}${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "year", 1)}</div><div class="row month">${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "month", -1)}${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "month", 0)}${__classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_renderView).call(this, "month", 1)}</div></div></div>`;
  }
};
_M3eCalendarElement_transitionComplete = new WeakMap();
_M3eCalendarElement_instances = new WeakSet();
_M3eCalendarElement_renderHeader = function _M3eCalendarElement_renderHeader() {
  return html`<div class="header"><m3e-button @click="${this.togglePeriod}">${this.periodLabel} <svg class="${classMap({
    rotate: this._activeView !== "month"
  })}" slot="trailing-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360 280-560h400L480-360Z"/></svg></m3e-button><div class="spacer"></div><m3e-icon-button ?disabled="${!this.canMovePreviousPeriod}" @click="${this.movePreviousPeriod}" aria-label="${this._activeView === "month" ? this.previousMonthLabel : this._activeView === "year" ? this.previousYearLabel : this.previousMultiYearLabel}">${M3eDirectionality.current === "ltr" ? html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>` : html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>`}</m3e-icon-button><m3e-icon-button ?disabled="${!this.canMoveNextPeriod}" @click="${this.moveNextPeriod}" aria-label="${this._activeView === "month" ? this.nextMonthLabel : this._activeView === "year" ? this.nextYearLabel : this.nextMultiYearLabel}">${M3eDirectionality.current === "ltr" ? html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>` : html`<svg viewBox="0 -960 960 960" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>`}</m3e-icon-button></div>`;
};
_M3eCalendarElement_renderView = function _M3eCalendarElement_renderView(view, offset) {
  const active = view === this._activeView && offset === 0;
  const activeDate = offset < 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_getPreviousPeriod).call(this, view) : offset > 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_getNextPeriod).call(this, view) : new Date(this._activeDate);
  switch (view) {
    case "month":
      return html`<m3e-month-view class="view ${classMap({
        before: offset < 0,
        after: offset > 0,
        active
      })}" ?active="${active}" ?inert="${offset !== 0}" today="${this._today.toISOString()}" date="${ifDefined(this.date?.toISOString())}" active-date="${activeDate.toISOString()}" min-date="${ifDefined(this.minDate?.toISOString())}" max-date="${ifDefined(this.maxDate?.toISOString())}" range-start="${ifDefined(this.rangeStart?.toISOString())}" range-end="${ifDefined(this.rangeEnd?.toISOString())}" @active-change="${offset === 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_handleActiveChange) : undefined}" @change="${offset === 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_handleDateChange) : undefined}"></m3e-month-view>`;
    case "year":
      return html`<m3e-year-view class="view ${classMap({
        before: offset < 0,
        after: offset > 0,
        active
      })}" ?active="${active}" ?inert="${offset !== 0}" today="${this._today.toISOString()}" date="${ifDefined(this.date?.toISOString())}" active-date="${activeDate.toISOString()}" min-date="${ifDefined(this.minDate?.toISOString())}" max-date="${ifDefined(this.maxDate?.toISOString())}" @active-change="${offset === 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_handleActiveChange) : undefined}" @change="${offset === 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_handleMonthChange) : undefined}"></m3e-year-view>`;
    case "multi-year":
      return html`<m3e-multi-year-view class="view ${classMap({
        before: offset < 0,
        after: offset > 0,
        active
      })}" ?active="${active}" ?inert="${offset !== 0}" today="${this._today.toISOString()}" date="${ifDefined(this.date?.toISOString())}" active-date="${activeDate.toISOString()}" min-date="${ifDefined(this.minDate?.toISOString())}" max-date="${ifDefined(this.maxDate?.toISOString())}" @active-change="${offset === 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_handleActiveChange) : undefined}" @change="${offset === 0 ? __classPrivateFieldGet(this, _M3eCalendarElement_instances, "m", _M3eCalendarElement_handleYearChange) : undefined}"></m3e-multi-year-view>`;
  }
};
_M3eCalendarElement_handleDateChange = function _M3eCalendarElement_handleDateChange(e) {
  const monthView = e.currentTarget;
  this._activeDate = new Date(monthView.activeDate);
  this.rangeStart = monthView.rangeStart;
  this.rangeEnd = monthView.rangeEnd;
  const prev = this.date;
  this.date = new Date(this._activeDate);
  // Preserve previous date's time when selecting a new date
  if (prev) {
    this.date.setHours(prev.getHours(), prev.getMinutes(), prev.getSeconds(), prev.getMilliseconds());
  }
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eCalendarElement_handleMonthChange = /** @private */
async function _M3eCalendarElement_handleMonthChange(e) {
  this._activeDate = new Date(e.currentTarget.activeDate);
  this._activeView = "month";
  this.focusActiveCell();
};
_M3eCalendarElement_handleYearChange = function _M3eCalendarElement_handleYearChange(e) {
  this._activeDate = new Date(e.currentTarget.activeDate);
  this._activeView = "year";
  this.focusActiveCell();
};
_M3eCalendarElement_handleActiveChange = /** @private */
async function _M3eCalendarElement_handleActiveChange(e) {
  if (this._view instanceof M3eMonthViewElement) {
    this._view._suppressFocusHighlight = false;
  }
  this._activeDate = new Date(e.currentTarget.activeDate);
  await this.focusActiveCell();
  if (this._view instanceof M3eMonthViewElement) {
    this._view._suppressFocusHighlight = false;
  }
};
_M3eCalendarElement_getPreviousPeriod = function _M3eCalendarElement_getPreviousPeriod(view) {
  const activeDate = new Date(this._activeDate);
  switch (view) {
    case "month":
      activeDate.setMonth(this._activeDate.getMonth() - 1);
      while (activeDate.getMonth() === this._activeDate.getMonth()) {
        activeDate.setDate(activeDate.getDate() - 1);
      }
      break;
    case "year":
      activeDate.setFullYear(this._activeDate.getFullYear() - 1);
      break;
    case "multi-year":
      {
        activeDate.setDate(1);
        activeDate.setFullYear(minYearOfPage(this._activeDate, this.minDate, this.maxDate) - 1);
      }
  }
  return activeDate;
};
_M3eCalendarElement_getNextPeriod = function _M3eCalendarElement_getNextPeriod(view) {
  const activeDate = new Date(this._activeDate);
  switch (view) {
    case "month":
      activeDate.setMonth(this._activeDate.getMonth() + 1);
      while (activeDate.getMonth() === this._activeDate.getMonth()) {
        activeDate.setDate(activeDate.getDate() + 1);
      }
      break;
    case "year":
      activeDate.setFullYear(this._activeDate.getFullYear() + 1);
      break;
    case "multi-year":
      activeDate.setDate(1);
      activeDate.setFullYear(maxYearOfPage(this._activeDate, this.minDate, this.maxDate) + 1);
      break;
  }
  return activeDate;
};
/** The styles of the element. */
M3eCalendarElement.styles = css`:host { display: inline-block; vertical-align: top; width: fit-content; height: fit-content; } :host([hidden]) { display: none; } .base { contain: layout style paint; display: flex; flex-direction: column; width: fit-content; overflow: hidden; padding: var(--m3e-calendar-padding, ${DesignToken.measurement.space100}); background-color: var(--m3e-calendar-container-color); box-shadow: var(--m3e-calendar-container-elevation); border-radius: var(--m3e-calendar-container-shape); } .header { height: 56px; display: flex; align-items: center; --_icon-button-size: auto; --_icon-button-min-size: 48px; --m3e-text-button-label-text-color: var( --m3e-calendar-period-button-text-color, ${DesignToken.color.onSurfaceVariant} ); --m3e-text-button-hover-label-text-color: var( --m3e-calendar-period-button-text-color, ${DesignToken.color.onSurfaceVariant} ); --m3e-text-button-focus-label-text-color: var( --m3e-calendar-period-button-text-color, ${DesignToken.color.onSurfaceVariant} ); --m3e-text-button-pressed-label-text-color: var( --m3e-calendar-period-button-text-color, ${DesignToken.color.onSurfaceVariant} ); } .spacer { flex: 1 1 auto; } svg { transition: transform ${DesignToken.motion.spring.fastEffects}; } svg.rotate { transform: rotate(-180deg); } .body { position: relative; height: calc(48px * 7); } .view:not(.no-animate) { transition: ${unsafeCSS(`margin var(--m3e-calendar-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard},
        visibility var(--m3e-calendar-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard} allow-discrete`)}; } .view.before, .view.after { visibility: hidden; position: absolute; } .view.before { margin-inline-start: -100%; } .view.after { margin-inline-start: 100%; } .view:not(.before):not(.after) { visibility: visible; position: relative; left: 0; margin-inline-start: 0; } .row { opacity: 1; transform: translateY(0); } .row.multi-year { transition: ${unsafeCSS(`transform var(--m3e-calendar-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard} allow-discrete,
        opacity var(--m3e-calendar-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard} allow-discrete`)}; } .row:not(.multi-year) { transition: ${unsafeCSS(`opacity var(--m3e-calendar-slide-animation-duration, ${DesignToken.motion.duration.long2}) ${DesignToken.motion.easing.standard} allow-discrete`)}; } .body.month > .row:not(.month), .body.year > .row:not(.year), .body.multi-year > .row:not(.multi-year) { visibility: hidden; position: absolute; transform: translateY(-10%); opacity: 0; } .body.month > .row:not(.month) .view:not(.before):not(.after), .body.year > .row:not(.year) .view:not(.before):not(.after), .body.multi-year > .row:not(.multi-year) .view:not(.before):not(.after) { visibility: hidden; transition: none; } @media (prefers-reduced-motion) { .row:not(.multi-year), .row.multi-year, .view:not(.no-animate), svg { transition: none; } }`;
__decorate([state()], M3eCalendarElement.prototype, "_today", void 0);
__decorate([state()], M3eCalendarElement.prototype, "_activeView", void 0);
__decorate([state()], M3eCalendarElement.prototype, "_activeDate", void 0);
__decorate([query(".active")], M3eCalendarElement.prototype, "_view", void 0);
__decorate([query(".body")], M3eCalendarElement.prototype, "_body", void 0);
__decorate([property({
  attribute: "start-view",
  reflect: true,
  useDefault: true
})], M3eCalendarElement.prototype, "startView", void 0);
__decorate([property({
  converter: dateConverter
})], M3eCalendarElement.prototype, "date", void 0);
__decorate([property({
  attribute: "start-at",
  converter: dateConverter
})], M3eCalendarElement.prototype, "startAt", void 0);
__decorate([property({
  attribute: "min-date",
  converter: dateConverter
})], M3eCalendarElement.prototype, "minDate", void 0);
__decorate([property({
  attribute: "max-date",
  converter: dateConverter
})], M3eCalendarElement.prototype, "maxDate", void 0);
__decorate([property({
  attribute: "range-start",
  converter: dateConverter
})], M3eCalendarElement.prototype, "rangeStart", void 0);
__decorate([property({
  attribute: "range-end",
  converter: dateConverter
})], M3eCalendarElement.prototype, "rangeEnd", void 0);
__decorate([property({
  attribute: false
})], M3eCalendarElement.prototype, "blackoutDates", void 0);
__decorate([property({
  attribute: false
})], M3eCalendarElement.prototype, "specialDates", void 0);
__decorate([property({
  attribute: "previous-month-label"
})], M3eCalendarElement.prototype, "previousMonthLabel", void 0);
__decorate([property({
  attribute: "previous-year-label"
})], M3eCalendarElement.prototype, "previousYearLabel", void 0);
__decorate([property({
  attribute: "previous-multi-year-label"
})], M3eCalendarElement.prototype, "previousMultiYearLabel", void 0);
__decorate([property({
  attribute: "next-month-label"
})], M3eCalendarElement.prototype, "nextMonthLabel", void 0);
__decorate([property({
  attribute: "next-year-label"
})], M3eCalendarElement.prototype, "nextYearLabel", void 0);
__decorate([property({
  attribute: "next-multi-year-label"
})], M3eCalendarElement.prototype, "nextMultiYearLabel", void 0);
M3eCalendarElement = __decorate([customElement("m3e-calendar")], M3eCalendarElement);

export { CalendarViewElementBase, M3eCalendarElement, M3eMonthViewElement, M3eMultiYearViewElement, M3eYearViewElement, isCalendarView };
//# sourceMappingURL=CalendarElement.js.map
