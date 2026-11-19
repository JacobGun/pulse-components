/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __decorate, __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { LitElement, html, unsafeCSS, css, nothing } from 'lit';
import { query, state, property } from 'lit/decorators.js';
import { Disabled, AttachInternals, Role, DesignToken, customElement, HtmlFor, setCustomState, hasCustomState, IntersectionController, ScrollController, MutationController, ResizeController, debounce } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';
import { scrollIntoViewIfNeeded } from './scrollIntoViewIfNeeded.js';
import { SelectionManager } from './LiveAnnouncer.js';
import { Selected } from './Selected.js';
import { getTextContent } from './getTextContent.js';
import { guid } from './guid.js';

/**
 * An item in a table of contents.
 * @tag m3e-toc-item
 *
 * @slot - Renders the label of the item.
 *
 * @attr disabled - Whether the element is disabled.
 *
 * @fires click - Dispatched when the element is clicked.
 *
 * @cssprop --m3e-toc-item-shape - Border radius of the TOC item.
 * @cssprop --m3e-toc-item-padding-block - Block padding for the TOC item.
 * @cssprop --m3e-toc-item-padding - Inline padding for the TOC item.
 * @cssprop --m3e-toc-item-inset - Indentation per level for the TOC item.
 * @cssprop --m3e-toc-active-indicator-animation-duration - Animation duration for the active indicator.
 * @cssprop --m3e-toc-item-font-size - Font size for unselected items.
 * @cssprop --m3e-toc-item-font-weight - Font weight for unselected items.
 * @cssprop --m3e-toc-item-line-height - Line height for unselected items.
 * @cssprop --m3e-toc-item-tracking - Letter spacing for unselected items.
 * @cssprop --m3e-toc-item-color - Text color for unselected items.
 * @cssprop --m3e-toc-item-selected-font-size - Font size for selected items.
 * @cssprop --m3e-toc-item-selected-font-weight - Font weight for selected items.
 * @cssprop --m3e-toc-item-selected-line-height - Line height for selected items.
 * @cssprop --m3e-toc-item-selected-tracking - Letter spacing for selected items.
 * @cssprop --m3e-toc-item-selected-color - Text color for selected items.
 */
