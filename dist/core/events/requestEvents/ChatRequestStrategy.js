"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestStrategy = void 0;
const constant_1 = require("../../../utils/constant");
class ChatRequestStrategy {
    createPayload(message) {
        if (message.whisper) {
            return {
                _type: constant_1.eventRequest.ChatRequest,
                message: message.message,
                whisper_target_id: message.whisper_target_id,
                rid: message.rid
            };
        }
        return {
            _type: constant_1.eventRequest.ChatRequest,
            message: message.message,
            rid: message.rid
        };
    }
}
exports.ChatRequestStrategy = ChatRequestStrategy;
