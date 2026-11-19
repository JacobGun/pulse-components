import { LitElement } from "lit";
import { AttachInternalsMixin } from "@pulse/web/core";
type Constructor<T = object> = abstract new (...args: any[]) => T;
/**
 * Mixin to augment an element with behavior that supports styling based on directionality, avoiding the need to use :dir.
 * @template T The type of the base class.
 * @param {T} base The base class.
 * @returns {T} A class that extends `base` with directionality styling support.
 */
export declare function SupportsDirectionality<T extends Constructor<LitElement & AttachInternalsMixin>>(base: T): T;
export {};
//# sourceMappingURL=SupportsDirectionality.d.ts.map