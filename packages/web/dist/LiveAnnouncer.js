/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from 'tslib';
import { hasKeys, isDisabledMixin, Disabled, customElement } from './TextOverflowElement.js';
import { query } from 'lit/decorators.js';
import { isCheckedOrSelected, checkOrSelect } from './CheckedOrSelected.js';
import { isServer, LitElement, html, css } from 'lit';
import 'lit/directives/if-defined.js';

/** The modifier keys. */
const ModifierKeys = ["alt", "shift", "ctrl", "meta"];

/** Specifies known key code values. */
var KeyCode;
(function (KeyCode) {
  KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
  KeyCode[KeyCode["Tab"] = 9] = "Tab";
  KeyCode[KeyCode["Enter"] = 13] = "Enter";
  KeyCode[KeyCode["Shift"] = 16] = "Shift";
  KeyCode[KeyCode["Ctrl"] = 17] = "Ctrl";
  KeyCode[KeyCode["Alt"] = 18] = "Alt";
  KeyCode[KeyCode["PauseBreak"] = 19] = "PauseBreak";
  KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
  KeyCode[KeyCode["Escape"] = 27] = "Escape";
  KeyCode[KeyCode["Space"] = 32] = "Space";
  KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
  KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
  KeyCode[KeyCode["End"] = 35] = "End";
  KeyCode[KeyCode["Home"] = 36] = "Home";
  KeyCode[KeyCode["LeftArrow"] = 37] = "LeftArrow";
  KeyCode[KeyCode["UpArrow"] = 38] = "UpArrow";
  KeyCode[KeyCode["RightArrow"] = 39] = "RightArrow";
  KeyCode[KeyCode["DownArrow"] = 40] = "DownArrow";
  KeyCode[KeyCode["Insert"] = 45] = "Insert";
  KeyCode[KeyCode["Delete"] = 46] = "Delete";
  KeyCode[KeyCode["Zero"] = 48] = "Zero";
  KeyCode[KeyCode["ClosedParen"] = 48] = "ClosedParen";
  KeyCode[KeyCode["One"] = 49] = "One";
  KeyCode[KeyCode["ExclamationMark"] = 49] = "ExclamationMark";
  KeyCode[KeyCode["Two"] = 50] = "Two";
  KeyCode[KeyCode["AtSign"] = 50] = "AtSign";
  KeyCode[KeyCode["Three"] = 51] = "Three";
  KeyCode[KeyCode["PoundSign"] = 51] = "PoundSign";
  KeyCode[KeyCode["Hash"] = 51] = "Hash";
  KeyCode[KeyCode["Four"] = 52] = "Four";
  KeyCode[KeyCode["DollarSign"] = 52] = "DollarSign";
  KeyCode[KeyCode["Five"] = 53] = "Five";
  KeyCode[KeyCode["PercentSign"] = 53] = "PercentSign";
  KeyCode[KeyCode["Six"] = 54] = "Six";
  KeyCode[KeyCode["Caret"] = 54] = "Caret";
  KeyCode[KeyCode["Hat"] = 54] = "Hat";
  KeyCode[KeyCode["Seven"] = 55] = "Seven";
  KeyCode[KeyCode["Ampersand"] = 55] = "Ampersand";
  KeyCode[KeyCode["Eight"] = 56] = "Eight";
  KeyCode[KeyCode["Star"] = 56] = "Star";
  KeyCode[KeyCode["Asterik"] = 56] = "Asterik";
  KeyCode[KeyCode["Nine"] = 57] = "Nine";
  KeyCode[KeyCode["OpenParen"] = 57] = "OpenParen";
  KeyCode[KeyCode["A"] = 65] = "A";
  KeyCode[KeyCode["B"] = 66] = "B";
  KeyCode[KeyCode["C"] = 67] = "C";
  KeyCode[KeyCode["D"] = 68] = "D";
  KeyCode[KeyCode["E"] = 69] = "E";
  KeyCode[KeyCode["F"] = 70] = "F";
  KeyCode[KeyCode["G"] = 71] = "G";
  KeyCode[KeyCode["H"] = 72] = "H";
  KeyCode[KeyCode["I"] = 73] = "I";
  KeyCode[KeyCode["J"] = 74] = "J";
  KeyCode[KeyCode["K"] = 75] = "K";
  KeyCode[KeyCode["L"] = 76] = "L";
  KeyCode[KeyCode["M"] = 77] = "M";
  KeyCode[KeyCode["N"] = 78] = "N";
  KeyCode[KeyCode["O"] = 79] = "O";
  KeyCode[KeyCode["P"] = 80] = "P";
  KeyCode[KeyCode["Q"] = 81] = "Q";
  KeyCode[KeyCode["R"] = 82] = "R";
  KeyCode[KeyCode["S"] = 83] = "S";
  KeyCode[KeyCode["T"] = 84] = "T";
  KeyCode[KeyCode["U"] = 85] = "U";
  KeyCode[KeyCode["V"] = 86] = "V";
  KeyCode[KeyCode["W"] = 87] = "W";
  KeyCode[KeyCode["X"] = 88] = "X";
  KeyCode[KeyCode["Y"] = 89] = "Y";
  KeyCode[KeyCode["Z"] = 90] = "Z";
  KeyCode[KeyCode["LeftWindowKey"] = 91] = "LeftWindowKey";
  KeyCode[KeyCode["RightWindowKey"] = 92] = "RightWindowKey";
  KeyCode[KeyCode["SelectKey"] = 93] = "SelectKey";
  KeyCode[KeyCode["Numpad0"] = 96] = "Numpad0";
  KeyCode[KeyCode["Numpad1"] = 97] = "Numpad1";
  KeyCode[KeyCode["Numpad2"] = 98] = "Numpad2";
  KeyCode[KeyCode["Numpad3"] = 99] = "Numpad3";
  KeyCode[KeyCode["Numpad4"] = 100] = "Numpad4";
  KeyCode[KeyCode["Numpad5"] = 101] = "Numpad5";
  KeyCode[KeyCode["Numpad6"] = 102] = "Numpad6";
  KeyCode[KeyCode["Numpad7"] = 103] = "Numpad7";
  KeyCode[KeyCode["Numpad8"] = 104] = "Numpad8";
  KeyCode[KeyCode["Numpad9"] = 105] = "Numpad9";
  KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
  KeyCode[KeyCode["Add"] = 107] = "Add";
  KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
  KeyCode[KeyCode["DecimalPoint"] = 110] = "DecimalPoint";
  KeyCode[KeyCode["Divide"] = 111] = "Divide";
  KeyCode[KeyCode["F1"] = 112] = "F1";
  KeyCode[KeyCode["F2"] = 113] = "F2";
  KeyCode[KeyCode["F3"] = 114] = "F3";
  KeyCode[KeyCode["F4"] = 115] = "F4";
  KeyCode[KeyCode["F5"] = 116] = "F5";
  KeyCode[KeyCode["F6"] = 117] = "F6";
  KeyCode[KeyCode["F7"] = 118] = "F7";
  KeyCode[KeyCode["F8"] = 119] = "F8";
  KeyCode[KeyCode["F9"] = 120] = "F9";
  KeyCode[KeyCode["F10"] = 121] = "F10";
  KeyCode[KeyCode["F11"] = 122] = "F11";
  KeyCode[KeyCode["F12"] = 123] = "F12";
  KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
  KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
  KeyCode[KeyCode["SemiColon"] = 186] = "SemiColon";
  KeyCode[KeyCode["Equals"] = 187] = "Equals";
  KeyCode[KeyCode["Comma"] = 188] = "Comma";
  KeyCode[KeyCode["Dash"] = 189] = "Dash";
  KeyCode[KeyCode["Period"] = 190] = "Period";
  KeyCode[KeyCode["UnderScore"] = 189] = "UnderScore";
  KeyCode[KeyCode["PlusSign"] = 187] = "PlusSign";
  KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
  KeyCode[KeyCode["Tilde"] = 192] = "Tilde";
  KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
  KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
  KeyCode[KeyCode["ClosedBracket"] = 221] = "ClosedBracket";
  KeyCode[KeyCode["Quote"] = 222] = "Quote";
})(KeyCode || (KeyCode = {}));

