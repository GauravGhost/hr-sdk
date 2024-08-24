"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomUsersHandler = void 0;
const constant_1 = require("../../../utils/constant");
const utils_1 = require("../../../utils/utils");
class RoomUsersHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.GetRoomUsersRequest,
            rid: (0, utils_1.generateRid)()
        };
        return payload;
    }
}
exports.RoomUsersHandler = RoomUsersHandler;
