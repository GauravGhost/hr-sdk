export class HRCache<T = any> {
    private static instance: HRCache;
    private cache!: Record<string, T>;

    constructor() {
        if (HRCache.instance) {
            return HRCache.instance;
        }
        this.cache = {};
        HRCache.instance = this;
        return this;
    }

    set(key: string, value: T): void {
        this.cache[key] = value;
    }

    get(key: string): T | null {
        return this.cache.hasOwnProperty(key) ? this.cache[key] : null;
    }

    has(key: string): boolean {
        return this.cache.hasOwnProperty(key);
    }

    update(key: string, value: T): void {
        if (this.has(key)) {
            this.cache[key] = value;
        } else {
            console.warn(`Key "${key}" does not exist in the cache.`);
        }
    }

    remove(key: string): void {
        if (this.has(key)) {
            delete this.cache[key];
        } else {
            console.warn(`Key "${key}" does not exist in the cache.`);
        }
    }

    clear(): void {
        this.cache = {};
    }

    size(): number {
        return Object.keys(this.cache).length;
    }
}

// Exporting the singleton instance
export default new HRCache();
