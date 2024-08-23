import { EmotePayload } from "../../../types/requestEventTypes";
import { RequestStrategy } from "./RequestStrategy";
export declare class EmoteHandler implements RequestStrategy {
    createPayload(data: EmotePayload): object;
}
