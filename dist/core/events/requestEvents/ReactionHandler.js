"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionHandler = void 0;
const constant_1 = require("../../../utils/constant");
class ReactionHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.ReactionRequest,
            reaction: data.reaction,
            target_user_id: data.targetUserId
        };
        return payload;
    }
}
exports.ReactionHandler = ReactionHandler;
