/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { LitElement, html, css, nothing } from 'lit';
import { state, query, property } from 'lit/decorators.js';
import { Role, customElement, HtmlFor, Disabled, AttachInternals, deleteCustomState, DesignToken, ActionElementBase, ReconnectedCallback, addCustomState, hasCustomState, setCustomState } from './TextOverflowElement.js';
import { Selected } from './Selected.js';
import { Focusable } from './Focusable.js';
import { KeyboardClick } from './KeyboardClick.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { addAriaReferencedId, removeAriaReferencedId, selectionManager, SelectionManager } from './LiveAnnouncer.js';
import { M3eDirectionality } from './Directionality.js';
import { SupportsDirectionality } from './SupportsDirectionality.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { M3eBreakpointObserver, Breakpoint } from './BreakpointObserver.js';

/**
 * A panel presented for a step in a wizard-like workflow.
 *
 * @description
 * The `m3e-step-panel` is a container for presenting contextual content and actions
 * associated with a single step in a structured workflow.
 *
 * @example
 * The following example demonstrates a linear multi-step form flow using the `m3e-stepper`
 * component. Each `m3e-step` defines a navigable step label, linked to its corresponding
 * `m3e-step-panel` via the `for` attribute. Navigation is orchestrated using the
 * `m3e-stepper-next`, `m3e-stepper-previous`, and `m3e-stepper-reset` components.
 *
 * <m3e-stepper>
 *  <m3e-step for="step1">Fill out your name</m3e-step>
 *  <m3e-step for="step2">Fill out your address</m3e-step>
 *  <m3e-step for="step3">Done</m3e-step>
 *  <m3e-step-panel id="step1">
 *    <form>
 *      <m3e-form-field>
 *        <label slot="label" for="name">Name</label>
 *        <input name="name" id="name" required />
 *      </m3e-form-field>
 *    </form>
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-next>Next</m3e-stepper-next></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 *  <m3e-step-panel id="step2">
 *    <form>
 *      <m3e-form-field>
 *        <label slot="label" for="address">Address</label>
 *        <input name="address" id="address" required />
 *      </m3e-form-field>
 *    </form>
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-previous>Back</m3e-stepper-previous></m3e-button>
 *      <m3e-button><m3e-stepper-next>Next</m3e-stepper-next></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 *  <m3e-step-panel id="step3">Done
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-previous>Back</m3e-stepper-previous></m3e-button>
 *      <m3e-button><m3e-stepper-reset>Reset</m3e-stepper-reset></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 * </m3e-stepper>
 *
 * @tag m3e-step-panel
 *
 * @slot - Renders the content of the panel.
 * @slot actions - Renders the actions bar of the panel.
 *
 * @cssprop --m3e-step-panel-padding - Padding inside the step panel container, defining internal spacing around content.
 * @cssprop --m3e-step-panel-spacing - Vertical gap between stacked elements within the step panel.
 * @cssprop --m3e-step-panel-actions-height - Minimum height of the slotted actions container.
 */
