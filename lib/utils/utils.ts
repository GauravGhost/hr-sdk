export function generateRid(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
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
  return function(...args: any[]): T | Promise<T> {
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
