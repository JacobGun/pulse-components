/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { __classPrivateFieldGet, __decorate } from 'tslib';
import { unsafeCSS, css, LitElement, html } from 'lit';
import { query, property } from 'lit/decorators.js';
import { DesignToken, HtmlFor, Role, AttachInternals, setCustomEnumState, debounce, customElement } from './TextOverflowElement.js';
import 'lit/directives/if-defined.js';
import { hasAssignedNodes } from './hasAssignedNodes.js';

/**
 * Determines whether a value is an `AppBarSize`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is an `AppBarSize`.
 */
function isAppBarSize(value) {
  return value === "small" || value === "medium" || value === "large";
}

/**
 * Component design tokens that control the `M3eAppBarElement` for all size variants.
 * @internal
 */
const AppBarSizeToken = {
  small: {
    containerHeight: unsafeCSS(`var(--m3e-app-bar-small-container-height, 64px)`),
    titleTextFontSize: unsafeCSS(`var(--m3e-app-bar-small-title-text-font-size, ${DesignToken.typescale.standard.title.large.fontSize})`),
    titleTextFontWeight: unsafeCSS(`var(--m3e-app-bar-small-title-text-font-weight, ${DesignToken.typescale.standard.title.large.fontWeight})`),
    titleTextLineHeight: unsafeCSS(`var(--m3e-app-bar-small-title-text-line-height, ${DesignToken.typescale.standard.title.large.lineHeight})`),
    titleTextTracking: unsafeCSS(`var(--m3e-app-bar-small-subtitle-text-tracking, ${DesignToken.typescale.standard.title.large.tracking})`),
    subtitleTextFontSize: unsafeCSS(`var(--m3e-app-bar-small-subtitle-text-font-size, ${DesignToken.typescale.standard.label.medium.fontSize})`),
    subtitleTextFontWeight: unsafeCSS(`var(--m3e-app-bar-small-subtitle-text-font-weight, ${DesignToken.typescale.standard.label.medium.fontWeight})`),
    subtitleTextLineHeight: unsafeCSS(`var(--m3e-app-bar-small-subtitle-text-line-height, ${DesignToken.typescale.standard.label.medium.lineHeight})`),
    subtitleTextTracking: unsafeCSS(`var(--m3e-app-bar-small-subtitle-text-tracking, ${DesignToken.typescale.standard.label.medium.tracking})`),
    headingPaddingLeft: unsafeCSS(`var(--m3e-app-bar-small-heading-padding-left, ${DesignToken.measurement.space50})`),
    headingPaddingRight: unsafeCSS(`var(--m3e-app-bar-small-heading-padding-right, ${DesignToken.measurement.space50})`)
  },
  medium: {
    containerHeight: unsafeCSS(`var(--m3e-app-bar-medium-container-height, 112px)`),
    containerHeightWithSubtitle: unsafeCSS(`var(--m3e-app-bar-medium-container-height-with-subtitle, 136px)`),
    titleTextFontSize: unsafeCSS(`var(--m3e-app-bar-medium-title-text-font-size, ${DesignToken.typescale.standard.headline.medium.fontSize})`),
    titleTextFontWeight: unsafeCSS(`var(--m3e-app-bar-medium-title-text-font-weight, ${DesignToken.typescale.standard.headline.medium.fontWeight})`),
    titleTextLineHeight: unsafeCSS(`var(--m3e-app-bar-medium-title-text-line-height, ${DesignToken.typescale.standard.headline.medium.lineHeight})`),
    titleTextTracking: unsafeCSS(`var(--m3e-app-bar-medium-subtitle-text-tracking, ${DesignToken.typescale.standard.headline.medium.tracking})`),
    subtitleTextFontSize: unsafeCSS(`var(--m3e-app-bar-medium-subtitle-text-font-size, ${DesignToken.typescale.standard.title.small.fontSize})`),
    subtitleTextFontWeight: unsafeCSS(`var(--m3e-app-bar-medium-subtitle-text-font-weight, ${DesignToken.typescale.standard.title.small.fontWeight})`),
    subtitleTextLineHeight: unsafeCSS(`var(--m3e-app-bar-medium-subtitle-text-line-height, ${DesignToken.typescale.standard.title.small.lineHeight})`),
    subtitleTextTracking: unsafeCSS(`var(--m3e-app-bar-medium-subtitle-text-tracking, ${DesignToken.typescale.standard.title.small.tracking})`),
    headingPaddingLeft: unsafeCSS(`var(--m3e-app-bar-medium-heading-padding-left, ${DesignToken.measurement.space200})`),
    headingPaddingRight: unsafeCSS(`var(--m3e-app-bar-medium-heading-padding-right, ${DesignToken.measurement.space50})`),
    paddingTop: unsafeCSS(`var(--m3e-app-bar-medium-padding-top, ${DesignToken.measurement.space100})`),
    paddingBottom: unsafeCSS(`var(--m3e-app-bar-medium-padding-bottom, ${DesignToken.measurement.space150})`),
    titleMaxLines: unsafeCSS(`var(--m3e-app-bar-medium-title-max-lines, 2)`),
    subtitleMaxLines: unsafeCSS(`var(--m3e-app-bar-medium-subtitle-max-lines, 1)`)
  },
  large: {
    containerHeight: unsafeCSS(`var(--m3e-app-bar-large-container-height, 120px)`),
    containerHeightWithSubtitle: unsafeCSS(`var(--m3e-app-bar-large-container-height-with-subtitle, 152px)`),
    titleTextFontSize: unsafeCSS(`var(--m3e-app-bar-large-title-text-font-size, ${DesignToken.typescale.standard.display.small.fontSize})`),
    titleTextFontWeight: unsafeCSS(`var(--m3e-app-bar-large-title-text-font-weight, ${DesignToken.typescale.standard.display.small.fontWeight})`),
    titleTextLineHeight: unsafeCSS(`var(--m3e-app-bar-large-title-text-line-height, ${DesignToken.typescale.standard.display.small.lineHeight})`),
    titleTextTracking: unsafeCSS(`var(--m3e-app-bar-large-subtitle-text-tracking, ${DesignToken.typescale.standard.display.small.tracking})`),
    subtitleTextFontSize: unsafeCSS(`var(--m3e-app-bar-large-subtitle-text-font-size, ${DesignToken.typescale.standard.title.medium.fontSize})`),
    subtitleTextFontWeight: unsafeCSS(`var(--m3e-app-bar-large-subtitle-text-font-weight, ${DesignToken.typescale.standard.title.medium.fontWeight})`),
    subtitleTextLineHeight: unsafeCSS(`var(--m3e-app-bar-large-subtitle-text-line-height, ${DesignToken.typescale.standard.title.medium.lineHeight})`),
    subtitleTextTracking: unsafeCSS(`var(--m3e-app-bar-large-subtitle-text-tracking, ${DesignToken.typescale.standard.title.medium.tracking})`),
    headingPaddingLeft: unsafeCSS(`var(--m3e-app-bar-large-heading-padding-left, ${DesignToken.measurement.space200})`),
    headingPaddingRight: unsafeCSS(`var(--m3e-app-bar-large-heading-padding-right, ${DesignToken.measurement.space50})`),
    paddingTop: unsafeCSS(`var(--m3e-app-bar-large-padding-top, ${DesignToken.measurement.space100})`),
    paddingBottom: unsafeCSS(`var(--m3e-app-bar-large-padding-bottom, ${DesignToken.measurement.space150})`),
    titleMaxLines: unsafeCSS(`var(--m3e-app-bar-large-title-max-lines, 2)`),
    subtitleMaxLines: unsafeCSS(`var(--m3e-app-bar-large-subtitle-max-lines, 1)`)
  }
};

