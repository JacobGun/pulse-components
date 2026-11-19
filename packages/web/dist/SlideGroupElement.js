/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldSet, __classPrivateFieldGet, __decorate } from 'tslib';
import { LitElement, html, nothing, css } from 'lit';
import { query, state, property } from 'lit/decorators.js';
import { ReconnectedCallback, ResizeController, debounce, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { M3eDirectionality } from './Directionality.js';
import './IconButtonElement.js';

var _M3eSlideGroupElement_instances, _M3eSlideGroupElement_directionalitySubscription, _M3eSlideGroupElement_resizeController, _M3eSlideGroupElement_pageStart, _M3eSlideGroupElement_pageEnd, _M3eSlideGroupElement_horizontalScrollPosition, _M3eSlideGroupElement_scrollToHorizontalPosition, _M3eSlideGroupElement_rtlScrollType;
var M3eSlideGroupElement_1;
/**
 * Presents pagination controls used to scroll overflowing content.
 *
 * @description
 * The `m3e-slide-group` component presents directional pagination controls for navigating overflowing content.
 * It orchestrates scrollable layouts with expressive slot-based icons and adaptive orientation, revealing navigation
 * affordances only when content exceeds a defined threshold.  It supports both horizontal and vertical flows, and
 * encodes accessibility through customizable labels and interaction states.
 *
 * @example
 * The following example illustrates a horizontally scrollable group of items with directional pagination buttons.
 * The scroll controls appear when content exceeds the `48px` threshold.
 * ```html
 * <m3e-slide-group threshold="48">
 *  <div>Item 1</div>
 *  <div>Item 2</div>
 *  <div>Item 3</div>
 *  <div>Item 4</div>
 *  <div>Item 5</div>
 * </m3e-slide-group>
 * ```
 *
 * @tag m3e-slide-group
 *
 * @slot - Renders the content to paginate.
 * @slot next-icon - Renders the icon to present for the next button.
 * @slot prev-icon - Renders the icon to present for the previous button.
 *
 * @attr disabled - Whether scroll buttons are disabled.
 * @attr next-page-label - The accessible label given to the button used to move to the previous page.
 * @attr previous-page-label - The accessible label given to the button used to move to the next page.
 * @attr threshold - A value, in pixels, indicating the scroll threshold at which to begin showing pagination controls.
 * @attr vertical - Whether content is oriented vertically.
 *
 * @cssprop --m3e-slide-group-button-icon-size - Sets icon size for scroll buttons; overrides default small icon size.
 * @cssprop --m3e-slide-group-button-size - Defines scroll button size; used for width (horizontal) or height (vertical).
 * @cssprop --m3e-slide-group-divider-top - Adds top border to content container for visual separation.
 * @cssprop --m3e-slide-group-divider-bottom - Adds bottom border to content container for visual separation.
 */
let M3eSlideGroupElement = M3eSlideGroupElement_1 = class M3eSlideGroupElement extends ReconnectedCallback(LitElement) {
  constructor() {
    super(...arguments);
    _M3eSlideGroupElement_instances.add(this);
    /** @private */
    _M3eSlideGroupElement_directionalitySubscription.set(this, void 0);
    /** @private */
    _M3eSlideGroupElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      callback: () => this._updatePaging()
    }));
    /** @private */
    this._canPage = false;
    /** @private */
    this._canPageStart = false;
    /** @private */
    this._canPageEnd = false;
    /**
     * Whether scroll buttons are disabled.
     * @default false
     */
    this.disabled = false;
    /**
     * Whether content is oriented vertically.
     * @default false
     */
    this.vertical = false;
    /**
     * A value, in pixels, indicating the scroll threshold at which to begin showing pagination controls.
     * @default 0
     */
    this.threshold = 0;
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
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldSet(this, _M3eSlideGroupElement_directionalitySubscription, M3eDirectionality.observe(() => {
      this.requestUpdate();
      this._updatePaging();
    }), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eSlideGroupElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eSlideGroupElement_resizeController, "f").observe(this.scrollContainer);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eSlideGroupElement_resizeController, "f").observe(this.scrollContainer);
  }
  /** @inheritdoc */
  render() {
    const prevButton = html`<m3e-icon-button class="prev-button" tabindex="-1" aria-label="${this.previousPageLabel}" ?disabled="${!this._canPageStart}" @click="${__classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_pageStart)}"><slot name="prev-icon">${M3eDirectionality.current === "ltr" || this.vertical ? html`<svg class="icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>` : html`<svg class="icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>`}</slot></m3e-icon-button>`;
    const nextButton = html`<m3e-icon-button class="next-button" tabindex="-1" aria-label="${this.nextPageLabel}" ?disabled="${!this._canPageEnd}" @click="${__classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_pageEnd)}"><slot name="next-icon">${M3eDirectionality.current === "ltr" || this.vertical ? html`<svg class="icon" viewBox="0 -960 960 960" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>` : html`<svg class="icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>`}</slot></m3e-icon-button>`;
    return html`${this._canPage ? prevButton : nothing}<div class="content" @scroll="${this._updatePaging}"><slot></slot></div>${this._canPage ? nextButton : nothing}`;
  }
  /** @private */
  _updatePaging() {
    const canPage = this._canPage;
    if (this.disabled) {
      this._canPage = false;
    } else if (!this.vertical) {
      this._canPage = Math.round(this.scrollContainer.scrollWidth) > Math.round(this.scrollContainer.clientWidth) + this.threshold;
      if (this._canPage) {
        const left = Math.round(__classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_horizontalScrollPosition).call(this));
        this._canPageStart = left > this.threshold;
        this._canPageEnd = left + this.threshold < Math.round(this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth);
      }
    } else {
      this._canPage = Math.round(this.scrollContainer.scrollHeight) > Math.round(this.scrollContainer.clientHeight) + this.threshold;
      if (this._canPage) {
        this._canPageStart = Math.round(this.scrollContainer.scrollTop) > this.threshold;
        this._canPageEnd = Math.round(this.scrollContainer.scrollTop) + +this.threshold < Math.round(this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight);
      }
    }
    if (!this._canPage) {
      this._canPageStart = this._canPageEnd = false;
    }
    if (canPage != this._canPage) {
      // Emit internal (undocumented) event for use with tabs.
      this["dispatchEvent"](new CustomEvent("pagination-changed"));
    }
  }
};
_M3eSlideGroupElement_directionalitySubscription = new WeakMap();
_M3eSlideGroupElement_resizeController = new WeakMap();
_M3eSlideGroupElement_instances = new WeakSet();
_M3eSlideGroupElement_pageStart = function _M3eSlideGroupElement_pageStart() {
  if (!this.vertical) {
    let left = __classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_horizontalScrollPosition).call(this) - this.scrollContainer.clientWidth;
    if (left <= this.threshold) {
      left = 0;
    }
    __classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_scrollToHorizontalPosition).call(this, left);
  } else {
    let top = this.scrollContainer.scrollTop - this.scrollContainer.clientHeight;
    if (top <= this.threshold) {
      top = 0;
    }
    this.scrollContainer.scrollTo({
      top,
      behavior: "smooth"
    });
  }
};
_M3eSlideGroupElement_pageEnd = function _M3eSlideGroupElement_pageEnd() {
  if (!this.vertical) {
    const max = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    let left = __classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_horizontalScrollPosition).call(this) + this.scrollContainer.clientWidth;
    if (left >= max - this.threshold) {
      left = max;
    }
    __classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_scrollToHorizontalPosition).call(this, left);
  } else {
    let top = this.scrollContainer.scrollTop + this.scrollContainer.clientHeight;
    if (top >= this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight - this.threshold) {
      top = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
    }
    this.scrollContainer.scrollTo({
      top,
      behavior: "smooth"
    });
  }
};
_M3eSlideGroupElement_horizontalScrollPosition = function _M3eSlideGroupElement_horizontalScrollPosition() {
  const scrollLeft = this.scrollContainer.scrollLeft;
  if (M3eDirectionality.current !== "rtl") {
    return scrollLeft;
  }
  const max = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
  switch (__classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_rtlScrollType).call(this)) {
    case "negative":
      return -scrollLeft;
    case "reverse":
      return max - scrollLeft;
    default:
      return scrollLeft;
  }
};
_M3eSlideGroupElement_scrollToHorizontalPosition = function _M3eSlideGroupElement_scrollToHorizontalPosition(left) {
  if (M3eDirectionality.current === "rtl") {
    const max = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
    switch (__classPrivateFieldGet(this, _M3eSlideGroupElement_instances, "m", _M3eSlideGroupElement_rtlScrollType).call(this)) {
      case "negative":
        left = -left;
        break;
      case "reverse":
        left = max - left;
        break;
    }
  }
  this.scrollContainer.scrollTo({
    left,
    behavior: "smooth"
  });
};
_M3eSlideGroupElement_rtlScrollType = function _M3eSlideGroupElement_rtlScrollType() {
  if (M3eSlideGroupElement_1.__rtlScrollType) {
    return M3eSlideGroupElement_1.__rtlScrollType;
  }
  const element = document.createElement("div");
  const content = document.createElement("div");
  element.dir = "rtl";
  element.style.cssText = "position:absolute;width:4px;height:1px;overflow:scroll;visibility:hidden;";
  content.style.width = "8px";
  element.append(content);
  document.body.append(element);
  const initial = element.scrollLeft;
  element.scrollLeft = 1;
  M3eSlideGroupElement_1.__rtlScrollType = initial > 0 ? "reverse" : element.scrollLeft === 0 ? "negative" : "default";
  element.remove();
  return M3eSlideGroupElement_1.__rtlScrollType;
};
/** The styles of the element. */
M3eSlideGroupElement.styles = css`:host { display: flex; flex-wrap: nowrap; } :host([hidden]) { display: none; } :host([vertical]) { flex-direction: column; } .prev-button, .next-button { flex: none; --m3e-icon-button-small-shape-round: 0px; --m3e-icon-button-small-shape-square: 0px; --m3e-icon-button-small-shape-pressed-morph: 0px; --m3e-focus-ring-visibility: hidden; } ::slotted(prev-icon), ::slotted(next-icon), .icon { width: 1em; font-size: var(--m3e-slide-group-button-icon-size, var(--m3e-icon-button-small-icon-size, 24px)) !important; } :host(:not([vertical])) .prev-button, :host(:not([vertical])) .next-button { --m3e-icon-button-small-container-height: 100%; width: var(--m3e-slide-group-button-size, 40px); } :host([vertical]) .prev-button, :host([vertical]) .next-button { width: unset; --m3e-icon-button-small-container-height: var(--m3e-slide-group-button-size, 40px); } :host([vertical]) .prev-button .icon, :host([vertical]) .next-button .icon { transform: rotate(90deg); } .content { contain: layout style; flex: 1 1 auto; display: inherit; flex-wrap: inherit; flex-direction: inherit; position: relative; border-top: var(--m3e-slide-group-divider-top); border-bottom: var(--m3e-slide-group-divider-bottom); scrollbar-width: none; } .content::-webkit-scrollbar { display: none; } :host([vertical]) .content { overflow-x: hidden; overflow-y: auto; } :host(:not([vertical])) .content { overflow-x: auto; overflow-y: hidden; }`;
__decorate([query(".content")], M3eSlideGroupElement.prototype, "scrollContainer", void 0);
__decorate([state()], M3eSlideGroupElement.prototype, "_canPage", void 0);
__decorate([state()], M3eSlideGroupElement.prototype, "_canPageStart", void 0);
__decorate([state()], M3eSlideGroupElement.prototype, "_canPageEnd", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSlideGroupElement.prototype, "disabled", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eSlideGroupElement.prototype, "vertical", void 0);
__decorate([property({
  type: Number
})], M3eSlideGroupElement.prototype, "threshold", void 0);
__decorate([property({
  attribute: "previous-page-label"
})], M3eSlideGroupElement.prototype, "previousPageLabel", void 0);
__decorate([property({
  attribute: "next-page-label"
})], M3eSlideGroupElement.prototype, "nextPageLabel", void 0);
__decorate([debounce(40)], M3eSlideGroupElement.prototype, "_updatePaging", null);
M3eSlideGroupElement = M3eSlideGroupElement_1 = __decorate([customElement("m3e-slide-group")], M3eSlideGroupElement);

export { M3eSlideGroupElement };
//# sourceMappingURL=SlideGroupElement.js.map
