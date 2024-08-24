import { eventRequest } from "../../../utils/constant";
import { generateRid } from "../../../utils/utils";
import { RequestStrategy } from "./RequestStrategy";

export class RoomUsersHandler implements RequestStrategy {
    createPayload(data: any): object {
        if (!data) {
            throw new Error("data cannot be empty");
        }
        const payload = {
            _type: eventRequest.GetRoomUsersRequest,
            rid: generateRid()
        }
        return payload;
    }
}