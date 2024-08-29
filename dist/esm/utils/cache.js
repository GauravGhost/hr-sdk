export class HRCache {
    constructor() {
        if (HRCache.instance) {
            return HRCache.instance;
        }
        this.cache = {};
        HRCache.instance = this;
        return this;
    }
    set(key, value) {
        this.cache[key] = value;
    }
    get(key) {
        return this.cache.hasOwnProperty(key) ? this.cache[key] : null;
    }
    has(key) {
        return this.cache.hasOwnProperty(key);
    }
    update(key, value) {
        if (this.has(key)) {
            this.cache[key] = value;
        }
        else {
            console.warn(`Key "${key}" does not exist in the cache.`);
        }
    }
    remove(key) {
        if (this.has(key)) {
            delete this.cache[key];
        }
        else {
            console.warn(`Key "${key}" does not exist in the cache.`);
        }
    }
    clear() {
        this.cache = {};
    }
    size() {
        return Object.keys(this.cache).length;
    }
}
// Exporting the singleton instance
export default new HRCache();
