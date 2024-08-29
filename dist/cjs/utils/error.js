"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadError = exports.ResponseError = exports.RequestError = exports.WebSocketError = exports.WebApiError = exports.HighriseError = void 0;
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
class HighriseError extends BaseError {
    constructor(message) {
        super('HighriseError', message);
    }
}
exports.HighriseError = HighriseError;
/**
 *
 */
class WebApiError extends BaseError {
    constructor(message) {
        super('WebApiError', message);
    }
}
exports.WebApiError = WebApiError;
class WebSocketError extends BaseError {
    constructor(message) {
        super('WebSocketError', message);
    }
}
exports.WebSocketError = WebSocketError;
class RequestError extends BaseError {
    constructor(message) {
        super('RequestError', message);
    }
}
exports.RequestError = RequestError;
class ResponseError extends BaseError {
    constructor(message) {
        super('ResponseError', message);
    }
}
exports.ResponseError = ResponseError;
class PayloadError extends BaseError {
    constructor(message) {
        super('ValidationError', message);
    }
}
exports.PayloadError = PayloadError;