let M3eTocItemElement = class M3eTocItemElement extends Selected(Disabled(AttachInternals(Role(LitElement, "link")))) {
  /** @internal */
  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has("selected")) {
      this.ariaSelected = null;
      this.ariaCurrent = this.selected ? "true" : null;
    }
    if (changedProperties.has("node")) {
      if (this.node) {
        this._base?.style.setProperty("--_level", `${this.node.level - 1}`);
      } else {
        this._base?.style.removeProperty("--_level");
      }
    }
  }
  /** @inheritdoc */
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this._stateLayer?.attach(this);
  }
  /** @inheritdoc */
  render() {
    return html`<m3e-state-layer class="state-layer"></m3e-state-layer><div class="base"><slot></slot></div>`;
  }
};
/** The styles of the element. */
M3eTocItemElement.styles = css`:host { contain: layout style paint; display: inline-block; position: relative; user-select: none; outline: none; border-radius: var(--m3e-toc-item-shape, ${DesignToken.shape.corner.largeIncreased}); padding-block: var(--m3e-toc-item-padding-block, ${DesignToken.measurement.space100}); -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } :host([hidden]) { display: none; } :host(:not(:disabled)) { cursor: pointer; } .base { padding-inline-start: calc( var(--m3e-toc-item-padding, ${DesignToken.measurement.space200}) + calc(var(--m3e-toc-item-inset, ${DesignToken.measurement.space150}) * var(--_level, 0)) ); padding-inline-end: var(--m3e-toc-item-padding, ${DesignToken.measurement.space200}); transition: ${unsafeCSS(`color var(--m3e-toc-active-indicator-animation-duration, ${DesignToken.motion.duration.long1}) ${DesignToken.motion.easing.standard}`)}; } :host(:not([selected])) { font-size: var(--m3e-toc-item-font-size, ${DesignToken.typescale.standard.body.large.fontSize}); font-weight: var(--m3e-toc-item-font-weight, ${DesignToken.typescale.standard.body.large.fontWeight}); line-height: var(--m3e-toc-item-line-height, ${DesignToken.typescale.standard.body.large.lineHeight}); letter-spacing: var(--m3e-toc-item-tracking, ${DesignToken.typescale.standard.body.large.tracking}); color: var(--m3e-toc-item-color, ${DesignToken.color.onSurfaceVariant}); } :host([selected]) { font-size: var(--m3e-toc-item-selected-font-size, ${DesignToken.typescale.emphasized.body.large.fontSize}); font-weight: var(--m3e-toc-item-selected-font-weight, ${DesignToken.typescale.emphasized.body.large.fontWeight}); line-height: var(--m3e-toc-item-selected-line-height, ${DesignToken.typescale.emphasized.body.large.lineHeight}); letter-spacing: var(--m3e-toc-item-selected-tracking, ${DesignToken.typescale.emphasized.body.large.tracking}); color: var(--m3e-toc-item-selected-color, ${DesignToken.color.onSurface}); } .base { justify-content: unset; } .state-layer { --m3e-state-layer-focus-opacity: 0; } @media (prefers-reduced-motion) { .base { transition: none; } }`;
__decorate([query(".base")], M3eTocItemElement.prototype, "_base", void 0);
__decorate([query(".state-layer")], M3eTocItemElement.prototype, "_stateLayer", void 0);
__decorate([state()], M3eTocItemElement.prototype, "node", void 0);
M3eTocItemElement = __decorate([customElement("m3e-toc-item")], M3eTocItemElement);

var _a, _TocGenerator_getHeaderLevel;
/** Provides functionality used to generate a table of contents used for in-page navigation. */
class TocGenerator {
  /**
   * Generates nodes from which to construct a table of contents for in-page navigation.
   * @param {HTMLElement} element The element for which to generate a table of contents.
   * @param {number} [maxDepth=6] The maximum depth of the table of contents.
   * @returns {Array<TocNode>} The top-level nodes of the table of contents.
   */
  static generate(element, maxDepth = 6) {
    const maxLevel = 6;
    let topLevel = maxLevel;
    const nodes = new Array();
    element.querySelectorAll("h1:not([m3e-toc-ignore]),h2:not([m3e-toc-ignore]),h3:not([m3e-toc-ignore]),h4:not([m3e-toc-ignore]),h5:not([m3e-toc-ignore]),h6:not([m3e-toc-ignore]),m3e-heading[level]:not([m3e-toc-ignore])").forEach(element => {
      const level = __classPrivateFieldGet(_a, _a, "m", _TocGenerator_getHeaderLevel).call(_a, element);
      topLevel = Math.min(level, topLevel);
      nodes.push({
        id: element.id || guid(),
        element,
        level,
        label: getTextContent(element, true),
        nodes: new Array()
      });
    });
    for (let level = topLevel + maxDepth - 1; level > topLevel; level--) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.level === level) {
          for (let j = i; j >= 0; j--) {
            const prev = nodes[j];
            if (prev.level < level) {
              prev.nodes.push(node);
              break;
            }
          }
        }
      }
    }
    nodes.forEach(x => x.level -= topLevel - 1);
    return nodes.filter(x => x.level === 1);
  }
}
_a = TocGenerator, _TocGenerator_getHeaderLevel = function _TocGenerator_getHeaderLevel(element) {
  return element.tagName.startsWith("H") ? parseInt(element.tagName.substring(1)) : parseInt(element.getAttribute("level") ?? "0");
};