/** @private */
function appBarStyle(size) {
  const selector = unsafeCSS(`:is(:state(--${size}), :--${size})`);
  return css`:host(${selector}) .base:not(.with-subtitle) { min-height: ${AppBarSizeToken[size].containerHeight}; } :host(${selector}) .base.with-subtitle { min-height: ${AppBarSizeToken[size].containerHeightWithSubtitle ?? AppBarSizeToken[size].containerHeight}; } :host(${selector}) .title { font-size: ${AppBarSizeToken[size].titleTextFontSize}; font-weight: ${AppBarSizeToken[size].titleTextFontWeight}; line-height: ${AppBarSizeToken[size].titleTextLineHeight}; letter-spacing: ${AppBarSizeToken[size].titleTextTracking}; } :host(${selector}) .subtitle { font-size: ${AppBarSizeToken[size].subtitleTextFontSize}; font-weight: ${AppBarSizeToken[size].subtitleTextFontWeight}; line-height: ${AppBarSizeToken[size].subtitleTextLineHeight}; letter-spacing: ${AppBarSizeToken[size].subtitleTextTracking}; } :host(:not([centered])${selector}) .label { padding-inline-start: ${AppBarSizeToken[size].headingPaddingLeft}; padding-inline-end: ${AppBarSizeToken[size].headingPaddingRight}; } :host([centered]${selector}) .label { padding-inline: ${AppBarSizeToken[size].headingPaddingLeft}; } :host(${selector}) .base { padding-block-start: ${AppBarSizeToken[size].paddingTop ?? unsafeCSS("unset")}; padding-block-end: ${AppBarSizeToken[size].paddingBottom ?? unsafeCSS("unset")}; } ${AppBarSizeToken[size].titleMaxLines ? css`:host(${selector}) .title { display: -webkit-box; -webkit-line-clamp: ${AppBarSizeToken[size].titleMaxLines}; -webkit-box-orient: vertical; overflow: hidden; line-clamp: ${AppBarSizeToken[size].titleMaxLines}; }` : css``} ${AppBarSizeToken[size].subtitleMaxLines ? css`:host(${selector}) .subtitle { display: -webkit-box; -webkit-line-clamp: ${AppBarSizeToken[size].subtitleMaxLines}; -webkit-box-orient: vertical; overflow: hidden; line-clamp: ${AppBarSizeToken[size].subtitleMaxLines}; }` : css``}`;
}
/**
 * Size variant styles for `M3eAppBarElement`.
 * @internal
 */
