import { EmotePayload } from "../../../types/types";
import { RequestStrategy } from "./RequestStrategy";
export declare class EmoteHandler implements RequestStrategy {
    createPayload(data: EmotePayload): object;
}
