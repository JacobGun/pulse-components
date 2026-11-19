/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { isServer } from 'lit';

/**
 * Adapted from Angular Material CDK Breakpoints
 * Source: https://github.com/angular/components/blob/main/src/cdk/layout/breakpoints.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
/** Specifies predefined breakpoints. */
var Breakpoint;
(function (Breakpoint) {
  Breakpoint["XSmall"] = "(max-width: 599.98px)";
  Breakpoint["Small"] = "(min-width: 600px) and (max-width: 959.98px)";
  Breakpoint["Medium"] = "(min-width: 960px) and (max-width: 1279.98px)";
  Breakpoint["Large"] = "(min-width: 1280px) and (max-width: 1919.98px)";
  Breakpoint["XLarge"] = "(min-width: 1920px)";
  Breakpoint["Handset"] = "(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)";
  Breakpoint["Tablet"] = "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)";
  Breakpoint["Web"] = "(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)";
  Breakpoint["HandsetPortrait"] = "(max-width: 599.98px) and (orientation: portrait)";
  Breakpoint["TabletPortrait"] = "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)";
  Breakpoint["WebPortrait"] = "(min-width: 840px) and (orientation: portrait)";
  Breakpoint["HandsetLandscape"] = "(max-width: 959.98px) and (orientation: landscape)";
  Breakpoint["TabletLandscape"] = "(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)";
  Breakpoint["WebLandscape"] = "(min-width: 1280px) and (orientation: landscape)";
})(Breakpoint || (Breakpoint = {}));

/** Utility used to detect changes to viewport sizes. */
class M3eBreakpointObserver {
  /**
   * Observes changes to viewport sizes.
   * @param {Array<Breakpoint | string>} breakpoints The breakpoints to observe.
   * @param {BreakpointObserverCallback} callback The callback function invoked when the viewport size changes.
   * @returns {() => void} A function used to stop observing changes to viewport sizes.
   */
  static observe(breakpoints, callback) {
    if (isServer || breakpoints.length == 0) {
      return () => {};
    }
    const mediaQueries = breakpoints.map(x => matchMedia(x));
    const changeHandler = () => {
      const map = new Map();
      breakpoints.forEach((x, i) => map.set(x, mediaQueries[i].matches));
      callback(map);
    };
    mediaQueries.forEach(x => x.addEventListener("change", changeHandler));
    changeHandler();
    return () => {
      mediaQueries.forEach(x => x.removeEventListener("change", changeHandler));
      mediaQueries.length = 0;
    };
  }
}
globalThis.M3eBreakpointObserver = M3eBreakpointObserver;

export { Breakpoint, M3eBreakpointObserver };
//# sourceMappingURL=BreakpointObserver.js.map
