export declare function generateRid(): string;
/**
 *
 * @param {object} data - Data which contains the key which will be removed
 * @param {Array<string>} keys - List of key which needs to be removed, It is optional.
 * @returns
 */
export declare function removeCustomKeys(data: any, keys?: string[]): any;
export declare function convertKeysToCamelCase(obj: any): any;
type AsyncFunction<T> = (...args: any[]) => Promise<T>;
type SyncFunction<T> = (...args: any[]) => T;
export declare function catchFn<T>(fn: SyncFunction<T> | AsyncFunction<T>): (...args: any[]) => T | Promise<T>;
export {};
