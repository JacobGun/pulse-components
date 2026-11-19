/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
import { isServer } from 'lit';

/**
 * Adapted from Angular Material CDK Platform
 * Source: https://github.com/angular/components/blob/main/src/cdk/platform/platform.ts
 *
 * @license MIT
 * Copyright (c) 2025 Google LLC
 * See LICENSE file in the project root for full license text.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
let hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
/** Utility used to detect the current platform. */
class M3ePlatform {}
/** Whether the platform is a browser. */
M3ePlatform.isBrowser = !isServer && typeof document === "object" && !!document;
/** Whether the current browser is Microsoft Edge. */
M3ePlatform.Edge = M3ePlatform.isBrowser && /(edge)/i.test(navigator.userAgent);
/** Whether the current rendering engine is Microsoft Trident. */
M3ePlatform.Trident = M3ePlatform.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
/** Whether the current rendering engine is Blink. */
M3ePlatform.Blink = M3ePlatform.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !M3ePlatform.Edge && !M3ePlatform.Trident;
/** Whether the current rendering engine is WebKit. */
M3ePlatform.WebKit = M3ePlatform.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !M3ePlatform.Blink && !M3ePlatform.Edge && !M3ePlatform.Trident;
/** Whether the current platform is Apply iOS. */
M3ePlatform.iOS = M3ePlatform.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
/** Whether the current browser is Firefox. */
M3ePlatform.Firefox = M3ePlatform.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
/** Whether the current platform is Android. */
M3ePlatform.Android = M3ePlatform.isBrowser && /android/i.test(navigator.userAgent) && !M3ePlatform.Trident;
/** Whether the current browser is Safari. */
M3ePlatform.Safari = M3ePlatform.isBrowser && /safari/i.test(navigator.userAgent) && M3ePlatform.WebKit;
globalThis.M3ePlatform = M3ePlatform;

export { M3ePlatform };
//# sourceMappingURL=Platform.js.map
