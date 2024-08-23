"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorHitResponseHandler = void 0;
const constant_1 = require("../../../utils/constant");
class AnchorHitResponseHandler {
    constructor(emitter) {
        this.emitter = emitter;
    }
    handle(data) {
        this.emitter.emit(constant_1.emitEvent.PlayerSit, data);
    }
}
exports.AnchorHitResponseHandler = AnchorHitResponseHandler;