/**
 * Resolves the key code for the specified `KeyboardEvent`.
 * @param {KeyboardEvent} e The `KeyboardEvent` for which to resolve the key code.
 * @returns {number} The key code for `e`.
 */
function getKeyCode(e) {
  return e.which || e.charCode || e.keyCode;
}

/**
 * Determines whether a modifier key is pressed.
 * @param {KeyboardEvent} e The `KeyboardEvent` to test.
 * @param {ModifierKey[]} modifiers The modifier keys to test.
 * @returns {boolean} Whether a modifier key is pressed.
 */
function hasModifierKey(e, ...modifiers) {
  return modifiers.length ? modifiers.some(x => e[`${x}Key`]) : e.altKey || e.shiftKey || e.ctrlKey || e.metaKey;
}

/**
 * Determines whether the specified modifier keys are allowed.
 * @param {KeyboardEvent} e The `KeyboardEvent` to test.
 * @param {ModifierKey[]} modifiers The allowed modifier keys.
 * @returns {boolean} Whether `modifiers` are allowed.
 */
function isModifierAllowed(e, ...modifiers) {
  return ModifierKeys.every(x => !hasModifierKey(e, x) || modifiers.includes(x));
}

var _ListManager_items, _ListManager_activeItem, _ListManager_onActiveItemChangeCallback;
/**
 * Utility for managing a list of items which supports activation.
 * @template T The type of managed item.
 */
class ListManager {
  constructor() {
    /** @private */_ListManager_items.set(this, new Array());
    /** @private */
    _ListManager_activeItem.set(this, null);
    /** @private */
    _ListManager_onActiveItemChangeCallback.set(this, void 0);
  }
  /** The items being managed. */
  get items() {
    return __classPrivateFieldGet(this, _ListManager_items, "f");
  }
  /** The active item. */
  get activeItem() {
    return __classPrivateFieldGet(this, _ListManager_activeItem, "f");
  }
  /**
   * Sets the items to manage.
   * @param {Array<T>} items The new items.
   * @returns {{ added: ReadonlyArray<T>; removed: ReadonlyArray<T> }} An object specifying added and removed items.
   */
  setItems(items) {
    const removed = this.items.filter(x => !items.includes(x));
    const added = items.filter(x => !this.items.includes(x));
    __classPrivateFieldSet(this, _ListManager_items, items, "f");
    if (this.activeItem && !this.items.includes(this.activeItem)) {
      this.updateActiveItem(null);
    }
    return {
      added,
      removed
    };
  }
  /**
   * Sets the active item.
   * @param {T | null | undefined} item The new active item.
   */
  setActiveItem(item) {
    if (this.activeItem !== item) {
      this.updateActiveItem(item);
      __classPrivateFieldGet(this, _ListManager_onActiveItemChangeCallback, "f")?.call(this);
    }
  }
  /**
   * Updates the active item.
   * @param {T | null | undefined} item The active item.
   */
  updateActiveItem(item) {
    __classPrivateFieldSet(this, _ListManager_activeItem, item ?? null, "f");
  }
  /**
   * Configures the list manager with a callback invoked when an item is activated.
   * @param {() => void} callback The callback invoked when an item is activated.
   * @returns {ListManager<T>} The configured list manager.
   */
  onActiveItemChange(callback) {
    __classPrivateFieldSet(this, _ListManager_onActiveItemChangeCallback, callback, "f");
    return this;
  }
}
_ListManager_items = new WeakMap(), _ListManager_activeItem = new WeakMap(), _ListManager_onActiveItemChangeCallback = new WeakMap();

/**
 * Adapted from Angular Material CDK KeyManager
 * Source: https://github.com/angular/components/blob/main/src/cdk/a11y/key-manager/typeahead.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _Typeahead_instances, _Typeahead_debounceInterval, _Typeahead_timeoutId, _Typeahead_callback, _Typeahead_skipPredicate, _Typeahead_pressedKeys, _Typeahead_selectedIndex, _Typeahead_items, _Typeahead_appendKey, _Typeahead_searchItems;
/** A symbol through which to access an element's textual content used for typeahead search. */
const typeaheadLabel = Symbol("typeaheadLabel");
/**
 * Determines whether a value is a `TypeaheadItem`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `TypeaheadItem`.
 */
function isTypeaheadItem(value) {
  return hasKeys(value, typeaheadLabel);
}
/**
 * Implements typeahead functionality which selects items based on keyboard input.
 * @template T The type of `TypeaheadItem`.
 */
