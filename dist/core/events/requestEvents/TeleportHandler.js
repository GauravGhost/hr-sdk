"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeleportHandler = void 0;
const constant_1 = require("../../../utils/constant");
class TeleportHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.TeleportRequest,
            user_id: data.userId,
            destination: data.destination
        };
        return payload;
    }
}
exports.TeleportHandler = TeleportHandler;
