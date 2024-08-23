export declare class HRCache<T = any> {
    private static instance;
    private cache;
    constructor();
    set(key: string, value: T): void;
    get(key: string): T | null;
    has(key: string): boolean;
    update(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    size(): number;
}
declare const _default: HRCache<any>;
export default _default;
