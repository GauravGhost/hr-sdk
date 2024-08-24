import { AnchorHitPayload } from "../../../types/requestEventTypes";
import { eventRequest } from "../../../utils/constant";
import { RequestStrategy } from "./RequestStrategy";

export class AnchorHitHandler implements RequestStrategy {
    createPayload(data: AnchorHitPayload): object {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: eventRequest.AnchorHitRequest,
            anchor: {entity_id: data.entityId, anchor_ix: data.anchorIx},
            rid: null,
        }
        return payload;
    }
}