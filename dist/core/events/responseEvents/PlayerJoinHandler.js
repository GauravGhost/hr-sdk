"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerJoinHandler = void 0;
const constant_1 = require("../../../utils/constant");
class PlayerJoinHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(constant_1.emitEvent.PlayerJoin, data.user);
    }
}
exports.PlayerJoinHandler = PlayerJoinHandler;
