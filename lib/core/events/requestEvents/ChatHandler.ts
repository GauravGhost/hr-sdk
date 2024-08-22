import { eventRequest } from "../../../utils/constant";
import { RequestStrategy } from "./RequestStrategy";

export class ChatHandler implements RequestStrategy {
    createPayload(data: any): object {
        if (data.whisper) {
            console.log(data);
            return {
                _type: eventRequest.ChatRequest,
                message: data.message,
                whisper_target_id: data.whisperTargetId,
                rid: data.rid
            };
        }
        return {
            _type: eventRequest.ChatRequest,
            message: data.message,
            rid: data.rid
        };
    }
}