const AppBarSizeStyle = [appBarStyle("small"), appBarStyle("medium"), appBarStyle("large")];

/**
 * Component design tokens that control `M3eAppBarElement`.
 * @internal
 */
const AppBarToken = {
  containerColor: unsafeCSS(`var(--m3e-app-bar-container-color, ${DesignToken.color.surface})`),
  containerColorOnScroll: unsafeCSS(`var(--m3e-app-bar-container-color-on-scroll, ${DesignToken.color.surfaceContainer})`),
  containerElevation: unsafeCSS(`var(--m3e-app-bar-container-elevation, ${DesignToken.elevation.level0})`),
  containerElevationOnScroll: unsafeCSS(`var(--m3e-app-bar-container-elevation-on-scroll, ${DesignToken.elevation.level1})`),
  titleTextColor: unsafeCSS(`var(--m3e-app-bar-title-text-color, ${DesignToken.color.onSurface})`),
  subtitleTextColor: unsafeCSS(`var(--m3e-app-bar-subtitle-text-color, ${DesignToken.color.onSurfaceVariant})`),
  paddingLeft: unsafeCSS(`var(--m3e-app-bar-padding-left, ${DesignToken.measurement.space50})`),
  paddingRight: unsafeCSS(`var(--m3e-app-bar-padding-right, ${DesignToken.measurement.space50})`)
};

/**
 * Baseline styles for `M3eAppBarElement`.
 * @internal
 */
