"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRid = generateRid;
exports.convertKeysToCamelCase = convertKeysToCamelCase;
exports.catchFn = catchFn;
function generateRid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
function toCamelCase(str) {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}
function convertKeysToCamelCase(obj) {
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
function catchFn(fn) {
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