class Typeahead {
  /**
   * Initializes a new instance of this class.
   * @param {TypeaheadOptions<T>} options Options that control typeahead behavior.
   */
  constructor(options) {
    _Typeahead_instances.add(this);
    /** @private */
    _Typeahead_debounceInterval.set(this, void 0);
    /** @private */
    _Typeahead_timeoutId.set(this, -1);
    /** @private */
    _Typeahead_callback.set(this, void 0);
    /** @private */
    _Typeahead_skipPredicate.set(this, void 0);
    /** @private */
    _Typeahead_pressedKeys.set(this, new Array());
    /** @private */
    _Typeahead_selectedIndex.set(this, -1);
    /** @private */
    _Typeahead_items.set(this, []);
    __classPrivateFieldSet(this, _Typeahead_debounceInterval, options.debounceInterval ?? 200, "f");
    __classPrivateFieldSet(this, _Typeahead_callback, options.callback, "f");
    __classPrivateFieldSet(this, _Typeahead_skipPredicate, options.skipPredicate, "f");
  }
  /** Whether the user is currently typing. */
  get isTyping() {
    return __classPrivateFieldGet(this, _Typeahead_pressedKeys, "f").length > 0;
  }
  /**
   * Sets the items to search.
   * @param {readonly T[]} items The items to search.
   */
  setItems(items) {
    __classPrivateFieldSet(this, _Typeahead_items, items, "f");
  }
  /**
   * Sets the index of the selected item.
   * @param {number} index The index of the selected item.
   */
  setSelectedIndex(index) {
    __classPrivateFieldSet(this, _Typeahead_selectedIndex, index, "f");
  }
  /** Resets the stored sequence of typed characters. */
  reset() {
    __classPrivateFieldGet(this, _Typeahead_pressedKeys, "f").length = 0;
  }
  /**
   * Sets the selected item depending on the key event passed in.
   * @param {KeyboardEvent} e The keyboard event to be used for determining which element should be active.
   */
  onKeyDown(e) {
    if (e.key && e.key.length === 1) {
      __classPrivateFieldGet(this, _Typeahead_instances, "m", _Typeahead_appendKey).call(this, e.key);
    } else {
      const keycode = getKeyCode(e);
      if (keycode >= KeyCode.A && keycode <= KeyCode.Z || keycode >= KeyCode.Zero && keycode <= KeyCode.Nine) {
        __classPrivateFieldGet(this, _Typeahead_instances, "m", _Typeahead_appendKey).call(this, String.fromCharCode(keycode));
      }
    }
  }
}
_Typeahead_debounceInterval = new WeakMap(), _Typeahead_timeoutId = new WeakMap(), _Typeahead_callback = new WeakMap(), _Typeahead_skipPredicate = new WeakMap(), _Typeahead_pressedKeys = new WeakMap(), _Typeahead_selectedIndex = new WeakMap(), _Typeahead_items = new WeakMap(), _Typeahead_instances = new WeakSet(), _Typeahead_appendKey = function _Typeahead_appendKey(key) {
  __classPrivateFieldGet(this, _Typeahead_pressedKeys, "f").push(key.toLocaleUpperCase());
  clearTimeout(__classPrivateFieldGet(this, _Typeahead_timeoutId, "f"));
  __classPrivateFieldSet(this, _Typeahead_timeoutId, setTimeout(() => __classPrivateFieldGet(this, _Typeahead_instances, "m", _Typeahead_searchItems).call(this), __classPrivateFieldGet(this, _Typeahead_debounceInterval, "f")), "f");
}, _Typeahead_searchItems = function _Typeahead_searchItems() {
  const term = __classPrivateFieldGet(this, _Typeahead_pressedKeys, "f").join("");
  for (let i = 1; i < __classPrivateFieldGet(this, _Typeahead_items, "f").length + 1; i++) {
    const index = (__classPrivateFieldGet(this, _Typeahead_selectedIndex, "f") + i) % __classPrivateFieldGet(this, _Typeahead_items, "f").length;
    const item = __classPrivateFieldGet(this, _Typeahead_items, "f")[index];
    const label = item[typeaheadLabel]?.().toLocaleUpperCase().trim();
    if (!__classPrivateFieldGet(this, _Typeahead_skipPredicate, "f")?.call(this, item) && label?.indexOf(term) === 0) {
      __classPrivateFieldGet(this, _Typeahead_callback, "f").call(this, item);
      break;
    }
  }
  this.reset();
};

/**
 * Adapted from Angular Material CDK KeyManager
 * Source: https://github.com/angular/components/blob/main/src/cdk/a11y/key-manager/list-key-manager.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _ListKeyManager_instances, _ListKeyManager_typeahead, _ListKeyManager_findFirst, _ListKeyManager_findLast, _ListKeyManager_findNext, _ListKeyManager_findPrevious, _ListKeyManager_findPreviousByIndex, _ListKeyManager_findNextByIndex;
/**
 * Utility for managing keyboard events for selectable lists.
 * @template T The type of managed item.
 */