var _M3eTocElement_instances, _M3eTocElement_ignoreScroll, _M3eTocElement_selectionManager, _M3eTocElement_intersectionController, _M3eTocElement_scrollController, _M3eTocElement_mutationController, _M3eTocElement_resizeController, _M3eTocElement_renderNode, _M3eTocElement_handleOverlineSlotChange, _M3eTocElement_handleTitleSlotChange, _M3eTocElement_handleClick, _M3eTocElement_generateToc;
/**
 * A table of contents that provides in-page scroll navigation.
 *
 * @description
 * The `m3e-toc` component generates a hierarchical table of contents for in-page navigation.
 * It automatically detects headings or sections in a target element, builds a navigable list,
 * and highlights the active section as the user scrolls. The component supports custom header
 * slots, depth limiting, smooth scrolling, and extensive theming via CSS custom properties.
 *
 * To exclude a heading from the generated table of contents, add the `m3e-toc-ignore` attribute
 * to that heading element.
 *
 * @example
 * ```html
 * <m3e-toc for="content" max-depth="3">
 *   <span slot="overline">Contents</span>
 *   <span slot="title">Documentation</span>
 * </m3e-toc>
 * <div id="content">
 *   <h2>Introduction</h2>
 *   <h2>Getting Started</h2>
 *   <h3>Installation</h3>
 *   <h3>Usage</h3>
 *   <h2>API Reference</h2>
 * </div>
 * ```
 *
 * @tag m3e-toc
 *
 * @slot - Renders content between the header and items.
 * @slot overline - Renders the overline of the table of contents.
 * @slot title - Renders the title of the table of contents.
 *
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr max-depth - The maximum depth of the table of contents.
 *
 * @cssprop --m3e-toc-width - Width of the table of contents.
 * @cssprop --m3e-toc-container-color - Background color of the table of contents container.
 * @cssprop --m3e-toc-container-padding-inline - Inline padding of the table of contents container.
 * @cssprop --m3e-toc-container-padding-block - Block padding of the table of contents container.
 * @cssprop --m3e-toc-item-shape - Border radius of TOC items and active indicator.
 * @cssprop --m3e-toc-active-indicator-color - Border color of the active indicator.
 * @cssprop --m3e-toc-active-indicator-animation-duration - Animation duration for the active indicator.
 * @cssprop --m3e-toc-item-padding - Inline padding for TOC items and header.
 * @cssprop --m3e-toc-header-space - Block space below and between header elements.
 * @cssprop --m3e-toc-overline-font-size - Font size for the overline slot.
 * @cssprop --m3e-toc-overline-font-weight - Font weight for the overline slot.
 * @cssprop --m3e-toc-overline-line-height - Line height for the overline slot.
 * @cssprop --m3e-toc-overline-tracking - Letter spacing for the overline slot.
 * @cssprop --m3e-toc-overline-color - Text color for the overline slot.
 * @cssprop --m3e-toc-title-font-size - Font size for the title slot.
 * @cssprop --m3e-toc-title-font-weight - Font weight for the title slot.
 * @cssprop --m3e-toc-title-line-height - Line height for the title slot.
 * @cssprop --m3e-toc-title-tracking - Letter spacing for the title slot.
 * @cssprop --m3e-toc-title-color - Text color for the title slot.
 */
