/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { customElement, ActionElementBase, ReconnectedCallback, SuppressInitialAnimation, AttachInternals, ScrollLockController, InertController, ResizeController, setCustomState, hasCustomState, prefersReducedMotion, DesignToken, HtmlFor } from './TextOverflowElement.js';
import { property } from 'lit/decorators.js';
import { LitElement, nothing, html, css, unsafeCSS } from 'lit';
import 'lit/directives/if-defined.js';
import { spaceSeparatedStringConverter } from './spaceSeparatedStringConverter.js';
import { computeCssSize } from './computeCssSize.js';
import { focusWhenReady } from './focusWhenReady.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { registerStyleSheet } from './registerStyleSheet.js';
import { M3eInteractivityChecker, isModifierAllowed, addAriaReferencedId, removeAriaReferencedId } from './LiveAnnouncer.js';
import './SwipeGestureElement.js';
import './TapGestureElement.js';

/**
 * An element, nested within a clickable element, used to close a parenting bottom sheet.
 * @tag m3e-bottom-sheet-action
 *
 * @slot - Renders the content of the action.
 */
let M3eBottomSheetActionElement = class M3eBottomSheetActionElement extends ActionElementBase {
  /** @inheritdoc */
  _onClick() {
    this.closest("m3e-bottom-sheet")?.hide();
  }
};
M3eBottomSheetActionElement = __decorate([customElement("m3e-bottom-sheet-action")], M3eBottomSheetActionElement);

var _M3eBottomSheetElement_instances, _M3eBottomSheetElement_documentClickHandler, _M3eBottomSheetElement_documentKeyDownHandler, _M3eBottomSheetElement_windowResizeHandler, _M3eBottomSheetElement_headerSwipeInputFilter, _M3eBottomSheetElement_scrollLockController, _M3eBottomSheetElement_inertController, _M3eBottomSheetElement_resizeController, _M3eBottomSheetElement_trigger, _M3eBottomSheetElement_dragState, _M3eBottomSheetElement_activeDetent, _M3eBottomSheetElement_requestDetent, _M3eBottomSheetElement_cachedContentHeight, _M3eBottomSheetElement_cachedHeaderHeight, _M3eBottomSheetElement_snapAnimation, _M3eBottomSheetElement_initialize, _M3eBottomSheetElement_initializeSwipeGesture, _M3eBottomSheetElement_handleHeaderSlotChange, _M3eBottomSheetElement_handleHandleTapGesture, _M3eBottomSheetElement_handleSwipeGesture, _M3eBottomSheetElement_updateHeaderCursor, _M3eBottomSheetElement_handleDocumentClick, _M3eBottomSheetElement_handleDocumentKeyDown, _M3eBottomSheetElement_handleWindowResize, _M3eBottomSheetElement_closeModal, _M3eBottomSheetElement_handleDragHandleKeyDown, _M3eBottomSheetElement_getNextHigherDetent, _M3eBottomSheetElement_getNextLowerDetent, _M3eBottomSheetElement_getClosestDetent, _M3eBottomSheetElement_computeDetentHeight, _M3eBottomSheetElement_computeMaxHeight, _M3eBottomSheetElement_computeMinHeight, _M3eBottomSheetElement_computePeekHeight, _M3eBottomSheetElement_computeFitHeight, _M3eBottomSheetElement_handleSectionResize, _M3eBottomSheetElement_snapToDetent, _M3eBottomSheetElement_snapToHeight, _M3eBottomSheetElement_updateHeight;
var M3eBottomSheetElement_1;
/**
 * A sheet used to show secondary content anchored to the bottom of the screen.
 *
 * @description
 * The `m3e-bottom-sheet` component implements a Material 3 bottom sheet with
 * gesture‑driven resizing, detent snapping, and adaptive motion. It behaves as
 * a heavy surface: transitions use non‑bouncy, decelerating motion.
 *
 * The sheet supports direct manipulation through vertical drag gestures.
 * Movement below an 8px threshold is ignored to ensure reliable tap‑to‑cycle
 * behavior on the handle. Once activated, dragging updates the sheet height
 * with friction near the minimum height to prevent abrupt collapse.
 *
 * When detents are defined, the sheet snaps to the nearest detent on release.
 * If hideable, downward gestures may dismiss the sheet using either velocity
 * or a small distance threshold below the collapsed detent. When no detents
 * are present, the sheet behaves as a simple open/hidden surface with a
 * bottom‑measured hide threshold.
 *
 * @example
 * The following example shows a modal bottom sheet with a drag handle,
 * three detents (`fit`, `half`, and `full`), and an action list. The sheet
 * is opened using a dedicated `m3e-bottom-sheet-trigger` associated by ID.
 * ```html
 * <m3e-button>
 *   <m3e-bottom-sheet-trigger for="bottomSheet">
 *     Open Bottom sheet
 *   </m3e-bottom-sheet-trigger>
 * </m3e-button>
 *
 * <m3e-bottom-sheet id="bottomSheet" modal handle hideable detents="fit half full">
 *   <m3e-action-list>
 *     <m3e-list-action autofocus>
 *       <m3e-bottom-sheet-action>Google Keep</m3e-bottom-sheet-action>
 *       <span slot="supporting-text">Add to a note</span>
 *     </m3e-list-action>
 *     <m3e-list-action>
 *       <m3e-bottom-sheet-action>Google Docs</m3e-bottom-sheet-action>
 *       <span slot="supporting-text">Embed in a document</span>
 *     </m3e-list-action>
 *   </m3e-action-list>
 * </m3e-bottom-sheet>
 * ```
 *
 * @tag m3e-bottom-sheet
 *
 * @slot - Renders the content of the sheet.
 * @slot header - Renders the header of the sheet.
 *
 * @attr detent - The zero‑based index of the detent the sheet should open to.
 * @attr detents - Detents (discrete height states) the sheet can snap to.
 * @attr handle - Whether to display a drag handle and enable the top region of the sheet as a gesture surface for dragging between detents.
 * @attr handle-label - The accessible label given to the drag handle.
 * @attr hideable - Whether the bottom sheet can hide when its swiped down.
 * @attr hide-friction - The friction coefficient to hide the sheet.
 * @attr modal - Whether the bottom sheet behaves as modal.
 * @attr open - Whether the bottom sheet is open.
 * @attr overshoot-limit - A fractional value, between 0 and 100, indicating the maximum visual overshoot allowed when dragging past the minimum or maximum size.
 *
 * @fires opening - Dispatched when the sheet begins to open.
 * @fires opened - Dispatched when the sheet has opened.
 * @fires cancel - Dispatched when the sheet is cancelled.
 * @fires closing - Dispatched when the sheet begins to close.
 * @fires closed - Dispatched when the sheet has closed.
 *
 * @cssprop --m3e-bottom-sheet-width - The width of the sheet.
 * @cssprop --m3e-bottom-sheet-max-width - The maximum width of the sheet.
 * @cssprop --m3e-bottom-sheet-container-color - The background color of the sheet container.
 * @cssprop --m3e-bottom-sheet-elevation - The elevation level when not modal.
 * @cssprop --m3e-bottom-sheet-modal-elevation - The elevation level when modal.
 * @cssprop --m3e-bottom-sheet-full-elevation - The elevation level when full height.
 * @cssprop --m3e-bottom-sheet-z-index - The z-index of the non-modal sheet.
 * @cssprop --m3e-bottom-sheet-minimized-container-shape - The border radius when minimized.
 * @cssprop --m3e-bottom-sheet-container-shape - The border radius of the sheet container.
 * @cssprop --m3e-bottom-sheet-full-container-shape - The border radius when full height.
 * @cssprop --m3e-bottom-sheet-scrim-color - The color of the scrim overlay.
 * @cssprop --m3e-bottom-sheet-scrim-opacity - The opacity of the scrim overlay.
 * @cssprop --m3e-bottom-sheet-peek-height - The visible height when minimized.
 * @cssprop --m3e-bottom-sheet-compact-top-space - The top space in compact mode.
 * @cssprop --m3e-bottom-sheet-top-space - The top space in standard mode.
 * @cssprop --m3e-bottom-sheet-padding-block - The vertical padding.
 * @cssprop --m3e-bottom-sheet-padding-inline - The horizontal padding.
 * @cssprop --m3e-bottom-sheet-handle-container-height - The height of the drag handle container.
 * @cssprop --m3e-bottom-sheet-handle-width - The width of the drag handle.
 * @cssprop --m3e-bottom-sheet-handle-height - The height of the drag handle.
 * @cssprop --m3e-bottom-sheet-handle-shape - The border radius of the handle.
 * @cssprop --m3e-bottom-sheet-handle-color - The color of the drag handle.
 * @cssprop --m3e-bottom-sheet-handle-focus-ring-offset - The offset of the focus ring around the handle.
 * @cssprop --m3e-bottom-sheet-color - The foreground (text) color of the sheet.
 * @cssprop --m3e-bottom-sheet-content-font-size - Font size for the sheet content.
 * @cssprop --m3e-bottom-sheet-content-font-weight - Font weight for the sheet content.
 * @cssprop --m3e-bottom-sheet-content-line-height - Line height for the sheet content.
 * @cssprop --m3e-bottom-sheet-content-tracking - Letter spacing (tracking) for the sheet content.
 * @cssprop --m3e-bottom-sheet-header-font-size - Font size for the sheet header.
 * @cssprop --m3e-bottom-sheet-header-font-weight - Font weight for the sheet header.
 * @cssprop --m3e-bottom-sheet-header-line-height - Line height for the sheet header.
 * @cssprop --m3e-bottom-sheet-header-tracking - Letter spacing (tracking) for the sheet header.
 */
