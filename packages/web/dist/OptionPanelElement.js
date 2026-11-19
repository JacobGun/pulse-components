/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { Disabled, AttachInternals, Role, setCustomState, DesignToken, customElement, MutationController, deleteCustomState, addCustomState } from './TextOverflowElement.js';
import { query, property } from 'lit/decorators.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import 'lit/directives/if-defined.js';
import { M3eFloatingPanelElement } from './FloatingPanelElement.js';
import { typeaheadLabel, removeAriaReferencedId, addAriaReferencedId } from './LiveAnnouncer.js';
import { Selected } from './Selected.js';
import { DeferredPromise } from './DeferredPromise.js';
import { getTextContent } from './getTextContent.js';

var _M3eOptionElement_instances, _M3eOptionElement_value, _M3eOptionElement_textContent, _M3eOptionElement_valueReady, _M3eOptionElement_labelReady, _M3eOptionElement_handleSlotChange;
/**
 * An option that can be selected.
 *
 * @description
 * The `m3e-option` component represents an individual selectable item within an option list,
 * adhering to Material Design 3 specifications. It provides visual feedback through state layers and ripple effects,
 * supports single and multiple selection modes, and includes comprehensive accessibility features including
 * keyboard navigation and focus management. The component automatically manages its visual appearance based on
 * selection and disabled states, with configurable styling for interactive and non-interactive variants.
 *
 * @tag m3e-option
 *
 * @slot - Renders the label of the option.
 *
 * @attr disabled - Whether the element is disabled.
 * @attr disable-highlight - Whether text highlighting is disabled.
 * @attr highlight-mode - The mode in which to highlight a term.
 * @attr selected - Whether the element is selected.
 * @attr term - The search term to highlight.
 * @attr value - A string representing the value of the option.
 *
 * @cssprop --m3e-option-container-height - The height of the option container.
 * @cssprop --m3e-option-color - The text color of the option.
 * @cssprop --m3e-option-container-hover-color - The color for the hover state layer.
 * @cssprop --m3e-option-container-focus-color - The color for the focus state layer.
 * @cssprop --m3e-option-ripple-color - The color of the ripple effect.
 * @cssprop --m3e-option-selected-color - The text color when the option is selected.
 * @cssprop --m3e-option-selected-container-color - The background color when the option is selected.
 * @cssprop --m3e-option-selected-container-hover-color - The hover color for the selected state layer.
 * @cssprop --m3e-option-selected-container-focus-color - The focus color for the selected state layer.
 * @cssprop --m3e-option-selected-ripple-color - The ripple color when the option is selected.
 * @cssprop --m3e-option-disabled-color - The text color when the option is disabled.
 * @cssprop --m3e-option-disabled-opacity - The opacity level applied to the disabled text color.
 * @cssprop --m3e-option-icon-label-space - The spacing between the icon and label.
 * @cssprop --m3e-option-padding-start - The left padding of the option content.
 * @cssprop --m3e-option-padding-end - The right padding of the option content.
 * @cssprop --m3e-option-label-text-font-size - The font size of the option label.
 * @cssprop --m3e-option-label-text-font-weight - The font weight of the option label.
 * @cssprop --m3e-option-label-text-line-height - The line height of the option label.
 * @cssprop --m3e-option-label-text-tracking - The letter spacing of the option label.
 * @cssprop --m3e-option-focus-ring-shape - The corner radius of the focus ring.
 * @cssprop --m3e-option-icon-size - The size of the option icons.
 * @cssprop --m3e-option-shape - Base shape of the option.
 * @cssprop --m3e-option-selected-shape - Shape used for a selected option.
 * @cssprop --m3e-option-first-child-shape - Shape for the first option in a list.
 * @cssprop --m3e-option-last-child-shape - Shape for the last option in a list.
 */
