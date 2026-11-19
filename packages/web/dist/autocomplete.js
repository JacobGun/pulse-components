/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ReconnectedCallback, HtmlFor, MutationController, setCustomState, deleteCustomState, prefersReducedMotion, forcedColorsActive, addCustomState, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { scrollIntoViewIfNeeded } from './scrollIntoViewIfNeeded.js';
import { waitForUpdate } from './waitForUpdate.js';
import { ListKeyManager, M3eLiveAnnouncer } from './LiveAnnouncer.js';
import { M3eOptionElement, M3eOptGroupElement } from './OptionPanelElement.js';

var _M3eAutocompleteElement_instances, _M3eAutocompleteElement_id, _M3eAutocompleteElement_menuId, _M3eAutocompleteElement_clone, _M3eAutocompleteElement_slot, _M3eAutocompleteElement_ignoreFocusVisible, _M3eAutocompleteElement_menu, _M3eAutocompleteElement_ignoreHideMenuOnBlur, _M3eAutocompleteElement_inputChanged, _M3eAutocompleteElement_hasFocus, _M3eAutocompleteElement_mutationAbortController, _M3eAutocompleteElement_clickHandler, _M3eAutocompleteElement_formFieldPointerDownHandler, _M3eAutocompleteElement_focusHandler, _M3eAutocompleteElement_blurHandler, _M3eAutocompleteElement_keyDownHandler, _M3eAutocompleteElement_inputHandler, _M3eAutocompleteElement_changeHandler, _M3eAutocompleteElement_menuToggleHandler, _M3eAutocompleteElement_menuPointerDownHandler, _M3eAutocompleteElement_menuPointerUpHandler, _M3eAutocompleteElement_slotChangeHandler, _M3eAutocompleteElement_menuPressedOption, _M3eAutocompleteElement_mutationController, _M3eAutocompleteElement_options_get, _M3eAutocompleteElement_input_get, _M3eAutocompleteElement_hasNoDataSlot_get, _M3eAutocompleteElement_hasLoadingSlot_get, _M3eAutocompleteElement_shouldShowMenu_get, _M3eAutocompleteElement_formField_get, _M3eAutocompleteElement_handleOptionStateChange, _M3eAutocompleteElement_initMutation, _M3eAutocompleteElement_handleMutation, _M3eAutocompleteElement_handleClick, _M3eAutocompleteElement_handleFormFieldPointerDown, _M3eAutocompleteElement_handleFocus, _M3eAutocompleteElement_handleBlur, _M3eAutocompleteElement_handleInput, _M3eAutocompleteElement_handleChange, _M3eAutocompleteElement_handleKeyDown, _M3eAutocompleteElement_handleMenuPointerDown, _M3eAutocompleteElement_handleMenuPointerUp, _M3eAutocompleteElement_handleMenuToggle, _M3eAutocompleteElement_removeMenu, _M3eAutocompleteElement_destroyMenu, _M3eAutocompleteElement_showMenu, _M3eAutocompleteElement_projectClone, _M3eAutocompleteElement_updateMenuState, _M3eAutocompleteElement_hideMenu, _M3eAutocompleteElement_activateOption, _M3eAutocompleteElement_updateSelectionState, _M3eAutocompleteElement_selectOption, _M3eAutocompleteElement_filterOption, _M3eAutocompleteElement_filterOptions, _M3eAutocompleteElement_clearOptions, _M3eAutocompleteElement_announceResults, _M3eAutocompleteElement_autoActivate, _M3eAutocompleteElement_deactivateOption;
var M3eAutocompleteElement_1;
/**
 * Enhances a text input with suggested options.
 *
 * @description
 * The `m3e-autocomplete` component augments a text input field with a dynamically positioned menu of filterable suggestions,
 * following Material Design 3 principles. It provides real-time filtering, keyboard navigation, automatic option activation,
 * and text highlighting to guide user selection. The component manages focus, selection state, and menu visibility while
 * integrating seamlessly with form field containers and supporting both required and optional selection modes.
 *
 * @example
 * The following example illustrates use of the `m3e-autocomplete` paired with a `m3e-form-field`.
 * ```html
 * <m3e-form-field>
 *   <label slot="label" for="fruit">Choose your favorite fruit</label>
 *   <input id="fruit" />
 * </m3e-form-field>
 * <m3e-autocomplete for="fruit">
 *   <m3e-option>Apples</m3e-option>
 *   <m3e-option>Oranges</m3e-option>
 *   <m3e-option>Bananas</m3e-option>
 *   <m3e-option>Grapes</m3e-option>
 * </m3e-autocomplete>
 * ```
 *
 * @tag m3e-autocomplete
 *
 * @attr auto-activate - Whether the first option should be automatically activated.
 * @attr case-sensitive - Whether filtering is case sensitive.
 * @attr filter - Mode in which to filter options.
 * @attr hide-selection-indicator - Whether to hide the selection indicator.
 * @attr hide-loading - Whether to hide the menu when loading options.
 * @attr hide-no-data - Whether to hide the menu when there are no options to show.
 * @attr loading - Whether options are being loaded.
 * @attr loading-label - The text announced and presented when loading options.
 * @attr no-data-label - The text announced and presented when no options are available for the current term.
 * @attr panel-class - Class or list of classes to be applied to the autocomplete's overlay panel.
 * @attr required - Whether the user is required to make a selection when interacting with the autocomplete.
 * @attr results-label - The text announced when available options change for the current term.
 *
 * @slot - Renders the options of the autocomplete.
 * @slot loading - Renders content when loading options.
 * @slot no-data - Renders content when there are no options to show.
 *
 * @fires toggle - Dispatched when the options menu opens or closes.
 * @fires query - Dispatched when the input is focused or when the user modifies its value.
 * @fires change - Dispatched when the committed value changes due to selecting an option or clearing the input.
 */