const AppBarStyle = css`:host { display: block; flex: none; } :host([hidden]) { display: none; } :host(:is(:state(--small), :--small)) .base, :host(:not(:is(:state(--small), :--small)):not([centered])) .heading { padding-inline-start: ${AppBarToken.paddingLeft}; padding-inline-end: ${AppBarToken.paddingRight}; } .base { box-sizing: border-box; display: flex; transition: ${unsafeCSS(`background-color ${DesignToken.motion.duration.medium1} ${DesignToken.motion.easing.standard},
      box-shadow ${DesignToken.motion.duration.medium1} ${DesignToken.motion.easing.standard}`)}; } .base:not(.on-scroll) { background-color: ${AppBarToken.containerColor}; box-shadow: ${AppBarToken.containerElevation}; } .base.on-scroll { background-color: ${AppBarToken.containerColorOnScroll}; box-shadow: ${AppBarToken.containerElevationOnScroll}; } .leading-icon, .trailing-icon { display: flex; flex: none; align-items: center; --_icon-button-size: auto; --_icon-button-min-size: 48px; } .leading-icon { min-width: var(--_leading-icon-min-width); } .trailing-icon { min-width: var(--_trailing-icon-min-width); } .heading { display: flex; align-items: center; } :host(:is(:state(--small), :--small)) .heading { flex: 1 1 auto; } .spacer { flex: 1 1 auto; } .label { display: flex; flex-direction: column; flex: none; } .title { color: ${AppBarToken.titleTextColor}; } .subtitle { color: ${AppBarToken.subtitleTextColor}; } .base:not(.with-title) .title, .base:not(.with-subtitle) .subtitle, .base:not(.with-title):not(.with-subtitle) .label, .base:not(.with-trailing-icon) .trailing-icon { display: none; } :host(:is(:state(--small), :--small)) .base { align-items: center; } :host(:is(:state(--small), :--small)) .heading { min-width: 0; } :host(:is(:state(--small), :--small)) .label { flex: 1 1 auto; min-width: 0; } :host(:is(:state(--small), :--small)) .title, :host(:is(:state(--small), :--small)) .subtitle { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } :host(:not(:is(:state(--small), :--small))) .base { flex-direction: column; } :host([centered]) .title, :host([centered]) .subtitle { text-align: center; } @media (prefers-reduced-motion) { .base { transition: none; } } @media (forced-colors: active) { .base { transition: none; } .base:not(.on-scroll), .base.on-scroll { background-color: Canvas; box-shadow: unset; } .title { color: CanvasText; } .subtitle { color: FieldText; } }`;

