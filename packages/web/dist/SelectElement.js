/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { state, query, property } from 'lit/decorators.js';
import { ReconnectedCallback, Disabled, AttachInternals, Role, MutationController, setCustomState, prefersReducedMotion, deleteCustomState, addCustomState, forcedColorsActive, DesignToken, customElement } from './TextOverflowElement.js';
import { commaSeparatedStringConverter } from './commaSeparatedStringConverter.js';
import { ConstraintValidation } from './ConstraintValidation.js';
import { Labelled, Dirty, Touched, FormAssociated, formValue } from './FormAssociated.js';
import { Focusable } from './Focusable.js';
import { scrollIntoViewIfNeeded } from './scrollIntoViewIfNeeded.js';
import { waitForUpgrade } from './waitForUpgrade.js';
import 'lit/directives/if-defined.js';
import { Required } from './Required.js';
import { RequiredConstraintValidation } from './RequiredConstraintValidation.js';
import { ListKeyManager } from './LiveAnnouncer.js';
import { M3eOptionElement } from './OptionPanelElement.js';

var _M3eSelectElement_instances, _M3eSelectElement_clone, _M3eSelectElement_slot, _M3eSelectElement_menu, _M3eSelectElement_ignoreKeyUp, _M3eSelectElement_ignoreFocusVisible, _M3eSelectElement_id, _M3eSelectElement_listId, _M3eSelectElement_clickHandler, _M3eSelectElement_keyDownHandler, _M3eSelectElement_keyUpHandler, _M3eSelectElement_menuToggleHandler, _M3eSelectElement_menuPointerDownHandler, _M3eSelectElement_menuPointerUpHandler, _M3eSelectElement_slotChangeHandler, _M3eSelectElement_menuPressedOption, _M3eSelectElement_mutationController, _M3eSelectElement_options_get, _M3eSelectElement_selected_get, _M3eSelectElement_formField_get, _M3eSelectElement_initMutation, _M3eSelectElement_handleOptionStateChange, _M3eSelectElement_handleMutation, _M3eSelectElement_handleClick, _M3eSelectElement_handleKeyDown, _M3eSelectElement_handleKeyUp, _M3eSelectElement_handleMenuPointerDown, _M3eSelectElement_handleMenuPointerUp, _M3eSelectElement_handleMenuToggle, _M3eSelectElement_removeMenu, _M3eSelectElement_destroyMenu, _M3eSelectElement_toggleMenu, _M3eSelectElement_showMenu, _M3eSelectElement_hideMenu, _M3eSelectElement_activateOption, _M3eSelectElement_updateSelectionState, _M3eSelectElement_selectOption, _M3eSelectElement_applyPendingValue;
var M3eSelectElement_1;
/**
 * A form control that allows users to select a value from a set of predefined options.
 *
 * @description
 * The `m3e-select` component follows Material Design 3 principles and provides a comprehensive
 * selection interface for capturing user input. It supports both single and multiple selection modes,
 * customizable validation states, and accessible keyboard navigation. The component integrates seamlessly
 * with form field containers and dynamically positions its option list menu to ensure optimal viewport
 * visibility. Selection changes are communicated through standard form events, enabling predictable integration
 * with form submission and reactive state management systems.
 *
 * @example
 * The following demonstrates a `m3e-select` component wrapped in a `m3e-form-field` with a slotted label.
 * The label is associated with the select via the `for` and `id` attributes, ensuring accessible form semantics.
 * Each `m3e-option` defines an option within the dropdown.
 *
 * ```html
 * <m3e-form-field>
 *   <label slot="label" for="select">Choose your favorite fruit</label>
 *   <m3e-select id="select">
 *     <m3e-option>Apples</m3e-option>
 *     <m3e-option>Oranges</m3e-option>
 *     <m3e-option>Bananas</m3e-option>
 *     <m3e-option>Grapes</m3e-option>
 *   </m3e-select>
 * </m3e-form-field>
 * ```
 *
 * @tag m3e-select
 *
 * @slot - Renders the options of the select.
 * @slot arrow - Renders the dropdown arrow.
 * @slot value - Renders the selected value(s).
 *
 * @attr disabled - Whether the element is disabled.
 * @attr hide-selection-indicator - Whether to hide the selection indicator for single select options.
 * @attr multi - Whether multiple options can be selected.
 * @attr name - The name that identifies the element when submitting the associated form.
 * @attr panel-class - Class or list of classes to be applied to the select's overlay panel.
 * @attr required - Whether the element is required.
 * @attr value - Selected value(s), single for single‑select or comma‑separated for multi‑select.
 *
 * @fires beforeinput - Dispatched before the selected state changes.
 * @fires input - Dispatched when the selected state changes.
 * @fires change - Dispatched when the selected state changes.
 * @fires toggle - Dispatched when the options menu opens or closes.
 *
 * @cssprop --m3e-form-field-font-size - The font size of the select control.
 * @cssprop --m3e-form-field-font-weight - The font weight of the select control.
 * @cssprop --m3e-form-field-line-height - The line height of the select control.
 * @cssprop --m3e-form-field-tracking - The letter spacing of the select control.
 * @cssprop --m3e-select-container-shape - The corner radius of the select container.
 * @cssprop --m3e-select-disabled-color - The text color when the select is disabled.
 * @cssprop --m3e-select-disabled-color-opacity - The opacity level applied to the disabled text color.
 * @cssprop --m3e-select-icon-size - The size of the dropdown arrow icon.
 */
