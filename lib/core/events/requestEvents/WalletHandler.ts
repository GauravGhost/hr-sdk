import { EmotePayload } from "../../../types/requestEventTypes";
import { eventRequest } from "../../../utils/constant";
import { PayloadError } from "../../../utils/error";
import { generateRid } from "../../../utils/utils";
import { RequestStrategy } from "./RequestStrategy";

export class WalletHandler implements RequestStrategy {
    createPayload(data?: any): object {
        if (!data) {
            throw new PayloadError("data cannot be empty");
        }
        const payload = {
            _type: eventRequest.GetWalletRequest,
            rid: generateRid(),
        }
        return payload;
    }
}