var _M3eAppBarElement_instances, _M3eAppBarElement_scrollHandler, _M3eAppBarElement_frameLoadHandler, _M3eAppBarElement_applySize, _M3eAppBarElement_handleTitleSlotChange, _M3eAppBarElement_handleSubtitleSlotChange, _M3eAppBarElement_handleLeadingIconSlotChange, _M3eAppBarElement_handleTrailingIconsSlotChange, _M3eAppBarElement_handleDeprecatedSlotChange, _M3eAppBarElement_clearCentered, _M3eAppBarElement_computeCentered, _M3eAppBarElement_handleFrameLoad, _M3eAppBarElement_getFrameScrollTop;
/**
 * A bar, placed a the top of a screen, used to help users navigate through an application.
 *
 * @description
 * The `m3e-app-bar` component is a prominent user interface component that provides consistent
 * access to key actions, navigation, and contextual information at the top of an application screen.
 * Designed according to Material 3 principles, it organizes content with clear hierarchy, supports
 * dynamic color, elevation, and shape, and adapts to scrolling behavior.
 *
 * @example
 * ```html
 * <m3e-app-bar size="medium">
 *  <m3e-icon-button slot="leading-icon" aria-label="Back">
 *    <m3e-icon name="arrow_back"></m3e-icon>
 *  </m3e-icon-button>
 *  <span slot="title">Top 10 hiking trails</span>
 *  <span slot="subtitle">Discover popular trails</span>
 *  <m3e-icon-button slot="trailing-icon" aria-label="Bookmark" variant="tonal">
 *    <m3e-icon name="bookmark" filled></m3e-icon>
 *  </m3e-icon-button>
 * <m3e-app-bar>
 * ```
 * @example
 * The next example illustrates how to attach an app bar to a parenting scroll container
 * to produce elevation on scroll. In this example, the `for` attribute is used to attach a
 * sticky positioned `m3e-app-bar` to a parenting container styled to overflow vertically.
 * When scrolled, the app bar will automatically transition to an elevated state.
 * ```html
 * <div style="overflow-y: auto; height: 300px" id="scrollContainer">
 *  <m3e-app-bar for="scrollContainer" style="position: sticky; top: 0">
 *    <span slot="title">Title</span>
 *  </m3e-app-bar>
 *  <div style="height: 400px; display: flex; align-items: center; justify-content: center">
 *    I am scrolling content
 *  </div>
 * </div>
 * ```
 *
 * @tag m3e-app-bar
 *
 * @slot leading - Renders content positioned at the start of the bar.
 * @slot subtitle - Renders the subtitle of the bar.
 * @slot title - Renders the title of the bar.
 * @slot trailing - Renders one or more action buttons aligned to the end of the bar.
 * @slot leading-icon - Deprecated: use the `leading` slot.
 * @slot trailing-icon - Deprecated: use the `trailing` slot.
 *
 * @attr centered - Whether the title and subtitle are centered.
 * @attr for - The identifier of the interactive control to which this element is attached.
 * @attr size - The size of the bar.
 *
 * @cssprop --m3e-app-bar-container-color - Background color of the app bar container.
 * @cssprop --m3e-app-bar-container-color-on-scroll - Background color of the app bar container when scrolled.
 * @cssprop --m3e-app-bar-container-elevation - Elevation (shadow) of the app bar container.
 * @cssprop --m3e-app-bar-container-elevation-on-scroll - Elevation (shadow) of the app bar container when scrolled.
 * @cssprop --m3e-app-bar-title-text-color - Color of the app bar title text.
 * @cssprop --m3e-app-bar-subtitle-text-color - Color of the app bar subtitle text.
 * @cssprop --m3e-app-bar-padding-left - Left padding for the app bar container.
 * @cssprop --m3e-app-bar-padding-right - Right padding for the app bar container.
 * @cssprop --m3e-app-bar-small-container-height - Height of the small app bar container.
 * @cssprop --m3e-app-bar-small-title-text-font-size - Font size for the small app bar title text.
 * @cssprop --m3e-app-bar-small-title-text-font-weight - Font weight for the small app bar title text.
 * @cssprop --m3e-app-bar-small-title-text-line-height - Line height for the small app bar title text.
 * @cssprop --m3e-app-bar-small-subtitle-text-tracking - Letter spacing (tracking) for the small app bar title text.
 * @cssprop --m3e-app-bar-small-subtitle-text-font-size - Font size for the small app bar subtitle text.
 * @cssprop --m3e-app-bar-small-subtitle-text-font-weight - Font weight for the small app bar subtitle text.
 * @cssprop --m3e-app-bar-small-subtitle-text-line-height - Line height for the small app bar subtitle text.
 * @cssprop --m3e-app-bar-small-subtitle-text-tracking - Letter spacing (tracking) for the small app bar subtitle text.
 * @cssprop --m3e-app-bar-small-heading-padding-left - Left padding for the small app bar heading.
 * @cssprop --m3e-app-bar-small-heading-padding-right - Right padding for the small app bar heading.
 * @cssprop --m3e-app-bar-medium-container-height - Height of the medium app bar container.
 * @cssprop --m3e-app-bar-medium-container-height-with-subtitle - Height of the medium app bar container with subtitle.
 * @cssprop --m3e-app-bar-medium-title-text-font-size - Font size for the medium app bar title text.
 * @cssprop --m3e-app-bar-medium-title-text-font-weight - Font weight for the medium app bar title text.
 * @cssprop --m3e-app-bar-medium-title-text-line-height - Line height for the medium app bar title text.
 * @cssprop --m3e-app-bar-medium-subtitle-text-tracking - Letter spacing (tracking) for the medium app bar title text.
 * @cssprop --m3e-app-bar-medium-subtitle-text-font-size - Font size for the medium app bar subtitle text.
 * @cssprop --m3e-app-bar-medium-subtitle-text-font-weight - Font weight for the medium app bar subtitle text.
 * @cssprop --m3e-app-bar-medium-subtitle-text-line-height - Line height for the medium app bar subtitle text.
 * @cssprop --m3e-app-bar-medium-subtitle-text-tracking - Letter spacing (tracking) for the medium app bar subtitle text.
 * @cssprop --m3e-app-bar-medium-heading-padding-left - Left padding for the medium app bar heading.
 * @cssprop --m3e-app-bar-medium-heading-padding-right - Right padding for the medium app bar heading.
 * @cssprop --m3e-app-bar-medium-padding-top - Top padding for the medium app bar.
 * @cssprop --m3e-app-bar-medium-padding-bottom - Bottom padding for the medium app bar.
 * @cssprop --m3e-app-bar-medium-title-max-lines - Maximum number of lines for the medium app bar title.
 * @cssprop --m3e-app-bar-medium-subtitle-max-lines - Maximum number of lines for the medium app bar subtitle.
 * @cssprop --m3e-app-bar-large-container-height - Height of the large app bar container.
 * @cssprop --m3e-app-bar-large-container-height-with-subtitle - Height of the large app bar container with subtitle.
 * @cssprop --m3e-app-bar-large-title-text-font-size - Font size for the large app bar title text.
 * @cssprop --m3e-app-bar-large-title-text-font-weight - Font weight for the large app bar title text.
 * @cssprop --m3e-app-bar-large-title-text-line-height - Line height for the large app bar title text.
 * @cssprop --m3e-app-bar-large-subtitle-text-tracking - Letter spacing (tracking) for the large app bar title text.
 * @cssprop --m3e-app-bar-large-subtitle-text-font-size - Font size for the large app bar subtitle text.
 * @cssprop --m3e-app-bar-large-subtitle-text-font-weight - Font weight for the large app bar subtitle text.
 * @cssprop --m3e-app-bar-large-subtitle-text-line-height - Line height for the large app bar subtitle text.
 * @cssprop --m3e-app-bar-large-subtitle-text-tracking - Letter spacing (tracking) for the large app bar subtitle text.
 * @cssprop --m3e-app-bar-large-heading-padding-left - Left padding for the large app bar heading.
 * @cssprop --m3e-app-bar-large-heading-padding-right - Right padding for the large app bar heading.
 * @cssprop --m3e-app-bar-large-padding-top - Top padding for the large app bar.
 * @cssprop --m3e-app-bar-large-padding-bottom - Bottom padding for the large app bar.
 * @cssprop --m3e-app-bar-large-title-max-lines - Maximum number of lines for the large app bar title.
 * @cssprop --m3e-app-bar-large-subtitle-max-lines - Maximum number of lines for the large app bar subtitle.
 */
