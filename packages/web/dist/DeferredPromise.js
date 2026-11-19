/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * A deferred promise with externally exposed resolve and reject functions.
 * @template T The resolved type of the promise.
 */
class DeferredPromise {
  constructor() {
    this.ready = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export { DeferredPromise };
//# sourceMappingURL=DeferredPromise.js.map