let M3eBottomSheetElement = M3eBottomSheetElement_1 = class M3eBottomSheetElement extends ReconnectedCallback(SuppressInitialAnimation(AttachInternals(LitElement))) {
  constructor() {
    super(...arguments);
    _M3eBottomSheetElement_instances.add(this);
    /** @private */
    _M3eBottomSheetElement_documentClickHandler.set(this, e => __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleDocumentClick).call(this, e));
    /** @private */
    _M3eBottomSheetElement_documentKeyDownHandler.set(this, e => __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleDocumentKeyDown).call(this, e));
    /** @private */
    _M3eBottomSheetElement_windowResizeHandler.set(this, () => __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleWindowResize).call(this));
    /** @private */
    _M3eBottomSheetElement_headerSwipeInputFilter.set(this, input => !(input.target instanceof HTMLElement && (input.target.classList.contains("handle-touch") || M3eInteractivityChecker.isFocusable(input.target))));
    /** @private */
    _M3eBottomSheetElement_scrollLockController.set(this, new ScrollLockController(this));
    /** @private */
    _M3eBottomSheetElement_inertController.set(this, new InertController(this));
    /** @private */
    _M3eBottomSheetElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      skipInitial: true,
      callback: x => __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleSectionResize).call(this, x)
    }));
    /** @private */
    _M3eBottomSheetElement_trigger.set(this, null);
    /** @private */
    _M3eBottomSheetElement_dragState.set(this, void 0);
    /** @private */
    _M3eBottomSheetElement_activeDetent.set(this, 0);
    /** @private */
    _M3eBottomSheetElement_requestDetent.set(this, void 0);
    /** @private */
    _M3eBottomSheetElement_cachedContentHeight.set(this, 0);
    /** @private */
    _M3eBottomSheetElement_cachedHeaderHeight.set(this, 0);
    /** @private */
    _M3eBottomSheetElement_snapAnimation.set(this, void 0);
    /**
     * Whether the bottom sheet behaves as modal.
     * @default false
     */
    this.modal = false;
    /**
     * Whether the bottom sheet is open.
     * @default false
     */
    this.open = false;
    /**
     * Whether to display a drag handle and enable the top region of the sheet as a gesture
     * surface for dragging between detents.
     * @default false
     */
    this.handle = false;
    /**
     * The accessible label given to the drag handle.
     * @default "Drag handle"
     */
    this.handleLabel = "Drag handle";
    /**
     * Detents (discrete height states) the sheet can snap to.
     * @default []
     */
    this.detents = [];
    /**
     * The zero‑based index of the detent the sheet should open to.
     * @default 0
     */
    this.detent = 0;
    /**
     * Whether the bottom sheet can hide when its swiped down.
     * @default false
     */
    this.hideable = false;
    /**
     * The friction coefficient to hide the sheet.
     * @default 0.5
     */
    this.hideFriction = 0.5;
    /**
     * A fractional value, between 0 and 100, indicating the maximum visual overshoot allowed when dragging past the minimum or maximum size.
     * @default 4
     */
    this.overshootLimit = 4;
  }
  /**
   * Shows the sheet.
   * @param {number} detent The zero‑based index of the detent the sheet should open to.
   */
  show(detent = this.detent) {
    if (!this.open) {
      __classPrivateFieldSet(this, _M3eBottomSheetElement_requestDetent, detent, "f");
      this.open = true;
    } else if (detent !== undefined && __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f") !== detent) {
      __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToDetent).call(this, detent);
    }
  }
  /** Hides the sheet. */
  hide() {
    this.open = false;
  }
  /**
   * Toggles the opened state of the sheet.
   * @param {number} detent The zero‑based index of the detent the sheet should open to.
   */
  toggle(detent) {
    if (this.open) {
      this.hide();
    } else {
      this.show(detent);
    }
  }
  /** Moves the sheet to the next detent. */
  cycle() {
    var _a;
    if (!this.open) {
      this.show();
    } else if (this.detents.length > 0) {
      if (__classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f") < this.detents.length - 1) {
        __classPrivateFieldSet(this, _M3eBottomSheetElement_activeDetent, (_a = __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f"), _a++, _a), "f");
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToDetent).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f"));
      } else if (this.hideable) {
        this.hide();
      }
    } else {
      this.hide();
    }
  }
  /** @inheritdoc */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("modal")) {
      this.role = this.modal ? "dialog" : "region";
      this.ariaModal = this.modal ? "true" : null;
      this.popover = this.modal ? "manual" : null;
    }
  }
  /** @inheritdoc */
  reconnectedCallback() {
    super.reconnectedCallback();
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_initialize).call(this);
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_initialize).call(this);
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("handle")) {
      // Ensure handle swipe gesture is initialized.
      if (this.handle) {
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_initializeSwipeGesture).call(this, "handle");
      }
    }
    if (_changedProperties.has("open")) {
      if (this.open) {
        if (!this.dispatchEvent(new Event("opening", {
          cancelable: true
        }))) {
          this.open = false;
          return;
        }
        // Only one sheet can be open at a time.
        if (M3eBottomSheetElement_1.__openSheet !== this) {
          M3eBottomSheetElement_1.__openSheet?.hide();
        }
        M3eBottomSheetElement_1.__openSheet = this;
        this.inert = false;
        window.addEventListener("resize", __classPrivateFieldGet(this, _M3eBottomSheetElement_windowResizeHandler, "f"));
        // If there are detents (regardless of handle) open to the requested, default (or first) detent.
        // Otherwise, open to fit unless its greater than half.
        if (this.detents.length > 0) {
          __classPrivateFieldSet(this, _M3eBottomSheetElement_activeDetent, Math.min(Math.max(0, __classPrivateFieldGet(this, _M3eBottomSheetElement_requestDetent, "f") ?? this.detent), this.detents.length - 1), "f");
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, this.detents[__classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")]));
        } else {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, Math.min(__classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, "fit"), __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, "half")));
        }
        __classPrivateFieldSet(this, _M3eBottomSheetElement_requestDetent, undefined, "f");
      } else {
        if (!this.dispatchEvent(new Event("closing", {
          cancelable: true
        }))) {
          this.open = true;
          return;
        }
        // The following ensures layout is stable so that first tab isn't "skipped"
        requestAnimationFrame(() => this.inert = true);
        window.removeEventListener("resize", __classPrivateFieldGet(this, _M3eBottomSheetElement_windowResizeHandler, "f"));
        if (M3eBottomSheetElement_1.__openSheet === this) {
          M3eBottomSheetElement_1.__openSheet = undefined;
        }
      }
      if (this.modal) {
        if (this.open) {
          __classPrivateFieldSet(this, _M3eBottomSheetElement_trigger, document.activeElement, "f");
          __classPrivateFieldGet(this, _M3eBottomSheetElement_inertController, "f").lock();
          __classPrivateFieldGet(this, _M3eBottomSheetElement_scrollLockController, "f").lock();
          this.showPopover();
          requestAnimationFrame(() => {
            document.addEventListener("click", __classPrivateFieldGet(this, _M3eBottomSheetElement_documentClickHandler, "f"));
            document.addEventListener("keydown", __classPrivateFieldGet(this, _M3eBottomSheetElement_documentKeyDownHandler, "f"));
          });
          let focusable = this.querySelector("[autofocus]");
          if (!focusable || !M3eInteractivityChecker.isFocusable(focusable)) {
            focusable = this.shadowRoot?.querySelector(".handle");
          }
          if (focusable) {
            focusWhenReady(focusable);
          }
        } else {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_closeModal).call(this);
        }
      }
      this.dispatchEvent(new Event(this.open ? "opened" : "closed"));
    }
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-focus-trap ?disabled="${!this.modal}"><div class="base"><m3e-elevation class="elevation"></m3e-elevation><div id="header" class="header">${this.handle ? html`<div class="handle-row"><div id="handle" class="handle" role="button" aria-label="${this.handleLabel}" tabindex="0" @keydown="${__classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleDragHandleKeyDown)}"><m3e-focus-ring class="focus-ring" for="handle"></m3e-focus-ring><div class="handle-touch" aria-hidden="true"></div></div></div><m3e-tap-gesture for="handle" @gesture="${__classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleHandleTapGesture)}"></m3e-tap-gesture><m3e-swipe-gesture for="handle" @gesture="${__classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleSwipeGesture)}"></m3e-swipe-gesture>` : nothing}<slot name="header" @slotchange="${__classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleHeaderSlotChange)}"></slot></div><m3e-swipe-gesture for="header" @gesture="${__classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_handleSwipeGesture)}"></m3e-swipe-gesture><div class="body"><div class="content"><slot></slot></div></div></div></m3e-focus-trap>`;
  }
};
_M3eBottomSheetElement_documentClickHandler = new WeakMap();
_M3eBottomSheetElement_documentKeyDownHandler = new WeakMap();
_M3eBottomSheetElement_windowResizeHandler = new WeakMap();
_M3eBottomSheetElement_headerSwipeInputFilter = new WeakMap();
_M3eBottomSheetElement_scrollLockController = new WeakMap();
_M3eBottomSheetElement_inertController = new WeakMap();
_M3eBottomSheetElement_resizeController = new WeakMap();
_M3eBottomSheetElement_trigger = new WeakMap();
_M3eBottomSheetElement_dragState = new WeakMap();
_M3eBottomSheetElement_activeDetent = new WeakMap();
_M3eBottomSheetElement_requestDetent = new WeakMap();
_M3eBottomSheetElement_cachedContentHeight = new WeakMap();
_M3eBottomSheetElement_cachedHeaderHeight = new WeakMap();
_M3eBottomSheetElement_snapAnimation = new WeakMap();
_M3eBottomSheetElement_instances = new WeakSet();
_M3eBottomSheetElement_initialize = function _M3eBottomSheetElement_initialize() {
  const content = this.shadowRoot?.querySelector(".content");
  if (content) {
    __classPrivateFieldSet(this, _M3eBottomSheetElement_cachedContentHeight, content.clientHeight, "f");
    __classPrivateFieldGet(this, _M3eBottomSheetElement_resizeController, "f").observe(content);
  }
  const header = this.shadowRoot?.querySelector(".header");
  if (header) {
    __classPrivateFieldSet(this, _M3eBottomSheetElement_cachedHeaderHeight, header.clientHeight, "f");
    __classPrivateFieldGet(this, _M3eBottomSheetElement_resizeController, "f").observe(header);
  }
  __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_initializeSwipeGesture).call(this, "header");
  __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_initializeSwipeGesture).call(this, "handle");
};
_M3eBottomSheetElement_initializeSwipeGesture = function _M3eBottomSheetElement_initializeSwipeGesture(id) {
  const swipeGesture = this.shadowRoot?.querySelector(`m3e-swipe-gesture[for='${id}']`);
  if (swipeGesture) {
    if (id === "header") {
      swipeGesture.inputFilter = __classPrivateFieldGet(this, _M3eBottomSheetElement_headerSwipeInputFilter, "f");
    }
    swipeGesture.startThreshold = 0;
    swipeGesture.directions = ["up", "down"];
  }
};
_M3eBottomSheetElement_handleHeaderSlotChange = function _M3eBottomSheetElement_handleHeaderSlotChange(e) {
  setCustomState(this, "--with-header", hasAssignedNodes(e.target));
};
_M3eBottomSheetElement_handleHandleTapGesture = function _M3eBottomSheetElement_handleHandleTapGesture(e) {
  if (e.detail.phase === "end") {
    this.cycle();
  }
};
_M3eBottomSheetElement_handleSwipeGesture = function _M3eBottomSheetElement_handleSwipeGesture(e) {
  switch (e.detail.phase) {
    case "start":
      {
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeaderCursor).call(this, "grabbing");
        const maxHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this);
        const effectiveMaxHeight = this.detents.length > 0 ? Math.max(...this.detents.map(x => __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, x))) : maxHeight;
        __classPrivateFieldSet(this, _M3eBottomSheetElement_dragState, {
          startHeight: this.clientHeight,
          effectiveMaxHeight,
          maxHeight,
          minHeight: __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMinHeight).call(this)
        }, "f");
      }
      break;
    case "update":
      {
        if (!__classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f")) break;
        let newHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").startHeight - e.detail.translationY;
        if (newHeight < __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight) {
          if (this.hideable) {
            const overshoot = (__classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight - newHeight) * this.hideFriction;
            newHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight - overshoot;
          } else {
            const overshoot = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight - newHeight;
            const overshootLimit = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").maxHeight * (this.overshootLimit / 100);
            const compressed = overshootLimit * overshoot / (overshoot + overshootLimit);
            newHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight - compressed;
          }
        } else if (newHeight > __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").effectiveMaxHeight) {
          const overshoot = newHeight - __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").effectiveMaxHeight;
          const overshootLimit = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").maxHeight * (this.overshootLimit / 100);
          const compressed = overshootLimit * overshoot / (overshoot + overshootLimit);
          newHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").effectiveMaxHeight + compressed;
        }
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, newHeight);
      }
      break;
    case "cancel":
      {
        if (!__classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f")) return;
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeaderCursor).call(this, "");
        const hideDistanceThreshold = 20;
        if (this.hideable) {
          const collapsed = __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight;
          if (this.clientHeight < collapsed - hideDistanceThreshold) {
            this.hide();
            return;
          }
        }
        if (this.detents.length > 0) {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToDetent).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_getClosestDetent).call(this));
        } else if (this.clientHeight < __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight) {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").minHeight);
        } else if (this.clientHeight > __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").effectiveMaxHeight) {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f").effectiveMaxHeight);
        }
        __classPrivateFieldSet(this, _M3eBottomSheetElement_dragState, undefined, "f");
      }
      break;
    case "end":
      if (!__classPrivateFieldGet(this, _M3eBottomSheetElement_dragState, "f")) return;
      __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeaderCursor).call(this, "");
      switch (e.detail.direction) {
        case "up":
          if (this.detents.length > 0) {
            const nextDetent = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_getNextHigherDetent).call(this);
            if (nextDetent !== __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")) {
              __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToDetent).call(this, nextDetent);
            }
          } else {
            __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, "full"));
          }
          break;
        case "down":
          if (this.hideable) {
            if (this.dispatchEvent(new Event("cancel", {
              cancelable: true
            }))) {
              this.hide();
            }
          }
          break;
      }
      __classPrivateFieldSet(this, _M3eBottomSheetElement_dragState, undefined, "f");
      break;
  }
};
_M3eBottomSheetElement_updateHeaderCursor = function _M3eBottomSheetElement_updateHeaderCursor(cursor) {
  const header = this.shadowRoot?.querySelector(".header");
  if (header) {
    header.style.cursor = cursor;
  }
};
_M3eBottomSheetElement_handleDocumentClick = function _M3eBottomSheetElement_handleDocumentClick(e) {
  if (this.open && this.modal && !e.composedPath().includes(this) && this.dispatchEvent(new Event("cancel", {
    cancelable: true
  }))) {
    this.hide();
  }
};
_M3eBottomSheetElement_handleDocumentKeyDown = function _M3eBottomSheetElement_handleDocumentKeyDown(e) {
  if (this.open && this.modal && e.key === "Escape" && !e.shiftKey && !e.ctrlKey) {
    e.preventDefault();
    if (this.dispatchEvent(new Event("cancel", {
      cancelable: true
    }))) {
      this.hide();
    }
  }
};
_M3eBottomSheetElement_handleWindowResize = function _M3eBottomSheetElement_handleWindowResize() {
  if (this.detents.length > 0 && this.detents[__classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")] === "half") {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, "half"));
    return;
  }
  const maxHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this);
  if (hasCustomState(this, "--full")) {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, maxHeight);
  } else if (this.clientHeight > maxHeight) {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, maxHeight);
  }
};
_M3eBottomSheetElement_closeModal = /** @private */
async function _M3eBottomSheetElement_closeModal() {
  if (__classPrivateFieldGet(this, _M3eBottomSheetElement_snapAnimation, "f")) {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, this.clientHeight);
    __classPrivateFieldGet(this, _M3eBottomSheetElement_snapAnimation, "f").cancel();
    __classPrivateFieldSet(this, _M3eBottomSheetElement_snapAnimation, undefined, "f");
  }
  this.hidePopover();
  await Promise.allSettled(this.getAnimations().map(animation => animation.finished));
  if (this.open) return;
  __classPrivateFieldGet(this, _M3eBottomSheetElement_inertController, "f").unlock();
  __classPrivateFieldGet(this, _M3eBottomSheetElement_scrollLockController, "f").unlock();
  document.removeEventListener("click", __classPrivateFieldGet(this, _M3eBottomSheetElement_documentClickHandler, "f"));
  document.removeEventListener("keydown", __classPrivateFieldGet(this, _M3eBottomSheetElement_documentKeyDownHandler, "f"));
  if (__classPrivateFieldGet(this, _M3eBottomSheetElement_trigger, "f") instanceof HTMLElement) {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_trigger, "f").focus();
  }
  __classPrivateFieldSet(this, _M3eBottomSheetElement_trigger, null, "f");
};
_M3eBottomSheetElement_handleDragHandleKeyDown = function _M3eBottomSheetElement_handleDragHandleKeyDown(e) {
  if (e.defaultPrevented || !isModifierAllowed(e)) return;
  switch (e.key) {
    case "Up":
    case "ArrowUp":
      e.preventDefault();
      if (this.detents.length > 0) {
        const nextDetent = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_getNextHigherDetent).call(this);
        if (nextDetent !== __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")) {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToDetent).call(this, nextDetent);
        }
      } else {
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, "full"));
      }
      break;
    case "Down":
    case "ArrowDown":
      e.preventDefault();
      if (this.detents.length > 0) {
        const nextDetent = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_getNextLowerDetent).call(this);
        if (nextDetent !== __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")) {
          __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToDetent).call(this, nextDetent);
        } else if (this.hideable) {
          this.hide();
        }
      } else if (this.hideable) {
        this.hide();
      }
      break;
  }
};
_M3eBottomSheetElement_getNextHigherDetent = function _M3eBottomSheetElement_getNextHigherDetent() {
  const currentHeight = this.clientHeight;
  let nextHeight = Infinity;
  let nextDetent = __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f");
  for (let i = 0; i < this.detents.length; i++) {
    if (i === __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")) continue;
    const detentHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, this.detents[i]);
    if (detentHeight > currentHeight && detentHeight < nextHeight) {
      nextHeight = detentHeight;
      nextDetent = i;
    }
  }
  return nextDetent;
};
_M3eBottomSheetElement_getNextLowerDetent = function _M3eBottomSheetElement_getNextLowerDetent() {
  const currentHeight = this.clientHeight;
  let nextHeight = -Infinity;
  let nextDetent = __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f");
  for (let i = 0; i < this.detents.length; i++) {
    if (i === __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")) continue;
    const detentHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, this.detents[i]);
    if (detentHeight < currentHeight && detentHeight > nextHeight) {
      nextHeight = detentHeight;
      nextDetent = i;
    }
  }
  return nextDetent;
};
_M3eBottomSheetElement_getClosestDetent = function _M3eBottomSheetElement_getClosestDetent() {
  const currentHeight = this.clientHeight;
  let closestDetent = __classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f");
  let closestDistance = Infinity;
  for (let i = 0; i < this.detents.length; i++) {
    const detentHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, this.detents[i]);
    const distance = Math.abs(currentHeight - detentHeight);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestDetent = i;
    }
  }
  return closestDetent;
};
_M3eBottomSheetElement_computeDetentHeight = function _M3eBottomSheetElement_computeDetentHeight(detent) {
  switch (detent) {
    case "collapsed":
      return __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMinHeight).call(this);
    case "half":
      return __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this) * 0.5;
    case "full":
      return __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this);
    case "fit":
      return __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeFitHeight).call(this);
  }
  if (detent.endsWith("%")) {
    return __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this) * (parseFloat(detent) / 100);
  }
  if (detent.endsWith("px")) {
    return parseFloat(detent);
  }
  return __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMinHeight).call(this);
};
_M3eBottomSheetElement_computeMaxHeight = function _M3eBottomSheetElement_computeMaxHeight() {
  const base = this.shadowRoot?.querySelector(".base");
  return window.innerHeight - (base ? computeCssSize(base, "var(--_bottom-sheet-top-space)") : 0);
};
_M3eBottomSheetElement_computeMinHeight = function _M3eBottomSheetElement_computeMinHeight() {
  return this.detents.includes("fit") && !this.detents.includes("collapsed") ? __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeFitHeight).call(this) : __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computePeekHeight).call(this);
};
_M3eBottomSheetElement_computePeekHeight = function _M3eBottomSheetElement_computePeekHeight() {
  const base = this.shadowRoot?.querySelector(".base");
  return __classPrivateFieldGet(this, _M3eBottomSheetElement_cachedHeaderHeight, "f") + (base ? computeCssSize(base, "var(--_bottom-sheet-peek-height)") : 0);
};
_M3eBottomSheetElement_computeFitHeight = function _M3eBottomSheetElement_computeFitHeight() {
  const body = this.shadowRoot?.querySelector(".body");
  if (!body) {
    return 0;
  }
  const bodyStyle = getComputedStyle(body);
  return Math.min(__classPrivateFieldGet(this, _M3eBottomSheetElement_cachedHeaderHeight, "f") + __classPrivateFieldGet(this, _M3eBottomSheetElement_cachedContentHeight, "f") + parseFloat(bodyStyle.paddingBlockStart) + parseFloat(bodyStyle.paddingBlockEnd), __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this));
};
_M3eBottomSheetElement_handleSectionResize = function _M3eBottomSheetElement_handleSectionResize(entries) {
  const oldCachedContentHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_cachedContentHeight, "f");
  const oldCachedHeaderHeight = __classPrivateFieldGet(this, _M3eBottomSheetElement_cachedHeaderHeight, "f");
  for (const entry of entries) {
    if (entry.target.classList.contains("content")) {
      __classPrivateFieldSet(this, _M3eBottomSheetElement_cachedContentHeight, (Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize).blockSize, "f");
    } else if (entry.target.classList.contains("header")) {
      __classPrivateFieldSet(this, _M3eBottomSheetElement_cachedHeaderHeight, (Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize).blockSize, "f");
    }
  }
  if (this.open && this.detents.length > 0 && (oldCachedContentHeight !== __classPrivateFieldGet(this, _M3eBottomSheetElement_cachedContentHeight, "f") || oldCachedHeaderHeight !== __classPrivateFieldGet(this, _M3eBottomSheetElement_cachedHeaderHeight, "f"))) {
    switch (this.detents[__classPrivateFieldGet(this, _M3eBottomSheetElement_activeDetent, "f")]) {
      case "fit":
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeFitHeight).call(this));
        break;
      case "collapsed":
        __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMinHeight).call(this));
        break;
    }
  }
};
_M3eBottomSheetElement_snapToDetent = function _M3eBottomSheetElement_snapToDetent(detent) {
  if (detent >= 0 && detent < this.detents.length) {
    __classPrivateFieldSet(this, _M3eBottomSheetElement_activeDetent, detent, "f");
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_snapToHeight).call(this, __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeDetentHeight).call(this, this.detents[detent]));
  }
};
_M3eBottomSheetElement_snapToHeight = /** @private */
async function _M3eBottomSheetElement_snapToHeight(height) {
  if (__classPrivateFieldGet(this, _M3eBottomSheetElement_snapAnimation, "f")) {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, this.clientHeight);
    __classPrivateFieldGet(this, _M3eBottomSheetElement_snapAnimation, "f")?.cancel();
    __classPrivateFieldSet(this, _M3eBottomSheetElement_snapAnimation, undefined, "f");
  }
  if (!prefersReducedMotion()) {
    __classPrivateFieldSet(this, _M3eBottomSheetElement_snapAnimation, this.animate([{
      "--_bottom-sheet-height": `${this.clientHeight}px`
    }, {
      "--_bottom-sheet-height": `${height}px`
    }], {
      duration: 250,
      easing: "cubic-bezier(0.2, 0.0, 0, 1.0)"
    }), "f");
    __classPrivateFieldGet(this, _M3eBottomSheetElement_snapAnimation, "f").onfinish = () => {
      __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, height);
      __classPrivateFieldSet(this, _M3eBottomSheetElement_snapAnimation, undefined, "f");
    };
    await __classPrivateFieldGet(this, _M3eBottomSheetElement_snapAnimation, "f").finished;
  } else {
    __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_updateHeight).call(this, height);
  }
};
_M3eBottomSheetElement_updateHeight = function _M3eBottomSheetElement_updateHeight(height) {
  this.style.setProperty("--_bottom-sheet-height", `${height}px`);
  setCustomState(this, "--full", height === __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computeMaxHeight).call(this));
  const content = this.shadowRoot?.querySelector(".content");
  if (content) {
    content.inert = height <= __classPrivateFieldGet(this, _M3eBottomSheetElement_instances, "m", _M3eBottomSheetElement_computePeekHeight).call(this);
  }
};
(() => {
  registerStyleSheet(css`@property --_bottom-sheet-height { syntax: "<length>"; inherits: false; initial-value: 50vh; } m3e-bottom-sheet > [slot="header"] { margin-block-end: var(--m3e-bottom-sheet-padding-block, ${DesignToken.measurement.space100}); margin-inline: var(--m3e-bottom-sheet-padding-inline, ${DesignToken.measurement.space200}); }</length>`);
})();
/** The styles of the element. */
M3eBottomSheetElement.styles = css`:host { display: block; position: fixed; left: 50%; top: calc(100vh - var(--_bottom-sheet-height)); margin: 0; padding: 0; outline: none; overflow: hidden; border: none; box-sizing: border-box; width: var(--m3e-bottom-sheet-width, 100%); max-width: var(--m3e-bottom-sheet-max-width, 640px); height: var(--_bottom-sheet-height); color: var(--m3e-bottom-sheet-color, ${DesignToken.color.onSurface}); background-color: var(--m3e-bottom-sheet-container-color, ${DesignToken.color.surfaceContainerLow}); } @supports (height: 100dvh) { :host { top: calc(100dvh - var(--_bottom-sheet-height)); } } :host([hidden]) { display: none; } :host(:not(:is(:state(--no-animate), :--no-animate))) { transition: ${unsafeCSS(`transform ${DesignToken.motion.duration.medium2} ${DesignToken.motion.easing.standardDecelerate},
        border-radius ${DesignToken.motion.duration.medium2} ${DesignToken.motion.easing.standard},
        display ${DesignToken.motion.duration.medium2} ${DesignToken.motion.easing.standard} allow-discrete,
        overlay ${DesignToken.motion.duration.medium2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host(:not([modal]):not(:is(:state(--full), :--full))) .elevation { --m3e-elevation-level: var(--m3e-bottom-sheet-elevation, ${DesignToken.elevation.level1}); } :host([modal]:not(:is(:state(--full), :--full))) .elevation { --m3e-elevation-level: var(--m3e-bottom-sheet-modal-elevation, ${DesignToken.elevation.level1}); } :host(:is(:state(--full), :--full)) .elevation { --m3e-elevation-level: var(--m3e-bottom-sheet-full-elevation, ${DesignToken.elevation.level1}); } :host(:not([modal])) { z-index: var(--m3e-bottom-sheet-z-index, 10); } :host(:not([modal]):not([open])), :host([modal]:not(:popover-open)) { border-radius: var(--m3e-bottom-sheet-minimized-container-shape, ${DesignToken.shape.corner.none}); transform: translateX(-50%) translateY(100%); } :host(:not([modal])[open]:not(:is(:state(--full), :--full))), :host([modal]:not(:is(:state(--full), :--full)):popover-open) { border-radius: var(--m3e-bottom-sheet-container-shape, ${DesignToken.shape.corner.extraLargeTop}); } :host(:not([modal])[open]:is(:state(--full), :--full)), :host([modal]:is(:state(--full), :--full):popover-open) { border-radius: var(--m3e-bottom-sheet-full-container-shape, ${DesignToken.shape.corner.extraLargeTop}); } :host(:not([modal])[open]), :host([modal]:popover-open) { transform: translateX(-50%) translateY(0); } :host([modal]:not(:is(:state(--no-animate), :--no-animate)))::backdrop { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } :host([modal]:popover-open)::backdrop { background-color: color-mix( in srgb, var(--m3e-bottom-sheet-scrim-color, ${DesignToken.color.scrim}) var(--m3e-bottom-sheet-scrim-opacity, 32%), transparent ); } :host([modal]:popover-open:not(:is(:state(--no-animate), :--no-animate)))::backdrop { transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard}, 
        overlay ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete,
        visibility ${DesignToken.motion.duration.long2} ${DesignToken.motion.easing.standard} allow-discrete`)}; } @starting-style { :host([modal]:popover-open)::backdrop { background-color: color-mix( in srgb, var(--m3e-bottom-sheet-scrim-color, ${DesignToken.color.scrim}) 0%, transparent ); } } .base { contain: layout style paint; display: flex; border-radius: inherit; flex-direction: column; height: 100%; --_bottom-sheet-peek-height: var(--m3e-bottom-sheet-peek-height, 0); --_bottom-sheet-top-space: var(--m3e-bottom-sheet-compact-top-space, ${DesignToken.measurement.space900}); } @media (max-height: 640px) { .base { --_bottom-sheet-top-space: var(--m3e-bottom-sheet-top-space, ${DesignToken.measurement.space700}); } } .body { flex: 1 1 auto; overflow-y: auto; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; padding-block-end: var(--m3e-bottom-sheet-padding-block, ${DesignToken.measurement.space100}); padding-inline: var(--m3e-bottom-sheet-padding-inline, ${DesignToken.measurement.space200}); font-size: var(--m3e-bottom-sheet-content-font-size, ${DesignToken.typescale.standard.body.medium.fontSize}); font-weight: var( --m3e-bottom-sheet-content-font-weight, ${DesignToken.typescale.standard.body.medium.fontWeight} ); line-height: var( --m3e-bottom-sheet-content-line-height, ${DesignToken.typescale.standard.body.medium.lineHeight} ); letter-spacing: var(--m3e-bottom-sheet-content-tracking, ${DesignToken.typescale.standard.body.medium.tracking}); } .content { height: fit-content; } :host(:not([handle]):not(:is(:state(--with-header), :--with-header))) .header { display: none; } :host(:not([handle])) .body, .header { border-top-left-radius: inherit; border-top-right-radius: inherit; padding-block-start: var(--m3e-bottom-sheet-padding-block, ${DesignToken.measurement.space100}); } .header { cursor: grab; touch-action: none; outline: none; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); box-sizing: border-box; flex: none; display: flex; flex-direction: column; min-height: 48px; --m3e-app-bar-container-color: var(--m3e-bottom-sheet-container-color, ${DesignToken.color.surfaceContainerLow}); font-size: var(--m3e-bottom-sheet-header-font-size, ${DesignToken.typescale.standard.title.large.fontSize}); font-weight: var(--m3e-bottom-sheet-header-font-weight, ${DesignToken.typescale.standard.title.large.fontWeight}); line-height: var(--m3e-bottom-sheet-header-line-height, ${DesignToken.typescale.standard.title.large.lineHeight}); letter-spacing: var(--m3e-bottom-sheet-header-tracking, ${DesignToken.typescale.standard.title.large.tracking}); } .handle-row { position: relative; flex: none; display: flex; align-items: center; justify-content: center; opacity: 1; visibility: visible; height: var(--m3e-bottom-sheet-handle-container-height, 24px); } :host(:not(:is(:state(--no-animate), :--no-animate))) .handle-row { transition: ${unsafeCSS(`opacity ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard},
        padding ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard},
        height ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard},
        visibility ${DesignToken.motion.duration.short3} ${DesignToken.motion.easing.standard} allow-discrete`)}; } .handle { position: relative; width: var(--m3e-bottom-sheet-handle-width, 32px); height: var(--m3e-bottom-sheet-handle-height, 4px); border-radius: var(--m3e-bottom-sheet-handle-shape, ${DesignToken.shape.corner.full}); background-color: var(--m3e-bottom-sheet-handle-color, ${DesignToken.color.onSurfaceVariant}); } .handle-touch { position: absolute; aspect-ratio: 1 / 1; height: 48px; left: calc(0px - calc(calc(48px - var(--m3e-bottom-sheet-handle-width, 32px)) / 2)); right: calc(0px - calc(calc(48px - var(--m3e-bottom-sheet-handle-width, 32px)) / 2)); top: calc( 0px - calc( calc(48px - var(--m3e-bottom-sheet-handle-container-height, 24px)) - calc( var(--m3e-bottom-sheet-handle-height, 4px) / 2 ) ) ); } @media (prefers-reduced-motion) { :host(:not(:is(:state(--no-animate), :--no-animate))), :host([modal]:not(:is(:state(--no-animate), :--no-animate)))::backdrop, :host([modal]:popover-open:not(:is(:state(--no-animate), :--no-animate)))::backdrop, :host(:not(:is(:state(--no-animate), :--no-animate))) .handle-row { transition: none; } } @media (forced-colors: active) { :host([modal]:not(:is(:state(--no-animate), :--no-animate)))::backdrop, :host([modal]:popover-open:not(:is(:state(--no-animate), :--no-animate)))::backdrop { transition: none; } .base { border-style: solid; border-width: 1px; border-color: CanvasText; } .handle { background-color: ButtonText; } }`;
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eBottomSheetElement.prototype, "modal", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eBottomSheetElement.prototype, "open", void 0);
__decorate([property({
  type: Boolean
})], M3eBottomSheetElement.prototype, "handle", void 0);
__decorate([property({
  attribute: "handle-label"
})], M3eBottomSheetElement.prototype, "handleLabel", void 0);
__decorate([property({
  attribute: "detents",
  converter: spaceSeparatedStringConverter
})], M3eBottomSheetElement.prototype, "detents", void 0);
__decorate([property({
  type: Number
})], M3eBottomSheetElement.prototype, "detent", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eBottomSheetElement.prototype, "hideable", void 0);
__decorate([property({
  attribute: "hide-friction",
  type: Number
})], M3eBottomSheetElement.prototype, "hideFriction", void 0);
__decorate([property({
  attribute: "overshoot-limit",
  type: Number
})], M3eBottomSheetElement.prototype, "overshootLimit", void 0);
M3eBottomSheetElement = M3eBottomSheetElement_1 = __decorate([customElement("m3e-bottom-sheet")], M3eBottomSheetElement);

/**
 * An element, nested within a clickable element, used to trigger a bottom sheet.
 * @tag m3e-bottom-sheet-trigger
 *
 * @slot - Renders the content of the trigger.
 *
 * @attr detent - The zero‑based index of the detent the sheet should open to.
 * @attr secondary - Marks this trigger as a secondary trigger for accessibility. Secondary triggers do not receive ARIA ownership.
 */
let M3eBottomSheetTriggerElement = class M3eBottomSheetTriggerElement extends HtmlFor(ActionElementBase) {
  constructor() {
    super(...arguments);
    /**
     * Marks this trigger as a secondary trigger for accessibility. Secondary triggers do not receive ARIA ownership.
     * @default false
     */
    this.secondary = false;
  }
  /** @inheritdoc */
  attach(control) {
    if (control instanceof M3eBottomSheetElement) {
      super.attach(control);
      if (this.parentElement) {
        if (!control.modal) {
          if (!this.secondary) {
            this.parentElement.ariaExpanded = "false";
            addAriaReferencedId(this.parentElement, "aria-controls", control.id);
            if (this.parentElement.id) {
              addAriaReferencedId(control, "aria-labelledby", this.parentElement.id);
            }
          }
        } else {
          this.parentElement.ariaHasPopup = "dialog";
        }
      }
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.control && this.parentElement && !this.secondary) {
      removeAriaReferencedId(this.parentElement, "aria-controls", this.control.id);
    }
    super.detach();
  }
  /** @inheritdoc */
  _onClick() {
    if (this.control instanceof M3eBottomSheetElement) {
      if (this.control.modal) {
        this.control.show(this.detent);
      } else {
        this.control.toggle(this.detent);
        if (!this.secondary && this.parentElement) {
          this.parentElement.ariaExpanded = `${this.control.open}`;
        }
      }
    }
  }
};
__decorate([property({
  type: Number
})], M3eBottomSheetTriggerElement.prototype, "detent", void 0);
__decorate([property({
  type: Boolean
})], M3eBottomSheetTriggerElement.prototype, "secondary", void 0);
M3eBottomSheetTriggerElement = __decorate([customElement("m3e-bottom-sheet-trigger")], M3eBottomSheetTriggerElement);

export { M3eBottomSheetActionElement, M3eBottomSheetElement, M3eBottomSheetTriggerElement };
//# sourceMappingURL=bottom-sheet.js.map