let M3eAppBarElement = class M3eAppBarElement extends HtmlFor(Role(AttachInternals(LitElement), "banner")) {
  constructor() {
    super(...arguments);
    _M3eAppBarElement_instances.add(this);
    /** @private */
    _M3eAppBarElement_scrollHandler.set(this, e => this._updateScroll(e));
    /** @private */
    _M3eAppBarElement_frameLoadHandler.set(this, () => __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleFrameLoad).call(this));
    /**
     * Whether the title and subtitle are centered.
     * @default false
     */
    this.centered = false;
    /**
     * The size of the bar.
     * @default "small"
     */
    this.size = "small";
  }
  /** @inheritdoc */
  attach(control) {
    super.attach(control);
    if (control instanceof HTMLIFrameElement) {
      control.addEventListener("load", __classPrivateFieldGet(this, _M3eAppBarElement_frameLoadHandler, "f"));
      __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleFrameLoad).call(this);
    } else {
      control.addEventListener("scroll", __classPrivateFieldGet(this, _M3eAppBarElement_scrollHandler, "f"), {
        passive: true
      });
    }
  }
  /** @inheritdoc */
  detach() {
    if (this.control instanceof HTMLIFrameElement) {
      this.control.removeEventListener("load", __classPrivateFieldGet(this, _M3eAppBarElement_frameLoadHandler, "f"));
      this.control.contentDocument?.removeEventListener("scroll", __classPrivateFieldGet(this, _M3eAppBarElement_scrollHandler, "f"));
    }
    if (this.control) {
      this.control.removeEventListener("scroll", __classPrivateFieldGet(this, _M3eAppBarElement_scrollHandler, "f"));
    }
    super.detach();
  }
  /** @inheritdoc */
  connectedCallback() {
    super.connectedCallback();
    __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_applySize).call(this);
    // Automatically remove banner role when it is nested inside any element with a disallowed role.
    if (this.role === "banner") {
      const allowed = ["document", "application", "main"];
      const ancestorWithRole = this.parentElement?.closest("[role]");
      if (ancestorWithRole && ancestorWithRole.role && !allowed.includes(ancestorWithRole.role)) {
        this.removeAttribute("role");
      }
    }
  }
  /** @inheritdoc */
  willUpdate(_changedProperties) {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has("size")) {
      __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_applySize).call(this);
    }
  }
  /** @inheritdoc */
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("centered") || _changedProperties.has("size")) {
      if (this.centered && this.size === "small") {
        __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_computeCentered).call(this);
      } else {
        __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_clearCentered).call(this);
      }
    }
  }
  /** @inheritdoc */
  render() {
    switch (this.size) {
      case "small":
        return html`<div class="base"><div class="leading-icon"><slot name="leading" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleLeadingIconSlotChange)}"><slot name="leading-icon" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleDeprecatedSlotChange)}"></slot></slot></div><div class="heading"><div class="label"><div class="title"><slot name="title" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleTitleSlotChange)}"></slot></div><div class="subtitle"><slot name="subtitle" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleSubtitleSlotChange)}"></slot></div></div></div><div class="trailing-icon"><slot name="trailing" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleTrailingIconsSlotChange)}"><slot name="trailing-icon" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleDeprecatedSlotChange)}"></slot></slot></div></div>`;
      default:
        return html`<div class="base"><div class="heading"><div class="leading-icon"><slot name="leading" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleLeadingIconSlotChange)}"><slot name="leading-icon" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleDeprecatedSlotChange)}"></slot></slot></div><div class="spacer"></div><div class="trailing-icon"><slot name="trailing" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleTrailingIconsSlotChange)}"><slot name="trailing-icon" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleDeprecatedSlotChange)}"></slot></slot></div></div><div class="spacer"></div><div class="label"><div class="title"><slot name="title" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleTitleSlotChange)}"></slot></div><div class="subtitle"><slot name="subtitle" @slotchange="${__classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_handleSubtitleSlotChange)}"></slot></div></div></div>`;
    }
  }
  /** @private */
  _updateScroll(e) {
    let scrollTop = 0;
    if (this.control instanceof HTMLIFrameElement) {
      scrollTop = __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_getFrameScrollTop).call(this, this.control);
    } else if (e.target instanceof HTMLElement) {
      scrollTop = e.target.scrollTop;
    }
    this._base?.classList.toggle("on-scroll", scrollTop > 0);
  }
};
_M3eAppBarElement_scrollHandler = new WeakMap();
_M3eAppBarElement_frameLoadHandler = new WeakMap();
_M3eAppBarElement_instances = new WeakSet();
_M3eAppBarElement_applySize = function _M3eAppBarElement_applySize() {
  if (!isAppBarSize(this.size)) {
    this.size = "small";
  }
  setCustomEnumState(this, this.size, "small", "medium", "large");
};
_M3eAppBarElement_handleTitleSlotChange = function _M3eAppBarElement_handleTitleSlotChange(e) {
  this._base?.classList.toggle("with-title", hasAssignedNodes(e.target));
};
_M3eAppBarElement_handleSubtitleSlotChange = function _M3eAppBarElement_handleSubtitleSlotChange(e) {
  this._base?.classList.toggle("with-subtitle", hasAssignedNodes(e.target));
};
_M3eAppBarElement_handleLeadingIconSlotChange = function _M3eAppBarElement_handleLeadingIconSlotChange(e) {
  this._base?.classList.toggle("with-leading-icon", hasAssignedNodes(e.target));
  if (this.centered && this.size === "small") {
    setTimeout(() => __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_computeCentered).call(this), 40);
  }
};
_M3eAppBarElement_handleTrailingIconsSlotChange = function _M3eAppBarElement_handleTrailingIconsSlotChange(e) {
  this._base?.classList.toggle("with-trailing-icon", hasAssignedNodes(e.target));
  if (this.centered && this.size === "small") {
    setTimeout(() => __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_computeCentered).call(this), 40);
  }
};
_M3eAppBarElement_handleDeprecatedSlotChange = function _M3eAppBarElement_handleDeprecatedSlotChange(e) {
  const deprecatedSlot = e.target.name;
  const useSlot = deprecatedSlot.replace("-icon", "");
  console.warn(`[m3e-app-bar] Slot "${deprecatedSlot}" is deprecated and will be removed in a future release. Use "${useSlot}" instead.`);
};
_M3eAppBarElement_clearCentered = function _M3eAppBarElement_clearCentered() {
  this._base?.style.removeProperty("--_leading-icon-min-width");
  this._base?.style.removeProperty("--_trailing-icon-min-width");
};
_M3eAppBarElement_computeCentered = function _M3eAppBarElement_computeCentered() {
  __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_clearCentered).call(this);
  const leadingWidth = this._leadingIcon?.getBoundingClientRect().width ?? 0;
  const trailingWidth = this._trailingIcon?.getBoundingClientRect().width ?? 0;
  if (leadingWidth < trailingWidth) {
    this._base?.style.setProperty("--_leading-icon-min-width", `${trailingWidth}px`);
  } else if (leadingWidth > trailingWidth) {
    this._base?.style.setProperty("--_trailing-icon-min-width", `${leadingWidth}px`);
  }
};
_M3eAppBarElement_handleFrameLoad = function _M3eAppBarElement_handleFrameLoad() {
  if (this.control instanceof HTMLIFrameElement) {
    this.control.contentDocument?.addEventListener("scroll", __classPrivateFieldGet(this, _M3eAppBarElement_scrollHandler, "f"), {
      passive: true
    });
    this._base?.classList.toggle("on-scroll", __classPrivateFieldGet(this, _M3eAppBarElement_instances, "m", _M3eAppBarElement_getFrameScrollTop).call(this, this.control) > 0);
  }
};
_M3eAppBarElement_getFrameScrollTop = function _M3eAppBarElement_getFrameScrollTop(frame) {
  // Both document element (<html>) and body are tested for scroll top, taking the maximum.
  return Math.max(frame.contentDocument?.documentElement?.scrollTop ?? 0, frame.contentDocument?.body?.scrollTop ?? 0);
};
/** The styles of the element. */
M3eAppBarElement.styles = [AppBarStyle, AppBarSizeStyle];
__decorate([query(".base")], M3eAppBarElement.prototype, "_base", void 0);
__decorate([query(".leading-icon")], M3eAppBarElement.prototype, "_leadingIcon", void 0);
__decorate([query(".trailing-icon")], M3eAppBarElement.prototype, "_trailingIcon", void 0);
__decorate([property({
  type: Boolean,
  reflect: true
})], M3eAppBarElement.prototype, "centered", void 0);
__decorate([property({
  reflect: true,
  useDefault: true
})], M3eAppBarElement.prototype, "size", void 0);
__decorate([debounce(40)], M3eAppBarElement.prototype, "_updateScroll", null);
M3eAppBarElement = __decorate([customElement("m3e-app-bar")], M3eAppBarElement);

export { M3eAppBarElement, isAppBarSize };
//# sourceMappingURL=app-bar.js.map