class ListKeyManager extends ListManager {
  constructor() {
    super(...arguments);
    _ListKeyManager_instances.add(this);
    /** @private */
    _ListKeyManager_typeahead.set(this, void 0);
    /**
     * Whether the active item will wrap to the other end of
     * list when there are no more items in the given direction.
     * @default false
     */
    this.wrap = false;
    /**
     * Whether to activate the first and last items respectively when
     * the `HOME` or `END` key is pressed.
     * @default false
     */
    this.homeAndEnd = false;
    /**
     * Whether to activate every 10th (or configured) first/last item
     * in the up/down direction when the `PAGEUP` or `PAGEDOWN` key is pressed.
     * @default false
     */
    this.pageUpAndDown = false;
    /**
     * The number of items to skip when the `PAGEUP` or `PAGEDOWN` key is pressed.
     * @default 10
     */
    this.pageDelta = 10;
    /**
     * Whether to the list is oriented vertically.
     * @default false
     */
    this.vertical = false;
    /** The allowed modifier keys.
     * @default []
     */
    this.allowedModifiers = [];
    /**
     * A function used to skip items.
     * @param {T} item The item to test.
     * @returns {boolean} Whether `item` should be skipped.
     */
    this.skipPredicate = item => isDisabledMixin(item) && item.disabled;
    /**
     * The directionality.
     * @default "ltr"
     */
    this.directionality = "ltr";
  }
  /** @inheritdoc */
  setItems(items) {
    __classPrivateFieldGet(this, _ListKeyManager_typeahead, "f")?.setItems(items);
    return super.setItems(items);
  }
  /** @inheritdoc */
  updateActiveItem(item) {
    super.updateActiveItem(item);
    if (__classPrivateFieldGet(this, _ListKeyManager_typeahead, "f")) {
      __classPrivateFieldGet(this, _ListKeyManager_typeahead, "f").setSelectedIndex(item ? this.items.indexOf(item) : -1);
    }
  }
  /**
   * Configures the key manager to activate the first and last items respectively when the `HOME` or `END` key is pressed.
   * @param {boolean} [enabled = true] Whether to activate the first and last items respectively when
   * the `HOME` or `END` key is pressed.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withHomeAndEnd(enabled = true) {
    this.homeAndEnd = enabled;
    return this;
  }
  /**
   * Configures the key manager to page up and down when the `PAGEUP` or `PAGEDOWN` key is pressed.
   * @param {boolean} [enabled = true] Whether to activate page up and down when the `PAGEUP` or `PAGEDOWN` key is pressed.
   * @param {number} [pageDelta=10] The number of items to skip when the `PAGEUP` or `PAGEDOWN` key is pressed.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withPageUpAndDown(enabled = true, pageDelta = 10) {
    this.pageUpAndDown = enabled;
    this.pageDelta = pageDelta;
    return this;
  }
  /**
   * Configures wrapping mode, which determines whether the active item will wrap to the other end of list when there are no more items in the given direction.
   * @param {boolean} [enabled = true] Whether the active item will wrap to the other end of
   * list when there are no more items in the given direction.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withWrap(enabled = true) {
    this.wrap = enabled;
    return this;
  }
  /**
   * Configures whether to move the selection vertically.
   * @param {boolean} [enabled = true] Whether to move selection vertically.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withVerticalOrientation(enabled = true) {
    this.vertical = enabled;
    return this;
  }
  /**
   * Configured allowed modifier keys.
   * @param {ModifierKey[]} modifiers The allowed modifier keys.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withAllowedModifiers(...modifiers) {
    this.allowedModifiers = modifiers;
    return this;
  }
  /**
   * Configures whether typeahead is enabled.
   * @param {boolean} [enabled = true] Whether typeahead is enabled.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withTypeahead(enabled = true) {
    if (enabled) {
      __classPrivateFieldSet(this, _ListKeyManager_typeahead, new Typeahead({
        callback: item => this.setActiveItem(item)
      }), "f");
    } else {
      __classPrivateFieldSet(this, _ListKeyManager_typeahead, undefined, "f");
    }
    return this;
  }
  /**
   * Configures a function used to test whether an item should be skipped.
   * @param skipPredicate A function used to determine whether an item should be skipped.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withSkipPredicate(skipPredicate) {
    this.skipPredicate = skipPredicate;
    return this;
  }
  /**
   * Configures the directionality.
   * @param {"ltr" | "rtl"} directionality The directionality.
   * @returns {ListKeyManager<T>} The configured key manager.
   */
  withDirectionality(directionality) {
    this.directionality = directionality;
    return this;
  }
  /**
   * Sets the active item depending on the key event passed in.
   * @param {KeyboardEvent} e The keyboard event to be used for determining which element should be active.
   */
  onKeyDown(e) {
    if (e.defaultPrevented) return;
    const modifierAllowed = isModifierAllowed(e, ...this.allowedModifiers);
    switch (e.key) {
      case "Left":
      case "ArrowLeft":
        if (modifierAllowed && !this.vertical) {
          e.preventDefault();
          const prev = this.directionality === "ltr" ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findPrevious).call(this) : __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findNext).call(this);
          if (prev) {
            this.setActiveItem(prev);
          }
        }
        break;
      case "Up":
      case "ArrowUp":
        if (modifierAllowed) {
          e.preventDefault();
          const prev = this.directionality === "ltr" ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findPrevious).call(this) : __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findNext).call(this);
          if (prev) {
            this.setActiveItem(prev);
          }
        }
        break;
      case "Right":
      case "ArrowRight":
        if (modifierAllowed && !this.vertical) {
          e.preventDefault();
          const next = this.directionality === "ltr" ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findNext).call(this) : __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findPrevious).call(this);
          if (next) {
            this.setActiveItem(next);
          }
        }
        break;
      case "Down":
      case "ArrowDown":
        if (modifierAllowed) {
          e.preventDefault();
          const next = this.directionality === "ltr" ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findNext).call(this) : __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findPrevious).call(this);
          if (next) {
            this.setActiveItem(next);
          }
        }
        break;
      case "Home":
        if (modifierAllowed && this.homeAndEnd) {
          e.preventDefault();
          const first = __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findFirst).call(this);
          if (first) {
            this.setActiveItem(first);
          }
        }
        break;
      case "End":
        if (modifierAllowed && this.homeAndEnd) {
          e.preventDefault();
          const last = __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findLast).call(this);
          if (last) {
            this.setActiveItem(last);
          }
        }
        break;
      case "PageUp":
        if (modifierAllowed && this.pageUpAndDown) {
          e.preventDefault();
          const index = this.activeItem ? Math.max(0, this.items.indexOf(this.activeItem) - this.pageDelta) : 0;
          const prev = this.directionality === "ltr" ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findPreviousByIndex).call(this, index) : __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findNextByIndex).call(this, index);
          if (prev) {
            this.setActiveItem(prev);
          }
        }
        break;
      case "PageDown":
        if (modifierAllowed && this.pageUpAndDown) {
          e.preventDefault();
          const index = this.activeItem ? Math.min(this.items.length - 1, this.items.indexOf(this.activeItem) + this.pageDelta) : this.items.length - 1;
          const next = this.directionality === "ltr" ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findNextByIndex).call(this, index) : __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findPreviousByIndex).call(this, index);
          if (next) {
            this.setActiveItem(next);
          }
        }
        break;
      default:
        if (modifierAllowed || hasModifierKey(e, "shift")) {
          __classPrivateFieldGet(this, _ListKeyManager_typeahead, "f")?.onKeyDown(e);
        }
        break;
    }
  }
}
_ListKeyManager_typeahead = new WeakMap(), _ListKeyManager_instances = new WeakSet(), _ListKeyManager_findFirst = function _ListKeyManager_findFirst() {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i] === this.activeItem) break;
    const test = this.items[i];
    if (!this.skipPredicate(test)) {
      return test;
    }
  }
  return null;
}, _ListKeyManager_findLast = function _ListKeyManager_findLast() {
  for (let i = this.items.length - 1; i >= 0; i--) {
    if (this.items[i] === this.activeItem) break;
    const test = this.items[i];
    if (!this.skipPredicate(test)) {
      return test;
    }
  }
  return null;
}, _ListKeyManager_findNext = function _ListKeyManager_findNext() {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i] === this.activeItem) {
      for (let j = i + 1; j < this.items.length; j++) {
        const test = this.items[j];
        if (!this.skipPredicate(test)) {
          return test;
        }
      }
      break;
    }
  }
  return this.wrap ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findFirst).call(this) : null;
}, _ListKeyManager_findPrevious = function _ListKeyManager_findPrevious() {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i] === this.activeItem) {
      for (let j = i - 1; j >= 0; j--) {
        const test = this.items[j];
        if (!this.skipPredicate(test)) {
          return test;
        }
      }
      break;
    }
  }
  return this.wrap ? __classPrivateFieldGet(this, _ListKeyManager_instances, "m", _ListKeyManager_findLast).call(this) : null;
}, _ListKeyManager_findPreviousByIndex = function _ListKeyManager_findPreviousByIndex(index) {
  for (let i = index; i >= 0; i--) {
    const test = this.items[i];
    if (!this.skipPredicate(test)) {
      return test;
    }
  }
  return null;
}, _ListKeyManager_findNextByIndex = function _ListKeyManager_findNextByIndex(index) {
  for (let i = index; i < this.items.length; i++) {
    const test = this.items[i];
    if (!this.skipPredicate(test)) {
      return test;
    }
  }
  return null;
};

var _FocusKeyManager_focusOptions;
/**
 * Utility for managing keyboard events for selectable lists whose items directly receive focus.
 * @template T The type of managed item.
 */
class FocusKeyManager extends ListKeyManager {
  constructor() {
    super(...arguments);
    /** @private */
    _FocusKeyManager_focusOptions.set(this, void 0);
  }
  /** @inheritdoc */
  setActiveItem(item) {
    super.setActiveItem(item);
    item?.focus(__classPrivateFieldGet(this, _FocusKeyManager_focusOptions, "f"));
  }
  /**
   * Configures the key manager with options used to focus items.
   * @param {FocusOptions} options Options used to focus items.
   * @returns {FocusKeyManager<T>} The configured key manager.
   */
  withOptions(options) {
    __classPrivateFieldSet(this, _FocusKeyManager_focusOptions, options, "f");
    return this;
  }
}
_FocusKeyManager_focusOptions = new WeakMap();

