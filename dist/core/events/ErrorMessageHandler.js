"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageHandler = void 0;
const console_1 = require("console");
const error_1 = require("../../utils/error");
class ErrorMessageHandler {
    handle(data) {
        console.log("Error event: ", data);
        throw new error_1.ResponseError(console_1.error.name);
    }
}
exports.ErrorMessageHandler = ErrorMessageHandler;
