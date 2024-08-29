/**
 * Base error class.
 * @class
 * @extends Error
 * @param {string} name
 * @param {string} description
 */
class BaseError extends Error {
    constructor(name, description) {
        super(description);
        this.name = name;
    }
}
/**
 * Error class for Highrise API errors.
 * @class
 * @extends Error
 * @param {string} message - The error message.
*/
export class HighriseError extends BaseError {
    constructor(message) {
        super('HighriseError', message);
    }
}
/**
 *
 */
export class WebApiError extends BaseError {
    constructor(message) {
        super('WebApiError', message);
    }
}
export class WebSocketError extends BaseError {
    constructor(message) {
        super('WebSocketError', message);
    }
}
export class RequestError extends BaseError {
    constructor(message) {
        super('RequestError', message);
    }
}
export class ResponseError extends BaseError {
    constructor(message) {
        super('ResponseError', message);
    }
}
export class PayloadError extends BaseError {
    constructor(message) {
        super('ValidationError', message);
    }
}