let M3eAutocompleteElement = M3eAutocompleteElement_1 = class M3eAutocompleteElement extends ReconnectedCallback(HtmlFor(LitElement)) {
  constructor() {
    super(...arguments);
    _M3eAutocompleteElement_instances.add(this);
    /** @private */
    _M3eAutocompleteElement_id.set(this, `m3e-autocomplete-${M3eAutocompleteElement_1.__nextId}`);
    /** @private */
    _M3eAutocompleteElement_menuId.set(this, `${__classPrivateFieldGet(this, _M3eAutocompleteElement_id, "f")}-menu`);
    /** @private */
    this._options = new Array();
    /** @private */
    _M3eAutocompleteElement_clone.set(this, void 0);
    /** @private */
    _M3eAutocompleteElement_slot.set(this, void 0);
    /** @private */
    _M3eAutocompleteElement_ignoreFocusVisible.set(this, false);
    /** @private */
    _M3eAutocompleteElement_menu.set(this, void 0);
    /** @private */
    _M3eAutocompleteElement_ignoreHideMenuOnBlur.set(this, false);
    /** @private */
    _M3eAutocompleteElement_inputChanged.set(this, false);
    /** @private */
    _M3eAutocompleteElement_hasFocus.set(this, false);
    /** @private */
    _M3eAutocompleteElement_mutationAbortController.set(this, void 0);
    /** @private */
    _M3eAutocompleteElement_clickHandler.set(this, () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleClick).call(this));
    /** @private */
    _M3eAutocompleteElement_formFieldPointerDownHandler.set(this, () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleFormFieldPointerDown).call(this));
    /** @private */
    _M3eAutocompleteElement_focusHandler.set(this, () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleFocus).call(this));
    /** @private */
    _M3eAutocompleteElement_blurHandler.set(this, () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleBlur).call(this));
    /** @private */
    _M3eAutocompleteElement_keyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleKeyDown).call(this, e));
    /** @private */
    _M3eAutocompleteElement_inputHandler.set(this, e => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleInput).call(this, e));
    /** @private */
    _M3eAutocompleteElement_changeHandler.set(this, () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleChange).call(this));
    /** @private */
    _M3eAutocompleteElement_menuToggleHandler.set(this, e => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleMenuToggle).call(this, e));
    /** @private */
    _M3eAutocompleteElement_menuPointerDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleMenuPointerDown).call(this, e));
    /** @private */
    _M3eAutocompleteElement_menuPointerUpHandler.set(this, e => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleMenuPointerUp).call(this, e));
    /** @private */
    _M3eAutocompleteElement_slotChangeHandler.set(this, () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleMutation).call(this));
    /** @private */
    _M3eAutocompleteElement_menuPressedOption.set(this, void 0);
    /** @private */
    this._listKeyManager = new ListKeyManager().withWrap().withHomeAndEnd().withPageUpAndDown().withVerticalOrientation().withSkipPredicate(item => item.disabled || item.hidden === true).onActiveItemChange(() => {
      if (this._listKeyManager.activeItem) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_activateOption).call(this, this._listKeyManager.activeItem);
      }
    });
    /** @private */
    _M3eAutocompleteElement_mutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        childList: true,
        subtree: true
      },
      callback: () => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleMutation).call(this)
    }));
    /**
     * Whether to hide the selection indicator.
     * @default false
     */
    this.hideSelectionIndicator = false;
    /**
     * Whether the user is required to make a selection when interacting with the autocomplete.
     * @default false
     */
    this.required = false;
    /**
     * Whether the first option should be automatically activated.
     * @default false
     */
    this.autoActivate = false;
    /**
     * Whether filtering is case sensitive.
     * @default false
     */
    this.caseSensitive = false;
    /**
     * Mode in which to filter options.
     * @default "contains"
     */
    this.filter = "contains";
    /**
     * Whether options are being loaded.
     * @default false
     */
    this.loading = false;
    /**
     * Whether to hide the menu when there are no options to show.
     * @default false
     */
    this.hideNoData = false;
    /**
     * Whether to hide the menu when loading options.
     * @default false
     */
    this.hideLoading = false;
    /**
     * The text announced and presented when loading options.
     * @default "Loading..."
     */
    this.loadingLabel = "Loading...";
    /**
     * The text announced and presented when no options are available for the current term.
     * @default "No options"
     */
    this.noDataLabel = "No options";
    /**
     * The text announced when available options change for the current term.
     * @default (count) => `${count} options`
     */
    this.resultsLabel = count => `${count} options`;
    /**
     * Class or list of classes to be applied to the autocomplete's overlay panel.
     * @default ""
     */
    this.panelClass = "";
  }
  /** The options that can be selected. */
  get options() {
    return this._options ?? [];
  }
  /** The selected option. */
  get selected() {
    return this.options.find(x => x.selected) ?? null;
  }
  /** The selected (enabled) value. */
  get value() {
    const selected = this.selected;
    return selected && !selected.disabled ? selected.value : null;
  }
  /** @inheritdoc */
  attach(control) {
    if (!(control instanceof HTMLInputElement)) return;
    super.attach(control);
    control.autocomplete = "off";
    control.role = "combobox";
    control.ariaAutoComplete = "list";
    control.ariaExpanded = "false";
    control.addEventListener("click", __classPrivateFieldGet(this, _M3eAutocompleteElement_clickHandler, "f"));
    control.addEventListener("focus", __classPrivateFieldGet(this, _M3eAutocompleteElement_focusHandler, "f"));
    control.addEventListener("blur", __classPrivateFieldGet(this, _M3eAutocompleteElement_blurHandler, "f"));
    control.addEventListener("keydown", __classPrivateFieldGet(this, _M3eAutocompleteElement_keyDownHandler, "f"));
    control.addEventListener("input", __classPrivateFieldGet(this, _M3eAutocompleteElement_inputHandler, "f"));
    control.addEventListener("change", __classPrivateFieldGet(this, _M3eAutocompleteElement_changeHandler, "f"));
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.addEventListener("pointerdown", __classPrivateFieldGet(this, _M3eAutocompleteElement_formFieldPointerDownHandler, "f"));
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.removeEventListener("pointerdown", __classPrivateFieldGet(this, _M3eAutocompleteElement_formFieldPointerDownHandler, "f"));
      this.control.role = null;
      this.control.ariaAutoComplete = null;
      this.control.ariaExpanded = null;
      this.control.removeEventListener("click", __classPrivateFieldGet(this, _M3eAutocompleteElement_clickHandler, "f"));
      this.control.removeEventListener("focus", __classPrivateFieldGet(this, _M3eAutocompleteElement_focusHandler, "f"));
      this.control.removeEventListener("blur", __classPrivateFieldGet(this, _M3eAutocompleteElement_blurHandler, "f"));
      this.control.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eAutocompleteElement_keyDownHandler, "f"));
      this.control.removeEventListener("input", __classPrivateFieldGet(this, _M3eAutocompleteElement_inputHandler, "f"));
      this.control.removeEventListener("change", __classPrivateFieldGet(this, _M3eAutocompleteElement_changeHandler, "f"));
    }
    super.detach();
  }
  /**
   * Clears the value of the element.
   * @param [restoreFocus=false] Whether to restore input focus.
   */
  clear(restoreFocus = false) {
    if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)) return;
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value = "";
    if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_clearOptions).call(this)) {
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_filterOptions).call(this);
    if (restoreFocus) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).focus();
    } else {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
    }
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_initMutation).call(this);
  }
  /** @inheritdoc */
  disconnectedCallback() {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_removeMenu).call(this);
    super.disconnectedCallback();
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_initMutation).call(this);
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("hideNoData") && this.hideNoData && __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
      setCustomState(__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), "--no-data", false);
    }
    if (changedProperties.has("loading")) {
      if (this.loading) {
        if (__classPrivateFieldGet(this, _M3eAutocompleteElement_hasFocus, "f")) {
          if (this.loadingLabel) {
            M3eLiveAnnouncer.announce(this.loadingLabel, "polite");
          }
          if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f") && __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_shouldShowMenu_get)) {
            __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_showMenu).call(this);
          }
        }
      } else if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f") && !__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_shouldShowMenu_get)) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
      } else if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
        deleteCustomState(__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), "--loading");
      } else if (__classPrivateFieldGet(this, _M3eAutocompleteElement_hasFocus, "f")) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_showMenu).call(this);
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="options" aria-hidden="true" @state-change="${__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleOptionStateChange)}"><slot></slot></div>`;
  }
};
_M3eAutocompleteElement_id = new WeakMap();
_M3eAutocompleteElement_menuId = new WeakMap();
_M3eAutocompleteElement_clone = new WeakMap();
_M3eAutocompleteElement_slot = new WeakMap();
_M3eAutocompleteElement_ignoreFocusVisible = new WeakMap();
_M3eAutocompleteElement_menu = new WeakMap();
_M3eAutocompleteElement_ignoreHideMenuOnBlur = new WeakMap();
_M3eAutocompleteElement_inputChanged = new WeakMap();
_M3eAutocompleteElement_hasFocus = new WeakMap();
_M3eAutocompleteElement_mutationAbortController = new WeakMap();
_M3eAutocompleteElement_clickHandler = new WeakMap();
_M3eAutocompleteElement_formFieldPointerDownHandler = new WeakMap();
_M3eAutocompleteElement_focusHandler = new WeakMap();
_M3eAutocompleteElement_blurHandler = new WeakMap();
_M3eAutocompleteElement_keyDownHandler = new WeakMap();
_M3eAutocompleteElement_inputHandler = new WeakMap();
_M3eAutocompleteElement_changeHandler = new WeakMap();
_M3eAutocompleteElement_menuToggleHandler = new WeakMap();
_M3eAutocompleteElement_menuPointerDownHandler = new WeakMap();
_M3eAutocompleteElement_menuPointerUpHandler = new WeakMap();
_M3eAutocompleteElement_slotChangeHandler = new WeakMap();
_M3eAutocompleteElement_menuPressedOption = new WeakMap();
_M3eAutocompleteElement_mutationController = new WeakMap();
_M3eAutocompleteElement_instances = new WeakSet();
_M3eAutocompleteElement_options_get = function _M3eAutocompleteElement_options_get() {
  return this._listKeyManager?.items ?? [];
};
_M3eAutocompleteElement_input_get = function _M3eAutocompleteElement_input_get() {
  return this.control ? this.control : null;
};
_M3eAutocompleteElement_hasNoDataSlot_get = function _M3eAutocompleteElement_hasNoDataSlot_get() {
  return (__classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f")?.querySelector(":scope > [slot='no-data']") ?? null) !== null;
};
_M3eAutocompleteElement_hasLoadingSlot_get = function _M3eAutocompleteElement_hasLoadingSlot_get() {
  return (__classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f")?.querySelector(":scope > [slot='loading']") ?? null) !== null;
};
_M3eAutocompleteElement_shouldShowMenu_get = function _M3eAutocompleteElement_shouldShowMenu_get() {
  return __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get).some(x => x.hidden === false) || this.loading && !this.hideLoading && this.loadingLabel.length > 0 || !this.loading && !this.hideNoData && this.noDataLabel.length > 0;
};
_M3eAutocompleteElement_formField_get = function _M3eAutocompleteElement_formField_get() {
  return this.control?.closest("m3e-form-field") ?? null;
};
_M3eAutocompleteElement_handleOptionStateChange = function _M3eAutocompleteElement_handleOptionStateChange(e) {
  if (!(e.target instanceof M3eOptionElement)) return;
  e.stopImmediatePropagation();
  const index = this.options.indexOf(e.target);
  if (index == -1) return;
  const clone = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get)[index];
  if (!clone) return;
  clone.disabled = e.target.disabled;
  clone.selected = e.target.selected;
};
_M3eAutocompleteElement_initMutation = function _M3eAutocompleteElement_initMutation() {
  __classPrivateFieldGet(this, _M3eAutocompleteElement_slot, "f")?.removeEventListener("slotchange", __classPrivateFieldGet(this, _M3eAutocompleteElement_slotChangeHandler, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_mutationController, "f").hostDisconnected();
  __classPrivateFieldSet(this, _M3eAutocompleteElement_slot, this.querySelector("slot:not([name])"), "f");
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_slot, "f")) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_slot, "f").addEventListener("slotchange", __classPrivateFieldGet(this, _M3eAutocompleteElement_slotChangeHandler, "f"));
    __classPrivateFieldGet(this, _M3eAutocompleteElement_mutationController, "f").observe(__classPrivateFieldGet(this, _M3eAutocompleteElement_slot, "f"));
  } else {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_mutationController, "f").observe(this);
  }
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_handleMutation).call(this);
};
_M3eAutocompleteElement_handleMutation = /** @private */
async function _M3eAutocompleteElement_handleMutation() {
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_mutationAbortController, "f")) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_mutationAbortController, "f").abort();
  }
  const mutationAbortController = new AbortController();
  __classPrivateFieldSet(this, _M3eAutocompleteElement_mutationAbortController, mutationAbortController, "f");
  const slot = this.querySelector("slot:not([name])");
  const slotted = slot?.assignedElements({
    flatten: true
  });
  const options = slotted ? slotted.filter(x => x instanceof M3eOptionElement) : [...this.querySelectorAll("m3e-option")];
  for (const option of options) {
    if (mutationAbortController.signal.aborted) {
      break;
    }
    await waitForUpdate(option);
  }
  if (mutationAbortController.signal.aborted) {
    return;
  }
  this._options = options;
  __classPrivateFieldSet(this, _M3eAutocompleteElement_clone, this.cloneNode(true), "f");
  if (slotted) {
    const clonedSlot = __classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f").querySelector("slot:not([name])");
    if (clonedSlot) {
      clonedSlot.replaceWith(...slotted.map(x => x.cloneNode(true)));
    }
  }
  const {
    added
  } = this._listKeyManager.setItems([...__classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f").querySelectorAll("m3e-option")]);
  added.forEach(x => {
    x.id = x.id || `${__classPrivateFieldGet(this, _M3eAutocompleteElement_id, "f")}-option-${this._listKeyManager.items.indexOf(x)}`;
    setCustomState(x, "--hide-selection-indicator", this.hideSelectionIndicator);
  });
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
    const count = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_filterOptions).call(this);
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_projectClone).call(this);
    if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_shouldShowMenu_get)) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
    } else {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_updateMenuState).call(this, __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), count);
    }
  }
};
_M3eAutocompleteElement_handleClick = function _M3eAutocompleteElement_handleClick() {
  __classPrivateFieldSet(this, _M3eAutocompleteElement_ignoreFocusVisible, true, "f");
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_showMenu).call(this);
};
_M3eAutocompleteElement_handleFormFieldPointerDown = function _M3eAutocompleteElement_handleFormFieldPointerDown() {
  __classPrivateFieldSet(this, _M3eAutocompleteElement_ignoreHideMenuOnBlur, true, "f");
};
_M3eAutocompleteElement_handleFocus = function _M3eAutocompleteElement_handleFocus() {
  __classPrivateFieldSet(this, _M3eAutocompleteElement_hasFocus, true, "f");
  __classPrivateFieldSet(this, _M3eAutocompleteElement_ignoreFocusVisible, true, "f");
  if (this.options.length == 0 && !this.control.readOnly) {
    this.dispatchEvent(new CustomEvent("query", {
      detail: {
        term: __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)?.value ?? ""
      },
      bubbles: true,
      composed: true
    }));
  }
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_showMenu).call(this);
};
_M3eAutocompleteElement_handleBlur = function _M3eAutocompleteElement_handleBlur() {
  __classPrivateFieldSet(this, _M3eAutocompleteElement_hasFocus, false, "f");
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_ignoreHideMenuOnBlur, "f")) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
  }
  __classPrivateFieldSet(this, _M3eAutocompleteElement_ignoreHideMenuOnBlur, false, "f");
};
_M3eAutocompleteElement_handleInput = function _M3eAutocompleteElement_handleInput(e) {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get) || e.defaultPrevented) return;
  this.dispatchEvent(new CustomEvent("query", {
    detail: {
      term: __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value
    },
    bubbles: true,
    composed: true
  }));
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value === "" && __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_clearOptions).call(this)) {
    this.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  __classPrivateFieldSet(this, _M3eAutocompleteElement_inputChanged, true, "f");
  try {
    if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_showMenu).call(this);
    } else {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_filterOptions).call(this);
      if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_shouldShowMenu_get)) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
      }
    }
  } finally {
    __classPrivateFieldSet(this, _M3eAutocompleteElement_inputChanged, false, "f");
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.notifyControlStateChange(true);
  }
};
_M3eAutocompleteElement_handleChange = function _M3eAutocompleteElement_handleChange() {
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)) {
    const selected = this.selected;
    if (this.required) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value = selected?.label ?? "";
    } else if (selected && selected.label !== __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value && __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_clearOptions).call(this)) {
      this.dispatchEvent(new Event("change", {
        bubbles: true
      }));
    }
  }
};
_M3eAutocompleteElement_handleKeyDown = function _M3eAutocompleteElement_handleKeyDown(e) {
  if (e.defaultPrevented) return;
  __classPrivateFieldSet(this, _M3eAutocompleteElement_ignoreFocusVisible, false, "f");
  switch (e.key) {
    case "Backspace":
    case "Delete":
      if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get) && !__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
      }
      break;
    case "Enter":
      if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f") && this._listKeyManager.activeItem) {
        e.preventDefault();
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_selectOption).call(this, this._listKeyManager.activeItem);
        if (!prefersReducedMotion()) {
          setTimeout(() => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this), 150);
        } else {
          __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
        }
      } else if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
        setTimeout(() => {
          if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get) && !__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value) {
            __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
          }
        });
      }
      break;
    case "Escape":
    case "Tab":
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
      break;
    case "Up":
    case "ArrowUp":
      if (e.altKey) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
      } else {
        this._listKeyManager.onKeyDown(e);
      }
      break;
    case "Down":
    case "ArrowDown":
      if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
        __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_showMenu).call(this);
        e.preventDefault();
      } else {
        this._listKeyManager.onKeyDown(e);
      }
      break;
    default:
      this._listKeyManager.onKeyDown(e);
      break;
  }
};
_M3eAutocompleteElement_handleMenuPointerDown = function _M3eAutocompleteElement_handleMenuPointerDown(e) {
  __classPrivateFieldSet(this, _M3eAutocompleteElement_menuPressedOption, undefined, "f");
  if (e.button === 2) return;
  // Prevent click to avoid stealing focus.
  e.preventDefault();
  e.stopImmediatePropagation();
  const option = e.composedPath().find(x => x instanceof HTMLElement && x.tagName === "M3E-OPTION");
  if (option && !option.disabled) {
    __classPrivateFieldSet(this, _M3eAutocompleteElement_menuPressedOption, option, "f");
  }
};
_M3eAutocompleteElement_handleMenuPointerUp = function _M3eAutocompleteElement_handleMenuPointerUp(e) {
  const pressedOption = __classPrivateFieldGet(this, _M3eAutocompleteElement_menuPressedOption, "f");
  __classPrivateFieldSet(this, _M3eAutocompleteElement_menuPressedOption, undefined, "f");
  if (e.button === 2) return;
  if (!pressedOption) return;
  const option = e.composedPath().find(x => x instanceof HTMLElement && x.tagName === "M3E-OPTION");
  if (option === pressedOption) {
    this._listKeyManager.setActiveItem(option);
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_selectOption).call(this, option);
  }
  if (!prefersReducedMotion()) {
    setTimeout(() => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this), 150);
  } else {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_hideMenu).call(this);
  }
};
_M3eAutocompleteElement_handleMenuToggle = function _M3eAutocompleteElement_handleMenuToggle(e) {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) return;
  if (e.newState !== "closed") {
    const option = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get).find(x => x.selected && !x.disabled);
    if (option) {
      this._listKeyManager.setActiveItem(option);
      scrollIntoViewIfNeeded(option, __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"));
    } else {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_autoActivate).call(this);
    }
    this.dispatchEvent(new ToggleEvent("toggle", {
      oldState: e.oldState,
      newState: e.newState
    }));
  } else {
    if (prefersReducedMotion()) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_destroyMenu).call(this, e);
    } else {
      // NOTE: use transitionend is preferred but doesn't fire when used here.
      // This is a workaround until that is fixed.
      setTimeout(() => __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_destroyMenu).call(this, e), 100);
    }
  }
};
_M3eAutocompleteElement_removeMenu = function _M3eAutocompleteElement_removeMenu() {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) return;
  __classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f")?.replaceChildren(...__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").childNodes);
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").remove();
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").removeEventListener("toggle", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuToggleHandler, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").removeEventListener("pointerdown", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuPointerDownHandler, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").removeEventListener("pointerup", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuPointerUpHandler, "f"));
  __classPrivateFieldSet(this, _M3eAutocompleteElement_menu, undefined, "f");
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)) return;
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).ariaExpanded = "false";
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).removeAttribute("aria-controls");
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).removeAttribute("aria-activedescendant");
};
_M3eAutocompleteElement_destroyMenu = function _M3eAutocompleteElement_destroyMenu(e) {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) return;
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_removeMenu).call(this);
  this.requestUpdate();
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.notifyControlStateChange();
  this.dispatchEvent(new ToggleEvent("toggle", {
    oldState: e.oldState,
    newState: e.newState
  }));
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)?.slot === "input" && __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).parentElement?.tagName === "M3E-INPUT-CHIP-SET") {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_clearOptions).call(this);
  }
};
_M3eAutocompleteElement_showMenu = function _M3eAutocompleteElement_showMenu() {
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f") || !__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get) || __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).readOnly || __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).disabled) return;
  const count = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_filterOptions).call(this);
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_shouldShowMenu_get)) return;
  __classPrivateFieldSet(this, _M3eAutocompleteElement_menu, document.createElement("m3e-option-panel"), "f");
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").id = __classPrivateFieldGet(this, _M3eAutocompleteElement_menuId, "f");
  if (this.panelClass) {
    for (const klass of this.panelClass.split(/\s+/).map(d => d.trim()).filter(Boolean)) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").classList.add(klass);
    }
  }
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").style.overflowX = "hidden";
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").scrollStrategy = "reposition";
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").fitAnchorWidth = true;
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").addEventListener("toggle", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuToggleHandler, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").addEventListener("pointerdown", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuPointerDownHandler, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").addEventListener("pointerup", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuPointerUpHandler, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_projectClone).call(this);
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_updateMenuState).call(this, __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), count);
  // Mount the panel into the nearest popover or dialog host so it remains inside
  // the active interaction subtree. Popover and dialog semantics require this.
  // If no such host exists, fall back to <body> to avoid framework diffing.
  // NOTE: Frameworks may still interfere when mounted inside their managed DOM,
  // but there is no solution that satisfies all constraints.
  const host = this.closest("[popover]") ?? this.closest("dialog[open]") ?? this.closest("m3e-dialog") ?? document.body;
  host.appendChild(__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).setAttribute("aria-controls", __classPrivateFieldGet(this, _M3eAutocompleteElement_menuId, "f"));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.notifyControlStateChange();
  if (this._listKeyManager.activeItem && this.autoActivate) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_activateOption).call(this, this._listKeyManager.activeItem, true);
  }
  const input = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get);
  const menu = __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f");
  // Skip the deferred show if the options were filtered away in the meantime.
  setTimeout(() => {
    if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f") === menu && __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_shouldShowMenu_get)) {
      menu.show(input, __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.menuAnchor);
    }
  });
};
_M3eAutocompleteElement_projectClone = function _M3eAutocompleteElement_projectClone() {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f") || !__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) return;
  const children = [...__classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f").childNodes];
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_hasNoDataSlot_get) && this.noDataLabel) {
    const noDataSpan = document.createElement("span");
    noDataSpan.slot = "no-data";
    noDataSpan.translate = false;
    const text = document.createElement("span");
    text.translate = true;
    text.textContent = this.noDataLabel;
    noDataSpan.append(text);
    children.push(noDataSpan);
  }
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_hasLoadingSlot_get) && this.loadingLabel) {
    const loadingSpan = document.createElement("span");
    loadingSpan.slot = "loading";
    loadingSpan.translate = false;
    const text = document.createElement("span");
    text.translate = true;
    text.textContent = this.loadingLabel;
    loadingSpan.append(text);
    children.push(loadingSpan);
  }
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f").replaceChildren(...children);
};
_M3eAutocompleteElement_updateMenuState = function _M3eAutocompleteElement_updateMenuState(menu, count) {
  setCustomState(menu, "--loading", this.loading);
  setCustomState(menu, "--no-data", count == 0);
};
_M3eAutocompleteElement_hideMenu = function _M3eAutocompleteElement_hideMenu() {
  __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")?.hide();
};
_M3eAutocompleteElement_activateOption = function _M3eAutocompleteElement_activateOption(option, forceFocusVisible = false) {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)) return;
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).setAttribute("aria-activedescendant", option.id);
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
    scrollIntoViewIfNeeded(option, __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), {
      block: "nearest",
      behavior: "instant"
    });
    const focusVisible = forceFocusVisible || !__classPrivateFieldGet(this, _M3eAutocompleteElement_ignoreFocusVisible, "f") && (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).matches(":focus-visible") || forcedColorsActive());
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get).forEach(x => {
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
_M3eAutocompleteElement_updateSelectionState = /** @private */
async function _M3eAutocompleteElement_updateSelectionState(clone) {
  const option = this._options[this._listKeyManager.items.indexOf(clone)];
  if (option) {
    option.selected = clone.selected;
    await waitForUpdate(option);
  }
};
_M3eAutocompleteElement_selectOption = /** @private */
async function _M3eAutocompleteElement_selectOption(option) {
  if (option.selected) return;
  option.selected = true;
  await __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_updateSelectionState).call(this, option);
  await waitForUpdate(option);
  this.requestUpdate();
  await waitForUpdate(this);
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value = option.label;
  }
  this.dispatchEvent(new Event("change", {
    bubbles: true
  }));
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_formField_get)?.notifyControlStateChange(true);
};
_M3eAutocompleteElement_filterOption = function _M3eAutocompleteElement_filterOption(clone, option, term, exactTerm) {
  const value = this.caseSensitive ? option.value : option.value.toLowerCase();
  switch (this.filter) {
    case "starts-with":
      clone.term = exactTerm;
      clone.highlightMode = this.filter;
      return value.startsWith(term);
    case "ends-with":
      clone.term = exactTerm;
      clone.highlightMode = this.filter;
      return value.endsWith(term);
    case "contains":
      clone.term = exactTerm;
      clone.highlightMode = this.filter;
      return value.includes(term);
    case "none":
      clone.disableHighlight = true;
      return true;
    default:
      if (this.filter instanceof Function) {
        clone.disableHighlight = true;
        return this.filter(option, exactTerm);
      }
      // Invalid filter, fallback to contains
      clone.term = exactTerm;
      clone.highlightMode = this.filter;
      return value.includes(term);
  }
};
_M3eAutocompleteElement_filterOptions = function _M3eAutocompleteElement_filterOptions() {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)) return 0;
  const oldCount = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get).filter(x => x.hidden === false).length;
  const shouldAnnounce = !this.loading && __classPrivateFieldGet(this, _M3eAutocompleteElement_inputChanged, "f");
  __classPrivateFieldSet(this, _M3eAutocompleteElement_inputChanged, false, "f");
  const exactTerm = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get).value;
  const term = this.caseSensitive ? exactTerm : exactTerm.toLocaleLowerCase();
  let newCount = 0;
  let first = false;
  let last;
  for (let i = 0; i < __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get).length; i++) {
    const clone = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get)[i];
    const option = this._options[i];
    clone.hidden = !__classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_filterOption).call(this, clone, option, term, exactTerm);
    if (clone.hidden === true) {
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_deactivateOption).call(this, clone);
      deleteCustomState(clone, "--first");
      deleteCustomState(clone, "--last");
    } else {
      newCount++;
      if (!first && !(clone.parentElement instanceof M3eOptGroupElement)) {
        addCustomState(clone, "--first");
        first = true;
        addCustomState(clone, "--last");
        last = clone;
      } else {
        deleteCustomState(clone, "--first");
        if (last) {
          deleteCustomState(last, "--last");
        }
        addCustomState(clone, "--last");
        last = clone;
      }
    }
  }
  if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_updateMenuState).call(this, __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), newCount);
  }
  const groups = __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")?.querySelectorAll("m3e-optgroup") ?? __classPrivateFieldGet(this, _M3eAutocompleteElement_clone, "f")?.querySelectorAll("m3e-optgroup") ?? [];
  for (const group of groups) {
    group.hidden = [...group.querySelectorAll("m3e-option")].every(x => x.hidden === true);
  }
  if (shouldAnnounce) {
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_announceResults).call(this, oldCount, newCount);
  }
  __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_autoActivate).call(this);
  return newCount;
};
_M3eAutocompleteElement_clearOptions = function _M3eAutocompleteElement_clearOptions() {
  const selected = this._listKeyManager.items.filter(x => x.selected);
  if (selected.length > 0) {
    selected.forEach(x => {
      x.selected = false;
      __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "m", _M3eAutocompleteElement_updateSelectionState).call(this, x);
    });
    return true;
  }
  return false;
};
_M3eAutocompleteElement_announceResults = function _M3eAutocompleteElement_announceResults(oldCount, newCount) {
  if (!__classPrivateFieldGet(this, _M3eAutocompleteElement_hasFocus, "f")) return;
  if (newCount == 0) {
    if (oldCount > 0 && this.noDataLabel) {
      M3eLiveAnnouncer.announce(this.noDataLabel, "polite");
    }
  } else if (oldCount != newCount) {
    const message = this.resultsLabel instanceof Function ? this.resultsLabel(newCount) : this.resultsLabel;
    if (message) {
      M3eLiveAnnouncer.announce(message, "polite");
    }
  }
};
_M3eAutocompleteElement_autoActivate = function _M3eAutocompleteElement_autoActivate() {
  if (this.autoActivate && (!this._listKeyManager.activeItem || !this._listKeyManager.activeItem.selected)) {
    const option = __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_options_get).find(x => !x.disabled && x.hidden === false);
    if (option) {
      this._listKeyManager.setActiveItem(option);
      if (__classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f")) {
        scrollIntoViewIfNeeded(option, __classPrivateFieldGet(this, _M3eAutocompleteElement_menu, "f"), {
          block: "nearest",
          behavior: "instant"
        });
      }
    }
  }
};
_M3eAutocompleteElement_deactivateOption = function _M3eAutocompleteElement_deactivateOption(option) {
  option.focusRing?.hide();
  option.stateLayer?.hide("focused");
  if (option === this._listKeyManager.activeItem) {
    this._listKeyManager.updateActiveItem(null);
    __classPrivateFieldGet(this, _M3eAutocompleteElement_instances, "a", _M3eAutocompleteElement_input_get)?.removeAttribute("aria-activedescendant");
  }
};
/** The styles of the element. */
M3eAutocompleteElement.styles = css`:host { display: contents; } :host([hidden]) { display: none; } .options { display: none; }`;
/** @private */
M3eAutocompleteElement.__nextId = 0;
__decorate([property({
  attribute: "hide-selection-indicator",
  type: Boolean
})], M3eAutocompleteElement.prototype, "hideSelectionIndicator", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eAutocompleteElement.prototype, "required", void 0);
__decorate([property({
  attribute: "auto-activate",
  type: Boolean
})], M3eAutocompleteElement.prototype, "autoActivate", void 0);
__decorate([property({
  attribute: "case-sensitive",
  type: Boolean
})], M3eAutocompleteElement.prototype, "caseSensitive", void 0);
__decorate([property({
  converter: {
    fromAttribute(value) {
      if (value === null) return "contains";
      if (value === "starts-with" || value === "ends-with" || value === "contains" || value === "none") {
        return value;
      }
      return "contains";
    }
  }
})], M3eAutocompleteElement.prototype, "filter", void 0);
__decorate([property({
  type: Boolean
})], M3eAutocompleteElement.prototype, "loading", void 0);
__decorate([property({
  attribute: "hide-no-data",
  type: Boolean
})], M3eAutocompleteElement.prototype, "hideNoData", void 0);
__decorate([property({
  attribute: "hide-loading",
  type: Boolean
})], M3eAutocompleteElement.prototype, "hideLoading", void 0);
__decorate([property({
  attribute: "loading-label"
})], M3eAutocompleteElement.prototype, "loadingLabel", void 0);
__decorate([property({
  attribute: "no-data-label"
})], M3eAutocompleteElement.prototype, "noDataLabel", void 0);
__decorate([property({
  attribute: "results-label"
})], M3eAutocompleteElement.prototype, "resultsLabel", void 0);
__decorate([property({
  attribute: "panel-class"
})], M3eAutocompleteElement.prototype, "panelClass", void 0);
M3eAutocompleteElement = M3eAutocompleteElement_1 = __decorate([customElement("m3e-autocomplete")], M3eAutocompleteElement);

export { M3eAutocompleteElement };
//# sourceMappingURL=autocomplete.js.map