let M3eTocElement = class M3eTocElement extends HtmlFor(AttachInternals(Role(LitElement, "navigation"))) {
  constructor() {
    super(...arguments);
    _M3eTocElement_instances.add(this);
    /** @private */
    this._toc = [];
    /** @private */
    _M3eTocElement_ignoreScroll.set(this, false);
    /** @private */
    _M3eTocElement_selectionManager.set(this, new SelectionManager().withHomeAndEnd().withVerticalOrientation().disableRovingTabIndex().onSelectedItemsChange(() => {
      for (const target of __classPrivateFieldGet(this, _M3eTocElement_resizeController, "f").targets) {
        __classPrivateFieldGet(this, _M3eTocElement_resizeController, "f").unobserve(target);
      }
      if (this._activeIndicator) {
        const item = __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").selectedItems[0];
        if (!item) {
          setCustomState(this, "--no-animate", true);
          this._activeIndicator.style.top = `0px`;
          this._activeIndicator.style.height = `0px`;
          this._activeIndicator.style.visibility = "hidden";
        } else {
          __classPrivateFieldGet(this, _M3eTocElement_resizeController, "f").observe(item);
          const scrollContainer = this._scrollContainer;
          if (item === __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").items[0]) {
            scrollContainer.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          } else if (item === __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").items[__classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").items.length - 1]) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight - scrollContainer.clientHeight,
              behavior: "smooth"
            });
          } else {
            scrollIntoViewIfNeeded(item, this._scrollContainer, {
              block: "nearest",
              behavior: "smooth"
            });
          }
          this._activeIndicator.style.top = `${item.offsetTop}px`;
          this._activeIndicator.style.height = `${item.clientHeight}px`;
          this._activeIndicator.style.visibility = item.clientHeight == 0 ? "hidden" : "";
          if (hasCustomState(this, "--no-animate")) {
            setTimeout(() => setCustomState(this, "--no-animate", false), 40);
          }
        }
      }
    }));
    /** @private */
    _M3eTocElement_intersectionController.set(this, new IntersectionController(this, {
      target: null,
      callback: entries => {
        if (!this.control || __classPrivateFieldGet(this, _M3eTocElement_ignoreScroll, "f")) return;
        const targetOffset = this.control.scrollTop;
        let closestElement = null;
        let closestDistance = Number.POSITIVE_INFINITY;
        entries.filter(x => x.isIntersecting).map(x => x.target).forEach(item => {
          const offsetTop = item.offsetTop;
          const distance = Math.abs(offsetTop - targetOffset);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = item;
          }
        });
        if (closestElement) {
          const item = __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").items.find(x => x.node?.element === closestElement);
          if (item) {
            __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").select(item);
          }
        }
      }
    }));
    /** @private */
    _M3eTocElement_scrollController.set(this, new ScrollController(this, {
      target: null,
      callback: () => __classPrivateFieldSet(this, _M3eTocElement_ignoreScroll, false, "f"),
      debounce: true
    }));
    /** @private */
    _M3eTocElement_mutationController.set(this, new MutationController(this, {
      target: null,
      config: {
        childList: true,
        subtree: true
      },
      callback: () => this._updateToc()
    }));
    /** @private */
    _M3eTocElement_resizeController.set(this, new ResizeController(this, {
      target: null,
      callback: () => {
        const item = __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").selectedItems[0];
        if (item && this._activeIndicator) {
          this._activeIndicator.style.top = `${item.offsetTop}px`;
          this._activeIndicator.style.height = `${item.clientHeight}px`;
          this._activeIndicator.style.visibility = item.clientHeight == 0 ? "hidden" : "";
        }
      }
    }));
    /**
     * The maximum depth of the table of contents.
     * @default 2
     */
    this.maxDepth = 2;
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    __classPrivateFieldGet(this, _M3eTocElement_mutationController, "f").observe(control);
    __classPrivateFieldGet(this, _M3eTocElement_scrollController, "f").observe(control);
    __classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_generateToc).call(this);
  }
  /** @inheritdoc */
  detach() {
    if (this.control) {
      __classPrivateFieldGet(this, _M3eTocElement_mutationController, "f").unobserve(this.control);
      __classPrivateFieldGet(this, _M3eTocElement_scrollController, "f").unobserve(this.control);
    }
    super.detach();
    __classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_generateToc).call(this);
  }
  /** @inheritdoc */
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("maxDepth")) {
      __classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_generateToc).call(this);
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("_toc")) {
      const {
        added,
        removed
      } = __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").setItems([...(this.shadowRoot?.querySelectorAll("m3e-toc-item") ?? [])]);
      if (!__classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").activeItem) {
        setCustomState(this, "--no-animate", true);
        __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").updateActiveItem(added.find(x => !x.disabled));
      }
      for (const item of added) {
        if (item.node) {
          __classPrivateFieldGet(this, _M3eTocElement_intersectionController, "f").observe(item.node.element);
        }
      }
      for (const item of removed) {
        if (item.node) {
          __classPrivateFieldGet(this, _M3eTocElement_intersectionController, "f").unobserve(item.node.element);
        }
      }
    }
  }
  /** @inheritdoc */
  render() {
    return html`<div class="base"><div class="scroll-container"><div class="header"><div class="overline"><slot name="overline" @slotchange="${__classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_handleOverlineSlotChange)}"></slot></div><div class="title"><slot name="title" @slotchange="${__classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_handleTitleSlotChange)}"></slot></div></div><slot></slot><ul class="list">${this._toc.map(x => __classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_renderNode).call(this, x))}</ul><div class="active-indicator" aria-hidden="true"></div></div></div>`;
  }
  /** @private */
  _updateToc() {
    __classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_generateToc).call(this);
  }
};
_M3eTocElement_ignoreScroll = new WeakMap();
_M3eTocElement_selectionManager = new WeakMap();
_M3eTocElement_intersectionController = new WeakMap();
_M3eTocElement_scrollController = new WeakMap();
_M3eTocElement_mutationController = new WeakMap();
_M3eTocElement_resizeController = new WeakMap();
_M3eTocElement_instances = new WeakSet();
_M3eTocElement_renderNode = function _M3eTocElement_renderNode(node) {
  return html`<li><m3e-toc-item tabindex="-1" .node="${node}" @click="${__classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_handleClick)}">${node.label}</m3e-toc-item>${node.nodes.length == 0 ? nothing : html`<ul>${node.nodes.map(x => __classPrivateFieldGet(this, _M3eTocElement_instances, "m", _M3eTocElement_renderNode).call(this, x))}</ul>`}</li>`;
};
_M3eTocElement_handleOverlineSlotChange = function _M3eTocElement_handleOverlineSlotChange(e) {
  setCustomState(this, "--with-overline", hasAssignedNodes(e.target));
};
_M3eTocElement_handleTitleSlotChange = function _M3eTocElement_handleTitleSlotChange(e) {
  setCustomState(this, "--with-title", hasAssignedNodes(e.target));
};
_M3eTocElement_handleClick = function _M3eTocElement_handleClick(e) {
  if (e.target instanceof M3eTocItemElement && !e.target.disabled && e.target.node?.element) {
    __classPrivateFieldSet(this, _M3eTocElement_ignoreScroll, true, "f");
    e.target.node.element.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
    __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").updateActiveItem(e.target);
    __classPrivateFieldGet(this, _M3eTocElement_selectionManager, "f").select(e.target);
  }
};
_M3eTocElement_generateToc = function _M3eTocElement_generateToc() {
  this._toc = this.control ? TocGenerator.generate(this.control, Math.max(1, Math.min(this.maxDepth, 6))) : [];
};
/** The styles of the element. */
M3eTocElement.styles = css`:host { display: inline-block; width: calc(var(--m3e-toc-width, 156px)); } :host([hidden]) { display: none; } .base { contain: layout style paint; border-radius: var(--m3e-toc-container-shape, ${DesignToken.shape.corner.none}); box-sizing: border-box; overflow: hidden; height: 100%; width: 100%; } .scroll-container { height: inherit; width: inherit; box-sizing: inherit; background-color: var(--m3e-toc-container-color, transparent); border-radius: inherit; padding-inline: var(--m3e-toc-container-padding-inline, 0px); padding-block: var(--m3e-toc-container-padding-block, 0px); position: relative; overflow-y: auto; overflow-x: hidden; scrollbar-width: ${DesignToken.scrollbar.thinWidth}; scrollbar-color: ${DesignToken.scrollbar.color}; } ul { list-style: none; padding-inline-start: unset; margin-block-start: unset; margin-block-end: unset; } ul, li { display: flex; flex-direction: column; align-items: stretch; } m3e-toc-item { flex: none; } .active-indicator { contain: layout style paint; position: absolute; pointer-events: none; box-sizing: border-box; left: var(--m3e-toc-container-padding-inline, 0px); right: var(--m3e-toc-container-padding-inline, 0px); border-radius: var(--m3e-toc-item-shape, ${DesignToken.shape.corner.largeIncreased}); border: 1px solid var(--m3e-toc-active-indicator-color, ${DesignToken.color.outline}); transition: ${unsafeCSS(`height var(--m3e-toc-active-indicator-animation-duration, ${DesignToken.motion.duration.long1})
          ${DesignToken.motion.easing.standard},
        top var(--m3e-toc-active-indicator-animation-duration, ${DesignToken.motion.duration.long1})
          ${DesignToken.motion.easing.standard}`)}; } .header { display: flex; flex-direction: column; align-items: stretch; padding-inline-start: var(--m3e-toc-item-padding, ${DesignToken.measurement.space200}); padding-block-end: var(--m3e-toc-header-space, ${DesignToken.measurement.space100}); row-gap: var(--m3e-toc-header-space, ${DesignToken.measurement.space100}); } .overline { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-clamp: 2; } :host(:not(:is(:state(--with-overline), :--with-overline))) .overline, :host(:not(:is(:state(--with-title), :--with-title))) .title, :host(:not(:is(:state(--with-overline), :--with-overline)):not(:is(:state(--with-title), :--with-title))) .header { display: none; } ::slotted([slot="overline"]) { font-size: var(--m3e-toc-overline-font-size, ${DesignToken.typescale.standard.label.small.fontSize}); font-weight: var(--m3e-toc-overline-font-weight, ${DesignToken.typescale.standard.label.small.fontWeight}); line-height: var(--m3e-toc-overline-line-height, ${DesignToken.typescale.standard.label.small.lineHeight}); letter-spacing: var(--m3e-toc-overline-tracking, ${DesignToken.typescale.standard.label.small.tracking}); color: var(--m3e-toc-overline-color, ${DesignToken.color.onSurfaceVariant}); } ::slotted([slot="title"]) { font-size: var(--m3e-toc-title-font-size, ${DesignToken.typescale.standard.headline.small.fontSize}); font-weight: var(--m3e-toc-title-font-weight, ${DesignToken.typescale.standard.headline.small.fontWeight}); line-height: var(--m3e-toc-title-line-height, ${DesignToken.typescale.standard.headline.small.lineHeight}); letter-spacing: var(--m3e-toc-title-tracking, ${DesignToken.typescale.standard.headline.small.tracking}); color: var(--m3e-toc-title-color, ${DesignToken.color.onSurface}); } :host(:is(:state(--no-animate), :--no-animate)) .active-indicator { transition: none; } @media (prefers-reduced-motion) { .active-indicator { transition: none; } } @media (forced-colors: active) { .base { border-radius: unset; } }`;
__decorate([state()], M3eTocElement.prototype, "_toc", void 0);
__decorate([query(".active-indicator")], M3eTocElement.prototype, "_activeIndicator", void 0);
__decorate([query(".scroll-container")], M3eTocElement.prototype, "_scrollContainer", void 0);
__decorate([property({
  attribute: "max-depth",
  type: Number
})], M3eTocElement.prototype, "maxDepth", void 0);
__decorate([debounce(40)], M3eTocElement.prototype, "_updateToc", null);
M3eTocElement = __decorate([customElement("m3e-toc")], M3eTocElement);

export { M3eTocElement, M3eTocItemElement, TocGenerator };
//# sourceMappingURL=toc.js.map
