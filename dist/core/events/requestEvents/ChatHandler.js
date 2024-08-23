"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandler = void 0;
const constant_1 = require("../../../utils/constant");
class ChatHandler {
    createPayload(data) {
        if (data.whisper) {
            console.log(data);
            return {
                _type: constant_1.eventRequest.ChatRequest,
                message: data.message,
                whisper_target_id: data.whisperTargetId,
                rid: data.rid
            };
        }
        return {
            _type: constant_1.eventRequest.ChatRequest,
            message: data.message,
            rid: data.rid
        };
    }
}
exports.ChatHandler = ChatHandler;
