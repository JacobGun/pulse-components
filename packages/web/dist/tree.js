/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, nothing, html, unsafeCSS, css } from 'lit';
import { query, state, property } from 'lit/decorators.js';
import { Disabled, AttachInternals, Role, MutationController, setCustomState, DesignToken, customElement, PressedController, FocusController, forcedColorsActive } from './TextOverflowElement.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { scrollIntoViewIfNeeded } from './scrollIntoViewIfNeeded.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { typeaheadLabel, selectionManager, SelectionManager } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';
import { Selected } from './Selected.js';
import { getTextContent } from './getTextContent.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';

var _M3eTreeItemElement_instances, _M3eTreeItemElement_treeMutationController, _M3eTreeItemElement_items, _M3eTreeItemElement_tree, _M3eTreeItemElement_path, _M3eTreeItemElement_link, _M3eTreeItemElement_labelText, _M3eTreeItemElement_renderIcon, _M3eTreeItemElement_handleOpenToggleIconSlotChange, _M3eTreeItemElement_handleIconSlotChange, _M3eTreeItemElement_handleSlotChange, _M3eTreeItemElement_handleItemSlotChange, _M3eTreeItemElement_handleTreeChange, _M3eTreeItemElement_handleClick, _M3eTreeItemElement_handleCheckboxClick, _M3eTreeItemElement_handleCollapsibleEvent;
var M3eTreeItemElement_1;
/**
 * An expandable item in a tree.
 *
 * @description
 * The `m3e-tree-item` component represents a single item within an `m3e-tree`.
 * It supports nested child items, expand/collapse behavior, selection,
 * disabled state, and interaction styling. Items may contain a child group
 * that hosts additional `m3e-tree-item` elements.
 *
 * @tag m3e-tree-item
 *
 * @slot - Renders the nested child items.
 * @slot label - Renders the label of the item.
 * @slot icon - Renders the icon of the item.
 * @slot selected-icon - Renders the icon of the item when selected.
 * @slot toggle-icon - Renders the toggle icon.
 * @slot open-toggle-icon - Renders the toggle icon when selected.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr indeterminate - Whether the element's checked state is indeterminate.
 * @attr open - Whether the item is expanded.
 * @attr selected - Whether the item is selected.
 *
 * @fires opening - Dispatched when the item begins to open.
 * @fires opened - Dispatched when the item has opened.
 * @fires closing - Dispatched when the item begins to close.
 * @fires closed - Dispatched when the item has closed.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-tree-item-font-size - Font size for the item label.
 * @cssprop --m3e-tree-item-font-weight - Font weight for the item label.
 * @cssprop --m3e-tree-item-line-height - Line height for the item label.
 * @cssprop --m3e-tree-item-tracking - Letter spacing for the item label.
 * @cssprop --m3e-tree-item-leading-space - Leading space for the item.
 * @cssprop --m3e-tree-item-trailing-space - Trailing space for the item.
 * @cssprop --m3e-tree-item-top-space - Top space for the item.
 * @cssprop --m3e-tree-item-bottom-space - Bottom space for the item.
 * @cssprop --m3e-tree-item-height - Height of the item.
 * @cssprop --m3e-tree-item-shape - Border radius of the item and focus ring.
 * @cssprop --m3e-tree-item-icon-size - Size of the icon.
 * @cssprop --m3e-tree-item-checkbox-label-space - Space between checkbox and label.
 * @cssprop --m3e-tree-item-icon-label-space - Space between icon and label.
 * @cssprop --m3e-tree-item-toggle-label-space - Space between toggle and label.
 * @cssprop --m3e-tree-item-inset - Indentation for nested items.
 * @cssprop --m3e-tree-item-label-color - Text color for the item label.
 * @cssprop --m3e-tree-item-selected-label-color - Text color for selected item label.
 * @cssprop --m3e-tree-item-selected-container-color - Background color for selected item.
 * @cssprop --m3e-tree-item-selected-container-focus-color - Focus color for selected item container.
 * @cssprop --m3e-tree-item-selected-container-hover-color - Hover color for selected item container.
 * @cssprop --m3e-tree-item-selected-ripple-color - Ripple color for selected item.
 * @cssprop --m3e-tree-item-unselected-container-focus-color - Focus color for unselected item container.
 * @cssprop --m3e-tree-item-unselected-container-hover-color - Hover color for unselected item container.
 * @cssprop --m3e-tree-item-unselected-ripple-color - Ripple color for unselected item.
 * @cssprop --m3e-tree-item-disabled-color - Text color for disabled item.
 * @cssprop --m3e-tree-item-disabled-color-opacity - Opacity for disabled item text color.
 */
