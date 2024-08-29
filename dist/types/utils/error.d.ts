/**
 * Base error class.
 * @class
 * @extends Error
 * @param {string} name
 * @param {string} description
 */
declare class BaseError extends Error {
    constructor(name: string, description: string);
}
/**
 * Error class for Highrise API errors.
 * @class
 * @extends Error
 * @param {string} message - The error message.
*/
export declare class HighriseError extends BaseError {
    constructor(message: string);
}
/**
 *
 */
export declare class WebApiError extends BaseError {
    constructor(message: string);
}
export declare class WebSocketError extends BaseError {
    constructor(message: string);
}
export declare class RequestError extends BaseError {
    constructor(message: string);
}
export declare class ResponseError extends BaseError {
    constructor(message: string);
}
export declare class PayloadError extends BaseError {
    constructor(message: string);
}
export {};
