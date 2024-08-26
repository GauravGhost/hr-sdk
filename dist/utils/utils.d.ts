export declare function generateRid(): string;
export declare function convertKeysToCamelCase(obj: any): any;
type AsyncFunction<T> = (...args: any[]) => Promise<T>;
type SyncFunction<T> = (...args: any[]) => T;
export declare function catchFn<T>(fn: SyncFunction<T> | AsyncFunction<T>): (...args: any[]) => T | Promise<T>;
export {};
