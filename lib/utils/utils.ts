export function generateRid(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

function toCamelCase(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}

/**
 * 
 * @param {object} data - Data which contains the key which will be removed 
 * @param {Array<string>} keys - List of key which needs to be removed, It is optional.
 * @returns 
 */
export function removeCustomKeys(data: any, keys: string[] = []) {
  const keysToRemove = new Set([...keys, 'rid', '_type']);
  keysToRemove.forEach(key => delete data[key])
  return data;
}

export function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToCamelCase(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = toCamelCase(key);
      acc[newKey] = convertKeysToCamelCase(obj[key]);
      return acc;
    }, {} as any);
  } else {
    return obj;
  }
}

type AsyncFunction<T> = (...args: any[]) => Promise<T>;
type SyncFunction<T> = (...args: any[]) => T;

export function catchFn<T>(fn: SyncFunction<T> | AsyncFunction<T>): (...args: any[]) => T | Promise<T> {
  return function (...args: any[]): T | Promise<T> {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch(error => {
          throw error;
        });
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  };
}

