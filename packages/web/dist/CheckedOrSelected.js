/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { isCheckedMixin } from './TextOverflowElement.js';
import { isSelectedMixin } from './Selected.js';

/**
 * Determines whether a value is a `CheckedOrSelectedMixin`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `CheckedOrSelectedMixin`.
 */
function isCheckedOrSelectedMixin(value) {
  return isCheckedMixin(value) || isSelectedMixin(value);
}
/**
 * Determines whether the state of an element is checked or selected.
 * @param {CheckedOrSelectedMixin} element The element to test.
 * @return {boolean} Whether `element` is checked or selected.
 */
function isCheckedOrSelected(element) {
  return isCheckedMixin(element) && element.checked || isSelectedMixin(element) && element.selected;
}
/**
 * Sets the checked or selected state of an element.
 * @param {CheckedOrSelectedMixin} element The element for which to set the checked or selected state.
 * @param {boolean} checkedOrSelected The checked or selected state.
 */
function checkOrSelect(element, checkedOrSelected) {
  if (isCheckedMixin(element)) {
    element.checked = checkedOrSelected;
  } else {
    element.selected = checkedOrSelected;
  }
}

export { checkOrSelect, isCheckedOrSelected, isCheckedOrSelectedMixin };
//# sourceMappingURL=CheckedOrSelected.js.map