let M3eSelectElement = M3eSelectElement_1 = class M3eSelectElement extends ReconnectedCallback(Focusable(Labelled(RequiredConstraintValidation(Dirty(Touched(Required(ConstraintValidation(FormAssociated(Disabled(AttachInternals(Role(LitElement, "combobox")))))))))))) {
  constructor() {
    super(...arguments);
    _M3eSelectElement_instances.add(this);
    /** @private */
    this._options = new Array();
    /** @private */
    _M3eSelectElement_clone.set(this, void 0);
    /** @private */
    _M3eSelectElement_slot.set(this, void 0);
    /** @private */
    _M3eSelectElement_menu.set(this, void 0);
    /** @private */
    _M3eSelectElement_ignoreKeyUp.set(this, false);
    /** @private */
    _M3eSelectElement_ignoreFocusVisible.set(this, false);
    /** @private */
    _M3eSelectElement_id.set(this, `m3e-select-${M3eSelectElement_1.__nextId++}`);
    /** @private */
    _M3eSelectElement_listId.set(this, `${__classPrivateFieldGet(this, _M3eSelectElement_id, "f")}-list`);
    /** @private */
    _M3eSelectElement_clickHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleClick).call(this, e));
    /** @private */
    _M3eSelectElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eSelectElement_keyUpHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleKeyUp).call(this, e));
    /** @private */
    _M3eSelectElement_menuToggleHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleMenuToggle).call(this, e));
    /** @private */
    _M3eSelectElement_menuPointerDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleMenuPointerDown).call(this, e));
    /** @private */
    _M3eSelectElement_menuPointerUpHandler.set(this, e => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleMenuPointerUp).call(this, e));
    /** @private */
    _M3eSelectElement_slotChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleMutation).call(this));
    /** @private */
    _M3eSelectElement_menuPressedOption.set(this, void 0);
    /** @private */
    this._listKeyManager = new ListKeyManager().withWrap().withHomeAndEnd().withPageUpAndDown().withVerticalOrientation().withTypeahead().onActiveItemChange(() => {
      if (this._listKeyManager.activeItem) {
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_activateOption).call(this, this._listKeyManager.activeItem);
      }
    });
    /** @private */
    _M3eSelectElement_mutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        childList: true,
        subtree: true
      },
      callback: () => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleMutation).call(this)
    }));
    /**
     * Whether to hide the selection indicator for single select options.
     * @default false
     */
    this.hideSelectionIndicator = false;
    /**
     * Whether multiple options can be selected.
     * @default false
     */
    this.multi = false;
    /**
     * Class or list of classes to be applied to the select's overlay panel.
     * @default ""
     */
    this.panelClass = "";
  }
  /** The selected (enabled) value(s). */
  get value() {
    if (this._pendingValue) {
      return Array.isArray(this._pendingValue.value) ? [...this._pendingValue.value] : this._pendingValue.value;
    }
    const values = this.selected.filter(x => !x.disabled).map(x => x.value);
    switch (values.length) {
      case 0:
        return null;
      case 1:
        return values[0];
      default:
        return values;
    }
  }
  set value(value) {
    // If array, ensure array is copied.
    if (Array.isArray(value)) {
      value = [...value];
    }
    this._pendingValue = {
      value
    };
  }
  /** The options that can be selected. */
  get options() {
    return this._options ?? [];
  }
  /** The selected option(s). */
  get selected() {
    return this.options.filter(x => x.selected);
  }
  /** @inheritdoc @internal */
  get [(_M3eSelectElement_clone = new WeakMap(), _M3eSelectElement_slot = new WeakMap(), _M3eSelectElement_menu = new WeakMap(), _M3eSelectElement_ignoreKeyUp = new WeakMap(), _M3eSelectElement_ignoreFocusVisible = new WeakMap(), _M3eSelectElement_id = new WeakMap(), _M3eSelectElement_listId = new WeakMap(), _M3eSelectElement_clickHandler = new WeakMap(), _M3eSelectElement_keyDownHandler = new WeakMap(), _M3eSelectElement_keyUpHandler = new WeakMap(), _M3eSelectElement_menuToggleHandler = new WeakMap(), _M3eSelectElement_menuPointerDownHandler = new WeakMap(), _M3eSelectElement_menuPointerUpHandler = new WeakMap(), _M3eSelectElement_slotChangeHandler = new WeakMap(), _M3eSelectElement_menuPressedOption = new WeakMap(), _M3eSelectElement_mutationController = new WeakMap(), _M3eSelectElement_instances = new WeakSet(), _M3eSelectElement_options_get = function _M3eSelectElement_options_get() {
    return this._listKeyManager?.items ?? [];
  }, _M3eSelectElement_selected_get = function _M3eSelectElement_selected_get() {
    return __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_options_get).filter(x => x.selected);
  }, formValue)]() {
    const values = this.value;
    if (Array.isArray(values)) {
      const data = new FormData();
      for (const value of values) {
        data.append(this.name, value);
      }
      return data;
    }
    return values;
  }
  /** @inheritdoc */
  get shouldLabelFloat() {
    return this.selected.filter(x => !x.isEmpty).length > 0;
  }
  /** @inheritdoc */
  onContainerClick() {
    __classPrivateFieldSet(this, _M3eSelectElement_ignoreFocusVisible, true, "f");
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_toggleMenu).call(this);
    this.focus({
      preventScroll: true
    });
  }
  /**
   * Clears the value of the element.
   * @param [restoreFocus=false] Whether to restore input focus.
   */
  clear(restoreFocus = false) {
    const selected = __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_selected_get);
    const willChange = selected.length > 0;
    if (willChange) {
      selected.forEach(x => {
        x.selected = false;
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_updateSelectionState).call(this, x);
      });
      this.requestUpdate();
    }
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this);
    if (willChange) {
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
    if (restoreFocus) {
      this.focus();
    }
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    this.ariaHasPopup = "listbox";
    this.ariaExpanded = "false";
    this.addEventListener("click", __classPrivateFieldGet(this, _M3eSelectElement_clickHandler, "f"));
    this.addEventListener("keydown", __classPrivateFieldGet(this, _M3eSelectElement_keyDownHandler, "f"));
    this.addEventListener("keyup", __classPrivateFieldGet(this, _M3eSelectElement_keyUpHandler, "f"));
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_initMutation).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_removeMenu).call(this);
    super.disconnectedCallback();
    this.removeEventListener("click", __classPrivateFieldGet(this, _M3eSelectElement_clickHandler, "f"));
    this.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eSelectElement_keyDownHandler, "f"));
    this.removeEventListener("keyup", __classPrivateFieldGet(this, _M3eSelectElement_keyUpHandler, "f"));
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("hideSelectionIndicator")) {
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_options_get).forEach(x => setCustomState(x, "--hide-selection-indicator", this.hideSelectionIndicator));
    }
    if (changedProperties.has("_pendingValue") && this.options.length > 0) {
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_applyPendingValue).call(this);
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._focusRing?.attach(this);
    if (__classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get) && this._focusRing) {
      this._focusRing.style.display = "none";
    }
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_initMutation).call(this);
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-focus-ring class="focus-ring"></m3e-focus-ring><div class="base"><m3e-text-overflow><slot name="value">${this.selected.filter(x => !x.isEmpty).map((x, i) => i > 0 ? html`<span>, </span>${x.label}` : x.label)}</slot></m3e-text-overflow><div class="arrow-wrapper" aria-hidden="true"><slot name="arrow"><svg class="arrow" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-360 280-560h400L480-360Z"/></svg></slot></div></div><div class="options" aria-hidden="true" @state-change="${__classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleOptionStateChange)}"><slot></slot></div>`;
  }
};
_M3eSelectElement_formField_get = function _M3eSelectElement_formField_get() {
  return this.closest("m3e-form-field");
};
_M3eSelectElement_initMutation = function _M3eSelectElement_initMutation() {
  __classPrivateFieldGet(this, _M3eSelectElement_slot, "f")?.removeEventListener("slotchange", __classPrivateFieldGet(this, _M3eSelectElement_slotChangeHandler, "f"));
  __classPrivateFieldGet(this, _M3eSelectElement_mutationController, "f").hostDisconnected();
  __classPrivateFieldSet(this, _M3eSelectElement_slot, this.querySelector("slot:not([name])"), "f");
  if (__classPrivateFieldGet(this, _M3eSelectElement_slot, "f")) {
    __classPrivateFieldGet(this, _M3eSelectElement_slot, "f").addEventListener("slotchange", __classPrivateFieldGet(this, _M3eSelectElement_slotChangeHandler, "f"));
    __classPrivateFieldGet(this, _M3eSelectElement_mutationController, "f").observe(__classPrivateFieldGet(this, _M3eSelectElement_slot, "f"));
  } else {
    __classPrivateFieldGet(this, _M3eSelectElement_mutationController, "f").observe(this);
  }
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_handleMutation).call(this);
};
_M3eSelectElement_handleOptionStateChange = function _M3eSelectElement_handleOptionStateChange(e) {
  if (!(e.target instanceof M3eOptionElement)) return;
  e.stopImmediatePropagation();
  const index = this.options.indexOf(e.target);
  if (index == -1) return;
  const clone = __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_options_get)[index];
  if (!clone) return;
  clone.disabled = e.target.disabled;
  if (clone.selected === e.target.selected) return;
  clone.selected = e.target.selected;
  if (!this.isUpdatePending) {
    this.requestUpdate();
  }
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get)?.notifyControlStateChange(true);
};
_M3eSelectElement_handleMutation = function _M3eSelectElement_handleMutation() {
  const slot = this.querySelector("slot:not([name])");
  const slotted = slot?.assignedElements({
    flatten: true
  });
  __classPrivateFieldSet(this, _M3eSelectElement_clone, this.cloneNode(true), "f");
  if (slotted) {
    const clonedSlot = __classPrivateFieldGet(this, _M3eSelectElement_clone, "f").querySelector("slot:not([name])");
    if (clonedSlot) {
      clonedSlot.replaceWith(...slotted.map(x => x.cloneNode(true)));
    }
  }
  const {
    added
  } = this._listKeyManager.setItems([...__classPrivateFieldGet(this, _M3eSelectElement_clone, "f").querySelectorAll("m3e-option")]);
  added.forEach(x => {
    x.id = x.id || `${__classPrivateFieldGet(this, _M3eSelectElement_id, "f")}-option-${this._listKeyManager.items.indexOf(x)}`;
    setCustomState(x, "--hide-selection-indicator", this.hideSelectionIndicator);
  });
  this._options = slotted ? slotted.filter(x => x instanceof M3eOptionElement) : [...this.querySelectorAll("m3e-option")];
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_applyPendingValue).call(this);
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get)?.notifyControlStateChange();
  if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) {
    __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").replaceChildren(...__classPrivateFieldGet(this, _M3eSelectElement_clone, "f").childNodes);
    if (this._options.length == 0) {
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this);
    }
  }
};
_M3eSelectElement_handleClick = function _M3eSelectElement_handleClick(e) {
  if (e.defaultPrevented || this.disabled) return;
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_toggleMenu).call(this);
};
_M3eSelectElement_handleKeyDown = function _M3eSelectElement_handleKeyDown(e) {
  if (e.defaultPrevented) return;
  __classPrivateFieldSet(this, _M3eSelectElement_ignoreFocusVisible, false, "f");
  switch (e.key) {
    case " ":
    case "Enter":
      e.preventDefault();
      if (!this.multi) {
        if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f") && this._listKeyManager.activeItem) {
          __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_selectOption).call(this, this._listKeyManager.activeItem);
        }
        if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")?.isOpen) {
          if (!prefersReducedMotion()) {
            setTimeout(() => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this), 150);
          } else {
            __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this);
          }
        } else {
          __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_showMenu).call(this);
        }
      } else if (!__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) {
        __classPrivateFieldSet(this, _M3eSelectElement_ignoreKeyUp, true, "f");
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_toggleMenu).call(this);
      }
      break;
    case "Escape":
    case "Tab":
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this);
      break;
    case "Down":
    case "ArrowDown":
      if (this.multi && !__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) {
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_toggleMenu).call(this);
      } else {
        this._listKeyManager.onKeyDown(e);
        if (!__classPrivateFieldGet(this, _M3eSelectElement_menu, "f") && this._listKeyManager.activeItem) {
          __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_selectOption).call(this, this._listKeyManager.activeItem);
        }
      }
      break;
    default:
      this._listKeyManager.onKeyDown(e);
      if (!this.multi && !__classPrivateFieldGet(this, _M3eSelectElement_menu, "f") && this._listKeyManager.activeItem) {
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_selectOption).call(this, this._listKeyManager.activeItem);
      }
      break;
  }
};
_M3eSelectElement_handleKeyUp = function _M3eSelectElement_handleKeyUp(e) {
  if (e.defaultPrevented) return;
  if (__classPrivateFieldGet(this, _M3eSelectElement_ignoreKeyUp, "f")) {
    __classPrivateFieldSet(this, _M3eSelectElement_ignoreKeyUp, false, "f");
    return;
  }
  switch (e.key) {
    case " ":
    case "Enter":
      if (!this.multi) return;
      e.preventDefault();
      if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f") && this._listKeyManager.activeItem) {
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_selectOption).call(this, this._listKeyManager.activeItem);
      }
      break;
  }
};
_M3eSelectElement_handleMenuPointerDown = function _M3eSelectElement_handleMenuPointerDown(e) {
  __classPrivateFieldSet(this, _M3eSelectElement_menuPressedOption, undefined, "f");
  if (e.button === 2) return;
  // Prevent click to avoid stealing focus.
  e.preventDefault();
  e.stopImmediatePropagation();
  const option = e.composedPath().find(x => x instanceof HTMLElement && x.tagName === "M3E-OPTION");
  if (option && !option.disabled) {
    __classPrivateFieldSet(this, _M3eSelectElement_menuPressedOption, option, "f");
  }
};
_M3eSelectElement_handleMenuPointerUp = function _M3eSelectElement_handleMenuPointerUp(e) {
  const pressedOption = __classPrivateFieldGet(this, _M3eSelectElement_menuPressedOption, "f");
  __classPrivateFieldSet(this, _M3eSelectElement_menuPressedOption, undefined, "f");
  if (e.button === 2) return;
  if (!pressedOption) return;
  const option = e.composedPath().find(x => x instanceof HTMLElement && x.tagName === "M3E-OPTION");
  if (option === pressedOption) {
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_selectOption).call(this, option);
    this._listKeyManager.setActiveItem(option);
    if (this.multi) {
      this.requestUpdate();
    }
  }
  if (!this.multi) {
    if (!prefersReducedMotion()) {
      setTimeout(() => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this), 150);
    } else {
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this);
    }
  }
};
_M3eSelectElement_handleMenuToggle = function _M3eSelectElement_handleMenuToggle(e) {
  if (!__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) return;
  if (e.newState !== "closed") {
    const option = __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_selected_get).find(x => !x.disabled) ?? this._listKeyManager.items.find(x => !x.disabled);
    this._listKeyManager.setActiveItem(option);
    if (option) {
      scrollIntoViewIfNeeded(option, __classPrivateFieldGet(this, _M3eSelectElement_menu, "f"), {
        block: "nearest",
        behavior: "instant"
      });
    }
    this.dispatchEvent(new ToggleEvent("toggle", {
      oldState: e.oldState,
      newState: e.newState
    }));
  } else {
    if (prefersReducedMotion()) {
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_destroyMenu).call(this, e);
    } else {
      // NOTE: use transitionend is preferred but doesn't fire when used here.
      // This is a workaround until that is fixed.
      setTimeout(() => __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_destroyMenu).call(this, e), 100);
    }
  }
};
_M3eSelectElement_removeMenu = function _M3eSelectElement_removeMenu() {
  if (!__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) return;
  __classPrivateFieldGet(this, _M3eSelectElement_clone, "f")?.replaceChildren(...__classPrivateFieldGet(this, _M3eSelectElement_menu, "f").childNodes);
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").remove();
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").removeEventListener("toggle", __classPrivateFieldGet(this, _M3eSelectElement_menuToggleHandler, "f"));
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").removeEventListener("pointerdown", __classPrivateFieldGet(this, _M3eSelectElement_menuPointerDownHandler, "f"));
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").removeEventListener("pointerup", __classPrivateFieldGet(this, _M3eSelectElement_menuPointerUpHandler, "f"));
  __classPrivateFieldSet(this, _M3eSelectElement_menu, undefined, "f");
  this.ariaExpanded = "false";
  this.removeAttribute("aria-controls");
  this.removeAttribute("aria-activedescendant");
  deleteCustomState(this, "--open");
};
_M3eSelectElement_destroyMenu = function _M3eSelectElement_destroyMenu(e) {
  if (!__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) return;
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_removeMenu).call(this);
  this.requestUpdate();
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get)?.notifyControlStateChange();
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: e.oldState,
    newState: e.newState
  }));
};
_M3eSelectElement_toggleMenu = function _M3eSelectElement_toggleMenu() {
  if (this.disabled) return;
  if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) {
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_hideMenu).call(this);
  } else {
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_showMenu).call(this);
  }
};
_M3eSelectElement_showMenu = function _M3eSelectElement_showMenu() {
  if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f") || this._options.length == 0) return;
  __classPrivateFieldSet(this, _M3eSelectElement_menu, document.createElement("m3e-option-panel"), "f");
  if (this.multi) {
    __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").ariaMultiSelectable = "true";
  }
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").id = __classPrivateFieldGet(this, _M3eSelectElement_listId, "f");
  if (this.panelClass) {
    for (const klass of this.panelClass.split(/\s+/).map(d => d.trim()).filter(Boolean)) {
      __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").classList.add(klass);
    }
  }
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").style.overflowX = "hidden";
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").fitAnchorWidth = true;
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").addEventListener("toggle", __classPrivateFieldGet(this, _M3eSelectElement_menuToggleHandler, "f"));
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").addEventListener("pointerdown", __classPrivateFieldGet(this, _M3eSelectElement_menuPointerDownHandler, "f"));
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").addEventListener("pointerup", __classPrivateFieldGet(this, _M3eSelectElement_menuPointerUpHandler, "f"));
  if (__classPrivateFieldGet(this, _M3eSelectElement_clone, "f")) {
    __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").replaceChildren(...__classPrivateFieldGet(this, _M3eSelectElement_clone, "f").childNodes);
  }
  // Mount the panel into the nearest popover or dialog host so it remains inside
  // the active interaction subtree. Popover and dialog semantics require this.
  // If no such host exists, fall back to <body> to avoid framework diffing.
  // NOTE: Frameworks may still interfere when mounted inside their managed DOM,
  // but there is no solution that satisfies all constraints.
  const host = this.closest("[popover]") ?? this.closest("dialog[open]") ?? this.closest("m3e-dialog") ?? document.body;
  host.appendChild(__classPrivateFieldGet(this, _M3eSelectElement_menu, "f"));
  this.ariaExpanded = "true";
  this.setAttribute("aria-controls", __classPrivateFieldGet(this, _M3eSelectElement_listId, "f"));
  __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get)?.notifyControlStateChange();
  setTimeout(() => {
    __classPrivateFieldGet(this, _M3eSelectElement_menu, "f")?.show(this, __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get)?.menuAnchor);
    addCustomState(this, "--open");
  });
};
_M3eSelectElement_hideMenu = function _M3eSelectElement_hideMenu() {
  if (!__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) return;
  __classPrivateFieldGet(this, _M3eSelectElement_menu, "f").hide();
  deleteCustomState(this, "--open");
};
_M3eSelectElement_activateOption = function _M3eSelectElement_activateOption(option) {
  this.setAttribute("aria-activedescendant", option.id);
  if (__classPrivateFieldGet(this, _M3eSelectElement_menu, "f")) {
    scrollIntoViewIfNeeded(option, __classPrivateFieldGet(this, _M3eSelectElement_menu, "f"), {
      block: "nearest",
      behavior: "instant"
    });
    const focusVisible = !__classPrivateFieldGet(this, _M3eSelectElement_ignoreFocusVisible, "f") && (this.matches(":focus-visible") || forcedColorsActive());
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_options_get).forEach(x => {
      const active = x === option && focusVisible;
      if (active) {
        x.focusRing?.show();
        x.stateLayer?.show("focused");
      } else {
        x.focusRing?.hide();
        x.stateLayer?.hide("focused");
      }
    });
  }
};
_M3eSelectElement_updateSelectionState = function _M3eSelectElement_updateSelectionState(clone) {
  const option = this._options[this._listKeyManager.items.indexOf(clone)];
  if (option) {
    option.selected = clone.selected;
  }
};
_M3eSelectElement_selectOption = function _M3eSelectElement_selectOption(option) {
  const selected = this.multi ? !option.selected : true;
  if (option.selected === selected) return;
  if (this.dispatchEvent(new Event("beforeinput", {
    bubbles: true,
    cancelable: true
  }))) {
    option.selected = selected;
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_updateSelectionState).call(this, option);
    if (!this.multi) {
      __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_selected_get).filter(x => x !== option).forEach(x => {
        x.selected = false;
        __classPrivateFieldGet(this, _M3eSelectElement_instances, "m", _M3eSelectElement_updateSelectionState).call(this, x);
      });
    }
    this.requestUpdate();
    __classPrivateFieldGet(this, _M3eSelectElement_instances, "a", _M3eSelectElement_formField_get)?.notifyControlStateChange();
    this.dispatchEvent(new Event("input", {
      bubbles: true
    }));
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
};
_M3eSelectElement_applyPendingValue = /** @private */
async function _M3eSelectElement_applyPendingValue() {
  if (!this._pendingValue) return;
  const values = !this._pendingValue.value ? null : !Array.isArray(this._pendingValue.value) ? [this._pendingValue.value] : this._pendingValue.value;
  this._pendingValue = undefined;
  if (values === null) {
    for (const option of this.options) {
      await waitForUpgrade(option);
      await option.valueReady;
      option.selected = false;
    }
  } else {
    for (const option of this.options) {
      await waitForUpgrade(option);
      await option.valueReady;
      option.selected = values.includes(option.value);
    }
  }
};
/** The styles of the element. */
M3eSelectElement.styles = css`:host { display: inline-flex; vertical-align: middle; outline: none; position: relative; font-size: var(--m3e-form-field-font-size, ${DesignToken.typescale.standard.body.large.fontSize}); font-weight: var(--m3e-form-field-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight}); line-height: var(--m3e-form-field-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}); letter-spacing: var(--m3e-form-field-tracking, ${DesignToken.typescale.standard.body.large.tracking}); min-height: var(--m3e-form-field-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}); border-radius: var(--m3e-select-container-shape, ${DesignToken.shape.corner.extraSmall}); } :host([hidden]) { display: none; } :host(:not(:disabled)) { cursor: pointer; } :host(:disabled) { color: color-mix( in srgb, var(--m3e-select-disabled-color, ${DesignToken.color.onSurface}) var(--m3e-select-disabled-color-opacity, 38%), transparent ); } .options { display: none; } .base { flex: 1 1 auto; display: inline-flex; align-items: center; overflow: hidden; } .arrow-wrapper { display: flex; align-items: center; justify-content: center; margin-top: var(--_select-arrow-margin-top); } ::slotted([slot="arrow"]), .arrow { vertical-align: middle; width: 1em; height: 1em; font-size: var(--m3e-select-icon-size, 24px); } :host(:is(:state(--open), :--open)) .focus-ring { display: none; }`;
/** @private */
M3eSelectElement.__nextId = 0;
__decorate([state()], M3eSelectElement.prototype, "_pendingValue", void 0);
__decorate([query(".focus-ring")], M3eSelectElement.prototype, "_focusRing", void 0);
__decorate([property({
  converter: commaSeparatedStringConverter,
  reflect: false
})], M3eSelectElement.prototype, "value", null);
__decorate([property({
  attribute: "hide-selection-indicator",
  type: Boolean
})], M3eSelectElement.prototype, "hideSelectionIndicator", void 0);
__decorate([property({
  type: Boolean
})], M3eSelectElement.prototype, "multi", void 0);
__decorate([property({
  attribute: "panel-class"
})], M3eSelectElement.prototype, "panelClass", void 0);
M3eSelectElement = M3eSelectElement_1 = __decorate([customElement("m3e-select")], M3eSelectElement);

export { M3eSelectElement };
//# sourceMappingURL=SelectElement.js.map
