/** Specifies the available values used to indicate the current item in the breadcrumb path. */
export type BreadcrumbItemCurrent = "page" | "step" | "location" | "date" | "time" | "true";
/**
 * Determines whether a value is a `BreadcrumbItemCurrent`.
 * @param {unknown} value The value to test.
 * @returns Whether `value` is a `BreadcrumbItemCurrent`.
 */
export declare function isBreadcrumbItemCurrent(value: unknown): value is BreadcrumbItemCurrent;
//# sourceMappingURL=BreadcrumbItemCurrent.d.ts.map