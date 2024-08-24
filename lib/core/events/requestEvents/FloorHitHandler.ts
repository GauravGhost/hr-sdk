import { FloorHitPayload } from "../../../types/requestEventTypes";
import { eventRequest } from "../../../utils/constant";
import { RequestStrategy } from "./RequestStrategy";

export class FloorHitHandler implements RequestStrategy {
    createPayload(data: FloorHitPayload): object {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: eventRequest.FloorHitRequest,
            destination: {x: data.x, y: data.y, z: data.z, faing: data.facing},
            rid: null,
        }
        return payload;
    }
}