var _RovingTabIndexManager_disableRovingTabIndex;
/**
 * Utility for managing keyboard events and a roving tab index for selectable lists whose items directly receive focus.
 * @template T The type of managed item.
 */
class RovingTabIndexManager extends FocusKeyManager {
  constructor() {
    super(...arguments);
    /** @private */
    _RovingTabIndexManager_disableRovingTabIndex.set(this, false);
  }
  /** @inheritdoc */
  updateActiveItem(item) {
    super.updateActiveItem(item);
    if (!__classPrivateFieldGet(this, _RovingTabIndexManager_disableRovingTabIndex, "f")) {
      item?.setAttribute("tabindex", "0");
      for (const other of this.items) {
        if (other !== item && other.hasAttribute("tabindex")) {
          other.setAttribute("tabindex", "-1");
        }
      }
    }
  }
  /** @inheritdoc */
  setItems(items) {
    const result = super.setItems(items);
    if (!__classPrivateFieldGet(this, _RovingTabIndexManager_disableRovingTabIndex, "f")) {
      for (const added of result.added) {
        if (added !== this.activeItem && !this.skipPredicate(added)) {
          added.setAttribute("tabindex", "-1");
        }
      }
    }
    return result;
  }
  /**
   * Configures whether roving tab index is disabled.
   * @param {boolean} [disabled=true] Whether the roving tab index is disabled.
   * @returns {RovingTabIndexManager<T>} The configured roving tab index manager.
   */
  disableRovingTabIndex(disabled = true) {
    if (disabled !== __classPrivateFieldGet(this, _RovingTabIndexManager_disableRovingTabIndex, "f")) {
      __classPrivateFieldSet(this, _RovingTabIndexManager_disableRovingTabIndex, disabled, "f");
      for (const item of this.items) {
        if (!this.skipPredicate(item)) {
          item?.setAttribute("tabindex", __classPrivateFieldGet(this, _RovingTabIndexManager_disableRovingTabIndex, "f") || item === this.activeItem ? "0" : "-1");
        }
      }
    }
    return this;
  }
}
_RovingTabIndexManager_disableRovingTabIndex = new WeakMap();

var _RadioKeyManager_disabled;
/**
 * Utility for managing keyboard events for selectable lists whose items behave like a radio.
 * @template T The type of managed item.
 */
class RadioKeyManager extends RovingTabIndexManager {
  constructor() {
    super(...arguments);
    /** @private */
    _RadioKeyManager_disabled.set(this, false);
  }
  /** Whether managed items are disabled. */
  get disabled() {
    return __classPrivateFieldGet(this, _RadioKeyManager_disabled, "f");
  }
  set disabled(value) {
    __classPrivateFieldSet(this, _RadioKeyManager_disabled, value, "f");
    this.items.forEach(x => x.disabled = value);
  }
  /** @inheritdoc */
  setItems(items) {
    if (this.disabled) {
      items.forEach(x => x.disabled = true);
    }
    const {
      added,
      removed
    } = super.setItems(items);
    if (added.length > 0 || removed.length > 0) {
      if (!this.activeItem) {
        this.updateActiveItem(added.find(x => !this.skipPredicate(x)) ?? null);
      }
      if (this.activeItem && (this.activeItem.disabled || !isCheckedOrSelected(this.activeItem))) {
        const checked = added.find(x => !this.skipPredicate(x) && isCheckedOrSelected(x));
        if (checked) {
          this.updateActiveItem(checked);
        }
      }
    }
    return {
      added,
      removed
    };
  }
}
_RadioKeyManager_disabled = new WeakMap();

var _SelectionManager_instances, _SelectionManager_onSelectedItemsChangeCallback, _SelectionManager_selectedItems, _SelectionManager_multi, _SelectionManager_enforceSingleSelect;
/** A symbol through which to access an element's selection manager. */
const selectionManager = Symbol("selectionManager");
/**
 * Utility for managing keyboard events for selectable lists where one or more items can be selected.
 * @template T The type of managed item.
 */
