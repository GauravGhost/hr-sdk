"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerLeftHandler = void 0;
const constant_1 = require("../../../utils/constant");
class PlayerLeftHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(constant_1.emitEvent.PlayerLeft, data.user);
    }
}
exports.PlayerLeftHandler = PlayerLeftHandler;
