"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorHitHandler = void 0;
const constant_1 = require("../../../utils/constant");
class AnchorHitHandler {
    createPayload(data) {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.AnchorHitRequest,
            anchor: { entity_id: data.entityId, anchor_ix: data.anchorIx },
            rid: null,
        };
        return payload;
    }
}
exports.AnchorHitHandler = AnchorHitHandler;