class SelectionManager extends RadioKeyManager {
  constructor() {
    super(...arguments);
    _SelectionManager_instances.add(this);
    /** @private */
    _SelectionManager_onSelectedItemsChangeCallback.set(this, void 0);
    /** @private */
    _SelectionManager_selectedItems.set(this, new Array());
    /** @private */
    _SelectionManager_multi.set(this, false);
  }
  /** Whether multiple items can be selected. */
  get multi() {
    return __classPrivateFieldGet(this, _SelectionManager_multi, "f");
  }
  set multi(value) {
    __classPrivateFieldSet(this, _SelectionManager_multi, value, "f");
    __classPrivateFieldGet(this, _SelectionManager_instances, "m", _SelectionManager_enforceSingleSelect).call(this, true);
  }
  /** The selected items. */
  get selectedItems() {
    return __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f");
  }
  /**
   * Selects or deselects the item based on the item's checked or selected state.
   * @param {T} item The item whose selection state has changed.
   */
  notifySelectionChange(item) {
    if (this.items.includes(item)) {
      if (isCheckedOrSelected(item)) {
        this.select(item);
      } else {
        this.deselect(item);
      }
    }
  }
  /**
   * Deselects the specified item.
   * @param {T} item The item to deselect.
   */
  deselect(item) {
    if (this.items.includes(item)) {
      if (isCheckedOrSelected(item)) {
        checkOrSelect(item, false);
      }
      const index = __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").indexOf(item);
      if (index >= 0) {
        __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").splice(index, 1);
        __classPrivateFieldGet(this, _SelectionManager_onSelectedItemsChangeCallback, "f")?.call(this);
      }
    }
  }
  /**
   * Updates the selected item.
   * @param {T | null | undefined} item The selected item.
   * @param {boolean} [activate=true] Whether to activate the item.
   */
  select(item, activate = true) {
    if (!item || this.items.includes(item)) {
      if (!this.multi) {
        for (const selected of __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f")) {
          if (selected !== item) {
            checkOrSelect(selected, false);
          }
        }
        __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").length = 0;
      }
      if (item) {
        if (!__classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").includes(item)) {
          __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").push(item);
        }
        if (!isCheckedOrSelected(item)) {
          checkOrSelect(item, true);
        }
      }
      if (activate) {
        this.updateActiveItem(item);
      }
      __classPrivateFieldGet(this, _SelectionManager_onSelectedItemsChangeCallback, "f")?.call(this);
    }
  }
  /** @inheritdoc */
  setItems(items) {
    const {
      added,
      removed
    } = super.setItems(items);
    __classPrivateFieldSet(this, _SelectionManager_selectedItems, __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").filter(x => !removed.includes(x)), "f");
    __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").push(...added.filter(x => isCheckedOrSelected(x)));
    __classPrivateFieldGet(this, _SelectionManager_instances, "m", _SelectionManager_enforceSingleSelect).call(this);
    __classPrivateFieldGet(this, _SelectionManager_onSelectedItemsChangeCallback, "f")?.call(this);
    return {
      added,
      removed
    };
  }
  /**
   * Configures the selection manager with a callback invoked when selected items change.
   * @param {() => void} callback The callback invoked when selected items change.
   * @returns {SelectionManager<T>} The configured selection manager.
   */
  onSelectedItemsChange(callback) {
    __classPrivateFieldSet(this, _SelectionManager_onSelectedItemsChangeCallback, callback, "f");
    return this;
  }
}
_SelectionManager_onSelectedItemsChangeCallback = new WeakMap(), _SelectionManager_selectedItems = new WeakMap(), _SelectionManager_multi = new WeakMap(), _SelectionManager_instances = new WeakSet(), _SelectionManager_enforceSingleSelect = function _SelectionManager_enforceSingleSelect(emit = false) {
  if (!this.multi && __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").length > 1) {
    for (let i = 1; i < __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").length; i++) {
      checkOrSelect(__classPrivateFieldGet(this, _SelectionManager_selectedItems, "f")[i], false);
    }
    __classPrivateFieldGet(this, _SelectionManager_selectedItems, "f").length = 1;
    if (emit) {
      __classPrivateFieldGet(this, _SelectionManager_onSelectedItemsChangeCallback, "f")?.call(this);
    }
  }
};

/**
 * Adapted from Angular Material CDK AriaDescriber
 * Source: https://github.com/angular/components/blob/main/src/cdk/a11y/aria-describer/aria-reference.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
/**
 * Gets a list of IDs referenced by an element for the specified ARIA attribute.
 * @param {Element} element The element from which to get referenced IDs.
 * @param {`aria-${string}`} attribute The ARIA attribute from which to get referenced IDs.
 * @returns {string[]} a list of IDs referenced by `element` for `attribute`.
 */
function getAriaReferenceIds(element, attribute) {
  return element.getAttribute(attribute)?.match(/\S+/g) ?? [];
}
/**
 * Adds an ID to the list of IDs referenced by an element for a given ARIA attribute.
 * @param {Element} element The element to which to add a referenced ID.
 * @param {`aria-${string}`} attribute The ARIA attribute to which to add an ID.
 * @param {string} id The ID to add.
 */
function addAriaReferencedId(element, attribute, id) {
  id = id.trim();
  const ids = getAriaReferenceIds(element, attribute);
  if (!ids.some(existingId => existingId.trim() === id)) {
    ids.push(id);
    element.setAttribute(attribute, ids.join(" "));
  }
}
/**
 * Removes an ID from a list of IDs referenced by an element for the specified ARIA attribute.
 * @param {Element} element The element from which to remove an ID.
 * @param {`aria-${string}`} attribute The ARIA attribute from which to remove an ID.
 * @param {string} id The ID to remove.
 */
function removeAriaReferencedId(element, attribute, id) {
  id = id.trim();
  const ids = getAriaReferenceIds(element, attribute).filter(val => val !== id);
  if (ids.length > 0) {
    element.setAttribute(attribute, ids.join(" "));
  } else {
    element.removeAttribute(attribute);
  }
}

/**
 * Visually hides an element.
 * @param {CSSStyleDeclaration} style The style of the element to visually hide.
 */
function visuallyHide(style) {
  style.position = "absolute";
  style.appearance = "none";
  style.visibility = "hidden";
  style.border = "0";
  style.outline = "0";
  style.overflow = "hidden";
  style.left = "0";
  style.height = "1px";
  style.width = "1px";
  style.margin = "-1px";
  style.padding = "0";
  style.whiteSpace = "nowrap";
}

/**
 * Adapted from Angular Material CDK ARIA Describer
 * Source: https://github.com/angular/components/blob/main/src/cdk/a11y/aria-describer/aria-describer.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _a$2, _M3eAriaDescriber_nextId, _M3eAriaDescriber_messageContainers, _M3eAriaDescriber_createMessageContainer, _M3eAriaDescriber_createMessageElement;
/** Utility for generating visually hidden elements that convey descriptive messages using `aria-describedby`. */
class M3eAriaDescriber {
  /**
   * Adds an `aria-describedby` reference to a hidden element that contains the message.
   * @param {Element} element The element for which to provide a visually hidden description.
   * @param {string} message The message used to describe `element`.
   * @param {string} [role="tooltip"] The ARIA role of the message.
   */
  static describe(element, message, role = "tooltip") {
    if (isServer) {
      return;
    }
    const rootNode = element.getRootNode();
    if (!(rootNode instanceof ShadowRoot || rootNode instanceof Document)) {
      return;
    }
    let container = __classPrivateFieldGet(this, _a$2, "f", _M3eAriaDescriber_messageContainers).get(rootNode);
    if (!container) {
      container = {
        containerElement: __classPrivateFieldGet(this, _a$2, "m", _M3eAriaDescriber_createMessageContainer).call(this),
        messageRegistry: new Map()
      };
      // Append to body if document, otherwise, append as a child of shadow root.
      (rootNode instanceof Document ? rootNode.body : rootNode).appendChild(container.containerElement);
      __classPrivateFieldGet(this, _a$2, "f", _M3eAriaDescriber_messageContainers).set(rootNode, container);
    }
    const key = `${role}:${message}`;
    let entry = container.messageRegistry.get(key);
    if (!entry) {
      entry = {
        messageElement: __classPrivateFieldGet(this, _a$2, "m", _M3eAriaDescriber_createMessageElement).call(this, message, role),
        count: 0
      };
      container.containerElement.appendChild(entry.messageElement);
      container.messageRegistry.set(key, entry);
    }
    entry.count++;
    addAriaReferencedId(element, "aria-describedby", entry.messageElement.id);
  }
  /**
   * Removes an `aria-describedby` reference to a hidden element that contains the message.
   * @param {Element} element The element from which to remove a visually hidden description.
   * @param {string} message The message used to describe `element`.
   * @param {string} [role="tooltip"] The ARIA role of the message.
   */
  static removeDescription(element, message, role = "tooltip") {
    if (isServer) {
      return;
    }
    const rootNode = element.getRootNode();
    const container = __classPrivateFieldGet(this, _a$2, "f", _M3eAriaDescriber_messageContainers).get(rootNode);
    if (!container) {
      return;
    }
    const key = `${role}:${message}`;
    const entry = container.messageRegistry.get(key);
    if (!entry) {
      return;
    }
    entry.count--;
    removeAriaReferencedId(element, "aria-describedby", entry.messageElement.id);
    // If there are no more elements referencing the message, remove it from the DOM.
    if (entry.count <= 0) {
      entry.messageElement.remove();
      container.messageRegistry.delete(key);
    }
    // If there are no more registered messages, remove the container from the DOM.
    if (container.messageRegistry.size == 0) {
      container.containerElement?.remove();
      __classPrivateFieldGet(this, _a$2, "f", _M3eAriaDescriber_messageContainers).delete(rootNode);
    }
  }
}
_a$2 = M3eAriaDescriber, _M3eAriaDescriber_createMessageContainer = function _M3eAriaDescriber_createMessageContainer() {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("m3e-describedby-message-container");
  visuallyHide(messageContainer.style);
  return messageContainer;
}, _M3eAriaDescriber_createMessageElement = function _M3eAriaDescriber_createMessageElement(message, role) {
  var _b, _c;
  const messageElement = document.createElement("span");
  messageElement.id = `m3e-describedby-message-${__classPrivateFieldSet(this, _a$2, (_c = __classPrivateFieldGet(this, _a$2, "f", _M3eAriaDescriber_nextId), _b = _c++, _c), "f", _M3eAriaDescriber_nextId), _b}`;
  messageElement.role = role;
  messageElement.ariaAtomic = "true";
  messageElement.innerText = message.trim();
  return messageElement;
};
/** @private */
_M3eAriaDescriber_nextId = {
  value: 0
};
/** @private */
_M3eAriaDescriber_messageContainers = {
  value: new Map()
};
globalThis.M3eAriaDescriber = M3eAriaDescriber;

var _a$1, _M3eInteractivityChecker_cannotFocusParent, _M3eInteractivityChecker_isVisiblyHidden;
/** Utility for checking the interactivity of an element, such as whether it is focusable. */
class M3eInteractivityChecker {
  /**
   * Determines whether a given element can receive focus.
   * @param {Element} element The element to test.
   * @param {readonly Element[]} [parents = undefined] The known parent elements to test. The default value is `undefined`.
   * @param {boolean} [allowVisiblyHidden=false] Whether to allow visibly hidden elements as focusable.
   * @param {boolean} [allowDisabled=false] Whether to allow disabled elements as focusable.
   * @returns {boolean} Whether `element` can receive focus.
   */
  static isFocusable(element, parents, allowVisiblyHidden = false, allowDisabled = false) {
    const selectors = `:is(button,input,select,textarea,object,:is(a,area)[href],[tabindex]${allowDisabled ? "" : ":not([tabindex='-1'])"},[contenteditable=true])${allowDisabled ? "" : ":not(:disabled,[disabled])"}${allowVisiblyHidden ? "" : ":not([hidden])"}`;
    if (element.matches(selectors)) {
      return !__classPrivateFieldGet(this, _a$1, "m", _M3eInteractivityChecker_isVisiblyHidden).call(this, element, allowVisiblyHidden) && !__classPrivateFieldGet(this, _a$1, "m", _M3eInteractivityChecker_cannotFocusParent).call(this, parents, allowVisiblyHidden);
    }
    if (!element.localName.includes("-") || !element.matches(":not(:disabled,[disabled])") || element.getAttribute("aria-disabled") === "true") {
      return false;
    }
    if (element.shadowRoot?.delegatesFocus) {
      return !__classPrivateFieldGet(this, _a$1, "m", _M3eInteractivityChecker_isVisiblyHidden).call(this, element, allowVisiblyHidden) && !__classPrivateFieldGet(this, _a$1, "m", _M3eInteractivityChecker_cannotFocusParent).call(this, parents, allowVisiblyHidden);
    }
    return false;
  }
  /**
   * Finds interactive elements that descend from the specified element.
   * @param {HTMLElement} element The `HTMLElement` to search.
   * @param {boolean} [allowVisiblyHidden=false] Whether to allow visibly hidden elements as focusable.
   * @returns {HTMLElement[]} The interactive elements that descend from `element`.
   */
  static findInteractiveElements(element, allowVisiblyHidden = false) {
    const elements = new Array();
    const walker = element.ownerDocument.createTreeWalker(element, NodeFilter.SHOW_ELEMENT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const element = walker.currentNode;
      if (this.isFocusable(element, undefined, allowVisiblyHidden, true)) {
        elements.push(element);
      }
    }
    return elements;
  }
}
_a$1 = M3eInteractivityChecker, _M3eInteractivityChecker_cannotFocusParent = function _M3eInteractivityChecker_cannotFocusParent(parents, allowVisiblyHidden = false) {
  return parents?.some(x => x.matches(`:is([aria-hidden='true'],:disabled,[disabled],[inert]${allowVisiblyHidden ? "" : ",[hidden]"})`) || __classPrivateFieldGet(this, _a$1, "m", _M3eInteractivityChecker_isVisiblyHidden).call(this, x, allowVisiblyHidden)) ?? false;
}, _M3eInteractivityChecker_isVisiblyHidden = function _M3eInteractivityChecker_isVisiblyHidden(element, allowVisiblyHidden) {
  if (allowVisiblyHidden) return false;
  const style = getComputedStyle(element);
  return style.display === "none" || style.visibility === "hidden";
};
globalThis.M3eInteractivityChecker = M3eInteractivityChecker;

var _M3eFocusTrapElement_instances, _M3eFocusTrapElement_onFocus, _M3eFocusTrapElement_getFirstAndLastFocusableChild, _M3eFocusTrapElement_walkTree, _M3eFocusTrapElement_walkShadowRoot, _M3eFocusTrapElement_walkSlot;
/**
 * A non-visual element used to trap focus within nested content.
 * @tag m3e-focus-trap
 *
 * @slot - Renders content for which to trap focus.
 *
 * @attr disabled - Disables the focus trap.
 */
let M3eFocusTrapElement = class M3eFocusTrapElement extends Disabled(LitElement) {
  constructor() {
    super(...arguments);
    _M3eFocusTrapElement_instances.add(this);
  }
  /** @inheritdoc */
  render() {
    const trap = html`<div class="trap" .inert="${this.disabled}" tabindex="0" aria-hidden="true" @focus="${__classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_onFocus)}"></div>`;
    return html`${trap}<slot></slot>${trap}`;
  }
};
_M3eFocusTrapElement_instances = new WeakSet();
_M3eFocusTrapElement_onFocus = function _M3eFocusTrapElement_onFocus(e) {
  function matchesRelatedTarget(relatedTarget, test) {
    return relatedTarget === test || relatedTarget instanceof HTMLElement && relatedTarget.shadowRoot !== null && relatedTarget.shadowRoot.contains(test);
  }
  const [first, last] = __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_getFirstAndLastFocusableChild).call(this);
  const isFirst = e?.target === this._firstTrap;
  const fromFirst = matchesRelatedTarget(e.relatedTarget, first);
  const fromLast = matchesRelatedTarget(e.relatedTarget, last);
  const fromOutside = !fromFirst && !fromLast;
  if (!isFirst && fromLast || isFirst && fromOutside) {
    first?.focus();
    return;
  }
  if (isFirst && fromFirst || !isFirst && fromOutside) {
    last?.focus();
  }
};
_M3eFocusTrapElement_getFirstAndLastFocusableChild = function _M3eFocusTrapElement_getFirstAndLastFocusableChild() {
  let first = null;
  let last = null;
  __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkTree).call(this, this, [], (element, parents) => {
    if (M3eInteractivityChecker.isFocusable(element, parents) && element instanceof HTMLElement && element.tabIndex >= 0) {
      first = first ?? element;
      last = element;
    }
  });
  return [first, last];
};
_M3eFocusTrapElement_walkTree = function _M3eFocusTrapElement_walkTree(root, parents, callback) {
  parents = [...parents, root];
  for (const node of root.childNodes) {
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const element = node;
    callback(element, parents);
    if (element.shadowRoot) {
      __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkShadowRoot).call(this, element, parents, callback);
    } else if (element instanceof HTMLSlotElement) {
      __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkSlot).call(this, element, parents, callback);
    } else if (element.hasChildNodes()) {
      __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkTree).call(this, element, parents, callback);
    }
  }
};
_M3eFocusTrapElement_walkShadowRoot = function _M3eFocusTrapElement_walkShadowRoot(root, parents, callback) {
  for (const node of root.shadowRoot?.childNodes ?? []) {
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const element = node;
    callback(element, parents);
    if (!element.hasChildNodes()) continue;
    __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkTree).call(this, element, parents, callback);
  }
};
_M3eFocusTrapElement_walkSlot = function _M3eFocusTrapElement_walkSlot(slot, parents, callback) {
  parents = [...parents, slot];
  let childNodes = slot.assignedElements();
  if (childNodes.length == 0 && slot.hasChildNodes()) {
    childNodes = slot.childNodes;
  }
  for (const node of childNodes) {
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const element = node;
    if (element instanceof HTMLSlotElement) {
      __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkSlot).call(this, element, parents, callback);
      continue;
    }
    callback(element, parents);
    if (!element.hasChildNodes()) continue;
    __classPrivateFieldGet(this, _M3eFocusTrapElement_instances, "m", _M3eFocusTrapElement_walkTree).call(this, element, parents, callback);
  }
};
/** The styles of the element. */
M3eFocusTrapElement.styles = css`:host { display: contents; } .trap { outline: none; }`;
__decorate([query(".trap")], M3eFocusTrapElement.prototype, "_firstTrap", void 0);
M3eFocusTrapElement = __decorate([customElement("m3e-focus-trap")], M3eFocusTrapElement);

