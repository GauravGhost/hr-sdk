"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelHandler = void 0;
const constant_1 = require("../../../utils/constant");
class ChannelHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.ChannelRequest,
            message: data.message,
            tags: data.tags,
            only_to: data.tags,
            rid: null,
        };
        return payload;
    }
}
exports.ChannelHandler = ChannelHandler;
