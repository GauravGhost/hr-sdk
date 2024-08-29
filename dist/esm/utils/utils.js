export function generateRid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
function toCamelCase(str) {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}
/**
 *
 * @param {object} data - Data which contains the key which will be removed
 * @param {Array<string>} keys - List of key which needs to be removed, It is optional.
 * @returns
 */
export function removeCustomKeys(data, keys = []) {
    const keysToRemove = new Set([...keys, 'rid', '_type']);
    keysToRemove.forEach(key => delete data[key]);
    return data;
}
export function convertKeysToCamelCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(v => convertKeysToCamelCase(v));
    }
    else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = toCamelCase(key);
            acc[newKey] = convertKeysToCamelCase(obj[key]);
            return acc;
        }, {});
    }
    else {
        return obj;
    }
}
export function catchFn(fn) {
    return function (...args) {
        try {
            const result = fn(...args);
            if (result instanceof Promise) {
                return result.catch(error => {
                    throw error;
                });
            }
            else {
                return result;
            }
        }
        catch (error) {
            throw error;
        }
    };
}
