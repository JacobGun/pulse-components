/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Determines whether a slot has any assigned nodes.
 * @param {HTMLSlotElement} slot The slot to test.
 * @returns {boolean} Whether `slot` has any assigned nodes.
 */
function hasAssignedNodes(slot) {
  return slot.assignedNodes({
    flatten: true
  }).length > 0;
}

export { hasAssignedNodes };
//# sourceMappingURL=hasAssignedNodes.js.map