/**
 * Adapted from Angular Material CDK Live Announcer
 * Source: https://github.com/angular/components/blob/main/src/cdk/a11y/live-announcer/live-announcer.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
var _a, _M3eLiveAnnouncer_nextId, _M3eLiveAnnouncer_liveElement, _M3eLiveAnnouncer_previousTimeout, _M3eLiveAnnouncer_currentPromise, _M3eLiveAnnouncer_currentResolve, _M3eLiveAnnouncer_createLiveElement;
/** Utility for announcing messages to screen readers. */
class M3eLiveAnnouncer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static announce(message, ...args) {
    if (isServer) {
      return Promise.resolve();
    }
    __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement) ?? __classPrivateFieldGet(this, _a, "m", _M3eLiveAnnouncer_createLiveElement).call(this), "f", _M3eLiveAnnouncer_liveElement);
    let politeness;
    let duration;
    if (args.length === 1 && typeof args[0] === "number") {
      duration = args[0];
    } else {
      [politeness, duration] = args;
    }
    this.clear();
    clearTimeout(__classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_previousTimeout));
    __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement).setAttribute("aria-live", politeness ?? "polite");
    for (const modal of document.querySelectorAll("m3e-dialog")) {
      addAriaReferencedId(modal, "aria-owns", __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement).id);
    }
    __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_currentPromise) ?? new Promise(resolve => __classPrivateFieldSet(this, _a, resolve, "f", _M3eLiveAnnouncer_currentResolve)), "f", _M3eLiveAnnouncer_currentPromise);
    clearTimeout(__classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_previousTimeout));
    __classPrivateFieldSet(this, _a, setTimeout(() => {
      if (!__classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement)) {
        return;
      }
      __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement).textContent = message;
      if (duration !== undefined) {
        __classPrivateFieldSet(this, _a, setTimeout(() => this.clear(), duration), "f", _M3eLiveAnnouncer_previousTimeout);
      }
      __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_currentResolve)?.call(this);
      __classPrivateFieldSet(this, _a, __classPrivateFieldSet(this, _a, undefined, "f", _M3eLiveAnnouncer_currentResolve), "f", _M3eLiveAnnouncer_currentPromise);
    }, 100), "f", _M3eLiveAnnouncer_previousTimeout);
    return __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_currentPromise);
  }
  /**
   * Clears the current text from the announcer element. Can be used to prevent
   * screen readers from reading the text out again while the user is going
   * through page landmarks.
   */
  static clear() {
    if (__classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement)) {
      __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_liveElement).textContent = "";
    }
  }
}
_a = M3eLiveAnnouncer, _M3eLiveAnnouncer_createLiveElement = function _M3eLiveAnnouncer_createLiveElement() {
  var _b, _c;
  const prev = document.getElementsByClassName("m3e-live-announcer");
  for (let i = 0; i < prev.length; i++) {
    prev[i].remove();
  }
  const liveAnnouncer = document.createElement("div");
  liveAnnouncer.classList.add("m3e-live-announcer");
  liveAnnouncer.setAttribute("aria-atomic", "true");
  liveAnnouncer.setAttribute("aria-live", "polite");
  liveAnnouncer.id = `m3e-live-announcer-${__classPrivateFieldSet(this, _a, (_c = __classPrivateFieldGet(this, _a, "f", _M3eLiveAnnouncer_nextId), _b = _c++, _c), "f", _M3eLiveAnnouncer_nextId), _b}`;
  visuallyHide(liveAnnouncer.style);
  document.body.append(liveAnnouncer);
  return liveAnnouncer;
};
/** @private */
_M3eLiveAnnouncer_nextId = {
  value: 0
};
/** @private */
_M3eLiveAnnouncer_liveElement = {
  value: void 0
};
/** @private */
_M3eLiveAnnouncer_previousTimeout = {
  value: void 0
};
/** @private */
_M3eLiveAnnouncer_currentPromise = {
  value: void 0
};
/** @private */
_M3eLiveAnnouncer_currentResolve = {
  value: void 0
};
globalThis.M3eLiveAnnouncer = M3eLiveAnnouncer;

export { FocusKeyManager, KeyCode, ListKeyManager, ListManager, M3eAriaDescriber, M3eFocusTrapElement, M3eInteractivityChecker, M3eLiveAnnouncer, ModifierKeys, RadioKeyManager, RovingTabIndexManager, SelectionManager, Typeahead, addAriaReferencedId, getAriaReferenceIds, getKeyCode, hasModifierKey, isModifierAllowed, isTypeaheadItem, removeAriaReferencedId, selectionManager, typeaheadLabel };
//# sourceMappingURL=LiveAnnouncer.js.map
