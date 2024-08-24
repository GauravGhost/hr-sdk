"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorHitHandler = void 0;
const constant_1 = require("../../../utils/constant");
class FloorHitHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.FloorHitRequest,
            destination: { x: data.x, y: data.y, z: data.z, faing: data.facing },
            rid: null,
        };
        return payload;
    }
}
exports.FloorHitHandler = FloorHitHandler;
