"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMovementHandler = void 0;
const constant_1 = require("../../../utils/constant");
class PlayerMovementHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(constant_1.emitEvent.PlayerMovement, data);
    }
}
exports.PlayerMovementHandler = PlayerMovementHandler;