let M3eTreeItemElement = M3eTreeItemElement_1 = class M3eTreeItemElement extends Selected(Disabled(AttachInternals(Role(LitElement, "treeitem"), true))) {
  constructor() {
    super(...arguments);
    _M3eTreeItemElement_instances.add(this);
    /** @private */
    this._hasChildItems = false;
    /** @private */
    this._multi = false;
    /** @private */
    _M3eTreeItemElement_treeMutationController.set(this, new MutationController(this, {
      target: null,
      skipInitial: true,
      config: {
        attributeFilter: ["multi"]
      },
      callback: () => __classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleTreeChange).call(this)
    }));
    /** @private */
    _M3eTreeItemElement_items.set(this, []);
    /** @private */
    _M3eTreeItemElement_tree.set(this, null);
    /** @private */
    _M3eTreeItemElement_path.set(this, new Array());
    /** @private */
    _M3eTreeItemElement_link.set(this, null);
    /** @private */
    _M3eTreeItemElement_labelText.set(this, "");
    /**
     * Whether the item is expanded.
     * @default false
     */
    this.open = false;
    /**
     * Whether the element's selected / checked state is indeterminate.
     * @default false
     */
    this.indeterminate = false;
  }
  /** A reference to the nested `HTMLAnchorElement`. */
  get link() {
    return __classPrivateFieldGet(this, _M3eTreeItemElement_link, "f");
  }
  /** @internal */
  [(_M3eTreeItemElement_treeMutationController = new WeakMap(), _M3eTreeItemElement_items = new WeakMap(), _M3eTreeItemElement_tree = new WeakMap(), _M3eTreeItemElement_path = new WeakMap(), _M3eTreeItemElement_link = new WeakMap(), _M3eTreeItemElement_labelText = new WeakMap(), _M3eTreeItemElement_instances = new WeakSet(), typeaheadLabel)]() {
    return __classPrivateFieldGet(this, _M3eTreeItemElement_labelText, "f");
  }
  /** A reference to the element used to present the label of the item. */
  get label() {
    return this._base ?? null;
  }
  /** Whether the item is visible. */
  get visible() {
    return !__classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").some(x => !x.open);
  }
  /** The full path of the item, starting with the top-most ancestor, including this item. */
  get path() {
    return [...__classPrivateFieldGet(this, _M3eTreeItemElement_path, "f"), this];
  }
  /** Whether the item has child items. */
  get hasChildItems() {
    return this._hasChildItems;
  }
  /** The parenting item. */
  get parentItem() {
    return __classPrivateFieldGet(this, _M3eTreeItemElement_path, "f")[__classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").length - 1] ?? null;
  }
  /** The items that immediately descend from this item. */
  get childItems() {
    return __classPrivateFieldGet(this, _M3eTreeItemElement_items, "f");
  }
  /** The one-based level of the item. */
  get level() {
    return __classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").length + 1;
  }
  /**
   * Expands this item, and optionally, all descendants.
   * @param {boolean} [descendants=false] Whether to expand all descendants.
   */
  expand(descendants = false) {
    if (this.hasChildItems) {
      this.open = true;
      if (descendants) {
        this.childItems.forEach(x => x.expand(true));
      }
    }
  }
  /**
   * Collapses this item, and optionally, all descendants.
   * @param {boolean} [descendants=false] Whether to collapse all descendants.
   */
  collapse(descendants = false) {
    if (this.hasChildItems) {
      this.open = false;
      if (descendants) {
        this.childItems.forEach(x => x.collapse(true));
      }
    }
  }
  /** Toggles the expanded state of the item. */
  toggle() {
    if (this.hasChildItems) {
      this.open = !this.open;
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").length = 0;
    for (let item = this.parentElement?.closest("m3e-tree-item"); item; item = item.parentElement?.closest("m3e-tree-item")) {
      __classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").push(item);
    }
    __classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").reverse();
    this.style.setProperty("--_tree-item-level", `${this.level - 1}`);
    __classPrivateFieldSet(this, _M3eTreeItemElement_tree, this.closest("m3e-tree"), "f");
    if (__classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")) {
      __classPrivateFieldGet(this, _M3eTreeItemElement_treeMutationController, "f").observe(__classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f"));
      __classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleTreeChange).call(this);
    }
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    __classPrivateFieldGet(this, _M3eTreeItemElement_path, "f").length = 0;
    if (__classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")) {
      __classPrivateFieldGet(this, _M3eTreeItemElement_treeMutationController, "f").unobserve(__classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f"));
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected") || changedProperties.has("indeterminate") || changedProperties.has("_multi")) {
      if (__classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.multi) {
        this.ariaSelected = null;
        this.ariaChecked = this.indeterminate ? "mixed" : `${this.selected}`;
      } else {
        this.ariaSelected = `${this.selected}`;
      }
    }
    if (changedProperties.has("selected")) {
      for (const icon of this.querySelectorAll(":scope > m3e-icon[slot]:not([slot='toggle-icon']):not([slot='open-toggle-icon'])")) {
        icon.toggleAttribute("filled", this.selected);
      }
    }
    if (changedProperties.has("open") || changedProperties.has("_hasChildItems")) {
      this.ariaExpanded = this._hasChildItems ? `${this.open}` : null;
    }
    if (changedProperties.has("_hasChildItems") && this.disabled || changedProperties.has("disabled")) {
      __classPrivateFieldGet(this, _M3eTreeItemElement_items, "f").forEach(x => x.disabled = this.disabled);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    const base = this._base;
    if (base) {
      [this.focusRing, this.stateLayer, this.ripple].forEach(x => x?.attach(base));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @click="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleClick)}"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" inward ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div aria-hidden="true" class="inset"></div><div aria-hidden="true" class="toggle"><slot name="toggle-icon"><svg class="toggle-icon" viewBox="0 -960 960 960" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></slot><slot name="open-toggle-icon" @slotchange="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleOpenToggleIconSlotChange)}"></slot></div>${this._multi ? html`<m3e-pseudo-checkbox class="checkbox" ?checked="${this.selected}" ?indeterminate="${this.indeterminate}" ?disabled="${this.disabled}" @click="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleCheckboxClick)}"></m3e-pseudo-checkbox>` : nothing}<div class="icon" aria-hidden="true">${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_renderIcon).call(this)}</div><div class="label"><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleSlotChange)}"></slot></div></div><m3e-collapsible class="group" role="group" aria-hidden="${ifDefined(this._hasChildItems ? undefined : "true")}" ?open="${this.open}" @opening="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleCollapsibleEvent)}" @opened="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleCollapsibleEvent)}" @closing="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleCollapsibleEvent)}" @closed="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleCollapsibleEvent)}"><slot @slotchange="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleItemSlotChange)}"></slot></m3e-collapsible>`;
  }
};
_M3eTreeItemElement_renderIcon = function _M3eTreeItemElement_renderIcon() {
  const icon = html`<slot name="icon" @slotchange="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleIconSlotChange)}"></slot>`;
  return this.selected && !this.hasChildItems ? html`<slot name="selected-icon" @slotchange="${__classPrivateFieldGet(this, _M3eTreeItemElement_instances, "m", _M3eTreeItemElement_handleIconSlotChange)}">${icon}</slot>` : icon;
};
_M3eTreeItemElement_handleOpenToggleIconSlotChange = function _M3eTreeItemElement_handleOpenToggleIconSlotChange(e) {
  setCustomState(this, "--with-open-toggle-icon", hasAssignedNodes(e.target));
};
_M3eTreeItemElement_handleIconSlotChange = function _M3eTreeItemElement_handleIconSlotChange(e) {
  setCustomState(this, "--with-icon", hasAssignedNodes(e.target));
};
_M3eTreeItemElement_handleSlotChange = function _M3eTreeItemElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eTreeItemElement_labelText, getTextContent(e.target, true), "f");
  __classPrivateFieldSet(this, _M3eTreeItemElement_link, e.target.assignedElements({
    flatten: true
  }).find(x => x instanceof HTMLAnchorElement) ?? null, "f");
  __classPrivateFieldGet(this, _M3eTreeItemElement_link, "f")?.setAttribute("tabindex", "-1");
};
_M3eTreeItemElement_handleItemSlotChange = function _M3eTreeItemElement_handleItemSlotChange(e) {
  __classPrivateFieldSet(this, _M3eTreeItemElement_items, e.target.assignedElements({
    flatten: true
  }).filter(x => x instanceof M3eTreeItemElement_1), "f");
  const hadChildItems = this._hasChildItems;
  this._hasChildItems = __classPrivateFieldGet(this, _M3eTreeItemElement_items, "f").length > 0;
  setCustomState(this, "--with-items", this._hasChildItems);
  if (hadChildItems || this._hasChildItems) {
    if (this._multi && __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.cascade) {
      let anySelected = false,
        anyDeselected = false;
      for (const child of this.querySelectorAll("m3e-tree-item")) {
        anySelected = anySelected || child.selected;
        anyDeselected = anyDeselected || !child.selected;
        if (anySelected && anyDeselected) {
          break;
        }
      }
      if (anyDeselected) {
        __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.[selectionManager].deselect(this);
        this.indeterminate = anySelected;
      } else {
        __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.[selectionManager].select(this, false);
        this.indeterminate = false;
      }
    }
  }
};
_M3eTreeItemElement_handleTreeChange = function _M3eTreeItemElement_handleTreeChange() {
  this._multi = __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.multi === true;
  setCustomState(this, "--multi", this._multi);
};
_M3eTreeItemElement_handleClick = function _M3eTreeItemElement_handleClick() {
  if (this.disabled) return;
  __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.[selectionManager].setActiveItem(this);
  if (!this._hasChildItems) {
    if (this._multi) {
      if (this.selected) {
        __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.deselect(this);
      } else {
        __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.select(this);
      }
    } else {
      __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.select(this);
    }
    __classPrivateFieldGet(this, _M3eTreeItemElement_link, "f")?.click();
  } else {
    if (!this._multi) {
      __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.select(this);
    }
    this.toggle();
  }
};
_M3eTreeItemElement_handleCheckboxClick = function _M3eTreeItemElement_handleCheckboxClick(e) {
  e.stopPropagation();
  if (!this.selected) {
    __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.select(this);
  } else {
    __classPrivateFieldGet(this, _M3eTreeItemElement_tree, "f")?.deselect(this);
  }
};
_M3eTreeItemElement_handleCollapsibleEvent = function _M3eTreeItemElement_handleCollapsibleEvent(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event(e.type, {
    bubbles: true
  }));
};
/** The styles of the element. */
M3eTreeItemElement.styles = css`:host { display: block; flex: none; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { contain: layout style; display: flex; align-items: center; position: relative; box-sizing: border-box; height: calc(var(--m3e-tree-item-height, 48px) + ${DesignToken.density.calc(-3)}); padding-inline-start: var( --m3e-tree-item-leading-space, var(--m3e-tree-item-padding, ${DesignToken.measurement.space200}) ); padding-inline-end: var( --m3e-tree-item-trailing-space, var(--m3e-tree-item-padding, ${DesignToken.measurement.space200}) ); padding-block-start: var(--m3e-tree-item-top-space, ${DesignToken.measurement.space100}); padding-block-end: var(--m3e-tree-item-bottom-space, ${DesignToken.measurement.space100}); font-size: var(--m3e-tree-item-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-tree-item-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-tree-item-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-tree-item-tracking, ${DesignToken.typescale.standard.label.large.tracking}); transition: ${unsafeCSS(`color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard},
        background-color ${DesignToken.motion.duration.short4} ${DesignToken.motion.easing.standard}`)}; } .base, .focus-ring { border-radius: var(--m3e-tree-item-shape, ${DesignToken.shape.corner.none}); } .label { flex: 1 1 auto; display: flex; align-items: center; position: relative; overflow: hidden; vertical-align: middle; } .checkbox { flex: none; margin-inline-end: var(--m3e-tree-item-checkbox-label-space, ${DesignToken.measurement.space100}); } .icon, .toggle { flex: none; align-items: center; justify-content: center; position: relative; vertical-align: middle; } .icon { margin-inline-end: var(--m3e-tree-item-icon-label-space, ${DesignToken.measurement.space100}); } .toggle { display: var(--_tree-item-toggle-display, none); margin-inline-end: var(--m3e-tree-item-toggle-label-space, ${DesignToken.measurement.space100}); } :host(:not(:is(:state(--with-icon), :--with-icon))) .icon { display: none; } .inset { margin-inline-start: calc( var(--m3e-tree-item-inset, ${DesignToken.measurement.space400}) * var(--_tree-item-level, 0) ); } :host([open]) .toggle-icon { transform: rotate(90deg); } :host(:not(:is(:state(--with-items), :--with-items))) .toggle { visibility: hidden; } :host(:not(:is(:state(--with-items), :--with-items))) .group { display: none; } ::slotted([slot="selected-icon"]), ::slotted([slot="icon"]), ::slotted([slot="toggle-icon"]), ::slotted([slot="open-toggle-icon"]), .toggle-icon { vertical-align: middle; width: 1em; height: 1em; font-size: var(--m3e-tree-item-icon-size, 24px); } .toggle-icon { transition: ${unsafeCSS(`transform var(--m3e-collapsible-animation-duration, ${DesignToken.motion.duration.medium1})
        ${DesignToken.motion.easing.standard}`)}; } :host(:is(:state(--with-open-toggle-icon), :--with-open-toggle-icon)[open]) slot[name="toggle-icon"], :host(:is(:state(--with-open-toggle-icon), :--with-open-toggle-icon):not([open])) slot[name="open-toggle-icon"] { display: none; } :host(:not(:disabled)) .base { cursor: pointer; } :host(:not(:disabled)) .base { color: var(--m3e-tree-item-label-color, ${DesignToken.color.onSurfaceVariant}); } :host(:disabled) .base { color: color-mix( in srgb, var(--m3e-tree-item-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-tree-item-disabled-color-opacity, 38%), transparent ); } :host([selected]:not(:disabled)) .base { color: var(--m3e-tree-item-selected-label-color, ${DesignToken.color.onSecondaryContainer}); background-color: var(--m3e-tree-item-selected-container-color, ${DesignToken.color.secondaryContainer}); --m3e-state-layer-focus-color: var( --m3e-tree-item-selected-container-focus-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-state-layer-hover-color: var( --m3e-tree-item-selected-container-hover-color, ${DesignToken.color.onSecondaryContainer} ); --m3e-ripple-color: var(--m3e-tree-item-selected-ripple-color, ${DesignToken.color.onSecondaryContainer}); } :host(:not([selected]):not(:disabled)) .base { --m3e-state-layer-focus-color: var( --m3e-tree-item-unselected-container-focus-color, ${DesignToken.color.onSurface} ); --m3e-state-layer-hover-color: var( --m3e-tree-item-unselected-container-hover-color, ${DesignToken.color.onSurface} ); --m3e-ripple-color: var(--m3e-tree-item-unselected-ripple-color, ${DesignToken.color.onSurface}); } .state-layer { margin-inline: auto; } ::slotted(a[slot="label"]) { all: unset; } @media (prefers-reduced-motion) { .base, .toggle, .state-layer { transition: none !important; } } @media (forced-colors: active) { .base, .state-layer { transition: none !important; } :host(:disabled) .base { color: GrayText; } :host(:not(:disabled)) .base { color: CanvasText; background-color: Canvas; } :host([selected]:not(:is(:state(--multi), :--multi)):not(:disabled)) slot[name="icon"], :host([selected]:not(:is(:state(--multi), :--multi)):not(:disabled)) slot[name="label"] { color: Highlight; } }`;
__decorate([query(".state-layer")], M3eTreeItemElement.prototype, "stateLayer", void 0);
__decorate([query(".focus-ring")], M3eTreeItemElement.prototype, "focusRing", void 0);
__decorate([query(".ripple")], M3eTreeItemElement.prototype, "ripple", void 0);
__decorate([query(".base")], M3eTreeItemElement.prototype, "_base", void 0);
__decorate([state()], M3eTreeItemElement.prototype, "_hasChildItems", void 0);
__decorate([state()], M3eTreeItemElement.prototype, "_multi", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTreeItemElement.prototype, "open", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTreeItemElement.prototype, "indeterminate", void 0);
M3eTreeItemElement = M3eTreeItemElement_1 = __decorate([customElement("m3e-tree-item")], M3eTreeItemElement);

var _M3eTreeElement_instances, _M3eTreeElement_ignoreFocusVisible, _M3eTreeElement_ignoreFocus, _M3eTreeElement_keyDownHandler, _M3eTreeElement_keyUpHandler, _M3eTreeElement_pointerDownHandler, _M3eTreeElement_handleSlotChange, _M3eTreeElement_handleKeyDown, _M3eTreeElement_activateFirstChild, _M3eTreeElement_handleKeyUp, _M3eTreeElement_handlePointerDown, _M3eTreeElement_activateItem, _M3eTreeElement_updateFocusVisible, _M3eTreeElement_updateItemFocusVisible, _M3eTreeElement_cascadeAncestorSelected, _b;
var M3eTreeElement_1;
/**
 * Presents hierarchical data in a tree structure.
 *
 * @description
 * The `m3e-tree` component presents hierarchical data in a structure that users can
 * navigate, with nested levels that open and collapse as needed.
 *
 * @example
 * The following example illustrates a simple tree with nested child items.
 * ```html
 * <m3e-tree>
 *   <m3e-tree-item open>
 *     <span slot="label">Getting Started</span>
 *     <m3e-tree-item>
 *       <span slot="label">Overview</span>
 *     </m3e-tree-item>
 *     <m3e-tree-item>
 *       <span slot="label">Installation</span>
 *     </m3e-tree-item>
 *   </m3e-tree-item>
 *   <m3e-tree-item>
 *     <span slot="label">Components</span>
 *     <m3e-tree-item>
 *       <span slot="label">Button</span>
 *     </m3e-tree-item>
 *     <m3e-tree-item>
 *       <span slot="label">Card</span>
 *     </m3e-tree-item>
 *   </m3e-tree-item>
 * </m3e-tree>
 * ```
 *
 * @example
 * The next example demonstrates multi-selection with cascading selection state.
 * ```html
 * <m3e-tree multi cascade>
 *   <m3e-tree-item>
 *     <span slot="label">Fruits</span>
 *     <m3e-tree-item>
 *       <span slot="label">Apples</span>
 *     </m3e-tree-item>
 *     <m3e-tree-item>
 *       <span slot="label">Oranges</span>
 *     </m3e-tree-item>
 *     <m3e-tree-item>
 *       <span slot="label">Bananas</span>
 *     </m3e-tree-item>
 *   </m3e-tree-item>
 *   <m3e-tree-item>
 *     <span slot="label">Vegetables</span>
 *     <m3e-tree-item>
 *       <span slot="label">Carrots</span>
 *     </m3e-tree-item>
 *     <m3e-tree-item>
 *       <span slot="label">Broccoli</span>
 *     </m3e-tree-item>
 *     <m3e-tree-item>
 *       <span slot="label">Spinach</span>
 *     </m3e-tree-item>
 *   </m3e-tree-item>
 * </m3e-tree>
 * ```
 *
 * @tag m3e-tree
 *
 * @slot - Renders the items of the tree.
 *
 * @attr multi - Whether multiple items can be selected.
 * @attr cascade -Whether multiple item selection cascades to child items.
 *
 * @fires change - Dispatched when the selected state changes.
 *
 * @cssprop --m3e-tree-scrollbar-width - Width of the tree scrollbar.
 * @cssprop --m3e-tree-scrollbar-color - Color of the tree scrollbar.
 */
let M3eTreeElement = M3eTreeElement_1 = class M3eTreeElement extends Role(LitElement, "tree") {
  constructor() {
    super();
    _M3eTreeElement_instances.add(this);
    /** @private */
    _M3eTreeElement_ignoreFocusVisible.set(this, false);
    /** @private */
    _M3eTreeElement_ignoreFocus.set(this, false);
    /** @private */
    this[_b] = new SelectionManager().withVerticalOrientation().withHomeAndEnd().withPageUpAndDown().withTypeahead().withSkipPredicate(x => x.disabled || !x.visible).disableRovingTabIndex().onActiveItemChange(() => {
      if (this[selectionManager].activeItem) {
        __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_activateItem).call(this, this[selectionManager].activeItem);
      }
    });
    /** @private */
    _M3eTreeElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eTreeElement_keyUpHandler.set(this, () => __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_handleKeyUp).call(this));
    /** @private */
    _M3eTreeElement_pointerDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_handlePointerDown).call(this, e));
    /**
     * Whether multiple items can be selected.
     * @default false
     */
    this.multi = false;
    /**
     * Whether multiple item selection cascades to child items.
     * @default false
     */
    this.cascade = false;
    new PressedController(this, {
      callback: pressed => __classPrivateFieldSet(this, _M3eTreeElement_ignoreFocus, pressed, "f")
    });
    new FocusController(this, {
      callback: () => {
        if (!__classPrivateFieldGet(this, _M3eTreeElement_ignoreFocus, "f")) {
          __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_updateFocusVisible).call(this);
        }
      }
    });
  }
  /** The selected items of the tree. */
  get selected() {
    return this[selectionManager].selectedItems;
  }
  /** All the items of the tree. */
  get items() {
    return this[selectionManager].items;
  }
  /** @internal */
  expand(itemsOrDescendants, maybeDescendants = false) {
    const items = Array.isArray(itemsOrDescendants) ? itemsOrDescendants : this[selectionManager].items;
    const descendants = typeof itemsOrDescendants === "boolean" ? itemsOrDescendants : maybeDescendants;
    items.forEach(x => x.expand(descendants));
  }
  /** @internal */
  collapse(itemsOrDescendants, maybeDescendants = false) {
    const items = Array.isArray(itemsOrDescendants) ? itemsOrDescendants : this[selectionManager].items;
    const descendants = typeof itemsOrDescendants === "boolean" ? itemsOrDescendants : maybeDescendants;
    items.forEach(x => x.collapse(descendants));
    const activeItem = this[selectionManager].activeItem;
    if (activeItem && !activeItem.visible) {
      for (let parent = activeItem.parentItem; parent; parent = parent.parentItem) {
        if (parent.visible) {
          this[selectionManager].setActiveItem(parent);
          break;
        }
      }
    }
  }
  /**
   * Selects the specified item.
   * @param {M3eTreeItemElement} item The item to select.
   * @param {boolean} [activate=false] Whether to activate the item.
   */
  select(item, activate = false) {
    this[selectionManager].select(item, activate);
    item.indeterminate = false;
    if (this.multi && this.cascade) {
      if (item.hasChildItems) {
        item.childItems.forEach(x => this.select(x));
      }
      __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_cascadeAncestorSelected).call(this, item);
    }
    if (activate) {
      __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_activateItem).call(this, item);
    }
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  /**
   * Deselects the specified item.
   * @param {M3eTreeItemElement} item The item to deselect.
   */
  deselect(item) {
    this[selectionManager].deselect(item);
    item.indeterminate = false;
    if (this.multi && this.cascade) {
      if (item.hasChildItems) {
        item.childItems.forEach(x => this.deselect(x));
      }
      __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_cascadeAncestorSelected).call(this, item);
    }
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eTreeElement_keyDownHandler, "f"));
    this.addEventListener("keyup", __classPrivateFieldGet(this, _M3eTreeElement_keyUpHandler, "f"));
    this.addEventListener("pointerdown", __classPrivateFieldGet(this, _M3eTreeElement_pointerDownHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eTreeElement_keyDownHandler, "f"));
    this.removeEventListener("keyup", __classPrivateFieldGet(this, _M3eTreeElement_keyUpHandler, "f"));
    this.removeEventListener("pointerdown", __classPrivateFieldGet(this, _M3eTreeElement_pointerDownHandler, "f"));
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("multi")) {
      this[selectionManager].multi = this.multi;
      if (this.multi) {
        this.setAttribute("aria-multiselectable", "true");
      } else {
        this.removeAttribute("aria-multiselectable");
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><slot @slotchange="${__classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_handleSlotChange)}"></slot></div>`;
  }
};
_M3eTreeElement_ignoreFocusVisible = new WeakMap();
_M3eTreeElement_ignoreFocus = new WeakMap();
_M3eTreeElement_keyDownHandler = new WeakMap();
_M3eTreeElement_keyUpHandler = new WeakMap();
_M3eTreeElement_pointerDownHandler = new WeakMap();
_M3eTreeElement_instances = new WeakSet();
_b = selectionManager;
_M3eTreeElement_handleSlotChange = function _M3eTreeElement_handleSlotChange() {
  const {
    added
  } = this[selectionManager].setItems([...this.querySelectorAll("m3e-tree-item")]);
  for (const item of added) {
    item.id = item.id || `m3e-tree-item-${M3eTreeElement_1.__nextId++}`;
  }
  if (this[selectionManager].activeItem) {
    this.setAttribute("aria-activedescendant", this[selectionManager].activeItem.id);
    __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_updateFocusVisible).call(this);
  } else {
    this.removeAttribute("aria-activedescendant");
  }
};
_M3eTreeElement_handleKeyDown = function _M3eTreeElement_handleKeyDown(e) {
  __classPrivateFieldSet(this, _M3eTreeElement_ignoreFocusVisible, false, "f");
  __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_updateFocusVisible).call(this);
  const item = this[selectionManager].activeItem;
  if (e.defaultPrevented || !item || item.disabled) return;
  switch (e.key) {
    case "Enter":
      if (!this.multi) {
        if (!item.selected) {
          this.select(item);
          item.link?.click();
        }
      } else {
        if (item.ripple && !item.ripple.visible) {
          item.ripple.centered = true;
          item.ripple.show(0, 0, true);
          item.ripple.centered = false;
        }
        item.link?.click();
      }
      break;
    case " ":
      e.preventDefault();
      if (this.multi) {
        if (item.selected) {
          this.deselect(item);
        } else {
          this.select(item);
        }
      } else {
        if (item.ripple && !item.ripple.visible) {
          item.ripple.centered = true;
          item.ripple.show(0, 0, true);
          item.ripple.centered = false;
        }
        this.select(item);
        item.link?.click();
      }
      break;
    case "*":
      e.preventDefault();
      item.expand(true);
      break;
    case "Left":
    case "ArrowLeft":
      e.preventDefault();
      if (M3eDirectionality.current === "ltr") {
        if (item.hasChildItems && item.open) {
          requestAnimationFrame(() => item.collapse());
        } else {
          const parent = item.parentItem;
          if (parent) {
            this[selectionManager].setActiveItem(parent);
          }
        }
      } else if (item.hasChildItems && !item.open) {
        item.expand();
      } else {
        __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_activateFirstChild).call(this, item);
      }
      break;
    case "Right":
    case "ArrowRight":
      e.preventDefault();
      if (M3eDirectionality.current === "rtl") {
        if (item.hasChildItems && item.open) {
          requestAnimationFrame(() => item.collapse());
        } else {
          const parent = item.parentItem;
          if (parent) {
            this[selectionManager].setActiveItem(parent);
          }
        }
      } else if (item.hasChildItems && !item.open) {
        item.expand();
      } else {
        __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_activateFirstChild).call(this, item);
      }
      break;
    default:
      this[selectionManager].onKeyDown(e);
      break;
  }
};
_M3eTreeElement_activateFirstChild = function _M3eTreeElement_activateFirstChild(item) {
  if (item.hasChildItems && item.open) {
    const child = item.childItems.find(x => !x.disabled);
    if (child) {
      this[selectionManager].setActiveItem(child);
    }
  }
};
_M3eTreeElement_handleKeyUp = function _M3eTreeElement_handleKeyUp() {
  const item = this[selectionManager].activeItem;
  if (item && !item.disabled && item.ripple?.visible) {
    item.ripple.hide();
  }
};
_M3eTreeElement_handlePointerDown = function _M3eTreeElement_handlePointerDown(e) {
  if (!e.defaultPrevented && !__classPrivateFieldGet(this, _M3eTreeElement_ignoreFocusVisible, "f") && !forcedColorsActive()) {
    __classPrivateFieldSet(this, _M3eTreeElement_ignoreFocusVisible, true, "f");
    const item = e.composedPath().reverse().find(x => x instanceof M3eTreeItemElement);
    if (item && !item.disabled) {
      __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_updateItemFocusVisible).call(this, item, true, false);
    }
  }
};
_M3eTreeElement_activateItem = function _M3eTreeElement_activateItem(item) {
  this.setAttribute("aria-activedescendant", item.id);
  if (item.label) {
    scrollIntoViewIfNeeded(item.label, this, {
      block: "nearest",
      behavior: "smooth"
    });
  }
  __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_updateFocusVisible).call(this);
};
_M3eTreeElement_updateFocusVisible = function _M3eTreeElement_updateFocusVisible() {
  const focusWithin = this.matches(":focus-within");
  const focused = focusWithin || this.matches(":focus");
  const focusVisible = focused && !__classPrivateFieldGet(this, _M3eTreeElement_ignoreFocusVisible, "f") && (forcedColorsActive() || this.matches(":focus-visible") || focusWithin && this.querySelector("a:focus-visible") !== null);
  this[selectionManager].items.forEach(x => {
    const active = x === this[selectionManager].activeItem;
    __classPrivateFieldGet(this, _M3eTreeElement_instances, "m", _M3eTreeElement_updateItemFocusVisible).call(this, x, active && focused, active && focusVisible);
  });
};
_M3eTreeElement_updateItemFocusVisible = function _M3eTreeElement_updateItemFocusVisible(item, focused, focusVisible) {
  if (focused && focusVisible) {
    item.stateLayer?.show("focused");
  } else {
    item.stateLayer?.hide("focused");
  }
  if (focusVisible) {
    item.focusRing?.show();
  } else {
    item.focusRing?.hide();
  }
};
_M3eTreeElement_cascadeAncestorSelected = function _M3eTreeElement_cascadeAncestorSelected(item) {
  for (let parent = item.parentItem; parent; parent = parent.parentItem) {
    let hasSelected = false,
      hasDeselected = false;
    for (const child of parent.querySelectorAll("m3e-tree-item")) {
      hasSelected = hasSelected || child.selected;
      hasDeselected = hasDeselected || !child.selected;
      if (hasSelected && hasDeselected) {
        break;
      }
    }
    if (hasDeselected) {
      this[selectionManager].deselect(parent);
      parent.indeterminate = hasSelected;
    } else {
      this[selectionManager].select(parent, false);
      parent.indeterminate = false;
    }
  }
};
(() => {
  // NOTE: unsafeCSS used here due to linting error with use of '>'.
  registerStyleSheet(css`${unsafeCSS(`m3e-tree:has(> m3e-tree-item:is(:state(--with-items), :--with-items)) {
        --_tree-item-toggle-display: flex;
      }`)}`);
})();
/** The styles of the element. */
M3eTreeElement.styles = css`:host { display: block; outline: none; overflow-y: auto; overflow-x: hidden; min-height: 0; scrollbar-width: ${DesignToken.scrollbar.width}; scrollbar-color: ${DesignToken.scrollbar.color}; } :host([hidden]) { display: none; } .base { contain: layout style; width: 100%; display: flex; flex-direction: column; position: relative; min-height: inherit; box-sizing: border-box; }`;
/** @private */
M3eTreeElement.__nextId = 0;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTreeElement.prototype, "multi", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eTreeElement.prototype, "cascade", void 0);
M3eTreeElement = M3eTreeElement_1 = __decorate([customElement("m3e-tree")], M3eTreeElement);

export { M3eTreeElement, M3eTreeItemElement };
//# sourceMappingURL=tree.js.map
