/**
 * Base error class.
 * @class
 * @extends Error
 * @param {string} name
 * @param {string} description
 */
class BaseError extends Error {
    constructor(name: string, description: string) {
        super(description)
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
    constructor(message: string) {
        super('HighriseError', message);
    }
}

/**
 * 
 */
export class WebApiError extends BaseError {
    constructor(message: string){
        super('WebApiError', message);
    }
}

export class WebSocketError extends BaseError {
    constructor(message: string){
        super('WebSocketError', message);
    }
}

export class RequestError extends BaseError {
    constructor(message: string){
        super('RequestError', message);
    }
}

export class ResponseError extends BaseError {
    constructor(message: string){
        super('ResponseError', message);
    }
}

export class PayloadError extends BaseError{
    constructor(message: string){
        super('ValidationError', message);
    }
}