let M3eStepPanelElement = class M3eStepPanelElement extends Role(LitElement, "tabpanel") {
  constructor() {
    super(...arguments);
    /** @internal */
    this.active = false;
  }
  /** @inheritdoc */
  connectedCallback() {
    this.slot = "panel";
    super.connectedCallback();
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-collapsible ?open="${this.active}"><div class="content"><div><slot></slot></div><slot name="actions"></slot></div></m3e-collapsible>`;
  }
};
/** The styles of the element. */
M3eStepPanelElement.styles = css`:host { display: block; } :host([hidden]) { display: none; } .content { contain: layout style paint; display: flex; flex-direction: column; padding: var(--m3e-step-panel-padding, 16px 24px 24px 24px); row-gap: var(--m3e-step-panel-spacing, 8px); } ::slotted([slot="actions"]) { flex: none; display: flex; align-items: center; min-height: var(--m3e-step-panel-actions-height, 48px); } ::slotted([slot="actions"][end]) { justify-content: flex-end; }`;
__decorate([state()], M3eStepPanelElement.prototype, "active", void 0);
M3eStepPanelElement = __decorate([customElement("m3e-step-panel")], M3eStepPanelElement);

var _M3eStepElement_instances, _M3eStepElement_clickHandler, _M3eStepElement_renderIcon, _M3eStepElement_handleClick;
var M3eStepElement_1;
/**
 * A step in a wizard-like workflow.
 *
 * @description
 * The `m3e-step` component represents a single step in a structured, wizard-like workflow.
 * It supports semantic labeling, stateful styling, and optional interaction for completed,
 * selected, invalid, or disabled states. It aligns with Material Design guidance for progressive
 * disclosure, accessible navigation, and visual continuity across horizontal and vertical layouts.
 *
 * @example
 * The following example demonstrates a linear multi-step form flow using the `m3e-stepper`
 * component. Each `m3e-step` defines a navigable step label, linked to its corresponding
 * `m3e-step-panel` via the `for` attribute. Navigation is orchestrated using the
 * `m3e-stepper-next`, `m3e-stepper-previous`, and `m3e-stepper-reset` components.
 *
 * <m3e-stepper>
 *  <m3e-step for="step1">Fill out your name</m3e-step>
 *  <m3e-step for="step2">Fill out your address</m3e-step>
 *  <m3e-step for="step3">Done</m3e-step>
 *  <m3e-step-panel id="step1">
 *    <form>
 *      <m3e-form-field>
 *        <label slot="label" for="name">Name</label>
 *        <input name="name" id="name" required />
 *      </m3e-form-field>
 *    </form>
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-next>Next</m3e-stepper-next></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 *  <m3e-step-panel id="step2">
 *    <form>
 *      <m3e-form-field>
 *        <label slot="label" for="address">Address</label>
 *        <input name="address" id="address" required />
 *      </m3e-form-field>
 *    </form>
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-previous>Back</m3e-stepper-previous></m3e-button>
 *      <m3e-button><m3e-stepper-next>Next</m3e-stepper-next></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 *  <m3e-step-panel id="step3">Done
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-previous>Back</m3e-stepper-previous></m3e-button>
 *      <m3e-button><m3e-stepper-reset>Reset</m3e-stepper-reset></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 * </m3e-stepper>
 *
 * @tag m3e-step
 *
 * @slot - Renders the label of the step.
 * @slot icon - Renders the icon of the step.
 * @slot done-icon - Renders the icon of a completed step.
 * @slot edit-icon - Renders the icon of a completed editable step.
 * @slot error-icon - Renders icon of an invalid step.
 * @slot hint - Renders the hint text of the step.
 * @slot error - Renders the error message for an invalid step.
 *
 * @attr completed - Whether the step has been completed.
 * @attr disabled - Whether the element is disabled.
 * @attr editable - Whether the step is editable and users can return to it after completion.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr optional - Whether the step is optional.
 * @attr selected - Whether the element is selected.
 *
 * @fires beforeinput - Dispatched before the selected state changes.
 * @fires input - Dispatched when the selected state changes.
 * @fires change - Dispatched when the selected state changes.
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-step-shape - Border radius of the step container, defining its visual shape.
 * @cssprop --m3e-step-padding - Internal padding of the step container, used for layout spacing.
 * @cssprop --m3e-step-icon-shape - Border radius of the icon container, controlling its geometric form.
 * @cssprop --m3e-step-icon-size - Width and height of the icon container and icon glyph.
 * @cssprop --m3e-step-selected-icon-container-color - Background color of the icon when the step is selected.
 * @cssprop --m3e-step-selected-icon-color - Foreground color of the icon when the step is selected.
 * @cssprop --m3e-step-completed-icon-container-color - Background color of the icon when the step is completed.
 * @cssprop --m3e-step-completed-icon-color - Foreground color of the icon when the step is completed.
 * @cssprop --m3e-step-unselected-icon-container-color - Background color of the icon when the step is inactive.
 * @cssprop --m3e-step-unselected-icon-color - Foreground color of the icon when the step is inactive.
 * @cssprop --m3e-step-icon-error-color - Foreground color of the icon when the step is invalid.
 * @cssprop --m3e-step-disabled-icon-container-color - Base color used to mix the disabled icon background.
 * @cssprop --m3e-step-disabled-icon-color - Base color used to mix the disabled icon foreground.
 * @cssprop --m3e-step-label-color - Text color of the step label in its default state.
 * @cssprop --m3e-step-label-error-color - Text color of the step label when the step is invalid.
 * @cssprop --m3e-step-disabled-label-color - Base color used to mix the disabled label foreground.
 * @cssprop --m3e-step-font-size - Font size of the step label.
 * @cssprop --m3e-step-font-weight - Font weight of the step label.
 * @cssprop --m3e-step-line-height - Line height of the step label.
 * @cssprop --m3e-step-tracking - Letter spacing of the step label.
 * @cssprop --m3e-step-icon-label-space - Gap between icon and label.
 * @cssprop --m3e-step-hint-font-size - Font size of hint and error messages.
 * @cssprop --m3e-step-hint-font-weight - Font weight of hint and error messages.
 * @cssprop --m3e-step-hint-line-height - Line height of hint and error messages.
 * @cssprop --m3e-step-hint-tracking - Letter spacing of hint and error messages.
 * @cssprop --m3e-step-hint-color - Text color of hint messages in valid state.
 * @cssprop --m3e-step-disabled-hint-color - Base color used to mix the disabled hint foreground.
 */
let M3eStepElement = M3eStepElement_1 = class M3eStepElement extends SupportsDirectionality(Selected(KeyboardClick(Focusable(HtmlFor(Disabled(AttachInternals(Role(LitElement, "tab")))))))) {
  constructor() {
    super(...arguments);
    _M3eStepElement_instances.add(this);
    /** @private */
    _M3eStepElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eStepElement_instances, "m", _M3eStepElement_handleClick).call(this, e));
    /**
     * Whether the step is optional.
     * @default false
     */
    this.optional = false;
    /**
     * Whether the step is editable and users can return to it after completion.
     * @default false
     */
    this.editable = false;
    /**
     * Whether the step has been completed.
     * @default false
     */
    this.completed = false;
    /**
     * Whether the step has an error.
     * @default false
     */
    this.invalid = false;
    /** @internal */
    this.index = -1;
  }
  /** A reference to the panel controlled by the step. */
  get panel() {
    return this.control instanceof M3eStepPanelElement ? this.control : null;
  }
  /** The stepper to which this step belongs. */
  get stepper() {
    return this.closest("m3e-stepper");
  }
  /** Resets the step to its initial state, clearing any form data. */
  reset() {
    this.invalid = false;
    this.completed = false;
    this.panel?.querySelector("form")?.reset();
  }
  /** @inheritdoc */
  attach(control) {
    if (control instanceof M3eStepPanelElement) {
      control.id = control.id || `m3e-step-panel-${M3eStepElement_1.__nextId++}`;
      addAriaReferencedId(this, "aria-controls", control.id);
      control.style.order = this.style.order;
    }
    super.attach(control);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      this.control.style.order = "";
      if (this.control.id) {
        removeAriaReferencedId(this, "aria-controls", this.control.id);
      }
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    this.slot = "step";
    super.connectedCallback();
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eStepElement_clickHandler, "f"));
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eStepElement_clickHandler, "f"));
    deleteCustomState(this, "--vertical");
    deleteCustomState(this, "--first");
    deleteCustomState(this, "--last");
    deleteCustomState(this, "--label-below");
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      this.closest("m3e-stepper")?.[selectionManager].notifySelectionChange(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    [this._focusRing, this._stateLayer, this._ripple].forEach(x => x?.attach(this));
  }
  /** @inheritdoc */
  render() {
    const hint = html`<slot name="hint">${this.optional ? html`<span class="hint">(Optional)</span>` : nothing}</slot>`;
    const error = html`<slot name="error">${hint}</slot>`;
    return html`<div aria-hidden="true" class="divider start"></div><div class="base"><m3e-state-layer class="state-layer" ?disabled="${this.disabled}"></m3e-state-layer><m3e-focus-ring class="focus-ring" ?disabled="${this.disabled}"></m3e-focus-ring><m3e-ripple class="ripple" ?disabled="${this.disabled}"></m3e-ripple><div class="wrapper"><div class="icon" aria-hidden="true">${__classPrivateFieldGet(this, _M3eStepElement_instances, "m", _M3eStepElement_renderIcon).call(this)}</div><div class="label"><slot></slot>${this.invalid ? error : hint}</div></div></div><div aria-hidden="true" class="divider end"></div>`;
  }
};
_M3eStepElement_clickHandler = new WeakMap();
_M3eStepElement_instances = new WeakSet();
_M3eStepElement_renderIcon = function _M3eStepElement_renderIcon() {
  if (!this.selected) {
    if (this.invalid) {
      return html`<slot name="error-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg></slot>`;
    }
    if (this.completed) {
      if (this.editable) {
        return html`<slot name="edit-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></slot>`;
      }
      return html`<slot name="done-icon"><svg viewBox="0 -960 960 960" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></slot>`;
    }
  }
  return html`<slot name="icon">${this.index + 1}</slot>`;
};
_M3eStepElement_handleClick = function _M3eStepElement_handleClick(e) {
  if (this.disabled) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  if (e.defaultPrevented || this.selected) return;
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  })) && this.closest("m3e-stepper")?._moveTo(this.index)) {
    this.selected = true;
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
/** The styles of the element. */
M3eStepElement.styles = css`:host { display: flex; flex-direction: column; outline: none; min-width: 0px; position: relative; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } .base { contain: layout style; min-width: inherit; position: relative; border-radius: var(--m3e-step-shape, ${DesignToken.shape.corner.medium}); padding: var(--m3e-step-padding, ${DesignToken.measurement.space300}); } :host(:is(:state(--vertical), :--vertical)) { flex-direction: column; } :host(:not(:is(:state(--vertical), :--vertical))) { pointer-events: none; flex-direction: row; flex: 1 1 auto; align-self: stretch; } :host(:not(:is(:state(--vertical), :--vertical))) .base { pointer-events: auto; } :host(:is(:state(--vertical), :--vertical)) .divider, :host(:is(:state(--first), :--first)) .divider.start, :host(:is(:state(--last), :--last)) .divider.end { display: none; } :host(:not(:is(:state(--vertical), :--vertical))) .divider { flex: 1 1 auto; min-width: 32px; position: relative; } :host(:not(:is(:state(--vertical), :--vertical))) .divider, :host(:not(:is(:state(--vertical), :--vertical))) .base { align-self: stretch; } :host(:not(:is(:state(--vertical), :--vertical))) .divider::before { content: ""; position: absolute; left: 0px; right: 0px; border-bottom-width: var(--m3e-step-divider-thickness, 1px); border-bottom-style: solid; border-bottom-color: var(--m3e-step-divider-color, ${DesignToken.color.outline}); } :host(:not(:is(:state(--vertical), :--vertical)):not(:is(:state(--label-below), :--label-below))) .divider::before { top: 50%; } :host(:not(:is(:state(--vertical), :--vertical)):is(:state(--label-below), :--label-below)) .divider::before { top: calc(var(--m3e-step-padding, ${DesignToken.measurement.space300}) + (var(--m3e-step-icon-size, 24px) / 2)); } :host(:not(:is(:state(--vertical), :--vertical)):not(:is(:state(--first), :--first))) .base::before, :host(:not(:is(:state(--vertical), :--vertical)):not(:is(:state(--last), :--last))) .base::after { content: ""; position: absolute; top: 50%; border-bottom-width: var(--m3e-step-divider-thickness, 1px); border-bottom-style: solid; border-bottom-color: var(--m3e-step-divider-color, ${DesignToken.color.outline}); } :host( :not(:is(:state(--vertical), :--vertical)):not(:is(:state(--first), :--first)):is( :state(--label-below), :--label-below ) ) .base::before, :host( :not(:is(:state(--vertical), :--vertical)):not(:is(:state(--last), :--last)):is( :state(--label-below), :--label-below ) ) .base::after { top: 0; } :host( :not(:is(:state(--vertical), :--vertical)):not(:is(:state(--first), :--first)):is( :state(--label-below), :--label-below ) ) .base::before, :host( :not(:is(:state(--vertical), :--vertical)):not(:is(:state(--last), :--last)):is( :state(--label-below), :--label-below ) ) .base::after { margin-block-start: calc(var(--m3e-step-padding, 24px) + calc(var(--m3e-step-icon-size, 24px) / 2)); } :host( :not(:is(:state(--rtl), :--rtl)):not(:is(:state(--vertical), :--vertical)):not( :is(:state(--label-below), :--label-below) ):not(:is(:state(--first), :--first)) ) .base::before { left: 0; right: calc(100% - var(--m3e-step-padding, 24px) + var(--m3e-step-divider-inset, 8px)); } :host( :is(:state(--rtl), :--rtl):not(:is(:state(--vertical), :--vertical)):not( :is(:state(--label-below), :--label-below) ):not(:is(:state(--first), :--first)) ) .base::before { right: 0; left: calc(100% - var(--m3e-step-padding, 24px) + var(--m3e-step-divider-inset, 8px)); } :host( :not(:is(:state(--rtl), :--rtl)):not(:is(:state(--vertical), :--vertical)):not( :is(:state(--label-below), :--label-below) ):not(:is(:state(--last), :--last)) ) .base::after { left: calc(100% - var(--m3e-step-padding, 24px) + var(--m3e-step-divider-inset, 8px)); right: 0; } :host( :is(:state(--rtl), :--rtl):not(:is(:state(--vertical), :--vertical)):not( :is(:state(--label-below), :--label-below) ):not(:is(:state(--last), :--last)) ) .base::after { right: calc(100% - var(--m3e-step-padding, 24px) + var(--m3e-step-divider-inset, 8px)); left: 0; } :host( :not(:is(:state(--rtl), :--rtl)):not(:is(:state(--vertical), :--vertical)):is( :state(--label-below), :--label-below ):not(:is(:state(--first), :--first)) ) .base::before { left: 0; right: calc(50% + calc(var(--m3e-step-icon-size, 24px) / 2) + var(--m3e-step-divider-inset, 8px)); } :host( :is(:state(--rtl), :--rtl):not(:is(:state(--vertical), :--vertical)):is( :state(--label-below), :--label-below ):not(:is(:state(--first), :--first)) ) .base::before { right: 0; left: calc(50% + calc(var(--m3e-step-icon-size, 24px) / 2) + var(--m3e-step-divider-inset, 8px)); } :host( :not(:is(:state(--rtl), :--rtl)):not(:is(:state(--vertical), :--vertical)):is( :state(--label-below), :--label-below ):not(:is(:state(--last), :--last)) ) .base::after { left: calc(50% + calc(var(--m3e-step-icon-size, 24px) / 2) + var(--m3e-step-divider-inset, 8px)); right: 0; } :host( :is(:state(--rtl), :--rtl):not(:is(:state(--vertical), :--vertical)):is( :state(--label-below), :--label-below ):not(:is(:state(--last), :--last)) ) .base::after { right: calc(50% + calc(var(--m3e-step-icon-size, 24px) / 2) + var(--m3e-step-divider-inset, 8px)); left: 0; } :host(:is(:state(--vertical), :--vertical)) { flex: none; } :host(:not([aria-disabled="true"])) { cursor: pointer; } .icon { flex: none; display: flex; align-items: center; justify-content: center; border-radius: var(--m3e-step-icon-shape, 50%); width: var(--m3e-step-icon-size, 24px); height: var(--m3e-step-icon-size, 24px); } .icon svg, ::slotted([slot="icon"]), ::slotted([slot="edit-icon"]), ::slotted([slot="done-icon"]), ::slotted([slot="error-icon"]) { width: 1em; font-size: var(--m3e-step-icon-size, 24px) !important; } :host(:not([aria-disabled="true"])[selected]) .icon { background-color: var(--m3e-step-selected-icon-container-color, ${DesignToken.color.primary}); color: var(--m3e-step-selected-icon-color, ${DesignToken.color.onPrimary}); } :host(:not([aria-disabled="true"])[completed]:not([invalid])) .icon { background-color: var(--m3e-step-completed-icon-container-color, ${DesignToken.color.primary}); color: var(--m3e-step-completed-icon-color, ${DesignToken.color.onPrimary}); } :host(:not([aria-disabled="true"]):not([selected]):not([completed]):not([invalid])) .icon { background-color: var(--m3e-step-unselected-icon-container-color, ${DesignToken.color.inverseSurface}); color: var(--m3e-step-unselected-icon-color, ${DesignToken.color.inverseOnSurface}); } :host(:not([aria-disabled="true"]):not([selected])[invalid]) .icon { color: var(--m3e-step-icon-error-color, ${DesignToken.color.error}); } :host([aria-disabled="true"]) .icon { background-color: color-mix( in srgb, var(--m3e-step-disabled-icon-container-color, ${DesignToken.color.onSurface}) 10%, transparent ); color: color-mix(in srgb, var(--m3e-step-disabled-icon-color, ${DesignToken.color.onSurface}) 38%, transparent); } :host(:not([aria-disabled="true"])) .label { color: var(--m3e-step-label-color, ${DesignToken.color.onSurface}); } :host(:not([aria-disabled="true"]):not([selected])[invalid]) .label { color: var(--m3e-step-label-error-color, ${DesignToken.color.error}); } :host([aria-disabled="true"]) .label { color: color-mix(in srgb, var(--m3e-step-disabled-label-color, ${DesignToken.color.onSurface}) 38%, transparent); } .wrapper { display: flex; align-items: center; height: 100%; border-radius: inherit; font-size: var(--m3e-step-font-size, ${DesignToken.typescale.standard.title.small.fontSize}); font-weight: var(--m3e-step-font-weight, ${DesignToken.typescale.standard.title.small.fontWeight}); line-height: var(--m3e-step-line-height, ${DesignToken.typescale.standard.title.small.lineHeight}); letter-spacing: var(--m3e-step-tracking, ${DesignToken.typescale.standard.title.small.tracking}); gap: var(--m3e-step-icon-label-space, ${DesignToken.measurement.space100}); justify-content: flex-start; } :host(:not(:is(:state(--vertical), :--vertical)):is(:state(--label-below), :--label-below)) .wrapper { flex-direction: column; } .label { display: flex; flex-direction: column; align-items: flex-start; } :host(:not(:is(:state(--vertical), :--vertical)):is(:state(--label-below), :--label-below)) .label { align-items: center; justify-content: center; text-align: center; } ::slotted([slot="hint"]), .hint, ::slotted([slot="error"]) { font-size: var(--m3e-step-hint-font-size, ${DesignToken.typescale.standard.body.small.fontSize}); font-weight: var(--m3e-step-hint-font-weight, ${DesignToken.typescale.standard.body.small.fontWeight}); line-height: var(--m3e-step-hint-line-height, ${DesignToken.typescale.standard.body.small.lineHeight}); letter-spacing: var(--m3e-step-hint-tracking, ${DesignToken.typescale.standard.body.small.tracking}); } :host(:not([aria-disabled="true"]):not([invalid])) ::slotted([slot="hint"]), :host(:not([aria-disabled="true"]):not([invalid])) .hint { color: var(--m3e-step-hint-color, ${DesignToken.color.onSurfaceVariant}); } :host([aria-disabled="true"]) ::slotted([slot="hint"]), :host([aria-disabled="true"]) .hint { color: color-mix(in srgb, var(--m3e-step-disabled-hint-color, ${DesignToken.color.onSurface}) 38%, transparent); }`;
/** @private */
M3eStepElement.__nextId = 0;
__decorate([query(".focus-ring")], M3eStepElement.prototype, "_focusRing", void 0);
__decorate([query(".state-layer")], M3eStepElement.prototype, "_stateLayer", void 0);
__decorate([query(".ripple")], M3eStepElement.prototype, "_ripple", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eStepElement.prototype, "optional", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eStepElement.prototype, "editable", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eStepElement.prototype, "completed", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eStepElement.prototype, "invalid", void 0);
__decorate([state()], M3eStepElement.prototype, "index", void 0);
M3eStepElement = M3eStepElement_1 = __decorate([customElement("m3e-step")], M3eStepElement);

/**
 * Determines whether a value is a `StepHeaderPosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `StepHeaderPosition`.
 */
function isStepHeaderPosition(value) {
  return value === "above" || value === "below";
}

/**
 * Determines whether a value is a `StepLabelPosition`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `StepLabelPosition`.
 */
function isStepLabelPosition(value) {
  return value === "below" || value === "end";
}

var _StepperButtonElementBase_action;
/** A base implementation for a button used to move to a step in a stepper. This class must be inherited. */
class StepperButtonElementBase extends ActionElementBase {
  constructor(action) {
    super();
    /** @private */
    _StepperButtonElementBase_action.set(this, void 0);
    __classPrivateFieldSet(this, _StepperButtonElementBase_action, action, "f");
  }
  /** @inheritdoc */
  _onClick() {
    switch (__classPrivateFieldGet(this, _StepperButtonElementBase_action, "f")) {
      case "next":
        this.closest("m3e-stepper")?.moveNext();
        break;
      case "previous":
        this.closest("m3e-stepper")?.movePrevious();
        break;
      case "reset":
        this.closest("m3e-stepper")?.reset();
        break;
    }
  }
}
_StepperButtonElementBase_action = new WeakMap();

/**
 * Determines whether a value is a `StepperOrientation`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `StepperOrientation`.
 */
function isStepperOrientation(value) {
  return value === "horizontal" || value === "vertical" || value === "auto";
}

var _M3eStepperElement_instances, _M3eStepperElement_breakpointUnobserve, _M3eStepperElement_directionalitySubscription, _M3eStepperElement_applyOrientation, _M3eStepperElement_applyLabelPosition, _M3eStepperElement_applyHeaderPosition, _M3eStepperElement_renderHeader, _M3eStepperElement_handleChange, _M3eStepperElement_handleSlotChange, _M3eStepperElement_handleKeyDown, _M3eStepperElement_handleSelectedChange, _M3eStepperElement_checkValidity, _M3eStepperElement_initBreakpointMonitoring, _M3eStepperElement_updateDisplayOrder, _M3eStepperElement_updateLabelPosition, _a;
/**
 * Provides a wizard-like workflow by dividing content into logical steps.
 *
 * @description
 * The `m3e-stepper` component orchestrates a structured, wizard-like workflow by dividing
 * content into discrete, navigable steps. It supports horizontal and vertical orientations,
 * linear progression, and configurable label and header positioning.
 *
 * @example
 * The following example demonstrates a linear multi-step form flow using the `m3e-stepper`
 * component. Each `m3e-step` defines a navigable step label, linked to its corresponding
 * `m3e-step-panel` via the `for` attribute. Navigation is orchestrated using the
 * `m3e-stepper-next`, `m3e-stepper-previous`, and `m3e-stepper-reset` components.
 *
 * <m3e-stepper>
 *  <m3e-step for="step1">Fill out your name</m3e-step>
 *  <m3e-step for="step2">Fill out your address</m3e-step>
 *  <m3e-step for="step3">Done</m3e-step>
 *  <m3e-step-panel id="step1">
 *    <form>
 *      <m3e-form-field>
 *        <label slot="label" for="name">Name</label>
 *        <input name="name" id="name" required />
 *      </m3e-form-field>
 *    </form>
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-next>Next</m3e-stepper-next></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 *  <m3e-step-panel id="step2">
 *    <form>
 *      <m3e-form-field>
 *        <label slot="label" for="address">Address</label>
 *        <input name="address" id="address" required />
 *      </m3e-form-field>
 *    </form>
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-previous>Back</m3e-stepper-previous></m3e-button>
 *      <m3e-button><m3e-stepper-next>Next</m3e-stepper-next></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 *  <m3e-step-panel id="step3">Done
 *    <div slot="actions">
 *      <m3e-button><m3e-stepper-previous>Back</m3e-stepper-previous></m3e-button>
 *      <m3e-button><m3e-stepper-reset>Reset</m3e-stepper-reset></m3e-button>
 *    </div>
 *  </m3e-step-panel>
 * </m3e-stepper>
 *
 * @tag m3e-stepper
 *
 * @attr header-position - The position of the step header, when oriented horizontally.
 * @attr label-position - The position of the step labels, when oriented horizontally.
 * @attr linear - Whether the validity of previous steps should be checked or not.
 * @attr orientation - The orientation of the stepper.
 *
 * @slot step - Renders a step.
 * @slot panel - Renders a panel.
 *
 * @fires beforeinput - Dispatched before the selected state of a step changes.
 * @fires input - Dispatched when the selected state of a step changes.
 * @fires change - Dispatched when the selected step changes.
 *
 * @cssprop --m3e-step-divider-thickness - Thickness of the divider line between steps.
 * @cssprop --m3e-step-divider-color - Color of the divider line between steps.
 * @cssprop --m3e-step-divider-inset - Inset offset for divider alignment within step layout.
 */
let M3eStepperElement = class M3eStepperElement extends SupportsDirectionality(ReconnectedCallback(AttachInternals(LitElement))) {
  constructor() {
    super(...arguments);
    _M3eStepperElement_instances.add(this);
    /** @private */
    _M3eStepperElement_breakpointUnobserve.set(this, void 0);
    /** @private */
    _M3eStepperElement_directionalitySubscription.set(this, void 0);
    /** @private */
    this._selectedIndex = null;
    /** @internal */
    this[_a] = new SelectionManager().withHomeAndEnd().withWrap().onSelectedItemsChange(() => __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_handleSelectedChange).call(this)).withDirectionality(M3eDirectionality.current);
    /**
     * The position of the step header, when oriented horizontally.
     * @default "above"
     */
    this.headerPosition = "above";
    /**
     * The position of the step labels, when oriented horizontally.
     * @default "end"
     */
    this.labelPosition = "end";
    /**
     * Whether the validity of previous steps should be checked or not.
     * @default false
     */
    this.linear = false;
    /**
     * The orientation of the stepper.
     * @default "horizontal"
     */
    this.orientation = "horizontal";
  }
  /** The steps. */
  get steps() {
    return this[selectionManager]?.items ?? [];
  }
  /** The selected step. */
  get selectedStep() {
    return this._selectedIndex !== null ? this.steps[this._selectedIndex] ?? null : null;
  }
  /** The zero-based index of the selected step. */
  get selectedIndex() {
    return this._selectedIndex ?? -1;
  }
  /**
   * Moves the stepper to the previous step.
   * @returns {boolean} Whether the stepper moved to the previous step.
   */
  movePrevious() {
    return this.moveTo((this._selectedIndex ?? 1) - 1);
  }
  /**
   * Moves the stepper to the next step.
   * @returns {boolean} Whether the stepper moved to the next step.
   */
  moveNext() {
    return this.moveTo((this._selectedIndex ?? -1) + 1);
  }
  /**
   * Moves the stepper to the step with the specified index.
   * @param index The zero-based index of the step to which to move.
   * @returns {boolean} Whether the stepper moved to the specified `index`.
   */
  moveTo(index) {
    if (this._moveTo(index)) {
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return true;
    }
    return false;
  }
  /** @internal */
  _moveTo(index) {
    const selectedStep = this.selectedStep;
    if (selectedStep && selectedStep.index === index) {
      return true;
    }
    if (this.steps[index]?.disabled) {
      return false;
    }
    if (index >= 0 && index < this.steps.length) {
      if (selectedStep) {
        const valid = __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_checkValidity).call(this);
        if (this.linear) {
          if (index < selectedStep.index) {
            const previousStep = this[selectionManager].items[index];
            if (!previousStep || previousStep.completed && !previousStep.editable) {
              return false;
            }
          } else if (index > selectedStep.index + 1) {
            const nextStep = this[selectionManager].items[index];
            if (!nextStep || !nextStep.completed) {
              return false;
            }
          } else if (!valid && !selectedStep.optional) {
            return false;
          }
        }
        selectedStep.completed = true;
      }
      this._selectedIndex = index;
      this[selectionManager].select(this.selectedStep);
      return true;
    }
    return false;
  }
  /** Resets the stepper to its initial state, clearing any form data. */
  reset() {
    this.steps.forEach(x => x.reset());
    const index = this.steps.findIndex(x => !x.disabled);
    if (index !== this._selectedIndex) {
      this._selectedIndex = index;
      this[selectionManager].select(this.selectedStep);
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_applyOrientation).call(this);
    __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_applyHeaderPosition).call(this);
    __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_applyLabelPosition).call(this);
    addCustomState(this, "--no-animate");
    __classPrivateFieldSet(this, _M3eStepperElement_directionalitySubscription, M3eDirectionality.observe(() => this[selectionManager].directionality = M3eDirectionality.current), "f");
  }
  /** @inheritdoc */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._orientation = undefined;
    __classPrivateFieldGet(this, _M3eStepperElement_breakpointUnobserve, "f")?.call(this);
    __classPrivateFieldGet(this, _M3eStepperElement_directionalitySubscription, "f")?.call(this);
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    if (this.orientation === "auto") {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_initBreakpointMonitoring).call(this);
    }
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("headerPosition")) {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_applyHeaderPosition).call(this);
    }
    if (changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_applyOrientation).call(this);
      __classPrivateFieldGet(this, _M3eStepperElement_breakpointUnobserve, "f")?.call(this);
      if (this.orientation === "auto") {
        __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_initBreakpointMonitoring).call(this);
      } else {
        this._orientation = undefined;
        __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateDisplayOrder).call(this);
      }
    }
    if (changedProperties.has("_orientation")) {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateDisplayOrder).call(this);
    }
    if (changedProperties.has("labelPosition")) {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_applyLabelPosition).call(this);
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateLabelPosition).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (!_changedProperties.has("orientation")) {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateDisplayOrder).call(this);
    }
    if (!_changedProperties.has("labelPosition")) {
      __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateLabelPosition).call(this);
    }
  }
  /** @inheritdoc */
  render() {
    let panelIndex;
    if (this.selectedStep?.panel) {
      panelIndex = [...this.querySelectorAll("[slot='panel']")].indexOf(this.selectedStep.panel);
      if (panelIndex === -1) {
        panelIndex = undefined;
      }
    }
    if (!this[selectionManager].vertical) {
      return html`${this.headerPosition === "above" ? __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_renderHeader).call(this) : nothing}<m3e-slide class="steps" selected-index="${ifDefined(panelIndex)}"><slot name="panel"></slot></m3e-slide>${this.headerPosition === "below" ? __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_renderHeader).call(this) : nothing}`;
    }
    return html`${__classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_renderHeader).call(this)}<slot name="panel"></slot>`;
  }
};
_M3eStepperElement_breakpointUnobserve = new WeakMap();
_M3eStepperElement_directionalitySubscription = new WeakMap();
_M3eStepperElement_instances = new WeakSet();
_a = selectionManager;
_M3eStepperElement_applyOrientation = function _M3eStepperElement_applyOrientation() {
  if (!isStepperOrientation(this.orientation)) {
    this.orientation = "horizontal";
  }
};
_M3eStepperElement_applyLabelPosition = function _M3eStepperElement_applyLabelPosition() {
  if (!isStepLabelPosition(this.labelPosition)) {
    this.labelPosition = "end";
  }
};
_M3eStepperElement_applyHeaderPosition = function _M3eStepperElement_applyHeaderPosition() {
  if (!isStepHeaderPosition(this.headerPosition)) {
    this.headerPosition = "above";
  }
};
_M3eStepperElement_renderHeader = function _M3eStepperElement_renderHeader() {
  return html`<div class="header" role="tablist" aria-orientation="${ifDefined(this[selectionManager].vertical ? "vertical" : undefined)}" @change="${__classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_handleChange)}"><slot name="step" @slotchange="${__classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_handleSlotChange)}" @keydown="${__classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_handleKeyDown)}"></slot></div>`;
};
_M3eStepperElement_handleChange = function _M3eStepperElement_handleChange(e) {
  e.stopPropagation();
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
};
_M3eStepperElement_handleSlotChange = function _M3eStepperElement_handleSlotChange() {
  const {
    added,
    removed
  } = this[selectionManager].setItems([...this.querySelectorAll("m3e-step")]);
  if (added.length > 0 || removed.length > 0) {
    for (let i = 0; i < this[selectionManager].items.length; i++) {
      this[selectionManager].items[i].index = i;
    }
    __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateDisplayOrder).call(this);
    __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateLabelPosition).call(this);
    if (this[selectionManager].selectedItems.length == 0) {
      this[selectionManager].select(this[selectionManager].items.find(x => !x.disabled));
    }
  }
};
_M3eStepperElement_handleKeyDown = function _M3eStepperElement_handleKeyDown(e) {
  this[selectionManager].onKeyDown(e);
};
_M3eStepperElement_handleSelectedChange = function _M3eStepperElement_handleSelectedChange() {
  const selected = this[selectionManager].selectedItems[0];
  let selectedIndex = selected ? this.steps.indexOf(selected) : null;
  if (selectedIndex === -1) {
    selectedIndex = null;
  }
  this._selectedIndex = selectedIndex;
  for (const step of this[selectionManager].items) {
    if (step.panel) {
      step.panel.active = step.index === selectedIndex;
    }
  }
  if (selected && this.matches(":focus-within") && !selected.matches(":focus")) {
    selected.focus();
  }
  if (hasCustomState(this, "--no-animate")) {
    requestAnimationFrame(() => deleteCustomState(this, "--no-animate"));
  }
};
_M3eStepperElement_checkValidity = function _M3eStepperElement_checkValidity() {
  let valid = false;
  if (this.selectedStep) {
    valid = this.selectedStep.panel?.querySelector("form")?.checkValidity() ?? true;
    if (this.selectedStep.optional) {
      valid = true;
    }
    this.selectedStep.invalid = !valid;
  }
  return valid;
};
_M3eStepperElement_initBreakpointMonitoring = function _M3eStepperElement_initBreakpointMonitoring() {
  __classPrivateFieldSet(this, _M3eStepperElement_breakpointUnobserve, M3eBreakpointObserver.observe([Breakpoint.XSmall], matches => {
    this._orientation = matches.get(Breakpoint.XSmall) ? "vertical" : "horizontal";
    __classPrivateFieldGet(this, _M3eStepperElement_instances, "m", _M3eStepperElement_updateDisplayOrder).call(this);
  }), "f");
};
_M3eStepperElement_updateDisplayOrder = function _M3eStepperElement_updateDisplayOrder() {
  this[selectionManager].vertical = (this._orientation ?? this.orientation) === "vertical";
  setCustomState(this, "--vertical", this[selectionManager].vertical);
  if (!this[selectionManager].vertical) {
    this.steps.forEach((x, i, arr) => {
      x.style.order = "";
      deleteCustomState(x, "--vertical");
      setCustomState(x, "--first", i === 0);
      setCustomState(x, "--last", i === arr.length - 1);
      if (x.panel) {
        x.panel.style.order = "";
      }
    });
  } else {
    this.steps.forEach((x, i, arr) => {
      x.style.order = `${i}`;
      addCustomState(x, "--vertical");
      setCustomState(x, "--first", i === 0);
      setCustomState(x, "--last", i === arr.length - 1);
      if (x.panel) {
        x.panel.style.order = `${i}`;
      }
    });
  }
};
_M3eStepperElement_updateLabelPosition = function _M3eStepperElement_updateLabelPosition() {
  this.steps.forEach(x => setCustomState(x, "--label-below", this.labelPosition === "below"));
};
(() => {
  registerStyleSheet(css`m3e-stepper:is(:state(--vertical), :--vertical) > [slot="panel"] { margin-inline-start: calc(var(--m3e-step-padding, 24px) + calc(var(--m3e-step-icon-size, 24px) / 2)); } m3e-stepper:is(:state(--vertical), :--vertical) > [slot="panel"]:not(:is(:state(--last), :--last)) { border-inline-start-width: var(--m3e-step-divider-thickness, 1px); border-inline-start-style: solid; border-inline-start-color: var(--m3e-step-divider-color, ${DesignToken.color.outline}); } m3e-stepper:is(:state(--vertical), :--vertical) > [slot="step"]:not(:is(:state(--first), :--first))::before, m3e-stepper:is(:state(--vertical), :--vertical) > [slot="step"]:not(:is(:state(--last), :--last))::after { margin-inline-start: calc(var(--m3e-step-padding, 24px) + calc(var(--m3e-step-icon-size, 24px) / 2)); border-inline-start-width: var(--m3e-step-divider-thickness, 1px); border-inline-start-style: solid; border-inline-start-color: var(--m3e-step-divider-color, ${DesignToken.color.outline}); } m3e-stepper:is(:state(--rtl), :--rtl):is(:state(--vertical), :--vertical) > [slot="step"]:not(:is(:state(--first), :--first))::before, m3e-stepper:is(:state(--rtl), :--rtl):is(:state(--vertical), :--vertical) > [slot="step"]:not(:is(:state(--last), :--last))::after { right: 0; }`);
})();
/** The styles of the element. */
M3eStepperElement.styles = css`:host { display: flex; flex-direction: column; position: relative; } :host([hidden]) { display: none; } .header { contain: layout style; } :host(:not(:is(:state(--vertical), :--vertical))) .header { display: flex; align-items: flex-start; flex-wrap: nowrap; } :host(:is(:state(--vertical), :--vertical)) .header { display: contents; } :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="step"]) { flex: none; } :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="step"]:not(:is(:state(--first), :--first)))::before, :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="step"]:not(:is(:state(--last), :--last)))::after { content: ""; display: block; position: absolute; left: 0; } :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="step"]:not(:is(:state(--first), :--first)))::before { top: 0; bottom: calc(100% - var(--m3e-step-padding, 24px) + var(--m3e-step-divider-inset, 8px)); } :host(:is(:state(--vertical), :--vertical)) ::slotted([slot="step"]:not(:is(:state(--last), :--last)))::after { top: calc(100% - var(--m3e-step-padding, 24px) + var(--m3e-step-divider-inset, 8px)); bottom: 0; } :host(:not(:is(:state(--vertical), :--vertical))) { --m3e-collapsible-animation-duration: 0ms; } :host(:is(:state(--no-animate), :--no-animate)) { --m3e-collapsible-animation-duration: 0ms; }`;
__decorate([state()], M3eStepperElement.prototype, "_orientation", void 0);
__decorate([state()], M3eStepperElement.prototype, "_selectedIndex", void 0);
__decorate([property({
  attribute: "header-position",
  reflect: true,
  useDefault: true
})], M3eStepperElement.prototype, "headerPosition", void 0);
__decorate([property({
  attribute: "label-position",
  reflect: true,
  useDefault: true
})], M3eStepperElement.prototype, "labelPosition", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eStepperElement.prototype, "linear", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eStepperElement.prototype, "orientation", void 0);
M3eStepperElement = __decorate([customElement("m3e-stepper")], M3eStepperElement);

