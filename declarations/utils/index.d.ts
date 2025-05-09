export declare function uid(): string;
export declare function guid(): `${string}-${string}-${string}-${string}-${string}`;
/**
 * Returns the difference between two arrays.
 * @param a The first array.
 * @param b The second array.
 *
 * @returns A tuple containing the elements in `a` that are not in `b` and the elements in `b` that are not in `a`.
 */
export declare function diff<T>(a: T[], b: T[]): [T[], T[]];
declare const _default: {
    uid: typeof uid;
    guid: typeof guid;
    diff: typeof diff;
};
export default _default;
