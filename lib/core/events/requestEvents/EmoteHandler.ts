import { EmotePayload } from "../../../types/requestEventTypes";
import { eventRequest } from "../../../utils/constant";
import { RequestStrategy } from "./RequestStrategy";

export class EmoteHandler implements RequestStrategy {
    createPayload(data: EmotePayload): object {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: eventRequest.EmoteRequest,
            emote_id: data.emoteId,
            target_user_id: data.targetUserId
        }
        return payload;
    }
}