/**
 * An element, nested within a clickable element, used to move a stepper to the next step.
 * @tag m3e-stepper-previous
 *
 * @slot - Renders the content of the action.
 */
let M3eStepperNextElement = class M3eStepperNextElement extends StepperButtonElementBase {
  constructor() {
    super("next");
  }
};
M3eStepperNextElement = __decorate([customElement("m3e-stepper-next")], M3eStepperNextElement);

/**
 * An element, nested within a clickable element, used to move a stepper to the previous step.
 * @tag m3e-stepper-previous
 *
 * @slot - Renders the content of the action.
 */
let M3eStepperPreviousElement = class M3eStepperPreviousElement extends StepperButtonElementBase {
  constructor() {
    super("previous");
  }
};
M3eStepperPreviousElement = __decorate([customElement("m3e-stepper-previous")], M3eStepperPreviousElement);

/**
 * An element, nested within a clickable element, used to reset a stepper to its initial state.
 * @tag m3e-stepper-reset
 *
 * @slot - Renders the content of the action.
 */
let M3eStepperResetElement = class M3eStepperResetElement extends StepperButtonElementBase {
  constructor() {
    super("reset");
  }
};
M3eStepperResetElement = __decorate([customElement("m3e-stepper-reset")], M3eStepperResetElement);

export { M3eStepElement, M3eStepPanelElement, M3eStepperElement, M3eStepperNextElement, M3eStepperPreviousElement, M3eStepperResetElement, StepperButtonElementBase, isStepHeaderPosition, isStepLabelPosition, isStepperOrientation };
//# sourceMappingURL=stepper.js.map
