import { TeleportPayload } from "../../../types/requestEventTypes";
import { eventRequest } from "../../../utils/constant";
import { RequestStrategy } from "./RequestStrategy";

export class TeleportHandler implements RequestStrategy {
    createPayload(data: TeleportPayload): object {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: eventRequest.TeleportRequest,
            user_id: data.userId,
            destination: data.destination
        }
        return payload;
    }
}