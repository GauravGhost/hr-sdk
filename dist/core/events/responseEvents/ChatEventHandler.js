"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEventHandler = void 0;
const constant_1 = require("../../../utils/constant");
class ChatEventHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(constant_1.emitEvent.Chat, data.user, data.message);
    }
}
exports.ChatEventHandler = ChatEventHandler;
