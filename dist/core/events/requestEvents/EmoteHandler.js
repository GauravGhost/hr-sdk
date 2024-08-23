"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmoteHandler = void 0;
const constant_1 = require("../../../utils/constant");
class EmoteHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.EmoteRequest,
            emote_id: data.emoteId,
            target_user_id: data.targetUserId
        };
        return payload;
    }
}
exports.EmoteHandler = EmoteHandler;
