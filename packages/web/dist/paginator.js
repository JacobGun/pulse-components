/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, nothing, unsafeCSS, css } from 'lit';
import { property } from 'lit/decorators.js';
import { AttachInternals, Role, prefersReducedMotion, DesignToken, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';
import './FormFieldElement.js';
import './SelectElement.js';
import './OptionPanelElement.js';
import './IconButtonElement.js';
import './TooltipElement.js';

/**
 * Adapted from Angular Material Paginator
 * Source: https://github.com/angular/components/blob/main/src/material/paginator/paginator.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _M3ePaginatorElement_instances, _M3ePaginatorElement_pageSizeLabelId, _M3ePaginatorElement_selectOpen, _M3ePaginatorElement_defaultRangeLabelFormatter, _M3ePaginatorElement_renderPageSize, _M3ePaginatorElement_parsePageSizes, _M3ePaginatorElement_renderRangeActions, _M3ePaginatorElement_handleSelectChange, _M3ePaginatorElement_handleSelectToggle, _M3ePaginatorElement_updatePageSize, _M3ePaginatorElement_emitPageEvent;
var M3ePaginatorElement_1;
/**
 * Provides navigation for paged information, typically used with a table.
 *
 * @description
 * The `m3e-paginator` component is a compact, accessible paginator control for navigating
 * paged data sets. It provides semantic first/previous/next/last navigation controls and an
 * optional page-size selector that integrates with Material design tokens and `m3e-form-field` variants
 * to ensure consistent typography, density, and spacing across applications.
 *
 * @example
 * The following example illustrates use of the `m3e-paginator`. In this example, there are 300 total
 * records and the first/last navigation controls are shown.
 * ```html
 * <m3e-paginator show-first-last-buttons length="300"></m3e-paginator>
 * ```
 *
 * @tag m3e-paginator
 *
 * @slot first-page-icon - Slot for a custom first-page icon.
 * @slot previous-page-icon - Slot for a custom previous-page icon.
 * @slot next-page-icon - Slot for a custom next-page icon.
 * @slot last-page-icon - Slot for a custom last-page icon.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr first-page-label - The accessible label given to the button used to move to the first page.
 * @attr hide-page-size - Whether to hide page size selection.
 * @attr items-per-page-label - The label for the page size selector.
 * @attr last-page-label - The accessible label given to the button used to move to the last page.
 * @attr length - The length of the total number of items which are being paginated.
 * @attr next-page-label - The accessible label given to the button used to move to the next page.
 * @attr page-index - The zero-based page index of the displayed list of items.
 * @attr page-size - The number of items to display in a page.
 * @attr page-sizes - A comma separated list of available page sizes.
 * @attr page-size-variant - The appearance variant of the page size field.
 * @attr previous-page-label - The accessible label given to the button used to move to the previous page.
 * @attr show-first-last-buttons - Whether to show first/last buttons.
 *
 * @fires page - Dispatched when a user selects a different page size or navigates to another page.
 *
 * @cssprop --m3e-paginator-font-size - The font size used for paginator text.
 * @cssprop --m3e-paginator-font-weight - The font weight used for paginator text.
 * @cssprop --m3e-paginator-line-height - The line height used for paginator text.
 * @cssprop --m3e-paginator-tracking - The letter-spacing used for paginator text.
 */
let M3ePaginatorElement = M3ePaginatorElement_1 = class M3ePaginatorElement extends SupportsDirectionality(AttachInternals(Role(LitElement, "group"))) {
  constructor() {
    super(...arguments);
    _M3ePaginatorElement_instances.add(this);
    /* @private */
    _M3ePaginatorElement_pageSizeLabelId.set(this, `m3e-paginator-page-size-label-${M3ePaginatorElement_1.__nextId++}`);
    /* @private */
    _M3ePaginatorElement_selectOpen.set(this, false);
    /* @private */
    _M3ePaginatorElement_defaultRangeLabelFormatter.set(this, (pageIndex, pageSize, length) => {
      length = Math.max(length, 0);
      if (pageSize === "all") return "";
      if (length === 0 || pageSize <= 0) return `0 of ${length}`;
      const startIndex = pageIndex * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} of ${length}`;
    });
    /**
     * Whether the element is disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * The zero-based page index of the displayed list of items.
     * @default 0
     */
    this.pageIndex = 0;
    /**
     * The length of the total number of items which are being paginated.
     * @default 0
     */
    this.length = 0;
    /**
     * The number of items to display in a page.
     * @default 50
     */
    this.pageSize = 50;
    /**
     * A comma separated list of available page sizes.
     * @default "5,10,25,50,100"
     */
    this.pageSizes = "5,10,25,50,100";
    /**
     * Whether to hide page size selection.
     * @default false
     */
    this.hidePageSize = false;
    /**
     * Whether to show first/last buttons.
     * @default false
     */
    this.showFirstLastButtons = false;
    /**
     * The label for the page size selector.
     * @default "Items per page:"
     */
    this.itemsPerPageLabel = "Items per page:";
    /**
     * The accessible label given to the button used to move to the previous page.
     * @default "Previous page"
     */
    this.previousPageLabel = "Previous page";
    /**
     * The accessible label given to the button used to move to the next page.
     * @default "Next page"
     */
    this.nextPageLabel = "Next page";
    /**
     * The accessible label given to the button used to move to the first page.
     * @default "First page"
     */
    this.firstPageLabel = "First page";
    /**
     * The accessible label given to the button used to move to the last page.
     * @default "Last page"
     */
    this.lastPageLabel = "Last page";
    /**
     * The appearance variant of the page size field.
     * @default "outlined"
     */
    this.pageSizeVariant = "outlined";
  }
  /** The total number of pages. */
  get pageCount() {
    return !this.pageSize || this.pageSize === "all" ? 0 : Math.ceil(this.length / this.pageSize);
  }
  /** Whether a previous page can be displayed. */
  get hasPreviousPage() {
    return this.pageSize !== "all" && this.pageSize > 0 && this.pageIndex >= 1;
  }
  /** Whether a next page can be displayed. */
  get hasNextPage() {
    return this.pageSize !== "all" && this.pageSize > 0 && this.pageIndex < this.pageCount - 1;
  }
  /** Move to the first page. */
  firstPage() {
    if (this.hasPreviousPage) {
      const previousPageIndex = this.pageIndex;
      this.pageIndex = 0;
      __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_emitPageEvent).call(this, previousPageIndex);
    }
  }
  /** Move to the previous page. */
  previousPage() {
    if (this.hasPreviousPage) {
      const previousPageIndex = this.pageIndex;
      this.pageIndex--;
      __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_emitPageEvent).call(this, previousPageIndex);
    }
  }
  /** Move to the next page. */
  nextPage() {
    if (this.hasNextPage) {
      const previousPageIndex = this.pageIndex;
      this.pageIndex++;
      __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_emitPageEvent).call(this, previousPageIndex);
    }
  }
  /** Move to the last page. */
  lastPage() {
    if (this.hasNextPage) {
      const previousPageIndex = this.pageIndex;
      this.pageIndex = this.pageCount - 1;
      __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_emitPageEvent).call(this, previousPageIndex);
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("pageIndex")) {
      const pageSizes = __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_parsePageSizes).call(this);
      if (!pageSizes.includes(this.pageSize)) {
        this.pageSizes = [...pageSizes, this.pageSize].join(",");
        this.pageSizes = __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_parsePageSizes).call(this).join(",");
      }
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    if (prefersReducedMotion() || !changedProperties.has("pageSize") && !changedProperties.has("pageIndex")) {
      super.update(changedProperties);
      return;
    }
    // FLIP the page-size and (optionally) range-actions sections to provide smooth transitions during layout shifts.
    const pageSize = this.shadowRoot?.querySelector(".page-size");
    const rangeElement = changedProperties.has("pageSize") && (changedProperties.get("pageSize") === "all" || this.pageSize === "all") ? this.shadowRoot?.querySelector(".range-actions") : null;
    const items = new Array();
    if (pageSize) items.push(pageSize);
    if (rangeElement) items.push(rangeElement);
    if (items.length > 0) {
      const first = items.map(x => x.getBoundingClientRect());
      super.update(changedProperties);
      const last = items.map(x => x.getBoundingClientRect());
      items.forEach((x, i) => {
        const dx = first[i].left - last[i].left;
        x.style.transformOrigin = `${dx > 0 ? "right" : "left"} center`;
        x.style.transform = `translateX(${dx}px)`;
      });
      requestAnimationFrame(() => {
        items.forEach(x => {
          x.addEventListener("transitionend", () => {
            x.style.transition = "";
            x.style.transformOrigin = "";
          }, {
            once: true
          });
          // Note: a shorter duration is used when not changing from/to "all" page size to avoid flicker on the outlined
          // form-field’s 1px border caused by GPU layer promotion drawing the outline at subpixel positions.
          const duration = rangeElement ? DesignToken.motion.duration.short3 : DesignToken.motion.duration.short2;
          x.style.transition = `transform ${duration} ${DesignToken.motion.easing.standard}`;
          x.style.transform = "";
        });
      });
    } else {
      super.update(changedProperties);
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="outer"><div class="inner">${__classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_renderPageSize).call(this)} ${__classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_renderRangeActions).call(this)}</div></div>`;
  }
};
_M3ePaginatorElement_pageSizeLabelId = new WeakMap();
_M3ePaginatorElement_selectOpen = new WeakMap();
_M3ePaginatorElement_defaultRangeLabelFormatter = new WeakMap();
_M3ePaginatorElement_instances = new WeakSet();
_M3ePaginatorElement_renderPageSize = function _M3ePaginatorElement_renderPageSize() {
  const sizes = __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_parsePageSizes).call(this);
  return html`<div class="page-size" ?hidden="${this.hidePageSize}"><div id="${__classPrivateFieldGet(this, _M3ePaginatorElement_pageSizeLabelId, "f")}" class="items-per-page-label" aria-live="polite">${this.itemsPerPageLabel}</div><m3e-form-field class="form-field" variant="${this.pageSizeVariant}" hide-subscript="always"><m3e-select class="select" aria-labelledby="${__classPrivateFieldGet(this, _M3ePaginatorElement_pageSizeLabelId, "f")}" hide-selection-indicator ?disabled="${this.disabled || sizes.length <= 1}" @change="${__classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_handleSelectChange)}" @toggle="${__classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_handleSelectToggle)}">${sizes.map(x => html`<m3e-option value="${x}" ?selected="${x === this.pageSize}">${x === "all" ? "All" : x}</m3e-option>`)}</m3e-select></m3e-form-field></div>`;
};
_M3ePaginatorElement_parsePageSizes = function _M3ePaginatorElement_parsePageSizes() {
  const sizes = this.pageSizes.split(",").map(x => x.trim()).filter(x => x !== "").map(x => x === "all" ? x : Number(x));
  const numericSizes = sizes.filter(x => x !== "all");
  numericSizes.sort((a, b) => a - b);
  return sizes.some(x => x === "all") ? [...numericSizes, "all"] : numericSizes;
};
_M3ePaginatorElement_renderRangeActions = function _M3ePaginatorElement_renderRangeActions() {
  const rangeLabelFormatter = this.rangeLabelFormatter ?? __classPrivateFieldGet(this, _M3ePaginatorElement_defaultRangeLabelFormatter, "f");
  return html`<div class="range-actions" ?hidden="${this.pageSize === "all"}"><div class="range-label">${rangeLabelFormatter(this.pageIndex, this.pageSize, this.length)}</div>${!this.showFirstLastButtons ? nothing : html`<m3e-icon-button id="firstPageButton" aria-label="${this.firstPageLabel}" ?disabled="${this.disabled || !this.hasPreviousPage}" @click="${this.firstPage}"><slot name="first-page-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></slot></m3e-icon-button><m3e-tooltip for="firstPageButton" position="above">${this.firstPageLabel}</m3e-tooltip>`}<m3e-icon-button id="previousPageButton" aria-label="${this.previousPageLabel}" ?disabled="${this.disabled || !this.hasPreviousPage}" @click="${this.previousPage}"><slot name="previous-page-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></slot></m3e-icon-button><m3e-tooltip for="previousPageButton" position="above">${this.previousPageLabel}</m3e-tooltip><m3e-icon-button id="nextPageButton" aria-label="${this.nextPageLabel}" ?disabled="${this.disabled || !this.hasNextPage}" @click="${this.nextPage}"><slot name="next-page-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></slot></m3e-icon-button><m3e-tooltip for="nextPageButton" position="above">${this.nextPageLabel}</m3e-tooltip>${!this.showFirstLastButtons ? nothing : html`<m3e-icon-button id="lastPageButton" aria-label="${this.lastPageLabel}" ?disabled="${this.disabled || !this.hasNextPage}" @click="${this.lastPage}"><slot name="last-page-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="m280-240-56-56 184-184-184-184 56-56 240 240-240 240Zm360 0v-480h80v480h-80Z"/></svg></slot></m3e-icon-button><m3e-tooltip for="lastPageButton" position="above">${this.lastPageLabel}</m3e-tooltip>`}</div>`;
};
_M3ePaginatorElement_handleSelectChange = function _M3ePaginatorElement_handleSelectChange(e) {
  const option = e.target?.selected[0];
  if (option && (prefersReducedMotion() || !__classPrivateFieldGet(this, _M3ePaginatorElement_selectOpen, "f"))) {
    __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_updatePageSize).call(this, option);
  }
};
_M3ePaginatorElement_handleSelectToggle = function _M3ePaginatorElement_handleSelectToggle(e) {
  __classPrivateFieldSet(this, _M3ePaginatorElement_selectOpen, e.newState !== "closed", "f");
  if (!__classPrivateFieldGet(this, _M3ePaginatorElement_selectOpen, "f") && !prefersReducedMotion()) {
    const option = this.shadowRoot?.querySelector("m3e-select")?.selected[0];
    if (option) {
      __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_updatePageSize).call(this, option);
    }
  }
};
_M3ePaginatorElement_updatePageSize = function _M3ePaginatorElement_updatePageSize(option) {
  const pageSize = option.value === "all" ? "all" : Number(option.value);
  if (pageSize !== this.pageSize) {
    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this.pageSize = pageSize;
    __classPrivateFieldGet(this, _M3ePaginatorElement_instances, "m", _M3ePaginatorElement_emitPageEvent).call(this, previousPageIndex);
  }
};
_M3ePaginatorElement_emitPageEvent = function _M3ePaginatorElement_emitPageEvent(previousPageIndex) {
  this.dispatchEvent(new CustomEvent("page", {
    detail: {
      previousPageIndex: previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    }
  }));
};
/** The styles of the element. */
M3ePaginatorElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .outer { display: flex; overflow: hidden; font-size: var(--m3e-paginator-font-size, ${DesignToken.typescale.standard.body.small.fontSize}); font-weight: var(--m3e-paginator-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight}); line-height: var(--m3e-paginator-line-height, ${DesignToken.typescale.standard.body.small.lineHeight}); letter-spacing: var(--m3e-paginator-tracking, ${DesignToken.typescale.standard.body.small.tracking}); } .inner { display: flex; align-items: center; justify-content: flex-end; padding-inline: ${DesignToken.measurement.space100}; width: 100%; --_density-scale: ${DesignToken.density.scale}; } .page-size { display: flex; align-items: center; } .page-size[hidden], .range-actions[hidden] { visibility: hidden; min-width: 0; max-width: 0; } .form-field { --md-sys-density-scale: min(-2, var(--_density-scale)); --m3e-form-field-font-size: var(--m3e-paginator-font-size, ${DesignToken.typescale.standard.body.small.fontSize}); --m3e-form-field-font-weight: var( --m3e-paginator-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight} ); --m3e-form-field-line-height: var( --m3e-paginator-line-height, ${DesignToken.typescale.standard.body.small.lineHeight} ); --m3e-form-field-tracking: var(--m3e-paginator-tracking, ${DesignToken.typescale.standard.body.small.tracking}); } .items-per-page-label { display: flex; align-items: center; margin-inline-end: ${DesignToken.measurement.space100}; } .form-field { min-width: auto; width: 96px; margin-inline: ${DesignToken.measurement.space50}; } .range-label { margin-inline: ${unsafeCSS(`${DesignToken.measurement.space300} ${DesignToken.measurement.space400}`)}; } :host([hide-page-size]) .range-label { margin-inline-start: unset; } .range-actions { display: flex; align-items: center; --_icon-button-size: auto; --_icon-button-min-size: 48px; } ::slotted([slot="first-page-icon"]), ::slotted([slot="previous-page-icon"]), ::slotted([slot="next-page-icon"]), ::slotted([slot="last-page-icon"]), svg { width: 1em; font-size: var(--m3e-icon-button-medium-icon-size, 24px) !important; } :host(:is(:state(--rtl), :--rtl)) svg { transform: rotate(180deg); }`;
/* @private */
M3ePaginatorElement.__nextId = 0;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3ePaginatorElement.prototype, "disabled", void 0);
__decorate([property({
  attribute: "page-index",
  type: Number
})], M3ePaginatorElement.prototype, "pageIndex", void 0);
__decorate([property({
  type: Number
})], M3ePaginatorElement.prototype, "length", void 0);
__decorate([property({
  attribute: "page-size",
  converter: value => value === "all" ? "all" : Number(value)
})], M3ePaginatorElement.prototype, "pageSize", void 0);
__decorate([property({
  attribute: "page-sizes"
})], M3ePaginatorElement.prototype, "pageSizes", void 0);
__decorate([property({
  attribute: "hide-page-size",
  type: Boolean,
  reflect: true
})], M3ePaginatorElement.prototype, "hidePageSize", void 0);
__decorate([property({
  attribute: "show-first-last-buttons",
  type: Boolean
})], M3ePaginatorElement.prototype, "showFirstLastButtons", void 0);
__decorate([property({
  attribute: "items-per-page-label"
})], M3ePaginatorElement.prototype, "itemsPerPageLabel", void 0);
__decorate([property({
  attribute: "previous-page-label"
})], M3ePaginatorElement.prototype, "previousPageLabel", void 0);
__decorate([property({
  attribute: "next-page-label"
})], M3ePaginatorElement.prototype, "nextPageLabel", void 0);
__decorate([property({
  attribute: "first-page-label"
})], M3ePaginatorElement.prototype, "firstPageLabel", void 0);
__decorate([property({
  attribute: "last-page-label"
})], M3ePaginatorElement.prototype, "lastPageLabel", void 0);
__decorate([property({
  attribute: "page-size-variant"
})], M3ePaginatorElement.prototype, "pageSizeVariant", void 0);
M3ePaginatorElement = M3ePaginatorElement_1 = __decorate([customElement("m3e-paginator")], M3ePaginatorElement);

export { M3ePaginatorElement };
//# sourceMappingURL=paginator.js.map
