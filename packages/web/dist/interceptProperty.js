/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 */
/**
 * Intercepts property access and mutations on a target object, allowing custom logic
 * to run when the property is read or written to.
 *
 * @template T - The type of the target object.
 * @template K - The key of the property being intercepted (must be a valid key of T).
 * @param target - The object whose property should be intercepted.
 * @param prop - The property key to intercept.
 * @param options - Configuration object for interceptor callbacks.
 * @returns A cleanup function that removes the interceptors and restores the original property descriptor.
 * @throws {Error} If the property does not exist on the target object or its prototype chain.
 */
function interceptProperty(target, prop, options) {
  const descriptor = Object.getOwnPropertyDescriptor(target, prop) ?? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), prop);
  if (!descriptor) {
    throw new Error(`Property ${String(prop)} not found on target.`);
  }
  const getter = descriptor.get?.bind(target);
  const setter = descriptor.set?.bind(target);
  Object.defineProperty(target, prop, {
    configurable: true,
    enumerable: descriptor.enumerable,
    get() {
      return options.get ? options.get(() => getter?.()) : getter?.();
    },
    set(v) {
      if (options.set) {
        options.set(v, val => setter?.(val));
      } else {
        setter?.(v);
      }
    }
  });
  return () => Object.defineProperty(target, prop, descriptor);
}

export { interceptProperty };
//# sourceMappingURL=interceptProperty.js.map
