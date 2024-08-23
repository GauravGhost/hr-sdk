"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageHandler = void 0;
class ErrorMessageHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(data.message);
    }
}
exports.ErrorMessageHandler = ErrorMessageHandler;