let M3eOptionElement = class M3eOptionElement extends Selected(Disabled(AttachInternals(Role(LitElement, "option")))) {
  constructor() {
    super(...arguments);
    _M3eOptionElement_instances.add(this);
    /** @private */
    _M3eOptionElement_value.set(this, void 0);
    /** @private */
    _M3eOptionElement_textContent.set(this, "");
    /** @private */
    _M3eOptionElement_valueReady.set(this, new DeferredPromise());
    /** @private */
    _M3eOptionElement_labelReady.set(this, new DeferredPromise());
    /**
     * The search term to highlight.
     * @default ""
     */
    this.term = "";
    /**
     * The mode in which to highlight a term.
     * @default "contains"
     */
    this.highlightMode = "contains";
    /**
     * Whether text highlighting is disabled.
     * @default false
     */
    this.disableHighlight = false;
  }
  /** A string representing the value of the option. */
  get value() {
    return __classPrivateFieldGet(this, _M3eOptionElement_value, "f") ?? __classPrivateFieldGet(this, _M3eOptionElement_textContent, "f");
  }
  set value(value) {
    __classPrivateFieldSet(this, _M3eOptionElement_value, value, "f");
  }
  /** The textual label of the option. */
  get label() {
    return __classPrivateFieldGet(this, _M3eOptionElement_textContent, "f");
  }
  /** Returns a `Promise` that resolves when the label is ready. */
  get labelReady() {
    return __classPrivateFieldGet(this, _M3eOptionElement_labelReady, "f").ready;
  }
  /** Returns a `Promise` that resolves when the value is ready. */
  get valueReady() {
    return __classPrivateFieldGet(this, _M3eOptionElement_valueReady, "f").ready;
  }
  /** @internal */
  [(_M3eOptionElement_value = new WeakMap(), _M3eOptionElement_textContent = new WeakMap(), _M3eOptionElement_valueReady = new WeakMap(), _M3eOptionElement_labelReady = new WeakMap(), _M3eOptionElement_instances = new WeakSet(), typeaheadLabel)]() {
    return this.label;
  }
  /** Whether the option represents an empty option. */
  get isEmpty() {
    return this.value === "";
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    [this.focusRing, this.stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this.focusRing, this.stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("value")) {
      __classPrivateFieldGet(this, _M3eOptionElement_valueReady, "f").resolve();
    }
    if (changedProperties.has("selected") && this.selected) {
      const panel = this.closest("[role='listbox']") ?? this.closest("m3e-autocomplete") ?? this.closest("m3e-select");
      if (panel && panel.ariaMultiSelectable !== "true" && !panel.hasAttribute("multi")) {
        panel.querySelectorAll("m3e-option").forEach(x => {
          if (x !== this && x.selected) {
            x.selected = false;
          }
        });
      }
    }
    if (changedProperties.has("selected") || changedProperties.has("disabled")) {
      this["dispatchEvent"](new CustomEvent("state-change", {
        bubbles: true
      }));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div class="touch" aria-hidden="true"></div><div class="wrapper"><div class="icon" aria-hidden="true"><svg class="check" viewBox="0 -960 960 960"><path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></div><m3e-text-overflow class="label"><m3e-text-highlight term="${this.term}" mode="${this.highlightMode}" ?disabled="${this.disableHighlight || this.selected}"><slot @slotchange="${__classPrivateFieldGet(this, _M3eOptionElement_instances, "m", _M3eOptionElement_handleSlotChange)}"></slot></m3e-text-highlight></m3e-text-overflow></div></div>`;
  }
};
_M3eOptionElement_handleSlotChange = function _M3eOptionElement_handleSlotChange(e) {
  __classPrivateFieldSet(this, _M3eOptionElement_textContent, getTextContent(e.target), "f");
  setCustomState(this, "--empty", this.isEmpty);
  __classPrivateFieldGet(this, _M3eOptionElement_labelReady, "f").resolve();
  __classPrivateFieldGet(this, _M3eOptionElement_valueReady, "f").resolve();
  if (this.selected) {
    this.closest("m3e-select")?.requestUpdate?.();
  }
};
/** The styles of the element. */
M3eOptionElement.styles = css`:host { display: block; outline: none; user-select: none; flex: none; height: calc(var(--m3e-option-container-height, 44px) + ${DesignToken.density.calc(-3)}); -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } :host(:not([aria-disabled="true"])) .base { color: var(--m3e-option-color, ${DesignToken.color.onSurface}); --m3e-state-layer-hover-color: var(--m3e-option-container-hover-color, ${DesignToken.color.onSurface}); --m3e-state-layer-focus-color: var(--m3e-option-container-focus-color, ${DesignToken.color.onSurface}); --m3e-ripple-color: var(--m3e-option-ripple-color, ${DesignToken.color.onSurface}); } :host(:not([aria-disabled="true"]):not(:is(:state(--empty), :--empty))[selected]) .base { color: var(--m3e-option-selected-color, ${DesignToken.color.onTertiaryContainer}); background-color: var(--m3e-option-selected-container-color, ${DesignToken.color.tertiaryContainer}); --m3e-state-layer-hover-color: var( --m3e-option-selected-container-hover-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-state-layer-focus-color: var( --m3e-option-selected-container-focus-color, ${DesignToken.color.onTertiaryContainer} ); --m3e-ripple-color: var(--m3e-option-selected-ripple-color, ${DesignToken.color.onTertiaryContainer}); } :host(:not([aria-disabled="true"])) { cursor: pointer; } :host([aria-disabled="true"]) .base { color: color-mix( in srgb, var(--m3e-option-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-option-disabled-opacity, 38%), transparent ); } .base { box-sizing: border-box; vertical-align: middle; display: inline-flex; align-items: center; position: relative; width: 100%; height: 100%; border-radius: var(--m3e-option-shape, ${DesignToken.shape.corner.extraSmall}); transition: ${unsafeCSS(`border-radius ${DesignToken.motion.spring.fastEffects}`)}; } :host([selected]:not(:is(:state(--first), :--first))) .base { border-top-left-radius: var(--m3e-option-selected-shape, ${DesignToken.shape.corner.medium}); border-top-right-radius: var(--m3e-option-selected-shape, ${DesignToken.shape.corner.medium}); } :host([selected]:not(:is(:state(--last), :--last))) .base { border-bottom-left-radius: var(--m3e-option-selected-shape, ${DesignToken.shape.corner.medium}); border-bottom-right-radius: var(--m3e-option-selected-shape, ${DesignToken.shape.corner.medium}); } :host(:is(:state(--first), :--first)) .base { border-top-left-radius: var(--m3e-option-first-child-shape, ${DesignToken.shape.corner.medium}); border-top-right-radius: var(--m3e-option-first-child-shape, ${DesignToken.shape.corner.medium}); } :host(:is(:state(--last), :--last)) .base { border-bottom-left-radius: var(--m3e-option-last-child-shape, ${DesignToken.shape.corner.medium}); border-bottom-right-radius: var(--m3e-option-last-child-shape, ${DesignToken.shape.corner.medium}); } .touch { position: absolute; height: calc( var(--m3e-option-container-height, 44px) + calc(var(--m3e-option-panel-gap, ${DesignToken.measurement.space25}) * 2) + ${DesignToken.density.calc(-3)} ); left: 0; right: 0; } .wrapper { flex: 1 1 auto; display: inline-flex; align-items: center; width: 100%; overflow: hidden; column-gap: var(--m3e-option-icon-label-space, ${DesignToken.measurement.space100}); padding-inline-start: var( --_option-padding-start, var(--m3e-option-padding-start, ${DesignToken.measurement.space150}) ); padding-inline-end: var(--m3e-option-padding-end, ${DesignToken.measurement.space150}); font-size: var(--m3e-option-label-text-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-option-label-text-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-option-label-text-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-option-label-text-tracking, ${DesignToken.typescale.standard.label.large.tracking}); } .focus-ring { border-radius: var(--m3e-option-focus-ring-shape, inherit); } .icon { margin-inline-start: calc(0px - var(--m3e-option-icon-label-space, ${DesignToken.measurement.space100})); transition: ${unsafeCSS(`margin-inline-start ${DesignToken.motion.spring.fastEffects}, width ${DesignToken.motion.spring.fastEffects}`)}; } :host([selected]) .icon { margin-inline-start: 0; width: var(--m3e-option-icon-size, 20px); } .icon { flex: none; width: 0px; font-size: var(--m3e-option-icon-size, 20px); } :host(:is(:state(--empty), :--empty)) .icon, :host(:is(:state(--hide-selection-indicator), :--hide-selection-indicator)) .icon, :host(:not([selected])) .check { display: none; } @media (forced-colors: active) { .base { background-color: Menu; color: MenuText; } :host([aria-disabled="true"]) .base { color: GrayText; } } @media (prefers-reduced-motion) { .icon, .base { transition: none; } }`;
__decorate([query(".focus-ring")], M3eOptionElement.prototype, "focusRing", void 0);
__decorate([query(".state-layer")], M3eOptionElement.prototype, "stateLayer", void 0);
__decorate([query(".ripple")], M3eOptionElement.prototype, "_ripple", void 0);
__decorate([property({
  useDefault: true
})], M3eOptionElement.prototype, "value", null);
__decorate([property()], M3eOptionElement.prototype, "term", void 0);
__decorate([property({
  attribute: "highlight-mode"
})], M3eOptionElement.prototype, "highlightMode", void 0);
__decorate([property({
  attribute: "disable-highlight",
  type: Boolean
})], M3eOptionElement.prototype, "disableHighlight", void 0);
M3eOptionElement = __decorate([customElement("m3e-option")], M3eOptionElement);

var _M3eOptGroupElement_instances, _M3eOptGroupElement_labelId, _M3eOptGroupElement_label, _M3eOptGroupElement_handleLabelSlotChange;
var M3eOptGroupElement_1;
/**
 * Groups options under a subheading.
 *
 * @description
 * The `m3e-optgroup` component organizes related options within an option list,
 * providing visual and semantic grouping through a customizable label. It manages `aria-labelledby`
 * associations automatically and applies Material Design 3 typography and spacing conventions to
 * the group label. The component maintains proper semantic structure by utilizing the ARIA `group` role,
 * ensuring that assistive technologies correctly interpret the hierarchical relationship between the label
 * and contained options.
 *
 * @tag m3e-optgroup
 *
 * @slot - Renders the options of the group.
 * @slot label - Renders the label of the group.
 *
 * @cssprop --m3e-option-height - The height of the group label container.
 * @cssprop --m3e-option-font-size - The font size of the group label.
 * @cssprop --m3e-option-font-weight - The font weight of the group label.
 * @cssprop --m3e-option-line-height - The line height of the group label.
 * @cssprop --m3e-option-tracking - The letter spacing of the group label.
 * @cssprop --m3e-option-padding-end - The right padding of the label.
 * @cssprop --m3e-option-padding-start - The left padding of the label.
 * @cssprop --m3e-option-color - The text color of the group label.
 */
let M3eOptGroupElement = M3eOptGroupElement_1 = class M3eOptGroupElement extends Role(LitElement, "group") {
  constructor() {
    super(...arguments);
    _M3eOptGroupElement_instances.add(this);
    /** @private */
    _M3eOptGroupElement_labelId.set(this, `m3e-optgroup-label-${M3eOptGroupElement_1.__nextId++}`);
    /** @private */
    _M3eOptGroupElement_label.set(this, void 0);
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-text-overflow class="label"><slot name="label" @slotchange="${__classPrivateFieldGet(this, _M3eOptGroupElement_instances, "m", _M3eOptGroupElement_handleLabelSlotChange)}"></slot></m3e-text-overflow><slot></slot>`;
  }
};
_M3eOptGroupElement_labelId = new WeakMap();
_M3eOptGroupElement_label = new WeakMap();
_M3eOptGroupElement_instances = new WeakSet();
_M3eOptGroupElement_handleLabelSlotChange = function _M3eOptGroupElement_handleLabelSlotChange(e) {
  const label = e.target.assignedElements({
    flatten: true
  })[0] ?? undefined;
  if (label === __classPrivateFieldGet(this, _M3eOptGroupElement_label, "f")) return;
  if (__classPrivateFieldGet(this, _M3eOptGroupElement_label, "f")?.id) {
    removeAriaReferencedId(this, "aria-labelledby", __classPrivateFieldGet(this, _M3eOptGroupElement_label, "f").id);
    if (__classPrivateFieldGet(this, _M3eOptGroupElement_label, "f").id === __classPrivateFieldGet(this, _M3eOptGroupElement_labelId, "f")) {
      __classPrivateFieldGet(this, _M3eOptGroupElement_label, "f").id = "";
    }
  }
  __classPrivateFieldSet(this, _M3eOptGroupElement_label, label, "f");
  if (__classPrivateFieldGet(this, _M3eOptGroupElement_label, "f")) {
    __classPrivateFieldGet(this, _M3eOptGroupElement_label, "f").id = __classPrivateFieldGet(this, _M3eOptGroupElement_label, "f").id || __classPrivateFieldGet(this, _M3eOptGroupElement_labelId, "f");
    addAriaReferencedId(this, "aria-labelledby", __classPrivateFieldGet(this, _M3eOptGroupElement_label, "f").id);
  }
};
/** The styles of the element. */
M3eOptGroupElement.styles = css`:host { display: block; --_option-padding-start: calc(var(--m3e-option-padding-start, ${DesignToken.measurement.space150}) * 2); } :host([hidden]) { display: none; } .label { height: var(--m3e-option-height, 48px); font-size: var(--m3e-option-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var(--m3e-option-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight}); line-height: var(--m3e-option-line-height, ${DesignToken.typescale.standard.label.large.lineHeight}); letter-spacing: var(--m3e-option-tracking, ${DesignToken.typescale.standard.label.large.tracking}); padding-inline-end: var(--m3e-option-padding-end, ${DesignToken.measurement.space150}); padding-inline-start: var(--m3e-option-padding-start, ${DesignToken.measurement.space150}); color: var(--m3e-option-color, ${DesignToken.color.onSurface}); flex: none; }`;
/** @private */
M3eOptGroupElement.__nextId = 0;
M3eOptGroupElement = M3eOptGroupElement_1 = __decorate([customElement("m3e-optgroup")], M3eOptGroupElement);

var _M3eOptionPanelElement_instances, _M3eOptionPanelElement_handleOptionStateChange, _M3eOptionPanelElement_handleNoDataSlotChange, _M3eOptionPanelElement_handleLoadingSlotChange, _M3eOptionPanelElement_handleMutation;
/**
 * Presents a list of options on a temporary surface.
 *
 * @description
 * The `m3e-option-panel` component renders a scrollable container for displaying selectable options
 * as a Material Design 3 menu surface. It provides dynamic positioning and anchoring to trigger elements,
 * automatic viewport boundary detection with intelligent repositioning, and smooth enter/exit animations.
 *
 * @tag m3e-option-panel
 *
 * @slot - Renders the contents of the list.
 * @slot no-data - Renders content shown when there is no data.
 * @slot loading - Renders content shown while the panel is loading.
 *
 * @fires beforetoggle - Dispatched before the toggle state changes.
 * @fires toggle - Dispatched after the toggle state has changed.
 *
 * @cssprop --m3e-option-panel-container-shape - Corner radius of the panel container.
 * @cssprop --m3e-option-panel-container-min-width - Minimum width of the panel container.
 * @cssprop --m3e-option-panel-container-max-width - Maximum width of the panel container.
 * @cssprop --m3e-option-panel-container-max-height - Maximum height of the panel container.
 * @cssprop --m3e-option-panel-container-padding-block - Vertical padding inside the panel container.
 * @cssprop --m3e-option-panel-container-padding-inline - Horizontal padding inside the panel container.
 * @cssprop --m3e-option-panel-container-color - Background color of the panel container.
 * @cssprop --m3e-option-panel-container-elevation - Box shadow elevation of the panel container.
 * @cssprop --m3e-option-panel-gap - Vertical spacing between option items.
 * @cssprop --m3e-option-panel-divider-spacing - Vertical spacing around slotted `m3e-divider` elements.
 * @cssprop --m3e-option-panel-text-highlight-container-color - Background color used for text highlight matches.
 * @cssprop --m3e-option-panel-text-highlight-color - Text color used for text highlight matches.
 */
let M3eOptionPanelElement = class M3eOptionPanelElement extends Role(M3eFloatingPanelElement, "listbox") {
  constructor() {
    super();
    _M3eOptionPanelElement_instances.add(this);
    new MutationController(this, {
      config: {
        childList: true,
        subtree: true
      },
      callback: () => __classPrivateFieldGet(this, _M3eOptionPanelElement_instances, "m", _M3eOptionPanelElement_handleMutation).call(this)
    });
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eOptionPanelElement_instances, "m", _M3eOptionPanelElement_handleMutation).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base" @state-change="${__classPrivateFieldGet(this, _M3eOptionPanelElement_instances, "m", _M3eOptionPanelElement_handleOptionStateChange)}"><slot></slot><div class="no-data" aria-hidden="true"><slot name="no-data" @slotchange="${__classPrivateFieldGet(this, _M3eOptionPanelElement_instances, "m", _M3eOptionPanelElement_handleNoDataSlotChange)}"></slot></div><div class="loading" aria-hidden="true"><slot name="loading" @slotchange="${__classPrivateFieldGet(this, _M3eOptionPanelElement_instances, "m", _M3eOptionPanelElement_handleLoadingSlotChange)}"></slot></div></div>`;
  }
};
_M3eOptionPanelElement_instances = new WeakSet();
_M3eOptionPanelElement_handleOptionStateChange = function _M3eOptionPanelElement_handleOptionStateChange(e) {
  if (e.target instanceof M3eOptionElement) {
    e.stopImmediatePropagation();
  }
};
_M3eOptionPanelElement_handleNoDataSlotChange = function _M3eOptionPanelElement_handleNoDataSlotChange(e) {
  setCustomState(this, "--with-no-data", hasAssignedNodes(e.target));
};
_M3eOptionPanelElement_handleLoadingSlotChange = function _M3eOptionPanelElement_handleLoadingSlotChange(e) {
  setCustomState(this, "--with-loading", hasAssignedNodes(e.target));
  setCustomState(this, "--with-loading-indicator", this.querySelector("m3e-loading-indicator[slot='loading'], m3e-circular-progress-indicator[slot='loading']") !== null);
};
_M3eOptionPanelElement_handleMutation = function _M3eOptionPanelElement_handleMutation() {
  const options = this.querySelectorAll("m3e-option");
  let first = false;
  let last;
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (option.hidden === true) {
      deleteCustomState(option, "--first");
      deleteCustomState(option, "--last");
    } else if (!first && !(option.parentElement instanceof M3eOptGroupElement)) {
      addCustomState(option, "--first");
      first = true;
      addCustomState(option, "--last");
      last = option;
    } else {
      deleteCustomState(option, "--first");
      if (last) {
        deleteCustomState(last, "--last");
      }
      addCustomState(option, "--last");
      last = option;
    }
  }
};
(() => {
  registerStyleSheet(css`m3e-option-panel > m3e-divider { margin-block: var(--m3e-option-panel-divider-spacing, ${DesignToken.measurement.space100}); }`);
})();
/** The styles of the element. */
M3eOptionPanelElement.styles = [M3eFloatingPanelElement.styles, css`:host { --m3e-floating-panel-container-shape: var( --m3e-option-panel-container-shape, ${DesignToken.shape.corner.large} ); --m3e-floating-panel-container-min-width: var(--m3e-option-panel-container-min-width, 112px); --m3e-floating-panel-container-max-width: var(--m3e-option-panel-container-max-width, 280px); --m3e-floating-panel-container-max-height: var(--m3e-option-panel-container-max-height, 282px); --m3e-floating-panel-container-color: var( --m3e-option-panel-container-color, ${DesignToken.color.surfaceContainer} ); --m3e-floating-panel-container-elevation: var( --m3e-option-panel-container-elevation, ${DesignToken.elevation.level3} ); --m3e-floating-panel-container-padding-inline: var( --m3e-option-panel-container-padding-inline, ${DesignToken.measurement.space50} ); --m3e-floating-panel-container-padding-block: var( --m3e-option-panel-container-padding-block, ${DesignToken.measurement.space50} ); } :host([hidden]) { display: none; } .base { row-gap: var(--m3e-option-panel-gap, ${DesignToken.measurement.space25}); --m3e-focus-ring-outward-offset: 0px; --m3e-focus-ring-growth-factor: 1.5; } .no-data { display: flex; align-items: center; box-sizing: border-box; min-height: var(--m3e-option-panel-no-data-container-height, 44px); padding: var(--m3e-option-panel-no-data-container-padding, ${DesignToken.measurement.space150}); color: var(--m3e-option-panel-no-data-color, ${DesignToken.color.onSurfaceVariant}); font-size: var(--m3e-option-panel-no-data-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var( --m3e-option-panel-no-data-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight} ); line-height: var( --m3e-option-panel-no-data-line-height, ${DesignToken.typescale.standard.label.large.lineHeight} ); letter-spacing: var( --m3e-option-panel-no-data-tracking, ${DesignToken.typescale.standard.label.large.tracking} ); } .loading { display: flex; align-items: center; box-sizing: border-box; min-height: var(--m3e-option-panel-loading-container-height, 44px); padding: var(--m3e-option-panel-loading-container-padding, ${DesignToken.measurement.space150}); color: var(--m3e-option-panel-loading-color, ${DesignToken.color.onSurfaceVariant}); font-size: var(--m3e-option-panel-loading-font-size, ${DesignToken.typescale.standard.label.large.fontSize}); font-weight: var( --m3e-option-panel-loading-font-weight, ${DesignToken.typescale.standard.label.large.fontWeight} ); line-height: var( --m3e-option-panel-loading-line-height, ${DesignToken.typescale.standard.label.large.lineHeight} ); letter-spacing: var( --m3e-option-panel-loading-tracking, ${DesignToken.typescale.standard.label.large.tracking} ); } :host(:is(:state(--no-data), :--no-data)) slot:not([name]), :host(:is(:state(--loading), :--loading)) slot:not([name]), :host(:is(:state(--loading), :--loading)) .no-data, :host(:not(:is(:state(--no-data), :--no-data))) .no-data, :host(:not(:is(:state(--with-no-data), :--with-no-data))) .no-data, :host(:not(:is(:state(--loading), :--loading))) .loading, :host(:not(:is(:state(--with-loading), :--with-loading))) .loading { display: none; } :host(:is(:state(--no-data), :--no-data)) .base, :host(:is(:state(--loading), :--loading)) .base { overflow-y: hidden; } :host(:is(:state(--with-loading-indicator), :--with-loading-indicator)) .loading { padding: 0; justify-content: center; }`];
M3eOptionPanelElement = __decorate([customElement("m3e-option-panel")], M3eOptionPanelElement);

export { M3eOptGroupElement, M3eOptionElement, M3eOptionPanelElement };
//# sourceMappingURL=OptionPanelElement.js.map
